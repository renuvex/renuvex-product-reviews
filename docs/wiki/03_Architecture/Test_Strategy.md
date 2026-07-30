---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-28
updated: 2026-07-30
last_verified: 2026-07-30
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
  - "playwright.media.config.ts"
  - "playwright.review-center.config.ts"
  - "vitest.config.ts"
  - "vitest.integration.config.ts"
  - ".github/workflows/widget-smoke.yml"
  - ".github/workflows/media-cross-browser.yml"
  - ".github/workflows/database-compatibility.yml"
  - ".github/pull_request_template.md"
  - "scripts/check-generated-artifacts.mjs"
  - "scripts/run-ci-build.mjs"
  - "scripts/test-review-email-cloudformation-contract.mjs"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/check-widget-performance-budget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/measure-storefront-waterfall.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - "scripts/verify-supabase-data-api-surface.mjs"
  - "tests/unit/supabase-data-api-surface-audit.test.ts"
  - "tests/integration/supabase-data-api-surface.test.ts"
  - "tests/widget-harness.ts"
  - "tests/review-center-browser.spec.ts"
  - "tests/integration/review-email-batch-db-guarantees.test.ts"
  - "tests/integration/review-email-installation-fence.test.ts"
  - "tests/unit/review-email-erasure.test.ts"
  - "tests/unit/ikas-installation-lifecycle.test.ts"
  - "tests/unit/review-email-batch-jobs.test.ts"
  - "tests/unit/review-email-maintenance.test.ts"
  - "tests/unit/review-email-pii.test.ts"
  - "tests/unit/review-email-ses-events.test.ts"
  - "tests/unit/review-email-eligibility.test.ts"
  - "tests/unit/review-email-batching.test.ts"
  - "tests/unit/review-email-settings.test.ts"
  - "tests/unit/review-email-order-sync.test.ts"
  - "tests/unit/review-email-ikas-send-preflight.test.ts"
  - "tests/unit/review-email-retention.test.ts"
  - "tests/unit/review-email-batch-schema.test.ts"
  - "tests/unit/review-email-v5-schema.test.ts"
  - "tests/unit/prisma-schema-layout.test.ts"
  - "tests/helpers/read-prisma-schema.ts"
  - "tests/unit/review-email-tokens.test.ts"
  - "tests/unit/review-email-disabled-public-routes.test.ts"
  - "tests/unit/review-email-public-route.test.ts"
  - "tests/unit/review-request-origin.test.ts"
  - "tests/unit/cors-boundaries.test.ts"
  - "tests/unit/widget-health.test.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-media-cross-browser.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/oauth-state.test.ts"
  - "tests/unit/oauth-routes.test.ts"
  - "tests/unit/token-helpers.test.ts"
  - "tests/unit/video-upload-routes.test.ts"
  - "tests/unit/video-upload-error.test.ts"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/media-session-creation.test.ts"
  - "tests/unit/media-reconciliation.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
  - "tests/unit/admin-video-preview-contract.test.ts"
  - "tests/unit/review-summary.test.ts"
  - "tests/integration/review-email-installation-fence.test.ts"
  - "tests/integration/review-email-v5-db-guarantees.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "tests/unit/widget-surface-contracts.test.ts"
  - "tests/unit/structured-data-jsonld.test.ts"
  - "tests/unit/widget-icon-sprite.test.ts"
  - "tests/unit/widget-theme-vars.test.ts"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/unit/widget-asset-cache.test.ts"
  - "tests/unit/widget-video-poster-quality.test.ts"
  - "tests/unit/widget-settings.test.ts"
  - "tests/unit/widget-editor-state.test.ts"
  - "tests/unit/widget-settings-load-state.test.ts"
  - "tests/unit/widget-preview-load-state.test.ts"
  - "tests/unit/widget-origin.test.ts"
  - "tests/unit/widget-worker.test.ts"
  - "tests/unit/layout-contracts.test.ts"
  - "tests/unit/pagination-page-list.test.ts"
  - "vercel.json"
  - "docs/wiki/08_Widgets/Structured_Data_And_Rich_Snippets.md"
  - "docs/wiki/10_Research/Widget_Transfer_Measurement_2026-05-29.md"
  - "docs/wiki/10_Research/Structured_Data_Verification_2026-05-29.md"
  - "src/widget/observer.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/state.js"
  - "src/widget/core/origins.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/review-modal.js"
  - "src/widget/reviews-section/video-playback.js"
  - "src/widget/reviews-section/review-form-modal/index.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "src/components/home-page/widgets/widgetDefs.ts"
  - "src/components/home-page/widgets/editor/WidgetEditor.tsx"
  - "src/components/home-page/widgets/editor/WidgetEditorState.ts"
  - "src/components/home-page/widgets/editor/WidgetSettingsLoadState.ts"
  - "src/components/home-page/widgets/editor/WidgetPreviewLoadState.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/lib/storefront-theme.ts"
  - "src/lib/review-media.ts"
  - "workers/widget-delivery/src/index.ts"
  - "wrangler.widget.jsonc"
  - "config/widget-performance-budget.json"
---

# Test Strategy

## Agent Brief
Use this page before changing widget runtime, public APIs, admin media preview,
upload/media providers, cleanup jobs, Cloudflare Worker delivery, or release
gates. Current suite shape: unit tests cover backend/provider contracts;
Playwright widget projects cover runtime, interactions, and media behavior; and
Worker delivery has separate dry-run/build/budget gates. Do not run every test
blindly for tiny changes; choose focused tests from the touched layer, then add
broader gates when the change crosses provider, widget, or public API
boundaries.

## Summary
The automated test suite covers widget network/chunk contracts, widget layout/runtime rendering, storefront interactions, cross-browser review media, admin preview/settings behavior, the isolated review center, and backend/database contracts. The suite is designed to catch regressions without depending on real ikas auth, production DB data, AWS/Mux provider uploads, or live merchant credentials.

## Worker Delivery Gates
Cloudflare Worker widget delivery has a separate local gate because it validates an edge asset target without deploying it:

| Command | Scope |
|---|---|
| `pnpm worker:widget:prepare-assets` | Copies only current manifest outputs plus retained committed widget runtime hashes into `.tmp/widget-worker-assets`. |
| `pnpm worker:widget:types` | Regenerates the Worker binding types from `wrangler.widget.jsonc` without importing Cloudflare runtime DOM types into the main app type-check. |
| `pnpm worker:widget:deploy:dry-run` | Validates the Worker script, Static Assets binding, and Wrangler config without deploying or changing Cloudflare state. |

Unit coverage for this layer lives in `tests/unit/widget-origin.test.ts` and `tests/unit/widget-worker.test.ts`. It pins split-origin parsing, asset cache headers, CORS, `/__health`, and `/api/*` fail-closed behavior.

## Layers

| Layer | Command | Scope |
|---|---|---|
| CloudFormation IaC lint | `pnpm aws:lint-templates` | Runs `cfn-lint` against committed AWS CloudFormation templates with their deployment regions (`eu-central-1` for S3/CloudFront review-image and widget stacks, `us-east-1` for CloudFront global observability/log delivery). CI installs pinned `cfn-lint==1.52.1` before this gate. |
| Review-email IaC contracts | `pnpm aws:review-email:validate-templates` | Runs strict UTF-8/JSON/canonical-digest fixtures plus semantic access, foundation, and journal validators. It rejects author/operator privilege overlap, omitted or unexpected resource types, malformed provenance tags, unsafe rollback/finalization contracts, wrong event sets, and policy drift that schema-only lint cannot detect. Fixtures also pin committed-source ancestry and blob reads, placeholder-stack service-role evidence, existing-stack update evidence, the one exact dependency-only SSO assignment signature, deterministic stack-policy materialization for both conditional HTTPS subscription states, and the top-level SES v2 `FeedbackForwardingStatus` live response path; arbitrary conditional replacement remains forbidden. The non-live command is required in CI; IAM simulation, Access Analyzer, and live verifiers remain read-only pre-mutation gates because CI has no production AWS credentials. |
| Widget performance budget | `pnpm budget:widget` | Deterministic local artifact budget after `pnpm build:widget`; fails on loader/runtime/always-loaded graph, major lazy surface graph, largest output, or manifest-count regressions. Live deployed request budgets stay report-only via `pnpm budget:widget:network`. |
| Widget network/chunk smoke | `pnpm test:widget-smoke` | Built `public/widget.js` and content-hashed runtime chunks; validates API fan-out, lazy chunk boundaries, badge/review/structured-data combinations, unsupported theme behavior, listing fallback gating, SPA product retirement without false health telemetry, and local transfer evidence without byte-budget gating. `tests/unit/widget-health.test.ts` separately pins that lifecycle-retired probes stay quiet while relevant missing nodes still report. |
| Widget layout/runtime smoke | `pnpm test:widget-runtime` | Pairwise summary/review layout matrix (`classic`, `compact`, `hero`, `minimal`, `split` x `card`, `list`, `gallery`), rating bar keyboard filtering + badge/summary isolation, compact mobile accordion persistence/motion after rating-bar filter renders, large localized bar-count layout, media gallery toggles, badge/JSON-LD presence, hostile host-theme CSS isolation (a light-DOM `img{width:100%!important}` balloons a control image but cannot reach the shadow-hosted review thumbnail — ADR_0021 regression), and unexpected console errors. |
| Storefront interactions | `pnpm test:widget-interactions` | Media-gallery lightbox, review-image lightbox, summary filter/popover light-dismiss, keyboard close, review wizard validation, step flow, mocked review submit, and body-scroll-lock regression (opening either overlay locks scroll on BOTH `<html>` and `<body>` and restores on close — ADR_0025). |
| Cross-browser review media | `pnpm test:widget-media` | Local fast path runs Chromium desktop only. CI runs PR media coverage as isolated matrix jobs for Chromium desktop, Pixel Android emulation, and iPhone WebKit emulation. The scheduled cross-browser workflow adds Firefox desktop and desktop WebKit. The suite pins poster-first card/list/gallery rendering, size presets, no list autoplay/preload, Mux Player lightbox attributes, browser-back cleanup, Mux direct-upload wizard submit, and video-to-image navigation cleanup. |
| Admin preview/settings | `pnpm test:admin-preview` | Versioned exact-context preview render path, production Reviews renderer, production PDP/listing Badge injectors, complete-map cross-widget icon/color dependencies, Badge alignment/value/count/size controls, no preview API calls, reset-to-top scroll behavior, nested-iframe wheel recovery after a modal pointer-lock cycle, and static `widgetDefs.ts` option/showWhen alignment with widget registries. |
| Prisma multi-file schema | `pnpm prisma:validate`, `pnpm prisma:generate`, `pnpm test:prisma-schema` | Resolves `./prisma` explicitly, refuses model-free generation, restricts schema files to the root entrypoint plus `prisma/models/**`, rejects duplicate model declarations, and requires the discovered model set to equal generated `Prisma.ModelName`. CI runs format a second time and requires a clean Prisma diff. |
| Migration-free application build | `pnpm build:ci` | Uses synthetic CI values for the application build, generates Prisma, deterministically rebuilds and verifies widget artifacts, then runs `next build --webpack`. Widget regeneration reuses the committed manifest timestamp and the committed public widget origins so exact generated files can be compared; it performs no network call and skips time-based retention pruning. The command never runs migrations, live installation checks, provider calls, or Sentry source-map upload. The Vercel-only `pnpm build` contract remains separate because it applies migrations and checks live installation state. |
| Ikas generated-client drift | `pnpm codegen:check` | Regenerates both official Ikas schema clients and enum globals from the public v1/v2 schema endpoints, then requires the exact generated files to remain clean. Provider unavailability or schema drift fails this independent contract job instead of weakening the application build. |
| Generated widget drift | `pnpm build:widget:ci` | Rebuilds with the committed manifest timestamp and public-origin contract, skips time-based retention pruning, then checks tracked changes and untracked output under `public/widget.js` and `public/widget-runtime/**`. Content-hashed artifacts retained by the build contract are allowed only when already represented by the committed output set. |
| Unit/API/theme state | `pnpm test:unit` | Public API route behavior, product review summary read-model helpers, review GET filters, review POST validation/rate-limit/profanity/image-policy/approval branches, fixed GET/POST public-error sanitization, strict HS256/claim/header admin auth, exact active installation/token authorization, token-refresh row-revision compare-and-set, aggregate verifier fail-closed shapes, explicit anonymous/beacon/no-CORS policy isolation, legacy review-request exact-origin ordering, review-center same-origin matching, storefront theme stable/pending/generic/fail-closed helpers, surface test contracts, popover registry lifecycle contract, stable widget asset cache headers, and the overlay shared-surface invariant (scroll-lock / focus-trap primitives live only in their shared modules — ADR_0025). Vitest runs these unit files with one worker. Heavy route modules in the feature-disabled, legacy review-request, and admin-settings suites are imported during file collection rather than inside the timed assertion, so module transform load cannot create a false timeout and the default bounded timeout remains sufficient instead of being widened enough to hide a real hang. |
| Review-center browser | `pnpm test:review-center` | Isolated `reviews.renuvex.app`-style flow with mocked network: fragment token exchange/removal, session item reads, independent Product A submit, Product B continuation/skip, and terminal batch state. It does not send email or call AWS/Mux. |
| Review-email DB guarantees | `pnpm test:integration:review-email` | Test against an explicitly supplied local disposable PostgreSQL DB. It refuses non-local hosts and requires `DATABASE_URL` to equal `REVIEW_EMAIL_INTEGRATION_DATABASE_URL`; it proves install/DSR/retention guarantees plus batch fingerprint/live-group races, product membership uniqueness, job target checks, cross-store composite FKs, provider-neutral event dedupe, attempt evidence retention, DSR/event lock ordering, journal replay equivalence, and disable/re-enable behavior around committed versus uncommitted attempts. It also proves old JWT rejection after uninstall/reinstall, exact-token reauthorization semantics, unchanged-refresh-token row-revision CAS, and that an uninstall winning the installation lock prevents a stale final admin write. The uninstall suite additionally proves activation atomically stales nonterminal older runs, an exhausted old generation cannot delete a reinstalled token/review, concurrent duplicate app-deleted deliveries share one run, and restore replay cannot cross a newer generation/activation fence. Exact-identity coverage includes same-folded/different-exact collision isolation, retained-key lookup, real retention detaching an unsubscribe token from its attempt, old-link suppression without ciphertext, normal/journal DSR deletion, and legacy progress/payload compatibility. Migrations must be applied first. GitHub runs migration status, migrations-to-database diff, migrations-to-multi-file-datamodel diff, Data API/RLS checks, and the integration suite on disposable PostgreSQL 17 for every PR and main push; PostgreSQL 16 is the scheduled and database-path N-1 compatibility gate. Both jobs use a shadow database distinct from the integration database and set Prisma's disposable-test pool explicitly to 10 connections because the lock-order tests intentionally hold several concurrent transactions and the CPU-derived Prisma v6 default can be only 3 on a hosted runner. Neither job can use a non-local database URL. |

OAuth state coverage is split between `oauth-state.test.ts` and
`oauth-routes.test.ts`. The service suite pins 256-bit generation, hashed key
material, `SET NX EX 600`, atomic `GETDEL`, wrong-browser isolation, strict
store-name canonicalization, a hashed one-restart dashboard marker, and
fail-closed Redis behavior. Route coverage proves a dashboard callback without
state discards its code and restarts once without leaking it, repeated
state-less callbacks cannot loop, malformed/expired/replayed/wrong-browser/
wrong-store state cannot reach ikas token exchange, an invalid supplied
signature does not consume state or claim bootstrap, parallel pending states
remain independent, and logs exclude callback credentials.
`token-helpers.test.ts` pins the post-install boundary: a cold iframe obtains
its JWT from AppBridge, valid cache entries remain authorized-app scoped,
expired or malformed entries are replaced, base64url JWT payloads are decoded,
missing app identity fails closed, and non-iframe pages cannot invoke AppBridge.
Route tests additionally require the
successful OAuth response to return directly to the frozen-store ikas Admin
target without a query string and with `no-store`/`no-referrer`.

Admin-auth coverage is in `admin-auth-boundary.test.ts` and
`admin-auth-installation-fence.test.ts`. It rejects HS384/HS512, malformed
headers, missing or wrong claim types, expired tokens, missing secrets,
inactive/mismatched installations, tenant-mismatched tokens, and stale
reinstall JWTs. Route tests pin reviews/settings final-fence invocation and
`401` lifecycle-race responses. PostgreSQL 16/17 runs prove the final write
fence under a real uninstall race and serialize an exact-pair read against
same-store reauthorization. `verify:ikas-installation-auth` is a separate
read-only deploy gate; it emits only aggregate drift counts and rejects empty,
multi-row, negative, or non-numeric audit results.

Review-email cutoff coverage pins the historical-delivery invariant separately:
unit tests require exact delivered-line `statusUpdatedAt`, reject generic
package/order timestamp fallbacks, use the latest timestamp for a multi-line
product, preserve the reconciliation discovery window for pre-enable orders,
fail closed on missing cutoff or click-and-collect transition evidence, and
prove that explicit `null` evidence cannot trigger a batching fallback. The DB
integration suite proves disable cancels only pre-commit work, a committed
attempt remains non-resendable, and re-enable establishes a new cutoff without
reviving cancelled backlog. Clean PostgreSQL 16 and 17 migration/application
runs are required for this package.

Review-email contract-hardening coverage also pins identity and ambiguous-send
behavior. Canonicalization tests preserve local-part case for exact identity,
lowercase only the folded policy identity, retain Gmail dots and plus tags, and
reject malformed/unsupported addresses. Lifecycle-owner tests prove the
token/session revocation matrix rather than duplicating it in a mock-only meta
test: intermediate item actions retain siblings; terminal batch, recipient
change, DSR, uninstall, and provider failure close the required access; post-send
disable stops future email while retaining an existing review link; and expired
credentials never revive. Maintenance prioritizes persisted
`confirmationDeadlineAt`, uses provider-call timestamps for legacy null rows,
and keeps `outcome_unknown` terminal and non-resendable while allowing late
signed evidence.

Disabled-runtime route coverage deliberately removes both
`REVIEW_EMAIL_ENABLED` and `REVIEW_REQUEST_PUBLIC_BASE_URL`, then calls legacy
and batch token/session/item/submit/skip endpoints. Every endpoint must return
`404 not_found` before host, origin, token, rate-limit, or persistence work.
This reproduces the 2026-07-20 Production acceptance finding without requiring
the deferred `reviews.renuvex.app` DNS or activation secrets. Unsubscribe is not
part of this gate because an already issued preference link must remain usable
after future sending is disabled.

2026-07-20 disabled-route fix-forward evidence: focused public-route tests
passed `12/12`, the full unit suite passed `578/578`, and the review-center
browser flow passed `1/1`. TypeScript, ESLint, the Next.js production build,
wiki changed-source audit (`Errors: 0`), and diff checks also passed. No schema
or migration changed, so this checkpoint does not supersede the PostgreSQL
16/17 migration and integration evidence below.
Production deployment `dpl_5KHmYepsDxhVbKoHMN9JPRA2g82s` then passed the same
six disabled-route behaviors through `app.renuvex.app`: each returned
`404 not_found` with `private, no-store`.

2026-07-16 local evidence: the full unit suite passed `556/556`; the
review-email PostgreSQL integration suite passed `26/26` after all 58 migrations
on disposable PostgreSQL 16 and independently `26/26` on PostgreSQL 17. Prisma
generation, TypeScript, ESLint, and the Next.js webpack production build passed.
These are local disposable-database results, not production migration evidence.

2026-07-28 Supabase surface evidence: PostgreSQL 16 and 17 were bootstrapped
with `anon`, `authenticated`, and `service_role` plus intentionally broad
pre-migration schema/default grants. All 60 migrations then applied. The
read-only surface verifier reported zero RLS/grant/default-ACL drift and
`runtimeRlsCompatible=true`; a real `StoreSettings` Prisma create/read/delete
smoke passed on both versions. Production then applied all 60 migrations; the
same verifier passed against production. After the hosted Data API was
disabled, legacy anon, publishable, and secret-key REST/GraphQL probes produced
no `2xx`, server-side Prisma remained compatible, and the production app
returned HTTP `200`.

`pnpm test:ci` remains the core non-media browser/unit bundle: unit tests,
widget network smoke, widget runtime smoke, storefront interactions, and admin
preview. `.github/workflows/widget-smoke.yml` keeps independent merge-gate jobs
for this quality gate, the migration-free Next.js build, review-center
Chromium, disposable PostgreSQL 17 contracts, live-schema Ikas codegen drift,
and the three-project PR media matrix. The quality job also requires generated
widget cleanliness and the full wiki audit. Every action is pinned to a full
commit SHA, workflow permissions are `contents: read`, checkout credentials are
not persisted, jobs have timeouts, and superseded runs on the same PR/ref are
cancelled. No CI job receives a GitHub environment, production secret, or
provider deployment credential.

The private/free repository cannot currently mark these jobs as technically
required branch checks. The operational release rule is therefore branch plus
pull request, no direct `main` push, and no merge until every job on the same
commit SHA succeeds. If the repository moves to a plan with ruleset support,
the existing stable job names should become required status checks.

`.github/workflows/database-compatibility.yml` repeats migration deploy,
status, migration-to-database diff, native RLS/default-grants audit, and all
integration tests on PostgreSQL 16. It runs weekly, manually, and when database
contract paths change. PostgreSQL 17 is the always-on current production-major
gate; PostgreSQL 16 is the N-1 compatibility gate. Major-tag containers are
intentional so current patch releases remain covered.

The media config uses Playwright's official desktop and device descriptors for Desktop Chrome, Desktop Firefox, Desktop Safari, Pixel 7, and iPhone 15. It keeps one active worker per Playwright project to avoid browser-engine memory contention and uses isolated tests with screenshots on failure. Trace recording follows Playwright's CI guidance: local media runs keep tracing off, while CI records traces only on the first retry of a failed test. Local media scripts are single-project entry points (`test:widget-media:*`), with `pnpm test:widget-media` kept as the fast Chromium desktop default. GitHub Actions does not run a local full-matrix wrapper; the PR workflow runs the three highest-value shopper targets as separate matrix jobs, and the scheduled `Media Cross-Browser` workflow runs all five projects daily as separate matrix jobs.

Current Windows-local evidence: `iphone-webkit` can finish the media test bodies and still hang during Playwright/WebKit teardown, leaving orphan `WebKitNetworkProcess.exe` entries that Windows reports as non-running when killed. The source tests should stay intact; use single-test iPhone WebKit runs for local diagnosis and rely on the Ubuntu GitHub Actions media matrix for the release gate. If the Ubuntu iPhone matrix job shows the same teardown symptom, split that project further with official Playwright/GitHub Actions sharding rather than rewriting the media tests from scratch.

2026-07-01 WebKit media note: gallery video thumbnails can visibly render the play overlay while `getBoundingClientRect().width` for the inner play span reports `0` under WebKit. The cross-browser media helper therefore scrolls the target into view, waits two animation frames, and falls back from rect size to `offsetWidth` / computed CSS width for the play icon contract. The gallery layout also keeps video poster/play overlay in a grid cell so WebKit does not depend on an out-of-flow absolutely positioned child inside the CSS-column gallery card.

2026-07-01 CI closure: GitHub Actions run `28531383697` on commit `0d3e53cd` passed the Ubuntu media PR matrix, including `media-pr-gate (iphone-webkit, webkit)`. This confirms the WebKit media contract on the release gate environment; the remaining Windows-local iPhone WebKit teardown timeout is a local runner/browser-process issue, not a release blocker.

To re-run and verify the release-gate iPhone WebKit media matrix from the CLI after a push:

```bash
gh run list --branch main --limit 5 --json databaseId,headSha,status,conclusion,workflowName,displayTitle,url
gh run watch <run-id> --exit-status
gh run view <run-id> --json jobs,status,conclusion,url
```

The required job name is `media-pr-gate (iphone-webkit, webkit)`. A valid release-gate closure requires that job's `Run media project` step to pass on GitHub Actions Ubuntu. Do not treat local Windows `iphone-webkit` teardown timeouts as release blockers unless the Ubuntu matrix reproduces the same failure.

The media suite deliberately separates playback contracts:

- Storefront video lightbox uses official Mux Player and verifies `playback-id`, `preload="metadata"`, `stream-type="on-demand"`, `playsinline`, no autoplay, `disable-tracking`, `disable-cookies`, supported control-hiding CSS variables, browser-back disposal, and player cleanup.
- Rollout fallback coverage verifies the widget can derive a playback ID from a trusted legacy `https://stream.mux.com/{id}.m3u8` URL when additive `media[].playbackId` is absent. Untrusted hosts remain rejected.
- Poster-first card/list/gallery tests assert that no playback element is created before the shopper opens the lightbox, and that video poster `<img>` tags use trusted Mux Image thumbnail variants with 1x/2x `srcset`.
- Wizard upload tests mock Mux direct-upload progress through UpChunk, transient PUT retry recovery, exhausted-attempt visible retry on the same session, Mux processing status, sanitized upload metrics, and public review submit, while asserting no provider admin API call leaves the widget.

Video lifecycle unit coverage pins the DB-outbox reliability contract: quota reservation, upload-session creation, and `expire_upload_session` are one serializable transaction; early expiry delivery defers to `expiresAt`; abandoned reserved and ready-unsubmitted sessions clean correctly; consumed review sessions cannot expire. `resolve_video_asset` maps a Mux upload to an asset, and `reconcile_video` uses a bounded ten-check schedule (`10/20/30/45/60/90/120/180/300/600` seconds), recovers a ready video when the webhook is missed, and records delayed processing without destructive cleanup. Mux readiness tests require an asset `ready` state, trusted Mux delivery URLs, a signed playback ID for pending/admin preview, and V1 media limits. Webhook/reconcile races consume quota once and preserve the first terminal provenance.

Widget interaction coverage pins the mobile reliability contract: progress/status mutations preserve the same `<video>` preview node, a transient status failure retries the original Mux direct-upload session without a second initiate call, offline removal stores a cancellation intent without sending a request, and reconnect clears that intent after a terminal server response. Retry reuses already-read video metadata instead of reopening the media decoder. Late callbacks from superseded Mux direct-upload attempts cannot overwrite terminal retry state, and capability checks now distinguish proven HTTP gate failures from browser/network failures.

Unit route contracts separately pin video observability: malformed or expected client errors and missing provider configuration do not consume Sentry error quota, while unexpected initiate, completion, cancellation, and Mux webhook failures call `captureException` exactly once with `source=media-job` and the route-specific `task` tag used by production alerts. Upload metrics tests verify rate limiting, invalid-token rejection, and sanitized one-row-per-session samples that do not persist tokens or upload URLs. The Mux webhook contract verifies raw-body signature handling through the provider adapter, duplicate event dedupe, orphan audit rows, and conversion of upload/asset events into existing `MediaProviderJob` work.

The admin video preview contract keeps pending/rejected UGC visibly marked as unapproved, renders signed playback through Mux Player with `playback-token` and `thumbnail-token`, disables tracking/cookies in this phase, and obtains playback only from the short-lived signed admin endpoint. Admin image preview coverage separately pins AWS private-image thumbnails and full-size previews to the authenticated image-preview endpoint, verifies signed responses stay `private, no-store`, and keeps image loading copy separate from the video loader. Approved video and image previews do not show the moderation warning.

Playwright device descriptors emulate viewport, input, and browser-engine behavior; they do not prove physical-device codec, memory, thermal, or network behavior. Real iPhone Safari and Android Chrome acceptance remains a release gate before enabling video for merchants.

Storefront interactions, runtime smoke, and unit tests also pin the summary filter same-gesture shield: touch/pen filter option activation closes the menu on `pointerdown`, arms the popover registry shield, keeps the exposed write button at `pointer-events:none` / `opacity:1` for that gesture, keeps selected-filter rating bar dim opacity intact while pointer-blocking bar rows, and clears the shield when the trailing click is swallowed. Runtime smoke treats that shield as transient: it asserts dimmed rating rows are pointer-blocked while the shield is armed, then simulates the swallowed trailing click and asserts the controls return to `pointer-events:auto`. Desktop mouse option selection is pinned separately to the normal `click` path: every summary layout keeps the filter button at `pointer-events:auto` / `cursor:pointer` and can reopen it immediately after a sort-triggered render. This protects physical mobile compat-event behavior without disabling ADR_0011 `:active` feedback for real future taps or desktop repeat-selection ergonomics.

Storefront interactions also pin the photo-upload submit bridge: pending uploads keep the author-step submit button disabled, and the submit payload contains AWS uploaded-image refs instead of a local `blob:` preview URL.

Storefront interactions and unit tests also pin review form wizard close-control contrast: `theme-vars.js` derives the close icon color and hover background from `formBgColor`, and the browser test verifies the real shadow-DOM button stays readable even when `formPrimaryTextColor` matches a dark form background. Unit tests also pin wizard nav-button hover gating: desktop hover feedback is limited to fine pointers while the same visual feedback remains available as transient `:active` press feedback on touch devices, preventing sticky mobile hover without changing the design token.

Storefront interactions, admin preview schema tests, and unit tests also pin review form wizard copy settings: `Metin > Yorum Formu` nested fields traverse defaults/sanitize/validate, custom step titles and the photo subtitle render as literal text, whitespace-only values fall back to defaults, and long unbroken words wrap without horizontal modal overflow.

Unit tests pin the review-section empty-state text color contract: `theme-vars.js` derives `--renuvex-pr-state-text` from `reviewBodyColor`, so "no reviews yet" follows the merchant's review text color family without adding a separate admin color setting.

Unit tests also pin widget icon registry invariants: all shipped review, filter, and UI chrome SVGs must stay on the Phosphor 256-grid `currentColor` system, stroked icons use documented Phosphor stroke weights (regular `16`, with the compact-only down caret intentionally `24`), and legacy Lucide 24-grid or Unicode X/arrow glyphs are rejected.

Unit tests also pin admin widget editor draft synchronization: late asynchronous saved settings hydrate the editor draft only while the merchant has not made local edits, equivalent setting objects compare without key-order false dirty states, and switching widgets still resets the draft.

Unit tests also pin admin widget settings load state: settings start/retry stays `loading`, valid response data moves to `loaded`, failed or malformed responses move to `error`, and `WidgetEditor` is allowed to mount only in the `loaded` state. The visual admin error/retry screen is not covered by `test:admin-preview`; that harness serves `/preview` and does not mount the authenticated admin panel.

Unit tests also pin admin iframe preview load state: every implemented iframe
preview moves through `loading`, `slow`, `ready`, `error`, and retry states by
request key, while stale events from an older iframe request are ignored. The
visual overlay in `WidgetEditor` is not covered by `test:admin-preview`; that
harness mounts the preview runtime page, not the authenticated widget editor
shell.

Widget runtime smoke also pins the storefront review read contract: late sort/filter/load-more responses cannot mutate a newer active selection, load-more sends `cursor` when the API returns `nextCursor` and falls back to legacy page requests otherwise, overlapping load-more rows do not duplicate DOM cards, review fetch failures stay distinct from real empty states, the media gallery remains a bootstrap-owned dataset, card/list/gallery layouts render only trusted tenant image URLs, list/gallery media-gallery thumbnails follow `thumbnailSize` while their review item photos continue to follow general widget `size`, and list layout review item photos keep their fixed 3:4 portrait box even in tall rows.

Widget runtime smoke also pins review list-pagination sizing: the load-more button and numbered-pagination controls follow `Widget Boyutu` for desktop dimensions, while mobile uses the visible compact control as the clickable target instead of adding an invisible hit halo around dense page numbers. The mobile numbered control must wrap without horizontal overflow and draw focus on the visible box.

Widget runtime and interaction smoke also pin summary rating-bar contracts: keyboard Enter/Space activates bar filters, `aria-pressed` reflects active rating state, badge count / summary total / bar distribution stay unfiltered while the review list changes, compact mobile keeps its accordion open after bar-track filter renders until the user closes it with the compact trigger, the compact summary panel exposes a named `role="dialog"` for assistive technology, compact count labels render as literal text rather than parsed HTML, merchant-editable widget text settings trim whitespace before falling back to default copy, mobile compact uses no desktop grow-out animation (`animation-name:none`) while retaining its `max-height` accordion transition, dimmed inactive rating rows keep the `.renuvex-pr-bar-dimmed` state class and computed `opacity:0.35` during touch/pen filter option shielding, large localized counts fit the count column, and filter light-dismiss still works after a sort-driven full summary re-render.

Unit tests also pin storefront widget asset cache headers: stable `/widget.js` and `/widget-runtime/runtime.js` must revalidate on reload (`max-age=0, must-revalidate`), while content-hashed runtime entries and chunks stay one-year immutable.

The same interaction layer pins that touch/pen filter option activation cannot visually press through to the write button exposed under the dismissed menu.

Widget network smoke also pins storefront loader lifecycle contracts: duplicate `PRODUCT_VIEW` events stay idempotent, synchronous listing/search events replay after loader subscription, late explicit review mounts replay only the `reviews-main` surface with the latest product context, mount-absent PDPs keep the badge-only no-review-fetch contract, stale previous-product review bootstrap completions cannot overwrite the active PDP, visible review content from product A is cleared into the reserved shell immediately on SPA pathname changes before the next product event arrives, product B loading keeps that shell clear until B renders, clean PDP `PAGE_VIEW` skips the listing entry chunk and side effects, semantic `PAGE_VIEW` dedupe suppresses same-page duplicates without suppressing distinct fast transitions, listing product data remains DOM-idempotent before/after `PAGE_VIEW`, and unsupported-theme or badge-disabled listing flows stop before rating fetches or DOM insertion.

## Evidence Commands
These commands are not hard byte-budget gates. They produce repeatable production evidence for review, deploy notes, and future budget calibration:

| Command | Scope |
|---|---|
| `pnpm measure:deployed-widget` | Loads deployed `widget.js` and immutable `widget-runtime/*` chunks from `https://widget.renuvex.app`, defaults backend/error/write mocks to `https://app.renuvex.app`, defaults cacheable settings/ratings/reviews mocks to `https://widget.renuvex.app`, and reports script count, chunk list, encoded transfer bytes, decoded bytes, API calls, and cache/content-encoding headers for mount-present/mount-absent and badge-on/badge-off combinations. |
| `pnpm measure:storefront-waterfall -- <storefront-url>` | Opens a real storefront PDP/category URL in Chromium, appends `renuvexPerf=1`, observes the page for `MEASURE_STOREFRONT_WAIT_MS` milliseconds after DOMContentLoaded, and reports Renuvex static assets, Worker read API, Vercel backend API, ikas storefront, Mux, image-provider, Yotpo, console errors, browser marks, widget startup markers, encoded bytes, cache headers, TTFB, and total request timing by category. Use `--runs=10` or `MEASURE_STOREFRONT_RUNS=10` for min/median/p90/p95 startup summaries. |
| `pnpm verify:deployed-jsonld` | Loads the deployed widget in a controlled browser harness and verifies the JSON-LD runtime contract: visible rating/review paths emit one parseable `Product` + `AggregateRating`, no-visible-surface and rich-snippet-disabled paths emit none. `SEO_PDP_URL=<public-url>` switches it to a real public PDP URL check. |

Record notable evidence in `docs/wiki/10_Research/` instead of adding brittle byte thresholds immediately.

## Test Harness
`tests/widget-harness.ts` serves a fake widget origin and a fake ikas-like merchant page. Tests intercept `/api/public/*` requests and provider image URLs, so browser tests exercise real built widget files while keeping external services mocked. The GitHub quality job supplies the same public `app.renuvex.app` / `widget.renuvex.app` split-origin contract used by the deterministic widget build; this keeps those requests inside the mock harness instead of allowing an accidental external request. This is deliberate: source imports are useful for unit tests, but widget smoke tests must validate the browser-visible loader/runtime shape.

## Review API Matrix
The highest-risk public write surface is `POST /api/public/reviews`. Unit tests cover:

- syntactic validation before rate-limit/storage,
- profanity rejection before rate-limit/storage,
- Redis fixed-window rate-limit behavior,
- trusted AWS image policy and pending-image cleanup,
- store/product target verification before write,
- approval policy modes (`manual`, `all`, `5stars`, `4plus`, and boolean legacy values).

`GET /api/public/reviews` tests cover pagination clamp, deterministic sorting, cursor/keyset pagination without Prisma `skip`, signed cursor integrity (tampered and unsigned cursors return `400` before review reads), cursor context rejection, rating filters, indexed `hasImages=true`, media-filtered `hasMedia=true`, media-first image formatting with legacy fallback, additive `media[]` metadata formatting, cache headers, author masking, approved-only reads, and the unchanged `images` compatibility shape while unfiltered `allCount` / `avgRating` / `ratingCounts` plus exact `totalCount` / `totalPages` come from `ProductReviewSummary` buckets without raw `Review.count()`.

Product review summary unit coverage pins `ProductReviewSummary` creation, decrement, `hasImages` photo-count deltas, `hasVideo`/media-count deltas, photo/media rating buckets, merchant-reply no-op behavior, exact repair recompute, filtered public total derivation, `/api/public/ratings` summary reads without raw `Review.groupBy()`, and admin status-transition writes. Public review submit tests also pin `ReviewMedia` creation, pending metadata carry-over, and admin status tests pin media visibility changes. See [[ADR_0026_Product_Review_Summary_Read_Model]], [[ADR_0027_Review_Media_Read_Model]], and [[ADR_0029_Review_Media_Metadata]].

Legacy review media reconciliation coverage is superseded by the AWS-only image provider contract and DB alignment evidence. Current tests should pin AWS upload refs, variant manifests, public media descriptors, and object-family cleanup. See [[ADR_0034_AWS_Review_Image_Migration]].

The browser interaction layer verifies the upload-to-submit bridge separately: after the widget receives an AWS upload intent, completes S3 POST, and registers the object, `/api/public/reviews` receives uploaded-image refs rather than local `blob:` URLs. Unit tests verify register rejects invalid store/type/size/checksum/object metadata.

## Combination Strategy
The suite uses risk-based pairwise coverage instead of a full cartesian matrix. Full cartesian layout x icon x color x toggle x theme coverage would become slow and noisy. New layout or surface work should add the smallest matrix that covers:

- one representative happy path,
- one disabled/gated path,
- one unsupported-theme or missing-mount path when relevant,
- one interaction path if the surface opens a modal, lightbox, carousel, or form,
- one static schema/settings assertion if admin config controls the surface.

## What Is Not Automated Yet
- Real authenticated ikas dashboard iframe flows are not in CI. They still need manual-auth smoke or a future test-auth harness.
- Manual-order source and shipment evidence are partially proven on a
  development store. A read-only query verified `createdBy=ADMIN`, physical
  shipment, exact package-to-line membership, delivered status, and a non-null
  line `statusUpdatedAt`. The 2026-07-20 ikas answer confirms that the order
  `notificationsAccepted` value is only a historical snapshot; current
  `listCustomer.subscriptionStatus` is the send-time authorization source.
  Unit tests cover that contract, but a real outbound manual-order email remains
  a future SES sandbox/provider acceptance test because no sender is deployed.
- Admin widget editor skeleton/error/retry screens are not in CI because the current admin preview harness mounts the preview runtime, not the authenticated admin page.
- Admin widget editor iframe-preview loading overlays are not in CI for the same reason; reducer behavior is covered by unit tests and visual behavior needs manual-auth smoke or a future admin editor harness.
- Live dev-store post-deploy smoke is not replaced by CI. Runtime-affecting widget changes should still be checked on the dev storefront after deploy.
- Playwright iPhone/Pixel emulation does not replace physical iPhone Safari and Android Chrome video acceptance. Native codec playback and weak-network behavior still require real devices before rollout.
- Sentry production health checks are not part of CI. Use Sentry MCP or the dashboard after deploys that change runtime error reporting.
- Live transfer-size budgets are not enforced in CI. Current network tests attach local transfer evidence, while `pnpm budget:widget` enforces deterministic local artifact ceilings and `pnpm budget:widget:network` reports deployed synthetic request budgets in warn mode.
- Google Rich Results / Search Console verification is not in CI. Runtime JSON-LD is automated; search-engine rendering remains a live SEO playbook item.

## Change Rule
When adding a new storefront surface such as carousel, FAQ, popup, Q&A, or another review section mode, update the matching test layer in the same commit. The default expectation is:

- surface/lazy-boundary change -> widget network smoke;
- layout or render change -> widget runtime smoke;
- modal/lightbox/wizard change -> interaction smoke, plus cross-browser media coverage when image/video playback or upload behavior changes;
- admin setting or preview change -> admin preview smoke and static schema assertions;
- public API/theme-state change -> unit tests.

The PR template repeats this rule as a checklist. If a change intentionally does not need a test update, the PR should state why.

`tests/unit/widget-surface-contracts.test.ts` enforces the surface part of this rule automatically. Every `src/widget/surfaces/*.surface.js` file must have a `SURFACE_TEST_CONTRACTS` entry that names the relevant layer and test files. This is intentionally explicit: adding a new surface without thinking through network/runtime/interaction/admin/unit coverage should fail before merge. The same file also enforces the **overlay shared-surface contract** ([[ADR_0025_Overlay_Shared_Surface_Foundation]]): the body scroll lock and the focus-trap primitives must be defined only in their shared modules (`core/body-scroll-lock.js`, `shared/focus-trap.js`), and both body-level overlays (lightbox, wizard) must import them rather than re-implement — the rule that prevents the next surface from drifting to its own weaker copy.

`tests/unit/layout-contracts.test.ts` extends the same static-invariant approach to the swappable summary/review **layout** system (it reads the layout sources — the modules touch the DOM, so they are not imported). It pins: every layout exports `meta.id` + `render` + `css` and its registry key matches its folder; `meta.supports` declares only known capability keys (so the admin `showWhen` field-hiding contract cannot silently break on a typo); the shared bar chart keeps **zero-review bars non-interactive** (the empty-bar contract — only bars with reviews filter); **no layout interpolates untrusted user/merchant text into `innerHTML`** (the `Bug_Compact_Count_Label_HTML_Injection` class — untrusted text must use `textContent`); and any layout that caps the widget root width for desktop columns must **restore full-bleed on mobile** (the gallery side-padding regression). The render contract itself is documented with a shared JSDoc `@typedef SummaryRenderOpts` / `Review` in the layout registries (IDE/doc-level — `checkJs` is off, so the structural enforcement lives in this test, not `tsc`).

## Related Source Files
- [package.json](package.json)
- [playwright.widget.config.ts](playwright.widget.config.ts)
- [playwright.media.config.ts](playwright.media.config.ts)
- [vitest.config.ts](vitest.config.ts)
- [.github/workflows/widget-smoke.yml](.github/workflows/widget-smoke.yml)
- [.github/workflows/media-cross-browser.yml](.github/workflows/media-cross-browser.yml)
- [tests/widget-harness.ts](tests/widget-harness.ts)
- [tests/widget-media-cross-browser.spec.ts](tests/widget-media-cross-browser.spec.ts)
- [tests/](tests/)

## Obsidian Links
- [[Widget_Architecture]]
- [[Widget_Performance]]
- [[Backend_API_Map]]
- [[Theme_Adapter_Playbook]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
