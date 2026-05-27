# boston-prototype

Static prototype for the "Notify Boston" street-sweeping alerts feature. No build step — open `index.html` directly.

## Files

- `index.html` — single-page app shell, two tabs (search + my notifications)
- `app.js` — all behavior (CSV load via PapaParse, search, tab switching, localStorage for saved streets)
- `styles.css` — project-specific styles only; generic UI primitives come from Fleet
- `street-sweeping.csv` — source data
- `patterns-reference.md` — local reference for the Boston Fleet pattern library (see below)

## Styling: Boston Fleet pattern library

Generic UI (buttons, inputs, headers, tables, cards, layout) should use Fleet classes from `https://patterns.boston.gov/css/public.css` (loaded via CDN in `index.html`). Only write custom CSS for behavior Fleet doesn't cover.

**Before writing custom CSS or markup for any generic UI element, grep `patterns-reference.md`** for the relevant component name or class. The file has 252 components, each with its rendered HTML and a link to the live docs page. Examples:

- Need a button? `grep -A 10 "^## button--" patterns-reference.md`
- Need a form input? `grep -A 10 "^## txi\|^## sf" patterns-reference.md`
- Looking for a class like `.sh-title`? `grep -B 2 "sh-title" patterns-reference.md`

To refresh the reference, re-run the scrape script in the conversation history that created it.
