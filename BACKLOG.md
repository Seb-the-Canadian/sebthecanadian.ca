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

### Layout & Visual Design

- [ ] Add a print stylesheet for clean paper output
- [ ] Improve spacing and rhythm between sections on the homepage
- [ ] Consider a subtle accent colour beyond the current link blue
- [ ] Explore a minimal responsive breakpoint for narrow screens (< 400px)

#### Theme: legible but unique site-wide identity

The current design is clean and functional but reads as generic. The goal is to develop a
cohesive visual identity that feels distinctly *this site* while never sacrificing readability.

**Foundation:** All visual identity work is grounded in [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) —
IndieWeb best practices and Ivan Illich's convivial design principles. Refer to that document
when evaluating design choices.

**Aesthetic Direction:** Low-fi, Caves of Qud-inspired, "data Druid" — intentional and philosophical.

This means:
- **Low-fi authenticity** — Raw, unpretentious, human-scale. Not polished corporate design. Embrace simplicity and honest materials (basic HTML/CSS, visible structure).
- **Caves of Qud inspiration** — Terminal aesthetic. Vibrant, intentional color (cyan, magenta, green, amber tones). Monospace accents. Dense information without clutter. Borders and frames as deliberate design elements, not decoration.
- **Data Druid persona** — Nature + technology fusion. Cultivating knowledge like a garden. Mystical relationship with information. Wisdom over mere technicality. Living systems, not mechanical ones.
- **Intentional philosophy** — Every design choice should reflect convivial principles and IndieWeb values. Transparent, understandable, forgivable.

- [ ] Define a purposeful colour palette — purples/lavenders and greens/sages as signature colors. Test specific hex values (#b19cd9, #9b7fd6, #8fbc8f, #7ba98a) for contrast ratios and visual harmony in both light and dark modes
- [ ] Replace the bordered-box-per-section pattern with a layout that has more visual flow — consider dropping the border on `header`/`main`/`footer` in favour of whitespace, subtle dividers, or a single page-level container
- [ ] Introduce a distinctive typographic pairing — a character-rich heading face alongside a highly legible body face (or a single variable font used at contrasting weights)
- [ ] Rework the heading hierarchy so each level is visually distinct (h2 currently blends with body text at 1.1rem; h1 → h2 → h3 should have clear, rhythmic steps)
- [ ] Add texture or personality to the page without heavy assets — consider CSS-only details like a coloured top-bar, a subtle gradient on the header, or a monogram/wordmark in place of plain text
- [ ] Give links a site-specific treatment — e.g., a custom underline style, colour shift on hover, or a subtle highlight rather than the browser-default visited purple
- [ ] Design the dark theme as a first-class variant, not just an inversion — use deep charcoal (#1a1a1a) or near-black (#0d0d0d) backgrounds with lavender and sage accents that glow like bioluminescence. Tint grays with subtle purple or green hues.
- [ ] Audit the card/section `color-mix` backgrounds — the current 92/8 mix is barely perceptible; decide whether to make the layering more visible or remove it for simplicity
- [ ] Consider a signature micro-interaction (e.g., a smooth nav highlight transition, a gentle fade-in on page load) that adds character without requiring JS
- [ ] Create a simple visual style guide (even a comment block in `site.css`) documenting the chosen palette, type scale, and spacing tokens so future changes stay cohesive

**Translating "Data Druid" Aesthetic into Design:**

*Color Palette:*
- **Primary palette: purples/lavenders and greens/sages** — mystical garden, Data Druid aesthetic
- Lavender spectrum: #b19cd9 (soft), #9b7fd6 (medium), #7c5fcf (vibrant), #d4c5f9 (pale)
- Sage/green spectrum: #8fbc8f (sage), #7ba98a (muted green), #5dd39e (vibrant), #c9e4ca (pale)
- These colors reference actual herbs (lavender + sage) = botanical wisdom
- Dark mode as primary: deep charcoal (#1a1a1a) or near-black (#0d0d0d), not gray
- Light mode: warm off-white (cream #faf8f3, parchment #f5f1e8) not stark white — "paper and ink" feel
- Accent colors should feel luminous against dark backgrounds, like bioluminescent growth
- Color semantics: links = lavender, success/growth = sage, emphasis = brighter purple, metadata = muted green

*Typography:*
- **Use Atkinson Hyperlegible or similar modern accessible typeface** (accessibility > aesthetic vibe)
- Atkinson: designed by Braille Institute for low vision readers, distinctive letterforms prevent confusion
- Alternatives: Public Sans, Inter, or accessible system fonts
- **NO monospace** - terminal aesthetic comes from colors, borders, structure instead
- Optimize for maximum readability: crisp rendering, clear hierarchy
- Consider ASCII art elements or simple box-drawing characters (─ │ ┌ ┐ └ ┘) for section dividers (sparingly)

*Layout & Structure:*
- Bordered sections are good actually — lean into frames, panels, "terminal windows"
- **Use double borders** (`outline` + `border`) for depth and layered terminal window effect
- Dense information is okay: don't over-pad. Embrace information richness.
- Use whitespace intentionally but don't fear content
- 3px colored top bar (lavender or sage, or gradient blend) as signature element

*Details & Texture:*
- **Subtle CSS scanlines** for CRT effect (2-5% opacity, must respect `prefers-reduced-motion`)
- Box shadows in lavender/sage for bioluminescent glow (soft, diffused)
- Manual dark/light mode toggle with localStorage persistence
- Consider `::before`/`::after` pseudo-elements for brackets, arrows, or sigils (sparingly)
- Status indicators could use terminal-style symbols: ● ○ ◆ ◇ ► ▼ ✓ ✗

*Micro-interactions:*
- Links could glow on hover (text-shadow or box-shadow in accent color)
- Smooth color transitions but instant layout changes (honor terminal snappiness)
- Focus states: bold border or background in accent color
- Skip animations for users with `prefers-reduced-motion`

### Typography

- [ ] Implement Atkinson Hyperlegible (or Public Sans/Inter as fallback) for accessibility-first approach
- [ ] Tune heading scale — h2 at 1.1rem feels close to body text (URGENT: fix to 1.6rem)

### Navigation & Wayfinding

- [ ] Add breadcrumb or "you are here" cue beyond `aria-current`
- [ ] Consider a footer nav or "back to top" link on longer pages
- [ ] Evaluate whether the external Garden link needs a visual differentiator (icon, external-link indicator)

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

#### Resume / CV section

**[MOVED TO PLANNED]** — See "CV/Resume Page" in the Planned section above.

~~A living, web-native résumé that stays current without manual re-exports.~~ It should feel
like a natural part of the site (not a bolted-on PDF viewer) and remain easy to maintain as
a single source of truth.

- [ ] Create a `/resume` page using semantic HTML (`<article>`, `<section>`, `<dl>`, `<time>`) — structure it so the markup itself is meaningful without styling
- [ ] Design the page layout to read well on screen while honouring the site's visual identity — clear section breaks for experience, education, skills, and projects
- [ ] Add a print stylesheet (or extend the site-wide one) so `Ctrl+P` produces a clean, single-column, recruiter-friendly PDF — hide nav, footer, and non-essential decoration
- [ ] Use the `h-resume` microformat (or the closest IndieWeb equivalent) so the page is machine-parseable by IndieWeb tools and aggregators
- [ ] Keep content data-driven — consider a small JSON or YAML data file as the single source that the HTML references, making updates a one-file edit rather than surgery on markup
- [ ] Add a visible "Download PDF" link that either points to a static export or triggers `window.print()` — keep the workflow zero-dependency
- [ ] Include `dt-start` / `dt-end` on roles so timelines are explicit in markup and print
- [ ] Decide on a level of detail — full history vs. curated highlights — and document the editorial rule in Process Notes so future updates stay consistent
- [ ] Link the résumé from the homepage h-card and the primary nav (or a secondary nav) so it's discoverable without being intrusive
- [ ] Plan a lightweight update cadence — e.g., review quarterly — and note it in Process Notes so the page doesn't go stale

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
- Design changes should honour the principles documented in [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md): minimal, durable, portable, accessible, autonomous, transparent, human-scale, and sustainable.
- All decisions should pass the Convivial Test, IndieWeb Test, Sustainability Test, and Accessibility Test outlined in DESIGN_PRINCIPLES.md.
- When an item is finished, log it in CHANGELOG.md under the appropriate date and remove it from this file.
- Bugs and regressions go in the **Bugs / Issues** section with a short description and reproduction steps if applicable.
