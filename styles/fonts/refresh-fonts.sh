#!/usr/bin/env bash
# Re-vendor the Boston brand typefaces (Montserrat + Lora) from Google Fonts.
#
# Downloads only the `latin` and `latin-ext` woff2 subsets for the weights the
# app uses, writes them into styles/fonts/, and regenerates styles/fonts.css
# with @font-face rules pointing at the local files. Run from the repo root:
#
#   ./styles/fonts/refresh-fonts.sh
#
set -euo pipefail
cd "$(dirname "$0")/../.."   # repo root

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
URL="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@600;700&display=swap"

mkdir -p styles/fonts
curl -s -A "$UA" "$URL" -o /tmp/gfonts.css

python3 - <<'PY'
import re, urllib.request

css = open('/tmp/gfonts.css', encoding='utf-8').read()
blocks = re.findall(r'/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]*\})', css)
keep = {'latin', 'latin-ext'}
ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15"

out = ["/* Boston brand typefaces — vendored from Google Fonts (latin + latin-ext\n"
       "   subsets only). Montserrat 600/700; Lora 400/500/600/700 + italic 400/500.\n"
       "   Regenerate with styles/fonts/refresh-fonts.sh */\n"]
seen = {}
for subset, block in blocks:
    if subset not in keep:
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    wght = re.search(r'font-weight:\s*(\d+)', block).group(1)
    style = re.search(r'font-style:\s*(\w+)', block).group(1)
    url = re.search(r'url\(([^)]+)\)', block).group(1)
    # Lora/Montserrat are variable fonts: several weight/style blocks reuse the
    # same woff2 URL. Download each URL once and point every block that shares it
    # at that single file, so the CSS never references a file we didn't write.
    if url not in seen:
        slug = f"{fam.lower().replace(' ','-')}-{wght}{'i' if style=='italic' else ''}-{subset}.woff2"
        urllib.request.urlretrieve(url, f"styles/fonts/{slug}")
        seen[url] = slug
    out.append(block.replace(url, f"fonts/{seen[url]}") + "\n")

open('styles/fonts.css','w',encoding='utf-8').write("\n".join(out))
print(f"Vendored {len(seen)} woff2 files, {len(out)-1} @font-face blocks -> styles/fonts.css")
PY
