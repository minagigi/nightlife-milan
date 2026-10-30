import React from 'react';
import Link from 'next/link';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getSeoStandard21Copy } from '@/lib/seoStandard21Copy';

interface SeoAuthorityHubProps {
  lang: LocaleCode;
}

export default function SeoAuthorityHub({ lang }: SeoAuthorityHubProps) {
  const copy = getSeoStandard21Copy(lang);
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
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-[#D6BE96]">
            {copy.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-normal tracking-[-0.03em] text-[#F6F1E7] sm:text-5xl">
            {copy.h2Main}
          </h2>
          <p className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
            {copy.introParagraph}
          </p>
        </div>

        {/* 1. Clickable Table of Contents pointing to #anchorId H3 headings */}
        <nav
          aria-label={copy.tocTitle}
          data-seo-toc="true"
          className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 sm:p-10"
        >
          <h2 className="font-serif text-2xl font-normal text-[#D6BE96] sm:text-3xl">
            {copy.tocTitle}
          </h2>
          <p className="mt-1.5 font-sans text-xs text-[#C2B9AA] sm:text-sm">
            {copy.tocSubtitle}
          </p>
          <ol className="mt-6 grid grid-cols-1 gap-4 border-t border-[#F6F1E7]/14 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.sections.map((sec) => (
              <li key={sec.anchorId} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-[#D6BE96]/45 font-mono text-[11px] font-medium text-[#D6BE96]">
                  0{sec.index}
                </span>
                <a
                  href={`#${sec.anchorId}`}
                  className="font-sans text-sm font-medium text-[#F6F1E7] underline-offset-4 transition-colors hover:text-[#D6BE96] hover:underline"
                >
                  {sec.h3Title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. Five H3 Sections with 5 Semantic Images (filename = H3 title = alt text) & Contextual Keyword Links */}
        <div className="divide-y divide-[#F6F1E7]/14 border border-[#F6F1E7]/14" data-seo-h3-sections="true">
          {copy.sections.map((sec) => (
            <article
              key={sec.anchorId}
              className="grid grid-cols-1 gap-8 bg-[#050505] p-6 sm:p-10 lg:grid-cols-12"
            >
              <div className="space-y-4 lg:col-span-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif italic text-3xl text-[#D6BE96]">0{sec.index}</span>
                  <h3
                    id={sec.anchorId}
                    className="scroll-mt-28 font-serif text-2xl font-normal tracking-[-0.02em] text-[#F6F1E7] sm:text-3xl"
                  >
                    {sec.h3Title}
                  </h3>
                </div>
                {sec.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="font-sans text-sm leading-relaxed text-[#C2B9AA] sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {/* Contextual internal keyword anchor links */}
                <div className="pt-2">
                  <ul className="flex flex-col gap-2.5 border-t border-[#F6F1E7]/14 pt-4 sm:flex-row sm:flex-wrap sm:gap-5">
                    {sec.contextualLinks.map((cLink) => (
                      <li key={`${sec.anchorId}-${cLink.href}-${cLink.anchor}`} className="text-xs sm:text-sm">
                        <Link
                          prefetch={false}
                          href={cLink.href}
                          className="font-mono text-xs uppercase tracking-[0.14em] text-[#D6BE96] underline-offset-4 transition-colors hover:text-[#F6F1E7] hover:underline"
                        >
                          {cLink.anchor} ↗
                        </Link>
                        <span className="ml-1.5 font-sans text-[#847C6F]">· {cLink.summary}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <figure className="flex flex-col justify-between overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] lg:col-span-5">
                <img
                  src={sec.imageSrc}
                  alt={sec.imageAlt}
                  title={sec.h3Title}
                  width={1600}
                  height={899}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] h-auto w-full object-cover border-b border-[#F6F1E7]/14"
                />
                <figcaption className="p-4 font-mono text-[11px] uppercase tracking-[0.14em] leading-relaxed text-[#847C6F]">
                  {sec.h3Title}
                </figcaption>
              </figure>
            </article>
          ))}
        </div>

        {/* 3. Tree / Silo Related Articles & Hubs Structure */}
        <div
          data-seo-silo-tree="true"
          className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 sm:p-10"
        >
          <h2 className="font-serif text-2xl font-normal text-[#F6F1E7] sm:text-3xl">
            {copy.h2SiloTree}
          </h2>
          <p className="mt-2 font-sans text-sm text-[#C2B9AA]">{copy.siloIntro}</p>
          <div className="mt-6 grid grid-cols-1 divide-y lg:divide-y-0 lg:divide-x divide-[#F6F1E7]/14 border border-[#F6F1E7]/14 lg:grid-cols-3">
            {copy.siloBranches.map((branch) => (
              <div
                key={branch.branchTitle}
                className="bg-[#050505] p-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D6BE96]">
                  {branch.branchTitle}
                </p>
                <div className="mt-3 border-b border-[#F6F1E7]/14 pb-3">
                  <Link
                    prefetch={false}
                    href={branch.parentLink.href}
                    className="font-serif text-xl text-[#F6F1E7] transition-colors hover:text-[#D6BE96]"
                  >
                    {branch.parentLink.label}
                  </Link>
                </div>
                <ul className="mt-4 space-y-2.5 border-l border-[#D6BE96]/40 pl-4">
                  {branch.children.map((child) => (
                    <li key={`${branch.branchTitle}-${child.href}-${child.label}`}>
                      <Link
                        prefetch={false}
                        href={child.href}
                        className="font-sans text-xs text-[#C2B9AA] transition-colors hover:text-[#D6BE96] sm:text-sm"
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
            <h2 className="font-serif text-xl font-normal text-[#D6BE96]">
              {copy.zonesHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 font-sans text-xs leading-relaxed text-[#C2B9AA]">
              {copy.zonesList.map((z) => (
                <li key={z.name}>
                  {z.href ? (
                    <Link
                      prefetch={false}
                      href={z.href}
                      className="font-semibold text-[#F6F1E7] transition-colors hover:text-[#D6BE96]"
                    >
                      {z.name}
                    </Link>
                  ) : (
                    <strong className="font-semibold text-[#F6F1E7]">{z.name}</strong>
                  )}{' '}
                  <span className="text-[#847C6F]">· {z.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reference Cities, Hinterland Municipalities & Lombardy Provinces */}
          <div
            data-footer-reference-cities="true"
            className="bg-[#050505] p-6 sm:p-8"
          >
            <h2 className="font-serif text-xl font-normal text-[#D6BE96]">
              {copy.citiesHeading}
            </h2>
            <ul className="mt-4 space-y-2.5 font-sans text-xs leading-relaxed text-[#C2B9AA]">
              {copy.citiesList.map((c) => (
                <li key={c.name}>
                  <strong className="font-semibold text-[#F6F1E7]">{c.name}</strong>{' '}
                  <span className="text-[#847C6F]">· {c.detail}</span>
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
              <h2 className="font-serif text-xl font-normal text-[#D6BE96]">
                {copy.servicesHeading}
              </h2>
              <ul className="mt-4 space-y-2.5 font-sans text-xs leading-relaxed text-[#C2B9AA]">
                {copy.servicesList.map((s) => (
                  <li key={s.name}>
                    <Link
                      prefetch={false}
                      href={s.href}
                      className="font-semibold text-[#F6F1E7] transition-colors hover:text-[#D6BE96]"
                    >
                      {s.name}
                    </Link>{' '}
                    <span className="text-[#847C6F]">· {s.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google My Business (GMB) Aligned NAP & Direct Contacts */}
            <div
              data-gmb-nap="true"
              className="p-6 sm:p-8"
            >
              <h2 className="font-serif text-xl font-normal text-[#F6F1E7]">
                {copy.h2Gmb}
              </h2>
              <dl className="mt-4 space-y-2 font-sans text-xs text-[#C2B9AA]">
                <div>
                  <dt className="font-mono uppercase tracking-[0.14em] text-[#D6BE96]">{copy.gmb.businessName}</dt>
                  <dd>{copy.gmb.categoryLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.addressLabel}</dt>
                  <dd>{copy.gmb.addressValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.coordinatesLabel}</dt>
                  <dd className="font-mono text-[11px]">{copy.gmb.coordinatesValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.phoneLabel}</dt>
                  <dd className="font-mono font-semibold text-[#D6BE96]">{copy.gmb.phoneValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.emailLabel}</dt>
                  <dd>{copy.gmb.emailValue}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#F6F1E7]">{copy.gmb.hoursLabel}</dt>
                  <dd>{copy.gmb.hoursValue}</dd>
                </div>
              </dl>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href="https://wa.me/393519127047"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center bg-[#F6F1E7] px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#050505] transition-colors hover:bg-[#D6BE96]"
                >
                  {copy.gmb.whatsappCtaLabel}
                </a>
                <a
                  href={mapsDirectionsUrl.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center border border-[#D6BE96]/45 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F6F1E7] transition-colors hover:border-[#F6F1E7]"
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


