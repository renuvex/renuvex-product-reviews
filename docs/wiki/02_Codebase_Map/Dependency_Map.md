---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-03
last_verified: 2026-07-03
tags:
  - dependencies
related:
  - "[[Index]]"
  - "[[ADR_0001_Project_Stack]]"
  - "[[Folder_Structure]]"
---

# Dependency Map

> What each runtime dep does and what would happen if we removed/replaced it. Versions taken from [package.json](package.json).

## Framework / runtime

| Package | Version | Used for | Notes |
|---|---|---|---|
| `next` | 16.2.1 | App Router, edge/SSR, route handlers | Don't pin to canary; upgrade carefully — App Router APIs evolve |
| `react`, `react-dom` | ^19 | Admin UI | React 19 features in use; check before downgrading |
| `typescript` | ^5 | Admin source typing | Widget is JS — not affected |

## ikas integration

| Package | Used for |
|---|---|
| `@ikas/admin-api-client` | OAuth helpers (`OAuthAPI`) + GraphQL client (`ikasAdminGraphQLAPIClient`) |
| `@ikas/app-helpers` | `AppBridgeHelper.closeLoader()`, `getTokenForIframeApp` (called from `TokenHelpers`) |

## DB / persistence

| Package | Used for |
|---|---|
| `prisma` / `@prisma/client` | ORM + migrations |
| `@upstash/redis` | Rate-limit counters (REST API, no socket — works in serverless) |

## Auth / security

| Package | Used for |
|---|---|
| `iron-session` | Encrypted cookie session (OAuth state CSRF) |
| `jsonwebtoken` | HS256 JWT issuance/verification |
| `uuid` | JWT `jti`, Review IDs (default in Prisma too) |
| `zod` | Request validation |

## Storefront widget build

| Package | Used for |
|---|---|
| `esbuild` | Bundles `src/widget/*` → `public/widget.js` |

## Storage / external services

| Package | Used for |
|---|---|
| `@aws-sdk/client-s3`, `@aws-sdk/s3-presigned-post` | AWS review-image presigned POST, object validation, tagging/metadata, variant publish/revoke/cleanup, and scoped S3 listing. |
| `@aws-sdk/client-cloudfront`, `@aws-sdk/cloudfront-signer` | CloudFront invalidation and short-lived signed admin preview URLs. |
| `@vercel/oidc-aws-credentials-provider` | Vercel OIDC-backed AWS runtime credentials; avoids static AWS access keys in Vercel env. |
| `sharp` | Direct image decode/metadata stripping/variant generation for AWS review images. |
| `@mux/mux-node`, `@mux/mux-player`, `@mux/upchunk` | Mux review-video upload, admin/public playback, and chunked browser upload UX. |

The legacy image SDK was removed during the AWS-only review-image teardown source pass; provider SDK dependency checks should stay empty.

## UI

| Package | Used for |
|---|---|
| `tailwindcss` v4, `@tailwindcss/postcss`, `postcss` | Styling |
| `tw-animate-css` | Animation utilities |
| `@radix-ui/react-dialog`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `radix-ui` | shadcn primitives |
| `class-variance-authority`, `clsx`, `tailwind-merge` | Tailwind class composition |
| `lucide-react` | Icon set in admin |
| `react-colorful` | Color picker in widget settings |
| `sonner` | Toasts |
| `next-themes` | Light/dark theme provider in admin |

## HTTP / utilities

| Package | Used for |
|---|---|
| `axios` | Frontend → backend bridge (`src/lib/api-requests.ts`) |
| `graphql-request` | Required by ikas client / codegen |
| `moment` | Token expiry math (`onCheckToken`). Could be replaced by `date-fns` or native `Date`; not urgent. |

## Codegen

| Package | Used for |
|---|---|
| `@graphql-codegen/cli` | `pnpm codegen` |
| `@graphql-codegen/typescript`, `typescript-operations`, `typescript-graphql-request` | Generators |

## Lint

| Package | Used for |
|---|---|
| `eslint`, `eslint-config-next`, `eslint-plugin-react-hooks` | Linting |
| `@typescript-eslint/eslint-plugin`, `parser` | TS rules |

## Testing

| Package | Used for |
|---|---|
| `@playwright/test` | Browser smoke tests for built storefront widget assets, admin preview fixture, lightbox/wizard flows, and network/chunk contracts |
| `vitest` | Node unit tests for public API routes and pure storefront theme-state helpers |

## Notes
- Notable absent: date-fns. The main automated test gap is no longer "no test runner"; remaining gaps are live-auth ikas dashboard smoke, live post-deploy storefront smoke, Sentry health checks, and future transfer-size budgets. See [[Test_Strategy]].
- `moment` is large; if size matters, it's an easy candidate to replace with native `Date`/`Intl` or date-fns.
- `radix-ui` (the umbrella package) AND individual `@radix-ui/react-*` packages are both listed. The umbrella may be redundant — verify before next dep cleanup.
- Pin `pnpm` to `10.4.1` via `packageManager` field — keep that aligned across machines.

## Related Source Files
- [package.json](package.json)
- [pnpm-lock.yaml](pnpm-lock.yaml)

## Obsidian Links
- [[ADR_0001_Project_Stack]]
- [[Folder_Structure]]
