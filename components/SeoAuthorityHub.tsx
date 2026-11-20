import React from 'react';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { localePrefix } from '@/lib/i18n/locales';
import Link from '@/components/LocalizedLink';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getSeoStandard21Copy } from '@/lib/seoStandard21Copy';

interface SeoAuthorityHubProps {
  lang: LocaleCode;
  pageKey?: string;
  pagePath?: string;
}

export default function SeoAuthorityHub({ lang, pageKey, pagePath }: SeoAuthorityHubProps) {
  const copy = getSeoStandard21Copy(lang, pageKey);
  const mapsDirectionsUrl = new URL('https://www.google.com/maps/dir/');
  mapsDirectionsUrl.searchParams.set('api', '1');
  mapsDirectionsUrl.searchParams.set('destination', 'Milano, Italia');
  mapsDirectionsUrl.searchParams.set('hl', lang);

  return (
    <section
      aria-label={copy.h2Main}
      data-seo-authority-hub={lang}
      className="w-full border-t border-[#F6F1E7]/14 bg-[#050505] text-[#F6F1E7]"
    >
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-16 sm:px-14 space-y-14">
        {/* Header & Intro */}
        <div className="max-w-4xl space-y-3">
          <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.02em] text-[#F6F1E7] sm:text-5xl">
            {copy.h2Main}
          </h2>
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#EAE3D5]">
            {copy.eyebrow}
          </p>
          <p className="max-w-[48ch] font-sans text-base leading-relaxed text-[#C2B9AA]">
            {copy.introParagraph}
          </p>
        </div>

        {/* 1. Clickable Table of Contents pointing to #anchorId H3 headings (Warm Editorial Ivory #F6F1E7) */}
        <nav
          aria-label={copy.tocTitle}
          data-seo-toc="true"
          className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 text-[#F6F1E7] sm:p-10"
        >
          <h2 className="font-display text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
            {copy.tocTitle}
          </h2>
          <p className="mt-1.5 font-sans text-[13px] text-[#C2B9AA] sm:text-sm">
            {copy.tocSubtitle}
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-4 border-t border-[#F6F1E7]/14 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.sections.map((sec) => (
              <li key={sec.anchorId} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-[#EAE3D5]/32 bg-[#050505] font-sans tabular-nums text-[13px] font-bold text-[#F6F1E7]">
                  0{sec.index}
                </span>
                <a
                  href={`#${sec.anchorId}`}
                  className="font-sans text-sm font-semibold text-[#F6F1E7] underline-offset-4 transition-colors hover:underline"
                >
                  {sec.h3Title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. Five H3 Sections alternating Couture Noir (#050505) and Warm Editorial Ivory (#F6F1E7) */}
        <div className="divide-y divide-[#F6F1E7]/14 border border-[#F6F1E7]/14" data-seo-h3-sections="true">
          {copy.sections.map((sec, idx) => {
            const isIvory = idx % 2 === 1;
            return (
            <article
              key={sec.anchorId}
              className={`grid grid-cols-1 gap-8 p-6 sm:p-10 lg:grid-cols-12 ${
                isIvory ? 'bg-[#0B0A09] text-[#F6F1E7]' : 'bg-[#050505] text-[#F6F1E7]'
              }`}
            >
              <div className={sec.imageSrc ? 'space-y-4 lg:col-span-7' : 'space-y-4 lg:col-span-12'}>
                <div className="flex items-baseline gap-3">
                  <span className={`font-display italic text-3xl ${isIvory ? 'text-[#F6F1E7]' : 'text-[#F6F1E7]'}`}>0{sec.index}</span>
                  <h3
                    id={sec.anchorId}
                    className={`scroll-mt-28 font-display text-2xl font-normal tracking-[-0.02em] sm:text-3xl ${
                      isIvory ? 'text-[#F6F1E7]' : 'text-[#F6F1E7]'
                    }`}
                  >
                    {sec.h3Title}
                  </h3>
                </div>
                {sec.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={`max-w-[48ch] font-sans text-base leading-relaxed ${
                      isIvory ? 'text-[#C2B9AA]' : 'text-[#C2B9AA]'
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
                {/* Contextual internal keyword anchor links */}
                <div className="pt-2">
                  <ul className={`flex flex-col gap-2.5 border-t pt-4 sm:flex-row sm:flex-wrap sm:gap-5 ${
                    isIvory ? 'border-[#F6F1E7]/14' : 'border-[#F6F1E7]/14'
                  }`}>
                    {sec.contextualLinks.map((cLink) => (
                      <li key={`${sec.anchorId}-${cLink.href}-${cLink.anchor}`} className="text-[13px] sm:text-sm">
                        <Link
                          prefetch={false}
                          href={cLink.href}
                          className={`font-sans tabular-nums text-[13px] font-semibold uppercase tracking-[0.04em] underline underline-offset-4 transition-colors ${
                            isIvory ? 'text-[#F6F1E7]' : 'text-[#F6F1E7] hover:text-[#F6F1E7]'
                          }`}
                        >
                          {cLink.anchor} ↗
                        </Link>
                        <span className={`ml-1.5 font-sans ${isIvory ? 'text-[#C2B9AA]' : 'text-[#A8A093]'}`}>· {cLink.summary}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {sec.imageSrc ? (
                <figure className={`flex flex-col justify-between overflow-hidden border lg:col-span-5 ${
                  isIvory ? 'border-[#F6F1E7]/14 bg-[#141311]' : 'border-[#F6F1E7]/14 bg-[#0B0A09]'
                }`}>
                  <img
                    src={sec.imageSrc}
                    alt={sec.imageAlt}
                    title={sec.h3Title}
                    width={1600}
                    height={899}
                    loading="lazy"
                    decoding="async"
                    className={`aspect-[16/9] h-auto w-full object-cover border-b ${
                      isIvory ? 'border-[#F6F1E7]/14' : 'border-[#F6F1E7]/14'
                    }`}
                  />
                  <figcaption className={`p-4 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] leading-relaxed ${
                    isIvory ? 'text-[#C2B9AA]' : 'text-[#A8A093]'
                  }`}>
                    {sec.h3Title}
                  </figcaption>
                </figure>
              ) : null}
            </article>
            );
          })}
        </div>

        {/* 3. Tree / Silo Related Articles & Hubs Structure (Warm Editorial Ivory #F6F1E7) */}
        <div
          data-seo-silo-tree="true"
          className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 text-[#F6F1E7] sm:p-10"
        >
          <h2 className="font-display text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
            {copy.h2SiloTree}
          </h2>
          <p className="mt-2 font-sans text-sm text-[#C2B9AA]">{copy.siloIntro}</p>
          <div className="mt-6 grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-[#F6F1E7]/14 border border-[#F6F1E7]/14 lg:grid-cols-3">
            {copy.siloBranches.map((branch) => (
              <div
                key={branch.branchTitle}
                className="bg-[#141311] p-6"
              >
                <p className="font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA]">
                  {branch.branchTitle}
                </p>
                <div className="mt-3 border-b border-[#F6F1E7]/14 pb-3">
                  <Link
                    prefetch={false}
                    href={branch.parentLink.href}
                    className="font-display text-xl text-[#F6F1E7] underline-offset-4 hover:underline"
                  >
                    {branch.parentLink.label}
                  </Link>
                </div>
                <ul className="mt-4 space-y-2.5 border-l border-[#EAE3D5]/32 pl-4">
                  {branch.children.map((child) => (
                    <li key={`${branch.branchTitle}-${child.href}-${child.label}`}>
                      <Link
                        prefetch={false}
                        href={child.href}
                        className="font-sans text-[13px] text-[#C2B9AA] underline-offset-4 hover:text-[#F6F1E7] hover:underline sm:text-sm"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Territorial Competency Zones, Reference Cities/Provinces & Official Services */}
        <div className="grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-[#F6F1E7]/14 border border-[#F6F1E7]/14 lg:grid-cols-3">
          {/* Competency Zones in Milan */}
          <div
            data-footer-competency-zones="true"
            className="bg-[#0B0A09] p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-normal text-[#F6F1E7]">
              {copy.zonesHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 font-sans text-[13px] leading-relaxed text-[#C2B9AA]">
              {copy.zonesList.map((z) => (
                <li key={z.name}>
                  {z.href ? (
                    <Link
                      prefetch={false}
                      href={z.href}
                      className="font-semibold text-[#F6F1E7] underline-offset-4 hover:underline"
                    >
                      {z.name}
                    </Link>
                  ) : (
                    <strong className="font-semibold text-[#F6F1E7]">{z.name}</strong>
                  )}{' '}
                  <span className="text-[#A8A093]">· {z.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference Cities, Hinterland Municipalities & Lombardy Provinces */}
          <div
            data-footer-reference-cities="true"
            className="bg-[#050505] p-6 sm:p-8"
          >
            <h2 className="font-display text-xl font-normal text-[#F6F1E7]">
              {copy.citiesHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 font-sans text-[13px] leading-relaxed text-[#C2B9AA]">
              {copy.citiesList.map((c) => (
                <li key={c.name}>
                  <strong className="font-semibold text-[#F6F1E7]">{c.name}</strong>{' '}
                  <span className="text-[#A8A093]">· {c.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Services & GMB Aligned Contacts */}
          <div className="divide-y divide-[#F6F1E7]/14 bg-[#0B0A09]">
            <div
              data-footer-services="true"
              className="p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-normal text-[#F6F1E7]">
                {copy.servicesHeading}
              </h2>
              <ul className="mt-4 space-y-2.5 font-sans text-[13px] leading-relaxed text-[#C2B9AA]">
                {copy.servicesList.map((s) => (
                  <li key={s.name}>
                    <Link
                      prefetch={false}
                      href={s.href}
                      className="font-semibold text-[#F6F1E7] underline-offset-4 hover:underline"
                    >
                      {s.name}
                    </Link>{' '}
                    <span className="text-[#A8A093]">· {s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google My Business (GMB) Aligned NAP & Direct Contacts */}
            <div
              data-gmb-nap="true"
              className="p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-normal text-[#F6F1E7]">
                {copy.h2Gmb}
              </h2>
              <dl className="mt-4 space-y-2 font-sans text-[13px] text-[#C2B9AA]">
                <div>
                  <dt className="font-sans tabular-nums uppercase tracking-[0.04em] text-[#F6F1E7]">{copy.gmb.businessName}</dt>
                  <dd>{copy.gmb.categoryLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.addressLabel}</dt>
                  <dd>{copy.gmb.addressValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.coordinatesLabel}</dt>
                  <dd className="font-sans tabular-nums text-[13px]">{copy.gmb.coordinatesValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.phoneLabel}</dt>
                  <dd className="font-sans tabular-nums font-semibold text-[#F6F1E7]"><a href="tel:+393519127047" className="hover:underline">{copy.gmb.phoneValue}</a></dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.emailLabel}</dt>
                  <dd><a href="mailto:concierge@nightlifemilan.com" className="hover:underline">{copy.gmb.emailValue}</a></dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.hoursLabel}</dt>
                  <dd>{copy.gmb.hoursValue}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={getConciergeBookingUrl(
                    lang,
                    copy.h2Main,
                    pagePath || `${localePrefix(lang)}${pageKey && pageKey !== '/' ? pageKey : ''}` || '/'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center bg-[#25D366] px-4 py-2.5 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505] transition-colors hover:bg-[#2EE472]"
                >
                  {copy.gmb.whatsappCtaLabel}
                </a>
                <a
                  href={mapsDirectionsUrl.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center border border-white/35 px-4 py-2.5 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] text-[#F6F1E7] transition-colors hover:border-[#EAE3D5]"
                >
                  {copy.gmb.mapsCtaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


