import type { LocaleCode } from '@/lib/i18n/locales';

const COPY: Record<LocaleCode, { womenOnlyLabel: string }> = {
  "ar": {
    "womenOnlyLabel": "للنساء فقط"
  },
  "bg": {
    "womenOnlyLabel": "Само за жени"
  },
  "bs": {
    "womenOnlyLabel": "Samo za žene"
  },
  "cs": {
    "womenOnlyLabel": "Pouze pro ženy"
  },
  "da": {
    "womenOnlyLabel": "Kun for kvinder"
  },
  "de": {
    "womenOnlyLabel": "Nur für Frauen"
  },
  "el": {
    "womenOnlyLabel": "Μόνο για γυναίκες"
  },
  "en": {
    "womenOnlyLabel": "Ladies perk available"
  },
  "es": {
    "womenOnlyLabel": "Solo mujeres"
  },
  "et": {
    "womenOnlyLabel": "Ainult naistele"
  },
  "fi": {
    "womenOnlyLabel": "Vain naisille"
  },
  "fr": {
    "womenOnlyLabel": "Femmes uniquement"
  },
  "ga": {
    "womenOnlyLabel": "Mná amháin"
  },
  "hr": {
    "womenOnlyLabel": "Samo za žene"
  },
  "hu": {
    "womenOnlyLabel": "Csak nőknek"
  },
  "is": {
    "womenOnlyLabel": "Aðeins fyrir konur"
  },
  "it": {
    "womenOnlyLabel": "Ingresso agevolato Donna"
  },
  "lt": {
    "womenOnlyLabel": "Tik moterims"
  },
  "lv": {
    "womenOnlyLabel": "Tikai sievietēm"
  },
  "mk": {
    "womenOnlyLabel": "Само за жени"
  },
  "mt": {
    "womenOnlyLabel": "Nisa biss"
  },
  "nl": {
    "womenOnlyLabel": "Alleen voor vrouwen"
  },
  "no": {
    "womenOnlyLabel": "Kun for kvinner"
  },
  "pl": {
    "womenOnlyLabel": "Tylko dla kobiet"
  },
  "pt": {
    "womenOnlyLabel": "Apenas mulheres"
  },
  "ro": {
    "womenOnlyLabel": "Doar pentru femei"
  },
  "ru": {
    "womenOnlyLabel": "Только для женщин"
  },
  "sk": {
    "womenOnlyLabel": "Len pre ženy"
  },
  "sl": {
    "womenOnlyLabel": "Samo za ženske"
  },
  "sq": {
    "womenOnlyLabel": "Vetëm për gra"
  },
  "sr": {
    "womenOnlyLabel": "Samo za žene"
  },
  "sv": {
    "womenOnlyLabel": "Endast för kvinnor"
  },
  "tr": {
    "womenOnlyLabel": "Yalnızca kadınlar"
  },
  "uk": {
    "womenOnlyLabel": "Лише для жінок"
  },
  "zh": {
    "womenOnlyLabel": "仅限女性"
  }
};

export function getGuestListsCopy(locale: string): { title: string; womenOnlyLabel: string } {
  const base = COPY[locale as LocaleCode] ?? COPY.en;
  return {
    title: locale === 'it' ? 'Liste Nominali & Accrediti' : 'Nominal Guest Lists',
    womenOnlyLabel: base.womenOnlyLabel,
  };
}
