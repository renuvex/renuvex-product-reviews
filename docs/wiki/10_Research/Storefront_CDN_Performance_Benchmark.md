---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-28
updated: 2026-06-29
last_verified: 2026-06-29
confidence: high
tags:
  - widget
  - performance
  - cdn
  - cloudflare
  - vercel
  - aws-cloudfront
related:
  - "[[AWS_Setup_And_Access]]"
  - "[[Widget_Performance]]"
  - "[[Caching_And_Performance]]"
  - "[[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
source_files:
  - "workers/widget-delivery/src/index.ts"
  - "wrangler.widget.jsonc"
  - "scripts/measure-deployed-widget-network.mjs"
  - "scripts/measure-storefront-waterfall.mjs"
  - "scripts/build-widget.mjs"
  - "public/widget-runtime/build-manifest.json"
  - "src/widget/core/origins.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
---

# Storefront CDN Performance Benchmark

## Summary

This page records the 2026-06-28 storefront CDN latency snapshot that triggered
the AWS CloudFront/S3 benchmark question.

The current Cloudflare Worker V2 delivery is functionally correct:

- `widget.renuvex.app` serves widget static assets from Cloudflare Worker Static Assets.
- `GET /api/public/ratings`, `GET /api/public/ratings-by-slug`, and `GET /api/public/reviews` can use the Worker read-through cache.
- `app.renuvex.app` remains the Vercel backend/write/upload/settings/Mux/QStash origin.

The performance question is separate: from the measured Turkey client path,
Cloudflare did not beat Vercel and was much slower than the observed Yotpo
reference CDN path. This does **not** prove Cloudflare is globally bad. It proves
the current `widget.renuvex.app` route should not be treated as the final
performance winner without an AWS CloudFront/S3 canary benchmark.

## Measurement Scope

Measured on 2026-06-28 from the local Windows development machine using `curl.exe`.

Method:

```powershell
curl.exe -L --compressed -s -o NUL -w "%{http_code} %{time_starttransfer} %{time_total} %{size_download}" <url>
```

Each endpoint below used 7 sequential requests without forcing
`Cache-Control: no-cache`. Values are milliseconds.

Important limits:

- This is one client/network path, not a global synthetic benchmark.
- Browser DevTools with cache disabled can produce different numbers than a normal shopper path.
- Yotpo is a benchmark reference from one observed ikas storefront, not a universal Yotpo contract.
- Full public Yotpo app keys are intentionally not stored here; only host/path families are recorded.

## Edge Routing Evidence

Cloudflare trace for `https://widget.renuvex.app/cdn-cgi/trace` showed:

```text
h=widget.renuvex.app
loc=TR
colo=FRA
```

The user's browser trace for the same hostname also showed `loc=TR`, `colo=FRA`,
and HTTP/3. The local `curl` trace showed the same `loc=TR` and `colo=FRA` path
over HTTP/1.1/TLS 1.2. IP values are omitted from this wiki.

Interpretation:

- The measured client in Turkey was routed to Cloudflare's Frankfurt colo for this hostname.
- The 45-byte `__health` response still had a median TTFB near 269 ms, so the baseline delay is not caused by widget bundle size, Postgres, Mux, or application logic.
- Cloudflare read-cache HIT responses still inherit the same client-to-Cloudflare-edge path. Cloudflare Workers Cache API storage is local to the data center handling the request, so a cache HIT in this route still means a response from the selected Cloudflare data center.

## Measured Results

| Endpoint | Status | Encoded bytes | TTFB min | TTFB median | TTFB max | Total median |
|---|---:|---:|---:|---:|---:|---:|
| Cloudflare Worker `/__health` | 200 | 45 | 244.9 | 269.2 | 282.7 | 269.2 |
| Cloudflare Worker `/widget.js` | 200 | 1,360 | 267.5 | 299.8 | 435.7 | 299.9 |
| Cloudflare Worker runtime `runtime-DOJW3JHM.js` | 200 | 4,082 | 253.7 | 270.0 | 325.0 | 270.5 |
| Cloudflare Worker render chunk `render-7V4G6VZN.js` | 200 | 53,587 | 267.4 | 291.2 | 334.8 | 316.4 |
| Cloudflare Worker ratings GET | 200 | 95 | 255.9 | 289.4 | 315.9 | 289.6 |
| Vercel app `/widget.js` | 200 | 1,358 | 187.7 | 214.0 | 265.8 | 216.1 |
| Vercel app runtime `runtime-DOJW3JHM.js` | 200 | 4,091 | 185.6 | 194.8 | 218.3 | 196.8 |
| Yotpo static widget reference | 200 | 18,827 | 57.1 | 57.3 | 108.4 | 59.2 |
| Yotpo CDN initializer reference | 200 | 13,144 | 52.2 | 86.1 | 140.5 | 86.5 |

Header evidence from the same run:

| Surface | Header evidence |
|---|---|
| Cloudflare static assets | `Server: cloudflare`, `CF-Cache-Status: HIT`, expected widget cache headers |
| Cloudflare GET read proxy | `X-Renuvex-Edge-Cache: MISS` on first eligible GET, then `HIT` on repeated GET |
| Vercel static asset | `Server: Vercel`, `X-Vercel-Cache: HIT` |
| Yotpo reference | gzip response with `server-timing` marker `ak_p` on the sampled static widget response |

Note: `curl -I` uses `HEAD`. The Worker intentionally bypasses read-cache storage
for `HEAD` requests. Read-cache behavior must be checked with `GET`.

## 2026-06-29 Storefront Waterfall Follow-up

Chrome DevTools and `scripts/measure-storefront-waterfall.mjs` were used against
the dev ikas product page:

```text
https://dev-mertcopper.ikas.shop/premium-shortsg
```

Current evidence:

- The page document reached DOMContentLoaded around 1.76s and the Renuvex widget
  script tag was present at the same point.
- The Renuvex review widget became visible around 3.24s.
- Renuvex public read APIs were not the dominant delay in this run:
  `renuvex-read-api` max TTFB was around 175ms and `settings` was around 246ms.
- The host storefront produced the largest waterfall surface: roughly 106 ikas
  storefront requests and about 1.91 MB encoded transfer in the sample.
- DevTools showed `/widget.js` returning `304 Not Modified` with
  `Cache-Control: no-store`. Source was hardened so Worker asset responses now
  preserve the intended cache policy for both `200` and `304`: stable loader
  paths remain `public, max-age=0, must-revalidate`; content-hashed runtime and
  chunk paths remain `public, max-age=31536000, immutable`.

Interpretation:

- The evidence does not support blaming Supabase, Redis, QStash, Mux, or DB
  writes for the initial visible widget delay.
- The main optimization area is storefront discovery/runtime sequencing:
  ikas host-page load, the classic loader -> ESM runtime -> surface chunk chain,
  and first-render API fan-out.
- Listing-badge traffic can appear later on PDPs with related/listing product
  data, but the sampled 20-product `ratings` request did not block the first
  review widget visibility.

## 2026-06-29 Yotpo Comparison And Critical Path Finding

Chrome DevTools MCP was used read-only against the same reference ikas storefront
class:

```text
https://proteinocean.com/whey-protein
https://dev-mertcopper.ikas.shop/premium-shortsg
```

Local trace artifacts were captured under `.tmp/` for the session:

- `.tmp/trace-yotpo-proteinocean.json.json.gz`
- `.tmp/trace-renuvex-dev-storefront.json.json.gz`
- `.tmp/trace-renuvex-dev-storefront-repeat.json.json.gz`

The important finding is not that Yotpo has a magic read-API cache. In this
sample, Yotpo separated static widget assets from dynamic review APIs:

| Surface | Evidence |
|---|---|
| Yotpo versioned widget modules | `cdn-widgetsrepository.yotpo.com/.../app.v0.117.4-7293.js` returned `Cache-Control: max-age=31536000` and `Server: AmazonS3`. |
| Yotpo `staticw2` widget script | Public header check showed CDN hit timing markers such as `cdn-cache; desc=HIT` and `edge; dur=1`. |
| Yotpo review/media APIs | `api-cdn.yotpo.com` review and media endpoints returned `Cache-Control: max-age=0, no-cache, no-store`. |
| Renuvex static assets | `widget.renuvex.app/widget.js` and content-hashed runtime/chunks now return the intended Cloudflare cache policies, including conditional `304` responses. |
| Renuvex read proxy | Repeated identical `GET /api/public/reviews` and media-gallery requests returned `X-Renuvex-Edge-Cache: HIT` after warm-up. |

Therefore, the current evidence does **not** support treating missing CDN cache
headers, Supabase, Redis, QStash, Mux, or DB writes as the primary cause of the
first visible review-widget delay.

The source-level blocker is the storefront bootstrap critical path:

- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js)
  starts `fetchMixedMediaGalleryReviews(productId)`.
- The first render then awaits `Promise.all([fetchReviews(...),
  mediaGalleryFetch])`.
- Only after both requests finish does it load the render module and call
  `render(...)`.
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js)
  implements the media gallery request as `hasMedia=true&limit=15`.

Impact:

- A slow media-gallery read can delay the initial review summary/list render even
  when the main `fetchReviews(..., newest, page=1)` response is already
  available.
- The review render chunk is loaded after both review requests, so module
  execution is also behind that combined network dependency.
- This is a widget sequencing issue, not a backend write-path issue.

Evidence-backed next optimization:

1. Fetch and render the main review payload first.
2. Do not await `fetchMixedMediaGalleryReviews` before the first visible render.
3. Hydrate `Musteri Gorselleri` / media-gallery rail after the main review
   section is visible.
4. Keep media-gallery failure isolated so it cannot collapse the full review
   widget.
5. Keep listing badge and structured-data work outside the PDP review section's
   first visible render path.

## 2026-06-29 Yotpo Home And Category DevTools Evidence

Chrome DevTools MCP was also used read-only against the same reference storefront
home and category pages:

```text
https://proteinocean.com/
https://proteinocean.com/protein
```

Local trace artifacts were captured under `.tmp/` during the session and are not
project documentation artifacts:

- `.tmp/trace-devtools-proteinocean-home.json.json.gz`
- `.tmp/trace-devtools-proteinocean-protein-category-2.json.json.gz`

Observed page-level evidence:

| Page | DevTools trace evidence | Network evidence |
|---|---|---|
| `https://proteinocean.com/` | The captured reload did not emit an LCP metric; CLS was `0.00`. | 252 requests in the settled Network panel. Yotpo loaded the common loader, `staticw2` widget shell, carousel batch POSTs, carousel images, and per-product rating GETs. |
| `https://proteinocean.com/protein` | LCP `1328 ms`, TTFB `59 ms`, load delay `1147 ms`, render delay `119 ms`, CLS `0.16`. | 186 requests in the settled Network panel. Yotpo loaded the common loader, `staticw2` widget shell, star-rating module, and 18 per-product rating GETs. |

Header evidence from sampled requests:

| Surface | Header evidence |
|---|---|
| Yotpo loader `cdn-widgetsrepository.yotpo.com/v1/loader/...` | `Access-Control-Allow-Origin: *`, gzip JavaScript. Chrome DevTools Cache insight reported TTL `0 seconds` and about `18.9 kB` wasted bytes on the category trace. |
| Yotpo `staticw2` widget shell | `Access-Control-Allow-Origin: *`, gzip JavaScript. Chrome DevTools Cache insight reported TTL `0 seconds` and about `19.3 kB` wasted bytes on the category trace. |
| Yotpo star-ratings module | `Cache-Control: max-age=31536000`, `Server: AmazonS3`, gzip JavaScript. |
| Yotpo rating API `api-cdn.yotpo.com/.../ratings` | `Cache-Control: max-age=0, no-cache, no-store`, gzip JSON, origin-scoped CORS. |
| Yotpo home carousel batch POST | `Cache-Control: public, max-age=8015`, gzip JSON, origin-scoped CORS. |

Chrome DevTools ThirdParties insight for the category trace reported Yotpo as
`45.4 kB` third-party transfer and about `97 ms` main-thread time. The largest
third-party main-thread time in that trace was `myikas.com` at about `964 ms`.

Interpretation:

- Yotpo home/category surfaces are not loading the full main review widget or
  reviews-media API path observed on PDPs. They primarily load lightweight
  rating/star surfaces, and the home page also loads a carousel batch.
- Yotpo still keeps its common loader and `staticw2` widget shell on a TTL-0
  policy in this observed path. Long-lived caching is applied to versioned
  widget modules such as the star-ratings asset.
- This reinforces the existing Renuvex direction: home, listing, search, and
  category pages should stay on lightweight rating surfaces. Full review,
  media-gallery, Mux Player, and richer review modules should remain behind PDP
  review mounts or future explicit widgets.
- Renuvex should preserve its bulk ratings API model for listing/category
  surfaces. Copying Yotpo's per-product rating request fan-out would be a step
  backward for large product grids unless a future edge aggregation model makes
  that trade-off explicit.

## 2026-06-29 Multi-Provider Competitor DevTools Follow-up

Chrome DevTools MCP was used read-only against additional production storefronts
to avoid overfitting the architecture decision to one Yotpo-on-ikas reference.
No forms, carts, review submissions, admin actions, provider writes, DNS changes,
or deployment actions were performed.

Targets:

```text
https://cozyearth.com/products/bamboo-sheet-set?variant=40965917835444
https://curlmix.com/products/sculpting-jelly-anti-frizz-luscious-lotus
https://takehiq.com/collections/protein-tozu/products/hiq-hi-pro-900g
https://paen.com/keeper-katlanabilir-sirt-cantasi
https://www.petzzshop.com/royal-canin-fit-32-yetiskin-kedi-mamasi?AGIRLIK=400%2B400-Gr-Hediyeli
https://takehiq.com/collections/protein-tozu
https://www.petzzshop.com/kedi-mamasi
https://cozyearth.com/
```

Local trace artifacts were captured under `.tmp/` during the session. They are
temporary evidence files, not durable source artifacts:

- `.tmp/devtools-cozyearth-product-trace.json.json.gz`
- `.tmp/devtools-hiq-product-trace.json.json.gz`
- `.tmp/devtools-paen-product-trace.json.json.gz`
- `.tmp/devtools-petzzshop-product-trace.json.json.gz`

Observed product-page evidence:

| Storefront | Review/runtime provider | Trace evidence | Header/API evidence | Interpretation |
|---|---|---|---|---|
| Cozy Earth PDP | Okendo | LCP `15572 ms`, TTFB `55 ms`, CLS `0.12`. LCP load delay was about `15043 ms`. | `cdn-static.okendo.io/reviews-widget-plus/js/okendo-reviews.js` returned `304`, `Cache-Control: max-age=300`, `Server: AmazonS3`, CloudFront `via`. Okendo review APIs on `api.okendo.io` returned `Cache-Control: no-cache` through CloudFront/API Gateway. | The slow trace was not an origin/DB TTFB problem. The delay was late resource discovery/render/third-party sequencing. Okendo uses CDN static assets plus dynamic no-cache APIs, not a magic fully immutable review-data path. |
| CurlMix PDP | Yotpo, but page-protection affected capture | Deep product trace was incomplete because the page loaded the product document and then redirected the Chrome session to Google through protection/lockdown behavior. | `cdn-widgetsrepository.yotpo.com/v1/loader/...` loaded with `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET,POST`, and rate-limit headers. | Do not use this site for timing conclusions. It only confirms the Yotpo loader surface and that storefront security scripts can materially change the browser path. |
| HiQ PDP | Judge.me Shopify extension | LCP `337 ms`, TTFB `51 ms`, CLS `0.06`. | Judge.me loader from `cdn.shopify.com/extensions/.../judgeme.../loader.js` returned `Cache-Control: public, max-age=31557600`, `Server: cloudflare`, high `Age`, and CORS `*`. PDP later loaded many review/lightbox/media chunks. | Judge.me keeps versioned static assets long-cache and can still have a very fast first render when review details are not blocking the product's critical path. |
| Paen PDP | ikas native reviews | LCP `1993 ms`, TTFB `56 ms`, CLS `0.00`. | Review reads used `POST https://api.myikas.com/api/sf/graphql/listCustomerReviews` with `limit:5` and `limit:100`; responses came through Cloudflare with `set-cookie` and no explicit static-cache contract in the sampled output. | ikas native reviews are POST GraphQL and not CDN-static review reads. This is a backend/API model, not a static widget CDN model. |
| Petzzshop PDP | ikas native reviews | LCP `297 ms`, TTFB `2 ms`, CLS `0.14`. | Static chunks from `cdn.myikas.com` used long cache (`max-age=31536000`) through Cloudflare/CloudFront. Review reads used `POST api.myikas.com/api/sf/graphql?op=listCustomerReviews` with `Cache-Control: no-store`. | Fast PDP paint can coexist with no-store dynamic review APIs when the review path does not block first product render. Static chunks and dynamic review data are separated. |

Observed home/category evidence:

| Storefront | Page | Evidence | Interpretation |
|---|---|---|---|
| Cozy Earth | Home | Okendo script shell was visible, but product review API fan-out was not visible in the first settled XHR list. | Global script presence does not imply full product-review data is fetched on every page. |
| HiQ | Category | Judge.me base/common/main assets loaded, but the full PDP review widget chunk chain and product review data path were not visible in the first page capture. | Listing/category pages stay lighter than PDP review pages. |
| Petzzshop | Category | The first page capture had many ikas `_next/data` and product/category/search requests, but no `listCustomerReviews` call. | ikas native category pages avoid per-product review-detail fan-out in the observed path. |

Cross-provider conclusion:

- Mature storefronts separate static/versioned widget assets from dynamic review
  data. Long-cache static modules are common; dynamic review APIs are often
  `no-cache`, `no-store`, POST GraphQL, or otherwise not immutable edge data.
- Fast product pages are not necessarily fast because every review API is cached
  at the edge. They are fast because the first product render is not blocked by
  full review/media/lightbox work.
- Home, listing, search, and category pages should avoid full review/media API
  fan-out. Lightweight rating summaries or explicitly mounted carousel widgets
  are the observed pattern.
- The current Renuvex Cloudflare Worker V2 split remains directionally correct:
  static assets and selected public read GETs may use the edge, while settings
  side effects, upload, submit, video, Mux, Cloudinary, QStash, and backend
  writes stay on `app.renuvex.app`.
- The next Renuvex optimization should focus on source sequencing and first
  visible render isolation before adding KV, moving write paths, or changing CDN
  providers solely because of one-off script timing comparisons.

## Cause And Effect

### What the data supports

- Static asset delivery is correctly configured on Cloudflare, but the measured route from Turkey to `widget.renuvex.app` goes to `FRA`.
- Since `__health` is only 45 bytes and still returns around 269 ms median, the dominant issue in this snapshot is not JS size or DB work. It is edge routing / network path latency for this client.
- Vercel is faster than the current Cloudflare path for the same widget assets in this measurement, but still materially slower than the Yotpo reference static CDN path.
- Yotpo's much lower measured TTFB shows that sub-100 ms static widget delivery from the same client/network is possible for this class of storefront script.
- The Cloudflare V2 read cache works functionally, but it does not remove the client-to-Cloudflare-edge latency floor.

### What the data does not prove

- It does not prove all Cloudflare plans/routes will be slow globally.
- It does not prove AWS CloudFront will be faster until the same assets are tested behind a CloudFront/S3 canary hostname.
- It does not prove the widget bundle is the primary performance problem.
- It does not prove ikas storefront loading is the root cause, because direct CDN asset requests were measured independently.

## Official Documentation Notes

- Cloudflare's Cache API documents `cache.match` / `cache.put` as Worker cache primitives. Cloudflare also documents that Workers Cache API storage is local to the data center handling the request and does not use tiered cache for `cache.put`.
- AWS CloudFront documentation describes CloudFront as a global content delivery network and states it routes viewer requests to edge locations for low-latency delivery.
- Vercel documents `Cache-Control` / CDN cache behavior and response headers such as `x-vercel-cache`.

Reference links:

- Cloudflare Workers Cache API: `https://developers.cloudflare.com/workers/runtime-apis/cache/`
- Cloudflare Workers cache behavior: `https://developers.cloudflare.com/workers/reference/how-the-cache-works/`
- AWS CloudFront introduction: `https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html`
- Vercel Cache-Control headers: `https://vercel.com/docs/caching/cache-control-headers`
- Vercel response headers: `https://vercel.com/docs/headers/response-headers`

## Decision

Do not roll back Cloudflare Worker V2 only because of this snapshot. The current
split architecture is functionally correct and keeps storefront static/read
traffic isolated from the backend/write origin.

Do not treat the current Cloudflare Worker route as the final performance
architecture either. The next evidence-backed step is a non-invasive AWS
CloudFront/S3 canary benchmark:

1. Publish the same prepared widget asset directory to a temporary S3 bucket behind CloudFront.
2. Use a separate canary hostname, not the live ikas script URL.
3. Keep `app.renuvex.app` as the backend/write/API origin during the test.
4. Measure the same endpoints from the same client and at least one external synthetic location.
5. Compare p50/p90 TTFB, total time, cache headers, and failure behavior before deciding whether to cut over.

Implementation note: [[AWS_CloudFront_Widget_Canary_Runbook]] owns the repeatable
CloudFormation/S3 asset-packaging path for this benchmark. The first phase uses
the CloudFront default distribution domain, not a custom `renuvex.app` hostname,
so live DNS and ikas script records remain untouched.

## AWS CloudFront Canary Result - 2026-06-29

The first AWS canary is live on the CloudFront default hostname:

```text
https://d34tylxlzkmua8.cloudfront.net
```

Infrastructure evidence:

- Stack: `renuvex-widget-cdn-canary`
- Distribution ID: `E2IGB2R73IV6SE`
- Bucket: `renuvex-widget-canary-989086371563-eu-central-1`
- CloudFront status: `Deployed`
- S3 object count uploaded by the canary asset pack: `446`
- S3 object encryption: `AES256`
- Stable loader cache policy: `public, max-age=0, must-revalidate`
- Hashed chunk cache policy: `public, max-age=31536000, immutable`
- Simple CORS: `Access-Control-Allow-Origin: *` on widget asset `GET` responses

Important setup correction:

- The initial CloudFront distribution used the AWS managed
  `UseOriginCacheControlHeaders` cache policy. That policy forwards the viewer
  `Host` header. With a private S3 origin behind Origin Access Control, this
  made CloudFront request the wrong S3 virtual-hosted bucket and returned S3
  `404 NotFound` even though `widget.js` existed and direct S3 presigned GET
  returned `200`.
- The canary now uses a stack-owned CloudFront cache policy with `MinTTL=0`,
  `DefaultTTL=0`, `MaxTTL=31536000`, Brotli/gzip enabled, and no forwarded
  headers, cookies, or query strings. This preserves origin `Cache-Control`
  behavior without forwarding `Host`.
- The canary intentionally supports static-asset simple CORS only (`GET` and
  `HEAD`). Browser script/module/chunk loads do not require preflight because
  they do not send custom request headers or credentials. If AWS asset delivery
  later needs `OPTIONS`, add an explicit CloudFront viewer-request function
  instead of forwarding preflight to the private S3 origin.

HTTP evidence after the fix:

| Endpoint | Status | Cache evidence | Cache-Control | CORS |
|---|---:|---|---|---|
| AWS `/widget.js` | 200 | `RefreshHit from cloudfront` | `public, max-age=0, must-revalidate` | `*` |
| AWS `render-7V4G6VZN.js` | 200 | `Hit from cloudfront` | `public, max-age=31536000, immutable` | `*` |
| AWS `/__health` | 200 | `Miss from cloudfront` | `no-store` | not required |

Controlled Playwright network measurement passed for both origins using the
same script:

| Origin | Scenario | Scripts | Encoded bytes | Decoded bytes | API calls |
|---|---|---:|---:|---:|---|
| AWS CloudFront | mount-present badge-on | 20 | 89,675 | 299,426 | settings:1, ratings:1, reviews:2, error:0 |
| AWS CloudFront | mount-absent badge-on | 18 | 38,332 | 84,062 | settings:1, ratings:1, reviews:0, error:0 |
| AWS CloudFront | mount-present badge-off | 20 | 89,673 | 299,426 | settings:1, ratings:1, reviews:2, error:0 |
| AWS CloudFront | mount-absent badge-off | 18 | 38,349 | 84,062 | settings:1, ratings:0, reviews:0, error:0 |
| Cloudflare Worker | mount-present badge-on | 20 | 99,876 | 299,426 | settings:1, ratings:1, reviews:2, error:0 |
| Cloudflare Worker | mount-absent badge-on | 18 | 43,129 | 84,062 | settings:1, ratings:1, reviews:0, error:0 |
| Cloudflare Worker | mount-present badge-off | 20 | 99,982 | 299,426 | settings:1, ratings:1, reviews:2, error:0 |
| Cloudflare Worker | mount-absent badge-off | 18 | 43,170 | 84,062 | settings:1, ratings:0, reviews:0, error:0 |

The encoded-byte difference mostly comes from edge compression behavior in this
measurement: AWS served most files with Brotli, while Cloudflare served the
sampled browser responses with `zstd`.

Warm sequential `curl` snapshot from the same local machine:

| Endpoint | Origin | TTFB range | Approx median total |
|---|---|---:|---:|
| `/widget.js` | Cloudflare Worker | 217-270 ms | 225 ms |
| `/widget.js` | AWS CloudFront | 183-260 ms | 204 ms |
| `render-7V4G6VZN.js` | Cloudflare Worker | 193-241 ms | 293 ms |
| `render-7V4G6VZN.js` | AWS CloudFront | 168-198 ms | 281 ms |

Interpretation:

- AWS CloudFront/S3 can serve the exact widget asset graph correctly and a bit
  faster than the current Cloudflare Worker route from this local Turkey path.
- The observed gain is measurable but not large enough by itself to justify an
  immediate production cutover without broader-region testing and operational
  cost review.
- The current Cloudflare Worker V2 path remains production-functional. AWS is
  now a proven canary candidate, not yet the chosen production replacement.

## Acceptance Criteria For The AWS Canary

- No ikas script mutation.
- No `widget.renuvex.app` DNS cutover during benchmark setup.
- No DB, Mux, QStash, Cloudinary, or Vercel backend mutation.
- Same `widget.js`, current runtime, current manifest-referenced chunks, and same cache policy.
- At minimum, compare:
  - Cloudflare Worker current live hostname.
  - Vercel backend/static hostname.
  - CloudFront/S3 canary hostname.
  - The Yotpo static reference only as a third-party benchmark, not a target contract.

The first CloudFront/S3 comparison is complete. Remaining evidence before a CDN
cutover decision: broader-region synthetic checks, operational cost comparison,
rollback rehearsal, and a decision on whether production should use a custom
`widget.renuvex.app` CloudFront distribution or keep Cloudflare Worker as the
live delivery layer.

## Related Source Files

- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [scripts/measure-deployed-widget-network.mjs](scripts/measure-deployed-widget-network.mjs)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)

## Obsidian Links

- [[Widget_Performance]]
- [[Caching_And_Performance]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
