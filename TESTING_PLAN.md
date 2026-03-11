# Phase 2 Testing & Debugging Plan

**Date:** 2026-02-08
**Status:** In Progress
**Goal:** Systematically verify all Phase 2 Data Druid visual identity changes work correctly

---

## Testing Checklist

### ✅ Level 1: Visual & Functional Testing (Manual)

#### **1.1 Color Palette**
- [ ] Light mode: Parchment background (#f5f1e8) displays correctly
- [ ] Dark mode: Near-black background (#0d0d0d) displays correctly
- [ ] Lavender colors visible and distinguishable in both modes
- [ ] Sage/green colors visible and distinguishable in both modes
- [ ] All text readable with sufficient contrast
- [ ] 3px top bar gradient (lavender→sage) visible at top of viewport

#### **1.2 Typography**
- [ ] Atkinson Hyperlegible font loads successfully (check Network tab)
- [ ] Fallback to system fonts works if Google Fonts unavailable
- [ ] h1 (2.2rem) is visually larger than h2 (1.6rem)
- [ ] h2 (1.6rem) is clearly larger than body text (1rem)
- [ ] h3 (1.3rem) creates clear step between h2 and body
- [ ] Text remains readable at all sizes
- [ ] Line-height (1.6) provides comfortable reading

#### **1.3 Layout & Borders**
- [ ] Double borders visible on header, main, footer, section elements
- [ ] Inner and outer borders distinguishable (2px offset)
- [ ] Border colors change appropriately between light/dark modes
- [ ] Border-radius is sharp (2px, not rounded 10px)
- [ ] Spacing around 3px top bar correct (no overlap with content)
- [ ] Content max-width (68ch) maintains readability

#### **1.4 Links**
- [ ] Links display in lavender (not blue)
- [ ] Link underlines use soft lavender color
- [ ] Visited links show darker lavender (distinguishable)
- [ ] Hover state shows bioluminescent glow (text-shadow)
- [ ] Glow effect is subtle, not harsh
- [ ] Focus states show outline + subtle box-shadow
- [ ] Transitions are smooth (0.2s ease)

#### **1.5 Navigation**
- [ ] Nav links display correctly
- [ ] Current page (`aria-current="page"`) has lavender medium background
- [ ] Nav hover shows pale lavender background
- [ ] Nav links keyboard accessible (Tab to navigate)
- [ ] Navigation readable in both light and dark modes

#### **1.6 Theme Toggle**
- [ ] Toggle button visible in top-right corner
- [ ] Button shows ◐ symbol initially
- [ ] Click changes theme (light ↔ dark)
- [ ] Theme change is smooth (0.3s transitions)
- [ ] Icon changes: ☀️ in dark mode, 🌙 in light mode
- [ ] Theme persists after page refresh (localStorage works)
- [ ] Toggle keyboard accessible (Tab + Enter/Space)
- [ ] ARIA label updates correctly ("Switch to [mode]")
- [ ] Respects `prefers-color-scheme` as initial default
- [ ] Manual choice overrides system preference

#### **1.7 Skip Link**
- [ ] Skip link present on all pages
- [ ] Hidden by default (not visible)
- [ ] Visible when focused with Tab key
- [ ] Clicking skip link jumps to main content
- [ ] Skip link styled consistently (lavender border, glow)
- [ ] Z-index ensures it appears above other content

#### **1.8 Images**
- [ ] h-card photo displays correctly (if present on index.html)
- [ ] Image has subtle border (1px solid lavender)
- [ ] Border-radius is sharp (2px)

---

### ✅ Level 2: Responsive & Cross-Browser Testing

#### **2.1 Responsive Design**
- [ ] Test at 1920px width (desktop)
- [ ] Test at 1366px width (laptop)
- [ ] Test at 768px width (tablet)
- [ ] Test at 400px width (mobile)
- [ ] Test at 320px width (narrow mobile)
- [ ] Typography scales appropriately below 400px
- [ ] Theme toggle remains visible and functional on mobile
- [ ] Double borders don't cause horizontal scroll
- [ ] Margins and padding adjust for narrow screens

#### **2.2 Browser Compatibility**
- [ ] Chrome/Edge (latest) — all features work
- [ ] Firefox (latest) — all features work
- [ ] Safari (macOS) — all features work
- [ ] Safari (iOS) — all features work
- [ ] Chrome (Android) — all features work
- [ ] CSS custom properties work in all browsers
- [ ] CSS `outline` + `border` combo renders correctly
- [ ] Google Fonts load reliably (or fallback works)
- [ ] localStorage works in all browsers (theme persistence)

#### **2.3 Dark Mode System Preference**
- [ ] `prefers-color-scheme: dark` triggers dark mode by default
- [ ] `prefers-color-scheme: light` triggers light mode by default
- [ ] Manual toggle overrides system preference
- [ ] System preference changes respected if no manual choice

---

### ✅ Level 3: Accessibility Testing

#### **3.1 Keyboard Navigation**
- [ ] Tab through all interactive elements in logical order
- [ ] Skip link is first tab stop
- [ ] Theme toggle reachable via Tab
- [ ] All navigation links reachable and activatable
- [ ] All body links reachable and activatable
- [ ] Focus states clearly visible (outline + glow)
- [ ] No keyboard traps
- [ ] Enter/Space activate buttons and links

#### **3.2 Screen Reader Testing**
- [ ] Page landmarks announced (header, main, footer)
- [ ] Headings hierarchy logical and announced
- [ ] Links announced with correct text
- [ ] Theme toggle button has clear ARIA label
- [ ] ARIA label updates when theme changes
- [ ] Skip link announced and functional
- [ ] `aria-current="page"` announced correctly

#### **3.3 Color Contrast (WCAG 2.2)**
- [ ] Light mode text on parchment: passes AA (4.5:1+)
- [ ] Dark mode text on near-black: passes AA (4.5:1+)
- [ ] Lavender links on light background: passes AA
- [ ] Lavender links on dark background: passes AA
- [ ] Nav `aria-current` has sufficient contrast
- [ ] All interactive elements meet 3:1 contrast (large text/UI)
- [ ] Aim for AAA (7:1+) where possible

#### **3.4 Motion Preferences**
- [ ] Smooth transitions respect `prefers-reduced-motion: no-preference`
- [ ] `prefers-reduced-motion: reduce` disables transitions (test once Phase 4 scanlines added)
- [ ] Theme toggle transitions don't cause discomfort

---

### ✅ Level 4: Technical Validation

#### **4.1 HTML Validation**
- [ ] index.html passes W3C validator (no errors)
- [ ] posts.html passes W3C validator (no errors)
- [ ] now.html passes W3C validator (no errors)
- [ ] colophon.html passes W3C validator (no errors)
- [ ] All pages have proper DOCTYPE, lang, charset
- [ ] All IDs are unique per page
- [ ] All ARIA attributes used correctly

#### **4.2 CSS Validation**
- [ ] assets/site.css passes W3C CSS validator
- [ ] No syntax errors
- [ ] All custom properties defined before use
- [ ] Browser prefixes used where necessary (if any)
- [ ] No unused selectors (review after validation)

#### **4.3 JavaScript Validation**
- [ ] assets/theme-toggle.js has no console errors
- [ ] Script handles missing elements gracefully
- [ ] LocalStorage access doesn't throw errors
- [ ] Script doesn't block page rendering
- [ ] Progressive enhancement: site works without JS

#### **4.4 Performance**
- [ ] Total page size < 500KB (check Network tab)
- [ ] Atkinson Hyperlegible font loads efficiently
- [ ] No render-blocking resources (except critical CSS)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shift (CLS score)

---

### ✅ Level 5: Print & Special Contexts

#### **5.1 Print Stylesheet**
- [ ] Print preview hides theme toggle
- [ ] Print preview hides 3px top bar
- [ ] Print preview hides navigation
- [ ] Print preview uses black text on white background
- [ ] Print preview shows link URLs after link text
- [ ] Borders removed or simplified for print
- [ ] Single-column layout for easy printing
- [ ] Page breaks appropriate

#### **5.2 Text Browsers (lynx/w3m)**
- [ ] Content linearizes logically
- [ ] Headings provide clear structure
- [ ] Links have descriptive text
- [ ] Skip link functions (if supported)
- [ ] No JavaScript dependency for core content

---

## Automated Testing Scripts

### HTML Validation
```bash
# Validate all HTML files
for file in *.html; do
  echo "Validating $file..."
  curl -H "Content-Type: text/html; charset=utf-8" \
       --data-binary @"$file" \
       "https://validator.w3.org/nu/?out=gnu" 2>&1 | grep -E "error|warning"
done
```

### CSS Validation
```bash
# Validate CSS
curl -H "Content-Type: text/css; charset=utf-8" \
     --data-binary @assets/site.css \
     "https://jigsaw.w3.org/css-validator/validator" 2>&1 | grep -E "error|warning"
```

### Contrast Testing (Manual Tools)
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: Lighthouse Accessibility audit
- **axe DevTools**: Browser extension

### Lighthouse Audit
```bash
# Run Lighthouse on all pages (requires npm install -g lighthouse)
lighthouse index.html --output html --output-path reports/index-report.html
lighthouse posts.html --output html --output-path reports/posts-report.html
lighthouse now.html --output html --output-path reports/now-report.html
lighthouse colophon.html --output html --output-path reports/colophon-report.html
```

---

## Known Issues / Findings

**Document any issues discovered during testing:**

### Critical
- [ ] None identified yet

### High Priority
- [ ] None identified yet

### Medium Priority
- [ ] None identified yet

### Low Priority / Future Enhancement
- [ ] None identified yet

---

## Testing Sign-Off

**Manual Testing:** [ ] Complete
**Responsive Testing:** [ ] Complete
**Accessibility Testing:** [ ] Complete
**Technical Validation:** [ ] Complete
**Print Testing:** [ ] Complete

**Date Completed:** ___________
**Tested By:** ___________
**Issues Found:** ___________
**Issues Resolved:** ___________

**APPROVED FOR DEPLOYMENT:** [ ] YES / [ ] NO

---

*This testing plan ensures all Phase 2 changes meet quality, accessibility, and convivial design standards before considering the phase complete.*
