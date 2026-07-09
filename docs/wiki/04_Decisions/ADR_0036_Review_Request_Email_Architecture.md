---
type: decision
project: renuvex-product-reviews
status: draft
created: 2026-07-09
updated: 2026-07-09
last_verified: 2026-07-09
confidence: high
tags:
  - adr
  - email
  - review-request
  - ikas
  - aws-ses
  - qstash
related:
  - "[[Decision_Index]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
  - "[[ADR_0035_QStash_Scheduler_For_Maintenance]]"
  - "[[Ikas_API_Notes]]"
  - "[[Roadmap]]"
source_files:
  - "package.json"
  - ".env.example"
  - "prisma/schema.prisma"
  - "src/globals/config.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/product-snapshots.ts"
  - "src/app/api/webhooks/ikas/products/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/widget/reviews-section/review-form-modal/steps/step-author.js"
  - "src/lib/media/dispatcher.ts"
  - "src/app/api/internal/media-jobs/route.ts"
  - "src/app/api/internal/scheduled-jobs/route.ts"
  - "src/lib/scheduled-jobs.ts"
---

# ADR_0036 - Review Request Email Architecture

## Agent Brief

Use this draft when researching or designing post-purchase review-request
email, verified-buyer submission, Amazon SES delivery, or email-job scheduling.
Only the current state is established. No provider, schema, ikas eligibility,
consent, retention, or rollout decision has been accepted. Verify the source
files above and current ikas/AWS runtime evidence before extending this ADR.
Do not create AWS resources, DNS records, DB migrations, QStash schedules,
Vercel environment variables, or deploys from this document without a separate
scope, risk, rollback note, and explicit approval.

## Summary

This first checkpoint records the verified pre-implementation state for a
future global-MVP review-request email feature. The target product capability is
not implemented today. The application has reusable pieces - ikas order-read
scope, signed ikas product webhooks, QStash delivery, and an AWS account with
SES available - but it does not yet have an order event contract, review-request
data model, email provider boundary, email job dispatcher, verified submission
token, SES identity, or feedback-processing path.

## Status

Proposed - current-state research only.

The decision is intentionally open. This checkpoint does not authorize
implementation or provider mutation.

## Date

2026-07-09

## Context

The planned capability is a post-purchase email that lets an eligible customer
open a bounded, single-use submission flow for products from a real order. A
correct implementation would cross several independent trust boundaries:

- ikas order and customer data;
- merchant and storefront tenancy;
- eligibility after delivery, cancellation, refund, return, or partial
  fulfillment;
- customer communication consent and applicable regional law;
- delayed and at-least-once job delivery;
- token secrecy, replay resistance, and one-review-per-order-line enforcement;
- email sender authentication and reputation;
- bounce, complaint, suppression, and delivery evidence;
- uninstall and retention behavior for customer/order data.

Those boundaries make a direct "send an email from the webhook" implementation
unsafe. The current-state record must be complete before provider and schema
contracts are decided.

## Current State

### Storefront submission and verified-buyer state

- The public review wizard is open to storefront visitors; it is not gated by a
  purchase or order-line token.
- The author step displays an optional email field and validates its browser
  format, but keeps the value only in client state. The request payload omits
  it explicitly.
- `POST /api/public/reviews` writes `Review.email` as an empty string.
- `Review.email` exists as a nullable Prisma column, but it is not authoritative
  purchase evidence and is not populated by the active public route.
- The application has no verified-buyer flag, order reference, order-line
  reference, review-request token, token-consumption record, or one-review-per-
  order-line constraint.
- The storefront can therefore publish approved reviews without proving that
  the author purchased the product. This is current behavior, not the target
  email-flow contract.

### ikas operations and webhook state

- OAuth currently requests
  `read_orders,write_orders,read_products,read_inventories,write_inventories`.
  The future email flow appears to need order reads, but the final least-
  privilege scope set is not decided. Existing write scopes are broader than
  the currently demonstrated need and require a separate scope review.
- The generated application GraphQL client does not currently define or call a
  `listOrder` document.
- The only application-managed ikas webhook registration is for
  `store/product/created` and `store/product/updated`.
- The current product webhook receiver validates the ikas webhook signature
  with `validateIkasWebhookSignature`, parses the signed payload with
  `getParsedIkasWebhookData`, validates the scope, and then performs
  merchant-scoped product synchronization.
- There is no order webhook endpoint, order-event persistence, order
  reconciliation job, or order webhook idempotency table.

ikas MCP was re-verified on 2026-07-09:

- `saveWebhooks` accepts `store/order/created` and `store/order/updated`, in
  addition to the product/customer/favorite/stock scopes.
- `listOrder` supports filters including order id/number, customer id/email,
  `updatedAt`, `orderedAt`, order status, package status, and payment status.
- `listOrder` exposes customer email, `notificationsAccepted`, guest-checkout
  state, shipping method, payment status, order/package/line statuses,
  cancellation/refund data, package-to-line mappings, and product/variant ids.
- Pagination defaults to 50 and has a documented maximum of 200 records per
  page.

The schema proves that these fields and scopes exist. It does not prove:

- which status is the canonical review-request trigger for physical, digital,
  no-shipment, click-and-collect, or partially fulfilled orders;
- whether `notificationsAccepted` governs this post-purchase transactional
  message;
- whether an order webhook contains enough canonical data or should only wake a
  `listOrder` re-read;
- the supported reconciliation cadence and rate limits after webhook failure;
- the retention/uninstall contract for customer email, order id, and order-line
  id;
- whether order webhooks use exactly the same signature/payload semantics as
  the already implemented product webhook receiver.

These questions remain with ikas. They must not be inferred from GraphQL field
names alone.

### Database state

The database has review, media, cleanup, webhook-audit, media-job, and scheduled
maintenance lock models. It does not have an email-domain model for:

- normalized order/order-line eligibility evidence;
- review-request lifecycle and scheduled send time;
- hashed one-time submission tokens and token consumption;
- email send attempts and provider message ids;
- delivery, delay, bounce, complaint, reject, or rendering-failure events;
- per-recipient or per-tenant suppression;
- template version and locale evidence;
- idempotency across order updates, retries, and duplicate provider events.

`MediaProviderJob`, `WebhookEvent`, and `ScheduledJobRunLock` are specialized
for their current media/provider and maintenance contracts. Reusing them for
email without a deliberate schema decision would mix unrelated lifecycles.

### QStash state

- `@upstash/qstash` is installed and used in production.
- The media dispatcher publishes opaque `jobId` payloads with retry and timeout
  settings to a signed internal receiver.
- Internal QStash routes verify the raw request body and
  `Upstash-Signature` before processing.
- Daily maintenance and monthly image cleanup use signed QStash schedules plus
  `ScheduledJobRunLock` for slot idempotency.
- Read-only QStash verification on 2026-07-09 showed the two expected
  maintenance schedules active, the latest daily schedule state successful,
  and zero DLQ messages.
- There is no email queue, email flow-control key, email dispatcher, email
  internal receiver, or email schedule.

QStash is therefore a proven current capability, not yet an accepted email
architecture. Any future email payload must avoid durable customer/order PII
when an opaque application job id is sufficient.

### Amazon SES and AWS state

Read-only AWS CLI verification on 2026-07-09 used the existing
`renuvex-readonly` SSO profile for AWS account `989086371563`.

In `eu-central-1`:

- SES enforcement status is `HEALTHY`.
- `ProductionAccessEnabled` is `false`; the account is still in the regional
  SES sandbox.
- Sending is enabled with sandbox quota `200` messages per 24 hours and
  `1` message per second.
- Sent count for the previous 24 hours was `0`.
- No SES email identities exist.
- No SES configuration sets exist.
- Account suppression is configured for `BOUNCE` and `COMPLAINT`.
- The account-level suppressed-destination list is empty.
- Virtual Deliverability Manager is disabled.
- No dedicated IP pool exists.

In the repository:

- `@aws-sdk/client-sesv2` is not installed.
- `.env.example` has no SES or email-provider variables.
- `infra/aws` has no SES, email-event, or email-runtime IAM template.
- There is no SES sender, configuration-set integration, feedback endpoint, or
  production-access runbook.

The SES account is therefore available but not configured for application
email. The absence of identities and production access is a deployment blocker,
not evidence that an additional AWS account is needed.

### Sender DNS state

Read-only DNS verification on 2026-07-09 found an existing DMARC record for
`renuvex.app` with policy `p=quarantine` and relaxed DKIM/SPF alignment. No SES
identity or custom MAIL FROM records have been created. The sender identity,
visible From address, custom MAIL FROM subdomain, DKIM records, SPF records, and
DMARC rollout effects remain undecided and must be checked against existing
domain/email use before DNS mutation.

### Missing application behavior

The application currently has none of the following:

- merchant controls for enabling review-request email or choosing delay;
- template/locale configuration;
- order-created/order-updated ingestion;
- eligibility re-check immediately before send;
- cancellation/refund/return invalidation;
- one-time review link generation and redemption;
- verified-buyer marking;
- SES send calls;
- bounce/complaint/delivery event processing;
- suppression-aware send prevention;
- email-specific rate/concurrency limits;
- email audit and operational runbook;
- live email acceptance tests.

## Decision

Not decided in this checkpoint.

Possible boundaries such as `EmailProvider`, `EmailJobDispatcher`,
`SesEmailProvider`, and `QStashEmailJobDispatcher` are design candidates, not
accepted contracts. Their method shapes and ownership must follow the final
ikas eligibility/consent contract and an additive database design.

## Reasoning

Recording current state first prevents implementation from accidentally
coupling order semantics, scheduling, email delivery, and provider-specific
credentials. It also makes unresolved platform policy visible before schema or
runtime contracts become expensive to change.

## Alternatives Considered

No implementation alternative is accepted yet. Provider, scheduler, schema,
token, template, consent, regional, and rollout alternatives will be evaluated
after the ikas answers and the SES/domain preflight are complete.

## Consequences

- No source, schema, environment, DNS, AWS, QStash, or deployment behavior
  changes from this ADR checkpoint.
- The next ADR section must define the external ikas contract and explicitly
  separate verified facts from product/legal decisions.
- Every future mutation remains separately gated.

## Evidence

Project evidence:

- `prisma/schema.prisma`
- `src/globals/config.ts`
- `src/lib/ikas-client/graphql-requests.ts`
- `src/lib/product-snapshots.ts`
- `src/app/api/webhooks/ikas/products/route.ts`
- `src/app/api/public/reviews/route.ts`
- `src/widget/reviews-section/review-form-modal/steps/step-author.js`
- `src/lib/media/dispatcher.ts`
- `src/app/api/internal/media-jobs/route.ts`
- `src/app/api/internal/scheduled-jobs/route.ts`
- `src/lib/scheduled-jobs.ts`
- `package.json`
- `.env.example`
- `infra/aws/`

External contract evidence:

- ikas MCP `list`, `introspect("listOrder")`, and
  `introspect("saveWebhooks")`, re-verified 2026-07-09.
- [ikas Orders API](https://ikas.dev/docs/api/admin-api/orders)
- [ikas Webhooks API](https://ikas.dev/docs/api/admin-api/webhooks)
- [Amazon SES production access and sandbox](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html)
- [Amazon SES identities](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html)
- [Amazon SES custom MAIL FROM](https://docs.aws.amazon.com/ses/latest/dg/mail-from.html)
- [Amazon SES configuration sets](https://docs.aws.amazon.com/ses/latest/dg/managing-configuration-sets.html)
- [QStash at-least-once delivery](https://upstash.com/docs/qstash/features/at-least-once)
- [QStash delayed delivery](https://upstash.com/docs/qstash/features/delay)

## Related Source Files

- [prisma/schema.prisma](prisma/schema.prisma)
- [src/globals/config.ts](src/globals/config.ts)
- [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts)
- [src/lib/product-snapshots.ts](src/lib/product-snapshots.ts)
- [src/app/api/webhooks/ikas/products/route.ts](src/app/api/webhooks/ikas/products/route.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/widget/reviews-section/review-form-modal/steps/step-author.js](src/widget/reviews-section/review-form-modal/steps/step-author.js)
- [src/lib/media/dispatcher.ts](src/lib/media/dispatcher.ts)
- [src/app/api/internal/media-jobs/route.ts](src/app/api/internal/media-jobs/route.ts)
- [src/app/api/internal/scheduled-jobs/route.ts](src/app/api/internal/scheduled-jobs/route.ts)

## Obsidian Links

- [[Decision_Index]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0035_QStash_Scheduler_For_Maintenance]]
- [[Ikas_API_Notes]]
- [[Roadmap]]
