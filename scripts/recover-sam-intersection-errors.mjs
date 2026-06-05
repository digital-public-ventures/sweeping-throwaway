#!/usr/bin/env node
/**
 * Recover rows from temp/sam-cross-street-points.csv whose final status is
 * "error". Strategies:
 *   1. Retry the original SAM /intersection_lookup query.
 *   2. Retry the reversed query ("cross and street").
 *   3. Fill from an existing successful reciprocal row, if present.
 *
 * Writes a separate fills CSV so the original full-run output remains intact.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const SAM_API = "https://api.sam.boston.gov";

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

const FILL_COLUMNS = [
  ...INPUT_COLUMNS,
  "fill_strategy",
  "fill_query",
  "source_key",
];

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

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: path.join(REPO, "temp", "sam-cross-street-points.csv"),
    out: path.join(REPO, "temp", "sam-cross-street-points.fills.csv"),
    log: path.join(REPO, "temp", "sam-cross-street-points.fills.log"),
    rpm: 50,
  };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--input") opts.input = path.resolve(args[++i]);
    else if (arg === "--out") opts.out = path.resolve(args[++i]);
    else if (arg === "--log") opts.log = path.resolve(args[++i]);
    else if (arg === "--rpm") opts.rpm = Number(args[++i]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isFinite(opts.rpm) || opts.rpm <= 0) {
    throw new Error("--rpm must be a positive number");
  }
  return opts;
}

function normalizeStreetName(str) {
  return (str || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => STREET_NAME_CANONICAL_MAP[word] || word)
    .join(" ");
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

function ensureOutput(filePath, columns) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${columns.join(",")}\n`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function retryAfterMs(headerValue) {
  if (!headerValue) return null;
  const seconds = Number(headerValue);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const dateMs = Date.parse(headerValue);
  if (Number.isFinite(dateMs)) return Math.max(0, dateMs - Date.now());
  return null;
}

async function lookup(query) {
  const url = `${SAM_API}/intersection_lookup?intersection=${encodeURIComponent(query)}`;
  let lastStatus = "";
  let lastError = "";
  let totalMs = 0;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const started = performance.now();
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(30000),
      });
      const responseMs = Math.round(performance.now() - started);
      totalMs += responseMs;
      lastStatus = response.status;

      if (response.ok) {
        const data = await response.json();
        const best = Array.isArray(data) ? data[0] : null;
        return {
          ok: Boolean(best),
          status: best ? "ok" : "no_match",
          match_count: Array.isArray(data) ? data.length : 0,
          matching_intersection_full: best?.matching_intersection_full ?? "",
          lng: best?.matching_intersection_x ?? "",
          lat: best?.matching_intersection_y ?? "",
          request_ms: Math.round(totalMs),
          attempts: attempt,
          http_status: response.status,
          error: "",
        };
      }

      lastError = `${response.status} ${response.statusText}`;
      const shouldRetry = [429, 500, 502, 503, 504].includes(response.status);
      if (!shouldRetry || attempt >= 4) break;
      await sleep(retryAfterMs(response.headers.get("retry-after")) ?? 1000 * 2 ** attempt);
    } catch (error) {
      totalMs += Math.round(performance.now() - started);
      lastError = error?.message || String(error);
      if (attempt < 4) await sleep(1000 * 2 ** attempt);
    }
  }

  return {
    ok: false,
    status: "error",
    match_count: "",
    matching_intersection_full: "",
    lng: "",
    lat: "",
    request_ms: Math.round(totalMs),
    attempts: 4,
    http_status: lastStatus,
    error: lastError,
  };
}

function toFillRow(row, result, strategy, fillQuery, sourceKey = "") {
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
    fill_strategy: strategy,
    fill_query: fillQuery,
    source_key: sourceKey,
  };
}

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);
  const rows = readCsv(opts.input);
  const byKey = new Map(rows.map((r) => [`${r.normalized_street}|${r.normalized_cross}`, r]));
  const failures = rows.filter((r) => r.status === "error");

  ensureOutput(opts.out, FILL_COLUMNS);
  fs.writeFileSync(opts.log, "");

  console.log(`Failures to recover: ${failures.length}`);
  console.log(`Output: ${opts.out}`);
  console.log(`Log: ${opts.log}`);

  const stats = { retry_original: 0, retry_reversed: 0, reciprocal_existing: 0, unresolved: 0 };

  for (let i = 0; i < failures.length; i += 1) {
    const row = failures[i];
    const started = Date.now();
    let fill = null;

    const original = await lookup(row.query);
    fs.appendFileSync(opts.log, `${new Date().toISOString()} original ${row.query} ${original.status} ${original.http_status} ${original.error}\n`);
    if (original.ok) {
      fill = toFillRow(row, original, "retry_original", row.query);
      stats.retry_original += 1;
    }

    if (!fill) {
      const reversedQuery = `${row.cross} and ${row.street}`;
      const reversed = await lookup(reversedQuery);
      fs.appendFileSync(opts.log, `${new Date().toISOString()} reversed ${reversedQuery} ${reversed.status} ${reversed.http_status} ${reversed.error}\n`);
      if (reversed.ok) {
        fill = toFillRow(row, reversed, "retry_reversed", reversedQuery);
        stats.retry_reversed += 1;
      }
    }

    if (!fill) {
      const reciprocalKey = `${row.normalized_cross}|${row.normalized_street}`;
      const reciprocal = byKey.get(reciprocalKey);
      if (reciprocal?.status === "ok") {
        fill = toFillRow(
          row,
          {
            status: "ok",
            match_count: reciprocal.match_count,
            matching_intersection_full: reciprocal.matching_intersection_full,
            lng: reciprocal.lng,
            lat: reciprocal.lat,
            request_ms: 0,
            attempts: 0,
            http_status: "from_existing",
            error: "",
          },
          "reciprocal_existing",
          reciprocal.query,
          reciprocalKey,
        );
        stats.reciprocal_existing += 1;
        fs.appendFileSync(opts.log, `${new Date().toISOString()} reciprocal ${row.query} ok from ${reciprocal.query}\n`);
      }
    }

    if (!fill) {
      fill = {
        ...row,
        fill_strategy: "unresolved",
        fill_query: "",
        source_key: "",
        fetched_at: new Date().toISOString(),
      };
      stats.unresolved += 1;
    }

    fs.appendFileSync(opts.out, `${csvLine(fill, FILL_COLUMNS)}\n`);
    console.log(`${i + 1}/${failures.length} ${fill.fill_strategy.padEnd(20)} ${row.query}`);

    const delay = intervalMs - (Date.now() - started);
    if (i < failures.length - 1 && delay > 0) await sleep(delay);
  }

  console.log("\nDone");
  for (const [key, value] of Object.entries(stats)) console.log(`  ${key}: ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

