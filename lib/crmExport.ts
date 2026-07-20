import type { CrmContact } from './crmModel';

function csvCell(value: string | number | null): string {
  let text = value === null ? '' : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function crmContactsCsv(contacts: CrmContact[]): string {
  const header = [
    'name',
    'email',
    'preferred_language',
    'events',
    'tickets',
    'check_ins',
    'last_event_at',
    'venues',
    'email_marketing_status',
  ];
  const rows = contacts
    .filter((contact) => contact.email && contact.emailMarketing.status === 'opted_in')
    .map((contact) => [
      contact.name,
      contact.email,
      contact.preferredLocale || contact.stats.locales[0] || '',
      contact.stats.events,
      contact.stats.tickets,
      contact.stats.checkIns,
      contact.stats.lastEventAt,
      contact.stats.venues.join(' | '),
      contact.emailMarketing.status,
    ]);
  return `\uFEFF${[header, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`;
}
