// tests/revisions.test.js — run with: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import markdownIt from "markdown-it";
import { parseRevisions, splitFrontMatter, findVersions, diffBlocks } from "../lib/revisions.js";

const md = markdownIt({ html: true });

const post = (body, revs) =>
  `---\ntitle: "T"\n---\n\n${body}\n\n## Revisions\n\n${revs.map((r) => `- **${r[0]}.** ${r[1]}`).join("\n")}\n\n## Sources\n\n- **Not a revision.** ignore me\n`;

test("parseRevisions reads lines by position, same dates included, and only inside the section", () => {
  const src = post("Body.\n\n- **1 Jan 2026.** looks like one but is above", [["20 Nov 2026", "First."], ["20 Nov 2026", "Second."]]);
  const revs = parseRevisions(src);
  assert.deepEqual(revs, [
    { date: "20 Nov 2026", text: "First." },
    { date: "20 Nov 2026", text: "Second." },
  ]);
});

test("splitFrontMatter separates data from body", () => {
  const { data, body } = splitFrontMatter("---\ntitle: \"Hi\"\nstage: seedling\n---\n\nText\n");
  assert.equal(data.title, "Hi");
  assert.equal(data.stage, "seedling");
  assert.equal(body.trim(), "Text");
});

function git(dir, ...args) {
  return execFileSync("git", args, { cwd: dir, encoding: "utf8", env: { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" } });
}

test("findVersions: v1 keeps later typo fixes, excludes v2's text; newest is the working file", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "revs-"));
  git(dir, "init", "-q", "-b", "main");
  mkdirSync(path.join(dir, "w"));
  const f = path.join(dir, "w", "p.md");
  writeFileSync(f, post("Teh first idea.", [["20 Nov 2026", "First."]]));
  git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "v1");
  writeFileSync(f, post("The first idea.", [["20 Nov 2026", "First."]]));
  git(dir, "commit", "-q", "-am", "typo");
  writeFileSync(f, post("The first idea.\n\nA second thought.", [["20 Nov 2026", "First."], ["20 Nov 2026", "Second."]]));
  git(dir, "commit", "-q", "-am", "v2");
  const { versions, warning } = findVersions("w/p.md", { cwd: dir });
  assert.equal(warning, null);
  assert.equal(versions.length, 2);
  assert.match(versions[0].source, /The first idea\./);
  assert.doesNotMatch(versions[0].source, /A second thought/);
  assert.match(versions[1].source, /A second thought/);
  assert.equal(versions[1].commit, null); // newest = working file
  assert.deepEqual(versions.map((v) => v.n), [1, 2]);
});

test("findVersions: no git history gives no versions and a warning", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "nogit-"));
  writeFileSync(path.join(dir, "p.md"), post("x", [["1 Jan 2026", "a"], ["2 Jan 2026", "b"]]));
  const { versions, warning } = findVersions("p.md", { cwd: dir });
  assert.deepEqual(versions, []);
  assert.ok(warning);
});

test("diffBlocks marks new, changed and removed blocks", () => {
  const oldB = "Kept paragraph here.\n\nThe tests are written so evidence can prove them wrong.\n\nThis one goes away entirely.";
  const newB = "Kept paragraph here.\n\nThe tests are meant to be ones evidence can prove them wrong.\n\nBrand new thought.";
  const html = diffBlocks(md, oldB, newB);
  assert.match(html, /<p>Kept paragraph here\.<\/p>/);
  assert.match(html, /ver-mark--changed[\s\S]*meant to be ones/);
  assert.match(html, /ver-mark--new[\s\S]*Brand new thought/);
  assert.match(html, /<details class="ver-removed">[\s\S]*goes away entirely/);
});

test("diffBlocks marks an added list item inside the same single list", () => {
  const html = diffBlocks(md, "- one\n- two", "- one\n- two\n- three");
  assert.equal((html.match(/<ul>/g) || []).length, 1);
  assert.match(html, /<li class="ver-li ver-li--new">[\s\S]*three/);
});

test("diffBlocks with no old body marks nothing", () => {
  const html = diffBlocks(md, null, "Only text.");
  assert.doesNotMatch(html, /ver-mark/);
});

test("diffBlocks marks a wholly new run (heading, paragraph, new list) once", () => {
  const html = diffBlocks(md, "Intro.", "Intro.\n\n## Added\n\nA para.\n\n- a\n- b\n\nEnd para.");
  assert.equal((html.match(/ver-mark--new/g) || []).length, 1);
  assert.doesNotMatch(html, /ver-li--new/);
  assert.match(html, /ver-mark--new[\s\S]*<h2>Added<\/h2>[\s\S]*<li>a<\/li>[\s\S]*End para[\s\S]*<\/div>/);
});

test("findVersions: a fix after the next declaration stays out of the earlier version", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "revs-"));
  git(dir, "init", "-q", "-b", "main");
  const f = path.join(dir, "p.md");
  writeFileSync(f, post("First idea.", [["1 Jan 2026", "a"]]));
  git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "v1");
  writeFileSync(f, post("First idea.\n\nSecnd thought.", [["1 Jan 2026", "a"], ["2 Jan 2026", "b"]]));
  git(dir, "commit", "-q", "-am", "v2");
  writeFileSync(f, post("First idea.\n\nSecond thought.", [["1 Jan 2026", "a"], ["2 Jan 2026", "b"]]));
  git(dir, "commit", "-q", "-am", "typo in v2");
  const { versions } = findVersions("p.md", { cwd: dir });
  assert.doesNotMatch(versions[0].source, /thought/);
  assert.match(versions[1].source, /Second thought/);
});

test("findVersions: on a merge commit, the earlier version is the main line before the merge", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "revs-"));
  git(dir, "init", "-q", "-b", "main");
  const f = path.join(dir, "p.md");
  writeFileSync(f, post("First idea.", [["1 Jan 2026", "a"]]));
  git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "v1");
  git(dir, "checkout", "-q", "-b", "pr");
  writeFileSync(f, post("First idear.", [["1 Jan 2026", "a"]]));
  git(dir, "commit", "-q", "-am", "edit on the branch");
  writeFileSync(f, post("First idear.\n\nSecond thought.", [["1 Jan 2026", "a"], ["2 Jan 2026", "b"]]));
  git(dir, "commit", "-q", "-am", "v2");
  git(dir, "checkout", "-q", "main");
  writeFileSync(path.join(dir, "other.txt"), "x");
  git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "main moves");
  git(dir, "merge", "-q", "--no-ff", "-m", "merge pr", "pr");
  const { versions } = findVersions("p.md", { cwd: dir });
  assert.match(versions[0].source, /First idea\./);
  assert.match(versions[1].source, /Second thought/);
});

test("findVersions: a shallow clone gives no versions and a warning", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "revs-"));
  git(dir, "init", "-q", "-b", "main");
  const f = path.join(dir, "p.md");
  writeFileSync(f, post("A.", [["1 Jan 2026", "a"]]));
  git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "v1");
  writeFileSync(f, post("A.\n\nB.", [["1 Jan 2026", "a"], ["2 Jan 2026", "b"]]));
  git(dir, "commit", "-q", "-am", "v2");
  const shallow = mkdtempSync(path.join(tmpdir(), "shallow-"));
  git(shallow, "clone", "-q", "--depth", "1", `file://${dir}`, "c");
  const { versions, warning } = findVersions("p.md", { cwd: path.join(shallow, "c") });
  assert.deepEqual(versions, []);
  assert.match(warning, /shallow/);
});

test("diffBlocks keeps one list when a new item comes first or one is removed from the middle", () => {
  const first = diffBlocks(md, "Intro.\n\n1. two\n2. three", "Intro.\n\nNew para.\n\n1. one\n2. two\n3. three");
  assert.equal((first.match(/<ol>/g) || []).length, 1);
  assert.match(first, /<ol>\s*<li class="ver-li ver-li--new">[\s\S]*one[\s\S]*<li>two<\/li>/);
  const mid = diffBlocks(md, "- one\n- two\n- three", "- one\n- three");
  assert.equal((mid.match(/<ul>/g) || []).length, 2); // the list, and the removed item's own box
  assert.match(mid, /<li>one<\/li>\s*<li class="ver-li ver-li--removed">[\s\S]*two[\s\S]*<\/li>\s*<li>three<\/li>\s*<\/ul>/);
});

test("diffBlocks keeps an ordered list's start number", () => {
  assert.match(diffBlocks(md, "3. c\n4. d", "3. c\n4. d\n5. e"), /<ol start="3">/);
});

test("diffBlocks pairs a changed unit only with one of its own kind", () => {
  const html = diffBlocks(md, "Alpha beta gamma delta.", "- Alpha beta gamma delta");
  assert.doesNotMatch(html, /changed/);
  assert.match(html, /ver-removed[\s\S]*ver-mark--new/);
});

test("findVersions: two revisions in one merged branch keep a correct middle version; a squash leaves it out with a warning", () => {
  const make = () => {
    const dir = mkdtempSync(path.join(tmpdir(), "revs-two-"));
    git(dir, "init", "-q", "-b", "main");
    mkdirSync(path.join(dir, "w"));
    writeFileSync(path.join(dir, "other.txt"), "x");
    const f = path.join(dir, "w", "p.md");
    writeFileSync(f, post("A.", [["1 Jan 2026", "one"]]));
    git(dir, "add", "-A"); git(dir, "commit", "-q", "-m", "v1");
    git(dir, "checkout", "-q", "-b", "feat");
    writeFileSync(f, post("A.\n\nB.", [["1 Jan 2026", "one"], ["2 Jan 2026", "two"]]));
    git(dir, "commit", "-q", "-am", "v2");
    writeFileSync(f, post("A.\n\nB.\n\nC.", [["1 Jan 2026", "one"], ["2 Jan 2026", "two"], ["3 Jan 2026", "three"]]));
    git(dir, "commit", "-q", "-am", "v3");
    git(dir, "checkout", "-q", "main");
    writeFileSync(path.join(dir, "other.txt"), "y");
    git(dir, "commit", "-q", "-am", "main moves");
    return dir;
  };
  const m = make();
  git(m, "merge", "-q", "--no-ff", "-m", "merge", "feat");
  const merged = findVersions("w/p.md", { cwd: m });
  assert.deepEqual(merged.versions.map((v) => v.n), [1, 2, 3]);
  assert.doesNotMatch(merged.versions[0].source, /B\./);
  assert.match(merged.versions[1].source, /B\./);
  assert.doesNotMatch(merged.versions[1].source, /C\./);

  const s = make();
  git(s, "merge", "-q", "--squash", "feat"); git(s, "commit", "-q", "-m", "squash");
  const squashed = findVersions("w/p.md", { cwd: s });
  assert.deepEqual(squashed.versions.map((v) => v.n), [1, 3]);
  assert.ok(squashed.warning);
});
