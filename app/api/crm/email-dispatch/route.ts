import { eventbriteGoneResponse } from '@/lib/eventbriteDisconnected';

export const dynamic = 'force-dynamic';

const gone = () => eventbriteGoneResponse('/api/crm/email-dispatch');
export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
