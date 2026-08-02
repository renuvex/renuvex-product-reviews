import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getCompatibilityPreview } from '../../src/app/(preview)/preview/route';
import {
  GET as getStaticPreview,
  dynamic,
  dynamicParams,
  generateStaticParams,
} from '../../src/app/(preview)/preview/[widgetId]/[scene]/route';
import {
  buildWidgetPreviewPath,
  getWidgetPreviewRouteParams,
} from '../../src/lib/widgets/preview-routes';

describe('widget preview route', () => {
  it('prerenders the exact scene registry and rejects runtime-only params', () => {
    expect(dynamic).toBe('force-static');
    expect(dynamicParams).toBe(false);
    expect(generateStaticParams()).toEqual(getWidgetPreviewRouteParams());
    expect(generateStaticParams()).toEqual([
      { widgetId: 'reviews', scene: 'reviews' },
      { widgetId: 'badge', scene: 'pdp' },
      { widgetId: 'badge', scene: 'listing' },
    ]);
  });

  it('returns deterministic production-renderer HTML with immutable route inputs', async () => {
    const params = Promise.resolve({ widgetId: 'badge', scene: 'pdp' });
    const first = await getStaticPreview(new Request('http://localhost/preview/badge/pdp'), { params });
    const second = await getStaticPreview(new Request('http://localhost/preview/badge/pdp'), {
      params: Promise.resolve({ widgetId: 'badge', scene: 'pdp' }),
    });

    expect(first.status).toBe(200);
    expect(first.headers.get('cache-control')).toBe('public, max-age=0, must-revalidate');
    expect(first.headers.get('referrer-policy')).toBe('no-referrer');
    expect(first.headers.get('x-content-type-options')).toBe('nosniff');

    const firstBody = await first.text();
    const secondBody = await second.text();
    expect(firstBody).toBe(secondBody);
    expect(firstBody).toContain('data-preview-widget="badge"');
    expect(firstBody).toContain('data-preview-scene="pdp"');
    expect(firstBody).toContain('/widget.js?publicApiKey=preview');
    expect(firstBody).not.toContain('publicApiKey=preview&amp;v=');
    expect(firstBody).not.toContain('publicApiKey=preview&v=');
  });

  it('keeps an exact fail-closed guard in the generated route', async () => {
    const response = await getStaticPreview(new Request('http://localhost/preview/badge/unknown'), {
      params: Promise.resolve({ widgetId: 'badge', scene: 'unknown' }),
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('redirects validated legacy query URLs without preserving query data', async () => {
    const response = await getCompatibilityPreview(
      new NextRequest('http://localhost/preview?widget=badge&scene=listing&ignored=value'),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(
      `http://localhost${buildWidgetPreviewPath('badge', 'listing')}`,
    );
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(response.headers.get('referrer-policy')).toBe('no-referrer');
  });

  it('does not redirect unknown legacy widget or scene inputs', async () => {
    const response = await getCompatibilityPreview(
      new NextRequest('http://localhost/preview?widget=badge&scene=unknown'),
    );

    expect(response.status).toBe(404);
    expect(response.headers.get('location')).toBeNull();
  });
});
