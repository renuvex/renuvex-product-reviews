import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { describe, expect, it } from 'vitest';
import {
  anonymousPublicCorsOptions,
  widgetBeaconCorsOptions,
  withAnonymousPublicCors,
  withWidgetBeaconCors,
} from '@/lib/cors';

function sourceFiles(root: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(absolute));
    else if (entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name)) files.push(absolute);
  }
  return files;
}

describe('CORS policy boundaries', () => {
  it('keeps anonymous public responses wildcard and credential-free', () => {
    const response = withAnonymousPublicCors(NextResponse.json({ ok: true }));

    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
    expect(response.headers.get('Vary')).toBeNull();

    const options = anonymousPublicCorsOptions(['GET', 'POST']);
    expect(options.status).toBe(204);
    expect(options.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(options.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST');
    expect(options.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Cache-Control, Pragma');
    expect(options.headers.get('Access-Control-Allow-Headers')).not.toContain('Authorization');
    expect(options.headers.get('Access-Control-Allow-Credentials')).toBeNull();
  });

  it('reflects only canonical HTTP origins for the credentialed widget beacon', () => {
    const valid = withWidgetBeaconCors(
      NextResponse.json({ ok: true }),
      new Request('https://app.renuvex.app/api/public/widget-error', {
        headers: { Origin: 'https://Merchant.Example:443' },
      }),
    );
    expect(valid.headers.get('Access-Control-Allow-Origin')).toBe('https://merchant.example');
    expect(valid.headers.get('Access-Control-Allow-Credentials')).toBe('true');
    expect(valid.headers.get('Vary')).toBe('Origin');

    for (const origin of [
      null,
      'null',
      'not-a-url',
      'data:text/plain,test',
      'https://user:pass@merchant.example',
      'https://merchant.example/path',
    ]) {
      const headers = origin === null ? undefined : { Origin: origin };
      const response = withWidgetBeaconCors(
        NextResponse.json({ ok: true }),
        new Request('https://app.renuvex.app/api/public/widget-error', { headers }),
      );
      expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
      expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
      expect(response.headers.get('Vary')).toBeNull();
    }

    const options = widgetBeaconCorsOptions(new Request(
      'https://app.renuvex.app/api/public/widget-error',
      { headers: { Origin: 'http://localhost:3000' } },
    ));
    expect(options.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:3000');
    expect(options.headers.get('Access-Control-Allow-Methods')).toBe('POST');
    expect(options.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type');
  });

  it('keeps credential reflection isolated from admin and review-center routes', () => {
    const sourceRoot = path.join(process.cwd(), 'src');
    const files = sourceFiles(sourceRoot);
    const corsSource = path.join(sourceRoot, 'lib', 'cors.ts');
    const widgetErrorRoute = path.join(sourceRoot, 'app', 'api', 'public', 'widget-error', 'route.ts');

    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      if (file !== corsSource) {
        expect(source).not.toMatch(/\bwithCors\b|\bcorsOptions\b/);
        expect(source).not.toContain('Access-Control-Allow-Credentials');
      }
      if (file !== corsSource && file !== widgetErrorRoute) {
        expect(source).not.toContain('withWidgetBeaconCors');
        expect(source).not.toContain('widgetBeaconCorsOptions');
      }
      if (
        file.includes(`${path.sep}app${path.sep}api${path.sep}admin${path.sep}`) ||
        file.includes(`${path.sep}app${path.sep}api${path.sep}public${path.sep}review-center${path.sep}`)
      ) {
        expect(source).not.toContain("from '@/lib/cors'");
      }
    }

    const injectScripts = readFileSync(
      path.join(sourceRoot, 'app', 'api', 'admin', 'inject-scripts', 'route.ts'),
      'utf8',
    );
    expect(injectScripts).not.toContain('export async function OPTIONS');

    const optionContracts = new Map<string, string>([
      ['app/api/preview/settings/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/preview/reviews/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/ratings/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/ratings-by-slug/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/settings/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/reviews/route.ts', "anonymousPublicCorsOptions(['GET', 'POST'])"],
      ['app/api/public/storefront-theme/lazy-sync/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/sign/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/register/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/video/capability/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/upload/video/status/route.ts', "anonymousPublicCorsOptions(['GET'])"],
      ['app/api/public/upload/video/initiate/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/video/complete/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/video/metrics/route.ts', "anonymousPublicCorsOptions(['POST'])"],
      ['app/api/public/upload/video/route.ts', "anonymousPublicCorsOptions(['DELETE'])"],
    ]);
    for (const [relativePath, contract] of optionContracts) {
      expect(readFileSync(path.join(sourceRoot, ...relativePath.split('/')), 'utf8')).toContain(contract);
    }
  });
});
