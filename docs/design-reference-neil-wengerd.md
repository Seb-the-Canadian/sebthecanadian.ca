# Design Reference — neilwengerd.com (Neil Wengerd)

Notes from reviewing `neilwengerd.com` as outside design inspiration.
Captured 2026-07-22 from three saved pages (home, Grafica, Campfire) since
the domain and its CDN-hosted stylesheet aren't reachable from this
environment (see caveat below).

Like `docs/design-reference-yepsen.md`, this is **inspiration to filter
through the Data Druid system**, not a redesign brief.

## Caveat: partial visual data

Two of the three pages (Grafica, home) carry no inline CSS — colors and
type sizes live in an external Webflow stylesheet
(`neil-wengerd-95553c.webflow.shared.5b3f11820.css`) that this environment's
network policy also blocks. The Campfire page has a few inline `<style>`
snippets (bullet colors, slider-dot colors) that hint at the palette. Exact
hex values and font names for the home/Grafica pages are **inferred from
class names, not confirmed** — treat any color/type claim below as
directional, not literal, unless it's sourced from Campfire's inline CSS.

## What the site is

A personal site for a designer/coach that splits into **two named
sub-practices**, not one generalist portfolio:

- **Grafica** — brand identity & design strategy (agency-facing, boutique
  consultancy register)
- **Campfire** — coaching for creatives & leaders (personal, vulnerable,
  metaphor-driven register)

The home page (`neilwengerd.com`) is a soft, short introduction that
immediately routes to one or the other. Both sub-practices share one
footer, one author bio, and one physical person, but read as genuinely
distinct brands: separate logo/wordmark, separate accent color, separate
voice.

## Patterns worth stealing

1. **Hub + sub-identity nav pattern.** Nav is a 3-cell layout: sub-brand
   logo on the left (or, on the home page, nothing — replaced by a large
   center monogram), and a small "NTW" monogram on the right that always
   links back to the hub (`/`). No text nav links at all on sub-pages — the
   monogram *is* "back to home." Minimal and wordless. Worth considering
   for any place on `sebthecanadian.ca` where a sub-property (the garden,
   a specific project) needs a lightweight "you are here, here's home" cue
   without a full nav bar.

2. **A sustained metaphor as information architecture, not just copy.**
   Campfire doesn't just use fire imagery in prose — its actual section
   titles *are* the metaphor: "Who Campfire is for," "What Campfire
   Offers," "Why Campfire Is Different," "Ways to Sit Around the Fire,"
   "Join the Campfire." The metaphor structures navigation, not just tone.
   This is a stronger, cheaper version of what a mood-board metaphor
   usually becomes (a color palette) — it's copy discipline. Relevant
   since the existing `DESIGN_BRIEF.md` already commits to a metaphor
   ("Data Druid," forest-at-night) but so far mostly expresses it through
   tokens/visuals; the metaphor doesn't yet shape actual section *names*
   on the home page (`/now`, `/writing`, `/projects` are generic, not
   Druid-flavored). Worth a look next time nav copy is touched — doesn't
   require new components, just braver labels.

3. **Reusable "tiers of engagement" card pattern.** Both sub-brands ship
   the same shape — three cards describing depth of engagement — with
   brand-specific copy: Campfire → Groups / Individuals / Sessions;
   Grafica → Creative Guidance / Creative Direction / Creative Partnership.
   One component, two voices. If Seb's site ever needs a "ways to work
   with me" or "ways to collaborate" section (consulting, CivCitDev
   partnerships, etc.), this is a clean, low-chrome shape: header + one
   paragraph + optional bullet list, times three, no icons required.

4. **Numbered process cards.** Grafica's "Process" section: `01 Insights →
   02 Clarity → 03 Transformation`, each a large muted numeral + a two-word
   label + one sentence. No icons, no illustrations — just numeral
   contrast (large sits in a muted/gray tone, label in full-strength ink).
   Cheap, legible way to describe a workflow or methodology page (e.g. a
   "how CivCitDev projects get built" or "how I approach a project"
   section) without new visual assets.

5. **Plain-text client/selected-work list.** "Selected clients" is a plain
   stacked text list (`Antioch College`, `Braided River Brewing Company`,
   …) — no logo wall, no logo image assets to source, license, or keep in
   sync. Reads as understated and confident rather than a grid of
   mismatched logo files. Directly applicable to a Projects or About page
   that wants to list past clients/collaborators/organizations without
   maintaining a logo-asset pipeline.

6. **Testimonial attribution shape.** Name in bold/accent color, then
   affiliation on a lighter secondary line directly below — e.g. "Lindsay
   Selders" / "Megen Construction." Same idea as the Yepsen quote-card
   figcaption already logged, confirms it's a solid, repeatable
   attribution shape worth standardizing wherever a quote or webmention
   needs a name + context line.

7. **Low-key newsletter callout.** The Substack subscribe block sits
   quietly inside the hero/intro area as one soft-spoken line — "Join me
   as I explore the intersections of design, curiosity, and creating with
   intention. Read it first." — not a modal, not a banner, not an
   interruption. If an email/RSS callout is ever added to Seb's home page
   beyond the existing footer link, this is the register to match: one
   sentence, inline, easy to ignore.

8. **A named "emphasis" typeface for pull-lines.** Class name
   `founders-grotesk-semibold` shows up exactly once per section, wrapping
   a single standout sentence mid-paragraph ("No one should have to
   compromise who they are." / "Campfire isn't about becoming someone
   new..."). It's the same rhetorical trick as Yepsen's eyebrow labels —
   a lightweight typographic emphasis device — but applied as a bolded
   pull-line inside body copy instead of a section-level micro-label.
   Combined with item 2 in `design-reference-yepsen.md` (eyebrow labels),
   these are two cheap, non-conflicting ways to add rhythm to a content
   page without new components.

9. **Content and design philosophy stated explicitly, in visitor-facing
   copy.** The "subtraction" idea isn't just an internal design principle
   — it's spoken directly to the reader, repeatedly, in the actual home
   page and Grafica copy: "Most creative processes add. Mine subtracts,"
   "I help people uncover what's essential… so what remains feels true,
   elegant, and alive." Our own `DESIGN_PRINCIPLES.md` documents a strong
   philosophy (IndieWeb + convivial design) but it currently lives in an
   internal doc, not in home-page-facing prose. Worth considering whether
   a line or two of that philosophy could show up directly in the site's
   own voice, the way Wengerd's site does — not as a manifesto page, just
   a sentence or two where it's earned.

## What NOT to copy

- **Two fully separate sub-brand identities (distinct logo, wordmark,
  color scheme) under one person.** Makes sense for someone running two
  distinct paid practices commercially. Seb's site has one coherent
  identity with several facets (garden, projects, resume) — they're
  aspects of one person and one Data Druid voice, not separate branded
  services. Splitting them into visually distinct sub-brands would
  fragment identity the existing brief explicitly avoids.
- **JS-driven auto-playing testimonial/image carousels.** The Grafica
  image galleries reimplement a custom slider on top of Webflow's own
  slider markup with ~150 lines of hand-rolled JS (IntersectionObserver,
  manual transform-based positioning, infinite-loop cloning). Fragile,
  heavy, and directly conflicts with the "progressive enhancement, works
  without JS" commitment in `DESIGN_PRINCIPLES.md`. If the testimonial
  pattern (item 6) is adopted, stack the quotes statically — same
  conclusion already reached for the Yepsen quote-grid.
- **Commercial agency-funnel tone** ("Let's raise the bar," "Get
  Started" as a lead-gen CTA). Fine for a business selling design
  engagements; wrong register for a personal/portfolio site not selling
  services in that mode.
- **Full page built on a page-builder runtime (Webflow + jQuery + GSAP +
  ScrollTrigger just for scroll-reveal fades).** Not a design pattern to
  borrow at all — it's the opposite of the hand-editable, dependency-light
  static site `DESIGN_PRINCIPLES.md` commits to.

## Suggested next steps

See `BACKLOG.md` for the concrete "Idea" items pulled from this review
(braver metaphor-driven nav copy, numbered process cards, plain-text
client/collaborator list, pull-line emphasis style, philosophy-in-copy).
None of this is scheduled — it's inspiration to draw on next time a
relevant page or component is touched.
