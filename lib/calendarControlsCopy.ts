import { isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';
import { getTableConciergeControlCopy } from '@/lib/tableConciergeCopy';
export type CalendarControlsCopy = { month: string; date: string; allMonths: string; allDates: string };
const COPY: Record<LocaleCode, Omit<CalendarControlsCopy, 'date'>> = {
  en: {"month": "Month", "allMonths": "All months", "allDates": "All dates"},
  it: {"month": "Mese", "allMonths": "Tutti i mesi", "allDates": "Tutte le date"},
  es: {"month": "Mes", "allMonths": "Todos los meses", "allDates": "Todas las fechas"},
  fr: {"month": "Mois", "allMonths": "Tous les mois", "allDates": "Toutes les dates"},
  de: {"month": "Monat", "allMonths": "Alle Monate", "allDates": "Alle Termine"},
  pt: {"month": "Mês", "allMonths": "Todos os meses", "allDates": "Todas as datas"},
  nl: {"month": "Maand", "allMonths": "Alle maanden", "allDates": "Alle datums"},
  ru: {"month": "Месяц", "allMonths": "Все месяцы", "allDates": "Все даты"},
  tr: {"month": "Ay", "allMonths": "Tüm aylar", "allDates": "Tüm tarihler"},
  zh: {"month": "月份", "allMonths": "所有月份", "allDates": "所有日期"},
  ar: {"month": "الشهر", "allMonths": "جميع الأشهر", "allDates": "جميع التواريخ"},
  bg: {"month": "Месец", "allMonths": "Всички месеци", "allDates": "Всички дати"},
  hr: {"month": "Mjesec", "allMonths": "Svi mjeseci", "allDates": "Svi datumi"},
  cs: {"month": "Měsíc", "allMonths": "Všechny měsíce", "allDates": "Všechny termíny"},
  da: {"month": "Måned", "allMonths": "Alle måneder", "allDates": "Alle datoer"},
  et: {"month": "Kuu", "allMonths": "Kõik kuud", "allDates": "Kõik kuupäevad"},
  fi: {"month": "Kuukausi", "allMonths": "Kaikki kuukaudet", "allDates": "Kaikki päivämäärät"},
  el: {"month": "Μήνας", "allMonths": "Όλοι οι μήνες", "allDates": "Όλες οι ημερομηνίες"},
  hu: {"month": "Hónap", "allMonths": "Minden hónap", "allDates": "Minden dátum"},
  ga: {"month": "Mí", "allMonths": "Gach mí", "allDates": "Gach dáta"},
  lv: {"month": "Mēnesis", "allMonths": "Visi mēneši", "allDates": "Visi datumi"},
  lt: {"month": "Mėnuo", "allMonths": "Visi mėnesiai", "allDates": "Visos datos"},
  mt: {"month": "Xahar", "allMonths": "Ix-xhur kollha", "allDates": "Id-dati kollha"},
  pl: {"month": "Miesiąc", "allMonths": "Wszystkie miesiące", "allDates": "Wszystkie daty"},
  ro: {"month": "Lună", "allMonths": "Toate lunile", "allDates": "Toate datele"},
  sk: {"month": "Mesiac", "allMonths": "Všetky mesiace", "allDates": "Všetky dátumy"},
  sl: {"month": "Mesec", "allMonths": "Vsi meseci", "allDates": "Vsi datumi"},
  sv: {"month": "Månad", "allMonths": "Alla månader", "allDates": "Alla datum"},
  no: {"month": "Måned", "allMonths": "Alle måneder", "allDates": "Alle datoer"},
  is: {"month": "Mánuður", "allMonths": "Allir mánuðir", "allDates": "Allar dagsetningar"},
  uk: {"month": "Місяць", "allMonths": "Усі місяці", "allDates": "Усі дати"},
  sq: {"month": "Muaji", "allMonths": "Të gjithë muajt", "allDates": "Të gjitha datat"},
  sr: {"month": "Месец", "allMonths": "Сви месеци", "allDates": "Сви датуми"},
  bs: {"month": "Mjesec", "allMonths": "Svi mjeseci", "allDates": "Svi datumi"},
  mk: {"month": "Месец", "allMonths": "Сите месеци", "allDates": "Сите датуми"},
};
export function getCalendarControlsCopy(locale: string): CalendarControlsCopy {
  if (!isEnabledLocale(locale)) throw new Error('Unsupported calendar locale');
  return { ...COPY[locale], date: getTableConciergeControlCopy(locale).date };
}
