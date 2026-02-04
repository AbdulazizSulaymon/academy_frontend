#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fixes cases where a sentence ends immediately before an H2 heading, e.g.:
  "... something.## Heading"
becomes:
  "... something.\n\n## Heading"
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

RE = re.compile(r"([.!?])##\s+")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--content-dir", default="src/data/blog/content")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    content_dir = (root / args.content_dir).resolve()

    changed = 0
    scanned = 0

    for p in sorted(content_dir.glob("*.mdx")):
        scanned += 1
        text = p.read_text(encoding="utf-8")
        new_text = RE.sub(r"\1\n\n## ", text)
        if new_text != text:
            changed += 1
            if not args.dry_run:
                p.write_text(new_text, encoding="utf-8")

    print(f"Scanned: {scanned}, changed: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

