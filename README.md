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
| Fonts | IBM Plex Mono (self-hosted WOFF2, headings + code) + system stack (body) |
| JS | Progressive enhancement only — zero JS in critical path |
| Deployment | GitHub Actions → GitHub Pages |
| DNS | Cloudflare (DNS-only records) |

## Design Direction: Data Druid

Caves of Qud meets iOS — pixel texture and retro-organic elements layered onto a clean, modern shell. Forest palette (`#3f7a5f` primary, `#b07a0f` amber accent), warm parchment light mode, "forest at night" dark mode. See `DESIGN_BRIEF.md` for the full spec.

## Project Structure

```
sebthecanadian.ca/
├── src/
│   ├── index.njk              # Homepage (h-card, hero, garden, projects, writing)
│   ├── projects.njk           # Projects page (cards from data)
│   ├── writing.njk            # POSSE syndication hub (h-feed)
│   ├── resume.njk             # Data-driven resume (h-resume)
│   ├── now.md                 # /now page
│   ├── about.md               # About page (bio + how this site is built)
│   ├── colophon.md            # Redirect stub → /about/
│   ├── uses.md                # /uses page
│   ├── links.md               # Blogroll
│   ├── 404.md                 # Custom 404
│   ├── writing/               # Blog posts (markdown)
│   │   └── hello-indieweb.md  # First native post
│   ├── _includes/
│   │   ├── base.njk           # Base HTML layout
│   │   ├── nav.njk            # Primary navigation
│   │   ├── footer.njk         # Footer with secondary nav
│   │   ├── project-card.njk   # Reusable project card
│   │   ├── post-card.njk      # POSSE post excerpt card
│   │   └── garden-section.njk # Garden feature section
│   └── assets/
│       ├── css/               # tokens, base, components, utilities, print
│       ├── fonts/             # IBM Plex Mono WOFF2 (self-hosted)
│       ├── img/
│       │   ├── seb-stamp.jpeg # Profile illustration
│       │   ├── favicon.svg    # Monogram favicon (SVG)
│       │   ├── favicon.png    # Monogram favicon (32x32 PNG fallback)
│       │   └── pixel/         # Pixel art: monogram, dividers, textures
│       └── js/
│           └── theme-toggle.js # Dark/light/system toggle
├── _data/
│   ├── site.json              # Site metadata
│   ├── navigation.json        # Nav links (primary + secondary)
│   ├── projects.json          # Project data
│   ├── profiles.json          # Profile links
│   ├── resume.yml             # Resume data (experience, education, skills)
│   └── gardenPosts.json       # Auto-generated garden posts (from scripts/garden-rss.js)
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

## Build Status

All 22 Linear issues complete (COG-250 through COG-271). The full redesign sprint is done. See `BACKLOG.md` for details and `CHANGELOG.md` for version history.

## Fork this site

This repo is readable enough to fork as a starting point for your own personal site. The fastest path to a rebrand without touching layout:

1. **`_data/site.json`** — title, URL, description, author, email.
2. **`_data/profiles.json`** — your rel=me profile links (GitHub, Mastodon, LinkedIn, etc.).
3. **`_data/navigation.json`** — primary + secondary nav items.
4. **`_data/projects.json`** — your project cards.
5. **`_data/resume.yml`** — experience, skills, education.
6. **`src/index.njk`** — hero copy and the h-card block.
7. **`src/assets/img/seb-stamp.jpeg`** — replace with your own portrait (same filename or update references).
8. **`src/assets/img/pixel/monogram.svg`** + **`src/assets/img/favicon.svg`** — your own mark.
9. **`src/assets/css/tokens.css`** — palette tokens, both light and dark themes.

Everything else (layout, microformats, the garden RSS importer, the POSSE pattern) can stay as-is. The `CNAME` file and `.github/workflows/webmention.yml` reference `sebthecanadian.ca` explicitly — change those before deploying, or delete them if you don't need webmentions or a custom domain. Self-host or adapt: the codebase is yours.

Runtime floor: **Node 22+**, `npm install`, then `npm run build`. No other services required to build. Deployment is GitHub Pages via the included workflow; swap in whichever static host you prefer.

## Ops Notes

- **Hosting:** GitHub Pages (free)
- **DNS:** Cloudflare (records kept DNS-only)
- **HTTPS:** Enforced via GitHub Pages
- **Garden:** https://cognitivearchitecture.ca/
- **Contact:** hello@cognitivearchitecture.ca
