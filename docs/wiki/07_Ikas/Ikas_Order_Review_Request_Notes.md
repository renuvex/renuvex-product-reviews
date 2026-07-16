---
type: api
project: renuvex-product-reviews
status: active
created: 2026-07-09
updated: 2026-07-16
last_verified: 2026-07-16
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
  - "src/lib/review-email/eligibility.ts"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
  - "prisma/migrations/20260716120000_add_review_email_eligibility_cutoff/migration.sql"
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
- The current GraphQL contract does not request a manual-order/source marker,
  and normalization does not branch on order origin. Any order returned by
  `listOrder` is therefore evaluated by the same strict recipient, consent,
  shipping, and delivery rules. This is current source behavior, not proof that
  every ikas manual-order variant exposes equivalent customer/package evidence;
  dev-store acceptance is required before claiming full manual-order support.
  No staff, shipping, or billing email is used as a fallback recipient.
- Eligibility logic must be tenant-aware and order-type-aware:
  - physical shipment: use `orderPackageStatus=DELIVERED` as the high-level
    whole-order trigger/fallback; when exact package-to-line membership exists,
    one delivered package may make only that package group eligible while the
    order-level status is still partial;
  - click-and-collect: recognize `READY_FOR_PICK_UP` as the relevant current
    terminal state, but keep production email eligibility fail-closed until ikas
    exposes and dev-store evidence verifies an exact transition timestamp;
  - digital/no-shipment: define a separate product decision because there may be
    no delivery package transition;
  - partial delivery: avoid sending for all order lines just because the order
    has a partial terminal signal; line/package mapping is required.
- ikas does not treat `notificationsAccepted=false` as a platform-level blocker
  for clearly transactional notifications. Renuvex nevertheless implements a
  strict first-release policy: review-request email requires
  `notificationsAccepted=true` and fails closed otherwise. Any future relaxation
  must pass a separate product/legal decision; it is not an unresolved MVP
  implementation choice.
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
- Reconciliation discovery is intentionally not clamped to the merchant's
  review-email activation timestamp. This keeps an order created before
  enablement discoverable when its exact line delivery happens afterward.
  Eligibility is decided per required line after canonical re-read.
- For shipment cutoff enforcement, only
  `OrderLineItem.statusUpdatedAt` on a currently `DELIVERED` line is accepted as
  terminal-transition evidence. Package/order `updatedAt`, `orderedAt`, webhook
  receipt time, and processing time are generic discovery/current-state values;
  a later unrelated update must not make an old delivery eligible.
- Every required line for one product must be delivered with exact timestamp
  evidence, and the product `eligibleAt` is the latest required-line timestamp.
  Missing evidence returns `missing_exact_delivery_timestamp` and produces no
  lifecycle. Package delivered plus a nonterminal line also remains ineligible.
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
- Keep the implemented strict consent policy unless a separately approved
  product/legal review authorizes a broader transactional interpretation.
- Run dev-store acceptance for manually created orders before advertising that
  flow; verify canonical customer email plus package/line delivery evidence
  rather than adding an inferred recipient fallback.
- Run a separate provider-contract acceptance for click-and-collect terminal
  transition timing before enabling that branch; current status alone cannot
  safely enforce the historical activation cutoff.
- Perform live ikas acceptance for the MCP-valid order registration and the
  separately configured uninstall signal, then prove the
  24-hour erasure path after an approved production migration/deploy.
- Build the separately planned AWS EventBridge/SQS/Lambda sender and SES rollout.

## Obsidian Links

- [[Ikas_API_Notes]]
- [[ADR_0036_Review_Request_Email_Architecture]]
- [[ADR_0004_Ikas_Integration_Strategy]]
