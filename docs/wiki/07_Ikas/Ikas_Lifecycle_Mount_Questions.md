---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-06-06
updated: 2026-06-06
last_verified: 2026-06-06
confidence: low
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
**Drafted 2026-06-06 — not yet sent to ikas.** Each question has an `Answer (ikas):` slot to
fill when a reply arrives. Until answered, treat every assumption below as **unconfirmed**.

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
- **Answer (ikas):** _Pending._

### Q2 — Event ↔ DOM ordering guarantee
When `PRODUCT_VIEW` fires on SPA navigation, is the product page body **guaranteed** to already be in
the DOM? Our runtime observation: **not guaranteed** — the event can precede the DOM. Can you confirm
the intended/contractual ordering?
- **If "event may precede DOM" is expected →** confirms our observer approach is the right pattern.
- **Answer (ikas):** _Pending._

### Q3 — Stable mount anchor / official DOM hooks
Are there (or planned) **official, stable** DOM hooks — documented `data-*` attributes or named
regions/slots — for app scripts to locate page areas (e.g. the product-title region, or a content
slot for an injected block)? We currently rely on DOM heuristics + a merchant-placed block because no
official slots exist (per ikas feedback 2026-05-16, see [[Ikas_Storefront_Script_Capabilities]]).
- **If yes/roadmap →** we target the stable anchor instead of heuristics + manual merchant mount.
- **Answer (ikas):** _Pending._

### Q4 — Custom HTML block render timing
For a merchant-placed **custom HTML block** on a product page, on SPA navigation is that block
guaranteed present in the DOM at a defined point relative to `PRODUCT_VIEW`? Or can a theme render it
lazily / below-the-fold / after the event? (This is the exact element whose late insertion caused our
race.)
- **If a defined timing exists →** we can bound/await it deterministically.
- **Answer (ikas):** _Pending._

### Q5 — Client-side route-change subscription
Is there an official API to subscribe to **client-side route changes** (the storefront router), so an
app can react to navigation without patching `history.pushState` / `popstate`? (We currently patch
History API in `events.js` to clean up stale PDP badges across SPA nav.)
- **If yes →** we replace the History-API patch with the official subscription.
- **Answer (ikas):** _Pending._

### Q6 — `VIEW_LISTING` support status (pre-existing open question)
Is `VIEW_LISTING` a **supported, stable** Storefront Event? It fires on category pages with
`productDetails[]` but is absent from the official docs (which list `VIEW_CATEGORY` /
`VIEW_SEARCH_RESULTS`). If it is not guaranteed, what is the documented way to read the category
product array? (Mirrors the existing [[Open_Questions]] item.)
- **If unsupported →** we harden the `VIEW_CATEGORY` + DOM-slug fallback.
- **Answer (ikas):** _Pending._

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

Until answered, the **defensive fix stays** — it is correct and deterministic regardless of the
platform answers; these only let us simplify.

## Obsidian Links
- [[Ikas_Storefront_Events]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Theme_Limitations]]
- [[Bug_PDP_Review_Lifecycle_SPA_Race]]
- [[Open_Questions]]
