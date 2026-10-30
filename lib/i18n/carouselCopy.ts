import type { LocaleCode } from './locales';

export function getCarouselCopy(locale: LocaleCode): { scrollLeft: string; scrollRight: string } {
  if (locale === 'it') return { scrollLeft: 'Scorri a sinistra', scrollRight: 'Scorri a destra' };
  if (locale === 'es') return { scrollLeft: 'Desplazar a la izquierda', scrollRight: 'Desplazar a la derecha' };
  if (locale === 'fr') return { scrollLeft: 'Faire défiler à gauche', scrollRight: 'Faire défiler à droite' };
  if (locale === 'de') return { scrollLeft: 'Nach links scrollen', scrollRight: 'Nach rechts scrollen' };
  return { scrollLeft: 'Scroll left', scrollRight: 'Scroll right' };
}
