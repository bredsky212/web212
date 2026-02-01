#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BLOG_POST="$ROOT/cms/src/api/blog-post/content-types/blog-post/schema.json"
BLOG_CAT="$ROOT/cms/src/api/blog-category/content-types/blog-category/schema.json"

require_json_key() {
  local file="$1"
  local key="$2"
  if ! python3 - <<PY
import json
from pathlib import Path
p = Path(r'''$file''')
data = json.loads(p.read_text(encoding='utf-8'))
keys = "$key".split('.')
cur = data
for k in keys:
    if k not in cur:
        raise SystemExit(1)
    cur = cur[k]
PY
  then
    echo "Missing required key $key in $file" >&2
    exit 1
  fi
}

require_json_key "$BLOG_POST" "pluginOptions.i18n.localized"
require_json_key "$BLOG_CAT" "pluginOptions.i18n.localized"

for field in slug title excerpt content authorName category; do
  require_json_key "$BLOG_POST" "attributes.${field}.pluginOptions.i18n.localized"
done

for field in name slug; do
  require_json_key "$BLOG_CAT" "attributes.${field}.pluginOptions.i18n.localized"
done

echo "Strapi i18n schema checks passed."
