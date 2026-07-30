#!/usr/bin/env python3
"""Generate the site's brand marks: OG social cards + favicon/touch-icon PNGs.

Usage:  python3 scripts/generate-og.py
Regenerate whenever the palette or the identity mark changes.
Requires: pillow, fonttools, brotli  (pip install pillow fonttools brotli)

Palette mirrors the light-mode tokens (tokens.css): parchment ground, ink
title, muted subtitle, and the light-mode accent (lavender/violet) on the
eyebrow + URL. The conifer stays a natural forest green — it's the identity
mark (same as favicon.svg), independent of the duotone accent.
"""
import io
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

INK = (21, 32, 26); MUTED = (89, 82, 73); BG = (245, 242, 235)
RULE = (212, 207, 197); VIOLET = (91, 63, 163); CONIFER = (61, 107, 52)

# OG card conifer — 9-row pixel grid: (row, x_start, width)
ROWS = [(1,5,2),(2,4,4),(3,3,6),(4,4,4),(5,3,6),(6,2,8),(7,1,10),(8,5,2),(9,5,2)]
# favicon.svg conifer — 24-unit grid rects: (x, y, w, h)
FAV = [(10,2,4,2),(8,4,8,2),(6,6,12,2),(8,8,8,2),(6,10,12,2),(4,12,16,2),(2,14,20,2),(10,16,4,4)]

def font(name, size):
    f = TTFont(f"src/assets/fonts/{name}.woff2"); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)

def tree(d, ox, oy, u, color):
    for y, xs, w in ROWS:
        d.rectangle([ox+xs*u, oy+y*u, ox+(xs+w)*u-1, oy+(y+1)*u-1], fill=color)

def center(d, W, text, fnt, y, fill):
    d.text(((W - d.textlength(text, font=fnt)) / 2, y), text, font=fnt, fill=fill)

def card(out, eyebrow, subtitle):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(img)
    u = 14; ox = (W - 12*u) // 2
    tree(d, ox, 44, u, CONIFER)
    if eyebrow:
        center(d, W, eyebrow, font("IBMPlexMono-SemiBold", 28), 258, VIOLET)
    center(d, W, "Seb (the Canadian)", font("IBMPlexMono-Bold", 58), 332, INK)
    center(d, W, subtitle, font("IBMPlexMono-Regular", 27), 432, MUTED)
    d.line([(300, 514), (900, 514)], fill=RULE, width=2)
    center(d, W, "sebthecanadian.ca", font("IBMPlexMono-SemiBold", 26), 544, VIOLET)
    img.save(out, optimize=True); print("wrote", out)

def icon(out, size, bg):
    """Render the favicon conifer (24-unit grid) at `size`px; bg=None → transparent."""
    S = 24
    img = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = size / S
    for x, y, w, h in FAV:
        d.rectangle([x*s, y*s, (x+w)*s-1, (y+h)*s-1], fill=CONIFER)
    img.save(out); print("wrote", out)

card("src/assets/img/og-default.png", None,
     "civic tech · knowledge architecture · Toronto")
card("src/assets/img/og-writing.png", "writing/",
     "Notes from the front door · garden at cognitivearchitecture.ca")
icon("src/assets/img/favicon.png", 32, None)
icon("src/assets/img/apple-touch-icon.png", 180, BG + (255,))
