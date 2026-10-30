import { romeDayKeyAt, type DateSensitiveEvent } from './dateSensitiveView';
import type { EventPresentationLabels } from './i18n/eventPresentationLabels';

export type TableConciergeEvent = DateSensitiveEvent & {
  id: string;
  slug: string;
  title: string;
  venueName: string;
  image: string;
  venueAltText?: string;
  labels: EventPresentationLabels;
};

export function tableConciergeDays(events: readonly TableConciergeEvent[], _now: Date): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const ev of events) {
    const day = romeDayKeyAt(new Date(ev.dateISO));
    if (!seen.has(day)) {
      seen.add(day);
      out.push(day);
    }
  }
  return out;
}

export function tableConciergeEventsForDay(
  events: readonly TableConciergeEvent[],
  _now: Date,
  day: string,
): TableConciergeEvent[] {
  return events.filter((ev) => romeDayKeyAt(new Date(ev.dateISO)) === day);
}

export function tableConciergeContext(event: TableConciergeEvent, groupSize: number, locale: string): string {
  return locale === 'it'
    ? `${event.title} (${event.venueName}) · ${event.labels.longDate} · ${groupSize} persone`
    : `${event.title} (${event.venueName}) · ${event.labels.longDate} · ${groupSize} guests`;
}
