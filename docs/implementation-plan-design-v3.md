# Implementation Plan — Design v3: One Voice, Many Rooms

| Field | Value |
|-------|-------|
| Date | 2026-07-23 |
| Status | Plan — ready to execute. Three defaults Seb can override (§2); nothing blocks on them |
| Baseline | PR #20 head `75cbbdd` (assumes #20 merges first; see Phase 0) |
| Supersedes | `docs/implementation-plan-design-v2.md` (executed in PR #20; verdict below) |
| Inputs read | PR #20 comments 1–5 (the handoff ledger), `docs/pitch-v1.html` (full text), `docs/design-fusion-plan.md`, the three `docs/design-reference-*.md`, current branch state |
| Audience | Written so any agent or human can execute it without re-deriving context. Every phase names exact files, exact code, acceptance checks, and a commit message |

---

## 0. Diagnosis — why v2 missed

Seb's verdict on the v2 result: **"too simple and repetitive"** and "not what
I had in mind." Taking that seriously, the failure is structural, not a
matter of a few missing classes:

1. **The pitch has two halves; v2 shipped one.** The pitch's *subtractive*
   half (collapse nav, go monospace, recalibrate palette, home as index
   table) shipped in May. Its *compositional* half mostly never did:
   - the **monogram "section stamp"** — "returns as a recurring section
     stamp at the start of each page title block — two characters of ink"
     (pitch, Move 05) — parked twice as "optional";
   - the **mono wordmark** — "S·L / seb the canadian — wordmark / mono —
     footer · print · cli" (pitch identity table) — never built;
   - the **⌂ home glyph** — "nav · 404 · crumbs" (same table) — never built;
   - the **type specimen's moss H2** — "H2 · 1.35rem · 600 · **moss**" —
     h2s are still ink-colored;
   - the **garden panel's visual weight** on /writing/ — only landed in
     `75cbbdd`, after the complaint;
   - **per-post OG images** — "Later, if wanted" list, still open.
2. **Utilities without applications.** v2 shipped `.lede` with zero call
   sites and `.eyebrow` with one. A class that renders nowhere changes
   nothing; the preview looked identical because it mostly was.
3. **One pattern everywhere.** `.index-table` — designed as the *home*
   page's device — became the answer on home, writing, and tag pages.
   Repetition is the direct result: pages differ in content but not in
   composition.
4. **The refusal filter over-rotated.** Fusion-plan Part D declined every
   high-contrast compositional device. One of those refusals — the dark
   "punctuation block" — was observed independently on two reference
   sites, and this site has a *diegetic* justification for it the
   reference sites lacked (§2, D1). Declining it as a "dark hero" misread
   the pattern: a hero is a landing moment; a punctuation block is a
   mid-page shift that returns.

**The v3 thesis: one voice, many rooms.** Keep the voice absolutely —
tokens, Plex Mono, microformats, the terminal register. Give every page
its own *composition*: a shared title-block system so the site coheres,
plus at least one page-specific device so no two pages feel like the same
template. The garden gets its own weather.

Target composition per page:

| Page | Shared system | Its own device |
|------|--------------|----------------|
| Home | title block (identity line variant) | index table (its original, rightful home) + garden rows in night panel |
| /writing/ | title block | garden-at-night panel (primary) vs. plain native list (secondary) — the hub/destination hierarchy, now visible |
| /projects/ | title block | project cards (existing) + CivCitDev intro as lede |
| /resume/ | title block (portrait variant, existing header) | ruled uppercase section headers + tabular dates (pitch spec, unshipped) |
| /about/ | title block | woodcut float (shipped) + pull-line (shipped) |
| /uses/, /links/ | title block | lede + eyebrow'd section groupings |
| tag pages | title block (compact) | index table (appropriate here — it lists) |
| 404 | pixel art (existing) | ⌂ home glyph on the way out |

---

## 1. Constitution and precedence

Where documents disagree, this is the order of authority:

1. **Seb's direct feedback** (latest wins): "too simple and repetitive";
   "integrate the still-open backlog ideas, not just leave them as a
   list"; favicon = clean tree (resolved — pixel conifer, do not reopen).
2. **`docs/pitch-v1.html`** — the approved direction. Its Backout fence
   still stands with one scoped exception explicitly made in §2 D1.
3. **`DESIGN_PRINCIPLES.md`** gates (convivial / IndieWeb / sustainable /
   accessible) — every phase below must pass all four.
4. The fusion plan / reference docs — advisory history, not law.

Hard constraints that survive v3 unchanged: no new fonts, no JS beyond
the existing small files, no framework/data-model changes, no non-diegetic
animation, microformats and feed untouched, AA contrast for all new text
pairings, everything legible in a text browser.

---

## 2. Decisions — defaults applied unless Seb overrides

**D1 — The garden gets its own weather (revives one Part D refusal).**
Garden sections (the panel on /writing/ and the garden rows on home)
render as **forest-at-night blocks**: the site's own dark-mode tokens,
scoped to that section, in both themes. Rationale: the site's two moods
are already named "warm parchment" and "forest at night," and the garden
*is the forest* — a dark block for exactly and only the garden content is
diegetic in a way neither reference site could claim. It is not a dark
hero (the fence the pitch's Backout drew): it sits mid-page, bounded, and
the page returns to parchment after. Every color pair inside it is the
already-shipped, already-AA dark theme. **Default: build (Phase 2).**
Recorded as a scoped reversal of the fusion plan's Part D refusal, with
this rationale, in BACKLOG (Phase 7).

**D2 — The monogram stamp is text, not an asset.** Pitch Move 05 says
"two characters of ink." Build it as a styled `S·L` text span in the
title block — no SVG to design, no asset pipeline, perfectly ASCII,
resurrection of `monogram.svg` unnecessary. **Default: build (Phase 1).**

**D3 — H2s go moss, site-wide.** Straight from the pitch type specimen
("H2 · 1.35rem · 600 · moss"). Moss on parchment measures ~4.5:1 at
1.35rem/600 — AA for large text with margin. This single rule adds a
second color voice to every content page at zero structural cost.
**Default: build (Phase 1).**

**Owner-only (no default, untouched by v3):** the Now-block voice
rewrite and the philosophy-line-in-home-copy — both already on BACKLOG's
Owner TODOs. Executors: do not draft this copy; point Seb at the BACKLOG
lines.

---

## 3. Working in this repo (read before Phase 1)

```bash
npm ci                       # fresh containers have no node_modules
npm run build                # Eleventy → _site/; must exit 0 before every commit
git checkout -- _data/       # ALWAYS after local builds — sandboxed fetches
                             # can clobber committed data snapshots
```

- Every PR runs `pr-check.yml` (build + non-empty `gardenPosts.json` +
  core outputs exist). Keep it green; it is the merge gate.
- Stage explicit file lists (`git add <files>`), never `git add -A` —
  history includes an incident where a clobbered snapshot was swept into
  a commit.
- One branch for the whole of v3: `feat/design-v3`, cut from `main`
  **after PR #20 merges**. One commit per phase, messages given below.
  Draft PR on completion of Phase 1 (don't wait for all phases).
- Verify visually in both themes: `npx @11ty/eleventy --serve` or open
  `_site/*.html` directly; emulate `prefers-color-scheme` and
  `prefers-reduced-motion` in devtools.

---

## Phase 0 — Baseline

1. **Merge PR #20** (all its pieces are keepers and v3 builds on them:
   animations, portrait, favicon, JSON-LD, editorial classes, docs,
   `75cbbdd`'s lede applications + garden panel). If Seb prefers not to
   merge yet, cut `feat/design-v3` from `origin/feat/design-v2` instead —
   every step below works identically.
2. Close **PR #17** (superseded — its docs landed inside #20) and
   **PR #19** (its v2 plan doc landed inside #20; this v3 doc replaces it).
3. `git checkout -b feat/design-v3 origin/main && npm ci && npm run build`
   — confirm green before touching anything.

**Acceptance:** clean branch, green baseline build.

---

## Phase 1 — The title-block system (masthead + stamp + moss H2s)

The shared entrance every page walks through. This is the single biggest
antidote to "repetitive": today most pages open with a bare `<h1>`.

### 1a. New include — `src/_includes/masthead.njk`

```njk
{#-
  masthead.njk — page title block (design-v3 Phase 1).
  Usage:  {% set mastheadLabel = "writing/" %}{% include "masthead.njk" %}
  Reads: mastheadLabel (eyebrow text, required), title (page front
  matter), mastheadLede (optional lede paragraph, HTML allowed).
  The S·L stamp is the pitch's Move 05 "section stamp": two characters
  of ink at the start of each page title block.
-#}
<header class="masthead">
  <p class="masthead__meta">
    <span class="masthead__stamp" aria-hidden="true">S&middot;L</span>
    <span class="eyebrow">{{ mastheadLabel }}</span>
  </p>
  <h1 class="masthead__title">{{ title }}</h1>
  {%- if mastheadLede %}
  <p class="lede">{{ mastheadLede | safe }}</p>
  {%- endif %}
</header>
```

### 1b. CSS — append to `src/assets/css/components.css`

```css
/* ── Masthead — shared page title block (design-v3 Phase 1) ──────────────
   The pitch's Move 05 section stamp ("two characters of ink") plus the
   eyebrow, above every page h1. Home keeps its identity-line variant. */
.masthead {
  margin-block-end: var(--space-xl);
}
.masthead__meta {
  display: flex;
  align-items: baseline;
  gap: 1ch;
  margin-block-end: var(--space-xs);
}
.masthead__stamp {
  font-family: var(--mono);
  font-weight: 700;
  font-size: var(--text-sm);
  color: var(--moss);
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  padding: 0 0.5ch;
  user-select: none;
}
.masthead__title {
  margin-bottom: var(--space-sm);
}
```

### 1c. Site-wide moss H2 (D3) — edit `src/assets/css/base.css`

In the existing `h2` rule (base.css ~line 46), add one line and adjust
size to the pitch specimen:

```css
h2 {
  font-size: 1.35rem;            /* was var(--text-2xl) = 1.5rem; pitch specimen value */
  font-weight: 600;
  color: var(--moss);            /* pitch type specimen: "H2 · 1.35rem · 600 · moss" */
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-md);
}
```

Exception: `.resume-section h2` gets its own treatment in Phase 3 and
overrides this. `.eyebrow` on an h2 (home Now) also overrides via class
specificity — verify it still renders as the small moss label.

### 1d. Apply the masthead

Replace the bare `<h1>` opening of each page. Current first lines are
quoted so the edit is unambiguous:

| File | Replace | With |
|------|---------|------|
| `src/writing.njk` | `<h1>Writing</h1>` + the `.lede` p below it | `{% set mastheadLabel = "writing/" %}{% set mastheadLede %}Writing originates in the garden at <a href="https://cognitivearchitecture.ca/">cognitivearchitecture.ca</a>. Native posts here are rare &mdash; this page is a hub, not a destination.{% endset %}{% include "masthead.njk" %}` |
| `src/projects.njk` | `<h1>Projects</h1>` | masthead, label `projects/`, lede: move the existing CivCitDev intro sentence up as `mastheadLede` (delete the now-empty first `.section` wrapper if nothing else remains in it) |
| `src/about.md` | `# About` | masthead include via a raw-HTML block, label `about/` (markdown files can include with `{% include %}` since Nunjucks processes .md here — verify; if not, inline the masthead HTML directly, same markup as 1a) |
| `src/uses.md` | `# Uses` (or current h1) | masthead, label `uses/`, lede = existing intro line "Tools, hardware, and software that I use regularly. Updated periodically." |
| `src/links.md` | `# Links` (or current h1) | masthead, label `links/`, lede = existing intro "A blogroll — people, projects, and corners of the web worth following." |
| `src/resume.njk` | keep the existing `.resume-header` (portrait + identity is already a stronger masthead); add only `<p class="masthead__meta"><span class="masthead__stamp" aria-hidden="true">S&middot;L</span><span class="eyebrow">resume/</span></p>` above it |
| `src/writing/tags.njk` | `<h1>Posts tagged <code>#{{ tag }}</code></h1>` | compact variant: stamp + eyebrow `writing/tags/` above the existing h1 (keep the h1 — its dynamic content doesn't fit the include's `title` param) |
| `src/index.njk` | no masthead — the identity line IS home's title block. Add only the stamp: `<span class="masthead__stamp" aria-hidden="true">S&middot;L</span>` as the first child of `.identity`, before the `p-name` |

Do **not** put the stamp anywhere else on a page — once per page, in the
title block, per the pitch ("a quiet signature," not a pattern fill).

**Acceptance (Phase 1):**
- Every page in the table opens with stamp + eyebrow label (view-source
  or grep `masthead__stamp` in `_site/**/index.html` — expect 8+ pages).
- All h2s render moss in both themes; the Now eyebrow still renders as
  the small label, not a full-size moss h2.
- No page has two `<h1>`s (`grep -c "<h1" _site/**/index.html` — each ≤1).
- Microformats intact: h-card on home unchanged (stamp is aria-hidden,
  outside `.p-name`).
- `npm run build` green.

**Commit:** `design(v3): title-block system — S·L section stamp, masthead include, moss H2s site-wide`

---

## Phase 2 — The garden gets its own weather (D1)

### 2a. CSS — append to `src/assets/css/components.css`

The panel re-scopes the site's own dark-theme tokens locally, so every
existing child component (index rows, pills, links) restyles itself with
zero markup changes and zero new color pairs to audit — the pairs ARE the
shipped dark theme:

```css
/* ── Night panel — the garden's own weather (design-v3 Phase 2, D1) ──────
   Scoped forest-at-night block for garden content only. Re-declares the
   theme tokens locally: in light mode the panel is the dark theme in
   miniature; in dark mode it deepens one step and keeps a moss edge.
   NOT a hero, NOT for non-garden content — see BACKLOG reversal note. */
.panel--night {
  --bg: #0f1a14;
  --ink: #e8e4dc;
  --muted: #a8a195;
  --moss: #6bb896;
  --amber: #d9b24a;
  --rule: #2a3a30;
  --link: #8eba9e;
  --visited: #a89bb0;
  --code-bg: #182720;
  --wash: color-mix(in oklab, var(--moss) 8%, transparent);
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  padding: var(--space-md) var(--space-lg);
}
@media (prefers-color-scheme: dark) {
  .panel--night {
    --bg: #0a120e;             /* one step deeper than the page */
    border-color: var(--moss);
  }
}
```

Check `tokens.css` for the dark-mode `--visited` and `--code-bg` values
and mirror them exactly (the values above are from the light-mode block's
dark counterparts — verify against `tokens.css` ~lines 88–100 before
committing; the panel must be *identical* to the real dark theme, not an
approximation).

### 2b. Apply

- `src/writing.njk`: the garden section already has
  `class="index-table garden-panel"` (from `75cbbdd`). Change to
  `class="index-table garden-panel panel--night"`. Then **retire the old
  `.garden-panel` rule** in components.css (moss border + wash tint) —
  the night panel replaces it; delete the rule and remove the class if
  nothing else uses it, or keep `.garden-panel` as the semantic hook and
  move its styles into `.panel--night`. Prefer the latter: one class in
  markup (`garden-panel`), styled as the night panel.
- `src/index.njk`: wrap the garden rows (the `{%- if gardenPosts.length > 0 %}`
  block, including the "more in the garden →" row) in
  `<div class="index-table garden-panel">…</div>` and hoist it out of the
  main `.index-table` so home reads: identity → Now → writing row →
  **night garden block** → project rows → contact row. The writing/
  project/contact rows stay in the parchment index table; only the
  garden block goes night. Keep row markup identical inside.

### 2c. Guard rails

- The panel never contains an `<h1>` and never appears above the
  identity line / masthead — it is punctuation, not a hero.
- If theme-toggle JS exists beyond `prefers-color-scheme` (check
  `src/assets/js/` — a `theme-toggle` button is referenced in CSS), the
  panel's token override must also win under the toggle's mechanism
  (e.g. `[data-theme="dark"] .panel--night` if the toggle stamps a
  `data-theme` attribute — replicate the `@media` override for that
  selector). Verify by toggling, not by assumption.

**Acceptance (Phase 2):**
- /writing/: garden panel renders dark-on-parchment in light mode, deeper
  + moss-edged in dark mode; native posts list below stays parchment.
- Home: garden rows sit in the night block; other rows unchanged.
- Pills, links, dates inside the panel are legible both themes (they use
  the dark theme's own shipped pairs — spot-check `index-pill` amber).
- Text-browser check: `lynx -dump` (or curl + strip tags) still reads in
  correct order — the panel is pure CSS, DOM order unchanged.
- `npm run build` green.

**Commit:** `design(v3): the garden gets its own weather — scoped night panel on writing + home garden sections`

---

## Phase 3 — Resume finish (unshipped pitch scope)

From the pitch's Resume screen spec, surfaced in PR #20's handoff
(comment 2/5), with the token substitution it recommends (`--moss-2` was
never adopted; `--link` is the closest shipped token):

### 3a. CSS — append to `src/assets/css/components.css`

```css
/* ── Resume — ruled section headers + tabular dates (pitch spec) ───────── */
.resume-section h2 {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--link);
  border-bottom: 1px solid var(--rule);
  padding-bottom: var(--space-xs);
}
.resume-entry .dates {
  font-variant-numeric: tabular-nums;
}
```

(`.resume-section h2` overrides Phase 1's site-wide moss h2 — intended.)

### 3b. Print pass

Open print preview on `/resume/` (or `npx playwright` PDF if headless):
confirm the new headers render at Letter and A4, `print.css` still hides
`.kbd-hint`/`.footer-meta`/`.build-stamp`/`.masthead__stamp` (add
`.masthead__meta` to print.css's hide list — the stamp/eyebrow is site
chrome, not resume content), and the Download PDF button stays `no-print`.

**Acceptance:** headers uppercase/ruled in both themes; dates align in
columns; print preview clean at both paper sizes.

**Commit:** `design(v3): resume ruled section headers + tabular dates — original pitch spec, print-verified`

---

## Phase 4 — Footer signature (wordmark + home glyph)

From the pitch's identity table: "S·L / seb the canadian — wordmark /
mono — footer · print · cli" and "⌂ — home glyph — nav · 404 · crumbs."

### 4a. `src/_includes/footer.njk`

Replace the bare `<p>&copy; {{ site.author }}</p>` line with:

```njk
<p class="wordmark"><span aria-hidden="true">S&middot;L</span> &copy; {{ site.author }} &middot; <span class="wordmark__site">seb the canadian</span></p>
```

CSS (components.css):

```css
.wordmark {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;      /* pitch label spec: 11px · tracking +0.15 */
  color: var(--muted);
}
.wordmark__site { text-transform: lowercase; }
```

### 4b. ⌂ on 404

In `src/404.md`, the back-to-home link gains the glyph:
`<a href="/">⌂ back home</a>` (adjust to the file's existing link text —
prepend the glyph, keep the wording). No nav change: the primary nav's
"Home" item stays a word, not a glyph (four honest signs; the glyph is
for terminal moments like 404, per "nav · 404 · crumbs" — there are no
crumbs, and the nav already says Home).

**Acceptance:** footer carries the wordmark on every page at 11px muted;
404 link shows ⌂; print hides nothing new (footer already hidden in print
— verify).

**Commit:** `design(v3): footer wordmark + 404 home glyph — pitch identity table, rows 3 and 5`

---

## Phase 5 — Per-post OG cards (`og-writing.png`)

Closes the tooling gap from handoff comment 5/5. The executor environment
needs Python 3 + Pillow + fontTools + brotli (this session has them; CI
does not need them — the asset is committed, generation is manual+rare).

### 5a. Commit the generator — `scripts/generate-og.py`

Full script (committed so "anyone could follow"):

```python
#!/usr/bin/env python3
"""Generate OG cards in the site's pixel dialect.

Usage:  python3 scripts/generate-og.py            # writes og-writing.png
Regenerate whenever tokens or the identity mark change.
Requires: pillow, fonttools, brotli  (pip install pillow fonttools brotli)
"""
import io
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

MOSS = (63, 122, 95); INK = (21, 32, 26); MUTED = (89, 82, 73)
BG = (245, 242, 235); RULE = (212, 207, 197); LINK = (42, 107, 74)
# 12-cell pixel-grid conifer: (row, x_start, width) — matches favicon.svg
ROWS = [(1,5,2),(2,4,4),(3,3,6),(4,4,4),(5,3,6),(6,2,8),(7,1,10),(8,5,2),(9,5,2)]

def font(name, size):
    f = TTFont(f"src/assets/fonts/{name}.woff2"); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)

def tree(d, ox, oy, u, color):
    for y, xs, w in ROWS:
        d.rectangle([ox+xs*u, oy+y*u, ox+(xs+w)*u-1, oy+(y+1)*u-1], fill=color)

def center(d, W, text, fnt, y, fill):
    d.text(((W - d.textlength(text, font=fnt)) / 2, y), text, font=fnt, fill=fill)

W, H = 1200, 630
img = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(img)
u = 14; ox = (W - 12*u) // 2
tree(d, ox, 40, u, MOSS)
center(d, W, "writing/", font("IBMPlexMono-SemiBold", 28), 254, MOSS)
center(d, W, "Seb (the Canadian)", font("IBMPlexMono-Bold", 58), 330, INK)
center(d, W, "Notes from the front door · garden at cognitivearchitecture.ca",
       font("IBMPlexMono-Regular", 27), 430, MUTED)
d.line([(260, 512), (940, 512)], fill=RULE, width=2)
center(d, W, "sebthecanadian.ca", font("IBMPlexMono-SemiBold", 26), 542, LINK)
img.save("src/assets/img/og-writing.png", optimize=True)
print("wrote src/assets/img/og-writing.png")
```

Run it; confirm the output is <100 KB and visually matches
`og-default.png`'s layout with the `writing/` eyebrow distinguishing it.

### 5b. Wire-up — `src/_includes/base.njk` + `src/_includes/post.njk`

base.njk already uses an `ogImage or '/assets/img/og-default.png'`
pattern (verify the exact line via `grep -n ogImage src/_includes/base.njk`).
Add to **`src/_includes/post.njk`'s front matter** (top of file, it has
`layout: base.njk` only):

```yaml
---
layout: base.njk
ogImage: /assets/img/og-writing.png
---
```

Data-cascade check: a per-post `ogImage` in post front matter must still
win over the layout's value (page > layout in Eleventy's cascade —
verify by adding a dummy override locally, then remove it).

**Acceptance:** `grep og:image _site/writing/hello-indieweb/index.html`
shows `og-writing.png`; home/about still show `og-default.png`; asset
committed; script committed and re-runnable.

**Commit:** `feat(og): per-post OG card in the pixel dialect + committed generator script`

---

## Phase 6 — Application pass (make every utility earn its render)

Sweep the site so no class ships unapplied (v2's core process failure):

1. `.lede` — now applied on: About, Writing, Projects (75cbbdd), Uses,
   Links (Phase 1 mastheads). Confirm with
   `grep -rc 'class="lede"' _site/ | grep -v ':0'` → 5+ pages.
2. `.eyebrow` — applied on: home Now + every masthead (Phase 1). The two
   section h2s that carry label-like text get it too:
   `src/writing.njk`'s `<h2>From the Garden</h2>` →
   `<h2 class="eyebrow">From the Garden</h2>` and the native-posts h2
   (`Also published natively here` or current wording) likewise —
   inside the night panel the eyebrow renders night-moss automatically.
3. `.pull-line` — one application exists (About). Do not add more without
   content that earns it; one is correct.
4. Dead-check everything: for each of
   `masthead|panel--night|wordmark|lede|eyebrow|pull-line|about-portrait|live-dot`,
   `grep -c` in `_site/` CSS **and** at least one HTML file. A selector
   with zero HTML hits fails this phase.

**Acceptance:** the grep table above, all non-zero; build green.

**Commit:** `design(v3): application pass — every shipped class renders somewhere real`

---

## Phase 7 — Governance close

1. **BACKLOG.md:**
   - Record the **scoped Part D reversal** under the neilwengerd Idea
     section, replacing the earlier "Declined" line for the punctuation
     block: "Reversed 2026-07-23 (design-v3, owner feedback 'too simple
     and repetitive'): shipped as the scoped `.panel--night` garden
     treatment — diegetic (the garden IS the forest at night), bounded,
     never a hero. Other Part D refusals stand."
   - Check off: monogram/section stamp (shipped as text stamp — update
     the Pitch v1 Follow-ups line), og-writing.png, resume headers.
   - Add `## Done — Design v3 (2026-07-23)` section listing the phases.
   - Keep the content-gated ledger (below) as its own subsection.
2. **CHANGELOG.md:** `## 2026-07-2X — Design v3 (one voice, many rooms)`
   entry: masthead system, night panel, resume finish, footer wordmark,
   og-writing, application pass. Note the v2→v3 diagnosis in one line.
3. **DESIGN_BRIEF.md annotation block:** append one line: "Design v3
   (2026-07): title-block stamp system, garden night-panel (scoped
   Part D reversal), pitch resume/footer/OG specs completed."
4. **This file:** update Status to "Executed" with the commit list.

**Commit:** `docs(v3): governance close — Part D reversal recorded, backlog/changelog/brief reconciled`

---

## Ledger A — Content-gated (do NOT build; triggers, from PR #20 handoff)

Carried forward verbatim in substance; an executor should re-check the
trigger, not the reasoning:

| Item | Trigger | Ready spec |
|------|---------|-----------|
| Category axis on posts | ≥3–4 native posts exist (today: 1) | `category:` front matter + pill next to date, `.index-pill` language |
| Featured pull-quote | first real webmention arrives (`_data/webmentions.json` ≠ `{}`) or Seb names a garden excerpt | one oversized quote + figcaption attribution among smaller ones |
| Disabled social link | a profile actually goes inactive (today: all 4 active) | `"disabled": true` in profiles.json + muted modifier in the two profile loops |
| Breadcrumbs ("You are here") | Seb explicitly asks for breadcrumbs at all | separate design task; do not bundle |
| Uses hardware section | Seb writes it (Owner TODO) | — |
| Second native post | Seb has something to say (Owner TODO) | pipeline ready |

## Ledger B — Still refused (Part D minus the reversal)

Echo ghost-text · metaphor nav labels · numbered process cards ·
plain-text client list · contextual button contrast · Taxi.js-style
transitions · analytics. Reasons stand as recorded in BACKLOG /
fusion-plan Part D. Revisit only on owner request or when a page exists
for them to serve.

---

## Global verification (run after the last phase, before the PR leaves draft)

```bash
npm run build && echo OK
git checkout -- _data/
# one h1 per page
for f in $(find _site -name index.html); do c=$(grep -c "<h1" $f); [ "$c" -le 1 ] || echo "FAIL $f"; done
# masthead present on content pages
grep -rl "masthead__stamp" _site --include=index.html | wc -l   # expect ≥8
# night panel scoped to garden only
grep -rl "panel--night\|garden-panel" _site --include=index.html # expect exactly: /, /writing/
# JSON-LD still valid (Phase 20 regression guard)
python3 - <<'EOF'
import json,re
for p in ["_site/index.html","_site/about/index.html","_site/writing/index.html","_site/writing/hello-indieweb/index.html"]:
    m=re.search(r'application/ld\+json">(.*?)</script>',open(p).read(),re.S)
    json.loads(m.group(1)); print("ok",p)
EOF
# feed + sitemap intact
python3 -c "import xml.dom.minidom as x; x.parse('_site/feed.xml'); x.parse('_site/sitemap.xml'); print('xml ok')"
```

Manual: both themes on every page; reduced-motion freezes blink + pulse;
print preview of /resume/; lynx-style dump of / and /writing/ reads in
order; favicon/OG unchanged from #20 (resolved, not reopened).

## Definition of done

Every page opens through the shared title block and owns at least one
device no other page has; the garden is visibly a different place; every
shipped class renders on a real page; the pitch's identity table is fully
built (woodcut/pixel/stamp/wordmark/glyph each in its named role); the
gated ledgers are current; and Seb's morning review finds a site that
reads composed, not repetitive.
