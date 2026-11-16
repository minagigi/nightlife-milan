import { checkOriginOrReject, jsonOk } from '@/lib/single-pass/apiHelpers';
import { clearSessionCookie } from '@/lib/single-pass/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const originReject = checkOriginOrReject(request);
  if (originReject) return originReject;

  const response = jsonOk({ signedOut: true });
  clearSessionCookie(response);
  return response;
}
