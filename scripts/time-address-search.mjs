#!/usr/bin/env node
/**
 * Times the numbered-address search pipeline end-to-end, per address and in
 * aggregate. The "clock" runs across the full narrowing pipeline (geocode →
 * cross-street proximity → fallback ladder) and stops when the final result
 * set comes back; each case asserts that set has the expected row count.
 *
 * The functions below are CLONED VERBATIM from app.js (the network helpers and
 * the narrowing pipeline) so this measures the real code path. The only thing
 * dropped is the DOM layer (showSearchPending / staleness guard / render).
 *
 * Usage:  node scripts/time-address-search.mjs [--runs N] [--warm]
 *   --runs N : repeat each address N times, report the median (default 1)
 *   --warm   : keep the cross-street cache between addresses (default: cold,
 *              reloaded from the static CSV before each address)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const CROSS_STREET_POINTS_CSV = path.join(
  REPO,
  "sam-cross-street-points.complete-with-aliases.csv",
);

// ---------------------------------------------------------------------------
// CSV load (mirrors loadStreetData: keep rows with main_id && st_name)
// ---------------------------------------------------------------------------
let streetData = [];
function parseCsvLine(line) {
  const values = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      values.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  values.push(cur);
  return values;
}

function readCsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    return Object.fromEntries(header.map((h, i) => [h, cols[i]?.trim() ?? ""]));
  });
}

function loadStreetData() {
  streetData = readCsv(path.join(REPO, "street-sweeping.csv")).filter(
    (row) => row.main_id && row.st_name,
  );
}

// ===========================================================================
// Instrumentation
// ===========================================================================
let stats = null;

function emptyStats() {
  return {
    calls: { geocode: 0, intersection_lookup: 0, xy_lookup: 0 },
    durations: { geocode: [], intersection_lookup: [], xy_lookup: [] },
    cacheHits: { intersection_lookup: 0 },
  };
}

function resetStats() {
  stats = emptyStats();
}

async function timedJson(endpoint, url) {
  stats.calls[endpoint] += 1;
  const t0 = performance.now();
  const r = await fetch(url);
  const elapsed = performance.now() - t0;
  stats.durations[endpoint].push(elapsed);
  if (!r.ok) throw new Error(`${endpoint} failed: ${r.status} ${r.statusText}`);
  return r.json();
}

const sum = (xs) => xs.reduce((s, x) => s + x, 0);

// ===========================================================================
// CLONED FROM app.js — SAM API helpers
// ===========================================================================
const SAM_API = "https://api.sam.boston.gov";

async function samGeocode(address) {
  return timedJson("geocode", `${SAM_API}/geocode?address=${encodeURIComponent(address)}`);
}
async function samIntersectionLookup(intersection) {
  return timedJson(
    "intersection_lookup",
    `${SAM_API}/intersection_lookup?intersection=${encodeURIComponent(intersection)}`,
  );
}
async function samXyLookup(lng, lat) {
  return timedJson("xy_lookup", `${SAM_API}/xy_lookup?x=${lng}&y=${lat}`);
}

// ===========================================================================
// CLONED FROM app.js — name normalization & matching
// ===========================================================================
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

const SUFFIX_MAPPINGS = {
  street: ["st", "str"], st: ["street", "str"], avenue: ["ave", "av"],
  ave: ["avenue", "av"], drive: ["dr", "drv"], dr: ["drive", "drv"],
  road: ["rd"], rd: ["road"], boulevard: ["blvd", "boul"],
  blvd: ["boulevard", "boul"], lane: ["ln"], ln: ["lane"],
  court: ["ct", "crt"], ct: ["court", "crt"], place: ["pl", "plc"],
  pl: ["place", "plc"], circle: ["cir", "circ"], cir: ["circle", "circ"],
  terrace: ["ter", "terr"], ter: ["terrace", "terr"], highway: ["hwy"],
  hwy: ["highway"], parkway: ["pkwy", "pky"], pkwy: ["parkway", "pky"],
  square: ["sq"], sq: ["square"], way: ["wy"], park: ["pk"], pk: ["park"],
};

function normalizeStreetName(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => STREET_NAME_CANONICAL_MAP[word] || word)
    .join(" ");
}

const STREET_TYPE_WORDS = new Set([
  "street", "avenue", "road", "place", "drive", "boulevard", "lane", "court",
  "circle", "terrace", "highway", "parkway", "square", "way", "park",
]);

function stripTrailingType(normalized) {
  const words = normalized.split(" ");
  if (words.length > 1 && STREET_TYPE_WORDS.has(words[words.length - 1])) {
    return words.slice(0, -1).join(" ");
  }
  return normalized;
}

function streetNamesMatch(a, b) {
  const na = normalizeStreetName(a || "");
  const nb = normalizeStreetName(b || "");
  if (!na || !nb) return false;
  if (na === nb) return true;
  return stripTrailingType(na) === nb || na === stripTrailingType(nb);
}

function expandSearchQuery(query) {
  const words = query.split(/\s+/);
  const alternatives = new Set([query]);
  alternatives.add(normalizeStreetName(query));
  words.forEach((word, index) => {
    const lowerWord = word.toLowerCase();
    if (SUFFIX_MAPPINGS[lowerWord]) {
      SUFFIX_MAPPINGS[lowerWord].forEach((alt) => {
        const newWords = [...words];
        newWords[index] = alt;
        alternatives.add(newWords.join(" "));
        alternatives.add(normalizeStreetName(newWords.join(" ")));
      });
    }
  });
  return Array.from(alternatives);
}

function cleanSearchQuery(query) {
  let cleaned = query.replace(/^\d+\s+/, "");
  cleaned = cleaned.replace(/\./g, "");
  return cleaned;
}

function localStreetSearch(queryLower) {
  const query = cleanSearchQuery(queryLower);
  const searchTerms = expandSearchQuery(query);
  return streetData.filter((street) => {
    const streetName = street.st_name.toLowerCase();
    const normalizedStreetName = normalizeStreetName(street.st_name);
    return searchTerms.some(
      (term) => streetName.includes(term) || normalizedStreetName.includes(term),
    );
  });
}

// ===========================================================================
// CLONED FROM app.js — narrowing pipeline
// ===========================================================================
function narrowToBlocks(streetName, nearestIntersectionName, neighborhood) {
  const base = streetData.filter((row) => streetNamesMatch(row.st_name, streetName));
  const distinctBlocks = new Set(base.map((row) => `${row.from}|${row.to}`));
  if (distinctBlocks.size <= 1) return base;

  if (nearestIntersectionName) {
    const crossStreets = nearestIntersectionName
      .split(/\s*&\s*/)
      .filter((s) => !streetNamesMatch(s, streetName));
    const touching = base.filter((row) =>
      crossStreets.some(
        (cs) => streetNamesMatch(row.from, cs) || streetNamesMatch(row.to, cs),
      ),
    );
    if (touching.length) return touching;
  }

  if (neighborhood) {
    const n = neighborhood.toLowerCase().trim();
    const inNbhd = base.filter((row) => {
      const d = (row.dist_name || "").toLowerCase().trim();
      if (!d || d === "multiple") return false;
      return d === n || d.includes(n) || n.includes(d);
    });
    if (inNbhd.length) return inNbhd;
  }

  return base;
}

const CROSS_STREET_TIE_FEET = 250;
const OPPOSITE_SIDE_BUFFER_FEET = 75;
const _crossStreetPointCache = new Map();

function loadCrossStreetPointCache() {
  const rows = readCsv(CROSS_STREET_POINTS_CSV);
  let loaded = 0;
  for (const row of rows) {
    if (!row.normalized_street || !row.normalized_cross) continue;
    const lng = Number(row.lng);
    const lat = Number(row.lat);
    const pt =
      row.status === "ok" && Number.isFinite(lng) && Number.isFinite(lat)
        ? { lat, lng }
        : null;
    _crossStreetPointCache.set(
      `${row.normalized_street}|${row.normalized_cross}`,
      pt,
    );
    loaded += 1;
  }
  return loaded;
}

function isTerminalCrossStreet(name) {
  const normalized = normalizeStreetName(name || "");
  return (
    normalized === "dead end" ||
    normalized === "end of street" ||
    normalized === "mbta" ||
    normalized === "sw corridor path" ||
    normalized === "susi yard" ||
    normalized === "brookline line" ||
    normalized.includes("town line")
  );
}

async function resolveIntersectionPoint(street, cross) {
  const key = `${normalizeStreetName(street)}|${normalizeStreetName(cross)}`;
  if (_crossStreetPointCache.has(key)) {
    stats.cacheHits.intersection_lookup += 1;
    return _crossStreetPointCache.get(key);
  }
  let pt = null;
  try {
    const r = await samIntersectionLookup(`${street} and ${cross}`);
    if (r.length) {
      pt = { lat: r[0].matching_intersection_y, lng: r[0].matching_intersection_x };
    }
  } catch {
    /* leave null */
  }
  _crossStreetPointCache.set(key, pt);
  return pt;
}

function distanceFeet(a, b) {
  const FT_PER_DEG_LAT = 364567;
  const dLat = (b.lat - a.lat) * FT_PER_DEG_LAT;
  const dLng = (b.lng - a.lng) * FT_PER_DEG_LAT * Math.cos((a.lat * Math.PI) / 180);
  return Math.hypot(dLat, dLng);
}

function isOnAddressSideOfIntersection(addressPoint, intersectionPoint, point) {
  const addressDist = distanceFeet(addressPoint, intersectionPoint);
  if (addressDist < OPPOSITE_SIDE_BUFFER_FEET) return true;

  const FT_PER_DEG_LAT = 364567;
  const cosLat = Math.cos((intersectionPoint.lat * Math.PI) / 180);
  const toXY = (p) => ({
    x: (p.lng - intersectionPoint.lng) * FT_PER_DEG_LAT * cosLat,
    y: (p.lat - intersectionPoint.lat) * FT_PER_DEG_LAT,
  });
  const address = toXY(addressPoint);
  const candidate = toXY(point);
  const axisLength = Math.hypot(address.x, address.y);
  if (!axisLength) return true;
  const projection =
    (candidate.x * address.x + candidate.y * address.y) / axisLength;
  return projection >= -OPPOSITE_SIDE_BUFFER_FEET;
}

async function narrowByCrossStreetProximity(streetName, base, point) {
  const crosses = [
    ...new Set(base.flatMap((r) => [r.from, r.to]).filter(Boolean)),
  ].filter((c) => !isTerminalCrossStreet(c));
  const resolved = await Promise.all(
    crosses.map(async (name) => ({
      name,
      pt: await resolveIntersectionPoint(streetName, name),
    })),
  );

  const dist = new Map();
  const points = new Map();
  for (const { name, pt } of resolved) {
    if (pt) {
      dist.set(name, distanceFeet(point, pt));
      points.set(name, pt);
    }
  }
  if (dist.size < 2) return null;

  const ranked = [...dist.entries()].sort((a, b) => a[1] - b[1]);
  const nearest = ranked[0][0];

  const distinct = [...new Set(base.map((r) => `${r.from}|${r.to}`))].map((s) => {
    const [from, to] = s.split("|");
    return { from, to };
  });
  let candidates = distinct
    .map((blk) => {
      const onFrom = streetNamesMatch(blk.from, nearest);
      const onTo = streetNamesMatch(blk.to, nearest);
      if (!onFrom && !onTo) return null;
      const other = onFrom ? blk.to : blk.from;
      const otherDist = dist.get(other);
      if (otherDist != null)
        return { blk, other, otherDist, otherPoint: points.get(other) };
      if (!isTerminalCrossStreet(other)) return null;

      const rows = base.filter((row) => row.from === blk.from && row.to === blk.to);
      const length = Math.min(
        ...rows
          .map((row) => Number(row.miles))
          .filter((value) => Number.isFinite(value) && value > 0),
      );
      return {
        blk,
        otherDist: ranked[0][1] + (Number.isFinite(length) ? length * 5280 : 0),
        terminal: true,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.otherDist - b.otherDist);
  if (!candidates.length) return null;

  const nearestPoint = points.get(nearest);
  if (nearestPoint) {
    const sameSideCandidates = candidates.filter(
      (candidate) =>
        candidate.terminal ||
        !candidate.otherPoint ||
        isOnAddressSideOfIntersection(point, nearestPoint, candidate.otherPoint),
    );
    if (sameSideCandidates.length) candidates = sameSideCandidates;
  }

  const nearestOther = candidates[0].otherDist;
  const chosen = candidates.filter((c) => c.otherDist - nearestOther <= CROSS_STREET_TIE_FEET);

  return base.filter((row) =>
    chosen.some((c) => row.from === c.blk.from && row.to === c.blk.to),
  );
}

async function narrowAddressMatch(match) {
  const base = streetData.filter((row) => streetNamesMatch(row.st_name, match.street_name));
  const distinctBlocks = new Set(base.map((row) => `${row.from}|${row.to}`));
  if (distinctBlocks.size <= 1) return base;

  const point = { lat: match.matching_address_y, lng: match.matching_address_x };

  try {
    const byProximity = await narrowByCrossStreetProximity(match.street_name, base, point);
    if (byProximity?.length) return byProximity;
  } catch {
    /* fall through */
  }

  let intersectionName = null;
  try {
    const xy = await samXyLookup(match.matching_address_x, match.matching_address_y);
    intersectionName = xy.nearest_intersection_name || null;
  } catch {
    /* ignore */
  }
  return narrowToBlocks(match.street_name, intersectionName, match.planning_neighborhood);
}

// performAddressSearch core (DOM layer removed) — returns the final match set.
async function runAddressSearch(rawQuery) {
  let matches = [];
  try {
    const geo = await samGeocode(rawQuery);
    if (geo.length) {
      const topScore = geo[0].match_score;
      const topMatches = geo.filter((m) => m.match_score === topScore && topScore > 0);
      const blockSets = await Promise.all(topMatches.map(narrowAddressMatch));
      const byId = new Map();
      for (const set of blockSets) for (const row of set) byId.set(row.main_id, row);
      matches = [...byId.values()];
    }
  } catch {
    /* fall through to local */
  }
  if (!matches.length) matches = localStreetSearch(rawQuery.toLowerCase());
  return matches;
}

// ===========================================================================
// Timing harness
// ===========================================================================
const CASES = [
  { query: "122 commonwealth", expected: 2 },
  { query: "1950 commonwealth", expected: 3 },
  { query: "130 newbury", expected: null },
];

function parseArgs() {
  const args = process.argv.slice(2);
  let runs = 1;
  let warm = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--runs") runs = Math.max(1, parseInt(args[++i], 10) || 1);
    else if (args[i] === "--warm") warm = true;
  }
  return { runs, warm };
}

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const fmt = (ms) => `${ms.toFixed(0)} ms`;
const countCalls = (s) =>
  s.calls.geocode + s.calls.intersection_lookup + s.calls.xy_lookup;
const blockKey = (row) => `${row.st_name}: ${row.from} -> ${row.to}`;

function describeMatches(matches) {
  const blocks = [...new Set(matches.map(blockKey))];
  return blocks.length ? blocks.join("; ") : "no CSV block";
}

function summarizeRunStats(s) {
  return [
    `${countCalls(s)} SAM call${countCalls(s) === 1 ? "" : "s"}`,
    `geocode ${s.calls.geocode} (${fmt(sum(s.durations.geocode))})`,
    `intersection ${s.calls.intersection_lookup} (${fmt(sum(s.durations.intersection_lookup))})`,
    `xy ${s.calls.xy_lookup} (${fmt(sum(s.durations.xy_lookup))})`,
    `intersection cache hits ${s.cacheHits.intersection_lookup}`,
  ].join(" | ");
}

async function main() {
  const { runs, warm } = parseArgs();
  loadStreetData();
  const precomputedCount = loadCrossStreetPointCache();
  console.log(
    `Loaded ${streetData.length} street segments | ${precomputedCount} precomputed cross-street points | runs=${runs} | cache=${warm ? "warm (shared)" : "cold (static cache reloaded per address)"}\n`,
  );

  const perCase = [];
  for (const { query, expected } of CASES) {
    const times = [];
    const runStats = [];
    let lastCount = null;
    let lastMatches = [];
    for (let r = 0; r < runs; r++) {
      if (!warm) {
        _crossStreetPointCache.clear();
        loadCrossStreetPointCache();
      }
      resetStats();
      const t0 = performance.now();
      const matches = await runAddressSearch(query);
      const elapsed = performance.now() - t0;
      times.push(elapsed);
      runStats.push(stats);
      lastCount = matches.length;
      lastMatches = matches;
    }
    const t = median(times);
    const comparable = expected != null;
    const ok = !comparable || lastCount === expected;
    const medianStats = runStats[times.indexOf(t)] ?? runStats[runStats.length - 1];
    perCase.push({ query, expected, got: lastCount, t, ok, stats: medianStats });
    console.log(
      `${ok ? "✅" : "❌"} "${query}"  ${fmt(t)}  → ${lastCount} result${lastCount === 1 ? "" : "s"}${comparable ? ` (expected ${expected})` : ""}`,
    );
    console.log(`   ${summarizeRunStats(medianStats)}`);
    console.log(`   ${describeMatches(lastMatches)}\n`);
  }

  const total = perCase.reduce((s, c) => s + c.t, 0);
  const avg = total / perCase.length;
  const allOk = perCase.every((c) => c.ok);
  console.log("\n── aggregate ──");
  console.log(`  total : ${fmt(total)}`);
  console.log(`  avg   : ${fmt(avg)} per address`);
  const totalCalls = perCase.reduce((s, c) => s + countCalls(c.stats), 0);
  console.log(`  calls : ${totalCalls} SAM calls across median runs`);
  console.log(`  status: ${allOk ? "all asserted counts correct ✅" : "MISMATCH ❌"}`);
  process.exit(allOk ? 0 : 1);
}

main();
