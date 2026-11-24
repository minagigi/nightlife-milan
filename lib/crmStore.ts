import { put } from '@vercel/blob';
import { readPrivateBlobJson } from './blobPrivateRead';
import {
  emptyCrmDatabase,
  type CrmDatabase,
  type CrmPermissionStatus,
} from './crmModel';

const CRM_DATABASE_PATH = 'crm/v1/database.json';

export function crmStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readCrmDatabase(opts?: {
  allowCachedFallbackOn5xx?: boolean;
}): Promise<CrmDatabase> {
  if (!crmStorageConfigured()) return emptyCrmDatabase();
  const parsed = await readPrivateBlobJson<CrmDatabase>(CRM_DATABASE_PATH, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
    useCache: false,
    allowCachedFallbackOn5xx: opts?.allowCachedFallbackOn5xx === true,
  });
  if (!parsed) return emptyCrmDatabase();
  if (parsed.version !== 1) {
    throw new Error(`Unsupported CRM database version: ${String(parsed.version)}`);
  }
  return parsed;
}

export async function writeCrmDatabase(database: CrmDatabase): Promise<void> {
  if (!crmStorageConfigured()) throw new Error('BLOB_READ_WRITE_TOKEN is required for the CRM');
  await put(CRM_DATABASE_PATH, JSON.stringify(database), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export async function setCrmEmailMarketingStatus(
  contactId: string,
  status: CrmPermissionStatus,
): Promise<CrmDatabase> {
  const database = await readCrmDatabase();
  const contact = database.contacts[contactId];
  if (!contact) throw new Error('CRM contact not found');
  const now = new Date().toISOString();
  contact.emailMarketing = { status, source: 'manual', updatedAt: now };
  contact.lastSeenAt = now;
  database.updatedAt = now;
  await writeCrmDatabase(database);
  return database;
}

