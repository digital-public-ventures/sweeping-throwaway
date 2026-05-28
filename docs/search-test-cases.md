# Search test cases

The narrative companion to [`search-test-matrix.csv`](search-test-matrix.csv). The **CSV is canonical** for the per-query expected row count and the sprint pass/fail status; this doc explains *what each case exercises and why*, so the two don't duplicate counts (which drift as the CSV/SAM data changes).

Related: `../temp/plans/search-narrowing-two-phase.md` (the plan), [search-results-insights.md](search-results-insights.md) (why the design is shaped this way).

**How to drive one manually:** type into the main search bar and press Enter (or click Search) for the precise path; map cases require opening "Search by map" and dropping the pin.

---

## Plain street name (no number) → all blocks for that street

Browse mode: substring match, supports partial typing. Returns *every* block on the street (both sides).

| Query | What it exercises |
| --- | --- |
| `Beacon St` / `Beacon` | baseline whole-street; partial name (no type word) |
| `Commonwealth Ave` | long street, many blocks across neighborhoods |
| `Boylston St` | common multi-block street |
| `7th` / `7th st` | ordinal expansion (`7th` → `Seventh`) |
| `W 7th St` / `E 7th St` | direction expansion (`W`→`West`, `E`→`East`) + ordinal |
| `West Seventh St` | already-canonical form |
| `Chelsea St` | clean name |
| `Cheslea St` | CSV-style typo — **fails** (no fuzzy matching yet) |
| `Mass Ave` / `Comm Ave` | abbreviation NOT expanded in local path — **fails** |
| `N St` / `E St` | known substring over-match (`n st` ⊂ "Eaton St") — **fails** |
| `Eaton St` | street with no sweeping rows → graceful empty |
| `asdfqwer` | nonsense → graceful empty |

---

## Numbered address → single block, both sides (1–2 rows)

Precise path (explicit submit, or auto-narrow ~400ms after typing stops). Geocode → narrowing ladder (cross-street → neighborhood → whole-street), both sides always returned.

| Query | What it exercises |
| --- | --- |
| `122 Commonwealth Ave` | **coarse CSV block**; cross-street is a back alley → skipped → neighborhood narrowing (Back Bay) |
| `200 W 7th St` | **finely-blocked street**; cross-street narrowing pins it; SAM "W Seventh St" ↔ CSV "West Seventh St" |
| `100 Boylston` | address with no type word; multi-block street — **doesn't fully pin** (last-mile) |
| `1 City Hall Square` | **plaza edge** — geocodes but no sweeping rows; default app address; graceful empty |
| `100 Mass Ave` / `100 Massachsetts Ave` | centerline = back alley; long street → narrowing falls through to whole street — **doesn't pin** |
| `100 Comm Ave` | SAM geocodes "Commercial St" not "Commonwealth" — **wrong street** |
| `100 Cheslea St` | typo with number — SAM doesn't fuzzy-correct — **fails** |
| `1 Saint Botolph St` | SAM matched "Saint George St" (wrong) — watch top-score filtering |
| `1 St Botolph St` | SAM empty, local substring catches it |
| `200 Dorchester Ave` | geocoder normalizes "Ave"→"St"; multi-block — **doesn't pin** |

**Auto-narrow:** type `122 Commonwealth Ave` and wait — broad (~20) at ~300ms, auto-narrows to 2 by ~700ms (400ms timer + geocode), no submit needed.

---

## Intersection → only blocks terminating at the corner

Detected by ` and ` / ` & `. SAM-first canonicalization, local fallback. Whole-name matching (no substring) so look-alikes don't leak in. Up to ~2× the streets meeting there (even/odd per street).

| Query | What it exercises |
| --- | --- |
| `Beacon & Charles` | **look-alike fix** — no "Charlesgate East/West" or "Charles Street South" (was 5 rows before fix, now 3) |
| `Charles & Beacon` | order-independence |
| `Beacon St & Charles St` / `Beacon and Charles` / `Beacon Street and Charles Street` | canonical input, `and` connector, full type words |
| `Mt Vernon & Charles` | **local fallback** — SAM over-normalizes "Mt"→"Mount", misses CSV "Mt Vernon St" |
| `Comm Ave & Mass Ave` | **SAM win** — expands "Comm"→"Commonwealth", "Mass"→"Massachusetts" |
| `Boylston & Tremont` / `Hanover & Parmenter` / `Cambridge & Charles` / `Beacon & Tremont` | normal corners (tie between paths) |
| `Dorchester Ave & W 7th` | real corner, but no sweeping rules at that block boundary → empty |
| `NotAStreet & FakeStreet` | no SAM match, no local match → friendly error |

---

## Map pin (drag / click)

Runs the same narrowing as the typed-address path when the pin lands on an exact address. Coordinates are `lat, lng`.

| Pin location | Coords | What it exercises |
| --- | --- | --- |
| Residential street (122 Comm point) | `42.35178, -71.07694` | narrows to the block — "122 Commonwealth Ave" |
| Finely-blocked street (W 7th) | `42.33426, -71.05054` | resolves "196 W Seventh St", narrows |
| Boston Common interior (void) | `42.3551, -71.0656` | no exact address → broad centerline fallback ("Tremont St") |
| Charles River / water | `42.3560, -71.0760` | "No nearby address found" → fallback (Storrow, unswept) |
| Big intersection (Mass/Comm) | `42.3503, -71.0894` | snaps to "31 Massachusetts Ave" — **doesn't pin** (Mass Ave too long) |
| Default / Boston center | `42.3601, -71.0589` | Boston Common — void |

---

## Known-fail (both local and SAM) — informational

Coverage limits; all return 0 with a friendly message.

| Query | Why |
| --- | --- |
| `McAuliffe Bridge` / `Tobin Bridge` | bridge, not a sweeping street; SAM geocode empty |
| `Storrow Drive` | state highway (DCR), not addressable sweeping blocks |
| `100 Dor Ave` | SAM doesn't expand "Dor" → "Dorchester" without more context |
