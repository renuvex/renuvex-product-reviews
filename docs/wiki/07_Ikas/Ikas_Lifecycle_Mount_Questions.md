---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-06-06
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - ikas
  - storefront
  - events
  - lifecycle
  - open-question
related:
  - "[[Ikas_Storefront_Events]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Ikas_Theme_Limitations]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Bug_PDP_Review_Lifecycle_SPA_Race]]"
  - "[[Open_Questions]]"
source_files:
  - "src/widget/core/storefront-context.js"
  - "src/widget/loader.js"
  - "src/widget/reviews-section/bootstrap.js"
---

# ikas Lifecycle & Mount Contract — Questions to ikas

## Status
**Asked + answered 2026-06-06** (public ikas developer community). ikas confirmed the Storefront
Events are **analytics-oriented**, so DOM-readiness / ordering / custom-block timing are **not
guaranteed** (Q1/Q2/Q4); there is **no** official route-change API beyond the events (Q5); and
`VIEW_LISTING` + `productDetails[]` **is usable** (Q6 — resolved). Official page-injection /
placement points are on the roadmap but **not near-term** (Q3). **Net: the defensive fix is the
required approach — there is no platform guarantee to simplify toward today.**

**Follow-up answered 2026-06-29** (ikas support, user-provided). ikas stated that dev/test
storefronts or builder environments should not have separate debug layers, preview/proxy behavior,
cache behavior, or StorefrontJSScript injection timing differences versus public production; they
should reflect in the same time. **Net: do not dismiss dev-store widget waterfall measurements as
automatically slower because the store is dev/test.** This does not prove the ikas host page has no
performance cost; it only removes the dev-vs-production environment-mismatch hypothesis from the
primary root-cause list.

## Why we are asking (context)
Our storefront review widget is injected via a storefront script. It reads page/product context
from `window.IkasEvents` ([Ikas_Storefront_Events](Ikas_Storefront_Events.md)) and renders the
review block where the merchant placed `<div data-renuvex-widget="reviews">`.

On **client-side (SPA) navigation** (e.g. homepage → product via a theme link, no full reload) the
review block intermittently failed to render until a manual refresh — fixed 2026-06-06
([[Bug_PDP_Review_Lifecycle_SPA_Race]]). **Runtime-verified root cause:** `PRODUCT_VIEW` (and the
URL change) can fire **before** the destination page's DOM — including the merchant's custom block —
is committed, so a one-shot mount attempt finds no anchor and nothing re-triggers it.

We fixed it **defensively** (a `MutationObserver` that waits for the block + a monotonic
stale-request guard). That fix is correct and standard for third-party widgets, but it is
**defensive by necessity**: ikas currently exposes neither a guaranteed "page rendered" lifecycle
hook, nor an event↔DOM ordering guarantee, nor a stable mount anchor. The questions below would let
us replace heuristics with a deterministic platform contract.

## Public (anonymized) ask
Asked in the **public** ikas developer community, so it is deliberately **generic** — it must NOT
reveal the app's purpose (reviews), brand, or any selector, because competing app developers can see
it. Recorded verbatim (TR) for traceability; the internal Q1–Q6 below keep the real context.

> Merhaba, ikas storefront'unda **storefront script** ile çalışan bir uygulama geliştiriyoruz.
> Uygulamamız sayfa/ürün bağlamını `window.IkasEvents` üzerinden okuyup storefront'ta belirli bir
> alana içerik render ediyor (içeriği, merchant'ın temaya eklediği bir custom HTML container içine
> basıyoruz).
>
> **Client-side (SPA) navigasyonda** (ör. anasayfa → ürün detay, sayfa yenilenmeden) içeriğimiz
> bazen render olmuyor, manuel refresh'e kadar gelmiyor. Tespit ettiğimiz kök neden: `PRODUCT_VIEW`
> (ve URL değişimi), hedef sayfanın DOM'u — bizim hedef container'ımız dahil — **basılmadan önce**
> ateşlenebiliyor; tek seferlik render denemesi hedef elementi bulamıyor. Bunu kendi tarafımızda
> savunmacı çözdük (DOM'u izleyip element gelince render + stale-istek koruması), fakat platform
> sözleşmesine dair sorularımız var:
>
> **1.** SPA navigasyonunda, hedef sayfanın DOM'u (tema section'ları + custom HTML içerik) tamamen
> render olduktan **sonra** ateşlenen resmi bir event/callback var mı? `PAGE_VIEW`/`PRODUCT_VIEW`
> route/context değişiminde geliyor gibi, gövde DOM'a basıldıktan sonra değil.
>
> **2.** `PRODUCT_VIEW` SPA'da ateşlendiğinde, ilgili sayfanın gövdesi DOM'da **garanti** hazır mı?
> Gözlemimiz garanti olmadığı yönünde — beklenen sıralamayı teyit eder misiniz?
>
> **3.** App script'lerinin sayfadaki belirli alanları bulup içerik yerleştirmesi için **resmi ve
> stabil** DOM kancaları (dokümante `data-*` attribute'ları veya isimli slot/region) var mı, ya da
> yol haritasında mı?
>
> **4.** Merchant'ın temaya eklediği bir **custom HTML bloğu**, SPA navigasyonunda `PRODUCT_VIEW`'e
> göre tanımlı bir noktada DOM'da garanti hazır mı? Yoksa tema bunu lazy / ekran-altı / event'ten
> sonra render edebilir mi?
>
> **5.** `history.pushState`/`popstate` patch'lemeden, storefront router'ının **route
> değişimlerine** abone olmanın resmi bir yolu var mı?
>
> **6.** `VIEW_LISTING` **desteklenen, stabil** bir Storefront Event mi? Kategori sayfalarında
> `productDetails[]` ile geliyor ama resmi dokümanda yok (`VIEW_CATEGORY`/`VIEW_SEARCH_RESULTS`
> listeli). Garanti değilse, kategori ürün dizisini okumanın dokümante yolu nedir?

## Questions (internal — full context)

### Q1 — Page-ready (post-render) lifecycle signal on SPA navigation
On client-side navigation, is there an official event/callback that fires **after** the destination
page's DOM (theme sections **and** merchant custom HTML blocks) is fully rendered? `PAGE_VIEW` /
`PRODUCT_VIEW` appear to fire on route/context change, not after the body is committed.
- **If yes →** we mount on that signal and drop the DOM-waiting observer.
- **Answer (ikas, 2026-06-06): No.** The Storefront Events are *"genelde analitik için
  kullanılıyor"* — no post-render "page ready" signal is provided or guaranteed. → Keep the
  `MutationObserver` late-mount; there is no platform ready-signal to switch to.

### Q2 — Event ↔ DOM ordering guarantee
When `PRODUCT_VIEW` fires on SPA navigation, is the product page body **guaranteed** to already be in
the DOM? Our runtime observation: **not guaranteed** — the event can precede the DOM. Can you confirm
the intended/contractual ordering?
- **If "event may precede DOM" is expected →** confirms our observer approach is the right pattern.
- **Answer (ikas, 2026-06-06): Not guaranteed.** Confirmed — the events are analytics-grade, so
  `PRODUCT_VIEW` may fire **before** the DOM is committed. → Our runtime observation was correct; the
  observer + stale-request guard are required.

### Q3 — Stable mount anchor / official DOM hooks
Are there (or planned) **official, stable** DOM hooks — documented `data-*` attributes or named
regions/slots — for app scripts to locate page areas (e.g. the product-title region, or a content
slot for an injected block)? We currently rely on DOM heuristics + a merchant-placed block because no
official slots exist (per ikas feedback 2026-05-16, see [[Ikas_Storefront_Script_Capabilities]]).
- **If yes/roadmap →** we target the stable anchor instead of heuristics + manual merchant mount.
- **Answer (ikas, 2026-05-16 + 2026-06-06):** No official slots/anchors today (2026-05-16).
  **2026-06-06 update:** ikas confirmed official page-injection / placement points are **planned**
  (*"sayfaya injection vs için geliştirmelerimiz olacak belirli yerlere koymanız için"*) but
  *"biraz daha zamanı var"* — **no near-term ETA**. → Keep the merchant-placed container +
  heuristics; plan a future migration when it ships. (This question was dropped from the public ask
  since it was already answered 2026-05-16; the roadmap line above is the new datapoint.)

### Q4 — Custom HTML block render timing
For a merchant-placed **custom HTML block** on a product page, on SPA navigation is that block
guaranteed present in the DOM at a defined point relative to `PRODUCT_VIEW`? Or can a theme render it
lazily / below-the-fold / after the event? (This is the exact element whose late insertion caused our
race.)
- **If a defined timing exists →** we can bound/await it deterministically.
- **Answer (ikas, 2026-06-06): Not guaranteed.** Part of the *"1, 2 ve 3 garanti değil"* answer — a
  merchant/theme custom HTML block has **no** guaranteed presence/timing relative to `PRODUCT_VIEW`.
  → The DOM-waiting observer is the correct approach.

### Q5 — Client-side route-change subscription
Is there an official API to subscribe to **client-side route changes** (the storefront router), so an
app can react to navigation without patching `history.pushState` / `popstate`? (We currently patch
History API in `events.js` to clean up stale PDP badges across SPA nav.)
- **If yes →** we replace the History-API patch with the official subscription.
- **Answer (ikas, 2026-06-06): No.** *"Bu eventler dışında bir desteğimiz bulunmuyor."* No official
  route-change / router subscription beyond Storefront Events. → Keep the `history.pushState` /
  `popstate` patch in `events.js`; there is no official alternative.

### Q6 — `VIEW_LISTING` support status (pre-existing open question)
Is `VIEW_LISTING` a **supported, stable** Storefront Event? It fires on category pages with
`productDetails[]` but is absent from the official docs (which list `VIEW_CATEGORY` /
`VIEW_SEARCH_RESULTS`). If it is not guaranteed, what is the documented way to read the category
product array? (Mirrors the existing [[Open_Questions]] item.)
- **If unsupported →** we harden the `VIEW_CATEGORY` + DOM-slug fallback.
- **Answer (ikas, 2026-06-06): RESOLVED — supported.** *"Bunu kullanabilirsiniz, productDetails
  array'i evet kullanılabilir."* `VIEW_LISTING` + `productDetails[]` is ikas-sanctioned. → Downgrade
  the VIEW_LISTING risk; treat it as supported, not just runtime-verified.

## How answers would change our code
- **Q1/Q2/Q4 = "yes, deterministic ready/timing"** → the late-mount `MutationObserver` +
  6×150ms bounded retry in [loader.js](src/widget/loader.js) becomes a single deterministic mount on
  the platform signal; the per-await stale guard in
  [bootstrap.js](src/widget/reviews-section/bootstrap.js) can stay (cheap insurance) or shrink.
- **Q3 = "stable anchor"** → replace DOM heuristics in
  [storefront-context.js](src/widget/core/storefront-context.js) /
  product-title detection with the official hook; the merchant-placed mount could become optional.
- **Q5 = "router API"** → drop the `history.pushState` monkey-patch in `events.js`.
- **Q6 = "unsupported"** → strengthen the category fallback path.

**Answered 2026-06-06 — the defensive fix is confirmed as the required approach.** ikas guarantees
none of the timing/ordering/mount signals (Q1/Q2/Q3/Q4) and offers no route API (Q5), so there is
**nothing to simplify toward** today. The only change is Q6: `VIEW_LISTING` is now ikas-sanctioned.
Re-evaluate Q3 (official injection / placement points) when ikas ships the roadmapped feature.

## Obsidian Links
- [[Ikas_Storefront_Events]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Theme_Limitations]]
- [[Bug_PDP_Review_Lifecycle_SPA_Race]]
- [[Open_Questions]]
