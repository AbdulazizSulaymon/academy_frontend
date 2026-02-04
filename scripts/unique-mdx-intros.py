#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Unikal intro generator:
- Har bir .mdx faylda H1 (# ...) dan keyingi intro blokini (birinchi ## ... gacha) tekshiradi
- Agar intro ichida takroriy qoliplar ("Haqiqat shuki", "Bir misolni ko'rib chiqamiz") bo'lsa,
  uni slug/title/description asosida unik intro bilan almashtiradi.
"""

from __future__ import annotations

import argparse
import hashlib
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Optional, Tuple


RE_FRONTMATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
RE_H1 = re.compile(r"(?m)^\#\s+(.+?)\s*$")
RE_H2 = re.compile(r"(?m)^\#\#\s+.+$")

TRIGGERS = (
    "Haqiqat shuki",
    "Bir misolni ko'rib chiqamiz",
    "Bir misolni ko‘rib chiqamiz",
)


def _strip_quotes(s: str) -> str:
    s = s.strip()
    if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
        return s[1:-1]
    return s


def parse_frontmatter(block: str) -> Dict[str, str]:
    data: Dict[str, str] = {}
    for line in block.splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        data[k.strip()] = _strip_quotes(v.strip())
    return data


def stable_int(s: str) -> int:
    return int(hashlib.md5(s.encode("utf-8")).hexdigest(), 16)


def pick(seq, n: int):
    return seq[n % len(seq)]


def make_intro(title: str, description: str, slug: str, category: str) -> str:
    h = stable_int(slug)

    hooks = [
        "Tasavvur qiling: mijoz saytingizga kiradi, 30 soniya ichida javob topa olmasa — chiqib ketadi.",
        "Ko‘pchilik bu mavzuni “oddiy” deb o‘ylaydi, lekin aynan shu joyda pul ham, obro‘ ham yutiladi.",
        "Bu mavzu haqida gap ketganda odatda ikki yo‘l bor: tez-tez yutqazish yoki jarayonni tizimga solib yutish.",
        "O‘zbekistonda onlayn savdo tez o‘sdi, lekin ko‘pchilik hali ham bir xil xatolarni takrorlaydi.",
        "Bu yerda nazariya ko‘p, ammo amaliy natija beradigan mayda detallar kam gapiriladi.",
        "Aksariyat do‘konlar aynan shu bosqichda “ko‘rinadi”, lekin “sotmaydi” — farq shu yerda.",
        "Mijozning ko‘zi bilan qarasangiz, hammasi aniq bo‘ladi: qulaylik, ishonch va tezlik.",
        "Agar siz hozir shu mavzuni tartibga solsangiz, keyingi oylar osonroq va arzonroq o‘tadi.",
    ]

    local_bits = [
        "Telegram/Instagram orqali kelgan trafikda bu yanada seziladi.",
        "Payme/Click ishlatadigan xaridorlar ham tezlikni yaxshi ko‘radi.",
        "Toshkentda tez yetkazib berish bo‘lsa ham, UX yomon bo‘lsa foyda bermaydi.",
        "Viloyatlardan buyurtma olayotganda ishonch signallari yanada muhim.",
        "Mobil foydalanuvchilar uchun bu mavzu ikki barobar dolzarb.",
        "SEO’dan kelgan organik trafikni “sotuvga” aylantirish aynan shu yerda hal bo‘ladi.",
        "Kichik do‘konlarda ham bu yondashuv ishlaydi — faqat tartib kerak.",
        "Raqobat kuchaygan sari, shu mayda farqlar katta natija beradi.",
    ]

    frames = [
        lambda: (
            f"{pick(hooks, h)}",
            f"\"{title}\" mavzusi — {description or 'amaliy yo‘riqnoma va tavsiyalar'}.\n"
            f"{pick(local_bits, h >> 3)}",
            "Quyida gapni cho‘zmasdan: nimadan boshlash, nimalarni tekshirish va qaysi xatolardan qochish kerakligini bosqichma-bosqich ko‘rib chiqamiz.",
        ),
        lambda: (
            f"{pick(hooks, h)}",
            f"Ko‘p holatda muammo \"qilish\"da emas, \"to‘g‘ri ketma-ketlik\"da bo‘ladi — ayniqsa {category or 'onlayn savdo'} kontekstida.",
            f"Bu maqolada {pick(local_bits, h >> 4)} va sizga kerakli eng muhim nuqtalarni bir joyga jamladim: {description or title}.",
        ),
        lambda: (
            f"{pick(hooks, h)}",
            f"Shu maqolani o‘qib chiqqandan keyin sizda aniq reja qolishi kerak: bugun nimani tuzatish, ertaga nimani sinash va bir haftada nimani o‘lchash.",
            f"Boshlaymiz: {description or title}",
        ),
        lambda: (
            f"{pick(hooks, h)}",
            f"{pick(local_bits, h >> 2)} Shu sabab \"{title}\"ni faqat umumiy gaplar bilan emas, real vaziyatlarga mos tushadigan tavsiyalar bilan ochamiz.",
            "Maqola davomida siz xuddi chek-list kabi foydalanishingiz mumkin bo‘lgan amaliy qadamlarni ham olasiz.",
        ),
    ]

    p1, p2, p3 = pick(frames, h >> 1)()

    return "\n\n".join([p1.strip(), p2.strip(), p3.strip()]) + "\n\n"


@dataclass
class MdxDoc:
    frontmatter_raw: str
    frontmatter: Dict[str, str]
    body: str


def split_mdx(text: str) -> Optional[MdxDoc]:
    m = RE_FRONTMATTER.match(text)
    if not m:
        return None
    fm_raw = m.group(1)
    body = text[m.end() :]
    return MdxDoc(frontmatter_raw=fm_raw, frontmatter=parse_frontmatter(fm_raw), body=body)


def replace_intro(doc: MdxDoc, slug: str) -> Tuple[bool, str]:
    body = doc.body

    m_h1 = RE_H1.search(body)
    if not m_h1:
        return False, doc.frontmatter_raw + "\n" + body

    h1_end = m_h1.end()
    m_h2 = RE_H2.search(body, pos=h1_end)
    if not m_h2:
        return False, doc.frontmatter_raw + "\n" + body

    intro = body[h1_end : m_h2.start()]
    if not any(t in intro for t in TRIGGERS):
        return False, doc.frontmatter_raw + "\n" + body

    title = doc.frontmatter.get("title", m_h1.group(1)).strip()
    description = doc.frontmatter.get("description", "").strip()
    category = doc.frontmatter.get("category", "").strip()

    # Preserve one blank line right after H1
    after_h1 = body[h1_end:]
    # consume leading newlines/spaces
    leading_ws = re.match(r"\A(\s*\n)+", after_h1)
    if leading_ws:
        h1_gap = after_h1[: leading_ws.end()]
    else:
        h1_gap = "\n\n"

    new_intro = make_intro(title=title, description=description, slug=slug, category=category)
    new_body = body[:h1_end] + h1_gap + new_intro + body[m_h2.start() :]

    new_text = "---\n" + doc.frontmatter_raw.strip() + "\n---\n\n" + new_body.lstrip("\n")
    return True, new_text


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--content-dir", default="src/data/blog/content")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    content_dir = (root / args.content_dir).resolve()

    changed = 0
    scanned = 0
    skipped_no_fm = 0

    for p in sorted(content_dir.glob("*.mdx")):
        scanned += 1
        slug = p.stem
        text = p.read_text(encoding="utf-8")
        doc = split_mdx(text)
        if not doc:
            skipped_no_fm += 1
            continue
        did, new_text = replace_intro(doc, slug=slug)
        if did:
            changed += 1
            if not args.dry_run:
                p.write_text(new_text, encoding="utf-8")

    print(f"Scanned: {scanned}, changed: {changed}, skipped(no frontmatter): {skipped_no_fm}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

