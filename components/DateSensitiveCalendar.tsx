'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle2, Clock3, MapPin } from 'lucide-react';
import type { DateSensitiveEventPresentation } from '@/lib/dateSensitiveInventory';
import {
  getDateSensitiveEvents,
  getVenuePriorityRank,
  millisecondsUntilNextDateSensitiveChange,
  romeDayKeyAt,
  type DateSensitiveMode,
} from '@/lib/dateSensitiveView';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import type { CalendarControlsCopy } from '@/lib/calendarControlsCopy';
import { getChrome } from '@/lib/i18n/chrome';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';

export type DateSensitiveCalendarCopy = {
  verified: string;
  empty: string;
  viewEvent: string;
  scrollLeft: string;
  scrollRight: string;
};

type Props = {
  events: readonly DateSensitiveEventPresentation[];
  initialNow: string;
  mode: DateSensitiveMode;
  localeTag: string;
  localePrefix: string;
  copy: DateSensitiveCalendarCopy;
  schemaName: string;
  emptyHref?: string;
  emptyLinkLabel?: string;
  prioritizeFirstImage?: boolean;
  variant?: 'standard' | 'gallery';
  bookingLocale?: string;
  groupByDay?: boolean;
  dateControls?: CalendarControlsCopy;
};

function DateSensitiveCard({
  event,
  localePrefix,
  viewEvent,
  verified,
  prioritizeImage,
}: {
  event: DateSensitiveEventPresentation;
  localePrefix: string;
  viewEvent: string;
  verified: string;
  prioritizeImage: boolean;
}) {
  const time = event.labels.time;
  const price = event.labels.price;

  return (
    <li className="h-full min-w-0" data-date-sensitive-event-id={event.id}>
      <Link
        href={`${localePrefix}/events/${event.slug}`}
        prefetch={false}
        className="group flex h-full flex-col border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 transition-colors hover:border-[#D6BE96]/55 hover:bg-[#12100D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96] motion-reduce:transition-none"
      >
        <span className="relative block aspect-[13/7] w-full shrink-0 overflow-hidden border border-[#F6F1E7]/14 bg-[#050505]" aria-hidden="true">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"
            quality={92}
            priority={prioritizeImage}
            fetchPriority={prioritizeImage ? 'high' : undefined}
            loading={prioritizeImage ? undefined : 'lazy'}
            className="object-contain transition-opacity duration-300 group-hover:opacity-90 motion-reduce:transition-none"
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col pt-4">
          <time dateTime={event.dateISO} className="mb-2 flex items-start gap-2 font-mono text-xs uppercase tracking-[0.16em] tabular-nums text-[#D6BE96]">
            <Clock3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{event.labels.dayHeading} · {time}</span>
          </time>
          <span className="block font-serif text-2xl font-normal leading-tight tracking-[-0.02em] text-[#F6F1E7] transition-colors group-hover:text-[#D6BE96]">{event.title}</span>
          <span className="mt-2.5 flex items-start gap-1.5 font-sans text-sm leading-relaxed text-[#C2B9AA]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D6BE96]" aria-hidden="true" />
            <span>{event.venueName}</span>
          </span>
          {price ? <span className="mt-1.5 block font-mono text-xs uppercase tracking-[0.16em] tabular-nums text-[#847C6F]" data-date-sensitive-price>{price}</span> : null}
          <span className="mt-auto flex flex-col items-start gap-2 border-t border-[#F6F1E7]/14 pt-4">
            <span className="flex items-start gap-1.5 font-mono text-[11px] font-medium uppercase leading-snug tracking-[0.18em] text-[#D6BE96]" data-date-sensitive-status>
              <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{verified}</span>
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#F6F1E7] group-hover:text-[#D6BE96]" data-date-sensitive-cta>{viewEvent} <span aria-hidden="true">↗</span></span>
          </span>
        </span>
      </Link>
    </li>
  );
}

function DateSensitiveGalleryCard({
  event,
  localePrefix,
  viewEvent,
  bookingLocale,
  prioritizeImage,
  fullPoster = false,
}: {
  fullPoster?: boolean;
  event: DateSensitiveEventPresentation;
  localePrefix: string;
  viewEvent: string;
  bookingLocale: string;
  prioritizeImage: boolean;
}) {
  const dateLabel = `${event.labels.dayHeading} · ${event.labels.time}`;
  const detailHref = `${localePrefix}/events/${event.slug}`;
  const scarcity = getScarcityAndChatCopy(bookingLocale);
  const noPrefetch = false;

  return (
    <li className="h-full min-w-0" data-date-sensitive-event-id={event.id}>
      <article className="group flex h-full flex-col overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] transition-colors hover:border-[#D6BE96]/55">
        <Link
          href={detailHref}
          prefetch={noPrefetch}
          className="block flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D6BE96]"
          data-date-sensitive-detail-cta
        >
          <span className={`relative block ${fullPoster && event.image.includes('/halloween/') ? 'aspect-[4/5]' : 'aspect-video'} border-b border-[#F6F1E7]/14 bg-[#050505]`} aria-hidden={fullPoster ? undefined : true}>
            <Image
              src={event.image}
              alt={event.title}
              title={fullPoster ? event.title : undefined}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"
              quality={92}
              priority={prioritizeImage}
              fetchPriority={prioritizeImage ? 'high' : undefined}
              loading={prioritizeImage ? undefined : 'lazy'}
              className="object-contain"
            />
          </span>
          <span className="block p-6 pb-4">
            <span
              className="mb-2.5 inline-flex rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300"
              data-selling-fast-badge
              data-almost-sold-out-badge
            >
              {scarcity.almostSoldOutBadge}
            </span>
            <time dateTime={event.dateISO} className="block font-mono text-xs uppercase tracking-[0.18em] text-[#D6BE96]">{dateLabel}</time>
            <h3 className="mt-2.5 font-serif text-2xl font-normal leading-tight tracking-[-0.02em] text-[#F6F1E7] transition-colors group-hover:text-[#D6BE96]">{event.title}</h3>
            <span className="mt-2.5 flex items-start gap-1.5 font-sans text-sm leading-relaxed text-[#C2B9AA]">
              <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-[#D6BE96]" aria-hidden="true" />
              <span>{event.venueName}</span>
            </span>
            {event.labels.price ? <span className="mt-2 block font-mono text-xs uppercase tracking-[0.16em] text-[#847C6F]" data-date-sensitive-price>{event.labels.price}</span> : null}
          </span>
        </Link>
        <div className="grid grid-cols-1 gap-2.5 border-t border-[#F6F1E7]/14 px-6 py-4">
          <Link
            href={detailHref}
            prefetch={noPrefetch}
            className="inline-flex min-h-[44px] items-center justify-center bg-[#D6BE96] px-4 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition-colors hover:bg-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96]"
            data-date-sensitive-cta
          >
            {scarcity.openEventCardCta}
          </Link>
        </div>
      </article>
    </li>
  );
}

export default function DateSensitiveCalendar({
  events,
  initialNow,
  mode,
  localePrefix,
  localeTag,
  copy,
  schemaName,
  emptyHref,
  emptyLinkLabel,
  prioritizeFirstImage = false,
  variant = 'standard',
  bookingLocale = 'en',
  groupByDay = false,
  dateControls,
}: Props) {
  const [now, setNow] = useState(() => new Date(initialNow));
  const timer = useRef<number | null>(null);

  const refreshNow = useCallback(() => {
    setNow(new Date());
  }, []);

  useEffect(() => {
    const schedule = () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        refreshNow();
        schedule();
      }, Math.min(millisecondsUntilNextDateSensitiveChange(events, new Date()), 60 * 60 * 1000));
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshNow();
    };

    // Defer the first real-clock read until after hydration. The server keeps
    // rendering initialNow, while a cached document corrects itself on mount.
    timer.current = window.setTimeout(() => {
      refreshNow();
      schedule();
    }, 0);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [events, refreshNow]);

  const available = useMemo(() => {
    const selected = getDateSensitiveEvents(events, mode, now);
    return groupByDay ? selected.filter((event, index) => selected.findIndex(candidate => candidate.id === event.id) === index) : selected;
  }, [events, mode, now, groupByDay]);
  const [requestedMonth, setRequestedMonth] = useState('');
  const [requestedDay, setRequestedDay] = useState('');
  const months = [...new Set(available.map(event => romeDayKeyAt(new Date(event.dateISO)).slice(0, 7)))];
  const month = dateControls && months.includes(requestedMonth) ? requestedMonth : '';
  const days = [...new Set(available.map(event => romeDayKeyAt(new Date(event.dateISO))))].filter(day => !month || day.startsWith(month));
  const day = dateControls && days.includes(requestedDay) ? requestedDay : '';
  const visible = useMemo(() => available.filter(event => {
    const eventDay = romeDayKeyAt(new Date(event.dateISO));
    return (!month || eventDay.startsWith(month)) && (!day || eventDay === day);
  }), [available, month, day]);
  const dateFormatter = new Intl.DateTimeFormat(localeTag, { timeZone: 'Europe/Rome', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const shortDateFormatter = new Intl.DateTimeFormat(localeTag, { timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'short' });
  const monthFormatter = new Intl.DateTimeFormat(localeTag, { timeZone: 'Europe/Rome', month: 'long', year: 'numeric' });
  const isItLocale = localeTag.toLowerCase().startsWith('it');
  const priorityGroups: Array<{ key: string; label: string; isDay: boolean; events: DateSensitiveEventPresentation[] }> = [
    { venueId: 'v-justme', label: isItLocale ? '1. Just Me Milano (Torre Branca) — Serate in Programma' : '1. Just Me Milano (Torre Branca) — Featured Nights' },
    { venueId: 'v-pineta', label: isItLocale ? '2. Pineta Club Milano — Serate in Programma' : '2. Pineta Club Milano — Featured Nights' },
    { venueId: 'v-aria', label: isItLocale ? '3. Aria Club Milano — Serate in Programma' : '3. Aria Club Milano — Featured Nights' },
    { venueId: 'v-55milano', label: isItLocale ? '4. 55 Milano — Serate in Programma' : '4. 55 Milano — Featured Nights' },
    { venueId: 'v-voya', label: isItLocale ? '5. Voya Rooftop Milano — Serate in Programma' : '5. Voya Rooftop Milano — Featured Nights' },
    { venueId: 'v-repvblic', label: isItLocale ? '6. Repvblic Milano — Serate in Programma' : '6. Repvblic Milano — Featured Nights' },
  ].flatMap(({ venueId, label }) => {
    const venueEvents = visible
      .filter(event => getVenuePriorityRank(event.venueId || event.venueName) === getVenuePriorityRank(venueId))
      .sort((a, b) => Date.parse(a.dateISO) - Date.parse(b.dateISO) || a.id.localeCompare(b.id));
    return venueEvents.length > 0 ? [{ key: `priority-${venueId}`, label, isDay: false, events: venueEvents }] : [];
  });
  const nonPriorityVisible = visible
    .filter(event => getVenuePriorityRank(event.venueId || event.venueName) >= 999)
    .sort((a, b) => Date.parse(a.dateISO) - Date.parse(b.dateISO) || a.id.localeCompare(b.id));
  const dayGroups: Array<{ key: string; label: string; isDay: boolean; events: DateSensitiveEventPresentation[] }> = [...new Set(nonPriorityVisible.map(event => romeDayKeyAt(new Date(event.dateISO))))].map(key => ({
    key,
    label: dateFormatter.format(new Date(`${key}T12:00:00Z`)),
    isDay: true,
    events: nonPriorityVisible.filter(event => romeDayKeyAt(new Date(event.dateISO)) === key),
  }));
  const groups = [...priorityGroups, ...dayGroups];
  const gallery = variant === 'gallery';
  const noPrefetch = false;
  const schema = useMemo(() => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: schemaName,
    numberOfItems: visible.length,
    itemListElement: visible.map((event, position) => ({
      '@type': 'ListItem', position: position + 1, name: event.title,
      url: `https://nightlifemilan.com${localePrefix}/events/${event.slug}`,
    })),
  }), [localePrefix, schemaName, visible]);

  const emptyResults = gallery ? (
    <div className="flex min-h-56 flex-col justify-center border border-[#F6F1E7]/14 bg-[#0B0A09] px-6 py-10 text-center">
      <Calendar className="mx-auto mb-4 h-10 w-10 text-[#D6BE96]/40" aria-hidden="true" />
      <p className="font-serif text-2xl text-[#C2B9AA]">{copy.empty}</p>
      {emptyHref && emptyLinkLabel ? <Link href={emptyHref} prefetch={noPrefetch} className="mt-6 inline-flex self-center border border-[#D6BE96]/45 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#F6F1E7] transition-colors hover:bg-[#F6F1E7] hover:text-[#050505]">{emptyLinkLabel}</Link> : null}
    </div>
  ) : (
    <div className="flex min-h-56 flex-col justify-center border border-[#F6F1E7]/14 bg-[#0B0A09] px-6 py-10 text-center">
      <Calendar className="mx-auto mb-4 h-10 w-10 text-[#D6BE96]/40" aria-hidden="true" />
      <p className="font-serif text-2xl text-[#C2B9AA]">{copy.empty}</p>
      {emptyHref && emptyLinkLabel ? <Link href={emptyHref} prefetch={false} className="mt-6 inline-flex self-center border border-[#D6BE96]/45 px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-[#F6F1E7] transition-colors hover:bg-[#F6F1E7] hover:text-[#050505]">{emptyLinkLabel}</Link> : null}
    </div>
  );

  const results = visible.length === 0 ? emptyResults : groupByDay ? (
    <div className="space-y-12">
      {groups.map(group => <section key={group.key} data-date-sensitive-day={group.key}>
        <h2 className="mb-6 border-b border-[#F6F1E7]/14 pb-3 font-serif text-2xl italic text-[#D6BE96] sm:text-3xl">
          {group.isDay ? <time dateTime={group.key}>{group.label}</time> : <span>{group.label}</span>}
        </h2>
        <ol aria-label={group.label} className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3" data-date-sensitive-track>
          {group.events.map(event => <DateSensitiveGalleryCard key={event.id} event={event} localePrefix={localePrefix} viewEvent={copy.viewEvent} bookingLocale={bookingLocale} fullPoster prioritizeImage={prioritizeFirstImage && event.id === visible[0]?.id} />)}
        </ol>
      </section>)}
    </div>
  ) : (
    <ol
      aria-label={schemaName}
      className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3"
      data-date-sensitive-track
    >
      {visible.map((event, eventIndex) => gallery
        ? <DateSensitiveGalleryCard key={`date-sensitive-event-${eventIndex}`} event={event} localePrefix={localePrefix} viewEvent={copy.viewEvent} bookingLocale={bookingLocale} prioritizeImage={prioritizeFirstImage && eventIndex === 0} />
        : <DateSensitiveCard key={`date-sensitive-event-${eventIndex}`} event={event} localePrefix={localePrefix} viewEvent={copy.viewEvent} verified={copy.verified} prioritizeImage={prioritizeFirstImage && eventIndex === 0} />)}
    </ol>
  );

  return (
    <div data-date-sensitive-calendar data-date-sensitive-mode={mode} data-rome-day={romeDayKeyAt(now)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      {!gallery ? <div className="mb-4">
        <p className="min-h-5 font-mono text-xs uppercase tracking-[0.18em] text-[#C2B9AA]" aria-live="polite" data-date-sensitive-count={visible.length}>
          {visible.length > 0 ? `${visible.length} · ${copy.verified}` : copy.empty}
        </p>
      </div> : null}
      {dateControls && <div className="mb-10 border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#D6BE96]">{dateControls.month}
            <select className="min-h-12 w-full border border-[#F6F1E7]/18 bg-[#050505] p-3 font-sans text-base text-[#F6F1E7] focus-visible:outline-[#D6BE96]" value={month} onChange={event => { setRequestedMonth(event.currentTarget.value); setRequestedDay(''); }}>
              <option value="">{dateControls.allMonths}</option>
              {months.map(key => <option key={key} value={key}>{monthFormatter.format(new Date(`${key}-01T12:00:00Z`))}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#D6BE96]">{dateControls.date}
            <select className="min-h-12 w-full border border-[#F6F1E7]/18 bg-[#050505] p-3 font-sans text-base text-[#F6F1E7] focus-visible:outline-[#D6BE96]" value={day} onChange={event => setRequestedDay(event.currentTarget.value)}>
              <option value="">{dateControls.allDates}</option>
              {days.map(key => <option key={key} value={key}>{dateFormatter.format(new Date(`${key}T12:00:00Z`))}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={dateControls.date}>
          {days.slice(0, 7).map(key => <button key={key} type="button" aria-label={dateFormatter.format(new Date(`${key}T12:00:00Z`))} aria-pressed={day === key} onClick={() => setRequestedDay(day === key ? '' : key)} className="min-h-11 border border-[#D6BE96]/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#D6BE96] aria-pressed:bg-[#F6F1E7] aria-pressed:text-[#050505] focus-visible:outline-[#D6BE96]">{shortDateFormatter.format(new Date(`${key}T12:00:00Z`))}</button>)}
        </div>
      </div>}
      <div aria-live="polite" data-date-sensitive-results>{results}</div>
    </div>
  );
}

