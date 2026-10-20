# Sandbox archive — 2026-10-20

This folder preserves the presentation-kit work that was pruned from the working tree. The reusable system itself now lives in `tribe-shared` as the `presentation-kit-factory` skill; the sandbox is no longer required by it.

## What is here

| Folder | Contents |
|---|---|
| `2026-10-20/proof-kits/8twelve-conversation-kit-v2/` | Source and screenshots for the full 7-sheet parity rebuild. |
| `2026-10-20/proof-kits/8twelve-page1-proof/` | Phase 1 one-page proof (superseded by the full rebuild). |
| `2026-10-20/proof-kits/worksheet-smoke/` | Demo-brand standalone worksheet proof. |
| `2026-10-20/reference-kit/` | The approved 8Twelve kit's page screenshots and two PDF proofs. |
| `2026-10-20/8twelve-mortgage-kit-research/` | Research notes and implementation artifacts from `_bmad-output`. |

Each proof kit keeps its source files (`kit.config.json`, `brief.md`, `content.yaml`, `checks.yaml`, `decisions.md`), its `manifest.json` and `PRINT.md`, and its screenshots. The generated `dist/index.html`, `dist/print`, `dist/assets`, `node_modules`, `.playwright-mcp`, and the original kit's `_bmad` tool state were pruned; they are reproducible.

The original kit remains in `8twelve-mortgage-kit/` with its source, docs, assets and uncommitted edits. `npm install` restores its dependencies; `npm run preview:check` regenerates its screen output.

## Rebuild an archived proof kit

The installed skill includes the 8Twelve brand pack, so the archived source is enough:

```bash
SKILL="$HOME/.claude/plugins/cache/tribe-shared/tribe-shared/1.1.1/skills/presentation-kit-factory"
cp -R archive/2026-10-20/proof-kits/8twelve-conversation-kit-v2 /tmp/rebuild
node "$SKILL/factory/scripts/render.mjs" --kit /tmp/rebuild
node "$SKILL/factory/scripts/verify.mjs" --kit /tmp/rebuild
node "$SKILL/factory/scripts/dev-server.mjs" --root /tmp/rebuild/dist
```

The archived rebuild was verified before pruning: **7 sheets, 159/159 checks**.

For browser screenshots, install Playwright once in the skill factory:

```bash
cd "$SKILL/factory" && npm install --no-save playwright
node "$SKILL/factory/scripts/preview.mjs" --kit /tmp/rebuild
```

## Why the proof kits are not next to the skill

The shared skill ships two client-safe examples (`demo-letter`, `demo-worksheet`) using the neutral demo brand. The real 8Twelve proof kits stay here because they are application content, not reusable capability. The skill does not depend on this folder.
