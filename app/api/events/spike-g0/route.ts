import { eventbriteGoneResponse } from '@/lib/eventbriteDisconnected';

export const dynamic = 'force-dynamic';

const gone = () => eventbriteGoneResponse('/api/events/spike-g0');
export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
