# Design & Implementation Brief — sebthecanadian.ca

**Status:** APPROVED — Signed off 2026-03-09 · **Superseded in part by pitch-v1 (2026-05)**
**Date:** 2026-03-09
**Author:** Design Sprint Session (Phase 2 output)

> **Historical note (2026-07):** This brief is preserved as the original
> signed-off contract. The pitch-v1 sprint (May 2026, PRs #11–14) revised
> parts of it: the body is now fully monospace (IBM Plex Mono, self-hosted —
> not Google Fonts, not a system stack), primary nav is four doors
> (Home · Writing · Projects · Resume; Now folded into the home page,
> Colophon into About), and the home is a terminal-style index table.
> Where this document and the built site disagree, the site is correct.
> See `docs/pitch-v1-migration-plan.md` and CHANGELOG 2026-05-02.
>
> **Identity-system rule (resolved 2026-07, design-v2):** the woodcut
> stamp is the human-scale mark (About, Resume); the pixel dialect is the
> system-scale mark — a pixel conifer at the favicon/touch-icon/OG mark,
> pixel portrait on 404. The interim maple leaf (PR #16) and the original
> "pixel portrait as favicon" spec are both superseded: tree, not
> portrait, at system scale. See `docs/design-fusion-plan.md` Move 05
> and `docs/implementation-plan-design-v2.md`.

---

## Site Purpose and Intended Experience

sebthecanadian.ca is a **personal site** — not just a front door, but a place that houses real content: projects, writing, a resume, and tools for visitors to understand who Seb is and what he builds.

The site should feel like arriving at someone's workspace. Not sterile, not chaotic — intentional. A visitor should walk away understanding three things: what Seb works on (civic technology, knowledge architecture), how he thinks (systems-minded, craft-oriented), and how to reach him.

The digital garden at cognitivearchitecture.ca is a **prominent sibling** — featured on the home page with its own section, not buried in navigation. Writing originates in the garden and is syndicated to the personal site via POSSE (Publish on your Own Site, Syndicate Elsewhere). The personal site is the identity hub; the garden is the thinking space. Both are first-class.

---

## Aesthetic Direction: Data Druid

**Concept:** Caves of Qud meets iOS — pixel texture and retro-organic elements layered onto a clean, modern shell.

**Intensity:** Visible identity. Pixel-art elements are a recognizable part of the visual language — not wallpaper, not accent. A visitor notices it immediately but the site still reads as a functional, modern personal site.

### Color Palette

Drawn from the digital_forest design system, adapted for web:

| Role | Light Mode | Dark Mode | Notes |
|------|-----------|-----------|-------|
| Background | `#f5f2eb` (warm parchment) | `#0f1a14` (deep forest dark) | Warm, not clinical white or pure black |
| Foreground | `#15201a` | `#e8e4dc` | High contrast, warm undertone |
| Muted | `#6b6459` | `#8a8477` | Earthy neutral for secondary text |
| Primary accent | `#3f7a5f` (forest green) | `#6bb896` | The signature color — carries across both modes |
| Secondary accent | `#b07a0f` (amber/gold) | `#d9b24a` | Warm complement, used sparingly for highlights |
| Border | `#d4cfc5` | `#2a3a30` | Subtle, tinted to match palette |
| Link | `#2a6b4a` (dark green) | `#8eba9e` (light green) | Distinct from body text, on-brand |
| Visited | `#5e4b3e` (earth brown) | `#b89c84` | Warm, not jarring purple |
| Code/mono bg | `#ebe7df` | `#162018` | Slight tint for code blocks |

### Typography

- **Headings:** **IBM Plex Mono** — clean with retro DNA from IBM's design heritage. Feels like a well-maintained research station in a forest. Loaded from Google Fonts (weights 400, 600, 700).
- **Body:** System font stack — highly legible, zero load cost, doesn't compete with the heading character. The body should disappear; the headings carry personality.
- **Code:** IBM Plex Mono at a slightly smaller size. Shared with headings — one font load serves both purposes.
- **Scale:** Clear rhythmic steps — h1 is unmistakably a title, h2 is clearly subordinate, h3 is distinct from body. Current h2 at 1.1rem is a known problem.

### Visual Elements (Pixel Art Layer)

These are the elements that make the Data Druid aesthetic visible:

- **Section dividers:** Pixel-art horizontal rules — subtle forest-floor textures or mossy line patterns, rendered as small SVGs or CSS patterns.
- **Icons:** 16-32px pixel-art icons for navigation items, project status badges, and section markers. Think: pixelated leaf, campfire, scroll, compass.
- **Hover/focus states:** Pixel-style glow or outline effect on interactive elements — something that feels 8-bit without being cartoonish.
- **Header element:** A pixel-art monogram, wordmark, or small illustrated element at the top of the page. Not a full banner — a mark.
- **Background texture:** Very subtle repeating pattern (10-15% opacity) — forest floor, grid paper, or moss texture. Barely perceptible, adds warmth.
- **Project cards:** Status badges rendered in pixel style (active / beta / archived) with small pixel icons.
- **Dark mode:** Not an inversion. The dark theme should feel like the forest at night — deep greens, warm shadows, amber highlights. A distinct mood, not a mechanical swap.

### What This Is NOT

- Not a game UI or novelty site. The pixel elements are accents on a professional, readable layout.
- Not maximalist. Whitespace is primary. Texture is secondary.
- Not retro-for-retro's-sake. The aesthetic should feel intentional and personal, like a custom tool — not like a theme downloaded from a marketplace.

---

## Page Map and Content Hierarchy

### Primary Navigation

```
Home | Projects | Writing | Resume | Now | Colophon
```

Secondary links (footer or sub-nav): Uses, Links/Blogroll, Garden (external), Email, RSS

### Page Specifications

#### Home (`/`)
- Hero section: Name, tagline, portrait (seb-stamp.jpeg)
- Brief intro paragraph (who, what, why)
- **The Garden** — Prominent section with description, visual treatment, and link to cognitivearchitecture.ca. This is a flagship feature, not a footnote.
- Featured project card (CivCitDev / Ontario Tenant Tools)
- Latest syndicated post preview
- Profile links (GitHub, Bluesky, ORCID, Garden)
- h-card microformat preserved

#### Projects (`/projects/`)
- Overview of CivCitDev program
- Project cards with: name, one-line description, status badge (pixel-style), link
- First entry: Ontario Tenant Tools
- Designed to be reusable — new projects slot in without restructuring
- `rel="me"` on owned project URLs

#### Writing (`/writing/` or `/posts/`)
- **POSSE syndication hub** — writing originates in the garden (cognitivearchitecture.ca), syndicated here as excerpts with "read more" links to the garden original
- Each post card: title, date, excerpt, source link, `u-syndication` markup
- h-feed wrapper for IndieWeb, dt-published on all entries
- Introductory text explaining the POSSE relationship: "These posts originate in the garden. Visit the source for the full text."
- **Syndication targets displayed:** Bluesky link (and future platforms) shown per-post where applicable
- RSS/Atom feed auto-generated from syndicated content
- **Build architecture (v1 — manual POSSE):** Syndicated posts are small markdown files in the site repo (`src/writing/`) with front matter containing title, date, excerpt, garden URL, and optional Bluesky URL. Eleventy renders them as excerpt cards. No external data fetch needed. **Future (v2):** When the garden gains an RSS feed, automate the pull at build time.
- Existing "Hello, IndieWeb" post migrated as a native post (not syndicated — it's original to this site)

#### Resume (`/resume/`)
- Semantic HTML (`article`, `section`, `dl`, `time`)
- h-resume microformat
- Sections: Experience, Education, Skills, Projects
- dt-start / dt-end on roles
- Print stylesheet for clean PDF output (`Ctrl+P`)
- "Download PDF" link (triggers window.print())
- Data-driven: content from a YAML/JSON data file, rendered by Eleventy template

#### Now (`/now/`)
- Current focus areas
- What I'm working on, reading, thinking about
- Updated periodically

#### Colophon (`/colophon/`)
- How the site is built (updated to reflect new stack)
- Design philosophy
- IndieWeb conventions used
- Acknowledgments

#### Uses (`/uses/`)
- Tools, hardware, software
- Organized by category

#### Links (`/links/`)
- Blogroll / people and projects worth following
- Categorized or annotated

---

## Component Priorities

Build order based on dependencies and impact:

1. **Eleventy project scaffold** — Directory structure, config, layouts, partials, data files, build pipeline
2. **Design token system** — CSS custom properties implementing the Data Druid palette, typography, spacing
3. **Base layout + navigation** — Header with pixel monogram, primary nav, footer, responsive shell
4. **Home page** — Hero, intro, featured project, latest post, profile links
5. **Project cards component** — Reusable card with status badge, description, link
6. **Projects page** — CivCitDev showcase using project cards
7. **Writing/blog system** — Markdown content, post layout, post list, RSS feed, h-feed
8. **Resume page** — Data-driven from YAML, semantic markup, print stylesheet
9. **Now page** — Simple content migration + new styling
10. **Colophon, Uses, Links** — Content pages using base layout
11. **Pixel art assets** — Icons, dividers, monogram, background textures
12. **Interactions** — Page transitions, scroll reveals, hover effects, theme toggle
13. **Dark mode refinement** — Intentional "forest at night" treatment
14. **Accessibility audit** — Contrast, screen reader testing, skip links on all pages
15. **404 page** — Custom styled, on-brand

---

## Stack Recommendation

| Layer | Choice | Rationale |
|-------|--------|-----------|
| SSG | **Eleventy (11ty)** | Seb's preference. Minimal, data-driven, close to the metal. Excellent for content-heavy personal sites. Mature ecosystem, no lock-in. |
| Styling | **Vanilla CSS with custom properties** | Design token system via CSS variables. No Tailwind, no preprocessor. Keeps the "hand-editable" spirit while supporting the token system. |
| Templating | **Nunjucks** | Eleventy's most capable template language. Layouts, partials, macros for reusable components. |
| Content | **Markdown + YAML front matter** | Blog posts in Markdown. Resume data in YAML. Page metadata in front matter. |
| Fonts | **1 hosted font (heading) + system stack (body)** | Minimize font loading. One characterful monospace for headings, system fonts for body text. |
| Deployment | **GitHub Pages + GitHub Actions** | Free. Eleventy builds in CI, deploys to Pages. No cost, no new infrastructure. Existing Cloudflare DNS config unchanged. |
| JS | **Progressive enhancement** | Zero JS in the critical path. Optional JS for theme toggle, page transitions, scroll effects. Site works fully without it. |

---

## Resolved Decisions

| Question | Decision |
|----------|----------|
| Heading font | **IBM Plex Mono** — clean retro DNA, research station aesthetic |
| Pixel art assets | **AI-generated** during the build session. Custom pixel icons, dividers, monogram, textures created with image generation tools. |
| Blog content / Writing | **POSSE from garden** — writing lives in the garden, syndicated as excerpts. "Hello, IndieWeb" migrates as a native post. No need for additional launch content. |
| Resume content | **Text version available** — Seb will provide when needed. Convert to YAML data structure for Eleventy template. |
| Garden treatment | **Prominent home page section** — The Garden gets dedicated visual treatment on the home page, not just a nav link. |
| POSSE architecture | **Automated POSSE.** A lightweight RSS generator scrapes the Obsidian Publish site and produces an Atom feed. Eleventy pulls this feed at build time → renders excerpt cards. Manual markdown fallback retained for native posts. Bluesky links added manually to front matter for v1. |

## Deferred to Future Phases

1. ~~**Garden RSS feed:**~~ **PROMOTED TO SCOPE.** A lightweight RSS/Atom generator for the Obsidian Publish garden is now part of the build. This unblocks automated POSSE.
2. **Bluesky automation:** Bridgy Fed or AT Protocol integration. Deferred — for v1, Bluesky links are added manually to post front matter.
3. **Automated rebuild triggers:** Cron or webhook-based rebuilds. Can be implemented once the RSS generator and Eleventy data pipeline are working.
4. ~~**Garden RSS → Eleventy data pipeline:**~~ **PROMOTED TO SCOPE.** With the RSS generator in play, the automated pull (garden RSS → Eleventy data → excerpt posts) is now buildable in the same sprint.

## Remaining Open Questions

None. All decisions resolved.

---

*This brief is the contract for what gets built. Nothing outside this scope enters the current sprint. Anything missing from this document is explicitly deferred.*
