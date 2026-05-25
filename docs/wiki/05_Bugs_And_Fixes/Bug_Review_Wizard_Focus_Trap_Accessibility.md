---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-12
updated: 2026-05-12
tags:
  - bug
  - widget
  - accessibility
  - review-wizard
related:
  - "[[Bug_Index]]"
  - "[[Solved_Issues]]"
  - "[[Product_Review_Widget]]"
  - "[[Bug_Lightbox_Focus_Trap_Accessibility]]"
---

# Bug - Review Wizard Focus Trap Accessibility

## Date
2026-05-12

## Status
Fixed

## Area
Widget

## Symptoms
When the "Write a Review" wizard was open, pressing `Tab` could move keyboard focus into storefront controls behind the modal. The wizard had partial dialog semantics, but it did not behave like a complete modal dialog.

Example scenario:
1. Open the product review widget on a storefront.
2. Click the write-review CTA.
3. Press `Tab` several times.
4. Focus can leave the wizard and reach page links/buttons behind the overlay, so keyboard users can interact with the storefront while the modal is visually active.

## Root Cause
[modal-shell.js](src/widget/product-widget/review-form-modal/modal-shell.js) set `role="dialog"` and `aria-modal="true"`, but only handled `Escape`. It did not:
- capture the opening trigger for focus restoration,
- move initial focus into the wizard,
- trap `Tab` / `Shift+Tab` inside the overlay,
- restore focus on close.

[styles.js](src/widget/product-widget/review-form-modal/styles.js) also removed input outlines on focus and did not provide a replacement `:focus-visible` style. Step 2 used a clickable label with a hidden file input for photo upload, which was weaker for keyboard access than a real button trigger.

## Fix
The wizard shell now owns modal focus management:
- captures the previously focused element before opening,
- moves focus into the wizard on open (initial step's first focusable),
- keeps `Tab` and `Shift+Tab` inside the modal,
- restores previous focus on close — but only for keyboard-originated opens (see [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]).

Wizard buttons (close, star, photo add, submit, CTA, nav) now have visible `:focus-visible` outlines. The photo upload trigger is a real button that opens the hidden native file input, preserving keyboard and mouse behavior. Rating radio buttons now update `aria-checked`.

### Follow-up tuning (2026-05-12)
The first iteration moved focus into the current step on every step change. That auto-focus surfaced two problems on real devices:
1. On mobile, advancing to step 3 (content) or step 4 (author) auto-focused the first text input → the OS keyboard popped up unprompted.
2. The heavy `:focus-visible` ring on inputs flashed on every step change, even though the caret was already a sufficient focus indicator.

The tuning:
- Step transitions no longer auto-focus. The Next button keeps focus after navigation; users tab into the new step. Initial modal-open focus is still managed by the shell.
- The `:focus-visible` outline on `.renuvex-pr-fwizard-input` and `.renuvex-pr-fwizard-textarea` was removed; inputs rely on the native caret. Buttons keep their outline.

## Files Changed
- [modal-shell.js](src/widget/product-widget/review-form-modal/modal-shell.js)
- [index.js](src/widget/product-widget/review-form-modal/index.js)
- [step-photos.js](src/widget/product-widget/review-form-modal/steps/step-photos.js)
- [step-rating.js](src/widget/product-widget/review-form-modal/steps/step-rating.js)
- [styles.js](src/widget/product-widget/review-form-modal/styles.js)
- [widget.js](public/widget.js)

## Prevention
- Add a browser smoke test for wizard keyboard navigation: open wizard, press `Tab` and `Shift+Tab` through each step, verify focus never reaches storefront controls, then close and verify focus returns to the opening CTA.
- Treat every storefront overlay as either a modal dialog with a focus trap or a non-modal popover/menu with explicit keyboard semantics.

## Related Notes
- [[Bug_Lightbox_Focus_Trap_Accessibility]]
- [[Product_Review_Widget]]
- [[Solved_Issues]]
