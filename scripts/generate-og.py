#!/usr/bin/env python3
"""Generate the site's brand marks: OG social cards + favicon/touch-icon PNGs.

Usage:  python3 scripts/generate-og.py
Regenerate whenever the palette or the identity mark changes.
Requires: pillow, fonttools, brotli  (pip install pillow fonttools brotli)

Palette mirrors the light-mode tokens (tokens.css): parchment ground, ink
title, muted subtitle, and the light-mode accent (lavender/violet) on the
eyebrow + URL. The mark is the light-mode one, the lavender sprig (violet
florets, lilac highlights, forest-green stems), because these images serve
both modes. The dark-mode conifer lives only in favicon.svg, which switches
between the two with the colour scheme.
"""
import io
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

INK = (21, 32, 26); MUTED = (89, 82, 73); BG = (245, 242, 235)
RULE = (212, 207, 197); VIOLET = (91, 63, 163); CONIFER = (61, 107, 52)
LILAC = (138, 82, 204)

# The lavender sprig — the same 12-cell grid as favicon.svg's light mark.
# F floret (violet), H highlight (lilac), S stem (forest green). The art is
# 11 cells wide, so drawings shift right by half a cell to centre it.
SPRIG = """
.....H......
....FHF.....
.H...F...H..
FHF.FHF.FHF.
.F...F...F..
FHF.FHF.FHF.
.F...F...F..
FHF..S..FHF.
.S...S...S..
..S..S..S...
...SSSSS....
.....S......
"""
INKS = {"F": VIOLET, "H": LILAC, "S": CONIFER}
CELLS = [(x, y, INKS[c]) for y, row in enumerate(SPRIG.strip("\n").split("\n"))
         for x, c in enumerate(row) if c in INKS]

def font(name, size):
    f = TTFont(f"src/assets/fonts/{name}.woff2"); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)

def sprig(d, ox, oy, u):
    """Draw the sprig with cells of u px; (ox, oy) is the 12-cell grid's corner."""
    h = u // 2
    for x, y, ink in CELLS:
        d.rectangle([ox + x*u + h, oy + y*u, ox + (x+1)*u + h - 1, oy + (y+1)*u - 1], fill=ink)

def center(d, W, text, fnt, y, fill):
    d.text(((W - d.textlength(text, font=fnt)) / 2, y), text, font=fnt, fill=fill)

def card(out, eyebrow, subtitle):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(img)
    u = 12; ox = (W - 12*u) // 2
    sprig(d, ox, 48, u)
    if eyebrow:
        center(d, W, eyebrow, font("IBMPlexMono-SemiBold", 28), 258, VIOLET)
    center(d, W, "Seb (the Canadian)", font("IBMPlexMono-Bold", 58), 332, INK)
    center(d, W, subtitle, font("IBMPlexMono-Regular", 27), 432, MUTED)
    d.line([(300, 514), (900, 514)], fill=RULE, width=2)
    center(d, W, "sebthecanadian.ca", font("IBMPlexMono-SemiBold", 26), 544, VIOLET)
    img.save(out, optimize=True); print("wrote", out)

def icon(out, size, bg, u):
    """Render the sprig at `size`px with whole-pixel cells of u px, centred
    with a margin (crisp pixels; room for iOS's rounded corners).
    bg=None → transparent."""
    img = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    ox = (size - 11*u) // 2 - u // 2   # sprig() adds half a cell; the art is 11 cells wide
    oy = (size - 12*u) // 2
    sprig(ImageDraw.Draw(img), ox, oy, u)
    img.save(out); print("wrote", out)

card("src/assets/img/og-default.png", None,
     "civic tech · knowledge architecture · Toronto")
card("src/assets/img/og-writing.png", "writing/",
     "Notes from the front door · garden at cognitivearchitecture.ca")
icon("src/assets/img/favicon.png", 32, None, 2)
icon("src/assets/img/apple-touch-icon.png", 180, BG + (255,), 13)
