# 8Twelve Mortgage Conversation Kit — Development Sandbox

**Our purpose:** Help families see opportunities. Help people see a business opportunity. Give our team the confidence and tools to turn both into conversations.

**Start with [SPEC.md](SPEC.md) before editing any page, copy or CI rule.** It restores the client, recruiting and writing-agent compensation objectives, and now locks the owner's correction of the full **8Twelve Mortgage** name and specific brokerage credibility. Do not substitute a shorter objective or remove any of the six page roles.

## Voice authority
Current voice and dialogue standards live in the **Tribe PRI knowledge base** (`advisorpages/tribe-pri-kb`): `kb/00_DOCTRINE/brand_hub.md` governs brand voice, `conversation_doctrine.md` governs dialogue, `personal_voice_profile.md` provides a supporting human voice reference, and the external/internal voice guides apply by audience. The mortgage opportunity agent guide governs the compensation *working example*. Read the current KB standards when creating or revising copy; the README and spec are not replacements for the KB.

## Deliverables — revised six-sheet architecture

The **client and recruiting presentation is four pages**: two devoted to mortgage solutions (needs/example, then 8Twelve credibility and introduction), and two devoted to business opportunity (client service/compensation, then trainer-supported growth). The former one-page-per-topic design was too cramped, so this is an intentional editorial split.

Two further **detachable advisor tools** preserve the practical conversation guide and writable mortgage discovery form; **these do not belong in the client/opportunity presentation PDF**.

- [Browser preview](https://advisorpages.github.io/sandbox/) — all six sheets in this order.
- [Four-page presentation PDF](https://advisorpages.github.io/sandbox/proofs/mortgage-conversation-kit.pdf).
- [Two-page advisor-tools PDF](https://advisorpages.github.io/sandbox/proofs/mortgage-agent-tools.pdf).
- Individual portrait previews: `proofs/page-1.png` to `proofs/page-6.png`.
- Mobile visual QA: `proofs/mobile-preview.png`.
- `index.html` is the single HTML/CSS source for both PDFs and all previews.
- Corporate logo and colours are provisional. Correct written **8Twelve Mortgage** name is required.
- Page 2 attributes company-reported **65+ lender partners** and company-listed Ontario FSRA licence **#13072**. Confirm these claims and marketing permission before field distribution.
- Never add real client records, credentials or private contractual material to this public development repo.

## Quality checks
```sh
npm install
npx playwright install chromium
npm run verify
npm run render
python -m pip install pypdf
python scripts/verify-pdf.py
```
GitHub Actions runs these checks before publishing. It also saves the four-page presentation PDF, separate two-page advisor-tools PDF, six portrait PNGs and mobile QA proof as a workflow artifact.

**A green workflow means code/print checks passed; it does not mean the owner approved the copy, visual design, credibility claims, licensing facts or compensation disclosures for distribution.** Each new version needs a human read-aloud voice review, a visual design review and factual verification against the appropriate program.
