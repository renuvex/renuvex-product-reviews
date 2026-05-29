---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-28
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - testing
  - ci
  - widget
  - quality-gate
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[Widget_Performance]]"
  - "[[Backend_API_Map]]"
  - "[[Theme_Adapter_Playbook]]"
source_files:
  - "package.json"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - ".github/workflows/widget-smoke.yml"
  - ".github/pull_request_template.md"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "tests/unit/widget-surface-contracts.test.ts"
  - "tests/unit/structured-data-jsonld.test.ts"
  - "docs/wiki/08_Widgets/Structured_Data_And_Rich_Snippets.md"
  - "docs/wiki/10_Research/Widget_Transfer_Measurement_2026-05-29.md"
  - "docs/wiki/10_Research/Structured_Data_Verification_2026-05-29.md"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/review-form-modal/index.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/lib/storefront-theme.ts"
---

# Test Strategy

## Summary
The automated test suite has five layers: widget network/chunk contracts, widget layout/runtime rendering, storefront interactions, admin preview/settings behavior, and backend/theme-state unit tests. The suite is designed to catch regressions in public widget behavior without depending on real ikas auth, production DB data, Cloudinary uploads, or live merchant credentials.

## Layers

| Layer | Command | Scope |
|---|---|---|
| Widget network/chunk smoke | `pnpm test:widget-smoke` | Built `public/widget.js` and content-hashed runtime chunks; validates API fan-out, lazy chunk boundaries, badge/review/structured-data combinations, unsupported theme behavior, listing fallback gating, and local transfer evidence without byte-budget gating. |
| Widget layout/runtime smoke | `pnpm test:widget-runtime` | Pairwise summary/review layout matrix (`classic`, `compact`, `hero`, `minimal`, `split` x `card`, `list`, `gallery`), photo strip toggles, badge/JSON-LD presence, hostile host-theme CSS isolation (a light-DOM `img{width:100%!important}` balloons a control image but cannot reach the shadow-hosted review thumbnail — ADR_0021 regression), and unexpected console errors. |
| Storefront interactions | `pnpm test:widget-interactions` | Photo-strip lightbox, review-image lightbox, keyboard close, review wizard validation, step flow, and mocked review submit. |
| Admin preview/settings | `pnpm test:admin-preview` | Preview `postMessage` update path, layout/icon/color/toggle effects, and static `widgetDefs.ts` option/showWhen alignment with widget registries. |
| Unit/API/theme state | `pnpm test:unit` | Public API route behavior, review GET filters, review POST validation/rate-limit/profanity/image-policy/approval branches, widget-error sanitization, and storefront theme stable/pending/generic/fail-closed helpers. |

`pnpm test:ci` runs the five layers together. `.github/workflows/widget-smoke.yml` uses Node 24 runtime action majors, runs `pnpm prisma:generate` first so Linux CI has the generated Prisma client, then runs `pnpm build:widget`, installs Chromium, runs `pnpm test:ci`, syntax-checks generated widget assets with `pnpm check:widget-js`, then runs TypeScript, lint, and whitespace gates.

## Evidence Commands
These commands are not hard byte-budget gates. They produce repeatable production evidence for review, deploy notes, and future budget calibration:

| Command | Scope |
|---|---|
| `pnpm measure:deployed-widget` | Loads deployed `widget.js` and immutable `widget-runtime/*` chunks from `https://new-ikas-app.vercel.app`, mocks merchant HTML plus `/api/public/*`, and reports script count, chunk list, encoded transfer bytes, decoded bytes, API calls, and cache/content-encoding headers for mount-present/mount-absent and badge-on/badge-off combinations. |
| `pnpm verify:deployed-jsonld` | Loads the deployed widget in a controlled browser harness and verifies the JSON-LD runtime contract: visible rating/review paths emit one parseable `Product` + `AggregateRating`, no-visible-surface and rich-snippet-disabled paths emit none. `SEO_PDP_URL=<public-url>` switches it to a real public PDP URL check. |

Record notable evidence in `docs/wiki/10_Research/` instead of adding brittle byte thresholds immediately.

## Test Harness
`tests/widget-harness.ts` serves a fake widget origin and a fake ikas-like merchant page. Tests intercept `/api/public/*` requests and Cloudinary image URLs, so browser tests exercise real built widget files while keeping external services mocked. This is deliberate: source imports are useful for unit tests, but widget smoke tests must validate the browser-visible loader/runtime shape.

## Review API Matrix
The highest-risk public write surface is `POST /api/public/reviews`. Unit tests cover:

- syntactic validation before rate-limit/storage,
- profanity rejection before rate-limit/storage,
- Redis fixed-window rate-limit behavior,
- trusted Cloudinary image policy and pending-image cleanup,
- store/product target verification before write,
- approval policy modes (`manual`, `all`, `5stars`, `4plus`, and boolean legacy values).

`GET /api/public/reviews` tests cover pagination clamp, sorting, rating filters, `hasImages=true`, safe missing-Cloudinary behavior, cache headers, author masking, rating distribution, and approved-only reads.

## Combination Strategy
The suite uses risk-based pairwise coverage instead of a full cartesian matrix. Full cartesian layout x icon x color x toggle x theme coverage would become slow and noisy. New layout or surface work should add the smallest matrix that covers:

- one representative happy path,
- one disabled/gated path,
- one unsupported-theme or missing-mount path when relevant,
- one interaction path if the surface opens a modal, lightbox, carousel, or form,
- one static schema/settings assertion if admin config controls the surface.

## What Is Not Automated Yet
- Real authenticated ikas dashboard iframe flows are not in CI. They still need manual-auth smoke or a future test-auth harness.
- Live dev-store post-deploy smoke is not replaced by CI. Runtime-affecting widget changes should still be checked on the dev storefront after deploy.
- Sentry production health checks are not part of CI. Use Sentry MCP or the dashboard after deploys that change runtime error reporting.
- Transfer-size budgets are not enforced yet. Current network tests attach local transfer evidence and assert relative behavior, not byte ceilings.
- Google Rich Results / Search Console verification is not in CI. Runtime JSON-LD is automated; search-engine rendering remains a live SEO playbook item.

## Change Rule
When adding a new storefront surface such as carousel, FAQ, popup, Q&A, or another review section mode, update the matching test layer in the same commit. The default expectation is:

- surface/lazy-boundary change -> widget network smoke;
- layout or render change -> widget runtime smoke;
- modal/lightbox/wizard change -> interaction smoke;
- admin setting or preview change -> admin preview smoke and static schema assertions;
- public API/theme-state change -> unit tests.

The PR template repeats this rule as a checklist. If a change intentionally does not need a test update, the PR should state why.

`tests/unit/widget-surface-contracts.test.ts` enforces the surface part of this rule automatically. Every `src/widget/surfaces/*.surface.js` file must have a `SURFACE_TEST_CONTRACTS` entry that names the relevant layer and test files. This is intentionally explicit: adding a new surface without thinking through network/runtime/interaction/admin/unit coverage should fail before merge.

## Related Source Files
- [package.json](package.json)
- [playwright.widget.config.ts](playwright.widget.config.ts)
- [vitest.config.ts](vitest.config.ts)
- [.github/workflows/widget-smoke.yml](.github/workflows/widget-smoke.yml)
- [tests/widget-harness.ts](tests/widget-harness.ts)
- [tests/](tests/)

## Obsidian Links
- [[Widget_Architecture]]
- [[Widget_Performance]]
- [[Backend_API_Map]]
- [[Theme_Adapter_Playbook]]
