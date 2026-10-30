import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';

export function getEventSelectionCopy(locale: string) {
  const c = getEventCalendarCopy(locale);
  return {
    shared: {
      viewEvent: c.viewEvent,
    },
  };
}
