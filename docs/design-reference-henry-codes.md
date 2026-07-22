# Design Reference — henry.codes (Henry Desroches)

Notes from reviewing `henry.codes` as outside design inspiration. Captured
2026-07-22. Unlike the first two reviews, this one hit no network block —
the session's egress policy was updated mid-conversation to allow this
domain, so the analysis below is from the live HTML and CSS directly
(`/css/style.css`, `/css/fonts.css`), not inference from class names.

Like the other two docs in this set, this is **inspiration to filter
through the Data Druid system**, not a redesign brief.

## What the site is

The personal site and portfolio of Henry Desroches, a creative web
developer based in Denver, Colorado. Built with **Eleventy** — the same
static site generator `sebthecanadian.ca` uses — with heavy IndieWeb
commitments (`rel="me"`, webmention, micropub, IndieAuth, homegrown RSS)
and a self-hosted, privacy-respecting analytics script (Fathom) instead of
Google Analytics.

The home page's own information architecture splits into two labeled
groups that map almost exactly onto this site's existing structure:

- **"Garden"** — Articles, Notes, Case Studies (long-form writing, rough
  idea-tending, and project write-ups)
- **"Meta"** — About, Now

This is close to a direct match for `sebthecanadian.ca`'s own "digital
garden as sibling, Now page, resume/about" shape — useful less as new
inspiration and more as confirmation that this IA is a well-trodden,
validated pattern among indie developer sites, not an idiosyncratic
invention.

The voice is deliberately maximalist and gothic-editorial — "True Terrors
of the New Dark Web," a scroll warning ("Scroll with caution and with
care"), a top-of-page personal/political statement rendered as literal
site chrome before the nav even loads. It reads as a "zine," not a resume.

## Patterns worth stealing

1. **A genuine three-tier type system.** Confirmed via `font-face` rules
   and component CSS:
   - **Manuka** — an ultra-bold, uppercase-only display face used at
     enormous sizes (`font-size: 10rem` for page headers, `7.5rem` for
     section titles), tight `line-height: .8`, no lowercase feel at all.
     This is the "shout" register — hero titles and section banners only.
   - **Louize / Louize Display** — a serif used for headings, card titles,
     and the top callout banner. The "read, but still make an entrance"
     register.
   - **Neue Montreal** — a sans used for body copy, article metadata, nav,
     and UI chrome. The "quiet, functional" register.
   Three distinct registers (shout / read-with-entrance / quiet-utility)
   is a stronger, more legible hierarchy than either Yepsen's single-sans
   system or Wengerd's two-way serif/sans split — worth citing as the
   upper bound of how much typographic contrast a personal site can
   support before it stops reading as one voice.

2. **A minimal two-value inverted palette.** Confirmed: light mode is
   `--color-background: #fafafa` / `--color-text: #2a2722` (a warm
   near-black charcoal-brown, not pure black). Dark mode is *exactly those
   two values swapped* — `--color-background: #2a2722` /
   `--color-text: #fafafa`. The entire theme system is built from one
   warm dark tone and one off-white, inverted, plus a couple of muted
   grays for secondary text/borders. Not a suggestion to simplify Seb's
   own palette (which deliberately uses distinct hues per mode for a
   "forest at night" mood, not a mechanical inversion, per
   `DESIGN_BRIEF.md`) — just a data point on how little a workable, WCAG-
   passable two-mode theme actually needs.

3. **"Echo" ghost-text behind case-study titles.** Each "selected work" row
   repeats the client name several times in large, muted, `aria-hidden`
   text (`--color-echo: #3e3b36`) flanking the real title and inline brand
   logo (Stripe, YouTube, NYT, etc.). Pure decoration, invisible to screen
   readers, but gives a plain list of project links a poster/editorial
   feel without needing photography or case-study screenshots. Cheap to
   reproduce with a muted text color and `aria-hidden="true"` — could work
   for a Projects list that doesn't have hero images for every entry yet.

4. **A "link + one-line descriptor" nav pattern, confirmed twice over.**
   Home nav items read as `Title — one-line description in italics`
   (`Articles — Polished, complete guides and essays.`), grouped under
   small labeled headers ("Garden", "Meta"). This is essentially the same
   shape `sebthecanadian.ca`'s own index-table home page already uses —
   good confirmation, not new information, but useful as independent
   validation that the existing pattern is sound rather than a case for
   changing it.

5. **Category *and* tags as separate taxonomy axes.** Each article shows a
   `category` (e.g. "journal," "resource") *and* separate `tags`
   ("rants | labor," "html | css | javascript | rants"). Seb's `post.njk`
   currently only has tags. A coarse category (journal vs. resource vs.
   whatever else) alongside topic tags is a small, optional addition if
   the writing section ever grows enough to need two axes instead of one.

6. **A footer breadcrumb literally labeled "You are here."** Friendlier
   than a generic `Home / Section / Page` trail — worth the wording swap
   wherever a breadcrumb exists.

7. **A visibly "disabled" (not deleted) social link.** The Twitter/X entry
   in the social list carries a `social-list__list-item--disabled`
   modifier class rather than being removed outright — the account still
   exists and the link still resolves, but the UI marks it as
   de-emphasized/not endorsed. A considerate middle ground between
   silently deleting a still-real account and leaving it looking equally
   current as everything else.

8. **Section-level forced-dark theming, confirmed on a second, unrelated
   site.** The "brief letter from the editor" section and the "selected
   works" section both carry a `themed dark` class, rendering dark
   regardless of the visitor's overall light/dark preference — the same
   "punctuation block" idea already logged from `neilwengerd.com`'s
   Campfire/Grafica CTA sections, now confirmed independently on a
   structurally different site built by a different person. Two
   unrelated sites converging on the same device is a stronger signal
   than either alone that it's a genuinely reusable pattern, not a
   one-off flourish — see the matching backlog item from the Wengerd
   review.

9. **Progressive enhancement, demonstrated end-to-end.** `<body
   class="no-js">` is stripped by a one-line inline script the moment JS
   runs, and CSS explicitly branches on it —
   `.no-js .case-study-row--coming-soon::after{content:unset}` removes a
   JS-dependent decorative bit when there's no JS, rather than leaving
   broken output. Page transitions are handled by Taxi.js
   (`data-taxi`/`data-taxi-view` attributes) — a library specifically
   built to layer smooth transitions on top of ordinary same-site links,
   so the site still works as plain navigable HTML with JS off. This is a
   real, working existence proof that animated page transitions and a
   "must work without JS" commitment aren't mutually exclusive — a useful
   contrast to the Grafica carousel already flagged as a *don't* in
   `design-reference-neil-wengerd.md` (that one fought the platform with
   150 lines of custom slider JS instead of degrading gracefully).

10. **Fathom instead of Google Analytics.** A single self-hosted-style
    script (`cdn.usefathom.com`), no cookie banner implied, no `gtag.js`
    boilerplate. If analytics are ever wanted on `sebthecanadian.ca`
    beyond server logs, this is the category of tool that doesn't
    contradict the IndieWeb/convivial commitments already in
    `DESIGN_PRINCIPLES.md` — worth naming specifically rather than
    reaching for GA by default.

11. **A view-source easter egg.** The footer's copyright line is literally
    `` `© ${new Date().getCurrentYear()}` `` — an unevaluated JS template
    literal left as static text, deliberately, with an HTML comment reading
    "Made you look, you massive dork you 😘" and a link to a post titled
    `/writing/i-know-about-the-date-in-the-footer/` explaining the joke.
    A small, low-cost personal touch that rewards visitors who view
    source. Seb's site already has a version of this instinct
    (`console-hello.js`) — this is confirmation that instinct is worth
    keeping and maybe extending, not a new idea to import.

## What NOT to copy

- **The specific voice and the top-of-page personal/political statement.**
  The gothic "New Dark Web" framing and the literal statement rendered as
  site chrome before the nav are Henry's own voice and stance — not
  something to import wholesale. (The *general* principle — that a site
  can state something true about its author directly, in its own words,
  as visible chrome rather than burying it in an about page — already
  came up independently in `design-reference-neil-wengerd.md` item 14;
  that's the transferable idea, not this specific execution.)
- **Rotated, oversized display type as a hero layout.** The hero's first
  headline segment is rendered sideways (`transform: rotate(90deg)`) at a
  container-relative size up to `37.6cqmin`, clearly tuned for a specific
  wide desktop composition. Visually striking, but a high-maintenance,
  high-risk choice for readability at small viewports and doesn't serve
  the "human-scale, sustainable" commitments as directly as the type-
  system pattern above (item 1) does on its own.
- **Manually hardcoded diagonal list staggering.** Each case-study row's
  left padding is a fixed value keyed to `nth-of-type` position (row 1:
  `10vw`, row 2: `20vw`, row 3: `40vw`, …) to create a cascading diagonal
  layout. Clever, but brittle — it breaks or needs manual re-tuning any
  time the list's order or length changes, which conflicts with Seb's own
  stated goal for the Projects page: "designed to be reusable — new
  projects slot in without restructuring" (`DESIGN_BRIEF.md`).

## Suggested next steps

See `BACKLOG.md` for the concrete "Idea" items pulled from this review
(echo ghost-text for project rows, a category axis alongside tags, "You
are here" breadcrumb wording, a visibly-disabled social link pattern, and
Fathom as the default analytics option if one is ever wanted). None of
this is scheduled — it's inspiration to draw on next time a relevant page
or component is touched.
