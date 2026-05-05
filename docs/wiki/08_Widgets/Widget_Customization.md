---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
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
- **Color presets**: [src/components/home-page/widgets/colorMappings.ts](src/components/home-page/widgets/colorMappings.ts)
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

## Tier system (basic vs advanced)
`SettingsGroup.colorTier?: 'basic' | 'advanced'` flags color groups for packaging:
- `basic` → Start tier
- `advanced` → Pro tier

The current code shows both tiers; gating logic is reserved for future packaging implementation.

## Admin settings navigation
The admin customization panel uses a two-level navigation model in [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx):
- The main panel lists top-level setting groups as navigation rows.
- Selecting a group opens a dedicated detail panel with a sticky back header.
- `Renkler` remains a dedicated color panel; inside it, color groups can still use nested accordions for basic and advanced color sections.

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

## Obsidian Links
- [[Widget_Architecture]]
- [[Frontend_Map]]
- [[Storefront_Widget_Overview]]
- [[Database_Schema]]

## Change Log
- 2026-05-05: Adjusted desktop admin preview sizing so the iframe fills the available preview viewport without a device-frame shadow instead of using a fixed 1100x600 frame. Related source: [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx).
- 2026-05-05: Changed the admin color picker to emit opaque `#rrggbb` values only while preserving backend/runtime support for alpha defaults and legacy `#rrggbbaa` settings. Related source: [ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx), [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx).
- 2026-05-05: Removed storefront widget container background/border color controls from the settings schema and documented the local-only admin preview background. Related source: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts), [WidgetEditor.tsx](src/components/home-page/widgets/editor/WidgetEditor.tsx), [ColorPickerField.tsx](src/components/home-page/widgets/editor/ColorPickerField.tsx), [render.js](src/widget/product-widget/render.js).
- 2026-05-05: Documented the admin settings navigation model where top-level groups open in detail panels instead of expanding inline. Related source: [SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx).
