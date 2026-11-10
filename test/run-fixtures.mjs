// Verifies each fixture's target rule (present / absent) against manifest.json.
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { lint } from "../dist/index.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(here, "fixtures");
const manifest = JSON.parse(
  fs.readFileSync(path.join(fixturesDir, "manifest.json"), "utf-8")
);

let passed = 0;
const failures = [];

for (const c of manifest.cases) {
  const text = fs.readFileSync(path.join(fixturesDir, c.file), "utf-8");
  const findings = lint(text, { preset: c.preset });
  const found = findings.some((f) => f.ruleId === c.targetRule);
  const expected = c.expect[c.targetRule] === "present";
  if (found === expected) {
    passed++;
  } else {
    failures.push(
      `${c.file}: ${c.targetRule} を ${expected ? "present" : "absent"} と期待したが ${found ? "present" : "absent"} だった` +
        (found
          ? ` / 検出内容: ${findings
              .filter((f) => f.ruleId === c.targetRule)
              .map((f) => f.message)
              .join(" | ")}`
          : ` / 全検出: ${findings.map((f) => f.ruleId).join(",") || "なし"}`)
    );
  }
}

console.log(`fixtures: ${passed}/${manifest.cases.length} passed`);
if (failures.length > 0) {
  for (const f of failures) console.log(`FAIL ${f}`);
  process.exit(1);
}
