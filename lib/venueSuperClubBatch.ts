import { MilanZone } from './types';
import { VenueCategory, type Venue } from './types';

/**
 * Isolated editorial intake for Super Club. The central venue registry imports
 * this batch only after its own review.
 */
export const superClubVenueBatch: Venue[] = [
  {
    id: 'v-super-club-milano',
    slugs: {
      en: 'super-club-milano',
      it: 'super-club-milano',
    },
    address: {
      streetAddress: 'Via Tortona, 27',
      addressLocality: 'Milano',
      addressRegion: 'MI',
      postalCode: '20144',
      addressCountry: 'IT',
    },
    category: VenueCategory.CLUB,
    coordinates: { latitude: 45.4642, longitude: 9.1900 },
    zone: MilanZone.CORSO_COMO,
    sameAs: [],
    localizedContent: {
      name: {
        en: 'Super Club',
        it: 'Super Club',
      },
      description: {
        en: 'Super Club is a club and event venue at Via Tortona 27 in Milan’s Tortona district. Its 380-square-metre space has lighting and show design by Expect Nothing and a Void Acoustics sound system. The owner describes club nights, concerts, video productions and brand events; admission and booking conditions depend on the selected event.',
        it: 'Super Club è un club e spazio eventi in Via Tortona 27, nel quartiere Tortona di Milano. Lo spazio di 380 metri quadrati ha luci e show design di Expect Nothing e un impianto audio Void Acoustics. La venue presenta serate clubbing, concerti, produzioni video ed eventi per brand; ingresso e prenotazioni dipendono dall’evento scelto.',
      },
      dressCode: {
        en: 'Check the official conditions for the selected date.',
        it: 'Verifica le condizioni ufficiali per la data scelta.',
      },
      altTextImg: {
        en: 'Nightlife Milan editorial illustration for Super Club, not a photo of the venue.',
        it: 'Illustrazione editoriale Nightlife Milan per Super Club, non una foto del locale.',
      },
      insiderTip: {
        en: 'For current information, contact the Nightlife Milan concierge on WhatsApp.',
        it: 'Per informazioni aggiornate, contatta il concierge Nightlife Milan su WhatsApp.',
      },
    },
    image: '/images/venues/editorial/super-club-milano-card.webp',
    gallery: ['/images/venues/editorial/super-club-milano.webp'],
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 0,
    tags: ['Club', 'Tortona'],
  },
];
