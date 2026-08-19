#!/usr/bin/env bash
# Regenere le sous-ensemble de la police d'icones a partir des icones reellement
# utilisees dans les pages HTML du site.
#
# A relancer des qu'une nouvelle icone Material est ajoutee dans une page :
#   bash fonts/build-icons-subset.sh
#
# Prerequis : pip3 install fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/.."

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# 1. Inventorier les icones utilisees dans le HTML
python3 - "$TMP" <<'PY'
import glob, re, sys, os
pat = re.compile(r'<[a-z]+\b[^>]*class="[^"]*\bmaterial-icons-outlined\b[^"]*"[^>]*>([^<]*)<', re.I)
icons = sorted({m.strip() for f in glob.glob("*.html")
                for m in pat.findall(open(f, encoding="utf-8").read()) if m.strip()})
open(os.path.join(sys.argv[1], "icons.txt"), "w").write("\n".join(icons))
print(f"{len(icons)} icones trouvees dans le HTML")
PY

# 2. Telecharger la police complete (woff2 servi aux navigateurs modernes)
CSS_URL="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=block"
FONT_URL=$(curl -s -A "$UA" "$CSS_URL" | grep -o "https://fonts.gstatic.com[^)]*" | head -1)
curl -s -A "$UA" "$FONT_URL" -o "$TMP/full.woff2"

# 3. Resoudre chaque ligature vers son glyphe, puis sous-ensembler par glyphe.
#    Passer par --text seul ne marche pas : la fermeture de mise en page
#    conserverait les ~2200 ligatures de la police (gain de 27 % seulement).
python3 - "$TMP" <<'PY'
import sys, os
from fontTools.ttLib import TTFont
tmp = sys.argv[1]
f = TTFont(os.path.join(tmp, "full.woff2"))
names = [l.strip() for l in open(os.path.join(tmp, "icons.txt")) if l.strip()]
char2g = {chr(c): g for c, g in f.getBestCmap().items()}
lig = {}
for lookup in f["GSUB"].table.LookupList.Lookup:
    for st in lookup.SubTable:
        for first, ligs in getattr(st, "ligatures", {}).items():
            for L in ligs:
                lig[(first,) + tuple(L.Component)] = L.LigGlyph
cibles, manquantes = [], []
for n in names:
    g = lig.get(tuple(char2g.get(ch) for ch in n))
    (cibles if g else manquantes).append(g or n)
if manquantes:
    sys.exit(f"ERREUR : ligature introuvable dans la police pour {manquantes}")
open(os.path.join(tmp, "cibles.txt"), "w").write("\n".join(cibles))
open(os.path.join(tmp, "lettres.txt"), "w").write("".join(sorted({c for n in names for c in n})))
PY

# 4. Produire le sous-ensemble
pyftsubset "$TMP/full.woff2" --output-file=fonts/jg67-icons.woff2 --flavor=woff2 \
  --glyphs-file="$TMP/cibles.txt" --text="$(cat "$TMP/lettres.txt")" \
  --layout-features+=liga,dlig,ccmp,rlig --no-layout-closure \
  --no-hinting --desubroutinize

# 5. Mettre a jour l'inventaire lu par audit.py
cp "$TMP/icons.txt" fonts/jg67-icons.txt

echo "OK : fonts/jg67-icons.woff2 ($(du -h fonts/jg67-icons.woff2 | cut -f1)), $(wc -l < fonts/jg67-icons.txt) icones"
