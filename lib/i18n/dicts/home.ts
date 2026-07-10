import type { LocaleCode } from '../locales';

// Dizionario contenuti pagina Home — testo EN (chiave) → traduzioni per le 33
// lingue non native. Riempito in-sessione (mai API Anthropic). Vuoto = fallback EN.
export const homeDict: Record<string, Partial<Record<LocaleCode, string>>> = {};
