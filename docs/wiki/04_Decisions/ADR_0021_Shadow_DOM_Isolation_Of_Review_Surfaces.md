---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-26
updated: 2026-05-26
last_verified: 2026-05-26
confidence: high
tags:
  - adr
  - widget
  - shadow-dom
  - css-isolation
  - storefront
related:
  - "[[Decision_Index]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[Ikas_Theme_Limitations]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
source_files:
  - "src/widget/core/shadow.js"
  - "src/widget/product-widget/render.js"
  - "src/widget/product-widget/review-modal.js"
  - "src/widget/product-widget/review-form-modal/modal-shell.js"
  - "src/widget/product-widget/review-form-modal/index.js"
  - "src/widget/product-widget/review-form-modal/steps/step-author.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/core/helpers.js"
  - "public/widget-runtime/__fixtures__/ozy-hostile.html"
---

# ADR 0021: Shadow DOM Isolation of Review Surfaces

## Status
Accepted (2026-05-26). Single-commit migration; revert via `git revert` if regressions surface. No rollout gate — see "Alternatives Considered".

## Context
The widget injects its review UI into arbitrary ikas merchant themes in the **light DOM**. ikas exposes no sandboxed storefront slot (verified again on 2026-05-26 via the ikas MCP: the entire Admin API has 55 operations and only `createStorefrontJSScript` / `updateStorefrontJSScript` / `deleteStorefrontJSScript` under "Storefront Management" — no theme/section/slot/extension API). Host‑theme selector rules therefore bleed into our content. The concrete failure recorded on 2026‑05‑25 is the "Mine" theme's `.hOHcRx img { width:100% !important }` overriding `.renuvex-pr-img` (our CSS used `width:var(...)` with no `!important`/`max-width`), blowing review thumbnails up to ~1200px (see [[Ikas_Theme_Limitations]] "Unknown-theme behavior and CSS isolation").

[[ADR_0018_Widget_Ownership_And_Placement_Resilience]] had already earmarked Shadow DOM "as a future option for modal or overlay surfaces." Mature ecommerce embed widgets that look identical across themes (Okendo, many embed widgets, Intercom, Stripe Elements, Disqus) rely on CSS isolation; this ADR realizes that direction for the three self-contained review surfaces.

The migration is the foundation for the supported/unsupported‑theme allowlist work tracked in [[Open_Questions]] — *placement* (where badges and the section sit) and *rendering isolation* (whether our content survives host CSS) are orthogonal axes. This ADR closes the second axis; the first remains pending.

## Decision
Three self-contained review surfaces render inside their own **open Shadow DOM roots**, each with a `:host` reset and the necessary CSS injected into the root (not `document.head`):

1. **Review section** — the existing light-DOM container `#renuvex-reviews` becomes the shadow host (keeps its id). The light-DOM host is intentionally preserved so the PDP rating badge's scroll-to-reviews lookup (`document.getElementById('renuvex-reviews-widget') || document.getElementById('renuvex-reviews')`, rating-badge.js), the health probe, and the mutation observer continue to work unchanged. The `#renuvex-reviews-widget` `<section>` and all review/summary/layout DOM render inside the shadow root.
2. **Photo lightbox** (`product-widget/review-modal.js`) — appends a new bare `<div data-renuvex-shadow-overlay>` to `document.body`, attaches an open shadow root, and renders the overlay inside it. The host is removed on close.
3. **Review-form wizard** (`product-widget/review-form-modal/modal-shell.js`) — same pattern, its own body-level shadow host.

Badges (PDP rating badge, listing badges) and structured data (JSON-LD aggregateRating, written to `document.head` by `rating-badge.js:59`) **stay in light DOM, untouched**. Badges are inline and should inherit theme typography per [[ADR_0017_Badge_Architecture]]; JSON-LD must be crawlable.

### Shared primitives (`src/widget/core/shadow.js`)
- `attachShadowHost(hostEl)` — idempotent open `attachShadow`.
- `injectShadowStyles(root, css)` — mirrors `injectStyles` (helpers.js) but targets the shadow root.
- `getOrCreateShadowContent(root)` — returns a persistent `<div data-renuvex-shadow-content>` wrapper inside the root; render flows target this wrapper, never the shadow root itself (see "Per-root layout" below).
- `createOverlayShadowHost()` — creates a body-level host + open root for the two overlays; caller removes the host on close.
- `getActiveElementWithin(root)` — `document.activeElement` returns the *host* when focus is inside an open shadow; this helper returns the real focused control via `root.activeElement`. Used by both modal focus traps.
- `HOST_RESET_CSS` — `:host { display:block; box-sizing:border-box; font-family:inherit; color:inherit; line-height:inherit; font-size:inherit; letter-spacing:inherit; text-align:start; }` plus `box-sizing:border-box` on all descendants. The `inherit` list deliberately re-admits theme typography so visual parity with the pre-shadow path is preserved on the supported theme (Ozy); selector-targeted host rules can no longer pierce `:host`.

### Per-root layout (review section)
The review-section shadow root has exactly three direct children, in order:
1. `<style data-renuvex-shadow-style>` — injected once after `attachShadowHost`.
2. `<div data-renuvex-shadow-content>` — the persistent wrapper; ALL `replaceChildren` / `appendChild(widget)` operations in `render.js` target this wrapper, never `sRoot` itself.
3. `<div data-renuvex-sprite-mirror>` — the SVG sprite mirror; appended by `registerSpriteRoot` and kept in sync via MutationObserver on the global sprite container.

This separation is structural, not a convention: replacing `contentEl`'s children (loading→widget transitions, filter/sort/load-more re-renders, error→retry, etc.) cannot wipe the style or the sprite mirror, so the render path doesn't have to re-inject anything. `sRoot.getElementById('renuvex-reviews-widget')` (used by the health probe and the badge's scroll-to lookup) still resolves because `getElementById` on a tree root searches the entire shadow tree, not just direct children.

The two overlay roots (lightbox, wizard) don't need this wrapper because they never `replaceChildren` on the overlay's shadow root — each modal manages its own internal DOM inside a single `.renuvex-pr-modal-overlay` / `.renuvex-pr-fwizard-overlay` element that's appended once on open and removed with the host on close.

### CSS strategy
- **Style rules don't cross the boundary** → each shadow root carries its own injected `<style>`:
  - Review section: `HOST_RESET_CSS + BASE_RESET_CSS + CLASSIC_CSS + getLayoutsCSS() + getReviewLayoutsCSS()`.
  - Lightbox: `HOST_RESET_CSS + BASE_RESET_CSS + CLASSIC_CSS` (modal rules + shared icon/star rules are interleaved in `CLASSIC_CSS`; injecting the whole bundle is safer than risky physical extraction and the lightbox shadow ignores selectors it doesn't match).
  - Wizard: `HOST_RESET_CSS + FWIZARD_CSS` (the wizard's own `.renuvex-pr-fwizard-*` style sheet; no `CLASSIC_CSS` needed because the wizard uses its own button-based star buttons via the icon sprite — see below).
- **CSS custom properties DO inherit across the boundary** → the ~35 `--renuvex-pr-*` variables set on `document.documentElement` in `render.js` (including the badge-shared `--renuvex-pr-review-star-color`) continue to resolve inside each shadow root with no change.
- The widget CSS contains no `rem` units, so root-font-size attacks are moot.

### Icon sprite mirroring
The widget renders every icon (stars in summary/bar-chart/review-layouts, lightbox stars via `starsHTML`, wizard stars + close + arrows + photo icons) through SVG `<use href="#id">` against a global `<symbol>` sprite (`#renuvex-pr-icon-sprite`) injected into `document.body` (ADR_0019). SVG `<use>` fragment refs **resolve only within the same DOM tree**, so once review content lives inside shadow roots the global sprite is unreachable from those `<use>` refs. `core/shadow.js` would not solve this — it's a JS/DOM dependency.

`src/widget/icons/star-sprite.js` therefore gains `registerSpriteRoot(root)` / `unregisterSpriteRoot(root)`, which clone the current global sprite `<svg>` into each registered shadow root and keep mirrors in sync via a `MutationObserver` on the global sprite container. Live preview star swaps and lazily-added one-off icon `<symbol>`s flow into every mirror without threading a `root` argument through the ~14 icon call sites. Registration happens after each shadow's content is mounted; the review section re-registers after every render (`replaceChildren()` wipes the prior mirror); the two overlays register on open and unregister on close.

### Single-commit cleanup
- `render.js`'s pre-shadow `injectStyles('#111111', …)` head injection at the top of `render()` is removed; the style injection now happens after the shadow host exists and targets `sRoot`.
- The disabled / loading / error state markup (previously assigned to `container`'s HTML) is built via DOM (`buildDisabledStateEl` for the disabled-state SVG box; createElement `<p>` for loading/error) and routed to `sRoot.replaceChildren(...)`. A shadow host's light-DOM children do not render without a `<slot>`, so assigning HTML to the light host would be invisible.
- The pre-shadow clone/replace listener-reset trick (`container.cloneNode(false); …`) is replaced with `sRoot.replaceChildren()`. `cloneNode` does **not** copy a shadow root and would have destroyed it.
- The old radio-input `renderStars` / `ensureStarStyles` helpers in `core/helpers.js` and the `STAR_COLOR` constant they relied on are removed — they were dead after the new wizard's button-based `step-rating` took over, and their head-injected scoped CSS would not have reached inside a shadow root anyway.
- `review-form-modal/index.js` no longer calls `ensureStyles()` (its head-`<style>` injection); the wizard's CSS is now injected into the wizard shadow root by `modal-shell.js`'s `open()`.
- `step-author.js` no longer falls back to `document.querySelector('h1')` for the product name on submit — that fallback was always fragile across themes and pointless once the wizard renders inside a shadow root. The `productName` passed into `openReviewFormModal({ productName })` (already populated by `summary-layouts/shared/write-action.js openWriteForm()`) is the sole source.

### Focus management
Inside an open shadow root, `document.activeElement` returns the *host*, not the focused inner control. Both modal focus traps (`trapModalFocus` in `review-modal.js`, `trapWizardFocus` in `modal-shell.js`) now read the active element through `getActiveElementWithin(root)`. `restoreFocus` switched from `document.contains(el)` to `el.isConnected` so it can refocus elements that live inside a shadow tree (which `document.contains` reports as not present). `document` keydown listeners, body-scroll lock, and `history.pushState`/`popstate` (wizard) are unchanged — events retarget out of an open shadow and the body remains in light DOM.

## Reasoning
- **`<use>` cannot cross a shadow boundary** is the load-bearing constraint that drove the sprite-mirror design; without it, every star and icon inside the shadow would be invisible.
- **The light-DOM host is non-negotiable for the review section** because the badge scroll-to, observer, slot-position guard, and health probe all key off `#renuvex-reviews`. Keeping the host in light DOM and nesting all content inside its shadow root preserves every external reference unchanged.
- **`:host { …: inherit }`** is the parity guarantee. The boundary blocks selector-targeted host rules automatically (the win); without re-admitting inherited typography, the section would lose the theme font/color it currently borrows and Ozy would visibly change. With it, only the intended change remains: hostile host CSS like `.hOHcRx img{width:100%!important}` cannot reach inside.
- **Reusing `CLASSIC_CSS` in the lightbox** trades a few KB of unused review-section selectors for guaranteed correctness — `.renuvex-pr-modal-*` rules are physically interleaved with shared `.renuvex-pr-icon` / `.renuvex-pr-stars` / `PARTIAL_STARS_CSS` rules the lightbox also needs, and an extraction-by-selector is error-prone.
- **MutationObserver mirroring** avoids threading a `root` argument through every icon call site (summary layouts, bar-chart, review-icons, step-rating, photos, progress-bar, etc.), keeps the global sprite as the source of truth, and handles live preview star swaps + lazy one-off symbols automatically.

## Alternatives Considered
- **Defensive CSS hardening only** (scope `!important` + `max-width:none` under the reviews root) — rejected as a band-aid: an unwinnable arms race against ikas's 16 merchant themes × theme versions; the user explicitly asked for the permanent industry-standard fix.
- **iframe isolation** — rejected for the main review block: review text would leave the host DOM tree, gutting on-page SEO/crawlability (the entire point of a review widget for PDPs); also breaks sticky/scroll/lightbox interactions and needs postMessage auto-resize. iframe could remain a future option for a fully self-contained overlay surface.
- **Per-root sprite plumbing** (thread `root` through every `ensureStarSprite` / `iconUseSvg` call site) — rejected: ~14 call sites across summary layouts, bar-chart, review-icons, modal-shell, step-rating, step-photos, progress-bar, actions-block, compact, classic, split — a much larger blast radius than the MutationObserver mirror.
- **Inline SVG instead of `<use>` inside shadow** — rejected: reverts the ADR_0019 sprite optimization (~76 KB of duplicated path data on a busy PDP) for the shadow-hosted surfaces; bigger payload, no isolation benefit.
- **Shadow-only with a feature gate** (`isShadowDomEnabled()` allowlist in `core/rollout.js`) — rejected per the user's brief: "single commit; revert if bad; no band-aids." A clean replacement keeps both code paths from coexisting; `git revert` is the safety net.
- **Extract a `getModalCSS()` from `CLASSIC_CSS`** — rejected: see "Reusing `CLASSIC_CSS` in the lightbox" above. The plan's original extraction step was dropped during implementation in favor of reusing the existing exported `CLASSIC_CSS`; documented in the plan file (`tamam-faka-bu-commit-greedy-axolotl.md`).

## Consequences
- Host‑theme selector rules (including `!important` on `img` / `button` / `input` / element selectors) cannot affect rendering inside the three review surfaces. The Mine `img` blow-up is gone for any theme; the same protection covers future unsupported themes for free.
- Visual parity on Ozy is preserved: theme typography flows in via `:host { …: inherit }`; merchant color/size config flows in via CSS custom properties on `:root`.
- The badge subsystem, JSON-LD, owned slots, position guards, mutation observer, health probes, and storefront-events context remain unchanged.
- Per-theme adapter work (the supported/unsupported allowlist + `autoPlacementEnabled` / `reviewsMountEnabled` policy, [[Open_Questions]]) is now decoupled from CSS isolation. The placement axis can ship independently in a subsequent change.
- New surfaces that should be theme-isolated must call `attachShadowHost` (or `createOverlayShadowHost` for body-level overlays) + `injectShadowStyles` + `registerSpriteRoot`; new inline surfaces that should inherit theme typography (badges) stay in light DOM.
- A committed dev fixture (`public/widget-runtime/__fixtures__/ozy-hostile.html`) reproduces the Mine theme bleed plus several worst-case host rules; it's served by `next dev` at `/widget-runtime/__fixtures__/ozy-hostile.html` for MCP-driven verification and future per-theme smoke tests.

## Verification
Pre-commit verification (see plan file `tamam-faka-bu-commit-greedy-axolotl.md` for the full checklist) — `pnpm build:widget`, `pnpm dev`, load the fixture via MCP browser tools, assert thumbnail size + shadow isolation + lightbox/wizard focus-trap parity, then `pnpm lint`.

## Related Source Files
- [src/widget/core/shadow.js](src/widget/core/shadow.js)
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js)
- [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js)
- [src/widget/product-widget/review-form-modal/modal-shell.js](src/widget/product-widget/review-form-modal/modal-shell.js)
- [src/widget/product-widget/review-form-modal/index.js](src/widget/product-widget/review-form-modal/index.js)
- [src/widget/product-widget/review-form-modal/steps/step-author.js](src/widget/product-widget/review-form-modal/steps/step-author.js)
- [src/widget/icons/star-sprite.js](src/widget/icons/star-sprite.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [public/widget-runtime/__fixtures__/ozy-hostile.html](public/widget-runtime/__fixtures__/ozy-hostile.html)

## Obsidian Links
- [[Decision_Index]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0018_Widget_Ownership_And_Placement_Resilience]]
- [[ADR_0019_Icon_Sprite_Rendering]]
- [[Ikas_Theme_Limitations]]
- [[Theme_Adapter_Playbook]]
