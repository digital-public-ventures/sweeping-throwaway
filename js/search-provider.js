/**
 * Notify Boston - Search Results Provider
 *
 * The data layer behind the search box. Given a query string it talks to SAM,
 * normalizes street names, runs the narrowing logic, and returns plain result
 * data — `{ baseRows, filterDefs, emptyMessage, focus }` — with no DOM access.
 * app.js consumes that data and turns it into the displayed table/map.
 *
 * Loaded as a plain <script> BEFORE app.js so these globals exist before any
 * event listener in app.js can fire.
 */

// ============================================
// DATA
// ============================================

// All street-sweeping CSV rows (one per block/side). Populated by loadStreetData.
let streetData = [];

const CROSS_STREET_POINTS_CSV =
  "data/sam-cross-street-points.complete-with-aliases.csv";

// ============================================
// SAM API — Boston Street Address Management
// ============================================
// One source of truth for SAM URLs. Each helper returns the parsed JSON.
// Spec: https://api.sam.boston.gov/openapi.yaml

const SAM_API = "https://api.sam.boston.gov";

async function samGeocode(address) {
  const r = await fetch(
    `${SAM_API}/geocode?address=${encodeURIComponent(address)}`,
  );
  return r.json();
}

async function samIntersectionLookup(intersection) {
  const r = await fetch(
    `${SAM_API}/intersection_lookup?intersection=${encodeURIComponent(intersection)}`,
  );
  return r.json();
}

async function samXyLookup(lng, lat) {
  const r = await fetch(`${SAM_API}/xy_lookup?x=${lng}&y=${lat}`);
  return r.json();
}

// ============================================
// QUERY SHAPE
// ============================================

// Detect "Street A and Street B" / "Street A & Street B" queries.
const isIntersectionQuery = (q) => /\s+(and|&)\s+/i.test(q);

// A numbered address: leading digits + a street fragment ("122 Commonwealth").
const isNumberedAddress = (q) => /^\d+\s+\S/.test(q);

// Street suffix abbreviation mappings for fuzzy search
const SUFFIX_MAPPINGS = {
  street: ["st", "str"],
  st: ["street", "str"],
  avenue: ["ave", "av"],
  ave: ["avenue", "av"],
  drive: ["dr", "drv"],
  dr: ["drive", "drv"],
  road: ["rd"],
  rd: ["road"],
  boulevard: ["blvd", "boul"],
  blvd: ["boulevard", "boul"],
  lane: ["ln"],
  ln: ["lane"],
  court: ["ct", "crt"],
  ct: ["court", "crt"],
  place: ["pl", "plc"],
  pl: ["place", "plc"],
  circle: ["cir", "circ"],
  cir: ["circle", "circ"],
  terrace: ["ter", "terr"],
  ter: ["terrace", "terr"],
  highway: ["hwy"],
  hwy: ["highway"],
  parkway: ["pkwy", "pky"],
  pkwy: ["parkway", "pky"],
  square: ["sq"],
  sq: ["square"],
  way: ["wy"],
  park: ["pk"],
  pk: ["park"],
};

// Canonical-form lookup used by normalizeStreetName. Hoisted out of the
// function body because it's iterated thousands of times during intersection
// filtering — we don't want to rebuild the literal per call.
//
// Numeric ordinals (1st–9th) cover all of Boston's word-form numbered
// streets; there's no Tenth St or higher in the sweeping CSV.
//
// Cardinal-direction abbreviations (w/e/n/s) make the geocode-driven path
// match CSV entries like "W Seventh St". Caveat: South Boston has lettered
// streets "E St" and "N St" which now lump in with "east"/"north" searches.
const STREET_NAME_CANONICAL_MAP = {
  st: "street",
  str: "street",
  ave: "avenue",
  av: "avenue",
  dr: "drive",
  drv: "drive",
  rd: "road",
  blvd: "boulevard",
  boul: "boulevard",
  ln: "lane",
  ct: "court",
  crt: "court",
  pl: "place",
  plc: "place",
  cir: "circle",
  circ: "circle",
  ter: "terrace",
  terr: "terrace",
  hwy: "highway",
  pkwy: "parkway",
  pky: "parkway",
  sq: "square",
  wy: "way",
  pk: "park",
  "1st": "first",
  "2nd": "second",
  "3rd": "third",
  "4th": "fourth",
  "5th": "fifth",
  "6th": "sixth",
  "7th": "seventh",
  "8th": "eighth",
  "9th": "ninth",
  w: "west",
  e: "east",
  n: "north",
  s: "south",
};

// ============================================
// STREET-NAME NORMALIZATION & MATCHING
// ============================================

function normalizeStreetName(str) {
  return str
    .toLowerCase()
    .split(/\s+/)
    .map((word) => STREET_NAME_CANONICAL_MAP[word] || word)
    .join(" ");
}

// Canonical street-type words (the full forms STREET_NAME_CANONICAL_MAP
// produces). Used to allow a bare name ("Beacon") to match a typed name
// ("Beacon St") without letting look-alikes collide.
const STREET_TYPE_WORDS = new Set([
  "street",
  "avenue",
  "road",
  "place",
  "drive",
  "boulevard",
  "lane",
  "court",
  "circle",
  "terrace",
  "highway",
  "parkway",
  "square",
  "way",
  "park",
]);

function stripTrailingType(normalized) {
  const words = normalized.split(" ");
  if (words.length > 1 && STREET_TYPE_WORDS.has(words[words.length - 1])) {
    return words.slice(0, -1).join(" ");
  }
  return normalized;
}

// Whole-name match for street names. Normalized equality, allowing a trailing
// street-type word to be dropped from ONE side only:
//   "Beacon" ↔ "Beacon St"            ✓ (drop type from one side)
//   "Beacon St" ↔ "Beacon Ave"        ✗ (never strip type from both)
//   "Charles St" ↔ "Charles Street South" ✗ ("south" is not a type word)
//   "Charles St" ↔ "Charlesgate East" ✗
// This replaces the loose substring .includes() matching that over-matched
// look-alike street names.
function streetNamesMatch(a, b) {
  const na = normalizeStreetName(a || "");
  const nb = normalizeStreetName(b || "");
  if (!na || !nb) return false;
  if (na === nb) return true;
  return stripTrailingType(na) === nb || na === stripTrailingType(nb);
}

function expandSearchQuery(query) {
  // Generate alternative search terms based on suffix mappings
  const words = query.split(/\s+/);
  const alternatives = new Set([query]);

  // Add the normalized version
  alternatives.add(normalizeStreetName(query));

  // Generate all combinations with suffix variations
  words.forEach((word, index) => {
    const lowerWord = word.toLowerCase();
    if (SUFFIX_MAPPINGS[lowerWord]) {
      SUFFIX_MAPPINGS[lowerWord].forEach((alt) => {
        const newWords = [...words];
        newWords[index] = alt;
        alternatives.add(newWords.join(" "));
        // Also add normalized version of this variation
        alternatives.add(normalizeStreetName(newWords.join(" ")));
      });
    }
  });

  return Array.from(alternatives);
}

function cleanSearchQuery(query) {
  // Strip leading numbers (e.g., "200 Boylston St" -> "Boylston St")
  let cleaned = query.replace(/^\d+\s+/, "");
  // Strip periods (e.g., "St." -> "St")
  cleaned = cleaned.replace(/\./g, "");
  return cleaned;
}

// ============================================
// DATA LOADING
// ============================================

// Fetch + parse the street-sweeping CSV into `streetData`. Returns a promise so
// the caller can show/clear its own loading UI (this layer stays DOM-free).
function loadStreetData() {
  return new Promise((resolve, reject) => {
    Papa.parse("data/street-sweeping.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        streetData = results.data.filter((row) => row.main_id && row.st_name);
        console.log(`Loaded ${streetData.length} street segments`);
        resolve(streetData);
      },
      error: (error) => {
        console.error("Error loading CSV:", error);
        reject(error);
      },
    });
  });
}

// ============================================
// LOCAL / INTERSECTION ROW MATCHING
// ============================================

// Local substring search over the CSV. Strips a leading house number and
// expands abbreviations, then matches against raw or normalized st_name.
// Shared by the plain-name path and as a fallback for the address path.
function localStreetSearch(queryLower) {
  const query = cleanSearchQuery(queryLower);
  const searchTerms = expandSearchQuery(query);
  return streetData.filter((street) => {
    const streetName = street.st_name.toLowerCase();
    const normalizedStreetName = normalizeStreetName(street.st_name);
    return searchTerms.some(
      (term) =>
        streetName.includes(term) || normalizedStreetName.includes(term),
    );
  });
}

// Given an intersection-shaped string like "Beacon St & Charles St" or
// "Beacon and Charles", return CSV rows whose st_name matches one side of
// the intersection AND whose from/to contains the other.
function filterByIntersection(intrString) {
  const parts = intrString.split(/\s+(?:and|&)\s+/i);
  if (parts.length !== 2) return [];
  const a = parts[0].trim();
  const b = parts[1].trim();
  // A block terminates at the corner when its st_name is one cross-street AND
  // its from/to is the other. Whole-name matching (not substring) so "Charles
  // St" doesn't pull in "Charles Street South" / "Charlesgate East".
  return streetData.filter((row) => {
    const matchesA = streetNamesMatch(row.st_name, a);
    const matchesB = streetNamesMatch(row.st_name, b);
    const fromA = streetNamesMatch(row.from, a);
    const fromB = streetNamesMatch(row.from, b);
    const toA = streetNamesMatch(row.to, a);
    const toB = streetNamesMatch(row.to, b);
    return (matchesA && (fromB || toB)) || (matchesB && (fromA || toA));
  });
}

// ============================================
// CROSS-STREET PROXIMITY NARROWING
// ============================================
// The tightest narrowing rung. A CSV block is bounded by two cross streets
// (`from`/`to`); we geocode each distinct cross street, rank them by straight-
// line distance to the address, and return the block bounded by the nearest
// cross street and its nearest block-partner. This sidesteps two dead ends the
// Phase-2 spike exposed (see temp/plans/search-narrowing-two-phase.md):
//   - SAM's nearest *centerline* at a mid-block address is often the alley
//     behind the building, not the avenue — so xy_lookup's intersection misses.
//   - A divided arterial (Commonwealth Ave = 204 ArcGIS segments, ~3× its true
//     length) has no single centerline to measure distance *along*; ranking
//     cross-street *points* by raw distance needs no centerline at all.

const CROSS_STREET_TIE_FEET = 250; // within this, two blocks are a tie → return both
const OPPOSITE_SIDE_BUFFER_FEET = 75;

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

// SAM intersection_lookup is network; cache per (street, cross) for the session
// since a street's cross streets are stable and re-queried across keystrokes.
const _crossStreetPointCache = new Map();
let _crossStreetPointCacheLoadPromise = null;

function loadCrossStreetPointCache() {
  if (_crossStreetPointCacheLoadPromise) return _crossStreetPointCacheLoadPromise;

  _crossStreetPointCacheLoadPromise = new Promise((resolve) => {
    Papa.parse(CROSS_STREET_POINTS_CSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let loaded = 0;
        for (const row of results.data) {
          const key = `${row.normalized_street}|${row.normalized_cross}`;
          if (!row.normalized_street || !row.normalized_cross) continue;
          const lng = Number(row.lng);
          const lat = Number(row.lat);
          const pt =
            row.status === "ok" && Number.isFinite(lng) && Number.isFinite(lat)
              ? { lat, lng }
              : null;
          _crossStreetPointCache.set(key, pt);
          loaded += 1;
        }
        console.log(`Loaded ${loaded} precomputed cross-street points`);
        resolve();
      },
      error: (error) => {
        console.warn(
          "Could not load precomputed cross-street points; falling back to SAM.",
          error,
        );
        resolve();
      },
    });
  });

  return _crossStreetPointCacheLoadPromise;
}

async function resolveIntersectionPoint(street, cross) {
  const key = `${normalizeStreetName(street)}|${normalizeStreetName(cross)}`;
  await loadCrossStreetPointCache();
  if (_crossStreetPointCache.has(key)) return _crossStreetPointCache.get(key);
  let pt = null;
  try {
    const r = await samIntersectionLookup(`${street} and ${cross}`);
    if (r.length)
      pt = {
        lat: r[0].matching_intersection_y,
        lng: r[0].matching_intersection_x,
      };
  } catch {
    // leave null — caller treats unresolved cross streets as "can't place"
  }
  _crossStreetPointCache.set(key, pt);
  return pt;
}

// Equirectangular distance in feet — fine at city scale for ranking.
function distanceFeet(a, b) {
  const FT_PER_DEG_LAT = 364567;
  const dLat = (b.lat - a.lat) * FT_PER_DEG_LAT;
  const dLng =
    (b.lng - a.lng) * FT_PER_DEG_LAT * Math.cos((a.lat * Math.PI) / 180);
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

// Returns the CSV rows for the block(s) bounding `point`, or null if the cross
// streets can't be placed (caller then falls back to the ladder). Always both
// sides — collects every row sharing the chosen block's from/to.
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
  for (const { name, pt } of resolved)
    if (pt) {
      dist.set(name, distanceFeet(point, pt));
      points.set(name, pt);
    }
  if (dist.size < 2) return null;

  // Nearest cross street to the address.
  const ranked = [...dist.entries()].sort((a, b) => a[1] - b[1]);
  const nearest = ranked[0][0];

  // Among distinct blocks touching the nearest cross street, rank by how close
  // their OTHER endpoint is — the block whose far corner is nearest brackets
  // the address most tightly.
  const distinct = [...new Set(base.map((r) => `${r.from}|${r.to}`))].map(
    (s) => {
      const [from, to] = s.split("|");
      return { from, to };
    },
  );
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

      const rows = base.filter(
        (row) => row.from === blk.from && row.to === blk.to,
      );
      const length = Math.min(
        ...rows
          .map((row) => Number(row.miles))
          .filter((value) => Number.isFinite(value) && value > 0),
      );
      const lengthFeet = Number.isFinite(length) ? length * 5280 : 0;
      return {
        blk,
        // For true terminal/boundary endpoints there is no intersection point
        // to fetch. Treat the block as one-ended and use CSV length so the
        // shortest overlapping terminal segment wins.
        otherDist: ranked[0][1] + lengthFeet,
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

  // Tie window: an address sitting on top of a major intersection may have two
  // adjacent blocks nearly equidistant (e.g. 1950 Commonwealth at Chestnut Hill
  // Ave). Return both rather than guess.
  const nearestOther = candidates[0].otherDist;
  const chosen = candidates.filter(
    (c) => c.otherDist - nearestOther <= CROSS_STREET_TIE_FEET,
  );

  return base.filter((row) =>
    chosen.some((c) => row.from === c.blk.from && row.to === c.blk.to),
  );
}

// ============================================
// ADDRESS / INTERSECTION FILTER-DEF BUILDERS
// ============================================

// Build the base row set (all results for the nearest road) plus the debug
// filters for an address-style search across one or more tied geocode matches.
// Each filter precomputes the main_ids it keeps so toggling stays network-free.
// The filter that production's ladder would have fired (proximity → nearest
// intersection → neighborhood) starts checked, so the default view matches the
// shipped narrowing; unchecking widens toward the whole street.
async function buildAddressFilterDefs(matches) {
  const baseById = new Map();
  const proxIds = new Set();
  const intxIds = new Set();
  const nbhdIds = new Set();
  let proxAvail = false;
  let intxAvail = false;
  let nbhdAvail = false;

  for (const m of matches) {
    const base = streetData.filter((r) => streetNamesMatch(r.st_name, m.street_name));
    for (const r of base) baseById.set(r.main_id, r);
    const point = { lat: m.matching_address_y, lng: m.matching_address_x };

    try {
      const prox = await narrowByCrossStreetProximity(m.street_name, base, point);
      if (prox?.length) {
        proxAvail = true;
        for (const r of prox) proxIds.add(r.main_id);
      }
    } catch {
      /* proximity unavailable */
    }

    try {
      const xy = await samXyLookup(m.matching_address_x, m.matching_address_y);
      const name = xy.nearest_intersection_name;
      if (name) {
        const crosses = name
          .split(/\s*&\s*/)
          .filter((s) => !streetNamesMatch(s, m.street_name));
        const touching = base.filter((r) =>
          crosses.some((cs) => streetNamesMatch(r.from, cs) || streetNamesMatch(r.to, cs)),
        );
        if (touching.length) {
          intxAvail = true;
          for (const r of touching) intxIds.add(r.main_id);
        }
      }
    } catch {
      /* xy_lookup unavailable */
    }

    const nb = (m.planning_neighborhood || "").toLowerCase().trim();
    if (nb) {
      const inN = base.filter((r) => {
        const d = (r.dist_name || "").toLowerCase().trim();
        return d && d !== "multiple" && (d === nb || d.includes(nb) || nb.includes(d));
      });
      if (inN.length) {
        nbhdAvail = true;
        for (const r of inN) nbhdIds.add(r.main_id);
      }
    }
  }

  // Match the production ladder's "first rung that fires" as the default.
  const fired = proxAvail ? "proximity" : intxAvail ? "intersection" : nbhdAvail ? "neighborhood" : null;
  const filterDefs = [
    { id: "proximity", label: "Cross-street proximity", keepIds: proxIds, available: proxAvail, defaultChecked: fired === "proximity" },
    { id: "intersection", label: "Nearest intersection", keepIds: intxIds, available: intxAvail, defaultChecked: fired === "intersection" },
    { id: "neighborhood", label: "Neighborhood", keepIds: nbhdIds, available: nbhdAvail, defaultChecked: fired === "neighborhood" },
  ];
  return { base: [...baseById.values()], filterDefs };
}

// filterByIntersection only matches blocks that *terminate* at the corner (one
// street's name, the other in from/to). A street that isn't subdivided at the
// corner — e.g. Charles St is one long block Boylston→Nashua that passes through
// Beacon — has no such block, so only the other street showed up. For any corner
// street missing from `matches`, add the block that *contains* the corner,
// chosen by proximity to the SAM intersection point. Dedupe by main_id.
async function addCornerContainingBlocks(intrName, samBest, matches) {
  const parts = intrName.split(/\s+(?:and|&)\s+/i).map((s) => s.trim());
  if (parts.length !== 2) return matches;
  const point = {
    lat: samBest.matching_intersection_y,
    lng: samBest.matching_intersection_x,
  };
  if (point.lat == null || point.lng == null) return matches;

  const byId = new Map(matches.map((r) => [r.main_id, r]));
  for (const street of parts) {
    if (matches.some((r) => streetNamesMatch(r.st_name, street))) continue;
    const base = streetData.filter((r) => streetNamesMatch(r.st_name, street));
    if (!base.length) continue;
    let rows = [];
    try {
      rows = (await narrowByCrossStreetProximity(street, base, point)) || [];
    } catch {
      rows = [];
    }
    // Proximity needs ≥2 resolvable cross streets to decide; if it can't but the
    // street is a single unambiguous block, that block contains the corner.
    if (!rows.length && new Set(base.map((r) => `${r.from}|${r.to}`)).size === 1) {
      rows = base;
    }
    for (const r of rows) byId.set(r.main_id, r);
  }
  return [...byId.values()];
}

// ============================================
// QUERY → RESULT DATA
// ============================================
// The two async entry points. Each RETURNS plain result data — it never touches
// the DOM. app.js applies the payload (base rows + debug filters + optional map
// focus + empty-state message) to the page.

// Intersection query → SAM-first / local-fallback pipeline. `focus` is the corner
// point the map should center on (null when SAM gives no point / on fallback).
async function resolveIntersectionSearch(rawQuery) {
  const emptyMessage = `No sweeping rules found for the intersection "${rawQuery}". Try the full street names.`;

  // SAM /intersection_lookup canonicalizes "Beacon & Charles" → "Beacon St &
  // Charles St" and gives the corner point. Base = all rows for both streets;
  // the "only nearest sections" filter narrows to the blocks at/through the corner.
  try {
    const data = await samIntersectionLookup(rawQuery);
    if (data.length) {
      const intrName = data[0].matching_intersection_full.split(",")[0];
      const corner = await addCornerContainingBlocks(
        intrName,
        data[0],
        filterByIntersection(intrName),
      );
      const cornerIds = new Set(corner.map((r) => r.main_id));
      const parts = intrName.split(/\s+(?:and|&)\s+/i).map((s) => s.trim());
      const base = streetData.filter((r) =>
        parts.some((s) => streetNamesMatch(r.st_name, s)),
      );
      if (base.length) {
        // Center the map on the corner, not the (possibly far-reaching) segments.
        let focus = null;
        if (data[0].matching_intersection_y != null && data[0].matching_intersection_x != null) {
          focus = {
            lat: data[0].matching_intersection_y,
            lng: data[0].matching_intersection_x,
          };
        }
        return {
          baseRows: base,
          filterDefs: [{ id: "corner", label: "only nearest sections", keepIds: cornerIds, available: cornerIds.size > 0, defaultChecked: true }],
          emptyMessage,
          focus,
        };
      }
    }
  } catch {
    // Swallow — fall through to local. Worst case: no results.
  }

  // Local fallback for inputs SAM over-normalizes (e.g. "Mt Vernon" →
  // "Mount Vernon" doesn't match CSV's "Mt Vernon St").
  return { baseRows: filterByIntersection(rawQuery), filterDefs: [], emptyMessage, focus: null };
}

// Numbered-address search: geocode, then expose the narrowing as toggleable
// debug filters over all rows for the nearest road. We always include BOTH
// sides of each block — never parity-filter. Falls back to local substring
// search if geocoding finds nothing. See temp/plans/search-narrowing-two-phase.md.
async function resolveAddressSearch(rawQuery) {
  let ctx = null;
  try {
    const geo = await samGeocode(rawQuery);
    if (geo.length) {
      const topScore = geo[0].match_score;
      const topMatches = geo.filter((m) => m.match_score === topScore && topScore > 0);
      ctx = await buildAddressFilterDefs(topMatches);
    }
  } catch {
    // Swallow — fall through to local.
  }

  const emptyMessage = `No sweeping rules found for "${rawQuery}".`;
  if (ctx?.base.length) {
    return { baseRows: ctx.base, filterDefs: ctx.filterDefs, emptyMessage };
  }
  return { baseRows: localStreetSearch(rawQuery.toLowerCase()), filterDefs: [], emptyMessage };
}
