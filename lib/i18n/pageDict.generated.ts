import type { LocaleCode } from './locales';
import { homeDict } from './dicts/home';

// Dizionario aggregato dei contenuti di pagina (tutte le pagine). Ogni pagina ha
// il suo file in dicts/ così più traduzioni in parallelo non vanno in conflitto.
export const PAGE_DICT: Record<string, Partial<Record<LocaleCode, string>>> = {
  ...homeDict,
};
