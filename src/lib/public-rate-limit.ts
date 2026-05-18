import { Redis } from '@upstash/redis';

let redis: Redis | null | undefined;
let warnedMissingRedisEnv = false;
let warnedRedisError = false;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    if (!warnedMissingRedisEnv) {
      console.warn('[rate-limit] KV_REST_API_URL or KV_REST_API_TOKEN is missing; public read limits are disabled.');
      warnedMissingRedisEnv = true;
    }
    redis = null;
    return redis;
  }

  redis = new Redis({ url, token });
  return redis;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const cfIp = request.headers.get('cf-connecting-ip')?.trim();
  return forwardedFor || realIp || cfIp || 'unknown';
}

export async function checkFixedWindowRateLimit(params: {
  key: string;
  max: number;
  windowSec: number;
  label: string;
}): Promise<{ allowed: boolean; retryAfterSec: number }> {
  const client = getRedis();
  if (!client) return { allowed: true, retryAfterSec: params.windowSec };

  try {
    const count = Number(await client.incr(params.key));
    if (count === 1) await client.expire(params.key, params.windowSec);
    return { allowed: count <= params.max, retryAfterSec: params.windowSec };
  } catch (error) {
    if (!warnedRedisError) {
      console.warn(`[rate-limit] ${params.label} check failed; allowing request.`, error);
      warnedRedisError = true;
    }
    return { allowed: true, retryAfterSec: params.windowSec };
  }
}
