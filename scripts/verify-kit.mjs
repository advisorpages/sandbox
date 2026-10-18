// Content gates for the A12 Mortgage Conversation Kit.
// Editorial voice and visual polish are reviewed by a person using SPEC.md and the live KB.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const html = readFileSync('index.html', 'utf8');
const pages = [...html.matchAll(/<section class="sheet" data-page="(\d)"[^>]*>([\s\S]*?)(?=<section class="sheet"|<\/main>)/g)];
const checks = [];
function check(ok, reason) { checks.push([!!ok, reason]); if (!ok) console.error('FAIL: ' + reason); }
function has(page, text) { return pages[page - 1]?.[2].includes(text) ?? false; }

check(pages.length === 4, 'Exactly 4 separate pages');
for (let i = 1; i <= 4; i++) check(pages[i - 1]?.[1] === String(i), 'Page ' + i + ' in order');
check(html.includes('@page{size:letter;margin:0}'), 'Letter portrait print CSS');
check(html.includes('width:8.5in;height:11in'), 'Printed page dimensions');

for (const category of ['Buy a Home', 'Renew Your Mortgage', 'Refinance Your Home', 'Consolidate Debt', 'Increase Cash Flow']) {
  check(has(1, category), 'Client goal: ' + category);
}
for (const amount of ['$3,500/mo', '$2,800/mo', '$700/month', '$8,400 per year']) check(has(1, amount), 'Page 1 amount ' + amount);
check(3500 - 2800 === 700 && 700 * 12 === 8400, 'Payment comparison arithmetic');
check(/fees and penalties|fees\/penalties|fees, longer/.test(pages[0]?.[2] ?? '') || (has(1, 'fees') && has(1, 'interest')), 'Mortgage cost disclosure on Page 1');
check(has(2, 'More Ways to Help.') && has(2, 'More Ways to Earn.'), 'Page 2 opportunity headline');
for (const step of ['Ask', 'Introduce', 'Follow through']) check(has(2, step), 'Page 2 step: ' + step);
check(has(2, '$500,000') && has(2, '$500') && has(2, '$100 per $100,000'), 'Page 2 compensation example');
check(500000 / 100000 * 100 === 500, 'Agent compensation illustration arithmetic');
check(has(2, 'broker/upline'), 'Agent amount already includes allocation');
check(/not guaranteed|No income or payment is guaranteed/i.test(pages[1]?.[2] ?? ''), 'No assured compensation');
check(/build a business|building a business/.test(pages[1]?.[2] ?? ''), 'Recruiting/business-building purpose retained');
check(!has(1, 'writing-agent') && !has(1, '$500,000'), 'Compensation kept off client page');
check(has(3, 'Conversation') && has(3, 'introduce'), 'Conversation guide and handoff');
check(has(3, 'asks about joining') && has(3, 'team leader'), 'Separate optional teammate conversation on Page 3');
check(has(4, 'Mortgage Discovery') && has(4, 'Introduction permission'), 'Blank discovery worksheet');
check(!/Primerica|Tribe PRI/i.test(html), 'A12-only page branding');
check(!/\bsynergy\b|game.changing|explosive growth|risk.free|can.t lose/i.test(html), 'No hype and corporate buzzwords');

for (const [ok, name] of checks) console.log((ok ? 'PASS' : 'FAIL') + ' ' + name);
assert(checks.every(([ok]) => ok), 'Content QA failed. Read SPEC.md and the KB voice standards before updating copy.');
console.log('Content QA passed: ' + checks.length + ' checks. Human voice/design approval is still required.');
