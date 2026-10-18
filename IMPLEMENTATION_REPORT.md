# 8Twelve Mortgage Conversation Kit — Implementation and QA Report

**Date:** 2026-10-18  
**Status:** **DEVELOPMENT DRAFT — OWNER AND PROGRAM/COMPLIANCE APPROVAL PENDING**  
**Master specification:** [SPEC.md](SPEC.md). **Original findings:** [SPEC_AUDIT.md](SPEC_AUDIT.md).  
**Last full proof tested:** GitHub Actions [run 39136090501](https://github.com/advisorpages/sandbox/actions/runs/39136090501) at source commit `4963f2f0e6a62a7efa16f414f1dfb83363cd4d27`, result **success**.

## Summary

The four-page presentation is corrected to use the **actual 8Twelve Mortgage name**, demonstrate practical, source-attributed brokerage credibility on the client page, and describe a personal handoff to a licensed 8Twelve mortgage specialist. 8Twelve is a **separate licensed mortgage brokerage**; a potential teammate explores **the advisor's own financial brokerage**, not automatic employment or licensing with 8Twelve.

The original client attraction, agent compensation, recruiting and business-building functions are preserved. Neither the **$3,500 → $2,800 = $700/month; $8,400/year** hypothetical client example nor the **$500,000 funded → approximately $500 writing-agent** training illustration was deleted or changed. The writing-agent illustration remains the **post broker/upline allocation** amount and is not a guarantee or current published pay schedule.

## Audit corrections and statuses

| Audit issue | Result | Files/evidence |
|---|---|---|
| A12-01 Personal introduction and separate brokerage roles | **CORRECTED** | Pages 1–3 name a licensed specialist known through the extended team; Page 2 distinguishes the advisor's business from 8Twelve. |
| A12-02 Named, limited contact consent | **CORRECTED** | Page 4 explicitly authorizes only client name and listed phone/email to be shared with a licensed 8Twelve specialist; other worksheet information requires separate permission. |
| A12-03 Verify actual compensation contract and rules | **OPEN — external verification** | KB owner-confirmed working figure remains illustrative; obtain current written compensation/program and provincial compliance approval before distribution. |
| A12-04 Respect for client's existing broker | **CORRECTED** | Page 3 asks what the client is still working out rather than challenging an existing broker. |
| A12-05 Owned dated follow-up | **CORRECTED** | Page 3 includes a permission-based specific-day check-in example. |
| A12-06 Realistic recruiting orientation | **CORRECTED** | Page 2 includes part-time start, trainer assistance and licensing, without forced recruiting in client dialogues. |
| A12-07 Content checks | **IMPROVED** | `verify-kit.mjs` now checks actual displayed financial arithmetic, named brokerage credibility, consent, separation of business entities, recruiting and source attribution. |
| A12-08 Visual print quality | **IMPROVED / digitally reviewed** | Print labels, disclosures, agent guide and form typography enlarged; all four final PNGs individually reviewed at 816×1056, PDF at letter geometry. Physical paper test still recommended. |
| A12-09 Mobile/visual QA limitations | **PARTIAL** | `render-qa.mjs` now reports all four page geometries, validates 390px mobile screenshot/no horizontal scroll and writes `mobile-preview.png`. Cannot automate subjective premium quality or every internal text overlap. |
| A12-10 Generic advertising kicker | **CORRECTED** | Page 2 changed to “A MORTGAGE QUESTION IS A CHANCE TO HELP.” |
| A12-11 Missing 8Twelve credibility | **CORRECTED / claim approval pending** | Page 1 explains lender choice, reports **65+ lender partners** with company attribution, cites licensed Ontario brokerage **#13072**, and promises a personally made introduction and follow-through. |
| A12-12 Wrong company name / spec conflict | **CORRECTED** | Owner-directed change in `SPEC.md`, header text on four pages, README, workflow and package metadata. No fictional corporate logo added. |

## Files modified

- `SPEC.md` — owner-authorized 8Twelve full-name correction, mandatory credibility evidence and role/consent contract; no alteration of locked finance numbers or core objectives.
- `index.html` — four page identity, client credibility, team/service boundary, field questions, named consent, meaningful follow-up, and print typography/layout refinements.
- `README.md` — updated identity, proof sources and approval boundaries.
- `scripts/verify-kit.mjs` — 57 content / arithmetic / scope checks.
- `scripts/render-qa.mjs` — all-page geometry reporting, individual page PNGs, letter PDF, mobile QA screenshot and clipping rejection.
- `scripts/verify-pdf.py` — dimensions, numbers, identity, PDF text evidence, four PNG geometries, mobile proof.
- `.github/workflows/pages.yml` — workflow title and print/mobile test stage labels; preserves deployment and proof publication.
- `package.json` — correct 8Twelve project name.

## Technical checks (verified in actual GitHub Actions)

**Run [39136090501](https://github.com/advisorpages/sandbox/actions/runs/39136090501): SUCCESS**, source `4963f2f0e6a62a7efa16f414f1dfb83363cd4d27`.

1. `npm run verify` — **57 checks passed**.
2. `npm run render` — **four 816×1056 CSS pixel portrait pages**; each `scrollHeight=clientHeight=1056`, with no out-of-sheet descendants reported.
3. Chromium print-to-PDF — **exactly four 612×792 point portrait pages**.
4. `python scripts/verify-pdf.py` — **four 816×1056 portrait PNGs**, page text and math checks passed.
5. Browser mobile QA — viewport **390px**, `scrollWidth=390`, all four scaled sheet bounding rectangles **left 12px / right 378px**, screenshot generated.
6. GitHub Pages deploy stage — **success** (published development draft only).

### Human digital visual inspection

After run 39136090501, the four generated individual PNGs were obtained from the CI artifact and opened one by one. The client page retains the large payment-change example and newly adds a balanced 8Twelve evidence strip; Page 2 preserves the full writing-agent example and clearer readable disclosure; Page 3 shows larger, readable conversation text without crowding; Page 4 keeps blank handwriting rows, checkboxes and the named introduction-consent section. No unexpected blank pages, cropping or visually evident text-on-text overlap was observed.

This is **digital print-size image inspection**, not a physical paper printout. Do not substitute it for the owner's final print/design review. Mobile image also inspected: the US Letter pages deliberately scale down intact rather than reflowing into mobile cards. This is appropriate for a print-first preview but body text is small when the whole sheet fits on a phone.

## Financial and legal boundaries

- Client payment-change arithmetic is verifiable, but the $700 monthly difference is **hypothetical**; refinancing penalties, amortization and potentially higher total interest are included.
- The $500 writing-agent amount is an owner-confirmed **working training example** from `kb/40_LEARNING_AND_DEVELOPMENT/job_aids/mortgage_opportunity_agent_guide.md`; eligibility, licensing/registration, current written terms and payment conditions remain to be checked. A funded transaction and approved participation do **not** guarantee any payment.
- 8Twelve's **65+ lender partners** is a **company-reported claim**, source: https://www.8twelve.ca/about (accessed 2026-10-18). Ontario licence **#13072** is listed by the company at https://8twelve.mortgage/licenses/. Confirm company marketing permission, currency and regulatory details independently before public field distribution.
- 8Twelve handles mortgage suitability, rates, application, lender recommendations and underwriting through appropriately licensed specialists. Advisor agents may identify needs and personally introduce clients, but must stay within their own licence and program permissions.
- Do not use the prospect-facing recruiting page as a client mortgage recommendation. The recruiting invitation is separate and consent-based.

## Deliverable links (development preview)

- [Browser preview](https://advisorpages.github.io/sandbox/)
- [Four-page letter PDF](https://advisorpages.github.io/sandbox/proofs/mortgage-conversation-kit.pdf)
- Individual page proofs: [1](https://advisorpages.github.io/sandbox/proofs/page-1.png), [2](https://advisorpages.github.io/sandbox/proofs/page-2.png), [3](https://advisorpages.github.io/sandbox/proofs/page-3.png), [4](https://advisorpages.github.io/sandbox/proofs/page-4.png)
- [390px mobile QA screenshot](https://advisorpages.github.io/sandbox/proofs/mobile-preview.png)
- [Full proof workflow](https://github.com/advisorpages/sandbox/actions/runs/39136090501)

## Approval gate and remaining tasks

**No production approval has been given.** Obtain owner visual/content acceptance after a physical 8.5×11 test print; independently confirm current 8Twelve brokerage identity, lender count and branding permission; obtain current written compensation-program and applicable regulatory/compliance review; then record explicit owner approval for field distribution. The development site can remain public as explicitly authorized, but no client data or private documents belong in this repository.

The presentation and new QA meet the **draft quality checkpoint**, not the final release gate.
