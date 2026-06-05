#!/usr/bin/env node
/**
 * For remaining no_match rows, query ArcGIS layer 8 for all intersections on
 * the primary street and rank possible cross-street candidates. This is an
 * audit tool; it does not auto-fill guessed points.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const LAYER8 =
  "https://gisportal.boston.gov/arcgis/rest/services/SAM/Live_SAM_Address/FeatureServer/8/query";

const OUTPUT_COLUMNS = [
  "normalized_street",
  "normalized_cross",
  "street",
  "cross",
  "query",
  "candidate_rank",
  "candidate_intersection",
  "candidate_cross",
  "candidate_score",
  "candidate_reason",
  "lng",
  "lat",
  "request_ms",
  "http_status",
  "error",
  "fetched_at",
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
  Parkway: "Pkwy",
  Square: "Sq",
};

const DIRECTION_TO_ABBR = {
  East: "E",
  West: "W",
  North: "N",
  South: "S",
  Saint: "St",
};

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    input: path.join(REPO, "temp", "sam-cross-street-points.alias-fills.csv"),
    out: path.join(REPO, "temp", "sam-cross-street-points.no-match-candidates.csv"),
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

function csvLine(record) {
  return OUTPUT_COLUMNS.map((col) => csvEscape(record[col])).join(",");
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
    .replace(/\bsaint\b/g, "street")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(name) {
  return normalize(name)
    .split(/\s+/)
    .filter((token) => token && !["street", "avenue", "road", "lane", "place", "court", "terrace", "square"].includes(token));
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function similarity(a, b) {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.92;
  const leftTokens = new Set(tokens(left));
  const rightTokens = new Set(tokens(right));
  const overlap = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  const tokenScore = overlap / Math.max(1, Math.max(leftTokens.size, rightTokens.size));
  const editScore = 1 - levenshtein(left, right) / Math.max(left.length, right.length);
  return Math.max(tokenScore, editScore);
}

function scoreReason(inputCross, candidateCross) {
  const input = normalize(inputCross);
  const candidate = normalize(candidateCross);
  if (input === candidate) return "exact_normalized";
  if (input.includes(candidate) || candidate.includes(input)) return "contains";
  const inputTokens = new Set(tokens(input));
  const candidateTokens = new Set(tokens(candidate));
  const overlap = [...inputTokens].filter((token) => candidateTokens.has(token));
  if (overlap.length) return `token_overlap:${overlap.join("+")}`;
  return "edit_distance";
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
  variants.add(name.replace(/\s+/g, " ").trim());
  return [...variants].filter(Boolean);
}

function buildStreetWhere(street) {
  return streetVariants(street)
    .flatMap((variant) => [
      `FULL_STREET_NAME = ${sqlString(variant)}`,
      `FULL_STREET_NAME2 = ${sqlString(variant)}`,
    ])
    .filter((clause, index, clauses) => clauses.indexOf(clause) === index)
    .join(" OR ");
}

function otherStreet(feature, street) {
  const a = feature.attributes?.FULL_STREET_NAME || "";
  const b = feature.attributes?.FULL_STREET_NAME2 || "";
  const normalizedStreet = normalize(street);
  if (normalize(a) === normalizedStreet) return b;
  if (normalize(b) === normalizedStreet) return a;
  return normalize(a).includes(normalizedStreet) ? b : a;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function lookupStreetIntersections(street, intervalMs) {
  const params = new URLSearchParams({
    f: "json",
    where: buildStreetWhere(street),
    outFields:
      "FULL_STREET_NAME,FULL_STREET_NAME2,INTERSECTION_NAME,INTERSECTION_NAME_REVERSE",
    returnGeometry: "true",
    outSR: "4326",
    resultRecordCount: "2000",
  });
  let lastError = "";
  let totalMs = 0;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const started = performance.now();
    try {
      const response = await fetch(`${LAYER8}?${params}`, {
        headers: { Accept: "application/json" },
      });
      const requestMs = Math.round(performance.now() - started);
      totalMs += requestMs;
      if (!response.ok) {
        lastError = `${response.status} ${response.statusText}`;
        if ((response.status === 429 || response.status >= 500) && attempt < 3) {
          const retryAfter = Number(response.headers.get("retry-after"));
          await sleep(Number.isFinite(retryAfter) ? retryAfter * 1000 : intervalMs * attempt);
          continue;
        }
        return {
          status: "error",
          requestMs: totalMs,
          httpStatus: response.status,
          error: lastError,
          features: [],
        };
      }
      const data = await response.json();
      if (data.error) {
        lastError = data.error.message || JSON.stringify(data.error);
        return {
          status: "error",
          requestMs: totalMs,
          httpStatus: response.status,
          error: lastError,
          features: [],
        };
      }
      return {
        status: "ok",
        requestMs: totalMs,
        httpStatus: response.status,
        error: "",
        features: Array.isArray(data.features) ? data.features : [],
      };
    } catch (error) {
      totalMs += Math.round(performance.now() - started);
      lastError = error.message || String(error);
      if (attempt < 3) await sleep(intervalMs * attempt);
    }
  }
  return {
    status: "error",
    requestMs: totalMs,
    httpStatus: "",
    error: lastError,
    features: [],
  };
}

async function main() {
  const opts = parseArgs();
  const intervalMs = Math.ceil(60000 / opts.rpm);
  const rows = readCsv(opts.input).filter(
    (row) => row.recovery_status === "no_match" && row.recovery_strategy === "no_alias_candidate",
  );
  fs.mkdirSync(path.dirname(opts.out), { recursive: true });
  fs.writeFileSync(opts.out, `${OUTPUT_COLUMNS.join(",")}\n`);

  console.log(`Candidate audit rows: ${rows.length}`);
  console.log(`Rate: ${opts.rpm} requests/minute (${intervalMs} ms between starts)`);
  console.log(`Output: ${opts.out}`);

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const requestStart = Date.now();
    const result = await lookupStreetIntersections(row.street, intervalMs);
    if (result.status === "error") {
      fs.appendFileSync(
        opts.out,
        `${csvLine({
          ...row,
          candidate_rank: "",
          candidate_intersection: "",
          candidate_cross: "",
          candidate_score: "",
          candidate_reason: "",
          lng: "",
          lat: "",
          request_ms: result.requestMs,
          http_status: result.httpStatus,
          error: result.error,
          fetched_at: new Date().toISOString(),
        })}\n`,
      );
      console.log(`${i + 1}/${rows.length} error    ${row.query} ${result.error}`);
    } else {
      const candidates = result.features
        .map((feature) => {
          const cross = otherStreet(feature, row.street);
          return {
            feature,
            cross,
            score: similarity(row.cross, cross),
            reason: scoreReason(row.cross, cross),
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      if (candidates.length === 0) {
        fs.appendFileSync(
          opts.out,
          `${csvLine({
            ...row,
            candidate_rank: "",
            candidate_intersection: "",
            candidate_cross: "",
            candidate_score: "",
            candidate_reason: "no_intersections_for_primary_street",
            lng: "",
            lat: "",
            request_ms: result.requestMs,
            http_status: result.httpStatus,
            error: "",
            fetched_at: new Date().toISOString(),
          })}\n`,
        );
      }
      candidates.forEach((candidate, index) => {
        fs.appendFileSync(
          opts.out,
          `${csvLine({
            ...row,
            candidate_rank: index + 1,
            candidate_intersection:
              candidate.feature.attributes?.INTERSECTION_NAME ||
              `${candidate.feature.attributes?.FULL_STREET_NAME || ""} & ${candidate.feature.attributes?.FULL_STREET_NAME2 || ""}`,
            candidate_cross: candidate.cross,
            candidate_score: candidate.score.toFixed(3),
            candidate_reason: candidate.reason,
            lng: candidate.feature.geometry?.x ?? "",
            lat: candidate.feature.geometry?.y ?? "",
            request_ms: result.requestMs,
            http_status: result.httpStatus,
            error: "",
            fetched_at: new Date().toISOString(),
          })}\n`,
        );
      });
      const best = candidates[0];
      console.log(
        `${i + 1}/${rows.length} ${row.query} -> ` +
          `${best ? `${best.cross} (${best.score.toFixed(3)})` : "no primary street candidates"}`,
      );
    }
    const delay = intervalMs - (Date.now() - requestStart);
    if (i < rows.length - 1 && delay > 0) await sleep(delay);
  }

  console.log("Done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
