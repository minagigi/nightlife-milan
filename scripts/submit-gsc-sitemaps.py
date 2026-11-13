#!/usr/bin/env python3
"""Validate all 7 live Nightlife Milan XML sitemaps, submit them to Google
Search Console (sc-domain:nightlifemilan.com), verify GSC read-back state,
and optionally inspect key strategic URLs via the URL Inspection API.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

SEO_SCRIPTS_DIR = Path(r"C:\Users\minag\.claude\skills\seo\scripts")
if str(SEO_SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SEO_SCRIPTS_DIR))

import google_auth  # noqa: E402
from googleapiclient.discovery import build  # noqa: E402

SITE_ORIGIN = "https://nightlifemilan.com"
GSC_PROPERTY = "sc-domain:nightlifemilan.com"
GOOGLEBOT_UA = "Googlebot/2.1 (+http://www.google.com/bot.html)"

CHILD_SITEMAPS = [
    f"{SITE_ORIGIN}/sitemap-core.xml",
    f"{SITE_ORIGIN}/sitemap-clubs.xml",
    f"{SITE_ORIGIN}/sitemap-capodanno.xml",
    f"{SITE_ORIGIN}/sitemap-events.xml",
    f"{SITE_ORIGIN}/sitemap-guides.xml",
]

ALL_SITEMAPS = [
    f"{SITE_ORIGIN}/sitemap-index.xml",
    f"{SITE_ORIGIN}/sitemap.xml",
    *CHILD_SITEMAPS,
]

STRATEGIC_INSPECT_URLS = [
    f"{SITE_ORIGIN}/",
    f"{SITE_ORIGIN}/clubs",
    f"{SITE_ORIGIN}/events",
    f"{SITE_ORIGIN}/football-afterparties",
    f"{SITE_ORIGIN}/new-years-eve",
    f"{SITE_ORIGIN}/clubs/just-me-milano",
]


class _NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: N802
        return None


def fetch_raw_xml(url: str, timeout: int = 30) -> tuple[int, str, str]:
    opener = urllib.request.build_opener(_NoRedirectHandler)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": GOOGLEBOT_UA,
            "Accept": "application/xml, text/xml;q=0.9, */*;q=0.8",
        },
    )
    with opener.open(req, timeout=timeout) as resp:
        status = int(resp.status)
        content_type = resp.headers.get("Content-Type", "")
        body = resp.read().decode("utf-8", errors="replace")
        return status, content_type, body


def _local_tag(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def validate_live_sitemaps(min_release_date: str = "2026-11-13") -> dict:
    errors: list[str] = []
    sitemap_details: dict[str, dict] = {}
    urlsets_by_feed: dict[str, set[str]] = {}

    for sitemap_url in ALL_SITEMAPS:
        status, content_type, body = fetch_raw_xml(sitemap_url)
        if status != 200:
            errors.append(f"{sitemap_url}: expected HTTP 200, got {status}")
            continue
        if "xml" not in content_type.lower():
            errors.append(f"{sitemap_url}: unexpected Content-Type '{content_type}'")

        try:
            root = ET.fromstring(body)
        except ET.ParseError as exc:
            errors.append(f"{sitemap_url}: XML parse error: {exc}")
            continue

        root_name = _local_tag(root.tag)
        if sitemap_url.endswith("/sitemap-index.xml"):
            if root_name != "sitemapindex":
                errors.append(f"{sitemap_url}: expected <sitemapindex>, got <{root_name}>")
                continue
            locs: list[str] = []
            lastmods: list[str] = []
            for elem in root:
                if _local_tag(elem.tag) != "sitemap":
                    continue
                loc_text = ""
                lm_text = ""
                for child in elem:
                    cname = _local_tag(child.tag)
                    if cname == "loc" and child.text:
                        loc_text = child.text.strip()
                    elif cname == "lastmod" and child.text:
                        lm_text = child.text.strip()
                if loc_text:
                    locs.append(loc_text)
                if lm_text:
                    lastmods.append(lm_text)
            if set(locs) != set(CHILD_SITEMAPS):
                errors.append(
                    f"{sitemap_url}: child locs mismatch: got {locs}, expected {CHILD_SITEMAPS}"
                )
            max_lm = max(lastmods) if lastmods else ""
            if max_lm[:10] < min_release_date:
                errors.append(
                    f"{sitemap_url}: max <lastmod> '{max_lm}' < {min_release_date}"
                )
            sitemap_details[sitemap_url] = {
                "type": "sitemapindex",
                "httpStatus": status,
                "bytes": len(body.encode("utf-8")),
                "childCount": len(locs),
                "maxLastmod": max_lm,
            }
            continue

        if root_name != "urlset":
            errors.append(f"{sitemap_url}: expected <urlset>, got <{root_name}>")
            continue

        has_changefreq = "<changefreq>" in body
        has_priority = "<priority>" in body
        if has_changefreq or has_priority:
            errors.append(
                f"{sitemap_url}: non-compact bloat detected (changefreq={has_changefreq}, priority={has_priority})"
            )

        urls: set[str] = set()
        lastmods: list[str] = []
        below_floor: list[str] = []
        nov1_urls: list[str] = []
        stale_non_nov1: list[str] = []

        for elem in root:
            if _local_tag(elem.tag) != "url":
                continue
            loc_text = ""
            lm_text = ""
            for child in elem:
                cname = _local_tag(child.tag)
                if cname == "loc" and child.text:
                    loc_text = child.text.strip()
                elif cname == "lastmod" and child.text:
                    lm_text = child.text.strip()
            if loc_text:
                urls.add(loc_text)
            lm_day = lm_text[:10] if lm_text else ""
            if lm_day:
                lastmods.append(lm_day)
            if lm_day < "2026-11-01":
                below_floor.append(f"{loc_text}={lm_day}")
            elif lm_day == "2026-11-01":
                nov1_urls.append(loc_text)
            elif lm_day < min_release_date:
                stale_non_nov1.append(f"{loc_text}={lm_day}")

        if below_floor:
            errors.append(
                f"{sitemap_url}: {len(below_floor)} URLs have lastmod < 2026-11-01 (sample: {below_floor[:3]})"
            )
        expects_70_legal = sitemap_url.endswith(("/sitemap.xml", "/sitemap-core.xml"))
        expected_nov1 = 70 if expects_70_legal else 0
        if len(nov1_urls) != expected_nov1:
            errors.append(
                f"{sitemap_url}: expected {expected_nov1} URLs at 2026-11-01 (localized legal pages), got {len(nov1_urls)}"
            )
        if stale_non_nov1:
            errors.append(
                f"{sitemap_url}: {len(stale_non_nov1)} non-legal URLs have lastmod between 2026-11-01 and {min_release_date} (sample: {stale_non_nov1[:3]})"
            )

        urlsets_by_feed[sitemap_url] = urls
        sitemap_details[sitemap_url] = {
            "type": "urlset",
            "httpStatus": status,
            "bytes": len(body.encode("utf-8")),
            "urlCount": len(urls),
            "compact": not (has_changefreq or has_priority),
            "minLastmod": min(lastmods) if lastmods else "",
            "maxLastmod": max(lastmods) if lastmods else "",
        }

    mono_url = f"{SITE_ORIGIN}/sitemap.xml"
    mono_urls = urlsets_by_feed.get(mono_url, set())
    union_children: set[str] = set()
    overlap_count = 0
    for child in CHILD_SITEMAPS:
        cset = urlsets_by_feed.get(child, set())
        overlap_count += len(union_children & cset)
        union_children |= cset

    if overlap_count > 0:
        errors.append(f"Child sitemaps overlap on {overlap_count} URLs")
    if mono_urls != union_children:
        errors.append(
            f"Parity mismatch: sitemap.xml ({len(mono_urls)}) vs child union ({len(union_children)})"
        )
    if len(mono_urls) < 15000:
        errors.append(f"Unexpected low URL count in sitemap.xml: {len(mono_urls)}")

    return {
        "ok": len(errors) == 0,
        "errors": errors,
        "totalCanonicalUrls": len(mono_urls),
        "childUnionUrls": len(union_children),
        "childOverlapCount": overlap_count,
        "sitemaps": sitemap_details,
    }


def _load_gsc_credentials():
    scopes = [google_auth.SCOPES["gsc_write"]]
    creds = None
    try:
        creds = google_auth.get_oauth_credentials(scopes)
    except Exception:
        creds = None
    if creds is None:
        creds = google_auth.get_service_account_credentials(scopes)
    if creds is None:
        raise RuntimeError(
            "Unable to load Google Search Console credentials from google_auth.py"
        )
    return creds


def submit_and_verify_gsc(property_uri: str, skip_inspect: bool = False) -> dict:
    creds = _load_gsc_credentials()
    webmasters = build("webmasters", "v3", credentials=creds, cache_discovery=False)

    submitted: list[dict] = []
    for sitemap_url in ALL_SITEMAPS:
        webmasters.sitemaps().submit(siteUrl=property_uri, feedpath=sitemap_url).execute()
        submitted.append({"feedpath": sitemap_url, "submitted": True})

    listed_raw = webmasters.sitemaps().list(siteUrl=property_uri).execute()
    entries_by_path = {
        item.get("path"): item for item in listed_raw.get("sitemap", []) if item.get("path")
    }

    today_utc = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d")
    readback_errors: list[str] = []
    verified_sitemaps: list[dict] = []

    for sitemap_url in ALL_SITEMAPS:
        item = entries_by_path.get(sitemap_url)
        if not item:
            readback_errors.append(f"Missing sitemap in GSC read-back: {sitemap_url}")
            continue
        err_count = int(item.get("errors", 0) or 0)
        warn_count = int(item.get("warnings", 0) or 0)
        last_submitted = str(item.get("lastSubmitted", ""))
        if not last_submitted.startswith(today_utc):
            readback_errors.append(
                f"{sitemap_url}: expected lastSubmitted starting with {today_utc}, got '{last_submitted}'"
            )
        if err_count > 0:
            readback_errors.append(f"{sitemap_url}: GSC errors={err_count}")
        if warn_count > 0:
            readback_errors.append(f"{sitemap_url}: GSC warnings={warn_count}")

        verified_sitemaps.append(
            {
                "path": sitemap_url,
                "lastSubmitted": last_submitted,
                "lastDownloaded": item.get("lastDownloaded"),
                "isPending": bool(item.get("isPending", False)),
                "isSitemapsIndex": bool(item.get("isSitemapsIndex", False)),
                "errors": err_count,
                "warnings": warn_count,
                "contents": item.get("contents", []),
            }
        )

    inspections: list[dict] = []
    if not skip_inspect:
        sc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
        for target_url in STRATEGIC_INSPECT_URLS:
            try:
                res = (
                    sc.urlInspection()
                    .index()
                    .inspect(
                        body={
                            "inspectionUrl": target_url,
                            "siteUrl": property_uri,
                            "languageCode": "it",
                        }
                    )
                    .execute()
                )
                idx = (res.get("inspectionResult") or {}).get("indexStatusResult") or {}
                inspections.append(
                    {
                        "url": target_url,
                        "coverageState": idx.get("coverageState"),
                        "verdict": idx.get("verdict"),
                        "indexingState": idx.get("indexingState"),
                        "lastCrawlTime": idx.get("lastCrawlTime"),
                        "googleCanonical": idx.get("googleCanonical"),
                        "userCanonical": idx.get("userCanonical"),
                        "sitemaps": idx.get("sitemap", []),
                    }
                )
            except Exception as exc:
                inspections.append({"url": target_url, "error": str(exc)})

    return {
        "ok": len(readback_errors) == 0,
        "property": property_uri,
        "todayUtc": today_utc,
        "submittedCount": len(submitted),
        "verifiedCount": len(verified_sitemaps),
        "errors": readback_errors,
        "sitemaps": verified_sitemaps,
        "urlInspections": inspections,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate all 7 Nightlife Milan sitemaps and submit them to Google Search Console."
    )
    parser.add_argument("--property", default=GSC_PROPERTY, help="Search Console property URI")
    parser.add_argument("--min-date", default="2026-11-13", help="Expected YYYY-MM-DD floor for updated URLs")
    parser.add_argument("--dry-run", action="store_true", help="Validate live XML only without calling GSC submit")
    parser.add_argument("--skip-inspect", action="store_true", help="Skip URL Inspection calls after submitting sitemaps")
    parser.add_argument("--out", default="", help="Optional path to write JSON report")
    args = parser.parse_args()

    live_check = validate_live_sitemaps(min_release_date=args.min_date)
    result: dict = {
        "checkedAtUtc": dt.datetime.now(dt.timezone.utc).isoformat(),
        "liveValidation": live_check,
        "gscSubmission": None,
    }

    exit_code = 0 if live_check["ok"] else 1
    if live_check["ok"] and not args.dry_run:
        gsc_res = submit_and_verify_gsc(args.property, skip_inspect=args.skip_inspect)
        result["gscSubmission"] = gsc_res
        if not gsc_res["ok"]:
            exit_code = 1

    payload = json.dumps(result, indent=2, ensure_ascii=False)
    if args.out:
        out_path = Path(args.out)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(payload + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "liveOk": live_check["ok"],
                "totalCanonicalUrls": live_check["totalCanonicalUrls"],
                "liveErrors": live_check["errors"],
                "gscOk": None if result["gscSubmission"] is None else result["gscSubmission"]["ok"],
                "gscErrors": [] if result["gscSubmission"] is None else result["gscSubmission"]["errors"],
                "submittedCount": 0 if result["gscSubmission"] is None else result["gscSubmission"]["submittedCount"],
            },
            ensure_ascii=False,
        )
    )
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
