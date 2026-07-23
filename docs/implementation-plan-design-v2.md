# Implementation & Build Plan — Design v2 (Fusion Plan, Reconciled)

| Field | Value |
|-------|-------|
| Date | 2026-07-23 |
| Status | Plan — ready to execute; three items gated on Seb's decisions |
| Source | PR #17 (`docs/design-fusion-plan.md` + three `docs/design-reference-*.md` reviews) |
| Baseline | `main` @ `2c84f78` (post-PR #18 finishing pass) |
| Supersedes | The task list in `docs/design-fusion-plan.md` (its premises predate PR #18 — see Reconciliation) |

---

## Context

PR #17 (draft, from a parallel session) reviewed three outside sites —
yepsen.net, neilwengerd.com, henry.codes — filtered their patterns through
`DESIGN_PRINCIPLES.md` / the approved pitch, and synthesized
`docs/design-fusion-plan.md`: finish the pitch's unshipped Move 05
(identity system), repair two pieces of sprint-caused drift, adopt five
filtered borrows, and explicitly refuse six incompatible patterns.

The fusion plan is sound in direction but was written against **pre-#18
main**. PR #18 (merged 2026-07-22) deleted the dead animation CSS the plan
intended to "reattach," removed the `--ink-soft` token its snippets use,
made the Now block data-driven, fixed one of its three repairs outright,
and rewrote `BACKLOG.md` (which is why PR #17 now shows merge conflicts).
This document is the fusion plan **re-based onto shipped reality**: same
intent, corrected mechanics, sequenced into independently shippable
phases that each pass the `pr-check.yml` gate.

This is not a redesign. Every item below either finishes approved pitch
scope, restores an approved interaction, or adds a pattern that already
survived the compatibility filter in PR #17.

## Reconciliation: fusion plan vs. current main

| Fusion-plan premise | Reality on `main` @ `2c84f78` | Consequence |
|---|---|---|
| Cursor-blink + live-pulse CSS "still exist, dead" — just reattach selectors | Both blocks **deleted** in #18 Phase 4 (`e73831f`) | A1/A2 are **rebuilds**: restore `@keyframes` from git history (`git show e73831f~1:src/assets/css/components.css`, lines ~370–414) with new selectors |
| Snippets use `var(--ink-soft)` | Token removed in #18; `--muted` (`#595249` / `#a8a195`) is the living equivalent | Substitute `--muted` in C2/C3 |
| A2 snippet hardcodes `datetime="2026-05-01"` + `daysAgo` | Now block is data-driven: `now.updated | tendedState` from `_data/now.json` | Keep the data-driven markup; only add the `.live-dot` span |
| A3: about.md says body is system-sans | **Already fixed** in #18 (about.md:33 now reads "the whole site is monospace, body included") | A3 dropped — done |
| C2 adds blockquote styling from scratch | `base.css:130` already ships moss left border + `--muted` + italic | C2 shrinks to: add `--wash` background tint (and decide whether italic stays) |
| Chunk 4 reconciles a pre-#18 `BACKLOG.md` | #18 rewrote BACKLOG; #17 is in conflict (`mergeable_state: dirty`) | Phase 0 resolves this; note main's Ideas already track B1 ("Promote woodcut to home + about") and B3 ("Inline monogram at section starts") — convergent, not conflicting |
| References `pitch.html` at repo root | Moved to `docs/pitch-v1.html` in #18 | Path-only fix when landing #17's docs |

## Decisions needed from Seb (nothing else blocks on these)

1. **B2 — Favicon story.** (a) revert to pixel portrait per original Move
   05 spec, or **(b) keep the maple leaf and amend the spec** (fusion
   plan's recommendation, and mine: it ties to "the Canadian" identity;
   the pixel portrait keeps its system-scale role on 404 + future
   writing-OG). Whichever is chosen gets written into `DESIGN_BRIEF.md`'s
   annotation block so the rule finally lives somewhere durable.
2. **C5 — Now-block voice edit.** A one-clause content rewrite is drafted
   in the fusion plan; it touches `_data/now.json`, which is already on
   the Owner-TODO list from Phase C. Fold into that same review — never
   auto-applied.
3. **B3 — Inline monogram (stretch).** Optional; already tracked as an
   Idea on main. Only build if B1/B2 land and there's appetite.

---

## Build phases

Ordering rule (same as the finishing pass): stopping after any phase
leaves the site strictly better and shippable. One branch + PR per
phase; every PR passes the existing `pr-check.yml` gate (build + data +
output assertions).

### Phase 0 — Land the design docs (unblocks everything)
**Branch:** rebase PR #17's `claude/yepsen-design-reference-tkytkx`, or supersede it

PR #17 is docs-only but conflicted. Two ways to land it; pick by whether
that session's branch should stay authoritative:

- **(a) Rebase #17 onto main** — resolve `BACKLOG.md` by keeping main's
  structure and appending #17's three "Idea — design review" sections
  after the existing Ideas block; de-duplicate the two items main already
  tracks (woodcut-to-home/about, inline monogram) by folding #17's
  phrasing into the existing lines rather than double-listing.
- **(b) Supersede** — cherry-pick the four `docs/*.md` files onto a fresh
  branch with the same BACKLOG resolution, close #17 with a pointer.

Either way: fix the fusion plan's `pitch.html` references to
`docs/pitch-v1.html`, and add a one-line header note to
`design-fusion-plan.md`: "Task list superseded by
`docs/implementation-plan-design-v2.md` (post-#18 reconciliation)."

**Verify:** PR merges clean; `pr-check` green (docs-only, trivially).

### Phase 1 — Repairs: restore the approved motion signature (S)
**Branch:** `fix/restore-diegetic-motion`

The pitch's Interactions section names exactly two "small, purposeful"
animations; both were casualties of the sprint's own DOM changes and
were garbage-collected (correctly, as dead code) in #18. Rebuild them
against the current DOM:

1. Restore `@keyframes cursor-blink` + `@keyframes live-pulse` from git
   history (`e73831f~1`, components.css ~370–414) into
   `src/assets/css/components.css`.
2. Cursor-blink → `.identity .p-name::after` (content `"█"`, `--moss`,
   `0.1em` gap, `1.2s step-end infinite`) — the identity line is the
   `h1`-equivalent on the current home page.
3. Live-pulse → new `.live-dot` span (5px, `--moss`, `border-radius:
   50%`, `2.5s ease-in-out`) added in `src/index.njk` **inside the
   existing data-driven Now meta line**, before the
   `<time class="dt-updated">` element — do not reintroduce any
   hardcoded date:

   ```njk
   <p class="post-meta">
     <span class="live-dot" aria-hidden="true"></span>
     <time class="dt-updated" datetime="{{ now.updated }}">{{ now.updated | tendedState }}</time>
   </p>
   ```
4. Both animations wrapped in `@media (prefers-reduced-motion: reduce)`
   overrides (`animation: none`; cursor gets `opacity: 0.5` static).

**Verify:** build green; cursor blinks after "Seb Lathangue"; dot pulses
beside the tended state; both freeze under reduced-motion emulation;
no regression in the `.identity` line-wrap at 360px width.

**Commit:** `fix(design): rebuild cursor-blink + live-pulse against current DOM (pitch Interactions, post-cleanup)`

### Phase 2 — Finish Move 05: identity system (S)
**Branch:** `feat/move-05-identity`

1. **B1 — Woodcut on About.** Add the portrait `<figure
   class="about-portrait">` (`/assets/img/seb-stamp.jpeg`, `u-photo`,
   alt text as on resume) near the top of `src/about.md`; new
   `.about-portrait` rule in components.css — capped `140px`,
   `--radius-sm`, floats left with `--space-lg` gutter at ≥640px.
   Human-scale per the pitch, explicitly not a banner (the Day 04
   banner removal stands). This also closes main's existing Idea
   "Promote woodcut visibility to home + about" for the About half;
   home stays woodcut-free (the identity line + index table is the
   front door's whole design).
2. **B2 — Favicon rule** (after Seb's call): document the resolved
   rule — one dated line in the `DESIGN_BRIEF.md` annotation block and
   a matching note in `docs/design-fusion-plan.md`'s Move 05 table. If
   (a) revert: restore pixel-portrait favicon assets from git history
   (pre-#16) and regenerate sizes.
3. **B3** stays parked as a BACKLOG Idea unless Seb opts in.

**Verify:** build green; About renders portrait at human scale in light
+ dark; microformats still parse (u-photo now present on About's
h-card context); resume unchanged.

**Commit:** `design: finish pitch Move 05 — woodcut portrait on About; favicon rule documented`

### Phase 3 — Selective borrows (M)
**Branch:** `feat/filtered-borrows`

All five passed PR #17's compatibility filter: no new fonts, no new JS,
no non-diegetic motion.

1. **C1 — JSON-LD.** `Person` on home (+About), `Article` on posts,
   `CollectionPage` on `/writing/` — one `<script
   type="application/ld+json">` block emitted from
   `src/_includes/base.njk` (switch on a front-matter `schemaType` or
   page URL), sourcing the same data the h-card/h-entry markup already
   uses (`site.*`, `profiles.json`, page title/date). Machine-second
   layer; zero visual change. Validate with Google's structured-data
   test format (or `npx structured-data-testing-tool` offline
   equivalent) on the built HTML.
2. **C2 — Blockquote refinement.** Extend the existing `base.css:130`
   rule with `background: var(--wash)` + `--space-sm/--space-lg`
   padding; keep the moss border. Drop `font-style: italic` only if the
   wash makes it feel doubled — judge in both modes.
3. **C3 — `.lede` / `.pull-line` opt-in classes.** Manual authoring
   conventions, not build transforms: `.lede` = `--text-lg` +
   `--muted`; `.pull-line` = weight 600 + `--ink`. Ship with the one
   concrete application from the fusion plan: wrap About's "That's the
   problem I find interesting. Turns out there's a job for it." in
   `<span class="pull-line">`. Document both classes in
   `POSSE_POST_TEMPLATE.md` so future posts know they exist.
4. **C4 — Identity-line confidence.** `.identity .p-name` → `1.25rem`,
   weight 600, `-0.01em` tracking (current `.identity` base is
   1.0625rem; the name gets the one deliberate typographic decision).
   Check the cursor-blink glyph from Phase 1 scales with it.
5. **Eyebrow labels (yepsen item 1) — smallest useful version:** a
   `.eyebrow` utility (`--text-xs`, `--amber`, `--mono`,
   letter-spacing, uppercase) applied to the "Now" heading on home
   only. If it reads well there, wider rollout is a follow-up Idea;
   if not, delete one class — cheap either way.

**Verify:** build green; JSON-LD validates on all three page types;
blockquote styling visible on the existing native post; `.pull-line`
reads correctly in both modes; identity line + blink coherent at
1.25rem; text-browser (lynx-style) rendering unaffected.

**Commit:** `design: adopt filtered borrows — JSON-LD, blockquote wash, lede/pull-line, identity weight, eyebrow trial`

### Phase 4 — Governance close (S)
**Branch:** `docs/design-v2-close`

1. Strike the six Part D refusals in `BACKLOG.md` as
   considered-and-declined with a one-line pointer to
   `docs/design-fusion-plan.md` Part D (dark punctuation block, echo
   ghost-text, metaphor nav labels, process cards/client list/button
   contrast, Taxi.js-style transitions, analytics) — recorded, not
   silently dropped.
2. Confirm the still-open external-review ideas (category+tags axis,
   "You are here" breadcrumb, visibly-disabled social link, featured
   pull-quote, remaining eyebrow rollout) stay listed as unscheduled
   Ideas.
3. `CHANGELOG.md` entry for the shipped phases; check off the
   corresponding Ideas on main (woodcut-to-About).
4. Update `README.md` tree/notes only if Phase 3 added files (it
   shouldn't — all changes live in existing files).

**Verify:** docs match shipped reality; no dangling references.

**Commit:** `docs: design-v2 close — refusals recorded, backlog + changelog reconciled`

---

## Sequencing rationale

Phase 0 first because both this plan and the fusion plan cite the four
docs — merging them stops the two-sessions-two-truths drift and clears
the one red PR on the repo. Phase 1 before 2/3 because it's the only
user-visible *regression* (approved motion absent), it's tiny, and C4
(Phase 3) restyles the same element Phase 1 animates — land the anchor
first. Phase 2 is approved-but-unshipped pitch scope and carries the
only hard owner decision (B2); it can't be skipped without Move 05
staying open a third sprint running. Phase 3 is all-new adoption —
last among the code phases so any cut line falls on borrowed scope,
never on repairs or approved scope. Phase 4 is bookkeeping and closes
the loop the same way the finishing pass did.

## Definition of done

- PR #17's docs merged (or superseded) and its BACKLOG conflict gone
- Both pitch-approved animations live against the current DOM,
  reduced-motion-safe
- Move 05 resolved: woodcut on About, favicon rule written down,
  monogram explicitly parked or built
- JSON-LD on home/posts/writing validating alongside untouched
  microformats
- Blockquote/lede/pull-line conventions live, documented in the POSSE
  template
- Part D refusals recorded in BACKLOG as decisions
- Every phase merged through the `pr-check.yml` gate; CHANGELOG current

## Critical files

- `src/assets/css/components.css` (Phases 1, 2, 3 — keyframes,
  `.about-portrait`, `.lede`/`.pull-line`/`.eyebrow`, `.identity .p-name`)
- `src/assets/css/base.css` (Phase 3 — blockquote wash)
- `src/index.njk` (Phase 1 — `.live-dot`)
- `src/about.md` (Phases 2, 3 — portrait figure, pull-line span)
- `src/_includes/base.njk` (Phase 3 — JSON-LD emission)
- `_data/now.json` (C5, owner-gated)
- `BACKLOG.md`, `CHANGELOG.md`, `DESIGN_BRIEF.md` annotation,
  `POSSE_POST_TEMPLATE.md`, `docs/design-fusion-plan.md` header note
- Recovery source: `git show e73831f~1:src/assets/css/components.css`
  (original keyframes)

## Execution notes

- All phases are main-thread-direct sized (S/M); no sub-agent fan-out
  needed. Phase 3's JSON-LD is the only piece with real design freedom —
  keep it to one include, data-driven, no per-page hand-authored blobs.
- The sandbox 403s external fetches; keep-last-good (from #18) makes
  local builds safe, but still `git checkout -- _data/` after builds
  before staging.
- `pr-check.yml` gates every PR automatically; no new CI needed.
