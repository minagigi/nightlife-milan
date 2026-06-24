'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { mockVenues, mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';

export default function MobileBottomBar({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const isIt = currentLocale === 'it';
  const loc = (isIt ? 'it' : 'en') as 'en' | 'it';

  // Hide on the booking success page (conversion already complete)
  if (pathname?.includes('/booking/success')) return null;

  // Strip the /it prefix and split into segments
  const stripped = (pathname || '/').replace(/^\/it(?=\/|$)/, '') || '/';
  const seg = stripped.split('/').filter(Boolean); // e.g. ['clubs', 'just-me-milano']

  // Resolve the venue/event currently being viewed so the CTA is contextual
  let contextName = '';
  let bookingMsg = isIt
    ? 'Ciao! Vorrei prenotare un tavolo VIP a Milano. Puoi aiutarmi?'
    : "Hi! I'd like to book a VIP table in Milan. Can you help me?";

  if (seg[0] === 'clubs' && seg[1]) {
    const venue = mockVenues.find((v) => v.slugs.en === seg[1] || v.slugs.it === seg[1]);
    if (venue) {
      const name = venue.localizedContent.name[loc] || venue.localizedContent.name.en;
      contextName = name;
      bookingMsg = isIt
        ? `Ciao! Vorrei prenotare un tavolo da ${name} a Milano. Puoi aiutarmi?`
        : `Hi! I'd like to book a table at ${name} in Milan. Can you help me?`;
    }
  } else if (seg[0] === 'events' && seg[1] && seg[1] !== 'special') {
    const event = mockEvents.find(
      (e) => e.localizedContent.slug.en === seg[1] || e.localizedContent.slug.it === seg[1]
    );
    if (event) {
      const title = event.localizedContent.title[loc] || event.localizedContent.title.en;
      const venue = mockVenues.find((v) => v.id === event.venueId);
      const vName = venue ? venue.localizedContent.name[loc] || venue.localizedContent.name.en : '';
      contextName = title;
      bookingMsg = isIt
        ? `Ciao! Vorrei prenotare per "${title}"${vName ? ` da ${vName}` : ''} a Milano. Puoi aiutarmi?`
        : `Hi! I'd like to book for "${title}"${vName ? ` at ${vName}` : ''} in Milan. Can you help me?`;
    } else {
      const weekly = weeklyEvents.find((w) => `${w.clubSlug}-${w.day}-${w.eventSlug}` === seg[1]);
      if (weekly) {
        contextName = weekly.name;
        bookingMsg = isIt
          ? `Ciao! Vorrei prenotare per "${weekly.name}" da ${weekly.clubName} a Milano. Puoi aiutarmi?`
          : `Hi! I'd like to book for "${weekly.name}" at ${weekly.clubName} in Milan. Can you help me?`;
      }
    }
  }

  const mainLabel = contextName
    ? `${isIt ? 'Prenota' : 'Book'}: ${contextName}`
    : isIt
    ? 'Prenota Ora'
    : 'Book Now';
  const sub = isIt ? 'Risposta WhatsApp in 10 min' : 'WhatsApp reply in 10 min';

  return (
    <nav
      aria-label={isIt ? 'Prenotazione' : 'Booking'}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-dark border-t border-champagne/15 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="px-3 py-2.5">
        <a
          href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(bookingMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            contextName
              ? isIt
                ? `Prenota ${contextName} su WhatsApp`
                : `Book ${contextName} on WhatsApp`
              : isIt
              ? 'Prenota ora su WhatsApp'
              : 'Book now on WhatsApp'
          }
          className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-champagne text-black
            min-h-[52px] px-4 active:scale-[0.98] active:bg-[#c2a02f] transition-transform duration-150"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex flex-col min-w-0 leading-none">
            <span className="font-sans font-bold text-sm tracking-[0.12em] uppercase truncate">{mainLabel}</span>
            <span className="font-sans font-medium text-[10px] tracking-wide text-black/80 mt-0.5 truncate">{sub}</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
