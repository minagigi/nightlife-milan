import type { EmailMessage } from '@/lib/attendeeEmailTypes';
import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { SITE_CONTACT } from '@/config/contact';
import { SINGLE_PASS_FEE_RATE, formatEurFromCents } from './catalog';
import { formatMinorCurrency } from './currency';
import { formatFeeLabel35, getSinglePassCopy, getTerrazzaCheckoutUi35 } from './i18n35';
import type { SinglePassOrder } from './types';

export const STAFF_ACTIVATION_EMAIL = 'staff@nightlifemilan.com';

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type OrderEmailLocaleStrings = {
  subjectPrefix: string;
  headingFor: (name: string) => string;
  introStandard: string;
  colPackage: string;
  colBaseEur: string;
  allergiesLabel: string;
};

const EMAIL_LOCALE_OVERRIDES: Partial<Record<LocaleCode, OrderEmailLocaleStrings>> = {
  it: {
    subjectPrefix: 'Conferma Ordine',
    headingFor: (n) => `Ordine registrato per ${n}`,
    introStandard:
      'Il pagamento online è stato registrato con successo. Conserva questa ricevuta e accedi in qualsiasi momento alla tua Area Riservata o alla pagina voucher.',
    colPackage: 'Pacchetto',
    colBaseEur: 'Tariffa EUR',
    allergiesLabel: 'Allergie / Note',
  },
  es: {
    subjectPrefix: 'Confirmación de Reserva',
    headingFor: (n) => `Reserva registrada para ${n}`,
    introStandard:
      'Tu pago online se ha registrado correctamente. Conserva este comprobante y accede en cualquier momento a tu Área Privada.',
    colPackage: 'Paquete',
    colBaseEur: 'Base EUR',
    allergiesLabel: 'Alergias / Notas',
  },
  fr: {
    subjectPrefix: 'Confirmation de Réservation',
    headingFor: (n) => `Réservation enregistrée pour ${n}`,
    introStandard:
      'Votre paiement en ligne a bien été enregistré. Conservez ce reçu officiel et ouvrez votre Espace Membre à tout moment.',
    colPackage: 'Formule',
    colBaseEur: 'Base EUR',
    allergiesLabel: 'Allergies / Notes',
  },
  de: {
    subjectPrefix: 'Buchungsbestätigung',
    headingFor: (n) => `Buchung erfasst für ${n}`,
    introStandard:
      'Ihre Online-Zahlung wurde erfolgreich registriert. Bewahren Sie diesen Beleg auf und öffnen Sie Ihren Kundenbereich jederzeit.',
    colPackage: 'Paket',
    colBaseEur: 'Basis EUR',
    allergiesLabel: 'Allergien / Hinweise',
  },
  pt: {
    subjectPrefix: 'Confirmação de Reserva',
    headingFor: (n) => `Reserva registada para ${n}`,
    introStandard:
      'O teu pagamento online foi registado com sucesso. Guarda este comprovativo e acede à tua Área Reservada.',
    colPackage: 'Pacote',
    colBaseEur: 'Base EUR',
    allergiesLabel: 'Alergias / Notas',
  },
  nl: {
    subjectPrefix: 'Boekingsbevestiging',
    headingFor: (n) => `Boeking geregistreerd voor ${n}`,
    introStandard:
      'Je online betaling is geregistreerd. Bewaar deze bevestiging en open je klantenzone op elk moment.',
    colPackage: 'Pakket',
    colBaseEur: 'Basis EUR',
    allergiesLabel: 'Allergieën / Notities',
  },
  ru: {
    subjectPrefix: 'Подтверждение заказа',
    headingFor: (n) => `Заказ оформлен на имя ${n}`,
    introStandard:
      'Ваш онлайн-платёж успешно зарегистрирован. Сохраните этот ваучер и открывайте Личный кабинет в любое время.',
    colPackage: 'Пакет',
    colBaseEur: 'База EUR',
    allergiesLabel: 'Аллергии / Примечания',
  },
  tr: {
    subjectPrefix: 'Rezervasyon Onayı',
    headingFor: (n) => `${n} için rezervasyon kaydedildi`,
    introStandard:
      'Online ödemeniz başarıyla kaydedildi. Bu resmi makbuzu saklayın ve hesabınıza istediğiniz zaman erişin.',
    colPackage: 'Paket',
    colBaseEur: 'Taban EUR',
    allergiesLabel: 'Alerjiler / Notlar',
  },
  zh: {
    subjectPrefix: '订单确认',
    headingFor: (n) => `${n} 的预订已登记`,
    introStandard:
      '您的在线支付已成功登记。请保留此官方凭证邮件，并可随时登录个人中心查看详情。',
    colPackage: '套餐',
    colBaseEur: '基础价 EUR',
    allergiesLabel: '过敏与备注',
  },
  ar: {
    subjectPrefix: 'تأكيد الحجز',
    headingFor: (n) => `تم تسجيل الحجز باسم ${n}`,
    introStandard:
      'تم تسجيل الدفع عبر الإنترنت بنجاح. احتفظ بهذا الإيصال الرسمي وافتح حسابك في أي وقت.',
    colPackage: 'الباقة',
    colBaseEur: 'السعر الأساسي EUR',
    allergiesLabel: 'الحساسية / الملاحظات',
  },
  pl: {
    subjectPrefix: 'Potwierdzenie rezerwacji',
    headingFor: (n) => `Rezerwacja zarejestrowana dla ${n}`,
    introStandard:
      'Twoja płatność online została pomyślnie zarejestrowana. Zachowaj ten voucher i otwieraj Moje konto w dowolnym momencie.',
    colPackage: 'Pakiet',
    colBaseEur: 'Baza EUR',
    allergiesLabel: 'Alergie / Uwagi',
  },
  ro: {
    subjectPrefix: 'Confirmare rezervare',
    headingFor: (n) => `Rezervare înregistrată pentru ${n}`,
    introStandard:
      'Plata ta online a fost înregistrată cu succes. Păstrează acest voucher și accesează Contul tău oricând.',
    colPackage: 'Pachet',
    colBaseEur: 'Bază EUR',
    allergiesLabel: 'Alergii / Note',
  },
  el: {
    subjectPrefix: 'Επιβεβαίωση κράτησης',
    headingFor: (n) => `Η κράτηση καταχωρήθηκε για ${n}`,
    introStandard:
      'Η ηλεκτρονική πληρωμή σας καταχωρήθηκε με επιτυχία. Κρατήστε αυτό το επίσημο voucher.',
    colPackage: 'Πακέτο',
    colBaseEur: 'Βάση EUR',
    allergiesLabel: 'Αλλεργίες / Σημειώσεις',
  },
  uk: {
    subjectPrefix: 'Підтвердження замовлення',
    headingFor: (n) => `Замовлення оформлено для ${n}`,
    introStandard:
      'Ваш онлайн-платіж успішно зареєстровано. Збережіть цей ваучер та відкривайте Особистий кабінет у будь-який час.',
    colPackage: 'Пакет',
    colBaseEur: 'База EUR',
    allergiesLabel: 'Алергії / Примітки',
  },
};

const DEFAULT_EMAIL_STRINGS: OrderEmailLocaleStrings = {
  subjectPrefix: 'Order Confirmed',
  headingFor: (n) => `Booking recorded for ${n}`,
  introStandard:
    'Your online payment has been completed and registered. Keep this official voucher email and open your Reserved Area anytime.',
  colPackage: 'Package',
  colBaseEur: 'Base EUR',
  allergiesLabel: 'Allergies / Notes',
};

function getOrderEmailStrings(locale: string): OrderEmailLocaleStrings {
  return (EMAIL_LOCALE_OVERRIDES as Record<string, OrderEmailLocaleStrings>)[locale] || DEFAULT_EMAIL_STRINGS;
}

function getOrderFeeInfo(order: SinglePassOrder): { rate: number; isMixed: boolean } {
  const rates = new Set(
    order.items.map((item) =>
      typeof item.feeRate === 'number'
        ? item.feeRate
        : item.venueId === 'terrazza-duomo-21'
          ? 0.2
          : SINGLE_PASS_FEE_RATE,
    ),
  );
  if (rates.size > 1) {
    return {
      rate: typeof order.feeRate === 'number' ? order.feeRate : SINGLE_PASS_FEE_RATE,
      isMixed: true,
    };
  }
  const singleRate =
    rates.size === 1
      ? Array.from(rates)[0]
      : typeof order.feeRate === 'number'
        ? order.feeRate
        : SINGLE_PASS_FEE_RATE;
  return { rate: singleRate, isMixed: false };
}

function resolveOrderHeadcount(order: SinglePassOrder): number {
  if (typeof order.totalHeadcount === 'number' && order.totalHeadcount > 0) {
    return order.totalHeadcount;
  }
  return order.items.reduce(
    (sum, item) => sum + (typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity),
    0,
  );
}

export function buildSinglePassOrderEmail(
  order: SinglePassOrder,
  baseUrl = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, ''),
): EmailMessage {
  const lp = localePrefix(order.locale);
  const copy = getSinglePassCopy(order.locale);
  const terrazzaUi = getTerrazzaCheckoutUi35(order.locale);
  const strings = getOrderEmailStrings(order.locale);
  const accountUrl = `${baseUrl}${lp}/account`;
  const thankYouUrl = `${baseUrl}${lp}/thank-you?order=${encodeURIComponent(order.id)}`;
  const paidCur = (order.presentmentCurrency || 'EUR').toUpperCase();
  const paidStr = formatMinorCurrency(
    order.presentmentTotalMinor ?? order.totalCents,
    paidCur,
    order.locale,
  );
  const eurStr = formatEurFromCents(order.totalCents, order.locale);
  const hasTerrazzaDuomo21 = order.items.some((i) => i.venueId === 'terrazza-duomo-21');
  const hasCapodannoPass = order.items.some((i) =>
    ['gate', 'pineta', 'repvblic', 'justme', 'bischeri', 'voya', 'justme-garda'].includes(
      i.venueId,
    ),
  );
  const feeInfo = getOrderFeeInfo(order);
  const feeLabel = formatFeeLabel35(order.locale, feeInfo.rate, feeInfo.isMixed);
  const headcount = resolveOrderHeadcount(order);

  const subject = `Nightlife Milan · ${strings.subjectPrefix} #${order.id}`;

  const linesHtml = order.items
    .map((item) => {
      const paxCount = typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity;
      const paxLabel = paxCount > 0 ? `${paxCount} pax` : terrazzaUi.tableAddonBadge;
      return `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #222;color:#F6F1E7;">
            <strong>${escapeHtml(item.venueName)}</strong><br/>
            <span style="color:#C2B9AA;font-size:13px;">${escapeHtml(item.title)} x ${item.quantity} (${escapeHtml(paxLabel)})${item.dietaryChoice ? ` · ${escapeHtml(item.dietaryChoice)}` : ''}</span>
          </td>
          <td style="padding:10px 8px;border-bottom:1px solid #222;text-align:right;color:#F6F1E7;white-space:nowrap;">
            ${escapeHtml(formatEurFromCents(item.lineBaseCents, order.locale))}
          </td>
        </tr>`;
    })
    .join('');

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#050505;color:#F6F1E7;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;border:1px solid #2B2720;background:#0B0A09;padding:28px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#EAE3D5;">
      NIGHTLIFE MILAN · OFFICIAL VOUCHER
    </p>
    <h1 style="margin:0 0 16px;font-size:24px;color:#F6F1E7;">
      ${escapeHtml(strings.headingFor(order.customer.fullName))}
    </h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#C2B9AA;">
      ${escapeHtml(strings.introStandard)}
    </p>
    ${
      hasTerrazzaDuomo21
        ? `<div style="background:#17130D;border-left:3px solid #D4AF37;padding:12px 14px;margin-bottom:18px;font-size:13px;line-height:1.55;color:#F6F1E7;">
      <strong>${escapeHtml(terrazzaUi.confirmationRefundNotice)}</strong><br/>
      <span style="color:#C2B9AA;display:block;margin-top:6px;">${escapeHtml(terrazzaUi.entryCheckpointNotice)}</span>
    </div>`
        : ''
    }
    <div style="background:#141210;border:1px solid #2B2720;padding:14px 16px;margin-bottom:20px;font-size:14px;line-height:1.6;">
      <div><strong>${escapeHtml(copy.orderIdLabel)}:</strong> ${escapeHtml(order.id)}</div>
      <div><strong>PIN:</strong> ${escapeHtml(order.accessPin)}</div>
      <div><strong>${escapeHtml(copy.guestsLabel)}:</strong> ${headcount}</div>
      <div><strong>Email:</strong> ${escapeHtml(order.customer.email)}</div>
      <div><strong>WhatsApp / Tel:</strong> ${escapeHtml(order.customer.whatsapp)}</div>
      ${
        order.customer.dietaryNotes
          ? `<div><strong>${escapeHtml(strings.allergiesLabel)}:</strong> ${escapeHtml(order.customer.dietaryNotes)}</div>`
          : ''
      }
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;font-size:14px;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #333;color:#8E8577;">${escapeHtml(strings.colPackage)}</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #333;color:#8E8577;">${escapeHtml(strings.colBaseEur)}</th>
        </tr>
      </thead>
      <tbody>${linesHtml}</tbody>
      <tfoot>
        <tr>
          <td style="padding:10px 8px;color:#C2B9AA;">${escapeHtml(feeLabel)}</td>
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
      Concierge 24/7: ${escapeHtml(SITE_CONTACT.whatsapp.number)} · www.nightlifemilan.com
    </p>
    <p style="margin:0;font-size:11px;line-height:1.45;color:#6E675C;border-top:1px solid #222;padding-top:10px;">
      Nightlife Milan · ${escapeHtml(baseUrl)} · Terms &amp; Conditions: ${escapeHtml(`${baseUrl}${lp}/terms`)}
    </p>
  </div>
</body>
</html>`;

  const text = [
    `NIGHTLIFE MILAN · ${order.id}`,
    `PIN: ${order.accessPin}`,
    ...(hasTerrazzaDuomo21 ? ['', terrazzaUi.confirmationRefundNotice, terrazzaUi.entryCheckpointNotice, ''] : []),
    `Guest: ${order.customer.fullName} (${order.customer.whatsapp}, ${order.customer.email})`,
    `Guests: ${headcount}`,
    ...(order.customer.dietaryNotes ? [`${strings.allergiesLabel}: ${order.customer.dietaryNotes}`] : []),
    ...order.items.map((i) => {
      const paxCount = typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity;
      const paxLabel = paxCount > 0 ? `${paxCount} pax` : terrazzaUi.tableAddonBadge;
      return `- ${i.venueName}: ${i.title} x${i.quantity} (${paxLabel})${i.dietaryChoice ? ` [${i.dietaryChoice}]` : ''} = ${formatEurFromCents(i.lineBaseCents, order.locale)}`;
    }),
    `${feeLabel}: ${formatEurFromCents(order.feeCents, order.locale)}`,
    `${copy.totalLabel} (EUR): ${eurStr}`,
    ...(paidCur !== 'EUR' ? [`Charged in ${paidCur}: ${paidStr} (1 EUR = ${order.fxRate})`] : []),
    ...(hasCapodannoPass ? ['', copy.miniGroupNoticeBody] : []),
    '',
    `Voucher: ${thankYouUrl}`,
    `Reserved Area: ${accountUrl}`,
    `Concierge 24/7: ${SITE_CONTACT.whatsapp.number} · www.nightlifemilan.com`,
    `Nightlife Milan · ${baseUrl} · Terms & Conditions: ${baseUrl}${lp}/terms`,
  ].join('\n');

  return {
    to: order.customer.email,
    subject,
    html,
    text,
    idempotencyKey: `nlm-sp-confirm-${order.id}`,
  };
}

export function buildStaffActivationEmail(
  order: SinglePassOrder,
  baseUrl = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, ''),
): EmailMessage {
  const headcount = resolveOrderHeadcount(order);
  const feeInfo = getOrderFeeInfo(order);
  const feePct = Math.round(feeInfo.rate * 100);
  const netVenueStr = formatEurFromCents(order.subtotalBaseCents, 'it');
  const feeEurStr = formatEurFromCents(order.feeCents, 'it');
  const totalEurStr = formatEurFromCents(order.totalCents, 'it');
  const paidCur = (order.presentmentCurrency || 'EUR').toUpperCase();
  const paidCurStr = formatMinorCurrency(
    order.presentmentTotalMinor ?? order.totalCents,
    paidCur,
    'it',
  );
  const crmUrl = `${baseUrl}/it/crm/single-pass`;

  const mainChoices = order.items
    .filter((i) => i.dietaryChoice)
    .map((i) => `${i.quantity}x ${i.dietaryChoice} (${i.title})`);

  const subject = `[ATTIVAZIONE CAPODANNO] Terrazza Duomo 21 / MA.RE · #${order.id} · ${order.customer.fullName} (${headcount} pax · Netto ${netVenueStr})`;

  const rowsHtml = order.items
    .map((item) => {
      const paxCount = typeof item.totalGuests === 'number' ? item.totalGuests : item.quantity;
      const itemFeePct = Math.round((item.feeRate ?? feeInfo.rate) * 100);
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #2A2620;color:#F6F1E7;">
          <strong>${escapeHtml(item.title)}</strong><br/>
          <span style="font-size:12px;color:#C2B9AA;">SKU: ${escapeHtml(item.skuId)} · Orario: ${escapeHtml(item.arrivalTime)}${item.dietaryChoice ? ` · Secondo: ${escapeHtml(item.dietaryChoice)}` : ''}</span>
        </td>
        <td style="padding:8px;border-bottom:1px solid #2A2620;text-align:center;color:#F6F1E7;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #2A2620;text-align:center;color:#F6F1E7;">${paxCount > 0 ? `${paxCount} pax` : 'Tavolo add-on'}</td>
        <td style="padding:8px;border-bottom:1px solid #2A2620;text-align:right;color:#D4AF37;">${escapeHtml(formatEurFromCents(item.lineBaseCents, 'it'))}</td>
        <td style="padding:8px;border-bottom:1px solid #2A2620;text-align:right;color:#C2B9AA;">+${itemFeePct}% (${escapeHtml(formatEurFromCents(item.lineFeeCents, 'it'))})</td>
        <td style="padding:8px;border-bottom:1px solid #2A2620;text-align:right;color:#F6F1E7;">${escapeHtml(formatEurFromCents(item.lineTotalCents, 'it'))}</td>
      </tr>`;
    })
    .join('');

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#050505;color:#F6F1E7;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:680px;margin:0 auto;border:1px solid #3A3224;background:#0B0A09;padding:28px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D4AF37;">
      NIGHTLIFE MILAN OPS · ATTIVAZIONE PRENOTAZIONE TERRAZZA DUOMO 21 / MA.RE
    </p>
    <h1 style="margin:0 0 14px;font-size:22px;color:#F6F1E7;">
      Nuovo ordine pagato #${escapeHtml(order.id)} (${headcount} pax)
    </h1>
    <p style="margin:0 0 18px;font-size:14px;line-height:1.5;color:#C2B9AA;">
      Verificare subito disponibilità con il referente Terrazza Duomo 21 / MA.RE, bloccare i posti con il locale e predisporre il bonifico della tariffa netta. In caso di indisponibilità, procedere a rimborso integrale del cliente.
    </p>

    <div style="background:#17130D;border:1px solid #D4AF37;padding:16px;margin-bottom:18px;font-size:14px;line-height:1.7;">
      <div style="font-size:16px;color:#D4AF37;"><strong>NETTO DA BONIFICARE AL LOCALE: ${escapeHtml(netVenueStr)}</strong></div>
      <div><strong>Commissione Nightlife Milan (${feeInfo.isMixed ? 'mista' : `${feePct}%`}):</strong> ${escapeHtml(feeEurStr)}</div>
      <div><strong>Totale incassato dal cliente (EUR):</strong> ${escapeHtml(totalEurStr)}${paidCur !== 'EUR' ? ` (${escapeHtml(paidCurStr)} ${escapeHtml(paidCur)})` : ''}</div>
    </div>

    <div style="background:#141210;border:1px solid #2B2720;padding:14px 16px;margin-bottom:18px;font-size:13px;line-height:1.65;">
      <div><strong>Cliente:</strong> ${escapeHtml(order.customer.fullName)} (Età: ${order.customer.age}${order.customer.country ? `, ${escapeHtml(order.customer.country)}` : ''})</div>
      <div><strong>Email:</strong> ${escapeHtml(order.customer.email)}</div>
      <div><strong>WhatsApp / Tel:</strong> ${escapeHtml(order.customer.whatsapp)}</div>
      <div><strong>Lingua ordine / parlate:</strong> ${escapeHtml(order.locale.toUpperCase())} · ${escapeHtml(order.customer.spokenLanguages.join(', '))}</div>
      <div><strong>Ospiti totali (pax):</strong> ${headcount}</div>
      <div><strong>Scelta secondo piatto (1° piano):</strong> ${escapeHtml(mainChoices.length > 0 ? mainChoices.join(' | ') : 'Non applicabile (nessuna cena placé 1° piano)')}</div>
      <div><strong>Allergie / Intolleranze (entro 28 dic):</strong> ${escapeHtml(order.customer.dietaryNotes || 'Non indicate')}</div>
      <div><strong>PIN ordine / ID pagamento:</strong> ${escapeHtml(order.accessPin)} · ${escapeHtml(order.stripePaymentIntentId || 'n/d')}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:18px;font-size:13px;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Formula / Piano</th>
          <th style="text-align:center;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Qta</th>
          <th style="text-align:center;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Pax</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Netto Locale</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Fee</th>
          <th style="text-align:right;padding:8px;border-bottom:1px solid #444;color:#8E8577;">Totale</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <p style="margin:0;">
      <a href="${escapeHtml(crmUrl)}" style="display:inline-block;background:#D4AF37;color:#050505;padding:10px 18px;font-weight:bold;text-decoration:none;font-size:12px;letter-spacing:1px;text-transform:uppercase;">
        Apri CRM Ordini Nightlife Milan
      </a>
    </p>
  </div>
</body>
</html>`;

  const text = [
    `ATTIVAZIONE PRENOTAZIONE TERRAZZA DUOMO 21 / MA.RE`,
    `Ordine: ${order.id} | PIN: ${order.accessPin} | Payment ID: ${order.stripePaymentIntentId || 'n/d'}`,
    `Cliente: ${order.customer.fullName} | Email: ${order.customer.email} | WhatsApp: ${order.customer.whatsapp}`,
    `Ospiti totali: ${headcount} pax | Lingua: ${order.locale.toUpperCase()}`,
    `Scelta secondo (1° piano): ${mainChoices.length > 0 ? mainChoices.join(' | ') : 'n/a'}`,
    `Allergie / Intolleranze (entro 28/12): ${order.customer.dietaryNotes || 'Non indicate'}`,
    '',
    'DETTAGLIO PACCHETTI:',
    ...order.items.map((i) => {
      const paxCount = typeof i.totalGuests === 'number' ? i.totalGuests : i.quantity;
      return `- ${i.title} x${i.quantity} (${paxCount > 0 ? `${paxCount} pax` : 'Tavolo add-on'})${i.dietaryChoice ? ` [${i.dietaryChoice}]` : ''} | Netto locale: ${formatEurFromCents(i.lineBaseCents, 'it')} | Fee: ${formatEurFromCents(i.lineFeeCents, 'it')} | Totale: ${formatEurFromCents(i.lineTotalCents, 'it')}`;
    }),
    '',
    `NETTO DA BONIFICARE AL LOCALE: ${netVenueStr}`,
    `COMMISSIONE NIGHTLIFE MILAN (${feeInfo.isMixed ? 'mista' : `${feePct}%`}): ${feeEurStr}`,
    `TOTALE INCASSATO CLIENTE (EUR): ${totalEurStr}${paidCur !== 'EUR' ? ` (${paidCurStr} ${paidCur})` : ''}`,
    `CRM: ${crmUrl}`,
  ].join('\n');

  return {
    to: STAFF_ACTIVATION_EMAIL,
    subject,
    html,
    text,
    idempotencyKey: `nlm-sp-staff-${order.id}`,
  };
}
