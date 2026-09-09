import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import * as Sentry from '@sentry/nextjs';
import { widgetBeaconCorsOptions, withWidgetBeaconCors } from '@/lib/cors';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_SEC = 60;
const PLACEMENT_IDENTITY_EVENT_TYPES = new Set([
  'placement-attestation-miss',
  'identity-resolution-miss',
  'identity-resolution-error',
  'identity-conflict',
]);
const PLACEMENT_IDENTITY_SURFACES = new Set(['listing', 'pdp', 'quick_view', 'unknown']);
const PLACEMENT_IDENTITY_ADAPTERS = new Set(['ozy', 'unknown']);
const PLACEMENT_IDENTITY_REASONS = new Set([
  'duplicate_slug_product_ids',
  'malformed_event_product_id',
  'identity_conflict',
  'stale_after_resolution',
  'malformed_product_id',
  'http_429',
  'http_5xx',
  'http_error',
  'malformed_response',
  'network_error',
  'unexpected_response_key',
  'not_resolved',
  'missing_product_id',
  'malformed_rating',
  'unknown',
]);

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `renuvex_pr_werr_rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count <= RATE_LIMIT_MAX;
}

function clip(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.length > max ? value.slice(0, max) : value;
}

function sanitizeExtra(extra: Record<string, unknown> | undefined) {
  if (!extra) return undefined;
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(extra)) {
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(key)) continue;
    if (typeof value === 'string') safe[key] = clip(value, 500);
    else if (typeof value === 'number' || typeof value === 'boolean') safe[key] = value;
  }
  return safe;
}

function allowlistedTag(value: unknown, allowed: ReadonlySet<string>): string {
  if (typeof value !== 'string') return 'unknown';
  const normalized = value.trim();
  return allowed.has(normalized) ? normalized : 'unknown';
}

function runtimeVersionTag(value: unknown): string {
  if (typeof value !== 'string') return 'unknown';
  const normalized = value.trim();
  if (normalized === 'dev') return normalized;
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(normalized)
    ? normalized
    : 'unknown';
}

function placementIdentityTags(extra: Record<string, unknown> | undefined) {
  const type = allowlistedTag(extra?.type, PLACEMENT_IDENTITY_EVENT_TYPES);
  if (!PLACEMENT_IDENTITY_EVENT_TYPES.has(type)) return null;
  return {
    type,
    surface: allowlistedTag(extra?.surface, PLACEMENT_IDENTITY_SURFACES),
    adapterKey: allowlistedTag(extra?.adapterKey, PLACEMENT_IDENTITY_ADAPTERS),
    reason: allowlistedTag(extra?.reason, PLACEMENT_IDENTITY_REASONS),
    version: runtimeVersionTag(extra?.version),
  };
}

export async function OPTIONS(req: Request) {
  return widgetBeaconCorsOptions(req);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!(await checkRateLimit(ip))) {
      return withWidgetBeaconCors(NextResponse.json({ ok: true }, { status: 200 }), req);
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return withWidgetBeaconCors(NextResponse.json({ ok: true }, { status: 200 }), req);
    }

    const b = body as Record<string, unknown>;
    const message = clip(b.message, 500);
    if (!message) {
      return withWidgetBeaconCors(NextResponse.json({ ok: true }, { status: 200 }), req);
    }

    const stack = clip(b.stack, 4000);
    const url = clip(b.url, 2000);
    const userAgent = clip(b.userAgent, 500);
    const publicApiKey = clip(b.publicApiKey, 100);
    const extra =
      b.extra && typeof b.extra === 'object' && !Array.isArray(b.extra)
        ? (b.extra as Record<string, unknown>)
        : undefined;
    const safeExtra = sanitizeExtra(extra);
    const healthTags = placementIdentityTags(safeExtra);

    const err = new Error(healthTags ? `Widget placement identity event: ${healthTags.type}` : message);
    if (stack && !healthTags) err.stack = stack;

    if (healthTags) {
      Sentry.captureException(err, {
        tags: {
          source: 'widget',
          widgetEventType: healthTags.type,
          widgetSurface: healthTags.surface,
          widgetAdapter: healthTags.adapterKey,
          widgetReason: healthTags.reason,
          widgetRuntimeVersion: healthTags.version,
        },
        fingerprint: [
          'widget-placement-identity',
          healthTags.type,
          healthTags.surface,
          healthTags.adapterKey,
          healthTags.reason,
        ],
        extra: {
          widgetHealth: healthTags,
        },
      });
    } else {
      Sentry.captureException(err, {
        tags: {
          source: 'widget',
          widgetEventType: typeof safeExtra?.type === 'string' ? (safeExtra.type as string) : 'unknown',
        },
        extra: {
          url,
          userAgent,
          publicApiKey,
          filename: safeExtra?.filename,
          lineno: safeExtra?.lineno,
          colno: safeExtra?.colno,
          widgetHealth: safeExtra,
          ip,
        },
      });
    }

    return withWidgetBeaconCors(NextResponse.json({ ok: true }, { status: 200 }), req);
  } catch {
    return withWidgetBeaconCors(NextResponse.json({ ok: false }, { status: 200 }), req);
  }
}
