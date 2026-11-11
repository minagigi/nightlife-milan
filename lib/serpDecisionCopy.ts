import { getEventCalendarCopy } from './eventCalendarCopy';
import { withWhatsApp } from './seoMetadata';

export function getEventHubSerpDecisionDescription(locale: string, _kind: string): string {
  return withWhatsApp(getEventCalendarCopy(locale).verifiedNote, locale);
}
