---
type: api
project: renuvex-product-reviews
status: active
created: 2026-07-09
updated: 2026-07-15
last_verified: 2026-07-15
confidence: high
tags:
  - ikas
  - orders
  - review-request
  - email
  - webhooks
related:
  - "[[Ikas_API_Notes]]"
  - "[[ADR_0036_Review_Request_Email_Architecture]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
source_files:
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/review-email/ikas-orders.ts"
  - "src/lib/ikas-installation-lifecycle.ts"
  - "src/app/api/webhooks/ikas/orders/route.ts"
  - "src/app/api/webhooks/ikas/products/route.ts"
  - "src/lib/review-email/batching.ts"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
---

# ikas Order Review Request Notes

## Agent Brief

Use this page when designing review-request emails, verified-buyer evidence,
order webhooks, or order reconciliation. This page records direct ikas
developer feedback received on 2026-07-09. It is platform evidence, not an
implementation plan. Verify current ikas MCP/docs before adding GraphQL
operations or webhook registrations, and do not mutate provider state without a
separate approved plan.

## Platform Feedback Summary

Direct ikas developer feedback on 2026-07-09 clarified the order-trigger
contract for a post-order single-use action link:

- `store/order/created` and `store/order/updated` are valid webhook scopes for
  this flow.
- App review does not need a special extra permission only for these webhook
  scopes, but the app must have the matching API access permission. For order
  review requests this means Orders read access; customer data use may also
  require Customers read access.
- The canonical high-level physical-delivery field is `orderPackageStatus`.
  Delivered physical orders reach `DELIVERED`.
- `shippingMethod` must also be checked because the terminal state differs by
  order type. `CLICK_AND_COLLECT` orders may terminate at `READY_FOR_PICK_UP`.
  Digital or no-shipment orders may not have a shipping-delivery step.
- `orderPackages[].orderPackageFulfillStatus` and `orderLineItems[].status` are
  detail fields for package/line-level logic, not the first high-level trigger.
- `listOrder.customer.email` and `listOrder.customer.notificationsAccepted` may
  be used for post-order customer communication.
- ikas distinguishes marketing/commercial messages from transactional
  notifications: when `notificationsAccepted=false`, marketing/commercial
  sending should not happen; order confirmation, shipping, delivery, and similar
  transactional notifications are independent of that setting.
- `store/order/updated` payload can contain customer email, line item ids,
  product/variant ids, and package status fields.
- The recommended robust flow is still webhook wake-up -> canonical `listOrder`
  re-read, because webhook ordering or delivery delay can make payload-only
  processing stale.
- General ikas webhooks support HMAC signature verification. Use the documented
  signature/header mechanism and the existing project signature pattern as the
  baseline for any future order webhook receiver.
- If the webhook endpoint returns a non-`200`, ikas retries three more times.
- Missed webhook reconciliation should use periodic `listOrder` reads filtered
  by `updatedAt`.
- `listOrder` pagination is page/limit based. The maximum `limit` is `200`, and
  callers should advance while `hasNext` is true.
- `store/app/deleted` is the uninstall signal. Stored personal data such as
  email, address, order references, and order-line references must be deleted or
  anonymized within 24 hours.
- Current `saveWebhooks` MCP introspection does not list `store/app/deleted`.
  The application therefore registers only `store/order/created` and
  `store/order/updated` through that mutation. The signed uninstall receiver is
  separate and review email cannot be enabled until provider-side app
  configuration is verified and the operator gate is set.

## Product And Implementation Implications

- Do not send review-request email directly inside an order webhook handler.
  The handler should verify the signature, persist/idempotently record the
  event, and enqueue or wake canonical order reconciliation.
- The canonical order state must come from `listOrder`, not only from the
  webhook payload.
- Eligibility logic must be tenant-aware and order-type-aware:
  - physical shipment: use `orderPackageStatus=DELIVERED` as the high-level
    trigger, then check package/line details when needed;
  - click-and-collect: treat `READY_FOR_PICK_UP` as its own terminal state;
  - digital/no-shipment: define a separate product decision because there may be
    no delivery package transition;
  - partial delivery: avoid sending for all order lines just because the order
    has a partial terminal signal; line/package mapping is required.
- `notificationsAccepted=false` is not a platform-level blocker for clearly
  transactional notifications. Whether a review-request email is treated as
  transactional enough, or whether Renuvex requires `notificationsAccepted=true`
  for the MVP, remains a product/legal decision and should be explicit before
  launch.
- The source schema now supports journal-first bounded uninstall cleanup. It stores
  protected email/order evidence only after active-installation and
  merchant-enabled checks, and serializes ingest/reconciliation/erasure with a
  store-scoped installation-generation fence. Review/customer content and
  pending media are removed in bounded batches with idempotent provider cleanup
  outbox jobs; signed QStash continuation plus daily fallback prevents a large
  tenant from depending on one request transaction. Live provider-side
  uninstall registration and 24-hour acceptance are still required before launch.
- Reconciliation uses bounded `updatedAt` windows, max-200 pagination, a DB
  lease/version fence, and the same installation lock. Its future AWS trigger
  must wake this DB-owned lifecycle rather than perform raw broad scans.
- Multi-product source groups exact package membership into one
  `ReviewEmailBatch`, while each canonical product retains an independent
  `ReviewRequest`. One product split across packages is not eligible until all
  related active lines are delivered. Missing or contradictory package evidence
  fails closed; `order:complete` is used only when every active shipment line is
  terminal-delivered. Grouping may change before physical send commit and is
  frozen afterward, preventing package reconciliation from producing duplicate
  initial email.
- Variant and quantity repeats currently dedupe at ikas product id because the
  public review/read-model identity is product-scoped. This is a Renuvex product
  decision, not a claim about an unpublished ikas backend rule.

## Open Implementation Work

- The ikas GraphQL document, additive Prisma lifecycle, signed order webhook
  receiver, canonical `listOrder` re-read, and leased `updatedAt` reconciliation
  are implemented in disabled source and locally verified. The additive
  multi-product batch/envelope layer also exists in source; it does not send
  email without the separately gated AWS sender and activation work.
- Define the product/legal consent rule for review-request email when
  `notificationsAccepted=false`.
- Perform live ikas acceptance for the MCP-valid order registration and the
  separately configured uninstall signal, then prove the
  24-hour erasure path after an approved production migration/deploy.
- Build the separately planned AWS EventBridge/SQS/Lambda sender and SES rollout.

## Obsidian Links

- [[Ikas_API_Notes]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[ADR_0004_Ikas_Integration_Strategy]]
