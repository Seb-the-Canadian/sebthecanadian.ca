# Improvement Audit

**Date:** 2026-02-08
**Auditor:** Claude Code (ultrathink creative review)
**Scope:** Full-site UX, design, accessibility, performance, and governance review
**Baseline:** Post-Phase 4 (botanical enhancements merged, commit `a3556f7`)

---

## 1. Design Audit

### Information Hierarchy

**Strengths:**
- Heading scale (h1 2.2rem → h2 1.6rem → h3 1.3rem → body 1rem) is clear and rhythmic
- Sections are visually distinct with double-border panel treatment
- Footer is minimal and stays out of the way

**Findings:**

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| D1 | Homepage sections are very short (2-3 items each) — "Start here" and "Profiles" could be combined or given more visual weight | Low | `index.html:56-71` |
| D2 | "Latest post" on homepage duplicates the only post on `posts.html` — with one post, this feels redundant rather than helpful | Info | `index.html:73-87` vs `posts.html:55-66` |
| D3 | No visual distinction between internal and external links in navigation — Garden (external) and Email (mailto) look identical to Home, Posts, etc. | Medium | All pages, `<nav>` block |

### Typography Rhythm

**Strengths:**
- Atkinson Hyperlegible is an excellent accessibility-first choice
- Line-height 1.6 is comfortable for body text
- Letter-spacing is refined (-0.01 to -0.02em on headings)

**Findings:**

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| T1 | CSS loads `wght@400;700` from Google Fonts but uses `font-weight: 600` on `nav a[aria-current]` — 600 will be synthesized (faux bold), causing inconsistent rendering | Low | `site.css:362`, font link in all HTML files |
| T2 | No consistent spacing scale — padding/margin values are ad hoc (0.5rem, 0.75rem, 0.85rem, 1rem, 1.25rem, 1.5rem, 1.75rem) | Info | Throughout `site.css` |

### Color Usage

**Strengths:**
- Thoroughly tested lavender/sage palette with WCAG 2.2 AA+ compliance
- Semantic color variables (--link, --emphasis, --success, --metadata)
- Both modes feel intentional

**Findings:**

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| C1 | Light mode muted (#6b5d54, brown-tinted) and dark mode muted (#a89eb8, purple-tinted) have different tonal families — minor inconsistency | Info | `site.css:40,68` |

---

## 2. UX Audit

### Navigation Clarity

**Strengths:**
- Consistent 6-item nav on all pages
- `aria-current="page"` with clear visual indicator
- Nav wraps gracefully on narrow screens

**Findings:**

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| U1 | External links (Garden, Email) have no visual differentiator — users can't tell they'll leave the site or open an email client | Medium | All pages, nav block |
| U2 | No "back to top" affordance or footer nav — on longer pages (future CV page), users must scroll to reach navigation | Low | All pages |

### Content Discoverability

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| U3 | Site has minimal content (1 post) — the information architecture is well-prepared for growth but currently feels sparse | Info | `posts.html` |

### Mobile Ergonomics

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| U4 | Theme toggle at fixed top-right could overlap with browser chrome or interfere with scroll on some mobile browsers — no issue currently but worth monitoring | Low | `site.css:424-446` |

---

## 3. Accessibility Audit

### Critical

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| A1 | **Broken skip link on colophon.html** — skip link targets `#content` but `<main>` has no `id` attribute. Keyboard users cannot skip to main content. | **Critical** | `colophon.html:27` → `href="#content"`, `colophon.html:48` → `<main class="h-card">` (no id) |
| A2 | **Missing footer on colophon.html** — every other page has a `<footer>` with "Last updated" timestamp. Colophon has no footer element at all. | **High** | `colophon.html:90-99` — main closes, then scripts, no footer |

### High

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| A3 | Inconsistent main element IDs — `index.html` uses `id="main"` while `posts.html`, `now.html` use `id="content"`. Skip links target different IDs. | High | `index.html:28,50` vs `posts.html:29,51` |
| A4 | Author photo (`<img>`) missing `width` and `height` attributes — causes layout shift (CLS) during page load | High | `index.html:51` |

### Medium

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| A5 | Color transitions on `body` (0.3s ease on background-color and color) are always active — should be wrapped in `prefers-reduced-motion: no-preference` for users with vestibular disorders | Medium | `site.css:135` |
| A6 | Misuse of `h-card` microformat on `now.html` and `colophon.html` — these pages use `class="h-card"` on `<main>` but contain no identity-card markup (no `u-photo`, no `p-name` identity). The h-card class implies structured identity data. | Medium | `now.html:49`, `colophon.html:48` |
| A7 | No `<meta name="theme-color">` — mobile browsers show default chrome color instead of matching the site's palette | Medium | All HTML files, `<head>` section |

---

## 4. Performance Audit

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| P1 | **Lucide script is render-blocking** — loaded in `<head>` without `defer` or `async`. Blocks HTML parsing until the full library (~40KB) downloads. | **High** | All HTML files: `<script src="https://unpkg.com/lucide@latest"></script>` in `<head>` |
| P2 | Author photo (seb-stamp.jpeg, 208KB) has no `width`/`height` attributes — browser cannot reserve space, causing Cumulative Layout Shift | High | `index.html:51` |
| P3 | Lucide loaded via `@latest` tag — no version pinning. CDN could serve a breaking update at any time. | Medium | All HTML files, Lucide script tag |
| P4 | No Open Graph meta tags — shared links on social platforms will have no preview image, title, or description | Medium | All HTML files |
| P5 | Google Fonts loads full character set (Latin, Latin Extended) for both weights — could be subset to Latin only for smaller payload | Low | All HTML files, Google Fonts URL |
| P6 | No 404.html — GitHub Pages shows its default 404, breaking the site's visual identity for broken links | Low | Missing file |

---

## 5. Governance Audit

| ID | Finding | Severity | Evidence |
|----|---------|----------|----------|
| G1 | README.md "Repository Structure" section is empty — visitors and contributors can't quickly understand the project layout | Medium | `README.md:43-44` |
| G2 | No `docs/` directory — all documentation lives in root, making the project root cluttered with 7 markdown files alongside source files | Low | Root directory listing |
| G3 | TESTING_PLAN.md checkboxes are all unchecked — formal testing has not been signed off despite Phases 1-4 being "complete" | Medium | `TESTING_PLAN.md` — all `[ ]` |
| G4 | No ADR (Architecture Decision Record) directory — design decisions are scattered across CHANGELOG and IMPLEMENTATION_PLAN rather than having a dedicated, discoverable location | Info | No `docs/decisions/` directory |
| G5 | BACKLOG.md Ideas section still contains items that were completed in Phases 1-4 (color palette, typography, layout items) — stale entries | Low | `BACKLOG.md:43-115` |

---

## Priority Matrix

### Impact vs Effort

```
HIGH IMPACT
  │
  │  A1 (skip link)     P1 (defer scripts)
  │  A2 (footer)        A4/P2 (img dimensions)
  │  A3 (consistent IDs)
  │
  │  U1 (external links)    P6 (404 page)
  │  A7 (theme-color)       P4 (Open Graph)
  │  G1 (README structure)
  │
  │  A5 (motion prefs)      G5 (stale backlog)
  │  A6 (h-card misuse)     P3 (pin Lucide)
  │  T1 (font-weight)       P5 (font subset)
  │
LOW IMPACT
  └──────────────────────────────────────────
     LOW EFFORT                HIGH EFFORT
```

### Recommended Priority Order

**Batch 1 — Accessibility fixes (critical, low effort):**
A1, A2, A3, A4, A5

**Batch 2 — Performance wins (high impact, low effort):**
P1, P2, P3, A7

**Batch 3 — UX refinements (medium impact, medium effort):**
U1, P4, P6, G1

**Batch 4 — Governance cleanup:**
A6, G5, T1

---

*This audit respects the site's established design language (Data Druid aesthetic), philosophical foundations (IndieWeb + convivial design), and governance conventions. All findings are grounded in observable evidence from the codebase.*
