# A12 Mortgage Conversation Kit — Master Specification

**Status:** Restored master plan, approved direction 2026-10-18. This file is the design/content authority for `advisorpages/sandbox`. The knowledge base supplies the voice, doctrine and supporting facts, not a second competing production spec.

## Why we are making it

**Help families see opportunities. Help people see a business opportunity. Give our team the confidence and tools to turn both into conversations.**

The kit serves three related needs:
1. **Attract clients:** show mortgage needs worth discussing with a qualified mortgage specialist.
2. **Attract potential teammates:** give a clear, accurate introduction to a business-building opportunity; no pressure or earnings promises.
3. **Help agents act:** supply natural questions, a personal introduction process and a usable discovery worksheet.

It is **not** just a mortgage brochure, an earnings advertisement, or an underwriting form. Each page has a different audience and job. Never strip out recruiting or agent compensation to simplify the preview.

## The governing voice (required every time)

The governing editorial authority is the knowledge base in `advisorpages/tribe-pri-kb`, current default branch:
- **Brand/positioning:** `kb/00_DOCTRINE/brand_hub.md` (top voice authority, after factual and legal accuracy).
- **Actual spoken dialogue:** `kb/00_DOCTRINE/conversation_doctrine.md`.
- **Natural personal inflection:** `kb/00_DOCTRINE/personal_voice_profile.md` (supporting reference; do not make every teammate imitate the owner).
- **Client/prospect content:** `kb/00_DOCTRINE/brand-voice-external.md`.
- **Agent/training content:** `kb/00_DOCTRINE/brand-voice-internal.md`.
- **Reading standard:** `kb/00_DOCTRINE/voice_and_language.md`.
- **Mortgage domain facts/examples:** `kb/40_LEARNING_AND_DEVELOPMENT/job_aids/mortgage_opportunity_agent_guide.md`.
- **Recruiting flow:** `kb/00_DOCTRINE/recruiting_conversation_doctrine.md`.

Apply the current KB authority, **not** a frozen paraphrase, whenever writing new copy. Do not copy the KB or any client information into this public repo. The visual label "A12" is a temporary stand-in, not a verified logo.

**Voice acceptance checklist:** Plain Canadian English; Grade 6–7 for field/client copy; short human sentences; lead with the person's real situation or the dollar example; simple math before theory; calm, warm, credible and direct; explain unfamiliar terms; give a real next step; questions must sound like something someone would say; no stiff corporate wording, hype, manufactured urgency, jargon, guaranteed outcomes, patronizing or forced slogans. An objection is a concern to understand, not a script to bulldoze. Different audiences have different registers; one consistent human voice.

**Before approving copy:** Read each headline and spoken line aloud. Ask: "Would this sound natural across a kitchen table?" If not, revise. A passing automated build is *not* voice approval.

## Four locked pages

| # | Page and audience | Job and required content |
|---|---|---|
| 1 | **Your Mortgage. More Options.** — client/prospect | Client-first overview, five goals, financial illustration and invitation to a qualified mortgage specialist. |
| 2 | **More Ways to Help. More Ways to Earn.** — agent/potential teammate | Why mortgage introductions can expand service and business-building; **Ask → Introduce → Follow Through**; clear illustrative agent compensation and candid next step to explore joining the team. |
| 3 | **Mortgage Conversation Guide** — agent | Real questions for owners, buyers, renewing clients and people under payment pressure; natural objection responses; consent, introduction, follow-up; a separate, non-pushy path when someone asks about the business. |
| 4 | **Mortgage Discovery Form** — client and agent | Blank, handwriting-friendly needs worksheet: purpose, home/property plans, renewal/timing, approximate financial context, cash-flow goals, questions, consent and follow-up. |

### Page 1 content contract
The five main goals must appear as written:
**Buy a Home · Renew Your Mortgage · Refinance Your Home · Consolidate Debt · Increase Cash Flow.**

Other scenarios may appear only if accurately supported, without overwhelming the page. The **hypothetical payment illustration** is `$3,500/month before → $2,800/month after = $700/month` or `$8,400/year`. This is a monthly payment difference, not a claim of lower lifetime cost or guaranteed eligibility. Do **not** invent a rate, principal, qualification result or real customer story. The explanation must flag possible fees/penalties, longer amortization and more total interest; a specialist reviews costs and options.

### Page 2 content contract
Restore and **feature** the previously confirmed *working example* for the **writing agent**:
- Approx. **$100 per $100,000 of funded mortgage volume**.
- Thus **$500,000 funded → approximately $500 to the writing agent**.
- This figure **already accounts for broker/upline allocation**; do not incorrectly split it again.
- It is illustrative, not a current published rate, guarantee or automatic referral payment. Actual amounts depend on licensing/eligibility, current program terms, funding, disclosures and timing. Verify the current written arrangement before team distribution.

Explain service first, compensation second, team-building third. Recruiting invites a conversation about the *actual* business model, support, work and obligations. Do not infer team-building automatically produces income; never imply recruiting itself triggers this mortgage commission.

### Page 3 content contract
Write realistic short dialogue with who/why/context; useful responses to "I'm just looking" and "I already have a broker" without confrontation. Agent identifies and introduces; only appropriately licensed mortgage specialists discuss rates, suitability, approval and recommendations. Follow up on the introduction without collecting confidential underwriting details. If the other person expresses business interest, offer a separate introduction to a leader rather than abruptly pivoting the mortgage conversation.

### Page 4 content contract
Prioritise real appointment usability: clear blanks, large handwriting areas, purchase/renewal/refinance branches, optional rough amount and timing fields, goals, specialist questions and explicit permission for personal introduction. No real client records, SIN, bank credentials, government ID, credit reports or underwriting documentation in the public repository.

## Premium visual contract

Exactly **four 8.5 × 11-inch portrait pages**, one sheet per page, not landscape or a stitched image. The PDF must contain exactly four `612 × 792 pt` pages; each individual PNG must be portrait at the matching ratio.

**Premium means intentional editorial craft, not empty minimalism:**
- Confident typography with meaningful contrast between page titles, explanations, key figures and notes.
- Strong alignment, calm white space, considered page rhythm and tailored compositions.
- Page 1 should foreground the `$700/month` hypothetical comparison; Page 2 the `$500,000 → ~$500` example; Page 3 clearly actionable dialogue; Page 4 writable fields.
- Avoid a stack of generic bordered cards, repeated cookie-cutter layouts, stock imagery, excessive icons, unreadably small disclosures or overly salesy language.
- A12 identity only; branding assets/colors may remain **placeholders during development** per owner direction. Do not invent a corporate logo.
- A single HTML/CSS source drives browser preview, print PDF and individual PNGs. A print format has priority; mobile preview must preserve page dimensions without clipping.

## Publishing and quality gates

The repository and GitHub Pages site are **public by the owner's design** for development. All four *draft* pages, including the recruiting and compensation illustration, may be visible. This does **not** authorize posting actual client records, credentials or confidential contractual documents.

Before saying a deliverable is final:
1. Validate **four** portrait sheets and correct page titles and audiences.
2. Check five mortgage categories, `$3,500 - $2,800 = $700`, `$700 × 12 = $8,400`, and `$500,000 / $100,000 × $100 = ~$500`.
3. Keep **client** mortgage information distinct from **agent** compensation; compensation belongs on Page 2 only.
4. Confirm the specialist-vs-introducer role, realistic risk/eligibility language, and **no income guarantee**.
5. Confirm conversation copy with the live KB voice/role guides before editorial approval.
6. Render in Chromium; verify no text overflows a sheet, PDF exactly four `612 × 792 pt` pages, and four portrait preview PNGs.
7. Do a **human visual quality review** at realistic print and mobile sizes. A build can pass while design quality fails.
8. Record missing factual verification separately rather than filling it with invented numbers.

## Workflow and change control

**Read this spec and the current KB voice doctrine → draft copy → check facts/math/role → design HTML → render PDF/PNGs → run CI → review Pages preview → owner approves.**

Treat this file as the production contract; make explicit, reviewed changes when objectives or locked numbers change. GitHub Pages deployment is **not** the same as editorial/compliance approval. Do not modify the knowledge base solely to make the front-end build pass.

**Source repositories:** `advisorpages/sandbox` (production spec, HTML and CI); `advisorpages/tribe-pri-kb` (voice doctrine and mortgage knowledge only).
