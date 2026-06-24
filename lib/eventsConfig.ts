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
  return weeklyEvents.find(e => `${e.clubSlug}-${e.day}-${e.eventSlug}` === slug);
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
    image: '/images/events/xceed-justme-mfw-monday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/monday-night-255/213618/channel/nightlifemilan-1',
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
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €250 to €3,000' },
    dressCode: {
      en: 'Smart Casual. Elegant shirt for men. No sportswear.',
      it: 'Smart Casual. Camicia elegante per gli uomini. No abbigliamento sportivo.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '18+', 'Smart Casual', 'Commercial and Reggaeton'),
    image: '/images/events/xceed-justme-mfw-university-party.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/mfw-university-party-1/220716/channel/nightlifemilan-1',
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
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Elegant and Fashion-forward.',
      it: 'Elegante e alla moda.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '25+', 'Elegant and Fashion-forward', 'Deep House and Lounge'),
    image: '/images/events/xceed-justme-wednesday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/wednesday-night-211/220729/channel/nightlifemilan-1',
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
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €320 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant.',
      it: 'Strettamente Elegante.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '25+', 'Strictly Elegant', 'Live Music and Commercial'),
    image: '/images/venues/just-me-milano/just-me-milano-interior-04.webp',
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
    pricing: { aperitif: 'From €20', club: 'From €30', tables: 'From €500 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant. Dress to impress.',
      it: 'Strettamente Elegante. Vestiti per impressionare.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant', 'House and Electronic'),
    image: '/images/events/xceed-justme-friday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/friday-night-669/220759/channel/nightlifemilan-1',
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
    pricing: { aperitif: 'From €20', club: 'From €30', tables: 'From €500 to €5,000' },
    dressCode: {
      en: 'Strictly Elegant. Dress to impress.',
      it: 'Strettamente Elegante. Vestiti per impressionare.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Strictly Elegant', 'Commercial and House'),
    image: '/images/events/xceed-justme-saturday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/saturday-night-686/220770/channel/nightlifemilan-1',
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
    pricing: { aperitif: 'From €20', club: 'From €20', tables: 'From €320 to €3,000' },
    dressCode: {
      en: 'Urban Chic. Stylish streetwear is allowed, but keep it premium.',
      it: 'Urban Chic. Lo streetwear elegante è consentito, ma mantienilo premium.'
    },
    faqs: defaultFaqs('Just Me Milano', 'Via Luigi Camoens 2, Parco Sempione, Milan', '21+', 'Urban Chic', 'Hip-Hop and R&B'),
    image: '/images/events/xceed-justme-sunday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/sunday-night-215/220786/channel/nightlifemilan-1',
    priority: 100
  },

  // --- PINETA CLUB (Fri-Sat) ---
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
    pricing: { aperitif: 'From €20', club: 'From €25', tables: 'From €300 to €2,000' },
    dressCode: {
      en: 'Elegant and Chic. Collared shirts for men.',
      it: 'Elegante e Chic. Camicia con colletto per gli uomini.'
    },
    faqs: defaultFaqs('Pineta Club', 'Via Privata Giovanni Ventura 15, Milan', '25+', 'Elegant and Chic', 'Live Music and Commercial'),
    image: '/images/events/xceed-pineta-milan8mile.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/milan8mile-3/231334/channel/nightlifemilan-1',
    priority: 90
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
    pricing: { aperitif: 'From €20', club: 'From €30', tables: 'From €300 to €2,000' },
    dressCode: {
      en: 'Strictly Elegant.',
      it: 'Strettamente Elegante.'
    },
    faqs: defaultFaqs('Pineta Club', 'Via Privata Giovanni Ventura 15, Milan', '25+', 'Strictly Elegant', 'Live Music and Commercial'),
    image: '/images/events/xceed-pineta-bocconi.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/bocconi-welcome-week-welcome-to-pineta/234651/channel/nightlifemilan-1',
    priority: 90
  },

  // --- ARIA CLUB MILANO (Thu-Sat) ---
  {
    id: 'aria-thursday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'thursday-night',
    name: 'Thursday Night',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, International, Fun crowd',
    description: {
      en: 'Aria Club Milano opens the weekend early with the Thursday Night: a buffet aperitivo from 7:30 PM, premium cocktails, and a full party from 10:30 PM. New concept club in the heart of San Siro — expect the hits you know, the energy you crave.',
      it: 'Aria Club Milano apre il weekend in anticipo con il Thursday Night: aperitivo a buffet dalle 19:30, cocktail premium e party dalle 22:30. Nuovo concept club nel cuore di San Siro — i tuoi brani preferiti, l\'energia che cerchi.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €200 to €1,500' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/xceed-aria-summer-party.png',
    xceedLink: 'https://xceed.me/en/milano/event/thursday-night-362/229397/channel/nightlifemilan-1',
    priority: 60
  },
  {
    id: 'aria-friday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'friday-night',
    name: 'Friday Night',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, International, Party crowd',
    description: {
      en: 'The Friday Night at Aria Club Milano is one of the most vibrant parties in San Siro. Buffet aperitivo from 7:30 PM, optional served dinner, then a full dancefloor until late. Dance Floor Tables, Privé Aria and Privé DJ tables available.',
      it: 'Il Friday Night all\'Aria Club Milano è una delle serate più vivaci di San Siro. Aperitivo a buffet dalle 19:30, cena servita su prenotazione, poi dancefloor aperto fino a tardi. Disponibili Dance Floor Table, Privé Aria e Privé DJ.'
    },
    pricing: { aperitif: 'From €15', club: 'From €15', tables: 'From €200 to €1,500' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/xceed-aria-friday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/friday-night-697/229412/channel/nightlifemilan-1',
    priority: 60
  },
  {
    id: 'aria-saturday',
    clubSlug: 'aria',
    clubName: 'Aria Club Milano',
    day: 'saturday',
    dayOfWeek: 6,
    eventSlug: 'saturday-night',
    name: 'Saturday Night',
    genres: ['Hits', 'EDM', 'Dance'],
    target: '21+, Mixed, Party crowd',
    description: {
      en: 'Saturday Night at Aria Club Milano is the weekend highlight for the San Siro neighbourhood. A full evening starting with a buffet aperitivo at 7:30 PM and ending well past midnight. Dance Floor Tables and Privé areas available for groups.',
      it: 'Il Saturday Night all\'Aria Club Milano è il punto di riferimento del weekend per il quartiere San Siro. Una serata completa che parte dall\'aperitivo a buffet alle 19:30 e si conclude a notte fonda. Dance Floor Table e aree Privé disponibili per i gruppi.'
    },
    pricing: { aperitif: 'From €15', club: 'From €20', tables: 'From €250 to €2,000' },
    dressCode: { en: 'Smart Casual. No sportswear.', it: 'Smart Casual. No abbigliamento sportivo.' },
    faqs: defaultFaqs('Aria Club Milano', 'Piazzale dello Sport 14, Milan', '21+', 'Smart Casual', 'Hits, EDM and Dance'),
    image: '/images/events/xceed-aria-saturday-night.jpg',
    xceedLink: 'https://xceed.me/en/milano/event/saturday-night-717/229432/channel/nightlifemilan-1',
    priority: 60
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp',
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp',
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp',
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-04.webp',
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Deep House'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-05.webp',
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
    faqs: defaultFaqs('Voya Rooftop', 'Via Mike Bongiorno 13, Milan', '25+', 'Smart Casual', 'Lounge and Chillout'),
    image: '/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-06.webp',
    priority: 80
  },

  // --- 55 MILANO (Fri-Sun) ---
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
    image: '/images/pineta-milano.webp',
    priority: 70
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
    image: '/images/pineta-milano.webp',
    priority: 70
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
    image: '/images/milan-club-crowd-dancefloor-night.webp',
    priority: 70
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
    image: '/images/play-club-milano.webp',
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
    image: '/images/milan-club-crowd-dancefloor-night.webp',
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
    image: '/images/milan-nightclub-dancefloor-vip.webp',
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
    image: '/images/play-club-milano.webp',
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
    image: '/images/play-club-milano.webp',
    priority: 50
  },

  // --- REPVBLIC ---
  {
    id: 'repvblic-wednesday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'wednesday',
    dayOfWeek: 3,
    eventSlug: 'home',
    name: 'Home',
    genres: ['Commercial', 'Reggaeton'],
    target: '18+, University Students, Energetic',
    description: {
      en: 'Make yourself at "Home" every Wednesday at Repvblic. The ultimate midweek student party featuring a mix of Commercial and Reggaeton hits in a vibrant, welcoming atmosphere.',
      it: 'Sentiti a "Home" ogni mercoledì al Repvblic. La festa studentesca di metà settimana per eccellenza con un mix di successi Commerciali e Reggaeton in un\'atmosfera vibrante e accogliente.'
    },
    pricing: { club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Casual Chic.',
      it: 'Casual Chic.'
    },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '18+', 'Casual Chic', 'Commercial and Reggaeton'),
    image: '/images/milan-nightclub-dancefloor-vip.webp',
    priority: 40
  },
  {
    id: 'repvblic-thursday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'thursday',
    dayOfWeek: 4,
    eventSlug: 'sbraake',
    name: 'Sbraake',
    genres: ['Hip-Hop', 'Trap'],
    target: '18+, University Students, Energetic',
    description: {
      en: 'Get ready for "Sbraake" on Thursdays at Repvblic. A high-energy night dedicated to the freshest Hip-Hop and Trap sounds. Gather your crew and hit the dancefloor.',
      it: 'Preparati per "Sbraake" il giovedì al Repvblic. Una serata ad alta energia dedicata ai suoni Hip-Hop e Trap più freschi. Raduna la tua crew e scendi in pista.'
    },
    pricing: { club: 'From €15', tables: 'From €200' },
    dressCode: {
      en: 'Urban Casual.',
      it: 'Urban Casual.'
    },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '18+', 'Urban Casual', 'Hip-Hop and Trap'),
    image: '/images/play-club-milano.webp',
    priority: 40
  },
  {
    id: 'repvblic-friday',
    clubSlug: 'repvblic',
    clubName: 'Repvblic',
    day: 'friday',
    dayOfWeek: 5,
    eventSlug: 'dirty-monday-edition',
    name: 'Dirty Monday Edition',
    genres: ['Indie', 'Rock', 'Electronic'],
    target: '21+, Alternative, Energetic',
    description: {
      en: 'The legendary Dirty Monday crew takes over Repvblic for a special Friday edition. Expect an eclectic mix of Indie, Rock, and Electronic music, a wild crowd, and an unforgettable party vibe.',
      it: 'La leggendaria crew di Dirty Monday conquista il Repvblic per un\'edizione speciale del venerdì. Aspettati un mix eclettico di musica Indie, Rock ed Elettronica, un pubblico scatenato e un\'atmosfera di festa indimenticabile.'
    },
    pricing: { club: 'From €20', tables: 'From €250' },
    dressCode: {
      en: 'Alternative Chic. Express yourself.',
      it: 'Alternative Chic. Esprimi te stesso.'
    },
    faqs: defaultFaqs('Repvblic', 'Piazza della Repubblica 12, Milan', '21+', 'Alternative Chic', 'Indie, Rock, and Electronic'),
    image: '/images/milan-club-crowd-dancefloor-night.webp',
    priority: 40
  }
];
