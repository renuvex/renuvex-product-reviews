---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-27
updated: 2026-05-31
last_verified: 2026-05-31
confidence: high
tags:
  - widget
  - css
  - design-system
  - css-variables
related:
  - "[[Index]]"
  - "[[System_Architecture]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
source_files:
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/summary-layouts/classic/styles.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/badge.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/summary-layouts/hero/styles.js"
  - "src/widget/summary-layouts/compact/styles.js"
  - "src/widget/summary-layouts/minimal/styles.js"
  - "src/widget/summary-layouts/split/styles.js"
  - "src/widget/review-layouts/card/index.js"
  - "src/widget/review-layouts/list/styles.js"
  - "src/widget/review-layouts/gallery/styles.js"
  - "src/widget/reviews-section/review-form-modal/styles.js"
---

# CSS Variable Surface

## Summary
The Renuvex widget exposes ~90 CSS custom properties under the `--renuvex-pr-*` namespace. They are the runtime contract between merchant settings (color / size / spacing config) and the DOM. This page is the durable index — what exists, where it is set, where it is read, what scope it lives in, and how to add a new one without breaking the contract.

The variables fall into two scope tiers (see "Scope tiers" below). Most live on the widget root (`#renuvex-reviews-widget`) or inside a Shadow DOM via custom-property inheritance; a small set lives on `document.documentElement` (global) and a single component-scope set lives on `.renuvex-pr-rating-badge` for badge sizing.

## Scope tiers

| Tier | Where set | Where readable | Examples |
|---|---|---|---|
| **Global (`:root`)** | `document.documentElement` via `listing-badges/index.js setProperty` (one var only) | Anywhere in the document AND inside any shadow root (custom properties inherit across shadow boundary, ADR_0021) | `--renuvex-pr-review-star-color` |
| **Widget root** | `#renuvex-reviews-widget` rule in `CLASSIC_CSS` (`reviews-section/styles.js`) AND `render.js` `applyVars` / `applyLayoutSizeOverrides` via `root.style.setProperty` | Inside the review section shadow tree (declared on the widget root inside the shadow) | `--renuvex-pr-gap-tight`, `--renuvex-pr-title-size`, `--renuvex-pr-radius`, `--renuvex-pr-bar-fill`, ~70 others |
| **Component-scope (badge)** | `<style id="renuvex-pr-badge-tokens">` in head via `core/badge.js ensureBadgeTokens` (selector: `.renuvex-pr-rating-badge`) | Inside any element matching `.renuvex-pr-rating-badge` | `--renuvex-pr-badge-icon-size`, `--renuvex-pr-badge-text-size` |
| **Layout-local (`.renuvex-pr-summary`)** | default summary rule in `summary-layouts/classic/styles.js`; other summary layouts override in their own `styles.js` files | Inside `.renuvex-pr-summary` block only | `--renuvex-pr-col-label`, `--renuvex-pr-col-count`, `--renuvex-pr-col-gap`, `--renuvex-pr-summary-max` |

Custom properties **inherit across the Shadow DOM boundary** (ADR_0021). That is why a token set on `document.documentElement` is readable inside `#renuvex-reviews-widget`'s shadow root, and why the badge tokens declared in head via a class selector (`.renuvex-pr-rating-badge { --renuvex-pr-badge-icon-size: ... }`) work for badges that sit in light DOM. Style RULES do not cross the boundary; tokens DO.

## Variables by category

The naming convention is `--renuvex-pr-<area>-<purpose>`. Areas group like this:

### Star color (the single global token)
| Variable | Default | Set by | Read by |
|---|---|---|---|
| `--renuvex-pr-review-star-color` | `#f59e0b` (fallback) | `listing-badges/index.js setProperty` (merchant settings → DOM) | All star renderers (`.renuvex-pr-star-full / -empty / -half-bg / -half-fg`), badges, review surfaces |

ADR_0016: star color is the one global rating visual; both badge and review surfaces read this single source. Set globally so badges (light DOM) and review surfaces (shadow) both see the same color.

### Spacing / gap tokens (widget-root scope)
| Variable | Default | Purpose |
|---|---|---|
| `--renuvex-pr-gap-tight` | 4px | Same-owner meta (title↔author) |
| `--renuvex-pr-gap-normal` | 8px | Type change in a block (stars↔title) |
| `--renuvex-pr-gap-loose` | 16px | Independent blocks (body↔reply) |
| `--renuvex-pr-gap-section` | 24px | Major section boundaries |
| `--renuvex-pr-pad-summary-mobile` | 16px | Mobile summary padding |
| `--renuvex-pr-pad-review-mobile` | 16px | Mobile review padding |

Defined in the widget-root rule inside `CLASSIC_CSS`. Tokens enforce a finite spacing vocabulary; see the long comment block at the top of `reviews-section/styles.js` for the contract.

### Sizing tokens (widget-root scope, set by `applyVars`)
Set on the widget root in `render.js applyVars` based on merchant size choice (small / medium / large) via `SIZE_PRESETS`. Each layout (hero/compact/minimal/split) can override via `applyLayoutSizeOverrides`.

| Variable | Used in |
|---|---|
| `--renuvex-pr-title-size` | Widget title |
| `--renuvex-pr-review-text-size` | Review body |
| `--renuvex-pr-review-title-size` | Review item title |
| `--renuvex-pr-author-size` | Author name |
| `--renuvex-pr-reply-name-size` | Merchant reply name |
| `--renuvex-pr-reply-text-size` | Merchant reply text |
| `--renuvex-pr-radius` / `--renuvex-pr-radius-sm` | Corner radius (small = radius-4) |
| `--renuvex-pr-photo-title-size` | Photo lightbox title |
| `--renuvex-pr-avg-rating-size` | Summary avg rating number |
| `--renuvex-pr-review-count-size` | Summary review count |
| `--renuvex-pr-compact-count-size` | Compact layout count |
| `--renuvex-pr-recommend-size` | Recommend badge |
| `--renuvex-pr-btn-text-size` | Write-review button text |
| `--renuvex-pr-load-more-size` | Load more button text |
| `--renuvex-pr-bar-count-size` | Bar chart count text |
| `--renuvex-pr-bar-label-size` | Bar chart label text |
| `--renuvex-pr-review-date-size` | Review item date |
| `--renuvex-pr-read-more-size` | "Read more" button |
| `--renuvex-pr-filter-text-size` | Filter dropdown text |
| `--renuvex-pr-photo-title-size` | Photo strip title |

### Color tokens (widget-root scope, set by `applyVars`)
Per-element color variables. Each maps to a specific UI element so a merchant can recolor one piece without affecting siblings. Defaults fall back to fixed hex (`#111111` / `#555555` / `#e5e7eb` etc).

| Variable | Purpose |
|---|---|
| `--renuvex-pr-header-title` | Widget title color |
| `--renuvex-pr-header-avg` | Summary average rating color |
| `--renuvex-pr-header-count` | Summary count color |
| `--renuvex-pr-header-recommend` | Recommend label color |
| `--renuvex-pr-text` | Generic body text |
| `--renuvex-pr-widget-bg` / `--renuvex-pr-widget-border` | Widget container shell |
| `--renuvex-pr-bar-fill` / `--renuvex-pr-bar-track` / `--renuvex-pr-bar-count` / `--renuvex-pr-bar-hover-bg` | Bar chart (summary) |
| `--renuvex-pr-btn-bg` / `--renuvex-pr-btn-border` / `--renuvex-pr-btn-text` | Write-review button |
| `--renuvex-pr-load-more-bg` / `--renuvex-pr-load-more-border` / `--renuvex-pr-load-more-text` | Load more button |
| `--renuvex-pr-filter-btn-bg` / `--renuvex-pr-filter-btn-border` / `--renuvex-pr-filter-btn-text` | Filter trigger |
| `--renuvex-pr-filter-menu-bg` / `--renuvex-pr-filter-menu-border` | Filter dropdown |
| `--renuvex-pr-filter-item-text` / `--renuvex-pr-filter-item-hover-bg` / `--renuvex-pr-filter-item-active` / `--renuvex-pr-filter-focus-ring` | Filter dropdown items |
| `--renuvex-pr-review-author` / `--renuvex-pr-review-body` / `--renuvex-pr-review-title` / `--renuvex-pr-review-date` / `--renuvex-pr-review-border` | Review item parts |
| `--renuvex-pr-reply-label` / `--renuvex-pr-reply-text` / `--renuvex-pr-reply-bg-color` / `--renuvex-pr-reply-border` | Merchant reply block |
| `--renuvex-pr-photo-arrow-bg` / `--renuvex-pr-photo-arrow-border` / `--renuvex-pr-photo-arrow-text` / `--renuvex-pr-photo-image-border` / `--renuvex-pr-photo-title` | Photo lightbox |
| `--renuvex-pr-bg` / `--renuvex-pr-border` | Legacy generic background / border |

### Photo / image sizing
| Variable | Purpose |
|---|---|
| `--renuvex-pr-photo-thumb-aspect` | Photo strip thumbnail aspect ratio |
| `--renuvex-pr-card-photo-w` | Card layout photo width |
| `--renuvex-pr-list-photo-w` / `--renuvex-pr-list-photo-w-mobile` | List layout photo width (desktop + mobile) |
| `--renuvex-pr-gallery-photo-w` / `--renuvex-pr-gallery-photo-w-mobile` | Gallery layout photo width (desktop + mobile) |
| `--renuvex-pr-thumbnail-size` | Generic thumbnail size |
| `--renuvex-pr-star-size` / `--renuvex-pr-avg-star-size` | Star icon sizes inside summary/header |

### Layout-local (`.renuvex-pr-summary` only)
The default/classic declarations live in `summary-layouts/classic/styles.js` and are loaded through `getLayoutsCSS()` before other summary layout overrides. Shared summary child components such as bar rows and action rows remain in `reviews-section/styles.js` to preserve cascade order.

| Variable | Default | Purpose |
|---|---|---|
| `--renuvex-pr-col-label` | 104px | Bar chart label column width |
| `--renuvex-pr-col-count` | 60px | Bar chart count column width |
| `--renuvex-pr-col-gap` | 4px | Inter-column gap |
| `--renuvex-pr-summary-max` | 340px | Summary block max-width |

### Layout-specific (per summary layout)
| Variable | Defined in | Purpose |
|---|---|---|
| `--renuvex-pr-hero-avg-size` | `summary-layouts/hero/styles.js` | Hero layout big-number size |
| `--renuvex-pr-minimal-avg-size` | `summary-layouts/minimal/styles.js` | Minimal layout avg size |
| `--renuvex-pr-compact-star-size` | `summary-layouts/compact/styles.js` | Compact layout star size |

### Form wizard (review submission UI)
All defined in `reviews-section/review-form-modal/styles.js`. Live inside the wizard's own Shadow DOM root (ADR_0021).

| Variable | Purpose |
|---|---|
| `--renuvex-pr-fwizard-bg` / `--renuvex-pr-fwizard-text` / `--renuvex-pr-fwizard-secondary-text` | Wizard chrome colors |
| `--renuvex-pr-fwizard-input-bg` / `--renuvex-pr-fwizard-input-border` / `--renuvex-pr-fwizard-input-text` / `--renuvex-pr-fwizard-placeholder` | Form inputs |
| `--renuvex-pr-fwizard-btn-bg` / `--renuvex-pr-fwizard-btn-border` / `--renuvex-pr-fwizard-btn-text` | Action buttons |
| `--renuvex-pr-fwizard-btn-disabled-bg` / `--renuvex-pr-fwizard-btn-disabled-text` | Disabled action state |
| `--renuvex-pr-fwizard-nav-hover-bg` / `--renuvex-pr-fwizard-close-text` / `--renuvex-pr-fwizard-close-hover-bg` | Navigation / close button |
| `--renuvex-pr-fwizard-progress-bg` / `--renuvex-pr-fwizard-progress-active` | Progress bar |

### Component-scope badge tokens
Defined inline on `.renuvex-pr-rating-badge` rule inside `PARTIAL_STARS_CSS` (defaults) AND on `<style id="renuvex-pr-badge-tokens">` in head (merchant overrides via `ensureBadgeTokens`). The component-scope selector means these tokens are only visible to elements that match `.renuvex-pr-rating-badge`, not the `:root` namespace.

| Variable | Default | Purpose |
|---|---|---|
| `--renuvex-pr-badge-icon-size` | 16px (medium) | Badge star size (PDP + listing) |
| `--renuvex-pr-badge-text-size` | 14px (medium) | Badge text size (PDP + listing) |

Mobile override is appended via `@media (max-width:640px)` when merchant enables `badge.mobileOverride`; see `ensureBadgeTokens` in `core/badge.js`.

## Data flow

```
Merchant settings (DB)
  ↓ /api/public/settings
Widget runtime (settings.js)
  ↓ applyRuntimeSettings
  ├─ setThemeAdapterKey (ADR_0022)
  ├─ setAutoPlacementEnabled (ADR_0022)
  └─ setReviewsMountEnabled (ADR_0022)
  ↓ bootstrap.js → render.js
  ├─ render(): root.style.setProperty('--renuvex-pr-title-size', ...) — widget-root scope
  ├─ listing-badges/index.js: documentElement.setProperty('--renuvex-pr-review-star-color') — global
  └─ rating-badge.js → core/badge.js ensureBadgeTokens(): <style id="renuvex-pr-badge-tokens"> — component scope
```

## How to add a new variable

1. **Pick the right scope.**
   - Used by both badges (light DOM) AND review section (shadow DOM)? → Either global (`document.documentElement`) OR a single shared declaration in a CSS class selector that BOTH surfaces match (which is what the badge token approach does).
   - Used only inside the review section? → Widget-root scope (declare default in `#renuvex-reviews-widget` rule inside `CLASSIC_CSS`).
   - Used only inside a specific summary/review layout? → Layout-local scope (declare on the layout's own root element rule).
   - Used only inside the form wizard? → Inside `FWIZARD_CSS` (lives in the wizard shadow root).

2. **Declare a sensible default** in the same rule, NOT in `:root`.
   - Pattern: `.renuvex-pr-summary { --renuvex-pr-col-label: 104px; }` in the owning layout stylesheet, not `:root{--renuvex-pr-col-label: 104px;}`.
   - Component-scope declarations isolate the token; `:root` declarations bleed into the entire host page namespace and risk collision (the badge tokens use a class selector specifically for this reason).

3. **Consume via `var(--renuvex-pr-<name>, <fallback>)`** in every reader.
   - The fallback is the safety net for when the merchant config or the override layer hasn't loaded yet (cold start, settings 404, preview mode).
   - Use the SAME fallback in every reader; otherwise the visual breaks asymmetrically when the variable is undefined.

4. **Update merchant-facing override path** (if user-configurable):
   - For sizing: extend `SIZE_PRESETS` in `render.js` + `applyVars` + admin schema.
   - For color: extend the admin color picker schema + map to the new variable in `applyVars`.
   - For badge tokens: extend `SIZE_MAP` in `core/badge.js` + admin schema.

5. **Document here.** Add a row to the relevant table above so the next agent has a single source of truth.

## Known anti-patterns to avoid

- **Do NOT declare new variables on `:root` / `document.documentElement`** unless they are genuinely cross-tree (badge + review). The `--renuvex-pr-review-star-color` is the only legitimate global today. Declaring on `:root` makes the variable visible to the merchant's entire page CSS, which we cannot constrain.
- **Do NOT inline `style="--renuvex-pr-foo:..."`** on rendered elements when a class-scoped declaration is possible. Inline styles cannot be overridden by stylesheets and break the component-scope contract.
- **Do NOT skip the fallback in `var(...)`.** A missing token in shadow DOM resolves to the empty string, which can compute to `0` for sizing properties and visually break the surface.
- **Do NOT use `--renuvex-pr-xxx` literally.** That string is a doc placeholder used in `render.js applyLayoutSizeOverrides` comments to describe the override contract; it is not a real variable.

## Notes

- ADR_0021 (Shadow DOM isolation) explicitly relies on CSS custom property inheritance crossing the shadow boundary. If a future ADR proposes a different isolation strategy (closed shadow, iframe, etc.), this contract has to be re-evaluated per surface.
- The badge tokens are the only component-scope tokens that are also live-overridden from JS (`ensureBadgeTokens`). All other tokens are either CSS-declared defaults or `render.js`-applied per-render.
- Variable count today: ~90. Adding more is cheap; removing existing ones requires a grep across `src/widget/` to make sure no consumer reads them with a fallback the new code did not set.

## Related Source Files
- [src/widget/reviews-section/styles.js](src/widget/reviews-section/styles.js) — `CLASSIC_CSS`, spacing token doc block, widget-root declarations, and shared summary/review CSS
- [src/widget/summary-layouts/classic/styles.js](src/widget/summary-layouts/classic/styles.js) — classic/default summary root variables and avg/count/recommend styles
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) — `applyVars` / `applyLayoutSizeOverrides`
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — `PARTIAL_STARS_CSS` + badge token defaults
- [src/widget/core/badge.js](src/widget/core/badge.js) — `ensureBadgeTokens` runtime override
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js) — `--renuvex-pr-review-star-color` global setter
- [src/widget/summary-layouts/](src/widget/summary-layouts/) — per-layout local variables
- [src/widget/review-layouts/](src/widget/review-layouts/) — review layout sizing
- [src/widget/reviews-section/review-form-modal/styles.js](src/widget/reviews-section/review-form-modal/styles.js) — wizard tokens (FWIZARD_CSS)

## Obsidian Links
- [[Index]]
- [[System_Architecture]]
- [[Theme_Adapter_Playbook]]
- [[Widget_Architecture]]
- [[ADR_0016_Rating_Visual_System]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]
