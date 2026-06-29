---
type: research
project: renuvex-product-reviews
status: active
created: 2026-06-30
updated: 2026-06-30
last_verified: 2026-06-30
confidence: high
tags:
  - upstash
  - redis
  - qstash
  - storefront
  - cost
related:
  - "[[Storefront_CDN_Cost_Model]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[Async_Media_Pipeline]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "src/lib/public-rate-limit.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/upload/video/capability/route.ts"
  - "src/app/api/public/upload/video/initiate/route.ts"
  - "src/app/api/public/upload/video/metrics/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/jobs.ts"
  - "workers/widget-delivery/src/index.ts"
  - "prisma/schema.prisma"
---

# Upstash Redis and QStash Cost Audit

This page records the June 30, 2026 audit of Upstash Redis and QStash cost
exposure for the storefront widget scenarios used in [[Storefront_CDN_Cost_Model]].
It separates current observed usage, source-code billing triggers, and
high-traffic scenario bounds.

No Upstash, Vercel, Cloudflare, database, or DNS mutation was performed for this
audit.

## Official Pricing Inputs

Official Upstash sources checked on June 30, 2026:

- Upstash Redis pricing: `https://upstash.com/pricing/redis`
- Upstash QStash pricing: `https://upstash.com/pricing/qstash`

Redis public pricing values used:

| Item | Official public value |
|---|---:|
| Free plan included commands | `500K commands/month` |
| Pay as You Go commands | `$0.20 / 100K commands` |
| Pay as You Go max data | `100 GB` |
| Pay as You Go bandwidth | first `200 GB/month` free, then `$0.03/GB` |
| Pay as You Go storage | first `1 GB` free, then `$0.25/GB` |

Important Redis billing detail: the current project Redis database is Pay as You
Go. The Redis pricing FAQ says the free plan allowance is not also applied after
upgrading a database. Therefore this model prices Pay as You Go commands from
the first command.

QStash public pricing values used:

| Item | Official public value |
|---|---:|
| Free plan max messages | `1,000 messages/day` |
| Pay as You Go messages | `$1 / 100K messages` |
| Fixed 1M | `$180/month`, `1M messages/day` |
| Fixed 10M | `$420/month`, `10M messages/day` |
| Retry billing | every delivery attempt counts as one message |

## Current Upstash Evidence

Upstash MCP reported one Redis database for this project:

| Property | Evidence |
|---|---|
| Database name | `renuvex-product-reviews` |
| Plan/type | Pay as You Go |
| Primary region | `eu-central-1` |
| Read replicas | none observed |
| 7-day command usage | `0` in MCP `usage_last_5_days` |
| 7-day bandwidth usage | `0` in MCP `usage_last_5_days` |
| 7-day sampled throughput/keyspace/diskusage | `NO DATA` |

Current interpretation: Redis is configured, but current measured usage is
effectively zero in the Upstash MCP statistics window. That matches the current
Cloudflare Worker V2 architecture: selected public read endpoints can be served
from Worker edge cache, and test traffic is not yet representative of public
production write/upload volume.

QStash evidence:

| Source | Evidence |
|---|---|
| Upstash MCP recent logs | recent visible logs were delivered |
| Upstash MCP DLQ | `0` messages |
| Upstash MCP schedules | `0` schedules |
| QStash REST logs, body omitted | `439` unique messages, `450` observed delivery attempts, `11` retry/error events, retention window from `2026-06-14T17:10:48.701Z` to `2026-06-28T20:50:51.598Z` |
| DB `MediaProviderJob` rows | `307` rows in the last 30 days |
| DB job states | `211 succeeded`, `96 superseded`, `0 pending`, `0 failed`, `0 dead` |
| DB processing attempts | `240` job processing attempts; max observed attempts on one job: `5` |

Current interpretation: QStash is healthy and not cost-significant at current
test volume. On Pay as You Go, `450` delivery attempts would be about `$0.0045`
before any free-tier/day-plan consideration.

## Source-Code Cost Triggers

### Redis

Redis is used as a rate-limit counter, not as a general application cache.

The shared helper in `src/lib/public-rate-limit.ts` uses:

1. `INCR key`
2. `EXPIRE key window` only when the counter is first created.

Therefore a rate-limited origin request costs:

- `1` Redis command for an existing fixed-window key.
- `2` Redis commands for the first request in a new IP/window/key bucket.

Direct route implementations use the same `INCR` + first-hit `EXPIRE` pattern.

Redis-backed endpoints:

| Endpoint / route | Redis purpose | Request class |
|---|---|---|
| `GET /api/public/ratings` | public read rate limit | selected Worker V2 read cache path |
| `GET /api/public/ratings-by-slug` | public read rate limit | selected Worker V2 read cache path |
| `POST /api/public/reviews` | review submit rate limit | backend/write |
| `POST /api/public/upload/sign` | Cloudinary image upload signing rate limit | backend/write |
| `POST /api/public/upload/register` | pending image registry rate limit | backend/write |
| `GET /api/public/upload/video/capability` | video capability probe rate limit | backend/read-write capability |
| `POST /api/public/upload/video/initiate` | Mux direct-upload start rate limit | backend/write |
| `POST /api/public/upload/video/metrics` | video performance metric report rate limit | backend/write/observability |
| `POST /api/public/widget-error` | widget error forwarder rate limit | backend/observability |

`GET /api/public/reviews` is served through the Cloudflare Worker V2 read proxy,
but the source route itself does not currently call Redis for GET reviews.

### QStash

QStash is used only for durable media-provider jobs. It is not in the normal
static widget render path.

`src/lib/media/dispatcher.ts` publishes QStash messages with:

- JSON body `{ jobId }`
- `retries: 5`
- `timeout: 30s`
- optional delay

Because QStash bills delivery attempts, every publish costs at least one message,
and failed HTTP attempts can add billed retry attempts.

QStash dispatch sources include:

- video upload session expiry,
- video asset resolve and reconciliation,
- Mux webhook-derived media jobs,
- approve/reject/delete video moderation jobs,
- abandoned upload cleanup,
- pending Cloudinary image cleanup jobs,
- stale/due media job redispatch from maintenance/reconciliation paths.

Future storefront widgets that only read ratings/reviews do not use QStash.
Future widgets that create uploads, moderation work, provider cleanup, or other
async provider tasks can add QStash messages.

## High-Traffic Redis Bound

This table reuses the storefront CDN traffic scenario:

- `100,000` storefront widget pageviews per store per month.
- Store counts: `100`, `200`, `300`, `400`, `500`, `1000`, `2000`.
- Current read-widget shape: `3` selected read API requests per pageview
  (`ratings:1`, `reviews:2`) in the benchmark harness.

This is a **worst-case origin-miss bound**, not the expected Cloudflare V2 bill.
It assumes every selected read request misses the Worker edge cache and reaches
the backend rate limiter.

| Stores | Pageviews/mo | Origin read requests/mo if every request misses edge cache | Redis commands @1/request | Redis cost @1/request | Redis commands @2/request | Redis cost @2/request |
|---:|---:|---:|---:|---:|---:|---:|
| 100 | 10,000,000 | 30,000,000 | 30,000,000 | `$60.00` | 60,000,000 | `$120.00` |
| 200 | 20,000,000 | 60,000,000 | 60,000,000 | `$120.00` | 120,000,000 | `$240.00` |
| 300 | 30,000,000 | 90,000,000 | 90,000,000 | `$180.00` | 180,000,000 | `$360.00` |
| 400 | 40,000,000 | 120,000,000 | 120,000,000 | `$240.00` | 240,000,000 | `$480.00` |
| 500 | 50,000,000 | 150,000,000 | 150,000,000 | `$300.00` | 300,000,000 | `$600.00` |
| 1,000 | 100,000,000 | 300,000,000 | 300,000,000 | `$600.00` | 600,000,000 | `$1,200.00` |
| 2,000 | 200,000,000 | 600,000,000 | 600,000,000 | `$1,200.00` | 1,200,000,000 | `$2,400.00` |

Interpretation:

- Redis is not the primary cost driver compared with CDN/request delivery.
- Redis can still become visible at very large scale if read requests bypass
  Cloudflare Worker cache.
- The correct control is not removing Redis. The correct control is keeping
  high-volume public reads cacheable at the edge and keeping Redis on abuse
  sensitive origin paths.

## QStash Volume Table

QStash cost depends on media job delivery attempts, not storefront pageviews.
This table shows generic monthly delivery-attempt volume.

| Monthly delivery attempts | Even daily average | Pay as You Go cost from first message | Cost after Free `1,000/day` if eligible and evenly spread |
|---:|---:|---:|---:|
| 10,000 | 333 | `$0.10` | `$0.00` |
| 100,000 | 3,333 | `$1.00` | `$0.70` |
| 1,000,000 | 33,333 | `$10.00` | `$9.70` |
| 10,000,000 | 333,333 | `$100.00` | `$99.70` |
| 100,000,000 | 3,333,333 | `$1,000.00` | `$999.70` |

Pay as You Go is cheaper than Fixed 1M until sustained volume is high enough to
justify the `$180/month` fixed plan. Fixed plan names refer to daily message
limits, not monthly message totals.

## Video Job Examples

The exact QStash messages per video depend on lifecycle events: upload expiry,
complete/resolve, webhook/reconcile, publish/protect/cleanup, deferrals, retries,
and user moderation actions. The source deliberately uses idempotent DB outbox
rows, so duplicate webhook/provider events should not create unbounded work.

The table below is a formula example, not a product quota assumption.

| Delivery attempts per submitted video | 10k videos/mo | 100k videos/mo | 1M videos/mo |
|---:|---:|---:|---:|
| 3 | `$0.30` | `$3.00` | `$30.00` |
| 5 | `$0.50` | `$5.00` | `$50.00` |
| 8 | `$0.80` | `$8.00` | `$80.00` |
| 12 | `$1.20` | `$12.00` | `$120.00` |

Interpretation: QStash is not expected to dominate cost for review-video
workflows. Video delivery/playback cost remains mainly a Mux/business-plan
question, not a QStash question.

## Current Recommendation

Keep both Upstash products in the architecture:

- Keep Redis for abuse/rate-limit counters. It is cheap at current usage, and it
  protects public submit/upload/error endpoints.
- Do not use Redis as a read-through cache yet. Cloudflare Worker V2 already
  caches selected public read endpoints at the edge; adding Redis cache now
  would add invalidation complexity before evidence says it is needed.
- Keep QStash for media-provider outbox dispatch. It gives delayed delivery,
  retries, signature verification, and manual repair visibility for Mux and
  Cloudinary cleanup paths.
- Do not move static/read storefront rendering through QStash. QStash is for
  async jobs, not page render paths.

## Watch Items

1. Track actual Worker read cache HIT/MISS over production traffic. Redis cost
   only grows with origin requests that actually reach Vercel.
2. Track monthly Redis command count and bandwidth from Upstash billing after
   real production traffic starts.
3. Track QStash delivery attempts and retry/error count monthly. Retried
   deliveries are billable and can reveal a backend receiver problem.
4. If QStash approaches tens of millions of monthly delivery attempts, compare
   Pay as You Go against Fixed 1M/10M plans using actual daily peaks.
5. Future widgets should state whether they are read-only, write/upload, or
   async-provider-job features. Only the latter two materially affect Redis or
   QStash.

## Decision

Redis and QStash are not the reason for the current storefront first-load
performance concerns, and they are not currently significant cost drivers.
The current split remains correct:

- Cloudflare Worker: static assets and selected public read cache.
- Vercel backend: write/upload/admin/OAuth/settings side effects.
- Redis: origin abuse/rate-limit counters.
- QStash: durable async media-provider work.

## Obsidian Links

- [[Storefront_CDN_Cost_Model]]
- [[Storefront_CDN_Performance_Benchmark]]
- [[Security_And_Rate_Limits]]
- [[Async_Media_Pipeline]]
- [[ADR_0032_Review_Video_On_Mux]]
