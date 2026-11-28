'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Event, Venue } from '@/lib/types';
import EventCard from './EventCard';
import { HumanCarouselControls, useHumanAutoScroll } from './HumanEventCarousel';

interface TonightSliderProps {
  items: { event: Event; venue: Venue }[];
  lang: string;
}

export default function TonightSlider({ items, lang }: TonightSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: '-60px' });

  const title = lang === 'it' ? 'Stasera a Milano' : 'Tonight in Milan';
  const subtitle = lang === 'it' ? 'Gli eventi imperdibili di questa notte' : 'Unmissable events happening tonight';

  const {
    copy,
    state,
    canScroll,
    canScrollPrev,
    canScrollNext,
    userPaused,
    progress,
    stepPrev,
    stepNext,
    toggleUserPause,
    setWrapperNode,
    wrapperHandlers,
    trackHandlers,
  } = useHumanAutoScroll(scrollRef, { locale: lang });

  if (!items || items.length === 0) return null;

  return (
    <section
      ref={setWrapperNode}
      role="region"
      aria-roledescription="carousel"
      data-human-event-carousel="true"
      data-human-autoscroll-state={state}
      data-human-autoscroll-scrollable={canScroll ? 'true' : 'false'}
      className="w-full py-12 overflow-hidden"
      aria-labelledby="tonight-slider-title"
      {...wrapperHandlers}
    >
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

        <HumanCarouselControls
          copy={copy}
          canScroll={canScroll}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          userPaused={userPaused}
          progress={progress}
          onPrev={stepPrev}
          onNext={stepNext}
          onTogglePause={toggleUserPause}
          showProgress={false}
        />
      </div>

      {/* Slider with lateral fade hints */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-8 w-16 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to right, #050505, transparent)',
            opacity: canScrollPrev ? 1 : 0,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-8 w-16 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to left, #050505, transparent)',
            opacity: canScrollNext ? 1 : 0,
          }}
        />

        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-8 pt-2 px-4 sm:px-6 lg:px-8 flex items-stretch gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          {...trackHandlers}
        >
          <div className="shrink-0 w-0 lg:w-[calc((100vw-80rem)/2)] hidden lg:block" aria-hidden="true" />

          {items.map(({ event, venue }, index) => (
            <div
              key={event.id}
              className="snap-start shrink-0 w-[80vw] sm:w-[330px] md:w-[360px] h-auto"
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
