import { RuleCheck, makeFinding } from "./context";

const ALL_RE = /全件|すべて|全て|\ball\b|\bevery\b/i;
const DENOMINATOR_RE =
  /(\d[\d,]*\s*件中\s*\d[\d,]*\s*件|\d[\d,]*\s*\/\s*\d[\d,]*|\d+\s+of\s+\d+)/i;

// MORI005: an "all / every" claim without a denominator (n of N); looks one sentence back and ahead
export const checkMori005: RuleCheck = (doc, ctx) => {
  const en = ctx.lang === "en";
  const findings = [];
  const sents = doc.sentences;
  for (let idx = 0; idx < sents.length; idx++) {
    if (!ALL_RE.test(sents[idx].text)) continue;
    const window = [sents[idx - 1]?.text ?? "", sents[idx].text, sents[idx + 1]?.text ?? ""].join(" ");
    if (!DENOMINATOR_RE.test(window)) {
      findings.push(
        makeFinding(
          "MORI005",
          "all-without-denominator",
          "warn",
          sents[idx].line,
          en
            ? 'The "all / every" claim has no denominator (n of N) in the surrounding sentences. State the total and the verified count.'
            : "「全件・すべて」の主張に分母（何件中何件か）が前後の文にありません。総数と確認済み件数を書いてください。",
          sents[idx].text
        )
      );
    }
  }
  return findings;
};
