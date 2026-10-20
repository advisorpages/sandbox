---
title: 'Toronto mortgage front-page second pass'
type: 'feature'
created: '2026-10-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

Implement the Toronto-specific front-page copy and styling developed in the conversation. Use the user-selected hypothetical fixed-rate method: 4.79%, semiannual compounding, monthly payments and 25-year amortization. Display $5,798 before, $4,757 after and $1,041 monthly difference. Carry the same $835,000 consolidated balance through the payoff examples: approximately 7.2 years sooner for full extra payments, 4.3 years sooner for half; investment illustrations approximately $171,000 and $85,000 after 10 years at a hypothetical 6% with monthly compounding. Split the combined option into $520.50 per action. Preserve the five goal labels and the other six sheets' roles, layout, compensation and content, except corresponding shared notes. Use the KB's plain Canadian English and calm client voice. Increase readability, emphasize the monthly difference, and use a restrained two-by-two possibilities layout that fits one Letter sheet. User has explicitly authorized editing the existing dirty working files; preserve their unrelated changes. No commit or deployment is requested.

</frozen-after-approval>

## Implementation Notes

- Preserved the pre-existing dirty worktree and current seven-sheet arrangement. Initialized the missing BMad runtime as required by the installed build skill.
- Updated only Page 1 styling/copy and the related shared mortgage/investment notes in index.html. Page 1 uses a two-column choices grid, a readable benefit line, nearby risk context, and links to Page 2 and the notes.
- Updated SPEC.md's superseded front-page contract and the corresponding source/PDF checks. Source verification passes 67/67, including independent mortgage and investment calculations.
- Installed the declared Playwright dependency without creating a lockfile. The matching Chromium browser was absent, so render verification requires its download.
- Rendered and visually inspected Page 1 and Page 7. Both fit 816×1056 Letter sheets without overflow or overlapping blocks. Desktop and 390px mobile preview geometry pass for the revised pages; section markers now scale with the preview.
- Source/math checks pass 68/68. PDF checks pass for five presentation/notes pages and two tool pages, including exported figures and PNG dimensions. git diff --check passes.
- The full render command correctly remains failing for pre-existing overflow on unchanged advisor-tool sheets 5 and 6. Diagnostic artifacts are retained even when layout fails. These sheets were not redesigned as part of the front-page request.
- The independent reviewer reported nine findings; eight were corrected and the existing master-spec page-map inconsistency was deferred. No commit was made because the edited files already contained unrelated uncommitted work that cannot safely be separated into a task-only commit.

## Review Triage Log

- medium — patch: Explained that the original five-year car loan ends before the ten-year investment projection; continued contributions are an assumption, not a promise that the payment difference persists.
- medium — patch: Clarified that 25 years is repayment/amortization, not the fixed-rate term; notes explicitly assume 4.79% through renewals.
- medium — patch: Stated that projections assume permitted, fee-free prepayments.
- medium — patch: Stated refinancing costs are paid separately, outside the illustrated $835,000 principal.
- medium — patch: Added independent checks reconciling precise mortgage payments and unrounded investment values in the notes with the mathematical model.
- medium — patch: Extracted the published annual figure from notes and verified its twelve-month condition against the monthly difference.
- medium — patch: Added direct-block overlap checks and prevented flex shrink on the revised sheets; verified no overlaps on Page 1 or Page 7.
- medium — patch: PDF verification now covers both investment outcomes, the half allocation, payoff figures, and the home-security caution. Export case normalization accommodates CSS uppercase headings.
- medium — defer: Existing master-spec sections still refer to the old four-page map. The updated front-page contract explicitly preserves the current seven-sheet arrangement, but a complete planning-document reconciliation is separate from this front-page implementation.

