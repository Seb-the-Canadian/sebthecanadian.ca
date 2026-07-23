# Design Reference — gwern.net (Gwern Branwen)

Notes from reviewing `gwern.net/about` as outside design inspiration.
Captured 2026-07-23 — the domain was directly reachable this session, so
this analysis is from the live HTML and CSS (`/static/css/head.css`,
`/static/css/style.css`), not inference.

Like the other three docs in this set, this is **inspiration to filter
through the Data Druid system**, not a redesign brief. This review is
analysis of the site's design system and CSS architecture only — it
doesn't quote or reproduce the essay's written content.

## What the site is

Gwern Branwen's personal research/essay site — long-form, heavily
researched writing (AI, statistics, psychology, self-experimentation).
The `/about` page specifically documents the site's own design philosophy
and production values, which makes it a useful meta-parallel to our own
`about.md`'s "how this site is built" section. Unlike the three prior
reviews (portfolio/agency sites optimizing for a pitch or a hire), this is
a mature, decade-plus-maintained personal reference site optimized for
**long-form reading at scale** — hundreds of essays, extensive
cross-referencing, footnotes numbering in the dozens per page.

## Patterns worth stealing

1. **Serif body text, monospace strictly for code.** Confirmed via
   `head.css`: `--GW-serif-font-stack` (`Source Serif 4`, …) is the body
   default at `20px`/`18px` mobile; `--GW-monospaced-font-stack` is
   **IBM Plex Mono** — the same family this site already self-hosts —
   but reserved only for code. This is the traditional academic-reading
   argument for serif-for-long-form: worth naming as a real data point,
   not a case for reversing Seb's own considered choice to unify on
   monospace for both heading and body (a deliberate "terminal register"
   decision, not an oversight) — but useful context for why that choice
   is a genuine tradeoff, not a default.

2. **Epigraphs.** Six `.epigraph` blocks appear on this one page alone —
   short, indented, distinctly-styled quotes opening a section, separate
   from body prose. A classic literary device reinforcing "durable
   long-form writing" as an identity, not just a features list. Cheap to
   adopt: a `.epigraph` CSS class + a markdown convention, no new tooling,
   usable selectively on native posts that earn it.

3. **Admonition boxes.** `.admonition.error` (etc.), each with an
   `.admonition-title` bar — distinctly bordered/colored callouts for
   meta-notices (e.g. a no-JS warning). More visually legible than plain
   italic text for a "heads up" moment. Good candidate for e.g. a
   "syndicated from the garden" or "draft" notice on writing posts —
   more legible than the current plain-text treatment.

4. **An `.abstract` block precedes the essay.** A one-paragraph summary
   set visually apart before the main content starts. This is the same
   idea as this site's own `.lede` (already shipped, from the Yepsen
   review) taken one step further and formalized as its own named
   convention specifically for longer pieces — worth considering whether
   `.lede` should grow an `.abstract` sibling for genuinely long posts,
   rather than introducing a new class from scratch.

5. **Real, anchored footnotes as the substrate — progressive enhancement
   layered on top, not required.** 41 `footnote-ref`/`footnote-back` pairs
   on this page are plain, working, no-JS-required anchor links; the
   site's famous sidenote/hover-popup system is a *JS enhancement over*
   this working base, not a replacement for it. This is the single
   strongest point of alignment with this site's own
   `DESIGN_PRINCIPLES.md` commitment to progressive enhancement — a more
   mature, more thoroughly executed version of the same idea than any of
   the three prior reviews demonstrated (Henry's Taxi.js came closest).
   Worth citing directly as validating precedent, not as something to
   newly adopt (this site's webmention/h-entry footnote handling already
   follows the same "real HTML first" logic).

6. **Auto-generated Table of Contents for long pages.** `#TOC` builds
   from the page's own headings. Cheap, compatible, no new dependency —
   Eleventy can generate this from existing markdown headers. Worth
   considering for `/about/` itself (which is already organized into
   several `##` sections) or any future long-form native post.

7. **Per-domain colored link icons** (`data-link-icon-color` on outbound
   links) — a small colored marker indicating destination type/domain
   before a reader clicks. Information-dense wayfinding, in the same
   spirit as this site's own "dense, respects the reader's time" language
   in `DESIGN_PRINCIPLES.md`. Compatible in principle, but building the
   full infrastructure (domain-to-color mappings at Gwern's scale) is a
   real lift — flag as aspirational, not a quick win, given how few
   outbound links this site currently has to annotate.

8. **A seasonal reskinning easter egg.** `body.special-halloween-dark`
   and similar seasonal classes swap in a themed palette on specific
   dates — pure CSS-scoped, no structural change, purely a once-a-year
   treat. Low-risk, optional fun if ever wanted — not a design need.

## What NOT to copy

- **The full popup/hover-preview annotation engine** (`link-annotated`,
  `link-annotated-partial`, "extracts mode"). This is a substantial,
  bespoke JS system built over many years for a site with thousands of
  cross-referenced essays. Wildly disproportionate to this site's size
  and stack philosophy ("no new JS dependencies" — `pitch-v1.html`'s own
  Backout section, `DESIGN_PRINCIPLES.md`'s progressive-enhancement
  commitment). Skip wholesale.
- **Per-domain link-icon infrastructure at Gwern's scale** — hundreds of
  curated domain/color mappings. Same reasoning: disproportionate
  maintenance burden for a personal site with a handful of outbound
  links. The *idea* survives above (item 7); the *infrastructure* doesn't
  transfer at 1:1 scale.
- **Independent dark-mode / reader-mode / extracts-mode toggles.** Three
  persistent, JS-backed UI modes is real surface area, and two of the
  three modes (reader, extracts) exist to control a popup/sidenote system
  this site doesn't have. Adopting the toggle without the feature it
  toggles would be UI with nothing behind it.
- **935px max-width / 20px serif body text at Gwern's density.** Tuned
  for extremely long, footnote-and-citation-dense academic essays. This
  site's tighter 64ch/68ch measure and smaller monospace body serve a
  different, equally valid "terminal, dense, quiet" reading mode for
  different content — not a mismatch to fix.

## Suggested next steps

See `BACKLOG.md` for the concrete "Idea" items pulled from this review
(epigraph convention, admonition/callout box, an `.abstract` sibling to
`.lede` for long-form posts, auto-generated TOC for long pages, optional
seasonal CSS easter egg). None of this is scheduled — it's inspiration to
draw on next time a relevant page or component is touched.
