import { NextResponse } from 'next/server';
import {
  getWidgetPreviewRouteParams,
  type WidgetPreviewRouteParams,
} from '@/lib/widgets/preview-routes';
import { buildPreviewDocument } from '@/widget/preview/document.js';
import {
  PREVIEW_PROTOCOL_VERSION,
  isWidgetPreviewScene,
} from '@/widget/preview/scenes.js';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): WidgetPreviewRouteParams[] {
  return getWidgetPreviewRouteParams();
}

/**
 * Build-time preview document. Fixture data is local; rendered widget output
 * still comes from the production widget runtime loaded by the document.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<WidgetPreviewRouteParams> },
) {
  const { widgetId, scene } = await context.params;
  if (!isWidgetPreviewScene(widgetId, scene)) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  const html = buildPreviewDocument({
    version: PREVIEW_PROTOCOL_VERSION,
    widgetId,
    scene,
  });

  return new NextResponse(html, {
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
