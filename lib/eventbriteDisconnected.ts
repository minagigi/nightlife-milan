import { NextResponse } from 'next/server';

export const EVENTBRITE_DISCONNECTED_CODE = 'EVENTBRITE_DISCONNECTED' as const;
export const EVENTBRITE_DISCONNECTED_MESSAGE =
  'Eventbrite integration has been permanently disconnected from Nightlife Milan.' as const;

/**
 * Shared 410 Gone payload returned by every disconnected Eventbrite endpoint.
 */
export function eventbriteGoneResponse(route: string): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      disconnected: true,
      code: EVENTBRITE_DISCONNECTED_CODE,
      status: 'EVENTBRITE_PERMANENTLY_DISCONNECTED',
      route,
      error: EVENTBRITE_DISCONNECTED_MESSAGE,
    },
    {
      status: 410,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow, nosnippet',
      },
    },
  );
}
