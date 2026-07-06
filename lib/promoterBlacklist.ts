/**
 * Blacklist di promoter/agenzie/aggregatori terzi noti, riscontrati riscrivendo
 * eventi di terzi nei nostri venue. Estendibile: qualsiasi nome qui dentro viene
 * sostituito con "Nightlife Milan" ovunque appaia nei testi riscritti.
 */
export const PROMOTER_BLACKLIST: string[] = [
  'cosa fare a milano',
  'cosafareamilano',
];

export function addToBlacklist(names: string[]): string[] {
  const merged = new Set([...PROMOTER_BLACKLIST, ...names.map((n) => n.toLowerCase().trim())].filter(Boolean));
  return [...merged];
}
