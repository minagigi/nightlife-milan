'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const WHATSAPP_RE = /\/\/(wa\.me|api\.whatsapp\.com)\//i;

/**
 * Tracker globale montato una volta nel layout:
 * - pageview a ogni navigazione (l'App Router non ricarica la pagina, quindi
 *   serve ascoltare il pathname, non solo il primo mount);
 * - delega dei click a livello documento per i link in uscita verso
 *   WhatsApp / Xceed / Eventbrite — copre TUTTE le CTA presenti e future,
 *   anche nei server component dove non si può chiamare trackEvent inline.
 *   `data-analytics-source` sull'anchor (opzionale) etichetta la sorgente.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // La dashboard interna non si auto-conta
    if (!pathname || pathname.includes('/analytics')) return;
    trackEvent('pageview', {
      page_path: pathname,
      referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
    });
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href;
      const source = a.getAttribute('data-analytics-source') || 'link';
      const page_path = window.location.pathname;

      if (WHATSAPP_RE.test(href)) {
        trackEvent('whatsapp_click', { source, page_path });
      } else if (href.includes('xceed.me')) {
        trackEvent('xceed_click', { source, page_path });
      } else if (href.includes('eventbrite.')) {
        trackEvent('eventbrite_click', { source, page_path });
      }
    }
    // capture: intercetta anche i link che aprono in nuova tab prima della navigazione
    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
