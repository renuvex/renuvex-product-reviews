---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-27
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - adr
  - widget
  - theme-adapter
  - placement
  - allowlist
  - sync
related:
  - "[[Decision_Index]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
  - "[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]"
  - "[[Ikas_Theme_Limitations]]"
  - "[[Theme_Adapter_Playbook]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Open_Questions]]"
source_files:
  - "src/lib/storefront-theme.ts"
  - "src/lib/storefront-theme-sync.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/widget/core/settings.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/reviews-section/render.js"
---

# ADR 0022: Placement Allowlist and Storefront-Driven Theme Resync

## Status
Accepted (2026-05-27).

## Context
[[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] closed the **rendering isolation** axis: review-section / lightbox / form-wizard CSS no longer bleeds from arbitrary merchant themes. It explicitly left **placement** open — the supported/unsupported-theme allowlist tracked in [[Open_Questions]] and [[Theme_Adapter_Playbook]]. Today the storefront widget still attempts auto-placement on every theme via the `generic` adapter when `themeAdapterKey === 'generic'`; the public runtime carries only `themeAdapterKey` and `themeAdapterSource`, with no visibility/placement gate.

This ADR addresses two coupled problems:

1. **Placement on unknown themes is risky.** Without a per-theme adapter, badge mount selectors are heuristic. On unsupported themes badges either fail to mount, mount at the wrong DOM anchor (visually broken), or — worse — accidentally match an unrelated element. The review section is opt-in (`data-renuvex-widget="reviews"`) and shadow-isolated, so it is already safe even on unknown themes. Badges remain in light DOM by intentional design (ADR_0017) and are the risky surface.

2. **DB theme metadata becomes stale.** `StoreSettings.storefrontTheme` only refreshes on `install`, `manual`, `dashboard_open`, `settings_save`, daily `cron`, or pending `verification`. When a merchant changes their theme through ikas admin and does not open Renuvex, the widget continues to apply the previous adapter for hours to days. Adding a placement allowlist amplifies the cost of staleness: an Ozy-classified merchant who silently switches to a non-Ozy theme will keep auto-placing badges with Ozy selectors against the new theme's DOM.

### Empirical evidence for the design

Cross-merchant theme-id stability test on 2026-05-27 (two independent merchants on the same dev orchestration; raw snapshots captured during the session):

| Field | Merchant A (dev-mertcopper, Ares) | Merchant B (dev-test2, Ares) | Result |
|---|---|---|---|
| `activeThemeId` | `98c72ebc-aa2f-4fb7-9b36-3570e94394da` | `98c72ebc-aa2f-4fb7-9b36-3570e94394da` | Identical — global catalog id |
| `activeThemeVersionId` | `fcfdf2b5-2894-4aac-94ce-5e09603fe88b` | `fcfdf2b5-2894-4aac-94ce-5e09603fe88b` | Identical — global version id |
| `activeStorefrontThemeId` | `4f008773-c8f1-4eee-90cc-abc6e62d0f5e` | `a0cde897-8007-4d5d-976c-703cabbcf032` | Different — per-merchant instance |
| `mainStorefrontThemeId` | `4f008773-c8f1-4eee-90cc-abc6e62d0f5e` | `a0cde897-8007-4d5d-976c-703cabbcf032` | Different — per-merchant instance |

Three additional in-session controlled tests on Merchant A confirmed:
- **Theme rename** ("Ares" → "dsfdf") leaves every id unchanged (`metadataIdentity` already excludes `activeThemeName`).
- **Theme switch + return** (Ares → The Nile → Ares) restores the original ids: merchant-level theme records persist across selection.
- **Theme version upgrade** changes ONLY `activeThemeVersionId`; `activeThemeId`, `activeStorefrontThemeId`, and `mainStorefrontThemeId` are stable.

- **Theme clone** (Ozy -> "Ozy 2", tested 2026-05-29) preserves `activeThemeId: 57225e07-aa38-4d38-9688-f6730ee16143` and `activeThemeVersionId: 5ecd7d44-3748-41b3-82e2-b3d3e54955bd`, while changing `activeThemeName`, `activeStorefrontThemeId`, and `mainStorefrontThemeId`. This confirms clone creates a new per-merchant storefront theme instance without changing the stable catalog theme id used for adapter allowlisting.

Independent verification on Merchant B's install: Ozy mapped via `THEME_ADAPTER_BY_THEME_ID[57225e07-aa38-4d38-9688-f6730ee16143]` produced `adapterSource: 'auto'` + `adapterMatchedBy: 'theme_id'`, confirming the lookup is cross-merchant correct.

**Conclusion:** `activeThemeId` is the stable catalog id, identical across merchants and immutable across version upgrades. It is the correct allowlist key.

### Why a webhook is not the answer (for now)

The ikas Admin API `saveWebhooks` mutation accepts exactly these scopes (verified via MCP introspection on 2026-05-27): `store/order/created`, `store/order/updated`, `store/product/created`, `store/product/updated`, `store/customer/created`, `store/customer/updated`, `store/customerFavoriteProducts/created`, `store/customerFavoriteProducts/updated`, `store/stock/created`, `store/stock/updated`. **There is no `store/theme/*` scope.** ikas exposes 55 Admin API operations total; none cover storefront theme change events. The merchant-facing "Bildirim Adresi" panel covers only billing and app-uninstall notifications.

For comparison, Shopify offers `THEMES_PUBLISH` (and `THEMES_CREATE/UPDATE/DELETE`), which is what the established review-app ecosystem (Yotpo, Okendo, Loox, Judge.me) keys off. ikas's missing webhook is a real platform gap; a feature request to ikas is the long-term right call but cannot be a dependency for this ADR.

## Decision

### Layer 1 — Placement allowlist

The public runtime gains two boolean flags exposed through `/api/public/settings`:

- `autoPlacementEnabled` — controls DOM-heuristic surfaces: PDP rating badge, listing badges, modal listing badge. Derived in `buildPublicThemeRuntime`:
  ```ts
  const isKnownTheme =
    metadata.adapterMatchedBy === 'theme_id' &&
    metadata.themeAdapterKey !== 'generic';
  ```
  This intentionally requires **id-based** adapter match. Name-based fallbacks (`theme_name_fallback`, `legacy_fallback`) keep their adapter-selection role but **never** unlock auto-placement — merchant-editable theme names cannot grant placement privileges (see [Log 2026-05-23](Log.md)).

- `reviewsMountEnabled` — kill-switch for the explicit-mount review section. Defaults to `true` for v1 (the review section is opt-in via `data-renuvex-widget="reviews"` AND shadow-isolated per ADR_0021, so it is structurally safe on any theme). The flag exists as a backend lever to disable the review section per-merchant or per-theme without redeploying the widget bundle.

Default fallback (`FALLBACK_RUNTIME`, used when metadata is missing): both flags `false` for `autoPlacement`, `true` for `reviewsMount` only when the runtime can confirm metadata; if no metadata at all, both `false` is the safe choice. Concretely:
- Missing/unparseable storefront theme metadata → `autoPlacementEnabled: false`, `reviewsMountEnabled: false`.
- `adapterMatchedBy === 'theme_id'` AND `themeAdapterKey !== 'generic'` → both `true`.
- All other paths (`theme_name_fallback`, `legacy_fallback`, `none`/`generic_unknown`) → `autoPlacementEnabled: false`, `reviewsMountEnabled: true`.

The widget runtime consumes the flags through new getters in `themes/current-adapter.js` (`isAutoPlacementEnabled()` / `isReviewsMountEnabled()`). `settings.js` `applyRuntimeSettings` calls the matching setters alongside `setThemeAdapterKey`.

Gating points:
- `rating-badge/index.js renderRatingBadge` and `rating-badge/inject.js injectRatingBadge` — early-return when `!isAutoPlacementEnabled()`, BEFORE rating fetch, DOM probe, or badge style injection.
- `structured-data/index.js renderStructuredData` — separate SEO surface. It can emit JSON-LD on unsupported auto-placement themes only when an explicit review mount renders visible rating content; unsupported + no visible review/rating surface returns early.
- `listing-badges/inject.js` `reserveBadgeSlots`, `injectBadges`, `injectModalBadge` — early-return when `!isAutoPlacementEnabled()`. `observer.js`'s lazy listing-badge render also no-ops because the underlying functions return immediately.
- `reviews-section/render.js` `findReviewsMount` path — guarded by `isReviewsMountEnabled()` for defense in depth. Today the function already returns `null` when no `data-renuvex-widget="reviews"` element exists; the gate is structural protection for the future.

### Layer 2 — Storefront-driven lazy resync

`/api/public/settings` becomes the second sync trigger (in addition to install / dashboard_open / settings_save / cron / verification). On every request the route reads `parseStorefrontThemeState(store.storefrontTheme)?.lastCheckedAt`. If `Date.now() - lastChecked > STALE_THRESHOLD_MS` (30 minutes for v1), the route uses Next.js `after()` to fire `syncStorefrontThemeForToken(token, { reason: 'lazy_storefront', persistUnchangedCheck: true })` as background work. The response is unchanged — no added latency for the storefront visitor.

`StorefrontThemeSyncReason` gains a `'lazy_storefront'` variant so observability can distinguish this trigger from cron/dashboard. `persistUnchangedCheck: true` ensures `lastCheckedAt` advances even when nothing changed, providing natural per-merchant debounce: a successful (or even an unchanged) check resets the 30-minute window, so subsequent requests in the same window skip the trigger automatically without needing an in-memory dedupe map.

### What changes for the first visitor after a theme switch

The combined layers do **not** eliminate the "first visitor sees stale settings" window — they shrink it. With cron-only sync today, the window is up to 24 hours. With lazy resync, the window is bounded by `STALE_THRESHOLD_MS` plus storefront cache TTL (`s-maxage=60, stale-while-revalidate=300`), so in practice every visitor after the first sees fresh placement. The first visitor after a theme change can still see badges in the wrong place or missing entirely; on average this is bounded to a single visitor per theme change, and the placement allowlist's fail-closed default makes "wrong place" much rarer than under the pre-ADR generic-adapter behavior (auto-placement is OFF on unknown themes, so the only legitimately wrong outcome on the new theme is "missing badge until next visitor refreshes," not "badge stuck in header").

The trade-off is explicitly accepted. Mitigations beyond v1 (synchronous resync with timeout, client-side mismatch detection, admin warning UI) are deferred — see Consequences.

## Reasoning
- **`adapterMatchedBy === 'theme_id'` is the only safe gating signal.** Theme display names are merchant-editable (see code comment in `storefront-theme.ts:73-77` and Log entry 2026-05-23). Empirical proof on 2026-05-26 (Siva → "Siva test") and 2026-05-27 (Ares → "dsfdf") confirm that renames flip `activeThemeName` while leaving every id stable; conversely `metadataIdentity` excludes the name on purpose, so a rename does not even push the state into `pending_verification`. Using `themeAdapterKey === 'ozy'` alone would let a rename of, say, "Ozyma" into a non-Ozy storefront grant Ozy auto-placement if the API ever omits `themeId`. Restricting unlock to `theme_id` matches keeps the fail-safe explicit.
- **Catalog ids are stable across merchants.** The 2026-05-27 cross-merchant test confirmed `activeThemeId` is identical for two independent merchants using the same theme. A single id in `THEME_ADAPTER_BY_THEME_ID` covers every merchant using that theme; theme version upgrades do not invalidate the entry. This is the contract Shopify-style id-based adapter selection assumes; we verified ikas mirrors it.
- **Reviews are not gated by `autoPlacementEnabled`.** ADR_0021 isolates the review section in a Shadow DOM rooted on a light-DOM host; the merchant places the mount with `data-renuvex-widget="reviews"`. The combination is structurally safe regardless of theme. Tying reviews to the badge allowlist would force an unsupported theme that has otherwise placed the mount correctly to lose the review section for no isolation benefit.
- **Lazy resync is the maximally cheap freshness mechanism available.** It uses an existing request hot path (`/api/public/settings`), an existing sync function (`syncStorefrontThemeForToken`), and an existing Next.js primitive (`after()` for post-response work). `lastCheckedAt` already acts as a debounce surface when `persistUnchangedCheck: true` is passed. No new infrastructure, no plan upgrade, no queue.
- **`after()` is the correct runtime tool** on Vercel for guaranteed post-response work; `void fn()` can be cancelled when the function freezes between invocations. `after()` extends the function's lifecycle until the work completes (or the platform timeout fires).
- **Single-flag is insufficient.** Combining badge placement gating and reviews mounting under one boolean would either force unsupported-theme merchants who placed the explicit review mount to lose their reviews, OR open auto-placement on themes whose only signal is opt-in mount. Two flags keep the policies decoupled and allow future per-theme tuning.

## Alternatives Considered
- **ikas webhook (push) only** — Rejected as a blocking dependency. The ikas Admin API has no theme webhook scope (introspected 2026-05-27). A feature request is parallel work but cannot gate this ADR. If ikas ships `store/theme/*` later, layer 2 stays as fallback and we add an `/api/webhooks/ikas/theme` route as a third trigger.
- **Single `themeIsSupported` flag** — Rejected because it would couple review-section visibility to the auto-placement policy; reviews are already explicit-mount + Shadow DOM and do not need theme allowlist gating to be safe.
- **Sub-daily cron via QStash / Vercel Pro** — Rejected for v1 due to ongoing cost and because lazy resync gives equivalent freshness for any storefront with traffic (and zero-cost staleness for sites with no traffic is harmless because there are no visitors to render the wrong placement).
- **Name-based unlock (`themeAdapterKey === 'ozy'` alone)** — Rejected because theme names are merchant-editable. The 2026-05-23 hardening fix already established this; this ADR extends the same principle from adapter selection to placement gating.
- **Synchronous resync with 2s timeout on stale check** — Considered for v1, deferred. Would close the "first visitor sees stale" gap by blocking the settings response until ikas confirms or 2s timeout fires. Adds storefront latency on the stale boundary (200ms → 800-2000ms) and risks hot-path failure modes if ikas API slows. Layer it on later if first-visitor staleness becomes a measurable problem in production telemetry.
- **Client-side mismatch detection** — Considered, deferred. Adapter could detect selector misses within N ms of mount and force a backend resync. Adds runtime complexity and false-positive risk (themes legitimately hiding the title), and the allowlist's fail-closed default already removes the worst failure mode (badge stuck in wrong DOM anchor).
- **Admin warning UI for unsupported themes** — Deferred to a follow-up. Surface the existing `adapterSource === 'generic_unknown'` signal in Renuvex dashboard as "This theme is not yet supported for auto-placement; please use explicit mount anchors." Adds onboarding clarity; not blocking.

## Consequences
- Auto-placed badges go silent on every theme except Ozy (the only entry in `THEME_ADAPTER_BY_THEME_ID` today). PDP rating badge, listing badges, and modal badge all early-return on unknown themes. The review section continues to render via explicit mount on any theme.
- Adding a new supported theme is a single line in `THEME_ADAPTER_BY_THEME_ID` plus the existing per-theme adapter checklist in [[Theme_Adapter_Playbook]]. No widget redeploy is needed for the placement flag to flip — the next `lastCheckedAt` refresh (via lazy resync or any other trigger) recomputes `autoPlacementEnabled` from the persisted metadata.
- The lazy resync trigger adds at most one ikas Admin API call per merchant per `STALE_THRESHOLD_MS` window. For an idle merchant (no storefront traffic) zero extra calls fire. For a busy merchant the call rate is bounded by the threshold, not by traffic — `persistUnchangedCheck: true` advances `lastCheckedAt` even when the metadata is unchanged.
- Telemetry distinguishes the lazy trigger from cron via the new `'lazy_storefront'` reason. If lazy proves to fire excessively (e.g., misconfigured cache somewhere lowering `lastCheckedAt`), the source is identifiable in storefront-theme-sync logs.
- First-visitor staleness after a theme change is documented as a known limitation. Affected sites can mitigate today via the `/api/admin/storefront-theme/sync` endpoint exposed in the Renuvex dashboard `dashboard_open` flow; opening Renuvex once after a theme change triggers an immediate sync.
- A future ikas `store/theme/*` webhook plugs in as a third sync trigger (separate `/api/webhooks/ikas/theme` route + `reason: 'webhook'`); the existing layers remain untouched.

## Future Tuning Signals
The v1 thresholds (`STOREFRONT_THEME_LAZY_RESYNC_THRESHOLD_MS = 30 min`, `dashboard_open` unconditional) were chosen for current scale (≤2 active test merchants, no production installs at time of writing). Revisit any constant when at least one of these telemetry signals shows up — not before:

- **Merchant report**: "I changed my theme and customers still see the old badge placement for hours." Concrete UX complaint, not a hypothetical concern.
- **Vercel after() compute** climbs unexpectedly in the function metrics dashboard. The current upper bound at ~5k active merchants × 48 syncs/day is ~33 hours/day of compute; Pro plan absorbs this. If we see this number trend toward plan limits, the threshold needs to go up, not down.
- **ikas Admin API 429 responses** appear in `storefront-theme-sync` logs. Per-token rate limit is ~250/min; current debounce keeps each merchant well below this, but rapid `dashboard_open` re-opens by a single merchant could hit it. The fix is adding a `lastCheckedAt` debounce to the dashboard_open path (~5 lines).
- **Lazy resync trigger rate** in logs (filter by `reason: 'lazy_storefront'`) is much higher than expected. Indicates either misconfigured downstream caching or the threshold is too low; tune up.

Tuning playbook when one of the signals fires:
1. Add `STOREFRONT_THEME_LAZY_RESYNC_MS` env var support (one line, defaults preserved).
2. Adjust the constant or the env value; redeploy.
3. If `dashboard_open` is the culprit, add the same `lastCheckedAt > N` short-circuit to `src/app/api/admin/storefront-theme/sync/route.ts` (~5 lines).
4. Record the change + reasoning in [[Log]].

Without one of these signals, tuning is premature — there is no production traffic to optimize against and no telemetry baseline to compare to.

## Verification
- Build: `pnpm build:widget`, `pnpm exec tsc --noEmit`, `pnpm lint`.
- Wiki: `node scripts/wiki-audit.mjs --changed-source-check`.
- Cross-merchant placement smoke test (manual, post-deploy):
  - Merchant A on Ozy → PDP badge mounts under title, listing badges visible. `runtime.autoPlacementEnabled === true`.
  - Merchant A on Ares (or any unknown theme) → No PDP badge, no listing badges. Explicit-mount review section still renders (if mount is present). `runtime.autoPlacementEnabled === false`.
  - Switch Merchant A from Ozy to Ares without opening Renuvex → next storefront visit triggers lazy resync; subsequent visits within `STALE_THRESHOLD_MS` see `autoPlacementEnabled: false`.
- Telemetry: scan storefront-theme-sync logs for the new `'lazy_storefront'` reason; rate should match active-merchant count × (24h / STALE_THRESHOLD_MS) ceiling.

## Related Source Files
- [src/lib/storefront-theme.ts](src/lib/storefront-theme.ts) — flag derivation + reason type
- [src/lib/storefront-theme-sync.ts](src/lib/storefront-theme-sync.ts) — reused sync function
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts) — lazy resync trigger
- [src/widget/core/settings.js](src/widget/core/settings.js) — applies runtime flags to widget runtime
- [src/widget/themes/current-adapter.js](src/widget/themes/current-adapter.js) — flag setters/getters
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js) — PDP badge gate
- [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js) — listing badge gate
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js) — review section gate (defense in depth)

## Obsidian Links
- [[Decision_Index]]
- [[ADR_0017_Badge_Architecture]]
- [[ADR_0018_Widget_Ownership_And_Placement_Resilience]]
- [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]]
- [[Ikas_Theme_Limitations]]
- [[Theme_Adapter_Playbook]]
- [[Open_Questions]]
