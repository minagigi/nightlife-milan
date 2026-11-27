import Link from '@/components/LocalizedLink';
import NewsletterHub from './NewsletterHub';
import Logo from './Logo';
import FooterWhatsAppContact from './FooterWhatsAppContact';
import { ENABLED_LOCALES, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getFooterCopy } from '@/lib/footerLocaleCopy';
import { editorialValue, type EditorialFields } from '@/lib/editorialPresentation';
import { footerMenuFromFields, resolveMenuItems, type FooterMenu } from '@/lib/editorialMenus';
import { utilityText } from '@/lib/i18n/utilityCopy';
import EventVenueMap from './EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import { mockGuides } from '@/lib/data';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';
import { capodannoCategoryPath } from '@/lib/capodanno/routes';
import { getCapodannoMasterSeo35 } from '@/lib/capodanno/capodannoMasterSeo35';

const FOOTER_PARTNER_CLUBS_22: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'v-justme', label: 'Just Me Milano' },
  { id: 'v-pineta', label: 'Pineta Milano' },
  { id: 'v-voya', label: 'Voya Rooftop' },
  { id: 'v-repvblic', label: 'REPVBLIC Milano' },
  { id: 'v-55milano', label: '55 Milano' },
  { id: 'v-magazzini', label: 'Magazzini Generali' },
  { id: 'v-bobino', label: 'Bobino Milano' },
  { id: 'v-theclub', label: 'The Club Milano' },
  { id: 'v-carlsbergol', label: 'Carlsberg Øl Milano' },
  { id: 'v-tocqueville', label: 'Tocqueville 13' },
  { id: 'v-tom', label: 'TOM. The Ordinary Market' },
  { id: 'v-mibmilano', label: 'MIB Milano' },
  { id: 'v-dazi', label: 'Dazi Milano' },
  { id: 'v-bischeri', label: 'I Bischeri Milano' },
  { id: 'v-gate', label: 'Gate Milano' },
  { id: 'v-pelledoca', label: 'Pelledoca Milano' },
  { id: 'v-aria', label: 'Aria Club Milano' },
  { id: 'v-hollywood', label: 'Hollywood Milano' },
  { id: 'v-11clubroom', label: '11Clubroom' },
  { id: 'v-gattopardo', label: 'Il Gattopardo' },
  { id: 'v-justme-garda', label: 'JustMe Garda Lake' },
  { id: 'v-terrazza21', label: 'Terrazza Duomo 21' },
];

interface FooterProps {
  lang: LocaleCode;
  editorialFields?: EditorialFields;
  copyrightYear?: number;
}

export default function Footer({ lang, editorialFields = {}, copyrightYear }: FooterProps) {
  const defaults = getFooterCopy(lang);
  const v01 = getV01SiteCopy(lang);
  const masterNyeSeo = getCapodannoMasterSeo35(lang);
  const clubsDir = getLocalizedDir35('clubs', lang);
  const t = Object.fromEntries(Object.entries(defaults).map(([key, value]) => [
    key,
    editorialValue(editorialFields, `footer.${key}`, value),
  ])) as typeof defaults;

  const lp = localePrefix(lang);
  const links = {
    clubs: `${lp}/clubs`,
    calendar: `${lp}/events`,
    guides: `${lp}/guides`,
    vip: `${lp}/vip-tables`,
    concierge: `${lp}/concierge`,
    brera: `${lp}/zones/brera`,
    navigli: `${lp}/zones/navigli`,
    isola: `${lp}/zones/isola`,
    corsoComo: `${lp}/zones/corso-como`,
    portaVenezia: `${lp}/zones/porta-venezia`,
    privacy: `${lp}/privacy`,
    terms: `${lp}/terms`,
    cookies: `${lp}/cookie-policy`,
    refund: `${lp}/refund-policy`,
  };
  const defaultMenu: FooterMenu = {
    version: 1,
    navigation: [{ id: 'clubs', label: t.clubs }, { id: 'events', label: t.calendar }, { id: 'guides', label: t.guides }, { id: 'mfw', label: editorialValue(editorialFields, 'footer.mfw', 'Milan Fashion Week') }, { id: 'vip', label: t.vip }, { id: 'concierge', label: t.concierge }, { id: 'pastEvents', label: t.past }],
    zones: [{ id: 'brera', label: 'Brera' }, { id: 'navigli', label: 'Navigli' }, { id: 'isola', label: 'Isola' }, { id: 'corsoComo', label: 'Corso Como' }, { id: 'portaVenezia', label: 'Porta Venezia' }],
  };
  const menu = footerMenuFromFields(editorialFields, defaultMenu);
  const navigation = resolveMenuItems(menu.navigation, lang);
  const zones = resolveMenuItems(menu.zones, lang);
  const guidesDir = getLocalizedDir35('guides', lang);
  const g115 = mockGuides.find((g) => g.id === 'g-115');
  const g116 = mockGuides.find((g) => g.id === 'g-116');
  const g115Href = g115 ? `${lp}/${guidesDir}/${getLocalizedGuideSlug35(g115, lang)}` : `${lp}/guides`;
  const g116Href = g116 ? `${lp}/${guidesDir}/${getLocalizedGuideSlug35(g116, lang)}` : `${lp}/guides`;
  const mapCopy = getEventVenueCopy(lang);
  // City context only: this query is not a Nightlife Milan business address.
  const cityMap = new URL('https://www.google.com/maps');
  cityMap.searchParams.set('q', 'Milano, Italia');
  cityMap.searchParams.set('output', 'embed');
  cityMap.searchParams.set('hl', lang);
  const cityDirections = new URL('https://www.google.com/maps/dir/');
  cityDirections.searchParams.set('api', '1');
  cityDirections.searchParams.set('destination', 'Milano, Italia');
  cityDirections.searchParams.set('hl', lang);

  return (
    <div className="mt-auto w-full">
      <NewsletterHub lang={lang} />
      <footer className="nlm-footer w-full bg-[#050505] border-t border-[#F6F1E7]/14">
        <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F6F1E7]/14">
            {/* Col 1: Brand Info */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <Link href={lp + '/'} prefetch={false} className="inline-block group" aria-label={t.homeAria}>
                <Logo className="h-9 w-auto" />
              </Link>
              <p className="nlm-footer-description font-sans text-sm text-[#C2B9AA] leading-relaxed max-w-xs">
                {t.desc}
              </p>
              <div className="pt-4">
                <FooterWhatsAppContact lang={lang} />
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-sans text-[#EAE3D5] font-bold text-[15px]">{t.nav}</h3>
              <ul className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} prefetch={false} className={item.gold ? 'text-[#F6F1E7] hover:underline transition-colors text-sm font-medium' : 'text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm'}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`${lp}/football-afterparties`} locale={lang} prefetch={false} className="text-[#F6F1E7] hover:underline transition-colors text-sm font-medium">
                    {v01.footerSanSiro}
                  </Link>
                </li>
                <li>
                  <Link href={`${lp}/bergamo-brescia`} locale={lang} prefetch={false} className="text-[#F6F1E7] hover:underline transition-colors text-sm font-medium">
                    {lang === 'it' ? 'Discoteche Bergamo & Brescia (6 Club)' : 'Bergamo & Brescia Clubs (6)'}
                  </Link>
                </li>
                <li>
                  <Link href={`${lp}/concert-afterparties`} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {v01.footerConcerts}
                  </Link>
                </li>
                <li>
                  <Link href={capodannoCategoryPath('capodanno-2027', lang)} locale={lang} prefetch={false} className="text-[#F6F1E7] hover:underline transition-colors text-sm font-medium">
                    {masterNyeSeo.footerAnchor}
                  </Link>
                </li>
                <li>
                  <Link href={g115Href} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {v01.footerAirports}
                  </Link>
                </li>
                <li>
                  <Link href={g116Href} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {v01.footerRegions}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Zone Hotspots */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-sans text-[#EAE3D5] font-bold text-[15px]">{t.zones}</h3>
              <ul className="flex flex-col space-y-3">
                {zones.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`${lp}/zones/san-siro`} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    San Siro &amp; Ippodromo
                  </Link>
                </li>
                <li>
                  <Link href={`${lp}/zones/parco-sempione`} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    Parco Sempione (Just Me / 55)
                  </Link>
                </li>
                <li>
                  <Link href={`${lp}/zones/citylife-portello`} locale={lang} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    CityLife &amp; Portello (Voya)
                  </Link>
                </li>
                <li>
                  <Link href={`${lp}/bergamo-brescia`} locale={lang} prefetch={false} className="text-[#EAE3D5] hover:text-[#F6F1E7] transition-colors text-sm font-semibold">
                    Bergamo &amp; Brescia · Franciacorta (A4)
                  </Link>
                </li>
              </ul>
              <details className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-3" data-footer-city-map>
                <summary className="cursor-pointer font-sans text-[13px] font-bold text-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]">
                  {t.zones} · Milano
                </summary>
                <div className="mt-3 space-y-3">
                  <a href={cityDirections.toString()} target="_blank" rel="noopener noreferrer"
                    aria-label={`${mapCopy.directions}: Milano`}
                    className="inline-flex min-h-11 items-center font-sans text-[13px] font-bold text-[#EAE3D5] hover:text-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]">
                    Milano
                  </a>
                  <EventVenueMap purpose="city" id={`footer-city-map-${lang}`} mapUrl={cityMap.toString()}
                    labels={{ loadMap: mapCopy.loadMap, mapTitle: mapCopy.mapTitle.replace('{venue}', 'Milano'), privacyLoadNotice: mapCopy.privacyLoadNotice }} />
                </div>
              </details>
            </div>

            {/* Col 4: Legal & Social */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-sans text-[#EAE3D5] font-bold text-[15px]">{t.legal}</h3>
              <ul className="flex flex-col space-y-3 mb-4">
                <li>
                  <Link href={links.terms} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {utilityText(lang, 'Terms & Conditions', 'Termini e Condizioni')}
                  </Link>
                </li>
                <li>
                  <Link href={links.privacy} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={links.cookies} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {utilityText(lang, 'Cookie Policy', 'Cookie Policy')}
                  </Link>
                </li>
                <li>
                  <Link href={links.refund} prefetch={false} className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors text-sm">
                    {utilityText(lang, 'Refund Policy', 'Politica di Rimborso')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            data-footer-partner-clubs="true"
            className="border-t border-[#F6F1E7]/14 px-6 py-7 sm:px-12"
          >
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#EAE3D5]">
              {masterNyeSeo.footerPartnersHeading}
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#C2B9AA] sm:text-[13px]">
              {FOOTER_PARTNER_CLUBS_22.map((club) => {
                const clubHref = `${lp}/${clubsDir}/${getLocalizedVenueSlug35(club.id, lang)}`;
                return (
                  <li key={club.id}>
                    <Link
                      href={clubHref}
                      locale={lang}
                      prefetch={false}
                      className="hover:text-[#F6F1E7] hover:underline transition-colors"
                    >
                      {club.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="overflow-hidden border-t border-[#F6F1E7]/14 py-10">
            <div className="deco-wordmark" data-text="NIGHTLIFE MILAN" aria-hidden="true" />
            <p className="text-center font-sans text-[13px] font-medium text-[#C2B9AA] tabular-nums -mt-2" aria-hidden="true">
              Milano · 45.4642° N, 9.1900° E
            </p>
          </div>

          <div className="px-6 sm:px-12 py-6 border-t border-[#F6F1E7]/14 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-[#C2B9AA] text-[13px] tabular-nums">
              © {copyrightYear ?? new Date().getFullYear()} Nightlife Milan. {t.rights}
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans text-[13px] text-[#C2B9AA]">
              {ENABLED_LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={localePrefix(l.code) || '/'}
                  prefetch={false}
                  lang={l.hreflang}
                  className="inline-flex min-h-7 min-w-7 items-center justify-center px-1.5 hover:text-[#F6F1E7] transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  aria-label={l.nativeName}
                >
                  {l.code}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


