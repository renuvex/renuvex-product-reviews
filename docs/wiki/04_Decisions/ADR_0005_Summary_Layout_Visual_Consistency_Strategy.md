---
type: decision
project: ikas-review-app
status: active
created: 2026-05-07
updated: 2026-05-07
tags:
  - adr
  - ui
  - ux
  - layout
related:
  - "[[Summary_Layout_Padding_Strategy]]"
  - "[[Storefront_Widget_Overview]]"
---

# ADR 0005: Summary Layout Visual Consistency Strategy

## Status
Active

## Context
Widget summary layouts (Classic, Split, Compact) were using inconsistent vertical spacing (12px to 16px) and button height behaviors. Merchants complained that the "Filter" button often looked misaligned with the "Write Review" button when font sizes were adjusted. Competitors like Loox and Yotpo use a more spacious "ferah" look with perfectly synchronized primary and secondary actions.

## Decision
1. **Vertical Spacing**: Standardize the vertical gap (`--ikr-col-gap`) between major summary blocks to **20px** for the Ozy theme. This provides a more premium, spacious feel.
2. **Button Synchronization**: Use `align-items: stretch` on action wrappers (`.ikr-summary-actions`, `.ikr-split-right`) and `height: auto` on buttons to ensure the Filter button exactly matches the height of the Write Review button, regardless of font scale.
3. **Tablet Breakpoints**: Move the Split layout breakpoint to **768px** (iPad Portrait) to ensure tablets benefit from the optimized vertical mobile view rather than trying to fit 3 columns into narrow horizontal space.
4. **Layout Shift Prevention**: Keep hidden elements (like recommendation percentage) in the DOM with `visibility: hidden` on desktop to preserve column height, but switch to `display: none` on mobile to prevent empty vertical gaps.

## Consequences
- **Positive**: Perfectly aligned buttons across all layouts. More consistent "ferah" brand identity. Better tablet experience. No more layout jumping when toggling settings.
- **Negative**: Increased vertical height of the summary section on mobile (more scrolling required).
- **Neutral**: Requires keeping media queries in sync across `styles.js` files.

## Change Log
- 2026-05-07: Initial decision and implementation across all summary layouts.
