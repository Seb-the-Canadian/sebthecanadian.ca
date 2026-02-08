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

### CV/Resume Page

**Priority:** User has requested this be added to the site with a dedicated "CV" tab in navigation.

- [ ] Create `/cv.html` page using semantic HTML (`<article>`, `<section>`, `<dl>`, `<time>`)
- [ ] Structure: experience, education, skills, projects with clear section breaks
- [ ] Apply Data Druid visual identity (double borders, lavender/sage palette, Atkinson Hyperlegible)
- [ ] Implement h-resume microformat for machine-parseable data
- [ ] Design print stylesheet for clean PDF export via `Ctrl+P`
- [ ] Add "Download PDF" button (triggers `window.print()`)
- [ ] Add "CV" to primary navigation
- [ ] Link from homepage h-card
- [ ] Keep as living document - single source of truth, easy to maintain

**References:** See IMPLEMENTATION_PLAN.md Phase 5.2 for full task breakdown.

---

## Ideas

Candidates for future work. No commitment implied — just things worth considering.

### Navigation & Wayfinding

- [ ] Add breadcrumb or "you are here" cue beyond `aria-current`
- [ ] Consider a footer nav or "back to top" link on longer pages

### Content & Pages

- [ ] Add a `/uses` page (tools, hardware, software)
- [ ] Add a `/links` or blogroll page
- [ ] Consider an RSS/Atom feed for the posts page
- [ ] Expand the posts page beyond a single entry — decide on pagination or a simple list

#### CivCitDev program showcase

sebthecanadian.ca should surface the CivCitDev program ([civcitdev.ca](https://civcitdev.ca))
and its live tools — starting with the Ontario Tenant Tools app
([ont-tenant-tools.civcitdev.ca](https://ont-tenant-tools.civcitdev.ca)). The treatment
should be lightweight: enough context for a visitor to understand the program and click
through, without turning this site into a project hub.

- [ ] Add a "Projects" or "Work" section to the homepage (or a dedicated `/projects` page) that introduces CivCitDev with a brief description — civic-focused, open-source tooling
- [ ] Include a card or entry for Ontario Tenant Tools as the first live project under CivCitDev — link, one-line description, and current status
- [ ] Decide on placement: inline on the homepage below "Latest post", a new top-level page in the nav, or both (homepage teaser + full page)
- [ ] Design the project card/entry to be reusable — future CivCitDev tools should slot in without restructuring
- [ ] Use `rel="me"` or an equivalent link-rel on CivCitDev URLs where appropriate so the ownership relationship is machine-readable
- [ ] Keep descriptions on this site brief and canonical — deeper project docs live on civcitdev.ca itself; avoid duplication
- [ ] Consider adding a small status indicator (active / beta / archived) to each project entry so visitors know what's live

### IndieWeb & Microformats

- [ ] Add `h-feed` wrapper on the posts page
- [ ] Add `dt-published` and `dt-updated` to post entries
- [ ] Evaluate IndieAuth sign-in on the homepage
- [ ] Consider adding a Micropub endpoint for posting from external clients

### Accessibility

- [ ] Test with a screen reader and fix any navigation gaps
- [ ] Run automated accessibility audit (axe DevTools, WAVE)

### Performance & Infrastructure

- [ ] Add `<meta>` cache-control hints or a `_headers` file for Cloudflare
- [ ] Consider inlining critical CSS to eliminate the stylesheet request
- [ ] Review favicon across browsers (currently SVG only — add PNG fallback?)
- [ ] Consider self-hosting Atkinson Hyperlegible font (remove Google Fonts dependency)

---

## Process Notes

- Keep the site static, dependency-free, and hand-editable.
- Design changes should honour the principles documented in [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md): minimal, durable, portable, accessible, autonomous, transparent, human-scale, and sustainable.
- All decisions should pass the Convivial Test, IndieWeb Test, Sustainability Test, and Accessibility Test outlined in DESIGN_PRINCIPLES.md.
- When an item is finished, log it in CHANGELOG.md under the appropriate date and remove it from this file.
- Bugs and regressions go in the **Bugs / Issues** section with a short description and reproduction steps if applicable.
