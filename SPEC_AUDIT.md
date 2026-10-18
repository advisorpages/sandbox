# A12 Mortgage Conversation Kit — Independent Specification Audit

**Date:** 2026-10-18  
**Status:** AUDIT ONLY — NOT FINAL / NOT APPROVED  
**Authority:** `SPEC.md` (production contract); current `advisorpages/tribe-pri-kb` doctrine for voice/conversation/domain facts.  
**Evidence:** Direct examination of the default-branch `SPEC.md`, `README.md`, `index.html`, `package.json`, `.github/workflows/pages.yml`, three QA scripts, and all eight requested KB references. Latest observed GitHub Actions run: [39105922611](https://github.com/advisorpages/sandbox/actions/runs/39105922611), conclusion **success**, commit `f25345165a1bb21874999da462aa3b743b5ae7a4`. The live Pages preview/PDF could not be opened in the audit environment. A fresh local Chromium render and visual inspection were not possible. Findings about rendered appearance are therefore qualified.

## 1. Executive summary

**Overall: PARTIAL.** The HTML source substantially preserves all three business goals, four locked pages, five mortgage scenarios, both approved working examples and the crucial writing-agent **net-of-broker/upline** distinction. This is not an argument to remove recruiting or compensation. Page 2 is legitimately both business-opportunity and compensation content.

Significant remaining issues are **precision of specialist/team identity and consent**, **field usability and stronger personal follow-through**, **weak QA that can pass inappropriate words in the wrong place or miss text/visual defects**, and **unverified real-size rendered quality**. The owner-confirmed compensation working amount is **not independently verified against an active written program** and must remain labelled as such. A successful Actions workflow is useful evidence of the existing automated checks, not owner approval.

## 2. Requirement-by-requirement scorecard

| Requirement | Rating | Evidence / caveat |
|---|---|---|
| Attract mortgage clients | **PASS** in source | Page 1 five scenarios, specific figures, invitation and risk caveat; response effectiveness not user-tested. |
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

## 9. Proposed implementation order — after audit

1. Retain all locked claims/objectives. Correct specialist identity and narrow intro/contact sharing consent. Add concrete follow-up.
2. Clean up overly generic / existing-broker copy, reinforce brief realistic recruiting path without crowding Page 2.
3. Extend CI tests for page-specific content, disclosures, exact locked math and consent. Never remove recruiting/commission to make CI green.
4. Render fresh PDF + four PNGs. Visually inspect each at printed US Letter size (including lower corners/footer and tiny disclosure lines), mobile preview, and contrast/overlaps. Adjust type and spacing without cutting required information.
5. Re-run all checks, inspect deployment proof, record new commit IDs and test output. Request written program/compliance verification for actual remuneration terms.
6. **Owner reviews and explicitly approves** content/design before any FINAL label or field distribution.

## 10. Final validation ledger — audit checkpoint

- **Issues found:** A12-01 through A12-10 (some unverified visual hypotheses; see classifications).
- **Files modified during audit checkpoint:** only `SPEC_AUDIT.md` (report creation); source implementation unchanged.
- **Corrections completed:** none; major changes intentionally deferred pending this report.
- **Commits:** audit report commit to be recorded by GitHub; last observed existing workflow commit `f25345165a1bb21874999da462aa3b743b5ae7a4`.
- **Tests executed in this independent audit:** repository source inspections and deterministic arithmetic review. **No independent Chromium/Playwright/Python runs**.
- **Existing CI:** observed Actions run 39105922611 **success**; it does **not** imply editorial or regulatory acceptance.
- **PDF / previews (claimed by README but unable to open here):** https://advisorpages.github.io/sandbox/proofs/mortgage-conversation-kit.pdf ; https://advisorpages.github.io/sandbox/proofs/page-1.png , page-2.png , page-3.png , page-4.png.
- **Outstanding:** live proof inspection, physical print review, program/legal verification, owner approval. **Status: DRAFT / NOT APPROVED**.
