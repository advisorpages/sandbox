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
  for (const result of errors) {
    console.log('Page layout:', JSON.stringify(result));
    if (result.width !== 816 || result.height !== 1056) throw new Error('Wrong portrait sheet size: ' + result.page);
    if (result.scrollHeight > result.clientHeight + 1 || result.overflowing.length) {
      throw new Error('Clipped or overflowing content on page ' + result.page + ': ' + result.overflowing.join(', '));
    }
  }
  for (let i = 0; i < 4; i++) {
    await page.locator('.sheet').nth(i).screenshot({
      path: 'dist/page-' + (i + 1) + '.png',
      animations: 'disabled',
      scale: 'css'
    });
  }
  await page.pdf({ path: 'dist/mortgage-conversation-kit.pdf', printBackground: true,
    preferCSSPageSize: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  console.log('Wrote PDF and four letter-portrait PNGs to dist/');
} finally {
  await browser.close();
}
