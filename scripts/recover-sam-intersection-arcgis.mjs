#!/usr/bin/env node
/**
 * Recover SAM /intersection_lookup error rows by querying the public ArcGIS
 * SAM intersection layer directly.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const LAYER8 =
  "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/8/query";

const INPUT_COLUMNS = [
  "normalized_street",
  "normalized_cross",
  "street",
  "cross",
  "query",
  "status",
  "match_count",
  "matching_intersection_full",
  "lng",
  "lat",
  "request_ms",
  "attempts",
  "http_status",
  "error",
  "fetched_at",
];

const OUTPUT_COLUMNS = [
  ...INPUT_COLUMNS,
  "fill_strategy",
  "fill_query",
  "source_key",
];

const SUFFIX_TO_ABBR = {
  Street: "St",
  Avenue: "Ave",
  Road: "Rd",
  Boulevard: "Blvd",
  Drive: "Dr",
  Lane: "Ln",
  Court: "Ct",
  Place: "Pl",
  Circle: "Cir",
  Terrace: "Ter",
  Highway: "Hwy",
  Parkway: "Pkwy",
  Square: "Sq",
};

const DIRECTION_TO_ABBR = {
  North: "N",
  South: "S",
  East: "E",
  West: "W",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: path.join(REPO, "temp", "sam-cross-street-points.csv"),
    out: path.join(REPO, "temp", "sam-cross-street-points.arcgis-fills.csv"),
    status: "error",
    rpm: 50,
  };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--input") opts.input = path.resolve(args[++i]);
    else if (arg === "--out") opts.out = path.resolve(args[++i]);
    else if (arg === "--status") opts.status = args[++i];
    else if (arg === "--rpm") opts.rpm = Number(args[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isFinite(opts.rpm) || opts.rpm <= 0) {
    throw new Error("--rpm must be a positive number");
  }
  return opts;
}

function parseCsvLine(line) {
  const values = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      values.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  values.push(cur);
  return values;
}

function readCsv(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(header.map((h, i) => [h, values[i] ?? ""]));
  });
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function csvLine(record, columns) {
  return columns.map((col) => csvEscape(record[col])).join(",");
}

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function streetVariants(name) {
  const variants = new Set([name]);
  for (const [long, abbr] of Object.entries(SUFFIX_TO_ABBR)) {
    variants.add(name.replace(new RegExp(`\\b${long}\\b`, "gi"), abbr));
  }
  for (const [long, abbr] of Object.entries(DIRECTION_TO_ABBR)) {
    variants.add(name.replace(new RegExp(`\\b${long}\\b`, "gi"), abbr));
  }
  variants.add(name.replace(/\bAv\b/gi, "Ave"));
  variants.add(name.replace(/\bAvenue\b/gi, "Ave"));
  variants.add(name.replace(/\bStreet\b/gi, "St"));
  variants.add(name.replace(/\bRoad\b/gi, "Rd"));
  variants.add(name.replace(/\s+/g, " ").trim());
  return [...variants].filter(Boolean);
}

function buildWhere(street, cross) {
  const clauses = [];
  for (const a of streetVariants(street)) {
    for (const b of streetVariants(cross)) {
      clauses.push(
        `(FULL_STREET_NAME = ${sqlString(a)} AND FULL_STREET_NAME2 = ${sqlString(b)})`,
        `(FULL_STREET_NAME = ${sqlString(b)} AND FULL_STREET_NAME2 = ${sqlString(a)})`,
        `INTERSECTION_NAME = ${sqlString(`${a} & ${b}`)}`,
        `INTERSECTION_NAME_REVERSE = ${sqlString(`${a} & ${b}`)}`,
      );
    }
  }
  return [...new Set(clauses)].join(" OR ");
}

async function arcgisLookup(row) {
  const params = new URLSearchParams({
    f: "json",
    where: buildWhere(row.street, row.cross),
    outFields:
      "FULL_STREET_NAME,FULL_STREET_NAME2,INTERSECTION_NAME,INTERSECTION_NAME_REVERSE",
    returnGeometry: "true",
    outSR: "4326",
  });
  const started = performance.now();
  const response = await fetch(`${LAYER8}?${params}`, {
    headers: { Accept: "application/json" },
  });
  const requestMs = Math.round(performance.now() - started);
  if (!response.ok) {
    return {
      status: "error",
      match_count: "",
      matching_intersection_full: "",
      lng: "",
      lat: "",
      request_ms: requestMs,
      attempts: 1,
      http_status: response.status,
      error: `${response.status} ${response.statusText}`,
    };
  }

  const data = await response.json();
  if (data.error) {
    return {
      status: "error",
      match_count: "",
      matching_intersection_full: "",
      lng: "",
      lat: "",
      request_ms: requestMs,
      attempts: 1,
      http_status: response.status,
      error: data.error.message || JSON.stringify(data.error),
    };
  }

  const features = Array.isArray(data.features) ? data.features : [];
  const best = features[0];
  if (!best) {
    return {
      status: "no_match",
      match_count: 0,
      matching_intersection_full: "",
      lng: "",
      lat: "",
      request_ms: requestMs,
      attempts: 1,
      http_status: response.status,
      error: "",
    };
  }

  return {
    status: "ok",
    match_count: features.length,
    matching_intersection_full:
      best.attributes?.INTERSECTION_NAME ||
      `${best.attributes?.FULL_STREET_NAME || ""} & ${best.attributes?.FULL_STREET_NAME2 || ""}`,
    lng: best.geometry?.x ?? "",
    lat: best.geometry?.y ?? "",
    request_ms: requestMs,
    attempts: 1,
    http_status: response.status,
    error: "",
  };
}

function toOutput(row, result) {
  return {
    normalized_street: row.normalized_street,
    normalized_cross: row.normalized_cross,
    street: row.street,
    cross: row.cross,
    query: row.query,
    status: result.status,
    match_count: result.match_count,
    matching_intersection_full: result.matching_intersection_full,
    lng: result.lng,
    lat: result.lat,
    request_ms: result.request_ms,
    attempts: result.attempts,
    http_status: result.http_status,
    error: result.error,
    fetched_at: new Date().toISOString(),
    fill_strategy: "arcgis_layer8",
    fill_query: "FULL_STREET_NAME/FULL_STREET_NAME2 variants",
    source_key: `${row.normalized_street}|${row.normalized_cross}`,
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);
  const rows = readCsv(opts.input);
  const failures = rows.filter((row) => row.status === opts.status);
  fs.mkdirSync(path.dirname(opts.out), { recursive: true });
  fs.writeFileSync(opts.out, `${OUTPUT_COLUMNS.join(",")}\n`);

  const stats = { ok: 0, no_match: 0, error: 0 };
  console.log(`ArcGIS recovery candidates (${opts.status}): ${failures.length}`);
  console.log(`Rate: ${opts.rpm} requests/minute (${intervalMs} ms between starts)`);
  console.log(`Output: ${opts.out}`);

  for (let i = 0; i < failures.length; i += 1) {
    const row = failures[i];
    const requestStart = Date.now();
    const result = await arcgisLookup(row);
    stats[result.status] += 1;
    fs.appendFileSync(opts.out, `${csvLine(toOutput(row, result), OUTPUT_COLUMNS)}\n`);
    console.log(
        `${i + 1}/${failures.length} ${result.status.padEnd(8)} ${row.query} ` +
        `${result.matching_intersection_full || result.error}`,
    );
    const delay = intervalMs - (Date.now() - requestStart);
    if (i < failures.length - 1 && delay > 0) await sleep(delay);
  }

  console.log("\nDone");
  for (const [key, value] of Object.entries(stats)) console.log(`  ${key}: ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
