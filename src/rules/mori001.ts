import { RuleCheck, makeFinding } from "./context";

const NEGATION_RE = /ではありません|ではない|じゃありません|\bnot\b|n't\b/i;

// MORI001: absolute / overconfident claims (negated sentences are excluded)
export const checkMori001: RuleCheck = (doc, ctx) => {
  const en = ctx.lang === "en";
  const findings = [];
  for (const sentence of doc.sentences) {
    const text = sentence.text;
    if (NEGATION_RE.test(text)) continue;
    let hit: string | null = null;
    for (const term of ctx.absoluteTermsJa) {
      if (text.includes(term)) {
        hit = term;
        break;
      }
    }
    if (!hit) {
      const lower = text.toLowerCase();
      for (const term of ctx.absoluteTermsEn) {
        const re = new RegExp(`\\b${term.replace(/\s+/g, "\\s+")}\\b`, "i");
        if (re.test(lower)) {
          hit = term;
          break;
        }
      }
    }
    if (hit) {
      findings.push(
        makeFinding(
          "MORI001",
          "absolute-claim",
          "warn",
          sentence.line,
          en
            ? `Absolute claim "${hit}". State the grounds for the claim, or add the limits (scope, detection interval, remaining open questions).`
            : `絶対表現「${hit}」があります。断定の根拠を書くか、留保を併記してください。`,
          text
        )
      );
    }
  }
  return findings;
};
