export interface Section {
  title: string;
  startLine: number;
  bodyStartLine: number;
  body: string;
}

export interface Paragraph {
  startLine: number;
  endLine: number;
  text: string;
  rawText: string;
  blockType: "code" | "list" | "image" | null;
  blockRaw: string;
  blockEndLine: number;
}

export interface Sentence {
  text: string;
  line: number;
}

export interface Suppression {
  ruleId: string;
  line: number;
  hasReason: boolean;
}

export interface ParsedDoc {
  raw: string;
  lines: string[];
  /** Lines prepared for linting (code, quotes and inline code removed) */
  cleanLines: string[];
  /** Line number (1-based) -> whether the line is excluded from linting */
  excluded: boolean[];
  sections: Section[];
  paragraphs: Paragraph[];
  sentences: Sentence[];
  suppressions: Suppression[];
}

const HEADING_RE = /^#{1,6}\s+(.+?)\s*$/;
const BOLD_LABEL_RE = /^\*\*(.+?)\*\*\s*(.*)$/;
const FENCE_RE = /^\s*```/;

export function stripInline(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
}

export function parseMarkdown(raw: string): ParsedDoc {
  const lines = raw.split(/\r?\n/);
  const excluded: boolean[] = new Array(lines.length).fill(false);
  const cleanLines: string[] = new Array(lines.length).fill("");
  const suppressions: Suppression[] = [];

  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sup = line.match(
      /<!--\s*mori-lint-disable\s+(MORI\d{3})\s*(?:reason\s*:\s*(.*?))?\s*-->/
    );
    if (sup) {
      suppressions.push({
        ruleId: sup[1],
        line: i + 1,
        hasReason: Boolean(sup[2] && sup[2].trim().length > 0),
      });
    }
    if (FENCE_RE.test(line)) {
      excluded[i] = true;
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      excluded[i] = true;
      continue;
    }
    if (/^\s*>/.test(line)) {
      excluded[i] = true;
      continue;
    }
    cleanLines[i] = stripInline(line);
  }

  // Sections (headings and bold labels)
  const sections: Section[] = [];
  interface StartMark {
    idx: number;
    title: string;
    inlineBody: string;
  }
  const starts: StartMark[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (excluded[i]) continue;
    const h = lines[i].match(HEADING_RE);
    if (h) {
      starts.push({ idx: i, title: h[1].replace(/[*_`]/g, "").trim(), inlineBody: "" });
      continue;
    }
    const b = lines[i].match(BOLD_LABEL_RE);
    if (b) {
      const title = b[1].replace(/[:：]\s*$/, "").trim();
      starts.push({ idx: i, title, inlineBody: stripInline(b[2] || "") });
    }
  }
  for (let s = 0; s < starts.length; s++) {
    const start = starts[s];
    const endIdx = s + 1 < starts.length ? starts[s + 1].idx : lines.length;
    const bodyLines: string[] = [];
    if (start.inlineBody) bodyLines.push(start.inlineBody);
    for (let i = start.idx + 1; i < endIdx; i++) {
      if (!excluded[i]) bodyLines.push(cleanLines[i]);
    }
    sections.push({
      title: start.title,
      startLine: start.idx + 1,
      bodyStartLine: start.idx + 2,
      body: bodyLines.join("\n").trim(),
    });
  }

  // Paragraphs (split on blank lines; a following code block, list or image line is kept as an attached block)
  const paragraphs: Paragraph[] = [];
  let i = 0;
  while (i < lines.length) {
    if (excluded[i] || cleanLines[i].trim() === "" || HEADING_RE.test(lines[i])) {
      i++;
      continue;
    }
    const start = i;
    const textParts: string[] = [];
    const rawParts: string[] = [];
    while (
      i < lines.length &&
      !excluded[i] &&
      cleanLines[i].trim() !== "" &&
      !HEADING_RE.test(lines[i])
    ) {
      textParts.push(cleanLines[i]);
      rawParts.push(lines[i]);
      i++;
    }
    const end = i - 1;
    // Look for an attached block (blank lines may intervene)
    let j = i;
    while (j < lines.length && lines[j].trim() === "") j++;
    let blockType: Paragraph["blockType"] = null;
    let blockRaw = "";
    let blockEnd = end;
    if (j < lines.length) {
      if (FENCE_RE.test(lines[j])) {
        blockType = "code";
        const parts: string[] = [];
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
        const parts: string[] = [];
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
      blockEndLine: blockEnd + 1,
    });
  }

  // Sentences (heading lines excluded)
  const sentences: Sentence[] = [];
  for (let li = 0; li < lines.length; li++) {
    if (excluded[li] || HEADING_RE.test(lines[li])) continue;
    const text = cleanLines[li];
    if (!text.trim()) continue;
    // Protect decimal points (e.g. 3.5) so they are not treated as sentence ends
    const guarded = text.replace(/(\d)\.(\d)/g, "$1\u2024$2");
    const parts = guarded.split(/(?<=[。．.!?！？])/);
    for (const part of parts) {
      const t = part.replace(/\u2024/g, ".").trim();
      if (t) sentences.push({ text: t, line: li + 1 });
    }
  }

  return { raw, lines, cleanLines, excluded, sections, paragraphs, sentences, suppressions };
}

export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[\s　・、,，:：/／#*`「」()（）-]/g, "");
}

export function titleMatches(title: string, aliases: string[]): boolean {
  const t = normalizeTitle(title);
  if (!t) return false;
  return aliases.some((a) => {
    const n = normalizeTitle(a);
    return n.length > 0 && (t.includes(n) || n.includes(t));
  });
}
