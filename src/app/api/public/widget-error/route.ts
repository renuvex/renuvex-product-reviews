import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import * as Sentry from '@sentry/nextjs';
import { withCors, corsOptions } from '@/lib/cors';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_SEC = 60;

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

export async function OPTIONS(req: Request) {
  return corsOptions(req);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!(await checkRateLimit(ip))) {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }), req);
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }), req);
    }

    const b = body as Record<string, unknown>;
    const message = clip(b.message, 500);
    if (!message) {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }), req);
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

    const err = new Error(message);
    if (stack) err.stack = stack;

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

    return withCors(NextResponse.json({ ok: true }, { status: 200 }), req);
  } catch {
    return withCors(NextResponse.json({ ok: false }, { status: 200 }), req);
  }
}
