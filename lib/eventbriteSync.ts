import type { Event } from './types';
import { EVENTBRITE_DISCONNECTED_MESSAGE } from './eventbriteDisconnected';

export const NEW_MARKER_RE = /nlm:src=(.+?)-([a-z]{2});slug-en=([a-z0-9-]+)/;
export const LEGACY_MARKER_RE = /nlm:src=([^;]+);slug-en=([a-z0-9-]+)/;

export interface ParsedMarker {
  baseId: string;
  lang?: string;
  slug: string;
}

export function parseMarker(text: string | undefined): ParsedMarker | undefined {
  if (!text) return undefined;
  const fresh = text.match(NEW_MARKER_RE);
  if (fresh) return { baseId: fresh[1], lang: fresh[2], slug: fresh[3] };
  const legacy = text.match(LEGACY_MARKER_RE);
  if (legacy) return { baseId: legacy[1], slug: legacy[2] };
  return undefined;
}

export async function getEventGoldHtml(_slugEn: string, _locale: string): Promise<string | null> {
  return null;
}

export async function debugEventbrite() {
  return {
    disconnected: true,
    hasToken: false,
    error: EVENTBRITE_DISCONNECTED_MESSAGE,
  };
}

export async function fetchEventbriteEvents(_includePast = false, _sinceDaysAgo?: number): Promise<Event[]> {
  return [];
}
