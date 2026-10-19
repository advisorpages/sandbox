// Screen-only verification of the revised flat sheets. No print or export operations.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

mkdirSync('dist', { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];
try {
  for (const [width, height, suffix] of [[1360, 1200, 'screen'], [390, 844, 'mobile']]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    try {
      await page.goto(pathToFileURL(resolve('index.html')).href, { waitUntil: 'load' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise(done => requestAnimationFrame(() => requestAnimationFrame(done)));
      });
      const results = await page.evaluate(() => {
        const sheets = [...document.querySelectorAll('.page1, .page2, .page3, .page4, .page7')];
        const front = document.querySelector('.page1');
        const interactive = 'a,button,input,details,summary,select,textarea,iframe,[tabindex],[contenteditable]:not([contenteditable="false"]),[role="button"],[role="link"],[role="checkbox"],[role="radio"],[role="switch"],[role="tab"],[role="textbox"],[role="combobox"],[role="slider"],[role="spinbutton"],[role="listbox"],[role="menuitem"],[role="option"]';
        const clients = [...document.querySelectorAll('.page1, .page2, .page3, .page4')];
        const hasEvents = clients.flatMap(sheet => [...sheet.querySelectorAll('*')]).some(el =>
          [...el.attributes].some(attribute => /^on/i.test(attribute.name)));
        const nestedOverlaps = [];
        const checkGroup = (elements, label) => {
          const boxes = elements.map(el => el.getBoundingClientRect());
          for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
            const x = Math.min(boxes[a].right, boxes[b].right) - Math.max(boxes[a].left, boxes[b].left);
            const y = Math.min(boxes[a].bottom, boxes[b].bottom) - Math.max(boxes[a].top, boxes[b].top);
            if (x > 1 && y > 1) nestedOverlaps.push(label + ': ' + a + '/' + b);
          }
        };
        for (const group of front.querySelectorAll('.presentation-opening,.options,.possibility-grid,.possibility-grid article'))
          checkGroup([...group.children], group.className || group.tagName);
        for (const group of document.querySelectorAll('.page2 .team-opening,.page2 .credibility-points,.page2 .lender-logos,.page2 .lender-types,.page2 .next-steps,.page2 .service-overview,.page2 .lender-types article,.page2 .introduction-process,.page2 .team-premise,.page2 .step-rail,.page2 .step-rail article'))
          checkGroup([...group.children], 'page2 ' + group.className);
        for (const group of document.querySelectorAll('.page3 .demand-grid,.page3 .areas-head,.page3 .role-flow'))
          checkGroup([...group.children], 'page3 ' + group.className);
        for (const group of document.querySelectorAll('.page4 .opportunity-benefits,.page4 .opportunity-benefits li,.page4 .support,.page4 .support-grid,.page4 .support-pillar,.page4 .journey,.page4 .stage-grid,.page4 .stage,.page4 .invite'))
          checkGroup([...group.children], 'page4 ' + group.className);
        for (const table of document.querySelectorAll('.payment-comparison,.debt-assumptions,.earnings-table')) {
          checkGroup([...table.querySelectorAll('tr')], table.className + ' rows');
          for (const row of table.querySelectorAll('tr')) checkGroup([...row.children], table.className + ' cells');
        }
        const columns = selector => getComputedStyle(front.querySelector(selector)).gridTemplateColumns.split(/\s+/).length;
        const minimumType = Math.min(...[...front.querySelectorAll('.options li,.payment-comparison tbody th,.payment-comparison tbody td,.possibility-grid h3,.possibility-grid p:not(.outcome)')]
          .map(el => parseFloat(getComputedStyle(el).fontSize)));
        return {
          width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          nestedOverlaps, openingColumns: columns('.presentation-opening'),
          fontsLoaded: ['400 46px "DM Serif Display"', 'italic 400 46px "DM Serif Display"', '500 26px Manrope']
            .every(font => document.fonts.check(font)),
          goalColumns: columns('.options'), choiceColumns: columns('.possibility-grid'),
          choiceCount: front.querySelectorAll('.possibility-grid article').length, minimumType,
          openingHeight: front.querySelector('.presentation-opening').getBoundingClientRect().height,
          exampleHeight: front.querySelector('.hero-money').getBoundingClientRect().height,
          goalType: parseFloat(getComputedStyle(front.querySelector('.options')).fontSize),
          sheets: sheets.map(sheet => {
            const rect = sheet.getBoundingClientRect();
            const children = [...sheet.children].filter(el => getComputedStyle(el).display !== 'none')
              .map(el => ({ name: el.className || el.tagName, rect: el.getBoundingClientRect() }))
              .filter(el => el.rect.height > 0);
            const overflowing = [...sheet.querySelectorAll('*')].filter(el => {
              const r = el.getBoundingClientRect();
              if (getComputedStyle(el).display === 'none' || (!r.width && !r.height)) return false;
              return r.left < rect.left - 1 || r.right > rect.right + 1 ||
                r.top < rect.top - 1 || r.bottom > rect.bottom + 1;
            }).map(el => el.className || el.tagName);
            const overlaps = children.slice(1).flatMap((el, i) =>
              el.rect.top < children[i].rect.bottom - 1 ? [children[i].name + ' / ' + el.name] : []);
            return { page: sheet.dataset.page, left: rect.left, right: rect.right,
              width: rect.width, height: rect.height, clientWidth: sheet.clientWidth,
              clientHeight: sheet.clientHeight, scrollHeight: sheet.scrollHeight, overflowing, overlaps };
          }),
          page2Panel: (() => {
            const process = document.querySelector('.page2 .introduction-process');
            const colour = selector => getComputedStyle(document.querySelector(selector)).color;
            return { background: getComputedStyle(process).backgroundColor,
              heading: colour('.page2 .step-rail h3'), body: colour('.page2 .step-rail p') };
          })(),
          page3Layout: {
            services: document.querySelectorAll('.page3 .area-block').length,
            support: document.querySelectorAll('.page4 .support-pillar').length,
            supportColumns: getComputedStyle(document.querySelector('.page4 .support-grid')).gridTemplateColumns.split(/\s+/).length,
            minimumType: Math.min(...[...document.querySelectorAll('.page3 .demand-stat p,.page3 .areas-role,.page3 .earnings-table tbody th,.page4 .support-pillar p')].map(el => parseFloat(getComputedStyle(el).fontSize)))
          },
          page2Steps: document.querySelectorAll('.page2 .step-rail article').length,
          page2StepColumns: getComputedStyle(document.querySelector('.page2 .step-rail')).gridTemplateColumns.split(/\s+/).length,
          page2LogosLoaded: [...document.querySelectorAll('.page2 .lender-logos img')].every(img => img.complete && img.naturalWidth > 0),
          controls: clients.reduce((count, sheet) => count + sheet.querySelectorAll(interactive).length, 0) + Number(hasEvents)
        };
      });
      console.log(`${suffix} layout:`, JSON.stringify(results));
      assert.equal(results.sheets.length, 5);
      assert.equal(results.page3Layout.services, 0, 'Page 3 service list has been removed');
      assert.equal(results.page3Layout.support, 4, 'Keep all four support pillars');
      assert.equal(results.page3Layout.supportColumns, 2, 'Support must use two columns');
      assert.ok(results.page3Layout.minimumType >= 13, 'Page 3 supporting copy must be at least 13px');
      assert.equal(results.page2Steps, 3, 'Keep all three introduction steps');
      assert.equal(results.page2StepColumns, 3, 'Keep the introduction process in three columns');
      assert.ok(results.page2LogosLoaded, 'All lender logos must load');
      const luminance = colour => {
        const rgb = colour.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
          const channel = value / 255;
          return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
        });
        return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
      };
      const panelLuminance = luminance(results.page2Panel.background);
      assert.ok(panelLuminance < .1, 'The introduction panel must have a dark background');
      for (const colour of [results.page2Panel.heading, results.page2Panel.body]) {
        const textLuminance = luminance(colour);
        assert.ok((Math.max(textLuminance, panelLuminance) + .05) /
          (Math.min(textLuminance, panelLuminance) + .05) >= 4.5,
          'Introduction panel text must meet 4.5:1 contrast');
      }
      assert.equal(results.controls, 0, 'All four presentation pages must be flat documents');
      assert.equal(results.openingColumns, 2, 'Question and goals must share the asymmetric opening');
      assert.ok(results.fontsLoaded, 'The locally hosted editorial fonts must load');
      assert.equal(results.goalColumns, 1, 'The five presentation goals must form one prominent list');
      assert.ok(results.goalType >= 26, 'The five areas must have presentation-scale type');
      assert.equal(results.choiceColumns, 2, 'Choices must stay in two columns');
      assert.equal(results.choiceCount, 4, 'Keep all four choices');
      assert.ok(results.minimumType >= 14, 'Supporting text must stay at least 14px before preview scaling');
      if (results.nestedOverlaps.length) failures.push(`${suffix}: nested overlaps: ${results.nestedOverlaps.join(', ')}`);
      if (results.scrollWidth > width + 2) failures.push(`${suffix}: horizontal scrolling`);
      for (const sheet of results.sheets) {
        if (sheet.clientWidth !== 816 || sheet.clientHeight !== 1056)
          failures.push(`${suffix}: wrong sheet geometry on page ${sheet.page}`);
        if (sheet.left < -1 || sheet.right > width + 1)
          failures.push(`${suffix}: clipped sheet ${sheet.page}`);
        if (sheet.scrollHeight > sheet.clientHeight + 1 || sheet.overflowing.length || sheet.overlaps.length)
          failures.push(`${suffix}: page ${sheet.page} overflow/overlap: ${sheet.overflowing.join(',')} ${sheet.overlaps.join(',')}`);
        await page.locator(`[data-page="${sheet.page}"]`).screenshot({
          path: `dist/${({ '1': 'front-page', '2': 'mortgage-team', '3': 'business-opportunity', '4': 'getting-started', '7': 'illustration-notes' })[sheet.page]}-${suffix}.png`,
          animations: 'disabled', scale: 'css'
        });
      }
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
assert.equal(failures.length, 0, failures.join('\n'));
console.log('PASS: Pages 1–4 and final notes fit on desktop and scaled mobile; wrote ten screen screenshots.');
