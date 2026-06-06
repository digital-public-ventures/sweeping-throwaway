#!/usr/bin/env node
// Smoke test for the /lisboa map's client-side geocoding.
//
// It extracts the *actual* inline <script> from lisboa/index.html and runs it
// in a vm sandbox with a stubbed Leaflet + a MOCKED fetch. The mock returns the
// real, documented response shapes of the two geocoders so we verify the page's
// parsing/fallback/guard/cache logic without touching the network:
//
//   Nominatim  GET /search?format=jsonv2 -> JSON array; lat/lon are STRINGS;
//              no match -> [].
//   Photon     GET /api/?q=...           -> GeoJSON FeatureCollection;
//              geometry.coordinates is [lon, lat]; no match -> features: [].
//
// This does NOT verify the live endpoints, CORS, or geocoding accuracy — those
// only happen in a real browser. Run:  node scripts/geocode-smoke-test.mjs
import fs from "fs";
import vm from "vm";

const file = new URL("../lisboa/index.html", import.meta.url);
const html = fs.readFileSync(file, "utf8");
const code = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/)[1];

const markerByTitle = {};
const L = {
  map: () => ({ setView() { return this; }, on() { return this; }, fitBounds() { return this; } }),
  tileLayer: () => ({ addTo() { return this; } }),
  marker: (latlng, opts) => {
    const m = {
      _pos: latlng.slice(), title: opts.title,
      addTo() { return this; }, on() { return this; },
      setLatLng(ll) { this._pos = ll.slice(); },
    };
    markerByTitle[opts.title] = m;
    return m;
  },
  featureGroup: () => ({ getBounds: () => ({ pad: () => ({}) }) }),
};

let nominatimCalls = 0, photonCalls = 0;
const reply = (obj, ok = true, status = 200) =>
  Promise.resolve({ ok, status, json: () => Promise.resolve(obj) });

const fetch = (url) => {
  const u = new URL(url);
  const q = u.searchParams.get("q") || "";
  if (u.host.includes("nominatim")) {
    nominatimCalls++;
    if (q.includes("Vigário")) return reply([]); // miss -> Photon fallback
    if (q.includes("Grilo")) return reply([{ lat: "0.0", lon: "0.0", display_name: "Gulf of Guinea" }]); // out of bbox
    return reply([{ place_id: 1, lat: "38.7200000", lon: "-9.1400000", display_name: "…, Lisboa, Portugal" }]);
  }
  if (u.host.includes("photon")) {
    photonCalls++;
    if (q.includes("Vigário"))
      return reply({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "Point", coordinates: [-9.1281, 38.7119] }, properties: { name: "Gancho" } }] });
    return reply({ type: "FeatureCollection", features: [] });
  }
  return Promise.reject(new Error("unexpected host: " + u.host));
};

const store = {};
const statusEl = { textContent: "" };
const sandbox = {
  L, fetch, console, URL, URLSearchParams,
  document: {
    getElementById: (id) =>
      id === "geo-status" ? statusEl
        : { textContent: "", style: {}, set innerHTML(v) {}, addEventListener() {} },
  },
  localStorage: { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; } },
  // Run sleeps immediately; skip the 4s status-clear so we can assert on it.
  setTimeout: (fn, ms) => { if (typeof fn === "function" && (ms || 0) < 4000) queueMicrotask(fn); return 0; },
  window: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: "lisboa-inline.js" });

await new Promise((r) => setTimeout(r, 300)); // let async geocoding drain

const get = (t) => markerByTitle[t]?._pos;
const cache = JSON.parse(store["lisboa-geocode-v1"] || "{}");
const results = [];
const check = (name, cond, detail) => results.push([cond, name, detail]);

check("19 markers created", Object.keys(markerByTitle).length === 19, Object.keys(markerByTitle).length);
check("Nominatim string lat/lon parsed (Ramiro moved)", JSON.stringify(get("Cervejaria Ramiro")) === JSON.stringify([38.72, -9.14]), JSON.stringify(get("Cervejaria Ramiro")));
check("Photon [lon,lat] parsed via fallback (Gancho)", JSON.stringify(get("Gancho")) === JSON.stringify([38.7119, -9.1281]), JSON.stringify(get("Gancho")));
check("bbox guard rejected 0,0 (Bacalhau stays approx)", JSON.stringify(get("A Casa do Bacalhau")) === JSON.stringify([38.7296, -9.1078]), JSON.stringify(get("A Casa do Bacalhau")));
check("cache holds 18 (19 minus the rejected one)", Object.keys(cache).length === 18, Object.keys(cache).length);
check("Photon called once (single Nominatim miss)", photonCalls === 1, "photon=" + photonCalls);
check("all 19 addresses tried Nominatim first", nominatimCalls === 19, "nominatim=" + nominatimCalls);
check("status reports a refined count", /refined/.test(statusEl.textContent), JSON.stringify(statusEl.textContent));

console.log("\n  RESULT  TEST");
for (const [ok, name, detail] of results)
  console.log("  " + (ok ? "PASS" : "FAIL").padEnd(6) + "  " + name + (detail !== undefined ? "  [" + detail + "]" : ""));
const failed = results.filter((r) => !r[0]).length;
console.log("\n  " + (failed ? failed + " FAILED" : "ALL PASSED") + `   (nominatim=${nominatimCalls}, photon=${photonCalls})\n`);
process.exit(failed ? 1 : 0);
