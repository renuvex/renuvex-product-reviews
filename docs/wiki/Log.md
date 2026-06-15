---
type: log
project: renuvex-product-reviews
status: active
created: 2026-05-13
updated: 2026-06-16
last_verified: 2026-06-16
confidence: high
tags:
  - log
  - project-memory
related:
  - "[[Index]]"
  - "[[Hot_Context]]"
source_files:
  - "AGENTS.md"
  - "docs/wiki/Index.md"
  - "scripts/wiki-audit.mjs"
---

# Project Log

## 2026-06-16 - fix | Improve video poster and startup quality
- Added trusted Cloudflare Stream poster variant helpers for storefront video thumbnails and lightbox posters. Video cards/strip now render sized `width`/`height`/`fit=crop` poster images with `srcset`; the lightbox uses a larger `1280x720 fit=clip` poster while keeping the stored `posterUrl` as source of truth.
- Added conservative hls.js startup-quality handling for non-native HLS browsers: player-size capping is enabled, Data Saver/2g keeps safe default ABR startup, and good-network starts can pick a bounded first level without disabling ABR.
- Native video controls remain browser/OS-owned; this change does not theme the native progress bar, center play button, fullscreen, or PiP controls. Unit and media browser coverage pin poster URL variants, no pre-lightbox HLS requests, native HLS attributes, and hls.js helper behavior.

## 2026-06-16 - fix | Accept playable Stream readiness without full rendition completion
- Replaced the incorrect `pctComplete=100` readiness gate with Cloudflare's documented playable signal: `readyToStream=true` and provider `state='ready'`, plus trusted HLS/poster URLs and the existing V1 duration/size limits.
- Increased missed-webhook self-healing density to `10/20/30/45/60/90/120/180/300/600` seconds while retaining webhook fast-path behavior, the 10-minute delayed-processing state, the 60-minute ingest backstop, and DB-only public status.
- Added explicit readiness provenance for webhook, reconciliation, ingest cleanup, and maintenance. The locked terminal transition now preserves the first winner so concurrent webhook/reconcile delivery cannot consume quota twice or overwrite provenance.
- Unit coverage pins readiness below or without `pctComplete`, invalid delivery URLs, the ten-check schedule, each internal provenance path, and concurrent terminal idempotency. Deployment timing verification and renewed physical-device acceptance remain required before 72-hour canary `T0`.

## 2026-06-15 - acceptance | Start Review Video V1 physical-device gate
- Post-hardening Android Chrome and iPhone Safari user acceptance passed interruption/retry, X removal, processing-to-ready, admin moderation, storefront HLS, fullscreen/audio/back/modal close; desktop Chrome also passed. Longer videos took approximately one to two minutes to become ready, within the existing delayed-processing policy. Video-to-video lightbox navigation revealed that the directional transform moved the native center play control; video transitions now use opacity-only animation, with a browser regression contract. The global gate remains disabled and canary `T0` has not started.
- Implemented the pre-canary reliability hardening found by physical testing. Stream readiness now has a bounded QStash/DB-outbox reconciliation path in addition to the webhook; upload reservations carry exact expiry jobs; ingest cleanup applies canonical provider state; the wizard keeps one mobile video preview node; transient polling/retry stays on the same multipart session; and offline removal persists a cancel intent until a terminal response. Because this changes the media path, Android/iPhone interruption tests and the 72-hour canary must restart after deployment.
- The physical Android Chrome path passed upload completion, moderation, storefront playback, and deletion cleanup, but interruption/retry created a second upload session after a transient status probe failure. Fixed the widget to preserve the original opaque token across network/5xx status failures, retry the probe, and discard only explicit missing/expired sessions; added a browser regression contract for single-initiate resume. The deleted Android review does not start the 72-hour retained-review window.
- Deleted the published iOS review through the admin panel and verified the full cleanup lifecycle: the DB review/media rows disappeared, the transactional `cleanup_video` job succeeded on its first QStash delivery, the DLQ remained empty, direct Stream and R2 reads returned not found, and Sentry showed no matching media-path error. iOS cleanup now passes; physical interruption/resume remains pending.
- Deployed quota-aware capability commit `84276d8b` as Production deployment `dpl_AjWAf29bnLSQWxA8ceQ8gdLBQQiz`. Dry-run-first exact-store operations raised only the internal quota from `5` to `20`; live capability became enabled for that store while the second store remained merchant-disabled. A still-valid reserved session was left for normal expiry cleanup instead of editing counters manually. Android physical acceptance is next; the 72-hour clock remains not started.
- Implemented the quota-aware video capability follow-up: a no-store capability endpoint, current-month usage/provider gates, photo-only fallback, structured upload error copy/retry policy, read-only admin usage metadata, and quota-aware canary reporting. Cached public settings and atomic initiate reservation contracts remain unchanged. The production rollout and exact-store quota change are recorded above.
- Hardened pending admin video preview with a visible unapproved-UGC warning, muted native playback, and a contract test that pins the signed admin endpoint.
- Re-verified the Phase 6 preflight: Vercel commit `88e1041b` ready, R2 multipart write/abort clean, Stream token/webhook valid, QStash deliveries successful, media-worker DLQ empty after deleting the intentional invalid-job probe, unsigned worker calls rejected with `401`, and no matching Sentry/Vercel production errors in the preceding 24 hours.
- Corrected stale rollout memory: controlled provider canary work already consumed two quota units and completed cleanup. Physical iPhone/Android and the 72-hour retained-review window remain pending.
- Live public settings showed the internal store effective while local operations env remained disabled. Production activation is held until the Vercel flag is disabled, the admin hardening deploys, and the live capability is re-verified.
- Added [[Review_Video_Physical_Device_Acceptance_2026-06]] as the dated evidence ledger.
- Deployed commit `9f20cdc9` with the global Production capability disabled. The live internal store returned `videoReviewsEnabled=false`; post-deploy R2/Stream preflight, QStash DLQ/delivery, unsigned-worker rejection, and Sentry checks passed.
- Reactivated the Production global video gate on deployment `dpl_2ASH38BDDDg632wjipyGquHQ5h7q`. The live internal store returned `videoReviewsEnabled=true`, the second store stayed effectively disabled, QStash DLQ was empty, Sentry reported zero matching media-path errors, and unsigned worker access remained `401`.
- First physical iOS Safari attempt found two blockers: Stream was ready while DB/upload state stayed `processing`, and the wizard video-card remove button did not clear the card. The webhook now fetches the canonical Stream video record before readiness application, and the media step clears removed videos with pointer/click-safe handling. The 72-hour canary clock remains not started.
- After deploying `64dfc5a7`, the iOS Safari critical path passed through upload, submit, admin approval, and storefront publication. A second immediate upload attempt hit HTTP `429` on `/api/public/upload/video/initiate`; DB evidence showed the internal canary quota at `consumed=4` and `reserved=1` with quota `5`, so this is a quota/rate-limit behavior rather than a Stream processing failure. The remaining UX gap is mapping quota/rate-limit errors to specific shopper copy instead of the generic upload-failed message.

## 2026-06-14 - operations | Prepare controlled Review Video V1 canary
- Added `pnpm video:canary:ops`, a read-only-by-default command that reports global/merchant/quota gates plus per-store quota, session, outbox, review, and media evidence.
- Apply mode requires a single existing store, matching `--confirmStoreId`, explicit fields, and `--apply`; it preserves unrelated review-widget settings and blocks accidental activation when the global flag is already true.
- Added [[Review_Video_Canary_Runbook]] with preflight, activation order, real-provider evidence, exit criteria, rollback, and physical-device follow-up.
- Verified the current DB baseline without mutation: all store quotas are zero, all merchant video toggles are off, and the loaded global flag is false. The real production canary remains pending.

## 2026-06-14 - test | Add Phase 4 cross-browser review media gate
- Added a dedicated Playwright media config and suite for Chromium desktop, Firefox desktop, WebKit desktop, Pixel 7 emulation, and iPhone 15 WebKit emulation.
- Contracts cover poster-first card/list/gallery rendering, responsive media sizing, no pre-lightbox HLS requests, native HLS attributes, lazy `hls.js`, browser-back/source cleanup, multipart video wizard submit, and video-to-image navigation cleanup.
- CI now runs the Chromium/Pixel/iPhone subset on normal quality gates and the full five-project matrix on a scheduled/manual workflow. The official Playwright 1.60 Linux image passed with 30 tests and 5 intentional platform-scope skips.
- Physical iPhone Safari and Android Chrome remain rollout acceptance requirements; Playwright device emulation is not treated as real-device proof.
- Updated wiki: [[Test_Strategy]], [[Product_Review_Lightbox]], [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]]

## 2026-06-14 - operations | Verify production video infrastructure
- Deployment: Vercel production deployment `dpl_ApD7oYZrGhiJeZMA72fA7jjnSZzU` is ready on `app.renuvex.app` and `widget.renuvex.app`, built from commit `ebe82a2c`.
- Environment isolation: Cloudflare/R2/Stream, QStash, media-job base URL, and `VIDEO_REVIEWS_ENABLED` are scoped to Vercel Production only.
- Live CORS correction: R2 master multipart CORS now accepts arbitrary merchant storefront origins. Both preflight and a temporary presigned `PUT` passed; `ETag` was readable and the multipart probe was aborted. Added a secret-safe infrastructure verifier so this provider contract is repeatable before canary activation.

## 2026-06-14 - security | Harden video provider contracts
- Summary: Corrected QStash signature-error classification, introduced shared JSON object parsing for media routes, moved video API failures to stable English error codes, and validated signed Stream webhook payloads before lifecycle processing.
- Provider contract at that date: Stream copy requests send the documented `url` field plus the V1 `60s` and `150 MB` limits. The original readiness gate also required `pctComplete=100`; the 2026-06-16 readiness correction above supersedes that overly strict condition.
- Verification target at that date: route tests covered missing/invalid QStash signatures, signed malformed payloads, unmatched valid Stream webhooks, documented Stream copy payload fields, malformed public upload JSON, and the then-current full-encode readiness rule.
- Updated wiki: [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]], [[Backend_API_Map]]

## 2026-06-08 - performance | Add review media metadata
- Summary: Added additive Cloudinary metadata fields to `ReviewMedia` and `PendingReviewImage`. Widget upload/register now forwards Cloudinary upload-response metadata; the server verifies the response signature before staging metadata, and review submit carries pending metadata into committed `ReviewMedia` rows.
- Public contract: `images: string[]` remains unchanged. `/api/public/reviews` now also returns additive `media[]` entries with URL, thumbnail URL, position, and nullable metadata for future media-heavy UI.
- Operations: Added dry-run-first `pnpm reviews:media:metadata:backfill` to repair existing media rows from Cloudinary Admin API; no storefront GET path calls Cloudinary.
- Updated wiki: [[ADR_0029_Review_Media_Metadata]], [[Database_Map]], [[Database_Schema]], [[Backend_API_Map]], [[Widget_Performance]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-08 - performance | Remove public review count scan
- Summary: Extended `ProductReviewSummary` with exact photo+rating buckets and moved `/api/public/reviews` `totalCount` / `totalPages` derivation off raw `Review.count()`.
- Key source changes: Added `photoRating1Count` ... `photoRating5Count` to the summary schema/migration with an in-migration backfill from approved `Review.hasImages=true` rows, updated `src/lib/review-summary.ts` delta/recompute helpers, refreshed `scripts/rebuild-product-review-summaries.mjs`, and changed `GET /api/public/reviews` to call `filteredReviewTotal(...)`.
- Verification target: unit/API tests pin filtered totals from summary buckets and assert the public review GET path does not call `prisma.review.count`; summary tests pin photo+rating deltas, exact recompute, and helper derivation.
- Updated wiki: [[ADR_0026_Product_Review_Summary_Read_Model]], [[Backend_API_Map]], [[Database_Map]], [[Database_Schema]], [[Caching_And_Performance]], [[Widget_Performance]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-08 - security | Sign public review cursors
- Summary: Hardened `GET /api/public/reviews` cursor pagination by wrapping cursor payloads in an HMAC-SHA256 signed `{ p, s }` envelope. Cursor values remain opaque public bookmarks, but clients can no longer fabricate or mutate them.
- Key source changes: `src/app/api/public/reviews/route.ts` signs generated `nextCursor` values with server-only `REVIEW_CURSOR_SECRET`, rejects tampered/unsigned cursors with `400`, and keeps the existing query-context mismatch guard. Public response shape and widget load-more behavior stay unchanged.
- Verification target: unit/API coverage pins valid signed cursor load-more, tampered cursor rejection, unsigned legacy cursor rejection, context mismatch rejection, and skip-free cursor reads.
- Updated wiki: [[ADR_0028_Review_Cursor_Pagination]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[Security_And_Rate_Limits]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-08 - performance | Add review cursor pagination
- Summary: Moved storefront review list load-more from offset-only reads to cursor/keyset pagination while preserving the existing public response shape and legacy `page/limit` compatibility.
- Key source changes: `GET /api/public/reviews` now returns `data.nextCursor`, validates cursor query context, uses deterministic `createdAt/id` and `rating/createdAt/id` ordering, and does not pass Prisma `skip` on cursor requests. The widget stores `currentNextCursor`, uses cursor for load-more when available, resets it on sort/filter/retry/product changes, and keeps page fallback for old responses.
- Database: Added partial approved-review cursor indexes in `20260608120000_add_review_cursor_indexes`; the older photo index remains until production unused-index evidence supports cleanup.
- Verification target: unit/API tests pin legacy page compatibility, cursor context rejection, and skip-free cursor reads; widget runtime smoke pins cursor load-more, stale load-more rejection, and duplicate id guards.
- Updated wiki: [[ADR_0028_Review_Cursor_Pagination]], [[Backend_API_Map]], [[Database_Map]], [[Database_Schema]], [[Caching_And_Performance]], [[Product_Review_Widget]], [[Widget_Performance]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-08 - ops | Add legacy review media reconciliation audit
- Summary: Added read-only legacy media audit and copy-first reconciliation scripts for old global Cloudinary review image paths, then applied the test-store reconciliation. The trusted storefront policy remains tenant-scoped; global `review_images/...` paths are not added to the public trusted-image allowlist.
- Current evidence: Initial audit found 30 non-empty legacy `Review.images` rows, 43 URLs, 3 tenant-scoped trusted URLs already normalized into `ReviewMedia`, and 40 old global URLs across 27 approved reviews. Apply copied 10 available legacy assets, dropped 30 missing Cloudinary source URLs with explicit `--dropMissingLegacy`, repaired 1 summary row, and post-apply audit shows 13 tenant-scoped URLs, 13 `ReviewMedia` rows, zero global legacy URLs, zero orphan media, and zero summary mismatches.
- Guardrail: `pnpm reviews:media:reconcile --cloudName=dtn7jhhuy --dryRun` skips global legacy rows without `--allowLegacyGlobal`; after reconciliation, `--allowLegacyGlobal --dryRun` reports `plannedCopies=0`. Placeholder credentials are rejected before mutation, and local `.env.local` can replace placeholder shell env values.
- Updated wiki: [[Legacy_Review_Media_Reconciliation]], [[ADR_0027_Review_Media_Read_Model]], [[Database_Map]], [[Backend_API_Map]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-07 - performance | Normalize review media reads
- Summary: Moved public photo-review filtering away from legacy `Review.images` text matching. `Review.hasImages` is now the indexed public photo-review facet, and normalized `ReviewMedia` rows store trusted image URLs, publicIds, positions, and visibility.
- Key source changes: `prisma/schema.prisma`, `src/lib/review-media.ts`, `src/app/api/public/reviews/route.ts`, `src/app/api/admin/reviews/route.ts`, `src/app/api/admin/cleanup-images/route.ts`, and `scripts/backfill-review-media.mjs`.
- Verification target: unit tests pin media writes, indexed `hasImages=true` reads, media-first public image formatting, admin visibility transitions, and `ProductReviewSummary.photoReviewCount` deltas. After deploy, run `pnpm reviews:media:backfill --cloudName=<cloudinaryCloudName>` and verify Supabase schema/index/media-count consistency.
- Updated wiki: [[ADR_0027_Review_Media_Read_Model]], [[Database_Map]], [[Database_Schema]], [[Backend_API_Map]], [[Caching_And_Performance]], [[Product_Review_Widget]], [[Photo_Strip]], [[Widget_Performance]], [[Test_Strategy]], [[Hot_Context]]

## 2026-06-07 - ops | Sentry release/source-map upload guard documented
- Summary: Audited the Vercel/Sentry release upload path after the product summary read-model deploy. The app deployment and runtime checks were healthy, but build logs showed `sentry-cli` preferring a token embedded for `mert-copper` while repo config targets `renuvex/renuvex-product-reviews`, causing release/source-map upload to fail with `Project not found`.
- Change: Approved `@sentry/cli` in `package.json` `pnpm.onlyBuiltDependencies` so Vercel installs stay deterministic, and documented the stricter org-token contract in [[Sentry_Operations]] and [[Config_And_Env_Map]].
- Follow-up: Rotate/update Vercel `SENTRY_AUTH_TOKEN` to a token minted for the `renuvex` organization, then redeploy and verify the build log contains the Sentry release and sourcemap upload success lines.

## 2026-06-02 - fix | Restore desktop mouse filter reopen after sort render
- Summary: Fixed the desktop follow-up where selecting a summary filter option and immediately trying to reopen the filter could leave the button temporarily non-interactive (`pointer-events:none`, no pointer cursor). The bug was not compact-specific: a targeted runtime proof failed across classic, compact, hero, minimal, and split because mouse option activation reused the mobile `pointerdown` gesture shield before the sort-triggered render.
- Key source changes: `src/widget/summary-layouts/shared/actions-block.js` now ignores mouse `pointerdown` and lets desktop mouse selection activate on the normal `click` event; touch/pen still activate on `pointerdown` and keep the scoped gesture shield. Removed the now-unused `swallowNextDismissClick()` export from `src/widget/summary-layouts/shared/popover-registry.js`. Added runtime coverage for immediate desktop filter reopen across all summary layouts and rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification target: runtime smoke must prove every summary layout keeps the filter button at `cursor:pointer` / `pointer-events:auto`, no gesture shield is armed by mouse `pointerdown`, and the filter reopens immediately after the sort render; existing mobile shield tests must still pass.
- Updated wiki: [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]], [[Bug_Index]], [[Widget_Architecture]], [[Test_Strategy]]

## 2026-06-02 - fix | Harden compact rating dim state and loader deploy propagation
- Summary: Followed up the deployed compact-mobile rating flash report. Vercel confirmed production was already serving commit `142707d8` and `runtime-P3VKNO5E.js`, so the deploy was not missed. Hardened the remaining weak points: inactive filtered rating rows now use an explicit `.renuvex-pr-bar-dimmed` CSS state class with `opacity:0.35!important`, and stable widget entrypoints now revalidate on reload instead of staying behind the previous 5-minute client cache window.
- Key source changes: `summary-layouts/shared/bar-chart.js`, `reviews-section/styles/summary-controls.js`, `tests/widget-runtime-smoke.spec.ts`, `tests/unit/widget-asset-cache.test.ts`, `vercel.json`, `scripts/build-widget.mjs`; rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification target: runtime smoke must prove dimmed rows keep the state class and computed opacity during pointer-driven filter option shielding; unit tests pin stable loader/shim cache headers vs immutable hashed runtime/chunks.
- Updated wiki: [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]], [[Bug_Index]], [[Widget_Architecture]], [[Caching_And_Performance]], [[Test_Strategy]]

## 2026-06-02 - fix | Preserve compact rating dim state during filter shield
- Summary: Fixed the physical-mobile compact follow-up where selecting a rating, then choosing a filter option, made the inactive rating rows flash from their intentional dim state to full opacity. Root cause was the same-gesture dismiss shield applying `opacity:1!important` to every `[role="button"]`; bar chart rows are `role="button"` and carry selected-filter opacity state.
- Key source changes: `src/widget/shared/base-reset.js` now keeps broad `pointer-events:none` shielding but excludes `.renuvex-pr-bar-row` from the forced opacity reset. `tests/widget-runtime-smoke.spec.ts` pins the exact mobile moment: shield armed, inactive bar row remains `opacity:0.35`, pointer events are blocked. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification: Targeted runtime proof failed before the fix with `opacity:1`, then passed after the shield split.
- Updated wiki: [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]], [[Bug_Index]], [[Widget_Architecture]], [[Test_Strategy]]

## 2026-06-02 - fix | Keep compact mobile bar chart from replaying popover animation
- Summary: Fixed the follow-up compact-mobile motion issue where the panel stayed open after a rating-bar filter, but the bar chart visually disappeared/reappeared. Root cause was the desktop popover `renuvex-pr-grow-out` animation living on the shared `.renuvex-pr-compact-panel.renuvex-pr-open` rule, so mobile accordion redraws replayed the desktop opacity/scale animation.
- Key source changes: `src/widget/summary-layouts/compact/styles.js` now scopes the grow-out animation to desktop (`min-width:601px`); mobile compact keeps only its `max-height` accordion transition. The runtime smoke test now asserts the mobile open panel has `animation-name:none` after bar-track filtering while retaining the accordion transition. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification: The strengthened targeted Playwright test failed before the CSS fix with `animation-name: renuvex-pr-grow-out`, then passed after the fix and widget rebuild.
- Updated wiki: [[Widget_Architecture]], [[Test_Strategy]]

## 2026-06-02 - fix | Preserve compact mobile rating panel after bar filter
- Summary: Fixed compact summary mobile behavior so tapping a rating bar/track applies the rating filter without collapsing the mobile accordion. Desktop compact remains a popover with light-dismiss; the mobile accordion stays open across review-section re-renders until the user closes it via the compact trigger/chevron.
- Key source changes: `src/widget/summary-layouts/compact/index.js` owns the mobile-only open state keyed by product id; `src/widget/reviews-section/render.js` passes `productId` into summary layout render options. Added runtime smoke coverage in `tests/widget-runtime-smoke.spec.ts` and rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification: The new targeted Playwright test failed before the source/build update at the expected assertion (panel closed after bar-track filter), then passed after the fix and widget rebuild.
- Updated wiki: [[Widget_Architecture]], [[Test_Strategy]]

## 2026-06-01 - fix | Shield filter option taps from mobile press-through
- Summary: Fixed the physical-mobile follow-up where tapping a summary filter option could close the menu on `pointerdown` and let same-gesture compat mouse/active state visually press the exposed "Yorum Yap" button underneath. This does not disable mobile press feedback globally: `base-reset.js` keeps the ADR_0011 `:active` contract, while `popover-registry.js` adds a short-lived scoped `[data-renuvex-pr-dismiss-gesture]` shield only for pointer/touch option activation.
- Key source changes: `src/widget/summary-layouts/shared/popover-registry.js`, `src/widget/summary-layouts/shared/actions-block.js`, `src/widget/shared/base-reset.js`. Added unit coverage for the scoped shield lifecycle and interaction coverage proving the write button is temporarily `pointer-events:none` / `opacity:1` and the shield clears after the swallowed click. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification: Passed `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:ci`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` (0 errors, existing warning backlog).
- Updated wiki: [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]], [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]], [[Hot_Context]], [[Widget_Architecture]], [[Test_Strategy]]

## 2026-06-01 - fix | Gate decorative review-surface hovers on pointer:fine
- Summary: Fixed a compact-mobile sticky-hover where tapping a sort option (En Yüksek/En Düşük Puan) that overlaps the full-width "Yorum Yap" button closed the filter menu on `pointerdown` and left a hover-capable pointer resting on the button, latching a stuck `:hover` (opacity .92). Root cause is CSS, not layout/JS: bare `@media(hover:hover)` still matches hybrid/emulated-touch pointers. Gated all decorative review-surface hovers on the W3C/MDN-canonical `@media (hover:hover) and (pointer:fine)` — touch-operated contexts (`pointer:coarse`) no longer latch the dim, real mouse/trackpad keep it. A faithful `hover:none` phone was never affected (verified by Pixel-5 emulation; opacity stayed 1). Layout/design untouched.
- Key source changes: `src/widget/reviews-section/styles/{summary-controls,photo-strip,lightbox}.js` (8 hover rules). Added `tests/unit/widget-hover-gating.test.ts` (scans the three modules for bare/ungated decorative `:hover`). Rebuilt `public/widget.js` + `public/widget-runtime/*`. Confirmed there are no layout-specific `:hover` rules in any summary-layout/review-layout module, so the shared gate covers all summary×review layout combinations.
- Verification: Passed `pnpm build:widget`, `pnpm check:widget-js`, and `pnpm test:ci` (unit + widget-smoke + widget-runtime + widget-interactions + admin-preview). `node scripts/wiki-audit.mjs` → 0 errors.
- Follow-up: wizard modal (`review-form-modal/styles.js`) + PDP badge (`core/helpers.js`) hovers remain ungated — same class, separate task.
- Updated wiki: [[Hot_Context]]

## 2026-06-01 - fix | Harden summary popover and rating bar contracts
- Summary: Fixed the summary popover registry lifecycle/contract bug and hardened the rating bar chart interaction surface. `registerPopover()` now returns a handle with `notifyOpening()` / `unregister()`, disconnected popovers are purged after summary re-renders, and registered `close()` functions consistently return `wasOpen`. Rating bar rows are keyboard-reachable toggle buttons (`role=button`, `aria-pressed`, Enter/Space), and bar count columns use tabular numbers with an elastic minimum width for large localized counts.
- Key source changes: `src/widget/summary-layouts/shared/popover-registry.js`, `src/widget/summary-layouts/shared/actions-block.js`, `src/widget/summary-layouts/compact/index.js`, `src/widget/summary-layouts/shared/bar-chart.js`, `src/widget/reviews-section/styles/summary-controls.js`, `src/widget/summary-layouts/classic/styles.js`. Added `tests/unit/widget-popover-registry.test.ts`, runtime bar chart keyboard/isolation/count coverage, and an interaction smoke for filter light-dismiss after a summary re-render. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Verification: Passed `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:unit`, `pnpm test:widget-runtime`, `pnpm test:widget-interactions`, `pnpm test:widget-smoke`, `pnpm test:admin-preview`, `pnpm exec tsc --noEmit`, `pnpm lint`, and `git diff --check`. `node scripts/wiki-audit.mjs --changed-source-check` completed with 0 errors and the repo's existing warning backlog.
- Updated wiki: [[Bug_Summary_Popover_Registry_Lifecycle_Contract]], [[Bug_Index]], [[Hot_Context]], [[Widget_Architecture]], [[Widget_Files_Map]], [[CSS_Variable_Surface]], [[Test_Strategy]]

## 2026-06-01 - fix | Restore photo strip thumbnail size contract
- Summary: Fixed a settings-contract bug where list/gallery review layouts exposed "Fotoğraf Galeri Boyutu" but runtime overwrote the top photo strip thumbnail width with the layout item-photo width from `size`. The strip now always follows `thumbnailSize`; list/gallery item photos still follow widget `size`.
- Key source changes: `src/widget/reviews-section/render.js` no longer overrides `thumbPx` from review layout `sizeOverrides`. `src/widget/review-layouts/list/index.js` and `src/widget/review-layouts/gallery/index.js` comments clarify strip-vs-item-photo ownership. `tests/widget-runtime-smoke.spec.ts` pins list/gallery behavior with `size: small` and `thumbnailSize: large`.
- Verification: targeted runtime proof failed before the fix (strip width 80px), then passed after source/build update. `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:unit` (59/59), `pnpm test:widget-runtime` (18/18), `pnpm test:widget-smoke` (25/25), `pnpm test:admin-preview` (2/2), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit reported 0 errors and existing repo-wide warnings.
- Updated wiki: [[Bug_Photo_Strip_Thumbnail_Size_Contract]], [[Bug_Index]], [[Solved_Issues]], [[Photo_Strip]], [[CSS_Variable_Surface]], [[Test_Strategy]]

## 2026-06-01 - polish | Derive review empty-state text color
- Summary: Replaced the fixed gray `.renuvex-pr-state-msg` color used by "Henüz yorum yok." with the internal `--renuvex-pr-state-text` token. The token is derived from `reviewBodyColor` at 65% alpha, so the empty state follows the configured review text color family without adding a new admin color setting.
- Key source changes: `src/widget/reviews-section/render/theme-vars.js` now emits `--renuvex-pr-state-text`; `src/widget/reviews-section/styles/review-primitives.js` consumes it with a fixed fallback; `tests/unit/widget-theme-vars.test.ts` pins light/dark derivation.
- Verification: `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:unit` (59/59), `pnpm test:widget-runtime` (16/16), `pnpm test:widget-smoke` (25/25), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit reported 0 errors and existing repo-wide warnings.
- Updated wiki: [[CSS_Variable_Surface]], [[Test_Strategy]]

## 2026-06-01 - chore | Remove unreachable review "loading" state
- Summary: Removed the "Yorumlar yükleniyor..." loading placeholder from the review section render. It was dead UI: review data is fetched in `bootstrap.js` BEFORE `render()` is called, and inside `render()` the loading node was inserted and then cleared in the same synchronous tick (no `await` between), so the browser never painted it. The empty/error/disabled states are unaffected.
- Key source changes: `src/widget/reviews-section/render.js` drops the `loadingMsg` creation + `contentEl.replaceChildren(loadingMsg)` (the very next `contentEl.replaceChildren()` already clears content, so behavior is identical). `src/widget/reviews-section/styles/review-primitives.js` drops the now-unused `.renuvex-pr-state-loading` rule; `.renuvex-pr-state-msg` stays (used by "Henüz yorum yok"). Rebuilt `public/widget.js` + `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: `pnpm build:widget`, `pnpm lint`, `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, `git diff --check` clean; full suite green and unchanged — unit 58, widget-runtime 16, admin-preview 2, widget-interactions 13, widget-network-smoke 25.

## 2026-06-01 - polish | Pin widget icon registry Phosphor invariants
- Summary: Normalized the only remaining stroke-weight mismatch in the widget icon registry: `clover.empty` now uses Phosphor regular `stroke-width="16"`. Added unit guardrails proving every shipped review, filter, and UI chrome SVG stays on the Phosphor 256-grid `currentColor` system, with no legacy Lucide 24-grid or Unicode X/arrow glyphs.
- Key source changes: `src/widget/icons/review-icons.js` changes the clover outline stroke from 12 to 16. `tests/unit/widget-icon-sprite.test.ts` now enumerates `ICONS`, `FILTER_ICONS`, and `ui-icons.js` exports to enforce grid/color/stroke/legacy-glyph invariants. Rebuilt `public/widget.js` + `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:unit` (58/58), `pnpm test:widget-interactions` (13/13), `pnpm test:widget-runtime` (16/16), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed before commit. Wiki audit reported 0 errors and existing repo-wide warnings.
- Updated wiki: [[Widget_Architecture]], [[Widget_Files_Map]], [[Test_Strategy]]

## 2026-06-01 - polish | Derive wizard close control color from form background
- Summary: Decoupled the review wizard close (X) control from `formPrimaryTextColor`. The close icon and hover background are now deterministic contrast derivatives of `formBgColor`, so the system control stays readable on both light and dark form backgrounds without adding another admin color field.
- Key source changes: `src/widget/reviews-section/render/theme-vars.js` adds pure contrast helpers and maps `--renuvex-pr-fwizard-close-text` / `--renuvex-pr-fwizard-close-hover-bg` from `formBgColor`; `src/widget/reviews-section/review-form-modal/styles.js` keeps hover color on the close token instead of switching back to wizard text. Added `tests/unit/widget-theme-vars.test.ts` and a shadow-DOM interaction smoke for the real close/hover style. Rebuilt `public/widget.js` + `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:unit` (56/56), `pnpm test:widget-interactions` (13/13), `pnpm test:widget-runtime` (16/16), `pnpm test:widget-smoke` (25/25), `pnpm test:admin-preview` (2/2), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit reported 0 errors and existing repo-wide warnings.
- Updated wiki: [[Product_Review_Widget]], [[Widget_Customization]], [[Test_Strategy]], [[CSS_Variable_Surface]], [[Hot_Context]]

## 2026-06-01 - refactor | Split review render.js — Phase 2 (handler DI factory)
- Summary: Extracted the three render()-rerunning interaction handlers (fetch-error retry, rating filter, sort change) out of `reviews-section/render.js` into `render/handlers.js` `createReviewHandlers({ render })`. `render` is injected, so handlers.js never imports render.js (circular import physically impossible). Handler bodies were moved character-for-character; state is read via `core/state.js` ESM live bindings (not snapshots), and the shared `request-token.js` race-token still discards stale responses — so behavior is identical. Load-more stays inline in render.js because it inserts DOM incrementally (does not re-run render). render.js 452→407 lines (832→407 across both phases).
- Key source changes: New `src/widget/reviews-section/render/handlers.js`; `render.js` wires `buildReviewsErrorState(msg, handlers.onRetry)` and `layout.render({…, onFilterChange: handlers.onFilterChange, onSortChange: handlers.onSortChange})`; dead state imports (`currentBadgeSettings`, `currentProductName`, `setCurrentRatingFilter`, `setCurrentHasImages`) removed from render.js. Rebuilt `public/widget.js` + `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: build:widget, lint, check:widget-js, `tsc --noEmit` (note: tsconfig include is `**/*.ts`, so widget .js here is covered by lint+check+Playwright, not tsc), `git diff --check` clean; full suite unchanged — unit 54, widget-runtime 16, admin-preview 2, widget-interactions 12, widget-network-smoke 25 all green before and after. The stale-token (sort/load-more) and retry tests in widget-runtime-smoke are the direct coverage for the moved handlers.

## 2026-06-01 - refactor | Split review render.js — Phase 1 (pure builders)
- Summary: Reduced `src/widget/reviews-section/render.js` from 832 to 452 lines by extracting render()-independent pure builders into a new `reviews-section/render/` submodule folder, mirroring the `review-form-modal/` thin-orchestrator precedent. Behavior-preserving: no DOM/class/CSS output change; the recursive handler/state flow and the `reviewRequestSeq` race-token contract are untouched (token centralized in `render/request-token.js`). Handler extraction (DI factory) is a deliberately deferred Phase 2.
- Key source changes: New `render/{theme-vars,size-presets,states,photo-strip,request-token}.js`; `render.js` now imports them. `photo-strip.js` exposes `buildPhotoStrip(opts)` with `openReviewModal`/`wireLightboxTrigger` passed via DI to avoid a render↔modal cycle. Rebuilt `public/widget.js` + `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: `pnpm build:widget`, `pnpm lint`, `pnpm check:widget-js` clean; full suite unchanged — unit 54, widget-runtime 16, widget-interactions 12, widget-network-smoke 25 (107 total) all green before and after.

## 2026-06-01 - refactor | Remove listing badge mount rollout gate
- Summary: Completed the ADR_0017 listing mount cleanup. The temporary publicApiKey allowlist and legacy in-`<h2>` branch are gone; listing badge slots now mount as title siblings by default, with theme-specific exceptions handled only through adapter mount-point overrides.
- Key source changes: Deleted `src/widget/core/rollout.js`, simplified `src/widget/listing-badges/inject.js resolveMount()` to adapter override then sibling mount, and added a browser regression in `tests/widget-network-smoke.spec.ts` proving slots are siblings of product titles and still use one bulk ratings request. Rebuilt `public/widget.js` and `public/widget-runtime/*`; removed stale runtime hash artifacts.
- Verification: Targeted Playwright test failed before rebuilding the fixed runtime with the old in-title placement, then passed after the source/build update. Full validation is recorded in the task closeout.
- Updated wiki: [[ADR_0017_Badge_Architecture]], [[Decision_Index]], [[Listing_Rating_Widget]], [[Theme_Adapter_Playbook]], [[Hot_Context]]

## 2026-06-01 - fix | Use semantic PAGE_VIEW dedupe
- Summary: Fixed a verified widget loader lifecycle bug where the global 800 ms `PAGE_VIEW` debounce could suppress a real fast transition such as `PRODUCT -> CATEGORY`, delaying listing lifecycle until the DOM fallback path.
- Key source changes: `src/widget/core/storefront-context.js` now dedupes `PAGE_VIEW` by normalized `pageType + pathname/search`; `lastPageView` was removed from listing badge render state; `tests/widget-network-smoke.spec.ts` pins both distinct-transition pass-through and same-page duplicate suppression. Rebuilt `public/widget.js` and `public/widget-runtime/*`.
- Verification: The proof test failed before the fix (`/api/public/ratings-by-slug` stayed 0 inside the 1.5 second window). After the fix, the targeted pair passed, `pnpm test:widget-smoke` passed 24/24, `pnpm test:widget-runtime` passed 16/16, `pnpm test:widget-interactions` passed 12/12, `pnpm test:admin-preview` passed 2/2, `pnpm test:unit` passed 54/54, and static gates (`check:widget-js`, TypeScript, lint, diff, wiki audit) passed. Wiki audit has existing warnings only.
- Updated wiki: [[Bug_Widget_Page_View_Semantic_Dedupe]], [[Bug_Index]], [[Hot_Context]], [[Test_Strategy]], [[Widget_Architecture]], [[Widget_Performance]]

## 2026-06-01 - refactor | Split review-section CSS ownership modules
- Summary: Split the large shared `reviews-section/styles.js` payload into owned CSS modules without changing DOM structure, class names, public settings, API contracts, or shadow injection order. `reviews-section/styles.js` remains the stable `CLASSIC_CSS` aggregator.
- Key source changes: Added `styles/base.js`, `summary-controls.js`, `review-primitives.js`, `photo-strip.js`, and `lightbox.js`; rebuilt `public/widget.js` and `public/widget-runtime/*`; removed manifest-unreferenced stale hashed runtime artifacts.
- Verification: `pnpm build:widget`, `pnpm check:widget-js`, `pnpm test:widget-runtime`, `pnpm test:widget-interactions`, `pnpm test:widget-smoke`, `pnpm lint`, `pnpm exec tsc --noEmit`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit still reports existing warnings only.
- Updated wiki: [[Widget_Files_Map]], [[CSS_Variable_Surface]], [[Widget_Architecture]], [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]], [[Hot_Context]]

## 2026-05-31 - verify | Post-deploy widget runtime evidence
- Summary: Post-deploy widget verification confirmed production serves the pushed `runtime-RD6VN5NG.js` build. Clean controlled PDP scenarios no longer load `listing-badges-*`; `render-*` remains gated by the explicit review mount; JSON-LD passes the deployed structured-data contract.
- Verification: `pnpm measure:deployed-widget` measured `2026-05-31T12:41:31.066Z`; all four PDP scenarios excluded `listing-badges-*` and had `widgetError:0`. `pnpm verify:deployed-jsonld` measured `2026-05-31T12:41:46.402Z`; all six controlled JSON-LD scenarios passed. Sentry MCP search for `environment:prod level:error` over the last hour returned no events.
- Updated wiki: [[Widget_Transfer_Measurement_2026-05-29]], [[Structured_Data_Verification_2026-05-29]]

## 2026-05-31 - perf | Skip listing entry on clean PDP PAGE_VIEW
- Summary: Separate widget performance phase closed the known clean-PDP transfer waste: `PRODUCT` `PAGE_VIEW` was still loading the listing-badges entry chunk, and the PDP badge's own `#renuvex-reviews` link could be misread as a listing/product candidate by observer fallback logic.
- Key source changes: `src/widget/surfaces/listing-badge.surface.js` now gates page-triggered listing badge loads to listing-like page types (`INDEX`, `CATEGORY`, `BRAND`, `SEARCH`). `src/widget/observer.js` and `src/widget/listing-badges/fallback-candidates.js` ignore widget-owned hash/query links before product-link detection. `tests/widget-network-smoke.spec.ts` now asserts clean PDPs skip `listing-badges-*`, `/api/public/ratings-by-slug`, listing badge DOM, and placeholders. Rebuilt `public/widget.js` and `public/widget-runtime/*`.
- Verification: The new proof test failed before the source fix because `listing-badges-*` loaded on clean PDP. After the fix: targeted lifecycle/performance group passed 7/7, `pnpm test:widget-smoke` passed 22/22, `pnpm test:widget-runtime` passed 16/16, `pnpm test:unit` passed 54/54, `pnpm check:widget-js` passed 18/18, plus TypeScript, lint, and whitespace gates passed.
- Updated wiki: [[Hot_Context]], [[Widget_Performance]], [[Widget_Transfer_Measurement_2026-05-29]], [[Test_Strategy]]

## 2026-05-31 - fix | Replay synchronous listing/search context
- Summary: Widget loader/surface lifecycle audit found one verified production bug: if ikas `VIEW_LISTING` / `VIEW_SEARCH_RESULTS` was emitted synchronously during `IkasEvents.subscribe()`, `storefront-context.js` mapped the product data before `loader.js` registered `onListingView()`, so the listing surface mount trigger was lost.
- Key source changes: `src/widget/core/storefront-context.js` now stores `latestListing` and replays it to late listing subscribers, matching the existing product/page replay contract. `tests/widget-harness.ts` gained test-only IkasEvents sequencing controls. `tests/widget-network-smoke.spec.ts` now pins synchronous listing replay, duplicate product idempotency, PDP listing side-effect boundaries, listing event ordering, and fail-closed listing gates. Rebuilt `public/widget.js` and `public/widget-runtime/*`.
- Verification: New Playwright proof test failed before the fix (`ratings?` call stayed 0 for synchronous listing-only delivery). After the fix the lifecycle group passed 7/7.
- Updated wiki: [[Bug_Widget_Listing_Event_Replay]], [[Bug_Index]], [[Hot_Context]], [[Test_Strategy]]

## 2026-05-31 - fix | Keyboard-enable photo-strip lightbox triggers
- Summary: Wizard + lightbox lifecycle/accessibility audit found one verified issue: photo-strip thumbnails opened the lightbox only by pointer click. They were plain clickable `<img>` elements with no `role`, no `tabindex`, and no keyboard activation, while card/list/gallery review images already had keyboard semantics.
- Key source changes: Added `src/widget/reviews-section/lightbox-trigger.js` as the single trigger contract for lightbox photo elements, wired photo-strip thumbnails through it, and moved card/list/gallery image triggers to the same helper. Updated the wizard step-focus comment to match current dialog-open focus behavior. Rebuilt `public/widget.js` and `public/widget-runtime/*`.
- Verification: Added a failing Playwright regression first; it showed the photo-strip thumbnail could not hold focus and had null role/label/tabIndex. After the fix, the new test passed and full `pnpm test:widget-interactions` passed 9/9.
- Updated wiki: [[Bug_Lightbox_Focus_Trap_Accessibility]], [[Product_Review_Lightbox]], [[Product_Review_Widget]], [[Bug_Index]], [[Hot_Context]]

## 2026-05-31 - fix | Trap initial Shift+Tab in body-level overlays
- Summary: Fixed a verified focus-trap regression after the wizard/lightbox started focusing dialog containers on open. First `Shift+Tab` immediately after opening the wizard or photo lightbox escaped the shadow overlay because the active element was inside the trap but not in its tabbable list.
- Key source changes: `src/widget/shared/focus-trap.js` now routes non-tabbable in-trap focus targets into the tabbable cycle (`Tab` -> first, `Shift+Tab` -> last). `tests/widget-interaction-smoke.spec.ts` covers wizard + lightbox initial `Shift+Tab`. Also corrected the stale roving-tabindex comment and removed dead icon-only arrow `font-size` CSS in `reviews-section/styles.js`. Rebuilt `public/widget.js` and `public/widget-runtime/*`.
- Verification: temporary Playwright repro failed before the fix for both overlays; after the fix `pnpm test:widget-interactions` passed 8/8. Also passed `pnpm test:widget-runtime` (8/8), `pnpm test:unit` (54/54), `pnpm check:widget-js` (18/18), `pnpm exec tsc --noEmit`, `pnpm lint`, and `git diff --check`.
- Updated wiki: [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]], [[Hot_Context]], [[Bug_Index]]

## 2026-05-30 - fix | Suppress dialog focus-ring on reopen; drop photo-strip arrow shadow
- Two small widget polish items reported by the user. (1) After focusing the dialog container on open (a11y), the browser painted a `:focus-visible` outline around the whole lightbox/wizard frame on each (re)open once the keyboard had been used — added `:focus{outline:none}` on `.renuvex-pr-modal-wrap` (lightbox) and `.renuvex-pr-fwizard-overlay` (wizard), which are programmatic focus targets, not tabbed-to controls. (2) Removed the `box-shadow` behind the desktop photo-strip arrows per request; the hover scale animation (transform + transition) stays.
- Files: `reviews-section/styles.js` (modal-wrap `:focus` outline:none; photo-strip-arrow `box-shadow` removed from base + hover), `review-form-modal/styles.js` (overlay `:focus` outline:none). Rebuilt `public/*`. Verified with Playwright screenshots (reopen-after-Tab shows no frame ring; arrows render flat) + `pnpm test:widget-interactions` (7/7), `pnpm test:widget-runtime` (8/8), `pnpm check:widget-js` (18/18), `pnpm exec tsc --noEmit`, `pnpm lint`.

## 2026-05-30 - fix | Overlays focus the dialog on open (first Tab → star 1; no lightbox arrow ring)
- Follow-up to [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]]. Two user-reported nits: (1) the wizard's first Tab landed on star 2 (focus was auto-placed on star 1 at open); (2) opening a photo from the strip lit a focus ring on a lightbox nav arrow. Both overlays now focus the **dialog container** (`role=dialog`) on open instead of the first control; the wizard close button is appended last so the first Tab lands on star 1.
- Key source changes: `review-form-modal/modal-shell.js` (open focuses `overlay`; close button appended after content; removed a now-dead `focusFirstControl` export that referenced the renamed open-focus function — it threw a ReferenceError that briefly stopped the wizard opening), `reviews-section/review-modal.js` (lightbox focuses `modalWrap`). Regression test updated (first Tab → 1st star). Rebuilt `public/*`.
- Verification: Playwright (wizard open→dialog, first Tab→star1, ←/→ roam, Esc→trigger; lightbox open→`modalWrap` role=dialog, not a nav arrow), `pnpm test:widget-interactions` (7/7), `pnpm test:widget-runtime` (8/8), `pnpm test:unit` (54/54), `pnpm exec tsc --noEmit`, `pnpm lint`.

## 2026-05-30 - fix | Wizard stars Tab-navigable + clean close focus (a11y revision)
- Revision of the same-day [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]] after user testing. Two changes: (1) the strict single-Tab-stop radiogroup (roving `tabindex`) was reverted — all 5 stars are Tab stops again so **Tab moves between them**, with ←/→/↑/↓ as an additional method; (2) the ESC "momentary focus" was fixed — `modal-shell.js close()` now moves focus out **immediately** (keyboard → trigger, pointer → blur) instead of after the 200 ms fade, so no focus ring lingers on a star while the modal closes.
- Key source changes: `steps/step-rating.js` (removed roving `updateRoving`; `selectRating` no longer manages tabindex; all stars stay Tab-focusable), `review-form-modal/modal-shell.js` (immediate focus-out in `close()`). Regression test in `widget-interaction-smoke.spec.ts` updated (Tab now → next star). Rebuilt `public/*`.
- Verification: Playwright (open→1st star, ←/→ roam, Tab→next star, Esc→trigger immediately / pointer→blur), `pnpm test:widget-interactions` (7/7), `pnpm test:widget-runtime` (8/8), `pnpm test:unit` (54/54), `pnpm exec tsc --noEmit`, `pnpm lint`.

## 2026-05-30 - fix | Wizard rating radiogroup (roving tabindex) + shadow-aware focus return
- Summary: User a11y report — in the wizard, Tab stepped through all 5 rating stars (one stop each) and Esc didn't return focus to the "Yorum Yap" trigger. Made the star `radiogroup` a single Tab stop with arrow-key roving, and fixed focus-return for shadow-hosted triggers. See [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]].
- Reason: the `role=radio` stars all had default `tabindex=0` (WAI-ARIA radiogroup should be one Tab stop + ←/→ roving); and `getReturnFocusElement()` read `document.activeElement`, which is the shadow HOST for a trigger inside a shadow root — so `restoreFocus(host)` no-op'd and focus fell to `<body>` on close.
- Key source changes: `steps/step-rating.js` (roving tabindex; ←/→/↑/↓ + Home/End move + select without advancing; Enter/Space/tap select + advance; focus still enters on the 1st star). `shared/focus-trap.js` (`getReturnFocusElement` drills shadow roots via `deepActiveElement`; `isVisibleFocusable` excludes `tabindex<0` so roving-inactive radios don't corrupt the trap's first/last and let Tab escape). `focus-trap.js` is shared, so the lightbox's focus return is hardened too. Rebuilt `public/*`.
- Public behavior: keyboard users Tab once into the star group then use arrows; Enter/tap selects + advances; closing returns focus to the trigger. Pointer/touch behavior unchanged.
- Verification: Playwright (open→1st star, arrows roam, Tab=single stop, Esc→trigger), `pnpm test:widget-interactions` (7/7 incl. new a11y regression), `pnpm test:widget-runtime` (8/8), `pnpm test:unit` (54/54), `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, `pnpm lint`.
- Prevention: regression test pins the radiogroup + focus-return contract; roving tabindex is the pattern for future option groups; overlay focus return must be shadow-aware.

## 2026-05-30 - fix | Show wizard back-arrow caret on mobile
- The review-wizard "Geri" button's caret was missing on the mobile/narrow footer layout — hidden by a pre-existing `.renuvex-pr-fwizard-footer-back > svg{display:none}` rule (old "text-only Geri on mobile" design). Desktop already showed it. For icon consistency across viewports after the Phosphor unification, removed that rule so "‹ Geri" shows everywhere.
- CSS-only in `src/widget/reviews-section/review-form-modal/styles.js`; rebuilt `public/*`. Verified on a 390px viewport (back-arrow `svg` display:block, `getBBox()` > 0, visible "‹ Geri") plus `pnpm test:widget-interactions` (6/6), `pnpm test:widget-runtime` (8/8), `pnpm lint`.

## 2026-05-30 - fix | Phosphor caret/X icons rendered blank (iconUseNode use-instancing)
- Summary: The Phosphor caret (`‹ › ⌄`) and X icons added in the icon-unification rendered as blank buttons on the storefront (box present + clickable, no glyph). Affected every `appendChild(iconUseNode(...))` site: lightbox close + prev/next, photo-strip arrows, wizard close, thumbnail-remove. See [[Bug_Icon_Use_Node_Blank_Glyphs]].
- Reason: `iconUseNode` built the `<svg><use href="#sym">` via `DOMParser('image/svg+xml')` + `importNode`. A `<use>` created that way does NOT instance its referenced sprite `<symbol>` once moved into a live (shadow) tree — non-zero bounding rect but empty `getBBox()` → no paint. `iconUseSvg`-string sites (filter, compact chevron, wizard back) and filled stars were unaffected because they are HTML-parsed.
- Key source changes: `src/widget/icons/star-sprite.js` — `iconUseNode()` now parses the icon markup as HTML (detached `<div>` + `insertAdjacentHTML`, return `firstElementChild`) so the `<use>` resolves on insertion. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Why it shipped: the widget smoke/runtime/interaction tests assert behavior + presence (the buttons still click), never rendered geometry. Added a regression in `tests/widget-interaction-smoke.spec.ts` that opens the lightbox and asserts the photo-strip caret + lightbox close `svg.getBBox().width > 0` (fails on the old code).
- Diagnosis: Playwright + real Chromium screenshots and `getBBox()` comparison; a controlled swatch proved the same symbol `<use>` paints when HTML-parsed but is blank via `image/svg+xml` + `importNode`.
- Verification: `pnpm build:widget`, `pnpm check:widget-js` (18/18), `pnpm test:unit` (54/54), `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:widget-interactions` (6/6), `pnpm test:widget-runtime` (8/8); visual confirmation of all caret/X glyphs.
- Prevention: SVG `<use>` referencing a sprite symbol (for a shadow tree) must be HTML-parsed, not `image/svg+xml` + `importNode`; icon tests must assert `getBBox()`, not just presence.

## 2026-05-30 - style | Filter "lines" + compact chevron → Phosphor (widget now fully Phosphor)
- Converted the two glyphs left off-family after the unification: the filter default `lines` icon (was Google Material Symbols, 960-grid fill path) and the compact summary dropdown chevron (was a custom 14×8 path). Both are now Phosphor — added `UI_CARET_DOWN` to `icons/ui-icons.js`, inlined the Phosphor `lines` markup in `filter-icons.js`, removed the now-unused Material Symbols grid + corrected the source credit to Phosphor-only. No off-family widget glyph remains (admin `lucide-react` is a separate React surface).
- The filter icon has one source: admin (`IconSelect.tsx`/`widgetDefs.ts`) and storefront (`actions-block.js`) both read `getFilterIconSvg`, so the swap covers both. Rebuilt `public/*`. Verified: `build:widget`, `check:widget-js` 18/18, `tsc`, `lint`, live chunks carry the new Phosphor paths (no old Material Symbols / custom chevron).

## 2026-05-30 - refactor | Unify storefront widget icons on Phosphor
- Summary: Converted the remaining off-family widget "chrome" glyphs to the Phosphor icon family for visual consistency — wizard back-arrow + close + thumbnail-remove, lightbox close (desktop + mobile) + prev/next, and photo-strip prev/next. Builds on the same-day [[Bug_Icon_Sprite_Inner_Dimension_Strip]] sprite fix that made `<rect>`-framed icons safe.
- Reason: stars/filter (and the just-migrated wizard photo/plus) were Phosphor 256-grid, but the wizard back/close were Lucide 24-grid and the lightbox/photo-strip/thumbnail-remove controls were Unicode text glyphs (`✕`, `‹`, `›`). Mixed families + heavier glyph weights looked inconsistent.
- Key source changes: new `src/widget/icons/ui-icons.js` (shared `UI_CARET_LEFT`/`UI_CARET_RIGHT`/`UI_CLOSE` + moved `PHOTO_ICON`/`PLUS_ICON`), re-exported via `icons/index.js`. New `iconUseNode()` in `icons/star-sprite.js` returns a parsed `<svg>` element so call sites use `appendChild` (no inner-markup assignment — also sidesteps the repo's inner-markup security hook). Call sites: `review-form-modal/{progress-bar,modal-shell,steps/step-photos}.js`, `reviews-section/{review-modal,render}.js`. CSS `svg` sizing added in `reviews-section/styles.js` + `review-form-modal/styles.js` (mirrors `.renuvex-pr-fwizard-photo-add svg`). Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Public behavior: identical interactions; icons are now one consistent Phosphor family. `stroke="currentColor"` preserves the merchant-configurable photo-strip arrow color. Compact summary dropdown chevron intentionally left as-is; admin dashboard (`lucide-react`) out of scope.
- Verification: `pnpm build:widget`, `pnpm check:widget-js` (18/18), `pnpm test:unit` (54/54 incl. extended icon test), `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:widget-interactions` (5/5), `pnpm test:widget-runtime` (8/8). Confirmed the live chunks carry the Phosphor caret/X paths and no `&#8249;`/`&#8250;`/`✕` glyphs.
- Prevention: chrome glyphs now have one source of truth (`icons/ui-icons.js`); the unit test pins the Phosphor family invariants + lossless sprite conversion.

## 2026-05-30 - fix | Icon sprite stripped inner <rect> dims (image-icon frame) + Phosphor wizard icons
- Summary: The review wizard's "Fotoğraf Ekle" icon rendered without its square frame; root cause was the icon sprite globally stripping `width`/`height`. Fixed, and swapped the wizard photo/plus icons to Phosphor to match the badge/filter family. See [[Bug_Icon_Sprite_Inner_Dimension_Strip]].
- Reason: `icons/star-sprite.js` `svgStringToSymbol` removed the root `<svg>`'s `width`/`height` with global (`/g`) regexes, which also deleted them from the image icon's frame `<rect width height>` → a 0×0 rect renders nothing. Latent since the unified `<symbol>`/`<use>` sprite was introduced; invisible until now because every other widget icon is `<path>`/`<circle>`/`<line>` based.
- Key source changes: `src/widget/icons/star-sprite.js` (scope the strip to the root `<svg>` opening tag only; `export svgStringToSymbol` for unit testing), `src/widget/reviews-section/review-form-modal/steps/step-photos.js` (Phosphor 256-grid `PHOTO_ICON`/`PLUS_ICON` inline path data, single source of truth in `updateAddButton()`, removed the duplicate initial `innerHTML` render). New unit test `tests/unit/widget-icon-sprite.test.ts`. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Public behavior: the add-photo icon now shows its full frame; the icon family is consistent (Phosphor) across badge/filter/wizard. No API/settings/schema/mount changes.
- Verification: `pnpm build:widget`, `pnpm check:widget-js` (18/18), `pnpm test:unit` (51/51 incl. new sprite regression), `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm test:widget-interactions` (5/5 incl. review wizard). Confirmed the rebuilt render chunk carries the Phosphor `image`/`plus` paths and no longer the old Lucide `image` polyline.
- Prevention: sprite/symbol transforms must scope attribute edits to the root tag, never globally across inner geometry; the unit test pins inner `<rect width height>` survival + byte-identical path-icon output.

## 2026-05-30 - fix | Filter dropdown light-dismiss under Shadow DOM
- Summary: Fixed the classic review summary filter dropdown after Shadow DOM isolation — it stayed open on re-tap, and a dismiss/option tap over the photo strip opened a thumbnail's lightbox. See [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]].
- Reason: `summary-layouts/shared/popover-registry.js` ran light-dismiss from a `document`-level click listener using `event.target`. For clicks inside the review-section shadow root, `event.target` retargets to the host (`#renuvex-reviews`), so `contains()` checks were always false → every click closed the menu (the trigger's `onclick` then reopened it → stuck open), and the dismiss/`pointerdown`-activation click fell through to `.renuvex-pr-photo-strip-thumb`. Same isolation-asymmetry class as tap-highlight / scroll-lock.
- Key source changes: `src/widget/summary-layouts/shared/popover-registry.js` (use `event.composedPath()` for membership; swallow the dismiss click; `swallowNextDismissClick()` one-shot for pointer activation), `src/widget/summary-layouts/shared/actions-block.js` (`closeFilter` returns `wasOpen`; `activateOption` arms the swallow for pointer/touch). Regression test in `tests/widget-interaction-smoke.spec.ts`. Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Public behavior: filter dropdown toggles correctly again; a light-dismiss tap only closes the menu (no longer double-activates the element under it). No API/settings/schema/mount changes.
- Verification: `pnpm build:widget`, `pnpm test:widget-interactions` (5/5, incl. new filter test), `pnpm test:widget-runtime` (8/8), `pnpm test:unit`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`.
- Prevention: any `document`/`window` handler targeting Shadow-DOM UI must use `composedPath()`, not `event.target` (which retargets to the host) — the popover analogue of the focus-trap `getActiveElementWithin` lesson.

## 2026-05-30 - refactor | Unify wizard back-button history onto shared module
- Summary: Moved the review-form wizard's back-button history from its own `index.js` block to the shared `core/modal-history.js` (the lightbox already used it), and extended the overlay contract invariant to enforce history sharing too.
- Reason: Completes the [[ADR_0025_Overlay_Shared_Surface_Foundation]] unification — history was the last duplicated/divergent overlay concern. The wizard used `pushState({renuvexPrReviewModal})` + `history.back()`; the shared module uses an id-based entry + `replaceState`.
- Behavior note: back button still CLOSES the wizard (no step-back change). The one observable difference: the shared `replaceState` cleanup is quieter — it does not fire `popstate` on a merchant theme's SPA router (the wizard's old `history.back()` did, a latent risk). Accepted trade-off: after a manual close the first phone-back press is a no-op (same URL) before the page leaves, matching the lightbox's existing behavior. User-confirmed.
- Key source changes: `src/widget/reviews-section/review-form-modal/index.js` (uses `pushModalHistoryEntry`/`restoreModalHistoryEntry`), `tests/unit/widget-surface-contracts.test.ts` (history added to the overlay shared-surface contract). Rebuilt `public/widget.js` + `public/widget-runtime/*`.
- Public behavior: no merchant API, settings schema, Prisma, ikas integration, or mount contract changes. Mobile back-button still closes the wizard.
- Verification: `pnpm build:widget`, `pnpm test:unit` (47/47, incl. the new history contract), `pnpm test:widget-interactions` (4/4), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`.

## 2026-05-30 - refactor | Overlay shared-surface foundation (fixes wizard scroll lock)
- Summary: Extracted the duplicated/divergent shell concerns of the two body-level overlays into shared modules and added an enforced contract invariant. Fixes the review-form wizard failing to lock background scroll on some themes / mobile.
- Reason: The wizard had its own weaker `lockBodyScroll` (only `body{overflow:hidden}`, no `!important`, no `<html>`, no iOS `position:fixed`), so on themes whose scroll container is `<html>` (or that override `body` overflow) and on iOS the storefront scrolled behind the open wizard. The photo lightbox already had a robust theme-agnostic lock. Inspection found the duplication spanned scroll lock (divergent), the focus toolkit (verbatim copy), back-button history, and `overscroll-behavior` (wizard had none). Same asymmetry class as the tap-highlight regression — a surface drifting from a shared concern.
- Key source changes: new `src/widget/core/body-scroll-lock.js` (robust, ref-counted), `src/widget/shared/focus-trap.js`, `src/widget/core/modal-history.js`; `src/widget/reviews-section/review-modal.js` (lightbox) and `review-form-modal/modal-shell.js` (wizard) now consume them (local copies deleted); `review-form-modal/styles.js` gains `overscroll-behavior:contain`. Guardrails: `tests/widget-interaction-smoke.spec.ts` (scroll-lock regression: both overlays lock `<html>`+`<body>`), `tests/unit/widget-surface-contracts.test.ts` (overlay shared-surface invariant). [[ADR_0025_Overlay_Shared_Surface_Foundation]].
- Decision note: the originally approved `createOverlaySurface()` controller was rejected during implementation as over-abstraction for two genuinely divergent overlays (different fade strategy, lightbox preview-sync/swipe, history split into wizard `index.js`). Shared modules + contract test deliver the ortak/kişisel separation and anti-recurrence guarantee without rewriting battle-tested lightbox flow. User-confirmed.
- Public behavior: no merchant API, settings schema, Prisma, ikas integration, or storefront mount contract changes. Wizard now locks background scroll on every theme + iOS (matching the lightbox); rebuilt `public/widget.js` + `public/widget-runtime/*` (deploy serves committed assets).
- Verification: `pnpm build:widget`, `pnpm test:unit` (46/46, incl. contract invariant), `pnpm test:widget-interactions` (4/4, incl. scroll-lock regression), `pnpm test:widget-runtime` (8/8), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`.
- Follow-up (low priority): unify the wizard's back-button history (`index.js`) onto the shared `core/modal-history.js`; both work today.

## 2026-05-29 - fix | Wizard touch-contract parity (BASE_RESET in wizard shadow)
- Summary: Added `BASE_RESET_CSS` to the review-form wizard shadow injection (`modal-shell.js` → `HOST_RESET_CSS + BASE_RESET_CSS + FWIZARD_CSS`), matching the section and lightbox surfaces.
- Reason: The prior tap-highlight fix removed the wizard's blue flash but left its buttons with no press-state feedback on mobile (the flash had implicitly served that role) and without `touch-action:manipulation`. The wizard was the only review shadow surface missing `BASE_RESET_CSS`.
- Effect: Wizard buttons now get the full [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] contract — deterministic `:active{opacity:0.85}` press dip (the intended replacement for the removed flash), `touch-action:manipulation` (no double-tap-zoom on rapid star taps), and `-webkit-touch-callout:none`. `user-select:none` is scoped to buttons/`[role]`, so input/textarea text selection is unaffected. All three review shadow surfaces now carry the identical touch contract.
- Key source changes: `src/widget/reviews-section/review-form-modal/modal-shell.js`; rebuilt `public/widget.js` + `public/widget-runtime/*` (deploy serves committed assets). [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]].
- Public behavior: no merchant API, settings schema, Prisma, ikas integration, or mount contract changes. Wizard button `:active` visual now dims slightly on press (intended parity).
- Verification: `pnpm build:widget`, `pnpm test:widget-interactions` (wizard included), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`.

## 2026-05-29 - fix | Wizard mobile tap-highlight regression (shadow reset altitude)
- Summary: Added `-webkit-tap-highlight-color:transparent` to `HOST_RESET_CSS` so the mobile blue tap-highlight stays suppressed inside every review shadow surface, including the review-form wizard.
- Reason: [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] injected the wizard shadow root with `HOST_RESET_CSS + FWIZARD_CSS` only, omitting `BASE_RESET_CSS` (which carries the [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]] tap-highlight reset). The review section and lightbox include `BASE_RESET_CSS`; the wizard did not, so tapping wizard fields on mobile showed the browser default blue flash — a light↔shadow asymmetry regression, not an intended re-enable.
- Fix rationale: placed the reset at `:host` (an inherited property → cascades to all shadow descendants, classed or not, current or future) instead of only patching the wizard. This closes the asymmetry at the source: `HOST_RESET_CSS` is injected into every shadow surface by construction. `BASE_RESET_CSS` keeps class-prefix scoping because it also injects into `document.head` (must not touch merchant DOM).
- Key source changes: `src/widget/core/shadow.js`; rebuilt `public/widget.js` + `public/widget-runtime/*` (deploy serves committed assets — `pnpm build` runs `next build`, not `build:widget`). [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]].
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, or storefront mount contract changes. Mobile-only visual fix inside the wizard shadow surface.
- Verification: `pnpm build:widget`, `pnpm test:widget-interactions` (3/3, wizard included), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`.
- Follow-up (optional parity): wizard still lacks the rest of the BASE_RESET contract (`touch-action:manipulation` + `:active` opacity dip on buttons); revisit if button press-feedback parity matters.

## 2026-05-29 - test | Hostile host-theme CSS isolation regression
- Summary: Added an automated regression that pins the [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]] guarantee — host-theme selector CSS cannot cross the review shadow boundary.
- Reason: ADR_0021's whole point (the 2026-05-25 "Mine" theme `img{width:100%!important}` thumbnail blow-up) had no executable regression after the original hostile-theme fixture was removed on 2026-05-28. Coverage proved "renders in shadow" (presence) but not "survives hostile host CSS".
- Key source changes: `tests/widget-harness.ts` (new `hostileThemeCss` option + light-DOM control image + `widthInReviewsShadow`/`elementWidth` helpers), `tests/widget-runtime-smoke.spec.ts` (new test), [[ADR_0021_Shadow_DOM_Isolation_Of_Review_Surfaces]], [[Test_Strategy]].
- Test contract: inject `img{width:100%!important}`; assert the light-DOM control image balloons to its 600px container (rule is live), then assert the shadow-hosted `.renuvex-pr-photo-strip-thumb` stays at its widget size (~110px medium preset), proving the boundary holds.
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, runtime widget code, or storefront mount contract changes — test-only.
- Verification: `pnpm build:widget`, the new `pnpm test:widget-runtime` case (passed locally), `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`.

## 2026-05-29 - fix | Accept lazy_storefront sync reason + theme-clone evidence
- Summary: Added `lazy_storefront` to the `isStorefrontThemeSyncReason` parser whitelist and recorded the Ozy → "Ozy 2" theme-clone identity test as wiki evidence.
- Reason: [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] introduced the `lazy_storefront` reason and its TypeScript union, but `isStorefrontThemeSyncReason` (used by `parseStorefrontThemeState`) never accepted it, so a persisted state with `reason: 'lazy_storefront'` lost its reason on parse and could read back as another reason. The clone case was also the one theme mutation not yet verified against the allowlist.
- Key source changes: `src/lib/storefront-theme.ts`, `tests/unit/storefront-theme.test.ts`, [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]], [[Ikas_Theme_Limitations]].
- Evidence: Ozy → "Ozy 2" clone on Merchant A (dev-mertcopper) kept `activeThemeId: 57225e07-aa38-4d38-9688-f6730ee16143` and `activeThemeVersionId: 5ecd7d44-3748-41b3-82e2-b3d3e54955bd` identical, so the adapter still resolves `ozy` via `adapterMatchedBy: 'theme_id'` and `autoPlacementEnabled` stays `true`; only `activeThemeName`, `activeStorefrontThemeId`, and `mainStorefrontThemeId` (`ed18b5f8-...` → `2c972e10-...`) changed. Confirms the allowlist must key on `activeThemeId`, not the per-merchant storefront-theme instance id.
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, or storefront mount contract changes. Adapter selection was already correct in practice; the fix restores the persisted `reason` value for telemetry/debugging.
- Verification: `pnpm test:unit`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`.

## 2026-05-29 - feat | Structured data surface and Google Rich Snippets toggle
- Summary: Moved Product `AggregateRating` JSON-LD out of the visual PDP badge into an independent `structured-data` surface and added `Ürün Yorumları` → `SEO` → `Google Rich Snippets` (`richSnippetsEnabled`, default `true`).
- Reason: Google rich snippets are an SEO concern, not a badge styling concern. Badge disabled should only hide visual badges; JSON-LD should still render when an explicit review section is visible and approved rating data exists.
- Key source changes: `src/widget/structured-data/*`, `src/widget/surfaces/structured-data.surface.js`, `src/widget/core/rating-summary.js`, `src/widget/rating-badge/inject.js`, `src/components/home-page/widgets/widgetDefs.ts`, `tests/widget-network-smoke.spec.ts`, `scripts/verify-deployed-jsonld.mjs`, and `scripts/measure-deployed-widget-network.mjs`.
- Public behavior: badge toggle no longer controls JSON-LD. Rich snippets can be disabled explicitly with the new reviews SEO toggle. No public API, Prisma schema, ikas script contract, or mount contract change.
- Verification: `pnpm build:widget`, `pnpm test:unit`, `pnpm test:widget-smoke`, `pnpm test:widget-runtime`, and `pnpm test:admin-preview` passed during implementation; full final gate is tracked in the implementing commit.

## 2026-05-29 - test | Production evidence and surface contract guardrails
- Summary: Added repeatable production-evidence commands for deployed widget transfer size and JSON-LD behavior, extracted the listing fallback DOM candidate probe into a testable module, and added a unit-level surface test contract gate.
- Reason: Runtime behavior should not rely on manual Network-tab interpretation. The project now has scripts that load deployed widget assets while mocking merchant/API data, plus a contract that fails when a new widget surface is added without a declared test layer.
- Key source changes: `scripts/measure-deployed-widget-network.mjs`, `scripts/verify-deployed-jsonld.mjs`, `src/widget/listing-badges/fallback-candidates.js`, `tests/unit/widget-surface-contracts.test.ts`, `tests/widget-harness.ts`, `tests/widget-network-smoke.spec.ts`, and `.github/pull_request_template.md`.
- Evidence: [[Widget_Transfer_Measurement_2026-05-29]] and [[Structured_Data_Verification_2026-05-29]].
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, or storefront mount contract changes. Generated widget runtime changed because `loader.js` now imports the fallback candidate helper.
- Verification: `pnpm build:widget`, `pnpm test:unit`, `pnpm test:widget-smoke`, `pnpm measure:deployed-widget`, and `pnpm verify:deployed-jsonld` passed during implementation; full gate is tracked in the implementing commit.
- Follow-up: Deployed transfer evidence shows current PDP `PAGE_VIEW` still loads the listing-badges entry chunk. The fallback timer is now deterministic and tested; page-type routing optimization is a separate future change.

## 2026-05-28 - test | Review API and runtime evidence expansion
- Summary: Deepened the quality gate around the highest-risk public review API and the widget fallback/performance evidence paths.
- Reason: The first quality-gate pass covered major surfaces, but `/api/public/reviews` still needed edge-case coverage for validation, profanity, rate limits, trusted image policy, target verification, approval modes, and GET filter behavior. Listing fallback also needed a positive product-listing case, not only generic-link negatives.
- Key source changes: `tests/unit/public-api-routes.test.ts`, `tests/widget-harness.ts`, `tests/widget-network-smoke.spec.ts`, `.github/pull_request_template.md`, [[Test_Strategy]], [[Widget_Performance]], and [[Structured_Data_And_Rich_Snippets]].
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, or storefront mount contract changes.
- Verification: tracked in the implementing commit; expected gate is `pnpm test:ci`, `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`.

## 2026-05-28 - test | Full widget/app quality gate expansion
- Summary: Expanded automated coverage from network-only widget smoke to layered Playwright + Vitest quality gates.
- Reason: The project needed repeatable coverage for layout combinations, lightbox/wizard flows, admin preview/settings behavior, public APIs, and theme-state fail-closed rules without depending on production ikas auth, Cloudinary, Sentry, or DB credentials.
- Key source changes: `tests/widget-harness.ts`, `tests/widget-runtime-smoke.spec.ts`, `tests/widget-interaction-smoke.spec.ts`, `tests/admin-preview-smoke.spec.ts`, `tests/unit/public-api-routes.test.ts`, `tests/unit/storefront-theme.test.ts`, `vitest.config.ts`, `scripts/check-widget-runtime.mjs`, `package.json`, `playwright.widget.config.ts`, and `.github/workflows/widget-smoke.yml`.
- Public behavior: no merchant API, widget settings schema, Prisma schema, ikas integration, or storefront mount contract changes.
- Verification: `pnpm build:widget`, `pnpm test:ci`, `pnpm check:widget-js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`.
- Updated wiki: [[Test_Strategy]] (new), [[Index]], [[Widget_Architecture]], [[Widget_Performance]], [[Dependency_Map]], [[Open_Questions]], [[Hot_Context]], [[Log]].

## 2026-05-28 - test | Widget network/chunk smoke CI
- Summary: Added `pnpm test:widget-smoke` plus the `Widget Smoke` GitHub Actions workflow.
- Reason: ADR_0023/ADR_0024 moved the widget to a lazy-surface architecture, but the most important guarantees are browser-visible network outcomes: which chunks and APIs load under mount-present, mount-absent, badge-disabled, unsupported-theme, and generic-link-page scenarios. Those guarantees now run as an executable CI gate instead of living only in manual Network-tab checks.
- Key source changes: `tests/widget-network-smoke.spec.ts`, `playwright.widget.config.ts`, `.github/workflows/widget-smoke.yml`, `package.json`, and `pnpm-lock.yaml`.
- Public behavior: no runtime merchant API, settings schema, backend API, Prisma, or ikas integration changes.
- Verification: `pnpm test:widget-smoke` passed locally; full static/build/wiki verification is tracked in the implementing commit.
- Updated wiki: [[Widget_Architecture]], [[Widget_Performance]], [[ADR_0023_Widget_Lifecycle_Gating_Contract]], [[ADR_0024_Badge_Review_Surface_Separation]], [[Hot_Context]], [[Log]].

## 2026-05-28 - refactor | Rename reviews section module
- Summary: Renamed the broad PDP review implementation module to `src/widget/reviews-section/` and moved the shared PDP title placement helper to `src/widget/core/product-title.js`.
- Reason: The badge/review/listing split from [[ADR_0024_Badge_Review_Surface_Separation]] left the old folder name broader than its responsibility. The new hierarchy makes review-section, rating-badge, listing-badges, shared core helpers, and future mount-based surfaces easier to reason about.
- Key source changes: `src/widget/reviews-section/bootstrap.js`, `reviews-api.js`, `render.js`, `styles.js`, `review-modal.js`, and `review-form-modal/**`; `src/widget/core/product-title.js`; lazy render loader renamed to `loadReviewsRenderModule()`.
- Public behavior: script URL, `<div data-renuvex-widget="reviews"></div>` mount contract, settings schema, backend APIs, Prisma, and ikas integration are unchanged.
- Verification: Build/static/browser/deploy checks are tracked in the implementing commit.
- Updated wiki: [[Widget_Architecture]], [[Widget_Files_Map]], [[Folder_Structure]], [[Product_Review_Widget]], [[Product_Review_Lightbox]], [[Product_Rating_Badge]], [[Photo_Strip]], [[Widget_Performance]], [[Hot_Context]], [[Log]].

## 2026-05-27 - refactor | Widget surface boundary hardening
- Summary: Follow-up to [[ADR_0024_Badge_Review_Surface_Separation]]. `reviews-section/bootstrap.js` now stays a small review-section orchestrator; shared review/photoStrip data access moved to `src/widget/reviews-section/reviews-api.js`. The legacy 2-second listing fallback in `src/widget/loader.js` now requires product-card-like candidates instead of any generic link. Widget error forwarding now captures failed widget script/chunk resource loads plus route/visibility/readyState/online context.
- Reason: The ADR_0024 split solved the main bundle/API waste, but the review fetch helpers still lived in a too-broad bootstrap module and the listing fallback guard was intentionally loose. The rare DevTools "error script" observation also needed diagnostic data rather than a guess. These changes keep the same public behavior while making ownership boundaries explicit and improving production triage.
- Key source changes: New `src/widget/reviews-section/reviews-api.js`; updated `src/widget/reviews-section/bootstrap.js`, `src/widget/reviews-section/render.js`, `src/widget/loader.js`, `src/widget/core/error-reporter.js`, and `src/widget/classic-loader.js`.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check`, and post-deploy smoke on the dev storefront.
- Updated wiki: [[Widget_Architecture]], [[Widget_Files_Map]], [[Photo_Strip]], [[ADR_0007_Photo_Strip_Cap_And_Rotation]], [[ADR_0010_Widget_Error_Forwarding]], [[ADR_0024_Badge_Review_Surface_Separation]], [[Sentry_Operations]], [[Hot_Context]], [[Log]].

## 2026-05-27 - feat | Badge / review section surface separation (ADR_0024)
- Summary: PDP rating badge is now an independent product surface with its own `rating-badge-*` lazy chunk. The review section no longer owns badge injection, and review bootstrap returns before reviews/photoStrip fetches when `<div data-renuvex-widget="reviews"></div>` is absent.
- Reason: Badge-only PDPs were paying the review-section bundle and API cost. Separating the surfaces applies [[ADR_0023_Widget_Lifecycle_Gating_Contract]] to the PDP badge and keeps unknown-theme auto-placement fail-closed via [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]].
- Key source changes: `src/widget/rating-badge/index.js` owns settings gates, `isAutoPlacementEnabled()`, the one-product `/api/public/ratings` fetch, and calls `injectRatingBadge`. At the time of ADR_0024, `src/widget/rating-badge/inject.js` owned badge DOM + JSON-LD cleanup; on 2026-05-29 JSON-LD moved to `src/widget/structured-data/*`, so the badge module now owns visual badge DOM only. `src/widget/reviews-section/render.js` no longer injects badges; `src/widget/reviews-section/bootstrap.js` skips review fetch/render work when the review mount is absent; `src/widget/loader.js` guards the 2-second listing fallback.
- Implementation note: post-deploy smoke caught that a static `render.js` import from `bootstrap.js` still downloaded the heavy review renderer before the mount guard could return. `bootstrap.js` now dynamically imports `render.js` only after the explicit review mount and review fetch path.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`. Smoke scenarios: Ozy PDP with/without review mount, badge disabled, unsupported/generic theme, SPA PDP-to-PDP cleanup, and clean PDP listing fallback.
- Updated wiki: [[ADR_0024_Badge_Review_Surface_Separation]] (new), [[Decision_Index]], [[ADR_0023_Widget_Lifecycle_Gating_Contract]], [[Hot_Context]], [[Log]], [[Product_Rating_Badge]], [[Widget_Performance]].

## 2026-05-27 - feat | Widget lifecycle gating contract + listing-badges top-level gate (ADR_0023)
- Summary: New [[ADR_0023_Widget_Lifecycle_Gating_Contract]] codifies the three-layer gating model that existing widgets (reviews, badge) already follow: Layer 1 always-load bootstrap (`widget.js` + runtime, ~12 KB) on every storefront page; Layer 2 context-driven entry chunks (`bootstrap.js`, `listing-badges/index.js`, ~10-15 KB each) loaded by surface descriptors when the matching Storefront Event fires; Layer 3 settings + capability gates inside each entry function (`widgets.<id>.enabled` → `isAutoPlacementEnabled()` → opt-in mount). Includes 8-step checklist for adding new widgets (FAQ, carousel, popup, Q&A planned in `WidgetDef`). Honest about the ~12 KB bootstrap waste per disabled widget — explains why pre-fetching settings at init is the wrong trade-off. Also lands the listing-badges top-level `isAutoPlacementEnabled()` gate (`src/widget/listing-badges/index.js renderListingBadges`) so the DOM walk via `collectProductTargets()` + the `/api/public/ratings` network call do NOT fire on unsupported themes — previously the gate lived only at `reserveBadgeSlots`/`injectBadges` (defense-in-depth in inject.js stays as-is for direct programmatic callers).
- Reason: Roadmap adds FAQ / carousel / popup / Q&A. Without a written gating contract, each new widget would re-discover the pattern and likely drift. Audit also identified the listing-badges inefficiency where `collectProductTargets` (DOM walk) + `fetchRatings` (network) ran on every unsupported-theme category page visit before the inject.js gate caught the work. At 5000 merchants with average 50 category visits/day, that was ~250K wasted `/api/public/ratings` requests/day — small but unnecessary now that ADR_0022 makes the placement allowlist authoritative.
- Key source changes: New file `docs/wiki/04_Decisions/ADR_0023_Widget_Lifecycle_Gating_Contract.md`. `src/widget/listing-badges/index.js` adds `import { isAutoPlacementEnabled } from '../themes/current-adapter.js'` and an early-return gate at the top of `renderListingBadges()` (after the existing `widgets.badge.enabled === false` check, before `collectProductTargets`). Gate carries `cleanupListingBadges` if `doCleanup` was set so stale badges from a previous page navigation are still cleared on the transition into an unsupported theme.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check`. Smoke test plan: on unsupported theme, open category page → Network tab should show NO `/api/public/ratings` request (only `/api/public/settings`). Defense-in-depth: `reserveBadgeSlots`/`injectBadges` in inject.js retain the same `!isAutoPlacementEnabled()` early-return for any future code path that calls them directly.
- Updated wiki: [[ADR_0023_Widget_Lifecycle_Gating_Contract]] (new), [[Decision_Index]], [[Hot_Context]], [[Log]].

## 2026-05-27 - chore | Architecture audit follow-up: defensive hardening + telemetry + docs
- Summary: Four discrete improvements landed together as the follow-up to the post-ADR_0022 architecture audit. (1) Badge CSS gains surgical `!important` on layout-critical properties and link-state resets so PDP/listing badges survive aggressive host-theme `a{}` and broad layout overrides without sacrificing ADR_0017's typography-inherit design (font-family stays `inherit` without `!important`). (2) `storefront-theme-sync.ts` emits a structured `[storefront-theme-sync] generic_unknown theme observed` console.warn (Sentry breadcrumb) when adapter resolution lands on `adapterMatchedBy === 'none'` AND state transitions ('updated' / 'pending' / 'verified') — never on 'unchanged' or 'checked' so the signal stays high-value. (3) `setThemeAdapterKey` is now map-driven (`Object.prototype.hasOwnProperty.call(THEME_ADAPTERS, key)`) so registering a new adapter in `THEME_ADAPTERS` automatically widens the runtime whitelist; no separate edit needed. (4) New wiki page [[CSS_Variable_Surface]] documents all ~90 `--renuvex-pr-*` custom properties with scope tiers (global / widget-root / component-scope / layout-local), categorized tables, data flow, and the "how to add a new variable" playbook.
- Reason: Architecture audit identified these as real gaps (telemetry blind spot for unknown themes, hardcoded adapter whitelist, no defensive layer on light-DOM badges, scattered CSS variable surface). All four are low-risk, durable improvements that strengthen the existing layered design without changing it. The badge `!important` work specifically addresses the most realistic light-DOM bleed vector (host `a{text-decoration:underline}` is extremely common across themes); all critical hardening stays compatible with the inherit-theme-typography contract from ADR_0017.
- Key source changes: `src/widget/themes/current-adapter.js` map-driven `setThemeAdapterKey`. `src/lib/storefront-theme-sync.ts` adds generic_unknown telemetry block after the action computation. `src/widget/core/helpers.js` PARTIAL_STARS_CSS badge block gains selective `!important` (layout, color, gap, margin, link states); new `:link/:visited/:hover/:focus/:active` block on `.renuvex-pr-rating-badge--pdp` defeats host `a` styling; star SVG inside badge gets defensive `width/height/max-width/max-height !important`. New file: `docs/wiki/03_Architecture/CSS_Variable_Surface.md`.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check`. Badge CSS gate: Ozy parity preserved (font-family stays inherit, no visual delta on supported themes). New theme onboarding now has fewer files to touch — register adapter in `THEME_ADAPTERS` + add id to `THEME_ADAPTER_BY_THEME_ID` and it works; the old `setThemeAdapterKey` whitelist edit is no longer required.
- Updated wiki: [[CSS_Variable_Surface]] (new), [[Log]].

## 2026-05-27 - feat | Placement allowlist + storefront-driven lazy theme resync (ADR_0022)
- Summary: Public runtime gains `autoPlacementEnabled` (gates PDP / listing / modal badges; true only when `adapterMatchedBy === 'theme_id'` AND `themeAdapterKey !== 'generic'`) and `reviewsMountEnabled` (kill-switch for the explicit-mount review section; true whenever active-theme metadata exists). `/api/public/settings` adds a third sync trigger: stale `lastCheckedAt` (>30 min) fires `syncStorefrontThemeForToken(..., 'lazy_storefront')` via Next.js `after()`, debounced implicitly by `persistUnchangedCheck: true`. `AuthTokenManager.getByMerchantId` added for per-merchant token lookup from the public endpoint.
- Reason: ADR_0021 closed the rendering-isolation axis but explicitly left placement open. Today the widget attempts auto-placement on every theme via the generic adapter, risking visual breakage on unsupported themes. In-session cross-merchant test on 2026-05-27 empirically confirmed `activeThemeId` is a global catalog id (Ares identical across two independent merchants), theme version upgrades preserve `activeThemeId` (only `activeThemeVersionId` flips), and renames never touch any id (`metadataIdentity` excludes `activeThemeName` by design). ikas Admin API has no `store/theme/*` webhook scope (introspected 2026-05-27 — only 10 scopes exist, none storefront/theme related), so a push-model freshness mechanism is not available; lazy resync is the pull-model equivalent that other major e-commerce platforms ship.
- Key source changes: `src/lib/storefront-theme.ts` adds the two flags to `PublicThemeRuntime`, derives them in `buildPublicThemeRuntime`, updates `FALLBACK_RUNTIME`, and adds `'lazy_storefront'` to `StorefrontThemeSyncReason`. `src/app/api/public/settings/route.ts` reads `parseStorefrontThemeState(...).lastCheckedAt`, fires `after(async () => syncStorefrontThemeForToken(...))` when stale. `src/app/api/preview/settings/route.ts` includes both flags in its hardcoded preview payload (both `true`). `src/models/auth-token/manager.ts` adds `getByMerchantId`. `src/widget/themes/current-adapter.js` adds `setAutoPlacementEnabled`/`isAutoPlacementEnabled`/`setReviewsMountEnabled`/`isReviewsMountEnabled` with fail-closed defaults. `src/widget/core/settings.js applyRuntimeSettings` wires the new setters. `src/widget/rating-badge/inject.js injectRatingBadge` early-returns after cleanup when `!isAutoPlacementEnabled()`. `src/widget/listing-badges/inject.js reserveBadgeSlots`/`injectBadges` early-return on the same flag. `src/widget/reviews-section/render.js findReviewsMount` adds a defense-in-depth `isReviewsMountEnabled()` check.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check` all expected to pass. Cross-merchant `themeId` empirical test captured in [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] Context section. Manual post-deploy smoke test plan: Ozy merchant → `autoPlacementEnabled: true`, badges render; Ares (or any unknown) → `autoPlacementEnabled: false`, no badges, opt-in review section still works. Switch Ozy → Ares without opening Renuvex; next storefront visit should trigger lazy resync (look for `reason: 'lazy_storefront'` in logs).
- Updated wiki: [[ADR_0022_Placement_Allowlist_And_Lazy_Resync]] (new), [[Decision_Index]], [[Theme_Adapter_Playbook]] (Ares + Nile rows, key takeaway block, new theme checklist), [[Ikas_Theme_Limitations]] (webhook scope list, two-layer policy resolved, lazy resync trigger), [[Open_Questions]] (unknown-theme visibility policy → resolved; ikas webhook feature request opened), [[Hot_Context]] (recent changes + risks), [[Log]].

## 2026-05-25 - refactor/docs | Clarify theme adapter boundary
- Summary: Moved shared review widget CSS from `src/widget/themes/ozy/styles.js` to `src/widget/reviews-section/styles.js`, left the Ozy styles file as a compatibility re-export / override placeholder, and added [[Theme_Adapter_Playbook]] with the Ozy selector spec and new-theme checklist.
- Reason: Ozy adapters should own placement selectors only. Shared `renuvex-pr-*` widget styling should not live under a theme-specific folder before adding more theme adapters.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit remains Yellow due pre-existing warnings, with 0 errors.
- Updated wiki: [[Theme_Adapter_Playbook]], [[Ikas_Theme_Limitations]], [[Ikas_Storefront_Script_Capabilities]], [[Open_Questions]], [[Widget_Files_Map]], [[Folder_Structure]], [[Hot_Context]], [[Log]]

## 2026-05-25 - docs | Renuvex wiki namespace cleanup
- Summary: Refreshed current wiki maps, widget notes, and ADR summaries so active examples use `renuvex-pr`, `data-renuvex-*`, `RENUVEX_PR_*`, `renuvex_pr_*`, and `renuvex-product-reviews-widget`.
- Reason: The source/runtime namespace is now Renuvex-only; old `ikr` / `yorum-paneli` terms should not appear as current implementation guidance.
- Verification: `git diff --check` passed; `node scripts/wiki-audit.mjs --changed-source-check` completed with 0 errors. Remaining old-name references are historical/legacy-context notes, not active code guidance.
- Updated wiki: [[Index]], [[Frontend_Map]], [[Widget_Files_Map]], [[Storefront_Widget_Overview]], [[Product_Rating_Badge]], [[Listing_Rating_Widget]], [[Product_Review_Lightbox]], [[Ikas_Storefront_Script_Capabilities]], [[Decision_Index]]

## 2026-05-25 - ops | External Renuvex rename started
- Summary: Renamed the GitHub repository from `heyomert/new-ikas-app` to `heyomert/renuvex-product-reviews`, updated the local `origin` remote, and set the GitHub repository description to "Renuvex Product Reviews app for ikas".
- Reason: Align external repository identity with the completed Renuvex Product Reviews source/runtime namespace.
- Verification: `gh repo view heyomert/renuvex-product-reviews` returns the private renamed repo, and `git ls-remote --heads origin main` resolves the current `main` head. Vercel still reports project `new-ikas-app`; `https://new-ikas-app.vercel.app/widget.js` returns 200 while `https://renuvex-product-reviews.vercel.app/widget.js` returns 404, so Vercel/env/ikas script URL migration is intentionally pending.
- Updated wiki: [[Deployment_Notes]], [[Hot_Context]], [[Log]]

## 2026-05-25 - ops | Sentry external rename completed
- Summary: Sentry organization/project slugs changed to `renuvex` / `renuvex-product-reviews`, Vercel env was redeployed successfully, and repo config now uses the Renuvex org fallback plus Renuvex MCP URL.
- Reason: Keep observability under the Renuvex brand family while preserving the existing DSN and widget domain.
- Verification: Latest production Vercel deployment `dpl_747SWPwC71kQbXhdMzkAPWDfN5Yq` is READY and build completed without Sentry build failure. `https://new-ikas-app.vercel.app/widget.js` still returns 200. Team-scoped `renuvex-product-reviews-mertcopper.vercel.app` is protected and plain `renuvex-product-reviews.vercel.app` is 404, so ikas script URLs stay on the old production domain until a custom domain is added.
- Updated wiki: [[Sentry_Operations]], [[Config_And_Env_Map]], [[Deployment_Notes]], [[Hot_Context]], [[Log]]

## 2026-05-25 - chore | Renuvex namespace audit cleanup
- Summary: Audited the namespace migration across source, active generated widget assets, public helper scripts, and wiki routing metadata. Rebuilt the widget, removed unreferenced old hashed runtime chunks from the repo, changed the Sentry local fallback to `renuvex-product-reviews`, and updated current wiki pages away from stale expand-phase language.
- Reason: The hard rename had landed in source, but stale public chunks and docs still made broad repository searches look like the old `ikr` / `yorum-paneli` namespace was active.
- Verification: active manifest scan now returns no `IKR_*`, `data-ikr-*`, `.ikr-*`, `#ikr`, `--ikr`, `yorum-paneli`, or `ikas-reviews*` matches in `public/widget.js` / active runtime outputs. Source/config scan is clean except README's explicit historical note.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Decision_Index]], [[Project_Overview]], [[Current_Status]], [[Config_And_Env_Map]], [[Widget_Architecture]], [[Widget_Customization]], [[Ikas_Widget_Injection_Notes]], [[Hot_Context]], [[Log]]

## 2026-05-25 - feat | Opt-in review mount + badge decoupling
- Summary: Review section is now opt-in — renders only where the merchant places `<div data-renuvex-widget="reviews"></div>`. Removed the auto-create fallback (no more `main`/`body`/footer last-resort). The PDP rating badge was decoupled from the review render: it injects independently (auto-places on the product title, gated only by the badge widget toggle), so PDP title + listing badges work regardless of the review mount.
- Reason: Merchant-controlled placement + eliminates the transient "reviews under footer" fallback. Matches the admin's separate `reviews`/`badge` widgets: review section = HTML mount + toggle; badges = auto-DOM + toggle. Supersedes [[Bug_Product_Widget_Missing_Auto_Mount]]'s auto-mount.
- Key source changes: `render.js` — `getOrCreateReviewsAnchor` → `findReviewsMount` (no create); new `getRatingSummary` helper; `injectRatingBadge` moved before the opt-in mount check (guarded try); removed orphan `totalCount` + unused `THEME_SINGLE_PRODUCT_CONTAINER` import.
- Verification: `pnpm build:widget`, `node --check`, `pnpm exec tsc --noEmit` 0, `pnpm lint` 0, live re-test on dev store.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Product_Review_Widget]], [[Bug_Product_Widget_Missing_Auto_Mount]], [[Log]]

## 2026-05-25 - refactor | Public mount contract -> data-renuvex-widget scheme
- Summary: Renamed the review widget's public mount point and internal section ids off the ad-hoc `ikas-reviews*` naming. Mount is now `<div data-renuvex-widget="reviews"></div>` (scalable per-widget attribute; a future carousel uses `data-renuvex-widget="carousel"`). Internal ids `#ikas-reviews`→`#renuvex-reviews`, `#ikas-reviews-widget`→`#renuvex-reviews-widget`; PDP badge scroll target + IkasEvents subscribe id updated. Auto-mount preserved.
- Reason: Establish one professional, branded, multi-widget public-mount convention before adding more widgets; `ikas-reviews*` was neither old-brand nor Renuvex.
- Verification: `pnpm build:widget` (active bundle has `data-renuvex-widget` + `renuvex-reviews-widget`, 0 `ikas-reviews`), `tsc --noEmit` 0, `pnpm lint` 0, `node --check`, live re-test on dev store.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Product_Review_Widget]], [[Log]]

## 2026-05-25 - refactor | Renuvex namespace contract phase (legacy ikr removed)
- Summary: Completed the hard rename — removed every legacy `ikr-*`, `data-ikr-*`, `IKR_*`, `--ikr-*`, `#ikr-*`, and `yorum-paneli` identifier from source. The canonical Renuvex namespace is now the only namespace in DOM/CSS/events/cache/build. `core/namespace.js` is reduced to single-namespace preview helpers (runtime class-mirror observer + CSS expand layer removed).
- Reason: Only the dev store is installed (no real merchant installs), so the expand/contract overlap window is unnecessary; a clean single-namespace codebase is safe.
- Key source changes: mechanical `ikr-`→`renuvex-pr-` and `data-ikr-`→`data-renuvex-` across 43 widget files; camelCase `ikrStepEnter`/`ikrModal` → `renuvexPr*`; namespace.js simplified; storefront matcher dropped legacy name/marker tiers (the still-legacy live record is adopted via the `publicApiKey` fallback and rewritten on next reconcile, no duplicate); storefront-widget-url tag emits Renuvex markers only. External service/repo rename still deferred.
- Verification: `pnpm build:widget` (active bundle ikr-free, renuvex-native), `node --check` on built bundles, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, live storefront re-test on dev store (home + PDP + listing render, 200s, 0 console errors, no Sentry/runtime errors).
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Log]]

## 2026-05-24 - refactor | Renuvex Product Reviews namespace expand phase
- Summary: Migrated canonical identity from Yorum Paneli / `ikr` to Renuvex Product Reviews without removing legacy public aliases. New canonical keys are `product-reviews`, `renuvex-pr`, `renuvex_pr`, and `renuvex-product-reviews-widget`.
- Reason: The app is now part of the Renuvex brand family, but storefront scripts and cached widget chunks can outlive a deploy. Expand/contract keeps old installations and CDN/browser cache windows safe while making the new identity canonical.
- Key source changes: `storefront-scripts.ts` writes the canonical ikas script name and prefers Renuvex markers while adopting legacy records; `core/namespace.js` mirrors `ikr-*` class state to `renuvex-pr-*` and expands injected CSS; preview events now use `RENUVEX_PR_*` with `IKR_*` aliases; public cache/rate-limit keys moved to `renuvex_pr_*`; Sentry project config is env-driven.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit remains Yellow because of pre-existing warnings, with 0 errors.
- Updated wiki: [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]], [[Decision_Index]], [[Project_Overview]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Config_And_Env_Map]], [[Sentry_Operations]], [[Security_And_Rate_Limits]], [[Hot_Context]], [[Log]]

## 2026-05-24 - hardening | Safe wizard error DOM and sprite id guard
- Summary: Removed the two remaining dynamic widget-wizard error `innerHTML` sinks from photo upload and review submit errors, and strengthened one-off SVG sprite ids with a length + double-hash key.
- Reason: The SVG sprite refactor was correct, but production widget HTML generation should keep dynamic messages out of HTML string concatenation. The sprite helper also now avoids silent symbol reuse if a future local icon source collides with an existing content id.
- Key source changes: `step-photos.js` and `step-author.js` now render dynamic error messages with `createElement` + `textContent`; `icons/star-sprite.js` uses `symbolKey()` for generic one-off icons and stores `data-ikr-symbol-key`; [[ADR_0019_Icon_Sprite_Rendering]] now reflects that the interactive picker has been converted.
- Verification: `pnpm build:widget`, `node --check` on changed widget files plus built loader/runtime, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. Wiki audit remains Yellow because of pre-existing metadata/length warnings.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Guard listing badge slot positions
- Summary: Extended the PDP owned-slot position guard standard to listing badges, which covers category, home product blocks, search results, and blog product blocks through the shared listing module.
- Reason: If a third-party app or late theme script inserts into the same product-card parent after Renuvex renders, the listing badge should keep its own slot at the adapter-selected mount point without moving or deleting the third-party node.
- Key source changes: `src/widget/listing-badges/inject.js` now places placeholders and rendered badges with `core/slot-position.js`, adds bounded position observers, and scopes duplicate checks to owned slot markers plus slug context; `src/widget/core/badge.js` adds slug/product context to listing placeholders.
- Verification: `pnpm build:widget`, `node --check` on changed widget files and `public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, and `git diff --check` passed. Local-build browser verification on the live dev storefront passed for `/clothing`, `/`, `/search?q=premium`, and `/premium-shortsg`: listing/search badges reanchored after simulated third-party insertion and remounted once after removal; PDP badge/review block still rendered under the product title. WebKit PDP only showed external Cloudinary image SSL resource noise, not widget-originated errors.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Hot_Context]], [[Log]]

## 2026-05-24 - refactor | Unify ALL widget icons into the SVG sprite (ADR 0019 follow-up)
- Summary: Extended the sprite from rating-stars-only to a single unified widget icon system. The interactive wizard rating picker, the filter funnel, the compact chevron, and the review-form modal chrome (close ×, back arrow, photo-upload/plus icons) now reference the shared `#ikr-icon-sprite` via `<use>` instead of inline SVG.
- Reason: Follow-through on "make the whole icon system global/consistent". One-off icons give ~no DOM win (single instances) but the unified mechanism is cleaner; the wizard rating stars are genuine rating stars and now match every other star surface.
- Key source changes: `icons/star-sprite.js` generalized — added `iconUseSvg(svgString)` (content-hashed `<symbol>`, injected once, preserves viewBox/width/height/stroke) and made symbol injection per-symbol (no-clobber) so a live-preview star swap no longer wipes other icons. Converted `step-rating.js` (wizard stars → `starUseSvg`), `summary-layouts/shared/actions-block.js` (funnel), `summary-layouts/compact/index.js` (chevron), `review-form-modal/modal-shell.js` (close), `review-form-modal/progress-bar.js` (back arrow), `review-form-modal/steps/step-photos.js` (upload/photo/plus). The wizard's WebKit-hardened tap logic was NOT touched (only icon markup). The widget-disabled empty-state icon in `render.js` stays inline (admin-only, never customer-facing).
- Verification: `pnpm build:widget` + `pnpm lint` clean. Real-browser check of `iconUseSvg` with a stroke icon (close ×, viewBox 0 0 24 24, width preserved) and a fill icon (funnel) — both render via `<use>` (getBBox > 0), 0 inline paths. Live modal/funnel re-check pending this commit's deploy.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Sprite the review-summary + bar-chart stars (ADR 0019 follow-up)
- Summary: Completed the SVG sprite migration for the review area. The summary average star (classic/split/compact layouts) and the shared rating-distribution bar chart (25 inline stars per chart) still used inline `<path>`; they now emit `<use>` like the rest.
- Reason: The first pass converted `partialStarsHTML`/`starsHTML`/`renderStarRow`, but the classic/split/compact avg star and `bar-chart.js` render stars through their own inline `iconPair.filled`/`empty` path — they were the ~20 KB of remaining inline star path data measured on the live PDP review area.
- Key source changes: `summary-layouts/shared/bar-chart.js`, `summary-layouts/classic/index.js`, `summary-layouts/split/index.js`, `summary-layouts/compact/index.js` now call `ensureStarSprite` and emit `starUseSvg('full'|'outline')`. Sizing/color unchanged (`.ikr-icon > svg`, `.ikr-avg-star`/`.ikr-bar-star` container sizes, currentColor). Interactive form picker + non-star UI chrome (filter funnel, chevron) stay inline.
- Verification: `pnpm build:widget` + `pnpm lint` clean. Live re-measure pending the deploy of this commit.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Log]]

## 2026-05-24 - refactor | Rating stars render via SVG sprite (ADR 0019)
- Summary: Read-only rating stars (PDP badge, listing badge, summary layouts, review cards, modal) now reference a single injected SVG `<symbol>` sprite via `<use>` instead of inlining the full `<path>` per star. Added Yotpo-style sr-only + `aria-labelledby` accessibility and fixed three PDP-badge correctness issues.
- Reason: Inlining the ~765-byte star `<path>` per star bloated the live DOM — measured ~76 KB of duplicated path data on a busy PDP (10 reviews) and ~4.6 KB per listing badge (linear in catalog size). The geometry is identical everywhere, so it should be defined once (industry-standard SVG symbol sprite, like Loox).
- Key source changes: `src/widget/icons/star-sprite.js` (new) derives two `<symbol>`s from the active `ICONS` strings and injects one hidden sprite (DOMParser, idempotent, keyed by icon); `partialStarsHTML`/`starsHTML` (`core/helpers.js`) and `renderStarRow` (`icons/review-icons.js`) call `ensureStarSprite` and emit `starUseSvg`; `buildRatingA11yLabel` + `.ikr-sr-only` added; `rating-badge.js` drops `role="figure"`/static `id`/inline `justify-content` (now `aria-labelledby` + `data-ikr-align`); `core/badge.js` listing badge gets the same a11y/align treatment. `ICONS` strings unchanged (admin preview still consumes them). Interactive form picker (`renderStars`, `step-rating.js`) left inline by design.
- Verification: `pnpm build:widget` + `pnpm lint` clean; new tokens present in built chunks. Real-browser check (playwright, real Phosphor geometry): sprite parses, 2 symbols / 2 paths defined once, a 4.3 badge renders 4 full + 1 half via 6 `<use>` with 0 inline paths, half-star `clip-path` intact, `<use>` geometry paints. Live path-byte re-measure pending deploy.
- Updated wiki: [[ADR_0019_Icon_Sprite_Rendering]], [[Decision_Index]], [[ADR_0016_Rating_Visual_System]], [[ADR_0017_Badge_Architecture]], [[Widget_Files_Map]], [[Widget_Performance]], [[Product_Rating_Badge]], [[Listing_Rating_Widget]], [[Hot_Context]], [[Log]]

## 2026-05-24 - refactor | Move PDP badge guard behind theme adapters
- Summary: Refactored PDP badge placement so title discovery and mount decisions belong to the active theme adapter, while the bounded owned-slot position guard lives in shared core infrastructure.
- Reason: Different ikas themes can rename PDP title classes. The durable boundary is not theme-specific guard code; it is a shared guard protecting an adapter-provided mount point for Renuvex's own slot.
- Key source changes: `src/widget/core/slot-position.js` adds shared owned-slot placement/guard helpers; `src/widget/core/product-title.js` asks the active adapter before generic fallback; Ozy now declares PDP title selectors and product badge mount behavior; `rating-badge.js` consumes the adapter mount point.
- Verification: `pnpm build:widget` passed. Local-build browser verification on the live dev storefront passed in Chromium desktop and WebKit iPhone 13: the PDP badge mounted under the Ozy title selector, reanchored after a simulated late third-party insert, and remounted once after slot removal with no widget-originated console errors.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Harden review wizard rating taps on WebKit
- Summary: Made the first review-wizard rating step pointer/touch-safe and removed the one-shot `canNavigate()` drop that could leave slower WebKit devices waiting on step 1 after a star tap.
- Reason: A physical iPhone 11 Safari test showed the wizard could select a rating but not auto-advance, while newer iPhone Safari tests worked. The source risk was a delayed click path that only attempted navigation once after 400 ms.
- Key source changes: `src/widget/reviews-section/review-form-modal/steps/step-rating.js` now activates on pointer/touch/mouse down with keyboard and click fallbacks, stores rating immediately, and lets the parent wizard state machine queue the step transition.
- Verification: `node --check src/widget/reviews-section/review-form-modal/steps/step-rating.js` and `pnpm build:widget` passed. Local-build browser verification on the live dev storefront passed for WebKit iPhone 11, WebKit iPhone 13, and Android Chromium / Pixel 5: tapping the fifth star moved step 1 to step 2 with no widget-originated console errors.
- Updated wiki: [[Bug_Review_Wizard_WebKit_Rating_Advance]], [[Bug_Index]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Stabilize WebKit filter taps and PDP badge position
- Summary: Fixed the iOS/WebKit summary-layout filter menu so real taps activate rating/sort/photo filters before focus light-dismiss closes the menu. Added a bounded PDP badge position guard so the owned Renuvex slot stays directly under the product title when another app inserts into the same parent after runtime load, and made widget-error CORS echo the requesting storefront origin when credentials are involved.
- Reason: Live iPhone/WebKit testing showed filter menu taps closed the menu without changing the active filter or sending a new reviews request, while Android worked. Separate live/fixture checks showed the PDP badge is currently visible with the X app, but late sibling insertion can move the Renuvex slot below a third-party widget unless our own slot position is reanchored.
- Key source changes: `src/widget/summary-layouts/shared/actions-block.js` activates options on pointer/touch/mouse down with keyboard and click fallbacks; `src/widget/reviews-section/render.js` fetches reviews with explicit next filter state; `src/widget/rating-badge/inject.js` adds a 15-second bounded position observer for the owned slot; `src/lib/cors.ts` and `/api/public/widget-error` return origin-aware CORS headers.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, and local CORS route checks passed. A local-build browser test injected the new widget into the live dev storefront with the X app installed: Android and WebKit/iPhone both changed review lists for highest, lowest, and photo filters; the PDP badge remained title -> Renuvex -> X after a simulated late third-party insert.
- Updated wiki: [[Bug_Filter_Menu_WebKit_Tap_Activation]], [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[ADR_0010_Widget_Error_Forwarding]], [[Hot_Context]], [[Log]]

## 2026-05-24 - fix | Harden widget ownership against third-party widget.js conflicts
- Summary: Recorded and implemented the Renuvex Product Reviews storefront resilience decision. A third-party app can also load a `widget.js` file, so this app's loader/runtime now treats owned markers and `publicApiKey` as the script identity boundary rather than relying on `/widget.js` alone.
- Reason: Live dev-store testing with the Serpingo/X app showed our `widget.js` and runtime chunks loaded with `200 OK`, but no public settings/reviews calls happened because runtime ownership could select the third-party script.
- Key source changes: `src/lib/storefront-widget-url.ts` adds Renuvex markers to ikas `StorefrontJSScript` content; `src/widget/core/script-identity.js`, `classic-loader.js`, and `core/config.js` harden script discovery; owned slot wrappers cover PDP badges, listing badges, and review block mounting.
- Verification: `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check` passed. A local-build browser smoke test injected the new widget into the live dev storefront with the Serpingo/X app present: `/premium-shorts` loaded settings/reviews/ratings, set `window.__RENUVEX_PRODUCT_REVIEWS__`, rendered one PDP badge slot and one review slot; `/clothing` rendered two listing badge slots with no duplicate slugs.
- Updated wiki: [[ADR_0018_Widget_Ownership_And_Placement_Resilience]], [[Bug_Widget_Script_Ownership_Conflict]], [[Ikas_Storefront_Script_Capabilities]], [[Ikas_Widget_Injection_Notes]], [[Hot_Context]], [[Log]]

## 2026-05-24 - docs | Record cron upgrade and QStash decision
- Summary: Documented the Vercel Pro cron upgrade path and clarified that Upstash Redis is already used for rate limiting, while QStash should stay optional until delayed per-merchant verification or queue retry semantics are required.
- Reason: The failed 5-minute cron deployment was caused by the current Vercel plan, not by the theme sync code. Future agents need a clean playbook for revisiting this after a Pro upgrade without installing unnecessary infrastructure.
- Updated wiki: [[Hot_Context]], [[Deployment_Notes]], [[Log]]

## 2026-05-23 - fix | Restore Vercel-compatible cron schedule
- Summary: Changed `/api/admin/daily-maintenance` back to the daily 03:00 UTC Vercel cron schedule after the attempted 5-minute schedule failed deployment on the current Vercel cron plan.
- Reason: Vercel Hobby cron accepts daily schedules only; sub-daily cron expressions fail deployment before the app code builds. The theme sync lifecycle remains intact, but fast delayed verification now requires Pro/Enterprise cron or an external delayed queue such as QStash.
- Key source changes: `vercel.json`; wiki deployment/API/theme notes.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, `node scripts/wiki-audit.mjs --changed-source-check` (warnings only).
- Updated wiki: [[Hot_Context]], [[Deployment_Notes]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[System_Architecture]], [[Ikas_Theme_Limitations]], [[Log]]

## 2026-05-23 - hardening | Split theme sync from script injection
- Summary: Added a lightweight storefront theme sync lifecycle with stable/pending state, dashboard/settings triggers, and batched cron verification. Public settings keep serving the stable adapter while a newly observed theme is pending verification.
- Reason: ikas has no confirmed theme-publish webhook/event, and dashboard load was previously calling full script injection just to refresh theme metadata. The new path avoids unnecessary StorefrontJSScript reconciliation and handles ikas theme "preparing" delay with delayed confirmation.
- Key source changes: `src/lib/storefront-theme.ts`, `src/lib/storefront-theme-sync.ts`, `/api/admin/storefront-theme/sync`, `/api/admin/daily-maintenance`, dashboard initialization, and settings save post-response sync.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[Database_Map]], [[Database_Schema]], [[Deployment_Notes]], [[System_Architecture]], [[Hot_Context]], [[Log]]

## 2026-05-23 - fix | Prefer stable theme ids for adapter matching
- Summary: Hardened active theme adapter matching so merchant-editable theme names cannot misclassify a storefront. Known adapters now match by stable ikas `themeId` first; theme-name matching is only a fallback when `themeId` is unavailable.
- Reason: Merchants can rename themes in the ikas admin panel. A renamed Kombos/IZO theme should not become Ozy just because the display name contains "Ozy", and a renamed Ozy theme should still resolve to the Ozy adapter by id.
- Key source changes: `src/lib/storefront-theme.ts`.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`, `node scripts/wiki-audit.mjs --changed-source-check`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Hot_Context]], [[Log]]

## 2026-05-23 - feature | Add active theme adapter metadata
- Summary: Implemented active theme metadata capture from ikas `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback, persisted it in nullable `StoreSettings.storefrontTheme`, and exposed only `runtime.themeAdapterKey/source` through public settings.
- Reason: ikas confirmed there is no browser-runtime theme detector. Backend Admin API theme metadata is the cleanest available selector for a theme adapter, while DOM placement still requires Storefront Events plus heuristics.
- Key source changes: `src/lib/storefront-theme.ts` resolves Ozy vs generic adapter metadata; `src/lib/storefront-scripts.ts` writes it during install/manual/cron reconciliation; `src/widget/core/settings.js` applies it before listing discovery; `src/widget/themes/generic/adapter.js` adds a conservative fallback for unknown themes.
- Verification: `pnpm codegen`, `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, `pnpm build:widget`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Ikas_Storefront_Script_Capabilities]], [[Widget_Architecture]], [[Database_Map]], [[Database_Schema]], [[Hot_Context]], [[Log]]

## 2026-05-23 - docs | Record ikas active-theme detection feedback
- Summary: Added ikas developer feedback that there is no dedicated runtime active-theme detector; schema verification later showed the usable signal is nested `listStorefront.themes[].isMainTheme`, not `Storefront.isMainTheme`.
- Updated wiki: [[Ikas_Theme_Limitations]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]], [[Hot_Context]]

## 2026-05-23 - hardening | Add storefront script diagnostics and widget conflict telemetry
- Summary: Strengthened StorefrontJSScript reconciliation with `data-ikr-*` script markers, remote match diagnostics, duplicate reporting, runtime widget health markers, badge visibility probes, and bounded one-shot self-heal for DOM removal.
- Reason: Third-party storefront apps should not overwrite this app's ikas script record under the normal platform model, but stale/deleted script records and aggressive browser-side DOM/CSS changes need clearer detection and safer recovery without creating duplicate scripts.
- Key source changes: `src/lib/storefront-widget-url.ts` adds script markers; `src/lib/storefront-scripts.ts` and `src/lib/reconcile-storefront-scripts.ts` return remote diagnostics; `src/widget/core/health.js`, `src/widget/rating-badge/inject.js`, and `src/widget/listing-badges/inject.js` add health telemetry and one-shot remount; `scripts/build-widget.mjs` injects a widget version marker.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `pnpm lint` passed locally before this log entry. Live ikas/CDN verification is still required after deploy.
- Updated wiki: [[Hot_Context]], [[Widget_Architecture]], [[Ikas_Widget_Injection_Notes]], [[Ikas_Storefront_Script_Capabilities]], [[Log]]

## 2026-05-22 - hardening | Reconcile storefront scripts with v1 list adoption
- Summary: Fixed StorefrontJSScript recovery when ikas returns `error_messages.theme.storefront_sf_script_not_found` for a DB-tracked script id that no longer exists remotely, then added read-only v1 script listing to adopt live remote app scripts before creating new ones.
- Reason: The non-destructive script lifecycle introduced in `1700d789` already intended to recreate missing/deleted scripts, but the matcher only handled space-separated `not found`; ikas returns underscore-separated `not_found`, so reinstall/manual inject could fail without recreating the loader. A stronger path also needs DB-lost/live-remote reconciliation to avoid duplicate scripts.
- Key source changes: `src/lib/storefront-scripts.ts` now accepts space, dash, and underscore separators in missing-script error phrases and uses v1 `listStorefrontJSScript` as read-only evidence. `src/lib/ikas-client/v1-graphql-requests.ts` and `generated/v1-graphql.ts` provide the typed v1 query client.
- Verification: Refreshed the dev-store OAuth token, confirmed v1 `listStorefrontJSScript` returned zero scripts while `StoreSettings.storefrontScripts` held a stale id, reproduced the v2 update error, recreated the script, updated the DB map, then verified ikas reports one active non-deleted `yorum-paneli-widget` script with the expected widget URL. Browser retest showed `/premium-shorts` and `/clothing` load the widget and render `ikr-*` nodes with no widget console errors; `/` still did not publish the script in-browser during the retest despite the active global script record, so home-route ikas/CDN publication remains an external follow-up.
- Updated wiki: [[Hot_Context]], [[Ikas_Widget_Injection_Notes]], [[Log]]

## 2026-05-18 - security | Scope review image uploads by tenant
- Summary: Review image uploads now use tenant-scoped Cloudinary folders: `review_images/stores/<storeId>`.
- Reason: The old global `review_images/` folder mixed all merchants' uploads, weakening quota, cleanup, support, and future tenant export/delete operations.
- Key source changes: `/api/public/upload/sign` verifies `StoreSettings` and signs the tenant folder; the widget uploads to the returned folder and registers `{storeId, secureUrl}`; `review-images.ts`, public review POST/GET, admin review reads, and cleanup compare against the tenant-scoped trusted URL policy; `PendingReviewImage.storeId` was added.
- Verification: `pnpm prisma:generate`; `pnpm exec prisma validate`; `pnpm exec tsc --noEmit`; `pnpm build:widget`.
- Updated wiki: [[ADR_0006_Trusted_Review_Image_URL_Policy]], [[ADR_0012_Pending_Upload_Registry]], [[Security_And_Rate_Limits]], [[Backend_API_Map]], [[Database_Schema]], [[Hot_Context]]

## 2026-05-18 - database | Drop redundant Review prefix indexes
- Summary: Removed redundant Review indexes `[storeId, productId]` and `[storeId, slug]`.
- Reason: Current query paths use `storeId + productId + status` or `storeId + slug + status`; PostgreSQL can use the retained wider composite indexes for the old leftmost prefixes, so the standalone prefix indexes only added write amplification.
- Key source changes: `prisma/schema.prisma`; migration `20260518130000_drop_redundant_review_indexes`.
- Verification: `pnpm exec prisma validate`; `pnpm exec tsc --noEmit`.
- Updated wiki: [[Database_Map]], [[Database_Schema]], [[Hot_Context]]

## 2026-05-18 - security | Rate-limit public rating reads
- Summary: Added a shared Upstash fixed-window rate limit for `/api/public/ratings` and `/api/public/ratings-by-slug`.
- Reason: Rating badge endpoints are CORS-open and can be abused with many query variants to bypass CDN cache and create unnecessary function/Postgres load.
- Key source changes: new `src/lib/public-rate-limit.ts`; `ratings` and `ratings-by-slug` now check `ikr_ratings_rl:<ip>` at 300 requests/minute before hitting Prisma.
- Verification: `pnpm exec tsc --noEmit`; direct route-level burst test should be run after deploy if the live Redis env is present.
- Updated wiki: [[Security_And_Rate_Limits]], [[Backend_API_Map]], [[Config_And_Env_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Scope listing observer re-render checks
- Summary: The MutationObserver re-render gate now uses the same scoped listing link discovery as listing badge injection instead of `document.querySelectorAll('a[href]')`.
- Reason: Live Chrome/CDP verification on `dev-mertcopper.ikas.shop` showed the listing inject path was scoped, but the always-loaded runtime still performed whole-document link scans from the observer gate.
- Key source changes: new `src/widget/core/link-scope.js`, updated `src/widget/observer.js` and `src/widget/listing-badges/dom.js`; regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, active generated runtime search confirmed no `document.querySelectorAll('a[href]')` in `runtime-2RGD2H4S.js` / `listing-badges-W6CSI53A.js`. Post-deploy Chrome/CDP retest on `/`, `/clothing`, `/premium-shorts`, and mobile `/clothing` confirmed the live site loads `runtime-2RGD2H4S.js`, has visible listing/PDP badges, reports no console/runtime errors, and records zero widget-sourced `document.querySelectorAll('a[href]')` calls.
- Updated wiki: [[Listing_Rating_Widget]], [[Widget_Architecture]], [[Widget_Files_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Reduce listing badge CLS and DOM scan cost
- Summary: Listing badge discovery now uses scoped link collection from theme product containers/main content instead of whole-document link scans, and reserves invisible badge slots while ratings load before replacing them in place.
- Reason: Late badge insertion could create small listing-card layout shifts, and whole-document `a[href]` scans did unnecessary work across header/footer/navigation.
- Key source changes: `src/widget/listing-badges/dom.js`, `collect.js`, `index.js`, `inject.js`, and `src/widget/core/badge.js`; regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `git diff --check`.
- Updated wiki: [[Listing_Rating_Widget]], [[Widget_Architecture]], [[Widget_Files_Map]], [[Hot_Context]]

## 2026-05-18 - hardening | Reduce widget settings stale TTL
- Summary: Reduced widget-side stale settings tolerance from 7 days to 24 hours.
- Reason: A merchant setting change, including disabling a widget surface, should not remain hidden behind a week-long stale same-tab cache during transient settings fetch failures.
- Key source changes: `src/widget/core/settings.js`, regenerated public widget runtime output.
- Verification: `pnpm build:widget`, `pnpm exec tsc --noEmit`, and `git diff --check`.
- Updated wiki: [[Caching_And_Performance]], [[Widget_Architecture]], [[Hot_Context]]

## 2026-05-18 - security | Harden public review submit/read contract
- Summary: `POST /api/public/reviews` now verifies the submitted target against installed `StoreSettings` and `(storeId, productId)` in `ProductSnapshot`, ignores public `slug`/`productName`/`email`, and stores slug/name snapshots from the server-side product read model.
- Reason: The public storefront is CORS-open and browser-controlled, so product identity and response fields must not be trusted from client payloads.
- Key source changes: `src/app/api/public/reviews/route.ts` target verification, public response whitelist, minimal create response.
- Verification: `pnpm exec prisma validate` and `pnpm exec tsc --noEmit`.
- Updated wiki: [[Backend_API_Map]], [[Important_Files]], [[Security_And_Rate_Limits]], [[Hot_Context]]

## 2026-05-17 - docs | Migration safety (expand/contract) rule
- Summary: Documented the deploy-window migration rule — `prisma migrate deploy` runs during the Vercel build while the old deployment still serves, so breaking schema changes (drop/rename column, add `NOT NULL`, etc.) must use expand/contract across two deploys; additive changes stay single-deploy.
- Reason: A single-deploy breaking migration causes a ~1-3 min window where the new schema and old code mismatch. Harmless at one test store, but a real risk under live multi-merchant traffic.
- Changes: `### Migration safety` subsection in [[Database_Map]]. Local generated `AGENTS.md` + `CLAUDE.md` were edited too, but they are gitignored Ruler outputs and are not repository-durable. Follow-up code hardening also made slug fallback ordering fully deterministic and clears snapshots if ikas ever returns `deleted: true` products.

## 2026-05-17 - cleanup | Remove dead ProductSnapshot.deleted field
- Summary: Removed the unused `ProductSnapshot.deleted` column and `[storeId, slug, deleted]` index, and made the `ratings-by-slug` slug→productId resolution deterministic.
- Reason: ikas exposes no `store/product/deleted` webhook scope and `listProduct` excludes deleted products, so `deleted` was always false (prod: 0 of 32 rows true) and `[storeId, slug]` was a redundant prefix index. The fallback's `slugToProductId` map used non-deterministic first-write-wins when a slug mapped to multiple snapshots.
- Key source changes: `prisma/schema.prisma`, migration `20260517160000_remove_product_snapshot_deleted`, `src/lib/product-snapshots.ts`, `src/app/api/public/ratings-by-slug/route.ts` (drop `deleted` filter, add `orderBy: { lastSyncedAt: 'desc' }`).
- Verification: `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit` passed.
- Updated wiki: [[Database_Schema]], [[Hot_Context]]

## 2026-05-17 - fix | Non-blocking OAuth install product backfill
- Summary: The OAuth callback no longer blocks the install redirect on the full product backfill. `syncAllProductsForStore` now runs inside Next.js `after()` (post-response); product webhook registration stays awaited (a single `saveWebhooks` mutation).
- Reason: `await syncAllProductsForStore` ran on the callback's critical path before JWT issue + 302 redirect. For a large catalog the sequential paginated sync could exceed the serverless function timeout and abort the whole install (no JWT, no redirect) — the surrounding `try/catch` cannot catch a platform-level timeout.
- Key source change: `src/app/api/oauth/callback/ikas/route.ts` — `after` import plus wrapping the backfill call.
- Verification: `pnpm exec tsc --noEmit` passed.
- Effect: install latency is now independent of catalog size; an interrupted backfill is recovered by product webhooks or `POST /api/admin/sync-products`.
- Updated wiki: [[Auth_And_Installation_Flow]], [[ADR_0015_Canonical_Product_Identity]], [[Backend_API_Map]], [[Hot_Context]]

## 2026-05-17 - implementation | ProductSnapshot webhook/backfill layer
- Summary: Implemented the ADR_0015 completeness layer. Added `ProductSnapshot`, ikas product webhook registration/receiver, install-time and manual backfill, and snapshot-backed slug fallback.
- Key source changes: `src/lib/product-snapshots.ts`, `/api/webhooks/ikas/products`, `/api/admin/sync-products`, OAuth callback webhook/backfill hook, `ratings-by-slug` snapshot resolution, `listProductsForSync` and `saveProductWebhooks` GraphQL operations/codegen, and Prisma migration `20260517133000_add_product_snapshot`.
- Verification: `pnpm codegen`, `pnpm prisma:generate`, `pnpm exec prisma validate`, `pnpm exec tsc --noEmit`, scoped ESLint, and `pnpm build:widget` passed.

## 2026-05-17 - implementation | ADR_0015 canonical product identity
- Summary: Implemented product-id listing/search badge reads for the Storefront Events path. The widget now maps listing/search `productDetails[].id` to visible slugs and calls `/api/public/ratings?productIds=...`; `/api/public/ratings-by-slug` remains a DOM-only fallback.
- Key source changes: new `src/app/api/public/ratings/route.ts`, `ikrProductMap` in widget state/context, product target collection in `listing-badges/collect.js`, product-id-first fetch logic in `listing-badges/ratings.js`, rebuilt `public/widget.js` and ESM chunks, plus the `[storeId, productId, status]` Prisma index/migration.
- Verification: `pnpm build:widget`, scoped `pnpm exec eslint <changed files>`, `pnpm exec tsc --noEmit`, and `pnpm exec prisma validate` passed. `pnpm prisma:generate` hit a Windows DLL rename `EPERM` while a Node/Next process held Prisma's query engine; schema-only index change does not require generated type changes, but retry after stopping dev processes.
- Follow-up: Completed by the ProductSnapshot webhook/backfill layer later on 2026-05-17.

## 2026-05-17 - implementation | ADR_0013 Phase 2 module split
- Summary: Started the Phase 2 physical module split without changing the ikas script contract. `public/widget.js` is now a small classic compatibility loader and `public/widget-runtime/*` contains the ESM runtime/chunks.
- Key source changes: `scripts/build-widget.mjs`, `src/widget/classic-loader.js`, `src/widget/core/lazy-modules.js`, `src/widget/core/settings.js`, async registry mounts, lazy `reviews-main` / `listing-badge` surfaces, `VIEW_SEARCH_RESULTS` listing handling, Ozy fallback adapter, and regenerated `public/widget-runtime/build-manifest.json`.
- Verification so far: `pnpm build:widget` passed; manifest boundary assertion passed; `git diff --check` passed; scoped `pnpm exec eslint <changed widget/build files>` passed. `pnpm lint` is not currently a valid gate because `next lint` fails under the repo's Next.js 16 setup.
- Not closed yet: live dev-store browser/network verification and Sentry post-test checks from [[Phase_2_Widget_Module_Split_Plan]] are still required before Phase 2 is marked done.

## 2026-05-17 - planning | ADR_0013 Phase 2 module split plan
- Summary: Added the durable Phase 2 implementation and verification checklist for moving from the Phase 1 in-bundle registry to real lazy-loaded widget modules.
- New wiki page: [[Phase_2_Widget_Module_Split_Plan]]
- Key decisions: keep `widget.js?publicApiKey=...` backward-compatible; use a classic loader plus ESM runtime/chunks unless ikas `type="module"` script loading is proven; add `VIEW_SEARCH_RESULTS` handling; move Ozy selectors into an explicit theme adapter/fallback contract.
- Context7 note: checked `/evanw/esbuild`; code splitting requires `format: "esm"`, `splitting: true`, and `outdir`, and dynamic `import()` creates lazy chunks.
- No application source code changed.

## 2026-05-17 - verification + bugfix | ADR_0013 Phase 1 runtime verification
- Summary: Ran the Phase 1 widget runtime audit on the live dev store (`dev-mertcopper.ikas.shop`) — F.3–F.6 plus audits A/B/C/G from [[Phase_1_Widget_Runtime_Audit]]. Method: Playwright + read-only `IkasEvents` probe + Sentry post-test check.
- Result: PDP render, SPA-nav cleanup, listing badges, MutationObserver re-mount, and badge placement all passed; no double render; Sentry clean (0 new issues). `VIEW_LISTING` confirmed a real runtime event carrying `productDetails[]` — the ADR_0013 open item is resolved, no code change. Search pages emit `VIEW_SEARCH_RESULTS` (same shape) which the widget does not yet handle — logged as a Phase 2 item.
- Bug fixed: [[Bug_Listing_Badge_Stars_Direct_Load]] — listing badge stars rendered 0×0 on cold direct entry to home/category/search because `#ikr-styles` (carrying the `.ikr-star` display rule) was injected only by the PDP `render.js` path. Fix: extracted `PARTIAL_STARS_CSS` as one source of truth and added `ensureBadgeStyles()` so the badge factory self-injects `#ikr-badge-styles`. Pre-existing bug, not an ADR_0013 regression.
- Changed source files: `src/widget/core/helpers.js`, `src/widget/themes/ozy/styles.js`, `src/widget/core/badge.js`, `public/widget.js` (rebuilt via `pnpm build:widget`).
- Updated wiki pages: [[Bug_Listing_Badge_Stars_Direct_Load]], [[Bug_Index]], [[Phase_1_Widget_Runtime_Audit]], [[Ikas_Storefront_Events]], [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Listing_Rating_Widget]], [[Hot_Context]]

## 2026-05-17 - research | Phase 1 widget runtime audit checklist
- Summary: Added an evidence checklist for closing ADR_0013 Phase 1 before Phase 2. It separates confirmed ikas docs/MCP facts from runtime behavior that still needs dev-store verification.
- New wiki page: [[Phase_1_Widget_Runtime_Audit]]
- Updated wiki pages: [[ADR_0013_Modular_Widget_Loader_Architecture]], [[Yotpo_Style_Widget_Modular_Architecture]], [[Ikas_Storefront_Events]], [[Ikas_Storefront_Script_Capabilities]], [[Index]], [[Hot_Context]]
- Key uncertainty: official Storefront API docs and current ikas MCP expose different StorefrontJSScript operation shapes; runtime `VIEW_LISTING` remains unproven against official `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` docs.
- Context7 note: checked `/microsoft/playwright` and `/getsentry/sentry-javascript` for current Phase 1 test/triage practices. Context7 should support Playwright/Sentry/Next.js mechanics, not replace ikas docs/MCP/runtime evidence.
- No application source code changed.

## 2026-05-16 - reference | ikas Storefront Events official docs captured
- Summary: Saved the official ikas Storefront Events documentation (event types, page types, payload shapes, JS example, query-param usage) as a wiki reference page.
- New wiki page: [[Ikas_Storefront_Events]]
- Updated wiki pages: [[Index]]
- Source: <https://builders.ikas.com/docs/storefront-events/events>
- Note: flagged that current code uses `VIEW_LISTING` while official docs list `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS` — needs runtime verification.

## 2026-05-16 - research | ikas developer feedback on storefront script integration
- Summary: Recorded a direct ikas developer answer about single-loader architecture, theme selectors, and script ordering.
- Key takeaways: single loader + multiple modules is an accepted ikas pattern; no official stable ids / `data-*` attributes for page areas today; Storefront Events is the supported page/product context mechanism; standard `data-*` attributes are planned (ikas Studio) but not yet broadly available; `isHighPriority` + `order` control load order relative to Facebook/Google scripts.
- Updated wiki pages: [[Ikas_Storefront_Script_Capabilities]] (new "ikas Developer Feedback — 2026-05-16" section), [[Yotpo_Style_Widget_Modular_Architecture]] (Open Questions)
- Decision direction: use Storefront Events for context; treat theme-class selectors as a temporary fallback only, not the architecture; plan migration to ikas `data-*` attributes when broadly available.
- No application source code changed.

## 2026-05-15 - research | Yotpo-style widget architecture on ikas
- Summary: Added read-only research and architecture notes from Protein Ocean's Yotpo installation on an ikas storefront, plus ikas StorefrontJSScript capability notes.
- Updated wiki pages: [[Index]], [[Hot_Context]], [[Yotpo]], [[Ikas_Widget_Injection_Notes]], [[Widget_Architecture]], [[Storefront_Widget_Overview]], [[Widget_Performance]]
- New wiki pages: [[Yotpo_Protein_Ocean_Widget_Research]], [[Ikas_Storefront_Script_Capabilities]], [[Yotpo_Style_Widget_Modular_Architecture]]
- Key takeaway: ikas can support a Yotpo-like model, but this project should use one ikas-injected loader per storefront and lazy-load widget modules from its own runtime.
- Related files: `src/widget/*`, `scripts/build-widget.mjs`, `src/lib/ikas-client/graphql-requests.ts`, `src/app/api/admin/inject-scripts/route.ts`, `src/app/api/oauth/callback/ikas/route.ts`

## 2026-05-13 - maintenance | Second-brain setup migration
- Summary: Migrated the existing wiki memory system to the second-brain setup without moving or deleting existing docs.
- Updated wiki pages: [[Hot_Context]], [[Index]], [[Open_Questions]], [[Agent_Rules]], [[Documentation_Update_Prompt]], [[Wiki_Maintenance_Prompt]]
- Related files: `AGENTS.md`, `scripts/wiki-audit.mjs`, `scripts/wiki-secret-scan.py`, `scripts/wiki-prune-report.py`
- Related decision/bug/feature/problem: none
