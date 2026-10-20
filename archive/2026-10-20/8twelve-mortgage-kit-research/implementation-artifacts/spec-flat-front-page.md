---
title: 'Lighten the flat Toronto front page'
type: 'refactor'
created: '2026-10-18'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="user-approved plan">

## Intent

Implement the approved flat-sheet simplification. Preserve the headline, Toronto framing, all five mortgage goal names, the payment figures and four outcomes, the section order and existing navy/gold editorial style. Present the goals as a compact unnumbered two-column list; simplify the payment table to debt/before/after; move balances, rates, mechanics and all first-page disclaimers to the final notes page. Keep the four choices as a flat two-by-two arrangement with a main outcome and one brief explanation. Replace first-page navigation links with plain page references. Aim for at least one-third fewer visible words than the current 329, with larger supporting text and more space. Keep the outer preview toolbar, remaining presentation/tool sheets and their existing dirty edits. Do not add interactive components. Validate with source/math checks and screen-only screenshots of the revised first and last sheets. No print emulation, PDF generation, PDF checks, deployment or commit in this pass.

</frozen-after-approval>

## Implementation Notes

- Prior front-page spec is complete; this is the next owner-approved pass. The existing working tree is the authorized baseline.
- Use a separate screen-only preview command; the existing render command generates PDFs and must not run.
- Implemented the five-label list, three-column comparison, larger payment-difference figure, concise four choices and static Page 2 reference. Front-page text is 154 words versus the prior 329 (53% reduction).
- Moved the full original debt balances/rates, mortgage payoff detail, investment allocation and all first-page disclaimer language into consolidated final-page notes. Kept the established numerical model and preserved roles, compensation and sources.
- Added npm run preview:check using screen media only, with PNGs for the first and final sheets at 1360px and 390px viewport widths. It verifies fixed sheet dimensions, no clipping, nested or block overlap, two-column goals/choices, four outcomes, supporting type at least 14px, and no interactive controls or inline events in Page 1.
- Source/math checks pass 71/71; preview checks pass on desktop and scaled mobile; visually inspected both revised sheets and the scaled front page. git diff --check passes. No PDF generation, PDF checks, print emulation, deployment or commit was performed.
- Updated SPEC.md and README.md to record the flat layout and the owner-directed screen-only phase. Existing unrelated worktree changes remain intact.

## Review Triage Log

- medium — patched verification gap: Final-note prepayment permission, rate-through-renewal qualification, non-25-year-term clarification and separately paid refinancing costs are now checked.
- medium — patched verification gap: Mathematical checks now read the declared mortgage rate/amortization and investment rate/horizon from the published notes, so contradictory assumptions fail.
- medium — patched verification gap: Screen QA now checks nested goal/choice/article layouts and table rows/cells for overlap, in addition to the major sheet blocks.
- low — patched verification gap: Source checks explicitly preserve the approved headline text, not only its ID.
- medium — patched verification gap: Screen QA verifies two-column grids, all four choices and a minimum 14px supporting type size before preview scaling.
- low — patched verification gap: Flat-content checks include interactive roles, tabindex, editable content and event-handler attributes, not only native control tags.
