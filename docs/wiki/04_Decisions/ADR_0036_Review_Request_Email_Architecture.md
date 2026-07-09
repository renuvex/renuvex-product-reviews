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
  - "infra/aws/review-images-runtime-iam.cloudformation.json"
  - "prisma/schema.prisma"
  - "src/globals/config.ts"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/media/providers/aws-review-image.ts"
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
The provider boundary, SES regional/sender/runtime/feedback contract, and
provider-neutral tenant direction are accepted. The ikas eligibility, consent,
retention, exact Prisma schema, and rollout contracts remain open. Verify the
source files above and current ikas/AWS runtime evidence before extending this
ADR.
Do not create AWS resources, DNS records, DB migrations, QStash schedules,
Vercel environment variables, or deploys from this document without a separate
scope, risk, rollback note, and explicit approval.

## Summary

This ADR records the verified pre-implementation state and the first accepted
infrastructure contract for a future global-MVP review-request email feature.
The target product capability is not implemented today. AWS SES in
`eu-central-1`, a review-specific sender domain, Vercel OIDC, provider-neutral
application boundaries, tenant-aware ownership, QStash dispatch, and a signed
SES feedback path are accepted directions. The ikas trigger/consent contract,
exact additive schema, token lifecycle, templates, and rollout remain open.

## Status

Proposed - infrastructure contract accepted; application contract remains open.

This ADR does not authorize implementation or provider mutation.

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
identity or custom MAIL FROM records have been created. The selected application
identity is `reviews.renuvex.app`, the visible From address is
`requests@reviews.renuvex.app`, and the custom MAIL FROM domain is
`bounce.reviews.renuvex.app`. Their DKIM, MX, SPF, and any explicit subdomain
DMARC records are not deployed. The final DMARC reporting mailbox and
`BehaviorOnMxFailure` choice remain DNS-rollout decisions.

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

### Application boundaries

- The application owns order eligibility, consent interpretation, scheduling,
  template rendering, locale, one-time review tokens, idempotency, and durable
  audit evidence.
- `EmailProvider` is a narrow provider-neutral send boundary. Its first
  implementation will be `SesEmailProvider`.
- `EmailJobDispatcher` is a separate provider-neutral delayed-job boundary. Its
  first implementation will be `QStashEmailJobDispatcher`.
- QStash payloads carry an opaque application job id, not customer email,
  order details, rendered content, or review tokens.
- Email templates are rendered and versioned by the application rather than
  stored as authoritative SES templates.

### Sender and region

- The MVP uses one SES region: `eu-central-1`. Global recipients do not require
  one SES installation per customer country.
- The verified SES domain identity is `reviews.renuvex.app`.
- The visible From address is `requests@reviews.renuvex.app`.
- The custom MAIL FROM domain is `bounce.reviews.renuvex.app`; it is reserved
  for SES feedback and is not used as a visible sender, website, or inbox.
- Easy DKIM uses the SES-supported 2048-bit key length.
- The display name and merchant Reply-To policy remain product decisions. A
  merchant address must not be used as Reply-To until its ownership and
  fallback behavior are defined.

### Runtime credentials and IAM

- Vercel production obtains short-lived AWS credentials through the existing
  Vercel OIDC provider and AWS STS `AssumeRoleWithWebIdentity`.
- Email sending uses a new dedicated runtime role; the review-image runtime role
  is not expanded with SES permissions.
- The trust policy is scoped to the exact Vercel team, project, production
  environment, and configured audience.
- Runtime permission is limited to `ses:SendEmail` for the selected SES identity
  and configuration set, constrained by the exact `ses:FromAddress`.
- Static AWS access keys, `ses:*`, `SendRawEmail`, SES control-plane operations,
  tenant lifecycle permissions, and `iam:PassRole` are excluded from the send
  role.

### Tenant-aware, provider-neutral ownership

- `storeId` remains the application tenant identity and source of truth.
- The email-domain schema is provider-neutral. AWS SES tenant identifiers are
  provider references, not primary business identity.
- The future additive schema must separate at least tenant/provider mapping,
  normalized order-line eligibility, review-request lifecycle, hashed one-time
  tokens, dispatch/send attempts, provider events, recipient/tenant
  suppression, and template/locale evidence.
- Existing `Review.email`, `MediaProviderJob`, `WebhookEvent`, and
  `ScheduledJobRunLock` are not repurposed for these independent lifecycles.
- SES Tenant Management is the target for multi-merchant production. A store's
  tenant uses shared Renuvex identity/configuration-set resources, tenant-level
  bounce/complaint suppression, and the standard reputation policy.
- Tenant provisioning and removal use a separate control-plane boundary and
  role after the ikas install/uninstall and retention contract is known.

### SES observability and feedback

- The shared configuration set is `renuvex-review-requests-prod`.
- The first event destination captures `SEND`, `REJECT`, `BOUNCE`,
  `COMPLAINT`, `DELIVERY`, `DELIVERY_DELAY`, and `RENDERING_FAILURE`.
- `OPEN` and `CLICK` tracking are disabled by default; the application does not
  add tracking pixels or rewrite links merely for analytics.
- SES publishes events to a same-region encrypted SNS topic. The topic uses SNS
  `SignatureVersion=2`.
- SNS delivers to a dedicated HTTPS application endpoint. The receiver verifies
  the signature, certificate source/chain, exact topic ARN, message type, and
  idempotency key before processing.
- An encrypted same-region SQS queue is the SNS subscription DLQ with 14-day
  retention. Provider events are persisted durably before business processing;
  raw payloads and recipient addresses are not written to application logs.

### Deferred AWS features

- Shared SES IPs are used initially. Dedicated IPs require proven sustained
  volume and a deliberate warm-up plan.
- Virtual Deliverability Manager remains disabled. Configuration-set events,
  tenant metrics, and suppression provide the initial evidence without paid
  engagement tracking or optimized-delivery delay.
- SES Global Endpoints remain disabled. A second region is justified only by a
  measured availability/SLA requirement because identities, configuration sets,
  feedback resources, tenants, and quotas must remain aligned across regions.

### Decisions still open

- Canonical ikas trigger for physical, digital, pickup, no-shipment, cancelled,
  refunded, returned, and partially fulfilled orders.
- Whether and how `notificationsAccepted` applies to transactional versus
  promotional review-request content.
- Webhook wake-up versus canonical `listOrder` re-read and reconciliation
  cadence/rate limits.
- Install/uninstall retention and deletion behavior for customer/order data and
  SES tenants.
- Exact Prisma models, columns, constraints, retention windows, token lifetime,
  merchant controls, template model, display name, Reply-To policy, and rollout
  sequence.

## Reasoning

Separating application ownership from delivery and dispatch prevents order
semantics, provider credentials, and at-least-once scheduling from becoming one
coupled workflow. A review-specific authenticated subdomain limits reputation
blast radius. Vercel OIDC removes static AWS credentials. Provider-neutral
tenant ownership preserves a future provider migration path while SES tenants
isolate merchant reputation and suppression.

Deferring the exact schema is intentional: ikas trigger, consent, and retention
answers determine which evidence must be stored and when it must be invalidated.

## Alternatives Considered

- `noreply@renuvex.app` was rejected as the default sender. It is shorter but
  shares root-domain reputation and communicates less purpose than the selected
  review-specific sender.
- A single account-wide sending stream without SES tenants is cheaper and
  simpler, but its reputation and suppression blast radius crosses merchants.
- Per-merchant custom domains provide stronger merchant branding but require
  merchant DNS onboarding and are deferred as an optional future capability.
- Static AWS access keys in Vercel were rejected in favor of short-lived OIDC
  credentials.
- VDM, dedicated IPs, and Global Endpoints were rejected for the MVP because
  current traffic and SLA evidence do not justify their cost and operational
  surface.
- Direct sending inside an ikas webhook was rejected because it cannot safely
  provide delay, retry, cancellation re-check, idempotency, or durable evidence.

## Consequences

- No source, schema, environment, DNS, AWS, QStash, or deployment behavior
  changes from this ADR checkpoint.
- Future code must preserve the provider/dispatcher boundaries and keep PII out
  of QStash payloads.
- AWS setup needs SES identity/configuration-set/feedback IaC, a separate OIDC
  runtime role, DNS records, sandbox removal, and live mailbox-simulator tests;
  each remains a separately approved mutation package.
- The next ADR section must define the external ikas contract and exact additive
  schema while separating verified platform facts from product/legal decisions.
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
- `infra/aws/review-images-runtime-iam.cloudformation.json`
- `src/lib/media/providers/aws-review-image.ts`
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
- [Amazon SES tenant management](https://docs.aws.amazon.com/ses/latest/dg/tenants.html)
- [Amazon SES tenant suppression](https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list-tenant-level.html)
- [Amazon SES sender reputation practices](https://docs.aws.amazon.com/ses/latest/dg/tips-and-best-practices.html)
- [Amazon SNS signature verification](https://docs.aws.amazon.com/sns/latest/dg/sns-verify-signature-of-message.html)
- [Amazon SNS dead-letter queues](https://docs.aws.amazon.com/sns/latest/dg/sns-dead-letter-queues.html)
- [Vercel OIDC for AWS](https://vercel.com/docs/oidc/aws)
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

## Change Log

- 2026-07-09: Accepted the first infrastructure contract: SES in
  `eu-central-1`, `requests@reviews.renuvex.app`, custom MAIL FROM, Vercel OIDC,
  provider-neutral application boundaries, tenant-aware ownership, QStash
  opaque-job dispatch, signed SNS feedback with SQS DLQ, and explicit VDM/global
  endpoint deferral. ikas semantics and the exact additive schema remain open.
