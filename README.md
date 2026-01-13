# sebthecanadian.ca — Personal Site

This repository contains the source for **sebthecanadian.ca**, a minimal personal website intended to serve as a durable “front door” identity page (IndieWeb-style).

The site is designed to be:

- Simple, static, and low-maintenance
- Deployable via GitHub Pages
- Compatible with a future custom domain (via Cloudflare DNS)
- Explicitly linked to an existing digital garden hosted elsewhere

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
