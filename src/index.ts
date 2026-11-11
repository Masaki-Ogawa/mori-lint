import { Finding, Lang, LintOptions, MoriConfig, RULE_INFO } from "./types";
import { parseMarkdown } from "./parse";
import {
  ABSOLUTE_TERMS_EN,
  ABSOLUTE_TERMS_JA,
  resolvePreset,
} from "./presets";
import { RuleCheck } from "./rules/context";
import { checkMori001 } from "./rules/mori001";
import { checkMori002 } from "./rules/mori002";
import { checkMori003 } from "./rules/mori003";
import { checkMori004 } from "./rules/mori004";
import { checkMori005 } from "./rules/mori005";
import { checkMori006 } from "./rules/mori006";
import { checkMori007 } from "./rules/mori007";

export * from "./types";
export { parseMarkdown } from "./parse";

const RULE_CHECKS: Record<string, RuleCheck> = {
  MORI001: checkMori001,
  MORI002: checkMori002,
  MORI003: checkMori003,
  MORI004: checkMori004,
  MORI005: checkMori005,
  MORI006: checkMori006,
  MORI007: checkMori007,
};

/**
 * Lint a report (Markdown) and return the findings.
 * This does not judge factual correctness; it only checks whether the grounds are written in the text.
 */
export function detectLang(text: string): Lang {
  const jaChars = (text.match(/[\u3040-\u30ff\u4e00-\u9fff]/g) ?? []).length;
  const enChars = (text.match(/[A-Za-z]/g) ?? []).length;
  return enChars > 0 && enChars >= jaChars * 2 ? "en" : "ja";
}

export function lint(text: string, options: LintOptions = {}): Finding[] {
  const config: MoriConfig = options.config ?? {};
  const presetName = options.preset ?? config.preset ?? "generic";
  const preset = resolvePreset(presetName, config);
  const requested = options.lang ?? config.lang ?? "auto";
  const lang: Lang = requested === "auto" ? detectLang(text) : requested;
  const doc = parseMarkdown(text);

  const ctx = {
    preset,
    absoluteTermsJa: [
      ...ABSOLUTE_TERMS_JA,
      ...(config.dictionary?.absoluteTerms ?? []),
    ],
    absoluteTermsEn: [...ABSOLUTE_TERMS_EN],
    lang,
  };

  let findings: Finding[] = [];

  // A suppression without a reason is itself reported as a warning
  for (const sup of doc.suppressions) {
    if (!sup.hasReason) {
      findings.push({
        ruleId: "MORI000",
        ruleName: RULE_INFO.MORI000.name,
        severity: "warn",
        line: sup.line,
        message:
          lang === "en"
            ? "A suppression (mori-lint-disable) has no reason (reason:). Write the reason, or fix the text instead."
            : "抑制指定（mori-lint-disable）に理由（reason:）が書かれていません。理由を書くか、本文を直してください。",
      });
    }
  }

  for (const [ruleId, check] of Object.entries(RULE_CHECKS)) {
    const setting = preset.rules[ruleId];
    if (!setting || setting === "off") continue;
    const results = check(doc, ctx).map((f) => ({ ...f, severity: setting }));
    findings.push(...results);
  }

  // Suppression: disables the named rule for the next paragraph only
  if (doc.suppressions.length > 0) {
    findings = findings.filter((f) => {
      for (const sup of doc.suppressions) {
        if (sup.ruleId !== f.ruleId) continue;
        const para = doc.paragraphs.find((p) => p.startLine > sup.line);
        if (para && f.line >= para.startLine && f.line <= Math.max(para.endLine, para.blockEndLine)) {
          return false;
        }
      }
      return true;
    });
  }

  findings.sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
  return findings;
}
