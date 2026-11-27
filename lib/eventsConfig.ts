import { resolveEventSlugToCanonical } from './i18n/localizedSlugs35';
export interface WeeklyEvent {
  id: string;
  clubSlug: string;
  clubName: string;
  day: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  eventSlug: string;
  name: string;
  genres: string[];
  target: string;
  description: {
    en: string;
    it: string;
  };
  pricing: {
    aperitif?: string;
    club: string;
    tables: string;
  };
  dressCode: {
    en: string;
    it: string;
  };
  faqs: {
    q: { en: string; it: string };
    a: { en: string; it: string };
  }[];
  image: string;
  xceedLink?: string;
  priority: number;
  seasonalSummerOnly?: boolean;
}

const defaultFaqs = (clubName: string, address: string, age: string, dressCode: string, genres: string) => [
  {
    q: { en: 'What is the dress code?', it: 'Qual è il dress code?' },
    a: { en: dressCode, it: dressCode }
  },
  {
    q: { en: 'What is the minimum age?', it: 'Qual è l\'età minima?' },
    a: { en: `The minimum age is ${age}.`, it: `L'età minima è ${age}.` }
  },
  {
    q: { en: 'How can I book a table?', it: 'Come posso prenotare un tavolo?' },
    a: { en: 'You can book via WhatsApp at +39 351 912 7047.', it: 'Puoi prenotare tramite WhatsApp al +39 351 912 7047.' }
  },
  {
    q: { en: 'Where is it located?', it: 'Dove si trova?' },
    a: { en: address, it: address }
  },
  {
    q: { en: 'What music do they play?', it: 'Che musica suonano?' },
    a: { en: genres, it: genres }
  }
];

const LEGACY_WEEKLY_ALIASES: Record<string, string> = {
  'justme-wednesday-absolutely': 'justme-wednesday',
  'absolutely': 'justme-wednesday',
  'justme-thursday-viziatissima': 'justme-thursday',
  'viziatissima': 'justme-thursday',
};

export const getWeeklyEventBySlug = (slug: string): WeeklyEvent | undefined => {
  const mapped = LEGACY_WEEKLY_ALIASES[slug] || slug;
  const canon = resolveEventSlugToCanonical(mapped);
  const resolved = LEGACY_WEEKLY_ALIASES[canon] || canon;
  return weeklyEvents.find(
    (e) =>
      `${e.clubSlug}-${e.day}-${e.eventSlug}` === resolved ||
      `${e.clubSlug}-${e.day}-${e.eventSlug}` === mapped ||
      e.id === resolved ||
      e.id === mapped ||
      e.eventSlug === resolved ||
      e.eventSlug === mapped
  );
};

export const weeklyEvents: WeeklyEvent[] = [
  {
    id: 'justme-monday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'monday',
    dayOfWeek: 1,
    eventSlug: 'monday-night',
    name: 'Monday Night',
    genres: ['House', 'Urban'],
    target: '21+, International, Models, Business',
    description: {
      en: 'Justme Milano stands as the premier destination for those seeking luxury even at the start of the week. Located in the breathtaking setting of Sempione Park, this club is the landmark for Milan\'s high society and the international jet-set. Join us for an exclusive Monday night with the best House and Urban vibes.',
      it: 'Il Just Me Milano si conferma la destinazione numero uno per chi cerca l\'esclusività anche a inizio settimana. Immerso nella cornice mozzafiato di Parco Sempione, è il punto di riferimento per la "Milano bene" e il jet-set internazionale. Unisciti a noi per un lunedì notte esclusivo con le migliori vibrazioni House e Urban.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant. Long trousers for men are mandatory. No technical sneakers, hats, or tracksuits.',
      it: 'Strettamente Elegante. Pantaloni lunghi per uomo obbligatori. No sneakers tecniche, no cappelli, no tute.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant. Long trousers for men are mandatory.', 'House and Urban'),
    image: '/images/events/october-2026/249146-bbdee1490af9.webp',
    xceedLink: 'https://xceed.me/en/milano/event/monday-night-282/249160/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-tuesday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'martedi-universitario',
    name: 'Martedì Universitario',
    genres: ['Commercial', 'Reggaeton'],
    target: '18+, University Students, International',
    description: {
      en: 'The most exclusive university party in Milan. Just Me transforms its elegant venue into an energetic dancefloor for international students and the young Milanese crowd. Expect a vibrant atmosphere, premium drinks, and the best commercial hits.',
      it: 'Il party universitario più esclusivo di Milano. Just Me trasforma la sua elegante location in un dancefloor energico per studenti internazionali e giovani milanesi. Aspettati un\'atmosfera vibrante, drink premium e le migliori hit commerciali.'
    },
    pricing: { aperitif: 'From €13', club: 'From €0', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Smart Casual. Elegant shirt for men. No sportswear.',
      it: 'Smart Casual. Camicia elegante per gli uomini. No abbigliamento sportivo.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '18+', 'Smart Casual', 'Commercial and Reggaeton'),
    image: '/images/events/october-2026/249161-university-party-24nov.webp',
    xceedLink: 'https://xceed.me/en/milano/event/university-party-58/249218/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-wednesday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'wednesday-night-gentlemen-show',
    name: 'Wednesday Night · The Gentlemen Show',
    genres: ['House', 'Commercial', 'Live Show'],
    target: '23+, Professionals, Fashion Industry, Ladies Night',
    description: {
      en: 'Midweek elegance under Torre Branca at Just Me Milano. Doors open at 19:30 for the Royal Buffet Aperitif (€15), followed at 22:20 by The Gentlemen Show live stage performance and from 23:00 until 05:00 by the club party with DJ Francesco Campanini.',
      it: 'Eleganza di metà settimana sotto la Torre Branca al Just Me Milano. Apertura alle 19:30 con Royal Buffet Aperitif (15 €), alle 22:20 spettacolo dal vivo The Gentlemen Show e dalle 23:00 fino alle 05:00 party con DJ Francesco Campanini.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Elegant and Fashion-forward.',
      it: 'Elegante e curato.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '23+', 'Elegant and Fashion-forward', 'House, Commercial and Live Show'),
    image: '/images/events/weekly-posters/justme-wednesday-gentlemen-show.webp',
    xceedLink: 'https://xceed.me/en/milano/event/wednesday-night-229/249243/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-thursday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'thursday-night',
    name: 'Thursday Night',
    genres: ['Reggaeton', 'Hip-Hop', 'Commercial'],
    target: '21+, International, Locals, VIPs',
    description: {
      en: 'Thursday night at Just Me Milano beneath Torre Branca in Parco Sempione. While the Viziatissima singing dinner format takes a winter pause during December corporate events, Thursday nights feature international urban & commercial clubbing (including special editions such as Thanksgiving and Vida Loca) with Aperitif from 19:30 and Party until 05:00.',
      it: 'Il giovedì notte del Just Me Milano sotto la Torre Branca in Parco Sempione. Con la pausa invernale del format Viziatissima durante gli eventi aziendali di dicembre, il giovedì prosegue con aperitivo dalle 19:30 e clubbing internazionale urban, hip-hop e reggaeton (incluse le serate speciali Thanksgiving e Vida Loca) fino alle 05:00.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant.',
      it: 'Strettamente Elegante.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant', 'Reggaeton, Hip-Hop and Commercial'),
    image: '/images/events/thanksgiving-2026/thanksgiving-justme-milano-2026.webp',
    xceedLink: 'https://xceed.me/en/milano/event/thursday-night-349/249244/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-friday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-night',
    name: 'Friday Night',
    genres: ['House', 'Electronic'],
    target: '21+, International Jet-Set, VIPs',
    description: {
      en: 'Kick off the weekend at Milan\'s most glamorous venue. Friday Night at Just Me regularly features international guest DJs, stunning performances, and the city\'s elite crowd. Booking a table in advance is highly recommended.',
      it: 'Dai il via al weekend nel locale più glamour di Milano. Il venerdì sera al Just Me ospita regolarmente DJ internazionali, performance mozzafiato e l\'élite della città. La prenotazione anticipata del tavolo è vivamente consigliata.'
    },
    pricing: { aperitif: 'From €15', club: 'From €20', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant. Dress to impress.',
      it: 'Strettamente Elegante. Vestiti per impressionare.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant', 'House and Electronic'),
    image: '/images/events/partenopea-2026/justme-friday-27-nov-luciani.webp',
    xceedLink: 'https://xceed.me/en/milano/event/friday-night-727/249217/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-saturday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-night',
    name: 'Saturday Night',
    genres: ['Commercial', 'House'],
    target: '21+, High Society, Tourists',
    description: {
      en: 'The pinnacle of Milanese nightlife. Saturday Night at Just Me offers spectacular themed parties, premium bottle service, and an unforgettable atmosphere under the Torre Branca. The ultimate luxury clubbing experience.',
      it: 'L\'apice della vita notturna milanese. Il sabato sera al Just Me offre spettacolari feste a tema, servizio bottiglie premium e un\'atmosfera indimenticabile sotto la Torre Branca. L\'esperienza di clubbing di lusso per eccellenza.'
    },
    pricing: { aperitif: 'From €15', club: 'From €20', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant. Dress to impress.',
      it: 'Strettamente Elegante. Vestiti per impressionare.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant', 'Commercial and House'),
    image: '/images/events/october-2026/249197-carlo-piacente-28nov.webp',
    xceedLink: 'https://xceed.me/en/milano/event/saturday-night-785/249197/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-sunday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'uptown',
    name: 'Uptown',
    genres: ['Hip-Hop', 'RnB', 'Trap'],
    target: '21+, Urban Fashion, International',
    description: {
      en: 'End the week with the best urban party in Milan. "Uptown" brings premium Hip-Hop and R&B vibes to the luxurious setting of Just Me. A favorite among athletes, artists, and fashion insiders.',
      it: 'Concludi la settimana con il miglior party urban di Milano. "Uptown" porta vibrazioni Hip-Hop e R&B premium nella lussuosa cornice del Just Me. Uno dei preferiti da atleti, artisti e addetti ai lavori della moda.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Urban Chic. Stylish streetwear is allowed, but keep it premium.',
      it: 'Urban Chic. Lo streetwear elegante è consentito, ma mantienilo premium.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Urban Chic', 'Hip-Hop and R&B'),
    image: '/images/events/october-2026/249199-9373e4ee381b.webp',
    xceedLink: 'https://xceed.me/en/milano/event/sunday-night-211/249203/channel/nightlifemilan-1',
    priority: 100
  },

  // --- PINETA CLUB (Thu-Sat) ---
  {
    id: 'pineta-thursday',
    clubSlug: 'pineta',
    clubName: 'Pineta Club',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'thursday-night',
    name: 'Tr3ndy Society · Thursday Night',
    genres: ['Hip-Hop', 'Reggaeton', 'Commercial'],
    target: '20+, University & Fashion Crowd, International',
    description: {
      en: 'Thursday night at Pineta Club Milano brings the iconic Tr3ndy Society format under the crystal chandeliers of Via Messina 38. Expect an electric mix of Hip-Hop, Reggaeton, and commercial hits with VIP bottle service.',
      it: 'Il giovedì notte al Pineta Club Milano porta l\'iconico format Tr3ndy Society sotto i lampadari di cristallo di Via Messina 38. Un mix esplosivo di Hip-Hop, Reggaeton e hit commerciali con servizio tavoli VIP.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €250 to €1,200' },
    dressCode: {
      en: 'Smart Elegant. Collared shirts recommended for men.',
      it: 'Smart Elegant. Camicia consigliata per gli uomini.'
    },
    faqs: defaultFaqs('Pineta Club', 'Via Messina 38, Milan', '20+', 'Smart Elegant', 'Hip-Hop, Reggaeton and Commercial'),
    image: '/images/events/october-2026/254095-partner-xceed.webp',
    xceedLink: 'https://xceed.me/en/milano/event/tr3ndy-society-thursday-night-9/254095/channel/nightlifemilan-1',
    priority: 95
  },
  {
    id: 'pineta-friday',
    clubSlug: 'pineta',
    clubName: 'Pineta Club',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'aperitivo-cantato',
    name: 'Aperitivo Cantato & Live Music',
    genres: ['Live Music', 'Italian Hits', 'Commercial'],
    target: '25+, Professionals, Elegant',
    description: {
      en: 'The iconic Pineta experience arrives in Milan. Start your Friday with a sophisticated singing aperitivo, enjoying live music and great food, before the venue transforms into an elegant club for the night.',
      it: 'L\'iconica esperienza Pineta arriva a Milano. Inizia il tuo venerdì con un sofisticato aperitivo cantato, godendoti musica dal vivo e ottimo cibo, prima che il locale si trasformi in un club elegante per la notte.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €250 to €1,200' },
    dressCode: {
      en: 'Elegant and Chic. Collared shirts for men.',
      it: 'Elegante e Chic. Camicia con colletto per gli uomini.'
    },
    faqs: defaultFaqs('Pineta Club', 'Via Messina 38, Milan', '25+', 'Elegant and Chic', 'Live Music and Commercial'),
    image: '/images/events/october-2026/243822-fa1698470cb9.webp',
    xceedLink: 'https://xceed.me/en/milano/event/friday-night-702/249130/channel/nightlifemilan-1',
    priority: 95
  },
  {
    id: 'pineta-saturday',
    clubSlug: 'pineta',
    clubName: 'Pineta Club',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-live',
    name: 'Saturday Live & Club',
    genres: ['Live Music', 'Commercial', 'House'],
    target: '25+, VIPs, Elegant',
    description: {
      en: 'Saturday night at Pineta is synonymous with exclusivity. A premium dinner show followed by a high-end clubbing experience. The perfect choice for celebrations and VIP table bookings.',
      it: 'Il sabato sera al Pineta è sinonimo di esclusività. Un dinner show premium seguito da un\'esperienza di clubbing di alto livello. La scelta perfetta per celebrazioni e prenotazioni di tavoli VIP.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €250 to €1,200' },
    dressCode: {
      en: 'Strictly Elegant.',
      it: 'Strettamente Elegante.'
    },
    faqs: defaultFaqs('Pineta Club', 'Via Messina 38, Milan', '25+', 'Strictly Elegant', 'Live Music and Commercial'),
    image: '/images/events/october-2026/243815-e33432d48dd4.webp',
    xceedLink: 'https://xceed.me/en/milano/event/saturday-night-767/249139/channel/nightlifemilan-1',
    priority: 95
  },

  // --- ARIA CLUB MILANO (Summer Season May-Sep; closed in winter except rare special events) ---
  {
    id: 'aria-thursday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'thursday-night',
    name: 'Thursday Night (Summer Season May–Sep)',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, International, Summer Open-Air Crowd',
    description: {
      en: 'Summer Season (May–September): Aria Club Milano is closed during winter except for rare special events (such as NYE). In the warm season, Thursday Night opens with a 19:30 buffet aperitivo and open-air party at San Siro. For active winter nights this week, ask on WhatsApp for Just Me Milano (heated glass dome), Pineta, 55 Milano, Voya Rooftop, or REPVBLIC.',
      it: 'Stagione Estiva (Maggio–Settembre): in inverno Aria Club Milano è chiuso salvo eventi rari speciali (es. Capodanno). Nella stagione estiva il giovedì propone aperitivo a buffet dalle 19:30 e party open-air a San Siro. Per le serate invernali attive questa settimana scrivici su WhatsApp per Just Me Milano (cupola riscaldata), Pineta, 55 Milano, Voya Rooftop o REPVBLIC.'
    },
    pricing: { aperitif: 'From €15 (Summer)', club: 'From €15 (Summer · Winter closed)', tables: 'From €200 to €1,500 (Summer)' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/weekly-posters/aria-thursday.webp',
    priority: 90,
    seasonalSummerOnly: true
  },
  {
    id: 'aria-friday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-night',
    name: 'Friday Night (Summer Season May–Sep)',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, International, Summer Open-Air Crowd',
    description: {
      en: 'Summer Season (May–September): Aria Club Milano is closed during winter except for rare special events. During summer months, Friday Night runs open-air at San Siro from 19:30 aperitivo to late-night Dance Floor and Privé tables. For winter Fridays in Milan, book Just Me Milano, Pineta, 55 Milano, Voya Rooftop, or REPVBLIC via WhatsApp.',
      it: 'Stagione Estiva (Maggio–Settembre): in inverno Aria Club Milano è chiuso salvo eventi rari speciali. Nei mesi estivi il venerdì anima il parco di San Siro dalle 19:30 con aperitivo e tavoli Pista/Privé. Per i venerdì invernali a Milano prenota via WhatsApp Just Me Milano, Pineta, 55 Milano, Voya Rooftop o REPVBLIC.'
    },
    pricing: { aperitif: 'From €15 (Summer)', club: 'From €15 (Summer · Winter closed)', tables: 'From €200 to €1,500 (Summer)' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/october-2026/242611-d6dfa52deb0b.webp',
    priority: 90,
    seasonalSummerOnly: true
  },
  {
    id: 'aria-saturday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-night',
    name: 'Saturday Night (Summer Season May–Sep)',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, Mixed, Summer Open-Air Crowd',
    description: {
      en: 'Summer Season (May–September): Aria Club Milano is closed in winter except for rare special events. In summer, Saturday Night runs open-air at San Siro from 19:30 aperitivo until late. For active winter Saturdays in Milan, write on WhatsApp for Just Me Milano, Pineta, 55 Milano, Voya Rooftop, or REPVBLIC.',
      it: 'Stagione Estiva (Maggio–Settembre): in inverno Aria Club Milano è chiuso salvo eventi rari speciali. In estate il sabato si svolge all\'aperto a San Siro dalle 19:30 fino a tardi. Per i sabati invernali attivi a Milano scrivici su WhatsApp per Just Me Milano, Pineta, 55 Milano, Voya Rooftop o REPVBLIC.'
    },
    pricing: { aperitif: 'From €15 (Summer)', club: 'From €20 (Summer · Winter closed)', tables: 'From €200 to €600 (Summer)' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/october-2026/242617-59f08f112437.webp',
    priority: 90,
    seasonalSummerOnly: true
  },

  // --- VOYA ROOFTOP (Tue-Sun) ---
  {
    id: 'voya-tuesday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'rooftop-experience',
    name: 'Rooftop Experience',
    genres: ['Lounge', 'Deep House'],
    target: '25+, Professionals, Couples',
    description: {
      en: 'Elevate your evening at Voya Rooftop. Enjoy a breathtaking 20th-floor skyline dinner and premium cocktails with sophisticated lounge music. The perfect setting for a romantic date or a business meeting.',
      it: 'Eleva la tua serata al Voya Rooftop. Goditi una cena mozzafiato al 20° piano con vista sullo skyline e cocktail premium con sofisticata musica lounge. L\'ambiente perfetto per un appuntamento romantico o un incontro d\'affari.'
    },
    pricing: { aperitif: 'From €20', club: 'Free Entry (Reservation Required)', tables: 'Dinner from €60' },
    dressCode: {
      en: 'Smart Casual. Elegant attire preferred.',
      it: 'Smart Casual. Abbigliamento elegante preferito.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/events/weekly-posters/voya-tuesday.webp',
    priority: 80
  },
  {
    id: 'voya-wednesday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'rooftop-experience',
    name: 'Rooftop Experience',
    genres: ['Lounge', 'Deep House'],
    target: '25+, Professionals, Couples',
    description: {
      en: 'Elevate your evening at Voya Rooftop. Enjoy a breathtaking 20th-floor skyline dinner and premium cocktails with sophisticated lounge music. The perfect setting for a romantic date or a business meeting.',
      it: 'Eleva la tua serata al Voya Rooftop. Goditi una cena mozzafiato al 20° piano con vista sullo skyline e cocktail premium con sofisticata musica lounge. L\'ambiente perfetto per un appuntamento romantico o un incontro d\'affari.'
    },
    pricing: { aperitif: 'From €20', club: 'Free Entry (Reservation Required)', tables: 'Dinner from €60' },
    dressCode: {
      en: 'Smart Casual. Elegant attire preferred.',
      it: 'Smart Casual. Abbigliamento elegante preferito.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/events/weekly-posters/voya-wednesday.webp',
    priority: 80
  },
  {
    id: 'voya-thursday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'rooftop-experience',
    name: 'Rooftop Experience',
    genres: ['Lounge', 'Deep House'],
    target: '25+, Professionals, Couples',
    description: {
      en: 'Elevate your evening at Voya Rooftop. Enjoy a breathtaking 20th-floor skyline dinner and premium cocktails with sophisticated lounge music. The perfect setting for a romantic date or a business meeting.',
      it: 'Eleva la tua serata al Voya Rooftop. Goditi una cena mozzafiato al 20° piano con vista sullo skyline e cocktail premium con sofisticata musica lounge. L\'ambiente perfetto per un appuntamento romantico o un incontro d\'affari.'
    },
    pricing: { aperitif: 'From €20', club: 'Free Entry (Reservation Required)', tables: 'Dinner from €60' },
    dressCode: {
      en: 'Smart Casual. Elegant attire preferred.',
      it: 'Smart Casual. Abbigliamento elegante preferito.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/events/weekly-posters/voya-thursday.webp',
    priority: 80
  },
  {
    id: 'voya-friday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'rooftop-experience',
    name: 'Rooftop Experience',
    genres: ['Lounge', 'Deep House'],
    target: '25+, Professionals, Couples',
    description: {
      en: 'Elevate your evening at Voya Rooftop. Enjoy a breathtaking 20th-floor skyline dinner and premium cocktails with sophisticated lounge music. The perfect setting for a romantic date or a business meeting.',
      it: 'Eleva la tua serata al Voya Rooftop. Goditi una cena mozzafiato al 20° piano con vista sullo skyline e cocktail premium con sofisticata musica lounge. L\'ambiente perfetto per un appuntamento romantico o un incontro d\'affari.'
    },
    pricing: { aperitif: 'From €20', club: 'Free Entry (Reservation Required)', tables: 'Dinner from €60' },
    dressCode: {
      en: 'Smart Casual. Elegant attire preferred.',
      it: 'Smart Casual. Abbigliamento elegante preferito.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/events/weekly-posters/voya-friday.webp',
    priority: 80
  },
  {
    id: 'voya-saturday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'rooftop-experience',
    name: 'Rooftop Experience',
    genres: ['Lounge', 'Deep House'],
    target: '25+, Professionals, Couples',
    description: {
      en: 'Elevate your evening at Voya Rooftop. Enjoy a breathtaking 20th-floor skyline dinner and premium cocktails with sophisticated lounge music. The perfect setting for a romantic date or a business meeting.',
      it: 'Eleva la tua serata al Voya Rooftop. Goditi una cena mozzafiato al 20° piano con vista sullo skyline e cocktail premium con sofisticata musica lounge. L\'ambiente perfetto per un appuntamento romantico o un incontro d\'affari.'
    },
    pricing: { aperitif: 'From €20', club: 'Free Entry (Reservation Required)', tables: 'Dinner from €60' },
    dressCode: {
      en: 'Smart Casual. Elegant attire preferred.',
      it: 'Smart Casual. Abbigliamento elegante preferito.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/events/weekly-posters/voya-saturday.webp',
    priority: 80
  },
  {
    id: 'voya-sunday',
    clubSlug: 'voya',
    clubName: 'Voya Rooftop',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'skyline-brunch',
    name: 'Skyline Brunch & Aperitivo',
    genres: ['Lounge', 'Chillout'],
    target: '25+, Professionals, Relaxed',
    description: {
      en: 'End your week on a high note with the Voya Skyline Brunch and Aperitivo. Enjoy panoramic views of Milan while savoring gourmet food and signature cocktails in a relaxed, elegant atmosphere.',
      it: 'Concludi la settimana in bellezza con il Voya Skyline Brunch e Aperitivo. Goditi viste panoramiche su Milano mentre assapori cibo gourmet e cocktail d\'autore in un\'atmosfera rilassata ed elegante.'
    },
    pricing: { aperitif: 'From €25', club: 'Free Entry (Reservation Required)', tables: 'Brunch from €50' },
    dressCode: {
      en: 'Smart Casual.',
      it: 'Smart Casual.'
    },
    faqs: defaultFaqs('Voya Rooftop', 'Viale Achille Papa 30, Milan', '25+', 'Smart Casual', 'Lounge and Chillout'),
    image: '/images/events/weekly-posters/voya-sunday.webp',
    priority: 80
  },

  // --- 55 MILANO (Tue-Sun) ---
  {
    id: '55milano-tuesday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'royal-apericena-lounge',
    name: 'Royal Apericena XL & Lounge',
    genres: ['Lounge', 'Commercial', 'Deep House'],
    target: '25+, Professionals, Graduations & Birthdays',
    description: {
      en: 'Experience Milan\'s most spacious historic tram depot loft on Tuesday evenings: Royal Apericena XL from 7:30 PM, reserved group tables, signature cocktails, and lounge DJ sets.',
      it: 'Vivi il più grande loft ricavato da uno storico deposito ATM di Milano il martedì sera: Royal Apericena XL dalle 19:30, tavoli riservati per gruppi, cocktail d\'autore e lounge DJ set.'
    },
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €200' },
    dressCode: { en: 'Smart Casual.', it: 'Smart Casual.' },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '23+', 'Smart Casual', 'Lounge and Commercial'),
    image: '/images/events/weekly-posters/55milano-tuesday.webp',
    priority: 85
  },
  {
    id: '55milano-wednesday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'royal-apericena-lounge',
    name: 'Royal Apericena XL & Midweek Sound',
    genres: ['Lounge', 'Commercial', 'House'],
    target: '25+, Professionals, Groups',
    description: {
      en: 'Midweek at 55 Milano features an expansive buffet apericena, outdoor terrace seating, and curated DJ sets in the heart of the Sempione / Arco della Pace district.',
      it: 'Il mercoledì sera al 55 Milano offre un ricco buffet apericena, tavoli riservati tra loft e terrazza e DJ set selezionati nel cuore di Sempione / Arco della Pace.'
    },
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €200' },
    dressCode: { en: 'Smart Casual.', it: 'Smart Casual.' },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '23+', 'Smart Casual', 'Lounge and House'),
    image: '/images/events/weekly-posters/55milano-wednesday.webp',
    priority: 85
  },
  {
    id: '55milano-thursday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'dinner-show-thursday',
    name: 'Apericena & Pre-Weekend Party',
    genres: ['Live Music', 'Commercial', 'Hits'],
    target: '25+, Locals, Celebrations & Groups',
    description: {
      en: 'Kick off the weekend on Thursday at 55 Milano with reserved Apericena tables, live dinner entertainment, and DJ sets until late on Via Piero della Francesca 55.',
      it: 'Inizia il weekend il giovedì sera al 55 Milano con tavoli apericena riservati, intrattenimento musicale a cena e DJ set fino a tardi in Via Piero della Francesca 55.'
    },
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €250' },
    dressCode: { en: 'Smart Casual.', it: 'Smart Casual.' },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '25+', 'Smart Casual', 'Live Music and Commercial'),
    image: '/images/events/weekly-posters/55milano-thursday.webp',
    priority: 85
  },
  {
    id: '55milano-friday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'aperitivo-cena-cantata',
    name: 'Aperitivo & Cena Cantata',
    genres: ['Live Music', 'Commercial'],
    target: '25+, Locals, Groups',
    description: {
      en: 'The ultimate Milanese aperitivo experience. 55 Milano offers a massive venue with a vibrant atmosphere, perfect for large groups. Enjoy the famous "Cena Cantata" (singing dinner) and dance the night away.',
      it: 'L\'esperienza definitiva dell\'aperitivo milanese. 55 Milano offre un locale enorme con un\'atmosfera vibrante, perfetto per grandi gruppi. Goditi la famosa "Cena Cantata" e balla tutta la notte.'
    },
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €250' },
    dressCode: {
      en: 'Smart Casual.',
      it: 'Smart Casual.'
    },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '25+', 'Smart Casual', 'Live Music and Commercial'),
    image: '/images/events/weekly-posters/55milano-friday.webp',
    priority: 85
  },
  {
    id: '55milano-saturday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'aperitivo-cena-cantata',
    name: 'Aperitivo & Cena Cantata',
    genres: ['Live Music', 'Commercial'],
    target: '25+, Locals, Groups',
    description: {
      en: 'The ultimate Milanese aperitivo experience. 55 Milano offers a massive venue with a vibrant atmosphere, perfect for large groups. Enjoy the famous "Cena Cantata" (singing dinner) and dance the night away.',
      it: 'L\'esperienza definitiva dell\'aperitivo milanese. 55 Milano offre un locale enorme con un\'atmosfera vibrante, perfetto per grandi gruppi. Goditi la famosa "Cena Cantata" e balla tutta la notte.'
    },
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €250' },
    dressCode: {
      en: 'Smart Casual.',
      it: 'Smart Casual.'
    },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '25+', 'Smart Casual', 'Live Music and Commercial'),
    image: '/images/events/weekly-posters/55milano-saturday.webp',
    priority: 85
  },
  {
    id: '55milano-sunday',
    clubSlug: '55milano',
    clubName: '55 Milano',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'latin-night',
    name: 'Latin Night Aperitivo',
    genres: ['Reggaeton', 'Latin'],
    target: '21+, International, Energetic',
    description: {
      en: 'Spice up your Sunday with the hottest Latin Night in Milan. Start with a rich aperitivo and continue the night dancing to the best Reggaeton and Latin beats in a massive, energetic venue.',
      it: 'Ravviva la tua domenica con la Latin Night più calda di Milano. Inizia con un ricco aperitivo e continua la serata ballando al ritmo dei migliori brani Reggaeton e Latini in un locale enorme ed energico.'
    },
    pricing: { aperitif: 'From €20', club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Smart Casual. Comfortable for dancing.',
      it: 'Smart Casual. Comodo per ballare.'
    },
    faqs: defaultFaqs('55 Milano', 'Via Piero della Francesca 55, Milan', '21+', 'Smart Casual', 'Reggaeton and Latin'),
    image: '/images/events/weekly-posters/55milano-sunday.webp',
    priority: 85
  },

  // --- PLAY CLUB ---
  {
    id: 'playclub-tuesday',
    clubSlug: 'playclub',
    clubName: 'Play Club',
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'esplicito',
    name: 'Esplicito',
    genres: ['Hip-Hop', 'Trap'],
    target: '18+, University Students, Energetic',
    description: {
      en: 'The wildest Tuesday night in Milan. "Esplicito" at Play Club is dedicated to the best Hip-Hop and Trap music, attracting a young, energetic crowd ready to party hard.',
      it: 'Il martedì notte più selvaggio di Milano. "Esplicito" al Play Club è dedicato alla migliore musica Hip-Hop e Trap, attirando un pubblico giovane ed energico pronto a fare festa.'
    },
    pricing: { club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Casual Chic. Streetwear allowed.',
      it: 'Casual Chic. Streetwear consentito.'
    },
    faqs: defaultFaqs('Play Club', 'Viale Monte Grappa 14, Milan', '18+', 'Casual Chic', 'Hip-Hop and Trap'),
    image: '/images/events/weekly-posters/playclub-tuesday.webp',
    priority: 50
  },
  {
    id: 'playclub-thursday',
    clubSlug: 'playclub',
    clubName: 'Play Club',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'shakara',
    name: 'Shakara',
    genres: ['Reggaeton', 'Urban'],
    target: '18+, University Students, Energetic',
    description: {
      en: 'Feel the rhythm at "Shakara", Play Club\'s signature Thursday night. Expect a mix of Reggaeton and Urban beats that will keep the dancefloor packed all night long.',
      it: 'Senti il ritmo a "Shakara", la serata del giovedì firmata Play Club. Aspettati un mix di ritmi Reggaeton e Urban che manterranno la pista da ballo piena per tutta la notte.'
    },
    pricing: { club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Casual Chic.',
      it: 'Casual Chic.'
    },
    faqs: defaultFaqs('Play Club', 'Viale Monte Grappa 14, Milan', '18+', 'Casual Chic', 'Reggaeton and Urban'),
    image: '/images/events/weekly-posters/playclub-thursday.webp',
    priority: 50
  },
  {
    id: 'playclub-friday',
    clubSlug: 'playclub',
    clubName: 'Play Club',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'flexx',
    name: 'Flexx',
    genres: ['Commercial', 'House'],
    target: '21+, Locals, Energetic',
    description: {
      en: 'Start your weekend right with "Flexx" at Play Club. A high-energy Friday night featuring the best Commercial and House music, stunning light shows, and a vibrant crowd.',
      it: 'Inizia bene il tuo weekend con "Flexx" al Play Club. Un venerdì sera ad alta energia con la migliore musica Commerciale e House, spettacoli di luci mozzafiato e un pubblico vibrante.'
    },
    pricing: { club: 'From €20', tables: 'From €250' },
    dressCode: {
      en: 'Smart Casual.',
      it: 'Smart Casual.'
    },
    faqs: defaultFaqs('Play Club', 'Viale Monte Grappa 14, Milan', '21+', 'Smart Casual', 'Commercial and House'),
    image: '/images/events/weekly-posters/playclub-friday.webp',
    priority: 50
  },
  {
    id: 'playclub-saturday',
    clubSlug: 'playclub',
    clubName: 'Play Club',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'golden-society',
    name: 'Golden Society',
    genres: ['Commercial', 'House'],
    target: '21+, Locals, VIPs',
    description: {
      en: 'Join the "Golden Society" for Play Club\'s premium Saturday night. An exclusive atmosphere, top-tier bottle service, and the best DJs in town make this a night to remember.',
      it: 'Unisciti alla "Golden Society" per il sabato sera premium del Play Club. Un\'atmosfera esclusiva, servizio bottiglie di alto livello e i migliori DJ in città rendono questa una notte da ricordare.'
    },
    pricing: { club: 'From €20', tables: 'From €250' },
    dressCode: {
      en: 'Elegant. Dress to impress.',
      it: 'Elegante. Vestiti per impressionare.'
    },
    faqs: defaultFaqs('Play Club', 'Viale Monte Grappa 14, Milan', '21+', 'Elegant', 'Commercial and House'),
    image: '/images/events/weekly-posters/playclub-saturday.webp',
    priority: 50
  },
  {
    id: 'playclub-sunday',
    clubSlug: 'playclub',
    clubName: 'Play Club',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'demontime',
    name: 'DemonTime',
    genres: ['Hip-Hop', 'Trap'],
    target: '18+, Urban Fashion, Energetic',
    description: {
      en: 'End the weekend with a bang at "DemonTime". Play Club\'s Sunday night is dedicated to heavy Hip-Hop and Trap beats, attracting a dedicated crowd of urban music lovers.',
      it: 'Concludi il weekend col botto a "DemonTime". La domenica sera del Play Club è dedicata a ritmi Hip-Hop e Trap pesanti, attirando un pubblico dedicato di amanti della musica urban.'
    },
    pricing: { club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Urban Chic. Streetwear allowed.',
      it: 'Urban Chic. Streetwear consentito.'
    },
    faqs: defaultFaqs('Play Club', 'Viale Monte Grappa 14, Milan', '18+', 'Urban Chic', 'Hip-Hop and Trap'),
    image: '/images/events/weekly-posters/playclub-sunday.webp',
    priority: 50
  },

  // --- REPVBLIC MILANO (Tue Tech House, Thu Hip-Hop/Reggaeton, Fri-Sat Tech House, Sun Hip-Hop/Trap · WhatsApp booking ONLY, no ticket links) ---
  {
    id: 'repvblic-tuesday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'home-club-apero',
    name: 'HOME x CLUB APÉRO · Tech House',
    genres: ['Tech House', 'House'],
    target: '18+, International & Tech House Crowd',
    description: {
      en: 'Every Tuesday night at REPVBLIC Milano (Piazza della Repubblica 12): HOME x CLUB APÉRO from 22:30 till 05:00 with Tech House selectors. Guestlist free entry before 01:00 and VIP tables (Dancefloor from €300 for 5 guests, Privé from €600 for 10–12 guests) reserved exclusively via WhatsApp +39 351 912 7047.',
      it: 'Ogni martedì sera al REPVBLIC Milano (Piazza della Repubblica 12): HOME x CLUB APÉRO dalle 22:30 alle 05:00 con selezione Tech House. Ingresso in lista gratis entro le 01:00 e tavoli (Pista da 300 € per 5 persone, Privè da 600 € per 10–12 persone) prenotabili esclusivamente su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'Guestlist Free before 01:00 (WhatsApp only)', tables: 'Dancefloor from €300 (5 pax) · Privé from €600 (10–12 pax)' },
    dressCode: { en: 'Stylish Casual Chic (18+).', it: 'Casual Chic curato (18+).' },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '18+', 'Stylish Casual Chic', 'Tech House'),
    image: '/images/events/weekly-posters/repvblic-tuesday.webp',
    priority: 75
  },
  {
    id: 'repvblic-thursday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'buraka-movida',
    name: 'BURAKA x MOVIDA · Hip-Hop & Reggaeton',
    genres: ['Hip-Hop', 'Reggaeton'],
    target: '18+, International, University & Urban Crowd',
    description: {
      en: 'Thursday night at REPVBLIC Milano (Piazza della Repubblica 12) is dedicated to Hip-Hop and Reggaeton with BURAKA x MOVIDA from 23:30 to 05:00. RSVP free entry before 01:00 and VIP tables (Dancefloor from €300 for 5 guests, Privé from €600 for 10–12 guests) booked strictly via WhatsApp +39 351 912 7047.',
      it: 'Il giovedì notte al REPVBLIC Milano (Piazza della Repubblica 12) è dedicato a Hip-Hop e Reggaeton con BURAKA x MOVIDA dalle 23:30 alle 05:00. RSVP gratis entro le 01:00 e tavoli (Pista da 300 € per 5 persone, Privè da 600 € per 10–12 persone) prenotabili esclusivamente via WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'RSVP Free before 01:00 (WhatsApp only)', tables: 'Dancefloor from €300 (5 pax) · Privé from €600 (10–12 pax)' },
    dressCode: { en: 'Urban Chic (18+).', it: 'Urban Chic (18+).' },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '18+', 'Urban Chic', 'Hip-Hop and Reggaeton'),
    image: '/images/events/weekly-posters/repvblic-thursday.webp',
    priority: 75
  },
  {
    id: 'repvblic-friday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'tech-house-friday',
    name: 'Friday Night Tech House',
    genres: ['Tech House', 'Electronic'],
    target: '21+, International & Clubbing Crowd',
    description: {
      en: 'Friday night at REPVBLIC Milano (Piazza della Repubblica 12): pure Tech House clubbing from 23:30 to 05:00 inside Milan’s central indoor club. Entry (from €20 with 1 drink) and tables (Dancefloor from €300 for 5 guests, Privé from €600 for 10–12 guests) are arranged exclusively via WhatsApp +39 351 912 7047.',
      it: 'Il venerdì notte al REPVBLIC Milano (Piazza della Repubblica 12): clubbing Tech House dalle 23:30 alle 05:00 nella sala indoor del centro. Ingressi (da 20 € con 1 drink) e tavoli (Pista da 300 € per 5 persone, Privè da 600 € per 10–12 persone) si prenotano esclusivamente su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €20 with 1 drink (WhatsApp only)', tables: 'Dancefloor from €300 (5 pax) · Privé from €600 (10–12 pax)' },
    dressCode: { en: 'Smart Elegant.', it: 'Elegante curato.' },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '21+', 'Smart Elegant', 'Tech House'),
    image: '/images/events/weekly-posters/repvblic-friday.webp',
    priority: 75
  },
  {
    id: 'repvblic-saturday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-night',
    name: 'Saturday Night Tech House',
    genres: ['Tech House', 'House'],
    target: '21+, VIPs & International Crowd',
    description: {
      en: 'Saturday night at REPVBLIC Milano delivers Tech House and an international crowd from 23:30 to 05:00 at Piazza della Repubblica 12. Entry (from €20 with 1 drink) and VIP tables (Dancefloor from €300 for 5 guests, Privé from €600 for 10–12 guests) are booked exclusively via WhatsApp +39 351 912 7047.',
      it: 'Il sabato notte al REPVBLIC Milano unisce Tech House e pubblico internazionale dalle 23:30 alle 05:00 in Piazza della Repubblica 12. Ingressi (da 20 € con 1 drink) e tavoli VIP (Pista da 300 € per 5 persone, Privè da 600 € per 10–12 persone) si prenotano esclusivamente su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €20 with 1 drink (WhatsApp only)', tables: 'Dancefloor from €300 (5 pax) · Privé from €600 (10–12 pax)' },
    dressCode: { en: 'Strictly Elegant.', it: 'Strettamente Elegante.' },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '21+', 'Strictly Elegant', 'Tech House'),
    image: '/images/events/weekly-posters/repvblic-saturday.webp',
    priority: 75
  },
  {
    id: 'repvblic-sunday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'demon-time',
    name: 'DEMON TIME · Hip-Hop & Trap',
    genres: ['Hip-Hop', 'Trap'],
    target: '18+, Urban & Late-Night Crowd',
    description: {
      en: 'Sunday night at REPVBLIC Milano (Piazza della Repubblica 12): DEMON TIME from 23:59 till late with Hip-Hop and Trap selectors. Women Free before 01:30 and VIP tables (Dancefloor from €300 for 5 guests, Privé from €600 for 10–12 guests) reserved exclusively via WhatsApp +39 351 912 7047.',
      it: 'La domenica notte al REPVBLIC Milano (Piazza della Repubblica 12): DEMON TIME dalle 23:59 fino a tardi con selezioni Hip-Hop e Trap. Donna gratis entro le 01:30 e tavoli (Pista da 300 € per 5 persone, Privè da 600 € per 10–12 persone) prenotabili esclusivamente via WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'Women Free before 01:30 · WhatsApp only', tables: 'Dancefloor from €300 (5 pax) · Privé from €600 (10–12 pax)' },
    dressCode: { en: 'Urban Chic (18+).', it: 'Urban Chic (18+).' },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '18+', 'Urban Chic', 'Hip-Hop and Trap'),
    image: '/images/events/weekly-posters/repvblic-sunday.webp',
    priority: 75
  },

  // --- PHILIPP'S MILANO · THE PLEIN HOTEL (Tue-Sun · Dinner Show 20:00 + Luxury Club 00:00-04:30 · Concierge WhatsApp only) ---
  {
    id: 'philipps-tuesday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'tuesday',
    dayOfWeek: 2,
    eventSlug: 'from-brasil-to-milan',
    name: 'Brasilian Dinner Show & From Brasil to Milan',
    genres: ['Latin', 'Afro House', 'House'],
    target: '23+, Fashion Crowd, International Jet-Set',
    description: {
      en: "Every Tuesday at Philipp's Milano inside The Plein Hotel (Via Daniele Manin 21): start at 20:00 with the vibrant Brasilian Dinner Show curated by Executive Chef Roberto Conti with live performers, followed from midnight till 04:30 by the From Brasil to Milan luxury club party. Dinner tables and VIP bottle service reserved via WhatsApp +39 351 912 7047.",
      it: "Ogni martedì al Philipp's Milano dentro The Plein Hotel (Via Daniele Manin 21): dalle 20:00 il Brasilian Dinner Show firmato dall'Executive Chef Roberto Conti con performance dal vivo, seguito da mezzanotte alle 04:30 dal party club From Brasil to Milan. Tavoli cena e tavoli VIP club su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: 'Dinner Show 20:00 (Concierge Quote)', club: 'Club 00:00–04:30 (VIP Concierge)', tables: 'VIP Bottle Service (100% credit via WhatsApp)' },
    dressCode: { en: 'Haute Couture & Strictly Elegant (blazer/collared shirt mandatory).', it: 'Haute Couture e Rigorosamente Elegante (camicia e giacca richieste).' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '23+', 'Haute Couture & Strictly Elegant', 'Brazilian Rhythms, Afro House and Luxury House'),
    image: '/images/events/weekly-posters/philipps-tuesday-brasil.webp',
    priority: 72
  },
  {
    id: 'philipps-wednesday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'tussy',
    name: "TUSSY · Wednesday Night & The Philipp's Show",
    genres: ['House', 'Hip-Hop', 'Commercial'],
    target: '23+, Models, Fashion Insiders, International VIPs',
    description: {
      en: "Wednesday nights at Philipp's Milano (The Plein Hotel, Via Daniele Manin 21) open at 20:00 with The Philipp's Show fine-dining theatrical dinner (live show at 21:45) and ignite at midnight with TUSSY until 04:30 beneath crystal chandeliers. Reserve dining or VIP club tables via WhatsApp +39 351 912 7047.",
      it: "Il mercoledì al Philipp's Milano (The Plein Hotel, Via Daniele Manin 21) si apre alle 20:00 con la cena spettacolo The Philipp's Show (live show 21:45) e prosegue da mezzanotte alle 04:30 con il format club TUSSY sotto i lampadari di cristallo. Prenotazioni cena e tavoli VIP su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: "The Philipp's Show 20:00", club: 'TUSSY Club 00:00–04:30 (Concierge)', tables: 'Chandelier Floor & Mezzanine Privé via WhatsApp' },
    dressCode: { en: 'Haute Couture & Strictly Elegant.', it: 'Haute Couture e Rigorosamente Elegante.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '23+', 'Haute Couture & Strictly Elegant', 'House, Hip-Hop and International Club Hits'),
    image: '/images/events/weekly-posters/philipps-wednesday-tussy.webp',
    priority: 72
  },
  {
    id: 'philipps-thursday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'saint',
    name: "SAINT · Thursday Night & The Philipp's Show",
    genres: ['Afro House', 'House', 'Electronic'],
    target: '23+, Fashion & Luxury Hospitality Crowd',
    description: {
      en: "Thursday at Philipp's Milano (Via Daniele Manin 21, The Plein Hotel) pairs Executive Chef Roberto Conti's 20:00 Dinner Show with SAINT from 00:00 to 04:30, delivering Afro-House and Melodic House sets for Milan's fashion crowd. Direct concierge reservations on WhatsApp +39 351 912 7047.",
      it: "Il giovedì del Philipp's Milano (Via Daniele Manin 21, The Plein Hotel) unisce il Dinner Show delle 20:00 dello Chef Roberto Conti al party SAINT dalle 00:00 alle 04:30, tra sonorità Afro-House e House per il pubblico della moda. Prenotazioni Concierge su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: "The Philipp's Show 20:00", club: 'SAINT Club 00:00–04:30 (Concierge)', tables: 'VIP Bottle Service via WhatsApp' },
    dressCode: { en: 'Haute Couture & Strictly Elegant.', it: 'Haute Couture e Rigorosamente Elegante.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '23+', 'Haute Couture & Strictly Elegant', 'Afro House and Luxury Vocal House'),
    image: '/images/events/weekly-posters/philipps-thursday-saint.webp',
    priority: 72
  },
  {
    id: 'philipps-friday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'club-for-life',
    name: "CLUB FOR LIFE · Friday Night at Philipp's",
    genres: ['House', 'Commercial', 'Afro House'],
    target: '25+, International Jet-Set, Celebrities & VIPs',
    description: {
      en: "Friday nights come alive with CLUB FOR LIFE at Philipp's Milano inside Philipp Plein's flagship hotel (Via Daniele Manin 21). Begin at 20:00 with The Philipp's Show dinner performance and continue from midnight to 04:30 with luminous Dom Pérignon bottle parades. Book via WhatsApp +39 351 912 7047.",
      it: "Il venerdì notte prende vita con CLUB FOR LIFE al Philipp's Milano dentro The Plein Hotel di Philipp Plein (Via Daniele Manin 21). Dalle 20:00 cena spettacolo The Philipp's Show e dalle 00:00 alle 04:30 clubbing esclusivo e bottle parade. Prenota su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: "The Philipp's Show 20:00", club: 'ClubForLife 00:00–04:30 (Concierge)', tables: 'Chandelier Floor, Mezzanine & Console VIP' },
    dressCode: { en: 'Haute Couture & Strictly Elegant.', it: 'Haute Couture e Rigorosamente Elegante.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '25+', 'Haute Couture & Strictly Elegant', 'House, Afro House and Luxury Clubbing'),
    image: '/images/events/weekly-posters/philipps-friday-clubforlife.webp',
    priority: 74
  },
  {
    id: 'philipps-saturday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'konekt',
    name: "KONEKT · Saturday Night at Philipp's Milano",
    genres: ['House', 'Afro House', 'Electronic'],
    target: '25+, High Society, Designers & International VIPs',
    description: {
      en: "Saturday flagship night KONEKT at Philipp's Milano (The Plein Hotel, Via Daniele Manin 21): theatrical fine dining from 20:00 with Chef Roberto Conti and live performers, transitioning at 00:00 into Milan's high-jewelry House and Afro-House sanctuary until 04:30. VIP tables via WhatsApp +39 351 912 7047.",
      it: "Il sabato sera di punta KONEKT al Philipp's Milano (The Plein Hotel, Via Daniele Manin 21): alta cucina teatrale dalle 20:00 con lo Chef Roberto Conti e show dal vivo, seguita a mezzanotte dal club House e Afro-House fino alle 04:30. Tavoli VIP su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: "The Philipp's Show 20:00", club: 'KONEKT 00:00–04:30 (Concierge)', tables: 'VIP Bottle Service on Request' },
    dressCode: { en: 'Haute Couture & Strictly Elegant.', it: 'Haute Couture e Rigorosamente Elegante.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '25+', 'Haute Couture & Strictly Elegant', 'House and Afro House'),
    image: '/images/events/weekly-posters/philipps-saturday-konekt.webp',
    priority: 74
  },
  {
    id: 'philipps-sunday',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'sweetie',
    name: "SWEETIE · Sunday Urban Night & Dinner Show",
    genres: ['Hip-Hop', 'RnB', 'Urban'],
    target: '23+, Models, Athletes, Artists & Fashion Crowd',
    description: {
      en: "Every Sunday at Philipp's Milano (The Plein Hotel, Via Daniele Manin 21): start at 20:00 with The Philipp's Show dinner experience and stay for SWEETIE Urban Night from 00:00 to 04:30 featuring luxury Hip-Hop and R&B sets. Concierge booking via WhatsApp +39 351 912 7047.",
      it: "Ogni domenica al Philipp's Milano (The Plein Hotel, Via Daniele Manin 21): dalle 20:00 cena spettacolo The Philipp's Show e da mezzanotte alle 04:30 SWEETIE Urban Night con selezioni Hip-Hop e R&B di fascia luxury. Prenotazioni Concierge su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: "The Philipp's Show 20:00", club: 'SWEETIE 00:00–04:30 (Concierge)', tables: 'VIP Bottle Service via WhatsApp' },
    dressCode: { en: 'Luxury Urban Glamour & Smart Tailoring.', it: 'Luxury Urban Glamour e Sartoriale Curato.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '23+', 'Luxury Urban Glamour', 'Hip-Hop and R&B'),
    image: '/images/events/weekly-posters/philipps-sunday-sweetie.webp',
    priority: 72
  },
  {
    id: 'philipps-dinnershow',
    clubSlug: 'philipps',
    clubName: "Philipp's Milano",
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'the-philipps-show',
    name: "The Philipp's Show · Fine Dining & Live Performance",
    genres: ['Live Music', 'Commercial', 'House'],
    target: '25+, Couples, Luxury Diners & VIP Celebrations',
    description: {
      en: "Running Wednesday through Sunday inside The Plein Hotel (Via Daniele Manin 21), The Philipp's Show combines Executive Chef Roberto Conti's Italian haute cuisine (seating at 20:00) with a theatrical live vocal and choreography show at 21:45 before the midnight club transformation. Book on WhatsApp +39 351 912 7047.",
      it: "In scena dal mercoledì alla domenica dentro The Plein Hotel (Via Daniele Manin 21), The Philipp's Show fonde l'alta cucina dell'Executive Chef Roberto Conti (ingresso cena ore 20:00) con lo spettacolo vocale e coreografico dal vivo delle 21:45 prima del club di mezzanotte. Prenota su WhatsApp al +39 351 912 7047."
    },
    pricing: { aperitif: 'Seated Dinner Show 20:00 (Concierge)', club: 'Direct Midnight Club Transition', tables: 'Dinner + Club VIP Table Combos' },
    dressCode: { en: 'Evening Elegance & Haute Couture.', it: 'Eleganza da Sera e Haute Couture.' },
    faqs: defaultFaqs("Philipp's Milano", 'Via Daniele Manin 21 (The Plein Hotel), Milan', '25+', 'Evening Elegance', 'Live Vocal Show & House'),
    image: '/images/events/weekly-posters/philipps-dinnershow.webp',
    priority: 73
  },

  // --- THE CLUB MILANO (Wed-Sun · Corso Garibaldi 97, Brera/Moscova · 5 Official Weekly Formats) ---
  {
    id: 'theclub-wednesday',
    clubSlug: 'theclub',
    clubName: 'The Club Milano',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'one-two',
    name: 'ONE TWO · Wednesday Hip-Hop Benchmark',
    genres: ['Hip-Hop', 'RnB', 'Urban'],
    target: '18+, International Students, Models & Hip-Hop Lovers',
    description: {
      en: "Milan's historic Wednesday Hip-Hop institution at The Club Milano (Corso Garibaldi 97, Brera/Moscova) from 23:30 to 05:00: ONE TWO delivers pure US & Italian Hip-Hop, R&B, and urban clubbing energy. Guest inquiry and VIP tables (Pista from €400 with 2 bottles, Privé Lato Consolle €440, VIP €600) via WhatsApp +39 351 912 7047.",
      it: "Lo storico appuntamento Hip-Hop del mercoledì al The Club Milano (Corso Garibaldi 97, Brera/Moscova) dalle 23:30 alle 05:00: ONE TWO porta in pista il meglio di Hip-Hop, R&B e urban. Info ingressi e tavoli VIP (Pista da 400 € con 2 bottiglie, Privé Lato Consolle 440 €, VIP 600 €) su WhatsApp al +39 351 912 7047."
    },
    pricing: { club: 'From €15–€25 w/ drink (Concierge)', tables: 'Pista €400 (2 bott.) · Privé Consolle €440 · VIP €600' },
    dressCode: { en: 'Smart Urban Chic (18+). Clean shirt/dark jeans; no tracksuits.', it: 'Smart Urban Chic (18+). Camicia o t-shirt curata; vietate tute.' },
    faqs: defaultFaqs('The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova), Milan', '18+', 'Smart Urban Chic', 'Hip-Hop and R&B'),
    image: '/images/events/weekly-posters/theclub-wednesday-onetwo.webp',
    priority: 68
  },
  {
    id: 'theclub-thursday',
    clubSlug: 'theclub',
    clubName: 'The Club Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'atlanta',
    name: 'ATLANTA · Thursday International Night (Since 2005)',
    genres: ['Hip-Hop', 'Reggaeton', 'Commercial'],
    target: '18+, International University, Fashion & Erasmus Crowd',
    description: {
      en: 'Running since 2005 at The Club Milano (Corso Garibaldi 97, M2 Moscova), ATLANTA is Thursday night’s #1 international gathering from 23:30 to 05:00 mixing Hip-Hop, Reggaeton, and global hits. Reserve Dancefloor or Console Privé tables via WhatsApp +39 351 912 7047.',
      it: 'Attivo dal 2005 al The Club Milano (Corso Garibaldi 97, M2 Moscova), ATLANTA è il punto di riferimento internazionale del giovedì notte dalle 23:30 alle 05:00 tra Hip-Hop, Reggaeton e hit mondiali. Prenota tavoli Pista o Privé Consolle su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €15–€25 w/ drink (Concierge)', tables: 'Pista €400 (2 bott.) · Privé Consolle €440 · VIP €600' },
    dressCode: { en: 'Smart Casual Chic (18+).', it: 'Smart Casual Chic (18+).' },
    faqs: defaultFaqs('The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova), Milan', '18+', 'Smart Casual Chic', 'Hip-Hop, Reggaeton and Commercial Hits'),
    image: '/images/events/weekly-posters/theclub-thursday-atlanta.webp',
    priority: 68
  },
  {
    id: 'theclub-friday',
    clubSlug: 'theclub',
    clubName: 'The Club Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'first-class',
    name: 'FIRST CLASS · Friday Fashion & Clubbing',
    genres: ['House', 'Hip-Hop', 'Commercial'],
    target: '20+, Fashion Agencies, Brera Crowd & International Guests',
    description: {
      en: 'Kick off the weekend in Brera with FIRST CLASS every Friday from 23:30 to 05:30 at The Club Milano (Corso Garibaldi 97), uniting Milanese fashion agencies, international travellers, and high-energy House and Hip-Hop sets. VIP bottle tables booked via WhatsApp +39 351 912 7047.',
      it: 'Inaugura il weekend a Brera con FIRST CLASS ogni venerdì dalle 23:30 alle 05:30 al The Club Milano (Corso Garibaldi 97), tra agenzie moda, pubblico internazionale e selezioni House e Hip-Hop. Tavoli VIP prenotabili su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €15–€25 w/ drink (Concierge)', tables: 'Pista €400 (2 bott.) · Privé Consolle €440 · VIP €600+' },
    dressCode: { en: 'Trendy Glamour & Smart Chic.', it: 'Trendy Glamour e Smart Chic.' },
    faqs: defaultFaqs('The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova), Milan', '20+', 'Trendy Glamour', 'House, Hip-Hop and Commercial'),
    image: '/images/events/weekly-posters/theclub-friday-firstclass.webp',
    priority: 70
  },
  {
    id: 'theclub-saturday',
    clubSlug: 'theclub',
    clubName: 'The Club Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'girls-republic',
    name: 'GIRLS REPUBLIC · Saturday Flagship Party',
    genres: ['Commercial', 'House', 'Reggaeton'],
    target: '20+, VIP Groups, Models & International Nightlife',
    description: {
      en: 'Saturday night flagship GIRLS REPUBLIC at The Club Milano (Corso Garibaldi 97, Brera) packs the dancefloor and elevated VIP rings from 23:30 to 05:30 with Vocal House, Commercial anthems, and Reggaeton. Secure your Dancefloor or Privé Lato Consolle table on WhatsApp +39 351 912 7047.',
      it: 'Il sabato sera di punta GIRLS REPUBLIC al The Club Milano (Corso Garibaldi 97, Brera) accende la pista e i privé rialzati dalle 23:30 alle 05:30 tra Vocal House, hit Commerciali e Reggaeton. Blocca il tuo tavolo Pista o Privé Lato Consolle su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €15–€25 w/ drink (Concierge)', tables: 'Pista €400 (2 bott.) · Privé Consolle €440 · VIP €600–€1,200' },
    dressCode: { en: 'Elegant Clubwear. Collared shirt recommended for men.', it: 'Clubwear Elegante. Camicia consigliata per l’uomo.' },
    faqs: defaultFaqs('The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova), Milan', '20+', 'Elegant Clubwear', 'Vocal House, Commercial and Reggaeton'),
    image: '/images/events/weekly-posters/theclub-saturday-girlsrepublic.webp',
    priority: 70
  },
  {
    id: 'theclub-sunday',
    clubSlug: 'theclub',
    clubName: 'The Club Milano',
    day: 'sunday',
    dayOfWeek: 0,
    eventSlug: 'superbe',
    name: 'SUPERBE · Sunday Hip-Hop, Trap & Reggaeton',
    genres: ['Hip-Hop', 'Trap', 'Reggaeton'],
    target: '18+, Athletes, Models & Urban Nightlife Insiders',
    description: {
      en: 'Close the week in iconic style at SUPERBE every Sunday night (23:30–05:00) at The Club Milano (Corso Garibaldi 97), Milan’s legendary Sunday benchmark for Hip-Hop, Trap, and Reggaeton. VIP table reservations via WhatsApp +39 351 912 7047.',
      it: 'Chiudi la settimana con SUPERBE ogni domenica notte (23:30–05:00) al The Club Milano (Corso Garibaldi 97), la storica serata domenicale punto di riferimento per Hip-Hop, Trap e Reggaeton. Tavoli VIP su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'From €15–€25 w/ drink (Concierge)', tables: 'Pista €400 (2 bott.) · Privé Consolle €440 · VIP €600' },
    dressCode: { en: 'Fashion Streetwear & Urban Chic.', it: 'Fashion Streetwear e Urban Chic.' },
    faqs: defaultFaqs('The Club Milano', 'Corso Garibaldi 97 (Brera / Moscova), Milan', '18+', 'Urban Chic', 'Hip-Hop, Trap and Reggaeton'),
    image: '/images/events/weekly-posters/theclub-sunday-superbe.webp',
    priority: 68
  },

  // --- MIB MILANO (Wed-Sat · Via Gaetano Negri 10, Piazza Affari · 4 Official Weekly Formats) ---
  {
    id: 'mibmilano-wednesday',
    clubSlug: 'mibmilano',
    clubName: 'MIB Milano',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'international-week',
    name: 'INTERNATIONAL WEEK & Open Wine Bar',
    genres: ['Commercial', 'House', 'Reggaeton'],
    target: '20+, International Students, Young Professionals & Expats',
    description: {
      en: 'Every Wednesday at MIB Milano (Via Gaetano Negri 10, Piazza Affari, 300 m from Piazza Duomo): INTERNATIONAL WEEK starts at 20:30 with the convivial Open Wine Bar aperitivo and flows into an international club party from 23:30 to 05:00. Book tables and guest access via WhatsApp +39 351 912 7047.',
      it: 'Ogni mercoledì al MIB Milano (Via Gaetano Negri 10, Piazza Affari, a 300 m dal Duomo): INTERNATIONAL WEEK parte alle 20:30 con l’aperitivo Open Wine Bar e prosegue dalle 23:30 alle 05:00 con il party internazionale. Tavoli e accrediti su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'Open Wine Bar Aperitivo from 20:30', club: 'Club from 23:30 (Concierge)', tables: 'From €250 to €600' },
    dressCode: { en: 'Smart Casual Chic.', it: 'Smart Casual Chic.' },
    faqs: defaultFaqs('MIB Milano', 'Via Gaetano Negri 10 (Piazza Affari), Milan', '20+', 'Smart Casual Chic', 'Commercial, House and Reggaeton'),
    image: '/images/events/weekly-posters/mib-wednesday-international.webp',
    priority: 66
  },
  {
    id: 'mibmilano-thursday',
    clubSlug: 'mibmilano',
    clubName: 'MIB Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'justice',
    name: 'JUSTICE x Fastlife · Thursday Urban Night',
    genres: ['Hip-Hop', 'Reggaeton', 'Trap'],
    target: '18+, Urban Fashion & University Crowd',
    description: {
      en: 'Thursday night at MIB Milano (Via Gaetano Negri 10, Piazza Affari) hosts JUSTICE in collaboration with Fastlife from 23:00 to 05:00: Hip-Hop, Reggaeton, Trap, and R&B right in Milan’s financial district. Pre-sale before 01:00 from €1, after 01:00 €15 Woman / €20 Man w/ 1 drink; VIP tables from €250 via WhatsApp +39 351 912 7047.',
      it: 'Il giovedì notte del MIB Milano (Via Gaetano Negri 10, Piazza Affari) accende JUSTICE in collaborazione con Fastlife dalle 23:00 alle 05:00 tra Hip-Hop, Reggaeton, Trap e R&B. Ingresso entro le 01:00 da 1 €, dopo le 01:00 15 € Donna / 20 € Uomo con 1 drink; tavoli VIP da 250 € su WhatsApp al +39 351 912 7047.'
    },
    pricing: { club: 'Before 01:00 €1 · After 01:00 €15W / €20M w/ 1 drink', tables: 'From €250 to €600' },
    dressCode: { en: 'Urban Chic (no tracksuits).', it: 'Urban Chic (vietate tute sportive).' },
    faqs: defaultFaqs('MIB Milano', 'Via Gaetano Negri 10 (Piazza Affari), Milan', '18+', 'Urban Chic', 'Hip-Hop, Reggaeton, Trap and R&B'),
    image: '/images/events/weekly-posters/mib-thursday-justice.webp',
    priority: 66
  },
  {
    id: 'mibmilano-friday',
    clubSlug: 'mibmilano',
    clubName: 'MIB Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'billions',
    name: 'BILLIONS · Friday Singing Dinner Show & Club',
    genres: ['Live Music', 'Commercial', 'House'],
    target: '23+, Corporate Piazza Affari, Birthdays & Elegant Groups',
    description: {
      en: 'Friday night at MIB Milano (Via Gaetano Negri 10, Piazza Affari) presents BILLIONS: Royal Aperitivo & Singing Dinner Show from 20:00 to 23:30 inside the illuminated winter garden, followed by Commercial and Vocal House clubbing until 05:00. Dinner and VIP bottle tables booked via WhatsApp +39 351 912 7047.',
      it: 'Il venerdì sera al MIB Milano (Via Gaetano Negri 10, Piazza Affari) va in scena BILLIONS: Aperitivo Royal e Cena Cantata Spettacolo dalle 20:00 alle 23:30 nel giardino d’inverno, seguiti da discoteca Commerciale e Vocal House fino alle 05:00. Prenota cena o tavolo VIP su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'Aperitivo & Dinner Show from 20:00', club: 'Club from 23:30 (from €20 w/ drink)', tables: 'From €250 to €800' },
    dressCode: { en: 'Smart Elegant. Collared shirt required for men.', it: 'Smart Elegant. Camicia richiesta per gli uomini.' },
    faqs: defaultFaqs('MIB Milano', 'Via Gaetano Negri 10 (Piazza Affari), Milan', '23+', 'Smart Elegant', 'Singing Dinner Show, Commercial and House'),
    image: '/images/events/weekly-posters/mib-friday-billions.webp',
    priority: 68
  },
  {
    id: 'mibmilano-saturday',
    clubSlug: 'mibmilano',
    clubName: 'MIB Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'love-affair',
    name: 'LOVE AFFAIR · Saturday Cena Cantata & Club',
    genres: ['Live Music', 'Commercial', 'House'],
    target: '25+, Celebrations, Bachelorettes & VIP Groups',
    description: {
      en: 'LOVE AFFAIR is MIB Milano’s signature Saturday night at Piazza Affari (Via Gaetano Negri 10): dine and sing along during the 20:00 Cena Spettacolo with live vocalists and saxophonists, then dance until 05:00 without changing venue. Reserve dinner or after-dinner VIP tables on WhatsApp +39 351 912 7047.',
      it: 'LOVE AFFAIR è il sabato simbolo del MIB Milano in Piazza Affari (Via Gaetano Negri 10): dalle 20:00 Cena Spettacolo Cantata con vocalist e sax dal vivo, poi pista club fino alle 05:00 senza cambiare locale. Tavoli cena e privé dopocena su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'Cena Spettacolo & Royal Buffet from 20:00', club: 'Club from 23:30 (from €20 w/ drink)', tables: 'From €300 to €800' },
    dressCode: { en: 'Strictly Elegant.', it: 'Strettamente Elegante.' },
    faqs: defaultFaqs('MIB Milano', 'Via Gaetano Negri 10 (Piazza Affari), Milan', '25+', 'Strictly Elegant', 'Cena Cantata, Live Music and House'),
    image: '/images/events/weekly-posters/mib-saturday-loveaffair.webp',
    priority: 68
  },

  // --- TERRAZZA DUOMO 21 (Thu-Sat · Piazza del Duomo 21 · Panoramic Cathedral-View Aperitivo, Dining & DJ Set) ---
  {
    id: 'terrazza21-thursday',
    clubSlug: 'terrazza21',
    clubName: 'Terrazza Duomo 21',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'duomo-sunset-lounge',
    name: 'Duomo Sunset Lounge · Aperitivo & DJ Set',
    genres: ['Deep House', 'Lounge', 'House'],
    target: '25+, International Guests, Couples & Executive Crowd',
    description: {
      en: 'Overlooking the illuminated marble facade of Milan Cathedral from Piazza del Duomo 21 (1st Floor), Terrazza Duomo 21 hosts its Thursday Sunset Aperitivo, Chef Valerio Braschi dining, and lounge DJ set until 02:00. Reserve terrace or indoor window tables via WhatsApp +39 351 912 7047.',
      it: 'Affacciata direttamente sulle guglie illuminate del Duomo da Piazza del Duomo 21 (1° Piano), Terrazza Duomo 21 propone il giovedì tra Sunset Aperitivo, ristorante firmato Chef Valerio Braschi e DJ set lounge fino alle 02:00. Prenota tavoli vista Duomo su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'From €22–€25 (Sunset Aperitivo)', club: 'Evening Lounge & Cocktail Bar', tables: 'From €250 to €800' },
    dressCode: { en: 'Smart Elegant.', it: 'Smart Elegant.' },
    faqs: defaultFaqs('Terrazza Duomo 21', 'Piazza del Duomo 21, Milan', '23+', 'Smart Elegant', 'Deep House and Skyline Lounge'),
    image: '/images/events/weekly-posters/terrazza21-thursday-aperitivo.webp',
    priority: 67
  },
  {
    id: 'terrazza21-friday',
    clubSlug: 'terrazza21',
    clubName: 'Terrazza Duomo 21',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-over-duomo',
    name: 'Friday Over Duomo · Skyline Aperitivo & Club',
    genres: ['House', 'Commercial'],
    target: '25+, Fashion & International Visitors, VIP Groups',
    description: {
      en: 'Every Friday at Terrazza Duomo 21 (Piazza del Duomo 21): golden-hour cocktails facing the Cathedral spires from 18:30, contemporary Italian dinner, and panoramic House & Commercial DJ sets from 22:30 until 03:00. Terrace and indoor VIP tables via WhatsApp +39 351 912 7047.',
      it: 'Ogni venerdì a Terrazza Duomo 21 (Piazza del Duomo 21): cocktail al tramonto di fronte alle guglie del Duomo dalle 18:30, cena italiana contemporanea e DJ set House e Commerciale dalle 22:30 alle 03:00. Tavoli VIP in terrazza e sala interna su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'From €25 (Duomo View Aperitivo)', club: 'After-Dinner DJ Set from €25', tables: 'From €300 to €1,000' },
    dressCode: { en: 'Strictly Elegant.', it: 'Strettamente Elegante.' },
    faqs: defaultFaqs('Terrazza Duomo 21', 'Piazza del Duomo 21, Milan', '23+', 'Strictly Elegant', 'Vocal House and Commercial'),
    image: '/images/events/weekly-posters/terrazza21-friday-skyline.webp',
    priority: 69
  },
  {
    id: 'terrazza21-saturday',
    clubSlug: 'terrazza21',
    clubName: 'Terrazza Duomo 21',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-skyline',
    name: 'Saturday Skyline · Piazza Duomo Night & DJ Set',
    genres: ['House', 'Commercial'],
    target: '25+, Couples, International Jet-Set & Celebrations',
    description: {
      en: 'Saturday night directly above Piazza del Duomo: Terrazza Duomo 21 combines sunset aperitivo, fine dining (1st Floor Chef Valerio Braschi & 5th Floor 2-Michelin-Star Terrazza MA.RE), and late-night DJ clubbing until 03:30. Advance table reservation required via WhatsApp +39 351 912 7047.',
      it: 'Il sabato sera sospeso sopra Piazza del Duomo: Terrazza Duomo 21 unisce aperitivo vista Cattedrale, alta cucina (1° Piano Chef Valerio Braschi e 5° Piano Terrazza MA.RE 2 Stelle Michelin) e DJ set fino alle 03:30. Prenotazione tavolo su WhatsApp al +39 351 912 7047.'
    },
    pricing: { aperitif: 'From €25 (Sunset Aperitivo)', club: 'After-Dinner DJ Set from €25', tables: 'From €300 to €1,200' },
    dressCode: { en: 'Strictly Elegant.', it: 'Strettamente Elegante.' },
    faqs: defaultFaqs('Terrazza Duomo 21', 'Piazza del Duomo 21, Milan', '25+', 'Strictly Elegant', 'House and Commercial'),
    image: '/images/events/weekly-posters/terrazza21-saturday-duomo.webp',
    priority: 69
  },
  // --- BERGAMO & BRESCIA FLAGSHIP CLUBS (13 Active Weekly Nights) ---
  {
    id: 'setai-bergamo-friday',
    clubSlug: 'setai-bergamo',
    clubName: 'Setai Club Bergamo',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-urban-arena',
    name: 'Friday Commercial, Urban & Reggaeton Arena',
    genres: ['Commercial', 'Urban', 'Reggaeton'],
    target: '18+ / 20+, Bergamo & Milan East A4 Crowd',
    description: {
      en: 'Every Friday at Setai Club Bergamo (Località Portico 21, Orio al Serio, 4 min from BGY Airport & A4 exit): main arena Commercial, Urban, Hip-Hop, and Reggaeton with VIP Privé tables via WhatsApp +39 351 912 7047.',
      it: 'Ogni venerdì al Setai Club Bergamo (Località Portico 21, Orio al Serio, a 4 min da Orio BGY e casello A4): arena principale Commercial, Urban, Hip-Hop e Reggaeton con Tavoli VIP Privé su WhatsApp +39 351 912 7047.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Smart & Club Chic (no tracksuits).', it: 'Smart & Club Chic (vietate tute sportive).' },
    faqs: defaultFaqs('Setai Club Bergamo', 'Località Portico 21, Orio al Serio (BG)', '18+ / 20+', 'Smart & Club Chic', 'Commercial, Urban and Reggaeton'),
    image: '/images/events/weekly-posters/setai-bergamo-friday.webp',
    priority: 68
  },
  {
    id: 'setai-bergamo-saturday',
    clubSlug: 'setai-bergamo',
    clubName: 'Setai Club Bergamo',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-juice-tech-house',
    name: 'Saturday Juice Tech-House & Main Room Showcase',
    genres: ['Tech-House', 'House', 'Commercial'],
    target: '20+, Electronic & Multi-Room Clubbers',
    description: {
      en: 'Flagship Saturday night at Setai Club Bergamo (Orio al Serio): Juice Tech-House showcase, international guest DJs, commercial room, and DJ Console Super Privé via WhatsApp +39 351 912 7047.',
      it: 'Il sabato sera di punta al Setai Club Bergamo (Orio al Serio): showcase Juice Tech-House, guest DJ internazionali, sala commerciale e Super Privé Consolle su WhatsApp +39 351 912 7047.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Club Chic & Fashion.', it: 'Club Chic & Fashion.' },
    faqs: defaultFaqs('Setai Club Bergamo', 'Località Portico 21, Orio al Serio (BG)', '20+', 'Club Chic', 'Tech-House, House and Commercial'),
    image: '/images/events/weekly-posters/setai-bergamo-saturday.webp',
    priority: 68
  },
  {
    id: 'capogiro-bergamo-friday',
    clubSlug: 'capogiro-bergamo',
    clubName: 'Capogiro Joyclub Bergamo',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'feel-friday-dinner-party',
    name: 'Feel Friday Dinner Party · Voice Bar & 25+ Club',
    genres: ['Dinner Show', 'House', 'Commercial', 'Revival'],
    target: '25+ / Over 30 Adult Crowd',
    description: {
      en: 'Every Friday at Capogiro Joyclub (Via Trento 14, Curno BG): 21:00 Singing Dinner Party, 23:30 live karaoke Voice Bar, and Main Room clubbing for a polished 25+ adult crowd.',
      it: 'Ogni venerdì al Capogiro Joyclub (Via Trento 14, Curno BG): Cena Party cantata dalle 21:00, Voice Bar karaoke dal vivo dalle 23:30 e Main Room per un pubblico adulto 25+ e over 30.'
    },
    pricing: { aperitif: 'Dinner Show upon request', club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Adult Smart Elegant (25+).', it: 'Adult Smart Elegant (25+).' },
    faqs: defaultFaqs('Capogiro Joyclub Bergamo', 'Via Trento 14, Curno (BG)', '25+', 'Adult Smart Elegant', 'Dinner Show, Voice Bar and House/Revival'),
    image: '/images/events/weekly-posters/capogiro-bergamo-friday.webp',
    priority: 68
  },
  {
    id: 'capogiro-bergamo-saturday',
    clubSlug: 'capogiro-bergamo',
    clubName: 'Capogiro Joyclub Bergamo',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-joyclub-dinner-voice-bar',
    name: 'Saturday Joyclub · Singing Dinner, Voice Bar & 25+ Disco',
    genres: ['Dinner Show', 'House', 'Commercial', 'Revival'],
    target: '25+ / Over 30 Adult Crowd & Groups',
    description: {
      en: 'Saturday night at Capogiro Joyclub Curno (Bergamo): 21:00 Singing Dinner Show, live karaoke Voice Bar, and Main Room House & Commercial party tailored to 25+ guests.',
      it: 'Il sabato sera al Capogiro Joyclub di Curno (Bergamo): Cena Spettacolo cantata dalle 21:00, Voice Bar live karaoke e Main Room House e Commerciale per ospiti 25+.'
    },
    pricing: { aperitif: 'Dinner Show upon request', club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Adult Smart Elegant (25+).', it: 'Adult Smart Elegant (25+).' },
    faqs: defaultFaqs('Capogiro Joyclub Bergamo', 'Via Trento 14, Curno (BG)', '25+', 'Adult Smart Elegant', 'Singing Dinner, Voice Bar and Club'),
    image: '/images/events/weekly-posters/capogiro-bergamo-saturday.webp',
    priority: 68
  },
  {
    id: 'tiky-klub-bergamo-wednesday',
    clubSlug: 'tiky-klub-bergamo',
    clubName: 'Tiky Klub Bergamo',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'wednesday-house-session',
    name: 'Wednesday Midweek House & Tech-House Session',
    genres: ['House', 'Tech-House'],
    target: '18+ / 20+, Electronic Lovers',
    description: {
      en: 'Every Wednesday at Tiky Klub (Via Nazionale 93, Seriate BG, 5 min from A4 Seriate exit): intimate midweek House and Tech-House club session.',
      it: 'Ogni mercoledì al Tiky Klub (Via Nazionale 93, Seriate BG, a 5 min dal casello A4 Seriate): serata infrasettimanale House e Tech-House.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Booths upon request via WhatsApp' },
    dressCode: { en: 'Contemporary Clubwear.', it: 'Contemporary Clubwear.' },
    faqs: defaultFaqs('Tiky Klub Bergamo', 'Via Nazionale 93, Seriate (BG)', '18+', 'Contemporary Clubwear', 'House and Tech-House'),
    image: '/images/events/weekly-posters/tiky-klub-bergamo-wednesday.webp',
    priority: 66
  },
  {
    id: 'tiky-klub-bergamo-friday',
    clubSlug: 'tiky-klub-bergamo',
    clubName: 'Tiky Klub Bergamo',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-icon-tech-house',
    name: 'Icon Friday · Tech-House & Boutique Clubbing',
    genres: ['Tech-House', 'House'],
    target: '20+, Boutique Electronic Crowd',
    description: {
      en: 'Icon Friday at Tiky Klub Seriate (Bergamo): punchy Tech-House sound, close-up DJ booth energy, and VIP Console booths via WhatsApp +39 351 912 7047.',
      it: 'Icon Friday al Tiky Klub di Seriate (Bergamo): sonorità Tech-House spinte, consolle ravvicinata e tavoli Privé su WhatsApp +39 351 912 7047.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Booths upon request via WhatsApp' },
    dressCode: { en: 'Contemporary Clubwear.', it: 'Contemporary Clubwear.' },
    faqs: defaultFaqs('Tiky Klub Bergamo', 'Via Nazionale 93, Seriate (BG)', '20+', 'Contemporary Clubwear', 'Tech-House and House'),
    image: '/images/events/weekly-posters/tiky-klub-bergamo-friday.webp',
    priority: 67
  },
  {
    id: 'tiky-klub-bergamo-saturday',
    clubSlug: 'tiky-klub-bergamo',
    clubName: 'Tiky Klub Bergamo',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-house-showcase',
    name: 'Saturday Guest DJ House & Tech-House Showcase',
    genres: ['House', 'Tech-House'],
    target: '20+, Electronic & Guest DJ Crowd',
    description: {
      en: 'Saturday Showcase at Tiky Klub Seriate (Via Nazionale 93, Bergamo): guest DJs, Vocal & Tech-House grooves, and boutique VIP service.',
      it: 'Il sabato sera al Tiky Klub di Seriate (Via Nazionale 93, Bergamo): guest DJ, Vocal & Tech-House e servizio Tavoli VIP.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Booths upon request via WhatsApp' },
    dressCode: { en: 'Smart Club Chic.', it: 'Smart Club Chic.' },
    faqs: defaultFaqs('Tiky Klub Bergamo', 'Via Nazionale 93, Seriate (BG)', '20+', 'Smart Club Chic', 'House and Tech-House'),
    image: '/images/events/weekly-posters/tiky-klub-bergamo-saturday.webp',
    priority: 67
  },
  {
    id: 'zero-club-bergamo-wednesday',
    clubSlug: 'zero-club-bergamo',
    clubName: 'Zero Club Bergamo',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'please-wednesday',
    name: 'Please Wednesday · Downtown Bergamo Midweek Party',
    genres: ['Urban', 'Commercial', 'House'],
    target: '18+ University & Downtown Crowd (Club Card)',
    description: {
      en: 'Every Wednesday in downtown Bergamo at Zero Club (Via Evaristo Baschenis 9): Please midweek university and urban night across two rooms.',
      it: 'Ogni mercoledì in pieno centro a Bergamo allo Zero Club (Via Evaristo Baschenis 9): format Please universitario e urban su doppia sala.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Smart Urban Clubwear (Club Card + ID).', it: 'Smart Urban Clubwear (Tessera Club + Documento).' },
    faqs: defaultFaqs('Zero Club Bergamo', 'Via Evaristo Baschenis 9, Bergamo', '18+', 'Smart Urban Clubwear', 'Urban, Commercial and House'),
    image: '/images/events/weekly-posters/zero-club-bergamo-wednesday.webp',
    priority: 66
  },
  {
    id: 'zero-club-bergamo-friday',
    clubSlug: 'zero-club-bergamo',
    clubName: 'Zero Club Bergamo',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'premiere-friday',
    name: 'Premiere Friday · Tech-House & Urban Dual-Room',
    genres: ['Tech-House', 'Hip-Hop', 'Urban'],
    target: '18+ / 20+, Downtown Bergamo Crowd (Club Card)',
    description: {
      en: 'Premiere Friday at Zero Club Bergamo (Via Evaristo Baschenis 9): dual-room electronic Tech-House and Hip-Hop/Urban in central Bergamo.',
      it: 'Premiere Friday allo Zero Club di Bergamo Centro (Via Evaristo Baschenis 9): doppia sala Tech-House e Hip-Hop/Urban.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Smart Urban Clubwear (Club Card + ID).', it: 'Smart Urban Clubwear (Tessera Club + Documento).' },
    faqs: defaultFaqs('Zero Club Bergamo', 'Via Evaristo Baschenis 9, Bergamo', '18+ / 20+', 'Smart Urban Clubwear', 'Tech-House and Hip-Hop/Urban'),
    image: '/images/events/weekly-posters/zero-club-bergamo-friday.webp',
    priority: 67
  },
  {
    id: 'zero-club-bergamo-saturday',
    clubSlug: 'zero-club-bergamo',
    clubName: 'Zero Club Bergamo',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-dual-room',
    name: 'Saturday Dual-Room · Electronic & Urban Night',
    genres: ['Tech-House', 'House', 'Urban'],
    target: '20+, Downtown Bergamo Clubbers (Club Card)',
    description: {
      en: 'Saturday night in downtown Bergamo at Zero Club (Via Baschenis 9): Room 1 Electronic/Tech-House and Room 2 Urban/Hip-Hop with VIP Privé tables.',
      it: 'Il sabato sera nel cuore di Bergamo allo Zero Club (Via Baschenis 9): Sala 1 Electronic/Tech-House e Sala 2 Urban/Hip-Hop con Tavoli Privé.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Privé upon request via WhatsApp' },
    dressCode: { en: 'Club Chic (Club Card + ID).', it: 'Club Chic (Tessera Club + Documento).' },
    faqs: defaultFaqs('Zero Club Bergamo', 'Via Evaristo Baschenis 9, Bergamo', '20+', 'Club Chic', 'Tech-House, House and Urban'),
    image: '/images/events/weekly-posters/zero-club-bergamo-saturday.webp',
    priority: 67
  },
  {
    id: 'qi-clubbing-brescia-friday',
    clubSlug: 'qi-clubbing-brescia',
    clubName: 'Qi Clubbing Franciacorta',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-dinner-show-club',
    name: 'Friday Franciacorta Dinner Show & Luxury Club',
    genres: ['Dinner Show', 'House', 'Commercial'],
    target: '21+ / 25+, Franciacorta & Brescia Crowd',
    description: {
      en: 'Every Friday at Qi Clubbing in Erbusco (Via dell’Industria 83, 2 min from A4 Rovato exit): 21:00 Gourmet Dinner Show and 23:30 Luxury Club.',
      it: 'Ogni venerdì da Qi Clubbing a Erbusco (Via dell’Industria 83, a 2 min dal casello A4 Rovato): Dinner Show dalle 21:00 e Luxury Club dalle 23:30.'
    },
    pricing: { aperitif: 'Dinner Show upon request', club: 'Upon request via WhatsApp', tables: 'Luxury Privé upon request via WhatsApp' },
    dressCode: { en: 'Strictly Elegant (21+).', it: 'Elegante Curato (21+).' },
    faqs: defaultFaqs('Qi Clubbing Franciacorta', 'Via dell’Industria 83, Erbusco (BS)', '21+', 'Strictly Elegant', 'Dinner Show, House and Commercial'),
    image: '/images/events/weekly-posters/qi-clubbing-brescia-friday.webp',
    priority: 68
  },
  {
    id: 'qi-clubbing-brescia-saturday',
    clubSlug: 'qi-clubbing-brescia',
    clubName: 'Qi Clubbing Franciacorta',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-gourmet-luxury-club',
    name: 'Saturday Gourmet Dinner Show & Franciacorta Privé',
    genres: ['Dinner Show', 'House', 'Tech-House'],
    target: '21+ / 25+, Franciacorta & Brescia VIP Crowd',
    description: {
      en: 'Flagship Saturday night at Qi Clubbing Erbusco (Franciacorta, BS): 21:00 seated Dinner Show paired with Franciacorta wines and 23:30 House & Tech-House Privé.',
      it: 'Il sabato sera simbolo della Franciacorta da Qi Clubbing Erbusco (BS): Dinner Show servito dalle 21:00 e Luxury Privé House & Tech-House dalle 23:30.'
    },
    pricing: { aperitif: 'Dinner Show upon request', club: 'Upon request via WhatsApp', tables: 'Luxury Privé upon request via WhatsApp' },
    dressCode: { en: 'Strictly Elegant (21+ / 25+).', it: 'Elegante Curato (21+ / 25+).' },
    faqs: defaultFaqs('Qi Clubbing Franciacorta', 'Via dell’Industria 83, Erbusco (BS)', '21+ / 25+', 'Strictly Elegant', 'Dinner Show, House and Tech-House'),
    image: '/images/events/weekly-posters/qi-clubbing-brescia-saturday.webp',
    priority: 68
  },
  {
    id: 'number-one-brescia-saturday',
    clubSlug: 'number-one-brescia',
    clubName: 'Number One Franciacorta',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-multisala-megaclub',
    name: 'Saturday Multisala · Multi-Arena Megaclub Night',
    genres: ['EDM', 'Commercial', 'Tech-House', 'Urban'],
    target: '18+, Brescia, Franciacorta & Lake Iseo Crowd',
    description: {
      en: 'Monumental Saturday multi-room night at Number One in Corte Franca (Via Provinciale 1/B, BS): EDM, Commercial, Tech-House, Urban, and panoramic VIP Balconies.',
      it: 'Il monumentale sabato multisala al Number One di Corte Franca (Via Provinciale 1/B, BS): EDM, Commerciale, Tech-House, Urban e Balconate VIP panoramiche.'
    },
    pricing: { club: 'Upon request via WhatsApp', tables: 'VIP Balcony upon request via WhatsApp' },
    dressCode: { en: 'Smart Club Casual (original physical ID mandatory).', it: 'Smart Club Casual (documento fisico originale obbligatorio).' },
    faqs: defaultFaqs('Number One Franciacorta', 'Via Provinciale 1/B, Corte Franca (BS)', '18+', 'Smart Club Casual', 'EDM, Commercial, Tech-House and Urban'),
    image: '/images/events/weekly-posters/number-one-brescia-saturday.webp',
    priority: 68
  },

  // --- COMPLETE 47-VENUE WEEKLY SCHEDULE COVERAGE (2026-11-27) ---,
  {
    id: "tocqueville-thursday-corso-como-thursday",
    clubSlug: "tocqueville",
    clubName: "Tocqueville 13 Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "corso-como-thursday",
    name: "Corso Como Urban & House Night",
    genres: ["Hip-Hop", "Commercial", "House"],
    target: "21+, Corso Como Fashion & International Crowd",
    description: {
      en: "Thursday program at Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Corso Como Urban & House Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Corso Como Urban & House Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show upon request", "club": "From €20", "tables": "From €300 to €1,500"},
    dressCode: {
      en: "Smart Chic & Corso Como Glamour.",
      it: "Smart Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Tocqueville 13 Milano", "Via Alessio di Tocqueville 13, Corso Como, Milan", "21+", "Smart Chic & Corso Como Glamour.", "Hip-Hop, Commercial, House"),
    image: "/images/events/weekly-posters/tocqueville-milano-weekly.webp",
    priority: 86
  },
  {
    id: "tocqueville-friday-friday-dinner-club",
    clubSlug: "tocqueville",
    clubName: "Tocqueville 13 Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-dinner-club",
    name: "Friday Dinner Show & Corso Como Club",
    genres: ["Hip-Hop", "Commercial", "House"],
    target: "21+, Corso Como Fashion & International Crowd",
    description: {
      en: "Friday program at Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Friday Dinner Show & Corso Como Club. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Friday Dinner Show & Corso Como Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show upon request", "club": "From €20", "tables": "From €300 to €1,500"},
    dressCode: {
      en: "Smart Chic & Corso Como Glamour.",
      it: "Smart Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Tocqueville 13 Milano", "Via Alessio di Tocqueville 13, Corso Como, Milan", "21+", "Smart Chic & Corso Como Glamour.", "Hip-Hop, Commercial, House"),
    image: "/images/events/weekly-posters/tocqueville-milano-weekly.webp",
    priority: 86
  },
  {
    id: "tocqueville-saturday-saturday-glamour-club",
    clubSlug: "tocqueville",
    clubName: "Tocqueville 13 Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-glamour-club",
    name: "Saturday Glamour Show & VIP Privé",
    genres: ["Hip-Hop", "Commercial", "House"],
    target: "21+, Corso Como Fashion & International Crowd",
    description: {
      en: "Saturday program at Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Saturday Glamour Show & VIP Privé. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Saturday Glamour Show & VIP Privé. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show upon request", "club": "From €20", "tables": "From €300 to €1,500"},
    dressCode: {
      en: "Smart Chic & Corso Como Glamour.",
      it: "Smart Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Tocqueville 13 Milano", "Via Alessio di Tocqueville 13, Corso Como, Milan", "21+", "Smart Chic & Corso Como Glamour.", "Hip-Hop, Commercial, House"),
    image: "/images/events/weekly-posters/tocqueville-milano-weekly.webp",
    priority: 86
  },
  {
    id: "tocqueville-sunday-sunday-corso-como-party",
    clubSlug: "tocqueville",
    clubName: "Tocqueville 13 Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-corso-como-party",
    name: "Sunday Corso Como International Party",
    genres: ["Hip-Hop", "Commercial", "House"],
    target: "21+, Corso Como Fashion & International Crowd",
    description: {
      en: "Sunday program at Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Sunday Corso Como International Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como, Milan): Sunday Corso Como International Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show upon request", "club": "From €20", "tables": "From €300 to €1,500"},
    dressCode: {
      en: "Smart Chic & Corso Como Glamour.",
      it: "Smart Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Tocqueville 13 Milano", "Via Alessio di Tocqueville 13, Corso Como, Milan", "21+", "Smart Chic & Corso Como Glamour.", "Hip-Hop, Commercial, House"),
    image: "/images/events/weekly-posters/tocqueville-milano-weekly.webp",
    priority: 86
  },
  {
    id: "armani-prive-thursday-couture-cocktail-thursday",
    clubSlug: "armani-prive",
    clubName: "Armani/Priv\u00e9 Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "couture-cocktail-thursday",
    name: "Couture Cocktail Lounge & Deep Grooves",
    genres: ["House", "Deep House", "Commercial"],
    target: "23+, Fashion Quadrilatero, International VIPs",
    description: {
      en: "Thursday program at Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Couture Cocktail Lounge & Deep Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Couture Cocktail Lounge & Deep Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Guestlist / Entry upon selection", "tables": "VIP Privé from €600 to €3,000"},
    dressCode: {
      en: "Strictly Haute Couture & Cocktail Chic.",
      it: "Rigorosamente Elegante & Cocktail Chic."
    },
    faqs: defaultFaqs("Armani/Privé Milano", "Via Gastone Pisoni 1, Fashion Quadrilatero, Milan", "23+", "Strictly Haute Couture & Cocktail Chic.", "House, Deep House, Commercial"),
    image: "/images/events/weekly-posters/armani-prive-resident-weekly.webp",
    priority: 88
  },
  {
    id: "armani-prive-friday-friday-fashion-prive",
    clubSlug: "armani-prive",
    clubName: "Armani/Priv\u00e9 Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-fashion-prive",
    name: "Friday Fashion District Privé Night",
    genres: ["House", "Deep House", "Commercial"],
    target: "23+, Fashion Quadrilatero, International VIPs",
    description: {
      en: "Friday program at Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Friday Fashion District Privé Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Friday Fashion District Privé Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Guestlist / Entry upon selection", "tables": "VIP Privé from €600 to €3,000"},
    dressCode: {
      en: "Strictly Haute Couture & Cocktail Chic.",
      it: "Rigorosamente Elegante & Cocktail Chic."
    },
    faqs: defaultFaqs("Armani/Privé Milano", "Via Gastone Pisoni 1, Fashion Quadrilatero, Milan", "23+", "Strictly Haute Couture & Cocktail Chic.", "House, Deep House, Commercial"),
    image: "/images/events/weekly-posters/armani-prive-resident-weekly.webp",
    priority: 88
  },
  {
    id: "armani-prive-saturday-saturday-haute-couture-club",
    clubSlug: "armani-prive",
    clubName: "Armani/Priv\u00e9 Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-haute-couture-club",
    name: "Saturday Haute Couture VIP Clubbing",
    genres: ["House", "Deep House", "Commercial"],
    target: "23+, Fashion Quadrilatero, International VIPs",
    description: {
      en: "Saturday program at Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Saturday Haute Couture VIP Clubbing. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Armani/Privé Milano (Via Gastone Pisoni 1, Fashion Quadrilatero, Milan): Saturday Haute Couture VIP Clubbing. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Guestlist / Entry upon selection", "tables": "VIP Privé from €600 to €3,000"},
    dressCode: {
      en: "Strictly Haute Couture & Cocktail Chic.",
      it: "Rigorosamente Elegante & Cocktail Chic."
    },
    faqs: defaultFaqs("Armani/Privé Milano", "Via Gastone Pisoni 1, Fashion Quadrilatero, Milan", "23+", "Strictly Haute Couture & Cocktail Chic.", "House, Deep House, Commercial"),
    image: "/images/events/weekly-posters/armani-prive-resident-weekly.webp",
    priority: 88
  },
  {
    id: "volt-friday-friday-avant-garde-sound",
    clubSlug: "volt",
    clubName: "Volt Club Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-avant-garde-sound",
    name: "Friday Avant-Garde Electronic & House",
    genres: ["Melodic Techno", "House", "Electronic"],
    target: "21+, Electronic Music Connoisseurs & Creative Crowd",
    description: {
      en: "Friday program at Volt Club Milano (Via Molino delle Armi 16, Milan): Friday Avant-Garde Electronic & House. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Volt Club Milano (Via Molino delle Armi 16, Milan): Friday Avant-Garde Electronic & House. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Backstage & Privé from €400"},
    dressCode: {
      en: "Minimal Dark & Contemporary Clubwear.",
      it: "Minimal Dark & Clubwear Contemporaneo."
    },
    faqs: defaultFaqs("Volt Club Milano", "Via Molino delle Armi 16, Milan", "21+", "Minimal Dark & Contemporary Clubwear.", "Melodic Techno, House, Electronic"),
    image: "/images/events/weekly-posters/volt-club-resident-weekly.webp",
    priority: 84
  },
  {
    id: "volt-saturday-saturday-melodic-techno",
    clubSlug: "volt",
    clubName: "Volt Club Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-melodic-techno",
    name: "Saturday Melodic Techno & Underground Showcase",
    genres: ["Melodic Techno", "House", "Electronic"],
    target: "21+, Electronic Music Connoisseurs & Creative Crowd",
    description: {
      en: "Saturday program at Volt Club Milano (Via Molino delle Armi 16, Milan): Saturday Melodic Techno & Underground Showcase. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Volt Club Milano (Via Molino delle Armi 16, Milan): Saturday Melodic Techno & Underground Showcase. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Backstage & Privé from €400"},
    dressCode: {
      en: "Minimal Dark & Contemporary Clubwear.",
      it: "Minimal Dark & Clubwear Contemporaneo."
    },
    faqs: defaultFaqs("Volt Club Milano", "Via Molino delle Armi 16, Milan", "21+", "Minimal Dark & Contemporary Clubwear.", "Melodic Techno, House, Electronic"),
    image: "/images/events/weekly-posters/volt-club-resident-weekly.webp",
    priority: 84
  },
  {
    id: "alcatraz-friday-friday-all-you-can-dance",
    clubSlug: "alcatraz",
    clubName: "Alcatraz Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-all-you-can-dance",
    name: "Friday 3-Room Arena Party & Live Show",
    genres: ["Commercial", "Reggaeton", "90s-2000s", "Rock"],
    target: "18+, Multi-Room Arena & University Crowd",
    description: {
      en: "Friday program at Alcatraz Milano (Via Valtellina 25, Isola / Scalo Farini, Milan): Friday 3-Room Arena Party & Live Show. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Alcatraz Milano (Via Valtellina 25, Isola / Scalo Farini, Milan): Friday 3-Room Arena Party & Live Show. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €15", "tables": "Arena Balcony Privé from €250"},
    dressCode: {
      en: "Smart Casual Clubbing (original ID required).",
      it: "Smart Casual Clubbing (documento originale obbligatorio)."
    },
    faqs: defaultFaqs("Alcatraz Milano", "Via Valtellina 25, Isola / Scalo Farini, Milan", "18+", "Smart Casual Clubbing (original ID required).", "Commercial, Reggaeton, 90s-2000s, Rock"),
    image: "/images/events/weekly-posters/alcatraz-all-you-can-dance.webp",
    priority: 83
  },
  {
    id: "alcatraz-saturday-saturday-mega-arena",
    clubSlug: "alcatraz",
    clubName: "Alcatraz Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-mega-arena",
    name: "Saturday All You Can Dance · 3 Dancefloors",
    genres: ["Commercial", "Reggaeton", "90s-2000s", "Rock"],
    target: "18+, Multi-Room Arena & University Crowd",
    description: {
      en: "Saturday program at Alcatraz Milano (Via Valtellina 25, Isola / Scalo Farini, Milan): Saturday All You Can Dance · 3 Dancefloors. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Alcatraz Milano (Via Valtellina 25, Isola / Scalo Farini, Milan): Saturday All You Can Dance · 3 Dancefloors. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €15", "tables": "Arena Balcony Privé from €250"},
    dressCode: {
      en: "Smart Casual Clubbing (original ID required).",
      it: "Smart Casual Clubbing (documento originale obbligatorio)."
    },
    faqs: defaultFaqs("Alcatraz Milano", "Via Valtellina 25, Isola / Scalo Farini, Milan", "18+", "Smart Casual Clubbing (original ID required).", "Commercial, Reggaeton, 90s-2000s, Rock"),
    image: "/images/events/weekly-posters/alcatraz-all-you-can-dance.webp",
    priority: 83
  },
  {
    id: "fabrique-friday-friday-live-club-arena",
    clubSlug: "fabrique",
    clubName: "Fabrique Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-live-club-arena",
    name: "Friday Live Showcase & Arena Club Night",
    genres: ["Electronic", "Live Concerts", "Tech-House", "Urban"],
    target: "18+, Live Concert & International Festival Fans",
    description: {
      en: "Friday program at Fabrique Milano (Via Gaudenzio Fantoli 9, Mecenate, Milan): Friday Live Showcase & Arena Club Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Fabrique Milano (Via Gaudenzio Fantoli 9, Mecenate, Milan): Friday Live Showcase & Arena Club Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Upon event / WhatsApp Concierge", "tables": "VIP Ring Privé upon request"},
    dressCode: {
      en: "Contemporary Urban & Concert Clubwear.",
      it: "Urban Contemporaneo & Clubwear da Arena."
    },
    faqs: defaultFaqs("Fabrique Milano", "Via Gaudenzio Fantoli 9, Mecenate, Milan", "18+", "Contemporary Urban & Concert Clubwear.", "Electronic, Live Concerts, Tech-House, Urban"),
    image: "/images/events/weekly-posters/fabrique-resident-weekly.webp",
    priority: 82
  },
  {
    id: "fabrique-saturday-saturday-festival-arena",
    clubSlug: "fabrique",
    clubName: "Fabrique Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-festival-arena",
    name: "Saturday International Electronic & Club Arena",
    genres: ["Electronic", "Live Concerts", "Tech-House", "Urban"],
    target: "18+, Live Concert & International Festival Fans",
    description: {
      en: "Saturday program at Fabrique Milano (Via Gaudenzio Fantoli 9, Mecenate, Milan): Saturday International Electronic & Club Arena. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Fabrique Milano (Via Gaudenzio Fantoli 9, Mecenate, Milan): Saturday International Electronic & Club Arena. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Upon event / WhatsApp Concierge", "tables": "VIP Ring Privé upon request"},
    dressCode: {
      en: "Contemporary Urban & Concert Clubwear.",
      it: "Urban Contemporaneo & Clubwear da Arena."
    },
    faqs: defaultFaqs("Fabrique Milano", "Via Gaudenzio Fantoli 9, Mecenate, Milan", "18+", "Contemporary Urban & Concert Clubwear.", "Electronic, Live Concerts, Tech-House, Urban"),
    image: "/images/events/weekly-posters/fabrique-resident-weekly.webp",
    priority: 82
  },
  {
    id: "amnesia-saturday-saturday-tech-house-temple",
    clubSlug: "amnesia",
    clubName: "Amnesia Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-tech-house-temple",
    name: "Saturday International Tech-House & Techno Showcase",
    genres: ["Tech-House", "Techno", "House"],
    target: "20+, International Tech-House & Techno Clubbers",
    description: {
      en: "Saturday program at Amnesia Milano (Via Alfonso Gatti, Forlanini, Milan): Saturday International Tech-House & Techno Showcase. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Amnesia Milano (Via Alfonso Gatti, Forlanini, Milan): Saturday International Tech-House & Techno Showcase. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €25", "tables": "Console & Privé from €400"},
    dressCode: {
      en: "Contemporary Electronic Clubwear.",
      it: "Clubwear Elettronico Curato."
    },
    faqs: defaultFaqs("Amnesia Milano", "Via Alfonso Gatti, Forlanini, Milan", "20+", "Contemporary Electronic Clubwear.", "Tech-House, Techno, House"),
    image: "/images/events/weekly-posters/amnesia-resident-weekly.webp",
    priority: 83
  },
  {
    id: "hollywood-tuesday-tuesday-international-party",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-international-party",
    name: "Tuesday Corso Como International Party",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Tuesday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Tuesday Corso Como International Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Tuesday Corso Como International Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "hollywood-wednesday-wednesday-midweek-club",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-midweek-club",
    name: "Wednesday Corso Como Club Night",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Wednesday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Wednesday Corso Como Club Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Wednesday Corso Como Club Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "hollywood-thursday-thursday-glamour-hits",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-glamour-hits",
    name: "Thursday Glamour & Urban Hits",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Thursday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Thursday Glamour & Urban Hits. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Thursday Glamour & Urban Hits. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "hollywood-friday-friday-rythmoteque-club",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-rythmoteque-club",
    name: "Friday Historic Corso Como Clubbing",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Friday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Friday Historic Corso Como Clubbing. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Friday Historic Corso Como Clubbing. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "hollywood-saturday-saturday-iconic-vip-night",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-iconic-vip-night",
    name: "Saturday Iconic Corso Como VIP Night",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Saturday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Saturday Iconic Corso Como VIP Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Saturday Iconic Corso Como VIP Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "hollywood-sunday-sunday-late-party",
    clubSlug: "hollywood",
    clubName: "Hollywood Rythmoteque Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-late-party",
    name: "Sunday Corso Como Closing Party",
    genres: ["Commercial", "Hip-Hop", "Reggaeton", "House"],
    target: "20+, International Models, Students & Corso Como Crowd",
    description: {
      en: "Sunday program at Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Sunday Corso Como Closing Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Hollywood Rythmoteque Milano (Corso Como 15, Porta Garibaldi, Milan): Sunday Corso Como Closing Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Corso Como Chic & Glamour.",
      it: "Chic & Glamour Corso Como."
    },
    faqs: defaultFaqs("Hollywood Rythmoteque Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Corso Como Chic & Glamour.", "Commercial, Hip-Hop, Reggaeton, House"),
    image: "/images/events/weekly-posters/hollywood-milano-weekly.webp",
    priority: 82
  },
  {
    id: "11clubroom-thursday-thursday-velvet-urban",
    clubSlug: "11clubroom",
    clubName: "11Clubroom Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-velvet-urban",
    name: "Thursday Velvet Lounge & Urban Grooves",
    genres: ["Hip-Hop", "RnB", "House", "Commercial"],
    target: "21+, Boutique VIP Lounge & Corso Como Insiders",
    description: {
      en: "Thursday program at 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Thursday Velvet Lounge & Urban Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Thursday Velvet Lounge & Urban Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Boutique Privé from €300"},
    dressCode: {
      en: "Smart Elegant & Boutique Lounge Chic.",
      it: "Smart Elegant & Boutique Lounge Chic."
    },
    faqs: defaultFaqs("11Clubroom Milano", "Via Alessio di Tocqueville 11, Corso Como, Milan", "21+", "Smart Elegant & Boutique Lounge Chic.", "Hip-Hop, RnB, House, Commercial"),
    image: "/images/events/weekly-posters/11clubroom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "11clubroom-friday-friday-boutique-clubroom",
    clubSlug: "11clubroom",
    clubName: "11Clubroom Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-boutique-clubroom",
    name: "Friday Boutique Clubroom & VIP Bottles",
    genres: ["Hip-Hop", "RnB", "House", "Commercial"],
    target: "21+, Boutique VIP Lounge & Corso Como Insiders",
    description: {
      en: "Friday program at 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Friday Boutique Clubroom & VIP Bottles. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Friday Boutique Clubroom & VIP Bottles. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Boutique Privé from €300"},
    dressCode: {
      en: "Smart Elegant & Boutique Lounge Chic.",
      it: "Smart Elegant & Boutique Lounge Chic."
    },
    faqs: defaultFaqs("11Clubroom Milano", "Via Alessio di Tocqueville 11, Corso Como, Milan", "21+", "Smart Elegant & Boutique Lounge Chic.", "Hip-Hop, RnB, House, Commercial"),
    image: "/images/events/weekly-posters/11clubroom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "11clubroom-saturday-saturday-intimate-prive",
    clubSlug: "11clubroom",
    clubName: "11Clubroom Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-intimate-prive",
    name: "Saturday Intimate Corso Como Privé Night",
    genres: ["Hip-Hop", "RnB", "House", "Commercial"],
    target: "21+, Boutique VIP Lounge & Corso Como Insiders",
    description: {
      en: "Saturday program at 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Saturday Intimate Corso Como Privé Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da 11Clubroom Milano (Via Alessio di Tocqueville 11, Corso Como, Milan): Saturday Intimate Corso Como Privé Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Boutique Privé from €300"},
    dressCode: {
      en: "Smart Elegant & Boutique Lounge Chic.",
      it: "Smart Elegant & Boutique Lounge Chic."
    },
    faqs: defaultFaqs("11Clubroom Milano", "Via Alessio di Tocqueville 11, Corso Como, Milan", "21+", "Smart Elegant & Boutique Lounge Chic.", "Hip-Hop, RnB, House, Commercial"),
    image: "/images/events/weekly-posters/11clubroom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "gattopardo-friday-friday-chandelier-gala",
    clubSlug: "gattopardo",
    clubName: "Il Gattopardo Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-chandelier-gala",
    name: "Friday Chandelier Aperitivo & Club Gala",
    genres: ["House", "Commercial", "Dinner Show"],
    target: "21+, Sempione Elegant & University Gala Crowd",
    description: {
      en: "Friday program at Il Gattopardo Milano (Via Piero della Francesca 47, Sempione, Milan): Friday Chandelier Aperitivo & Club Gala. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Il Gattopardo Milano (Via Piero della Francesca 47, Sempione, Milan): Friday Chandelier Aperitivo & Club Gala. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "Chandelier Privé from €350"},
    dressCode: {
      en: "Strictly Elegant (collared shirt required for men).",
      it: "Rigorosamente Elegante (camicia obbligatoria per gli uomini)."
    },
    faqs: defaultFaqs("Il Gattopardo Milano", "Via Piero della Francesca 47, Sempione, Milan", "21+", "Strictly Elegant (collared shirt required for men).", "House, Commercial, Dinner Show"),
    image: "/images/events/weekly-posters/gattopardo-milano-weekly.webp",
    priority: 81
  },
  {
    id: "gattopardo-saturday-saturday-grand-nave-party",
    clubSlug: "gattopardo",
    clubName: "Il Gattopardo Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-grand-nave-party",
    name: "Saturday Grand Nave House & Commercial Party",
    genres: ["House", "Commercial", "Dinner Show"],
    target: "21+, Sempione Elegant & University Gala Crowd",
    description: {
      en: "Saturday program at Il Gattopardo Milano (Via Piero della Francesca 47, Sempione, Milan): Saturday Grand Nave House & Commercial Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Il Gattopardo Milano (Via Piero della Francesca 47, Sempione, Milan): Saturday Grand Nave House & Commercial Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €20", "tables": "Chandelier Privé from €350"},
    dressCode: {
      en: "Strictly Elegant (collared shirt required for men).",
      it: "Rigorosamente Elegante (camicia obbligatoria per gli uomini)."
    },
    faqs: defaultFaqs("Il Gattopardo Milano", "Via Piero della Francesca 47, Sempione, Milan", "21+", "Strictly Elegant (collared shirt required for men).", "House, Commercial, Dinner Show"),
    image: "/images/events/weekly-posters/gattopardo-milano-weekly.webp",
    priority: 81
  },
  {
    id: "dazi-wednesday-wednesday-arco-aperitivo",
    clubSlug: "dazi",
    clubName: "Dazi Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-arco-aperitivo",
    name: "Wednesday Arco della Pace Aperitivo & DJ Set",
    genres: ["Cocktail Lounge", "House", "Commercial"],
    target: "21+, Arco della Pace Aperitivo, Dinner & Late Lounge Crowd",
    description: {
      en: "Wednesday program at Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Wednesday Arco della Pace Aperitivo & DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Wednesday Arco della Pace Aperitivo & DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Lounge selection", "tables": "Reserved Lounge from €250"},
    dressCode: {
      en: "Smart Chic Arco della Pace.",
      it: "Smart Chic Arco della Pace."
    },
    faqs: defaultFaqs("Dazi Milano", "Piazza Sempione 1, Arco della Pace, Milan", "21+", "Smart Chic Arco della Pace.", "Cocktail Lounge, House, Commercial"),
    image: "/images/events/weekly-posters/dazi-milano-weekly.webp",
    priority: 80
  },
  {
    id: "dazi-thursday-thursday-neoclassical-lounge",
    clubSlug: "dazi",
    clubName: "Dazi Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-neoclassical-lounge",
    name: "Thursday Neoclassical Tollhouse Dinner & Beats",
    genres: ["Cocktail Lounge", "House", "Commercial"],
    target: "21+, Arco della Pace Aperitivo, Dinner & Late Lounge Crowd",
    description: {
      en: "Thursday program at Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Thursday Neoclassical Tollhouse Dinner & Beats. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Thursday Neoclassical Tollhouse Dinner & Beats. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Lounge selection", "tables": "Reserved Lounge from €250"},
    dressCode: {
      en: "Smart Chic Arco della Pace.",
      it: "Smart Chic Arco della Pace."
    },
    faqs: defaultFaqs("Dazi Milano", "Piazza Sempione 1, Arco della Pace, Milan", "21+", "Smart Chic Arco della Pace.", "Cocktail Lounge, House, Commercial"),
    image: "/images/events/weekly-posters/dazi-milano-weekly.webp",
    priority: 80
  },
  {
    id: "dazi-friday-friday-sempione-dinner-dj",
    clubSlug: "dazi",
    clubName: "Dazi Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-sempione-dinner-dj",
    name: "Friday Piazza Sempione Dinner & Late DJ Set",
    genres: ["Cocktail Lounge", "House", "Commercial"],
    target: "21+, Arco della Pace Aperitivo, Dinner & Late Lounge Crowd",
    description: {
      en: "Friday program at Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Friday Piazza Sempione Dinner & Late DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Friday Piazza Sempione Dinner & Late DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Lounge selection", "tables": "Reserved Lounge from €250"},
    dressCode: {
      en: "Smart Chic Arco della Pace.",
      it: "Smart Chic Arco della Pace."
    },
    faqs: defaultFaqs("Dazi Milano", "Piazza Sempione 1, Arco della Pace, Milan", "21+", "Smart Chic Arco della Pace.", "Cocktail Lounge, House, Commercial"),
    image: "/images/events/weekly-posters/dazi-milano-weekly.webp",
    priority: 80
  },
  {
    id: "dazi-saturday-saturday-arco-della-pace-night",
    clubSlug: "dazi",
    clubName: "Dazi Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-arco-della-pace-night",
    name: "Saturday Arco della Pace Signature Night",
    genres: ["Cocktail Lounge", "House", "Commercial"],
    target: "21+, Arco della Pace Aperitivo, Dinner & Late Lounge Crowd",
    description: {
      en: "Saturday program at Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Saturday Arco della Pace Signature Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Saturday Arco della Pace Signature Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Lounge selection", "tables": "Reserved Lounge from €250"},
    dressCode: {
      en: "Smart Chic Arco della Pace.",
      it: "Smart Chic Arco della Pace."
    },
    faqs: defaultFaqs("Dazi Milano", "Piazza Sempione 1, Arco della Pace, Milan", "21+", "Smart Chic Arco della Pace.", "Cocktail Lounge, House, Commercial"),
    image: "/images/events/weekly-posters/dazi-milano-weekly.webp",
    priority: 80
  },
  {
    id: "dazi-sunday-sunday-sunset-sempione",
    clubSlug: "dazi",
    clubName: "Dazi Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-sunset-sempione",
    name: "Sunday Sunset Aperitivo & Lounge Grooves",
    genres: ["Cocktail Lounge", "House", "Commercial"],
    target: "21+, Arco della Pace Aperitivo, Dinner & Late Lounge Crowd",
    description: {
      en: "Sunday program at Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Sunday Sunset Aperitivo & Lounge Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Dazi Milano (Piazza Sempione 1, Arco della Pace, Milan): Sunday Sunset Aperitivo & Lounge Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Lounge selection", "tables": "Reserved Lounge from €250"},
    dressCode: {
      en: "Smart Chic Arco della Pace.",
      it: "Smart Chic Arco della Pace."
    },
    faqs: defaultFaqs("Dazi Milano", "Piazza Sempione 1, Arco della Pace, Milan", "21+", "Smart Chic Arco della Pace.", "Cocktail Lounge, House, Commercial"),
    image: "/images/events/weekly-posters/dazi-milano-weekly.webp",
    priority: 80
  },
  {
    id: "ceresio-7-tuesday-tuesday-skyline-mixology",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-skyline-mixology",
    name: "Tuesday Twin-Pool Skyline Aperitivo & Dinner",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Tuesday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Tuesday Twin-Pool Skyline Aperitivo & Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Tuesday Twin-Pool Skyline Aperitivo & Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "ceresio-7-wednesday-wednesday-rooftop-dining",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-rooftop-dining",
    name: "Wednesday Panoramic Dining & Cocktail Bar",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Wednesday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Wednesday Panoramic Dining & Cocktail Bar. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Wednesday Panoramic Dining & Cocktail Bar. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "ceresio-7-thursday-thursday-fashion-aperitivo",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-fashion-aperitivo",
    name: "Thursday Porta Volta Sunset Mixology",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Thursday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Thursday Porta Volta Sunset Mixology. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Thursday Porta Volta Sunset Mixology. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "ceresio-7-friday-friday-rooftop-lounge",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-rooftop-lounge",
    name: "Friday Rooftop Pools Dinner & Lounge Session",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Friday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Friday Rooftop Pools Dinner & Lounge Session. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Friday Rooftop Pools Dinner & Lounge Session. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "ceresio-7-saturday-saturday-panoramic-soiree",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-panoramic-soiree",
    name: "Saturday Panoramic Soirée & Signature Cocktails",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Saturday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Saturday Panoramic Soirée & Signature Cocktails. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Saturday Panoramic Soirée & Signature Cocktails. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "ceresio-7-sunday-sunday-sunset-terrace",
    clubSlug: "ceresio-7",
    clubName: "Ceresio 7 Pools & Restaurant",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-sunset-terrace",
    name: "Sunday Sunset Terrace Aperitivo & Fine Dining",
    genres: ["Lounge", "Deep House", "Fine Mixology"],
    target: "23+, Design, Fashion & Fine Dining Clientele",
    description: {
      en: "Sunday program at Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Sunday Sunset Terrace Aperitivo & Fine Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Ceresio 7 Pools & Restaurant (Via Ceresio 7, Porta Volta, Milan): Sunday Sunset Terrace Aperitivo & Fine Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €20", "tables": "Rooftop Dining & Lounge upon reservation"},
    dressCode: {
      en: "Sartorial Smart Elegant.",
      it: "Sartoriale Smart Elegant."
    },
    faqs: defaultFaqs("Ceresio 7 Pools & Restaurant", "Via Ceresio 7, Porta Volta, Milan", "23+", "Sartorial Smart Elegant.", "Lounge, Deep House, Fine Mixology"),
    image: "/images/events/weekly-posters/ceresio7-resident-weekly.webp",
    priority: 82
  },
  {
    id: "apollo-thursday-thursday-navigli-live-grooves",
    clubSlug: "apollo",
    clubName: "Apollo Club Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-navigli-live-grooves",
    name: "Thursday Navigli Cocktail & Live Grooves",
    genres: ["House", "Disco", " Funky", "Live Music"],
    target: "21+, Navigli Creative, Design & Music Crowd",
    description: {
      en: "Thursday program at Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Thursday Navigli Cocktail & Live Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Thursday Navigli Cocktail & Live Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Club Tables from €250"},
    dressCode: {
      en: "Creative Smart Casual & Retro Chic.",
      it: "Smart Casual Creativo & Retro Chic."
    },
    faqs: defaultFaqs("Apollo Club Milano", "Via Giosuè Borsi 9/2, Navigli, Milan", "21+", "Creative Smart Casual & Retro Chic.", "House, Disco,  Funky, Live Music"),
    image: "/images/events/weekly-posters/apollo-club-resident-weekly.webp",
    priority: 78
  },
  {
    id: "apollo-friday-friday-house-disco-club",
    clubSlug: "apollo",
    clubName: "Apollo Club Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-house-disco-club",
    name: "Friday House, Disco & Cocktail Club",
    genres: ["House", "Disco", " Funky", "Live Music"],
    target: "21+, Navigli Creative, Design & Music Crowd",
    description: {
      en: "Friday program at Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Friday House, Disco & Cocktail Club. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Friday House, Disco & Cocktail Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Club Tables from €250"},
    dressCode: {
      en: "Creative Smart Casual & Retro Chic.",
      it: "Smart Casual Creativo & Retro Chic."
    },
    faqs: defaultFaqs("Apollo Club Milano", "Via Giosuè Borsi 9/2, Navigli, Milan", "21+", "Creative Smart Casual & Retro Chic.", "House, Disco,  Funky, Live Music"),
    image: "/images/events/weekly-posters/apollo-club-resident-weekly.webp",
    priority: 78
  },
  {
    id: "apollo-saturday-saturday-apollo-club-night",
    clubSlug: "apollo",
    clubName: "Apollo Club Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-apollo-club-night",
    name: "Saturday Navigli Dancefloor & Vinyl Grooves",
    genres: ["House", "Disco", " Funky", "Live Music"],
    target: "21+, Navigli Creative, Design & Music Crowd",
    description: {
      en: "Saturday program at Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Saturday Navigli Dancefloor & Vinyl Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Saturday Navigli Dancefloor & Vinyl Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Club Tables from €250"},
    dressCode: {
      en: "Creative Smart Casual & Retro Chic.",
      it: "Smart Casual Creativo & Retro Chic."
    },
    faqs: defaultFaqs("Apollo Club Milano", "Via Giosuè Borsi 9/2, Navigli, Milan", "21+", "Creative Smart Casual & Retro Chic.", "House, Disco,  Funky, Live Music"),
    image: "/images/events/weekly-posters/apollo-club-resident-weekly.webp",
    priority: 78
  },
  {
    id: "apollo-sunday-sunday-rollover-session",
    clubSlug: "apollo",
    clubName: "Apollo Club Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-rollover-session",
    name: "Sunday Aperitivo & Eclectic Club Session",
    genres: ["House", "Disco", " Funky", "Live Music"],
    target: "21+, Navigli Creative, Design & Music Crowd",
    description: {
      en: "Sunday program at Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Sunday Aperitivo & Eclectic Club Session. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Apollo Club Milano (Via Giosuè Borsi 9/2, Navigli, Milan): Sunday Aperitivo & Eclectic Club Session. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Club Tables from €250"},
    dressCode: {
      en: "Creative Smart Casual & Retro Chic.",
      it: "Smart Casual Creativo & Retro Chic."
    },
    faqs: defaultFaqs("Apollo Club Milano", "Via Giosuè Borsi 9/2, Navigli, Milan", "21+", "Creative Smart Casual & Retro Chic.", "House, Disco,  Funky, Live Music"),
    image: "/images/events/weekly-posters/apollo-club-resident-weekly.webp",
    priority: 78
  },
  {
    id: "magazzini-thursday-thursday-porta-romana-showcase",
    clubSlug: "magazzini",
    clubName: "Magazzini Generali Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-porta-romana-showcase",
    name: "Thursday Live & University Club Showcase",
    genres: ["Electronic", "Techno", "Commercial", "Live Concerts"],
    target: "18+, Electronic Fans, Live Concertgoers & International Students",
    description: {
      en: "Thursday program at Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Thursday Live & University Club Showcase. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Thursday Live & University Club Showcase. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €15", "tables": "Mezzanine Balcony VIP from €300"},
    dressCode: {
      en: "Club Casual & Underground Chic.",
      it: "Club Casual & Underground Chic."
    },
    faqs: defaultFaqs("Magazzini Generali Milano", "Via Pietrasanta 16, Porta Romana, Milan", "18+", "Club Casual & Underground Chic.", "Electronic, Techno, Commercial, Live Concerts"),
    image: "/images/events/weekly-posters/magazzini-resident-weekly.webp",
    priority: 83
  },
  {
    id: "magazzini-friday-friday-warehouse-party",
    clubSlug: "magazzini",
    clubName: "Magazzini Generali Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-warehouse-party",
    name: "Friday Historic Warehouse Club Night",
    genres: ["Electronic", "Techno", "Commercial", "Live Concerts"],
    target: "18+, Electronic Fans, Live Concertgoers & International Students",
    description: {
      en: "Friday program at Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Friday Historic Warehouse Club Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Friday Historic Warehouse Club Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €15", "tables": "Mezzanine Balcony VIP from €300"},
    dressCode: {
      en: "Club Casual & Underground Chic.",
      it: "Club Casual & Underground Chic."
    },
    faqs: defaultFaqs("Magazzini Generali Milano", "Via Pietrasanta 16, Porta Romana, Milan", "18+", "Club Casual & Underground Chic.", "Electronic, Techno, Commercial, Live Concerts"),
    image: "/images/events/weekly-posters/magazzini-resident-weekly.webp",
    priority: 83
  },
  {
    id: "magazzini-saturday-saturday-mezzanine-electronic",
    clubSlug: "magazzini",
    clubName: "Magazzini Generali Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-mezzanine-electronic",
    name: "Saturday Electronic & Themed Arena Night",
    genres: ["Electronic", "Techno", "Commercial", "Live Concerts"],
    target: "18+, Electronic Fans, Live Concertgoers & International Students",
    description: {
      en: "Saturday program at Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Saturday Electronic & Themed Arena Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Magazzini Generali Milano (Via Pietrasanta 16, Porta Romana, Milan): Saturday Electronic & Themed Arena Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €15", "tables": "Mezzanine Balcony VIP from €300"},
    dressCode: {
      en: "Club Casual & Underground Chic.",
      it: "Club Casual & Underground Chic."
    },
    faqs: defaultFaqs("Magazzini Generali Milano", "Via Pietrasanta 16, Porta Romana, Milan", "18+", "Club Casual & Underground Chic.", "Electronic, Techno, Commercial, Live Concerts"),
    image: "/images/events/weekly-posters/magazzini-resident-weekly.webp",
    priority: 83
  },
  {
    id: "church81-friday-friday-candlelight-dinner-show",
    clubSlug: "church81",
    clubName: "Church 81 Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-candlelight-dinner-show",
    name: "Friday Candlelight Dinner Show & DJ Set",
    genres: ["Dinner Show", "Commercial", "House"],
    target: "21+, Dinner Show Groups, Celebrations & VIP Tables",
    description: {
      en: "Friday program at Church 81 Milano (Via Marco Ulpio Traiano 81, Portello, Milan): Friday Candlelight Dinner Show & DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Church 81 Milano (Via Marco Ulpio Traiano 81, Portello, Milan): Friday Candlelight Dinner Show & DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show from €35", "club": "From €15", "tables": "VIP Tables from €250"},
    dressCode: {
      en: "Elegant Dinner & Supper-Club Attire.",
      it: "Elegante da Dinner Show & Supper-Club."
    },
    faqs: defaultFaqs("Church 81 Milano", "Via Marco Ulpio Traiano 81, Portello, Milan", "21+", "Elegant Dinner & Supper-Club Attire.", "Dinner Show, Commercial, House"),
    image: "/images/events/weekly-posters/church81-resident-weekly.webp",
    priority: 77
  },
  {
    id: "church81-saturday-saturday-supper-club-party",
    clubSlug: "church81",
    clubName: "Church 81 Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-supper-club-party",
    name: "Saturday Supper-Club Show & Late Party",
    genres: ["Dinner Show", "Commercial", "House"],
    target: "21+, Dinner Show Groups, Celebrations & VIP Tables",
    description: {
      en: "Saturday program at Church 81 Milano (Via Marco Ulpio Traiano 81, Portello, Milan): Saturday Supper-Club Show & Late Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Church 81 Milano (Via Marco Ulpio Traiano 81, Portello, Milan): Saturday Supper-Club Show & Late Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show from €35", "club": "From €15", "tables": "VIP Tables from €250"},
    dressCode: {
      en: "Elegant Dinner & Supper-Club Attire.",
      it: "Elegante da Dinner Show & Supper-Club."
    },
    faqs: defaultFaqs("Church 81 Milano", "Via Marco Ulpio Traiano 81, Portello, Milan", "21+", "Elegant Dinner & Supper-Club Attire.", "Dinner Show, Commercial, House"),
    image: "/images/events/weekly-posters/church81-resident-weekly.webp",
    priority: 77
  },
  {
    id: "loolapaloosa-tuesday-tuesday-corso-como-aperitivo",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-corso-como-aperitivo",
    name: "Tuesday Corso Como Aperitivo & Party Bar",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Tuesday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Tuesday Corso Como Aperitivo & Party Bar. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Tuesday Corso Como Aperitivo & Party Bar. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "loolapaloosa-wednesday-wednesday-sing-along-night",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-sing-along-night",
    name: "Wednesday Midweek Party & Bar Show",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Wednesday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Wednesday Midweek Party & Bar Show. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Wednesday Midweek Party & Bar Show. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "loolapaloosa-thursday-thursday-garibaldi-party",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-garibaldi-party",
    name: "Thursday Corso Como Cocktails & Hits",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Thursday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Thursday Corso Como Cocktails & Hits. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Thursday Corso Como Cocktails & Hits. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "loolapaloosa-friday-friday-bar-top-party",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-bar-top-party",
    name: "Friday Legendary Corso Como Party Night",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Friday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Friday Legendary Corso Como Party Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Friday Legendary Corso Como Party Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "loolapaloosa-saturday-saturday-loola-celebration",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-loola-celebration",
    name: "Saturday Full-House Aperitivo & Dance Party",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Saturday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Saturday Full-House Aperitivo & Dance Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Saturday Full-House Aperitivo & Dance Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "loolapaloosa-sunday-sunday-corso-como-finale",
    clubSlug: "loolapaloosa",
    clubName: "Loolapaloosa Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-corso-como-finale",
    name: "Sunday Aperitivo & Late Night Hits",
    genres: ["Commercial", "Sing-Along", "Party Hits", "Dance"],
    target: "20+, Corso Como Aperitivo & High-Energy Party Crowd",
    description: {
      en: "Sunday program at Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Sunday Aperitivo & Late Night Hits. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Loolapaloosa Milano (Corso Como 15, Porta Garibaldi, Milan): Sunday Aperitivo & Late Night Hits. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "From €15", "tables": "Party Tables from €250"},
    dressCode: {
      en: "Smart Casual Corso Como.",
      it: "Smart Casual Corso Como."
    },
    faqs: defaultFaqs("Loolapaloosa Milano", "Corso Como 15, Porta Garibaldi, Milan", "20+", "Smart Casual Corso Como.", "Commercial, Sing-Along, Party Hits, Dance"),
    image: "/images/events/weekly-posters/loolapaloosa-resident-weekly.webp",
    priority: 79
  },
  {
    id: "bobino-wednesday-wednesday-navigli-lounge",
    clubSlug: "bobino",
    clubName: "Bobino Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-navigli-lounge",
    name: "Wednesday Gourmet Aperitivo & DJ Selection",
    genres: ["Commercial", "Revival 80s-90s", "House", "Dinner Buffet"],
    target: "23+, Professionals, Navigli Aperitivo & Adult Clubbing Crowd",
    description: {
      en: "Wednesday program at Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Wednesday Gourmet Aperitivo & DJ Selection. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Wednesday Gourmet Aperitivo & DJ Selection. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Evening selection", "tables": "Reserved Tables from €250"},
    dressCode: {
      en: "Smart Elegant After-Work & Evening.",
      it: "Smart Elegant Aperitivo & Dopocena."
    },
    faqs: defaultFaqs("Bobino Milano", "Piazzale Stazione Genova 4, Navigli, Milan", "23+", "Smart Elegant After-Work & Evening.", "Commercial, Revival 80s-90s, House, Dinner Buffet"),
    image: "/images/events/weekly-posters/bobino-navigli-weekly.webp",
    priority: 81
  },
  {
    id: "bobino-thursday-thursday-afterwork-party",
    clubSlug: "bobino",
    clubName: "Bobino Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-afterwork-party",
    name: "Thursday Navigli After-Work Buffet & Dance",
    genres: ["Commercial", "Revival 80s-90s", "House", "Dinner Buffet"],
    target: "23+, Professionals, Navigli Aperitivo & Adult Clubbing Crowd",
    description: {
      en: "Thursday program at Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Thursday Navigli After-Work Buffet & Dance. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Thursday Navigli After-Work Buffet & Dance. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Evening selection", "tables": "Reserved Tables from €250"},
    dressCode: {
      en: "Smart Elegant After-Work & Evening.",
      it: "Smart Elegant Aperitivo & Dopocena."
    },
    faqs: defaultFaqs("Bobino Milano", "Piazzale Stazione Genova 4, Navigli, Milan", "23+", "Smart Elegant After-Work & Evening.", "Commercial, Revival 80s-90s, House, Dinner Buffet"),
    image: "/images/events/weekly-posters/bobino-navigli-weekly.webp",
    priority: 81
  },
  {
    id: "bobino-friday-friday-dinner-dance-hits",
    clubSlug: "bobino",
    clubName: "Bobino Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-dinner-dance-hits",
    name: "Friday Aperitivo, Dinner & Dance Classics",
    genres: ["Commercial", "Revival 80s-90s", "House", "Dinner Buffet"],
    target: "23+, Professionals, Navigli Aperitivo & Adult Clubbing Crowd",
    description: {
      en: "Friday program at Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Friday Aperitivo, Dinner & Dance Classics. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Friday Aperitivo, Dinner & Dance Classics. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Evening selection", "tables": "Reserved Tables from €250"},
    dressCode: {
      en: "Smart Elegant After-Work & Evening.",
      it: "Smart Elegant Aperitivo & Dopocena."
    },
    faqs: defaultFaqs("Bobino Milano", "Piazzale Stazione Genova 4, Navigli, Milan", "23+", "Smart Elegant After-Work & Evening.", "Commercial, Revival 80s-90s, House, Dinner Buffet"),
    image: "/images/events/weekly-posters/bobino-navigli-weekly.webp",
    priority: 81
  },
  {
    id: "bobino-saturday-saturday-bobino-club-night",
    clubSlug: "bobino",
    clubName: "Bobino Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-bobino-club-night",
    name: "Saturday Navigli Garden & Indoor Party",
    genres: ["Commercial", "Revival 80s-90s", "House", "Dinner Buffet"],
    target: "23+, Professionals, Navigli Aperitivo & Adult Clubbing Crowd",
    description: {
      en: "Saturday program at Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Saturday Navigli Garden & Indoor Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Saturday Navigli Garden & Indoor Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Evening selection", "tables": "Reserved Tables from €250"},
    dressCode: {
      en: "Smart Elegant After-Work & Evening.",
      it: "Smart Elegant Aperitivo & Dopocena."
    },
    faqs: defaultFaqs("Bobino Milano", "Piazzale Stazione Genova 4, Navigli, Milan", "23+", "Smart Elegant After-Work & Evening.", "Commercial, Revival 80s-90s, House, Dinner Buffet"),
    image: "/images/events/weekly-posters/bobino-navigli-weekly.webp",
    priority: 81
  },
  {
    id: "bobino-sunday-sunday-navigli-aperitivo",
    clubSlug: "bobino",
    clubName: "Bobino Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-navigli-aperitivo",
    name: "Sunday Navigli Aperitivo & Vocal DJ Set",
    genres: ["Commercial", "Revival 80s-90s", "House", "Dinner Buffet"],
    target: "23+, Professionals, Navigli Aperitivo & Adult Clubbing Crowd",
    description: {
      en: "Sunday program at Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Sunday Navigli Aperitivo & Vocal DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Bobino Milano (Piazzale Stazione Genova 4, Navigli, Milan): Sunday Navigli Aperitivo & Vocal DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "From €15", "club": "Evening selection", "tables": "Reserved Tables from €250"},
    dressCode: {
      en: "Smart Elegant After-Work & Evening.",
      it: "Smart Elegant Aperitivo & Dopocena."
    },
    faqs: defaultFaqs("Bobino Milano", "Piazzale Stazione Genova 4, Navigli, Milan", "23+", "Smart Elegant After-Work & Evening.", "Commercial, Revival 80s-90s, House, Dinner Buffet"),
    image: "/images/events/weekly-posters/bobino-navigli-weekly.webp",
    priority: 81
  },
  {
    id: "dock22-thursday-thursday-canal-mixology",
    clubSlug: "dock22",
    clubName: "Dock 22 Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-canal-mixology",
    name: "Thursday Naviglio Grande Mixology & Beats",
    genres: ["House", "Deep House", "Mixology", "Commercial"],
    target: "21+, Naviglio Grande Cocktail & Late Lounge Crowd",
    description: {
      en: "Thursday program at Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Thursday Naviglio Grande Mixology & Beats. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Thursday Naviglio Grande Mixology & Beats. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Cocktails from €12", "club": "Upon selection", "tables": "Loft Tables from €200"},
    dressCode: {
      en: "Canal Loft Chic & Smart Casual.",
      it: "Loft Chic & Smart Casual sui Navigli."
    },
    faqs: defaultFaqs("Dock 22 Milano", "Alzaia Naviglio Grande 22, Navigli, Milan", "21+", "Canal Loft Chic & Smart Casual.", "House, Deep House, Mixology, Commercial"),
    image: "/images/events/weekly-posters/dock22-resident-weekly.webp",
    priority: 76
  },
  {
    id: "dock22-friday-friday-loft-house-session",
    clubSlug: "dock22",
    clubName: "Dock 22 Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-loft-house-session",
    name: "Friday Canal Loft Cocktails & House Session",
    genres: ["House", "Deep House", "Mixology", "Commercial"],
    target: "21+, Naviglio Grande Cocktail & Late Lounge Crowd",
    description: {
      en: "Friday program at Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Friday Canal Loft Cocktails & House Session. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Friday Canal Loft Cocktails & House Session. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Cocktails from €12", "club": "Upon selection", "tables": "Loft Tables from €200"},
    dressCode: {
      en: "Canal Loft Chic & Smart Casual.",
      it: "Loft Chic & Smart Casual sui Navigli."
    },
    faqs: defaultFaqs("Dock 22 Milano", "Alzaia Naviglio Grande 22, Navigli, Milan", "21+", "Canal Loft Chic & Smart Casual.", "House, Deep House, Mixology, Commercial"),
    image: "/images/events/weekly-posters/dock22-resident-weekly.webp",
    priority: 76
  },
  {
    id: "dock22-saturday-saturday-naviglio-late-club",
    clubSlug: "dock22",
    clubName: "Dock 22 Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-naviglio-late-club",
    name: "Saturday Naviglio Grande Lounge & Club",
    genres: ["House", "Deep House", "Mixology", "Commercial"],
    target: "21+, Naviglio Grande Cocktail & Late Lounge Crowd",
    description: {
      en: "Saturday program at Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Saturday Naviglio Grande Lounge & Club. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Saturday Naviglio Grande Lounge & Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Cocktails from €12", "club": "Upon selection", "tables": "Loft Tables from €200"},
    dressCode: {
      en: "Canal Loft Chic & Smart Casual.",
      it: "Loft Chic & Smart Casual sui Navigli."
    },
    faqs: defaultFaqs("Dock 22 Milano", "Alzaia Naviglio Grande 22, Navigli, Milan", "21+", "Canal Loft Chic & Smart Casual.", "House, Deep House, Mixology, Commercial"),
    image: "/images/events/weekly-posters/dock22-resident-weekly.webp",
    priority: 76
  },
  {
    id: "dock22-sunday-sunday-canal-sunset-grooves",
    clubSlug: "dock22",
    clubName: "Dock 22 Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-canal-sunset-grooves",
    name: "Sunday Canal Aperitivo & Deep Grooves",
    genres: ["House", "Deep House", "Mixology", "Commercial"],
    target: "21+, Naviglio Grande Cocktail & Late Lounge Crowd",
    description: {
      en: "Sunday program at Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Sunday Canal Aperitivo & Deep Grooves. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Dock 22 Milano (Alzaia Naviglio Grande 22, Navigli, Milan): Sunday Canal Aperitivo & Deep Grooves. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Cocktails from €12", "club": "Upon selection", "tables": "Loft Tables from €200"},
    dressCode: {
      en: "Canal Loft Chic & Smart Casual.",
      it: "Loft Chic & Smart Casual sui Navigli."
    },
    faqs: defaultFaqs("Dock 22 Milano", "Alzaia Naviglio Grande 22, Navigli, Milan", "21+", "Canal Loft Chic & Smart Casual.", "House, Deep House, Mixology, Commercial"),
    image: "/images/events/weekly-posters/dock22-resident-weekly.webp",
    priority: 76
  },
  {
    id: "radio-rooftop-bar-milano-monday-monday-skyline-sunset",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "monday",
    dayOfWeek: 1,
    eventSlug: "monday-skyline-sunset",
    name: "Monday 10th-Floor Skyline Aperitivo & Lounge",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Monday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Monday 10th-Floor Skyline Aperitivo & Lounge. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del lunedì da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Monday 10th-Floor Skyline Aperitivo & Lounge. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-tuesday-tuesday-porta-nuova-mixology",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-porta-nuova-mixology",
    name: "Tuesday Skyline Tapas & Deep House",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Tuesday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Tuesday Skyline Tapas & Deep House. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Tuesday Skyline Tapas & Deep House. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-wednesday-wednesday-panoramic-dj-set",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-panoramic-dj-set",
    name: "Wednesday Panoramic Cocktails & DJ Set",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Wednesday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Wednesday Panoramic Cocktails & DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Wednesday Panoramic Cocktails & DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-thursday-thursday-cosmopolitan-rooftop",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-cosmopolitan-rooftop",
    name: "Thursday Cosmopolitan Skyline Session",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Thursday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Thursday Cosmopolitan Skyline Session. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Thursday Cosmopolitan Skyline Session. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-friday-friday-tenth-floor-grooves",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-tenth-floor-grooves",
    name: "Friday 10th-Floor Sunset & Deep House",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Friday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Friday 10th-Floor Sunset & Deep House. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Friday 10th-Floor Sunset & Deep House. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-saturday-saturday-skyline-soiree",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-skyline-soiree",
    name: "Saturday Porta Nuova Skyline Soirée & DJ Set",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Saturday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Saturday Porta Nuova Skyline Soirée & DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Saturday Porta Nuova Skyline Soirée & DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "radio-rooftop-bar-milano-sunday-sunday-rooftop-horizon",
    clubSlug: "radio-rooftop-bar-milano",
    clubName: "Radio Rooftop Milan",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-rooftop-horizon",
    name: "Sunday Panoramic Aperitivo & Lounge Beats",
    genres: ["Deep House", "Lounge", "Skyline Aperitivo"],
    target: "21+, International Hotel Guests, Skyline & Cocktail Lovers",
    description: {
      en: "Sunday program at Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Sunday Panoramic Aperitivo & Lounge Beats. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Radio Rooftop Milan (Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan): Sunday Panoramic Aperitivo & Lounge Beats. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Skyline Lounge Tables upon reservation"},
    dressCode: {
      en: "Upscale Cosmopolitan Rooftop Chic.",
      it: "Cosmopolitan Chic da Rooftop."
    },
    faqs: defaultFaqs("Radio Rooftop Milan", "Via Marco Polo 18 (10th Floor ME Milan Il Duca), Repubblica, Milan", "21+", "Upscale Cosmopolitan Rooftop Chic.", "Deep House, Lounge, Skyline Aperitivo"),
    image: "/images/events/weekly-posters/radio-rooftop-resident-weekly.webp",
    priority: 81
  },
  {
    id: "the-roof-milano-monday-monday-missori-sunset",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "monday",
    dayOfWeek: 1,
    eventSlug: "monday-missori-sunset",
    name: "Monday Historic Spires Aperitivo & Dining",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Monday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Monday Historic Spires Aperitivo & Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del lunedì da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Monday Historic Spires Aperitivo & Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-tuesday-tuesday-panoramic-terrace",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-panoramic-terrace",
    name: "Tuesday Panoramic Cocktail Lounge & Dinner",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Tuesday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Tuesday Panoramic Cocktail Lounge & Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Tuesday Panoramic Cocktail Lounge & Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-wednesday-wednesday-duomo-horizon",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-duomo-horizon",
    name: "Wednesday Sunset Mixology Over Central Milan",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Wednesday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Wednesday Sunset Mixology Over Central Milan. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Wednesday Sunset Mixology Over Central Milan. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-thursday-thursday-gourmet-rooftop",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-gourmet-rooftop",
    name: "Thursday Gourmet Terrace & Evening Drinks",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Thursday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Thursday Gourmet Terrace & Evening Drinks. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Thursday Gourmet Terrace & Evening Drinks. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-friday-friday-skyline-aperitivo",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-skyline-aperitivo",
    name: "Friday Central Milan Skyline Aperitivo & Dinner",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Friday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Friday Central Milan Skyline Aperitivo & Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Friday Central Milan Skyline Aperitivo & Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-saturday-saturday-starlight-terrace",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-starlight-terrace",
    name: "Saturday Starlight Rooftop Dinner & Mixology",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Saturday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Saturday Starlight Rooftop Dinner & Mixology. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Saturday Starlight Rooftop Dinner & Mixology. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "the-roof-milano-sunday-sunday-panoramic-lounge",
    clubSlug: "the-roof-milano",
    clubName: "The Roof Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-panoramic-lounge",
    name: "Sunday Sunset Aperitivo & Fine Cocktails",
    genres: ["Lounge", "Sunset Aperitivo", "Fine Dining"],
    target: "21+, Couples, Business & Historic Center Rooftop Guests",
    description: {
      en: "Sunday program at The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Sunday Sunset Aperitivo & Fine Cocktails. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da The Roof Milano (Piazza Giuseppe Missori 1, Historic Center, Milan): Sunday Sunset Aperitivo & Fine Cocktails. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Panoramic Terrace Dining & Lounge upon request"},
    dressCode: {
      en: "Refined Italian Smart Elegant.",
      it: "Raffinato Smart Elegant Italiano."
    },
    faqs: defaultFaqs("The Roof Milano", "Piazza Giuseppe Missori 1, Historic Center, Milan", "21+", "Refined Italian Smart Elegant.", "Lounge, Sunset Aperitivo, Fine Dining"),
    image: "/images/events/weekly-posters/the-roof-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-monday-monday-duomo-spires-aperitivo",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "monday",
    dayOfWeek: 1,
    eventSlug: "monday-duomo-spires-aperitivo",
    name: "Monday Cathedral Spires Aperitivo",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Monday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Monday Cathedral Spires Aperitivo. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del lunedì da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Monday Cathedral Spires Aperitivo. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-tuesday-tuesday-galleria-sunset",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-galleria-sunset",
    name: "Tuesday Galleria Balcony Spritz & Cicchetti",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Tuesday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Tuesday Galleria Balcony Spritz & Cicchetti. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Tuesday Galleria Balcony Spritz & Cicchetti. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-wednesday-wednesday-duomo-golden-hour",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-duomo-golden-hour",
    name: "Wednesday Duomo View Golden Hour",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Wednesday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Wednesday Duomo View Golden Hour. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Wednesday Duomo View Golden Hour. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-thursday-thursday-milanese-ritual",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-milanese-ritual",
    name: "Thursday Iconic Milanese Aperitivo Over Duomo",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Thursday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Thursday Iconic Milanese Aperitivo Over Duomo. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Thursday Iconic Milanese Aperitivo Over Duomo. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-friday-friday-cathedral-terrace",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-cathedral-terrace",
    name: "Friday Piazza Duomo Sunset Terrace",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Friday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Friday Piazza Duomo Sunset Terrace. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Friday Piazza Duomo Sunset Terrace. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-saturday-saturday-duomo-balcony",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-duomo-balcony",
    name: "Saturday Signature Aperitivo Facing Duomo",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Saturday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Saturday Signature Aperitivo Facing Duomo. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Saturday Signature Aperitivo Facing Duomo. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-aperol-milano-sunday-sunday-duomo-aperitivo",
    clubSlug: "terrazza-aperol-milano",
    clubName: "Terrazza Aperol Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-duomo-aperitivo",
    name: "Sunday Panoramic Duomo Terrace Aperitivo",
    genres: ["Aperitivo", "Lounge", "Italian Eclectic"],
    target: "18+, International Visitors & Milanese Duomo Aperitivo Lovers",
    description: {
      en: "Sunday program at Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Sunday Panoramic Duomo Terrace Aperitivo. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Terrazza Aperol Milano (Piazza del Duomo (Galleria Vittorio Emanuele II), Milan): Sunday Panoramic Duomo Terrace Aperitivo. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Drinks & Cicchetti from €16", "tables": "Cathedral-View Tables via Concierge"},
    dressCode: {
      en: "Milanese Smart Casual.",
      it: "Smart Casual Milanese."
    },
    faqs: defaultFaqs("Terrazza Aperol Milano", "Piazza del Duomo (Galleria Vittorio Emanuele II), Milan", "18+", "Milanese Smart Casual.", "Aperitivo, Lounge, Italian Eclectic"),
    image: "/images/events/weekly-posters/terrazza-aperol-resident-weekly.webp",
    priority: 78
  },
  {
    id: "terrazza-gallia-milano-tuesday-tuesday-art-deco-mixology",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-art-deco-mixology",
    name: "Tuesday 7th-Floor Art-Deco Mixology & Dining",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Tuesday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Tuesday 7th-Floor Art-Deco Mixology & Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Tuesday 7th-Floor Art-Deco Mixology & Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "terrazza-gallia-milano-wednesday-wednesday-signature-martini",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-signature-martini",
    name: "Wednesday Haute Aperitivo & Rooftop Restaurant",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Wednesday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Wednesday Haute Aperitivo & Rooftop Restaurant. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Wednesday Haute Aperitivo & Rooftop Restaurant. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "terrazza-gallia-milano-thursday-thursday-excelsior-soiree",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-excelsior-soiree",
    name: "Thursday Luxury Rooftop Bar & Gourmet Dinner",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Thursday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Thursday Luxury Rooftop Bar & Gourmet Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Thursday Luxury Rooftop Bar & Gourmet Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "terrazza-gallia-milano-friday-friday-gallia-skyline",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-gallia-skyline",
    name: "Friday Five-Star Mixology & Terrace Dining",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Friday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Friday Five-Star Mixology & Terrace Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Friday Five-Star Mixology & Terrace Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "terrazza-gallia-milano-saturday-saturday-haute-rooftop",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-haute-rooftop",
    name: "Saturday Grand Rooftop Gourmet & Cocktail Night",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Saturday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Saturday Grand Rooftop Gourmet & Cocktail Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Saturday Grand Rooftop Gourmet & Cocktail Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "terrazza-gallia-milano-sunday-sunday-palace-terrace",
    clubSlug: "terrazza-gallia-milano",
    clubName: "Terrazza Gallia Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-palace-terrace",
    name: "Sunday Panoramic Aperitivo & Fine Cuisine",
    genres: ["Fine Mixology", "Haute Cuisine", "Lounge"],
    target: "23+, Luxury Travelers, Gourmets & Five-Star Mixology Guests",
    description: {
      en: "Sunday program at Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Sunday Panoramic Aperitivo & Fine Cuisine. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Terrazza Gallia Milano (Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan): Sunday Panoramic Aperitivo & Fine Cuisine. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Signature Cocktails from €22", "tables": "7th-Floor Bar & Haute Dining upon request"},
    dressCode: {
      en: "Luxury Palace Smart Elegant.",
      it: "Luxury Hotel Smart Elegant."
    },
    faqs: defaultFaqs("Terrazza Gallia Milano", "Piazza Duca d'Aosta 9 (7th Floor Excelsior Hotel Gallia), Milan", "23+", "Luxury Palace Smart Elegant.", "Fine Mixology, Haute Cuisine, Lounge"),
    image: "/images/events/weekly-posters/terrazza-gallia-resident-weekly.webp",
    priority: 79
  },
  {
    id: "ristorante-torre-milano-wednesday-wednesday-prada-tower-bar",
    clubSlug: "ristorante-torre-milano",
    clubName: "Ristorante Torre \u00b7 Fondazione Prada",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-prada-tower-bar",
    name: "Wednesday 6th-Floor Museum Tower Bar & Dinner",
    genres: ["Contemporary Dining", "Cocktail Bar", "Lounge"],
    target: "21+, Contemporary Art Collectors, Architects & Fine Diners",
    description: {
      en: "Wednesday program at Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Wednesday 6th-Floor Museum Tower Bar & Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Wednesday 6th-Floor Museum Tower Bar & Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Bar Cocktails from €18", "tables": "6th-Floor Panoramic Table upon reservation"},
    dressCode: {
      en: "Architectural Contemporary Elegant.",
      it: "Elegante Contemporaneo."
    },
    faqs: defaultFaqs("Ristorante Torre · Fondazione Prada", "Via Lorenzini 14 (6th Floor Fondazione Prada), Milan", "21+", "Architectural Contemporary Elegant.", "Contemporary Dining, Cocktail Bar, Lounge"),
    image: "/images/events/weekly-posters/ristorante-torre-resident-weekly.webp",
    priority: 77
  },
  {
    id: "ristorante-torre-milano-thursday-thursday-architectural-dining",
    clubSlug: "ristorante-torre-milano",
    clubName: "Ristorante Torre \u00b7 Fondazione Prada",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-architectural-dining",
    name: "Thursday Contemporary Art Skyline Dinner & Drinks",
    genres: ["Contemporary Dining", "Cocktail Bar", "Lounge"],
    target: "21+, Contemporary Art Collectors, Architects & Fine Diners",
    description: {
      en: "Thursday program at Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Thursday Contemporary Art Skyline Dinner & Drinks. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Thursday Contemporary Art Skyline Dinner & Drinks. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Bar Cocktails from €18", "tables": "6th-Floor Panoramic Table upon reservation"},
    dressCode: {
      en: "Architectural Contemporary Elegant.",
      it: "Elegante Contemporaneo."
    },
    faqs: defaultFaqs("Ristorante Torre · Fondazione Prada", "Via Lorenzini 14 (6th Floor Fondazione Prada), Milan", "21+", "Architectural Contemporary Elegant.", "Contemporary Dining, Cocktail Bar, Lounge"),
    image: "/images/events/weekly-posters/ristorante-torre-resident-weekly.webp",
    priority: 77
  },
  {
    id: "ristorante-torre-milano-friday-friday-fondazione-skyline",
    clubSlug: "ristorante-torre-milano",
    clubName: "Ristorante Torre \u00b7 Fondazione Prada",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-fondazione-skyline",
    name: "Friday Panoramic Tower Cocktails & Italian Cuisine",
    genres: ["Contemporary Dining", "Cocktail Bar", "Lounge"],
    target: "21+, Contemporary Art Collectors, Architects & Fine Diners",
    description: {
      en: "Friday program at Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Friday Panoramic Tower Cocktails & Italian Cuisine. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Friday Panoramic Tower Cocktails & Italian Cuisine. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Bar Cocktails from €18", "tables": "6th-Floor Panoramic Table upon reservation"},
    dressCode: {
      en: "Architectural Contemporary Elegant.",
      it: "Elegante Contemporaneo."
    },
    faqs: defaultFaqs("Ristorante Torre · Fondazione Prada", "Via Lorenzini 14 (6th Floor Fondazione Prada), Milan", "21+", "Architectural Contemporary Elegant.", "Contemporary Dining, Cocktail Bar, Lounge"),
    image: "/images/events/weekly-posters/ristorante-torre-resident-weekly.webp",
    priority: 77
  },
  {
    id: "ristorante-torre-milano-saturday-saturday-torre-fine-dining",
    clubSlug: "ristorante-torre-milano",
    clubName: "Ristorante Torre \u00b7 Fondazione Prada",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-torre-fine-dining",
    name: "Saturday 6th-Floor Skyline Dinner & Mixology",
    genres: ["Contemporary Dining", "Cocktail Bar", "Lounge"],
    target: "21+, Contemporary Art Collectors, Architects & Fine Diners",
    description: {
      en: "Saturday program at Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Saturday 6th-Floor Skyline Dinner & Mixology. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Saturday 6th-Floor Skyline Dinner & Mixology. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Bar Cocktails from €18", "tables": "6th-Floor Panoramic Table upon reservation"},
    dressCode: {
      en: "Architectural Contemporary Elegant.",
      it: "Elegante Contemporaneo."
    },
    faqs: defaultFaqs("Ristorante Torre · Fondazione Prada", "Via Lorenzini 14 (6th Floor Fondazione Prada), Milan", "21+", "Architectural Contemporary Elegant.", "Contemporary Dining, Cocktail Bar, Lounge"),
    image: "/images/events/weekly-posters/ristorante-torre-resident-weekly.webp",
    priority: 77
  },
  {
    id: "ristorante-torre-milano-sunday-sunday-museum-tower-evening",
    clubSlug: "ristorante-torre-milano",
    clubName: "Ristorante Torre \u00b7 Fondazione Prada",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-museum-tower-evening",
    name: "Sunday Panoramic Aperitivo & Evening Dining",
    genres: ["Contemporary Dining", "Cocktail Bar", "Lounge"],
    target: "21+, Contemporary Art Collectors, Architects & Fine Diners",
    description: {
      en: "Sunday program at Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Sunday Panoramic Aperitivo & Evening Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Ristorante Torre · Fondazione Prada (Via Lorenzini 14 (6th Floor Fondazione Prada), Milan): Sunday Panoramic Aperitivo & Evening Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Bar Cocktails from €18", "tables": "6th-Floor Panoramic Table upon reservation"},
    dressCode: {
      en: "Architectural Contemporary Elegant.",
      it: "Elegante Contemporaneo."
    },
    faqs: defaultFaqs("Ristorante Torre · Fondazione Prada", "Via Lorenzini 14 (6th Floor Fondazione Prada), Milan", "21+", "Architectural Contemporary Elegant.", "Contemporary Dining, Cocktail Bar, Lounge"),
    image: "/images/events/weekly-posters/ristorante-torre-resident-weekly.webp",
    priority: 77
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-tuesday-tuesday-glasshouse-skyline",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-glasshouse-skyline",
    name: "Tuesday Glasshouse Aperitivo Over Parco Sempione",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Tuesday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Tuesday Glasshouse Aperitivo Over Parco Sempione. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Tuesday Glasshouse Aperitivo Over Parco Sempione. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-wednesday-wednesday-triennale-vista",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-triennale-vista",
    name: "Wednesday Design Museum Terrace Dinner & Drinks",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Wednesday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Wednesday Design Museum Terrace Dinner & Drinks. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Wednesday Design Museum Terrace Dinner & Drinks. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-thursday-thursday-sempione-canopy",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-sempione-canopy",
    name: "Thursday Panoramic Pavilion Cocktails & Cuisine",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Thursday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Thursday Panoramic Pavilion Cocktails & Cuisine. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Thursday Panoramic Pavilion Cocktails & Cuisine. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-friday-friday-osteria-con-vista",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-osteria-con-vista",
    name: "Friday Illuminated Skyline Dinner & Cocktail Lounge",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Friday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Friday Illuminated Skyline Dinner & Cocktail Lounge. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Friday Illuminated Skyline Dinner & Cocktail Lounge. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-saturday-saturday-triennale-soiree",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-triennale-soiree",
    name: "Saturday Glasshouse Gourmet Dinner & Park View",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Saturday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Saturday Glasshouse Gourmet Dinner & Park View. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Saturday Glasshouse Gourmet Dinner & Park View. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "innocenti-evasioni-terrazza-triennale-sunday-sunday-parco-sempione-sunset",
    clubSlug: "innocenti-evasioni-terrazza-triennale",
    clubName: "Terrazza Triennale \u00b7 Osteria con Vista",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-parco-sempione-sunset",
    name: "Sunday Sunset Aperitivo & Skyline Dining",
    genres: ["Panoramic Dining", "Cocktail Lounge", "Sunset Aperitivo"],
    target: "21+, Design Lovers, Parco Sempione & Skyline Dining Guests",
    description: {
      en: "Sunday program at Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Sunday Sunset Aperitivo & Skyline Dining. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Terrazza Triennale · Osteria con Vista (Viale Emilio Alemagna 6 (Parco Sempione), Milan): Sunday Sunset Aperitivo & Skyline Dining. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Cocktails from €18", "tables": "Glasshouse Dinner & Terrace upon reservation"},
    dressCode: {
      en: "Design Museum Smart Elegant.",
      it: "Smart Elegant da Museo del Design."
    },
    faqs: defaultFaqs("Terrazza Triennale · Osteria con Vista", "Viale Emilio Alemagna 6 (Parco Sempione), Milan", "21+", "Design Museum Smart Elegant.", "Panoramic Dining, Cocktail Lounge, Sunset Aperitivo"),
    image: "/images/events/weekly-posters/terrazza-triennale-resident-weekly.webp",
    priority: 78
  },
  {
    id: "super-club-milano-friday-friday-tortona-club-night",
    clubSlug: "super-club-milano",
    clubName: "Super Club Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-tortona-club-night",
    name: "Friday Tortona Design District Club Night",
    genres: ["House", "Tech-House", "Commercial"],
    target: "21+, Tortona Creative, Fashion & Boutique Club Crowd",
    description: {
      en: "Friday program at Super Club Milano (Via Tortona 27, Tortona Design District, Milan): Friday Tortona Design District Club Night. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Super Club Milano (Via Tortona 27, Tortona Design District, Milan): Friday Tortona Design District Club Night. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Fashion & Design District Chic.",
      it: "Chic da Tortona Design District."
    },
    faqs: defaultFaqs("Super Club Milano", "Via Tortona 27, Tortona Design District, Milan", "21+", "Fashion & Design District Chic.", "House, Tech-House, Commercial"),
    image: "/images/events/weekly-posters/superclub-milano-weekly.webp",
    priority: 77
  },
  {
    id: "super-club-milano-saturday-saturday-superclub-prive",
    clubSlug: "super-club-milano",
    clubName: "Super Club Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-superclub-prive",
    name: "Saturday Super Club House & VIP Showcase",
    genres: ["House", "Tech-House", "Commercial"],
    target: "21+, Tortona Creative, Fashion & Boutique Club Crowd",
    description: {
      en: "Saturday program at Super Club Milano (Via Tortona 27, Tortona Design District, Milan): Saturday Super Club House & VIP Showcase. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Super Club Milano (Via Tortona 27, Tortona Design District, Milan): Saturday Super Club House & VIP Showcase. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "VIP Privé from €300"},
    dressCode: {
      en: "Fashion & Design District Chic.",
      it: "Chic da Tortona Design District."
    },
    faqs: defaultFaqs("Super Club Milano", "Via Tortona 27, Tortona Design District, Milan", "21+", "Fashion & Design District Chic.", "House, Tech-House, Commercial"),
    image: "/images/events/weekly-posters/superclub-milano-weekly.webp",
    priority: 77
  },
  {
    id: "carlsbergol-tuesday-tuesday-porta-nuova-brewery",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "tuesday",
    dayOfWeek: 2,
    eventSlug: "tuesday-porta-nuova-brewery",
    name: "Tuesday Craft Brewery & Convivial Dinner",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Tuesday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Tuesday Craft Brewery & Convivial Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del martedì da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Tuesday Craft Brewery & Convivial Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "carlsbergol-wednesday-wednesday-grill-stein-evening",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-grill-stein-evening",
    name: "Wednesday Porta Nuova Grill & Craft Taps",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Wednesday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Wednesday Porta Nuova Grill & Craft Taps. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Wednesday Porta Nuova Grill & Craft Taps. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "carlsbergol-thursday-thursday-bastioni-social-dinner",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-bastioni-social-dinner",
    name: "Thursday Bastioni di Porta Nuova Group Dinner",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Thursday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Thursday Bastioni di Porta Nuova Group Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Thursday Bastioni di Porta Nuova Group Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "carlsbergol-friday-friday-brewery-music-night",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-brewery-music-night",
    name: "Friday Craft Brewery Dinner & Evening Vibes",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Friday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Friday Craft Brewery Dinner & Evening Vibes. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Friday Craft Brewery Dinner & Evening Vibes. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "carlsbergol-saturday-saturday-porta-nuova-feast",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-porta-nuova-feast",
    name: "Saturday Porta Nuova Dinner & Celebration Tables",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Saturday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Saturday Porta Nuova Dinner & Celebration Tables. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Saturday Porta Nuova Dinner & Celebration Tables. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "carlsbergol-sunday-sunday-convivial-dinner",
    clubSlug: "carlsbergol",
    clubName: "Carlsberg \u00d8L Milano",
    day: "sunday",
    dayOfWeek: 0,
    eventSlug: "sunday-convivial-dinner",
    name: "Sunday Family & Friends Brewery Dinner",
    genres: ["Restaurant & Brewery", "Live Convivial", "Porta Nuova Evening"],
    target: "Groups, Families, Convivial Dinners & Porta Nuova Crowd",
    description: {
      en: "Sunday program at Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Sunday Family & Friends Brewery Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del domenica da Carlsberg ØL Milano (Bastioni di Porta Nuova 9, Porta Nuova, Milan): Sunday Family & Friends Brewery Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Craft Beer & Grill Menu", "tables": "Convivial & Group Tables via WhatsApp"},
    dressCode: {
      en: "Smart Casual Porta Nuova.",
      it: "Smart Casual Porta Nuova."
    },
    faqs: defaultFaqs("Carlsberg ØL Milano", "Bastioni di Porta Nuova 9, Porta Nuova, Milan", "18+ (Family-Friendly Restaurant & Brewery)", "Smart Casual Porta Nuova.", "Restaurant & Brewery, Live Convivial, Porta Nuova Evening"),
    image: "/images/events/weekly-posters/carlsbergol-milano-weekly.webp",
    priority: 85
  },
  {
    id: "tom-thursday-thursday-ordinary-supper-club",
    clubSlug: "tom",
    clubName: "TOM \u00b7 The Ordinary Market Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-ordinary-supper-club",
    name: "Thursday Cosmopolitan Dinner & DJ Lounge",
    genres: ["Dinner Show", "House", "Commercial"],
    target: "21+, International Supper-Club, Cocktails & Late Lounge Crowd",
    description: {
      en: "Thursday program at TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Thursday Cosmopolitan Dinner & DJ Lounge. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Thursday Cosmopolitan Dinner & DJ Lounge. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner & Cocktails from €35", "club": "From €20", "tables": "Supper-Club & Club Tables from €300"},
    dressCode: {
      en: "Urban Supper-Club Chic.",
      it: "Urban Supper-Club Chic."
    },
    faqs: defaultFaqs("TOM · The Ordinary Market Milano", "Via Molino delle Armi / Via della Chiusa, Centro, Milan", "21+", "Urban Supper-Club Chic.", "Dinner Show, House, Commercial"),
    image: "/images/events/weekly-posters/tom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "tom-friday-friday-dinner-show-club",
    clubSlug: "tom",
    clubName: "TOM \u00b7 The Ordinary Market Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-dinner-show-club",
    name: "Friday Two-Level Dinner Show & House Club",
    genres: ["Dinner Show", "House", "Commercial"],
    target: "21+, International Supper-Club, Cocktails & Late Lounge Crowd",
    description: {
      en: "Friday program at TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Friday Two-Level Dinner Show & House Club. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Friday Two-Level Dinner Show & House Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner & Cocktails from €35", "club": "From €20", "tables": "Supper-Club & Club Tables from €300"},
    dressCode: {
      en: "Urban Supper-Club Chic.",
      it: "Urban Supper-Club Chic."
    },
    faqs: defaultFaqs("TOM · The Ordinary Market Milano", "Via Molino delle Armi / Via della Chiusa, Centro, Milan", "21+", "Urban Supper-Club Chic.", "Dinner Show, House, Commercial"),
    image: "/images/events/weekly-posters/tom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "tom-saturday-saturday-tom-club-night",
    clubSlug: "tom",
    clubName: "TOM \u00b7 The Ordinary Market Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-tom-club-night",
    name: "Saturday Signature Supper-Club & VIP Party",
    genres: ["Dinner Show", "House", "Commercial"],
    target: "21+, International Supper-Club, Cocktails & Late Lounge Crowd",
    description: {
      en: "Saturday program at TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Saturday Signature Supper-Club & VIP Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da TOM · The Ordinary Market Milano (Via Molino delle Armi / Via della Chiusa, Centro, Milan): Saturday Signature Supper-Club & VIP Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner & Cocktails from €35", "club": "From €20", "tables": "Supper-Club & Club Tables from €300"},
    dressCode: {
      en: "Urban Supper-Club Chic.",
      it: "Urban Supper-Club Chic."
    },
    faqs: defaultFaqs("TOM · The Ordinary Market Milano", "Via Molino delle Armi / Via della Chiusa, Centro, Milan", "21+", "Urban Supper-Club Chic.", "Dinner Show, House, Commercial"),
    image: "/images/events/weekly-posters/tom-milano-weekly.webp",
    priority: 80
  },
  {
    id: "bischeri-wednesday-wednesday-cena-cantata",
    clubSlug: "bischeri",
    clubName: "I Bischeri Milano",
    day: "wednesday",
    dayOfWeek: 3,
    eventSlug: "wednesday-cena-cantata",
    name: "Wednesday Tuscan Cuisine & Singing Dinner",
    genres: ["Tuscan Dinner Show", "Italian Sing-Along", "Commercial"],
    target: "21+, Singing Dinner Groups, Birthdays & Convivial Parties",
    description: {
      en: "Wednesday program at I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Wednesday Tuscan Cuisine & Singing Dinner. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del mercoledì da I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Wednesday Tuscan Cuisine & Singing Dinner. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Singing Dinner from €40", "tables": "Dinner & After-Dinner Tables via WhatsApp"},
    dressCode: {
      en: "Smart Elegant Dinner Show.",
      it: "Smart Elegant da Cena Cantata."
    },
    faqs: defaultFaqs("I Bischeri Milano", "Viale Gorizia / Darsena District, Milan", "21+", "Smart Elegant Dinner Show.", "Tuscan Dinner Show, Italian Sing-Along, Commercial"),
    image: "/images/events/weekly-posters/bischeri-milano-weekly.webp",
    priority: 79
  },
  {
    id: "bischeri-thursday-thursday-live-dinner-party",
    clubSlug: "bischeri",
    clubName: "I Bischeri Milano",
    day: "thursday",
    dayOfWeek: 4,
    eventSlug: "thursday-live-dinner-party",
    name: "Thursday Convivial Singing Dinner & DJ Set",
    genres: ["Tuscan Dinner Show", "Italian Sing-Along", "Commercial"],
    target: "21+, Singing Dinner Groups, Birthdays & Convivial Parties",
    description: {
      en: "Thursday program at I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Thursday Convivial Singing Dinner & DJ Set. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del giovedì da I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Thursday Convivial Singing Dinner & DJ Set. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Singing Dinner from €40", "tables": "Dinner & After-Dinner Tables via WhatsApp"},
    dressCode: {
      en: "Smart Elegant Dinner Show.",
      it: "Smart Elegant da Cena Cantata."
    },
    faqs: defaultFaqs("I Bischeri Milano", "Viale Gorizia / Darsena District, Milan", "21+", "Smart Elegant Dinner Show.", "Tuscan Dinner Show, Italian Sing-Along, Commercial"),
    image: "/images/events/weekly-posters/bischeri-milano-weekly.webp",
    priority: 79
  },
  {
    id: "bischeri-friday-friday-bischeri-dinner-show",
    clubSlug: "bischeri",
    clubName: "I Bischeri Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-bischeri-dinner-show",
    name: "Friday Full Singing Dinner Show & Dance",
    genres: ["Tuscan Dinner Show", "Italian Sing-Along", "Commercial"],
    target: "21+, Singing Dinner Groups, Birthdays & Convivial Parties",
    description: {
      en: "Friday program at I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Friday Full Singing Dinner Show & Dance. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Friday Full Singing Dinner Show & Dance. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Singing Dinner from €40", "tables": "Dinner & After-Dinner Tables via WhatsApp"},
    dressCode: {
      en: "Smart Elegant Dinner Show.",
      it: "Smart Elegant da Cena Cantata."
    },
    faqs: defaultFaqs("I Bischeri Milano", "Viale Gorizia / Darsena District, Milan", "21+", "Smart Elegant Dinner Show.", "Tuscan Dinner Show, Italian Sing-Along, Commercial"),
    image: "/images/events/weekly-posters/bischeri-milano-weekly.webp",
    priority: 79
  },
  {
    id: "bischeri-saturday-saturday-gran-cena-cantata",
    clubSlug: "bischeri",
    clubName: "I Bischeri Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-gran-cena-cantata",
    name: "Saturday Flagship Cena Cantata & Party",
    genres: ["Tuscan Dinner Show", "Italian Sing-Along", "Commercial"],
    target: "21+, Singing Dinner Groups, Birthdays & Convivial Parties",
    description: {
      en: "Saturday program at I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Saturday Flagship Cena Cantata & Party. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da I Bischeri Milano (Viale Gorizia / Darsena District, Milan): Saturday Flagship Cena Cantata & Party. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "Evening Cocktail Bar & Lounge", "aperitif": "Singing Dinner from €40", "tables": "Dinner & After-Dinner Tables via WhatsApp"},
    dressCode: {
      en: "Smart Elegant Dinner Show.",
      it: "Smart Elegant da Cena Cantata."
    },
    faqs: defaultFaqs("I Bischeri Milano", "Viale Gorizia / Darsena District, Milan", "21+", "Smart Elegant Dinner Show.", "Tuscan Dinner Show, Italian Sing-Along, Commercial"),
    image: "/images/events/weekly-posters/bischeri-milano-weekly.webp",
    priority: 79
  },
  {
    id: "gate-friday-friday-warehouse-techno",
    clubSlug: "gate",
    clubName: "Gate Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-warehouse-techno",
    name: "Friday Scalo Farini Warehouse Techno & House",
    genres: ["Techno", "Tech-House", "Electronic"],
    target: "18+, Underground Techno & International Electronic Scene",
    description: {
      en: "Friday program at Gate Milano (Via Valtellina 21, Scalo Farini, Milan): Friday Scalo Farini Warehouse Techno & House. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Gate Milano (Via Valtellina 21, Scalo Farini, Milan): Friday Scalo Farini Warehouse Techno & House. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Stage & Backstage Privé from €350"},
    dressCode: {
      en: "Dark Clubwear & Warehouse Techno Style.",
      it: "Dark Clubwear & Stile Techno Warehouse."
    },
    faqs: defaultFaqs("Gate Milano", "Via Valtellina 21, Scalo Farini, Milan", "18+", "Dark Clubwear & Warehouse Techno Style.", "Techno, Tech-House, Electronic"),
    image: "/images/events/weekly-posters/gate-milano-resident-weekly.webp",
    priority: 81
  },
  {
    id: "gate-saturday-saturday-gate-electronic-arena",
    clubSlug: "gate",
    clubName: "Gate Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-gate-electronic-arena",
    name: "Saturday International Techno & Tech-House Arena",
    genres: ["Techno", "Tech-House", "Electronic"],
    target: "18+, Underground Techno & International Electronic Scene",
    description: {
      en: "Saturday program at Gate Milano (Via Valtellina 21, Scalo Farini, Milan): Saturday International Techno & Tech-House Arena. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Gate Milano (Via Valtellina 21, Scalo Farini, Milan): Saturday International Techno & Tech-House Arena. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"club": "From €20", "tables": "Stage & Backstage Privé from €350"},
    dressCode: {
      en: "Dark Clubwear & Warehouse Techno Style.",
      it: "Dark Clubwear & Stile Techno Warehouse."
    },
    faqs: defaultFaqs("Gate Milano", "Via Valtellina 21, Scalo Farini, Milan", "18+", "Dark Clubwear & Warehouse Techno Style.", "Techno, Tech-House, Electronic"),
    image: "/images/events/weekly-posters/gate-milano-resident-weekly.webp",
    priority: 81
  },
  {
    id: "pelledoca-friday-friday-forlanini-dinner-show",
    clubSlug: "pelledoca",
    clubName: "Pelledoca Music & Club Milano",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-forlanini-dinner-show",
    name: "Friday Singing Dinner Show & Commercial Club",
    genres: ["Dinner Show", "Commercial", "Revival", "House"],
    target: "23+, Parco Forlanini Dinner Show, Birthdays & VIP Clubbing",
    description: {
      en: "Friday program at Pelledoca Music & Club Milano (Viale Enrico Forlanini 121, Parco Forlanini, Milan): Friday Singing Dinner Show & Commercial Club. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da Pelledoca Music & Club Milano (Viale Enrico Forlanini 121, Parco Forlanini, Milan): Friday Singing Dinner Show & Commercial Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show from €35", "club": "From €20", "tables": "VIP Privé from €250"},
    dressCode: {
      en: "Smart Chic Dinner & Club.",
      it: "Smart Chic Cena & Discoteca."
    },
    faqs: defaultFaqs("Pelledoca Music & Club Milano", "Viale Enrico Forlanini 121, Parco Forlanini, Milan", "23+", "Smart Chic Dinner & Club.", "Dinner Show, Commercial, Revival, House"),
    image: "/images/events/weekly-posters/pelledoca-resident-weekly.webp",
    priority: 79
  },
  {
    id: "pelledoca-saturday-saturday-pelledoca-party",
    clubSlug: "pelledoca",
    clubName: "Pelledoca Music & Club Milano",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-pelledoca-party",
    name: "Saturday Villa Dinner Show & Late Night Dance",
    genres: ["Dinner Show", "Commercial", "Revival", "House"],
    target: "23+, Parco Forlanini Dinner Show, Birthdays & VIP Clubbing",
    description: {
      en: "Saturday program at Pelledoca Music & Club Milano (Viale Enrico Forlanini 121, Parco Forlanini, Milan): Saturday Villa Dinner Show & Late Night Dance. Official Milan guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da Pelledoca Music & Club Milano (Viale Enrico Forlanini 121, Parco Forlanini, Milan): Saturday Villa Dinner Show & Late Night Dance. Prenotazione tavoli VIP, cena e accrediti ufficiali a Milano tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Dinner Show from €35", "club": "From €20", "tables": "VIP Privé from €250"},
    dressCode: {
      en: "Smart Chic Dinner & Club.",
      it: "Smart Chic Cena & Discoteca."
    },
    faqs: defaultFaqs("Pelledoca Music & Club Milano", "Viale Enrico Forlanini 121, Parco Forlanini, Milan", "23+", "Smart Chic Dinner & Club.", "Dinner Show, Commercial, Revival, House"),
    image: "/images/events/weekly-posters/pelledoca-resident-weekly.webp",
    priority: 79
  },
  {
    id: "justme-garda-friday-friday-garda-dinner-club",
    clubSlug: "justme-garda",
    clubName: "JustMe Garda Lake",
    day: "friday",
    dayOfWeek: 5,
    eventSlug: "friday-garda-dinner-club",
    name: "Friday Lake Garda Luxury Dinner Show & Club",
    genres: ["Dinner Show", "House", "Commercial"],
    target: "21+, Lake Garda, Desenzano, Sirmione & International VIP Guests",
    description: {
      en: "Friday program at JustMe Garda Lake (Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)): Friday Lake Garda Luxury Dinner Show & Club. Official Lake Garda (Lonato / Desenzano, BS) guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del venerdì da JustMe Garda Lake (Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)): Friday Lake Garda Luxury Dinner Show & Club. Prenotazione tavoli VIP, cena e accrediti ufficiali a Lago di Garda (Lonato / Desenzano, BS) tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Aperitivo & Dinner upon request", "club": "From €20", "tables": "Lake Garda VIP Privé from €350"},
    dressCode: {
      en: "Strictly Elegant Lake Garda Glamour.",
      it: "Rigorosamente Elegante Glamour Lago di Garda."
    },
    faqs: defaultFaqs("JustMe Garda Lake", "Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)", "21+", "Strictly Elegant Lake Garda Glamour.", "Dinner Show, House, Commercial"),
    image: "/images/events/weekly-posters/justme-garda-resident-weekly.webp",
    priority: 84
  },
  {
    id: "justme-garda-saturday-saturday-garda-vip-gala",
    clubSlug: "justme-garda",
    clubName: "JustMe Garda Lake",
    day: "saturday",
    dayOfWeek: 6,
    eventSlug: "saturday-garda-vip-gala",
    name: "Saturday Lake Garda Flagship Party & VIP Privé",
    genres: ["Dinner Show", "House", "Commercial"],
    target: "21+, Lake Garda, Desenzano, Sirmione & International VIP Guests",
    description: {
      en: "Saturday program at JustMe Garda Lake (Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)): Saturday Lake Garda Flagship Party & VIP Privé. Official Lake Garda (Lonato / Desenzano, BS) guest list, dinner reservations, and VIP table concierge via WhatsApp +39 351 912 7047.",
      it: "Appuntamento del sabato da JustMe Garda Lake (Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)): Saturday Lake Garda Flagship Party & VIP Privé. Prenotazione tavoli VIP, cena e accrediti ufficiali a Lago di Garda (Lonato / Desenzano, BS) tramite Concierge WhatsApp +39 351 912 7047."
    },
    pricing: {"aperitif": "Aperitivo & Dinner upon request", "club": "From €20", "tables": "Lake Garda VIP Privé from €350"},
    dressCode: {
      en: "Strictly Elegant Lake Garda Glamour.",
      it: "Rigorosamente Elegante Glamour Lago di Garda."
    },
    faqs: defaultFaqs("JustMe Garda Lake", "Via Lavagnone 13, Lonato del Garda (Desenzano / Lake Garda, BS)", "21+", "Strictly Elegant Lake Garda Glamour.", "Dinner Show, House, Commercial"),
    image: "/images/events/weekly-posters/justme-garda-resident-weekly.webp",
    priority: 84
  }
];
