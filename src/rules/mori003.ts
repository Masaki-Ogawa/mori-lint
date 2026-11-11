import { RuleCheck, makeFinding } from "./context";

const NONE_EXACT_RE = /^(なし|特になし|とくになし|N\/A|none|nothing)$/i;
const REASON_RE = /ため|ので|から|確認済み|確認した|理由/;
const EN_NONE_START_RE = /^(none|nothing|n\/a)\b/i;
const EN_REASON_RE = /because|since|checked|verified|confirmed|reviewed/i;

// MORI003: a section body is just "none" with no grounds given
export const checkMori003: RuleCheck = (doc, ctx) => {
  const en = ctx.lang === "en";
  const findings = [];
  for (const section of doc.sections) {
    const body = section.body.replace(/\s+/g, " ").trim();
    if (!body) continue;
    const stripped = body.replace(/[。.!！\s]/g, "");
    const isExactNone = NONE_EXACT_RE.test(stripped);
    const isShortNone =
      (body.length <= 12 &&
        /^(なし|特になし|とくになし|N\/A)/i.test(body) &&
        !REASON_RE.test(body)) ||
      (body.length <= 60 &&
        EN_NONE_START_RE.test(body) &&
        !EN_REASON_RE.test(body) &&
        !REASON_RE.test(body));
    if (isExactNone || isShortNone) {
      findings.push(
        makeFinding(
          "MORI003",
          "empty-none",
          "warn",
          section.startLine,
          en
            ? `Section "${section.title}" contains only "${body}", with no reason or grounds. Add how you checked, or the grounds.`
            : `欄「${section.title}」の本文が「${body}」だけで、理由や根拠が書かれていません。確認した方法や根拠を添えてください。`,
          body
        )
      );
    }
  }
  return findings;
};
