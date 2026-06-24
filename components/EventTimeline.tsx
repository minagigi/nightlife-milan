'use client';

import React from 'react';
import { Event, Venue } from '@/lib/types';
import EventCard from './EventCard';

interface EventTimelineProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
}

export default function EventTimeline({ items, lang }: EventTimelineProps) {
  const typedLang = (lang === 'it' ? 'it' : 'en') as 'en' | 'it';
  
  // Extract the hour directly from the ISO string to avoid timezone hydration mismatches
  // The ISO string is expected to be in Milan local time, e.g., "2026-03-10T22:30:00+01:00"
  const getMilanHour = (isoString: string) => {
    try {
      const timePart = isoString.split('T')[1];
      if (timePart) {
        return parseInt(timePart.substring(0, 2), 10);
      }
    } catch (e) {
      // fallback
    }
    return 0;
  };

  // Group events by time slots
  const aperitivoEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour >= 18 && hour < 22;
  });

  const preClubEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour >= 22 && hour <= 23;
  });

  const clubbingEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour >= 0 && hour < 6;
  });

  const sections = [
    {
      title: typedLang === 'it' ? '18:00 - 22:00 | Aperitivo & Dinner' : '18:00 - 22:00 | Aperitivo & Dinner',
      events: aperitivoEvents,
    },
    {
      title: typedLang === 'it' ? '22:00 - 00:00 | Warm Up & Pre-Club' : '22:00 - 00:00 | Warm Up & Pre-Club',
      events: preClubEvents,
    },
    {
      title: typedLang === 'it' ? '00:00+ | Late Night Clubbing' : '00:00+ | Late Night Clubbing',
      events: clubbingEvents,
    }
  ];

  return (
    <section className="w-full py-16 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-champagne mb-4">
            {typedLang === 'it' ? 'La Tua Serata' : 'Your Night Timeline'}
          </h2>
          <p className="text-white/60 text-lg">
            {typedLang === 'it' ? 'Scopri come si evolve la notte milanese.' : 'Discover how the Milanese night evolves.'}
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, idx) => {
            if (section.events.length === 0) return null;
            return (
              <div key={idx} className="relative">
                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block ml-[120px]" />
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Time Header */}
                  <div className="md:w-[240px] shrink-0 relative z-10">
                    <div className="sticky top-24 bg-charcoal/80 backdrop-blur-sm py-2">
                      <h3 className="text-xl font-serif text-white border-l-2 border-champagne pl-4">
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  {/* Events Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.events
                      .sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime())
                      .map(({ event, venue }) => (
                      <EventCard key={event.id} event={event} venue={venue} lang={lang} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
