import { NextResponse } from 'next/server';

/**
 * Public widget API'leri için CORS header'larını ayarlar.
 * Widget.js herhangi bir ikas storefront domain'inden çağırabilir.
 */
function getRequestOrigin(req?: Request): string | null {
  return req?.headers.get('origin') || null;
}

export function withCors(res: NextResponse, req?: Request): NextResponse {
  const origin = getRequestOrigin(req);
  res.headers.set('Access-Control-Allow-Origin', origin || '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');
  if (origin) {
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.append('Vary', 'Origin');
  }
  return res;
}

export function corsOptions(req?: Request): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }), req);
}
