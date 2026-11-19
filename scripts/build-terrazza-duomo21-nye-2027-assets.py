#!/usr/bin/env python3
"""Build 100% real-photography official assets for Terrazza Duomo 21 (1F) & Terrazza MA.RE (5F) NYE 2027.
Zero AI generation, zero inpainting. Sources: official terrazzaduomo21.it & marecapitaneo.com photos.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = Path(r"D:\nightlife-T029\media-raw")

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


def soft_compress_highlights(im: Image.Image, knee: float = 224.0, ceiling: float = 247.0) -> Image.Image:
    """Smoothly roll off clipped bright skies/lamps without altering framing or adding content."""
    arr = np.array(im.convert("RGB"), dtype=np.float32)
    mask = arr > knee
    if np.any(mask):
        span = 255.0 - knee
        headroom = ceiling - knee
        arr[mask] = knee + headroom * np.tanh(((arr[mask] - knee) / span) * 1.4) / np.tanh(1.4)
    return Image.fromarray(np.clip(np.round(arr), 0, 255).astype(np.uint8), mode="RGB")


def fit_cover(im: Image.Image, tw: int, th: int, anchor_y: float = 0.5) -> Image.Image:
    im = im.convert("RGB")
    sw, sh = im.size
    target_ratio = tw / th
    src_ratio = sw / sh
    if src_ratio > target_ratio:
        nw = int(round(sh * target_ratio))
        x0 = (sw - nw) // 2
        im = im.crop((x0, 0, x0 + nw, sh))
    else:
        nh = int(round(sw / target_ratio))
        y0 = int(round((sh - nh) * anchor_y))
        y0 = max(0, min(sh - nh, y0))
        im = im.crop((0, y0, sw, y0 + nh))
    return im.resize((tw, th), Image.Resampling.LANCZOS)


def build_official_poster(src_path: Path, out_path: Path) -> None:
    """Create 1376x768 Couture Noir official event poster from real night photography of Piazza Duomo / Terrazza Duomo 21."""
    base = fit_cover(Image.open(src_path), 1376, 714, anchor_y=0.45)
    base = soft_compress_highlights(base, knee=220.0, ceiling=245.0)
    base = ImageEnhance.Contrast(base).enhance(1.06)

    # Subtle bottom + top editorial scrim for crisp gold/ivory typography without obscuring the Duomo/Galleria arches
    rgba = base.convert("RGBA")
    W, H = rgba.size
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(0, 150):
        a = int(round(170 * (1.0 - y / 150.0) ** 1.3))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    for y in range(H - 250, H):
        t = (y - (H - 250)) / 250.0
        a = int(round(215 * (t ** 1.25)))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    rgba = Image.alpha_composite(rgba, scrim)

    draw = ImageDraw.Draw(rgba)
    # Fine gold hairline inner frame
    draw.rectangle([(18, 16), (W - 19, H - 17)], outline=(206, 174, 114, 150), width=1)

    f_eyebrow = ImageFont.truetype(str(FONT_BOLD_PATH), 20)
    f_title = ImageFont.truetype(str(FONT_BOLD_PATH), 56)
    f_sub = ImageFont.truetype(str(FONT_BOLD_PATH), 22)
    f_date = ImageFont.truetype(str(FONT_BOLD_PATH), 19)

    eyebrow = "PIAZZA DEL DUOMO 21 · MILANO · 1° PIANO & 5° PIANO MA.RE"
    ew, _ = measure_tracked_text(eyebrow, f_eyebrow, 3.2)
    draw_tracked_text(draw, (W - ew) / 2.0, 36, eyebrow, f_eyebrow, 3.2, (230, 198, 134, 255))

    title = "TERRAZZA DUOMO 21 · NYE 2027"
    tw, _ = measure_tracked_text(title, f_title, 2.2)
    draw_tracked_text(draw, (W - tw) / 2.0, H - 182, title, f_title, 2.2, (250, 246, 238, 255))

    sub = "1° PIANO CHEF VALERIO BRASCHI  ·  5° PIANO MA.RE CHEF CAPITANEO 2 STELLE MICHELIN"
    sw, _ = measure_tracked_text(sub, f_sub, 1.2)
    draw_tracked_text(draw, (W - sw) / 2.0, H - 108, sub, f_sub, 1.2, (226, 194, 132, 255))

    date_line = "31 DICEMBRE 2026  ·  GALA DINNER, BUFFET, BRINDISI & DJ SET FINO AL MATTINO"
    dw, _ = measure_tracked_text(date_line, f_date, 1.8)
    draw_tracked_text(draw, (W - dw) / 2.0, H - 64, date_line, f_date, 1.8, (238, 232, 220, 240))

    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    card = compose_couture_noir_card(rgba.convert("RGB"), wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=270_000)
    out_path.write_bytes(raw)
    print(f"POSTER OK: {out_path} ({card.size[0]}x{card.size[1]}, {len(raw)//1024} KB)")


def save_master_webp(
    src_path: Path,
    out_path: Path,
    size: tuple[int, int],
    anchor_y: float = 0.5,
    sharpen_pct: int = 0,
) -> None:
    im = fit_cover(Image.open(src_path), size[0], size[1], anchor_y=anchor_y)
    im = soft_compress_highlights(im, knee=214.0, ceiling=238.0)
    if sharpen_pct > 0:
        # Midtone-weighted gentle unsharp mask (standard-siti-eventi 20 ott 2026)
        sharp = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=sharpen_pct, threshold=2))
        a0 = np.array(im, dtype=np.float32)
        a1 = np.array(sharp, dtype=np.float32)
        lum = 0.299 * a0[:, :, 0] + 0.587 * a0[:, :, 1] + 0.114 * a0[:, :, 2]
        w = np.clip((218.0 - lum) / 45.0, 0.0, 1.0)[:, :, None]
        im = Image.fromarray(np.clip(np.round(a0 * (1.0 - w) + a1 * w), 0, 255).astype(np.uint8), mode="RGB")
        im = soft_compress_highlights(im, knee=216.0, ceiling=240.0)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, format="WEBP", quality=88, method=6)
    print(f"MEDIA OK:  {out_path.name} ({im.size[0]}x{im.size[1]}, {out_path.stat().st_size//1024} KB)")


def main() -> None:
    poster_out = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-posters" / "capodanno-terrazza-duomo-21.webp"
    build_official_poster(RAW_DIR / "19_terrazzaduomo21-home-slider.jpg", poster_out)

    master_dir = REPO_ROOT / "public" / "images" / "seo-events" / "master"
    masters = [
        ("22_terrazzaduomo21-milano-about-4.jpg", "terrazza-duomo-21-real-01.webp", (1920, 1080), 0.48, 0),
        ("19_terrazzaduomo21-home-slider.jpg", "terrazza-duomo-21-real-02.webp", (1920, 1080), 0.45, 0),
        ("01_luogo-hero.jpg", "terrazza-mare-5f-real-03.webp", (1920, 1080), 0.48, 0),
        ("16_prenota-hero.jpg", "terrazza-mare-5f-real-04.webp", (1920, 1080), 0.50, 0),
    ]
    for src_name, dst_name, dims, ay, sp in masters:
        save_master_webp(RAW_DIR / src_name, master_dir / dst_name, dims, anchor_y=ay, sharpen_pct=sp)

    menu_dir = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-menus"
    menus = [
        ("23_terrazzaduomo21-milano-events-1.jpg", "terrazza-duomo21-f1-place-menu.webp", (1376, 768), 0.50, 0),
        ("21_lounge-home.jpg", "terrazza-duomo21-f1-buffet-lounge.webp", (1376, 768), 0.45, 75),
        ("04_mare-04.jpg", "terrazza-mare-f5-capitaneo-menu.webp", (1376, 768), 0.50, 65),
    ]
    for src_name, dst_name, dims, ay, sp in menus:
        save_master_webp(RAW_DIR / src_name, menu_dir / dst_name, dims, anchor_y=ay, sharpen_pct=sp)


if __name__ == "__main__":
    main()
