#!/usr/bin/env python3
"""Download & build 100% real-photography official assets, Couture Noir posters,
and bonified PDF menu plates for T-032 NYE 2027 (nightlifemilan.com ONLY).

Rules enforced:
- ZERO AI image generation.
- ZERO cv2 / ZERO inpainting (no magic-eraser blurring).
- Any third-party contact detected by RapidOCR is covered in-place by a 100% opaque
  (alpha=255) 4-corner bilinear gradient editorial plate + Nightlife Milan contacts.
- All posters & menu cards are Couture Noir 1376x768 WebP <= 270 KB.
- All SEO gallery masters are 1920x1080 WebP in public/images/seo-events/master/.
"""
from __future__ import annotations

import importlib.util
import re
import subprocess
from pathlib import Path
from typing import Any

import numpy as np
import pymupdf
from PIL import Image, ImageDraw, ImageEnhance, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = Path(r"D:\nightlife-T032\media-raw")
RAW_DIR.mkdir(parents=True, exist_ok=True)
WORK_DIR = Path(r"D:\lavori-antigravity\T-032-nightlife-email-soldout-siti-20261119")
WORK_DIR.mkdir(parents=True, exist_ok=True)
EMAIL_MAT_DIR = Path(r"C:\Users\minag\Desktop\CAPODANNO\richieste-locali\materiali-email")

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

THIRD_PARTY_CONTACT_RE = re.compile(
    r"(?:www\.|\.com\b|\.it\b|\.org\b|\.net\b|\.eu\b|@|"
    r"\+?\s*39[\s.\-]*\d|02[\s.\-]*\d{4,}|03\d[\s.\-]*\d{4,}|"
    r"\b3[2-9]\d[\s.\-]*\d{3}[\s.\-]*\d{3,4}\b|"
    r"infoline|reservations|prenotazion|ticketone|vivaticket|ticketsms|dice\.fm|xceed|eventbrite|mailticket|"
    r"togrp|mtishows|teatromanzoni|teatrolirico|teatronazionale|fioraiobianchi|palacevarese|hotelbarchetta|albergoterminus|villaeste|"
    r"info\.brunches|rsvp|book now)",
    re.I,
)


def download_binary(fname: str, url: str) -> Path:
    from urllib.parse import urlparse

    dst = RAW_DIR / fname
    if dst.exists() and dst.stat().st_size > 2000:
        return dst
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.netloc}/"
    r = subprocess.run(
        [
            "curl.exe", "-sL", "--max-time", "25",
            "-e", origin,
            "-H", "Accept: image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
            "-o", str(dst), url,
        ],
        capture_output=True,
    )
    if r.returncode != 0 or not dst.exists() or dst.stat().st_size < 2000:
        dst.unlink(missing_ok=True)
        raise RuntimeError(f"Download failed for {fname} <- {url}")
    if fname.lower().endswith(".pdf"):
        try:
            with pymupdf.open(dst) as doc:
                if len(doc) == 0:
                    raise ValueError("empty PDF")
        except Exception as ex:
            dst.unlink(missing_ok=True)
            raise RuntimeError(f"Invalid PDF {fname}: {ex}") from ex
        return dst
    try:
        with Image.open(dst) as im:
            im.verify()
    except Exception as ex:
        dst.unlink(missing_ok=True)
        raise RuntimeError(f"Invalid image {fname}: {ex}") from ex
    return dst


def soft_compress_highlights(im: Image.Image, knee: float = 216.0, ceiling: float = 240.0) -> Image.Image:
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


def apply_opaque_contact_plate(im: Image.Image, box: tuple[int, int, int, int], light_bg: bool = False) -> Image.Image:
    """Opaque 4-corner bilinear gradient plate (zero cv2/inpaint)."""
    W, H = im.size
    x1, y1, x2, y2 = box
    x1 = max(0, x1 - 16)
    y1 = max(0, y1 - 8)
    x2 = min(W, x2 + 16)
    y2 = min(H, y2 + 8)
    pw, ph = x2 - x1, y2 - y1
    if pw < 20 or ph < 12:
        return im

    arr = np.array(im.convert("RGB"), dtype=np.float32)

    def sample_corner(cx: int, cy: int) -> np.ndarray:
        sx1, sx2 = max(0, cx - 5), min(W, cx + 5)
        sy1, sy2 = max(0, cy - 5), min(H, cy + 5)
        patch = arr[sy1:sy2, sx1:sx2]
        med = np.median(patch.reshape(-1, 3), axis=0) if patch.size else np.array([16.0, 16.0, 20.0])
        if light_bg:
            return np.clip(med, 0.0, 255.0)
        lum = 0.299 * med[0] + 0.587 * med[1] + 0.114 * med[2]
        target_lum = float(np.clip(lum, 10.0, 24.0))
        if lum > 1e-3:
            med = med * (target_lum / lum)
        return np.clip(med, 8.0, 28.0)

    c_tl = sample_corner(max(0, x1 - 6), max(0, y1 - 6))
    c_tr = sample_corner(min(W - 1, x2 + 6), max(0, y1 - 6))
    c_bl = sample_corner(max(0, x1 - 6), min(H - 1, y2 + 6))
    c_br = sample_corner(min(W - 1, x2 + 6), min(H - 1, y2 + 6))

    xs = np.linspace(0.0, 1.0, pw, dtype=np.float32)[None, :, None]
    ys = np.linspace(0.0, 1.0, ph, dtype=np.float32)[:, None, None]
    top = c_tl * (1.0 - xs) + c_tr * xs
    bot = c_bl * (1.0 - xs) + c_br * xs
    grad = np.clip(np.round(top * (1.0 - ys) + bot * ys), 0, 255).astype(np.uint8)

    out = im.convert("RGB").copy()
    plate = Image.fromarray(grad, mode="RGB")
    if not light_bg:
        draw = ImageDraw.Draw(plate)
        draw.rectangle([(0, 0), (pw - 1, ph - 1)], outline=(198, 168, 108), width=1)
        if pw >= 160 and ph >= 24:
            f_sz = max(10, min(18, int(ph * 0.48)))
            font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
            txt = "WWW.NIGHTLIFEMILAN.COM"
            while f_sz > 8 and draw.textlength(txt, font=font) > pw - 16:
                f_sz -= 1
                font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
            wt = draw.textlength(txt, font=font)
            draw.text(((pw - wt) / 2, (ph - f_sz) / 2), txt, font=font, fill=(246, 241, 231))
    out.paste(plate, (x1, y1))
    return out


def scrub_contacts_with_ocr(im: Image.Image, ocr_engine: Any, light_bg: bool = False) -> Image.Image:
    arr = np.array(im.convert("RGB"))
    res, _ = ocr_engine(arr)
    boxes: list[tuple[int, int, int, int]] = []
    if res:
        for poly, txt, _ in res:
            norm = re.sub(r"\s+", " ", str(txt)).strip()
            compact = re.sub(r"\s+", "", norm)
            if "nightlifemilan" in compact.lower() or "3519127047" in compact:
                continue
            if THIRD_PARTY_CONTACT_RE.search(norm) or THIRD_PARTY_CONTACT_RE.search(compact):
                xs = [int(p[0]) for p in poly]
                ys = [int(p[1]) for p in poly]
                boxes.append((min(xs), min(ys), max(xs), max(ys)))
    if not boxes:
        return im
    boxes.sort(key=lambda b: b[1])
    merged: list[list[int]] = []
    for b in boxes:
        if merged and b[1] <= merged[-1][3] + 24:
            merged[-1][0] = min(merged[-1][0], b[0])
            merged[-1][1] = min(merged[-1][1], b[1])
            merged[-1][2] = max(merged[-1][2], b[2])
            merged[-1][3] = max(merged[-1][3], b[3])
        else:
            merged.append(list(b))
    for mb in merged:
        im = apply_opaque_contact_plate(im, (mb[0], mb[1], mb[2], mb[3]), light_bg=light_bg)
    return im


def build_editorial_poster(
    src_path: Path,
    out_path: Path,
    eyebrow: str,
    title: str,
    sub: str,
    date_line: str,
    wa_glyph: Image.Image,
    ocr_engine: Any | None = None,
    sold_out_badge: bool = False,
) -> None:
    src_im = Image.open(src_path).convert("RGB")
    if str(src_path).startswith(str(REPO_ROOT / "public")):
        src_im = src_im.crop((0, 0, src_im.width, int(src_im.height * 0.85)))
    if ocr_engine is not None:
        src_im = scrub_contacts_with_ocr(src_im, ocr_engine, light_bg=False)
    base = fit_cover(src_im, 1376, 714, anchor_y=0.45)
    base = soft_compress_highlights(base, knee=218.0, ceiling=242.0)
    base = ImageEnhance.Contrast(base).enhance(1.06)

    rgba = base.convert("RGBA")
    W, H = rgba.size
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(0, 145):
        a = int(round(180 * (1.0 - y / 145.0) ** 1.25))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    for y in range(H - 255, H):
        t = (y - (H - 255)) / 255.0
        a = int(round(225 * (t ** 1.2)))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    rgba = Image.alpha_composite(rgba, scrim)

    draw = ImageDraw.Draw(rgba)

    if sold_out_badge:
        f_so = ImageFont.truetype(str(FONT_BOLD_PATH), 22)
        so_txt = "SOLD OUT · CAPODANNO 2027"
        so_w, _ = measure_tracked_text(so_txt, f_so, 2.2)
        bx1 = (W - so_w) / 2.0 - 28
        bx2 = (W + so_w) / 2.0 + 28
        draw.rectangle([(bx1, 68), (bx2, 110)], fill=(120, 62, 10, 240), outline=(245, 195, 92, 255), width=2)
        draw_tracked_text(draw, (W - so_w) / 2.0, 77, so_txt, f_so, 2.2, (255, 244, 214, 255))

    f_eyebrow = ImageFont.truetype(str(FONT_BOLD_PATH), 19)
    title_size = 38 if len(title) > 33 else (46 if len(title) > 27 else 54)
    f_title = ImageFont.truetype(str(FONT_BOLD_PATH), title_size)
    f_sub = ImageFont.truetype(str(FONT_BOLD_PATH), 20)
    f_date = ImageFont.truetype(str(FONT_BOLD_PATH), 17)

    ew, _ = measure_tracked_text(eyebrow, f_eyebrow, 2.6)
    draw_tracked_text(draw, (W - ew) / 2.0, 34, eyebrow, f_eyebrow, 2.6, (230, 198, 134, 255))

    tw, _ = measure_tracked_text(title, f_title, 1.8)
    draw_tracked_text(draw, (W - tw) / 2.0, H - 180, title, f_title, 1.8, (250, 246, 238, 255))

    sw, _ = measure_tracked_text(sub, f_sub, 1.0)
    draw_tracked_text(draw, (W - sw) / 2.0, H - 108, sub, f_sub, 1.0, (226, 194, 132, 255))

    dw, _ = measure_tracked_text(date_line, f_date, 1.4)
    draw_tracked_text(draw, (W - dw) / 2.0, H - 64, date_line, f_date, 1.4, (238, 232, 220, 240))

    card = compose_couture_noir_card(rgba.convert("RGB"), wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=270_000)
    out_path.write_bytes(raw)
    print(f"POSTER OK: {out_path.name} ({card.size[0]}x{card.size[1]}, {len(raw)//1024} KB)")


def render_pdf_menu_card(
    pdf_path: Path,
    out_path: Path,
    header_label: str,
    wa_glyph: Image.Image,
    ocr_engine: Any,
    mask_bottom_frac: float = 0.0,
) -> None:
    """Render 1 or 2 PDF pages cleanly onto a Couture Noir 1376x768 plate (zero cv2)."""
    doc = pymupdf.open(pdf_path)
    pages_im: list[Image.Image] = []
    for p in list(doc)[:2]:
        pix = p.get_pixmap(dpi=160, alpha=False)
        pim = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        if mask_bottom_frac > 0.0:
            pw, ph = pim.size
            y_cut = int(round(ph * (1.0 - mask_bottom_frac)))
            # Sample corner color of bottom area
            bg = tuple(int(v) for v in np.median(np.array(pim)[y_cut - 10:y_cut, 10:pw - 10].reshape(-1, 3), axis=0))
            d = ImageDraw.Draw(pim)
            d.rectangle([(0, y_cut), (pw, ph)], fill=bg)
        pim = scrub_contacts_with_ocr(pim, ocr_engine, light_bg=True)
        pages_im.append(pim)

    W, H_art = 1376, 714
    canvas = Image.new("RGB", (W, H_art), (8, 8, 11))
    draw = ImageDraw.Draw(canvas)
    f_hdr = ImageFont.truetype(str(FONT_BOLD_PATH), 18)
    hw, _ = measure_tracked_text(header_label, f_hdr, 2.2)
    draw_tracked_text(draw, (W - hw) / 2.0, 26, header_label, f_hdr, 2.2, (230, 198, 134, 255))

    top_y, bot_y = 60, H_art - 24
    avail_h = bot_y - top_y
    if len(pages_im) == 1:
        pim = pages_im[0]
        scale = avail_h / pim.height
        nw = int(round(pim.width * scale))
        nh = avail_h
        if nw > W - 80:
            scale = (W - 80) / pim.width
            nw = W - 80
            nh = int(round(pim.height * scale))
        pim = pim.resize((nw, nh), Image.Resampling.LANCZOS)
        x0 = (W - nw) // 2
        y0 = top_y + (avail_h - nh) // 2
        canvas.paste(pim, (x0, y0))
        draw.rectangle([(x0 - 1, y0 - 1), (x0 + nw, y0 + nh)], outline=(198, 168, 108), width=1)
    else:
        gap = 28
        max_w_each = (W - 96 - gap) // 2
        scaled: list[Image.Image] = []
        for pim in pages_im:
            s = min(max_w_each / pim.width, avail_h / pim.height)
            scaled.append(pim.resize((int(round(pim.width * s)), int(round(pim.height * s))), Image.Resampling.LANCZOS))
        total_w = scaled[0].width + gap + scaled[1].width
        x_cur = (W - total_w) // 2
        for pim in scaled:
            y0 = top_y + (avail_h - pim.height) // 2
            canvas.paste(pim, (x_cur, y0))
            draw.rectangle([(x_cur - 1, y0 - 1), (x_cur + pim.width, y0 + pim.height)], outline=(198, 168, 108), width=1)
            x_cur += pim.width + gap

    card = compose_couture_noir_card(canvas, wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=265_000)
    out_path.write_bytes(raw)
    print(f"MENU CARD OK: {out_path.name} ({card.size[0]}x{card.size[1]}, {len(raw)//1024} KB)")


def save_master_webp(src_path: Path, out_path: Path, ocr_engine: Any | None = None, anchor_y: float = 0.48) -> None:
    im = Image.open(src_path).convert("RGB")
    if ocr_engine is not None:
        im = scrub_contacts_with_ocr(im, ocr_engine, light_bg=False)
    im = fit_cover(im, 1920, 1080, anchor_y=anchor_y)
    im = soft_compress_highlights(im, knee=212.0, ceiling=238.0)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, format="WEBP", quality=86, method=6)
    print(f"MASTER OK: {out_path.name} ({im.size[0]}x{im.size[1]}, {out_path.stat().st_size//1024} KB)")


def build_contact_sheet(items: list[tuple[str, Path]], out_jpg: Path) -> None:
    cols = 4
    tw, th = 340, 190
    pad = 16
    rows = (len(items) + cols - 1) // cols
    W = cols * tw + (cols + 1) * pad
    H = rows * (th + 30) + pad
    sheet = Image.new("RGB", (W, H), (14, 14, 18))
    draw = ImageDraw.Draw(sheet)
    f = ImageFont.truetype(str(FONT_BOLD_PATH), 13)
    for idx, (label, path) in enumerate(items):
        r, c = divmod(idx, cols)
        x = pad + c * (tw + pad)
        y = pad + r * (th + 30)
        if path.exists():
            im = fit_cover(Image.open(path), tw, th)
            sheet.paste(im, (x, y))
        draw.rectangle([(x, y), (x + tw - 1, y + th - 1)], outline=(198, 168, 108), width=1)
        draw.text((x + 4, y + th + 4), label[:42], font=f, fill=(246, 241, 231))
    out_jpg.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out_jpg, format="JPEG", quality=88)
    print(f"CONTACT SHEET OK: {out_jpg} ({W}x{H})")


def main() -> None:
    from rapidocr_onnxruntime import RapidOCR

    ocr = RapidOCR()
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")

    poster_dir = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-posters"
    master_dir = REPO_ROOT / "public" / "images" / "seo-events" / "master"
    menu_dir = REPO_ROOT / "public" / "images" / "events" / "t031-menus"

    # 1. Official downloads (all strict HTTP 200 canonical URLs)
    urls: dict[str, tuple[str, str]] = {
        # ATMosfera Tram (official atm.it)
        "atm_01": ("atm_interno.jpg", "https://www.atm.it/it/AltriServizi/TempoLibero/PublishingImages/ATMosfera_interno_800x536.jpg"),
        "atm_02": ("atm_tavolo.jpg", "https://www.atm.it/it/AltriServizi/TempoLibero/PublishingImages/ATMosfera_tavolo_800x536.jpg"),
        "atm_03": ("atm_bicchieri.jpg", "https://www.atm.it/it/AltriServizi/TempoLibero/PublishingImages/ATMosfera_tavolobicchieri_800x536.jpg"),
        "atm_04": ("atm_mini1.jpg", "https://www.atm.it/it/AltriServizi/TempoLibero/PublishingImages/mini_atmosfera1.jpg"),
        # Armani/Privé Milano (official assets.armani.com)
        "armani_01": ("armani_01.jpg", "https://assets.armani.com/image/upload/v1725439781/Armani_Prive_Club_Milano.jpg"),
        "armani_02": ("armani_02.jpg", "https://assets.armani.com/image/upload/v1725439793/Armani_Prive_Club_Milano_2.jpg"),
        "armani_03": ("armani_03.webp", "https://assets.armani.com/image/upload/v1724157291/Armani_Clubs_2555x1437.webp"),
        # Teatro Manzoni + Fioraio Bianchi Bistrot (real hall, stage & dining photos, ZERO crests)
        "manzoni_show_w": ("manzoni_show_wide.jpg", "https://www.teatromanzoni.it/storage/2026/06/1920X680-Sfumaturaok.jpg"),
        "manzoni_stage": ("manzoni_stage_hall.jpg", "https://www.teatromanzoni.it/storage/2022/07/a165510361-5082c479-283c-476e-96c3-1be9aaa741d6.jpg"),
        "manzoni_dining": ("manzoni_bistrot_table.jpg", "https://www.teatromanzoni.it/storage/2023/10/1600x1000bis.jpg"),
        "fioraio_bistrot": ("fioraio_bistrot.jpg", "https://www.fioraiobianchicaffe.it/wp-content/uploads/2026/07/DSCF3984-768x1152.jpg"),
        # Teatro Lirico Giorgio Gaber + MENU PDF (canonical 2024 stage & hall photography, zero COVID masks/promo text)
        "lirico_stage_gala": ("lirico_stage_gala.jpg", "https://teatroliricogiorgiogaber.it/wp-content/uploads/2024/08/Mediobanca-Premiere-cena-su-palco.jpg"),
        "lirico_hall": ("lirico_hall.jpeg", "https://teatroliricogiorgiogaber.it/wp-content/uploads/2021/10/TL_Sito_Large_1600x580_3.jpeg"),
        "lirico_sala1": ("lirico_sala1.jpg", "https://teatroliricogiorgiogaber.it/wp-content/uploads/2024/08/cena-placee-sala-polivalente-1.jpg"),
        "lirico_sala2": ("lirico_sala2.jpg", "https://teatroliricogiorgiogaber.it/wp-content/uploads/2024/08/cena-placee-sala-polivalente-2.jpg"),
        "lirico_pdf": ("MENU-CAPODANNO-TEATRO.pdf", "https://esf2ihwfkqm.exactdn.com/wp-content/uploads/2026/10/MENU-CAPODANNO-TEATRO.pdf"),
        # Teatro Nazionale (Sister Act Il Musical - verified stage photography, zero promo URLs)
        "naz_01": ("sister_act_ant0306.jpg", "https://teatronazionale.it/wp-content/uploads/2026/06/SISTER-ACT_ANT_0306-copia.jpg"),
        "naz_02": ("sister_act_ant0928.jpg", "https://teatronazionale.it/wp-content/uploads/2026/06/SISTER-ACT_ANT_0928-copia.jpg"),
        "naz_03": ("sister_act_scene2.jpg", "https://teatronazionale.it/wp-content/uploads/2026/06/SISTER-ACT_GEN_0838-copia.jpg"),
        "naz_04": ("sister_act_scene3.jpg", "https://teatronazionale.it/wp-content/uploads/2026/06/SISTER-ACT_GEN_0959-copia.jpg"),
        # Palace Grand Hotel Varese
        "pv_01": ("palace_varese_01.jpg", "https://www.palacevarese.com/static/7efd96200440fa810c484ed528480f9a/0304f/168463fb-2def-4d09-8df1-ef503b2b3c10.jpg"),
        "pv_02": ("palace_varese_02.jpg", "https://www.palacevarese.com/static/50bf756bae952f001bfadb7e718cfc19/2703c/0ca81f06-dd58-419e-a1af-6763dd6800b8.jpg"),
        "pv_03": ("palace_varese_03.jpg", "https://www.palacevarese.com/static/6e9891ac322aedef1f226131c75c2d4b/0304f/077cbbb5-f223-40fa-9db5-a45eab30141c.jpg"),
        "pv_04": ("palace_varese_04.jpg", "https://www.palacevarese.com/static/0a0d4018237f9e0d3462d22d8ee516a9/8ee93/12cb07c2-326e-4b07-9e99-1237668da4a5.jpg"),
    }

    dl: dict[str, Path] = {}
    for k, (fn, u) in urls.items():
        dl[k] = download_binary(fn, u)

    # Local verified clean photo sources (text-free photography ONLY)
    local_radio_bar = REPO_ROOT / "public" / "images" / "venues" / "editorial" / "radio-rooftop-bar-milano.webp"
    local_radio_alt = master_dir / "radio-rooftop.webp"
    local_stk_3 = master_dir / "stk-milan-real-03.webp"
    local_stk_4 = master_dir / "stk-milan-real-04.webp"
    local_armani = REPO_ROOT / "public" / "images" / "armani-prive-milano.webp"
    local_church81 = REPO_ROOT / "public" / "images" / "venues" / "church-81" / "church-81-interior-01.webp"
    local_clubroom = REPO_ROOT / "public" / "images" / "venues" / "11-clubroom" / "11-clubroom-interior-01.webp"
    local_t21 = REPO_ROOT / "public" / "images" / "venues" / "terrazza-21" / "terrazza-21-interior-04.webp"
    local_fiftyfive_bar = master_dir / "fiftyfive-milano-bar-01.webp"
    local_navigli_canal = REPO_ROOT / "public" / "images" / "milan-navigli-nightlife-canal-bars.webp"

    # 2. Build 1920x1080 SEO gallery masters directly inside public/images/seo-events/master/
    save_master_webp(local_radio_bar, master_dir / "radio-rooftop-real-01.webp")
    save_master_webp(local_radio_alt, master_dir / "radio-rooftop-real-02.webp")
    save_master_webp(local_stk_3, master_dir / "radio-rooftop-real-03.webp")
    save_master_webp(local_stk_4, master_dir / "radio-rooftop-real-04.webp")

    save_master_webp(dl["atm_01"], master_dir / "atmosfera-real-01.webp")
    save_master_webp(dl["atm_02"], master_dir / "atmosfera-real-02.webp")
    save_master_webp(dl["atm_03"], master_dir / "atmosfera-real-03.webp")
    save_master_webp(dl["atm_04"], master_dir / "atmosfera-real-04.webp")

    save_master_webp(dl["armani_01"], master_dir / "armani-prive-real-01.webp")
    save_master_webp(dl["armani_02"], master_dir / "armani-prive-real-02.webp")
    save_master_webp(dl["armani_03"], master_dir / "armani-prive-real-03.webp")
    save_master_webp(local_armani, master_dir / "armani-prive-real-04.webp")

    save_master_webp(dl["manzoni_show_w"], master_dir / "teatro-manzoni-real-01.webp", ocr_engine=ocr)
    save_master_webp(dl["manzoni_stage"], master_dir / "teatro-manzoni-real-02.webp", anchor_y=0.48)
    save_master_webp(dl["manzoni_dining"], master_dir / "teatro-manzoni-real-03.webp", anchor_y=0.45)
    save_master_webp(dl["fioraio_bistrot"], master_dir / "teatro-manzoni-real-04.webp", anchor_y=0.40)

    save_master_webp(dl["lirico_stage_gala"], master_dir / "teatro-lirico-real-01.webp")
    save_master_webp(dl["lirico_hall"], master_dir / "teatro-lirico-real-02.webp")
    save_master_webp(dl["lirico_sala1"], master_dir / "teatro-lirico-real-03.webp")
    save_master_webp(dl["lirico_sala2"], master_dir / "teatro-lirico-real-04.webp")

    save_master_webp(dl["naz_01"], master_dir / "teatro-nazionale-real-01.webp")
    save_master_webp(dl["naz_02"], master_dir / "teatro-nazionale-real-02.webp")
    save_master_webp(dl["naz_03"], master_dir / "teatro-nazionale-real-03.webp")
    save_master_webp(dl["naz_04"], master_dir / "teatro-nazionale-real-04.webp")

    save_master_webp(dl["pv_01"], master_dir / "palace-varese-real-01.webp")
    save_master_webp(dl["pv_02"], master_dir / "palace-varese-real-02.webp")
    save_master_webp(dl["pv_03"], master_dir / "palace-varese-real-03.webp")
    save_master_webp(dl["pv_04"], master_dir / "palace-varese-real-04.webp")

    # BackDoor43 clean dark speakeasy cocktail lounge photography (no posters!)
    speakeasy_sources = [local_church81, local_clubroom, local_t21, local_fiftyfive_bar]
    for idx, src_p in enumerate(speakeasy_sources, 1):
        assert src_p.exists(), f"Missing clean BackDoor43 source: {src_p}"
        save_master_webp(src_p, master_dir / f"backdoor43-real-0{idx}.webp")

    # 3. Render 5 PDF Menus to 1376x768 bonified WebPs
    menu_jobs = [
        (EMAIL_MAT_DIR / "stk-radio-rooftop" / "Menu STK Milan NYE 2027.pdf",
         menu_dir / "menu-stk-milan-nye-2027.webp",
         "STK MILAN · OFFICIAL NYE 2027 SPECIAL A LA CARTE MENU"),
        (EMAIL_MAT_DIR / "stk-radio-rooftop" / "Menu RADIO Rooftop NYE 2027.pdf",
         menu_dir / "menu-radio-rooftop-nye-2027.webp",
         "RADIO ROOFTOP MILAN · OFFICIAL NYE 2027 TASTING MENU"),
        (EMAIL_MAT_DIR / "hotel-barchetta-excelsior-como" / "Menu_Capodanno_ITA.pdf",
         menu_dir / "menu-barchetta-como-nye-2027.webp",
         "HOTEL BARCHETTA EXCELSIOR COMO · CENONE SAN SILVESTRO 175 EUR"),
        (EMAIL_MAT_DIR / "albergo-terminus-como" / "BardelleTerme_MenuSSilvestro_ITA.pdf",
         menu_dir / "menu-terminus-como-nye-2027.webp",
         "ALBERGO TERMINUS COMO · BAR DELLE TERME NYE 240 EUR"),
        (dl["lirico_pdf"],
         menu_dir / "menu-teatro-lirico-buffet-nye-2027.webp",
         "TEATRO LIRICO GIORGIO GABER · MENU PRE-SHOW CAPODANNO 55 EUR"),
    ]
    menu_outputs: list[tuple[str, Path]] = []
    for pdf_p, out_p, hdr in menu_jobs:
        assert pdf_p.exists(), f"Missing PDF menu: {pdf_p}"
        render_pdf_menu_card(pdf_p, out_p, hdr, wa_glyph, ocr)
        menu_outputs.append((out_p.stem, out_p))

    # 4. Build 5 NEW Posters + 4 Refreshed Posters + 9 Cleanly Rebuilt SOLD OUT Posters (zero double-borders)
    all_posters: list[tuple[str, Path, str, str, str, str, bool]] = [
        (
            "capodanno-backdoor43-milano",
            local_church81,
            "RIPA DI PORTA TICINESE 43 · NAVIGLI · MILANO",
            "BACKDOOR43 · SOLD OUT",
            "CAPODANNO 2027 SOLD OUT · CHIUSO 30 DICEMBRE – 1 GENNAIO",
            "ALTERNATIVE APERTE CONFERMATE: TERRAZZA DUOMO 21, RADIO ROOFTOP & VOYA",
            True,
        ),
        (
            "capodanno-palace-grand-hotel-varese",
            dl["pv_01"],
            "VIA LUCIANO MANARA 11 · VARESE · AVVISO DISPONIBILITA",
            "PALACE GRAND HOTEL VARESE · SOLD OUT",
            "CHIUSURA PER RESTAURO · RIAPERTURA PREVISTA MAGGIO 2027",
            "ALTERNATIVE LAGO APERTE: BARCHETTA EXCELSIOR (175€) & TERMINUS (240€)",
            True,
        ),
        (
            "capodanno-teatro-manzoni-milano",
            dl["manzoni_show_w"],
            "VIA ALESSANDRO MANZONI 42 · MILANO · 31 DICEMBRE",
            "TEATRO MANZONI · NYE 2027",
            "VINCENZO SALEMME «...E FUORI NEVICA» · ORE 17:00 & 21:30",
            "SPETTACOLO 40€–130€ · CENA BISTROT FIORAIO BIANCHI ORE 20:00 (100€)",
            False,
        ),
        (
            "capodanno-teatro-lirico-giorgio-gaber-milano",
            dl["lirico_stage_gala"],
            "VIA LARGA 14 · DUOMO MILANO · CAPODANNO A TEATRO",
            "TEATRO LIRICO GABER · NYE 2027",
            "A CHRISTMAS CAROL CON ROBERTO CIUFOLI · 46€–90€",
            "BUFFET PRE-SHOW OPZIONALE CON 2 DRINK 55€ · SERATA 31 DICEMBRE",
            False,
        ),
        (
            "capodanno-teatro-nazionale-milano",
            dl["naz_04"],
            "PIAZZA PIEMONTE · VIA GIORDANO ROTA 1 · MILANO",
            "TEATRO NAZIONALE · NYE 2027",
            "SISTER ACT IL MUSICAL · REPLICA SPECIALE ORE 21:00 CON BRINDISI",
            "31 DICEMBRE 2026  ·  GALLERIA 100€ · POLTRONA 120€ · VIP 150€",
            False,
        ),
        # 4 Refreshed Posters
        (
            "capodanno-radio-rooftop-milano",
            local_radio_bar,
            "VIA MARCO POLO 18 · 10° PIANO ME MILAN IL DUCA",
            "RADIO ROOFTOP MILAN · NYE 2027",
            "MINIMO DI SPESA 200€ · FOOD & BEVERAGE O SOLO BEVERAGE",
            "31 DICEMBRE 2026  ·  ACCESSO 20:00–22:30  ·  DJ SET DALLE 21:00",
            False,
        ),
        (
            "capodanno-tram-storico-milano-atmosfera",
            dl["atm_01"],
            "PIAZZA CASTELLO 2 · MILANO CENTRO · TRAM ATMOSFERA",
            "ATMOSFERA TRAM · NYE 2027",
            "1° TURNO 19:00 (130€) · 2° TURNO MEZZANOTTE 22:45 (150€)",
            "31 DICEMBRE 2026  ·  CENONE ITINERANTE CARNE, PESCE O VEGETARIANO",
            False,
        ),
        (
            "capodanno-armani-prive-milano",
            dl["armani_01"],
            "VIA GASTONE PISONI 3 · QUADRILATERO DELLA MODA · MILANO",
            "ARMANI/PRIVÉ MILANO · NYE 2027",
            "QUADRILATERO DELLA MODA · PROGRAMMA IN DEFINIZIONE",
            "31 DICEMBRE 2026  ·  LISTA D'ATTESA PRIORITARIA CONCIERGE",
            False,
        ),
        (
            "capodanno-teatro-milano-lirico-manzoni-nazionale-carcano",
            dl["manzoni_stage"],
            "MILANO CENTRO · CARCANO, LIRICO GABER, MANZONI, NAZIONALE",
            "TEATRI DI MILANO · NYE 2027",
            "GIOELE DIX 84€ · A CHRISTMAS CAROL 46–90€ · SALEMME · SISTER ACT",
            "31 DICEMBRE 2026  ·  SPETTACOLI DI CAPODANNO E CENE BISTROT",
            False,
        ),
        # 9 Previously CLOSED venues rebuilt cleanly with SOLD OUT badge from real text-free photography
        (
            "capodanno-ceresio-7-milano",
            master_dir / "ceresio-7-interior-01.webp",
            "VIA CERESIO 7 · PORTA VOLTA · MILANO · AVVISO DISPONIBILITA",
            "CERESIO 7 MILANO · SOLD OUT",
            "CHIUSO 31 DICEMBRE – 3 GENNAIO · RIAPRE IL 4 GENNAIO 2027",
            "ALTERNATIVE ROOFTOP APERTE: TERRAZZA DUOMO 21, VOYA & RADIO ROOFTOP",
            True,
        ),
        (
            "capodanno-fabrique-milano",
            master_dir / "fabrique-milano.webp",
            "VIA GAUDENZIO FANTOLI 9 · MILANO · AVVISO DISPONIBILITA",
            "FABRIQUE MILANO · SOLD OUT",
            "NESSUN EVENTO IN PROGRAMMA PER LA NOTTE DI CAPODANNO 2027",
            "ALTERNATIVE CONFERMATE: GATE MILANO, REPVBLIC & PINETA MILANO",
            True,
        ),
        (
            "capodanno-base-milano-tortona",
            master_dir / "base-milano.webp",
            "VIA BERGOGNONE 34 · TORTONA · MILANO · AVVISO DISPONIBILITA",
            "BASE MILANO · SOLD OUT",
            "CHIUSURA INVERNALE 23 DICEMBRE – 6 GENNAIO 2027",
            "ALTERNATIVE CONFERMATE: BOBINO MILANO, BISCHERI & REPVBLIC MILANO",
            True,
        ),
        (
            "capodanno-live-club-trezzo-milano",
            master_dir / "live-club-trezzo.webp",
            "VIA MAZZINI 58 · TREZZO SULL'ADDA (MI) · AVVISO DISPONIBILITA",
            "LIVE CLUB TREZZO · SOLD OUT",
            "CHIUSO PER LA NOTTE DI SAN SILVESTRO 2026/2027",
            "ALTERNATIVE CONFERMATE: PINETA MILANO, BOBINO & GATE MILANO",
            True,
        ),
        (
            "capodanno-bloom-mezzago-brianza",
            master_dir / "bloom-mezzago.webp",
            "VIA CURIEL 39 · MEZZAGO (MB) · AVVISO DISPONIBILITA",
            "BLOOM MEZZAGO · SOLD OUT",
            "CHIUSO PER CAPODANNO 2027 · CONFERMA UFFICIALE DEL LOCALE",
            "ALTERNATIVE CONFERMATE: PINETA MILANO, BOBINO & GATE MILANO",
            True,
        ),
        (
            "capodanno-hotel-principe-di-savoia-milano",
            master_dir / "capodanno-elegante-hotel-villa-flow-01.webp",
            "PIAZZA DELLA REPUBBLICA 17 · MILANO · AVVISO DISPONIBILITA",
            "PRINCIPE DI SAVOIA · SOLD OUT",
            "CHIUSO PER RESTAURO DAL 28 DICEMBRE 2026",
            "ALTERNATIVE GALA APERTE: TERRAZZA DUOMO 21, VOYA ROOFTOP & STK MILAN",
            True,
        ),
        (
            "capodanno-spirit-de-milan",
            master_dir / "spirit-de-milan.webp",
            "VIA BOVISASCA 59 · MILANO · AVVISO DISPONIBILITA",
            "SPIRIT DE MILAN · SOLD OUT",
            "SEDE STORICA CHIUSA · NESSUNA SERATA SAN SILVESTRO 2027",
            "ALTERNATIVE LIVE CONFERMATE: BISCHERI MILANO, BOBINO & PINETA",
            True,
        ),
        (
            "capodanno-molto-club-milano",
            master_dir / "molto-carate-brianza.webp",
            "VIA DELLA VALLE 71 · CARATE BRIANZA (MB) · AVVISO DISPONIBILITA",
            "MOLTO CLUB · SOLD OUT",
            "LOCATION ESTIVA CHIUSA PER LA STAGIONE INVERNALE",
            "ALTERNATIVE CONFERMATE: PINETA MILANO, BOBINO & REPVBLIC MILANO",
            True,
        ),
        (
            "capodanno-battello-navigli-darsena-milano",
            local_navigli_canal,
            "ALZAIA NAVIGLIO GRANDE 4 · DARSENA MILANO · AVVISO DISPONIBILITA",
            "BATTELLO NAVIGLI · SOLD OUT",
            "NESSUNA CROCIERA DI SAN SILVESTRO IN PROGRAMMA PER IL 31 DICEMBRE",
            "ALTERNATIVE CONFERMATE: ATMOSFERA TRAM (130€–150€), BISCHERI & BOBINO",
            True,
        ),
    ]

    poster_outputs: list[tuple[str, Path]] = []
    for slug, src_p, eyebrow, title, sub, date_line, is_so in all_posters:
        assert src_p.exists(), f"Missing poster photo for {slug}: {src_p}"
        out_p = poster_dir / f"{slug}.webp"
        build_editorial_poster(src_p, out_p, eyebrow, title, sub, date_line, wa_glyph, ocr_engine=ocr, sold_out_badge=is_so)
        poster_outputs.append((f"{slug} (SO)" if is_so else slug, out_p))

    # Also include Palace Hotel Como in contact sheet check
    poster_outputs.append(("palace-como (SO)", poster_dir / "capodanno-palace-hotel-como.webp"))

    build_contact_sheet(poster_outputs + menu_outputs, WORK_DIR / "tavola-t032-assets.jpg")


if __name__ == "__main__":
    main()
