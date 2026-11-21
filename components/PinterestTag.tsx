'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  MARKETING_CONSENT_EVENT,
  PINTEREST_CORE_SRC,
  PINTEREST_ENABLED,
  PINTEREST_TAG_ID,
  getMarketingConsentCopy,
  pinterestLeadType,
  readMarketingConsent,
  writeMarketingConsent,
  type MarketingConsent,
} from '@/lib/pinterest';

type Pintrk = ((...args: unknown[]) => void) & { queue?: unknown[][]; version?: string };

declare global {
  interface Window {
    pintrk?: Pintrk;
  }
}

/** Snippet base ufficiale Pinterest, senza enhanced match (nessun dato personale). */
function loadPinterestTag() {
  if (typeof window === 'undefined' || window.pintrk) return;
  const queue: unknown[][] = [];
  const stub = ((...args: unknown[]) => {
    queue.push(args);
  }) as Pintrk;
  stub.queue = queue;
  stub.version = '3.0';
  window.pintrk = stub;
  const s = document.createElement('script');
  s.async = true;
  s.src = PINTEREST_CORE_SRC;
  document.head.appendChild(s);
  window.pintrk('load', PINTEREST_TAG_ID);
  window.pintrk('page');
}

function subscribeConsent(onChange: () => void) {
  window.addEventListener(MARKETING_CONSENT_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(MARKETING_CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/**
 * Pinterest Tag con consenso marketing.
 * - Senza NEXT_PUBLIC_PINTEREST_TAG_ID: non rende nulla e non carica nulla.
 * - Con Tag ID: banner di consenso (solo marketing) finche' l'utente non sceglie;
 *   core.js solo dopo "Accetta"; pagevisit a ogni navigazione; lead su Xceed/WhatsApp.
 */
export default function PinterestTag({ locale }: { locale: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore<MarketingConsent | 'unknown'>(
    subscribeConsent,
    () => (PINTEREST_ENABLED ? readMarketingConsent() : 'unknown'),
    () => 'unknown',
  );
  const lastTrackedPath = useRef<string | null>(null);

  const granted = PINTEREST_ENABLED && consent === 'granted';

  useEffect(() => {
    if (!granted || !pathname || pathname.includes('/analytics')) return;
    loadPinterestTag();
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    window.pintrk?.('track', 'pagevisit');
  }, [granted, pathname]);

  useEffect(() => {
    if (!granted) return;
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const leadType = pinterestLeadType(a.getAttribute('href') || a.href || '');
      if (!leadType) return;
      window.pintrk?.('track', 'lead', { lead_type: leadType });
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [granted]);

  if (!PINTEREST_ENABLED || consent !== null) return null;

  const copy = getMarketingConsentCopy(locale);
  return (
    <div
      role="region"
      aria-label={copy.policy}
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl border border-[#EDEBE6]/25 bg-[#0A0A0C] p-4 text-[#EDEBE6] shadow-2xl sm:bottom-5 sm:p-5"
    >
      <p className="text-sm leading-relaxed text-[#EDEBE6]">
        {copy.text}{' '}
        <Link href={`${localePrefix(locale)}/cookie-policy`} locale={locale} className="font-semibold text-[#FFFFFF] underline underline-offset-2">
          {copy.policy}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => writeMarketingConsent('granted')}
          className="min-h-[44px] flex-1 border border-[#EDEBE6] bg-[#EDEBE6] px-4 text-sm font-semibold text-[#0A0A0C] hover:bg-[#FFFFFF] hover:text-[#0A0A0C]"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={() => writeMarketingConsent('denied')}
          className="min-h-[44px] flex-1 border border-[#EDEBE6] bg-[#0A0A0C] px-4 text-sm font-semibold text-[#EDEBE6] hover:bg-[#1A1A1E] hover:text-[#FFFFFF]"
        >
          {copy.reject}
        </button>
      </div>
    </div>
  );
}

/** Pulsante per revocare/cambiare la scelta (pagina Cookie Policy). Inerte senza Tag ID. */
export function MarketingConsentManager({ locale }: { locale: string }) {
  if (!PINTEREST_ENABLED) return null;
  const copy = getMarketingConsentCopy(locale);
  return (
    <div className="w-full bg-[#050505] px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => writeMarketingConsent(null)}
          className="min-h-[44px] border border-[#EDEBE6] bg-[#0A0A0C] px-5 text-sm font-semibold text-[#EDEBE6] hover:bg-[#1A1A1E] hover:text-[#FFFFFF]"
        >
          {copy.manage}
        </button>
      </div>
    </div>
  );
}
