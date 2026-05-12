---
type: decision
project: ikas-review-app
status: active
created: 2026-05-12
updated: 2026-05-12
tags:
  - adr
  - widget
  - accessibility
  - mobile
  - ux
related:
  - "[[Decision_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Bug_Filter_Menu_Keyboard_Accessibility]]"
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
---

# ADR_0011 — Widget Touch Feedback and Focus Modality Contract

## Status
Accepted

## Date
2026-05-12

## Context
Mobile browsers (especially Chrome Android) paint a translucent overlay on tap (`-webkit-tap-highlight-color`) and may leave `:focus` rings sticky after touch. The result inside the storefront widget was an inconsistent blue/gray flash on interactive controls and lingering focus rings after popovers and modals closed — most visibly on the review summary filter trigger and the review submission wizard. The behavior changed across browsers, devices, and even between consecutive taps on the same control because three different mechanisms were stacking: tarayıcı tap-highlight, the `:active` state, and sticky `:focus` after touch.

Per-component patches (disable tap-highlight only in the gallery layout, restore focus unconditionally in the filter close handler) only solved fragments of the problem and would have required hand-editing for every new widget surface added in the future. The widget bundle already groups every storefront surface (review list, summary, wizard, lightbox, badges) into a single `widget.js`, so a single shared base is feasible.

## Decision
Adopt a four-layer canonical contract enforced widget-wide rather than per-component:

1. **Tarayıcı tap-highlight is disabled inside the widget scope** via a `[class^="ikr-"], [class*=" ikr-"] { -webkit-tap-highlight-color: transparent }` rule. The rule is scoped to widget elements only — it does not leak into the storefront.
2. **Controlled `:active` feedback** replaces the disabled tap highlight. Buttons / `[role="button"]` / `[role="menuitem"]` get a deterministic `opacity: 0.85` dip. Two opt-in utility classes (`.ikr-press-dim`, `.ikr-press-scale`) cover non-button interactives (image thumbs, photo strip items).
3. **Focus outlines are scoped to `:focus-visible`**, never `:focus`. Modern browsers (Safari 15.4+, Chrome 86+, Firefox 85+) suppress `:focus-visible` for pointer/touch automatically, so the focus ring only appears for keyboard users.
4. **A global "last input modality" tracker** decides whether to restore focus to the opening trigger when a popover or modal closes. Keyboard-originated opens restore focus (Tab continuity). Pointer/touch-originated opens leave focus alone (no sticky pressed/focus look on mobile). One module owns this signal — every popover, dropdown, menu, and modal asks `wasLastInputKeyboard()` instead of tracking origin per component.

### Architectural shape
- New `src/widget/shared/` directory holds bundle-wide utilities.
  - [base-reset.js](src/widget/shared/base-reset.js) exposes `ensureBaseReset()` which injects a `<style id="ikr-base-reset">` element prepended to `document.head`. Idempotent and safe to call from multiple entry points.
  - [input-modality.js](src/widget/shared/input-modality.js) exposes `wasLastInputKeyboard()` plus `attachInputModalityListeners()`. Listeners attach once on `document` in capture phase; navigation keys (Tab/Enter/Space/Arrow/Home/End/PageUp/PageDown/Escape) flip the flag to keyboard, `pointerdown` (with mousedown/touchstart fallback for legacy browsers) flips it back to pointer.
- [src/widget/index.js](src/widget/index.js) calls both helpers as side-effects right after the error reporter is registered, before any UI runs.
- Per-surface CSS files no longer need their own tap-highlight reset. New widgets following the `ikr-` naming convention inherit the contract automatically.

### Consumers updated in this decision
- Filter dropdown ([actions-block.js](src/widget/summary-layouts/shared/actions-block.js)) routes its close-handler `restoreFocus` decision through `wasLastInputKeyboard()` (mode `'auto'`). Escape closes still restore unconditionally, since Escape is by definition a keyboard event.
- Wizard modal ([modal-shell.js](src/widget/product-widget/review-form-modal/modal-shell.js)) captures the modality at open time and only restores focus on close if the open was keyboard-originated.
- Wizard CSS ([styles.js](src/widget/product-widget/review-form-modal/styles.js)) drops the legacy `:focus { outline:none }` reset on inputs/textareas — modern browsers no longer paint that ring for pointer/touch under `:focus-visible` semantics.

## Alternatives Considered
- **Per-component fixes (rejected).** Adds a hand-maintained list of selectors for every new widget. Worked for the gallery layout originally, but the inconsistency across the bundle is exactly the smell that drove this ADR.
- **Single shared `.ikr-root` ancestor class (rejected).** Would have required wrapping multiple separately-mounted DOM trees (badge, lightbox, modal, summary, list) under a single ancestor. Architecturally invasive; broke the current "mount where the theme has anchors" model.
- **Per-trigger origin tracking via element-local listeners (rejected).** Works but duplicates state and listener wiring for every dropdown / modal. The global modality tracker is what React Spectrum, Material UI, and the `:focus-visible` polyfill itself use; copying that pattern keeps future widgets thin.

## Consequences
**Positive**
- Tap feedback is deterministic across browsers and OS versions; no surprise blue flash.
- Focus rings appear for keyboard users only — accessibility kept, mobile UX cleaned up.
- New widget surfaces inherit the contract by following the existing `ikr-` naming convention. No checklist.
- `touch-action: manipulation` removes the legacy 300 ms tap delay on older Android — a small perceived-speed gain.
- Bundle gains ~1.7 KB (base-reset CSS + input-modality JS) before gzip. Negligible relative to the 175 KB bundle.

**Negative / accepted trade-offs**
- Pointer/touch closes deliberately do not restore focus to the trigger. Screen-reader-on-touch users (VoiceOver, TalkBack) may notice that focus does not return after an action — this is consistent with native iOS / Android behavior and what Radix / Headless UI also do.
- Attribute selectors (`[class^="ikr-"]`) are marginally heavier than class selectors during initial style recalc. Cached after first paint; measured cost on our DOM size (~200–500 nodes per surface) is sub-millisecond.

## Related Source Files
- [base-reset.js](src/widget/shared/base-reset.js)
- [input-modality.js](src/widget/shared/input-modality.js)
- [index.js](src/widget/index.js)
- [actions-block.js](src/widget/summary-layouts/shared/actions-block.js)
- [modal-shell.js](src/widget/product-widget/review-form-modal/modal-shell.js)
- [styles.js](src/widget/product-widget/review-form-modal/styles.js)
- [widget.js](public/widget.js)

## Obsidian Links
- [[Widget_Architecture]]
- [[Bug_Filter_Menu_Keyboard_Accessibility]]
- [[Bug_Review_Wizard_Focus_Trap_Accessibility]]
- [[Current_Status]]
