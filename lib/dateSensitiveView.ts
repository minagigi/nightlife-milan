/**
 * Browser-safe date-window helpers. They intentionally depend only on ISO
 * strings and the platform Intl implementation: public pages can move forward
 * at the Rome day boundary without a request, cache invalidation or a server
 * clock.
 */
export type DateSensitiveMode = 'tonight' | 'this-week' | 'calendar-week' | 'upcoming' | 'past' | 'all';

export type DateSensitiveEvent = {
  id: string;
  dateISO: string;
  /** Exact source end instant. Missing or invalid values fall back to the start-day policy. */
  endDateISO?: string | null;
  /** Omitted for source records whose verification is deliberately immutable. */
  verificationExpiresAt?: string | null;
};

const ROME = 'Europe/Rome';
const ROME_DAY_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: ROME,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function dayPart(value: Date): string {
  const parts = ROME_DAY_FORMATTER.formatToParts(value);
  const part = (type: string) => parts.find((candidate) => candidate.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function romeDayKeyAt(now: Date): string {
  return dayPart(now);
}

export function addRomeDays(dayKey: string, days: number): string {
  const [year, month, day] = dayKey.split('-').map(Number);
  return dayPart(new Date(Date.UTC(year, month - 1, day + days, 12)));
}

export function romeWeekday(dayKey: string): number {
  return new Date(`${dayKey}T12:00:00Z`).getUTCDay();
}

/** Monday–Sunday membership follows the occurrence's verified Rome start day. */
export function romeCalendarWeek(now: Date): { monday: string; sunday: string } {
  const today = romeDayKeyAt(now);
  const monday = addRomeDays(today, -((romeWeekday(today) + 6) % 7));
  return { monday, sunday: addRomeDays(monday, 6) };
}

function timestamp(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function isActiveAt(event: DateSensitiveEvent, nowMs: number): boolean {
  const startMs = timestamp(event.dateISO);
  const endMs = timestamp(event.endDateISO);
  return startMs !== null && endMs !== null && startMs <= nowMs && nowMs < endMs;
}

export function getDateSensitiveEvents<T extends DateSensitiveEvent>(
  events: readonly T[],
  mode: DateSensitiveMode,
  now: Date,
): T[] {
  const today = romeDayKeyAt(now);
  const sundayOffset = romeWeekday(today) === 0 ? 0 : 7 - romeWeekday(today);
  const sunday = addRomeDays(today, sundayOffset);
  const week = romeCalendarWeek(now);

  return events
    .filter((event) => {
      if (timestamp(event.dateISO) === null) return false;
      const day = romeDayKeyAt(new Date(event.dateISO));
      const endMs = timestamp(event.endDateISO);
      const ended = endMs !== null ? endMs <= now.getTime() : day < today;
      const active = isActiveAt(event, now.getTime());

      // When a real end instant exists it is authoritative across midnight.
      // Records without one retain the documented legacy start-day fallback.
      // An expired current-offer approval must not erase a historical archive record.
      if (mode === 'past') return ended;
      if (event.verificationExpiresAt && Date.parse(event.verificationExpiresAt) <= now.getTime()) return false;
      if (mode === 'all') return true;
      if (ended) return false;
      if (mode === 'calendar-week') return day >= week.monday && day <= week.sunday;
      if (mode === 'upcoming') return endMs !== null ? endMs > now.getTime() : day >= today;
      if (mode === 'tonight') return active || day === today;
      return active || (day >= today && day <= sunday);
    })
    .slice()
    .sort((left, right) => Date.parse(left.dateISO) - Date.parse(right.dateISO) || left.id.localeCompare(right.id));
}

/**
 * Finds the next Europe/Rome day transition instead of assuming 24 hours.
 * The bounded scan and binary search stay correct through both CET/CEST
 * changes, where the local day is 23 or 25 hours long.
 */
export function millisecondsUntilNextRomeDay(now: Date): number {
  const currentDay = romeDayKeyAt(now);
  let lower = now.getTime();
  let upper = lower + 27 * 60 * 60 * 1000;
  while (romeDayKeyAt(new Date(upper)) === currentDay) upper += 60 * 60 * 1000;

  while (upper - lower > 1_000) {
    const middle = lower + Math.floor((upper - lower) / 2);
    if (romeDayKeyAt(new Date(middle)) === currentDay) lower = middle;
    else upper = middle;
  }
  return Math.max(1_000, upper - now.getTime() + 100);
}

/**
 * Returns the next point at which a cached browser view can change. Exact end
 * and approval deadlines take priority over the Rome day rollover, so an
 * overnight event is archived promptly instead of lingering for an hour.
 */
export function millisecondsUntilNextDateSensitiveChange(
  events: readonly DateSensitiveEvent[],
  now: Date,
): number {
  const nowMs = now.getTime();
  let delay = millisecondsUntilNextRomeDay(now);
  for (const event of events) {
    for (const deadline of [event.endDateISO, event.verificationExpiresAt]) {
      const deadlineMs = timestamp(deadline);
      if (deadlineMs !== null && deadlineMs > nowMs) {
        delay = Math.min(delay, Math.max(100, deadlineMs - nowMs + 50));
      }
    }
  }
  return delay;
}


const PRIORITY_VENUE_ORDER: Record<string, number> = {
  'v-justme': 0,
  'just me': 0,
  'justme': 0,
  'v-pineta': 1,
  'pineta': 1,
  'v-aria': 2,
  'aria': 2,
  'aria club': 2,
  'v-55milano': 3,
  '55 milano': 3,
  'v-voya': 4,
  'voya': 4,
  'voya rooftop': 4,
  'v-repvblic': 5,
  'repvblic': 5,
};

export function getVenuePriorityRank(venueIdOrName?: string | null): number {
  if (!venueIdOrName) return 99;
  const key = venueIdOrName.trim().toLowerCase();
  if (key in PRIORITY_VENUE_ORDER) return PRIORITY_VENUE_ORDER[key];
  for (const [k, rank] of Object.entries(PRIORITY_VENUE_ORDER)) {
    if (key.includes(k)) return rank;
  }
  return 50;
}
