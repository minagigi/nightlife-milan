export function normalizedTextIncludes(haystack: string, needle: string): boolean {
  const normalize = (value: string) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalize(haystack).includes(normalize(needle));
}
