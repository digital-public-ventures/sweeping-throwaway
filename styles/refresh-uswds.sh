#!/usr/bin/env bash
# Refresh the vendored U.S. Web Design System (USWDS) compiled assets.
#
# Pulls the published @uswds/uswds npm package and copies its compiled dist
# (CSS, JS, fonts, img) into styles/uswds/. We vendor the *compiled* output
# (not a Sass build) so the app needs no build step; Boston brand colors are
# layered on top in styles.css rather than themed at compile time.
#
# The compiled CSS references assets via ../fonts/ and ../img/, so the css/,
# fonts/, and img/ directories must stay siblings under styles/uswds/.
#
# Usage: bash styles/refresh-uswds.sh [version]   (default: 3)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$SCRIPT_DIR/uswds"
VERSION="${1:-3}"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "Packing @uswds/uswds@$VERSION"
( cd "$TMP" && npm pack "@uswds/uswds@$VERSION" >/dev/null )
TGZ="$(ls "$TMP"/*.tgz)"

echo "Extracting compiled dist into $DEST"
rm -rf "$DEST"
mkdir -p "$DEST"
tar -xzf "$TGZ" -C "$DEST" --strip-components=2 \
  package/dist/css package/dist/js package/dist/fonts package/dist/img

# Keep only the minified CSS/JS — drop source maps and unminified copies.
rm -f "$DEST"/css/*.map "$DEST"/js/*.map \
      "$DEST"/css/uswds.css "$DEST"/js/uswds.js "$DEST"/js/uswds-init.js

echo "Wrote $(du -sh "$DEST" | cut -f1) to $DEST"
echo "Vendored USWDS $(tar -xzOf "$TGZ" package/package.json | grep -m1 '"version"' | sed -E 's/.*"version": *"([^"]+)".*/\1/')"
