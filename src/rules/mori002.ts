import { titleMatches } from "../parse";
import { RuleCheck, makeFinding } from "./context";

// MORI002: a required section of the preset is missing
export const checkMori002: RuleCheck = (doc, ctx) => {
  const findings = [];
  for (const req of ctx.preset.requiredSections) {
    const exists = doc.sections.some((s) => titleMatches(s.title, req.aliases));
    if (!exists) {
      const enName =
        req.aliases.find((a) => /^[\x00-\x7F]+$/.test(a)) ?? req.name;
      findings.push(
        makeFinding(
          "MORI002",
          "missing-required-section",
          "error",
          1,
          ctx.lang === "en"
            ? `Required section "${enName}" does not exist as a heading. Add the section, and give a reason even when it is empty.`
            : `必須欄「${req.name}」が見出しとして存在しません。欄を追加し、中身がない場合も理由を書いてください。`
        )
      );
    }
  }
  return findings;
};
