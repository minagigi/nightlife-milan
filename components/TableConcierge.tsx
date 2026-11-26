import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';
import styles from './TableConcierge.module.css';

export type TableConciergeCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  requestTitle: string;
  eventLabel: string;
  requestAction: string;
  heroAnchorAction?: string;
  trustBadges?: readonly [string, string, string];
  detailAction: string;
  disclaimer: string;
  eventsTitle: string;
  eventsLead: string;
  empty: string;
  allEvents: string;
};

type Props = {
  locale: string;
  copy: TableConciergeCopy;
  surface?: 'home';
  homeIntro?: { sub: string; pills: string; ctaSub: string; allVenues: string };
};

export default function TableConcierge({ locale, copy, surface = 'home', homeIntro }: Props) {
  const v01 = getV01SiteCopy(locale);
  const lp = localePrefix(locale);

  return (
    <section
      className={styles.shell}
      data-table-concierge={surface}
      aria-labelledby={`tc-title-${surface}`}
    >
      <div className={styles.hero}>
        <div className={styles.heroLeft} data-cialdini="presuasion commitment">
          <div className={styles.heroImage} data-hero-backdrop="true" data-no-lightbox="true">
            <Image
              src="/images/table-concierge/justme-night.webp"
              alt={copy.title}
              fill
              quality={92}
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority
              fetchPriority="high"
              className={styles.heroPhoto}
            />
          </div>
          <div className={styles.heroStatusBar}>
            <span className={styles.onlineBadge}>
              <span className={styles.onlineDot} aria-hidden="true" />
              {v01.onlineNow}
            </span>
            <span className={styles.statusStats}>{v01.statusStats}</span>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.subNote}>{copy.eyebrow}</p>
            <h1 id={`tc-title-${surface}`} className={styles.title}>
              {copy.title}
            </h1>
            <p className={styles.lead}>{copy.lead}</p>
            {homeIntro && (
              <>
                <p className={styles.legacyIntro}>{homeIntro.sub}</p>
                <p className={styles.pills}>{homeIntro.pills}</p>
              </>
            )}
            <div className={styles.heroAnchorRow}>
              <a className={styles.primaryLink} href="#capodanno">
                {v01.exploreNyeCta}
                <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.heroAnchorBtn} href="#locali-partner">
                {v01.partnerClubsCta}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            {homeIntro && (
              <div className={styles.heroLinks}>
                <a href="#stasera">{homeIntro.ctaSub} ↓</a>
                <Link href={`${lp}/clubs`} prefetch={false}>
                  {homeIntro.allVenues} ↗
                </Link>
              </div>
            )}
            <p className={styles.heroNote}>
              {v01.statusLive} · {copy.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
