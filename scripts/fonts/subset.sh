#!/usr/bin/env bash
# Subset the IBM Plex Mono files to the characters this site uses (Latin, punctuation,
# arrows, bullet, ellipsis, and the check mark U+2713).
#
# Needs fontTools and brotli:   pip install fonttools brotli
# (a virtual environment is fine; in the audit sandbox the venv's python was used the same way:
#  PYTHON=<venv>/bin/python scripts/fonts/subset.sh src/assets/fonts)
#
# Usage:  scripts/fonts/subset.sh <fonts-dir>
# Rewrites the Regular, SemiBold and Bold files in place. The originals stay in git history.
# To use another script (Cyrillic, Vietnamese...), extend RANGE here, run this on the original
# files from git, then run scripts/fonts/fontcheck.py again.
set -euo pipefail

FONTS_DIR="${1:?usage: subset.sh <fonts-dir>}"
PYTHON="${PYTHON:-python3}"
RANGE="U+0020-007E,U+00A0-00FF,U+0100-017F,U+2000-206F,U+20A0-20CF,U+2190-2199,U+2212,U+2022,U+2026,U+2713"

for weight in Regular SemiBold Bold; do
  f="$FONTS_DIR/IBMPlexMono-$weight.woff2"
  tmp="$f.tmp"
  "$PYTHON" -m fontTools.subset "$f" --flavor=woff2 --unicodes="$RANGE" \
    --layout-features='*' --no-hinting --output-file="$tmp"
  mv "$tmp" "$f"
  echo "$weight: $(wc -c < "$f") bytes"
done
