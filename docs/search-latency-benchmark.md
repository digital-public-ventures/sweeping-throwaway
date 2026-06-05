# Search latency benchmark

Use `scripts/time-address-search.mjs` to time the numbered-address narrowing path
without the DOM layer. The script clones the current app pipeline:

1. `/geocode` the address.
2. For each top geocode match, narrow by cross-street proximity.
3. Resolve each distinct CSV `from`/`to` cross street from the shipped
   `data/sam-cross-street-points.complete-with-aliases.csv` cache, with the same
   normalized cache key the browser uses. Fall back to `/intersection_lookup`
   only for keys missing from the shipped CSV.
4. Fall back to `xy_lookup` + neighborhood + whole street only if proximity
   cannot produce a result.

Run it from the repo root:

```sh
node scripts/time-address-search.mjs
node scripts/time-address-search.mjs --warm
node scripts/time-address-search.mjs --runs 3
```

The endpoint duration totals are summed across requests. Intersection lookups
run in parallel, so the summed intersection time can be much higher than wall
time.

The proximity rung now applies an opposite-side filter before its tie window:
after identifying the nearest cross street, candidate blocks whose other
endpoint projects behind that intersection relative to the geocoded address
point are discarded when at least one same-side candidate remains. This removes
the `Chestnut Hill Ave -> Colburne Street` block from `1950 commonwealth`
without relying on a hardcoded street direction.

## Baseline results

Measured June 4, 2026 against live `https://api.sam.boston.gov` from this
workspace.

### Static cache reloaded per address

| Query | Wall time | Results | SAM calls | Calls by endpoint | Returned blocks |
| --- | ---: | ---: | ---: | --- | --- |
| `122 commonwealth` | 1249 ms | 2 | 1 | 1 geocode, 0 intersection, 0 xy | Commonwealth Ave: Arlington St -> Massachusetts Ave |
| `1950 commonwealth` | 1227 ms | 3 | 1 | 1 geocode, 0 intersection, 0 xy | Commonwealth Ave: Chestnut Hill Ave -> St Thomas Moore Rd; Lake St -> Chestnut Hill Ave |
| `130 newbury` | 810 ms | 2 | 1 | 1 geocode, 0 intersection, 0 xy | Newbury St: Arlington St -> Massachusetts Ave |

Aggregate: 3,286 ms total, 1,095 ms average, 3 SAM calls.

### Warm shared static cache

| Query | Wall time | Results | SAM calls | Calls by endpoint | Cache effect |
| --- | ---: | ---: | ---: | --- | --- |
| `122 commonwealth` | 546 ms | 2 | 1 | 1 geocode, 0 intersection, 0 xy | 13 static intersection cache hits |
| `1950 commonwealth` | 771 ms | 3 | 1 | 1 geocode, 0 intersection, 0 xy | 13 static intersection cache hits; opposite-side Colburne block filtered |
| `130 newbury` | 774 ms | 2 | 1 | 1 geocode, 0 intersection, 0 xy | 5 static intersection cache hits |

Aggregate: 2,091 ms total, 697 ms average, 3 SAM calls.

## Latency reduction ideas

1. ✅ Precompute and ship a static cross-street point table for every
   `(street, from/to)` pair in `data/street-sweeping.csv`. This removes the
   cold-start fan-out entirely; the address path is now one `/geocode` call plus
   local math for covered cross streets. The shipped asset is
   `sam-cross-street-points.complete-with-aliases.csv`.
2. Persist any runtime cross-street cache updates in `localStorage` or IndexedDB with a schema
   version tied to the CSV timestamp. That gives repeat visitors the warm-cache
   path for any missing keys resolved after page load.
3. Add a stale-while-revalidate cache: use shipped or persisted points
   immediately, then refresh missing or old points in the background.
4. Cache geocode responses by normalized address for the session, and optionally
   persist successful exact-address geocodes. This mainly helps repeated submits
   or tab/map flows for the same address.
5. Do not call `/xy_lookup` after a successful proximity narrow. The current
   code already behaves this way in the measured cases; preserve that ordering.
6. If a static table is too large, generate it only for high-fan-out streets
   first. Commonwealth alone turns each cold address from 14 SAM calls into 1.
7. Consider a build-time validation script that refreshes the point table and
   reports unresolved cross streets, rather than discovering those misses during
   user searches.

## Precomputed table size

Assuming the precomputed table only covers streets that appear in
`data/street-sweeping.csv`, the current runtime shape needs one
`/intersection_lookup` call per distinct normalized `(street, cross street)`
pair, excluding `Dead End` endpoints.

Current CSV snapshot:

| Metric | Count |
| --- | ---: |
| CSV rows loaded by the benchmark | 3,757 |
| Distinct normalized sweeping streets | 1,519 |
| Raw endpoint occurrences (`from` + `to`) | 7,514 |
| Distinct normalized `(street, cross)` pairs, excluding `Dead End` | 3,481 |
| Distinct normalized `(street, cross)` pairs, including `Dead End` | 3,651 |
| Literal case-insensitive `(street, cross)` pairs, excluding `Dead End` | 3,495 |

So a full precompute matching current app behavior is about **3,481 SAM
`/intersection_lookup` calls**. No `/geocode` or `/xy_lookup` calls are needed
to build that cross-street point table.

## Precompute script

`scripts/precompute-sam-intersections.mjs` builds the full cross-street point
CSV at a conservative client-side rate limit.

```sh
node scripts/precompute-sam-intersections.mjs --dry-run
node scripts/precompute-sam-intersections.mjs
tail -f temp/sam-cross-street-points.attempts.csv
node scripts/precompute-sam-intersections.mjs --retry-failed
```

Defaults:

| Option | Default | Notes |
| --- | --- | --- |
| `--rpm` | `50` | Starts one request every 1,200 ms, sequentially. |
| `--out` | `temp/sam-cross-street-points.csv` | Appends rows as each lookup completes. |
| `--log` | `temp/sam-cross-street-points.attempts.csv` | Appends one row per request attempt. |
| `--limit` | none | Useful for smoke tests. |
| `--include-dead-end` | off | Current app behavior excludes `Dead End`. |
| `--retry-failed` | off | Existing non-`ok` rows are skipped unless this is set. |

At 3,481 lookups and 50 requests/minute, the full run takes about **70
minutes** before retries. The output is checkpointed: rerunning the script reads
the existing output CSV and skips completed `(normalized_street,
normalized_cross)` keys.

The attempt log is for live monitoring. It records `logged_at`, `query`,
`attempt`, `outcome`, `http_status`, `response_ms`, `retry_after_header`,
`retry_delay_ms`, and `error` for every individual request attempt, including
intermediate retries that do not produce a final result row yet.

### Full precompute run

Ran June 4, 2026 at the default 50 requests/minute:

| Output | Count |
| --- | ---: |
| Final result rows | 3,481 |
| `ok` | 3,409 |
| `no_match` | 61 |
| `error` | 11 |
| Attempt log rows | 3,515 |
| Retry attempt rows | 34 |
| HTTP `429` responses | 0 |
| HTTP `503` responses | 44 |

The 11 final errors were repeated `503 SERVICE UNAVAILABLE` responses, not rate
limits. They can be retried with:

```sh
node scripts/precompute-sam-intersections.mjs --retry-failed
```

### Error recovery pass

Ran follow-up recovery for the 11 `error` rows:

1. Retry original `/intersection_lookup` query.
2. Retry reversed `/intersection_lookup` query.
3. Fill from an existing successful reciprocal row.
4. Query ArcGIS SAM layer 8 directly with `FULL_STREET_NAME` /
   `FULL_STREET_NAME2` variants.

Steps 1-3 recovered `0/11`. ArcGIS layer 8 recovered `11/11`, including the
`West Howell St` row via the layer's `W Howell St` spelling.

Recovery artifacts:

| File | Purpose |
| --- | --- |
| `temp/archive/sam-precompute-2026-06-04/sam-cross-street-points.fills.csv` | Steps 1-3 attempt results; all unresolved. |
| `temp/archive/sam-precompute-2026-06-04/sam-cross-street-points.arcgis-fills.csv` | ArcGIS layer-8 fills for all 11 former errors. |
| `temp/archive/sam-precompute-2026-06-04/sam-cross-street-points.complete.csv` | Original-schema merged CSV with the 11 errors replaced by ArcGIS fills. |

Merged complete status: `3,420 ok`, `61 no_match`, `0 error`.

### No-match recovery pass

Ran follow-up recovery for the 61 `no_match` rows:

1. Classify known non-intersection sentinels without API calls:
   municipal boundaries (`Town Line`, `Brookline line`), `End of Street`,
   `MBTA`, `SW Corridor Path`, `SUSI YARD`, and self-references.
2. Fill deterministic CSV/SAM naming mismatches through exact ArcGIS layer-8
   lookups at 50 requests/minute.
3. Fill deterministic aliases from an existing successful reciprocal row when
   the aliased pair is already present in the error-recovered complete CSV.
4. Audit the remaining no-alias rows by querying all ArcGIS intersections on
   the primary street at 50 requests/minute and ranking possible cross-street
   candidates. The audit output is for review only; it does not merge guesses.

Additional deterministic aliases recovered:

| CSV query | Fill |
| --- | --- |
| `Carpenter St and Devine Way` | `Carpenter St & General William H Devine Way` |
| `Clipper Ship Ln and Msgr Jacobbe Rd` | Existing reciprocal `Monsignor Albert A. Jacobbe Rd & Clipper Ship Ln` |
| `Devine Way and Dorchester Ave` | `Dorchester Ave & General William H Devine Way` |
| `Devine Way and Old Colony Ave` | `General William H Devine Way & Old Colony Ave` |
| `Homes Ave and Gevena Ave` | Existing reciprocal `Homes Ave & Geneva Ave` |
| `Mohawk St and Devine Way` | `General William H Devine Way & Mohawk St` |
| `Rand St and Boxford Street` | `Brookford St & Rand St` |
| `Rogers St and Devine Way` | `General William H Devine Way & Rogers St` |
| `Wendeller St and Devine Way` | `General William H Devine Way & Wendeller St` |
| `Yawkey Way and Brookline Ave` | `Brookline Ave & Jersey St` |
| `Yawkey Way and Van Ness St` | `Jersey St & Van Ness St` |

No-match recovery artifacts:

| File | Purpose |
| --- | --- |
| `scripts/recover-sam-no-match-aliases.mjs` | Classifies non-intersections and recovers deterministic aliases at `--rpm 50`. |
| `scripts/audit-sam-no-match-candidates.mjs` | Rate-limited audit of top candidate cross-streets for unresolved rows. |
| `temp/archive/sam-precompute-2026-06-04/sam-cross-street-points.alias-fills.csv` | Per-row no-match recovery/classification output. |
| `temp/archive/sam-precompute-2026-06-04/sam-cross-street-points.no-match-candidates.csv` | Candidate audit output for remaining no-alias rows. |
| `data/sam-cross-street-points.complete-with-aliases.csv` | Shipped app cache (in `data/`) with error and alias fills. |

Current merged status after deterministic error + no-match recovery:

| Status | Count |
| --- | ---: |
| `ok` | 3,431 |
| `no_match` | 50 |
| `error` | 0 |

The remaining 50 are 26 classified non-intersections/boundaries/self-references
and 24 unresolved rows. We do not need to synthesize intersection points for
the classified terminal/boundary rows. Runtime proximity narrowing treats those
as one-ended CSV segments: if the real cross-street endpoint is nearest, it can
select the terminal block and uses the CSV `distance` to prefer the shortest
overlapping terminal segment. The candidate audit found no additional row that
was safe to merge automatically after `Rand St and Boxford Street` was
confirmed as `Brookford St & Rand St`.
