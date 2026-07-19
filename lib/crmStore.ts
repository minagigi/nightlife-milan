import { get, put } from '@vercel/blob';
import {
  emptyCrmDatabase,
  type CrmDatabase,
  type CrmPermissionStatus,
} from './crmModel';

const CRM_DATABASE_PATH = 'crm/v1/database.json';

export function crmStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readCrmDatabase(): Promise<CrmDatabase> {
  if (!crmStorageConfigured()) return emptyCrmDatabase();
  try {
    const result = await get(CRM_DATABASE_PATH, {
      access: 'private',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return emptyCrmDatabase();
    const parsed = JSON.parse(await new Response(result.stream).text()) as CrmDatabase;
    if (parsed.version !== 1) throw new Error(`Unsupported CRM database version: ${String(parsed.version)}`);
    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404/i.test(message)) return emptyCrmDatabase();
    throw error;
  }
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

