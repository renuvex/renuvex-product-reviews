import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/prisma', () => ({ prisma: {} }));

const originalReviewEmailEnabled = process.env.REVIEW_EMAIL_ENABLED;
const originalReviewRequestPublicBaseUrl = process.env.REVIEW_REQUEST_PUBLIC_BASE_URL;

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
    return;
  }
  process.env[name] = value;
}

describe('feature-disabled public review email routes', () => {
  beforeEach(() => {
    delete process.env.REVIEW_EMAIL_ENABLED;
    delete process.env.REVIEW_REQUEST_PUBLIC_BASE_URL;
  });

  afterEach(() => {
    restoreEnv('REVIEW_EMAIL_ENABLED', originalReviewEmailEnabled);
    restoreEnv('REVIEW_REQUEST_PUBLIC_BASE_URL', originalReviewRequestPublicBaseUrl);
  });

  it.each([
    {
      name: 'legacy token exchange',
      invoke: async () => {
        const { POST } = await import('@/app/api/public/review-request/route');
        return POST(new NextRequest('https://app.renuvex.app/api/public/review-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: 'invalid' }),
        }));
      },
    },
    {
      name: 'legacy session resolve',
      invoke: async () => {
        const { GET } = await import('@/app/api/public/review-request/route');
        return GET(new NextRequest('https://app.renuvex.app/api/public/review-request'));
      },
    },
    {
      name: 'batch token exchange',
      invoke: async () => {
        const { POST } = await import('@/app/api/public/review-center/session/route');
        return POST(new NextRequest('https://app.renuvex.app/api/public/review-center/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: 'invalid' }),
        }));
      },
    },
    {
      name: 'batch item listing',
      invoke: async () => {
        const { GET } = await import('@/app/api/public/review-center/items/route');
        return GET(new NextRequest('https://app.renuvex.app/api/public/review-center/items'));
      },
    },
    {
      name: 'batch item submit',
      invoke: async () => {
        const { POST } = await import('@/app/api/public/review-center/items/[itemId]/reviews/route');
        return POST(new NextRequest('https://app.renuvex.app/api/public/review-center/items/item/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: 5 }),
        }), { params: Promise.resolve({ itemId: 'item' }) });
      },
    },
    {
      name: 'batch item skip',
      invoke: async () => {
        const { POST } = await import('@/app/api/public/review-center/items/[itemId]/skip/route');
        return POST(new NextRequest('https://app.renuvex.app/api/public/review-center/items/item/skip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        }), { params: Promise.resolve({ itemId: 'item' }) });
      },
    },
  ])('returns 404 before reading disabled runtime configuration: $name', async ({ invoke }) => {
    const response = await invoke();

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'not_found' });
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });
});
