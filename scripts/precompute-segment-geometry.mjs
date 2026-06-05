#!/usr/bin/env node
/**
 * Precompute road-segment polyline geometry for every distinct street-sweeping
 * block (st_name | from | to), so the in-app Leaflet map can draw the blocks a
 * search returns (see commonwealth-ave-segments-map.html for the visual target).
 *
 * Strategy (decided in temp/plans/map-result-segments.md):
 *   1. data/street-sweeping.csv  -> distinct blocks, grouped by street.
 *   2. data/sam-cross-street-points.complete-with-aliases.csv -> each block's two
 *      cross-street endpoint coordinates (already geocoded; reused as anchors).
 *   3. ArcGIS layer 3 (SAM_Boston_Segments_tbl) -> all polyline segments for a
 *      street, fetched ONCE per street and cached. Endpoint + field reference:
 *      docs/sam-api-reference.md:52-139.
 *   4. For each block, spatially SELECT the street's segments that lie between
 *      the two endpoints (project onto the from->to axis, keep t in-window and
 *      laterally close). This handles divided boulevards (multiple carriageways
 *      per block) and disambiguates same-named streets across the city.
 *
 * Output: data/segment-geometry.json, keyed by `${normStreet}|${normFrom}|${normTo}`,
 * value `{ mapped: bool, paths: [[[lat,lng],...], ...] }` (Leaflet lat,lng order).
 *
 * Usage:
 *   node scripts/precompute-segment-geometry.mjs
 *   node scripts/precompute-segment-geometry.mjs --street "Commonwealth Ave"
 *   node scripts/precompute-segment-geometry.mjs --limit-streets 20
 *   node scripts/precompute-segment-geometry.mjs --rpm 60 --out data/segment-geometry.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const ARCGIS_LAYER3 =
  "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/3/query";

// Mirrors STREET_NAME_CANONICAL_MAP in app.js / precompute-sam-intersections.mjs
// so block keys produced here match the keys app.js looks up at runtime.
const STREET_NAME_CANONICAL_MAP = {
  st: "street", str: "street", ave: "avenue", av: "avenue", dr: "drive",
  drv: "drive", rd: "road", blvd: "boulevard", boul: "boulevard", ln: "lane",
  ct: "court", crt: "court", pl: "place", plc: "place", cir: "circle",
  circ: "circle", ter: "terrace", terr: "terrace", hwy: "highway",
  pkwy: "parkway", pky: "parkway", sq: "square", wy: "way", pk: "park",
  "1st": "first", "2nd": "second", "3rd": "third", "4th": "fourth",
  "5th": "fifth", "6th": "sixth", "7th": "seventh", "8th": "eighth",
  "9th": "ninth", w: "west", e: "east", n: "north", s: "south",
};

// Trailing words dropped to derive the ArcGIS ST_NAME query token. ArcGIS stores
// the type separately in ST_TYPE, so "Commonwealth Ave" -> ST_NAME "Commonwealth".
const STREET_TYPE_WORDS = new Set([
  "ave", "avenue", "av", "st", "street", "str", "rd", "road", "dr", "drive",
  "drv", "blvd", "boulevard", "boul", "ln", "lane", "ct", "court", "crt", "pl",
  "place", "plc", "cir", "circle", "circ", "ter", "terrace", "terr", "hwy",
  "highway", "pkwy", "parkway", "pky", "sq", "square", "wy", "way", "row",
  "path", "park", "pk", "wharf", "plaza", "broadway",
]);

function normalizeStreetName(str) {
  return (str || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => STREET_NAME_CANONICAL_MAP[word] || word)
    .join(" ");
}

// Derive the ArcGIS ST_NAME search token: strip a trailing street-type word.
// Leading directionals (W/E/N/S) are kept — they're part of ST_NAME for some
// streets and the later spatial filter corrects any over-match.
function arcgisNameToken(stName) {
  const words = (stName || "").trim().split(/\s+/).filter(Boolean);
  if (words.length > 1 && STREET_TYPE_WORDS.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }
  return words.join(" ").toUpperCase();
}

const blockKey = (stName, from, to) =>
  `${normalizeStreetName(stName)}|${normalizeStreetName(from)}|${normalizeStreetName(to)}`;

// ---------- CSV parsing (shared shape with precompute-sam-intersections.mjs) ----------

function parseCsvLine(line) {
  const values = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i += 1; }
      else if (ch === '"') inQuotes = false;
      else cur += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { values.push(cur); cur = ""; }
    else cur += ch;
  }
  values.push(cur);
  return values;
}

function parseCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const row = {};
    header.forEach((h, i) => { row[h] = cols[i]?.trim() ?? ""; });
    return row;
  });
}

// ---------- geometry ----------

// Equirectangular lng/lat -> local feet, good enough for intra-block distances.
const FT_PER_DEG_LAT = 364000;
function toFeet([lng, lat], lat0) {
  const ftPerDegLng = FT_PER_DEG_LAT * Math.cos((lat0 * Math.PI) / 180);
  return [lng * ftPerDegLng, lat * FT_PER_DEG_LAT];
}

function distFeet(p, q, lat0) {
  const a = toFeet(p, lat0);
  const b = toFeet(q, lat0);
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function pathLengthFeet(path, lat0) {
  let total = 0;
  for (let i = 1; i < path.length; i += 1) total += distFeet(path[i - 1], path[i], lat0);
  return total;
}

// A straight chord is a poor model for a curved street, so block geometry is the
// shortest WALK along the street's segment graph between the two cross-street
// endpoints. Nodes = segment endpoints (snapped so shared ones unify); edges =
// segments weighted by length. This follows curves, picks one clean centerline
// on divided roads, and ignores a same-named street elsewhere (disconnected
// component, hence unreachable).
const NODE_PRECISION = 6; // ArcGIS WGS84 vertices coincide exactly at shared nodes
const MAX_ENDPOINT_SNAP_FT = 800; // endpoint (geocoded corner) must be near the street geometry

const nodeKey = ([lng, lat]) => `${lng.toFixed(NODE_PRECISION)},${lat.toFixed(NODE_PRECISION)}`;

function buildGraph(segments, lat0) {
  const nodes = new Map(); // key -> { lngLat, edges: [{ to, weight, path }] }
  const ensure = (pt) => {
    const key = nodeKey(pt);
    if (!nodes.has(key)) nodes.set(key, { lngLat: pt, edges: [] });
    return key;
  };
  for (const seg of segments) {
    for (const path of seg.pathsLngLat) {
      if (path.length < 2) continue;
      const aKey = ensure(path[0]);
      const bKey = ensure(path[path.length - 1]);
      if (aKey === bKey) continue;
      const weight = pathLengthFeet(path, lat0);
      nodes.get(aKey).edges.push({ to: bKey, weight, path });
      nodes.get(bKey).edges.push({ to: aKey, weight, path: [...path].reverse() });
    }
  }
  return nodes;
}

function nearestNode(nodes, point, lat0) {
  let best = null;
  let bestDist = Infinity;
  for (const [key, node] of nodes) {
    const d = distFeet(point, node.lngLat, lat0);
    if (d < bestDist) { bestDist = d; best = key; }
  }
  return { key: best, dist: bestDist };
}

// Dijkstra (small graphs; linear-scan frontier is plenty). Returns the ordered
// list of edge geometries from startKey to endKey, or null if unreachable.
function shortestPathEdges(nodes, startKey, endKey) {
  const dist = new Map([[startKey, 0]]);
  const prev = new Map(); // key -> { from, edge }
  const visited = new Set();
  while (true) {
    let curKey = null;
    let curDist = Infinity;
    for (const [key, d] of dist) {
      if (!visited.has(key) && d < curDist) { curDist = d; curKey = key; }
    }
    if (curKey === null) break;
    if (curKey === endKey) break;
    visited.add(curKey);
    for (const edge of nodes.get(curKey).edges) {
      const nd = curDist + edge.weight;
      if (nd < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, nd);
        prev.set(edge.to, { from: curKey, edge });
      }
    }
  }
  if (!dist.has(endKey)) return null;
  const edges = [];
  let key = endKey;
  while (key !== startKey) {
    const step = prev.get(key);
    if (!step) return null;
    edges.unshift(step.edge.path);
    key = step.from;
  }
  return edges;
}

// Given a street's ArcGIS segments and a block's two endpoints, return the
// Leaflet [lat,lng] paths tracing the block. Empty if no walk connects them.
function selectBlockPaths(segments, pFrom, pTo) {
  if (!segments.length) return [];
  const lat0 = (pFrom[1] + pTo[1]) / 2;
  const nodes = buildGraph(segments, lat0);
  if (!nodes.size) return [];
  const start = nearestNode(nodes, pFrom, lat0);
  const end = nearestNode(nodes, pTo, lat0);
  if (start.dist > MAX_ENDPOINT_SNAP_FT || end.dist > MAX_ENDPOINT_SNAP_FT) return [];
  if (start.key === end.key) return [];
  const edges = shortestPathEdges(nodes, start.key, end.key);
  if (!edges) return [];
  return edges.map((path) => path.map(([lng, lat]) => [lat, lng]));
}

// ---------- ArcGIS fetch (cached per street) ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchStreetSegments(token, cacheDir) {
  const cacheFile = path.join(cacheDir, `${token.replace(/[^A-Z0-9]+/gi, "_")}.json`);
  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, "utf8"));
  }
  const where = `UPPER(ST_NAME)='${token.replace(/'/g, "''")}'`;
  const url =
    `${ARCGIS_LAYER3}?where=${encodeURIComponent(where)}` +
    `&outFields=SEGMENT_ID,ST_NAME,ST_TYPE&returnGeometry=true&outSR=4326&f=json`;

  let lastErr = "";
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) {
        lastErr = `${res.status} ${res.statusText}`;
        if (![429, 500, 502, 503, 504].includes(res.status) || attempt === 4) break;
        await sleep(1000 * 2 ** attempt);
        continue;
      }
      const data = await res.json();
      if (data.error) { lastErr = JSON.stringify(data.error); break; }
      const segments = (data.features || [])
        .filter((f) => f.geometry?.paths?.length)
        .map((f) => ({ pathsLngLat: f.geometry.paths }));
      fs.mkdirSync(cacheDir, { recursive: true });
      fs.writeFileSync(cacheFile, JSON.stringify(segments));
      return segments;
    } catch (err) {
      lastErr = err?.message || String(err);
      if (attempt === 4) break;
      await sleep(1000 * 2 ** attempt);
    }
  }
  throw new Error(`ArcGIS fetch failed for ${token}: ${lastErr}`);
}

// ---------- main ----------

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    csv: path.join(REPO, "data", "street-sweeping.csv"),
    points: path.join(REPO, "data", "sam-cross-street-points.complete-with-aliases.csv"),
    out: path.join(REPO, "data", "segment-geometry.json"),
    cacheDir: path.join(REPO, "temp", "arcgis-segment-cache"),
    rpm: 60,
    street: null,
    limitStreets: null,
  };
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--csv") opts.csv = path.resolve(args[++i]);
    else if (a === "--points") opts.points = path.resolve(args[++i]);
    else if (a === "--out") opts.out = path.resolve(args[++i]);
    else if (a === "--cache-dir") opts.cacheDir = path.resolve(args[++i]);
    else if (a === "--rpm") opts.rpm = Number(args[++i]);
    else if (a === "--street") opts.street = args[++i];
    else if (a === "--limit-streets") opts.limitStreets = Number(args[++i]);
    else throw new Error(`Unknown argument: ${a}`);
  }
  return opts;
}

function loadEndpointPoints(pointsPath) {
  const map = new Map(); // `${normStreet}|${normCross}` -> [lng, lat]
  for (const row of parseCsv(pointsPath)) {
    if (row.status !== "ok") continue;
    const lng = Number(row.lng);
    const lat = Number(row.lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) continue;
    map.set(`${row.normalized_street}|${row.normalized_cross}`, [lng, lat]);
  }
  return map;
}

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);

  const rows = parseCsv(opts.csv).filter((r) => r.main_id && r.st_name);
  const points = loadEndpointPoints(opts.points);

  // Distinct blocks, grouped by ArcGIS street token.
  const byStreet = new Map(); // token -> { stName, blocks: Map(key -> {stName,from,to}) }
  for (const row of rows) {
    if (!row.from || !row.to) continue;
    if (opts.street && normalizeStreetName(row.st_name) !== normalizeStreetName(opts.street)) {
      continue;
    }
    const token = arcgisNameToken(row.st_name);
    if (!token) continue;
    if (!byStreet.has(token)) byStreet.set(token, { stName: row.st_name, blocks: new Map() });
    const key = blockKey(row.st_name, row.from, row.to);
    byStreet.get(token).blocks.set(key, { stName: row.st_name, from: row.from, to: row.to });
  }

  let tokens = [...byStreet.keys()].sort();
  if (opts.limitStreets != null) tokens = tokens.slice(0, opts.limitStreets);

  console.log(`Loaded ${rows.length} sweeping rows, ${points.size} endpoint points`);
  console.log(`Distinct street tokens to fetch: ${tokens.length}`);
  console.log(`Rate: ${opts.rpm} ArcGIS requests/min, output: ${opts.out}`);

  const result = {};
  let mapped = 0;
  let unmapped = 0;
  let noEndpoint = 0;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const { blocks } = byStreet.get(token);
    const reqStart = Date.now();
    let segments = [];
    const cached = fs.existsSync(
      path.join(opts.cacheDir, `${token.replace(/[^A-Z0-9]+/gi, "_")}.json`),
    );
    try {
      segments = await fetchStreetSegments(token, opts.cacheDir);
    } catch (err) {
      console.warn(`  ! ${token}: ${err.message}`);
    }

    for (const blk of blocks.values()) {
      const key = blockKey(blk.stName, blk.from, blk.to);
      const normStreet = normalizeStreetName(blk.stName);
      const pFrom = points.get(`${normStreet}|${normalizeStreetName(blk.from)}`);
      const pTo = points.get(`${normStreet}|${normalizeStreetName(blk.to)}`);
      if (!pFrom || !pTo) {
        result[key] = { mapped: false, paths: [] };
        if (!pFrom && !pTo) noEndpoint += 1;
        unmapped += 1;
        continue;
      }
      const paths = segments.length ? selectBlockPaths(segments, pFrom, pTo) : [];
      if (paths.length) {
        result[key] = { mapped: true, paths };
        mapped += 1;
      } else {
        result[key] = { mapped: false, paths: [] };
        unmapped += 1;
      }
    }

    console.log(
      `${i + 1}/${tokens.length} ${token.padEnd(22)} ` +
        `segs=${String(segments.length).padStart(3)} blocks=${blocks.size} ` +
        `${cached ? "(cached)" : ""}`,
    );

    // Only throttle on real network fetches, not cache hits.
    const wait = intervalMs - (Date.now() - reqStart);
    if (!cached && i < tokens.length - 1 && wait > 0) await sleep(wait);
  }

  fs.writeFileSync(opts.out, JSON.stringify(result));
  console.log("\nDone");
  console.log(`  blocks mapped   : ${mapped}`);
  console.log(`  blocks unmapped : ${unmapped} (missing endpoint: ${noEndpoint})`);
  console.log(`  wrote ${Object.keys(result).length} block keys -> ${opts.out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
