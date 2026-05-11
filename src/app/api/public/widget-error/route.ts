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
  const key = `ikr_werr_rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count <= RATE_LIMIT_MAX;
}

function clip(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.length > max ? value.slice(0, max) : value;
}

export async function OPTIONS() {
  return corsOptions();
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (!(await checkRateLimit(ip))) {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }));
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }));
    }

    const b = body as Record<string, unknown>;
    const message = clip(b.message, 500);
    if (!message) {
      return withCors(NextResponse.json({ ok: true }, { status: 200 }));
    }

    const stack = clip(b.stack, 4000);
    const url = clip(b.url, 2000);
    const userAgent = clip(b.userAgent, 500);
    const publicApiKey = clip(b.publicApiKey, 100);
    const extra =
      b.extra && typeof b.extra === 'object' && !Array.isArray(b.extra)
        ? (b.extra as Record<string, unknown>)
        : undefined;

    const err = new Error(message);
    if (stack) err.stack = stack;

    Sentry.captureException(err, {
      tags: {
        source: 'widget',
        widgetEventType: typeof extra?.type === 'string' ? (extra.type as string) : 'unknown',
      },
      extra: {
        url,
        userAgent,
        publicApiKey,
        filename: extra?.filename,
        lineno: extra?.lineno,
        colno: extra?.colno,
        ip,
      },
    });

    return withCors(NextResponse.json({ ok: true }, { status: 200 }));
  } catch {
    return withCors(NextResponse.json({ ok: false }, { status: 200 }));
  }
}
