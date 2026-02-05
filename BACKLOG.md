# Backlog

Tracking design direction, improvements, and known issues for sebthecanadian.ca.

Items move through: **Idea → Planned → In Progress → Done**
(Done items get moved to CHANGELOG.md and removed from here.)

---

## Bugs / Issues

_None currently tracked._

---

## Planned

_Items committed to, roughly in priority order._

---

## Ideas

Candidates for future work. No commitment implied — just things worth considering.

### Layout & Visual Design

- [ ] Add a print stylesheet for clean paper output
- [ ] Improve spacing and rhythm between sections on the homepage
- [ ] Consider a subtle accent colour beyond the current link blue
- [ ] Explore a minimal responsive breakpoint for narrow screens (< 400px)

#### Theme: legible but unique site-wide identity

The current design is clean and functional but reads as generic. The goal is to develop a
cohesive visual identity that feels distinctly *this site* while never sacrificing readability.

- [ ] Define a purposeful colour palette — pick 1–2 signature colours (beyond default link blue) that carry across backgrounds, borders, and accents in both light and dark modes
- [ ] Replace the bordered-box-per-section pattern with a layout that has more visual flow — consider dropping the border on `header`/`main`/`footer` in favour of whitespace, subtle dividers, or a single page-level container
- [ ] Introduce a distinctive typographic pairing — a character-rich heading face alongside a highly legible body face (or a single variable font used at contrasting weights)
- [ ] Rework the heading hierarchy so each level is visually distinct (h2 currently blends with body text at 1.1rem; h1 → h2 → h3 should have clear, rhythmic steps)
- [ ] Add texture or personality to the page without heavy assets — consider CSS-only details like a coloured top-bar, a subtle gradient on the header, or a monogram/wordmark in place of plain text
- [ ] Give links a site-specific treatment — e.g., a custom underline style, colour shift on hover, or a subtle highlight rather than the browser-default visited purple
- [ ] Design the dark theme as a first-class variant, not just an inversion — choose dark-mode colours that feel intentional (warm darks, tinted greys) rather than mechanical swaps
- [ ] Audit the card/section `color-mix` backgrounds — the current 92/8 mix is barely perceptible; decide whether to make the layering more visible or remove it for simplicity
- [ ] Consider a signature micro-interaction (e.g., a smooth nav highlight transition, a gentle fade-in on page load) that adds character without requiring JS
- [ ] Create a simple visual style guide (even a comment block in `site.css`) documenting the chosen palette, type scale, and spacing tokens so future changes stay cohesive

### Typography

- [ ] Evaluate a single hosted typeface (e.g., Inter or a variable font) vs. the current system stack
- [ ] Tune heading scale — h2 at 1.1rem feels close to body text

### Navigation & Wayfinding

- [ ] Add breadcrumb or "you are here" cue beyond `aria-current`
- [ ] Consider a footer nav or "back to top" link on longer pages
- [ ] Evaluate whether the external Garden link needs a visual differentiator (icon, external-link indicator)

### Content & Pages

- [ ] Add a `/uses` page (tools, hardware, software)
- [ ] Add a `/links` or blogroll page
- [ ] Consider an RSS/Atom feed for the posts page
- [ ] Expand the posts page beyond a single entry — decide on pagination or a simple list

### IndieWeb & Microformats

- [ ] Add `h-feed` wrapper on the posts page
- [ ] Add `dt-published` and `dt-updated` to post entries
- [ ] Evaluate IndieAuth sign-in on the homepage
- [ ] Consider adding a Micropub endpoint for posting from external clients

### Accessibility

- [ ] Audit colour contrast ratios in both light and dark themes
- [ ] Add skip link on all pages (currently only on some)
- [ ] Test with a screen reader and fix any navigation gaps
- [ ] Ensure all images have meaningful `alt` text

### Performance & Infrastructure

- [ ] Add `<meta>` cache-control hints or a `_headers` file for Cloudflare
- [ ] Consider inlining critical CSS to eliminate the stylesheet request
- [ ] Add a simple `404.html` page for GitHub Pages
- [ ] Review favicon across browsers (currently SVG only — add PNG fallback?)

---

## Process Notes

- Keep the site static, dependency-free, and hand-editable.
- Design changes should honour the existing principles in the colophon: minimal, durable, portable.
- When an item is finished, log it in CHANGELOG.md under the appropriate date and remove it from this file.
- Bugs and regressions go in the **Bugs / Issues** section with a short description and reproduction steps if applicable.
