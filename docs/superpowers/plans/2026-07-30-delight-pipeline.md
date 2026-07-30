# Delight pipeline — joy & reward additions

**Date:** 2026-07-30
**Branch:** `claude/project-build-review-u7vaai` (design-v3)
**Method:** diverge → converge, run by hand against the four design briefs
(`docs/design-reference-{gwern,yepsen,henry-codes,neil-wengerd}.md`) and the
site's existing delight hooks (`console-hello.js`, the `tendedState` filter,
the pulsing `.live-dot`, the 404 pixel art, amber `a:hover`).

## Diverge — candidates

Seasonal under-glow · season-aware console easter egg · hover-reveal heading
anchors with copy-link · pull-quote component · Gwern-style admonitions /
callouts · post epigraphs · auto-TOC · abstract block · Tufte sidenotes /
footnotes · view-source welcome · copy-email toast.

## Converge — shipped now

Chosen for being self-contained, perceptible without new content, and on-voice.

1. **Seasonal under-glow (both modes).** `data-season` is set on `<html>` at
   build time (`season` global in `eleventy.config.js`; Toronto meteorological
   seasons). `tokens.css` maps each season to a `--glow-l` / `--glow-d` pair,
   and each mode picks its own — violet family in light, green family in dark —
   so the shift reads as weather, not a theme change. The daily cron keeps it
   tracking the real calendar.
2. **Season-aware console / view-source easter egg.** `console-hello.js`
   refreshed to the pixel-conifer dialect and current palette, and it reads
   `data-season` to greet in-season. The HTML-source comment in `base.njk`
   matches.
3. **Hover-reveal heading anchors.** `heading-anchors.js` gives content
   headings slug ids and a trailing `#`; clicking copies the section's deep
   link ("copied" confirmation). Progressive enhancement, no build transform;
   skips home-page eyebrow labels; hidden in print.
4. **Pull-quote component.** `{% pullquote "source" %}…{% endpullquote %}`
   paired shortcode + `.pullquote` styling — a display-serif pulled line with
   optional citation. A new authoring tool for posts.

## Pipeline — shelved (need authoring or more design)

- **Admonitions / callouts** (Gwern) — `.note` / `.caution` boxes; needs an
  authoring convention + icon set.
- **Post epigraphs** — a short front-matter quote above a post's body.
- **Auto-TOC** — for long posts; pairs with the heading ids anchors now add.
- **Abstract block** — a lead summary style for essay-length pieces.
- **Sidenotes / footnotes** (Tufte) — margin notes on wide viewports.
