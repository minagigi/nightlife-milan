import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';

export function getEventCardCopy(locale: string): { viewEvent: string } {
  return { viewEvent: getEventCalendarCopy(locale).viewEvent };
}
