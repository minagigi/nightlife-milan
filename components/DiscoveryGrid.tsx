'use client';

import { Suspense, useRef } from 'react';
import { Event, Venue } from '@/lib/types';
import EventCard from './EventCard';
import { useSearchParams } from 'next/navigation';
import { motion, useInView } from 'motion/react';

interface DiscoveryGridProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
  title?: string;
  subtitle?: string;
}

function GridContent({ items, lang, title, subtitle }: DiscoveryGridProps) {
  const searchParams = useSearchParams();
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-60px' });
  
  const genreFilter = searchParams.get('genre')?.toLowerCase().trim();
  const zoneFilter = searchParams.get('zone')?.toLowerCase().trim();
  const priceFilter = searchParams.get('price')?.toLowerCase().trim();

  let filteredItems = [...items];

  if (genreFilter) {
    filteredItems = filteredItems.filter(item => 
      item.event.genre.map(g => g.toLowerCase().trim()).includes(genreFilter)
    );
  }

  if (zoneFilter) {
    filteredItems = filteredItems.filter(item => 
      item.venue.zone.toLowerCase().trim() === zoneFilter
    );
  }

  if (priceFilter) {
    filteredItems = filteredItems.filter(item => {
      const entry = item.event.pricing.entry;
      if (priceFilter === 'free') return entry === 0;
      if (priceFilter === 'under30') return entry > 0 && entry < 30;
      if (priceFilter === 'over30') return entry >= 30;
      return true;
    });
  }

  const defaultTitle = lang === 'it' ? 'Esplora gli Eventi' : 'Discover Events';
  const defaultSubtitle = lang === 'it' ? 'I migliori party selezionati per te' : 'The best parties selected for you';

  if (filteredItems.length === 0) {
    return (
      <section className="py-24 px-4 text-center max-w-3xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-champagne">
          {lang === 'it' 
            ? 'Nessuna vibrazione trovata per questa selezione. Prova un\'altra zona?' 
            : 'No vibes found for this selection. Try another zone?'}
        </h2>
      </section>
    );
  }

  return (
    <section className="w-full py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="discovery-grid-title">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="mb-10 text-center sm:text-left"
      >
        <h2 id="discovery-grid-title" className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-champagne">
          {title || defaultTitle}
        </h2>
        <p className="text-white/40 mt-3 text-lg">
          {subtitle || defaultSubtitle}
        </p>
      </motion.div>
      
      {/* Semantic Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredItems.map(({ event, venue }) => (
          <EventCard 
            key={event.id} 
            event={event} 
            venue={venue} 
            lang={lang} 
            // Grid items are typically below the fold, so priority is false by default
            priority={false} 
          />
        ))}
      </div>
    </section>
  );
}

export default function DiscoveryGrid(props: DiscoveryGridProps) {
  return (
    <Suspense fallback={<div className="w-full py-16 text-center text-champagne">Loading events...</div>}>
      <GridContent {...props} />
    </Suspense>
  );
}
