import { describe, expect, it } from 'vitest';
import worker, { __workerTest } from '../../workers/widget-delivery/src/index';

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
    },
    seen,
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

  it('keeps stable entrypoints revalidated and fails closed for public API paths', async () => {
    const { env } = assetEnv();
    const stable = await worker.fetch(new Request('https://widget.renuvex.app/widget.js'), env);
    const api = await worker.fetch(new Request('https://widget.renuvex.app/api/public/settings'), env);

    expect(stable.headers.get('Cache-Control')).toBe('public, max-age=0, must-revalidate');
    expect(api.status).toBe(404);
    expect(await api.json()).toEqual({ error: 'not_found' });
    expect(api.headers.get('Cache-Control')).toBe('no-store');
  });

  it('pins the path classifier to the supported widget surface', () => {
    expect(__workerTest.getAssetCacheControl('/widget-runtime/runtime-ABC123.js')).toBe('public, max-age=31536000, immutable');
    expect(__workerTest.getAssetCacheControl('/widget-runtime/chunks/render-ABC123.js')).toBe('public, max-age=31536000, immutable');
    expect(__workerTest.getAssetCacheControl('/widget-runtime/build-manifest.json')).toBe('public, max-age=0, must-revalidate');
    expect(__workerTest.getAssetCacheControl('/api/public/reviews')).toBeNull();
  });
});
