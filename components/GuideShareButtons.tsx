'use client';

import { Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function GuideShareButtons({ url, title }: { url: string, title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
      <span className="text-sm text-white/40 uppercase tracking-wider font-semibold">Share</span>
      <button
        onClick={handleWhatsApp}
        className="p-2 rounded-full bg-white/[0.03] border border-white/10 text-white/70 hover:text-champagne hover:border-champagne transition-colors"
        aria-label="Share on WhatsApp"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        onClick={handleCopy}
        className="p-2 rounded-full bg-white/[0.03] border border-white/10 text-white/70 hover:text-champagne hover:border-champagne transition-colors relative"
        aria-label="Copy Link"
      >
        <LinkIcon className="w-4 h-4" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-champagne text-charcoal px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
