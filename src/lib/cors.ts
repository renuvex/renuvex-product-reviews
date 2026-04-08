import { NextResponse } from 'next/server';

/**
 * Public widget API'leri için CORS header'larını ayarlar.
 * Widget.js herhangi bir ikas storefront domain'inden çağırabilir.
 */
export function withCors(res: NextResponse): NextResponse {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export function corsOptions(): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }));
}
