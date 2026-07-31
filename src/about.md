---
layout: base.njk
title: About
description: "About Seb Lathangue and how this site is built."
permalink: /about/
---

{% set mastheadLabel = "about/" %}
{% include "masthead.njk" %}

<figure class="about-portrait">
  <img class="u-photo" src="/assets/img/seb-pixel-portrait.jpg" alt="Pixel-art portrait of Seb Lathangue" />
</figure>

<p class="lede">I'm Seb Lathangue. I live in Toronto. I work on knowledge architecture and data governance at Meridian Credit Union, and I run a civic-technology program called <a href="/projects/">CivCitDev</a> on the side. I think a lot about how information moves through organizations — which pieces stick, which get lost, and who ends up accountable for the difference.</p>

This site is a stable front door. The primary body of my writing lives in the garden at [cognitivearchitecture.ca](https://cognitivearchitecture.ca/) — this page gathers the durable parts: who I am, how I approach the work, and how this site is built.

<p class="meta-updated">this page rendered: <time datetime="{{ page.date | isoDateShort }}">{{ page.date | humanDate }}</time></p>

## How I approach the work

Before any of this had a name, I was hand-coding interview transcripts for a graduate study on how the media frames homelessness — deciding, line by line, which words belonged under which category, then defending the codebook when two coders disagreed. It looked like clerical work. It wasn't: every category was an argument about what the data meant, and who got to decide.

I didn't set out to work in data governance. I set out to work with information — in libraries, then research, then a lecture hall of 300 sociology undergrads, then learning design. The governance piece came later, when I got deep enough into enterprise data work to realize the core problem usually isn't technical. It's that nobody can agree on what anything means, or who's accountable for it.

Each stop turned out to be the same problem in different clothing. At Phreesia I was the translation layer between engineering and hospital IT departments — 100+ tickets closed a week, and a refusal to close the ones I'd only understood on the surface. At Meridian I've built a low-code governance program that grew from 50 builders to 150, and a self-serve knowledge hub that reaches 2,000-plus employees. Different rooms, same instinct: find where the confusion actually lives, and fix that.

A few things I've come to believe about the work: the governed path has to be the easier path, or people won't take it. Symptoms lie — diagnose at the level of the system. Communication isn't separate from governance; how you explain a rule is part of the rule. <span class="pull-line">That's the problem I find interesting. Turns out there's a job for it.</span>

<aside class="resume-callout">
  <p class="resume-callout__note">The formal version — titles, dates, and what each role actually involved — lives on the résumé.</p>
  <p><a class="button" href="/resume/">Read the résumé &middot; print to PDF &rarr;</a></p>
</aside>

## How this site is built

**sebthecanadian.ca** houses projects, writing (syndicated from the garden), this about-and-résumé page, [the Now block](/#now) on the home page, and a `/uses` page. It's small on purpose. It's meant to last.

### Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) (11ty) 3.x
- **Templating:** Nunjucks
- **Styling:** Vanilla CSS with custom properties — no Tailwind, no preprocessor
- **Fonts:** Atkinson Hyperlegible (body & UI), Fraunces (display titles), IBM Plex Mono (code + data/terminal devices) — all self-hosted
- **Content:** Markdown + YAML front matter + JSON data files
- **JS:** Progressive enhancement only — zero JS in the critical path

### Hosting and deployment

- Hosted on **GitHub Pages** via a GitHub Actions build pipeline.
- Custom domain managed via **Cloudflare DNS** (DNS-only records).
- HTTPS enforced at the GitHub Pages layer.

### Design approach

- **Data Druid** aesthetic: forest palette in the accents (moss, lichen glow), warm parchment light mode, neutral-charcoal dark mode.
- Semantic HTML with microformats: `h-card`, `h-entry`, `h-feed`, `h-resume`.
- Webmention discovery for IndieWeb interoperability.
- Accessible: skip links, focus-visible styles, WCAG AA contrast.
- Portable by default — easy to migrate to another host or SSG.

The site runs no trackers, serves no ads, and stores nothing about anyone who visits. Its governance is written into the code; the [llms.txt](/llms.txt) file has a note for any AI reading along.

## Contact

Email: [hello@cognitivearchitecture.ca](mailto:hello@cognitivearchitecture.ca)
