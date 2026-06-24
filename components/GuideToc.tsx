'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
}

export default function GuideToc({ sections, title }: { sections: Section[], title: string }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="sticky top-24">
      <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-3 border-l border-white/10">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block pl-4 text-sm transition-colors ${
                activeId === section.id
                  ? 'text-champagne border-l-2 border-champagne -ml-[1px]'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
