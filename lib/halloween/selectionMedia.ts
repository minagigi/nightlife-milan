import type { LocaleCode } from '@/lib/i18n/locales';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import media from './selection.media.json';
export type HalloweenHubPoster = Readonly<{src:string;srcs:Readonly<Record<LocaleCode,string>>;width:number;height:number;bytes:number;sha256:string;sourceRef:string;alts:Readonly<Record<LocaleCode,string>>}>;
/** Independent image binding; no remote originals or fictitious derivatives. */
export const HALLOWEEN_SELECTION_MEDIA = media as Readonly<Record<string,HalloweenHubPoster>>;
export function halloweenHubPoster(id:string,locale:LocaleCode) {
  const poster=HALLOWEEN_SELECTION_MEDIA[id];
  if (!poster) return null;
  if (!/^\/images\/[^?#]+\.(webp|avif)$/u.test(poster.src)||poster.width<1||poster.height<1||poster.width>1600||poster.height>1600
    ||poster.bytes<1||poster.bytes>400*1024||!/^[a-f0-9]{64}$/u.test(poster.sha256)||!poster.sourceRef.trim()
    ||enabledLocaleCodes.some(code=>typeof poster.alts[code]!=='string'||!poster.alts[code].trim()
      ||typeof poster.srcs?.[code]!=='string'||!poster.srcs[code].startsWith(`/images/halloween-2026/user-selection/${code}/`))) throw new Error(`HALLOWEEN_POSTER_BINDINGS_HOLD: ${id}`);
  return {src:poster.srcs[locale],width:poster.width,height:poster.height,alt:poster.alts[locale],title:poster.alts[locale]};
}
