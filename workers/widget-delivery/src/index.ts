const STABLE_CACHE_CONTROL = 'public, max-age=0, must-revalidate';
const IMMUTABLE_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const NO_STORE_CACHE_CONTROL = 'no-store';

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

async function serveAsset(request: Request, env: Env, cacheControl: string): Promise<Response> {
  const response = await env.ASSETS.fetch(request);
  const headers = withCors(new Headers(response.headers));
  headers.set('Cache-Control', response.status === 200 ? cacheControl : NO_STORE_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
};
