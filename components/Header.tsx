'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from '@/components/LocalizedLink';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle, X } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import GlobalSearch from './GlobalSearch';
import LanguageSwitcher from './LanguageSwitcher';
import { SITE_CONTACT } from '@/config/contact';
import Logo from './Logo';
import { LOCALES, localePrefix as urlLocalePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getChrome } from '@/lib/i18n/chrome';
import { editorialValue, type EditorialFields } from '@/lib/editorialPresentation';
import { BAR_COPY } from '@/lib/i18n/mobileBarCopy';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getMfwBookingLabel, isMfwPathname } from '@/lib/mfw/bookingLabels';
import { isInformationOnlyClubPath } from '@/lib/clubContactRoute';
import { getClubInformationContactLabel } from '@/lib/clubOperationalStatus';
import { headerMenuFromFields, resolveMenuItems, type HeaderMenu } from '@/lib/editorialMenus';
import type { PublishedLanguagePaths } from '@/lib/languageRouteResolver';
import { halloweenNavigation, halloweenPath } from '@/lib/halloween/routes';
import { capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';

// Prefissi lingua riconoscibili nel path (tutti i codici del registry: strippare
// un prefisso di lingua non attiva è innocuo e copre i path interni riscritti).
const anyLocalePrefixRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

const MOBILE_MENU_COPY = {
  en: { menu: 'Navigation menu', close: 'Close navigation menu' },
  it: { menu: 'Menu di navigazione', close: 'Chiudi il menu di navigazione' },
  es: { menu: 'Menú de navegación', close: 'Cerrar el menú de navegación' },
  fr: { menu: 'Menu de navigation', close: 'Fermer le menu de navigation' },
  de: { menu: 'Navigationsmenü', close: 'Navigationsmenü schließen' },
  pt: { menu: 'Menu de navegação', close: 'Fechar o menu de navegação' },
  nl: { menu: 'Navigatiemenu', close: 'Navigatiemenu sluiten' },
  ru: { menu: 'Меню навигации', close: 'Закрыть меню навигации' },
  tr: { menu: 'Gezinme menüsü', close: 'Gezinme menüsünü kapat' },
  zh: { menu: '导航菜单', close: '关闭导航菜单' },
  ar: { menu: 'قائمة التنقل', close: 'إغلاق قائمة التنقل' },
  bg: { menu: 'Навигационно меню', close: 'Затваряне на навигационното меню' },
  hr: { menu: 'Navigacijski izbornik', close: 'Zatvori navigacijski izbornik' },
  cs: { menu: 'Navigační nabídka', close: 'Zavřít navigační nabídku' },
  da: { menu: 'Navigationsmenu', close: 'Luk navigationsmenuen' },
  et: { menu: 'Navigeerimismenüü', close: 'Sulge navigeerimismenüü' },
  fi: { menu: 'Navigointivalikko', close: 'Sulje navigointivalikko' },
  el: { menu: 'Μενού πλοήγησης', close: 'Κλείσιμο μενού πλοήγησης' },
  hu: { menu: 'Navigációs menü', close: 'Navigációs menü bezárása' },
  ga: { menu: 'Roghchlár nascleanúna', close: 'Dún an roghchlár nascleanúna' },
  lv: { menu: 'Navigācijas izvēlne', close: 'Aizvērt navigācijas izvēlni' },
  lt: { menu: 'Naršymo meniu', close: 'Uždaryti naršymo meniu' },
  mt: { menu: 'Menu tan-navigazzjoni', close: 'Agħlaq il-menu tan-navigazzjoni' },
  pl: { menu: 'Menu nawigacyjne', close: 'Zamknij menu nawigacyjne' },
  ro: { menu: 'Meniu de navigare', close: 'Închide meniul de navigare' },
  sk: { menu: 'Navigačná ponuka', close: 'Zavrieť navigačnú ponuku' },
  sl: { menu: 'Navigacijski meni', close: 'Zapri navigacijski meni' },
  sv: { menu: 'Navigeringsmeny', close: 'Stäng navigeringsmenyn' },
  no: { menu: 'Navigasjonsmeny', close: 'Lukk navigasjonsmenyen' },
  is: { menu: 'Leiðsagnarvalmynd', close: 'Loka leiðsagnarvalmynd' },
  uk: { menu: 'Меню навігації', close: 'Закрити меню навігації' },
  sq: { menu: 'Menyja e navigimit', close: 'Mbyll menynë e navigimit' },
  sr: { menu: 'Navigacioni meni', close: 'Zatvori navigacioni meni' },
  bs: { menu: 'Navigacijski meni', close: 'Zatvori navigacijski meni' },
  mk: { menu: 'Мени за навигација', close: 'Затвори го менито за навигација' },
} satisfies Record<LocaleCode, { menu: string; close: string }>;

const menuFocusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Campaign presentation preserves the original CMS menu IDs and schema. */
export function resolveSeasonalHeaderLinks(items: HeaderMenu['primary'], locale: string) {
  return resolveMenuItems(items, locale).map(item => {
    const seasonal = item.id === 'mfw' ? { ...item, label: halloweenNavigation(locale).menuLabel, href: halloweenPath(locale), match: halloweenPath(locale) } : item;
    return { ...seasonal, name: seasonal.label };
  });
}

export default function Header({ currentLocale, favoritesTitle, editorialFields = {}, publicPath, languagePaths }: { currentLocale: string; favoritesTitle: string; editorialFields?: EditorialFields; publicPath?: string; languagePaths?: PublishedLanguagePaths | null }) {
  const observedPathname = usePathname();
  const pathname = publicPath ?? observedPathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites, setDrawerOpen } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onSearchOpen = (event: Event) => {
      if ((event as CustomEvent<{ open?: boolean }>).detail?.open) setIsMobileMenuOpen(false);
    };
    window.addEventListener('nlm:global-search', onSearchOpen);
    return () => window.removeEventListener('nlm:global-search', onSearchOpen);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.classList.add('overflow-hidden', 'nlm-mobile-menu-open');
    window.dispatchEvent(new CustomEvent('nlm:mobile-menu', { detail: { open: true } }));
    const background = Array.from(document.body.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement && !node.contains(mobileMenuRef.current),
    );
    const previouslyInert = background.map((node) => node.hasAttribute('inert'));
    background.forEach((node) => node.setAttribute('inert', ''));
    const focusFirstMenuControl = window.setTimeout(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>(menuFocusableSelector)?.focus();
    }, 0);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        window.requestAnimationFrame(() => mobileMenuTriggerRef.current?.focus());
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>(menuFocusableSelector) || []);
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (mobileMenuRef.current?.contains(event.target as Node)) return;
      mobileMenuRef.current?.querySelector<HTMLElement>(menuFocusableSelector)?.focus();
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', onFocusIn);
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(focusFirstMenuControl);
      document.body.classList.remove('overflow-hidden', 'nlm-mobile-menu-open');
      window.dispatchEvent(new CustomEvent('nlm:mobile-menu', { detail: { open: false } }));
      background.forEach((node, index) => { if (!previouslyInert[index]) node.removeAttribute('inert'); });
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobileMenuOpen]);

  // Helper to get the alternate path for the language switcher — registry-driven:
  // strippa QUALSIASI prefisso lingua e applica quello del locale target.
  const getAlternatePath = (targetLocale: string) => {
    const targetPrefix = urlLocalePrefix(targetLocale);
    if (!pathname) return targetPrefix || '/';
    const pathWithoutLocale = pathname.replace(anyLocalePrefixRe, '/');
    if (!targetPrefix) return pathWithoutLocale;
    return pathWithoutLocale === '/' ? targetPrefix : `${targetPrefix}${pathWithoutLocale}`;
  };

  // Chrome UI in tutte le 35 lingue del registry (fallback EN campo per campo)
  const defaultChrome = getChrome(currentLocale);
  const informationOnlyClub = isInformationOnlyClubPath(pathname || '');
  const bookingLabel = informationOnlyClub ? getClubInformationContactLabel(currentLocale)
    : isMfwPathname(pathname || '') ? getMfwBookingLabel(currentLocale) : defaultChrome.bookWhatsApp;
  const menuCopy = MOBILE_MENU_COPY[currentLocale as LocaleCode] || MOBILE_MENU_COPY.en;
  const t = {
    ...defaultChrome,
    clubs: editorialValue(editorialFields, 'header.clubs', defaultChrome.clubs),
    calendar: editorialValue(editorialFields, 'header.calendar', defaultChrome.calendar),
    zones: editorialValue(editorialFields, 'header.zones', defaultChrome.zones),
    guides: editorialValue(editorialFields, 'header.guides', defaultChrome.guides),
    vipTables: editorialValue(editorialFields, 'header.vipTables', defaultChrome.vipTables),
    bottlePrices: editorialValue(editorialFields, 'header.bottlePrices', defaultChrome.bottlePrices),
  };
  const defaultInfoCopy = BAR_COPY[currentLocale as keyof typeof BAR_COPY] || BAR_COPY.en;
  const infoCopy = {
    desktop: editorialValue(editorialFields, 'header.desktop', defaultInfoCopy.main),
    message: editorialValue(editorialFields, 'header.message', defaultInfoCopy.genericMessage),
    action: editorialValue(editorialFields, 'header.action', defaultInfoCopy.main),
    disclaimer: editorialValue(editorialFields, 'header.disclaimer', defaultInfoCopy.sub),
  };

  const localePrefix = urlLocalePrefix(currentLocale);
  const defaultMenu: HeaderMenu = {
    version: 1,
    primary: [{ id: 'clubs', label: t.clubs }, { id: 'events', label: t.calendar }, { id: 'mfw', label: halloweenNavigation(currentLocale).menuLabel }, { id: 'zones', label: t.zones }, { id: 'guides', label: t.guides }, { id: 'vip', label: t.vipTables }],
    mobileExtra: [{ id: 'aperitivo', label: 'APERITIVO' }, { id: 'bottles', label: t.bottlePrices }, { id: 'doorPolicy', label: 'DRESS CODE' }, { id: 'faq', label: 'FAQ' }],
  };
  const menu = headerMenuFromFields(editorialFields, defaultMenu);
  const rawNavLinks = resolveSeasonalHeaderLinks(menu.primary, currentLocale);
  const halloweenHref = halloweenPath(currentLocale);
  const halloweenLabel = halloweenNavigation(currentLocale).menuLabel;
  const capodannoHref = capodannoPath(currentLocale);
  const capodannoLabel = `${capodannoNavigation(currentLocale).menuLabel} 2027`;
  const navLinks = (() => {
    const filtered = rawNavLinks.filter(
      (item) => item.href !== halloweenHref && item.href !== capodannoHref && item.id !== 'mfw',
    );
    const weeklyHref = `${localePrefix}/events/this-week`;
    const weeklyLabel = currentLocale === 'it' ? 'SERATE SETTIMANA' : 'THIS WEEK';
    const seasonalPair = [
      { id: 'events' as const, label: weeklyLabel, name: weeklyLabel, href: weeklyHref, match: weeklyHref, gold: true },
      { id: 'events' as const, label: capodannoLabel, name: capodannoLabel, href: capodannoHref, match: capodannoHref, gold: true },
      { id: 'events' as const, label: currentLocale === 'it' ? 'DOPO-PARTITA SAN SIRO' : 'SAN SIRO AFTERPARTIES', name: currentLocale === 'it' ? 'DOPO-PARTITA SAN SIRO' : 'SAN SIRO AFTERPARTIES', href: `${localePrefix}/football-afterparties`, match: `${localePrefix}/football-afterparties`, gold: false },
    ];
    const eventsIdx = filtered.findIndex((item) => item.id === 'events');
    if (eventsIdx !== -1) {
      filtered.splice(eventsIdx + 1, 0, ...seasonalPair);
      return filtered;
    }
    return [...seasonalPair, ...filtered];
  })();
  const mobileExtraLinks = resolveSeasonalHeaderLinks(menu.mobileExtra, currentLocale).filter(
    (item) => item.href !== halloweenHref && item.href !== capodannoHref && item.id !== 'mfw',
  );

  const waMenuLink = informationOnlyClub ? SITE_CONTACT.whatsapp.link : getConciergeBookingUrl(currentLocale);

  return (
    <header className={`nlm-header sticky top-0 z-50 w-full border-b border-[#F6F1E7]/14 bg-[#050505]/92 backdrop-blur-md ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14">
      <div className="px-4 sm:px-10">
        <div className="nlm-header-inner flex justify-between items-center min-h-[72px]">
          
          {/* Desktop Nav (Left) */}
          <nav className="hidden lg:flex xl:flex nlm-header-nav flex-1 items-center gap-1" aria-label={menuCopy.menu}>
            {navLinks.map((link) => {
              const isActive = pathname?.startsWith(link.match);
              const isGold = (link as { gold?: boolean }).gold;
              return (
                <div key={link.name} className="relative flex items-center">
                  <Link
                    href={link.href}
                    prefetch={false}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nlm-header-link font-mono text-[11px] tracking-[0.18em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96] ${isGold ? 'is-accent text-[#D6BE96]' : 'text-[#C2B9AA] hover:text-[#F6F1E7]'}`}
                  >
                    {link.name}
                  </Link>
                  {link.name === t.clubs && mounted && favorites.length > 0 && (
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className="ml-2 flex items-center justify-center w-5 h-5 bg-[#D6BE96] text-[#050505] font-mono text-[10px] font-bold hover:scale-105 transition-transform"
                      aria-label={favoritesTitle}
                    >
                      {favorites.length}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle (Left on Mobile) */}
          <div className="flex xl:hidden flex-1 items-center">
            <button
              ref={mobileMenuTriggerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nlm-menu-toggle flex items-center justify-center -ml-2.5 w-11 h-11 text-[#F6F1E7] hover:text-[#D6BE96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96] active:bg-white/5 transition-colors"
              aria-label={menuCopy.menu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Logo (Center) */}
          <div className="flex-shrink-0 flex justify-center items-center relative group">
            <Link
              href={localePrefix || '/'}
              prefetch={false}
              className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96]"
              aria-label="Nightlife Milan"
            >
              <Logo className="h-9 w-auto" />
            </Link>
          </div>

          {/* International & Search (Right) */}
          <div className="nlm-header-actions flex flex-1 justify-end items-center gap-3">
            <a
              href={waMenuLink}
              target="_blank"
              rel="noopener noreferrer"
              className="nlm-header-action hidden min-h-11 shrink-0 lg:flex xl:flex items-center gap-2.5 border border-[#D6BE96]/55 bg-[#0B0A09] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] transition-colors group"
              aria-label={bookingLabel}
            >
              <MessageCircle className="w-4 h-4 text-[#D6BE96] group-hover:text-[#050505]" />
              <div className="flex flex-col leading-none">
                <span className="text-center font-semibold leading-tight tracking-[0.16em] text-[11px]">{bookingLabel}</span>
                <span className="text-center text-[10px] leading-tight tracking-[0.14em] text-[#D6BE96] group-hover:text-[#050505]"><bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi></span>
              </div>
            </a>
            <GlobalSearch currentLocale={currentLocale} />
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
        </div>
      </div>
      </div>

      {/* Mobile navigation modal */}
      {isMobileMenuOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] bg-black/80 px-3 pb-3 pt-[4.5rem] backdrop-blur-sm xl:hidden"
          onMouseDown={(event) => {
            if (event.target !== event.currentTarget) return;
            setIsMobileMenuOpen(false);
            window.requestAnimationFrame(() => mobileMenuTriggerRef.current?.focus());
          }}
        >
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuCopy.menu}
            className="nlm-mobile-menu animate-menu-drop mx-auto max-h-[calc(100vh-5.25rem)] max-w-xl overflow-y-auto overscroll-contain border border-white/15 bg-surface-1 shadow-2xl"
          >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-champagne">{menuCopy.menu}</span>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.requestAnimationFrame(() => mobileMenuTriggerRef.current?.focus());
              }}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              aria-label={menuCopy.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav className="px-5 pt-2 pb-5 flex flex-col" aria-label={menuCopy.menu}>
            {[...navLinks, ...mobileExtraLinks].map((link, i) => {
              const isActive = pathname?.startsWith(link.match);
              const isGold = (link as { gold?: boolean }).gold;
              return (
                <div
                  key={link.name}
                  className="animate-menu-item flex items-center justify-between border-b border-white/5 last:border-0"
                  style={{ animationDelay: `${Math.min(i, 6) * 30}ms` }}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex-1 text-base font-medium tracking-widest transition-colors duration-300 block py-3.5 min-h-[44px] ${
                      isGold
                        ? 'text-champagne'
                        : isActive ? 'text-champagne' : 'text-white hover:text-champagne active:text-champagne'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.name === t.clubs && mounted && favorites.length > 0 && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setDrawerOpen(true);
                      }}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-champagne text-charcoal text-xs font-bold"
                      aria-label={favoritesTitle}
                    >
                      {favorites.length}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Concierge CTA + phone number */}
            <a
              href={waMenuLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 bg-champagne text-black font-bold text-sm tracking-[0.08em] uppercase py-3.5 min-h-[48px] active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              {bookingLabel}
            </a>
            <p className="text-center text-white/50 text-[11px] tracking-widest mt-2.5">
              <bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi> · {infoCopy.disclaimer}
            </p>
          </nav>
          </div>
        </div>
      , document.body)}
    </header>
  );
}
