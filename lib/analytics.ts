'use client';

/**
 * Tracking eventi lato client — doppia scrittura:
 * 1. GA4 (gtag) — per l'analisi ricca dentro Google Analytics.
 * 2. First-party (/api/track, Vercel Blob) — alimenta la dashboard interna
 *    /analytics, che così non dipende dalla GA4 Data API (niente service
 *    account) e non soffre gli ad-blocker che bloccano googletagmanager.
 *
 * gtag.js viene caricato lazy alla prima interazione (GoogleAnalytics.tsx):
 * qui replichiamo lo stesso stub a coda — gli argomenti accodati prima del
 * load vengono processati da gtag.js all'arrivo, quindi nessun evento si perde.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'pageview'
  | 'whatsapp_click'
  | 'booking_form_submit'
  | 'xceed_click'
  | 'eventbrite_click';

export function trackEvent(name: AnalyticsEventName, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === 'undefined') return;
  try {
    // GA4 — il pageview lo gestisce già gtag('config') al load, non duplicarlo
    if (name !== 'pageview') {
      if (!window.gtag) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
          window.dataLayer!.push(arguments);
        };
      }
      window.gtag('event', name, params);
    }

    // First-party — sendBeacon sopravvive alla navigazione via link esterno
    const body = JSON.stringify({ name, params, path: window.location.pathname });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', body);
    } else {
      fetch('/api/track', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    // il tracking non deve mai rompere la UI
  }
}
