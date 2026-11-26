import CapodannoHubView from '@/components/CapodannoHubView';
import CapodannoDetailView from '@/components/CapodannoDetailView';
import ChristmasVoyaDetailView from '@/components/ChristmasVoyaDetailView';
import OrthodoxNyeJustMeDetailView from '@/components/OrthodoxNyeJustMeDetailView';
import {
  christmasVoyaHreflangAlternates,
  christmasVoyaPath,
  christmasVoyaSlug,
  getChristmasVoyaContent,
  resolveChristmasVoyaSlug,
} from '@/lib/christmas/voya35';
import {
  getOrthodoxNyeJustMeContent,
  ORTHODOX_NYE_JUSTME_POSTER_SRC,
  orthodoxNyeJustMeHreflangAlternates,
  orthodoxNyeJustMePath,
  orthodoxNyeJustMeSlug,
  resolveOrthodoxNyeJustMeSlug,
} from '@/lib/orthodox-nye/justme35';
import ThanksgivingJustMeDetailView from '@/components/ThanksgivingJustMeDetailView';
import {
  getThanksgivingJustMeContent,
  THANKSGIVING_JUSTME_POSTER_SRC,
  thanksgivingJustMeHreflangAlternates,
  thanksgivingJustMePath,
  thanksgivingJustMeSlug,
  resolveThanksgivingJustMeSlug,
} from '@/lib/thanksgiving/justme35';
import PartenopeaJustMeDetailView from '@/components/PartenopeaJustMeDetailView';
import {
  getPartenopeaJustMeContent,
  PARTENOPEA_JUSTME_POSTER_SRC,
  partenopeaJustMeHreflangAlternates,
  partenopeaJustMePath,
  partenopeaJustMeSlug,
  resolvePartenopeaJustMeSlug,
} from '@/lib/partenopea/justme35';
import JustSingingJustMeDetailView from '@/components/JustSingingJustMeDetailView';
import {
  getJustSingingRainContent,
  JUST_SINGING_RAIN_POSTER_SRC,
  justSingingRainHreflangAlternates,
  justSingingRainPath,
  justSingingRainSlug,
  resolveJustSingingRainSlug,
} from '@/lib/just-singing-rain/justme35';
import { getCapodannoCategoryPageDef, getCapodannoEventBySlug, getCapodannoEventsForMode } from '@/lib/capodannoEvents';
import {
  buildCapodannoMetaDescription,
  cleanCapodannoSeoTitle,
  getCapodannoLocalizedCategorySubtitle,
  getCapodannoLocalizedCategoryTitle,
  getCapodannoLocalizedEventSubtitle,
  getCapodannoLocalizedEventTitle,
} from '@/lib/capodanno/i18n';
import {
  capodannoCategoryHreflangAlternates,
  capodannoCategoryPath,
  capodannoCategorySlug,
  capodannoEventHreflangAlternates,
  capodannoEventPath,
  capodannoEventSlug,
  resolveCapodannoCategoryIdByLocalizedSlug,
  resolveCapodannoEventBaseSlugByLocalizedSlug,
} from '@/lib/capodanno/routes';
import HalloweenHub, { halloweenMetadata } from '@/components/HalloweenHub';
import { halloweenNavigation } from '@/lib/halloween/routes';
import OctoberEventPage from '@/components/OctoberEventPage';
import { getOctoberEventBySlug } from '@/lib/octoberEvents';
import { octoberEventMetadata } from '@/lib/octoberEventSeo';
import EditorialPageSections from '@/components/EditorialPageSections';
import { seoRobots } from '@/lib/seoMetadata';
import { notFound, permanentRedirect } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, indexedLocaleCodes, localePrefix, canonicalPageUrl, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedEventSlug35 } from '@/lib/i18n/localizedSlugs35';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { getEventBySlug, getVenueById, getPerformerById } from '@/lib/data';
import { getWeeklyEventBySlug } from '@/lib/eventsConfig';
import { getLocalizedText, generateEventSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { nextWeekdayISO } from '@/lib/calendarEvents';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { getRichContent } from '@/lib/richContentStore';
import { Event, Venue } from '@/lib/types';
import BookingForm from '@/components/BookingForm';
import FAQAccordion from '@/components/FAQAccordion';
import PricingGrid from '@/components/PricingGrid';
import GoldEventContent from '@/components/GoldEventContent';
import EventImageGallery from '@/components/EventImageGallery';
import MoreVenueEvents, { MoreVenueEventItem } from '@/components/MoreVenueEvents';
import EventsCarousel from '@/components/EventsCarousel';
import EventMoneyPillarsStrip from '@/components/EventMoneyPillarsStrip';
import { VipQuoteCalculator, PrioritySixShowcase } from '@/components/NightlifeExpansionModules';
import { getEventTemporalCopy } from '@/lib/i18n/eventTemporalCopy';
import { getVenueUi35 } from '@/lib/venueDossiers35';
import { getEventVisualGallery } from '@/lib/eventVisualGallery';
import { getLocalizedEventContent, getLocalizedEventSeed } from '@/lib/localizedEventContent';
import { getEventBatchProfile, getEventBatchSlug, normalizeEventBatchSlug } from '@/lib/eventBatchProfiles';
import { getBatchEventTemplateValues } from '@/lib/eventBatchContent';
import { getEventLocalePack } from '@/lib/eventLocalePacks';
import { buildEventSeoDescription, buildEventSeoTitle, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { CONTACT } from '@/config/contact';
import { getPublicImageDimensions } from '@/lib/imageDimensions';
import { compareEventDiscoveryItems, getEventDiscoveryItems } from '@/lib/eventDiscovery';
import {
  buildEventQuickAnswer,
  buildVenueDescription,
  eventText,
  formatEventGenre,
  getIntlLocale,
  getVenueHeadingParts,
} from '@/lib/eventPageLocale';

const FALLBACK_GALLERY = [
  '/images/milan-nightclub-luxury-vip-champagne.webp',
  '/images/milan-nightclub-dancefloor-vip.webp',
  '/images/bottle-service-milan-vip-nightclub.webp',
  '/images/milan-club-crowd-dancefloor-night.webp',
];

const GALLERY_DESCRIPTORS: Record<'en' | 'it' | 'pt', string[]> = {
  en: [
    'VIP tables and lounge area', 'dancefloor and DJ booth', 'bar and champagne service',
    'entrance and crowd atmosphere', 'main room interior', 'private booth seating',
  ],
  it: [
    'area tavoli VIP e lounge', 'pista da ballo e consolle DJ', 'bar e servizio champagne',
    'ingresso e atmosfera del pubblico', 'interno della sala principale', 'area privé con divani',
  ],
  pt: [
    'mesas VIP e lounge', 'pista de dança e cabine do DJ', 'bar e serviço de champanhe',
    'entrada e ambiente do público', 'interior da sala principal', 'área reservada com sofás',
  ],
};

// FASE F3 (piano fix-i18n-posters-redo-justme): fino a 6 foto reali della
// venue invece di 4 - più copertura visiva sulla pagina evento.
const GALLERY_MAX = 6;

/**
 * Galleria foto reali della venue (non più 4 foto stock identiche su ogni
 * pagina evento) - alt/title unico per immagine, SEO in chiave locale,
 * combina venue + descrittore posizionale + titolo evento specifico.
 */
function buildVenueGalleryImages(venue: Venue, eventTitle: string, locale: string): { src: string; alt: string }[] {
  const isIt = locale === 'it';
  const isPt = locale === 'pt';
  const sources = venue.gallery && venue.gallery.length > 0 ? venue.gallery : FALLBACK_GALLERY;
  const descriptors = GALLERY_DESCRIPTORS[isIt ? 'it' : isPt ? 'pt' : 'en'];
  const venueName = getLocalizedText(venue.localizedContent.name, locale);

  return sources.slice(0, GALLERY_MAX).map((src, i) => {
    const descriptor = descriptors[i % descriptors.length];
    const alt = isIt
      ? `${venueName} Milano - ${descriptor} durante ${eventTitle}`
      : isPt
        ? `${venueName} Milão - ${descriptor} durante ${eventTitle}`
      : `${venueName} Milan - ${descriptor} during ${eventTitle}`;
    return { src, alt };
  });
}

// ISR Configuration (1 hour)
// ISR (revalidate): la pagina è cacheata → il fetch pesante dei ~260 listing
// Eventbrite (risoluzione evento + contenuto gold) avviene solo alla rigenerazione,
// NON a ogni visita (force-dynamic rendeva ogni richiesta lentissima/timeout).
// revalidate breve + maxDuration alto per la prima generazione on-demand.
export const revalidate = 600;
// Eventbrite pages are generated on demand and then retained through ISR.
// Excluding their slugs from the build path list avoids repeated organizer scans.
export const dynamicParams = true;
// Vercel Pro (2026-07-11): 300s. La prima generazione on-demand di un evento SENZA
// gold nel Blob fa il fallback getEventGoldHtml (fetch ~260 listing org): con 60s
// (Hobby) andava in timeout → gold assente; con 300s completa e poi resta in ISR.
export const maxDuration = 300;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate Static Params for SEO Crawling
export async function generateStaticParams() {
  return [];
}

// Generate Dynamic SEO Metadata

function buildCapodannoCategoryMetadata(catId: string, locale: string): Metadata {
  const def = getCapodannoCategoryPageDef(catId);
  const modeEvents = getCapodannoEventsForMode(catId);
  const eventsCount = modeEvents.length;
  const heroImage = modeEvents[0]?.image || '/images/just-me-milano.webp';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${capodannoCategoryPath(catId, locale)}`;
  const rawTitle = getCapodannoLocalizedCategoryTitle(def, locale, eventsCount);
  const title = cleanCapodannoSeoTitle(rawTitle, 62);
  const rawSummary = getCapodannoLocalizedCategorySubtitle(def, locale, eventsCount);
  const description = buildCapodannoMetaDescription(rawSummary, locale);
  return {
    title,
    description,
    robots: seoRobots(locale, true, true),
    alternates: {
      canonical,
      languages: capodannoCategoryHreflangAlternates(baseUrl, catId),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [
        {
          url: `${baseUrl}${heroImage}`,
          ...getPublicImageDimensions(heroImage, { width: 1080, height: 1350 }),
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${heroImage}`],
    },
  };
}

function buildCapodannoEventMetadata(baseSlug: string, locale: string): Metadata {
  const event = getCapodannoEventBySlug(baseSlug);
  if (!event) return {};
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${capodannoEventPath(event.slug, locale)}`;
  const rawTitle = getCapodannoLocalizedEventTitle(event, locale);
  const title = cleanCapodannoSeoTitle(rawTitle, 62);
  const rawSummary = getCapodannoLocalizedEventSubtitle(event, locale);
  const description = buildCapodannoMetaDescription(rawSummary, locale);
  return {
    title,
    description,
    robots: seoRobots(locale, true, true),
    alternates: {
      canonical,
      languages: capodannoEventHreflangAlternates(baseUrl, event.slug),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{ url: `${baseUrl}${event.image}`, width: 1080, height: 1350, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${event.image}`],
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: rawSlug } = await params;
  const slug = rawSlug === 'keinemusik-milano-25-settembre-2026' ? 'keinemusik-milan-25-september-2026' : rawSlug;
  if (slug === halloweenNavigation(locale).slug) return halloweenMetadata(locale as LocaleCode);
  if (resolveChristmasVoyaSlug(slug)) {
    const canonicalSlug = christmasVoyaSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(christmasVoyaPath(locale));
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${christmasVoyaPath(locale)}`;
    const xmas = getChristmasVoyaContent(locale);
    return {
      title: xmas.metaTitle,
      description: xmas.metaDescription,
      robots: seoRobots(locale, true, true),
      alternates: {
        canonical,
        languages: christmasVoyaHreflangAlternates(baseUrl),
      },
      openGraph: {
        title: xmas.metaTitle,
        description: xmas.metaDescription,
        url: canonical,
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: getLocaleDef(locale)?.ogLocale || 'en_US',
        images: [{ url: `${baseUrl}${xmas.posterSrc}`, width: 1080, height: 1350, alt: xmas.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: xmas.metaTitle,
        description: xmas.metaDescription,
        images: [`${baseUrl}${xmas.posterSrc}`],
      },
    };
  }
  if (resolveOrthodoxNyeJustMeSlug(slug)) {
    const canonicalSlug = orthodoxNyeJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(orthodoxNyeJustMePath(locale));
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${orthodoxNyeJustMePath(locale)}`;
    const ortho = getOrthodoxNyeJustMeContent(locale);
    return {
      title: ortho.metaTitle,
      description: ortho.metaDescription,
      robots: seoRobots(locale, true, true),
      alternates: {
        canonical,
        languages: orthodoxNyeJustMeHreflangAlternates(baseUrl),
      },
      openGraph: {
        title: ortho.metaTitle,
        description: ortho.metaDescription,
        url: canonical,
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: getLocaleDef(locale)?.ogLocale || 'en_US',
        images: [{ url: `${baseUrl}${ORTHODOX_NYE_JUSTME_POSTER_SRC}`, width: 1080, height: 1350, alt: ortho.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: ortho.metaTitle,
        description: ortho.metaDescription,
        images: [`${baseUrl}${ORTHODOX_NYE_JUSTME_POSTER_SRC}`],
      },
    };
  }
  if (resolveThanksgivingJustMeSlug(slug)) {
    const canonicalSlug = thanksgivingJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(thanksgivingJustMePath(locale));
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${thanksgivingJustMePath(locale)}`;
    const tg = getThanksgivingJustMeContent(locale);
    return {
      title: tg.metaTitle,
      description: tg.metaDescription,
      robots: seoRobots(locale, true, true),
      alternates: {
        canonical,
        languages: thanksgivingJustMeHreflangAlternates(baseUrl),
      },
      openGraph: {
        title: tg.metaTitle,
        description: tg.metaDescription,
        url: canonical,
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: getLocaleDef(locale)?.ogLocale || 'en_US',
        images: [{ url: `${baseUrl}${THANKSGIVING_JUSTME_POSTER_SRC}`, width: 1080, height: 1350, alt: tg.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: tg.metaTitle,
        description: tg.metaDescription,
        images: [`${baseUrl}${THANKSGIVING_JUSTME_POSTER_SRC}`],
      },
    };
  }
  if (resolveJustSingingRainSlug(slug)) {
    const canonicalSlug = justSingingRainSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(justSingingRainPath(locale));
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${justSingingRainPath(locale)}`;
    const rain = getJustSingingRainContent(locale);
    return {
      title: rain.metaTitle,
      description: rain.metaDescription,
      robots: seoRobots(locale, true, true),
      alternates: {
        canonical,
        languages: justSingingRainHreflangAlternates(baseUrl),
      },
      openGraph: {
        title: rain.metaTitle,
        description: rain.metaDescription,
        url: canonical,
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: getLocaleDef(locale)?.ogLocale || 'en_US',
        images: [{ url: `${baseUrl}${JUST_SINGING_RAIN_POSTER_SRC}`, width: 1080, height: 1350, alt: rain.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: rain.metaTitle,
        description: rain.metaDescription,
        images: [`${baseUrl}${JUST_SINGING_RAIN_POSTER_SRC}`],
      },
    };
  }
  if (resolvePartenopeaJustMeSlug(slug)) {
    const canonicalSlug = partenopeaJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(partenopeaJustMePath(locale));
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = `${baseUrl}${partenopeaJustMePath(locale)}`;
    const pt = getPartenopeaJustMeContent(locale);
    return {
      title: pt.metaTitle,
      description: pt.metaDescription,
      robots: seoRobots(locale, true, true),
      alternates: {
        canonical,
        languages: partenopeaJustMeHreflangAlternates(baseUrl),
      },
      openGraph: {
        title: pt.metaTitle,
        description: pt.metaDescription,
        url: canonical,
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: getLocaleDef(locale)?.ogLocale || 'en_US',
        images: [{ url: `${baseUrl}${PARTENOPEA_JUSTME_POSTER_SRC}`, width: 1080, height: 1350, alt: pt.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: pt.metaTitle,
        description: pt.metaDescription,
        images: [`${baseUrl}${PARTENOPEA_JUSTME_POSTER_SRC}`],
      },
    };
  }
  const capCatId = resolveCapodannoCategoryIdByLocalizedSlug(slug, locale);
  if (capCatId) {
    if (slug !== capodannoCategorySlug(capCatId, locale)) permanentRedirect(capodannoCategoryPath(capCatId, locale));
    return buildCapodannoCategoryMetadata(capCatId, locale);
  }
  const capEvSlug = resolveCapodannoEventBaseSlugByLocalizedSlug(slug, locale);
  if (capEvSlug) {
    if (slug !== capodannoEventSlug(capEvSlug, locale)) permanentRedirect(capodannoEventPath(capEvSlug, locale));
    return buildCapodannoEventMetadata(capEvSlug, locale);
  }
  const octoberEvent = getOctoberEventBySlug(slug, locale as LocaleCode);
  if (octoberEvent) return octoberEventMetadata(octoberEvent, locale as LocaleCode);
  const requestedProfile = getEventBatchProfile(slug);
  if (requestedProfile?.siteLocales && !requestedProfile.siteLocales.some((siteLocale) => siteLocale === locale)) {
    const targetLocale = requestedProfile.siteLocales[0];
    permanentRedirect(`${localePrefix(targetLocale)}/${getLocalizedDir35('events', targetLocale)}/${getEventBatchSlug(requestedProfile, targetLocale)}`);
  }
  if (requestedProfile?.siteLocales?.includes(locale as LocaleCode)) {
    const canonicalSlug = getEventBatchSlug(requestedProfile, locale as LocaleCode);
    if (normalizeEventBatchSlug(slug) !== canonicalSlug) permanentRedirect(`${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${canonicalSlug}`);
  }
  
  const weeklyEvent = getWeeklyEventBySlug(slug);
  if (weeklyEvent) {
    const nextDateISO = nextWeekdayISO(weeklyEvent.dayOfWeek, 23, 0);
    const title = buildEventSeoTitle({
      locale,
      eventName: weeklyEvent.name,
      venueName: weeklyEvent.clubName,
      dateISO: nextDateISO,
    });
    const description = buildEventSeoDescription({
      locale,
      venueName: weeklyEvent.clubName,
      dateISO: nextDateISO,
      summary: locale === 'it' ? weeklyEvent.description.it : weeklyEvent.description.en,
    });
    const weeklyCanonicalSlug = `${weeklyEvent.clubSlug}-${weeklyEvent.day}-${weeklyEvent.eventSlug}`;
    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const canonical = canonicalPageUrl(baseUrl, locale, `/events/${weeklyCanonicalSlug}`);

    return {
      title,
      description,
      alternates: {
        canonical,
        languages: hreflangAlternates(baseUrl, `/events/${weeklyCanonicalSlug}`),
      },
      robots: getLocaleDef(locale)?.indexed === false ? { index: false, follow: true } : { index: true, follow: true },
      openGraph: {
        title,
        description,
        url: canonical,
        images: [
          {
            url: weeklyEvent.image.startsWith('http') ? weeklyEvent.image : `${baseUrl}${weeklyEvent.image}`,
            ...getPublicImageDimensions(weeklyEvent.image, { width: 1080, height: 1350 }),
            alt: title,
          },
        ],
        type: 'website',
        siteName: 'Nightlife Milan',
        locale: locale === 'it' ? 'it_IT' : 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [weeklyEvent.image.startsWith('http') ? weeklyEvent.image : `${baseUrl}${weeklyEvent.image}`],
        site: '@nightlifemilan',
      },
    };
  }

  let event = getEventBySlug(slug, locale);
  if (!event) event = getLocalizedEventSeed(slug, locale) || undefined;
  if (!event) return notFound();
  if (event.id === 'e-nye-2027-voya') {
    permanentRedirect(capodannoEventPath('capodanno-voya-rooftop-milano', locale));
  }

  const venue = getVenueById(event.venueId);
  if (!venue) return notFound();

  const localizedContent = getLocalizedEventContent(event.localizedContent.slug.en, locale);
  const localizedTitle = localizedContent?.title || getLocalizedText(event.localizedContent.title, locale);
  const venueName = getLocalizedText(venue.localizedContent.name, locale);
  const title = localizedContent?.metaTitle
    ? seoTitle(localizedContent.metaTitle)
    : buildEventSeoTitle({ locale, eventName: localizedTitle, venueName, dateISO: event.dateISO });
  const description = localizedContent?.metaDescription
    ? withWhatsApp(localizedContent.metaDescription, locale)
    : buildEventSeoDescription({
        locale,
        venueName,
        dateISO: event.dateISO,
        summary: localizedContent?.seoSummary || getLocalizedText(event.localizedContent.shortDescription, locale),
      });

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  
  // Generate Canonical and Hreflang URLs
  const enSlug = event.localizedContent.slug.en;
  const itSlug = event.localizedContent.slug.it || enSlug;
  const eventProfile = getEventBatchProfile(enSlug);
  const visualGallery = getEventVisualGallery(enSlug, locale);
  const socialImage = visualGallery?.hero || visualGallery?.images[0];
  const image = socialImage?.src || event.image || venue.image || '';
  const absoluteImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  const currentSlug = eventProfile && eventProfile.siteLocales?.includes(locale as LocaleCode)
    ? getEventBatchSlug(eventProfile, locale as LocaleCode)
    : getLocalizedEventSlug35(enSlug, (locale as LocaleCode) || 'en');
  const path = `${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${currentSlug}`;
  const canonical = `${baseUrl}${path}`;
  const indexedSiteLocales = eventProfile?.indexedLocales
    || eventProfile?.siteLocales?.filter((siteLocale) => indexedLocaleCodes.includes(siteLocale));
  const languages = eventProfile?.siteLocales?.length
    ? Object.fromEntries([
        ...(indexedSiteLocales || []).map((siteLocale) => [
          getLocaleDef(siteLocale)?.hreflang || siteLocale,
          `${baseUrl}${localePrefix(siteLocale)}/${getLocalizedDir35('events', siteLocale)}/${getEventBatchSlug(eventProfile, siteLocale)}`,
        ] as const),
        [
          'x-default',
          `${baseUrl}${localePrefix(eventProfile.siteLocales[0])}/${getLocalizedDir35('events', eventProfile.siteLocales[0])}/${getEventBatchSlug(eventProfile, eventProfile.siteLocales[0])}`,
        ] as const,
      ])
    : hreflangAlternates(baseUrl, `/events/${enSlug}`);
  const socialImageDimensions = socialImage?.src.includes('just-me-world-cup-final-cover-2x1-')
    || socialImage?.src.includes('gue-just-me-2026-07-25-cover-2x1-')
    ? { width: 2000, height: 1000 }
    : socialImage?.src.includes('just-me-finale-coppa-mondo-cover-2x1-it-v4.jpg')
      ? { width: 2752, height: 1376 }
      : socialImage?.aspect === 'landscape'
    ? { width: 2160, height: 1080 }
    : socialImage?.aspect === 'five-four'
      ? { width: 1600, height: 1280 }
      : socialImage?.aspect === 'portrait'
        ? { width: 900, height: 1600 }
        : { width: 1600, height: 1600 };

  const ogDims = getPublicImageDimensions(
    image,
    visualGallery ? socialImageDimensions : { width: 1080, height: 1350 },
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    robots: eventProfile?.indexedLocales?.includes(locale as LocaleCode) || getLocaleDef(locale)?.indexed !== false
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{
        url: absoluteImage,
        width: ogDims.width,
        height: ogDims.height,
        alt: socialImage?.alt || title,
      }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImage],
      site: '@nightlifemilan',
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { locale, slug } = await params;
  if (slug === 'keinemusik-milano-25-settembre-2026') {
    permanentRedirect(`${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/keinemusik-milan-25-september-2026`);
  }
  if (slug === halloweenNavigation(locale).slug) return <HalloweenHub locale={locale as LocaleCode} />;
  if (resolveChristmasVoyaSlug(slug)) {
    const canonicalSlug = christmasVoyaSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(christmasVoyaPath(locale));
    return <ChristmasVoyaDetailView locale={locale} />;
  }
  if (resolveOrthodoxNyeJustMeSlug(slug)) {
    const canonicalSlug = orthodoxNyeJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(orthodoxNyeJustMePath(locale));
    return <OrthodoxNyeJustMeDetailView locale={locale} />;
  }
  if (resolveThanksgivingJustMeSlug(slug)) {
    const canonicalSlug = thanksgivingJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(thanksgivingJustMePath(locale));
    return <ThanksgivingJustMeDetailView locale={locale} />;
  }
  if (resolveJustSingingRainSlug(slug)) {
    const canonicalSlug = justSingingRainSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(justSingingRainPath(locale));
    return <JustSingingJustMeDetailView locale={locale} />;
  }
  if (resolvePartenopeaJustMeSlug(slug)) {
    const canonicalSlug = partenopeaJustMeSlug(locale);
    if (slug !== canonicalSlug) permanentRedirect(partenopeaJustMePath(locale));
    return <PartenopeaJustMeDetailView locale={locale} />;
  }
  const capCatId = resolveCapodannoCategoryIdByLocalizedSlug(slug, locale);
  if (capCatId) {
    if (slug !== capodannoCategorySlug(capCatId, locale)) permanentRedirect(capodannoCategoryPath(capCatId, locale));
    return <CapodannoHubView locale={locale} mode={capCatId} canonicalPath={capodannoCategoryPath(capCatId, locale)} />;
  }
  const capEvSlug = resolveCapodannoEventBaseSlugByLocalizedSlug(slug, locale);
  if (capEvSlug) {
    if (slug !== capodannoEventSlug(capEvSlug, locale)) permanentRedirect(capodannoEventPath(capEvSlug, locale));
    const capEv = getCapodannoEventBySlug(capEvSlug);
    if (!capEv) notFound();
    return <CapodannoDetailView locale={locale} event={capEv} />;
  }
  const octoberEvent = getOctoberEventBySlug(slug, locale as LocaleCode);
  if (octoberEvent) return <OctoberEventPage event={octoberEvent} locale={locale as LocaleCode} initialNow={new Date().toISOString()}>
    <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${slug}`} />
  </OctoberEventPage>;
  const requestedProfile = getEventBatchProfile(slug);
  if (requestedProfile?.siteLocales && !requestedProfile.siteLocales.some((siteLocale) => siteLocale === locale)) {
    const targetLocale = requestedProfile.siteLocales[0];
    permanentRedirect(`${localePrefix(targetLocale)}/${getLocalizedDir35('events', targetLocale)}/${getEventBatchSlug(requestedProfile, targetLocale)}`);
  }
  if (requestedProfile?.siteLocales?.includes(locale as LocaleCode)) {
    const canonicalSlug = getEventBatchSlug(requestedProfile, locale as LocaleCode);
    if (normalizeEventBatchSlug(slug) !== canonicalSlug) permanentRedirect(`${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${canonicalSlug}`);
  }
  
  const weeklyEvent = getWeeklyEventBySlug(slug);
  if (weeklyEvent) {
    const isIt = locale === 'it';
    const title = `${weeklyEvent.name} @ ${weeklyEvent.clubName} Milano - ${weeklyEvent.day.charAt(0).toUpperCase() + weeklyEvent.day.slice(1)} 2026`;
    const description = isIt ? weeklyEvent.description.it : weeklyEvent.description.en;
    const dressCode = isIt ? weeklyEvent.dressCode.it : weeklyEvent.dressCode.en;

    const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
    const weeklyVenue = getVenueById(`v-${weeklyEvent.clubSlug}`);
    const absoluteImage = weeklyEvent.image.startsWith('http')
      ? weeklyEvent.image
      : `${baseUrl}${weeklyEvent.image}`;

    // Prossima occorrenza reale del giorno ricorrente (fuso Europe/Rome, 23:00
    // orario indicativo salvo dato più specifico), mai una data placeholder
    // hardcoded che poteva finire nel passato.
    const startDateISO = nextWeekdayISO(weeklyEvent.dayOfWeek, 23, 0);
    const endDateISO = new Date(new Date(startDateISO).getTime() + 4 * 60 * 60 * 1000).toISOString();

    const weeklyUrl = canonicalPageUrl(baseUrl, locale, `/events/${weeklyEvent.clubSlug}-${weeklyEvent.day}-${weeklyEvent.eventSlug}`);
    const weeklyWaHref = getConciergeBookingUrl(locale, `${weeklyEvent.name} · ${weeklyEvent.clubName}`, weeklyUrl);

    // Generate JSON-LD
    const jsonLd: any = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: title,
      description: description,
      url: weeklyUrl,
      startDate: startDateISO,
      endDate: endDateISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: absoluteImage,
      location: {
        '@type': 'Place',
        name: weeklyEvent.clubName,
        address: {
          '@type': 'PostalAddress',
          ...(weeklyVenue?.address?.streetAddress ? { streetAddress: weeklyVenue.address.streetAddress } : {}),
          addressLocality: 'Milan',
          addressCountry: 'IT'
        }
      },
      // Prezzo reale dalle stringhe pricing ("From €15" -> 15, "Free Entry..." ->
      // 0): mai un fallback fabbricato - se non si riesce a leggere un numero
      // reale né un "free" esplicito, niente offers piuttosto che un prezzo finto.
      ...(() => {
        const parsePriceEUR = (s?: string): number | null => {
          if (!s) return null;
          if (/free/i.test(s)) return 0;
          const digits = s.replace(/[^0-9]/g, '');
          return digits ? parseInt(digits, 10) : null;
        };
        const price = parsePriceEUR(weeklyEvent.pricing.club) ?? parsePriceEUR(weeklyEvent.pricing.aperitif);
        if (price === null) return {};
        return {
          offers: {
            '@type': 'Offer',
            url: weeklyEvent.xceedLink || weeklyWaHref,
            price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-09-01T00:00:00+02:00',
          },
        };
      })(),
      performer: {
        '@type': 'PerformingGroup',
        name: `${weeklyEvent.clubName} Resident DJs`,
      },
      organizer: {
        '@type': 'Organization',
        name: 'Nightlife Milan',
        url: baseUrl
      }
    };

    return (
      <main data-layout-alt="alternativa-02-capitoli-colore-netto" className="min-h-screen bg-[#050505] text-[#F6F1E7]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* CAPITOLO 01 — NOTTE #050505: Locandina 4:5 a pieno placeholder & Titolo */}
        <section className="border-b border-[#F6F1E7]/14 bg-[#050505] pt-3 pb-8 sm:pt-4">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-10 lg:px-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5">
              <Image
                src={weeklyEvent.image}
                alt={title}
                fill
                quality={95}
                priority
                fetchPriority="high"
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 lg:col-span-7">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="bg-[#EAE3D5] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]">
                  {weeklyEvent.clubName}
                </span>
                <span className="border border-[#F6F1E7]/25 bg-[#141311] px-3 py-1 text-xs font-semibold text-[#EAE3D5]">
                  {weeklyEvent.genres.join(' · ')}
                </span>
                <span className="border border-[#F6F1E7]/25 bg-[#141311] px-3 py-1 font-mono text-xs font-semibold capitalize text-[#C2B9AA]">
                  {weeklyEvent.day}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#F6F1E7] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[#C2B9AA] sm:text-lg">{weeklyEvent.target}</p>
            </div>
          </div>
        </section>

        {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Prezzi, Tavoli VIP & Prenotazione Immediata */}
        <section className="border-b border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="space-y-4 lg:col-span-7">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#4A453E]">
                01 · TARIFFE & FORMULE D&apos;INGRESSO
              </p>
              <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                {tr(locale, 'Pricing & VIP Tables', 'Prezzi & Tavoli VIP')}
              </h2>
              <div className="divide-y divide-[#050505]/18 border-y border-[#050505]/20">
                {weeklyEvent.pricing.aperitif && (
                  <div className="py-4 text-[#050505]">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                      {tr(locale, 'Aperitif', 'Aperitivo')}
                    </h3>
                    <p className="mt-1 font-display text-2xl font-extrabold text-[#050505]">
                      {weeklyEvent.pricing.aperitif}
                    </p>
                  </div>
                )}
                <div className="py-4 text-[#050505]">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                    {tr(locale, 'Club Entry', 'Ingresso Club')}
                  </h3>
                  <p className="mt-1 font-display text-2xl font-extrabold text-[#050505]">
                    {weeklyEvent.pricing.club}
                  </p>
                </div>
                <div className="py-4 text-[#050505]">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                    {tr(locale, 'VIP Tables', 'Tavoli VIP')}
                  </h3>
                  <p className="mt-1 font-display text-2xl font-extrabold text-[#050505]">
                    {weeklyEvent.pricing.tables}
                  </p>
                  <p className="mt-1 text-xs text-[#3D3830]">
                    {tr(
                      locale,
                      'Prices vary based on location and number of guests.',
                      'I prezzi variano in base alla posizione e al numero di ospiti.',
                    )}
                  </p>
                </div>
              </div>
            </div>

            <aside className="border border-[#050505] bg-[#050505] p-6 text-[#F6F1E7] lg:col-span-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                CONCIERGE UFFICIALE
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold uppercase text-[#F6F1E7]">
                {tr(locale, 'Event Details & Booking', 'Dettagli & Prenotazione')}
              </h3>
              <div className="mt-4 space-y-3 border-y border-[#F6F1E7]/15 py-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#C2B9AA]">{tr(locale, 'Day', 'Giorno')}</span>
                  <span className="font-bold capitalize text-[#F6F1E7]">{weeklyEvent.day}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#C2B9AA]">{tr(locale, 'Target', 'Target')}</span>
                  <span className="text-right font-semibold text-[#F6F1E7]">{weeklyEvent.target}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-[#C2B9AA]">{tr(locale, 'Music', 'Musica')}</span>
                  <span className="text-right font-semibold text-[#F6F1E7]">
                    {weeklyEvent.genres.join(', ')}
                  </span>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <a
                  href={weeklyWaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                >
                  {tr(locale, 'Book on WhatsApp', 'Prenota su WhatsApp')}
                </a>
                {weeklyEvent.xceedLink && (
                  <a
                    href={weeklyEvent.xceedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#EAE3D5] px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#F6F1E7]"
                  >
                    {tr(locale, 'Buy on Xceed', 'Acquista su Xceed')}
                  </a>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* CAPITOLO 03 — CHAMPAGNE #EAE3D5: Esperienza & Dress Code */}
        <section className="border-b border-[#050505] bg-[#EAE3D5] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
              {tr(locale, 'The Experience', "L'Esperienza")}
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#24201B] sm:text-lg">
              {description}
            </p>
            <div className="border border-[#050505] bg-[#FFFFFF] p-5 text-[#050505]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
                {tr(locale, 'Dress Code', 'Dress Code')}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-[#050505] sm:text-base">{dressCode}</p>
            </div>
          </div>
        </section>

        {/* CAPITOLO 04 — CARTA CALDA #F6F1E7: Domande Frequenti */}
        <section className="bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="border border-[#050505] bg-[#FFFFFF] p-5 sm:p-8">
              <h2 className="font-display text-2xl font-bold uppercase text-[#050505] sm:text-3xl">
                {tr(locale, 'Frequently Asked Questions', 'Domande Frequenti')}
              </h2>
              <div className="mt-5 divide-y divide-[#050505]/15 border-y border-[#050505]/15">
                {weeklyEvent.faqs.map((faq, index) => (
                  <details key={index} open={index < 2} className="group py-4">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                      <h3 className="text-sm font-bold text-[#050505] sm:text-base">
                        {isIt ? faq.q.it : faq.q.en}
                      </h3>
                      <span
                        className="font-mono text-xl font-bold text-[#050505] transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pt-2 text-sm leading-relaxed text-[#3D3830]">
                      {isIt ? faq.a.it : faq.a.en}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  let event = getEventBySlug(slug, locale);
  if (!event) event = getLocalizedEventSeed(slug, locale) || undefined;
  if (!event) return notFound();
  if (event.id === 'e-nye-2027-voya') {
    permanentRedirect(capodannoEventPath('capodanno-voya-rooftop-milano', locale));
  }

  const venue = getVenueById(event.venueId);
  if (!venue) return notFound();

  const performer = event.performerId ? getPerformerById(event.performerId) : null;

  // FASE X2 (piano Xceed): contenuto gold-standard (sezioni/programma/25 FAQ/
  // listino reale) letto dal blob se questo evento è passato dalla pipeline
  // Xceed - assente per tutti gli altri eventi, rendering base invariato.
  // Prova il gold nel Blob sotto lo slug EN e, se assente, sotto lo slug IT: per
  // gli eventi pubblicati come due listing (EN/IT con slug diversi) il gold può
  // essere stato scritto sotto lo slug IT, mentre la card FUSA usa lo slug-en
  // canonico → senza questo secondo tentativo il gold sparirebbe dopo la dedup.
  const slugEnKey = event.localizedContent.slug.en;
  const slugItKey = event.localizedContent.slug.it;
  const localizedEventContent = getLocalizedEventContent(slugEnKey, locale);
  const blobRich = localizedEventContent
    ? null
    : (await getRichContent(slugEnKey)) ||
      (slugItKey && slugItKey !== slugEnKey ? await getRichContent(slugItKey) : null);

  const richContent = blobRich;

  const allVenueCalendarItems = getEventDiscoveryItems(await getAllCalendarEvents(), locale);
  const currentEventStartMs = new Date(event.dateISO).getTime();
  const isCurrentEvent = (candidate: Event) =>
    candidate.id === event.id ||
    (candidate.venueId === event.venueId && Math.abs(new Date(candidate.dateISO).getTime() - currentEventStartMs) < 5 * 60 * 1000);
  const moreVenueEvents: MoreVenueEventItem[] = allVenueCalendarItems
    .filter(
      ({ event: e }) =>
        e.venueId === event.venueId && !isCurrentEvent(e) && isUpcomingRome(e.dateISO)
    )
    .sort(compareEventDiscoveryItems)
    .slice(0, 4)
    .map(({ event: e }) => {
      const eSlug = locale === 'it' ? (e.localizedContent.slug.it || e.localizedContent.slug.en) : e.localizedContent.slug.en;
      const eDateStr = new Intl.DateTimeFormat(getIntlLocale(locale), {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Rome',
      }).format(new Date(e.dateISO));
      return {
        href: `${localePrefix(locale)}/events/${eSlug}`,
        title: getLocalizedText(e.localizedContent.title, locale),
        dateStr: eDateStr,
      };
    });

  // One discovery gallery backed by verified editorial & Xceed inventory.
  const discoveryEvents = allVenueCalendarItems
    .filter(({ event: e }) => !isCurrentEvent(e) && isUpcomingRome(e.dateISO))
    .sort(compareEventDiscoveryItems);

  const eventVisualGallery = getEventVisualGallery(event.localizedContent.slug.en, locale);
  const eventBatchProfile = getEventBatchProfile(event.localizedContent.slug.en);
  const eventLocalePack = getEventLocalePack(locale);
  const eventBatchValues = eventBatchProfile && eventLocalePack
    ? getBatchEventTemplateValues(eventBatchProfile, eventLocalePack.locale, eventLocalePack)
    : null;
  const leadPoster = localizedEventContent?.leadPosterAfterBooking ? eventVisualGallery?.images[0] : undefined;
  const bodyVisualGallery = leadPoster && eventVisualGallery
    ? { ...eventVisualGallery, images: eventVisualGallery.images.slice(1) }
    : eventVisualGallery;
  const eventHeroImage = eventVisualGallery?.hero?.src || eventVisualGallery?.images[0]?.src || event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const title = localizedEventContent?.title || getLocalizedText(event.localizedContent.title, locale);
  const venueName = getLocalizedText(venue.localizedContent.name, locale);
  const description = localizedEventContent?.seoSummary || getLocalizedText(event.localizedContent.shortDescription, locale);
  const eventIntroduction = localizedEventContent?.answerFirst || description;
  const eventForSchema: Event = localizedEventContent || eventVisualGallery
    ? {
        ...event,
        image: eventHeroImage,
        localizedContent: {
          ...event.localizedContent,
          title: { ...event.localizedContent.title, [locale]: title },
          shortDescription: { ...event.localizedContent.shortDescription, [locale]: description },
        },
      }
    : event;

  // Generate JSON-LD Schemas
  const eventSchema = generateEventSchema(eventForSchema, venue, performer || null, locale);
  if (localizedEventContent?.affiliateUrl && eventSchema.offers) {
    eventSchema.offers = {
      ...eventSchema.offers,
      url: localizedEventContent.affiliateUrl,
    };
  }
  const breadcrumbSchema = generateBreadcrumbSchema(eventForSchema, venue, locale);
  const faqItems = localizedEventContent?.faqs ?? richContent?.rewritten.faqLong.map((faq) => ({
    question: (locale === 'it' && faq.questionIt) || faq.question,
    answer: (locale === 'it' && faq.answerIt) || faq.answer,
  })) ?? [];
  const faqSchema = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null;

  // Internal linking: venue name in "About the venue" links to its /clubs page.
  const venueSlug = getLocalizedText(venue.slugs, locale);
  const venueHref = `${localePrefix(locale)}/clubs/${venueSlug}`;
  const venueHeading = getVenueHeadingParts(locale);

  // Format Date
  const dateObj = new Date(event.dateISO);
  const formattedDate = new Intl.DateTimeFormat(getIntlLocale(locale), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome'
  }).format(dateObj);

  // Format Price - null quando non c'è un prezzo reale confermato (vedi
  // lib/eventbriteSync.ts: il ticket Eventbrite non è mai il prezzo vero)
  const formattedPrice = event.pricing.entry === null
    ? null
    : new Intl.NumberFormat(getIntlLocale(locale), {
        style: 'currency',
        currency: event.pricing.currency,
        maximumFractionDigits: 0,
      }).format(event.pricing.entry);

  // Frase prezzo per il trafiletto AI - omette del tutto la parte "Ingresso"
  // quando il prezzo non è confermato, invece di affermare "Gratuito" a caso.
  const entryText = event.pricing.entry === null
    ? null
    : (event.pricing.entry === 0 ? eventText(locale, 'Free', 'Gratuito', 'Grátis') : formattedPrice);
  const tableText = event.pricing.tableMinSpend
    ? (locale === 'it' ? `tavoli VIP da €${event.pricing.tableMinSpend}` : `VIP tables from €${event.pricing.tableMinSpend}`)
    : null;
  const pricePhrase = [
    entryText ? `${eventText(locale, 'Entry', 'Ingresso', 'Entrada')}: ${entryText}` : null,
    locale === 'pt' && event.pricing.tableMinSpend
      ? `mesas VIP a partir de €${event.pricing.tableMinSpend}`
      : tableText,
  ].filter(Boolean).join(', ');
  const currentEventPath = `${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${slug}`;
  const currentEventWaHref = getConciergeBookingUrl(locale, `${title} · ${venueName}`, currentEventPath);
  const heroDims = getPublicImageDimensions(eventHeroImage, { width: 1080, height: 1350 });
  const isHeroPortrait4x5 = heroDims.height > heroDims.width;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main data-layout-alt="alternativa-02-capitoli-colore-netto" className="flex-1 flex flex-col w-full bg-[#050505] text-[#F6F1E7]">
        {/* CAPITOLO 01 — NOTTE #050505: Locandina a pieno placeholder & Intestazione */}
        <section className="w-full border-b border-[#F6F1E7]/14 bg-[#050505] pt-3 pb-8 sm:pt-4">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-10 lg:px-8">
            <div className={isHeroPortrait4x5 ? 'lg:col-span-5' : 'lg:col-span-6'}>
              <div
                className={`relative w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] ${isHeroPortrait4x5 ? 'aspect-[4/5]' : ''}`}
                style={isHeroPortrait4x5 ? undefined : { aspectRatio: `${heroDims.width} / ${heroDims.height}` }}
              >
                <Image
                  src={eventHeroImage}
                  alt={eventVisualGallery?.hero?.alt || eventVisualGallery?.images[0]?.alt || title}
                  width={heroDims.width}
                  height={heroDims.height}
                  quality={95}
                  priority={true}
                  fetchPriority="high"
                  sizes={isHeroPortrait4x5 ? '(max-width: 1080px) 100vw, 1080px' : '(max-width: 1024px) 100vw, 1080px'}
                  className="block h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {!eventHeroImage.startsWith('/images/events/') && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-x border-b border-[#F6F1E7]/18 bg-[#050505] px-4 py-2 font-mono text-[11px] font-bold tracking-[0.12em] text-[#F6F1E7]">
                  <span>WWW.NIGHTLIFEMILAN.COM</span>
                  <span className="inline-flex items-center gap-1.5 text-[#EAE3D5]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                    +39 351 912 7047
                  </span>
                </div>
              )}
            </div>

            <div className={isHeroPortrait4x5 ? 'min-w-0 lg:col-span-7' : 'min-w-0 lg:col-span-6'}>
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span className="bg-[#EAE3D5] px-3 py-1 font-mono text-xs font-extrabold uppercase tracking-wider text-[#050505]">
                  {venueName}
                </span>
                {event.genre.length > 0 && (
                  <span className="border border-[#F6F1E7]/25 bg-[#141311] px-3 py-1 text-xs font-semibold text-[#EAE3D5]">
                    {event.genre.map(g => formatEventGenre(locale, g)).join(' · ')}
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[#F6F1E7] sm:text-4xl md:text-5xl">
                {title}
              </h1>
              <time dateTime={event.dateISO} className="mt-3 flex items-center gap-2 font-mono text-sm text-[#EAE3D5] sm:text-base">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {formattedDate}
              </time>
            </div>
          </div>
        </section>

        {/* CAPITOLO 02 — CARTA CALDA #F6F1E7: Prezzi Chiari, Informazioni Rapide & Prenotazione Immediata */}
        <section className="w-full border-b border-[#050505] bg-[#F6F1E7] py-10 text-[#050505]">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:px-8">
            <div className="space-y-6 lg:col-span-7">
              {Date.parse(event.endDateISO || event.dateISO) < Date.now() && (
                <div
                  data-past-event-conversion-banner
                  className="not-prose bg-[#050505] p-5 text-[#F6F1E7]"
                >
                  <p className="text-sm font-semibold text-[#F6F1E7]">
                    {getEventTemporalCopy(locale as LocaleCode, event.dateISO.slice(0, 10)).endedNotice}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={currentEventWaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center bg-[#25D366] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472]"
                    >
                      {getVenueUi35(locale as LocaleCode).bookWhatsApp} · {CONTACT.whatsapp.number}
                    </a>
                    <Link
                      href={`${localePrefix(locale)}/events/tonight`}
                      className="inline-flex min-h-[44px] items-center justify-center border border-[#F6F1E7]/40 bg-[#141311] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition hover:border-[#F6F1E7]"
                    >
                      {getVenueUi35(locale as LocaleCode).tabTonight}
                    </Link>
                    <Link
                      href={`${localePrefix(locale)}/vip-tables`}
                      className="inline-flex min-h-[44px] items-center justify-center border border-[#F6F1E7]/25 bg-[#141311] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#C2B9AA] transition hover:text-[#F6F1E7]"
                    >
                      {getVenueUi35(locale as LocaleCode).labelPrices}
                    </Link>
                  </div>
                </div>
              )}

              {/* Sintesi Rapida aperta senza cassettone */}
              <div className="not-prose border-b border-[#050505]/20 pb-5 text-left text-[#050505]">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A453E]">
                  {eventText(locale, 'Quick Answer', 'Sintesi serata & prezzi', 'Resposta rapida')}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#24201B] sm:text-base">
                  {localizedEventContent?.seoSummary || buildEventQuickAnswer({ locale, title, venueName, formattedDate, pricePhrase })}
                </p>
              </div>

              {/* Scheda Pratica — 1 Colonna Mobile con Filetti Sottili */}
              <div className="not-prose grid grid-cols-1 divide-y divide-[#050505]/16 md:grid-cols-3 md:gap-6 md:divide-y-0">
                <div className="py-3 text-[#050505]">
                  <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4A453E]">
                    {eventText(locale, 'Dress Code', 'Dress Code', 'Código de vestimenta')}
                  </h2>
                  <p className="mt-1 font-sans text-sm font-semibold text-[#050505]">
                    {eventBatchValues?.dressCode || eventText(locale, 'Smart elegant. No sneakers or shorts.', 'Smart elegant. Niente sneakers o shorts.', 'Elegante e sofisticado. Sem tênis ou bermudas.')}
                  </p>
                </div>
                <div className="py-3 text-[#050505]">
                  <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4A453E]">
                    {eventText(locale, 'Minimum Age', 'Età Minima', 'Idade mínima')}
                  </h2>
                  <p className="mt-1 font-sans text-sm font-semibold text-[#050505]">
                    {eventBatchProfile?.minAge ?? 18}+ {eventText(locale, '(ID required)', '(documento richiesto)', '(documento obrigatório)')}
                  </p>
                </div>
                <div className="py-3 text-[#050505]">
                  <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4A453E]">
                    {eventText(locale, 'Location', 'Indirizzo', 'Localização')}
                  </h2>
                  <p className="mt-1 font-sans text-sm font-semibold text-[#050505]">
                    {String(eventBatchValues?.address || `${venue.address.streetAddress}, ${eventText(locale, 'Milan', 'Milano', 'Milão')}`)}
                  </p>
                </div>
              </div>

              {localizedEventContent?.bookingIntro && (
                <section className="border border-[#050505] bg-[#FFFFFF] p-5 text-[#050505]" data-event-section="booking-intro">
                  <h2 className="font-display text-xl font-bold text-[#050505] sm:text-2xl">
                    {eventText(locale, 'Tickets, admission and WhatsApp', 'Prenotazioni, biglietti e WhatsApp', 'Bilhetes, entrada e WhatsApp')}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#24201B] sm:text-base">
                    {localizedEventContent.bookingIntro}
                  </p>
                  <div className="not-prose mt-4 flex flex-col gap-3 bg-[#050505] p-3 sm:flex-row">
                    <a
                      href={localizedEventContent.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      data-analytics-source="event_intro_xceed"
                      className="flex min-h-[46px] flex-1 items-center justify-center bg-[#EAE3D5] px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#050505] transition-colors hover:bg-[#F6F1E7]"
                    >
                      {eventText(locale, 'Buy on Xceed', 'Acquista su Xceed', 'Comprar na Xceed')}
                    </a>
                    <a
                      href={currentEventWaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics-source="event_intro_whatsapp"
                      className="flex min-h-[46px] flex-1 items-center justify-center bg-[#25D366] px-5 py-3 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#050505] transition-colors hover:bg-[#2EE472]"
                    >
                      {eventText(locale, 'Confirm on WhatsApp', 'Conferma su WhatsApp', 'Confirmar no WhatsApp')} {CONTACT.whatsapp.number}
                    </a>
                  </div>
                </section>
              )}
            </div>

            {/* Plinto Notte #050505: Dettagli Ingresso, Xceed & Modulo Prenotazione */}
            <aside id="booking" className="border border-[#050505] bg-[#050505] p-6 text-[#F6F1E7] lg:col-span-5 lg:sticky lg:top-24">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#EAE3D5]">
                01 · PRENOTAZIONE DIRETTA
              </p>
              <h2 className="mt-1 border-b border-[#F6F1E7]/15 pb-4 font-display text-2xl font-bold uppercase text-[#F6F1E7]">
                {eventText(locale, 'Entry Details', 'Dettagli Ingresso & Tavoli', 'Detalhes de entrada')}
              </h2>

              <div className="my-5 space-y-3 text-sm tabular-nums">
                <div className="flex items-baseline justify-between border border-[#F6F1E7]/14 bg-[#141311] px-4 py-3">
                  <span className="text-[#C2B9AA]">{eventText(locale, 'Entry', 'Ingresso', 'Entrada')}</span>
                  <span className="font-display text-2xl font-extrabold text-[#F6F1E7]">
                    {event.pricing.entry === null
                      ? eventText(locale, 'On request', 'Su richiesta', 'Sob consulta')
                      : event.pricing.entry === 0
                        ? eventText(locale, 'Free', 'Gratis', 'Grátis')
                        : formattedPrice}
                  </span>
                </div>
                {event.pricing.tableMinSpend && (
                  <div className="flex items-baseline justify-between border border-[#F6F1E7]/14 bg-[#141311] px-4 py-3">
                    <span className="text-[#C2B9AA]">{eventText(locale, 'Tables from', 'Tavoli VIP da', 'Mesas a partir de')}</span>
                    <span className="font-display text-2xl font-extrabold text-[#EAE3D5]">
                      {new Intl.NumberFormat(getIntlLocale(locale), { style: 'currency', currency: event.pricing.currency, maximumFractionDigits: 0 }).format(event.pricing.tableMinSpend)}
                    </span>
                  </div>
                )}
              </div>

              {event.xceedUrl && (
                <a
                  href={event.xceedUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mb-4 flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#EAE3D5] px-6 py-3.5 font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-[#050505] transition-colors hover:bg-[#F6F1E7]"
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                  {eventText(locale, 'Buy on Xceed', 'Acquista su Xceed', 'Comprar no Xceed')}
                </a>
              )}

              <BookingForm
                lang={locale}
                prefilledDate={event.dateISO.split('T')[0]}
                venueName={venueName}
                eventName={title}
              />

              <div className="mt-5 border-t border-[#F6F1E7]/14 pt-4 text-xs">
                <p className="font-mono uppercase tracking-wider text-[#C2B9AA]">{eventText(locale, 'Location', 'Location', 'Localização')}</p>
                <p className="mt-1 font-bold text-[#F6F1E7]">{venueName}</p>
                <p className="text-[#C2B9AA]">{venue.address.streetAddress}, {locale === 'pt' ? 'Milão' : venue.address.addressLocality}</p>
              </div>
            </aside>
          </div>
        </section>

        {/* CAPITOLO 03 — NOTTE #050505: Approfondimento Evento, Galleria Swipe & Contenuti Editoriali */}
        <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 md:px-12">
          <div className="max-w-none">
            <div className="not-prose mb-6 flex flex-wrap gap-2">
              {[
                venueName,
                ...event.genre.map(g => formatEventGenre(locale, g)),
                eventText(locale, 'Milan Events', 'Serate Milano', 'Eventos em Milão'),
                eventText(locale, 'VIP Tables', 'Tavoli VIP', 'Mesas VIP'),
              ].map(tag => (
                <span key={tag} className="border border-[#F6F1E7]/16 bg-[#141311] px-3 py-1 text-xs font-semibold tracking-wide text-[#C2B9AA]">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mb-4 font-display text-2xl font-bold text-[#EAE3D5] sm:text-3xl">
              {eventText(locale, 'About the event', "Informazioni sull'evento", 'Sobre o evento')}
            </h2>
            <p className="text-base leading-relaxed text-[#DED8CC] sm:text-lg">
              {eventIntroduction}
            </p>

            {leadPoster && (() => {
              const leadDims = getPublicImageDimensions(leadPoster.src, { width: 1080, height: 1350 });
              const isLeadPortrait = leadDims.height > leadDims.width;
              return (
                <section className="mt-8" data-event-section="lead-poster">
                  <h2 className="mb-4 font-display text-2xl font-bold text-[#EAE3D5]">{leadPoster.title}</h2>
                  <figure className="not-prose md:max-w-[520px]">
                    <div
                      className={`relative w-full overflow-hidden border border-[#F6F1E7]/16 bg-[#050505] ${leadPoster.aspect === 'five-four' ? 'aspect-[5/4]' : isLeadPortrait ? 'aspect-[4/5]' : ''}`}
                      style={leadPoster.aspect === 'five-four' || isLeadPortrait ? undefined : { aspectRatio: `${leadDims.width} / ${leadDims.height}` }}
                    >
                      <Image
                        src={leadPoster.src}
                        alt={leadPoster.alt}
                        title={leadPoster.title}
                        fill
                        quality={95}
                        sizes="(max-width: 1080px) 100vw, 1080px"
                        className="object-cover"
                      />
                    </div>
                    {leadPoster.description ? <figcaption className="mt-3 text-sm leading-relaxed text-[#C2B9AA]">{leadPoster.description}</figcaption> : null}
                  </figure>
                </section>
              );
            })()}

            {performer && (
              <div className="mt-8 border border-[#F6F1E7]/16 bg-[#141311] p-6">
                <h3 className="font-display text-xl font-bold text-[#EAE3D5]">{eventText(locale, 'Lineup', 'Lineup', 'Line-up')}: {performer.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C2B9AA]">
                  {getLocalizedText(performer.localizedContent.bio, locale)}
                </p>
              </div>
            )}

            {!localizedEventContent?.programmeBeforeSections && (
              <>
                <h2 className="mb-4 mt-10 font-display text-2xl font-bold text-[#EAE3D5]">
                  {!localizedEventContent && venueHeading.prefix ? `${venueHeading.prefix} ` : null}
                  <Link href={venueHref} className="underline decoration-[#EAE3D5]/40 underline-offset-4 transition-colors hover:text-[#F6F1E7]">
                    {venueName}
                  </Link>
                  {!localizedEventContent ? venueHeading.suffix || null : null}
                </h2>
                <p className="leading-relaxed text-[#DED8CC]">
                  {localizedEventContent?.venueDescription || buildVenueDescription(locale, venueName, venue.address.streetAddress)}
                </p>
                <div className="not-prose mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {buildVenueGalleryImages(venue, title, locale).map((img, i) => (
                    <div key={i} className="relative aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/16 bg-[#050505]">
                      <Image src={img.src} alt={img.alt} title={img.alt} fill quality={92} className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {localizedEventContent && (
              <GoldEventContent localized={localizedEventContent} locale={locale} gallery={bodyVisualGallery} />
            )}
            {!localizedEventContent && richContent && (
              <GoldEventContent data={richContent} locale={locale} gallery={bodyVisualGallery} />
            )}
            {!localizedEventContent && !richContent && bodyVisualGallery && (
              <EventImageGallery gallery={bodyVisualGallery} locale={locale} />
            )}

            <MoreVenueEvents items={moreVenueEvents} locale={locale} venueName={venueName} />
          </div>
        </section>

        {/* Discovery gallery: editorial and partner event inventory. */}
        {discoveryEvents.length > 0 && (
          <section className="py-16 border-t border-white/5">
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl md:text-3xl text-white">
                    {eventText(locale, 'Featured events in Milan', 'Eventi in evidenza a Milano', 'Eventos em destaque em Milão')}
                  </h2>
                  <Link href={`${localePrefix(locale)}/events`} className="text-champagne text-sm tracking-wider hover:underline uppercase whitespace-nowrap">
                    {eventText(locale, 'See all', 'Vedi tutti', 'Ver todos')} →
                  </Link>
                </div>
                <EventsCarousel items={discoveryEvents} lang={locale} />
            </div>
          </section>
        )}
        <EventMoneyPillarsStrip locale={locale} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-white/10 space-y-12">
          <VipQuoteCalculator locale={locale} />
          <PrioritySixShowcase locale={locale} />
        </section>
      </main>
    </>
  );
}
