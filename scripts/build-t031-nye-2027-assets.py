#!/usr/bin/env python3
"""Download & build 100% real-photography official assets & Couture Noir posters for T-031 NYE 2027.
Zero AI generation, zero inpainting (strict ban on PDE/magic eraser).
Any third-party contact detected by RapidOCR inside an official flyer is replaced in-place
with an opaque (alpha=255) 4-corner bilinear gradient editorial plate + Nightlife Milan contacts.
"""
from __future__ import annotations

import importlib.util
import re
import subprocess
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = Path(r"D:\nightlife-T031\media-raw")
RAW_DIR.mkdir(parents=True, exist_ok=True)

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

# 4 New Locations (editorial Couture Noir poster from real venue photography + 4 SEO master photos)
NEW_LOCATIONS: dict[str, dict[str, Any]] = {
    "capodanno-stk-milan": {
        "eyebrow": "PIAZZA DELLA REPUBBLICA 13 · ME MILAN IL DUCA",
        "title": "STK MILAN · NYE 2027",
        "sub": "STEAKHOUSE & LOUNGE · 2 TURNI · SPECIAL NYE MENU & LIVE DJ SET",
        "date_line": "31 DICEMBRE 2026  ·  PRIMO TURNO 19:00  ·  SECONDO TURNO 21:00 CON DJ SET",
        "poster_src": ("stk_01.jpg", "https://stksteakhouse.com/wp-content/uploads/2024/10/20240116-STK-Milano-ME-086.jpg"),
        "masters": [
            ("stk_01.jpg", "https://stksteakhouse.com/wp-content/uploads/2024/10/20240116-STK-Milano-ME-086.jpg", "stk-milan-real-01.webp"),
            ("stk_02.jpg", "https://stksteakhouse.com/wp-content/uploads/2024/10/20260507-4B5A8531-1.jpg", "stk-milan-real-02.webp"),
            ("stk_03.jpg", "https://stksteakhouse.com/wp-content/uploads/2025/09/20260508-4B5A9258-Edit-1-1-1024x631.jpg", "stk-milan-real-03.webp"),
            ("stk_04.jpg", "https://stksteakhouse.com/wp-content/uploads/2024/09/20240116-STK-Milano-ME-043.jpg", "stk-milan-real-04.webp"),
        ],
    },
    "capodanno-hotel-barchetta-excelsior-como": {
        "eyebrow": "PIAZZA CAVOUR 1 · LAGO DI COMO · RISTORANTE BISTRO",
        "title": "HOTEL BARCHETTA EXCELSIOR · NYE 2027",
        "sub": "CENONE DI GALA 5 PORTATE CON VINI DOCG & FUOCHI SUL LUNGOLAGO",
        "date_line": "31 DICEMBRE 2026  ·  APERITIVO, 5 PORTATE, FRANCIACORTA & SASSELLA DOCG",
        "poster_src": ("barchetta_01.jpg", "https://www.hotelbarchetta.it/wp-content/uploads/2024/07/1920_ristorante-bistro-1680x945.jpg"),
        "masters": [
            ("barchetta_01.jpg", "https://www.hotelbarchetta.it/wp-content/uploads/2024/07/1920_ristorante-bistro-1680x945.jpg", "barchetta-como-real-01.webp"),
            ("barchetta_02.jpg", "https://www.hotelbarchetta.it/wp-content/uploads/2024/07/1920_como-1680x945.jpg", "barchetta-como-real-02.webp"),
            ("barchetta_03.jpg", "https://www.hotelbarchetta.it/wp-content/uploads/2024/07/Barchetta_esterno-1680x1120.jpg", "barchetta-como-real-03.webp"),
            ("barchetta_04.jpg", "https://www.hotelbarchetta.it/wp-content/uploads/2024/07/1920_ristorante-bistro3-1680x945.jpg", "barchetta-como-real-04.webp"),
        ],
    },
    "capodanno-albergo-terminus-como": {
        "eyebrow": "LUNGO LARIO TRIESTE 14 · LAGO DI COMO · BAR DELLE TERME",
        "title": "ALBERGO TERMINUS · NYE 2027",
        "sub": "CENONE DI SAN SILVESTRO AL BAR DELLE TERME · VINI, LIVE MUSIC & FUOCHI",
        "date_line": "31 DICEMBRE 2026  ·  MENU 6 PORTATE, CA' DEL BOSCO & TERRAZZA SUL LAGO",
        "poster_src": ("terminus_01.webp", "https://albergoterminus.it/wp-content/uploads/2026/03/Albergo-Terminus-Bar-delle-Terme-Lago-di-Como.webp"),
        "masters": [
            ("terminus_01.webp", "https://albergoterminus.it/wp-content/uploads/2026/03/Albergo-Terminus-Bar-delle-Terme-Lago-di-Como.webp", "terminus-como-real-01.webp"),
            ("terminus_02.jpg", "https://albergoterminus.it/wp-content/uploads/2025/12/Capodanno-Terminus.jpg", "terminus-como-real-02.webp"),
            ("terminus_03.jpg", "https://albergoterminus.it/wp-content/uploads/2019/11/terminus-lake-como-bar-delle-terme-luxury.jpg", "terminus-como-real-03.webp"),
            ("terminus_04.jpg", "https://albergoterminus.it/wp-content/uploads/2019/11/terminus-lake-como-luxury.jpg", "terminus-como-real-04.webp"),
        ],
    },
    "capodanno-palace-hotel-como": {
        "eyebrow": "LUNGO LARIO TRIESTE 16 · LAGO DI COMO · AVVISO DISPONIBILITA",
        "title": "PALACE HOTEL COMO · SOLD OUT",
        "sub": "CAPODANNO 2027 ESAURITO · ALTERNATIVE UFFICIALI: BARCHETTA & TERMINUS",
        "date_line": "31 DICEMBRE 2026  ·  STRUTTURE DEL GRUPPO APERTE SUL LUNGOLAGO DI COMO",
        "poster_src": ("palace_01.jpg", "https://www.palacehotel.it/wp-content/uploads/2024/09/Capodanno-Palace.jpg"),
        "masters": [
            ("palace_01.jpg", "https://www.palacehotel.it/wp-content/uploads/2024/09/Capodanno-Palace.jpg", "palace-como-real-01.webp"),
            ("palace_02.jpg", "https://www.palacehotel.it/wp-content/uploads/2024/09/palace-hotel-new-year-dinner-1024x683.jpg", "palace-como-real-02.webp"),
            ("palace_03.jpg", "https://www.palacehotel.it/wp-content/uploads/2024/03/1024_sala-manzoni1.jpg", "palace-como-real-03.webp"),
            ("palace_04.jpg", "https://www.palacehotel.it/wp-content/uploads/2024/03/1024_esterno5.jpg", "palace-como-real-04.webp"),
        ],
    },
}

# Official 2027 flyers/photos for existing pages to refresh (bonified zero-gomma + Couture Noir)
OFFICIAL_POSTER_UPDATES: list[tuple[str, str, str]] = [
    ("capodanno-alcatraz-milano", "alcatraz_2027.jpg", "https://alcatrazmilano.it/wp-content/uploads/2026/10/the-big-countdown-45-V02-clock.jpg"),
    ("capodanno-black-hole-milano", "blackhole_2027.jpg", "https://www.blackholemilano.com/wp-content/uploads/2026/11/IMG_7446.jpeg"),
    ("capodanno-blue-note-milano-concerto-gospel-jazz", "bluenote_2027.jpg", "https://bluenotemilano.com/wp-content/uploads/2026/11/Capodanno-2.jpg"),
    ("capodanno-magazzini-generali-milano", "magazzini_2027.webp", "https://www.ticketnation.it/images/capodanno-2027-magazzini-generali.600x600.12347.webp"),
    ("capodanno-mib-milano-piazza-affari", "mib_2027.jpg", "https://www.mibmilano.com/upload/event/611794069520_INVITO10X20page0001.jpg"),
    ("capodanno-pelledoca-milano", "pelledoca_2027.png", "https://www.pelledoca.org/wp-content/uploads/2026/11/2.png"),
    ("capodanno-the-club-milano", "theclub_2027.png", "https://www.theclubmilano.com/upload/event/801794488227_COPERTINANewYearsEve20272.png"),
    ("capodanno-the-dome-milano", "thedome_2027.jpg", "https://thedomemilano.com/wp-content/uploads/2026/11/HT5A6212-1-scaled.jpg"),
    ("capodanno-teatro-alla-scala-milano", "scala_2027.jpg", "https://www.teatroallascala.org/static/upload/lo-/lo-schiaccianoci-header-desktop.jpg"),
    ("capodanno-terme-di-sirmione-aquaria-lago-di-garda", "sirmione_2027.jpg", "https://www.termedisirmione.com/wp-content/uploads/2025/11/SPA-New-Year-box-sito-eventi-1.jpg"),
    ("capodanno-mantova-mascara-all-music-vanita", "mascara_2027.jpg", "https://mascara.it/wp-content/uploads/2026/11/MASCARA_capodanno_2027.jpg"),
    ("capodanno-livigno-valtellina-stalet-kosmo-mottolino", "kosmo_2027.jpg", "https://www.mottolino.com/app/uploads/2024/11/CARD-CAPODANNO-2027.jpg"),
    ("capodanno-in-villa-borromeo-fenaroli-reale", "fenaroli_2027.jpg", "https://www.villafenaroli.it/wp-content/uploads/2026/09/Banner-Capodanno-villa.jpg"),
    ("capodanno-franciacorta-number-one-villa-fenaroli", "fenaroli_2027.jpg", "https://www.villafenaroli.it/wp-content/uploads/2026/09/Banner-Capodanno-villa.jpg"),
]

THIRD_PARTY_CONTACT_RE = re.compile(
    r"(?:www\.|\.com\b|\.it\b|\.org\b|\.net\b|\.eu\b|@|"
    r"\+?\s*39[\s.\-]*\d|02[\s.\-]*\d{5,}|03\d[\s.\-]*\d{5,}|"
    r"\b3[2-9]\d[\s.\-]*\d{3}[\s.\-]*\d{3,4}\b|"
    r"infoline|reservations|prenotazion|ticketone|ticketsms|dice\.fm|xceed|eventbrite|mailticket|"
    r"mibmilano|theclubmilano|pelledoca|mascara|blackhole|alcatraz|villafenaroli|bluenote|mottolino|termedisirmione|bobadilla)",
    re.I,
)


def download_file(fname: str, url: str) -> Path | None:
    dst = RAW_DIR / fname
    if dst.exists() and dst.stat().st_size > 4000:
        return dst
    r = subprocess.run(
        [
            "curl.exe", "-sL", "--max-time", "20",
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
            "-o", str(dst), url,
        ],
        capture_output=True,
    )
    if r.returncode != 0 or not dst.exists() or dst.stat().st_size < 4000:
        print(f"WARN: download failed for {fname} <- {url}")
        return None
    try:
        with Image.open(dst) as im:
            im.verify()
    except Exception as ex:
        print(f"WARN: invalid image {fname}: {ex}")
        dst.unlink(missing_ok=True)
        return None
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


def build_editorial_poster(src_path: Path, out_path: Path, cfg: dict[str, Any]) -> None:
    base = fit_cover(Image.open(src_path), 1376, 714, anchor_y=0.45)
    base = soft_compress_highlights(base, knee=218.0, ceiling=242.0)
    base = ImageEnhance.Contrast(base).enhance(1.06)

    rgba = base.convert("RGBA")
    W, H = rgba.size
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    for y in range(0, 145):
        a = int(round(175 * (1.0 - y / 145.0) ** 1.3))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    for y in range(H - 250, H):
        t = (y - (H - 250)) / 250.0
        a = int(round(220 * (t ** 1.25)))
        sd.line([(0, y), (W, y)], fill=(8, 8, 12, a))
    rgba = Image.alpha_composite(rgba, scrim)

    draw = ImageDraw.Draw(rgba)
    draw.rectangle([(18, 16), (W - 19, H - 17)], outline=(206, 174, 114, 150), width=1)

    f_eyebrow = ImageFont.truetype(str(FONT_BOLD_PATH), 20)
    title_size = 50 if len(cfg["title"]) > 28 else 56
    f_title = ImageFont.truetype(str(FONT_BOLD_PATH), title_size)
    f_sub = ImageFont.truetype(str(FONT_BOLD_PATH), 21)
    f_date = ImageFont.truetype(str(FONT_BOLD_PATH), 18)

    ew, _ = measure_tracked_text(cfg["eyebrow"], f_eyebrow, 2.8)
    draw_tracked_text(draw, (W - ew) / 2.0, 36, cfg["eyebrow"], f_eyebrow, 2.8, (230, 198, 134, 255))

    tw, _ = measure_tracked_text(cfg["title"], f_title, 2.0)
    draw_tracked_text(draw, (W - tw) / 2.0, H - 180, cfg["title"], f_title, 2.0, (250, 246, 238, 255))

    sw, _ = measure_tracked_text(cfg["sub"], f_sub, 1.1)
    draw_tracked_text(draw, (W - sw) / 2.0, H - 108, cfg["sub"], f_sub, 1.1, (226, 194, 132, 255))

    dw, _ = measure_tracked_text(cfg["date_line"], f_date, 1.6)
    draw_tracked_text(draw, (W - dw) / 2.0, H - 64, cfg["date_line"], f_date, 1.6, (238, 232, 220, 240))

    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    card = compose_couture_noir_card(rgba.convert("RGB"), wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=270_000)
    out_path.write_bytes(raw)
    print(f"NEW POSTER OK: {out_path.name} ({card.size[0]}x{card.size[1]}, {len(raw)//1024} KB)")


def apply_opaque_contact_plate(im: Image.Image, box: tuple[int, int, int, int], wa_glyph: Image.Image) -> Image.Image:
    """Replace third-party contact block in-place using 100% opaque (alpha=255) 4-corner bilinear gradient plate."""
    W, H = im.size
    x1, y1, x2, y2 = box
    x1 = max(0, x1 - 18)
    y1 = max(0, y1 - 8)
    x2 = min(W, x2 + 18)
    y2 = min(H, y2 + 8)
    pw, ph = x2 - x1, y2 - y1
    if pw < 20 or ph < 12:
        return im

    arr = np.array(im.convert("RGB"), dtype=np.float32)
    def sample_corner(cx: int, cy: int) -> np.ndarray:
        sx1, sx2 = max(0, cx - 5), min(W, cx + 5)
        sy1, sy2 = max(0, cy - 5), min(H, cy + 5)
        patch = arr[sy1:sy2, sx1:sx2]
        med = np.median(patch.reshape(-1, 3), axis=0) if patch.size else np.array([14.0, 14.0, 18.0])
        lum = 0.299 * med[0] + 0.587 * med[1] + 0.114 * med[2]
        target_lum = float(np.clip(lum, 10.0, 22.0))
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
    draw = ImageDraw.Draw(plate)
    draw.rectangle([(0, 0), (pw - 1, ph - 1)], outline=(198, 168, 108), width=1)

    # Write clean Nightlife Milan contacts inside plate if plate is tall/wide enough
    if pw >= 180 and ph >= 32:
        f_sz = max(11, min(22, int(ph * 0.34)))
        font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
        line1 = "RESERVATIONS +39 351 912 7047"
        line2 = "WWW.NIGHTLIFEMILAN.COM"
        while f_sz > 10 and draw.textlength(line1, font=font) > pw - 20:
            f_sz -= 1
            font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
        w1 = draw.textlength(line1, font=font)
        w2 = draw.textlength(line2, font=font)
        if ph >= f_sz * 2 + 12:
            y_top = (ph - (f_sz * 2 + 4)) // 2
            draw.text(((pw - w1) / 2, y_top), line1, font=font, fill=(246, 241, 231))
            draw.text(((pw - w2) / 2, y_top + f_sz + 4), line2, font=font, fill=(214, 182, 118))
        else:
            draw.text(((pw - w1) / 2, (ph - f_sz) / 2), line1, font=font, fill=(246, 241, 231))
    elif pw >= 110 and ph >= 20:
        f_sz = max(10, min(16, int(ph * 0.55)))
        font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
        txt = "WWW.NIGHTLIFEMILAN.COM"
        while f_sz > 8 and draw.textlength(txt, font=font) > pw - 10:
            f_sz -= 1
            font = ImageFont.truetype(str(FONT_BOLD_PATH), f_sz)
        wt = draw.textlength(txt, font=font)
        draw.text(((pw - wt) / 2, (ph - f_sz) / 2), txt, font=font, fill=(246, 241, 231))

    out.paste(plate, (x1, y1))
    return out


def bonify_official_flyer(src_path: Path, out_path: Path, ocr_engine: Any, wa_glyph: Image.Image) -> None:
    im = Image.open(src_path).convert("RGB")
    arr = np.array(im)
    res, _ = ocr_engine(arr)
    boxes: list[tuple[int, int, int, int]] = []
    if res:
        for poly, txt, _score in res:
            norm = re.sub(r"\s+", " ", str(txt)).strip()
            compact = re.sub(r"\s+", "", norm)
            if "nightlifemilan" in compact.lower() or "3519127047" in compact:
                continue
            if THIRD_PARTY_CONTACT_RE.search(norm) or THIRD_PARTY_CONTACT_RE.search(compact):
                xs = [int(p[0]) for p in poly]
                ys = [int(p[1]) for p in poly]
                boxes.append((min(xs), min(ys), max(xs), max(ys)))

    if boxes:
        # Merge overlapping/nearby vertical boxes into clean horizontal bands
        boxes.sort(key=lambda b: b[1])
        merged: list[list[int]] = []
        for b in boxes:
            if merged and b[1] <= merged[-1][3] + 28:
                merged[-1][0] = min(merged[-1][0], b[0])
                merged[-1][1] = min(merged[-1][1], b[1])
                merged[-1][2] = max(merged[-1][2], b[2])
                merged[-1][3] = max(merged[-1][3], b[3])
            else:
                merged.append(list(b))
        for mb in merged:
            im = apply_opaque_contact_plate(im, (mb[0], mb[1], mb[2], mb[3]), wa_glyph)
        print(f"  [Group A] {out_path.name}: replaced {len(merged)} third-party contact block(s) in-place")
    else:
        print(f"  [Group B] {out_path.name}: clean artwork preserved bit-for-bit")

    card = compose_couture_noir_card(im, wa_glyph)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    raw = encode_webp_under_budget(card, max_bytes=270_000)
    out_path.write_bytes(raw)
    print(f"FLYER OK: {out_path.name} ({card.size[0]}x{card.size[1]}, {len(raw)//1024} KB)")


def save_master_webp(src_path: Path, out_path: Path) -> None:
    im = fit_cover(Image.open(src_path), 1920, 1080, anchor_y=0.48)
    im = soft_compress_highlights(im, knee=212.0, ceiling=238.0)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(out_path, format="WEBP", quality=86, method=6)
    print(f"MASTER OK: {out_path.name} ({im.size[0]}x{im.size[1]}, {out_path.stat().st_size//1024} KB)")


def main() -> None:
    from rapidocr_onnxruntime import RapidOCR
    ocr = RapidOCR()
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")

    poster_dir = REPO_ROOT / "public" / "images" / "events" / "capodanno-2027-posters"
    master_dir = REPO_ROOT / "public" / "images" / "seo-events" / "master"

    for slug, cfg in NEW_LOCATIONS.items():
        pf, pu = cfg["poster_src"]
        p_raw = download_file(pf, pu)
        if p_raw:
            build_editorial_poster(p_raw, poster_dir / f"{slug}.webp", cfg)
        for mf, mu, dst_name in cfg["masters"]:
            m_raw = download_file(mf, mu)
            if m_raw:
                save_master_webp(m_raw, master_dir / dst_name)

    for slug, fname, url in OFFICIAL_POSTER_UPDATES:
        raw_p = download_file(fname, url)
        if raw_p:
            bonify_official_flyer(raw_p, poster_dir / f"{slug}.webp", ocr, wa_glyph)


if __name__ == "__main__":
    main()
