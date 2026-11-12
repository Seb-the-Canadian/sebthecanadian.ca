# Timeless Surfaces Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire the seasonal under-glow and the other surface effects, and apply one rule per framed box, tracked label and page rhythm, so the site reads clean, polished and timeless with the same identity underneath.

**Architecture:** CSS-only changes on the site's token and component stylesheets (the case-study stylesheets are generated and gated, and are not touched), one word in the security policy, and the records (`docs/brand.md`, `CHANGELOG.md`, `BACKLOG.md`) changed in the same commit as the rules they describe. A Playwright measuring script, kept in the audit folder, encodes the spec's acceptance values; it fails on today's build and must pass on the branch's.

**Tech Stack:** Eleventy 3.1.8, Nunjucks, vanilla CSS on tokens; Playwright (preinstalled; `require('playwright')`, `chromium.launch()` with no options); Node 22.

**Spec:** `docs/superpowers/specs/2026-11-09-timeless-surfaces-design.md` (same branch). The plan argues from the spec; read both.

## Global Constraints

- Branch `audit/timeless-surfaces`, cut from `main` at a48adb5. Never push; never merge; never stamp a case study (`--stamp`); never run `npm run build` (it rewrites `_data/*.json`); preview with `npx @11ty/eleventy`.
- No file under `src/projects/`, and none of `case-study.css`, `case-study-marks.css`, `case-studies/*.css`, is changed. `node scripts/portfolio-check.js` must keep passing.
- The repository is public: `node scripts/portfolio-check.js --scan <file>…` on every changed file and on every commit message file before committing. Never write an employer name anywhere.
- A change to a rule changes `docs/brand.md` (and the CHANGELOG entry) in the same commit. Writing reads as "one way I've done this", never the only way. `CLAUDE.md` is never edited by an agent.
- Commit messages: present-tense subject, a body that says why, ending with exactly the two trailer lines the dispatch gives.
- Spacing scale: 4, 8, 16, 24, 32, 48, 64px (`--space-xs` … `--space-3xl`); radii `--radius` 10px, `--radius-sm` 6px; `--text-xs` 12px, `--text-sm` 14px. "Column" = `main`'s content box; its left edge at 1280 is where the `S·L` stamp sits today (279.44px), at 390 it is 18.95px.
- Values the spec pins (copied): content panels pad 24, figure panels 16; labels mono 12px / 600 / uppercase / 0.1em; pill and badge pad `2px 6px`; title block → first content 32; eyebrow → content 16; last block → footer 112 at 1280 and 88 at 390; header → title block 88 / 64; policy image rule `img-src 'self'`.

## Review Focus

Inputs the spec implies but no task's own change exercises, each pinned to a test in the task named:

1. Theme switch to light on a dark system: a card's computed background must equal the light-system value (no dark value left to leak) — Task 1 check S10, run in Task 2.
2. Phone width after the nav shift and the 14px rows: no page scrolls sideways at 320 or 390 — Task 1 check R11, run in Tasks 3 and 4.
3. JavaScript off: the hero and nav alignment are CSS-only, so the no-JS view must show the same edges — Task 4 step 9 (`site-check` five views on the home).
4. Print from dark mode: the post's figure marks still print in the light ink after the body change and the figure-panel padding change — Task 5 step 3.
5. Forced colours (Windows high contrast): with tints gone from view, the pill and badge still read as framed labels by their borders — Task 3 step 8 (`forcedColors: 'active'` screenshot, reviewed by eye).

---

### Task 1: The measuring script (the failing test)

**Files:**
- Create: `/home/user/sebthecanadian-audit-2026-11-04/build/h/tools/verify-timeless.cjs` (audit folder, outside the repository)
- Create: `/home/user/sebthecanadian-audit-2026-11-04/build/h/tools/README.md` (how to run it, the check table)

**Interfaces:**
- Produces: `node verify-timeless.cjs <baseUrl> <outDir> [--only S,B,L,R]` — serves nothing itself; measures the pages at `<baseUrl>`; writes `<outDir>/results.json` (`[{id, page, width, scheme, pass, value, expected}]`) and prints one `PASS`/`FAIL` line per check; exit code 1 if any check in the run fails. Tasks 2–5 consume the check ids below.

Pages: `/`, `/about/`, `/projects/`, `/writing/`, `/writing/revisiting-down-and-out/`, `/writing/tags/note/`, `/keyboard/` (with the dialog opened by pressing `?`), `/resume/`, `/uses/`, `/colophon/`, `/404.html`. Widths 1280 and 390 (320 where a check says). Schemes light and dark via `colorScheme`. Column: `main.getBoundingClientRect().left + parseFloat(getComputedStyle(main).paddingLeft)`, width `main.clientWidth − paddingLeft − paddingRight`. Text left edges: the first text node's `Range` rect. Luminance: WCAG relative luminance of a computed `rgb()`.

The checks (expected values are the spec's; today's build fails the ones marked ✗):

| id | what | expected |
|---|---|---|
| S1 ✗ | elements with computed `box-shadow !== 'none'`, excluding `.fig__mk*`, `[class*="rdo-"]` swatches and anything inside `.story` | 0 on every page |
| S2 ✗ | `.card, .panel--alt, .resume-callout` computed `background-image` | `none`; and `.garden-panel` absent from the built `components.css` |
| S3 ✗ | `body` computed `background-image`, both schemes | `none` |
| S4 ✗ | luminance of `.panel--alt` background vs `body` background on `/` | dark: panel > page; light: panel < page |
| S5 ✗ | `.kbd-overlay` `backdrop-filter`; `.kbd-overlay-inner` `box-shadow`, padding | `none`; `none`; `24px` all sides |
| S6 ✗ | `.card` hovered on `/projects/`: `transform`, `box-shadow`, `border-color` | `none`; `none`; equals computed `--moss` |
| S7 ✗ | `.resume-photo img` `box-shadow` | `none` |
| S8 ✗ | the policy meta's `img-src` directive | `'self'` only, no `data:` |
| S9 ✗ | fetched `/assets/css/tokens.css` | no `--glow`, `--card-shadow`, `--shadow-sm`, `--shadow:` declarations |
| S10 | `colorScheme: dark`, then set `data-theme="light"` on `<html>`: `.card` computed background-color | equals the value measured with `colorScheme: light` |
| B1 ✗ | `.card, .panel--alt, .resume-callout, .kbd-overlay-inner`: border, radius, padding, background-color | `1px solid <--rule>`, `10px`, `24px` ×4, `<--bg-alt>` |
| B2 ✗ | `.fig` (home, About, Writing), `.rdo-fig` (post): padding, radius, border | `16px` ×4, `10px`, `1px solid <--rule>` |
| B3 ✗ | radius of `.fig__box`, `.chip`, `.index-pill`, `.badge`, `kbd`, `.button`, `.theme-toggle`; of `.fig__mk` | `6px` each; `3px` |
| L1 ✗ | the label set: the eyebrow `<span>` in `.masthead__meta` (the sibling of `.masthead__stamp`), `h2.eyebrow`, `th`, `.fig__title`, `.kbd-overlay-inner h2`, `.webmentions-title`, `.fig-seq__kicker`, `.writing-key .eyebrow`: font-family starts with IBM Plex Mono, size, weight, text-transform, letter-spacing | `12px`, `600`, `uppercase`, `1.2px` |
| L2 ✗ | colour of the label set | eyebrow, `h2.eyebrow`, dialog `h2`, `.webmentions-title`: `<--moss>`; `.fig__title`, `.fig-seq__kicker`, `th`, `.writing-key .eyebrow`: `<--muted>` |
| L3 ✗ | footer wordmark: size, letter-spacing | `11px`, `1.1px` |
| L4 ✗ | `.index-pill--active` and `.badge--active`: size, weight, letter-spacing, padding, radius, border-width; border-color | both `12px`/`600`/`1.2px`/`2px 6px`/`6px`/`1px`; pill `<--amber>`, badge `<--moss>` |
| L5 ✗ | `.index-table`, `.home-more` font-size | `14px` |
| R1 ✗ | `/`: text left of `.home-hero h1` and of the lede paragraph after the hero | = column left ±0.5 |
| R2 ✗ | `getComputedStyle(.site-header, '::after').width` and `getComputedStyle(footer, '::before').width`; `border-bottom-width` of `.site-header` and `border-top-width` of `footer` | = column width ±0.5 (both), `0px` (both) |
| R3 ✗ | first nav link's text left | = column left ±0.5 |
| R4 ✗ | `.masthead` bottom → next element top, each masthead page; `/`: `.home-hero` bottom → next element top | `32` |
| R5 ✗ | `h2.eyebrow` bottom → next sibling top, each on `/` and `/writing/`, and inside `.panel--alt` | `16` |
| R6 ✗ | `main`'s last child bottom → `footer` top | `112` at 1280, `88` at 390, every page |
| R7 ✗ | `.site-header` bottom → `.masthead` top (or `.home-hero` top on `/`) | `88` at 1280, `64` at 390 |
| R8 ✗ | dialog open: horizontal centre of its Close `.button` vs the dialog's | equal ±1 |
| R9 ✗ | dialog open and focused: `.kbd-overlay-inner` `border-radius` | `10px` |
| R10 ✗ | `/` `.panel--alt .post-meta`: font-family, size, colour | IBM Plex Mono, `14px`, `<--muted>` |
| R11 | `document.documentElement.scrollWidth === innerWidth` at 320 and 390, every page | true |

`<--rule>` etc. mean the token's computed value, read from `getComputedStyle(document.documentElement).getPropertyValue(...)` and normalised to `rgb()`.

- [ ] **Step 1: Write the script** as specified: pages × widths × schemes, each check a small function returning `{id, pass, value, expected}`, `--only` filtering by group letter, results to JSON, exit 1 on any failure.
- [ ] **Step 2: Run it against today's build to see it fail.** In the worktree: `npx @11ty/eleventy && (cd _site && python3 -m http.server 8314 --bind 127.0.0.1 &)`; then `node verify-timeless.cjs http://127.0.0.1:8314 /home/user/sebthecanadian-audit-2026-11-04/build/h/baseline`. Expected: every ✗ check prints `FAIL` with today's value (for example S1 > 0, B1 padding `24px` but background-image a gradient, R1 `+36`, R4 `48` on `/projects/`); S10 and R11 print `PASS`. Keep `baseline/results.json`: it is the before.
- [ ] **Step 3: Write the README** (one page: usage, the table above, where results go). Stop the server.

No commit: the audit folder is not the repository.

### Task 2: Surfaces and the box (spec 4.1, 4.2; records 31–32 for those rules)

**Files:**
- Modify: `src/assets/css/tokens.css` (lines 149–159, 219–221, 257–259, 265–296: the shadow and glow tokens, the seasons block and its comment)
- Modify: `src/assets/css/components.css` (`.card` 100–120, `.resume-photo img` 280–286, `.kbd-overlay` 330–360, `.garden-panel` 858–871, `.panel--alt` 1018–1027, `.resume-callout` 1100–1106; `.fig__box` is in figures.css)
- Modify: `src/assets/css/base.css` (`body` 35–51)
- Modify: `src/assets/css/figures.css` (`.fig__box` radius, line ~110; `.chip` radius, line ~39)
- Modify: `src/assets/css/posts/revisiting-down-and-out.css` (`.rdo-fig` padding, line ~8)
- Modify: `src/_includes/base.njk` (the policy meta's `img-src`, and the comment beside it)
- Modify: `docs/brand.md` (Colour: the seasons sentence and the duotone sentence; Surfaces: "One card look" → "One framed box", "Backgrounds"; Identity marks: the retired list), `CHANGELOG.md` (new top entry)

**Interfaces:**
- Consumes: Task 1's script (`--only S,B`).
- Produces: the framed-box rule (border `--rule`, radius `--radius`, fill `--bg-alt`, no shadow; content panels `--space-lg`, figure panels `--space-md`) that Tasks 3 and 4 leave alone.

- [ ] **Step 1: Run the S and B checks on today's build** (serve `_site` on 8314 as in Task 1): expected FAIL on S1–S9 and B1–B3; keep the output.
- [ ] **Step 2: tokens.css.** Remove `--shadow-sm`, `--shadow`, `--glow`, `--card-shadow` from every block (light root, dark media, both theme classes) and `--glow-l` / `--glow-d` from every season block; keep `--season-l`, `--season-d`, `--season`. Rewrite the header comment (lines 1–6) and the seasons comment (265–270) to say the seasons drive the Now pulse and text selection.
- [ ] **Step 3: components.css.** `.card`, `.panel--alt`, `.resume-callout`: `background: var(--bg-alt)`; delete `box-shadow`; `.card` transition `border-color 0.2s var(--ease)` only; `.card:hover` → `border-color: var(--moss)` only; delete the card's `prefers-reduced-motion` block; delete every `.garden-panel` rule. `.resume-photo img`: delete `box-shadow`. `.kbd-overlay`: delete `backdrop-filter`. `.kbd-overlay-inner`: delete `box-shadow`; `padding: var(--space-lg)`.
- [ ] **Step 4: base.css.** `body`: delete `background-image`, `background-repeat`, `background-size`, `background-blend-mode`; keep `background-color: var(--bg)`; replace the grain comment with one line ("Flat parchment / charcoal; no texture.").
- [ ] **Step 5: figures.css and the post stylesheet.** `.fig__box { border-radius: var(--radius-sm) }`; `.chip { border-radius: var(--radius-sm) }`; `.rdo-fig { padding: var(--space-md) }`. Leave `.fig__mk` at 3px.
- [ ] **Step 6: base.njk.** `img-src 'self' data:` → `img-src 'self'`; the comment that explained `data:` for the grain says the grain is gone. Verify no other `data:` address exists: `grep -rl 'data:' _site --include='*.html' --include='*.css'` after a rebuild prints nothing.
- [ ] **Step 7: Records.** `docs/brand.md`: Colour → "Seasons" drops the card glow and names the two things seasons drive; "Duotone" states the two accents without "matching its card under-glow"; Surfaces → "One framed box: hairline `--rule`, the shared radius, a flat `--bg-alt` fill, no shadow. Content panels (project cards, the Now panel, About's résumé hand-off, the shortcuts dialog) pad `--space-lg`; figure panels `--space-md`." and "Backgrounds: flat parchment and charcoal. No texture, no pattern, no dark hero blocks."; Identity marks → retired list gains "the seasonal under-glow, the card gradient and the paper grain (2026-11)". `CHANGELOG.md`: a new top entry dated with the day, titled in the house style ("A quieter surface" or like), `### Changed` bullets for: the glow, gradient and grain retired and cards now flat; the dialog without blur or shadow; `### Fixed`: dark-mode panels now sit above the page (the grain had lifted the page to the panel colour).
- [ ] **Step 8: Rebuild and run the checks.** `npx @11ty/eleventy`; `node scripts/csp-check.js _site` passes; `node verify-timeless.cjs http://127.0.0.1:8314 <out> --only S,B`: all S and B checks PASS, including S10.
- [ ] **Step 9: Look.** `node scripts/site-check.js http://127.0.0.1:8314/ <out>/home` and the same for `/projects/`, `/about/`, `/keyboard/`, `/resume/`: PASS ×5 each; open the screenshots and confirm the panels read as flat framed boxes in both modes.
- [ ] **Step 10: Scan and commit** (one commit; `--scan` on every changed file and the message file): `style(surfaces): retire the under-glow, the card gradient and the paper grain; one framed box` with a body that says why and the trailers.

### Task 3: Labels and type (spec 4.3; item 29's raw `12px`; records 31–32 for the label rule)

**Files:**
- Modify: `src/assets/css/components.css` (`.eyebrow` ~829–838, `.masthead__meta` and its eyebrow span ~957–975, `.badge` 146–175, `.index-pill` 915–940, `.index-table` 851–856, `.home-more` 580–584, `kbd` 399–406, the dialog `h2` ~365–370, `.webmentions-title` 618–626, `.writing-key .eyebrow` 571, the wordmark ~1004–1008, `nav[aria-label="Primary"] a[aria-current="page"]` 35–40 and `.pull-line` ~845–848, table `th` ~1148–1153; the five raw `12px` at 568, 906, 921, 948, 1149)
- Modify: `src/assets/css/figures.css` (`.fig__title` ~17–22, `.fig-seq__kicker` ~178)
- Modify: `docs/brand.md` (Type: a "Labels" rule; the 11px exceptions), `CHANGELOG.md` (the same entry, new bullets)

**Interfaces:**
- Consumes: Task 2's box rule; Task 1's script (`--only L`, then `R11`).
- Produces: the label rule (mono `--text-xs` / 600 / uppercase / 0.1em; moss for headings, muted for box and table labels) and the state-label construction, which Task 4 does not touch.

- [ ] **Step 1: Run the L checks on the Task 2 build**: expected FAIL on L1–L5; keep the output.
- [ ] **Step 2: One label.** Give every element in the L1 set: `font-family: var(--mono); font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em`. Where a shared rule already carries most of it (`.eyebrow`), extend that rule rather than repeat the declarations; the eyebrow's `0.16em` becomes `0.1em`; `.fig__title` goes from 11.5px / 400 / 0.06em; the dialog `h2` from 14px; `.fig-seq__kicker` from 400 / 0.08em. Colour by role (L2): headings moss, box and table labels muted. Wordmark letter-spacing `0.1em` (L3).
- [ ] **Step 3: One state label.** `.index-pill` and `.badge` share: `font: 600 var(--text-xs)/1 var(--mono); text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 6px; border: 1px solid; border-radius: var(--radius-sm)`; `.index-pill--active` border and tint amber (10 %), `.badge--active` moss (10 %); the other badge variants keep their colours with the shared construction. Keep the pill's `::before` dot if it has one.
- [ ] **Step 4: Sizes and weights.** `.index-table` and `.home-more`: `font-size: var(--text-sm)`. The two Atkinson rules asking for 600 (`a[aria-current="page"]`, `.pull-line`): `700`. The five raw `12px` (`font-size: 12px`) → `var(--text-xs)`; `grep -c 'font-size: 12px' src/assets/css/components.css` prints 0.
- [ ] **Step 5: Records.** `docs/brand.md` Type: add "**Labels.** Tracked labels are mono, 12px, 600, uppercase, tracked 0.1em: the eyebrow, section eyebrows, table headers, figure titles, the dialog title, state labels. Moss when the label is a heading; muted when it names a box or a table. Three stay at 11px: index-row labels, the Writing year labels, the footer wordmark; the résumé keeps its own ruled section labels." and correct any sentence that still says 0.16em or names the old sizes. `CHANGELOG.md`: bullets for "small labels are one thing (size, weight, tracking)" and "directory rows at 14px".
- [ ] **Step 6: Rebuild and run the checks.** `--only L`: L1–L5 PASS. Then R11 at 320 and 390 on `/`, `/writing/`, `/writing/tags/note/`, `/keyboard/`, `/resume/`: PASS (no sideways scroll from the wider rows or labels).
- [ ] **Step 7: Look.** `site-check` on `/`, `/writing/`, `/projects/`, `/keyboard/` (dialog closed) and the post with figures; open the 390 screenshots: no label wraps where it did not before; the pill and badge read as one family.
- [ ] **Step 8: Forced colours.** With Playwright `forcedColors: 'active'` screenshot `/writing/` and `/projects/` at 1280: the pill and the badge keep a visible border. Save under the task's evidence folder.
- [ ] **Step 9: Scan and commit**: `style(labels): one tracked label, one state label; directory rows at 14px` with body and trailers.

### Task 4: Rhythm, edges and the fixes (spec 4.4, 4.5 items 26–30; records 31–33)

**Files:**
- Modify: `src/assets/css/components.css` (`.site-header` 42–56, footer 59–66, `nav[aria-label="Primary"] ul` 6–12, `.home-hero` 704–712, `.masthead` 957–961, `.index-table` 851–856 margin, the Now panel's `h2.eyebrow` margin, the dialog Close `.button` 421–429, `.post-meta` 507–512)
- Modify: `src/assets/css/figures.css` (`.writing-block` ~97–99 the eyebrow → bed gap; margins, paddings and gaps already on the scale → tokens: lines ~10–11, 27, 61, 107, 174–175, 185)
- Modify: `src/assets/css/base.css` (a `main > :last-child { margin-bottom: 0 }` rule in the layout shell)
- Modify: `src/assets/css/utilities.css` (`:focus-visible` 45–49)
- Modify: `src/assets/css/tokens.css` (comments only, if Task 2 left any that still mention the glow)
- Modify: `docs/brand.md` (Surfaces → the rhythm rule; Behaviour → hover is border only, the dialog's tint without blur), `CHANGELOG.md` (bullets), `BACKLOG.md` (spec item 33)

**Interfaces:**
- Consumes: Tasks 2 and 3; Task 1's script (`--only R`).
- Produces: the finished branch for Task 5.

- [ ] **Step 1: Run the R checks on the Task 3 build**: expected FAIL on R1–R10; keep the output.
- [ ] **Step 2: Hero and header → title.** `.home-hero { max-width: none; margin-inline: 0; padding: 0; margin-block: 0 var(--space-xl) }` (the same reset as `.masthead`; 0 above so header → hero is 88 like every title block, 32 below for R4).
- [ ] **Step 3: Rules the width of the column.** `.site-header`: delete `border-bottom` and `padding-bottom`; add `flex-wrap: wrap` (keep the existing 600px rule or fold it in) and `.site-header::after { content: ""; flex-basis: 100%; height: 1px; background: var(--rule); margin-top: var(--space-md); }` so the hairline is a flex row of its own inside the padded box. `footer`: delete `border-top` and `padding-top`; add `footer::before { content: ""; display: block; height: 1px; background: var(--rule); margin-bottom: var(--space-lg); }`. The nav: `nav[aria-label="Primary"] ul { margin-left: calc(-1 * var(--space-sm)) }` so the first word sits on the column (its hover pill may extend 8px left).
- [ ] **Step 4: Title block → first content 32.** `.masthead { margin-bottom: var(--space-xl) }` (verify it is), and `.masthead + h2, .masthead + section > h2:first-child { margin-top: 0 }` (or the selector that fits the built markup on Projects, Uses and Links) so the first heading's 48 no longer collapses through.
- [ ] **Step 5: Eyebrow → content 16.** `/`: `.index-table { margin-top: var(--space-md) }` (today 32); the Now panel: `.panel--alt > h2.eyebrow { margin-bottom: var(--space-md) }` (today 8); `/writing/`: the rule in `figures.css` that zeroes the bed's top gap → `var(--space-md)`.
- [ ] **Step 6: Last block → footer.** `base.css`: `main > :last-child { margin-bottom: 0 }` beside the layout shell. Verify R6 = 112 / 88 on every page; if a page's last child is a wrapper whose own last child carries the margin, extend the selector to that wrapper.
- [ ] **Step 7: The fixes.** Dialog Close: give the close button a selector that wins (`.kbd-overlay-inner .kbd-close`, or `.kbd-overlay-inner > .button:last-child`) with `display: block; margin-inline: auto`. `:focus-visible`: delete `border-radius`. `.post-meta`: move the `.h-entry .post-meta` declarations to `.post-meta` (mono, `--text-sm`, muted) so the Now panel's line matches; check the live dot's line still aligns. `figures.css`: values already on the scale → tokens (`1.5rem` → `var(--space-lg)`, `1rem` → `var(--space-md)`, `0.5rem` → `var(--space-sm)`); leave 0.8rem, 0.9rem, 0.6rem, 0.55rem and friends. The home's sideways scroll at 320 (R11, found by Task 1's baseline: a long external domain in an `.index-row__meta` runs 6.6px past the viewport): `.index-row__meta { overflow-wrap: anywhere }` or the narrowest rule that lets that domain break; R11 must pass at 320 on every page.
- [ ] **Step 8: Records.** `docs/brand.md` Surfaces: "**Rhythm.** The title block sits 88px under the header rule and 32px above the first content on every page that has it; a section eyebrow sits 16px above its list; the last block sits 112px above the footer rule (64px of page padding and 48px of footer margin); the header and footer rules span the text column. Composed pages (home, Writing) space their blocks by `--flow`; running-text pages space sections by the heading's `--space-2xl`." Behaviour: hover on a card is a moss border, no lift; the shortcuts dialog sits on a plain tint. `CHANGELOG.md`: bullets for the hero on the column, the rules at column width, one rhythm; `### Fixed`: the dialog's Close button centred, the dialog's corners steady on open, the Now panel's meta line. `BACKLOG.md` under "After the audit sprint": the device-decisions pass (one line, pointing at the audit's D.3 list); the three deferred taste questions, one line each: corner radius 10 → 6 (a mock of Projects and the dialog); the home and Writing section headings as Fraunces H2s (a mock of both pages); the type scale (a census and a proposal).
- [ ] **Step 9: Rebuild and run everything.** `--only R`: R1–R11 PASS at both widths; then the whole script with no filter: every check PASS. `node scripts/site-check.js` on `/` (five views: the no-JS view must show the hero and nav on the column), `/writing/`, `/projects/`, `/keyboard/`, `/about/`, `/resume/`.
- [ ] **Step 10: Scan and commit**: `style(rhythm): the hero and the rules on the column; one gap from title to text and from text to footer` (one commit, or two if the fixes read better apart: `fix(ui): dialog close centred, focus ring leaves corners alone, Now meta line`).

### Task 5: Proof, before-and-after preview, pull-request text (spec 5)

**Files:**
- Create: evidence under `/home/user/sebthecanadian-audit-2026-11-04/build/h/proof/` (results JSON, site-check and axe output, screenshots, print check)
- Create: `/home/user/sebthecanadian-audit-2026-11-04/build/h/pr-draft-timeless-surfaces.md`
- Create: packed previews `<scratchpad>/preview-timeless-before/` (main at a48adb5) and `<scratchpad>/preview-timeless-after/` (the branch tip), with `build/tools/preview-pack.py … --strip-csp`

**Interfaces:**
- Consumes: the branch tip; Task 1's script; `scripts/site-check.js`; axe (`<scratchpad>/tools/node_modules/axe-core/axe.min.js`, `bypassCSP: true`); `build/tools/preview-pack.py`.
- Produces: the two packed folders for the controller to publish; the PR text with `[PREVIEW-BEFORE]`, `[PREVIEW-AFTER]` placeholders.

- [ ] **Step 1: Full measurement.** Serve the branch's build; `node verify-timeless.cjs <url> proof/after` → all PASS; copy `baseline/results.json` beside it as `proof/before.json`.
- [ ] **Step 2: The site's checks.** `site-check` five views on every page type listed in the spec and both case studies (PASS ×5 each); axe 0 violations on the same at 1280 and 390; `node scripts/csp-check.js _site` ✓; `node scripts/portfolio-check.js` clear; `--scan` on every file in `git diff --name-only a48adb5..HEAD` and on every commit message (`git log --format=%B a48adb5..HEAD`, one file per commit).
- [ ] **Step 3: Print.** Playwright, `colorScheme: 'dark'`, `emulateMedia({ media: 'print' })` on `/writing/revisiting-down-and-out/`: every `[class*="rdo-"]` mark resolves `--mark` to the light ink (`#3a453d`) and `body` background-image is `none`; `/resume/` still draws its print mark.
- [ ] **Step 4: Before and after.** Build main at a48adb5 in a scratch checkout (`git worktree add <scratch>/before a48adb5` is fine, never `npm run build`); pack both builds with the packer and `--strip-csp`; list the two folders' file counts (67 each expected).
- [ ] **Step 5: PR text** in the house style of `build/g/pr-draft-*.md`: what changes on the page (in plain words, with today's value beside the new one for the five things Seb may want back: the eyebrow tracking, the 14px rows, the dialog padding, the hero and rule edges, the footer gap), what changes in the records, how it was checked, the preview placeholders, the attribution footer.
- [ ] **Step 6: Report** the proof folder path, the two packed folders, and anything that could not be made to pass as specified.

---

## Self-review notes (kept for the record)

- Spec coverage: 4.1 → Task 2 (items 1–8); 4.2 → Task 2 (9–12); 4.3 → Task 3 (13–18); 4.4 → Task 4 (19–25); 4.5 → Task 4 (26–30; item 29's raw `12px` in Task 3); 4.6 → each task's records step (31–33) and Task 2's check for 34 (pen-and-pixel.md states no figure-panel padding, so it is unchanged); 5 → Tasks 1 and 5.
- Names used across tasks: `verify-timeless.cjs <baseUrl> <outDir> [--only …]`, check ids S1–S10, B1–B3, L1–L5, R1–R11; the port 8314; the evidence folders `baseline/`, `proof/`.
- Review Focus items each have a step: S10 (Task 2 step 8), R11 (Task 3 step 6, Task 4 step 9), no-JS (Task 4 step 9), print (Task 5 step 3), forced colours (Task 3 step 8).
- Proportion: the plan decides selectors, values and checks; it writes no CSS bodies beyond the two pseudo-element rules whose shape the check depends on.
