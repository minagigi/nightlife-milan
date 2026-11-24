import manifest from '@/lib/imageDimensionsManifest.json';

type DimsTuple = [number, number];
const DIMS_MAP = manifest as unknown as Record<string, DimsTuple>;

const SEO_REWRITE_RE = /^\/images\/seo-events\/[^/]+\/([a-z0-9_-]+)--[^/]+\.webp$/i;

/**
 * Serverless/Edge-safe lookup of real pixel dimensions for any /images/... asset.
 * Uses the build-time static manifest (zero fs calls in Vercel ISR Lambdas).
 */
export function getPublicImageDimensions(
  src: string | undefined | null,
  fallback: { width: number; height: number } = { width: 1080, height: 1350 },
): { width: number; height: number } {
  if (!src) return fallback;
  let clean = src.split('?')[0].split('#')[0].trim();
  if (clean.startsWith('https://nightlifemilan.com/')) {
    clean = clean.slice('https://nightlifemilan.com'.length);
  } else if (clean.startsWith('https://www.nightlifemilan.com/')) {
    clean = clean.slice('https://www.nightlifemilan.com'.length);
  }
  if (!clean.startsWith('/')) clean = `/${clean}`;

  const direct = DIMS_MAP[clean];
  if (direct) return { width: direct[0], height: direct[1] };

  const seoMatch = clean.match(SEO_REWRITE_RE);
  if (seoMatch) {
    const masterKey = `/images/seo-events/master/${seoMatch[1]}.webp`;
    const masterDims = DIMS_MAP[masterKey];
    if (masterDims) return { width: masterDims[0], height: masterDims[1] };
  }

  return fallback;
}
