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
  {
    id: 'v-dock22',
    slugs: {
      en: 'dock-22-milano',
      it: 'dock-22-milano',
    },
    address: {
      streetAddress: 'Alzaia Naviglio Grande, 122',
      addressLocality: 'Milano',
      addressRegion: 'MI',
      postalCode: '20144',
      addressCountry: 'IT',
    },
    category: VenueCategory.CLUB,
    coordinates: { latitude: 45.4485, longitude: 9.1632 },
    zone: MilanZone.NAVIGLI,
    sameAs: [],
    localizedContent: {
      name: {
        en: 'Dock 22',
        it: 'Dock 22',
      },
      description: {
        en: 'Dock 22 is an industrial event and open-air showcase space in Milan along the Navigli and Tortona creative corridor. The venue hosts special electronic music showcases, international DJ sets, fashion week productions, and private events on selected dates; entry formulas and table availability depend on each scheduled event.',
        it: 'Dock 22 è uno spazio industriale per eventi e showcase open-air a Milano lungo il distretto creativo tra Navigli e Tortona. La venue ospita showcase di musica elettronica, DJ set internazionali, produzioni della Fashion Week ed eventi privati in date selezionate; modalità di ingresso e disponibilità tavoli dipendono dal singolo evento in programma.',
      },
      dressCode: {
        en: 'Check the official conditions for the selected event date.',
        it: 'Verifica le condizioni ufficiali per la data selezionata.',
      },
      altTextImg: {
        en: 'Nightlife Milan editorial illustration for Dock 22 in the Navigli district.',
        it: 'Illustrazione editoriale Nightlife Milan per Dock 22 nel distretto Navigli.',
      },
      insiderTip: {
        en: 'Contact the official Nightlife Milan concierge on WhatsApp (+39 351 912 7047) for upcoming electronic showcases and VIP table options in Milan.',
        it: 'Contatta il concierge ufficiale Nightlife Milan su WhatsApp (+39 351 912 7047) per i prossimi showcase elettronici e le opzioni tavolo VIP a Milano.',
      },
    },
    image: '/images/club-techno.webp',
    gallery: ['/images/milan-club-crowd-dancefloor-night.webp'],
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 0,
    tags: ['Club', 'Electronic', 'Navigli'],
  },
  {
    id: 'v-bobino',
    slugs: {
      en: 'bobino-milano',
      it: 'bobino-milano',
    },
    address: {
      streetAddress: 'Piazzale Stazione Genova, 4',
      addressLocality: 'Milano',
      addressRegion: 'MI',
      postalCode: '20144',
      addressCountry: 'IT',
    },
    category: VenueCategory.LOUNGE_BAR,
    coordinates: { latitude: 45.4526, longitude: 9.1695 },
    zone: MilanZone.NAVIGLI,
    sameAs: [],
    localizedContent: {
      name: {
        en: 'Bobino Milano',
        it: 'Bobino Milano',
      },
      description: {
        en: 'Bobino Milano is a cocktail bar, dinner lounge, and late-night music venue at Piazzale Stazione Genova 4 in the Navigli district. Known for evening aperitivo, outdoor garden seating in warmer months, and commercial DJ sets after dinner, admission and table conditions vary by night and special event.',
        it: 'Bobino Milano è un cocktail bar, lounge per aperitivo e locale serale con DJ set in Piazzale Stazione Genova 4, nel cuore dei Navigli. Punto di riferimento per aperitivo serale, area giardino nei mesi miti e selezione musicale commerciale dopo cena; condizioni di ingresso e prenotazione tavoli variano in base alla serata.',
      },
      dressCode: {
        en: 'Smart casual; check the official conditions for special nights.',
        it: 'Smart casual; verifica le condizioni ufficiali nelle serate speciali.',
      },
      altTextImg: {
        en: 'Nightlife Milan editorial illustration for Bobino Milano at Porta Genova Navigli.',
        it: 'Illustrazione editoriale Nightlife Milan per Bobino Milano a Porta Genova Navigli.',
      },
      insiderTip: {
        en: 'Reach out to the Nightlife Milan concierge on WhatsApp (+39 351 912 7047) for updated Navigli evening and table guidance.',
        it: 'Scrivi al concierge Nightlife Milan su WhatsApp (+39 351 912 7047) per indicazioni aggiornate su serate e tavoli in zona Navigli.',
      },
    },
    image: '/images/seo-events/master/bobino-milano.webp',
    gallery: ['/images/milan-navigli-nightlife-canal-bars.webp'],
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 0,
    tags: ['Aperitivo', 'Lounge', 'Navigli'],
  },
  {
    id: 'v-loolapaloosa',
    slugs: {
      en: 'loolapaloosa-milano',
      it: 'loolapaloosa-milano',
    },
    address: {
      streetAddress: 'Corso Como, 15',
      addressLocality: 'Milano',
      addressRegion: 'MI',
      postalCode: '20154',
      addressCountry: 'IT',
    },
    category: VenueCategory.CLUB,
    coordinates: { latitude: 45.4819, longitude: 9.1876 },
    zone: MilanZone.CORSO_COMO,
    sameAs: [],
    localizedContent: {
      name: {
        en: 'Loolapaloosa',
        it: 'Loolapaloosa',
      },
      description: {
        en: 'Loolapaloosa is a historic party bar and club at Corso Como 15 in Milan, steps from Piazza Gae Aulenti and Porta Garibaldi. Recognised for its high-energy sing-along atmosphere, bar counter performances, and commercial party sets from aperitivo until late night; entry and table conditions depend on the selected evening.',
        it: 'Loolapaloosa è uno storico party bar e club in Corso Como 15 a Milano, a pochi passi da Piazza Gae Aulenti e Porta Garibaldi. Conosciuto per l’atmosfera festosa, l’animazione e i DJ set commerciali dall’aperitivo fino a tarda notte; condizioni di ingresso e tavoli dipendono dalla serata selezionata.',
      },
      dressCode: {
        en: 'Smart casual; check official venue conditions on weekends and holidays.',
        it: 'Smart casual; verifica le condizioni ufficiali nei weekend e nelle festività.',
      },
      altTextImg: {
        en: 'Nightlife Milan editorial illustration for Loolapaloosa on Corso Como 15.',
        it: 'Illustrazione editoriale Nightlife Milan per Loolapaloosa in Corso Como 15.',
      },
      insiderTip: {
        en: 'Message the Nightlife Milan concierge on WhatsApp (+39 351 912 7047) for Corso Como club comparisons and VIP table availability.',
        it: 'Contatta il concierge Nightlife Milan su WhatsApp (+39 351 912 7047) per confrontare i club di Corso Como e verificare la disponibilità tavoli VIP.',
      },
    },
    image: '/images/seo-events/master/loolapaloosa-milano.webp',
    gallery: ['/images/milan-nightlife-corso-como-district-clubs.webp'],
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 0,
    tags: ['Club', 'Party Bar', 'Corso Como'],
  },
];
