import { RuleCheck, makeFinding } from "./context";

const COMPLETION_RE =
  /完了しました|完了です|デプロイ済み|公開しました|公開されています|修正しました|対応は完了|リリースしました|\b(deployed|fixed|completed|released)\b/i;

const EVIDENCE_RES: RegExp[] = [
  /https?:\/\/\S+/,
  /!\[[^\]]*\]\([^)]+\)/,
  /(?:[\w.\-]+\/)+[\w.\-]+\.\w+/,
  /\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b/,
];

// MORI004: a completion claim whose paragraph (and attached block) has no evidence
export const checkMori004: RuleCheck = (doc, ctx) => {
  const en = ctx.lang === "en";
  const findings = [];
  for (const para of doc.paragraphs) {
    if (!COMPLETION_RE.test(para.text)) continue;
    const range = `${para.rawText}\n${para.blockRaw}`;
    const hasEvidence =
      para.blockType === "code" ||
      para.blockType === "image" ||
      EVIDENCE_RES.some((re) => re.test(range));
    if (!hasEvidence) {
      findings.push(
        makeFinding(
          "MORI004",
          "completion-without-evidence",
          "warn",
          para.startLine,
          en
            ? "This paragraph states completion but has no evidence (URL, file path, commit hash, run output, image reference)."
            : "完了を述べる段落に証跡（URL、ファイルパス、コミットハッシュ、実行結果、画像参照）がありません。",
          para.text.split("\n")[0]
        )
      );
    }
  }
  return findings;
};
