'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Venue } from '@/lib/types';

interface Props {
  venues: Venue[];
  locale: string;
  firstVenueId: string;
}

export default function HeroInteractive({ venues, locale, firstVenueId }: Props) {
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const lp = typedLocale === 'it' ? '/it' : '';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % venues.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [venues.length, isPaused]);

  const t = {
    en: {
      sub: 'The guide Milan insiders keep to themselves.',
      pills: 'Tables from €200 · Guestlist free · WhatsApp reply in 10 min',
      cta: 'Book VIP Table',
      ctaSub: 'Explore Tonight',
      label: 'MILAN — EST. 2026',
    },
    it: {
      sub: 'La guida che i milanesi tengono per sé.',
      pills: 'Tavoli da €200 · Guestlist gratuita · Risposta WhatsApp in 10 min',
      cta: 'Prenota Tavolo VIP',
      ctaSub: 'Esplora Stasera',
      label: 'MILANO — EST. 2026',
    },
  };

  const current = venues[currentIndex];

  return (
    <>
      {/* Hover capture layer (transparent) */}
      <div
        className="absolute inset-0 z-[3]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      />

      {/* Slideshow overlay — only renders for venues after the first (first is SSR'd) */}
      {currentIndex > 0 && (
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 z-[2]"
          >
            <Image
              src={current.gallery?.[0] || current.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
              alt={current.localizedContent.name[typedLocale] || current.localizedContent.name.en}
              fill quality={75}
              className="object-cover"
              sizes="100vw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Animated gold ambient glow */}
      <motion.div
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-[60%] h-[50%] pointer-events-none z-[4]"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(201,168,106,0.22) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-[10] w-full max-w-6xl mx-auto px-6 sm:px-10 pb-14 sm:pb-20">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-sans text-champagne/50 text-[10px] tracking-[0.35em] uppercase mb-6"
        >
          {t[typedLocale].label}
        </motion.p>

        {/* Venue name */}
        <div className="overflow-hidden mb-2">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current.id}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="font-serif font-bold leading-none tracking-tight text-champagne"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)', textShadow: '0 0 60px rgba(201,168,106,0.3)' }}
            >
              {current.localizedContent.name[typedLocale] || current.localizedContent.name.en}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Zone */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id + '-meta'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-sans text-white/40 text-xs tracking-[0.25em] uppercase mb-6"
          >
            {current.zone.replace(/_/g, ' ')} &nbsp;·&nbsp; {current.category.replace(/_/g, ' ')}
          </motion.p>
        </AnimatePresence>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-8"
        >
          <p className="font-serif text-white text-xl sm:text-2xl font-medium leading-snug mb-3 max-w-xl">
            {t[typedLocale].sub}
          </p>
          <p className="font-sans text-champagne/60 text-[11px] tracking-[0.2em] uppercase">
            {t[typedLocale].pills}
          </p>
        </motion.div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
          <Link
            href={`${lp}/vip-tables`}
            className="group inline-flex items-center justify-center sm:justify-start gap-3 px-8 py-4 bg-champagne text-black
              font-sans font-semibold text-sm tracking-[0.15em] uppercase
              hover:bg-white active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            {t[typedLocale].cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href={`${lp}/calendar/tonight`}
            className="group inline-flex items-center justify-center sm:justify-start gap-3 px-6 py-4 border border-white/20
              font-sans font-semibold text-sm tracking-[0.15em] uppercase text-white/80
              hover:border-champagne/50 hover:text-champagne active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            {t[typedLocale].ctaSub}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
          </Link>

          <Link
            href={`${lp}/clubs`}
            className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase
              hover:text-champagne transition-colors duration-300 cursor-pointer
              flex items-center gap-2 group hidden sm:flex"
          >
            {typedLocale === 'it' ? 'Tutti i locali' : 'All venues'}
            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
          </Link>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center mt-7 -ml-2">
          {venues.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setCurrentIndex(i)}
              aria-label={`${v.localizedContent.name.en} — slide ${i + 1}`}
              aria-current={i === currentIndex}
              className="flex items-center justify-center h-11 w-7 cursor-pointer group/dot"
            >
              <span
                className={`block transition-all duration-500 rounded-full relative overflow-hidden ${
                  i === currentIndex
                    ? 'w-8 h-[3px] bg-white/20'
                    : 'w-[6px] h-[6px] bg-white/25 group-hover/dot:bg-white/50 group-active/dot:bg-white/60'
                }`}
              >
                {i === currentIndex && (
                  <span
                    key={currentIndex}
                    className="absolute inset-y-0 left-0 w-full bg-champagne rounded-full"
                    style={{
                      animation: 'progress-bar 5s linear forwards',
                      animationPlayState: isPaused ? 'paused' : 'running',
                      transformOrigin: 'left center',
                    }}
                  />
                )}
              </span>
            </button>
          ))}
          <span className="ml-2 font-sans text-white/30 text-[10px] tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(venues.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </>
  );
}
