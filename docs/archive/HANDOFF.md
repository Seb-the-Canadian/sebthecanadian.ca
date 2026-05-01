> **ARCHIVED — describes the pre-Eleventy build (pre-2026-03-10). Kept for provenance; do not treat as current guidance.**

# Handoff Document — sebthecanadian.ca Redesign

**Date:** 2026-03-09
**Status:** COMPLETE — Build executed 2026-03-10. 15/15 deliverables done. See CHANGELOG.md.
**Companion document:** `DESIGN_BRIEF.md` (approved)

---

## Cowork Task List

Tasks to execute in this session, in order. Each produces a named output.

### 1. Update BACKLOG.md
Promote relevant items from Ideas to Planned. Archive items now covered by the Design Brief. Add new items (RSS generator, POSSE pipeline, Eleventy migration). Mark the backlog as reflecting current sprint state.
**Output:** Updated `BACKLOG.md`

### 2. Update CHANGELOG.md
Add an `[Unreleased]` entry documenting the design sprint: approved brief, stack decision (Eleventy), aesthetic direction (Data Druid), POSSE architecture decision.
**Output:** Updated `CHANGELOG.md`

### 3. Update README.md
Rewrite to reflect the new stack (Eleventy), build commands, project structure, and design direction. Remove "non-goal: no build tooling" since that constraint is lifted.
**Output:** Updated `README.md`

### 4. Create POSSE post template
Write a sample markdown file showing the front matter structure for syndicated posts (`src/writing/` convention). Fields: title, date, excerpt, gardenUrl, blueskyUrl, tags.
**Output:** `POSSE_POST_TEMPLATE.md` at project root (reference for Claude Code)

### 5. Create resume data scaffold
Write a YAML template for resume data (`_data/resume.yml` convention) with the structure: experience[], education[], skills[], projects[]. Seb provides content later; the scaffold defines the shape.
**Output:** `RESUME_TEMPLATE.yml` at project root (reference for Claude Code)

### 6. Verify all outputs
Confirm DESIGN_BRIEF.md, HANDOFF.md, BACKLOG.md, CHANGELOG.md, README.md, templates are saved and consistent. Verify no contradictions between documents.

---

## Claude Code Brief

*This section is designed to be pasted directly into Claude Code with zero additional context needed.*

---

### Project: sebthecanadian.ca — Full Redesign

You are rebuilding sebthecanadian.ca from a hand-written static HTML site into an Eleventy-powered personal site with the "Data Druid" aesthetic (Caves of Qud meets iOS — pixel textures and retro-organic elements on a clean modern shell).

### Current State

The site is 4 HTML pages (index, posts, now, colophon) + 1 CSS file (assets/site.css, ~160 lines) deployed to GitHub Pages from `main` branch root. No build step, no JavaScript, no package.json. Custom domain via Cloudflare DNS, HTTPS via GitHub Pages.

**What exists and works:**
- Semantic HTML with microformats (h-card, h-entry, dt-published, rel=me)
- Dark mode via `prefers-color-scheme` with CSS custom properties
- Webmention discovery links + GitHub Action for outbound webmentions (Telegraph API)
- Accessibility: skip links, aria-current, focus-visible styles
- 1 blog post: "Hello, IndieWeb"
- Profile image: `assets/seb-stamp.jpeg` (640×640 illustrated portrait)
- Favicon: `assets/favicon.svg` (geometric monogram)

**What's being built:**
- Full personal site: Home, Projects, Writing, Resume, Now, Colophon, Uses, Links
- Eleventy (11ty) static site generator with Nunjucks templates
- Data Druid visual identity (forest palette, IBM Plex Mono headings, pixel-art accents)
- POSSE writing system (garden RSS → Eleventy → excerpt cards)
- Data-driven resume from YAML
- Progressive enhancement JS (theme toggle, transitions)
- GitHub Actions build → GitHub Pages deployment

### Repository Location

```
sebthecanadian.ca/
├── index.html          # Current homepage (h-card, profile links)
├── posts.html          # Current posts page (1 h-entry)
├── now.html            # Current /now page
├── colophon.html       # Current colophon
├── assets/
│   ├── site.css        # Current stylesheet (~160 lines, CSS custom props)
│   ├── seb-stamp.jpeg  # Profile illustration (640×640)
│   └── favicon.svg     # Monogram favicon
├── .github/workflows/
│   └── webmention.yml  # Telegraph webmention sender (push to main trigger)
├── DESIGN_BRIEF.md     # ← READ THIS FIRST. Full aesthetic spec, page map, decisions.
├── HANDOFF.md          # This document
├── BACKLOG.md          # Feature roadmap (updated to reflect sprint)
├── CHANGELOG.md        # Version history
├── README.md           # Project overview (updated for Eleventy)
├── POSSE_POST_TEMPLATE.md  # Front matter structure for syndicated posts
└── RESUME_TEMPLATE.yml     # YAML shape for resume data
```

### Aesthetic Direction: Data Druid

**Read DESIGN_BRIEF.md for the full spec.** Summary:

**Color palette (CSS custom properties):**

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#f5f2eb` (warm parchment) | `#0f1a14` (deep forest) |
| `--fg` | `#1a1a1a` | `#e8e4dc` |
| `--muted` | `#6b6459` | `#8a8477` |
| `--accent` | `#4a8c6f` (forest green) | `#6bb896` |
| `--accent-secondary` | `#e9d66b` (amber) | `#d4c15a` |
| `--border` | `#d4cfc5` | `#2a3a30` |
| `--link` | `#2a6b4a` | `#8eba9e` |
| `--visited` | `#5e4b3e` | `#b89c84` |
| `--code-bg` | `#ebe7df` | `#162018` |

**Typography:**
- Headings + code: **IBM Plex Mono** (Google Fonts, weights 400/600/700)
- Body: System font stack
- Scale: Clear rhythmic steps; current h2 at 1.1rem is a known problem — fix it

**Pixel art layer (visible identity, not wallpaper):**
- Section dividers: Pixel-art SVG horizontal rules (forest-floor/moss textures)
- Icons: 16-32px pixel icons for nav, project badges, section markers
- Hover/focus: Pixel-style glow or outline on interactives
- Header mark: Pixel monogram or small illustrated element
- Background: Very subtle repeating texture (10-15% opacity)
- Project cards: Pixel-style status badges (active / beta / archived)
- Dark mode: "Forest at night" — distinct mood, not mechanical inversion

**AI-generate pixel assets** during the build using image generation tools. Create custom icons, dividers, textures, and monogram that fit the forest palette.

**What this is NOT:** Not a game UI. Not maximalist. Whitespace is primary, texture is secondary. Professional and readable first; retro-organic second.

### Target Architecture

```
sebthecanadian.ca/
├── src/
│   ├── index.njk                    # Homepage
│   ├── projects.njk                 # Projects page
│   ├── writing.njk                  # POSSE syndication hub
│   ├── resume.njk                   # Data-driven from _data/resume.yml
│   ├── now.md                       # /now page (markdown)
│   ├── colophon.md                  # Colophon (markdown)
│   ├── uses.md                      # /uses page (markdown)
│   ├── links.md                     # Blogroll/links (markdown)
│   ├── 404.md                       # Custom 404
│   ├── writing/                     # Blog posts (markdown with front matter)
│   │   ├── hello-indieweb.md        # Migrated native post
│   │   └── ...                      # Future POSSE excerpts
│   ├── _includes/
│   │   ├── base.njk                 # Base HTML layout (head, skip link, header, main, footer)
│   │   ├── nav.njk                  # Primary navigation partial
│   │   ├── footer.njk               # Footer partial
│   │   ├── project-card.njk         # Reusable project card component
│   │   ├── post-card.njk            # Reusable post excerpt card (POSSE)
│   │   └── garden-section.njk       # Home page garden feature section
│   └── assets/
│       ├── css/
│       │   ├── tokens.css           # Design tokens (colors, typography, spacing)
│       │   ├── base.css             # Reset, typography, layout
│       │   ├── components.css       # Cards, badges, dividers
│       │   ├── utilities.css        # Skip link, screen-reader-only, etc.
│       │   └── print.css            # Print stylesheet (resume, general)
│       ├── fonts/                   # IBM Plex Mono (self-hosted for performance)
│       ├── img/
│       │   ├── seb-stamp.jpeg       # Profile illustration
│       │   ├── favicon.svg          # Monogram favicon
│       │   ├── favicon.png          # PNG fallback
│       │   └── pixel/               # AI-generated pixel art assets
│       │       ├── icons/           # Nav icons, status badges
│       │       ├── dividers/        # Section divider SVGs
│       │       ├── monogram.svg     # Header mark
│       │       └── textures/        # Background patterns
│       └── js/
│           ├── theme-toggle.js      # Dark/light mode toggle (progressive enhancement)
│           └── transitions.js       # Page transition / scroll reveal effects
├── _data/
│   ├── site.json                    # Site metadata (title, url, description, author)
│   ├── navigation.json              # Nav links (primary + secondary)
│   ├── projects.json                # Project data (name, description, status, url)
│   ├── profiles.json                # Profile links (GitHub, Bluesky, ORCID, etc.)
│   └── resume.yml                   # Resume data (experience, education, skills)
├── .eleventy.js                     # Eleventy config
├── package.json
├── .github/workflows/
│   ├── build-deploy.yml             # Eleventy build → GitHub Pages
│   └── webmention.yml               # Existing webmention sender (update paths)
└── [project docs: DESIGN_BRIEF.md, HANDOFF.md, BACKLOG.md, etc.]
```

### Page Specifications

#### Home (`/`)
- Hero: name, tagline, `seb-stamp.jpeg` portrait
- Intro paragraph (who, what, why)
- **The Garden** — Prominent section: description + visual treatment + link to cognitivearchitecture.ca. Flagship feature, not a footnote.
- Featured project card (CivCitDev / Ontario Tenant Tools)
- Latest syndicated post preview
- Profile links (GitHub, Bluesky, ORCID, Garden)
- h-card microformat preserved throughout

#### Projects (`/projects/`)
- CivCitDev program overview
- Reusable project cards: name, one-liner, pixel-style status badge, link
- First project: Ontario Tenant Tools
- `rel="me"` on owned project URLs
- Data-driven from `_data/projects.json`

#### Writing (`/writing/`)
- **POSSE syndication hub.** Posts originate in the garden, syndicated here as excerpts.
- Each post card: title, date, excerpt, "read more" link to garden, `u-syndication` markup
- Syndication targets per-post: Bluesky link (optional front matter field), future platforms
- Intro text explaining the POSSE relationship
- h-feed wrapper, dt-published on all entries
- RSS/Atom feed auto-generated (Eleventy RSS plugin)
- "Hello, IndieWeb" migrated as a native post (not syndicated)

**POSSE post front matter structure:**
```yaml
---
title: "Post Title"
date: 2026-03-09
excerpt: "A brief summary of the post for the card display."
gardenUrl: "https://cognitivearchitecture.ca/post-slug"
blueskyUrl: "https://bsky.app/profile/seb/post/xxx"  # optional
tags:
  - tag1
  - tag2
syndicated: true  # false for native posts like "Hello, IndieWeb"
---
```

#### Resume (`/resume/`)
- Data-driven from `_data/resume.yml`
- Semantic HTML: article, section, dl, time
- h-resume microformat
- dt-start / dt-end on roles
- Print stylesheet for clean Ctrl+P PDF output
- "Download PDF" link (triggers `window.print()`)

#### Now (`/now/`)
- Migrated from current now.html
- Markdown content page

#### Colophon (`/colophon/`)
- Updated to reflect Eleventy stack
- Markdown content page

#### Uses (`/uses/`), Links (`/links/`)
- New content pages, markdown
- Uses: tools/hardware/software by category
- Links: blogroll, annotated

#### 404
- Custom styled, on-brand with Data Druid aesthetic

### POSSE Pipeline Architecture

**v1 (build in this sprint):**
1. **COG-270: Garden RSS generator** — Standalone script that scrapes cognitivearchitecture.ca (Obsidian Publish) and produces a valid Atom feed. Obsidian Publish has no native RSS. This tool bridges the gap. Can run as a GitHub Action on a cron schedule or as a pre-build step.
2. **COG-267: Eleventy data pipeline** — Fetches the generated Atom feed at build time → renders excerpt cards. Falls back to manual POSSE markdown files if feed unavailable.
3. **COG-255: Writing templates** — Post card component, h-feed wrapper, RSS/Atom output. Template handles both syndicated and native posts.
4. Manual POSSE markdown fallback retained — posts can always be created as markdown files in `src/writing/` with POSSE front matter.

**Deferred (future):**
- Bluesky automation via Bridgy Fed or AT Protocol GitHub Action
- Automated rebuild on garden publish (webhook trigger)

### Build & Deployment

**Stack:**
- Eleventy 3.x (latest stable)
- Nunjucks templates
- Vanilla CSS (no preprocessor, no Tailwind)
- Progressive enhancement JS (zero JS in critical path)

**Build command:** `npx @11ty/eleventy`
**Dev command:** `npx @11ty/eleventy --serve`

**Deployment:** GitHub Actions workflow:
1. Trigger on push to `main`
2. `npm ci` → `npx @11ty/eleventy`
3. Deploy `_site/` to GitHub Pages (gh-pages branch or Pages action)
4. Existing Cloudflare DNS config unchanged

**Constraints:**
- Free hosting (GitHub Pages). No paid services.
- Zero client-side JS in critical rendering path. Theme toggle and transitions are progressive enhancement.
- All microformat markup (h-card, h-entry, h-feed, h-resume) must be preserved or expanded, never removed.
- Webmention workflow must continue to work — update source URLs if output paths change.
- Site must work without JavaScript entirely.

### Existing Code to Preserve or Migrate

| Current File | Action | Notes |
|-------------|--------|-------|
| `index.html` | **Migrate** | Content → `src/index.njk`. h-card markup preserved. Profile links → `_data/profiles.json`. |
| `posts.html` | **Replace** | Becomes `src/writing.njk` + collection from `src/writing/*.md`. h-feed wrapper added. |
| `now.html` | **Migrate** | Content → `src/now.md`. Frontmatter for layout. |
| `colophon.html` | **Migrate** | Content → `src/colophon.md`. Update text to reflect new stack. |
| `assets/site.css` | **Refactor** | Split into `tokens.css`, `base.css`, `components.css`, `utilities.css`, `print.css`. Preserve all current working styles as starting point; layer new design tokens on top. |
| `assets/seb-stamp.jpeg` | **Keep** | Move to `src/assets/img/seb-stamp.jpeg`. |
| `assets/favicon.svg` | **Keep** | Move to `src/assets/img/favicon.svg`. Add PNG fallback. |
| `.github/workflows/webmention.yml` | **Update** | Change source URLs if output paths differ. Keep Telegraph integration. |
| `CNAME` | **Keep** | Ensure it's in the output directory or handled by GitHub Pages config. |

### Definition of Done

Each deliverable is "done" when:

1. **Eleventy scaffold** — `npm install && npx @11ty/eleventy` runs clean. Dev server works. Output mirrors expected page structure.
2. **Design token system** — All palette colors, typography, spacing defined as CSS custom properties. Light and dark mode tokens present. Matches DESIGN_BRIEF.md spec exactly.
3. **Base layout** — Header (pixel monogram + nav), footer, skip link, responsive shell. All pages inherit this layout. Matches on mobile and desktop.
4. **Home page** — Hero, intro, Garden section, featured project, latest post, profile links. h-card microformat intact.
5. **Projects page** — At least 1 project card rendered from data. Status badge visible. Card component is reusable.
6. **Writing page** — POSSE architecture working (RSS pull or manual markdown). "Hello, IndieWeb" migrated. h-feed wrapper. RSS/Atom feed generated.
7. **Resume page** — Renders from YAML data. h-resume microformat. Print stylesheet produces clean PDF via Ctrl+P.
8. **Content pages** — Now, Colophon (updated), Uses, Links all render with base layout.
9. **Pixel art assets** — AI-generated icons, dividers, monogram, and background texture. Integrated into layouts and components.
10. **Interactions** — Theme toggle (light/dark/system), optional page transitions or scroll effects. All degrade gracefully without JS.
11. **Dark mode** — "Forest at night" aesthetic. Not an inversion — a distinct mood with deep greens, warm shadows, amber highlights.
12. **Accessibility** — WCAG AA contrast on all text. Skip links on every page. Screen reader tested. Alt text on all images.
13. **404 page** — Custom styled, on-brand.
14. **Deployment** — GitHub Actions builds and deploys to GitHub Pages. Site loads at sebthecanadian.ca with HTTPS. Cloudflare DNS unchanged.
15. **Webmentions** — Existing Telegraph workflow updated and functional with new URL structure.

### Build Priority Order

```
1. Eleventy scaffold + config + package.json
2. Design tokens (CSS custom properties)
3. Base layout + nav + footer
4. Home page
5. Project cards component + Projects page
6. Writing system (POSSE templates, RSS feed, post cards)
7. Resume page (YAML data → template → print CSS)
8. Now, Colophon, Uses, Links pages
9. Pixel art asset generation + integration
10. Theme toggle + interactions
11. Dark mode refinement
12. Accessibility audit
13. 404 page
14. GitHub Actions build → deploy workflow
15. Webmention workflow update
```

---

## Open Questions for Implementation

1. **Obsidian Publish RSS:** Check `cognitivearchitecture.ca/rss.xml` at build time. If it exists, use it as data source. If not, fall back to manual POSSE markdown files. Build the template to handle both.
2. **CNAME handling:** Ensure `CNAME` file with `sebthecanadian.ca` ends up in the Eleventy output directory. Can be done via Eleventy passthrough copy or placed in `src/` root.
3. **Font hosting:** Self-host IBM Plex Mono vs. Google Fonts CDN. Self-hosting is better for privacy and performance. Download WOFF2 files and serve from `src/assets/fonts/`.

---

*This handoff is complete. The Claude Code Brief above contains everything needed to build the site with zero additional context. The Cowork task list above contains everything that should be done in this session before handing off.*
