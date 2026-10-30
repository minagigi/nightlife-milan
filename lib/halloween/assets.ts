import type { LocaleCode } from '@/lib/i18n/locales';
import type { HalloweenAsset, HalloweenContent } from './types';

/** Same approved bytes; native filenames are delivery aliases, never new art. */
export function halloweenLocalizedAssets(locale: LocaleCode, copy: HalloweenContent, assets: readonly HalloweenAsset[]) {
  if (assets.length !== 5 || copy.imageAlts.length !== 5) throw new Error('Halloween requires five localized images');
  const filenames = new Set<string>();
  return assets.map((asset, index) => {
    if (!asset.src.endsWith('.webp')) throw new Error('Halloween aliases require approved WebP bytes');
    const stem = copy.imageAlts[index].normalize('NFKC').trim().toLocaleLowerCase(locale)
      .replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/gu, '');
    if (!stem || stem.length > 150 || filenames.has(stem)) throw new Error(`Invalid or duplicate native Halloween image filename: ${locale}`);
    filenames.add(stem);
    return { ...asset, sourceSrc: asset.src, fileName: `${stem}.webp`,
      src: `/images/halloween-2026/${locale}/${encodeURIComponent(stem)}.webp`,
      alt: copy.imageAlts[index], title: copy.imageAlts[index] };
  });
}
