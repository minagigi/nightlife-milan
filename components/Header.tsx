'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFavorites } from './FavoritesContext';
import GlobalSearch from './GlobalSearch';
import LanguageSwitcher from './LanguageSwitcher';
import { CONTACT } from '@/config/contact';
import Logo from './Logo';

export default function Header({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites, setDrawerOpen } = useFavorites();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
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

  // Helper to get the alternate path for the language switcher
  const getAlternatePath = (targetLocale: string) => {
    if (!pathname) return targetLocale === 'it' ? '/it' : '/';
    
    const isCurrentlyIt = pathname.startsWith('/it/') || pathname === '/it';
    let pathWithoutLocale = pathname;
    
    if (isCurrentlyIt) {
      pathWithoutLocale = pathname.replace(/^\/it(\/|$)/, '/');
    }

    if (targetLocale === 'it') {
      return pathWithoutLocale === '/' ? '/it' : `/it${pathWithoutLocale}`;
    } else {
      return pathWithoutLocale;
    }
  };

  // Dizionario per le traduzioni statiche
  const typedLocale = (currentLocale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const dict = {
    en: { clubs: 'CLUBS', calendar: 'CALENDAR', zones: 'ZONES', guides: 'GUIDES', vip: 'VIP TABLES' },
    it: { clubs: 'LOCALI', calendar: 'CALENDARIO', zones: 'ZONE', guides: 'GUIDE', vip: 'TAVOLI VIP' }
  };
  const t = dict[typedLocale];

  const localePrefix = currentLocale === 'it' ? '/it' : '';
  const navLinks = [
    { name: t.clubs, href: `${localePrefix}/clubs`, match: `${localePrefix}/clubs` },
    { name: t.calendar, href: `${localePrefix}/calendar/tonight`, match: `${localePrefix}/calendar` },
    { name: t.zones, href: `${localePrefix}/zones`, match: `${localePrefix}/zones` },
    { name: t.guides, href: `${localePrefix}/guides`, match: `${localePrefix}/guides` },
    { name: t.vip, href: `${localePrefix}/vip-tables`, match: `${localePrefix}/vip-tables`, gold: true },
  ];

  // Extra links surfaced only in the mobile menu (kept off the desktop bar to avoid clutter)
  const mobileExtraLinks = [
    { name: typedLocale === 'it' ? 'EVENTI' : 'EVENTS', href: `${localePrefix}/events`, match: `${localePrefix}/events` },
    { name: 'APERITIVO', href: `${localePrefix}/aperitivo`, match: `${localePrefix}/aperitivo` },
    { name: typedLocale === 'it' ? 'PREZZI BOTTIGLIE' : 'BOTTLE PRICES', href: `${localePrefix}/bottle-prices`, match: `${localePrefix}/bottle-prices` },
    { name: typedLocale === 'it' ? 'DRESS CODE' : 'DRESS CODE', href: `${localePrefix}/door-policy`, match: `${localePrefix}/door-policy` },
    { name: 'FAQ', href: `${localePrefix}/faq`, match: `${localePrefix}/faq` },
  ];

  const waMenuLink = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(
    typedLocale === 'it'
      ? 'Ciao! Vorrei prenotare un tavolo VIP a Milano.'
      : "Hi! I'd like to book a VIP table in Milan."
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full pt-3 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto rounded-lg bg-[#1C1810]/80 backdrop-blur-xl border border-white/8 shadow-[0_4px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
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
                    className={`text-sm font-medium tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-sm ${
                      isGold
                        ? isActive
                          ? 'text-champagne border-b border-champagne pb-0.5'
                          : 'text-champagne/80 hover:text-champagne border-b border-champagne/30 hover:border-champagne pb-0.5'
                        : isActive
                          ? 'text-champagne'
                          : 'text-white hover:text-champagne'
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
              href={currentLocale === 'it' ? '/it' : '/'}
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
                <span className="text-[9px] text-white/30 tracking-widest uppercase">
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

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden mx-3 mt-1 rounded-xl bg-[#1C1810]/95 backdrop-blur-xl border border-white/8 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain"
          >
            <nav className="px-5 pt-2 pb-5 flex flex-col" aria-label="Mobile Navigation">
              {[...navLinks, ...mobileExtraLinks].map((link, i) => {
                const isActive = pathname?.startsWith(link.match);
                const isGold = (link as { gold?: boolean }).gold;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18, delay: Math.min(i, 6) * 0.03 }}
                    className="flex items-center justify-between border-b border-white/5 last:border-0"
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
                  </motion.div>
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
                {typedLocale === 'it' ? 'Prenota via WhatsApp' : 'Book via WhatsApp'}
              </a>
              <p className="text-center text-white/35 text-[11px] tracking-widest mt-2.5">
                {CONTACT.whatsapp.number} · {typedLocale === 'it' ? 'Risposta in 10 min' : 'Reply in 10 min'}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
