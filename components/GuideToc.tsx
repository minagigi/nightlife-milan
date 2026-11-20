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
      <h3 className="text-base font-semibold text-[#F6F1E7] mb-4">{title}</h3>
      <ul className="space-y-3 border-l border-white/15">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block pl-4 text-sm transition-colors ${
                activeId === section.id
                  ? 'text-[#F6F1E7] font-semibold border-l-2 border-[#25D366] -ml-[1px]'
                  : 'text-[#C2B9AA] hover:text-[#F6F1E7]'
              }`}
            >
              {section.title.replace(/^#+\s*/, '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
