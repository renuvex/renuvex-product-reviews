---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
last_verified: 2026-05-17
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
  - "src/lib/storefront-scripts.ts"
  - "src/lib/storefront-widget-url.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
---

# ikas Widget Injection Notes

## Summary
How `widget.js` gets onto every storefront page. Uses ikas `StorefrontJSScript` with a per-merchant `<script src=".../widget.js?publicApiKey=<merchantId>" async>`. Idempotent via DB-tracked script ids and non-destructive create/update.

## Mechanism
- The active MCP/generated client exposes `createStorefrontJSScript`, `updateStorefrontJSScript`, and a zero-argument `deleteStorefrontJSScript`; this app intentionally uses only create/update because delete semantics differ from public docs.
- Each script has a `name` and `scriptContent` (a full `<script>` tag string).
- Scripts are attached per `storefrontId`. A merchant has one or more storefronts; we inject into all.
- Our `StoreSettings.storefrontScripts` is `Json` of shape `{ [storefrontId]: ikasScriptId }` — used to update existing scripts in place rather than create duplicates.

## When injection runs
- **Daily maintenance cron** -> `GET /api/admin/daily-maintenance` ([src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)). Requires `CRON_SECRET`; runs pending upload cleanup and storefront script reconciliation while staying within Vercel's two-cron Hobby-compatible shape.
- **Explicit reconcile** -> `GET /api/admin/reconcile-storefront-scripts` ([src/app/api/admin/reconcile-storefront-scripts/route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts)). Same `CRON_SECRET` gate and same reconciliation helper for manual/ops use.
- **OAuth callback** ([src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)) — auto-injects on every install. Wrapped in try/catch (install succeeds even if injection fails).
- **Manual re-inject button** → `POST /api/admin/inject-scripts` ([src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)). Idempotent re-run.

## Logic (idempotent path)
For each storefront:
- If `existingScripts[storefrontId]` exists → `updateStorefrontJSScript({ id, scriptContent })`.
  - If update returns a missing/deleted-script failure → `createStorefrontJSScript({ ... })`; generic update failures are reported instead of blindly creating a duplicate.
- Else → `createStorefrontJSScript({ ... })` and persist new id.

## Fresh-install branch
The OAuth callback no longer calls `deleteStorefrontJSScript()`. When `StoreSettings.storefrontScripts` is empty, install/manual flows create this app's loader script per storefront and persist the returned ids. If the DB map was lost while remote scripts still exist, duplicates are possible, but that is safer than deleting scripts belonging to other apps.

The cron reconcile helper is deliberately more conservative: if a merchant's DB map is completely empty, it skips instead of creating blindly. Manual re-inject remains the explicit repair path for that edge case.

## Script content
```html
<script src="<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>" async></script>
```
- `async` so it doesn't block first paint.
- `publicApiKey` is `merchantId` — public knowledge, not a secret.
- `name` field on the ikas record: `"yorum-paneli-widget"` — used as the human-readable identifier in ikas Admin.
- Script content is built by [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts). The helper prefers `STOREFRONT_WIDGET_BASE_URL`, falls back to `NEXT_PUBLIC_DEPLOY_URL` for compatibility, trims accidental whitespace, and rejects localhost/private/non-HTTPS URLs unless `ALLOW_LOCAL_STOREFRONT_WIDGET_URL=true`.
- `NEXT_PUBLIC_DEPLOY_URL` is still the app/OAuth URL. It may be `http://localhost:3000` during local admin development. Do not rely on it as the canonical storefront widget URL for real stores.

## Failure modes
- **ikas API down at install time** - try/catch swallows; merchant must hit "Re-inject" later.
- **Storefront created after install** - daily maintenance reconcile creates the missing script if this app already has at least one tracked script id for the merchant. Manual re-inject is the explicit repair path if the DB map is empty.
- **Merchant deletes our script in ikas Admin** - `update` should return a missing/deleted-script failure; the fallback create path handles this without using destructive cleanup.
- **Two installs in parallel for same merchant** - possible race on `storefrontScripts` map. Acceptable today (rare event).
- **Local dev overwrites a real storefront script** - mitigated by the canonical widget URL helper. With the default config, `http://localhost:3000/widget.js` is rejected before an ikas update/create mutation can write it.

## Notes
- Don't add post-install side effects after the script-injection block in the OAuth callback unless they're also wrapped in try/catch — anything throwing there will leave the install in a half-done state.
- Watch for new storefront creation: daily maintenance covers this when `storefrontScripts` already has at least one known script id. If the DB map is empty, use the manual re-inject path so the merchant/operator explicitly accepts duplicate risk.
- 2026-05-15 verification: official ikas Storefront API docs expose `StorefrontJSScript` as a listable script model with `order` and `isHighPriority`, so multiple script records are possible. For this app, still prefer one loader script per storefront and load widget modules from our runtime. See [[Ikas_Storefront_Script_Capabilities]] and [[Yotpo_Style_Widget_Modular_Architecture]].
- 2026-05-17 risk update: official docs and current MCP/generated code still differ on script mutation naming and delete arguments. Source no longer uses delete; keep it that way unless ikas provides a targeted, verified delete/list contract.
- 2026-05-17 config update: local app development and public storefront widget hosting are separated. Set `STOREFRONT_WIDGET_BASE_URL` to the public Vercel/custom-domain origin in local, preview, and production environments when real ikas storefront script records may be written.

## Related Source Files
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)
- [src/app/api/admin/daily-maintenance/route.ts](src/app/api/admin/daily-maintenance/route.ts)
- [src/app/api/admin/reconcile-storefront-scripts/route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts)
- [src/lib/reconcile-storefront-scripts.ts](src/lib/reconcile-storefront-scripts.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)

## Obsidian Links
- [[ADR_0002_Widget_Injection_Strategy]]
- [[Auth_And_Installation_Flow]]
- [[Ikas_API_Notes]]
- [[Recurring_Problems]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
