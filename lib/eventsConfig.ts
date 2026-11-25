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

export const getWeeklyEventBySlug = (slug: string): WeeklyEvent | undefined => {
  const canon = resolveEventSlugToCanonical(slug);
  return weeklyEvents.find(
    (e) =>
      `${e.clubSlug}-${e.day}-${e.eventSlug}` === canon ||
      `${e.clubSlug}-${e.day}-${e.eventSlug}` === slug ||
      e.id === canon ||
      e.id === slug ||
      e.eventSlug === canon ||
      e.eventSlug === slug
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
    image: '/images/events/october-2026/249182-aa34ab79100b.webp',
    xceedLink: 'https://xceed.me/en/milano/event/university-party-58/249218/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-wednesday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'absolutely',
    name: 'Absolutely',
    genres: ['Deep House', 'Lounge'],
    target: '25+, Professionals, Fashion Industry',
    description: {
      en: 'Midweek magic at Just Me. "Absolutely" brings a unique vibe with deep house music and mystical entertainment including a fortune teller. The perfect blend of a sophisticated dinner and an elegant party.',
      it: 'Magia di metà settimana al Just Me. "Absolutely" porta una vibrazione unica con musica deep house e intrattenimento mistico, inclusa una cartomante. Il mix perfetto tra una cena sofisticata e un party elegante.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Elegant and Fashion-forward.',
      it: 'Elegante e alla moda.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '25+', 'Elegant and Fashion-forward', 'Deep House and Lounge'),
    image: '/images/events/october-2026/249189-e2b7683e02e3.webp',
    xceedLink: 'https://xceed.me/en/milano/event/wednesday-night-225/249169/channel/nightlifemilan-1',
    priority: 100
  },
  {
    id: 'justme-thursday',
    clubSlug: 'justme',
    clubName: 'Just Me Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'viziatissima',
    name: 'VIZIATISSIMA',
    genres: ['Live Music', 'Italian Hits', 'Commercial'],
    target: '25+, Locals, VIPs',
    description: {
      en: 'The famous singing dinner "VIZIATISSIMA" featuring live performances by Benny Camaro. Start with a premium dining experience and seamlessly transition into a high-energy party where everyone sings along to timeless hits.',
      it: 'La famosa cena cantata "VIZIATISSIMA" con esibizioni dal vivo di Benny Camaro. Inizia con un\'esperienza culinaria premium e passa senza interruzioni a una festa ad alta energia dove tutti cantano i successi senza tempo.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant.',
      it: 'Strettamente Elegante.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '25+', 'Strictly Elegant', 'Live Music and Commercial'),
    image: '/images/events/october-2026/249192-8d811d65d7c5.webp',
    xceedLink: 'https://xceed.me/en/milano/event/vida-loca-13/249216/channel/nightlifemilan-1',
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
    image: '/images/events/october-2026/249204-fcb5bf6cc4be.webp',
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
    image: '/images/events/october-2026/249213-e2755e4bf02c.webp',
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
    image: '/images/events/october-2026/249230-f6b0d6c67b51.webp',
    xceedLink: 'https://xceed.me/en/milano/event/tr3ndy-society-thursday-night-7/252514/channel/nightlifemilan-1',
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
    xceedLink: 'https://xceed.me/en/milano/event/friday-night-723/243825/channel/nightlifemilan-1',
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
    xceedLink: 'https://xceed.me/en/milano/event/saturday-night-777/243831/channel/nightlifemilan-1',
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
  }
];
