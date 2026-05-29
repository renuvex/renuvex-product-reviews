---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-30
updated: 2026-05-30
last_verified: 2026-05-30
confidence: high
tags:
  - adr
  - widget
  - overlay
  - shadow-dom
  - scroll-lock
  - focus-trap
  - refactor
related:
  - "[[Decision_Index]]"
  - "[[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[Test_Strategy]]"
  - "[[Ikas_Theme_Limitations]]"
source_files:
  - "src/widget/core/body-scroll-lock.js"
  - "src/widget/shared/focus-trap.js"
  - "src/widget/core/modal-history.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/review-form-modal/modal-shell.js"
  - "src/widget/reviews-section/review-form-modal/styles.js"
  - "tests/unit/widget-surface-contracts.test.ts"
  - "tests/widget-interaction-smoke.spec.ts"
---

# ADR 0025: Overlay Shared-Surface Foundation

## Status
Accepted (2026-05-30).

## Context
A recurring bug class: the review-form **wizard** kept missing or re-implementing
cross-cutting concerns that the photo **lightbox** already handled correctly. Two instances
within days:

1. The wizard shadow root omitted `BASE_RESET_CSS`, so the mobile blue tap-highlight came
   back on its fields (the ADR_0021 follow-up).
2. The wizard had its **own weaker** `lockBodyScroll` — only `body { overflow:hidden }`, no
   `!important`, no `<html>`, no `overscroll-behavior`, no iOS `position:fixed`. On merchant
   themes whose scroll container is `<html>` (or that override `body` overflow with
   `!important`), and on iOS, the storefront page scrolled behind the open wizard. The
   lightbox already had a robust, theme-agnostic lock (provenance:
   [[Bug_Lightbox_Mobile_Pull_To_Refresh]], [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]],
   [[Bug_Lightbox_Tablet_Viewport_And_Scroll]]).

Root cause: the two body-level overlays (`review-modal.js`, `review-form-modal/`) **duplicated
their shell concerns and the copies drifted**. Inspection found the duplication spanned body
scroll lock (divergent), the focus toolkit (verbatim copy), back-button history (divergent),
ESC/backdrop close, and `overscroll-behavior` (lightbox had it, wizard had none).

## Decision
Extract each cross-cutting overlay concern into **one shared module** (the "ortak alan"),
consumed by both overlays, and **enforce the boundary with an executable contract test**.
Explicitly **not** a runtime controller/factory abstraction (see "Why not a controller").

Two tiers define shared vs per-surface:

- **Tier 1 — Shadow surface** (review section, lightbox, wizard): `core/shadow.js`
  (`createOverlayShadowHost`/`attachShadowHost`, `injectShadowStyles`, `HOST_RESET_CSS`,
  `getActiveElementWithin`), `shared/base-reset.js` (`BASE_RESET_CSS`), `icons/star-sprite.js`
  (sprite mirror). Invariant: every shadow surface injects
  `HOST_RESET_CSS + BASE_RESET_CSS + <surfaceCSS>`.
- **Tier 2 — Overlay surface** (lightbox, wizard): Tier 1 plus the shared shell modules:
  - `core/body-scroll-lock.js` — robust, **ref-counted** lock: pins `<html>` AND `<body>`
    with `!important` + `overscroll-behavior-y:none`, compensates scrollbar width, and on iOS
    uses `position:fixed` + scroll restore. Makes no assumption about which element is the
    theme's scroll container, which is why it works on arbitrary merchant themes.
  - `shared/focus-trap.js` — `getReturnFocusElement`, `restoreFocus`, `isVisibleFocusable`,
    `getFocusableElements`, `focusFirst(primary, fallback)`, `trapFocus(e, container, root)`.
  - `core/modal-history.js` — id-based back-button entry (`pushModalHistoryEntry` /
    `restoreModalHistoryEntry`).
  - `overscroll-behavior:contain` on each overlay backdrop and its inner scroll container.

Per-surface (**kişisel**) stays inside each surface: content DOM, surface CSS (`CLASSIC_CSS`
vs `FWIZARD_CSS`), and content behavior — the lightbox keeps image navigation, preview-settings
sync, and swipe; the wizard keeps steps, progress, and toast. Thin surface-specific entry
wrappers that delegate to the shared primitives (e.g. `trapWizardFocus` → `trapFocus`,
`focusFirstWizardControl` → `focusFirst(content, overlay)`) are allowed.

## Why not a controller
A `createOverlaySurface()` controller wrapping both overlays was the originally approved
direction. It was rejected **during implementation** after reading both surfaces: they differ
enough (fade strategy — the wizard toggles `renuvex-pr-fwizard-open`, the lightbox appends
directly; content structure; the lightbox's preview-sync/swipe; history split into the wizard's
`index.js`) that a shared controller would be either **rigid** (force-fitting the battle-tested
lightbox → regression risk) or **heavily optioned** (complexity that is itself the
over-abstraction we wanted to avoid). The shared modules already provide single-source-of-truth
ortak/kişisel separation, and the contract test provides the anti-recurrence guarantee, so the
controller's marginal benefit did not justify rewriting proven lightbox flow. This was an
explicit, user-confirmed decision.

## Enforcement
- `tests/unit/widget-surface-contracts.test.ts` "overlay shared-surface contract": the body
  scroll lock and the focus-trap **primitives** are defined only in their shared modules, and
  both overlays import them and do **not** re-define `lockBodyScroll` / `unlockBodyScroll` /
  `getFocusableElements` / `isVisibleFocusable`. This is the rule that fails the build the next
  time a surface tries to grow its own copy.
- `tests/widget-interaction-smoke.spec.ts` asserts that opening either overlay locks scroll on
  **both** `<html>` and `<body>` and restores on close — the exact part the old wizard lock
  omitted (it fails on the pre-fix code, passes now).

## Consequences
- Wizard background scroll is locked on every theme and on iOS, matching the lightbox. Mobile
  back button, focus trap, tap-highlight, and overscroll containment are now consistent across
  both overlays.
- Adding a new overlay concern means adding one shared module; the contract test fails if a
  surface re-implements it. A new body-level overlay opts into Tier 2 by importing the shared
  modules.
- Back-button history is still wired per-surface (lightbox via `core/modal-history.js`; wizard
  via its own `index.js` block). Unifying the wizard onto `modal-history.js` is a low-priority
  follow-up — both work today, and the contract test does not require it.

## Verification
`pnpm build:widget`, `pnpm test:unit` (contract invariant), `pnpm test:widget-interactions`
(scroll-lock regression + lightbox/wizard flows), `pnpm test:widget-runtime`,
`pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check`.
Manual cross-theme + iOS smoke on the dev storefront (open both overlays on Ozy and on an "X"
theme that scrolls on `<html>`; background must not scroll; scroll position restored on close).

## Related Source Files
- [src/widget/core/body-scroll-lock.js](src/widget/core/body-scroll-lock.js)
- [src/widget/shared/focus-trap.js](src/widget/shared/focus-trap.js)
- [src/widget/core/modal-history.js](src/widget/core/modal-history.js)
- [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js)
- [src/widget/reviews-section/review-form-modal/modal-shell.js](src/widget/reviews-section/review-form-modal/modal-shell.js)
- [tests/unit/widget-surface-contracts.test.ts](tests/unit/widget-surface-contracts.test.ts)
- [tests/widget-interaction-smoke.spec.ts](tests/widget-interaction-smoke.spec.ts)

## Obsidian Links
- [[Decision_Index]]
- [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]
- [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]
- [[Test_Strategy]]
- [[Ikas_Theme_Limitations]]
