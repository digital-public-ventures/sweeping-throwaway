# Engineering insights & decisions — v2

Continuation of [`search-results-insights.md`](search-results-insights.md), covering the
second wave of work: the map result-segment layer, the base + debug-filters search model,
the intersection "contains the corner" fix, CSV export, and the segment-geometry
gap-bridging prototype. Same spirit — the **why** and the **what we learned the hard way**.
Operational rules live in [`../AGENTS.md`](../AGENTS.md).

---

## Map result segments — drawing the blocks a search returns

We added a Leaflet polyline layer (`drawResultSegments`) that draws each result block,
styled to match the `commonwealth-ave-segments-map.html` prototype: a 19-color palette +
cycling dash patterns, one line per **block × side**, even/odd offset to opposite sides of
the centerline so they read as parallel lines.

- **Geometry is precomputed offline**, not fetched live. `scripts/precompute-segment-geometry.mjs`
  walks Boston's ArcGIS `SAM_Boston_Segments_tbl` centerlines and writes
  `data/segment-geometry.json` (block key → `{ mapped, paths }`). The browser never hits ArcGIS.
- **The join is the hard part.** CSV blocks are bounded by *cross-street names*; ArcGIS
  segments are bounded by *address ranges*. We bridge them with the precomputed SAM
  cross-street points (endpoints) + a **graph shortest-path walk** between those endpoints
  over the street's segments. A straight chord between endpoints was the first attempt and
  was wrong — on a curved street it cuts across blocks and leaves gaps.
- **Basemap:** switched OSM → CARTO "light" so thin colored lines read. ⚠️ CARTO public
  tiles aren't licensed for production; a real deploy should use an Esri/ArcGIS basemap (the
  city already runs ArcGIS) — see [`../AGENTS.md`](../AGENTS.md).

## `has_map_geometry=no` — what it means and why it happens

A result row has two independent properties: it's a real sweeping row (in the CSV), and it
*may* have a drawable polyline. `has_map_geometry` is the second. `no` = the block is a
valid result but `segment-geometry.json` has no line for it, so `drawResultSegments` silently
skips it — **it shows in the table/CSV but nothing draws on the map.**

A block is `mapped:false` when the shortest-path walk between its two endpoints **fails**,
almost always because the ArcGIS centerline is **digitized in disconnected pieces** — split
carriageways, or gaps at big intersections. Diagnosed on two cases:

- **Charles St** `Boylston → Nashua` (~1 mile, one undivided CSV block): the centerline
  breaks into **6 graph components** with a **~111 ft gap** between the two largest, so no
  connected walk from Boylston to Nashua exists.
- **Commonwealth Ave** whole-avenue "mega-block": same failure mode.

Across the city this leaves **~420 of ~2,045 blocks unmapped**. They degrade gracefully
(row present, no line), so it's a coverage gap, not a bug.

## Gap-bridging (the fix for unmapped blocks) — shipped, on by default

`scripts/precompute-segment-geometry.mjs --bridge <feet>` (default **150**) adds straight
"bridge" edges between graph nodes within `<feet>` of each other, weighted by distance, so the
walk can **jump** digitization gaps.

- **Fallback-only, so it never degrades good geometry.** `selectBlockPaths` walks the *real*
  centerline first and only retries with bridges if that fails. **This matters:** an early
  global-bridge run flagged 162 blocks bridged but recovered only +12 — i.e. ~150 already-good
  blocks had a shortcut bridge inserted into their path, cutting corners. The fallback design
  means a block is `bridged: true` only if bridging is the *reason* it's mapped at all.
- **Coverage:** 1623 → **1635 mapped** (+12 recovered, incl. Charles St `Boylston → Nashua`),
  **12 bridged**, ~410 still unmapped. Modest — most remaining gaps are wider than 150 ft (the
  Commonwealth mega-block) or have missing endpoints. Raising the cap recovers more but risks
  bridging to a *wrong* nearby street, so keep it modest + spot-check.
- **Runtime toggle.** Each block carries `bridged` in `data/segment-geometry.json`. The
  `#debug-filters` panel has a **"Bridged geometry"** checkbox (default on); unchecking it sets
  `showBridgedSegments = false` and `drawResultSegments` skips bridged blocks — a geometry-only
  toggle that hides the approximate lines without touching the result rows. Lets you A/B the
  bridged (approximate) vs pristine geometry on the map.
- **Visual review** (Beacon & Charles, map open, mobile 390×844): the bridged Charles line
  traces the road through the corner up to Charles Circle, parallel to the Beacon blocks — no
  diagonal shortcut artifacts at this scale. (`screenshots/bridged-{on,off}.png`.)

## Search model: base + toggleable debug filters

We replaced the old `narrowToBlocks` / `narrowAddressMatch` ladder (now deleted) with a
**base + filters** model. `applySearch(baseRows, filterDefs)` stores `lastSearch` and computes
`currentSearchResults = baseRows ∩ every checked filter` (none checked → all of baseRows).

- **Base = all rows for the nearest road(s).** Filters each precompute the `main_id`s they
  keep, so toggling is instant and network-free.
- **Address/pin filters:** cross-street proximity · nearest intersection · neighborhood. The
  filter the old ladder *would have fired first* starts checked, so the default view equals
  the shipped narrowing. **Why this matters:** the model is now transparent — you can *see*
  and *relax* each filter — without changing default behavior.
- **Intersection filter:** a single "At this corner" (= `filterByIntersection` ∪
  `addCornerContainingBlocks`).
- The `#debug-filters` panel (always visible, above "X results found") exposes these as
  checkboxes with live keep-counts.

## Intersection bug: "terminates at corner" vs "contains the corner"

**Symptom:** `Beacon & Charles` drew Beacon segments only.
**Root cause:** `filterByIntersection` matches blocks that *terminate* at the corner (one
street's name + the other in `from`/`to`). Charles St isn't subdivided there — it's one long
block `Boylston → Nashua` that *passes through* Beacon — so no Charles block matched.
**Fix:** `addCornerContainingBlocks` — for any corner street missing from the matches, add the
block that *contains* the corner, chosen by proximity to the SAM intersection point (reuses
`narrowByCrossStreetProximity`). Now Charles appears in the results; the **segment** still
needs the gap-bridging above to draw (its block was `mapped:false`).

## CSV export & the review schema

`exportSelectedToCsv` (button below results) writes the address-input query, the current map
center (`map_lat`/`map_lng`), and each **selected** row, using a schema identical to
[`../data/search-results-review.csv`](../data/search-results-review.csv) so the two merge. `buildExportCsv`
is split out so it's testable. Default page size bumped to **100**.

## Testing

`scripts/search.test.mjs` (Node's built-in runner, zero deps:
`node --test scripts/search.test.mjs`) asserts known-good blocks for a handful of addresses +
the Beacon & Charles regression. It runs the real pipeline via `scripts/search-lib.mjs`, a
mirror of app.js (same clone caveat as `time-address-search.mjs`). Hits live SAM, so it needs
network and is ~4s.

## Backlog / open items

- **Recover more unmapped blocks** — `--bridge 150` (now default) only recovered +12. The
  ~410 still-unmapped blocks need a larger tolerance (with wrong-street guards) or per-block
  handling (Commonwealth mega-block, missing-endpoint blocks). Tune + spot-check.
- **Basemap licensing** before any production use (CARTO → Esri/ArcGIS).
- **`search-lib.mjs` is a second mirror** of app.js's pipeline (alongside
  `time-address-search.mjs`). Fine for a throwaway, but a shared module would remove the drift
  risk if this graduates.
- **AND-vs-OR filter semantics** differ by search type (address filters narrow/AND; the
  intersection filter is internally a union). Documented, not unified — revisit if filters grow.
