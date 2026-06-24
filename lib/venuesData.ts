import { Venue, MilanZone, VenueCategory } from './types';

export const venuesData: Venue[] = [
  {
    id: "v-justme",
    slugs: { en: "just-me-milano", it: "just-me-milano" },
    address: {
      streetAddress: "Viale Luigi Camoens, 2",
      addressLocality: "Milano",
      postalCode: "20121",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4746, longitude: 9.1729 },
    category: VenueCategory.CLUB,
    zone: MilanZone.SEMPIONE,
    sameAs: ["https://instagram.com/justmemilano"],
    localizedContent: {
      name: { en: "Just Me", it: "Just Me" },
      description: {
        en: "Designed by Roberto Cavalli, Just Me sits beneath the Torre Branca in Sempione. Fashion crowd, house and commercial sets, velvet and steel. The door reads the room — arrive in a small, sharp group.",
        it: "Firmato Roberto Cavalli, il Just Me è sotto la Torre Branca, in Sempione. Crowd fashion, house e commerciale, velluto e acciaio. La selezione legge la sala — presentati in un gruppo piccolo e curato."
      },
      dressCode: { en: "Strictly Elegant — No sneakers, no casual, fashion-forward only", it: "Rigorosamente Elegante — No sneakers, no casual, solo moda" },
      altTextImg: { en: "Just Me Milan nightclub Roberto Cavalli design Torre Branca Sempione VIP tables", it: "Just Me Milano discoteca design Roberto Cavalli Torre Branca Sempione tavoli VIP" },
      insiderTip: { en: "Ask for Privé Branca: you dance directly under the tower's lit steel pillars. It fills first during Fashion Week.", it: "Chiedi il Privé Branca: balli sotto i pilastri d'acciaio illuminati della torre. Si riempie per primo durante la Fashion Week." }
    },
    image: "/images/just-me-milano.webp",
    gallery: [
      "/images/venues/just-me-milano/just-me-milano-interior-01.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-02.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-03.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-04.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-05.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-06.webp",
      "/images/venues/just-me-milano/just-me-milano-interior-07.webp",
    ],
    isManaged: true,
    isPriority: true,
    isFeatured: true,
    priorityScore: 100,
    ageRange: "25-45",
    priceRange: "$$$",
    tags: ["Luxury", "Fashion", "House"]
  },
  {
    id: "v-voya",
    slugs: { en: "voya-rooftop-milan", it: "voya-rooftop-milan" },
    address: {
      streetAddress: "Via Achille Papa, 30",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4910, longitude: 9.1870 },
    category: VenueCategory.ROOFTOP,
    zone: MilanZone.ISOLA,
    sameAs: ["https://instagram.com/voyarooftop", "https://voyarooftop.com"],
    localizedContent: {
      name: { en: "Voya Rooftop", it: "Voya Rooftop" },
      description: {
        en: "Twentieth floor, Isola. The Milan skyline runs the length of the glass while the bar pours till late. Aperitivo turns into a DJ set without anyone noticing.",
        it: "Ventesimo piano, Isola. Lo skyline di Milano corre lungo le vetrate mentre il bar versa fino a tardi. L'aperitivo diventa DJ set senza che te ne accorga."
      },
      dressCode: { en: "Smart Elegant — No sportswear, no shorts", it: "Smart Elegant — No abbigliamento sportivo" },
      altTextImg: { en: "Voya Rooftop Milan skyline view from 20th floor at night", it: "Vista skyline di Milano dal Voya Rooftop al 20° piano" },
      insiderTip: { en: "Go for sunset, stay for the night. Window tables go first — book a day ahead.", it: "Vai al tramonto, resta per la notte. I tavoli sulla vetrata vanno via subito — prenota con un giorno di anticipo." }
    },
    image: "/images/voya-rooftop-milan.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: true,
    priorityScore: 80,
    ageRange: "28-45",
    priceRange: "$$$",
    tags: ["20th Floor", "Skyline View", "Lounge"],
    gallery: [
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-04.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-05.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-06.webp",
      "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-07.webp",
    ]
  },
  {
    id: "v-pineta",
    slugs: { en: "pineta-club-milano", it: "pineta-club-milano" },
    address: {
      streetAddress: "Via Messina, 38",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4812, longitude: 9.1872 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CORSO_COMO,
    sameAs: ["https://instagram.com/pinetamilano"],
    localizedContent: {
      name: { en: "Pineta Club", it: "Pineta Club" },
      description: {
        en: "Corso Como's singing aperitivo. Long shared tables, buffet from 19:30, everyone on their feet by midnight. Reggaeton and commercial, zero pretension.",
        it: "L'aperitivo cantato di Corso Como. Tavoli lunghi condivisi, buffet dalle 19:30, tutti in piedi entro mezzanotte. Reggaeton e commerciale, zero pretese."
      },
      dressCode: { en: "Chic & Fashion — No sportswear, no sneakers", it: "Chic e Fashion — No sportswear, no sneakers" },
      altTextImg: { en: "Pineta Club Milan aperitivo cantato Via Messina 38 Corso Como nightclub", it: "Aperitivo Cantato Pineta Club Milano Via Messina 38 Corso Como" },
      insiderTip: { en: "Come for the buffet at 19:30 to claim a table — by 22:00 it's standing room only.", it: "Arriva al buffet delle 19:30 per prendere il tavolo — alle 22:00 si sta solo in piedi." }
    },
    image: "/images/pineta-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: true,
    priorityScore: 90,
    ageRange: "25-45",
    priceRange: "$$$",
    tags: ["Singing Aperitivo", "Chic", "Commercial"],
    gallery: [
      "/images/venues/pineta-milano/pineta-milano-interior-01.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-02.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-03.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-04.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-05.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-06.webp",
      "/images/venues/pineta-milano/pineta-milano-interior-07.webp",
    ]
  },
  {
    id: "v-playclub",
    slugs: { en: "play-club-milano", it: "play-club-milano" },
    address: {
      streetAddress: "Viale Monte Grappa, 14",
      addressLocality: "Milano",
      postalCode: "20124",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4800, longitude: 9.1895 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CORSO_COMO,
    sameAs: ["https://instagram.com/playclubmilano"],
    localizedContent: {
      name: { en: "Play Club", it: "Play Club" },
      description: {
        en: "Hip-hop, afrobeats, a younger crowd that knows the words. Fashion streetwear, not stiff.",
        it: "Hip-hop, afrobeats, un pubblico giovane che canta ogni parola. Streetwear curato, niente rigidità."
      },
      dressCode: { en: "Urban Chic", it: "Urban Chic" },
      altTextImg: { en: "Play Club Dancefloor", it: "Pista da ballo del Play Club" },
      insiderTip: { en: "Clean fashion sneakers are fine here — leave the gym kit at home.", it: "Le sneakers fashion pulite vanno bene — lascia a casa il completo da palestra." }
    },
    image: "/images/play-club-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "22-35",
    priceRange: "$$",
    tags: ["Urban", "Afrobeats", "Hip-Hop"],
    gallery: [
      "/images/venues/play-club-milano/play-club-milano-interior-01.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-02.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-03.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-04.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-05.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-06.webp",
      "/images/venues/play-club-milano/play-club-milano-interior-07.webp",
    ]
  },
  {
    id: "v-55milano",
    slugs: { en: "55-milano", it: "55-milano" },
    address: {
      streetAddress: "Via Piero della Francesca, 55",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4830, longitude: 9.1670 },
    category: VenueCategory.CLUB,
    zone: MilanZone.SEMPIONE,
    sameAs: ["https://instagram.com/55milano"],
    localizedContent: {
      name: { en: "55 Milano", it: "55 Milano" },
      description: {
        en: "Apericena done properly: pay for the drink, eat until you're done. The room slides from dinner into party without a break.",
        it: "L'apericena fatta bene: paghi il drink e mangi finché vuoi. La sala scivola dalla cena al party senza pause."
      },
      dressCode: { en: "Smart Casual", it: "Smart Casual" },
      altTextImg: { en: "55 Milano Terrace", it: "Terrazza del 55 Milano" },
      insiderTip: { en: "Treat it as dinner, not a snack. Tables near the DJ get loud after 23:00.", it: "Trattalo come una cena, non uno spuntino. I tavoli vicino al DJ si scaldano dopo le 23:00." }
    },
    image: "/images/55-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: true,
    priorityScore: 70,
    ageRange: "25-40",
    priceRange: "$$",
    tags: ["Apericena", "Stage", "Terrace"],
    gallery: [
      "/images/venues/55-milano/55-milano-interior-01.webp",
      "/images/venues/55-milano/55-milano-interior-02.webp",
      "/images/venues/55-milano/55-milano-interior-03.webp",
      "/images/venues/55-milano/55-milano-interior-04.webp",
      "/images/venues/55-milano/55-milano-interior-05.webp",
      "/images/venues/55-milano/55-milano-interior-06.webp",
      "/images/venues/55-milano/55-milano-interior-07.webp",
    ]
  },
  {
    id: "v-repvblic",
    slugs: { en: "repvblic-milano", it: "repvblic-milano" },
    address: {
      streetAddress: "Via Giovanni Fantoli, 9",
      addressLocality: "Milano",
      postalCode: "20138",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4560, longitude: 9.2400 },
    category: VenueCategory.CLUB,
    zone: MilanZone.RIPAMONTI,
    sameAs: ["https://instagram.com/repvblicmilano"],
    localizedContent: {
      name: { en: "Repvblic", it: "Repvblic" },
      description: {
        en: "House and EDM with an underground lean. Dirty Monday is the one locals actually clear their week for.",
        it: "House ed EDM con piega underground. Il Dirty Monday è quello per cui i milanesi liberano davvero la settimana."
      },
      dressCode: { en: "Trendy & Edgy", it: "Trendy e Audace" },
      altTextImg: { en: "Repvblic Club Lights", it: "Luci del Repvblic Club" },
      insiderTip: { en: "Monday is the night, not the weekend. Go late.", it: "La serata è il lunedì, non il weekend. Vai tardi." }
    },
    image: "/images/repvblic-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "25-40",
    priceRange: "$$",
    tags: ["Industrial", "Dirty Monday", "House"],
    gallery: [
      "/images/venues/repvblic-milano/repvblic-milano-interior-01.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-02.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-03.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-04.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-05.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-06.webp",
      "/images/venues/repvblic-milano/repvblic-milano-interior-07.webp",
    ]
  },
  {
    id: "v-11clubroom",
    slugs: { en: "11-clubroom", it: "11-clubroom" },
    address: {
      streetAddress: "Via de Tocqueville, 11",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4815, longitude: 9.1870 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CORSO_COMO,
    sameAs: ["https://instagram.com/11clubroom"],
    localizedContent: {
      name: { en: "11 Clubroom", it: "11 Clubroom" },
      description: {
        en: "Small room, sharp crowd. Low light, marble bar, the kind of night where you know half the floor by 1:00.",
        it: "Sala piccola, crowd selezionato. Luce bassa, bar in marmo, il tipo di notte in cui all'1:00 conosci metà della pista."
      },
      dressCode: { en: "Elegant & Urban", it: "Elegante e Urbano" },
      altTextImg: { en: "11 Clubroom Interior", it: "Interno dell'11 Clubroom" },
      insiderTip: { en: "Intimacy is the draw — a table here goes a long way.", it: "L'intimità è il punto forte — qui un tavolo fa la differenza." }
    },
    image: "/images/11-clubroom-milan.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "22-40",
    priceRange: "$$$",
    tags: ["Corso Como", "Urban", "Elite"],
    gallery: [
      "/images/venues/11-clubroom/11-clubroom-interior-01.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-02.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-03.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-04.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-05.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-06.webp",
      "/images/venues/11-clubroom/11-clubroom-interior-07.webp",
    ]
  },
  {
    id: "v-church81",
    slugs: { en: "church-81", it: "church-81" },
    address: {
      streetAddress: "Via della Chiesa Rossa, 81",
      addressLocality: "Milano",
      postalCode: "20142",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4320, longitude: 9.1750 },
    category: VenueCategory.CLUB,
    zone: MilanZone.NAVIGLI,
    sameAs: ["https://instagram.com/church81milano"],
    localizedContent: {
      name: { en: "Church 81", it: "Church 81" },
      description: {
        en: "Cathedral proportions, club intent. Tall arches, bottle service under the vault, a room built for an entrance.",
        it: "Proporzioni da cattedrale, anima da club. Archi alti, bottle service sotto la volta, una sala fatta per l'ingresso."
      },
      dressCode: { en: "Avant-Garde & Fashion", it: "Avant-Garde e Fashion" },
      altTextImg: { en: "Church 81 Architecture", it: "Architettura del Church 81" },
      insiderTip: { en: "A table under the arches is the seat in the house — ask for it.", it: "Un tavolo sotto gli archi è il posto migliore — chiedilo." }
    },
    image: "/images/church-81-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "25-45",
    priceRange: "$$$",
    tags: ["Deep House", "Fashion", "Unique"],
    gallery: [
      "/images/venues/church-81/church-81-interior-01.webp",
      "/images/venues/church-81/church-81-interior-02.webp",
      "/images/venues/church-81/church-81-interior-03.webp",
      "/images/venues/church-81/church-81-interior-04.webp",
      "/images/venues/church-81/church-81-interior-05.webp",
      "/images/venues/church-81/church-81-interior-06.webp",
      "/images/venues/church-81/church-81-interior-07.webp",
    ]
  },
  {
    id: "v-mibmilano",
    slugs: { en: "mib-milano", it: "mib-milano" },
    address: {
      streetAddress: "Via Gaetano Negri, 10",
      addressLocality: "Milano",
      postalCode: "20123",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4645, longitude: 9.1830 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CENTRO_STORICO,
    sameAs: ["https://instagram.com/mibmilano"],
    localizedContent: {
      name: { en: "MIB Milano", it: "MIB Milano" },
      description: {
        en: "Rooftop aperitivo with a clean view over the city. Brass, marble, the right cocktail as the lights come on.",
        it: "Aperitivo in rooftop con vista pulita sulla città. Ottone, marmo, il cocktail giusto mentre si accendono le luci."
      },
      dressCode: { en: "Business Elegant", it: "Business Elegant" },
      altTextImg: { en: "MIB Milano Dinner Show", it: "Cena Spettacolo al MIB Milano" },
      insiderTip: { en: "Golden hour is the window — get there by 18:30.", it: "L'ora d'oro è la finestra giusta — arriva entro le 18:30." }
    },
    image: "/images/mib-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "25-45",
    priceRange: "$$$",
    tags: ["Business", "Dinner Show", "Elite"],
    gallery: [
      "/images/venues/mib-milano/mib-milano-interior-01.webp",
      "/images/venues/mib-milano/mib-milano-interior-02.webp",
      "/images/venues/mib-milano/mib-milano-interior-03.webp",
      "/images/venues/mib-milano/mib-milano-interior-04.webp",
      "/images/venues/mib-milano/mib-milano-interior-05.webp",
      "/images/venues/mib-milano/mib-milano-interior-06.webp",
      "/images/venues/mib-milano/mib-milano-interior-07.webp",
    ]
  },
  {
    id: "v-gattopardo",
    slugs: { en: "gattopardo-milano", it: "gattopardo-milano" },
    address: {
      streetAddress: "Via Piero della Francesca, 47",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4830, longitude: 9.1680 },
    category: VenueCategory.CLUB,
    zone: MilanZone.SEMPIONE,
    sameAs: ["https://instagram.com/ilgattopardomilano"],
    localizedContent: {
      name: { en: "Gattopardo", it: "Gattopardo" },
      description: {
        en: "A deconsecrated church on Via Piero della Francesca, now Milan's most composed club. Stone arches, warm light, tables under the vault. Chic crowd, real selection at the door.",
        it: "Una chiesa sconsacrata in Via Piero della Francesca, oggi il club più composto di Milano. Archi di pietra, luce calda, tavoli sotto la volta. Crowd chic, selezione vera all'ingresso."
      },
      dressCode: { en: "Strictly Elegant (Collar required for men)", it: "Rigorosamente Elegante (Camicia obbligatoria per gli uomini)" },
      altTextImg: { en: "Gattopardo Chandelier", it: "Lampadario del Gattopardo" },
      insiderTip: { en: "Dress the part — this is the one room where elegance isn't optional.", it: "Vestiti all'altezza — è l'unica sala dove l'eleganza non è opzionale." }
    },
    image: "/images/gattopardo-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "25-50",
    priceRange: "$$$",
    tags: ["Church Club", "Elite", "Classic"],
    gallery: [
      "/images/venues/gattopardo/gattopardo-interior-01.webp",
      "/images/venues/gattopardo/gattopardo-interior-02.webp",
      "/images/venues/gattopardo/gattopardo-interior-03.webp",
      "/images/venues/gattopardo/gattopardo-interior-04.webp",
      "/images/venues/gattopardo/gattopardo-interior-05.webp",
      "/images/venues/gattopardo/gattopardo-interior-06.webp",
      "/images/venues/gattopardo/gattopardo-interior-07.webp",
    ]
  },
  {
    id: "v-terrazza21",
    slugs: { en: "terrazza-21", it: "terrazza-21" },
    address: {
      streetAddress: "Piazza del Duomo, 21",
      addressLocality: "Milano",
      postalCode: "20121",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4642, longitude: 9.1900 },
    category: VenueCategory.LOUNGE_BAR,
    zone: MilanZone.CENTRO_STORICO,
    sameAs: ["https://instagram.com/terrazzaduomo21"],
    localizedContent: {
      name: { en: "Terrazza 21", it: "Terrazza 21" },
      description: {
        en: "A rooftop terrace facing the Duomo spires. Cocktails at eye level with the cathedral, then the night carries on inside.",
        it: "Una terrazza affacciata sulle guglie del Duomo. Cocktail all'altezza della cattedrale, poi la notte continua dentro."
      },
      dressCode: { en: "Smart Casual", it: "Smart Casual" },
      altTextImg: { en: "Terrazza 21 Duomo View", it: "Vista Duomo dalla Terrazza 21" },
      insiderTip: { en: "Come before dark for the Duomo light, stay for the after.", it: "Arriva prima del buio per la luce sul Duomo, resta per il dopo." }
    },
    image: "/images/terrazza-duomo-21.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "25-50",
    priceRange: "$$$",
    tags: ["Duomo View", "Lounge", "Aperitivo"],
    gallery: [
      "/images/venues/terrazza-21/terrazza-21-interior-01.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-02.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-03.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-04.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-05.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-06.webp",
      "/images/venues/terrazza-21/terrazza-21-interior-07.webp",
    ]
  },
  {
    id: "v-magazzini",
    slugs: { en: "magazzini-generali-milano", it: "magazzini-generali-milano" },
    address: {
      streetAddress: "Via Pietrasanta, 16",
      addressLocality: "Milano",
      postalCode: "20141",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4468, longitude: 9.1990 },
    category: VenueCategory.CLUB,
    zone: MilanZone.NAVIGLI,
    sameAs: ["https://instagram.com/magazzinigenerali"],
    localizedContent: {
      name: { en: "Magazzini Generali", it: "Magazzini Generali" },
      description: {
        en: "A historic freight warehouse, two floors, two moods: live music below, techno above. One of the few rooms in Milan with real history in the walls.",
        it: "Un magazzino merci storico, due piani, due anime: live music sotto, techno sopra. Una delle poche sale di Milano con storia vera nei muri."
      },
      dressCode: { en: "Dark & Edgy", it: "Scuro ed Edgy" },
      altTextImg: { en: "Magazzini Generali Club Interior", it: "Interno del Magazzini Generali" },
      insiderTip: { en: "Check which floor your night is on before you go — they program independently.", it: "Controlla su quale piano è la tua serata prima di uscire — i due piani programmano in modo indipendente." }
    },
    image: "/images/magazzini-generali-milano.webp",
    isPriority: false,
    isFeatured: false,
    priorityScore: 30,
    ageRange: "20-40",
    priceRange: "$$",
    tags: ["Techno", "Underground", "Warehouse"],
    gallery: [
      "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-05.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-06.webp",
      "/images/venues/magazzini-generali/magazzini-generali-interior-07.webp",
    ]
  },
  {
    id: "v-armani-prive",
    slugs: { en: "armani-prive-milano", it: "armani-prive-milano" },
    address: {
      streetAddress: "Via Pisoni, 1",
      addressLocality: "Milano",
      postalCode: "20121",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4705, longitude: 9.1952 },
    category: VenueCategory.CLUB,
    zone: MilanZone.BRERA,
    sameAs: ["https://instagram.com/armaniprive"],
    localizedContent: {
      name: { en: "Armani Privé", it: "Armani Privé" },
      description: {
        en: "In the fashion district on Via Gastone Pisoni. Spare, dark, exact. The most selective door in Milan and the crowd to match.",
        it: "Nel quadrilatero della moda, in Via Gastone Pisoni. Essenziale, scuro, preciso. La porta più selettiva di Milano e un pubblico all'altezza."
      },
      dressCode: { en: "Strictly Elegant & Fashion-Forward", it: "Rigorosamente Elegante e Fashion" },
      altTextImg: { en: "Armani Privé Club Interior", it: "Interno dell'Armani Privé" },
      insiderTip: { en: "Black tie reads better than logos here. Tables are the only way in on big nights.", it: "Qui il black tie funziona meglio dei loghi. Nelle grandi serate il tavolo è l'unico modo per entrare." }
    },
    image: "/images/armani-prive-milano.webp",
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 35,
    ageRange: "25-50",
    priceRange: "$$$$",
    tags: ["Luxury", "Fashion", "Exclusive"],
    gallery: [
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-02.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-03.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-05.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-06.webp",
      "/images/venues/armani-prive-milano/armani-prive-milano-interior-07.webp",
    ]
  },
  {
    id: "v-volt",
    slugs: { en: "volt-club-milano", it: "volt-club-milano" },
    address: {
      streetAddress: "Via Filippo Turati, 30",
      addressLocality: "Milano",
      postalCode: "20121",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4750, longitude: 9.2020 },
    category: VenueCategory.CLUB,
    zone: MilanZone.PORTA_VENEZIA,
    sameAs: ["https://instagram.com/voltmilano"],
    localizedContent: {
      name: { en: "Volt", it: "Volt" },
      description: {
        en: "Underground techno, no posing. Concrete, low light, a sound system built for the floor. Berlin energy on a Milan night.",
        it: "Techno underground, niente posa. Cemento, luce bassa, un impianto pensato per la pista. Energia berlinese in una notte milanese."
      },
      dressCode: { en: "All Black Preferred", it: "Preferibilmente Total Black" },
      altTextImg: { en: "Volt Club Dancefloor", it: "Pista da ballo del Volt" },
      insiderTip: { en: "All black, comfortable shoes. The night peaks well after 2:00.", it: "Total black, scarpe comode. La notte esplode ben dopo le 2:00." }
    },
    image: "/images/volt-club-milano.webp",
    isPriority: false,
    isFeatured: false,
    priorityScore: 30,
    ageRange: "22-40",
    priceRange: "$$$",
    tags: ["Techno", "Minimalist", "Electronic"],
    gallery: [
      "/images/venues/volt-club-milano/volt-club-milano-interior-01.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-02.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-03.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-04.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-05.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-06.webp",
      "/images/venues/volt-club-milano/volt-club-milano-interior-07.webp",
    ]
  },
  {
    id: "v-hollywood",
    slugs: { en: "hollywood-club-milano", it: "hollywood-club-milano" },
    address: {
      streetAddress: "Corso Como, 15",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4815, longitude: 9.1855 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CORSO_COMO,
    sameAs: ["https://instagram.com/hollywoodmilano"],
    localizedContent: {
      name: { en: "Hollywood", it: "Hollywood" },
      description: {
        en: "A Corso Como institution that has outlasted every trend. Glamour, gilt, and a crowd that spans generations.",
        it: "Un'istituzione di Corso Como che è sopravvissuta a ogni moda. Glamour, dorature e un pubblico che attraversa le generazioni."
      },
      dressCode: { en: "Glamour & Trendy", it: "Glamour e Trendy" },
      altTextImg: { en: "Hollywood Club Milan", it: "Club Hollywood Milano" },
      insiderTip: { en: "It's a classic for a reason — dress sharp and lean into it.", it: "È un classico per un motivo — vestiti bene e assecondalo." }
    },
    image: "/images/hollywood-milano.webp",
    isPriority: false,
    isFeatured: false,
    priorityScore: 30,
    ageRange: "22-40",
    priceRange: "$$$",
    tags: ["Iconic", "Commercial", "Glamour"],
    gallery: [
      "/images/venues/hollywood/hollywood-interior-01.webp",
      "/images/venues/hollywood/hollywood-interior-02.webp",
      "/images/venues/hollywood/hollywood-interior-03.webp",
      "/images/venues/hollywood/hollywood-interior-04.webp",
      "/images/venues/hollywood/hollywood-interior-05.webp",
      "/images/venues/hollywood/hollywood-interior-06.webp",
      "/images/venues/hollywood/hollywood-interior-07.webp",
    ]
  },
  {
    id: "v-apollo",
    slugs: { en: "apollo-club-milano", it: "apollo-club-milano" },
    address: {
      streetAddress: "Via Giosue Borsi, 9",
      addressLocality: "Milano",
      postalCode: "20143",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4508, longitude: 9.1878 },
    category: VenueCategory.CLUB,
    zone: MilanZone.NAVIGLI,
    sameAs: ["https://instagram.com/apollomilano"],
    localizedContent: {
      name: { en: "Apollo", it: "Apollo" },
      description: {
        en: "Navigli, on Via Giosuè Borsi. A retro-design cocktail bar that turns into a club. Indie and house, low ceilings, real bartending.",
        it: "Navigli, in Via Giosuè Borsi. Un cocktail bar dal design retrò che si trasforma in club. Indie e house, soffitti bassi, miscelazione vera."
      },
      dressCode: { en: "Alternative & Eclectic", it: "Alternativo ed Eclettico" },
      altTextImg: { en: "Apollo Club Milan", it: "Club Apollo Milano" },
      insiderTip: { en: "Start at the bar before the floor fills — the cocktails are the point.", it: "Inizia al bancone prima che si riempia la pista — i cocktail sono il punto." }
    },
    image: "/images/apollo-club-milano.webp",
    isPriority: false,
    isFeatured: false,
    priorityScore: 25,
    ageRange: "20-35",
    priceRange: "$$",
    tags: ["Indie", "Alternative", "Retro"],
    gallery: [
      "/images/venues/apollo-milano/apollo-milano-interior-01.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-02.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-03.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-04.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-05.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-06.webp",
      "/images/venues/apollo-milano/apollo-milano-interior-07.webp",
    ]
  },
  {
    id: "v-ceresio-7",
    slugs: { en: "ceresio-7-milano", it: "ceresio-7-milano" },
    address: {
      streetAddress: "Via Ceresio, 7",
      addressLocality: "Milano",
      postalCode: "20154",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4838, longitude: 9.1775 },
    category: VenueCategory.ROOFTOP,
    zone: MilanZone.ISOLA,
    sameAs: ["https://instagram.com/ceresio7"],
    localizedContent: {
      name: { en: "Ceresio 7", it: "Ceresio 7" },
      description: {
        en: "Dsquared2's rooftop on Via Ceresio. Two pools, two bars, the skyline at dusk. Aperitivo with the city at your feet.",
        it: "Il rooftop di Dsquared2 in Via Ceresio. Due piscine, due bar, lo skyline all'imbrunire. Aperitivo con la città ai piedi."
      },
      dressCode: { en: "Smart Elegant", it: "Smart Elegant" },
      altTextImg: { en: "Ceresio 7 Rooftop Pool", it: "Piscina sul Tetto del Ceresio 7" },
      insiderTip: { en: "Sunset by the pool bar is the move. Reserve — it's tight in summer.", it: "Il tramonto al pool bar è la mossa giusta. Prenota — d'estate è pieno." }
    },
    image: "/images/ceresio-7-milano.webp",
    isManaged: false,
    isPriority: false,
    isFeatured: false,
    priorityScore: 35,
    ageRange: "25-50",
    priceRange: "$$$",
    tags: ["Rooftop", "Pool", "Aperitivo"],
    gallery: [
      "/images/venues/ceresio-7/ceresio-7-interior-01.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-02.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-03.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-04.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-05.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-06.webp",
      "/images/venues/ceresio-7/ceresio-7-interior-07.webp",
    ]
  },
  {
    id: "v-theclub",
    slugs: { en: "the-club-milano", it: "the-club-milano" },
    address: {
      streetAddress: "Corso Garibaldi, 97",
      addressLocality: "Milano",
      postalCode: "20121",
      addressCountry: "IT"
    },
    coordinates: { latitude: 45.4760, longitude: 9.1840 },
    category: VenueCategory.CLUB,
    zone: MilanZone.BRERA,
    sameAs: ["https://instagram.com/theclubmilano"],
    localizedContent: {
      name: { en: "The Club", it: "The Club" },
      description: {
        en: "High-energy, commercial, made for groups. Big sound, big tables, a floor that doesn't sit down.",
        it: "Alta energia, commerciale, fatto per i gruppi. Sound grosso, tavoli grossi, una pista che non si siede mai."
      },
      dressCode: { en: "Trendy & Clubwear", it: "Trendy e Clubwear" },
      altTextImg: { en: "The Club Dancefloor", it: "Pista da ballo del The Club" },
      insiderTip: { en: "Best with a table and six friends. Lone arrivals wait at the door.", it: "Dà il meglio con un tavolo e sei amici. Chi arriva da solo aspetta alla porta." }
    },
    image: "/images/the-club-milano.webp",
    isManaged: true,
    isPriority: true,
    isFeatured: false,
    priorityScore: 40,
    ageRange: "18-35",
    priceRange: "$$",
    tags: ["Iconic", "Commercial", "Brera"],
    gallery: [
      "/images/venues/the-club-milano/the-club-milano-interior-01.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-02.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-03.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-04.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-05.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-06.webp",
      "/images/venues/the-club-milano/the-club-milano-interior-07.webp",
    ]
  }
];
