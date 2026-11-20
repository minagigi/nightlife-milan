#!/usr/bin/env python3
"""Costruzione 100% Zero-Gomma-Magica degli asset ufficiali per Bobino Milano Capodanno 2027 ("BOBINO LEGENDS"):
  1. public/images/events/capodanno-2027-posters/capodanno-bobino-milano.webp (Gruppo B intatta + cornice Couture Noir)
  2. public/images/events/capodanno-2027-menus/bobino-nye-2027-menu-legends-120.webp (Menu 120€ + Programma @bobinomilano + barra Nightlife Milan)
  3. public/images/events/capodanno-2027-menus/bobino-nye-2027-party-legends-30.webp (After Dinner 30€/35€/40€/50€ + Card Contatti bonificata in-place zero-gomma)
  4. 4 foto reali master 16:9 (1920x1080) in public/images/seo-events/master/ conformi a controlla_foto_locale.py
"""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
BOBINO_SRC = Path(r"D:\lavori-antigravity\ecommerce-nativo-magister-mida-20261116\bobino-sources")

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


def _sample_plate_bg(orig_arr: np.ndarray, x1: int, y1: int, x2: int, y2: int) -> np.ndarray:
    H, W, _ = orig_arr.shape
    pw, ph = x2 - x1, y2 - y1

    def sample_raw(cx: int, cy: int) -> np.ndarray:
        sx0 = max(0, min(W - 8, cx - 4))
        sy0 = max(0, min(H - 8, cy - 4))
        patch = orig_arr[sy0 : sy0 + 8, sx0 : sx0 + 8].reshape(-1, 3)
        med = np.median(patch, axis=0).astype(np.float32)
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
    fs1_cap: int = 44,
    fs2_cap: int = 24,
) -> tuple[Image.Image, dict]:
    """Covers third-party phone/contact text strictly inside (x1, y1, x2, y2) with an opaque bilinear plate."""
    orig_arr = np.array(im.convert("RGB"))
    H, W, _ = orig_arr.shape
    x1 = max(0, min(W - 4, x1))
    x2 = max(x1 + 4, min(W, x2))
    y1 = max(0, min(H - 4, y1))
    y2 = max(y1 + 4, min(H, y2))
    pw, ph = x2 - x1, y2 - y1

    grad_u8 = _sample_plate_bg(orig_arr, x1, y1, x2, y2)
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
        outline=(212, 175, 106, 160),
        width=2,
    )
    plate_rgba.alpha_composite(ov.resize((pw, ph), Image.Resampling.LANCZOS))

    line1_num = "+39 351 912 7047"
    line2_txt = "WWW.NIGHTLIFEMILAN.COM" + (f" · {address_line2}" if address_line2 else "")

    fs1 = max(16, min(fs1_cap, int(round(ph * 0.34))))
    fs2 = max(13, min(fs2_cap, int(round(ph * 0.22))))

    for _ in range(12):
        f1 = ImageFont.truetype(str(FONT_BOLD_PATH), fs1)
        f2 = ImageFont.truetype(str(FONT_BOLD_PATH), fs2)
        tr1_num = max(0.8, round(fs1 * 0.05, 1))
        tr2 = max(0.9, round(fs2 * 0.08, 1))
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
    bb1 = f1.getbbox(line1_num)
    h1 = bb1[3] - bb1[1]
    bb2 = f2.getbbox(line2_txt)
    h2 = bb2[3] - bb2[1]
    v_gap = max(10, int(round(ph * 0.14)))
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


def make_diptych(left: Image.Image, right: Image.Image, target_h: int = 1080) -> Image.Image:
    """Composes two uncropped official portrait cards side-by-side on deep Couture Noir canvas."""
    lw, lh = left.size
    rw, rh = right.size
    nlw = int(round(lw * (target_h / lh)))
    nrw = int(round(rw * (target_h / rh)))
    gap = 28
    pad_x = 36
    canvas_w = pad_x * 2 + nlw + gap + nrw
    canvas = Image.new("RGB", (canvas_w, target_h), (12, 8, 20))
    canvas.paste(left.convert("RGB").resize((nlw, target_h), Image.Resampling.LANCZOS), (pad_x, 0))
    canvas.paste(right.convert("RGB").resize((nrw, target_h), Image.Resampling.LANCZOS), (pad_x + nlw + gap, 0))
    draw = ImageDraw.Draw(canvas)
    cx = pad_x + nlw + gap // 2
    draw.line([(cx, 36), (cx, target_h - 36)], fill=(201, 168, 106), width=2)
    return canvas


def grade_real_venue_16_9(
    im: Image.Image,
    target_w: int = 1920,
    target_h: int = 1080,
    sharpen_pct: int = 120,
) -> Image.Image:
    """Applies soft highlight roll-off, neutralizes bottom purple/magenta cast, and outputs crisp 16:9 WebP."""
    im_rgb = im.convert("RGB")
    w, h = im_rgb.size
    target_ratio = target_w / target_h
    cur_ratio = w / h
    if cur_ratio > target_ratio * 1.01:
        nw = int(round(h * target_ratio))
        off_x = (w - nw) // 2
        im_rgb = im_rgb.crop((off_x, 0, off_x + nw, h))
    elif cur_ratio < target_ratio * 0.99:
        nh = int(round(w / target_ratio))
        off_y = max(0, (h - nh) // 3)
        im_rgb = im_rgb.crop((0, off_y, w, min(h, off_y + nh)))

    im_scaled = im_rgb.resize((target_w, target_h), Image.Resampling.LANCZOS)
    arr = np.array(im_scaled, dtype=np.float32)

    # Neutralize bottom-half magenta/purple cast (mag_low <= 23.0 per contestualizzazione-foto-locali-reali)
    half = target_h // 2
    low = arr[half:, :, :]
    r, g, b = low[:, :, 0], low[:, :, 1], low[:, :, 2]
    mag = 0.5 * (r + b) - g
    excess = np.maximum(0.0, mag - 14.0)
    low[:, :, 1] = np.clip(g + excess * 0.55, 0, 255)
    low[:, :, 2] = np.clip(b - excess * 0.35, 0, 255)
    arr[half:, :, :] = low

    # Softly restrain global magenta excesses above 22
    rg = arr[:, :, 0]
    gg = arr[:, :, 1]
    bg = arr[:, :, 2]
    magg = 0.5 * (rg + bg) - gg
    exg = np.maximum(0.0, magg - 22.0)
    arr[:, :, 1] = np.clip(gg + exg * 0.45, 0, 255)
    arr[:, :, 2] = np.clip(bg - exg * 0.25, 0, 255)

    # Pre-clean highlights above 224 before contrast & micro-sharpen
    over = np.maximum(0.0, arr - 224.0)
    arr = np.where(arr > 224.0, 224.0 + over * 0.32, arr)

    graded = Image.fromarray(np.clip(np.round(arr), 0, 255).astype(np.uint8), mode="RGB")
    graded = ImageEnhance.Contrast(graded).enhance(1.06)
    graded = graded.filter(ImageFilter.UnsharpMask(radius=1.05, percent=sharpen_pct, threshold=2))

    # Post-sharpen soft highlight ceiling above 238 so clip_hi <= 2.0% and clip_hi_low <= 1.8%
    arr2 = np.array(graded, dtype=np.float32)
    over2 = np.maximum(0.0, arr2 - 238.0)
    arr2 = np.where(arr2 > 238.0, 238.0 + over2 * 0.22, arr2)
    return Image.fromarray(np.clip(np.round(arr2), 0, 255).astype(np.uint8), mode="RGB")


def save_couture_card(art_rgb: Image.Image, out_path: Path, wa_glyph: Image.Image) -> dict:
    card = compose_couture_noir_card(art_rgb, wa_glyph)
    data = encode_webp_under_budget(card, max_bytes=275_000)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)
    return {"file": str(out_path.relative_to(REPO_ROOT).as_posix()), "bytes": len(data), "size": list(card.size)}


def save_master_webp(im: Image.Image, out_path: Path, max_bytes: int = 275_000) -> dict:
    data = encode_webp_under_budget(im, max_bytes=max_bytes)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(data)
    return {"file": str(out_path.relative_to(REPO_ROOT).as_posix()), "bytes": len(data), "size": list(im.size)}


def compose_portrait_duo_16_9(left_im: Image.Image, right_im: Image.Image) -> Image.Image:
    """Places two full portrait photographs edge-to-edge on 1920x1080 without cropping heads or plates."""
    canvas = Image.new("RGB", (1920, 1080), (14, 12, 10))
    for slot_idx, src_im in enumerate((left_im, right_im)):
        src = src_im.convert("RGB")
        sw, sh = src.size
        box_w, box_h = 956, 1080
        # Fit height to 1080; center-crop horizontally only slightly if needed
        scale = max(box_w / sw, box_h / sh)
        nw = int(round(sw * scale))
        nh = int(round(sh * scale))
        resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
        cx = max(0, (nw - box_w) // 2)
        cy = 0  # preserve top heads cleanly!
        cropped = resized.crop((cx, cy, cx + box_w, cy + box_h))
        canvas.paste(cropped, (0 if slot_idx == 0 else 964, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((956, 0, 963, 1080), fill=(18, 14, 10))
    draw.line([(959, 0), (959, 1080)], fill=(201, 168, 106), width=2)
    return grade_real_venue_16_9(canvas)


def main() -> int:
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    manifest: list[dict] = []

    posters_dir = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-posters"
    menus_dir = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-menus"
    master_dir = REPO_ROOT / "public" / "images" / "seo-events" / "master"

    # 1. Main Official Flyer (1080x1350 Group B lossless -> 0 pixels touched inside artwork)
    flyer_main = Image.open(BOBINO_SRC / "flyer-bobino-capodanno-2027-official.png").convert("RGB")
    manifest.append(save_couture_card(flyer_main, posters_dir / "capodanno-bobino-milano.webp", wa_glyph))

    # 2. Menu 120€ + Programma Official @bobinomilano Carousel Pair -> Couture Noir Card
    slide_menu = Image.open(BOBINO_SRC / "ig-legends-slide-4.jpg").convert("RGB")
    slide_prog = Image.open(BOBINO_SRC / "ig-legends-slide-1.jpg").convert("RGB")
    menu_prog_pair = make_diptych(slide_menu, slide_prog)
    manifest.append(save_couture_card(menu_prog_pair, menus_dir / "bobino-nye-2027-menu-legends-120.webp", wa_glyph))

    # 3. After Dinner 30€/35€/40€/50€ + Contact Card bonified in-place (replaces 371 408 5303 without magic-eraser inpainting)
    slide_after = Image.open(BOBINO_SRC / "ig-legends-slide-6.jpg").convert("RGB")
    slide_contact_raw = Image.open(BOBINO_SRC / "ig-legends-slide-7.jpg").convert("RGB")
    slide_contact_clean, plate_meta = apply_custom_contact_plate(
        slide_contact_raw,
        220,
        872,
        860,
        1020,
        wa_glyph,
        address_line2=None,
        fs1_cap=42,
        fs2_cap=24,
    )
    party_pair = make_diptych(slide_after, slide_contact_clean)
    manifest.append({**save_couture_card(party_pair, menus_dir / "bobino-nye-2027-party-legends-30.webp", wa_glyph), **plate_meta})

    # 4. Real Bobino 16:9 Master Gallery Images
    # (a) Historic Porta Genova brick hall + BOBINO LED stage + Chesterfield VIP sofas (native 1376x768 crisp)
    im_stage = Image.open(BOBINO_SRC / "bobino-location-5-1300x722.jpg")
    manifest.append(
        save_master_webp(grade_real_venue_16_9(im_stage, target_w=1376, target_h=768, sharpen_pct=190), master_dir / "bobino-milano.webp")
    )

    # (b) Real Served Dinner guests toasting wine + Italian antipasti & riso venere
    im_dinner_guests = Image.open(BOBINO_SRC / "bobino-foto8finale.jpg")
    im_dinner_brunch = Image.open(BOBINO_SRC / "bobino-foto1finale.jpg")
    manifest.append(save_master_webp(compose_portrait_duo_16_9(im_dinner_guests, im_dinner_brunch), master_dir / "bobino-milano-cena-01.webp"))

    # (c) Main Room LEDWALL & Disco Ball Live Show atmosphere (native 1376x768 crisp)
    im_live = Image.open(BOBINO_SRC / "bobino-8Y4A2158-1.jpg")
    manifest.append(
        save_master_webp(grade_real_venue_16_9(im_live, target_w=1376, target_h=768, sharpen_pct=165), master_dir / "bobino-milano-live-01.webp")
    )

    # (d) Real stylish Bobino nightlife guests under the illuminated TERRAZZA BOBINO sign
    im_crowd_1 = Image.open(BOBINO_SRC / "ig-DfaIuKtDYkQ.jpg")
    im_crowd_2 = Image.open(BOBINO_SRC / "ig-DfaI97Djc5x.jpg")
    manifest.append(save_master_webp(compose_portrait_duo_16_9(im_crowd_1, im_crowd_2), master_dir / "bobino-milano-party-01.webp"))

    out_manifest = REPO_ROOT / "scripts" / "poster-remediation" / "bobino-2027-assets-manifest.json"
    out_manifest.write_text(json.dumps({"assets": manifest}, indent=2), encoding="utf-8")
    print(json.dumps({"generated": len(manifest), "assets": manifest}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
