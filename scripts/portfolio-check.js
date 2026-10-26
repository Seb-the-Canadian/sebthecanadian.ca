#!/usr/bin/env node
/**
 * portfolio-check.js — the publishing gate for case studies.
 *
 * Case studies on this site are practice pieces: one way I've approached a
 * problem, told through an invented example, with nothing specific to any employer (the "Open tier"; see
 * docs/portfolio-clearance.md). This script makes that rule part of the build:
 *
 *   1. Every case study carries a clearance record in its front matter.
 *   2. The record is current: if the page changed after it was reviewed, the
 *      build fails until it is reviewed and stamped again.
 *   3. No blocked term appears anywhere in the file (text, scripts, comments,
 *      metadata). Terms are stored only as hashes, so the list itself never
 *      publishes the names it protects.
 *   4. The page shows the standard practice-piece note.
 *   5. Each case study invents its own organization, in its own sector. Read
 *      together, entries sharing one fictional organization could add up to a
 *      portrait of a real employer even when each passes on its own.
 *
 * Case studies = every file under src/projects/ (any depth), plus any file
 * elsewhere tagged "case-study". The Projects index (src/projects.njk) is not
 * under that folder and is not checked.
 *
 * Usage
 *   node scripts/portfolio-check.js                     check every case study (runs in `npm run build`)
 *   node scripts/portfolio-check.js --scan <file>...    scan any file for terms (drafts outside the site)
 *   node scripts/portfolio-check.js --stamp <file>      record a completed review on a case study
 *   node scripts/portfolio-check.js --add-term block "<term>"   add a term (stored as a hash only)
 *   node scripts/portfolio-check.js --add-term warn  "<term>"
 *
 * Zero dependencies beyond js-yaml, which the site already uses.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

// The repo root is the folder above scripts/, wherever the command is run from.
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "src");
const CASE_DIR = join(SRC, "projects");
const TERMS_FILE = join(ROOT, "portfolio", "terms.json");
const NOTE_INCLUDE = "clearance-note.njk";
const MAX_NGRAM = 5;
const CONTENT_EXT = new Set([".njk", ".md", ".html", ".liquid"]);
const SELF_TEST_KEYS = [
  "unethical",      // could it be seen as unethical, dishonest or discriminatory?
  "culture",        // could it conflict with the employer's culture or code?
  "reputation",     // could it harm the employer's reputation?
  "publicHarm",     // could it harm me or the employer if made public?
  "consequences",   // could acting (or not) lead to consequences?
  "negativeImpact", // could it hurt the employer, its customers, colleagues or community?
  "policy",         // could it breach a policy or the code?
  "recognizable",   // would a colleague learn a specific real system, decision, defect, person or event from it?
                    // (recognizing the method as mine is fine; learning a fact about an employer is not)
];

/* ── Text normalization + hashing ─────────────────────────────────────── */

function tokens(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}
function sha(s) {
  return createHash("sha256").update(s).digest("hex");
}
function termHash(term) {
  return sha("term:" + tokens(term).join(" "));
}

function loadTerms() {
  if (!existsSync(TERMS_FILE)) {
    console.error("portfolio-check: term list not found at " + TERMS_FILE + ". Refusing to check without it.");
    process.exit(2);
  }
  const t = JSON.parse(readFileSync(TERMS_FILE, "utf-8"));
  return { block: t.block || [], warn: t.warn || [] };
}

/** Find every n-gram (1..MAX_NGRAM words) whose hash is on a list. */
function scanText(text, terms) {
  const block = new Set(terms.block), warn = new Set(terms.warn);
  const words = tokens(text);
  const hits = { block: new Map(), warn: new Map() };
  for (let i = 0; i < words.length; i++) {
    let gram = "";
    for (let n = 1; n <= MAX_NGRAM && i + n <= words.length; n++) {
      gram = n === 1 ? words[i] : gram + " " + words[i + n - 1];
      const h = sha("term:" + gram);
      for (const kind of ["block", "warn"]) {
        if ((kind === "block" ? block : warn).has(h)) {
          hits[kind].set(gram, (hits[kind].get(gram) || 0) + 1);
        }
      }
    }
  }
  return hits;
}

/* ── Front matter ─────────────────────────────────────────────────────── */

const FM = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parse(file) {
  const raw = readFileSync(file, "utf-8");
  const m = raw.match(FM);
  const data = m ? yaml.load(m[1]) || {} : {};
  const body = m ? raw.slice(m[0].length) : raw;
  return { raw, data, body, fmText: m ? m[1] : null };
}

/** Hash of everything a reader can see: the body plus every front-matter
 *  field except the clearance record itself (titles and descriptions publish
 *  too). Whitespace-only edits don't change it. */
function stable(v) {
  if (v instanceof Date) return JSON.stringify(v.toISOString());
  if (Array.isArray(v)) return "[" + v.map(stable).join(",") + "]";
  if (v && typeof v === "object") {
    return "{" + Object.keys(v).sort().map((k) => JSON.stringify(k) + ":" + stable(v[k])).join(",") + "}";
  }
  return JSON.stringify(v);
}
function contentHash({ data, body }) {
  const meta = { ...data };
  delete meta.clearance;
  const sorted = stable(meta);
  const text = body.replace(/\r\n/g, "\n").split("\n").map((l) => l.trimEnd()).join("\n").trim();
  return sha("content:" + sorted + "\n" + text).slice(0, 16);
}

/* ── Which files are case studies ─────────────────────────────────────── */

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (CONTENT_EXT.has(extname(p))) out.push(p);
  }
  return out;
}
function caseStudies() {
  const files = new Set(walk(CASE_DIR));
  for (const f of walk(SRC)) {
    if (files.has(f)) continue;
    const { data } = parse(f);
    const tags = [].concat(data.tags || []);
    if (tags.includes("case-study")) files.add(f);
  }
  return [...files].sort();
}

/* ── Checks ───────────────────────────────────────────────────────────── */

function checkRecord(file, parsed) {
  const errors = [];
  const c = parsed.data.clearance;
  if (!c || typeof c !== "object") {
    return ["no clearance record in front matter (see docs/portfolio-clearance.md)"];
  }
  if (c.tier !== "open") errors.push(`clearance.tier must be "open" (found ${JSON.stringify(c.tier)})`);
  if (!Array.isArray(c.invented) || c.invented.length === 0) {
    errors.push("clearance.invented must list what in the entry is invented");
  }
  for (const k of ["organization", "sector"]) {
    if (typeof c[k] !== "string" || !c[k].trim()) {
      errors.push(`clearance.${k} must name the invented ${k === "sector" ? "organization's sector" : "organization"}`);
    }
  }
  const st = c.selfTest || {};
  for (const k of SELF_TEST_KEYS) {
    const v = st[k];
    if (!(v === "no" || v === false)) errors.push(`clearance.selfTest.${k} must be "no" (found ${JSON.stringify(v)})`);
  }
  if (!c.reviewed || !c.contentHash) {
    errors.push("not stamped: run  node scripts/portfolio-check.js --stamp " + relative(ROOT, file));
  } else if (c.contentHash !== contentHash(parsed)) {
    const when = c.reviewed instanceof Date ? c.reviewed.toISOString().slice(0, 10) : String(c.reviewed);
    errors.push("changed since it was reviewed on " + when +
      ": review it again, then run --stamp");
  }
  const usesLayout = /case-study/.test(String(parsed.data.layout || ""));
  if (!usesLayout && !parsed.body.includes(NOTE_INCLUDE)) {
    errors.push(`page doesn't show the practice-piece note: include "${NOTE_INCLUDE}" or use the case-study layout`);
  }
  return errors;
}

/** Errors for a case study whose invented organization or sector is already
 *  used by another case study. */
function sharedExample(file, record, others) {
  const key = (v) => (typeof v === "string" ? tokens(v).join(" ") : "");
  const errors = [];
  for (const [other, rec] of others) {
    if (resolve(other) === resolve(file) || !rec) continue;
    for (const k of ["organization", "sector"]) {
      if (key(record?.[k]) && key(record[k]) === key(rec[k])) {
        errors.push(`clearance.${k} "${record[k]}" is also used by ${relative(ROOT, other)}: each case study needs its own`);
      }
    }
  }
  return errors;
}
function records(files) {
  return new Map(files.map((f) => [f, parse(f).data.clearance]));
}

function report(label, hits) {
  const lines = [];
  for (const [gram, n] of hits.block) lines.push(`  ✗ blocked term "${gram}" (${n}×)`);
  for (const [gram, n] of hits.warn) lines.push(`  ! check "${gram}" (${n}×): allowed, but make sure it isn't employer-specific`);
  return lines;
}

/* ── Commands ─────────────────────────────────────────────────────────── */

function runCheck() {
  const terms = loadTerms();
  const files = caseStudies();
  if (files.length === 0) {
    console.log("portfolio-check: no case studies yet. Nothing to check.");
    return 0;
  }
  let failed = 0;
  const all = records(files);
  for (const f of files) {
    const parsed = parse(f);
    const hits = scanText(parsed.raw, terms);
    const errors = [...checkRecord(f, parsed), ...sharedExample(f, parsed.data.clearance, all)];
    const lines = [...errors.map((e) => "  ✗ " + e), ...report(f, hits)];
    const bad = errors.length > 0 || hits.block.size > 0;
    if (bad) failed++;
    console.log(`${bad ? "✗" : "✓"} ${relative(ROOT, f)}`);
    lines.forEach((l) => console.log(l));
  }
  console.log(failed
    ? `portfolio-check: ${failed} of ${files.length} case studies can't publish yet.`
    : `portfolio-check: ${files.length} case studies clear.`);
  return failed ? 1 : 0;
}

function runScan(paths) {
  const terms = loadTerms();
  let blocked = 0;
  for (const p of paths) {
    const hits = scanText(readFileSync(p, "utf-8"), terms);
    blocked += hits.block.size;
    console.log(`${hits.block.size ? "✗" : "✓"} ${p}`);
    report(p, hits).forEach((l) => console.log(l));
  }
  return blocked ? 1 : 0;
}

function runStamp(file) {
  if (!file || !existsSync(file)) { console.error("--stamp needs the path of a case study"); return 2; }
  const parsed = parse(file);
  if (parsed.fmText === null) { console.error("no front matter found"); return 1; }
  const hits = scanText(parsed.raw, loadTerms());
  if (hits.block.size) {
    console.error("Not stamped: blocked terms are present.");
    report(file, hits).forEach((l) => console.error(l));
    return 1;
  }
  const c = parsed.data.clearance || {};
  const pre = { ...parsed, data: { ...parsed.data, clearance: { ...c, reviewed: "x", contentHash: "x" } } };
  const problems = [
    ...checkRecord(file, pre).filter((e) => !/changed since|not stamped/.test(e)),
    ...sharedExample(file, c, records(caseStudies())),
  ];
  if (problems.length) {
    console.error("Not stamped: the clearance record isn't complete.");
    problems.forEach((e) => console.error("  ✗ " + e));
    return 1;
  }
  const today = new Date().toISOString().slice(0, 10);
  const hash = contentHash(parsed);
  // Rewrite only the two stamp lines inside the clearance block, so the rest of
  // the front matter (comments, order) stays exactly as written.
  let fm = parsed.fmText;
  const set = (key, value) => {
    const re = new RegExp(`^([ \\t]+)${key}:.*$`, "m");
    if (re.test(fm)) fm = fm.replace(re, `$1${key}: ${value}`);
    else fm = fm.replace(/^clearance:\s*$/m, `clearance:\n  ${key}: ${value}`);
  };
  set("contentHash", hash);
  set("reviewed", today);
  writeFileSync(file, parsed.raw.replace(parsed.fmText, fm));
  const after = parse(file);
  if (after.data.clearance?.contentHash !== hash || contentHash(after) !== hash) {
    console.error("Stamp didn't take: check the clearance block's indentation.");
    return 1;
  }
  console.log(`Stamped ${relative(ROOT, file)}: reviewed ${today}, content ${hash}.`);
  return 0;
}

function runAddTerm(kind, term) {
  if (!["block", "warn"].includes(kind) || !term) {
    console.error('Usage: --add-term block|warn "<term>"');
    return 2;
  }
  const t = existsSync(TERMS_FILE) ? loadTerms() : { block: [], warn: [] };
  const h = termHash(term);
  if (!t[kind].includes(h)) t[kind].push(h);
  const other = kind === "block" ? "warn" : "block";
  t[other] = t[other].filter((x) => x !== h);
  writeFileSync(TERMS_FILE, JSON.stringify({ ...t, block: t.block.sort(), warn: t.warn.sort() }, null, 2) + "\n");
  console.log(`Added a ${kind} term (${tokens(term).length} word${tokens(term).length === 1 ? "" : "s"}). Only its hash is stored.`);
  return 0;
}

const [cmd, ...rest] = process.argv.slice(2);
let code;
if (!cmd) code = runCheck();
else if (cmd === "--scan") code = runScan(rest);
else if (cmd === "--stamp") code = runStamp(rest[0]);
else if (cmd === "--add-term") code = runAddTerm(rest[0], rest.slice(1).join(" "));
else { console.error("Unknown option. See the comment at the top of scripts/portfolio-check.js."); code = 2; }
process.exit(code);
