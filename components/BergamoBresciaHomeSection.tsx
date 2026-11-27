'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import type { BergamoBresciaCardViewModel } from '@/lib/bergamo-brescia/activeNights35';

export interface BergamoBresciaHomeClubItem {
  id: string;
  clubKey: BergamoBresciaCardViewModel['clubKey'];
  name: string;
  city: string;
  province: 'BG' | 'BS';
  zoneLabel: string;
  genres: string;
  ageRange: string;
  image: string;
  href: string;
  nyeHref: string;
  waHref: string;
}

export interface BergamoBresciaHomeLabels {
  eyebrow: string;
  heading: string;
  subtitle: string;
  hubCta: string;
  waConciergeCta: string;
  filterAll: string;
  filterBergamo: string;
  filterBrescia: string;
  clubsSubheading: string;
  nyeSubheading: string;
  activeSubheading: string;
  nyeBadge: string;
  weeklyBadge: string;
  datedBadge: string;
  openClubCta: string;
  openNyeCta: string;
  openEventCta: string;
  bookWaCta: string;
  liveEventsCountLabel: string;
}

export default function BergamoBresciaHomeSection({
  hubHref,
  waHubHref,
  initialNow,
  clubs,
  nyeCards,
  activeNightCards,
  labels,
}: {
  hubHref: string;
  waHubHref: string;
  initialNow: string;
  clubs: BergamoBresciaHomeClubItem[];
  nyeCards: BergamoBresciaCardViewModel[];
  activeNightCards: BergamoBresciaCardViewModel[];
  labels: BergamoBresciaHomeLabels;
}) {
  const [nowMs, setNowMs] = useState<number>(() => Date.parse(initialNow) || Date.now());
  const [province, setProvince] = useState<'ALL' | 'BG' | 'BS'>('ALL');
  const [selectedClub, setSelectedClub] = useState<
    'ALL' | BergamoBresciaCardViewModel['clubKey']
  >('ALL');

  useEffect(() => {
    const refresh = () => setNowMs(Date.now());
    refresh();
    const timer = window.setInterval(refresh, 60_000);
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  const filteredClubs = useMemo(
    () =>
      clubs.filter((c) => {
        if (province !== 'ALL' && c.province !== province) return false;
        if (selectedClub !== 'ALL' && c.clubKey !== selectedClub) return false;
        return true;
      }),
    [clubs, province, selectedClub],
  );

  const filteredNye = useMemo(
    () =>
      nyeCards.filter((item) => {
        if (Date.parse(item.endISO) <= nowMs) return false;
        if (province !== 'ALL' && item.province !== province) return false;
        if (selectedClub !== 'ALL' && item.clubKey !== selectedClub) return false;
        return true;
      }),
    [nyeCards, nowMs, province, selectedClub],
  );

  const filteredActive = useMemo(
    () =>
      activeNightCards.filter((item) => {
        if (Date.parse(item.endISO) <= nowMs) return false;
        if (province !== 'ALL' && item.province !== province) return false;
        if (selectedClub !== 'ALL' && item.clubKey !== selectedClub) return false;
        return true;
      }),
    [activeNightCards, nowMs, province, selectedClub],
  );

  return (
    <section
      id="bergamo-brescia"
      aria-labelledby="bergamo-brescia-home-heading"
      className="w-full border-t border-[#F6F1E7]/18 bg-[#050505] text-[#F6F1E7]"
    >
      {/* Top Warm Paper Chapter Header (#F6F1E7) */}
      <div className="w-full border-b border-[#050505] bg-[#F6F1E7] text-[#050505]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 border-x border-[#050505]/18 px-5 py-10 lg:flex-row lg:items-end sm:px-14 sm:py-12">
          <div className="space-y-2.5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A453E]">
              {labels.eyebrow}
            </p>
            <h2
              id="bergamo-brescia-home-heading"
              className="font-serif text-3xl font-bold text-[#050505] sm:text-5xl"
            >
              {labels.heading}
            </h2>
            <p className="max-w-[72ch] font-sans text-sm leading-relaxed text-[#24201B] sm:text-base">
              {labels.subtitle}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2.5 bg-[#050505] p-2">
            <Link
              href={hubHref}
              prefetch={false}
              className="inline-flex min-h-[48px] items-center gap-2 bg-[#EAE3D5] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.05em] text-[#050505] transition-colors hover:bg-white"
            >
              <span>{labels.hubCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waHubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.05em] text-[#050505] transition-colors hover:bg-[#2EE472]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{labels.waConciergeCta}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Filter Bar + Content */}
      <div className="mx-auto max-w-[1440px] space-y-12 border-x border-[#F6F1E7]/14 px-5 py-12 sm:px-14 sm:py-16">
        <div className="space-y-4 border border-white/15 bg-[#141311] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'ALL', label: labels.filterAll },
                  { id: 'BG', label: labels.filterBergamo },
                  { id: 'BS', label: labels.filterBrescia },
                ] as const
              ).map((tab) => {
                const active = province === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setProvince(tab.id);
                      if (
                        tab.id !== 'ALL' &&
                        selectedClub !== 'ALL' &&
                        clubs.find((x) => x.clubKey === selectedClub)?.province !== tab.id
                      ) {
                        setSelectedClub('ALL');
                      }
                    }}
                    className={`min-h-[40px] px-4 py-2 font-mono text-xs font-extrabold uppercase tracking-wider transition-colors ${
                      active
                        ? 'bg-[#EAE3D5] text-[#050505]'
                        : 'border border-white/20 bg-[#050505] text-[#F6F1E7] hover:border-[#EAE3D5]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#EAE3D5]">
              {filteredNye.length + filteredActive.length} {labels.liveEventsCountLabel}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => setSelectedClub('ALL')}
              className={`min-h-[36px] px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedClub === 'ALL'
                  ? 'bg-[#25D366] text-[#050505]'
                  : 'border border-white/15 bg-[#050505] text-[#EAE3D5] hover:border-[#EAE3D5]'
              }`}
            >
              6 Club (BG & BS)
            </button>
            {clubs
              .filter((c) => province === 'ALL' || c.province === province)
              .map((c) => {
                const active = selectedClub === c.clubKey;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedClub(c.clubKey)}
                    className={`min-h-[36px] px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                      active
                        ? 'bg-[#25D366] text-[#050505]'
                        : 'border border-white/15 bg-[#050505] text-[#EAE3D5] hover:border-[#EAE3D5]'
                    }`}
                  >
                    {c.name} ({c.province})
                  </button>
                );
              })}
          </div>
        </div>

        {/* 1. Six Clubs Strip */}
        <div className="space-y-5" data-no-lightbox="true">
          <h3 className="font-serif text-2xl text-[#F6F1E7] sm:text-3xl">
            {labels.clubsSubheading}
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {filteredClubs.map((clubItem) => (
              <article
                key={clubItem.id}
                data-no-lightbox="true"
                className="flex flex-col justify-between overflow-hidden border border-white/15 bg-[#141311]"
              >
                <div>
                  <Link href={clubItem.href} prefetch={false} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                      <Image
                        src={clubItem.image}
                        alt={`${clubItem.name} · ${clubItem.zoneLabel}`}
                        width={1080}
                        height={1350}
                        quality={92}
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 240px"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </Link>
                  <div className="space-y-1.5 p-3.5">
                    <span className="inline-block border border-[#EAE3D5]/30 bg-[#050505] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                      {clubItem.city} · {clubItem.province}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#F6F1E7]">
                      <Link
                        href={clubItem.href}
                        prefetch={false}
                        className="hover:text-[#EAE3D5]"
                      >
                        {clubItem.name}
                      </Link>
                    </h4>
                    <p className="font-sans text-[11px] text-[#C2B9AA]">{clubItem.genres}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 border-t border-white/10 p-3.5 pt-2.5">
                  <Link
                    href={clubItem.href}
                    prefetch={false}
                    className="inline-flex min-h-[38px] items-center justify-center bg-[#EAE3D5] px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
                  >
                    {labels.openClubCta}
                  </Link>
                  <Link
                    href={clubItem.nyeHref}
                    prefetch={false}
                    className="inline-flex min-h-[36px] items-center justify-center border border-[#EAE3D5]/40 bg-[#050505] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F6F1E7] hover:border-[#EAE3D5]"
                  >
                    {labels.openNyeCta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. Capodanno 2027 (All 6 Bergamo & Brescia NYE Sheets) */}
        {filteredNye.length > 0 && (
          <div className="space-y-5" data-no-lightbox="true">
            <h3 className="font-serif text-2xl text-[#F6F1E7] sm:text-3xl">
              {labels.nyeSubheading}
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNye.map((card) => (
                <article
                  key={card.id}
                  data-no-lightbox="true"
                  className="flex flex-col justify-between overflow-hidden border border-[#EAE3D5]/30 bg-[#141311]"
                >
                  <div>
                    <Link href={card.href} prefetch={false} className="block">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                        <Image
                          src={card.posterSrc}
                          alt={`${card.title} · ${card.venueName}`}
                          width={1080}
                          height={1350}
                          quality={92}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>
                    </Link>
                    <div className="space-y-2 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 bg-[#EAE3D5] px-2.5 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#050505]">
                          <Sparkles className="h-3 w-3" />
                          {labels.nyeBadge}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#EAE3D5]">
                          <MapPin className="h-3 w-3" />
                          {card.city} ({card.province})
                        </span>
                      </div>
                      <h4 className="font-serif text-lg leading-snug text-[#F6F1E7]">
                        <Link
                          href={card.href}
                          prefetch={false}
                          className="hover:text-[#EAE3D5]"
                        >
                          {card.title}
                        </Link>
                      </h4>
                      <p className="font-mono text-xs text-[#EAE3D5]">{card.whenLabel}</p>
                      <p className="font-sans text-xs text-[#C2B9AA]">{card.genresLabel}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4 pt-3">
                    <Link
                      href={card.href}
                      prefetch={false}
                      className="inline-flex min-h-[42px] items-center justify-center gap-1 bg-[#EAE3D5] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
                    >
                      <span>{labels.openEventCta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={card.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center justify-center gap-1 bg-[#25D366] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#2EE472]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{labels.bookWaCta}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 3. All Active Nights (Weekly + Dated December 2026 Events) */}
        {filteredActive.length > 0 && (
          <div className="space-y-5" data-no-lightbox="true">
            <h3 className="font-serif text-2xl text-[#F6F1E7] sm:text-3xl">
              {labels.activeSubheading}
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredActive.map((card) => (
                <article
                  key={card.id}
                  data-no-lightbox="true"
                  className="flex flex-col justify-between overflow-hidden border border-white/15 bg-[#141311]"
                >
                  <div>
                    <Link href={card.href} prefetch={false} className="block">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
                        <Image
                          src={card.posterSrc}
                          alt={`${card.title} · ${card.venueName}`}
                          width={1080}
                          height={1350}
                          quality={92}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>
                    </Link>
                    <div className="space-y-2 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="border border-[#EAE3D5]/35 bg-[#050505] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#EAE3D5]">
                          {card.kind === 'dated' ? labels.datedBadge : labels.weeklyBadge}
                        </span>
                        <span className="font-mono text-[11px] text-[#C2B9AA]">
                          {card.city} ({card.province})
                        </span>
                      </div>
                      <h4 className="font-serif text-base leading-snug text-[#F6F1E7]">
                        <Link
                          href={card.href}
                          prefetch={false}
                          className="hover:text-[#EAE3D5]"
                        >
                          {card.title}
                        </Link>
                      </h4>
                      <p className="flex items-center gap-1.5 font-mono text-xs text-[#EAE3D5]">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>{card.whenLabel}</span>
                      </p>
                      <p className="font-sans text-xs text-[#C2B9AA]">{card.genresLabel}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-4 pt-3">
                    <Link
                      href={card.href}
                      prefetch={false}
                      className="inline-flex min-h-[40px] items-center justify-center gap-1 bg-[#EAE3D5] px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-white"
                    >
                      <span>{labels.openEventCta}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                      href={card.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center justify-center gap-1 bg-[#25D366] px-2.5 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#2EE472]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{labels.bookWaCta}</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
