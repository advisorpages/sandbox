// Source-aware acceptance gates for the seven-sheet 8Twelve kit.
// Print proof and human editorial review are separate approval gates.
import { readFileSync, existsSync } from 'node:fs';
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

check(pages.length === 7, 'Exactly seven US Letter sheets: 4 presentation + 2 advisor tools + illustration notes');
check(pages.every((p,i) => p.number === i + 1), 'Page numbers are in order');
check(pages.map(p => p.part).join(',') === 'presentation,presentation,presentation,presentation,tools,tools,notes',
  'Pages 1–4 presentation; 5–6 field tools; 7 shared illustration notes');
check(html.includes('@page{size:letter;margin:0}') && html.includes('width:8.5in;height:11in'),
  'US Letter portrait print size');
check(html.includes('.print-tools .sheet[data-part="presentation"]') && html.includes('.print-main .sheet[data-part="tools"]'),
  'Separate printable presentation and tool PDFs');
for (let i = 1; i <= 7; i++) {
  check(has(i, 'class="footer"') && has(i, '8Twelve'), 'Footer and 8Twelve identity: page ' + i);
}
check(pages.every(p => !p.html.includes('class="header"') && !p.html.includes('class="wordmark"')),
  'No page carries the 8Twelve MORTGAGE branding header or part label');
for (const term of ['Buy a Home','Renew Your Mortgage','Refinance Your Home','Consolidate Debt','Increase Cash Flow'])
  check(has(1, term), 'Mortgage category: ' + term);

function rowsIn(page, className, section = 'tbody') {
  const table = pages[page - 1]?.html.match(new RegExp(`<table class="${className}">([\\s\\S]*?)<\\/table>`))?.[1];
  const body = table?.match(new RegExp(`<${section}>([\\s\\S]*?)<\\/${section}>`))?.[1] ?? '';
  return [...body.matchAll(/<tr(?:\s[^>]*)?>([\s\S]*?)<\/tr>/g)].map(row =>
    [...row[1].matchAll(/<t[hd](?:\s[^>]*)?>([\s\S]*?)<\/t[hd]>/g)].map(cell =>
      cell[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()));
}
function dollars(text) {
  const match = text?.match(/\$([\d,]+)/);
  return match ? Number(match[1].replaceAll(',', '')) : NaN;
}
const paymentRows = rowsIn(1, 'payment-comparison');
const paymentTotals = rowsIn(1, 'payment-comparison', 'tfoot')[0] ?? [];
const before = dollars(paymentTotals[1]);
const after = dollars(paymentTotals[2]);
const difference = numberOn(1, /What could <b>\$([\d,]+) a month<\/b> do/);
const annual = numberOn(7, /difference is \$([\d,]+) over a year/);
check(before === 5798 && after === 4757 && difference === 1041 && annual === 12492 &&
  before - after === difference && difference * 12 === annual && has(7, 'only if it continues for 12 months') &&
  has(1, 'savings / month') && !has(1, 'A mortgage guide for Toronto families') &&
  has(1, 'Consider a Toronto family') && !has(1, 'typical Toronto family') &&
  pages[0].html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').includes('What do you want your mortgage to do?') &&
  !has(1, 'class="header"') && !has(1, 'class="kicker"') && !has(1, 'class="wordmark"'),
  'Displayed Toronto fixed-rate comparison = 5798 → 4757 = 1041/month = 12492/year');
const expectedPayments = [
  ['Mortgage', 4273],
  ['Credit cards', 765],
  ['Car or personal loan', 510],
  ['Line of credit', 250],
];
check(paymentRows.length === expectedPayments.length && paymentRows.every((row, i) =>
  row.length === 3 && row[0].startsWith(expectedPayments[i][0] + ' ') && dollars(row[1]) === expectedPayments[i][1] &&
  (i === 0 ? dollars(row[2]) === after : row[2] === '—')) &&
  paymentRows.reduce((sum, row) => sum + dollars(row[1]), 0) === before && has(1, 'Four payments become one.'),
  'Three-column debt/payment comparison retains the four payments and consistent totals');
const debtAssumptions = rowsIn(7, 'debt-assumptions');
const expectedAssumptions = [
  ['Mortgage', 750000, '4.79%', '25 years'],
  ['Credit cards', 25500, '20.99%', '3% of the balance'],
  ['Car or personal loan', 24000, '9.99%', '5 years'],
  ['Line of credit', 35500, '8.45%', 'interest-only'],
];
check(debtAssumptions.length === 4 && debtAssumptions.every((row,i) =>
  row.length === 3 && row[0] === expectedAssumptions[i][0] && dollars(row[1]) === expectedAssumptions[i][1] &&
  row[2].includes(expectedAssumptions[i][2]) && row[2].includes(expectedAssumptions[i][3])) &&
  debtAssumptions.reduce((sum,row)=>sum+dollars(row[1]),0) === 835000,
  'All original balances, rates and payment assumptions are preserved on the final notes page');
check(has(1, 'class="payments-difference"') && has(1, '<strong>$1,041</strong>') &&
  has(1, 'savings / month') && !has(1, 'pd-save'),
  'The supporting example retains a clear payment difference as monthly payment savings');
check(has(1, 'What could <b>$1,041 a month</b> do?') &&
  has(1, 'Invest the difference') && has(1, 'Pay extra on your mortgage') &&
  has(1, 'Do some of both') && has(1, 'Give your budget more room') &&
  has(1, 'everyday costs') && has(1, '$171,000') && has(7, '17.8 years instead of 25') &&
  has(1, '7.2 years sooner') && has(7, '$520.50') &&
  has(1, '$85,000') && has(1, '4.3 years sooner'),
  'Page 1 names four clear options and shows a skimmable outcome for each');

// Independently check the model behind the displayed figures, not just the copy.
const declaredMortgageRate = Number(pages[6].html.match(/fixed ([\d.]+)% annual interest, compounded semiannually/)?.[1]) / 100;
const mortgageMonths = Number(pages[6].html.match(/and (\d+)-year amortization/)?.[1]) * 12;
const mortgageRate = (1 + declaredMortgageRate / 2) ** (1 / 6) - 1;
const monthlyPayment = principal => principal * mortgageRate / (1 - (1 + mortgageRate) ** -mortgageMonths);
const consolidatedPayment = Math.round(monthlyPayment(835000) * 100) / 100;
const payoffYears = extra => -Math.log(1 - 835000 * mortgageRate / (consolidatedPayment + extra)) /
  Math.log(1 + mortgageRate) / 12;
const investmentRate = Number(pages[6].html.match(/at the ([\d.]+)% annual rate divided by 12/)?.[1]) / 100 / 12;
const investmentMonths = Number(pages[6].html.match(/starting balance for (\d+) years, with monthly compounding/)?.[1]) * 12;
const futureValue = contribution => contribution * ((1 + investmentRate) ** investmentMonths - 1) / investmentRate;
check(Math.round(monthlyPayment(750000)) === dollars(paymentRows[0]?.[1]) &&
  Math.round(consolidatedPayment) === after &&
  (25 - payoffYears(difference)).toFixed(1) === '7.2' &&
  payoffYears(difference).toFixed(1) === '17.8' &&
  (25 - payoffYears(difference / 2)).toFixed(1) === '4.3' &&
  Math.round(futureValue(difference) / 1000) * 1000 === 171000 &&
  Math.round(futureValue(difference / 2) / 1000) * 1000 === 85000,
  'Semiannual fixed-rate mortgage and month-end investment math reproduce the displayed rounded outcomes');
const preciseNotes = pages[6].html.match(/monthly payments: \$([\d,.]+) on \$750,000; \$([\d,.]+) on \$835,000/);
check(preciseNotes &&
  Number(preciseNotes[1].replaceAll(',', '')) === Math.round(monthlyPayment(750000) * 100) / 100 &&
  Number(preciseNotes[2].replaceAll(',', '')) === consolidatedPayment &&
  numberOn(7, /12: \$([\d,]+)/) === Math.round(futureValue(difference)) &&
  numberOn(7, /about \$([\d,]+), shown as \$85,000/) === Math.round(futureValue(difference / 2)),
  'Precise mortgage payments and unrounded investment disclosures agree with the model');
check(pages[6].html.toLowerCase().includes('hypothetical') &&
  has(7, 'penalties') && has(7, 'Taking longer to repay your mortgage') &&
  has(7, 'more total interest') && has(7, 'does not mean you qualify') && has(7, 'continues for 12 months') &&
  has(7, "they aren't erased") && has(7, 'Your home secures the combined debt') && has(7, 'combined $835,000 balance') &&
  has(7, '80% of the home') && has(7, '$1,043,750') &&
  has(7, 'not a claim about typical households or current market-average rates') &&
  has(7, 'Actual balances, rates and payments will differ') &&
  has(7, 'compounded semiannually') && has(7, 'Both payoff comparisons start with the combined $835,000 balance') &&
  has(7, 'permitted, fee-free prepayments and the same rate through renewals') &&
  has(7, 'not a 25-year fixed-rate term') && has(7, 'Refinancing costs are paid separately') &&
  has(7, 'Fees or penalties may apply') && has(7, 'Your home secures the combined debt'),
  'Payment illustration is backed by dedicated costs, eligibility and consolidation disclosures');
check(!has(1, '$500,000') && !has(1, 'writing-agent') && !has(2, '$500,000'),
  'Compensation absent from both client-facing mortgage-solution pages');

const lenderLogos = ['rbc', 'td', 'scotiabank', 'cibc', 'bmo', 'national-bank'];
check(has(2, '65+') && has(2, '400+') && has(2, '7,000+') && has(2, 'provincial &amp; territorial licences') &&
  pages[1].html.toLowerCase().includes('lender') &&
  has(2, 'Major banks') && has(2, 'Alternative') && has(2, 'Credit unions') && has(2, 'Private lenders') &&
  lenderLogos.every(name => existsSync(`assets/lenders/${name}.svg`) && has(2, `assets/lenders/${name}.svg`)) &&
  !has(2, '#13072') && has(7, '#13072') && has(7, 'FSRA'),
  'Page 2 leads with visual lender panel and lender types; licence detail moved to notes');
check(has(2, 'Help at every step') && has(2, 'We stay with you.') &&
  has(2, '8Twelve compares your options.') &&
  has(2, 'A licensed mortgage specialist reviews lenders') && has(2, 'helps with the application') &&
  has(2, 'What happens next') && has(2, 'Tell us what you need') &&
  has(2, 'Meet your mortgage specialist') &&
  has(2, "Review your options together") &&
  has(2, "I’ll introduce you to a licensed mortgage specialist on our 8Twelve team.") &&
  !has(2, 'Your next step') && !has(2, 'Ask for an introduction') &&
  /<div class="introduction-process">/.test(pages[1].html) &&
  [...pages[1].html.matchAll(/<article><small>0[123]<\/small>/g)].length === 3,
  'Page 2 closes with a shaded three-step client process as the call to action');
check(has(7, 'www.8twelve.ca/about') &&
  has(7, '8twelve.mortgage/licenses/') && has(7, '8Twelve is a separate licensed mortgage brokerage'),
  'Illustration notes carry the dedicated brokerage sources and role disclosure');
check(has(7, 'Hypothetical rates, not guaranteed returns') && has(7, 'each month-end from a $0 starting balance') &&
  has(7, 'annual rate divided by 12') && has(7, 'exclude fees, taxes and inflation') &&
  has(7, 'Actual returns vary and can be negative') && has(7, 'mortgage payments and available cash may change') &&
  has(7, 'appropriately licensed investment advisor') && has(7, '$520.50/month') &&
  has(7, "Returns and payment differences aren't guaranteed") && has(7, 'original car loan ends after five years'),
  'Investing illustration is backed by assumptions, risks and the separate investment-advice role');
check(has(7, 'id="illustration-notes"') && has(1, 'id="mortgage-solutions"') && has(2, 'id="mortgage-team"') &&
  html.includes('.print-tools .sheet[data-part="notes"]') &&
  !has(1, 'Meet your mortgage team · Page 2') &&
  !has(2, 'each month-end from a $0 starting balance'),
  'First page omits the removed page reference; final notes remain separate');
check(!/<(?:a|button|input|details|select|textarea|iframe)\b/i.test(pages[0].html) &&
  !/\b(?:on\w+|tabindex|contenteditable)\s*=|\brole\s*=\s*["'](?:button|link|checkbox|radio|switch|tab|textbox|combobox|slider|spinbutton|listbox|menuitem|option)["']/i.test(pages[0].html) &&
  !/hypothetical|guarantee|fees|penalties|assumptions|compounded|6%|\$520\.50|\$835,000/i.test(pages[0].html),
  'First page is completely flat, with disclaimers and calculation mechanics on the final page');
const frontWords = pages[0].html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
check(frontWords <= 290,
  `Front-page text stays concise with the family story: ${frontWords} words versus 329`);
check(!/\$1,035|\$5,815|\$4,780|\$170,000|7\.7 years|17\.3 years|4\.6 years/.test(pages[0].html + pages[6].html),
  'Front page and shared notes contain no superseded illustration values');
check(!/best rate guaranteed|guaranteed savings|award-winning|top-rated in Canada|\$3B\+/i.test(pages[0].html+pages[1].html),
  'No unsupported company accolades, borrowing guarantees or fictional financed figures');

check(has(3, 'Refer a Mortgage.') && has(3, 'Build a Business.'),
  'Business opportunity Page 3 retains its headline');
for (const action of ['Ask what they need', 'Make the introduction', 'Stay in touch']) check(has(3, action), 'Page 3 role: ' + action);
const funded = numberOn(3, /An example with a \$([\d,]+) mortgage/);
const earningRows = rowsIn(3, 'earnings-table');
const belowRvp = dollars(earningRows[0]?.[1]);
const rvp = dollars(earningRows[0]?.[2]);
check(funded === 500000 && belowRvp === 430 && rvp === 810 &&
  Math.round(0.00086 * funded) === belowRvp && Math.round(0.00162 * funded) === rvp,
  'Displayed below-RVP and RVP compensation matches the current referral factors');
const annualBelowRvp = dollars(earningRows[1]?.[1]);
const annualRvp = dollars(earningRows[1]?.[2]);
check(earningRows.length === 2 && earningRows[1][0].includes('One family a week') &&
  annualBelowRvp === belowRvp * 52 && annualRvp === rvp * 52 &&
  has(3, 'The business is simple: have a conversation and set the introduction.') &&
  !has(3, 'extra room') && !has(3, 'FUNDED MORTGAGE') &&
  has(7, '52 completed $500,000 mortgages') && has(7, 'Introductions alone do not earn these amounts'),
  'One-family-per-week illustration equals 52 completed mortgages at each example pay level');
check(has(7, '1% ($5,000)') && has(7, '0.00086 below RVP ($430)') &&
  has(7, '0.00162 for RVP ($810)') && has(7, '13% HST'),
  'Notes page discloses partner compensation, referral factors and HST');
check(has(7, 'not guaranteed income') && has(7, 'current written program terms') &&
  has(7, 'eligibility, required disclosures and timing'), 'Notes page carries compensation and program qualification disclosures');
check(has(7, '8Twelve is a separate licensed mortgage brokerage') &&
  has(7, "advisor's own financial brokerage"), 'Notes page carries the business/8Twelve role boundary');
check(has(7, 'Page 3 sources: [1]') && has(7, '$912 billion') && has(7, 'Q2 2025–Q1 2026') &&
  has(7, 'https://www.cmhc-schl.gc.ca/professionals/housing-markets-data-and-research/housing-research/research-reports/housing-finance/residential-mortgage-industry-report') &&
  has(7, 'mcs-ebook-2025.pdf#page=12') && has(7, 'including lenders and brokers') &&
  has(7, '2026-mpc_the-broker-advantage_en.pdf#page=3') && has(7, '48% of recent first-time buyers') &&
  has(7, 'Surveys do not isolate mortgage agents'),
  'Disclaimer section links directly to all three dated sources and preserves channel/survey scope');
check(!has(3, 'not guaranteed') && !has(3, 'HST') && !has(3, 'brokerage'),
  'Business opportunity page keeps its compensation section free of disclaimers');
check(has(3, '$912 billion') && has(3, '70%') && has(3, '48%') &&
  has(3, 'That’s how much mortgage lending took place across Canada in the year ending March 2026.') &&
  has(3, 'Seven in ten recent mortgage customers asked a mortgage professional about their options.') &&
  has(3, 'Nearly half of recent first-time buyers got their mortgage through the broker channel.') &&
  has(3, 'CMHC · Aug 2026 [1]') && has(3, 'CMHC · 2025 survey [2]') && has(3, 'MPC / Bond · 2026 survey [3]') &&
  !has(3, '6.6 million') && !has(3, '26%') && has(3, 'Sources: illustration notes'),
  'Page 3 shows annual lending volume, professional-help demand and first-time-buyer channel use with source references');
check(!has(3, '$54,000') && !has(3, '65+') && !has(3, 'over age 65') &&
  !has(3, '$100,000') && !has(3, '$150,000') && !has(3, '1.15M'),
  'Page 3 omits unverified debt, senior, shortfall and renewal-wave figures');
const support = pages[3].html.match(/<div class="support">([\s\S]*?)<div class="invite">/)?.[1] ?? '';
check(support.includes('Support around you') &&
  support.includes("You won't build this alone.") &&
  ['A trainer beside you', 'A system to follow', 'A team to lean on', 'Direct access to mortgage experts'].every(term => support.includes(term)) &&
  support.includes('Early appointments are trainer-led. You watch, then take part.') &&
  support.includes('A clear, structured path for what to learn and what to do next.') &&
  support.includes('Weekly training, team meetings and people who answer when you ask.') &&
  support.includes('Talk with a mortgage specialist when a question comes up.'),
  'Page 4 includes the approved four-pillar support system');
check(!has(3, 'class="support"') && /class="journey"[\s\S]*class="support"[\s\S]*class="invite"/.test(pages[3].html),
  'Support moves from Page 3 to Page 4 directly before the invitation');
check(!/\b(guarantee\w*|client\w*|income|commissions?|success\w*|licensing|qualification|brokerage|HST|8Twelve)\b/i.test(support),
  'Support copy avoids outcome, income, client and role-boundary claims');
check((support.match(/class="support-pillar"/g) ?? []).length === 4 &&
  (pages[2].html.match(/class="area-block"/g) ?? []).length === 0 &&
  !pages[2].html.includes('class="num"') && !pages[2].html.includes('Someone'),
  'Page 4 keeps four support pillars; Page 3 omits the service list and helper captions');
check(has(4, 'Start part-time around your day job. Meet online or in person.') &&
  has(4, 'No sales quotas') && has(4, 'Connect with families across Canada') &&
  has(4, 'You can put together a team of agents. It’s optional.') &&
  !/no (?:borders|jurisdictions)|entire population/i.test(pages[3].html),
  'Page 4 explains flexible participation, national introductions and optional team building');
check(!has(4, '$500,000') && !has(4, '$500') && !has(4, 'broker/upline'),
  'Business development page does not redundantly cram compensation example');

for (const term of ['start', 'part-time', 'trainer', 'background check', 'introduce', 'referral', 'team']) {
  check(pages[3].html.toLowerCase().includes(term.toLowerCase()), 'Page 4 introduction-led business development: ' + term);
}
check(has(4, 'How to get started') && has(4, 'Get qualified') && has(4, 'Get your link') &&
  has(4, 'Work with a trainer') && has(4, 'Introduce and grow'),
  'Page 4 keeps the four-stage how-to-start chart');
check(has(4, 'background check') && has(4, 'agent portal link') &&
  has(4, 'Introduce people you know to our mortgage specialist') &&
  has(4, 'become referable') && !has(4, 'licensing'),
  'Page 4 presents the introduction-led referral path and implies no licence for the referrer');
check(!has(4, 'class="questions"') && !has(4, 'Where do I find clients?') &&
  !has(4, 'Will I be alone?') && !has(4, "I'm not a salesperson. Can I do this?"),
  'Page 4 omits the removed Common Questions section');
check(/class="journey"[\s\S]*class="support"[\s\S]*class="invite"/.test(pages[3].html),
  'Page 4 flows from starting steps through support to the broker conversation');
check(!has(4, "doesn't promise") && !has(4, 'guaranteed clients') &&
  has(7, "This doesn't promise guaranteed clients, mortgage approvals, commissions or success.") &&
  has(7, 'Results depend on the work you put in.') &&
  has(4, 'Could this be a fit for you?') &&
  has(4, 'Let’s book a conversation with our broker to explore the opportunity.'),
  'Page 4 closes with an exploratory invitation; the final notes preserve its no-guarantee disclaimer');
check((pages[4].html.match(/class="question"/g) ?? []).length >= 8 &&
  has(5, '8Twelve') && has(5, 'Would Thursday work'),
  'Separate agent conversation guide includes eight contexts and dated follow-up');
check(has(5, 'Asks about joining the team') && has(5, 'Keep this separate.'),
  'No forced recruiting pivot during the client conversation');
check((pages[5].html.match(/class="field"/g) ?? []).length >= 8 &&
  has(6, 'notes-lines') && has(6, 'form-grid'), 'Field-ready, handwriting-friendly worksheet');
check(has(6, 'share my name') && has(6, 'phone or email above') &&
  has(6, '8Twelve Mortgage specialist') && has(6, 'Any other worksheet details need separate permission'),
  'Specific named minimum-data consent for contact details');
check(has(6, 'Do not record SIN') && has(6, 'Share completed forms only through an approved secure process'),
  'Data minimization and secure handling on worksheet');
const worksheetOrder = ['Start with the goal', 'What are you hoping to do?', 'What matters most to you?',
  'The basic numbers', 'Questions and contact']
  .map(term => pages[5].html.indexOf(term));
check(worksheetOrder.every((index, i) => index >= 0 && (i === 0 || index > worksheetOrder[i - 1])),
  'Discovery worksheet runs goal → priorities → context → contact');
check((pages[5].html.match(/class="part-num"/g) ?? []).length === 3,
  'Discovery worksheet is grouped into three guided parts');
const askQuestions = ['What are you hoping to do?', 'When would you like to make a change?',
  'When does your mortgage come up for renewal?', 'What matters most to you?',
  "Roughly, what's your home worth?", 'Roughly, how much is left on your mortgage?',
  'Roughly, what do you pay each month?', 'What would you like the specialist to answer for you?',
  "What's your name?", "What's the best phone number or email to reach you?",
  "When's a good time to connect?"]
check(askQuestions.every(term => has(6, term)),
  'Discovery worksheet labels are direct questions the agent can ask aloud');
check(!has(6, 'Before you hand this off') && !has(6, 'Introducer') && !has(6, "Date you'll check back"),
  'Redundant hand-off readiness section removed');
check(has(6, '<h1>Hand-Off <em>Document.</em></h1>') && !has(6, 'Advisor hand-off') &&
  has(6, 'does not start a mortgage review') &&
  has(6, 'do not process the mortgage') && !has(6, 'About you'),
  'Discovery worksheet is framed as a specialist hand-off, not a mortgage review');
check(!/\bA12\b|Primerica|Tribe PRI|game.changing|explosive growth|\bsynergy\b/i.test(html),
  'No obsolete brand name, cross-brand claims or hype');
check(html.includes('Development draft') && !/FINAL APPROVED|Ready for distribution/i.test(html),
  'Development status preserved; no false owner approval');

const failed = checks.filter(x => !x.ok);
console.log(`Result: ${checks.length-failed.length}/${checks.length} checks passed.`);
assert.equal(failed.length, 0, failed.map(x=>x.label).join('\n'));
console.log('Human print/design/voice review and compensation verification still required.');
