# Changelog

Format:
- Dates in ISO format (YYYY-MM-DD)
- Focus on user-visible changes and structural milestones

## 2026-05-01 — Stewardship Pass (Hygiene · Coherence · Depth)

Sixteen-item stewardship pass across four tiers, executed by a team of nine
specialised sub-agents working in tandem. Removes decay, tightens IndieWeb
posture, and adds the next-best refinements that deepen the Data Druid
aesthetic. Plan archived at `/root/.claude/plans/review-the-site-build-greedy-willow.md`.

### Removed (Hygiene)
- **Pre-Eleventy artifacts** — Deleted root `index.html`, `posts.html`, `now.html`, `colophon.html`, `404.html`, and the root `assets/` directory (`site.css`, `theme-toggle.js`, `seb-stamp.jpeg`, `favicon.svg`). The Eleventy build under `src/` has been the source of truth since 2026-03-10; only `src/assets/*`, `CNAME`, and `.nojekyll` are passthrough-copied to the deploy artifact, so deletion has no effect on the deployed site.
- **Stale planning docs** — Moved `IMPLEMENTATION_PLAN.md`, `HANDOFF.md`, `PHASE1_AUDIT.md`, `docs/IMPROVEMENT_AUDIT.md`, `docs/IMPROVEMENT_PLAN.md`, `docs/VALIDATION_REPORT.md` to `docs/archive/`, each prepended with an "ARCHIVED" header so git history is preserved without polluting current signal. README "Project Structure" section updated.

### Fixed (Hygiene)
- **Moss divider didn't theme** — `dividers/moss-divider.svg` hardcoded hex colors and was rendered via `background-image` on `<hr>`; neither path respected the active theme. Replaced with `mask-image` driven by `background-color: var(--accent)`, so the divider sage tracks light/dark tokens. SVG fills converted to `currentColor`.
- **`scroll-behavior: smooth` always-on** — Wrapped in `@media (prefers-reduced-motion: no-preference)` so users with reduced-motion preferences get instant in-page anchor jumps (WCAG 2.3.3).
- **Writing-index duplication risk** — `writing.njk` rendered `collections.writing` and `gardenPosts` as separate sections with no de-dup. A future native post setting `syndicated: true` + `gardenUrl` would have appeared twice. Now skips garden posts whose `url` matches a syndicated native post's `gardenUrl`.

### Changed (Hygiene)
- **Honest sparse resume content** — Replaced `_data/resume.yml` scaffold ("Job Title — Organization Name", "Previous Role") with real-but-minimal content: name, tagline, contact, profiles, and a `currently:` paragraph. `experience`/`education`/`skills`/`projects` keys removed entirely; `resume.njk` now guards each section behind `{% if %}` so the route renders cleanly with sparse data and re-renders the full template the moment those keys are populated.
- **Resume "Download PDF" button class** — Was reusing `class="theme-toggle no-print"` for an unrelated control. Renamed to `button button--print no-print` with a minimal `.button` rule in `components.css`. Theme-toggle class now exclusively identifies the actual theme toggle.
- **`/now/` datestamped** — Added `updated:` frontmatter field and a small `<time class="dt-updated">` line below the heading rendering "Updated *date* · *daysAgo*". The Now page is the canonical "is this still tended" page; the contract is now visible.
- **`/uses/` and `/links/` cleaned** — Removed "*To be filled in.*" placeholder sections.

### Added (Coherence — meta + structure)
- **`<meta name="theme-color">`** — Two media-scoped tags in `base.njk`: parchment `#f5f2eb` for light, forest-night `#0f1a14` for dark. Mobile address-bar tints harmonize with the palette.
- **OpenGraph + Twitter card** — Full set in `base.njk`: `og:title`, `og:description`, `og:url`, `og:type` (article for `/writing/<slug>/`, website elsewhere), `og:image`, `og:site_name`, plus Twitter equivalents. New 1200×630 monogram-on-parchment OG image at `src/assets/img/og.png` (with `og.svg` source). Honors the IndieWeb principle of publishing visible data for humans first, machines second.
- **`/sitemap.xml`** — `src/sitemap.njk` (Nunjucks template iterating `collections.all`) writes `<urlset>` with `loc` + `lastmod`. `<link rel="sitemap">` discovery in `base.njk`.
- **`post.njk` h-entry layout** — Native single-post pages (`/writing/<slug>/`) used `layout: base.njk` directly and contained no `h-entry` wrapper, so webmentions targeting those URLs hit a page without machine-readable post metadata. New layout exposes `p-name`, `dt-published`, `dt-updated`, `e-content`, `p-author` (nested h-card), `u-url` permalink, `p-category` for tags, and `u-syndication` for posts that opt in via `syndicated: true` + `gardenUrl`. `hello-indieweb.md` switched to `layout: post.njk`. Minimal post-page styling appended to `components.css`.

### Added (Depth — IndieWeb upgrades)
- **Tag archives** — `tagList` collection in `eleventy.config.js`, paginated `src/writing/tags.njk` producing `/writing/tags/<tag>/` for each unique tag in the writing collection. "Browse by tag" line on `/writing/` linking to each archive.
- **Discoverable keyboard shortcuts** — Quiet "Press <kbd>?</kbd> for shortcuts · Keyboard reference" hint in the footer (uses `--muted`, `--text-xs`). New `/keyboard/` page documents the chord set so users without JS can still discover the navigation. Linked from `/colophon/`.
- **Per-page "last updated"** — `gitLastModified` Eleventy filter runs `git log -1 --format=%cI` against `page.inputPath`. `footer.njk` renders `<time class="dt-updated">Last updated *date*</time>` when the filter resolves. Falls back gracefully (renders nothing) when git is unavailable, e.g. shallow CI clones. Reinforces the site's "workspace, not showroom" framing.
- **Received webmentions on native posts (interactions only)** — New `scripts/webmentions.js` (graceful-degrade fetch from webmention.io filtered to `in-reply-to` / `like-of` / `repost-of` / `bookmark-of`, grouped by target URL, sorted desc). Wired into `npm run build` alongside garden-sync. `post.njk` renders an `h-cite` list inside a `.webmentions <section>` when the current page has cached mentions, plus a "Send a webmention" prompt link near the post footer. Initial cache `_data/webmentions.json` committed for graceful-degrade on CI fetch failure.

### Architecture notes
- All build-script regenerated data files (`_data/gardenPosts.json`, `_data/webmentions.json`) are committed and survive transient fetch failures via the same graceful-degrade pattern.
- 16 in-scope items shipped (Tier 1–3 of plan); Tier 4 stretch items (Bluesky automation, IndieAuth, font subsetting, image WebP) remain in `BACKLOG.md` as Ideas.

---

## 2026-03-11 — Testing & QA Pass

Comprehensive testing phase covering all 11 pages, responsive design, accessibility, microformats, and CI/CD.

### Fixed
- **Mobile navigation overlap** — Header nav items and site mark collided at 375px. Added `flex-wrap` media query at `max-width: 600px` in `components.css`.
- **Wikilink artifacts in garden excerpts** — `[[Data Fluency]]` wikilink syntax from Obsidian appeared raw in the "Beyond the binary" post excerpt. Added `stripObsidian()` function to `garden-rss.js` that strips `[[...]]` markup from all excerpts.
- **CI build missing garden sync** — `build-deploy.yml` ran `npx @11ty/eleventy` directly, skipping the garden sync pre-build step. Changed to `npm run build` which includes `node scripts/garden-rss.js &&` prefix.

### Verified
- All 11 pages render correctly (Home, Projects, Writing, Resume, Now, Colophon, Uses, Links, 404, hello-indieweb post, feed.xml)
- Theme toggle cycles Light → Dark → System with localStorage persistence
- Self-hosted fonts load from `/assets/fonts/` — zero Google Fonts requests
- PNG + SVG favicons both present in HTML head
- Atom feed valid with correct metadata and hello-indieweb entry
- Garden sync produces 9 posts with clean data (no wikilinks, valid status values)
- IndieWeb microformats: h-card (homepage), h-feed + h-entry (writing), h-resume (resume), rel="me", u-syndication
- Accessibility: `lang="en"`, skip link → `#content` on `<main>`, `aria-current="page"`, focus-visible outlines
- Webmention endpoints present in `<head>`
- Responsive: no horizontal overflow at mobile (375px), tablet (768px), desktop (1280px)
- Print CSS: nav/footer hidden, black-on-white, page-break-inside:avoid on resume entries

---

## 2026-03-11 — Backlog Complete

All 22 Linear issues (COG-250–271) now done. Zero remaining items from the redesign sprint.

### Added
- **Self-hosted IBM Plex Mono** — 4 WOFF2 files (Regular, Italic, SemiBold, Bold) in `src/assets/fonts/`, `@font-face` declarations in `tokens.css`. Google Fonts CDN import removed. (COG-268)
- **Favicon PNG fallback** — 32x32 PNG generated from SVG via rsvg-convert, added to `base.njk` alongside SVG favicon. (COG-269)
- **Garden RSS generator** (`scripts/garden-rss.js`) — Standalone Node script that fetches the Obsidian Publish cache manifest from cognitivearchitecture.ca, extracts published essays/frameworks/long-form content, and outputs `_data/gardenPosts.json` with title, URL, date, excerpt, status, and tags. (COG-270)
- **Garden → Eleventy pipeline** — Writing page now shows a "From the Garden" section with 9 automatically syndicated posts from cognitivearchitecture.ca, each with status badges and "Read in the garden" links. `npm run build` runs garden-sync as a pre-build step. (COG-267)
- **`garden-sync` npm script** — `node scripts/garden-rss.js` available as standalone command.

### Changed
- **Build command** — `npm run build` now runs `garden-sync` before Eleventy build.
- **Writing page** — Split into "Posts" (manual/native) and "From the Garden" (automated) sections.

---

## 2026-03-10 — Eleventy Build Complete

Full site rebuilt from 4 hand-written HTML pages into an Eleventy-powered personal site with the Data Druid aesthetic. All 15 deliverables from HANDOFF.md completed.

### Added — Foundation
- **Eleventy 3.x scaffold** — `package.json`, `eleventy.config.js`, YAML data extension, RSS plugin, passthrough copy (COG-250)
- **CSS architecture** — 5-file system: `tokens.css`, `base.css`, `components.css`, `utilities.css`, `print.css` (COG-251, COG-265)
- **Data files** — `site.json`, `navigation.json`, `projects.json`, `profiles.json`, `resume.yml` (COG-266)

### Added — Layouts & Templates
- **Base layout** (`base.njk`) — HTML shell with `<head>` (meta, fonts, CSS, webmention/IndieWeb links), skip link, nav, footer (COG-252)
- **Navigation** (`nav.njk`) — Data-driven from `navigation.json` with `aria-current="page"`, pixel monogram site mark
- **Footer** (`footer.njk`) — Secondary nav links from `navigation.json`
- **Partials** — `project-card.njk`, `post-card.njk`, `garden-section.njk`

### Added — Pages
- **Home** (`index.njk`) — Hero with portrait, Garden section, featured project card, latest writing, profile links, h-card microformat (COG-253)
- **Projects** (`projects.njk`) — CivCitDev overview + project cards from data with status badges (COG-254)
- **Writing** (`writing.njk`) — POSSE hub with h-feed wrapper, post cards, Atom feed at `/feed.xml` (COG-255)
- **Resume** (`resume.njk`) — Data-driven from `resume.yml`, h-resume microformat, print stylesheet, "Download PDF" button (COG-256)
- **Content pages** — Now, Colophon, Uses, Links migrated/created as Markdown with base layout (COG-257)
- **404** — Custom styled error page (COG-262)

### Added — Visual Identity
- **Pixel art SVGs** — Monogram (`monogram.svg`), moss divider (`moss-divider.svg`), forest-floor texture (`forest-floor.svg`) (COG-258)
- **Theme toggle** (`theme-toggle.js`) — System/Dark/Light cycle, localStorage persistence, progressive enhancement (COG-259)
- **Dark mode** — "Forest at night" aesthetic with deep greens and warm shadows, distinct from light mode (COG-260)

### Added — Infrastructure
- **GitHub Actions** (`build-deploy.yml`) — Node 22, `npm ci`, Eleventy build, deploy to GitHub Pages (COG-263)
- **Accessibility** — Skip links on all pages, WCAG AA contrast (fg/bg 14.06:1, link/bg 8.21:1, muted/bg 4.79:1), alt text on all images, `aria-current` nav (COG-261)

### Changed
- **Webmention workflow** — Updated source URL from `/posts.html` to `/writing/` (COG-264)
- **Typography** — Fixed h2 size from 1.1rem to 1.5rem; IBM Plex Mono for headings + code via Google Fonts
- **Assets relocated** — `seb-stamp.jpeg` and `favicon.svg` moved to `src/assets/img/`
- Eleventy config uses `eleventy.config.js` (ESM) with `"type": "module"` in package.json

### Not Yet Built
- COG-267: Garden RSS → Eleventy data pipeline (POSSE automation)
- COG-268: Self-host IBM Plex Mono (WOFF2) — currently Google Fonts CDN
- COG-269: Favicon PNG fallback
- COG-270: Garden RSS generator for Obsidian Publish

---

## 2026-03-09 — Design Sprint

### Added
- **DESIGN_BRIEF.md** — Approved design specification for full site redesign. Documents the Data Druid aesthetic (Caves of Qud meets iOS), color palette, typography (IBM Plex Mono headings, system stack body), pixel art visual layer, and page map.
- **HANDOFF.md** — Implementation brief for Claude Code with target Eleventy architecture, POSSE pipeline spec, page specifications, build priority order, and definition of done for all 15 deliverables.
- **POSSE_POST_TEMPLATE.md** — Reference front matter structure for syndicated writing posts.
- **RESUME_TEMPLATE.yml** — YAML scaffold defining the data shape for the resume page.
- 22 Linear issues (COG-250 through COG-271) covering the full build from scaffold to deployment, including Garden RSS generator (COG-270) and documentation updates (COG-271).

### Changed
- **BACKLOG.md** — Promoted all sprint items to In Progress (tracked in Linear). Archived Ideas now covered by the Design Brief. Retained only genuinely deferred items (IndieAuth, Micropub, Bluesky automation, cron rebuilds).
- **README.md** — Rewritten to reflect the Eleventy stack, new project structure, build commands, and design direction. Removed "no build tooling" non-goal.

### Decisions Resolved
- **Stack:** Eleventy 3.x + Nunjucks + vanilla CSS + GitHub Actions → GitHub Pages.
- **Aesthetic:** Data Druid — forest palette, pixel-art accents, IBM Plex Mono, "forest at night" dark mode.
- **Typography:** IBM Plex Mono (headings + code), system font stack (body).
- **Writing/POSSE:** Posts originate in the garden (cognitivearchitecture.ca), syndicated as excerpts. Automated RSS pull at build time; manual markdown fallback retained.
- **Resume:** Data-driven from YAML, rendered by Eleventy template, print stylesheet for PDF output.
- **Pixel art:** AI-generated during the build session — icons, dividers, monogram, textures.

---

## 2026-01-13

### Added
- Deployed `sebthecanadian.ca` via GitHub Pages (branch: `main`, folder: `/ (root)`).
- Configured custom domain: `www.sebthecanadian.ca`.
- Added `now.html` and `colophon.html`.
- Added primary navigation (`<header><nav>...</nav></header>`) across pages with `aria-current="page"` on the active page.
- Added a semantic "last updated" footer using `<time datetime="YYYY-MM-DD">`.
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
- Updated `colophon.html` to include shared navigation and remove redundant internal "Home" link in the page header.

### Security
- HTTPS enforced for `www.sebthecanadian.ca` (GitHub Pages TLS issuance completed; "Enforce HTTPS" enabled).

### Infrastructure / Ops Notes
- Cloudflare DNS configured for GitHub Pages:
  - `www` as CNAME to `seb-the-canadian.github.io` (DNS only).
  - Apex `@` A records to GitHub Pages IPs (DNS only).
- Confirmed GitHub Pages build + deployment workflow runs succeed.
