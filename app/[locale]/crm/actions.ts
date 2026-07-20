'use server';

import { revalidatePath } from 'next/cache';
import { syncEventbriteCrm } from '@/lib/eventbriteCrm';
import { setCrmEmailMarketingStatus } from '@/lib/crmStore';
import type { CrmPermissionStatus } from '@/lib/crmModel';

const PERMISSION_STATUSES = new Set<CrmPermissionStatus>(['opted_in', 'not_opted_in', 'opted_out']);

export async function syncCrmFromEventbrite(): Promise<void> {
  await syncEventbriteCrm();
  revalidatePath('/', 'layout');
}

export async function updateCrmEmailPermission(formData: FormData): Promise<void> {
  const contactId = String(formData.get('contactId') || '').trim();
  const status = String(formData.get('status') || '') as CrmPermissionStatus;
  if (!/^(?:[a-f0-9]{64}|eventbrite-[A-Za-z0-9_-]+)$/.test(contactId)) return;
  if (!PERMISSION_STATUSES.has(status)) return;
  await setCrmEmailMarketingStatus(contactId, status);
  revalidatePath('/', 'layout');
}

