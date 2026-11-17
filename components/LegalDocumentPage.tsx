import React from 'react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import {
  MAGISTER_MIDA_COMPANY,
  getMagisterMidaLegalDocument,
  type LegalDocKind,
} from '@/lib/legal/magisterMidaLegal35';

export default function LegalDocumentPage({
  locale,
  kind,
}: {
  locale: string;
  kind: LegalDocKind;
}) {
  const doc = getMagisterMidaLegalDocument(locale, kind);
  const isTerms = kind === 'terms';
  const lp = localePrefix(locale);
  const links: Array<{ id: LegalDocKind; href: string; label: string }> = [
    { id: 'terms', href: `${lp}/terms`, label: doc.navLabels.terms },
    { id: 'privacy', href: `${lp}/privacy`, label: doc.navLabels.privacy },
    { id: 'cookies', href: `${lp}/cookie-policy`, label: doc.navLabels.cookies },
    { id: 'refund', href: `${lp}/refund-policy`, label: doc.navLabels.refund },
  ];

  return (
    <main className="min-h-screen w-full bg-[#050505] px-4 py-24 text-[#F6F1E7] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-6 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#C9A84C]">
            {doc.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-[#F6F1E7] sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-3 font-mono text-xs text-[#8E8577]">{doc.updatedLabel}</p>
          <div className="mt-6 border-l-2 border-[#C9A84C] bg-[#141210] p-4 text-sm leading-relaxed text-[#EAE3D5]">
            <strong className="font-semibold text-[#F6F1E7]">
              {doc.brandOwnershipNotice}
            </strong>
          </div>
        </header>

        {/* Corporate / Office Identity Card */}
        <section
          aria-label={doc.corporateBlockTitle}
          className="border border-[#F6F1E7]/15 bg-[#0B0A09] p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
            {doc.corporateBlockTitle}
          </h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            {isTerms && (
              <>
                <div className="border border-[#F6F1E7]/10 bg-[#12100E] p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-[#8E8577]">
                    {doc.entityLabel}
                  </dt>
                  <dd className="mt-1 font-semibold text-[#F6F1E7]">
                    {MAGISTER_MIDA_COMPANY.legalName}
                  </dd>
                  <dd className="mt-0.5 text-xs text-[#C2B9AA]">
                    {MAGISTER_MIDA_COMPANY.entityType} · {MAGISTER_MIDA_COMPANY.formationDate}
                  </dd>
                </div>
                <div className="border border-[#F6F1E7]/10 bg-[#12100E] p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-[#8E8577]">
                    {doc.registryLabel} &amp; {doc.einLabel}
                  </dt>
                  <dd className="mt-1 font-mono text-xs text-[#F6F1E7]">
                    Filing ID: {MAGISTER_MIDA_COMPANY.filingId}
                  </dd>
                  <dd className="mt-1 font-mono text-xs text-[#EAE3D5]">
                    Federal EIN: {MAGISTER_MIDA_COMPANY.ein}
                  </dd>
                </div>
              </>
            )}
            <div className="border border-[#F6F1E7]/10 bg-[#12100E] p-4 sm:col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#8E8577]">
                {doc.officeLabel}
              </dt>
              <dd className="mt-1 text-[#EAE3D5]">{MAGISTER_MIDA_COMPANY.principalAddress}</dd>
            </div>
            <div className="border border-[#F6F1E7]/10 bg-[#12100E] p-4 sm:col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-wider text-[#8E8577]">
                {doc.contactLabel}
              </dt>
              <dd className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-[#EAE3D5]">
                {isTerms && <span>{MAGISTER_MIDA_COMPANY.corporateEmail}</span>}
                <span>{MAGISTER_MIDA_COMPANY.conciergeEmail}</span>
                <span className="font-mono">{MAGISTER_MIDA_COMPANY.phone}</span>
              </dd>
            </div>
          </dl>
        </section>

        {/* Cross-navigation between all 4 legal docs */}
        <nav
          aria-label={doc.crossLinksLabel}
          className="flex flex-wrap gap-2 border border-[#F6F1E7]/15 bg-[#0B0A09] p-4"
        >
          {links.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              locale={locale}
              className={`inline-flex min-h-[40px] items-center px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                item.id === kind
                  ? 'bg-[#F6F1E7] text-[#050505]'
                  : 'border border-[#F6F1E7]/20 text-[#EAE3D5] hover:border-[#F6F1E7]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Legal Clauses */}
        <article className="space-y-6 border border-[#F6F1E7]/15 bg-[#0B0A09] p-6 sm:p-10">
          {doc.sections.map((section) => (
            <section key={section.heading} className="border-b border-[#F6F1E7]/10 pb-6 last:border-b-0 last:pb-0">
              <h2 className="font-serif text-xl font-bold text-[#F6F1E7] sm:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#C2B9AA] sm:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
