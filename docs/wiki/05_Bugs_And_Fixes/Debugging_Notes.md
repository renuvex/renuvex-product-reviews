---
type: bug
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-10
tags:
  - debugging
  - howto
related:
  - "[[Index]]"
  - "[[Bug_Index]]"
---

# Debugging Notes

> Recipes and tools for the most common debugging scenarios.

## Local debugging

### Tail the dev server
- `pnpm dev` — Next dev with `--webpack`. Check terminal for `console.error` from API routes.
- The `ikas.config.json` sets port 3000.

### Inspect Postgres
- `pnpm prisma:studio` — visual table browser at `http://localhost:5555`.
- Direct queries: use `psql` with `DIRECT_URL`.

### Tail Vercel logs
- Vercel dashboard → project → Logs.
- Search by `[scope] ERROR` to find structured server errors.

## Widget debugging

### On a real storefront
- Open browser devtools on a merchant storefront. Verify the widget script loaded.
- Look for `IKR` log messages in console (the widget logs lifecycle events).
- Check Network tab for `/api/public/*` calls; status, response shape, cache hit/miss (Vercel `x-vercel-cache` header).

### In the admin preview iframe
- Open `/preview` directly in a tab to debug the iframe HTML page.
- Open it inside the admin (where it sits in `WidgetEditor.tsx`) to test the postMessage protocol.
- The settings update protocol: admin posts `IKR_SETTINGS_UPDATE`, widget posts back `IKR_WIDGET_READY`.

### Review detail lightbox
- Use `/preview` to open the photo strip and click a review image. The lightbox path is [review-modal.js](src/widget/product-widget/review-modal.js), not the submission wizard.
- Test both first-page reviews and reviews inserted by "Daha Fazla Goster"; caller-provided review slices affect previous/next navigation.
- Test gallery layout long-text reviews with no images; this is tracked in [[Bug_Review_Detail_Lightbox_Risks]].
- Check body scroll lock interactions against real storefront drawers or menus, not only the preview iframe.

### Bundle size investigation
- `node --print "require('fs').statSync('public/widget.js').size"` for raw byte count.
- esbuild `metafile` if needed: temporarily add `metafile: true` to `scripts/build-widget.mjs` and dump for analyze.

## OAuth / install debugging

### Manual re-trigger of install flow
- Visit `<DEPLOY_URL>?storeName=<merchant-store-name>` in a browser (logged out of ikas Admin) to start the OAuth dance.
- Server logs show `[scope] ERROR` for callback failures.

### Verify HMAC signature locally
- HMAC-SHA256 hex-digest of `code` with `CLIENT_SECRET`.
- See [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts).

### Token refresh
- Force expiry: in Studio, set `expireDate` on `AuthToken` to past ISO string. Next ikas call should refresh and update.

## DB query performance

- `EXPLAIN ANALYZE` via `psql` to verify index usage on `Review` queries.
- Profile real queries by adding `process.env.PRISMA_LOG = 'query'` in dev and checking dev-server output.

## Common gotchas

- **`document` references at module load** — must be SSR-guarded. `core/config.js` is a reference for the pattern.
- **Forgetting to commit `public/widget.js`** after a widget change — deploy ships old bundle. Add to your PR checklist.
- **Forgetting `pnpm codegen`** after editing `graphql-requests.ts` — TS types go stale.
- **Mismatched `NEXT_PUBLIC_DEPLOY_URL`** — OAuth redirect_uri won't match what's registered with ikas; install fails.
- **`x-vercel-cache: HIT` on edge** — your code change won't show up for up to 360s on cached endpoints. Wait or bump query string.
- **Migration drift** — `pnpm prisma:migrate` locally vs the deployed `migrate deploy`. If you reset local DB, do `pnpm prisma:init`, not `prisma:migrate`.

## Obsidian Links
- [[Bug_Index]]
- [[Recurring_Problems]]
- [[Caching_And_Performance]]
- [[Auth_And_Installation_Flow]]
- [[Product_Review_Lightbox]]
- [[Bug_Review_Detail_Lightbox_Risks]]

## Change Log
- 2026-05-10: Added debugging checklist for the photo review detail lightbox and its current open risks. Related source: [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
