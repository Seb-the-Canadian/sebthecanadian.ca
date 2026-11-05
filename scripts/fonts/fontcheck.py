"""Check that every character the built site renders is covered by the IBM Plex Mono subset.

Usage: python fontcheck.py <built _site dir> <fonts dir> <out dir>
Re-subsets each IBMPlexMono-*.woff2 in <fonts dir> with the RANGE from subset.sh into <out dir>
(the fonts dir is never changed) and compares what the site renders against both files.
Run it on the original files to see before/after sizes; run it on the committed files to confirm
coverage ("site chars dropped by subset: none", "not in the full font either: none").
Needs fontTools and brotli."""
import glob, html, os, re, subprocess, sys
from fontTools.ttLib import TTFont

SITE = sys.argv[1]            # a built _site folder
FONTS = sys.argv[2]           # src/assets/fonts
OUT = sys.argv[3]             # scratch output dir
os.makedirs(OUT, exist_ok=True)
# one range, kept in subset.sh
_sh = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "subset.sh"), encoding="utf-8").read()
RANGE = re.search(r'^RANGE="([^"]+)"', _sh, re.M).group(1)

# 1. every character the site renders as text (all HTML pages, tags and scripts stripped)
chars = set()
for f in glob.glob(SITE + "/**/*.html", recursive=True):
    t = open(f, encoding="utf-8").read()
    t = re.sub(r"<script.*?</script>|<style.*?</style>", "", t, flags=re.S)
    t = re.sub(r"<[^>]+>", " ", t)
    chars |= set(html.unescape(t))
chars -= {"\n", "\r", "\t"}
print(f"distinct characters rendered across the site: {len(chars)}")

# 2. subset each Plex Mono file and compare cmaps
for src in sorted(glob.glob(FONTS + "/IBMPlexMono-*.woff2")):
    name = os.path.basename(src)
    dst = os.path.join(OUT, name)
    subprocess.run([sys.executable, "-m", "fontTools.subset", src, "--flavor=woff2", f"--unicodes={RANGE}",
                    "--layout-features=*", "--no-hinting", f"--output-file={dst}"], check=True, capture_output=True)
    before, after = os.path.getsize(src), os.path.getsize(dst)
    full = set(TTFont(src).getBestCmap().keys()); sub = set(TTFont(dst).getBestCmap().keys())
    used_cps = {ord(c) for c in chars}
    missing_full = sorted(used_cps - full)          # glyphs the site needs that even the full font lacks
    missing_sub = sorted((used_cps & full) - sub)   # glyphs the subset drops that the site uses
    print(f"{name}: {before:,} -> {after:,} B ({100*(1-after/before):.0f}% smaller); cmap {len(full)} -> {len(sub)}; "
          f"site chars dropped by subset: {[chr(c) for c in missing_sub] or 'none'}; "
          f"site chars not in the full font either: {[chr(c) for c in missing_full][:12] or 'none'}")
