# 8Twelve Mortgage Conversation Kit — Development Sandbox

**Our purpose:** Help families see opportunities. Help people see a business opportunity. Give our team the confidence and tools to turn both into conversations.

**The two client pages use a coordinated premium brochure design.** Lead with “What do you want your mortgage to do?” and the five areas where we can help: Buy a Home, Renew Your Mortgage, Refinance Your Home, Consolidate Debt and Increase Cash Flow. These are the main visual focus in an asymmetric navy opening. The Toronto family example supports the conversation underneath, with each debt’s starting balance, interest rate and repayment basis shown beside its name, followed by the four choices and footer in their original order. Warm ivory, restrained gold, locally hosted DM Serif Display and Manrope are scoped to all four presentation pages. Page 2 preserves its existing sequence: heading, credibility statistics, lender logos, lender types, service roles, introduction process and footer. Its branding header, page label and header rule have been removed. Its ivory opening, highlighted credibility strip and navy closing introduction panel complement Page 1. A single lender-logo row leads into four aligned lender-type rows. The service heading sits beside two clearly separated team roles. Page 2 now uses 14px statistic labels, larger numbers and transparent lender logos with the official Royal Bank of Canada shield. Its lender and service descriptions use short, everyday language. Reading order is preserved. Page 3 complements these pages with grouped market facts, the introduction role and a gold compensation panel. Its five service names, “Someone…” captions and decorative numbers have been removed. Page 4 uses the same typography and colours, with the four starting steps highlighted in a two-by-two warm-gold section and a prominent navy closing invitation. The complete “Support around you” section appears on Page 4, directly above that invitation, in two columns. The Common Questions section has been removed. Its top branding header, category label and header rule have been removed. Presentation disclaimers, including Page 4’s no-guarantee statement and separate-brokerage qualifier, live on the final notes sheet; the substantive copy and reading order are preserved. The advisor tools retain their existing styling. The first sheet has no branding header or “mortgage guide” label; it stays flat, with disclaimers on the final notes page.

**Start with [SPEC.md](SPEC.md) before editing any page, copy or CI rule.** It restores the client, recruiting and writing-agent compensation objectives, and now locks the owner's correction of the full **8Twelve Mortgage** name and specific brokerage credibility. Do not substitute a shorter objective or remove one of the four page roles.

## Voice authority
Current voice and dialogue standards live in the **Tribe PRI knowledge base** (`advisorpages/tribe-pri-kb`): `kb/00_DOCTRINE/brand_hub.md` governs brand voice, `conversation_doctrine.md` governs dialogue, `personal_voice_profile.md` provides a supporting human voice reference, and the external/internal voice guides apply by audience. The mortgage opportunity agent guide governs the compensation *working example*. Read the current KB standards when creating or revising copy; the README and spec are not replacements for the KB.

## Preview and deliverables
- GitHub Pages preview: https://advisorpages.github.io/sandbox/
- CI-generated PDF proof: https://advisorpages.github.io/sandbox/proofs/mortgage-conversation-kit.pdf
- CI-generated portrait page images: https://advisorpages.github.io/sandbox/proofs/page-1.png through page-4.png
- All four pages have a coordinated **premium editorial draft**. They are awaiting visual review and are not approved for distribution.
- Source: `index.html`; four US Letter portrait pages.
- Page 1 attracts clients and establishes why 8Twelve is worth considering; Page 2 explains service, compensation and team-building in the advisor's distinct financial brokerage; Page 3 provides conversations; Page 4 is a blank discovery form with named minimal-data introduction consent.
- Brand graphics are provisional during development; the **8Twelve Mortgage** name is not a placeholder. Page 1 attributes the company-reported **65+ lender partners** and cites Ontario FSRA brokerage **#13072**. These claims require final compliance/program confirmation before field distribution.
- Never add real client records, credentials or confidential contracts to the public repository.

## Quality checks

The current working phase is the **flat browser preview**. The owner has deferred PDF generation and PDF checks to a separately requested second phase. Use these checks now:

```sh
npm install
npx playwright install chromium
npm run verify
npm run preview:check
```

`preview:check` only captures screen PNGs and checks Pages 1–4 and the final notes sheet on desktop and scaled mobile. It does not emulate print, generate PDFs or run PDF validation. Do not run `npm run render` or `scripts/verify-pdf.py` during this phase. The existing publishing workflow includes PDF work; publishing is outside the current task.

**A green workflow means code/print checks passed; it does not mean the owner approved the copy, visual design, credibility claims, licensing facts or compensation disclosures for distribution.** Each new version needs a human read-aloud voice review, a visual design review and factual verification against the appropriate program.

Page 2 voice sources: `kb/00_DOCTRINE/brand-voice-external.md` and `kb/00_DOCTRINE/voice_and_language.md`, active KB commit `2de78035927079dcf2c948b04b22cd63ce6bedd7`. Mortgage role context: `kb/10_OPERATING_SYSTEM/compensation/mortgage-8twelve-referral-compensation.md`; the handoff example in `kb/40_LEARNING_AND_DEVELOPMENT/investing_education/product_referral_relationships.md` is supporting guidance pending partner validation. Public brokerage figures (400+ professionals, 7,000+ products and 65+ lenders) were checked against https://www.8twelve.mortgage/ on 2026-10-19.

Page 2’s next-step invitation now reads “Tell us what you need”, “Meet your mortgage specialist” and “Review your options together”, following the external voice doctrine cited above. The introduction step now says “I’ll introduce you to a licensed mortgage specialist on our 8Twelve team.”

Page 3 market facts use equal-height cards with 29px figures, 14px explanations and 12px sources. Topic labels, complete comparisons and an opening sentence help presenters explain the figures. “90+ days behind” is expressed as “at least three months behind on payments”; the underlying figures and source notes are preserved.

The Page 3 facts now sit beneath “Why people may need help with their mortgage”, with smaller figures and softer card fills for a calmer presentation.

Page 3’s role transition now reads “Your role starts with a conversation” and explains asking about needs, a personal introduction to a licensed 8Twelve specialist, and staying in touch. The specialist explains options and handles the mortgage process. This replaces the Ask → Introduce → Follow through shorthand. Voice sources remain the external doctrine cited above; mortgage role context is supported by the cited referral program and handoff guidance.

Page 3’s team role is now a three-step visual flow: “Ask what they need → Make the introduction → Stay in touch”, with one short explanation per step and a separate line explaining the licensed specialist’s role.

The Page 3 role flow now uses “Here’s how you’ll help” and conversational explanations following `kb/00_DOCTRINE/brand-voice-external.md` and `kb/00_DOCTRINE/voice_and_language.md` (KB commit `2de78035927079dcf2c948b04b22cd63ce6bedd7`).

Page 3’s compensation panel now leads with “What you could earn” and “Example pay for one funded mortgage.” The funded amount and level-specific figures are unchanged.

Page 3 recruiting evidence now uses 6.6 million mortgaged principal-residence households (Statistics Canada, Q2 2025), 26% recent mortgage-consumer concerns/uncertainty (CMHC 2026), and 25% of broker users citing paperwork help (MPC/Bond 2026). These replace the renewal, arrears and condo-price cards. Sources and exact survey populations are on the notes sheet; the research report is `_bmad-output/research/mortgage-demand-2026-10-19/research.md`. No Canadian mortgage-broker-specific workload percentage was substantiated.

Approved Page 3 replacements: $912 billion in mortgages extended across Canada in Q2 2025–Q1 2026 (CMHC Aug2026);70% of recent mortgage consumers contacted a professional for options (CMHC2025);48% of recent first-time buyers used the broker channel (MPC/Bond2026). Numbered references[1]–[3] on the cards map to direct original-source hyperlinks in the final disclaimer section; source scope notes distinguish market-wide lending and broad survey channels from mortgage-agent-only activity.

The approved demand cards now use conversational descriptions following `kb/00_DOCTRINE/brand-voice-external.md`: “That’s how much mortgage lending took place…”, “Seven in ten recent mortgage customers asked…” and “Nearly half of recent first-time buyers…”. Figures, survey scope and direct source links remain unchanged.

Page 3 now compares helping one family with helping one family per week over52weeks, using a$500,000 mortgage for each family. At the existing$430/$810 example pay levels, annual amounts are$22,360/$42,120. Wording says mortgages “go through”; the separate what-if heading is removed. The notes explain completion, deductions and eligibility assumptions.

Page 4 now includes owner-confirmed benefits before the starting steps: part-time after work; online or in-person meetings; no sales quotas; introductions to families across Canada; and optional building of an agent team. National reach is stated as introductions, not an exemption from licensing jurisdictions. Team building remains in the advisor’s financial brokerage, as explained in the notes. Wording follows `kb/00_DOCTRINE/recruiting_conversation_doctrine.md` and role context from `kb/40_LEARNING_AND_DEVELOPMENT/job_aids/mortgage_opportunity_agent_guide.md`, active KB commit `e82d1bcb0b235f168a92f62f9e4a39d12bdfb49e`. The brokerage’s national reach is supported by https://8twelve.mortgage/licenses/ and https://8twelve.ca/contact-us/.
