# A12 Mortgage Conversation Kit — Independent Specification Audit

**Date:** 2026-10-18  
**Status:** AUDIT ONLY — NOT FINAL / NOT APPROVED  
**Authority:** `SPEC.md` (production contract); current `advisorpages/tribe-pri-kb` doctrine for voice/conversation/domain facts.  
**Evidence:** Direct examination of the default-branch `SPEC.md`, `README.md`, `index.html`, `package.json`, `.github/workflows/pages.yml`, three QA scripts, and all eight requested KB references. Latest observed GitHub Actions run: [39105922611](https://github.com/advisorpages/sandbox/actions/runs/39105922611), conclusion **success**, commit `f25345165a1bb21874999da462aa3b743b5ae7a4`. The live Pages preview/PDF could not be opened in the audit environment. A fresh local Chromium render and visual inspection were not possible. Findings about rendered appearance are therefore qualified.

## 1. Executive summary

**Overall: PARTIAL.** **Additional high-priority finding (owner correction, 2026-10-18): the kit does not establish the actual credibility of 8Twelve Mortgage; it relies on an ambiguous temporary “A12” label and introduces an unnamed specialist without telling families why this licensed brokerage is worth considering. See Section 11 and A12-11/A12-12.** The HTML source substantially preserves all three business goals, four locked pages, five mortgage scenarios, both approved working examples and the crucial writing-agent **net-of-broker/upline** distinction. This is not an argument to remove recruiting or compensation. Page 2 is legitimately both business-opportunity and compensation content.

Significant remaining issues are **precision of specialist/team identity and consent**, **field usability and stronger personal follow-through**, **weak QA that can pass inappropriate words in the wrong place or miss text/visual defects**, and **unverified real-size rendered quality**. The owner-confirmed compensation working amount is **not independently verified against an active written program** and must remain labelled as such. A successful Actions workflow is useful evidence of the existing automated checks, not owner approval.

## 2. Requirement-by-requirement scorecard

| Requirement | Rating | Evidence / caveat |
|---|---|---|
| Attract mortgage clients | **PARTIAL** | Page 1 covers scenarios, math and next step, but fails to substantiate **why 8Twelve Mortgage** is a credible specialist partner. |
| Attract potential teammates | **PARTIAL** | Page 2 has explicit business-building and compensation, but limited orientation to real work, support and licensing; page 3 separate recruiting path is appropriate. |
| Equip agents to converse, introduce and follow up | **PARTIAL** | Page 3 offers good starting questions but no clear dated follow-up example or explicit permission to pass contact details. |
| Page 1 required financial example | **PASS** in source | $3,500 − $2,800 = $700/month; $700 × 12 = $8,400; hypothetical and costs/interest cautions shown. |
| Page 2 compensation example and role | **PASS** as working example; **NOT VERIFIED** as current pay rule | $500,000 ⇒ ~$500 writing agent, ~$100/$100k, after broker/upline allocation, no further splitting. Written program/legal eligibility independent check required. |
| Page 3 dialogue quality and natural concern responses | **PARTIAL** | Useful questions; one response may sound like a challenge to an existing broker, and personal handoff is too generic. |
| Page 4 discovery usability and data minimization | **PARTIAL** | Broad fields, blanks and basic permission; no unambiguous consent to share provided contact/worksheet information and no consent date or preferred channel. Handwriting comfort cannot be accepted without print review. |
| KB voice adherence | **PARTIAL** | Mostly short and human. Several headline/pitch constructions feel campaign-like or generic; role language needs precision. |
| Premium design | **NOT VERIFIED** visually; **PARTIAL** on source structure | Distinct editorial compositions, serif hierarchy, substantial figures and rules. Some 9–10px detail and repetitive micro-labels risk weak print legibility. |
| Exactly four letter portrait pages; four PNGs; PDF | **PASS** in automation design; **NOT VERIFIED** independently rendered | Print CSS, Playwright, PDF/PNG validations exist; latest Actions success, but no accessible proof for independent visual review. |
| Mobile preview | **PARTIAL / NOT VERIFIED** | JS `zoom` scales pages to viewport; behaviour not checked on actual device; DOM geometry/fit tests are print-only. |
| Automated QA aligns with current spec | **PARTIAL** | Important content tests exist; checks are easily defeated by static string presence and do not independently assess voice, accessibility or PDF visual quality. |
| Correct 8Twelve company name and credibility | **FAIL** in current presentation | Current source displays “A12” throughout, not the full 8Twelve Mortgage name, and presents no company-specific evidence of licensing, lender reach or service. `SPEC.md` separately authorizes “A12” as a *temporary placeholder*; owner clarifies real name and need for credibility. | 
| Human approval | **NOT VERIFIED** | README and SPEC explicitly say unapproved; do not mark final. |

## 3. Page-by-page assessment

### Page 1 — Your Mortgage. More Options. — **PASS in source; visual NOT VERIFIED**
- All five exact categories present in `index.html` `.p1-goal`; arithmetic and hypothetical label correct.
- Risk copy explicitly includes fees, penalties, longer amortization, more total interest, and qualified specialist review. This **must be retained**.
- Client next step exists but could more naturally invite a review of the person's own renewal/purchase position. No promise of lower total lifetime cost found.
- **Moderate:** Clarify specialist is personally connected through an extended team but employed/licensed by **separate** mortgage brokerage 8Twelve; do not imply ownership/legal affiliation. Source: `SPEC.md` cross-brand boundary; mortgage agent guide.

### Page 2 — More Ways to Help. More Ways to Earn. — **PARTIAL**
- Required `Ask → Introduce → Follow through`, funded volume, working compensation, allocation rule, limitations, and optional business-opportunity conversation are present. **Do not delete or minimize them.**
- **High:** The identity of “a licensed mortgage specialist” is not grounded in the team's personal known-specialist model; describe *our personally known extended mortgage team* while preserving 8Twelve's separate brokerage status. Source: mortgage opportunity agent guide; `SPEC.md` cross-brand.
- **Moderate:** “Meet people who may want to learn how the team works, what support they get and what the work involves” is abstract for a new teammate. Add a concise accurate part-time/trainer-supported/licensing orientation only if space allows without making this a training manual. Source: recruiting doctrine.
- **High / unverified fact:** Owner-confirmed ~$100 per $100k is only a working example; *actual* licensing, approvals, eligibility, local law, program documents, payment conditions and required disclosures cannot be confirmed from this repository. Keep illustrative language and require written-program owner verification before distribution. Source: `mortgage_opportunity_agent_guide.md`.
- No evidence of compensation being incorrectly split again; current wording is correct.

### Page 3 — Mortgage Conversation Guide — **PARTIAL**
- Four scenarios, two common objections, separate recruitment option, personal introduction and roles clearly present.
- **Moderate:** “Have they had a chance to walk you through your options and the total costs?” can sound like probing for inadequacy in an existing broker relationship. Instead recognize the existing relationship, ask *what the client still wants to understand* only if they remain open. Source: conversation doctrine, respectful agency.
- **Moderate:** “I've got a mortgage specialist I work with” is accurate but misses the personable extended-team model from KB. Explicitly identify specialist as known and describe separate 8Twelve licensing where natural in handoff note.
- **Moderate:** “Check back” does not give a meaningful *owned, dated next action*. Add a simple example (“Would it be okay if I checked back Thursday to make sure you connected?”). Source: brand hub personal business ownership, voice-and-language.
- Recruiting path **correctly separate**, not a forced client pitch; retain.

### Page 4 — Mortgage Discovery Form — **PARTIAL**
- Name/contact, timing, buying/renewal/refinancing, approximate mortgage amounts, goals, notes, permission checkbox and follow-up are present. No SIN, government ID, bank credentials or credit report demanded.
- **High:** “Yes, you may introduce me to a mortgage specialist” is not precise about sharing **which contact details** and through **which recipient**, especially where completed worksheet contains financial context. Add a narrow optional authorization to share only name and chosen contact detail with an 8Twelve licensed specialist, and state anything else requires a separate consent/secure process. Do not send the whole worksheet by default. Source: `SPEC.md` data minimization and KB capture/handoff.
- **Moderate:** A combined “Phone or email” line is short for legible handwriting. Consider separately labelled preferred contact method and a wider contact field if layout permits.
- **NOT VERIFIED:** Plenty of fields have 26px lines and a 100px notes block *in HTML*, but actual physical handwriting space and printing must be reviewed on a letter-size proof.

## 4. Specific voice-brand deviations with replacement proposals

| Current literal wording (`index.html`) | Concern and KB authority | Proposed direction |
|---|---|---|
| “GOOD SERVICE OPENS DOORS” | Campaign-like slogan, not a practical agent promise; Brand Hub / internal voice “action not slogans”. **Low.** | “A MORTGAGE NEED IS A REASON TO HELP” |
| “Three steps. One useful introduction.” | Harmless but generic; first-read rule asks for concrete next action. **Low.** | “Here's what you do when a client mentions a mortgage.” |
| “Meet people who may want to learn how the team works, what support they get and what the work involves.” | Dense/abstract description of building the financial brokerage; Brand Hub personal ownership + recruiting doctrine. **Moderate.** | “Show someone what starting part-time looks like, how training works, and what they're responsible for. They can decide if it fits.” |
| “That's good. Have they had a chance to walk you through your options and the total costs?” | Potentially challenges an existing professional instead of diagnosing the person's unmet question; Conversation Doctrine, respect informed no. **Moderate.** | “That's good. Are you comfortable with the options they've shown you, or is there something you're still trying to work out?” |
| “I've got a mortgage specialist I work with. Would you be open to a conversation so you can see what options you have?” | Serviceable, but not concrete about personally known extended-team specialist; Brand Hub ownership + mortgage KB. **Moderate.** | “I work closely with a licensed mortgage specialist at 8Twelve. If you'd like, I can personally introduce you and stay in touch while they review your options.” |
| “Ask permission → Make the introduction → Confirm they connected → Check back.” | Missing concrete follow-up ownership/time; Voice and Language Standards action verbs. **Moderate.** | “Ask permission, introduce them, and agree when you'll check in to make sure they connected.” |
| “Yes, you may introduce me to a mortgage specialist.” | Consent is underspecified for personal contact-information transfer. **High.** | “Yes. You may share my name and the contact detail above with a licensed 8Twelve mortgage specialist so they can contact me about my mortgage question.” |

These are editorial proposals **not yet applied**. They preserve the exact compensation math and recruiting objective. Because `SPEC.md` is authoritative, any non-trivial change in page roles, numbers or policy must be escalated rather than rewritten to fit code.

## 5. Design review — source evidence and unknowns

**Observed structure:** distinct hero + five-item list + dark money highlight on Page 1; three-step path + sand-tone money panel + split opportunity close on Page 2; two dialogue columns and handoff on Page 3; write-in form on Page 4. This avoids a default card-grid on the final markup. Georgia/Arial pairing, dividers and spacing are coherent in source. **No actual page pixel inspection was accomplished.**

**Risks:** numerous labels and disclosures at **9–10px CSS** can become uncomfortable at true letter print size, notably Page 2 compensation limitations, Page 3 role boundaries and Page 4 privacy note. Page 3 two columns may be dense. Form lines 26px high may be tight for handwriting. These are **review hypotheses, not visual proof of defects**. Fix through visual comparison at 100% print-size, not by blindly removing text.

## 6. Financial claims and qualification

1. **Verified arithmetic:** $3,500 − $2,800 = $700; $700 × 12 = $8,400.
2. **Verified arithmetic:** $500,000 ÷ $100,000 × $100 = **approximately $500**.
3. **Verified attribution in current source:** figure is *writing agent's amount after broker/upline allocation*, not split again.
4. **Not verified externally:** any individual borrower's eligibility, rates, costs, penalties, amortization, total interest or achievable payment change. Example must stay hypothetical.
5. **Not verified against live written contract/regulatory guidance:** actual agent payment entitlement, licensing/registration rules, referral/commission legal conditions, payment timing or disclosure obligations. KB describes example as draft/owner-confirmed, not active published schedule.
6. **Critical role boundary:** licensed 8Twelve broker/specialist handles mortgage advice, qualification, rates, applications and recommendations. Advisor's financial brokerage opportunity remains distinct. Avoid suggesting an agent can quote loans, recommend financing, or receive a guaranteed fee for mere introductions.

## 7. Implementation, print/PDF and mobile QA

**Source verified:** `@page{size:letter;margin:0}`, 8.5in × 11in sheets, four `section.sheet` elements, print page breaks, Chromium PDF settings and four screenshot targets. `verify-pdf.py` checks exactly four 612×792 media boxes and individual PNG aspect ratios. `render-qa.mjs` checks 816×1056 CSS pixel sheets and child bounding rect containment. These are substantive safeguards.

**Not independently executed here:** `npm run verify`, `npm run render`, `python scripts/verify-pdf.py`. GitHub Actions latest run returned success, but tool/runtime could not directly download the live Pages PDF or visually inspect four screenshots. This is an evidence gap, not a failing test result.

**QA limitations:**
- `verify-kit.mjs` uses literal string membership. It can pass misleading/displaced text and hard-coded arithmetic (`3500 - 2800 === 700`) even if displayed amounts change.
- It tests some required terms on the correct page but not full assertions for every permission/role/disclosure. Recruiting support and dated follow-up are not tested.
- `render-qa.mjs` catches outside-sheet children but **not** sibling overlaps, contrast, text glyph clipping inside boxes, small printed type or hidden-by-overflow content if the bounding boxes remain inside sheet.
- No automated mobile viewport screenshot/overflow inspection or PDF-to-raster pixel comparison.
- `verify-pdf.py` requires titles/numbers but does not test PDF extraction of full cost/trade-off or compensation limitations.
- CI has no explicit visual review acknowledgement. This last item is a human signoff gate, *not* a reason to block draft publication to Pages.
- CI has no regression test asserting **no accidental compensation copy on the client page**, beyond two prohibited tokens.

## 8. Prioritized issues (verified vs hypotheses)

| ID | Severity | Requirement | Current implementation | Gap | Recommended fix | Reference | Evidence |
|---|---|---|---|---|---|---|---|
| A12-01 | High | Personal introduction and distinct brokerage | “licensed mortgage specialist”; Page 3 “I work with” | Ambiguous extended-team / legal boundary | Name licensed 8Twelve specialist and distinguish broker from advisor role | `SPEC.md`, `index.html` P1–3, mortgage KB | **Verified in source** |
| A12-02 | High | Contact permission | “Yes, you may introduce me” | Unclear minimal contact sharing and recipient | Narrowly worded consent; separate optional secure handoff for other details | `index.html` P4, `SPEC.md` | **Verified in source** |
| A12-03 | High | Written compensation support | Approx $100/$100k | No up-to-date signed program evidence in examined sources | Keep illustrated; request written verification before distribution | `index.html` P2, mortgage KB | **Not verified externally** |
| A12-04 | Moderate | Natural, non-defensive dialogue | Existing-broker question | Might steer into unwanted challenge | Ask whether they have a question left, respect no | `index.html` P3, Conversation Doctrine | **Verified text / judgment** |
| A12-05 | Moderate | Owned follow-up | “Check back” | No dated action example | Add specific permission-based example | `index.html` P3, Brand Hub | **Verified in source** |
| A12-06 | Moderate | Realistic recruiting explanation | “what support they get” | Lacks quick understandable part-time / training / licensing orientation | Add concise WHAT, not full onboarding | `index.html` P2, recruiting doctrine | **Verified in source** |
| A12-07 | Moderate | Strong spec-aware CI | Static presence checks | Won't detect displaced/contradictory copy | Parse page DOM; assert scoped fields, contrasts, disclosures, compensation and no promises | `scripts/verify-kit.mjs` | **Verified in source** |
| A12-08 | Moderate | Print quality | tiny CSS notes/labels | May be hard to read | Review four physical-size proof pages and adjust density/type | `index.html` CSS / `dist` proofs | **Unverified visual hypothesis** |
| A12-09 | Moderate | Visual/accessibility QA | geometrical child bounds | Could miss overlaps/occlusions | Render PDF pages to pixels, mobile screenshots, pairwise overlap for essential areas and inspect humanly | `scripts/render-qa.mjs`, `scripts/verify-pdf.py` | **Verified test limitation** |
| A12-10 | Low | Lead with action rather than slogan | “GOOD SERVICE OPENS DOORS” | Some campaign polish | Replace with more practical human copy | `index.html` P2, Brand Hub | **Verified editorial judgment** |
| A12-11 | **High** | Credibility of the actual mortgage partner | Header calls partner “A12”; source mentions unnamed licensed specialist | No substantive “Why 8Twelve?” trust reason; an introduction to an unidentified provider is a weak client invitation | Name **8Twelve Mortgage**; incorporate a compact proof cluster (licensed mortgage brokerage in Ontario; FSRA #13072 as published; 65+ lender relationships / 7,000+ products as company-reported and partly corroborated by NerdWallet) and show that a personally known specialist handles advice | `index.html` P1–3, `SPEC.md` cross-brand, mortgage KB, public 8Twelve sources; see §11 | **Verified source gap; external claims source-qualified** |
| A12-12 | **High** | Brand/identity authority and clean business boundary | `SPEC.md` expressly permits “A12” as temporary label while owner now clarifies **8Twelve**; Page 2 displays A12 alongside advisor recruiting copy | Production brand correction needs controlled spec amendment; branded Page 2 may falsely imply recruits join 8Twelve rather than the advisor's brokerage | Record owner name correction, propose changing placeholder specification after approval; explicitly distinguish separate 8Twelve licensed mortgage service from advisor team-building opportunity | `SPEC.md` Brand/Visual sections; `index.html` headers; KB mortgage guide and recruiting doctrine | **Verified spec/owner-direction tension** |

## 9. Proposed implementation order — after audit

1. Retain all locked claims/objectives. Correct full **8Twelve Mortgage** naming and add a succinct, source-backed credibility case (not just generic specialist wording), then narrow intro/contact sharing consent and add concrete follow-up. Where this requires changing the temporary “A12” label authorized by `SPEC.md`, record the owner clarification and seek approval to amend the spec before modifying locked branding directions.
2. Clean up overly generic / existing-broker copy, reinforce brief realistic recruiting path without crowding Page 2.
3. Extend CI tests for page-specific content, disclosures, exact locked math and consent. Never remove recruiting/commission to make CI green.
4. Render fresh PDF + four PNGs. Visually inspect each at printed US Letter size (including lower corners/footer and tiny disclosure lines), mobile preview, and contrast/overlaps. Adjust type and spacing without cutting required information.
5. Re-run all checks, inspect deployment proof, record new commit IDs and test output. Request written program/compliance verification for actual remuneration terms.
6. **Owner reviews and explicitly approves** content/design before any FINAL label or field distribution.

## 10. Final validation ledger — audit checkpoint

- **Issues found:** A12-01 through A12-12 (including new high-priority 8Twelve credibility/identity findings; some unverified visual hypotheses; see classifications).
- **Files modified during audit checkpoint:** only `SPEC_AUDIT.md` (report creation); source implementation unchanged.
- **Corrections completed:** none; major changes intentionally deferred pending this report.
- **Commits:** audit report commit to be recorded by GitHub; last observed existing workflow commit `f25345165a1bb21874999da462aa3b743b5ae7a4`.
- **Tests executed in this independent audit:** repository source inspections and deterministic arithmetic review. **No independent Chromium/Playwright/Python runs**.
- **Existing CI:** observed Actions run 39105922611 **success**; it does **not** imply editorial or regulatory acceptance.
- **PDF / previews (claimed by README but unable to open here):** https://advisorpages.github.io/sandbox/proofs/mortgage-conversation-kit.pdf ; https://advisorpages.github.io/sandbox/proofs/page-1.png , page-2.png , page-3.png , page-4.png.
- **Outstanding:** live proof inspection, physical print review, program/legal verification, owner approval. **Status: DRAFT / NOT APPROVED**.


## 11. Owner follow-up: 8Twelve Mortgage credibility (2026-10-18)

**Finding: FAIL — required credibility is missing from the current presentation, and the original independent audit overlooked that strategic gap. Severity: HIGH.**

### Actual implementation and why it fails

The HTML headers repeatedly say **“A12 MORTGAGE”**. Page 1 does not give the reader a real reason to trust the provider beyond a generic offer to introduce “a qualified mortgage specialist.” Page 2 mentions a specialist but never demonstrates the lender network, registration or service rationale. Page 3 speaks about “a mortgage specialist I work with” without naming 8Twelve. Page 4 asks permission for an unnamed specialist.

For a family deciding whether to speak with someone new about their largest debt, **“Why this brokerage? Why trust this introduction?”** is a central conversion question. Trust cannot rely solely on the hypothetical $700/month payment illustration; a hypothetical saving is not a credibility credential.

### Credibility evidence checked 2026-10-18 — claim status matters

| Potential proof | Public evidence and claim type | Audit use |
|---|---|---|
| Canadian mortgage brokerage operating under **8Twelve Mortgage Corporation** | [8Twelve licensing page](https://8twelve.mortgage/licenses/) reports Ontario brokerage **FSRA #13072** and other jurisdictional credentials; independent [NerdWallet Canada profile](https://www.nerdwallet.com/ca/mortgages/8twelve-mortgage) describes it as a licensed Canadian brokerage. | **Candidate core proof.** Recheck current registry/licence and exact legal trade name directly with regulator/compliance before field distribution. Licensing by itself is not an endorsement of quality. |
| Broad lender access | [8Twelve About](https://www.8twelve.ca/about) reports **65+ lender partners** and **7,000+ mortgage options**; [NerdWallet Canada profile](https://www.nerdwallet.com/ca/mortgages/8twelve-mortgage) separately describes 65+ lenders and thousands of products, though it is an 8Twelve commercial partner. | **Candidate practical differentiator.** “More lender choices than one bank’s products” is understandable; avoid “best rate guaranteed,” “all lenders,” or an implied qualified rate. |
| Public reviews | [8Twelve About](https://www.8twelve.ca/about) reports 4.9 stars / 1,000+ five-star reviews; [8Twelve's SingleKey page](https://8twelve.mortgage/singlekey/about-8twelve/) reports 4.9/5 and 700+ reviews. | **Not approved for printed numbers.** First-hand statistics differ between live company pages; independently confirm platform, date, count and permission to use. |
| Funded mortgage originations | [8Twelve homepage](https://www.8twelve.ca/) currently claims **$3B+ funded**, while [its SingleKey page](https://8twelve.mortgage/singlekey/about-8twelve/) says **$2B+**. | **Not approved for printed number.** Could reflect different as-of dates, but no reconciled dated evidence; obtain audited/current company-approved statement before use. |
| Independent company footprint | [NerdWallet Canada](https://www.nerdwallet.com/ca/mortgages/8twelve-mortgage) describes Canadian brokerage/lender comparison; [BBB business profile](https://www.bbb.org/ca/on/markham/profile/mortgage-broker/8twelve-mortgage-corporation-0107-1393082) lists 8Twelve Mortgage Corporation and an A+ BBB rating at audit time. | **Additional source leads.** Do not imply BBB endorses mortgage recommendations. Ratings change and need date/source if used. |
| Personal accountability | [Tribe PRI mortgage agent guide](https://github.com/advisorpages/tribe-pri-kb/blob/main/kb/40_LEARNING_AND_DEVELOPMENT/job_aids/mortgage_opportunity_agent_guide.md) requires a *personally known mortgage specialist on the extended team*, with agent ownership of handoff/follow-up. | **Primary relational credibility.** Describe the known person and personal follow-through, **while correctly disclosing that 8Twelve is a separate licensed mortgage brokerage**, not part of the advisor's licensed entity. |

### Recommended placement: do not add a fifth page

**Page 1 — high priority:** Add an elegant, short **“Why we're introducing you to 8Twelve Mortgage”** proof element, integrated with the existing $700/month illustration and next step. Prefer **two compelling, checkable trust cues** (licensed Canadian brokerage / access to 65+ lender partners) plus the assurance of a *personal introduction* over a stack of unverifiable marketing accolades. Explain in plain language why checking across lenders can reveal options a person might not see at a single bank; it does not guarantee cheaper borrowing.

**Page 2 — business credibility distinct from recruiting:** Briefly explain the reliable specialist capacity the advisor can introduce clients to, **then preserve** the full writing-agent compensation example and independent advisor business-building opportunity. Do not make it sound like becoming a teammate equals employment, mortgage licensing or compensation automatically through 8Twelve.

**Page 3 — introduction confidence:** Natural, not robotic: “I work with a licensed mortgage specialist at 8Twelve Mortgage. They can compare options from different lenders. If you'd like, I can make the introduction and follow up to make sure you connect.” No promise of the lowest rate, approval or saving; specific specialist identity may be inserted only once verified and kept up to date.

**Page 4 — precise consent:** Identify **8Twelve Mortgage** by name (or properly controlled local specialist name) and specify the minimal information the client allows the agent to share.

### Suggested client-facing copy (editorial proposal, not approved)

> **Why 8Twelve Mortgage?**  
> Instead of looking at one bank, you can have a licensed mortgage specialist compare options from multiple lenders. 8Twelve Mortgage reports working with more than 65 lenders across Canada. I'll personally introduce you to a specialist I work with and stay in touch while they review your choices. The specialist provides mortgage advice through 8Twelve, a separate licensed brokerage. Your options depend on your situation.

This is intentionally grounded in client value and a personal relationship, not a generic “award-winning” claim. Verify company-approved marketing wording, brokerage details, licensing and permission to use statistics before print release.

### Master spec issue and change-control decision

`SPEC.md` explicitly says “The visual label ‘A12’ is a temporary stand-in” and “A12 identity only,” while the owner now clarifies the **real company name is 8Twelve Mortgage** and notes omitted credibility. **Do not silently rewrite SPEC.md to make source changes appear compliant.** Log this as an owner-requested specification correction, obtain explicit approval for the precise new naming/proof requirement, then update SPEC.md and implementation together. Logo/artwork remains deferred and is **not** a blocker.

### New quality gates to add to CI (with human review)

1. Correct full spelling **8Twelve Mortgage** in at least one prominent client-facing location and in the consent recipient.
2. Assert a **specific credibility claim** is present on Page 1 (with its maintained source reference), not merely a floating brand label or generic “trusted” adjective.
3. Prevent unsourced hardcoded reviews, rankings, funded-volume claims or guarantees from slipping in.
4. Preserve Page 2 compensation and separate advisor-business recruiting; **no change** to existing locked example.
5. Human review: Ask whether someone unfamiliar with 8Twelve can answer: **Who are they? Why would I speak with them? What happens to my information? Who stays accountable?**

**Scope of this addendum:** audit-report correction only. The presentation, `SPEC.md`, and CI have **not** been edited as part of this follow-up.
