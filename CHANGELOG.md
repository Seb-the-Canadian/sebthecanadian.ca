# Changelog

Format:
- Dates in ISO format (YYYY-MM-DD)
- Focus on user-visible changes and structural milestones

## [Unreleased]

### Added
- Repository initialization and documentation.

### Changed
- N/A

### Fixed
- N/A

---

## 2026-01-13

## 2026-01-13

### Added
- Deployed `sebthecanadian.ca` via GitHub Pages (branch: `main`, folder: `/ (root)`).
- Configured custom domain: `www.sebthecanadian.ca`.
- Added `now.html` and `colophon.html`.
- Added primary navigation (`<header><nav>...</nav></header>`) across pages with `aria-current="page"` on the active page.
- Added a semantic “last updated” footer using `<time datetime="YYYY-MM-DD">`.
- Added an accessibility skip link (`Skip to content`) targeting `id="content"` on `now.html`.
- Added site stylesheet at `assets/site.css`.
- Linked stylesheet from pages via `<link rel="stylesheet" href="/assets/site.css" />`.

### Changed
- Updated `index.html` to include:
  - canonical URL (`<link rel="canonical" href="https://www.sebthecanadian.ca/" />`)
  - basic IndieWeb conventions (`h-card`, `p-name`, `p-note`, `rel="me"`)
  - consistent semantic structure (`header`, `main`, `footer`).
- Updated `now.html` to include:
  - shared navigation + semantic structure
  - skip link + `id="content"` main landmark.
- Updated `colophon.html` to include shared navigation and remove redundant internal “Home” link in the page header.

### Security
- HTTPS enforced for `www.sebthecanadian.ca` (GitHub Pages TLS issuance completed; “Enforce HTTPS” enabled).

### Infrastructure / Ops Notes
- Cloudflare DNS configured for GitHub Pages:
  - `www` as CNAME to `seb-the-canadian.github.io` (DNS only).
  - Apex `@` A records to GitHub Pages IPs (DNS only).
- Confirmed GitHub Pages build + deployment workflow runs succeed.
