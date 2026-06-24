'use client';

import { useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard';
import { Event, Venue } from '@/lib/types';

interface EventsCarouselProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
}

function CarouselInner({ items, lang }: EventsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const genreFilter = searchParams.get('genre')?.toLowerCase().trim();
  const zoneFilter  = searchParams.get('zone')?.toLowerCase().trim();
  const priceFilter = searchParams.get('price')?.toLowerCase().trim();

  let filtered = [...items];
  if (genreFilter) filtered = filtered.filter(i => i.event.genre.map(g => g.toLowerCase()).includes(genreFilter));
  if (zoneFilter)  filtered = filtered.filter(i => i.venue.zone.toLowerCase() === zoneFilter);
  if (priceFilter) filtered = filtered.filter(i => {
    const e = i.event.pricing.entry;
    if (priceFilter === 'free')    return e === 0;
    if (priceFilter === 'under30') return e > 0 && e < 30;
    if (priceFilter === 'over30')  return e >= 30;
    return true;
  });

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 600 : -600, behavior: 'smooth' });
  };

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
    <div className="relative">
      {/* Fade — right edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-[#131009] to-transparent z-10 hidden sm:block" />
      {/* Fade — left edge */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-[#131009] to-transparent z-10" />

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4
          px-4 sm:px-6 lg:px-8
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {filtered.map(({ event, venue }, i) => (
          <div
            key={event.id}
            className="snap-start shrink-0 w-[260px] sm:w-[280px]"
          >
            <EventCard event={event} venue={venue} lang={lang} priority={i < 4} />
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 rounded-full border border-white/15 bg-black/60 backdrop-blur-sm
          flex items-center justify-center text-white/60 hover:text-champagne hover:border-champagne/40
          transition-all duration-200 opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 rounded-full border border-white/15 bg-black/60 backdrop-blur-sm
          flex items-center justify-center text-white/60 hover:text-champagne hover:border-champagne/40
          transition-all duration-200"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function EventsCarousel(props: EventsCarouselProps) {
  return (
    <div className="group/carousel">
      <Suspense fallback={<div className="h-[380px]" />}>
        <CarouselInner {...props} />
      </Suspense>
    </div>
  );
}
