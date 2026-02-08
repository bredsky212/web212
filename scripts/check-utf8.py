#!/usr/bin/env python3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTS = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".yml", ".yaml"}


def is_text_candidate(p: Path) -> bool:
    if any(part in {"node_modules", ".next", ".git", "dist", "build", ".npm-cache"} for part in p.parts):
        return False
    return p.suffix in EXTS


bad = []
for p in ROOT.rglob("*"):
    if not p.is_file() or not is_text_candidate(p):
        continue
    data = p.read_bytes()
    try:
        data.decode("utf-8")
    except UnicodeDecodeError as e:
        bad.append((p, e.start, data[max(0, e.start - 16) : e.start + 16]))

if bad:
    print("Non-UTF8 files detected:")
    for p, off, snippet in bad:
        print(f"- {p} @ byte offset {off}")
        print(f"  bytes around: {snippet.hex(' ')}")
    sys.exit(1)

print("✅ All checked files are valid UTF-8.")