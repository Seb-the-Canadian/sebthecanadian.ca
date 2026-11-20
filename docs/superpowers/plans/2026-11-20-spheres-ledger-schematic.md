# Spheres ledger schematic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish-ready (not published) evolving post "Reading power, sphere by sphere" with three pen + pixel figures that explain the spheres ledger as information architecture.

**Architecture:** One Markdown post in `src/writing/` carrying hand-written HTML figures, styled by the shared `figures.css` (panel, title, legend, chips, h/v SVG swap, print marks) plus one page stylesheet `posts/spheres-ledger.css` (prefix `sl-`) for what the shared sheet lacks: the spheres drawing, test rows and the evidence trail. No script, no new token, no new colour, no new include.

**Tech Stack:** Eleventy 3, Nunjucks/Markdown, vanilla CSS on `tokens.css` and the `--mark-*` tokens, inline SVG, Playwright (`scripts/site-check.js`).

**Spec:** `docs/superpowers/specs/2026-11-20-spheres-ledger-schematic-design.md`

## Global Constraints

- Branch `writing/spheres-ledger` in worktree `~/sebthecanadian.ca-spheres`; never push to `main`; push only when Grieves asks; never merge.
- Marks only from `--mark-*`; moss only for the path to "controller"; amber only on "contested", with an icon (◆) and the word, on border and tint only, never text.
- No real country names anywhere on the page. Actors: "Controller X", "Resident Y".
- Controller rule is C1 + C2 + C3.
- Every word in a figure is real text; each mark sits beside a word; text never sits on texture.
- Claude's part named: "Claude's scan", drawn in dither.
- Front matter: `layout: post.njk`, `type: post`, `stage: seedling`, `inProgress: true`, `tags: [research]`, `pageStyles: [/assets/css/figures.css, /assets/css/posts/spheres-ledger.css]`, `date: 2026-11-20`, `updated: 2026-11-20`.
- Scan with `node scripts/portfolio-check.js --scan <files>` before any push. Attribution line on commits.

## Review Focus

1. **Phone (390px):** no horizontal overflow; the narrow SVGs show and the wide ones hide; test rows stack to one column. Owner: Task 4's five-view check.
2. **Dark mode:** moss, marks and SVG strokes follow the theme (no hard-coded colours in SVG). Owner: Task 2 grep for `#` colours in the post; Task 4 screenshots.
3. **Print from dark mode:** marks print in light ink; no panel fill. Owner: Task 4 print emulation.
4. **Screen reader:** each figure named by its title; each SVG has `role="img"` and a sentence; legends readable. Owner: Task 4 accessibility-tree read.
5. **Writing index:** the post lands in `evolving/` with the in-progress pill, not in `notes/`. Owner: Task 1 grep.

---

### Task 1: The post, its words and the page stylesheet shell

**Files:** Create `src/writing/reading-power-sphere-by-sphere.md`, `src/assets/css/posts/spheres-ledger.css`.

- [ ] Failing check: `npx @11ty/eleventy --quiet && test -f _site/writing/reading-power-sphere-by-sphere/index.html` → fails.
- [ ] Write the post: front matter above; excerpt one sentence; sections per spec "The page" (opening, `## Spheres, not one map`, `## Earned, not asserted`, `## Every claim has a trail`, `## What this is and isn't`, `## What's next`, `## Revisions` with "**20 Nov 2026.** First version (MVP 1.0): the structure, the tests and the evidence trail. No findings yet.", `## Sources`). Figures as placeholders `<!-- fig N -->` for Tasks 2–3. Voice: first person, plain, as *Down and Out, revisited*.
- [ ] Stylesheet header comment as `revisiting-down-and-out.css` does.
- [ ] Passing check: the file exists; `grep -c 'in progress' ` on it ≥ 1; `grep -A40 'id="writing-evolving"' _site/writing/index.html | grep -c reading-power` → 1.
- [ ] Commit `writing: Reading power, sphere by sphere (words, MVP 1.0)`.

### Task 2: Figure 1, the spheres in three stages

**Files:** Modify the post (fig 1), `spheres-ledger.css`.

- Markup: `div.fig-seq.sl-seq` of three `div.fig-seq__step`, each with kicker `p.fig-seq__kicker` ("1 OF 3 · SIX SPHERES", "2 OF 3 · TWO ROLES", "3 OF 3 · OVERLAP"), a `figure.fig` titled `SPHERES LEDGER · THE SPHERES`, and `p.fig-seq__text`.
- Drawing: SVG `viewBox="0 0 240 240"`, six circles r≈58 on a ring r≈52 around (120,120), stroke `--mark` 1.5, no fill; stage 2 adds a solid node "X" and a hatched node "Y" inside one circle joined by a moss arrow; stage 3 adds a second, dotted edge in another circle. Sphere names and actors as `.chip` lists under the SVG (stage 1: six `.chip` sphere names; stage 2/3: `sl-chip--solid` controller, `chip--hatch` resident). `figures.css` has only `chip--ruled` and `chip--hatch`, so `spheres-ledger.css` defines `sl-chip--solid`, `sl-chip--dashed`, `sl-chip--dither` and `sl-chip--contested` the same way, with print rules.
- `.fig-seq` already lays out three columns and collapses at 760px; reuse it.
- [ ] Check: build; `grep -c 'fig-seq__step' _site/.../index.html` → 3; `grep -E 'fill="#|stroke="#' src/writing/reading-power-sphere-by-sphere.md` → nothing.
- [ ] Commit `writing(spheres): figure 1, the spheres`.

### Task 3: Figures 2 and 3, the tests and the evidence trail

**Files:** Modify the post (figs 2, 3), `spheres-ledger.css`.

- Fig 2 `SPHERES LEDGER · THE TESTS`: two `ol.sl-steps` rows (controller C1–C3 → outcome; resident R1–R3 → outcome), tiles styled like `.rdo-step` with a hatch strip; controller outcome tile has a moss outline and reads "controller"; beneath it two small outcome chips: "candidate" (dashed) and "◆ contested" (amber border + 10% tint, ink text); resident scope chips "state · firm · asset". Legend: hatch · my judgement on the evidence; dashed · unresolved; moss · the path to look at; ◆ amber · a state, contested. Caption: "All three tests, or it stays a candidate. Moss marks the path to look at."
- Fig 3 `SPHERES LEDGER · THE EVIDENCE TRAIL`: `ol.sl-steps` of four tiles: sources (ruled), events in time windows (solid), edges (hatch), register (solid); a fifth, offset tile "Claude's scan" (dither) feeding "edges" with the words "suggests; a person decides". Legend: ruled · documented; solid · recorded; hatch · my judgement; pixel · Claude's scan.
- Tiles: 4 columns ≥761px, one column with left strip below (as `.rdo-steps`).
- [ ] Check: build; `grep -c 'sl-step' ` ≥ 9; no hex colours in the post.
- [ ] Commit `writing(spheres): figures 2 and 3, the tests and the trail`.

### Task 4: Checks, ledger fix, second pass

- [ ] Serve `_site` on 127.0.0.1:8123; run `scripts/site-check.js` on the post and on `/writing/`: all five views PASS; look at every screenshot.
- [ ] Print emulation (Playwright `page.emulateMedia({media:'print', colorScheme:'dark'})`, PDF to scratch): marks visible, no fills.
- [ ] Accessibility tree: three figure names, SVG sentences, legends.
- [ ] Run brand.md's pre-ship list; no rule changed, so no brand.md edit.
- [ ] `node scripts/portfolio-check.js --scan` on the changed files: clean.
- [ ] In the ledger repo: fix `CLAUDE.md` to "C1 + C2 + C3"; commit there.
- [ ] Second pass (second-pass skill), then show Grieves the screenshots; nothing pushed.
