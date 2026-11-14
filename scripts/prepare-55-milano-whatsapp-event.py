#!/usr/bin/env python3
"""Deterministic 55 Milano WhatsApp event ingestion, sanitization, and Zero-Gomma poster builder.

Consumes a debounced burst JSON from WhatsApp, classifies whether it is a complete
55 Milano event communication, sanitizes third-party/sender contacts, builds or
remediates the Couture Noir 1376x768 WebP poster using bilateral opaque plates
and ``rebuild-all-posters-zero-gomma.py`` helpers, and upserts ``inventory.json`` +
``routeSlugs.json`` chronologically (or emits dry-run proof artifacts when ``--apply``
is omitted).
"""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
import unicodedata
from dataclasses import dataclass, field
from datetime import date, datetime, time, timedelta
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

import numpy as np
from PIL import Image, ImageFont
from rapidocr_onnxruntime import RapidOCR

ROME_TZ = ZoneInfo("Europe/Rome")

CANONICAL_VENUE = {
    "id": "v-55milano",
    "name": "55 Milano",
    "address": "Via Piero della Francesca, 55, 20154 Milano, IT",
    "structuredAddress": {
        "streetAddress": "Via Piero della Francesca, 55",
        "addressLocality": "Milano",
        "postalCode": "20154",
        "addressCountry": "IT",
    },
    "latitude": 45.483,
    "longitude": 9.167,
}

CANONICAL_CLUB_URL = "https://nightlifemilan.com/clubs/55-milano"
OFFICIAL_PHONE_DIGITS = "3519127047"

INVISIBLE_CHARS_RE = re.compile(r"[\u200b-\u200f\u202a-\u202e\u2060\ufeff]")

POSITIVE_55_RE = re.compile(
    r"(?<![a-z0-9])(?:"
    r"55\s*club|55\s*milano|55club(?:milano)?|cinquantacinque|"
    r"piero\s+della\s+francesca\s*[-,]?\s*55"
    r")(?![a-z0-9])",
    re.IGNORECASE,
)

COMPETING_VENUE_RE = re.compile(
    r"(?<![a-z0-9])(?:"
    r"pineta|aria\s*club|just\s*me|justme|repvblic|republic\s*milano|"
    r"voya|play\s*club|gattopardo|volt|amnesia"
    r")(?![a-z0-9])",
    re.IGNORECASE,
)

THIRD_PARTY_CONTACT_RE = re.compile(
    r"(?:"
    r"https?://\S+|"
    r"(?:www\.)?(?:55\s*milano|fiftyfive\s*milano|55clubmilano)\.(?:com|it|net|org)\S*|"
    r"(?:www\.)?(?:xceed|eventbrite|ra)\.(?:me|com|co|it)\S*|"
    r"55clubmilano|"
    r"@\w*55\w*|"
    r"(?:\+?39[\s.-]*)?393[\s.-]*920[\s.-]*4246|"
    r"\bciao\s+marco\b|"
    r"^\s*(?:ciao|buonasera|buongiorno|salve)[,!\s]*$|^\s*marco\s*$"
    r")",
    re.IGNORECASE | re.MULTILINE,
)

ORPHAN_CONTACT_LABELS = (
    "RESERVAT",
    "INFOLINE",
    "PRENOTAZIONETAVOLI",
    "PRENOTAZIONI",
    "INFO&RES",
    "INFORES",
    "INFOTAVOLI",
)

TRUNCATED_CONTACT_TOKENS = {"NFO", "INF", "RESER", "SERVATIONS"}

WEEKDAY_NAMES_IT = {
    "lunedi": 0,
    "martedi": 1,
    "mercoledi": 2,
    "giovedi": 3,
    "venerdi": 4,
    "sabato": 5,
    "domenica": 6,
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6,
}

WEEKDAY_GENERIC_TITLE = {
    0: "Lunedì Night",
    1: "Martedì Night",
    2: "Mercoledì Night",
    3: "Giovedì Night",
    4: "Venerdì Night",
    5: "Sabato Night",
    6: "Domenica Night",
}

MONTH_MAP = {
    "gennaio": 1,
    "gen": 1,
    "january": 1,
    "jan": 1,
    "febbraio": 2,
    "feb": 2,
    "february": 2,
    "marzo": 3,
    "mar": 3,
    "march": 3,
    "aprile": 4,
    "apr": 4,
    "april": 4,
    "maggio": 5,
    "mag": 5,
    "may": 5,
    "giugno": 6,
    "giu": 6,
    "june": 6,
    "jun": 6,
    "luglio": 7,
    "lug": 7,
    "july": 7,
    "jul": 7,
    "agosto": 8,
    "ago": 8,
    "august": 8,
    "aug": 8,
    "settembre": 9,
    "set": 9,
    "september": 9,
    "sep": 9,
    "sept": 9,
    "ottobre": 10,
    "ott": 10,
    "october": 10,
    "oct": 10,
    "novembre": 11,
    "nov": 11,
    "november": 11,
    "dicembre": 12,
    "dic": 12,
    "december": 12,
    "dec": 12,
}

MONTH_PATTERN = "|".join(sorted(MONTH_MAP.keys(), key=len, reverse=True))
WEEKDAY_PATTERN = "|".join(sorted(WEEKDAY_NAMES_IT.keys(), key=len, reverse=True))

COMMERCIAL_OR_TIME_SIGNAL_RE = re.compile(
    r"(?:€|\beuro\b|\bserata\b|\bticket\b|\bpriv[eèé]\b|\btavol[oi]?\b|\btable\b|"
    r"\bbuffet\b|\bcena\b|\bdinner\b|\baperitiv[oi]?\b|\bdrink\b|\blista\b|\bguest\s*list\b|"
    r"\bpriority\b|\bdonna\b|\buomo\b|\bwomen\b|\bmen\b|\bomaggio\b|\bfree\s+entry\b|"
    r"(?<!\d)\d{1,2}[:.]\d{2}(?!\d)|\bore\s+\d{1,2}\b|\bh\s*\d{1,2}\b)",
    re.IGNORECASE,
)


def strip_invisible(s: str) -> str:
    return INVISIBLE_CHARS_RE.sub("", s or "")


def strip_accents(s: str) -> str:
    nfkd = unicodedata.normalize("NFKD", s)
    return "".join(ch for ch in nfkd if unicodedata.category(ch) != "Mn")


def sanitize_public_text(s: str) -> str:
    cleaned = strip_invisible(s)
    cleaned = THIRD_PARTY_CONTACT_RE.sub(" ", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" \t\r\n-–—·|,;:*_")
    return cleaned


def resolve_font_bold_path() -> Path:
    candidates = [
        Path(r"C:\Users\minag\.claude\skills\canvas-design\canvas-fonts\Outfit-Bold.ttf"),
        Path("/mnt/c/Users/minag/.claude/skills/canvas-design/canvas-fonts/Outfit-Bold.ttf"),
        Path.home() / ".claude/skills/canvas-design/canvas-fonts/Outfit-Bold.ttf",
    ]
    for p in candidates:
        if p.is_file():
            return p
    raise FileNotFoundError("Outfit-Bold.ttf not found in expected paths")


def load_zero_gomma_helpers(repo: Path):
    script_path = Path(__file__).with_name("rebuild-all-posters-zero-gomma.py")
    spec = importlib.util.spec_from_file_location("rebuild_all_posters_zero_gomma", script_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load helper module {script_path}")
    rbg = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(rbg)
    rbg.WA_GLYPH_PATH = repo / "scripts" / "assets" / "whatsapp-logo-white-128.png"
    rbg.FONT_BOLD_PATH = resolve_font_bold_path()
    if not rbg.WA_GLYPH_PATH.is_file():
        raise FileNotFoundError(f"Missing WhatsApp glyph asset: {rbg.WA_GLYPH_PATH}")
    return rbg


def parse_msg_datetime(ts_iso: str | None) -> datetime:
    if ts_iso:
        try:
            iso_norm = ts_iso.strip()
            if iso_norm.endswith("Z"):
                iso_norm = iso_norm[:-1] + "+00:00"
            dt = datetime.fromisoformat(iso_norm)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=ROME_TZ)
            return dt.astimezone(ROME_TZ)
        except ValueError:
            pass
    return datetime.now(ROME_TZ)


def resolve_year_for_month_day(month: int, day: int, ref_date: date, explicit_year: int | None) -> date | None:
    if explicit_year is not None:
        try:
            return date(explicit_year, month, day)
        except ValueError:
            return None

    low = ref_date - timedelta(days=14)
    high = ref_date + timedelta(days=335)
    candidates: list[date] = []
    for y in (ref_date.year - 1, ref_date.year, ref_date.year + 1):
        try:
            cand = date(y, month, day)
        except ValueError:
            continue
        if low <= cand <= high:
            candidates.append(cand)
    if not candidates:
        return None
    future_first = [c for c in candidates if c >= ref_date - timedelta(days=7)]
    pool = future_first or candidates
    return min(pool, key=lambda c: abs((c - ref_date).days))


def extract_event_date(sources: list[str], ref_date: date) -> date | None:
    combined = "\n".join(sources)
    norm = strip_accents(strip_invisible(combined)).lower()

    # 1. Explicit ISO YYYY-MM-DD
    for m in re.finditer(r"(?<!\d)(202\d)-(\d{1,2})-(\d{1,2})(?!\d)", norm):
        y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
        resolved = resolve_year_for_month_day(mo, d, ref_date, y)
        if resolved is not None:
            return resolved

    # 2. DD Month [YYYY]
    pat_dm = re.compile(rf"(?<!\d)(\d{{1,2}})\s+(?:di\s+)?({MONTH_PATTERN})(?:\s+(202\d))?(?![a-z0-9])", re.I)
    for m in pat_dm.finditer(norm):
        d = int(m.group(1))
        mo = MONTH_MAP[m.group(2).lower()]
        y = int(m.group(3)) if m.group(3) else None
        resolved = resolve_year_for_month_day(mo, d, ref_date, y)
        if resolved is not None:
            return resolved

    # 3. Month DD [YYYY]
    pat_md = re.compile(rf"(?<![a-z0-9])({MONTH_PATTERN})\s+(\d{{1,2}})(?:st|nd|rd|th)?(?:\s*,?\s*(202\d))?(?!\d)", re.I)
    for m in pat_md.finditer(norm):
        mo = MONTH_MAP[m.group(1).lower()]
        d = int(m.group(2))
        y = int(m.group(3)) if m.group(3) else None
        resolved = resolve_year_for_month_day(mo, d, ref_date, y)
        if resolved is not None:
            return resolved

    # 4. DD/MM[/YYYY] or DD.MM[.YYYY]
    for m in re.finditer(r"(?<!\d)(\d{1,2})[/.\-](\d{1,2})(?:[/.\-](20\d{2}))?(?!\d)", norm):
        d, mo = int(m.group(1)), int(m.group(2))
        y = int(m.group(3)) if m.group(3) else None
        if 1 <= mo <= 12 and 1 <= d <= 31:
            resolved = resolve_year_for_month_day(mo, d, ref_date, y)
            if resolved is not None:
                return resolved

    # 5. Standalone weekday IT/EN
    pat_wd = re.compile(rf"(?<![a-z0-9])({WEEKDAY_PATTERN})(?![a-z0-9])", re.I)
    m_wd = pat_wd.search(norm)
    if m_wd:
        target_wd = WEEKDAY_NAMES_IT[m_wd.group(1).lower()]
        delta = (target_wd - ref_date.weekday()) % 7
        return ref_date + timedelta(days=delta)

    return None


def has_any_date_token(sources: list[str]) -> bool:
    norm = strip_accents(strip_invisible("\n".join(sources))).lower()
    if re.search(r"(?<!\d)\d{1,2}\s*(?:" + MONTH_PATTERN + r")(?![a-z0-9])", norm):
        return True
    if re.search(r"(?<![a-z0-9])(?:" + MONTH_PATTERN + r")\s*\d{1,2}(?!\d)", norm):
        return True
    if re.search(r"(?<!\d)\d{1,2}[/\-.]\d{1,2}(?:[/\-.]20\d{2})?(?!\d)", norm):
        return True
    if re.search(r"(?<![a-z0-9])(?:" + WEEKDAY_PATTERN + r")(?![a-z0-9])", norm):
        return True
    return False


def format_hhmm(hour_s: str, min_s: str | None) -> str | None:
    h = int(hour_s)
    mi = int(min_s) if min_s else 0
    if 0 <= h <= 23 and 0 <= mi <= 59:
        return f"{h:02d}:{mi:02d}"
    return None


def parse_start_hhmm(text: str, ocr_text: str) -> str:
    combined = strip_invisible(text + "\n" + ocr_text)

    # First check explicit evening dinner/buffet/aperitivo time (excluding "entro le ore ...")
    for m_dinner in re.finditer(
        r"(?:cena|buffet|aperitiv[oi]|dinner|open\s+wine)[^\n]{0,45}?(?<!\d)(1[89]|2[0-3])[:.](\d{2})(?!\d)",
        combined,
        re.IGNORECASE,
    ):
        prefix = combined[max(0, m_dinner.start(1) - 25) : m_dinner.start(1)].lower()
        if "entro" in prefix or "fino" in prefix or "until" in prefix:
            continue
        hhmm = format_hhmm(m_dinner.group(1), m_dinner.group(2))
        if hhmm:
            return hhmm

    # Explicit opening / doors open time (must NOT match "entro le ore 1:00" deadline)
    for m_open in re.finditer(
        r"(?:dalle\s*(?:ore)?|apertura\s*(?:porte)?|doors?\s*(?:open)?|start|inizio|\bh)\s*[:.]?\s*(?<!\d)(\d{1,2})(?:[:.](\d{2}))?(?!\d)",
        combined,
        re.IGNORECASE,
    ):
        prefix = combined[max(0, m_open.start() - 25) : m_open.start()].lower()
        if "entro" in prefix or "fino" in prefix or "until" in prefix:
            continue
        h = int(m_open.group(1))
        mi = int(m_open.group(2)) if m_open.group(2) else 0
        if 18 <= h <= 23 and 0 <= mi <= 59:
            return f"{h:02d}:{mi:02d}"

    # Buffet/dinner/aperitivo mentioned without explicit hour
    if re.search(r"(?<![a-z0-9])(?:buffet|cena|aperitiv[oi]|dinner)(?![a-z0-9])", combined, re.IGNORECASE):
        if re.search(r"19[:.]30", combined):
            return "19:30"
        if re.search(r"20[:.]00", combined):
            return "20:00"
        return "20:30"

    return "23:00"


def parse_eur_price(raw_line: str) -> float | int | None:
    line = strip_invisible(raw_line)
    # Match euro amount before or after symbol/word
    patterns = [
        r"(?<!\d)(\d{1,4}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)\s*(?:€|euro\b)",
        r"(?:€|\beuro\b)\s*(\d{1,4}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)(?!\d)",
    ]
    for pat in patterns:
        m = re.search(pat, line, re.IGNORECASE)
        if m:
            num_s = m.group(1)
            # Italian thousands separator e.g. 1.200 or 1.500
            if re.fullmatch(r"\d{1,3}(?:\.\d{3})+", num_s):
                return int(num_s.replace(".", ""))
            if re.fullmatch(r"\d{1,3}(?:,\d{3})+", num_s):
                return int(num_s.replace(",", ""))
            num_s = num_s.replace(",", ".")
            val = float(num_s)
            return int(val) if val.is_integer() else round(val, 2)
    return None


def strip_price_token(raw_line: str) -> str:
    s = strip_invisible(raw_line)
    s = re.sub(r"(?<!\d)\d{1,4}(?:[.,]\d{3})*(?:[.,]\d{1,2})?\s*(?:€|euro\b)", " ", s, flags=re.I)
    s = re.sub(r"(?:€|\beuro\b)\s*\d{1,4}(?:[.,]\d{3})*(?:[.,]\d{1,2})?(?!\d)", " ", s, flags=re.I)
    s = re.sub(r"^[\s\-–—•*·]+", "", s)
    s = re.sub(r"\s{2,}", " ", s).strip(" \t\r\n-–—·*:,")
    return s


def classify_section_header(clean_line: str) -> str | None:
    low = strip_accents(clean_line).lower().strip("*_: ")
    if len(low) > 40:
        return None
    # Header must NOT itself contain a euro price on the same header token unless purely section label
    if re.search(r"^(?:ticket\s*online|ticket|prevendit[ae]|priority|cena|buffet|aperitiv[oi])$", low):
        return "ticket"
    if re.search(r"^(?:serata|lista|guest\s*list|ingresso\s*(?:serata|lista)?|entry)$", low):
        return "serata"
    if re.search(r"^(?:prive|tavoli|tavolo|tables?|vip\s*tables?)$", low):
        return "prive"
    if clean_line.strip().startswith("*") and clean_line.strip().endswith("*"):
        if any(k in low for k in ("ticket", "cena", "buffet", "aperitiv", "priority")):
            return "ticket"
        if any(k in low for k in ("serata", "lista", "guest", "ingresso")):
            return "serata"
        if any(k in low for k in ("prive", "tavol", "table")):
            return "prive"
    return None


def extract_offers(text: str) -> list[dict[str, Any]]:
    lines = [strip_invisible(ln).strip() for ln in text.splitlines()]
    # Group lines into sections cleanly for two-pass deadline binding
    blocks: list[tuple[str, list[str]]] = []
    cur_sec = "general"
    cur_lines: list[str] = []
    for ln in lines:
        if not ln:
            continue
        hdr = classify_section_header(ln)
        if hdr:
            if cur_lines:
                blocks.append((cur_sec, cur_lines))
            cur_sec = hdr
            cur_lines = []
        else:
            cur_lines.append(ln)
    if cur_lines:
        blocks.append((cur_sec, cur_lines))

    offers: list[dict[str, Any]] = []
    for sec, sec_lines in blocks:
        sec_blob = "\n".join(sec_lines)
        deadline_m = re.search(
            r"(?:entro(?:\s+le)?(?:\s+ore)?|fino\s+(?:a|alle)|within|until)\s*(\d{1,2})(?:[:.](\d{2}))?",
            sec_blob,
            re.IGNORECASE,
        )
        sec_until = format_hhmm(deadline_m.group(1), deadline_m.group(2)) if deadline_m else None

        for ln in sec_lines:
            price = parse_eur_price(ln)
            is_free_entry = bool(re.search(r"\b(?:omaggio|free|gratis)\b", ln, re.IGNORECASE))
            if price is None and not is_free_entry:
                continue
            if price is None and is_free_entry:
                price = 0

            low = strip_accents(ln).lower()
            remainder = sanitize_public_text(strip_price_token(ln))

            # Explicit section or line-level categorization
            eff_sec = sec
            if eff_sec == "general":
                if any(k in low for k in ("prive", "tavol", "console", "palco", "piper")):
                    eff_sec = "prive"
                elif any(k in low for k in ("donna", "uomo", "lista", "serata", "omaggio")):
                    eff_sec = "serata"
                elif any(k in low for k in ("ticket", "cena", "buffet", "drink", "priority")):
                    eff_sec = "ticket"

            if eff_sec == "serata":
                line_deadline_m = re.search(
                    r"(?:entro(?:\s+le)?(?:\s+ore)?|fino\s+(?:a|alle)|until)\s*(\d{1,2})(?:[:.](\d{2}))?",
                    ln,
                    re.IGNORECASE,
                )
                line_until = format_hhmm(line_deadline_m.group(1), line_deadline_m.group(2)) if line_deadline_m else sec_until
                if re.search(r"\bdonna\b|\bwomen\b|\blad(?:y|ies)\b", low):
                    offer: dict[str, Any] = {
                        "name": "Ingresso serata Donna",
                        "price": price,
                        "category": "guestlist",
                        "availability": "available",
                        "audience": "women",
                        "url": CANONICAL_CLUB_URL,
                    }
                    if line_until:
                        offer["admissionUntil"] = line_until
                    offers.append(offer)
                elif re.search(r"\buomo\b|\bmen\b|\bguys\b", low):
                    offer = {
                        "name": "Ingresso serata Uomo",
                        "price": price,
                        "category": "guestlist",
                        "availability": "available",
                        "url": CANONICAL_CLUB_URL,
                    }
                    if line_until:
                        offer["admissionUntil"] = line_until
                    offers.append(offer)
                else:
                    offer = {
                        "name": remainder or "Ingresso serata",
                        "price": price,
                        "category": "guestlist",
                        "availability": "available",
                        "url": CANONICAL_CLUB_URL,
                    }
                    if line_until:
                        offer["admissionUntil"] = line_until
                    offers.append(offer)
            elif eff_sec == "prive":
                lbl = re.sub(r"\bpriv[eèé]\b", "Privé", remainder, flags=re.IGNORECASE)
                if not lbl:
                    lbl = "Tavolo Privé"
                elif "privé" not in lbl.lower() and "tavol" not in lbl.lower():
                    lbl = f"Tavolo Privé {lbl}"
                elif lbl.lower().startswith("privé") and "tavolo" not in lbl.lower():
                    pass
                offers.append(
                    {
                        "name": lbl,
                        "price": price,
                        "category": "table",
                        "availability": "available",
                        "url": CANONICAL_CLUB_URL,
                    }
                )
            else:
                # ticket / cena / buffet / priority
                if not remainder:
                    lbl = "Ticket Online"
                elif re.match(r"^(?:con|\+|inclus[oi]?|drink)\b", remainder, re.IGNORECASE):
                    lbl = f"Ticket Online {remainder}"
                else:
                    lbl = remainder[0].upper() + remainder[1:]
                offers.append(
                    {
                        "name": lbl,
                        "price": price,
                        "category": "ticket",
                        "availability": "available",
                        "url": CANONICAL_CLUB_URL,
                    }
                )

    return offers


def extract_ocr_boxes(ocr: RapidOCR, img: Image.Image) -> list[dict[str, Any]]:
    arr = np.array(img.convert("RGB"))
    res, _ = ocr(arr)
    boxes: list[dict[str, Any]] = []
    if not res:
        return boxes
    for item in res:
        pts, txt, score = item[0], strip_invisible(str(item[1])), float(item[2])
        xs = [int(round(p[0])) for p in pts]
        ys = [int(round(p[1])) for p in pts]
        x1, x2 = max(0, min(xs)), min(img.width, max(xs))
        y1, y2 = max(0, min(ys)), min(img.height, max(ys))
        if txt.strip():
            boxes.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2, "text": txt.strip(), "score": score})
    boxes.sort(key=lambda b: (b["y1"], b["x1"]))
    return boxes


def derive_event_names(
    text: str,
    attachments: list[dict[str, Any]],
    ocr_boxes: list[dict[str, Any]],
    event_date: date,
) -> tuple[str, str]:
    ocr_texts = [b["text"] for b in ocr_boxes]
    ocr_blob = " ".join(ocr_texts)

    def clean_candidate(raw: str) -> str:
        s = sanitize_public_text(raw)
        # Strip leading/trailing pictographs or decorative symbols while preserving letters/digits/accents
        s = re.sub(r"^[^\w\u00C0-\u024F]+|[^\w\u00C0-\u024F!?)]+$", "", s)
        for _ in range(2):
            s = re.sub(rf"^(?:{WEEKDAY_PATTERN})\b[\s._\-|/:]*", "", s, flags=re.I)
            s = re.sub(rf"^\d{{1,2}}\s+(?:{MONTH_PATTERN})(?:\s+202\d)?[\s._\-|/:]*", "", s, flags=re.I)
            s = re.sub(r"^(?:feed|story|stories|video\d*|reel|post|locandina|flyer)[\s._\-|/:]*", "", s, flags=re.I)
        s = s.strip(" \t\r\n-–—·|/:*_.!?")
        return s

    def is_noise_title(cand: str) -> bool:
        if not cand or len(cand) < 3:
            return True
        low = strip_accents(cand).lower()
        spaceless = re.sub(r"[^a-z]", "", low)
        if any(
            k in spaceless
            for k in (
                "55club",
                "55milano",
                "clubmilano",
                "pierodellafrancesca",
                "ahoratodosquieren",
                "reservat",
                "prenotaz",
                "infoline",
            )
        ):
            return True
        if any(
            k in low
            for k in (
                "55 club",
                "55club",
                "55 milano",
                "piero della francesca",
                "xceed",
                "serata",
                "ticket",
                "prive",
                "tavol",
                "buffet",
                "aperitiv",
                "donna",
                "uomo",
                "entro le",
                "ciao",
                "marco",
                "ahora todos quieren",
                "info",
                "reservat",
                "prenotaz",
            )
        ):
            return True
        if re.fullmatch(r"(?:club|milano|milan|reggaeton|dembow|hip[\s\-]*hop|house|commercial|pop|\d+)", low):
            return True
        if len(low) <= 18 and any(
            SequenceMatcher(None, low, gw).ratio() >= 0.78
            for gw in ("reggaeton", "dembow", "commercial", "hip-hop", "house", "techno", "latino")
        ):
            return True
        if re.search(r"\b20\d{6}\b", low):
            stripped_camera = re.sub(
                r"\b(?:img\d*|image|photo|pic\d*|video\d*|media|file|doc|screenshot|wa\d*|pxl|dsc\d*|feed|story)\b",
                "",
                low,
            )
            if not re.search(r"[a-z]{3,}", stripped_camera):
                return True
        if re.fullmatch(
            r"(?:img|image|photo|pic|video|media|file|doc|screenshot|pxl|dsc|wa)[\s\-_]*\d*(?:[\s\-_]+\d+)*",
            low,
        ):
            return True
        if has_any_date_token([cand]) and len(cand.split()) <= 4:
            return True
        if "€" in cand or re.search(r"\b\d+\s*euro\b", low):
            return True
        return False

    official_name: str | None = None

    # 1. Explicit theme line in WhatsApp text before venue/offer blocks
    for raw_line in text.splitlines():
        ln = strip_invisible(raw_line).strip()
        if not ln:
            continue
        if classify_section_header(ln):
            break
        cleaned = clean_candidate(ln.strip("*_ "))
        if not is_noise_title(cleaned) and not POSITIVE_55_RE.search(cleaned):
            official_name = cleaned
            break

    # 2. OCR title match (e.g. "Noche de Perreo" when OCR shows Perreo / Noche de Perreo)
    if not official_name and re.search(r"(?:\bnoche\s*(?:de\s*)?perreo\b|\bperreo\b)", ocr_blob, re.I):
        official_name = "Noche de Perreo"

    # 3. Attachment filename stem
    if not official_name:
        for att in attachments:
            fname = strip_invisible(str(att.get("filename") or Path(str(att.get("path") or "")).name))
            stem = Path(fname).stem
            cand = clean_candidate(stem.replace(".", " ").replace("_", " "))
            if not is_noise_title(cand):
                if re.fullmatch(r"noche\s*(?:de\s*)?perreo", cand, re.I):
                    official_name = "Noche de Perreo"
                else:
                    official_name = cand
                break

    # 4. Prominent OCR headline if not date/venue/footer
    if not official_name:
        for b in ocr_boxes:
            cand = clean_candidate(b["text"])
            if not is_noise_title(cand) and len(cand) >= 5 and re.search(r"[a-zA-Z]{3,}", cand):
                official_name = cand
                break

    # 5. Deterministic Italian weekday fallback
    if not official_name:
        official_name = WEEKDAY_GENERIC_TITLE[event_date.weekday()]

    official_name = sanitize_public_text(official_name)
    if len(official_name) > 80:
        official_name = official_name[:80].rsplit(" ", 1)[0].strip()

    # shortName strictly <= 24 chars (preserve full word boundaries unless single >24 token)
    if len(official_name) <= 24:
        short_name = official_name
    else:
        words = official_name.split()
        acc: list[str] = []
        for w in words:
            candidate = " ".join(acc + [w])
            if len(candidate) <= 24:
                acc.append(w)
            else:
                break
        if acc:
            short_name = " ".join(acc).strip(" -–—·,:;.")
        else:
            short_name = official_name[:24].strip(" -–—·,:;.")

    return official_name, short_name


def compute_canonical_slug(short_name: str, official_name: str, date_display: str) -> str:
    """Exact replica of ``getOctoberEventSlug`` in ``lib/october-events/copy.ts``."""
    base_title = short_name or official_name
    stripped = strip_accents(base_title).lower()
    title_slug = re.sub(r"[^a-z0-9]+", "-", stripped).strip("-")
    return f"{title_slug}-55-milano-{date_display}"


def infer_genres(sources: list[str]) -> list[str]:
    blob = strip_accents(strip_invisible(" ".join(sources))).lower()
    genres: list[str] = []
    if re.search(r"\b(?:reggaeton|perreo|dembow)\b", blob):
        genres.extend(["Reggaeton", "Latin"])
    elif re.search(r"\b(?:latino|latin)\b", blob):
        genres.append("Latin")
    if re.search(r"\bhip[\s\-]*hop\b|\btrap\b|\brnb\b", blob):
        genres.append("Hip-Hop")
    if re.search(r"\bhouse\b|\btech\s*house\b|\bafro\s*house\b", blob):
        genres.append("House")
    if not genres:
        return ["Commercial", "House"]
    # Keep canonical Title Case, deduplicated, never adding "Hits" next to "Commercial"
    dedup: list[str] = []
    for g in genres:
        if g not in dedup:
            dedup.append(g)
    return dedup


def select_best_raster_attachment(attachments: list[dict[str, Any]]) -> Path | None:
    best_score: tuple[int, int, float, int] | None = None
    best_path: Path | None = None
    for att in attachments:
        raw_p = att.get("path")
        if not raw_p:
            continue
        p = Path(str(raw_p))
        if not p.is_file():
            continue
        if p.suffix.lower() in {".mp4", ".mov", ".m4v", ".avi", ".mkv", ".pdf", ".ogg", ".opus", ".mp3", ".wav", ".m4a"}:
            continue
        try:
            with Image.open(p) as im:
                im.verify()
            with Image.open(p) as im:
                w, h = im.size
        except Exception:
            continue
        if w < 100 or h < 100:
            continue
        fname_low = strip_invisible(str(att.get("filename") or p.name)).lower()
        not_story = 0 if re.search(r"(?<![a-z0-9])stor(?:y|ies)(?![a-z0-9])", fname_low) else 1
        is_feed = 1 if re.search(r"(?<![a-z0-9])feed(?![a-z0-9])", fname_low) else 0
        target_ratio = 1324.0 / 678.0
        aspect_score = -abs((w / max(1, h)) - target_ratio)
        score = (not_story, is_feed, aspect_score, w * h)
        if best_score is None or score > best_score:
            best_score = score
            best_path = p
    return best_path


def is_forbidden_contact_box(text: str, allow_nlm: bool = False) -> bool:
    t_raw = strip_invisible(text).strip().upper()
    if not t_raw:
        return False

    t_num = t_raw.translate(str.maketrans({"O": "0", "I": "1", "L": "1"}))
    if allow_nlm:
        scrubbed = t_num
        scrubbed = re.sub(r"(?:\+?39[\s.\-]*)?351[\s.\-]*912[\s.\-]*7047", " ", scrubbed)
        scrubbed_dom = scrubbed.translate(str.maketrans({"0": "O", "1": "I"}))
        scrubbed_dom = re.sub(r"(?:HTTPS?://)?(?:WWW\.)?NIGHTLIFEMILAN\.COM", " ", scrubbed_dom)
        scrubbed_dom = re.sub(r"\bRESERVATIONS\b", " ", scrubbed_dom)
        scrubbed_dom = re.sub(r"\bINFO\s*&?\s*VIP\s*TABLES?\b", " ", scrubbed_dom)
        scrubbed_dom = re.sub(r"\bVIA\s+P(?:IERO)?\.?\s+DELLA\s+FRANCESCA\s*,?\s*55\b", " ", scrubbed_dom)
        scrubbed_dom = re.sub(r"[\s·•\-|/:.,+*&]+", " ", scrubbed_dom).strip()
        if not scrubbed_dom:
            return False

    t_dom = t_raw.translate(str.maketrans({"0": "O", "1": "I"}))
    compact = re.sub(r"[^A-Z0-9&]", "", t_dom)
    if "NIGHTLIFEMILAN" in compact:
        return False if allow_nlm else True

    # Phone numbers (with homoglyph O->0, I->1)
    for pm in re.finditer(r"\+?\d[\d\s.\-]{6,}\d", t_num):
        digits = re.sub(r"\D", "", pm.group(0))
        if digits.endswith(OFFICIAL_PHONE_DIGITS):
            continue
        if len(digits) >= 9 and (digits.startswith(("393", "390", "3", "0"))):
            return True

    # Domains / URLs / 55MILANO
    for dm in re.finditer(r"(?:HTTPS?://)?(?:WWW\.)?[A-Z0-9-]+(?:\.[A-Z0-9-]+)+", t_dom):
        tok = dm.group(0)
        if "NIGHTLIFEMILAN" in tok:
            continue
        if re.search(r"\.(?:COM|IT|NET|ORG|ME|IO|INFO|CLUB)\b", tok) or tok.startswith(("WWW.", "HTTP")):
            return True
    if re.search(r"\b(?:55MILANO|FIFTYFIVEMILANO|XCEED|EVENTBRITE)\b", t_dom):
        return True

    # Condensed footer club handles in a single box (never matching stacked 55 / CLUB / MILANO)
    if compact in {"55CLUBMILANO", "55MILANO", "FIFTYFIVEMILANO", "55MILANOCLUB"}:
        return True

    # @handles
    if re.search(r"@[A-Z0-9_.]{3,}", t_raw):
        return True

    # Gate 4a orphan contact labels
    if any(lbl in compact for lbl in ORPHAN_CONTACT_LABELS):
        return True

    # Gate 4a truncated word fragments (exact stripped uppercase token match)
    for tok in t_dom.split():
        clean_tok = tok.strip(".,:;!?()[]{}\"'/-")
        if clean_tok in TRUNCATED_CONTACT_TOKENS:
            return True

    return False


@dataclass
class ContactCluster:
    boxes: list[dict[str, Any]] = field(default_factory=list)
    has_address: bool = False
    x1: int = 0
    y1: int = 0
    x2: int = 0
    y2: int = 0
    extra_line2: str | None = None

    def recompute_raw_bounds(self) -> None:
        self.x1 = min(b["x1"] for b in self.boxes)
        self.y1 = min(b["y1"] for b in self.boxes)
        self.x2 = max(b["x2"] for b in self.boxes)
        self.y2 = max(b["y2"] for b in self.boxes)


def box_gaps(a: tuple[int, int, int, int], b: tuple[int, int, int, int]) -> tuple[int, int]:
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    x_gap = max(0, max(ax1, bx1) - min(ax2, bx2))
    y_gap = max(0, max(ay1, by1) - min(ay2, by2))
    return x_gap, y_gap


def fit_cluster_bounds_and_width(
    cluster: ContactCluster,
    W: int,
    H: int,
    rbg: Any,
    font_bold_path: Path,
) -> None:
    cluster.recompute_raw_bounds()
    uw = max(1, cluster.x2 - cluster.x1)
    uh = max(1, cluster.y2 - cluster.y1)
    target_w = min(W, max(uw + 48, int(W * (0.86 if cluster.has_address else 0.62))))
    target_h = min(H, max(uh + 20, max(72, int(H * 0.068))))

    cx = (cluster.x1 + cluster.x2) / 2.0
    cy = (cluster.y1 + cluster.y2) / 2.0
    x1 = int(round(cx - target_w / 2.0))
    x2 = x1 + target_w
    if x1 < 0:
        x2 = min(W, x2 - x1)
        x1 = 0
    if x2 > W:
        x1 = max(0, x1 - (x2 - W))
        x2 = W

    y1 = int(round(cy - target_h / 2.0))
    y2 = y1 + target_h
    if y1 < 0:
        y2 = min(H, y2 - y1)
        y1 = 0
    if y2 > H:
        y1 = max(0, y1 - (y2 - H))
        y2 = H

    # Mirror rebuild-all-posters-zero-gomma.py exact 8-step decrement floor
    ph = max(4, y2 - y1)
    fs1_floor = max(11, max(13, min(26, int(round(ph * 0.29)))) - 7)
    fs2_floor = max(10, max(11, min(21, int(round(ph * 0.23)))) - 7)
    f1_floor = ImageFont.truetype(str(font_bold_path), fs1_floor)
    f2_floor = ImageFont.truetype(str(font_bold_path), fs2_floor)
    tr1 = max(1.0, round(fs1_floor * 0.12, 1))
    tr1_num = max(0.5, round(fs1_floor * 0.05, 1))
    tr2 = max(1.2, round(fs2_floor * 0.14, 1))
    badge_d = max(14, int(round(fs1_floor * 1.08)))
    gap = max(8, int(round(fs1_floor * 0.45)))

    w_lbl, _ = rbg.measure_tracked_text("RESERVATIONS", f1_floor, tr1)
    w_num, _ = rbg.measure_tracked_text("+39 351 912 7047", f1_floor, tr1_num)
    total_w1 = w_lbl + gap + badge_d + int(round(fs1_floor * 0.32)) + w_num

    def choose_extra_and_w2(avail_pw: int) -> tuple[str | None, float]:
        if cluster.has_address:
            for cand in ("VIA PIERO DELLA FRANCESCA 55", "VIA P. DELLA FRANCESCA 55", None):
                l2 = "WWW.NIGHTLIFEMILAN.COM" + (f" · {cand}" if cand else "")
                w2, _ = rbg.measure_tracked_text(l2, f2_floor, tr2)
                if max(total_w1, w2) <= avail_pw - 24:
                    return cand, w2
        l2_none = "WWW.NIGHTLIFEMILAN.COM"
        w2_none, _ = rbg.measure_tracked_text(l2_none, f2_floor, tr2)
        return None, w2_none

    pw = x2 - x1
    extra_line2, total_w2 = choose_extra_and_w2(pw)
    while max(total_w1, total_w2) > pw - 24:
        if x1 == 0 and x2 == W:
            break
        step = max(8, int(round((max(total_w1, total_w2) + 24 - pw) / 2.0)))
        nx1 = max(0, x1 - step)
        nx2 = min(W, x2 + step)
        if nx1 == x1 and nx2 == x2:
            break
        x1, x2 = nx1, nx2
        pw = x2 - x1
        extra_line2, total_w2 = choose_extra_and_w2(pw)

    cluster.x1, cluster.y1, cluster.x2, cluster.y2 = x1, y1, x2, y2
    cluster.extra_line2 = extra_line2


def build_and_verify_poster(
    repo: Path,
    ocr: RapidOCR,
    rbg: Any,
    wa_glyph: Image.Image,
    poster_source: Path | None,
    out_webp: Path,
    poster_target_id: str,
) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    """Builds the 1376x768 WebP card (< 280 KB) and returns (manifest, source_ocr_boxes)."""
    source_ocr_boxes: list[dict[str, Any]] = []
    stamped_plates: list[dict[str, Any]] = []

    if poster_source is not None:
        with Image.open(poster_source) as raw_im:
            im = raw_im.convert("RGB")
        W, H = im.size
        source_ocr_boxes = extract_ocr_boxes(ocr, im)

        contact_boxes = [b for b in source_ocr_boxes if is_forbidden_contact_box(b["text"])]
        if contact_boxes:
            dy_thresh = max(55, int(H * 0.06))
            dx_thresh = 60
            same_band_dy = max(20, int(H * 0.02))

            n = len(contact_boxes)
            parent = list(range(n))

            def find(i: int) -> int:
                while parent[i] != i:
                    parent[i] = parent[parent[i]]
                    i = parent[i]
                return i

            def union(i: int, j: int) -> None:
                ri, rj = find(i), find(j)
                if ri != rj:
                    parent[rj] = ri

            for i in range(n):
                bi = (contact_boxes[i]["x1"], contact_boxes[i]["y1"], contact_boxes[i]["x2"], contact_boxes[i]["y2"])
                for j in range(i + 1, n):
                    bj = (contact_boxes[j]["x1"], contact_boxes[j]["y1"], contact_boxes[j]["x2"], contact_boxes[j]["y2"])
                    xg, yg = box_gaps(bi, bj)
                    if (yg <= dy_thresh and xg <= dx_thresh) or (yg <= same_band_dy):
                        union(i, j)

            grouped: dict[int, list[dict[str, Any]]] = {}
            for idx, b in enumerate(contact_boxes):
                grouped.setdefault(find(idx), []).append(b)
            clusters = [ContactCluster(boxes=members) for members in grouped.values()]

            # Address tie-breaker across all non-contact boxes
            contact_set = {id(b) for b in contact_boxes}
            for b in source_ocr_boxes:
                if id(b) in contact_set:
                    continue
                b_dom = strip_invisible(b["text"]).upper().translate(str.maketrans({"0": "O", "1": "I"}))
                if not re.search(r"PIERO\s+DELLA\s+FRANCESCA", b_dom, re.I):
                    continue
                b_rect = (b["x1"], b["y1"], b["x2"], b["y2"])
                best_choice: tuple[tuple[int, int], ContactCluster] | None = None
                for c in clusters:
                    member_gaps = [
                        box_gaps(b_rect, (mb["x1"], mb["y1"], mb["x2"], mb["y2"]))
                        for mb in c.boxes
                    ]
                    if any(yg <= dy_thresh for _, yg in member_gaps):
                        min_yg = min(yg for _, yg in member_gaps)
                        min_xg = min(xg for xg, _ in member_gaps)
                        score = (min_yg, min_xg)
                        if best_choice is None or score < best_choice[0]:
                            best_choice = (score, c)
                if best_choice is not None:
                    best_choice[1].boxes.append(b)
                    best_choice[1].has_address = True

            for c in clusters:
                fit_cluster_bounds_and_width(c, W, H, rbg, rbg.FONT_BOLD_PATH)

            # Iterative overlap re-merge until all clusters are pairwise disjoint
            merged = True
            while merged:
                merged = False
                for i in range(len(clusters)):
                    for j in range(i + 1, len(clusters)):
                        a, b_c = clusters[i], clusters[j]
                        if max(a.x1, b_c.x1) < min(a.x2, b_c.x2) and max(a.y1, b_c.y1) < min(a.y2, b_c.y2):
                            combined = ContactCluster(
                                boxes=a.boxes + b_c.boxes,
                                has_address=a.has_address or b_c.has_address,
                            )
                            fit_cluster_bounds_and_width(combined, W, H, rbg, rbg.FONT_BOLD_PATH)
                            clusters[i] = combined
                            clusters.pop(j)
                            merged = True
                            break
                    if merged:
                        break

            for c in clusters:
                im, pm = rbg.apply_inplace_plate(
                    im, c.x1, c.y1, c.x2, c.y2, wa_glyph, extra_line2=c.extra_line2
                )
                stamped_plates.append({"file": poster_target_id, **pm})

        card = rbg.compose_couture_noir_card(im, wa_glyph)
    else:
        fallback_src = repo / "public" / "images" / "55-milano.webp"
        if not fallback_src.is_file():
            raise FileNotFoundError(f"Fallback club image missing: {fallback_src}")
        with Image.open(fallback_src) as fb_raw:
            fb = fb_raw.convert("RGB")
        fw, fh = fb.size
        cropped = fb.crop((0, 0, fw, int(fh * 0.87)))
        crop_boxes = extract_ocr_boxes(ocr, cropped)
        leaked = [
            cb["text"]
            for cb in crop_boxes
            if is_forbidden_contact_box(cb["text"], allow_nlm=False)
        ]
        if leaked:
            raise RuntimeError(f"Cropped fallback 55-milano.webp still contains contact text: {leaked}")
        card = rbg.compose_couture_noir_card(cropped, wa_glyph)

    # Verify post-composition card has zero leaked third-party contacts
    post_boxes = extract_ocr_boxes(ocr, card)
    leaked_post = [b["text"] for b in post_boxes if is_forbidden_contact_box(b["text"], allow_nlm=True)]
    if leaked_post:
        raise RuntimeError(f"Post-composition poster still has third-party contact OCR hits: {leaked_post}")

    webp_bytes = rbg.encode_webp_under_budget(card, 280_000)
    if len(webp_bytes) > 280_000:
        import io as _io

        for q in (56, 50, 44):
            buf = _io.BytesIO()
            card.save(buf, format="WEBP", quality=q, method=6)
            webp_bytes = buf.getvalue()
            if len(webp_bytes) <= 280_000:
                break
    out_webp.parent.mkdir(parents=True, exist_ok=True)
    out_webp.write_bytes(webp_bytes)

    manifest: dict[str, Any] = {
        "total_rebuilt": 1,
        "unique_masters_rendered": 1,
        "max_webp_bytes": len(webp_bytes),
        "plates": stamped_plates,
        "gruppo_b_untouched": [] if stamped_plates else [poster_target_id],
    }
    return manifest, source_ocr_boxes


def insert_slug_chronologically(route_slugs: list[str], new_slug: str, event_date_str: str) -> list[str]:
    clean = [s for s in route_slugs if s != new_slug]
    date_re = re.compile(r"-(\d{4}-\d{2}-\d{2})$")
    insert_idx = len(clean)
    for idx, existing in enumerate(clean):
        m = date_re.search(existing)
        if m and m.group(1) > event_date_str:
            insert_idx = idx
            break
    clean.insert(insert_idx, new_slug)
    return clean


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    ap = argparse.ArgumentParser(description="Prepare 55 Milano WhatsApp event and poster.")
    ap.add_argument("--input-json", required=True, help="Path to burst.json input")
    ap.add_argument("--repo", required=True, help="Path to Nightlife Milan repository")
    ap.add_argument("--manifest-out", default="", help="Output path for zero-gomma manifest JSON")
    ap.add_argument("--apply", action="store_true", help="Mutate repo inventory, routeSlugs, and poster on disk")
    args = ap.parse_args()

    if not args.apply and not args.manifest_out:
        print("ERROR: --manifest-out is required in dry-run mode (when --apply is omitted)", file=sys.stderr)
        return 2

    repo = Path(args.repo).resolve()
    burst_path = Path(args.input_json).resolve()
    burst = json.loads(burst_path.read_text(encoding="utf-8"))

    raw_text = strip_invisible(str(burst.get("text") or ""))
    attachments = list(burst.get("attachments") or [])
    all_filenames = [
        strip_invisible(str(att.get("filename") or Path(str(att.get("path") or "")).name))
        for att in attachments
    ]
    all_captions = [strip_invisible(str(att.get("caption") or "")) for att in attachments]

    ocr = RapidOCR()
    poster_source = select_best_raster_attachment(attachments)
    ocr_probe_boxes: list[dict[str, Any]] = []
    # Scan all raster attachments first for classification & completeness signals
    raster_ocr_texts: list[str] = []
    for att in attachments:
        raw_p = att.get("path")
        if not raw_p:
            continue
        p = Path(str(raw_p))
        if not p.is_file() or p.suffix.lower() in {".mp4", ".mov", ".pdf", ".ogg", ".opus", ".mp3"}:
            continue
        try:
            with Image.open(p) as im_check:
                im_rgb = im_check.convert("RGB")
            boxes = extract_ocr_boxes(ocr, im_rgb)
            raster_ocr_texts.extend(b["text"] for b in boxes)
            if poster_source is not None and p.resolve() == poster_source.resolve():
                ocr_probe_boxes = boxes
        except Exception:
            continue

    corpus_sources = [raw_text] + all_captions + all_filenames + raster_ocr_texts
    corpus = "\n".join(s for s in corpus_sources if s)

    if not POSITIVE_55_RE.search(corpus):
        status = "ignored_other_venue" if COMPETING_VENUE_RE.search(corpus) else "ignored_not_complete_event"
        reason = "competing_venue_without_55_milano" if status == "ignored_other_venue" else "missing_55_milano_signal"
        out = {"status": status, "reason": reason}
        print(json.dumps(out, ensure_ascii=False))
        return 0

    ref_dt = parse_msg_datetime(burst.get("timestamp_iso"))
    event_date = extract_event_date(corpus_sources, ref_dt.date())
    has_commercial_or_media = bool(COMMERCIAL_OR_TIME_SIGNAL_RE.search(corpus) or poster_source is not None)

    if event_date is None or not has_commercial_or_media:
        out = {
            "status": "ignored_not_complete_event",
            "reason": "missing_date_or_commercial_or_poster_signal",
        }
        print(json.dumps(out, ensure_ascii=False))
        return 0

    date_display = event_date.isoformat()
    event_id = f"55m-{date_display}"
    start_hhmm = parse_start_hhmm(raw_text, "\n".join(raster_ocr_texts))
    sh, sm = [int(x) for x in start_hhmm.split(":")]
    start_dt = datetime.combine(event_date, time(sh, sm), tzinfo=ROME_TZ)
    end_dt = datetime.combine(event_date + timedelta(days=1), time(5, 0), tzinfo=ROME_TZ)

    official_name, short_name = derive_event_names(raw_text, attachments, ocr_probe_boxes, event_date)
    canonical_slug = compute_canonical_slug(short_name, official_name, date_display)
    it_slug = f"festa-milano-{canonical_slug}"

    offers = extract_offers(raw_text)
    if not offers:
        offers = [
            {
                "name": "Ingresso serata Donna / Uomo",
                "price": None,
                "category": "guestlist",
                "availability": "available",
                "url": CANONICAL_CLUB_URL,
            },
            {
                "name": "Tavolo Privé",
                "price": None,
                "category": "table",
                "availability": "available",
                "url": CANONICAL_CLUB_URL,
            },
        ]

    genres = infer_genres(corpus_sources)

    rbg = load_zero_gomma_helpers(repo)
    wa_glyph = Image.open(rbg.WA_GLYPH_PATH).convert("RGBA")

    if args.apply:
        poster_rel = f"public/images/events/october-2026/{canonical_slug}.webp"
        out_webp = repo / poster_rel
        poster_target_id = poster_rel
    else:
        manifest_out_path = Path(args.manifest_out).resolve()
        out_webp = manifest_out_path.parent / f"{canonical_slug}.webp"
        poster_rel = ""
        poster_target_id = str(out_webp)

    manifest, _ = build_and_verify_poster(
        repo=repo,
        ocr=ocr,
        rbg=rbg,
        wa_glyph=wa_glyph,
        poster_source=poster_source,
        out_webp=out_webp,
        poster_target_id=poster_target_id,
    )

    if args.manifest_out:
        manifest_path = Path(args.manifest_out).resolve()
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    webp_raw = out_webp.read_bytes()
    webp_len = len(webp_raw)
    webp_sha = hashlib.sha256(webp_raw).hexdigest()
    now_utc = datetime.now(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%S.000Z")

    record: dict[str, Any] = {
        "id": event_id,
        "sourceUrl": CANONICAL_CLUB_URL,
        "sourceScope": "dated-calendar",
        "officialName": official_name,
        "shortName": short_name,
        "startISO": start_dt.isoformat(),
        "endISO": end_dt.isoformat(),
        "startTimeKnown": True,
        "timeKind": "announced",
        "venue": CANONICAL_VENUE,
        "affiliateUrl": None,
        "affiliateStatus": "unavailable",
        "image": {
            "src": f"/images/events/october-2026/{canonical_slug}.webp",
            "width": 1376,
            "height": 768,
            "bytes": webp_len,
            "sha256": webp_sha,
        },
        "age": "18+",
        "dressCode": "Elegant",
        "genres": genres,
        "performers": [],
        "offers": offers,
        "provenance": f"nightlifemilan-whatsapp-55milano · {burst.get('run_id', date_display)}",
        "commercialCheckedAt": now_utc,
    }

    if not args.apply:
        result = {
            "status": "prepared",
            "reason": "dry_run_ready",
            "event_id": event_id,
            "canonical_slug": canonical_slug,
            "it_slug": it_slug,
            "official_name": official_name,
            "date_display": date_display,
            "poster_rel": "",
            "poster_abs": str(out_webp),
            "changed_files": [],
            "deleted_files": [],
        }
        print(json.dumps(result, ensure_ascii=False))
        return 0

    inv_path = repo / "lib" / "october-events" / "inventory.json"
    slugs_path = repo / "lib" / "october-events" / "routeSlugs.json"
    inv_data = json.loads(inv_path.read_text(encoding="utf-8"))
    route_slugs = json.loads(slugs_path.read_text(encoding="utf-8"))

    events_list: list[dict[str, Any]] = inv_data.get("events", [])
    existing_idx = next((i for i, ev in enumerate(events_list) if ev.get("id") == event_id), None)

    deleted_files: list[str] = []
    if existing_idx is not None:
        old_ev = events_list[existing_idx]
        old_short = old_ev.get("shortName") or ""
        old_off = old_ev.get("officialName") or ""
        old_date = str(old_ev.get("startISO") or "")[:10]
        old_slug = compute_canonical_slug(old_short, old_off, old_date) if old_date else ""

        # Preserve commercialCheckedAt if substantive event fields match unchanged
        old_cmp = {k: v for k, v in old_ev.items() if k not in {"commercialCheckedAt", "provenance"}}
        new_cmp = {k: v for k, v in record.items() if k not in {"commercialCheckedAt", "provenance"}}
        if old_cmp == new_cmp and canonical_slug in route_slugs:
            result = {
                "status": "unchanged",
                "reason": "identical_event_record",
                "event_id": event_id,
                "canonical_slug": canonical_slug,
                "it_slug": it_slug,
                "official_name": official_name,
                "date_display": date_display,
                "poster_rel": poster_rel,
                "poster_abs": str(out_webp),
                "changed_files": [],
                "deleted_files": [],
            }
            print(json.dumps(result, ensure_ascii=False))
            return 0

        events_list[existing_idx] = record
        if old_slug and old_slug != canonical_slug:
            still_referenced = any(
                compute_canonical_slug(e.get("shortName") or "", e.get("officialName") or "", str(e.get("startISO") or "")[:10])
                == old_slug
                for e in events_list
            )
            if not still_referenced:
                route_slugs = [s for s in route_slugs if s != old_slug]
                old_webp_rel = f"public/images/events/october-2026/{old_slug}.webp"
                old_webp_abs = repo / old_webp_rel
                if old_webp_abs.is_file() and old_webp_abs.resolve() != out_webp.resolve():
                    old_webp_abs.unlink()
                    deleted_files.append(old_webp_rel)
    else:
        events_list.append(record)

    events_list.sort(key=lambda e: (str(e.get("startISO") or ""), str(e.get("id") or "")))
    inv_data["events"] = events_list
    inv_path.write_text(json.dumps(inv_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    route_slugs = insert_slug_chronologically(route_slugs, canonical_slug, date_display)
    slugs_path.write_text(json.dumps(route_slugs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    changed_files = [
        "lib/october-events/inventory.json",
        "lib/october-events/routeSlugs.json",
        poster_rel,
    ]
    result = {
        "status": "prepared",
        "reason": "upserted_55_milano_event",
        "event_id": event_id,
        "canonical_slug": canonical_slug,
        "it_slug": it_slug,
        "official_name": official_name,
        "date_display": date_display,
        "poster_rel": poster_rel,
        "poster_abs": str(out_webp),
        "changed_files": changed_files,
        "deleted_files": deleted_files,
    }
    print(json.dumps(result, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
