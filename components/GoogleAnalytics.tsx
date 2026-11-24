'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ensureGoogleAnalyticsLoaded } from '@/lib/analytics';

const IMMEDIATE_LOAD_SEGMENT_RE = /\/(cart|carrello|checkout|cassa|thank-you)(\/|$)/i;

/**
 * Mantiene il caricamento alla prima interazione sulle pagine SEO pubbliche
 * (Lighthouse ~100), ma carica immediatamente gtag.js sulle tappe transazionali
 * (carrello, checkout, thank-you) per garantire il recapito degli eventi d'acquisto.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && IMMEDIATE_LOAD_SEGMENT_RE.test(pathname)) {
      ensureGoogleAnalyticsLoaded();
      return;
    }

    const events = ['scroll', 'mousemove', 'touchstart', 'keydown', 'pointerdown'] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, onInteract));

    function onInteract() {
      cleanup();
      ensureGoogleAnalyticsLoaded();
    }

    events.forEach((e) => window.addEventListener(e, onInteract, { once: true, passive: true }));
    return cleanup;
  }, [pathname]);

  return null;
}
