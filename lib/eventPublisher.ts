import type { ScoutedEvent } from './eventScout';
import type { XceedEvent } from './xceedScout';
import type { RewrittenEvent, Lang } from './eventRewriter';
import type { PosterResult } from './posterPipeline';
import { EVENTBRITE_DISCONNECTED_CODE } from './eventbriteDisconnected';

const RATE_LIMIT_MS = 3000;

export interface PublishResult {
  ok: boolean;
  ebEventId?: string;
  url?: string;
  reason?: string;
  imageSource?: string;
  confirmationConfigured?: boolean;
  confirmationReason?: string;
}

export type PublishResultByLang = Partial<Record<Lang, PublishResult>>;

function romeOffsetMinutesForDate(y: number, m: number, d: number): number {
  const utcNoon = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(utcNoon);
  const romeHour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
  return (romeHour - 12) * 60;
}

export function toEventbriteUtc(dateISO: string): string {
  const [datePart, timePart] = dateISO.slice(0, 19).split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm, ss] = (timePart || '00:00:00').split(':').map(Number);
  const offsetMin = romeOffsetMinutesForDate(y, m, d);
  const utcMs = Date.UTC(y, m - 1, d, hh, mm, ss || 0) - offsetMin * 60000;
  return new Date(utcMs).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function normalizeAlreadyUtc(isoUtc: string): string {
  return new Date(isoUtc).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function normalizeVenueField(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function eventbriteVenueMatches(params: {
  candidate: { name?: string; address?: { address_1?: string; postal_code?: string } };
  expectedName: string;
  expectedStreet: string;
  expectedPostalCode: string;
}): boolean {
  const candidateName = normalizeVenueField(params.candidate.name || '');
  const expectedName = normalizeVenueField(params.expectedName);
  const candidateStreet = normalizeVenueField(params.candidate.address?.address_1 || '');
  const expectedStreetTokens = normalizeVenueField(params.expectedStreet).split(' ').filter(Boolean);
  const candidatePostal = normalizeVenueField(params.candidate.address?.postal_code || '');
  const expectedPostal = normalizeVenueField(params.expectedPostalCode);

  const nameMatches = candidateName.includes(expectedName) || expectedName.includes(candidateName);
  const streetMatches = expectedStreetTokens.length > 0
    && expectedStreetTokens.every((token) => candidateStreet.split(' ').includes(token));
  const postalMatches = !candidatePostal || candidatePostal === expectedPostal;
  return Boolean(candidateName && nameMatches && streetMatches && postalMatches);
}

export async function resolveEventbriteVenueId(
  _token: string,
  _venueId: string,
  _dryRun: boolean,
): Promise<string | null> {
  return null;
}

export async function uploadEventImage(_token: string, _poster: PosterResult): Promise<string | null> {
  return null;
}

export async function replaceEventImage(
  _eventId: string,
  _poster: PosterResult,
): Promise<{ ok: boolean; reason?: string }> {
  return { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE };
}

export interface PublishOneLangParams {
  token: string;
  venueEbId: string;
  imageId: string;
  startUtc: string;
  endUtc: string;
  title: string;
  summary: string;
  description: string;
  locale: string;
  lang: string;
  ageRestriction?: string;
  doorTimeISO?: string;
  poster?: PosterResult;
  ticketText?: { name: string; description: string };
  categoryId?: string;
  subcategoryId?: string;
  formatId?: string;
  validateSavedDescription?: (savedHtml: string) => string | null;
}

export async function publishOneLang(_p: PublishOneLangParams): Promise<PublishResult> {
  return { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE };
}

function disconnectedResults(langsToPublish?: Lang[]): PublishResultByLang {
  const langs = langsToPublish && langsToPublish.length > 0 ? langsToPublish : (['en', 'it'] as Lang[]);
  const res: PublishResult = { ok: false, reason: EVENTBRITE_DISCONNECTED_CODE };
  return Object.fromEntries(langs.map((l) => [l, res]));
}

export async function publishEvent(
  _scouted: ScoutedEvent,
  _rewritten: RewrittenEvent,
  _sanitizedDescriptionEn: string,
  _sanitizedDescriptionIt: string,
  _poster: PosterResult,
  _dryRun: boolean,
  langsToPublish?: Lang[],
): Promise<PublishResultByLang> {
  return disconnectedResults(langsToPublish);
}

export async function publishXceedEvent(
  _xceed: XceedEvent,
  _rewritten: RewrittenEvent,
  _sanitizedDescriptionEn: string,
  _sanitizedDescriptionIt: string,
  _poster: PosterResult,
  _dryRun: boolean,
  langsToPublish?: Lang[],
): Promise<PublishResultByLang> {
  return disconnectedResults(langsToPublish);
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const PUBLISH_RATE_LIMIT_MS = RATE_LIMIT_MS;
