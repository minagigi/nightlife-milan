import type { LocaleCode } from './locales';
import { PAGE_DICT } from './pageDict.generated';

/**
 * Traduzione dei contenuti di pagina (FASE L1 — testi tradotti in-sessione con
 * Claude Code, mai via API Anthropic; vedi memoria nightlife-translate-in-session).
 *
 * `tr(locale, en, it?)`:
 *  - en  → ritorna la stringa inglese (invariata, nessuna regressione)
 *  - it  → ritorna la stringa italiana passata inline (o en se assente)
 *  - altra lingua → cerca la traduzione in PAGE_DICT[en][locale], fallback a en
 *
 * Le stringhe restano scritte inline nei componenti (chiave = testo EN): il
 * dizionario PAGE_DICT.generated.ts mappa ogni testo EN → traduzioni per le 33
 * lingue non native. Aggiungere/tradurre una pagina = riempire quel dizionario.
 */
export function tr(locale: string, en: string, it?: string): string {
  if (locale === 'en') return en;
  if (locale === 'it') return it ?? en;
  return PAGE_DICT[en]?.[locale as LocaleCode] ?? en;
}
