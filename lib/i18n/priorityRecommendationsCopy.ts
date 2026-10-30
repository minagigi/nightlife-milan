import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';

export function getPriorityRecommendationsHeading(locale: string): string {
  if (locale === 'it') return 'Prossime Serate nei Club Iconici di Milano';
  if (locale === 'en') return 'Upcoming Nights at Milan’s Flagship Clubs';
  return getEventCalendarCopy(locale).verified;
}
