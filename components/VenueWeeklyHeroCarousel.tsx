'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';
import { useHumanAutoScroll } from '@/components/HumanEventCarousel';
import type {
  VenueWeeklyHeroSchedule,
  VenueWeeklyHeroUi,
} from '@/lib/venueWeeklyHero35';

interface VenueWeeklyHeroCarouselProps {
  venueName: string;
  locale?: string;
  ui: VenueWeeklyHeroUi;
  schedule: VenueWeeklyHeroSchedule;
}

const FALLBACK_POSTER_POOL = [
  '/images/events/cards-4x5/flagship-weekly/justme-weekly.webp',
  '/images/events/cards-4x5/flagship-weekly/pineta-weekly.webp',
  '/images/events/cards-4x5/flagship-weekly/voya-weekly.webp',
  '/images/events/cards-4x5/flagship-weekly/55milano-weekly.webp',
  '/images/events/cards-4x5/flagship-weekly/repvblic-weekly.webp',
] as const;

// Curated Milanese Nightlife Districts & Timeframes (20:30 Aperitivo & Dinner, 23:30 Club & VIP Prive Bottle Service until 05:00 across Sempione, Corso Como, Garibaldi, Porta Nuova, Navigli & Rooftop Dress Code venues).
function computeClientRomeNightDayKey(): string {
  try {
    const shifted = new Date(Date.now() - 5 * 3600_000);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(shifted);
    const get = (t: string) => parts.find((p) => p.type === t)?.value || '';
    return `${get('year')}-${get('month')}-${get('day')}`;
  } catch {
    return '';
  }
}

export default function VenueWeeklyHeroCarousel({
  venueName,
  locale = 'en',
  ui,
  schedule,
}: VenueWeeklyHeroCarouselProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [liveTodayKey, setLiveTodayKey] = useState<string>(schedule.todayRomeKey);

  useEffect(() => {
    const clientKey = computeClientRomeNightDayKey();
    if (clientKey) setLiveTodayKey(clientKey);
  }, []);

  const dayFilters = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of schedule.cards) {
      if (!map.has(c.dayKey)) {
        map.set(c.dayKey, c.dayPillLabel);
      }
    }
    return Array.from(map.entries()).map(([dayKey, label]) => ({ dayKey, label }));
  }, [schedule.cards]);

  const visibleCards = useMemo(() => {
    if (selectedDay === 'all') return schedule.cards;
    return schedule.cards.filter((c) => c.dayKey === selectedDay);
  }, [schedule.cards, selectedDay]);

  const {
    copy: humanCopy,
    state: autoState,
    canScroll,
    canScrollPrev,
    canScrollNext,
    userPaused,
    stepPrev,
    stepNext,
    toggleUserPause,
    setWrapperNode,
    wrapperHandlers,
    trackHandlers,
  } = useHumanAutoScroll(scrollRef, { locale, resetKey: selectedDay });

  return (
    <section
      id="serate-settimana-locale"
      ref={setWrapperNode}
      role="region"
      aria-roledescription="carousel"
      data-venue-weekly-hero-carousel="true"
      data-human-event-carousel="true"
      data-human-autoscroll-state={autoState}
      data-human-autoscroll-scrollable={canScroll ? 'true' : 'false'}
      data-schedule-mode={schedule.mode}
      aria-label={`${venueName} · ${ui.title}`}
      className="w-full border-y border-[#F6F1E7]/16 bg-[#0B0A09] text-[#F6F1E7] scroll-mt-24"
      {...wrapperHandlers}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header & Carousel Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 border border-[#F6F1E7]/24 bg-[#050505] px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
              <span className="h-2 w-2 rounded-full bg-[#25D366]" />
              {ui.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[#F6F1E7] tracking-tight m-0">
              {venueName} · <em className="font-serif italic font-semibold text-[#EAE3D5]">{ui.title}</em>
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#C2B9AA] leading-relaxed m-0">
              {ui.subtitle}
            </p>
          </div>

          {visibleCards.length > 1 && (
            <div className="flex items-center gap-2 self-start lg:self-end shrink-0">
              <button
                type="button"
                onClick={toggleUserPause}
                aria-label={userPaused ? humanCopy.play : humanCopy.pause}
                data-human-carousel-toggle="true"
                data-paused={userPaused ? 'true' : 'false'}
                className="min-h-[44px] min-w-[44px] border border-[#F6F1E7]/25 bg-[#141311] px-3 text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] inline-flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                {userPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    <span>{humanCopy.playShort}</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{humanCopy.pauseShort}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={stepPrev}
                disabled={!canScrollPrev}
                aria-label={ui.prevSlideAria}
                className="min-h-[44px] min-w-[44px] border border-[#F6F1E7]/25 bg-[#141311] text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] disabled:opacity-40 flex items-center justify-center font-mono text-lg font-bold transition-colors"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={stepNext}
                disabled={!canScrollNext}
                aria-label={ui.nextSlideAria}
                className="min-h-[44px] min-w-[44px] border border-[#F6F1E7]/25 bg-[#141311] text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] disabled:opacity-40 flex items-center justify-center font-mono text-lg font-bold transition-colors"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Winter-Closed Park Venue Notice (Aria Club Oct-Apr) */}
        {schedule.mode === 'winter-special' && (
          <div className="mb-6 border border-[#F6F1E7]/22 bg-[#141311] p-5 sm:p-6">
            <span className="inline-block bg-[#F6F1E7] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505]">
              {ui.winterNoticeBadge}
            </span>
            <h3 className="mt-2.5 font-display text-xl font-bold text-[#F6F1E7] m-0">
              {ui.winterNoticeTitle}
            </h3>
            <p className="mt-1.5 text-sm text-[#EAE3D5] leading-relaxed max-w-4xl m-0">
              {ui.winterNoticeBody}
            </p>
            {schedule.winterPartners.length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-[#F6F1E7]/14 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C2B9AA] mr-1">
                  {ui.winterPartnerLabel}
                </span>
                {schedule.winterPartners.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    prefetch={false}
                    className="inline-flex min-h-[38px] items-center border border-[#F6F1E7]/25 bg-[#050505] px-3.5 py-1.5 text-xs font-bold text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] transition-colors"
                  >
                    {p.name} ↗
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Day-of-Week Quick Filter Pills */}
        {dayFilters.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-[#F6F1E7]/12">
            <button
              type="button"
              onClick={() => setSelectedDay('all')}
              className={`min-h-[40px] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider border transition-colors ${
                selectedDay === 'all'
                  ? 'bg-[#F6F1E7] text-[#050505] border-[#F6F1E7]'
                  : 'bg-[#141311] text-[#F6F1E7] border-[#F6F1E7]/25 hover:bg-[#F6F1E7] hover:text-[#050505]'
              }`}
            >
              {ui.allDaysLabel} ({schedule.cards.length})
            </button>
            {dayFilters.map((df) => {
              const active = selectedDay === df.dayKey;
              const isTonight = df.dayKey === liveTodayKey;
              return (
                <button
                  key={df.dayKey}
                  type="button"
                  onClick={() => setSelectedDay(df.dayKey)}
                  className={`min-h-[40px] px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider border transition-colors ${
                    active
                      ? 'bg-[#F6F1E7] text-[#050505] border-[#F6F1E7]'
                      : isTonight
                        ? 'bg-[#141311] text-[#25D366] border-[#25D366]/60 hover:bg-[#25D366] hover:text-[#050505]'
                        : 'bg-[#141311] text-[#F6F1E7] border-[#F6F1E7]/25 hover:bg-[#F6F1E7] hover:text-[#050505]'
                  }`}
                >
                  {isTonight ? `${ui.tonightBadge} · ${df.label}` : df.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Horizontal 4:5 Weekly Nights Carousel */}
        {visibleCards.length > 0 && (
          <div className="w-full min-w-0 max-w-full">
            <div
              ref={scrollRef}
              className="flex w-full min-w-0 max-w-full gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain pb-3 snap-x snap-proximity cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              {...trackHandlers}
            >
              {visibleCards.map((card, idx) => {
                const isTonight = card.dayKey === liveTodayKey;
                const resolvedBadge = isTonight
                  ? `${ui.tonightBadge} · ${card.dayPillLabel}`
                  : card.badgeLabel;
                const resolvedPoster = toCardPoster4x5(
                  card.imageSrc || FALLBACK_POSTER_POOL[idx % FALLBACK_POSTER_POOL.length],
                );
                return (
                  <article
                    key={card.id}
                    data-weekly-hero-card={idx + 1}
                    data-weekly-night-card={card.dayKey}
                    style={{ backgroundColor: 'var(--ground, #050505)' }}
                    className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col justify-between border border-[#F6F1E7]/16 bg-[#050505] overflow-hidden hover:border-[#F6F1E7]/45 transition-colors group"
                  >
                    <div>
                      <figure className="m-0">
                        <Link
                          href={card.href}
                          prefetch={false}
                          data-no-lightbox="true"
                          style={{ aspectRatio: '4 / 5' }}
                          className="relative block aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-[#F6F1E7]/12 text-[#F6F1E7]"
                        >
                          <Image
                            src={resolvedPoster}
                            alt={`${card.title} - ${venueName}`}
                            fill
                            quality={92}
                            priority={idx < 2}
                            sizes="(max-width: 640px) 82vw, 320px"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <span
                            className={`absolute top-3 left-3 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isTonight
                                ? 'bg-[#25D366] text-[#050505]'
                                : 'bg-[#050505]/92 text-[#F6F1E7] border border-[#F6F1E7]/28'
                            }`}
                          >
                            {resolvedBadge}
                          </span>
                          <span className="absolute top-3 right-3 bg-[#F6F1E7] px-2.5 py-1 font-mono text-xs font-extrabold text-[#050505]">
                            {card.priceLabel.startsWith('€') ? `${ui.fromPrice} ${card.priceLabel}` : card.priceLabel}
                          </span>
                        </Link>
                      </figure>

                      <div className="p-4" style={{ backgroundColor: 'var(--surface, #050505)' }}>
                        <div className="flex items-center justify-between gap-2 font-mono text-xs text-[#EAE3D5] font-medium mb-1.5 tabular-nums">
                          <span>{card.dayPillLabel}</span>
                          <span>{card.timeLabel}</span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-[#F6F1E7] leading-snug line-clamp-2 m-0">
                          <Link
                            href={card.href}
                            prefetch={false}
                            className="text-[#F6F1E7] hover:text-[#EAE3D5] hover:underline underline-offset-4 transition-colors"
                          >
                            {card.title}
                          </Link>
                        </h3>
                        {card.genres.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {card.genres.map((g) => (
                              <span
                                key={g}
                                className="bg-[#0B0A09] border border-[#F6F1E7]/16 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#C2B9AA]"
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex flex-col gap-2">
                      <a
                        href={card.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full min-h-[44px] inline-flex items-center justify-center bg-[#25D366] hover:bg-[#2EE472] px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors"
                      >
                        {ui.bookWhatsAppCta}
                      </a>
                      <Link
                        href={card.href}
                        prefetch={false}
                        className="w-full min-h-[44px] inline-flex items-center justify-center border border-[#F6F1E7]/25 bg-[#141311] hover:bg-[#F6F1E7] hover:text-[#050505] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F6F1E7] transition-colors"
                      >
                        {ui.openEventSheetCta} →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
