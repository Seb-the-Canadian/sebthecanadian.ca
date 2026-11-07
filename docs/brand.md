# Brand — the current rules

| Field | Value |
|-------|-------|
| Updated | 2026-11-07 |
| Status | **Current.** The one place for how the site looks and behaves now |
| Precedence | The built site, then this page, then the documents it links to. `DESIGN_BRIEF.md` and the pitch/plan docs are history |
| Sources | `src/assets/css/tokens.css`, `base.css`, `components.css`, `figures.css`, `print.css`, CHANGELOG (Design v3, 2026-07-23), `docs/implementation-plan-design-v3.md`, `docs/pen-and-pixel.md` |

Change a rule here when you change it on the site, in the same commit.

## The voice

Data Druid: warm parchment, forest accents, hand-built and slowly tended.
**One voice, many rooms**: the voice holds on every page, and each page gets
its own composition. Repetition is the failure to avoid (it was the verdict
on Design v2).

## Colour

Colour is **weather**. It sets the atmosphere and is allowed to shift, so it
never carries meaning inside a figure (see Figures).

| Token | Light | Dark | Job |
|---|---|---|---|
| `--bg` / `--bg-alt` | parchment `#f5f2eb` / `#ebe7db` | charcoal `#16171a` / `#1d1e21` | page / framed panels |
| `--ink` / `--ink-soft` | `#15201a` / `#3a453d` | `#e8e4dc` / `#c3bdaf` | text / softer body |
| `--muted`, `--rule` | `#595249`, `#d4cfc5` | `#a8a195`, `#2c2d31` | secondary text, hairlines |
| `--moss` | violet `#5b3fa3` | fern `#6f9d52` | the accent: H2s, eyebrows, the stamp, the active thing |
| `--amber` | `#b07a0f` | `#d9b24a` | second accent, states |
| `--link` / `--visited` | `#513592` / `#5e4b3e` | `#85ab63` / `#b89c84` | links (a shade off the accent) / visited links; `--link` also colours the résumé's section labels |
| `--code-bg` | `#ebe7df` | `#1e1f22` | code, `kbd` keys, the webmention type tag |
| `--wash` | `--moss` at 6% | `--moss` at 7% | a moss tint: blockquotes, the current page in the nav |
| `--surface` | `--bg` mixed 8% toward `--ink` | the same mix | a raised surface: nav hover, the archived badge, the shortcuts dialog |

- **Duotone.** The accent is violet in light mode and fern in dark, each
  matching its card under-glow. The name `--moss` is legacy.
- **Seasons.** The build sets `data-season` on `<html>`; the card glow
  (`--glow-l` / `--glow-d`) and a seasonal accent (`--season-l` /
  `--season-d`: the Now pulse, text selection) shift with it. Nothing else on
  the page does (the greeting in the browser console names the season too).
- **Dark mode is neutral charcoal.** The forest lives in the accents, not the
  background.
- **Links** in running text are `--link`, underlined. A link in running
  text set in ink or muted (an index row, a post's tags) carries a faint
  `--rule` underline, so it reads as a link by more than its colour.
  Navigation, the footer, card titles and webmention authors are links where
  a link is expected: ink or muted, no underline.
- **Contrast.** Text meets WCAG AA (4.5:1). The accents clear it on every
  background; the lowest is dark-mode moss at about 4.9:1, on the shortcuts
  dialog's `--surface` (4.87:1) and on the 12% moss tint inside case-study
  figures (4.91:1) (measured 2026-11-04; the earlier 5.25:1 on panels was not
  the lowest pair). Light-mode amber is 3.3:1, so it never colours text; it
  borders and tints.
- **No new colours** without updating this table.

## Type

Three families, all self-hosted from `src/assets/fonts/` (never Google Fonts):

| Family | Role |
|---|---|
| **Fraunces** | display: `h1`–`h3`, figure titles |
| **Atkinson Hyperlegible** | body and UI text |
| **IBM Plex Mono** | code and the data/terminal devices: index rows, the `S·L` stamp, the footer wordmark, labels and numbers in figures |

- IBM Plex Mono is subset to Latin (plus ✓); extend the range in `scripts/fonts/subset.sh` before using other scripts.
- Fallback fonts carry matched metrics (the `size-adjust` and override rules in `tokens.css`), so text set in a stand-in font holds the brand fonts' space; regenerate those values when a brand font file changes (the comment in `tokens.css` says how).
- Type and gutters scale fluidly with `clamp()`; no snapping at breakpoints.
  In `base.css`: body 16–18px, `h1` 2–2.9rem, `h2` 1.3–1.6rem
  (`clamp(1.3rem, 1.12rem + 0.9vw, 1.6rem)`), `h3` 1.12–1.35rem.
- **Small text has a floor.** 12px (`--text-xs`, 0.75rem) is the smallest
  running text: row meta and its dates, pills, eyebrows, table headers, the
  stage key. Tracked labels can go to 11px: the index-row labels, the year
  labels in the Writing index, the résumé's section labels (0.7rem) and the
  footer wordmark. Figures set their own label sizes.
- One date format everywhere: "24 Jul 2026" (the `humanDate` filter). The
  résumé is the exception: its roles give years only ("2025–2026"), as
  résumés do.

## Identity marks

- **`S·L` stamp** at the start of every page's title block, above an
  eyebrow and the `h1`: mono at 600, in `--moss`, inside a hairline box.
  Every page draws the block from one include, `masthead.njk`; posts (the
  eyebrow is their type: `note/`, `essay/`, or `post/` when they have none)
  and the résumé keep their own `h1` and take only the stamp and eyebrow.
  The exceptions: the home page opens with an arrival hero instead (the
  mark, the name in Fraunces as the `h1`, one line in the display face); the
  redirect stub (`/now/`) has no title block; each case
  study's hero carries its own copy (Rooms, below).
- **Moss H2s** site-wide (fluid 1.3–1.6rem, 600, `--moss`; see Type). The
  résumé keeps its own ruled section labels; case studies keep their own
  heading scale (Rooms, below).
- **Footer wordmark**: "S·L © Seb Lathangue · seb the canadian", in mono.
- **The mark is duotone, like the accent.** A lavender sprig in light mode
  (three spikes: violet `#5b3fa3` florets, lilac `#8a52cc` highlights,
  forest-green `#3d6b34` stems) and the pixel conifer in fern `#6f9d52` in
  dark. Both sit on the same 12-cell pixel grid. On a page the mark is drawn
  inline (`mark.njk`), so it follows the site's theme toggle; never as
  `<img src="favicon.svg">`, which can only see the system setting.
  `favicon.svg` switches with the browser's colour scheme; images that serve
  both modes (the PNG favicon, the touch icon, the OG cards) use the sprig.
  The PNGs come from `scripts/generate-og.py`; regenerate rather than edit by
  hand.
- **Pixel dialect = system scale.** The mark, the 404 page, the About
  portrait. Pixel is an accent, never a texture. (The home's divider is a
  plain hairline now.)
- **Retired:** the woodcut stamp and corner frames, the speckled forest-floor
  background, the dark garden night panel, the maple leaf.

## Surfaces and composition

- **One card look**: hairline border, the shared radius and padding, a soft
  shadow, a warm top-lit gradient in light mode, and the seasonal
  **under-glow** (`--card-shadow`). Project cards, the Now panel and the
  garden all use it.
- **Backgrounds**: only a whisper of paper grain. No pattern, no texture, no
  dark hero blocks.
- **Separation**: quiet eyebrow labels and generous whitespace. Never stack
  separator systems; one per page is plenty.
- **Tables**: hairline `--rule` lines between rows (a `--muted` one under the
  header row), cells padded `--space-xs` by `--space-sm`, and headers in
  mono at 600 (like the stamp), 12px, uppercase, tracked, in `--muted`. A long word breaks inside its
  cell rather than push a phone page sideways. A table that carries a class
  (the case studies' register) keeps its own look.
- **The home page**: hero, lede, the open-to line (when set), the join, Work
  (case studies first, then projects), the writing bed, Now, Write. The home
  carries two figures and no story; the stories live in their rooms (the
  join's three steps on About, the bed's process in the Writing room).
  Writing lives on this site, at `/writing/`, and follows the work.

## Figures and data

Meaning in figures rides on marks, not colour: **pen + pixel**
(`docs/pen-and-pixel.md`).

- solid = recorded, data · pixel dither = machine, AI · pen hatch = human
  judgement · ruled = documented · dashed outline = unresolved.
- **The stage key** (writing shown as a figure): dashed = seedling, a first
  pass · hatch = budding, reworked · solid = evergreen, settled · moss =
  newest. It rhymes with the base meanings (open, judgement applied, settled)
  and is a standing vocabulary (D11).
- **Moss means where to look**: the reader's path and the answer.
- **Amber means a state**, always with an icon and a word.
- Marks sit in a strip at the edge of a box, beside a word that names them,
  inside figures only.
- Chart series by line style plus direct labels, three at most.

## Behaviour

- **Works without JavaScript.** Scripts enhance; the theme falls back to
  `prefers-color-scheme`; every figure shows in its finished state. A
  control that only works with a script stays hidden until the script shows
  it (the résumé's print button).
- **Controls look like controls.** Buttons and the switches carry a
  `--muted` border, not the faint `--rule` hairline.
- **The theme switch has two states.** The site follows the system setting
  until the visitor presses the switch; a press stores light or dark in that
  browser, applied before first paint on later visits. There is no "system"
  position to cycle back to.
- **Shortcuts can be switched off.** The choice is remembered in the browser;
  the switch is in the `?` dialog and on `/keyboard/`.
- **Motion stops on its own.** The Now dot pulses five times on arrival
  (about 12 seconds), then rests.
- **Reduced motion** is honoured; a **print** stylesheet exists and stays
  correct (the figures on the home, About and Writing, and in one post, keep
  their marks on paper; the résumé's mark prints).
- Phone width is a first-class layout, not a squeeze.

## Rooms with their own rules

- **Case studies** (`/projects/<slug>/`): Portfolio Pudding stories inside the
  site, scoped to `.story`, on these tokens and fonts. Their composition is
  their own, and the live front-door page is the reference: a heavy Fraunces
  headline (800), chapter H2s in moss at display size (about 2.3rem, 700),
  and figures in flat framed panels on `--bg-alt`, not the glowing card.
  Figures follow pen + pixel like everywhere else. Bring a story in with the
  converter, which keeps this look; never restyle the room toward the
  site-wide heading tier or card. Each story's hero carries the `S·L` stamp
  inside its own eyebrow, written in the story rather than drawn from
  `masthead.njk`. How to bring one in and publish it:
  `docs/portfolio-clearance.md`.
- **Writing** (`/writing/`): notes and longer pieces in the site's own look.
  The room opens with its title block and a small figure of the stages, then
  the newest three, then every piece grouped as `notes/`, `essays/` and
  `evolving/` (split by year once a group passes twelve rows across more
  than one year), then the stage key and the tags. Each piece is an index
  row: the label is the post's type (`note/`, `essay/`, `post/` when it has
  none); the meta column gives the stage word, then the date. Stages are
  words, never colour: seedling (a first pass), budding (reworked),
  evergreen (settled). A post page opens with the stamp and its type as the
  eyebrow, then its title, and shows type and stage in its meta line.
- **The garden** (cognitivearchitecture.ca) is no longer where writing
  starts. Its posts stay in the Atom feed, linking out, until they move here.

## Before shipping a visual change

1. Light and dark mode, and at least one season.
2. Phone width (390px) and desktop.
3. JavaScript off.
4. Contrast for any new colour pairing.
5. If a rule above changed, change it here too.

One way to run the first three: `node scripts/site-check.js <url> <out-dir>`
(desktop and phone, light and dark, JavaScript off, with screenshots); it
needs Playwright on the machine that runs it.
