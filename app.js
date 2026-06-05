/**
 * Notify Boston - Street Sweeping Alert App
 * A mobile-friendly web app for Boston residents to track street sweeping schedules
 */

// ============================================
// GLOBAL STATE
// ============================================

let streetData = [];
let savedStreets = [];
let simulatedDate = null; // For demo mode

// Pagination state
let currentPage = 1;
let pageSize = 100;
let currentSearchResults = [];

// Selection state (persists across pagination)
let pendingSelections = new Map(); // mainId -> { sweeping: bool }

// Debug-filters state for the current search. `baseRows` is all results for the
// nearest road(s); each filterDef carries the set of main_ids it keeps; `checked`
// is the active subset. Displayed results = baseRows narrowed by every checked
// filter (AND). With nothing checked, all of baseRows shows.
let lastSearch = { baseRows: [], filterDefs: [], checked: new Set() };

// Edit mode state for My Notifications tab
let editModeEnabled = false;
let pendingRemovals = new Set(); // main_ids marked for removal in edit mode

const STORAGE_KEY = "notifyBoston_savedStreets";
const NOTIFY_PREFS_KEY = "notifyBoston_notifyPrefs";
const CROSS_STREET_POINTS_CSV =
  "data/sam-cross-street-points.complete-with-aliases.csv";
// Precomputed block -> polyline geometry (scripts/precompute-segment-geometry.mjs).
// Keyed by `${normStreet}|${normFrom}|${normTo}`; value { mapped, paths:[[[lat,lng]]] }.
const SEGMENT_GEOMETRY_JSON = "data/segment-geometry.json";

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

// Detect "Street A and Street B" / "Street A & Street B" queries.
const isIntersectionQuery = (q) => /\s+(and|&)\s+/i.test(q);

// Max distance (meters) from a dropped pin to its nearest SAM address for us
// to treat it as an "exact address" worth narrowing to a single block. SAM
// returns no address at all over parks/water; legit on-street snaps are <10m.
const ADDRESS_SNAP_METERS = 50;

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
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  loadSavedStreets();
  loadNotificationPrefs();
  loadStreetData();
  loadCrossStreetPointCache();
  loadSegmentGeometry();
  setupEventListeners();
  setupDemoMode();
  setupNotificationFooter();
  setupSignupModal();
});

function loadStreetData() {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = '<p class="loading">Loading street data</p>';

  Papa.parse("data/street-sweeping.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      streetData = results.data.filter((row) => row.main_id && row.st_name);
      resultsContainer.innerHTML = "";
      console.log(`Loaded ${streetData.length} street segments`);
    },
    error: (error) => {
      resultsContainer.innerHTML =
        '<p class="results-placeholder">Error loading street data. Please refresh the page.</p>';
      console.error("Error loading CSV:", error);
    },
  });
}

function loadSavedStreets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    savedStreets = stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error loading saved streets:", e);
    savedStreets = [];
  }
}

function saveSavedStreets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStreets));
  } catch (e) {
    console.error("Error saving streets:", e);
  }
}

function loadNotificationPrefs() {
  try {
    const stored = localStorage.getItem(NOTIFY_PREFS_KEY);
    return stored
      ? JSON.parse(stored)
      : { email: true, text: false, push: false };
  } catch (e) {
    return { email: true, text: false, push: false };
  }
}

function saveNotificationPrefs(prefs) {
  try {
    localStorage.setItem(NOTIFY_PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error("Error saving notification prefs:", e);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Search
  // Explicit submit (button / Enter) → precise mode: numbered addresses get
  // the geocode narrowing ladder. Debounced typing stays on instant local search.
  document
    .getElementById("search-btn")
    .addEventListener("click", () => performSearch({ precise: true }));
  document.getElementById("street-search").addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch({ precise: true });
  });

  // Two-stage debounce while typing:
  //  - 300ms: instant broad results (local; intersections also narrow here).
  //  - 1500ms: auto-narrow numbered addresses via the geocode ladder, so users
  //    don't have to know to submit when results are already on screen.
  let broadTimeout, narrowTimeout;
  document.getElementById("street-search").addEventListener("input", () => {
    clearTimeout(broadTimeout);
    clearTimeout(narrowTimeout);
    const query = document.getElementById("street-search").value.trim();
    if (query.length < 2) return;
    broadTimeout = setTimeout(() => performSearch(), 300);
    // Numbered addresses are the only shape where precise mode changes the
    // result, so only they need the auto-narrow timer.
    if (isNumberedAddress(query)) {
      narrowTimeout = setTimeout(() => performSearch({ precise: true }), 400);
    }
  });

  // Search-by-map toggle
  document.getElementById("pin-btn").addEventListener("click", toggleMap);

  // Debug-panel geocode bar: SAM-geocode an address and pan the map to it.
  document
    .getElementById("map-geocode-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = document.getElementById("map-geocode-input").value.trim();
      if (!q) return;
      const status = document.getElementById("map-status");

      // Intersection query → /intersection_lookup, otherwise /geocode. Either
      // way this stays a pure-SAM probe (no local fallback) so it's a fair
      // comparison to the main bar's hybrid behavior.
      if (isIntersectionQuery(q)) {
        status.textContent = "Looking up intersection…";
        try {
          const matches = await samIntersectionLookup(q);
          const best = matches[0];
          if (!best) {
            status.textContent = `No SAM intersection match for "${q}".`;
            return;
          }
          const ll = {
            lat: best.matching_intersection_y,
            lng: best.matching_intersection_x,
          };
          const canonical = best.matching_intersection_full.split(",")[0];
          mapInstance.setView(ll, 17);
          document.getElementById("street-search").value = canonical;
          performSearch();
          status.textContent = `Showing results for intersection ${canonical}.`;
        } catch (err) {
          status.textContent = `Intersection lookup failed: ${err.message}`;
        }
        return;
      }

      status.textContent = "Geocoding…";
      try {
        const matches = await samGeocode(q);
        const best = matches[0];
        if (!best) {
          status.textContent = `No geocode match for "${q}".`;
          return;
        }
        const ll = {
          lat: best.matching_address_y,
          lng: best.matching_address_x,
        };
        mapInstance.setView(ll, 17);
        onPinMoved(ll);
      } catch (err) {
        status.textContent = `Geocode failed: ${err.message}`;
      }
    });
}

// ============================================
// MAP (inline search-by-pin)
// ============================================

let mapInstance = null;
// Leaflet layer group holding the polylines for the current search's blocks.
// Created lazily on first draw, then reused/cleared so re-searching swaps lines.
let resultSegmentLayer = null;
// Block-key -> { mapped, bridged, paths } from SEGMENT_GEOMETRY_JSON. null until
// loaded; the map degrades gracefully (pin + lookup still work) if it fails.
let segmentGeometry = null;
// When false, blocks whose geometry was only recovered via gap-bridging
// (`bridged: true` — an approximate connector across a digitized gap) are not
// drawn. Toggled from the debug-filters panel.
let showBridgedSegments = true;
// Optional {lat,lng} the map should center on for the current search (the
// intersection corner). When set, drawResultSegments centers there — so the
// screen pin lands on the corner — instead of fitting to the (possibly far-
// reaching) result segments. null → fit to the segments.
let lastSearchFocus = null;

// Distinct line colors + dash patterns, matching commonwealth-ave-segments-map.html.
// Each drawn segment cycles to the next color (and dash) so adjacent / overlapping
// lines stay clearly differentiated.
const SEGMENT_COLORS = [
  "#e6194B", "#ffe119", "#3cb44b", "#4363d8", "#f58231", "#911eb4", "#42d4f4",
  "#f032e6", "#bfef45", "#fa8072", "#469990", "#9A6324", "#800000", "#808000",
  "#000075", "#e67e22", "#1abc9c", "#c0392b", "#2c3e50",
];
const SEGMENT_DASHES = ["", "3,8", "10,8", "14,6,3,6", "6,6"];

// Half the visual gap (meters) between a block's even- and odd-side lines. Our
// geometry is a single centerline per block, so we offset even/odd to opposite
// sides to mimic the reference's parallel per-side lines. Sub-pixel (invisible)
// when zoomed out to a whole street; the lines simply merge.
const SEGMENT_SIDE_OFFSET_M = 7;

// Shift every vertex of a [lat,lng] path perpendicular to its local direction by
// `meters` (signed). Used to separate even/odd lines that share a centerline.
function offsetLatLngPath(path, meters) {
  if (!meters || path.length < 2) return path;
  const n = path.length;
  return path.map(([lat, lng], i) => {
    const [pLat, pLng] = path[Math.max(0, i - 1)];
    const [nLat, nLng] = path[Math.min(n - 1, i + 1)];
    const cos = Math.cos((lat * Math.PI) / 180) || 1;
    // Local travel direction in a locally-planar frame (east = lng·cos, north = lat).
    let dx = (nLng - pLng) * cos;
    let dy = nLat - pLat;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    // Left-perpendicular of travel: (-dy, dx).
    const dLat = (meters / 111320) * dx;
    const dLng = (meters / (111320 * cos)) * -dy;
    return [lat + dLat, lng + dLng];
  });
}

function loadSegmentGeometry() {
  fetch(SEGMENT_GEOMETRY_JSON)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
    .then((data) => {
      segmentGeometry = data;
      console.log(`Loaded geometry for ${Object.keys(data).length} blocks`);
      // If the map is already open on a search, draw now that geometry exists.
      if (mapInstance) drawResultSegments(currentSearchResults);
    })
    .catch((err) => console.warn("Segment geometry unavailable:", err));
}

const segmentBlockKey = (stName, from, to) =>
  `${normalizeStreetName(stName || "")}|${normalizeStreetName(from || "")}|${normalizeStreetName(to || "")}`;

// Sign of the perpendicular offset for a side: even one way, odd the other,
// median/unknown stays on the centerline. Matches the reference's per-side lines.
function sideOffsetSign(side) {
  const s = (side || "").toLowerCase();
  if (s.includes("even")) return 1;
  if (s.includes("odd")) return -1;
  return 0;
}

// Draw one colored polyline per distinct block×side in `results` and fit the map
// to them. Each line gets a distinct color + dash (cycled) so every segment is
// clearly differentiated, and even/odd are offset to opposite sides of the
// centerline. Clears previous lines. No-op until the map and geometry both
// exist. Returns true if it drew at least one segment (callers skip a point-pan).
function drawResultSegments(results) {
  if (!mapInstance || !segmentGeometry) return false;
  if (!resultSegmentLayer) resultSegmentLayer = L.layerGroup().addTo(mapInstance);
  resultSegmentLayer.clearLayers();

  const drawn = new Set();
  const bounds = [];
  let i = 0;
  for (const row of results || []) {
    if (!row.from || !row.to) continue;
    const blockKey = segmentBlockKey(row.st_name, row.from, row.to);
    // One line per side per block — multiple schedule rows for the same side
    // share geometry, so drawing them again would just stack identical lines.
    const key = `${blockKey}|${(row.side || "").toLowerCase()}`;
    if (drawn.has(key)) continue;
    const rec = segmentGeometry[blockKey];
    if (!rec?.mapped || !rec.paths.length) continue;
    if (rec.bridged && !showBridgedSegments) continue;
    drawn.add(key);

    const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    const dashArray = SEGMENT_DASHES[i % SEGMENT_DASHES.length] || null;
    i += 1;
    const offset = sideOffsetSign(row.side) * SEGMENT_SIDE_OFFSET_M;
    const paths = rec.paths.map((path) => offsetLatLngPath(path, offset));

    const line = L.polyline(paths, { color, weight: 5, opacity: 0.9, dashArray });
    line.bindTooltip(
      `${row.st_name} (${row.from} → ${row.to}) — ${formatSideText(row.side)} · ${formatSchedule(row)}`,
      { sticky: true },
    );
    line.addTo(resultSegmentLayer);
    for (const path of paths) for (const pt of path) bounds.push(pt);
  }

  // Center on the search's focal corner (so the screen pin sits on it) rather
  // than fitting to the segments — an intersection block can run far from the
  // corner (e.g. the bridged Charles St line up to Charles Circle).
  if (lastSearchFocus) {
    mapInstance.setView([lastSearchFocus.lat, lastSearchFocus.lng], 16);
  } else if (bounds.length) {
    mapInstance.fitBounds(bounds, { padding: [30, 30] });
  }
  return bounds.length > 0 || !!lastSearchFocus;
}

function toggleMap() {
  const container = document.getElementById("map-container");
  const open = container.style.display !== "none";
  container.style.display = open ? "none" : "block";
  if (!open) {
    if (!mapInstance) initMap();
    // Draw after the container is laid out: the map was display:none until now,
    // so Leaflet must invalidateSize() first or fitBounds() computes against a
    // zero-size map and the fit is wrong. Drawing the current search's blocks
    // fits the map to them; if nothing was drawn — geometry not loaded, or no
    // mapped blocks — fall back to panning to the search input. setView-only on
    // purpose: calling onPinMoved would overwrite the input with the SAM name.
    setTimeout(() => {
      mapInstance.invalidateSize();
      if (!drawResultSegments(currentSearchResults)) panMapToSearchInput();
    }, 0);
    // Bring the map to the top of the viewport so the user doesn't have to
    // scroll manually. Explicit scrollTo (rather than scrollIntoView) because
    // scrollIntoView has alignment quirks that left the map ~90px below the
    // top in testing. Smooth so it doesn't feel jarring on mobile.
    const targetY = container.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }
}

// Pan the map to whatever's currently in the search input. Dispatches to
// SAM /intersection_lookup or /geocode based on the query shape. No-op if
// the input is empty, the map isn't initialized, or SAM returns nothing.
async function panMapToSearchInput() {
  const q = document.getElementById("street-search").value.trim();
  if (!q || !mapInstance) return;
  try {
    if (isIntersectionQuery(q)) {
      const [best] = await samIntersectionLookup(q);
      if (!best) return;
      mapInstance.setView(
        [best.matching_intersection_y, best.matching_intersection_x],
        17,
      );
    } else {
      const [best] = await samGeocode(q);
      if (!best) return;
      mapInstance.setView(
        [best.matching_address_y, best.matching_address_x],
        17,
      );
    }
  } catch {
    // Swallow — leave map at last view.
  }
}

function initMap() {
  const start = [42.3601, -71.0589]; // Boston center
  // scrollWheelZoom off so scrolling the page past the map doesn't accidentally
  // zoom it — users zoom with the +/- control instead.
  mapInstance = L.map("map", { scrollWheelZoom: false }).setView(start, 13);
  // CARTO "light" basemap (muted greys) so the colored result polylines read
  // clearly against it — standard OSM tiles are too colorful for thin overlays.
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap, &copy; CARTO",
  }).addTo(mapInstance);

  // Center pin: a CSS-positioned div anchored to the map frame's visual
  // center. As the user drags the map, the geographic content moves but the
  // pin stays put. On dragend we look up whatever lat/lng is now under it.
  const centerPin = document.createElement("div");
  centerPin.className = "center-pin";
  centerPin.innerHTML =
    '<svg viewBox="0 0 24 36" width="24" height="36" aria-hidden="true">' +
    '<path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#3388ff" stroke="#fff" stroke-width="2"/>' +
    '<circle cx="12" cy="12" r="4" fill="#fff"/>' +
    "</svg>";
  document.getElementById("map").appendChild(centerPin);

  // Floating "Show debug" / "Hide debug" toggle anchored to the map's
  // top-right corner. CONTRACT: this handler must only mutate display +
  // label + aria-pressed. It must NEVER touch the search input, the map
  // (no setView / invalidateSize / pan), the results table, or any other
  // app state. Showing or hiding debug is a purely cosmetic operation.
  const detailsToggle = document.createElement("button");
  detailsToggle.type = "button";
  detailsToggle.id = "map-details-toggle";
  detailsToggle.className = "map-details-toggle";
  // Default state: panel hidden. aria-pressed=true means "hide action is in
  // effect" — i.e., panel is currently hidden.
  detailsToggle.textContent = "Show debug";
  detailsToggle.setAttribute("aria-pressed", "true");
  detailsToggle.setAttribute("aria-controls", "map-details");
  detailsToggle.addEventListener("click", () => {
    const details = document.getElementById("map-details");
    const hidden = details.style.display === "none";
    details.style.display = hidden ? "block" : "none";
    detailsToggle.textContent = hidden ? "Hide debug" : "Show debug";
    detailsToggle.setAttribute("aria-pressed", String(!hidden));
  });
  document.getElementById("map").appendChild(detailsToggle);
  // The toggle button is a child of #map, so clicks on it would bubble up to
  // Leaflet's map.on('click') handler and pan/lookup at the button's screen
  // position. Disable click propagation explicitly (Leaflet's own controls
  // do the same).
  L.DomEvent.disableClickPropagation(detailsToggle);

  mapInstance.on("dragend", () => onPinMoved(mapInstance.getCenter()));
  // Click/tap: pan the map so the tapped point lands under the screen-centered
  // pin, then run the lookup in parallel with the pan animation.
  mapInstance.on("click", (e) => {
    mapInstance.panTo(e.latlng);
    onPinMoved(e.latlng);
  });
  // Tiles render correctly after the container becomes visible.
  setTimeout(() => mapInstance.invalidateSize(), 0);
}

async function onPinMoved({ lat, lng }) {
  const status = document.getElementById("map-status");
  status.textContent = "Looking up street…";
  // Pin-drop results fit to the address block, not a stale intersection corner.
  lastSearchFocus = null;
  try {
    const data = await samXyLookup(lng, lat);
    const street =
      data.nearest_centerline_street_name || data.nearest_address_street_name;
    // Populate the details panel regardless of its current visibility — if the
    // user has it open, they see fresh data; if collapsed, it's ready to show.
    const inputLatLng = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    const snapLatLng =
      data.nearest_address_y != null && data.nearest_address_x != null
        ? `${data.nearest_address_y.toFixed(6)}, ${data.nearest_address_x.toFixed(6)}`
        : "—";
    const snapDistance =
      data.nearest_address_distance_meters_from_input_xy != null
        ? `${data.nearest_address_distance_meters_from_input_xy.toFixed(1)} m`
        : "—";
    document.getElementById("map-details-dump").textContent = [
      `input lat,lng: ${inputLatLng}`,
      `snap  lat,lng: ${snapLatLng}  (${snapDistance} away)`,
      `address:       ${data.nearest_address_full || "—"}`,
      `centerline:    ${data.nearest_centerline_street_name || "—"}`,
      `intersection:  ${data.nearest_intersection_name || "—"}`,
      `neighborhood:  ${data.mailing_neighborhood || "—"}`,
    ].join("\n");
    const input = document.getElementById("street-search");
    const addrStreet = data.nearest_address_street_name;
    const addrNum = data.nearest_address_street_number;
    const addrDist = data.nearest_address_distance_meters_from_input_xy;

    // Exact address under the pin → narrow to the block(s), same as the typed-
    // address path. SAM returns no address (null fields) over parks/water; the
    // distance cap guards against a far "nearest" snap. Use the ADDRESS street
    // name, not the centerline (which can be a back alley — e.g. 122 Comm Ave).
    if (
      addrStreet &&
      addrNum &&
      addrDist != null &&
      addrDist < ADDRESS_SNAP_METERS
    ) {
      input.value = `${addrNum} ${addrStreet}`;
      status.textContent = `Showing results for ${data.nearest_address_full}.`;
      // Route through the SAME context builder the typed-address path uses, so
      // the pin gets identical narrowing + debug filters. xy_lookup's snapped
      // nearest_address_x/y is the same anchor geocode provides.
      const emptyMsg = `No sweeping rules found near ${data.nearest_address_full}.`;
      const ctx = await buildAddressFilterDefs([
        {
          street_name: addrStreet,
          matching_address_x: data.nearest_address_x,
          matching_address_y: data.nearest_address_y,
          planning_neighborhood: data.planning_neighborhood,
        },
      ]);
      if (ctx.base.length) applySearch(ctx.base, ctx.filterDefs, emptyMsg);
      else applySearch(localStreetSearch(addrStreet.toLowerCase()), [], emptyMsg);
      return;
    }

    // No exact address → broad search on the centerline street (or nothing).
    if (!street) {
      status.textContent = "No nearby Boston street found.";
      return;
    }
    status.textContent = `Showing results for ${street}.`;
    input.value = street;
    performSearch();
  } catch (err) {
    status.textContent = `Lookup failed: ${err.message}`;
  }
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  if (tabName === "search") {
    document.getElementById("search-tab").classList.add("active");
    // Show footer if there are search results
    if (currentSearchResults.length > 0) {
      showNotificationFooter();
    }
  } else if (tabName === "my-streets") {
    document.getElementById("my-streets-tab").classList.add("active");
    editModeEnabled = false;
    pendingRemovals = new Set();
    hideNotificationFooter();
    renderSavedStreets();
  }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Normalize a string by expanding all abbreviations to full forms
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

// A numbered address: leading digits + a street fragment ("122 Commonwealth").
const isNumberedAddress = (q) => /^\d+\s+\S/.test(q);

// `precise` (true only on explicit submit — button / Enter) gates the
// network-backed numbered-address path so we don't geocode mid-type. The
// 300ms debounce while typing calls performSearch() with no options.
function performSearch(options = {}) {
  const { precise = false } = options;
  const raw = document.getElementById("street-search").value.trim();
  const query = raw.toLowerCase();
  const resultsContainer = document.getElementById("search-results");
  const searchError = document.getElementById("search-error");

  searchError.style.display = "none";
  // Default: fit the map to the result segments. Only intersection search sets a
  // focal corner (below). Reset here so a prior intersection doesn't linger.
  lastSearchFocus = null;

  if (!query) {
    resultsContainer.innerHTML = "";
    hideNotificationFooter();
    return;
  }

  // Intersection query → SAM-first / local-fallback pipeline.
  if (isIntersectionQuery(raw)) {
    performIntersectionSearch(raw);
    return;
  }

  // Numbered address → geocode + narrowing ladder. Precise (explicit submit or
  // the auto-narrow debounce) runs the network path. The broad typing pass
  // shows a pending state instead of flashing the full street list: that count
  // is misleading for a specific address and would otherwise linger on screen
  // until the async narrow (a few seconds of intersection lookups) replaces it.
  if (isNumberedAddress(raw)) {
    if (precise) performAddressSearch(raw);
    else showSearchPending(raw);
    return;
  }

  // Plain street name → local substring match (browse mode; partial typing).
  renderMatchesOrError(
    localStreetSearch(query),
    "No matches found. Only streets with street sweeping or current permitted work will return results. Try a different name or check the spelling.",
  );
}

// Pending placeholder for the numbered-address path. The narrowed answer needs
// the network, so while it resolves we show a loading line rather than the full
// (misleading) street list. Replaced by renderMatchesOrError when results land.
function showSearchPending(query) {
  document.getElementById("search-error").style.display = "none";
  document.getElementById("debug-filters").innerHTML = "";
  document.getElementById("search-results").innerHTML =
    `<p class="loading">Finding sweeping routes for "${escapeHtml(query)}"</p>`;
  hideNotificationFooter();
}

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

// Block sort: street name, then segment (from/to), then side.
function sortBlocks(matches) {
  return matches.sort((a, b) => {
    const nameCompare = a.st_name.localeCompare(b.st_name);
    if (nameCompare !== 0) return nameCompare;
    const fromCompare = (a.from || "").localeCompare(b.from || "");
    if (fromCompare !== 0) return fromCompare;
    return (a.side || "").localeCompare(b.side || "");
  });
}

// Render matches into the results table, or show an error if empty. Shared by
// all three search paths so they stay consistent.
// Establish a search result with an optional set of debug filters. `baseRows`
// is all results for the nearest road(s); each filterDef narrows it. The fired
// production filter starts checked; the user can toggle any of them. Unchecking
// everything reveals all of baseRows. Empty baseRows shows `emptyMessage`.
function applySearch(baseRows, filterDefs, emptyMessage) {
  const searchError = document.getElementById("search-error");
  if (!baseRows.length) {
    document.getElementById("search-results").innerHTML = "";
    document.getElementById("debug-filters").innerHTML = "";
    lastSearch = { baseRows: [], filterDefs: [], checked: new Set() };
    searchError.textContent = emptyMessage;
    searchError.style.display = "block";
    hideNotificationFooter();
    return;
  }
  searchError.style.display = "none";
  const checked = new Set(
    filterDefs.filter((f) => f.available && f.defaultChecked).map((f) => f.id),
  );
  lastSearch = { baseRows, filterDefs, checked };
  applyDebugFilters();
}

// No-filter result (intersection-local fallback, plain-street browse, etc.).
function renderMatchesOrError(matches, emptyMessage) {
  applySearch(matches, [], emptyMessage);
}

// Recompute the displayed results from baseRows ∩ every checked filter, then
// re-render the filter panel, the table, and the map. No network — filters
// carry precomputed main_id sets.
function applyDebugFilters() {
  let rows = lastSearch.baseRows.slice();
  for (const f of lastSearch.filterDefs) {
    if (f.available && lastSearch.checked.has(f.id)) {
      rows = rows.filter((r) => f.keepIds.has(r.main_id));
    }
  }
  sortBlocks(rows);
  currentSearchResults = rows;
  currentPage = 1;
  renderDebugFilters();
  renderSearchResults();
  drawResultSegments(currentSearchResults);
}

function renderDebugFilters() {
  const el = document.getElementById("debug-filters");
  if (!lastSearch.baseRows.length) {
    el.innerHTML = "";
    return;
  }
  const boxes = lastSearch.filterDefs
    .map(
      (f) => `
      <label class="debug-filter${f.available ? "" : " disabled"}">
        <input type="checkbox" data-filter="${f.id}"${lastSearch.checked.has(f.id) ? " checked" : ""}${f.available ? "" : " disabled"}>
        ${escapeHtml(f.label)}
        <span class="debug-filter-count">${f.available ? f.keepIds.size : "n/a"}</span>
      </label>`,
    )
    .join("");
  // Map-geometry toggle: hide blocks whose lines were recovered via gap-bridging
  // (approximate connectors). Count = bridged blocks among the current results.
  const bridgedCount = currentSearchResults.filter(
    (r) => segmentGeometry?.[segmentBlockKey(r.st_name, r.from, r.to)]?.bridged,
  ).length;
  const bridgedBox = `
      <label class="debug-filter">
        <input type="checkbox" id="toggle-bridged"${showBridgedSegments ? " checked" : ""}>
        fix broken segments
        <span class="debug-filter-count">${bridgedCount}</span>
      </label>`;
  el.innerHTML = `<span class="debug-filters-title">Debug filters</span>${boxes}${bridgedBox}`;

  el.querySelectorAll("input[data-filter]").forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb.checked) lastSearch.checked.add(cb.dataset.filter);
      else lastSearch.checked.delete(cb.dataset.filter);
      applyDebugFilters();
    });
  });
  el.querySelector("#toggle-bridged")?.addEventListener("change", (e) => {
    showBridgedSegments = e.target.checked;
    // Geometry-only toggle: redraw the map, leave the result rows alone.
    drawResultSegments(currentSearchResults);
  });
}

// Intersection search: SAM canonicalizes the user query, then we filter the
// CSV for sweeping rows on either side of that corner. Falls back to a pure-
// local split-and-filter if SAM returns nothing (catches Boston idioms like
// "Mt Vernon" that SAM over-normalizes to "Mount Vernon").
async function performIntersectionSearch(rawQuery) {
  lastSearchFocus = null;
  const emptyMsg = `No sweeping rules found for the intersection "${rawQuery}". Try the full street names.`;

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
        if (data[0].matching_intersection_y != null && data[0].matching_intersection_x != null) {
          lastSearchFocus = {
            lat: data[0].matching_intersection_y,
            lng: data[0].matching_intersection_x,
          };
        }
        applySearch(
          base,
          [{ id: "corner", label: "only nearest sections", keepIds: cornerIds, available: cornerIds.size > 0, defaultChecked: true }],
          emptyMsg,
        );
        return;
      }
    }
  } catch {
    // Swallow — fall through to local. Worst case: no results.
  }

  // Local fallback for inputs SAM over-normalizes (e.g. "Mt Vernon" →
  // "Mount Vernon" doesn't match CSV's "Mt Vernon St").
  renderMatchesOrError(filterByIntersection(rawQuery), emptyMsg);
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

// Numbered-address search: geocode, then expose the narrowing as toggleable
// debug filters over all rows for the nearest road. We always include BOTH
// sides of each block — never parity-filter. Falls back to local substring
// search if geocoding finds nothing. See temp/plans/search-narrowing-two-phase.md.
async function performAddressSearch(rawQuery) {
  lastSearchFocus = null; // address results fit to the block, no focal corner
  // Show the pending line up front so an explicit submit doesn't sit on stale
  // results during the network narrow (the broad typing pass already shows it).
  showSearchPending(rawQuery);
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

  // Staleness guard: this path is fired automatically by the auto-narrow
  // debounce, so the user may have kept typing while we awaited the network.
  // Bail rather than render results for a query they've moved past.
  if (document.getElementById("street-search").value.trim() !== rawQuery)
    return;

  const emptyMsg = `No sweeping rules found for "${rawQuery}".`;
  if (ctx?.base.length) {
    applySearch(ctx.base, ctx.filterDefs, emptyMsg);
  } else {
    applySearch(localStreetSearch(rawQuery.toLowerCase()), [], emptyMsg);
  }
}

// ---- Cross-street proximity narrowing -------------------------------------
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

function renderSearchResults() {
  const resultsContainer = document.getElementById("search-results");
  const totalResults = currentSearchResults.length;
  const totalPages = Math.ceil(totalResults / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const pageResults = currentSearchResults.slice(startIndex, endIndex);

  let html = `<p class="results-count">${totalResults} result${totalResults === 1 ? "" : "s"} found</p>`;

  // Render as table
  html += renderResultsTable(pageResults);

  // Pagination controls
  html += renderPagination(totalResults, totalPages);

  // Export-to-CSV (selected rows + query + map location), aligned with the
  // search-results-review.csv schema so the two can be merged.
  html += `
    <div class="export-row">
      <button id="export-csv-btn" class="export-csv-btn" type="button">Export to CSV</button>
    </div>`;

  resultsContainer.innerHTML = html;

  // Add event listeners to alert checkboxes
  resultsContainer.querySelectorAll(".alert-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleAlertCheckboxChange);
  });
  document
    .getElementById("export-csv-btn")
    ?.addEventListener("click", exportSelectedToCsv);

  // Add pagination event listeners
  setupPaginationListeners();

  // Show footer as soon as search results appear
  showNotificationFooter();
}

// Export the search context to CSV: the address-input query, the current map
// center, and each SELECTED result row (the checked alert boxes). If nothing is
// selected, exports a single row with just the query + map location. Columns
// match search-results-review.csv so exports can be merged with it.
const EXPORT_COLUMNS = [
  "query", "map_lat", "map_lng", "street", "from", "to", "side", "schedule",
  "has_map_geometry",
];
function csvCell(value) {
  const s = String(value ?? "");
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}
function buildExportCsv() {
  const query = document.getElementById("street-search").value.trim();
  const c = mapInstance ? mapInstance.getCenter() : null;
  const mapLat = c ? c.lat.toFixed(6) : "";
  const mapLng = c ? c.lng.toFixed(6) : "";
  const selected = currentSearchResults.filter((r) =>
    pendingSelections.has(r.main_id),
  );

  const lines = [EXPORT_COLUMNS.join(",")];
  if (!selected.length) {
    lines.push([query, mapLat, mapLng, "", "", "", "", "", ""].map(csvCell).join(","));
  } else {
    for (const r of selected) {
      const hasGeom =
        segmentGeometry?.[segmentBlockKey(r.st_name, r.from, r.to)]?.mapped
          ? "yes"
          : "no";
      lines.push(
        [query, mapLat, mapLng, r.st_name, r.from, r.to, r.side, formatSchedule(r), hasGeom]
          .map(csvCell)
          .join(","),
      );
    }
  }
  return `${lines.join("\n")}\n`;
}

function exportSelectedToCsv() {
  const blob = new Blob([buildExportCsv()], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "search-export.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderPagination(totalResults, totalPages) {
  if (totalResults <= 10) {
    // Still show page size selector even for small results
    return `
      <div class="pagination-container">
        <div class="pagination-info">
          Showing ${Math.min(totalResults, pageSize)} of ${totalResults} results
        </div>
        <div class="page-size-selector">
          <label>Show:</label>
          <select id="page-size-select">
            <option value="10" ${pageSize === 10 ? "selected" : ""}>10</option>
            <option value="20" ${pageSize === 20 ? "selected" : ""}>20</option>
            <option value="50" ${pageSize === 50 ? "selected" : ""}>50</option>
            <option value="100" ${pageSize === 100 ? "selected" : ""}>100</option>
          </select>
          per page
        </div>
      </div>
    `;
  }

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalResults);

  let paginationHtml = `
    <div class="pagination-container">
      <div class="pagination-info">
        Showing ${startIndex}-${endIndex} of ${totalResults} results
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" id="prev-page" ${currentPage === 1 ? "disabled" : ""}>Prev</button>
  `;

  // Show page numbers (max 5 visible)
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  paginationHtml += `
        <button class="pagination-btn" id="next-page" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
      </div>
      <div class="page-size-selector">
        <label>Show:</label>
        <select id="page-size-select">
          <option value="10" ${pageSize === 10 ? "selected" : ""}>10</option>
          <option value="20" ${pageSize === 20 ? "selected" : ""}>20</option>
          <option value="50" ${pageSize === 50 ? "selected" : ""}>50</option>
          <option value="100" ${pageSize === 100 ? "selected" : ""}>100</option>
        </select>
        per page
      </div>
    </div>
  `;

  return paginationHtml;
}

function setupPaginationListeners() {
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");
  const pageSizeSelect = document.getElementById("page-size-select");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderSearchResults();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(currentSearchResults.length / pageSize);
      if (currentPage < totalPages) {
        currentPage++;
        renderSearchResults();
      }
    });
  }

  document.querySelectorAll(".pagination-btn[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.dataset.page);
      renderSearchResults();
    });
  });

  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
      pageSize = parseInt(e.target.value);
      currentPage = 1;
      renderSearchResults();
    });
  }
}

function handleAlertCheckboxChange(e) {
  const mainId = e.target.dataset.id;
  const isChecked = e.target.checked;

  // Update pending selections (persists across pagination)
  if (isChecked) {
    pendingSelections.set(mainId, { sweeping: true });
  } else {
    pendingSelections.delete(mainId);
  }

  showNotificationFooter();
}

function setupNotificationFooter() {
  const clearBtn = document.getElementById("notify-clear");
  const saveBtn = document.getElementById("notify-save-btn");

  clearBtn.addEventListener("click", () => {
    pendingSelections.clear();
    // Uncheck all checkboxes on current page
    document.querySelectorAll(".alert-checkbox").forEach((cb) => {
      cb.checked = false;
    });
    showNotificationFooter();
  });

  saveBtn.addEventListener("click", () => {
    if (pendingSelections.size === 0) return;
    showSignupModal();
  });
}

function showNotificationFooter() {
  // Only surface the footer once the user has actually selected something.
  if (pendingSelections.size === 0) {
    hideNotificationFooter();
    return;
  }
  const footer = document.getElementById("notify-footer");
  const mainContent = document.querySelector(".main-content");
  footer.style.display = "block";
  mainContent.classList.add("has-footer");
  updateNotificationFooter();
}

function updateNotificationFooter() {
  const footer = document.getElementById("notify-footer");
  const countEl = document.getElementById("notify-count");
  const hintEl = document.getElementById("notify-hint");
  const clearBtn = document.getElementById("notify-clear");

  // Only update counts/hint if footer is visible
  if (footer.style.display === "none") return;

  const totalSelections = pendingSelections.size;
  countEl.textContent = totalSelections;

  if (totalSelections > 0) {
    hintEl.style.display = "none";
    clearBtn.style.display = "inline";
  } else {
    hintEl.style.display = "inline";
    clearBtn.style.display = "none";
  }
}

function hideNotificationFooter() {
  const footer = document.getElementById("notify-footer");
  const mainContent = document.querySelector(".main-content");
  footer.style.display = "none";
  mainContent.classList.remove("has-footer");
}

// ============================================
// SIGN-UP MODAL
// ============================================

function setupSignupModal() {
  const modal = document.getElementById("signup-modal");
  const closeBtn = document.getElementById("modal-close");
  const submitBtn = document.getElementById("modal-submit");

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Toggle input fields based on checkbox state
  document
    .getElementById("modal-check-email")
    .addEventListener("change", (e) => {
      document.getElementById("modal-email-input").style.display = e.target
        .checked
        ? "block"
        : "none";
    });

  document
    .getElementById("modal-check-text")
    .addEventListener("change", (e) => {
      document.getElementById("modal-text-input").style.display = e.target
        .checked
        ? "block"
        : "none";
    });

  document
    .getElementById("modal-check-push")
    .addEventListener("change", (e) => {
      document.getElementById("modal-push-msg").style.display = e.target.checked
        ? "block"
        : "none";
    });

  submitBtn.addEventListener("click", () => completeSignup());
}

function showSignupModal() {
  const modal = document.getElementById("signup-modal");

  // Reset checkboxes and inputs
  document.getElementById("modal-check-email").checked = false;
  document.getElementById("modal-check-text").checked = false;
  document.getElementById("modal-check-push").checked = false;
  document.getElementById("modal-email-input").style.display = "none";
  document.getElementById("modal-text-input").style.display = "none";
  document.getElementById("modal-push-msg").style.display = "none";
  document.getElementById("modal-input-email").value = "";
  document.getElementById("modal-input-text").value = "";

  modal.style.display = "flex";
}

function completeSignup() {
  const modal = document.getElementById("signup-modal");

  // Save notification method preferences from modal checkboxes
  const emailChecked = document.getElementById("modal-check-email").checked;
  const textChecked = document.getElementById("modal-check-text").checked;
  const pushChecked = document.getElementById("modal-check-push").checked;

  if (!emailChecked && !textChecked && !pushChecked) {
    // Require at least one method
    showToast("Please select at least one notification method.");
    return;
  }

  saveNotificationPrefs({
    email: emailChecked,
    text: textChecked,
    push: pushChecked,
  });

  // Save each selected street (discard contact info — not persisted)
  pendingSelections.forEach((selection, mainId) => {
    const street = streetData.find((s) => s.main_id === mainId);
    if (!street) return;

    let savedStreet = savedStreets.find((s) => s.main_id === mainId);

    if (!savedStreet) {
      savedStreet = { ...street, alertSweeping: false };
      savedStreets.push(savedStreet);
    }

    if (selection.sweeping) savedStreet.alertSweeping = true;
  });

  saveSavedStreets();
  updateAlertBadge();

  // Clear pending selections
  pendingSelections.clear();

  // Close modal
  modal.style.display = "none";

  // Update UI
  renderSearchResults();
  showToast(
    "Notifications saved successfully! View saved notifications in the My Notifications tab.",
  );
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}

function renderResultsTable(streets) {
  let html = `
    <div class="results-table">
      <div class="results-table-header">
        <span>Street</span>
        <span>Side</span>
        <span>Schedule</span>
        <span>Alerts</span>
      </div>
  `;

  streets.forEach((street) => {
    html += renderStreetRow(street);
  });

  html += "</div>";
  return html;
}

function renderStreetRow(street) {
  const schedule = formatSchedule(street);
  const savedStreet = savedStreets.find((s) => s.main_id === street.main_id);
  const pendingSelection = pendingSelections.get(street.main_id);
  const sideText = formatSideText(street.side);

  // Calculate status for rich badge display
  const status = calculateStatus(street);
  const nextSweeping = calculateNextSweeping(street, getCurrentDate());
  const nextDateText = nextSweeping
    ? formatDateTime(nextSweeping.start)
    : "No upcoming";

  // Check if already saved or pending selection
  const hasSweeping =
    pendingSelection?.sweeping ||
    (savedStreet?.alertSweeping !== false && savedStreet?.alertSweeping);

  const segmentText =
    street.from && street.to
      ? `${street.from} to ${street.to}`
      : street.from
        ? `From ${street.from}`
        : street.to
          ? `To ${street.to}`
          : "";

  return `
    <div class="street-row" data-id="${street.main_id}">
      <div class="street-row-info">
        <span class="street-row-name" data-side="${sideText}">${escapeHtml(street.st_name)}</span>
        <span class="street-row-segment">${escapeHtml(segmentText)}</span>
      </div>
      <div class="street-row-side">${escapeHtml(sideText)}</div>
      <div class="street-row-schedule">
        <span class="schedule-text">${escapeHtml(schedule)}</span>
        <span class="status-badge ${status.level}">${status.icon} ${escapeHtml(status.label)}</span>
        <span class="next-date">Next parking restriction starts ${escapeHtml(nextDateText)}</span>
      </div>
      <div class="street-row-alert-cell">
        <input type="checkbox" class="alert-checkbox sweeping-checkbox" data-id="${street.main_id}" data-type="sweeping" ${hasSweeping ? "checked" : ""}>
      </div>
    </div>
  `;
}

function formatSideText(side) {
  if (!side) return "";
  const sideLower = side.toLowerCase();
  if (sideLower === "both") return "Both sides";
  if (sideLower === "odd") return "Odd side";
  if (sideLower === "even") return "Even side";
  return side + " side";
}

// ============================================
// SAVED STREETS / DASHBOARD
// ============================================

function renderSavedStreets() {
  const container = document.getElementById("saved-streets");

  if (savedStreets.length === 0) {
    container.innerHTML =
      '<p class="empty-state">No saved notifications yet. Search for a street and select alert types to add it here.</p>';
    return;
  }

  // Load notification preferences
  const notifyPrefs = loadNotificationPrefs();

  // Sort by status urgency (danger first, then warning, then safe)
  const streetsWithStatus = savedStreets.map((street) => ({
    street,
    status: calculateStatus(street),
  }));

  streetsWithStatus.sort((a, b) => {
    const order = { danger: 0, warning: 1, safe: 2 };
    return order[a.status.level] - order[b.status.level];
  });

  // Notification preferences panel
  let html = `
    <div class="notification-prefs-panel">
      <h3 class="notification-prefs-title">Notification Preferences</h3>
      <div class="notification-prefs-methods">
        <div class="notification-pref-item ${notifyPrefs.email ? "active" : ""}">
          <input type="checkbox" id="pref-email" ${notifyPrefs.email ? "checked" : ""}>
          <label for="pref-email">Email</label>
        </div>
        <div class="notification-pref-item ${notifyPrefs.text ? "active" : ""}">
          <input type="checkbox" id="pref-text" ${notifyPrefs.text ? "checked" : ""}>
          <label for="pref-text">Text Message</label>
        </div>
        <div class="notification-pref-item ${notifyPrefs.push ? "active" : ""}">
          <input type="checkbox" id="pref-push" ${notifyPrefs.push ? "checked" : ""}>
          <label for="pref-push">Push Notification</label>
        </div>
      </div>
      <div class="notification-prefs-save">
        <button id="update-prefs-btn" class="notification-prefs-save-btn">${editModeEnabled ? "Save Preferences" : "Update Preferences"}</button>
      </div>
    </div>
  `;

  // Streets table
  html += `
    <div class="results-table saved-table">
      <div class="results-table-header saved-header">
        <span>Street</span>
        <span>Schedule</span>
        <span>Status</span>
        <span>Alerts</span>
      </div>
  `;

  streetsWithStatus.forEach(({ street, status }) => {
    html += renderSavedStreetRow(street, status);
  });

  html += "</div>";

  container.innerHTML = html;

  // Add event listeners to alert checkboxes
  container.querySelectorAll(".alert-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleSavedAlertCheckboxChange);
  });

  // Add event listener to update/save preferences button
  document.getElementById("update-prefs-btn").addEventListener("click", () => {
    if (!editModeEnabled) {
      // Enter edit mode
      editModeEnabled = true;
      renderSavedStreets();
    } else {
      // Save and exit edit mode — apply pending removals
      if (pendingRemovals.size > 0) {
        savedStreets = savedStreets.filter(
          (s) => !pendingRemovals.has(s.main_id),
        );
        pendingRemovals.clear();
      }
      const newPrefs = {
        email: document.getElementById("pref-email").checked,
        text: document.getElementById("pref-text").checked,
        push: document.getElementById("pref-push").checked,
      };
      saveNotificationPrefs(newPrefs);
      saveSavedStreets();
      editModeEnabled = false;
      showToast("Notification preferences saved!");
      renderSavedStreets();
    }
  });

  updateAlertBadge();
}

function renderSavedStreetRow(street, status) {
  const sideText = formatSideText(street.side);
  const hasSweeping = street.alertSweeping !== false;
  const schedule = formatSchedule(street);

  // Get next sweeping date
  const nextSweeping = calculateNextSweeping(street, getCurrentDate());
  const nextDateText = nextSweeping
    ? formatDateTime(nextSweeping.start)
    : "No upcoming";

  const segmentText =
    street.from && street.to
      ? `${street.from} to ${street.to}`
      : street.from
        ? `From ${street.from}`
        : street.to
          ? `To ${street.to}`
          : "";

  const statusClass = status.level;
  const statusText = status.label;

  const disabledAttr = editModeEnabled ? "" : "disabled";
  const lockedClass = editModeEnabled ? "" : "checkbox-locked";

  return `
    <div class="street-row saved-row status-${statusClass}" data-id="${street.main_id}">
      <div class="street-row-info">
        <span class="street-row-name" data-side="${sideText}">${escapeHtml(street.st_name)}</span>
        <span class="street-row-segment">${escapeHtml(segmentText)}</span>
      </div>
      <div class="street-row-schedule">
        <span class="schedule-text">${escapeHtml(schedule)}</span>
      </div>
      <div class="street-row-status status-${statusClass}">
        <span class="status-badge ${statusClass}">${status.icon} ${escapeHtml(statusText)}</span>
        <span class="next-date-status">Next: ${escapeHtml(nextDateText)}</span>
      </div>
      <div class="street-row-alert-cell ${lockedClass}">
        <input type="checkbox" class="alert-checkbox sweeping-checkbox" data-id="${street.main_id}" data-type="sweeping" ${hasSweeping ? "checked" : ""} ${disabledAttr}>
      </div>
    </div>
  `;
}

function handleSavedAlertCheckboxChange(e) {
  const mainId = e.target.dataset.id;
  const isChecked = e.target.checked;

  if (editModeEnabled) {
    // In edit mode, defer removal — just mark/unmark visually
    const row = e.target.closest(".street-row");
    if (!isChecked) {
      pendingRemovals.add(mainId);
      row.classList.add("pending-removal");
    } else {
      pendingRemovals.delete(mainId);
      row.classList.remove("pending-removal");
    }
  } else {
    const savedStreet = savedStreets.find((s) => s.main_id === mainId);
    if (!savedStreet) return;
    savedStreet.alertSweeping = isChecked;
    saveSavedStreets();
    updateAlertBadge();
  }
}

function updateAlertBadge() {
  const badge = document.getElementById("alert-badge");
  const hasAlert = savedStreets.some((street) => {
    const status = calculateStatus(street);
    return status.level === "warning" || status.level === "danger";
  });

  badge.style.display = hasAlert ? "inline-flex" : "none";
}

// ============================================
// STREET CARD RENDERING
// ============================================

// ============================================
// SCHEDULE FORMATTING
// ============================================

function formatSchedule(street) {
  const time = formatTimeRange(street.start_time, street.end_time);

  // Check if every day
  if (street.every_day === "t") {
    return `Every day, ${time}`;
  }

  // Get active days
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const activeDays = dayKeys
    .map((key, index) => (street[key] === "t" ? dayNames[index] : null))
    .filter(Boolean);

  // Get active weeks
  const weekOrdinals = ["1st", "2nd", "3rd", "4th", "5th"];
  const weekKeys = ["week_1", "week_2", "week_3", "week_4", "week_5"];
  const activeWeeks = weekKeys
    .map((key, index) => (street[key] === "t" ? weekOrdinals[index] : null))
    .filter(Boolean);

  // Check if all weeks are active
  const allWeeks =
    activeWeeks.length === 5 ||
    (street.week_1 === "t" &&
      street.week_2 === "t" &&
      street.week_3 === "t" &&
      street.week_4 === "t");

  // Format the schedule
  let scheduleText = "";

  if (activeDays.length === 0) {
    return "No schedule available";
  }

  if (activeDays.length === 7) {
    scheduleText = "Every day";
  } else if (activeDays.length === 1) {
    const dayName = activeDays[0];
    if (allWeeks) {
      scheduleText = `Every ${dayName}`;
    } else {
      scheduleText = `${activeWeeks.join(" & ")} ${dayName}${activeWeeks.length > 1 ? "s" : ""}`;
    }
  } else {
    // Multiple days
    const dayList =
      activeDays.length === 2
        ? activeDays.join(" & ")
        : activeDays.slice(0, -1).join(", ") +
          " & " +
          activeDays[activeDays.length - 1];

    if (allWeeks) {
      scheduleText = `Every ${dayList}`;
    } else {
      scheduleText = `${activeWeeks.join(" & ")} week${activeWeeks.length > 1 ? "s" : ""}: ${dayList}`;
    }
  }

  return `${scheduleText}, ${time}`;
}

function formatTimeRange(startTime, endTime) {
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return minutes === 0
      ? `${displayHours} ${period}`
      : `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const start = formatTime(startTime);
  const end = formatTime(endTime);

  if (start && end) {
    return `${start} - ${end}`;
  }
  return start || end || "";
}

// ============================================
// DATE CALCULATION
// ============================================

function getCurrentDate() {
  return simulatedDate || new Date();
}

function calculateStatus(street) {
  const now = getCurrentDate();
  const nextSweeping = calculateNextSweeping(street, now);

  if (!nextSweeping) {
    return {
      level: "safe",
      icon: "✓",
      label: "Safe to park",
      detail: "No sweeping schedule found",
    };
  }

  const hoursUntil = (nextSweeping.start - now) / (1000 * 60 * 60);
  const endTime = nextSweeping.end;

  // Check if sweeping is currently happening
  if (now >= nextSweeping.start && now <= endTime) {
    return {
      level: "danger",
      icon: "!",
      label: "Move your car now",
      detail: `Sweeping in progress until ${formatDateTime(endTime)}`,
    };
  }

  // Within 2 hours
  if (hoursUntil <= 2 && hoursUntil > 0) {
    return {
      level: "danger",
      icon: "!",
      label: "Move your car now",
      detail: `Sweeping starts ${formatDateTime(nextSweeping.start)}`,
    };
  }

  // Within 24 hours
  if (hoursUntil <= 24 && hoursUntil > 0) {
    return {
      level: "warning",
      icon: "!",
      label: "Move soon",
      detail: `Sweeping ${formatDateTime(nextSweeping.start)}`,
    };
  }

  // More than 24 hours away
  return {
    level: "safe",
    icon: "✓",
    label: "Safe to park",
    detail: `Next sweeping ${formatDateTime(nextSweeping.start)}`,
  };
}

function calculateNextSweeping(street, fromDate) {
  const dayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const weekKeys = ["week_1", "week_2", "week_3", "week_4", "week_5"];

  // Get active days (0-6, Sunday-Saturday)
  const activeDays = dayKeys
    .map((key, index) => (street[key] === "t" ? index : null))
    .filter((val) => val !== null);

  // Get active weeks (1-5)
  const activeWeeks = weekKeys
    .map((key, index) => (street[key] === "t" ? index + 1 : null))
    .filter((val) => val !== null);

  // Handle every_day flag
  const isEveryDay = street.every_day === "t";

  if (activeDays.length === 0 && !isEveryDay) {
    return null;
  }

  // Parse times
  const [startHour, startMin] = (street.start_time || "8:00")
    .split(":")
    .map(Number);
  const [endHour, endMin] = (street.end_time || "12:00").split(":").map(Number);

  // Search for next occurrence within the next 60 days
  const searchDays = 60;
  let checkDate = new Date(fromDate);

  for (let i = 0; i < searchDays; i++) {
    const dayOfWeek = checkDate.getDay();
    const weekOfMonth = getWeekOfMonth(checkDate);

    // Check if this day matches the schedule
    const dayMatches = isEveryDay || activeDays.includes(dayOfWeek);
    const weekMatches =
      activeWeeks.length === 0 || activeWeeks.includes(weekOfMonth);

    if (dayMatches && weekMatches) {
      // Create the sweeping start time for this date
      const sweepingStart = new Date(checkDate);
      sweepingStart.setHours(startHour, startMin, 0, 0);

      const sweepingEnd = new Date(checkDate);
      sweepingEnd.setHours(endHour, endMin, 0, 0);

      // Handle overnight sweeping (end time is next day)
      if (endHour < startHour) {
        sweepingEnd.setDate(sweepingEnd.getDate() + 1);
      }

      // If this sweeping hasn't ended yet, return it
      if (sweepingEnd > fromDate) {
        return { start: sweepingStart, end: sweepingEnd };
      }
    }

    // Move to next day
    checkDate.setDate(checkDate.getDate() + 1);
    checkDate.setHours(0, 0, 0, 0);
  }

  return null;
}

function getWeekOfMonth(date) {
  // Find which occurrence of this weekday it is in the month
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  // Count how many of this weekday have occurred before this date in the month
  let count = 0;
  for (let d = 1; d <= dayOfMonth; d++) {
    const checkDate = new Date(date.getFullYear(), date.getMonth(), d);
    if (checkDate.getDay() === dayOfWeek) {
      count++;
    }
  }

  return count;
}

function formatDateTime(date) {
  const now = getCurrentDate();
  const isToday = date.toDateString() === now.toDateString();

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `today at ${timeStr}`;
  } else if (isTomorrow) {
    return `tomorrow at ${timeStr}`;
  } else {
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return `${dateStr} at ${timeStr}`;
  }
}

// ============================================
// DEMO MODE
// ============================================

function setupDemoMode() {
  const header = document.querySelector(".header");
  const demoPanel = document.getElementById("demo-panel");
  const closeBtn = document.getElementById("close-demo");
  const applyBtn = document.getElementById("apply-demo");
  const resetBtn = document.getElementById("reset-demo");
  const dateInput = document.getElementById("demo-date");
  const timeInput = document.getElementById("demo-time");

  // Triple-tap header to show demo panel
  let tapCount = 0;
  let tapTimeout;

  header.addEventListener("click", () => {
    tapCount++;
    clearTimeout(tapTimeout);

    if (tapCount >= 3) {
      demoPanel.style.display = "block";
      tapCount = 0;

      // Set current values
      const now = getCurrentDate();
      dateInput.value = now.toISOString().split("T")[0];
      timeInput.value = now.toTimeString().slice(0, 5);
    }

    tapTimeout = setTimeout(() => {
      tapCount = 0;
    }, 500);
  });

  closeBtn.addEventListener("click", () => {
    demoPanel.style.display = "none";
  });

  applyBtn.addEventListener("click", () => {
    const dateVal = dateInput.value;
    const timeVal = timeInput.value;

    if (dateVal && timeVal) {
      simulatedDate = new Date(`${dateVal}T${timeVal}`);
      renderSavedStreets();
      updateAlertBadge();
    }
  });

  resetBtn.addEventListener("click", () => {
    simulatedDate = null;
    const now = new Date();
    dateInput.value = now.toISOString().split("T")[0];
    timeInput.value = now.toTimeString().slice(0, 5);
    renderSavedStreets();
    updateAlertBadge();
  });
}

// ============================================
// UTILITIES
// ============================================

function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
