import { buildCapodannoSitemapEntriesAsync, xmlSitemapResponse } from '@/lib/sitemapBuilder';

export const revalidate = 3600;

export async function GET(): Promise<Response> {
  return xmlSitemapResponse(await buildCapodannoSitemapEntriesAsync());
}
