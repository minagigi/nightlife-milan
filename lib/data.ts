import { Event, Venue, Performer, MusicGenre, MilanZone, VenueCategory, Guide, Zone } from '@/lib/types';

// Mock Data for Zones
export const mockZones: Zone[] = [
  {
    id: MilanZone.BRERA,
    name: 'Brera',
    vibe: 'Luxury & Fashion',
    description: {
      en: 'The historic heart of Milan, known for its cobbled streets, high-end boutiques, and exclusive lounges frequented by the fashion elite.',
      it: 'Il cuore storico di Milano, noto per le sue strade acciottolate, boutique di lusso e lounge esclusive frequentate dall\'élite della moda.'
    },
    image: '/images/zones/zone-brera.jpg',
    stats: '8 Clubs, 12 Lounges',
    slug: 'brera',
    tags: ['#Luxury', '#Fashion', '#Exclusive'],
    metaTitle: {
      en: 'Best Clubs in Brera | Milan Nightlife Guide 2026',
      it: 'I migliori locali di Brera | Guida 2026'
    },
    metaDescription: {
      en: 'Discover the most exclusive clubs and luxury lounges in Brera, Milan\'s historic and fashion-forward district.',
      it: 'Scopri i club più esclusivi e le lounge di lusso a Brera, il quartiere storico e alla moda di Milano.'
    }
  },
  {
    id: MilanZone.NAVIGLI,
    name: 'Navigli',
    vibe: 'Bohemian & Raw',
    description: {
      en: 'The picturesque canal district, famous for its vibrant aperitivo scene, historic cocktail bars, and energetic, youthful crowds.',
      it: 'Il pittoresco quartiere dei canali, famoso per la sua vivace scena dell\'aperitivo, gli storici cocktail bar e la folla giovane ed energica.'
    },
    image: '/images/zones/zone-navigli.jpg',
    stats: '15 Bars, 5 Clubs',
    slug: 'navigli',
    tags: ['#Aperitivo', '#Bohemian', '#Cocktails'],
    metaTitle: {
      en: 'Navigli Nightlife & Best Bars | Milan Guide 2026',
      it: 'Vita Notturna e Migliori Bar sui Navigli | Guida 2026'
    },
    metaDescription: {
      en: 'Explore the vibrant Navigli district. Find the best spots for aperitivo, historic cocktail bars, and late-night fun along the canals.',
      it: 'Esplora il vivace quartiere dei Navigli. Trova i posti migliori per l\'aperitivo, gli storici cocktail bar e il divertimento notturno lungo i canali.'
    }
  },
  {
    id: MilanZone.CORSO_COMO,
    name: 'Corso Como',
    vibe: 'Commercial & VIP',
    description: {
      en: 'The epicenter of Milanese VIP nightlife, featuring massive commercial clubs, strict door policies, and international DJ sets.',
      it: 'L\'epicentro della vita notturna VIP milanese, con enormi club commerciali, rigide selezioni all\'ingresso e DJ set internazionali.'
    },
    image: '/images/zones/zone-corso-como.png',
    stats: '10 Clubs, 4 Rooftops',
    slug: 'corso-como',
    tags: ['#VIP', '#Commercial', '#Glamour'],
    metaTitle: {
      en: 'Corso Como VIP Clubs | Milan Nightlife Guide 2026',
      it: 'Locali VIP in Corso Como | Guida 2026'
    },
    metaDescription: {
      en: 'Experience the glamour of Corso Como. Discover the top VIP clubs, strict door policies, and international DJ sets in Milan.',
      it: 'Vivi il glamour di Corso Como. Scopri i migliori club VIP, le rigide selezioni all\'ingresso e i DJ set internazionali a Milano.'
    }
  },
  {
    id: MilanZone.ISOLA,
    name: 'Isola',
    vibe: 'Underground & Trendy',
    description: {
      en: 'A rapidly gentrifying neighborhood blending futuristic skyscrapers with hidden speakeasies and cutting-edge electronic music venues.',
      it: 'Un quartiere in rapida gentrificazione che fonde grattacieli futuristici con speakeasy nascosti e locali di musica elettronica all\'avanguardia.'
    },
    image: '/images/zones/zone-isola.jpg',
    stats: '6 Clubs, 10 Bars',
    slug: 'isola',
    tags: ['#Underground', '#Trendy', '#Speakeasy'],
    metaTitle: {
      en: 'Isola Nightlife & Speakeasies | Milan Guide 2026',
      it: 'Vita Notturna e Speakeasy in Isola | Guida 2026'
    },
    metaDescription: {
      en: 'Discover Isola\'s trendy nightlife. From hidden speakeasies to cutting-edge electronic music venues under futuristic skyscrapers.',
      it: 'Scopri la vivace vita notturna di Isola. Dagli speakeasy nascosti ai locali di musica elettronica all\'avanguardia sotto i grattacieli futuristici.'
    }
  },
  {
    id: MilanZone.PORTA_VENEZIA,
    name: 'Porta Venezia',
    vibe: 'Inclusive & Vibrant',
    description: {
      en: 'The most colorful and inclusive district in Milan, known for its historic architecture, LGBTQ+ friendly bars, and lively street atmosphere.',
      it: 'Il quartiere più colorato e inclusivo di Milano, noto per la sua architettura storica, i bar LGBTQ+ friendly e la vivace atmosfera di strada.'
    },
    image: '/images/zones/zone-porta-venezia.png',
    stats: '12 Bars, 3 Clubs',
    slug: 'porta-venezia',
    tags: ['#LGBTQ+', '#Inclusive', '#Vibrant'],
    metaTitle: {
      en: 'Porta Venezia Bars & LGBTQ+ Venues | Milan Guide 2026',
      it: 'Bar e Locali LGBTQ+ in Porta Venezia | Guida 2026'
    },
    metaDescription: {
      en: 'Explore Porta Venezia, Milan\'s most inclusive district. Find the best LGBTQ+ friendly bars and enjoy the vibrant street atmosphere.',
      it: 'Esplora Porta Venezia, il quartiere più inclusivo di Milano. Trova i migliori bar LGBTQ+ friendly e goditi la vivace atmosfera di strada.'
    }
  },
  {
    id: MilanZone.ARCO_DELLA_PACE,
    name: 'Arco della Pace',
    vibe: 'Chic Aperitivo',
    description: {
      en: 'A stunning backdrop for Milan\'s chicest aperitivos. Expect elegant outdoor seating, premium cocktails, and a sophisticated crowd.',
      it: 'Uno scenario mozzafiato per gli aperitivi più chic di Milano. Aspettati eleganti posti a sedere all\'aperto, cocktail premium e un pubblico sofisticato.'
    },
    image: '/images/zones/zone-arco-della-pace.jpg',
    stats: '14 Bars, 2 Clubs',
    slug: 'arco-della-pace',
    tags: ['#Chic', '#Aperitivo', '#Outdoor'],
    metaTitle: {
      en: 'Arco della Pace Chic Aperitivo | Milan Guide 2026',
      it: 'Aperitivo Chic all\'Arco della Pace | Guida 2026'
    },
    metaDescription: {
      en: 'Enjoy the chicest aperitivos at Arco della Pace. Discover elegant outdoor seating and premium cocktails with a sophisticated crowd.',
      it: 'Goditi gli aperitivi più chic all\'Arco della Pace. Scopri eleganti posti a sedere all\'aperto e cocktail premium con un pubblico sofisticato.'
    }
  },
  {
    id: MilanZone.RIPAMONTI,
    name: 'Ripamonti',
    vibe: 'Industrial Techno',
    description: {
      en: 'The industrial outskirts where the real underground scene thrives. Massive warehouses, heavy techno, and parties that last until dawn.',
      it: 'La periferia industriale dove prospera la vera scena underground. Enormi magazzini, techno pesante e feste che durano fino all\'alba.'
    },
    image: '/images/zones/zone-ripamonti.png',
    stats: '4 Clubs, 2 Warehouses',
    slug: 'ripamonti',
    tags: ['#Techno', '#Industrial', '#Afterhours'],
    metaTitle: {
      en: 'Ripamonti Industrial Techno Clubs | Milan Guide 2026',
      it: 'Club Techno Industriali in Ripamonti | Guida 2026'
    },
    metaDescription: {
      en: 'Dive into Ripamonti\'s industrial techno scene. Discover massive warehouses and underground parties that last until dawn.',
      it: 'Immergiti nella scena techno industriale di Ripamonti. Scopri enormi magazzini e feste underground che durano fino all\'alba.'
    }
  },
  {
    id: MilanZone.NOLO,
    name: 'NoLo',
    vibe: 'Creative & Experimental',
    description: {
      en: 'The neighborhood that never sleeps, where creativity meets experimental clubbing. Expect indie venues, art spaces, and a diverse crowd.',
      it: 'Il quartiere che non dorme mai, dove la creatività incontra il clubbing sperimentale. Aspettati locali indie, spazi d\'arte e un pubblico eterogeneo.'
    },
    image: '/images/zones/zone-nolo.png',
    stats: '7 Bars, 3 Clubs',
    slug: 'nolo',
    tags: ['#Creative', '#Experimental', '#Indie'],
    metaTitle: {
      en: 'NoLo Experimental Clubbing & Bars | Milan Guide 2026',
      it: 'Clubbing Sperimentale e Bar a NoLo | Guida 2026'
    },
    metaDescription: {
      en: 'Discover NoLo, where creativity meets experimental clubbing. Explore indie venues, art spaces, and a diverse nightlife scene.',
      it: 'Scopri NoLo, dove la creatività incontra il clubbing sperimentale. Esplora locali indie, spazi d\'arte e una scena notturna eterogenea.'
    }
  },
  {
    id: MilanZone.PORTA_ROMANA,
    name: 'Porta Romana',
    vibe: 'Elegant & Relaxed',
    description: {
      en: 'A refined residential area offering a mix of high-quality dining, elegant wine bars, and exclusive, intimate clubbing experiences.',
      it: 'Una raffinata zona residenziale che offre un mix di ristorazione di alta qualità, eleganti enoteche ed esperienze di clubbing esclusive e intime.'
    },
    image: '/images/zones/zone-porta-romana.png',
    stats: '10 Bars, 2 Clubs',
    slug: 'porta-romana',
    tags: ['#Elegant', '#WineBars', '#Intimate'],
    metaTitle: {
      en: 'Porta Romana Elegant Nightlife | Milan Guide 2026',
      it: 'Vita Notturna Elegante in Porta Romana | Guida 2026'
    },
    metaDescription: {
      en: 'Experience the elegant nightlife of Porta Romana. Find high-quality dining, refined wine bars, and exclusive intimate clubs.',
      it: 'Vivi l\'elegante vita notturna di Porta Romana. Trova ristorazione di alta qualità, raffinate enoteche e club intimi ed esclusivi.'
    }
  },
  {
    id: MilanZone.LAMBRATE,
    name: 'Lambrate',
    vibe: 'Craft Beer & Alternative',
    description: {
      en: 'The historic brewing district turned alternative hotspot. Famous for craft beer pubs, live music venues, and a laid-back, post-industrial vibe.',
      it: 'Lo storico quartiere della birra trasformato in hotspot alternativo. Famoso per i pub di birra artigianale, i locali di musica dal vivo e un\'atmosfera rilassata e post-industriale.'
    },
    image: '/images/zones/zone-lambrate.png',
    stats: '8 Pubs, 4 Live Venues',
    slug: 'lambrate',
    tags: ['#CraftBeer', '#Alternative', '#LiveMusic'],
    metaTitle: {
      en: 'Lambrate Craft Beer & Live Music | Milan Guide 2026',
      it: 'Birra Artigianale e Musica dal Vivo a Lambrate | Guida 2026'
    },
    metaDescription: {
      en: 'Explore Lambrate\'s alternative nightlife. Discover the best craft beer pubs, live music venues, and a laid-back post-industrial vibe.',
      it: 'Esplora la vita notturna alternativa di Lambrate. Scopri i migliori pub di birra artigianale, locali di musica dal vivo e un\'atmosfera post-industriale.'
    }
  }
];

// Mock Data for Venues
import { venuesData } from './venuesData';

export const mockVenues: Venue[] = venuesData;

export const mockPerformers: Performer[] = [];

// June 2026 Events — verified from official venue websites and ticketing platforms
export const mockEvents: Event[] = [

  // ─── JUST ME MILANO ────────────────────────────────────────────────────────
  {
    id: "e-justme-flower-power-0612",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-10T19:30:00+02:00",
    endDateISO: "2026-07-11T04:00:00+02:00",
    pricing: { entry: 30, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Flower Power Party from Ibiza", it: "Flower Power Party da Ibiza" },
      shortDescription: {
        en: "An exclusive aperitivo + DJ set night bringing the iconic Ibiza Flower Power party to Milan. Arrive by 7:30 PM to secure your table.",
        it: "Una serata esclusiva con aperitivo e DJ set che porta a Milano la leggendaria festa Flower Power di Ibiza. Arriva entro le 19:30 per il tuo tavolo."
      },
      slug: { en: "flower-power-ibiza-justme-12-06-2026", it: "flower-power-ibiza-justme-12-06-2026" }
    },
    image: "/images/venues/just-me-milano/just-me-milano-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-justme-fashion-week-0620",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T23:30:00+02:00",
    endDateISO: "2026-07-19T05:00:00+02:00",
    pricing: { entry: 50, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Just Me — Premium Saturday Night", it: "Just Me — Sabato Premium" },
      shortDescription: {
        en: "Just Me's most exclusive Saturday of the summer. International DJ, fashion crowd, VIP tables from €500. Dress code strictly enforced.",
        it: "Il sabato più esclusivo dell'estate al Just Me. DJ internazionale, pubblico fashion, tavoli VIP da €500. Dress code rigoroso."
      },
      slug: { en: "fashion-week-night-justme-20-06-2026", it: "fashion-week-justme-20-06-2026" }
    },
    image: "/images/venues/just-me-milano/just-me-milano-interior-02.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-justme-uncle-waffles-0625",
    venueId: "v-justme",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-06-25T23:30:00+02:00",
    endDateISO: "2026-06-26T05:00:00+02:00",
    pricing: { entry: 60, currency: "EUR", tableMinSpend: 600 },
    localizedContent: {
      title: { en: "Uncle Waffles Live + Tyga — Special Guest", it: "Uncle Waffles Live + Tyga — Special Guest" },
      shortDescription: {
        en: "Uncle Waffles performs live at Just Me Milano during Fashion Week with special guest Tyga. The most exclusive hip-hop night of the Milan season.",
        it: "Uncle Waffles si esibisce live al Just Me Milano durante la Fashion Week con il special guest Tyga. La notte hip-hop più esclusiva della stagione milanese."
      },
      slug: { en: "uncle-waffles-tyga-justme-25-06-2026", it: "uncle-waffles-tyga-justme-25-06-2026" }
    },
    image: "/images/events/xceed-justme-uncle-waffles.jpg",
    isSpecial: true,
    isTrending: true
  },

  // ─── PINETA CLUB ───────────────────────────────────────────────────────────
  {
    id: "e-pineta-noche-perreo-0612",
    venueId: "v-pineta",
    genre: [MusicGenre.REGGAETON, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-10T19:30:00+02:00",
    endDateISO: "2026-07-11T03:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Noche De Perreo", it: "Noche De Perreo" },
      shortDescription: {
        en: "Milan's biggest reggaeton party at Pineta Club. Aperitivo buffet from 7:30 PM, DJ set until dawn at Via Messina 38.",
        it: "Il più grande party reggaeton di Milano al Pineta Club. Aperitivo buffet dalle 19:30, DJ set fino all'alba in Via Messina 38."
      },
      slug: { en: "noche-de-perreo-pineta-12-06-2026", it: "noche-de-perreo-pineta-12-06-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-pineta-mfw-friday-0619",
    venueId: "v-pineta",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-17T19:30:00+02:00",
    endDateISO: "2026-07-18T05:00:00+02:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Pineta Friday — Aperitivo & Club Night", it: "Pineta Venerdì — Aperitivo & Club" },
      shortDescription: {
        en: "Pineta's summer Friday: buffet aperitivo from 7:30 PM and all-night DJ set. Fashion crowd, singing aperitivo, table service at Via Messina 38.",
        it: "Il venerdì estivo di Pineta: aperitivo a buffet dalle 19:30 e DJ set tutta la notte. Pubblico fashion, aperitivo cantato, servizio tavoli in Via Messina 38."
      },
      slug: { en: "mfw-friday-pineta-19-06-2026", it: "mfw-friday-pineta-19-06-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-02.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-pineta-mfw-perreo-0620",
    venueId: "v-pineta",
    genre: [MusicGenre.REGGAETON, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T19:30:00+02:00",
    endDateISO: "2026-07-19T05:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Perreo Saturday — Pineta Club", it: "Sabato Perreo — Pineta Club" },
      shortDescription: {
        en: "Pineta's biggest Saturday of the summer. Reggaeton, aperitivo from 7:30 PM and an unforgettable summer crowd all night long at Via Messina 38.",
        it: "Il sabato più grande dell'estate al Pineta. Reggaeton, aperitivo dalle 19:30 e un pubblico estivo indimenticabile tutta la notte in Via Messina 38."
      },
      slug: { en: "mfw-perreo-night-pineta-20-06-2026", it: "mfw-perreo-night-pineta-20-06-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-03.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-pineta-milan8mile-0626",
    venueId: "v-pineta",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-06-26T19:30:00+02:00",
    endDateISO: "2026-06-27T04:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Milan8Mile", it: "Milan8Mile" },
      shortDescription: {
        en: "Hip-hop and urban music night at Pineta Club. Aperitivo buffet from 7:30 PM at Via Messina 38.",
        it: "Serata hip-hop e urban music al Pineta Club. Aperitivo buffet dalle 19:30 in Via Messina 38."
      },
      slug: { en: "milan8mile-pineta-26-06-2026", it: "milan8mile-pineta-26-06-2026" }
    },
    image: "/images/events/xceed-pineta-milan8mile.jpg",
    xceedUrl: "https://xceed.me/en/milano/event/milan8mile-3/231334/channel/nightlifemilan-1",
  },

  // ─── MAGAZZINI GENERALI ────────────────────────────────────────────────────
  {
    id: "e-magazzini-basement-0623",
    venueId: "v-magazzini",
    genre: [MusicGenre.LIVE_MUSIC, MusicGenre.INDIE],
    dateISO: "2026-06-23T21:00:00+02:00",
    endDateISO: "2026-06-24T00:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "BASEMENT — Alternative Live Music", it: "BASEMENT — Live Music Alternativa" },
      shortDescription: {
        en: "Emerging voices from the alternative music scene take the stage at Magazzini Generali. Via Pietrasanta 16, 9 PM.",
        it: "Voci emergenti della scena alternativa salgono sul palco dei Magazzini Generali. Via Pietrasanta 16, ore 21."
      },
      slug: { en: "basement-magazzini-23-06-2026", it: "basement-magazzini-23-06-2026" }
    },
    image: "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp",
  },
  {
    id: "e-magazzini-hatebreed-0624",
    venueId: "v-magazzini",
    genre: [MusicGenre.LIVE_MUSIC],
    dateISO: "2026-06-24T21:00:00+02:00",
    endDateISO: "2026-06-24T23:30:00+02:00",
    pricing: { entry: 30, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Hatebreed Live", it: "Hatebreed Live" },
      shortDescription: {
        en: "American metalcore legends Hatebreed return to Europe for one night at Magazzini Generali. Via Pietrasanta 16, doors 9 PM.",
        it: "I leggendari Hatebreed del metalcore americano tornano in Europa per una sola notte ai Magazzini Generali. Via Pietrasanta 16, apertura ore 21."
      },
      slug: { en: "hatebreed-magazzini-24-06-2026", it: "hatebreed-magazzini-24-06-2026" }
    },
    image: "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp",
    isSpecial: true
  },
  {
    id: "e-magazzini-la-boum-0626",
    venueId: "v-magazzini",
    genre: [MusicGenre.HOUSE, MusicGenre.TECHNO],
    dateISO: "2026-06-26T23:59:00+02:00",
    endDateISO: "2026-06-27T06:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "La Boum — Season Closing Party", it: "La Boum — Closing Party di Stagione" },
      shortDescription: {
        en: "The legendary La Boum closing party at Magazzini Generali. The ultimate end-of-season underground night in Milan, from midnight to dawn.",
        it: "La leggendaria La Boum closing party ai Magazzini Generali. La notte underground di fine stagione a Milano, da mezzanotte all'alba."
      },
      slug: { en: "la-boum-magazzini-26-06-2026", it: "la-boum-magazzini-26-06-2026" }
    },
    image: "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp",
    isTrending: true
  },
  {
    id: "e-magazzini-emergenza-0627",
    venueId: "v-magazzini",
    genre: [MusicGenre.LIVE_MUSIC],
    dateISO: "2026-06-27T19:00:00+02:00",
    endDateISO: "2026-06-27T23:00:00+02:00",
    pricing: { entry: 10, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Finale Italiana Emergenza Live Music 2026", it: "Finale Italiana Emergenza Live Music 2026" },
      shortDescription: {
        en: "The 14 best emerging Italian musical projects compete on the Magazzini Generali stage for the national Emergenza Live Music final.",
        it: "I 14 migliori progetti musicali emergenti d'Italia si sfidano sul palco dei Magazzini Generali per la finale nazionale di Emergenza Live Music."
      },
      slug: { en: "emergenza-live-final-magazzini-27-06-2026", it: "emergenza-live-finale-magazzini-27-06-2026" }
    },
    image: "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp",
  },

  // ─── VOLT CLUB ─────────────────────────────────────────────────────────────
  {
    id: "e-volt-techno-0619",
    venueId: "v-volt",
    genre: [MusicGenre.TECHNO],
    dateISO: "2026-06-26T23:00:00+02:00",
    endDateISO: "2026-06-27T06:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Volt — Friday Techno", it: "Volt — Venerdì Techno" },
      shortDescription: {
        en: "Deep techno and electronic music in Volt's minimalist underground space. Fashion Week Friday — open from 11 PM.",
        it: "Techno profonda e musica elettronica nello spazio underground minimalista di Volt. Venerdì della Fashion Week — aperto dalle 23."
      },
      slug: { en: "volt-friday-techno-19-06-2026", it: "volt-venerdi-techno-19-06-2026" }
    },
    image: "/images/venues/volt-club-milano/volt-club-milano-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-volt-techno-0620",
    venueId: "v-volt",
    genre: [MusicGenre.TECHNO],
    dateISO: "2026-06-27T23:00:00+02:00",
    endDateISO: "2026-06-28T06:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Volt — Saturday Techno", it: "Volt — Sabato Techno" },
      shortDescription: {
        en: "Volt's Saturday is Milan's most consistent techno experience. Minimalist space, uncompromising sound system, raw underground energy.",
        it: "Il sabato di Volt è l'esperienza techno più consistente di Milano. Spazio minimalista, sistema audio senza compromessi, energia underground pura."
      },
      slug: { en: "volt-saturday-techno-20-06-2026", it: "volt-sabato-techno-20-06-2026" }
    },
    image: "/images/venues/volt-club-milano/volt-club-milano-interior-02.webp",
  },

  // ─── GATTOPARDO ────────────────────────────────────────────────────────────
  {
    id: "e-gattopardo-0606",
    venueId: "v-gattopardo",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T22:00:00+02:00",
    endDateISO: "2026-07-05T04:00:00+02:00",
    pricing: { entry: 28, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Saturday at Gattopardo", it: "Sabato al Gattopardo" },
      shortDescription: {
        en: "An exclusive Saturday in Milan's most beautiful ex-church venue. House and dance music under the crystal chandelier. Collar required for men.",
        it: "Un sabato esclusivo nel più bel locale in ex chiesa di Milano. Musica house e dance sotto il lampadario di cristallo. Camicia obbligatoria per gli uomini."
      },
      slug: { en: "gattopardo-saturday-06-06-2026", it: "gattopardo-sabato-06-06-2026" }
    },
    image: "/images/venues/gattopardo/gattopardo-interior-01.webp",
  },
  {
    id: "e-gattopardo-0612",
    venueId: "v-gattopardo",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-11T22:00:00+02:00",
    endDateISO: "2026-07-12T04:00:00+02:00",
    pricing: { entry: 33, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Friday at Gattopardo", it: "Venerdì al Gattopardo" },
      shortDescription: {
        en: "Gattopardo's Friday night. Impeccably dressed crowd, velvet interiors, and house music at Via Piero della Francesca 47. Collar required for men.",
        it: "Il venerdì al Gattopardo. Pubblico impeccabilmente vestito, interni in velluto e musica house in Via Piero della Francesca 47. Camicia obbligatoria."
      },
      slug: { en: "gattopardo-friday-12-06-2026", it: "gattopardo-venerdi-12-06-2026" }
    },
    image: "/images/venues/gattopardo/gattopardo-interior-02.webp",
  },

  // ─── ARMANI PRIVÉ ──────────────────────────────────────────────────────────
  {
    id: "e-armani-mfw-0619",
    venueId: "v-armani-prive",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-17T23:45:00+02:00",
    endDateISO: "2026-07-18T04:00:00+02:00",
    pricing: { entry: 50, currency: "EUR", tableMinSpend: 1000 },
    localizedContent: {
      title: { en: "Armani Privé — Friday Night", it: "Armani Privé — Venerdì Sera" },
      shortDescription: {
        en: "Friday at Armani Privé inside the Armani Hotel on Via Manzoni. The most exclusive door policy in Milan — guestlist or table reservation essential.",
        it: "Venerdì all'Armani Privé nell'Armani Hotel di Via Manzoni. La selezione più esclusiva di Milano — lista o prenotazione tavolo essenziale."
      },
      slug: { en: "armani-prive-mfw-opening-19-06-2026", it: "armani-prive-apertura-mfw-19-06-2026" }
    },
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-armani-mfw-0620",
    venueId: "v-armani-prive",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T23:45:00+02:00",
    endDateISO: "2026-07-19T04:00:00+02:00",
    pricing: { entry: 50, currency: "EUR", tableMinSpend: 1000 },
    localizedContent: {
      title: { en: "Armani Privé — Fashion Week Saturday", it: "Armani Privé — Sabato Fashion Week" },
      shortDescription: {
        en: "Saturday at Armani Privé during Milan Fashion Week. The most exclusive door policy in the city — table reservation or guestlist is the only way in.",
        it: "Sabato all'Armani Privé durante la Milan Fashion Week. La selezione più esclusiva della città — prenotazione tavolo o lista è l'unico accesso."
      },
      slug: { en: "armani-prive-mfw-saturday-20-06-2026", it: "armani-prive-sabato-mfw-20-06-2026" }
    },
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-02.webp",
    isSpecial: true
  },

  // ─── HOLLYWOOD ─────────────────────────────────────────────────────────────
  {
    id: "e-hollywood-0605",
    venueId: "v-hollywood",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-07-03T23:00:00+02:00",
    endDateISO: "2026-07-04T05:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Hollywood — Friday Night", it: "Hollywood — Venerdì Sera" },
      shortDescription: {
        en: "The classic Milanese clubbing experience at the legendary Hollywood on Corso Como 15. Commercial and hip-hop, glamorous crowd from 11 PM.",
        it: "La classica esperienza di clubbing milanese nel leggendario Hollywood di Corso Como 15. Commercial e hip-hop, pubblico glamour dalle 23."
      },
      slug: { en: "hollywood-friday-03-07-2026", it: "hollywood-venerdi-03-07-2026" }
    },
    image: "/images/venues/hollywood/hollywood-interior-01.webp",
  },
  {
    id: "e-hollywood-0606",
    venueId: "v-hollywood",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-07-04T23:00:00+02:00",
    endDateISO: "2026-07-05T05:00:00+02:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Hollywood — Saturday Night", it: "Hollywood — Sabato Sera" },
      shortDescription: {
        en: "Saturday at Hollywood — the iconic Corso Como club has hosted models and celebrities for decades. Guestlist is essential.",
        it: "Il sabato all'Hollywood — il locale iconico di Corso Como ospita modelle e celebrità da decenni. La lista è fondamentale."
      },
      slug: { en: "hollywood-saturday-04-07-2026", it: "hollywood-sabato-04-07-2026" }
    },
    image: "/images/venues/hollywood/hollywood-interior-02.webp",
  },

  // ─── MIB MILANO ────────────────────────────────────────────────────────────
  {
    id: "e-mib-gala-0606",
    venueId: "v-mibmilano",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-04T22:00:00+02:00",
    endDateISO: "2026-07-05T03:00:00+02:00",
    pricing: { entry: 30, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "MIB Milano — Saturday Gala Night", it: "MIB Milano — Gala del Sabato" },
      shortDescription: {
        en: "MIB Milano's exclusive Saturday gala near Piazza Affari. Dinner show, cocktails, and DJ sets from 10 PM.",
        it: "Il gala esclusivo del sabato al MIB Milano vicino a Piazza Affari. Cena spettacolo, cocktail e DJ set dalle 22."
      },
      slug: { en: "mib-gala-saturday-04-07-2026", it: "mib-gala-sabato-04-07-2026" }
    },
    image: "/images/venues/mib-milano/mib-milano-interior-01.webp",
    isSpecial: true
  },
  {
    id: "e-mib-end-school-0608",
    venueId: "v-mibmilano",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-07-06T22:00:00+02:00",
    endDateISO: "2026-07-07T03:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "MIB Milano — Monday Night", it: "MIB Milano — Lunedì Notte" },
      shortDescription: {
        en: "Monday night at MIB Milano. DJ sets, cocktails, and a stylish crowd in this iconic space near Piazza Affari.",
        it: "Lunedì sera al MIB Milano. DJ set, cocktail e pubblico stylish in questo spazio iconico vicino a Piazza Affari."
      },
      slug: { en: "mib-monday-night-06-07-2026", it: "mib-lunedi-notte-06-07-2026" }
    },
    image: "/images/venues/mib-milano/mib-milano-interior-02.webp",
  },

  // ─── THE CLUB MILANO ───────────────────────────────────────────────────────
  {
    id: "e-theclub-girls-republic-0620",
    venueId: "v-theclub",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-07-18T23:30:00+02:00",
    endDateISO: "2026-07-19T05:30:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Girls Republic — Saturday Night", it: "Girls Republic — Sabato Sera" },
      shortDescription: {
        en: "Girls Republic at The Club Milano in Brera. Commercial and hip-hop, 11:30 PM to 5:30 AM at Corso Garibaldi 97.",
        it: "Girls Republic al The Club Milano a Brera. Commercial e hip-hop dalle 23:30 alle 5:30 in Corso Garibaldi 97."
      },
      slug: { en: "girls-republic-theclub-18-07-2026", it: "girls-republic-theclub-18-07-2026" }
    },
    image: "/images/venues/the-club-milano/the-club-milano-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-theclub-superbe-0621",
    venueId: "v-theclub",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-19T23:30:00+02:00",
    endDateISO: "2026-07-20T05:30:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "SUPERBE — Sunday at The Club", it: "SUPERBE — Domenica al The Club" },
      shortDescription: {
        en: "SUPERBE Sunday at The Club Milano, Corso Garibaldi 97. House and commercial music 11:30 PM to 5:30 AM.",
        it: "SUPERBE la domenica al The Club Milano, Corso Garibaldi 97. Musica house e commercial dalle 23:30 alle 5:30."
      },
      slug: { en: "superbe-theclub-19-07-2026", it: "superbe-theclub-19-07-2026" }
    },
    image: "/images/venues/the-club-milano/the-club-milano-interior-02.webp",
  },
  {
    id: "e-theclub-atlanta-0625",
    venueId: "v-theclub",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-06-25T23:30:00+02:00",
    endDateISO: "2026-06-26T05:30:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "ATLANTA — Thursday Night", it: "ATLANTA — Giovedì Notte" },
      shortDescription: {
        en: "ATLANTA Thursday at The Club Milano. Hip-hop and trap music all night from 11:30 PM to 5:30 AM at Corso Garibaldi 97.",
        it: "ATLANTA giovedì al The Club Milano. Musica hip-hop e trap tutta la notte dalle 23:30 alle 5:30 in Corso Garibaldi 97."
      },
      slug: { en: "atlanta-theclub-25-06-2026", it: "atlanta-theclub-25-06-2026" }
    },
    image: "/images/venues/the-club-milano/the-club-milano-interior-03.webp",
  },
  {
    id: "e-theclub-aura-0626",
    venueId: "v-theclub",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-06-26T23:30:00+02:00",
    endDateISO: "2026-06-27T05:30:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "AURA — Friday Night", it: "AURA — Venerdì Notte" },
      shortDescription: {
        en: "AURA Friday at The Club Milano. House and commercial music 11:30 PM to 5:30 AM — the best Friday night in Brera.",
        it: "AURA il venerdì al The Club Milano. Musica house e commercial dalle 23:30 alle 5:30 — il miglior venerdì sera a Brera."
      },
      slug: { en: "aura-theclub-26-06-2026", it: "aura-theclub-26-06-2026" }
    },
    image: "/images/venues/the-club-milano/the-club-milano-interior-04.webp",
  },
  {
    id: "e-theclub-girls-republic-0627",
    venueId: "v-theclub",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-06-27T23:30:00+02:00",
    endDateISO: "2026-06-28T05:30:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Girls Republic — Saturday", it: "Girls Republic — Sabato" },
      shortDescription: {
        en: "Girls Republic returns on Saturday at The Club Milano. Commercial and hip-hop, 11:30 PM to 5:30 AM at Corso Garibaldi 97.",
        it: "Girls Republic torna il sabato al The Club Milano. Commercial e hip-hop dalle 23:30 alle 5:30 in Corso Garibaldi 97."
      },
      slug: { en: "girls-republic-theclub-27-06-2026", it: "girls-republic-theclub-27-06-2026" }
    },
    image: "/images/venues/the-club-milano/the-club-milano-interior-05.webp",
  },

  // ─── CERESIO 7 ─────────────────────────────────────────────────────────────
  {
    id: "e-ceresio-pool-opening-0601",
    venueId: "v-ceresio-7",
    genre: [MusicGenre.HOUSE],
    dateISO: "2026-07-04T18:00:00+02:00",
    endDateISO: "2026-07-04T23:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Twin Pool Saturday — Ceresio 7", it: "Piscine Gemelle Sabato — Ceresio 7" },
      shortDescription: {
        en: "Saturday aperitivo at Ceresio 7's iconic twin rooftop pools. Panoramic terrace at Via Ceresio 7 from 6 PM. Book ahead — tables go fast.",
        it: "Aperitivo del sabato alle iconiche piscine gemelle sul tetto del Ceresio 7. Terrazza panoramica in Via Ceresio 7 dalle 18. Prenota in anticipo."
      },
      slug: { en: "ceresio-pool-saturday-04-07-2026", it: "ceresio-piscine-sabato-04-07-2026" }
    },
    image: "/images/venues/ceresio-7/ceresio-7-interior-01.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-ceresio-poolside-0613",
    venueId: "v-ceresio-7",
    genre: [MusicGenre.HOUSE],
    dateISO: "2026-07-11T18:00:00+02:00",
    endDateISO: "2026-07-11T23:30:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Poolside Aperitivo — Sunset Edition", it: "Aperitivo a Bordo Piscina — Edizione Tramonto" },
      shortDescription: {
        en: "Saturday aperitivo at Ceresio 7's rooftop twin pools. Premium cocktails, DJ sets, and the most spectacular skyline view in Milan.",
        it: "Aperitivo del sabato alle piscine gemelle sul tetto del Ceresio 7. Cocktail premium, DJ set e la vista skyline più spettacolare di Milano."
      },
      slug: { en: "ceresio-poolside-aperitivo-11-07-2026", it: "ceresio-aperitivo-bordo-piscina-11-07-2026" }
    },
    image: "/images/venues/ceresio-7/ceresio-7-interior-02.webp",
    isTrending: true
  },

  // ─── PLAY CLUB ─────────────────────────────────────────────────────────────
  {
    id: "e-playclub-elite-0621",
    venueId: "v-playclub",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-19T22:00:00+02:00",
    endDateISO: "2026-07-20T05:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 200 },
    localizedContent: {
      title: { en: "ELITE Night — Saturday", it: "ELITE Night — Sabato" },
      shortDescription: {
        en: "ELITE night at Play Club Milano at Viale Monte Grappa 14 — a Saturday of class between music and style. House, deep, tech and international selections.",
        it: "Serata ELITE al Play Club Milano in Viale Monte Grappa 14 — un sabato di classe tra musica e stile. Selezioni house, deep, tech e international."
      },
      slug: { en: "elite-playclub-19-07-2026", it: "elite-playclub-19-07-2026" }
    },
    image: "/images/venues/play-club-milano/play-club-milano-interior-01.webp",
  },

  // ─── 55 MILANO ─────────────────────────────────────────────────────────────
  {
    id: "e-55milano-dinner-show-0605",
    venueId: "v-55milano",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-03T20:00:00+02:00",
    endDateISO: "2026-07-04T03:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 200 },
    localizedContent: {
      title: { en: "Dinner Show — Friday at 55 Milano", it: "Dinner Show — Venerdì al 55 Milano" },
      shortDescription: {
        en: "55 Milano's legendary Friday Dinner Show. Over 1,000 sq m of open space plus 600 sq m terrace at Via Piero della Francesca 55. Live entertainment from 8 PM.",
        it: "Il leggendario Dinner Show del venerdì al 55 Milano. Oltre 1.000 mq di spazio aperto più 600 mq di terrazza in Via Piero della Francesca 55. Spettacolo dal vivo dalle 20."
      },
      slug: { en: "dinner-show-friday-55-milano-03-07-2026", it: "dinner-show-venerdi-55-milano-03-07-2026" }
    },
    image: "/images/venues/55-milano/55-milano-interior-01.webp",
  },
  {
    id: "e-55milano-studio55-0606",
    venueId: "v-55milano",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-04T20:00:00+02:00",
    endDateISO: "2026-07-05T03:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 200 },
    localizedContent: {
      title: { en: "Studio 55 — Saturday Night", it: "Studio 55 — Sabato Sera" },
      shortDescription: {
        en: "Studio 55 Saturday at 55 Milano. Aperitivo from 8 PM, DJ sets until 3 AM on the massive Sempione outdoor terrace — 600 sq m under the stars.",
        it: "Studio 55 il sabato al 55 Milano. Aperitivo dalle 20, DJ set fino alle 3 sulla grande terrazza all'aperto di Sempione — 600 mq sotto le stelle."
      },
      slug: { en: "studio-55-saturday-04-07-2026", it: "studio-55-sabato-04-07-2026" }
    },
    image: "/images/venues/55-milano/55-milano-interior-02.webp",
  },

  // ─── REPVBLIC ──────────────────────────────────────────────────────────────
  {
    id: "e-repvblic-dirty-monday-0601",
    venueId: "v-repvblic",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.LIVE_MUSIC],
    dateISO: "2026-07-06T23:00:00+02:00",
    endDateISO: "2026-07-07T04:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Dirty Monday — The Rock'n'Roll Party", it: "Dirty Monday — Il Party Rock'n'Roll" },
      shortDescription: {
        en: "The most insane rock'n'roll party in Milan at Repvblic. Every Monday — dress to express, anything goes.",
        it: "Il party rock'n'roll più sfrenato di Milano al Repvblic. Ogni lunedì — vestiti per esprimerti, tutto è permesso."
      },
      slug: { en: "dirty-monday-repvblic-06-07-2026", it: "dirty-monday-repvblic-06-07-2026" }
    },
    image: "/images/venues/repvblic-milano/repvblic-milano-interior-01.webp",
  },
  {
    id: "e-repvblic-saturday-0606",
    venueId: "v-repvblic",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T22:00:00+02:00",
    endDateISO: "2026-07-05T04:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Repvblic — Saturday Night", it: "Repvblic — Sabato Notte" },
      shortDescription: {
        en: "National and international DJs at Repvblic for the Saturday night. Industrial-chic space, immersive lighting, high energy from 10 PM.",
        it: "DJ nazionali e internazionali al Repvblic per la notte del sabato. Spazio industrial-chic, illuminazione immersiva, alta energia dalle 22."
      },
      slug: { en: "repvblic-saturday-04-07-2026", it: "repvblic-sabato-04-07-2026" }
    },
    image: "/images/venues/repvblic-milano/repvblic-milano-interior-02.webp",
  },

  // ─── 11 CLUBROOM ───────────────────────────────────────────────────────────
  {
    id: "e-11clubroom-saturday-0606",
    venueId: "v-11clubroom",
    genre: [MusicGenre.HIP_HOP, MusicGenre.REGGAETON],
    dateISO: "2026-07-04T22:00:00+02:00",
    endDateISO: "2026-07-05T04:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Saturday Night at 11 Clubroom", it: "Sabato all'11 Clubroom" },
      shortDescription: {
        en: "An intimate and elite Saturday in Corso Como at 11 Clubroom, Via de Tocqueville 11. Hip-hop, dance and reggaeton in a sophisticated urban setting.",
        it: "Una serata sabato intima ed esclusiva in Corso Como all'11 Clubroom, Via de Tocqueville 11. Hip-hop, dance e reggaeton in un contesto urbano sofisticato."
      },
      slug: { en: "11clubroom-saturday-04-07-2026", it: "11clubroom-sabato-04-07-2026" }
    },
    image: "/images/venues/11-clubroom/11-clubroom-interior-01.webp",
  },
  {
    id: "e-11clubroom-saturday-0620",
    venueId: "v-11clubroom",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T22:00:00+02:00",
    endDateISO: "2026-07-19T04:00:00+02:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "11 Clubroom — Saturday Night", it: "11 Clubroom — Sabato Sera" },
      shortDescription: {
        en: "Saturday at 11 Clubroom. The intimate Corso Como clubroom at its most exclusive — crystal chandeliers, leather couches, VIP atmosphere.",
        it: "Sabato all'11 Clubroom. Il clubroom intimo di Corso Como al suo massimo di esclusività — lampadari di cristallo, divani in pelle, atmosfera VIP."
      },
      slug: { en: "11clubroom-saturday-18-07-2026", it: "11clubroom-sabato-18-07-2026" }
    },
    image: "/images/venues/11-clubroom/11-clubroom-interior-02.webp",
    isTrending: true
  },

  // ─── CHURCH 81 ─────────────────────────────────────────────────────────────
  {
    id: "e-church81-friday-0605",
    venueId: "v-church81",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-03T20:00:00+02:00",
    endDateISO: "2026-07-04T02:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Friday Dinner Show at Church 81", it: "Dinner Show del Venerdì a Church 81" },
      shortDescription: {
        en: "The Friday dinner show with DJ at Church 81's stunning deconsecrated space, Via della Chiesa Rossa 81. Dinner and dancing from 8 PM.",
        it: "La cena spettacolo con DJ del venerdì nello splendido spazio sconsacrato di Church 81, Via della Chiesa Rossa 81. Cena e ballo dalle 20."
      },
      slug: { en: "church81-friday-dinner-show-03-07-2026", it: "church81-dinner-show-venerdi-03-07-2026" }
    },
    image: "/images/venues/church-81/church-81-interior-01.webp",
  },
  {
    id: "e-church81-saturday-0606",
    venueId: "v-church81",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T20:00:00+02:00",
    endDateISO: "2026-07-05T02:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Saturday Dinner Show at Church 81", it: "Dinner Show del Sabato a Church 81" },
      shortDescription: {
        en: "Saturday dinner show with DJ at Church 81. Unique atmosphere in a converted church space along the Navigli. Reservation recommended.",
        it: "Cena spettacolo con DJ del sabato a Church 81. Atmosfera unica in uno spazio ex chiesa lungo i Navigli. Prenotazione consigliata."
      },
      slug: { en: "church81-saturday-dinner-show-04-07-2026", it: "church81-dinner-show-sabato-04-07-2026" }
    },
    image: "/images/venues/church-81/church-81-interior-02.webp",
  },

  // ─── TERRAZZA DUOMO 21 ─────────────────────────────────────────────────────
  {
    id: "e-terrazza21-aperitivo-0606",
    venueId: "v-terrazza21",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T18:00:00+02:00",
    endDateISO: "2026-07-05T00:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Sunset Aperitivo with Duomo Views", it: "Aperitivo al Tramonto con Vista Duomo" },
      shortDescription: {
        en: "The most iconic aperitivo in Milan — overlooking the Duomo's Gothic spires from a 19th-century palazzo terrace at Piazza del Duomo 21. DJ set at dusk.",
        it: "L'aperitivo più iconico di Milano — affacciati sulle guglie gotiche del Duomo dalla terrazza del palazzo ottocentesco in Piazza del Duomo 21. DJ set al tramonto."
      },
      slug: { en: "terrazza21-sunset-aperitivo-04-07-2026", it: "terrazza21-aperitivo-tramonto-04-07-2026" }
    },
    image: "/images/venues/terrazza-21/terrazza-21-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-terrazza21-aperitivo-0620",
    venueId: "v-terrazza21",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T18:00:00+02:00",
    endDateISO: "2026-07-19T00:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Summer Aperitivo at Terrazza Duomo 21", it: "Aperitivo Estivo alla Terrazza Duomo 21" },
      shortDescription: {
        en: "Summer aperitivo on Milan's most iconic terrace facing the Duomo. Cocktails, DJ set at dusk, and a view of the Gothic spires that never gets old.",
        it: "Aperitivo estivo sulla terrazza più iconica di Milano affacciata sul Duomo. Cocktail, DJ set al tramonto e una vista sulle guglie gotiche che non stanca mai."
      },
      slug: { en: "terrazza21-summer-aperitivo-18-07-2026", it: "terrazza21-aperitivo-estivo-18-07-2026" }
    },
    image: "/images/venues/terrazza-21/terrazza-21-interior-02.webp",
    isSpecial: true
  },

  // ─── VOYA ROOFTOP ──────────────────────────────────────────────────────────
  {
    id: "e-voya-saturday-dj-0607",
    venueId: "v-voya",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-05T19:30:00+02:00",
    endDateISO: "2026-07-06T02:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Rooftop DJ Night — 20th Floor", it: "Rooftop DJ Night — 20° Piano" },
      shortDescription: {
        en: "Voya Rooftop's summer DJ night at 85 metres above Milan. Cocktails, panoramic views, and live entertainment at Viale Achille Papa 30.",
        it: "Il DJ night estivo al Voya Rooftop a 85 metri sopra Milano. Cocktail, viste panoramiche e intrattenimento live in Viale Achille Papa 30."
      },
      slug: { en: "voya-rooftop-dj-night-05-07-2026", it: "voya-rooftop-dj-night-05-07-2026" }
    },
    image: "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp",
    isTrending: true
  },
  {
    id: "e-voya-saturday-dj-0620",
    venueId: "v-voya",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T19:30:00+02:00",
    endDateISO: "2026-07-19T02:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Voya Rooftop — Saturday Night", it: "Voya Rooftop — Sabato Sera" },
      shortDescription: {
        en: "Saturday at Voya Rooftop. Milan's most glamorous crowd 85 metres above the city for cocktails and DJ sets with a 360° skyline view.",
        it: "Sabato al Voya Rooftop. Il pubblico più glamour di Milano a 85 metri sopra la città per cocktail e DJ set con vista a 360°."
      },
      slug: { en: "voya-rooftop-saturday-18-07-2026", it: "voya-rooftop-sabato-18-07-2026" }
    },
    image: "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp",
    isSpecial: true
  },

  // ─── APOLLO CLUB ───────────────────────────────────────────────────────────
  {
    id: "e-apollo-friday-0605",
    venueId: "v-apollo",
    genre: [MusicGenre.INDIE, MusicGenre.HOUSE],
    dateISO: "2026-07-03T22:00:00+02:00",
    endDateISO: "2026-07-04T04:00:00+02:00",
    pricing: { entry: 10, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Apollo — Friday Night Navigli", it: "Apollo — Venerdì Sera ai Navigli" },
      shortDescription: {
        en: "Apollo's Friday night in the Navigli district. Indie and house music in the retro-design cocktail bar and club at Via Giosue Borsi 9.",
        it: "Il venerdì sera di Apollo nel quartiere Navigli. Musica indie e house nel cocktail bar e club dal design retrò in Via Giosue Borsi 9."
      },
      slug: { en: "apollo-friday-navigli-03-07-2026", it: "apollo-venerdi-navigli-03-07-2026" }
    },
    image: "/images/venues/apollo-milano/apollo-milano-interior-01.webp",
  },

  // ─── JULY 2026 ─────────────────────────────────────────────────────────────
  {
    id: "e-justme-summer-closing-0704",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T23:30:00+02:00",
    endDateISO: "2026-07-05T05:00:00+02:00",
    pricing: { entry: 40, currency: "EUR", tableMinSpend: 600 },
    localizedContent: {
      title: { en: "Summer Nights — Independence Day Special", it: "Summer Nights — Special 4 Luglio" },
      shortDescription: {
        en: "Just Me Milano hosts an exclusive 4th of July special with international DJs and a curated summer playlist. Limited VIP tables.",
        it: "Just Me Milano ospita uno speciale 4 luglio con DJ internazionali e una playlist estiva selezionata. Tavoli VIP limitati."
      },
      slug: { en: "summer-nights-independence-day-justme-04-07-2026", it: "summer-nights-4-luglio-justme-04-07-2026" }
    },
    image: "/images/venues/just-me-milano/just-me-milano-interior-04.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-pineta-perreo-0704",
    venueId: "v-pineta",
    genre: [MusicGenre.REGGAETON, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-04T19:30:00+02:00",
    endDateISO: "2026-07-05T03:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: { en: "Noche De Perreo — Summer Edition", it: "Noche De Perreo — Summer Edition" },
      shortDescription: {
        en: "The legendary Pineta reggaeton night returns for summer. Aperitivo buffet from 7:30 PM. The hottest Latin party in Milan.",
        it: "La leggendaria serata reggaeton di Pineta torna per l'estate. Aperitivo buffet dalle 19:30. Il party Latin più caldo di Milano."
      },
      slug: { en: "noche-de-perreo-summer-pineta-04-07-2026", it: "noche-de-perreo-estate-pineta-04-07-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-05.webp",
    isTrending: true
  },
  {
    id: "e-volt-techno-0710",
    venueId: "v-volt",
    genre: [MusicGenre.TECHNO, MusicGenre.HOUSE],
    dateISO: "2026-07-10T23:45:00+02:00",
    endDateISO: "2026-07-11T06:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Volt Summer Techno — Special Edition", it: "Volt Summer Techno — Edizione Speciale" },
      shortDescription: {
        en: "Volt Club brings a special summer techno night with extended set times until 6 AM. Pure underground energy in the heart of Milan.",
        it: "Volt Club porta una speciale serata techno estiva con orari estesi fino alle 6:00. Energia underground pura nel cuore di Milano."
      },
      slug: { en: "volt-summer-techno-special-10-07-2026", it: "volt-estate-techno-speciale-10-07-2026" }
    },
    image: "/images/venues/volt-club-milano/volt-club-milano-interior-03.webp",
    isSpecial: true
  },
  {
    id: "e-voya-rooftop-0711",
    venueId: "v-voya",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-11T19:00:00+02:00",
    endDateISO: "2026-07-11T23:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Voya Summer Sunset — July", it: "Voya Summer Sunset — Luglio" },
      shortDescription: {
        en: "Voya Rooftop's iconic summer sunset aperitivo with panoramic views of Milan. Cocktails, DJ set and the best skyline in the city.",
        it: "L'iconico aperitivo al tramonto estivo di Voya Rooftop con vista panoramica su Milano. Cocktail, DJ set e il miglior skyline della città."
      },
      slug: { en: "voya-summer-sunset-july-11-07-2026", it: "voya-estate-tramonto-luglio-11-07-2026" }
    },
    image: "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp",
    isTrending: true
  },
  {
    id: "e-playclub-summer-0717",
    venueId: "v-playclub",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-17T23:00:00+02:00",
    endDateISO: "2026-07-18T04:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: 200 },
    localizedContent: {
      title: { en: "Play Club — Summer Hip-Hop Night", it: "Play Club — Notte Hip-Hop Estiva" },
      shortDescription: {
        en: "Play Club brings Milan's biggest hip-hop and commercial summer night. DJ resident + surprise guest. Guestlist available via WhatsApp.",
        it: "Play Club porta la più grande notte hip-hop e commercial estiva di Milano. DJ resident + ospite sorpresa. Guestlist disponibile via WhatsApp."
      },
      slug: { en: "play-club-summer-hiphop-17-07-2026", it: "play-club-estate-hiphop-17-07-2026" }
    },
    image: "/images/venues/play-club-milano/play-club-milano-interior-02.webp",
  },
  {
    id: "e-justme-0718",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-07-18T23:30:00+02:00",
    endDateISO: "2026-07-19T05:00:00+02:00",
    pricing: { entry: 35, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Just Me Milano — Saturday Night Luxury", it: "Just Me Milano — Lusso del Sabato Sera" },
      shortDescription: {
        en: "Saturday luxury night at Just Me Milano. Fashion crowd, international DJs, exclusive atmosphere under Torre Branca. Book your VIP table early.",
        it: "Sabato sera di lusso al Just Me Milano. Crowd fashion, DJ internazionali, atmosfera esclusiva sotto Torre Branca. Prenota il tuo tavolo VIP in anticipo."
      },
      slug: { en: "just-me-saturday-luxury-18-07-2026", it: "just-me-sabato-lusso-18-07-2026" }
    },
    image: "/images/venues/just-me-milano/just-me-milano-interior-05.webp",
    isTrending: true
  },
  {
    id: "e-magazzini-techno-0719",
    venueId: "v-magazzini",
    genre: [MusicGenre.TECHNO, MusicGenre.HOUSE],
    dateISO: "2026-07-19T23:00:00+02:00",
    endDateISO: "2026-07-20T06:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Magazzini Generali — Summer Rave", it: "Magazzini Generali — Summer Rave" },
      shortDescription: {
        en: "The historic Magazzini Generali hosts a summer techno marathon with international DJs and two dancefloors. An unmissable night for electronic music lovers.",
        it: "Lo storico Magazzini Generali ospita un marathon techno estivo con DJ internazionali e due dancefloor. Una notte imperdibile per gli amanti della musica elettronica."
      },
      slug: { en: "magazzini-generali-summer-rave-19-07-2026", it: "magazzini-generali-summer-rave-19-07-2026" }
    },
    image: "/images/venues/magazzini-generali/magazzini-generali-interior-05.webp",
    isSpecial: true
  },
  {
    id: "e-ceresio-aperitivo-0725",
    venueId: "v-ceresio-7",
    genre: [MusicGenre.HOUSE],
    dateISO: "2026-07-25T19:00:00+02:00",
    endDateISO: "2026-07-25T23:00:00+02:00",
    pricing: { entry: 0, currency: "EUR", tableMinSpend: null },
    localizedContent: {
      title: { en: "Ceresio 7 — Summer Rooftop Aperitivo", it: "Ceresio 7 — Aperitivo Estivo in Rooftop" },
      shortDescription: {
        en: "Ceresio 7's iconic summer rooftop aperitivo. Cocktails by the pool with a panoramic view of Milan and a curated DJ set.",
        it: "L'iconico aperitivo estivo sul rooftop di Ceresio 7. Cocktail a bordo piscina con vista panoramica su Milano e un DJ set curato."
      },
      slug: { en: "ceresio-7-summer-rooftop-aperitivo-25-07-2026", it: "ceresio-7-aperitivo-estivo-rooftop-25-07-2026" }
    },
    image: "/images/venues/ceresio-7/ceresio-7-interior-03.webp",
  },
  {
    id: "e-pineta-summer-closing-0726",
    venueId: "v-pineta",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-07-26T19:30:00+02:00",
    endDateISO: "2026-07-27T03:00:00+02:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 350 },
    localizedContent: {
      title: { en: "Pineta — Summer Saturday Special", it: "Pineta — Sabato Speciale Estivo" },
      shortDescription: {
        en: "Pineta Club's signature summer Saturday: aperitivo buffet, singing along, commercial and house music until 3 AM. The quintessential Milan night out.",
        it: "Il sabato estivo signature di Pineta Club: aperitivo buffet, cori, musica commercial e house fino alle 3:00. La classica serata milanese."
      },
      slug: { en: "pineta-summer-saturday-special-26-07-2026", it: "pineta-sabato-speciale-estivo-26-07-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-06.webp",
    isTrending: true
  },

  // ─── AUGUST 2026 ───────────────────────────────────────────────────────────
  {
    id: "e-justme-ferragosto-0814",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-08-14T23:30:00+02:00",
    endDateISO: "2026-08-15T05:00:00+02:00",
    pricing: { entry: 50, currency: "EUR", tableMinSpend: 700 },
    localizedContent: {
      title: { en: "Ferragosto Luxury Night at Just Me", it: "Notte di Ferragosto al Just Me" },
      shortDescription: {
        en: "The most exclusive Ferragosto party in Milan. Just Me Milano celebrates August 15th with a special luxury night under Torre Branca. Limited capacity.",
        it: "Il party di Ferragosto più esclusivo di Milano. Just Me Milano celebra il 15 agosto con una notte di lusso speciale sotto Torre Branca. Capacità limitata."
      },
      slug: { en: "ferragosto-luxury-night-just-me-14-08-2026", it: "notte-ferragosto-just-me-14-08-2026" }
    },
    image: "/images/venues/just-me-milano/just-me-milano-interior-06.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-volt-ferragosto-0814",
    venueId: "v-volt",
    genre: [MusicGenre.TECHNO, MusicGenre.HOUSE],
    dateISO: "2026-08-14T23:45:00+02:00",
    endDateISO: "2026-08-15T07:00:00+02:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Volt Ferragosto — All Night Marathon", it: "Volt Ferragosto — Marathon Tutta la Notte" },
      shortDescription: {
        en: "Volt's legendary Ferragosto techno marathon: 7 hours of underground music, 3 international DJs, no sleep required.",
        it: "La leggendaria marathon techno di Ferragosto di Volt: 7 ore di musica underground, 3 DJ internazionali, nessun sonno richiesto."
      },
      slug: { en: "volt-ferragosto-techno-marathon-14-08-2026", it: "volt-ferragosto-marathon-techno-14-08-2026" }
    },
    image: "/images/venues/volt-club-milano/volt-club-milano-interior-04.webp",
    isSpecial: true
  },
  {
    id: "e-pineta-ferragosto-0815",
    venueId: "v-pineta",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.REGGAETON],
    dateISO: "2026-08-15T19:30:00+02:00",
    endDateISO: "2026-08-16T03:00:00+02:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 400 },
    localizedContent: {
      title: { en: "Pineta Ferragosto — Aperitivo & Club Night", it: "Pineta Ferragosto — Aperitivo e Club Night" },
      shortDescription: {
        en: "Pineta Club's unmissable Ferragosto celebration: legendary singing aperitivo from 7:30 PM followed by an all-night party.",
        it: "La celebrazione di Ferragosto imperdibile di Pineta Club: leggendario aperitivo cantato dalle 19:30 seguito da un party notturno."
      },
      slug: { en: "pineta-ferragosto-aperitivo-club-15-08-2026", it: "pineta-ferragosto-aperitivo-club-15-08-2026" }
    },
    image: "/images/venues/pineta-milano/pineta-milano-interior-07.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-playclub-summer-end-0822",
    venueId: "v-playclub",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-08-22T23:00:00+02:00",
    endDateISO: "2026-08-23T04:00:00+02:00",
    pricing: { entry: 15, currency: "EUR", tableMinSpend: 200 },
    localizedContent: {
      title: { en: "Play Club — End of Summer Party", it: "Play Club — Fine Estate Party" },
      shortDescription: {
        en: "Play Club closes summer 2026 with a massive end-of-season party. Hip-hop, commercial, and special guests. Milan's last big night before September.",
        it: "Play Club chiude l'estate 2026 con un enorme party di fine stagione. Hip-hop, commercial e ospiti speciali. L'ultima grande notte di Milano prima di settembre."
      },
      slug: { en: "play-club-end-of-summer-22-08-2026", it: "play-club-fine-estate-22-08-2026" }
    },
    image: "/images/venues/play-club-milano/play-club-milano-interior-03.webp",
    isTrending: true
  },
  {
    id: "e-armani-prive-0829",
    venueId: "v-armani-prive",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-08-29T23:30:00+02:00",
    endDateISO: "2026-08-30T05:00:00+02:00",
    pricing: { entry: 60, currency: "EUR", tableMinSpend: 1000 },
    localizedContent: {
      title: { en: "Armani Privé — Late Summer Gala", it: "Armani Privé — Gala di Fine Estate" },
      shortDescription: {
        en: "Armani Privé opens its doors for an exclusive late summer gala. The season's last luxury night in the fashion district. Black tie preferred.",
        it: "Armani Privé apre le sue porte per un esclusivo gala di fine estate. L'ultima notte di lusso della stagione nel quadrilatero della moda. Black tie preferito."
      },
      slug: { en: "armani-prive-late-summer-gala-29-08-2026", it: "armani-prive-gala-fine-estate-29-08-2026" }
    },
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-03.webp",
    isSpecial: true,
    isTrending: true
  }
];

// Helper functions to simulate DB queries
export const getVenues = (): Venue[] => {
  return [...mockVenues].sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    return a.localizedContent.name.en.localeCompare(b.localizedContent.name.en);
  });
};

export const getEvents = (): Event[] => {
  return [...mockEvents].sort((a, b) => {
    const venueA = getVenueById(a.venueId);
    const venueB = getVenueById(b.venueId);
    const scoreA = venueA?.priorityScore || 0;
    const scoreB = venueB?.priorityScore || 0;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
  });
};

export const getEventBySlug = (slug: string, lang: string): Event | undefined => {
  return mockEvents.find(e => 
    (lang === 'it' && e.localizedContent.slug.it === slug) || 
    e.localizedContent.slug.en === slug
  );
};

export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(v => v.id === id);
};

export const getPerformerById = (id: string): Performer | undefined => {
  return mockPerformers.find(p => p.id === id);
};

export const getVenueBySlug = (slug: string, lang: string): Venue | undefined => {
  return mockVenues.find(v => 
    (lang === 'it' && v.slugs.it === slug) || 
    v.slugs.en === slug
  );
};

export const getEventsByVenueId = (venueId: string): Event[] => {
  return mockEvents.filter(e => e.venueId === venueId);
};

// Mock Data for Guides
export const mockGuides: Guide[] = [
  {
    id: "g-dress-code",
    slugs: { en: "ultimate-dress-code-guide-milan-clubs", it: "guida-definitiva-dress-code-club-milano" },
    title: { en: "The Ultimate Dress Code Guide for Milan Clubs", it: "La Guida Definitiva al Dress Code per i Club di Milano" },
    excerpt: {
      en: "Milan is the fashion capital. Don't get bounced at the door. Here is exactly what to wear to get into the most exclusive venues.",
      it: "Milano è la capitale della moda. Non farti rimbalzare all'ingresso. Ecco esattamente cosa indossare per entrare nei locali più esclusivi."
    },
    author: "Nightlife Milan Team",
    datePublished: "2026-01-10T08:00:00Z",
    dateModified: "2026-02-15T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp",
    sections: [
      {
        id: "the-golden-rule",
        heading: { en: "The Golden Rule: Effortless Elegance", it: "La Regola d'Oro: Eleganza Senza Sforzo" },
        content: {
          en: "<p>In Milan, trying too hard is a faux pas. The goal is to look incredibly stylish but as if you just threw the outfit together in five minutes.</p>",
          it: "<p>A Milano, sforzarsi troppo è un passo falso. L'obiettivo è sembrare incredibilmente eleganti ma come se avessi messo insieme l'outfit in cinque minuti.</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Can I wear sneakers to a club in Milan?", it: "Posso indossare le sneakers in un club a Milano?" },
        answer: { 
          en: "It depends. Designer sneakers (like Balenciaga or clean Common Projects) are often accepted in commercial clubs. For underground techno clubs, dark sneakers are mandatory. For luxury venues like Justme, avoid them entirely.", 
          it: "Dipende. Le sneakers di design sono spesso accettate nei club commerciali. Per i club techno underground, le sneakers scure sono obbligatorie. Per i locali di lusso come Justme, evitale del tutto." 
        }
      }
    ]
  },
  {
    id: "g-secret-bars",
    slugs: { en: "hidden-speakeasies-navigli", it: "speakeasy-nascosti-navigli" },
    title: { en: "Hidden Speakeasies of Navigli", it: "Speakeasy Nascosti di Navigli" },
    excerpt: {
      en: "Discover the secret passwords and hidden entrances to Milan's most exclusive underground cocktail bars.",
      it: "Scopri le password segrete e gli ingressi nascosti ai bar cocktail underground più esclusivi di Milano."
    },
    author: "Nightlife Milan Team",
    datePublished: "2026-01-20T08:00:00Z",
    dateModified: "2026-02-01T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-05.webp",
    sections: [
      {
        id: "navigli-secrets",
        heading: { en: "The Secret Scene Behind the Canals", it: "La Scena Segreta Dietro i Navigli" },
        content: {
          en: "<p>Hidden behind unmarked doors and vintage storefronts, Navigli's speakeasies reward the curious. Look for the brass plaque, the bookshelf door, or the laundromat that never seems to do laundry.</p>",
          it: "<p>Nascosti dietro porte non segnalate e vetrine vintage, gli speakeasy di Navigli premiano i curiosi. Cercate la targa in ottone, la porta libreria, o la lavanderia che non sembra mai fare il bucato.</p>"
        }
      }
    ]
  },
  {
    id: "g-vip-tables",
    slugs: { en: "how-to-book-vip-table", it: "come-prenotare-tavolo-vip" },
    title: { en: "How to Book a VIP Table Like a Local", it: "Come Prenotare un Tavolo VIP Come un Locale" },
    excerpt: {
      en: "Navigate the complex world of minimum spends, bottle service, and securing the best table in the club.",
      it: "Naviga il complesso mondo dei minimi di spesa, del bottle service e come assicurarti il tavolo migliore del club."
    },
    author: "Nightlife Milan Team",
    datePublished: "2026-02-01T08:00:00Z",
    dateModified: "2026-02-20T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-06.webp",
    sections: [
      {
        id: "table-booking-basics",
        heading: { en: "Understanding Milan's Table Booking System", it: "Capire il Sistema di Prenotazione Tavoli a Milano" },
        content: {
          en: "<p>Booking a VIP table in Milan's top clubs requires knowing the unwritten rules of bottle service, minimum spend, and group size expectations. A WhatsApp message to the right concierge is worth more than any online form.</p>",
          it: "<p>Prenotare un tavolo VIP nei migliori club di Milano richiede di conoscere le regole non scritte del bottle service, spesa minima e dimensione del gruppo. Un messaggio WhatsApp al concierge giusto vale più di qualsiasi modulo online.</p>"
        }
      }
    ]
  },
  {
    id: "g-dj-interview",
    slugs: { en: "interview-sound-of-milan", it: "intervista-sound-of-milan" },
    title: { en: "Interview: The Sound of Milan", it: "Intervista: Il Suono di Milano" },
    excerpt: {
      en: "A conversation with the resident DJs shaping the acoustic architecture of the city's top venues.",
      it: "Una conversazione con i DJ resident che plasmano l'architettura acustica dei migliori locali della città."
    },
    author: "Editorial Team",
    datePublished: "2026-03-01T08:00:00Z",
    dateModified: "2026-03-10T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-07.webp",
    sections: [
      {
        id: "sound-architecture",
        heading: { en: "When Music Becomes Architecture", it: "Quando la Musica Diventa Architettura" },
        content: {
          en: "<p>Milan's top DJs don't just play music — they engineer emotional journeys through sound, light, and space. We spoke with four resident selectors about their craft and the city's evolving sonic identity.</p>",
          it: "<p>I migliori DJ di Milano non si limitano a suonare musica — ingegnerizzano percorsi emotivi attraverso suono, luce e spazio. Abbiamo parlato con quattro DJ resident del loro mestiere e dell'identità sonora in evoluzione della città.</p>"
        }
      }
    ]
  },
  {
    id: "g-techno-2026",
    slugs: { en: "where-to-find-best-techno-2026", it: "dove-trovare-migliore-techno-2026" },
    title: { en: "Where to find the best Techno in 2026", it: "Dove trovare la migliore Techno nel 2026" },
    excerpt: {
      en: "The underground scene is shifting. Discover the new warehouses and hidden basements dominating the 2026 techno landscape.",
      it: "La scena underground sta cambiando. Scopri i nuovi magazzini e gli scantinati nascosti che dominano il panorama techno del 2026."
    },
    author: "Underground Editor",
    datePublished: "2026-03-01T08:00:00Z",
    dateModified: "2026-03-05T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp",
    relatedGenres: [MusicGenre.TECHNO],
    sections: [
      {
        id: "the-new-wave",
        heading: { en: "The New Wave of Industrial Spaces", it: "La Nuova Onda degli Spazi Industriali" },
        content: {
          en: "<p>This year, the focus has moved away from traditional clubs towards raw, untreated industrial spaces on the outskirts of the city.</p>",
          it: "<p>Quest'anno, l'attenzione si è spostata dai club tradizionali verso spazi industriali grezzi e non trattati alla periferia della città.</p>"
        }
      }
    ]
  }
];

export const getGuideBySlug = (slug: string, lang: string): Guide | undefined => {
  return mockGuides.find(g => 
    (lang === 'it' && g.slugs.it === slug) || 
    g.slugs.en === slug
  );
};

export const getEventsByGenres = (genres: MusicGenre[]): Event[] => {
  if (!genres || genres.length === 0) return [];
  return mockEvents.filter(e => e.genre.some(g => genres.includes(g)));
};
