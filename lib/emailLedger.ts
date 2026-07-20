// Ledger idempotente su Vercel Blob privato per il sistema email attendee.
// Stesso pattern I/O di lib/crmStore.ts: access 'private', token BLOB_READ_WRITE_TOKEN,
// addRandomSuffix:false, contentType application/json.
import { get, put } from '@vercel/blob';
import { createHash } from 'node:crypto';
import {
  EMAIL_LEDGER_ACTIVATION_PATH,
  EMAIL_LEDGER_SENT_PREFIX,
  type AttendeeEmailLedgerEntry,
} from './attendeeEmailTypes';

const PENDING_IN_FLIGHT_MS = 60 * 60 * 1000;

export function emailStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function emailHashFull(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

export function emailLedgerKey(eventbriteEventId: string, email: string): string {
  return `${eventbriteEventId}-${emailHashFull(email).slice(0, 16)}`;
}

function isNotFoundError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /not found|404/i.test(message);
}

export async function readEmailActivation(): Promise<string | null> {
  if (!emailStorageConfigured()) return null;
  try {
    const result = await get(EMAIL_LEDGER_ACTIVATION_PATH, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const parsed = JSON.parse(await new Response(result.stream).text()) as { activatedAt: string };
    return parsed.activatedAt ?? null;
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

// Create-if-not-exists: se un altro run vince la race sul put (allowOverwrite:false),
// rilegge il valore gia scritto invece di fallire. Se la rilettura non trova nulla
// l'errore originale non e una race benigna e va rilanciato.
export async function ensureEmailActivation(nowIso: string): Promise<string> {
  if (!emailStorageConfigured()) return nowIso;

  const existing = await readEmailActivation();
  if (existing) return existing;

  try {
    await put(EMAIL_LEDGER_ACTIVATION_PATH, JSON.stringify({ activatedAt: nowIso }), {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    });
    return nowIso;
  } catch (error) {
    const reread = await readEmailActivation();
    if (reread) return reread;
    throw error;
  }
}

export async function readLedgerEntry(key: string): Promise<AttendeeEmailLedgerEntry | null> {
  if (!emailStorageConfigured()) return null;
  try {
    const result = await get(`${EMAIL_LEDGER_SENT_PREFIX}${key}.json`, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return JSON.parse(await new Response(result.stream).text()) as AttendeeEmailLedgerEntry;
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
}

// Claim idempotente: allowOverwrite:false garantisce che solo UN chiamante
// vinca la creazione. Su qualsiasi errore si rilegge la entry: se e leggibile
// un altro run l'ha gia reclamata ('exists'), altrimenti l'errore e reale.
export async function claimLedgerEntry(entry: AttendeeEmailLedgerEntry): Promise<'claimed' | 'exists'> {
  try {
    await put(`${EMAIL_LEDGER_SENT_PREFIX}${entry.key}.json`, JSON.stringify(entry), {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    });
    return 'claimed';
  } catch (error) {
    const reread = await readLedgerEntry(entry.key);
    if (reread) return 'exists';
    throw error;
  }
}

export async function finalizeLedgerEntry(entry: AttendeeEmailLedgerEntry): Promise<void> {
  await put(`${EMAIL_LEDGER_SENT_PREFIX}${entry.key}.json`, JSON.stringify(entry), {
    access: 'private',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export function shouldAttempt(
  entry: AttendeeEmailLedgerEntry | null,
  transportLive: boolean,
  nowIso: string,
): boolean {
  if (!entry) return true;
  if (entry.status === 'sent') return false;
  if (entry.status === 'failed') return true;
  if (entry.status === 'dry_run') return transportLive;

  // status 'pending': in volo se aggiornato meno di 60 minuti fa.
  const ageMs = new Date(nowIso).getTime() - new Date(entry.updatedAt).getTime();
  return ageMs > PENDING_IN_FLIGHT_MS;
}
