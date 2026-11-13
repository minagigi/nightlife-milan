'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import {
  isSiteWhatsAppUrl,
  normalizeWhatsAppHrefForPage,
  resolveFullPageUrl,
  resolveWhatsAppLocale,
} from '@/lib/conciergeBooking';

const WHATSAPP_RE = /\/\/(wa\.me|api\.whatsapp\.com)\//i;

function syncDocumentWhatsAppLinks(currentPath?: string) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const pageUrl = currentPath
    ? resolveFullPageUrl(`${currentPath}${window.location.search || ''}`, resolveWhatsAppLocale(currentPath))
    : resolveFullPageUrl(window.location.href, resolveWhatsAppLocale(window.location.pathname));
  const locale = resolveWhatsAppLocale(currentPath || window.location.pathname);

  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href]');
  anchors.forEach((a) => {
    const rawHref = a.getAttribute('href');
    if (!rawHref || !isSiteWhatsAppUrl(rawHref)) return;
    const normalized = normalizeWhatsAppHrefForPage(rawHref, locale, pageUrl);
    if (normalized && normalized !== rawHref) {
      a.setAttribute('href', normalized);
    }
  });
}

/**
 * Tracker globale montato una volta nel layout:
 * - pageview a ogni navigazione (l'App Router non ricarica la pagina, quindi
 *   serve ascoltare il pathname, non solo il primo mount);
 * - normalizzazione universale di tutti i link WhatsApp (+39 351 912 7047)
 *   nella lingua esatta della pagina e con il link completo della pagina;
 * - delega dei click a livello documento per i link in uscita verso
 *   WhatsApp / Xceed / Eventbrite.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    syncDocumentWhatsAppLinks(pathname || undefined);
    if (!document.body) return;
    let rafId = 0;
    const observer = new MutationObserver(() => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        syncDocumentWhatsAppLinks(pathname || undefined);
      });
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

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
      const rawHref = a.getAttribute('href') || a.href;
      if (isSiteWhatsAppUrl(rawHref)) {
        const locale = resolveWhatsAppLocale(window.location.pathname);
        const pageUrl = resolveFullPageUrl(window.location.href, locale);
        const normalized = normalizeWhatsAppHrefForPage(rawHref, locale, pageUrl);
        if (normalized && normalized !== rawHref) {
          a.setAttribute('href', normalized);
        }
      }
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
