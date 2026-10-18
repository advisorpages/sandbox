// Content gates for the A12 Mortgage Conversation Kit.
// Editorial voice and visual polish are reviewed by a person using SPEC.md and the live KB.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('index.html', 'utf8');
const pages = [...html.matchAll(/<section class="sheet(?: [^"]+)?" data-page="(\d)"[^>]*>([\s\S]*?)(?=<section class="sheet(?: [^"]+)?"|<\/main>)/g)];
const checks = [];
function check(ok, reason) { checks.push([!!ok, reason]); if (!ok) console.error('FAIL: ' + reason); }
function has(page, text) { return pages[page - 1]?.[2].includes(text) ?? false; }

check(pages.length === 4, 'Exactly 4 separate pages');
for (let i = 1; i <= 4; i++) {
  check(pages[i - 1]?.[2]?.includes('p1-footer'), 'Premium print footer on Page ' + i);
}
check((html.match(/<section class="sheet sheet--premium"/g) ?? []).length === 4,
  'All four pages use the approved development design system');
check(!has(1, 'class="card"') && !has(1, 'class="grid"'),
  'Premium client page must not regress to generic card-grid layout');
check(has(1, 'p1-case-result'), 'Page 1 has a prominent financial illustration');
check(has(2, 'p2-earn-numbers'), 'Page 2 has a prominent compensation illustration');
check((pages[2]?.[2].match(/class="p3-question"/g) ?? []).length >= 4,
  'Page 3 has at least four usable spoken conversation openers');
check(has(4, 'p4-notes') && (pages[3]?.[2].match(/class="p4-field"/g) ?? []).length >= 10,
  'Page 4 has a substantial blank discovery worksheet');

for (let i = 1; i <= 4; i++) check(pages[i - 1]?.[1] === String(i), 'Page ' + i + ' in order');
check(html.includes('@page{size:letter;margin:0}'), 'Letter portrait print CSS');
check(html.includes('width:8.5in;height:11in'), 'Printed page dimensions');

for (const category of ['Buy a Home', 'Renew Your Mortgage', 'Refinance Your Home', 'Consolidate Debt', 'Increase Cash Flow']) {
  check(has(1, category), 'Client goal: ' + category);
}
for (const amount of ['$3,500/mo', '$2,800/mo', '$700/month', '$8,400 per year']) check(has(1, amount), 'Page 1 amount ' + amount);
// Check the figures in the rendered source, not just a hard-coded math tautology.
const p1 = pages[0]?.[2] ?? '';
const money = p1.match(/<small>BEFORE<\/small><strong>\$([\d,]+)\/mo<\/strong>[\s\S]*?<small>AFTER<\/small><strong>\$([\d,]+)\/mo<\/strong>[\s\S]*?p1-case-result"><b>\$([\d,]+)\/month<\/b>[\s\S]*?<strong>\$([\d,]+) per year<\/strong>/);
const nums = money?.slice(1).map(x => Number(x.replaceAll(',', ''))) ?? [];
check(nums.length === 4 && nums[0] - nums[1] === nums[2] && nums[2] * 12 === nums[3] && nums.join() === '3500,2800,700,8400', 'Displayed mortgage arithmetic and locked illustration');
check(/fees and penalties|fees\/penalties|fees, longer/.test(pages[0]?.[2] ?? '') || (has(1, 'fees') && has(1, 'interest')), 'Mortgage cost disclosure on Page 1');
check(has(2, 'More Ways to Help.') && has(2, 'More Ways to Earn.'), 'Page 2 opportunity headline');
for (const step of ['Ask', 'Introduce', 'Follow through']) check(has(2, step), 'Page 2 step: ' + step);
check(has(2, '$500,000') && has(2, '$500') && has(2, '$100 per $100,000'), 'Page 2 compensation example');
const p2 = pages[1]?.[2] ?? '';
const fundedMatch = p2.match(/FUNDED MORTGAGE VOLUME<\/small><b>\$([\d,]+)<\/b>/);
const agentMatch = p2.match(/APPROX\. WRITING-AGENT AMOUNT<\/small><b>\$([\d,]+)<\/b>/);
const funded = fundedMatch ? Number(fundedMatch[1].replaceAll(',', '')) : NaN;
const agent = agentMatch ? Number(agentMatch[1].replaceAll(',', '')) : NaN;
check(funded === 500000 && agent === 500 && funded / 100000 * 100 === agent, 'Displayed writing-agent arithmetic and locked example');
check(has(2, 'broker/upline'), 'Agent amount already includes allocation');
check(/not guaranteed|No income or payment is guaranteed/i.test(pages[1]?.[2] ?? ''), 'No assured compensation');
check(/build (a|your) business|building a business|build your financial brokerage/i.test(p2), 'Recruiting/business-building purpose retained');
check(has(2, 'start part-time') && has(2, 'trainer') && has(2, 'licensing'), 'Recruiting orientation retains part-time start, support and licensing');
check(has(2, 'separate licensed mortgage brokerage') && has(2, 'own financial brokerage'), 'Distinct legal brokerages for service and business opportunity');
check(!/paid to recruit|automatic commission|earn guaranteed income/i.test(p2), 'No misleading recruiting compensation claim');
check(!has(1, 'writing-agent') && !has(1, '$500,000'), 'Compensation kept off client page');
check(has(1, 'WHY 8TWELVE MORTGAGE?') && has(1, '65+') && has(1, 'FSRA') && has(1, '#13072'), 'Page 1 names 8Twelve and demonstrates specific supported credibility');
check(has(1, 'Lender network reported by 8Twelve Mortgage') && has(1, '8twelve.mortgage/licenses/'), '8Twelve source attribution remains visible on client page');
check(has(1, 'personally introduce') && has(1, 'licensed specialist'), 'Personal mortgage introduction retained');
check(!/best rate guaranteed|guaranteed savings|award-winning|top-rated in Canada|\$3B\+/i.test(p1), 'No unsourced accolades, guarantees or funded-volume claims');
check(has(3, 'Conversation') && has(3, 'introduce'), 'Conversation guide and handoff');
check(has(3, '8Twelve Mortgage') && has(3, 'Would you like me to introduce you?') && has(3, 'Thursday'), 'Credible 8Twelve introduction and concrete consent-based follow-up on Page 3');
check(has(3, 'asks about joining') && has(3, 'team leader'), 'Separate optional teammate conversation on Page 3');
check(has(4, 'Mortgage') && has(4, 'Discovery.') && has(4, 'Introduction permission'), 'Blank discovery worksheet');
check(has(4, '8Twelve Mortgage specialist') && has(4, 'share my name') && has(4, 'phone number or email') && has(4, 'Other worksheet details require separate permission'), 'Named minimum-data consent on Page 4');
check(!/Primerica|Tribe PRI/i.test(html), 'No cross-company brand copy');
check(!/\bA12\b/.test(html), 'No obsolete A12 stand-in in production preview');
for (let i=1;i<=4;i++) check(has(i, '8Twelve'), 'Correct 8Twelve identity on Page '+i);
check(!/\bsynergy\b|game.changing|explosive growth|risk.free|can.t lose/i.test(html), 'No hype and corporate buzzwords');

for (const [ok, name] of checks) console.log((ok ? 'PASS' : 'FAIL') + ' ' + name);
assert(checks.every(([ok]) => ok), 'Content QA failed. Read SPEC.md and the KB voice standards before updating copy.');
console.log('Content QA passed: ' + checks.length + ' checks. Human voice/design approval is still required.');
