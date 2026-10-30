export function getFavoritesCopy(locale: string): { title: string } {
  return {
    title: locale === 'it' ? 'Locali preferiti' : 'Saved venues',
  };
}
