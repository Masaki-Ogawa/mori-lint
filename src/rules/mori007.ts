import { titleMatches } from "../parse";
import { RISK_SECTION_ALIASES } from "../presets";
import { RuleCheck, makeFinding } from "./context";

const NUMBER_RE = /[0-9０-９]/;

// MORI007: a risk / downside section with no numbers at all (on by default only in the ops preset)
export const checkMori007: RuleCheck = (doc) => {
  const findings = [];
  for (const section of doc.sections) {
    if (!titleMatches(section.title, RISK_SECTION_ALIASES)) continue;
    if (!NUMBER_RE.test(section.body)) {
      findings.push(
        makeFinding(
          "MORI007",
          "risk-without-amount",
          "warn",
          section.startLine,
          `欄「${section.title}」に金額・割合・件数・時間などの数値がありません。起きた場合の影響を数値で書いてください。`,
          section.body.split("\n")[0]
        )
      );
    }
  }
  return findings;
};
