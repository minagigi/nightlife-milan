'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle } from 'lucide-react';
import { useFavorites } from './FavoritesContext';
import LanguageSwitcher from './LanguageSwitcher';
import { CONTACT } from '@/config/contact';
import Logo from './Logo';
import { LOCALES, localePrefix as urlLocalePrefix } from '@/lib/i18n/locales';
import { getChrome } from '@/lib/i18n/chrome';

// Prefissi lingua riconoscibili nel path (tutti i codici del registry: strippare
// un prefisso di lingua non attiva è innocuo e copre i path interni riscritti).
const anyLocalePrefixRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

// Code-split GlobalSearch (pulls in motion/react) out of the Header's critical bundle —
// same size reserved via the skeleton to avoid layout shift while the chunk loads.
const GlobalSearch = dynamic(() => import('./GlobalSearch'), {
  loading: () => <div className="w-10 h-10 rounded-full bg-white/5" aria-hidden="true" />,
});

export default function Header({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites, setDrawerOpen } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  // Close the mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
  const t = getChrome(currentLocale);

  const localePrefix = urlLocalePrefix(currentLocale);
  const navLinks = [
    { name: t.clubs, href: `${localePrefix}/clubs`, match: `${localePrefix}/clubs` },
    { name: t.calendar, href: `${localePrefix}/calendar/tonight`, match: `${localePrefix}/calendar` },
    { name: t.zones, href: `${localePrefix}/zones`, match: `${localePrefix}/zones` },
    { name: t.guides, href: `${localePrefix}/guides`, match: `${localePrefix}/guides` },
    { name: t.vipTables, href: `${localePrefix}/vip-tables`, match: `${localePrefix}/vip-tables`, gold: true },
  ];

  // Extra links surfaced only in the mobile menu (kept off the desktop bar to avoid clutter)
  const mobileExtraLinks = [
    { name: t.events, href: `${localePrefix}/events`, match: `${localePrefix}/events` },
    { name: 'APERITIVO', href: `${localePrefix}/aperitivo`, match: `${localePrefix}/aperitivo` },
    { name: t.bottlePrices, href: `${localePrefix}/bottle-prices`, match: `${localePrefix}/bottle-prices` },
    { name: 'DRESS CODE', href: `${localePrefix}/door-policy`, match: `${localePrefix}/door-policy` },
    { name: 'FAQ', href: `${localePrefix}/faq`, match: `${localePrefix}/faq` },
  ];

  const waMenuLink = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    currentLocale === 'it' ? 'Ciao! Vorrei prenotare un tavolo VIP a Milano.' : "Hi! I'd like to book a VIP table in Milan."
  )}`;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-[#131009]/90 backdrop-blur-[12px] border-b border-[var(--linea)] shadow-[0_4px_32px_rgba(0,0,0,0.6)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Desktop Nav (Left) */}
          <nav className="hidden md:flex space-x-8 flex-1 items-center" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname?.startsWith(link.match);
              const isGold = (link as { gold?: boolean }).gold;
              return (
                <div key={link.name} className="relative flex items-center">
                  <Link
                    href={link.href}
                    className={`relative transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                      isGold
                        ? isActive
                          ? 'text-xs font-semibold tracking-widest rounded-full px-4 py-1.5 border border-champagne bg-champagne text-charcoal'
                          : 'text-xs font-semibold tracking-widest rounded-full px-4 py-1.5 border border-champagne/60 text-champagne hover:bg-champagne hover:text-charcoal hover:border-champagne'
                        : isActive
                          ? 'text-sm font-medium tracking-widest text-champagne rounded-sm before:content-[""] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-champagne'
                          : 'text-sm font-medium tracking-widest text-white hover:text-champagne rounded-sm before:content-[""] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-champagne before:opacity-0 before:-translate-x-1 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:translate-x-0'
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.name === t.clubs && mounted && favorites.length > 0 && (
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className="ml-2 flex items-center justify-center w-5 h-5 rounded-full bg-champagne text-charcoal text-[10px] font-bold hover:scale-110 transition-transform"
                      aria-label="Open My Night"
                    >
                      {favorites.length}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle (Left on Mobile) */}
          <div className="flex md:hidden flex-1 items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center -ml-2.5 w-11 h-11 text-white hover:text-champagne focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-lg active:bg-white/5 transition-colors"
              aria-label="Toggle mobile menu"
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
              className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm drop-shadow-[0_0_14px_rgba(201,168,106,0.5)] hover:drop-shadow-[0_0_20px_rgba(201,168,106,0.8)] transition-all duration-500"
              aria-label="Nightlife Milan Home"
            >
              <Logo className="h-9 w-auto" />
            </Link>
            {/* Warm aura effect */}
            <div className="absolute inset-0 bg-champagne blur-xl opacity-15 group-hover:opacity-35 transition-opacity duration-500 rounded-full pointer-events-none"></div>
          </div>

          {/* International & Search (Right) */}
          <div className="flex flex-1 justify-end items-center gap-4">
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 text-sm text-white hover:text-champagne transition-colors group mr-2"
              aria-label={currentLocale === 'it' ? CONTACT.whatsapp.labels.it : CONTACT.whatsapp.labels.en}
            >
              <MessageCircle className="w-4 h-4 text-champagne group-hover:scale-110 transition-transform" />
              <div className="flex flex-col leading-none">
                <span className="font-semibold tracking-wider text-[11px] text-champagne">{CONTACT.whatsapp.number}</span>
                <span className="text-[9px] text-white/50 tracking-widest uppercase">
                  {currentLocale === 'it' ? 'Concierge · VIP Tables' : 'Concierge · VIP Tables'}
                </span>
              </div>
            </a>
            <GlobalSearch currentLocale={currentLocale} />
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Menu Dropdown — CSS-only entrance, no framer-motion */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="animate-menu-drop md:hidden mx-3 mt-1 rounded-xl bg-[#1C1810]/95 backdrop-blur-xl border border-white/8 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain"
        >
          <nav className="px-5 pt-2 pb-5 flex flex-col" aria-label="Mobile Navigation">
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
                    onClick={() => setIsMobileMenuOpen(false)}
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
                      aria-label="Open My Night"
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
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-champagne text-black font-semibold text-sm tracking-[0.1em] uppercase py-3.5 min-h-[48px] active:scale-[0.98] transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              {t.bookWhatsApp}
            </a>
            <p className="text-center text-white/50 text-[11px] tracking-widest mt-2.5">
              {CONTACT.whatsapp.number} · {currentLocale === 'it' ? 'Risposta in 10 min' : 'Reply in 10 min'}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
