import { buildCapodannoSitemapEntries, xmlSitemapResponse } from '@/lib/sitemapBuilder';

export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  return xmlSitemapResponse(buildCapodannoSitemapEntries());
}
