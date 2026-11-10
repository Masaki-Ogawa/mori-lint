# mori-lint

[日本語版 README](README.md)

A linter for AI agent reports. Agents write "fully covered", "verified everything", and "no issues" even when the report itself contains no downside estimate, no list of unverified items, and no stated assumptions. mori-lint checks a Markdown report with deterministic rules (no LLM calls) and flags the places where the backing evidence is not written down.

This tool does not judge whether a report is factually correct. It only checks whether the grounds are written in the text.

## Usage

```bash
npx mori-lint report.md
npx mori-lint report.md --preset ops
cat report.md | npx mori-lint --stdin --format json
npx mori-lint --explain MORI004
```

Four presets are available: generic (default), coding, research, and ops. Required sections and rule severities change per preset.

## Rules

| ID | What it flags |
|---|---|
| MORI001 | Absolute claims ("completely", "guaranteed", "no issues", and Japanese equivalents such as 完全に / 問題ありません) |
| MORI002 | Missing required sections (e.g. unverified items, assumptions) |
| MORI003 | A bare "none" / "N/A" with no stated reason |
| MORI004 | Completion claims ("deployed", "fixed") with no evidence in the same paragraph (URL, file path, commit hash, command output, image) |
| MORI005 | "All / every" claims with no denominator (no "120 of 120") |
| MORI006 | Numbers with no source or calculation (research preset) |
| MORI007 | Risk / downside sections with no amount or impact figure (ops preset) |

## Try it

```bash
npm install
npm test            # verifies the engine against 42 fixtures
npm run build
node dist/cli.js examples/inflated-report.md --preset ops   # an inflated report
node dist/cli.js examples/clean-report.md --preset ops      # a report that passes
```

## Web demo

The `playground/` directory contains a static page. Paste a report into the browser and it is checked locally; the text is never sent anywhere.

```bash
npm run build:playground   # generates playground/mori-lint.browser.js
```

## Agent skill

`skill/SKILL.md` instructs an agent to run mori-lint on its own report before handing it over. Place it in the skill directory of an agent environment that supports skills.

## License

MIT
