import { NextResponse } from 'next/server';

type AnonymousPublicMethod = 'GET' | 'POST' | 'DELETE';
type AnonymousPublicMethods = readonly [
  AnonymousPublicMethod,
  ...AnonymousPublicMethod[],
];

const ANONYMOUS_PUBLIC_HEADERS = 'Content-Type, Cache-Control, Pragma';

function updateVaryOrigin(response: NextResponse, includeOrigin: boolean): void {
  const values = (response.headers.get('Vary') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => value.toLowerCase() !== 'origin');

  if (includeOrigin) values.push('Origin');
  if (values.length > 0) {
    response.headers.set('Vary', values.join(', '));
  } else {
    response.headers.delete('Vary');
  }
}

function canonicalHttpOrigin(request: Request): string | null {
  const rawOrigin = request.headers.get('origin');
  if (!rawOrigin || rawOrigin === 'null') return null;

  try {
    const origin = new URL(rawOrigin);
    if (origin.protocol !== 'http:' && origin.protocol !== 'https:') return null;
    if (origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
      return null;
    }
    return origin.origin;
  } catch {
    return null;
  }
}

export function withAnonymousPublicCors(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.delete('Access-Control-Allow-Credentials');
  updateVaryOrigin(response, false);
  return response;
}

export function anonymousPublicCorsOptions(methods: AnonymousPublicMethods): NextResponse {
  const response = withAnonymousPublicCors(new NextResponse(null, { status: 204 }));
  response.headers.set('Access-Control-Allow-Methods', [...new Set(methods)].join(', '));
  response.headers.set('Access-Control-Allow-Headers', ANONYMOUS_PUBLIC_HEADERS);
  return response;
}

export function withWidgetBeaconCors(response: NextResponse, request: Request): NextResponse {
  const origin = canonicalHttpOrigin(request);
  if (!origin) {
    response.headers.delete('Access-Control-Allow-Origin');
    response.headers.delete('Access-Control-Allow-Credentials');
    updateVaryOrigin(response, false);
    return response;
  }

  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  updateVaryOrigin(response, true);
  return response;
}

export function widgetBeaconCorsOptions(request: Request): NextResponse {
  const response = withWidgetBeaconCors(new NextResponse(null, { status: 204 }), request);
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
