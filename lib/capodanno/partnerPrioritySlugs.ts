/**
 * Canonical Capodanno 2027 display order across Nightlife Milan:
 *   1..13  -> CAPODANNO_HEAD_13_SLUGS (exact head 13 venues)
 *   14..20 -> CAPODANNO_REMAINING_PARTNER_SLUGS (remaining partner clubs)
 *   21..   -> CAPODANNO_NON_PARTNER_PRIORITY_SLUGS + remaining open events
 *   N-1    -> capodanno-ortodosso-justme-milano (rank 9998, penultimate)
 *   N      -> capodanno-justme-garda-lake (rank 9999, last; -1 override only on lombardia)
 *
 * Keep strictly distinct from PARTNER_CAPODANNO_SLUGS (which governs the 10 fee-exempt venues).
 */
export const CAPODANNO_HEAD_13_SLUGS: readonly string[] = [
  'capodanno-justme-milano-torre-branca',
  'capodanno-pineta-milano',
  'capodanno-voya-rooftop-milano',
  'capodanno-repvblic-milano',
  'capodanno-55-milano',
  'capodanno-carlsberg-ol-milano',
  'capodanno-magazzini-generali-milano',
  'capodanno-bobino-milano',
  'capodanno-the-club-milano',
  'capodanno-tocqueville-13-milano',
  'capodanno-tom-the-ordinary-market-milano',
  'capodanno-mib-milano-piazza-affari',
  'capodanno-dazi-milano-arco-della-pace',
];

export const CAPODANNO_REMAINING_PARTNER_SLUGS: readonly string[] = [
  'capodanno-bischeri-milano',
  'capodanno-gate-milano',
  'capodanno-pelledoca-milano',
  'capodanno-aria-club-milano',
  'capodanno-hollywood-milano',
  'capodanno-11clubroom-milano',
  'capodanno-il-gattopardo-milano',
];

export const CAPODANNO_TAIL_2_SLUGS: readonly string[] = [
  'capodanno-ortodosso-justme-milano',
  'capodanno-justme-garda-lake',
];

export const CAPODANNO_NON_PARTNER_PRIORITY_SLUGS: readonly string[] = [
  'capodanno-il-marchese-milano',
  'capodanno-frezza-milano-cascina-romana',
  'capodanno-beach-garden-milano',
  'capodanno-world-winter-week-aprica',
  'capodanno-church-81-milano',
  'capodanno-terrazza-duomo-21',
  'capodanno-terrazza-gallia-excelsior-milano',
  'capodanno-the-beach-milano',
  'capodanno-zelig-cabaret-milano',
  'capodanno-stk-milan',
  'capodanno-radio-rooftop-milano',
  'capodanno-jazz-cafe-milano',
  'capodanno-hotel-barchetta-excelsior-como',
  'capodanno-albergo-terminus-como',
  'capodanno-teatro-manzoni-milano',
  'capodanno-tram-storico-milano-atmosfera',
  'capodanno-philipps-milano',
  'capodanno-armani-prive-milano',
  'capodanno-volt-club-milano',
  'capodanno-alcatraz-milano',
  'capodanno-fabbrica-del-vapore-milano',
  'capodanno-setai-club-bergamo',
  'capodanno-capogiro-curno-bergamo',
  'capodanno-tiky-klub-seriate-bergamo',
  'capodanno-zero-club-bergamo',
  'capodanno-qi-clubbing-brescia',
  'capodanno-number-one-brescia',
];

export const CAPODANNO_PARTNER_PRIORITY_SLUGS: readonly string[] = [
  ...CAPODANNO_HEAD_13_SLUGS,
  ...CAPODANNO_REMAINING_PARTNER_SLUGS,
];

export const CAPODANNO_PARTNER_PRIORITY_RANK: Record<string, number> = {
  ...Object.fromEntries(CAPODANNO_PARTNER_PRIORITY_SLUGS.map((slug, index) => [slug, index + 1])),
  'capodanno-ortodosso-justme-milano': 9998,
  'capodanno-justme-garda-lake': 9999,
};

export function getCapodannoPriorityRank(slug: string, mode?: string): number {
  if (mode === 'capodanno-rooftop-milano' && slug === 'capodanno-voya-rooftop-milano') return -1;
  if ((mode === 'lombardia' || mode === 'capodanno-lombardia') && slug === 'capodanno-justme-garda-lake') return -1;
  if (slug === 'capodanno-ortodosso-justme-milano') return 9998;
  if (slug === 'capodanno-justme-garda-lake') return 9999;
  const headIdx = CAPODANNO_HEAD_13_SLUGS.indexOf(slug);
  if (headIdx !== -1) return headIdx;
  const remPartnerIdx = CAPODANNO_REMAINING_PARTNER_SLUGS.indexOf(slug);
  if (remPartnerIdx !== -1) return 100 + remPartnerIdx;
  const nonPartnerIdx = CAPODANNO_NON_PARTNER_PRIORITY_SLUGS.indexOf(slug);
  if (nonPartnerIdx !== -1) return 200 + nonPartnerIdx;
  return 500;
}
