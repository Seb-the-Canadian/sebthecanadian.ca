# Brand — the current rules

| Field | Value |
|-------|-------|
| Updated | 2026-10-26 |
| Status | **Current.** The one place for how the site looks and behaves now |
| Precedence | The built site, then this page, then the documents it links to. `DESIGN_BRIEF.md` and the pitch/plan docs are history |
| Sources | `src/assets/css/tokens.css`, CHANGELOG (Design v3, 2026-07-23), `docs/implementation-plan-design-v3.md`, `docs/pen-and-pixel.md` |

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
| `--moss` | violet `#5b3fa3` | fern `#6f9d52` | the accent: H2s, links, the active thing |
| `--amber` | `#b07a0f` | `#d9b24a` | second accent, states |

- **Duotone.** The accent is violet in light mode and fern in dark, each
  matching its card under-glow. The name `--moss` is legacy.
- **Seasons.** The build sets `data-season` on `<html>`; the card glow and a
  seasonal accent (the Now pulse, text selection) shift with it. Nothing else
  does.
- **Dark mode is neutral charcoal.** The forest lives in the accents, not the
  background.
- **Contrast.** Text meets WCAG AA (4.5:1). The accents clear it on every
  background; the lowest is dark-mode moss on panels at 5.25:1 (measured
  2026-10-26; the Design v3 note's "6:1 or better" no longer holds for it).
  Light-mode amber is 3.3:1, so it never colours text; it borders and tints.
- **No new colours** without updating this table.

## Type

Three families, all self-hosted from `src/assets/fonts/` (never Google Fonts):

| Family | Role |
|---|---|
| **Fraunces** | display: `h1`–`h3`, figure titles |
| **Atkinson Hyperlegible** | body and UI text |
| **IBM Plex Mono** | code and the data/terminal devices: index rows, the `S·L` stamp, the footer wordmark, labels and numbers in figures |

- Type and gutters scale fluidly with `clamp()`; no snapping at breakpoints.
- One date format everywhere: "24 Jul 2026" (the `humanDate` filter).

## Identity marks

- **`S·L` stamp** at the start of every page's title block (`masthead.njk`),
  above an eyebrow and the `h1`. The home page is the exception: it opens
  with an arrival hero instead (the mark, the name in Fraunces as the `h1`,
  one line in the display face).
- **Moss H2s** site-wide (1.35rem, 600, `--moss`). The résumé keeps its own
  ruled section labels; case studies keep their own heading scale (Rooms,
  below).
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
  portrait, one pixel divider under the home lede. Pixel is an accent, never
  a texture.
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
- **The home page leads with the work**: hero, lede, then Projects (case
  studies first, then projects), then Now, then the garden, then Elsewhere.
  Writing lives off-site and follows the work.

## Figures and data

Meaning in figures rides on marks, not colour: **pen + pixel**
(`docs/pen-and-pixel.md`).

- solid = recorded, data · pixel dither = machine, AI · pen hatch = human
  judgement · ruled = documented · dashed outline = unresolved.
- **Moss means where to look**: the reader's path and the answer.
- **Amber means a state**, always with an icon and a word.
- Marks sit in a strip at the edge of a box, beside a word that names them,
  inside figures only.
- Chart series by line style plus direct labels, three at most.

## Behaviour

- **Works without JavaScript.** Scripts enhance; the theme falls back to
  `prefers-color-scheme`; every figure shows in its finished state.
- **Reduced motion** is honoured; a **print** stylesheet exists and stays
  correct.
- Phone width is a first-class layout, not a squeeze.

## Rooms with their own rules

- **Case studies** (`/projects/<slug>/`): Portfolio Pudding stories inside the
  site, scoped to `.story`, on these tokens and fonts. Their composition is
  their own, and the live front-door page is the reference: a heavy Fraunces
  headline (800), chapter H2s in moss at display size (about 2.3rem, 700),
  and figures in flat framed panels on `--bg-alt`, not the glowing card.
  Figures follow pen + pixel like everywhere else. Bring a story in with the
  converter, which keeps this look; never restyle the room toward the
  site-wide heading tier or card. How to bring one in and publish it:
  `docs/portfolio-clearance.md`.
- **The garden** lives off-site (cognitivearchitecture.ca); on this site it is
  a portal with one consistent label.

## Before shipping a visual change

1. Light and dark mode, and at least one season.
2. Phone width (390px) and desktop.
3. JavaScript off.
4. Contrast for any new colour pairing.
5. If a rule above changed, change it here too.
