const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const outputDir = path.resolve(process.env.AUDIT_OUTPUT_DIR || 'artifacts/seo-deploy-2026-07-15');
const defaultPages = [
  '/',
  '/it',
  '/events/this-week',
  '/it/events/this-week',
  '/events/international',
  '/it/events/university-erasmus',
  '/it/events/18-plus',
  '/it/events/21-plus',
  '/clubs',
  '/it/clubs/just-me-milano',
  '/it/clubs/pineta-club-milano',
  '/it/clubs/aria-club-milano',
  '/it/aperitivo',
  '/events/voya-rooftop-saturday-18-07-2026',
];
const allViewports = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
};
const pages = process.env.AUDIT_ROUTES
  ? process.env.AUDIT_ROUTES.split(',').map((route) => route.trim()).filter(Boolean)
  : defaultPages;
const requestedDevices = process.env.AUDIT_DEVICES
  ? new Set(process.env.AUDIT_DEVICES.split(',').map((device) => device.trim()))
  : null;
const viewports = Object.fromEntries(Object.entries(allViewports).filter(([device]) => !requestedDevices || requestedDevices.has(device)));
const reportSuffix = Object.keys(viewports).join('-') || 'none';

function slug(value) {
  return value === '/' ? 'home' : value.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const [device, viewport] of Object.entries(viewports)) {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
      for (const route of pages) {
        const page = await context.newPage();
        const consoleErrors = [];
        page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
        page.on('pageerror', (error) => consoleErrors.push(error.message));
        let status = 0;
        let loadError = null;
        try {
          const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
          status = response ? response.status() : 0;
          await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        } catch (error) {
          loadError = error.message;
        }
        const data = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const offenders = Array.from(document.querySelectorAll('body *')).map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === 'string' ? element.className.slice(0, 120) : '',
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          }).filter((item) => item.width > 0 && (item.right > viewportWidth + 2 || item.left < -2)).slice(0, 12);
          const images = Array.from(document.images);
          const bodyText = document.body.innerText;
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
            canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
            robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
            h1Count: document.querySelectorAll('h1').length,
            h1: Array.from(document.querySelectorAll('h1')).map((node) => node.textContent.trim()).filter(Boolean),
            htmlLang: document.documentElement.lang,
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: viewportWidth,
            offenders,
            brokenImages: images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src).slice(0, 10),
            nextError: bodyText.includes('Something went wrong in the dark') || bodyText.includes('Application error: a server-side exception has occurred'),
          };
        }).catch(() => ({ title: '', description: '', canonical: '', robots: '', h1Count: 0, h1: [], htmlLang: '', scrollWidth: 0, clientWidth: viewport.width, offenders: [], brokenImages: [], nextError: true }));
        await page.screenshot({ path: path.join(outputDir, `${device}-${slug(route)}.png`), fullPage: true }).catch(() => {});
        results.push({ device, route, status, loadError, consoleErrors: consoleErrors.slice(0, 10), ...data });
        fs.writeFileSync(path.join(outputDir, `responsive-seo-progress-${reportSuffix}.json`), JSON.stringify(results, null, 2));
        await page.close();
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    totals: {
      checks: results.length,
      httpErrors: results.filter((item) => item.status >= 400 || item.status === 0 || item.nextError).length,
      overflow: results.filter((item) => item.scrollWidth > item.clientWidth).length,
      missingDescription: results.filter((item) => !item.description).length,
      missingWhatsapp: results.filter((item) => item.robots.includes('index') && !item.description.includes('+39 351 912 7047')).length,
      invalidH1: results.filter((item) => item.h1Count !== 1).length,
      brokenImages: results.reduce((sum, item) => sum + item.brokenImages.length, 0),
    },
    results,
  };
  fs.writeFileSync(path.join(outputDir, `responsive-seo-audit-${reportSuffix}.json`), JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify(report.totals)}\n`);
  for (const item of results.filter((row) => row.status >= 400 || row.status === 0 || row.nextError || row.scrollWidth > row.clientWidth || !row.description || row.h1Count !== 1 || row.brokenImages.length)) {
    process.stdout.write(`${item.device} ${item.route} status=${item.status} overflow=${item.scrollWidth - item.clientWidth} h1=${item.h1Count} broken=${item.brokenImages.length}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
