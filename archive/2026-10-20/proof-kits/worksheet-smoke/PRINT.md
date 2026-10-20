# Print handoff — Worksheet Smoke Test

This kit is **web-first and PDF-ready**. The presentation-kit-factory did **not** generate a PDF.

## Files

- `dist/index.html` — local preview, all sheets.
- `dist/print/worksheet.html` — 1 sheet (Worksheet)

## Print contract

- US Letter portrait: 8.5 × 11 in (816 × 1056 CSS px at 96 dpi).
- `@page{size:letter;margin:0}`; each sheet breaks to its own page.
- Self-hosted fonts under `dist/assets/`; no external requests.
- Preview toolbar and section markers are hidden in print.
- Presentation sheets contain no links, buttons, inputs, or handlers.

## External gate

Pagination and font embedding must be verified by the front-end converter on the actual PDF. A passing web check does not prove final print output.
