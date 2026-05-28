# boston-prototype

Static prototype for the "Notify Boston" street-sweeping alerts feature. No build step — open `index.html` directly.

## Files

- `index.html` — single-page app shell, two tabs (search + my notifications). Loads Leaflet + PapaParse via CDN with SRI hashes.
- `app.js` — all behavior. CSV load via PapaParse, search (local + SAM hybrid for intersections), Leaflet map with screen-anchored pin, tab switching, localStorage for saved streets.
- `styles.css` — project-specific styles only; generic UI primitives come from Fleet.
- `styles/fleet.css` — vendored copy of Boston's Fleet pattern library CSS (refresh with `bash styles/refresh-fleet.sh`).
- `street-sweeping.csv` — source data, 3756 rows of (block × side) sweeping schedules.
- `patterns-reference.md` — local reference for the Boston Fleet pattern library (see below).
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

### Main bar (`#street-search`) → drives the results table

`performSearch(options)` dispatches three ways:

- **Intersection queries** (anything containing ` and ` or ` & `) → `performIntersectionSearch`:
  1. SAM `/intersection_lookup` canonicalizes the query (`"Comm Ave & Mass Ave"` → `"Commonwealth Ave & Massachusetts Ave"`).
  2. `filterByIntersection` finds rows where `st_name` matches one street and `from`/`to` matches the other, via `streetNamesMatch` (whole-name, not substring — so "Charles St" doesn't pull in "Charlesgate").
  3. Falls back to splitting the *raw* query locally if SAM yields no rows (catches idioms like `"Mt Vernon"` that SAM over-normalizes to `"Mount Vernon"`).
- **Numbered address** (`"122 Commonwealth Ave"`, gated on `precise` — explicit submit or the ~400ms auto-narrow debounce) → `performAddressSearch`: geocode → `narrowToBlocks` ladder (cross-street → neighborhood → whole-street, each step skipped if it empties). **Always returns both even and odd sides** of the matched block (no parity filter). Falls back to local substring on empty.
- **Plain street name** (`"7th st"`, `"Beacon"`) → local substring match against `streetData`, normalized via `normalizeStreetName` / `expandSearchQuery`. Runs on the 300ms debounce while typing (browse mode).

The map pin (`onPinMoved`) reuses the same `narrowToBlocks` ladder when it lands on an exact address (gated by `ADDRESS_SNAP_METERS`), else falls back to broad centerline search.

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

All access goes through three helpers near the top of `app.js`:

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

Leaflet + free OSM tiles. No API key. To switch providers, replace the `L.tileLayer(...)` URL — Leaflet's API is provider-agnostic.

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
2. Before declaring a layout change done, resize to **~1280×800** and confirm the layout still respects `.main-content { max-width: 600px }` and nothing is stretched across the screen.

The map specifically: **don't give it its own width** — let it inherit the 600px cap from `.main-content`. We learned this when the map stretched across the desktop screen at `width: 95vw`.

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

## Styling: Boston Fleet pattern library

This prototype is destined to ship inside boston.gov, so generic UI (buttons, inputs, headers, tables, cards, layout, pagination, tabs, footers) **should use Fleet classes**, not custom CSS. Fleet CSS is vendored at `styles/fleet.css` and loaded by `index.html`. Only write custom CSS for behavior Fleet genuinely doesn't cover (modals, toasts, in-app notification footer, demo panel — see `temp/plans/fleet-migration.md` for the full inventory).

**Before writing custom CSS or markup for any generic UI element, grep `patterns-reference.md`** for the relevant component name or class. The file has 252 components, each with its rendered HTML and a link to the live docs page. Examples:

- Need a button? `grep -A 10 "^## button--" patterns-reference.md`
- Need a form input? `grep -A 10 "^## txi\|^## sf" patterns-reference.md`
- Looking for a class like `.sh-title`? `grep -B 2 "sh-title" patterns-reference.md`

To refresh the reference, re-run the scrape script in the conversation history that created it.

## Sage advice for future coding agents

The prior agent shipped ~400 lines of `styles.css` that reimplemented Fleet primitives from scratch (see `temp/plans/fleet-migration.md` for the autopsy). Avoid repeating these mistakes:

1. **If you're styling a button, search input, table, pagination, tab strip, header, footer, or card — STOP and grep `patterns-reference.md` first.** Fleet almost certainly has it. The prior agent wrote five near-identical "teal-on-white uppercase Montserrat" buttons (`.search-btn`, `.notify-save-btn`, `.modal-submit-btn`, `.notification-prefs-save-btn`, `.save-btn`) when one `.btn` class would have covered all of them. If you find yourself writing the *second* variant of a UI primitive, you've gone wrong.

2. **Fleet's class names are terse on purpose.** `.btn`, `.sf`, `.pg`, `.sh-title`, `.cd`, `.t--upper`, `.responsive-table` — these look cryptic but they're the canonical Boston namespace. Don't wrap them in semantic-feeling custom classes ("but `.search-btn` is clearer than `.btn`!") — that defeats Fleet upgrades, accessibility work, and visual consistency with boston.gov.

3. **Search Fleet by the *component* name, not the HTML tag.** Boston's pattern library is named idiosyncratically: pagination is `pagination`, but search form is `form_search`, section headers are `section_header`, responsive tables are `table--default` / `responsive-table`. Grep broadly (`grep "^## " patterns-reference.md | grep -i <keyword>`) before concluding "Fleet doesn't have this."

4. **Don't reinvent responsive behavior.** The prior agent wrote ~57 lines of `@media (max-width: 600px)` rules to collapse a CSS-grid "table" on mobile by hiding columns and appending data via `::after`. Fleet's `responsive-table` does this declaratively with `data-label` attributes. If you're writing a media query to hide table columns, you're probably reinventing this.

5. **Check what Fleet actually exposes before shadowing it.** Fleet's `public.css` has NO `:root { --vars }` block — brand colors are baked into selectors as hex literals. The CSS variables in `styles.css` (`--charles-blue`, `--optimistic-blue`, etc.) are therefore load-bearing for app-specific selectors. Don't blindly delete them assuming Fleet "must" expose them.

6. **For markup that already exists, don't just slap Fleet classes onto custom HTML — adopt Fleet's markup structure too.** Fleet components often have specific nesting (e.g. `.sf > .sf-i > .sf-i-f + .sf-i-b`) and partial classes won't render correctly. Copy the example HTML from `patterns-reference.md` verbatim, then customize the content.

7. **Big-ticket items (header, tabs) are worth doing right the first time.** Because this prototype will ship inside boston.gov, the site header and tab navigation eventually need to match Fleet exactly (`header--default`, `tabs--default`). The prior agent built slim custom versions of both — now those have to be replaced. If you're adding a top-level navigation element from scratch, use the Fleet version even if it's more markup than you'd otherwise write.

8. **Don't pre-emptively delete the vendored `styles/fleet.css`** — that's our pinned, vetted copy. To update it, run `bash styles/refresh-fleet.sh` (which downloads from `patterns.boston.gov` and rewrites asset paths to absolute URLs). Never edit `styles/fleet.css` by hand.
