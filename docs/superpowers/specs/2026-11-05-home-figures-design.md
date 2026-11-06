# Home figures — design spec

| Field | Value |
|---|---|
| Date | 2026-11-05 |
| Status | Design approved in conversation (Option E, variant 2: two figures on the home, stories in their rooms). Written spec for Seb's review before the plan runs |
| Decided by | Seb, 2026-11-05: "I like this, I just don't know if I want the one story right on the homepage" → the home keeps the figures, not the chapters; recommendation 2 accepted ("Sounds good") |
| Reads with | `docs/brand.md`, `docs/pen-and-pixel.md`, `docs/writing-pipeline.md`, the audit report (Parts A–C of the consolidated file), `design-options.md` sections 7–8, and the Design mock-ups (frame 8 is the closest picture) |
| Where it would live in the repository | `docs/superpowers/specs/2026-11-05-home-figures-design.md`, copied there on the build branch; kept outside the repository until then because the audit engagement was read-only |

## 1. Goal

Make the site read as one continuous thing and make the writing its visible, living centre, without turning the home page into a story. The home page stays the front door for hiring managers; it gains two figures in the site's own pen-and-pixel vocabulary: **the join** (who Seb is, as a picture) and **the writing bed** (the writing as a figure generated from the collection, so it changes between visits and is never a plopped list). The chapters from the mock-ups move to the rooms they describe: the join's three steps open About; the bed's process (first pass, reworked, settled) opens the Writing room.

## 2. Scope

In scope: the home page composition; two figure components and their stylesheet; the Writing room's landing composition; About's opening figure; the data and collection code the figures need; the brand and pipeline documents that record the new rules.

Out of scope (handled by the audit plan): the tissue (title block on posts, next steps, one identity line), fonts and images, the case-study bundles, security settings, the colophon move. This spec assumes Phase 2 and Phase 4 of the audit plan have landed or land in the same branch; it does not depend on Phase 5 (no script is added, so the font work is not a prerequisite).

## 3. The home page, top to bottom

1. **Arrival** (unchanged in bones): the mark, the name, the hero line, the identity meta line in D1 order (`data governance · information architecture · civic tech · Toronto / ON`), the lede. Then **one line on what Seb is open to**, rendered only when `site.openTo` is set (section 7), ending with the email as a plain link.
2. **The join** (figure 1), under no eyebrow: it is the identity picture, not a section. Final state only: the system box with four ruled chips, the people box with three hatch chips, the moss path from the people to the system labelled `the governed path`, the dotted line beside it labelled `the ungoverned one`, a legend row, a one-line caption.
3. **WORK** (eyebrow, renamed from PROJECTS): the index rows as today, case studies first (`study/`), then projects (`project/`), with the hostname-and-arrow meta. The in-progress post's row leaves this block (it lives in the bed).
4. **WRITING** (eyebrow): **the writing bed** (figure 2) in place of the index rows: a legend row, then groups `notes/`, `essays/`, `evolving/`, each a wrapped row of chips with counts, the newest piece outlined in moss with the word `newest`. Under it, `All writing →`.
5. **NOW** (the panel, unchanged).
6. **WRITE** (eyebrow, replaces ELSEWHERE): three index rows: `contact/` (email, Bluesky, GitHub, ORCID), `résumé/` (name and specialty line, meta `print to PDF`), `writing/` (`All writing`, meta `N pieces · <tended word>`).
7. Footer (unchanged).

No chapter nav. No sticky figure. No script. The primary nav and theme switch stay exactly as they are.

## 4. The two figures

Both follow pen-and-pixel: marks in `ink-soft` from the `--mark-*` tokens, in a strip at the edge of a chip beside a word, never behind text; moss only for "where to look"; amber only as a named state with an icon; framed flat panel on `--bg-alt` with a 1px `--rule` border, the posts' figure style (`.rdo-fig` in `src/assets/css/posts/revisiting-down-and-out.css` is the model).

### 4.1 The join (`fig-join.njk`)

- **Markup**: `<figure class="fig fig--join" aria-labelledby="fig-join-title">`; a mono label `THE JOIN · SCHEMATIC` as the title; two boxes: `the system` holding chips `rules`, `schemas`, `policies`, `records` (ruled strips); `the people` holding chips `what do I do?`, `who decides?`, `where is it?` (hatch strips); between them an inline SVG (`role="img"`, `aria-label="The governed path runs from the people to the system; the ungoverned one takes the long way round"`) drawing the moss path with an arrowhead and the dotted detour; a legend `<ul class="fig__legend" aria-label="What the marks mean">`: `ruled · documented`, `hatch · a person's question`, `moss · the path to look at`; a `<figcaption>`: `Moss marks the path to look at.`
- **State parameter**: the include accepts `state` (1, 2 or 3). State 1 draws the system box only; state 2 adds the people box and a dashed line labelled `unresolved`; state 3 is the final figure above. The home uses state 3. About uses all three (section 5).
- **Phone (≤600px)**: the boxes stack, system above people; a second small SVG (vertical, shown by media query) draws the path upward from the people to the system; the legend wraps.
- **Dark mode**: tokens only; nothing to add.

### 4.2 The writing bed (`fig-writing-bed.njk`)

- **Input**: `collections.writing` (every `src/writing/*.md`, newest first), passed through a new filter `groupWriting` (section 6) that returns `{ notes, essays, evolving, newest, total }`.
- **Grouping**: `inProgress: true` → `evolving/` regardless of type; otherwise `type: note` → `notes/`, `type: essay` → `essays/`; any other or missing type → `notes/` (and the audit's C-07 sets `type` on every post, so this is a safety net, not a design).
- **Chip**: `<a class="chip chip--<stage>" href="…">title<span class="sr-only">, seedling</span></a>`. The strip wears the stage mark: `seedling` → dashed outline, no strip; `budding` → hatch strip; `evergreen` → solid strip; no `stage` → no strip and the hidden text `stage not set` (honest, and visible in the audit's checks). `inProgress` chips carry the amber `◆ IN PROGRESS` pill after the title, as the index rows do today.
- **Newest**: the single most recent `date` across all groups gets `chip--newest` (a 2px moss outline, dashed if it is also a seedling) and the mono word `newest` beside it in moss.
- **Counts**: a mono count at the right of each group row.
- **Legend** (above the groups): `dashed · seedling, a first pass` · `hatch · budding, reworked` · `solid · evergreen, settled` · `moss · newest`. The legend shows only the marks present in the bed plus `moss · newest`, so it never promises a state the archive doesn't have.
- **Scale rules**: a group with no pieces is not rendered; a group with more than 12 pieces shows the 12 newest and a chip `+N more →` to the room; the whole figure is not rendered when there are no pieces at all (the WRITING block then shows nothing, as today's `writingRecent` guard does).
- **Phone**: chips wrap; the group label sits above its chips; counts stay right.

## 5. The rooms the stories move to

### 5.1 About (`src/about.md`)

Opens, after the title block and portrait, with **the join as a sequence**: three small panels in a row (stacked on phones), `fig-join` with `state` 1, 2, 3, each with its step kicker (`1 OF 3 · THE SYSTEM`, `2 OF 3 · THE PEOPLE`, `3 OF 3 · THE GOVERNED PATH`) and one sentence under each, taken from the mock-up brief's step text. The existing "How I approach the work" prose follows. The colophon move (audit Phase 11) is unchanged by this spec.

### 5.2 The Writing room (`src/writing.njk`)

A composed landing instead of a bare list:

1. Title block (stamp, `writing/`, "Writing") and the lede as today.
2. **How writing works here**: a small static figure, three chips of one piece side by side showing the stage marks in order (dashed → hatch → solid) with the words `a first pass` · `reworked` · `settled`, and one sentence: `A note lands here the day it's written, marked as a seedling, from a phone, in one tap. When it's reworked it changes its mark, not its colour. A few settle.` This is where the process is told once.
3. **NEWEST**: the three most recent pieces as index rows with type and stage.
4. The index grouped by type (`notes/`, `essays/`, `evolving/`) as index rows, using the same `groupWriting` filter; within a group, newest first; when a group has more than 12 rows it splits by year with a mono year label.
5. The stage key line (as today) and the tag line (as today).
6. **Elsewhere**: one index row rendered only when `writing.elsewhere.show` is true (section 7); its label, text and URL come from data. This is the garden slot, pending Seb's answer to the garden question; the design works whichever way it goes.

### 5.3 Posts

Unchanged by this spec beyond the audit's tissue (title block with `S·L note/`, the NEXT rows, `All writing →`).

## 6. Code

| File | Change |
|---|---|
| `src/_includes/fig-join.njk` | New include. Parameters: `state` (1–3, default 3), `id` (for `aria-labelledby`, default `fig-join`). HTML chips, two inline SVGs (horizontal and vertical), legend, caption |
| `src/_includes/fig-writing-bed.njk` | New include. Reads `collections.writing | groupWriting`. Renders legend, groups, chips, counts, `+N more`, `All writing →` |
| `src/assets/css/figures.css` | New stylesheet for `.fig`, `.fig__legend`, `.fig__mk`, `.chip`, `.chip--seedling/--budding/--evergreen/--newest`, the join's boxes and SVG sizing, the bed's groups, phone and print rules. Built from the patterns in `posts/revisiting-down-and-out.css`; the post keeps its own file. Loaded through `pageStyles` on `/`, `/about/`, `/writing/` only |
| `eleventy.config.js` | New filter `groupWriting(items)` → `{ notes, essays, evolving, newest, total }` with the rules in 4.2; new filter `pluralPieces(n)` → `"1 piece"` / `"N pieces"` for the WRITE row. `writingRecent` is no longer used by the home and is removed |
| `src/index.njk` | The order in section 3; `fig-join` (state 3) after the lede; the bed under WRITING; WORK and WRITE eyebrows; the `openTo` line; the résumé and writing rows; the in-progress row removed from WORK |
| `src/writing.njk` | The landing in 5.2 |
| `src/about.md` | The sequence in 5.1 |
| `_data/site.json` | New optional key `openTo` (string). Empty or absent → the line is not rendered |
| `_data/writing.json` | New file: `{ "elsewhere": { "show": false, "label": "garden/", "text": "Earlier notes stay in the garden", "url": "https://cognitivearchitecture.ca/" } }`. Seb flips `show` when the garden question is answered |
| `docs/brand.md` | Surfaces and composition: the home order becomes "hero, lede, the join, Work, the writing bed, Now, Write"; Figures: the stage key as a standing vocabulary; "the home carries two figures and no story" |
| `docs/pen-and-pixel.md` | A short section "The stage key": dashed = seedling (a first pass), hatch = budding (reworked), solid = evergreen (settled), moss = newest; the mapping rhymes with the base meanings (open, judgement applied, settled) and is used wherever writing is shown as a figure |
| `docs/writing-pipeline.md` | One line: the `stage` word now drives the home bed and the room's grouping, so the stage picker (next round) matters more |
| `docs/updating-copy.md` | Where `openTo` and `writing.elsewhere` live and how to change them |
| `CHANGELOG.md` | The entry |
| `scripts/portfolio-check.js` | No change; the home is not a case study. The new includes contain no employer material |

Structural items to propose before building (CLAUDE.md rule): two new includes, one new stylesheet, one new data file, one new data key.

## 7. Data and behaviour rules

- `site.openTo`: Seb's sentence, in voice, ending with the email as a link. Rendered as a mono line under the lede (the mock-up's position). Absent → nothing renders; nothing else on the page depends on it.
- `writing.elsewhere.show`: the garden slot in the Writing room; false until decided.
- `stage` on posts: `seedling` | `budding` | `evergreen`; the Drafts action writes `seedling`; missing stage renders honestly as "not set".
- **Without JavaScript**: identical; nothing is scripted.
- **Reduced motion**: nothing animates in the new parts.
- **Print**: the figure marks re-assert themselves under `@media print` the way the post stylesheet does, narrowly (marks only, never fills).
- **Dark mode**: via tokens; the moss outline is fern.
- **Performance**: one stylesheet of roughly 6–8 KB on three pages; two small inline SVGs; no new font weight (chips are mono 400/600, already loaded); no images. Layout is fixed-height by content, so no new layout shift source.

## 8. Accessibility

- Figures: `figure` with `aria-labelledby` pointing at the mono title; legend lists with `aria-label`; the SVGs `role="img"` with a full sentence label; marks `aria-hidden` and their meaning carried by the words beside them.
- Chips are real links; stage is in visually hidden text inside each chip, so the mark is never the only carrier.
- Counts and `newest` are text. Contrast: chip text in `--ink` on `--bg`; the moss outline against `--bg` is 7.0:1 light / 5.7:1 dark (non-text minimum 3:1); no new colour pairs.
- Target size: chips are at least 24px tall with 6px gaps; the `+N more` chip likewise.
- Headings: the home keeps its h1 and eyebrow h2s; the figures add no headings (titles are mono labels, as in the post's figures).

## 9. Testing

- Build: `npx @11ty/eleventy`; `node scripts/portfolio-check.js`; the five-view check (`site-check`) on `/`, `/about/`, `/writing/`: PASS, no overflow at 390.
- axe on the three pages, light and dark, 1280 and 390: 0 violations.
- A scratch fixture build with 12 placeholder posts across types and stages (not committed): the bed groups, counts, `newest`, `+N more`, and the room's year split all render; with 1 post: one group, one chip, no legend entries for absent stages; with 0 posts: no figure.
- Lighthouse desktop and mobile on `/`: CLS no worse than before this change (fonts are Phase 5's job).
- Print preview of `/about/` and `/writing/`: marks visible, no fills.
- `grep -rn "data-aud\|\.story" src/index.njk src/writing.njk src/about.md` → no hits (nothing from the case-study substrate leaks in).

## 10. Open items this spec leaves to Seb

- `openTo`: the sentence (D3). The line renders nothing until it exists.
- The garden question: flips `writing.elsewhere.show`. Nothing else waits on it.
- D11 is answered by this spec in the affirmative (the stage key becomes a standing vocabulary); if Seb prefers a strictly single-meaning vocabulary, the bed would carry its key on the figure only and the pen-and-pixel line would say so.

## Spec self-review

- Placeholders: none; the two user-authored strings are data keys with defined empty behaviour.
- Consistency: the home has no steps and no script (sections 3, 7); the steps live in About and the room (section 5); `groupWriting` serves both the bed and the room (sections 4.2, 5.2, 6).
- Scope: one implementation plan; it touches three pages, two includes, one stylesheet, two data files, four docs.
- Ambiguity resolved: missing `type` → notes; missing `stage` → "not set"; `inProgress` → evolving regardless of type; `newest` is by date across all groups; more than 12 → `+N more`.
