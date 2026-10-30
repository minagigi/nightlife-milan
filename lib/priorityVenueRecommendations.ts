import { dayOfWeekForKey, romeDayKeyOffset } from './calendarEvents';
import { weeklyEvents } from './eventsConfig';
import { getVenuePriorityRank } from './dateSensitiveView';
import { getLocalizedText } from './seo';
import { formatEventPresentationLabels, type EventPresentationLabels } from './i18n/eventPresentationLabels';
import { isEnabledLocale } from './i18n/locales';
import { getVenueById } from './data';

export type PriorityRecommendationPresentation = {
  id: string;
  venueId?: string | null;
  dateISO: string;
  endDateISO: string | null;
  title: string;
  venueName: string;
  slug: string;
  image: string;
  price: number | null;
  currency: 'EUR';
  labels: EventPresentationLabels;
  verificationExpiresAt: string | null;
  affiliateUrl?: string | null;
};

const PRIORITY_CLUBS = new Set(['justme', 'pineta', 'aria', '55milano', 'voya', 'repvblic']);
const recommendationCache = new Map<string, PriorityRecommendationPresentation[]>();

export function getTopPriorityVenueRecommendations(locale: string, limit = 6): PriorityRecommendationPresentation[] {
  if (!isEnabledLocale(locale)) return [];
  const cached = recommendationCache.get(locale);
  if (cached) return cached.slice(0, limit);

  const out: PriorityRecommendationPresentation[] = [];
  const seenVenues = new Set<string>();

  for (let offset = 0; offset < 7; offset++) {
    const dayKey = romeDayKeyOffset(offset);
    const dow = dayOfWeekForKey(dayKey);
    const candidates = weeklyEvents.filter((we) => PRIORITY_CLUBS.has(we.clubSlug) && we.dayOfWeek === dow);
    for (const we of candidates) {
      const resolvedVenueId = `v-${we.clubSlug}`;
      if (seenVenues.has(resolvedVenueId)) continue;
      seenVenues.add(resolvedVenueId);

      const slug = `${we.clubSlug}-${we.day}-${we.eventSlug}`;
      const venue = getVenueById(resolvedVenueId);
      const venueName = venue ? getLocalizedText(venue.localizedContent.name, locale) : we.clubName;
      const startHour = we.pricing.aperitif ? '19:30:00' : '23:00:00';
      const tz = dayKey >= '2026-10-25' ? '+01:00' : '+02:00';
      const dateISO = `${dayKey}T${startHour}${tz}`;
      const nextDay = romeDayKeyOffset(offset + 1);
      const nextTz = nextDay >= '2026-10-25' ? '+01:00' : '+02:00';
      const endDateISO = `${nextDay}T04:30:00${nextTz}`;
      const title = `${we.name} · ${venueName}`;
      const priceMatch = (we.pricing.club || we.pricing.aperitif || '').match(/(\d+)/);
      const price = priceMatch ? Number(priceMatch[1]) : null;
      const labels = formatEventPresentationLabels({ dateISO, price, currency: 'EUR', locale });

      out.push({
        id: `priority-${we.id}-${dayKey}`,
        venueId: resolvedVenueId,
        dateISO,
        endDateISO,
        title,
        venueName,
        slug,
        image: we.image,
        price,
        currency: 'EUR',
        labels,
        verificationExpiresAt: null,
        affiliateUrl: we.xceedLink ?? null,
      });
    }
  }

  out.sort(
    (left, right) =>
      getVenuePriorityRank(left.venueId || left.venueName) - getVenuePriorityRank(right.venueId || right.venueName) ||
      Date.parse(left.dateISO) - Date.parse(right.dateISO),
  );

  recommendationCache.set(locale, out);
  return out.slice(0, limit);
}
