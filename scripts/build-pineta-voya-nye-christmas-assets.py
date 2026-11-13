#!/usr/bin/env python3
"""Costruzione 100% Zero-Gomma-Magica delle locandine e menu ufficiali per:
  - Capodanno 2027 Moulin Rouge @ Pineta Milano (poster, programma, Gala 160€, Buffet 40€)
  - Capodanno 2027 @ Voya Rooftop Milano (poster + menu IT/EN 300€)
  - Natale 2026 @ Voya Rooftop Milano (poster + menu IT/EN 100€)

Usa esclusivamente PIL + NumPy (nessun import cv2 / nessun .inpaint),
riutilizzando la cornice Couture Noir 1376x768 (<= 280 KB WebP <= 300 KB og:image)
e le utility di rebuild-all-posters-zero-gomma.py.
"""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(r"D:\lavori-antigravity\nightlife-milan-ottimizzazione-totale-20261111\repo")
RAW_MASTERS = REPO_ROOT / "scripts" / "poster-remediation" / "raw-masters"

# Import helpers from rebuild-all-posters-zero-gomma.py without triggering CLI
_REBUILD_PATH = REPO_ROOT / "scripts" / "rebuild-all-posters-zero-gomma.py"
_spec = importlib.util.spec_from_file_location("rebuild_zero_gomma", _REBUILD_PATH)
assert _spec and _spec.loader
_rzg = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_rzg)

FONT_BOLD_PATH: Path = _rzg.FONT_BOLD_PATH
WA_GLYPH_PATH: Path = _rzg.WA_GLYPH_PATH
build_wa_badge = _rzg.build_wa_badge
compose_couture_noir_card = _rzg.compose_couture_noir_card
compute_laplacian_var = _rzg.compute_laplacian_var
compute_sobel_p99 = _rzg.compute_sobel_p99
draw_tracked_text = _rzg.draw_tracked_text
encode_webp_under_budget = _rzg.encode_webp_under_budget
measure_tracked_text = _rzg.measure_tracked_text


def _sample_plate_bg(
    orig_arr: np.ndarray,
    x1: int,
    y1: int,
    x2: int,
    y2: int,
    mode: str = "noir",
) -> np.ndarray:
    """Computes a smooth bilinear background gradient sampled strictly outside (x1,y1,x2,y2)."""
    H, W, _ = orig_arr.shape
    pw, ph = x2 - x1, y2 - y1

    def sample_raw(cx: int, cy: int) -> np.ndarray:
        sx0 = max(0, min(W - 8, cx - 4))
        sy0 = max(0, min(H - 8, cy - 4))
        patch = orig_arr[sy0 : sy0 + 8, sx0 : sx0 + 8].reshape(-1, 3)
        med = np.median(patch, axis=0).astype(np.float32)
        if mode == "crimson":
            # Deep rich burgundy matching Voya Christmas card (#4A0A0D .. #5A0D10)
            return np.clip(med * 0.52, np.array([34.0, 6.0, 8.0]), np.array([76.0, 14.0, 16.0]))
        return _rzg.clamp_dark_tint(med)

    c_tl = sample_raw(max(0, x1 - 6), max(0, y1 - 6))
    c_tr = sample_raw(min(W - 1, x2 + 6), max(0, y1 - 6))
    c_bl = sample_raw(max(0, x1 - 6), min(H - 1, y2 + 6))
    c_br = sample_raw(min(W - 1, x2 + 6), min(H - 1, y2 + 6))

    u = np.linspace(0.0, 1.0, pw, dtype=np.float32)[None, :, None]
    v = np.linspace(0.0, 1.0, ph, dtype=np.float32)[:, None, None]
    grad = (
        (1.0 - u) * (1.0 - v) * c_tl
        + u * (1.0 - v) * c_tr
        + (1.0 - u) * v * c_bl
        + u * v * c_br
    )
    return np.clip(np.round(grad), 0, 255).astype(np.uint8)


def apply_custom_contact_plate(
    im: Image.Image,
    x1: int,
    y1: int,
    x2: int,
    y2: int,
    wa_glyph: Image.Image,
    address_line2: str | None = None,
    mode: str = "noir",
    fs1_cap: int = 44,
    fs2_cap: int = 30,
) -> tuple[Image.Image, dict]:
    """Covers third-party contacts strictly inside (x1, y1, x2, y2) with an opaque bilinear plate."""
    orig_arr = np.array(im.convert("RGB"))
    H, W, _ = orig_arr.shape
    x1 = max(0, min(W - 4, x1))
    x2 = max(x1 + 4, min(W, x2))
    y1 = max(0, min(H - 4, y1))
    y2 = max(y1 + 4, min(H, y2))
    pw, ph = x2 - x1, y2 - y1

    grad_u8 = _sample_plate_bg(orig_arr, x1, y1, x2, y2, mode=mode)
    gray_bg = 0.299 * grad_u8[:, :, 0] + 0.587 * grad_u8[:, :, 1] + 0.114 * grad_u8[:, :, 2]
    bg_lap_var = compute_laplacian_var(gray_bg)

    plate_rgba = Image.fromarray(grad_u8, mode="RGB").convert("RGBA")
    ss = 2
    ov = Image.new("RGBA", (pw * ss, ph * ss), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    rad = min((ph * ss) // 2 - 4, 34)
    od.rounded_rectangle(
        (2, 2, pw * ss - 3, ph * ss - 3),
        radius=max(8, rad),
        outline=(212, 175, 106, 135),
        width=2,
    )
    plate_rgba.alpha_composite(ov.resize((pw, ph), Image.Resampling.LANCZOS))

    line1_num = "+39 351 912 7047"
    line2_txt = "WWW.NIGHTLIFEMILAN.COM" + (f" · {address_line2}" if address_line2 else "")

    fs1 = max(16, min(fs1_cap, int(round(ph * 0.34))))
    fs2 = max(13, min(fs2_cap, int(round(ph * 0.25))))

    for _ in range(12):
        f1 = ImageFont.truetype(str(FONT_BOLD_PATH), fs1)
        f2 = ImageFont.truetype(str(FONT_BOLD_PATH), fs2)
        tr1_num = max(0.8, round(fs1 * 0.05, 1))
        tr2 = max(1.0, round(fs2 * 0.10, 1))
        w_num, _ = measure_tracked_text(line1_num, f1, tr1_num)
        badge_d = max(16, int(round(fs1 * 1.04)))
        gap = max(10, int(round(fs1 * 0.34)))
        total_w1 = badge_d + gap + w_num
        total_w2, _ = measure_tracked_text(line2_txt, f2, tr2)
        if max(total_w1, total_w2) <= pw - 30:
            break
        fs1 = max(14, fs1 - 2)
        fs2 = max(12, fs2 - 1)

    draw = ImageDraw.Draw(plate_rgba)
    bb1 = f1.getbbox("+39 351 912 7047")
    h1 = bb1[3] - bb1[1]
    bb2 = f2.getbbox("WWW.NIGHTLIFEMILAN.COM")
    h2 = bb2[3] - bb2[1]
    v_gap = max(8, int(round(ph * 0.14)))
    block_h = h1 + v_gap + h2
    top_y = (ph - block_h) / 2.0

    start_x1 = (pw - total_w1) / 2.0
    y1_draw = top_y - bb1[1]
    badge_im = build_wa_badge(badge_d, wa_glyph)
    badge_y = int(round(top_y + (h1 - badge_d) / 2.0))
    plate_rgba.alpha_composite(badge_im, (int(round(start_x1)), badge_y))

    draw = ImageDraw.Draw(plate_rgba)
    draw_tracked_text(draw, start_x1 + badge_d + gap, y1_draw, line1_num, f1, tr1_num, (255, 255, 255, 255))

    start_x2 = (pw - total_w2) / 2.0
    y2_draw = top_y + h1 + v_gap - bb2[1]
    draw_tracked_text(draw, start_x2, y2_draw, line2_txt, f2, tr2, (224, 188, 118, 255))

    plate_rgb = np.array(plate_rgba.convert("RGB"))
    gray_post = 0.299 * plate_rgb[:, :, 0] + 0.587 * plate_rgb[:, :, 1] + 0.114 * plate_rgb[:, :, 2]
    sobel_p99 = compute_sobel_p99(gray_post)

    out_arr = orig_arr.copy()
    out_arr[y1:y2, x1:x2] = plate_rgb
    mask = np.ones((H, W), dtype=bool)
    mask[y1:y2, x1:x2] = False
    if int(np.count_nonzero(out_arr[mask] != orig_arr[mask])) != 0:
        raise RuntimeError("Pixel alterati fuori ROI!")

    return Image.fromarray(out_arr, mode="RGB"), {
        "roi": [x1, y1, x2, y2],
        "bg_laplacian_var": round(bg_lap_var, 4),
        "post_sobel_p99": round(sobel_p99, 2),
    }


def apply_single_text_plate(
    im: Image.Image,
    x1: int,
    y1: int,
    x2: int,
    y2: int,
    text: str,
    fs: int = 32,
    fill: tuple[int, int, int, int] = (212, 175, 106, 255),
) -> tuple[Image.Image, dict]:
    """Replaces a single line inside (x1, y1, x2, y2) with a smooth bilinear dark plate + sharp serif/sans text."""
    orig_arr = np.array(im.convert("RGB"))
    H, W, _ = orig_arr.shape
    pw, ph = x2 - x1, y2 - y1

    grad_u8 = _sample_plate_bg(orig_arr, x1, y1, x2, y2, mode="noir")
    gray_bg = 0.299 * grad_u8[:, :, 0] + 0.587 * grad_u8[:, :, 1] + 0.114 * grad_u8[:, :, 2]
    bg_lap_var = compute_laplacian_var(gray_bg)

    plate_rgba = Image.fromarray(grad_u8, mode="RGB").convert("RGBA")
    draw = ImageDraw.Draw(plate_rgba)
    f = ImageFont.truetype(str(FONT_BOLD_PATH), fs)
    tw, th = measure_tracked_text(text, f, 1.5)
    bb = f.getbbox(text)
    sx = (pw - tw) / 2.0
    sy = (ph - th) / 2.0 - bb[1]
    draw_tracked_text(draw, sx, sy, text, f, 1.5, fill)

    plate_rgb = np.array(plate_rgba.convert("RGB"))
    gray_post = 0.299 * plate_rgb[:, :, 0] + 0.587 * plate_rgb[:, :, 1] + 0.114 * plate_rgb[:, :, 2]
    sobel_p99 = compute_sobel_p99(gray_post)

    out_arr = orig_arr.copy()
    out_arr[y1:y2, x1:x2] = plate_rgb
    return Image.fromarray(out_arr, mode="RGB"), {
        "roi": [x1, y1, x2, y2],
        "bg_laplacian_var": round(bg_lap_var, 4),
        "post_sobel_p99": round(sobel_p99, 2),
    }


def save_card(art_rgb: Image.Image, out_path: Path, wa_glyph: Image.Image) -> dict:
    card = compose_couture_noir_card(art_rgb, wa_glyph)
    data = encode_webp_under_budget(card, max_bytes=275_000)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)
    return {
        "file": str(out_path.relative_to(REPO_ROOT).as_posix()),
        "bytes": len(data),
        "size": list(card.size),
    }


def main() -> int:
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    manifest: list[dict] = []

    cap_posters = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-posters"
    cap_menus = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-menus"
    xmas_posters = REPO_ROOT / "public" / "images" / "events" / "christmas-2026-posters"
    xmas_menus = REPO_ROOT / "public" / "images" / "events" / "christmas-2026-menus"

    # 1. Pineta NYE Main Poster (1080x1350): covers INFO&RESERVATIONS:+393388098326 + VIA MESSINA 38
    im = Image.open(RAW_MASTERS / "master_flyer_pineta_nye_2027.jpg")
    im1, m1 = apply_custom_contact_plate(im, 90, 1218, 990, 1336, wa_glyph, address_line2="VIA MESSINA 38", mode="noir", fs1_cap=38, fs2_cap=24)
    manifest.append({**save_card(im1, cap_posters / "capodanno-pineta-milano.webp", wa_glyph), **m1})

    # 2. Pineta NYE Schedule / Programma (1080x1920)
    im = Image.open(RAW_MASTERS / "master_story_pineta_nye_programma.jpg")
    im2, m2 = apply_custom_contact_plate(im, 80, 1528, 1000, 1696, wa_glyph, address_line2="VIA MESSINA 38", mode="noir", fs1_cap=46, fs2_cap=30)
    manifest.append({**save_card(im2, cap_menus / "pineta-nye-2027-programma.webp", wa_glyph), **m2})

    # 3. Pineta NYE Gala Dinner 160€ (1080x1920)
    im = Image.open(RAW_MASTERS / "master_story_pineta_nye_gala.jpg")
    im3, m3 = apply_custom_contact_plate(im, 80, 1528, 1000, 1696, wa_glyph, address_line2="VIA MESSINA 38", mode="noir", fs1_cap=46, fs2_cap=30)
    manifest.append({**save_card(im3, cap_menus / "pineta-nye-2027-menu-gala-160.webp", wa_glyph), **m3})

    # 4. Pineta NYE Royal Buffet 40€ (1080x1920) — corrects COSTO 60€ PER PERSONA -> COSTO 40€ PER PERSONA + contacts
    im = Image.open(RAW_MASTERS / "master_story_pineta_nye_buffet.jpg")
    im4_price, mp = apply_single_text_plate(im, 270, 1372, 810, 1422, "COSTO 40€ PER PERSONA", fs=32, fill=(214, 178, 108, 255))
    im4, m4 = apply_custom_contact_plate(im4_price, 80, 1528, 1000, 1696, wa_glyph, address_line2="VIA MESSINA 38", mode="noir", fs1_cap=46, fs2_cap=30)
    manifest.append({**save_card(im4, cap_menus / "pineta-nye-2027-menu-buffet-40.webp", wa_glyph), **m4, "price_plate": mp})

    # 5. Voya Rooftop NYE Main Poster (1280x1600): covers INFO E RESERVATION / +39 352 061 7165 - voyarooftop@gmail.com / Viale Achille Papa 30
    im = Image.open(RAW_MASTERS / "master_flyer_voya_nye_2027.jpg")
    im5, m5 = apply_custom_contact_plate(im, 180, 1406, 1100, 1538, wa_glyph, address_line2="VIALE ACHILLE PAPA 30", mode="noir", fs1_cap=40, fs2_cap=24)
    manifest.append({**save_card(im5, cap_posters / "capodanno-voya-rooftop-milano.webp", wa_glyph), **m5})

    # 6 & 7. Voya Rooftop NYE Official Menu IT & EN (1280x1600, Gruppo B -> zero artwork changes inside menu, framed on Couture Noir card)
    for src_name, dst_name in (
        ("master_menu_voya_nye_2027_it.png", "voya-nye-2027-menu-it.webp"),
        ("master_menu_voya_nye_2027_en.png", "voya-nye-2027-menu-en.webp"),
    ):
        im_m = Image.open(RAW_MASTERS / src_name).convert("RGB")
        manifest.append(save_card(im_m, cap_menus / dst_name, wa_glyph))

    # 8, 9, 10. Voya Rooftop Christmas 2026 Poster & IT/EN Menus (1280x1600, 100€)
    im_x_en = Image.open(RAW_MASTERS / "master_flyer_voya_natale_2026_en.png")
    im_x_en_b, mx_en = apply_custom_contact_plate(
        im_x_en, 286, 1438, 984, 1524, wa_glyph, address_line2=None, mode="crimson", fs1_cap=32, fs2_cap=24
    )
    manifest.append({**save_card(im_x_en_b, xmas_posters / "natale-voya-rooftop-milano-2026.webp", wa_glyph), **mx_en})
    manifest.append({**save_card(im_x_en_b, xmas_menus / "voya-natale-2026-menu-en.webp", wa_glyph), **mx_en})

    im_x_it = Image.open(RAW_MASTERS / "master_flyer_voya_natale_2026_it.png")
    im_x_it_b, mx_it = apply_custom_contact_plate(
        im_x_it, 286, 1438, 984, 1524, wa_glyph, address_line2=None, mode="crimson", fs1_cap=32, fs2_cap=24
    )
    manifest.append({**save_card(im_x_it_b, xmas_menus / "voya-natale-2026-menu-it.webp", wa_glyph), **mx_it})

    out_manifest = REPO_ROOT / "scripts" / "poster-remediation" / "pineta-voya-assets-manifest.json"
    out_manifest.write_text(json.dumps({"plates": manifest}, indent=2), encoding="utf-8")
    print(json.dumps({"generated": len(manifest), "files": manifest}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
