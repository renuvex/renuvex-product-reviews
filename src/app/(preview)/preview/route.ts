import { NextRequest, NextResponse } from 'next/server';
import { buildWidgetPreviewPath } from '@/lib/widgets/preview-routes';
import {
  getDefaultWidgetPreviewScene,
  isWidgetPreviewScene,
} from '@/widget/preview/scenes.js';

/**
 * Temporary compatibility entry for editor sessions opened before canonical
 * preview paths were introduced. New callers use the prerendered route.
 */
export async function GET(request: NextRequest) {
  const widgetId = request.nextUrl.searchParams.get('widget') || 'reviews';
  const scene = request.nextUrl.searchParams.get('scene') || getDefaultWidgetPreviewScene(widgetId);

  if (!isWidgetPreviewScene(widgetId, scene)) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const redirectUrl = new URL(buildWidgetPreviewPath(widgetId, scene), request.url);
  const response = NextResponse.redirect(redirectUrl, 307);
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}
