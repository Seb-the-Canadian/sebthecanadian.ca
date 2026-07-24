---
layout: base.njk
title: About
description: "About Seb Lathangue and how this site is built."
permalink: /about/
---

{% set mastheadLabel = "about/" %}
{% include "masthead.njk" %}

<figure class="about-portrait stamp frame">
  {% include "corners.njk" %}
  <img class="u-photo" src="/assets/img/seb-stamp.jpeg" alt="Woodcut portrait of Seb Lathangue" />
</figure>

<p class="lede">I'm Seb Lathangue. I live in Toronto. I work on knowledge architecture and data governance at Meridian Credit Union, and I run a civic-technology program called <a href="/projects/">CivCitDev</a> on the side. I think a lot about how information moves through organizations — which pieces stick, which get lost, and who ends up accountable for the difference.</p>

This site is a stable front door. The primary body of my writing lives in the garden at [cognitivearchitecture.ca](https://cognitivearchitecture.ca/) — this page gathers the durable parts: who I am, how I approach the work, and how this site is built.

<p class="meta-updated">this page rendered: <time datetime="{{ page.date | isoDateShort }}">{{ page.date | readableDate }}</time></p>

## How I approach the work

I didn't set out to work in data governance. I set out to work with information; in libraries, then in research, then in learning design. The governance piece came later, when I got deep enough into enterprise data work to realize the core problem usually isn't technical. It's that nobody can agree on what anything means, or who's accountable for it. <span class="pull-line">That's the problem I find interesting. Turns out there's a job for it.</span>

My background is genuinely unusual for this field: sociology and library science on the academic side, learning design and change management in practice, and now information architecture and data governance at the enterprise level. The through line, which I can see clearly in hindsight and not at all in the moment, is translation. Getting complex systems and the people who use them to actually understand each other.

If you want the formal version — titles, dates, credentials — the [resume](/resume/) is the place.

## How this site is built

**sebthecanadian.ca** houses projects, writing (syndicated from the garden), a resume, [the Now block](/#now) on the home page, and a `/uses` page. It's small on purpose. It's meant to last.

### Stack

- **SSG:** [Eleventy](https://www.11ty.dev/) (11ty) 3.x
- **Templating:** Nunjucks
- **Styling:** Vanilla CSS with custom properties — no Tailwind, no preprocessor
- **Fonts:** IBM Plex Mono, self-hosted — the whole site is monospace, body included
- **Content:** Markdown + YAML front matter + JSON data files
- **JS:** Progressive enhancement only — zero JS in the critical path

### Hosting and deployment

- Hosted on **GitHub Pages** via a GitHub Actions build pipeline.
- Custom domain managed via **Cloudflare DNS** (DNS-only records).
- HTTPS enforced at the GitHub Pages layer.

### Design approach

- **Data Druid** aesthetic: forest palette, pixel-art accents, warm parchment light mode, "forest at night" dark mode.
- Semantic HTML with microformats: `h-card`, `h-entry`, `h-feed`, `h-resume`.
- Webmention discovery for IndieWeb interoperability.
- Accessible: skip links, focus-visible styles, WCAG AA contrast.
- Portable by default — easy to migrate to another host or SSG.

The site runs no trackers, serves no ads, and stores nothing about anyone who visits. Its governance is written into the code; the [llms.txt](/llms.txt) file has a note for any AI reading along.

## Contact

Email: [hello@cognitivearchitecture.ca](mailto:hello@cognitivearchitecture.ca)
