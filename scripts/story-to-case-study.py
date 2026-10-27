"""Convert a Portfolio Pudding story into a sebthecanadian.ca case study.

Usage:  python3 scripts/story-to-case-study.py <story.html> <slug> <site-repo> [body-out-dir]

<story.html> sits beside the substrate.css and substrate.js it was published with.
Writes into the site repo:
  src/assets/css/case-study.css           shared substrate, scoped to .story, on site tokens
  src/assets/css/case-study-marks.css     pen + pixel and fixes, loaded last
  src/assets/js/case-study.js             shared substrate script
  src/assets/css/case-studies/<slug>.css  the story's own styles, scoped to .story
and writes <slug>-body.html to body-out-dir (default: the current directory),
to paste into src/projects/<slug>/index.njk between {% raw %} and {% endraw %},
under front matter that carries the clearance record (docs/portfolio-clearance.md).
Refuses stories whose markup doesn't balance. Python 3 standard library only.
"""
import re, sys, os, pathlib

if len(sys.argv) < 4:
    sys.exit(__doc__)
story_path, slug, site = sys.argv[1], sys.argv[2], pathlib.Path(sys.argv[3])
here = pathlib.Path(story_path).parent
substrate_css = (here / "substrate.css").read_text()
substrate_js = (here / "substrate.js").read_text()
story = pathlib.Path(story_path).read_text()

# ── CSS scoping ────────────────────────────────────────────────────────────
SCOPE = ".story"

def scope_selector(sel, in_narrow):
    sel = sel.strip()
    if not sel:
        return None
    if sel.startswith(":root") or sel == "html":
        return sel                       # variables / scroll padding: page-level, this file only loads on stories
    if sel == "body::before":
        return None                      # safe-area cover; the site handles its own chrome
    if sel == "body":
        return SCOPE
    if sel == "*":
        return f"{SCOPE}, {SCOPE} *"
    m = re.match(r'^(html(?:\[[^\]]*\]|:not\([^)]*\))*)\s+(.*)$', sel)
    if m:                                # html[data-aud=…] descendant rules
        return f"{m.group(1)} {SCOPE} {m.group(2)}"
    if in_narrow and sel.startswith(".scrolly:not(.inline) > .graphic"):
        # Phones hide the sticky figure only once the script has made per-step copies.
        return f"html.story-js {SCOPE} {sel}"
    return f"{SCOPE} {sel}"

def scope_rules(css, in_narrow=False):
    out, i = [], 0
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    while i < len(css):
        j = css.find('{', i)
        if j == -1:
            break
        head = css[i:j].strip()
        # find matching brace
        depth, k = 1, j + 1
        while depth:
            if css[k] == '{': depth += 1
            elif css[k] == '}': depth -= 1
            k += 1
        body = css[j + 1:k - 1]
        if head.startswith('@keyframes'):
            out.append(f"{head}{{{body}}}")
        elif head.startswith('@media') or head.startswith('@supports'):
            narrow = in_narrow or 'max-width' in head
            inner = scope_rules(body, narrow)
            if inner.strip():
                out.append(f"{head}{{\n{inner}\n}}")
        else:
            sels = [scope_selector(x, in_narrow) for x in split_selectors(head)]
            sels = [x for x in sels if x]
            if sels:
                out.append(f"{', '.join(sels)}{{{body.strip()}}}")
        i = k
    return "\n".join(out)

def split_selectors(head):
    parts, depth, cur = [], 0, ''
    for ch in head:
        if ch in '([': depth += 1
        if ch in ')]': depth -= 1
        if ch == ',' and depth == 0:
            parts.append(cur); cur = ''
        else:
            cur += ch
    parts.append(cur)
    return parts

def drop_colour_roots(css):
    """Remove the substrate's own palette blocks; keep scale and nav height."""
    css = re.sub(r'@media \(prefers-color-scheme: dark\)\{:root:not\(\[data-theme="light"\]\)\{[^}]*\}\}', '', css)
    css = re.sub(r':root\[data-theme="dark"\]\{[^}]*\}', '', css)
    def keep_scale(m):
        decls = [d.strip() for d in m.group(1).split(';') if re.match(r'\s*--(s-?\d|nav-h)', d)]
        return ':root{' + ';'.join(decls) + '}'
    css = re.sub(r':root\{([^}]*--display[^}]*)\}', keep_scale, css, count=1)
    return css

def rename_vars(css):
    # --surface collides with the site's derived token; the story's panels use their own name.
    return css.replace('var(--surface)', 'var(--st-surface)')

ALIASES = """/* ── Story palette, drawn from the site tokens (tokens.css) ──────────────
   Colour is weather on this site; inside figures meaning rides on marks
   (docs/pen-and-pixel.md). Names below are the substrate's own, aliased. */
:root{
  --fg: var(--ink);
  --st-surface: var(--bg-alt);
  --dot: var(--rule);
  --verified: var(--muted);
  --recorded: var(--moss);                                         /* where to look: your path, the answer */
  --recorded-soft: color-mix(in oklab, var(--moss) 12%, var(--bg));
  --held: var(--amber);                                            /* a state: always with a word */
  --held-soft: color-mix(in oklab, var(--amber) 13%, var(--bg));
  --ai: var(--ink-soft);                                           /* AI is shown by dither, not hue */
  --ai-soft: transparent;
  --body: var(--text);
}

/* The site's layout shell (base.css) narrows and pads header/main/footer;
   a story sets its own measure. */
main#content{ max-width: none; padding-left: 0; padding-right: 0; padding-top: var(--space-lg); }
.story header, .story footer{ max-width: none; margin: 0; padding: 0; }
.story-note{ max-width: var(--maxw); margin: 0 auto; padding: 0 var(--pad); }
"""

MARKS = """
/* ── Pen + pixel: marks in a strip at the left edge, text never on texture ── */
.story .pair .cell, .story .chip.ai, .story .chip.ink, .story .cl{
  --mkw: 8px; --mkbg: var(--st-surface);
  padding-left: calc(var(--mkw) + 6px);
}
.story .pair .cell:first-of-type{ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-solid); }
.story .pair .cell:last-of-type{ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-dither); }
.story .ttpage .pair .cell{ --mkbg: var(--recorded-soft); color: var(--fg); }
.story .pairfull .cell{ padding-left: 6px; background: none; }
.story .chip.ai{ --mkbg: var(--bg); color: var(--fg); border: 1px solid var(--mark);
  background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-dither); }
.story .chip.ink{ --mkbg: var(--bg); color: var(--fg); border: 1.5px solid var(--fg);
  background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-hatch); }
.story .cl{ --mkw: 6px; --mkbg: var(--bg); color: var(--fg); border: 1px solid var(--mark); }
.story .cl.doc, .story .cl.inf, .story .cl.unr{ color: var(--fg); }
.story .cl:not(.doc):not(.inf):not(.unr){ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-solid); }
.story .cl.doc{ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-ruled); }
.story .cl.inf{ border-style: solid; background: linear-gradient(90deg, transparent 0 var(--mkw), var(--mkbg) var(--mkw)), var(--mark-hatch); }
.story .cl.unr{ padding-left: 6px; background: transparent; border: 1px dashed var(--held); }

/* Amber marks a state; in light mode it never colours text. */
.story .tttrail .gap, .story .halfkey, .story .srows .half{ color: var(--fg); }

/* Your clicks: "before" recedes, the answer carries moss. */
.story .tc .bar.before{ background: var(--muted); }

/* use-case-life: amber stays on borders and tints; the word beside it wears ink. */
.story .chip.flag, .story .ghost, .story .v-review, .story .review, .story .lvlbar span.maybe,
.story .mk.unsure, .story .swout .chg, .story .pill.rev, .story .swapnote.changed,
.story .rc-id span, .story .rlink span{ color: var(--fg); }
.story .c-ghost{ color: var(--fg) !important; }
.story .review.none{ color: var(--muted); }
.story .seg input[value="unsure"]:checked+label{ background: var(--held-soft); color: var(--fg); box-shadow: inset 0 0 0 1.5px var(--held); }
/* Numbered markers name a step, not a state: ink rings, moss on the step you're reading. */
.story .gnum{ background: var(--bg); color: var(--fg); box-shadow: inset 0 0 0 1.5px var(--fg); }
.story .tl .bandt, .story .gm text{ fill: var(--fg); }
.story .gm circle{ fill: var(--st-surface); stroke: var(--fg); }
.story .gl-arc{ stroke: var(--muted); }
.story .gapline.g1 .m1 circle, .story .gapline.g2 .m2 circle, .story .gapline.g3 .m3 circle,
.story .gapline.g4 .m4 circle, .story .gapline.g0 .gm circle{ fill: var(--recorded); stroke: var(--recorded); }
.story .gapline.g1 .m1 text, .story .gapline.g2 .m2 text, .story .gapline.g3 .m3 text,
.story .gapline.g4 .m4 text, .story .gapline.g0 .gm text{ fill: var(--bg); }
/* Hero chart: two series, told apart by line style and direct labels. */
.story .tl .tick{ stroke-dasharray: 6 4; }

/* ── Brand layer (docs/brand.md) ──────────────────────────────────────────── */
/* The site's heading tier: Fraunces at 600, H2s in moss, the site's fluid sizes. */
.story h1, .story h2, .story h3{ letter-spacing: -0.011em; line-height: var(--leading-tight); }
.story .hero h1{ font-size: clamp(2rem, 1.5rem + 2.4vw, 2.9rem); font-weight: 600; }
.story .lens-intro h2, .story .outcome h2, .story .claims h2{ font-size: clamp(1.3rem, 1.12rem + 0.9vw, 1.6rem); font-weight: 600; color: var(--moss); }
.story .step h3, .story .notice-lede h3, .story .oc-grid h3, .story .credit h3{ font-size: clamp(1.12rem, 1.03rem + 0.45vw, 1.35rem); font-weight: 600; }
/* A chapter's eyebrow stays a quiet label above its H2, not lede-sized. */
.story .lens-intro .eyebrow{ font-size: var(--s-1); }
/* One card look: figure panels wear the site's card (components.css .card). */
.story .panel{ border: 1px solid var(--rule); border-radius: var(--radius); padding: var(--space-lg);
  background: linear-gradient(180deg, color-mix(in oklab, var(--bg-alt) 55%, var(--bg)) 0%, var(--bg-alt) 100%);
  box-shadow: var(--card-shadow); }
/* Amber means a state: always an icon beside the word. */
.story .chip.flag::before, .story .ghost::before, .story .c-ghost::before, .story .pill.rev::before,
.story .rc-id span::before, .story .rlink span::before, .story .lvlbar span.maybe::before,
.story .seg input[value="unsure"]:checked+label::before, .story .halfkey::before, .story .srows .half::before{
  content: ""; display: inline-block; flex: none; width: .5em; height: .5em; margin-right: .45em;
  vertical-align: .08em; background: var(--held); transform: rotate(45deg); }
.story .rc-id span{ white-space: nowrap; }
/* front-door's trail gap draws its lines with both pseudo-elements: the icon rides on the left line's end. */
.story .tttrail .gap::before{ border-top: 0; height: 10px;
  background:
    linear-gradient(to bottom right, transparent 50%, var(--held) 0) right 5px top 0 / 5px 5px no-repeat,
    linear-gradient(to bottom left, transparent 50%, var(--held) 0) right 0 top 0 / 5px 5px no-repeat,
    linear-gradient(to top right, transparent 50%, var(--held) 0) right 5px top 5px / 5px 5px no-repeat,
    linear-gradient(to top left, transparent 50%, var(--held) 0) right 0 top 5px / 5px 5px no-repeat,
    repeating-linear-gradient(90deg, var(--held) 0 4px, transparent 4px 8px) left center / calc(100% - 15px) 1.5px no-repeat; }
/* Meaning by mark, not colour: a strip at the box's edge, beside the word that names it. */
.story .gate .cost .c-self, .story .gate .cost .c-exp, .story .gate .cost .c-full{
  --mkw: 7px; color: var(--fg); border: 1px solid var(--mark); padding-left: calc(var(--mkw) + 6px);
  background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-hatch); }
.story .gate .cost .c-self{ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-solid); }
.story .result .col{ --mkw: 8px; padding-left: calc(var(--mkw) + 10px);
  background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-dither); }
.story .result .col.stated{ background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-solid); }
.story .cstat span{ --mkw: 6px; color: var(--fg); border: 1px solid var(--mark); padding-left: calc(var(--mkw) + 6px);
  background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-ruled); }
.story .cstat span.v{ color: var(--fg); background: linear-gradient(90deg, transparent 0 var(--mkw), var(--bg) var(--mkw)), var(--mark-solid); }
.story .cstat span.p{ border-style: dashed; padding-left: 7px; background: var(--bg); }

/* ── Without JavaScript: show every figure in its finished state ────────── */
html:not(.story-js) .story .dim{ opacity: 1; }
html:not(.story-js) .story .tag{ opacity: 1; }
/* Script-built forms get a static copy of their default answers; controls that need the script step aside. */
.story .nojs-q{ display: none; }
html:not(.story-js) .story .nojs-q{ display: block; list-style: none; margin: 0; padding: 0; font-size: .88rem; }
html:not(.story-js) .story .nojs-q li{ display: flex; justify-content: space-between; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--rule); }
html:not(.story-js) .story .seg2, html:not(.story-js) .story .swaphint, html:not(.story-js) .story .swapnote,
html:not(.story-js) .story .reassess .rreset{ display: none; }
/* use-case-life hides a card's detail until its step; without the script, show it. */
html:not(.story-js) .story #between .graphic .mini.dim{ display: block; }
html:not(.story-js) .story #between .graphic .mini.flowline{ display: flex; }

/* ── Claims register on phones: one claim per block, nothing squeezed ──── */
@media (max-width: 560px){
  .story .reg, .story .reg tbody, .story .reg tr, .story .reg td{ display: block; width: auto; }
  .story .reg thead{ display: none; }
  .story .reg tr{ padding: 10px 0; border-bottom: 1px solid var(--rule); }
  .story .reg td{ border: 0; padding: 3px 12px; white-space: normal; }
  .story .reg td:first-child{ width: auto; white-space: nowrap; }
}
"""

shared = ALIASES + "\n" + scope_rules(rename_vars(drop_colour_roots(substrate_css)))
marks = ("/* case-study-marks.css — pen + pixel for case studies (docs/pen-and-pixel.md),\n"
         "   the brand layer (docs/brand.md: heading tier, card look, amber icons),\n"
         "   plus the no-JavaScript and phone fixes. Loaded LAST, after the story's own\n"
         "   stylesheet, so these win over equally specific story rules. */\n" + MARKS)
shared = ("/* case-study.css — the shared stylesheet for case studies (a Portfolio Pudding\n"
          "   scrollytelling page inside the site). Generated from the story substrate by\n"
          "   scoping every rule to .story and drawing colour and type from tokens.css.\n"
          "   Loaded only on case-study pages. */\n" + shared)

story_css = re.search(r'<style>([\s\S]*?)</style>', story).group(1)
story_css_out = (f"/* {slug} — this case study's own figure styles, scoped to .story. */\n"
                 + scope_rules(rename_vars(story_css)))

js = ("/* case-study.js — the shared script for case studies (story substrate).\n"
      "   Marks the page so styles that depend on it (phone figure copies) only\n"
      "   apply once it runs. */\n"
      'document.documentElement.classList.add("story-js");\n' + substrate_js)

# ── Story body ─────────────────────────────────────────────────────────────
start = story.index('<header class="wrap hero">')
end = story.index('<footer class="wrap">')
body = story[start:end].rstrip()
body = body.replace('<main>', '<div class="story-main">', 1).replace('</main>', '</div>', 1)

# Refuse unbalanced markup: inside the site's wrapper a stray close tag ends the
# story early, and everything after it loses its styles.
import html.parser
class _Balance(html.parser.HTMLParser):
    VOID = {'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr',
            'path','rect','circle','line','polyline','polygon','ellipse','stop','use'}
    def __init__(self): super().__init__(); self.stack = []; self.problems = []
    def handle_starttag(self, t, a):
        if t not in self.VOID: self.stack.append((t, self.getpos()[0]))
    def handle_endtag(self, t):
        if t in self.VOID: return
        if self.stack and self.stack[-1][0] == t: self.stack.pop(); return
        self.problems.append(f"line {self.getpos()[0]}: </{t}> doesn't match <{self.stack[-1][0] if self.stack else 'nothing'}>")
_b = _Balance(); _b.feed(re.sub(r'<script[\s\S]*?</script>', '', body))
if _b.problems or _b.stack:
    sys.exit("unbalanced story markup:\n  " + "\n  ".join(_b.problems + [f"unclosed <{t}> from line {n}" for t, n in _b.stack]))
body = body.replace('<p class="eyebrow">', '<p class="eyebrow"><span class="masthead__stamp" aria-hidden="true">S&middot;L</span> ', 1)
scripts = story[story.index('<script src="substrate.js"></script>'):]
scripts = scripts.replace('<script src="substrate.js"></script>', '<script src="/assets/js/case-study.js"></script>')
body = body + "\n\n" + scripts.strip()

out = {
    "src/assets/css/case-study.css": shared,
    "src/assets/css/case-study-marks.css": marks,
    f"src/assets/css/case-studies/{slug}.css": story_css_out,
    "src/assets/js/case-study.js": js,
}
# The body is assembled into src/projects/<slug>/index.njk by hand (front matter and
# clearance record are the author's). Anything under src/projects/ is a case study, so
# the intermediate file stays out of the site.
out_dir = pathlib.Path(sys.argv[4]) if len(sys.argv) > 4 else pathlib.Path.cwd()
(out_dir / f"{slug}-body.html").write_text(body + "\n")
print(f"wrote {slug}-body.html (scratch, {len(body):,} bytes)")
for rel, text in out.items():
    p = site / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text if text.endswith("\n") else text + "\n")
    print(f"wrote {rel} ({len(text):,} bytes)")
