#!/usr/bin/env bash
# Refresh the vendored Boston Fleet CSS.
#
# Downloads https://patterns.boston.gov/css/public.css and rewrites all
# relative url(...) references to absolute patterns.boston.gov URLs, so the
# CSS works when loaded from this directory. Output: styles/fleet.css next
# to this script.
#
# Usage: bash styles/refresh-fleet.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$SCRIPT_DIR/fleet.css"
URL="https://patterns.boston.gov/css/public.css"

echo "Fetching $URL"
curl -fsS "$URL" \
  | sed -E 's|url\(\.\./|url(https://patterns.boston.gov/|g; s|url\(/|url(https://patterns.boston.gov/|g' \
  > "$OUT.tmp"

mv "$OUT.tmp" "$OUT"

bytes=$(wc -c < "$OUT" | tr -d ' ')
remaining=$(grep -cE 'url\((\.\./|/)' "$OUT" || true)
echo "Wrote $OUT ($bytes bytes)"
if [ "$remaining" -gt 0 ]; then
  echo "WARNING: $remaining relative url(...) references remain — inspect $OUT"
  exit 1
fi
echo "All asset references are absolute."
