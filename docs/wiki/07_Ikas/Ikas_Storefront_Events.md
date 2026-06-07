---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-05-16
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - ikas
  - storefront
  - events
  - widget
related:
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Ikas_Widget_Injection_Notes]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[Ikas_Lifecycle_Mount_Questions]]"
source_files:
  - "src/widget/core/storefront-context.js"
  - "src/widget/loader.js"
  - "src/widget/events.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/reviews-section/bootstrap.js"
---

# ikas Storefront Events

## Summary

ikas Storefront Events is the official ikas-supported mechanism for receiving page and product context inside a storefront script. It is exposed globally as `window.IkasEvents` on every ikas store with no extra setup.

Per direct ikas developer feedback (2026-05-16, see [[Ikas_Storefront_Script_Capabilities]]), this is the **recommended source of page/product context** — ikas does NOT currently provide official stable ids or `data-*` attributes for page areas. This project should treat Storefront Events as the primary context source and DOM heuristics as a temporary fallback only.

Per direct ikas developer feedback on 2026-06-06 (see [[Ikas_Lifecycle_Mount_Questions]]), these events are analytics-oriented context events. They do **not** guarantee that the destination page DOM, theme sections, or merchant custom HTML blocks have been committed when `PAGE_VIEW` / `PRODUCT_VIEW` fires. ikas also provides no official router subscription beyond these events today. Storefront widgets that inject into host DOM must therefore combine events with DOM observation and stale async guards.

Official docs:
- Quick Start: <https://builders.ikas.com/docs/storefront-events/quick-start>
- Event Types: <https://builders.ikas.com/docs/storefront-events/events>
- Example File: <https://builders.ikas.com/docs/storefront-events/example-file>

2026-05-17 recheck: the builders docs HTML was fetchable and contained the key
tokens `IkasEvents`, `IKAS_EVENT_TYPE`, `IKAS_PAGE_TYPE`, `PAGE_VIEW`,
`PRODUCT_VIEW`, `VIEW_CATEGORY`, and `VIEW_SEARCH_RESULTS`. This confirms the
documentation direction, but it still does not prove every runtime payload field.
2026-06-06 ikas developer feedback confirmed `VIEW_LISTING` + `productDetails[]`
is usable even though the public docs list does not mention it.

## How It Works

`window.IkasEvents` is available automatically on all ikas stores. Subscribe with a unique `id` and a `callback`:

```javascript
window.IkasEvents.subscribe({
  id: 'custom_handler_id',
  callback: function (event) {
    const { type, data } = event;
    // handle the event
  }
});
```

Each event object has a `type` (one of `IKAS_EVENT_TYPE`) and a `data` payload whose shape depends on the type.

## Event Types (`IKAS_EVENT_TYPE`)

| Event Type | Description | Fires When |
|---|---|---|
| `PAGE_VIEW` | Page load event | Any page is loaded |
| `PRODUCT_VIEW` | Product detail view | User views a product detail page |
| `ADD_TO_CART` | Add to cart | A product is added to the cart |
| `REMOVE_FROM_CART` | Remove from cart | A product is removed from the cart |
| `BEGIN_CHECKOUT` | Checkout started | The checkout process begins |
| `CHECKOUT_STEP` | Checkout progress | User advances in checkout |
| `COMPLETE_CHECKOUT` | Order completed | An order completes successfully |
| `ADD_TO_WISHLIST` | Add to wishlist | A product is added to favorites |
| `SEARCH` | Search action | User performs a search |
| `VIEW_CART` | Cart view | User views their cart |
| `VIEW_CATEGORY` | Category view | User views a category page |
| `VIEW_SEARCH_RESULTS` | Search results | Search results are shown |
| `CUSTOMER_REGISTER` | Registration | A new customer registers |
| `CUSTOMER_LOGIN` | Login | A customer logs in |
| `CUSTOMER_LOGOUT` | Logout | A customer logs out |
| `CUSTOMER_VISIT` | Customer visit | A logged-in customer visits |
| `CONTACT_FORM` | Contact form | A contact form is submitted |

## Page Types (`IKAS_PAGE_TYPE`)

The system tracks page types via the `IKAS_PAGE_TYPE` constant:

- `INDEX` — Home page
- `CATEGORY` — Category listing page
- `BRAND` — Brand listing page
- `PRODUCT` — Product detail page
- `CUSTOM` — Custom pages
- `ACCOUNT` — User account page
- `CART` — Shopping cart page
- `CHECKOUT` — Checkout page
- `SEARCH` — Search results page

## Event Payload Shapes (from official example)

The official JavaScript example shows these payload fields:

- `PRODUCT_VIEW` → `data.productDetail.id`, `data.productDetail.name`, `data.productDetail.price`
- `ADD_TO_CART` → `data.item.variant.productId`, `data.item.finalPrice`, `data.item.quantity`
- `COMPLETE_CHECKOUT` → `data.transaction.id`, `data.checkout.items[]` (each item: `item.variant.productId`, `item.finalPrice`, `item.quantity`)

Note: the official docs only enumerate the example fields above. Other events' exact payload shapes should be verified at runtime before relying on them.

## Runtime-Verified Payloads (dev store, 2026-05-17)

Captured live on `dev-mertcopper.ikas.shop` with a read-only `IkasEvents.subscribe`
probe during the ADR_0013 Phase 1 audit (see [[Phase_1_Widget_Runtime_Audit]]).

| Event | Runtime `data` fields | Notes |
|---|---|---|
| `PAGE_VIEW` | `url`, `pageType`, `customer` | `pageType` ∈ `INDEX`, `PRODUCT`, `CATEGORY`, `SEARCH`. ikas double-fires `PAGE_VIEW` on first entry — the widget guards it with an 800 ms window. |
| `PRODUCT_VIEW` | `productDetail` (`id`, `name`, …) | Matches the official example. |
| `VIEW_LISTING` | `productDetails[]` (each with `id`, `name`, `slug` or `metaData.slug`) | Fires on category pages. **Real runtime event** despite being absent from the official docs list; **ikas-confirmed usable 2026-06-06** (see [[Ikas_Lifecycle_Mount_Questions]]). `id` is used for canonical listing badge rating reads. |
| `VIEW_CATEGORY` | `categoryPath`, `category` | Fires alongside `VIEW_LISTING` on category pages; carries **no** product array. |
| `VIEW_SEARCH_RESULTS` | `searchKeyword`, `productDetails[]` (same product id/name/slug shape as listing) | Fires on search pages; this — not `VIEW_LISTING` — carries the search product array. |
| `SEARCH` | `searchKeyword` | Fires on search submit; no product array. |

Key conclusions:
- **`VIEW_LISTING` is valid and ikas-sanctioned.** It is runtime-verified and
  ikas confirmed on 2026-06-06 that `VIEW_LISTING.productDetails[]` can be used.
  The official docs event list is incomplete, not contradictory. The widget's
  `IKAS_EVENT.LISTING_VIEW = 'VIEW_LISTING'` (`core/storefront-context.js`) is
  correct.
- **Category vs search asymmetry:** category product arrays arrive via
  `VIEW_LISTING`; search product arrays via `VIEW_SEARCH_RESULTS`. The widget
  handles both and maps their product ids to the visible slugs for listing badge
  reads.
- **Product identity:** `productDetails[].id` is present on listing/search
  payloads in the dev-store runtime check. Listing/search badges should use this
  as the stable ikas product id and treat slug as a display/DOM-matching field
  only. See [[ADR_0015_Canonical_Product_Identity]].

## Official JavaScript Example

```javascript
function CustomEventHandler() {
  const EVENT_HANDLER_ID = 'custom_handler_' + Date.now();

  function init() {
    try {
      const myScript = document.currentScript;
      const queryParams = new URLSearchParams('?' + myScript.src.split('?')[1]);
      const apiKey = queryParams.get('publicApiKey');

      if (!apiKey) {
        console.error('API Key is required');
        return;
      }
      // Load the third-party script
      loadExternalScript(apiKey);
      // Subscribe to IkasEvents
      window.IkasEvents &&
        window.IkasEvents.subscribe({
          id: EVENT_HANDLER_ID,
          callback: handleIkasEvent,
        });
    } catch (err) {
      console.error('Initialization error:', err);
    }
  }

  function loadExternalScript(publicApiKey) {
    const script = document.createElement('script');
    script.src = `https://external-service.com/script.js?key=${publicApiKey}`;
    script.async = true;
    document.head.appendChild(script);
  }

  function handleIkasEvent(event) {
    const { type, data } = event;

    switch (type) {
      case IKAS_EVENT_TYPE.PRODUCT_VIEW:
        window.ExternalService.trackProduct({
          productId: data.productDetail.id,
          name: data.productDetail.name,
          price: data.productDetail.price,
        });
        break;
      case IKAS_EVENT_TYPE.ADD_TO_CART:
        window.ExternalService.trackAddToCart({
          item: {
            id: data.item.variant.productId,
            price: data.item.finalPrice,
            quantity: data.item.quantity,
          },
        });
        break;
      case IKAS_EVENT_TYPE.COMPLETE_CHECKOUT:
        window.ExternalService.trackPurchase({
          orderId: data.transaction.id,
          items: data.checkout.items.map((item) => ({
            id: item.variant.productId,
            price: item.finalPrice,
            quantity: item.quantity,
          })),
        });
        break;
      // handle other events...
    }
  }

  init();
}

CustomEventHandler();
```

## Script Parameters / Query Params

The injected `<script>` tag can carry URL parameters that the script reads from its own `src`. This is how per-merchant configuration is passed:

```javascript
function init() {
  try {
    const myScript = document.currentScript;
    const queryParams = new URLSearchParams('?' + myScript.src.split('?')[1]);
    const customParam = queryParams.get('publicApiKey');
    if (customParam) {
      loadExternalScript(`https://api.example.com/script.js?key=${customParam}`);
    }
  } catch (err) {
    console.error('Initialization error:', err);
  }
}
```

This matches the current project pattern: the widget reads `publicApiKey` from its own script `src` ([src/widget/core/config.js](src/widget/core/config.js)). For the modular loader, the loader is the single script that reads `publicApiKey` and then dynamically injects widget module scripts.

## Relevance To This Project

- The widget subscribes to `IkasEvents` for `PRODUCT_VIEW`, `VIEW_LISTING`, `VIEW_SEARCH_RESULTS`, and `PAGE_VIEW` in [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js) — the single subscription point since ADR_0013 Phase 1 (the old `events.js` subscription was moved there).
- Runtime audit (2026-05-17) confirmed `VIEW_LISTING` is emitted on category pages and carries `productDetails[]`; search pages emit `VIEW_SEARCH_RESULTS` with the same product id/name/slug shape. The widget uses those product ids for canonical listing/search badge reads.
- The official docs confirm `PAGE_VIEW` and `PRODUCT_VIEW`, which the widget depends on for product detection and listing-badge rendering. ikas confirmed these are not DOM-ready signals; review injection must still wait for the explicit mount when it arrives after the event.
- `PAGE_VIEW` + `IKAS_PAGE_TYPE` should be the canonical way to know the current page type, replacing URL/DOM heuristics in [bootstrap.js](src/widget/reviews-section/bootstrap.js).
- `PRODUCT_VIEW.data.productDetail.id` is the official, supported product identity source — preferred over the `__NEXT_DATA__` / URL regex fallbacks in `getProductFromPage()`.
- For the modular loader architecture ([[Yotpo_Style_Widget_Modular_Architecture]]), Storefront Events is the page/product context layer; the loader subscribes once and routes events to widget modules.

## Open Questions

Updated 2026-05-17 after the Phase 1 runtime audit ([[Phase_1_Widget_Runtime_Audit]]).

- ~~Does `PAGE_VIEW.data` include the page type?~~ **Resolved** — `data.pageType` (`INDEX | PRODUCT | CATEGORY | SEARCH`).
- ~~Is `VIEW_LISTING` a valid runtime event type?~~ **Resolved** — yes, emitted on category pages with `productDetails[]`; ikas confirmed it is usable on 2026-06-06.
- ~~Does the category/search listing payload include product details?~~ **Resolved** — category via `VIEW_LISTING.data.productDetails[]`, search via `VIEW_SEARCH_RESULTS.data.productDetails[]`.
- Are `IKAS_EVENT_TYPE` and `IKAS_PAGE_TYPE` exposed as runtime globals, or must consumers compare against literal strings? Still unverified — the widget uses frozen literal-string constants either way (`core/storefront-context.js`).
- The cold-vs-SPA listing render difference behind [[Bug_Listing_Badge_Stars_Direct_Load]] turned out to be a CSS-injection-path issue (PDP-only `#renuvex-pr-styles`), not an event-sequence issue — now fixed.
- ~~Contract risk: `VIEW_LISTING` is undocumented.~~ **Resolved 2026-06-06** via direct
  ikas developer feedback: `VIEW_LISTING` + `productDetails[]` can be used. Keep this
  note because the public docs are still incomplete, but no code fallback change is
  required from this answer.

## Obsidian Links

- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Widget_Injection_Notes]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Widget_Architecture]]
- [[Ikas_Platform_Notes]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[ADR_0015_Canonical_Product_Identity]]
