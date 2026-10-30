import type { LocaleCode } from '@/lib/i18n/locales';
import ar from './locales/ar.json';
import bg from './locales/bg.json';
import bs from './locales/bs.json';
import cs from './locales/cs.json';
import da from './locales/da.json';
import de from './locales/de.json';
import el from './locales/el.json';
import en from './locales/en.json';
import es from './locales/es.json';
import et from './locales/et.json';
import fi from './locales/fi.json';
import fr from './locales/fr.json';
import ga from './locales/ga.json';
import hr from './locales/hr.json';
import hu from './locales/hu.json';
import is from './locales/is.json';
import it from './locales/it.json';
import lt from './locales/lt.json';
import lv from './locales/lv.json';
import mk from './locales/mk.json';
import mt from './locales/mt.json';
import nl from './locales/nl.json';
import no from './locales/no.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';
import ro from './locales/ro.json';
import ru from './locales/ru.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import sq from './locales/sq.json';
import sr from './locales/sr.json';
import sv from './locales/sv.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';
import zh from './locales/zh.json';

export type MonthEventLocalePack = typeof en;

const PACKS: Record<LocaleCode, MonthEventLocalePack> = { ar, bg, bs, cs, da, de, el, en, es, et, fi, fr, ga, hr, hu, is, it, lt, lv, mk, mt, nl, no, pl, pt, ro, ru, sk, sl, sq, sr, sv, tr, uk, zh } as unknown as Record<LocaleCode, MonthEventLocalePack>;

export function getMonthEventLocalePack(locale: LocaleCode): MonthEventLocalePack {
  return PACKS[locale] ?? PACKS.en;
}
