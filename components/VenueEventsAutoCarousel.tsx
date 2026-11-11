'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import type {
  VenueUi35,
  CarouselEventCard,
  CelebrationOption,
  VenueServiceItem,
  VenueTargetProfile,
} from '@/lib/venueDossiers35';

interface VenueEventsAutoCarouselProps {
  venueName: string;
  ui: VenueUi35;
  tonight: CarouselEventCard[];
  thisWeek: CarouselEventCard[];
  curatedProposals: CarouselEventCard[];
  future: CarouselEventCard[];
  targetProfile: VenueTargetProfile;
  celebrations: CelebrationOption[];
  services: VenueServiceItem[];
}

type TabKey = 'tonight' | 'thisWeek' | 'curated' | 'future';

export default function VenueEventsAutoCarousel({
  venueName,
  ui,
  tonight,
  thisWeek,
  curatedProposals,
  future,
  targetProfile,
  celebrations,
  services,
}: VenueEventsAutoCarouselProps) {
  const defaultTab: TabKey =
    tonight.length > 0
      ? 'tonight'
      : thisWeek.length > 0
        ? 'thisWeek'
        : curatedProposals.length > 0
          ? 'curated'
          : 'future';

  const [activeTab, setActiveTab] = useState<TabKey>(defaultTab);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const rawItems: CarouselEventCard[] =
    activeTab === 'tonight'
      ? tonight
      : activeTab === 'thisWeek'
        ? thisWeek
        : activeTab === 'curated'
          ? curatedProposals
          : future;

  const showTonightFallback = activeTab === 'tonight' && tonight.length === 0;
  const activeItems: CarouselEventCard[] =
    rawItems.length > 0 ? rawItems : curatedProposals.length > 0 ? curatedProposals : future;

  const handleScroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const offset = dir === 'next' ? 380 : -380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 my-12">
      {/* 1. AUTO-UPDATED EVENTS CAROUSEL & TABS (60% Couture Noir) */}
      <section
        aria-label={ui.eventsTitle}
        className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 sm:p-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-2 border border-[#F6F1E7]/25 bg-[#050505] px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#EAE3D5]">
              <span className="h-2 w-2 rounded-full bg-[#25D366]" />
              {ui.eventsEyebrow}
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-normal text-[#F6F1E7] tracking-tight">
              {venueName} · {ui.eventsTitle}
            </h2>
            <p className="mt-1.5 text-sm text-[#C2B9AA] max-w-3xl">{ui.eventsSubtitle}</p>
          </div>

          {/* View Mode & Carousel Arrows */}
          <div className="flex items-center gap-2 self-start lg:self-end">
            <div className="inline-flex border border-[#F6F1E7]/18 bg-[#050505] p-1">
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                  viewMode === 'carousel'
                    ? 'bg-[#F6F1E7] text-[#050505]'
                    : 'text-[#C2B9AA] hover:text-[#F6F1E7]'
                }`}
              >
                {ui.viewCarousel}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
                  viewMode === 'grid'
                    ? 'bg-[#F6F1E7] text-[#050505]'
                    : 'text-[#C2B9AA] hover:text-[#F6F1E7]'
                }`}
              >
                {ui.viewGrid}
              </button>
            </div>
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll('prev')}
                  aria-label="Previous slide"
                  className="h-9 w-9 border border-[#F6F1E7]/20 bg-[#050505] text-[#F6F1E7] hover:border-[#F6F1E7] flex items-center justify-center transition"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('next')}
                  aria-label="Next slide"
                  className="h-9 w-9 border border-[#F6F1E7]/20 bg-[#050505] text-[#F6F1E7] hover:border-[#F6F1E7] flex items-center justify-center transition"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Category Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#F6F1E7]/14 pb-4 mb-6" role="tablist">
          {(
            [
              { key: 'tonight', label: ui.tabTonight, count: tonight.length },
              { key: 'thisWeek', label: ui.tabThisWeek, count: thisWeek.length },
              { key: 'curated', label: ui.tabCurated, count: curatedProposals.length },
              { key: 'future', label: ui.tabFuture, count: future.length },
            ] as const
          ).map((t) => {
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold transition ${
                  active
                    ? 'bg-[#F6F1E7] text-[#050505]'
                    : 'border border-[#F6F1E7]/16 bg-[#050505] text-[#C2B9AA] hover:border-[#F6F1E7]/45 hover:text-[#F6F1E7]'
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`px-2 py-0.5 text-[11px] font-bold ${
                    active ? 'bg-[#050505] text-[#F6F1E7]' : 'bg-[#F6F1E7]/10 text-[#EAE3D5]'
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {showTonightFallback && (
          <div className="mb-5 border border-[#F6F1E7]/25 bg-[#F6F1E7] px-4 py-3 text-xs sm:text-sm font-medium text-[#050505]">
            {ui.tonightFallbackNotice}
          </div>
        )}

        {/* Cards Container (Carousel or Grid) */}
        <div
          ref={scrollRef}
          className={
            viewMode === 'carousel'
              ? 'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
          }
        >
          {activeItems.map((ev) => (
            <article
              key={ev.id}
              className={`${
                viewMode === 'carousel' ? 'min-w-[295px] sm:min-w-[335px] max-w-[350px] snap-start' : ''
              } flex flex-col justify-between border border-[#F6F1E7]/14 bg-[#050505] overflow-hidden hover:border-[#F6F1E7]/45 transition group`}
            >
              <div>
                {/* Uncropped Flyer / Image Frame */}
                <div className="relative h-56 w-full bg-[#050505] flex items-center justify-center overflow-hidden border-b border-[#F6F1E7]/12">
                  <Image
                    src={ev.imageSrc}
                    alt={`${ev.title} - ${venueName}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 350px"
                    quality={80}
                    className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#050505]/92 border border-[#F6F1E7]/25 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                    {ev.badge}
                  </span>
                  <span className="absolute top-3 right-3 bg-[#F6F1E7] px-2.5 py-1 font-mono text-xs font-extrabold text-[#050505]">
                    {ui.fromPrice} {ev.priceLabel}
                  </span>
                </div>

                {/* Card Copy */}
                <div className="p-4">
                  <div className="flex items-center justify-between font-mono text-xs text-[#EAE3D5] font-medium mb-1.5">
                    <span>{ev.dateLabel}</span>
                    <span>{ev.timeLabel}</span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#F6F1E7] line-clamp-2 group-hover:text-[#EAE3D5] transition">
                    {ev.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#C2B9AA]">{ev.categoryLabel}</p>

                  {ev.genres && ev.genres.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ev.genres.map((g) => (
                        <span
                          key={g}
                          className="bg-[#0B0A09] border border-[#F6F1E7]/14 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#C2B9AA]"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dual Action Footer */}
              <div className="p-4 pt-0 flex flex-col gap-2">
                <a
                  href={ev.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition"
                >
                  <span>{ui.bookWhatsApp}</span>
                </a>
                <Link
                  href={ev.href}
                  className="w-full inline-flex items-center justify-center border border-[#F6F1E7]/20 bg-[#0B0A09] hover:border-[#F6F1E7] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#F6F1E7] transition"
                >
                  {ui.viewEvent} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 2. TARGET, CROWD, DRESS CODE, MUSIC & LOGISTICS DOSSIER (30% Warm Editorial Ivory) */}
      <section
        aria-label={ui.targetTitle}
        className="border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-8"
      >
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#3D372E]">
          {ui.targetEyebrow}
        </span>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[#050505]">
          {venueName} · {ui.targetTitle}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: ui.labelAge, value: targetProfile.ageRange },
            { label: ui.labelCrowd, value: targetProfile.crowdVibe },
            { label: ui.labelDressCode, value: targetProfile.dressCode },
            { label: ui.labelMusic, value: targetProfile.musicStyle },
            { label: ui.labelMetro, value: targetProfile.metroAndParking },
            { label: ui.labelSchedule, value: targetProfile.openingSchedule },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[#050505]/14 bg-[#EFE9DC] p-4 flex flex-col justify-between"
            >
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505]">
                <span>{item.label}</span>
              </div>
              <p className="mt-2 text-sm text-[#1F1C18] leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border border-[#050505] bg-[#050505] text-[#F6F1E7] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#EAE3D5]">
              {ui.labelPrices}
            </span>
            <p className="text-sm text-[#F6F1E7] font-medium mt-1">{targetProfile.priceSummary}</p>
          </div>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(
              `Ciao Nightlife Milan, vorrei info e prezzi aggiornati per ${venueName}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center bg-[#25D366] px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] hover:bg-[#20bd5a] transition"
          >
            WhatsApp +39 351 912 7047
          </a>
        </div>
      </section>

      {/* 3. VENUE DECLARED AVAILABLE FOR ALL PARTY TYPES & CELEBRATIONS (60% Couture Noir) */}
      <section
        aria-label={ui.celebrationsTitle}
        className="border border-[#F6F1E7]/16 bg-[#0B0A09] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#EAE3D5]">
            {ui.celebrationsEyebrow}
          </span>
          <span className="border border-[#F6F1E7]/25 bg-[#050505] px-3 py-1 font-mono text-xs font-semibold text-[#F6F1E7]">
            ✓ {ui.availableBadge}
          </span>
        </div>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[#F6F1E7]">
          {venueName} · {ui.celebrationsTitle}
        </h2>
        <p className="mt-2 text-sm text-[#C2B9AA] max-w-3xl">{ui.celebrationsSubtitle}</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {celebrations.map((cel) => (
            <div
              key={cel.id}
              className="border border-[#F6F1E7]/14 bg-[#050505] p-5 flex flex-col justify-between hover:border-[#F6F1E7]/45 transition"
            >
              <div>
                <span className="inline-block bg-[#F6F1E7] px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505]">
                  {cel.formula}
                </span>
                <h3 className="mt-3 font-serif text-xl font-normal text-[#F6F1E7]">{cel.title}</h3>
                <p className="mt-1 font-mono text-xs font-semibold text-[#EAE3D5]">
                  {cel.priceIndication}
                </p>
                <p className="mt-2.5 text-xs sm:text-sm text-[#C2B9AA] leading-relaxed">
                  {cel.details}
                </p>
              </div>
              <a
                href={`https://wa.me/393519127047?text=${encodeURIComponent(cel.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#050505] transition"
              >
                {ui.askQuoteCta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ALL 10 TURNKEY SERVICES OFFERED AT THIS VENUE (30% Warm Editorial Ivory) */}
      <section
        aria-label={ui.servicesTitle}
        className="border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-8"
      >
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#3D372E]">
          {ui.servicesEyebrow}
        </span>
        <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[#050505]">
          {venueName} · {ui.servicesTitle}
        </h2>
        <p className="mt-2 text-sm text-[#3D372E] max-w-3xl">{ui.servicesSubtitle}</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="border border-[#050505]/14 bg-[#EFE9DC] p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#3D372E] font-bold">
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[#050505]">✓</span>
                </div>
                <h3 className="mt-2 font-serif text-base font-semibold text-[#050505]">{srv.title}</h3>
                <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#3D372E]">{srv.spec}</p>
                <p className="mt-2 text-xs text-[#1F1C18] leading-relaxed">{srv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
