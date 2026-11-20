'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { CAPODANNO_PARTNER_PRIORITY_SLUGS } from '@/lib/capodannoEvents';

export type HomePosterSlide = {
  slug: string;
  venueName: string;
  title: string;
  subtitle: string;
  image: string;
  priceFromEur: number;
  priceBadge: string;
  href: string;
  musicAndFormat: string;
  city: string;
};

type CountdownParts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  reached: boolean;
};

const TARGET_NYE_MS = Date.parse('2027-01-01T00:00:00+01:00');
const PRIORITY_INDEX = new Map<string, number>(
  CAPODANNO_PARTNER_PRIORITY_SLUGS.map((slug, idx) => [slug, idx]),
);

const COUNTDOWN_LABELS: Record<
  string,
  { heading: string; d: string; h: string; m: string; s: string; cta: string; live: string }
> = {
  it: {
    heading: 'Capodanno a Milano 2027 · Conto alla Rovescia',
    d: 'Giorni',
    h: 'Ore',
    m: 'Min',
    s: 'Sec',
    cta: 'Scopri pacchetti',
    live: 'Buon 2027',
  },
  en: {
    heading: 'New Year’s Eve Milan 2027 · Live Countdown',
    d: 'Days',
    h: 'Hrs',
    m: 'Min',
    s: 'Sec',
    cta: 'Explore event',
    live: 'Happy 2027',
  },
  es: {
    heading: 'Nochevieja Milán 2027 · Cuenta Atrás',
    d: 'Días',
    h: 'Horas',
    m: 'Min',
    s: 'Seg',
    cta: 'Ver evento',
    live: 'Feliz 2027',
  },
  fr: {
    heading: 'Réveillon Milan 2027 · Compte à Rebours',
    d: 'Jours',
    h: 'Heures',
    m: 'Min',
    s: 'Sec',
    cta: 'Voir l’événement',
    live: 'Bonne année 2027',
  },
  de: {
    heading: 'Silvester Mailand 2027 · Countdown',
    d: 'Tage',
    h: 'Std',
    m: 'Min',
    s: 'Sek',
    cta: 'Zum Event',
    live: 'Frohes 2027',
  },
};

function computeCountdown(nowMs: number): CountdownParts {
  const diff = TARGET_NYE_MS - nowMs;
  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00', reached: true };
  }
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, '0'); // taste-skill-ignore (clock)
  return {
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    reached: false,
  };
}

const PAGE_SIZE = 4;

export default function HomePosterCarousel({
  locale,
  slides,
  hubHref,
  hubLabel,
}: {
  locale: string;
  slides: HomePosterSlide[];
  hubHref: string;
  hubLabel: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  const orderedSlides = useMemo(() => {
    return [...slides].sort((a, b) => {
      const ia = PRIORITY_INDEX.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
      const ib = PRIORITY_INDEX.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
      return ia - ib;
    });
  }, [slides]);

  const totalPages = Math.max(1, Math.ceil(orderedSlides.length / PAGE_SIZE));
  const clampedPage = Math.min(pageIndex, totalPages - 1);
  const startIdx = Math.min(
    clampedPage * PAGE_SIZE,
    Math.max(0, orderedSlides.length - PAGE_SIZE),
  );
  const visibleSlides = useMemo(
    () => orderedSlides.slice(startIdx, startIdx + PAGE_SIZE),
    [orderedSlides, startIdx],
  );

  const labels = COUNTDOWN_LABELS[locale] || COUNTDOWN_LABELS.en;

  useEffect(() => {
    setCountdown(computeCountdown(Date.now()));
    const timer = window.setInterval(() => {
      setCountdown(computeCountdown(Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const auto = window.setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages);
    }, 6500);
    return () => window.clearInterval(auto);
  }, [paused, totalPages]);

  const stepPage = (dir: -1 | 1) => {
    setPageIndex((p) => (p + dir + totalPages) % totalPages);
  };

  if (orderedSlides.length === 0) return null;

  return (
    <section
      data-no-lightbox="true"
      className="w-full border-b border-white/14 bg-[#0A0A0C] text-[#FFFFFF]"
    >
      <div className="mx-auto max-w-[1440px] border-x border-white/14 px-4 pt-16 pb-12 sm:px-10">
        {/* Top bar: Countdown + Navigation */}
        <div className="mb-7 flex flex-col gap-5 border-b border-white/14 pb-6 lg:flex-row lg:items-end lg:justify-between" data-reveal="rise">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase text-[#FFFFFF] sm:text-5xl">
              {labels.heading}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div
              data-nye-countdown
              className="grid grid-cols-4 gap-2 border border-white/18 bg-[#18181C] px-4 py-2.5 tabular-nums"
            >
              {countdown?.reached ? (
                <span className="col-span-4 px-2 font-display text-2xl font-extrabold text-[#D9381E]">
                  {labels.live}
                </span>
              ) : (
                <>
                  <div className="text-center">
                    <span className="block font-display text-2xl font-extrabold text-[#FFFFFF]">
                      {countdown ? countdown.days : '--'}
                    </span>
                    <span className="block text-[13px] font-medium text-[#C9C7C2]">
                      {labels.d}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block font-display text-2xl font-extrabold text-[#FFFFFF]">
                      {countdown ? countdown.hours : '--'}
                    </span>
                    <span className="block text-[13px] font-medium text-[#C9C7C2]">
                      {labels.h}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block font-display text-2xl font-extrabold text-[#FFFFFF]">
                      {countdown ? countdown.minutes : '--'}
                    </span>
                    <span className="block text-[13px] font-medium text-[#C9C7C2]">
                      {labels.m}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block font-display text-2xl font-extrabold text-[#D9381E]">
                      {countdown ? countdown.seconds : '--'}
                    </span>
                    <span className="block text-[13px] font-medium text-[#C9C7C2]">
                      {labels.s}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepPage(-1)}
                aria-label="Previous"
                className="nlm-pressable flex h-11 w-11 items-center justify-center border border-white/25 bg-[#18181C] text-[#FFFFFF] hover:border-[#FFFFFF]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span
                className="px-2 font-sans text-[13px] font-semibold tabular-nums text-[#C9C7C2]"
                aria-live="polite"
              >
                {clampedPage + 1}/{totalPages}
              </span>
              <button
                type="button"
                onClick={() => stepPage(1)}
                aria-label="Next"
                className="nlm-pressable flex h-11 w-11 items-center justify-center border border-white/25 bg-[#18181C] text-[#FFFFFF] hover:border-[#FFFFFF]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? 'Play' : 'Pause'}
                className="nlm-pressable flex h-11 w-11 items-center justify-center border border-white/25 bg-[#18181C] text-[#FFFFFF] hover:border-[#FFFFFF]"
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <Link
                href={hubHref}
                prefetch={false}
                className="nlm-pressable hidden min-h-[44px] items-center gap-1.5 border border-white/30 px-4 py-2 text-[13px] font-bold text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0A0A0C] sm:inline-flex"
              >
                <span>{hubLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Paginated 4-column editorial poster showcase (zero edge clipping, partner priority 1..18) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleSlides.map((slide, idx) => (
            <article
              key={slide.slug}
              data-reveal={clampedPage === 0 ? 'clip' : undefined}
              data-stagger={clampedPage === 0 ? String((idx % 4) + 1) : undefined}
              className="flex flex-col justify-between border border-white/16 bg-[#18181C]"
            >
              <div>
                <Link
                  href={slide.href}
                  prefetch={false}
                  className="relative block aspect-[16/9] w-full overflow-hidden border-b border-white/14 bg-[#0A0A0C]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    quality={92}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 23vw"
                    className="nlm-hover-zoom object-contain"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-3xl font-extrabold tabular-nums text-[#D9381E]">
                      {startIdx + idx + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-[#C9C7C2]">{slide.city}</span>
                  </div>
                  <p className="mt-1 text-[13px] font-bold text-[#EDEBE6]">{slide.venueName}</p>
                  <h3 className="mt-1 line-clamp-2 font-display text-lg font-bold leading-snug text-[#FFFFFF] sm:text-xl">
                    <Link href={slide.href} prefetch={false} className="hover:underline">
                      {slide.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-[#C9C7C2]">{slide.musicAndFormat}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/14 bg-[#0A0A0C] px-4 py-3">
                <span className="font-display text-xl font-extrabold tabular-nums text-[#D9381E] sm:text-2xl">
                  {slide.priceBadge}
                </span>
                <Link
                  href={slide.href}
                  prefetch={false}
                  className="nlm-pressable inline-flex min-h-[42px] items-center gap-1.5 bg-[#D9381E] px-4 py-2 text-[13px] font-bold text-[#FFFFFF] transition hover:bg-[#B82B14]"
                >
                  <span>{labels.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
