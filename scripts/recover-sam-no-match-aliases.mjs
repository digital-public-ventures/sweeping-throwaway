#!/usr/bin/env node
/**
 * Recover SAM no_match rows whose CSV street names differ from SAM/ArcGIS
 * canonical names. Non-intersection sentinels are classified without an API
 * call; candidate aliases are queried against SAM ArcGIS layer 8 at --rpm.
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
  "recovery_status",
  "recovery_strategy",
  "recovery_query",
  "recovery_note",
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
  Saint: "St",
};

const EXACT_ALIASES = new Map([
  ["devine way", ["General William H Devine Way"]],
  ["gevena avenue", ["Geneva Ave"]],
  ["msgr jacobbe road", ["Monsignor Albert A Jacobbe Rd"]],
  ["thonrdike street", ["Thorndike St"]],
  ["yawkey way", ["Jersey St"]],
  ["willet street", ["Willett St"]],
  ["boxford street", ["Brookford St"]],
]);

const NON_STREET_TERMINALS = new Set([
  "end of street",
  "mbta",
  "sw corridor path",
  "susi yard",
]);

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: path.join(REPO, "temp", "sam-cross-street-points.complete.csv"),
    out: path.join(REPO, "temp", "sam-cross-street-points.alias-fills.csv"),
    rpm: 50,
  };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--input") opts.input = path.resolve(args[++i]);
    else if (arg === "--out") opts.out = path.resolve(args[++i]);
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

function normalize(name) {
  return String(name || "")
    .toLowerCase()
    .replace(/\bst\b/g, "street")
    .replace(/\bave\b/g, "avenue")
    .replace(/\brd\b/g, "road")
    .replace(/\bblvd\b/g, "boulevard")
    .replace(/\bln\b/g, "lane")
    .replace(/\bct\b/g, "court")
    .replace(/\bpl\b/g, "place")
    .replace(/\bter\b/g, "terrace")
    .replace(/\bsq\b/g, "square")
    .replace(/\s+/g, " ")
    .trim();
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
  variants.add(name.replace(/\bSaint\b/gi, "St"));
  variants.add(name.replace(/\s+/g, " ").trim());
  return [...variants].filter(Boolean);
}

function aliasVariants(name) {
  const key = normalize(name);
  return EXACT_ALIASES.get(key) || [];
}

function candidatePairs(row) {
  const streetNames = [row.street, ...aliasVariants(row.street)];
  const crossNames = [row.cross, ...aliasVariants(row.cross)];
  const pairs = [];
  for (const street of streetNames) {
    for (const cross of crossNames) {
      if (street !== row.street || cross !== row.cross) pairs.push({ street, cross });
    }
  }
  return pairs;
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

function classifyWithoutRequest(row) {
  const street = normalize(row.street);
  const cross = normalize(row.cross);
  if (street === cross) return { status: "skipped", strategy: "self_reference" };
  if (cross.includes("town line") || cross === "brookline line") {
    return { status: "skipped", strategy: "municipal_boundary" };
  }
  if (NON_STREET_TERMINALS.has(cross)) {
    return { status: "skipped", strategy: "non_street_terminal" };
  }
  return null;
}

async function arcgisLookup(street, cross) {
  const params = new URLSearchParams({
    f: "json",
    where: buildWhere(street, cross),
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
    http_status: response.status,
    error: "",
  };
}

function toOutput(row, result, recovery) {
  return {
    ...row,
    status: result.status,
    match_count: result.match_count,
    matching_intersection_full: result.matching_intersection_full,
    lng: result.lng,
    lat: result.lat,
    request_ms: result.request_ms,
    attempts: result.attempts || 1,
    http_status: result.http_status,
    error: result.error,
    fetched_at: new Date().toISOString(),
    recovery_status: recovery.status,
    recovery_strategy: recovery.strategy,
    recovery_query: recovery.query || "",
    recovery_note: recovery.note || "",
    source_key: `${row.normalized_street}|${row.normalized_cross}`,
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);
  const allRows = readCsv(opts.input);
  const rows = allRows.filter((row) => row.status === "no_match");
  const successfulRowsByPair = new Map();
  for (const row of allRows) {
    if (row.status !== "ok" || !row.lng || !row.lat) continue;
    const key = `${normalize(row.street)}|${normalize(row.cross)}`;
    const reverseKey = `${normalize(row.cross)}|${normalize(row.street)}`;
    successfulRowsByPair.set(key, row);
    successfulRowsByPair.set(reverseKey, row);
  }
  fs.mkdirSync(path.dirname(opts.out), { recursive: true });
  fs.writeFileSync(opts.out, `${OUTPUT_COLUMNS.join(",")}\n`);

  const stats = {
    recovered: 0,
    no_match: 0,
    skipped: 0,
    error: 0,
    requested: 0,
  };

  console.log(`No-match candidates: ${rows.length}`);
  console.log(`Rate: ${opts.rpm} requests/minute (${intervalMs} ms between starts)`);
  console.log(`Output: ${opts.out}`);

  for (const row of rows) {
    const classification = classifyWithoutRequest(row);
    if (classification) {
      stats.skipped += 1;
      const result = {
        status: "no_match",
        match_count: 0,
        matching_intersection_full: "",
        lng: "",
        lat: "",
        request_ms: 0,
        attempts: 0,
        http_status: "",
        error: "",
      };
      fs.appendFileSync(
        opts.out,
        `${csvLine(toOutput(row, result, classification), OUTPUT_COLUMNS)}\n`,
      );
      console.log(`skip     ${row.query} (${classification.strategy})`);
      continue;
    }

    const pairs = candidatePairs(row);
    if (pairs.length === 0) {
      stats.no_match += 1;
      const result = {
        status: "no_match",
        match_count: 0,
        matching_intersection_full: "",
        lng: "",
        lat: "",
        request_ms: 0,
        attempts: 0,
        http_status: "",
        error: "",
      };
      fs.appendFileSync(
        opts.out,
        `${csvLine(
          toOutput(row, result, {
            status: "no_match",
            strategy: "no_alias_candidate",
            note: "No deterministic alias configured",
          }),
          OUTPUT_COLUMNS,
        )}\n`,
      );
      console.log(`no_alias ${row.query}`);
      continue;
    }

    const reciprocal = pairs
      .map((pair) => ({
        pair,
        existing: successfulRowsByPair.get(`${normalize(pair.street)}|${normalize(pair.cross)}`),
      }))
      .find((candidate) => candidate.existing);
    if (reciprocal) {
      stats.recovered += 1;
      const existing = reciprocal.existing;
      const result = {
        status: "ok",
        match_count: existing.match_count || 1,
        matching_intersection_full: existing.matching_intersection_full,
        lng: existing.lng,
        lat: existing.lat,
        request_ms: 0,
        attempts: 0,
        http_status: "",
        error: "",
      };
      const recovery = {
        status: "recovered",
        strategy: "existing_reciprocal_alias",
        query: `${reciprocal.pair.street} and ${reciprocal.pair.cross}`,
        note: `Reused ${existing.query}`,
      };
      fs.appendFileSync(
        opts.out,
        `${csvLine(toOutput(row, result, recovery), OUTPUT_COLUMNS)}\n`,
      );
      console.log(
        `recovered ${row.query} ${existing.matching_intersection_full} (existing reciprocal)`,
      );
      continue;
    }

    let finalResult = null;
    let finalRecovery = null;
    for (const pair of pairs) {
      const requestStart = Date.now();
      stats.requested += 1;
      const result = await arcgisLookup(pair.street, pair.cross);
      const query = `${pair.street} and ${pair.cross}`;
      if (result.status === "ok") {
        finalResult = result;
        finalRecovery = {
          status: "recovered",
          strategy: "exact_alias_arcgis_layer8",
          query,
        };
        break;
      }
      if (result.status === "error") {
        finalResult = result;
        finalRecovery = {
          status: "error",
          strategy: "exact_alias_arcgis_layer8",
          query,
          note: result.error,
        };
        break;
      }
      finalResult = result;
      finalRecovery = {
        status: "no_match",
        strategy: "exact_alias_arcgis_layer8",
        query,
      };
      const delay = intervalMs - (Date.now() - requestStart);
      if (delay > 0) await sleep(delay);
    }

    if (finalRecovery.status === "recovered") stats.recovered += 1;
    else if (finalRecovery.status === "error") stats.error += 1;
    else stats.no_match += 1;

    fs.appendFileSync(
      opts.out,
      `${csvLine(toOutput(row, finalResult, finalRecovery), OUTPUT_COLUMNS)}\n`,
    );
    console.log(
      `${finalRecovery.status.padEnd(9)} ${row.query} ` +
        `${finalResult.matching_intersection_full || finalRecovery.note || ""}`,
    );

    const delay = intervalMs;
    if (delay > 0) await sleep(delay);
  }

  console.log("\nDone");
  for (const [key, value] of Object.entries(stats)) console.log(`  ${key}: ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
