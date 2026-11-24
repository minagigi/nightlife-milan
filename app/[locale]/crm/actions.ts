'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireCrmActionSession } from '@/lib/crmAuthVault';
import type { CrmPermissionStatus } from '@/lib/crmModel';
import { setCrmEmailMarketingStatus } from '@/lib/crmStore';
import {
  deleteCartDraftById,
  deleteOrderById,
  getOrderById,
  saveOrder,
} from '@/lib/single-pass/store';
import { reconcileEcommerceWithGateway } from '@/lib/single-pass/stripe';
import type { WhatsappMiniGroupStatus } from '@/lib/single-pass/types';

const PERMISSION_STATUSES = new Set<CrmPermissionStatus>(['opted_in', 'not_opted_in', 'opted_out']);

function revalidateAllCrmViews(locale: string): void {
  const cleanLoc = locale && /^[a-z-]{2,8}$/i.test(locale) ? locale : 'it';
  revalidatePath(`/${cleanLoc}/crm`);
  revalidatePath('/crm');
  revalidatePath(`/${cleanLoc}/crm/single-pass`);
  revalidatePath('/crm/single-pass');
}

export async function updateCrmEmailPermission(formData: FormData): Promise<void> {
  await requireCrmActionSession();
  const contactId = String(formData.get('contactId') || '').trim();
  const status = String(formData.get('status') || '') as CrmPermissionStatus;
  if (!/^(?:[a-f0-9]{64}|eventbrite-[A-Za-z0-9_-]+)$/.test(contactId)) return;
  if (!PERMISSION_STATUSES.has(status)) return;
  await setCrmEmailMarketingStatus(contactId, status);
  revalidatePath('/', 'layout');
}

export async function reconcileCrmEcommerceAction(formData: FormData): Promise<void> {
  await requireCrmActionSession();
  const locale = String(formData.get('locale') || 'it').trim();
  const vista = String(formData.get('vista') || 'ecommerce').trim();
  const crmPath = locale === 'en' ? '/crm' : `/${locale}/crm`;

  const res = await reconcileEcommerceWithGateway(100);
  revalidateAllCrmViews(locale);

  const params = new URLSearchParams();
  if (vista && vista !== 'ecommerce') params.set('vista', vista);
  if (res.ok) {
    params.set(
      'sync',
      `ok:${res.scanned}:${res.markedPaid}:${res.markedFailed}:${res.markedCancelled}:${res.skippedErrors}`,
    );
  } else {
    const kind = res.errorKind || 'gateway';
    const cleanErr = (res.error || 'errore').replace(/:/g, ' ').slice(0, 90);
    params.set('sync', `err:${kind}:${cleanErr}`);
  }
  redirect(`${crmPath}?${params.toString()}`);
}

export async function deleteCrmOrderAction(formData: FormData): Promise<void> {
  await requireCrmActionSession();
  const orderId = String(formData.get('orderId') || '').trim();
  const locale = String(formData.get('locale') || 'it').trim();
  const confirmPaid = String(formData.get('confirmPaid') || '').trim();
  if (!orderId) return;

  const existing = await getOrderById(orderId);
  if (existing?.status === 'paid' && confirmPaid !== 'ELIMINA') {
    return;
  }

  await deleteOrderById(orderId);
  revalidateAllCrmViews(locale);
}

export async function deleteCrmCartDraftAction(formData: FormData): Promise<void> {
  await requireCrmActionSession();
  const cartSessionId = String(formData.get('cartSessionId') || '').trim();
  const locale = String(formData.get('locale') || 'it').trim();
  if (!cartSessionId) return;

  await deleteCartDraftById(cartSessionId);
  revalidateAllCrmViews(locale);
}

export async function updateCrmOrderWhatsappGroupAction(formData: FormData): Promise<void> {
  await requireCrmActionSession();
  const orderId = String(formData.get('orderId') || '').trim();
  const locale = String(formData.get('locale') || 'it').trim();
  const statusRaw = String(formData.get('whatsappGroupStatus') || 'scheduled_dec_20').trim();
  const inviteUrlRaw = String(formData.get('whatsappGroupInviteUrl') || '').trim();

  if (!orderId) return;
  const order = await getOrderById(orderId);
  if (!order) return;

  const validStatuses: ReadonlySet<WhatsappMiniGroupStatus> = new Set([
    'scheduled_dec_20',
    'invited',
    'active',
  ]);
  const whatsappGroupStatus: WhatsappMiniGroupStatus = validStatuses.has(
    statusRaw as WhatsappMiniGroupStatus,
  )
    ? (statusRaw as WhatsappMiniGroupStatus)
    : 'scheduled_dec_20';

  const safeInviteUrl =
    inviteUrlRaw && /^https:\/\/(chat\.whatsapp\.com|wa\.me)\//i.test(inviteUrlRaw)
      ? inviteUrlRaw.slice(0, 300)
      : null;

  await saveOrder({
    ...order,
    whatsappGroupStatus,
    whatsappGroupInviteUrl: safeInviteUrl,
    updatedAt: new Date().toISOString(),
  });

  revalidateAllCrmViews(locale);
}
