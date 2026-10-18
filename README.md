# A12 Mortgage Conversation Kit — Development Sandbox

**Our purpose:** Help families see opportunities. Help people see a business opportunity. Give our team the confidence and tools to turn both into conversations.

**Start with [SPEC.md](SPEC.md) before editing any page, copy or CI rule.** It restores the client, recruiting and writing-agent compensation objectives. Do not substitute a shorter objective or remove one of the four page roles.

## Voice authority
Current voice and dialogue standards live in the **Tribe PRI knowledge base** (`advisorpages/tribe-pri-kb`): `kb/00_DOCTRINE/brand_hub.md` governs brand voice, `conversation_doctrine.md` governs dialogue, `personal_voice_profile.md` provides a supporting human voice reference, and the external/internal voice guides apply by audience. The mortgage opportunity agent guide governs the compensation *working example*. Read the current KB standards when creating or revising copy; the README and spec are not replacements for the KB.

## Preview and deliverables
- GitHub Pages preview: https://advisorpages.github.io/sandbox/
- Source: `index.html`; four US Letter portrait pages.
- Page 1 attracts clients; Page 2 explains service, compensation and team-building; Page 3 provides conversations; Page 4 is a blank discovery form.
- Brand treatment is provisional during development.
- Never add real client records, credentials or confidential contracts to the public repository.

## Quality checks
```sh
npm install
npx playwright install chromium
npm run verify
npm run render
python -m pip install pypdf
python scripts/verify-pdf.py
```
GitHub Actions runs these checks before publishing. It also saves a four-page PDF and four preview PNGs as a workflow artifact.

**A green workflow means code/print checks passed; it does not mean the owner approved the copy, visual design, claims or compensation disclosures for distribution.** Each new version needs a human read-aloud voice review, a visual design review and factual verification against the appropriate program.
