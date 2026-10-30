import { getEventCalendarCopy } from './eventCalendarCopy';

export function getEventHubSerpDecisionDescription(locale: string, _kind: string): string {
  return getEventCalendarCopy(locale).verifiedNote;
}
