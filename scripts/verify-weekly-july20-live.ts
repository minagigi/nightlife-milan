import { getEventBatchSlug } from '../lib/eventBatchProfiles';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import { WEEKLY_JULY20_SITE_PROFILES } from '../lib/weeklyJuly20Site';

const origin = process.env.WEEKLY_SITE_ORIGIN || 'https://nightlifemilan.com';
const urls = WEEKLY_JULY20_SITE_PROFILES.flatMap((profile) => enabledLocaleCodes.map((locale) => {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${origin}${prefix}/events/${getEventBatchSlug(profile, locale)}`;
}));

type Result = { url: string; status: number; ok: boolean; reason?: string };
async function main(): Promise<void> {
  const results: Result[] = [];
  for (let index = 0; index < urls.length; index += 12) {
    const batch = urls.slice(index, index + 12);
    results.push(...await Promise.all(batch.map(async (url): Promise<Result> => {
      try {
        const response = await fetch(url, { redirect: 'follow' });
        const html = await response.text();
        const hasEventShell = html.includes('Nightlife Milan') && !html.includes('PAGE_NOT_FOUND');
        return { url, status: response.status, ok: response.status === 200 && hasEventShell, reason: hasEventShell ? undefined : 'missing-event-shell' };
      } catch (error) {
        return { url, status: 0, ok: false, reason: error instanceof Error ? error.message : String(error) };
      }
    })));
  }

  const failed = results.filter((result) => !result.ok);
  console.log(JSON.stringify({ checked: results.length, passed: results.length - failed.length, failed }, null, 2));
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
