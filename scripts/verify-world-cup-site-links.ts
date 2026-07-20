import { enabledLocaleCodes } from '../lib/i18n/locales';
import { getEventBatchProfile, getEventBatchSlug } from '../lib/eventBatchProfiles';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_CANONICAL_SLUG,
} from '../lib/worldCupFinalIt';

const OLD_WORLD_CUP_AFFILIATE_URL =
  'https://xceed.me/en/milano/event/uptown-nights-73/220784/channel/nightlifemilan-1';
const baseUrl = (process.env.SITE_URL || 'https://nightlifemilan.com').replace(/\/$/, '');

async function main(): Promise<void> {
  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG);
  if (!profile) throw new Error('World Cup site profile is missing');

  const results = await Promise.all(enabledLocaleCodes.map(async (locale) => {
    const slug = getEventBatchSlug(profile, locale);
    const prefix = locale === 'en' ? '' : `/${locale}`;
    const url = `${baseUrl}${prefix}/events/${encodeURIComponent(slug)}`;
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();
    const newLinkCount = html.split(WORLD_CUP_FINAL_AFFILIATE_URL).length - 1;

    return {
      locale,
      url: response.url,
      status: response.status,
      newLinkCount,
      oldLinkPresent: html.includes(OLD_WORLD_CUP_AFFILIATE_URL),
      passed: response.status === 200 && newLinkCount >= 2 && !html.includes(OLD_WORLD_CUP_AFFILIATE_URL),
    };
  }));

  const failed = results.filter((result) => !result.passed);
  console.log(JSON.stringify({ checked: results.length, passed: results.length - failed.length, failed }, null, 2));
  if (failed.length > 0) process.exitCode = 1;
}

void main();
