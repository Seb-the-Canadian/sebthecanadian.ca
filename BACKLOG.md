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
