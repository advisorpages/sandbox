import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

mkdirSync('dist', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1360, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto('file://' + resolve('index.html'), { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });

  const errors = await page.evaluate(() => {
    const sheets = [...document.querySelectorAll('.sheet')];
    return sheets.map((sheet, idx) => {
      const sb = sheet.getBoundingClientRect();
      const overflowing = [...sheet.querySelectorAll('*')].filter(node => {
        const cs = getComputedStyle(node);
        if (cs.display === 'none' || cs.position === 'fixed') return false;
        const b = node.getBoundingClientRect();
        if (b.width === 0 && b.height === 0) return false;
        return b.left < sb.left - 1 || b.right > sb.right + 1 || b.top < sb.top - 1 || b.bottom > sb.bottom + 1;
      }).map(node => node.tagName.toLowerCase() + (node.className ? '.' + String(node.className).trim().replace(/\s+/g, '.') : ''));
      return { page: idx + 1, width: Math.round(sb.width), height: Math.round(sb.height),
        scrollHeight: sheet.scrollHeight, clientHeight: sheet.clientHeight, overflowing };
    });
  });

  if (errors.length !== 4) throw new Error('Expected four printable sheets');
  const failures = [];
  for (const result of errors) {
    console.log('Page layout:', JSON.stringify(result));
    if (result.width !== 816 || result.height !== 1056) failures.push('Wrong portrait sheet size: ' + result.page);
    if (result.scrollHeight > result.clientHeight + 1 || result.overflowing.length) {
      failures.push('Clipped or overflowing content on page ' + result.page + ': ' + result.overflowing.join(', '));
    }
  }
  // Report every failed sheet at once, so print fixes cannot hide later-page problems.
  if (failures.length) throw new Error(failures.join('\n'));
  for (let i = 0; i < 4; i++) {
    await page.locator('.sheet').nth(i).screenshot({
      path: 'dist/page-' + (i + 1) + '.png',
      animations: 'disabled',
      scale: 'css'
    });
  }
  await page.pdf({ path: 'dist/mortgage-conversation-kit.pdf', printBackground: true,
    preferCSSPageSize: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  // An additional mobile proof checks the screen-scaled preview without modifying print dimensions.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto('file://' + resolve('index.html'), { waitUntil: 'load' });
  await mobile.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const mobileLayout = await mobile.evaluate(() => ({
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    sheets: [...document.querySelectorAll('.sheet')].map((x) => {
      const r = x.getBoundingClientRect();
      return { left: r.left, right: r.right, width: r.width };
    })
  }));
  console.log('Mobile layout:', JSON.stringify(mobileLayout));
  if (mobileLayout.scrollWidth > mobileLayout.width + 2 ||
      mobileLayout.sheets.length !== 4 ||
      mobileLayout.sheets.some(x => x.left < -1 || x.right > mobileLayout.width + 1)) {
    throw new Error('Mobile preview has horizontal overflow or clipped sheets');
  }
  await mobile.screenshot({ path: 'dist/mobile-preview.png', fullPage: true, animations: 'disabled' });
  await mobile.close();
  console.log('Wrote PDF, four letter-portrait PNGs and one mobile QA proof to dist/');
} finally {
  await browser.close();
}
