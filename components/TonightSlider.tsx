'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Event, Venue } from '@/lib/types';
import EventCard from './EventCard';

interface TonightSliderProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
}

export default function TonightSlider({ items, lang }: TonightSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-60px' });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const title = lang === 'it' ? 'Stasera a Milano' : 'Tonight in Milan';
  const subtitle = lang === 'it' ? 'Gli eventi imperdibili di questa notte' : 'Unmissable events happening tonight';

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    const ro = new ResizeObserver(updateScrollButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      ro.disconnect();
    };
  }, [updateScrollButtons]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -390 : 390, behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full py-12 overflow-hidden" aria-labelledby="tonight-slider-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 id="tonight-slider-title" className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-champagne">
            {title}
          </h2>
          <p className="text-white/40 mt-2">{subtitle}</p>
        </motion.div>

        {/* Prev / Next arrows — desktop only */}
        <motion.div
          className="hidden sm:flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label={lang === 'it' ? 'Precedente' : 'Previous'}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-champagne/50 hover:text-champagne disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label={lang === 'it' ? 'Successivo' : 'Next'}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-champagne/50 hover:text-champagne disabled:opacity-20 disabled:pointer-events-none transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Slider with lateral fade hints */}
      <div className="relative">
        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-8 w-16 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to right, #131009, transparent)',
            opacity: canScrollLeft ? 1 : 0,
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-8 w-16 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to left, #131009, transparent)',
            opacity: canScrollRight ? 1 : 0,
          }}
        />

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto snap-x snap-mandatory pb-8 pt-2 px-4 sm:px-6 lg:px-8 flex items-stretch gap-4 sm:gap-6 hide-scrollbar scroll-smooth"
        >
          <div className="shrink-0 w-0 lg:w-[calc((100vw-80rem)/2)] hidden lg:block" aria-hidden="true" />

          {items.map(({ event, venue }, index) => (
            <div
              key={event.id}
              className="snap-start shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] h-auto"
            >
              <EventCard event={event} venue={venue} lang={lang} priority={index === 0} />
            </div>
          ))}

          <div className="shrink-0 w-4 sm:w-6 lg:w-[calc((100vw-80rem)/2)]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
