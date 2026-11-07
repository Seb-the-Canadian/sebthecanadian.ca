---
layout: base.njk
title: "Colophon"
description: "How sebthecanadian.ca is built, hosted and designed, and what it does with a visit."
permalink: /colophon/
---

{% set mastheadLabel = "colophon/" %}{% include "masthead.njk" %}

This page is one way I've built a small personal site, written down so it's easy to check.

**sebthecanadian.ca** houses projects, this about page and the résumé it hands off to, [the Now block](/#now) on the home page, and a [`/uses` page](/uses/). It's small on purpose. It's meant to last.

## Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) (11ty) 3.x
- **Templating:** Nunjucks
- **Styling:** Vanilla CSS with custom properties — no Tailwind, no preprocessor
- **Fonts:** Atkinson Hyperlegible (body & UI), Fraunces (display titles), IBM Plex Mono (code + data/terminal devices) — all self-hosted
- **Content:** Markdown + YAML front matter + JSON data files
- **JS:** Progressive enhancement only — zero JS in the critical path

## Hosting and deployment

- Hosted on **GitHub Pages** via a GitHub Actions build pipeline.
- Custom domain managed via **Cloudflare DNS** (DNS-only records).
- HTTPS enforced at the GitHub Pages layer.

## Design approach

- **Data Druid** aesthetic: forest palette in the accents (moss, lichen glow), warm parchment light mode, neutral-charcoal dark mode.
- Semantic HTML with microformats: `h-card`, `h-entry`, `h-feed`, `h-resume`.
- Webmention discovery for IndieWeb interoperability.
- Accessible: skip links, focus-visible styles, WCAG AA contrast.
- Portable by default — easy to migrate to another host or SSG.

The site runs no trackers, serves no ads, and keeps no record of anyone who visits. The only things it remembers are your own theme, reading-level and keyboard-shortcut choices, in your own browser, and only after you press a switch. Its governance is written into the code; the [llms.txt](/llms.txt) file has a note for any AI reading along.
