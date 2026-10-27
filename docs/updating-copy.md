# Updating the words on the site

A step-by-step guide to changing the text on sebthecanadian.ca by hand:
where each piece of copy lives, how to edit it, how to preview it on your
Mac, how to publish it, and how to confirm it went live. It assumes no
system-administration background. The brand rules (colour, type, voice)
are in [`brand.md`](brand.md); this guide is about the words.

Every command below goes in its own block. Copy it, paste it into
Terminal, press Return.

## The short version

1. Find the file that holds the text (table below).
2. Edit it in any text editor and save.
3. Preview on your Mac with `npm run dev`.
4. Commit and push with git.
5. Wait one to three minutes, then check the live page.

## What you need, once

- **The site's folder on your Mac.** If you don't have one yet, clone it:

```bash
git clone https://github.com/Seb-the-Canadian/sebthecanadian.ca.git
```

- **Node.js** (version 22 or newer). Check with:

```bash
node --version
```

  If that prints "command not found", install Node from <https://nodejs.org>
  (the LTS download) and open a new Terminal window.

- **The site's dependencies**, installed inside the folder. Do this the
  first time, and again whenever `package.json` changes:

```bash
npm install
```

All later commands assume Terminal is inside the site's folder. Get there
with `cd` followed by the folder's path, for example:

```bash
cd ~/sebthecanadian.ca
```

## Where each piece of text lives

Paths are relative to the site's folder. "Front matter" is the block
between the two `---` lines at the top of a page file; it holds the page
title and description and is best left alone unless you mean to change
those.

| Page | What you see | File | Notes |
|------|--------------|------|-------|
| Every page | The site name in the browser tab, the fallback description, the author name | `_data/site.json` | JSON: keep the quotes and commas |
| Every page | The top nav (Home, Projects, About) | `_data/navigation.json`, the `primary` list | Order of the list is the order on screen |
| Every page | The footer links (Résumé, Uses, Links, Email, RSS) | `_data/navigation.json`, the `colophon` list | `"external": true` marks links that leave the site |
| Every page | The footer small print: the keyboard-hint line and the © line | `src/_includes/footer.njk` | HTML; change only the words |
| Home | Your name, the one-line statement under it, the three tags (civic tech · knowledge architecture · Toronto) | `src/index.njk`, the `home-hero` block near the top | HTML |
| Home | The paragraph under the rule (the lede) | `src/index.njk`, the `home-lede` paragraph | HTML; `&mdash;` is a dash |
| Home | Section labels (Projects, Now, Elsewhere) | `src/index.njk`, the `<h2 class="eyebrow">` lines | |
| Home, Projects | The project rows (name, one-line description, status) | `_data/projects.json` | One object per project; case studies are added through `portfolio-clearance.md`, not here |
| Home | The Now block | `_data/now.json` | Two fields: `currently` (the prose, HTML links allowed) and `updated` (the date, `YYYY-MM-DD`). The "tended / resting / fallow" state comes from the date, so update the date when you update the text |
| Home | The Elsewhere links (Bluesky, GitHub, ORCID) | `_data/profiles.json` | These also become the `rel="me"` identity links in the page head |
| About | Everything on the page | `src/about.md` | Markdown; the opening paragraph is HTML inside `<p class="lede">`. The "this page rendered" line is the build date, not an edit date |
| Résumé | Everything: name, tagline, summary, experience, credentials, profile links | `_data/resume.yml` | YAML: indentation matters; multi-paragraph fields are split on blank lines. Keep the `|` after a field name when the text runs over several lines |
| Résumé | The photo | `src/assets/img/seb-headshot.jpg` | 1086 × 724 pixels (the two shots side by side are on purpose); if you replace it with another size, change the `width` and `height` on the `<img>` in `src/resume.njk` to match |
| Projects | The intro paragraph | `src/projects.njk`, inside `{% set mastheadLede %} … {% endset %}` | |
| Uses | Everything | `src/uses.md` | Markdown; the intro is in the `mastheadLede` block |
| Links | Everything | `src/links.md` | Markdown; same shape as Uses |
| Keyboard reference | Everything | `src/keyboard.md` | The chord table must match `src/assets/js/keyboard-nav.js`: add or remove chords in both |
| 404 page | The text | `src/404.md` | |
| Writing (unlinked since 2026-10-27) | The page intro; the posts | `src/writing.njk`; `src/writing/*.md` | See "Bringing the Writing section back" |
| For machines | The crawler note and the hidden "for curious humans" file | `src/llms.txt`, `src/stranger.txt` | Plain text |

Things that look like text but are generated: the footer's "Last updated"
(from git), "last built" (from the build), the season word in the page
source, the sitemap and the feed.

### A few editing rules

- **Markdown** (`.md` files): `**bold**`, `*italic*`, `[link text](https://…)`.
  Blank lines separate paragraphs.
- **JSON** (`.json` files): every value in double quotes, a comma after
  every item except the last, no comments. A missing comma breaks the
  build, and the build log will say where.
- **YAML** (`resume.yml`): indentation with spaces, never tabs. Quote any
  value that contains a colon.
- **HTML entities** you'll see in the files: `&mdash;` is an em dash,
  `&rarr;` an arrow, `&middot;` a middle dot, `&nbsp;` a space that
  won't break. Leave them; they are the house style.
- If you change a brand rule rather than a sentence (a colour, a font, how
  the theme switch behaves), that is a `brand.md` change too; see its
  pre-ship list.

## Preview on your Mac

Start the preview server from the site's folder:

```bash
npm run dev
```

Open <http://localhost:8080/> in a browser. Every time you save a file the
page rebuilds and reloads. When you're done, go back to Terminal and press
Control+C to stop it.

What to check before publishing: the page in light and dark (the switch
in the header), and at phone width (in Safari, Develop → Enter Responsive
Design Mode; if there is no Develop menu, turn it on in Safari → Settings
→ Advanced).

A note on the keyboard in Safari: by default Safari's Tab key only visits
text fields, so on most sites Tab seems to do nothing. This site puts its
links and buttons into Safari's Tab order itself, so plain Tab works here.
Elsewhere, hold Option while pressing Tab, or turn on Safari → Settings →
Advanced → "Press Tab to highlight each item on a web page".

Before you publish, run the full build once. It is the same command
GitHub runs, so if it passes here it will pass there:

```bash
npm run build
```

It fetches the latest garden posts and webmentions, checks the case
studies, and writes the site into `_site/`. A line starting with `Error`
means something to fix, usually a comma or a quote in a JSON or YAML file;
the message names the file. A `warning` about the garden fetch is not a
problem: the build keeps the last good copy.

## Publish

Get any changes that landed on GitHub since you last looked:

```bash
git pull
```

See which files you changed:

```bash
git status
```

See the exact lines (press `q` to leave the view):

```bash
git diff
```

Stage everything you changed:

```bash
git add -A
```

Commit with a short message that says what changed, in plain words:

```bash
git commit -m "Update the Now block for November"
```

Push it to GitHub, which publishes it:

```bash
git push
```

Two conventions to keep: a user-visible change gets a line in
`CHANGELOG.md` under a dated heading (look at the top of the file for the
shape), and the repo is public, so read your change once for anything
that shouldn't be.

If you would rather not use Terminal for a one-line fix, GitHub's web
editor works too: open the file on github.com, click the pencil, edit,
and "Commit changes". That commits straight to `main` and publishes just
the same.

## What happens after you push

Pushing to `main` starts the "Build and Deploy" workflow in GitHub
Actions. It installs dependencies, runs `npm run build`, and hands
`_site/` to GitHub Pages. The whole thing usually takes one to three
minutes.

Watch it at <https://github.com/Seb-the-Canadian/sebthecanadian.ca/actions>:
a yellow dot is running, a green tick is done, a red cross failed. Click a
run to read its log.

The same workflow also runs by itself every day at 09:17 UTC (05:17 in
Toronto during daylight time, 04:17 in winter), which is how garden posts
and webmentions refresh without a commit, and you can start it by hand
from the Actions page with "Run workflow".

## Check it went live

Open the page you changed on <https://sebthecanadian.ca>. If you still
see the old text, the browser is showing its own saved copy: reload with
Shift held, or open the page in a private window. The footer's "last
built" time tells you whether you are looking at the new build.

The domain's DNS is on Cloudflare but the pages are served straight from
GitHub Pages, so there is nothing to clear or purge on the Cloudflare
side.

If nothing has changed after five minutes:

1. Open the Actions page. A red cross on the latest run means the build
   failed; click it, then the "build" job, and read the last lines of the
   log. The usual cause is a typo in a JSON or YAML file.
2. Fix the file, commit and push again. The next run replaces the failed
   one.

## Undo a change

See the last few commits:

```bash
git log --oneline -5
```

Make a new commit that reverses one of them (paste its code in place of
`abc1234`), then push:

```bash
git revert abc1234
```

```bash
git push
```

Never rewrite history on `main`; a revert is a new commit and keeps the
record straight.

## Bringing the Writing section back

The Writing pages (`/writing/`, the posts, the tag pages) still exist but
are unlinked and marked "don't index" while the writing is relaunched. To
restore them:

1. Delete the line `noindex: true` from the front matter of
   `src/writing.njk`, `src/writing/hello-indieweb.md` and
   `src/writing/tags.njk`.
2. Add `{ "label": "Writing", "url": "/writing/" }` back to the `primary`
   list in `_data/navigation.json`, between Home and Projects.
3. If you want the `g w` chord back, add `w: "/writing/"` to the `routes`
   and a `{ chord: "g → w", dest: "Writing" }` row to `chordItems` in
   `src/assets/js/keyboard-nav.js`, and the matching row in
   `src/keyboard.md`.
4. The garden block that used to sit on the home page and the Writing
   page is in git history (the commit "Unlink the garden and the Writing
   section for now", 2026-10-27) if you want it back as it was.
