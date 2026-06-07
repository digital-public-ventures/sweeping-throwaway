#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const DEFAULT_CSV = new URL(
  "./timeout-lisbon-things-to-do.csv",
  import.meta.url,
);
const csvPath = process.argv[2]
  ? new URL(process.argv[2], `file://${process.cwd()}/`)
  : DEFAULT_CSV;

const LISBON_BBOX = {
  minLat: 38.6,
  maxLat: 38.85,
  minLng: -9.35,
  maxLng: -9.05,
};

const inLisbon = (lat, lng) =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat >= LISBON_BBOX.minLat &&
  lat <= LISBON_BBOX.maxLat &&
  lng >= LISBON_BBOX.minLng &&
  lng <= LISBON_BBOX.maxLng;

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const next = text[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        index++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows.map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index] || ""]),
    ),
  );
}

function quoteCsv(value) {
  const stringValue = value == null ? "" : String(value);
  if (!/[",\n\r]/.test(stringValue)) return stringValue;
  return `"${stringValue.replaceAll('"', '""')}"`;
}

function writeCsv(headers, rows) {
  return (
    [headers.join(",")]
      .concat(
        rows.map((row) =>
          headers.map((header) => quoteCsv(row[header])).join(","),
        ),
      )
      .join("\n") + "\n"
  );
}

function geocodeQuery(row) {
  const address = row.address?.trim();
  const area = row.neighborhood_or_area?.trim();
  const name = row.name?.trim();
  if (address && /lisboa|lisbon|portugal/i.test(address)) return address;
  if (address) return `${address}, Lisboa, Portugal`;
  return [name, area, "Lisboa, Portugal"].filter(Boolean).join(", ");
}

async function geocodeNominatim(query) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    limit: "1",
    countrycodes: "pt",
    viewbox: "-9.35,38.85,-9.05,38.6",
    bounded: "1",
  });
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "boston-prototype-lisboa-preflight/1.0",
      },
    },
  );
  if (!response.ok) throw new Error(`Nominatim ${response.status}`);
  const data = await response.json();
  if (!data.length) return null;
  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    provider: "Nominatim",
  };
}

async function geocodePhoton(query) {
  const params = new URLSearchParams({
    q: query,
    limit: "1",
    lat: "38.72",
    lon: "-9.14",
  });
  const response = await fetch(`https://photon.komoot.io/api/?${params}`);
  if (!response.ok) throw new Error(`Photon ${response.status}`);
  const data = await response.json();
  const coordinates = data.features?.[0]?.geometry?.coordinates;
  if (!coordinates) return null;
  return {
    lat: Number(coordinates[1]),
    lng: Number(coordinates[0]),
    provider: "Photon",
  };
}

async function geocode(query) {
  let hit = null;
  try {
    hit = await geocodeNominatim(query);
  } catch (error) {
    console.warn(`Nominatim failed for ${query}: ${error.message}`);
  }

  if (!hit) {
    try {
      hit = await geocodePhoton(query);
    } catch (error) {
      console.warn(`Photon failed for ${query}: ${error.message}`);
    }
  }

  if (!hit || !inLisbon(hit.lat, hit.lng)) return null;
  return hit;
}

const headersToEnsure = ["lat", "lng", "geocode_provider", "geocode_query"];
const text = await readFile(csvPath, "utf8");
const originalHeaders = text.split(/\r?\n/, 1)[0].split(",");
const headers = originalHeaders.concat(
  headersToEnsure.filter((header) => !originalHeaders.includes(header)),
);
const rows = parseCsv(text);

let updated = 0;
let skipped = 0;
let failed = 0;

for (const row of rows) {
  if (row.lat && row.lng) {
    skipped++;
    continue;
  }

  const query = geocodeQuery(row);
  row.geocode_query = query;
  console.log(`Geocoding: ${row.name} -> ${query}`);
  const hit = await geocode(query);
  if (hit) {
    row.lat = hit.lat.toFixed(6);
    row.lng = hit.lng.toFixed(6);
    row.geocode_provider = hit.provider;
    updated++;
  } else {
    failed++;
    console.warn(`No Lisbon geocode match: ${row.name}`);
  }

  await sleep(1100);
}

await writeFile(csvPath, writeCsv(headers, rows), "utf8");
console.log(`Done. updated=${updated} skipped=${skipped} failed=${failed}`);
