'use client';

import { useEffect, useState } from 'react';
import { millisecondsUntilNextDateSensitiveChange, type DateSensitiveEvent } from '@/lib/dateSensitiveView';

export function useRomeClock(initialNow: string, events: readonly DateSensitiveEvent[]): Date {
  const [now, setNow] = useState(() => new Date(initialNow));
  useEffect(() => {
    let timer: number | undefined;
    const schedule = () => {
      const delay = millisecondsUntilNextDateSensitiveChange(events, new Date());
      timer = window.setTimeout(() => {
        setNow(new Date());
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [events]);
  return now;
}
