---
layout: base.njk
title: Colophon
description: "How this site is built and maintained."
permalink: /colophon/
---

# Colophon

How this site is built.

<p class="meta-updated">this page rendered: <time datetime="{{ page.date | isoDateShort }}">{{ page.date | readableDate }}</time></p>

## What this site is

**sebthecanadian.ca** is a personal site — a stable identity page with durable links to the places I publish and work. It houses projects, writing (syndicated from the garden), a resume, and the usual /now and /uses pages.

## Where the real writing lives

The primary body of notes and writing lives in the garden: [cognitivearchitecture.ca](https://cognitivearchitecture.ca/). Writing is syndicated here as excerpts via the POSSE model (Publish on your Own Site, Syndicate Elsewhere).

## Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) (11ty) 3.x
- **Templating:** Nunjucks
- **Styling:** Vanilla CSS with custom properties — no Tailwind, no preprocessor
- **Fonts:** IBM Plex Mono (headings + code) + system font stack (body)
- **Content:** Markdown + YAML front matter + JSON data files
- **JS:** Progressive enhancement only — zero JS in the critical path

## Hosting and deployment

- Hosted on **GitHub Pages** via a GitHub Actions build pipeline.
- Custom domain managed via **Cloudflare DNS** (DNS-only records).
- HTTPS enforced at the GitHub Pages layer.

## Design approach

- **Data Druid** aesthetic: forest palette, pixel-art accents, warm parchment light mode, "forest at night" dark mode.
- Semantic HTML with microformats: `h-card`, `h-entry`, `h-feed`, `h-resume`.
- Webmention discovery for IndieWeb interoperability.
- Accessible: skip links, focus-visible styles, WCAG AA contrast.
- Portable by default — easy to migrate to another host or SSG.

## Contact

Email: [hello@cognitivearchitecture.ca](mailto:hello@cognitivearchitecture.ca)
