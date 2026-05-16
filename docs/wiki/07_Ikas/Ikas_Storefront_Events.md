---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-16
updated: 2026-05-16
last_verified: 2026-05-16
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
source_files:
  - "src/widget/events.js"
  - "src/widget/product-widget/bootstrap.js"
  - "src/widget/observer.js"
---

# ikas Storefront Events

## Summary

ikas Storefront Events is the official ikas-supported mechanism for receiving page and product context inside a storefront script. It is exposed globally as `window.IkasEvents` on every ikas store with no extra setup.

Per direct ikas developer feedback (2026-05-16, see [[Ikas_Storefront_Script_Capabilities]]), this is the **recommended source of page/product context** — ikas does NOT currently provide official stable ids or `data-*` attributes for page areas. This project should treat Storefront Events as the primary context source and DOM heuristics as a temporary fallback only.

Official docs:
- Quick Start: <https://builders.ikas.com/docs/storefront-events/quick-start>
- Event Types: <https://builders.ikas.com/docs/storefront-events/events>
- Example File: <https://builders.ikas.com/docs/storefront-events/example-file>

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

- The widget already subscribes to `IkasEvents` for `PRODUCT_VIEW`, `VIEW_LISTING`, and `PAGE_VIEW` in [src/widget/events.js](src/widget/events.js).
- Note: the current code references `VIEW_LISTING`, but the official event type list above uses `VIEW_CATEGORY` and `VIEW_SEARCH_RESULTS`. Verify the actual event type string emitted at runtime before relying on `VIEW_LISTING`.
- The official docs confirm `PAGE_VIEW` and `PRODUCT_VIEW`, which the widget depends on for product detection and listing-badge rendering.
- `PAGE_VIEW` + `IKAS_PAGE_TYPE` should be the canonical way to know the current page type, replacing URL/DOM heuristics in [bootstrap.js](src/widget/product-widget/bootstrap.js).
- `PRODUCT_VIEW.data.productDetail.id` is the official, supported product identity source — preferred over the `__NEXT_DATA__` / URL regex fallbacks in `getProductFromPage()`.
- For the modular loader architecture ([[Yotpo_Style_Widget_Modular_Architecture]]), Storefront Events is the page/product context layer; the loader subscribes once and routes events to widget modules.

## Open Questions

- Does the runtime `PAGE_VIEW` payload include `IKAS_PAGE_TYPE` directly, and under which field? Verify before replacing heuristics.
- Is the current code's `VIEW_LISTING` a valid runtime event type, or should it be `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS`? Verify on the dev store.
- Are `IKAS_EVENT_TYPE` and `IKAS_PAGE_TYPE` exposed as runtime globals, or must consumers compare against literal strings?

## Obsidian Links

- [[Ikas_Storefront_Script_Capabilities]]
- [[Ikas_Widget_Injection_Notes]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Widget_Architecture]]
- [[Ikas_Platform_Notes]]
