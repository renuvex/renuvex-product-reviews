import { NextRequest, NextResponse } from 'next/server';
import {
  PREVIEW_PROTOCOL_VERSION,
  getDefaultWidgetPreviewScene,
  isWidgetPreviewScene,
} from '@/widget/preview/scenes.js';
import { buildPreviewDocument } from '@/widget/preview/document.js';

/**
 * Standalone, same-origin iframe document used by the widget editor.
 * Fixture data is local; rendered widget output comes from production modules.
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

  const context = {
    version: PREVIEW_PROTOCOL_VERSION,
    widgetId,
    scene,
  };
  const html = buildPreviewDocument(context, Date.now());

  return new NextResponse(html, {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
