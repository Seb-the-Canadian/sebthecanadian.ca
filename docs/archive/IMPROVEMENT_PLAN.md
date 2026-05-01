# Improvement Plan

**Date:** 2026-02-08
**Source:** [IMPROVEMENT_AUDIT.md](IMPROVEMENT_AUDIT.md)
**Scope:** High-leverage improvements that make the site more inevitable — clearer, faster, more coherent
**Constraint:** All changes must pass the site's four design tests (Convivial, IndieWeb, Sustainability, Accessibility)

---

## Quick Wins (1-2 hours)

### QW-1: Fix broken skip link on colophon.html

**Audit refs:** A1 (Critical), A2 (High)

**What changes:**
- Add `id="content"` to `<main>` on colophon.html
- Add missing `<footer>` with "Last updated" timestamp to colophon.html

**Why it fits the design language:**
- Every other page already has both. This is a consistency fix, not a new pattern.

**Risk:** None. Pure bugfix.
**Rollback:** Revert single commit.

**Acceptance criteria:**
- [ ] Skip link on colophon.html navigates to main content when activated
- [ ] Footer appears on colophon.html matching other pages

---

### QW-2: Standardize main element IDs across all pages

**Audit refs:** A3 (High)

**What changes:**
- Change `index.html` from `id="main"` to `id="content"` on the `<main>` element
- Update skip link on `index.html` from `href="#main"` to `href="#content"`
- All 4 pages will use `id="content"` consistently

**Why it fits the design language:**
- Transparent, consistent conventions are a convivial design principle.

**Risk:** Minimal. Only affects skip link target. No external references to `#main`.
**Rollback:** Revert single commit.

**Acceptance criteria:**
- [ ] All 4 pages use `id="content"` on `<main>`
- [ ] All 4 skip links target `#content`

---

### QW-3: Add image dimensions to author photo

**Audit refs:** A4 (High), P2 (High)

**What changes:**
- Add `width="160"` and `height` attributes to the `<img>` tag in `index.html`
- This matches the CSS rule `.h-card .u-photo { width: 160px; }`

**Why it fits the design language:**
- Eliminates layout shift during load — faster perceived performance.
- The image already renders at 160px; this just tells the browser in advance.

**Risk:** None.
**Rollback:** Remove attributes.

**Acceptance criteria:**
- [ ] No Cumulative Layout Shift from the author photo on page load

---

### QW-4: Make Lucide script non-render-blocking

**Audit refs:** P1 (High), P3 (Medium)

**What changes:**
- Move Lucide `<script>` from `<head>` to before `</body>` (alongside other scripts), OR add `defer` attribute
- Pin Lucide to a specific version instead of `@latest`

**Why it fits the design language:**
- Performance is a sustainability principle. Faster loading respects the user's time.
- Version pinning is durability — the site shouldn't break because a CDN serves a new version.
- Progressive enhancement: icons are decorative; the site works without them.

**Risk:** Low. Icons may flash-load slightly later. Acceptable since they're decorative.
**Rollback:** Revert script tag changes.

**Acceptance criteria:**
- [ ] Lucide script no longer blocks HTML parsing
- [ ] Lucide version is pinned to a specific release
- [ ] Icons still render correctly after page load

---

### QW-5: Respect motion preferences for color transitions

**Audit refs:** A5 (Medium)

**What changes:**
- Wrap the `body` transition (line 135 of site.css) in `@media (prefers-reduced-motion: no-preference)`

**Why it fits the design language:**
- Accessibility-first is a core principle. The scanlines and botanicals already respect this; body transitions should too.

**Risk:** None. Users who prefer reduced motion will see instant theme changes instead of 0.3s fade.
**Rollback:** Remove the media query wrapper.

**Acceptance criteria:**
- [ ] Theme toggle still transitions smoothly for users without motion preference
- [ ] Theme change is instant for users with `prefers-reduced-motion: reduce`

---

### QW-6: Add theme-color meta tag

**Audit refs:** A7 (Medium)

**What changes:**
- Add `<meta name="theme-color" content="#f5f1e8" media="(prefers-color-scheme: light)">` and `<meta name="theme-color" content="#0d0d0d" media="(prefers-color-scheme: dark)">` to all 4 pages

**Why it fits the design language:**
- Mobile browser chrome will match the site's parchment/charcoal palette instead of showing default white/black.

**Risk:** None. Progressive enhancement — browsers that don't support it ignore it.
**Rollback:** Remove meta tags.

**Acceptance criteria:**
- [ ] Mobile browser address bar matches the site's background color in both modes

---

## High-Leverage Refinements (half-day)

### R-1: Visual differentiator for external navigation links

**Audit refs:** U1 (Medium), D3 (Medium)

**What changes:**
- Add a small external-link indicator (Lucide `external-link` icon or CSS `::after` content) to the Garden and Email nav links
- Subtle styling — doesn't break the nav rhythm but signals "this leaves the site"

**Why it fits the design language:**
- Transparent design: users should know where a link goes before clicking (convivial principle)
- Terminal interfaces are explicit about destinations

**Risk:** Low. Visual-only change. Must test that icon doesn't break nav wrapping on narrow screens.
**Rollback:** Remove the CSS rule.

**Acceptance criteria:**
- [ ] External links (Garden, Email) have a visible but subtle indicator
- [ ] Indicator does not disrupt nav layout at any viewport width
- [ ] Screen readers announce the link destination (already handled by link text)

---

### R-2: Open Graph meta tags for social sharing

**Audit refs:** P4 (Medium)

**What changes:**
- Add `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (author photo) to all pages
- Add `twitter:card` meta tag

**Why it fits the design language:**
- IndieWeb principle: publish visible data for humans first, machines second. OG tags help shared links look intentional.
- Uses existing assets (author photo, page descriptions) — no new content needed.

**Risk:** None. Additive meta tags in `<head>`.
**Rollback:** Remove meta tags.

**Acceptance criteria:**
- [ ] Shared links on social platforms show title, description, and image
- [ ] Each page has its own OG title/description matching its `<title>` and `<meta description>`

---

### R-3: Create 404.html with site styling

**Audit refs:** P6 (Low)

**What changes:**
- Create `404.html` with the site's Data Druid aesthetic (double borders, lavender/sage, Atkinson Hyperlegible)
- Include nav for wayfinding back to the site
- Brief, helpful message ("Page not found. Here are some places to start.")
- Link to Home, Posts, Garden

**Why it fits the design language:**
- A 404 page is a moment of friction — handling it gracefully is convivial design.
- GitHub Pages serves custom 404.html automatically if it exists in root.

**Risk:** None. New file, doesn't affect existing pages.
**Rollback:** Delete file.

**Acceptance criteria:**
- [ ] 404.html exists and matches site styling
- [ ] Navigation links work from the 404 page
- [ ] GitHub Pages serves it for unknown URLs

---

### R-4: Fill in README repository structure

**Audit refs:** G1 (Medium)

**What changes:**
- Complete the empty "Repository Structure" section in README.md with an accurate file tree

**Why it fits the design language:**
- Transparent, forkable documentation is a core convivial principle.

**Risk:** None.
**Rollback:** Revert edit.

**Acceptance criteria:**
- [ ] README shows the current file/directory structure
- [ ] Structure description is accurate

---

## Strategic Upgrades (1-3 days)

### S-1: CV/Resume page

**Status:** Already planned in BACKLOG.md. See IMPLEMENTATION_PLAN.md Phase 5.2.
**Not in scope for this improvement cycle** — listed here for completeness.

---

### S-2: Clean stale backlog items

**Audit refs:** G5 (Low)

**What changes:**
- Remove or mark as done the Ideas in BACKLOG.md that were completed during Phases 1-4
- Cross-reference with CHANGELOG.md to ensure nothing is double-tracked

**Why it fits the design language:**
- Governance hygiene. A backlog with stale items erodes trust in the document.

**Risk:** None. Editorial only.
**Rollback:** Git revert.

**Acceptance criteria:**
- [ ] Every item in BACKLOG.md Ideas is either genuinely open or moved to Done/removed
- [ ] No duplication between BACKLOG and CHANGELOG

---

### S-3: Fix h-card microformat misuse

**Audit refs:** A6 (Medium)

**What changes:**
- Remove `class="h-card"` from `<main>` on `now.html` and `colophon.html`
- These pages don't contain identity-card markup (no photo, no p-name identity)
- Keep h-card only on `index.html` where it's semantically correct

**Why it fits the design language:**
- IndieWeb principle: use markup correctly. Microformats should be meaningful, not decorative.

**Risk:** Low. No visual change. Only affects microformat parsers.
**Rollback:** Re-add class.

**Acceptance criteria:**
- [ ] `h-card` class only appears on pages with actual identity markup (index.html)
- [ ] Microformat parsers see correct h-card data

---

## Implementation Order

| Batch | Items | Theme | Est. Time |
|-------|-------|-------|-----------|
| 1 | QW-1, QW-2, QW-3, QW-5, QW-6, S-3 | Accessibility & semantics | 30 min |
| 2 | QW-4 | Performance | 15 min |
| 3 | R-1, R-2, R-3, R-4 | UX & governance | 1 hour |
| 4 | S-2 | Governance cleanup | 30 min |

Each batch produces a single, readable commit. Governance artifacts (CHANGELOG, BACKLOG) updated at the end.

---

*This plan prioritizes correctness over novelty. The site's design language is strong — the goal is to remove friction, fix gaps, and make the existing system more coherent.*
