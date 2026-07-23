#!/usr/bin/env python3
"""Generate OG cards in the site's pixel dialect.

Usage:  python3 scripts/generate-og.py            # writes og-writing.png
Regenerate whenever tokens or the identity mark change.
Requires: pillow, fonttools, brotli  (pip install pillow fonttools brotli)
"""
import io
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

MOSS = (63, 122, 95); INK = (21, 32, 26); MUTED = (89, 82, 73)
BG = (245, 242, 235); RULE = (212, 207, 197); LINK = (42, 107, 74)
# 9-row pixel-grid conifer: (row, x_start, width) — the favicon's dialect
ROWS = [(1,5,2),(2,4,4),(3,3,6),(4,4,4),(5,3,6),(6,2,8),(7,1,10),(8,5,2),(9,5,2)]

def font(name, size):
    f = TTFont(f"src/assets/fonts/{name}.woff2"); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, size)

def tree(d, ox, oy, u, color):
    for y, xs, w in ROWS:
        d.rectangle([ox+xs*u, oy+y*u, ox+(xs+w)*u-1, oy+(y+1)*u-1], fill=color)

def center(d, W, text, fnt, y, fill):
    d.text(((W - d.textlength(text, font=fnt)) / 2, y), text, font=fnt, fill=fill)

W, H = 1200, 630
img = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(img)
u = 14; ox = (W - 12*u) // 2
tree(d, ox, 40, u, MOSS)
center(d, W, "writing/", font("IBMPlexMono-SemiBold", 28), 254, MOSS)
center(d, W, "Seb (the Canadian)", font("IBMPlexMono-Bold", 58), 330, INK)
center(d, W, "Notes from the front door · garden at cognitivearchitecture.ca",
       font("IBMPlexMono-Regular", 27), 430, MUTED)
d.line([(260, 512), (940, 512)], fill=RULE, width=2)
center(d, W, "sebthecanadian.ca", font("IBMPlexMono-SemiBold", 26), 542, LINK)
img.save("src/assets/img/og-writing.png", optimize=True)
print("wrote src/assets/img/og-writing.png")
