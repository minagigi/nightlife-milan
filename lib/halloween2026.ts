import { getOctoberHubCopy } from '@/lib/october-events/copy';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { OctoberFaq, OctoberHubLabels } from '@/lib/october-events/types';
import { HALLOWEEN_CONTENT, HALLOWEEN_ASSETS } from '@/lib/halloween/content';
import { validateHalloweenContent } from '@/lib/halloween/contract';
const HALLOWEEN_FAQ_LABELS: Readonly<Record<LocaleCode, string>> = {
  "en": "Frequently asked questions",
  "it": "Domande frequenti",
  "es": "Preguntas frecuentes",
  "fr": "Questions fréquentes",
  "de": "Häufig gestellte Fragen",
  "pt": "Perguntas frequentes",
  "nl": "Veelgestelde vragen",
  "ru": "Часто задаваемые вопросы",
  "tr": "Sık sorulan sorular",
  "zh": "常见问题",
  "ar": "الأسئلة الشائعة",
  "bg": "Често задавани въпроси",
  "hr": "Često postavljana pitanja",
  "cs": "Časté dotazy",
  "da": "Ofte stillede spørgsmål",
  "et": "Korduma kippuvad küsimused",
  "fi": "Usein kysytyt kysymykset",
  "el": "Συχνές ερωτήσεις",
  "hu": "Gyakran ismételt kérdések",
  "ga": "Ceisteanna coitianta",
  "lv": "Biežāk uzdotie jautājumi",
  "lt": "Dažnai užduodami klausimai",
  "mt": "Mistoqsijiet frekwenti",
  "pl": "Najczęściej zadawane pytania",
  "ro": "Întrebări frecvente",
  "sk": "Často kladené otázky",
  "sl": "Pogosta vprašanja",
  "sv": "Vanliga frågor",
  "no": "Ofte stilte spørsmål",
  "is": "Algengar spurningar",
  "uk": "Поширені запитання",
  "sq": "Pyetje të shpeshta",
  "sr": "Често постављана питања",
  "bs": "Često postavljana pitanja",
  "mk": "Често поставувани прашања"
};
export type Halloween2026Copy = Readonly<{ metaTitle: string; metaDescription: string; labels: OctoberHubLabels; faqHeading: string; faqs: readonly OctoberFaq[] }>;
export function getHalloween2026Copy(locale: LocaleCode): Halloween2026Copy {
  const body = validateHalloweenContent(HALLOWEEN_CONTENT, HALLOWEEN_ASSETS)[locale];
  const base = getOctoberHubCopy(locale);
  return { metaTitle: body.metaTitle, metaDescription: body.metaDescription,
    labels: { ...base.labels, heading: body.h1, introduction: body.intro.join(' ') },
    faqHeading: `${HALLOWEEN_FAQ_LABELS[locale]} · ${body.h1}`, faqs: body.faqs };
}
