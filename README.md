# sebthecanadian.ca — Personal Site

This repository contains the source for **sebthecanadian.ca**, a minimal personal website intended to serve as a durable “front door” identity page (IndieWeb-style).

The site is designed to be:

- Simple, static, and low-maintenance
- Deployable via GitHub Pages
- Compatible with a future custom domain (via Cloudflare DNS)
- Explicitly linked to an existing digital garden hosted elsewhere

## Design Philosophy

All design and technical decisions are grounded in **[DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)**, which combines:

- **IndieWeb principles** — own your data, human-first design, progressive enhancement
- **Ivan Illich's convivial design** — tools that enable autonomy, require no expertise, and expand (not restrict) human agency

This foundation ensures the site remains minimal, durable, portable, accessible, and sustainable.

## Live URLs (intended)

- Personal site: https://sebthecanadian.ca/
- Garden / notes: https://cognitivearchitecture.ca/
- Contact: hello@cognitivearchitecture.ca

## Goals

- Provide a stable homepage at `sebthecanadian.ca`
- Offer clear navigation to:
  - The garden at `cognitivearchitecture.ca`
  - A contact method
  - (Optional) lightweight pages such as `/now` and `/colophon`
- Keep the implementation portable (no dependency on a specific stack)

## Non-Goals (for now)

- No CMS, database, or server-side code
- No build tooling required
- No IndieWeb plumbing yet (Webmention, Micropub, IndieAuth)
  - These can be added later if/when they become worth the complexity

## Repository Structure

```
├── index.html              # Homepage (h-card identity)
├── posts.html              # Blog posts (h-entry)
├── now.html                # /now page (current focus)
├── colophon.html           # How the site is built
├── 404.html                # Custom 404 page
├── CNAME                   # GitHub Pages custom domain
├── assets/
│   ├── site.css            # Site stylesheet (Data Druid aesthetic)
│   ├── theme-toggle.js     # Dark/light mode toggle
│   ├── favicon.svg         # Site icon
│   └── seb-stamp.jpeg      # Author portrait
├── docs/
│   ├── IMPROVEMENT_AUDIT.md
│   ├── IMPROVEMENT_PLAN.md
│   └── VALIDATION_REPORT.md
├── .github/
│   └── workflows/
│       └── webmention.yml  # Send webmentions on push
├── DESIGN_PRINCIPLES.md    # Philosophical foundation
├── IMPLEMENTATION_PLAN.md  # 6-phase UX/UI roadmap
├── PHASE1_AUDIT.md         # CSS audit results
├── TESTING_PLAN.md         # Testing checklist
├── BACKLOG.md              # Feature tracking
└── CHANGELOG.md            # Version history
```

## Ops Notes
	•	Hosting: GitHub Pages
	•	DNS: Cloudflare (records kept DNS-only)
	•	Garden: https://cognitivearchitecture.ca/
	•	Contact: hello@cognitivearchitecture.ca

