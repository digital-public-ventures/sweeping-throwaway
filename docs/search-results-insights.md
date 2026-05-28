# Engineering insights & decisions

A record of the non-obvious learnings, design choices, and debugging war-stories behind the map + SAM search work. Operational "how to work here" rules live in [`../AGENTS.md`](../AGENTS.md); the SAM API reference is [`sam-api-reference.md`](sam-api-reference.md); the live test tracker is [`search-test-matrix.csv`](search-test-matrix.csv). This file is the **why** and the **what we learned the hard way**.

---

## SAM API — what's true vs. what the docs claimed

We validated every endpoint against the live API; a prior third-party note had several wrong claims. The corrected, authoritative reference is [`sam-api-reference.md`](sam-api-reference.md).

- **`/reverse-geocode` does not exist (404).** The real reverse-geocode endpoint is **`/xy_lookup?x=<lng>&y=<lat>`**. The full endpoint list is in the OpenAPI spec at `https://api.sam.boston.gov/openapi.yaml`.
- **`/xy_lookup` returns `nearest_intersection_name` for free.** The elaborate "find segments touching segment endpoints" geometry dance the old doc described is unnecessary for the basic case — SAM already publishes intersection names directly. There's also a dedicated ArcGIS intersections layer (`SAM_Live_Intersections_deduplicated_tbl`, FeatureServer layer 8) with `INTERSECTION_NAME` per `SEGMENT_ID`; you can get *both* endpoints of a segment with `where=SEGMENT_ID=X OR SEGMENT_ID2=X` — no PostGIS required.
- **ArcGIS spatial reference is feet (EPSG:2249 / wkid 102686), not meters (EPSG:26986).** The old doc's `ST_Transform(..., 26986)` would silently produce wrong distances. Easiest workaround: request `&outSR=4326` and let the service reproject to WGS84 lon/lat.
- **`/geocode` normalizes ordinals natively** — `"200 W 7th St"` matches `"200 W Seventh St"` at score 100. So the "do we need a paid geocoder for 7th↔Seventh?" question is answered: no, for that case. **But it is not a prefix completer** — `"Dor Ave"` returns `[]`. Live-as-you-type autocomplete would still need something else.
- **`/geocode` requires a street *number*.** Bare street names (`"7th"`, `"Beacon"`, `"Mass Ave"`) return `[]`. This is the single biggest reason SAM can't be the primary search — see the hybrid section.
- **Segment address-range fields (`L_F_ADD` etc.) are strings and nullable.** Parse before comparing.
- **`losta` / `hista` in the sweeping CSV are NOT address ranges.** They're linear-reference stations (cumulative distance along the centerline), contiguous between adjacent blocks. Do not try to map a house number to a block via them.

---

## The hybrid search — why it's shaped the way it is

The search is a **per-query-shape router**, not "use SAM" or "use local." We benchmarked local-only, SAM-only, and hybrid against ~25 queries; the hybrid matched or beat both pure approaches on every one.

### The dispatch
`performSearch` checks `isIntersectionQuery(q)` (`/\s+(and|&)\s+/i`):
- **Intersection** (`"Beacon & Charles"`) → `performIntersectionSearch` (SAM-first, local-fallback).
- **Everything else** → pure local substring match against the in-memory CSV. No network call on the common path.

### Why each path is where it is

| Finding | Consequence |
|---|---|
| SAM `/geocode` returns empty for bare street names | SAM can't be the main search; local handles browse queries. |
| SAM sometimes returns the **wrong centerline** at valid addresses (`"Massachusetts Ave"` → "Newbury St"; "100 Mass Ave" → "Public Alley No. 430") | Pure-SAM loses real rows. Local wins these. |
| SAM `/intersection_lookup` canonicalizes (`"Comm Ave & Mass Ave"` → `"Commonwealth Ave & Massachusetts Ave"`) | Irreplaceable for corner queries — local has no gazetteer. |
| Local-only intersection filter has **false positives on partial names** (`"Beacon & Charles"` also matches Charlesgate) | SAM canonicalization removes the noise. |
| SAM **over-normalizes Boston idioms** (`"Mt Vernon"` → `"Mount Vernon"`, but the CSV stores "Mt Vernon St") | Need a local fallback when SAM's canonical name returns 0 CSV rows. |

### Benchmark headlines (row counts)

| Query | Local | SAM | Hybrid |
|---|---|---|---|
| Beacon & Charles | 5 (2 false positives) | 3 | **3** |
| Mt Vernon & Charles | 2 | 0 (over-normalized) | **2** |
| Comm Ave & Mass Ave | 0 | 2 | **2** |
| Massachusetts Ave | 12 | 5 (wrong centerline) | 12 |
| 7th st | 8 | 0 (no street number) | 8 |

### Design properties worth preserving
- **`filterByIntersection` is shared** between the SAM stage and the local-fallback stage — the only difference is which string gets split (SAM's canonical name vs. the raw query). Keep the matching logic in one place.
- **The `try/catch` around the SAM call swallows failures** and falls through to local. A SAM outage degrades the intersection feature to local-only; the network is an enhancement, never a hard dependency.
- **The debug bar (inside "Show debug") is deliberately pure-SAM, no fallback.** It's a diagnostic instrument for comparing SAM's raw output against the hybrid, not a user feature.

---

## Map UI — Leaflet patterns and gotchas

- **Leaflet + free OSM tiles, no API key.** Provider swap (Mapbox/Google) is a one-line `L.tileLayer(...)` URL change — the API is provider-agnostic. We deliberately prototyped on the free path first; the real bottleneck turned out to be name normalization, not tiles.
- **Screen-anchored center pin, not a draggable marker.** The pin is a CSS `<div class="center-pin">` (SVG inside) at `top:50%; left:50%` *inside* `#map`, with `pointer-events: none` so drag/click pass through to the map below. The pin never moves in screen space; the geographic content moves under it (the Uber/ride-share pattern). A `L.marker` would be wrong here — it's anchored to a *coordinate*, not the viewport.
- **`map.invalidateSize()` after any container resize**, or Leaflet renders a stale tile grid (gray halo). Called from `toggleMap` and the debug-panel toggle.
- **`dragend` vs `moveend`:** `dragend` fires only on user drags; `moveend` also fires on zoom and programmatic `setView`. We use `dragend` to avoid feedback loops. Consequence: `setView` (from search-by-address) does NOT fire `dragend`, so the geocode submit handler calls `onPinMoved` explicitly afterward.
- **Overlay buttons inside `#map` must call `L.DomEvent.disableClickPropagation(el)`.** This was a real bug: the "Show/Hide debug" toggle is a child of `#map`, so its clicks bubbled to Leaflet's `map.on('click')` handler, which ran `panTo + onPinMoved` — silently panning the map and overwriting the search input with the centerline name on every toggle. Leaflet's own controls use this same API. (The center pin avoids this differently — `pointer-events: none` lets its clicks pass *through* to the map, which is intended.)
- **`scrollIntoView({ block: 'start' })` undershot by ~90px** in this layout for reasons that didn't resolve with longer waits or removing scroll-margin. `window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' })` lands exactly. Prefer explicit `scrollTo` with a computed target when precise alignment matters.
- **Boston's geographic center (`42.3601, -71.0589`) is in the Common** — a park with no addresses, so `/xy_lookup` there returns "No nearby address found." Useful validation that the no-match path works; real users panning over parks/harbor/rooftops hit it too.

---

## Street-name normalization

`normalizeStreetName(str)` lowercases and word-by-word substitutes via `STREET_NAME_CANONICAL_MAP`.

- **The map is hoisted to module scope**, not declared inside the function — it's iterated thousands of times during intersection filtering (once per CSV row), so rebuilding the literal per call was wasteful. Module-scope also signals "this is configuration" vs. "per-call workspace."
- **Ordinals `1st`–`9th` → word form.** Boston has Seventh St, Eighth St, etc.; there's **no Tenth St or higher in the CSV**, so we don't add ones we don't need.
- **Cardinal directions `w`/`e`/`n`/`s` → word form**, so geocode-driven queries match CSV entries like "W Seventh St".
- **Known ambiguity:** South Boston has lettered streets "E St" and "N St". Adding `e→east` / `n→north` means a search for `"east"` also matches "E St" rows. Accepted trade-off. The clean fix, if it ever bites, is a context-aware normalizer that only expands single-letter tokens when followed by more tokens. `w`/`s` are unambiguous (no "W St" or "S St" in the CSV).

---

## Conventions & workflow

- **Mobile-first, then desktop sanity check.** Build/test at **390×844** (iPhone 13/14); before declaring a layout change done, resize to **~1280×800** and confirm `.main-content { max-width: 600px }` still holds. The map specifically must NOT set its own width — it inherits the 600px cap. We learned this when it stretched across the desktop at `width: 95vw`.
- **VS Code Live Preview reload race.** Live Preview (port 3000) auto-reloads on file changes and some socket events, which races async form submits and wipes results before they render. `index.html` carries `<body data-server-no-reload>` to opt out. It's a no-op on real servers; keep it on new HTML entry points until we deploy elsewhere.
- **Notify footer is selection-driven.** `#notify-footer` stays hidden until `pendingSelections.size > 0`. `showNotificationFooter()` is the single source of truth — it shows or hides based on count; other call-sites just invoke it rather than managing visibility themselves.
- **Subresource Integrity (SRI) on CDN scripts.** `integrity="sha384-..."` + `crossorigin="anonymous"` pins the hash so a compromised/changed CDN payload won't execute. Compute hashes yourself with `curl URL | openssl dgst -sha384 -binary | openssl base64 -A`. (Note: the main app still loads PapaParse without SRI — a known follow-up.)
- **Don't add scaffolding for features that don't exist.** We deleted ~90 lines of dead code (`saveStreet`, `removeStreet`, `renderStreetCard`) left from a previous UI pivot — all unreferenced. Multiple dead functions in one file is a soft signal a feature was pivoted away from; if more accumulate, a cleanup is overdue.

---

## Debugging war-stories (symptoms → root causes)

These cost real time; recording so the next person recognizes the pattern faster.

- **"Form does nothing when I hit Go"** turned out to be three layered causes: (1) the side-quest HTML was missing its `<script src="app.js">` tag entirely, so no handler registered; (2) the input had no `name` attribute, so the default GET submit produced a clean URL with no query string — hiding the fact that a navigation happened; (3) VS Code Live Preview's reload masked it further. Lesson: "the JS exists and the function is defined" is not proof the handler ran *for this event*.
- **"Map search results drift / search box changes street names on their own."** Root cause was the debug-toggle click bubbling into Leaflet's map click handler (see `disableClickPropagation` above). The tell was the search input rotating through nearby street names — the toggle handler never touches the input, but `onPinMoved` does, which pointed straight at an unintended `map.on('click')` firing.
- **Auto-pan race:** `panMapToSearchInput()` runs on every map open and is async. Rapid open/close could stack fetches; whichever resolves last wins. Currently acceptable; if it becomes visible, add an epoch/abort guard.

---

## Open improvements / backlog

Phase 1 of the search-narrowing work shipped (numbered-address geocode ladder, whole-name `streetNamesMatch`, both-sides rule, auto-narrow debounce). The live pass/fail tracker is [`search-test-matrix.csv`](search-test-matrix.csv); the plan is `temp/plans/search-narrowing-two-phase.md`. The known-failing themes from the sprint-1 bot pass:

1. **Abbreviation expansion** in the plain/address paths — `Mass Ave`, `Comm Ave`, `100 Mass Ave`, `Dor Ave` don't resolve. SAM's geocoder doesn't expand these reliably either (`100 Comm Ave` → *Commercial St*). Likely fix: a small alias map (`mass`→`massachusetts`, `comm`→`commonwealth`) applied before search.
2. **Substring over-match on short names** — `N St` returns 614 rows, `E St` 326, because the plain path still uses `.includes()`. The intersection/address paths already use `streetNamesMatch`; the plain path should adopt whole-word matching too (carefully — it must still support partial typing like `Beacon`).
3. **Typo tolerance** — `Cheslea St`, `1 Saint Botolph St` miss. Would need fuzzy matching (Damerau-Levenshtein or a token-set ratio) as a fallback.
4. **Address narrowing doesn't pin on coarse/large streets** — `100 Boylston` (5 rows), `200 Dorchester Ave` (7), `100 Mass Ave` (12). The nearest-intersection signal is an alley or the street is too long for neighborhood narrowing. This is the **Phase 2 ArcGIS exact-segment** candidate (layer 3 address ranges → segment → layer 8 endpoints), feature-flagged for A/B comparison. See `sam-api-reference.md` for the ArcGIS layers.

### Gotchas worth remembering

- **`losta` / `hista` are NOT address ranges** — they're linear-reference stations (cumulative distance along the centerline), contiguous between adjacent blocks. Don't map a house number to a block via them. (The ArcGIS layer-3 `L_F_ADD`/`R_F_ADD` fields *are* real address ranges.)
- **The CSV only contains streets with sweeping rules** — a geocode that lands on a real street with no CSV match is ambiguous (no sweeping vs. name-spelling mismatch). The narrowing ladder degrades gracefully (cross-street → neighborhood → whole-street → local) so a mismatch never strands the user on an empty page.
