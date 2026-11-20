'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getDateSensitiveEvents, millisecondsUntilNextDateSensitiveChange } from '@/lib/dateSensitiveView';
import { tableConciergeContext, tableConciergeDays, tableConciergeEventsForDay, type TableConciergeEvent } from '@/lib/tableConcierge';
import { Check } from 'lucide-react';
import { getTableConciergeControlCopy } from '@/lib/tableConciergeCopy';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';
import styles from './TableConcierge.module.css';

type ConciergeFormulaKey = 'vip' | 'list' | 'aperitivo' | 'dinner';

export type TableConciergeCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  requestTitle: string;
  eventLabel: string;
  requestAction: string;
  heroAnchorAction?: string;
  trustBadges?: readonly [string, string, string];
  detailAction: string;
  disclaimer: string;
  eventsTitle: string;
  eventsLead: string;
  empty: string;
  allEvents: string;
};

type Props = {
  locale: string;
  events: readonly TableConciergeEvent[];
  initialNow: string;
  copy: TableConciergeCopy;
  surface: 'home' | 'vip' | 'concierge';
  homeIntro?: { sub: string; pills: string; ctaSub: string; allVenues: string };
  showEventList?: boolean;
};

const GROUP_PRESETS = [
  { label: '2–4', value: 4 },
  { label: '5–8', value: 6 },
  { label: '9–12', value: 10 },
  { label: '15+', value: 15 },
] as const;

function eventSelectLabel(event: TableConciergeEvent, locale: string): string {
  const localizedTitle = locale === 'ar'
    ? /^(.*)\s+في\s+[^—–]+\s+[—–]\s+[^—–]+$/u.exec(event.title)?.[1]
    : undefined;
  const title = localizedTitle || event.title;
  return `${title} · ${event.venueName}`;
}

export default function TableConcierge({ locale, events, initialNow, copy, surface, homeIntro, showEventList = true }: Props) {
  const compact = surface !== 'home';
  const [now, setNow] = useState(() => new Date(initialNow));
  const [requestedDay, setRequestedDay] = useState('');
  const [requestedEvent, setRequestedEvent] = useState('');
  const [formula, setFormula] = useState<ConciergeFormulaKey>('vip');
  const [groupSize, setGroupSize] = useState(4);
  const [preference, setPreference] = useState('');
  const requestRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const controlCopy = getTableConciergeControlCopy(locale);
  const v01 = getV01SiteCopy(locale);
  const formulaOptions: ReadonlyArray<{ key: ConciergeFormulaKey; label: string }> = [
    { key: 'vip', label: v01.formulaVip },
    { key: 'list', label: v01.formulaList },
    { key: 'aperitivo', label: v01.formulaAperitivo },
    { key: 'dinner', label: v01.formulaDinner },
  ];
  const selectedFormulaLabel = formulaOptions.find((item) => item.key === formula)?.label || v01.formulaVip;
  const lp = localePrefix(locale);
  const upcoming = useMemo(() => getDateSensitiveEvents(events, surface === 'home' ? 'calendar-week' : 'upcoming', now), [events, now, surface]);
  const days = useMemo(() => tableConciergeDays(upcoming, now), [upcoming, now]);
  const day = days.includes(requestedDay) ? requestedDay : days[0] || '';
  const visibleDays = days.slice(0, 7).includes(day) ? days.slice(0, 7) : [...days.slice(0, 6), day];
  const dayEvents = useMemo(() => day ? tableConciergeEventsForDay(upcoming, now, day) : [], [upcoming, now, day]);
  const selected = dayEvents.find((event) => event.id === requestedEvent) || dayEvents[0];
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale, {
    timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  }), [locale]);

  useEffect(() => {
    let timer: number | undefined;
    const scheduleRefresh = () => {
      const delay = millisecondsUntilNextDateSensitiveChange(events, new Date());
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
  }, [events]);

  const choose = (event: TableConciergeEvent) => {
    setRequestedDay(days.find((candidate) => tableConciergeEventsForDay(events, now, candidate).some((item) => item.id === event.id)) || day);
    setRequestedEvent(event.id);
    requestRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    selectRef.current?.focus({ preventScroll: true });
  };

  const pathname = usePathname() || '/';
  const contextParts = [
    selectedFormulaLabel,
    selected ? tableConciergeContext(selected, groupSize, locale) : `${controlCopy.group}: ${groupSize}`,
    preference.trim() ? `${controlCopy.preference}: ${preference.trim()}` : '',
  ].filter(Boolean);
  const context = contextParts.join(' · ');
  const waUrl = getConciergeBookingUrl(locale, context, pathname);

  return (
    <section className={styles.shell} data-table-concierge={surface} data-variant={compact ? 'compact' : 'full'} aria-labelledby={compact ? `tc-request-title-${surface}` : `tc-title-${surface}`}>
      <div className={styles.hero}>
        {!compact && <div className={styles.heroLeft} data-cialdini="presuasion">
        <div className={styles.heroImage} data-hero-backdrop="true" data-no-lightbox="true">
          <Image
            src="/images/table-concierge/justme-night.webp"
            alt={copy.title}
            fill
            quality={92}
            sizes="(max-width: 1023px) 100vw, 58vw"
            priority={surface === 'home'}
            fetchPriority={surface === 'home' ? 'high' : undefined}
            className={styles.heroPhoto}
          />
        </div>
        <div className={styles.heroStatusBar}>
          <span className={styles.onlineBadge}>
            <span className={styles.onlineDot} aria-hidden="true" />
            {v01.onlineNow}
          </span>
          <span className={styles.statusStats}>{v01.statusStats}</span>
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.subNote}>{copy.eyebrow}</p>
          {surface === 'home'
            ? <h1 id={`tc-title-${surface}`} className={styles.title}>{copy.title}</h1>
            : <h2 id={`tc-title-${surface}`} className={styles.title}>{copy.title}</h2>}
          <p className={styles.lead}>{copy.lead}</p>
          {homeIntro && <>
            <p className={styles.legacyIntro}>{homeIntro.sub}</p>
            <p className={styles.pills}>{homeIntro.pills}</p>
          </>}
          <div className={styles.heroAnchorRow}>
            <a className={styles.primaryLink} href="#capodanno">
              {v01.exploreNyeCta}<span aria-hidden="true">↓</span>
            </a>
            <a className={styles.heroAnchorBtn} href="#locali-partner">
              {v01.partnerClubsCta}<span aria-hidden="true">↓</span>
            </a>
          </div>
          {homeIntro && <div className={styles.heroLinks}>
            <a href="#stasera">{homeIntro.ctaSub} ↓</a>
            <Link href={`${lp}/clubs`} prefetch={false}>{homeIntro.allVenues} ↗</Link>
          </div>}
          <p className={styles.heroNote}>{v01.statusLive} · {copy.disclaimer}</p>
        </div>
        </div>}
        <div ref={requestRef} className={styles.request} id={`tc-request-${surface}`} data-ui="concierge-form" data-cialdini="commitment">
          <div className={styles.requestHead}>
            <p className={styles.requestTitle} id={`tc-request-title-${surface}`}>{copy.requestTitle}</p>
            <span className={styles.onlineBadge}>
              <span className={styles.onlineDot} aria-hidden="true" />
              {v01.onlineNow}
            </span>
          </div>
          <fieldset className={styles.fieldset}>
            <legend>{v01.formulaLabel}</legend>
            <div className={styles.formulaGrid} role="group" aria-label={v01.formulaLabel}>
              {formulaOptions.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={styles.formulaChip}
                  aria-pressed={formula === item.key}
                  onClick={() => setFormula(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          {days.length > 0 ? (
            <>
              <fieldset className={styles.fieldset}>
                <legend>{controlCopy.date}</legend>
                {days.length > 3 ? (
                  <select className={styles.select} aria-label={controlCopy.date} value={day}
                    onChange={(event) => { setRequestedDay(event.currentTarget.value); setRequestedEvent(''); }}>
                    {days.map((candidate) => <option key={candidate} value={candidate}>{dateFormatter.format(new Date(`${candidate}T12:00:00Z`))}</option>)}
                  </select>
                ) : (
                  <div className={styles.dayChoices}>
                    {days.map((candidate) => (
                      <button key={candidate} type="button" className={styles.choice} aria-pressed={candidate === day}
                        onClick={() => { setRequestedDay(candidate); setRequestedEvent(''); }}>
                        {dateFormatter.format(new Date(`${candidate}T12:00:00Z`))}
                      </button>
                    ))}
                  </div>
                )}
              </fieldset>
              <label className={styles.fieldLabel} htmlFor={`tc-event-${surface}`}>{copy.eventLabel}</label>
              <select ref={selectRef} id={`tc-event-${surface}`} className={styles.select} dir="auto" value={selected?.id || ''}
                onChange={(event) => setRequestedEvent(event.currentTarget.value)}>
                {dayEvents.map((event) => <option key={event.id} value={event.id} dir="auto" title={`${event.title} · ${event.venueName}`}>{eventSelectLabel(event, locale)}</option>)}
              </select>
              <label className={styles.fieldLabel} htmlFor={`tc-group-${surface}`}>{controlCopy.group}</label>
              <div className={styles.groupRow}>
                <div className={styles.groupChips} role="group" aria-label={controlCopy.group}>
                  {GROUP_PRESETS.map((preset) => {
                    const active = (preset.value === 4 && groupSize >= 2 && groupSize <= 4)
                      || (preset.value === 6 && groupSize >= 5 && groupSize <= 8)
                      || (preset.value === 10 && groupSize >= 9 && groupSize <= 14)
                      || (preset.value === 15 && groupSize >= 15);
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        className={styles.groupChip}
                        aria-pressed={active}
                        onClick={() => setGroupSize(preset.value)}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
                <input id={`tc-group-${surface}`} className={styles.groupNumber} type="number" inputMode="numeric" min={1} max={99}
                  value={groupSize} onChange={(event) => setGroupSize(Math.max(1, Math.min(99, Number(event.currentTarget.value) || 1)))} />
              </div>
              <label className={styles.fieldLabel} htmlFor={`tc-preference-${surface}`}>{controlCopy.preference}</label>
              <input id={`tc-preference-${surface}`} className={styles.input} type="text" maxLength={120} autoComplete="off"
                value={preference} onChange={(event) => setPreference(event.currentTarget.value)} />
              <div className={styles.previewBox} aria-live="polite">
                <p className={styles.previewLabel}>{v01.previewPrefix}</p>
                <p className={styles.previewText}>
                  {selectedFormulaLabel} · {selected ? `${selected.venueName} (${selected.labels.longDate})` : copy.eventLabel} · {groupSize}
                </p>
              </div>
              <div className={styles.requestCtaDock}>
                <a className={styles.requestLink} href={waUrl} target="_blank" rel="noopener noreferrer">
                  {copy.requestAction}<span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className={styles.noUpfrontNote}>{v01.noUpfrontNote}</p>
              {copy.trustBadges && (
                <div className={styles.trustRow}>
                  {copy.trustBadges.map((badge) => (
                    <span key={badge} className={styles.trustBadge}>
                      <Check className="mr-1 inline-block h-3.5 w-3.5 shrink-0 text-[#25D366]" aria-hidden="true" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              {selected && <Link className={styles.detailLink} href={`${lp}/events/${selected.slug}`} prefetch={false}>{copy.detailAction} ↗</Link>}
            </>
          ) : (
            <>
              <p className={styles.empty}>{copy.empty}</p>
              <div className={styles.requestCtaDock}>
                <a className={styles.requestLink} href={waUrl} target="_blank" rel="noopener noreferrer">{copy.requestAction}<span aria-hidden="true">↗</span></a>
              </div>
            </>
          )}
          <p className={styles.disclaimer} aria-live="polite">{copy.disclaimer}</p>
        </div>
      </div>
      {!compact && <>
      <div className={styles.steps} aria-label={copy.eventsLead}>
        {[controlCopy.date, copy.eventLabel, controlCopy.group].map((label, index) => (
          <div key={label}><strong>{String(index + 1).padStart(2, '0')}</strong><span>{label}</span></div>
        ))}
      </div>
      {showEventList && <div className={styles.events} id={`tc-events-${surface}`}>
        <div className={styles.eventsHead}>
          <div><h2>{copy.eventsTitle}</h2><p className={styles.subNote}>{copy.eyebrow}</p></div>
          <p>{copy.eventsLead}</p>
        </div>
        {day && <div className={styles.dayTabs} role="group" aria-label={controlCopy.date}>
          {visibleDays.map((candidate) => <button key={candidate} type="button" className={styles.dayTab} aria-pressed={candidate === day}
            onClick={() => { setRequestedDay(candidate); setRequestedEvent(''); }}>
            {dateFormatter.format(new Date(`${candidate}T12:00:00Z`))}
          </button>)}
          {days.length > 7 && <select className={styles.daySelect} aria-label={controlCopy.date} value={day}
            onChange={(event) => { setRequestedDay(event.currentTarget.value); setRequestedEvent(''); }}>
            {days.map((candidate) => <option key={candidate} value={candidate}>{dateFormatter.format(new Date(`${candidate}T12:00:00Z`))}</option>)}
          </select>}
        </div>}
        {upcoming.length === 0 && <p className={styles.empty}>{copy.empty}</p>}
        <div className={styles.eventList} aria-live="polite">
          {dayEvents.map((event, index) => <article key={event.id} className={styles.eventRow} data-selected={selected?.id === event.id}>
            <span className={styles.eventNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className={styles.eventInfo}>
              <p className={styles.eventDate}><time dateTime={event.dateISO}>{event.labels.longDate}</time> · {event.labels.time}</p>
              <h3>{event.title}</h3>
              <p className={styles.venue}>{event.venueName}</p>
            </div>
            <div className={styles.eventArt} data-no-lightbox="true">
              <Image src={event.image} alt={event.venueAltText || event.title} fill quality={92} sizes="(max-width: 680px) 100vw, 480px" className={styles.eventPhoto} />
            </div>
            <div className={styles.eventActions}>
              <button type="button" onClick={() => choose(event)}>{copy.requestAction} ↗</button>
              <Link href={`${lp}/events/${event.slug}`} prefetch={false}>{copy.detailAction} ↗</Link>
            </div>
          </article>)}
        </div>
        <Link className={styles.allEvents} href={`${lp}/events${surface === 'home' ? '/this-week' : ''}`} prefetch={false}>{copy.allEvents} ↗</Link>
        <p className={styles.eventsNote}>{copy.disclaimer}</p>
      </div>}
      </>}
    </section>
  );
}
