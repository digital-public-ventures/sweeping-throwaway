# boston-prototype

Static prototype for the "Notify Boston" street-sweeping alerts feature. No build step — open `index.html` directly.

## Files

- `index.html` — single-page app shell, two tabs (search + my notifications). Loads USWDS + Leaflet + PapaParse, then `js/search-provider.js` then `js/app.js` (order matters — see below).
- `js/` — the app's two browser scripts (plain `<script>`s, not modules; loaded by `index.html`). Their `fetch`/`Papa.parse` paths are relative to the **document** (`index.html` at root), so they stay `data/…` regardless of this directory.
  - `js/search-provider.js` — the search **data layer**. SAM API helpers, street-name normalization/matching, the CSV/cross-street loaders + `streetData`, the cross-street proximity narrowing, and the two query entry points `resolveIntersectionSearch` / `resolveAddressSearch` (which **return** `{ baseRows, filterDefs, emptyMessage, focus }` — no DOM access). Loaded as a plain script before `app.js`; the two share one global scope.
  - `js/app.js` — the **DOM/behavior layer**. Reads the search input and orchestrates (`performSearch` → `runIntersectionSearch` / `runAddressSearch` await the provider then render), renders the results table/map, Leaflet map with screen-anchored pin, tab switching, the sticky footer/modal, localStorage for saved streets.
- `styles.css` — Boston brand theming layered on USWDS + the app's bespoke components (in-page tabs, inline map, results grid, sticky footer, modal, toast, demo panel). Holds the brand palette + typeface tokens in `:root`.
- `styles/uswds/` — vendored compiled U.S. Web Design System (css/js/fonts/img), refresh with `bash styles/refresh-uswds.sh`. Loaded by `index.html`.
- `styles/fonts.css` + `styles/fonts/` — vendored Boston brand typefaces (Montserrat + Lora) as local woff2, refresh with `bash styles/fonts/refresh-fonts.sh`. Loaded by `index.html` before USWDS. No CDN dependency.
- `docs/brand-guidelines-boston-gov.md` — the **authoritative Boston brand guidelines** (colors w/ exact hex, typography, logo/seal, voice), rendered from boston.gov. The source of truth for all brand decisions — consult before changing colors, fonts, or the wordmark.
- `styles/fleet.css` + `styles/refresh-fleet.sh` — legacy Boston Fleet library, no longer loaded by anything after the USWDS switch. Safe to delete.
- `data/` — runtime data files the app `fetch`es and the `scripts/` read/write:
  - `data/street-sweeping.csv` — source data, 3756 rows of (block × side) sweeping schedules.
  - `data/sam-cross-street-points.complete-with-aliases.csv` — shipped precomputed SAM cross-street point cache used by address narrowing before live `/intersection_lookup` fallback.
  - `data/segment-geometry.json` — precomputed block→polyline geometry (`scripts/precompute-segment-geometry.mjs`) drawn on the map for search results.
  - `data/search-results-review.csv` — hand-reviewed search-quality reference; the `EXPORT_COLUMNS` schema matches it so `exportSelectedToCsv` output can be merged in.
  - `data/database_commas.csv` — source data dump (not `fetch`ed at runtime).
- `scripts/` — Node ESM tooling (SAM intersection precompute + recovery pipeline, segment-geometry precompute, search-timing). Read `data/`, write `data/` or gitignored `temp/`.
- `screenshots/` — gitignored scratch dir for verification screenshots (Playwright captures, etc.).
- `patterns-reference.md` — legacy scrape of the Boston Fleet pattern library; unused after the USWDS switch.
- `temp/plans/` — design/migration plans for in-flight work; consult before making related changes. (gitignored scratch)
- `docs/` — the durable project docs. See the **Docs** section below.

## Docs

| File | What it's for |
| --- | --- |
| [`docs/sam-api-reference.md`](docs/sam-api-reference.md) | Authoritative, validated reference for the SAM REST API + ArcGIS layers. Read before touching SAM code. |
| [`docs/search-results-insights.md`](docs/search-results-insights.md) | The **why** behind the search/map design + war-stories + the open-improvement backlog. |
| [`docs/search-test-cases.md`](docs/search-test-cases.md) | Narrative of what each test query exercises. |
| [`docs/search-test-matrix.csv`](docs/search-test-matrix.csv) | **Canonical** living test tracker: per-query expected row count + sprint bot/human pass status. |
| `temp/plans/search-narrowing-two-phase.md` | The two-phase search-narrowing plan (Phase 1 shipped; Phase 2 = ArcGIS exact-segment, feature-flagged). gitignored scratch. |

## The problem domain

A Boston resident is parked on a street with alternating street-sweeping. To know whether their car is safe (and for how long), they need:

1. **The block** — street name plus two cross-streets (e.g. "Beacon St between Charles St and Arlington St").
2. **The side** — even or odd house numbers (CSV column `side`).

CSV columns of note: `st_name`, `from`, `to`, `side` (Even / Odd / blank), `start_time`, `end_time`, per-day-of-week and per-week-of-month booleans. Each row is one (block × side) schedule.

Two entry points to find the right row:

- **Type into the search bar** — street name, partial name, or full address.
- **Drop a pin on the map** ("Search by map") — the center pin is screen-anchored; the user pans the geographic content underneath it, and SAM reverse-geocodes the new center.

## Search architecture

Two distinct inputs, different responsibilities. Don't merge them.

**Data/DOM split.** The query→rows logic lives in `search-provider.js` and returns plain data; `app.js` applies that data to the page. The provider's two entry points — `resolveIntersectionSearch(raw)` and `resolveAddressSearch(raw)` — are `async` and return `{ baseRows, filterDefs, emptyMessage, focus }` with no DOM access. `app.js`'s thin orchestrators `runIntersectionSearch` / `runAddressSearch` `await` them, then set the map focus and call `applySearch`. So "where does a result come from" → provider; "how is it shown" → app.js.

### Main bar (`#street-search`) → drives the results table

`performSearch(options)` (in `app.js`) reads the input and dispatches three ways:

- **Intersection queries** (anything containing ` and ` or ` & `) → `runIntersectionSearch` → provider's `resolveIntersectionSearch`:
  1. SAM `/intersection_lookup` canonicalizes the query (`"Comm Ave & Mass Ave"` → `"Commonwealth Ave & Massachusetts Ave"`).
  2. `filterByIntersection` finds rows where `st_name` matches one street and `from`/`to` matches the other, via `streetNamesMatch` (whole-name, not substring — so "Charles St" doesn't pull in "Charlesgate").
  3. Falls back to splitting the *raw* query locally if SAM yields no rows (catches idioms like `"Mt Vernon"` that SAM over-normalizes to `"Mount Vernon"`).
- **Numbered address** (`"122 Commonwealth Ave"`, gated on `precise` — explicit submit or the ~400ms auto-narrow debounce) → `runAddressSearch` → provider's `resolveAddressSearch`: geocode → `buildAddressFilterDefs` computes a **base** (all rows for the nearest road) plus **debug filters** (cross-street proximity / nearest intersection / neighborhood), each precomputing the `main_id`s it keeps. **Always both even and odd sides** (no parity filter). Falls back to local substring on empty. (`runAddressSearch` shows the pending line and runs the staleness guard, since those touch the DOM.)
- **Plain street name** (`"7th st"`, `"Beacon"`) → provider's `localStreetSearch` substring match against `streetData`, normalized via `normalizeStreetName` / `expandSearchQuery`. Runs on the 300ms debounce while typing (browse mode).

The map pin (`onPinMoved`, in `app.js`) reuses the provider's `buildAddressFilterDefs` when it lands on an exact address (gated by `ADDRESS_SNAP_METERS`), else falls back to broad centerline search.

### Base + debug filters (how results are narrowed)

`applySearch(baseRows, filterDefs, emptyMessage)` is the single entry point for every result-producing path. It stores `lastSearch = { baseRows, filterDefs, checked }` and calls `applyDebugFilters`, which sets `currentSearchResults = baseRows ∩ every checked filter` (none checked → all of `baseRows`), then renders the `#debug-filters` panel, the table, and the map polylines.

- The filter the old narrowing ladder *would have fired* (proximity → nearest intersection → neighborhood, first non-empty) starts **checked**, so the default view equals the shipped narrowing. Intersection searches expose a single **"At this corner"** filter (= `filterByIntersection` ∪ `addCornerContainingBlocks`).
- The `#debug-filters` panel (always visible above "X results found") lets you toggle filters live with no network — each `filterDef` carries a precomputed `keepIds` set. This *replaced* the old `narrowToBlocks` / `narrowAddressMatch` ladder functions (now deleted).
- `renderMatchesOrError(matches, msg)` is a thin no-filter wrapper around `applySearch` for the plain-street and intersection-local-fallback paths.

### Export to CSV

`exportSelectedToCsv` (button below results) writes the address-input query, the current map center (`map_lat`/`map_lng`), and each **selected** row (checked alert boxes), using the `EXPORT_COLUMNS` schema — identical to `data/search-results-review.csv` so the two can be merged. `buildExportCsv` is split out for testing.

### Debug bar (`#map-geocode-input`, inside Show debug panel) → pure SAM probe

No local fallback. Intentionally kept distinct so you can compare hybrid vs SAM behavior side-by-side. Dispatches intersection inputs to `/intersection_lookup` and the rest to `/geocode`, pans the map to the SAM-returned point, and re-feeds the canonical name through the main bar.

### Why the hybrid (don't relitigate this without new data)

Tested against ~25 representative queries this session:

- SAM `/geocode` **returns empty for bare street names** (no street number). So it can't be the main search.
- SAM sometimes returns the **wrong centerline** at valid addresses (e.g. "100 Massachusetts Ave" → centerline "Newbury St" or "Public Alley No. 430"). Pure SAM loses real rows.
- SAM `/intersection_lookup` is **irreplaceable for corner queries** — local has no way to canonicalize `"Beacon & Charles"` → `"Beacon St & Charles St"`.
- Local-only intersection filtering has **false positives on partial names** ("Beacon & Charles" also matches Charlesgate).

The "SAM-first, local-fallback for intersections" hybrid captures every win without the false positives. Pure SAM is strictly worse.

## SAM API integration

Boston's System for Address Management (SAM). Base URL: `https://api.sam.boston.gov`. Spec: `/openapi.yaml`. No auth, JSON, CORS-friendly.

All access goes through three helpers near the top of `search-provider.js`:

```js
samGeocode(address)               → Promise<AddressMatch[]>
samIntersectionLookup(intersection) → Promise<IntersectionMatch[]>
samXyLookup(lng, lat)             → Promise<XYLookupResponse>
```

**Don't hardcode SAM URLs elsewhere.** Add new endpoints by extending the helper block; that keeps the call-sites readable and gives us a single place to add retry, telemetry, or base-URL changes.

| Endpoint | Used for | Quirks worth knowing |
| --- | --- | --- |
| `/geocode` | Numbered-address search (main bar + debug bar). | Needs a street *number*; bare names return `[]`. Auto-corrects ordinals (`7th` ↔ `Seventh`). Does NOT reliably expand idiomatic abbreviations (`100 Comm Ave` → *Commercial St*). |
| `/intersection_lookup` | Main bar intersection queries. | Accepts ` and ` or ` & `. Canonicalizes abbreviations (`Comm` → `Commonwealth`). Over-normalizes `Mt` → `Mount`, so we fall back to local. |
| `/xy_lookup` | Map pin → nearest address + centerline + intersection; cross-street narrowing. | The "reverse geocode." **NOT at `/reverse-geocode`** (404). **Don't use its `nearest_centerline_street_name` for an address** — it can be a back alley; use the geocode's `street_name`. |

For full details (ArcGIS layer schemas, intersection layer 8, address-range fields, the centerline/void gotchas), see [`docs/sam-api-reference.md`](docs/sam-api-reference.md).

## Map UI

Leaflet + CARTO "light" basemap tiles (chosen so the colored result polylines read clearly). No API key, but ⚠️ **CARTO's public tiles aren't licensed for production** (commercial → Enterprise license; otherwise a grant) — for a real Boston deploy switch `initMap`'s `L.tileLayer(...)` URL to an Esri/ArcGIS basemap (the city already uses ArcGIS) or another licensed provider. Leaflet's API is provider-agnostic.

**Result segments.** `drawResultSegments(currentSearchResults)` draws one colored polyline per block×side from `data/segment-geometry.json` (precomputed by `scripts/precompute-segment-geometry.mjs`), styled like `commonwealth-ave-segments-map.html` (19-color palette + cycling dashes, even/odd offset to opposite sides). Called on every search and on map-open. A block whose geometry is **unmapped** (`mapped:false` — see the export's `has_map_geometry=no`) is silently skipped.

**Screen-anchored center pin pattern, not a draggable marker.** The pin is a CSS `<div class="center-pin">` (SVG inside) placed at `top: 50%; left: 50%` *inside* the `#map` div, with `pointer-events: none` so drag and click events pass through to the map below. The pin never moves in screen space; the map underneath it does.

Two events drive the SAM lookup:

- `mapInstance.on('dragend', ...)` → lookup new center.
- `mapInstance.on('click', ...)` → `panTo(e.latlng)` then lookup.

`setView` does **not** fire `dragend`, so the geocode form's submit handler explicitly calls `onPinMoved` after `setView`.

The debug details panel is hidden by default with a floating "Show debug" / "Hide debug" button in the map's top-right corner (built in `initMap`, positioned via `position: absolute` because Leaflet sets `#map` to `position: relative` on init). Content auto-updates on every dragend regardless of visibility — toggling is sticky per session.

**`map.invalidateSize()` after any container resize.** Leaflet renders a stale tile grid otherwise. Called from `toggleMap` and the panel toggle.

## Conventions

### Mobile-first, then desktop sanity check

Most users land here on a phone. Workflow:

1. Test new UI at **390×844** (iPhone 13/14) first. If using Playwright, `browser_resize` to those dimensions before any snapshot.
2. Before declaring a layout change done, resize to **~1280×800** and confirm the layout still respects the reading-column cap (`.main-content .grid-container { max-width: 40rem }`, ~640px) and nothing is stretched across the screen.

The map specifically: **don't give it its own width** — let it inherit the column cap from `.main-content .grid-container`. We learned this when the map stretched across the desktop screen at `width: 95vw`.

### VS Code Live Preview gotcha

The repo is typically previewed via VS Code Live Preview on port 3000. Its injected script auto-reloads the page on file changes (and on some socket events) which races async form submissions and wipes results before they render. `index.html` carries `<body data-server-no-reload>` to opt out. **Keep that attribute on any new HTML entry points** until we deploy outside Live Preview. It's a no-op on real servers.

### Street-name normalization

`normalizeStreetName(str)` lowercases and word-by-word substitutes via `STREET_NAME_CANONICAL_MAP` (module-scoped — hoisted out of the function body because it's iterated thousands of times per intersection search). Covers:

- Street-type abbreviations (`st`/`street`, `ave`/`avenue`, etc.).
- Numeric ordinals `1st`–`9th` → word form. Boston has Seventh St, Eighth St, etc., but **no Tenth St or higher in the CSV** — don't add ones we don't need.
- Cardinal directions `w`/`e`/`n`/`s` → word form.

**Known ambiguity to be aware of**: South Boston has lettered streets `"E St"` and `"N St"`. Adding `'e' → 'east'` and `'n' → 'north'` means a search for `"east"` will also match "E St" rows. Accepted trade-off. The fix if it ever bites is a context-aware normalizer (only expand single-letter tokens when followed by additional tokens).

### Notify footer is selection-driven

The `#notify-footer` is hidden until the user has selected at least one row (`pendingSelections.size > 0`). `showNotificationFooter()` is the single source of truth — it shows or hides based on count. Other call-sites just invoke it; they don't manage visibility themselves.

### Don't add scaffolding for features that don't exist

This session deleted ~90 lines of dead code (`saveStreet`, `removeStreet`, `renderStreetCard`) left over from a previous UI pivot — they were never called by anything. If you find yourself adding a function with no caller, ask whether it's needed yet.

## Styling: U.S. Web Design System (USWDS)

The app uses USWDS for generic UI — buttons, inputs, selects, checkboxes, alerts, the gov banner, the header, and the grid. Compiled USWDS is vendored at `styles/uswds/` and loaded by `index.html`; `styles/uswds/js/uswds.min.js` runs the interactive components (banner accordion, etc.). `styles.css` loads *after* USWDS and does two jobs: (1) re-themes USWDS's default blue to Boston brand colors, (2) styles the bespoke components USWDS doesn't cover (in-page tab toggle, inline Leaflet map, the results CSS-grid, the sticky notification footer, the sign-up modal frame, toast, demo panel).

**Before writing custom CSS for a generic UI element, use the USWDS component instead** — add the `usa-*` classes/markup. The component reference is the official docs at <https://designsystem.digital.gov/components/>; the vendored `styles/uswds/css/uswds.min.css` is the source of truth for what's available. Common ones already in use: `usa-button` (+`--outline`, `--unstyled`), `usa-input`, `usa-select`, `usa-checkbox`, `usa-label`, `usa-alert`, `usa-tag`, `usa-banner`, `usa-header`, `usa-button-group--segmented`.

(The old Boston Fleet library and its `patterns-reference.md` scrape are no longer used; ignore them when styling.)

### Boston brand fidelity (USWDS, adapted to Boston)

The model is **USWDS for structure, Boston brand for skin.** USWDS gives accessible, government-grade components; [`docs/brand-guidelines-boston-gov.md`](docs/brand-guidelines-boston-gov.md) dictates how they look. When the two conflict, the brand guidelines win on color/type/logo and USWDS wins on structure/behavior/markup. **Any change to colors, fonts, or the wordmark must trace back to a value in `docs/brand-guidelines-boston-gov.md`** — don't invent brand colors or pull hexes from memory.

- **Color.** The brand palette lives once in `styles.css` `:root` as `--charles-blue` (#091F2F), `--optimistic-blue` (#1871BD — the guide's exact spec, *not* a brighter web blue), `--freedom-trail-red` (#FB4D42, use **sparingly** per the guide), and supporting grays (#58585B / #D2D2D2 / #E0E0E0 / #F2F2F2). Re-theme USWDS by overriding its touchpoints with these vars; never add a one-off hex.
- **Typography.** Montserrat for headers/nav/buttons (**always UPPERCASE bold**) and Lora for body — the guide's two typefaces, replacing USWDS's Source Sans/Merriweather. Applied via `--font-heading` / `--font-body` tokens mapped onto element + `usa-*` selectors in the Typography section of `styles.css`. Fonts are vendored locally (see below), not CDN-loaded.
- **Wordmark.** The header uses the brand's signature **bold "B" underlined in Freedom Trail Red** ("when something matters, we underline it") via `.header-bmark` — not a plain text logo. Preserve it on any new header markup.

## Sage advice for future coding agents

1. **Theme USWDS; don't reimplement it.** Brand colors are applied by overriding USWDS touchpoints in `styles.css` (`.usa-button`, `.usa-button--outline`, `.usa-link`, `.usa-header`, `.usa-tag`). USWDS compiles colors to static hex (no `:root` theme vars in the compiled CSS), so re-theming is done with plain overrides — `styles.css` loads after USWDS, so equal-specificity overrides win. The `--charles-blue` / `--optimistic-blue` / etc. variables in `styles.css` are the single source for those overrides.

2. **`styles.css` loads after `uswds.min.css`.** A bare `.usa-button { … }` rule in `styles.css` overrides USWDS. So to *use* the USWDS look, don't restyle the component's class — only override the specific properties you want to re-theme (e.g. `background-color`), and leave the rest to USWDS.

3. **The signup modal is intentionally NOT a `usa-modal`.** It's a custom overlay toggled by app.js via `style.display`. USWDS's modal JS expects to own show/hide (and errors on a `.usa-modal` with no id), so the modal uses USWDS *form controls* (`usa-checkbox`, `usa-input`, `usa-button`) inside a custom frame rather than the `usa-modal` component.

4. **Preserve app.js's DOM hooks when editing markup.** app.js reads `element.style.display` on several elements (e.g. `toggleMap`, the map-details toggle), so keep their initial inline `style="display: none"` rather than switching to the `hidden` attribute. It also keys off ids and the `.tab-btn`/`.tab-content`/`.active`/`.alert-checkbox`/`.pagination-btn[data-page]` classes — grep before renaming.

5. **The in-page tabs are driven solely by the `.active` class.** `switchTab` only toggles `.active` (it never adds/removes `usa-button--outline`), so the tab buttons' selected/unselected appearance is defined entirely in `styles.css` off `.tab-btn` / `.tab-btn.active` — don't hard-code a USWDS button-state modifier on them.

6. **The results "table" is a bespoke CSS grid, not `usa-table`.** Its `grid-template-columns`, mobile column-collapsing (`@media (max-width: 600px)`), and per-row checkbox/`data-id` hooks live in `styles.css` + app.js. Converting it to `usa-table` is a deliberate future task, not a drive-by.

7. **To update USWDS, run `bash styles/refresh-uswds.sh`** (re-packs `@uswds/uswds` and re-extracts the compiled dist). Never hand-edit files under `styles/uswds/`. The compiled CSS references `../fonts/` and `../img/`, so the `css/`, `fonts/`, and `img/` directories must stay siblings.

8. **Brand fonts are vendored, not CDN-loaded.** `styles/fonts.css` + the woff2 in `styles/fonts/` are generated by `bash styles/fonts/refresh-fonts.sh` (fetches Google Fonts' subsetted CSS — needs a full desktop-Safari User-Agent to get the `/* latin */`-commented format — and downloads only the `latin`/`latin-ext` woff2). Lora/Montserrat are variable fonts, so multiple weight/style `@font-face` blocks share one file; the script dedupes by URL. To change weights or add a subset, edit the script and re-run — never hand-edit `styles/fonts.css`. Don't reintroduce a `fonts.googleapis.com` `<link>`.
