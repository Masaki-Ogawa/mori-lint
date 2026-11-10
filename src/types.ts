export type Severity = "error" | "warn";
export type RuleSetting = Severity | "off";

export interface Finding {
  ruleId: string;
  ruleName: string;
  severity: Severity;
  line: number;
  message: string;
  excerpt?: string;
}

export interface SectionRequirement {
  name: string;
  aliases: string[];
}

export interface MoriConfig {
  preset?: string;
  rules?: Record<string, RuleSetting>;
  requiredSections?: string[];
  dictionary?: {
    absoluteTerms?: string[];
  };
}

export interface LintOptions {
  preset?: string;
  config?: MoriConfig;
}

export interface RuleInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  fix: string;
}

export const RULE_INFO: Record<string, RuleInfo> = {
  MORI000: {
    id: "MORI000",
    name: "suppression-without-reason",
    title: "理由のない抑制指定",
    description: "mori-lint-disable の抑制指定に reason: が書かれていません。",
    fix: "抑制する理由を reason: の後に書いてください。理由を書けない場合は、本文を直す側を検討してください。",
  },
  MORI001: {
    id: "MORI001",
    name: "absolute-claim",
    title: "絶対表現",
    description: "「完全に」「絶対に」「問題ありません」などの絶対表現・断定表現を検出します。",
    fix: "断定の根拠を書くか、留保（検知間隔、対象範囲、残っている未確認事項）を併記してください。",
  },
  MORI002: {
    id: "MORI002",
    name: "missing-required-section",
    title: "必須欄の欠落",
    description: "プリセットが定める必須欄（未確認事項、前提など）が見出しとして存在しません。",
    fix: "不足している欄を追加してください。中身がない場合も、欄自体は置き「なし」と理由を書いてください。",
  },
  MORI003: {
    id: "MORI003",
    name: "empty-none",
    title: "根拠のない「なし」",
    description: "欄の本文が「なし」「特になし」「N/A」だけで、理由や根拠が書かれていません。",
    fix: "「なし」の後に、確認した方法や根拠を括弧書きなどで添えてください。",
  },
  MORI004: {
    id: "MORI004",
    name: "completion-without-evidence",
    title: "証跡のない完了宣言",
    description: "完了・デプロイ・修正などを述べる段落に、証跡（URL、ファイルパス、コミットハッシュ、実行結果、画像参照）がありません。",
    fix: "完了の証跡を同じ段落に添えてください。読み手が後から確かめられる形が目安です。",
  },
  MORI005: {
    id: "MORI005",
    name: "all-without-denominator",
    title: "分母のない全件主張",
    description: "「全件」「すべて」などの主張に、分母（何件中何件か）が前後の文に書かれていません。",
    fix: "総数と確認済み件数を「120件中120件」の形で書いてください。",
  },
  MORI006: {
    id: "MORI006",
    name: "number-without-basis",
    title: "根拠表示のない数字",
    description: "金額・割合・件数などの数字に、出典や計算式が同じ文と前後の文に書かれていません（researchプリセットでのみ初期有効）。",
    fix: "出典、計算式（単価 × 件数 ＝ 合計）、または集計ファイルへの参照を添えてください。",
  },
  MORI007: {
    id: "MORI007",
    name: "risk-without-amount",
    title: "金額・影響のないリスク欄",
    description: "リスク・弱気シナリオの欄に、金額・割合・件数・時間などの数値が1つもありません（opsプリセットでのみ初期有効）。",
    fix: "起きた場合の影響を数値で書いてください。金額で書けない場合は、件数や時間で書いてください。",
  },
};
