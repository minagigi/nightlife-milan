'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from '@/components/LocalizedLink';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, MessageCircle, ShoppingBag, User, X } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import { useSinglePassCart } from './single-pass/SinglePassCartContext';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';
import GlobalSearch from './GlobalSearch';
import LanguageSwitcher from './LanguageSwitcher';
import { SITE_CONTACT } from '@/config/contact';
import Logo from './Logo';
import { LOCALES, getLocaleDef, localePrefix as urlLocalePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { localizeInternalHref, resolveSeoHubPathToCanonical } from '@/lib/i18n/localizedSlugs35';
import { getChrome } from '@/lib/i18n/chrome';
import { editorialValue, type EditorialFields } from '@/lib/editorialPresentation';
import { BAR_COPY } from '@/lib/i18n/mobileBarCopy';
import { getConciergeBookingUrl, resolveFullPageUrl } from '@/lib/conciergeBooking';
import { getMfwBookingLabel, isMfwPathname } from '@/lib/mfw/bookingLabels';
import { isInformationOnlyClubPath } from '@/lib/clubContactRoute';
import { getClubInformationContactLabel } from '@/lib/clubOperationalStatus';
import { headerMenuFromFields, resolveMenuItems, type HeaderMenu } from '@/lib/editorialMenus';
import type { PublishedLanguagePaths } from '@/lib/languageRouteResolver';
import { halloweenNavigation, halloweenPath } from '@/lib/halloween/routes';
import { capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';

const anyLocalePrefixRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

const MEGA_FEATURED_CLUBS = [
  { name: 'Just Me Milano', zone: 'Parco Sempione', slug: 'just-me-milano' },
  { name: 'Pineta Milano', zone: 'Porta Garibaldi · Via Messina', slug: 'pineta-club-milano' },
  { name: 'Voya Rooftop', zone: 'Portello Skyline · 20° Piano', slug: 'voya-rooftop-milan' },
  { name: 'REPVBLIC Milano', zone: 'Piazza della Repubblica 12', slug: 'repvblic-milano' },
  { name: 'The Club Milano', zone: 'Brera · Moscova', slug: 'the-club-milano' },
  { name: 'Aria Club Milano', zone: 'San Siro Garden', slug: 'aria-club-milano' },
  { name: '55 Milano', zone: 'Sempione · Arco della Pace', slug: '55-milano' },
  { name: 'Tocqueville 13', zone: 'Corso Como · Garibaldi', slug: 'tocqueville-13' },
  { name: 'Terrazza Duomo 21', zone: 'Piazza del Duomo 21', slug: 'terrazza-21' },
  { name: 'Gattopardo Milano', zone: 'Cenisio · Ex Chiesa', slug: 'gattopardo-milano' },
  { name: 'Hollywood Milano', zone: 'Corso Como 15', slug: 'hollywood-milano' },
  { name: '11 Clubroom', zone: 'Via Tocqueville 11', slug: '11-clubroom-milano' },
] as const;

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
  bs: { menu: 'Navigacijski meni', close: 'Zatvori navigacioni meni' },
  mk: { menu: 'Мени за навигација', close: 'Затвори го менито за навигација' },
} satisfies Record<LocaleCode, { menu: string; close: string }>;

const menuFocusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function resolveSeasonalHeaderLinks(items: HeaderMenu['primary'], locale: string) {
  return resolveMenuItems(items, locale).map((item) => {
    const seasonal =
      item.id === 'mfw'
        ? {
            ...item,
            label: halloweenNavigation(locale).menuLabel,
            href: halloweenPath(locale),
            match: halloweenPath(locale),
          }
        : item;
    return { ...seasonal, name: seasonal.label };
  });
}

export default function Header({
  currentLocale,
  favoritesTitle,
  editorialFields = {},
  publicPath,
  languagePaths,
}: {
  currentLocale: string;
  favoritesTitle: string;
  editorialFields?: EditorialFields;
  publicPath?: string;
  languagePaths?: PublishedLanguagePaths | null;
}) {
  const observedPathname = usePathname();
  const pathname = publicPath ?? observedPathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'clubs' | 'guides' | null>(null);
  const { favorites, setDrawerOpen } = useFavorites();
  const { itemCount, setCartOpen } = useSinglePassCart();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onSearchOpen = (event: Event) => {
      if ((event as CustomEvent<{ open?: boolean }>).detail?.open) {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('nlm:global-search', onSearchOpen);
    return () => window.removeEventListener('nlm:global-search', onSearchOpen);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    document.body.classList.add('overflow-hidden', 'nlm-mobile-menu-open');
    window.dispatchEvent(new CustomEvent('nlm:mobile-menu', { detail: { open: true } }));
    const background = Array.from(document.body.children).filter(
      (node): node is HTMLElement =>
        node instanceof HTMLElement && !node.contains(mobileMenuRef.current),
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
      const controls = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(menuFocusableSelector) || [],
      );
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      background.forEach((node, index) => {
        if (!previouslyInert[index]) node.removeAttribute('inert');
      });
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobileMenuOpen]);

  // Preserve getAlternatePath helper contract cleanly if used across routes
  void LOCALES;
  void getLocaleDef;
  void resolveSeoHubPathToCanonical;
  void languagePaths;

  const defaultChrome = getChrome(currentLocale);
  const informationOnlyClub = isInformationOnlyClubPath(pathname || '');
  const bookingLabel = informationOnlyClub
    ? getClubInformationContactLabel(currentLocale)
    : isMfwPathname(pathname || '')
      ? getMfwBookingLabel(currentLocale)
      : defaultChrome.concierge || defaultChrome.bookWhatsApp;
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
    primary: [
      { id: 'clubs', label: t.clubs },
      { id: 'events', label: t.calendar },
      { id: 'mfw', label: halloweenNavigation(currentLocale).menuLabel },
      { id: 'zones', label: t.zones },
      { id: 'guides', label: t.guides },
      { id: 'vip', label: t.vipTables },
    ],
    mobileExtra: [
      { id: 'aperitivo', label: 'APERITIVO' },
      { id: 'bottles', label: t.bottlePrices },
      { id: 'doorPolicy', label: 'DRESS CODE' },
      { id: 'faq', label: 'FAQ' },
    ],
  };
  const menu = headerMenuFromFields(editorialFields, defaultMenu);
  const rawNavLinks = resolveSeasonalHeaderLinks(menu.primary, currentLocale);
  const halloweenHref = halloweenPath(currentLocale);
  const capodannoHref = capodannoPath(currentLocale);
  const capodannoLabel = `${capodannoNavigation(currentLocale).menuLabel} 2027`;
  const spCopy = getSinglePassCopy(currentLocale);
  const singlePassHref = `${localePrefix}/single-pass`;
  const accountHref = `${localePrefix}/account`;
  const eventsHref = localizeInternalHref(`${localePrefix}/events`, currentLocale as LocaleCode);
  const clubsHref = localizeInternalHref(`${localePrefix}/clubs`, currentLocale as LocaleCode);
  const sanSiroHref = localizeInternalHref(
    `${localePrefix}/football-afterparties`,
    currentLocale as LocaleCode,
  );
  const guidesHref = localizeInternalHref(`${localePrefix}/guides`, currentLocale as LocaleCode);
  const vipHref = localizeInternalHref(`${localePrefix}/vip-tables`, currentLocale as LocaleCode);
  const zonesHref = localizeInternalHref(`${localePrefix}/zones`, currentLocale as LocaleCode);

  const navLinks = (() => {
    const filtered = rawNavLinks.filter(
      (item) => item.href !== halloweenHref && item.href !== capodannoHref && item.id !== 'mfw',
    );
    const sanSiroDesktopLabel = 'SAN SIRO';
    const seasonalPair = [
      {
        id: 'events' as const,
        label: capodannoLabel,
        name: capodannoLabel,
        href: capodannoHref,
        match: capodannoHref,
        gold: true,
      },
      {
        id: 'events' as const,
        label: spCopy.navShopLabel,
        name: spCopy.navShopLabel,
        href: singlePassHref,
        match: singlePassHref,
        gold: true,
      },
      {
        id: 'events' as const,
        label: sanSiroDesktopLabel,
        name: sanSiroDesktopLabel,
        href: sanSiroHref,
        match: sanSiroHref,
        gold: false,
      },
    ];
    const eventsIdx = filtered.findIndex((item) => item.id === 'events');
    if (eventsIdx !== -1) {
      filtered.splice(eventsIdx + 1, 0, ...seasonalPair);
      return filtered;
    }
    return [...seasonalPair, ...filtered];
  })();

  const weeklyHref = localizeInternalHref(
    `${localePrefix}/events/this-week`,
    currentLocale as LocaleCode,
  );
  const v01 = getV01SiteCopy(currentLocale);
  const weeklyMobileItem = {
    id: 'events' as const,
    label: v01.settimana.titleBefore + v01.settimana.titleAccent,
    name: v01.settimana.titleBefore + v01.settimana.titleAccent,
    href: weeklyHref,
    match: weeklyHref,
    gold: false,
  };
  const mobileExtraLinks = [
    weeklyMobileItem,
    ...resolveSeasonalHeaderLinks(menu.mobileExtra, currentLocale).filter(
      (item) => item.href !== halloweenHref && item.href !== capodannoHref && item.id !== 'mfw',
    ),
  ];

  const waMenuLink = informationOnlyClub
    ? SITE_CONTACT.whatsapp.link
    : getConciergeBookingUrl(
        currentLocale,
        undefined,
        resolveFullPageUrl(pathname || '/', currentLocale),
      );

  return (
    <header
      ref={headerRef}
      data-no-lightbox="true"
      className={`nlm-header sticky top-0 z-50 w-full border-b border-[#F6F1E7]/14 bg-[#050505] ${
        scrolled ? 'is-scrolled' : ''
      }`}
    >
      <div className="hidden xl:block w-full border-b border-[#F6F1E7]/14 bg-[#0B0A09]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between border-x border-[#F6F1E7]/14 px-8 py-2 text-[13px] text-[#C2B9AA]">
          <div className="flex items-center gap-2">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
            <strong className="font-semibold text-[#F6F1E7]">{v01.statusLive}</strong>
            <span aria-hidden="true">·</span>
            <span>{v01.statusStats}</span>
          </div>
          <a
            href={waMenuLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] tabular-nums text-[#EAE3D5] hover:text-[#25D366]"
          >
            WhatsApp <bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi>
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14">
        <div className="px-2 sm:px-8">
          <div className="nlm-header-inner flex min-h-[68px] items-center justify-between gap-1 sm:gap-2">
            {/* Mobile Menu Toggle */}
            <div className="relative z-20 flex shrink-0 items-center xl:hidden">
              <button
                ref={mobileMenuTriggerRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="nlm-menu-toggle flex h-11 w-11 items-center justify-center text-[#F6F1E7] transition-colors hover:text-[#EAE3D5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                aria-label={menuCopy.menu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Logo */}
            <div className="relative flex min-w-0 shrink items-center justify-center">
              <Link
                href={localePrefix || '/'}
                prefetch={false}
                className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                aria-label="Nightlife Milan"
              >
                <Logo className="h-6 w-auto max-w-[116px] sm:h-8 sm:max-w-none" />
              </Link>
            </div>

            {/* Desktop Primary Navigation (1-row Couture Noir) */}
            <nav
              className="nlm-header-nav hidden shrink-0 items-center gap-4 xl:flex"
              aria-label={menuCopy.menu}
            >
              <div className="relative flex items-center">
                <button
                  type="button"
                  aria-expanded={openDropdown === 'clubs'}
                  onClick={() => setOpenDropdown((p) => (p === 'clubs' ? null : 'clubs'))}
                  className="nlm-header-link inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap font-sans text-sm font-semibold text-[#F6F1E7] hover:text-[#EAE3D5]"
                >
                  <span>{t.clubs}</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {mounted && favorites.length > 0 && (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="ml-1.5 flex h-5 min-w-[20px] items-center justify-center bg-[#F6F1E7] px-1 text-[11px] font-bold text-[#050505]"
                    aria-label={favoritesTitle}
                  >
                    {favorites.length}
                  </button>
                )}
              </div>

              <Link
                href={capodannoHref}
                prefetch={false}
                aria-current={pathname?.startsWith(capodannoHref) ? 'page' : undefined}
                className="nlm-header-link inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap font-sans text-sm font-bold text-[#F6F1E7]"
              >
                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#25D366]" aria-hidden="true" />
                <span>{capodannoLabel}</span>
              </Link>

              <Link
                href={eventsHref}
                prefetch={false}
                aria-current={pathname?.startsWith(eventsHref) ? 'page' : undefined}
                className="nlm-header-link whitespace-nowrap font-sans text-sm font-semibold"
              >
                {t.calendar}
              </Link>

              <Link
                href={singlePassHref}
                locale={currentLocale}
                prefetch={false}
                aria-current={pathname?.startsWith(singlePassHref) ? 'page' : undefined}
                className="nlm-header-link is-accent whitespace-nowrap font-sans text-sm font-bold"
              >
                {spCopy.navShopLabel}
              </Link>

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={openDropdown === 'guides'}
                  onClick={() => setOpenDropdown((p) => (p === 'guides' ? null : 'guides'))}
                  className="nlm-header-link inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap font-sans text-sm font-semibold"
                >
                  <span>{t.guides} &amp; San Siro</span>
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="nlm-header-actions flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
              <GlobalSearch currentLocale={currentLocale} />

              <Link
                href={accountHref}
                locale={currentLocale}
                prefetch={false}
                aria-label={spCopy.navAccountLabel}
                title={spCopy.navAccountLabel}
                className="hidden min-h-[44px] min-w-[44px] items-center justify-center border border-[#F6F1E7]/20 bg-[#0B0A09] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] sm:flex"
              >
                <User className="h-4 w-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={spCopy.navCartLabel}
                title={spCopy.navCartLabel}
                className="relative flex h-11 w-11 items-center justify-center border border-[#F6F1E7]/20 bg-[#0B0A09] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5]"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center bg-[#25D366] px-1 text-[11px] font-bold tabular-nums text-[#050505]">
                    {itemCount}
                  </span>
                )}
              </button>

              <div className="hidden sm:block">
                <LanguageSwitcher currentLocale={currentLocale} />
              </div>

              <a
                href={waMenuLink}
                target="_blank"
                rel="noopener noreferrer"
                className="nlm-header-action hidden min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap bg-[#25D366] px-3.5 py-2 text-[13px] font-bold text-[#050505] transition-colors hover:bg-[#2EE472] xl:flex"
                aria-label={bookingLabel}
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-[#050505]" aria-hidden="true" />
                <div className="flex flex-col leading-none">
                  <span className="text-[13px] font-bold">{bookingLabel}</span>
                  <span className="font-mono text-[12px] font-semibold tabular-nums text-[#050505]">
                    <bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Couture Noir Mega-Dropdown for Clubs */}
        {openDropdown === 'clubs' && (
          <div
            data-no-lightbox="true"
            className="nlm-mega-panel hidden border-t border-[#F6F1E7]/14 border-b border-b-[#EAE3D5]/32 bg-[#0B0A09] text-[#F6F1E7] xl:block"
          >
            <div className="mx-auto max-w-[1440px] px-8 py-6">
              <div className="mb-4 flex items-center justify-between border-b border-[#F6F1E7]/14 pb-3">
                <p className="font-display text-2xl font-bold text-[#F6F1E7]">
                  {t.megaClubsTitle}
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href={capodannoHref}
                    prefetch={false}
                    onClick={() => setOpenDropdown(null)}
                    className="inline-flex items-center gap-1.5 bg-[#25D366] px-3.5 py-2 text-[13px] font-bold text-[#050505] hover:bg-[#2EE472]"
                  >
                    <span>{t.megaNye}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={clubsHref}
                    prefetch={false}
                    onClick={() => setOpenDropdown(null)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#EAE3D5] underline underline-offset-4 hover:text-[#F6F1E7]"
                  >
                    <span>{t.megaAllClubs}</span>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {MEGA_FEATURED_CLUBS.map((club) => (
                  <Link
                    key={club.slug}
                    href={`${localePrefix}/clubs/${club.slug}`}
                    locale={currentLocale}
                    prefetch={false}
                    onClick={() => setOpenDropdown(null)}
                    className="group flex flex-col justify-between border border-[#F6F1E7]/14 bg-[#141311] p-3.5 transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
                  >
                    <span className="font-display text-xl font-bold text-[#F6F1E7] group-hover:text-[#EAE3D5]">
                      {club.name}
                    </span>
                    <span className="mt-1 text-xs font-medium text-[#C2B9AA]">{club.zone}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Couture Noir Dropdown for Guides & San Siro */}
        {openDropdown === 'guides' && (
          <div
            data-no-lightbox="true"
            className="nlm-mega-panel hidden border-t border-[#F6F1E7]/14 border-b border-b-[#EAE3D5]/32 bg-[#0B0A09] text-[#F6F1E7] xl:block"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-4 px-8 py-5">
              {[
                { label: t.guides, href: guidesHref },
                { label: t.sanSiro, href: sanSiroHref },
                { label: t.vipTables, href: vipHref },
                { label: t.zones, href: zonesHref },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpenDropdown(null)}
                  className="flex items-center justify-between border border-[#F6F1E7]/14 bg-[#141311] p-4 font-display text-xl font-bold text-[#F6F1E7] hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile navigation modal */}
      {isMobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black/85 px-3 pb-3 pt-[4.5rem] xl:hidden"
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
              className="nlm-mobile-menu mx-auto max-h-[calc(100vh-5.25rem)] max-w-xl overflow-y-auto overscroll-contain border border-[#EAE3D5]/32 bg-[#050505]"
            >
              <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 px-5 py-3">
                <span className="font-sans text-sm font-bold text-[#EAE3D5]">
                  {menuCopy.menu}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.requestAnimationFrame(() => mobileMenuTriggerRef.current?.focus());
                  }}
                  className="flex h-11 w-11 items-center justify-center text-[#F6F1E7] hover:bg-[#141311]"
                  aria-label={menuCopy.close}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col px-5 pb-6 pt-3" aria-label={menuCopy.menu}>
                <div className="mb-3 flex items-center justify-between gap-2 border-b border-[#F6F1E7]/14 pb-3">
                  <LanguageSwitcher currentLocale={currentLocale} />
                  <div className="flex items-center gap-2">
                    <Link
                      href={accountHref}
                      locale={currentLocale}
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex min-h-[44px] items-center justify-center gap-1.5 border border-[#F6F1E7]/24 bg-[#0B0A09] px-3 py-2 text-[13px] font-bold text-[#F6F1E7]"
                    >
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span>{spCopy.navAccountLabel}</span>
                    </Link>
                    <Link
                      href={`${localePrefix}/cart`}
                      locale={currentLocale}
                      prefetch={false}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex min-h-[44px] items-center justify-center gap-1.5 border border-[#F6F1E7]/24 bg-[#0B0A09] px-3 py-2 text-[13px] font-bold text-[#F6F1E7]"
                    >
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {spCopy.navCartLabel}
                        {mounted && itemCount > 0 ? ` (${itemCount})` : ''}
                      </span>
                    </Link>
                  </div>
                </div>

                {[...navLinks, ...mobileExtraLinks].map((link) => {
                  const isActive = pathname?.startsWith(link.match);
                  const isGold = (link as { gold?: boolean }).gold;
                  return (
                    <div
                      key={link.name}
                      className="flex items-center justify-between border-b border-[#F6F1E7]/12 last:border-0"
                    >
                      <Link
                        href={link.href}
                        prefetch={false}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block min-h-[46px] flex-1 py-3 font-sans text-base font-bold transition-colors ${
                          isGold
                            ? 'text-[#F6F1E7]'
                            : isActive
                              ? 'text-[#F6F1E7]'
                              : 'text-[#C2B9AA] hover:text-[#F6F1E7]'
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
                          className="flex h-8 w-8 items-center justify-center bg-[#F6F1E7] text-[13px] font-bold text-[#050505]"
                          aria-label={favoritesTitle}
                        >
                          {favorites.length}
                        </button>
                      )}
                    </div>
                  );
                })}

                <a
                  href={waMenuLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 flex min-h-[48px] items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-bold text-[#050505] hover:bg-[#2EE472]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{bookingLabel}</span>
                </a>
                <p className="mt-2.5 text-center text-[13px] text-[#C2B9AA]">
                  <bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi> · {infoCopy.disclaimer}
                </p>
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
