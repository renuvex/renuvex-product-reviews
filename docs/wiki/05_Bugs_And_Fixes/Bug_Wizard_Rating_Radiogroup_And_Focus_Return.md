---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-30
updated: 2026-05-30
last_verified: 2026-05-30
confidence: high
tags:
  - bug
  - widget
  - accessibility
  - focus
  - shadow-dom
related:
  - "[[Bug_Index]]"
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[ADR_0025_Overlay_Shared_Surface_Foundation]]"
source_files:
  - "src/widget/reviews-section/review-form-modal/steps/step-rating.js"
  - "src/widget/shared/focus-trap.js"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - Wizard Rating Radiogroup + Focus Return

## Status
Fixed (2026-05-30).

## Area
Review-form wizard rating step (`steps/step-rating.js`) and the shared overlay focus toolkit
(`shared/focus-trap.js`, used by BOTH the wizard and the photo lightbox).

## Symptoms
User report: in the wizard, Tab stepped through **every one of the 5 stars** (one Tab stop per
star), and pressing **Esc** did not return focus to the "Yorum Yap" trigger — focus felt lost /
"too aggressive". (Focus correctly entered on the 1st star on open; that part is intended.)

## Root Cause
1. **Radiogroup was not a single Tab stop.** The 5 stars are `<button role="radio">` inside a
   `role="radiogroup"`, but each had the default `tabindex=0`, so Tab visited all five. WAI-ARIA
   requires a radiogroup to be ONE Tab stop with arrow-key roving between options.
2. **Focus return broke for a shadow-hosted trigger.** `getReturnFocusElement()` read
   `document.activeElement`, which for an element focused inside a shadow root is the shadow
   **host** (`#renuvex-reviews`), not the real trigger button. `restoreFocus(host)` is a no-op
   (the host is not focusable), so on close focus fell to `<body>` instead of returning to the
   "Yorum Yap" button. (Same flaw affected the lightbox, whose trigger is also shadow-hosted.)

## Fix
- **`step-rating.js` — roving tabindex.** Exactly one star is in the Tab order (`tabindex=0`,
  the selected one or the 1st); the rest are `tabindex=-1`. `←/→/↑/↓` + `Home/End` move focus and
  select (no auto-advance); `Enter/Space` and tap select **and** advance (unchanged). Focus still
  enters on the 1st star on open (product choice). Split `selectRating()` (state + visual + roving)
  from `activateRating()` (select + advance).
- **`focus-trap.js` — `getReturnFocusElement()` is now shadow-aware.** A `deepActiveElement()`
  walk drills through `shadowRoot.activeElement` chains to capture the real focused control, so
  the trigger is restored on close. Benefits the lightbox too.
- **`focus-trap.js` — `isVisibleFocusable()` excludes `tabindex < 0`.** Without this the trap's
  `getFocusableElements` still matched the roving-inactive `tabindex="-1"` stars (via
  `button:not([disabled])`), corrupting first/last math so Tab could escape the overlay. Now the
  trap counts only genuinely tabbable controls.

## Files Changed
- `src/widget/reviews-section/review-form-modal/steps/step-rating.js`
- `src/widget/shared/focus-trap.js`
- `tests/widget-interaction-smoke.spec.ts` (regression: open via keyboard → focus on 1st star;
  `ArrowRight` → 2nd star; `Tab` leaves the group as one stop; `Esc` returns focus to
  `.renuvex-pr-write-btn`)
- Rebuilt `public/widget.js` + `public/widget-runtime/*`

## Verification
- Playwright + real Chromium: `open → "1 yıldız"`, arrows roam (2↔3), `Tab → "Kapat"` (single
  stop, not "3 yıldız"), `Esc → renuvex-pr-write-btn` focused.
- `pnpm test:widget-interactions` (7/7 incl. the new a11y regression), `pnpm test:widget-runtime`
  (8/8), `pnpm test:unit` (54/54), `pnpm check:widget-js` (18/18), `pnpm exec tsc --noEmit`, `pnpm lint`.

## Prevention
- Roving tabindex is the contract for any future radio/option group in the widget.
- Overlay focus return must use a shadow-aware deep-active-element lookup (triggers live in
  shadow roots). The focus trap must exclude `tabindex < 0` controls.
- The regression test pins single-Tab-stop + arrow nav + Esc focus return.
