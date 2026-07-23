# Design Reference — yepsen.net (Ryan Yepsen)

Notes from reviewing `yepsen.net` as outside design inspiration. Captured
2026-07-22 from three saved pages (home, a Field Notes article, the Field
Notes index) since the domain isn't reachable from this environment.

This is **inspiration to filter through the Data Druid system**
(`DESIGN_PRINCIPLES.md`, `DESIGN_BRIEF.md`), not a redesign brief. Yepsen's
site is a dark glassmorphic SaaS-consultant aesthetic (Inter, gradient blobs,
frosted-glass cards, cyan accent) — the opposite skin from our
parchment/forest-at-night, IBM Plex Mono, pixel-art identity. The patterns
below are the *structural* ideas worth stealing, translated into our own
tokens (`--moss`, `--amber`, `--mono`, `--rule`, `--ink`, `--wash`) — not the
visual skin itself.

## What the site is

Personal site for a Forward Deployed Product Manager: hero + "what I do" +
case-study cards + testimonial quotes + "Field Notes" (essay) teasers +
about + contact. Single dark theme, no light mode, no IndieWeb/microformats,
but does ship `schema.org` JSON-LD (`Person`, `Article`, `CollectionPage`)
for SEO.

## Patterns worth stealing (translated to our tokens)

1. **Eyebrow labels.** A small uppercase, letter-spaced micro-label
   (`.eyebrow` — `font-size: .75rem; letter-spacing: .24em; text-transform:
   uppercase; color: var(--accent)`) sits above every section heading
   ("What I do", "Selected work", "Signals", "Field Notes", "About",
   "Contact"). Cheap, consistent wayfinding device. Would read well in
   `--amber` + `--mono` on our pages — reinforces the "research station"
   heading language without new components.

2. **Featured pull-quote treatment.** The testimonial section uses a grid of
   quote cards where one card spans the full row and gets a much larger
   font size (`clamp(1.65rem, 3vw, 2.55rem)` vs. `clamp(1.12rem, 1.7vw,
   1.45rem)` for the others) plus a figcaption attributing the quote. Good
   pattern for surfacing a single standout line (a webmention, a project
   testimonial, a garden excerpt) among smaller supporting ones instead of
   flattening everything to the same weight.

3. **Post/article template has more scaffolding than ours.** Their article
   page (`found-in-translation.html`) has, in order: eyebrow + date, a large
   display `h1`, a **lede paragraph** (larger, lighter color, sits between
   title and body — distinct from regular `p`), body copy at generous
   `line-height: 1.9`, a distinctly-styled `blockquote` (left accent border
   + tinted background), a share-link row (LinkedIn/X/Facebook), and an
   author card (photo + role + bio) before the back-link.
   Our `src/_includes/post.njk` currently has none of: a lede style, a
   styled blockquote, a share row, or an author card. Worth comparing since
   our posts are h-entry/webmention-native — an author card is redundant
   for a single-author site, but a **lede paragraph style** and a
   **blockquote treatment** are low-cost, high-payoff additions.

4. **Card consistency.** Every card-like surface (project card, quote card,
   contact box, article-index card) shares one visual contract: same
   border, background tint, border-radius, and shadow, plus a uniform hover
   lift (`translateY(-2px)` + border color shifts toward the accent). We
   already do this loosely with `--rule`/`--wash`; worth auditing that
   `.project-card`-equivalents and index-row/pill components all hit the
   same radius/border rhythm rather than drifting per-component.

5. **Structured data.** `Person`, `Article`, and `CollectionPage` JSON-LD on
   the home, post, and index pages respectively. This is pure SEO/machine
   legibility and doesn't conflict with IndieWeb microformats (h-card,
   h-entry are for humans-first parsing; JSON-LD is the "machine second"
   layer already sanctioned by our own principles doc). Cheap to add
   alongside existing `h-card`/`h-entry` markup.

6. **Self-aware footer copy.** `© 2026 Ryan Yepsen. Built to be more useful
   than a placeholder page. Low bar, but still.` — a small moment of voice
   in otherwise-utilitarian chrome. Not a component, just a tone note: our
   footer/colophon copy has room for one dry, human line like this.

## What NOT to copy

- **Dark-only glassmorphism.** Gradient-blob backgrounds, frosted blur
  panels (`backdrop-filter: blur(16px)`), and a single cyan accent color are
  a generic modern-SaaS skin. It's polished but has no personality of its
  own — it would erase the "Caves of Qud meets iOS" identity the brief
  commits to. Our light/dark pair should stay two distinct moods (warm
  parchment / forest at night), not one dark theme with a light inversion.
- **Inter/system-sans everywhere.** Their body and headings share one
  sans-serif with no typographic hierarchy of *character* — everything
  gets weight from size alone. We deliberately split IBM Plex Mono
  (personality, headings) from a quiet body face; don't flatten that split.
- **Sticky blurred header.** Nice touch for a marketing site, adds a
  render cost (`backdrop-filter`) for a purely decorative effect. Skip
  unless it earns its place against the "sustainable, low-bandwidth"
  constraint in `DESIGN_PRINCIPLES.md`.
- **Analytics boilerplate** (`gtag.js`). Not a design pattern, just noting
  it's absent from our stack by design and should stay that way.

## Suggested next steps

See `BACKLOG.md` for the concrete "Idea" items pulled from this review
(eyebrow labels, post lede/blockquote styling, featured-quote pattern,
JSON-LD). None of this is scheduled — it's inspiration to draw on next time
a relevant page or component is touched.