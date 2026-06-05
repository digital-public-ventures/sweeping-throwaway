/**
 * Bare-minimum search smoke tests. Runs the real narrowing pipeline
 * (scripts/search-lib.mjs, a mirror of app.js) against a handful of known
 * addresses + one intersection and asserts the blocks returned.
 *
 * Hits the live SAM API, so it needs network and is a little slow.
 *   node --test scripts/search.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import { loadData, runSearch, distinctBlocks } from "./search-lib.mjs";

loadData();

const cases = [
  { q: "122 Commonwealth", blocks: ["Commonwealth Ave | Arlington St | Massachusetts Ave"] },
  {
    q: "1950 Commonwealth",
    blocks: [
      "Commonwealth Ave | Chestnut Hill Ave | St Thomas Moore Rd",
      "Commonwealth Ave | Lake St | Chestnut Hill Ave",
    ],
  },
  { q: "130 Newbury", blocks: ["Newbury St | Arlington St | Massachusetts Ave"] },
  { q: "268 Foster", blocks: ["Foster St | Washington St | Commonwealth Ave"] },
];

for (const { q, blocks } of cases) {
  test(`${q} → expected block(s)`, { timeout: 30000 }, async () => {
    assert.deepEqual(distinctBlocks(await runSearch(q)), blocks);
  });
}

// Regression: an intersection must return blocks for BOTH streets, including a
// street that isn't subdivided at the corner (Charles St spans Boylston→Nashua
// through Beacon). Before the fix only Beacon St came back.
test("Beacon & Charles → both streets present", { timeout: 30000 }, async () => {
  const rows = await runSearch("Beacon & Charles");
  const streets = new Set(rows.map((r) => r.st_name));
  assert.ok(streets.has("Beacon St"), "expected Beacon St blocks");
  assert.ok(streets.has("Charles St"), "expected Charles St block (the fix)");
  assert.ok(
    distinctBlocks(rows).includes("Charles St | Boylston St | Nashua St"),
    "expected the Charles St block that contains the corner",
  );
});
