# UX/UI Evolution Implementation Plan

**Project:** Transform sebthecanadian.ca into a low-fi, Data Druid-inspired site with lavender/sage palette
**Foundation:** [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) (IndieWeb + Convivial Design)
**Aesthetic:** Terminal-inspired, mystical garden, intentional and philosophical
**Status:** Planning → Implementation

---

## Executive Summary

Transform the site from "clean but generic" to "distinctly Data Druid" while maintaining accessibility, portability, and sustainability. Work organized into 6 phases with clear dependencies and success criteria.

**Timeline Estimate:** Iterative implementation over 4-6 work sessions
**Risk Areas:** Color contrast compliance, typography rendering across browsers, maintaining simplicity
**Success Metrics:** WCAG 2.2 AA compliance, sub-2s load time, works without JavaScript, fork-ready code

---

## Phase 1: Foundation Audit & Color Testing

**Goal:** Validate assumptions, test palette accessibility, establish baseline

**Priority:** 🔴 Critical (blocks all other work)

### Tasks

1. **Audit current CSS against design principles**
   - Document what aligns with Data Druid aesthetic
   - Identify what must change (h2 scale, color-mix backgrounds)
   - Map current CSS custom properties to new palette

2. **Test lavender/sage palette for WCAG 2.2 compliance**
   - Test all color combinations (text on backgrounds)
   - Document which combinations pass AA (4.5:1) and AAA (7:1)
   - Identify any palette adjustments needed for accessibility
   - Test in both light and dark modes

3. **Browser/device compatibility check**
   - Test current site on: Firefox, Chrome, Safari, text browser (lynx/w3m)
   - Verify CSS custom properties work everywhere
   - Check monospace font rendering

4. **Document findings**
   - Create audit report with specific issues
   - Provide color contrast matrix
   - List browser quirks or blockers

### Delegation Strategy

- **Subagent (Explore):** Research terminal aesthetic examples, find accessible lavender/sage combinations used elsewhere
- **Direct work:** CSS audit, contrast testing with online tools, browser testing

### Success Criteria

- ✅ Full contrast ratio matrix for lavender/sage palette
- ✅ List of CSS properties that need updating
- ✅ Any palette adjustments identified
- ✅ No browser blockers identified

### Estimated Effort

1 work session (2-3 hours)

---

## Phase 2: Core Visual Identity Implementation

**Goal:** Implement color palette, fix typography, establish visual foundation

**Priority:** 🔴 Critical (defines the aesthetic)

**Dependencies:** Phase 1 complete (color testing done)

### Tasks

#### 2.1 Color Palette Integration

- [ ] Update CSS custom properties in `assets/site.css`
  - Define lavender spectrum variables: `--lavender-pale`, `--lavender-soft`, `--lavender-medium`, `--lavender-vibrant`
  - Define sage spectrum variables: `--sage-pale`, `--sage`, `--sage-muted`, `--sage-vibrant`
  - Define semantic color variables: `--color-link`, `--color-emphasis`, `--color-success`, `--color-metadata`
  - Update dark mode palette: `--bg-dark`, `--fg-dark` with tested values
  - Update light mode palette: `--bg-light`, `--fg-light` (cream/parchment)

- [ ] Apply palette to existing elements
  - Links: lavender (`--lavender-medium` default, `--lavender-vibrant` on hover)
  - Borders: muted sage or soft lavender depending on context
  - `aria-current` styling: vibrant lavender or sage
  - Section backgrounds: pale lavender/sage with color-mix

- [ ] Document color semantics in CSS comments
  - Explain why each color is used where
  - Note contrast ratios in comments
  - Create inline style guide

#### 2.2 Typography Hierarchy Fix

- [ ] **URGENT:** Fix h2 scale (currently 1.1rem, too close to 1rem body)
  - Establish clear hierarchy: h1 (2.2rem) → h2 (1.6rem) → h3 (1.3rem) → body (1rem)
  - Test scale on actual content pages
  - Ensure rhythm feels natural

- [ ] Evaluate monospace integration
  - Test headings in monospace (`ui-monospace` or IBM Plex Mono via CDN)
  - Compare full monospace vs. mixed (mono headings, sans body)
  - Decision: commit to one approach

- [ ] Optimize for crisp rendering
  - Set `-webkit-font-smoothing: antialiased` for dark mode
  - Ensure text remains readable at all scales

#### 2.3 Link Treatment Design

- [ ] Create distinctive link styling
  - Custom underline: `text-decoration-color: var(--lavender-soft)`
  - Hover state: glow effect with `text-shadow` in lavender
  - Visited links: darker lavender, not browser purple
  - Focus state: bold lavender border or background

- [ ] Test keyboard navigation
  - Ensure focus states are obvious
  - Verify tab order makes sense
  - Test with keyboard only (no mouse)

#### 2.4 Dark Mode as First-Class

- [ ] Design intentional dark mode (not just inversion)
  - Background: `#1a1a1a` or `#0d0d0d` (test which feels better)
  - Tint grays with subtle purple hue
  - Ensure lavender/sage feel bioluminescent (glow without harshness)
  - Test all text/background combinations for comfort

- [ ] Add mode toggle (optional)
  - If user wants manual control, add toggle
  - Otherwise rely on `prefers-color-scheme`

### Delegation Strategy

- **Direct work:** All CSS implementation, testing, iteration
- **Subagent (Explore):** Find examples of effective monospace heading treatments, terminal-inspired link styles

### Success Criteria

- ✅ All colors defined as CSS custom properties with semantic names
- ✅ Typography hierarchy is visually distinct (h1 → h2 → h3 clear steps)
- ✅ Links are distinctive and pass all accessibility tests
- ✅ Dark mode feels intentional, not mechanical
- ✅ All changes documented in CSS comments

### Estimated Effort

2 work sessions (4-6 hours)

---

## Phase 3: Layout & Structure Refinement

**Goal:** Implement terminal window aesthetic, improve spacing, add borders

**Priority:** 🟡 High (defines structural identity)

**Dependencies:** Phase 2 complete (colors and typography established)

### Tasks

#### 3.1 Terminal Window Treatment

- [ ] Decide on border strategy
  - Keep bordered sections but make them intentional (terminal panels)
  - Test single border vs. double border (outline + border)
  - Use lavender or sage for border colors

- [ ] Implement panel/frame aesthetic
  - Consider adding "title bars" to sections using `::before`
  - Experiment with box-drawing characters for corners
  - Test "console window" look for main content area

#### 3.2 Spacing & Rhythm

- [ ] Audit spacing between sections
  - Current padding/margins documented
  - Implement consistent vertical rhythm (1.5rem or 2rem baseline)
  - Ensure readability isn't compromised

- [ ] Test "dense information" approach
  - Don't over-pad, but ensure breathing room
  - Balance terminal efficiency with comfort

#### 3.3 Responsive Breakpoint

- [ ] Add breakpoint for narrow screens (< 400px)
  - Test on mobile devices
  - Ensure monospace remains readable at small sizes
  - Adjust padding/margins for small screens

### Delegation Strategy

- **Direct work:** CSS layout changes, spacing adjustments, testing
- **Subagent (Explore):** Find examples of terminal window CSS, box-drawing character usage

### Success Criteria

- ✅ Borders feel intentional, like terminal windows
- ✅ Spacing is consistent and rhythmic
- ✅ Site works well on narrow screens (< 400px)
- ✅ Information density feels right (not claustrophobic, not wasteful)

### Estimated Effort

1 work session (2-3 hours)

---

## Phase 4: Details, Texture & Polish

**Goal:** Add CSS-only texture, micro-interactions, signature details

**Priority:** 🟢 Medium (adds personality)

**Dependencies:** Phase 3 complete (structure established)

### Tasks

#### 4.1 CSS-Only Texture

- [ ] Experiment with subtle scanlines
  - `repeating-linear-gradient` for CRT effect
  - Must be subtle (accessibility: `prefers-reduced-motion`)
  - Test in both light and dark modes

- [ ] Consider noise/dithering texture
  - SVG data URI for subtle background texture
  - Keep file size minimal

- [ ] Test bioluminescent glow effects
  - Box shadows on panels in accent colors
  - Must enhance, not distract

#### 4.2 Micro-interactions

- [ ] Link hover glow
  - `text-shadow` or `box-shadow` in lavender
  - Smooth transition (0.2s ease)
  - Test that it's noticeable but not jarring

- [ ] Navigation highlight transition
  - Smooth color shift for `aria-current`
  - Consider underline slide-in effect

- [ ] Focus state animation
  - Border fade-in or background pulse
  - Must respect `prefers-reduced-motion`

#### 4.3 Signature Details

- [ ] Add visual signature element
  - Colored top bar (3px lavender or sage)
  - Or: monogram/wordmark in header
  - Or: ASCII art sigil using `::before`

- [ ] Consider terminal prompt styling
  - Footer could have `$` or `>` prompt character
  - Or: section headings could have `►` prefix

#### 4.4 Visual Style Guide Documentation

- [ ] Create comprehensive CSS comment block
  - Document color palette with hex values and meanings
  - Document type scale with rem values
  - Document spacing tokens (--pad, --gap values)
  - Explain design decisions for future reference

### Delegation Strategy

- **Direct work:** CSS implementation, testing, iteration
- **No delegation needed** (small, experimental tasks)

### Success Criteria

- ✅ Texture is subtle and respects accessibility preferences
- ✅ Micro-interactions feel responsive and polished
- ✅ Signature element is distinctive but not overwhelming
- ✅ Visual style guide is documented in CSS

### Estimated Effort

1 work session (2-3 hours)

---

## Phase 5: Content Expansion

**Goal:** Add new pages (/uses, /resume, CivCitDev showcase, RSS)

**Priority:** 🟢 Medium (content, not visual identity)

**Dependencies:** Phases 2-4 complete (visual system established)

### Tasks

#### 5.1 `/uses` Page

- [ ] Create `/uses.html` or `/uses/index.html`
- [ ] List tools, hardware, software with brief descriptions
- [ ] Apply established visual style (borders, colors, typography)
- [ ] Add to primary navigation

#### 5.2 `/resume` Page

- [ ] Create `/resume.html` with semantic HTML
  - Use `<article>`, `<section>`, `<dl>`, `<time>` elements
  - Structure: experience, education, skills, projects
- [ ] Apply h-resume microformat
- [ ] Design print stylesheet
  - Hide nav/footer for PDF export
  - Ensure single-column layout
  - Test with `Ctrl+P`
- [ ] Add "Download PDF" trigger (window.print())
- [ ] Link from homepage h-card and nav

#### 5.3 CivCitDev Showcase

- [ ] Add "Projects" section to homepage
  - Brief CivCitDev description (civic-focused open-source tooling)
  - Card for Ontario Tenant Tools (link, description, status)
  - Use `rel="me"` for ownership verification
- [ ] Design reusable project card component
  - Status indicator: active ● / beta ○ / archived ◇
  - Apply lavender/sage palette to cards
  - Border treatment consistent with site aesthetic

#### 5.4 RSS/Atom Feed

- [ ] Create `/feed.xml` or `/atom.xml`
- [ ] Add `<link rel="alternate">` to all pages
- [ ] Test with feed validator
- [ ] Consider adding h-feed markup to posts page

#### 5.5 Expand Posts Page

- [ ] Decide: pagination vs. simple list
- [ ] Add h-entry microformat to all posts
- [ ] Ensure posts page showcases visual identity

### Delegation Strategy

- **Direct work:** HTML structure, content writing, microformat implementation
- **Subagent (Explore):** Research h-resume microformat best practices, RSS/Atom standards

### Success Criteria

- ✅ All new pages exist and are accessible via navigation
- ✅ Microformats are correctly implemented
- ✅ Print stylesheet produces clean PDF
- ✅ RSS feed validates
- ✅ Visual identity is consistent across all pages

### Estimated Effort

2 work sessions (4-6 hours)

---

## Phase 6: Infrastructure & Optimization

**Goal:** Performance, error handling, final polish

**Priority:** 🟢 Low (nice-to-haves)

**Dependencies:** All prior phases complete

### Tasks

#### 6.1 Performance Optimization

- [ ] Consider critical CSS inlining
  - Inline above-the-fold CSS in `<head>`
  - Defer non-critical styles
  - Measure impact (should be minimal given simple site)

- [ ] Add cache-control headers
  - Create `_headers` file for Cloudflare
  - Set aggressive caching for CSS/images
  - Test header propagation

- [ ] Optimize any images
  - Ensure images are web-optimized
  - Add meaningful alt text (accessibility audit)

#### 6.2 Error Handling

- [ ] Create custom `404.html`
  - Apply site visual identity
  - Provide helpful navigation back to homepage
  - Add search or sitemap links

#### 6.3 Favicon & Metadata

- [ ] Review favicon consistency
  - Currently SVG only — add PNG fallback (32x32, 180x180)
  - Test across browsers (Safari, Firefox, Chrome)
  - Ensure favicon reflects Data Druid aesthetic (lavender/sage)

- [ ] Audit meta tags
  - Ensure all pages have proper `<title>`, `<meta description>`
  - Add Open Graph tags for social sharing
  - Test with social media preview tools

#### 6.4 Final Accessibility Audit

- [ ] Run full accessibility test
  - Automated: axe DevTools, WAVE
  - Manual: keyboard navigation, screen reader (NVDA/VoiceOver)
  - Color contrast: verify all text passes WCAG 2.2 AA
  - Motion: test `prefers-reduced-motion` works

- [ ] Fix any issues found

#### 6.5 Print Stylesheet

- [ ] Create print stylesheet for all pages
  - Hide nav, footer, decorative elements
  - Ensure links are visible (print URLs after link text)
  - Single column layout
  - Black text on white for printer-friendliness

### Delegation Strategy

- **Subagent (Bash):** Run automated accessibility tests, validate HTML/CSS
- **Direct work:** Manual testing, fixes, optimization

### Success Criteria

- ✅ Site loads in < 2 seconds on slow connections
- ✅ 404 page exists and is helpful
- ✅ Favicon works in all browsers
- ✅ No accessibility violations found
- ✅ Print output is clean and readable

### Estimated Effort

1 work session (2-3 hours)

---

## Risk Management

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Color contrast fails WCAG | Medium | High | Test early (Phase 1), adjust palette before implementation |
| Monospace typography unreadable on mobile | Low | Medium | Test responsively, have fallback to system sans |
| CSS custom properties unsupported in old browsers | Low | Low | Acceptable — site is for modern web, degrades gracefully |
| Scanline texture causes motion sickness | Low | High | Make optional, respect `prefers-reduced-motion` |
| Too much personality = cluttered | Medium | Medium | Iterate, get feedback, stay minimal |

### Process Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Scope creep (adding features not in plan) | High | Medium | Refer to DESIGN_PRINCIPLES.md, stick to plan |
| Over-engineering (build system, framework) | Medium | High | Process Notes mandate static, hand-editable code |
| Perfectionism delays launch | High | Low | Ship iteratively, document what's "good enough" |

---

## Decision Points

These require user input before proceeding:

1. **Typography:** Full monospace vs. mixed (mono headings, sans body)?
2. **Border style:** Single border vs. double border (outline + border)?
3. **Texture:** Scanlines? Noise? Or keep it simple?
4. **Mode toggle:** Manual dark/light toggle or rely on `prefers-color-scheme`?
5. **Top bar:** 3px colored bar at page top, or skip for minimalism?

---

## Success Metrics (Final)

After all phases complete, the site should:

- ✅ **Visual Identity:** Distinctive, low-fi, Data Druid aesthetic (not generic)
- ✅ **Accessibility:** WCAG 2.2 AA compliance (contrast, keyboard, screen readers)
- ✅ **Performance:** < 2s load time, works on slow connections
- ✅ **Portability:** Static HTML/CSS, no build step, works in text browsers
- ✅ **Sustainability:** Hand-editable, documented, maintainable indefinitely
- ✅ **Philosophy:** Passes all four tests (Convivial, IndieWeb, Sustainability, Accessibility)
- ✅ **Forkability:** Others can understand, modify, and learn from the code

---

## Next Steps (Immediate)

1. **Review this plan** — User approval/adjustments needed
2. **Begin Phase 1** — Audit CSS, test color palette for accessibility
3. **Make decision points** — Answer 5 questions listed above
4. **Start implementation** — Phase 2 color palette integration

---

*This plan embodies convivial design: transparent, achievable, and empowering. Each phase can be completed independently, allowing for iteration and learning. The work enriches rather than restricts, honoring both the site's identity and the user's autonomy.*
