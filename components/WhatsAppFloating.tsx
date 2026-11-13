'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getMfwBookingLabel, isMfwPathname } from '@/lib/mfw/bookingLabels';
import { isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';
import { isPublicBookingPath } from '@/lib/persistentBooking';
import { SITE_CONTACT } from '@/config/contact';
import { isInformationOnlyClubPath } from '@/lib/clubContactRoute';
import { getClubInformationContactLabel } from '@/lib/clubOperationalStatus';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { appendPageUrlToWhatsAppMessage, resolveFullPageUrl } from '@/lib/conciergeBooking';

function extractCurrentEventTitle(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const tagged = document.querySelector<HTMLElement>('[data-event-title]');
  const fromAttr = (tagged?.getAttribute('data-event-title') || tagged?.textContent || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (fromAttr) return fromAttr;
  if (typeof window !== 'undefined') {
    const segments = window.location.pathname.split('/').filter(Boolean);
    if (segments.length >= 2) {
      const h1 = document.querySelector<HTMLElement>('#main-content h1, main h1');
      const h1Text = h1?.textContent?.replace(/\s+/g, ' ').trim();
      if (h1Text) return h1Text;
    }
  }
  return undefined;
}

export default function WhatsAppFloating({ locale: explicitLocale }: { locale?: LocaleCode } = {}) {
  const pathname = usePathname() || '/';
  const firstSegment = pathname.split('/').filter(Boolean)[0] || 'en';
  const locale = explicitLocale ?? (isEnabledLocale(firstSegment) ? firstSegment : 'en');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [eventTitle, setEventTitle] = useState<string | undefined>(undefined);
  const [partyOnly, setPartyOnly] = useState(false);
  const informationOnly = isInformationOnlyClubPath(pathname);
  const scarcity = getScarcityAndChatCopy(locale);

  useEffect(() => {
    const search = (event: Event) => setSearchOpen(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    const menu = (event: Event) => setMenuOpen(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    window.addEventListener('nlm:global-search', search);
    window.addEventListener('nlm:mobile-menu', menu);
    return () => {
      window.removeEventListener('nlm:global-search', search);
      window.removeEventListener('nlm:mobile-menu', menu);
    };
  }, []);

  useEffect(() => {
    let formVisible = false;
    const evaluate = () => {
      const scrolledPastHero = window.scrollY > 320;
      setShowBubble(scrolledPastHero && !formVisible);
    };
    const forms = Array.from(document.querySelectorAll<HTMLElement>('[id^="tc-request-"]'));
    let io: IntersectionObserver | null = null;
    if (forms.length > 0 && 'IntersectionObserver' in window) {
      const visibleSet = new Set<Element>();
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visibleSet.add(entry.target);
            else visibleSet.delete(entry.target);
          }
          formVisible = visibleSet.size > 0;
          evaluate();
        },
        { threshold: 0.15 },
      );
      forms.forEach((el) => io?.observe(el));
    }
    evaluate();
    window.addEventListener('scroll', evaluate, { passive: true });
    return () => {
      window.removeEventListener('scroll', evaluate);
      io?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const refresh = () => {
      const detected = extractCurrentEventTitle();
      setEventTitle((prev) => (prev === detected ? prev : detected));
      const party = Boolean(document.querySelector('[data-event-party-only="true"]'));
      setPartyOnly((prev) => (prev === party ? prev : party));
    };
    refresh();
    const main = document.getElementById('main-content') || document.body;
    const observer = new MutationObserver(refresh);
    observer.observe(main, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-event-title'],
    });
    return () => observer.disconnect();
  }, [pathname]);

  if (!isPublicBookingPath(pathname) || searchOpen || menuOpen) return null;

  const shortTitle =
    eventTitle && eventTitle.length > 32 ? `${eventTitle.slice(0, 30).trim()}…` : eventTitle;

  const label = informationOnly
    ? getClubInformationContactLabel(locale)
    : isMfwPathname(pathname)
      ? getMfwBookingLabel(locale)
      : scarcity.floatingChatLabel(shortTitle);

  const pageUrl = resolveFullPageUrl(pathname, locale);
  const href = informationOnly
    ? SITE_CONTACT.whatsapp.link
    : `${SITE_CONTACT.whatsapp.link}?text=${encodeURIComponent(
        appendPageUrlToWhatsAppMessage(
          partyOnly && eventTitle
            ? `${scarcity.floatingChatMessage()}\n${eventTitle}`
            : scarcity.floatingChatMessage(eventTitle),
          pageUrl,
          locale,
        ),
      )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-source="floating"
      data-persistent-booking
      data-floating-whatsapp-chat
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        top: 'auto',
        left: 'auto',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        maxWidth: 'calc(100vw - 24px)',
      }}
      aria-label={label}
    >
      {showBubble && (
        <span
          data-floating-whatsapp-bubble
          style={{
            position: 'relative',
            background: '#14120d',
            color: '#F6F1E7',
            border: '1px solid rgba(214, 190, 150, 0.75)',
            borderRadius: '14px',
            padding: '7px 11px',
            fontSize: '11.5px',
            fontWeight: 600,
            lineHeight: 1.25,
            maxWidth: '220px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.7)',
            textAlign: 'left',
          }}
        >
          <span>{label}</span>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '-5px',
              top: '50%',
              marginTop: '-4px',
              width: '8px',
              height: '8px',
              background: '#14120d',
              borderTop: '1px solid rgba(214, 190, 150, 0.75)',
              borderRight: '1px solid rgba(214, 190, 150, 0.75)',
              transform: 'rotate(45deg)',
            }}
          />
        </span>
      )}
      <span
        data-floating-whatsapp-icon
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '9999px',
          background: '#25D366',
          color: '#0b0a09',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 6px 20px rgba(0,0,0,0.7), 0 0 0 2px rgba(214, 190, 150, 0.55)',
        }}
      >
        <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
      </span>
    </a>
  );
}
