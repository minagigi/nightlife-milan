// Tipi condivisi del sistema email post-registrazione Eventbrite.
// Contratto congelato (Sol): i moduli implementano ESATTAMENTE queste firme.
// Flusso: webhook order.placed / sweep orario -> eleggibilita -> ledger Blob
// idempotente -> render localizzato -> transport (Resend o dry-run).
import type { LocaleCode } from './i18n/locales';

export const EMAIL_LEDGER_ACTIVATION_PATH = 'crm/v1/email/activation.json';
export const EMAIL_LEDGER_SENT_PREFIX = 'crm/v1/email/sent/';

export type AttendeeEmailStatus = 'pending' | 'sent' | 'dry_run' | 'failed';
export type AttendeeEmailMode = 'webhook' | 'sweep' | 'manual';

export interface AttendeeEmailEventInfo {
  eventbriteEventId: string;
  eventName: string;
  /** ISO UTC di inizio evento (event.start.utc) */
  eventStartUtc: string | null;
  venueName: string | null;
  /** Locale del listing (marker nlm) con fallback gia applicato */
  locale: LocaleCode;
  /** Solo URL affiliati verificati channel/nightlifemilan-1 (puo essere vuoto) */
  affiliateUrls: string[];
}

export interface AttendeeEmailRecipient {
  attendeeId: string;
  orderId: string | null;
  /** crmContactId(email, attendeeId) da lib/crmModel */
  contactId: string;
  email: string;
  firstName: string | null;
  name: string | null;
}

export interface RenderedAttendeeEmail {
  subject: string;
  html: string;
  text: string;
  unsubscribeUrl: string;
}

/** Stringhe nuove per l'email, per locale. Placeholder letterali: {event} {name} {phone} */
export interface AttendeeEmailCopy {
  /** contiene {event} */
  subject: string;
  /** contiene {name} */
  greeting: string;
  greetingNoName: string;
  /** contiene {event} */
  intro: string;
  detailsHeading: string;
  /** contiene {phone} */
  whatsappCta: string;
  unsubscribeLabel: string;
  /** perche ricevi questa email: registrazione Eventbrite a questo evento, mittente Nightlife Milan */
  whyReceiving: string;
  unsubscribeDoneTitle: string;
  unsubscribeDoneBody: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  listUnsubscribeUrl?: string;
}

export interface EmailTransportResult {
  outcome: 'sent' | 'dry_run' | 'failed';
  /** Destinatario effettivo dopo EMAIL_TEST_OVERRIDE */
  effectiveTo: string;
  providerMessageId?: string;
  error?: string;
}

export interface AttendeeEmailLedgerEntry {
  /** `${eventbriteEventId}-${sha256(email).slice(0,16)}` */
  key: string;
  attendeeId: string;
  orderId: string | null;
  eventbriteEventId: string;
  /** sha256 hex completo dell'email normalizzata */
  emailHash: string;
  /** destinatario effettivo dell'invio */
  to: string;
  locale: LocaleCode;
  status: AttendeeEmailStatus;
  mode: AttendeeEmailMode;
  createdAt: string;
  updatedAt: string;
  providerMessageId: string | null;
  error: string | null;
}

export interface DispatchCandidate {
  attendeeId: string;
  orderId: string | null;
  /** attendee.created ISO */
  createdAt: string;
  /** status Eventbrite grezzo (es. 'Attending') */
  status: string;
  cancelled: boolean;
  refunded: boolean;
  email: string | null;
  firstName: string | null;
  name: string | null;
  /** null se i dati evento non sono risolvibili */
  event: AttendeeEmailEventInfo | null;
}

export type EligibilitySkipReason =
  | 'no-email'
  | 'cancelled'
  | 'refunded'
  | 'not-attending'
  | 'no-event'
  | 'no-event-start'
  | 'event-past'
  | 'pre-activation'
  | 'opted-out'
  | 'already-sent'
  | 'in-flight'
  | 'max-reached';

export interface EligibilityContext {
  /** prima attivazione del sistema: niente backfill prima di questa data */
  activatedAt: string;
  nowIso: string;
  /** true solo per dispatch manuale di test su ordine specifico */
  force: boolean;
  optedOutContactIds: ReadonlySet<string>;
}

export type EligibilityVerdict =
  | { eligible: true }
  | { eligible: false; reason: EligibilitySkipReason };

export interface DispatchReport {
  ok: boolean;
  mode: AttendeeEmailMode;
  transport: 'live' | 'dry_run';
  dryRun: boolean;
  activatedAt: string;
  processed: number;
  sent: number;
  dryRunCount: number;
  failed: number;
  skipped: Partial<Record<EligibilitySkipReason, number>>;
  /** dettagli capped a 50 voci */
  details: Array<{ key: string; to: string; locale: string; outcome: string; reason?: string; orderId?: string | null }>;
}
