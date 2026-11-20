# Revision history for evolving posts: design

| Field | Value |
|---|---|
| Date | 2026-11-20 |
| Status | Approved by Grieves, 2026-11-20 (builder check's 5 questions settled as Claude's calls) |
| Branch | `feature/revision-history` (from `main` at 8c307fa) |
| First case | "Reading power, sphere by sphere", whose 2nd revision ("What it could change") ships in the same branch |

## Intent

Let a reader see how Grieves's thinking on a piece has changed and grown.
They should be able to step back to the piece as it stood at each moment he
declared, as the Wayback Machine does for websites, and see what each step
added or took away.

Why, in his words (interview, 2026-11-20): people "can see that my thoughts
are changing. They can see how it changes over time. They can see how it
grows. And that in and of itself … is a valuable living out of the
philosophy that I'm trying to practice … it's okay to not have the answers
all the time. What's important is to keep learning and checking and not
assuming that the first answer is the right one, especially not if it's
spoon-fed to you."

This also moves the digital-garden way of working onto the site. The site
is now the one space; the garden may come back later.

## Goals

- From any post with two or more declared revisions, a reader can:
  1. see at a glance how many times the piece has changed, and when
  2. open the piece as it stood at each revision, complete
  3. see, on each version, what changed since the version before it
- A version is a **declared revision**: a dated line under the post's
  `## Revisions` heading (decided by Grieves, 2026-11-20). Typo fixes
  between declarations are not versions.
- Grieves's workflow doesn't change. Writing the Revisions line he already
  writes is the only step.
- It is built from git at build time. Nothing is captured by hand.

## Non-goals

- Versions for pages outside `src/writing/`.
- Showing every commit.
- A side-by-side diff tool, or word-level diffs inside figures.
- Any change to how notes are published from Drafts.

## Anti-goals (a failure even if it works)

- A reader mistakes an old version for the current one.
- Old versions appear in search results, the feed or the sitemap as if they
  were separate pieces.
- A past version renders broken (unstyled figures) because the styles moved
  on since.
- The change marks rely on colour (the site forbids it), or make reading
  the version itself harder.
- The build gets slow or fragile, for example by failing when git history
  is shallow.

## Constraints from the site

- Eleventy 3, Nunjucks, vanilla CSS, no client JavaScript needed
  (`docs/brand.md` → Behaviour: "every figure shows in its finished state").
- Two runtime dependencies (`@11ty/eleventy`, `js-yaml`); add none without
  saying why.
- The deploy checks out the full history (`fetch-depth: 0` in
  `.github/workflows/build-deploy.yml`). The PR check
  (`.github/workflows/pr-check.yml`) also builds, so check its checkout
  depth too.
- Pen + pixel figure rules (`docs/pen-and-pixel.md`), and the brand's
  rule that amber means a state "always with an icon and a word".
- `docs/brand.md` must change in the same commit as any rule it states.

## Approaches considered

| Approach | Trade-off | Outcome |
|---|---|---|
| Snapshot pages only | Each past state is whole, but the reader has to spot the changes alone | Not chosen |
| A change view on the live post only | Shows how the thinking moved, but never the page as it stood | Not chosen |
| **Both, joined:** a timeline figure on the live post; one snapshot page per version, each marking what changed since the one before | Most to build; the only option that shows both the past state and the movement | **Chosen by Grieves, 2026-11-20** |

## How it works

### Finding the versions

- A Revisions line has the shape `- **D Mon YYYY.** text`, as in both
  existing posts. Newest goes at the **bottom**. Revision *n* is the *n*-th
  such line by **position**, not by date, so two revisions on one day are
  fine. *(Claude's call, builder check Q1.)*
- The commit that **declares** revision *n* is the first commit, walking
  HEAD's first-parent line from oldest to newest, in which the file's
  Revisions section has at least *n* lines. Editing the date or the text of
  an old line later changes nothing.
- **Version *n*'s content** is the file as it stood at the parent of the
  commit that declares *n*+1. Typo fixes made after a declaration therefore
  land in that version. The newest version is the file as it is now.
- **Which history:** every build reads HEAD's first-parent line. On the
  deploy that is `main`. On a branch preview or a PR check it is the
  branch, so v1 and v2 can be previewed before merging. This holds for
  merge, squash or rebase merges of one revision, as long as **a
  revision's content and its Revisions line land in the same commit**. When
  one merge commit brings two revisions, the version between is read from the
  merged branch's own line; a squash of two revisions loses it, so it is left
  out with a warning. *(Second pass, 2026-11-20: the first wording claimed all
  merge kinds; two revisions per pull request broke it.)* `docs/updating-copy.md` will say
  so. *(Claude's call, builder check Q2.)*
- **The PR check gets `fetch-depth: 0`**, like the deploy, so CI builds the
  version pages and doesn't only test the fallback. *(Claude's call, Q2.)*
- **Each version page uses that commit's own front matter** (title, stage,
  `inProgress`, `pageStyles`), so its meta line shows the piece as it was.
  The banner prevents any mix-up with the current version. An old body is
  rendered as Markdown only, without Nunjucks, so old text never runs
  against today's templates. Neither post uses Nunjucks tags today.
  *(Claude's call, builder check Q5.)*
- A post needs **two or more** revisions to get any of this. With one, there
  is no history to show, and nothing changes on the page.

### The pages

- **Version pages** are at `/writing/<slug>/v<n>/` (for example
  `/writing/reading-power-sphere-by-sphere/v1/`). The number is stable,
  and two revisions on one day don't collide.
- Each version page uses the post layout and carries:
  - a **state banner** at the top: amber border and tint, the ◆ icon and
    the words "An earlier version · 20 Nov 2026 · version 1 of 2", with a
    link "Read the current version →". On the newest version page, the
    banner says "The current version, with what changed marked" instead.
  - the post's content as it stood, rendered by the same Markdown pipeline
  - **change marks** against the previous version (below). Version 1 has
    none: it reads "The first version".
- Version pages carry `<meta name="robots" content="noindex">` and a
  canonical link to the live post. They are excluded from collections, the
  feed, the sitemap and the Writing index.

### Change marks

The grain is the **block**: a paragraph, list item, heading or figure.

- **New in this version:** a 2px `--mark` rule at the block's left edge,
  beside the word "new" in a small mono label.
- **Changed in this version:** the same rule, dashed, with the word
  "changed".
- **No pen + pixel textures on prose.** `pen-and-pixel.md` Rule 1 keeps
  marks inside figures, so the change marks use a plain line and a word,
  not hatch, and the key is a short sentence rather than a figure key. No
  brand exception is needed. *(Claude's call, builder check Q3.)*
- **Removed in this version:** the removed blocks are listed at the point
  where they stood, inside a closed `<details>` labelled "Removed here (2)",
  set in muted text.
- **A figure that changed** is marked "changed" as a whole; there is no diff
  inside a figure.
- A one-line key sits under the banner: "A solid line marks what's new
  since the last version; a dashed line, what changed." 

### The timeline figure

- On the live post, just above `## Revisions`, the post shows a figure titled
  "HOW THIS PAGE HAS GROWN".
- It has one step per version. Each step shows the date and its Revisions
  line, links to its version page, and wears the solid mark (a recorded
  version). The newest step has the moss outline and the word "current"
  (moss = where to look).
- It reuses `figures.css` patterns (chips, legend). The layout is horizontal
  on desktop and stacked on a phone.
- It shows only when the post has two or more versions.

### Old styles

A version page links the post's `pageStyles` files as they stood in that
version's commit. They are written out beside the version page (for example
`/writing/<slug>/v1/assets/spheres-ledger.css`), so old figures render as
they did. The site frame (tokens, base, components, header, footer, fonts)
stays current. A shared file such as `figures.css` is also taken from that
commit.

### Building it

- A build-time step reads git (`git log`, `git show`) for each file in
  `src/writing/` that has a `## Revisions` heading. It produces a data list
  of versions: slug, *n*, date, revision line, commit, content and styles.
- A paginated template renders one page per version.
- The block diff is a small, self-contained function, written in-house with
  no new dependency. It compares two lists of rendered blocks and returns
  each block marked same, new, changed or removed.
- **When history is missing** (a shallow clone or a local copy without git),
  the build logs a warning, generates no version pages, hides the timeline,
  and still succeeds.

### Docs to change

- `docs/brand.md`: the version banner as an amber state; the change marks
  as plain lines with words, outside figures.
- `.github/workflows/pr-check.yml`: `fetch-depth: 0`.
- `docs/updating-copy.md`: "Changing a post that has figures" gains the
  note that a new Revisions line creates a version; and the exact line
  shape.
- `CHANGELOG.md`.

## The second revision (content)

The spheres post gains `## What it could change`, after "Who it's for". It's
written in Grieves's words, from interview 2 (2026-11-20):

- It opens with "giving people the tools is always going to be the first
  step to making a change".
- Then three short points:
  1. **Show the lever, not just the lean.** Media-literacy tools show which
     way an outlet leans. A spheres layer could show who holds the channel
     the other side depends on, and whether banks, shippers and insurers
     are already falling in line.
  2. **Make "insufficient evidence" a normal answer.** A claim without an
     event trail stays a candidate; ask for receipts first.
  3. **Turn readers into auditors.** A public, shared schema lets
     journalists, researchers and citizens argue over an event's effect
     with the evidence in front of them.
- It ends on his "reorientation": news that doesn't have to live by "if it
  bleeds, it leads" or the 24-hour cycle, and doesn't feel it's losing out,
  getting back to what it was meant to show, an unbiased account of what's
  happening in the world.
- The Revisions line: `- **<the day it's written>.** What it could change:
  three things the framework could do inside the tools people use to read
  the news.` It goes in the same commit as the section.
- **Who writes it:** Claude drafts it from interview 2, held in this
  session, and Grieves rewrites before merging, as with the first version.
  There is no transcript in the repo. *(Claude's call, builder check Q4.)*
- **Left out unless Grieves wants it:** the line about a shared version
  needing rules for who can add and challenge entries. It was proposed by
  Claude, and he hasn't confirmed it.
- Not in it: the local model's phrasings ("instantly", "profound",
  "scientific discipline"), or "has C2 over" (C2 means third parties
  comply).

## Left to the builder

- The exact git commands, and how to keep them fast (one `git log` per file).
- Which Markdown and Nunjucks APIs render old content (Eleventy 3's render
  plugin or its Markdown library).
- How the timeline wraps when there are many versions.
- The exact wording of banners and keys, within the meanings above.

## Done means

- The spheres post shows the timeline with 2 versions; `v1` shows the post
  as merged in PR #55; `v2` shows the current post with "What it could
  change" marked new.
- "Down and Out, revisited" (one revision) is unchanged.
- The build passes with full history, and also with a shallow clone (no
  versions, a warning, no failure).
- Unit checks for line parsing, version-to-commit mapping and the block
  diff, run with `node --test`.
- `site-check.js` passes on the live post and on each version page;
  screenshots looked at; print keeps the marks; the pre-ship list in
  `brand.md` is run.
- Version pages are absent from the sitemap and the feed, and carry
  noindex and a canonical link.
- Grieves has seen it and said yes.
