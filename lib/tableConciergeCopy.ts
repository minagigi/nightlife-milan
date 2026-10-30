import type { LocaleCode } from './i18n/locales';
import { isEnabledLocale } from './i18n/locales';

type ControlCopy = { date: string; group: string };

// Short control labels only. Existing reviewed page copy supplies the section
// headings, descriptions and actions on every locale.
const COPY: Record<LocaleCode, ControlCopy> = {
  en: { date: 'Date', group: 'People in your group' },
  it: { date: 'Data', group: 'Persone nel gruppo' },
  es: { date: 'Fecha', group: 'Personas en el grupo' },
  fr: { date: 'Date', group: 'Personnes dans le groupe' },
  de: { date: 'Datum', group: 'Personen in der Gruppe' },
  pt: { date: 'Data', group: 'Pessoas no grupo' },
  nl: { date: 'Datum', group: 'Personen in de groep' },
  ru: { date: 'Дата', group: 'Человек в группе' },
  tr: { date: 'Tarih', group: 'Gruptaki kişi sayısı' },
  zh: { date: '日期', group: '同行人数' },
  ar: { date: 'التاريخ', group: 'عدد أفراد المجموعة' },
  bg: { date: 'Дата', group: 'Хора в групата' },
  hr: { date: 'Datum', group: 'Broj osoba u grupi' },
  cs: { date: 'Datum', group: 'Počet osob ve skupině' },
  da: { date: 'Dato', group: 'Personer i gruppen' },
  et: { date: 'Kuupäev', group: 'Inimesi rühmas' },
  fi: { date: 'Päivämäärä', group: 'Ryhmän henkilömäärä' },
  el: { date: 'Ημερομηνία', group: 'Άτομα στην ομάδα' },
  hu: { date: 'Dátum', group: 'A csoport létszáma' },
  ga: { date: 'Dáta', group: 'Líon daoine sa ghrúpa' },
  lv: { date: 'Datums', group: 'Cilvēku skaits grupā' },
  lt: { date: 'Data', group: 'Žmonių skaičius grupėje' },
  mt: { date: 'Data', group: 'Għadd ta’ persuni fil-grupp' },
  pl: { date: 'Data', group: 'Liczba osób w grupie' },
  ro: { date: 'Data', group: 'Numărul persoanelor din grup' },
  sk: { date: 'Dátum', group: 'Počet osôb v skupine' },
  sl: { date: 'Datum', group: 'Število oseb v skupini' },
  sv: { date: 'Datum', group: 'Antal personer i gruppen' },
  no: { date: 'Dato', group: 'Antall personer i gruppen' },
  is: { date: 'Dagsetning', group: 'Fjöldi í hópnum' },
  uk: { date: 'Дата', group: 'Кількість людей у групі' },
  sq: { date: 'Data', group: 'Numri i personave në grup' },
  sr: { date: 'Датум', group: 'Број људи у групи' },
  bs: { date: 'Datum', group: 'Broj osoba u grupi' },
  mk: { date: 'Датум', group: 'Број на лица во групата' },
};

const OPTIONAL_PREFERENCE: Record<LocaleCode, string> = {
  en: 'Preference (optional)', it: 'Preferenza (facoltativa)', es: 'Preferencia (opcional)',
  fr: 'Préférence (facultative)', de: 'Wunsch (optional)', pt: 'Preferência (opcional)',
  nl: 'Voorkeur (optioneel)', ru: 'Пожелание (необязательно)', tr: 'Tercih (isteğe bağlı)',
  zh: '偏好（可选）', ar: 'تفضيل (اختياري)', bg: 'Предпочитание (по избор)',
  hr: 'Želja (neobavezno)', cs: 'Preference (nepovinné)', da: 'Ønske (valgfrit)',
  et: 'Eelistus (valikuline)', fi: 'Toive (valinnainen)', el: 'Προτίμηση (προαιρετικά)',
  hu: 'Kívánság (nem kötelező)', ga: 'Rogha (roghnach)', lv: 'Vēlme (neobligāti)',
  lt: 'Pageidavimas (nebūtina)', mt: 'Preferenza (mhux obbligatorja)', pl: 'Preferencja (opcjonalnie)',
  ro: 'Preferință (opțional)', sk: 'Preferencia (nepovinné)', sl: 'Želja (neobvezno)',
  sv: 'Önskemål (valfritt)', no: 'Ønske (valgfritt)', is: 'Ósk (valfrjálst)',
  uk: 'Побажання (необов’язково)', sq: 'Preferencë (opsionale)', sr: 'Жеља (необавезно)',
  bs: 'Želja (neobavezno)', mk: 'Желба (незадолжително)',
};

export function getTableConciergeControlCopy(locale: string): ControlCopy & { preference: string } {
  if (!isEnabledLocale(locale)) throw new Error(`Unsupported locale ${locale}`);
  return { ...COPY[locale], preference: OPTIONAL_PREFERENCE[locale] };
}
