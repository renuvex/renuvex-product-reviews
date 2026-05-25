---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-19
updated: 2026-05-20
last_verified: 2026-05-20
confidence: high
tags:
  - adr
  - widget
  - rating
  - theme-adapter
related:
  - "[[Decision_Index]]"
  - "[[Product_Rating_Badge]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Widget_Customization]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
source_files:
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/core/badge.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/icons/review-icons.js"
  - "src/widget/themes/current-adapter.js"
---

# ADR_0016 - Rating Visual System Is Global and Single-Sourced

## Status
Accepted

## Date
2026-05-19

## Context
The storefront renders star ratings on several surfaces: the Product Reviews
summary, the per-review list, the PDP product-title rating badge, and the
listing/category/slider/home/quick-view product-card badges.

A code audit found the star icon style and star color were not managed as one
visual system:

- The icon style + color were defined twice in the admin schema: `reviews`
  widget (`reviewIcon`, `reviewStarColor`) and `badge` widget (`icon`, `color`).
- **Bug A:** the PDP title badge (`rating-badge.js`) passed the raw `badge.icon`
  value (e.g. `favorite:modern`) straight into `getIconStyle` without
  `parseIconValue`, so any non-`star` icon silently fell back to a classic star.
- **Bug B:** `badge.color` was applied to a wrapper element, but the
  `.ikr-star-*` class rules in `PARTIAL_STARS_CSS` set `color` directly on the
  glyph elements, so the wrapper color never reached the stars. `badge.color`
  was a dead setting.
- The listing/card/slider/home/quick-view badges hardcoded `getIconStyle('star',
  'classic')` in `core/badge.js`, so neither `reviewIcon` nor `badge.icon`
  affected them.
- The empty-star color variable was only set by the PDP render path
  (`render.js`), so cold listing-page entry showed gray empty stars while a
  post-PDP visit showed brand-color empty stars.

The half-star *engine* (`partialStarsHTML` + `PARTIAL_STARS_CSS` in
`core/helpers.js`) was already shared and correct; only the icon and color fed
into it diverged per surface.

## Decision
The star icon family, star color, and full/half/empty rendering are one
**global rating visual system**.

1. **Single source of truth.** The merchant picks the star icon and star color
   once, in the "Ürün Yorumları" widget (`reviewIcon`, `reviewStarColor`). Every
   rating surface — reviews summary, review list, PDP title badge, and all
   listing/card badges — reads from that source. The fields physically stay in
   the `reviews` widget for admin simplicity; conceptually they are global.
2. **`badge` ("Yıldız Rozeti") widget is layout-only.** Its `icon` and `color`
   fields are removed. It now carries only `enabled` (badge visibility) and
   `size` (PDP title-badge size).
3. **Shared renderer.** All badge renderers receive a parsed icon pair
   (`getIconFromSettings`) instead of calling `getIconStyle` themselves or
   hardcoding `star`. `partialStarsHTML` remains the single half/full/empty
   engine.
4. **Color via one variable, on both paths.** Star color flows through a single
   `--ikr-review-star-color` CSS variable — filled stars and empty-outline stars
   share it (empty = filled color). The PDP path (`render.js`) and the listing
   path (`listing-badges/index.js`) both set it, so listing badges no longer
   depend on the PDP render path.
5. **Empty star = filled color.** The empty star is an outline in the same color
   as the filled star (the existing outline architecture). There is no separate
   empty-star-color setting.
6. **Theme adapters never touch visuals.** A theme adapter answers only "where
   and when to render" (mount points, selectors, page/context detection, link
   exclusion). The rating visual system is global and independent of the active
   theme. Adapter exports must not include icon/color/half-star logic.

## Reasoning
Rating iconography is one brand identity; an industry-standard review app keeps
it consistent across every surface a rating appears on. Per-surface differences
that are acceptable are layout-level (size, single vs. five stars, text format),
not visual-identity-level (icon family, color, half-star behavior).

Keeping the fields in the `reviews` widget (rather than introducing a new admin
card) was a deliberate UX choice: it avoids adding a non-widget settings card to
a list of placeable widgets, and requires no data migration because the canonical
fields stay exactly where merchants already set them.

## Alternatives Considered
- **New standalone "Yıldız Görünümü" admin section** — cleaner conceptual
  ownership, but adds a non-widget card to the widget list and is a larger admin
  IA change. Rejected in favor of keeping the fields in `reviews`.
- **Fix only the two bugs, keep `badge.icon`/`badge.color`** — leaves the
  duplication and the misleading dead `badge.color` setting. Rejected; it treats
  symptoms, not the structure.
- **Separate empty-star-color setting** — extra knob with no clear merchant need;
  the outline-in-filled-color look is the existing intentional design. Rejected.
- **Theme-specific badge visuals** — would fork the rating identity per theme and
  create technical debt. Rejected; theme adapters stay mount/selector only.

## Consequences
- Choosing a non-star icon (heart, leaf, crown, paw, clover, coffee) now renders
  correctly on the PDP title badge (Bug A fixed) and on every listing badge.
- Star color changes apply consistently to all badges (Bug B fixed); the dead
  `--ikr-badge-color` variable and `badge.color` field are removed.
- Cold listing-page entry shows the correct brand-color stars without a prior PDP
  visit (the listing path sets its own star color variables).
- `badge.icon` / `badge.color` are removed from `widgetDefs.ts`. `WidgetSettings.
  settings` is a JSON column, so no Prisma migration is needed; `sanitizeSettings`
  strips the now-unknown keys from old rows on read. No data migration required —
  the canonical `reviewIcon` / `reviewStarColor` values are untouched.
- `badge.size` now applies to all badge surfaces (PDP title and listing/card
  badges) via the shared `SIZE_MAP` exported from `core/badge.js`. One
  small/medium/large choice resolves to **both** an icon-pixel value and a text
  font-size, used identically by every badge surface. Surface-specific values
  are layout only: PDP keeps `gap:5px` / `margin-bottom:10px` for the ferah
  title row; listing keeps `gap:3px` / `margin-bottom:4px` for tight cards.
  `line-height` is proportional (1.3) so the row reservation scales with text.
- New code that adds a rating surface must feed it from `getIconFromSettings` and
  the shared `partialStarsHTML`; it must not hardcode an icon or read `badge.*`
  for visuals.
- Layout, sizing tokens, mount-point strategy, and click behavior for the badge
  surface are governed by [[ADR_0017_Badge_Architecture]]. This ADR's scope is
  the **visual identity** (icon family, color, half-star engine); ADR_0017 owns
  the **structural** layer (class system, CSS variables, sibling mount, mobile
  override). The two ADRs are complementary, not overlapping.
- The **delivery mechanism** of the star geometry is governed by
  [[ADR_0019_Icon_Sprite_Rendering]]: read-only stars reference a single injected
  SVG `<symbol>` sprite via `<use>` instead of inlining `<path>` per star. The
  single `ICONS` source defined here is unchanged — the sprite derives its two
  symbols from it, and `partialStarsHTML` + the half-star clip-path engine are
  untouched.

## Related Source Files
- [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)
- [src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js)
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js)
- [src/widget/core/badge.js](src/widget/core/badge.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js)
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js)
- [src/widget/icons/review-icons.js](src/widget/icons/review-icons.js)
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js)

## Related Notes
- [[Decision_Index]]
- [[Product_Rating_Badge]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0019_Icon_Sprite_Rendering]]
