# Migration plan: bring the site into pitch-v1's vision

| Field | Value |
|-------|-------|
| Date | 2026-05-01 |
| Author | Claude (review session) |
| Source | `pitch-v1.html` (committed to `main` at `4bf9261` on 2026-05-01) |
| Status | Plan — advisory; no code changes made by this review |
| Scope | Design-system migration only (per user request) |
| Predecessor plan | `/root/.claude/plans/review-the-site-build-greedy-willow.md` |

---

## Context

Seb uploaded a self-contained 1117-line HTML pitch (`pitch-v1.html`) to
`main` proposing a tightening of the site's design language. The pitch
diagnoses four specific tensions in the current build, states a thesis
(*"Same soul, sharper edges"*), proposes five concrete moves, scores
each against the project's own design principles, and lays out a
**four-afternoon sprint plan** with an explicit anti-goals list.

The pitch is written *for* Seb, *by* Seb (ostensibly addressing himself
or a designer-of-record), and the request is: **review the pitch and
develop a plan to bring the site into its vision from a design
standpoint**. This document is that plan.

The pitch is unambiguous about its restraint:
- No framework change (Eleventy stays, Nunjucks stays).
- No new fonts (Plex Mono only, self-hosted; **drop Atkinson + Google Fonts**).
- No new JS (the existing three small files only).
- No content migration.
- No build-time image pipeline.

That makes this a CSS + template + a few file deletions migration. No
new dependencies, no new build steps.

---

## What the pitch is asking for (7 sections, tight summary)

### 01 · Diagnosis — four tensions
1. **The aesthetic is sprinkled, not committed.** Headings are mono;
   body is system-sans. Pixel banners on two pages, dividers on none,
   the rest is markdown in a 68ch column. The "Caves of Qud data
   druid" voice doesn't carry through.
2. **Two portraits, no rule.** Woodcut stamp (warm, hand-made) and
   pixel portrait (cool, game-like). Both are good. Neither has a
   defined role. Favicon is a third mark. Identity needs a *system*.
3. **Eleven nav destinations, one post.** "You are what you link to —
   right now the site links to itself eleven times before it says
   hello."
4. **Writing page promises the garden, then lists native posts above
   it.** Visual weight is wrong; reader can't tell which is the body
   of work.

### 02 · Thesis
Three statements:
- **Same soul, sharper edges.** Commit to the low-fi, monospace,
  tended-garden voice already named.
- **The medium is the argument.** Make every pixel carry its weight,
  or cut it.
- **Fewer doors, honest signs.**

### 03 · Five concrete moves
| # | Title | Essence |
|---|-------|---------|
| **P1** | Collapse the nav | 4 doors, not 11. Home · Writing · Projects · Resume. Footer absorbs uses/links/RSS/contact/colophon. Garden = first-class outbound link. `/now/` folds into home. |
| **P2** | Go fully monospace | Body in IBM Plex Mono 400 · 15.5px / 1.62 · measure 64ch (down from 68). Drop Atkinson Hyperlegible + any Google Fonts request. Kill smooth-scroll + View Transitions ("opposite of works-in-text-browsers ethic"). |
| **P3** | Home as front door, not feed | One-line identity, Now block (3 lines, "tended" timestamp, folds in `/now/`), index table (writing/projects/garden activity, terminal-style rows not cards), contact at bottom. |
| **P4** | Recalibrate palette for AA | Moss `#4a8c6f → #3f7a5f` (light) / `#6bb896` stays (dark). Amber `#e9d66b → #b07a0f` (light) / `#d9b24a` stays (dark). Unify muted neutrals (no more brown/purple drift). New `--wash` token (6% moss tint) for garden-feature panel only. |
| **P5** | One rule per identity | Woodcut stamp = home/about/resume + `og:default` (human, dateable). Pixel portrait = favicon source + `og:writing` + 404 (system, scaleable). Monogram = inline section starts (ascii-simple signature). **Retire**: banners, moss-divider use, leaf-drift animation. |

### 04 · Principles check (pitch's own scoring)
| Principle | Pitch's verdict |
|-----------|-----------------|
| Convivial | **Pass.** ~30% less CSS. One font family. Every component readable in a text browser. |
| IndieWeb | **Pass with care.** All microformats preserved. One small addition: formalize `u-photo` on the woodcut stamp. |
| Sustainable | **Strong pass.** Zero new deps. CSS merges into existing four files. Removes Google Fonts CDN. |
| Accessible | **Meaningful upgrade.** All AA at body size (current amber fails). Fixes IMPROVEMENT_AUDIT Batch 1 inline. Reduced-motion respected. New 64ch measure improves SR line breaks. |

### 05 · Sprint plan (4 afternoons)
| Day | Focus | Effort | Outcome |
|-----|-------|--------|---------|
| 01 | Tokens + type | S · 2h | AA everywhere |
| 02 | Shell + nav | M · 3h | 4 doors, honest |
| 03 | Home + writing | M · 3h | Reads like a hub |
| 04 | Identity + polish | S · 2h | One face per role |

### 06 · Anti-goals (what the pitch refuses)
- No framework change. No new fonts. No new JS.
- No CMS, no build-time image pipeline, no new data model.
- No hand-drawn SVG without existing source.
- No garden content migration.

### 07 · Close
*"The brief you wrote is the design. This pitch just reads it more
carefully than the current build does."*

---

## Diff map — current state vs pitch target

This is the working diff against the current branch tip
(`13c23e5` on `claude/review-site-build-VLShm`, which carries the
PR #10 stewardship pass plus the just-merged content from `main` up
to `15a1fae`).

| Pitch move | Current state | Target | Δ |
|---|---|---|---|
| **P1 — Nav** | 6 primary + 5 secondary = 11 destinations (`_data/navigation.json`) | 4 primary (Home · Writing · Projects · Resume), rest absorbed into footer colophon row | Restructure `navigation.json`; rebuild `nav.njk` + `footer.njk` |
| **P1 — `/now/`** | Standalone page at `/now/` with `dt-updated` (PR #10 #11) | Three-line block on home; `/now/` URL becomes a redirect (mirror `/colophon/` pattern) | Move content into `index.njk`; convert `now.md` → `now.njk` redirect |
| **P2 — Body font** | System sans stack via `--font-body` (`tokens.css:55`) | IBM Plex Mono everywhere, body included | Collapse `--font-body` and `--font-heading` to a single `--mono`; update `base.css` |
| **P2 — Body size** | `font-size: var(--text-base)` = 1rem (16px); line-height 1.6 | 15.5px / 1.62 | Tweak `tokens.css` and `base.css` |
| **P2 — Measure** | `--maxw: 68ch` | `--col: 64ch` (with `--maxw: 72rem` for outer containers) | Add `--col`, narrow `--maxw` for text vs page chrome |
| **P2 — Atkinson Hyperlegible** | Removed in 2026-03-11 commit `e7000fd` (no longer loaded) | Drop entirely | Already done — verify no stray references |
| **P2 — Smooth scroll** | Wrapped in `prefers-reduced-motion` guard (PR #10 #5, `base.css:18`) | Removed entirely | Delete the `@media` block |
| **P2 — View Transitions** | `@view-transition` cross-fade in `base.css:171–187` | Removed entirely | Delete the rules |
| **P3 — Home** | Hero + Garden section + Featured Project + Latest Writing + Profiles (`index.njk`) | One-line identity + Now block + Index table (writing/projects/garden) + Contact | Substantial `index.njk` rewrite |
| **P3 — Index table** | Card-style post lists | Terminal-style rows w/ `tended-date` per row | New CSS pattern in `components.css`; rewrite of post-card / project-card uses on home |
| **P4 — Moss light** | `--accent: #4a8c6f` | `--moss: #3f7a5f` | Token rename + value change |
| **P4 — Amber light** | `--accent-secondary: #e9d66b` (fails AA on parchment) | `--amber: #b07a0f` | Token rename + value change |
| **P4 — Muted** | Light `#6b6459` (warm brown), dark `#8a8477` (mostly neutral) | Single neutral family across modes | Reset both `--muted` values |
| **P4 — `--wash`** | Doesn't exist | 6% moss tint, used **only** by `.garden-feature` | Add token; replace `.garden-feature` background |
| **P4 — Other accents** | `--accent-dim` derived | Drop `--accent-dim`; `--wash` is the single accent panel | Remove derived token, replace usages |
| **P5 — Woodcut stamp** | `seb-stamp.jpeg` (208KB photo, used on `/about/` via `<figure class="page-banner">`?) | `og:default`, home, about, resume | Verify and lock these usages; add `u-photo` to the stamp where rendered |
| **P5 — Pixel portrait** | `seb-stamp-pixel.png` (640×640, used on `/resume/` per `resume.njk:10`) | favicon source + `og:writing` + 404 only | Move from resume to those three contexts; remove from resume |
| **P5 — Monogram** | `monogram.svg` (memento-mori skull, used in `nav.njk` site-mark only) | Inline at section starts as ascii-simple signature | Expand usage to section starts (likely in `base.njk` or a new `<hr class="monogram">` shortcode) |
| **P5 — Banners** | `banner-night.png` used on `/about/` via `.page-banner` (committed in `ef270c0`) | **Retired** | Remove the banner from `about.md`; remove `.page-banner` CSS |
| **P5 — Moss dividers** | Themed via `mask-image` on `<hr>` (PR #10 #4 + main `44b7bec`) | **Retired** — replaced by 1px `--rule` + dashed section borders per pitch | Replace `<hr>` rule with a quiet `border-bottom: 1px dashed var(--rule)` on `<section>`; or simple 1px solid rule |
| **P5 — Leaf-drift animation** | One-shot leaf drift on `/404/` (main `05d22fb`) | **Retired** | Remove the JS/CSS that drives it |

---

## Reconciliation with PR #10 + recent main work

The pitch was written knowing the current state. Several pitch moves
**explicitly retire** things that were added very recently — both in
PR #10's stewardship pass and in main's last week of work:

| Recently shipped | Pitch verdict | Notes |
|---|---|---|
| Smooth-scroll guard (PR #10 #5) | Delete the rule entirely | The guard isn't wrong, it's vestigial — pitch wants the property gone. |
| View Transitions cross-fade | Delete | Never integral; was added 2026-03-13. Easy removal. |
| Moss-divider theming via mask-image (PR #10 #4 + main `44b7bec`) | Stop using `<hr>` divider altogether | Pitch keeps the SVG file (it's beautiful, a "detail nobody opens devtools to find") but doesn't *use* it as decoration on every section break. |
| Banner-night on `/about/` (`ef270c0`) | Retire banner usage | Image stays in repo; just stop rendering. |
| Leaf-drift on `/404/` (`05d22fb`) | Retire | Delete JS hook + CSS. |
| `/now/` page (PR #10 #11 datestamped it) | Fold into home, redirect URL | Mirror the `/colophon/` pattern: `now.njk` becomes a redirect stub. |
| OG image set (`og-default.png` / `og-dark.png`) | Lock into P5 system | `og-default.png` = woodcut → home/about/resume. `og-writing.png` (new, may need creating from existing pixel portrait at proper aspect) = `/writing/<slug>/`. |
| Tag archives (PR #10 #14) | Compatible | Pitch home is a hub w/ index table — tag archives still discoverable from `/writing/`. No change needed. |
| Per-page `last-updated` (PR #10 #12) | Compatible | "tended" timestamps are exactly what the pitch wants. Keep, possibly rename label "Last updated" → "tended". |
| Webmention rendering (PR #10 #13) | Compatible | No mention; safe to keep. |
| Honest sparse resume (PR #10 #3) → real resume (main `9395678`) | Pitch compatible | Real prose now lives in `_data/resume.yml`; resume layout stays. |
| `/about/` amalgamated colophon (main `12d7f9b`) | Compatible | Footer colophon row absorbs further tertiary nav per pitch P1. |
| `gitLastModified` filter (PR #10 #12) | Keep | Used in footer; pitch wants this freshness signal. |
| `tendedState` filter (main `de13480`) | Keep — pitch's "tended" vocabulary aligns | Used in P3 index table. |

**Key deletions the pitch implies (that are recent additions):**
- `src/_includes/garden-section.njk` — pitch P3 promotes garden to the index-table row, removes the dedicated featured panel.
- `<figure class="page-banner">` blocks in `src/about.md`.
- The `.hero` cursor-blink and `live-pulse` dot on Now (`components.css:335–401`) — pitch P3 reorganizes home.
- `@view-transition` block (`base.css:171–187`).
- `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }` (`base.css:17–22`).
- `.page-banner` CSS (`components.css:186–197`).
- `.page-illustration` CSS may stay if `/404/` keeps its illustration (debatable — pitch P5 lets pixel portrait live on /404/).

---

## The plan: 4 afternoons, 4 PRs

Following the pitch's explicit structure. Each afternoon is independently
shippable; stopping after any one leaves the site improved relative to
where it started.

### Day 01 — Tokens + type (S · 2h)

**Goal:** AA everywhere; one font family; one neutral family.

**Files:**
- `src/assets/css/tokens.css`
- `src/assets/css/base.css`
- `src/assets/css/components.css` (token references)

**Steps:**
1. **Rename tokens.** `--accent` → `--moss`, `--accent-secondary` → `--amber`, `--font-heading` + `--font-body` → `--mono`, `--maxw` keeps but add `--col: 64ch`.
2. **Recalibrate light values.** `--moss: #3f7a5f` (from `#4a8c6f`); `--amber: #b07a0f` (from `#e9d66b`); `--ink: #15201a` (from `--fg #1a1a1a`); `--ink-soft: #3a453d` (new, replaces some `--fg` uses); `--bg: #f2efe6` (from `#f5f2eb`); `--bg-alt: #ebe7db` (new); `--rule: #d6d0c2` (replaces `--border: #d4cfc5`); `--muted: #6b6659` (was `#6b6459`, near-identical, but unify).
3. **Recalibrate dark values.** `--moss: #6bb896` (lifted slightly from current); `--amber: #d9b24a` (was `#d4c15a`); `--ink: #e8e2d4`; `--ink-soft: #c3bdaf`; `--bg: #0c1512`; `--bg-alt: #121e19`; `--rule: #2a3a30`; `--muted: #8b8676`.
4. **Add `--wash`.** Light: `rgba(63,122,95,0.06)`. Dark: `rgba(107,184,150,0.07)`.
5. **Body typography in `base.css`.** `body { font-family: var(--mono); font-size: 15.5px; line-height: 1.62; }`. Drop `--font-body` system stack. Headings keep `--mono` (already mono).
6. **Drop smooth-scroll + View Transitions.** Remove `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }` and the `@view-transition` block from `base.css`.
7. **Token-rename pass.** Sweep `components.css` for `--accent` → `--moss`, `--accent-secondary` → `--amber`, `--border` → `--rule`, `--fg` → `--ink`. Replace `.garden-feature { background: ... }` to use `var(--wash)`.
8. **Audit references in templates.** Quick `grep -rn 'var(--accent\|--accent-secondary\|--font-body' src/` to catch missed migrations.

**Acceptance:**
- `npm run build` is green; no warnings.
- Body text is monospace on every page.
- Light-mode amber link/button passes WCAG AA at 14px (manual check: `b07a0f` on `f2efe6` ≈ 4.6:1, OK).
- Dark-mode AA preserved.
- No CSS rule references `--accent`, `--font-body`, or `--font-heading`.

**Commit:** `feat(design): tokens + type pass per pitch v1 — moss/amber recalibration, fully monospace body, AA across modes`

---

### Day 02 — Shell + nav (M · 3h)

**Goal:** 4 doors. Honest signs.

**Files:**
- `_data/navigation.json`
- `src/_includes/nav.njk`
- `src/_includes/footer.njk`
- `src/now.md` → `src/now.njk` (redirect, mirroring `colophon.njk`)
- `src/_includes/garden-section.njk` (delete)
- `src/index.njk` (preliminary — finishes in Day 03)

**Steps:**
1. **Rewrite `navigation.json`.**
   ```json
   {
     "primary": [
       { "label": "Home",     "url": "/" },
       { "label": "Writing",  "url": "/writing/" },
       { "label": "Projects", "url": "/projects/" },
       { "label": "Resume",   "url": "/resume/" }
     ],
     "colophon": [
       { "label": "About",   "url": "/about/" },
       { "label": "Uses",    "url": "/uses/" },
       { "label": "Links",   "url": "/links/" },
       { "label": "Garden",  "url": "https://cognitivearchitecture.ca/", "external": true },
       { "label": "Email",   "url": "mailto:hello@cognitivearchitecture.ca", "external": true },
       { "label": "RSS",     "url": "/feed.xml" }
     ]
   }
   ```
   Note the rename `secondary` → `colophon` to match the pitch's "footer colophon row" language.
2. **Update `nav.njk`** to render only `navigation.primary`. Keep the monogram site-mark.
3. **Rewrite `footer.njk`.** A single-line "colophon row" — small, mono, comma- or middot-separated. Followed by the existing `gitLastModified` "last updated" line, kbd-hint, copyright, build-stamp.
4. **Convert `now.md` → `now.njk` redirect** mirroring `colophon.njk`. Set `permalink: /now/index.html` and emit a meta-refresh + canonical to `/#now`.
5. **Delete `src/_includes/garden-section.njk`.** Day 03 inlines garden activity into the home index table.
6. **Wire `index.njk` Now block** (placeholder — Day 03 finalizes the home page). Move the `currently` content (or pull from a small `now.json` data file) into a 3-line "tended" block.

**Acceptance:**
- Primary nav renders 4 items everywhere.
- Footer renders the colophon row + last-updated + kbd-hint + copyright + build-stamp.
- `/now/` URL still resolves but redirects to home.
- `npm run build` green.

**Commit:** `feat(design): collapse nav to four doors, footer colophon row, /now/ folds into home`

---

### Day 03 — Home + writing (M · 3h)

**Goal:** Home reads like a front door. Writing reads like a hub.

**Files:**
- `src/index.njk`
- `src/writing.njk`
- `src/assets/css/components.css` (new index-table pattern)
- `src/_includes/post-card.njk` (probably retire on home; may keep on `/writing/`)

**Steps:**
1. **Rewrite `index.njk`** as the pitch describes:
   - One-line identity (`Seb Lathangue — civic tech · knowledge architecture`).
   - Now block — 3 lines, `<time class="dt-updated">tended {{ now | daysAgo }}</time>`.
   - Index table — terminal-style rows, one per:
     - Latest writing post(s)
     - Featured project (CivCitDev)
     - Garden activity (each `gardenPosts[]` entry, with its `tendedState`)
   - Contact row at the bottom: Email · Bluesky · GitHub · Garden.
2. **Add `.index-table`, `.index-row` CSS** in `components.css`. Pattern from the pitch's `.mock` styles: `display: grid; grid-template-columns: 10ch 1fr auto;` for label · description · timestamp. Quiet 1px solid `--rule` borders between rows.
3. **Rewrite `writing.njk`** so the "From the Garden" section is **first and visually heavier** (it's the body of work), and the native posts section is a small "also published natively here" section underneath, with a single bulleted list rather than card-styled `post-card.njk` invocations.
4. **Adjust `post-card.njk`** to be lighter-weight (no card chrome) when used on `/writing/` for native posts. OR retire on /writing/ in favor of inline list.

**Acceptance:**
- `/` renders identity → Now → index table → contact.
- No `<section class="garden-feature">` anywhere (the panel is retired).
- `/writing/` renders garden posts above native posts, with garden visually primary.
- `npm run build` green; tag archives (`/writing/tags/<tag>/`) still link from /writing/.

**Commit:** `feat(design): home as front door + writing reorganized to lead with garden`

---

### Day 04 — Identity + polish (S · 2h)

**Goal:** One face per role. Decoration cut where it pretends to be structure.

**Files:**
- `src/_includes/base.njk` (per-page `og:image` switching)
- `src/about.md` (remove banner)
- `src/404.md` (lock pixel portrait usage)
- `src/resume.njk` (use woodcut stamp, not pixel portrait)
- `src/_includes/post.njk` (set `ogImage` to a writing-specific image)
- `src/assets/img/favicon.svg` and `favicon.png` (regenerate from pixel portrait if not already)
- `src/assets/css/components.css` (retire `.page-banner`, `.page-illustration` if unused, `hr` moss-divider rule)
- Any leaf-drift JS/CSS on `/404/` (locate, delete)
- `src/assets/css/print.css` (one pass)

**Steps:**
1. **Lock the portrait system.** Per-page `ogImage` frontmatter (or computed in `base.njk`):
   - `/` (home) → `og-default.png` (woodcut)
   - `/about/` → `og-default.png`
   - `/resume/` → `og-default.png` and **swap `seb-stamp-pixel.png` → `seb-stamp.jpeg`** in `resume.njk` (with `class="u-photo"` for h-card).
   - `/writing/<slug>/` → new `og-writing.png` (from pixel portrait). For now, can fall back to `og-default.png` until image is created.
   - `/404/` → keep pixel portrait as the page illustration.
2. **Delete the about banner.** Remove the `<figure class="page-banner">` block from `src/about.md`. Remove `.page-banner` CSS.
3. **Retire moss-divider use, keep the file.** Remove the `<hr>` mask-image CSS rule in `base.css:131–138`. Replace with a 1px solid `--rule` rule for explicit `<hr>`. Most section breaks lose `<hr>` entirely (replaced by spacing + a quiet `border-bottom: 1px dashed var(--rule)` on `<section>` if present in templates). Keep `moss-divider.svg` in the repo as a quiet asset.
4. **Retire leaf-drift on /404/.** Locate the JS / CSS (commit `05d22fb`); delete. Verify `/404/` still renders cleanly with just the pixel portrait + wayfinding text.
5. **Print stylesheet pass.** Verify resume PDF: no banner, no nav, woodcut stamp shows in print, h-resume + h-event microformats preserved.
6. **Add `u-photo` declaration on the woodcut stamp** wherever rendered (per pitch's "IndieWeb pass with care" addition).

**Acceptance:**
- `/` source contains `og:image` → `og-default.png` (woodcut).
- `/writing/hello-indieweb/` source contains `og:image` → `og-writing.png` (or `og-default.png` until created).
- `/about/` contains no `<figure class="page-banner">`.
- `/404/` no leaf-drift; pixel portrait visible.
- `/resume/` portrait is `seb-stamp.jpeg` (woodcut) at proper size with `class="u-photo h-card-photo"` or equivalent.
- No `.page-banner` rules in CSS; no leaf-drift CSS/JS.
- `<hr>` is a 1px solid line, not a moss-divider mask.
- `npm run build` green; resume print preview still clean.

**Commit:** `feat(design): identity system locked — one rule per portrait, decoration retired`

---

## Decision points

These are content/aesthetic calls only Seb can make. Resolve before
executing the day they gate.

1. **`/now/` redirect target (gates Day 02).** Pitch says "fold into
   home." Should `/now/` be a meta-refresh redirect to `/#now` (an
   anchor within the home page), or a stub that just renders the
   3-line tended block in place with a note "tended in place on the
   home page"? The mirror of `/colophon/ → /about/` is the cleanest
   precedent — point me there or specify alternate target.

2. **Tag archives' fate (gates Day 03).** PR #10 added
   `/writing/tags/<tag>/` archives + a tag index on `/writing/`. The
   pitch reorganizes `/writing/` to lead with garden activity; the tag
   index could move to the bottom, become "browse by tag" footer line,
   or be retired entirely (only one native post currently uses tags).
   Recommend: **keep, move to bottom of /writing/ as a quiet line.**
   But it's your call.

3. **`og-writing.png` source (gates Day 04).** Pitch says pixel
   portrait → `og:writing`. The image needs to be 1200×630 with a
   recognizable composition. Do you have a pixel-portrait variant at
   that aspect ratio, or should Day 04 ship with `og-default.png` for
   writing posts and add `og-writing.png` later?

4. **Monogram inline at section starts (P5 detail).** Pitch says
   *"Monogram — inline glyph on section starts · ascii-simple, a quiet
   signature"*. Should this be the existing memento-mori skull SVG at
   small size, or a literal ascii character (`·` or `§` or `❦`)?
   Recommend: **defer.** Day 04 already has a lot. This is a tiny
   follow-up after the four afternoons.

5. **Webmention rendering visibility on the new home (gates Day 03).**
   PR #10 #13 renders received webmentions on native posts. The pitch
   home uses an index table. Decision: do received webmentions surface
   on the home Now block? Recommend: **no — keep them on the native
   post pages only**, where the pitch's structure already accommodates
   them. No change needed.

---

## Anti-goals (carried verbatim from the pitch)

- No framework change. Eleventy stays. Nunjucks stays.
- No new fonts. Plex Mono only, self-hosted.
- No JS beyond your existing three small files. Zero deps.
- No CMS, no build-time image pipeline, no new data model.
- No hand-drawn SVG illustration without existing source.
- No migration of garden content. That's a different project.

Plus, from this plan's working scope:
- No commits to `main`. Each afternoon ships as a draft PR.
- No commits while PR #10 is unmerged. **Recommend**: ship PR #10
  first; then start Day 01 from the post-merge `main` tip. Reduces
  the merge-conflict surface.
- No retroactive rewrite of PR #10's commits. The pitch retires some
  of PR #10's additions (smooth-scroll guard, View Transitions, moss
  divider use, garden section panel) — deletions land cleanly on top.

---

## Sequencing notes

- **PR #10 is currently a draft and unmerged.** Land it first, OR
  keep it in flight and rebase Day-01 work on top of `main` after
  it merges.
- The four afternoons are PR'd individually per the pitch. Use a
  branch-naming pattern like `claude/pitch-day-01-tokens`,
  `claude/pitch-day-02-nav`, etc., or `claude/pitch-v1-YYYYMMDD`.
- Update `BACKLOG.md` and `CHANGELOG.md` per the project's documented
  governance (`BACKLOG.md:84–88`) at the end of each afternoon.
- Each PR's body should reference `pitch-v1.html` so the reasoning
  trail is preserved in the GitHub UI even if the file is later
  removed from `main`.

---

## Verification

Per-afternoon acceptance gates above. Plus a few cross-cutting
checks at the end of Day 04:

1. `npm run build` clean; no Eleventy warnings, no CSS warnings.
2. **Visual diff vs `pitch-v1.html`.** Open the pitch in a browser
   alongside the local dev server. Hero, type, palette, and overall
   feel should be substantially aligned.
3. **Microformats validation.**
   `https://indiewebify.me/validate-h-card/` on home — `u-photo` on
   the woodcut stamp now declared.
   `https://indiewebify.me/validate-h-entry/` on
   `/writing/hello-indieweb/` — still passes.
4. **AA contrast.** Spot-check 5 light-mode + 5 dark-mode foreground/
   background pairs at 14px and 11px. No fails.
5. **Reduced motion.** Enable `prefers-reduced-motion: reduce`; no
   animations remain (cursor blink and live-pulse are still present
   in `components.css` — pitch doesn't explicitly retire them, but
   they're decoration-pretending-to-be-structure candidates; flag
   for Seb).
6. **Text-browser test.** `lynx http://localhost:8080/` and verify
   readability. The pitch frames this as a project value
   ("works in text browsers").
7. **Print preview.** `/resume/` prints cleanly; no nav, no banner,
   woodcut stamp visible.

---

## Critical files referenced

- `src/_includes/{base,nav,footer,post,post-card,project-card}.njk`
  (`garden-section.njk` to be deleted)
- `src/{index,projects,writing,resume,sitemap}.njk`
- `src/{now,about,uses,links,colophon,404}.md` (or `.njk`)
- `src/assets/css/{tokens,base,components,utilities,print}.css`
- `src/assets/img/{seb-stamp.jpeg, seb-stamp-pixel.png, og-default.png, og-dark.png, og-writing.png?}`
- `src/assets/img/pixel/{monogram.svg, banner-night.png, dividers/moss-divider.svg}`
- `_data/{navigation.json, gardenPosts.json}`
- `pitch-v1.html` (currently at `main:4bf9261`; reference document)
- `eleventy.config.js`

---

## Sub-agent strategy

The migration is sequenced (one PR per afternoon, not parallel days),
but *within* each afternoon there is real parallelism to harvest. The
strategy below treats each day as **three waves**: a read-only audit
wave (parallel-safe), an edit wave (file-conflict-aware), and a
verification wave (parallel-safe). Cross-cutting agents wrap the whole
sprint; PR governance agents run after each push.

### Strategy principles

1. **Audit before edit.** Every day starts with parallel `Explore`
   agents that map current state. Cheap, conflict-free, and surfaces
   unknowns that would otherwise stall an editing agent mid-flight.
2. **Group writes by file boundary.** Two agents writing the same file
   in parallel is the #1 source of merge fallout. When in doubt, fewer
   agents doing more, not more agents doing less.
3. **Read-only delegation by default.** Most useful agent runs are
   research, not authorship. Reserve `general-purpose` (write-capable)
   for the actual edit wave.
4. **Don't delegate understanding.** Synthesis of audit findings → edit
   plan stays in the main thread. Agents return *facts*; the main
   thread decides *what to do with them*.
5. **No worktree isolation needed.** Days are sequential PRs on the
   same branch lineage; worktree overhead isn't justified.

### Agent roster

| Subagent type | Role | When to use |
|---------------|------|-------------|
| `Explore` | Read-only mapper | Audit + verify waves: token usage, asset references, microformat baseline, redirect inventory, post-edit grep checks |
| `Plan` | Architect | Mid-day design questions (e.g. "where should `/now/` redirect to?", index-table copy + row order) that need structured trade-off analysis without code changes |
| `general-purpose` | Edit-capable IC | The edit wave; PR-body drafter; CHANGELOG/BACKLOG updater; pitch-faithfulness review |
| `claude-code-guide` | (unused) | Not relevant — this is site work, not Claude-tooling work |
| `statusline-setup` | (unused) | Not relevant |

### Pre-flight audit (runs once, before Day 01)

Four `Explore` agents in parallel. Read-only, zero conflict risk. Each
returns a tight inventory the main thread folds into per-day edit briefs.

| # | Agent | Returns |
|---|-------|---------|
| P1 | Token-usage mapper | Every file referencing `--accent`, `--accent-rgb`, hardcoded `#a8c47a` / `#caa97a`, ranked by occurrence |
| P2 | Asset-reference mapper | Templates + CSS referencing `banner-night.png`, `leaf-drift*`, `moss-divider*`, `og-dark.png`, plus their `<picture>` / `srcset` siblings |
| P3 | Microformat baseline | Current `h-card` / `h-entry` / `u-url` / `dt-published` coverage on `/`, `/about/`, `/writing/`, individual posts |
| P4 | Redirect + nav inventory | Existing redirects in `eleventy.config.js`, current `_data/navigation.json` shape, footer links rendered today |

### Per-day orchestration

Each day: **Wave 1 (audit, parallel)** → main-thread synthesis →
**Wave 2 (edit, file-disjoint or single)** → **Wave 3 (verify, parallel)**.

#### Day 01 — Tokens + type (S · 2h)

**Wave 1 — Audit (parallel, 2× `Explore`)**
- D1-A: Confirm Plex Mono asset paths + `@font-face` definition; flag
  whether Atkinson is referenced anywhere beyond `base.css`.
- D1-B: Locate every `scroll-behavior: smooth`, `view-transition-name`,
  and `@view-transition` declaration; return file:line list.

**Wave 2 — Edit (1× `general-purpose`, single brief)**
- One agent owns `tokens.css`, `base.css`, `components.css`. All four
  changes (rename tokens, swap font stack to Plex Mono only, add
  `--wash`, delete smooth-scroll + view-transitions) flow through one
  brief. Parallelism here would create three-way merge conflicts on the
  same files for negligible time savings.

**Wave 3 — Verify (parallel, 2× `Explore` + 1 main-thread)**
- D1-V1: Grep for any surviving `--accent`, `--font-body`,
  `--font-heading` reference.
- D1-V2: Grep for any surviving `Atkinson` / `fonts.googleapis` /
  `@view-transition` / `scroll-behavior: smooth` reference.
- Main thread: `npm run build && npm start` smoke + visual check.

#### Day 02 — Shell + nav (M · 3h)

**Wave 1 — Audit (parallel, 2× `Explore`)**
- D2-A: Map every internal link target whose URL would change after
  `/now/` is folded (`/now/` referrers across all templates + posts).
- D2-B: Inventory current footer columns + colophon link to confirm the
  "single colophon row" target shape and identify any data flows
  (e.g. `gitLastModified`, `kbd-hint`) that must survive.

**Wave 2 — Edit (parallel, 3× `general-purpose` — file-disjoint)**
- D2-E1: `nav.njk` + `_data/navigation.json` (4-door collapse).
- D2-E2: `footer.njk` (colophon row).
- D2-E3: `now.md` → `now.njk` redirect; preliminary `index.njk` Now
  block; delete `garden-section.njk`.

  These three sets are file-disjoint; parallel is safe. The only shared
  file risk is `index.njk` (D2-E3 stubs it; Day 03 rewrites it).
  Sequencing days, not agents, resolves this.

**Wave 3 — Verify (parallel, 2× `Explore`)**
- D2-V1: Confirm zero remaining `<a href="/now/">` outside the redirect.
- D2-V2: Build + crawl `_site` for 404s on internal hrefs.

#### Day 03 — Home + writing (M · 3h)

**Wave 1 — Audit (parallel, 1× `Plan` + 1× `Explore`)**
- D3-A (`Plan`): Decide the home index-table's exact row order + copy.
  The pitch dictates the *form* (table front door) but not the
  *content*; this needs a small structured design call before edits.
- D3-B (`Explore`): Confirm `gardenPosts.json` shape matches what the
  new `writing.njk` lead block expects; flag missing fields
  (`tendedState`, `dt-updated`, etc.).

**Wave 2 — Edit (parallel, 2× `general-purpose` — file-disjoint)**
- D3-E1: `index.njk` rewrite to index-table front door + new
  `.index-table` / `.index-row` CSS in `components.css`.
- D3-E2: `writing.njk` lead-with-garden refactor; lighten or retire
  `post-card.njk` usage on `/writing/`.

  Note: both touch `components.css`. Resolve by having D3-E1 own the
  index-table rules and D3-E2 only *delete* card-chrome rules.

**Wave 3 — Verify (parallel, 2× `Explore`)**
- D3-V1: Microformat re-check on `/` and `/writing/` (h-card on home,
  h-entry on writing leads).
- D3-V2: Tab-order + visible-focus walkthrough script (axe-style).

#### Day 04 — Identity + polish (S · 2h)

**Wave 1 — Audit (parallel, 1× `Explore`)**
- D4-A: Final retirement list — confirm every banner / leaf-drift /
  moss-divider / `og-dark.png` reference is removed-or-pending; nothing
  orphaned. Flag any `cursor-blink` / `live-pulse` decoration for Seb's
  call (pitch doesn't explicitly retire them).

**Wave 2 — Edit (parallel, 3× `general-purpose` — file-disjoint)**
- D4-E1: Portrait + role lock (`resume.njk`, `about.md`,
  per-page `og:image` switching in `base.njk` and `post.njk`).
- D4-E2: Asset retirement (`git rm` `banner-night.png`, leaf-drift JS;
  remove `.page-banner` CSS, `<hr>` mask-image rule, leaf-drift CSS).
- D4-E3: Print-stylesheet pass (`print.css` only).

**Wave 3 — Verify (parallel, 4× `Explore` + main-thread)**
- D4-V1: Microformat full pass (5 page types) including `u-photo` on
  woodcut.
- D4-V2: AA contrast spot-check (5 light + 5 dark pairs).
- D4-V3: `prefers-reduced-motion` audit — surface remaining animations.
- D4-V4: `lynx http://localhost:8080/` text-browser readability check.
- Main thread: print preview on `/resume/`; visual diff vs `pitch-v1.html`.

### Cross-cutting agents (run as needed across all days)

| Agent | Trigger | Why agent vs. main thread |
|-------|---------|---------------------------|
| **Build smoke** (`general-purpose`) | After every Wave 2 | Captures full `npm run build` output without flooding main context |
| **Link-integrity** (`Explore`) | After every Wave 2 | Crawls `_site` for dead internal links; returns a list, not a transcript |
| **Pitch-faithfulness review** (`general-purpose`) | Before each PR push | Reads the diff against `pitch-v1.html`'s anti-goals list; flags drift (e.g. accidental new dep, JS file added) |

### PR governance agents (post-push lifecycle)

After each `git push -u origin <branch>`, a small ritual runs:

1. **PR-body drafter** (`general-purpose`) — reads the day's commits +
   the relevant pitch section, drafts a PR body that quotes the pitch
   move it implements, lists the diff in plain language, and points
   reviewers at the verification artifacts. Output reviewed in main
   thread; never auto-posted.
2. **CHANGELOG / BACKLOG updater** (`general-purpose`) — appends one
   row per retirement (`banner-night.png`, view-transitions, etc.) and
   one row per addition (`--wash`, index-table front door); marks
   resolved BACKLOG items per the project's documented governance
   (`BACKLOG.md:84–88`).
3. **Subscribe to PR activity** — call `subscribe_pr_activity` on the
   draft PR. CI failures + review comments stream back as
   `<github-webhook-activity>` events; the main thread investigates
   each per the PR-event protocol (act / ask / skip). Ambiguous review
   comments use `AskUserQuestion`, **not** an autonomous agent.

### Anti-patterns (what NOT to delegate)

- **Token rename in parallel with font swap on the same file.** Both
  touch `base.css`; one agent, not two.
- **Whole-day delegation** ("implement Day 02"). Agents drift without
  the audit findings as scaffolding; the main thread keeps that
  context.
- **Visual / browser verification.** UI correctness can't be claimed
  from a tool transcript; main thread runs the dev server and checks
  in a real browser per the global CLAUDE.md guidance.
- **Pitch interpretation.** The pitch has voice and intent; agents
  reading it cold tend to over-literal it. Main thread decides what
  the pitch *means* before delegating *what to change*.
- **Review-comment responses on shipped PRs.** Per the PR-event
  protocol, ambiguous comments use `AskUserQuestion`.

### Estimated agent budget

| Phase | Audit | Edit | Verify | Governance | Runs |
|-------|-------|------|--------|------------|------|
| Pre-flight | 4 | — | — | — | **4** |
| Day 01 | 2 | 1 | 2 | 2 | **7** |
| Day 02 | 2 | 3 | 2 | 2 | **9** |
| Day 03 | 2 | 2 | 2 | 2 | **8** |
| Day 04 | 1 | 3 | 4 | 2 | **10** |
| **Total** | **11** | **9** | **10** | **8** | **38** |

Roughly 38 agent runs across the sprint, ~80% read-only. Bounded,
auditable, parallel where it actually helps, single-author where
file boundaries demand it.
