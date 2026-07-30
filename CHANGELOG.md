# Changelog

Format:
- Dates in ISO format (YYYY-MM-DD)
- Focus on user-visible changes and structural milestones

## 2026-07-23 — Design v3 (one voice, many rooms)

Answer to Seb's verdict on design-v2 — "too simple and repetitive." The
diagnosis: v2 shipped the pitch's *subtractive* half (nav collapse,
monospace, palette, index-table home) but skipped its *compositional* half,
shipped utility classes with no call sites, and propagated the home page's
index-table to every page — repetition by construction. v3 keeps the voice
absolutely and gives every page its own composition. Execution of
`docs/implementation-plan-design-v3.md`, one commit per phase.

### Added
- **Title-block system** — a new `masthead.njk`: the pitch's Move 05 `S·L`
  section stamp (built as a text span, not an asset), an eyebrow label, and
  the page `h1`, above every page. The single biggest antidote to
  "repetitive" — most pages previously opened with a bare `<h1>`.
- **The garden gets its own weather** — garden sections on `/writing/` and
  the home page render as a scoped `.panel--night` forest-at-night block in
  both themes: diegetic (the garden *is* the forest at night), bounded
  punctuation, never a hero. It re-declares the shipped dark-theme tokens
  locally, so every child restyles with zero new contrast pairs to audit.
- **Resume finish** — ruled uppercase section headers + tabular-num dates,
  the pitch's resume spec, unshipped until now.
- **Footer wordmark** — the pitch's mono wordmark ("S·L © … · seb the
  canadian"), printable per the pitch's footer·print·cli assignment.
- **Per-post OG card** — `og-writing.png` in the site's pixel dialect
  (conifer + wordmark), with a committed generator `scripts/generate-og.py`.
- **Ornament layer (Phase 8)** — the pitch's visual devices, adopted at the
  owner's request for more visible design: corner-bracket "field notebook"
  frames (`corners.njk` + `.frame`/`.corner`) on the Now panel, the garden
  night-block, and project cards; the woodcut portrait as a framed `.stamp`
  with an `SL · 2026` caption; numbered section tags (`01 Now … 04 Contact`)
  on the home page; the revived pixel moss-divider between home sections; new
  `--bg-alt`/`--ink-soft` tokens + a `.panel--alt` framed-panel treatment; a
  fine paper-grain texture layered behind the forest-floor pattern; and amber
  link-hover (the pitch's `a:hover`).
- **Polish pass (Phase 9)** — refine the execution toward "polished but still
  hand-coded," at the owner's request. Self-hosted **Fraunces** (a warm
  old-style serif, variable, 67 KB) becomes the display face for the h1–h3
  heading tier; IBM Plex Mono stays for body, labels, code, and every
  terminal device. Soft layered shadows + a hover lift on cards + eased
  transitions (`--shadow`/`--shadow-sm`/`--ease` tokens); softer, consistent
  corner radii; a subtle top-lit gradient on framed panels; more generous
  line-height; and calmer terminal labels (larger, less letter-spacing).
- **Type system, dates, fluid scaling (Phase 10)** — three deliberate
  families: self-hosted **Atkinson Hyperlegible** (Braille Institute, maximal
  legibility) for body & UI text, **Fraunces** for display titles, and IBM
  Plex Mono kept only for code and the data/terminal devices (index rows, the
  `S·L` stamp, the wordmark). The terminal cursor-blink after the name is
  **removed**. Every displayed date now uses one canonical format via a new
  `humanDate` filter ("24 Jul 2026") — index rows, post/footer stamps, and the
  "page rendered" line were three different formats before. Fluid type and
  gutters via `clamp()` (body, h1–h3, page padding, section rhythm) so the
  layout scales continuously instead of snapping at breakpoints.
- **Structure + voice (Phase 11)** — the home page now opens with a short
  philosophy lede (assembled from the owner's own About + résumé prose). The
  **About and Résumé pages merge**: `/about/` absorbs the full résumé
  (experience / skills / credentials / education) via a shared
  `resume-body.njk` include, so the two pages render from one source; primary
  nav becomes **Home · Writing · Projects · About** and the print-optimized
  `/resume/` leaves the nav, reached instead by a "Printable résumé" link on
  About (and a footer link). The **garden gets one coherent "portal"
  identity** — the same label + `cognitivearchitecture.ca ↗` affordance on
  both the home and `/writing/` night-panels, with a one-line framing on home
  about why the writing lives off-site — so the external door reads as the
  same place everywhere.
- **Home declutter (Phase 12)** — the front door had accumulated three
  overlapping separator systems (numbered `01–04` section tags, a pixel
  divider between every section, and corner frames on two blocks). Reduced to
  one: quiet eyebrow labels (Now / Writing / Projects / Elsewhere), generous
  whitespace, a single pixel divider under the lede, and just two
  distinguished blocks — the Now panel and the garden night-panel. The
  ornament vocabulary (corners, dividers) stays on the interior pages where it
  isn't competing with itself. The home's "Writing" block (a lone native-post
  row under a Writing heading) was then removed and the garden promoted to its
  own standalone block — the garden is the writing presence on the front door;
  native posts live on `/writing/`. Finally, the content cards were unified to
  one look: project cards, the Now panel, and the garden panel now share the
  same hairline border, radius, padding, and soft shadow, with the same warm
  top-lit gradient on the light cards and the garden as the dark variant;
  corner-brackets dropped from project cards (they stay on the portrait
  stamps, which are image frames, not content cards). Then, so the cards read
  identical in dark mode too, the garden's dark "night" treatment was retired
  entirely (its identity now rides on the `.garden-portal` label, not a dark
  background) and every card gained a shared **under-glow** — a soft lavender
  cast in light mode, lichen green in dark — via one `--glow` / `--card-shadow`
  token pair, so all content cards glow the same way in both themes.
- **Cleaner editorial backgrounds** — the speckled pixel `forest-floor`
  texture is gone (asset deleted); the page now carries only a whisper of
  fine paper grain. Dark mode moves off the saturated `#0f1a14` forest green
  to a **neutral charcoal** (`#16171a`, with a matching card shade and neutral
  borders) — the forest identity now lives entirely in the accents (moss,
  lichen glow), not the background. `theme-color` meta + the "forest at night"
  doc references updated to match.
- **Natural forest green accents** — the `--moss`/`--link` greens were too
  teal/seafoam (the old light `#3f7a5f` actually failed AA on cards at 4.08).
  Retuned to a warmer, deeper natural green — light moss `#3a6330`, dark moss
  `#7aa85f` (fern), with matching links — every pairing now measures ≥5:1.
- **Duotone accent** — each mode's highlight now matches its card under-glow:
  light mode shifted from green to a deep lavender/violet (`#5b3fa3`, matching
  the lavender glow), dark mode keeps a slightly darker fern green (`#6f9d52`,
  matching the lichen glow). Every accent pairing measures ≥6:1. (The
  `--moss`/`--link` token names are now legacy — in light they resolve violet.)
- **Real portraits** — the woodcut placeholder is replaced by two owner-supplied
  images, each given a treatment fit for its medium: the **résumé** leads with a
  photographic headshot set (rounded frame + soft shadow, stacked above the
  identity) for a professional-but-human read; **About** uses an updated
  pixel-art portrait, clipped to a clean circle. The woodcut-era `.stamp`/corner
  chrome (and `corners.njk`, `seb-stamp.jpeg`) are retired as now-unused.

### Changed
- **Moss H2s site-wide** — `h2` is now 1.35rem / 600 / `--moss` (pitch type
  specimen), a second colour voice on every content page. The resume's
  section headers override this with their own ruled-label treatment.
- **404 home link** — now `~/ home`. The pitch's identity table specified
  ⌂ (U+2302), but IBM Plex Mono has no such glyph; `~/` is the terminal's
  own home symbol, pure ASCII, and stays in-family.
- **Application pass** — every shipped class is grep-verified to render on a
  real page, closing v2's dead-class failure; the two `/writing/` section
  headings adopt `.eyebrow`.

### Notes
- Two scoped deviations from the plan, both recorded: the `.masthead` rule
  neutralizes the global `header` layout rule (it is a nested header), and
  resume headers ship at 0.7rem not the plan's 0.6rem (a 9.6px header sits
  below the sub-12px floor the BACKLOG flags; accessibility is a hard
  constraint).
- Owner-gated copy (Now-block voice, philosophy-in-home-copy) untouched.
- Amber link-hover is a conscious accessibility trade-off: amber on
  parchment is ~3.3:1 (below AA for text), but it is a transient hover state
  with the underline retained, and the resting link colour is AA. Flagged on
  the BACKLOG contrast watch-list; swap to a darkened amber if strictness is
  preferred.

## 2026-07-23 — Design v2 (Move 05 closed · repairs · filtered borrows)

Execution of the PR #17 design-review thread, reconciled to post-#18
main via `docs/implementation-plan-design-v2.md`. Finishes the last
unshipped move of the approved pitch and adopts the external patterns
that survived the compatibility filter; six incompatible patterns are
recorded as declined in BACKLOG, not silently dropped.

### Added
- **Pixel-conifer identity mark** — favicon (theme-aware SVG +32px PNG),
  apple-touch-icon, and the og-default card mark, replacing the interim
  maple leaf. Drawn on the 404 page's 12-cell pixel dialect; the Move 05
  rule (woodcut = human scale, pixel = system scale, tree not portrait)
  is now written into `DESIGN_BRIEF.md`.
- **Woodcut portrait on About** — human-scale (140px, floats left),
  mirroring the resume pattern. Home stays woodcut-free by design.
- **schema.org JSON-LD** — `Person` (home/about), `Article` (posts),
  `CollectionPage` (/writing/), from existing data only; tag pages emit
  nothing. Machine-second layer beside untouched microformats.
- **Editorial classes** — opt-in `.lede` and `.pull-line` (one live
  application in About), documented in `POSSE_POST_TEMPLATE.md`;
  `.eyebrow` trialed on the home Now heading in moss (amber text uses
  remain barred by the recorded contrast note).
- **Design docs** — PR #17's three design-reference reviews + fusion
  plan landed under `docs/`, task list superseded by the reconciled
  implementation plan.

### Restored
- **The pitch's two approved animations**, lost when their hosts left
  the DOM in the pitch-v1 sprint and garbage-collected in #18:
  cursor-blink on the identity name, live-pulse dot on the Now
  timestamp. Both honor `prefers-reduced-motion`.

### Changed
- Blockquotes gain a `--wash` background atop the moss accent border.
- `.identity .p-name` set at 1.25rem/600 — the front door's one
  deliberate typographic decision.

## 2026-07-14 — Finishing Pass (durability · correctness · freshness · cleanup)

Six-phase pass closing the gap between "designed" and "finished" after two
idle months. The organizing goal: the site must stop rotting when
unattended. Shipped as stacked branches (durability → regression fixes →
freshness → cleanup → feed/polish → content drafts + this runbook).

### Added
- **Daily rebuild cron** — `build-deploy.yml` now runs on a schedule
  (09:17 UTC) in addition to push + dispatch. Garden posts and webmentions
  refresh on the live site without commits — previously the site was frozen
  at its last deploy forever.
- **PR quality gate** — new `pr-check.yml`: full build + non-empty
  gardenPosts assertion + core-output existence on every pull request. The
  repo's first CI gate.
- **Garden in the Atom feed** — `feed.xml` is now a hand-rolled template
  (`src/feed.njk`) over a merged collection: native posts (full content) +
  garden posts (external entries), interleaved by date, capped at 20. It
  carried exactly one entry before; now it carries the body of work.
  `@11ty/eleventy-plugin-rss` dependency removed.
- **Data-driven Now block** — `_data/now.json` (`updated` + `currently`);
  the home block renders freshness via the previously-orphaned
  `tendedState` filter ("tended today" … "resting" … "fallow"). The old
  template hardcoded a date that had drifted 10 weeks stale.
- **README Maintenance runbook** — cron behavior, keep-last-good warnings,
  snapshot refresh, now.json updates, posting steps, renewal dates.

### Fixed
- **Keep-last-good data fallbacks** — `garden-rss.js` and `webmentions.js`
  previously overwrote their `_data/*.json` snapshots with empty data and
  exited 0 on ANY fetch failure: a transient outage would silently ship an
  empty site. Both now preserve the existing snapshot and emit a
  `::warning::`; garden-rss also refuses to clobber a good snapshot when a
  "successful" fetch filters to zero posts (upstream structure change).
- **Unstyled tag archives** — `/writing/tags/*` still emitted `.post-card`
  markup whose CSS was deleted in the pitch-v1 sprint; converted to the
  `.index-table` row pattern used everywhere else.
- **Double-branded home title** — `<title>` rendered "Seb (the Canadian).
  — Seb (the Canadian)"; a pageTitle guard now single-brands the home and
  keeps the suffix pattern on interior pages (applied to og/twitter too).
- **Post meta descriptions** — posts set `excerpt` but base.njk only read
  `description`; fallback chain is now description → excerpt → site.
- **`/404.html` leaked into sitemap.xml** — excluded from collections.
- **security.txt was RFC 9116-invalid** — missing `Expires:` added
  (2027-07-01; annual renewal noted in the runbook).
- **`.badge--beta` latent AA fail** — amber text (3.33:1 light) switched
  to `--ink`; amber border + tint carry the state.
- **Bluesky handle drift** — `resume.yml` and the POSSE template pointed
  at `sebthecanadian.bsky.social`; unified to the custom-domain handle
  `bsky.app/profile/sebthecanadian.ca` used everywhere else.
- **OG card carried the retired identity** — `og-default.png` (1.1 MB)
  still featured the skull monogram replaced by the maple leaf in PR #16,
  plus the trailing-period title. Regenerated from the site's own tokens,
  favicon geometry, and self-hosted IBM Plex Mono: 21 KB (−98%).

### Changed
- **Doc drift eliminated** — README (fonts, structure tree, favicon,
  gardenPosts framing, fork guide), about.md (fonts), POSSE template
  (native-post rendering), DESIGN_BRIEF (dated "superseded in part by
  pitch-v1" note; the signed-off contract itself is preserved).
- **head `rel=me`** — expanded from garden-only to all four profiles.
- **`shortDate` filter** — appends a two-digit year for non-current years
  so old garden entries can't masquerade as fresh.
- **Content drafts (owner-reviewed)** — refreshed Now prose, expanded
  links.md (+POSSE, Civic Tech Toronto, Eleventy, Tools for Conviviality),
  fuller uses.md (+NVivo, Day Job section) — drafted from repo evidence.

### Removed
- **Dead CSS** (~120 lines) — `.hero` + cursor-blink, live-pulse (dead-DOM
  since Now left the nav), `.garden-feature`, `.garden-activity`,
  `.tag-index`, `.profile-links`; `.theme-toggle` merged into the
  identical `.button` rule.
- **Unused tokens** — `--col`, `--bg-alt`, `--ink-soft`, `--surface-hover`;
  `--font-code` alias consolidated to `var(--mono)` everywhere.
- **Dead template code** — `resume.njk` "Currently" branch (key never
  existed; home Now owns it).
- **Orphan assets** — `seb-stamp-pixel.png` (523 KB), `pixel/monogram.svg`
  (idea logged in BACKLOG); `pitch-v1.html` (1.3 MB) moved to `docs/`.
- **Print noise** — kbd-hint, footer-meta, build-stamp no longer print on
  the resume PDF.

## 2026-05-02 — Pitch v1 Design Sprint (4 PRs)

Four-afternoon sprint applying pitch-v1's "Same soul, sharper edges" direction:
the design is now fully monospace, the nav has four doors, the home reads as
a terminal-style index-table front door, and the identity system is locked
to the woodcut on the resume. Shipped as PRs #11, #12, #13, #14. Pitch
reference: `docs/pitch-v1.html` (originally at repo root, `4bf9261`). Plan archived at
[`docs/pitch-v1-migration-plan.md`](docs/pitch-v1-migration-plan.md).

### Changed (Day 01 — tokens + type)
- **Token system renamed** — `--accent`→`--moss`, `--accent-secondary`→`--amber`, `--font-body`+`--font-heading`→`--mono`, `--border`→`--rule`, `--fg`→`--ink`. `--accent-dim` deleted. Names now describe the thing, not the role.
- **AA recalibration** — Light moss `#4a8c6f`→`#3f7a5f`, light amber `#e9d66b`→`#b07a0f`, light ink `#1a1a1a`→`#15201a`, dark amber `#d4c15a`→`#d9b24a`. All foreground uses clear WCAG AA on their respective backgrounds.
- **Body now monospace** — 15.5px / 1.62 line-height across the site. The "two-typeface" split is gone; `--font-code` aliases `var(--mono)`.
- **DRY refactor** — `--wash` derives from `--moss` via `color-mix`, so palette adjustments propagate without manual sync.
- **Docs synced** — `DESIGN_BRIEF.md`, `README.md`, and `favicon.svg` updated to the new moss/amber values.

### Changed (Day 02 — shell + nav)
- **Primary nav collapsed 6 → 4** — Home / Writing / Projects / Resume. Everything else moved to the colophon landmark.
- **Colophon footer** — Secondary nav renamed to `colophon` with `<nav aria-label="Colophon">`, absorbing About + Uses + Links + Garden + Email + RSS (six entries).
- **`/now/` folded into home** — `now.md` replaced by `now.njk` redirect to `/#now`; new `<section id="now">` block on the home page becomes the canonical Now anchor.

### Changed (Day 03 — home + writing)
- **Home as index-table front door** — Identity line + Now block + index-table (writing / garden / projects / contact) + footer. Hero illustration retired in favor of typographic structure.
- **`/writing/` leads with garden** — Garden activity is now the primary feed; native posts demoted to a lightweight list; tag archives moved to the bottom as a quiet "Browse by tag" line.

### Changed (Day 04 — identity + polish)
- **Resume portrait** — Pixel portrait swapped to woodcut (`seb-stamp.jpeg`). The pixel monogram remains in the site mark; the woodcut now carries the personal identity.

### Added
- **New tokens** — `--ink-soft`, `--bg-alt`, `--wash`, and `--col: 64ch` (canonical column width). (Day 01)
- **`shortDate` + `hostname` Nunjucks filters** — `shortDate` formats as `dd mmm` for the index-table; `hostname` extracts the bare domain from external URLs. (`eleventy.config.js`, Day 03)
- **Index-table component styles** — `.identity`, `.index-table`, `.index-row`, `.index-pill[--active]`, with mobile collapse. (Day 03)
- **`.tag-browse` + `.native-posts` polish styles** — Minimal CSS for the demoted writing-page sections. (Day 04)
- **`u-photo` on resume woodcut** — Pitch P5 IndieWeb addition; the visible portrait is now machine-readable as the canonical photo. (Day 04)

### Removed
- **`@view-transition` + smooth-scroll guard** — Both retired with the type pass; the site is now snappy by default. (Day 01)
- **`garden-section.njk`** — No callers after `/writing/` was rewritten to render garden inline. (Day 02)
- **`post-card.njk`** — No callers after the writing-list was demoted to a lightweight list. Orphan `.post-card` CSS rules removed alongside. (Day 03)
- **`.page-banner` rules** — Banner figures pulled from `/about/` and `/projects/`; the rule set is gone. (Day 04)
- **`<hr>` moss-divider mask-image** — `<hr>` now renders as a quiet 1px `--rule` line. The `dividers/moss-divider.svg` asset is preserved on disk but no longer referenced. (Day 04)
- **`@keyframes leaf-drift`** — Animation and its application removed. `.page-illustration` base CSS preserved (still in use on `/404/`). (Day 04)
- **Orphan asset files** — `banner-night.png`, `og-dark.png`, `project-placeholder.png` deleted from `src/assets/img/`. (Day 04)

### Fixed
- **`.index-pill--active` AA contrast** — Active-pill text was using `--moss` on `--wash` (4.17:1, AA-borderline). Switched to `--ink`, now 14.99:1. (Day 04 a11y follow-up)
- **`collections.writing | reverse | first` resolved to oldest** — The collection is already sorted descending by date in `eleventy.config.js`, so `| reverse | first` was returning the *oldest* post. Dropped `| reverse |` so `| first` resolves to the newest. Invisible at N=1; would have surfaced the wrong post on the home as soon as a second native post landed. (Day 03)

### Deferred
- `og-writing.png` (1200×630 from pixel portrait) for `/writing/<slug>/` `og:image` — falls back to `og-default.png` for now.
- Visible woodcut promotion to home + about — pitch P5 implies; Day 04 stuck to the resume-only swap.
- Monogram inline at section starts — pitch P5 detail, not yet wired.
- `--rule` border contrast at WCAG 1.4.11 strict reading (light 1.39:1, dark 1.48:1) — soft fail; structural redundancy via spacing. Revisit if low-vision feedback surfaces.
- `--amber` text on `--bg` light (3.33:1) — currently no active text use; flag for future.
- Live-pulse CSS targets dead-DOM selector (`nav a[href="/now/"]::after`) — harmless after `/now/` was folded into home, but cleanup-eligible.
- `_data/gardenPosts.json` cache-preserve-on-fetch-failure logic in `garden-rss.js` — currently overwrites with empty on failure.

---

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
