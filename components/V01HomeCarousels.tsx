'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getDateSensitiveEvents, millisecondsUntilNextDateSensitiveChange } from '@/lib/dateSensitiveView';
import type { TableConciergeEvent } from '@/lib/tableConcierge';
import { getV01SiteCopy, type V01CarouselCopy } from '@/lib/i18n/v01SiteCopy35';

export type V01CapodannoSlide = {
  slug: string;
  venueName: string;
  title: string;
  subtitle: string;
  image: string;
  priceBadge: string;
  href: string;
  musicAndFormat: string;
  city: string;
  waHref: string;
};

export type V01PartnerClubSlide = {
  rank: string;
  id: string;
  name: string;
  zone: string;
  genres: string;
  dress: string;
  image: string;
  href: string;
  waHref: string;
};

type Props = {
  locale: string;
  localePrefix: string;
  initialNow: string;
  capodannoEvents: readonly V01CapodannoSlide[];
  dateSensitiveEvents: readonly TableConciergeEvent[];
  partnerClubs: readonly V01PartnerClubSlide[];
  capodannoHubHref: string;
  tonightHref: string;
  weekHref: string;
  clubsHref: string;
};

function CarouselBand({
  id,
  cialdini,
  surfaceClass,
  copy,
  countValue,
  viewAllHref,
  prevAria,
  nextAria,
  children,
}: {
  id: string;
  cialdini: 'scarcity' | 'social-proof';
  surfaceClass: string;
  copy: V01CarouselCopy;
  countValue: string;
  viewAllHref: string;
  prevAria: string;
  nextAria: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  };

  return (
    <section
      id={id}
      data-cialdini={cialdini}
      className={`w-full border-b border-[#F6F1E7]/14 ${surfaceClass} text-[#F6F1E7]`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 sm:py-16">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#F6F1E7]/12 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2.5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center border border-[#EAE3D5]/35 bg-[#141311] px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#EAE3D5]">
                {countValue}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C2B9AA]">
                {copy.kicker}
              </span>
            </div>
            <h2
              id={`${id}-heading`}
              className="font-serif text-3xl font-normal tracking-[-0.02em] text-[#F6F1E7] sm:text-5xl"
            >
              {copy.titleBefore}
              <em className="italic text-[#EAE3D5]">{copy.titleAccent}</em>
            </h2>
            <p className="mt-2.5 max-w-[68ch] font-sans text-sm leading-relaxed text-[#DED8CC] sm:text-base">
              {copy.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack(-1)}
                aria-label={prevAria}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#EAE3D5]/35 bg-[#141311] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack(1)}
                aria-label={nextAria}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#EAE3D5]/35 bg-[#141311] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <Link
              href={viewAllHref}
              prefetch={false}
              className="inline-flex min-h-11 items-center justify-center border border-[#EAE3D5]/40 bg-[#141311] px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
            >
              {copy.viewAll} ↗
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="v01-carousel-track flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default function V01HomeCarousels({
  locale,
  localePrefix: lp,
  initialNow,
  capodannoEvents,
  dateSensitiveEvents,
  partnerClubs,
  capodannoHubHref,
  tonightHref,
  weekHref,
  clubsHref,
}: Props) {
  const pathname = usePathname() || lp || '/';
  const [now, setNow] = useState(() => new Date(initialNow));
  const v01 = getV01SiteCopy(locale);

  useEffect(() => {
    let timer: number | undefined;
    const scheduleRefresh = () => {
      const delay = millisecondsUntilNextDateSensitiveChange(dateSensitiveEvents, new Date());
      timer = window.setTimeout(() => {
        setNow(new Date());
        scheduleRefresh();
      }, delay);
    };
    const refresh = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      setNow(new Date());
      scheduleRefresh();
    };
    refresh();
    document.addEventListener('visibilitychange', refresh);
    window.addEventListener('focus', refresh);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', refresh);
      window.removeEventListener('focus', refresh);
    };
  }, [dateSensitiveEvents]);

  const tonightEvents = useMemo(() => {
    const liveTonight = getDateSensitiveEvents(dateSensitiveEvents, 'tonight', now);
    if (liveTonight.length > 0) return liveTonight;
    return getDateSensitiveEvents(dateSensitiveEvents, 'upcoming', now).slice(0, 8);
  }, [dateSensitiveEvents, now]);

  const weekEvents = useMemo(() => {
    const liveWeek = getDateSensitiveEvents(dateSensitiveEvents, 'calendar-week', now);
    if (liveWeek.length > 0) return liveWeek;
    return getDateSensitiveEvents(dateSensitiveEvents, 'upcoming', now).slice(0, 12);
  }, [dateSensitiveEvents, now]);

  const cardShellClass =
    'shrink-0 w-[292px] sm:w-[332px] lg:w-[356px] snap-start flex flex-col justify-between bg-[#141311] border border-[#F6F1E7]/14 hover:border-[#EAE3D5]/55 transition-colors';

  const renderDateEventCard = (ev: TableConciergeEvent, copy: V01CarouselCopy) => {
    const waHref = getConciergeBookingUrl(
      locale,
      `${ev.title} (${ev.venueName}) · ${ev.labels.longDate}`,
      pathname,
    );
    return (
      <article key={ev.id} className={cardShellClass}>
        <div>
          <Link
            href={`${lp}/events/${ev.slug}`}
            prefetch={false}
            className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#F6F1E7]/14 bg-[#050505]"
          >
            <Image
              src={ev.image}
              alt={ev.venueAltText || `${ev.title} · ${ev.venueName}`}
              fill
              quality={92}
              sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 380px"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 border border-[#EAE3D5]/35 bg-[#050505]/90 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#EAE3D5]">
              {ev.labels.longDate}
            </span>
            <span className="absolute right-3 top-3 bg-[#EAE3D5] px-2.5 py-1 font-mono text-[11px] font-bold text-[#050505]">
              {ev.labels.time}
            </span>
          </Link>
          <div className="p-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#EAE3D5]">
              {ev.venueName}
            </p>
            <h3 className="mt-1.5 font-serif text-xl font-normal leading-snug text-[#F6F1E7]">
              <Link href={`${lp}/events/${ev.slug}`} prefetch={false} className="hover:underline">
                {ev.title}
              </Link>
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-[#F6F1E7]/14">
          <Link
            href={`${lp}/events/${ev.slug}`}
            prefetch={false}
            className="flex min-h-[46px] items-center justify-center border-r border-[#F6F1E7]/14 bg-[#141311] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#F6F1E7] transition-colors hover:bg-[#1E1C19]"
          >
            {copy.infoCta}
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[46px] items-center justify-center bg-[#25D366] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#050505] transition-colors hover:bg-[#2EE472]"
          >
            {copy.waCta} ↗
          </a>
        </div>
      </article>
    );
  };

  return (
    <>
      {/* 1. CAROSELLO ORIZZONTALE — CAPODANNO MILANO 2027 (19 EVENTI IN ORDINE UFFICIALE) */}
      <CarouselBand
        id="capodanno"
        cialdini="scarcity"
        surfaceClass="bg-[#050505]"
        copy={v01.capodanno}
        countValue={String(capodannoEvents.length).padStart(2, '0')}
        viewAllHref={capodannoHubHref}
        prevAria={v01.prevAria}
        nextAria={v01.nextAria}
      >
        {capodannoEvents.map((ev, index) => (
          <article key={ev.slug} className={cardShellClass}>
            <div>
              <Link
                href={ev.href}
                prefetch={false}
                className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#F6F1E7]/14 bg-[#0B0A09]"
              >
                <Image
                  src={ev.image}
                  alt={`${ev.venueName} · ${ev.title}`}
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 380px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 border border-[#EAE3D5]/40 bg-[#050505]/92 px-2.5 py-1 font-mono text-[11px] font-bold text-[#EAE3D5]">
                  #{String(index + 1).padStart(2, '0')} · 31 DEC
                </span>
                <span className="absolute right-3 top-3 bg-[#EAE3D5] px-2.5 py-1 font-mono text-[11px] font-bold text-[#050505]">
                  {ev.priceBadge}
                </span>
              </Link>
              <div className="p-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#EAE3D5]">
                  {ev.venueName} · {ev.city}
                </p>
                <h3 className="mt-1.5 font-serif text-xl font-normal leading-snug text-[#F6F1E7]">
                  <Link href={ev.href} prefetch={false} className="hover:underline">
                    {ev.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 font-sans text-[13px] leading-relaxed text-[#C2B9AA]">
                  {ev.musicAndFormat}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-[#F6F1E7]/14">
              <Link
                href={ev.href}
                prefetch={false}
                className="flex min-h-[46px] items-center justify-center border-r border-[#F6F1E7]/14 bg-[#141311] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#F6F1E7] transition-colors hover:bg-[#1E1C19]"
              >
                {v01.capodanno.infoCta}
              </Link>
              <a
                href={ev.waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] items-center justify-center bg-[#25D366] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                {v01.capodanno.waCta} ↗
              </a>
            </div>
          </article>
        ))}
      </CarouselBand>

      {/* 2. CAROSELLO ORIZZONTALE — QUESTA SERA A MILANO */}
      <CarouselBand
        id="stasera"
        cialdini="scarcity"
        surfaceClass="bg-[#0B0A09]"
        copy={v01.stasera}
        countValue={v01.stasera.countBadge}
        viewAllHref={tonightHref}
        prevAria={v01.prevAria}
        nextAria={v01.nextAria}
      >
        {tonightEvents.map((ev) => renderDateEventCard(ev, v01.stasera))}
      </CarouselBand>

      {/* 3. CAROSELLO ORIZZONTALE — QUESTA SETTIMANA & WEEKEND */}
      <CarouselBand
        id="settimana"
        cialdini="social-proof"
        surfaceClass="bg-[#050505]"
        copy={v01.settimana}
        countValue={v01.settimana.countBadge}
        viewAllHref={weekHref}
        prevAria={v01.prevAria}
        nextAria={v01.nextAria}
      >
        {weekEvents.map((ev) => renderDateEventCard(ev, v01.settimana))}
      </CarouselBand>

      {/* 4. CAROSELLO ORIZZONTALE — I NOSTRI LOCALI PARTNER (18 CLUB IN ORDINE UFFICIALE) */}
      <CarouselBand
        id="locali-partner"
        cialdini="social-proof"
        surfaceClass="bg-[#0B0A09]"
        copy={v01.partner}
        countValue={String(partnerClubs.length).padStart(2, '0')}
        viewAllHref={clubsHref}
        prevAria={v01.prevAria}
        nextAria={v01.nextAria}
      >
        {partnerClubs.map((club) => (
          <article key={club.id} className={cardShellClass}>
            <div>
              <Link
                href={club.href}
                prefetch={false}
                className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#F6F1E7]/14 bg-[#050505]"
              >
                <Image
                  src={club.image}
                  alt={`${club.name} · ${club.zone}`}
                  fill
                  quality={92}
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 380px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 border border-[#EAE3D5]/40 bg-[#050505]/92 px-2.5 py-1 font-mono text-[11px] font-bold text-[#EAE3D5]">
                  #{club.rank} · {v01.partnerBadgePrefix}
                </span>
              </Link>
              <div className="p-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#EAE3D5]">
                  {club.zone}
                </p>
                <h3 className="mt-1.5 font-serif text-2xl font-normal leading-tight text-[#F6F1E7]">
                  <Link href={club.href} prefetch={false} className="hover:underline">
                    {club.name}
                  </Link>
                </h3>
                <p className="mt-2 font-mono text-[11.5px] text-[#DED8CC]">
                  {club.genres}
                </p>
                <p className="mt-1 font-sans text-[12.5px] text-[#A8A093]">
                  {v01.dressLabel}: {club.dress}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-[#F6F1E7]/14">
              <Link
                href={club.href}
                prefetch={false}
                className="flex min-h-[46px] items-center justify-center border-r border-[#F6F1E7]/14 bg-[#141311] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#F6F1E7] transition-colors hover:bg-[#1E1C19]"
              >
                {v01.partner.infoCta}
              </Link>
              <a
                href={club.waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[46px] items-center justify-center bg-[#25D366] px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                {v01.partner.waCta} ↗
              </a>
            </div>
          </article>
        ))}
      </CarouselBand>
    </>
  );
}
