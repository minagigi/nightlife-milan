import React, { type ReactNode } from 'react';

export default function EventTemporalBoundary({
  initialBeforeEnd,
  beforeEnd,
  afterEnd,
}: {
  endDateISO?: string | null;
  initialBeforeEnd: boolean;
  beforeEnd: ReactNode;
  afterEnd: ReactNode;
}) {
  return <>{initialBeforeEnd ? beforeEnd : afterEnd}</>;
}
