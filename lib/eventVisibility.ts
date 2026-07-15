export const EVENTBRITE_ONLY_CURATED_MARKER_RE = /\bnlm:curated=/i;

const EVENTBRITE_ONLY_CURATED_SLUG_FRAGMENTS = [
  // Italian
  'just-me-milano-questa-settimana',
  'pineta-milano-questa-settimana',
  'aria-club-milano-questa-settimana',
  'aperitivi-a-milano-questa-settimana',
  'discoteche-a-milano-questa-settimana',
  'serate-internazionali-a-milano',
  'serate-universitarie-ed-erasmus-milano',
  'serate-18-a-milano',
  'serate-21-a-milano',
  // English
  'just-me-milano-this-week',
  'pineta-milano-this-week',
  'aria-club-milano-this-week',
  'aperitivo-in-milan-this-week',
  'milan-nightclubs-this-week',
  'international-parties-milan',
  'university-erasmus-parties-milan',
  'milan-18-parties',
  'milan-21-parties',
  // Spanish
  'just-me-milano-esta-semana',
  'pineta-milano-esta-semana',
  'aria-club-milano-esta-semana',
  'aperitivos-en-milan-esta-semana',
  'discotecas-en-milan-esta-semana',
  'fiestas-internacionales-en-milan',
  'fiestas-universitarias-y-erasmus-milan',
  'fiestas-18-en-milan',
  'fiestas-21-en-milan',
  // Portuguese
  'aperitivos-em-milao-esta-semana',
  'discotecas-em-milao-esta-semana',
  'festas-internacionais-em-milao',
  'festas-universitarias-e-erasmus-milao',
  'festas-18-em-milao',
  'festas-21-em-milao',
  // French
  'just-me-milano-cette-semaine',
  'pineta-milano-cette-semaine',
  'aria-club-milano-cette-semaine',
  'aperitivo-a-milan-cette-semaine',
  'discotheques-a-milan-cette-semaine',
  'soirees-internationales-a-milan',
  'soirees-universitaires-et-erasmus-milan',
  'soirees-18-a-milan',
  'soirees-21-a-milan',
  // German
  'just-me-milano-diese-woche',
  'pineta-milano-diese-woche',
  'aria-club-milano-diese-woche',
  'aperitivo-in-mailand-diese-woche',
  'clubs-in-mailand-diese-woche',
  'internationale-partys-in-mailand',
  'studenten-und-erasmus-partys-mailand',
  '18-partys-in-mailand',
  '21-partys-in-mailand',
] as const;

export function isEventbriteOnlyCuratedListing(event: {
  description?: { text?: string; html?: string };
}): boolean {
  const description = `${event.description?.text || ''}\n${event.description?.html || ''}`;
  return EVENTBRITE_ONLY_CURATED_MARKER_RE.test(description);
}

export function isRemovedCuratedSitePath(pathname: string): boolean {
  const slug = pathname.toLowerCase().match(/\/events\/([^/?#]+)/)?.[1];
  return Boolean(
    slug && EVENTBRITE_ONLY_CURATED_SLUG_FRAGMENTS.some((fragment) => slug.includes(fragment)),
  );
}
