'use client';

import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { Calendar, Clock } from 'lucide-react';
import type { DateSensitiveEventPresentation } from '@/lib/dateSensitiveInventory';
import { getDateSensitiveEvents } from '@/lib/dateSensitiveView';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';
import { useRomeClock } from './useRomeClock';
import { HumanEventCarousel } from './HumanEventCarousel';

export default function VenueEventDates({
  events,
  locale,
  initialNow,
  upcomingHeading,
  pastHeading,
  hideUpcoming = false,
}: {
  events: readonly DateSensitiveEventPresentation[];
  locale: string;
  initialNow: string;
  upcomingHeading: string;
  pastHeading: string;
  hideUpcoming?: boolean;
}) {
  const now = useRomeClock(initialNow, events);
  const upcoming = getDateSensitiveEvents(events, 'upcoming', now);
  const past = getDateSensitiveEvents(events, 'past', now).reverse().slice(0, 12);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: upcomingHeading,
    numberOfItems: upcoming.length,
    itemListElement: upcoming.map((event, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: event.title,
      url: `https://nightlifemilan.com${prefix}/events/${event.slug}`,
    })),
  }).replaceAll('<', '\\u003c');

  return (
    <div className="space-y-10" data-venue-event-dates>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      {upcoming.length > 0 && !hideUpcoming && (
        <section data-venue-events="upcoming">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-champagne" />
            {upcomingHeading}
          </h2>
          <HumanEventCarousel locale={locale} ariaLabel={upcomingHeading}>
            {upcoming.map((event) => {
              const poster = toCardPoster4x5(
                event.image && !event.image.startsWith('/images/venues/')
                  ? event.image
                  : '/images/events/cards-4x5/flagship-weekly/justme-weekly.webp',
              );
              return (
                <Link
                  key={event.id}
                  data-date-sensitive-event-id={event.id}
                  href={`${prefix}/events/${event.slug}`}
                  prefetch={false}
                  className="group flex flex-col justify-between overflow-hidden rounded-lg bg-[#0B0A09] border border-white/15 hover:border-champagne/50 focus-visible:ring-2 focus-visible:ring-champagne transition-colors"
                >
                  <div>
                    <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-white/12">
                      <Image
                        src={poster}
                        alt={event.title}
                        width={1080}
                        height={1350}
                        sizes="(max-width: 768px) 78vw, 340px"
                        quality={92}
                        className="h-full w-full object-cover"
                      />
                      <time
                        dateTime={event.dateISO}
                        className="absolute top-3 left-3 bg-[#050505]/92 border border-white/25 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-champagne"
                      >
                        {event.labels.dateTime}
                      </time>
                    </div>
                    <div className="p-4">
                      <span className="block font-serif text-lg font-semibold text-white group-hover:text-champagne transition-colors leading-snug">
                        {event.title}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </HumanEventCarousel>
        </section>
      )}
      {past.length > 0 && (
        <section data-venue-events="past">
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-champagne" />
            {pastHeading}
          </h2>
          <HumanEventCarousel locale={locale} cardSize="compact" ariaLabel={pastHeading}>
            {past.map((event) => (
              <Link
                key={event.id}
                data-date-sensitive-event-id={event.id}
                href={`${prefix}/events/${event.slug}`}
                prefetch={false}
                className="flex flex-col justify-between py-4 px-4 rounded-lg bg-white/[0.03] border border-white/15 hover:border-champagne/50 focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <time dateTime={event.dateISO} className="text-champagne text-sm leading-relaxed mb-1.5">
                  {event.labels.dateTime}
                </time>
                <span className="text-white/90 text-base leading-relaxed font-medium">{event.title}</span>
              </Link>
            ))}
          </HumanEventCarousel>
        </section>
      )}
    </div>
  );
}
