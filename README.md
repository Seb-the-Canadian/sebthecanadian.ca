# sebthecanadian.ca

Personal site for Seb Lathangue — civic technology, knowledge architecture, and the digital garden at [cognitivearchitecture.ca](https://cognitivearchitecture.ca/).

## Live URLs

- **Personal site:** https://sebthecanadian.ca/
- **Digital garden:** https://cognitivearchitecture.ca/
- **Contact:** hello@cognitivearchitecture.ca

## Stack

| Layer | Choice |
|-------|--------|
| SSG | Eleventy 3.x (11ty) |
| Templating | Nunjucks |
| Styling | Vanilla CSS with custom properties (no Tailwind, no preprocessor) |
| Content | Markdown + YAML front matter |
| Fonts | Atkinson Hyperlegible (body & UI text), Fraunces (variable serif, display titles), IBM Plex Mono (code + data/terminal devices) — all self-hosted WOFF2 |
| JS | Progressive enhancement only — zero JS in critical path |
| Deployment | GitHub Actions → GitHub Pages |
| DNS | Cloudflare (DNS-only records) |

## Design Direction: Data Druid

Caves of Qud meets iOS — pixel texture and retro-organic elements layered onto a clean, modern shell. Forest palette (`#3f7a5f` primary, `#b07a0f` amber accent), warm parchment light mode, "forest at night" dark mode. See `DESIGN_BRIEF.md` for the full spec.

## Project Structure

```
sebthecanadian.ca/
├── src/
│   ├── index.njk              # Homepage (h-card, hero, Now block, featured project, latest writing, profiles)
│   ├── projects.njk           # Projects page (cards from data)
│   ├── writing.njk            # POSSE syndication hub (h-feed)
│   ├── resume.njk             # Printable résumé (h-resume) — linked from About, not in primary nav
│   ├── now.njk                # /now/ → /#now redirect (Now block lives on home)
│   ├── about.md               # Combined About + résumé (bio, philosophy, résumé, colophon)
│   ├── colophon.njk           # Redirect stub → /about/
│   ├── uses.md                # /uses page
│   ├── links.md               # Blogroll
│   ├── 404.md                 # Custom 404
│   ├── writing/               # Blog posts (markdown)
│   │   ├── hello-indieweb.md  # First native post
│   │   └── tags.njk           # Tag archive pages (/writing/tags/<tag>/)
│   ├── _includes/
│   │   ├── base.njk           # Base HTML layout
│   │   ├── nav.njk            # Primary navigation
│   │   ├── footer.njk         # Footer with colophon row + wordmark
│   │   ├── masthead.njk       # Page title block (S·L stamp + eyebrow + h1 + lede)
│   │   ├── project-card.njk   # Reusable project card
│   │   ├── resume-body.njk    # Shared résumé sections (used by /about/ + /resume/)
│   │   └── post.njk           # h-entry layout for native posts
│   └── assets/
│       ├── css/               # tokens, base, components, utilities, print
│       ├── fonts/             # IBM Plex Mono WOFF2 (self-hosted)
│       ├── img/
│       │   ├── seb-stamp.jpeg # Woodcut portrait (resume, u-photo)
│       │   ├── favicon.svg    # Pixel-conifer favicon (SVG, theme-aware)
│       │   ├── favicon.png    # Pixel-conifer favicon (32x32 PNG fallback)
│       │   └── pixel/         # Pixel art: 404 illustration, dividers, textures
│       └── js/
│           └── theme-toggle.js # Dark/light/system toggle
├── _data/
│   ├── site.json              # Site metadata
│   ├── navigation.json        # Nav links (primary + secondary)
│   ├── projects.json          # Project data
│   ├── profiles.json          # Profile links
│   ├── resume.yml             # Resume data (experience, education, skills)
│   └── gardenPosts.json       # Garden posts snapshot — regenerated at build, kept-last-good on fetch failure
├── scripts/
│   └── garden-rss.js          # Obsidian Publish → garden posts JSON
├── eleventy.config.js         # Eleventy config (ESM)
├── package.json
├── .github/workflows/
│   ├── build-deploy.yml       # Eleventy build → GitHub Pages
│   └── webmention.yml         # Telegraph webmention sender
├── DESIGN_BRIEF.md            # Approved design spec
├── BACKLOG.md                 # Feature roadmap
├── CHANGELOG.md               # Version history
└── docs/
    └── archive/               # Archived pre-Eleventy planning docs (provenance only)
```

## Development

```bash
npm install
npm run dev                   # Dev server with hot reload
npm run build                 # Garden sync + Eleventy build → _site/
npm run garden-sync           # Fetch garden posts only (no build)
```

## Writing (POSSE)

Posts originate in the digital garden and are syndicated here as excerpts. The writing page has two sections:

- **Posts** — Manual markdown files in `src/writing/` (native posts like "Hello, IndieWeb" use `syndicated: false`)
- **From the Garden** — Automatically pulled from cognitivearchitecture.ca at build time via `scripts/garden-rss.js`

See `POSSE_POST_TEMPLATE.md` for the manual post front matter structure.

## Maintenance (runbook)

The site is designed to run itself. What that means in practice:

- **Daily rebuild.** `build-deploy.yml` has a `schedule:` cron (09:17 UTC daily)
  in addition to push + manual dispatch. Garden posts and webmentions refresh
  on the live site within a day of changing upstream — no commit needed.
- **Keep-last-good data.** `scripts/garden-rss.js` and `scripts/webmentions.js`
  never overwrite `_data/*.json` on a failed fetch. A transient outage keeps
  the last good snapshot and emits a `::warning::` annotation in the Actions
  run — check the workflow summary if the garden looks stale for several days.
  An empty file is only written if no snapshot exists at all (fresh fork).
- **Refreshing snapshots in git.** The committed `_data/gardenPosts.json` is a
  baseline for forks, PR checks, and offline builds. Any successful build
  regenerates it; commit the regenerated file occasionally
  (`npm run garden-sync && git add _data/gardenPosts.json`) to keep the
  baseline current.
- **PR quality gate.** `pr-check.yml` runs on every pull request: full build,
  gardenPosts must parse as a non-empty array, and `_site/{index.html,
  feed.xml,sitemap.xml,404.html}` must exist.
- **Updating Now.** Edit `_data/now.json` (`currently` prose + `updated`
  date). The home page renders the freshness state ("tended today" …
  "resting" … "fallow") from the date automatically.
- **Posting.** Native posts: markdown in `src/writing/` per
  `POSSE_POST_TEMPLATE.md`. Garden posts flow in automatically. Both appear
  in `/feed.xml` (hand-rolled Atom template at `src/feed.njk`, capped at 20).
- **Renewals.** `src/.well-known/security.txt` `Expires:` is set to
  **2027-07-01** — bump it annually.
- **Domain canary.** `domain-check.yml` curls the apex, www, and the feed
  daily (10:43 UTC) and fails the run — which emails the repo owner — if
  any stop answering. A red run here almost always means DNS, not the
  repo (deploys that fail keep the last good site up; only DNS or Pages
  config can take the URL down entirely).
- **DNS (Cloudflare) — the records that must exist.** The July 2026
  outage was exactly this: the apex records vanished from the zone while
  everything repo-side stayed green. To serve GitHub Pages on the custom
  domain, the Cloudflare zone needs, all **DNS-only (grey cloud)** per
  this site's documented posture:

  | Type | Name | Value |
  |------|------|-------|
  | A | `sebthecanadian.ca` | `185.199.108.153` |
  | A | `sebthecanadian.ca` | `185.199.109.153` |
  | A | `sebthecanadian.ca` | `185.199.110.153` |
  | A | `sebthecanadian.ca` | `185.199.111.153` |
  | AAAA | `sebthecanadian.ca` | `2606:50c0:8000::153` |
  | AAAA | `sebthecanadian.ca` | `2606:50c0:8001::153` |
  | AAAA | `sebthecanadian.ca` | `2606:50c0:8002::153` |
  | AAAA | `sebthecanadian.ca` | `2606:50c0:8003::153` |
  | CNAME | `www` | `seb-the-canadian.github.io` |

  After restoring records: GitHub repo **Settings → Pages** — confirm
  the custom domain still reads `sebthecanadian.ca` (re-save it if it
  shows an error) and re-enable **Enforce HTTPS** once the certificate
  re-provisions (can take up to an hour after DNS returns).

## Build Status

Redesign sprint (2026-03, COG-250–271), stewardship pass (2026-05-01),
pitch-v1 design sprint (2026-05-02), and the finishing pass (2026-07) are
all complete. See `BACKLOG.md` for open ideas and `CHANGELOG.md` for
version history.

## Fork this site

This repo is readable enough to fork as a starting point for your own personal site. The fastest path to a rebrand without touching layout:

1. **`_data/site.json`** — title, URL, description, author, email.
2. **`_data/profiles.json`** — your rel=me profile links (GitHub, Mastodon, LinkedIn, etc.).
3. **`_data/navigation.json`** — primary + secondary nav items.
4. **`_data/projects.json`** — your project cards.
5. **`_data/resume.yml`** — experience, skills, education.
6. **`src/index.njk`** — hero copy and the h-card block.
7. **`src/assets/img/seb-stamp.jpeg`** — replace with your own portrait (same filename or update references).
8. **`src/assets/img/favicon.svg`** + **`favicon.png`** + **`apple-touch-icon.png`** — your own mark.
9. **`src/assets/css/tokens.css`** — palette tokens, both light and dark themes.

Everything else (layout, microformats, the garden RSS importer, the POSSE pattern) can stay as-is. The `CNAME` file and `.github/workflows/webmention.yml` reference `sebthecanadian.ca` explicitly — change those before deploying, or delete them if you don't need webmentions or a custom domain. Self-host or adapt: the codebase is yours.

Runtime floor: **Node 22+**, `npm install`, then `npm run build`. No other services required to build. Deployment is GitHub Pages via the included workflow; swap in whichever static host you prefer.

## Ops Notes

- **Hosting:** GitHub Pages (free)
- **DNS:** Cloudflare (records kept DNS-only)
- **HTTPS:** Enforced via GitHub Pages
- **Garden:** https://cognitivearchitecture.ca/
- **Contact:** hello@cognitivearchitecture.ca
