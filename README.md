# mori-lint

A deterministic linter for AI agent reports — AIエージェントの報告文を検査するリンター

[English](#english) | [日本語](#日本語)

---

## English

A linter for AI agent reports. Agents write "fully covered", "verified everything", and "no issues" even when the report itself contains no downside estimate, no list of unverified items, and no stated assumptions. mori-lint checks a Markdown report with deterministic rules (no LLM calls) and flags the places where the backing evidence is not written down.

This tool does not judge whether a report is factually correct. It only checks whether the grounds are written in the text.

### Usage

```bash
npx mori-lint report.md
npx mori-lint report.md --preset ops
cat report.md | npx mori-lint --stdin --format json
npx mori-lint --explain MORI004
```

Four presets are available: generic (default), coding, research, and ops. Required sections and rule severities change per preset.

Reports in English and Japanese are both supported. The document language is detected automatically and findings are reported in that language (override with `--lang ja|en|auto`).

### Rules

| ID | What it flags |
|---|---|
| MORI001 | Absolute claims ("completely", "guaranteed", "no issues", and Japanese equivalents such as 完全に / 問題ありません) |
| MORI002 | Missing required sections (e.g. unverified items, assumptions) |
| MORI003 | A bare "none" / "N/A" with no stated reason |
| MORI004 | Completion claims ("deployed", "fixed") with no evidence in the same paragraph (URL, file path, commit hash, command output, image) |
| MORI005 | "All / every" claims with no denominator (no "120 of 120") |
| MORI006 | Numbers with no source or calculation (research preset) |
| MORI007 | Risk / downside sections with no amount or impact figure (ops preset) |

### Try it

```bash
npm install
npm test            # verifies the engine against 62 fixtures
npm run build
node dist/cli.js examples/inflated-report.md --preset ops   # an inflated report
node dist/cli.js examples/clean-report.md --preset ops      # a report that passes
```

### Web demo

The `playground/` directory contains a static page. Paste a report into the browser and it is checked locally; the text is never sent anywhere.

```bash
npm run build:playground   # generates playground/mori-lint.browser.js
```

### Agent skill

`skill/SKILL.md` instructs an agent to run mori-lint on its own report before handing it over. Place it in the skill directory of an agent environment that supports skills.

### License

MIT

---

## 日本語

AIエージェントの報告文を検査するリンターです。「完全にカバーしました」「全件確認済みです」「問題ありません」と書いてあっても、弱い場合の試算、確認できていない事項、前提条件が本文にないことがあります。mori-lintは報告文（Markdown）を決定的なルール（LLMを使いません）で検査し、根拠の書かれていない箇所を指摘します。

このツールは、報告の内容が事実かどうかを判定しません。判定するのは「根拠が本文に書かれているか」までです。

### 使い方

```bash
npx mori-lint report.md
npx mori-lint report.md --preset ops
cat report.md | npx mori-lint --stdin --format json
npx mori-lint --explain MORI004
```

プリセットは generic（初期値）、coding、research、ops の4種です。必須欄とルールの重大度が文書の種類ごとに変わります。

日本語と英語の報告文に対応しています。文書の言語は自動で判定され、検出メッセージもその言語で出ます（`--lang ja|en|auto` で指定もできます）。

### ルール（7本）

| ID | 内容 |
|---|---|
| MORI001 | 絶対表現（完全に、絶対に、問題ありません など） |
| MORI002 | 必須欄の欠落（未確認事項、前提など） |
| MORI003 | 根拠のない「なし」 |
| MORI004 | 証跡のない完了宣言 |
| MORI005 | 分母のない全件主張（何件中何件かが書かれていない） |
| MORI006 | 根拠表示のない数字（researchプリセットで有効） |
| MORI007 | 金額・影響のないリスク欄（opsプリセットで有効） |

### 試す

```bash
npm install
npm test            # フィクスチャ62件で検証します
npm run build
node dist/cli.js examples/inflated-report.md --preset ops   # 盛った報告の例
node dist/cli.js examples/clean-report.md --preset ops      # 通る報告の例
```

### Webデモ

`playground/` に静的ページがあります。ブラウザに報告文を貼るだけで試せて、入力した文章は外部に送信されません（検査エンジンをブラウザ内で実行します）。

```bash
npm run build:playground   # playground/mori-lint.browser.js を生成します
```

### Skill形式

`skill/SKILL.md` は、エージェントが報告を出す前に自分で mori-lint を実行するための手順書です。対応するエージェント環境のスキル置き場に置いて使います。

### ライセンス

MIT
