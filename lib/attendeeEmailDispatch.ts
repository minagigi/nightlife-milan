import { timingSafeEqual } from 'node:crypto';
import { crmContactId, normalizeCrmEmail } from './crmModel';
import { crmStorageConfigured, readCrmDatabase } from './crmStore';
import { detectEventLocale, extractXceedAffiliateUrls } from './eventbriteConfirmation';
import { getEventbriteToken } from './eventbriteToken';
import { isEnabledLocale, type LocaleCode } from './i18n/locales';
import {
  claimLedgerEntry,
  emailHashFull,
  emailLedgerKey,
  ensureEmailActivation,
  finalizeLedgerEntry,
  readLedgerEntry,
  shouldAttempt,
} from './emailLedger';
import { emailTransportMode, sendAttendeeEmail } from './emailTransport';
import { renderAttendeeEmail } from './attendeeEmail';
import type {
  AttendeeEmailEventInfo,
  AttendeeEmailLedgerEntry,
  AttendeeEmailMode,
  AttendeeEmailRecipient,
  AttendeeEmailStatus,
  DispatchCandidate,
  DispatchReport,
  EligibilityContext,
  EligibilitySkipReason,
  EligibilityVerdict,
} from './attendeeEmailTypes';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG = '2988002072164';

const ORDER_API_URL_RE = /^https:\/\/www\.eventbriteapi\.com\/v3\/orders\/(\d+)\/?$/;

export function validateOrderApiUrl(raw: string): string | null {
  const match = ORDER_API_URL_RE.exec(raw);
  return match ? `https://www.eventbriteapi.com/v3/orders/${match[1]}/` : null;
}

export function resolveVenueName(explicit: string | null | undefined, eventTitle: string): string | null {
  if (explicit && explicit.trim()) return explicit;
  if (/just\s*me/i.test(eventTitle)) return 'Just Me Milano';
  if (/pineta/i.test(eventTitle)) return 'Pineta Club';
  if (/\baria\b/i.test(eventTitle)) return 'Aria Club Milano';
  return null;
}

/** Forma minimale dell'evento Eventbrite (expand=venue) usata da resolveEventInfo. */
interface RawEventbriteEvent {
  id?: string;
  name?: { text?: string };
  start?: { utc?: string };
  description?: { html?: string; text?: string };
  venue?: { name?: string };
}

export function resolveEventInfo(
  rawEvent: RawEventbriteEvent,
  preferredLocale: string | null,
): AttendeeEmailEventInfo | null {
  const id = rawEvent.id;
  const eventName = rawEvent.name?.text;
  if (!id || !eventName) return null;

  const html = rawEvent.description?.html || '';
  const fallbackLocale = preferredLocale && isEnabledLocale(preferredLocale) ? preferredLocale : null;
  const locale: LocaleCode = detectEventLocale(html) || fallbackLocale || 'en';

  return {
    eventbriteEventId: id,
    eventName,
    eventStartUtc: rawEvent.start?.utc || null,
    venueName: resolveVenueName(rawEvent.venue?.name, eventName),
    locale,
    affiliateUrls: extractXceedAffiliateUrls(html),
  };
}

export function evaluateAttendeeEligibility(candidate: DispatchCandidate, ctx: EligibilityContext): EligibilityVerdict {
  if (!candidate.email || !candidate.email.trim()) return { eligible: false, reason: 'no-email' };
  if (candidate.cancelled) return { eligible: false, reason: 'cancelled' };
  if (candidate.refunded) return { eligible: false, reason: 'refunded' };
  if (/not attending|deleted|transferred/i.test(candidate.status)) return { eligible: false, reason: 'not-attending' };
  if (!candidate.event) return { eligible: false, reason: 'no-event' };
  if (!candidate.event.eventStartUtc) return { eligible: false, reason: 'no-event-start' };
  if (candidate.event.eventStartUtc < ctx.nowIso) return { eligible: false, reason: 'event-past' };
  if (candidate.createdAt < ctx.activatedAt && !ctx.force) return { eligible: false, reason: 'pre-activation' };

  const contactId = crmContactId(normalizeCrmEmail(candidate.email), candidate.attendeeId);
  if (ctx.optedOutContactIds.has(contactId)) return { eligible: false, reason: 'opted-out' };

  return { eligible: true };
}

export interface DispatchOptions {
  mode: AttendeeEmailMode;
  dryRun?: boolean;
  force?: boolean;
  max?: number;
}

function emptyReport(mode: AttendeeEmailMode, transportLive: boolean, dryRun: boolean, activatedAt: string, processed: number): DispatchReport {
  return {
    ok: true,
    mode,
    transport: transportLive ? 'live' : 'dry_run',
    dryRun,
    activatedAt,
    processed,
    sent: 0,
    dryRunCount: 0,
    failed: 0,
    skipped: {},
    details: [],
  };
}

export async function dispatchCandidates(candidates: DispatchCandidate[], opts: DispatchOptions): Promise<DispatchReport> {
  const now = new Date().toISOString();
  const activatedAt = await ensureEmailActivation(now);

  const optedOutContactIds = new Set<string>();
  if (crmStorageConfigured()) {
    const db = await readCrmDatabase();
    for (const contact of Object.values(db.contacts)) {
      if (contact.emailMarketing.status === 'opted_out') optedOutContactIds.add(contact.id);
    }
  }

  const transportLive = emailTransportMode() === 'live';
  const maxSend = opts.max ?? (parseInt(process.env.EMAIL_MAX_PER_RUN || '', 10) || 50);

  const report = emptyReport(opts.mode, transportLive, Boolean(opts.dryRun), activatedAt, candidates.length);

  const recordSkip = (reason: EligibilitySkipReason, key: string, to: string, locale: string, orderId: string | null = null) => {
    report.skipped[reason] = (report.skipped[reason] || 0) + 1;
    if (report.details.length < 50) report.details.push({ key, to, locale, outcome: 'skip', reason, orderId });
  };

  let attempted = 0;
  // Il Blob e eventualmente consistente: read/claim ravvicinati sulla stessa
  // chiave nello stesso run possono non vedersi (duplicato reale osservato in
  // e2e con 2 attendee stessa email nello stesso ordine). Dedupe in-memory.
  const attemptedKeys = new Set<string>();

  for (const candidate of candidates) {
    const ctx: EligibilityContext = { activatedAt, nowIso: now, force: Boolean(opts.force), optedOutContactIds };
    const verdict = evaluateAttendeeEligibility(candidate, ctx);

    if (!verdict.eligible) {
      recordSkip(verdict.reason, candidate.attendeeId, candidate.email || '', candidate.event?.locale || '', candidate.orderId);
      continue;
    }

    // evaluateAttendeeEligibility already guarantees event/email are non-null here.
    const event = candidate.event as AttendeeEmailEventInfo;
    const email = candidate.email as string;
    let key = '';
    let claimed = false;
    let claimEntry: AttendeeEmailLedgerEntry | null = null;

    try {
      key = emailLedgerKey(event.eventbriteEventId, email);
      if (attemptedKeys.has(key)) {
        recordSkip('in-flight', key, email, event.locale, candidate.orderId);
        continue;
      }
      const entry = await readLedgerEntry(key);
      if (!shouldAttempt(entry, transportLive, now)) {
        recordSkip(entry?.status === 'sent' ? 'already-sent' : 'in-flight', key, email, event.locale, candidate.orderId);
        continue;
      }

      if (attempted >= maxSend) {
        recordSkip('max-reached', key, email, event.locale, candidate.orderId);
        continue;
      }
      attempted += 1;
      attemptedKeys.add(key);

      if (opts.dryRun) {
        report.dryRunCount += 1;
        if (report.details.length < 50) {
          report.details.push({ key, to: normalizeCrmEmail(email) || email, locale: event.locale, outcome: 'would-send', orderId: candidate.orderId });
        }
        continue;
      }

      claimEntry = {
        key,
        attendeeId: candidate.attendeeId,
        orderId: candidate.orderId,
        eventbriteEventId: event.eventbriteEventId,
        emailHash: emailHashFull(email),
        to: normalizeCrmEmail(email) || email,
        locale: event.locale,
        status: 'pending',
        mode: opts.mode,
        createdAt: entry?.createdAt || now,
        updatedAt: now,
        providerMessageId: null,
        error: null,
      };
      const claimResult = await claimLedgerEntry(claimEntry);
      claimed = true;

      if (claimResult === 'exists') {
        const refreshed = await readLedgerEntry(key);
        if (!shouldAttempt(refreshed, transportLive, now)) {
          recordSkip(refreshed?.status === 'sent' ? 'already-sent' : 'in-flight', key, email, event.locale);
          continue;
        }
      }

      const recipient: AttendeeEmailRecipient = {
        attendeeId: candidate.attendeeId,
        orderId: candidate.orderId,
        contactId: crmContactId(normalizeCrmEmail(email), candidate.attendeeId),
        email: normalizeCrmEmail(email) || email,
        firstName: candidate.firstName,
        name: candidate.name,
      };

      const rendered = renderAttendeeEmail(event, recipient);
      const result = await sendAttendeeEmail({
        to: recipient.email,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        listUnsubscribeUrl: rendered.unsubscribeUrl,
      });

      const status: AttendeeEmailStatus = result.outcome === 'sent' ? 'sent' : result.outcome === 'dry_run' ? 'dry_run' : 'failed';
      await finalizeLedgerEntry({
        ...claimEntry,
        status,
        to: result.effectiveTo,
        providerMessageId: result.providerMessageId || null,
        error: result.error || null,
        updatedAt: new Date().toISOString(),
      });

      if (status === 'sent') report.sent += 1;
      else if (status === 'dry_run') report.dryRunCount += 1;
      else report.failed += 1;

      if (report.details.length < 50) {
        report.details.push({ key, to: result.effectiveTo, locale: event.locale, outcome: result.outcome, orderId: candidate.orderId });
      }
    } catch (error) {
      report.failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      if (report.details.length < 50) {
        report.details.push({ key, to: email, locale: event.locale, outcome: 'error', reason: message.slice(0, 200) });
      }
      if (claimed && claimEntry) {
        try {
          await finalizeLedgerEntry({ ...claimEntry, status: 'failed', error: message.slice(0, 500), updatedAt: new Date().toISOString() });
        } catch {
          // best-effort: a ledger write failure here must not mask the original error
        }
      }
    }
  }

  report.ok = report.failed === 0;
  return report;
}

/** Forma minimale dell'attendee Eventbrite (expand=attendees / organizations attendees feed). */
export interface RawAttendee {
  id: string;
  created?: string;
  status?: string;
  cancelled?: boolean;
  refunded?: boolean;
  order_id?: string;
  profile?: {
    name?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  event_id?: string;
  event?: RawEventbriteEvent;
}

function cleanSpace(value: string | null | undefined): string | null {
  const clean = value?.replace(/\s+/g, ' ').trim() || '';
  return clean || null;
}

export function mapRawAttendee(raw: RawAttendee, event: AttendeeEmailEventInfo | null): DispatchCandidate {
  const firstName = cleanSpace(raw.profile?.first_name);
  const lastName = cleanSpace(raw.profile?.last_name);
  const composedName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
  const name = cleanSpace(raw.profile?.name) || composedName || null;

  return {
    attendeeId: raw.id,
    orderId: raw.order_id || null,
    createdAt: raw.created || '',
    status: raw.status || '',
    cancelled: Boolean(raw.cancelled),
    refunded: Boolean(raw.refunded),
    email: cleanSpace(raw.profile?.email),
    firstName,
    name,
    event,
  };
}

export async function dispatchForOrderApiUrl(
  apiUrl: string,
  opts: DispatchOptions & { attendeeIndex?: number },
): Promise<DispatchReport> {
  const normalizedUrl = validateOrderApiUrl(apiUrl);
  if (!normalizedUrl) throw new Error(`Invalid Eventbrite order API URL: ${apiUrl}`);

  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  const orderRes = await fetch(`${normalizedUrl}?expand=attendees`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!orderRes.ok) {
    throw new Error(`Eventbrite order fetch failed: HTTP ${orderRes.status} ${(await orderRes.text()).slice(0, 200)}`);
  }
  const order = await orderRes.json();

  const eventId: string | undefined = order.event_id;
  if (!eventId) throw new Error('Eventbrite order response is missing event_id');

  const eventRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/?expand=venue`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!eventRes.ok) {
    throw new Error(`Eventbrite event fetch failed: HTTP ${eventRes.status} ${(await eventRes.text()).slice(0, 200)}`);
  }
  const rawEvent = await eventRes.json();

  const info = resolveEventInfo(rawEvent, null);
  const attendees: RawAttendee[] = order.attendees || [];
  const candidates = attendees.map((raw) => mapRawAttendee(raw, info));

  return dispatchCandidates(candidates, opts);
}

function sinceIsoNoMillis(hours: number): string {
  const date = new Date(Date.now() - hours * 60 * 60 * 1000);
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export async function sweepRecentAttendees(opts: DispatchOptions & { sinceHours?: number }): Promise<DispatchReport> {
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  const sinceHours = opts.sinceHours ?? (parseInt(process.env.EMAIL_SWEEP_SINCE_HOURS || '', 10) || 72);
  const since = sinceIsoNoMillis(sinceHours);
  const base = `${EVENTBRITE_API}/organizations/${ORG}/attendees/?expand=event&changed_since=${since}`;

  const candidates: DispatchCandidate[] = [];
  let continuation: string | undefined;

  for (let page = 1; page <= 50; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      throw new Error(`Eventbrite attendees sweep failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    }

    const body = await res.json();
    const attendees: RawAttendee[] = body.attendees || [];

    for (const attendee of attendees) {
      // preferredLocale del contatto CRM non consultato qui per semplicita:
      // resolveEventInfo ricade su 'en' in assenza di marker; se attendee.event
      // manca, resolveEventInfo({}, null) ritorna null (id/name.text assenti).
      const info = resolveEventInfo(attendee.event ?? {}, null);
      candidates.push(mapRawAttendee(attendee, info));
    }

    continuation = body.pagination?.has_more_items ? body.pagination?.continuation : undefined;
    if (!continuation) break;
  }

  return dispatchCandidates(candidates, opts);
}

/** Confronto a tempo costante per secret passati in query. */
export function secureCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

function maskWebhookUrl(url: string): string {
  return url.replace(/([?&]k=)[^&\s]+/g, '$1***');
}

export interface EventbriteWebhookSummary {
  id: string;
  actions: string;
  endpointUrl: string;
}

interface RawEventbriteWebhook {
  id?: string | number;
  endpoint_url?: string;
  actions?: string | string[];
}

async function fetchEventbriteWebhooks(token: string): Promise<RawEventbriteWebhook[]> {
  const res = await fetch(`${EVENTBRITE_API}/organizations/${ORG}/webhooks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Eventbrite webhooks list failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
  const body = await res.json();
  return (body.webhooks || []) as RawEventbriteWebhook[];
}

/** Lista dei webhook Eventbrite dell'organizzazione, con secret mascherato. */
export async function listEventbriteWebhooks(): Promise<EventbriteWebhookSummary[]> {
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');
  const webhooks = await fetchEventbriteWebhooks(token);
  return webhooks.map((webhook) => ({
    id: String(webhook.id ?? ''),
    actions: Array.isArray(webhook.actions) ? webhook.actions.join(',') : (webhook.actions || ''),
    endpointUrl: maskWebhookUrl(webhook.endpoint_url || ''),
  }));
}

export interface EnsureWebhookResult {
  outcome: 'created' | 'exists' | 'rotated';
  id: string;
  endpointUrl: string;
}

/**
 * Auto-provisioning del webhook order.placed: idempotente, ruota i webhook
 * con stesso path ma secret diverso. Gira in produzione col token gia in env.
 */
export async function ensureAttendeeEmailWebhook(endpointUrl: string): Promise<EnsureWebhookResult> {
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  const webhooks = await fetchEventbriteWebhooks(token);
  const targetPath = endpointUrl.split('?')[0];

  const identical = webhooks.find((webhook) => webhook.endpoint_url === endpointUrl
    && (Array.isArray(webhook.actions) ? webhook.actions.join(',') : webhook.actions || '').includes('order.placed'));
  if (identical?.id) {
    return { outcome: 'exists', id: String(identical.id), endpointUrl: maskWebhookUrl(endpointUrl) };
  }

  const stale = webhooks.filter((webhook) => (webhook.endpoint_url || '').split('?')[0] === targetPath);
  for (const webhook of stale) {
    if (!webhook.id) continue;
    const res = await fetch(`${EVENTBRITE_API}/webhooks/${webhook.id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok && res.status !== 404) {
      throw new Error(`Eventbrite webhook delete failed: HTTP ${res.status}`);
    }
  }

  const createRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG}/webhooks/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ endpoint_url: endpointUrl, actions: 'order.placed' }),
  });
  if (!createRes.ok) {
    throw new Error(`Eventbrite webhook create failed: HTTP ${createRes.status} ${(await createRes.text()).slice(0, 200)}`);
  }
  const created = await createRes.json();

  return {
    outcome: stale.length > 0 ? 'rotated' : 'created',
    id: String(created.id ?? ''),
    endpointUrl: maskWebhookUrl(endpointUrl),
  };
}
