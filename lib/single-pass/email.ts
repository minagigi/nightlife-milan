import type { EmailMessage } from '@/lib/attendeeEmailTypes';
import { localePrefix } from '@/lib/i18n/locales';
import { SITE_CONTACT } from '@/config/contact';
import { formatEurFromCents } from './catalog';
import { formatMinorCurrency } from './currency';
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
  const thankYouUrl = `${baseUrl}${lp}/thank-you?order=${encodeURIComponent(order.id)}`;
  const isIt = order.locale === 'it';
  const paidCur = (order.presentmentCurrency || 'EUR').toUpperCase();
  const paidStr = formatMinorCurrency(
    order.presentmentTotalMinor ?? order.totalCents,
    paidCur,
    order.locale,
  );
  const eurStr = formatEurFromCents(order.totalCents, order.locale);
  const hasCapodannoPass = order.items.some((i) =>
    ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'voya', 'justme-garda'].includes(
      i.venueId,
    ),
  );

  const subject = isIt
    ? `Nightlife Milan · Conferma Ordine #${order.id}`
    : `Nightlife Milan · Order Confirmed #${order.id}`;

  const linesHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #222;color:#F6F1E7;">
            <strong>${escapeHtml(item.venueName)}</strong><br/>
            <span style="color:#C2B9AA;font-size:13px;">${escapeHtml(item.title)} x ${item.quantity} (${item.totalGuests || item.quantity} pax)${item.dietaryChoice ? ` · ${escapeHtml(item.dietaryChoice)}` : ''}</span>
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
      NIGHTLIFE MILAN · MAGISTER MIDA LLC
    </p>
    <h1 style="margin:0 0 16px;font-size:24px;color:#F6F1E7;">
      ${escapeHtml(isIt ? `Ordine confermato per ${order.customer.fullName}` : `Booking confirmed for ${order.customer.fullName}`)}
    </h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#C2B9AA;">
      ${escapeHtml(
        isIt
          ? 'Il pagamento online è stato registrato e confermato con successo. Conserva questa ricevuta e accedi in qualsiasi momento alla tua Area Riservata o alla pagina voucher.'
          : 'Your online payment has been completed and confirmed. Keep this official voucher email and open your Reserved Area anytime.',
      )}
    </p>
    <div style="background:#141210;border:1px solid #2B2720;padding:14px 16px;margin-bottom:20px;font-size:14px;line-height:1.6;">
      <div><strong>${escapeHtml(copy.orderIdLabel)}:</strong> ${escapeHtml(order.id)}</div>
      <div><strong>PIN:</strong> ${escapeHtml(order.accessPin)}</div>
      <div><strong>${escapeHtml(copy.guestsLabel)}:</strong> ${order.totalHeadcount || order.items.reduce((s, i) => s + (i.totalGuests || i.quantity), 0)}</div>
      <div><strong>Email:</strong> ${escapeHtml(order.customer.email)}</div>
      <div><strong>WhatsApp / Tel:</strong> ${escapeHtml(order.customer.whatsapp)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:14px;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #333;color:#8E8577;">Package</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #333;color:#8E8577;">Base EUR</th>
        </tr>
      </thead>
      <tbody>${linesHtml}</tbody>
      <tfoot>
        <tr>
          <td style="padding:10px 8px;color:#C2B9AA;">${escapeHtml(copy.feeLabel)}</td>
          <td style="padding:10px 8px;text-align:right;color:#EAE3D5;">${escapeHtml(formatEurFromCents(order.feeCents, order.locale))}</td>
        </tr>
        <tr>
          <td style="padding:12px 8px;border-top:1px solid #444;font-weight:bold;color:#F6F1E7;">${escapeHtml(copy.totalLabel)} (EUR)</td>
          <td style="padding:12px 8px;border-top:1px solid #444;text-align:right;font-weight:bold;color:#F6F1E7;">${escapeHtml(eurStr)}</td>
        </tr>
        ${
          paidCur !== 'EUR'
            ? `<tr>
          <td style="padding:8px;color:#C9A84C;font-weight:bold;">${escapeHtml(copy.chargedInCurrencyLabel)} (${escapeHtml(paidCur)})</td>
          <td style="padding:8px;text-align:right;color:#C9A84C;font-weight:bold;">${escapeHtml(paidStr)} (FX 1 EUR = ${order.fxRate?.toFixed(4)})</td>
        </tr>`
            : ''
        }
      </tfoot>
    </table>
    ${
      hasCapodannoPass
        ? `<div style="background:#141210;border-left:3px solid #25D366;padding:12px 14px;margin-bottom:22px;font-size:13px;line-height:1.5;color:#EAE3D5;">
      ${escapeHtml(copy.miniGroupNoticeBody)}
    </div>`
        : ''
    }
    <p style="margin:0 0 18px;">
      <a href="${escapeHtml(thankYouUrl)}" style="display:inline-block;background:#F6F1E7;color:#050505;padding:12px 20px;font-weight:bold;text-decoration:none;text-transform:uppercase;font-size:12px;letter-spacing:1px;margin-right:10px;">
        ${escapeHtml(copy.viewVoucherCta)}
      </a>
      <a href="${escapeHtml(accountUrl)}" style="display:inline-block;border:1px solid #F6F1E7;color:#F6F1E7;padding:11px 18px;font-weight:bold;text-decoration:none;text-transform:uppercase;font-size:12px;letter-spacing:1px;">
        ${escapeHtml(copy.navAccountLabel)}
      </a>
    </p>
    <p style="margin:0 0 10px;font-size:12px;color:#8E8577;">
      Concierge 24/7: ${escapeHtml(SITE_CONTACT.whatsapp.number)} · concierge@nightlifemilan.com
    </p>
    <p style="margin:0;font-size:11px;line-height:1.45;color:#6E675C;border-top:1px solid #222;padding-top:10px;">
      nightlifemilan.com is a brand owned and operated by Magister Mida LLC · 447 Broadway, 2nd Floor #2242, New York, NY 10013, USA · Federal EIN 36-5071848 · Wyoming Filing ID 2023-001288676.
    </p>
  </div>
</body>
</html>`;

  const text = [
    `NIGHTLIFE MILAN · MAGISTER MIDA LLC · ${order.id}`,
    `PIN: ${order.accessPin}`,
    `Guest: ${order.customer.fullName} (${order.customer.whatsapp}, ${order.customer.email})`,
    ...order.items.map(
      (i) => `- ${i.venueName}: ${i.title} x${i.quantity} (${i.totalGuests || i.quantity} pax) = ${formatEurFromCents(i.lineBaseCents, order.locale)}`,
    ),
    `${copy.feeLabel}: ${formatEurFromCents(order.feeCents, order.locale)}`,
    `${copy.totalLabel} (EUR): ${eurStr}`,
    ...(paidCur !== 'EUR' ? [`Charged in ${paidCur}: ${paidStr} (1 EUR = ${order.fxRate})`] : []),
    ...(hasCapodannoPass ? ['', copy.miniGroupNoticeBody] : []),
    '',
    `Voucher: ${thankYouUrl}`,
    `Reserved Area: ${accountUrl}`,
    `Concierge 24/7: ${SITE_CONTACT.whatsapp.number}`,
    'nightlifemilan.com is a brand of Magister Mida LLC · 447 Broadway, 2nd Floor #2242, New York, NY 10013, USA · EIN 36-5071848',
  ].join('\n');

  return {
    to: order.customer.email,
    subject,
    html,
    text,
    idempotencyKey: `nlm-sp-confirm-${order.id}`,
  };
}
