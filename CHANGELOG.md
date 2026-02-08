# Changelog

Format:
- Dates in ISO format (YYYY-MM-DD)
- Focus on user-visible changes and structural milestones

## [Unreleased]

### Added

### Changed

### Fixed

---

## 2026-02-08

### Added — Data Druid Visual Identity (Phase 2)

**Design Foundation:**
- Added `DESIGN_PRINCIPLES.md` — Comprehensive design philosophy document grounding all decisions in IndieWeb principles and Ivan Illich's convivial design
- Added `IMPLEMENTATION_PLAN.md` — 6-phase implementation roadmap with detailed tasks, delegation strategies, and success criteria
- Added `PHASE1_AUDIT.md` — Complete CSS audit and WCAG 2.2 accessibility testing results for lavender/sage color palette
- Added `BACKLOG.md` updates — Integrated Data Druid aesthetic direction (low-fi, Caves of Qud-inspired, "data Druid") with practical translation guidance

**Visual Identity:**
- Added complete lavender/sage "mystical garden" color palette (11 colors: 6 lavender shades + 5 sage/green shades)
- Added Atkinson Hyperlegible font (accessibility-first typeface designed by Braille Institute for low vision readers)
- Added 3px top bar signature element with lavender→sage gradient
- Added double border treatment (border + outline) for terminal window depth effect on all panels
- Added bioluminescent link glow effect (text-shadow on hover in lavender)
- Added manual dark/light mode toggle button (top-right, with localStorage persistence)
- Added theme toggle JavaScript (`assets/theme-toggle.js`) for manual mode control
- Added skip links to all pages for keyboard navigation
- Added comprehensive CSS documentation (498 lines with inline comments explaining every design decision)

**Typography:**
- Added clear heading hierarchy: h1 (2.2rem) → h2 (1.6rem) → h3 (1.3rem) → body (1rem)
- Added Google Fonts link for Atkinson Hyperlegible to all HTML pages

**Accessibility:**
- Added WCAG 2.2 AA+ compliant color palette (most combinations achieve AAA)
- Added keyboard-accessible theme toggle with proper ARIA labels
- Added smooth color transitions for theme changes (0.3s ease)
- Added print stylesheet (hides toggle, top bar, nav for clean paper output)
- Added responsive typography for narrow screens (< 400px)

### Changed — Data Druid Visual Identity (Phase 2)

**Color System:**
- Changed color palette from generic blue/gray to lavender/sage mystical garden aesthetic
- Changed light mode background: white (#ffffff) → warm parchment (#f5f1e8)
- Changed dark mode background: #0b0b0b → near-black (#0d0d0d) for better contrast
- Changed link colors: blue (#0b57d0) → lavender (#6b4dbf light, #b19cd9 dark)
- Changed borders: gray (#e6e6e6) → pale lavender (#d4c5f9) with double border treatment
- Changed muted text: generic gray → warm brown/purple-tinted

**Typography:**
- Changed font family: system sans-serif → Atkinson Hyperlegible (with system fallbacks)
- Changed h1 size: 1.9rem → 2.2rem (16% increase)
- Changed h2 size: 1.1rem → 1.6rem (45% increase) — **CRITICAL FIX** for readability
- Changed h3: added new level at 1.3rem for clearer hierarchy
- Changed line-height and letter-spacing for optimal legibility

**Layout:**
- Changed border-radius: 10px → 2px (terminal sharpness, not rounded)
- Changed border treatment: single border → double border (outline + border) for depth
- Changed section backgrounds: removed imperceptible 92/8 color-mix, using solid backgrounds
- Changed layout spacing to account for 3px top bar

**Links:**
- Changed link underline: default → custom color (soft lavender)
- Changed link hover: thicker underline → thicker + bioluminescent glow
- Changed visited links: browser purple → darker lavender (distinguishable but cohesive)
- Changed focus states: simple outline → outline + subtle glow box-shadow

**Navigation:**
- Changed nav hover: no effect → lavender pale background
- Changed `aria-current` page: subtle background → lavender medium background with white text

**Theme Management:**
- Changed color-scheme: automatic only → manual toggle + automatic default
- Changed theme persistence: none → localStorage with smooth transitions

### Fixed — Data Druid Visual Identity (Phase 2)

- **CRITICAL:** Fixed h2 typography scale (was 1.1rem, only 10% larger than body text — now 1.6rem, 60% larger)
- Fixed color contrast ratios to meet WCAG 2.2 AA standards across all color combinations
- Fixed border visibility in both light and dark modes
- Fixed skip link positioning to account for 3px top bar
- Fixed print output to hide decorative elements (toggle, top bar, nav)

### Technical

**New Files:**
- `assets/theme-toggle.js` — Progressive enhancement JavaScript for manual dark/light mode toggle (60 lines)
- `DESIGN_PRINCIPLES.md` — Philosophical foundation (IndieWeb + convivial design)
- `IMPLEMENTATION_PLAN.md` — Complete 6-phase roadmap with tasks and success criteria
- `PHASE1_AUDIT.md` — CSS audit and color accessibility testing results

**Modified Files:**
- `assets/site.css` — Complete rewrite (160 lines → 498 lines) with Data Druid aesthetic
- `index.html` — Added font link, skip link, theme toggle, script tag
- `posts.html` — Added font link, theme toggle, script tag
- `now.html` — Added font link, skip link, theme toggle, script tag
- `colophon.html` — Added font link, skip link, theme toggle, script tag
- `BACKLOG.md` — Updated with Data Druid aesthetic direction and design decisions
- `README.md` — Added Design Philosophy section referencing DESIGN_PRINCIPLES.md

**Design Decisions Made:**
1. Typography: Atkinson Hyperlegible (NO monospace - accessibility > aesthetic)
2. Borders: Double border (outline + border) for depth
3. Texture: Subtle scanlines planned (Phase 4)
4. Mode toggle: Manual toggle with localStorage
5. Signature: 3px lavender→sage gradient top bar

**Accessibility Testing:**
- All lavender/sage color combinations tested for WCAG 2.2 compliance
- Dark mode: Most combinations achieve AAA (7:1), minimum AA (4.5:1)
- Light mode: All combinations meet AA, many achieve AAA
- Contrast testing matrix documented in PHASE1_AUDIT.md

**Philosophy:**
- Prioritized accessibility over aesthetic vibe (convivial design principle)
- Terminal aesthetic achieved through structure (borders, colors, layout) not font
- All design choices documented and explainable (transparent, forkable)
- Progressive enhancement: site works without JavaScript
- Sustainable: simple enough to maintain indefinitely

---

## 2026-01-13

### Added
- Deployed `sebthecanadian.ca` via GitHub Pages (branch: `main`, folder: `/ (root)`).
- Configured custom domain: `www.sebthecanadian.ca`.
- Added `now.html` and `colophon.html`.
- Added primary navigation (`<header><nav>...</nav></header>`) across pages with `aria-current="page"` on the active page.
- Added a semantic “last updated” footer using `<time datetime="YYYY-MM-DD">`.
- Added an accessibility skip link (`Skip to content`) targeting `id="content"` on `now.html`.
- Added site stylesheet at `assets/site.css`.
- Linked stylesheet from pages via `<link rel="stylesheet" href="/assets/site.css" />`.

### Changed
- Updated `index.html` to include:
  - canonical URL (`<link rel="canonical" href="https://www.sebthecanadian.ca/" />`)
  - basic IndieWeb conventions (`h-card`, `p-name`, `p-note`, `rel="me"`)
  - consistent semantic structure (`header`, `main`, `footer`).
- Updated `now.html` to include:
  - shared navigation + semantic structure
  - skip link + `id="content"` main landmark.
- Updated `colophon.html` to include shared navigation and remove redundant internal “Home” link in the page header.

### Security
- HTTPS enforced for `www.sebthecanadian.ca` (GitHub Pages TLS issuance completed; “Enforce HTTPS” enabled).

### Infrastructure / Ops Notes
- Cloudflare DNS configured for GitHub Pages:
  - `www` as CNAME to `seb-the-canadian.github.io` (DNS only).
  - Apex `@` A records to GitHub Pages IPs (DNS only).
- Confirmed GitHub Pages build + deployment workflow runs succeed.
