// lib/revisions.js — revision history for evolving posts.
//
// A version is a declared revision: the n-th "- **D Mon YYYY.** text" line
// under a post's "## Revisions" heading, counted by position (so two on one
// day are fine). Revision n is declared by the first commit, oldest first on
// HEAD's first-parent line, whose Revisions section has at least n lines.
// Version n's content is the file at the parent of the commit that declares
// n+1 (typo fixes after a declaration stay in that version); the newest
// version is the working file. See
// docs/superpowers/specs/2026-11-20-revision-history-design.md.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { load } from "js-yaml";

const REVISION_LINE = /^- \*\*(.+?)\.\*\*\s*(.*)$/;

// parseRevisions(src) -> [{ date, text }] from the "## Revisions" section only.
export function parseRevisions(src) {
  const out = [];
  let inSection = false;
  for (const line of String(src || "").split("\n")) {
    if (/^##\s/.test(line)) {
      inSection = /^##\s+Revisions\s*$/.test(line);
      continue;
    }
    if (!inSection) continue;
    const m = line.match(REVISION_LINE);
    if (m) out.push({ date: m[1], text: m[2] });
  }
  return out;
}

// splitFrontMatter(src) -> { data, body }
export function splitFrontMatter(src) {
  const m = String(src || "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: String(src || "") };
  return { data: load(m[1]) || {}, body: m[2] };
}

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 32 * 1024 * 1024 });
}

// findVersions(file, { cwd }) -> { versions: [{ n, date, text, commit, source }], warning }
// file is relative to cwd. commit is the commit whose copy of the file is that
// version (null for the newest, which is the working file).
export function findVersions(file, { cwd = process.cwd() } = {}) {
  let current;
  try {
    current = readFileSync(path.join(cwd, file), "utf8");
  } catch {
    return { versions: [], warning: `revisions: cannot read ${file}` };
  }
  const now = parseRevisions(current);
  if (now.length < 2) return { versions: [], warning: null };

  try {
    if (git(cwd, ["rev-parse", "--is-shallow-repository"]).trim() === "true") {
      return { versions: [], warning: "revisions: shallow git history, so no version pages were built" };
    }
  } catch {
    return { versions: [], warning: "revisions: no git history here, so no version pages were built" };
  }

  let commits;
  try {
    commits = git(cwd, ["log", "--first-parent", "--reverse", "--format=%H", "--", file]).split("\n").filter(Boolean);
  } catch {
    return { versions: [], warning: `revisions: git log failed for ${file}` };
  }

  // declare[n] = first commit with at least n revision lines.
  const declare = {};
  for (const c of commits) {
    let count = 0;
    try {
      count = parseRevisions(git(cwd, ["show", `${c}:${file}`])).length;
    } catch {
      continue;
    }
    for (let n = 1; n <= count; n++) if (!declare[n]) declare[n] = c;
  }

  const versions = [];
  let warning = null;
  for (let n = 1; n <= now.length; n++) {
    let commit = null;
    let source = current;
    if (n < now.length) {
      try {
        commit = declare[n + 1] ? git(cwd, ["rev-parse", `${declare[n + 1]}^1`]).trim() : git(cwd, ["rev-parse", "HEAD"]).trim();
        source = git(cwd, ["show", `${commit}:${file}`]);
      } catch {
        warning = `revisions: version ${n} of ${file} was never committed on its own; left out`;
        continue;
      }
    }
    versions.push({ n, date: now[n - 1].date, text: now[n - 1].text, commit, source });
  }
  return { versions, warning };
}

// ── Block diff ─────────────────────────────────────────────────────────────
// A unit is a top-level block (paragraph, heading, HTML block, table…) or one
// list item. Units are compared by their text; an edited unit that keeps at
// least half its words is "changed", otherwise the pair is removed + new.

function closeIndex(tokens, i) {
  const t = tokens[i];
  if (t.nesting !== 1) return i;
  let depth = 0;
  for (let j = i; j < tokens.length; j++) {
    depth += tokens[j].nesting;
    if (depth === 0) return j;
  }
  return tokens.length - 1;
}

function textOf(tokens) {
  return tokens
    .map((t) => t.content || "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function units(md, body) {
  const tokens = md.parse(String(body || ""), {});
  const out = [];
  let listId = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const end = closeIndex(tokens, i);
    if (t.type === "bullet_list_open" || t.type === "ordered_list_open") {
      listId++;
      for (let j = i + 1; j < end; j++) {
        if (tokens[j].type === "list_item_open" && tokens[j].level === t.level + 1) {
          const k = closeIndex(tokens, j);
          const inner = tokens.slice(j + 1, k);
          out.push({ kind: "li", list: listId, listTag: t.tag, listAttrs: t.attrs, inner, text: "li: " + textOf(inner) });
          j = k;
        }
      }
    } else {
      const slice = tokens.slice(i, end + 1);
      out.push({ kind: "block", tokens: slice, text: textOf(slice) || slice.map((x) => x.type).join(",") });
    }
    i = end;
  }
  return out;
}

function lcsOps(a, b) {
  const n = a.length, m = b.length;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i][j] = a[i].text === b[j].text ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i].text === b[j].text) { ops.push({ op: "same", unit: b[j] }); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) ops.push({ op: "del", unit: a[i++] });
    else ops.push({ op: "add", unit: b[j++] });
  }
  while (i < n) ops.push({ op: "del", unit: a[i++] });
  while (j < m) ops.push({ op: "add", unit: b[j++] });
  return ops;
}

function words(s) {
  return new Set(s.toLowerCase().replace(/^li: /, "").match(/[\p{L}\p{N}']+/gu) || []);
}
function similar(a, b) {
  const A = words(a), B = words(b);
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.max(A.size, B.size) >= 0.5;
}

// Pair dels and adds inside each run between unchanged units.
function classify(ops) {
  const items = [];
  let k = 0;
  while (k < ops.length) {
    if (ops[k].op === "same") { items.push({ type: "same", unit: ops[k].unit }); k++; continue; }
    const dels = [], adds = [];
    while (k < ops.length && ops[k].op !== "same") {
      (ops[k].op === "del" ? dels : adds).push(ops[k].unit);
      k++;
    }
    const used = new Set();
    const marked = adds.map((u) => {
      const d = dels.findIndex((x, idx) => !used.has(idx) && x.kind === u.kind && similar(x.text, u.text));
      if (d >= 0) { used.add(d); return { type: "changed", unit: u }; }
      return { type: "new", unit: u };
    });
    const removed = dels.filter((_, idx) => !used.has(idx));
    if (removed.length) items.push({ type: "removed", units: removed });
    items.push(...marked);
  }
  return items;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function renderUnit(md, u) {
  if (u.kind === "li") return md.renderer.render(u.inner, md.options, {}).trim();
  return md.renderer.render(u.tokens, md.options, {});
}

function renderRemoved(md, units) {
  const body = units
    .map((u) => (u.kind === "li" ? `<ul><li>${renderUnit(md, u)}</li></ul>` : renderUnit(md, u)))
    .join("\n");
  return `<details class="ver-removed"><summary>Removed here (${units.length})</summary><div class="ver-removed__body">\n${body}\n</div></details>`;
}

// renderBody(md, body) -> html, no marks.
export function renderBody(md, body) {
  return md.render(String(body || ""));
}

// diffBlocks(md, oldBody, newBody) -> html of newBody with changes since oldBody marked.
export function diffBlocks(md, oldBody, newBody) {
  if (oldBody == null) return renderBody(md, newBody);
  const items = classify(lcsOps(units(md, oldBody), units(md, newBody)));
  const out = [];
  let open = null; // { list, tag }
  const closeList = () => { if (open) { out.push(`</${open.tag}>`); open = null; } };
  const listOpenTag = (u) => `<${u.listTag}${(u.listAttrs || []).map(([k, v]) => ` ${k}="${esc(v)}"`).join("")}>`;
  for (let idx = 0; idx < items.length; idx++) {
    const it = items[idx];
    // A run of new units that doesn't continue an open list gets one mark:
    // headings, paragraphs and whole new lists inside a single wrapper.
    if (it.type === "new" && !(it.unit.kind === "li" && open && open.list === it.unit.list)) {
      closeList();
      const run = [];
      while (idx < items.length && items[idx].type === "new") { run.push(items[idx].unit); idx++; }
      idx--;
      const inner = [];
      let gl = null;
      for (const u of run) {
        if (u.kind === "li") {
          if (!gl || gl.list !== u.list) { if (gl) inner.push(`</${gl.tag}>`); inner.push(listOpenTag(u)); gl = { list: u.list, tag: u.listTag }; }
          inner.push(`<li>${renderUnit(md, u)}</li>`);
        } else {
          if (gl) { inner.push(`</${gl.tag}>`); gl = null; }
          inner.push(renderUnit(md, u));
        }
      }
      if (gl) inner.push(`</${gl.tag}>`);
      // A list left open by the run continues outside it only via a new list.
      out.push(`<div class="ver-mark ver-mark--new"><p class="ver-tag">new</p>\n${inner.join("\n")}</div>`);
      continue;
    }
    if (it.type === "removed") {
      const next = items.slice(idx + 1).find((x) => x.type !== "removed");
      if (open && next && next.unit.kind === "li" && next.unit.list === open.list) {
        out.push(`<li class="ver-li ver-li--removed">${renderRemoved(md, it.units)}</li>`);
      } else {
        closeList();
        out.push(renderRemoved(md, it.units));
      }
      continue;
    }
    const u = it.unit;
    const tag = it.type === "same" ? "" : `<span class="ver-tag">${it.type}</span> `;
    if (u.kind === "li") {
      if (!open || open.list !== u.list) {
        closeList();
        const attrs = (u.listAttrs || []).map(([k, v]) => ` ${k}="${esc(v)}"`).join("");
        out.push(`<${u.listTag}${attrs}>`);
        open = { list: u.list, tag: u.listTag };
      }
      const cls = it.type === "same" ? "" : ` class="ver-li ver-li--${it.type}"`;
      out.push(`<li${cls}>${tag}${renderUnit(md, u)}</li>`);
    } else {
      closeList();
      const html = renderUnit(md, u);
      out.push(it.type === "same" ? html : `<div class="ver-mark ver-mark--${it.type}"><p class="ver-tag">${it.type}</p>\n${html}</div>`);
    }
  }
  closeList();
  return out.join("\n");
}
