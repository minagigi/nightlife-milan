import { enabledLocaleCodes, type LocaleCode } from '@/lib/i18n/locales';

export const MONTH_EVENT_IMAGE_LABELS: Record<LocaleCode, { crowd: string; entrance: string; signage: string }> = Object.fromEntries(
  enabledLocaleCodes.map((loc) => [
    loc,
    {
      crowd: '{venue} · Crowd & Dancefloor',
      entrance: '{venue} · Venue Entrance',
      signage: '{venue} · Venue Signage',
    },
  ])
) as Record<LocaleCode, { crowd: string; entrance: string; signage: string }>;
