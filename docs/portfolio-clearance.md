# Portfolio clearance

How a case study gets onto this site, and the build check that holds the line.

## The rule

Case studies here are **practice pieces**: one way I've approached a problem,
told through an invented example. They carry nothing specific to any employer,
past or present, and they show how I work, not the only way to do it.

My employer's code of conduct treats non-public business information as the
employer's, whoever produced it, and leaving a company's name off doesn't
change that. The simplest way to honour it is never to publish any. So a case
study may contain:

- **The approach:** what I do, how, and why it has worked for me. General
  professional practice, in my own words, told as one way rather than the way:
  first person, no "best practice" verdicts, and alternatives named where a
  choice had them.
- **An invented example:** an organization, people, systems, figures and dates
  made up to show the method. Set it in a different sector from my employer's,
  so the fiction can't read as a disguise.
- **One line of where I've practised it,** at résumé level, without naming an
  employer ("I've used this in enterprise data governance work").

It may not contain, even reworded or anonymized:

- the employer's name, or its internal names for products, teams, committees
  or frameworks
- real figures, dates, timelines, team structures, partners or colleagues
- how a real system is built, configured or secured, or where it falls short
- real decisions, findings, incidents or results
- source material of any kind: documents, screenshots, data, code
- named vendor products: say "a form tool" or "an automation flow", not the
  product, so the entry doesn't describe a real technology stack
- anything that reads as speaking for an employer, or as criticism of one

**The recognizability test:** if a colleague read it, would they learn a
specific real system, decision, defect, person or event? If so, change it until
they wouldn't, or cut it. Recognizing the *method* as mine is fine; that's the
point of a portfolio. Learning a *fact* about an employer is not.

**One organization per entry.** Each case study invents its own organization,
in its own sector, and never reuses another entry's. Each entry can pass on its
own while the set, read together, describes one real employer's whole program.
Separate fictions keep the set from adding up. The check enforces this.

## The clearance record

Every case study carries this block in its front matter:

```yaml
clearance:
  tier: open                       # the only accepted value
  organization: "Fernlow Regional Transit"   # the invented organization; unique per entry
  sector: "public transit"         # its sector; unique per entry, never the employer's
  invented:                        # what in the entry is made up
    - "Fernlow Regional Transit, the organization"
    - "every person, figure and date"
  selfTest:                        # answer each honestly; all must be "no"
    unethical: "no"                # could it be seen as unethical, dishonest or discriminatory?
    culture: "no"                  # could it conflict with my employer's culture or code?
    reputation: "no"               # could it harm my employer's reputation?
    publicHarm: "no"               # could it harm me or my employer if made public?
    consequences: "no"             # could publishing it lead to consequences?
    negativeImpact: "no"           # could it hurt my employer, its customers, colleagues or community?
    policy: "no"                   # could it breach a policy or the code?
    recognizable: "no"             # would a colleague learn a real system, decision, defect, person or event from it?
  reviewed:                        # set by --stamp
  contentHash:                     # set by --stamp
```

The page must also show the practice-piece note:
`{% include "clearance-note.njk" %}` (or use a `case-study` layout that does).

## Publishing a case study

1. Draft it as a practice piece. In Claude, the **portfolio-clearance** skill
   reviews a draft against this page and rewrites anything that fails.
2. Fill in the clearance record. Answer the self-test yourself.
3. Stamp it: `node scripts/portfolio-check.js --stamp src/projects/<slug>/index.njk`
   Stamping records the review date and a fingerprint of everything a reader can
   see. It refuses if a blocked term is present or the record is incomplete.
4. Build. `npm run build` runs the check first and stops if any case study
   fails it.

Edit a stamped page, including its title or description, and the fingerprint no
longer matches, so the build fails until the page is reviewed and stamped again.
Whitespace-only edits don't count.

## Bringing a story into the site

Case studies are Portfolio Pudding stories living inside the site, at
`src/projects/<slug>/index.njk` with `layout: case-study.njk`.

1. Convert it: `python3 scripts/story-to-case-study.py story.html <slug> .`
   rebuilds the shared stylesheet on the site's tokens (scoped to `.story`, so
   nothing leaks onto the site's nav, type or footer) and writes the story's own
   styles and body. Figures carry meaning with pen + pixel marks, not colour
   (`docs/pen-and-pixel.md`).
2. Make `src/projects/<slug>/index.njk`: front matter with `title`,
   `description`, `tags: case-study`, the clearance record, and `pageStyles`
   listing `/assets/css/case-study.css`, `/assets/css/case-studies/<slug>.css`
   and `/assets/css/case-study-marks.css` (in that order; the marks load last).
   Then the body between `{% raw %}` and `{% endraw %}`.
3. Answer the self-test, stamp, build. The Projects page lists every page
   tagged `case-study`.

## What the check does, and what it can't

`scripts/portfolio-check.js` treats every file under `src/projects/`, plus
anything tagged `case-study`, as a case study. It confirms the record is
complete and current, that the note is shown, that no other case study uses
the same invented organization or sector, and that no blocked term appears
anywhere in the file: text, scripts, comments or metadata.

Terms live in `portfolio/terms.json` as hashes only, so the list doesn't publish
the names it guards. Add one with
`node scripts/portfolio-check.js --add-term block "<term>"`, or use `warn` for
words that are fine in general but worth a second look. Hashing keeps the list
from being read at a glance; someone who already knows a name could still test
for it.

The check can't tell whether a sentence is employer-specific; that is the
review's job. It makes skipping the review, or editing after it, impossible to
miss.

To scan a draft that isn't in the site yet:
`node scripts/portfolio-check.js --scan path/to/draft.html`
