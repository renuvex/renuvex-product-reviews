---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-24
last_verified: 2026-05-24
confidence: high
tags:
  - ikas
  - widget
  - injection
related:
  - "[[Index]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
source_files:
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/app/api/admin/inject-scripts/route.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/reconcile-storefront-scripts/route.ts"
  - "src/lib/reconcile-storefront-scripts.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/ikas-client/v1-graphql-requests.ts"
---

# ikas Widget Injection Notes

## Summary
How `widget.js` gets onto every storefront page. Uses ikas `StorefrontJSScript` with a per-merchant `<script src=".../widget.js?publicApiKey=<merchantId>" async data-renuvex-app="product-reviews" data-renuvex-store-id="<merchantId>" data-ikr-app="yorum-paneli" data-ikr-store-id="<merchantId>">`. Idempotent via DB-tracked script ids, read-only remote reconciliation, and non-destructive create/update.

## Mechanism
- The active v2 MCP/generated client exposes `createStorefrontJSScript`, `updateStorefrontJSScript`, and a zero-argument `deleteStorefrontJSScript`; this app intentionally uses only create/update because delete semantics differ from public docs.
- The official v1 Admin GraphQL docs expose read-only `listStorefrontJSScript(storefrontId)`. Source uses a separate v1 generated client only to inspect existing remote scripts before deciding whether to update, adopt, or create.
- Each script has a `name` and `scriptContent` (a full `<script>` tag string). Script content includes Renuvex `data-renuvex-*` markers and legacy `data-ikr-*` markers so old DB ids, app name, and store markers can all be used for reconciliation.
- Scripts are attached per `storefrontId`. A merchant has one or more storefronts; we inject into all.
- `StoreSettings.storefrontScripts` has shape `{ [storefrontId]: ikasScriptId }`. Treat it as an idempotency cache; the remote ikas `StorefrontJSScript` record is the source of truth.

## When injection runs
- **Daily maintenance cron** -> `GET /api/admin/daily-maintenance`. Requires `CRON_SECRET`; runs pending upload cleanup and storefront script reconciliation.
- **Explicit reconcile** -> `GET /api/admin/reconcile-storefront-scripts`. Same `CRON_SECRET` gate and same reconciliation helper for manual/ops use.
- **OAuth callback** -> auto-injects on every install. Wrapped in try/catch so install can succeed even if injection fails.
- **Manual re-inject button** -> `POST /api/admin/inject-scripts`. Idempotent re-run.

## Logic
For each storefront:
- First, read v1 `listStorefrontJSScript(storefrontId)` when available.
- If a live app-owned script exists by DB id + app marker, app marker + store id, script name, or legacy `publicApiKey=<merchantId>` marker, adopt its id into `StoreSettings.storefrontScripts` and update it to canonical content.
- If only stale/deleted/inactive app-owned scripts exist, create a fresh active script for install/manual flows and for cron when the merchant already has a non-empty script map.
- If the v1 list read fails, fall back to the previous path: update DB id if present; recreate only on missing/deleted-script errors; otherwise create when allowed.
- Every result reports diagnostics: `remoteStatus`, `matchedBy`, `duplicateCount`, `contentMatches`, `isActive`, and `deleted`. Duplicate app-owned scripts are not deleted automatically; they are surfaced for ops follow-up.

## Fresh-Install Branch
The OAuth callback no longer calls `deleteStorefrontJSScript()`. When `StoreSettings.storefrontScripts` is empty, install/manual flows first try to adopt an existing remote app-owned script via v1 list, then create this app's loader script only if none exists.

The cron reconcile helper is still conservative: if a merchant's DB map is completely empty and no live remote app-owned script is found, it skips instead of creating blindly. Manual re-inject remains the explicit repair path for that edge case.

## Script Content
```html
<script src="<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>" async data-renuvex-app="product-reviews" data-renuvex-store-id="<merchantId>" data-ikr-app="yorum-paneli" data-ikr-store-id="<merchantId>"></script>
```
- `async` so it does not block first paint.
- `publicApiKey` is `merchantId`; it is public knowledge, not a secret.
- `name` field on the ikas record: `"yorum-paneli-widget"`.
- Script content is built by `src/lib/storefront-widget-url.ts`. The helper prefers `STOREFRONT_WIDGET_BASE_URL`, falls back to `NEXT_PUBLIC_DEPLOY_URL`, trims whitespace, and rejects localhost/private/non-HTTPS URLs unless `ALLOW_LOCAL_STOREFRONT_WIDGET_URL=true`.
- `NEXT_PUBLIC_DEPLOY_URL` is still the app/OAuth URL. It may be `http://localhost:3000` during local admin development. Do not rely on it as the canonical storefront widget URL for real stores.

## Failure Modes
- **ikas API down at install time** - try/catch swallows; merchant must hit "Re-inject" later.
- **Storefront created after install** - daily maintenance creates the missing script if this app already has at least one tracked script id for the merchant. Manual re-inject is the explicit repair path if the DB map is empty.
- **Merchant deletes our script in ikas Admin** - v1 list sees no live app script when available, or v2 update returns a missing/deleted-script failure; the fallback create path handles this without destructive cleanup.
- **App uninstall removes the remote script while the DB map survives** - reinstall/manual inject confirms via v1 list when possible; if the remote app script is gone or update returns a missing-script error such as `error_messages.theme.storefront_sf_script_not_found`, it recreates the script. The matcher must accept `not_found`, `not-found`, and `not found` variants.
- **DB map lost while remote script survives** - install/manual/cron can adopt the live app-owned script id from v1 list instead of creating a duplicate.
- **Duplicate app-owned scripts already exist** - reconciliation adopts and updates the strongest match, returns `duplicateCount`, and avoids creating another duplicate.
- **Two installs in parallel for same merchant** - possible race on `storefrontScripts` map. Acceptable today.
- **Local dev overwrites a real storefront script** - mitigated by the canonical widget URL helper.

## Notes
- Do not add post-install side effects after the script-injection block in the OAuth callback unless they are also wrapped in try/catch.
- Watch for new storefront creation: daily maintenance covers this when `storefrontScripts` already has at least one known script id. If the DB map is empty, cron only adopts an existing remote app-owned script; use manual re-inject to create a missing one.
- 2026-05-17 risk update: official docs and current MCP/generated code still differ on script mutation naming and delete arguments. Source no longer uses delete; keep it that way unless ikas provides a targeted, verified delete/list contract.
- 2026-05-22 incident/follow-up: v1 `listStorefrontJSScript` can be used as read-only evidence even though v2 MCP/codegen does not expose it. A dev-store reinstall left a stale script id in `StoreSettings.storefrontScripts`; v1 listed zero remote scripts and v2 update returned `error_messages.theme.storefront_sf_script_not_found`. The recreate matcher was widened, then v1 list adoption was added so DB-lost/live-remote and stale-id cases reconcile before creating duplicates.
- 2026-05-23 hardening: canonical script content gained `data-ikr-app` and `data-ikr-store-id`; reconciliation now reports match/remote diagnostics and duplicate counts for manual inject, install, and cron paths.
- 2026-05-24 hardening: canonical script content gained `data-renuvex-app="product-reviews"` and `data-renuvex-store-id`; runtime script discovery is marker-first and requires `publicApiKey` for unmarked URL fallback so another app's `widget.js` cannot be mistaken for this loader.

## Related Source Files
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- [src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)
- [src/app/api/admin/reconcile-storefront-scripts/route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts)
- [src/lib/reconcile-storefront-scripts.ts](src/lib/reconcile-storefront-scripts.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- [src/lib/ikas-client/v1-graphql-requests.ts](src/lib/ikas-client/v1-graphql-requests.ts)

## Obsidian Links
- [[ADR_0002_Widget_Injection_Strategy]]
- [[Auth_And_Installation_Flow]]
- [[Ikas_API_Notes]]
- [[Recurring_Problems]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
