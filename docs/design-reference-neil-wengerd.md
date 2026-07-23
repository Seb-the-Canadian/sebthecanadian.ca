# Design Reference — neilwengerd.com (Neil Wengerd)

Notes from reviewing `neilwengerd.com` as outside design inspiration.
Captured 2026-07-22 from three saved pages (home, Grafica, Campfire) since
the domain and its CDN-hosted stylesheet aren't reachable from this
environment (see caveat below).

Like `docs/design-reference-yepsen.md`, this is **inspiration to filter
through the Data Druid system**, not a redesign brief.

## Caveat: no exact hex/font names, but visually confirmed

The external Webflow stylesheet is still unreachable from this environment,
so exact hex values and typeface names are not confirmed. But screenshots
of all three pages (home, Grafica, Campfire) were reviewed directly,
which confirms the *appearance* of most of what was previously inferred
from class names alone, and surfaced several things markup couldn't show
(see "Confirmed from screenshots" below). Treat colors described here as
close visual approximations, not literal hex values.

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

8. **An emphasis treatment for pull-lines, now confirmed.** A single
   standout sentence per section gets set apart from the surrounding
   paragraph — either boxed on a light card (Campfire's "No one should
   have to compromise who they are.") or styled distinctly inline
   (Campfire's "But what I've discovered is that the ember never goes
   out…" reads in a different weight/style than the paragraph around it).
   Same rhetorical trick as Yepsen's eyebrow labels — a lightweight
   emphasis device — but applied as a pull-line inside body copy instead
   of a section-level micro-label. Combined with item 2 in
   `design-reference-yepsen.md` (eyebrow labels), these are two cheap,
   non-conflicting ways to add rhythm to a content page without new
   components.

9. **Serif for reading, sans/grotesk for chrome — confirmed by
   screenshot.** Big emotional headlines (h1/h2, e.g. "Each of us carries
   an ember—the spark of who we are.") and long-form body/bio copy are set
   in a serif face. Nav links, eyebrow labels, buttons, and footer text use
   a separate rounded sans/grotesk. This is a real editorial pairing, not
   the single-typeface system the class names alone suggested. Worth
   noting purely as a contrast: Seb's site deliberately unified on one
   monospace face for both heading and body in the pitch-v1 sprint
   (`--font-body`/`--font-heading` → `--mono`), a considered and recent
   decision — this isn't a case for reversing it, just a data point that
   the "one voice, one face" approach isn't the only credible option, in
   case a future long-form writing page ever wants a second reading face.

10. **Full-bleed dark "punctuation block" sections.** Both sub-brand pages
    are cream/light overall but drop into one or two full-bleed, heavily
    saturated dark sections for testimonials and the final CTA — Campfire's
    is a warm chocolate-brown, Grafica's is a cool dark forest-green. Same
    structural device (light page, occasional dark block for emphasis),
    different temperature per brand, and each dark block re-tints its
    buttons/links to stay legible against its own background (see item 11).
    This reads stronger than a bordered card would in the same spot — the
    whole viewport shifts mood for one section, then returns. Genuinely
    new information from the screenshots (invisible in the markup alone);
    worth considering for a single high-impact section on Seb's site (e.g.
    a testimonial/webmention highlight, or the CivCitDev features section)
    rather than mixing it in everywhere.

11. **Contextual button/text contrast.** The same button component
    re-skins per background: a solid moss-green fill on the cream home
    page, a white/ghost button on Campfire's dark brown CTA block, a dark
    button on Grafica's lime-green CTA band. One component, background-
    aware fill/text color — not a new button style per brand, just a
    contrast rule the component follows.

12. **Underlined, same-color inline links.** Text links ("Grafica",
    "Campfire" in the hero paragraph) are the same color as the
    surrounding copy — distinguished only by an underline, no color shift.
    Worth flagging as a legitimately accessible choice: underline is a
    contrast-independent signal, which actually serves colorblind readers
    better than a color-only link treatment would. Seb's site already
    gives links a distinct `--link` color *and* presumably underlines them;
    no change implied, just confirms underline-as-primary-signal is a
    credible, tested pattern if the link color token ever needs to flex.

13. **One constant identity thread across three visually distinct pages.**
    The dark-ink "NTW" signature monogram never changes color or style on
    any of the three pages, while each sub-brand's own logotype (the
    circular-dot "CAMPFIRE" mark in red, the "Grafica" wordmark) is fully
    re-skinned per page. That single unchanging mark is what keeps three
    otherwise very different-feeling pages legible as one person's site.
    Useful confirmation that a hub identity doesn't need much to hold
    together — one fixed, quiet visual anchor is enough.

14. **Content and design philosophy stated explicitly, in visitor-facing
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
client/collaborator list, pull-line emphasis style, a full-bleed dark
punctuation-block section, contextual button contrast, and
philosophy-in-copy). None of this is scheduled — it's inspiration to draw
on next time a relevant page or component is touched.