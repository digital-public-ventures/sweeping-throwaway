#!/usr/bin/env node
/**
 * Precompute SAM intersection coordinates for every distinct
 * (street-sweeping street, CSV from/to cross street) pair.
 *
 * Default rate: 50 requests/minute, sequential. At the current CSV size
 * (~3,481 requests excluding Dead End), a full run takes about 70 minutes
 * before retries.
 *
 * Usage:
 *   node scripts/precompute-sam-intersections.mjs
 *   node scripts/precompute-sam-intersections.mjs --limit 10
 *   node scripts/precompute-sam-intersections.mjs --rpm 30 --out temp/sam-cross-street-points.csv
 *   node scripts/precompute-sam-intersections.mjs --log temp/sam-cross-street-points.attempts.csv
 *   node scripts/precompute-sam-intersections.mjs --retry-failed
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const SAM_API = "https://api.sam.boston.gov";

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

const OUTPUT_COLUMNS = [
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

const ATTEMPT_LOG_COLUMNS = [
  "logged_at",
  "normalized_street",
  "normalized_cross",
  "street",
  "cross",
  "query",
  "attempt",
  "outcome",
  "http_status",
  "response_ms",
  "match_count",
  "retry_after_header",
  "retry_delay_ms",
  "error",
];

function normalizeStreetName(str) {
  return (str || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => STREET_NAME_CANONICAL_MAP[word] || word)
    .join(" ");
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    csv: path.join(REPO, "street-sweeping.csv"),
    out: path.join(REPO, "temp", "sam-cross-street-points.csv"),
    log: null,
    rpm: 50,
    limit: null,
    retryFailed: false,
    includeDeadEnd: false,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--csv") opts.csv = path.resolve(args[++i]);
    else if (arg === "--out") opts.out = path.resolve(args[++i]);
    else if (arg === "--log") opts.log = path.resolve(args[++i]);
    else if (arg === "--rpm") opts.rpm = Number(args[++i]);
    else if (arg === "--limit") opts.limit = Number(args[++i]);
    else if (arg === "--retry-failed") opts.retryFailed = true;
    else if (arg === "--include-dead-end") opts.includeDeadEnd = true;
    else if (arg === "--dry-run") opts.dryRun = true;
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!Number.isFinite(opts.rpm) || opts.rpm <= 0) {
    throw new Error("--rpm must be a positive number");
  }
  if (opts.limit != null && (!Number.isFinite(opts.limit) || opts.limit < 1)) {
    throw new Error("--limit must be a positive number");
  }
  opts.log ??= opts.out.replace(/(\.csv)?$/i, ".attempts.csv");

  return opts;
}

function parseCsvRows(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]).map((h) => h.trim());
  return lines
    .slice(1)
    .map((line) => {
      const cols = parseCsvLine(line);
      const row = {};
      header.forEach((h, i) => {
        row[h] = cols[i]?.trim() ?? "";
      });
      return row;
    })
    .filter((row) => row.main_id && row.st_name);
}

function buildLookupPairs(rows, { includeDeadEnd }) {
  const pairs = new Map();

  for (const row of rows) {
    for (const field of ["from", "to"]) {
      const cross = row[field];
      if (!cross) continue;
      if (!includeDeadEnd && /dead end/i.test(cross)) continue;

      const normalizedStreet = normalizeStreetName(row.st_name);
      const normalizedCross = normalizeStreetName(cross);
      if (!normalizedStreet || !normalizedCross) continue;

      const key = `${normalizedStreet}|${normalizedCross}`;
      if (!pairs.has(key)) {
        pairs.set(key, {
          normalized_street: normalizedStreet,
          normalized_cross: normalizedCross,
          street: row.st_name,
          cross,
          query: `${row.st_name} and ${cross}`,
        });
      }
    }
  }

  return [...pairs.values()].sort(
    (a, b) =>
      a.normalized_street.localeCompare(b.normalized_street) ||
      a.normalized_cross.localeCompare(b.normalized_cross),
  );
}

function csvEscape(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function csvLine(record, columns = OUTPUT_COLUMNS) {
  return columns.map((col) => csvEscape(record[col])).join(",");
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

function readCompletedKeys(outPath, { retryFailed }) {
  if (!fs.existsSync(outPath)) return new Set();
  const lines = fs.readFileSync(outPath, "utf8").split(/\r?\n/).filter(Boolean);
  if (lines.length <= 1) return new Set();

  const header = parseCsvLine(lines[0]);
  const index = Object.fromEntries(header.map((name, i) => [name, i]));
  const done = new Set();

  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line);
    const status = cols[index.status] || "";
    if (retryFailed && status !== "ok") continue;
    done.add(`${cols[index.normalized_street]}|${cols[index.normalized_cross]}`);
  }

  return done;
}

function ensureOutput(outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  if (!fs.existsSync(outPath) || fs.statSync(outPath).size === 0) {
    fs.writeFileSync(outPath, `${OUTPUT_COLUMNS.join(",")}\n`);
  }
}

function ensureAttemptLog(logPath) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  if (!fs.existsSync(logPath) || fs.statSync(logPath).size === 0) {
    fs.writeFileSync(logPath, `${ATTEMPT_LOG_COLUMNS.join(",")}\n`);
  }
}

function writeAttemptLog(logPath, record) {
  fs.appendFileSync(logPath, `${csvLine(record, ATTEMPT_LOG_COLUMNS)}\n`);
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

async function fetchIntersection(pair, { logPath }) {
  const url = `${SAM_API}/intersection_lookup?intersection=${encodeURIComponent(
    pair.query,
  )}`;
  let lastError = "";
  let lastStatus = "";
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
      const retryAfterHeader = response.headers.get("retry-after") ?? "";

      if (response.ok) {
        const data = await response.json();
        const best = Array.isArray(data) ? data[0] : null;
        writeAttemptLog(logPath, {
          ...pair,
          logged_at: new Date().toISOString(),
          attempt,
          outcome: best ? "ok" : "no_match",
          http_status: response.status,
          response_ms: responseMs,
          match_count: Array.isArray(data) ? data.length : "",
          retry_after_header: retryAfterHeader,
          retry_delay_ms: 0,
          error: "",
        });
        return {
          ...pair,
          status: best ? "ok" : "no_match",
          match_count: Array.isArray(data) ? data.length : 0,
          matching_intersection_full: best?.matching_intersection_full ?? "",
          lng: best?.matching_intersection_x ?? "",
          lat: best?.matching_intersection_y ?? "",
          request_ms: Math.round(totalMs),
          attempts: attempt,
          http_status: response.status,
          error: "",
          fetched_at: new Date().toISOString(),
        };
      }

      lastError = `${response.status} ${response.statusText}`;
      const shouldRetry = [429, 500, 502, 503, 504].includes(response.status);
      const retryMs =
        shouldRetry && attempt < 4
          ? retryAfterMs(retryAfterHeader) ?? 1000 * 2 ** attempt
          : 0;
      writeAttemptLog(logPath, {
        ...pair,
        logged_at: new Date().toISOString(),
        attempt,
        outcome: shouldRetry && attempt < 4 ? "retry" : "error",
        http_status: response.status,
        response_ms: responseMs,
        match_count: "",
        retry_after_header: retryAfterHeader,
        retry_delay_ms: retryMs,
        error: lastError,
      });

      if (!shouldRetry) break;
      if (attempt >= 4) break;
      await sleep(retryMs);
    } catch (error) {
      const responseMs = Math.round(performance.now() - started);
      totalMs += responseMs;
      lastError = error?.message || String(error);
      const retryMs = attempt < 4 ? 1000 * 2 ** attempt : 0;
      writeAttemptLog(logPath, {
        ...pair,
        logged_at: new Date().toISOString(),
        attempt,
        outcome: attempt < 4 ? "retry" : "error",
        http_status: "",
        response_ms: responseMs,
        match_count: "",
        retry_after_header: "",
        retry_delay_ms: retryMs,
        error: lastError,
      });
      if (attempt < 4) await sleep(retryMs);
    }
  }

  return {
    ...pair,
    status: "error",
    match_count: "",
    matching_intersection_full: "",
    lng: "",
    lat: "",
    request_ms: Math.round(totalMs),
    attempts: 4,
    http_status: lastStatus,
    error: lastError,
    fetched_at: new Date().toISOString(),
  };
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h) return `${h}h ${m}m ${s}s`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
}

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);
  const rows = parseCsvRows(opts.csv);
  const pairs = buildLookupPairs(rows, opts);
  const completed = readCompletedKeys(opts.out, opts);
  let pending = pairs.filter(
    (pair) => !completed.has(`${pair.normalized_street}|${pair.normalized_cross}`),
  );

  if (opts.limit != null) pending = pending.slice(0, opts.limit);

  console.log(`Loaded ${rows.length} street-sweeping rows`);
  console.log(`Built ${pairs.length} distinct SAM intersection lookups`);
  console.log(`Already completed: ${completed.size}`);
  console.log(`Pending this run: ${pending.length}`);
  console.log(`Rate: ${opts.rpm} requests/minute (${intervalMs} ms between starts)`);
  console.log(`Output: ${opts.out}`);
  console.log(`Attempt log: ${opts.log}`);

  if (opts.dryRun) {
    console.log("\nFirst pending lookups:");
    for (const pair of pending.slice(0, 10)) console.log(`  ${pair.query}`);
    return;
  }

  ensureOutput(opts.out);
  ensureAttemptLog(opts.log);

  let ok = 0;
  let noMatch = 0;
  let errors = 0;
  const runStarted = Date.now();

  for (let i = 0; i < pending.length; i += 1) {
    const pair = pending[i];
    const requestStart = Date.now();
    const result = await fetchIntersection(pair, { logPath: opts.log });
    fs.appendFileSync(opts.out, `${csvLine(result)}\n`);

    if (result.status === "ok") ok += 1;
    else if (result.status === "no_match") noMatch += 1;
    else errors += 1;

    const done = i + 1;
    const elapsed = Date.now() - runStarted;
    const rate = done / Math.max(elapsed / 60000, 1 / 60000);
    const remainingMs = ((pending.length - done) / Math.max(rate, 0.001)) * 60000;
    console.log(
      `${done}/${pending.length} ${result.status.padEnd(8)} ${pair.query} ` +
        `(${result.request_ms} ms, attempts ${result.attempts}) ` +
        `ETA ${formatDuration(remainingMs)}`,
    );

    const nextStartDelay = intervalMs - (Date.now() - requestStart);
    if (i < pending.length - 1 && nextStartDelay > 0) {
      await sleep(nextStartDelay);
    }
  }

  console.log("\nDone");
  console.log(`  ok      : ${ok}`);
  console.log(`  no_match: ${noMatch}`);
  console.log(`  error   : ${errors}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
