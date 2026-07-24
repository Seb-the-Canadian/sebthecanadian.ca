# Backlog

Tracking design direction, improvements, and known issues for sebthecanadian.ca.

Items move through: **Idea → Planned → In Progress → Done**
(Done items get moved to CHANGELOG.md and removed from here.)

Sprint issues are tracked in Linear: [sebthecanadian.ca project](https://linear.app/cognitive-architecture/project/sebthecanadianca-a6899c6b8b99)

---

## Bugs / Issues

_None currently tracked._

---

## Done — Design v3 (2026-07-23)

"One voice, many rooms" — the pitch's *compositional* half that design-v2
skipped, after Seb's "too simple and repetitive" verdict. Execution of
[`docs/implementation-plan-design-v3.md`](docs/implementation-plan-design-v3.md).
Details in CHANGELOG 2026-07-23 (Design v3).

- [x] Phase 1 — title-block system: `masthead.njk` with the pitch's `S·L`
      section stamp (text, not an asset) + eyebrow, on every page; moss H2s
      site-wide (pitch type specimen)
- [x] Phase 2 — the garden gets its own weather: scoped `.panel--night`
      forest-at-night block on `/writing/` + the home garden rows (D1 — the
      Part D reversal recorded under the neilwengerd Idea section below)
- [x] Phase 3 — resume ruled uppercase section headers + tabular-num dates
      (pitch resume spec, unshipped until now)
- [x] Phase 4 — footer mono wordmark; 404 `~/` home glyph (Plex Mono has no
      U+2302 ⌂ — font-constrained amendment to the pitch identity table)
- [x] Phase 5 — per-post OG card `og-writing.png` in the pixel dialect +
      committed generator `scripts/generate-og.py`
- [x] Phase 6 — application pass: every shipped class grep-verified to
      render on a real page (the design-v2 process failure this closes)
- [x] Phase 7 — governance close (this record + CHANGELOG + DESIGN_BRIEF)
- [x] Phase 8 — ornament layer (owner asked for more of the pitch's visual
      devices): corner-bracket frames, numbered section tags, `.panel--alt`
      bg-alt panels, framed portrait `.stamp`, revived pixel moss-divider,
      paper-grain texture, amber link-hover. Revives the DESIGN_BRIEF's
      "pixel-art layer" that pitch-v1's subtractive pass had dropped.

Two owner-gated items deliberately untouched: the Now-block voice rewrite
and the philosophy-line-in-home-copy (both on Owner TODOs / the neilwengerd
Idea section).

---

## Done — Design v2 (2026-07-23)

Execution of `docs/implementation-plan-design-v2.md` (the PR #17 fusion
plan reconciled to post-#18 main). Details in CHANGELOG 2026-07-23.

- [x] PR #17's four design docs landed (BACKLOG conflict resolved, paths
      fixed, fusion-plan task list marked superseded)
- [x] Cursor-blink + live-pulse rebuilt against the current DOM
      (`.identity .p-name::after`, `.live-dot` on the Now timestamp),
      reduced-motion-safe — the pitch's two approved animations restored
- [x] Woodcut portrait on About at human scale (pitch Move 05; the
      "promote woodcut to home + about" idea closed for About — home
      deliberately stays woodcut-free)
- [x] Favicon story resolved: pixel-conifer mark (theme-aware SVG + PNG +
      touch icon + og-default) replaces the interim maple leaf; rule
      documented in `DESIGN_BRIEF.md`'s annotation block
- [x] schema.org JSON-LD, blockquote wash, `.lede`/`.pull-line`,
      identity-line weight, `.eyebrow` trial (see the design-review Idea
      sections below for per-item notes)

---

## Done — Finishing Pass (2026-07-14)

Six-phase pass making the site self-tending: daily rebuild cron,
keep-last-good data fallbacks, first PR quality gate, regression +
correctness fixes, freshness mechanics, doc/dead-code/asset cleanup,
garden-inclusive Atom feed, and a README runbook. See CHANGELOG.md
(2026-07-14 — Finishing Pass) for the full record.

- [x] Daily rebuild cron + keep-last-good fetch fallbacks (resolves "Preserve gardenPosts cache" + "Automated rebuild triggers" ideas)
- [x] PR quality gate (build + data assertions)
- [x] Unstyled tag-archive regression fixed (index-table pattern)
- [x] Title/meta/sitemap/security.txt/rel=me correctness fixes
- [x] Data-driven Now block + tendedState wiring
- [x] Doc drift eliminated (README, about, POSSE template, DESIGN_BRIEF annotation)
- [x] Dead CSS + unused tokens + orphan assets removed (resolves "live-pulse dead-DOM selector" idea)
- [x] Garden posts in feed.xml; RSS plugin dependency dropped
- [x] og-default.png regenerated with current maple identity (21 KB, was 1.1 MB skull card)
- [x] Content drafts for owner review: Now prose, links.md, uses.md
- [x] README Maintenance runbook

---

## Owner TODOs (content — nothing blocks on these)

- [ ] Review + edit the Phase C content drafts (Now prose in `_data/now.json`, `links.md`, `uses.md`) — merging the now.json date attests the prose is current
- [ ] Hardware section for `/uses/` (only you can list it)
- [ ] A second native post whenever there's something to say — the pipeline is ready
- [ ] Re-authorize the GitHub connector so PRs can be opened/managed from sessions (or open PRs manually from the pushed branches)

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

- [x] Generate `og-writing.png` (1200×630) for `/writing/<slug>/` `og:image` — shipped 2026-07-23 (design-v3 Phase 5) in the pixel dialect (conifer + wordmark) via committed `scripts/generate-og.py`
- [x] Section stamp at page title blocks — shipped 2026-07-23 (design-v3 Phase 1) as the pitch's Move 05 `S·L` "two characters of ink", built as a text span in `masthead.njk` rather than the removed `monogram.svg` asset. (A decorative inline monogram *within* section bodies remains parked — resurrect `monogram.svg` from git history if ever wanted.)
- [ ] Revisit `--rule` border contrast (measured 2026-07: light 1.35:1, dark 1.48:1 vs WCAG 1.4.11's 3:1 strict; conscious soft fail — spacing redundancy carries the structure) if low-vision feedback surfaces
- [ ] Revisit `--amber` as text on `--bg` light (3.33:1) before any new text use — `.badge--beta` was switched to `--ink` text 2026-07, so no active text use remains. **Exception (2026-07-23, design-v3 Phase 8):** amber link-hover shipped as a conscious transient-state trade-off (underline retained, resting state AA). Swap to a darkened amber if low-vision feedback surfaces or strictness is preferred.
- [ ] Revisit `kbd` moss-on-code-bg contrast (3.9:1 at 12px, borderline AA) alongside the sub-12px terminal text sizes (9–11px pills/labels) if low-vision feedback surfaces

### IndieWeb & Microformats

- [ ] Evaluate IndieAuth sign-in on the homepage
- [ ] Consider adding a Micropub endpoint for posting from external clients

### Performance & Infrastructure

- [ ] Add `<meta>` cache-control hints or a `_headers` file for Cloudflare
- [ ] Consider inlining critical CSS to eliminate the stylesheet request

### Future POSSE Enhancements

- [ ] Bluesky automation via Bridgy Fed or AT Protocol GitHub Action

---

## Idea — From yepsen.net design review (2026-07-22)

Outside-reference review, not a scheduled redesign. Full writeup:
[`docs/design-reference-yepsen.md`](docs/design-reference-yepsen.md).

- [x] Eyebrow labels — trialed 2026-07-23 (design-v2) on the home Now
      heading in `--moss` not `--amber` (amber text fails contrast, see
      Pitch v1 Follow-ups); rolled out 2026-07-23 (design-v3) to every
      masthead eyebrow + the two `/writing/` section labels
- [x] Post template: lede paragraph style — shipped 2026-07-23 as opt-in
      `.lede` class (documented in `POSSE_POST_TEMPLATE.md`)
- [x] Post template: styled `blockquote` — shipped 2026-07-23 (`--wash`
      background added to the existing moss accent border)
- [ ] Featured pull-quote pattern — one oversized quote among smaller ones,
      for surfacing a standout webmention or project testimonial
- [x] `schema.org` JSON-LD — shipped 2026-07-23 (`Person` on home/about,
      `Article` on posts, `CollectionPage` on `/writing/`; tag pages
      deliberately emit nothing)

---

## Idea — From neilwengerd.com design review (2026-07-22)

Outside-reference review, not a scheduled redesign. Full writeup:
[`docs/design-reference-neil-wengerd.md`](docs/design-reference-neil-wengerd.md).

- Declined (2026-07-23, design-v2 — `docs/design-fusion-plan.md` Part D):
  braver metaphor-driven section/nav copy. The approved pitch's Principle
  C is "fewer doors, honest signs" — literal labels are the point.
- Declined (2026-07-23, design-v2 — fusion plan Part D): numbered process
  cards; no current page for them to attach to. Revisit only if a
  process/methodology page is ever built.
- Declined (2026-07-23, design-v2 — fusion plan Part D): plain-text
  client/collaborator list; same reason — no such page exists.
- [x] Pull-line emphasis style — shipped 2026-07-23 as opt-in
      `.pull-line` class, one live application in About (documented in
      `POSSE_POST_TEMPLATE.md`)
- Reversed 2026-07-23 (design-v3, owner feedback "too simple and
  repetitive"): the dark "punctuation block" ships as the scoped
  `.panel--night` garden treatment — diegetic (the garden *is* the forest
  at night), bounded, never a hero. The design-v2 "dark hero" reading
  misjudged it: a hero is a landing moment; this is a mid-page shift that
  returns to parchment after. Every colour pair inside is the already-AA
  shipped dark theme. Other Part D refusals stand.
- Declined (2026-07-23, design-v2 — fusion plan Part D): contextual
  button contrast; no mixed-background sections exist for it to govern.
- [ ] Work a line or two of `DESIGN_PRINCIPLES.md`'s philosophy directly
      into visitor-facing home page copy, not just an internal doc —
      owner-voice edit, pairs with the Now-block rewrite on the
      Owner TODOs list

---

## Idea — From henry.codes design review (2026-07-22)

Outside-reference review, not a scheduled redesign. Full writeup:
[`docs/design-reference-henry-codes.md`](docs/design-reference-henry-codes.md).

- Declined (2026-07-23, design-v2 — `docs/design-fusion-plan.md` Part D):
  "echo" ghost-text behind project titles. Maximalist decoration in
  tension with "dense, legible, quiet."
- [ ] Category axis alongside tags on writing posts (e.g. "journal" vs.
      "resource") — distinct from topic tags, only if `/writing/` grows
      enough to need two taxonomies instead of one
- [ ] "You are here" as the footer breadcrumb label, if/when one exists —
      friendlier than a generic Home / Section / Page trail
- [ ] Visibly-disabled (not deleted) social link pattern — a modifier
      class for an account still linked but no longer endorsed/active,
      instead of silently removing it or leaving it looking current
- [ ] Fathom (or similar privacy-respecting analytics) named as the
      default option if analytics are ever wanted, instead of reaching
      for Google Analytics by default

---

## Idea — From gwern.net design review (2026-07-23)

Outside-reference review, not a scheduled redesign. Full writeup:
[`docs/design-reference-gwern.md`](docs/design-reference-gwern.md).

- [ ] Epigraph convention — a `.epigraph` class + markdown pattern for a
      short, distinctly-styled quote opening a section, usable selectively
      on native posts that earn it
- [ ] Admonition/callout box — bordered, titled alert box (e.g. for a
      "syndicated from the garden" or "draft" notice on writing posts),
      more legible than the current plain-text treatment
- [ ] `.abstract` as a sibling to `.lede` for genuinely long-form posts —
      a one-paragraph summary set apart before the content starts;
      revisit whether `.lede` should grow this variant rather than adding
      an unrelated new class
- [ ] Auto-generated Table of Contents for long pages (About, or any
      future long native post) — Eleventy can build this from existing
      markdown headers, no new dependency
- [ ] Seasonal CSS easter egg (e.g. a Halloween/Christmas palette swap on
      specific dates) — pure fun, zero structural risk, no design need
      driving it
- Declined (2026-07-23): the full popup/hover-preview annotation engine,
  per-domain link-icon infrastructure at Gwern's scale, and independent
  dark/reader/extracts-mode toggles — each is a substantial bespoke JS
  system built for a much larger, more cross-referenced site; wildly
  disproportionate to this site's size and "no new JS dependencies"
  commitment. See `docs/design-reference-gwern.md`'s "What NOT to copy."

---

## Process Notes

- Design changes should honour the principles in the colophon: minimal, durable, portable.
- When an item is finished, log it in CHANGELOG.md under the appropriate date and remove it from this file.
- Bugs and regressions go in the **Bugs / Issues** section with a short description and reproduction steps if applicable.
- Sprint issues are the source of truth in Linear. This file provides a local overview.
