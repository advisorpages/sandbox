// Source-aware acceptance gates for the six-sheet 8Twelve kit.
// Print proof and human editorial review are separate approval gates.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('index.html', 'utf8');
const pages = [...html.matchAll(/<section class="sheet [^"]+" data-page="(\d+)" data-part="([^"]+)">([\s\S]*?)<\/section>/g)]
  .map(x => ({ number: Number(x[1]), part: x[2], html: x[3] }));
const checks = [];
function check(condition, label) {
  checks.push({ ok: Boolean(condition), label });
  console.log((condition ? 'PASS ' : 'FAIL ') + label);
}
function has(page, term) { return pages[page - 1]?.html.includes(term) ?? false; }
function numberOn(page, token) {
  const match = pages[page - 1]?.html.match(token);
  return match ? Number(match[1].replaceAll(',', '')) : NaN;
}

check(pages.length === 6, 'Exactly six distinct US Letter pages: 4 presentation + 2 advisor tools');
check(pages.every((p,i) => p.number === i + 1), 'Page numbers are in order');
check(pages.map(p => p.part).join(',') === 'presentation,presentation,presentation,presentation,tools,tools',
  'Pages 1–4 presentation; pages 5–6 separately detachable field tools');
check(html.includes('@page{size:letter;margin:0}') && html.includes('width:8.5in;height:11in'),
  'US Letter portrait print size');
check(html.includes('.print-tools .sheet[data-part="presentation"]') && html.includes('.print-main .sheet[data-part="tools"]'),
  'Separate printable presentation and tool PDFs');
for (let i = 1; i <= 6; i++) {
  check(has(i, 'class="footer"') && has(i, '8Twelve'), 'Footer and 8Twelve identity: page ' + i);
}
for (const term of ['Buy a Home','Renew Your Mortgage','Refinance Your Home','Consolidate Debt','Increase Cash Flow'])
  check(has(1, term), 'Mortgage category: ' + term);

const before = numberOn(1, /<span>BEFORE<\/span><b>\$([\d,]+)\/mo<\/b>/);
const after = numberOn(1, /<span>AFTER<\/span><b>\$([\d,]+)\/mo<\/b>/);
const difference = numberOn(1, /class="money-pay"><b>\$([\d,]+)\/month<\/b>/);
const annual = numberOn(1, /or \$([\d,]+) per year/);
check(before === 3500 && after === 2800 && difference === 700 && annual === 8400 &&
  before - after === difference && difference * 12 === annual,
  'Actual displayed mortgage comparison = 3500 → 2800 = 700/month = 8400/year');
check(has(1, 'hypothetical') && has(1, 'penalties') && has(1, 'longer amortization') &&
  has(1, 'more total interest') && has(1, 'does not mean you qualify'),
  'Client illustration is clearly hypothetical and notes true costs/eligibility');
check(!has(1, '$500,000') && !has(1, 'writing-agent') && !has(2, '$500,000'),
  'Compensation absent from both client-facing mortgage-solution pages');

check(has(2, '65+') && has(2, 'lender partners') && has(2, '#13072') && has(2, 'FSRA'),
  '8Twelve credibility, published lender network and licence details on dedicated page 2');
check(has(2, 'www.8twelve.ca/about') && has(2, '8twelve.mortgage/licenses/') &&
  has(2, '8Twelve is a separate licensed mortgage brokerage'),
  'Credibility source/ownership boundary remains visible on Page 2');
check(has(2, "I'll personally introduce you") && has(2, "I'll stay in touch"),
  'Real personal handoff and accountability on mortgage page');
check(!/best rate guaranteed|guaranteed savings|award-winning|top-rated in Canada|\$3B\+/i.test(pages[0].html+pages[1].html),
  'No unsupported company accolades, borrowing guarantees or fictional financed figures');

check(has(3, 'More Ways to Help.') && has(3, 'More Ways to Earn.'),
  'Business opportunity Page 3 retains its headline');
for (const action of ['Ask', 'Introduce', 'Follow through']) check(has(3, action), 'Page 3 action: ' + action);
const funded = numberOn(3, /FUNDED MORTGAGE<\/span><b>\$([\d,]+)<\/b>/);
const writingAgent = numberOn(3, /APPROX\. WRITING AGENT<\/span><b>\$([\d,]+)<\/b>/);
check(funded === 500000 && writingAgent === 500 && funded / 100000 * 100 === writingAgent &&
  has(3, '$100 per $100,000 funded'), 'Actual displayed writing-agent example and math retained');
check(has(3, 'after broker/upline allocation') && has(3, 'not a pool to split again'),
  'Compensation is net to writing agent, not divided again');
check(has(3, 'not guaranteed income') && has(3, 'current written program terms') &&
  has(3, 'licensing or registration'), 'Compensation and program qualification disclosures');
check(has(3, '8Twelve Mortgage is a separate licensed mortgage brokerage') &&
  has(3, 'your financial brokerage business'), 'Business/8Twelve role boundary');
check(!has(4, '$500,000') && !has(4, '$500') && !has(4, 'broker/upline'),
  'Business development page does not redundantly cram compensation example');

for (const term of ['start', 'part-time', 'trainer', 'licensing', 'financial brokerage', 'team']) {
  check(pages[3].html.toLowerCase().includes(term.toLowerCase()), 'Page 4 business development: ' + term);
}
check(has(4, 'doesn\'t promise') && has(4, 'Guaranteed clients') && has(4, 'Would you want to take a look?'),
  'Realistic no-guarantee and a natural voluntary recruiting next step');
check((pages[4].html.match(/class="question"/g) ?? []).length >= 8 &&
  has(5, '8Twelve') && has(5, 'Would Thursday work'),
  'Separate agent conversation guide includes eight contexts and dated follow-up');
check(has(5, 'Asks about joining the team') && has(5, 'Keep this separate.'),
  'No forced recruiting pivot during the client conversation');
check((pages[5].html.match(/class="field"/g) ?? []).length >= 12 &&
  has(6, 'notes-lines') && has(6, 'form-grid'), 'Field-ready, handwriting-friendly worksheet');
check(has(6, 'share my name') && has(6, 'phone or email above') &&
  has(6, '8Twelve Mortgage specialist') && has(6, 'Any other worksheet details need separate permission'),
  'Specific named minimum-data consent for contact details');
check(has(6, 'Do not record SIN') && has(6, 'Share completed forms only through an approved secure process'),
  'Data minimization and secure handling on worksheet');
check(!/\bA12\b|Primerica|Tribe PRI|game.changing|explosive growth|\bsynergy\b/i.test(html),
  'No obsolete brand name, cross-brand claims or hype');
check(html.includes('Development draft') && !/FINAL APPROVED|Ready for distribution/i.test(html),
  'Development status preserved; no false owner approval');

const failed = checks.filter(x => !x.ok);
console.log(`Result: ${checks.length-failed.length}/${checks.length} checks passed.`);
assert.equal(failed.length, 0, failed.map(x=>x.label).join('\n'));
console.log('Human print/design/voice review and compensation verification still required.');
