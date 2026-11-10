"use strict";
var MoriLint = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/browser.ts
  var browser_exports = {};
  __export(browser_exports, {
    RULE_INFO: () => RULE_INFO,
    lint: () => lint
  });

  // src/types.ts
  var RULE_INFO = {
    MORI000: {
      id: "MORI000",
      name: "suppression-without-reason",
      title: "\u7406\u7531\u306E\u306A\u3044\u6291\u5236\u6307\u5B9A",
      description: "mori-lint-disable \u306E\u6291\u5236\u6307\u5B9A\u306B reason: \u304C\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
      fix: "\u6291\u5236\u3059\u308B\u7406\u7531\u3092 reason: \u306E\u5F8C\u306B\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u7406\u7531\u3092\u66F8\u3051\u306A\u3044\u5834\u5408\u306F\u3001\u672C\u6587\u3092\u76F4\u3059\u5074\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI001: {
      id: "MORI001",
      name: "absolute-claim",
      title: "\u7D76\u5BFE\u8868\u73FE",
      description: "\u300C\u5B8C\u5168\u306B\u300D\u300C\u7D76\u5BFE\u306B\u300D\u300C\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u300D\u306A\u3069\u306E\u7D76\u5BFE\u8868\u73FE\u30FB\u65AD\u5B9A\u8868\u73FE\u3092\u691C\u51FA\u3057\u307E\u3059\u3002",
      fix: "\u65AD\u5B9A\u306E\u6839\u62E0\u3092\u66F8\u304F\u304B\u3001\u7559\u4FDD\uFF08\u691C\u77E5\u9593\u9694\u3001\u5BFE\u8C61\u7BC4\u56F2\u3001\u6B8B\u3063\u3066\u3044\u308B\u672A\u78BA\u8A8D\u4E8B\u9805\uFF09\u3092\u4F75\u8A18\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI002: {
      id: "MORI002",
      name: "missing-required-section",
      title: "\u5FC5\u9808\u6B04\u306E\u6B20\u843D",
      description: "\u30D7\u30EA\u30BB\u30C3\u30C8\u304C\u5B9A\u3081\u308B\u5FC5\u9808\u6B04\uFF08\u672A\u78BA\u8A8D\u4E8B\u9805\u3001\u524D\u63D0\u306A\u3069\uFF09\u304C\u898B\u51FA\u3057\u3068\u3057\u3066\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
      fix: "\u4E0D\u8DB3\u3057\u3066\u3044\u308B\u6B04\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4E2D\u8EAB\u304C\u306A\u3044\u5834\u5408\u3082\u3001\u6B04\u81EA\u4F53\u306F\u7F6E\u304D\u300C\u306A\u3057\u300D\u3068\u7406\u7531\u3092\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI003: {
      id: "MORI003",
      name: "empty-none",
      title: "\u6839\u62E0\u306E\u306A\u3044\u300C\u306A\u3057\u300D",
      description: "\u6B04\u306E\u672C\u6587\u304C\u300C\u306A\u3057\u300D\u300C\u7279\u306B\u306A\u3057\u300D\u300CN/A\u300D\u3060\u3051\u3067\u3001\u7406\u7531\u3084\u6839\u62E0\u304C\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
      fix: "\u300C\u306A\u3057\u300D\u306E\u5F8C\u306B\u3001\u78BA\u8A8D\u3057\u305F\u65B9\u6CD5\u3084\u6839\u62E0\u3092\u62EC\u5F27\u66F8\u304D\u306A\u3069\u3067\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI004: {
      id: "MORI004",
      name: "completion-without-evidence",
      title: "\u8A3C\u8DE1\u306E\u306A\u3044\u5B8C\u4E86\u5BA3\u8A00",
      description: "\u5B8C\u4E86\u30FB\u30C7\u30D7\u30ED\u30A4\u30FB\u4FEE\u6B63\u306A\u3069\u3092\u8FF0\u3079\u308B\u6BB5\u843D\u306B\u3001\u8A3C\u8DE1\uFF08URL\u3001\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u3001\u30B3\u30DF\u30C3\u30C8\u30CF\u30C3\u30B7\u30E5\u3001\u5B9F\u884C\u7D50\u679C\u3001\u753B\u50CF\u53C2\u7167\uFF09\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
      fix: "\u5B8C\u4E86\u306E\u8A3C\u8DE1\u3092\u540C\u3058\u6BB5\u843D\u306B\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002\u8AAD\u307F\u624B\u304C\u5F8C\u304B\u3089\u78BA\u304B\u3081\u3089\u308C\u308B\u5F62\u304C\u76EE\u5B89\u3067\u3059\u3002"
    },
    MORI005: {
      id: "MORI005",
      name: "all-without-denominator",
      title: "\u5206\u6BCD\u306E\u306A\u3044\u5168\u4EF6\u4E3B\u5F35",
      description: "\u300C\u5168\u4EF6\u300D\u300C\u3059\u3079\u3066\u300D\u306A\u3069\u306E\u4E3B\u5F35\u306B\u3001\u5206\u6BCD\uFF08\u4F55\u4EF6\u4E2D\u4F55\u4EF6\u304B\uFF09\u304C\u524D\u5F8C\u306E\u6587\u306B\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
      fix: "\u7DCF\u6570\u3068\u78BA\u8A8D\u6E08\u307F\u4EF6\u6570\u3092\u300C120\u4EF6\u4E2D120\u4EF6\u300D\u306E\u5F62\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI006: {
      id: "MORI006",
      name: "number-without-basis",
      title: "\u6839\u62E0\u8868\u793A\u306E\u306A\u3044\u6570\u5B57",
      description: "\u91D1\u984D\u30FB\u5272\u5408\u30FB\u4EF6\u6570\u306A\u3069\u306E\u6570\u5B57\u306B\u3001\u51FA\u5178\u3084\u8A08\u7B97\u5F0F\u304C\u540C\u3058\u6587\u3068\u524D\u5F8C\u306E\u6587\u306B\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\uFF08research\u30D7\u30EA\u30BB\u30C3\u30C8\u3067\u306E\u307F\u521D\u671F\u6709\u52B9\uFF09\u3002",
      fix: "\u51FA\u5178\u3001\u8A08\u7B97\u5F0F\uFF08\u5358\u4FA1 \xD7 \u4EF6\u6570 \uFF1D \u5408\u8A08\uFF09\u3001\u307E\u305F\u306F\u96C6\u8A08\u30D5\u30A1\u30A4\u30EB\u3078\u306E\u53C2\u7167\u3092\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002"
    },
    MORI007: {
      id: "MORI007",
      name: "risk-without-amount",
      title: "\u91D1\u984D\u30FB\u5F71\u97FF\u306E\u306A\u3044\u30EA\u30B9\u30AF\u6B04",
      description: "\u30EA\u30B9\u30AF\u30FB\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA\u306E\u6B04\u306B\u3001\u91D1\u984D\u30FB\u5272\u5408\u30FB\u4EF6\u6570\u30FB\u6642\u9593\u306A\u3069\u306E\u6570\u5024\u304C1\u3064\u3082\u3042\u308A\u307E\u305B\u3093\uFF08ops\u30D7\u30EA\u30BB\u30C3\u30C8\u3067\u306E\u307F\u521D\u671F\u6709\u52B9\uFF09\u3002",
      fix: "\u8D77\u304D\u305F\u5834\u5408\u306E\u5F71\u97FF\u3092\u6570\u5024\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u91D1\u984D\u3067\u66F8\u3051\u306A\u3044\u5834\u5408\u306F\u3001\u4EF6\u6570\u3084\u6642\u9593\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002"
    }
  };

  // src/parse.ts
  var HEADING_RE = /^#{1,6}\s+(.+?)\s*$/;
  var BOLD_LABEL_RE = /^\*\*(.+?)\*\*\s*(.*)$/;
  var FENCE_RE = /^\s*```/;
  function stripInline(text) {
    return text.replace(/<!--[\s\S]*?-->/g, " ").replace(/`[^`]*`/g, " ").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  }
  function parseMarkdown(raw) {
    const lines = raw.split(/\r?\n/);
    const excluded = new Array(lines.length).fill(false);
    const cleanLines = new Array(lines.length).fill("");
    const suppressions = [];
    let inFence = false;
    for (let i2 = 0; i2 < lines.length; i2++) {
      const line = lines[i2];
      const sup = line.match(
        /<!--\s*mori-lint-disable\s+(MORI\d{3})\s*(?:reason\s*:\s*(.*?))?\s*-->/
      );
      if (sup) {
        suppressions.push({
          ruleId: sup[1],
          line: i2 + 1,
          hasReason: Boolean(sup[2] && sup[2].trim().length > 0)
        });
      }
      if (FENCE_RE.test(line)) {
        excluded[i2] = true;
        inFence = !inFence;
        continue;
      }
      if (inFence) {
        excluded[i2] = true;
        continue;
      }
      if (/^\s*>/.test(line)) {
        excluded[i2] = true;
        continue;
      }
      cleanLines[i2] = stripInline(line);
    }
    const sections = [];
    const starts = [];
    for (let i2 = 0; i2 < lines.length; i2++) {
      if (excluded[i2]) continue;
      const h = lines[i2].match(HEADING_RE);
      if (h) {
        starts.push({ idx: i2, title: h[1].replace(/[*_`]/g, "").trim(), inlineBody: "" });
        continue;
      }
      const b = lines[i2].match(BOLD_LABEL_RE);
      if (b) {
        const title = b[1].replace(/[:：]\s*$/, "").trim();
        starts.push({ idx: i2, title, inlineBody: stripInline(b[2] || "") });
      }
    }
    for (let s = 0; s < starts.length; s++) {
      const start = starts[s];
      const endIdx = s + 1 < starts.length ? starts[s + 1].idx : lines.length;
      const bodyLines = [];
      if (start.inlineBody) bodyLines.push(start.inlineBody);
      for (let i2 = start.idx + 1; i2 < endIdx; i2++) {
        if (!excluded[i2]) bodyLines.push(cleanLines[i2]);
      }
      sections.push({
        title: start.title,
        startLine: start.idx + 1,
        bodyStartLine: start.idx + 2,
        body: bodyLines.join("\n").trim()
      });
    }
    const paragraphs = [];
    let i = 0;
    while (i < lines.length) {
      if (excluded[i] || cleanLines[i].trim() === "" || HEADING_RE.test(lines[i])) {
        i++;
        continue;
      }
      const start = i;
      const textParts = [];
      const rawParts = [];
      while (i < lines.length && !excluded[i] && cleanLines[i].trim() !== "" && !HEADING_RE.test(lines[i])) {
        textParts.push(cleanLines[i]);
        rawParts.push(lines[i]);
        i++;
      }
      const end = i - 1;
      let j = i;
      while (j < lines.length && lines[j].trim() === "") j++;
      let blockType = null;
      let blockRaw = "";
      let blockEnd = end;
      if (j < lines.length) {
        if (FENCE_RE.test(lines[j])) {
          blockType = "code";
          const parts = [];
          let k = j;
          parts.push(lines[k]);
          k++;
          while (k < lines.length && !FENCE_RE.test(lines[k])) {
            parts.push(lines[k]);
            k++;
          }
          if (k < lines.length) parts.push(lines[k]);
          blockRaw = parts.join("\n");
          blockEnd = Math.min(k, lines.length - 1);
        } else if (/^\s*([-*+]|\d+[.)])\s+/.test(lines[j])) {
          blockType = "list";
          const parts = [];
          let k = j;
          while (k < lines.length && /^\s*([-*+]|\d+[.)])\s+/.test(lines[k])) {
            parts.push(lines[k]);
            k++;
          }
          blockRaw = parts.join("\n");
          blockEnd = k - 1;
        } else if (/^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(lines[j])) {
          blockType = "image";
          blockRaw = lines[j];
          blockEnd = j;
        }
      }
      paragraphs.push({
        startLine: start + 1,
        endLine: end + 1,
        text: textParts.join("\n"),
        rawText: rawParts.join("\n"),
        blockType,
        blockRaw,
        blockEndLine: blockEnd + 1
      });
    }
    const sentences = [];
    for (let li = 0; li < lines.length; li++) {
      if (excluded[li] || HEADING_RE.test(lines[li])) continue;
      const text = cleanLines[li];
      if (!text.trim()) continue;
      const parts = text.split(/(?<=[。．.!?！？])/);
      for (const part of parts) {
        const t = part.trim();
        if (t) sentences.push({ text: t, line: li + 1 });
      }
    }
    return { raw, lines, cleanLines, excluded, sections, paragraphs, sentences, suppressions };
  }
  function normalizeTitle(title) {
    return title.toLowerCase().replace(/[\s　・、,，:：/／#*`「」()（）-]/g, "");
  }
  function titleMatches(title, aliases) {
    const t = normalizeTitle(title);
    if (!t) return false;
    return aliases.some((a) => {
      const n = normalizeTitle(a);
      return n.length > 0 && (t.includes(n) || n.includes(t));
    });
  }

  // src/presets.ts
  var ABSOLUTE_TERMS_JA = [
    "\u5B8C\u5168\u306B",
    "\u7D76\u5BFE\u306B",
    "\u7D76\u5BFE",
    "\u5B8C\u74A7",
    "\u5FC5\u305A",
    "\u554F\u984C\u3042\u308A\u307E\u305B\u3093",
    "\u554F\u984C\u306A\u3057",
    "\u9593\u9055\u3044\u306A\u304F",
    "100%",
    "\uFF11\uFF10\uFF10\uFF05",
    "\u76E4\u77F3",
    "\u9244\u58C1",
    // Intensifiers and exaggerated rhetoric (patterns observed in real agent reports)
    "\u6975\u3081\u3066",
    "\u5287\u7684",
    "\u91CD\u5927",
    "\u5927\u5E45",
    "\u8106\u5F31"
  ];
  var ABSOLUTE_TERMS_EN = [
    "perfectly",
    "completely",
    "guaranteed",
    "guarantee",
    "no issues",
    "all done",
    "flawless",
    "flawlessly"
  ];
  var UNVERIFIED = {
    name: "\u672A\u78BA\u8A8D\u4E8B\u9805",
    aliases: ["\u672A\u78BA\u8A8D\u4E8B\u9805", "\u672A\u78BA\u8A8D", "Unverified items", "Unverified", "Open questions"]
  };
  var ASSUMPTIONS = {
    name: "\u524D\u63D0",
    aliases: ["\u524D\u63D0", "\u524D\u63D0\u6761\u4EF6", "Assumptions", "Assumption", "Premises"]
  };
  var DOWNSIDE = {
    name: "\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA\u30FB\u30EA\u30B9\u30AF\u8A66\u7B97",
    aliases: [
      "\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA\u30FB\u30EA\u30B9\u30AF\u8A66\u7B97",
      "\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA",
      "\u30EA\u30B9\u30AF\u8A66\u7B97",
      "Downside scenario",
      "Downside",
      "Bear case"
    ]
  };
  var BASE_RULES = {
    MORI001: "warn",
    MORI002: "error",
    MORI003: "warn",
    MORI004: "warn",
    MORI005: "warn",
    MORI006: "off",
    MORI007: "off"
  };
  var PRESET_NAMES = ["generic", "coding", "research", "ops"];
  function resolvePreset(presetName, config) {
    const name = PRESET_NAMES.includes(presetName) ? presetName : "generic";
    const rules = { ...BASE_RULES };
    let requiredSections = [UNVERIFIED, ASSUMPTIONS];
    if (name === "coding") {
      requiredSections = [
        {
          name: "\u5909\u66F4\u5185\u5BB9",
          aliases: ["\u5909\u66F4\u5185\u5BB9", "\u5909\u66F4\u70B9", "\u5909\u66F4", "Changes", "What changed"]
        },
        {
          name: "\u691C\u8A3C\u7D50\u679C",
          aliases: ["\u691C\u8A3C\u7D50\u679C", "\u691C\u8A3C", "\u30C6\u30B9\u30C8\u7D50\u679C", "Verification", "Tests", "Test results"]
        },
        UNVERIFIED
      ];
      rules.MORI004 = "error";
    } else if (name === "research") {
      requiredSections = [
        {
          name: "\u51FA\u5178",
          aliases: ["\u51FA\u5178", "\u51FA\u5178\u30FB\u6839\u62E0", "Sources", "References", "Source"]
        },
        UNVERIFIED,
        {
          name: "\u53CD\u5BFE\u4EEE\u8AAC\u307E\u305F\u306F\u5F31\u3044\u70B9",
          aliases: ["\u53CD\u5BFE\u4EEE\u8AAC", "\u5F31\u3044\u70B9", "\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA", "Counterargument", "Limitations", "Weak points"]
        }
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
  var RISK_SECTION_ALIASES = [
    "\u5F31\u6C17\u30B7\u30CA\u30EA\u30AA",
    "\u30EA\u30B9\u30AF\u8A66\u7B97",
    "\u30EA\u30B9\u30AF",
    "Downside scenario",
    "Downside",
    "Bear case",
    "Risk"
  ];

  // src/rules/context.ts
  function makeFinding(ruleId, ruleName, severity, line, message, excerpt) {
    return { ruleId, ruleName, severity, line, message, excerpt };
  }

  // src/rules/mori001.ts
  var NEGATION_RE = /ではありません|ではない|じゃありません|not\s+(complete|perfect|guaranteed)/i;
  var checkMori001 = (doc, ctx) => {
    const findings = [];
    for (const sentence of doc.sentences) {
      const text = sentence.text;
      if (NEGATION_RE.test(text)) continue;
      let hit = null;
      for (const term of ctx.absoluteTermsJa) {
        if (text.includes(term)) {
          hit = term;
          break;
        }
      }
      if (!hit) {
        const lower = text.toLowerCase();
        for (const term of ctx.absoluteTermsEn) {
          const re = new RegExp(`\\b${term.replace(/\s+/g, "\\s+")}\\b`, "i");
          if (re.test(lower)) {
            hit = term;
            break;
          }
        }
      }
      if (hit) {
        findings.push(
          makeFinding(
            "MORI001",
            "absolute-claim",
            "warn",
            sentence.line,
            `\u7D76\u5BFE\u8868\u73FE\u300C${hit}\u300D\u304C\u3042\u308A\u307E\u3059\u3002\u65AD\u5B9A\u306E\u6839\u62E0\u3092\u66F8\u304F\u304B\u3001\u7559\u4FDD\u3092\u4F75\u8A18\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
            text
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori002.ts
  var checkMori002 = (doc, ctx) => {
    const findings = [];
    for (const req of ctx.preset.requiredSections) {
      const exists = doc.sections.some((s) => titleMatches(s.title, req.aliases));
      if (!exists) {
        findings.push(
          makeFinding(
            "MORI002",
            "missing-required-section",
            "error",
            1,
            `\u5FC5\u9808\u6B04\u300C${req.name}\u300D\u304C\u898B\u51FA\u3057\u3068\u3057\u3066\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u6B04\u3092\u8FFD\u52A0\u3057\u3001\u4E2D\u8EAB\u304C\u306A\u3044\u5834\u5408\u3082\u7406\u7531\u3092\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002`
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori003.ts
  var NONE_EXACT_RE = /^(なし|特になし|とくになし|N\/A|none|nothing)$/i;
  var REASON_RE = /ため|ので|から|確認済み|確認した|理由/;
  var checkMori003 = (doc) => {
    const findings = [];
    for (const section of doc.sections) {
      const body = section.body.replace(/\s+/g, " ").trim();
      if (!body) continue;
      const stripped = body.replace(/[。.!！\s]/g, "");
      const isExactNone = NONE_EXACT_RE.test(stripped);
      const isShortNone = body.length <= 12 && /^(なし|特になし|とくになし|N\/A)/i.test(body) && !REASON_RE.test(body);
      if (isExactNone || isShortNone) {
        findings.push(
          makeFinding(
            "MORI003",
            "empty-none",
            "warn",
            section.startLine,
            `\u6B04\u300C${section.title}\u300D\u306E\u672C\u6587\u304C\u300C${body}\u300D\u3060\u3051\u3067\u3001\u7406\u7531\u3084\u6839\u62E0\u304C\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u78BA\u8A8D\u3057\u305F\u65B9\u6CD5\u3084\u6839\u62E0\u3092\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002`,
            body
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori004.ts
  var COMPLETION_RE = /完了しました|完了です|デプロイ済み|公開しました|公開されています|修正しました|対応は完了|リリースしました|\b(deployed|fixed|completed|released)\b/i;
  var EVIDENCE_RES = [
    /https?:\/\/\S+/,
    /!\[[^\]]*\]\([^)]+\)/,
    /(?:[\w.\-]+\/)+[\w.\-]+\.\w+/,
    /\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b/
  ];
  var checkMori004 = (doc) => {
    const findings = [];
    for (const para of doc.paragraphs) {
      if (!COMPLETION_RE.test(para.text)) continue;
      const range = `${para.rawText}
${para.blockRaw}`;
      const hasEvidence = para.blockType === "code" || para.blockType === "image" || EVIDENCE_RES.some((re) => re.test(range));
      if (!hasEvidence) {
        findings.push(
          makeFinding(
            "MORI004",
            "completion-without-evidence",
            "warn",
            para.startLine,
            "\u5B8C\u4E86\u3092\u8FF0\u3079\u308B\u6BB5\u843D\u306B\u8A3C\u8DE1\uFF08URL\u3001\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u3001\u30B3\u30DF\u30C3\u30C8\u30CF\u30C3\u30B7\u30E5\u3001\u5B9F\u884C\u7D50\u679C\u3001\u753B\u50CF\u53C2\u7167\uFF09\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
            para.text.split("\n")[0]
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori005.ts
  var ALL_RE = /全件|すべて|全て|\ball\b|\bevery\b/i;
  var DENOMINATOR_RE = /(\d[\d,]*\s*件中\s*\d[\d,]*\s*件|\d[\d,]*\s*\/\s*\d[\d,]*|\d+\s+of\s+\d+)/i;
  var checkMori005 = (doc) => {
    const findings = [];
    const sents = doc.sentences;
    for (let idx = 0; idx < sents.length; idx++) {
      if (!ALL_RE.test(sents[idx].text)) continue;
      const window = [sents[idx - 1]?.text ?? "", sents[idx].text, sents[idx + 1]?.text ?? ""].join(" ");
      if (!DENOMINATOR_RE.test(window)) {
        findings.push(
          makeFinding(
            "MORI005",
            "all-without-denominator",
            "warn",
            sents[idx].line,
            "\u300C\u5168\u4EF6\u30FB\u3059\u3079\u3066\u300D\u306E\u4E3B\u5F35\u306B\u5206\u6BCD\uFF08\u4F55\u4EF6\u4E2D\u4F55\u4EF6\u304B\uFF09\u304C\u524D\u5F8C\u306E\u6587\u306B\u3042\u308A\u307E\u305B\u3093\u3002\u7DCF\u6570\u3068\u78BA\u8A8D\u6E08\u307F\u4EF6\u6570\u3092\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002",
            sents[idx].text
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori006.ts
  var NUMBER_RE = /(\d[\d,]*(?:\.\d+)?\s*(%|％|円|件|人|割|ドル|台|回)|\d+(?:\.\d+)?\s*percent)/i;
  var BASIS_RE = /(出典|https?:\/\/|×|＝|=|ファイル|sources?|references?)/i;
  var PATH_RE = /(?:[\w.\-]+\/)+[\w.\-]+\.\w+/;
  var checkMori006 = (doc) => {
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
            "\u6570\u5B57\u306B\u51FA\u5178\u3084\u8A08\u7B97\u5F0F\u304C\u524D\u5F8C\u306E\u6587\u306B\u3042\u308A\u307E\u305B\u3093\u3002\u51FA\u5178\u3001\u8A08\u7B97\u306E\u5165\u529B\u3001\u307E\u305F\u306F\u96C6\u8A08\u30D5\u30A1\u30A4\u30EB\u3078\u306E\u53C2\u7167\u3092\u6DFB\u3048\u3066\u304F\u3060\u3055\u3044\u3002",
            sents[idx].text
          )
        );
      }
    }
    return findings;
  };

  // src/rules/mori007.ts
  var NUMBER_RE2 = /[0-9０-９]/;
  var checkMori007 = (doc) => {
    const findings = [];
    for (const section of doc.sections) {
      if (!titleMatches(section.title, RISK_SECTION_ALIASES)) continue;
      if (!NUMBER_RE2.test(section.body)) {
        findings.push(
          makeFinding(
            "MORI007",
            "risk-without-amount",
            "warn",
            section.startLine,
            `\u6B04\u300C${section.title}\u300D\u306B\u91D1\u984D\u30FB\u5272\u5408\u30FB\u4EF6\u6570\u30FB\u6642\u9593\u306A\u3069\u306E\u6570\u5024\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u8D77\u304D\u305F\u5834\u5408\u306E\u5F71\u97FF\u3092\u6570\u5024\u3067\u66F8\u3044\u3066\u304F\u3060\u3055\u3044\u3002`,
            section.body.split("\n")[0]
          )
        );
      }
    }
    return findings;
  };

  // src/index.ts
  var RULE_CHECKS = {
    MORI001: checkMori001,
    MORI002: checkMori002,
    MORI003: checkMori003,
    MORI004: checkMori004,
    MORI005: checkMori005,
    MORI006: checkMori006,
    MORI007: checkMori007
  };
  function lint(text, options = {}) {
    const config = options.config ?? {};
    const presetName = options.preset ?? config.preset ?? "generic";
    const preset = resolvePreset(presetName, config);
    const doc = parseMarkdown(text);
    const ctx = {
      preset,
      absoluteTermsJa: [
        ...ABSOLUTE_TERMS_JA,
        ...config.dictionary?.absoluteTerms ?? []
      ],
      absoluteTermsEn: [...ABSOLUTE_TERMS_EN]
    };
    let findings = [];
    for (const sup of doc.suppressions) {
      if (!sup.hasReason) {
        findings.push({
          ruleId: "MORI000",
          ruleName: RULE_INFO.MORI000.name,
          severity: "warn",
          line: sup.line,
          message: "\u6291\u5236\u6307\u5B9A\uFF08mori-lint-disable\uFF09\u306B\u7406\u7531\uFF08reason:\uFF09\u304C\u66F8\u304B\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u7406\u7531\u3092\u66F8\u304F\u304B\u3001\u672C\u6587\u3092\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        });
      }
    }
    for (const [ruleId, check] of Object.entries(RULE_CHECKS)) {
      const setting = preset.rules[ruleId];
      if (!setting || setting === "off") continue;
      const results = check(doc, ctx).map((f) => ({ ...f, severity: setting }));
      findings.push(...results);
    }
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
  return __toCommonJS(browser_exports);
})();
