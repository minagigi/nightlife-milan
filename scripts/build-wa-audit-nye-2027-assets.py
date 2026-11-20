#!/usr/bin/env python3
"""Build 2027 Capodanno WhatsApp-verified posters and menu cards for nightlifemilan.com.

Strict rules:
- Zero AI image generation, zero OpenCV magic-eraser inpainting (Pillow + NumPy only).
- Any third-party contact or 2026 year typo inside an authentic venue asset is covered in-place
  using a 100% opaque (alpha=255) 4-corner bilinear gradient plate matched to local luminance.
- All outputs are 1376x768 WebP <= 270 KB framed in Nightlife Milan Couture Noir branding.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
WA_MEDIA = Path(
    r"C:\Users\minag\.gemini\antigravity\brain\9e37c27e-45dd-40f7-ac10-27ad1132d554\scratch\wa_media"
)

_REBUILD_PATH = REPO_ROOT / "scripts" / "rebuild-all-posters-zero-gomma.py"
_spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", _REBUILD_PATH)
assert _spec and _spec.loader
_rzg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_rzg)

FONT_BOLD_PATH: Path = _rzg.FONT_BOLD_PATH
WA_GLYPH_PATH: Path = _rzg.WA_GLYPH_PATH
compose_couture_noir_card = _rzg.compose_couture_noir_card
draw_tracked_text = _rzg.draw_tracked_text
encode_webp_under_budget = _rzg.encode_webp_under_budget
measure_tracked_text = _rzg.measure_tracked_text


def _serif_font(size: int) -> ImageFont.FreeTypeFont:
    for candidate in [
        Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts\CormorantGaramond-Bold.ttf"),
        Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts\PlayfairDisplay-Bold.ttf"),
        Path(r"C:\Windows\Fonts\georgiab.ttf"),
        Path(r"C:\Windows\Fonts\timesbd.ttf"),
        FONT_BOLD_PATH,
    ]:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.truetype(str(FONT_BOLD_PATH), size)


def bilinear_opaque_plate(
    im: Image.Image,
    box: tuple[int, int, int, int],
    *,
    dark_clamp: tuple[float, float] | None = None,
) -> Image.Image:
    """Cover box (x1, y1, x2, y2) with a 100% opaque (alpha=255) 4-corner bilinear gradient."""
    w, h = im.size
    x1, y1, x2, y2 = box
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(w, x2)
    y2 = min(h, y2)
    pw, ph = x2 - x1, y2 - y1
    arr = np.array(im.convert("RGB"), dtype=np.float32)

    def sample(cx: int, cy: int) -> np.ndarray:
        sx1, sx2 = max(0, cx - 8), min(w, cx + 8)
        sy1, sy2 = max(0, cy - 8), min(h, cy + 8)
        patch = arr[sy1:sy2, sx1:sx2]
        med = np.median(patch.reshape(-1, 3), axis=0) if patch.size else np.array([12.0, 12.0, 14.0])
        if dark_clamp is not None:
            lum = float(0.299 * med[0] + 0.587 * med[1] + 0.114 * med[2])
            lo, hi = dark_clamp
            target_lum = float(np.clip(lum, lo, hi))
            if lum > 1e-3:
                med = med * (target_lum / lum)
            med = np.clip(med, 4.0, hi + 10.0)
        return med

    c_tl = sample(max(0, x1 - 6), max(0, y1 - 6))
    c_tr = sample(min(w - 1, x2 + 6), max(0, y1 - 6))
    c_bl = sample(max(0, x1 - 6), min(h - 1, y2 + 6))
    c_br = sample(min(w - 1, x2 + 6), min(h - 1, y2 + 6))

    xs = np.linspace(0.0, 1.0, pw, dtype=np.float32)[None, :, None]
    ys = np.linspace(0.0, 1.0, ph, dtype=np.float32)[:, None, None]
    plate = (c_tl * (1.0 - xs) + c_tr * xs) * (1.0 - ys) + (c_bl * (1.0 - xs) + c_br * xs) * ys
    arr[y1:y2, x1:x2] = np.clip(np.round(plate), 0, 255)
    return Image.fromarray(arr.astype(np.uint8), mode="RGB")


def paste_wa_badge(
    draw_im: Image.Image,
    wa_glyph: Image.Image,
    cx: int,
    cy: int,
    size: int = 24,
) -> None:
    """Paste circular #25D366 WhatsApp badge centered vertically at (cx, cy)."""
    badge = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bd = ImageDraw.Draw(badge)
    bd.ellipse([0, 0, size - 1, size - 1], fill=(37, 211, 102, 255))
    inner = max(10, int(round(size * 0.66)))
    gl = wa_glyph.resize((inner, inner), Image.Resampling.LANCZOS)
    off = (size - inner) // 2
    badge.alpha_composite(gl, (off, off))
    rgba = draw_im.convert("RGBA")
    rgba.alpha_composite(badge, (cx, cy - size // 2))
    draw_im.paste(rgba.convert("RGB"))


def save_card(artwork: Image.Image, out_path: Path, wa_glyph: Image.Image) -> None:
    card = compose_couture_noir_card(artwork, wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=270_000)
    out_path.write_bytes(raw)
    print(f"OK: {out_path.relative_to(REPO_ROOT)} ({card.size[0]}x{card.size[1]}, {len(raw) // 1024} KB)")


def build_pelledoca_poster(wa_glyph: Image.Image) -> None:
    src = WA_MEDIA / "35_3A2B616872ECEBFACD26_image_image_20261119_163746.jpg"
    im = Image.open(src).convert("RGB")  # 980x1225
    # Cover only the phone/reservation row, leaving Pelledoca address below untouched
    im = bilinear_opaque_plate(im, (170, 1082, 820, 1148), dark_clamp=(4.0, 12.0))

    draw = ImageDraw.Draw(im)
    f_line1 = ImageFont.truetype(str(FONT_BOLD_PATH), 22)
    f_line2 = ImageFont.truetype(str(FONT_BOLD_PATH), 15)
    t1 = "RESERVATIONS   +39 351 912 7047"
    t2 = "WWW.NIGHTLIFEMILAN.COM"
    w1, _ = measure_tracked_text(t1, f_line1, 1.4)
    badge_w = 24
    gap = 10
    total_w = badge_w + gap + w1
    x0 = int(round((980 - total_w) / 2.0))
    paste_wa_badge(im, wa_glyph, x0, 1104, size=badge_w)
    draw = ImageDraw.Draw(im)
    draw_tracked_text(draw, x0 + badge_w + gap, 1091, t1, f_line1, 1.4, (244, 218, 152, 255))
    w2, _ = measure_tracked_text(t2, f_line2, 2.2)
    draw_tracked_text(draw, (980 - w2) / 2.0, 1122, t2, f_line2, 2.2, (238, 232, 220, 240))

    out = REPO_ROOT / "public/images/events/capodanno-2027-posters/capodanno-pelledoca-milano.webp"
    save_card(im, out, wa_glyph)


def build_justme_gala_menu(wa_glyph: Image.Image) -> None:
    src = WA_MEDIA / "28_3A8EEF57AB37F65F08D1_document_JMMenuNye26_02.jpg"
    im = Image.open(src).convert("RGB")  # 1080x1350

    # 1) Top-right cream NYE 2026 -> NYE 2027 (DECEMBER 31ST stays above y=140)
    im = bilinear_opaque_plate(im, (648, 144, 954, 218))
    f_top = _serif_font(56)
    draw = ImageDraw.Draw(im)
    tw, _ = measure_tracked_text("NYE 2027", f_top, 3.2)
    draw_tracked_text(draw, (648 + 954 - tw) / 2.0, 150, "NYE 2027", f_top, 3.2, (48, 34, 24, 255))

    # 2) Bottom-left dark NYE 2026 under THE GREAT GATSBY -> NYE 2027
    im = bilinear_opaque_plate(im, (112, 1138, 412, 1246), dark_clamp=(8.0, 18.0))
    f_bot = _serif_font(54)
    draw = ImageDraw.Draw(im)
    bw, _ = measure_tracked_text("NYE 2027", f_bot, 2.8)
    draw_tracked_text(draw, (112 + 412 - bw) / 2.0, 1160, "NYE 2027", f_bot, 2.8, (212, 184, 120, 255))

    # 3) Bottom-right cream contact block -> Nightlife Milan + WhatsApp green icon
    im = bilinear_opaque_plate(im, (575, 1196, 1020, 1260))
    f_c1 = ImageFont.truetype(str(FONT_BOLD_PATH), 16)
    f_c2 = ImageFont.truetype(str(FONT_BOLD_PATH), 16)
    line1 = "INFO & RESERVATIONS  ·  WWW.NIGHTLIFEMILAN.COM"
    line2 = "+39 351 912 7047"
    draw = ImageDraw.Draw(im)
    w_c1, _ = measure_tracked_text(line1, f_c1, 1.0)
    draw_tracked_text(draw, 575 + (445 - w_c1) / 2.0, 1202, line1, f_c1, 1.0, (38, 28, 22, 255))
    w_c2, _ = measure_tracked_text(line2, f_c2, 1.4)
    cx0 = int(round(575 + (445 - (22 + 8 + w_c2)) / 2.0))
    paste_wa_badge(im, wa_glyph, cx0, 1240, size=22)
    draw = ImageDraw.Draw(im)
    draw_tracked_text(draw, cx0 + 22 + 8, 1230, line2, f_c2, 1.4, (32, 24, 18, 255))

    out = REPO_ROOT / "public/images/events/capodanno-2027-menus/justme-nye-2027-gala-menu-300.webp"
    save_card(im, out, wa_glyph)


def build_clean_menu_cards(wa_glyph: Image.Image) -> None:
    pelledoca_menu = Image.open(
        WA_MEDIA / "36_3AF6C88ABED9AFC6C7C0_image_image_20261119_163746.jpg"
    ).convert("RGB")
    save_card(
        pelledoca_menu,
        REPO_ROOT / "public/images/events/capodanno-2027-menus/pelledoca-nye-2027-menu-cenone-120.webp",
        wa_glyph,
    )

    magazzini_menu = Image.open(
        WA_MEDIA / "39_3A1AA5E6F954B09798C0_image_image_20261119_163747.jpg"
    ).convert("RGB")
    save_card(
        magazzini_menu,
        REPO_ROOT / "public/images/events/capodanno-2027-menus/magazzini-generali-nye-2027-menu-80.webp",
        wa_glyph,
    )


def _dark_radial_canvas(w: int, h: int, center_rgb: tuple[int, int, int], edge_rgb: tuple[int, int, int]) -> Image.Image:
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (xx - w * 0.5) / (w * 0.55)
    ny = (yy - h * 0.45) / (h * 0.6)
    d = np.clip(np.sqrt(nx * nx + ny * ny), 0.0, 1.0)[:, :, None]
    c0 = np.array(center_rgb, dtype=np.float32)[None, None, :]
    c1 = np.array(edge_rgb, dtype=np.float32)[None, None, :]
    arr = np.clip(np.round(c0 * (1.0 - d) + c1 * d), 0, 255).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB")


def build_fabbrica_poster(wa_glyph: Image.Image) -> None:
    W, H = 1376, 714
    im = _dark_radial_canvas(W, H, (24, 20, 16), (8, 8, 12))
    rgba = im.convert("RGBA")
    draw = ImageDraw.Draw(rgba)
    gold = (208, 176, 114, 255)
    gold_soft = (208, 176, 114, 115)
    ivory = (246, 241, 231, 255)
    muted = (214, 206, 192, 235)

    draw.rectangle([(26, 22), (W - 27, H - 23)], outline=gold, width=2)
    draw.rectangle([(38, 34), (W - 39, H - 35)], outline=gold_soft, width=1)

    f_eye = ImageFont.truetype(str(FONT_BOLD_PATH), 20)
    f_kicker = ImageFont.truetype(str(FONT_BOLD_PATH), 24)
    f_title = _serif_font(66)
    f_sub = ImageFont.truetype(str(FONT_BOLD_PATH), 22)
    f_pill = ImageFont.truetype(str(FONT_BOLD_PATH), 20)
    f_foot = ImageFont.truetype(str(FONT_BOLD_PATH), 18)

    ey = "MILANO  ·  VIA GIULIO CESARE PROCACCINI 4  ·  EX STABILIMENTO STORICO"
    ew, _ = measure_tracked_text(ey, f_eye, 2.6)
    draw_tracked_text(draw, (W - ew) / 2.0, 76, ey, f_eye, 2.6, gold)

    draw.line([(420, 126), (W - 420, 126)], fill=gold_soft, width=1)

    kk = "CAPODANNO 2027  ·  31 DICEMBRE 2026"
    kw, _ = measure_tracked_text(kk, f_kicker, 3.0)
    draw_tracked_text(draw, (W - kw) / 2.0, 172, kk, f_kicker, 3.0, ivory)

    tt = "FABBRICA DEL VAPORE"
    tw, _ = measure_tracked_text(tt, f_title, 2.4)
    draw_tracked_text(draw, (W - tw) / 2.0, 238, tt, f_title, 2.4, gold)

    sub = "MILANO  ·  CULTURA, SOUND SYSTEM & GRANDI FORMATI DI SAN SILVESTRO"
    sw, _ = measure_tracked_text(sub, f_sub, 1.4)
    draw_tracked_text(draw, (W - sw) / 2.0, 342, sub, f_sub, 1.4, muted)

    pill = "PROGRAMMA UFFICIALE IN AGGIORNAMENTO  ·  INFORMAZIONI SU RICHIESTA"
    pw, _ = measure_tracked_text(pill, f_pill, 1.4)
    pad_p = 44
    px0 = int(round((W - (pw + 2 * pad_p)) / 2.0))
    pill_box = (px0, 424, W - px0, 492)
    draw.rectangle(pill_box, fill=(14, 13, 15, 240), outline=gold, width=2)
    draw_tracked_text(draw, (W - pw) / 2.0, 446, pill, f_pill, 1.4, ivory)

    ft = "LISTA PRIORITARIA GRUPPI, TAVOLI & DISPONIBILITÀ APPENA PUBBLICATO IL LINE-UP 2027"
    fw, _ = measure_tracked_text(ft, f_foot, 1.4)
    draw_tracked_text(draw, (W - fw) / 2.0, 560, ft, f_foot, 1.4, gold)

    out = REPO_ROOT / "public/images/events/capodanno-2027-posters/capodanno-fabbrica-del-vapore-milano.webp"
    save_card(rgba.convert("RGB"), out, wa_glyph)


def build_magazzini_tavoli_card(wa_glyph: Image.Image) -> None:
    W, H = 1376, 714
    im = _dark_radial_canvas(W, H, (12, 34, 24), (5, 10, 9))
    rgba = im.convert("RGBA")
    draw = ImageDraw.Draw(rgba)
    gold = (212, 180, 114, 255)
    gold_soft = (212, 180, 114, 110)
    ivory = (246, 241, 231, 255)
    muted = (212, 222, 214, 235)

    draw.rectangle([(22, 18), (W - 23, H - 19)], outline=gold, width=2)
    draw.rectangle([(34, 30), (W - 35, H - 31)], outline=gold_soft, width=1)

    f_eye = ImageFont.truetype(str(FONT_BOLD_PATH), 19)
    f_title = _serif_font(40)
    f_sub = ImageFont.truetype(str(FONT_BOLD_PATH), 19)
    f_card_zone = ImageFont.truetype(str(FONT_BOLD_PATH), 23)
    f_card_price = _serif_font(54)
    f_card_det = ImageFont.truetype(str(FONT_BOLD_PATH), 19)
    f_note = ImageFont.truetype(str(FONT_BOLD_PATH), 17)

    ey = "MAGAZZINI GENERALI MILANO  ·  VIA PIETRASANTA 16  ·  31 DICEMBRE 2026"
    ew, _ = measure_tracked_text(ey, f_eye, 2.0)
    draw_tracked_text(draw, (W - ew) / 2.0, 52, ey, f_eye, 2.0, gold)

    tt = "TAVOLI VIP UFFICIALI · CAPODANNO 2027"
    tw, _ = measure_tracked_text(tt, f_title, 1.2)
    draw_tracked_text(draw, (W - tw) / 2.0, 94, tt, f_title, 1.2, ivory)

    sub = "20:30 DINNER SHOW CON ALE ZEUS (BUFFET 80 €)   ·   23:00 WE LOVE 2000 DA 30 € CON GADGET IN REGALO"
    sw, _ = measure_tracked_text(sub, f_sub, 1.0)
    draw_tracked_text(draw, (W - sw) / 2.0, 162, sub, f_sub, 1.0, gold)

    cards = [
        ("ZONA PISTA", "300 €", "Fino a 5 persone", "1 bottiglia inclusa", "Quota extra: +60 € / persona", "Es. 6 persone = 360 €"),
        ("ZONA BALCONATA", "600 €", "Fino a 10 persone", "2 bottiglie incluse", "Quota extra: +60 € / persona", "Vista panoramica pista"),
        ("ZONA PRIVÉ PALCO", "900 €", "Fino a 10 persone", "3 bottiglie incluse", "Quota extra: +90 € / persona", "Area esclusiva sotto console"),
    ]
    margin_x = 58
    gap = 28
    cw = (W - 2 * margin_x - 2 * gap) // 3
    top_y = 224
    bot_y = 564

    for idx, (zone, price, pax, btls, extra, ex) in enumerate(cards):
        x1 = margin_x + idx * (cw + gap)
        x2 = x1 + cw
        draw.rectangle([(x1, top_y), (x2, bot_y)], fill=(7, 20, 15, 240), outline=gold, width=2)
        draw.line([(x1 + 24, top_y + 62), (x2 - 24, top_y + 62)], fill=gold_soft, width=1)

        zw, _ = measure_tracked_text(zone, f_card_zone, 1.5)
        draw_tracked_text(draw, x1 + (cw - zw) / 2.0, top_y + 22, zone, f_card_zone, 1.5, gold)

        pw, _ = measure_tracked_text(price, f_card_price, 1.0)
        draw_tracked_text(draw, x1 + (cw - pw) / 2.0, top_y + 84, price, f_card_price, 1.0, ivory)

        for row_idx, line in enumerate([pax, btls, extra, ex]):
            lw, _ = measure_tracked_text(line, f_card_det, 0.5)
            color = gold if row_idx == 2 else muted
            draw_tracked_text(draw, x1 + (cw - lw) / 2.0, top_y + 174 + row_idx * 36, line, f_card_det, 0.5, color)

    note_box = (58, 594, W - 58, 662)
    draw.rectangle(note_box, fill=(8, 12, 11, 240), outline=gold_soft, width=1)
    n1 = "REGOLA UFFICIALE OSPITI EXTRA: chi si aggiunge al tavolo oltre la capienza base paga la propria quota"
    n2 = "(Esempio confermato: tavolo Pista 300 € per 5 persone · con 6 persone il totale è 360 € con 1 bottiglia)."
    n1w, _ = measure_tracked_text(n1, f_note, 0.5)
    n2w, _ = measure_tracked_text(n2, f_note, 0.5)
    draw_tracked_text(draw, (W - n1w) / 2.0, 606, n1, f_note, 0.5, gold)
    draw_tracked_text(draw, (W - n2w) / 2.0, 632, n2, f_note, 0.5, ivory)

    out = REPO_ROOT / "public/images/events/capodanno-2027-menus/magazzini-generali-nye-2027-tavoli.webp"
    save_card(rgba.convert("RGB"), out, wa_glyph)


def main() -> None:
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    build_pelledoca_poster(wa_glyph)
    build_justme_gala_menu(wa_glyph)
    build_clean_menu_cards(wa_glyph)
    build_fabbrica_poster(wa_glyph)
    build_magazzini_tavoli_card(wa_glyph)


if __name__ == "__main__":
    main()
