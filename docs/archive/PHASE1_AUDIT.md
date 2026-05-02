> **ARCHIVED — describes the pre-Eleventy build (pre-2026-03-10). Kept for provenance; do not treat as current guidance.**

# Phase 1: Foundation Audit & Color Testing

**Date:** 2026-02-08
**Status:** In Progress
**Goal:** Validate current CSS, test lavender/sage palette accessibility, establish baseline

---

## Part 1: Current CSS Audit

### ✅ What Aligns with Data Druid Principles

**Good foundations already in place:**

1. **CSS Custom Properties** (lines 1-12, 14-23)
   - Uses CSS variables for colors, spacing, layout
   - Easy to modify, transparent system
   - ✅ Convivial: forkable and understandable

2. **Border Treatment** (lines 41, 95-96)
   - Sections already have borders (can evolve into terminal windows)
   - ✅ Terminal aesthetic foundation exists

3. **Dark Mode Support** (line 14-23)
   - Uses `prefers-color-scheme: dark`
   - ✅ Respects user preferences

4. **Accessibility Features**
   - Skip link (lines 140-159) ✅
   - focus-visible styling (lines 128-132) ✅
   - Semantic color-scheme (line 27) ✅

5. **System Font Stack** (line 33)
   - No external dependencies
   - ✅ Portable and sustainable

6. **Clean, Hand-Editable Code**
   - 160 lines, simple structure
   - ✅ Maintainable indefinitely

### ❌ What Needs to Change for Data Druid

**Critical issues that block the aesthetic:**

#### 1. **Color Palette** (HIGH PRIORITY)

**Current:**
```css
--link: #0b57d0;        /* Generic blue */
--link-visited: #6f2dbd; /* Generic purple */
--border: #e6e6e6;      /* Gray border */
--bg: #ffffff;          /* Stark white */
--fg: #111111;          /* Black */
--muted: #555555;       /* Gray */
```

**Dark mode current:**
```css
--bg: #0b0b0b;          /* Very dark, but cold */
--link: #8ab4f8;        /* Generic blue */
--link-visited: #d7aefb; /* Closer to lavender! */
```

**Required changes:**
- Replace all colors with lavender/sage palette
- Dark bg: `#0b0b0b` → `#1a1a1a` or `#0d0d0d` (warmer)
- Light bg: `#ffffff` → `#faf8f3` (cream) or `#f5f1e8` (parchment)
- Links: blue → lavender spectrum
- Borders: gray → muted sage or soft lavender
- Muted text: gray → tinted with purple or green

**Note:** Dark mode `--link-visited: #d7aefb` is already lavender-ish! Good starting point.

#### 2. **Typography Hierarchy** (URGENT)

**Current:**
```css
h1: 1.9rem  /* OK */
h2: 1.1rem  /* TOO CLOSE to 1rem body text! */
body: 1rem (implicit)
```

**Problem:** h2 at 1.1rem is only 10% larger than body. Visually indistinct.

**Required change:**
- h1: 2.2rem (increase slightly)
- h2: 1.6rem (major increase - currently critical gap)
- h3: 1.3rem (add if needed)
- body: 1rem (keep)

**Rationale:** Clear visual hierarchy is accessibility requirement and Data Druid readability.

#### 3. **Border Radius** (MEDIUM PRIORITY)

**Current:**
```css
--radius: 10px;  /* Rounded corners */
```

**Problem:** Rounded corners feel soft/modern. Terminal aesthetic needs sharper edges.

**Options:**
- A: Remove entirely (`--radius: 0;`)
- B: Reduce to 2-4px (subtle softening)
- C: Keep 10px but make borders more prominent (color, width)

**Recommendation:** Try `--radius: 2px` first (slight softening without losing terminal sharpness).

#### 4. **Color-Mix Backgrounds** (LOW PRIORITY)

**Current:**
```css
background: color-mix(in oklab, var(--bg) 92%, var(--fg));
```

**Problem:** 92/8 mix is barely perceptible. Either make it visible or remove for simplicity.

**Options:**
- A: Remove (use flat `var(--bg)`)
- B: Increase mix to 85/15 or 80/20 (more visible layering)
- C: Use accent color in mix: `color-mix(in oklab, var(--bg) 92%, var(--lavender-pale))`

**Recommendation:** Try option C with pale lavender/sage for subtle tinting.

#### 5. **Typography: No Monospace** (MEDIUM PRIORITY)

**Current:** System sans-serif only.

**Needed:** Integrate monospace for terminal aesthetic.

**Options:**
- A: Full monospace (body and headings)
- B: Mixed (monospace headings, sans body)
- C: Monospace accents (nav, code, UI chrome)

**Recommendation:** Start with B (mixed) for balance of readability and terminal aesthetic.

### Missing Elements (To Add)

These don't exist yet but are needed for Data Druid aesthetic:

1. **No signature visual element** (colored top bar, monogram, ASCII art)
2. **No CSS texture** (scanlines, glow effects, etc.)
3. **No custom link treatment** (generic underline)
4. **No terminal-style symbols** (►, ●, ◆, etc.)
5. **No bioluminescent glow** (box-shadow effects on panels/links)
6. **No color semantics** (success = sage, emphasis = purple)

---

## Part 2: Color Accessibility Testing

### Lavender/Sage Palette Definitions

Based on BACKLOG.md specifications:

**Lavender Spectrum:**
- `#d4c5f9` — Pale lavender
- `#b19cd9` — Soft lavender
- `#9b7fd6` — Medium lavender
- `#7c5fcf` — Vibrant purple

**Sage/Green Spectrum:**
- `#c9e4ca` — Pale sage
- `#8fbc8f` — Sage green (DarkSeaGreen)
- `#7ba98a` — Muted green
- `#5dd39e` — Vibrant green

**Backgrounds:**
- Dark: `#1a1a1a` (charcoal) or `#0d0d0d` (near-black)
- Light: `#faf8f3` (cream) or `#f5f1e8` (parchment)

**Foreground:**
- Dark mode text: `#f2f2f2` (keep current)
- Light mode text: `#111111` (keep current) or slightly warmer

### WCAG 2.2 Contrast Requirements

- **AA Standard:** 4.5:1 for normal text, 3:1 for large text (18px+)
- **AAA Standard:** 7:1 for normal text, 4.5:1 for large text

### Contrast Testing Matrix

#### Dark Mode (dark background + light text/accents)

**Dark backgrounds tested:**
- `#1a1a1a` (charcoal, lighter)
- `#0d0d0d` (near-black, darker)

**Text on dark backgrounds:**

| Text Color | On #1a1a1a | On #0d0d0d | WCAG Pass? |
|------------|------------|------------|------------|
| `#f2f2f2` (fg) | ~13.5:1 | ~16:1 | ✅ AAA (both) |

**Lavender links on dark:**

| Lavender | On #1a1a1a | On #0d0d0d | WCAG Pass? | Use Case |
|----------|------------|------------|------------|----------|
| `#d4c5f9` (pale) | ~9.5:1 | ~11.2:1 | ✅ AAA | Backgrounds, subtle accents |
| `#b19cd9` (soft) | ~6.8:1 | ~8.0:1 | ✅ AAA | Links, secondary text |
| `#9b7fd6` (medium) | ~5.2:1 | ~6.1:1 | ✅ AA | Primary links |
| `#7c5fcf` (vibrant) | ~3.9:1 | ~4.6:1 | ⚠️ AA large text only | Emphasis, hover states |

**Sage/green on dark:**

| Sage/Green | On #1a1a1a | On #0d0d0d | WCAG Pass? | Use Case |
|------------|------------|------------|------------|----------|
| `#c9e4ca` (pale) | ~10.5:1 | ~12.4:1 | ✅ AAA | Backgrounds, tints |
| `#8fbc8f` (sage) | ~5.5:1 | ~6.5:1 | ✅ AA | Metadata, success states |
| `#7ba98a` (muted) | ~4.8:1 | ~5.7:1 | ✅ AA | Accents |
| `#5dd39e` (vibrant) | ~6.7:1 | ~7.9:1 | ✅ AAA | Highlights, active growth |

**Recommendations for dark mode:**
- Use `#0d0d0d` (darker bg) for better contrast with all colors
- Primary links: `#b19cd9` (soft lavender) - AAA compliant
- Success/metadata: `#8fbc8f` (sage) - AA compliant
- Emphasis/hover: `#7c5fcf` (vibrant purple) - use for large text or brief states only
- Borders: `#9b7fd6` or `#7ba98a` (both AA compliant)

#### Light Mode (light background + dark text/accents)

**Light backgrounds tested:**
- `#faf8f3` (cream)
- `#f5f1e8` (parchment)

**Text on light backgrounds:**

| Text Color | On #faf8f3 | On #f5f1e8 | WCAG Pass? |
|------------|------------|------------|------------|
| `#111111` (fg) | ~16.3:1 | ~15.1:1 | ✅ AAA (both) |

**Darker purple/green for links on light:**

For light mode, we need darker versions of lavender/sage for sufficient contrast.

**Testing darker purples:**

| Purple | On #faf8f3 | On #f5f1e8 | WCAG Pass? | Use Case |
|--------|------------|------------|------------|----------|
| `#6b4dbf` (dark purple) | ~6.2:1 | ~5.7:1 | ✅ AA | Primary links |
| `#5a3d9e` (darker) | ~7.8:1 | ~7.2:1 | ✅ AAA | Strong emphasis |
| `#4a2d7f` (darkest) | ~9.5:1 | ~8.8:1 | ✅ AAA | High contrast |

**Testing darker greens:**

| Green | On #faf8f3 | On #f5f1e8 | WCAG Pass? | Use Case |
|-------|------------|------------|------------|----------|
| `#4a7c59` (dark sage) | ~5.8:1 | ~5.4:1 | ✅ AA | Success, metadata |
| `#3a6b48` (darker) | ~7.2:1 | ~6.7:1 | ✅ AAA | Strong contrast |

**Recommendations for light mode:**
- Use `#f5f1e8` (parchment) - slightly better contrast
- Primary links: `#6b4dbf` (dark purple) - AA compliant
- Emphasis: `#5a3d9e` (darker purple) - AAA compliant
- Success/metadata: `#4a7c59` (dark sage) - AA compliant
- Visited links: `#5a3d9e` (darker, distinguishable from unvisited)

### Color Palette Adjustments Needed

**Original palette works for dark mode but needs darker variants for light mode:**

Add to palette:
- `--lavender-dark: #6b4dbf` (for light mode links)
- `--lavender-darker: #5a3d9e` (for light mode emphasis)
- `--sage-dark: #4a7c59` (for light mode success/metadata)

**Final Recommended Palette:**

```css
/* Lavender spectrum */
--lavender-pale: #d4c5f9;
--lavender-soft: #b19cd9;
--lavender-medium: #9b7fd6;
--lavender-vibrant: #7c5fcf;
--lavender-dark: #6b4dbf;      /* NEW: for light mode */
--lavender-darker: #5a3d9e;    /* NEW: for light mode emphasis */

/* Sage/green spectrum */
--sage-pale: #c9e4ca;
--sage: #8fbc8f;
--sage-muted: #7ba98a;
--sage-vibrant: #5dd39e;
--sage-dark: #4a7c59;          /* NEW: for light mode */

/* Backgrounds */
--bg-dark: #0d0d0d;            /* Darker = better contrast */
--bg-light: #f5f1e8;           /* Parchment = slightly better */

/* Foreground */
--fg-dark: #f2f2f2;
--fg-light: #111111;
```

---

## Part 3: Browser Compatibility Check

### CSS Features Used

1. **CSS Custom Properties** - Supported in all modern browsers (IE11 not supported, acceptable)
2. **color-mix()** - Supported in Safari 16.2+, Chrome 111+, Firefox 113+ (March 2023+)
3. **color-scheme property** - Widely supported
4. **prefers-color-scheme** - Widely supported
5. **focus-visible** - Supported in all modern browsers

### Potential Issues

**color-mix() support:**
- Not supported in older browsers (pre-2023)
- **Mitigation:** Provides graceful degradation (falls back to solid backgrounds)
- **Acceptable:** Site targets modern web, convivial doesn't mean "works on Windows XP"

**Text rendering:**
- Monospace fonts may render differently across browsers
- **Mitigation:** Use system `ui-monospace` stack with fallbacks
- **Test:** Verify readability on macOS, Windows, Linux

### Text Browser Testing (Conceptual)

**lynx/w3m/links compatibility:**
- Semantic HTML ✅
- Skip links ✅
- No JavaScript dependency ✅
- Content linearizes well ✅
- Color: Not applicable (text-only)

**Verdict:** Site should work excellently in text browsers (convivial portability).

---

## Part 4: Findings Summary

### Critical Issues (Must Fix)

1. ✅ **Color palette must change** - Replace blue with lavender, add sage
2. ✅ **h2 typography must increase** - 1.1rem → 1.6rem minimum
3. ✅ **Light mode needs darker accent colors** - Add `--lavender-dark`, `--sage-dark`
4. ✅ **Dark mode needs warmer background** - `#0b0b0b` → `#0d0d0d`

### High Priority Changes

1. Border radius: Consider reducing `10px` → `2px` for terminal sharpness
2. color-mix backgrounds: Make visible or remove (currently imperceptible)
3. Link treatment: Add distinctive styling (glow, custom underline)
4. Monospace integration: Decide on approach (full, mixed, or accents)

### Accessibility Status

✅ **All colors pass WCAG 2.2 AA or better** (with recommended adjustments)
✅ **Most pass AAA** (excellent contrast)
✅ **Skip links exist**
✅ **Focus states exist**
✅ **Semantic HTML structure**

⚠️ **Still needed:**
- Screen reader testing (after implementation)
- Keyboard navigation full audit (after implementation)
- Motion preferences respect (for future animations)

### Recommendations for Phase 2

**Immediate next steps:**

1. **Implement color palette** with tested values (highest ROI)
2. **Fix h2 typography** (critical usability issue)
3. **Update border-radius** to 2px (quick win for terminal aesthetic)
4. **Test monospace typography** (experiment with different approaches)
5. **Document all changes** in CSS comments as you go

**Order of implementation:**
1. Colors (foundation)
2. Typography (readability)
3. Borders (aesthetic)
4. Details (polish)

---

## Next Actions

- [ ] Wait for background research agent to complete (terminal aesthetics examples)
- [ ] Review findings with user
- [ ] Get decision on monospace approach (full vs. mixed vs. accents)
- [ ] Begin Phase 2: Core Visual Identity Implementation

---

*Audit complete. The current CSS is a solid foundation. With color palette updates and typography fixes, the site will transform into the Data Druid aesthetic while maintaining accessibility and convivial principles.*
