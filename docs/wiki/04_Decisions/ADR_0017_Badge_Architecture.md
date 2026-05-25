---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-20
updated: 2026-05-20
last_verified: 2026-05-20
confidence: high
tags:
  - adr
  - widget
  - badge
  - rating
  - css
  - accessibility
  - mobile
related:
  - "[[Decision_Index]]"
  - "[[Product_Rating_Badge]]"
  - "[[Listing_Rating_Widget]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
source_files:
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/widget/core/badge.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/rollout.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
---

# ADR_0017 - Badge Architecture (Mount, Class-First Styling, Component-Scope Tokens, Mobile Override)

## Status
Accepted

## Date
2026-05-20

## Context
[[ADR_0016_Rating_Visual_System]] unified the **visual identity** (icon family,
color, half-star engine) across every rating surface. Once that landed, the
remaining problems with the rating badge were structural and merchant-visible:

1. **Mobile/desktop sizing was not separable.** Merchants picked one
   `badge.size` (Küçük/Orta/Büyük) that applied identically to a 1440px
   desktop card and a 320px mobile card. Wide product cards looked fine; tight
   mobile cards showed a 20px icon next to a 13px count and the proportion
   broke down. The recently shipped `9f63d6c` / `37080446` fixes unified icon
   and text sizes between PDP and listing but did not address responsive needs.
2. **Listing badge was injected inside the product `<h2>`.** Inserting flow
   content (`<div>`) inside a heading is tolerated by browsers but invalid in
   HTML5 strict mode, and — more practically — the badge inherited the theme
   `<h2>`'s `font-family`, `letter-spacing`, and other typography that themes
   commonly override. The PDP badge was already a sibling of the title element
   (correct); only listing diverged.
3. **Sizing tokens lived in inline styles.** Both PDP and listing emitted
   `style="width:20px;height:20px"` on every `<span class="renuvex-pr-star">` and
   `font-size:Xpx` on the count span. This worked but blocked responsive
   overrides (no media queries on inline styles), kept layout decisions and
   merchant config tangled, and gave theme CSS no clean override surface.
4. **Click intent and accessibility were unwritten.** Listing badges set
   `pointer-events:none` so the parent product `<a>` would receive clicks and
   navigate to the PDP — the correct card-link UX. PDP badges have their own
   click handler that scrolls to the reviews section. Neither rule was
   documented; future refactors could easily break either.

Competitor research (Loox, Okendo, Yotpo-on-ikas via proteinocean.com) showed
a converging industry pattern: a namespaced root element with `role="figure"`
and `aria-label`, BEM-style classes, sizing via data attributes or CSS
custom properties, and mount as a **sibling** of the title — never inside it.

## Decision

The badge subsystem follows four rules. None of them touch the visual identity
fixed by [[ADR_0016_Rating_Visual_System]] — that system (icon, color,
half-star engine) remains untouched.

### 1. Mount: sibling of title, with an adapter override and an emergency flag

The listing badge is **inserted as a sibling of the product title element**,
not inside it. The PDP badge was already a sibling. Resolution order:

1. `getThemeAdapter().getListingBadgeMountPoint(titleEl)` — if a theme adapter
   pins a specific element, use it. Default returns `null`.
2. `titleEl.parentNode.insertBefore(badge, titleEl.nextSibling)` — sibling
   mount, the default.
3. `window.RENUVEX_PR_BADGE_MOUNT_LEGACY === true` — debug-only escape hatch back to
   the in-`<h2>` mount. Not exposed to merchants; for incident recovery from
   the browser console.

**No automatic fallback heuristic.** If a theme breaks under sibling mount,
the fix is to extend `getListingBadgeMountPoint` on the adapter, not to layer
conditional retries in `inject.js`.

Phase 2 of the rollout shipped with a publicApiKey allowlist gate
([src/widget/core/rollout.js](src/widget/core/rollout.js) `isSiblingMountEnabled`)
so production stores stayed on the legacy in-`<h2>` mount while the dev store
exercised the new path; see Consequences for the rollout sequence.

### 2. Styling: class-first, with minimal inline

Badge layout (`display`, `align-items`, `gap`, `margin`, `line-height`, `color`,
`font-weight`, `font-family:inherit` typography reset, `pointer-events`,
`text-decoration`, `cursor`) lives in CSS classes injected via
`PARTIAL_STARS_CSS` in [src/widget/core/helpers.js](src/widget/core/helpers.js):
`.renuvex-pr-rating-badge`, `.renuvex-pr-rating-badge--pdp`, `.renuvex-pr-rating-badge--listing`.

The only inline styles emitted at runtime are values that cannot live in a
stylesheet:
- `justify-content` — derived per mount from `getComputedStyle(titleEl).textAlign`.

Every badge gets `role="figure"`, `aria-label="X üzerinden 5 yıldız, Y yorum"`,
and `data-renuvex-surface="pdp|listing"` / `data-renuvex-rating` / `data-renuvex-count`
data attributes for debugging and future CSS hooks. The legacy
`data-renuvex-listing-badge="1"` is preserved on listing badges so existing
observer, cleanup, and placeholder code paths keep working.

### 3. Sizing tokens: component-scope CSS variables, not :root

Badge icon size and text size flow through two CSS custom properties scoped
to `.renuvex-pr-rating-badge`:

- `--renuvex-pr-badge-icon-size` — drives `.renuvex-pr-rating-badge .renuvex-pr-star { width; height }`
- `--renuvex-pr-badge-text-size` — drives `.renuvex-pr-rating-badge { font-size }` (label
  inherits)

Defaults are in `PARTIAL_STARS_CSS`. Merchant overrides are written by
`ensureBadgeTokens(sizes, mobileSizes?)` in
[src/widget/core/badge.js](src/widget/core/badge.js), which rewrites the
`textContent` of a single `<style id="renuvex-pr-badge-tokens">` tag idempotently.
Both the PDP and listing render paths call this helper after resolving
`SIZE_MAP[badgeSettings.size]`; they share the same style tag and write the
same content (settings are the single source).

`:root` is reserved for **truly global** rating tokens. Today that means only
`--renuvex-pr-review-star-color` (ADR_0016). Future per-surface variants (carousel,
popup) can override sizing per modifier (`.renuvex-pr-rating-badge--carousel`)
without polluting `:root`.

Inside `.renuvex-pr-rating-badge`, the `.renuvex-pr-star` selector reads the variable.
Outside (review summary stars, modal stars, form rating), the existing inline
`width`/`height` pattern is preserved because the more specific
`.renuvex-pr-rating-badge .renuvex-pr-star { width: var(...) }` rule does not apply.

### 4. Mobile/desktop sizing: opt-in toggle, single breakpoint

The merchant default is one preset (`badge.size`) applied at every viewport —
backward-compatible with stores that have not touched the new fields. When
`badge.mobileOverride === true`, a separate `badge.mobileSize` preset takes
effect at `max-width: 640px` via an `@media` block written by
`ensureBadgeTokens` into the same `<style id="renuvex-pr-badge-tokens">` tag,
scoped to `.renuvex-pr-rating-badge`.

The breakpoint (`640px`) is a hardcoded constant for now; ikas does not
publish a canonical mobile breakpoint, and `640px` is the prevailing
storefront-side convention. If a tenant case demands a different breakpoint,
that becomes its own ADR.

Click behavior is part of the surface contract and **not merchant-tunable**:
- Listing: `pointer-events: none` — clicks pass through the badge to the
  parent product `<a>` for card navigation.
- PDP: `<a id="renuvex-pr-rating-badge" href="#ikas-reviews">` with a JS handler that
  `preventDefault`s and `scrollTo`s the reviews section, with sticky-header
  offset compensation.

## Reasoning

Each rule corresponds to a structural risk surfaced in the audit:

- **Sibling mount** removes the HTML5-validity concern and ends typography
  inheritance from the theme `<h2>`. The adapter override and emergency flag
  cover the long tail of unusual themes without forcing two parallel mount
  paths into the main code.
- **Class-first styling** turns the badge into a stable CSS target. Themes
  can override `.renuvex-pr-rating-badge .renuvex-pr-rating-badge__label` if they need to;
  inline styles previously made that impossible without `!important` wars.
  It also lets media queries land cleanly (next rule).
- **Component-scope variables** keep `:root` clean and let future surface
  variants own their own size tokens without colliding with the global brand
  variable. The pattern matches what Loox and Okendo do; the existing
  `--renuvex-pr-review-star-color` shows the inverse case (truly global — keep on
  `:root`).
- **Opt-in mobile** matches the actual merchant ask: %95 of merchants will
  not configure mobile separately; the 5% who care should not be forced into
  a power-user UI for the common case. A single breakpoint + class-scoped
  media query is the smallest possible primitive that satisfies that.

## Alternatives Considered

- **Keep listing badge inside `<h2>`.** Browser-tolerated but HTML5-invalid;
  more importantly, theme typography keeps leaking in. Rejected.
- **Automatic mount fallback (try sibling, detect failure, retry in-h2).**
  Detection is fragile (`getBoundingClientRect` heuristics fight theme CSS),
  doubles the test surface, and obscures the real fix (adapter extension).
  Rejected.
- **Per-merchant sizing-config field UI (numeric icon/text px in admin).**
  More flexible but inflates the admin surface and asks merchants to make
  decisions they should not have to make. Rejected for now; can be revisited
  if real merchant demand appears.
- **`:root` for sizing tokens.** Simpler one-line change, but pollutes the
  global namespace and blocks future surface variants. Rejected.
- **Auto-scale on mobile via container queries.** Container query browser
  support is solid by 2026 but requires every parent layout to be a
  containment context. Inconsistent across themes. The explicit toggle is
  more predictable.
- **Single-PR refactor.** Higher velocity, much higher rollback cost if one
  piece regresses. Rejected in favor of the phased rollout below.

## Consequences

- The badge widget gains new settings keys — `mobileOverride`, `mobileSize`,
  `alignment`, `showValue`, `showCount` (PR-1). Added via
  [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts);
  `WidgetSettings.settings` is JSON, so no Prisma migration is needed and old
  rows merge with defaults via `getWidgetDefaults`. `alignment`, `showValue`,
  and `showCount` are recorded as merchant-tunable preferences for the badge
  surface (consumed by future iterations).
- Listing and PDP badges share one DOM contract — a `.renuvex-pr-rating-badge` root
  with surface modifier, `role="figure"`, `aria-label`, and three
  `data-renuvex-*` attributes. Existing observers / cleanup that key off
  `[data-renuvex-listing-badge]` keep working.
- Theme adapters carry an optional `getListingBadgeMountPoint(titleEl)`
  method. `themes/current-adapter.js` augments any adapter with a default
  that returns `null`, so call sites in `listing-badges/inject.js` can call
  it without null checks. ADR_0016's "adapters never touch visuals" rule is
  preserved — this method answers "where" only.
- Sibling mount shipped behind a publicApiKey allowlist gate in
  [src/widget/core/rollout.js](src/widget/core/rollout.js)
  (`isSiblingMountEnabled`). Phase 2 deploy plan:
  - Deploy 1 (PR-2 landed): code in production, gate ON for dev store only.
    48-72h Sentry + visual + CLS monitoring on `dev-mertcopper.ikas.shop`.
  - Deploy 2 (~3-7 days): flip default — sibling for everyone; allowlist
    becomes a `LEGACY_MOUNT_OPT_OUT` opt-out for any tenant that needs it.
  - Deploy 3 (~2 sprints): remove the legacy mount path from `resolveMount`.
- Component-scope CSS variables (`--renuvex-pr-badge-icon-size`,
  `--renuvex-pr-badge-text-size`) live on `.renuvex-pr-rating-badge`. `:root` remains
  reserved for ADR_0016's `--renuvex-pr-review-star-color`. Future variants
  (carousel, popup) can override on their own modifier classes.
- Future code that introduces a new badge surface should reuse
  `.renuvex-pr-rating-badge` + a `--<variant>` modifier; size tokens should flow
  through `ensureBadgeTokens` or its successor. Do not introduce
  surface-specific size sources.
- **Amended in part by [[ADR_0019_Icon_Sprite_Rendering]] (2026-05-24):** the
  PDP badge is now a plain link (no `role="figure"`) named via an sr-only
  `aria-labelledby` span, carries no static duplicate-prone badge id, and takes
  alignment from a `data-renuvex-align` attribute instead of an inline
  `justify-content` style. Star glyphs render via a shared SVG `<symbol>` sprite
  + `<use>` rather than inline `<path>`. The listing badge's `role="figure"` and
  `pointer-events:none` card-link behavior are unchanged.

## Related Source Files
- [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)
- [src/widget/core/badge.js](src/widget/core/badge.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/widget/core/rollout.js](src/widget/core/rollout.js)
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js)
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js)
- [src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js)
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)

## Related Notes
- [[Decision_Index]]
- [[ADR_0016_Rating_Visual_System]]
- [[ADR_0019_Icon_Sprite_Rendering]]
- [[Product_Rating_Badge]]
- [[Listing_Rating_Widget]]
- [[ADR_0002_Widget_Injection_Strategy]]
