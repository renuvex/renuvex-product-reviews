---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-07
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
- **Design tokens**: [src/lib/design-tokens.ts](src/lib/design-tokens.ts)

## Field types
- `toggle` - boolean
- `text` - string with optional placeholder
- `color` - admin picker emits opaque hex `#rrggbb`. The backend/runtime still accept `#rrggbbaa` for schema defaults, legacy saved settings, and runtime-only translucent design tokens.
- `select` - radio-card UI; static or dynamic options (function of current settings)
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
The admin customization panel uses a two-level navigation model in [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx):
- The main panel lists top-level setting groups as navigation rows.
- Selecting a group opens a dedicated detail panel with a sticky back header.
- `Renkler` is a dedicated color panel; tapping it shows every color group (Buton, Filtre, Yorum, Mağaza Yanıtı, Form, …) directly as accordions, with no further nesting. Each group exposes its own per-field colors — there is no shared `Marka Kimliği` cascade or basic/advanced split.

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
- On any setting change → `postMessage({ type: 'IKR_SETTINGS_UPDATE', settings })` to iframe.
- Inside iframe, [src/widget/index.js](src/widget/index.js) (preview branch) merges and re-renders.
- Iframe acks via `IKR_WIDGET_READY` once mounted.
- Preview background color is local editor state in [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx). It changes only the admin preview surface and is not saved to `WidgetSettings`.
- Preview background uses the same opaque admin color picker as widget colors. Transparent/alpha values are intentionally not user-selectable in the admin UI.
- Desktop preview fills the available preview panel width and height without a device-frame shadow, so it behaves like a browser viewport; mobile and tablet keep fixed device widths.

This pattern means the preview is **pixel-identical** to production — same `widget.js` runs in both contexts.

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
- Color settings churn has been frequent (visible in migrations). Prefer soft-removing keys via `sanitizeSettings` over a DB migration.
- The storefront widget container background is intentionally transparent. Store themes own the page background; admin preview background is only a testing surface.
- Alpha hex values are still valid internally for defaults such as translucent modal controls and borders, but merchants choose opaque colors in the admin picker. If a merchant changes one of those fields manually, the saved value becomes `#rrggbb`; resetting restores the schema default, including alpha where defined.

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
- 2026-05-05: Removed the `reviewFormStyle` setting and made storefront review submission modal-only. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [write-action.js](src/widget/summary-layouts/shared/write-action.js).
- 2026-05-05: Changed the admin color picker to emit opaque `#rrggbb` values only while preserving backend/runtime support for alpha defaults and legacy `#rrggbbaa` settings. Related source: [ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx), [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx).
- 2026-05-05: Removed storefront widget container background/border color controls from the settings schema and documented the local-only admin preview background. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx), [ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx), [render.js](src/widget/product-widget/render.js).
- 2026-05-06: Dropped six alpha-default color settings (`photoImageBorderColor`, `photoArrowBorderColor`, `modalCloseBgColor`, `modalCloseBorderColor`, `modalNavBgColor`, `modalNavBorderColor`) from the schema and hardcoded them as structural translucency tokens in render.js. Switched `loadMoreBgColor` default from `#ffffff00` to opaque `#ffffff` so the merchant-facing picker stays consistent with its opaque-only emit. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js).
- 2026-05-06: Removed the `Marka Kimliği` color group, the `colorTier` field on `SettingsGroup`, and the `colorMappings.ts` cascade helper. The five basic keys (`basicBrandColor`, `basicTextColor`, `basicStarColor`, `basicStarEmptyColor`, `basicBarTrackColor`) were dropped from the schema; they used to silently broadcast onto 12-16 advanced fields and overwrite manual edits. The `Gelişmiş Renkler` accordion wrapper is gone too — the `Renkler` panel now lists every color group directly. Existing DB rows keep no functional residue: `sanitizeSettings` already strips unknown keys at every read; physical JSON payloads will be cleaned up the next time admin saves a setting. No data migration written. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx).
- 2026-05-06: Decoupled the review form modal from the `Butonlar` color group. The form wizard's CTA buttons and Geri/İleri navigation links no longer pull from `btnBgColor`/`btnTextColor`/`btnBorderColor` (which now control only the storefront "Yorum Yaz" button). Added four new keys to the `Yorum Formu` group: `formCtaBgColor`, `formCtaTextColor`, `formCtaBorderColor`, `formNavTextColor`. Defaults match the previous cascade so visual output stays identical for existing merchants. Hover bg for nav links is a hardcoded `hexToRgba(formNavTextColor, 0.06)` derivative. `formStepBarColor` fallback also detached from `btnBg` — now `#111111`. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js).
- 2026-05-06: Updated `formSecondaryTextColor` default from `#6b7280` to `#3b3b3b` for better contrast. Close button (X) in form wizard now uses `formPrimaryTextColor` instead of `formSecondaryTextColor` to ensure visibility on dark backgrounds. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/product-widget/review-form-modal/styles.js).
- 2026-05-07: Created reusable `InfoTooltip` component with `createPortal` rendering to avoid clipping inside accordion containers. Tooltips are rendered at `document.body` level with `position: fixed` and `z-index: 99999`. Related source: [InfoTooltip.tsx](src/components/home-page/widgets/editor/InfoTooltip.tsx).
- 2026-05-07: Added `InfoTooltip` to the `Köşe Ovalliği` range field explaining that it controls all card, button, and image corner radius across the widget. Related source: [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx), [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx).
- 2026-05-07: Connected wizard modal `border-radius` to the global `--ikr-radius` CSS variable. Modal shell uses `--ikr-radius`; buttons, inputs, and thumbnails use `--ikr-radius-sm`. Mobile fullscreen mode retains `border-radius: 0` intentionally. Related source: [styles.js](src/widget/product-widget/review-form-modal/styles.js), [render.js](src/widget/product-widget/render.js).
- 2026-05-07: Fixed compact layout popover background to solid `#ffffff` (was using `--ikr-widget-bg` which rendered transparent after legacy token cleanup). Panel content now remains readable regardless of store theme background. Related source: [styles.js](src/widget/summary-layouts/compact/styles.js).
- 2026-05-07: Unified form button colors into a single group. Renamed `formCtaBgColor`/`formCtaTextColor`/`formCtaBorderColor` to `formBtnBgColor`/`formBtnTextColor`/`formBtnBorderColor`. Removed `formNavTextColor`; nav buttons now use `formBtnBgColor` for text and derive hover bg from `hexToRgba(formBtnBg, 0.06)`. Disabled button states now derive from `hexToRgba(formBtnBg, 0.18)` and `hexToRgba(formBtnText, 0.85)` instead of fixed rgba values. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/product-widget/review-form-modal/styles.js).
- 2026-05-07: Removed `inputBgColor` from the `Yorum Formu` color group. Input and textarea backgrounds now automatically derive from `formBgColor` (`--ikr-fwizard-bg`). This reduces the color group from 12 to 10 fields and ensures input backgrounds stay consistent with the modal background. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/product-widget/review-form-modal/styles.js).
- 2026-05-07: Reordered fields within the `Yorum Formu` color group: buttons (bg/text/border) now appear before input fields (text/border/placeholder). This places the more frequently adjusted CTA colors earlier in the accordion. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).
- 2026-05-07: Color fields with `showWhen` rules that evaluate to false now render as disabled (opacity 0.5, `cursor: not-allowed`) with an `AlertCircle` icon and hover tooltip instead of being hidden entirely. Related source: [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx), [ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx).
- 2026-05-06: Removed `primaryColor`/`primaryTextColor` references from the widget bundle (they were not in the admin schema). Admin preview `primaryColor` reference replaced with `replyBorderColor`. Related source: [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/themes/ozy/styles.js), [ReviewsWidgetPreview.tsx](src/components/home-page/widgets/widget-previews/ReviewsWidgetPreview.tsx).
- 2026-05-06: Fully removed legacy CSS variables (`--ikr-bg`, `--ikr-text`, `--ikr-surface`, `--ikr-border`, `--ikr-track-bg`, `--ikr-reply-bg`, `--ikr-text-faint`, `--ikr-color`, `--ikr-color-light`) from both `render.js` and `styles.js`. `styles.js` double-var fallback chains flattened to single-layer hardcoded defaults. `applyWidgetColor` helper in `helpers.js` no longer called. Every UI element now uses its own specific CSS variable with a hardcoded fallback — no cascading generic tokens remain. Related source: [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/themes/ozy/styles.js), [helpers.js](src/widget/core/helpers.js).
- 2026-05-06: Split `formTextColor` into `formPrimaryTextColor` and `formSecondaryTextColor` in the `Yorum Formu` color group. Primary controls titles and input text; secondary controls subtitles, labels, notice text, and close button. Defaults are `#111111` (primary) and `#3b3b3b` (secondary) — the old alpha-derived `formMuted` (`hexToRgba(formText, 0.72)`) is removed. Placeholder and input border use their own independent opaque defaults instead of alpha derivatives from `formText`. Close button color was later moved to `formPrimaryTextColor` for visibility on dark backgrounds. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/product-widget/review-form-modal/styles.js).
- 2026-05-06: Removed the `Fotoğraf Önizleme` color accordion from the admin schema. Modal colors (background, close button, nav arrows) are now hardcoded in `styles.js` with standard gallery defaults (`#ffffff` bg, `#ffffff` icons on semi-transparent black buttons). This reduces admin panel complexity without sacrificing UX — photo gallery modals are universally expected to have a neutral shell. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/themes/ozy/styles.js).
- 2026-05-07: Renamed color group titles for clarity: `Başlık ve Özet` → `Widget Başlığı`, `Puan Dağılımı` → `Yorum Özeti`. No settings keys changed — purely UI label updates. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).
- 2026-05-07: Fixed regression introduced in `c1fdab6` — five review card color variables (`reviewTitleColor`, `reviewAuthorColor`, `reviewDateColor`, `reviewBodyColor`, `reviewBorderColor`) were accidentally deleted from `applyManualTheme` while moving `reviewStarColor` earlier in the function. Their absence caused a JS ReferenceError at runtime, crashing the `applyManualTheme` call and leaving the iframe preview blank. Variables restored with original defaults. `public/widget.js` rebuilt. Related source: [render.js](src/widget/product-widget/render.js), [public/widget.js](public/widget.js).
- 2026-05-07: Changed empty star rendering architecture to use `iconPair.empty` (outlined SVG) instead of a low-opacity `iconPair.filled` SVG. Set `--ikr-star-empty-color` to exactly match `reviewStarColor` without opacity modifications. This ensures the empty star borders are 100% opaque and sharp, matching the active star color instead of appearing as a faint/faded filled shape. Related source: [helpers.js](src/widget/core/helpers.js), [render.js](src/widget/product-widget/render.js).
- 2026-05-07: Replaced `starRoundedOutline` and `heartOutline` paths in `icons.js` with the official Material Symbols **Rounded** SVG paths from Google's GitHub repo (`google/material-design-icons → symbols/web/<icon>/materialsymbolsrounded/<icon>_24px.svg`). The previous values were copies of the **Outlined** (sharp-cornered) variant, causing a visual mismatch where the Rounded star/heart icon would render as a smooth filled shape but a sharp-cornered outline when empty. Now the rounded variant uses Q-curve outline paths consistent with its filled counterpart. Related source: [icons.js](src/widget/icons.js).
- 2026-05-07: Refactored `partialStarsHTML` from block-overlay clip technique to per-star individual containers with single-geometry clip-path masking (Material UI Rating decimal mode + react-stars pattern). Fixes three visual bugs: (a) gap-induced misalignment (4.5 rating snapped to ~47% instead of 50% because the 90% width clip swallowed `gap:2px` between stars), (b) outline/filled path-level mismatch potential, (c) `boxSquare`/`favorite` icon outer-bound asymmetry (boxSquare filled outer 720×720 vs outline 560×560 caused asymmetric clips). Half-state now uses two layers of `iconPair.filled` (bg=empty-color, fg=review-star-color with `clip-path: inset(0 50% 0 0)`) — geometry mismatch is physically impossible since both layers share the same SVG path. Full-state empty stars retain `iconPair.empty` (outline architecture preserved). Old `.ikr-stars-partial-empty`/`.ikr-stars-partial-fill` CSS removed; new `.ikr-star`, `.ikr-star-full`, `.ikr-star-empty`, `.ikr-star-half`, `.ikr-star-half-bg`, `.ikr-star-half-fg` classes introduced. The 0.25/0.75 snap rule (4.24→empty, 4.25→half, 4.74→half, 4.75→full) is preserved. Function signature unchanged so all five callsites (badge, rating-badge, hero, compact, minimal) continue to work without modification. Related source: [helpers.js](src/widget/core/helpers.js), [styles.js](src/widget/themes/ozy/styles.js).
- 2026-05-07: Fixed a visual bug in the new clip-path architecture where the half-star appeared as a full star. The background layer (`ikr-star-half-bg`) was incorrectly using `iconPair.filled`, which, when combined with an opaque empty color, rendered a solid shape. Switched the background layer to use `iconPair.empty` to correctly simulate an outlined half-star without bleeding, made possible by the earlier `icons.js` path alignment fix. Related source: [helpers.js](src/widget/core/helpers.js).
- 2026-05-07: Modified the `boxed` (Box Square) icon's `empty` state architecture. Previously, it used an outline variant for the box and the inner star, causing visual noise due to double-stroking. It now uses the `filled` variant with an inline `opacity="0.35"` attribute, matching the industry standard for complex container-based icons. Normal star and heart icons retain the 100% opaque outline architecture as they are simple, single-stroke shapes. Related source: [icons.js](src/widget/icons.js).
- 2026-05-07: Implemented a stroke-based outline for the `favorite` (Heart) icon to fix a visual disjoint in the half-state. The empty state now uses the exact same path as the filled state (`P.heartRounded`) with `fill="none"`, `stroke-width="80"`, and `stroke-miterlimit="2"` (miter join), ensuring perfect geometric synchronization at the 50% clip line and an optical weight matching the star icons. Related source: [icons.js](src/widget/icons.js).
- 2026-05-07: Added "Live Preview Support" for the Wizard Modal. Previously, changing the star icon in the admin panel only updated the main widget; the open modal required a manual close/re-open. Now, `index.js` dispatches a global `IKR_SETTINGS_UPDATED_PREVIEW` event on settings update, which the active `step-rating.js` listens to for an immediate, non-destructive re-render of star icons. Related source: [index.js](src/widget/index.js), [step-rating.js](src/widget/product-widget/review-form-modal/steps/step-rating.js).


