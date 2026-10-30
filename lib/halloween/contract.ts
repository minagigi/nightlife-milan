import { enabledLocaleCodes, type LocaleCode } from '@/lib/i18n/locales';
import type { OctoberEventRecord } from '@/lib/october-events/types';
import type { HalloweenAsset, HalloweenContent, HalloweenContentPack, HalloweenMembership } from './types';
import { halloweenNavigation } from './routes';

export function nativeBodyWordCount(copy: HalloweenContent, locale: LocaleCode): number {
  const body = [...copy.intro, ...copy.sections.flatMap(section => section.paragraphs)].join(' ');
  return [...new Intl.Segmenter(locale, { granularity: 'word' }).segment(body)].filter(item => item.isWordLike).length;
}
export function validateHalloweenContent(pack: Partial<HalloweenContentPack>, assets: readonly HalloweenAsset[]): HalloweenContentPack {
  if (Object.keys(pack).length !== enabledLocaleCodes.length) throw new Error('Halloween requires all 35 native content packs');
  if (assets.length !== 5 || new Set(assets.map(asset => asset.src)).size !== 5
    || new Set(assets.map(asset => asset.sha256)).size !== 5) throw new Error('Halloween requires five distinct approved body images');
  for (const [index, asset] of assets.entries()) {
    if (!/^\/images\/[a-zA-Z0-9/_-]+\.(?:webp|avif)$/u.test(asset.src)
      || !Number.isInteger(asset.width) || asset.width < 1 || asset.width > 1600
      || !Number.isInteger(asset.height) || asset.height < 1 || asset.height > 1600
      || !Number.isInteger(asset.bytes) || asset.bytes < 1 || asset.bytes > 400 * 1024
      || !/^[a-f0-9]{64}$/u.test(asset.sha256) || !asset.sourceRef.trim()
      || asset.kind !== (index === 4 ? 'editorial-illustration' : 'programme-artwork')) throw new Error('Invalid approved Halloween body asset');
  }
  for (const locale of enabledLocaleCodes) {
    const copy = pack[locale];
    if (!copy || copy.h1 !== halloweenNavigation(locale).h1 || !copy.metaTitle.trim() || copy.metaTitle.length > 62
      || !copy.metaDescription.trim() || copy.metaDescription.length > 158
      || copy.sections.length !== 2 || copy.imageAlts.length !== 5 || copy.faqs.length !== 25 || !copy.editorialImageCaption.trim()
      || new Set(copy.faqs.map(faq => faq.question.trim())).size !== 25
      || new Set(copy.sections.map(section => section.heading.trim())).size !== 2
      || [...copy.intro, ...copy.sections.flatMap(section => [section.heading, ...section.paragraphs]), ...copy.imageAlts,
        ...copy.faqs.flatMap(faq => [faq.question, faq.answer])].some(value => !value.trim())
      || nativeBodyWordCount(copy, locale) < 1500) throw new Error(`Incomplete native Halloween body: ${locale}`);
  }
  return pack as HalloweenContentPack;
}
/** Membership is explicit evidence, never inferred from a venue or a keyword. */
export function selectHalloweenEvents(inventory: readonly OctoberEventRecord[], membership: readonly HalloweenMembership[]): readonly OctoberEventRecord[] {
  if (!membership.length || new Set(membership.map(item => item.eventId)).size !== membership.length) throw new Error('Halloween membership missing or duplicated');
  const themedIds = inventory.filter(event => event.halloween === true && !event.excluded).map(event => event.id);
  if (membership.length !== themedIds.length || themedIds.some(id => !membership.some(item => item.eventId === id))) throw new Error('Halloween membership must cover the complete explicit source selection');
  const selected = membership.map(item => {
    const matches = inventory.filter(event => event.id === item.eventId);
    const event = matches[0];
    if (matches.length !== 1 || !event || event.excluded || event.halloween !== true
      || event.sourceUrl !== item.sourceUrl || event.startISO !== item.startISO
      || !item.evidenceRef.trim() || !event.provenance.trim()
      || !Number.isFinite(Date.parse(event.startISO))
      || Date.parse(event.startISO) < Date.parse('2026-10-01T00:00:00+02:00')
      || Date.parse(event.startISO) >= Date.parse('2026-11-01T00:00:00+01:00')) throw new Error(`Unqualified Halloween member: ${item.eventId}`);
    return event;
  });
  return selected.sort((a, b) => Date.parse(a.startISO) - Date.parse(b.startISO) || a.id.localeCompare(b.id));
}
