# Spheres ledger schematic, MVP 1.0: design

| Field | Value |
|---|---|
| Date | 2026-11-20 (revised the same day after reading the site's existing work) |
| Status | Approved by Grieves, 2026-11-20 |
| Target | sebthecanadian.ca, a post in `/writing/` (Obsidian garden later) |

## Intent

Show the spheres ledger as a piece of **information architecture**: a way of
reading power in the world that someone else could pick up and use. The page
shows Grieves's thinking: the structure, the tests and where the evidence comes
from. It is a first public version (MVP 1.0) that is meant to change.

It continues a thread already on the site: "who controls the infrastructure"
and "the architecture matters" (*Grokipedia was a warning shot*), and the
story-as-architecture idea (*The best storytelling is exemplary of great
information architecture*).

## Goals

- A reader new to the project understands, from the figures alone:
  1. power is read **sphere by sphere** (six spheres, which can overlap)
  2. there are two roles, **controller** and **resident**, linked inside one
     sphere
  3. a role is **earned through tests**, not asserted: C1–C3 for controllers,
     R1–R3 for residents
  4. every claim runs back through an **evidence trail** to sources
- It looks and reads like the rest of sebthecanadian.ca.
- It works at phone width (390px) and on desktop, in light and dark, printed,
  and with JavaScript off.

## Non-goals

- Findings: no claim that a named country controls anything.
- The data tables, field names or validation rules.
- The Obsidian garden version (later; see the last section).

## Anti-goals (a failure even if it renders)

- It reads as a statement about who rules the world, or as taking a side.
- It hides that the method rests on human judgement, or blurs Claude's part.
- Colour carries meaning (the site forbids it in figures).
- It looks like a generic consulting diagram rather than this site.

## What the site already does (read 2026-11-20)

Read: `docs/brand.md`, `docs/pen-and-pixel.md`, `docs/writing-pipeline.md`,
every post in `src/writing/`, the About page's join sequence
(`_includes/fig-join.njk`, `assets/css/figures.css`) and the figures in
*Down and Out, revisited* (`assets/css/posts/revisiting-down-and-out.css`).
Also read: *Concerning Capital Cognitive Capture* on the garden.

| What the site does | What this page takes from it |
|---|---|
| Figures are **HTML boxes, chips and step tiles**, framed on `--bg-alt`. SVG is used only for lines and shapes, with a wide and a narrow drawing swapped at 600px (the join) | Same build. Not one large SVG image |
| A figure has a tracked mono title in muted ("THE JOIN · SCHEMATIC"), a legend list ("ruled · documented"), and a muted caption ("Moss marks the path to look at.") | Same parts and wording pattern |
| Steps are tiles with a mark strip on top, which becomes a left strip and one column on a phone; the current step has a moss outline (*Down and Out*) | The two tests and the evidence trail use these tiles |
| An idea built up in stages: "1 OF 3 · THE SYSTEM" kickers with one sentence under each (About) | The spheres figure can build up in three stages the same way |
| Claude's part is named and marked with pixel dither ("pixel: Claude's review") | The AI scan in the evidence trail is named as Claude and drawn in dither |
| An evolving piece is a `post`: "This page changes as the work does", an `in progress` pill, dated Revisions, Sources that name Claude, its own stylesheet through `pageStyles` | Same page shape |
| Voice: first person, plain, honest about limits ("What I can and can't claim for now"), questions left open on purpose | Same voice; a short "what this is and isn't" section |

## Approaches considered

| Approach | Trade-off | Outcome |
|---|---|---|
| Mermaid in the page | Editable as text, but no layout control, can't draw overlapping spheres, and no other page on the site uses it | Not chosen |
| One large SVG image | Full control, but text shrinks on a phone, marks would be redrawn in SVG instead of the site's tokens, and no other figure on the site is built this way | **Chosen first** (2026-11-20); revised after reading the site |
| **HTML figures with SVG where drawing is needed** | Matches every figure on the site: text reflows on a phone, the marks are the site's own, print rules already exist. The overlapping spheres and the arrows are SVG | **Chosen** (approved by Grieves, 2026-11-20) |

## The page

A `post` in `src/writing/`, built by hand like *Down and Out, revisited*
(not through the Drafts action, which can't carry figures).

- **Front matter:** `type: post`, `stage: seedling`, `inProgress: true`,
  `tags: [research]`, `pageStyles: [/assets/css/posts/spheres-ledger.css]`.
- **Title (draft):** "Reading power, sphere by sphere". Grieves picks the
  final title.
- **Sections (headings draft):**
  1. a short opening, in his voice, on why: who controls infrastructure, and
     reading power as an architecture rather than a story
  2. `## Spheres, not one map`, with **figure 1**
  3. `## Earned, not asserted`, with **figure 2**
  4. `## Every claim has a trail`, with **figure 3**
  5. `## What this is and isn't`: a lens, not findings; no countries named;
     21 events so far; measurement, not advocacy
  6. `## What's next`, `## Revisions` ("20 Nov 2026. First version (MVP
     1.0)."), `## Sources` (the ledger; "This project is done with Claude, an
     AI model made by Anthropic. Its part is labelled as its own.")
- Claude drafts the words; Grieves rewrites them before anything is published.

## The three figures

### Figure 1: SPHERES LEDGER · THE SPHERES

Built up in three stages, like About's join:

```
1 OF 3 · SIX SPHERES     2 OF 3 · TWO ROLES          3 OF 3 · OVERLAP
 six circles, overlapping  Controller X ──▶ Resident Y  the same pair meets
 security · finance ·      inside one sphere           in a second sphere;
 trade · energy &                                       each edge is its own
 logistics · tech &                                     claim
 compute · legitimacy
```

The circles and arrows are a small SVG (a wide and a narrow drawing). The
sphere names and actor names are HTML chips beside it, so they stay readable
on a phone. A legend sits at the foot.

### Figure 2: SPHERES LEDGER · THE TESTS

Two rows of step tiles:

```
CONTROLLER  [C1 imposes] ▶ [C2 others comply] ▶ [C3 a measurable effect] ▶ CONTROLLER (moss)
            fewer than three ▶ candidate (dashed)      evidence both ways ▶ ⚠ contested (amber + word)
RESIDENT    [R1 depends] ▶ [R2 felt it] ▶ [R3 costly to leave] ▶ RESIDENT
            scope: state · firm · asset (chips)
```

Each test tile has a pen-hatch strip, because each test is Grieves's
judgement on the evidence. The moss outline traces the path to "controller".

### Figure 3: SPHERES LEDGER · THE EVIDENCE TRAIL

Step tiles, like *Down and Out*'s five steps:

```
[sources] ▶ [events, in time windows] ▶ [edges] ▶ [register]
 ruled       solid                       hatch      solid
       [Claude's scan] (dither) suggests ─┘   a person decides
```

### Marks used (the site's standing vocabulary)

| Mark | Site meaning | In these figures |
|---|---|---|
| ruled | documented | sources |
| solid | recorded, data | events; the register |
| pen hatch | human judgement | each test; coding an edge |
| pixel dither | machine, AI | Claude's scan, which may suggest an event or pattern |
| dashed outline | unresolved | a candidate controller |
| moss | where to look | the path to "controller" |
| amber, with an icon and a word | a state | "contested" |

## Decisions (Claude's calls; Grieves can overturn any)

1. **The rule is C1 + C2 + C3**, as the README says. `CLAUDE.md` names only C1 +
   C2; fix it to match in the same change.
2. **No real country names.** Actors are "Controller X" and "Resident Y". Why:
   the anti-goal above, the project's own rule ("measurement, not advocacy"),
   a corpus of 21 events, and the site's habit of saying "no findings yet"
   until there are some.
3. **One stylesheet for the page**, `assets/css/posts/spheres-ledger.css`, with
   its own class prefix (`sl-`), copying *Down and Out*'s patterns and its
   print rules for the marks. No new colours or tokens.
4. **Accessibility:** each figure is named by its title, each SVG has a text
   label, and every word in a figure is real text (HTML or SVG text).
5. **Work in the site repo** on a new branch from `main`, in a separate
   worktree, so the current checkout (`audit/case-study-use-case-life`) is
   untouched. Nothing is pushed until Grieves asks.

## Left to the builder

- Exact geometry of the circles and arrows.
- Label wording, within the meanings above.
- Whether time windows show as ticks or as a band in figure 3.

## Done means

- The page builds with `npx @11ty/eleventy`.
- `site-check.js` passes at 1280 and 390, light and dark, and with
  JavaScript off; the screenshots have been looked at.
- The pre-ship list in `brand.md` is run, no new colour is added, and the
  page prints with its marks.
- Grieves has read it, rewritten the words he wants, and said yes.

## Later: the Obsidian garden

Obsidian Publish can't use the site's stylesheets. The garden version will be
a standalone `.svg` with fixed colours that work on light and dark, drawn from
these figures. The writing pipeline already plans for the garden to carry a
seed of each site post with a `site:` link back; that route comes first.
