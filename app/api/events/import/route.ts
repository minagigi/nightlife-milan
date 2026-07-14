import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * Disabled intentionally.
 *
 * This route used to scout third-party events, rewrite EN/IT content through a
 * server-side AI API, then publish to Eventbrite. That workflow is no longer
 * allowed: all content generation and translation must happen locally in the
 * operator session, then be submitted as already prepared payloads through
 * /api/events/publish-prepared or /api/events/publish-locales POST.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      reason: 'Server-side AI import/rewrite is disabled. Prepare locally, then submit the completed payload.',
      replacement: '/api/events/publish-prepared',
    },
    { status: 410 },
  );
}
