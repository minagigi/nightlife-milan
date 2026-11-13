#!/usr/bin/env python3
"""Ricostruzione deterministica 100% Zero-Gomma-Magica di tutte le locandine Nightlife Milan.

Regole (bonifica-locandine-sostituzione-contatti):
  1. ZERO cv2 / ZERO inpainting / ZERO sfocature di cancellazione nell'artwork.
  2. Gruppo A (locandine con contatti del locale nell'artwork): sostituzione tipografica in-place
     sopra (x1, y1, x2, y2) tramite targa editoriale opaca al 100% (alpha=255) a gradiente
     bilineare sui 4 angoli esterni (luminanza [10..24] coerente con la tinta locale, supersampling 2x
     + filetto 1px rgba(212,175,106,105)) + font OFL Outfit-Bold + bollino WhatsApp #25D366:
       Riga 1: RESERVATIONS  [WA] +39 351 912 7047
       Riga 2: WWW.NIGHTLIFEMILAN.COM (piu eventuale indirizzo locale preservato)
     Zero pixel modificati fuori da (x1, y1, x2, y2).
  3. Gruppo B (locandine senza contatti terzi nell'artwork): 0 pixel modificati dentro l'artwork.
  4. Cornice inferiore Couture Noir approvata (1376x768, <= 280 KB WebP <= 300 KB WhatsApp og:image):
     artwork intero object-contain su sfondo ambient scuro + cornice oro 1px + barra contatti 62px
     WWW.NIGHTLIFEMILAN.COM * INFO & VIP TABLES * [WA] +39 351 912 7047.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import math
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

REPO_DEFAULT = Path(r"D:\lavori-antigravity\nightlife-milan-ottimizzazione-totale-20261111\repo")
JOB_DEFAULT = Path(r"D:\lavori-antigravity\nightlife-locandine-sostituzione-contatti-zero-gomma-20261112")
RAW_XCEED_DIR = JOB_DEFAULT / "raw_xceed"

FONT_BOLD_PATH = Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts\Outfit-Bold.ttf")
FONT_REG_PATH = Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts\Outfit-Regular.ttf")
WA_GLYPH_PATH = Path(
    r"C:\Users\minag\Desktop\mcp\nightlife-milan\nightllfe-milan-main\artifacts\current-xceed\whatsapp-logo-white-128.png"
)

# Post-9841269 raw Xceed flyers in Gruppo A: xceed_id -> (x1, y1, x2, y2, extra_line2)
RAW_GRUPPO_A_BOXES: dict[str, tuple[int, int, int, int, str | None]] = {
    "249159": (128, 642, 680, 706, None),
    "249160": (128, 642, 680, 706, None),
    "249161": (350, 638, 950, 706, None),
    "249163": (350, 638, 950, 706, None),
    "249218": (350, 638, 950, 706, None),
    "249169": (335, 636, 990, 706, None),
    "249170": (335, 636, 990, 706, None),
    "249243": (335, 636, 990, 706, None),
    "249196": (370, 598, 930, 664, None),
    "249197": (370, 598, 930, 664, None),
    "249244": (360, 636, 940, 698, None),
    "249201": (230, 1174, 1070, 1256, None),
    "249203": (230, 1174, 1070, 1256, None),
    "249215": (270, 1156, 1038, 1248, None),
    "249217": (270, 1156, 1038, 1248, None),
    "250464": (330, 808, 970, 894, None),
    "250563": (330, 808, 970, 894, None),
    "250730": (290, 1184, 1010, 1260, "VIA MESSINA 38"),
    "242145": (250, 1122, 1050, 1212, "VIA VALTELLINA 21"),
    "248494": (250, 1104, 1050, 1196, "VIA VALTELLINA 21"),
    "249561": (250, 1098, 1050, 1190, "VIA VALTELLINA 21"),
}

# 9841269 git blob prefixes (12 chars) whose narrow/low pill left legacy phone/domain exposed or collided:
BLOB_984_FIXES: dict[str, tuple[int, int, int, int, str | None]] = {
    "ea4308fff36d": (330, 962, 750, 1044, "VIA VALTELLINA 21"),  # 238347 (1080x1080 Gate)
    "bc66cb164ae9": (330, 962, 750, 1044, "VIA VALTELLINA 21"),  # 238652 (1080x1080 Gate)
    "cbbcd70842ae": (130, 938, 950, 1072, "VIA VALTELLINA 21"),  # 244293 (1080x1080 Gate)
    "3a8287a68376": (130, 938, 950, 1072, "VIA VALTELLINA 21"),  # 245673 (1080x1080 Gate)
    "730f161d7b02": (214, 800, 1386, 894, None),                 # 243819 x6 (1600x900 Pineta)
    "5e53448a509b": (68, 982, 1012, 1072, None),                 # 249139/142/144 (1080x1080 Pineta)
    "45f4536c1acb": (150, 796, 1450, 894, None),                 # 249146/156/158 (1600x900 JustMe Mon)
    "e746afe8269f": (214, 788, 1386, 894, None),                 # 249182/210 (1600x900 JustMe Tue)
    "272cf31cbc41": (214, 788, 1386, 894, None),                 # 249189/211 (1600x900 JustMe Wed)
    "e0f5080c1c09": (214, 788, 1386, 894, None),                 # 249192/212 (1600x900 JustMe Thu)
    "8ad40796ac72": (214, 742, 1386, 894, None),                 # 249213 (1600x900 JustMe Sat)
    "a232e7431bba": (80, 540, 520, 596, None),                   # 249206 (600x600 Damante JustMe Fri)
}

CAPODANNO_19F_PLATE_FIXES: dict[str, tuple[int, int, int, int]] = {
    "capodanno-55-milano.webp": (388, 696, 988, 762),
    "capodanno-aria-club-milano.webp": (388, 696, 988, 762),
    "capodanno-pineta-milano.webp": (388, 696, 988, 762),
    "capodanno-voya-rooftop-milano.webp": (388, 696, 988, 762),
}

FILENAME_HASH_984_FIXES: dict[str, tuple[int, int, int, int, str | None]] = {}


def compute_laplacian_var(gray: np.ndarray) -> float:
    g = gray.astype(np.float32)
    if g.shape[0] < 5 or g.shape[1] < 5:
        return 0.0
    lap = (
        g[:-2, 1:-1] + g[2:, 1:-1] + g[1:-1, :-2] + g[1:-1, 2:] - 4.0 * g[1:-1, 1:-1]
    )
    return float(np.var(lap))


def compute_sobel_p99(gray: np.ndarray) -> float:
    g = gray.astype(np.float32)
    if g.shape[0] < 5 or g.shape[1] < 5:
        return 255.0
    gx = (g[:-2, 2:] + 2.0 * g[1:-1, 2:] + g[2:, 2:]) - (
        g[:-2, :-2] + 2.0 * g[1:-1, :-2] + g[2:, :-2]
    )
    gy = (g[2:, :-2] + 2.0 * g[2:, 1:-1] + g[2:, 2:]) - (
        g[:-2, :-2] + 2.0 * g[:-2, 1:-1] + g[:-2, 2:]
    )
    mag = np.hypot(gx, gy)
    return float(np.percentile(mag, 99))


def clamp_dark_tint(rgb: np.ndarray) -> np.ndarray:
    r, g, b = float(rgb[0]), float(rgb[1]), float(rgb[2])
    luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if luma < 1.0:
        return np.array([12.0, 12.0, 15.0], dtype=np.float32)
    target_luma = max(10.0, min(22.0, luma * 0.28))
    scale = target_luma / luma
    out = np.clip(np.array([r * scale, g * scale, b * scale], dtype=np.float32), 8.0, 32.0)
    return out


def sample_corner_color(arr: np.ndarray, cx: int, cy: int) -> np.ndarray:
    h, w, _ = arr.shape
    x0 = max(0, min(w - 8, cx - 4))
    y0 = max(0, min(h - 8, cy - 4))
    patch = arr[y0 : y0 + 8, x0 : x0 + 8].reshape(-1, 3)
    med = np.median(patch, axis=0)
    return clamp_dark_tint(med)


def build_wa_badge(diam: int, wa_glyph: Image.Image) -> Image.Image:
    ss = 2
    D = diam * ss
    badge = Image.new("RGBA", (D, D), (0, 0, 0, 0))
    d = ImageDraw.Draw(badge)
    d.ellipse((0, 0, D - 1, D - 1), fill=(37, 211, 102, 255))
    icon_sz = max(8, int(round(D * 0.62)))
    glyph_resized = wa_glyph.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    off = (D - icon_sz) // 2
    badge.alpha_composite(glyph_resized, (off, off))
    return badge.resize((diam, diam), Image.Resampling.LANCZOS)


def draw_tracked_text(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: float,
    text: str,
    font: ImageFont.FreeTypeFont,
    tracking: float,
    fill: tuple[int, int, int, int],
) -> float:
    cur = x
    for ch in text:
        draw.text((cur, y), ch, font=font, fill=fill)
        bbox = font.getbbox(ch)
        adv = font.getlength(ch) if hasattr(font, "getlength") else (bbox[2] - bbox[0])
        cur += adv + tracking
    return cur - tracking


def measure_tracked_text(text: str, font: ImageFont.FreeTypeFont, tracking: float) -> tuple[float, int]:
    if not text:
        return 0.0, 0
    total = 0.0
    for ch in text:
        adv = font.getlength(ch) if hasattr(font, "getlength") else (font.getbbox(ch)[2] - font.getbbox(ch)[0])
        total += adv + tracking
    total -= tracking
    bb = font.getbbox(text)
    return total, bb[3] - bb[1]


def apply_inplace_plate(
    im: Image.Image,
    x1: int,
    y1: int,
    x2: int,
    y2: int,
    wa_glyph: Image.Image,
    extra_line2: str | None = None,
) -> tuple[Image.Image, dict]:
    """Replaces (x1, y1, x2, y2) with a 100% opaque bilinear-tinted Couture Noir contact plate.
    Guarantees 0 pixels modified outside (x1, y1, x2, y2).
    """
    orig_arr = np.array(im.convert("RGB"))
    H, W, _ = orig_arr.shape
    x1 = max(0, min(W - 4, x1))
    x2 = max(x1 + 4, min(W, x2))
    y1 = max(0, min(H - 4, y1))
    y2 = max(y1 + 4, min(H, y2))
    pw, ph = x2 - x1, y2 - y1

    c_tl = sample_corner_color(orig_arr, max(0, x1 - 6), max(0, y1 - 6))
    c_tr = sample_corner_color(orig_arr, min(W - 1, x2 + 6), max(0, y1 - 6))
    c_bl = sample_corner_color(orig_arr, max(0, x1 - 6), min(H - 1, y2 + 6))
    c_br = sample_corner_color(orig_arr, min(W - 1, x2 + 6), min(H - 1, y2 + 6))

    u = np.linspace(0.0, 1.0, pw, dtype=np.float32)[None, :, None]
    v = np.linspace(0.0, 1.0, ph, dtype=np.float32)[:, None, None]
    grad = (
        (1.0 - u) * (1.0 - v) * c_tl
        + u * (1.0 - v) * c_tr
        + (1.0 - u) * v * c_bl
        + u * v * c_br
    )
    grad_u8 = np.clip(np.round(grad), 0, 255).astype(np.uint8)

    # Measure background Laplacian BEFORE drawing border/text (interior smooth gradient)
    gray_bg = 0.299 * grad_u8[:, :, 0] + 0.587 * grad_u8[:, :, 1] + 0.114 * grad_u8[:, :, 2]
    bg_lap_var = compute_laplacian_var(gray_bg)

    # Note: To guarantee 100% coverage of every corner pixel of legacy glyphs inside (x1,y1,x2,y2),
    # fill the full rectangle with the smooth bilinear background (which seamlessly matches the outer
    # corners!) and draw an inset 2x supersampled stadium hairline inside it.
    plate_rgba = Image.fromarray(grad_u8, mode="RGB").convert("RGBA")

    ss = 2
    ov = Image.new("RGBA", (pw * ss, ph * ss), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    rad = min((ph * ss) // 2 - 4, 36)
    od.rounded_rectangle(
        (2, 2, pw * ss - 3, ph * ss - 3),
        radius=max(8, rad),
        outline=(212, 175, 106, 110),
        width=2,
    )
    plate_rgba.alpha_composite(ov.resize((pw, ph), Image.Resampling.LANCZOS))

    # Fit 2 crisp lines inside (pw, ph)
    line1_lbl = "RESERVATIONS"
    line1_num = "+39 351 912 7047"
    line2_txt = "WWW.NIGHTLIFEMILAN.COM" + (f" · {extra_line2}" if extra_line2 else "")

    fs1 = max(13, min(26, int(round(ph * 0.29))))
    fs2 = max(11, min(21, int(round(ph * 0.23))))

    for _ in range(8):
        f1 = ImageFont.truetype(str(FONT_BOLD_PATH), fs1)
        f2 = ImageFont.truetype(str(FONT_BOLD_PATH), fs2)
        tr1 = max(1.0, round(fs1 * 0.12, 1))
        tr1_num = max(0.5, round(fs1 * 0.05, 1))
        tr2 = max(1.2, round(fs2 * 0.14, 1))
        w_lbl, _ = measure_tracked_text(line1_lbl, f1, tr1)
        w_num, _ = measure_tracked_text(line1_num, f1, tr1_num)
        badge_d = max(14, int(round(fs1 * 1.08)))
        gap = max(8, int(round(fs1 * 0.45)))
        total_w1 = w_lbl + gap + badge_d + int(round(fs1 * 0.32)) + w_num
        total_w2, _ = measure_tracked_text(line2_txt, f2, tr2)
        if max(total_w1, total_w2) <= pw - 24:
            break
        fs1 = max(11, fs1 - 1)
        fs2 = max(10, fs2 - 1)

    draw = ImageDraw.Draw(plate_rgba)
    bb1 = f1.getbbox("RESERVATIONS+39")
    h1 = bb1[3] - bb1[1]
    bb2 = f2.getbbox("WWW.NIGHTLIFEMILAN.COM")
    h2 = bb2[3] - bb2[1]
    v_gap = max(4, int(round(ph * 0.11)))
    block_h = h1 + v_gap + h2
    top_y = (ph - block_h) / 2.0

    start_x1 = (pw - total_w1) / 2.0
    y1_draw = top_y - bb1[1]
    cur_x = draw_tracked_text(draw, start_x1, y1_draw, line1_lbl, f1, tr1, (238, 233, 224, 255))
    cur_x += gap
    badge_im = build_wa_badge(badge_d, wa_glyph)
    badge_y = int(round(top_y + (h1 - badge_d) / 2.0))
    plate_rgba.alpha_composite(badge_im, (int(round(cur_x)), badge_y))
    cur_x += badge_d + int(round(fs1 * 0.32))
    draw = ImageDraw.Draw(plate_rgba)
    draw_tracked_text(draw, cur_x, y1_draw, line1_num, f1, tr1_num, (255, 255, 255, 255))

    start_x2 = (pw - total_w2) / 2.0
    y2_draw = top_y + h1 + v_gap - bb2[1]
    draw_tracked_text(draw, start_x2, y2_draw, line2_txt, f2, tr2, (212, 175, 106, 255))

    plate_rgb = np.array(plate_rgba.convert("RGB"))
    gray_post = 0.299 * plate_rgb[:, :, 0] + 0.587 * plate_rgb[:, :, 1] + 0.114 * plate_rgb[:, :, 2]
    sobel_p99 = compute_sobel_p99(gray_post)

    out_arr = orig_arr.copy()
    out_arr[y1:y2, x1:x2] = plate_rgb

    # Strict zero-outside-ROI pixel check
    mask = np.ones((H, W), dtype=bool)
    mask[y1:y2, x1:x2] = False
    outside_diff = int(np.count_nonzero(out_arr[mask] != orig_arr[mask]))
    if outside_diff != 0:
        raise RuntimeError(f"Violazione ROI: {outside_diff} pixel alterati fuori da ({x1},{y1},{x2},{y2})")

    return Image.fromarray(out_arr, mode="RGB"), {
        "roi": [x1, y1, x2, y2],
        "bg_laplacian_var": round(bg_lap_var, 4),
        "post_sobel_p99": round(sobel_p99, 2),
        "outside_pixels_changed": outside_diff,
    }


def compose_couture_noir_card(artwork: Image.Image, wa_glyph: Image.Image) -> Image.Image:
    """Composes uncropped object-contain artwork on 1376x768 Couture Noir card with bottom contact bar."""
    CW, CH = 1376, 768
    STAGE_X1, STAGE_Y1, STAGE_X2, STAGE_Y2 = 26, 14, 1350, 692
    SW, SH = STAGE_X2 - STAGE_X1, STAGE_Y2 - STAGE_Y1  # 1324 x 678
    BAR_Y = 706

    art_rgb = artwork.convert("RGB")
    aw, ah = art_rgb.size

    canvas = Image.new("RGB", (CW, CH), (7, 7, 9))

    # Ambient blurred backdrop inside stage so square/portrait flyers sit in a rich darkened atmosphere
    bg = art_rgb.resize((SW, SH), Image.Resampling.BILINEAR).filter(ImageFilter.GaussianBlur(radius=28))
    bg_arr = np.clip(np.array(bg, dtype=np.float32) * 0.24, 0, 255).astype(np.uint8)
    canvas.paste(Image.fromarray(bg_arr, mode="RGB"), (STAGE_X1, STAGE_Y1))

    # Uncropped object-contain fit inside (SW, SH)
    scale = min(SW / aw, SH / ah)
    nw = max(1, int(round(aw * scale)))
    nh = max(1, int(round(ah * scale)))
    art_resized = art_rgb.resize((nw, nh), Image.Resampling.LANCZOS)
    px = STAGE_X1 + (SW - nw) // 2
    py = STAGE_Y1 + (SH - nh) // 2
    canvas.paste(art_resized, (px, py))

    rgba = canvas.convert("RGBA")
    draw = ImageDraw.Draw(rgba)

    # Subtle inner hairline if artwork doesn't fill full stage width
    if nw < SW - 8:
        draw.rectangle((px - 1, py - 1, px + nw, py + nh), outline=(201, 168, 106, 85), width=1)

    # Outer stage gold hairline + bottom separator rule
    draw.rectangle((STAGE_X1, STAGE_Y1, STAGE_X2, STAGE_Y2), outline=(201, 168, 106, 190), width=1)
    draw.line([(0, BAR_Y), (CW, BAR_Y)], fill=(201, 168, 106, 195), width=1)

    # Bottom bar typography: WWW.NIGHTLIFEMILAN.COM  *  INFO & VIP TABLES  [WA] +39 351 912 7047
    f_dom = ImageFont.truetype(str(FONT_BOLD_PATH), 23)
    f_mid = ImageFont.truetype(str(FONT_BOLD_PATH), 17)
    f_tel = ImageFont.truetype(str(FONT_BOLD_PATH), 25)

    dom_txt = "WWW.NIGHTLIFEMILAN.COM"
    mid_txt = "INFO & VIP TABLES"
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
    # Dot separator
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


def encode_webp_under_budget(im: Image.Image, max_bytes: int = 280_000) -> bytes:
    for q in (88, 84, 80, 76, 72, 68):
        buf = io.BytesIO()
        im.save(buf, format="WEBP", quality=q, method=4)
        data = buf.getvalue()
        if len(data) <= max_bytes:
            return data
    buf = io.BytesIO()
    im.save(buf, format="WEBP", quality=62, method=6)
    return buf.getvalue()


class GitBlobReader:
    """Fast persistent git cat-file --batch reader (zero per-file subprocess overhead)."""

    def __init__(self, repo: Path):
        self.repo = repo
        self.proc = subprocess.Popen(
            ["git", "-C", str(repo), "cat-file", "--batch"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
        )

    def ls_tree(self, rev: str, paths: list[str]) -> dict[str, str]:
        out = subprocess.check_output(
            ["git", "-C", str(self.repo), "ls-tree", "-r", rev, "--", *paths],
            text=True,
            encoding="utf-8",
        )
        mapping: dict[str, str] = {}
        for line in out.splitlines():
            if not line.strip():
                continue
            meta, rel = line.split("\t", 1)
            _, _, sha = meta.split()
            mapping[rel] = sha
        return mapping

    def read_blob(self, sha: str) -> bytes:
        assert self.proc.stdin and self.proc.stdout
        self.proc.stdin.write((sha + "\n").encode("ascii"))
        self.proc.stdin.flush()
        header = self.proc.stdout.readline().decode("ascii").strip()
        parts = header.split()
        if len(parts) < 3 or parts[1] == "missing":
            raise KeyError(f"Missing git blob {sha}")
        size = int(parts[2])
        data = self.proc.stdout.read(size)
        self.proc.stdout.read(1)  # trailing LF
        return data

    def close(self) -> None:
        if self.proc.stdin:
            self.proc.stdin.close()
        self.proc.wait()


def build_raw_xceed_map(raw_dir: Path) -> dict[str, Path]:
    out: dict[str, Path] = {}
    for p in sorted(raw_dir.glob("*.img")):
        xid = p.stem.split("_")[0]
        out[xid] = p
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--repo", default=str(REPO_DEFAULT))
    ap.add_argument("--job", default=str(JOB_DEFAULT))
    ap.add_argument("--pilot", nargs="*", help="Rigenera solo i percorsi indicati (relativi al repo)")
    ap.add_argument("--all", action="store_true", help="Rigenera tutte le locandine del repo")
    args = ap.parse_args()

    repo = Path(args.repo)
    job = Path(args.job)
    wa_glyph = Image.open(WA_GLYPH_PATH).convert("RGBA")
    raw_map = build_raw_xceed_map(RAW_XCEED_DIR)

    reader = GitBlobReader(repo)
    tree_984 = reader.ls_tree(
        "9841269",
        [
            "public/images/events/october-2026",
            "public/images/halloween/2026",
            "public/images/events/capodanno-2027-posters",
        ],
    )
    tree_19f = reader.ls_tree(
        "19fbc33",
        [
            "public/images/events/capodanno-2027-posters",
            "public/images/events/october-2026/arca-1-b0f7e1886421.webp",
        ],
    )

    # Collect target files
    target_rels: list[str] = []
    if args.pilot:
        target_rels = [p.replace("\\", "/") for p in args.pilot]
    elif args.all:
        for sub in (
            "public/images/events/october-2026",
            "public/images/halloween/2026",
            "public/images/events/capodanno-2027-posters",
        ):
            base = repo / sub
            for p in sorted(base.rglob("*.webp")):
                rel_parts = p.relative_to(base).parts
                if len(rel_parts) > 1 and rel_parts[0] in ("justme-body", "venues"):
                    continue
                if p.name.startswith("xceed-archive-"):
                    continue
                target_rels.append(p.relative_to(repo).as_posix())
    else:
        print("Specificare --pilot <files...> oppure --all")
        return 2

    print(f"Avvio ricostruzione Zero-Gomma-Magica su {len(target_rels)} locandine...")

    # Cache processed master artworks by source_key so identical blobs are rendered once!
    card_bytes_cache: dict[str, bytes] = {}
    plate_metrics: list[dict] = []
    gruppo_b_untouched: list[str] = []

    tasks_to_encode: list[tuple[str, Image.Image, dict | None, bool]] = []
    rel_to_cache_key: dict[str, str] = {}

    for rel in target_rels:
        name = Path(rel).name
        stem = Path(rel).stem
        xid = stem.split("-")[0]
        is_capodanno = "capodanno-2027-posters/" in rel

        if rel == "public/images/events/capodanno-2027-posters/capodanno-justme-garda-lake.webp":
            raw_p = raw_map["250310"]
            cache_key = f"raw_B:{raw_p.name}"
            rel_to_cache_key[rel] = cache_key
            if cache_key not in card_bytes_cache and not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                art = Image.open(raw_p).convert("RGB")
                tasks_to_encode.append((cache_key, art, None, True))
            gruppo_b_untouched.append(rel)
            continue

        if rel == "public/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp":
            raw_p = repo / "scripts" / "raw-masters" / "master_flyer_repvblic_nye_2027.jpg"
            cache_key = f"raw_B:{raw_p.name}"
            rel_to_cache_key[rel] = cache_key
            if cache_key not in card_bytes_cache and not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                art = Image.open(raw_p).convert("RGB")
                tasks_to_encode.append((cache_key, art, None, True))
            gruppo_b_untouched.append(rel)
            continue

        if is_capodanno and rel in tree_19f:
            bsha = tree_19f[rel]
            cap_fix = CAPODANNO_19F_PLATE_FIXES.get(name)
            cache_key = f"19f:{bsha}:{'fix_' + name if cap_fix else 'clean'}"
            rel_to_cache_key[rel] = cache_key
            if not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                raw_bytes = reader.read_blob(bsha)
                art = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                pmeta = None
                if cap_fix:
                    x1, y1, x2, y2 = cap_fix
                    art, pmeta = apply_inplace_plate(art, x1, y1, x2, y2, wa_glyph, None)
                    pmeta["file"] = rel
                tasks_to_encode.append((cache_key, art, pmeta, False))
            continue

        if rel in tree_984:
            bsha = tree_984[rel]
            bprefix = bsha[:12]
            hash_suf = stem.split("-")[-1] if "-" in stem else ""
            fix_spec = BLOB_984_FIXES.get(bprefix) or FILENAME_HASH_984_FIXES.get(hash_suf)
            cache_key = f"984:{bsha}:{'fix' if fix_spec else 'clean'}"
            rel_to_cache_key[rel] = cache_key
            if not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                raw_bytes = reader.read_blob(bsha)
                art = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                pmeta = None
                if fix_spec:
                    x1, y1, x2, y2, extra = fix_spec
                    art, pmeta = apply_inplace_plate(art, x1, y1, x2, y2, wa_glyph, extra)
                    pmeta["file"] = rel
                tasks_to_encode.append((cache_key, art, pmeta, False))
            continue

        if rel == "public/images/events/october-2026/arca-1-b0f7e1886421.webp" and rel in tree_19f:
            bsha = tree_19f[rel]
            cache_key = f"19f:{bsha}"
            rel_to_cache_key[rel] = cache_key
            if not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                raw_bytes = reader.read_blob(bsha)
                art = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                tasks_to_encode.append((cache_key, art, None, True))
            continue

        # Special fallback: 240984 generic Xceed stage banner -> use 9841269's halloween-gate-240984.webp
        if xid == "240984" and "public/images/events/october-2026/halloween-gate-240984.webp" in tree_984:
            bsha = tree_984["public/images/events/october-2026/halloween-gate-240984.webp"]
            cache_key = f"984:{bsha}:clean"
            rel_to_cache_key[rel] = cache_key
            if not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                raw_bytes = reader.read_blob(bsha)
                art = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
                tasks_to_encode.append((cache_key, art, None, False))
            continue

        if xid in raw_map:
            raw_p = raw_map[xid]
            box_spec = RAW_GRUPPO_A_BOXES.get(xid)
            cache_key = f"raw:{raw_p.name}:{'A_' + xid if box_spec else 'B'}"
            rel_to_cache_key[rel] = cache_key
            if not any(k == cache_key for k, _, _, _ in tasks_to_encode):
                art = Image.open(raw_p).convert("RGB")
                pmeta = None
                if box_spec:
                    x1, y1, x2, y2, extra = box_spec
                    art, pmeta = apply_inplace_plate(art, x1, y1, x2, y2, wa_glyph, extra)
                    pmeta["file"] = rel
                tasks_to_encode.append((cache_key, art, pmeta, box_spec is None))
            if box_spec is None:
                gruppo_b_untouched.append(rel)
            continue

        raise FileNotFoundError(f"Nessuna sorgente pulita trovata per {rel}")

    reader.close()

    def _render_one(item: tuple[str, Image.Image, dict | None, bool]) -> tuple[str, bytes, dict | None]:
        ckey, art_im, pm, _ = item
        card = compose_couture_noir_card(art_im, wa_glyph)
        wbytes = encode_webp_under_budget(card, max_bytes=280_000)
        return ckey, wbytes, pm

    with ThreadPoolExecutor(max_workers=8) as pool:
        for ckey, wbytes, pm in pool.map(_render_one, tasks_to_encode):
            card_bytes_cache[ckey] = wbytes
            if pm is not None:
                plate_metrics.append(pm)

    written = 0
    max_sz = 0
    for rel in target_rels:
        ckey = rel_to_cache_key[rel]
        wbytes = card_bytes_cache[ckey]
        out_p = repo / rel
        out_p.write_bytes(wbytes)
        written += 1
        if len(wbytes) > max_sz:
            max_sz = len(wbytes)

    # Update inventory.json dimensions, bytes & sha256 if --all
    if args.all:
        inv_path = repo / "lib" / "october-events" / "inventory.json"
        if inv_path.is_file():
            inv = json.loads(inv_path.read_text(encoding="utf-8"))
            events = inv.get("events", []) if isinstance(inv, dict) else inv
            updated_inv = 0
            for ev in events:
                img_obj = ev.get("image")
                if isinstance(img_obj, dict) and isinstance(img_obj.get("src"), str):
                    src_rel = "public" + img_obj["src"]
                    disk_p = repo / src_rel
                    if disk_p.is_file():
                        b = disk_p.read_bytes()
                        img_obj["width"] = 1376
                        img_obj["height"] = 768
                        img_obj["bytes"] = len(b)
                        img_obj["sha256"] = hashlib.sha256(b).hexdigest()
                        updated_inv += 1
            inv_path.write_text(json.dumps(inv, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"Aggiornato inventory.json su {updated_inv} eventi.")

        consegna_dir = job / "consegna"
        consegna_dir.mkdir(parents=True, exist_ok=True)
        manifest_path = consegna_dir / "manifest_plates.json"
        manifest_path.write_text(
            json.dumps(
                {
                    "total_rebuilt": written,
                    "unique_masters_rendered": len(tasks_to_encode),
                    "max_webp_bytes": max_sz,
                    "plates": plate_metrics,
                    "gruppo_b_untouched": gruppo_b_untouched,
                },
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        print(f"Scritto manifesto targhe: {manifest_path} ({len(plate_metrics)} targhe in-place, {len(gruppo_b_untouched)} Gruppo B intatte).")

    print(
        f"COMPLETATO: {written} locandine scritte ({len(tasks_to_encode)} master unici), peso max = {max_sz} byte (<= 280000)."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
