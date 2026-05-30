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

## Fix (final — see Follow-up for the revision)
- **`step-rating.js` — stars are keyboard-navigable both ways.** All 5 stars stay in the Tab
  order (Tab moves between them) AND `←/→/↑/↓` + `Home/End` move + select; `Enter/Space`/tap
  select **and** advance. (`selectRating` = state + visual; `activateRating` = select + advance.)
- **Open focuses the dialog, not a control.** `modal-shell.js open()` focuses the overlay
  (`role="dialog"`) and the close button is appended LAST (end of tab order), so no control shows
  a ring on open and the **first Tab lands on star 1** (not star 2). The lightbox
  (`review-modal.js`) likewise focuses its `modalWrap` dialog on open, so opening a photo from the
  strip no longer lights a focus ring on a nav arrow. Both dialog containers also carry
  `:focus{outline:none}` — otherwise, once the user has used the keyboard, the browser paints a
  `:focus-visible` ring around the whole dialog on each (re)open of this programmatic focus target.
- **`focus-trap.js` — `getReturnFocusElement()` is now shadow-aware.** A `deepActiveElement()`
  walk drills through `shadowRoot.activeElement` chains to capture the real focused control, so
  the trigger is restored on close. Benefits the lightbox too.
- **`modal-shell.js` — `close()` moves focus out immediately**, not after the 200 ms fade: a
  keyboard-opened wizard restores focus to the trigger right away; a pointer-opened one blurs the
  active control. This kills the lingering focus ring on the rating star during the fade-out
  ("anlık odak").
- **`focus-trap.js` — `isVisibleFocusable()` excludes `tabindex < 0`** (general correctness: a
  control not in the Tab order must not count toward the trap's first/last).

## Follow-up (2026-05-30, revised after user testing)
A first pass made the radiogroup a **strict single Tab stop** (roving `tabindex`, arrow-only
between stars). On testing, the user preferred **Tab to also move between the stars**, so the
roving was removed — all stars are Tab stops again, with arrow keys as an additional method. The
close path was also refined to move focus out immediately (above) so the fade-out no longer shows
a momentary focus ring.

A second pass: the user noted the first Tab landed on star **2** (focus was auto-placed on star 1
at open) and that opening a photo lit a ring on a lightbox nav arrow. Fix: both overlays now focus
the **dialog container** on open instead of the first control, and the wizard close button moved to
the end of the tab order — so the first Tab lands on star 1 and the lightbox shows no arrow ring.
(Removing the renamed `focusFirstWizardControl` had left a dead `focusFirstControl` export
referencing it → a ReferenceError that briefly stopped the wizard opening; the dead export was
removed.)

## Files Changed
- `src/widget/reviews-section/review-form-modal/steps/step-rating.js`
- `src/widget/reviews-section/review-form-modal/modal-shell.js` (focus dialog on open; close
  appended last; immediate focus-out on close; removed the dead `focusFirstControl` export)
- `src/widget/reviews-section/review-modal.js` (lightbox focuses its dialog on open)
- `src/widget/shared/focus-trap.js`
- `tests/widget-interaction-smoke.spec.ts` (regression: keyboard open → first `Tab` → 1st star;
  `ArrowRight` → 2nd star; `Tab` → 3rd star; `Esc` returns focus to `.renuvex-pr-write-btn`)
- Rebuilt `public/widget.js` + `public/widget-runtime/*`

## Verification
- Playwright + real Chromium: wizard `open → dialog focused`, first `Tab → "1 yıldız"`, `←/→`
  roam (2↔3), `Esc → renuvex-pr-write-btn` **immediately** (no lingering ring; pointer blurs to
  body). Lightbox `open → modalWrap (role=dialog)` focused, not a nav arrow.
- `pnpm test:widget-interactions` (7/7 incl. the a11y regression), `pnpm test:widget-runtime`
  (8/8), `pnpm test:unit` (54/54), `pnpm check:widget-js` (18/18), `pnpm exec tsc --noEmit`, `pnpm lint`.

## Prevention
- Overlay focus return must use a shadow-aware deep-active-element lookup (triggers live in
  shadow roots); move focus out on close **before** the fade so no ring lingers. The focus trap
  must exclude `tabindex < 0` controls.
- The regression test pins Tab + arrow star navigation and Esc focus return.
