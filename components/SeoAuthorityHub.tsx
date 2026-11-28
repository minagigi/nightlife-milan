import React from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getSeoStandard21Copy } from '@/lib/seoStandard21Copy';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';

interface SeoAuthorityHubProps {
  lang: LocaleCode;
  pageKey?: string;
  pagePath?: string;
}

export default function SeoAuthorityHub({ lang, pageKey, pagePath }: SeoAuthorityHubProps) {
  const model = getSeoStandard21Copy(lang, pageKey, pagePath);

  return (
    <section
      id="silo-correlati"
      aria-label={model.heading}
      data-contextual-silo={model.cluster}
      className="scroll-mt-28 w-full border-t border-[#F6F1E7]/14 bg-[#050505] text-[#F6F1E7]"
    >
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 space-y-12">
        {model.isHomePage ? (
          <div
            id="guida-milano-notte"
            className="scroll-mt-28 border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 sm:p-10 space-y-6"
          >
            <div className="max-w-3xl space-y-2">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[-0.02em] text-[#F6F1E7] sm:text-4xl">
                {model.homeOverviewTitle}
              </h2>
              <p className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                {model.homeOverviewLead}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 border-t border-[#F6F1E7]/14 pt-6 md:grid-cols-2">
              {model.homeOverviewPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="border border-[#F6F1E7]/14 bg-[#141311] p-5 space-y-2"
                >
                  <h3 className="font-display text-xl text-[#F6F1E7]">{pillar.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <p className="font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-[#EAE3D5]">
              {model.eyebrow}
            </p>
            <h2 className="font-display text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
              {model.heading}
            </h2>
          </div>

          {model.isSingleGuidePage ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {model.cards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  prefetch={false}
                  className="group flex flex-col justify-between border border-[#F6F1E7]/18 bg-[#0B0A09] p-5 transition-colors hover:border-[#25D366]/70 hover:bg-[#141311]"
                >
                  <div>
                    <p className="font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-[#C2B9AA]">
                      {card.tag}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-[#F6F1E7] group-hover:text-[#25D366] transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <span className="mt-4 inline-flex items-center font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#EAE3D5] group-hover:text-[#25D366]">
                    {model.exploreCta} ↗
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {model.cards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  prefetch={false}
                  className="group flex flex-col justify-between overflow-hidden border border-[#F6F1E7]/18 bg-[#0B0A09] transition-colors hover:border-[#EAE3D5]/55 hover:bg-[#141311]"
                >
                  <div
                    data-no-lightbox="true"
                    className="relative aspect-[4/5] w-full overflow-hidden border-b border-[#F6F1E7]/14 bg-[#050505]"
                  >
                    <Image
                      src={toCardPoster4x5(card.imageSrc)}
                      alt={card.title}
                      fill
                      quality={92}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="absolute top-3 left-3 border border-[#F6F1E7]/25 bg-[#050505]/90 px-2.5 py-1 font-sans text-[12px] font-bold uppercase tracking-[0.04em] text-[#EAE3D5]">
                      {card.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <h3 className="font-display text-lg text-[#F6F1E7] group-hover:text-[#25D366] transition-colors">
                      {card.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA] group-hover:text-[#25D366]">
                      {model.exploreCta} ↗
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
