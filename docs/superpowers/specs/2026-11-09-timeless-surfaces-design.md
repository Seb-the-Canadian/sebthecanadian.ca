# Timeless surfaces: the glow retired, one box, one label, one rhythm

Design spec, 2026-11-09. Owner: Seb Lathangue. Status: for Seb's review before a plan is written.

## 1. Purpose

Remove the seasonal under-glow and the other surface effects, and tidy the interface so the site reads clean, polished and timeless: less of 2026 on the page, the same identity underneath. The audit's closing advice (section D.3, "make it last") named the under-glow as the one visual that will date; this pass takes that advice and uses the occasion to apply, consistently, rules the site already mostly follows.

Audience unchanged: a hiring manager or peer who should read "quiet, literate, hand-made" in five seconds. The brand's bones are unchanged: Fraunces, Atkinson Hyperlegible, IBM Plex Mono; parchment and charcoal; the duotone moss accent; the mark; the `S·L` stamp.

## 2. Decisions already taken (Seb, 2026-11-09)

- Subtract effects; keep every device (stamp, mark, seasons, pixel marks, keyboard chords, console greeting). The audit's "fewer devices" list is posed afterwards as its own set of decisions, not folded in here.
- Cards are flat: hairline border, the shared radius, flat panel fill, no shadow. Chosen from a mock over a soft neutral shadow.
- The refinement half applies one rule per thing, measured against the inventory in `build/h/inventory.md` of the audit folder (2026-11-09; 15 pages, 64 screens, every effect, component, gap, edge and type size).

## 3. Scope

In: `src/assets/css/tokens.css`, `base.css`, `components.css`, `figures.css`, `utilities.css`, `src/assets/css/posts/revisiting-down-and-out.css` (its figure panel only), `src/_includes/base.njk` (the policy's image rule), `docs/brand.md`, `CHANGELOG.md`, `BACKLOG.md`. Templates only where a CSS-only fix is impossible (none expected).

Out, on purpose: the case-study rooms (`case-study.css`, `case-study-marks.css`, `case-studies/*.css` are generated and gated; they inherit the body change and nothing else); the device list; tighter corner radii (10 → 6 everywhere); whether the home and Writing section headings should become Fraunces H2s; the type scale; the seasons mechanism; list indents; the résumé room's own ruled labels; the stories' own scale, hatches and controls. Each of these can be its own small decision afterwards, with a mock where it is visual.

## 4. Requirements

Values in px are at 1280 wide unless stated; the phone figures are at 390. "Column" means the text column; its left edge is the `S·L` stamp's left edge (279.44 at 1280, 18.95 at 390 today).

### 4.1 Surfaces: the effects go

1. Remove the tokens `--glow`, `--glow-l`, `--glow-d` (every season block and every mode block), `--card-shadow`, `--shadow-sm` and `--shadow`. After this pass no stylesheet outside the case studies declares a `box-shadow` except the figure-mark swatch rings (`inset` rings in `figures.css` and the post stylesheet), which are marks, not depth. Keep `--season-l`, `--season-d` and `--season` (the Now pulse and text selection).
2. The four written-out card gradients (`components.css` `.card`, `.garden-panel`, `.panel--alt`, `.resume-callout`) become `background: var(--bg-alt)`. The `.garden-panel` rules are removed entirely (no page uses them; if the garden returns it takes `.panel--alt`).
3. `.card:hover`: border colour moss only. No transform, no shadow. The transition lists only `border-color` (and `color` where a link inside changes). The reduced-motion block for the card is no longer needed.
4. `.resume-photo img`: no shadow.
5. The shortcuts dialog (`.kbd-overlay`, `.kbd-overlay-inner`): keep the 80 % tint of the overlay; remove `backdrop-filter`; remove the dialog's shadow (its hairline border stays).
6. The paper grain leaves `body` (`base.css`): no `background-image`, no `background-blend-mode`; `background-color: var(--bg)` stays. Measured on an empty patch, luminance variance is 0 in both modes.
7. Dark-mode lift: with the grain gone, a dark panel (`--bg-alt` `#1d1e21`) measures lighter than the dark page (`--bg` `#16171a`) by the token difference, and a light panel darker than the light page, so surfaces read the same way in both modes.
8. The content-security policy's image rule drops `data:` (`img-src 'self'`), since the grain was its only user; the comment beside it in `base.njk` is updated. `scripts/csp-check.js` still passes; the policy's other rules are untouched.

### 4.2 One box

9. A framed box is: `1px solid var(--rule)`, `border-radius: var(--radius)`, `background: var(--bg-alt)`, no shadow.
10. Content panels pad `var(--space-lg)` (24): `.card`, `.panel--alt` (the Now panel), `.resume-callout`, `.kbd-overlay-inner` (today 32).
11. Figure panels pad `var(--space-md)` (16) on every side: `.fig` (already 16) and the post's `.rdo-fig` (today 16 / 17.6 / 17.6).
12. Inner boxes inside figures (`.fig__box`) take `var(--radius-sm)` (today a raw 8px). Chips (`.chip`, today 5px), the in-progress pill (today 3px), the active badge, `kbd` and the controls all take `var(--radius-sm)`. Mark swatches (`.fig__mk`, 3px) are exempt: they are figure vocabulary.

### 4.3 One label

13. A tracked label is: IBM Plex Mono, `var(--text-xs)` (12px), weight 600, uppercase, `letter-spacing: 0.1em`. It applies to: the title block's eyebrow (today 0.16em), `h2.eyebrow` on the home and Writing, table headers (`th`), figure titles (`.fig__title`, today 11.5px / 400 / 0.06em), the dialog title (today 14px), the webmention heading, the About step kicker (`.fig-seq__kicker`, today 400 / 0.08em), the writing key.
14. Colour by role: moss when the label is a heading (the eyebrow, `h2.eyebrow`, the dialog title, the webmention heading); muted when it labels a box or a table (`.fig__title`, `.fig-seq__kicker`, `th`, the writing key).
15. The footer wordmark keeps 11px and its lowercase but takes the same 0.1em tracking (today 0.15em). Index-row labels (11px, 0.1em) and the Writing year labels keep their size (brand-listed) and are unchanged. The résumé's ruled section labels (0.7rem, 0.2em, `--link`) are the résumé room's own rule and are unchanged.
16. State labels: the in-progress pill (`.index-pill--active`) and the active badge (`.badge--active`) share one construction: mono 12px, weight 600, uppercase, 0.1em, padding `2px 6px` (one pair for both; today the pill is 0 × 2.88 and the badge 1.8 × 6), `1px solid` in the state's colour, a 10 % tint of that colour, `var(--radius-sm)`. The pill stays amber (in progress), the badge moss (active).
17. The directory rows (`.index-table`, today 13px) and `.home-more` take `var(--text-sm)` (14px). Their labels and meta are unchanged.
18. Weight the site can load: the two rules that ask Atkinson for 600 (the current nav item, `.pull-line`) say 700, which is what the browser already renders.

### 4.4 One rhythm, one edge

19. The home hero (`.home-hero`) gets the same padding reset as `.masthead`, `.post-header` and `.resume-header` (`max-width: none; margin-inline: 0; padding: 0`): its mark, name, line and meta start on the column (0 at both widths; today +36 / +18.96).
20. The site header's and the footer's hairlines span the column exactly (today 36px past it on each side at 1280, 18.96 at 390). The first nav word starts on the column (today +8 from the link's padding; the hover pill may extend 8px left of the column). Suggested means: draw each rule on a pseudo-element inside the padded box, or shift the nav list by its link padding; the requirement is the measurement.
21. Title block → first content: 32px on every page that draws the title block from the include (today 24 on the home, 32 on most, 48 on Projects, Uses and Links where the first `h2`'s top margin collapses through). The home hero → lede gap is also 32. The résumé (16, its header follows the stamp line directly) and the case studies (their own room) are unchanged.
22. A section eyebrow (`h2.eyebrow`) → its content: 16px on the home (today 32) and on Writing (today 8) and in the Now panel (today 8 → 16). Fraunces `h2` → content stays 16 (Projects, résumé) and the 48px heading rhythm on running-text pages stays.
23. Last block → footer: the same on every page: 112 at 1280 and 88 at 390 (today 112 / 128 / 160 and 88 / 104 / 136). Suggested means: `main > :last-child { margin-bottom: 0 }`.
24. Header → title block stays 88 (64 on the phone) on every page with the block; the home hero's extra 24px top margin goes so the home matches (today 112).
25. The home and Writing keep `--flow` between their composed blocks; running-text pages keep `--space-2xl` (48) above an `h2`. Both are written down in brand.md as the rule (block spacing vs heading spacing).

### 4.5 Fixes the inventory found

26. The dialog's Close button centres like the switch and the meta line above it (a later `.button { display: inline-block }` rule beats the intended `display: block; margin: auto`).
27. The `:focus-visible` rule no longer sets `border-radius` on whatever is focused (today the dialog's corners go from 10 to 6 while it is focused). The outline keeps its 2px moss ring and 3px offset; a radius for small inline targets, if wanted, is scoped to them.
28. `.post-meta` outside a post (the Now panel's meta line) gets the same treatment as inside one: mono, `var(--text-sm)`, muted. Verify the live dot's line still reads right.
29. The five raw `12px` declarations in `components.css` become `var(--text-xs)`. In `figures.css`, margins, paddings and gaps whose value is already on the spacing scale (8, 16, 24) become the token; figure-internal fine values (12.8, 14.4, 9.6, 8.8) stay and are left as the figure vocabulary's own.
30. `tokens.css`'s header comments and the seasons comment say what the tokens now drive (the Now pulse and selection only).

### 4.6 Records

31. `docs/brand.md`, in the same commit as the rule changes: Colour (the seasons sentence drops the card glow; "the accent … matching its card under-glow" becomes a plain statement of the two accents; the `--surface` row stays); Surfaces and composition ("One card look" becomes "One framed box" with the two paddings; "Backgrounds" becomes flat parchment and charcoal, no texture; a "Labels" rule; the rhythm rule from 4.4); Identity marks (retired list gains the seasonal under-glow, the card gradient and the paper grain); Behaviour (hover: border only, no lift; the dialog's tint without blur); Type (the label rule; the 11px exceptions named). Every number it states is true of the built pages.
32. `CHANGELOG.md`: one entry in the house style, user-visible changes only.
33. `BACKLOG.md`: under "After the audit sprint": the device decisions pass; the three deferred taste questions (corner radius, the home and Writing headings, the type scale) each as one line with what a mock would show.
34. `docs/pen-and-pixel.md`: unchanged unless a figure-panel value it states changes (check the 16px padding sentence if there is one).

## 5. Proof

Before any review is asked for, on the branch's build:

- The inventory's scripts (`build/h/measure.js`, `spacing.js`, `effects.js` in the audit folder, read-only) run again and show: hero text at 0 / 0; header and footer rule width = column width; title block → first content 32 on every masthead page; eyebrow → content 16 on the home, Writing and Now; last block → footer 112 / 88 everywhere; no `box-shadow` on any site page except the mark rings; grain variance 0; one label size, weight and tracking across the elements in 4.3; dark panel lighter than dark page; the theme switch to light on a dark system yields the light values (no shadow tokens left to diverge).
- `node scripts/site-check.js` five views on every page type (home, About, Projects, Writing, a post, the post with figures, a tag page, keyboard, résumé, uses, links, colophon, 404) and both case studies; `axe` 0 violations on the same at 1280 and 390 (`bypassCSP: true`); `node scripts/csp-check.js` passes with the tightened image rule.
- `node scripts/portfolio-check.js` passes (no stamped file changed) and `--scan` is clean on every changed file and commit message.
- A before-and-after preview (main beside the branch) published for Seb at both widths in both modes, with the dialog open on the keyboard page, before any review or merge is asked for.

## 6. Risks and how they are held

- A value changed for consistency reads worse than before (the eyebrow's tracking, the 14px rows, the 24px dialog). Held by the preview: each is one value to put back, and the spec names today's value beside the new one.
- Removing the grain changes the feel of every page, including the case studies, which are not otherwise touched. Held by the preview and by the fact that the stories' own panels keep their look.
- The header/footer rule change touches a layout rule shared by `main`. Held by the measurement (column edges unchanged on every page) and the five-view check.
- The policy change is one word; `csp-check` proves the script hashes still agree, and the built pages carry no other `data:` address (verified 2026-11-09: only `base.css`).

## 7. Open points

None that block the plan. The three deferred taste questions go to the backlog (4.6, item 33).
