---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-31
updated: 2026-05-31
last_verified: 2026-05-31
confidence: high
tags:
  - bug
  - widget
  - reviews
  - upload
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Widget]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
source_files:
  - "src/widget/reviews-section/review-form-modal/index.js"
  - "src/widget/reviews-section/review-form-modal/steps/step-photos.js"
  - "tests/widget-interaction-smoke.spec.ts"
---

# Bug - Review Wizard Photo Upload Lifecycle

## Status
Fixed (2026-05-31).

## Area
Widget review submission wizard photo step and modal lifecycle.

## Symptoms
Two lifecycle defects were proven with Playwright before the fix:

1. Closing the wizard while a selected photo upload was still pending created a local `blob:` preview URL but did not call `URL.revokeObjectURL()` for it. The old close cleanup only revoked `persistentBlobMap` values, which are populated after a Cloudinary URL exists; close-before-upload-complete left the pending preview outside that map.
2. Selecting two photos, returning to the photo step, and removing the first pending photo before its upload finished prevented the later selected photo from uploading. The Cloudinary route was called once instead of twice.

During the second regression, removing a pending blob also showed why removal must update state before revoking the object URL: revoking first could leave an image element briefly pointed at the revoked `blob:` URL and produce a browser "Failed to load resource" console entry.

## Root Cause
- `openReviewFormModal()` owned persistent blob maps but only cleaned `cloudUrl -> blobUrl` mappings on close. Pending previews in `state.pendingImages` and preview-mode blobs in `state.images` were not part of the modal close cleanup.
- `step-photos.js` checked whether an upload was still pending after Cloudinary returned. If the user had removed that specific item, it used `return`, aborting the whole upload loop instead of skipping only the deleted item.
- The remove handler revoked the blob before batching the state update that removed the thumbnail.

## Fix
- Added modal-owned `revokeBlobUrl()` / `revokeAllBlobUrls()` helpers with de-dupe in `review-form-modal/index.js`.
- Close cleanup now covers `urlToFinger` blob keys, `blobMap` values, `pendingImages`, and `images`.
- `step-photos.js` receives the modal-owned revoke helper, batches remove state changes, removes map entries, then revokes local blob URLs.
- Deleted pending uploads now `continue` the loop after skipping their state update, so later selected uploads still proceed.

## Files Changed
- [src/widget/reviews-section/review-form-modal/index.js](src/widget/reviews-section/review-form-modal/index.js)
- [src/widget/reviews-section/review-form-modal/steps/step-photos.js](src/widget/reviews-section/review-form-modal/steps/step-photos.js)
- [tests/widget-interaction-smoke.spec.ts](tests/widget-interaction-smoke.spec.ts)
- Rebuilt `public/widget.js` and `public/widget-runtime/*`.

## Verification
- Regression 1: `closing wizard during a pending photo upload revokes local blob previews` instruments `URL.createObjectURL()` and `URL.revokeObjectURL()` in Chromium, closes the wizard before the mocked Cloudinary upload resolves, and asserts every created blob URL is revoked.
- Regression 2: `removing one pending photo does not abort later selected uploads` selects two files, removes the first pending thumbnail while its upload is delayed, and asserts the second Cloudinary upload still starts.

## Prevention
- Treat object URLs as modal-owned resources, not only as successful-upload mappings.
- When a user deletes one pending upload, skip that item only; never abort the whole batch.
- Remove UI state before revoking the object URL that an `<img>` may still reference.
