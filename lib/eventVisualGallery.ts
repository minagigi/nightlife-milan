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

  const profile = getEventBatchProfile(slug);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) return null;
  if (profile.siteLocales && !profile.siteLocales.includes(pack.locale)) return null;

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
