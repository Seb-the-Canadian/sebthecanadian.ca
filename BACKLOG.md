# Backlog

Tracking design direction, improvements, and known issues for sebthecanadian.ca.

Items move through: **Idea → Planned → In Progress → Done**
(Done items get moved to CHANGELOG.md and removed from here.)

Sprint issues are tracked in Linear: [sebthecanadian.ca project](https://linear.app/cognitive-architecture/project/sebthecanadianca-a6899c6b8b99)

---

## Bugs / Issues

_None currently tracked._

---

## Done — Pitch v1 Design Sprint (2026-05-02)

Four-afternoon sprint applying the pitch-v1 direction ("Same soul, sharper
edges") across tokens, shell, home/writing, and identity. Shipped as four PRs
(#11, #12, #13, #14). See CHANGELOG.md (2026-05-02 — Pitch v1 design sprint)
for details. Pitch reference: `docs/pitch-v1.html` (originally at repo root, `4bf9261`). Plan:
[`docs/pitch-v1-migration-plan.md`](docs/pitch-v1-migration-plan.md).

- [x] Day 01 — Token rename + AA recalibration (`--accent`→`--moss`, `--accent-secondary`→`--amber`, `--font-body`/`--font-heading`→`--mono`, `--border`→`--rule`, `--fg`→`--ink`); new `--ink-soft`, `--bg-alt`, `--wash`, `--col` tokens
- [x] Day 01 — Body to monospace (15.5px / 1.62); retire `@view-transition` + smooth-scroll guard
- [x] Day 02 — Collapse primary nav 6 → 4 doors (Home / Writing / Projects / Resume)
- [x] Day 02 — Rename secondary nav to "Colophon" landmark; absorb About + Uses + Links + Garden + Email + RSS
- [x] Day 02 — Fold `/now/` into home (`now.md` → `now.njk` redirect to `/#now`); delete `garden-section.njk`
- [x] Day 03 — Home rewritten as terminal-style index-table front door (identity line + Now + index-table + footer)
- [x] Day 03 — `/writing/` leads with garden activity; native posts demoted to lightweight list; tag archives moved to bottom
- [x] Day 03 — New filters: `shortDate`, `hostname`; new components: `.identity`, `.index-table`, `.index-row`, `.index-pill`
- [x] Day 03 — Retire `post-card.njk` + orphan `.post-card` rules; fix `collections.writing | reverse | first` (now resolves to newest)
- [x] Day 04 — Resume portrait swapped pixel → woodcut (`seb-stamp.jpeg`); `u-photo` formalized per pitch P5
- [x] Day 04 — Remove banner figures from `/about/` and `/projects/`; retire `.page-banner`, `<hr>` moss-divider mask, `@keyframes leaf-drift`
- [x] Day 04 — AA fix: `.index-pill--active` text uses `--ink` (was 4.17:1, now 14.99:1)
- [x] Day 04 — Delete orphan asset files: `banner-night.png`, `og-dark.png`, `project-placeholder.png`

---

## Done — Stewardship Pass (2026-05-01)

Sixteen-item review-driven pass executed by a team of nine specialised
sub-agents. Hygiene + Coherence + Depth tiers complete. See CHANGELOG.md
(2026-05-01 — Stewardship Pass) for details.

- [x] Remove pre-Eleventy artifacts from repo root
- [x] Archive stale planning docs to docs/archive/
- [x] Replace placeholder resume content (honest sparse approach)
- [x] Theme moss divider via mask-image so it tracks light/dark
- [x] Wrap scroll-behavior:smooth in prefers-reduced-motion guard
- [x] Add <meta name="theme-color"> for light + dark
- [x] OpenGraph + Twitter card meta + monogram OG image (1200×630)
- [x] Generate /sitemap.xml + <link rel="sitemap"> discovery
- [x] Introduce post.njk h-entry layout for native posts
- [x] De-duplicate writing index by gardenUrl
- [x] Datestamp /now/ with updated + daysAgo signal
- [x] Refactor resume "Download PDF" button class
- [x] Tag archives + tag index on /writing/
- [x] Make keyboard shortcuts discoverable (/keyboard/ page)
- [x] Per-page "last updated" footer line, sourced from git
- [x] Render received webmentions on native posts (interactions only)

---

## Done — Eleventy Redesign Sprint (2026-03-10)

Full site redesign complete. Eleventy 3.x, Data Druid aesthetic, POSSE writing system, data-driven resume. See CHANGELOG.md (2026-03-10) for details.

- [x] COG-250 — Eleventy scaffold + config + package.json
- [x] COG-251 — Design token system (CSS custom properties)
- [x] COG-252 — Base layout + navigation + footer
- [x] COG-265 — CSS architecture — base, components, utilities, print
- [x] COG-253 — Home page
- [x] COG-254 — Project cards component + Projects page
- [x] COG-255 — Writing system — POSSE templates, RSS feed, post cards
- [x] COG-256 — Resume page — YAML data → template → print CSS
- [x] COG-266 — Data files — site.json, navigation.json, projects.json, profiles.json
- [x] COG-261 — Accessibility audit — WCAG AA, skip links, screen reader
- [x] COG-263 — GitHub Actions build → deploy workflow
- [x] COG-257 — Content pages — Now, Colophon, Uses, Links
- [x] COG-258 — Pixel art asset generation + integration
- [x] COG-259 — Theme toggle + interactions (progressive enhancement)
- [x] COG-260 — Dark mode refinement — "forest at night" aesthetic
- [x] COG-264 — Webmention workflow update
- [x] COG-262 — Custom 404 page
- [x] COG-271 — Update project docs for redesign sprint

---

## Done — Backlog Completion (2026-03-11)

- [x] COG-268 — Self-host IBM Plex Mono (WOFF2) — 4 weights, `@font-face` in tokens.css
- [x] COG-269 — Favicon PNG fallback — 32x32 PNG generated from SVG
- [x] COG-270 — Garden RSS generator — `scripts/garden-rss.js` scrapes Obsidian Publish cache manifest
- [x] COG-267 — Garden RSS → Eleventy data pipeline — writing page shows 9 garden posts automatically

---

## Done — Testing & QA Pass (2026-03-11)

Comprehensive verification of all pages, responsive design, accessibility, microformats, and CI/CD. See CHANGELOG.md (2026-03-11 — Testing & QA Pass) for full details.

- [x] Fixed mobile navigation overlap at 375px (`flex-wrap` in `components.css`)
- [x] Fixed wikilink artifacts in garden excerpts (`stripObsidian()` in `garden-rss.js`)
- [x] Fixed CI build missing garden sync (`build-deploy.yml` → `npm run build`)
- [x] Verified all 11 pages, theme toggle, fonts, favicons, RSS feed, microformats, accessibility, print CSS, responsive layouts

---

## Ideas

Candidates for future work beyond the current sprint. No commitment implied.

### Pitch v1 Follow-ups

- [ ] Generate `og-writing.png` (1200×630 from pixel portrait) for `/writing/<slug>/` `og:image` (currently falls back to `og-default.png`)
- [ ] Promote woodcut visibility to home + about (pitch P5 implies; Day 04 stuck to resume-only swap)
- [ ] Inline monogram at section starts (pitch P5 detail — `monogram.svg` asset removed 2026-07 as orphan; resurrect from git history if ever wanted)
- [ ] Revisit `--rule` border contrast (light 1.39:1, dark 1.48:1 vs WCAG 1.4.11 strict; soft fail today via spacing redundancy) if low-vision feedback surfaces
- [ ] Revisit `--amber` text on `--bg` light (3.33:1) before any active text use
- [ ] Clean up live-pulse CSS dead-DOM selector (`nav a[href="/now/"]::after` — harmless)
- [ ] Preserve `_data/gardenPosts.json` cache when `garden-rss.js` fetch fails (build-script concern)

### IndieWeb & Microformats

- [ ] Evaluate IndieAuth sign-in on the homepage
- [ ] Consider adding a Micropub endpoint for posting from external clients

### Performance & Infrastructure

- [ ] Add `<meta>` cache-control hints or a `_headers` file for Cloudflare
- [ ] Consider inlining critical CSS to eliminate the stylesheet request

### Future POSSE Enhancements

- [ ] Bluesky automation via Bridgy Fed or AT Protocol GitHub Action
- [ ] Automated rebuild triggers (cron or webhook on garden publish)

---

## Process Notes

- Design changes should honour the principles in the colophon: minimal, durable, portable.
- When an item is finished, log it in CHANGELOG.md under the appropriate date and remove it from this file.
- Bugs and regressions go in the **Bugs / Issues** section with a short description and reproduction steps if applicable.
- Sprint issues are the source of truth in Linear. This file provides a local overview.
