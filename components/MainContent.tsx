import type { ReactNode } from 'react';

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <div id="main-content" className="flex-1 flex flex-col w-full">
      {children}
    </div>
  );
}
