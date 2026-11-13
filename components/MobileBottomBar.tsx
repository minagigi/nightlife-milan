'use client';

import Link from '@/components/LocalizedLink';
import { usePathname } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { MessageCircle, Sparkles, Calendar, Crown, BookOpen } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { getConciergeBookingUrl, resolveFullPageUrl } from '@/lib/conciergeBooking';
import { mockVenues, mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { localePrefix } from '@/lib/i18n/locales';

export default function MobileBottomBar({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname() || '/';
  const isIt = currentLocale === 'it';
  const isPt = currentLocale === 'pt';
  const loc = (isIt ? 'it' : isPt ? 'pt' : 'en') as 'en' | 'it' | 'pt';

  if (pathname?.includes('/booking/success')) return null;

  const lp = localePrefix(currentLocale);
  const stripped = (lp && pathname?.startsWith(lp) ? pathname.slice(lp.length) : pathname) || '/';
  const seg = stripped.split('/').filter(Boolean);

  let contextName = '';

  if (seg[0] === 'clubs' && seg[1]) {
    const venue = mockVenues.find((v) => v.slugs.en === seg[1] || v.slugs.it === seg[1]);
    if (venue) {
      contextName = venue.localizedContent.name[loc] || venue.localizedContent.name.en;
    }
  } else if (seg[0] === 'events' && seg[1] && seg[1] !== 'special') {
    const event = mockEvents.find(
      (e) => e.localizedContent.slug.en === seg[1] || e.localizedContent.slug.it === seg[1]
    );
    if (event) {
      const title = event.localizedContent.title[loc] || event.localizedContent.title.en;
      const venue = mockVenues.find((v) => v.id === event.venueId);
      const vName = venue ? venue.localizedContent.name[loc] || venue.localizedContent.name.en : '';
      contextName = vName ? `${title} · ${vName}` : title;
    } else {
      const weekly = weeklyEvents.find((w) => `${w.clubSlug}-${w.day}-${w.eventSlug}` === seg[1]);
      if (weekly) {
        contextName = `${weekly.name} · ${weekly.clubName}`;
      }
    }
  } else if (seg[0] === 'football-afterparties') {
    contextName = 'San Siro Afterparty';
  } else if (seg[0] === 'private-parties') {
    contextName = 'Private Party · VIP';
  } else if (seg[0] === 'rooftops') {
    contextName = 'Rooftop VIP';
  }

  const bookingUrl = getConciergeBookingUrl(
    currentLocale,
    contextName || undefined,
    resolveFullPageUrl(pathname, currentLocale),
  );

  const mainLabel = contextName
    ? `${isPt ? 'Reservar' : tr(currentLocale, 'Book', 'Prenota')}: ${contextName}`
    : isPt
      ? 'Reservar VIP · +39 351 912 7047'
      : tr(currentLocale, 'Book VIP · +39 351 912 7047', 'Prenota VIP · +39 351 912 7047');
  const sub = isPt
    ? 'Concierge WhatsApp em 10 min'
    : tr(
        currentLocale,
        'WhatsApp Concierge in 10 min · concierge@nightlifemilan.com',
        'Concierge WhatsApp in 10 min · concierge@nightlifemilan.com'
      );

  const navItems = [
    {
      href: `${lp}/clubs`,
      active: seg[0] === 'clubs',
      icon: Sparkles,
      label: isIt ? 'Club (6 Top)' : 'Clubs',
    },
    {
      href: `${lp}/events`,
      active: seg[0] === 'events',
      icon: Calendar,
      label: isIt ? 'Eventi' : 'Events',
    },
    {
      href: `${lp}/vip-tables`,
      active: seg[0] === 'vip-tables' || seg[0] === 'bottle-prices',
      icon: Crown,
      label: isIt ? 'Tavoli/Prezzi' : 'VIP/Prices',
    },
    {
      href: `${lp}/guides`,
      active: seg[0] === 'guides' || seg[0] === 'football-afterparties',
      icon: BookOpen,
      label: isIt ? 'Guide' : 'Guides',
    },
  ];

  return (
    <nav
      aria-label={tr(currentLocale, 'Mobile Navigation & VIP Booking', 'Navigazione Mobile & Prenotazione VIP')}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-dark border-t border-champagne/20 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="px-2.5 pt-2 pb-2 space-y-1.5">
        {/* Quick Navigation Row (Touch Targets >= 44px) */}
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center min-h-[44px] rounded-lg px-1 transition-colors ${
                  item.active
                    ? 'bg-champagne/15 text-champagne font-semibold'
                    : 'text-white/70 hover:text-champagne hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5 flex-shrink-0" />
                <span className="text-[10px] tracking-wide truncate max-w-full">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Direct WhatsApp Concierge CTA (+39 351 912 7047) */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-source="bottom_bar"
          aria-label={
            contextName
              ? isIt
                ? `Prenota ${contextName} su WhatsApp (+39 351 912 7047)`
                : isPt
                  ? `Reservar ${contextName} pelo WhatsApp (+39 351 912 7047)`
                  : `Book ${contextName} on WhatsApp (+39 351 912 7047)`
              : isPt
                ? 'Reservar agora pelo WhatsApp (+39 351 912 7047)'
                : tr(
                    currentLocale,
                    'Book now on WhatsApp (+39 351 912 7047)',
                    'Prenota ora su WhatsApp (+39 351 912 7047)'
                  )
          }
          className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-champagne text-black
            min-h-[48px] px-4 active:scale-[0.98] active:bg-[#c2a02f] transition-transform duration-150 shadow-lg"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex flex-col min-w-0 leading-none text-center">
            <span className="font-sans font-bold text-xs sm:text-sm tracking-[0.08em] uppercase truncate">
              {mainLabel}
            </span>
            <span className="font-sans font-medium text-[10px] tracking-wide text-black/80 mt-0.5 truncate">
              {sub}
            </span>
          </span>
        </a>
      </div>
    </nav>
  );
}
