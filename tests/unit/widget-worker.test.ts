import { describe, expect, it } from 'vitest';
import worker, { __workerTest } from '../../workers/widget-delivery/src/index';

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: init?.status || 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(init?.headers || {}),
    },
  });
}

function createMockCache() {
  const store = new Map<string, Response>();
  return {
    store,
    cache: {
      async match(request: Request) {
        const cached = store.get(request.url);
        return cached ? cached.clone() : undefined;
      },
      async put(request: Request, response: Response) {
        store.set(request.url, response.clone());
      },
    },
  };
}

function assetEnv(body = 'ok') {
  const seen: string[] = [];
  return {
    env: {
      ASSETS: {
        async fetch(request: Request) {
          seen.push(request.url);
          return new Response(body, {
            status: 200,
            headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
          });
        },
      },
      BACKEND_API_ORIGIN: 'https://app.renuvex.app' as const,
    },
    seen,
  };
}

function assetEnvWithStatus(status: number) {
  const seen: string[] = [];
  return {
    env: {
      ASSETS: {
        async fetch(request: Request) {
          seen.push(request.url);
          return new Response(status === 304 ? null : 'ok', {
            status,
            headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
          });
        },
      },
      BACKEND_API_ORIGIN: 'https://app.renuvex.app' as const,
    },
    seen,
  };
}

function readProxyEnv(responseFactory?: (request: Request) => Response | Promise<Response>) {
  const { env } = assetEnv();
  const { cache, store } = createMockCache();
  const seen: string[] = [];
  return {
    env: {
      ...env,
      __TEST_CACHE: cache,
      __TEST_FETCH: async (request: Request) => {
        seen.push(request.url);
        return responseFactory ? responseFactory(request) : jsonResponse({ ok: true, url: request.url });
      },
    },
    seen,
    store,
  };
}

describe('widget Worker delivery contract', () => {
  it('serves only approved widget assets with pinned cache and CORS headers', async () => {
    const { env, seen } = assetEnv('console.log("widget")');
    const response = await worker.fetch(new Request('https://widget.renuvex.app/widget-runtime/chunks/chunk-ABC123.js'), env);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('console.log("widget")');
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(seen).toEqual(['https://widget.renuvex.app/widget-runtime/chunks/chunk-ABC123.js']);
  });

  it('keeps stable entrypoints revalidated and fails closed for write API paths', async () => {
    const { env } = assetEnv();
    const stable = await worker.fetch(new Request('https://widget.renuvex.app/widget.js'), env);
    const api = await worker.fetch(new Request('https://widget.renuvex.app/api/public/upload/video/capability?storeId=s1'), env);

    expect(stable.headers.get('Cache-Control')).toBe('public, max-age=0, must-revalidate');
    expect(api.status).toBe(404);
    expect(await api.json()).toEqual({ error: 'not_found' });
    expect(api.headers.get('Cache-Control')).toBe('no-store');
  });

  it('preserves asset cache policy on conditional 304 responses', async () => {
    const { env } = assetEnvWithStatus(304);
    const stable = await worker.fetch(new Request('https://widget.renuvex.app/widget.js'), env);
    const immutable = await worker.fetch(new Request('https://widget.renuvex.app/widget-runtime/chunks/chunk-ABC123.js'), env);

    expect(stable.status).toBe(304);
    expect(stable.headers.get('Cache-Control')).toBe('public, max-age=0, must-revalidate');
    expect(immutable.status).toBe(304);
    expect(immutable.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
  });

  it('pins the path classifier to the supported widget surface', () => {
    expect(__workerTest.getAssetCacheControl('/widget-runtime/runtime-ABC123.js')).toBe('public, max-age=31536000, immutable');
    expect(__workerTest.getAssetCacheControl('/widget-runtime/chunks/render-ABC123.js')).toBe('public, max-age=31536000, immutable');
    expect(__workerTest.getAssetCacheControl('/widget-runtime/build-manifest.json')).toBe('public, max-age=0, must-revalidate');
    expect(__workerTest.getAssetCacheControl('/api/public/reviews')).toBeNull();
  });

  it('normalizes tenant-safe cache keys for approved public read routes', () => {
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=b,a,a'))?.toString())
      .toBe('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=a%2Cb');
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/settings?publicApiKey=s1'))?.toString())
      .toBe('https://widget.renuvex.app/api/public/settings?publicApiKey=s1');
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/settings?publicApiKey=s1&debug=1')))
      .toBeNull();
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/ratings-by-slug?storeId=s1&slugs=z,a'))?.toString())
      .toBe('https://widget.renuvex.app/api/public/ratings-by-slug?storeId=s1&slugs=a%2Cz');
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/reviews?storeId=s1&productId=p1&hasMedia=true'))?.toString())
      .toBe('https://widget.renuvex.app/api/public/reviews?storeId=s1&productId=p1&page=1&limit=10&orderBy=newest&hasMedia=true');
    expect(__workerTest.normalizedReadCacheUrl(new URL('https://widget.renuvex.app/api/public/reviews?storeId=s1&productId=p1&unknown=1'))).toBeNull();
  });

  it('proxies and caches only approved GET JSON public reads', async () => {
    const { env, seen, store } = readProxyEnv();
    const request = new Request('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=b,a,a');

    const first = await worker.fetch(request, env);
    const second = await worker.fetch(request, env);

    expect(first.status).toBe(200);
    expect(first.headers.get('X-Renuvex-Edge-Cache')).toBe('MISS');
    expect(first.headers.get('Cache-Control')).toBe('public, max-age=0, must-revalidate');
    expect(second.headers.get('X-Renuvex-Edge-Cache')).toBe('HIT');
    expect(seen).toEqual(['https://app.renuvex.app/api/public/ratings?storeId=s1&productIds=a%2Cb']);
    expect(Array.from(store.keys())).toEqual(['https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=a%2Cb']);
  });

  it('proxies and caches public settings reads by publicApiKey only', async () => {
    const { env, seen, store } = readProxyEnv((request) => jsonResponse({ widgets: {}, runtime: { requestUrl: request.url } }));
    const request = new Request('https://widget.renuvex.app/api/public/settings?publicApiKey=s1');

    const first = await worker.fetch(request, env);
    const second = await worker.fetch(request, env);
    const firstBody = await first.json();

    expect(first.status).toBe(200);
    expect(first.headers.get('X-Renuvex-Edge-Cache')).toBe('MISS');
    expect(second.headers.get('X-Renuvex-Edge-Cache')).toBe('HIT');
    expect(firstBody.runtime.requestUrl).toBe('https://app.renuvex.app/api/public/settings?publicApiKey=s1');
    expect(seen).toEqual(['https://app.renuvex.app/api/public/settings?publicApiKey=s1']);
    expect(Array.from(store.keys())).toEqual(['https://widget.renuvex.app/api/public/settings?publicApiKey=s1']);
  });

  it('bypasses cache for unknown query params while still reaching the backend origin', async () => {
    const { env, seen, store } = readProxyEnv();
    const response = await worker.fetch(
      new Request('https://widget.renuvex.app/api/public/reviews?storeId=s1&productId=p1&debug=1'),
      env,
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('X-Renuvex-Edge-Cache')).toBe('BYPASS');
    expect(seen).toEqual(['https://app.renuvex.app/api/public/reviews?storeId=s1&productId=p1&debug=1']);
    expect(store.size).toBe(0);
  });

  it('does not cache non-200 or Set-Cookie public read responses', async () => {
    const non200 = readProxyEnv(() => jsonResponse({ error: 'rate_limited' }, { status: 429 }));
    const first = await worker.fetch(new Request('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=p1'), non200.env);
    const second = await worker.fetch(new Request('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=p1'), non200.env);
    expect(first.headers.get('X-Renuvex-Edge-Cache')).toBe('BYPASS');
    expect(second.headers.get('X-Renuvex-Edge-Cache')).toBe('BYPASS');
    expect(non200.seen).toHaveLength(2);

    const withCookie = readProxyEnv(() => jsonResponse({ ok: true }, { headers: { 'Set-Cookie': 'sid=1' } }));
    const cookieResponse = await worker.fetch(new Request('https://widget.renuvex.app/api/public/ratings?storeId=s1&productIds=p1'), withCookie.env);
    expect(cookieResponse.headers.get('X-Renuvex-Edge-Cache')).toBe('BYPASS');
    expect(cookieResponse.headers.get('Set-Cookie')).toBeNull();
    expect(withCookie.store.size).toBe(0);
  });

  it('keeps lazy sync and write paths outside the Worker V2 read proxy', async () => {
    const { env } = readProxyEnv();
    const lazySync = await worker.fetch(new Request('https://widget.renuvex.app/api/public/storefront-theme/lazy-sync', { method: 'POST' }), env);
    const upload = await worker.fetch(new Request('https://widget.renuvex.app/api/public/upload/video/capability?storeId=s1'), env);
    const post = await worker.fetch(new Request('https://widget.renuvex.app/api/public/ratings', { method: 'POST' }), env);

    expect(lazySync.status).toBe(405);
    expect(upload.status).toBe(404);
    expect(post.status).toBe(405);
  });
});
