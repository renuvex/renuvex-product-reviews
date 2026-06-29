const STABLE_CACHE_CONTROL = 'public, max-age=0, must-revalidate';
const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const NO_STORE_CACHE_CONTROL = 'no-store';
const EDGE_CACHE_CONTROL = 'public, max-age=60';
const EDGE_CACHE_HEADER = 'X-Renuvex-Edge-Cache';
const DEFAULT_BACKEND_API_ORIGIN = 'https://app.renuvex.app';
const MAX_CACHEABLE_URL_LENGTH = 4096;

type EdgeCacheStatus = 'HIT' | 'MISS' | 'BYPASS';
type CacheLike = Pick<Cache, 'match' | 'put'>;
type FetchLike = (input: Request) => Promise<Response>;
type ExecutionContextLike = {
  waitUntil(promise: Promise<unknown>): void;
};
type WidgetEnv = Env & {
  BACKEND_API_ORIGIN?: string;
  __TEST_CACHE?: CacheLike | null;
  __TEST_FETCH?: FetchLike;
};

function withCors(headers: Headers): Headers {
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');
  return headers;
}

function jsonResponse(status: number, body: Record<string, unknown>, cacheControl = NO_STORE_CACHE_CONTROL): Response {
  const headers = withCors(new Headers({
    'Cache-Control': cacheControl,
    'Content-Type': 'application/json; charset=utf-8',
  }));
  return new Response(JSON.stringify(body), { status, headers });
}

function emptyResponse(status: number, cacheControl = NO_STORE_CACHE_CONTROL): Response {
  return new Response(null, {
    status,
    headers: withCors(new Headers({ 'Cache-Control': cacheControl })),
  });
}

function isImmutableWidgetAsset(pathname: string): boolean {
  return /^\/widget-runtime\/runtime-[0-9A-Za-z]+\.js$/.test(pathname) ||
    /^\/widget-runtime\/chunks\/[^/]+\.js$/.test(pathname);
}

function isStableWidgetAsset(pathname: string): boolean {
  return pathname === '/widget.js' ||
    pathname === '/widget-runtime/runtime.js' ||
    pathname === '/widget-runtime/build-manifest.json';
}

function getAssetCacheControl(pathname: string): string | null {
  if (isStableWidgetAsset(pathname)) return STABLE_CACHE_CONTROL;
  if (isImmutableWidgetAsset(pathname)) return IMMUTABLE_CACHE_CONTROL;
  return null;
}

function uniqueSortedCsvValues(value: string | null): string[] | null {
  if (!value) return null;
  const seen = new Set<string>();
  value.split(',').forEach((part) => {
    const trimmed = part.trim();
    if (trimmed) seen.add(trimmed);
  });
  return seen.size > 0 ? Array.from(seen).sort() : null;
}

function appendIfPresent(target: URLSearchParams, source: URLSearchParams, key: string): void {
  const value = source.get(key);
  if (value !== null && value !== '') target.set(key, value);
}

function normalizePositiveInteger(value: string | null, fallback: number): string {
  if (!value) return String(fallback);
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return String(fallback);
  return String(parsed);
}

function normalizeBooleanParam(value: string | null): string | null {
  if (value === 'true') return 'true';
  if (value === 'false') return 'false';
  return null;
}

function hasOnlyKnownParams(params: URLSearchParams, known: Set<string>): boolean {
  for (const key of params.keys()) {
    if (!known.has(key)) return false;
  }
  return true;
}

function normalizedReadCacheUrl(url: URL): URL | null {
  if (url.href.length > MAX_CACHEABLE_URL_LENGTH) return null;

  const params = url.searchParams;
  const normalized = new URL(url.origin + url.pathname);

  if (url.pathname === '/api/public/ratings') {
    if (!hasOnlyKnownParams(params, new Set(['storeId', 'productIds']))) return null;
    appendIfPresent(normalized.searchParams, params, 'storeId');
    const productIds = uniqueSortedCsvValues(params.get('productIds'));
    if (!normalized.searchParams.get('storeId') || !productIds) return null;
    normalized.searchParams.set('productIds', productIds.join(','));
    return normalized;
  }

  if (url.pathname === '/api/public/ratings-by-slug') {
    if (!hasOnlyKnownParams(params, new Set(['storeId', 'slugs']))) return null;
    appendIfPresent(normalized.searchParams, params, 'storeId');
    const slugs = uniqueSortedCsvValues(params.get('slugs'));
    if (!normalized.searchParams.get('storeId') || !slugs) return null;
    normalized.searchParams.set('slugs', slugs.join(','));
    return normalized;
  }

  if (url.pathname === '/api/public/reviews') {
    if (!hasOnlyKnownParams(params, new Set(['storeId', 'productId', 'page', 'limit', 'orderBy', 'rating', 'hasImages', 'hasMedia', 'cursor']))) {
      return null;
    }

    appendIfPresent(normalized.searchParams, params, 'storeId');
    appendIfPresent(normalized.searchParams, params, 'productId');
    if (!normalized.searchParams.get('storeId') || !normalized.searchParams.get('productId')) return null;

    normalized.searchParams.set('page', normalizePositiveInteger(params.get('page'), 1));
    normalized.searchParams.set('limit', normalizePositiveInteger(params.get('limit'), 10));
    normalized.searchParams.set('orderBy', params.get('orderBy') || 'newest');
    appendIfPresent(normalized.searchParams, params, 'rating');

    const hasImages = normalizeBooleanParam(params.get('hasImages'));
    const hasMedia = normalizeBooleanParam(params.get('hasMedia'));
    if (hasImages !== null) normalized.searchParams.set('hasImages', hasImages);
    if (hasMedia !== null) normalized.searchParams.set('hasMedia', hasMedia);
    appendIfPresent(normalized.searchParams, params, 'cursor');
    return normalized;
  }

  return null;
}

function isCacheablePublicReadPath(pathname: string): boolean {
  return pathname === '/api/public/ratings' ||
    pathname === '/api/public/ratings-by-slug' ||
    pathname === '/api/public/reviews';
}

function getBackendApiOrigin(env: WidgetEnv): string {
  const raw = typeof env.BACKEND_API_ORIGIN === 'string' ? env.BACKEND_API_ORIGIN.trim() : '';
  try {
    const parsed = new URL(raw || DEFAULT_BACKEND_API_ORIGIN);
    if (parsed.protocol !== 'https:') return DEFAULT_BACKEND_API_ORIGIN;
    return parsed.origin;
  } catch (_) {
    return DEFAULT_BACKEND_API_ORIGIN;
  }
}

function toBackendUrl(env: WidgetEnv, normalizedOrOriginalUrl: URL): URL {
  const backendUrl = new URL(getBackendApiOrigin(env));
  backendUrl.pathname = normalizedOrOriginalUrl.pathname;
  backendUrl.search = normalizedOrOriginalUrl.search;
  return backendUrl;
}

function getDefaultCache(env: WidgetEnv): CacheLike | null {
  if (env.__TEST_CACHE !== undefined) return env.__TEST_CACHE;
  if (typeof caches === 'undefined') return null;
  return (caches as unknown as { default: CacheLike }).default;
}

function getFetch(env: WidgetEnv): FetchLike {
  return env.__TEST_FETCH || ((input: Request) => fetch(input));
}

function createBackendRequest(request: Request, backendUrl: URL, method = 'GET'): Request {
  const headers = new Headers();
  const accept = request.headers.get('Accept');
  if (accept) headers.set('Accept', accept);
  return new Request(backendUrl.toString(), { method, headers });
}

function isStoreableReadResponse(response: Response): boolean {
  if (response.status !== 200) return false;
  if (response.headers.has('Set-Cookie')) return false;
  const contentType = response.headers.get('Content-Type') || '';
  return contentType.toLowerCase().includes('application/json');
}

function clientReadResponse(response: Response, status: EdgeCacheStatus, method: string): Response {
  const headers = withCors(new Headers(response.headers));
  headers.delete('Set-Cookie');
  headers.set('Cache-Control', STABLE_CACHE_CONTROL);
  headers.set(EDGE_CACHE_HEADER, status);
  return new Response(method === 'HEAD' ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function cachedReadResponse(response: Response): Response {
  const headers = withCors(new Headers(response.headers));
  headers.delete('Set-Cookie');
  headers.set('Cache-Control', EDGE_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function storeInCache(ctx: ExecutionContextLike | undefined, cache: CacheLike, cacheRequest: Request, response: Response): Promise<void> {
  const putPromise = cache.put(cacheRequest, response);
  if (ctx) {
    ctx.waitUntil(putPromise);
    return;
  }
  await putPromise;
}

async function proxyPublicRead(request: Request, env: WidgetEnv, ctx?: ExecutionContextLike): Promise<Response | null> {
  const url = new URL(request.url);
  if (!isCacheablePublicReadPath(url.pathname)) return null;

  if (request.method === 'HEAD') {
    const originResponse = await getFetch(env)(createBackendRequest(request, toBackendUrl(env, url), 'HEAD'));
    return clientReadResponse(originResponse, 'BYPASS', request.method);
  }

  const normalizedUrl = normalizedReadCacheUrl(url);
  const shouldCache = normalizedUrl !== null;
  const originUrl = toBackendUrl(env, normalizedUrl || url);
  const cache = shouldCache ? getDefaultCache(env) : null;

  if (cache && normalizedUrl) {
    const cacheRequest = new Request(normalizedUrl.toString(), { method: 'GET' });
    const cached = await cache.match(cacheRequest);
    if (cached) {
      return clientReadResponse(cached, 'HIT', request.method);
    }

    const originResponse = await getFetch(env)(createBackendRequest(request, originUrl));
    if (isStoreableReadResponse(originResponse)) {
      await storeInCache(ctx, cache, cacheRequest, cachedReadResponse(originResponse.clone()));
      return clientReadResponse(originResponse, 'MISS', request.method);
    }
    return clientReadResponse(originResponse, 'BYPASS', request.method);
  }

  const originResponse = await getFetch(env)(createBackendRequest(request, originUrl));
  return clientReadResponse(originResponse, 'BYPASS', request.method);
}

async function serveAsset(request: Request, env: Env, cacheControl: string): Promise<Response> {
  const response = await env.ASSETS.fetch(request);
  const headers = withCors(new Headers(response.headers));
  const isCacheableAssetResponse = response.status === 200 || response.status === 304;
  headers.set('Cache-Control', isCacheableAssetResponse ? cacheControl : NO_STORE_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env, ctx?: ExecutionContextLike): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return emptyResponse(204);
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return jsonResponse(405, { error: 'method_not_allowed' });
    }

    if (url.pathname === '/__health') {
      return jsonResponse(200, { ok: true, service: 'renuvex-widget-assets' });
    }

    if (url.pathname.startsWith('/api/')) {
      const publicReadResponse = await proxyPublicRead(request, env as WidgetEnv, ctx);
      if (publicReadResponse) return publicReadResponse;
      return jsonResponse(404, { error: 'not_found' });
    }

    const cacheControl = getAssetCacheControl(url.pathname);
    if (!cacheControl) {
      return jsonResponse(404, { error: 'not_found' });
    }

    return serveAsset(request, env, cacheControl);
  },
};

export const __workerTest = {
  getAssetCacheControl,
  isImmutableWidgetAsset,
  isStableWidgetAsset,
  normalizedReadCacheUrl,
};
