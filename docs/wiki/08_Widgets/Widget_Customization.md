---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-02
last_verified: 2026-08-02
confidence: high
source_files:
  - "src/lib/widgets/catalog.ts"
  - "src/app/dashboard/widgets/[widgetId]/page.tsx"
  - "src/app/dashboard/widgets/[widgetId]/loading.tsx"
  - "src/features/widget-management/WidgetSettingsProvider.tsx"
  - "src/features/widget-management/components/WidgetCard.tsx"
  - "src/features/widget-management/components/editor/WidgetEditor.tsx"
  - "src/features/widget-management/components/editor/WidgetPreviewLoadState.ts"
  - "src/features/widget-management/components/editor/SettingsPanel.tsx"
  - "src/features/widget-management/components/editor/WidgetEditorState.ts"
  - "src/lib/widget-settings.ts"
  - "src/lib/widgets/preview-routes.ts"
  - "src/app/(preview)/preview/route.ts"
  - "src/app/(preview)/preview/[widgetId]/[scene]/route.ts"
  - "src/widget/core/namespace.js"
  - "src/widget/preview/scenes.js"
  - "src/widget/preview/document.js"
  - "src/widget/preview/index.js"
  - "src/widget/preview/fixtures.js"
  - "src/widget/reviews-section/render/size-presets.js"
  - "src/widget/reviews-section/render/pagination.js"
  - "src/widget/reviews-section/styles/review-primitives.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/video-playback.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "src/lib/mux-player/review-player-theme.ts"
  - "src/widget/reviews-section/review-form-modal/copy.js"
  - "src/widget/summary-layouts/shared/recommendation.js"
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
  - "[[Open_Questions]]"
  - "[[Roadmap]]"
---

# Widget Customization

## Agent Brief
Use the pure widget catalog for release/configuration capability and settings
schema, then use `widget-settings.ts` for defaults, sanitization, and
validation. Unknown or planned widgets must fail closed before reads, writes,
or editor state. Preview uses production renderers with deterministic fixture
data and is separate from settings persistence.

## Summary
Per-merchant widget settings are schema-driven from the pure catalog in [catalog.ts](src/lib/widgets/catalog.ts). The catalog drives admin capability/editor decisions and server validation without importing React or storefront runtime modules. The sanitized settings JSON drives runtime rendering. Live preview uses iframe + postMessage.

## Source of truth
- **Schema**: [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts)
- **Server helpers** (defaults, sanitize, validate): [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- **Admin color picker**: [src/features/widget-management/components/editor/ColorPickerField.tsx](src/features/widget-management/components/editor/ColorPickerField.tsx)
- **Visual select cards**: [src/features/widget-management/components/editor/VisualSelectGrid.tsx](src/features/widget-management/components/editor/VisualSelectGrid.tsx)
- **Icon registries**: [src/widget/icons/index.js](src/widget/icons/index.js)
- **Design tokens**: [src/lib/design-tokens.ts](src/lib/design-tokens.ts)

## Release, configuration, and enabled state
- `releaseStatus` says whether the product surface is currently shipped (`available`) or visible roadmap inventory (`planned`).
- `configuration.kind` says whether an available widget has a merchant settings/editor contract.
- `enabled` remains an ordinary persisted setting only for the currently configurable Reviews and Badge widgets.
- Reviews and Badge are `available + settings`. Carousel, Popup, Q&A, and Summary are `planned + none` and render as `Yakında` without active/passive or customization controls.
- `configuration:none` does not imply merchant activation. If an available, toggleable zero-configuration widget is needed later, its activation persistence and storefront gate require a separate design.

All admin/public reads and admin writes resolve the same catalog capability.
Unknown, planned, and non-configurable rows fail closed and are never converted
to empty settings. Existing DB rows are retained for rollback/forward
compatibility but are excluded from responses.

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
The admin customization panel uses top-level navigation plus focused detail panels in [SettingsPanel.tsx](src/features/widget-management/components/editor/SettingsPanel.tsx):
- The main panel lists top-level setting groups as navigation rows.
- Selecting a group opens a dedicated detail panel with a sticky back header.
- Detail panels can render schema `subGroups` as inner accordions after the group's direct fields. `Metin` uses this for `Yorum Formu`, which owns review wizard step copy without adding another main navigation row.
- `Renkler` is a dedicated color panel; tapping it shows every color group (Buton, Filtre, Yorum, Mağaza Yanıtı, Form, Daha Fazla Göster Butonu, Sayfalama, …) directly as accordions, with no further nesting. The `Daha Fazla Göster Butonu` and `Sayfalama` (numbered) color groups are mutually gated by `paginationMode` via field-level `showWhen`, so only the active list-pagination mode's colors appear. Each group exposes its own per-field colors — there is no shared `Marka Kimliği` cascade or basic/advanced split.
- `Video Oynatıcı` is a storefront review-lightbox-only color group. It exposes three explicit colors: play icon, progress color, and progress track color. The center play button background and hover background are intentionally transparent and not merchant-editable. The saved keys use the `reviewLightboxVideo*` prefix so the admin moderation player and future story/carousel video players remain isolated instead of inheriting this surface accidentally.
- `Widget Boyutu` remains the only size control for storefront review typography and shared controls. It also scales load-more and numbered-pagination controls through internal CSS variables; no separate "pagination size" setting is exposed. Mobile pagination uses the visible compact box as the clickable target, so small/medium/large stay visually distinct without an invisible tap halo around dense page numbers.

This keeps the main customization screen shallow and avoids opening large groups inline.

The catalog and editor are separate routes. The server component at
`/dashboard/widgets/[widgetId]` validates the route ID against the pure catalog:
unknown IDs become `404`, while planned or non-configurable widgets render a
server-only unavailable view. Only a canonical configurable ID can mount the
client editor, request settings, or create a preview iframe. The client and
settings APIs repeat the capability check as independent fail-closed layers.
The catalog opts into the normal admin workspace header/sidebar, while the
editor route uses a focused full-width layout. Configurable catalog cards use an
intent-prefetched Next.js client transition. Canonical widget IDs are statically
generated and the route has a stable loading state for uncached transitions.
The persistent AppBridge auth and widget-settings provider remain mounted, so
editor admission does not repeat merchant lookup, theme sync, loader closure,
or settings bootstrap. Server-first route validation, bundle isolation, and the
sidebar-free editor layout are preserved.

## Unsaved editor navigation
- The focused editor has no workspace sidebar. Its Geri command uses the
  `Kaydedilmemiş Değişiklikler` modal when the settings draft is dirty.
- Successful Save and `Kaydetmeden Çık` leave the editor. A failed save keeps
  the editor open and the draft dirty.
- While dirty, a native `beforeunload` listener protects reload, tab/window
  close, and hard document navigation. The browser controls the warning text.
- Save, discard, clean state, and unmount remove the listener. There is no
  session/local storage, IndexedDB, backend draft, automatic recovery,
  `popstate`, history sentinel, or router-history manipulation.
- In-app Geri and shell navigation continue to use the explicit unsaved-changes
  modal. Same-document browser Back may bypass `beforeunload`; the draft can be
  lost in that case. Full browser-Back protection would require persistence or
  history interception, neither of which this architecture promises.
- Native `beforeunload` remains browser-controlled and is not a durable-save
  mechanism. Mobile process termination can still bypass it; no automatic
  recovery is promised.

## Read path (client / admin / widget)
```
DB row.settings:Json
  └→ resolveConfigurableWidget(widgetId)   // fail closed
  └→ sanitizeSettings(widgetDefinition, settings)   // strip unknown keys
  └→ getWidgetDefaults(widgetDefinition) ⊕ savedSettings   // merge with defaults
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
admin UI changes fields and chooses Save
  └→ PUT /api/admin/settings { widgetId, settings }
  └→ parse plain JSON object + resolveConfigurableWidget(widgetId)
  └→ sanitizeSettings(widgetDefinition, settings)   // strip unknown
  └→ validateSettings(widgetDefinition, settings)   // type/range/profile check
  └→ prisma.widgetSettings.upsert({ storeId, widgetId, settings })
```

Capability and body validation happen before the installation transaction,
upsert, or post-response storefront theme sync. Unknown IDs return
`invalid_widget_id`; planned widgets return `widget_not_available`; an
available widget without settings capability returns
`widget_not_configurable`.

## Live preview
- All implemented live previews use one admin iframe shell in
  [WidgetEditor.tsx](src/features/widget-management/components/editor/WidgetEditor.tsx).
  The registry currently exposes Reviews (`reviews`) plus Badge product-detail
  (`pdp`) and listing (`listing`) scenes. Future widgets add an explicit scene
  adapter instead of introducing a parallel React mock preview.
- Canonical routes are `/preview/<widgetId>/<scene>` at
  [src/app/(preview)/preview/[widgetId]/[scene]/route.ts](src/app/(preview)/preview/[widgetId]/[scene]/route.ts).
  They are generated from the exact scene registry during build;
  `dynamicParams=false` makes unknown combinations fail with `404`. The old
  query route remains only as a temporary exact-pair redirect for already-open
  editor sessions.
- The iframe announces `RENUVEX_PR_WIDGET_READY`; the parent responds with
  versioned `RENUVEX_PR_PREVIEW_RENDER`, including the complete resolved
  settings map. Complete-map delivery preserves cross-widget dependencies such
  as Badge icon/color being owned by Reviews.
- Preview accepts only the exact parent window, exact same origin, protocol
  version, widget id, and scene. The parent applies the same checks to
  `RENUVEX_PR_PREVIEW_RENDERED` and `RENUVEX_PR_PREVIEW_ERROR`. No wildcard
  target origin or sessionStorage settings handoff is used.
- Reviews and Badge scenes invoke production renderer modules against local,
  deterministic fixtures. Preview settings/review pages are in-memory; the
  deleted `/api/preview/settings` and `/api/preview/reviews` routes are not
  replaced by another persistence channel.
- The internal `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW` custom event remains
  scoped to already-open Reviews overlays so a lightbox can update without
  remounting; it is not the parent/iframe transport.
- Preview background color is local editor state in [WidgetEditor.tsx](src/features/widget-management/components/editor/WidgetEditor.tsx). It changes only the admin preview surface and is not saved to `WidgetSettings`.
- Preview background uses the same opaque admin color picker as widget colors. Transparent/alpha values are intentionally not user-selectable in the admin UI.
- Desktop preview fills the available preview panel width and height without a device-frame shadow, so it behaves like a browser viewport; mobile and tablet keep fixed device widths.
- The nested preview iframe explicitly owns `pointer-events:auto`. Radix modal scroll locking temporarily sets the app body to `pointer-events:none`; allowing that value to inherit into an already-scrolled iframe can leave Chrome wheel input detached after the reset dialog closes. The modal overlay remains above the iframe and keeps outside interaction blocked while the dialog is open.
- Resetting widget settings also sends the versioned reset-scroll command, so
  an already-scrolled preview returns to the top without recreating the iframe.

The widget renderer and CSS are production code. The host page and data are
fixtures, so the preview is renderer-faithful rather than a guarantee that
every merchant theme's DOM will be pixel-identical.

Preview iframe loading is independent from settings loading. A blank or slow
preview iframe does not by itself mean widget settings are still loading; the
settings editor is gated separately by the admin settings fetch status. The
implemented iframe preview uses its own `loading` / `slow` / `ready` / `error`
state so slow widget assets show an overlay instead of a blank white panel.
Preview retry remounts only the iframe preview; it does not change the settings
draft, dirty state, or save behavior.

Preview rendering has no per-interaction DB or external-provider cost. The
canonical fixture document is generated at build time and served without a
Function invocation; it uses committed local SVG fixtures and the production
widget runtime. Review submission/upload behavior inside fixture scenes is
simulated by the existing preview runtime; it does not create reviews or media.

The canonical document uses stable `widget.js?publicApiKey=preview`. Loader
freshness comes from `must-revalidate`, while runtime and lazy chunks remain
content-hashed and immutable. `verify:preview-routes` prevents a future change
from silently returning canonical preview paths to dynamic rendering.

## Copy And Localization Boundary
Widget copy customization is not the same thing as product localization.

Today, merchants can edit selected visible strings, especially review-form wizard headings under `Metin > Yorum Formu`. Those values are saved as flat widget settings and rendered safely through `review-form-modal/copy.js`. This does not create a multi-language system:
- settings are currently single-value per merchant/widget, not per locale;
- default fallbacks are Turkish;
- dates and counts still use `tr-TR` in widget helpers and summary layouts;
- many visible labels and accessibility labels remain hardcoded Turkish in widget modules;
- browser auto-translation does not translate `aria-label` attributes.

Future English/German support should add a string catalog, a locale source, and a localized settings model before exposing per-language copy fields. If per-storefront locale support is chosen, it should be designed together with the multi-storefront settings question in [[Open_Questions]].

The summary recommendation suffix (`%82 bu ürünü tavsiye ediyor`) is merchant-editable through `Metin > Tavsiye Yüzdesi Metni` (`recommendationLabel`, max 40 characters). The percentage remains system-generated from 4-star + 5-star approved review counts. Storefront rendering uses `summary-layouts/shared/recommendation.js`, inserts merchant copy as text (not `innerHTML`), trims whitespace back to `bu ürünü tavsiye ediyor`, and wraps long unbroken words with the shared recommendation CSS safe area.

Merchant-controlled CTA/count copy also has a targeted long-word contract. `writeButtonText` (`Yorum Yap Butonu Metni`, max 25) and `countLabel` (`Yorum Sayısı Etiketi`, max 20) are still rendered as plain text and wrap long unbroken words in their own controls. Do not apply a global `overflow-wrap:anywhere` rule to every widget label: numeric columns, rating counts, fixed system labels, file names, and compact controls intentionally keep nowrap or ellipsis behavior.

## Removing / changing fields
- **Removing a field**: just delete from `catalog.ts`. `sanitizeSettings` filters unknown keys at read time, so old DB rows still work.
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
- Review form wizard step headings and the photo step subtitle are merchant-editable under `Metin > Yorum Formu`. Storefront rendering goes through `review-form-modal/copy.js`, trims whitespace via `settingText(...)`, falls back to schema defaults for blank values, assigns text with `textContent` so markup-like copy remains literal text, and wraps long unbroken words inside the modal safe area. Those fallback strings live in `copy.js` as `REVIEW_FORM_COPY_DEFAULTS`, mirroring the `catalog.ts` schema defaults (the widget bundle cannot import the admin schema) — update both places when changing the copy.
- Alpha hex values are still valid internally for defaults such as translucent modal controls and borders, but merchants choose opaque colors in the admin picker. If a merchant changes one of those fields manually, the saved value becomes `#rrggbb`; resetting restores the schema default, including alpha where defined.
- `iconSelect` fields resolve their options from [src/widget/icons/index.js](src/widget/icons/index.js). Review/rating icons and filter icons are separate registries; [catalog.ts](src/lib/widgets/catalog.ts) marks each icon field with `registry: 'review' | 'filter'` so a filter value never falls back to a review icon. Current filter options are `lines`, `funnel`, `controls`, and `sliders`; legacy filter value `star` maps to `funnel` in both runtime rendering and settings sanitization.

## Related Source Files
- [src/features/widget-management/](src/features/widget-management/)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [src/app/api/admin/settings/route.ts](src/app/api/admin/settings/route.ts)
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts)
- [src/features/widget-management/components/editor/InfoTooltip.tsx](src/features/widget-management/components/editor/InfoTooltip.tsx)

## Obsidian Links
- [[Widget_Architecture]]
- [[Frontend_Map]]
- [[Storefront_Widget_Overview]]
- [[Database_Schema]]
- [[Open_Questions]]
- [[Roadmap]]

## Change Log
- 2026-07-30: Replaced the Reviews-only iframe plus React Badge mock split with
  one scene registry and shared iframe shell. Reviews, Badge PDP, and Badge
  listing scenes now call production renderers with deterministic local
  fixtures through an exact-origin, exact-source, versioned protocol. Preview
  APIs/sessionStorage were removed; reset returns a scrolled iframe to the top.
- 2026-06-24: Added the `Video Oynatıcı` color group for the product review lightbox Mux Player, then narrowed it to play icon, progress color, and progress track color. The runtime maps those `reviewLightboxVideo*` keys through `theme-vars.js` into the storefront Mux Player theme; play button background and hover background stay transparent fixed values. Admin moderation playback and future video surfaces are intentionally not coupled to these keys.
- 2026-06-21: Documented that existing merchant copy settings are Turkish-first single-value fields, not an i18n layer. Future English/German support needs a locale-aware string catalog and settings model.
- 2026-06-12: Review pagination sizing was compacted on desktop and mobile now uses the visible control box as the clickable target instead of a separate invisible tap halo. No new admin setting was added; `Widget Boyutu` remains the single control.
- 2026-06-12: `Widget Boyutu` now scales the physical load-more and numbered-pagination controls in addition to typography. No new admin field was added; the behavior is driven by internal widget CSS variables.
- 2026-06-12: Admin widget settings loading moved from a boolean gate to a tri-state gate. The editor only mounts after a successful settings response; hard settings-fetch errors show an error/retry state with no settings panel, preview iframe, or save button.
- 2026-06-12: The `reviews` iframe preview gained a separate loading/slow/error overlay with retry. Preview status is independent from settings load status and does not block save.
- 2026-06-09: `Sayfalama` color group gained explicit active-page colors — `paginationActiveBgColor` (fill, default `#111111`) and `paginationActiveTextColor` (number, default `#ffffff`) — decoupled from the passive `paginationTextColor`. Every pagination color is an explicit field.
- 2026-06-09: Added the `paginationMode` design select (Tasarım: `loadMore` | `numbered`) and a `Sayfalama` color group. The load-more and pagination color groups are `showWhen`-gated on `paginationMode`, so only the active mode's colors show in `Renkler`. Schema-driven end-to-end — `widget-settings.ts` (defaults/sanitize/validate) and `SettingsPanel` auto-pick the new fields with no code change. See [[Product_Review_Widget]].
- 2026-06-06: Added nested `Metin > Yorum Formu` copy settings for review wizard step headings and photo subtitle. Settings traversal is recursive via `collectSettingFields(...)`; storefront copy renders as safe text with whitespace fallback and long-word wrapping.
- 2026-07-02: Added `recommendationLabel` for the summary recommendation suffix. It is a flat widget setting, layout-gated to recommendation-capable summaries, limited to 40 characters, and rendered via the shared recommendation helper as safe text with long-word wrapping.
- 2026-07-02: Hardened `writeButtonText` and classic/split `countLabel` against long unbroken merchant copy. The fix is selector-scoped (`.renuvex-pr-write-btn`, `.renuvex-pr-summary-count`) and intentionally does not globalize wrapping across numeric/fixed controls.
- 2026-06-01: Review form wizard close (X) color was decoupled from `formPrimaryTextColor`; runtime derives close icon and hover colors from `formBgColor` with deterministic contrast helpers in `theme-vars.js`.
- 2026-05-14: **Filter Icon Registry Clarified**: Replaced the filter `star` option with `funnel`, kept `star -> funnel` only as a filter-only legacy alias, and separated admin preview rendering by review vs filter registry.
- 2026-05-12: **Icon Registries Simplified**: Filter icons reduced to 4 core choices; Review icons modernized with unified Phosphor weight. Existing legacy keys fall back safely via registry.
- 2026-05-25: **Renuvex Namespace Cleanup**: The original canonical preview
  event family used `RENUVEX_PR_*`. The 2026-07-30 protocol supersedes the
  parent/iframe transport while retaining
  `RENUVEX_PR_SETTINGS_UPDATED_PREVIEW` as an iframe-internal overlay event.
- 2026-05-12: **Live Preview for Overlays**: Introduced the preview settings-updated event payload so active overlays (like the lightbox or review modal) can live-sync admin changes without re-mounting.
- 2026-05-08: **Visual Select Cards**: Added `preview` metadata to `select` fields in schema to drive image-based visual choice cards in admin panel.
- 2026-05-05/06: **Color & Token Refactor**: Removed `reviewFormStyle`, `Marka Kimliği` cascade, and all legacy CSS variables (`--ikr-bg`, etc). Admin color picker now emits strict opaque `#rrggbb`, while structural translucency is hardcoded in frontend styles.
- 2026-05-07: **Constraints**: Added `maxLength` to text fields (e.g., `writeButtonText` max 30) for frontend and backend validation.
- *(Note: Granular bug fixes for the review form modal—such as toast system, clip-paths, and validation tweaks—have been archived or moved to the bug tracker to keep this document focused on widget customization architecture).*
