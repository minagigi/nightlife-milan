'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONTACT } from '@/config/contact';
import { ALL_EVENT_DIR_TOKENS, resolveLocalizedDirToCanonical } from '@/lib/i18n/dirTokens35';
import { CAPODANNO_CATEGORY_IDS, resolveCapodannoCategoryIdByLocalizedSlug } from '@/lib/capodanno/routes';
import {
  getWhatsAppConciergeBubbleCopy,
  type WhatsAppPageKind,
} from '@/lib/i18n/whatsappConciergeBubble35';
import { LOCALES } from '@/lib/i18n/locales';

const SESSION_KEY = 'nlm_wa_bubble_closed';
const CROSS_TAB_UNTIL_KEY = 'nlm_wa_bubble_closed_until';
const SESSION_SLIDING_TTL_MS = 8 * 60 * 60 * 1000;
const AUTO_OPEN_DELAY_MS = 7000;

const LOCALE_SET = new Set<string>(LOCALES.map((l) => l.code));
const EVENT_DIR_SET = new Set<string>(ALL_EVENT_DIR_TOKENS.map((d) => d.toLowerCase()));
const CAPODANNO_CAT_SET = new Set<string>(CAPODANNO_CATEGORY_IDS);

function isDismissedInCurrentSession(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
      return true;
    }
    const rawUntil = window.localStorage.getItem(CROSS_TAB_UNTIL_KEY);
    if (rawUntil) {
      const until = Number(rawUntil);
      if (Number.isFinite(until) && until > Date.now()) {
        window.sessionStorage.setItem(SESSION_KEY, '1');
        return true;
      }
      if (Number.isFinite(until) && until <= Date.now()) {
        window.localStorage.removeItem(CROSS_TAB_UNTIL_KEY);
      }
    }
  } catch {
    // Storage restricted (e.g. private sandbox)
  }
  return false;
}

function persistSessionDismissal(): void {
  try {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(SESSION_KEY, '1');
    window.localStorage.setItem(CROSS_TAB_UNTIL_KEY, String(Date.now() + SESSION_SLIDING_TTL_MS));
  } catch {
    // Ignore storage errors
  }
}

function refreshSlidingDismissalIfActive(): void {
  try {
    if (typeof window === 'undefined') return;
    if (isDismissedInCurrentSession()) {
      window.localStorage.setItem(CROSS_TAB_UNTIL_KEY, String(Date.now() + SESSION_SLIDING_TTL_MS));
    }
  } catch {
    // Ignore storage errors
  }
}

function clampContextSubject(raw: string): string {
  const cleaned = raw
    .replace(/\s+/g, ' ')
    .replace(/\s*[|·—–-]\s*Nightlife Milan.*$/i, '')
    .trim();
  const colonIdx = cleaned.search(/\s*:\s+/);
  const concise =
    colonIdx >= 22 && cleaned.length > 56 ? cleaned.slice(0, colonIdx).trim() : cleaned;
  if (concise.length <= 58) return concise;
  const sliced = concise.slice(0, 56);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = (lastSpace > 28 ? sliced.slice(0, lastSpace) : sliced)
    .replace(/[:;,.·—–-]+\s*$/u, '')
    .trim();
  return `${base}…`;
}

function detectPageContext(pathname: string, locale: string): { kind: WhatsAppPageKind; subject: string } {
  const segments = (pathname || '/').split('/').filter(Boolean);
  const rest = segments.length > 0 && LOCALE_SET.has(segments[0]) ? segments.slice(1) : segments;

  let kind: WhatsAppPageKind = 'general';
  if (rest.length >= 2) {
    const firstSeg = rest[0].toLowerCase();
    const canonicalParent = resolveLocalizedDirToCanonical(firstSeg);
    const leaf = decodeURIComponent(rest[1] || '');
    if (canonicalParent === '/guides' || firstSeg === 'guide' || firstSeg === 'guides') {
      kind = 'guide';
    } else if (canonicalParent === '/clubs' || firstSeg === 'locali' || firstSeg === 'clubs') {
      kind = 'club';
    } else if (canonicalParent === '/events' || EVENT_DIR_SET.has(firstSeg)) {
      const capCat = resolveCapodannoCategoryIdByLocalizedSlug(leaf, locale);
      if (capCat || CAPODANNO_CAT_SET.has(leaf)) {
        kind = 'capodannoHub';
      } else if (['tonight', 'this-week', 'special', 'best', 'past', '18-plus', '21-plus', 'international', 'university-erasmus'].includes(leaf)) {
        kind = 'general';
      } else {
        kind = 'event';
      }
    }
  } else if (rest.length === 1) {
    const onlySeg = rest[0].toLowerCase();
    if (onlySeg.includes('capodanno') || onlySeg.includes('new-years-eve')) {
      kind = 'capodannoHub';
    }
  }

  let subject = '';
  if (typeof document !== 'undefined' && kind !== 'general') {
    const eventAttrEl = document.querySelector<HTMLElement>('[data-event-title]');
    const attrTitle = eventAttrEl?.getAttribute('data-event-title')?.trim();
    const h1Text = document.querySelector('main h1, #main-content h1, article h1')?.textContent?.trim();
    const rawSubject = attrTitle || h1Text || '';
    if (rawSubject) {
      subject = clampContextSubject(rawSubject);
    }
  }

  return { kind, subject };
}

export default function WhatsAppFloating({ locale = 'en' }: { locale?: string }) {
  const pathname = usePathname() || '/';
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [overlayBlocking, setOverlayBlocking] = useState(false);
  const [pageCtx, setPageCtx] = useState<{ kind: WhatsAppPageKind; subject: string }>({
    kind: 'general',
    subject: '',
  });
  const timerRef = useRef<number | null>(null);

  const isInternalOrCheckout =
    /\/(?:crm|analytics|checkout)(?:\/|$)/i.test(pathname);

  const clearOpenTimer = useCallback(() => {
    if (timerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Sync cross-tab dismissal via storage events + mobile menu open state
  useEffect(() => {
    const initiallyDismissed = isDismissedInCurrentSession();
    setDismissed(initiallyDismissed);

    const onStorage = (event: StorageEvent) => {
      if (event.key === CROSS_TAB_UNTIL_KEY) {
        const until = Number(event.newValue || '0');
        if (Number.isFinite(until) && until > Date.now()) {
          clearOpenTimer();
          setDismissed(true);
          setBubbleOpen(false);
          try {
            window.sessionStorage.setItem(SESSION_KEY, '1');
          } catch {}
        }
      }
    };

    const onMobileMenu = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      setOverlayBlocking(Boolean(detail?.open));
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('nlm:mobile-menu', onMobileMenu);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('nlm:mobile-menu', onMobileMenu);
    };
  }, [clearOpenTimer]);

  // Update contextual subject on route navigation and manage 7-second auto-open timer
  useEffect(() => {
    if (isInternalOrCheckout) {
      clearOpenTimer();
      setBubbleOpen(false);
      return;
    }

    refreshSlidingDismissalIfActive();
    const alreadyDismissed = isDismissedInCurrentSession();
    setDismissed(alreadyDismissed);

    const syncContext = () => {
      setPageCtx(detectPageContext(pathname, locale));
    };

    const rafId = window.requestAnimationFrame(syncContext);
    const settleId = window.setTimeout(syncContext, 280);

    if (alreadyDismissed) {
      clearOpenTimer();
      setBubbleOpen(false);
      return () => {
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(settleId);
      };
    }

    // Auto-open after 7 seconds if not already open and not dismissed in this session
    if (!bubbleOpen && timerRef.current === null) {
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        if (!isDismissedInCurrentSession()) {
          setPageCtx(detectPageContext(window.location.pathname || pathname, locale));
          setBubbleOpen(true);
        }
      }, AUTO_OPEN_DELAY_MS);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleId);
    };
  }, [pathname, locale, isInternalOrCheckout, bubbleOpen, clearOpenTimer]);

  useEffect(() => {
    return () => clearOpenTimer();
  }, [clearOpenTimer]);

  if (isInternalOrCheckout || overlayBlocking) {
    return null;
  }

  const copy = getWhatsAppConciergeBubbleCopy(locale);
  const messageBody =
    pageCtx.kind === 'event'
      ? copy.eventBody
      : pageCtx.kind === 'guide'
        ? copy.guideBody
        : pageCtx.kind === 'capodannoHub'
          ? copy.capodannoHubBody
          : pageCtx.kind === 'club'
            ? copy.clubBody
            : copy.generalBody;

  const pageUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://nightlifemilan.com${pathname}`;
  const prefillText = pageCtx.subject
    ? `${copy.prefillPrefix} ${pageCtx.subject} (${pageUrl})`
    : `${copy.prefillPrefix} ${pageUrl}`;
  const waHref = `${SITE_CONTACT.whatsapp.link}?text=${encodeURIComponent(prefillText)}`;

  const handleDismiss = () => {
    clearOpenTimer();
    persistSessionDismissal();
    setDismissed(true);
    setBubbleOpen(false);
  };

  return (
    <div
      data-wa-floating-root="true"
      data-no-lightbox="true"
      className="fixed bottom-4 end-4 z-40 flex flex-col items-end gap-2.5"
    >
      {bubbleOpen && !dismissed && (
        <div
          data-wa-concierge-bubble="open"
          className="relative w-[min(20.5rem,calc(100vw-2rem))] border-2 border-[#050505] bg-[#F6F1E7] text-[#050505]"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#050505]/15 bg-[#EAE3D5] px-3.5 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="live-dot inline-block h-2 w-2 shrink-0 rounded-full bg-[#25D366]" aria-hidden="true" />
              <span className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#050505]">
                {copy.deskLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label={copy.closeAria}
              data-wa-bubble-close="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#050505]/20 bg-[#F6F1E7] text-[#050505] transition-colors hover:bg-[#050505] hover:text-[#F6F1E7]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-bubble-cta="true"
            className="block px-3.5 py-3 text-start transition-colors hover:bg-[#EFE8DA]"
          >
            {pageCtx.subject && (
              <p className="mb-1 truncate font-serif text-sm font-bold text-[#050505]">
                {pageCtx.subject}
              </p>
            )}
            <p className="font-sans text-[13px] leading-snug text-[#181512]">
              {messageBody}
            </p>
            <span className="mt-2.5 inline-flex min-h-[36px] w-full items-center justify-center bg-[#25D366] px-3 py-1.5 font-sans text-xs font-extrabold text-[#050505] transition-colors hover:bg-[#2EE472]">
              {copy.ctaHint}
            </span>
          </a>
        </div>
      )}

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.openAria}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#F6F1E7] bg-[#25D366] text-[#050505] transition-colors hover:bg-[#2EE472]"
      >
        <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
}
