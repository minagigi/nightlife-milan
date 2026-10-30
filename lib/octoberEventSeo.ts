import type { Metadata } from 'next';
import { getLocaleDef, indexedLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getOctoberEventCopy, getOctoberHubCopy, getOctoberEventSlug } from '@/lib/october-events/copy';
import type { OctoberEventRecord, OctoberEventCopy } from '@/lib/october-events/types';
import { readOctoberEventCopy } from '@/lib/octoberEditorial';
import { getRaConditionTexts } from '@/lib/october-events/raConditionsAdapter';

const BASE_URL = 'https://nightlifemilan.com';

export function octoberEventCanonical(event: OctoberEventRecord, locale: LocaleCode): string {
  return `${BASE_URL}${localePrefix(locale)}/events/${getOctoberEventSlug(event)}`;
}

export function formatOctoberEventDate(locale: LocaleCode, startISO: string): string {
  return new Intl.DateTimeFormat(getLocaleDef(locale)?.hreflang || locale, {
    timeZone: 'Europe/Rome', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(startISO));
}

export function formatOctoberEventTime(locale: LocaleCode, startISO: string, endISO: string | null): string | null {
  const formatter = new Intl.DateTimeFormat(getLocaleDef(locale)?.hreflang || locale, {
    timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  const start = formatter.format(new Date(startISO));
  return endISO ? `${start}–${formatter.format(new Date(endISO))}` : start;
}

function assertMetadata(copy: ReturnType<typeof getOctoberEventCopy>, event: OctoberEventRecord): void {
  if (copy.metaTitle.length > 62) throw new Error(`October meta title exceeds 62 characters: ${event.id}/${copy.locale}`);
  if (copy.metaDescription.length > 158) throw new Error(`October meta description exceeds 158 characters: ${event.id}/${copy.locale}`);
}

export async function octoberEventMetadata(event: OctoberEventRecord, locale: LocaleCode): Promise<Metadata> {
  const copy = await readOctoberEventCopy(event, locale);
  assertMetadata(copy, event);
  const canonical = octoberEventCanonical(event, locale);
  const languages = Object.fromEntries([
    ...indexedLocaleCodes.map((code) => [
      getLocaleDef(code)!.hreflang,
      octoberEventCanonical(event, code),
    ]),
    ['x-default', octoberEventCanonical(event, 'en')],
  ]);
  const image = `${BASE_URL}${event.image.src}`;
  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: { canonical, languages },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website', title: copy.metaTitle, description: copy.metaDescription, url: canonical,
      locale: getLocaleDef(locale)?.ogLocale, siteName: 'Nightlife Milan',
      images: [{ url: image, width: event.image.width, height: event.image.height, alt: copy.imageAlt }],
    },
    twitter: { card: 'summary_large_image', title: copy.metaTitle, description: copy.metaDescription, images: [image] },
  };
}

export function buildOctoberEventGraph(event: OctoberEventRecord, locale: LocaleCode, copy:OctoberEventCopy=getOctoberEventCopy(event,locale)) {
  const canonical = octoberEventCanonical(event, locale);
  const eventId = `${canonical}#event`;
  const pageId = `${canonical}#webpage`;
  const venueAddress = event.venue.addressStatus==='source_conflict'?undefined:event.venue.structuredAddress;
  const offerRows = event.affiliateStatus === 'verified' && event.affiliateUrl
    ? event.offers.filter((offer) => offer.category === 'ticket' && !offer.audience && offer.availability === 'available' && offer.price !== null && offer.url === event.affiliateUrl)
    : [];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': event.schemaType || 'MusicEvent', '@id': eventId, url: canonical, name: copy.title, description: [copy.summary,...getRaConditionTexts(locale,event.admissionConditions||[])].join(' '),
        inLanguage: getLocaleDef(locale)?.hreflang || locale, startDate: event.startTimeKnown===false?event.startISO.slice(0,10):event.startISO,
        ...(event.endISO ? { endDate: event.endISO } : {}),
        eventStatus: 'https://schema.org/EventScheduled', eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        image: [`${BASE_URL}${event.image.src}`],
        location: {
          '@type': 'Place', name: event.venue.name,
          ...(venueAddress ? { address: { '@type': 'PostalAddress', ...venueAddress } } : {}),
          ...(venueAddress && event.venue.latitude !== null && event.venue.longitude !== null ? { geo: { '@type': 'GeoCoordinates', latitude: event.venue.latitude, longitude: event.venue.longitude } } : {}),
        },
        ...(event.performers.length ? { performer: event.performers.map((performer) => ({ '@type': 'PerformingGroup', name: performer.name })) } : {}),
        ...(offerRows.length ? { offers: offerRows.map((offer) => ({ '@type': 'Offer', name: offer.name, price: offer.price, priceCurrency: 'EUR', url: offer.url })) } : {}),
        mainEntityOfPage: { '@id': pageId },
      },
      { '@type': 'WebPage', '@id': pageId, url: canonical, name: copy.metaTitle, description: copy.metaDescription, inLanguage: getLocaleDef(locale)?.hreflang || locale, mainEntity: { '@id': eventId } },
      { '@type': 'FAQPage', '@id': `${canonical}#faq`, inLanguage: getLocaleDef(locale)?.hreflang || locale, mainEntity: copy.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      { '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Nightlife Milan', item: `${BASE_URL}${localePrefix(locale) || '/'}` },
        { '@type': 'ListItem', position: 2, name: getOctoberHubCopy(locale).labels.heading, item: `${BASE_URL}${localePrefix(locale)}/events/october-2026` },
        { '@type': 'ListItem', position: 3, name: copy.title, item: canonical },
      ] },
    ],
  };
}
