'use client';
import { useEffect, useState } from 'react';

export default function IdleMount({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cb = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(cb, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(cb, 2000);
    return () => clearTimeout(id);
  }, []);

  return ready ? <>{children}</> : null;
}
