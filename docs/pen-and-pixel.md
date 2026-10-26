# Pen + pixel — how figures carry meaning

| Field | Value |
|-------|-------|
| Date | 2026-10-26 |
| Status | Adopted. First used by the case studies (`src/assets/css/case-study.css`) |
| Tokens | `--mark`, `--mark-solid`, `--mark-ruled`, `--mark-hatch`, `--mark-dither` in `src/assets/css/tokens.css` |

## The problem it solves

On this site colour is **weather**. The accent changes with the mode (violet
in light, fern in dark) and the card glow changes with the season. That is the
point of it, and it means colour can't carry information: a figure whose
legend says "violet means data" is wrong half the time.

Figures need **signal** that holds still. Two other ways were tested
(2026-10-26) and set aside:

- **One added accent** ("tarn"). It works for two series, but moss would
  then mean both "this site" and "data", and the new colour has to change hue
  between modes too.
- **A separate palette** of three stable earth colours. It scales to many
  charts, but it is the most to maintain, and moss can't sit beside it: fern
  green and warm colours, and violet and blue, collapse for colour-blind
  readers.

Pen + pixel adds no colours. Meaning rides on marks.

## The vocabulary

| Mark | Token | Means | Example |
|---|---|---|---|
| solid | `--mark-solid` | recorded, data | "Data rules" |
| pixel dither | `--mark-dither` | machine, AI | "AI rules", "AI comparison of approaches" |
| pen hatch | `--mark-hatch` | human judgement | "what I recommend", an inferred claim |
| ruled | `--mark-ruled` | documented | a document-supported claim |
| dashed outline | (border) | unresolved, open | an unresolved claim |

Two colours keep a job inside figures:

- **Moss means where to look:** your path and the answer (your clicks, "you
  found it here", the front door you arrive at).
- **Amber means a state** (a gap, something held), always with an icon and a
  word. Light-mode amber never colours text; it fails contrast as text.

## Rules

1. **Inside figures only.** Never as a page, section or card background.
   Design v3 removed background texture on purpose; this doesn't bring it back.
2. **Always beside a word.** Each mark sits next to a label that names it, so
   the meaning survives high-contrast mode (which strips background images),
   print, and readers who don't decode patterns.
3. **A strip, not a fill.** Marks sit in a narrow strip at the edge of a box
   or chip. Text never sits on texture.
4. **Text wears ink.** Labels and values stay in `--ink` / `--muted`; the mark
   beside them carries the category.
5. **Series in charts** are told apart by line style (solid, dashed, dotted)
   and direct labels, three at most. More than that: small multiples.

The mark tokens follow the mode on their own; they are drawn in `--ink-soft`.
