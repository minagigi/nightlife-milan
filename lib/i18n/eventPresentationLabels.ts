export type EventPresentationLabels = {
  shortDate: string;
  longDate: string;
  dayHeading: string;
  time: string;
  dateTime: string;
  price: string | null;
  priceLabel: string;
};

export function formatEventPresentationLabels({
  dateISO,
  price,
  currency = 'EUR',
  locale,
}: {
  dateISO: string;
  price: number | null;
  currency?: string;
  locale: string;
}): EventPresentationLabels {
  const d = new Date(dateISO);
  const valid = Number.isFinite(d.getTime());
  const shortDate = valid
    ? new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Rome', day: '2-digit', month: 'short' }).format(d)
    : dateISO.slice(0, 10);
  const longDate = valid
    ? new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(d)
    : dateISO.slice(0, 10);
  const dayHeading = valid
    ? new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Rome', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d)
    : longDate;
  const time = valid
    ? new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit' }).format(d)
    : '23:00';
  const formattedPrice =
    price !== null && price > 0
      ? new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
      : null;
  const priceLabel =
    formattedPrice ?? (locale === 'it' ? 'Su richiesta WhatsApp' : 'Via WhatsApp Concierge');
  return {
    shortDate,
    longDate,
    dayHeading,
    time,
    dateTime: `${longDate} · ${time}`,
    price: formattedPrice,
    priceLabel,
  };
}
