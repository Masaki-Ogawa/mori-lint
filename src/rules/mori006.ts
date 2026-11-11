import { RuleCheck, makeFinding } from "./context";

const NUMBER_RE =
  /(\d[\d,]*(?:\.\d+)?\s*(%|％|円|件|人|割|ドル|台|回)|\d+(?:\.\d+)?\s*percent)/i;
const BASIS_RE =
  /(出典|https?:\/\/|×|＝|=|ファイル|sources?|references?)/i;
const PATH_RE = /(?:[\w.\-]+\/)+[\w.\-]+\.\w+/;

// MORI006: a number with no source, formula or reference (on by default only in the research preset)
export const checkMori006: RuleCheck = (doc, ctx) => {
  const en = ctx.lang === "en";
  const findings = [];
  const sents = doc.sentences;
  for (let idx = 0; idx < sents.length; idx++) {
    if (!NUMBER_RE.test(sents[idx].text)) continue;
    const window = [sents[idx - 1]?.text ?? "", sents[idx].text, sents[idx + 1]?.text ?? ""].join(" ");
    if (!BASIS_RE.test(window) && !PATH_RE.test(window)) {
      findings.push(
        makeFinding(
          "MORI006",
          "number-without-basis",
          "warn",
          sents[idx].line,
          en
            ? "A number appears without a source or formula in the surrounding sentences. Add a source, the calculation inputs, or a reference to the data file."
            : "数字に出典や計算式が前後の文にありません。出典、計算の入力、または集計ファイルへの参照を添えてください。",
          sents[idx].text
        )
      );
    }
  }
  return findings;
};
