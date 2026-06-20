---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-28
updated: 2026-06-20
last_verified: 2026-06-20
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
  - "vitest.config.ts"
  - ".github/workflows/widget-smoke.yml"
  - ".github/workflows/media-cross-browser.yml"
  - ".github/pull_request_template.md"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/verify-deployed-jsonld.mjs"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/widget-media-cross-browser.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/video-upload-routes.test.ts"
  - "tests/unit/video-upload-error.test.ts"
  - "tests/unit/media-jobs.test.ts"
  - "tests/unit/media-session-creation.test.ts"
  - "tests/unit/media-reconciliation.test.ts"
  - "tests/unit/media-route-contracts.test.ts"
  - "tests/unit/admin-video-preview-contract.test.ts"
  - "tests/unit/review-summary.test.ts"
  - "tests/unit/review-media-reconciliation.test.ts"
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
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
---

# Test Strategy

## Summary
The automated test suite has six layers: widget network/chunk contracts, widget layout/runtime rendering, storefront interactions, cross-browser review media, admin preview/settings behavior, and backend/theme-state unit tests. The suite is designed to catch regressions in public widget behavior without depending on real ikas auth, production DB data, Cloudinary uploads, Mux assets/direct uploads, or live merchant credentials.

## Layers

| Layer | Command | Scope |
|---|---|---|
| Widget network/chunk smoke | `pnpm test:widget-smoke` | Built `public/widget.js` and content-hashed runtime chunks; validates API fan-out, lazy chunk boundaries, badge/review/structured-data combinations, unsupported theme behavior, listing fallback gating, and local transfer evidence without byte-budget gating. |
| Widget layout/runtime smoke | `pnpm test:widget-runtime` | Pairwise summary/review layout matrix (`classic`, `compact`, `hero`, `minimal`, `split` x `card`, `list`, `gallery`), rating bar keyboard filtering + badge/summary isolation, compact mobile accordion persistence/motion after rating-bar filter renders, large localized bar-count layout, photo strip toggles, badge/JSON-LD presence, hostile host-theme CSS isolation (a light-DOM `img{width:100%!important}` balloons a control image but cannot reach the shadow-hosted review thumbnail — ADR_0021 regression), and unexpected console errors. |
| Storefront interactions | `pnpm test:widget-interactions` | Photo-strip lightbox, review-image lightbox, summary filter/popover light-dismiss, keyboard close, review wizard validation, step flow, mocked review submit, and body-scroll-lock regression (opening either overlay locks scroll on BOTH `<html>` and `<body>` and restores on close — ADR_0025). |
| Cross-browser review media | `pnpm test:widget-media` | Local fast path runs Chromium desktop only. CI runs PR media coverage as isolated matrix jobs for Chromium desktop, Pixel Android emulation, and iPhone WebKit emulation. The scheduled cross-browser workflow adds Firefox desktop and desktop WebKit plus the non-native `hls.js` branch. The suite pins poster-first card/list/gallery rendering, size presets, no list autoplay/preload, native-HLS lightbox attributes, browser-back cleanup, Mux direct-upload wizard submit, and video-to-image navigation cleanup. |
| Admin preview/settings | `pnpm test:admin-preview` | Preview `postMessage` update path, layout/icon/color/toggle effects, and static `widgetDefs.ts` option/showWhen alignment with widget registries. |
| Unit/API/theme state | `pnpm test:unit` | Public API route behavior, product review summary read-model helpers, review GET filters, review POST validation/rate-limit/profanity/image-policy/approval branches, widget-error sanitization, storefront theme stable/pending/generic/fail-closed helpers, surface test contracts, popover registry lifecycle contract, stable widget asset cache headers, and the overlay shared-surface invariant (scroll-lock / focus-trap primitives live only in their shared modules — ADR_0025). |

`pnpm test:ci` runs the core non-media quality gate: unit tests, widget network smoke, widget runtime smoke, storefront interactions, and admin preview. `.github/workflows/widget-smoke.yml` uses Node 24 runtime action majors, runs `pnpm prisma:generate` first so Linux CI has the generated Prisma client, then runs `pnpm build:widget`, installs Chromium, runs `pnpm test:ci`, syntax-checks generated widget assets with `pnpm check:widget-js`, then runs TypeScript, lint, and whitespace gates. The same workflow runs PR media coverage as a separate Playwright matrix so each media browser/device project gets its own Ubuntu runner and failure artifact.

The media config uses Playwright's official desktop and device descriptors for Desktop Chrome, Desktop Firefox, Desktop Safari, Pixel 7, and iPhone 15. It keeps one active worker per Playwright project to avoid browser-engine memory contention and uses isolated tests with screenshots on failure. Trace recording follows Playwright's CI guidance: local media runs keep tracing off, while CI records traces only on the first retry of a failed test. Local media scripts are single-project entry points (`test:widget-media:*`), with `pnpm test:widget-media` kept as the fast Chromium desktop default. GitHub Actions does not run a local full-matrix wrapper; the PR workflow runs the three highest-value shopper targets as separate matrix jobs, and the scheduled `Media Cross-Browser` workflow runs all five projects daily as separate matrix jobs.

Current Windows-local evidence: `iphone-webkit` can finish the media test bodies and still hang during Playwright/WebKit teardown, leaving orphan `WebKitNetworkProcess.exe` entries that Windows reports as non-running when killed. The source tests should stay intact; use single-test iPhone WebKit runs for local diagnosis and rely on the Ubuntu GitHub Actions media matrix for the release gate. If the Ubuntu iPhone matrix job shows the same teardown symptom, split that project further with official Playwright/GitHub Actions sharding rather than rewriting the media tests from scratch.

The media suite deliberately separates playback contracts:

- Native HLS is forced at the DOM capability boundary and verifies `controls`, `playsinline`, `preload="metadata"`, no autoplay, browser-back disposal, and source cleanup.
- The `hls.js`/MSE branch runs on desktop Chromium and Firefox and verifies lazy manifest loading plus player cleanup. Unit coverage also pins the conservative startup-quality helpers: Data Saver/2g keeps the default safe ABR start, player-size-aware warm-start chooses a bounded first level, and ABR remains available after startup.
- Poster-first card/list/gallery tests assert that no HLS manifest is requested before the shopper opens the lightbox, and that video poster `<img>` tags use trusted Mux Image thumbnail variants with 1x/2x `srcset`.
- Wizard upload tests mock Mux direct-upload progress through UpChunk, transient PUT retry recovery, exhausted-attempt visible retry on the same session, Mux processing status, sanitized upload metrics, and public review submit, while asserting no provider admin API call leaves the widget.

Video lifecycle unit coverage pins the DB-outbox reliability contract: quota reservation, upload-session creation, and `expire_upload_session` are one serializable transaction; early expiry delivery defers to `expiresAt`; abandoned reserved and ready-unsubmitted sessions clean correctly; consumed review sessions cannot expire. `resolve_video_asset` maps a Mux upload to an asset, and `reconcile_video` uses a bounded ten-check schedule (`10/20/30/45/60/90/120/180/300/600` seconds), recovers a ready video when the webhook is missed, and records delayed processing without destructive cleanup. Mux readiness tests require an asset `ready` state, trusted Mux delivery URLs, a signed playback ID for pending/admin preview, and V1 media limits. Webhook/reconcile races consume quota once and preserve the first terminal provenance.

Widget interaction coverage pins the mobile reliability contract: progress/status mutations preserve the same `<video>` preview node, a transient status failure retries the original Mux direct-upload session without a second initiate call, offline removal stores a cancellation intent without sending a request, and reconnect clears that intent after a terminal server response. Retry reuses already-read video metadata instead of reopening the media decoder.

Unit route contracts separately pin video observability: malformed or expected client errors and missing provider configuration do not consume Sentry error quota, while unexpected initiate, completion, cancellation, and Mux webhook failures call `captureException` exactly once with `source=media-job` and the route-specific `task` tag used by production alerts. Upload metrics tests verify rate limiting, invalid-token rejection, and sanitized one-row-per-session samples that do not persist tokens or upload URLs. The Mux webhook contract verifies raw-body signature handling through the provider adapter, duplicate event dedupe, orphan audit rows, and conversion of upload/asset events into existing `MediaProviderJob` work.

The admin video preview contract keeps pending/rejected UGC visibly marked as unapproved, starts video muted with native controls and `playsInline`, and obtains playback only from the short-lived signed admin endpoint. Approved video and image previews do not show the moderation warning.

Playwright device descriptors emulate viewport, input, and browser-engine behavior; they do not prove physical-device codec, memory, thermal, or network behavior. Real iPhone Safari and Android Chrome acceptance remains a release gate before enabling video for merchants.

Storefront interactions, runtime smoke, and unit tests also pin the summary filter same-gesture shield: touch/pen filter option activation closes the menu on `pointerdown`, arms the popover registry shield, keeps the exposed write button at `pointer-events:none` / `opacity:1` for that gesture, keeps selected-filter rating bar dim opacity intact while pointer-blocking bar rows, and clears the shield when the trailing click is swallowed. Runtime smoke treats that shield as transient: it asserts dimmed rating rows are pointer-blocked while the shield is armed, then simulates the swallowed trailing click and asserts the controls return to `pointer-events:auto`. Desktop mouse option selection is pinned separately to the normal `click` path: every summary layout keeps the filter button at `pointer-events:auto` / `cursor:pointer` and can reopen it immediately after a sort-triggered render. This protects physical mobile compat-event behavior without disabling ADR_0011 `:active` feedback for real future taps or desktop repeat-selection ergonomics.

Storefront interactions also pin the photo-upload submit bridge: pending uploads keep the author-step submit button disabled, and the submit payload contains the final trusted Cloudinary URL instead of a local `blob:` preview URL.

Storefront interactions and unit tests also pin review form wizard close-control contrast: `theme-vars.js` derives the close icon color and hover background from `formBgColor`, and the browser test verifies the real shadow-DOM button stays readable even when `formPrimaryTextColor` matches a dark form background. Unit tests also pin wizard nav-button hover gating: desktop hover feedback is limited to fine pointers while the same visual feedback remains available as transient `:active` press feedback on touch devices, preventing sticky mobile hover without changing the design token.

Storefront interactions, admin preview schema tests, and unit tests also pin review form wizard copy settings: `Metin > Yorum Formu` nested fields traverse defaults/sanitize/validate, custom step titles and the photo subtitle render as literal text, whitespace-only values fall back to defaults, and long unbroken words wrap without horizontal modal overflow.

Unit tests pin the review-section empty-state text color contract: `theme-vars.js` derives `--renuvex-pr-state-text` from `reviewBodyColor`, so "no reviews yet" follows the merchant's review text color family without adding a separate admin color setting.

Unit tests also pin widget icon registry invariants: all shipped review, filter, and UI chrome SVGs must stay on the Phosphor 256-grid `currentColor` system, stroked icons use documented Phosphor stroke weights (regular `16`, with the compact-only down caret intentionally `24`), and legacy Lucide 24-grid or Unicode X/arrow glyphs are rejected.

Unit tests also pin admin widget editor draft synchronization: late asynchronous saved settings hydrate the editor draft only while the merchant has not made local edits, equivalent setting objects compare without key-order false dirty states, and switching widgets still resets the draft.

Unit tests also pin admin widget settings load state: settings start/retry stays `loading`, valid response data moves to `loaded`, failed or malformed responses move to `error`, and `WidgetEditor` is allowed to mount only in the `loaded` state. The visual admin error/retry screen is not covered by `test:admin-preview`; that harness serves `/preview` and does not mount the authenticated admin panel.

Unit tests also pin admin iframe preview load state: the `reviews` iframe preview moves through `loading`, `slow`, `ready`, `error`, and retry states by request key, while stale events from an older iframe request are ignored. The visual overlay in `WidgetEditor` is not covered by `test:admin-preview`; that harness mounts the preview runtime page, not the authenticated widget editor shell.

Widget runtime smoke also pins the storefront review read contract: late sort/filter/load-more responses cannot mutate a newer active selection, load-more sends `cursor` when the API returns `nextCursor` and falls back to legacy page requests otherwise, overlapping load-more rows do not duplicate DOM cards, review fetch failures stay distinct from real empty states, the photo strip remains a bootstrap-owned dataset, card/list/gallery layouts render only trusted tenant image URLs, list/gallery photo-strip thumbnails follow `thumbnailSize` while their review item photos continue to follow general widget `size`, and list layout review item photos keep their fixed 3:4 portrait box even in tall rows.

Widget runtime smoke also pins review list-pagination sizing: the load-more button and numbered-pagination controls follow `Widget Boyutu` for desktop dimensions, while mobile uses the visible compact control as the clickable target instead of adding an invisible hit halo around dense page numbers. The mobile numbered control must wrap without horizontal overflow and draw focus on the visible box.

Widget runtime and interaction smoke also pin summary rating-bar contracts: keyboard Enter/Space activates bar filters, `aria-pressed` reflects active rating state, badge count / summary total / bar distribution stay unfiltered while the review list changes, compact mobile keeps its accordion open after bar-track filter renders until the user closes it with the compact trigger, the compact summary panel exposes a named `role="dialog"` for assistive technology, compact count labels render as literal text rather than parsed HTML, merchant-editable widget text settings trim whitespace before falling back to default copy, mobile compact uses no desktop grow-out animation (`animation-name:none`) while retaining its `max-height` accordion transition, dimmed inactive rating rows keep the `.renuvex-pr-bar-dimmed` state class and computed `opacity:0.35` during touch/pen filter option shielding, large localized counts fit the count column, and filter light-dismiss still works after a sort-driven full summary re-render.

Unit tests also pin storefront widget asset cache headers: stable `/widget.js` and `/widget-runtime/runtime.js` must revalidate on reload (`max-age=0, must-revalidate`), while content-hashed runtime entries and chunks stay one-year immutable.

The same interaction layer pins that touch/pen filter option activation cannot visually press through to the write button exposed under the dismissed menu.

Widget network smoke also pins storefront loader lifecycle contracts: duplicate `PRODUCT_VIEW` events stay idempotent, synchronous listing/search events replay after loader subscription, late explicit review mounts replay only the `reviews-main` surface with the latest product context, mount-absent PDPs keep the badge-only no-review-fetch contract, stale previous-product review bootstrap completions cannot overwrite the active PDP, clean PDP `PAGE_VIEW` skips the listing entry chunk and side effects, semantic `PAGE_VIEW` dedupe suppresses same-page duplicates without suppressing distinct fast transitions, listing product data remains DOM-idempotent before/after `PAGE_VIEW`, and unsupported-theme or badge-disabled listing flows stop before rating fetches or DOM insertion.

## Evidence Commands
These commands are not hard byte-budget gates. They produce repeatable production evidence for review, deploy notes, and future budget calibration:

| Command | Scope |
|---|---|
| `pnpm measure:deployed-widget` | Loads deployed `widget.js` and immutable `widget-runtime/*` chunks from `https://widget.renuvex.app`, mocks merchant HTML plus `/api/public/*`, and reports script count, chunk list, encoded transfer bytes, decoded bytes, API calls, and cache/content-encoding headers for mount-present/mount-absent and badge-on/badge-off combinations. |
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

`GET /api/public/reviews` tests cover pagination clamp, deterministic sorting, cursor/keyset pagination without Prisma `skip`, signed cursor integrity (tampered and unsigned cursors return `400` before review reads), cursor context rejection, rating filters, indexed `hasImages=true`, media-first image formatting with legacy fallback, additive `media[]` metadata formatting, cache headers, author masking, approved-only reads, and the unchanged `images` compatibility shape while unfiltered `allCount` / `avgRating` / `ratingCounts` plus exact `totalCount` / `totalPages` come from `ProductReviewSummary` buckets without raw `Review.count()`.

Product review summary unit coverage pins `ProductReviewSummary` creation, decrement, `hasImages` photo-count deltas, photo+rating buckets, merchant-reply no-op behavior, exact repair recompute, filtered public total derivation, `/api/public/ratings` summary reads without raw `Review.groupBy()`, and admin status-transition writes. Public review submit tests also pin `ReviewMedia` creation, pending metadata carry-over, and admin status tests pin media visibility changes. See [[ADR_0026_Product_Review_Summary_Read_Model]], [[ADR_0027_Review_Media_Read_Model]], and [[ADR_0029_Review_Media_Metadata]].

Legacy review media reconciliation unit coverage pins the maintenance-script classifier: tenant-scoped URLs are trusted, old global `review_images/...` URLs require copy-first reconciliation, wrong-store/foreign-cloud URLs stay untrusted, target public IDs are deterministic, placeholder Cloudinary API credentials are rejected before apply, and local env files can replace placeholder shell env values. Operational dry-runs are also part of the evidence: after the 2026-06-08 test-store reconciliation, `pnpm reviews:media:reconcile --cloudName=dtn7jhhuy --allowLegacyGlobal --dryRun` must report `plannedCopies=0`. See [[Legacy_Review_Media_Reconciliation]].

The browser interaction layer verifies the upload-to-submit bridge separately: after Cloudinary returns a tenant-scoped trusted URL and upload-response metadata, `/api/public/upload/register` receives `{storeId, secureUrl, metadata}` and `/api/public/reviews` receives the URL in `images`. Unit tests verify that register remains backwards compatible when metadata is absent and rejects untrusted dimensions when the Cloudinary response signature is invalid.

## Combination Strategy
The suite uses risk-based pairwise coverage instead of a full cartesian matrix. Full cartesian layout x icon x color x toggle x theme coverage would become slow and noisy. New layout or surface work should add the smallest matrix that covers:

- one representative happy path,
- one disabled/gated path,
- one unsupported-theme or missing-mount path when relevant,
- one interaction path if the surface opens a modal, lightbox, carousel, or form,
- one static schema/settings assertion if admin config controls the surface.

## What Is Not Automated Yet
- Real authenticated ikas dashboard iframe flows are not in CI. They still need manual-auth smoke or a future test-auth harness.
- Admin widget editor skeleton/error/retry screens are not in CI because the current admin preview harness mounts the preview runtime, not the authenticated admin page.
- Admin widget editor iframe-preview loading overlays are not in CI for the same reason; reducer behavior is covered by unit tests and visual behavior needs manual-auth smoke or a future admin editor harness.
- Live dev-store post-deploy smoke is not replaced by CI. Runtime-affecting widget changes should still be checked on the dev storefront after deploy.
- Playwright iPhone/Pixel emulation does not replace physical iPhone Safari and Android Chrome video acceptance. Native codec playback and weak-network behavior still require real devices before rollout.
- Sentry production health checks are not part of CI. Use Sentry MCP or the dashboard after deploys that change runtime error reporting.
- Transfer-size budgets are not enforced yet. Current network tests attach local transfer evidence and assert relative behavior, not byte ceilings.
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
