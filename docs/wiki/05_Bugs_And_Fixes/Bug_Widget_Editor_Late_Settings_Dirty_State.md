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
- `pnpm test:unit`
- `pnpm lint`
- `node scripts/wiki-audit.mjs --changed-source-check`
- `git diff --check`
