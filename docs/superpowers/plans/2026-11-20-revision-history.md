# Revision history Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolving posts with two or more declared revisions get a "How this page has grown" timeline and one page per version, with the changes since the previous version marked.

**Architecture:** `lib/revisions.js` holds pure functions (parse Revisions, split front matter, block diff) and the git reader. `_data/revisions.js` runs it once per build. `src/writing-versions.njk` paginates one page per version through `_includes/post-version.njk`. `src/writing/writing.11tydata.js` adds the version styles to a post that has a timeline. `post.njk` places `_includes/fig-versions.njk` just before the `<h2>Revisions</h2>`. `assets/css/versions.css` styles it all. No new dependency: markdown-it is Eleventy's own (14.x), and the tests use `node --test`.

**Tech Stack:** Eleventy 3, Nunjucks, markdown-it, js-yaml, git CLI, node:test.

**Spec:** `docs/superpowers/specs/2026-11-20-revision-history-design.md`

## Global Constraints

- Version *n* = the *n*-th `- **D Mon YYYY.** text` line under `## Revisions`, by position. Declared at the first first-parent commit (oldest first) where the section has ≥ *n* lines. Content = the file at `<declare(n+1)>^1`; the newest = the working file.
- Only posts with ≥ 2 versions get anything.
- Version pages: `/writing/<slug>/v<n>/`, `noindex`, canonical to the live post, `eleventyExcludeFromCollections`, no Article JSON-LD. Old bodies are rendered as Markdown only; old front matter is used for the meta line; old `pageStyles` CSS is inlined as `<style>` from that commit (the CSP allows inline styles).
- Change marks: a 2px `--mark` left rule plus the word "new" (solid) or "changed" (dashed); removed blocks go in a `<details>`. No textures outside figures.
- Missing or shallow history: warn, produce nothing, and the build passes.
- No new colours; amber only on the banner (border and tint, ◆ icon and word).

## Review Focus

1. **Two revisions on one date** map to different commits. Owner: Task 1 test.
2. **Shallow clone or no git:** the build passes with no version pages. Owner: Task 4 check.
3. **A list item added inside an existing list** is marked inside the list, without splitting it. Owner: Task 1 diff test.
4. **Phone width:** the timeline stacks with no overflow. Owner: Task 4 five-view check.
5. **"Down and Out" (one revision)** builds byte-identical apart from the build stamp. Owner: Task 4 diff of `_site`.

---

### Task 1: Revision parsing, the version finder and the block diff (tested)

**Files:** Create `lib/revisions.js`, `tests/revisions.test.js`.

- **Produces:**
  - `parseRevisions(md) -> [{date, text}]`
  - `splitFrontMatter(src) -> {data, body}`
  - `diffBlocks(md, oldBody, newBody) -> html`, which marks new, changed and removed units
  - `renderBody(md, body) -> html`
  - `findVersions(file, {cwd}) -> {versions: [{n, date, text, commit, source}], warning}`
- **Tests:**
  - parse two same-date lines → 2 entries
  - lines outside the Revisions section are ignored
  - a fixture git repo (temp dir), built with 3 commits: v1 content+line, a typo fix, v2 content+line on the same date → v1 source holds the typo fix and not the v2 text; v2 = the working file
  - a shallow or non-git directory → `versions: []` and a warning
  - diff:
    - an added paragraph → `ver-mark--new`
    - an edited paragraph (≥ 50% shared words) → `ver-mark--changed`
    - a removed paragraph → a `details.ver-removed`
    - an added list item → an `li.ver-li--new` inside the same single `<ul>`
- [ ] Write the tests and see them fail; implement; see them pass (`node --test tests/`). Commit.

### Task 2: The second revision's content

**Files:** Modify `src/writing/reading-power-sphere-by-sphere.md`.

- Add `## What it could change` after "Who it's for", per the spec's content section. Add its Revisions line (same day, at the bottom) and set `updated:`. Make it one commit.
- [ ] Build; the section renders. Commit.

### Task 3: Pages, timeline and styles

**Files:**
- Create `_data/revisions.js`, `src/writing-versions.njk`, `src/_includes/post-version.njk`, `src/_includes/fig-versions.njk`, `src/writing/writing.11tydata.js`, `src/assets/css/versions.css`.
- Modify `src/_includes/post.njk` (the timeline before Revisions) and `src/_includes/base.njk` (a `canonicalPath` override).
- **The data** gives `{bySlug: {slug: [version…]}, pages: [version…]}`. Each version holds `slug, n, total, date, text, isLatest, data (front matter), html (marked body), css (inline old styles or "")`.
- [ ] Build. Check that `_site/writing/reading-power-sphere-by-sphere/v1/` and `v2/` exist, that v2 marks "What it could change" as new, and that v1 has no such heading. Check noindex, the canonical link, and that neither page is in `sitemap.xml` or `feed.xml`. Check that the live post shows the timeline with 2 steps, and that "Down and Out" has none. Commit.

### Task 4: Docs, workflow, checks

- [ ] Add `fetch-depth: 0` to `pr-check.yml`.
- [ ] Update `brand.md` (the banner state and change marks), `updating-copy.md` (a Revisions line makes a version; the same-commit rule), and `CHANGELOG.md`.
- [ ] Run the shallow-clone build: `git clone --depth 1 file://…`, then build. It passes with no `v1/` and a warning.
- [ ] Run `npm run build` and the CSP check. Run `site-check.js` on the post, `v1` and `v2`. Look at the screenshots. Print the page. Run the employer scan.
- [ ] Do a second pass, then show Grieves.
