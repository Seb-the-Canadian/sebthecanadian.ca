# UI/UX Enhancements Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add seven targeted UI/UX enhancements that deepen the Data Druid aesthetic and make the site feel genuinely inhabited — without adding gimmicks.

**Architecture:** Enhancements are layered progressively: CSS-only first (Tasks 1–5), then an Eleventy filter + template (Task 6), a self-contained vanilla JS module (Task 7), and a pixel-art asset replacement (Task 8). Each task is independent and produces a visible improvement on its own.

**Tech Stack:** Eleventy 3.x (ESM config), Nunjucks templates, vanilla CSS custom properties, vanilla JS (progressive enhancement, IIFE pattern matching existing code style)

---

## Enhancement Summary

| # | Name | Type | Files touched |
|---|------|------|---------------|
| 1 | Amplify background texture | SVG + CSS | `forest-floor.svg`, `base.css` |
| 2 | Section dividers on homepage | HTML | `index.njk` |
| 3 | Terminal cursor blink on hero | CSS | `components.css` |
| 4 | "Live" pulse dot on Now link | CSS | `components.css` |
| 5 | View Transitions API page fade | CSS | `base.css` |
| 6 | Garden "last active" signal | Eleventy + Nunjucks | `eleventy.config.js`, `garden-section.njk`, `components.css` |
| 7 | Keyboard navigation shortcuts | JS + CSS | `keyboard-nav.js` (new), `base.njk`, `components.css` |
| 8 | Memento mori site mark | SVG | `monogram.svg` |

---

## Chunk 1: Visual Texture & Micro-Presence (Tasks 1–5)

### Task 1: Amplify the background texture

**Context:** `src/assets/img/pixel/textures/forest-floor.svg` exists and is already referenced in `base.css` at 64×64px. The current SVG has ~20 dots at 2–5% opacity — too faint to see. We need to replace it with a richer version at 6–14% opacity to make the parchment feel textured.

**Files:**
- Replace: `src/assets/img/pixel/textures/forest-floor.svg`
- Modify: `src/assets/css/base.css` (opacity tweak on body background)

- [ ] **Step 1: Replace `forest-floor.svg` with a denser, more visible texture**

Replace the entire file content with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <!-- Forest floor pixel texture — tiles at 64×64, uses currentColor to adapt to light/dark -->
  <style>
    .p  { fill: currentColor; opacity: 0.13; }
    .m  { fill: currentColor; opacity: 0.08; }
    .f  { fill: currentColor; opacity: 0.05; }
    .xf { fill: currentColor; opacity: 0.03; }
  </style>
  <!-- Row 1 -->
  <rect class="m"  x="3"  y="3"  width="2" height="2"/>
  <rect class="f"  x="11" y="1"  width="1" height="2"/>
  <rect class="p"  x="19" y="4"  width="2" height="1"/>
  <rect class="xf" x="29" y="2"  width="2" height="2"/>
  <rect class="m"  x="38" y="5"  width="1" height="1"/>
  <rect class="f"  x="47" y="3"  width="2" height="2"/>
  <rect class="p"  x="57" y="1"  width="2" height="1"/>
  <rect class="xf" x="62" y="5"  width="1" height="2"/>
  <!-- Row 2 -->
  <rect class="f"  x="7"  y="10" width="2" height="1"/>
  <rect class="p"  x="15" y="12" width="2" height="2"/>
  <rect class="m"  x="24" y="9"  width="1" height="2"/>
  <rect class="xf" x="33" y="13" width="2" height="1"/>
  <rect class="p"  x="43" y="10" width="2" height="2"/>
  <rect class="f"  x="52" y="11" width="1" height="1"/>
  <rect class="m"  x="59" y="13" width="2" height="2"/>
  <!-- Row 3 -->
  <rect class="p"  x="1"  y="19" width="2" height="2"/>
  <rect class="xf" x="10" y="21" width="2" height="1"/>
  <rect class="f"  x="20" y="17" width="1" height="2"/>
  <rect class="m"  x="28" y="20" width="2" height="2"/>
  <rect class="f"  x="37" y="18" width="2" height="1"/>
  <rect class="p"  x="46" y="21" width="2" height="2"/>
  <rect class="xf" x="55" y="19" width="1" height="2"/>
  <rect class="m"  x="61" y="22" width="2" height="1"/>
  <!-- Row 4 -->
  <rect class="m"  x="5"  y="28" width="2" height="2"/>
  <rect class="p"  x="13" y="30" width="1" height="1"/>
  <rect class="xf" x="22" y="27" width="2" height="2"/>
  <rect class="f"  x="31" y="29" width="2" height="1"/>
  <rect class="m"  x="40" y="31" width="1" height="2"/>
  <rect class="p"  x="49" y="28" width="2" height="2"/>
  <rect class="f"  x="58" y="30" width="2" height="1"/>
  <rect class="xf" x="63" y="27" width="1" height="1"/>
  <!-- Row 5 -->
  <rect class="f"  x="2"  y="37" width="2" height="1"/>
  <rect class="xf" x="9"  y="39" width="1" height="2"/>
  <rect class="p"  x="17" y="36" width="2" height="2"/>
  <rect class="m"  x="26" y="38" width="2" height="1"/>
  <rect class="xf" x="35" y="40" width="2" height="2"/>
  <rect class="f"  x="44" y="37" width="1" height="2"/>
  <rect class="p"  x="53" y="39" width="2" height="1"/>
  <rect class="m"  x="60" y="36" width="1" height="2"/>
  <!-- Row 6 -->
  <rect class="p"  x="6"  y="46" width="2" height="2"/>
  <rect class="f"  x="14" y="48" width="2" height="1"/>
  <rect class="m"  x="23" y="45" width="1" height="2"/>
  <rect class="xf" x="32" y="47" width="2" height="2"/>
  <rect class="p"  x="41" y="49" width="2" height="1"/>
  <rect class="f"  x="50" y="46" width="1" height="1"/>
  <rect class="xf" x="57" y="48" width="2" height="2"/>
  <rect class="m"  x="62" y="45" width="1" height="1"/>
  <!-- Row 7 -->
  <rect class="xf" x="4"  y="55" width="2" height="2"/>
  <rect class="m"  x="12" y="57" width="2" height="1"/>
  <rect class="p"  x="21" y="54" width="1" height="2"/>
  <rect class="f"  x="30" y="56" width="2" height="2"/>
  <rect class="m"  x="39" y="58" width="2" height="1"/>
  <rect class="xf" x="48" y="55" width="1" height="2"/>
  <rect class="p"  x="56" y="57" width="2" height="2"/>
  <rect class="f"  x="63" y="54" width="1" height="1"/>
</svg>
```

- [ ] **Step 2: Verify the texture reference in `base.css`**

Open `src/assets/css/base.css`. Confirm `body` has these three rules (they should already be there). If `background-size` is missing or different, update to match:

```css
body {
  background: var(--bg);
  background-image: url('/assets/img/pixel/textures/forest-floor.svg');
  background-repeat: repeat;
  background-size: 64px 64px;
  /* ... rest unchanged */
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev` (or `npx @11ty/eleventy --serve`) from `sebthecanadian.ca/`. Open `http://localhost:8080`. In light mode, the parchment background should show a subtle scattered pixel grain — visible but not distracting. Switch to dark mode via the theme toggle and confirm the dots are visible against the deep forest background.

If the texture is too strong, reduce the `.p` class opacity from `0.13` to `0.10`. If it's still too faint, increase to `0.16`.

- [ ] **Step 4: Commit**

```bash
git add src/assets/img/pixel/textures/forest-floor.svg
git commit -m "design: amplify background texture for visible Data Druid grain"
```

---

### Task 2: Add pixel dividers between homepage sections

**Context:** `<hr>` elements already have moss-divider styling in `base.css`. The homepage (`src/index.njk`) has sections but no dividers between them. Adding `<hr>` elements places the existing divider SVG between sections, completing the visual separation the design brief calls for.

**Files:**
- Modify: `src/index.njk`

- [ ] **Step 1: Add `<hr>` dividers between homepage sections**

In `src/index.njk`, add `<hr>` after the garden section, after the featured project section, and after the latest writing section. The file currently looks like:

```nunjucks
{% include "garden-section.njk" %}

<section class="section">
  <h2>Featured Project</h2>
  ...
</section>

<section class="section">
  <h2>Latest Writing</h2>
  ...
</section>

<section class="section">
  <h2>Profiles</h2>
  ...
</section>
```

Add `<hr>` between each section:

```nunjucks
{% include "garden-section.njk" %}

<hr>

<section class="section">
  <h2>Featured Project</h2>
  {%- for project in projects %}
    {%- if project.featured %}
      {% include "project-card.njk" %}
    {%- endif %}
  {%- endfor %}
</section>

<hr>

{%- set latestPost = collections.writing | first %}
{%- if latestPost %}
<section class="section">
  <h2>Latest Writing</h2>
  {%- set post = latestPost %}
  {% include "post-card.njk" %}
</section>

<hr>

{%- endif %}

<section class="section">
  <h2>Profiles</h2>
  <ul class="profile-links">
    {%- for profile in profiles %}
    <li><a rel="me" href="{{ profile.url }}">{{ profile.platform }}</a></li>
    {%- endfor %}
    <li><a class="u-email" href="mailto:{{ site.email }}">{{ site.email }}</a></li>
  </ul>
</section>
```

- [ ] **Step 2: Verify in browser**

Reload the homepage. Moss pixel dividers should appear between the Garden, Featured Project, Latest Writing, and Profiles sections. Check both light and dark modes.

- [ ] **Step 3: Commit**

```bash
git add src/index.njk
git commit -m "design: add pixel moss dividers between homepage sections"
```

---

### Task 3: Terminal cursor blink on hero h1

**Context:** The hero `h1` contains "Seb (the Canadian)". A blinking block cursor appended via CSS `::after` signals the terminal/typewriter aesthetic immediately — IBM Plex Mono makes this look native. Pure CSS, no DOM changes, respects `prefers-reduced-motion`.

**Files:**
- Modify: `src/assets/css/components.css`

- [ ] **Step 1: Add cursor blink CSS to `components.css`**

Append to the end of `src/assets/css/components.css`:

```css
/* ── Terminal cursor blink on hero heading ───────────────────────────────── */
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.hero h1::after {
  content: "█";
  color: var(--accent);
  margin-left: 0.1em;
  animation: cursor-blink 1.2s step-end infinite;
  font-weight: 400;
}

@media (prefers-reduced-motion: reduce) {
  .hero h1::after {
    animation: none;
    opacity: 0.5;
  }
}
```

- [ ] **Step 2: Verify in browser**

The hero h1 "Seb (the Canadian)" should have a green blinking block cursor at the end. It should blink at roughly one cycle per 1.2 seconds. Switch to dark mode — cursor should be the dark-mode accent green.

In your OS accessibility settings (or Chrome DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion), confirm the cursor is static (non-blinking) at 50% opacity when `prefers-reduced-motion: reduce` is set.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/components.css
git commit -m "design: add terminal cursor blink to hero h1"
```

---

### Task 4: "Live" pulse dot on Now nav link

**Context:** The Now page is the only live/current content on the site. A small pulsing green dot next to the "Now" nav link signals presence without any text. Pure CSS attribute selector — no HTML changes needed.

**Files:**
- Modify: `src/assets/css/components.css`

- [ ] **Step 1: Add live pulse CSS to `components.css`**

Append to the end of `src/assets/css/components.css`:

```css
/* ── "Live" pulse dot on Now nav link ───────────────────────────────────── */
@keyframes live-pulse {
  0%, 100% { opacity: 1;   transform: scale(1);   }
  50%       { opacity: 0.3; transform: scale(0.7); }
}

nav[aria-label="Primary"] a[href="/now/"]::after {
  content: "";
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
  margin-left: 0.4em;
  vertical-align: middle;
  position: relative;
  top: -1px;
  animation: live-pulse 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  nav[aria-label="Primary"] a[href="/now/"]::after {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify in browser**

The "Now" link in the primary nav should have a small green dot to its right that pulses gently. Check that it doesn't appear on any other nav items. Check both light and dark mode. Check mobile (375px): the dot should still be visible.

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/components.css
git commit -m "design: add live pulse dot to Now nav link"
```

---

### Task 5: View Transitions API page fade

**Context:** One CSS at-rule adds a gentle cross-fade when navigating between pages. Supported in Chrome/Edge/Safari; Firefox degrades gracefully (no transition, full page load as before). No JS, no template changes.

**Files:**
- Modify: `src/assets/css/base.css`

- [ ] **Step 1: Add `@view-transition` to `base.css`**

Append to the end of `src/assets/css/base.css`:

```css
/* ── View Transitions API — gentle page cross-fade ──────────────────────── */
@view-transition {
  navigation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.18s;
  animation-timing-function: ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.01s;
  }
}
```

- [ ] **Step 2: Verify in browser**

In Chrome or Safari, click between nav links. Pages should cross-fade subtly — fast enough to not feel sluggish, slow enough to feel intentional. In Firefox, navigation should work identically with no transition (graceful degradation).

- [ ] **Step 3: Commit**

```bash
git add src/assets/css/base.css
git commit -m "design: add View Transitions API page cross-fade"
```

---

## Chunk 2: Dynamic Signals & Keyboard Navigation (Tasks 6–7)

### Task 6: Garden "last active" signal

**Context:** The garden section on the homepage claims to be a "living body of work" but shows no evidence of activity. A `last wrote: N days ago` line computed from `gardenPosts.json` at build time makes this tangible — like henry.codes' real-time weather. `gardenPosts.json` can be empty (the garden sync script may not have been run recently), so the display is conditional.

**Files:**
- Modify: `eleventy.config.js` (add `daysAgo` filter)
- Modify: `src/_includes/garden-section.njk` (add last-active line)
- Modify: `src/assets/css/components.css` (add `.garden-activity` styles)

- [ ] **Step 1: Add `daysAgo` filter to `eleventy.config.js`**

In `eleventy.config.js`, add the filter after the existing date filters (after `isoDateShort`, before the `return` block):

```javascript
eleventyConfig.addFilter("daysAgo", (dateStr) => {
  if (!dateStr) return null;
  const then = new Date(dateStr);
  if (isNaN(then.getTime())) return null;
  const days = Math.floor((Date.now() - then.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
});
```

- [ ] **Step 2: Add last-active signal to `garden-section.njk`**

The current file ends with `<p><a href="...">Enter the garden →</a></p>`. Add the conditional last-active line after that paragraph, before `</section>`:

```nunjucks
<section class="garden-feature section">
  <h2>The Garden</h2>
  <p>My notes, thinking, and long-form writing live in the digital garden at <a href="https://cognitivearchitecture.ca/" rel="me">cognitivearchitecture.ca</a>. It's where ideas grow through connection and revision &mdash; not a blog, but a living body of work.</p>
  <p>Writing published here originates there. Visit the garden for the full text, context, and connections.</p>
  <p><a href="https://cognitivearchitecture.ca/">Enter the garden &rarr;</a></p>
  {%- if gardenPosts and gardenPosts.length > 0 %}
  <p class="garden-activity">
    <span class="garden-activity-dot" aria-hidden="true"></span>last wrote: {{ gardenPosts[0].date | daysAgo }}
  </p>
  {%- endif %}
</section>
```

- [ ] **Step 3: Add `.garden-activity` CSS to `components.css`**

Append to `src/assets/css/components.css`:

```css
/* ── Garden last-active signal ───────────────────────────────────────────── */
.garden-activity {
  display: flex;
  align-items: center;
  gap: 0.45em;
  font-family: var(--font-code);
  font-size: var(--text-xs);
  color: var(--muted);
  margin-top: var(--space-md);
  margin-bottom: 0;
}

.garden-activity-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}
```

- [ ] **Step 4: Run garden sync to populate `gardenPosts.json`**

From `sebthecanadian.ca/`:

```bash
npm run garden-sync
```

Expected: `_data/gardenPosts.json` now contains an array of post objects with `date` fields. Verify with:

```bash
node -e "const p = JSON.parse(require('fs').readFileSync('_data/gardenPosts.json')); console.log(p[0]?.date)"
```

Expected output: a date string like `2025-11-15` (or similar). If `gardenPosts.json` remains `[]`, the display will simply not render — that is acceptable behaviour.

- [ ] **Step 5: Verify in browser**

Run `npm run build && npx @11ty/eleventy --serve`. On the homepage garden section, below the "Enter the garden →" link, a line like `● last wrote: 47 days ago` should appear in small monospace text. If `gardenPosts.json` is empty, the line is absent — no broken UI.

- [ ] **Step 6: Commit**

```bash
git add eleventy.config.js src/_includes/garden-section.njk src/assets/css/components.css _data/gardenPosts.json
git commit -m "design: add garden last-active signal to homepage"
```

---

### Task 7: Keyboard navigation shortcuts

**Context:** Chord-based navigation (vim-style `g h`, `g w`, etc.) and a `?` help overlay. Purely discoverable — no visible hint is shown anywhere on the page. Follows the same IIFE pattern as `theme-toggle.js`. Progressive enhancement: the site is fully functional without it.

The `?` key opens a centered overlay listing all shortcuts. `Esc` closes it. Clicking outside the overlay closes it. No dependencies.

**Files:**
- Create: `src/assets/js/keyboard-nav.js`
- Modify: `src/_includes/base.njk` (add script tag)
- Modify: `src/assets/css/components.css` (add overlay styles)

- [ ] **Step 1: Create `src/assets/js/keyboard-nav.js`**

```javascript
/**
 * Keyboard Navigation — Data Druid shortcuts
 *
 * Chord navigation (g then key):
 *   g h → Home        g w → Writing
 *   g p → Projects    g r → Resume
 *   g n → Now
 *
 * ? → open shortcut help overlay
 * Esc → close overlay
 *
 * Progressive enhancement — site works identically without this script.
 * Ignored when focus is inside any input, textarea, select, or contenteditable.
 */
(function () {
  "use strict";

  var routes = {
    h: "/",
    w: "/writing/",
    p: "/projects/",
    r: "/resume/",
    n: "/now/",
  };

  var chordItems = [
    { chord: "g → h", dest: "Home" },
    { chord: "g → w", dest: "Writing" },
    { chord: "g → p", dest: "Projects" },
    { chord: "g → r", dest: "Resume" },
    { chord: "g → n", dest: "Now" },
  ];

  var waitingForSecond = false;
  var chordTimeout = null;
  var overlay = null;

  /* ── Overlay ──────────────────────────────────────────────────────────── */

  function buildOverlayHTML() {
    var rows = chordItems
      .map(function (item) {
        return (
          '<div class="kbd-shortcut-item">' +
          "<dt><kbd>" + item.chord + "</kbd></dt>" +
          "<dd>" + item.dest + "</dd>" +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="kbd-overlay-inner" role="document">' +
      '<h2 class="kbd-overlay-title">Keyboard shortcuts</h2>' +
      '<dl class="kbd-shortcut-list">' + rows + "</dl>" +
      '<p class="kbd-overlay-meta"><kbd>?</kbd> to toggle &nbsp;·&nbsp; <kbd>Esc</kbd> to close</p>' +
      "</div>"
    );
  }

  function openOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "kbd-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Keyboard shortcuts");
    overlay.innerHTML = buildOverlayHTML();
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeOverlay();
    });
    document.body.appendChild(overlay);
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
  }

  /* ── Key handler ──────────────────────────────────────────────────────── */

  function isTyping(target) {
    return target.matches("input, textarea, select, [contenteditable]");
  }

  document.addEventListener("keydown", function (e) {
    if (isTyping(e.target)) return;

    // Esc — close overlay
    if (e.key === "Escape") {
      closeOverlay();
      waitingForSecond = false;
      if (chordTimeout) clearTimeout(chordTimeout);
      return;
    }

    // ? — toggle overlay
    if (e.key === "?" && !waitingForSecond) {
      e.preventDefault();
      if (overlay) {
        closeOverlay();
      } else {
        openOverlay();
      }
      return;
    }

    // g — start chord, wait for second key (1.5s window)
    if (e.key === "g" && !waitingForSecond) {
      waitingForSecond = true;
      chordTimeout = setTimeout(function () {
        waitingForSecond = false;
      }, 1500);
      return;
    }

    // Second key of chord
    if (waitingForSecond) {
      waitingForSecond = false;
      if (chordTimeout) clearTimeout(chordTimeout);
      var dest = routes[e.key];
      if (dest) {
        e.preventDefault();
        window.location.href = dest;
      }
    }
  });
})();
```

- [ ] **Step 2: Add script tag to `base.njk`**

In `src/_includes/base.njk`, add the keyboard-nav script after the theme-toggle script:

```html
  <script src="/assets/js/theme-toggle.js" defer></script>
  <script src="/assets/js/keyboard-nav.js" defer></script>
</body>
```

- [ ] **Step 3: Add overlay CSS to `components.css`**

Append to `src/assets/css/components.css`:

```css
/* ── Keyboard shortcuts overlay ─────────────────────────────────────────── */
.kbd-overlay {
  position: fixed;
  inset: 0;
  background: color-mix(in oklab, var(--bg) 80%, transparent);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--pad);
}

.kbd-overlay-inner {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-xl);
  max-width: 340px;
  width: 100%;
  box-shadow: 0 4px 24px color-mix(in oklab, var(--fg) 12%, transparent);
}

.kbd-overlay-title {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--accent);
  margin-top: 0;
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.kbd-shortcut-list {
  margin: 0 0 var(--space-md) 0;
  padding: 0;
}

.kbd-shortcut-item {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border);
}

.kbd-shortcut-item:last-child {
  border-bottom: none;
}

.kbd-shortcut-item dt {
  min-width: 5.5rem;
  flex-shrink: 0;
}

.kbd-shortcut-item dd {
  color: var(--muted);
  font-size: var(--text-sm);
  margin: 0;
}

kbd {
  font-family: var(--font-code);
  font-size: var(--text-xs);
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.1em 0.45em;
  color: var(--accent);
}

.kbd-overlay-meta {
  font-size: var(--text-xs);
  color: var(--muted);
  text-align: center;
  margin-bottom: 0;
}
```

- [ ] **Step 4: Verify in browser**

Open any page. With focus NOT in any input field:

1. Press `?` — the overlay should appear, centered, listing all five `g →` shortcuts.
2. Press `Esc` — the overlay closes.
3. Press `?` again, then click outside the inner box — overlay closes.
4. Press `g` then `h` within 1.5 seconds — navigate to Home.
5. Press `g` then `w` — navigate to Writing.
6. Press `g` then `p` — navigate to Projects.
7. Press `g` then `r` — navigate to Resume.
8. Press `g` then `n` — navigate to Now.
9. Click into the search field (if any) or any input — shortcuts should NOT fire.
10. Check that typing `g` normally in an `<input>` is unaffected.
11. Test on mobile: keyboard shortcuts simply don't trigger (no touch keyboard causes issues).

- [ ] **Step 5: Commit**

```bash
git add src/assets/js/keyboard-nav.js src/_includes/base.njk src/assets/css/components.css
git commit -m "feat: add keyboard navigation shortcuts with ? help overlay"
```

---

---

### Task 8: Memento mori site mark

**Context:** The current `monogram.svg` is a generic pixel "S". The replacement is a pixel-art skull with a small leaf sprout growing from the crown — a memento mori with a Data Druid treatment. The sprout signals that death is part of a cycle, not an ending. Uses `currentColor` so it adapts to both light and dark modes. Rendered at 24×24px in the header.

**Design:** 32×32 SVG viewBox. Skull is 16px wide (x=8–24), roughly 19px tall (y=7–26). Leaf sprout occupies y=2–7 above the crown. Two 4px eye socket voids, a 6px nasal cavity, three pixel teeth. The leaf uses `opacity: 0.65` — slightly translucent against the skull, suggesting growth rather than decoration.

**Files:**
- Replace: `src/assets/img/pixel/monogram.svg`

- [ ] **Step 1: Replace `monogram.svg` with the skull**

Replace the entire file content with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!--
    Pixel art memento mori — Data Druid treatment.
    A skull with a leaf sprout growing from the crown.
    Uses currentColor to adapt to light/dark themes.
  -->
  <style>
    .s { fill: currentColor; }
    .g { fill: currentColor; opacity: 0.65; }
  </style>

  <!-- Leaf sprout (life emerging from the crown) -->
  <rect class="g" x="15" y="2"  width="2" height="5"/><!-- stem -->
  <rect class="g" x="10" y="3"  width="5" height="2"/><!-- left leaf -->
  <rect class="g" x="17" y="3"  width="5" height="2"/><!-- right leaf -->
  <rect class="g" x="9"  y="4"  width="2" height="2"/><!-- left leaf tip -->
  <rect class="g" x="21" y="4"  width="2" height="2"/><!-- right leaf tip -->

  <!-- Skull dome -->
  <rect class="s" x="12" y="7"  width="8"  height="2"/>
  <rect class="s" x="10" y="9"  width="12" height="2"/>
  <rect class="s" x="8"  y="11" width="16" height="2"/>

  <!-- Brow (full width) -->
  <rect class="s" x="8"  y="13" width="16" height="2"/>

  <!-- Eye socket row: left cheek | void (left eye) | nose bridge | void (right eye) | right cheek -->
  <rect class="s" x="8"  y="15" width="3"  height="4"/><!-- left cheek  -->
  <rect class="s" x="15" y="15" width="2"  height="4"/><!-- nose bridge -->
  <rect class="s" x="21" y="15" width="3"  height="4"/><!-- right cheek -->

  <!-- Cheekbone (full width) -->
  <rect class="s" x="8"  y="19" width="16" height="2"/>

  <!-- Nasal cavity row: left jaw | void (nose) | right jaw -->
  <rect class="s" x="8"  y="21" width="5"  height="2"/><!-- left jaw  -->
  <rect class="s" x="19" y="21" width="5"  height="2"/><!-- right jaw -->

  <!-- Three teeth -->
  <rect class="s" x="9"  y="23" width="4"  height="3"/><!-- tooth L -->
  <rect class="s" x="14" y="23" width="4"  height="3"/><!-- tooth C -->
  <rect class="s" x="19" y="23" width="4"  height="3"/><!-- tooth R -->
</svg>
```

- [ ] **Step 2: Verify in browser**

Reload any page. The site mark in the header should show a small pixel skull with a forked leaf sprout at the crown, beside the text "Seb". Check both light mode (skull renders in near-black) and dark mode (skull renders in warm cream). Verify it reads clearly at the rendered 24×24px size — the eye sockets, nose cavity, teeth, and sprout should all be distinguishable.

If the skull feels too heavy or too light, adjust the `.s` opacity (currently implicit 1.0) downward, or bump `.g` for the leaf.

- [ ] **Step 3: Commit**

```bash
git add src/assets/img/pixel/monogram.svg
git commit -m "design: replace S monogram with memento mori skull + leaf sprout"
```

---

## Final verification checklist

After all tasks are complete, run a full build and verify:

```bash
npm run build
```

- [ ] No build errors
- [ ] Background texture visible on home, writing, resume pages (both themes)
- [ ] Moss dividers appear between sections on homepage
- [ ] Blinking cursor on hero h1 (light + dark mode)
- [ ] Pulse dot on Now nav link
- [ ] Page cross-fade on navigation (Chrome/Safari)
- [ ] Garden last-active line appears if gardenPosts.json is populated; absent if empty
- [ ] `?` overlay opens, all five shortcuts navigate correctly
- [ ] No horizontal overflow at 375px
- [ ] `prefers-reduced-motion: reduce` disables all animations (cursor, pulse dot)
- [ ] Skull site mark reads clearly at 24px in both light and dark mode

```bash
git tag ui-ux-enhancements-complete
```
