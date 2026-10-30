import type { LocaleCode } from '@/lib/i18n/locales';

export type DateSensitiveInventoryItem = {
  id: string;
  slug: string;
  title: string;
  venueId?: string;
  venueName: string;
  dateISO: string;
  image: string;
  affiliateUrl?: string;
  labels: {
    longDate: string;
  };
};

export async function getDateSensitiveInventory(_locale: LocaleCode): Promise<DateSensitiveInventoryItem[]> {
  return [];
}
