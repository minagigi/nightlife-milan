import type { EmailMessage } from '@/lib/attendeeEmailTypes';
import { localePrefix } from '@/lib/i18n/locales';
import { SITE_CONTACT } from '@/config/contact';
import { formatEurFromCents } from './catalog';
import { getSinglePassCopy } from './i18n35';
import type { SinglePassOrder } from './types';

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildSinglePassOrderEmail(
  order: SinglePassOrder,
  baseUrl = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, ''),
): EmailMessage {
  const lp = localePrefix(order.locale);
  const copy = getSinglePassCopy(order.locale);
  const accountUrl = `${baseUrl}${lp}/account`;
  const isIt = order.locale === 'it';

  const subject = isIt
    ? `Nightlife Milan · Single Pass Capodanno 2027 Confermato (${order.id})`
    : `Nightlife Milan · NYE 2027 Single Pass Confirmed (${order.id})`;

  const linesHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #222;color:#F6F1E7;">
            <strong>${escapeHtml(item.venueName)}</strong><br/>
            <span style="color:#C2B9AA;font-size:13px;">${escapeHtml(item.title)} x ${item.quantity}${item.dietaryChoice ? ` (${escapeHtml(item.dietaryChoice)})` : ''}</span>
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #222;text-align:right;color:#F6F1E7;white-space:nowrap;">
            ${escapeHtml(formatEurFromCents(item.lineBaseCents, order.locale))}
          </td>
        </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#050505;color:#F6F1E7;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;border:1px solid #2B2720;background:#0B0A09;padding:28px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#EAE3D5;">
      NIGHTLIFE MILAN · CAPODANNO 2027 SINGLE PASS
    </p>
    <h1 style="margin:0 0 16px;font-size:24px;color:#F6F1E7;">
      ${escapeHtml(isIt ? `Pass confermato per ${order.customer.fullName}` : `Pass confirmed for ${order.customer.fullName}`)}
    </h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#C2B9AA;">
      ${escapeHtml(isIt ? 'Il pagamento su Stripe è stato registrato. Conserva questa email e accedi in qualsiasi momento alla tua Area Riservata.' : 'Your Stripe payment is confirmed. Save this email and open your Reserved Area anytime.')}
    </p>
    <div style="background:#050505;border:1px solid #3D3830;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;color:#C2B9AA;">${escapeHtml(copy.orderCodeLabel)}: <strong style="color:#F6F1E7;">${escapeHtml(order.id)}</strong></p>
      <p style="margin:0 0 6px;font-size:12px;color:#C2B9AA;">PIN: <strong style="color:#F6F1E7;">${escapeHtml(order.accessPin)}</strong></p>
      <p style="margin:0;font-size:12px;color:#C2B9AA;">WhatsApp (20/12/2026+): <strong style="color:#F6F1E7;">${escapeHtml(order.customer.whatsapp)}</strong></p>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:14px;">
      ${linesHtml}
      <tr>
        <td style="padding:10px 8px;color:#C2B9AA;">${escapeHtml(copy.feeLabel)}</td>
        <td style="padding:10px 8px;text-align:right;color:#EAE3D5;white-space:nowrap;">${escapeHtml(formatEurFromCents(order.feeCents, order.locale))}</td>
      </tr>
      <tr>
        <td style="padding:12px 8px;border-top:1px solid #EAE3D5;font-weight:bold;color:#F6F1E7;">${escapeHtml(copy.totalLabel)}</td>
        <td style="padding:12px 8px;border-top:1px solid #EAE3D5;text-align:right;font-weight:bold;color:#F6F1E7;white-space:nowrap;">${escapeHtml(formatEurFromCents(order.totalCents, order.locale))}</td>
      </tr>
    </table>
    <div style="background:#F6F1E7;color:#050505;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">
        ${escapeHtml(copy.miniGroupHeading)}
      </p>
      <p style="margin:0;font-size:13px;line-height:1.5;">
        ${escapeHtml(copy.miniGroupScheduledBody)}
      </p>
    </div>
    <p style="margin:0 0 20px;">
      <a href="${escapeHtml(accountUrl)}" style="display:inline-block;background:#F6F1E7;color:#050505;padding:12px 20px;font-weight:bold;text-decoration:none;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
        ${escapeHtml(copy.navAccountLabel)}
      </a>
    </p>
    <p style="margin:0;font-size:12px;color:#847C6F;">
      Concierge WhatsApp 24/7: ${escapeHtml(SITE_CONTACT.whatsapp.number)} · ${escapeHtml(SITE_CONTACT.email)} · WWW.NIGHTLIFEMILAN.COM
    </p>
  </div>
</body>
</html>`;

  const textLines = order.items
    .map(
      (i) => `- ${i.venueName} | ${i.title} x ${i.quantity}: ${formatEurFromCents(i.lineBaseCents, order.locale)}`,
    )
    .join('\n');

  const text = [
    `NIGHTLIFE MILAN · SINGLE PASS CAPODANNO 2027`,
    `${copy.orderCodeLabel}: ${order.id} (PIN: ${order.accessPin})`,
    `${order.customer.fullName} · WhatsApp: ${order.customer.whatsapp}`,
    '',
    textLines,
    `${copy.feeLabel}: ${formatEurFromCents(order.feeCents, order.locale)}`,
    `${copy.totalLabel}: ${formatEurFromCents(order.totalCents, order.locale)}`,
    '',
    `${copy.miniGroupHeading}: ${copy.miniGroupScheduledBody}`,
    `${copy.navAccountLabel}: ${accountUrl}`,
    `WhatsApp Concierge: ${SITE_CONTACT.whatsapp.number} · ${SITE_CONTACT.email}`,
  ].join('\n');

  return {
    to: order.customer.email,
    subject,
    html,
    text,
  };
}
