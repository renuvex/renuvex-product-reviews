---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-06-12
updated: 2026-06-12
last_verified: 2026-06-12
confidence: high
tags:
  - admin
  - widget-settings
  - dirty-state
source_files:
  - "src/components/home-page/index.tsx"
  - "src/components/home-page/widgets/index.tsx"
  - "src/components/home-page/widgets/editor/WidgetEditor.tsx"
  - "src/components/home-page/widgets/editor/WidgetEditorState.ts"
  - "src/components/home-page/widgets/editor/SettingsPanel.tsx"
  - "tests/unit/widget-editor-state.test.ts"
---

# Widget Editor Late Settings Dirty State

## Symptom
Opening the Product Reviews customization screen could immediately show the "unsaved changes" badge and an active save button, even before the merchant changed a setting. The preview could also look like defaults on that first entry. If the merchant discarded the unsaved state and reopened the editor, the previously saved settings appeared.

## Root Cause
`HomePage` loads widget settings asynchronously and initially passes an empty settings map. `WidgetsContainer` therefore can open `WidgetEditor` with `{}` for the active widget before the saved settings response arrives. The editor initialized its local draft from that temporary value and only reset the draft when `widget.id` changed. When the real saved settings arrived later, `dirty` compared the old default draft against the new saved settings and treated the editor as changed.

## Fix
`WidgetEditorState.ts` now owns the pure draft/default comparison helpers. `WidgetEditor` tracks the previous saved draft snapshot and synchronizes the local draft when saved settings arrive late only if the merchant has not made a local edit. Local edits remain protected from late hydration overwrites, while real widget switches still reset the draft.

The dirty comparison now uses stable key-sorted serialization so equivalent setting objects do not become dirty because of object key insertion order.

## Prevention
`tests/unit/widget-editor-state.test.ts` pins:

- saved review settings overriding widget defaults,
- key-order-insensitive draft comparison,
- late saved-settings hydration syncing when the draft is still untouched,
- late hydration not overwriting a local edit,
- widget changes still forcing draft sync.

## Verification
- `npx tsc --noEmit` (or `pnpm build`) — required for refactors that move/remove exports (see "Follow-up")
- `pnpm test:unit`
- `pnpm lint`
- `node scripts/wiki-audit.mjs --changed-source-check`
- `git diff --check`

## Follow-up: build break from the type move (2026-06-12)
The fix moved the `WidgetSettingsDraft` type out of `WidgetEditor.tsx` into
`WidgetEditorState.ts`, but `SettingsPanel.tsx` kept importing it from
`WidgetEditor` (which no longer exports it) — a `TS2459` error. `pnpm test:unit`
(vitest/esbuild strips types) and `pnpm lint` (`eslint src`, not type-aware) both
passed, so it shipped in `b0928429`. `next.config.js` sets no
`typescript.ignoreBuildErrors`, so `next build` type-checks by default and the
Vercel build was broken until follow-up commit `31009465` repointed the import to
`WidgetEditorState`.

**Lesson:** for any TS/TSX change that moves or removes an export, run
`npx tsc --noEmit` (or `pnpm build`) before committing — vitest and eslint do not
catch a broken type import.

A defense-in-depth gate (`EditorSkeleton`, commit `e9a9a7a7`) was also added: the
editor renders a skeleton until settings load, so it never mounts with
placeholder data — making the false-dirty state structurally impossible, not just
corrected before paint.
