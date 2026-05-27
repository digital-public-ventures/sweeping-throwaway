# boston-prototype

Static prototype for the "Notify Boston" street-sweeping alerts feature. No build step — open `index.html` directly.

## Files

- `index.html` — single-page app shell, two tabs (search + my notifications)
- `app.js` — all behavior (CSV load via PapaParse, search, tab switching, localStorage for saved streets)
- `styles.css` — project-specific styles only; generic UI primitives come from Fleet
- `styles/fleet.css` — vendored copy of Boston's Fleet pattern library CSS (refresh with `bash styles/refresh-fleet.sh`)
- `street-sweeping.csv` — source data
- `patterns-reference.md` — local reference for the Boston Fleet pattern library (see below)
- `temp/plans/` — design/migration plans for in-flight work; consult before making related changes

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
