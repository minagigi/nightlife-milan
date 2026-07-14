export type EventGalleryImage = {
  src: string;
  title: string;
  alt: string;
};

export type EventVisualGallery = {
  heading: string;
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
  if (!UNIVERSITY_PARTY_SLUGS.has(slug) || locale !== 'pt') return null;
  return UNIVERSITY_PARTY_PT;
}
import { UNIVERSITY_PARTY_CANONICAL_SLUG, UNIVERSITY_PARTY_PT_LEGACY_SLUG } from './universityPartyPt';
