# POSSE Post Template

Reference front matter structure for syndicated writing posts. Posts live in `src/writing/` as markdown files.

## Syndicated Post (from the garden)

```markdown
---
title: "Post Title"
date: 2026-03-09
excerpt: "A brief summary of the post for the card display on the writing page. Keep to 1-2 sentences."
gardenUrl: "https://cognitivearchitecture.ca/post-slug"
blueskyUrl: "https://bsky.app/profile/sebthecanadian.bsky.social/post/xxx"  # optional
tags:
  - tag1
  - tag2
syndicated: true
---

<!-- Body is optional for syndicated posts. The excerpt is displayed on the writing page
     with a "read more" link to the gardenUrl. If body content is included here, it serves
     as a longer preview but the canonical version lives in the garden. -->
```

## Native Post (original to this site)

```markdown
---
title: "Hello, IndieWeb"
date: 2026-01-13
excerpt: "First post on sebthecanadian.ca — testing h-entry markup and webmentions."
tags:
  - indieweb
  - meta
syndicated: false
---

Full post content lives here. This is the canonical version — there is no garden source.
The full text is rendered on the writing page, not just an excerpt.
```

## Field Reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `title` | Yes | string | Post title |
| `date` | Yes | date | ISO format (YYYY-MM-DD) |
| `excerpt` | Yes | string | 1-2 sentence summary for card display |
| `gardenUrl` | Syndicated only | URL | Canonical source in the garden |
| `blueskyUrl` | No | URL | Bluesky syndication target (added manually for v1) |
| `tags` | No | list | Content tags for filtering/organization |
| `syndicated` | Yes | boolean | `true` = garden origin, `false` = native post |

## Template Behavior

- **Syndicated posts** (`syndicated: true`): Rendered as excerpt cards with "Read more →" linking to `gardenUrl`. `u-syndication` markup on the garden link.
- **Native posts** (`syndicated: false`): Full content rendered on the writing page. No external source link.
- Both types appear in the h-feed and RSS/Atom output.
- `dt-published` set from `date` field.
