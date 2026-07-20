import { createElement } from 'react';
import { ImageResponse } from 'next/og';
import { getEventBatchProfileByBase } from '@/lib/eventBatchProfiles';
import { getBatchEventTemplateValues } from '@/lib/eventBatchContent';
import { getEventLocalePack } from '@/lib/eventLocalePacks';
import { getLocaleDef, isEnabledLocale } from '@/lib/i18n/locales';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: Promise<{ base: string; locale: string }> },
) {
  const { base, locale } = await context.params;
  const profile = getEventBatchProfileByBase(base);
  if (!profile || !isEnabledLocale(locale)) return new Response('Not found', { status: 404 });

  const pack = getEventLocalePack(locale);
  if (!pack) return new Response('Locale not prepared', { status: 404 });
  const values = getBatchEventTemplateValues(profile, locale, pack);
  const eventName = String(values.event);
  const date = String(values.date);
  const direction = getLocaleDef(locale)?.dir || 'ltr';
  const source = new URL(`/images/events/generated/batch-2026-07/${base}-square-master.jpg`, request.url).toString();
  const localizedDateAsset = locale === 'ar' || locale === 'zh'
    ? new URL(`/images/events/generated/batch-2026-07/date-${profile.dateISO}-${locale}.png`, request.url).toString()
    : null;

  const format = new URL(request.url).searchParams.get('format');
  if (format === 'cover' || format === 'poster') {
    const width = format === 'cover' ? 1800 : 1400;
    const height = format === 'cover' ? 900 : 1120;
    const panelHeight = format === 'cover' ? 255 : 390;
    const sourceHeight = height - panelHeight;
    const officialSource = new URL(profile.posterUrl || `/images/events/generated/batch-2026-07/${base}-square-master.jpg`, request.url).toString();
    const dressCode = String(values.dressCode);
    const nativePoster = createElement(
      'div',
      {
        style: {
          width: `${width}px`,
          height: `${height}px`,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#07070a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          direction,
        },
      },
      createElement('img', {
        src: officialSource,
        width,
        height,
        style: { position: 'absolute', inset: 0, width: `${width}px`, height: `${height}px`, objectFit: 'cover', opacity: format === 'cover' ? 1 : 0.48 },
      }),
      format === 'poster' ? createElement('img', {
        src: officialSource,
        width,
        height: sourceHeight,
        style: { position: 'absolute', left: 0, top: 0, width: `${width}px`, height: `${sourceHeight}px`, objectFit: 'contain' },
      }) : null,
      createElement('div', {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: `${panelHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
          padding: format === 'cover' ? '26px 58px 30px' : '34px 52px 38px',
          background: 'linear-gradient(180deg, rgba(4,4,7,0.78), rgba(4,4,7,0.97))',
          textAlign: direction === 'rtl' ? 'right' : 'left',
        },
      },
      createElement('div', { style: { display: 'flex', fontSize: format === 'cover' ? '26px' : '28px', fontWeight: 800, color: '#e7c981' } }, profile.venue),
      createElement('div', {
        style: {
          display: 'flex',
          marginTop: '5px',
          fontSize: format === 'cover' ? (eventName.length > 34 ? '42px' : '50px') : (eventName.length > 34 ? '47px' : '58px'),
          lineHeight: 1.02,
          fontWeight: 850,
        },
      }, eventName),
      createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '9px', fontSize: format === 'cover' ? '23px' : '27px' } },
        localizedDateAsset
          ? createElement('img', { src: localizedDateAsset, width: 600, height: 56, style: { width: '600px', height: '56px', objectFit: 'contain' } })
          : createElement('span', { style: { display: 'flex' } }, date),
        createElement('span', { style: { display: 'flex' } }, `| ${profile.start}-${profile.end}`),
      ),
      createElement('div', { style: { display: 'flex', marginTop: '8px', fontSize: format === 'cover' ? '20px' : '24px', color: '#ededed' } }, `${values.minAge}+ | ${dressCode}`),
      createElement('div', { style: { display: 'flex', marginTop: '7px', fontSize: format === 'cover' ? '20px' : '23px', color: '#f2f2f2' } }, 'WhatsApp +39 351 912 7047 | NIGHTLIFEMILAN.COM'),
      ),
    );
    return new ImageResponse(nativePoster, {
      width,
      height,
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=31536000, immutable' },
    });
  }

  const poster = createElement(
    'div',
    {
      style: {
        width: '1080px',
        height: '1080px',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background: '#07070a',
        color: '#ffffff',
        fontFamily: 'sans-serif',
        direction,
      },
    },
    createElement('img', {
      src: source,
      width: 1080,
      height: 1080,
      style: { position: 'absolute', inset: 0, width: '1080px', height: '1080px', objectFit: 'cover' },
    }),
    createElement('div', {
      style: { position: 'absolute', inset: 0, display: 'flex', background: 'rgba(0,0,0,0.26)' },
    }),
    createElement(
      'div',
      {
        style: {
          position: 'absolute',
          top: '34px',
          ...(direction === 'rtl' ? { right: '38px' } : { left: '38px' }),
          display: 'flex',
          padding: '14px 22px',
          background: 'rgba(4,4,7,0.82)',
          border: '1px solid rgba(255,255,255,0.35)',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0px',
        },
      },
      'NIGHTLIFE MILAN',
    ),
    createElement(
      'div',
      {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          minHeight: '285px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: direction === 'rtl' ? 'flex-end' : 'flex-start',
          padding: '32px 48px 36px',
          background: 'rgba(4,4,7,0.88)',
          textAlign: direction === 'rtl' ? 'right' : 'left',
        },
      },
      createElement('div', { style: { display: 'flex', fontSize: '27px', fontWeight: 700, color: '#e7c981' } }, profile.venue),
      createElement(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '7px',
            fontSize: eventName.length > 30 ? '50px' : '62px',
            lineHeight: 1.04,
            fontWeight: 800,
            letterSpacing: '0px',
          },
        },
        eventName,
      ),
      createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '28px', color: '#f2f2f2' } },
        localizedDateAsset
          ? createElement('img', { src: localizedDateAsset, width: 600, height: 56, style: { width: '600px', height: '56px', objectFit: 'contain' } })
          : createElement('span', { style: { display: 'flex' } }, date),
        createElement('span', { style: { display: 'flex' } }, `| ${profile.start}-${profile.end}`),
      ),
      createElement('div', { style: { display: 'flex', marginTop: '13px', fontSize: '24px', color: '#dddddd' } }, `WhatsApp +39 351 912 7047`),
    ),
  );

  return new ImageResponse(poster, {
    width: 1080,
    height: 1080,
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=31536000, immutable' },
  });
}
