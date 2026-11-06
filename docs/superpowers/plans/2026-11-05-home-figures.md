# Home figures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put two pen-and-pixel figures on the home page (the join, the writing bed), move their stories to About and the Writing room, and record the new rules, so the site reads as one thing with the writing at its living centre.

**Architecture:** Two Nunjucks includes render the figures from data; one shared stylesheet styles them; one Eleventy filter groups the writing collection for both the home bed and the room's index; the home, About and Writing templates compose them. No script, no new font, no image. Three structural additions (two includes, one stylesheet, one data file and key) are proposed in the PR before work starts.

**Tech Stack:** Eleventy 3, Nunjucks, vanilla CSS on `tokens.css` and the `--mark-*` tokens, inline SVG, Playwright + axe-core for checks.

**Spec:** `/home/user/sebthecanadian-audit-2026-11-04/spec-2026-11-05-home-figures-design.md` (copy to `docs/superpowers/specs/2026-11-05-home-figures-design.md` on the branch).

## Global constraints

The audit plan's constraints apply verbatim (`plan.md` → Global constraints): one branch (`audit/home-figures`), never push to `main`, push only when Seb asks, never merge, never stamp, scan every changed file with `node scripts/portfolio-check.js --scan` before pushing, `npx @11ty/eleventy` for previews, the five-view check after any visual change, brand.md and CHANGELOG in the same commit as a rule change, propose structural items first, "one way I've done this" voice, attribution lines on commits. Additional for this plan:

- Marks only from the `--mark-*` tokens; moss only for `newest` and the governed path; amber only on the `IN PROGRESS` pill with its ◆.
- Nothing from the case-study substrate (`.story`, `data-aud`, `case-study.js`) is used on these pages.
- This branch starts from a base that includes audit Phases 2 and 4 (tissue and words). If they have not landed, it branches from `main` and the implementer leaves the identity line and the open-to data key to Phase 4, rendering the open-to line only when `site.openTo` exists (it will not yet).

## Review focus

1. **A post with no `stage`** must render a chip with no strip and the hidden text "stage not set", not a seedling. Owner: Task 2's fixture includes one such post.
2. **A post with `inProgress: true` and `type: note`** goes to `evolving/`, not `notes/`. Owner: Task 2's filter test.
3. **Zero posts** renders no bed and no empty eyebrow. Owner: Task 2's fixture.
4. **The join at 390px** must not overflow; the vertical SVG shows and the horizontal hides. Owner: Task 1's five-view check.
5. **Screen readers get the meaning without the marks**: each chip's hidden stage word, the legend's words, the SVG's sentence. Owner: Task 1 and Task 2 axe runs plus an accessibility-tree read.
6. **Print** keeps the marks and drops fills. Owner: Task 3's print emulation.
7. **The WRITE row's count** says "1 piece" at one and "N pieces" above one. Owner: Task 2's `pluralPieces` test.

---

### Task 1: The join figure include and the shared stylesheet

**Files:**
- Create: `src/_includes/fig-join.njk`
- Create: `src/assets/css/figures.css`
- Modify: `src/index.njk` (add `pageStyles: [/assets/css/figures.css]` to front matter; insert `{% set figState = 3 %}{% include "fig-join.njk" %}` after the lede block)

**Interfaces:**
- Produces: `fig-join.njk` reading two optional variables set before the include: `figState` (1 | 2 | 3, default 3) and `figId` (string, default `fig-join`). Produces classes `.fig`, `.fig--join`, `.fig__title`, `.fig__legend`, `.fig__mk`, `.fig__mk--ruled|--hatch|--solid|--dither|--dashed|--moss`, `.chip`, `.chip--ruled|--hatch` for Task 2 and Task 3 to reuse.

- [ ] **Step 1: Propose** the structural items in the PR description (two includes, one stylesheet, one data file and key), then continue.
- [ ] **Step 2: Failing check.** `npx @11ty/eleventy && grep -c 'fig--join' _site/index.html` → 0.
- [ ] **Step 3: Write `figures.css`** from the patterns in `src/assets/css/posts/revisiting-down-and-out.css` (`.rdo-fig`, `.rdo-mk`, `.rdo-chip`), renamed to `.fig*` and `.chip*`, with: panel (`--bg-alt`, 1px `--rule`, `--radius`, 1rem padding), mono title 11.5px uppercase `--muted`, legend list (flex, wrap, 14px swatches with the mark in `--mark`), chips (mono `--text-xs`, 1px `--mark` border, 5px radius, min-height 26px, a 6px left strip carrying the mark via `background-image`, text on `--bg`), the join's two boxes (`--bg`, 1px `--rule`, 8px radius, 0.8rem padding, Fraunces 600 box titles), the SVG sizing (horizontal `display:block` at ≥601px, vertical at ≤600px), and the print block that re-asserts marks only.
- [ ] **Step 4: Write `fig-join.njk`** with the markup in spec 4.1: `figure.fig.fig--join[aria-labelledby=figId+'-title']`; the system box with four `.chip.chip--ruled`; the people box with three `.chip.chip--hatch` (states 2 and 3 only); the horizontal SVG (viewBox 0 0 220 120): state 2 a dashed `--mark` line with the mono text `unresolved`; state 3 a 2px `--moss` path with an arrowhead from right to left labelled `the governed path`, and a dotted `--muted` U-shaped detour below it labelled `the ungoverned one`; the vertical SVG (viewBox 0 0 120 160) with the same elements rotated; legend (state 3 only; state 2 shows ruled and hatch; state 1 shows ruled); figcaption (state 3: `Moss marks the path to look at.`). SVGs: `role="img"`, `aria-label` sentences per state; marks `aria-hidden="true"`.
- [ ] **Step 5: Wire the home.** Insert after the lede in `src/index.njk`; add the stylesheet to `pageStyles`.
- [ ] **Step 6: Passing checks.** `npx @11ty/eleventy && grep -c 'fig--join' _site/index.html` → 1. Five-view check on `/`: PASS, no overflow at 390, the vertical SVG visible at 390 and the horizontal at 1280 (screenshot both). axe on `/` light and dark: 0 violations. Accessibility tree: the figure is named "THE JOIN · SCHEMATIC", the SVG reads its sentence, the legend reads its words.
- [ ] **Step 7: Scan and commit.** `node scripts/portfolio-check.js --scan src/_includes/fig-join.njk src/assets/css/figures.css src/index.njk`; `git commit -m "feat(home): the join figure and the shared figure stylesheet"`.

### Task 2: The writing bed include and the grouping filter

**Files:**
- Modify: `eleventy.config.js` (add filters `groupWriting`, `pluralPieces`; remove the `writingRecent` collection)
- Create: `src/_includes/fig-writing-bed.njk`
- Modify: `src/index.njk` (replace the WRITING index rows with the include; keep `All writing →`)
- Test fixture (not committed): a scratch copy with 12 placeholder posts under `src/writing/`, and a second scratch with 0 posts

**Interfaces:**
- Consumes: `.fig*` and `.chip*` classes from Task 1.
- Produces: `groupWriting(items)` → `{ notes: [], essays: [], evolving: [], newest: item|null, total: n }` where each array is sorted newest first and each item is the collection item; `pluralPieces(n)` → `"1 piece"` / `"n pieces"`. Task 3 consumes both.

- [ ] **Step 1: Failing checks.** In a scratch copy with the fixture: `node -e` against the filter is not possible before it exists; record that `_site/index.html` contains `index-row h-entry` rows under WRITING (today's list) and no `fig--bed`.
- [ ] **Step 2: Implement `groupWriting`** in `eleventy.config.js` with the spec 4.2 rules: `inProgress` → `evolving`; `type === "essay"` → `essays`; otherwise `notes`; `newest` = the item with the greatest `date` across all; `total` = items.length. Implement `pluralPieces`. Delete `writingRecent`.
- [ ] **Step 3: Filter test** (a scratch Node script that imports the config function with a stub `eleventyConfig` capturing `addFilter`, or a scratch build of the fixture whose output is grepped): given 12 fixture posts (4 notes seedling, 2 notes budding, 1 note with no stage, 2 essays budding, 1 essay evergreen, 1 note `inProgress`, 1 essay `inProgress`), expect `notes.length === 7`, `essays.length === 3`, `evolving.length === 2`, `newest` the fixture dated latest; `pluralPieces(1) === "1 piece"`, `pluralPieces(12) === "12 pieces"`.
- [ ] **Step 4: Write `fig-writing-bed.njk`** per spec 4.2: `{% set bed = collections.writing | groupWriting %}`; render nothing when `bed.total == 0`; legend showing `moss · newest` plus only the stage marks present; groups in the order notes, essays, evolving, each omitted when empty, each a row with a mono label, up to 12 chips, a `+N more →` chip linking to `/writing/`, and a mono count; chips `a.chip.chip--<stage or 'unset'>` with `<span class="sr-only">, <stage word or 'stage not set'></span>`; `inProgress` chips carry the existing `.index-pill.index-pill--active` with `◆` and `IN PROGRESS`; the newest chip adds `.chip--newest` and a following `<span class="chip__newest">newest</span>`.
- [ ] **Step 5: Styles.** Add to `figures.css`: `.fig--bed .bed__group` (grid: label 8ch, chips 1fr, count auto; stacks at ≤520px), `.chip--seedling` (1.5px dashed `--mark` border, no strip), `.chip--budding` (hatch strip), `.chip--evergreen` (solid strip), `.chip--unset` (plain), `.chip--newest` (2px `--moss` outline, dashed when also seedling), `.chip__newest` (mono `--text-xs` `--moss`).
- [ ] **Step 6: Wire the home.** Replace the WRITING rows with the include; keep the eyebrow and `All writing →`; remove the `writing/` in-progress row from WORK (it lives in `evolving/`).
- [ ] **Step 7: Passing checks.** Real build: `grep -c 'fig--bed' _site/index.html` → 1; the bed shows `notes/` with one chip (newest, moss outline) and `evolving/` with the in-progress post and its pill; the legend lists `dashed · seedling` and `moss · newest` only. Fixture build with 12: three groups, counts 7 / 3 / 2, one chip with hidden text "stage not set", `+N more` absent (no group over 12); fixture with 0: no `fig--bed`, no WRITING eyebrow. Five-view check on `/`: PASS. axe light/dark: 0.
- [ ] **Step 8: Scan and commit.** `git commit -m "feat(home): the writing bed, generated from the collection"`.

### Task 3: Home order, WORK and WRITE blocks, the open-to line

**Files:**
- Modify: `src/index.njk` (eyebrows PROJECTS → WORK, ELSEWHERE → WRITE; rows per spec 3; the `openTo` line)
- Modify: `_data/site.json` (add `"openTo": ""`)
- Modify: `docs/updating-copy.md` (where `openTo` lives)

- [ ] **Step 1: Failing check.** `curl -s http://127.0.0.1:8080/ | grep -c 'href="/resume/"'` on a local serve → 1 (footer only); the eyebrows read PROJECTS and ELSEWHERE.
- [ ] **Step 2: Edit `index.njk`**: order hero → lede → open-to → join → WORK → WRITING (bed) → NOW → WRITE; WRITE rows `contact/`, `résumé/` (link `/resume/`, text `Seb Lathangue · data governance · information architecture`, meta `print to PDF`), `writing/` (`All writing`, meta `{{ bed.total | pluralPieces }} · {{ now.updated | tendedState }}`); the open-to line `{% if site.openTo %}<p class="home-open">{{ site.openTo | safe }}</p>{% endif %}` in mono, under the lede.
- [ ] **Step 3: Passing checks.** `grep -c 'href="/resume/"' _site/index.html` → 2; eyebrows WORK, WRITING, NOW, WRITE in that order (`grep -o 'class="eyebrow">[A-Za-z]*' _site/index.html`); with `openTo` empty the line is absent; with a test value in a scratch copy it renders in mono under the lede. Five-view check PASS; print emulation of `/` shows the figures' marks and no panel fills.
- [ ] **Step 4: Scan and commit.** `git commit -m "feat(home): work and write blocks, the open-to line"`.

### Task 4: The Writing room landing

**Files:**
- Modify: `src/writing.njk`
- Create: `_data/writing.json` (`elsewhere.show: false` and its label, text, url)
- Modify: `figures.css` (the three-chip stage sequence `.fig--stages`)

**Interfaces:** Consumes `groupWriting`, `.chip*`, `.fig*`.

- [ ] **Step 1: Failing check.** `/writing/` today: one index table, the key, the tags; no "How writing works here", no groups, no elsewhere row.
- [ ] **Step 2: Edit `writing.njk`** per spec 5.2: after the masthead, a `figure.fig.fig--stages` with three chips of one placeholder piece (`a first pass` dashed, `reworked` hatch, `settled` solid) and the one-sentence caption; `NEWEST` eyebrow with the three most recent as index rows; then `NOTES/`, `ESSAYS/`, `EVOLVING/` eyebrows with index rows from `groupWriting`, each group split by year with a mono year label when it has more than 12 rows; the stage key and tag line as today; the elsewhere row `{% if writing.elsewhere.show %}` as an index row.
- [ ] **Step 3: Passing checks.** Real build: the stages figure, NEWEST with 3 rows, NOTES with 1, EVOLVING with 1, no ESSAYS eyebrow, no elsewhere row; scratch with `show: true` → the garden row renders; fixture with 14 notes dated across two years → NOTES splits by year. Five-view check on `/writing/` PASS; axe 0.
- [ ] **Step 4: Scan and commit.** `git commit -m "feat(writing): a composed landing with the stage sequence and grouped index"`.

### Task 5: About opens with the join as a sequence

**Files:**
- Modify: `src/about.md` (add `pageStyles`; the three-state sequence after the portrait and lede)
- Modify: `figures.css` (`.fig-seq` row of three panels, stacking at ≤760px)

- [ ] **Step 1: Failing check.** `grep -c 'fig--join' _site/about/index.html` → 0.
- [ ] **Step 2: Edit `about.md`**: a `div.fig-seq` holding three `fig-join` includes with `figState` 1, 2, 3 and `figId` `about-join-1..3`, each preceded by a mono kicker (`1 OF 3 · THE SYSTEM`, `2 OF 3 · THE PEOPLE`, `3 OF 3 · THE GOVERNED PATH`) and followed by one sentence from the mock-up brief's step text (verbatim); the existing "How I approach the work" heading and prose follow.
- [ ] **Step 3: Passing checks.** `grep -c 'fig--join' _site/about/index.html` → 3, with three distinct `aria-labelledby` ids; five-view check on `/about/` PASS (three panels in a row at 1280, stacked at 390); axe 0; the page's heading order unchanged (h1, then h2s).
- [ ] **Step 4: Scan and commit.** `git commit -m "feat(about): the join told in three states"`.

### Task 6: Rules and records

**Files:**
- Modify: `docs/brand.md` (Surfaces and composition: the home order; Figures: the stage key; a line that the home carries two figures and no story)
- Modify: `docs/pen-and-pixel.md` (new section "The stage key")
- Modify: `docs/writing-pipeline.md` (stage drives the bed and the room)
- Modify: `CHANGELOG.md` (entry "Two figures on the home page; the stories move to their rooms")
- Copy: this spec and plan to `docs/superpowers/specs/` and `docs/superpowers/plans/`

- [ ] **Step 1: Edit the four documents** with the exact wording in spec section 6.
- [ ] **Step 2: Check.** `node scripts/portfolio-check.js --scan docs/brand.md docs/pen-and-pixel.md docs/writing-pipeline.md CHANGELOG.md docs/superpowers/specs/*.md docs/superpowers/plans/*.md` clean; re-read brand.md against `_site/index.html`'s order.
- [ ] **Step 3: Commit.** `git commit -m "docs: record the home figures, the stage key and the pipeline note"`.

### Task 7: Branch gate

- [ ] `npx @11ty/eleventy` (21 pages); `node scripts/portfolio-check.js` passes; five-view check on `/`, `/about/`, `/writing/` PASS; axe 0 on all three in both modes; Lighthouse desktop and mobile on `/`: CLS no worse than the pre-branch run; `grep -rn "data-aud\|\.story" src/index.njk src/writing.njk src/about.md` → none; working tree clean; PR opened as a draft with the structural proposal in its description. Push only when Seb asks; never merge.

## Self-review

- **Spec coverage:** §3 → Tasks 1, 2, 3; §4.1 → Task 1; §4.2 → Task 2; §5.1 → Task 5; §5.2 → Task 4; §6 → Tasks 1–6; §7 → Tasks 2, 3, 4; §8 → Tasks 1, 2 (axe and tree reads); §9 → Task 7; §10 → data keys with empty behaviour (Tasks 3, 4).
- **Step scan:** every step names a file, a value or a command with its expected output.
- **Consistency:** `figState`/`figId` (Task 1) are the names Task 5 uses; `groupWriting`'s shape (Task 2) is what Tasks 3 and 4 read; class names are defined once in Task 1 and extended in Tasks 2 and 4.
- **Review focus:** seven items, each pinned to a task's check.
- **Proportion:** no function bodies; the SVG geometry is left to the implementer with its viewBox and elements named.
