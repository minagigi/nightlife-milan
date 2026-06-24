import 'server-only';

export type EventData = {
  day: string;
  title: string;
  description: string;
  type: string;
};

export interface Dictionary {
  description: string;
  labels: {
    address: string;
    targetAge: string;
    dressCode: string;
    music: string;
    services: string;
    weeklyProgram: string;
    bookWa: string;
    vipAccess: string;
    back: string;
  };
  events: EventData[];
}

const dictionaries: Record<'en' | 'it', Dictionary> = {
  en: {
    description: "In the heart of Parco Sempione, JUSTME is the reference point for a complete experience: from aperitivo to dinner, from disco nights to exclusive VIP areas.",
    labels: {
      address: "Address",
      targetAge: "Target Age",
      dressCode: "Dress Code",
      music: "Music",
      services: "Services",
      weeklyProgram: "Weekly Program",
      bookWa: "Book via WhatsApp",
      vipAccess: "Get VIP Access",
      back: "Back to Venues"
    },
    events: [
      { day: "MON", title: "Monday Night", description: "House & Hits", type: "Day + Night" },
      { day: "TUE", title: "University Tuesday", description: "Drinks & Fun", type: "Day + Night" },
      { day: "WED", title: "Wednesday / Absolutely", description: "Midweek vibes + Fortune teller", type: "Day + Night" },
      { day: "THU", title: "VIZIATISSIMA", description: "Singing dinner + Live show", type: "Day + Night" },
      { day: "FRI", title: "Friday Night", description: "International Guests", type: "Day + Night" },
      { day: "SAT", title: "Saturday Night", description: "Themed Parties", type: "Day + Night" },
      { day: "SUN", title: "Uptown Nights", description: "Hip-Hop Sunday", type: "Night" }
    ]
  },
  it: {
    description: "Nel cuore di Parco Sempione, JUSTME è il punto di riferimento per un'esperienza completa: dall'aperitivo alla cena, dalla serata disco al privé esclusivo.",
    labels: {
      address: "Indirizzo",
      targetAge: "Target",
      dressCode: "Dress Code",
      music: "Musica",
      services: "Servizi",
      weeklyProgram: "Programmazione Settimanale",
      bookWa: "Prenota via WhatsApp",
      vipAccess: "Ottieni Accesso VIP",
      back: "Torna ai Locali"
    },
    events: [
      { day: "LUN", title: "Monday Night", description: "House & Hits", type: "Day + Night" },
      { day: "MAR", title: "Martedì Universitario", description: "Drink e Divertimento", type: "Day + Night" },
      { day: "MER", title: "Wednesday / Absolutely", description: "Vibrazioni infrasettimanali + Cartomante", type: "Day + Night" },
      { day: "GIO", title: "VIZIATISSIMA", description: "Cena Cantata + Show Live", type: "Day + Night" },
      { day: "VEN", title: "Friday Night", description: "Guest Internazionali", type: "Day + Night" },
      { day: "SAB", title: "Saturday Night", description: "Party a tema", type: "Day + Night" },
      { day: "DOM", title: "Uptown Nights", description: "Domenica Hip-Hop", type: "Night" }
    ]
  }
};

export const getDictionary = async (locale: 'en' | 'it') => dictionaries[locale] ?? dictionaries.en;
