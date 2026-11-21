#!/usr/bin/env python3
"""Costruisce i 6 asset Couture Noir 1376x768 (<= 270 KB) per Church 81 e 55 Milano su nightlifemilan.com.

- Church 81 locandina + Menu Pesce 90 EUR + Menu Carne 90 EUR (targa opaca 100% a gradiente bilineare sui numeri terzi)
- 55 Milano La Dolce Vita locandina + Menu Gala 160 EUR + Menu Buffet 100 EUR (Gruppo B intatti)
- Provino visivo in consegna + verifica RapidOCR anti-leak.
"""
from __future__ import annotations

import importlib.util
import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO = Path(r"D:\nightlife milan\repo-pinterest")
JOB = Path(r"D:\lavori-antigravity\capodanno-church81-55-webhook-20261121")
RAW_DIR = JOB / "raw_media"
CONSEGNA_DIR = JOB / "consegna"

FORBIDDEN_RE = re.compile(
    r"392\s*629\s*2898|349\s*412|327\s*462|9433|335\s*529|0025|capodannodimilano",
    re.I,
)


def load_zero_gomma_mod():
    src_path = REPO / "scripts" / "rebuild-all-posters-zero-gomma.py"
    spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", src_path)
    assert spec and spec.loader
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def check_ocr_clean(ocr, im: Image.Image, name: str) -> None:
    res, _ = ocr(np.array(im.convert("RGB")))
    txt = " | ".join(r[1] for r in res) if res else ""
    m = FORBIDDEN_RE.search(txt)
    if m:
        raise RuntimeError(f"Leak rilevato su {name}: {m.group(0)} ({txt[:300]})")


def main() -> int:
    from rapidocr_onnxruntime import RapidOCR

    mod = load_zero_gomma_mod()
    ocr = RapidOCR()
    CONSEGNA_DIR.mkdir(parents=True, exist_ok=True)
    wa_glyph = Image.open(mod.WA_GLYPH_PATH).convert("RGBA")

    posters_dir = REPO / "public" / "images" / "events" / "capodanno-2027-posters"
    menus_dir = REPO / "public" / "images" / "events" / "capodanno-2027-menus"
    posters_dir.mkdir(parents=True, exist_ok=True)
    menus_dir.mkdir(parents=True, exist_ok=True)

    # Preparazione 3 artwork Gruppo A (Church 81) + 3 Gruppo B (55 Milano)
    poster_c81_raw = Image.open(RAW_DIR / "church81_poster_raw.jpg").convert("RGB")
    poster_c81_crop = poster_c81_raw.crop((0, 312, poster_c81_raw.width, 1735))
    poster_c81_art, meta_c81_p = mod.apply_inplace_plate(
        poster_c81_crop, 140, 1334, 806, 1400, wa_glyph, "VIA DELLA CHIESA ROSSA 81"
    )

    pesce_raw = Image.open(RAW_DIR / "church81_menu_pesce.png").convert("RGB")
    pesce_art, meta_c81_pesce = mod.apply_inplace_plate(
        pesce_raw, 420, 2198, 1246, 2274, wa_glyph, "CHURCH 81 · 90 EUR"
    )

    carne_raw = Image.open(RAW_DIR / "church81_menu_carne.png").convert("RGB")
    carne_art, meta_c81_carne = mod.apply_inplace_plate(
        carne_raw, 420, 2198, 1246, 2274, wa_glyph, "CHURCH 81 · 90 EUR"
    )

    poster_55_art = Image.open(RAW_DIR / "55_dolcevita_poster_4x5.jpg").convert("RGB")
    gala_55_art = Image.open(RAW_DIR / "55_dolcevita_menu_gala_4x5.png").convert("RGB")
    buffet_55_art = Image.open(RAW_DIR / "55_dolcevita_menu_buffet_4x5.png").convert("RGB")

    jobs = [
        ("Church 81 Cover", poster_c81_art, posters_dir / "capodanno-church-81-milano.webp", meta_c81_p),
        ("Church 81 Menu Pesce", pesce_art, menus_dir / "church-81-nye-2027-menu-pesce-90.webp", meta_c81_pesce),
        ("Church 81 Menu Carne", carne_art, menus_dir / "church-81-nye-2027-menu-carne-90.webp", meta_c81_carne),
        ("55 Milano Dolce Vita", poster_55_art, posters_dir / "capodanno-55-milano.webp", None),
        ("55 Milano Gala 160", gala_55_art, menus_dir / "55-milano-nye-2027-menu-gala-160.webp", None),
        ("55 Milano Buffet 100", buffet_55_art, menus_dir / "55-milano-nye-2027-menu-buffet-100.webp", None),
    ]

    results = []
    cards = []
    for label, art, out_path, pmeta in jobs:
        card = mod.compose_couture_noir_card(art, wa_glyph)
        wbytes = mod.encode_webp_under_budget(card, max_bytes=270_000)
        assert len(wbytes) <= 270_000, f"{out_path.name} supera 270KB: {len(wbytes)}"
        out_path.write_bytes(wbytes)
        check_ocr_clean(ocr, card, out_path.name)
        results.append({"label": label, "path": str(out_path), "bytes": len(wbytes), "plate": pmeta})
        cards.append((label, card))

    # Provino visivo 2 colonne x 3 righe
    cw, ch = 700, 420
    sheet = Image.new("RGB", (2 * cw + 40, 3 * ch + 40), (12, 12, 16))
    sd = ImageDraw.Draw(sheet)
    f_lbl = ImageFont.truetype(str(mod.FONT_BOLD_PATH), 20)
    for i, (lbl, card_im) in enumerate(cards):
        r, c = divmod(i, 2)
        x0 = 20 + c * cw + 10
        y0 = 20 + r * ch + 34
        im_r = card_im.copy()
        im_r.thumbnail((cw - 20, ch - 44), Image.Resampling.LANCZOS)
        sheet.paste(im_r, (x0, y0))
        sd.text((x0, y0 - 26), f"{lbl} ({results[i]['bytes']//1024} KB)", font=f_lbl, fill=(212, 175, 106))

    sheet_path = CONSEGNA_DIR / "nightlifemilan_church81_55_media_sheet.png"
    sheet.save(sheet_path)
    (CONSEGNA_DIR / "nightlifemilan_media_manifest.json").write_text(
        json.dumps(results, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print("OK nightlifemilan assets:", [(r["label"], r["bytes"]) for r in results])
    return 0


if __name__ == "__main__":
    sys.exit(main())
