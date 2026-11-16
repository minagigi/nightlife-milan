'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { OrderAttribution } from '@/lib/single-pass/types';

const ATTR_STORAGE_KEY = 'nlm_attribution_v1';

type StoredAttribution = Partial<OrderAttribution>;

export function readClientAttribution(): Partial<OrderAttribution> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(ATTR_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoredAttribution;
  } catch {
    return {};
  }
}

export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !pathname) return;
    try {
      const existing = readClientAttribution();
      const nowIso = new Date().toISOString();
      const searchStr = searchParams?.toString();
      const currentFull = searchStr ? `${pathname}?${searchStr}` : pathname;

      const utmSource = searchParams?.get('utm_source') || existing.utmSource;
      const utmMedium = searchParams?.get('utm_medium') || existing.utmMedium;
      const utmCampaign = searchParams?.get('utm_campaign') || existing.utmCampaign;
      const utmTerm = searchParams?.get('utm_term') || existing.utmTerm;
      const utmContent = searchParams?.get('utm_content') || existing.utmContent;
      const clickId =
        searchParams?.get('gclid') ||
        searchParams?.get('fbclid') ||
        searchParams?.get('ttclid') ||
        existing.clickId;

      const journey = Array.isArray(existing.journeyPaths) ? [...existing.journeyPaths] : [];
      if (journey[journey.length - 1] !== pathname) {
        journey.push(pathname);
      }
      const trimmedJourney = journey.slice(-12);

      const next: StoredAttribution = {
        firstLandingPath: existing.firstLandingPath || currentFull.slice(0, 200),
        firstLandingAt: existing.firstLandingAt || nowIso,
        initialReferrer: existing.initialReferrer || document.referrer || 'direct',
        ...(utmSource ? { utmSource } : {}),
        ...(utmMedium ? { utmMedium } : {}),
        ...(utmCampaign ? { utmCampaign } : {}),
        ...(utmTerm ? { utmTerm } : {}),
        ...(utmContent ? { utmContent } : {}),
        ...(clickId ? { clickId } : {}),
        journeyPaths: trimmedJourney,
        browserLanguage: navigator.language || existing.browserLanguage,
      };

      localStorage.setItem(ATTR_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore private-mode storage errors
    }
  }, [pathname, searchParams]);

  return null;
}
