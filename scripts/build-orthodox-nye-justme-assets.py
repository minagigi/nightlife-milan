#!/usr/bin/env python3
"""Costruzione 100% Zero-Gomma (solo PIL + NumPy) delle asset
ufficiali per il Capodanno Ortodosso 2027 — Il ritorno di Cappuccetto Rosso @ JustMe Milano:
  1. Poster bonificato 1376x768 WebP (<= 240 KB):
     - public/images/events/orthodox-nye-2027/capodanno-ortodosso-justme-milano-2027.webp
     - public/images/events/october-2026/251019-5cfdcappuccetto.webp (identica byte-for-byte)
  2. Menu Cards Couture Noir 1376x768 WebP (<= 240 KB):
     - public/images/events/orthodox-nye-2027/justme-ortodosso-2027-menu-silver-60.webp
     - public/images/events/orthodox-nye-2027/justme-ortodosso-2027-menu-gold-80.webp
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
JOB_ROOT = Path(r"D:\lavori-antigravity\capodanno-ortodosso-justme-2027-20261115")
RAW_FLYER = JOB_ROOT / "scratch" / "raw_251019.jpg"

FONTS_DIR = Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts")
FONT_DISPLAY = FONTS_DIR / "Italiana-Regular.ttf"
FONT_SERIF_BOLD = FONTS_DIR / "Lora-Bold.ttf"
FONT_SERIF_ITALIC = FONTS_DIR / "Lora-Italic.ttf"
FONT_SANS_BOLD = FONTS_DIR / "Outfit-Bold.ttf"
FONT_SANS_REG = FONTS_DIR / "Outfit-Regular.ttf"

# Importa helper Zero-Gomma da rebuild-all-posters-zero-gomma.py (escluso cv2)
_RZG_PATH = REPO_ROOT / "scripts" / "rebuild-all-posters-zero-gomma.py"
_spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", _RZG_PATH)
assert _spec and _spec.loader
_rzg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_rzg)

WA_GLYPH_PATH: Path = _rzg.WA_GLYPH_PATH
apply_inplace_plate = _rzg.apply_inplace_plate
compose_couture_noir_card = _rzg.compose_couture_noir_card
encode_webp_under_budget = _rzg.encode_webp_under_budget


def _draw_centered(
    draw: ImageDraw.ImageDraw,
    cx: float,
    y: float,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
) -> float:
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw / 2.0 - bbox[0], y - bbox[1]), text, font=font, fill=fill)
    return th


def build_menu_card_artwork(
    *,
    tier_label: str,
    price_tag: str,
    subtitle: str,
    accent_rgb: tuple[int, int, int],
    courses: list[tuple[str, str]],
    footer_note: str,
) -> Image.Image:
    """Renders high-contrast Couture Noir editorial menu artwork (1240x820 RGBA -> RGB)."""
    W, H = 1240, 820
    # Smooth vertical dark luxury gradient (charcoal obsidian with subtle warm tint)
    yy = np.linspace(0.0, 1.0, H, dtype=np.float32)[:, None, None]
    xx = np.abs(np.linspace(-1.0, 1.0, W, dtype=np.float32))[None, :, None]
    top_col = np.array([14.0, 11.0, 13.0], dtype=np.float32)
    mid_col = np.array(
        [18.0 + accent_rgb[0] * 0.04, 13.0 + accent_rgb[1] * 0.03, 14.0 + accent_rgb[2] * 0.03],
        dtype=np.float32,
    )
    bot_col = np.array([8.0, 7.0, 9.0], dtype=np.float32)
    bg = np.where(
        yy < 0.5,
        top_col * (1.0 - yy * 2.0) + mid_col * (yy * 2.0),
        mid_col * (1.0 - (yy - 0.5) * 2.0) + bot_col * ((yy - 0.5) * 2.0),
    )
    bg = bg * (1.0 - 0.22 * (xx**2))
    canvas = Image.fromarray(np.clip(np.round(bg), 0, 255).astype(np.uint8), mode="RGB").convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    champagne = (212, 175, 106, 255)
    soft_gold = (212, 175, 106, 135)
    ivory = (244, 239, 230, 255)
    muted = (196, 189, 176, 255)
    tier_col = (*accent_rgb, 255)

    # Outer double Couture Noir frame
    draw.rectangle((24, 22, W - 25, H - 23), outline=soft_gold, width=2)
    draw.rectangle((34, 32, W - 35, H - 33), outline=(212, 175, 106, 60), width=1)

    f_eyebrow = ImageFont.truetype(str(FONT_SANS_BOLD), 20)
    f_title = ImageFont.truetype(str(FONT_DISPLAY), 64)
    f_price = ImageFont.truetype(str(FONT_SERIF_BOLD), 36)
    f_sub = ImageFont.truetype(str(FONT_SERIF_ITALIC), 22)
    f_course_lbl = ImageFont.truetype(str(FONT_SANS_BOLD), 19)
    f_course_val = ImageFont.truetype(str(FONT_SERIF_BOLD), 27)
    f_footer = ImageFont.truetype(str(FONT_SANS_REG), 19)

    cx = W / 2.0
    y = 58.0
    h = _draw_centered(draw, cx, y, "WEDNESDAY 13 JANUARY 2027  ·  JUSTME MILANO  ·  VIALE CAMOENS 2", f_eyebrow, champagne)
    y += h + 18

    h = _draw_centered(draw, cx, y, "CAPODANNO ORTODOSSO 2027", f_title, ivory)
    y += h + 12

    h = _draw_centered(draw, cx, y, f"{tier_label}  —  {price_tag}", f_price, tier_col)
    y += h + 8

    h = _draw_centered(draw, cx, y, subtitle, f_sub, muted)
    y += h + 22

    # Divider rule
    draw.line((180, y, W - 180, y), fill=(212, 175, 106, 120), width=1)
    y += 22

    for lbl, val in courses:
        h_l = _draw_centered(draw, cx, y, lbl, f_course_lbl, champagne)
        y += h_l + 6
        h_v = _draw_centered(draw, cx, y, val, f_course_val, ivory)
        y += h_v + 18

    # Bottom concierge & included terms inside artwork (satisfies Gate 4c + editorial luxury clarity)
    draw.line((140, H - 118, W - 140, H - 118), fill=(212, 175, 106, 95), width=1)
    _draw_centered(draw, cx, H - 98, footer_note, f_footer, muted)
    _draw_centered(
        draw,
        cx,
        H - 64,
        "RESERVATIONS & VIP TABLES  ·  WWW.NIGHTLIFEMILAN.COM  ·  +39 351 912 7047",
        f_eyebrow,
        champagne,
    )

    return canvas.convert("RGB")


def save_couture_webp(artwork_rgb: Image.Image, out_path: Path, wa_glyph: Image.Image, max_bytes: int = 235_000) -> dict:
    card = compose_couture_noir_card(artwork_rgb, wa_glyph)
    data = encode_webp_under_budget(card, max_bytes=max_bytes)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)
    sha = hashlib.sha256(data).hexdigest()
    return {
        "file": str(out_path.relative_to(REPO_ROOT).as_posix()),
        "bytes": len(data),
        "width": card.size[0],
        "height": card.size[1],
        "sha256": sha,
    }


def main() -> int:
    if not RAW_FLYER.is_file():
        raise FileNotFoundError(f"Manca il master scaricato: {RAW_FLYER}")
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")

    # 1. Flyer ufficiale bonificato in-place: sostituisce "Powered by NIGHT FASHION" in ROI (310, 1109, 944, 1222)
    #    mantenendo intatto "DJ NAZAR RADCHUK" sopra y=1108.
    raw_im = Image.open(RAW_FLYER).convert("RGB")
    plated_im, plate_metrics = apply_inplace_plate(
        raw_im,
        310,
        1109,
        944,
        1222,
        wa_glyph,
        extra_line2="VIALE CAMOENS 2",
    )

    out_primary = REPO_ROOT / "public" / "images" / "events" / "orthodox-nye-2027" / "capodanno-ortodosso-justme-milano-2027.webp"
    out_october = REPO_ROOT / "public" / "images" / "events" / "october-2026" / "251019-5cfdcappuccetto.webp"

    card_poster = compose_couture_noir_card(plated_im, wa_glyph)
    poster_bytes = encode_webp_under_budget(card_poster, max_bytes=235_000)
    for dst in (out_primary, out_october):
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(poster_bytes)

    poster_sha = hashlib.sha256(poster_bytes).hexdigest()
    poster_meta = {
        "file": str(out_primary.relative_to(REPO_ROOT).as_posix()),
        "bytes": len(poster_bytes),
        "width": card_poster.size[0],
        "height": card_poster.size[1],
        "sha256": poster_sha,
        **plate_metrics,
    }
    october_meta = {
        **poster_meta,
        "file": str(out_october.relative_to(REPO_ROOT).as_posix()),
    }

    # 2. Silver Menu 60€ Couture Noir card
    silver_art = build_menu_card_artwork(
        tier_label="SILVER DINNER MENU",
        price_tag="60 € PER PERSON",
        subtitle="Il ritorno di Cappuccetto Rosso · Seated Dinner from 19:30 + Club All Night",
        accent_rgb=(220, 224, 232),
        courses=[
            ("STARTER · ANTIPASTO", "Parmigiana di Melanzane Classica, Branzino New Style, Spring Rolls"),
            ("MAIN COURSE · PRIMO PIATTO", "Risotto ai Crostacei e Zucchine Nane in Fiore"),
            ("DESSERT · DOLCE", "Cheesecake al Pistacchio e Granella di Nocciola"),
        ],
        footer_note="Included: 1 Bottle of Water & Wine every 4 Guests · Guest Star DJ Nazar Radchuk · 21+ · Dress Code Elegant",
    )
    silver_meta = save_couture_webp(
        silver_art,
        REPO_ROOT / "public" / "images" / "events" / "orthodox-nye-2027" / "justme-ortodosso-2027-menu-silver-60.webp",
        wa_glyph,
    )

    # 3. Gold Menu 80€ Couture Noir card
    gold_art = build_menu_card_artwork(
        tier_label="GOLD SEAFOOD DINNER MENU",
        price_tag="80 € PER PERSON",
        subtitle="Il ritorno di Cappuccetto Rosso · Seafood Gala Dinner from 19:30 + Club All Night",
        accent_rgb=(236, 196, 114),
        courses=[
            ("STARTER · ANTIPASTO", "Catalana di Mare Olio e Limone, Tacos Tonno Burrata e Caviale, Tataki Salmone"),
            ("FIRST COURSE · PRIMO PIATTO", "Pacchero Scampi e Funghi Porcini"),
            ("SECOND COURSE · SECONDO PIATTO", "Trancio di Salmone al Miso e Ikura"),
            ("DESSERT · DOLCE", "Ciambella Amarena, Mascarpone e Cioccolato Fuso"),
        ],
        footer_note="Included: 1 Bottle of Water & Wine every 4 Guests · Red or Luminous Touch Contest: 4* Mountain Week",
    )
    gold_meta = save_couture_webp(
        gold_art,
        REPO_ROOT / "public" / "images" / "events" / "orthodox-nye-2027" / "justme-ortodosso-2027-menu-gold-80.webp",
        wa_glyph,
    )

    manifest = {
        "plates": [poster_meta, october_meta],
        "menus": [silver_meta, gold_meta],
    }
    manifest_path = JOB_ROOT / "scratch" / "orthodox-nye-assets-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
