# sebthecanadian.ca
# Personal Site (IndieWeb Front Door)

This repository contains a minimal personal website intended to serve as a durable “front door” identity page (IndieWeb-style). It is designed to be:

- Simple, static, and low-maintenance
- Deployable via GitHub Pages
- Compatible with a future custom domain (via Cloudflare DNS)
- Able to link out to an existing digital garden hosted elsewhere

## Goals

- Provide a stable homepage at `https://<DOMAIN>/`
- Offer clear navigation to:
  - Garden / notes (hosted on a separate domain)
  - Contact methods
  - (Optional) `/now` and other lightweight pages
- Keep structure intentionally minimal so it can evolve without migrations

## Non-Goals (for now)

- No CMS or database
- No build tooling required
- No IndieWeb “plumbing” (Webmention, Micropub, IndieAuth) yet
  - These can be added later if/when needed

## Repository Structure
.
├─ index.html          # Homepage (identity front door)
├─ now.html            # Optional: “now” page
├─ colophon.html       # Optional: site notes / stack
├─ assets/             # Optional: images, CSS, favicon, etc.
├─ README.md
└─ CHANGELOG.md
