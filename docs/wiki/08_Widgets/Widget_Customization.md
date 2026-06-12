---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-12
last_verified: 2026-06-12
confidence: high
source_files:
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/components/home-page/widgets/editor/WidgetEditor.tsx"
  - "src/components/home-page/widgets/editor/WidgetPreviewLoadState.ts"
  - "src/components/home-page/widgets/editor/SettingsPanel.tsx"
  - "src/lib/widget-settings.ts"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/review-form-modal/copy.js"
  - "src/widget/reviews-section/review-form-modal/styles.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-rating.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-content.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-author.js"
tags:
  - widget
  - customization
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[Frontend_Map]]"
---

# Widget Customization

## Summary
Per-merchant widget settings, schema-driven from a single source of truth in [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts). The same schema drives admin UI, server validation, and runtime widget rendering. Live preview via iframe + postMessage.

## Source of truth
- **Schema**: [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)
- **Server helpers** (defaults, sanitize, validate): [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- **Admin color picker**: [src/components/home-page/widgets/editor/ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx)
- **Visual select cards**: [src/components/home-page/widgets/editor/VisualSelectGrid.tsx](src/components/home-page/widgets/editor/VisualSelectGrid.tsx)
- **Icon registries**: [src/widget/icons/index.js](src/widget/icons/index.js)
- **Design tokens**: [src/lib/design-tokens.ts](src/lib/design-tokens.ts)

## Field types
- `toggle` - boolean
- `text` - string with optional placeholder
- `color` - admin picker emits opaque hex `#rrggbb`. The backend/runtime still accept `#rrggbbaa` for schema defaults, legacy saved settings, and runtime-only translucent design tokens.
- `select` - radio-card UI; static or dynamic options (function of current settings). Options can declare a `preview` key for image-like visual choice cards in the admin panel; saved values stay plain strings.
- `dropdown` - native `<select>` (compact)
- `range` - numeric range slider
- `iconSelect` - SVG grid popover

## Conditional visibility (`showWhen`)
Three forms:
1. `{ key: 'foo', equals: 'bar' }`
2. `{ key: 'foo', notIn: ['x', 'y'] }`
3. `{ layoutKey: 'summaryLayout', supports: 'title' }` ← **layout-aware**, preferred when applicable

The third reads `meta.supports.<key>` from the active layout's registry entry. Adding a new layout means adding `supports` keys for everything — otherwise admin shows fields the layout silently ignores.

## Admin settings navigation
The admin customization panel uses top-level navigation plus focused detail panels in [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx):
- The main panel lists top-level setting groups as navigation rows.
- Selecting a group opens a dedicated detail panel with a sticky back header.
- Detail panels can render schema `subGroups` as inner accordions after the group's direct fields. `Metin` uses this for `Yorum Formu`, which owns review wizard step copy without adding another main navigation row.
- `Renkler` is a dedicated color panel; tapping it shows every color group (Buton, Filtre, Yorum, Mağaza Yanıtı, Form, Daha Fazla Göster Butonu, Sayfalama, …) directly as accordions, with no further nesting. The `Daha Fazla Göster Butonu` and `Sayfalama` (numbered) color groups are mutually gated by `paginationMode` via field-level `showWhen`, so only the active list-pagination mode's colors appear. Each group exposes its own per-field colors — there is no shared `Marka Kimliği` cascade or basic/advanced split.
- `Widget Boyutu` remains the only size control for storefront review typography and shared controls. It now also scales the physical load-more and numbered-pagination controls through internal CSS variables; no separate "pagination size" setting is exposed.

This keeps the main customization screen shallow and avoids opening large groups inline.

## Read path (client / admin / widget)
```
DB row.settings:Json
  └→ sanitizeSettings(widgetId, settings)   // strip unknown keys
  └→ getWidgetDefaults(widgetId) ⊕ savedSettings   // merge with defaults
  └→ rendered widget (admin preview or storefront widget.js)
```
This pattern lives in BOTH:
- `/api/admin/settings` (admin UI consumption)
- `/api/public/settings` (widget consumption)

The admin editor treats a missing widget row as "use defaults" only after a
successful `/api/admin/settings` response. While settings are loading it shows an
editor skeleton; if the settings request fails or returns a malformed payload,
the customization editor stays closed behind an error/retry state so default
drafts cannot be saved over the real DB row.

## Write path (admin)
```
admin UI changes a field
  └→ debounced/on-blur PUT /api/admin/settings { widgetId, settings }
  └→ validateSettings(widgetId, settings)   // type/range/profile check
  └→ sanitizeSettings(widgetId, settings)   // strip unknown
  └→ prisma.widgetSettings.upsert({ storeId, widgetId, settings })
```

## Live preview
- Admin renders an iframe pointing at `/preview` (route at [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)).
- On any setting change -> `postMessage({ type: 'RENUVEX_PR_SETTINGS_UPDATE', settings })` to iframe.
- Inside iframe, [src/widget/index.js](src/widget/index.js) (preview branch) merges and re-renders, then emits `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW` with merged settings in `event.detail.settings` for open overlay surfaces.
- Iframe acks via `RENUVEX_PR_WIDGET_READY` once mounted.
- Preview background color is local editor state in [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx). It changes only the admin preview surface and is not saved to `WidgetSettings`.
- Preview background uses the same opaque admin color picker as widget colors. Transparent/alpha values are intentionally not user-selectable in the admin UI.
- Desktop preview fills the available preview panel width and height without a device-frame shadow, so it behaves like a browser viewport; mobile and tablet keep fixed device widths.

This pattern means the preview is **pixel-identical** to production — same `widget.js` runs in both contexts.

Preview iframe loading is independent from settings loading. A blank or slow
preview iframe does not by itself mean widget settings are still loading; the
settings editor is gated separately by the admin settings fetch status. The
`reviews` iframe preview uses its own `loading` / `slow` / `ready` / `error`
state so slow widget assets show an overlay instead of a blank white panel.
Preview retry remounts only the iframe preview; it does not change the settings
draft, dirty state, or save behavior.

The `/preview` route still cache-busts `widget.js` on each preview HTML response
with its timestamp query. That freshness behavior is intentionally separate from
the preview loading overlay and should not be changed without a dedicated cache
contract review.

## Removing / changing fields
- **Removing a field**: just delete from `widgetDefs.ts`. `sanitizeSettings` filters unknown keys at read time, so old DB rows still work.
- **Renaming a field**: harder — write a one-time migration to copy `oldKey` → `newKey` in JSON, or add a back-compat shim in `sanitizeSettings`.
- **Changing a field's `default`**: only affects rows that don't have the key. Existing rows keep their saved value.
- **Changing a field's `type`**: dangerous — old saved values may not match the new type; consider migration.
- **Removed field**: `reviewFormStyle` was removed when the legacy inline/page review form was deleted. Admin no longer exposes a form-style switch; saved JSON rows are cleaned by migration and unknown keys are stripped by `sanitizeSettings`.

## Notes
- The schema is the contract between admin, server, and widget. Keep it in one place.
- Don't bypass `validateSettings` on the server — bad data on a public endpoint is the cost.
- When you add a setting, decide which layouts support it (`showWhen.layoutKey`).
- Nested setting groups are still flat saved keys. Use `collectSettingFields(...)` when code needs defaults, sanitization, validation, reset, or visible-field traversal so top-level and nested fields stay in one contract.
- Color settings churn has been frequent (visible in migrations). Prefer soft-removing keys via `sanitizeSettings` over a DB migration.
- The storefront widget container background is intentionally transparent. Store themes own the page background; admin preview background is only a testing surface.
- In the review form wizard, `formPrimaryTextColor` owns text. The close (X) control is automatic: runtime derives its icon color and hover background from `formBgColor` for readable contrast, without adding another admin color field.
- Review form wizard step headings and the photo step subtitle are merchant-editable under `Metin > Yorum Formu`. Storefront rendering goes through `review-form-modal/copy.js`, trims whitespace via `settingText(...)`, falls back to schema defaults for blank values, assigns text with `textContent` so markup-like copy remains literal text, and wraps long unbroken words inside the modal safe area. Those fallback strings live in `copy.js` as `REVIEW_FORM_COPY_DEFAULTS`, mirroring the `widgetDefs.ts` schema defaults (the widget bundle cannot import the admin schema) — update both places when changing the copy.
- Alpha hex values are still valid internally for defaults such as translucent modal controls and borders, but merchants choose opaque colors in the admin picker. If a merchant changes one of those fields manually, the saved value becomes `#rrggbb`; resetting restores the schema default, including alpha where defined.
- `iconSelect` fields resolve their options from [src/widget/icons/index.js](src/widget/icons/index.js). Review/rating icons and filter icons are separate registries; [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) marks each icon field with `registry: 'review' | 'filter'` so a filter value never falls back to a review icon. Current filter options are `lines`, `funnel`, `controls`, and `sliders`; legacy filter value `star` maps to `funnel` in both runtime rendering and settings sanitization.

## Related Source Files
- [src/components/home-page/widgets/](src/components/home-page/widgets/)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [src/app/api/admin/settings/route.ts](src/app/api/admin/settings/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/components/home-page/widgets/editor/InfoTooltip.tsx](src/components/home-page/widgets/editor/InfoTooltip.tsx)

## Obsidian Links
- [[Widget_Architecture]]
- [[Frontend_Map]]
- [[Storefront_Widget_Overview]]
- [[Database_Schema]]

## Change Log
- 2026-06-12: `Widget Boyutu` now scales the physical load-more and numbered-pagination controls in addition to typography. No new admin field was added; the behavior is driven by internal widget CSS variables.
- 2026-06-12: Admin widget settings loading moved from a boolean gate to a tri-state gate. The editor only mounts after a successful settings response; hard settings-fetch errors show an error/retry state with no settings panel, preview iframe, or save button.
- 2026-06-12: The `reviews` iframe preview gained a separate loading/slow/error overlay with retry. Preview status is independent from settings load status and does not block save.
- 2026-06-09: `Sayfalama` color group gained explicit active-page colors — `paginationActiveBgColor` (fill, default `#111111`) and `paginationActiveTextColor` (number, default `#ffffff`) — decoupled from the passive `paginationTextColor`. Every pagination color is an explicit field.
- 2026-06-09: Added the `paginationMode` design select (Tasarım: `loadMore` | `numbered`) and a `Sayfalama` color group. The load-more and pagination color groups are `showWhen`-gated on `paginationMode`, so only the active mode's colors show in `Renkler`. Schema-driven end-to-end — `widget-settings.ts` (defaults/sanitize/validate) and `SettingsPanel` auto-pick the new fields with no code change. See [[Product_Review_Widget]].
- 2026-06-06: Added nested `Metin > Yorum Formu` copy settings for review wizard step headings and photo subtitle. Settings traversal is recursive via `collectSettingFields(...)`; storefront copy renders as safe text with whitespace fallback and long-word wrapping.
- 2026-06-01: Review form wizard close (X) color was decoupled from `formPrimaryTextColor`; runtime derives close icon and hover colors from `formBgColor` with deterministic contrast helpers in `theme-vars.js`.
- 2026-05-14: **Filter Icon Registry Clarified**: Replaced the filter `star` option with `funnel`, kept `star -> funnel` only as a filter-only legacy alias, and separated admin preview rendering by review vs filter registry.
- 2026-05-12: **Icon Registries Simplified**: Filter icons reduced to 4 core choices; Review icons modernized with unified Phosphor weight. Existing legacy keys fall back safely via registry.
- 2026-05-25: **Renuvex Namespace Cleanup**: Preview protocol is now canonical-only: `RENUVEX_PR_SETTINGS_UPDATE`, `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW`, and `RENUVEX_PR_WIDGET_READY`.
- 2026-05-12: **Live Preview for Overlays**: Introduced the preview settings-updated event payload so active overlays (like the lightbox or review modal) can live-sync admin changes without re-mounting.
- 2026-05-08: **Visual Select Cards**: Added `preview` metadata to `select` fields in schema to drive image-based visual choice cards in admin panel.
- 2026-05-05/06: **Color & Token Refactor**: Removed `reviewFormStyle`, `Marka Kimliği` cascade, and all legacy CSS variables (`--ikr-bg`, etc). Admin color picker now emits strict opaque `#rrggbb`, while structural translucency is hardcoded in frontend styles.
- 2026-05-07: **Constraints**: Added `maxLength` to text fields (e.g., `writeButtonText` max 30) for frontend and backend validation.
- *(Note: Granular bug fixes for the review form modal—such as toast system, clip-paths, and validation tweaks—have been archived or moved to the bug tracker to keep this document focused on widget customization architecture).*
