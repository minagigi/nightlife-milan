import { getBatchEventTemplateValues, interpolateEventBatchTemplate } from './eventBatchContent';
import { getEventBatchProfile } from './eventBatchProfiles';
import { getEventLocalePack } from './eventLocalePacks';
import { UNIVERSITY_PARTY_CANONICAL_SLUG, UNIVERSITY_PARTY_PT_LEGACY_SLUG } from './universityPartyPt';
import {
  WORLD_CUP_FINAL_CANONICAL_SLUG,
  WORLD_CUP_FINAL_COVER_IT,
  WORLD_CUP_FINAL_POSTER_IT,
} from './worldCupFinalIt';
import {
  WORLD_CUP_FINAL_COVER_EN,
  WORLD_CUP_FINAL_POSTER_EN,
} from './worldCupFinalEn';
import { getWorldCupFinalLocaleCopy } from './worldCupFinalLocaleCopies';
import {
  getWorldCupFinalGalleryImageCopy,
  getWorldCupFinalGeneratedImagePath,
} from './worldCupFinalVisuals';
import { isEnabledLocale } from './i18n/locales';
import {
  GUE_JUST_ME_CANONICAL_SLUG,
  getGueJustMeGeneratedImagePath,
} from './gueJustMe';
import { getGueJustMeLocalizedContent } from './gueJustMeLocales';
import {
  BAD_BUNNY_ARIA_CANONICAL_SLUG,
  getBadBunnyAriaImagePath,
} from './badBunnyAria';
import { getBadBunnyAriaLocalizedContent } from './badBunnyAriaLocales';
import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from './badBunnyAriaEditorialCopy';
import {
  MONDAY_NIGHT_CANONICAL_SLUG,
  MONDAY_NIGHT_VISUALS,
  getMondayNightLocalizedContent,
} from './weeklyJuly20Pilot';
import { getWeeklyJuly20GalleryCopy } from './weeklyJuly20Site';

export type EventGalleryImage = {
  src: string;
  title: string;
  alt: string;
  description?: string;
  aspect?: 'square' | 'five-four' | 'portrait' | 'landscape';
};

export type EventVisualGallery = {
  heading: string;
  hero?: EventGalleryImage;
  images: EventGalleryImage[];
};

const UNIVERSITY_PARTY_SLUGS = new Set([
  UNIVERSITY_PARTY_CANONICAL_SLUG,
  UNIVERSITY_PARTY_PT_LEGACY_SLUG,
]);

const UNIVERSITY_PARTY_PT: EventVisualGallery = {
  heading: 'Galeria da University Party no Just Me Milano',
  images: [
    {
      src: '/images/events/generated/just-me-university-party-recomposed-1x1-pt.png',
      title: 'Cartaz Just Me Milano University Party - 14 de julho',
      alt: 'Cartaz em português da University Party no Just Me Milano em 14 de julho com reservas pelo WhatsApp',
    },
    {
      src: '/images/events/generated/just-me-university-party-pt-aperitivo-1x1.png',
      title: 'Aperitivo da University Party no Just Me Milano',
      alt: 'Aperitivo no Just Me Milano antes da University Party para estudantes internacionais em Milão',
    },
    {
      src: '/images/events/generated/just-me-university-party-pt-dancefloor-1x1.png',
      title: 'Pista da University Party em Milão',
      alt: 'Pista da University Party no Just Me Milano com Erasmus, hip hop, reggaeton e EDM',
    },
    {
      src: '/images/events/generated/just-me-university-party-pt-vip-tables-1x1.png',
      title: 'Mesas VIP Just Me Milano e serviço de garrafas',
      alt: 'Mesas VIP no Just Me Milano com serviço de garrafas para grupos universitários em Sempione',
    },
    {
      src: '/images/events/generated/just-me-university-party-pt-torre-branca-arrival-1x1.png',
      title: 'Chegada ao Just Me Milano junto à Torre Branca',
      alt: 'Chegada à University Party no Just Me Milano perto da Torre Branca em Sempione',
    },
  ],
};

/**
 * A gallery belongs to the individual event, never to the venue fallback.
 * Other locales are intentionally withheld until their poster text and SEO
 * metadata are localized, rather than showing a Portuguese or English asset.
 */
export function getEventVisualGallery(slug: string, locale: string): EventVisualGallery | null {
  if (UNIVERSITY_PARTY_SLUGS.has(slug) && locale === 'pt') return UNIVERSITY_PARTY_PT;
  const canonicalProfileSlug = getEventBatchProfile(slug)?.canonicalSlug;
  const isWorldCupFinal = slug === WORLD_CUP_FINAL_CANONICAL_SLUG
    || canonicalProfileSlug === WORLD_CUP_FINAL_CANONICAL_SLUG;
  if (isWorldCupFinal && isEnabledLocale(locale)) {
    const copy = getWorldCupFinalLocaleCopy(locale);
    const cover = locale === 'it'
      ? WORLD_CUP_FINAL_COVER_IT
      : locale === 'en'
        ? WORLD_CUP_FINAL_COVER_EN
        : {
            src: `/images/events/generated/just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`,
            title: copy.gallery.posterTitle,
            alt: copy.gallery.posterAlt,
            description: copy.gallery.posterAlt,
          };
    const poster = locale === 'it'
      ? WORLD_CUP_FINAL_POSTER_IT
      : locale === 'en'
        ? WORLD_CUP_FINAL_POSTER_EN
        : {
            src: `/images/events/generated/just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`,
            title: copy.gallery.posterTitle,
            alt: copy.gallery.posterAlt,
            description: copy.gallery.posterAlt,
          };
    const supportingImages = getWorldCupFinalGalleryImageCopy(locale);
    return {
      heading: copy.gallery.heading,
      hero: {
        src: cover.src,
        title: cover.title,
        alt: cover.alt,
        description: cover.description,
        aspect: 'landscape',
      },
      images: [
        {
          src: poster.src,
          title: poster.title,
          alt: poster.alt,
          description: poster.description,
          aspect: 'five-four',
        },
        ...supportingImages.map((image) => ({
          src: getWorldCupFinalGeneratedImagePath(locale, image.kind),
          title: image.title,
          alt: image.alt,
          description: image.description,
          aspect: 'five-four' as const,
        })),
      ],
    };
  }

  const isGueJustMe = slug === GUE_JUST_ME_CANONICAL_SLUG
    || canonicalProfileSlug === GUE_JUST_ME_CANONICAL_SLUG;
  if (isGueJustMe && isEnabledLocale(locale)) {
    const content = getGueJustMeLocalizedContent(locale);
    const pack = getEventLocalePack(locale)!;
    const galleryTitles = [
      `${content.title} · Torre Branca`,
      content.sections[1].title,
      content.sections[0].title,
      pack.eventbrite.programmeTitle,
    ] as const;
    const galleryAlts = [
      `${content.title}, Torre Branca, Just Me Milano`,
      `${content.title}, ${content.sections[1].title}: 21+, Just Me Milano`,
      `${content.title}, ${content.sections[0].title}: ${content.sections[0].body}`,
      `${content.title}, ${pack.eventbrite.programmeTitle}: 19:30–05:00, Just Me Milano`,
    ] as const;
    return {
      heading: fillGueGalleryHeading(pack.gallery.heading, content.title),
      hero: {
        src: getGueJustMeGeneratedImagePath(locale, 'cover'),
        title: content.title,
        alt: `${content.title}, Just Me Milano, 25.07.2026`,
        description: content.seoSummary,
        aspect: 'landscape',
      },
      images: [
        {
          src: getGueJustMeGeneratedImagePath(locale, 'poster'),
          title: content.title,
          alt: `${content.title}, Just Me Milano, 25.07.2026`,
          description: content.answerFirst,
          aspect: 'five-four',
        },
        ...(['performance', 'target', 'dress', 'programme'] as const).map((kind, index) => ({
          src: getGueJustMeGeneratedImagePath(locale, kind),
          title: galleryTitles[index],
          alt: galleryAlts[index],
          description: galleryAlts[index],
          aspect: 'five-four' as const,
        })),
      ],
    };
  }

  const isBadBunnyAria = slug === BAD_BUNNY_ARIA_CANONICAL_SLUG
    || canonicalProfileSlug === BAD_BUNNY_ARIA_CANONICAL_SLUG;
  if (isBadBunnyAria && isEnabledLocale(locale)) {
    const content = getBadBunnyAriaLocalizedContent(locale);
    const pack = getEventLocalePack(locale)!;
    const editorial = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
    const images = [
      { kind: 'poster' as const, title: content.title, alt: `${content.title} · Aria Club Milano · 18.07.2026` },
      { kind: 'venue' as const, title: editorial.targetLabel, alt: `${editorial.targetLabel} · Aria Club Milano` },
      { kind: 'aperitivo' as const, title: content.programme[0].title, alt: `${content.programme[0].title} · Aria Club Milano` },
      { kind: 'club' as const, title: content.programme.at(-1)?.title || pack.eventbrite.programmeTitle, alt: `${content.programme.at(-1)?.title || pack.eventbrite.programmeTitle} · Aria Club Milano` },
      { kind: 'tables' as const, title: pack.eventbrite.bookTable, alt: `${pack.eventbrite.bookTable} · Aria Club Milano` },
    ];
    return {
      heading: pack.gallery.heading.replace('{event}', content.title).replace('{venue}', 'Aria Club Milano'),
      hero: {
        src: getBadBunnyAriaImagePath(locale, 'cover'),
        title: content.title,
        alt: `${content.title} · Aria Club Milano · 18.07.2026`,
        description: content.seoSummary,
        aspect: 'landscape',
      },
      images: images.map((image) => ({
        src: getBadBunnyAriaImagePath(locale, image.kind),
        title: image.title,
        alt: image.alt,
        description: image.alt,
        aspect: 'five-four' as const,
      })),
    };
  }

  const profile = getEventBatchProfile(slug);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) return null;
  if (profile.siteLocales && !profile.siteLocales.includes(pack.locale)) return null;

  if (profile.canonicalSlug === MONDAY_NIGHT_CANONICAL_SLUG && (pack.locale === 'en' || pack.locale === 'it')) {
    const content = getMondayNightLocalizedContent(pack.locale);
    const isIt = pack.locale === 'it';
    const moodCopy = isIt ? [
      ['Arrivo al Just Me Milano', 'Ospiti 25–35 con dress code elegante in arrivo alla Torre Branca per Monday Night.'],
      ['Aperitivo al Just Me Milano', 'Aperitivo dalle 19:30 sulla terrazza del Just Me Milano con pubblico internazionale.'],
      ['Lounge e target della serata', 'Pubblico internazionale 25–35 nella lounge del Just Me Milano durante Monday Night.'],
      ['Buffet aperitivo dalle 19:30', 'Buffet del Just Me Milano con ospiti in abbigliamento elegante prima della fase club.'],
    ] : [
      ['Arrival at Just Me Milano', 'International 25–35 guests in elegant dress arriving by Torre Branca for Monday Night.'],
      ['Aperitivo at Just Me Milano', 'Aperitivo from 19:30 on the Just Me Milano terrace with an international crowd.'],
      ['Monday Night lounge and target', 'An international 25–35 audience in the Just Me Milano lounge during Monday Night.'],
      ['Buffet aperitivo from 19:30', 'The Just Me Milano buffet with elegantly dressed guests before the club phase.'],
    ];
    return {
      heading: isIt ? 'Immagini di Monday Night al Just Me Milano' : 'Monday Night at Just Me Milano gallery',
      hero: {
        src: MONDAY_NIGHT_VISUALS[pack.locale].cover,
        title: content.title,
        alt: isIt ? 'Locandina Monday Night Just Me Milano 20 luglio 2026' : 'Monday Night Just Me Milano poster July 20 2026',
        description: content.seoSummary,
        aspect: 'landscape',
      },
      images: [
        {
          src: MONDAY_NIGHT_VISUALS[pack.locale].poster,
          title: content.title,
          alt: isIt ? 'Locandina 5:4 Monday Night al Just Me Milano, lunedì 20 luglio 2026' : '5:4 Monday Night at Just Me Milano poster for Monday July 20 2026',
          description: content.answerFirst,
          aspect: 'five-four',
        },
        ...MONDAY_NIGHT_VISUALS.mood.map((src, index) => ({
          src,
          title: moodCopy[index][0],
          alt: moodCopy[index][1],
          description: moodCopy[index][1],
          aspect: 'five-four' as const,
        })),
      ],
    };
  }

  const weeklyJuly20Gallery = getWeeklyJuly20GalleryCopy(profile, pack.locale);
  if (weeklyJuly20Gallery) return weeklyJuly20Gallery;

  const values = getBatchEventTemplateValues(profile, pack.locale, pack);
  const fill = (template: string) => interpolateEventBatchTemplate(template, values);

  return {
    heading: fill(pack.gallery.heading),
    images: [
      {
        src: `/api/event-poster/${profile.baseId}/${pack.locale}`,
        title: fill(pack.gallery.posterTitle),
        alt: fill(pack.gallery.posterAlt),
      },
      ...profile.venueImages.map((src, index) => ({
        src,
        title: fill(pack.gallery.moodTitles[index]),
        alt: fill(pack.gallery.moodAlts[index]),
      })),
    ],
  };
}

function fillGueGalleryHeading(template: string, eventName: string): string {
  return template.replace('{event}', eventName).replace('{venue}', 'Just Me Milano');
}
