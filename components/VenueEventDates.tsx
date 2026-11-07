'use client';

import Link from '@/components/LocalizedLink';
import { Calendar, Clock } from 'lucide-react';
import type { DateSensitiveEventPresentation } from '@/lib/dateSensitiveInventory';
import { getDateSensitiveEvents } from '@/lib/dateSensitiveView';
import { useRomeClock } from './useRomeClock';

export default function VenueEventDates({ events, locale, initialNow, upcomingHeading, pastHeading, hideUpcoming = false }: {
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
    '@context': 'https://schema.org', '@type': 'ItemList', name: upcomingHeading,
    numberOfItems: upcoming.length,
    itemListElement: upcoming.map((event, position) => ({
      '@type': 'ListItem', position: position + 1, name: event.title,
      url: `https://nightlifemilan.com${prefix}/events/${event.slug}`,
    })),
  }).replaceAll('<', '\\u003c');
  return <div className="space-y-10" data-venue-event-dates>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    {([{ heading: upcomingHeading, items: upcoming, archived: false }, { heading: pastHeading, items: past, archived: true }]).map(group => group.items.length > 0 && (group.archived || !hideUpcoming) && (
      <section key={group.heading} data-venue-events={group.archived ? 'past' : 'upcoming'}>
        <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
          {group.archived ? <Clock className="w-6 h-6 text-champagne" /> : <Calendar className="w-6 h-6 text-champagne" />}
          {group.heading}
        </h2>
        <div className="space-y-3">
          {group.items.map(event => <Link key={event.id} data-date-sensitive-event-id={event.id} href={`${prefix}/events/${event.slug}`} prefetch={false} className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] py-4 px-4 rounded-lg bg-white/[0.03] border border-white/15 hover:border-champagne/50 focus-visible:ring-2 focus-visible:ring-champagne">
            <time dateTime={event.dateISO} className="text-champagne text-sm leading-relaxed">{event.labels.dateTime}</time>
            <span className="text-white/90 text-base leading-relaxed">{event.title}</span>
          </Link>)}
        </div>
      </section>
    ))}
  </div>;
}

