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
      primaryColor: '#111111',
      autoApprove: false,
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

  return withCors(NextResponse.json({ widgets }));
}
