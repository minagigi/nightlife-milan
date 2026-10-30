import type { LocaleCode } from '@/lib/i18n/locales';

const LABELS: Record<LocaleCode, string> = {en:"Programme artwork",it:"Grafica del programma",es:"Gr\xe1fica del programa",fr:"Visuel du programme",de:"Programmgestaltung",pt:"Arte gr\xe1fica do programa",nl:"Programmagrafiek",ru:"Графика программы",tr:"Program g\xf6rseli",zh:"节目视觉图",ar:"تصميم البرنامج",bg:"Графика на програмата",hr:"Grafika programa",cs:"Grafika programu",da:"Programgrafik",et:"Programmi kujundus",fi:"Ohjelmagrafiikka",el:"Γραφικά προγράμματος",hu:"Programgrafika",ga:"Grafaic an chl\xe1ir",lv:"Programmas grafika",lt:"Programos grafika",mt:"Grafika tal-programm",pl:"Grafika programu",ro:"Grafică de program",sk:"Grafika programu",sl:"Grafika programa",sv:"Programgrafik",no:"Programgrafikk",is:"Dagskr\xe1rmynd",uk:"Графіка програми",sq:"Grafika e programit",sr:"Grafika programa",bs:"Grafika programa",mk:"Графика на програмата"};

export function octoberProgrammeArtworkLabel(locale: LocaleCode): string {
  const val = LABELS[locale];
  if (!val) throw new Error(`Missing native October programme artwork label for ${locale}`);
  return val;
}
