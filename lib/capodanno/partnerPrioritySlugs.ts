/**
 * Ordered list of Nightlife Milan's Capodanno 2027 partner venues, matching Axel's
 * capodannodimilano.com lineup order (plus JustMe Garda Lake and Il Gattopardo).
 * Keep distinct from PARTNER_CAPODANNO_SLUGS (which governs payment/fee exemption).
 */
export const CAPODANNO_PARTNER_PRIORITY_SLUGS: readonly string[] = [
  'capodanno-justme-milano-torre-branca',
  'capodanno-pineta-milano',
  'capodanno-voya-rooftop-milano',
  'capodanno-justme-garda-lake',
  'capodanno-repvblic-milano',
  'capodanno-bischeri-milano',
  'capodanno-gate-milano',
  'capodanno-pelledoca-milano',
  'capodanno-magazzini-generali-milano',
  'capodanno-bobino-milano',
  'capodanno-the-club-milano',
  'capodanno-aria-club-milano',
  'capodanno-55-milano',
  'capodanno-tocqueville-13-milano',
  'capodanno-hollywood-milano',
  'capodanno-11clubroom-milano',
  'capodanno-tom-the-ordinary-market-milano',
  'capodanno-il-gattopardo-milano',
];

export const CAPODANNO_PARTNER_PRIORITY_RANK: Record<string, number> = Object.fromEntries(
  CAPODANNO_PARTNER_PRIORITY_SLUGS.map((slug, index) => [slug, index + 1]),
);
