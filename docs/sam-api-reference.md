# Boston SAM — validated API reference

The authoritative reference for Boston's System for Address Management (SAM). Every endpoint here was validated by hitting it live (originally 2026-05-27). This supersedes an earlier third-party note that had several wrong claims (`/reverse-geocode` does not exist, the spatial reference is feet not meters, and the elaborate PostGIS geometry dance it described is unnecessary).

## Two services, distinct responsibilities

### 1. `api.sam.boston.gov` — REST wrapper, JSON, no auth

OpenAPI spec lives at <https://api.sam.boston.gov/openapi.yaml> (the human page at `/` is a Redoc render of the same spec). Endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /geocode?address=…` | Address → list of `AddressMatch`. Returns lon/lat (`matching_address_x`, `matching_address_y` in WGS84), SAM ids, neighborhood, ward, trash day, etc. Empty array on no match. |
| `GET /xy_lookup?x=…&y=…` | WGS84 lon/lat → nearest address + nearest centerline + nearest intersection + districts. **This is the "reverse geocode" endpoint** (NOT `/reverse-geocode`, which 404s). |
| `GET /intersection_lookup?intersection=A and B` | Intersection name → coords + districts. Accepts ` and ` or ` & `. |
| `GET /addresses_by_zip?zip=…` | All addresses in a ZIP. |
| `GET /address_by_id?sam_id=…` | Pull a single address by SAM id. |
| `GET /parks_lookup` | Boston Parks attributes. |

#### What `/geocode` returns (the fields the app uses)

`street_name` + `street_number` + `planning_neighborhood` come back clean and are the right anchors for narrowing — **do not** use `/xy_lookup`'s centerline for an address (see the gotcha below).

#### What `/xy_lookup` returns (the useful subset for street sweeping)

```jsonc
{
  "nearest_address_full":        "200 Dorchester St, South Boston, MA 02127",
  "nearest_address_street_name": "Dorchester St",
  "nearest_address_street_number": "200",      // parity → Even/Odd
  "nearest_address_x": -71.0499..., "nearest_address_y": 42.3333...,
  "nearest_address_distance_meters_from_input_xy": 0.4,   // ~0 on-street, null over void

  "nearest_centerline_street_name": "Dorchester St",  // CAN be a back alley — see gotcha
  "nearest_centerline_x": -71.0500..., "nearest_centerline_y": 42.3334...,

  "nearest_intersection_name":   "Dorchester St & W Seventh St",   // <-- a block boundary
  "nearest_intersection_x": ..., "nearest_intersection_y": ...,

  "planning_neighborhood": "South Boston",   // matches CSV dist_name; use this
  "mailing_neighborhood": "Boston",          // often just "Boston" — not useful
  "ward": "07", "precinct": "05", "trash_day": "F"
}
```

**Gotcha — don't trust `nearest_centerline_street_name` for an address.** A point near a building can be closer to a back-alley centerline than to the main road. `122 Commonwealth Ave` (geocode score 100) returns centerline "Public Alley No. 435" and intersection "Clarendon St & Public Alley No. 435". Use `nearest_address_street_name` instead.

**Void behavior:** over parks/water SAM returns `nearest_address_full: "No nearby address found"` with null `nearest_address_street_number`. That's the clean signal for "no exact address here." Legit on-street snaps are <10m; the app gates on a 50m cap (`ADDRESS_SNAP_METERS`) as insurance.

### 2. `gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer` — raw GIS layers

Service root: `…/Live_SAM_Address/FeatureServer?f=json`. This is the basis for the **Phase 2 exact-segment narrowing** (see the plan in `temp/plans/search-narrowing-two-phase.md`). Layers:

| ID | Name | Geometry | Notes |
|---|---|---|---|
| 0 | `SAM_Live_Addresses_tbl` | Point | Every active address. |
| 1 | `SAM_Live_Addresses_With_Primary_tbl` | Point | Same plus building-primary link. |
| 2 | `SAM_Live_Buildings_tbl` | Polygon | Building footprints. |
| 3 | `SAM_Boston_Segments_tbl` | Polyline | **Street block segments with L/R address ranges.** |
| 4 | `CAD_Addresses_Segments_tbl` | Point | CAD/911 join. |
| 8 | `SAM_Live_Intersections_deduplicated_tbl` | Point | **Intersection points with `INTERSECTION_NAME` and the two `SEGMENT_ID`s that meet there.** |

Tables (no geometry, used as lookups): 5 master street names, 6 street aliases, 7 suffix crosswalk.

#### Layer 3 — segments — actual field list (confirmed)

```
OBJECTID         integer
SEGMENT_ID       integer
L_F_ADD          string  (nullable)   left-side from address
L_T_ADD          string  (nullable)   left-side to address
R_F_ADD          string  (nullable)   right-side from address
R_T_ADD          string  (nullable)   right-side to address
STREET_ID        integer
PRE_DIR          string  (nullable)   e.g. "W", "E", "N"
ST_NAME          string               canonical name, e.g. "Dorchester", "Seventh"
ST_TYPE          string               e.g. "AVE", "ST", "RD"
SUF_DIR          string  (nullable)
ALTERNATE_NAME   string  (nullable)   common aliases
CFCC             string               census feature classification
SPEEDLIMIT       smallint
ONEWAY           string               "FT" = one-way in geometry direction, "TF" = reverse
F_ZLEV / T_ZLEV  smallint             elevation level (for overpasses)
FT_DIR / TF_DIR  string               cardinal direction of geometry
SHIELD, HWY_NUM
MUN_L / MUN_R    municipality on each side
NBHD_L / NBHD_R  neighborhood on each side
ZIP_L / ZIP_R    zip on each side
```

Notes:
- Address-range fields are **strings**, not integers — parse before comparison, and they can be `null`.
- "Left" / "right" are relative to the polyline direction; do not assume L = odd or L = west.

#### Layer 8 — intersections — actual field list (confirmed)

```
OBJECTID                        oid
SEGMENT_ID                      integer        # one segment that meets here
STREET_ID                       integer
FULL_STREET_NAME                string         # e.g. "Dorchester St"
SEGMENT_ID2                     integer        # the other segment
STREET_ID2                      integer
FULL_STREET_NAME2               string
INTERSECTION_NAME               string         # e.g. "Dorchester St & W Seventh St"
INTERSECTION_NAME_REVERSE       string
F_ZLEV / T_ZLEV / F_ZLEV2 / T_ZLEV2
```

The win: **given a SEGMENT_ID, query layer 8 with `where=SEGMENT_ID=X OR SEGMENT_ID2=X` to get the intersection name(s) at its endpoints.** No `ST_StartPoint` / `ST_DWithin` PostGIS dance required.

#### Spatial reference gotcha

Service native SR is `wkid: 102686` (MA State Plane Mainland, **feet**) — *not* EPSG:26986 (meters). Easy escape hatch: append `&outSR=4326` to any query and get geometries back in WGS84 lon/lat.

#### Example queries

```bash
# All Dorchester Ave segments, with WGS84 geometry
curl "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/3/query?\
where=ST_NAME%3D'DORCHESTER'%20AND%20ST_TYPE%3D'AVE'&\
outFields=SEGMENT_ID,L_F_ADD,L_T_ADD,R_F_ADD,R_T_ADD,ST_NAME,ST_TYPE,PRE_DIR,ONEWAY&\
returnGeometry=true&outSR=4326&f=json"

# Intersections that touch a given segment
curl "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/8/query?\
where=SEGMENT_ID%3D12345%20OR%20SEGMENT_ID2%3D12345&\
outFields=INTERSECTION_NAME,FULL_STREET_NAME,FULL_STREET_NAME2&\
returnGeometry=true&outSR=4326&f=json"

# Segment nearest to a click point (within ~80 ft buffer)
curl "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/3/query?\
geometry=-71.0499,42.3333&geometryType=esriGeometryPoint&inSR=4326&\
spatialRel=esriSpatialRelIntersects&distance=80&units=esriSRUnit_Foot&\
outFields=SEGMENT_ID,ST_NAME,ST_TYPE,PRE_DIR&\
returnGeometry=false&outSR=4326&f=json"
```

(`ArcGIS REST` supports `distance` + `units` for a buffered intersect — the "nearest segment to a tap" primitive.)

## Geocoder behavior worth knowing

- Returns an **array** of `AddressMatch`, sorted by descending `match_score` (0–100). Empty array on no match.
- Auto-corrects the **numeric-↔-word** number names: `"200 W 7th St"` → `"200 W Seventh St"` at score 100.
- **Requires a street number.** Bare street names (`"7th"`, `"Beacon"`, `"Mass Ave"`) return `[]`. This is why the app's main bar can't be SAM-only — local CSV search handles browse-by-name.
- Does **not** do prefix completion or expand idiomatic abbreviations reliably: `"Dor Ave"` → `[]`; `"100 Comm Ave"` geocodes to *Commercial St*, not Commonwealth. A real autocomplete needs a local prefix index (a few hundred unique CSV street names) or a paid completion API.
- `matching_address_x` / `_y` are WGS84.

## How this maps to the app's search (current)

The narrowing ladder in `app.js` (`narrowToBlocks`) uses, in order: nearest-intersection cross-street → `planning_neighborhood` ↔ CSV `dist_name` → whole street. It never parity-filters (both even/odd sides are always returned). The ArcGIS layer-3/layer-8 segment approach above is held in reserve for Phase 2 (exact-segment pinning), gated behind a feature flag, because the CSV's block granularity is uneven and a precise segment often doesn't map to a coarse CSV block.

> Caveat: `losta` / `hista` in `data/street-sweeping.csv` are NOT address ranges — they're linear-reference stations (cumulative distance along the centerline). Don't map a house number to a block via them. The ArcGIS layer-3 `L_F_ADD`/`R_F_ADD` fields *are* real address ranges.
