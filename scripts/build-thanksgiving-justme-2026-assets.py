#!/usr/bin/env python3
"""Costruzione 100% Zero-Gomma (solo PIL + NumPy) delle asset ufficiali
per Thanksgiving 2026 & Vida Loca @ JustMe Milano (Giovedì 26 Novembre 2026):
  1. Hero Poster Dual-Panel Couture Noir 1376x768 WebP (<= 235 KB):
     - public/images/events/thanksgiving-2026/thanksgiving-justme-milano-2026.webp
       (a sinistra pannello editoriale Thanksgiving 19:30 Buffet & Old Turkey Show Cooking,
        a destra flyer ufficiale intatto VIDA LOCA Radio 105 THU 26.11.2026 JUSTME MILANO,
        in basso targa ufficiale WWW.NIGHTLIFEMILAN.COM · INFO, BUFFET & VIP TABLES · +39 351 912 7047)
  2. Scheda Esperienza Gastronomica 1376x768 WebP (<= 235 KB):
     - public/images/events/thanksgiving-2026/justme-thanksgiving-2026-american-buffet-15.webp
  3. Scheda Club & Tavoli VIP 1376x768 WebP (<= 235 KB):
     - public/images/events/thanksgiving-2026/justme-thanksgiving-2026-vida-loca-tables.webp
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
JOB_ROOT = Path(r"D:\lavori-antigravity\thanksgiving-justme-2026-20261117")
RAW_VIDA_LOCA_WEBP = REPO_ROOT / "public" / "images" / "events" / "october-2026" / "249216-a9a40338f294.webp"

FONTS_DIR = Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts")
FONT_DISPLAY = FONTS_DIR / "Italiana-Regular.ttf"
FONT_SERIF_BOLD = FONTS_DIR / "Lora-Bold.ttf"
FONT_SERIF_ITALIC = FONTS_DIR / "Lora-Italic.ttf"
FONT_SANS_BOLD = FONTS_DIR / "Outfit-Bold.ttf"
FONT_SANS_REG = FONTS_DIR / "Outfit-Regular.ttf"

# Importa helper puri PIL + NumPy da rebuild-all-posters-zero-gomma.py (zero cv2)
_RZG_PATH = REPO_ROOT / "scripts" / "rebuild-all-posters-zero-gomma.py"
_spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", _RZG_PATH)
assert _spec and _spec.loader
_rzg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_rzg)

WA_GLYPH_PATH: Path = _rzg.WA_GLYPH_PATH
build_wa_badge = _rzg.build_wa_badge
measure_tracked_text = _rzg.measure_tracked_text
draw_tracked_text = _rzg.draw_tracked_text
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
    return th


def compose_couture_noir_thanksgiving_card(artwork: Image.Image, wa_glyph: Image.Image) -> Image.Image:
    """Composes 1376x768 Couture Noir card with custom bottom contact bar."""
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
    mid_txt = "INFO, BUFFET & VIP TABLES"
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


def build_hero_dual_panel_artwork(flyer_square: Image.Image) -> Image.Image:
    """Builds 1324x678 dual-panel stage artwork combining editorial Thanksgiving typography + intact Vida Loca flyer."""
    W, H = 1324, 678
    yy = np.linspace(0.0, 1.0, H, dtype=np.float32)[:, None, None]
    xx = np.linspace(0.0, 1.0, W, dtype=np.float32)[None, :, None]
    c_left = np.array([15.0, 10.0, 9.0], dtype=np.float32)
    c_right = np.array([28.0, 14.0, 24.0], dtype=np.float32)
    bg = c_left * (1.0 - xx) + c_right * xx
    bg = bg * (1.0 - 0.16 * np.abs(yy - 0.45))
    canvas = Image.fromarray(np.clip(np.round(bg), 0, 255).astype(np.uint8), mode="RGB").convert("RGBA")
    draw = ImageDraw.Draw(canvas)

    champagne = (212, 175, 106, 255)
    amber = (232, 180, 98, 255)
    ivory = (246, 241, 231, 255)
    muted = (206, 198, 184, 255)

    # Paste intact official VIDA LOCA · Radio 105 · THU 26.11.2026 · JUSTME MILANO flyer cleanly on the right
    side_pad = 18
    fly_dim = H - 2 * side_pad  # 642 x 642
    fly_resized = flyer_square.convert("RGB").resize((fly_dim, fly_dim), Image.Resampling.LANCZOS)
    fx = W - side_pad - fly_dim  # 664
    fy = side_pad
    canvas.paste(fly_resized, (fx, fy))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((fx - 2, fy - 2, fx + fly_dim + 1, fy + fly_dim + 1), outline=(212, 175, 106, 170), width=2)

    # Editorial left column strictly bounded within x = 36 .. fx - 34 (max_w = 576 px)
    box_x1, box_x2 = 18, fx - 18
    lx = 36
    lw = box_x2 - 20 - lx
    draw.rectangle((box_x1, 18, box_x2, H - 19), outline=(212, 175, 106, 95), width=1)

    f_sec = ImageFont.truetype(str(FONT_SANS_BOLD), 15)
    f_item = ImageFont.truetype(str(FONT_SERIF_BOLD), 19)

    y = 40.0
    y += _fit_left(draw, lx, y, "THURSDAY 26 NOVEMBER 2026 · JUSTME MILANO · TORRE BRANCA", FONT_SANS_BOLD, 15, lw, champagne) + 14
    y += _fit_left(draw, lx, y, "HAPPY THANKSGIVING", FONT_DISPLAY, 56, lw, ivory) + 8
    y += _fit_left(draw, lx, y, "American Buffet Show Cooking & Vida Loca Celebration", FONT_SERIF_ITALIC, 21, lw, amber) + 18

    draw.line((lx, y, lx + lw, y), fill=(212, 175, 106, 110), width=1)
    y += 18

    y += _fit_left(draw, lx, y, "FROM 19:30 · ROYAL THANKSGIVING BUFFET", FONT_SANS_BOLD, 15, lw, champagne) + 8
    y += _fit_left(draw, lx, y, "Full American Style Buffet & Old Turkey Show Cooking", FONT_SERIF_BOLD, 21, lw, ivory) + 7
    y += _fit_left(draw, lx, y, "Traditional American Specialties & Dessert Selection", FONT_SANS_REG, 16, lw, muted) + 20

    y += _fit_left(draw, lx, y, "FROM 22:30 · VIDA LOCA OFFICIAL CLUB NIGHT", FONT_SANS_BOLD, 15, lw, champagne) + 8
    y += _fit_left(draw, lx, y, "Radio 105 Tour · House · Hip-Hop · Hits · EDM · Reggaeton", FONT_SERIF_BOLD, 19, lw, ivory) + 20

    draw.line((lx, y, lx + lw, y), fill=(212, 175, 106, 95), width=1)
    y += 18

    box_h = 84
    bw = (lw - 14) // 2
    draw.rectangle((lx, y, lx + bw, y + box_h), fill=(24, 19, 15, 255), outline=(212, 175, 106, 150), width=1)
    _draw_left(draw, lx + 14, y + 12, "APERITIF + 1 DRINK", f_sec, champagne)
    _draw_left(draw, lx + 14, y + 40, "15 EUR  (19:30 - 22:00)", f_item, ivory)

    rx = lx + bw + 14
    draw.rectangle((rx, y, rx + bw, y + box_h), fill=(24, 19, 15, 255), outline=(212, 175, 106, 150), width=1)
    _draw_left(draw, rx + 14, y + 12, "CLUB + 1 DRINK", f_sec, champagne)
    _draw_left(draw, rx + 14, y + 40, "15 EUR  (VIDA LOCA)", f_item, ivory)
    y += box_h + 22

    y += _fit_left(draw, lx, y, "VIP TABLES: Dehor 320€ · Dance Floor 640€ · Central 1.280€", FONT_SANS_REG, 15, lw, muted) + 8
    y += _fit_left(draw, lx, y, "VIP Front 3.200€ · DJ Table 5.000€ · 21+ Elegant (Long Pants Men)", FONT_SANS_REG, 15, lw, muted) + 12
    _fit_left(draw, lx, y, "BOOKING & INFO · WWW.NIGHTLIFEMILAN.COM · +39 351 912 7047", FONT_SANS_BOLD, 14, lw, champagne)

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
    top_col = np.array([15.0, 11.0, 11.0], dtype=np.float32)
    mid_col = np.array(
        [18.0 + accent_rgb[0] * 0.04, 13.0 + accent_rgb[1] * 0.03, 12.0 + accent_rgb[2] * 0.03],
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
    f_title = ImageFont.truetype(str(FONT_DISPLAY), 62)
    f_sub = ImageFont.truetype(str(FONT_SERIF_ITALIC), 23)
    f_lbl = ImageFont.truetype(str(FONT_SANS_BOLD), 18)
    f_val = ImageFont.truetype(str(FONT_SERIF_BOLD), 27)
    f_foot = ImageFont.truetype(str(FONT_SANS_REG), 18)

    cx = W / 2.0
    y = 44.0
    y += _draw_centered(draw, cx, y, eyebrow, f_eye, champagne) + 14
    y += _draw_centered(draw, cx, y, title, f_title, ivory) + 10
    y += _draw_centered(draw, cx, y, subtitle, f_sub, tier_col) + 18

    draw.line((140, y, W - 140, y), fill=(212, 175, 106, 120), width=1)

    # Distribute the 4 feature rows evenly across y..H-110
    avail_top = y + 26
    avail_bot = H - 118
    step = (avail_bot - avail_top) / max(1, len(rows))
    for i, (lbl, val) in enumerate(rows):
        ry = avail_top + i * step + 6
        h_l = _draw_centered(draw, cx, ry, lbl, f_lbl, champagne)
        _draw_centered(draw, cx, ry + h_l + 8, val, f_val, ivory)

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


def save_couture_webp(artwork_rgb: Image.Image, out_path: Path, wa_glyph: Image.Image, max_bytes: int = 235_000) -> dict:
    card = compose_couture_noir_thanksgiving_card(artwork_rgb, wa_glyph)
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
    if not RAW_VIDA_LOCA_WEBP.is_file():
        raise FileNotFoundError(f"Manca la locandina Vida Loca: {RAW_VIDA_LOCA_WEBP}")
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")

    # Estrai rigorosamente l'artwork quadrato intatto Vida Loca 26.11.2026 senza il bordo esterno
    with Image.open(RAW_VIDA_LOCA_WEBP).convert("RGB") as im249:
        flyer_sq = im249.crop((350, 16, 1025, 690))

    hero_art = build_hero_dual_panel_artwork(flyer_sq)
    hero_meta = save_couture_webp(
        hero_art,
        REPO_ROOT / "public" / "images" / "events" / "thanksgiving-2026" / "thanksgiving-justme-milano-2026.webp",
        wa_glyph,
    )

    buffet_art = build_feature_card_artwork(
        eyebrow="THURSDAY 26 NOVEMBER 2026  ·  FROM 19:30 TO 22:30  ·  JUSTME MILANO",
        title="THANKSGIVING ROYAL BUFFET",
        subtitle="Aperitif + 1 Drink 15 € Official Pass  ·  Restaurant Table Concierge Available",
        accent_rgb=(236, 186, 102),
        rows=[
            ("LIVE CULINARY HIGHLIGHT", "Live Show Cooking of the Famous American Old Turkey"),
            ("TRADITIONAL SPECIALTIES", "Rich Thanksgiving Recipes, Roast Sides & American Favorites"),
            ("SWEET FINALE", "Curated Selection of Traditional American Desserts"),
            ("ADMISSION & BOOKING", "15 € Online Aperitif + 1 Drink (Entry 19:30 - 22:00) · Table Booking via Concierge"),
        ],
        footer_note="Included from 19:30: Access to Full American Style Buffet & Vida Loca Club Night · 21+ Elegant",
    )
    buffet_meta = save_couture_webp(
        buffet_art,
        REPO_ROOT / "public" / "images" / "events" / "thanksgiving-2026" / "justme-thanksgiving-2026-american-buffet-15.webp",
        wa_glyph,
    )

    tables_art = build_feature_card_artwork(
        eyebrow="THANKSGIVING SPECIAL PARTY  ·  22:30 – 05:00  ·  RADIO 105 OFFICIAL TOUR",
        title="VIDA LOCA & VIP TABLES",
        subtitle="Where Life Goes Wild  ·  House · Hip-Hop · Hits · EDM · Reggaeton",
        accent_rgb=(228, 176, 128),
        rows=[
            ("CLUB PASS + 1 DRINK", "15 € Official Online Admission (Entry by 23:00)"),
            ("DEHOR TABLE  ·  DANCE FLOOR TABLE", "320 € (Valid until 23:00)   |   640 € Bottle Service Credit"),
            ("CENTRAL TABLE  ·  VIP FRONT TABLE", "1.280 € Bottle Credit   |   3.200 € Prime Stage Table"),
            ("DJ CONSOLE TABLE", "5.000 € Exclusive Backstage / Booth Bottle Service"),
        ],
        footer_note="Age Requirement: 21+ · Dress Code: Elegant (Long Trousers Mandatory for Men) · Torre Branca",
    )
    tables_meta = save_couture_webp(
        tables_art,
        REPO_ROOT / "public" / "images" / "events" / "thanksgiving-2026" / "justme-thanksgiving-2026-vida-loca-tables.webp",
        wa_glyph,
    )

    manifest = {"assets": [hero_meta, buffet_meta, tables_meta]}
    manifest_path = JOB_ROOT / "scratch" / "thanksgiving-assets-manifest.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
