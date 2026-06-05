/**
 * Node-runnable mirror of app.js's search pipeline (address + intersection),
 * for the test suite (scripts/search.test.mjs) and result dumps. The narrowing
 * functions are CLONED VERBATIM from app.js — same caveat as
 * scripts/time-address-search.mjs — minus the DOM layer (render / staleness
 * guard). Network helpers use plain fetch. Keep in sync with app.js.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAM_API = "https://api.sam.boston.gov";

// ---------- CSV ----------
function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i += 1; }
      else if (ch === '"') q = false;
      else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}
function readCsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    return Object.fromEntries(header.map((h, i) => [h, cols[i]?.trim() ?? ""]));
  });
}

let streetData = [];
const _crossStreetPointCache = new Map();

export function loadData() {
  streetData = readCsv(path.join(REPO, "data", "street-sweeping.csv")).filter(
    (row) => row.main_id && row.st_name,
  );
  for (const row of readCsv(
    path.join(REPO, "data", "sam-cross-street-points.complete-with-aliases.csv"),
  )) {
    if (!row.normalized_street || !row.normalized_cross) continue;
    const lng = Number(row.lng);
    const lat = Number(row.lat);
    const pt =
      row.status === "ok" && Number.isFinite(lng) && Number.isFinite(lat)
        ? { lat, lng }
        : null;
    _crossStreetPointCache.set(`${row.normalized_street}|${row.normalized_cross}`, pt);
  }
  return { streets: streetData.length, crossPoints: _crossStreetPointCache.size };
}

// ---------- SAM ----------
async function samJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`SAM ${r.status}`);
  return r.json();
}
const samGeocode = (a) => samJson(`${SAM_API}/geocode?address=${encodeURIComponent(a)}`);
const samIntersectionLookup = (i) =>
  samJson(`${SAM_API}/intersection_lookup?intersection=${encodeURIComponent(i)}`);
const samXyLookup = (lng, lat) => samJson(`${SAM_API}/xy_lookup?x=${lng}&y=${lat}`);

// ---------- name matching (cloned from app.js) ----------
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
const STREET_TYPE_WORDS = new Set([
  "street", "avenue", "road", "place", "drive", "boulevard", "lane", "court",
  "circle", "terrace", "highway", "parkway", "square", "way", "park",
]);
function normalizeStreetName(str) {
  return (str || "").toLowerCase().split(/\s+/)
    .map((w) => STREET_NAME_CANONICAL_MAP[w] || w).join(" ");
}
function stripTrailingType(n) {
  const w = n.split(" ");
  return w.length > 1 && STREET_TYPE_WORDS.has(w[w.length - 1]) ? w.slice(0, -1).join(" ") : n;
}
function streetNamesMatch(a, b) {
  const na = normalizeStreetName(a || "");
  const nb = normalizeStreetName(b || "");
  if (!na || !nb) return false;
  if (na === nb) return true;
  return stripTrailingType(na) === nb || na === stripTrailingType(nb);
}
function localStreetSearch(queryLower) {
  const q = queryLower.replace(/^\d+\s+/, "").replace(/\./g, "");
  const norm = normalizeStreetName(q);
  return streetData.filter((s) => {
    const name = s.st_name.toLowerCase();
    return name.includes(q) || normalizeStreetName(s.st_name).includes(norm);
  });
}

// ---------- narrowing (cloned from app.js) ----------
function isTerminalCrossStreet(name) {
  const n = normalizeStreetName(name || "");
  return ["dead end", "end of street", "mbta", "sw corridor path", "susi yard", "brookline line"]
    .includes(n) || n.includes("town line");
}
async function resolveIntersectionPoint(street, cross) {
  const key = `${normalizeStreetName(street)}|${normalizeStreetName(cross)}`;
  if (_crossStreetPointCache.has(key)) return _crossStreetPointCache.get(key);
  let pt = null;
  try {
    const r = await samIntersectionLookup(`${street} and ${cross}`);
    if (r.length) pt = { lat: r[0].matching_intersection_y, lng: r[0].matching_intersection_x };
  } catch { /* null */ }
  _crossStreetPointCache.set(key, pt);
  return pt;
}
const FT_PER_DEG_LAT = 364567;
function distanceFeet(a, b) {
  const dLat = (b.lat - a.lat) * FT_PER_DEG_LAT;
  const dLng = (b.lng - a.lng) * FT_PER_DEG_LAT * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(dLat, dLng);
}
const CROSS_STREET_TIE_FEET = 250;
const OPPOSITE_SIDE_BUFFER_FEET = 75;
function isOnAddressSideOfIntersection(addressPoint, intersectionPoint, point) {
  if (distanceFeet(addressPoint, intersectionPoint) < OPPOSITE_SIDE_BUFFER_FEET) return true;
  const cos = Math.cos((intersectionPoint.lat * Math.PI) / 180);
  const xy = (p) => ({
    x: (p.lng - intersectionPoint.lng) * FT_PER_DEG_LAT * cos,
    y: (p.lat - intersectionPoint.lat) * FT_PER_DEG_LAT,
  });
  const a = xy(addressPoint);
  const c = xy(point);
  const len = Math.hypot(a.x, a.y);
  if (!len) return true;
  return (c.x * a.x + c.y * a.y) / len >= -OPPOSITE_SIDE_BUFFER_FEET;
}
async function narrowByCrossStreetProximity(streetName, base, point) {
  const crosses = [...new Set(base.flatMap((r) => [r.from, r.to]).filter(Boolean))]
    .filter((c) => !isTerminalCrossStreet(c));
  const resolved = await Promise.all(
    crosses.map(async (name) => ({ name, pt: await resolveIntersectionPoint(streetName, name) })),
  );
  const dist = new Map();
  const points = new Map();
  for (const { name, pt } of resolved) {
    if (pt) { dist.set(name, distanceFeet(point, pt)); points.set(name, pt); }
  }
  if (dist.size < 2) return null;
  const ranked = [...dist.entries()].sort((a, b) => a[1] - b[1]);
  const nearest = ranked[0][0];
  const distinct = [...new Set(base.map((r) => `${r.from}|${r.to}`))].map((s) => {
    const [from, to] = s.split("|");
    return { from, to };
  });
  let candidates = distinct.map((blk) => {
    const onFrom = streetNamesMatch(blk.from, nearest);
    const onTo = streetNamesMatch(blk.to, nearest);
    if (!onFrom && !onTo) return null;
    const other = onFrom ? blk.to : blk.from;
    const otherDist = dist.get(other);
    if (otherDist != null) return { blk, other, otherDist, otherPoint: points.get(other) };
    if (!isTerminalCrossStreet(other)) return null;
    const rows = base.filter((row) => row.from === blk.from && row.to === blk.to);
    const length = Math.min(...rows.map((r) => Number(r.miles)).filter((v) => Number.isFinite(v) && v > 0));
    return { blk, otherDist: ranked[0][1] + (Number.isFinite(length) ? length * 5280 : 0), terminal: true };
  }).filter(Boolean).sort((a, b) => a.otherDist - b.otherDist);
  if (!candidates.length) return null;
  const nearestPoint = points.get(nearest);
  if (nearestPoint) {
    const sameSide = candidates.filter((c) =>
      c.terminal || !c.otherPoint || isOnAddressSideOfIntersection(point, nearestPoint, c.otherPoint));
    if (sameSide.length) candidates = sameSide;
  }
  const nearestOther = candidates[0].otherDist;
  const chosen = candidates.filter((c) => c.otherDist - nearestOther <= CROSS_STREET_TIE_FEET);
  return base.filter((row) => chosen.some((c) => row.from === c.blk.from && row.to === c.blk.to));
}
function narrowToBlocks(streetName, nearestIntersectionName, neighborhood) {
  const base = streetData.filter((r) => streetNamesMatch(r.st_name, streetName));
  if (new Set(base.map((r) => `${r.from}|${r.to}`)).size <= 1) return base;
  if (nearestIntersectionName) {
    const crosses = nearestIntersectionName.split(/\s*&\s*/).filter((s) => !streetNamesMatch(s, streetName));
    const touching = base.filter((r) => crosses.some((cs) => streetNamesMatch(r.from, cs) || streetNamesMatch(r.to, cs)));
    if (touching.length) return touching;
  }
  if (neighborhood) {
    const n = neighborhood.toLowerCase().trim();
    const inNbhd = base.filter((r) => {
      const d = (r.dist_name || "").toLowerCase().trim();
      return d && d !== "multiple" && (d === n || d.includes(n) || n.includes(d));
    });
    if (inNbhd.length) return inNbhd;
  }
  return base;
}
async function narrowAddressMatch(match) {
  const base = streetData.filter((r) => streetNamesMatch(r.st_name, match.street_name));
  if (new Set(base.map((r) => `${r.from}|${r.to}`)).size <= 1) return base;
  const point = { lat: match.matching_address_y, lng: match.matching_address_x };
  try {
    const byProx = await narrowByCrossStreetProximity(match.street_name, base, point);
    if (byProx?.length) return byProx;
  } catch { /* fall through */ }
  let intersectionName = null;
  try {
    intersectionName = (await samXyLookup(match.matching_address_x, match.matching_address_y))
      .nearest_intersection_name || null;
  } catch { /* ignore */ }
  return narrowToBlocks(match.street_name, intersectionName, match.planning_neighborhood);
}

// ---------- intersection (cloned from app.js, incl. addCornerContainingBlocks) ----------
function filterByIntersection(intrString) {
  const parts = intrString.split(/\s+(?:and|&)\s+/i);
  if (parts.length !== 2) return [];
  const [a, b] = [parts[0].trim(), parts[1].trim()];
  return streetData.filter((row) => {
    const mA = streetNamesMatch(row.st_name, a);
    const mB = streetNamesMatch(row.st_name, b);
    const fromA = streetNamesMatch(row.from, a), fromB = streetNamesMatch(row.from, b);
    const toA = streetNamesMatch(row.to, a), toB = streetNamesMatch(row.to, b);
    return (mA && (fromB || toB)) || (mB && (fromA || toA));
  });
}
async function addCornerContainingBlocks(intrName, samBest, matches) {
  const parts = intrName.split(/\s+(?:and|&)\s+/i).map((s) => s.trim());
  if (parts.length !== 2) return matches;
  const point = { lat: samBest.matching_intersection_y, lng: samBest.matching_intersection_x };
  if (point.lat == null || point.lng == null) return matches;
  const byId = new Map(matches.map((r) => [r.main_id, r]));
  for (const street of parts) {
    if (matches.some((r) => streetNamesMatch(r.st_name, street))) continue;
    const base = streetData.filter((r) => streetNamesMatch(r.st_name, street));
    if (!base.length) continue;
    let rows = [];
    try { rows = (await narrowByCrossStreetProximity(street, base, point)) || []; } catch { rows = []; }
    if (!rows.length && new Set(base.map((r) => `${r.from}|${r.to}`)).size === 1) rows = base;
    for (const r of rows) byId.set(r.main_id, r);
  }
  return [...byId.values()];
}
async function runIntersectionSearch(rawQuery) {
  let matches = [];
  try {
    const data = await samIntersectionLookup(rawQuery);
    if (data.length) {
      const intrName = data[0].matching_intersection_full.split(",")[0];
      matches = filterByIntersection(intrName);
      matches = await addCornerContainingBlocks(intrName, data[0], matches);
    }
  } catch { /* fall through */ }
  if (!matches.length) matches = filterByIntersection(rawQuery);
  return matches;
}
async function runAddressSearch(rawQuery) {
  let matches = [];
  try {
    const geo = await samGeocode(rawQuery);
    if (geo.length) {
      const top = geo[0].match_score;
      const topMatches = geo.filter((m) => m.match_score === top && top > 0);
      const sets = await Promise.all(topMatches.map(narrowAddressMatch));
      const byId = new Map();
      for (const set of sets) for (const row of set) byId.set(row.main_id, row);
      matches = [...byId.values()];
    }
  } catch { /* fall through */ }
  if (!matches.length) matches = localStreetSearch(rawQuery.toLowerCase());
  return matches;
}

const isIntersectionQuery = (q) => /\s+(and|&)\s+/i.test(q);
const isNumberedAddress = (q) => /^\d+\s+\S/.test(q);

// Dispatch like performSearch (precise mode). Returns the matched CSV rows.
export async function runSearch(query) {
  const raw = query.trim();
  if (isIntersectionQuery(raw)) return runIntersectionSearch(raw);
  if (isNumberedAddress(raw)) return runAddressSearch(raw);
  return localStreetSearch(raw.toLowerCase());
}

// Distinct "st_name | from | to" blocks in a result set (order-independent).
export const distinctBlocks = (rows) =>
  [...new Set(rows.map((r) => `${r.st_name} | ${r.from} | ${r.to}`))].sort();
