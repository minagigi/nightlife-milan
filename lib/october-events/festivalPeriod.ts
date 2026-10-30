import type { LocaleCode } from '@/lib/i18n/locales';
import { getIntlLocale } from '@/lib/eventPageLocale';

export type OctoberProgrammeDateRange = Readonly<{ startDate: string; endDate: string }>;

function parseDate(iso: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(iso)) throw new Error(`Invalid October programme date: ${iso}`);
  const d = new Date(`${iso}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== iso) {
    throw new Error(`Invalid October programme date: ${iso}`);
  }
  return d;
}

export function formatOctoberProgrammeDateRange(locale: LocaleCode, range: OctoberProgrammeDateRange): string {
  const start = parseDate(range.startDate);
  const end = parseDate(range.endDate);
  if (end < start) throw new Error('October programme period ends before it starts');
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    timeZone: 'Europe/Rome',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatRange(start, end);
}
