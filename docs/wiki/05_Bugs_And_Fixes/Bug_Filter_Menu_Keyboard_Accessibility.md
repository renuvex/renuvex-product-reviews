---
type: bug
project: ikas-review-app
status: active
created: 2026-05-12
updated: 2026-05-12
tags:
  - bug
  - widget
  - accessibility
  - filter-menu
related:
  - "[[Bug_Index]]"
  - "[[Solved_Issues]]"
  - "[[Product_Review_Widget]]"
  - "[[Bug_Review_Wizard_Focus_Trap_Accessibility]]"
---

# Bug - Filter Menu Keyboard Accessibility

## Date
2026-05-12

## Status
Fixed

## Area
Widget

## Symptoms
The review summary filter menu (En Yeni / En Yüksek Puan / En Düşük Puan / Fotoğraflı) was unreachable by keyboard. The dropdown opened on mouse click, but pressing `Tab` skipped past the filter options entirely, and there was no way to activate an option from the keyboard.

Example scenario:
1. Open the product review widget on a storefront.
2. Tab forward — focus reaches the filter trigger button.
3. Press `Enter` or `Space` to open the menu.
4. Press `Tab` — focus jumps out of the menu instead of landing on the first option.
5. Filter options can only be activated by mouse click.

## Root Cause
[actions-block.js](src/widget/summary-layouts/shared/actions-block.js) built filter options as `<div>` elements with an `onclick` handler. `<div>` is not focusable, has no implicit keyboard activation (Enter/Space), and is not announced as an interactive control by assistive tech. The trigger button also lacked `aria-haspopup` / `aria-expanded`, and the menu had no `role="menu"` semantics. Focus did not move into the menu on open and was not restored to the trigger on close.

## Fix
- Filter options are now `<button type="button" role="menuitem">` so Tab visits them, Enter/Space activates them, and assistive tech announces them as menu items.
- Filter menu has `role="menu"`; trigger has `aria-haspopup="menu"` and toggles `aria-expanded` on open/close.
- Opening the menu focuses the first option (the currently active filter if any, otherwise the first item).
- Pressing `Escape` while the menu is open closes it and returns focus to the trigger.
- Tabbing out of the filter group (focus leaves `.ikr-filter-wrap`) auto-closes the menu so a hidden-but-open menu does not linger.
- Selecting an item closes the menu and restores focus to the trigger before the sort change fires.
- Added `:focus-visible` outlines on `.ikr-filter-btn` and `.ikr-filter-item` so keyboard focus is visible.
- The existing popover-registry light dismiss (outside click + global Escape) is preserved.

## Files Changed
- [actions-block.js](src/widget/summary-layouts/shared/actions-block.js)
- [themes/ozy/styles.js](src/widget/themes/ozy/styles.js)
- [widget.js](public/widget.js)

## Prevention
- Build dropdown / menu UI with real interactive elements (`<button>`) and ARIA menu semantics from the start.
- Add a browser smoke test for the filter menu: Tab to trigger → Enter → Tab through options → Enter activates → Escape returns focus to trigger.

## Related Notes
- [[Bug_Review_Wizard_Focus_Trap_Accessibility]]
- [[Product_Review_Widget]]
- [[Solved_Issues]]
