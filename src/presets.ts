import { MoriConfig, RuleSetting, SectionRequirement } from "./types";

export const ABSOLUTE_TERMS_JA = [
  "完全に",
  "絶対に",
  "絶対",
  "完璧",
  "必ず",
  "問題ありません",
  "問題なし",
  "間違いなく",
  "100%",
  "１００％",
  "盤石",
  "鉄壁",
  // Intensifiers and exaggerated rhetoric (patterns observed in real agent reports)
  "極めて",
  "劇的",
  "重大",
  "大幅",
  "脆弱",
];

export const ABSOLUTE_TERMS_EN = [
  "perfectly",
  "completely",
  "absolutely",
  "guaranteed",
  "guarantee",
  "no issues",
  "no problem",
  "problem-free",
  "all done",
  "flawless",
  "flawlessly",
  "always",
  "definitely",
  "certainly",
  "undoubtedly",
  "entirely",
  "never fails",
  "zero risk",
  "risk-free",
  "infallible",
  "bulletproof",
];

const UNVERIFIED: SectionRequirement = {
  name: "未確認事項",
  aliases: ["未確認事項", "未確認", "Unverified items", "Unverified", "Open questions"],
};
const ASSUMPTIONS: SectionRequirement = {
  name: "前提",
  aliases: ["前提", "前提条件", "Assumptions", "Assumption", "Premises"],
};
const DOWNSIDE: SectionRequirement = {
  name: "弱気シナリオ・リスク試算",
  aliases: [
    "弱気シナリオ・リスク試算",
    "弱気シナリオ",
    "リスク試算",
    "Downside scenario",
    "Downside",
    "Bear case",
  ],
};

export interface ResolvedPreset {
  name: string;
  requiredSections: SectionRequirement[];
  rules: Record<string, RuleSetting>;
}

const BASE_RULES: Record<string, RuleSetting> = {
  MORI001: "warn",
  MORI002: "error",
  MORI003: "warn",
  MORI004: "warn",
  MORI005: "warn",
  MORI006: "off",
  MORI007: "off",
};

export const PRESET_NAMES = ["generic", "coding", "research", "ops"] as const;

export function resolvePreset(
  presetName: string,
  config?: MoriConfig
): ResolvedPreset {
  const name = PRESET_NAMES.includes(presetName as (typeof PRESET_NAMES)[number])
    ? presetName
    : "generic";
  const rules: Record<string, RuleSetting> = { ...BASE_RULES };
  let requiredSections: SectionRequirement[] = [UNVERIFIED, ASSUMPTIONS];

  if (name === "coding") {
    requiredSections = [
      {
        name: "変更内容",
        aliases: ["変更内容", "変更点", "変更", "Changes", "What changed"],
      },
      {
        name: "検証結果",
        aliases: ["検証結果", "検証", "テスト結果", "Verification", "Tests", "Test results"],
      },
      UNVERIFIED,
    ];
    rules.MORI004 = "error";
  } else if (name === "research") {
    requiredSections = [
      {
        name: "出典",
        aliases: ["出典", "出典・根拠", "Sources", "References", "Source"],
      },
      UNVERIFIED,
      {
        name: "反対仮説または弱い点",
        aliases: ["反対仮説", "弱い点", "弱気シナリオ", "Counterargument", "Limitations", "Weak points"],
      },
    ];
    rules.MORI006 = "error";
  } else if (name === "ops") {
    requiredSections = [DOWNSIDE, UNVERIFIED, ASSUMPTIONS];
    rules.MORI007 = "warn";
  }

  if (config?.requiredSections) {
    const known = [UNVERIFIED, ASSUMPTIONS, DOWNSIDE];
    requiredSections = config.requiredSections.map((n) => {
      const found = known.find(
        (k) => k.name === n || k.aliases.includes(n)
      );
      return found ?? { name: n, aliases: [n] };
    });
  }
  if (config?.rules) {
    for (const [k, v] of Object.entries(config.rules)) {
      if (v === "error" || v === "warn" || v === "off") rules[k] = v;
    }
  }
  return { name, requiredSections, rules };
}

export const RISK_SECTION_ALIASES = [
  "弱気シナリオ",
  "リスク試算",
  "リスク",
  "Downside scenario",
  "Downside",
  "Bear case",
  "Risk",
];
