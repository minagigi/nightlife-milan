'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from './EventCard';
import { HumanEventCarousel } from './HumanEventCarousel';
import { Event, Venue } from '@/lib/types';

interface EventsCarouselProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
  showTonightTag?: boolean;
}

function CarouselInner({ items, lang, showTonightTag }: EventsCarouselProps) {
  const searchParams = useSearchParams();

  const genreFilter = searchParams.get('genre')?.toLowerCase().trim();
  const zoneFilter  = searchParams.get('zone')?.toLowerCase().trim();
  const priceFilter = searchParams.get('price')?.toLowerCase().trim();

  let filtered = [...items];
  if (genreFilter) filtered = filtered.filter(i => i.event.genre.map(g => g.toLowerCase()).includes(genreFilter));
  if (zoneFilter)  filtered = filtered.filter(i => i.venue.zone.toLowerCase() === zoneFilter);
  if (priceFilter) filtered = filtered.filter(i => {
    const e = i.event.pricing.entry;
    if (e === null) return false;
    if (priceFilter === 'free')    return e === 0;
    if (priceFilter === 'under30') return e > 0 && e < 30;
    if (priceFilter === 'over30')  return e >= 30;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="font-serif text-xl text-champagne/60">
          {lang === 'it' ? 'Nessun evento trovato.' : 'No events found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      <HumanEventCarousel
        locale={lang}
        cardSize="compact"
        resetKey={`${genreFilter || ''}-${zoneFilter || ''}-${priceFilter || ''}`}
      >
        {filtered.map(({ event, venue }, i) => (
          <div key={event.id}>
            <EventCard event={event} venue={venue} lang={lang} priority={i < 4} isTonight={showTonightTag} />
          </div>
        ))}
      </HumanEventCarousel>
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden max-w-7xl mx-auto pb-4" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="shrink-0 w-[260px] sm:w-[280px]">
          <div
            className="relative overflow-hidden rounded-lg bg-white/[0.04]"
            style={{ aspectRatio: '3/4', animationDelay: `${i * 80}ms` }}
          >
            <div className="skeleton-sweep absolute inset-0" />
          </div>
          <div className="mt-3 space-y-2 px-1">
            <div className="relative h-3 w-1/3 rounded-sm bg-white/[0.04] overflow-hidden">
              <div className="skeleton-sweep absolute inset-0" style={{ animationDelay: `${i * 80 + 100}ms` }} />
            </div>
            <div className="relative h-4 w-2/3 rounded-sm bg-white/[0.04] overflow-hidden">
              <div className="skeleton-sweep absolute inset-0" style={{ animationDelay: `${i * 80 + 200}ms` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function EventsCarousel(props: EventsCarouselProps) {
  return (
    <div className="group/carousel px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<CarouselSkeleton />}>
        <CarouselInner {...props} />
      </Suspense>
    </div>
  );
}
