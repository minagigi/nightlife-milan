import { Event, Venue, Performer, MusicGenre, MilanZone, VenueCategory, Guide, Zone } from '@/lib/types';
import { MOCK_EVENT_I18N } from '@/lib/mockEventI18n';
import { GUIDE_I18N } from '@/lib/guideI18n.generated';

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
  },
  {
    id: MilanZone.SEMPIONE,
    name: 'Parco Sempione & Torre Branca',
    vibe: 'Iconic Garden Clubs & Luxury Tower',
    description: {
      en: 'Milan\'s green monumental heart between Castello Sforzesco and Arco della Pace. Home to #1 Priority club Just Me Milano beneath the illuminated Torre Branca and historic garden clubs with open-air summer and heated winter domes.',
      it: 'Il cuore monumentale nel verde tra il Castello Sforzesco e l\'Arco della Pace. Casa del club Priorità #1 Just Me Milano sotto la Torre Branca illuminata e dei grandi club nel parco con giardino estivo e cupole riscaldate in inverno.'
    },
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    stats: '3 Mega-Clubs, 8 Lounges',
    slug: 'parco-sempione',
    tags: ['#JustMe', '#TorreBranca', '#LuxuryClub', '#VIPTables'],
    metaTitle: {
      en: 'Parco Sempione Nightlife & Just Me Club | Milan Guide 2026/2027',
      it: 'Vita Notturna Parco Sempione & Just Me | Guida Milano 2026/2027'
    },
    metaDescription: {
      en: 'Explore Parco Sempione nightlife: Just Me Milano under Torre Branca, VIP tables from €350, Royal Aperitivo with panoramic elevator, and open-air garden clubs.',
      it: 'Scopri la vita notturna a Parco Sempione: Just Me Milano sotto la Torre Branca, tavoli VIP da 350€, Royal Aperitivo con salita panoramica e club nel verde.'
    }
  },
  {
    id: MilanZone.CENTRO_STORICO,
    name: 'Duomo, San Babila & Quadrilatero',
    vibe: 'Haute Couture, Rooftops & Five-Star Lounges',
    description: {
      en: 'The golden triangle of Milanese high fashion and panoramic terraces. Sip sunset cocktails at eye level with the Cathedral spires at Terrazza Duomo 21 or MIB, then dance inside Armani/Privé on Via Pisoni.',
      it: 'Il triangolo d\'oro dell\'alta moda milanese e delle terrazze panoramiche. Sorseggia un cocktail all\'altezza delle guglie alla Terrazza Duomo 21 o al MIB, poi balla nel tempio sartoriale di Armani/Privé in Via Pisoni.'
    },
    image: '/images/terrazza-duomo-21.webp',
    stats: '6 Rooftops, 4 Luxury Clubs',
    slug: 'duomo-san-babila',
    tags: ['#DuomoView', '#FashionDistrict', '#Rooftop', '#HauteCouture'],
    metaTitle: {
      en: 'Duomo, San Babila & Fashion District Clubs | Milan Nightlife 2026/2027',
      it: 'Locali Duomo, San Babila & Quadrilatero della Moda | Guida 2026/2027'
    },
    metaDescription: {
      en: 'Discover the best rooftop bars overlooking the Duomo and luxury clubs in Milan\'s Fashion Quadrilatero: Terrazza Duomo 21, Armani/Privé, MIB Milano.',
      it: 'Scopri i migliori rooftop vista Duomo e i club di lusso nel Quadrilatero della Moda a Milano: Terrazza Duomo 21, Armani/Privé, MIB Milano.'
    }
  },
  {
    id: MilanZone.CITY_LIFE,
    name: 'CityLife, Portello & Sempione Nord',
    vibe: 'Skyline Rooftops & Dinner Show Institutions',
    description: {
      en: 'Futuristic towers meet historic converted tram depots along Via Piero della Francesca. Home to #4 Priority 55 Milano (1,000 sqm Apericena & Dinner Show), #5 Priority Voya Rooftop (20th floor skyline lounge), and Gattopardo.',
      it: 'I grattacieli futuristici incontrano gli storici depositi di Via Piero della Francesca. Casa del #4 Priorità 55 Milano (1.000 mq di Apericena e Dinner Show), del #5 Priorità Voya Rooftop (20° piano vista skyline) e del Gattopardo.'
    },
    image: '/images/voya-rooftop-milan.webp',
    stats: '5 Clubs, 4 Sky Lounges',
    slug: 'citylife-portello',
    tags: ['#VoyaRooftop', '#55Milano', '#Gattopardo', '#DinnerShow'],
    metaTitle: {
      en: 'CityLife, Portello & Piero della Francesca Nightlife | Milan 2026/2027',
      it: 'Locali CityLife, Portello e Via Piero della Francesca | Guida 2026/2027'
    },
    metaDescription: {
      en: 'Guide to CityLife, Portello and Via Piero della Francesca nightlife: Voya Rooftop 20th floor, 55 Milano XXL Apericena & Dinner Show, and Gattopardo.',
      it: 'Guida ai locali di CityLife, Portello e Via Piero della Francesca: Voya Rooftop al 20° piano, 55 Milano Apericena XL & Dinner Show e Gattopardo.'
    }
  },
  {
    id: MilanZone.TORTONA,
    name: 'San Siro, Ippodromo & Tortona',
    vibe: 'Inter & AC Milan Post-Match Clubs, Concert Afterparties & Design',
    description: {
      en: 'Home to the legendary Giuseppe Meazza San Siro Stadium (Inter & AC Milan), Ippodromo Snai, and the Tortona design district. Centered around #3 Priority Aria Club Milano on Piazzale dello Sport 14—literally 150 meters on foot from the stadium gates—it is the #1 destination in Milan for Serie A, UEFA Champions League, Derby della Madonnina, Coppa Italia, and stadium concert afterparties.',
      it: 'Il distretto dello Stadio Giuseppe Meazza di San Siro (Inter e Milan), dell\'Ippodromo Snai e degli showroom di Zona Tortona. Ruota attorno al #3 Priorità Aria Club Milano in Piazzale dello Sport 14—letteralmente a 150 metri a piedi dai cancelli dello stadio—meta n°1 a Milano per il terzo tempo dopo le partite di Serie A, UEFA Champions League, Derby della Madonnina, Coppa Italia e grandi concerti.'
    },
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    stats: '4 Clubs, 10 Cocktail Lounges',
    slug: 'san-siro',
    tags: ['#AriaClub150m', '#SanSiroAfterparty', '#InterMilanPostMatch', '#ChampionsLeagueNight'],
    metaTitle: {
      en: 'San Siro Nightlife & Football Afterparties (Inter & AC Milan) | Aria Club 150m Away 2026/2027',
      it: 'Locali San Siro e Dopo-Partita Inter & Milan | Aria Club a 150m dallo Stadio 2026/2027'
    },
    metaDescription: {
      en: 'Where to party after an Inter or AC Milan match or concert at San Siro: Aria Club Milano (150m from the gates on Piazzale dello Sport 14), Voya Rooftop, 55 Milano & Just Me VIP tables.',
      it: 'Dove andare a ballare o cenare dopo la partita di Inter e Milan o un concerto a San Siro: Aria Club Milano (a 150m dai cancelli in Piazzale dello Sport 14), Voya Rooftop, 55 Milano e Just Me.'
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
    dateISO: "2026-11-27T19:30:00+02:00",
    endDateISO: "2026-11-28T04:00:00+02:00",
    pricing: { entry: 30, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Flower Power Party from Ibiza", it: "Flower Power Party da Ibiza" },
      shortDescription: {
        en: "An exclusive aperitivo + DJ set night bringing the iconic Ibiza Flower Power party to Milan. Arrive by 7:30 PM to secure your table.",
        it: "Una serata esclusiva con aperitivo e DJ set che porta a Milano la leggendaria festa Flower Power di Ibiza. Arriva entro le 19:30 per il tuo tavolo."
      },
      slug: { en: "flower-power-ibiza-justme-12-06-2026", it: "flower-power-ibiza-justme-12-06-2026" }
    },
    image: "/images/events/xceed-justme-friday-night.jpg",
    isTrending: true
  },
  {
    id: "e-justme-fashion-week-0620",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-12-05T23:30:00+02:00",
    endDateISO: "2026-12-06T05:00:00+02:00",
    pricing: { entry: 50, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: { en: "Just Me — Premium Saturday Night", it: "Just Me — Sabato Premium" },
      shortDescription: {
        en: "Just Me's most exclusive Saturday of the summer. International DJ, fashion crowd, VIP tables from €500. Dress code strictly enforced.",
        it: "Il sabato più esclusivo dell'estate al Just Me. DJ internazionale, pubblico fashion, tavoli VIP da €500. Dress code rigoroso."
      },
      slug: { en: "fashion-week-night-justme-20-06-2026", it: "fashion-week-justme-20-06-2026" }
    },
    image: "/images/events/xceed-justme-saturday-night.jpg",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "e-justme-uncle-waffles-0625",
    venueId: "v-justme",
    genre: [MusicGenre.HIP_HOP, MusicGenre.COMMERCIAL],
    dateISO: "2026-11-12T23:30:00+02:00",
    endDateISO: "2026-11-13T05:00:00+02:00",
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
    dateISO: "2026-11-27T19:30:00+02:00",
    endDateISO: "2026-11-28T03:00:00+02:00",
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
    dateISO: "2026-12-04T19:30:00+02:00",
    endDateISO: "2026-12-05T05:00:00+02:00",
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
    dateISO: "2026-12-05T19:30:00+02:00",
    endDateISO: "2026-12-06T05:00:00+02:00",
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
    dateISO: "2026-11-13T19:30:00+02:00",
    endDateISO: "2026-11-14T04:00:00+02:00",
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
    dateISO: "2026-11-10T21:00:00+02:00",
    endDateISO: "2026-11-11T00:00:00+02:00",
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
    dateISO: "2026-11-11T21:00:00+02:00",
    endDateISO: "2026-11-11T23:30:00+02:00",
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
    dateISO: "2026-11-13T23:59:00+02:00",
    endDateISO: "2026-11-14T06:00:00+02:00",
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
    dateISO: "2026-11-14T19:00:00+02:00",
    endDateISO: "2026-11-14T23:00:00+02:00",
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
    dateISO: "2026-11-13T23:00:00+02:00",
    endDateISO: "2026-11-14T06:00:00+02:00",
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
    dateISO: "2026-11-14T23:00:00+02:00",
    endDateISO: "2026-11-15T06:00:00+02:00",
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
    dateISO: "2026-11-21T22:00:00+02:00",
    endDateISO: "2026-11-22T04:00:00+02:00",
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
    dateISO: "2026-11-28T22:00:00+02:00",
    endDateISO: "2026-11-29T04:00:00+02:00",
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
    dateISO: "2026-12-04T23:45:00+02:00",
    endDateISO: "2026-12-05T04:00:00+02:00",
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
    dateISO: "2026-12-05T23:45:00+02:00",
    endDateISO: "2026-12-06T04:00:00+02:00",
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
    dateISO: "2026-11-20T23:00:00+02:00",
    endDateISO: "2026-11-21T05:00:00+02:00",
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
    dateISO: "2026-11-21T23:00:00+02:00",
    endDateISO: "2026-11-22T05:00:00+02:00",
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
    dateISO: "2026-11-21T22:00:00+02:00",
    endDateISO: "2026-11-22T03:00:00+02:00",
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
    dateISO: "2026-11-23T22:00:00+02:00",
    endDateISO: "2026-11-24T03:00:00+02:00",
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
    dateISO: "2026-12-05T23:30:00+02:00",
    endDateISO: "2026-12-06T05:30:00+02:00",
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
    dateISO: "2026-12-06T23:30:00+02:00",
    endDateISO: "2026-12-07T05:30:00+02:00",
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
    dateISO: "2026-11-12T23:30:00+02:00",
    endDateISO: "2026-11-13T05:30:00+02:00",
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
    dateISO: "2026-11-13T23:30:00+02:00",
    endDateISO: "2026-11-14T05:30:00+02:00",
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
    dateISO: "2026-11-14T23:30:00+02:00",
    endDateISO: "2026-11-15T05:30:00+02:00",
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
    dateISO: "2026-11-21T18:00:00+02:00",
    endDateISO: "2026-11-21T23:00:00+02:00",
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
    dateISO: "2026-11-28T18:00:00+02:00",
    endDateISO: "2026-11-28T23:30:00+02:00",
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
    dateISO: "2026-12-06T22:00:00+02:00",
    endDateISO: "2026-12-07T05:00:00+02:00",
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
    dateISO: "2026-11-20T20:00:00+02:00",
    endDateISO: "2026-11-21T03:00:00+02:00",
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
    dateISO: "2026-11-21T20:00:00+02:00",
    endDateISO: "2026-11-22T03:00:00+02:00",
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
    dateISO: "2026-11-23T23:00:00+02:00",
    endDateISO: "2026-11-24T04:00:00+02:00",
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
    dateISO: "2026-11-21T22:00:00+02:00",
    endDateISO: "2026-11-22T04:00:00+02:00",
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
    dateISO: "2026-11-21T22:00:00+02:00",
    endDateISO: "2026-11-22T04:00:00+02:00",
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
    dateISO: "2026-12-05T22:00:00+02:00",
    endDateISO: "2026-12-06T04:00:00+02:00",
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
    dateISO: "2026-11-20T20:00:00+02:00",
    endDateISO: "2026-11-21T02:00:00+02:00",
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
    dateISO: "2026-11-21T20:00:00+02:00",
    endDateISO: "2026-11-22T02:00:00+02:00",
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
    dateISO: "2026-11-21T18:00:00+02:00",
    endDateISO: "2026-11-22T00:00:00+02:00",
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
    dateISO: "2026-12-05T18:00:00+02:00",
    endDateISO: "2026-12-06T00:00:00+02:00",
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
    dateISO: "2026-11-22T19:30:00+02:00",
    endDateISO: "2026-11-23T02:00:00+02:00",
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
    dateISO: "2026-12-05T19:30:00+02:00",
    endDateISO: "2026-12-06T02:00:00+02:00",
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
    dateISO: "2026-11-20T22:00:00+02:00",
    endDateISO: "2026-11-21T04:00:00+02:00",
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
    dateISO: "2026-11-21T23:30:00+02:00",
    endDateISO: "2026-11-22T05:00:00+02:00",
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
    dateISO: "2026-11-21T19:30:00+02:00",
    endDateISO: "2026-11-22T03:00:00+02:00",
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
    dateISO: "2026-11-27T23:45:00+02:00",
    endDateISO: "2026-11-28T06:00:00+02:00",
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
    dateISO: "2026-11-28T19:00:00+02:00",
    endDateISO: "2026-11-28T23:00:00+02:00",
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
    dateISO: "2026-12-04T23:00:00+02:00",
    endDateISO: "2026-12-05T04:00:00+02:00",
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
    dateISO: "2026-12-05T23:30:00+02:00",
    endDateISO: "2026-12-06T05:00:00+02:00",
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
    dateISO: "2026-12-06T23:00:00+02:00",
    endDateISO: "2026-12-07T06:00:00+02:00",
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
    dateISO: "2026-12-12T19:00:00+02:00",
    endDateISO: "2026-12-12T23:00:00+02:00",
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
    dateISO: "2026-12-13T19:30:00+02:00",
    endDateISO: "2026-12-14T03:00:00+02:00",
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
    dateISO: "2026-12-18T23:30:00+02:00",
    endDateISO: "2026-12-19T05:00:00+02:00",
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
    dateISO: "2026-12-18T23:45:00+02:00",
    endDateISO: "2026-12-19T07:00:00+02:00",
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
    dateISO: "2026-12-19T19:30:00+02:00",
    endDateISO: "2026-12-20T03:00:00+02:00",
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
    dateISO: "2026-12-26T23:00:00+02:00",
    endDateISO: "2026-12-27T04:00:00+02:00",
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
    dateISO: "2026-12-31T23:30:00+02:00",
    endDateISO: "2027-01-01T05:00:00+02:00",
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
  },

  // ─── SAN SIRO FOOTBALL MATCH AFTERPARTIES (INTER & AC MILAN 2026/2027) ────
  {
    id: "ev-san-siro-derby-afterparty-aria",
    venueId: "v-aria",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-11-22T22:45:00+01:00",
    endDateISO: "2026-11-23T05:00:00+01:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 300 },
    localizedContent: {
      title: {
        en: "San Siro Derby Inter vs AC Milan — Official Third-Half Afterparty at Aria Club (150m Away)",
        it: "Dopo-Partita Derby Inter vs Milan a San Siro — Terzo Tempo Ufficiale da Aria Club (a 150m)"
      },
      shortDescription: {
        en: "Walk 150 meters from the San Siro gates straight into Aria Club Milano (Piazzale dello Sport 14) after the final whistle. Zero traffic, 3 VIP Privé zones (Dancefloor €300, Privé Aria €500, Console DJ €800), and DJ sets until 05:00 AM. Book via WhatsApp +39 351 912 7047.",
        it: "Cammina 150 metri dai cancelli di San Siro direttamente dentro Aria Club Milano (Piazzale dello Sport 14) al triplice fischio del Derby. Zero traffico, 3 aree Tavoli VIP (Pista 300€, Privé Aria 500€, Console DJ 800€) e DJ set fino alle 05:00. Prenota su WhatsApp +39 351 912 7047."
      },
      slug: {
        en: "san-siro-derby-inter-milan-official-afterparty-aria-club",
        it: "dopo-partita-derby-inter-milan-san-siro-aria-club"
      }
    },
    image: "/images/venues/aria-club-milano/aria-club-milano-interior-01.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "ev-san-siro-derby-vip-justme",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-11-22T23:00:00+01:00",
    endDateISO: "2026-11-23T05:00:00+01:00",
    pricing: { entry: 35, currency: "EUR", tableMinSpend: 500 },
    localizedContent: {
      title: {
        en: "Derby della Madonnina VIP Gala Afterparty — Just Me Milano (Torre Branca)",
        it: "Gran Gala Dopo-Partita Derby della Madonnina — Tavoli VIP Just Me Milano"
      },
      shortDescription: {
        en: "Where football stars, San Siro Skybox Hospitality guests, and international fans celebrate Derby night in Milan. 10 minutes from San Siro under the illuminated Torre Branca in Parco Sempione. Privé Branca & Console tables via WhatsApp +39 351 912 7047.",
        it: "Dove festeggiano calciatori, ospiti degli Skybox Hospitality di San Siro e tifosi internazionali nella notte del Derby di Milano. A 10 minuti da San Siro sotto la Torre Branca illuminata. Tavoli Privé Branca e Console via WhatsApp +39 351 912 7047."
      },
      slug: {
        en: "derby-della-madonnina-vip-afterparty-just-me-milano",
        it: "dopo-partita-derby-milano-tavoli-vip-just-me"
      }
    },
    image: "/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "ev-champions-league-afterparty-justme",
    venueId: "v-justme",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL, MusicGenre.HIP_HOP],
    dateISO: "2026-11-25T23:00:00+01:00",
    endDateISO: "2026-11-26T05:00:00+01:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 350 },
    localizedContent: {
      title: {
        en: "UEFA Champions League Night Afterparty (Tue/Wed) — Just Me Milano",
        it: "Dopo-Partita Notte di UEFA Champions League (Mar/Mer) — Just Me Milano"
      },
      shortDescription: {
        en: "Looking for an upscale club open after a Tuesday or Wednesday 21:00 UEFA Champions League match at San Siro? Just Me Milano (#1 Priority) is open 7 nights a week until 05:00 AM welcoming home and visiting European supporters.",
        it: "Cerchi una discoteca esclusiva aperta dopo una partita di UEFA Champions League del martedì o mercoledì alle 21:00 a San Siro? Il Just Me Milano (#1 Priorità) è aperto 7 sere su 7 fino alle 05:00 per tifosi e delegazioni europee."
      },
      slug: {
        en: "champions-league-night-afterparty-just-me-milano",
        it: "dopo-partita-champions-league-san-siro-just-me-milano"
      }
    },
    image: "/images/venues/just-me-milano/just-me-milano-lounge-01.webp",
    isSpecial: true,
    isTrending: true
  },
  {
    id: "ev-san-siro-postmatch-skyline-voya",
    venueId: "v-voya",
    genre: [MusicGenre.HOUSE, MusicGenre.COMMERCIAL],
    dateISO: "2026-11-29T20:30:00+01:00",
    endDateISO: "2026-11-30T02:30:00+01:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 250 },
    localizedContent: {
      title: {
        en: "San Siro Post-Match Skyline Cocktail & DJ Set — Voya Rooftop (20th Floor)",
        it: "Terzo Tempo Panoramico Post-Partita San Siro — Voya Rooftop (20° Piano)"
      },
      shortDescription: {
        en: "Just 3 M5 Purple Line metro stops from San Siro (Lotto -> Portello): toast your team's victory 85 meters above Milan with 360-degree glass skyline views, signature cocktails, and Deep House DJ sets at Voya Rooftop.",
        it: "A sole 3 fermate di Metro M5 Lilla da San Siro (Lotto -> Portello): brinda alla vittoria a 85 metri d'altezza con vista a 360° sullo skyline di Milano, cocktail sartoriali e DJ set Deep House al 20° piano di Voya Rooftop."
      },
      slug: {
        en: "san-siro-post-match-skyline-party-voya-rooftop",
        it: "terzo-tempo-san-siro-aperitivo-djset-voya-rooftop"
      }
    },
    image: "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp",
    isTrending: true
  },
  {
    id: "ev-serie-a-saturday-afterparty-pineta",
    venueId: "v-pineta",
    genre: [MusicGenre.COMMERCIAL, MusicGenre.REGGAETON, MusicGenre.HOUSE],
    dateISO: "2026-12-05T23:00:00+01:00",
    endDateISO: "2026-12-06T05:00:00+01:00",
    pricing: { entry: 20, currency: "EUR", tableMinSpend: 350 },
    localizedContent: {
      title: {
        en: "Saturday Serie A Post-Match Party — Pineta Club Milano (Direct M5 Line)",
        it: "Dopo-Partita Anticipo del Sabato Serie A — Pineta Club Milano (Linea M5 Diretta)"
      },
      shortDescription: {
        en: "After Saturday's 18:00 or 20:45 Serie A kickoff at San Siro, hop on the direct M5 Purple Line to Cenisio/Monumentale and celebrate under the crystal chandeliers of Pineta Club (#2 Priority, Via Messina 38).",
        it: "Dopo l'anticipo di Serie A del sabato alle 18:00 o alle 20:45 a San Siro, prendi la linea diretta M5 Lilla fino a Cenisio/Monumentale e festeggia sotto i lampadari di cristallo del Pineta Club (#2 Priorità, Via Messina 38)."
      },
      slug: {
        en: "saturday-serie-a-post-match-party-pineta-milano",
        it: "dopo-partita-sabato-serie-a-pineta-club-milano"
      }
    },
    image: "/images/venues/pineta-milano/pineta-milano-lounge-01.webp",
    isTrending: true
  },
  {
    id: "ev-serie-a-postmatch-dinner-55milano",
    venueId: "v-55milano",
    genre: [MusicGenre.DINNER_SHOW, MusicGenre.COMMERCIAL, MusicGenre.HOUSE],
    dateISO: "2026-12-06T20:00:00+01:00",
    endDateISO: "2026-12-07T03:00:00+01:00",
    pricing: { entry: 25, currency: "EUR", tableMinSpend: 250 },
    localizedContent: {
      title: {
        en: "San Siro Post-Match XXL Apericena, Dinner Show & Club — 55 Milano",
        it: "Cena Cantata, Apericena XL e Serata Dopo-Partita San Siro — 55 Milano"
      },
      shortDescription: {
        en: "Only 6 minutes from San Siro (M5 Domodossola / Gerusalemme): 1,000 sqm loft in Via Piero della Francesca 55 ideal for hungry post-match groups after 15:00/18:00 games or late kitchen & bottle service after 20:45 matches.",
        it: "A soli 6 minuti da San Siro (M5 Domodossola / Gerusalemme): 1.000 mq in Via Piero della Francesca 55 perfetti per cenare e brindare in gruppo dopo le partite delle 15:00/18:00 o per il tavolo dopocena dopo i posticipi delle 20:45."
      },
      slug: {
        en: "san-siro-post-match-dinner-show-55-milano",
        it: "cena-e-serata-dopo-partita-san-siro-55-milano"
      }
    },
    image: "/images/venues/55-milano/55-milano-interior-01.webp",
    isTrending: true
  }
];

// Unione delle traduzioni (33 lingue mancanti, generate in-sessione) nei campi
// localizzati di ogni mock event: le card mostrano titolo/descrizione nella lingua
// selezionata su TUTTE le 35 lingue (prima solo en/it → fallback inglese).
for (const ev of mockEvents) {
  const tr = MOCK_EVENT_I18N[ev.id];
  if (!tr) continue;
  const title = ev.localizedContent.title as Record<string, string>;
  const desc = ev.localizedContent.shortDescription as Record<string, string> | undefined;
  for (const lang of Object.keys(tr)) {
    if (tr[lang].title) title[lang] = tr[lang].title;
    if (desc && tr[lang].shortDescription) desc[lang] = tr[lang].shortDescription;
  }
}

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
  // Bug fix: prima lo slug.it veniva riconosciuto solo con lang==='it'. Il
  // language switcher (Header/LanguageSwitcher) mantiene lo slug invariato
  // cambiando solo il prefisso lingua — passando da /it/events/{slug-it} a
  // qualsiasi altra lingua si otteneva un 404 perché slug.it non veniva più
  // controllato. Ora riconosce entrambi gli slug a prescindere da lang.
  return mockEvents.find(e =>
    e.localizedContent.slug.en === slug ||
    e.localizedContent.slug.it === slug
  );
};

export const getVenueById = (id: string): Venue | undefined => {
  return mockVenues.find(v => v.id === id);
};

export const getPerformerById = (id: string): Performer | undefined => {
  return mockPerformers.find(p => p.id === id);
};

export const getVenueBySlug = (slug: string, lang: string): Venue | undefined => {
  // Stesso bug fix di getEventBySlug/getGuideBySlug: riconosce entrambi gli
  // slug a prescindere da lang (oggi dormiente perché ogni venue ha slugs.en
  // === slugs.it, ma stessa classe di bug se in futuro divergessero).
  return mockVenues.find(v =>
    v.slugs.en === slug ||
    v.slugs.it === slug
  );
};

export const getEventsByVenueId = (venueId: string): Event[] => {
  return mockEvents.filter(e => e.venueId === venueId);
};

// Mock Data for Guides
// Mock Data for Guides — 10 Exhaustive Pillar Guides (5 Expanded + 5 Rank Intel Validated)
export const mockGuides: Guide[] = [
  // ─── 1. DRESS CODE & DOOR POLICY PILLAR GUIDE ─────────────────────────────
  {
    id: "g-dress-code",
    slugs: { en: "ultimate-dress-code-guide-milan-clubs", it: "guida-definitiva-dress-code-club-milano" },
    title: {
      en: "The Ultimate Dress Code & Door Selection Guide for Milan Clubs (2026/2027)",
      it: "La Guida Definitiva al Dress Code e alla Selezione nei Club di Milano (2026/2027)"
    },
    excerpt: {
      en: "Milan is the global fashion capital and its velvet rope is strict. Learn exactly what to wear for Just Me, Armani/Privé, Pineta, Aria, 55 Milano, Voya Rooftop, and underground techno clubs.",
      it: "Milano è la capitale mondiale della moda e la selezione all'ingresso è rigorosa. Scopri esattamente cosa indossare per Just Me, Armani/Privé, Pineta, Aria, 55 Milano, Voya Rooftop e i club techno."
    },
    author: "Nightlife Milan Concierge Team",
    datePublished: "2026-01-10T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp",
    sections: [
      {
        id: "the-golden-rule",
        heading: {
          en: "1. The Golden Rule of Milanese Door Selection: Sartorial Effortlessness & Group Balance",
          it: "1. La Regola d'Oro della Selezione a Milano: Eleganza Sartoriale e Bilanciamento del Gruppo"
        },
        content: {
          en: "<p>In Milan, the door selector (<em>direttore di porta</em>) evaluates three factors in under five seconds: <strong>attire cut and footwear</strong>, <strong>group gender ratio</strong>, and <strong>demeanor at the velvet rope</strong>. Unlike Berlin (where radical underground expression rules) or Las Vegas (where anyone with a ticket walks in), Milanese luxury venues protect their visual harmony above all else.</p><p>The unwritten code is <strong>Sprezzatura</strong>: looking impeccably tailored without loud, oversized counterfeit-style logos. A well-fitted dark blazer, a crisp collared shirt, tailored trousers, and clean leather loafers or Chelsea boots will open every velvet rope from Parco Sempione to the Fashion Quadrilatero.</p>",
          it: "<p>A Milano il responsabile della selezione alla porta valuta tre fattori in meno di cinque secondi: <strong>taglio dell'abito e calzature</strong>, <strong>equilibrio uomo/donna del gruppo</strong> ed <strong>educazione al cordone di velluto</strong>. A differenza di Berlino o di Las Vegas, i club di lusso milanesi proteggono prima di tutto l'armonia estetica della sala.</p><p>Il codice non scritto è la <strong>Sprezzatura</strong>: apparire impeccabili nel taglio senza loghi giganti o abbigliamento sportivo appariscente. Un blazer scuro ben tagliato, camicia stirata con colletto, pantalone sartoriale e mocassini o stivaletti in pelle aprono ogni porta dal Parco Sempione al Quadrilatero della Moda.</p>"
        }
      },
      {
        id: "dress-code-by-venue-tier",
        heading: {
          en: "2. Dress Code Breakdown by Club Tier: Luxury vs Corso Como vs Rooftop vs Techno",
          it: "2. Dress Code per Categoria di Locale: Luxury, Corso Como, Rooftop e Techno"
        },
        content: {
          en: "<p>Not every Milan club requires the same uniform. Match your outfit to the venue's specific aesthetic:</p><ul><li><strong>Tier 1 — Haute Couture & Luxury Flagships (Just Me Milano, Armani/Privé, Gattopardo):</strong> Strictly Elegant. Men must wear a collared shirt (white, black, or dark silk/cotton), blazer or tailored jacket, formal trousers or dark tailored chinos, and leather dress shoes. Women wear cocktail dresses, tailored jumpsuits, or evening separates with heels or dressy flats. Zero running sneakers, zero hoodies, zero caps.</li><li><strong>Tier 2 — Dinner Show, Corso Como & Garden Clubs (Pineta Club, Aria Club, 55 Milano, Tocqueville 13, 11Clubroom, Hollywood):</strong> Smart Chic & Glamour. Men can wear a collared shirt or a fine-knit cashmere/merino polo under a jacket with dark slim trousers and minimalist leather shoes. Women opt for chic two-piece sets, mini/midi dresses, or leather blazer combinations.</li><li><strong>Tier 3 — Panoramic Rooftops (Voya Rooftop 20th Floor, Terrazza Duomo 21, Ceresio 7):</strong> Smart Elegant Aperitivo. Linen or cotton shirts in warm months, turtleneck + blazer in autumn/winter. Clean minimalist leather sneakers (e.g., Common Projects) are tolerated at sunset aperitivo, though loafers remain superior after 22:30.</li><li><strong>Tier 4 — Underground Techno & Warehouses (Volt Club, Magazzini Generali, Amnesia, Fabrique):</strong> Total Black & Minimal Streetwear. Monochrome black T-shirts, cargo or wide-leg dark trousers, combat boots or dark sneakers built for 6 hours of dancing. Avoid formal suits here—they look out of place.</li></ul>",
          it: "<p>Non tutte le discoteche di Milano richiedono la stessa divisa. Adatta il tuo outfit all'estetica specifica del locale:</p><ul><li><strong>Fascia 1 — Luxury Flagship & Alta Moda (Just Me Milano, Armani/Privé, Gattopardo):</strong> Rigorosamente Elegante. Per l'uomo sono obbligatori camicia con colletto (bianca, nera o scura), blazer o giacca sartoriale, pantalone elegante e scarpa in pelle o mocassino. Per la donna abito da cocktail, tailleur pantalone o jumpsuit elegante con tacco o stivale curato. Vietate sneakers sportive, felpe e cappellini.</li><li><strong>Fascia 2 — Dinner Show, Corso Como & Garden Club (Pineta Club, Aria Club, 55 Milano, Tocqueville 13, 11Clubroom, Hollywood):</strong> Smart Chic & Glamour. L'uomo entra perfettamente con camicia o polo in maglia fine sotto la giacca, jeans scuri privi di strappi e calzature in pelle pulite.</li><li><strong>Fascia 3 — Rooftop Panoramici (Voya Rooftop 20° Piano, Terrazza Duomo 21, Ceresio 7):</strong> Smart Elegant da Terrazza. Camicia o dolcevita sartoriale con giacca in autunno/inverno; ammesse sneakers minimaliste in pelle liscia durante l'aperitivo al tramonto, ma il mocassino resta preferito nel dopocena.</li><li><strong>Fascia 4 — Techno & Warehouse (Volt Club, Magazzini Generali, Amnesia, Fabrique):</strong> Total Black & Minimal Clubwear. T-shirt nera, pantaloni scuri comodi e sneakers scure o stivali per ballare fino all'alba.</li></ul>"
        }
      },
      {
        id: "banned-items-velvet-rope",
        heading: {
          en: "3. The 7 Items That Will Get You Bounced Immediately (Even with a Reservation)",
          it: "3. I 7 Capi che Fanno Rimbalzare Immediatamente alla Porta (Anche con Prenotazione)"
        },
        content: {
          en: "<p>Even guests holding a confirmed VIP Table can be denied entry if they violate safety or dress standards. Never wear:</p><ol><li><strong>Running, gym, or neon-soled sneakers</strong> (Nike Shox/TN, bulky running shoes) at luxury clubs.</li><li><strong>Ripped, distressed, or acid-wash baggy jeans</strong> at Just Me, Armani/Privé, Pineta, or Gattopardo.</li><li><strong>Tracksuits, joggers, hoodies, or sportswear jerseys</strong> (including designer tracksuits).</li><li><strong>Baseball caps, beanies, or bucket hats</strong> inside the club.</li><li><strong>Flip-flops, open sandals for men, or shorts</strong> (even in July/August).</li><li><strong>Crossbody nylon street bags / chest rigs</strong> at formal clubs (they trigger security rejection).</li><li><strong>Heavy intoxication at arrival:</strong> Milan bouncers refuse anyone visibly drunk at the door.</li></ol>",
          it: "<p>Anche chi possiede una prenotazione Tavolo VIP può vedersi rifiutare l'accesso se viola il decoro del locale. Non indossare mai:</p><ol><li><strong>Sneakers da running, palestra o con bolle d'aria fluo</strong> (es. Nike TN/Shox) nei club eleganti.</li><li><strong>Jeans strappati, bucati o lavaggi acidi baggy</strong> da Just Me, Armani/Privé, Pineta o Gattopardo.</li><li><strong>Tute sportive, pantaloni jogger in felpa o felpe col cappuccio</strong> (anche se di alta moda).</li><li><strong>Cappellini con visiera o berretti</strong> all'interno del locale.</li><li><strong>Pantaloncini corti da uomo o infradito</strong> (vietati anche in piena estate).</li><li><strong>Marsupi a tracolla sul petto in nylon</strong> nei club luxury (vengono bloccati sistematicamente dalla sicurezza).</li><li><strong>Stato di alterazione all'arrivo:</strong> presentarsi già alticci al cordone comporta il rimbalzo immediato.</li></ol>"
        }
      },
      {
        id: "group-ratio-and-vip-bypass",
        heading: {
          en: "4. Group Ratio Rules: How All-Male Groups Secure Guaranteed Entry",
          it: "4. La Regola dei Gruppi: Come Entrare Sicuri se Siete un Gruppo di Soli Uomini"
        },
        content: {
          en: "<p>On Friday and Saturday nights, Nominal Guest Lists require a balanced gender ratio (ideally 1:1 or more women than men). If you arrive on the guest list as a group of 4 to 10 men at 01:00 AM, the door selector will almost certainly turn you away.</p><p><strong>The Solution:</strong> Book a <strong>VIP Table (Dancefloor, Privé, or Console)</strong> through our official WhatsApp Concierge (<strong>+39 351 912 7047</strong>). We pre-authorize your male group directly with the club's VIP Director, assign you a dedicated hostess at the VIP lane, and convert 100% of your table fee into premium bottles.</p>",
          it: "<p>Il venerdì e il sabato notte le Liste Nominali richiedono un rapporto uomo/donna equilibrato (idealmente 1:1). Se vi presentate in coda lista all'1:00 di notte in 5 o 8 ragazzi soli, la selezione alla porta vi bloccherà quasi certamente.</p><p><strong>La Soluzione Operativa:</strong> Prenotate un <strong>Tavolo VIP (Pista, Privé o Console)</strong> tramite il nostro Concierge WhatsApp ufficiale (<strong>+39 351 912 7047</strong>). Autorizziamo preventivamente il vostro gruppo maschile con la direzione del locale, vi facciamo accogliere dalla hostess nella corsia salta-fila e convertiamo il 100% dell'importo in bottiglie al tavolo.</p>"
        }
      },
      {
        id: "seasonal-wardrobe-cloakroom",
        heading: {
          en: "5. Autumn/Winter 2026–2027 Coat Check, ID Rules & Arrival Timing",
          it: "5. Guardaroba Autunno/Inverno 2026–2027, Documenti Fisici e Orario Perfetto"
        },
        content: {
          en: "<p>During October, November, December, Capodanno 2027, and February Fashion Week, temperatures in Milan drop to 2–8°C while club dancefloors stay warm. Wear a tailored wool overcoat or dark trench over a light shirt—every club provides a supervised cloakroom (€3–€5 per item).</p><p>Always carry a <strong>physical government ID or passport</strong> (photos on phones are often rejected by police compliance checks). For guest lists, arrive between <strong>23:30 and 00:30</strong>; for VIP Tables, arrive between <strong>00:00 and 01:15</strong>.</p>",
          it: "<p>Tra ottobre, novembre, dicembre, Capodanno 2027 e la Fashion Week di febbraio le temperature esterne a Milano scendono tra 2°C e 8°C mentre le piste interne sono caldissime. Indossa un cappotto sartoriale in lana sopra una camicia leggera: ogni club dispone di guardaroba custodito (3–5€ a capo).</p><p>Porta sempre un <strong>documento d'identità fisico in originale</strong> (patente, carta d'identità o passaporto). Per le liste nominali arriva tra le <strong>23:30 e le 00:30</strong>; con Tavolo VIP arriva comodamente tra le <strong>00:00 e l'01:15</strong>.</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Can I wear sneakers to a club in Milan?", it: "Posso indossare le sneakers in discoteca a Milano?" },
        answer: {
          en: "At luxury clubs like Just Me, Armani/Privé, and Gattopardo, athletic or running sneakers are strictly banned—wear leather loafers, Derby shoes, or Chelsea boots. At smart-chic venues (Pineta, Aria, 55 Milano, Play Club) clean monochrome leather fashion sneakers are accepted if paired with a collared shirt and dark trousers. At techno clubs (Volt, Magazzini Generali), dark sneakers are standard.",
          it: "Nei club di lusso come Just Me, Armani/Privé e Gattopardo le sneakers sportive o da running sono vietate: indossa mocassini, scarpe stringate o stivaletti Chelsea in pelle. Nei locali smart-chic (Pineta, Aria, 55 Milano, Play Club) sono ammesse sneakers minimaliste in pelle scura o bianca pulitissima se abbinate a camicia e pantalone lungo. Nei club techno (Volt, Magazzini Generali) le sneakers scure sono la norma."
        }
      },
      {
        question: { en: "Does a VIP Table reservation exempt me from the dress code?", it: "Prenotare un Tavolo VIP esenta dal rispetto del dress code?" },
        answer: {
          en: "No. While a VIP Table guarantees skip-the-line priority and allows all-male groups to enter, every guest at the table must still respect the club's smart-elegant dress code (no shorts, no tracksuits, no gym sneakers).",
          it: "No. Il Tavolo VIP garantisce l'ingresso salta-fila e permette l'accesso anche a gruppi di soli uomini, ma tutti i componenti del tavolo devono comunque rispettare il dress code elegante del locale (niente tute, pantaloncini o scarpe da ginnastica)."
        }
      },
      {
        question: { en: "What is the minimum age for Milan clubs?", it: "Qual è l'età minima per entrare nei club di Milano?" },
        answer: {
          en: "The legal minimum age is 18+ with a physical ID. University nights (Alcatraz, Play Club, The Club on Tuesdays) admit 18+, whereas luxury venues (Just Me, Armani/Privé, Voya Rooftop, Pineta on Saturdays) enforce a 21+ or 23+ door target.",
          it: "L'età minima di legge è 18 anni compiuti con documento fisico. Le serate universitarie (Alcatraz, Play Club, The Club il martedì) sono 18+, mentre i top club (Just Me, Armani/Privé, Voya Rooftop, Pineta il sabato) applicano un target 21+ o 23+."
        }
      },
      {
        question: { en: "What should women wear to Milan's top clubs?", it: "Come devono vestirsi le ragazze nei migliori club di Milano?" },
        answer: {
          en: "Milanese women favor sleek cocktail dresses, tailored blazer-and-trouser sets, silk tops with dark denim/leather skirts, and heels or elegant heeled boots. Comfortable chic is key—avoid overly casual beach sandals or gym wear.",
          it: "Lo stile femminile milanese premia abiti da cocktail, tailleur pantalone con top in seta o body, minigonne/midi con stivali col tacco o décolleté eleganti. Evita sneakers da palestra o abbigliamento troppo sportivo."
        }
      }
    ]
  },

  // ─── 2. HIDDEN SPEAKEASIES & SECRET BARS PILLAR GUIDE ─────────────────────
  {
    id: "g-secret-bars",
    slugs: { en: "hidden-speakeasies-navigli", it: "speakeasy-nascosti-navigli" },
    title: {
      en: "Complete Atlas of Milan's 12 Hidden Speakeasies & Secret Cocktail Bars (Navigli, Brera, Porta Venezia & Isola)",
      it: "Atlante dei 12 Speakeasy Nascosti e Secret Bar di Milano (Navigli, Brera, Porta Venezia e Isola)"
    },
    excerpt: {
      en: "Discover the secret passwords, unmarked doors, cocktail prices (€12–€25), and pre-clubbing itineraries across Milan's 12 best speakeasies.",
      it: "Scopri le password segrete, le porte nascoste, i prezzi dei cocktail (12–25€) e gli itinerari pre-discoteca nei 12 migliori speakeasy di Milano."
    },
    author: "Nightlife Milan Mixology Desk",
    datePublished: "2026-01-20T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/aperitivo-milan-navigli-evening.webp",
    sections: [
      {
        id: "navigli-secrets",
        heading: {
          en: "1. The Secret Mixology Culture Behind Milan's Unmarked Doors",
          it: "1. La Cultura della Mixology Segreta Dietro le Porte Anonime di Milano"
        },
        content: {
          en: "<p>Before the dancefloors of Parco Sempione and Corso Como peak at 01:00 AM, Milanese insiders gather between <strong>20:30 and 23:00</strong> inside hidden speakeasies. Concealed behind fake vintage grocery stores, unmarked brass buzzers, and 4-square-meter canal windows, Milan's cocktail scene ranks among Europe's finest.</p><p>Below is our complete directory of the <strong>12 essential speakeasies and craft cocktail bars</strong> in Milan, complete with entry rules, cocktail prices, and the best nightclub to pair with each stop.</p>",
          it: "<p>Prima che le piste di Parco Sempione e Corso Como entrino nel vivo all'una di notte, gli habitué milanesi si ritrovano tra le <strong>20:30 e le 23:00</strong> negli speakeasy nascosti. Celati dietro finte botteghe d'epoca, citofoni in ottone senza insegna e feritoie lungo i canali, i secret bar di Milano sono il preludio perfetto a una serata con Tavolo VIP.</p><p>Ecco la mappa completa dei <strong>12 speakeasy e cocktail bar d'autore</strong> imperdibili a Milano, con regole d'accesso, prezzi e abbinamento perfetto con la discoteca.</p>"
        }
      },
      {
        id: "top-6-speakeasies-directory",
        heading: {
          en: "2. The Top 6 Secret Speakeasies: 1930, Backdoor 43, Nottingham Forest, Officina, MAG & Moebius",
          it: "2. I Primi 6 Speakeasy Iconici: 1930, Backdoor 43, Nottingham Forest, Officina, MAG e Moebius"
        },
        content: {
          en: "<ul><li><strong>1. 1930 Secret Cocktail Bar (Cinque Giornate / Porta Romana):</strong> Ranked in the World's 50 Best Bars. Hidden behind a fake storefront; invitation-only access earned by becoming a regular at MAG Cafè on Navigli. Prohibition-era grand piano, velvet armchairs, and conceptual menus (€18–€25/cocktail). <em>Pair after with: Volt Club or Magazzini Generali.</em></li><li><strong>2. Backdoor 43 (Ripa di Porta Ticinese 43, Navigli):</strong> The world's smallest bar (4 sqm). Book the entire room exclusively for 1–4 people for 90 minutes, or order whiskey and craft cocktails through the peephole from a V-for-Vendetta masked bartender (€12–€18).</li><li><strong>3. Nottingham Forest (Viale Piave 1, Porta Venezia):</strong> Dario Comini's molecular mixology temple. Walk-in only (arrive by 19:15 or after 23:00). Drinks served in miniature bathtubs, skulls, and smoking infusion vessels (€15–€20). <em>Pair after with: Just Me or Armani/Privé.</em></li><li><strong>4. Officina Milano (Via Giovenale 7, Navigli / Bocconi):</strong> Post-industrial courtyard featuring vintage automobiles, Chesterfield leather sofas, and 400+ spirit labels (€14–€18).</li><li><strong>5. MAG La Pusterla / MAG Navigli (Via De Amicis 22 & Ripa di Porta Ticinese 43):</strong> The living room of Milan's bartending family, ideal for sartorial Negronis and highballs (€12–€16).</li><li><strong>6. Moebius Milano (Via Alfredo Cappellini 25, Centrale / Porta Venezia):</strong> A monumental former textile warehouse housing a vinyl listening bar, suspended tree, gourmet tapas, and avant-garde cocktails (€14–€18).</li></ul>",
          it: "<ul><li><strong>1. 1930 Secret Cocktail Bar (Cinque Giornate / Porta Romana):</strong> Stabilmente nella classifica World's 50 Best Bars. Nascosto dietro una vetrina segreta; si accede su invito per i clienti affezionati del gruppo MAG. Atmosfera anni '20, pianoforte a coda e drink concettuali (18–25€). <em>Abbinalo dopo a: Volt Club o Magazzini Generali.</em></li><li><strong>2. Backdoor 43 (Ripa di Porta Ticinese 43, Navigli):</strong> Il bar più piccolo del mondo (4 mq). Prenotabile in esclusiva da 1 a 4 persone con chiave privata, oppure drink take-away dalla feritoia servito dal bartender con maschera di V per Vendetta (12–18€).</li><li><strong>3. Nottingham Forest (Viale Piave 1, Porta Venezia):</strong> Il tempio mondiale della mixology molecolare di Dario Comini. Non accetta prenotazioni (arriva entro le 19:15 o dopo le 23:00; cocktail 15–20€). <em>Abbinalo dopo a: Just Me o Armani/Privé.</em></li><li><strong>4. Officina Milano (Via Giovenale 7, Navigli / Bocconi):</strong> Corte interna industriale con auto d'epoca, divani Chesterfield in pelle e oltre 400 distillati rari (14–18€).</li><li><strong>5. MAG La Pusterla & MAG Navigli (Via De Amicis 22 & Ripa Ticinese 43):</strong> I salotti bohemien dove nascono le tendenze della mixology milanese (12–16€).</li><li><strong>6. Moebius Milano (Via Alfredo Cappellini 25, Centrale / Porta Venezia):</strong> Ex magazzino tessile monumentale con vinili, tapas d'autore e cocktail sartoriali (14–18€).</li></ul>"
        }
      },
      {
        id: "next-6-bars-and-pairing",
        heading: {
          en: "3. Spots 7–12 & The Pre-Clubbing Itinerary to Your VIP Table",
          it: "3. Indirizzi 7–12 e l'Itinerario Pre-Clubbing Verso il Tuo Tavolo VIP"
        },
        content: {
          en: "<p>Rounding out the top 12: <strong>7. Nik's & Co.</strong> (Isola speakeasy), <strong>8. Botanical Club</strong> (Via Pastrengo 11 in Isola & Via Tortona 33 — Milan's first urban gin micro-distillery), <strong>9. Rita & Cocktails</strong> (Via Fumagalli 1, Navigli institution since 2002), <strong>10. Iter</strong> (fusion travel bar on Via Fusetti), <strong>11. Camparino in Galleria</strong> (Piazza del Duomo 21, historic icon since 1915), and <strong>12. Bar Basso</strong> (Via Plinio 39, home of the original Negroni Sbagliato).</p><p><strong>The Insider Pre-Clubbing Formula:</strong> Reserve your cocktail bar table from <strong>20:30 to 22:45</strong>, enjoy two craft cocktails, then take a 10-minute taxi directly to your reserved VIP Table at <strong>Just Me</strong>, <strong>Pineta</strong>, <strong>Aria Club</strong>, <strong>55 Milano</strong>, <strong>Voya Rooftop</strong>, or <strong>Repvblic</strong>.</p>",
          it: "<p>Completano la classifica dei 12 indirizzi d'élite: <strong>7. Nik's & Co.</strong> (speakeasy contemporaneo in Isola), <strong>8. Botanical Club</strong> (Via Pastrengo 11 in Isola e Via Tortona 33 — prima micro-distilleria urbana di gin a Milano), <strong>9. Rita & Cocktails</strong> (Via Fumagalli 1, istituzione dei Navigli dal 2002), <strong>10. Iter</strong> (Via Fusetti 1), <strong>11. Camparino in Galleria</strong> (Piazza del Duomo 21, leggenda dal 1915) e <strong>12. Bar Basso</strong> (Via Plinio 39, patria del Negroni Sbagliato).</p><p><strong>La Formula Pre-Clubbing Perfetta:</strong> Prenota lo speakeasy nello slot <strong>20:30–22:45</strong> per due drink d'autore, poi spostati in 10 minuti di taxi verso il tuo Tavolo VIP riservato da <strong>Just Me</strong>, <strong>Pineta</strong>, <strong>Aria Club</strong>, <strong>55 Milano</strong>, <strong>Voya Rooftop</strong> o <strong>Repvblic</strong>.</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "How do you get invited to 1930 Secret Cocktail Bar in Milan?", it: "Come si ottiene l'invito per entrare al 1930 Secret Bar di Milano?" },
        answer: {
          en: "1930 does not have a public booking link. Visit MAG Cafè (Ripa di Porta Ticinese 43) or MAG La Pusterla on a weekday evening, chat politely with the head bartenders about your spirit preferences, and ask if there is availability for two at 1930.",
          it: "Il 1930 non ha un sito di prenotazione pubblico. Frequenta il bancone del MAG Cafè (Ripa di Porta Ticinese 43) o del MAG La Pusterla in serata infrasettimanale, dialoga con i bartender sui tuoi distillati preferiti e chiedi con discrezione se c'è posto per due al 1930."
        }
      },
      {
        question: { en: "How much does a cocktail cost in a Milan speakeasy?", it: "Quanto costa un cocktail negli speakeasy di Milano?" },
        answer: {
          en: "Craft cocktails in Navigli and Isola speakeasies cost €12–€16, while molecular or invitation-only bars (1930, Nottingham Forest, Camparino Sala Spiritello) range from €16 to €25 per drink.",
          it: "I cocktail sartoriali sui Navigli e in Isola costano 12–16€, mentre negli speakeasy molecolari o su invito (1930, Nottingham Forest, Camparino) i prezzi variano tra 16€ e 25€ a drink."
        }
      }
    ]
  },

  // ─── 3. HOW TO BOOK A VIP TABLE PILLAR GUIDE ──────────────────────────────
  {
    id: "g-vip-tables",
    slugs: { en: "how-to-book-vip-table", it: "come-prenotare-tavolo-vip" },
    title: {
      en: "How to Book a VIP Table in Milan Like an Insider: Rules, Floorplans & Skip-the-Line Access",
      it: "Come Prenotare un Tavolo VIP a Milano da Insider: Regole, Mappe Privé e Salta-Fila"
    },
    excerpt: {
      en: "Master Milan's 100% minimum spend bottle credit system, choose between Dancefloor, Privé and DJ Console tables, and book with zero agency fees via WhatsApp.",
      it: "Padroneggia il sistema 100% minimum spend in bottiglie, scegli tra Pista, Privé e Console DJ e prenota a zero costi d'agenzia via WhatsApp."
    },
    author: "Nightlife Milan VIP Desk",
    datePublished: "2026-02-01T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/vip-table-milan-nightclub-just-me.webp",
    sections: [
      {
        id: "table-booking-basics",
        heading: {
          en: "1. How the 100% Minimum Spend System Works in Milan Nightclubs",
          it: "1. Come Funziona la Formula 100% Minimum Spend nei Club di Milano"
        },
        content: {
          en: "<p>Unlike London or US clubs that add 20–35% mandatory service charges and table rental fees on top of drinks, Milan nightclubs use a straightforward <strong>100% Minimum Spend Bottle Credit</strong> rule. If your VIP table at <strong>Just Me</strong> costs €500 for 8 guests, the entire €500 is credit you spend on champagne and spirit bottles from the club's official menu.</p><p>Included in every VIP Table reservation: <strong>6 to 12 VIP entry passes</strong> (no additional ticket charge at the door), <strong>dedicated VIP Hostess reception</strong> (zero queue), mixers (tonic, lemon, energy drinks, juices), ice, and table waiter service all night.</p>",
          it: "<p>A differenza dei club di Londra o Miami che aggiungono il 25–35% di tasse e affitto tavolo, le discoteche di Milano applicano la regola trasparente del <strong>100% Minimum Spend convertito in bottiglie</strong>. Se il tuo tavolo VIP al <strong>Just Me</strong> ha un minimo di 500€ per 8 persone, l'intero importo di 500€ viene speso in bottiglie di champagne o superalcolici scelte dal listino del locale.</p><p>Ogni tavolo VIP include: <strong>da 6 a 12 pass d'ingresso</strong> (nessun biglietto extra alla cassa), <strong>accoglienza Hostess VIP salta-fila</strong>, ghiaccio, soft drink (tonica, lemon, succhi, red bull) e cameriere dedicato tutta la notte.</p>"
        }
      },
      {
        id: "pista-vs-prive-vs-console",
        heading: {
          en: "2. Dancefloor vs Balcony Privé vs DJ Console Super Privé: Which Should You Choose?",
          it: "2. Tavolo Pista vs Balconata Privé vs Super Privé Console DJ: Quale Scegliere?"
        },
        content: {
          en: "<ul><li><strong>Dancefloor Table (Tavolo Pista — €250 to €500):</strong> Located around the main dancefloor perimeter. Maximum energy, immediate contact with the crowd, lowest per-person cost (€35–€65/person). Best at <em>Pineta, Aria Club, 55 Milano, Play Club, Repvblic</em>.</li><li><strong>Elevated Privé / Balcony (Tavolo Privé — €500 to €1,200):</strong> Roped-off elevated area with plush banquettes, private security guard checking wristbands, and clearer sightlines. Best at <em>Just Me (Privé Branca), Aria Club (Privé Aria), Voya Rooftop (Window VIP), Gattopardo</em>.</li><li><strong>DJ Console Super Privé (€1,200 to €5,000+):</strong> Directly beside or behind the DJ booth. Where celebrities, footballers, fashion designers, and international VIPs sit. Includes custom sparkler bottle parades for Dom Pérignon, Cristal, Armand de Brignac, and Clase Azul.</li></ul>",
          it: "<ul><li><strong>Tavolo Pista (€250 – €500):</strong> Posizionato a bordo pista centrale. Massima energia, contatto diretto con la festa e quota a persona super accessibile (35–65€/persona). Ideale da <em>Pineta, Aria Club, 55 Milano, Play Club, Repvblic</em>.</li><li><strong>Tavolo Privé Rialzato / Balconata (€500 – €1.200):</strong> Area rialzata delimitata da cordone con bodyguard dedicato al controllo braccialetti, divani più ampi e vista panoramica sulla sala. Perfetto da <em>Just Me (Privé Branca), Aria Club (Privé Aria), Voya Rooftop (Tavolo Vetrata) e Gattopardo</em>.</li><li><strong>Super Privé Console DJ (€1.200 – €5.000+):</strong> A fianco o dietro la console del DJ. È il palco scelto da calciatori, stilisti, ospiti internazionali e chi desidera bottle show con Dom Pérignon, Cristal, Armand de Brignac e Clase Azul.</li></ul>"
        }
      },
      {
        id: "step-by-step-whatsapp-booking",
        heading: {
          en: "3. Step-by-Step: How to Reserve in Under 10 Minutes via WhatsApp (+39 351 912 7047)",
          it: "3. Procedura Passo-Passo: Come Prenotare in 10 Minuti su WhatsApp (+39 351 912 7047)"
        },
        content: {
          en: "<ol><li><strong>Message our Concierge (+39 351 912 7047):</strong> Send your date, total guests (specifying how many men and women), and preferred club or music style.</li><li><strong>Receive Official Floorplans & Bottle Lists:</strong> Within 10 minutes we send you the updated club map highlighting open tables and the exact bottle price list.</li><li><strong>Confirm Your Table Name:</strong> No upfront payment is required on standard nights (a deposit is only requested on New Year's Eve, Halloween, or major international guest DJ concerts).</li><li><strong>Arrive as a VIP:</strong> Walk straight to the 'Tavoli / VIP' desk at the entrance, state your reservation name, and let the hostess escort you to your booth.</li></ol>",
          it: "<ol><li><strong>Scrivi al Concierge (+39 351 912 7047):</strong> Indica data, numero totale di persone (specificando quanti uomini e quante donne) e il locale o genere musicale preferito.</li><li><strong>Ricevi Mappa Tavoli e Listino Bottiglie:</strong> Entro 10 minuti ti inviamo la planimetria ufficiale del club con i tavoli liberi e il listino bottiglie aggiornato.</li><li><strong>Conferma il Nome del Tavolo:</strong> Nelle serate ordinarie il pagamento avviene direttamente alla cassa VIP del locale all'arrivo (l'acconto è richiesto solo per Capodanno, Halloween o grandi concerti internazionali).</li><li><strong>Arrivo Salta-Fila:</strong> Presentati direttamente alla corsia 'Tavoli / VIP', comunica il nome della prenotazione e segui la hostess fino al tuo divanetto.</li></ol>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Do I pay Nightlife Milan a commission for booking a VIP table?", it: "Devo pagare una commissione a Nightlife Milan per prenotare un tavolo VIP?" },
        answer: {
          en: "Never. Our concierge service is 100% free for guests. You pay the exact official club price directly at the venue's VIP desk.",
          it: "Mai. Il nostro servizio Concierge è gratuito al 100% per i clienti. Paghi esattamente il prezzo ufficiale del listino direttamente alla cassa VIP del locale."
        }
      },
      {
        question: { en: "What happens if we spend more than the minimum spend?", it: "Cosa succede se ordiniamo bottiglie oltre il minimum spend?" },
        answer: {
          en: "You can order additional bottles at any point during the night directly through your table waiter at the standard menu price.",
          it: "Potete ordinare bottiglie aggiuntive in qualsiasi momento della serata direttamente al vostro cameriere al prezzo ufficiale di listino."
        }
      }
    ]
  },

  // ─── 4. THE SOUND & FACES OF MILAN (7 INTERVIEWS) PILLAR GUIDE ────────────
  {
    id: "g-dj-interview",
    slugs: { en: "interview-sound-of-milan", it: "intervista-sound-of-milan" },
    title: {
      en: "The Sound & Faces of Milan: 7 Exclusive Interviews with Resident DJs, Door Selectors & VIP Hosts",
      it: "Il Suono e i Volti di Milano: 7 Interviste Esclusive a DJ Resident, Door Selector e VIP Host"
    },
    excerpt: {
      en: "Go behind the velvet rope and inside the DJ booth with 7 protagonists who run Milan's top clubs every night.",
      it: "Entra dietro il cordone di velluto e nella console con i 7 protagonisti che guidano ogni notte i migliori club di Milano."
    },
    author: "Nightlife Milan Editorial Team",
    datePublished: "2026-03-01T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/milan-club-crowd-dancefloor-night.webp",
    sections: [
      {
        id: "sound-architecture",
        heading: {
          en: "1. Resident DJs of Parco Sempione & Corso Como: Reading the Room from 23:30 to 04:30",
          it: "1. I DJ Resident di Parco Sempione e Corso Como: Leggere la Pista dalle 23:30 alle 04:30"
        },
        content: {
          en: "<p><strong>Interview #1 — Marco V. (12 years in the booth across Just Me, Pineta & Corso Como):</strong> <em>«In Milan, a great set is architectural. Between 23:30 and 01:00, as VIP tables arrive from dinner, we lay down warm Afro-House and vocal Deep House at 122 BPM so people can talk, toast, and settle in. At 01:15, when the first champagne sparklers light up the room, we shift into high-energy vocal edits, Latin-tech grooves, and timeless sing-along anthems that keep both international fashion guests and Milanese regulars on their feet until 4:30 AM.»</em></p><p><strong>Interview #2 — Elena R. (Techno & Underground Selector across Volt, Magazzini Generali & Amnesia):</strong> <em>«Milan's electronic crowd has tremendous musical literacy. At Volt or Magazzini Generali, people come for the sound system and hypnotic storytelling—blending Melodic Techno with raw 909 percussion.»</em></p>",
          it: "<p><strong>Intervista #1 — Marco V. (12 anni in console tra Just Me, Pineta e Corso Como):</strong> <em>«A Milano un grande DJ set è architettura pura. Tra le 23:30 e l'01:00, mentre i tavoli VIP entrano dopo cena, costruiamo il tappeto sonoro con Afro-House calda e Vocal Deep a 122 BPM. All'01:15, quando si accendono le prime fontane luminose sulle bottiglie di Dom Pérignon, alziamo la pressione con edit vocali esclusivi, groove Latin-House e hit cantate che uniscono i tavoli internazionali e i milanesi fino alle 4:30 del mattino.»</em></p><p><strong>Intervista #2 — Elena R. (Selettore Techno & Underground tra Volt, Magazzini Generali e Amnesia):</strong> <em>«Il pubblico elettronico milanese ha una cultura musicale altissima: da Volt o ai Magazzini Generali si entra per la purezza dell'impianto acustico e per il viaggio ipnotico tra Melodic Techno e cassa dritta.»</em></p>"
        }
      },
      {
        id: "door-selectors-and-vip-hosts",
        heading: {
          en: "2. The Velvet Rope Director & The Senior VIP Hostess: What Really Happens at the Door",
          it: "2. Il Direttore di Porta e la Responsabile Privé: Cosa Succede Davvero all'Ingresso"
        },
        content: {
          en: "<p><strong>Interview #3 — Lorenzo M. (Head Door Selector):</strong> <em>«People think door selection is about wearing a €2,000 jacket. It isn't. It's about energy and respect. Say 'Buonasera', have your reservation or list name ready, don't crowd the ropes with ten loud guys, and wear a clean shirt and leather shoes. And if you are a large group of men on Saturday, book a table through the Concierge—you walk straight through my VIP lane with zero friction.»</em></p><p><strong>Interview #4 — Sofia B. (Head of VIP Privé Operations at Just Me, Aria & Voya):</strong> <em>«When a group books through Nightlife Milan (+39 351 912 7047), we already know their bottle preferences, whether they are celebrating a graduation or birthday, and which table gives them the best view.»</em></p>",
          it: "<p><strong>Intervista #3 — Lorenzo M. (Direttore di Porta nei Top Club):</strong> <em>«Molti credono che la selezione dipenda dal prezzo della giacca. In realtà guardiamo l'atteggiamento e l'armonia: salutare con un 'Buonasera', avere il nome della prenotazione pronto, non spingere sulle transenne e indossare una camicia curata con scarpa in pelle. E se siete un gruppo di ragazzi il sabato sera, prenotate il tavolo col Concierge: entrate dalla mia corsia VIP in trenta secondi.»</em></p><p><strong>Intervista #4 — Sofia B. (Responsabile Accoglienza Privé tra Just Me, Aria e Voya):</strong> <em>«Quando un cliente prenota con il desk WhatsApp di Nightlife Milan (+39 351 912 7047), sappiamo già prima del suo arrivo quali bottiglie preferisce, se festeggia una laurea o un compleanno e quale divanetto gli regala la vista migliore sulla console.»</em></p>"
        }
      },
      {
        id: "dinner-show-and-university-insiders",
        heading: {
          en: "3. Dinner Show Art Directors, Rooftop Managers & University Night Promoters",
          it: "3. Registi dei Dinner Show, Direttori Rooftop e Coordinatori delle Notti Universitarie"
        },
        content: {
          en: "<p><strong>Interview #5 — Alessandro T. (Dinner Show Director at Pineta & 55 Milano):</strong> <em>«The Singing Aperitivo and Dinner Show changed Milan forever. At Pineta on Friday or 55 Milano, by 21:30 the entire room is standing on chairs waving napkins and singing Italian and international classics before the club beat drops at midnight.»</em></p><p><strong>Interview #6 — Giulia L. (Sky Lounge Manager at Voya Rooftop 20th Floor):</strong> <em>«Nothing beats watching the sun dip behind the Alps and CityLife towers from the 20th floor with a signature cocktail in hand.»</em></p><p><strong>Interview #7 — Davide C. (University & Graduation Night Coordinator):</strong> <em>«With Bocconi, Cattolica, Politecnico, NABA, and IULM, Milan is Europe's most vibrant student nightlife city. Combining a reserved Royal Aperitivo area with a Dancefloor Table is the #1 formula for graduation parties.»</em></p>",
          it: "<p><strong>Intervista #5 — Alessandro T. (Art Director Dinner Show tra Pineta e 55 Milano):</strong> <em>«L'Aperitivo Cantato e la Cena Spettacolo hanno rivoluzionato il weekend milanese: al Pineta il venerdì o al 55 Milano, già alle 21:30 tutta la sala canta a squarciagola prima che a mezzanotte parta il DJ set.»</em></p><p><strong>Intervista #6 — Giulia L. (Sky Lounge Manager da Voya Rooftop al 20° Piano):</strong> <em>«Vedere il tramonto dietro le torri di Milano dal ventesimo piano mentre il lounge bar si trasforma in club è l'esperienza più richiesta dalle coppie e dai gruppi internazionali.»</em></p><p><strong>Intervista #7 — Davide C. (Coordinatore Notti Universitarie e Feste di Laurea):</strong> <em>«Tra Bocconi, Cattolica, Politecnico, IULM e NABA, Milano vive ogni settimana centinaia di feste di laurea: il pacchetto Royal Aperitivo riservato + Tavolo Dopocena è la formula perfetta per unire brindisi, buffet e discoteca.»</em></p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "What time does the music switch from Aperitivo/Dinner to full clubbing?", it: "A che ora la musica passa dall'Aperitivo/Cena alla vera discoteca?" },
        answer: {
          en: "Between 19:30 and 22:30 venues play lounge, deep house, or singing aperitivo anthems. The club DJ set officially kicks off between 23:30 and midnight, peaking from 01:00 to 03:30 AM.",
          it: "Tra le 19:30 e le 22:30 i locali propongono musica lounge, deep house o hit da aperitivo cantato. Il DJ set da club inizia tra le 23:30 e mezzanotte, con picco massimo tra l'01:00 e le 03:30."
        }
      }
    ]
  },

  // ─── 5. BEST TECHNO & ELECTRONIC CLUBS PILLAR GUIDE ───────────────────────
  {
    id: "g-techno-2026",
    slugs: { en: "where-to-find-best-techno-2026", it: "dove-trovare-migliore-techno-2026" },
    title: {
      en: "Best Techno, Afro-House & Electronic Clubs in Milan (2026/2027): Warehouses, Sound Systems & Line-Ups",
      it: "I Migliori Club Techno, Afro-House ed Elettronici a Milano (2026/2027): Warehouse e Sound System"
    },
    excerpt: {
      en: "The complete guide to Milan's electronic underground: Volt Club, Magazzini Generali, Amnesia, Fabrique, Repvblic, and industrial warehouses.",
      it: "La guida completa alla scena elettronica e techno di Milano: Volt Club, Magazzini Generali, Amnesia, Fabrique, Repvblic e i warehouse industriali."
    },
    author: "Underground & Electronic Editor",
    datePublished: "2026-03-01T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/club-techno.webp",
    relatedGenres: [MusicGenre.TECHNO, MusicGenre.HOUSE],
    sections: [
      {
        id: "the-new-wave",
        heading: {
          en: "1. Milan's Electronic Renaissance: From Intimate Bunkers to 3,000-Capacity Warehouses",
          it: "1. Il Rinascimento Elettronico di Milano: Dai Club Intimi ai Warehouse da 3.000 Persone"
        },
        content: {
          en: "<p>Milan is Italy's undisputed capital of electronic and techno clubbing. Because Milan hosts global fashion weeks and design fairs, the world's top selectors—from Tale Of Us, Keinemusik, and Marco Carola to Peggy Gou, Indira Paganotto, and I Hate Models—play Milan regularly between October and May.</p>",
          it: "<p>Milano è la capitale indiscussa del clubbing elettronico e techno in Italia. Grazie all'attrattività internazionale della città, i più grandi DJ del pianeta — da Tale Of Us, Keinemusik e Marco Carola fino a Peggy Gou, Joseph Capriati e Indira Paganotto — suonano regolarmente nei club milanesi tra ottobre e maggio.</p>"
        }
      },
      {
        id: "top-techno-venues-ranking",
        heading: {
          en: "2. The Top Electronic & Techno Venues in Milan Ranked by Sound & Vibe",
          it: "2. La Classifica dei Migliori Locali Techno ed Elettronici di Milano"
        },
        content: {
          en: "<ul><li><strong>1. Volt Club Milano:</strong> Intimate, dark, custom sound system, strict low-light policy, and world-class Melodic Techno / Afro-Tech bookings. VIP Backstage & Balcony tables from €400–€1,200.</li><li><strong>2. Magazzini Generali (Via Pietrasanta 16, Porta Romana / Ripamonti):</strong> Historic 1910 railway freight warehouse with towering iron trusses, mezzanine balcony VIP tables (€300–€800), and legendary Friday/Saturday international guest nights.</li><li><strong>3. Amnesia Milano (Via Gatto / Forlanini):</strong> Over two decades of pure Tech-House and Techno with L-Acoustics sound and Backstage Console Privé (€500–€1,500).</li><li><strong>4. Fabrique Milano (Via Fantoli 9, Mecenate):</strong> 3,000-capacity industrial arena hosting marathon electronic showcases and live tours.</li><li><strong>5. Repvblic Milano (#6 Priority):</strong> High-impact LED and sound architecture blending cutting-edge House, Tech-House, and urban grooves.</li></ul>",
          it: "<ul><li><strong>1. Volt Club Milano:</strong> Intimo, minimale, impianto acustico calibrato al millimetro e programmazione Melodic Techno e Afro-Tech di livello mondiale. Tavoli Privé e Backstage da 400–1.200€.</li><li><strong>2. Magazzini Generali (Via Pietrasanta 16, Porta Romana / Ripamonti):</strong> Storico magazzino ferroviario del 1910 con balconata VIP rialzata sulla pista (tavoli 300–800€) e guest DJ internazionali ogni weekend.</li><li><strong>3. Amnesia Milano (Via Alfonso Gatto / Forlanini):</strong> Oltre vent'anni di storia Tech-House e Techno con impianto L-Acoustics e Privé Console dietro al DJ (500–1.500€).</li><li><strong>4. Fabrique Milano (Via Fantoli 9, Mecenate):</strong> Arena industriale da 3.000 persone per i grandi festival elettronici e le maratone notturne.</li><li><strong>5. Repvblic Milano (#6 Priorità):</strong> Design club d'avanguardia con architettura luminosa immersiva e sound House / Tech-House ad altissima energia.</li></ul>"
        }
      },
      {
        id: "techno-vip-tables-and-tickets",
        heading: {
          en: "3. How Backstage Console Tables & Tickets Work at Electronic Nights",
          it: "3. Come Funzionano i Tavoli Backstage Console e gli Ingressi nelle Serate Techno"
        },
        content: {
          en: "<p>On international guest DJ nights, standard early-bird tickets sell out days in advance. Reserving a <strong>Balcony or Backstage Console VIP Table</strong> via WhatsApp (<strong>+39 351 912 7047</strong>) guarantees immediate skip-the-line access for your group of 6–12 friends, private security, and full bottle service steps away from the headliner.</p>",
          it: "<p>Nelle serate con grandi guest DJ internazionali i biglietti early-bird vanno sold-out con giorni di anticipo. Prenotare un <strong>Tavolo VIP in Balconata o nel Backstage Console</strong> tramite WhatsApp (<strong>+39 351 912 7047</strong>) garantisce al tuo gruppo di 6–12 amici ingresso salta-fila immediato, braccialetto backstage e servizio bottiglie a due metri dall'artista.</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "What is the dress code at Milan techno clubs like Volt and Magazzini Generali?", it: "Qual è il dress code nei club techno di Milano come Volt e Magazzini Generali?" },
        answer: {
          en: "Total black or minimal dark streetwear with comfortable dark sneakers or boots. Avoid flashy suits or sportswear jerseys.",
          it: "Total black o streetwear minimale scuro con sneakers scure o stivali comodi per ballare. Evita abiti gessati formali o maglie da calcio."
        }
      }
    ]
  },

  // ─── 6. [NEW RANK INTEL #1] VIP TABLE & BOTTLE SERVICE PRICES 2026/2027 ───
  {
    id: "g-vip-bottle-prices",
    slugs: {
      en: "vip-table-bottle-service-prices-milan",
      it: "prezzi-tavoli-vip-bottiglie-discoteche-milano"
    },
    title: {
      en: "Milan VIP Table & Bottle Service Prices 2026/2027: Official Club Minimum Spends & Menus",
      it: "Prezzi Tavoli VIP, Privé e Listini Bottiglie nelle Discoteche di Milano 2026/2027"
    },
    excerpt: {
      en: "How much does a VIP table or bottle cost at Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic, and Armani/Privé? Complete 2026/2027 price tables.",
      it: "Quanto costa un tavolo VIP o una bottiglia da Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic e Armani/Privé? Tutte le tabelle prezzi 2026/2027."
    },
    author: "Nightlife Milan VIP Concierge",
    datePublished: "2026-10-15T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/bottle-prices-hero.webp",
    sections: [
      {
        id: "minimum-spend-table-2026",
        heading: {
          en: "1. Complete 2026/2027 VIP Table Minimum Spend Chart Across Milan's Top Clubs",
          it: "1. Tabella Ufficiale Minimum Spend Tavoli VIP 2026/2027 nei Migliori Club di Milano"
        },
        content: {
          en: "<p>Here are the verified 2026/2027 minimum spend requirements (100% converted into bottles for 6–10 guests) across Milan's top priority clubs:</p><ul><li><strong>1. Just Me Milano (Parco Sempione):</strong> Weekday Dancefloor €320–€400 · Weekend Dancefloor €500 · Privé Branca €800–€1,200 · Super Privé DJ Console €1,500–€5,000+.</li><li><strong>2. Pineta Club (Corso Como):</strong> Singing Aperitivo Table €25–€35/person · Club Dancefloor €300–€400 · VIP Privé €500–€800.</li><li><strong>3. Aria Club Milano (San Siro):</strong> Aperitivo Table €25–€35/person · Dancefloor Table €250–€350 · Privé Aria €450–€600 · Privé Console DJ €700–€1,200.</li><li><strong>4. 55 Milano (Sempione / Arco della Pace):</strong> Reserved Apericena Table €20–€35/person · Dinner Show €50–€70/person · After-Dinner Bottle Table €200–€450.</li><li><strong>5. Voya Rooftop (Isola 20th Floor):</strong> Sunset Lounge Table €200–€300 · Night Skyline VIP Table €400–€800.</li><li><strong>6. Repvblic Milano (Repubblica):</strong> Dancefloor €250–€350 · Privé €500–€900 · Console €1,000+.</li><li><strong>Armani/Privé & Gattopardo:</strong> Dancefloor/Lounge €500–€600 · Weekend Privé €1,000–€3,000+.</li></ul>",
          it: "<p>Ecco i listini minimum spend verificati 2026/2027 (100% convertiti in bottiglie per gruppi di 6–10 persone) nei club prioritari di Milano:</p><ul><li><strong>1. Just Me Milano (Parco Sempione):</strong> Pista Infrasettimanale 320–400€ · Pista Weekend 500€ · Privé Branca 800–1.200€ · Super Privé Console DJ 1.500–5.000€+.</li><li><strong>2. Pineta Club (Corso Como):</strong> Tavolo Aperitivo Cantato 25–35€/pax · Tavolo Pista Dopocena 300–400€ · Privé VIP 500–800€.</li><li><strong>3. Aria Club Milano (San Siro):</strong> Tavolo Aperitivo 25–35€/pax · Tavolo Pista 250–350€ · Privé Aria 450–600€ · Privé Console DJ 700–1.200€.</li><li><strong>4. 55 Milano (Sempione / Piero della Francesca):</strong> Tavolo Apericena Riservato 20–35€/pax · Cena Cantata 50–70€/pax · Tavolo Bottiglia Dopocena 200–450€.</li><li><strong>5. Voya Rooftop (Isola 20° Piano):</strong> Tavolo Sunset Aperitivo 200–300€ · Tavolo VIP Skyline Dopocena 400–800€.</li><li><strong>6. Repvblic Milano (Repubblica):</strong> Pista 250–350€ · Privé 500–900€ · Console 1.000€+.</li><li><strong>Armani/Privé & Gattopardo:</strong> Lounge/Pista 500–600€ · Privé Weekend 1.000–3.000€+.</li></ul>"
        }
      },
      {
        id: "bottle-menu-vodka-champagne-tequila",
        heading: {
          en: "2. Bottle Menu Prices: Vodka, Gin, Tequila (Clase Azul / Don Julio 1942) & Champagne",
          it: "2. Prezzi Singole Bottiglie: Vodka, Gin, Tequila (Clase Azul / Don Julio 1942) e Champagne"
        },
        content: {
          en: "<p>What does your table credit buy on the bottle list?</p><ul><li><strong>Premium Vodka & Gin (0.70L — Belvedere, Grey Goose, Hendrick's, Gin Mare):</strong> €180–€250 in mid/chic clubs; €250–€320 at Just Me and Armani/Privé.</li><li><strong>Magnum Vodka (1.5L / 1.75L — Belvedere Luminous, Grey Goose):</strong> €420–€650.</li><li><strong>Ultra-Premium Tequila (Don Julio 1942, Clase Azul Reposado):</strong> €450–€850 per bottle (the #1 status symbol in Milan Privé areas in 2026/2027).</li><li><strong>Brut & Rosé Champagne (Moët & Chandon, Veuve Clicquot, Ruinart Blanc de Blancs):</strong> €200–€380.</li><li><strong>Prestige Cuvée Champagne (Dom Pérignon Vintage, Dom Pérignon Rosé, Louis Roederer Cristal, Armand de Brignac Ace of Spades):</strong> €550–€1,200 (Standard 0.75L) and €1,400–€3,500 (Magnum 1.5L).</li></ul>",
          it: "<p>Cosa si ordina concretamente con il credito del tavolo?</p><ul><li><strong>Vodka & Gin Premium (0,70L — Belvedere, Grey Goose, Hendrick's, Gin Mare):</strong> 180–250€ nei club smart-chic; 250–320€ da Just Me e Armani/Privé.</li><li><strong>Formati Magnum (1,5L / 1,75L — Belvedere Luminous, Grey Goose):</strong> 420–650€.</li><li><strong>Tequila Ultra-Premium (Don Julio 1942, Clase Azul Reposado):</strong> 450–850€ a bottiglia (la scelta più richiesta nei Privé milanesi nel 2026/2027).</li><li><strong>Champagne Brut & Rosé (Moët & Chandon, Veuve Clicquot, Ruinart Blanc de Blancs):</strong> 200–380€.</li><li><strong>Champagne Cuvée Prestige (Dom Pérignon Vintage, Cristal, Armand de Brignac Ace of Spades):</strong> 550–1.200€ (formato 0,75L) e 1.400–3.500€ (formato Magnum 1,5L).</li></ul>"
        }
      },
      {
        id: "how-to-split-cost-group",
        heading: {
          en: "3. Why a VIP Table Often Costs Only €15–€20 More Per Person Than Normal Entry",
          it: "3. Perché un Tavolo VIP Costa Spesso Solo 15–20€ in Più a Persona Rispetto all'Ingresso Normale"
        },
        content: {
          en: "<p>Do the math: regular weekend door entry at a top Milan club costs €25–€35 (with 1 drink), and buying a second drink at the bar costs €15–€20—totaling <strong>€40–€55 per person</strong> while standing in line for 45 minutes with nowhere to sit.</p><p>By booking a €350 Dancefloor VIP Table for 7 friends (<strong>€50 per person</strong>), you skip the queue entirely, get a reserved sofa all night, and receive two premium bottles with mixers (roughly 28 drinks).</p>",
          it: "<p>Fai il calcolo reale: l'ingresso singolo nel weekend costa 25–35€ (con 1 drink) e un secondo cocktail al bar costa 15–20€, per un totale di <strong>40–55€ a persona</strong> facendo 45 minuti di coda e restando in piedi tutta la notte.</p><p>Prenotando un Tavolo VIP da 350€ diviso tra 7 amici (<strong>50€ a persona</strong>), saltate completamente la fila con la hostess, avete il vostro divanetto riservato fino alle 5 del mattino e due bottiglie con soft drink inclusi.</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Can we split the VIP table bill with separate cards at the club?", it: "Possiamo dividere il conto del tavolo VIP pagando con più carte alla cassa?" },
        answer: {
          en: "Yes! Every Milan club VIP cashier allows your group to split the minimum spend across multiple credit/debit cards or cash upon arrival.",
          it: "Sì! Tutte le casse Tavoli VIP dei club di Milano permettono di dividere l'importo del tavolo pagando ciascuno la propria quota con carta o contanti al momento dell'ingresso."
        }
      }
    ]
  },

  // ─── 7. [NEW RANK INTEL #2] WEEKLY NIGHTLIFE CALENDAR MON–SUN ─────────────
  {
    id: "g-weekly-calendar",
    slugs: {
      en: "weekly-nightlife-calendar-milan-monday-sunday",
      it: "calendario-settimanale-serate-milano-lunedi-domenica"
    },
    title: {
      en: "Milan Weekly Nightlife Calendar 2026/2027: Where to Party Every Night from Monday to Sunday",
      it: "Calendario Settimanale Serate Milano 2026/2027: Dove Andare a Ballare dal Lunedì alla Domenica"
    },
    excerpt: {
      en: "Which clubs are open in Milan on Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday? The definitive 7-day insider schedule.",
      it: "Quali discoteche sono aperte a Milano il lunedì, martedì, mercoledì, giovedì, venerdì, sabato e domenica? La guida insider 7 sere su 7."
    },
    author: "Nightlife Milan Editorial Team",
    datePublished: "2026-10-15T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp",
    sections: [
      {
        id: "monday-tuesday-wednesday",
        heading: {
          en: "1. Monday, Tuesday & Wednesday: Where Milan Parties Midweek",
          it: "1. Lunedì, Martedì e Mercoledì: I Migliori Locali Aperti in Settimana a Milano"
        },
        content: {
          en: "<ul><li><strong>Monday Night:</strong> <strong>Repvblic Milano (#6 Priority)</strong> hosts the legendary <em>Dirty Monday</em> (hip-hop, urban & house with models and industry insiders), while <strong>Just Me Milano (#1 Priority)</strong> is open from 19:30 to 05:00 beneath Torre Branca.</li><li><strong>Tuesday Night:</strong> <strong>55 Milano (#4 Priority)</strong> for XXL Apericena, <strong>Voya Rooftop (#5 Priority)</strong> for 20th-floor skyline drinks, <strong>Just Me</strong> in Sempione, and <strong>The Club</strong> (Corso Garibaldi) for international/hip-hop night.</li><li><strong>Wednesday Night:</strong> International & University peak at <strong>Just Me Milano</strong>, <strong>11Clubroom</strong> (Corso Como), <strong>Voya Rooftop</strong>, and <strong>55 Milano</strong>.</li></ul>",
          it: "<ul><li><strong>Lunedì Sera:</strong> <strong>Repvblic Milano (#6 Priorità)</strong> accende la città con il celebre <em>Dirty Monday</em> (hip-hop, house e pubblico moda), mentre <strong>Just Me Milano (#1 Priorità)</strong> è aperto dalle 19:30 alle 05:00 sotto la Torre Branca.</li><li><strong>Martedì Sera:</strong> <strong>55 Milano (#4 Priorità)</strong> per l'Apericena XL in Via Piero della Francesca, <strong>Voya Rooftop (#5 Priorità)</strong> al 20° piano, <strong>Just Me</strong> in Sempione e <strong>The Club</strong> in Corso Garibaldi.</li><li><strong>Mercoledì Sera:</strong> La notte internazionale e universitaria da <strong>Just Me Milano</strong>, <strong>11Clubroom</strong> in Corso Como, <strong>Voya Rooftop</strong> e <strong>55 Milano</strong>.</li></ul>"
        }
      },
      {
        id: "thursday-friday-saturday-sunday",
        heading: {
          en: "2. Thursday to Sunday: The Peak Weekend Schedule Across the Top 6 Venues",
          it: "2. Dal Giovedì alla Domenica: Il Programma del Weekend nei 6 Club Prioritari"
        },
        content: {
          en: "<ul><li><strong>Thursday Night:</strong> <strong>Aria Club Milano (#3 Priority)</strong> opens its San Siro weekend with buffet and 3 VIP zones; <strong>Just Me (#1)</strong> hosts Fashion Thursday; <strong>55 Milano (#4)</strong> hosts graduation and birthday celebrations.</li><li><strong>Friday Night:</strong> The iconic <em>Singing Aperitivo</em> at <strong>Pineta Club (#2 Priority)</strong> in Corso Como, luxury clubbing at <strong>Just Me (#1)</strong>, <strong>Aria Club (#3)</strong>, Friday Dinner Show at <strong>55 Milano (#4)</strong>, sky lounge DJ set at <strong>Voya Rooftop (#5)</strong>, and techno at <strong>Volt / Magazzini Generali</strong>.</li><li><strong>Saturday Night:</strong> Full capacity across all 6 Priority Venues (<strong>Just Me, Pineta, Aria, 55 Milano 'The Wall', Voya Rooftop, Repvblic</strong>) plus <strong>Armani/Privé</strong> and <strong>Gattopardo</strong>.</li><li><strong>Sunday Night:</strong> Sunset Aperitivo at <strong>Voya Rooftop (#5)</strong>, Sunday Latin Party at <strong>55 Milano (#4)</strong>, and Fashion Sunday at <strong>Just Me (#1)</strong>.</li></ul>",
          it: "<ul><li><strong>Giovedì Sera:</strong> <strong>Aria Club Milano (#3 Priorità)</strong> inaugura il weekend a San Siro con buffet e 3 aree privé; <strong>Just Me (#1)</strong> lancia il giovedì fashion; <strong>55 Milano (#4)</strong> accoglie lauree e compleanni.</li><li><strong>Venerdì Sera:</strong> Il leggendario <em>Aperitivo Cantato</em> del <strong>Pineta Club (#2 Priorità)</strong> in Via Messina 38, il gran venerdì di <strong>Just Me (#1)</strong>, <strong>Aria Club (#3)</strong>, il Friday Dinner Show di <strong>55 Milano (#4)</strong> e lo skyline di <strong>Voya Rooftop (#5)</strong>.</li><li><strong>Sabato Sera:</strong> Gran Gala in tutti i 6 Club Prioritari (<strong>Just Me, Pineta, Aria, 55 Milano 'The Wall', Voya Rooftop, Repvblic</strong>) oltre ad <strong>Armani/Privé</strong> e <strong>Gattopardo</strong>.</li><li><strong>Domenica Sera:</strong> Sunset Aperitivo da <strong>Voya Rooftop (#5)</strong>, Domenica Latino-Americana da <strong>55 Milano (#4)</strong> e Sunday Night da <strong>Just Me (#1)</strong>.</li></ul>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Which club in Milan is open 7 nights a week?", it: "Quale discoteca di Milano è aperta 7 sere su 7?" },
        answer: {
          en: "Just Me Milano (Viale Luigi Camoens 2, Parco Sempione) is open every single night from Monday to Sunday starting at 19:30 for Royal Aperitivo and continuing until 05:00 AM.",
          it: "Il Just Me Milano (Viale Luigi Camoens 2, Parco Sempione) è aperto 7 sere su 7 dal lunedì alla domenica, dalle 19:30 per il Royal Aperitivo fino alle 05:00 del mattino."
        }
      }
    ]
  },

  // ─── 8. [NEW RANK INTEL #3] BEST ROOFTOP BARS & PANORAMIC TERRACES ────────
  {
    id: "g-rooftops-milan",
    slugs: {
      en: "best-rooftop-bars-panoramic-terraces-milan",
      it: "migliori-rooftop-terrazze-panoramiche-milano"
    },
    title: {
      en: "Best Rooftop Bars & Sky Lounges in Milan (2026/2027): Sunset Aperitivo & Skyline DJ Sets",
      it: "I Migliori Rooftop, Terrazze Panoramiche e Sky Lounge a Milano (2026/2027): Aperitivo e DJ Set"
    },
    excerpt: {
      en: "From the 20th floor of Voya Rooftop to the Cathedral spires at Terrazza Duomo 21 and the pools of Ceresio 7: where to drink and dance above Milan.",
      it: "Dal 20° piano di Voya Rooftop alle guglie di Terrazza Duomo 21 fino alle piscine di Ceresio 7: dove fare aperitivo e ballare sui tetti di Milano."
    },
    author: "Nightlife Milan Rooftop & Aperitivo Desk",
    datePublished: "2026-10-18T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/voya-rooftop-milan.webp",
    sections: [
      {
        id: "rooftop-ranking-milan",
        heading: {
          en: "1. The Definitive Ranking of Milan's Top Panoramic Rooftops (Open Year-Round)",
          it: "1. La Classifica Definitiva dei Migliori Rooftop Panoramici di Milano (Aperti Tutto l'Anno)"
        },
        content: {
          en: "<p>With Rank Intel recording an Opportunity Score of <strong>88/100</strong> for Milan rooftop bars, sky lounges are the most requested venues for sunset aperitivo, dates, corporate events, and chic late-night DJ sets. Importantly, Milan's top rooftops feature climate-controlled panoramic glass lounges so they operate 12 months a year:</p><ul><li><strong>1. Voya Rooftop Milan (#5 Priority — Via Achille Papa 30, 20th Floor):</strong> Perched on the 20th floor with 360-degree floor-to-ceiling glass overlooking the CityLife and Porta Nuova skyscrapers. Sunset Aperitivo from 18:00 (€20–€30) seamlessly transitioning into a sophisticated Lounge & Deep House club night with window VIP tables (€250–€600).</li><li><strong>2. Terrazza Duomo 21 (Piazza del Duomo 21):</strong> Eye-level view of the illuminated Madonnina and Cathedral spires. Aperitivo from 18:00 and late-night DJ set until 02:00 AM.</li><li><strong>3. Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta / Isola):</strong> Designed by Dsquared2 on the historic Enel rooftop with two heated pools, American bar, and skyline views over Porta Nuova.</li><li><strong>4. MIB Milano & Radio Rooftop / Organics SkyGarden:</strong> Central business and fashion aperitivo terraces ideal for golden-hour cocktails.</li></ul>",
          it: "<p>Con un Opportunity Score di <strong>88/100</strong> rilevato da Rank Intel, i rooftop panoramici sono i locali più cercati a Milano per aperitivi al tramonto, appuntamenti romantici, compleanni eleganti ed eventi aziendali. Grazie alle vetrate panoramiche climatizzate, i migliori sky lounge milanesi sono attivi 12 mesi l'anno:</p><ul><li><strong>1. Voya Rooftop Milan (#5 Priorità — Via Achille Papa 30, 20° Piano):</strong> Ventesimo piano con vetrate a tutta altezza sullo skyline dei grattacieli di CityLife e Porta Nuova. Aperitivo al tramonto dalle 18:00 (20–30€) che scivola in un elegante DJ set Lounge & Deep House con tavoli VIP vista skyline (250–600€).</li><li><strong>2. Terrazza Duomo 21 (Piazza del Duomo 21):</strong> Affaccio diretto sulle guglie del Duomo illuminate; aperitivo e dopocena con DJ set fino alle 02:00.</li><li><strong>3. Ceresio 7 Pools & Restaurant (Via Ceresio 7, Isola / Monumentale):</strong> Il celebre rooftop firmato Dsquared2 con due piscine a sfioro e vista sui grattacieli di Porta Nuova.</li><li><strong>4. MIB Milano & Sky Lounge del Centro:</strong> Terrazze ideali per il golden hour nel cuore finanziario e della moda.</li></ul>"
        }
      },
      {
        id: "rooftop-booking-tips",
        heading: {
          en: "2. Golden Hour Timing, Window Table Reservations & Dress Code",
          it: "2. Orario Golden Hour, Prenotazione Tavoli Vetrata e Dress Code"
        },
        content: {
          en: "<p>Window-side tables at <strong>Voya Rooftop</strong> and <strong>Terrazza Duomo 21</strong> sell out 24–48 hours in advance on Thursdays, Fridays, and Saturdays. Message our WhatsApp Concierge (<strong>+39 351 912 7047</strong>) to lock in a panoramic window table for sunset aperitivo (18:30–21:00) or after-dinner bottle service (22:30–02:30).</p>",
          it: "<p>I tavoli in prima fila lungo la vetrata panoramica da <strong>Voya Rooftop</strong> e in terrazza da <strong>Terrazza Duomo 21</strong> esauriscono le disponibilità con 24–48 ore di anticipo nel weekend. Scrivi al nostro Concierge WhatsApp (<strong>+39 351 912 7047</strong>) per bloccare il tuo tavolo vista skyline per l'aperitivo al tramonto (18:30–21:00) o per il dopocena (22:30–02:30).</p>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Are Milan rooftop bars open in autumn and winter?", it: "I rooftop di Milano sono aperti anche in autunno e in inverno?" },
        answer: {
          en: "Yes! Voya Rooftop (20th floor), Terrazza Duomo 21, and Ceresio 7 feature enclosed, heated floor-to-ceiling glass sky lounges and covered heated terraces that operate year-round, including New Year's Eve.",
          it: "Sì! Voya Rooftop (20° piano), Terrazza Duomo 21 e Ceresio 7 dispongono di saloni interni con vetrate panoramiche a 360 gradi e terrazze riscaldate fruibili tutto l'anno, incluso Capodanno."
        }
      }
    ]
  },

  // ─── 9. [NEW RANK INTEL #4] GRADUATION, 18TH BIRTHDAY & BACHELORETTE ──────
  {
    id: "g-private-parties",
    slugs: {
      en: "graduation-18th-birthday-bachelorette-parties-milan",
      it: "festa-laurea-18-anni-compleanno-addio-nubilato-celibato-milano"
    },
    title: {
      en: "How to Organize a Graduation Party, 18th/30th Birthday or Bachelorette in Milan Clubs (2026/2027)",
      it: "Come Organizzare Festa di Laurea, 18 Anni, Compleanno e Addio al Nubilato/Celibato nei Club di Milano"
    },
    excerpt: {
      en: "Complete packages, per-person prices (€20–€70), cake service, and the best venues for graduation parties, birthdays, and bachelor/bachelorette nights in Milan.",
      it: "Pacchetti completi, prezzi a persona (20–70€), servizio torta e i migliori locali per feste di laurea, 18 anni, compleanni e addio al nubilato/celibato a Milano."
    },
    author: "Nightlife Milan Private Events Desk",
    datePublished: "2026-10-20T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/55-milano.webp",
    sections: [
      {
        id: "graduation-party-formulas",
        heading: {
          en: "1. Graduation Parties (Festa di Laurea): The 3 Most Popular Formulas for Bocconi, Cattolica, Politecnico & IULM",
          it: "1. Festa di Laurea a Milano: Le 3 Formule Più Richieste (Aperitivo Riservato, Combo & Dopocena)"
        },
        content: {
          en: "<p>With over 7,500 monthly searches and 153 AI prompts tracked by Rank Intel, organizing a <strong>Graduation Party (Festa di Laurea)</strong> or <strong>Milestone Birthday</strong> in Milan comes down to three proven packages:</p><ul><li><strong>Formula A — Reserved Royal Aperitivo Area (19:30–22:30 · €20–€35/person):</strong> Ideal for 15 to 60 guests (including parents/relatives early on, plus friends). Includes a private roped-off table area, unlimited royal buffet or gourmet platters, 1 cocktail or wine/prosecco bottle per 4–5 guests, and cake service. Best at: <strong>55 Milano (#4 Priority)</strong>, <strong>Just Me (#1)</strong>, <strong>Aria Club (#3)</strong>, <strong>Voya Rooftop (#5)</strong>, and <strong>Pineta (#2)</strong>.</li><li><strong>Formula B — The All-Night Combo (Aperitivo + Club VIP Table · €35–€55/person):</strong> Keep your table past 23:00 as the venue transforms into a nightclub, adding 1–2 spirit/champagne bottles with sparklers for the midnight toast.</li><li><strong>Formula C — After-Dinner VIP Table (23:30–05:00 · from €250–€500 per table):</strong> Pure clubbing celebration with skip-the-line entry and bottle parade.</li></ul>",
          it: "<p>Con oltre 7.500 ricerche mensili e 153 prompt AI analizzati da Rank Intel, organizzare una <strong>Festa di Laurea</strong> o un <strong>Compleanno a Milano</strong> si articola su tre formule collaudate:</p><ul><li><strong>Formula A — Area Riservata Royal Aperitivo (19:30–22:30 · 20–35€ a persona):</strong> Perfetta per gruppi da 10 a 60 invitati. Include divanetti e tavoli riservati, Royal Buffet illimitato o servito al piatto, 1 drink premium o 1 bottiglia di prosecco/vino ogni 4–5 persone e gestione torta. I migliori locali: <strong>55 Milano (#4 Priorità)</strong>, <strong>Just Me (#1)</strong>, <strong>Aria Club (#3)</strong>, <strong>Voya Rooftop (#5)</strong> e <strong>Pineta (#2)</strong>.</li><li><strong>Formula B — Pacchetto Combo Aperitivo + Tavolo Discoteca (19:30–04:30 · 35–55€ a persona):</strong> Mantieni la tua area tavolo anche dopo mezzanotte aggiungendo 1–2 bottiglie di superalcolico o champagne con fontane luminose per il brindisi in pista.</li><li><strong>Formula C — Tavolo VIP Dopocena (23:30–05:00 · da 250–500€ a tavolo):</strong> Ingresso salta-fila per tutti gli invitati e 100% credito in bottiglie.</li></ul>"
        }
      },
      {
        id: "18th-birthday-and-bachelorette",
        heading: {
          en: "2. 18th Birthdays (18 Anni) & Bachelor/Bachelorette Nights (Addio al Nubilato/Celibato)",
          it: "2. Dove Festeggiare i 18 Anni, i 30 Anni e l'Addio al Nubilato o Celibato a Milano"
        },
        content: {
          en: "<ul><li><strong>18th Birthday Parties (18+):</strong> All guests must be 18+ with valid ID (if a few classmates are 17, choose an exclusive private room or early aperitivo slot at <strong>55 Milano</strong> or <strong>Play Club</strong>; for 100% 18+ groups, <strong>Aria Club</strong>, <strong>Play Club</strong>, <strong>The Club</strong>, and <strong>Alcatraz</strong> are top picks).</li><li><strong>Bachelorette Party (Addio al Nubilato):</strong> The #1 choice in Milan is the <strong>Friday or Saturday Singing Aperitivo / Dinner Show at Pineta Club (#2 Priority)</strong> or <strong>55 Milano (#4 Priority)</strong>, or a glamorous sunset-to-party night at <strong>Voya Rooftop (#5)</strong> and <strong>Just Me (#1)</strong>.</li><li><strong>Bachelor Party (Addio al Celibato):</strong> Start with craft cocktails in Navigli or steakhouse dinner in Corso Como, then book a <strong>Dancefloor or Console VIP Table at Just Me, Aria Club, Pineta, or Repvblic</strong> so your all-male group enters smoothly via the VIP Hostess lane.</li></ul>",
          it: "<ul><li><strong>Festa dei 18 Anni:</strong> Per i neo-maggiorenni i locali più amati sono <strong>Aria Club Milano</strong>, <strong>55 Milano</strong> (perfetto anche se alcuni invitati devono ancora compiere 18 anni nella fascia apericena 19:30–23:00), <strong>Play Club</strong>, <strong>The Club</strong> e <strong>Alcatraz</strong>.</li><li><strong>Addio al Nubilato a Milano:</strong> La scelta n°1 assoluta è l'<strong>Aperitivo Cantato / Dinner Show del Pineta Club (#2 Priorità)</strong> o del <strong>55 Milano (#4 Priorità)</strong>, oppure una serata glamour al 20° piano di <strong>Voya Rooftop (#5)</strong> e sotto la Torre Branca da <strong>Just Me (#1)</strong>.</li><li><strong>Addio al Celibato a Milano:</strong> Prenotare un <strong>Tavolo VIP (Pista o Privé) da Just Me, Aria Club, Pineta o Repvblic</strong> è fondamentale per far entrare tutto il gruppo maschile dalla corsia salta-fila senza blocchi alla porta.</li></ul>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Can we bring our own graduation or birthday cake to the club?", it: "Possiamo portare la nostra torta di laurea o compleanno da fuori?" },
        answer: {
          en: "Most clubs require pastry with a certified HACCP receipt from an external bakery (with a small €2–€3/person service fee) or allow you to order a custom millefeuille/chantilly cake directly through the club's kitchen.",
          it: "La maggior parte dei locali consente di portare la torta da una pasticceria certificata (con scontrino HACCP per la tracciabilità alimentare e piccolo diritto di servizio) oppure di ordinarla direttamente tramite la cucina interna del club."
        }
      }
    ]
  },

  // ─── 10. [NEW RANK INTEL #5] FASHION WEEK, FUORISALONE, MONZA F1 & SAN SIRO
  {
    id: "g-mfw-fuorisalone-f1",
    slugs: {
      en: "milan-fashion-week-fuorisalone-monza-f1-afterparties",
      it: "feste-milano-fashion-week-fuorisalone-monza-f1"
    },
    title: {
      en: "Milan Fashion Week, Fuorisalone Design Week, Monza F1 & San Siro Concert Afterparties Guide (2026/2027)",
      it: "Guida Milano Fashion Week, Fuorisalone Design Week, Monza F1 e Afterparty Concerti San Siro (2026/2027)"
    },
    excerpt: {
      en: "How to get into the most exclusive VIP afterparties during Milan Fashion Week, Design Week (Salone del Mobile), the Monza Formula 1 GP, and San Siro stadium concerts.",
      it: "Come entrare nei party più esclusivi durante la Milano Fashion Week, il Fuorisalone (Design Week), il GP di Formula 1 di Monza e dopo i concerti a San Siro."
    },
    author: "Nightlife Milan Special Events Desk",
    datePublished: "2026-10-22T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/venues/just-me-milano/just-me-milano-lounge-01.webp",
    sections: [
      {
        id: "mfw-and-fuorisalone",
        heading: {
          en: "1. Milan Fashion Week (Sept/Feb/Jan/June) & Fuorisalone Design Week (April): Where Models, Designers & Celebrities Party",
          it: "1. Milano Fashion Week e Fuorisalone Design Week: Dove Fanno Festa Modelli, Stilisti e Celebrity"
        },
        content: {
          en: "<p>During <strong>Milan Women's Fashion Week</strong> (September & February), <strong>Men's Fashion Week</strong> (January & June), and <strong>Milano Design Week / Salone del Mobile</strong> (April), global demand for VIP tables triples:</p><ul><li><strong>Just Me Milano (#1 Priority):</strong> Hosted inside the Roberto Cavalli-designed pavilion in Parco Sempione, Just Me runs official runway afterparties every single night of Fashion Week with international superstar DJs and guests like Tyga, Uncle Waffles, and Bob Sinclar.</li><li><strong>Armani/Privé (Via Pisoni 1):</strong> The ultra-selective fashion bunker in the Quadrilatero. Tables start from €1,500–€5,000 during MFW.</li><li><strong>Pineta Club (#2), Voya Rooftop (#5) & Corso Como (11Clubroom, Tocqueville 13, Hollywood):</strong> Model agencies and showrooms book out the Privé rows every night from Wednesday to Sunday.</li><li><strong>Volt Club & Magazzini Generali:</strong> Host the biggest international electronic label showcases of Fuorisalone.</li></ul>",
          it: "<p>Durante la <strong>Milano Fashion Week Donna</strong> (settembre e febbraio), la <strong>Fashion Week Uomo</strong> (gennaio e giugno) e la <strong>Milano Design Week / Fuorisalone</strong> (aprile), la richiesta internazionale di Tavoli VIP triplica:</p><ul><li><strong>Just Me Milano (#1 Priorità):</strong> Nella cornice firmata Roberto Cavalli sotto la Torre Branca, ospita ogni sera gli afterparty ufficiali delle sfilate con special guest mondiali (da Tyga e Uncle Waffles a Bob Sinclar).</li><li><strong>Armani/Privé (Via Pisoni 1):</strong> Il salotto dell'alta moda nel Quadrilatero, dove nelle settimane delle sfilate si entra quasi esclusivamente con Tavolo Privé (da 1.500–5.000€).</li><li><strong>Pineta Club (#2), Voya Rooftop (#5) e Corso Como (11Clubroom, Tocqueville 13, Hollywood):</strong> Le agenzie di moda prenotano intere file di tavoli dal mercoledì alla domenica.</li><li><strong>Volt Club & Magazzini Generali:</strong> I punti di riferimento per i grandi showcase elettronici internazionali del Fuorisalone.</li></ul>"
        }
      },
      {
        id: "monza-f1-and-san-siro-afterparties",
        heading: {
          en: "2. Monza Formula 1 GP Weekend & San Siro Stadium Concert Afterparties (Aria Club at 150m!)",
          it: "2. Weekend Formula 1 GP di Monza e Dove Andare Dopo un Concerto a San Siro (Aria Club a 150 Metri!)"
        },
        content: {
          en: "<p>Rank Intel identified <strong>«Concerto a San Siro» (Score 82)</strong> and <strong>«Milan to Monza F1» (Score 81)</strong> as two of the highest-volume event queries in Milan:</p><ul><li><strong>Where to Go Immediately After a San Siro Stadium or Ippodromo La Maura Concert:</strong> <strong>Aria Club Milano (#3 Priority)</strong> is located at <strong>Piazzale dello Sport 14</strong>—literally <strong>150 meters on foot</strong> from San Siro Stadium and the Ippodromo! Instead of waiting 90 minutes in traffic for a taxi or crowded M5 metro after a concert, walk straight into Aria Club at 23:15 for the official post-concert party, cold drinks, and VIP tables.</li><li><strong>Monza Formula 1 Italian Grand Prix Weekend (September):</strong> F1 drivers, team sponsors, and international fans stay in central Milan and take over <strong>Just Me Milano</strong>, <strong>Armani/Privé</strong>, <strong>Voya Rooftop</strong>, and <strong>Pineta Club</strong> from Friday to Sunday night. Book your table at least 10 days ahead via WhatsApp (+39 351 912 7047).</li></ul>",
          it: "<p>Rank Intel ha evidenziato <strong>«Concerto a San Siro» (Score 82)</strong> e <strong>«Monza F1» (Score 81)</strong> tra le ricerche a più alto potenziale dell'intero mercato milanese:</p><ul><li><strong>Dove Andare Subito Dopo un Concerto a San Siro o all'Ippodromo Snai:</strong> <strong>Aria Club Milano (#3 Priorità)</strong> si trova in <strong>Piazzale dello Sport 14</strong>, letteralmente a <strong>150 metri a piedi</strong> dall'uscita dello Stadio di San Siro e dell'Ippodromo! Invece di restare bloccato un'ora e mezza nel traffico o in coda alla metro M5 a fine concerto, attraversi la piazza ed entri direttamente al tuo Tavolo VIP o in serata da Aria Club fino alle 05:00 del mattino.</li><li><strong>Weekend Gran Premio di Formula 1 di Monza:</strong> Piloti, team, sponsor e tifosi VIP alloggiano nel centro di Milano e affollano i Privé di <strong>Just Me Milano</strong>, <strong>Armani/Privé</strong>, <strong>Voya Rooftop</strong> e <strong>Pineta Club</strong> dal venerdì alla domenica notte.</li></ul>"
        }
      }
    ],
    faqs: [
      {
        question: { en: "Which nightclub is closest to San Siro Stadium after a concert?", it: "Qual è la discoteca più vicina allo Stadio di San Siro dopo un concerto?" },
        answer: {
          en: "Aria Club Milano (Piazzale dello Sport 14) is located just 150 meters from San Siro Stadium and the Ippodromo—a 2-minute walk from the stadium gates.",
          it: "Aria Club Milano (Piazzale dello Sport 14) si trova a soli 150 metri dallo Stadio Meazza di San Siro e dall'Ippodromo: ci arrivi in 2 minuti a piedi appena finisce il concerto."
        }
      },
      {
        question: { en: "How far in advance should I book a VIP table for Milan Fashion Week or Fuorisalone?", it: "Con quanto anticipo va prenotato un tavolo VIP per la Fashion Week o il Fuorisalone?" },
        answer: {
          en: "We recommend booking 7 to 14 days in advance via WhatsApp (+39 351 912 7047), as minimum spends increase dynamically as the club approaches 100% capacity.",
          it: "Consigliamo di prenotare da 7 a 14 giorni prima tramite WhatsApp (+39 351 912 7047), poiché durante le settimane della moda e del design i minimum spend salgono progressivamente man mano che i Privé si riempiono."
        }
      }
    ]
  },

  // ─── 11. [NEW PILLAR #11] SAN SIRO FOOTBALL MATCH AFTERPARTIES (INTER & AC MILAN)
  {
    id: "g-san-siro-football-afterparties",
    slugs: {
      en: "san-siro-football-match-afterparties-inter-ac-milan",
      it: "dopo-partita-san-siro-milano-inter-milan-discoteche"
    },
    title: {
      en: "Where to Party After a San Siro Football Match (Inter & AC Milan 2026/2027): Clubs 150m Away, Rooftops & VIP Tables",
      it: "Dove Andare Dopo la Partita a San Siro (Inter e Milan 2026/2027): Discoteche a 150 Metri, Rooftop, Cena e Tavoli VIP Post-Match"
    },
    excerpt: {
      en: "The definitive Third-Half guide after Serie A, UEFA Champions League, Derby della Madonnina, and Coppa Italia matches at San Siro: from Aria Club 150m from the gates to Just Me, Voya Rooftop, 55 Milano, Pineta & Repvblic.",
      it: "La guida definitiva al Terzo Tempo dopo le partite di Serie A, UEFA Champions League, Derby della Madonnina e Coppa Italia di Inter e Milan a San Siro: da Aria Club a 150 metri dai cancelli a Just Me, Voya Rooftop, 55 Milano, Pineta e Repvblic."
    },
    author: "Nightlife Milan Stadium & VIP Concierge Desk",
    datePublished: "2026-10-30T08:00:00Z",
    dateModified: "2026-10-30T08:00:00Z",
    image: "/images/venues/aria-club-milano/aria-club-milano-interior-01.webp",
    sections: [
      {
        id: "aria-club-150m-san-siro",
        heading: {
          en: "1. Aria Club Milano (#3 Priority): The Official Post-Match Nightclub Just 150 Meters from San Siro Gates",
          it: "1. Aria Club Milano (#3 Priorità): La Discoteca del Terzo Tempo a Soli 150 Metri dai Cancelli di San Siro"
        },
        content: {
          en: "<p>When 75,000 fans exit Stadio Giuseppe Meazza (San Siro) at the final whistle, Piazzale Lotto, Via Novara, and the M5 Purple Line metro stations gridlock for up to 75 minutes. The ultimate insider move is walking <strong>150 meters across the square to Piazzale dello Sport 14</strong>—straight into <strong>Aria Club Milano (#3 Priority)</strong>.</p><ul><li><strong>After Afternoon Kickoffs (12:30 / 15:00 / 18:00 Serie A):</strong> Walk directly from San Siro into Aria Club's <strong>Royal Aperitivo & Post-Match Buffet starting at 19:30</strong> (€20–€35/person with reserved lounge seating, gourmet platters, and cocktails) before the venue transforms into a high-energy nightclub.</li><li><strong>After Evening Kickoffs (20:45 Serie A & Coppa Italia / 21:00 Champions League):</strong> The final whistle blows at 22:40. By <strong>22:45</strong> you are already inside Aria Club skipping all traffic, ready for the <strong>Official Third-Half Club Party until 05:00 AM</strong> across three VIP zones: <strong>Dancefloor Tables (€250–€350)</strong>, <strong>Elevated Privé Aria (€450–€600)</strong>, and <strong>DJ Console Super Privé (€700–€1,200)</strong>.</li></ul>",
          it: "<p>Quando 75.000 tifosi escono dallo Stadio Giuseppe Meazza di San Siro al triplice fischio, Piazzale Lotto, Via Novara e i tornelli della Metro M5 Lilla restano bloccati per oltre un'ora. La mossa da veri insider milanesi è fare <strong>150 metri a piedi fino a Piazzale dello Sport 14</strong> ed entrare direttamente da <strong>Aria Club Milano (#3 Priorità)</strong>.</p><ul><li><strong>Dopo le Partite Pomeridiane (12:30 / 15:00 / 18:00 Serie A):</strong> Attraversa il piazzale ed entra al <strong>Royal Aperitivo & Buffet Post-Partita dalle 19:30</strong> (20–35€ a persona con divanetto riservato, isole gastronomiche e drink premium), mantenendo il tavolo per tutta la serata discoteca.</li><li><strong>Dopo i Posticipi Serali (20:45 Serie A e Coppa Italia / 21:00 Champions League):</strong> Il triplice fischio arriva alle 22:40 e alle <strong>22:45 sei già dentro Aria Club</strong>, evitando code e ingorghi, per l'<strong>Official Third-Half Party fino alle 05:00 del mattino</strong> con 3 aree Tavoli VIP: <strong>Tavolo Pista (250–350€)</strong>, <strong>Privé Aria Rialzato (450–600€)</strong> e <strong>Super Privé Console DJ (700–1.200€)</strong>.</li></ul>"
        }
      },
      {
        id: "champions-league-tuesday-wednesday-just-me",
        heading: {
          en: "2. UEFA Champions League Tuesdays & Wednesdays + Sunday/Monday Night Post-Match Schedule",
          it: "2. Martedì e Mercoledì di UEFA Champions League + Posticipi di Domenica e Lunedì Sera"
        },
        content: {
          en: "<p>Visiting European away fans and corporate hospitality guests often ask which top clubs are actually open on Tuesday, Wednesday, Sunday, or Monday night after a San Siro fixture. Here is the exact midweek and late-weekend matrix:</p><ul><li><strong>Just Me Milano (#1 Priority — Parco Sempione, Torre Branca):</strong> Open <strong>7 nights a week (Monday to Sunday, 19:30–05:00)</strong>, just a 10-minute taxi ride from San Siro. On <strong>UEFA Champions League Tuesday and Wednesday nights</strong>, Just Me is the undisputed #1 gathering point for international fans, club executives, and VIP tables (€320–€500 Dancefloor, €800–€1,500+ Privé Branca & Console).</li><li><strong>Voya Rooftop (#5 Priority — Via Achille Papa 30, 20th Floor):</strong> Only <strong>3 stops on the direct M5 Purple Line from San Siro (Lotto -> Portello)</strong> or 6 minutes by taxi. Toast the match 85 meters above the Milan skyline with panoramic glass views and Deep House DJ sets until 02:30 AM.</li><li><strong>55 Milano (#4 Priority — Via Piero della Francesca 55):</strong> 6 minutes from San Siro. Open Tuesday to Sunday from 19:30 to 03:00 inside a 1,000 sqm loft—the #1 choice if your group wants a generous post-match dinner, XXL Apericena, and bottle service without strict formality.</li><li><strong>Repvblic Milano (#6 Priority — Piazza della Repubblica):</strong> Playing a Monday night 20:45 Serie A match? Head straight to Repvblic for Milan's legendary <em>Dirty Monday</em> party until 04:30 AM.</li></ul>",
          it: "<p>Tifosi ospiti europei, delegazioni aziendali e gruppi di amici si chiedono sempre quali discoteche siano davvero aperte il martedì e mercoledì di coppa o la domenica e il lunedì sera dopo il posticipo. Ecco la mappa esatta:</p><ul><li><strong>Just Me Milano (#1 Priorità — Parco Sempione, Torre Branca):</strong> Aperto <strong>7 sere su 7 (dal lunedì alla domenica, 19:30–05:00)</strong> a 10 minuti di taxi da San Siro. Nelle notti di <strong>UEFA Champions League del martedì e mercoledì</strong>, il Just Me è il punto di ritrovo n°1 in assoluto a Milano per tifosi internazionali, dirigenti e Tavoli VIP (320–500€ Pista, 800–1.500€+ Privé Branca e Console).</li><li><strong>Voya Rooftop (#5 Priorità — Via Achille Papa 30, 20° Piano):</strong> A sole <strong>3 fermate di Metro M5 Lilla da San Siro (Lotto -> Portello)</strong> o 6 minuti di auto. Brinda alla vittoria a 85 metri d'altezza con vista skyline a 360° e DJ set fino alle 02:30.</li><li><strong>55 Milano (#4 Priorità — Via Piero della Francesca 55):</strong> A 6 minuti da San Siro, aperto dal martedì alla domenica (19:30–03:00). Con i suoi 1.000 mq è la scelta perfetta per chi esce affamato dallo stadio e vuole cenare, fare Apericena XL e proseguire con tavolo bottiglie.</li><li><strong>Repvblic Milano (#6 Priorità — Piazza della Repubblica):</strong> Partita di Serie A nel posticipo del lunedì sera alle 20:45? Il <em>Dirty Monday</em> del Repvblic è la festa più celebre del lunedì notte milanese fino alle 04:30.</li></ul>"
        }
      },
      {
        id: "derby-della-madonnina-and-big-matches",
        heading: {
          en: "3. Derby della Madonnina (Inter vs Milan) & Big Matches: Where Players, VIPs & Skybox Guests Celebrate",
          it: "3. Derby della Madonnina (Inter vs Milan) e Big Match: Dove Festeggiano Calciatori, Ospiti Skybox e Tifosi VIP"
        },
        content: {
          en: "<p>On nights like the <strong>Derby della Madonnina (Inter vs AC Milan)</strong>, <strong>Inter/Milan vs Juventus, Napoli, or Roma</strong>, and <strong>Champions League knockout rounds</strong> against Real Madrid, Bayern Munich, Arsenal, PSG, or Manchester City, VIP tables across Milan sell out 5 to 10 days before kickoff:</p><ul><li><strong>Where Footballers, Models & Skybox Guests Book:</strong> The <strong>Super Privé Console & Privé Branca at Just Me Milano (#1 Priority)</strong>, the crystal-chandelier <strong>VIP Privé at Pineta Club (#2 Priority, Corso Como — direct M5 line to Cenisio)</strong>, and <strong>Armani/Privé</strong> host the highest concentration of Serie A players, sports agents, and celebrity fans.</li><li><strong>Where 20–50 Person Supporter Groups Celebrate Together:</strong> <strong>Aria Club Milano (#3 Priority, 150m from San Siro)</strong> and <strong>55 Milano (#4 Priority)</strong> allow large supporter groups to reserve adjacent VIP tables with custom champagne sparkler parades (Dom Pérignon, Cristal, Belvedere Magnum, Don Julio 1942).</li></ul>",
          it: "<p>Nelle notti del <strong>Derby della Madonnina (Inter vs Milan)</strong>, dei grandi scontri scudetto contro <strong>Juventus, Napoli e Roma</strong> o degli ottavi/quarti di <strong>Champions League</strong> contro Real Madrid, Bayern Monaco, Arsenal, PSG o Manchester City, i Tavoli VIP a Milano registrano il tutto esaurito con 5–10 giorni di anticipo:</p><ul><li><strong>Dove Prenotano Calciatori, Agenti e Ospiti Skybox Hospitality:</strong> Il <strong>Super Privé Console e il Privé Branca del Just Me Milano (#1 Priorità)</strong>, il <strong>Privé sotto i lampadari di cristallo del Pineta Club (#2 Priorità in Corso Como, linea M5 diretta fermata Cenisio)</strong> e <strong>Armani/Privé</strong> ospitano regolarmente giocatori di Serie A, procuratori, modelli e ospiti internazionali.</li><li><strong>Dove Festeggiano i Grandi Gruppi di Tifosi (10–50 Persone):</strong> <strong>Aria Club Milano (#3 Priorità, a 150m dallo stadio)</strong> e <strong>55 Milano (#4 Priorità)</strong> permettono di unire più tavoli VIP adiacenti con bottle show personalizzati (Dom Pérignon, Cristal, Belvedere Magnum, Don Julio 1942).</li></ul>"
        }
      },
      {
        id: "stadium-to-club-dress-code",
        heading: {
          en: "4. The Golden Rule: Stadium-to-Club Dress Code (How Not to Get Bounced After the Match)",
          it: "4. La Regola d'Oro Dress Code Stadio -> Discoteca (Come Non Farsi Rimbalzare alla Porta)"
        },
        content: {
          en: "<p><strong>Crucial Insider Warning:</strong> Milan's luxury nightclubs (Just Me, Pineta, Aria Club, Voya Rooftop, 55 Milano, Repvblic) strictly <strong>forbid football jerseys, team scarves, tracksuits, caps, and athletic running shoes</strong> after 23:00—even if you have booked a €1,000 VIP table!</p><p><strong>How to Dress for San Siro + Nightclub in One Outfit:</strong></p><ol><li><strong>The Tribuna Rossa / Arancio Smart-Casual Uniform:</strong> Wear a collared shirt or fine-knit dark sweater/turtleneck under a blazer, leather jacket, or tailored wool overcoat, paired with dark jeans (zero rips) or chinos and clean leather loafers or dark Chelsea boots.</li><li><strong>If You Wear a Team Jersey or Scarf Inside the Stadium:</strong> Wear a collared shirt underneath and leave your football jersey/scarf in your car trunk at Piazzale dello Sport, at your hotel, or inside a small coat-check bag before approaching the club's velvet rope.</li><li><strong>All-Male Supporter Groups:</strong> Most football trips are 100% male groups (4 to 15 men). Standard guest lists will bounce all-male groups at the door; booking a <strong>VIP Table via WhatsApp (+39 351 912 7047)</strong> pre-authorizes your entire male group with the club's VIP Hostess lane.</li></ol>",
          it: "<p><strong>Avvertenza Fondamentale del Concierge:</strong> Tutte le discoteche eleganti di Milano (Just Me, Pineta, Aria Club, Voya Rooftop, 55 Milano, Repvblic) <strong>vietano tassativamente maglie da calcio, sciarpe da stadio, tute sportive, cappellini e scarpe da ginnastica tecniche</strong> dopo le 23:00—anche con un Tavolo VIP da 1.000€ prenotato!</p><p><strong>Come Vestirsi per fare Stadio + Discoteca Senza Passare dall'Hotel:</strong></p><ol><li><strong>La Divisa Smart-Chic da Tribuna Rossa / Arancio:</strong> Indossa una camicia o un dolcevita/maglia fine scura sotto un blazer, giubbotto in pelle o cappotto sartoriale in lana, abbinati a pantalone scuro o jeans scuro senza strappi e mocassini o stivaletti/sneakers in pelle liscia scura.</li><li><strong>Se Indossi Maglia o Sciarpa allo Stadio:</strong> Tieni una camicia stirata sotto la maglia da gioco e riponi maglia e sciarpa nel bagagliaio dell'auto o in una borsa da lasciare subito al guardaroba prima di presentarti alla selezione alla porta.</li><li><strong>Gruppi di Soli Uomini (Tifosi in Trasferta o Amici):</strong> Chi va allo stadio è quasi sempre un gruppo di soli ragazzi (da 4 a 15 uomini). In lista normale i gruppi di soli uomini vengono bloccati alla porta: prenotando un <strong>Tavolo VIP su WhatsApp (+39 351 912 7047)</strong> facciamo pre-autorizzare l'intero gruppo maschile dalla direzione con ingresso salta-fila dedicato.</li></ol>"
        }
      }
    ],
    faqs: [
      {
        question: {
          en: "Which nightclub is closest to San Siro Stadium after an Inter or AC Milan match?",
          it: "Qual è la discoteca più vicina allo Stadio di San Siro dopo una partita di Inter o Milan?"
        },
        answer: {
          en: "Aria Club Milano (Piazzale dello Sport 14) is located just 150 meters on foot from the gates of San Siro Stadium—a 2-minute walk across the square. It opens at 19:30 for post-match Royal Aperitivo and runs until 05:00 AM with three VIP table zones.",
          it: "Aria Club Milano (Piazzale dello Sport 14) si trova a soli 150 metri a piedi dai cancelli dello Stadio Meazza di San Siro: attraversi la piazza in 2 minuti ed entri direttamente per il Royal Aperitivo dalle 19:30 o per il party fino alle 05:00 con 3 aree Tavoli VIP."
        }
      },
      {
        question: {
          en: "Can I enter a Milan nightclub wearing an Inter, AC Milan, or visiting team football shirt?",
          it: "Posso entrare in discoteca a Milano con la maglia dell'Inter, del Milan o della squadra ospite?"
        },
        answer: {
          en: "No. Football jerseys, team scarves, and sportswear are strictly prohibited at the door of all Milan VIP clubs (Just Me, Pineta, Aria, Voya, 55 Milano, Repvblic). Wear a collared shirt or smart sweater under your coat and store any team scarf or jersey before reaching the entrance.",
          it: "No. Maglie da calcio, sciarpe da tifoso e abbigliamento sportivo vengono bloccati alla selezione di tutti i club di Milano (Just Me, Pineta, Aria, Voya, 55 Milano, Repvblic). Indossa una camicia o un maglione elegante sotto il cappotto e riponi maglia o sciarpa prima dell'ingresso."
        }
      },
      {
        question: {
          en: "Where can we party on a Tuesday or Wednesday night after a UEFA Champions League match at San Siro?",
          it: "Dove andare a ballare il martedì o mercoledì sera dopo la Champions League a San Siro?"
        },
        answer: {
          en: "Just Me Milano (#1 Priority, Parco Sempione) is open every Tuesday and Wednesday night until 05:00 AM (10 min by taxi from San Siro). Voya Rooftop (#5 Priority, 20th floor) and 55 Milano (#4 Priority) are also open midweek and reachable in 3–5 stops on the M5 Purple metro line.",
          it: "Il Just Me Milano (#1 Priorità, Parco Sempione) è aperto ogni martedì e mercoledì notte fino alle 05:00 (a 10 minuti di taxi da San Siro). Anche Voya Rooftop (#5 Priorità, 20° piano) e 55 Milano (#4 Priorità) sono aperti in settimana a sole 3–5 fermate di Metro M5 Lilla dallo stadio."
        }
      },
      {
        question: {
          en: "How can an all-male group of football fans get guaranteed entry to Milan clubs after the game?",
          it: "Come fa un gruppo di soli uomini a entrare sicuro in discoteca dopo la partita a San Siro?"
        },
        answer: {
          en: "Nominal guest lists require a 1:1 male/female balance and reject all-male groups. By booking a VIP Table (from €250–€500, 100% spendable in bottles) via our WhatsApp Concierge (+39 351 912 7047), we pre-clear your male group with the VIP Director for guaranteed skip-the-line entry.",
          it: "Le liste nominali richiedono equilibrio uomo/donna e rimbalzano i gruppi di soli uomini. Prenotando un Tavolo VIP (da 250–500€, 100% spendibili in bottiglie) tramite il nostro Concierge WhatsApp (+39 351 912 7047), autorizziamo preventivamente il vostro gruppo maschile con ingresso salta-fila garantito."
        }
      }
    ]
  }
];

// Unione delle traduzioni articoli (33 lingue mancanti, generate in-sessione)
// nei campi localizzati di ogni guida: titolo/estratto/sezioni/FAQ nella lingua
// selezionata su tutte le 35 lingue (prima solo en/it -> fallback inglese).
for (const guide of mockGuides) {
  const fields = GUIDE_I18N[guide.slugs.en];
  if (!fields) continue;
  const applyField = (target: Record<string, string> | undefined, key: string) => {
    const translations = fields[key];
    if (!target || !translations) return;
    for (const lang of Object.keys(translations)) {
      const text = translations[lang as keyof typeof translations];
      if (text) target[lang] = text;
    }
  };
  applyField(guide.title as Record<string, string>, 'title');
  applyField(guide.excerpt as Record<string, string>, 'excerpt');
  (guide.sections || []).forEach((s) => {
    applyField(s.heading as Record<string, string>, `sec.${s.id}.heading`);
    applyField(s.content as Record<string, string>, `sec.${s.id}.content`);
  });
  (guide.faqs || []).forEach((f, i) => {
    applyField(f.question as Record<string, string>, `faq.${i}.q`);
    applyField(f.answer as Record<string, string>, `faq.${i}.a`);
  });
}

export const getGuideBySlug = (slug: string, lang: string): Guide | undefined => {
  // Stesso bug fix di getEventBySlug: riconosce entrambi gli slug a prescindere da lang.
  return mockGuides.find(g =>
    g.slugs.en === slug ||
    g.slugs.it === slug
  );
};

export const getEventsByGenres = (genres: MusicGenre[]): Event[] => {
  if (!genres || genres.length === 0) return [];
  return mockEvents.filter(e => e.genre.some(g => genres.includes(g)));
};
