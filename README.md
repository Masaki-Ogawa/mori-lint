# mori-lint

[English README](README.en.md)

AIエージェントの報告文を検査するリンターです。「完全にカバーしました」「全件確認済みです」「問題ありません」と書いてあっても、弱い場合の試算、確認できていない事項、前提条件が本文にないことがあります。mori-lintは報告文（Markdown）を決定的なルール（LLMを使いません）で検査し、根拠の書かれていない箇所を指摘します。

このツールは、報告の内容が事実かどうかを判定しません。判定するのは「根拠が本文に書かれているか」までです。

## 使い方

```bash
npx mori-lint report.md
npx mori-lint report.md --preset ops
cat report.md | npx mori-lint --stdin --format json
npx mori-lint --explain MORI004
```

プリセットは generic（初期値）、coding、research、ops の4種です。必須欄とルールの重大度が文書の種類ごとに変わります。

## ルール（7本）

| ID | 内容 |
|---|---|
| MORI001 | 絶対表現（完全に、絶対に、問題ありません など） |
| MORI002 | 必須欄の欠落（未確認事項、前提など） |
| MORI003 | 根拠のない「なし」 |
| MORI004 | 証跡のない完了宣言 |
| MORI005 | 分母のない全件主張（何件中何件かが書かれていない） |
| MORI006 | 根拠表示のない数字（researchプリセットで有効） |
| MORI007 | 金額・影響のないリスク欄（opsプリセットで有効） |

## 試す

```bash
npm install
npm test            # フィクスチャ48件で検証します
npm run build
node dist/cli.js examples/inflated-report.md --preset ops   # 盛った報告の例
node dist/cli.js examples/clean-report.md --preset ops      # 通る報告の例
```

## Webデモ

`playground/` に静的ページがあります。ブラウザに報告文を貼るだけで試せて、入力した文章は外部に送信されません（検査エンジンをブラウザ内で実行します）。

```bash
npm run build:playground   # playground/mori-lint.browser.js を生成します
```

## Skill形式

`skill/SKILL.md` は、エージェントが報告を出す前に自分で mori-lint を実行するための手順書です。対応するエージェント環境のスキル置き場に置いて使います。

## ライセンス

MIT
