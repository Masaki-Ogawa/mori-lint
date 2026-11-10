import { ParsedDoc } from "../parse";
import { ResolvedPreset } from "../presets";
import { Finding, Severity } from "../types";

export interface RuleContext {
  preset: ResolvedPreset;
  absoluteTermsJa: string[];
  absoluteTermsEn: string[];
}

export type RuleCheck = (doc: ParsedDoc, ctx: RuleContext) => Finding[];

export function makeFinding(
  ruleId: string,
  ruleName: string,
  severity: Severity,
  line: number,
  message: string,
  excerpt?: string
): Finding {
  return { ruleId, ruleName, severity, line, message, excerpt };
}
