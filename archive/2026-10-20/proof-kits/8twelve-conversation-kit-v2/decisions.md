# Decisions — 8Twelve Mortgage Conversation Kit

Append-only. The renderer never reads this file.

- 2026-10-20: Rebuilt the approved seven-sheet kit from the `8twelve` brand pack and the `letter-kit` format. Source of truth: the rendered reference `index.html` and its verifier, not the stale four-page prose in `SPEC.md`.
- 2026-10-20: Extracted 19 reusable blocks: editorial-opening, comparison-table, outcome-grid, page-heading, credibility-strip, logo-row, lender-types, service-overview, step-rail, market-cards, role-flow, earnings-band, benefits-grid, journey-grid, support-grid, invite-panel, dialogue-guide, worksheet-parts, disclosure-sections.
- 2026-10-20: Parity differences approved by the rebuild brief: notes footer uses `01 / 01`; notes source links render as a compact source list instead of inline.
- 2026-10-20: Verification: 45 engine tests pass; static `verify` 157/157; browser preview 60/60 across screen, print media and mobile. No PDF generated.
- 2026-10-20: Owner visual review, read-aloud voice review and human fact-check are still pending. Do not call this kit final or distribute it.
