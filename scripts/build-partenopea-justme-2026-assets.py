#!/usr/bin/env python3
"""Costruzione 100% Zero-Gomma (solo PIL + NumPy) delle asset ufficiali
per CSP — Cena Spettacolo Partenopea @ JustMe Milano (Venerdi 27 Novembre 2026):
  1. Hero Poster Dual-Panel Couture Noir 1376x768 WebP (<= 235 KB):
     - public/images/events/partenopea-2026/cena-spettacolo-partenopea-justme-milano-2026.webp
       (pannello sinistro editoriale CSP Cena Spettacolo Partenopea · Con Pineta Napoli · Menu 70 EUR,
        pannello destro flyer ufficiale bonificato in-place con targa opaca alpha=255 preservando al 100% PINETA NAPOLI,
        barra inferiore WWW.NIGHTLIFEMILAN.COM · DINNER SHOW 70 EUR & VIP TABLES · +39 351 912 7047)
  2. Scheda Menu Ufficiale 70 EUR 1376x768 WebP (<= 235 KB):
     - public/images/events/partenopea-2026/justme-partenopea-2026-menu-dinner-show-70.webp
  3. Scheda Party & Tavoli VIP 1376x768 WebP (<= 235 KB):
     - public/images/events/partenopea-2026/justme-partenopea-2026-party-vip-tables.webp
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
JOB_ROOT = Path(r"D:\lavori-antigravity\partenopea-justme-2026-20261118")
RAW_FLYER_PATH = Path(
    r"C:\Users\minag\.gemini\antigravity\brain\fe23822c-671e-48e6-af77-9770706fe041\.user_uploaded\media_1795030707680_bec2b083.jpg"
)

FONTS_DIR = Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts")
FONT_DISPLAY = FONTS_DIR / "Italiana-Regular.ttf"
FONT_SERIF_BOLD = FONTS_DIR / "Lora-Bold.ttf"
FONT_SERIF_ITALIC = FONTS_DIR / "Lora-Italic.ttf"
FONT_SANS_BOLD = FONTS_DIR / "Outfit-Bold.ttf"
FONT_SANS_REG = FONTS_DIR / "Outfit-Regular.ttf"

# Importa esclusivamente helper puri PIL + NumPy da rebuild-all-posters-zero-gomma.py (zero cv2)
_RZG_PATH = REPO_ROOT / "scripts" / "rebuild-all-posters-zero-gomma.py"
_spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", _RZG_PATH)
assert _spec and _spec.loader
_rzg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_rzg)

WA_GLYPH_PATH: Path = _rzg.WA_GLYPH_PATH
build_wa_badge = _rzg.build_wa_badge
measure_tracked_text = _rzg.measure_tracked_text
draw_tracked_text = _rzg.draw_tracked_text
apply_inplace_plate = _rzg.apply_inplace_plate
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
    return float(th)


def _draw_left(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
) -> float:
    bbox = font.getbbox(text)
    th = bbox[3] - bbox[1]
    draw.text((x - bbox[0], y - bbox[1]), text, font=font, fill=fill)
    return float(th)


def _fit_left(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    text: str,
    font_path: Path,
    base_size: int,
    max_w: float,
    fill: tuple[int, int, int, int],
) -> float:
    sz = base_size
    while sz > 11:
        f = ImageFont.truetype(str(font_path), sz)
        bb = f.getbbox(text)
        if (bb[2] - bb[0]) <= max_w:
            draw.text((x - bb[0], y - bb[1]), text, font=f, fill=fill)
            return float(bb[3] - bb[1])
        sz -= 1
    f = ImageFont.truetype(str(font_path), sz)
    bb = f.getbbox(text)
    draw.text((x - bb[0], y - bb[1]), text, font=f, fill=fill)
    return float(bb[3] - bb[1])


def sanitize_official_flyer(raw_flyer: Image.Image, wa_glyph: Image.Image) -> tuple[Image.Image, dict]:
    """Replaces ONLY legacy JustMe phone/domain glyphs inside ROI (94, 848, 482, 902) on 576x1024.
    Guarantees 0 pixels changed outside ROI (preserving PINETA NAPOLI at y=936..985 intact).
    """
    x1, y1, x2, y2 = 94, 848, 482, 902
    sanitized, meta = apply_inplace_plate(raw_flyer.convert("RGB"), x1, y1, x2, y2, wa_glyph, None)

    orig_arr = np.asarray(raw_flyer.convert("RGB"), dtype=np.int16)
    new_arr = np.asarray(sanitized, dtype=np.int16)
    mask = np.ones((orig_arr.shape[0], orig_arr.shape[1]), dtype=bool)
    mask[y1:y2, x1:x2] = False
    outside_diff = int(np.count_nonzero(np.any(orig_arr != new_arr, axis=2) & mask))
    assert outside_diff == 0, f"Unexpected pixel mutation outside contact ROI: {outside_diff}"
    meta["outside_roi_changed_pixels"] = outside_diff
    meta["pineta_napoli_preserved"] = True
    return sanitized, meta


def compose_couture_noir_partenopea_card(artwork: Image.Image, wa_glyph: Image.Image) -> Image.Image:
    """Composes 1376x768 Couture Noir frame with dedicated Dinner Show 70 EUR contact bar."""
    CW, CH = 1376, 768
    STAGE_X1, STAGE_Y1, STAGE_X2, STAGE_Y2 = 26, 14, 1350, 692
    SW, SH = STAGE_X2 - STAGE_X1, STAGE_Y2 - STAGE_Y1
    BAR_Y = 706

    art_rgb = artwork.convert("RGB")
    aw, ah = art_rgb.size
    canvas = Image.new("RGB", (CW, CH), (7, 7, 9))

    bg = art_rgb.resize((SW, SH), Image.Resampling.BILINEAR).filter(ImageFilter.GaussianBlur(radius=28))
    bg_arr = np.clip(np.array(bg, dtype=np.float32) * 0.24, 0, 255).astype(np.uint8)
    canvas.paste(Image.fromarray(bg_arr, mode="RGB"), (STAGE_X1, STAGE_Y1))

    scale = min(SW / aw, SH / ah)
    nw = max(1, int(round(aw * scale)))
    nh = max(1, int(round(ah * scale)))
    art_resized = art_rgb.resize((nw, nh), Image.Resampling.LANCZOS)
    px = STAGE_X1 + (SW - nw) // 2
    py = STAGE_Y1 + (SH - nh) // 2
    canvas.paste(art_resized, (px, py))

    rgba = canvas.convert("RGBA")
    draw = ImageDraw.Draw(rgba)

    if nw < SW - 8:
        draw.rectangle((px - 1, py - 1, px + nw, py + nh), outline=(201, 168, 106, 85), width=1)

    draw.rectangle((STAGE_X1, STAGE_Y1, STAGE_X2, STAGE_Y2), outline=(201, 168, 106, 190), width=1)
    draw.line([(0, BAR_Y), (CW, BAR_Y)], fill=(201, 168, 106, 195), width=1)

    f_dom = ImageFont.truetype(str(FONT_SANS_BOLD), 23)
    f_mid = ImageFont.truetype(str(FONT_SANS_BOLD), 17)
    f_tel = ImageFont.truetype(str(FONT_SANS_BOLD), 25)

    dom_txt = "WWW.NIGHTLIFEMILAN.COM"
    mid_txt = "DINNER SHOW 70 EUR & VIP TABLES"
    tel_txt = "+39 351 912 7047"

    w_dom, _ = measure_tracked_text(dom_txt, f_dom, 1.4)
    w_mid, _ = measure_tracked_text(mid_txt, f_mid, 1.0)
    w_tel, _ = measure_tracked_text(tel_txt, f_tel, 0.8)
    badge_d = 30

    total_w = w_dom + 28 + w_mid + 20 + badge_d + 12 + w_tel
    sx = (CW - total_w) / 2.0
    bar_cy = BAR_Y + (CH - BAR_Y) / 2.0

    bb_dom = f_dom.getbbox(dom_txt)
    cur = draw_tracked_text(
        draw, sx, bar_cy - (bb_dom[3] - bb_dom[1]) / 2.0 - bb_dom[1], dom_txt, f_dom, 1.4, (212, 175, 106, 255)
    )
    dot_x = cur + 14
    draw.ellipse((dot_x - 3, bar_cy - 3, dot_x + 3, bar_cy + 3), fill=(201, 168, 106, 200))
    cur += 28

    bb_mid = f_mid.getbbox(mid_txt)
    cur = draw_tracked_text(
        draw, cur, bar_cy - (bb_mid[3] - bb_mid[1]) / 2.0 - bb_mid[1], mid_txt, f_mid, 1.0, (234, 229, 220, 255)
    )
    cur += 20

    wa_badge = build_wa_badge(badge_d, wa_glyph)
    rgba.alpha_composite(wa_badge, (int(round(cur)), int(round(bar_cy - badge_d / 2.0))))
    cur += badge_d + 12

    draw = ImageDraw.Draw(rgba)
    bb_tel = f_tel.getbbox(tel_txt)
    draw_tracked_text(
        draw, cur, bar_cy - (bb_tel[3] - bb_tel[1]) / 2.0 - bb_tel[1], tel_txt, f_tel, 0.8, (255, 255, 255, 255)
    )

    return rgba.convert("RGB")


def build_hero_dual_panel_artwork(sanitized_flyer: Image.Image) -> Image.Image:
    """Builds 1324x678 dual-panel stage artwork: left editorial CSP manifesto + right full 9:16 sanitized flyer."""
    W, H = 1324, 678
    yy = np.linspace(0.0, 1.0, H, dtype=np.float32)[:, None, None]
    xx = np.linspace(0.0, 1.0, W, dtype=np.float32)[None, :, None]
    c_left = np.array([15.0, 11.0, 9.0], dtype=np.float32)
    c_right = np.array([25.0, 18.0, 10.0], dtype=np.float32)
    bg = c_left * (1.0 - xx) + c_right * xx
    bg = bg * (1.0 - 0.14 * np.abs(yy - 0.45))
    canvas = Image.fromarray(np.clip(np.round(bg), 0, 255).astype(np.uint8), mode="RGB").convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    champagne = (212, 175, 106, 255)
    amber = (232, 186, 98, 255)
    ivory = (246, 241, 231, 255)
    muted = (208, 200, 186, 255)

    # Full uncropped 9:16 sanitized official flyer cleanly framed on the right
    side_pad = 14
    fh = H - 2 * side_pad  # 650 px tall
    fw = int(round(fh * (sanitized_flyer.width / sanitized_flyer.height)))  # ~366 px wide
    fly_resized = sanitized_flyer.convert("RGB").resize((fw, fh), Image.Resampling.LANCZOS)
    fx = W - side_pad - fw - 12  # ~932
    fy = side_pad
    canvas.paste(fly_resized, (fx, fy))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((fx - 2, fy - 2, fx + fw + 1, fy + fh + 1), outline=(212, 175, 106, 175), width=2)

    # Editorial left column within x = 18 .. fx - 24 (generous ~870 px wide)
    box_x1, box_x2 = 18, fx - 22
    lx = 38
    lw = box_x2 - 22 - lx
    draw.rectangle((box_x1, 16, box_x2, H - 17), outline=(212, 175, 106, 95), width=1)

    f_sec = ImageFont.truetype(str(FONT_SANS_BOLD), 15)
    f_item = ImageFont.truetype(str(FONT_SERIF_BOLD), 19)

    y = 34.0
    y += _fit_left(draw, lx, y, "FRIDAY 27 NOVEMBER 2026 · JUSTME MILANO · TORRE BRANCA", FONT_SANS_BOLD, 16, lw, champagne) + 12
    y += _fit_left(draw, lx, y, "CENA SPETTACOLO PARTENOPEA", FONT_DISPLAY, 54, lw, ivory) + 8
    y += _fit_left(draw, lx, y, "In Collaborazione con Pineta Napoli · Dinner Show dalle 21:30", FONT_SERIF_ITALIC, 22, lw, amber) + 16

    draw.line((lx, y, lx + lw, y), fill=(212, 175, 106, 110), width=1)
    y += 16

    y += _fit_left(draw, lx, y, "FROM 19:30 DOORS & APERITIF  |  21:30 DINNER SHOW (70 EUR COMPLETE MENU)", FONT_SANS_BOLD, 15, lw, champagne) + 7
    y += _fit_left(draw, lx, y, "Parmigiana, Bufala, Polipetti alla Luciana, Polpette al sugo, Mezzi Paccheri al Ragù", FONT_SERIF_BOLD, 19, lw, ivory) + 6
    y += _fit_left(draw, lx, y, "Sorbetto al Limone di Amalfi + Acqua, Vino della Casa, Caffè · Party till 05:00", FONT_SANS_REG, 16, lw, muted) + 16

    y += _fit_left(draw, lx, y, "CLUB ADMISSION 22:30 / PARTY 23:00–05:00 · LINE-UP UFFICIALE", FONT_SANS_BOLD, 15, lw, champagne) + 7
    y += _fit_left(draw, lx, y, "Voice John Vaccaro  ·  DJ Franky Dee  ·  DJ Antonio Marigliano", FONT_SERIF_BOLD, 20, lw, ivory) + 18

    draw.line((lx, y, lx + lw, y), fill=(212, 175, 106, 95), width=1)
    y += 16

    box_h = 84
    bw = (lw - 28) // 3
    cards = [
        ("DINNER SHOW + PARTY", "70 EUR  (21:30 Show)"),
        ("APERITIF + 1 DRINK", "15 EUR  (19:30–21:30)"),
        ("CLUB PARTY + 1 DRINK", "20 EUR  (From 22:30)"),
    ]
    for idx, (lbl, val) in enumerate(cards):
        bx = lx + idx * (bw + 14)
        draw.rectangle((bx, y, bx + bw, y + box_h), fill=(24, 19, 15, 255), outline=(212, 175, 106, 150), width=1)
        _draw_left(draw, bx + 12, y + 12, lbl, f_sec, champagne)
        _draw_left(draw, bx + 12, y + 40, val, f_item, ivory)
    y += box_h + 20

    y += _fit_left(draw, lx, y, "VIP TABLES: Dehor 320 EUR · Dance Floor 640 EUR · Central 1.280 EUR · VIP Front 3.200 EUR · DJ 5.000 EUR", FONT_SANS_REG, 15, lw, muted) + 8
    y += _fit_left(draw, lx, y, "GUEST PARTNER: Pineta Napoli @ JustMe Milano (Camoens 2) · 21+ Elegant · Shuttle Parking", FONT_SANS_REG, 15, lw, muted) + 10
    _fit_left(draw, lx, y, "OFFICIAL CONCIERGE & TABLES · WWW.NIGHTLIFEMILAN.COM · +39 351 912 7047", FONT_SANS_BOLD, 14, lw, champagne)

    return canvas.convert("RGB")


def build_feature_card_artwork(
    *,
    eyebrow: str,
    title: str,
    subtitle: str,
    accent_rgb: tuple[int, int, int],
    rows: list[tuple[str, str]],
    footer_note: str,
) -> Image.Image:
    W, H = 1240, 678
    yy = np.linspace(0.0, 1.0, H, dtype=np.float32)[:, None, None]
    xx = np.abs(np.linspace(-1.0, 1.0, W, dtype=np.float32))[None, :, None]
    top_col = np.array([15.0, 11.0, 10.0], dtype=np.float32)
    mid_col = np.array(
        [18.0 + accent_rgb[0] * 0.04, 13.0 + accent_rgb[1] * 0.03, 11.0 + accent_rgb[2] * 0.03],
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
    ivory = (246, 241, 231, 255)
    muted = (198, 190, 176, 255)
    tier_col = (*accent_rgb, 255)

    draw.rectangle((22, 18, W - 23, H - 19), outline=(212, 175, 106, 135), width=2)
    draw.rectangle((32, 28, W - 33, H - 29), outline=(212, 175, 106, 60), width=1)

    f_eye = ImageFont.truetype(str(FONT_SANS_BOLD), 19)
    f_title = ImageFont.truetype(str(FONT_DISPLAY), 60)
    f_sub = ImageFont.truetype(str(FONT_SERIF_ITALIC), 22)
    f_lbl = ImageFont.truetype(str(FONT_SANS_BOLD), 18)
    f_val = ImageFont.truetype(str(FONT_SERIF_BOLD), 25)
    f_foot = ImageFont.truetype(str(FONT_SANS_REG), 18)

    cx = W / 2.0
    y = 42.0
    y += _draw_centered(draw, cx, y, eyebrow, f_eye, champagne) + 12
    y += _draw_centered(draw, cx, y, title, f_title, ivory) + 10
    y += _draw_centered(draw, cx, y, subtitle, f_sub, tier_col) + 16

    draw.line((140, y, W - 140, y), fill=(212, 175, 106, 120), width=1)

    avail_top = y + 24
    avail_bot = H - 118
    step = (avail_bot - avail_top) / max(1, len(rows))
    for i, (lbl, val) in enumerate(rows):
        ry = avail_top + i * step + 6
        h_l = _draw_centered(draw, cx, ry, lbl, f_lbl, champagne)
        f_fit = f_val
        sz_v = 25
        while sz_v > 15:
            bb_v = f_fit.getbbox(val)
            if (bb_v[2] - bb_v[0]) <= W - 150:
                break
            sz_v -= 1
            f_fit = ImageFont.truetype(str(FONT_SERIF_BOLD), sz_v)
        _draw_centered(draw, cx, ry + h_l + 8, val, f_fit, ivory)

    draw.line((130, H - 102, W - 130, H - 102), fill=(212, 175, 106, 95), width=1)
    _draw_centered(draw, cx, H - 84, footer_note, f_foot, muted)
    _draw_centered(
        draw,
        cx,
        H - 52,
        "RESERVATIONS & INFO  ·  WWW.NIGHTLIFEMILAN.COM  ·  +39 351 912 7047",
        f_eye,
        champagne,
    )
    return canvas.convert("RGB")


def save_couture_webp(
    artwork_rgb: Image.Image, out_path: Path, wa_glyph: Image.Image, max_bytes: int = 235_000
) -> dict:
    card = compose_couture_noir_partenopea_card(artwork_rgb, wa_glyph)
    data = encode_webp_under_budget(card, max_bytes=max_bytes)
    assert len(data) <= max_bytes, f"{out_path.name} exceeded budget: {len(data)} > {max_bytes}"
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
    if not RAW_FLYER_PATH.is_file():
        raise FileNotFoundError(f"Manca la locandina ufficiale caricata: {RAW_FLYER_PATH}")
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")

    with Image.open(RAW_FLYER_PATH).convert("RGB") as raw_im:
        sanitized_flyer, plate_meta = sanitize_official_flyer(raw_im, wa_glyph)

    sanitized_preview = JOB_ROOT / "scratch" / "flyer_partenopea_sanitized_576x1024.png"
    sanitized_preview.parent.mkdir(parents=True, exist_ok=True)
    sanitized_flyer.save(sanitized_preview, "PNG")

    hero_art = build_hero_dual_panel_artwork(sanitized_flyer)
    hero_meta = save_couture_webp(
        hero_art,
        REPO_ROOT / "public" / "images" / "events" / "partenopea-2026" / "cena-spettacolo-partenopea-justme-milano-2026.webp",
        wa_glyph,
    )

    menu_art = build_feature_card_artwork(
        eyebrow="FRIDAY 27 NOVEMBER 2026  ·  DINNER SHOW FROM 21:30  ·  WITH PINETA NAPOLI",
        title="MENU COMPLETO 70 EUR",
        subtitle="Official Seated Neapolitan Dinner Show & Full Club Access Until 05:00",
        accent_rgb=(236, 186, 102),
        rows=[
            ("TO SHARE (ANTIPASTI)", "Parmigiana di Melanzane · Mozzarella di Bufala · Polipetti alla Luciana · Polpette al Sugo della Nonna"),
            ("MAIN COURSE (PRIMO)", "Mezzi Paccheri al Ragù Napoletano (Slow-Simmered Traditional Neapolitan Recipe)"),
            ("DESSERT & BEVERAGES", "Sorbetto al Limone di Amalfi  ·  Acqua, Vino della Casa & Caffè Included"),
            ("OFFICIAL RATE", "70 EUR per person (Online Checkout +15% Concierge Fee or WhatsApp Reservations)"),
        ],
        footer_note="JustMe Milano (Viale Luigi Camoens 2, Torre Branca, NOT Pineta Via Messina) · 21+ Elegant",
    )
    menu_meta = save_couture_webp(
        menu_art,
        REPO_ROOT / "public" / "images" / "events" / "partenopea-2026" / "justme-partenopea-2026-menu-dinner-show-70.webp",
        wa_glyph,
    )

    tables_art = build_feature_card_artwork(
        eyebrow="CSP PARTENOPEA  ·  CLUB ADMISSION 22:30 / PARTY 23:00–05:00  ·  JUSTME MILANO",
        title="PARTY PASS & VIP TABLES",
        subtitle="Voice John Vaccaro  ·  DJ Franky Dee  ·  DJ Antonio Marigliano",
        accent_rgb=(228, 176, 128),
        rows=[
            ("APERITIF & CLUB ADMISSION", "15 EUR Aperitif + 1 Drink (19:30–21:30)   |   20 EUR Club + 1 Drink (From 22:30)"),
            ("DEHOR TABLE  ·  DANCE FLOOR", "320 EUR (Entry Strictly by 23:00)   |   640 EUR Main Room Bottle Credit"),
            ("CENTRAL TABLE  ·  VIP FRONT", "1.280 EUR Elevated Central Zone   |   3.200 EUR Prime Stage Front Line"),
            ("DJ CONSOLE TABLE", "5.000 EUR Backstage Booth Bottle Service · Reservations +39 351 912 7047"),
        ],
        footer_note="Age 21+ · Dress Code: Elegant (Long Trousers Mandatory for Men) · Complimentary Shuttle Parking",
    )
    tables_meta = save_couture_webp(
        tables_art,
        REPO_ROOT / "public" / "images" / "events" / "partenopea-2026" / "justme-partenopea-2026-party-vip-tables.webp",
        wa_glyph,
    )

    manifest = {"plate_remediation": plate_meta, "assets": [hero_meta, menu_meta, tables_meta]}
    manifest_path = JOB_ROOT / "scratch" / "partenopea-assets-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
