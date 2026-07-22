# Design Fusion Plan: Same Soul, Finished Edges

| Field | Value |
|-------|-------|
| Date | 2026-07-22 |
| Author | Claude (design reference + brainstorm session) |
| Sources | `pitch.html` (approved direction, from `design_handoff_sebthecanadian_redesign.zip`); `docs/design-reference-yepsen.md`; `docs/design-reference-neil-wengerd.md`; `docs/design-reference-henry-codes.md` |
| Status | Plan — advisory; no code changes made by this review |
| Scope | Finish the approved pitch's unshipped scope, repair drift since the last sprint, and selectively adopt external patterns that survive a compatibility filter against `DESIGN_PRINCIPLES.md` |
| Predecessor plan | `docs/pitch-v1-migration-plan.md` (2026-05-01) |
| Predecessor sprint | "Pitch v1 Design Sprint" (2026-05-02) — see `BACKLOG.md` / `CHANGELOG.md` |

---

## Context

This plan is a fusion of two review threads from the same conversation:

1. **The approved pitch.** `pitch.html`'s own thesis is *"Same soul, sharper edges"* — the same phrase `BACKLOG.md` uses to title the sprint that already shipped most of it. Auditing the live site against the pitch's five "concrete moves" found four fully shipped and one (**Move 05 — Identity**) left unfinished, plus two small pieces of drift that happened *because* of the sprint's own changes.
2. **Three external design reviews.** `yepsen.net`, `neilwengerd.com`, and `henry.codes` were each reviewed as outside inspiration and logged to their own `docs/design-reference-*.md` files with paired `BACKLOG.md` "Idea" sections. Not all of those ideas are compatible with this site's own approved direction — `pitch.html` has an explicit "Backout" section (no dark hero, no big animated portrait, no cursor trail, "no animation that isn't diegetic") that several of the external patterns would violate outright.

This document is what's left after filtering the second thread through the first: **finish what was approved, repair what broke by accident, adopt what survives the filter, and explicitly refuse what doesn't** — rather than silently ignoring the external reviews or uncritically importing them.

---

## Status check: the five approved moves, as actually shipped

| Move | Spec | Status | Evidence |
|------|------|--------|----------|
| 01 — Nav collapse | 4 primary doors + colophon | ✅ Shipped | `_data/navigation.json` matches exactly |
| 02 — Typography | Fully monospace, 15.5px/1.62 | ✅ Shipped | `base.css` body rule; `BACKLOG.md` Day 01 |
| 03 — Home as index table | Identity + Now + index rows | ✅ Shipped | `index.njk`, `.index-table`/`.index-row` in `components.css` |
| 04 — Palette recalibration | `--moss: #3f7a5f`, `--wash`, AA fixes | ✅ Shipped | `tokens.css` matches pitch values exactly |
| 05 — Identity system | Woodcut = human-scale, pixel = system-scale, one rule each | ❌ **Not shipped** | See below |

**Move 05 in detail — what the spec asked for vs. what exists:**

| Role | Spec'd location | Actual |
|------|------------------|--------|
| Woodcut stamp (human-scale) | About, Resume, default OG | Resume only. About's banner was removed (Day 04) and nothing replaced it. |
| Pixel portrait (system-scale) | Favicon, writing OG, 404 | 404 uses pixel art ✅. Favicon is a **maple leaf** (a later, separate decision — see `25a47b7`), not the pixel portrait the spec names. |
| Inline monogram glyph | Section starts, "a quiet signature" | Never built. No `monogram` references exist anywhere in `src/`. |

**Two pieces of drift, caused by the sprint itself:**

- `pitch.html`'s own Interactions section says to *keep* the `.hero h1::after` cursor-blink and the nav's `a[href="/now/"]::after` live-pulse dot, calling them "small, purposeful." Both selectors are now dead: Day 03 replaced the `.hero`/`h1` structure with the `.identity` paragraph, and folding `/now/` into home removed the nav link the pulse dot was attached to. The animations still exist in `components.css` — `CHANGELOG.md` already flags the live-pulse one as "cleanup-eligible" — but neither fires.
- `about.md`'s own "How this site is built" section still says *"Fonts: IBM Plex Mono (headings + code) + system font stack (body)"* — inaccurate since Move 02 already moved body text to Plex Mono too.

---

## Part A — Repairs (not redesign)

These restore what the approved pitch already asked for; they are not new scope.

### A1. Reattach the cursor-blink to the identity line

There's no `.hero`/`h1` on home anymore — the closest equivalent is `.identity .p-name` (the "Seb Lathangue" name in the front-door identity line).

**File:** `src/assets/css/components.css`

```css
/* was: .hero h1::after */
.identity .p-name::after {
  content: "█";
  color: var(--moss);
  margin-left: 0.1em;
  animation: cursor-blink 1.2s step-end infinite;
  font-weight: 400;
}

@media (prefers-reduced-motion: reduce) {
  .identity .p-name::after {
    animation: none;
    opacity: 0.5;
  }
}
```

### A2. Reattach (and improve) the live-pulse dot

The old target was a nav link that no longer exists. The better home for a "this is current" signal is the **Now block's own timestamp** on the home page — which is actually a stronger fit for the animation's original intent than a generic nav item was.

**File:** `src/index.njk` — add a dot before the existing "Tended" timestamp:

```njk
<p class="post-meta">
  <span class="live-dot" aria-hidden="true"></span>
  <time class="dt-updated" datetime="2026-05-01">Tended {{ "2026-05-01" | daysAgo }}</time>
</p>
```

**File:** `src/assets/css/components.css`

```css
/* was: nav[aria-label="Primary"] a[href="/now/"]::after */
.live-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 0.6ch;
  vertical-align: middle;
  background: var(--moss);
  border-radius: 50%;
  animation: live-pulse 2.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .live-dot { animation: none; }
}
```

Delete the old dead selector block once this is confirmed working.

### A3. Fix the stale About copy

**File:** `src/about.md` — under "Stack":

```diff
- **Fonts:** IBM Plex Mono (headings + code) + system font stack (body)
+ **Fonts:** IBM Plex Mono (headings, body, and code) — self-hosted, one family throughout
```

---

## Part B — Finish Move 05 (Identity system)

### B1. Woodcut portrait on About

Mirror the exact pattern already used on Resume (`src/resume.njk`), at human scale — not a banner:

**File:** `src/about.md` — add near the top, before or beside the intro paragraph:

```html
<figure class="about-portrait">
  <img class="u-photo" src="/assets/img/seb-stamp.jpeg" alt="Woodcut portrait of Seb Lathangue" />
</figure>
```

**File:** `src/assets/css/components.css` — new rule, capped small (this is the pitch's "human-scale" instruction, not a hero image):

```css
.about-portrait {
  width: 140px;
  margin: 0 0 var(--space-lg);
}
.about-portrait img {
  width: 100%;
  border-radius: var(--radius-sm);
}
@media (min-width: 640px) {
  .about-portrait {
    float: left;
    margin-inline-end: var(--space-lg);
  }
}
```

### B2. Decide the favicon story — **needs Seb's call, not a silent decision**

Two honest options, not a default:

- **(a) Revert to the pixel portrait**, matching the original Move 05 spec exactly (favicon = system-scale mark).
- **(b) Keep the maple leaf and amend the spec** — document it as the resolved favicon role instead of the pixel portrait, since it ties directly to "the Canadian" identity in a way a generic pixel portrait doesn't. This is the recommendation, but it's a content/brand call, not a CSS one, so it belongs to Seb.

Whichever is chosen, update the "Identity system" row in this plan and in `pitch.html`'s own Move 05 language (or a short note in `docs/colophon`-equivalent content) so the resolved rule is written down somewhere — the whole point of Move 05 was "one rule for the mark," and right now that rule only exists in an unshipped pitch document.

### B3. Inline monogram glyph — optional, not required

The spec's "S·L inline glyph at section starts" is the least load-bearing part of Move 05. Treat as a stretch goal only if B1 and B2 land and there's appetite for more — it adds a new visual element with no functional problem behind it, unlike A1/A2/B1.

---

## Part C — Selective borrows (filtered against `DESIGN_PRINCIPLES.md`)

Each of these already appears in one of the three `docs/design-reference-*.md` backlogs; they're repeated here only because they passed the compatibility check — no new fonts, no new JS, no non-diegetic animation, no departure from the "dense, legible, quiet" register.

### C1. `schema.org` JSON-LD

Pure metadata, zero visual change, explicitly sanctioned by the site's own "human-first, machine second" principle (from `DESIGN_PRINCIPLES.md`) rather than in tension with it.

**File:** `src/_includes/base.njk` — `Person` schema on home/about; `src/_includes/post.njk` — `Article` schema on posts. (From `design-reference-yepsen.md` item 5.)

### C2. Blockquote styling for posts

Pure CSS, applies automatically, no per-post authoring change.

**File:** `src/assets/css/components.css`

```css
.e-content blockquote {
  margin: var(--space-lg) 0;
  padding: var(--space-sm) var(--space-lg);
  border-left: 3px solid var(--moss);
  background: var(--wash);
  color: var(--ink-soft);
}
```

### C3. A `.lede` and `.pull-line` convention (manual, not automated)

Rather than a build-time transform (which would add complexity the pitch's non-goals rule out), these are opt-in classes a writer adds by hand in markdown when a paragraph earns the emphasis — same spirit as `design-reference-yepsen.md` item 3 (lede) and `design-reference-neil-wengerd.md` item 8 (pull-line), scaled down to fit "no new data model."

**File:** `src/assets/css/components.css`

```css
.lede {
  font-size: var(--text-lg);
  color: var(--ink-soft);
  margin-block-end: var(--space-lg);
}
.pull-line {
  font-weight: 600;
  color: var(--ink);
}
```

**One concrete application to ship with this**, so it's not purely theoretical: wrap the existing About sentence *"That's the problem I find interesting. Turns out there's a job for it."* in `<span class="pull-line">` — it's already the one line in About's prose doing the most rhetorical work.

### C4. A quieter, more confident identity line

Not a poster-scale display moment (that would violate the pitch's own type specimen and Backout section) — just enough weight to give the front door one deliberate typographic decision instead of none.

**File:** `src/assets/css/components.css`

```css
.identity .p-name {
  font-size: 1.25rem;   /* was inherited body size */
  font-weight: 600;
  letter-spacing: -0.01em;
}
```

### C5. Small voice-bleed from About into Home

`design-reference-neil-wengerd.md` item 14 and this plan's own Context both note that About already has real authorial voice ("I didn't set out to work in data governance...") that the home page's identity/Now block doesn't carry any of. This is a content edit, not a code change — **suggested rewrite below, for Seb to accept, reject, or rewrite further, not to apply silently:**

> Current: *"Currently: stabilizing a personal 'front door' at sebthecanadian.ca, publishing notes and long-form thinking in the garden..."*
> Suggested direction: keep the factual content, let one clause carry a little of the same voice as About's "nobody can agree on what anything means, or who's accountable for it" — e.g. closing the Now block with something like *"...the through-line is still translation, same as everywhere else."* Exact wording is Seb's call.

---

## Part D — Explicit non-goals (documented refusals)

Naming these as deliberate decisions, not unexamined gaps — each would need to be struck from the relevant `BACKLOG.md` "Idea" section if this plan is accepted:

- **Full-bleed dark "punctuation block" section** (from both Wengerd and Henry reviews) — this is close to the exact "bad redesigner" strawman `pitch.html`'s Backout section names ("a dark hero, a big animated portrait"). Skip.
- **"Echo" ghost-text / repeated-name poster treatment** (Henry review) — maximalist decoration that conflicts with "dense, legible, quiet" and the pitch's preference for terminal-style rows over card/poster treatments.
- **Metaphor-driven nav/section labels** (Wengerd review) — the approved pitch's Principle C is explicitly "fewer doors, honest signs"; literal labels (`writing`, `projects`, `garden`) are the point, not a placeholder waiting for flavor.
- **Numbered process cards, plain-text client lists, contextual button contrast** (Wengerd review) — no current page (a "process" page, a client list, decorative buttons) that these would actually attach to; revisit only if such a page is ever built.
- **Richer JS motion / page-transition libraries** (Henry review, Taxi.js) — the pitch's non-goals are explicit: "no JS beyond your existing three small files." A1/A2 above are the site's one approved motion signature, restored — not expanded.
- **Analytics tooling (Fathom, etc.)** (Henry review) — a real, good idea if analytics are ever wanted, but an infrastructure decision, not a design one. Deliberately out of scope for this plan.

---

## Task list

### Chunk 1 — Repairs

- [ ] A1: Reattach cursor-blink to `.identity .p-name::after`; remove dead `.hero h1::after` rule
- [ ] A2: Add `.live-dot` to the home Now block; remove dead nav-link live-pulse rule
- [ ] A3: Fix `about.md`'s stack description (body font is Plex Mono, not system-sans)
- [ ] Verify both animations respect `prefers-reduced-motion: reduce`
- [ ] Commit: `fix(design): reattach cursor-blink and live-pulse to current DOM, correct stale about.md copy`

### Chunk 2 — Finish Move 05

- [ ] B1: Add woodcut portrait to About at human scale (`.about-portrait`, capped ~140px)
- [ ] B2: **Decision needed from Seb** — resolve the favicon story (keep maple leaf + amend spec, or revert to pixel portrait); document whichever is chosen
- [ ] B3 (optional/stretch): inline monogram glyph at section starts — only if B1/B2 land and there's appetite
- [ ] Commit: `design: finish Move 05 identity system — woodcut on About, resolved favicon rule`

### Chunk 3 — Selective borrows

- [ ] C1: `Person` JSON-LD on home/about; `Article` JSON-LD on posts
- [ ] C2: Blockquote styling in `components.css`
- [ ] C3: `.lede`/`.pull-line` utility classes + one applied example in About
- [ ] C4: Identity line type-confidence pass (`.identity .p-name` size/weight/tracking)
- [ ] C5: **Seb reviews/rewrites** the suggested Now-block copy edit — not auto-applied
- [ ] Commit: `design: adopt filtered external patterns — JSON-LD, blockquote/lede/pull-line, identity line weight`

### Chunk 4 — Close the loop

- [ ] Strike the six items in Part D from their respective `BACKLOG.md` "Idea" sections (mark as considered-and-declined, with a one-line pointer to this doc, rather than deleting the record)
- [ ] Move the four remaining un-actioned "Idea" items that *aren't* addressed here (e.g. category+tags axis, "You are here" breadcrumb, visibly-disabled social link, JSON-LD's sibling items) forward as still-open, unscheduled ideas — no change needed, just confirm they're not accidentally implied "done" by this plan
- [ ] Add a `CHANGELOG.md` entry once Chunks 1–3 ship

---

## Final verification checklist

- [ ] `npm run build` — no errors
- [ ] Home: cursor blinks after "Seb Lathangue"; Now block shows a pulsing dot next to "Tended..."
- [ ] Both animations freeze under `prefers-reduced-motion: reduce`
- [ ] About: woodcut portrait renders at human scale, not a banner; stack description now says Plex Mono throughout
- [ ] Favicon matches whatever B2 decided, and that decision is written down somewhere durable
- [ ] Blockquotes in existing posts pick up the new moss-accent styling automatically
- [ ] The one `.pull-line` application in About reads correctly in both light and dark mode
- [ ] `BACKLOG.md`'s Part D items are marked considered-and-declined, not silently dropped
