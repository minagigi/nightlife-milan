import { Event, Venue } from '@/lib/types';
import EventCard from './EventCard';
import { HumanEventCarousel } from './HumanEventCarousel';

interface RelatedEventsProps {
  events: Event[];
  venues: Venue[]; // Needed to pass to EventCard
  lang: string;
}

export default function RelatedEvents({ events, venues, lang }: RelatedEventsProps) {
  if (!events || events.length === 0) return null;

  const title = lang === 'it' ? 'Eventi Correlati' : 'Related Events';

  return (
    <section className="mt-16 pt-12 border-t border-white/10" aria-labelledby="related-events-title">
      <h2 id="related-events-title" className="text-2xl md:text-3xl font-serif font-bold text-champagne mb-8">
        {title}
      </h2>
      <HumanEventCarousel locale={lang} ariaLabel={title}>
        {events.map((event) => {
          const venue = venues.find(v => v.id === event.venueId);
          if (!venue) return null;
          return (
            <EventCard 
              key={event.id} 
              event={event} 
              venue={venue} 
              lang={lang} 
              priority={false} 
            />
          );
        })}
      </HumanEventCarousel>
    </section>
  );
}
