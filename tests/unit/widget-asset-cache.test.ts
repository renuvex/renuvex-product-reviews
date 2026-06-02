import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

type HeaderRule = {
  source: string;
  headers: Array<{ key: string; value: string }>;
};

function vercelHeader(source: string): string {
  const filePath = path.join(process.cwd(), 'vercel.json');
  const config = JSON.parse(readFileSync(filePath, 'utf8')) as { headers?: HeaderRule[] };
  const rule = (config.headers || []).find((item) => item.source === source);
  const header = rule?.headers.find((item) => item.key.toLowerCase() === 'cache-control');
  return header?.value || '';
}

describe('widget asset cache headers', () => {
  it('keeps stable widget entrypoints revalidated while hashed runtime assets stay immutable', () => {
    expect(vercelHeader('/widget.js')).toBe('public, max-age=0, must-revalidate');
    expect(vercelHeader('/widget-runtime/runtime.js')).toBe('public, max-age=0, must-revalidate');
    expect(vercelHeader('/widget-runtime/runtime-:hash.js')).toBe('public, max-age=31536000, immutable');
    expect(vercelHeader('/widget-runtime/chunks/:path*')).toBe('public, max-age=31536000, immutable');
  });
});
