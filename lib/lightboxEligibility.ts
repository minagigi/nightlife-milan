export const LIGHTBOX_EXCLUDED_ANCESTOR_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  '[role="link"]',
  '[role="dialog"]',
  '[aria-modal="true"]',
  'summary',
  'nav',
  'header.nlm-header',
  'footer',
  '[data-no-lightbox="true"]',
  '[data-hero-backdrop="true"]',
  '[data-card-media="true"]',
  '[data-event-card]',
  '[data-venue-card]',
  '[data-priority-weekly-card]',
  '[data-priority-capodanno-card]',
  '[data-rooftop-alternatives]',
  '[data-single-pass-storefront]',
  '[data-event-section="gallery"]',
  '.leaflet-container',
].join(', ');

export const LIGHTBOX_GROUP_SELECTOR = [
  '[data-lightbox-group]',
  '[data-seo-flow-gallery]',
  '[data-official-menus]',
  '[data-justme-body-images]',
  '[data-venue-gallery]',
].join(', ');

const BLOCKED_SRC_RE = /(?:\.svg(?:$|[?#])|^data:image\/svg|\/organization-logo|favicon|apple-icon)/i;

export function isLightboxEligibleSrc(src: string | null | undefined): boolean {
  const trimmed = (src || '').trim();
  if (!trimmed) return false;
  if (BLOCKED_SRC_RE.test(trimmed)) return false;
  return trimmed.startsWith('/') || trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('data:image/');
}

/**
 * Unwraps `/_next/image?url=...&w=...&q=...` so the full-screen modal renders
 * the uncropped high-resolution master asset instead of a constrained width variant.
 */
export function resolveFullResImageSrc(rawSrc: string, origin = 'https://nightlifemilan.com'): string {
  const trimmed = (rawSrc || '').trim();
  if (!trimmed) return '';

  try {
    const parsed = new URL(trimmed, origin);
    if (parsed.pathname === '/_next/image') {
      const inner = parsed.searchParams.get('url');
      if (inner) {
        const cleanInner = inner.trim();
        if (cleanInner.startsWith('/') || cleanInner.startsWith('https://') || cleanInner.startsWith('http://')) {
          return cleanInner;
        }
      }
    }
    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
    return trimmed.startsWith('data:image/') ? trimmed : '';
  } catch {
    return trimmed.startsWith('/') && !trimmed.startsWith('//') ? trimmed : '';
  }
}

export function isImageElementLightboxEligible(img: HTMLImageElement): boolean {
  if (typeof window === 'undefined' || !img.isConnected) return false;
  const contentRoot = document.getElementById('main-content') || document.querySelector('main');
  if (!contentRoot || !contentRoot.contains(img)) return false;

  if (img.getAttribute('data-no-lightbox') === 'true') return false;
  if (img.getAttribute('aria-hidden') === 'true') return false;

  const ariaHiddenParent = img.closest('[aria-hidden="true"]');
  if (ariaHiddenParent) return false;

  // When an image is already enhanced by the lightbox, it receives role="button" itself.
  // Walk up from parentElement so the self-applied role="button" does not self-exclude.
  const startNode = img.parentElement;
  if (!startNode || startNode.closest(LIGHTBOX_EXCLUDED_ANCESTOR_SELECTOR)) return false;

  const rawSrc = img.currentSrc || img.getAttribute('src') || '';
  if (!isLightboxEligibleSrc(rawSrc)) return false;

  const style = window.getComputedStyle(img);
  if (style.display === 'none' || style.visibility === 'hidden' || style.pointerEvents === 'none') {
    return false;
  }

  const rect = img.getBoundingClientRect();
  if (rect.width < 140 || rect.height < 100) return false;

  if (img.complete && img.naturalWidth < 200) return false;

  return true;
}

export function extractImageCaption(img: HTMLImageElement): string {
  const fig = img.closest('figure');
  const figcaption = fig?.querySelector('figcaption');
  const captionText = figcaption?.textContent?.replace(/\s+/g, ' ').trim();
  if (captionText) return captionText;
  const titleAttr = img.getAttribute('title')?.trim();
  if (titleAttr) return titleAttr;
  return img.getAttribute('alt')?.trim() || '';
}
