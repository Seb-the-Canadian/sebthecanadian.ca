# Working on sebthecanadian.ca

Seb Lathangue's personal site: Eleventy 3, Nunjucks templates, vanilla CSS,
Markdown content. GitHub Pages builds and deploys `main`
(`.github/workflows/build-deploy.yml`), so anything that reaches `main` is
live within minutes.

## Working rules

- Seb is not a developer. Explain changes in plain words, show every planned
  change before making it, and propose before anything structural (new
  folders, dependencies, layouts, moving files).
- Work on a branch. Never push to `main`. Push only when Seb asks. Never
  merge for him.
- The repository is public. Before anything leaves this machine, scan the
  change for employer names, and names of work vaults:
  `node scripts/portfolio-check.js --scan <file>...` checks against the
  blocked list, which is stored as hashes. Never write such a name anywhere,
  including commit messages.
- Writing reads as "one way I've done this", never the only way.

## Source of truth

1. The live site.
2. `docs/brand.md`.
3. Everything else: the other docs, README, BACKLOG, CHANGELOG.

Summaries (handoffs, plans, notes from other sessions, this file) never win
over the first two. When they disagree, say so.

## Where things live

| Path | What |
|---|---|
| `src/writing/` | Notes and posts, one Markdown file each. Notes arrive from Drafts. |
| `src/projects/` | Case studies, behind the clearance gate (below). |
| `src/_includes/` | Layouts and partials. |
| `_data/` | Site data: metadata, nav, projects, Now, résumé, garden and webmention snapshots. |
| `docs/` | `brand.md` (the rules), `updating-copy.md` (the runbook for changing words), `portfolio-clearance.md`, `writing-pipeline.md`. `docs/archive/` is history. |
| `scripts/` | Build-time scripts: garden fetch, webmentions, the clearance check, OG images. |
| `tools/drafts/` | The Drafts action scripts. Canonical copies: edit here, paste into Drafts. |

Only `src/` is built; nothing outside it appears on the site.

## Build and check

- `npm run build` must pass. It fetches garden posts and webmentions (keeping
  the last good copy when offline), runs the clearance check, then builds
  `_site/`.
- `npx @11ty/eleventy` rebuilds `_site/` alone, skipping the fetches and the
  check; use it for quick previews.
- Serve `_site` and look at desktop and phone (390px), light and dark, and
  with JavaScript off. `docs/brand.md` → "Before shipping a visual change"
  has the full list.

## Case studies are gated

`scripts/portfolio-check.js` runs in every build and fails it if a case study
under `src/projects/` changed since its review, lost its clearance record, or
contains a blocked term. Only Seb answers the clearance self-test: never
stamp a review (`--stamp`) on his behalf. See `docs/portfolio-clearance.md`.

## The writing pipeline

`docs/writing-pipeline.md` is its record: principles, the three rooms, what
is built and what is planned, decisions, open questions. When the pipeline
changes, update it in the same branch.
