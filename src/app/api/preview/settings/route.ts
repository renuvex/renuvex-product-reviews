import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/preview/settings
 * Mock settings for iframe preview — no DB, no auth.
 * Returns default widget settings. Override is applied client-side via sessionStorage.
 */
export async function GET() {
  const widgets = {
    reviews: {
      enabled: true,
      title: 'Müşteri Yorumları',
      autoApprove: 'manual',
      size: 'medium',
      thumbnailSize: 'medium',
    },
    badge: {
      enabled: true,
      color: '#f59e0b',
      icon: 'star',
      size: 'medium',
    },
  };

  // Preview iframe lives inside the Renuvex admin dashboard. There is no
  // merchant theme to gate against; both ADR_0022 flags are forced ON so
  // every surface renders against the preview fixture HTML.
  return withCors(NextResponse.json({
    widgets,
    runtime: {
      themeAdapterKey: 'ozy',
      themeAdapterSource: 'legacy_fallback',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
    },
  }));
}
