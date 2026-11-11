#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import { detectLang, lint } from "./index";
import { Finding, Lang, MoriConfig, RULE_INFO, RULE_INFO_EN } from "./types";

interface CliArgs {
  files: string[];
  preset?: string;
  configPath?: string;
  format: "text" | "json";
  stdin: boolean;
  strict: boolean;
  explain?: string;
  help: boolean;
  version: boolean;
  lang?: Lang | "auto";
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    files: [],
    format: "text",
    stdin: false,
    strict: false,
    help: false,
    version: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--preset") args.preset = argv[++i];
    else if (a === "--config") args.configPath = argv[++i];
    else if (a === "--format") {
      const v = argv[++i];
      if (v === "text" || v === "json") args.format = v;
    } else if (a === "--stdin") args.stdin = true;
    else if (a === "--strict") args.strict = true;
    else if (a === "--explain") args.explain = argv[++i];
    else if (a === "--lang") {
      const v = argv[++i];
      if (v === "ja" || v === "en" || v === "auto") args.lang = v;
    }
    else if (a === "--help" || a === "-h") args.help = true;
    else if (a === "--version" || a === "-v") args.version = true;
    else if (a.startsWith("--")) {
      throw new Error(`不明なオプションです: ${a}`);
    } else args.files.push(a);
  }
  return args;
}

const HELP = `mori-lint ― AIエージェントの報告文を検査するリンター

使い方:
  mori-lint <file.md> [file2.md ...]
  cat report.md | mori-lint --stdin
  mori-lint --explain MORI004

オプション:
  --preset <name>   generic（初期値） | coding | research | ops
  --config <path>   設定ファイル（.morilintrc.json形式）
  --format <形式>   text（初期値） | json
  --lang <lang>     ja | en | auto（初期値: auto、文書の言語で判定）
  --stdin           標準入力から読む
  --strict          warnでも終了コード1にする
  --explain <ID>    ルールの根拠と直し方を表示する
  --version         バージョンを表示する

終了コード: 0 = errorなし、1 = errorあり（--strict時はwarnも）、2 = 実行の失敗

このツールは事実かどうかを判定しません。判定するのは「根拠が本文に書かれているか」までです。
`;

function loadConfig(args: CliArgs): MoriConfig {
  const configPath =
    args.configPath ??
    (fs.existsSync(path.join(process.cwd(), ".morilintrc.json"))
      ? path.join(process.cwd(), ".morilintrc.json")
      : null);
  if (!configPath) return {};
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw) as MoriConfig;
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function main(): Promise<number> {
  let args: CliArgs;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error((e as Error).message);
    return 2;
  }

  if (args.help) {
    console.log(HELP);
    return 0;
  }
  if (args.version) {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8")
    ) as { version: string };
    console.log(pkg.version);
    return 0;
  }
  if (args.explain) {
    const en = args.lang === "en";
    const info = (en ? RULE_INFO_EN : RULE_INFO)[args.explain.toUpperCase()];
    if (!info) {
      console.error(en ? `Rule not found: ${args.explain}` : `ルールが見つかりません: ${args.explain}`);
      return 2;
    }
    console.log(`${info.id} ${info.name} ― ${info.title}\n`);
    console.log(en ? `About: ${info.description}` : `内容: ${info.description}`);
    console.log(en ? `Fix: ${info.fix}` : `直し方: ${info.fix}`);
    return 0;
  }

  let config: MoriConfig;
  try {
    config = loadConfig(args);
  } catch (e) {
    console.error(`設定ファイルを読み込めませんでした: ${(e as Error).message}`);
    return 2;
  }

  const targets: { name: string; text: string }[] = [];
  if (args.stdin) {
    targets.push({ name: "<stdin>", text: await readStdin() });
  }
  for (const file of args.files) {
    try {
      targets.push({ name: file, text: fs.readFileSync(file, "utf-8") });
    } catch (e) {
      console.error(`ファイルを読み込めませんでした: ${file}: ${(e as Error).message}`);
      return 2;
    }
  }
  if (targets.length === 0) {
    console.error("検査対象がありません。ファイルを指定するか --stdin を使ってください。");
    console.error(HELP);
    return 2;
  }

  const results: { file: string; findings: Finding[]; lang: Lang }[] = [];
  let errors = 0;
  let warnings = 0;
  for (const t of targets) {
    const findings = lint(t.text, { preset: args.preset, config, lang: args.lang });
    const lang: Lang =
      args.lang && args.lang !== "auto"
        ? args.lang
        : config.lang && config.lang !== "auto"
          ? config.lang
          : detectLang(t.text);
    results.push({ file: t.name, findings, lang });
    for (const f of findings) {
      if (f.severity === "error") errors++;
      else warnings++;
    }
  }

  if (args.format === "json") {
    console.log(
      JSON.stringify(
        { files: results, summary: { errors, warnings } },
        null,
        2
      )
    );
  } else {
    for (const r of results) {
      const en = r.lang === "en";
      console.log(`== ${r.file}`);
      if (r.findings.length === 0) {
        console.log(en ? "  no findings" : "  検出なし");
      }
      for (const f of r.findings) {
        console.log(
          en
            ? `  line ${f.line} [${f.severity}] ${f.ruleId} ${f.ruleName}: ${f.message}`
            : `  ${f.line}行目 [${f.severity}] ${f.ruleId} ${f.ruleName}: ${f.message}`
        );
        if (f.excerpt) console.log(`    > ${f.excerpt}`);
      }
    }
    const enUi = results.length > 0 && results[0].lang === "en";
    console.log(
      enUi
        ? `\nTotal: ${errors} error(s) / ${warnings} warning(s) across ${results.length} file(s)`
        : `\n合計: error ${errors}件 / warn ${warnings}件（対象 ${results.length}ファイル）`
    );
  }

  if (errors > 0) return 1;
  if (args.strict && warnings > 0) return 1;
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => {
    console.error((e as Error).message);
    process.exit(2);
  });
