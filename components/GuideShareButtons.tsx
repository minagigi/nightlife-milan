'use client';

import { Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function GuideShareButtons({
  url,
  title,
  variant = 'dark',
}: {
  url: string;
  title: string;
  variant?: 'dark' | 'light';
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  const isLight = variant === 'light';
  const wrapClass = isLight
    ? 'flex items-center gap-3'
    : 'flex items-center gap-4 mt-8 pt-8';
  const labelClass = isLight
    ? 'text-sm text-[#0A0A0C] font-semibold'
    : 'text-sm text-[#C9C7C2] font-semibold';
  const btnClass = isLight
    ? 'min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-[#E2DED6] text-[#0A0A0C] hover:bg-[#0A0A0C] hover:text-[#FFFFFF] transition-colors'
    : 'min-h-[44px] min-w-[44px] inline-flex items-center justify-center bg-[#18181C] text-[#EDEBE6] hover:bg-[#FFFFFF] hover:text-[#0A0A0C] transition-colors';

  return (
    <div className={wrapClass}>
      <span className={labelClass}>Share</span>
      <button
        type="button"
        onClick={handleWhatsApp}
        className={btnClass}
        aria-label="Share on WhatsApp"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className={`${btnClass} relative`}
        aria-label="Copy Link"
      >
        <LinkIcon className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[14px] font-semibold bg-[#25D366] text-[#0A0A0C] px-2.5 py-1 whitespace-nowrap">
            Copied
          </span>
        )}
      </button>
    </div>
  );
}
