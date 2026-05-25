---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - adr
  - widget
  - architecture
  - reliability
related:
  - "[[Decision_Index]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[Photo_Strip]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
---

# ADR_0008 — Cloudinary Cloud Name is Build-Time Only

## Status
Accepted (supersedes the runtime portion of [[ADR_0006_Trusted_Review_Image_URL_Policy]])

## Date
2026-05-11

## Context
Trusted Cloudinary cloud name was historically threaded through three sources at runtime in the widget:
1. `/api/public/settings` response (`imagePolicy.cloudName` field)
2. `localStorage` cache (`ikr_image_policy_<publicApiKey>`, 7-day TTL)
3. Build-time injected constant (`__IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__`)

Plus a setter (`setTrustedReviewImageCloudName`) called from settings fetch, preview mode, and the upload-sign response. This was originally defensive — protect against the K3 silent failure where settings might not return `cloudName` ([[Bug_Cloud_Name_Silent_Image_Filter]]).

But the cloud name is **app-level** config, not merchant-level: every merchant uses the same Cloudinary account ([review-images.ts:9](src/lib/review-images.ts) reads from a single env var). It cannot legitimately differ per request. Three runtime sources + a setter is engineering for a flexibility we do not need.

## Decision
The Cloudinary cloud name is now **a build-time constant only**:
- Provided by `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var at widget build time
- Injected into the bundle by [scripts/build-widget.mjs](scripts/build-widget.mjs) as `__IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__`
- Read once at module load in [helpers.js](src/widget/core/helpers.js); never reassigned
- Settings response no longer carries `imagePolicy`
- Widget has no setter, no localStorage cache, no warn-on-missing helper threaded through settings/preview/upload flows

If the build-time inject is empty (deploy config error), a single `console.error` fires at module load and the widget fails closed for review images. There is no runtime recovery path because there is no runtime input — the only fix is to rebuild the widget with a valid cloud name.

## Reasoning
- **Cloud name is not a secret** — it appears in every Cloudinary delivery URL, including ones already served by the storefront. Build-time injection adds no information that the storefront does not already expose.
- **Cloud name is not per-merchant** — single env var, single value. Threading it through a per-merchant settings response was architectural overhead with no flexibility benefit.
- **K3 becomes structurally impossible.** Settings outage cannot remove image rendering because settings never carried the cloud name to begin with.
- **Less surface area.** ~90 fewer lines (helpers, bootstrap, settings route, step-photos). No setter to misuse, no cache to go stale, no warn helper to call from four places.
- **Deploy semantics are honest.** Changing the Cloudinary account requires rebuilding the widget — which already required env var update and redeploy. Symmetric.

## Alternatives Considered
- **Keep multi-source (status quo before this ADR).** Rejected — defensive code for a non-problem ([Bug_Cloud_Name_Silent_Image_Filter]] root cause was the multi-source design itself, not a missing source).
- **Remove from settings response but keep setter for upload-sign fallback.** Rejected — upload-sign's `cloud_name` echoes the same env var; reading it again at upload time is redundant. The widget already knows it from build time.
- **Make cloud name per-merchant.** Out of scope — current product is single-tenant Cloudinary; revisit only if we ever onboard a merchant with their own Cloudinary.

## Consequences
**Olumlu:**
- K3 ([[Bug_Cloud_Name_Silent_Image_Filter]]) yapısal olarak kapanır — silent image-loss scenario kalmaz.
- Widget bundle yaklaşık 60 satır azaldı.
- Settings endpoint daha basit; `getConfiguredCloudinaryCloudName` import'u kaldırıldı.
- `step-photos.js` upload-sign response'a güvenmiyor; sadece imzayı kullanıyor.

**Olumsuz / Yeni kısıt:**
- Cloudinary cloud'unu değiştirmek için widget rebuild + redeploy gerekir. Bu zaten gerekiyordu (env var → server), şimdi widget bundle da aynı semantiğe tabi.
- Build pipeline'da `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` env var'ı eksikse modül load anında `console.error` basılır ve görseller kaybolur. Deploy doğrulaması için smoke test gerekir.

**Takip işleri:**
- Eski widget bundle'lar storefront tarayıcı cache'inde olabilir; eski kod `imagePolicy`'yi okumaya çalışacak, `undefined` alacak ve build-time fallback'i kullanacak (eskisi gibi çalışır). Yani bu refactor geriye dönük güvenli.
- Cloudinary Dashboard'da **Strict transformations** ayarının açık olması bağımsız bir hardening; bu ADR ile alakası yok ama tavsiye edilir (cloud name herkese açık olduğu için transformation abuse riski).

## Related Source Files
- [scripts/build-widget.mjs](scripts/build-widget.mjs) — `__IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__` inject
- [src/widget/core/helpers.js](src/widget/core/helpers.js) — single-source cloud name, fail-closed startup check
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) — image policy machinery removed
- [src/widget/product-widget/review-form-modal/steps/step-photos.js](src/widget/product-widget/review-form-modal/steps/step-photos.js) — `setTrustedReviewImageCloudName` çağrısı kaldırıldı
- [src/app/api/public/settings/route.ts](src/app/api/public/settings/route.ts) — `imagePolicy` response field'ı kaldırıldı
- [src/lib/review-images.ts](src/lib/review-images.ts) — server-side env var path (değişmedi)

## Related Notes
- [[Decision_Index]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]] — trust boundary policy korunuyor; sadece cloud name'in geliş yolu değişti
- [[ADR_0007_Photo_Strip_Cap_And_Rotation]]
- [[Bug_Cloud_Name_Silent_Image_Filter]] — bu ADR ile yapısal olarak kapatıldı
- [[Photo_Strip]]
