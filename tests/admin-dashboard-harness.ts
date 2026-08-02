import type { FrameLocator, Page, Route } from '@playwright/test';
import {
  buildWidgetPreviewPath,
  getWidgetPreviewRouteParams,
} from '../src/lib/widgets/preview-routes';
import {
  RENUVEX_PR_PREVIEW_RENDER,
  RENUVEX_PR_PREVIEW_RENDERED,
  RENUVEX_PR_PREVIEW_RESET_SCROLL,
  RENUVEX_PR_WIDGET_READY,
} from '../src/widget/core/namespace.js';
import {
  PREVIEW_PROTOCOL_VERSION,
} from '../src/widget/preview/scenes.js';

export const DASHBOARD_ORIGIN = 'http://127.0.0.1:3211';
export const HARNESS_ORIGIN = 'http://127.0.0.1:3212';
export const AUTHORIZED_APP_ID = 'ci-authorized-app';

export type HarnessScenario = 'success' | 'missing-id' | 'missing-token';

export interface ApiRequestRecord {
  method: string;
  path: string;
  body: unknown;
}

export interface AdminDashboardNetworkLog {
  apiRequests: ApiRequestRecord[];
  authorizationFailures: string[];
  unexpectedRequests: string[];
  previewRequests: string[];
  nextAssetRequests: string[];
  reviewCompletions: Array<{ call: number; status: number; path: string }>;
  summaryCompletions: Array<{ call: number; status: number }>;
  merchantCompletions: number;
}

interface SetupOptions {
  settingsFailures?: number;
  moderationStatus?: 200 | 202 | 500;
  deletionStatus?: 200 | 500;
  summaryFailureCalls?: number[];
  summaryDelaysMs?: number[];
  merchantDelayMs?: number;
  reviewFailureCalls?: number[];
  reviewDelaysMs?: number[];
  settingsSaveStatus?: 200 | 500;
  signedVideo?: boolean;
  videoThumbnailStatus?: 200 | 500;
}

interface MockState {
  moderated: boolean;
  deleted: boolean;
  merchantReply: string | null;
  settings: Record<string, Record<string, unknown>>;
  settingsFailuresRemaining: number;
  summaryCallCount: number;
  reviewCallCount: number;
}

interface HarnessCounts {
  CLOSE_LOADER: number;
  AUTHORIZED_APP_ID: number;
  REQUEST_TOKEN: number;
}

function base64Url(value: unknown): string {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

export function buildSyntheticAdminJwt(): string {
  const now = Math.floor(Date.now() / 1000);
  return [
    base64Url({ alg: 'HS256', typ: 'JWT' }),
    base64Url({ aud: AUTHORIZED_APP_ID, sub: 'ci-merchant', iat: now, exp: now + 600 }),
    'ci-synthetic-signature',
  ].join('.');
}

function normalizePath(url: URL): string {
  const params = [...url.searchParams.entries()].sort(([leftKey, leftValue], [rightKey, rightValue]) => (
    leftKey.localeCompare(rightKey) || leftValue.localeCompare(rightValue)
  ));
  const search = new URLSearchParams(params).toString();
  return `${url.pathname}${search ? `?${search}` : ''}`;
}

function json(route: Route, body: unknown, status = 200) {
  return route.fulfill({
    status,
    contentType: 'application/json; charset=utf-8',
    headers: { 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  });
}

function review(
  id: string,
  author: string,
  status: string,
  merchantReply: string | null = null,
  media: Array<Record<string, unknown>> = [],
) {
  return {
    id,
    productId: `product-${id}`,
    productName: `Ürün ${id}`,
    rating: 5,
    comment: `${author} tarafından yazılan test yorumu.`,
    author,
    status,
    merchantReply,
    images: '[]',
    media,
    hasVideo: media.some((item) => item.type === 'video'),
    createdAt: '2026-07-30T12:00:00.000Z',
  };
}

function totalForStatus(state: MockState, status: string | null): number {
  if (status === 'pending') return 21 - Number(state.moderated) - Number(state.deleted);
  if (status === 'approved') return state.moderated ? 5 : 4;
  if (status === 'rejected') return 2;
  return 27 - Number(state.deleted);
}

function summaryResponse(state: MockState) {
  return {
    data: {
      pending: totalForStatus(state, 'pending'),
      approved: totalForStatus(state, 'approved'),
      rejected: totalForStatus(state, 'rejected'),
      total: totalForStatus(state, null),
    },
  };
}

function reviewsResponse(url: URL, state: MockState, options: SetupOptions) {
  const status = url.searchParams.get('status');
  const page = Number(url.searchParams.get('page') || 1);
  const limit = Number(url.searchParams.get('limit') || 20);
  const total = totalForStatus(state, status);

  if (limit === 1) {
    return { data: [], pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  let data;
  if (status === 'pending' && page === 2) {
    data = [review('page-2', 'İkinci Sayfa Müşterisi', 'pending')];
  } else if (status === 'pending') {
    data = [state.moderated || state.deleted
      ? review('pending-2', 'Sonraki Müşteri', 'pending')
      : review('review-1', 'İlk Müşteri', 'pending', null, options.signedVideo ? [{
          id: 'video-media-1',
          type: 'video',
          url: null,
          thumbnailUrl: null,
          posterUrl: null,
          durationMs: 12_000,
          width: 720,
          height: 1280,
          position: 0,
          processingStatus: 'ready',
          visible: false,
          previewMode: 'signed',
          canPreview: true,
        }] : [])];
  } else if (status === 'approved') {
    data = [review('approved-1', 'Onaylı Müşteri', 'approved')];
  } else if (status === 'rejected') {
    data = [review('rejected-1', 'Reddedilen Müşteri', 'rejected')];
  } else {
    data = [review('all-1', 'Tüm Yorumlar Müşterisi', 'approved')];
  }

  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

function previewStubDocument(widgetId: string, scene: string): string {
  const context = { version: PREVIEW_PROTOCOL_VERSION, widgetId, scene };
  const contextJson = JSON.stringify(context).replace(/</g, '\\u003c');
  const messageTypes = JSON.stringify({
    ready: RENUVEX_PR_WIDGET_READY,
    render: RENUVEX_PR_PREVIEW_RENDER,
    rendered: RENUVEX_PR_PREVIEW_RENDERED,
    resetScroll: RENUVEX_PR_PREVIEW_RESET_SCROLL,
  });

  return `<!doctype html>
<html><head><meta charset="utf-8" /></head>
<body data-render-count="0">
  <div role="status">Preview protocol stub</div>
  <script>
    (() => {
      const context = ${contextJson};
      const messageTypes = ${messageTypes};
      let rendered = false;
      const post = (type) => window.parent.postMessage({ ...context, type }, window.location.origin);
      const readyTimers = [0, 50, 150].map((delay) => setTimeout(() => {
        if (!rendered) post(messageTypes.ready);
      }, delay));

      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin || event.source !== window.parent) return;
        const data = event.data;
        if (!data || data.version !== context.version || data.widgetId !== context.widgetId || data.scene !== context.scene) return;

        if (data.type === messageTypes.render && data.widgets && typeof data.widgets === 'object') {
          rendered = true;
          readyTimers.forEach(clearTimeout);
          document.body.dataset.renderCount = String(Number(document.body.dataset.renderCount || 0) + 1);
          post(messageTypes.rendered);
        }

        if (data.type === messageTypes.resetScroll) window.scrollTo(0, 0);
      });
    })();
  </script>
</body></html>`;
}

function parseBody(route: Route): unknown {
  const raw = route.request().postData();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return 'non_json_body';
  }
}

export async function setupAdminDashboardRoutes(page: Page, options: SetupOptions = {}) {
  const log: AdminDashboardNetworkLog = {
    apiRequests: [],
    authorizationFailures: [],
    unexpectedRequests: [],
    previewRequests: [],
    nextAssetRequests: [],
    reviewCompletions: [],
    summaryCompletions: [],
    merchantCompletions: 0,
  };
  const state: MockState = {
    moderated: false,
    deleted: false,
    merchantReply: null,
    settingsFailuresRemaining: options.settingsFailures || 0,
    summaryCallCount: 0,
    reviewCallCount: 0,
    settings: {
      reviews: { enabled: true, title: 'Müşteri Yorumları', showTitle: true, reviewStarColor: '#f59e0b' },
      badge: { enabled: true, size: 'medium', alignment: 'auto', showValue: true, showCount: true },
    },
  };

  await page.route('**/*', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const method = request.method();
    const path = normalizePath(url);

    if (url.origin === HARNESS_ORIGIN && (url.pathname === '/' || url.pathname === '/__health')) {
      await route.continue();
      return;
    }

    if (url.origin === DASHBOARD_ORIGIN && url.pathname.startsWith('/_next/')) {
      log.nextAssetRequests.push(path);
      await route.continue();
      return;
    }

    if (url.origin === DASHBOARD_ORIGIN && (url.pathname === '/' || url.pathname.startsWith('/dashboard') || url.pathname === '/favicon.ico')) {
      await route.continue();
      return;
    }

    if (url.origin === DASHBOARD_ORIGIN && url.pathname.startsWith('/preview/') && method === 'GET') {
      const previewContext = getWidgetPreviewRouteParams().find(
        ({ widgetId, scene }) => buildWidgetPreviewPath(widgetId, scene) === url.pathname,
      );
      log.previewRequests.push(path);
      if (!previewContext) {
        await route.fulfill({ status: 404, body: 'Not Found' });
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: 'text/html; charset=utf-8',
        headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' },
        body: previewStubDocument(previewContext.widgetId, previewContext.scene),
      });
      return;
    }

    if (url.origin === DASHBOARD_ORIGIN && url.pathname.startsWith('/api/')) {
      const body = parseBody(route);
      log.apiRequests.push({ method, path, body });
      const authorization = request.headers().authorization;
      if (!authorization || authorization === 'JWT dev' || authorization === 'JWT ' || !authorization.startsWith('JWT ')) {
        log.authorizationFailures.push(`${method} ${path}`);
      }

      if (url.pathname === '/api/ikas/get-merchant' && method === 'GET') {
        if (options.merchantDelayMs) await new Promise((resolve) => setTimeout(resolve, options.merchantDelayMs));
        log.merchantCompletions += 1;
        await json(route, { data: { merchantInfo: { storeName: 'Kanıt Mağazası' } } });
        return;
      }

      if (url.pathname === '/api/admin/storefront-theme/sync' && method === 'POST') {
        await json(route, { data: { status: 'synced' } });
        return;
      }

      if (url.pathname === '/api/admin/reviews' && method === 'GET') {
        const call = ++state.reviewCallCount;
        const delayMs = options.reviewDelaysMs?.[call - 1] ?? 0;
        if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
        const status = options.reviewFailureCalls?.includes(call) ? 500 : 200;
        log.reviewCompletions.push({ call, status, path });
        await json(route, status === 200 ? reviewsResponse(url, state, options) : { error: 'review_fixture_failure' }, status);
        return;
      }

      if (url.pathname === '/api/admin/reviews/video-thumbnail' && method === 'GET') {
        if (url.searchParams.get('mediaId') !== 'video-media-1') {
          await json(route, { error: 'video_not_found' }, 404);
          return;
        }
        if ((options.videoThumbnailStatus ?? 200) === 500) {
          await json(route, { error: 'admin_video_thumbnail_failed' }, 500);
          return;
        }
        await json(route, {
          data: {
            url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23222"/%3E%3C/svg%3E',
            expiresIn: 900,
          },
        });
        return;
      }

      if (url.pathname === '/api/admin/reviews/summary' && method === 'GET') {
        const call = ++state.summaryCallCount;
        const response = summaryResponse(state);
        const delayMs = options.summaryDelaysMs?.[call - 1] ?? 0;
        if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
        const status = options.summaryFailureCalls?.includes(call) ? 500 : 200;
        await json(route, status === 200 ? response : { error: 'summary_fixture_failure' }, status);
        log.summaryCompletions.push({ call, status });
        return;
      }

      if (url.pathname === '/api/admin/reviews' && method === 'PUT') {
        if (body && typeof body === 'object' && 'id' in body && 'status' in body && body.id === 'review-1' && body.status === 'approved') {
          const status = options.moderationStatus ?? 200;
          if (status === 500) {
            await json(route, { error: 'moderation_fixture_failure' }, 500);
            return;
          }
          if (status === 202) {
            await json(route, {
              data: review('review-1', 'İlk Müşteri', 'pending'),
              processing: true,
            }, 202);
            return;
          }
          state.moderated = true;
          await json(route, { data: review('review-1', 'İlk Müşteri', 'approved'), processing: false });
          return;
        }
        if (body && typeof body === 'object' && 'id' in body && 'merchantReply' in body && body.id === 'review-1') {
          state.merchantReply = typeof body.merchantReply === 'string' ? body.merchantReply : null;
          await json(route, {
            data: review('review-1', 'İlk Müşteri', 'pending', state.merchantReply),
          });
          return;
        }
        await json(route, { error: 'unexpected_review_update' }, 400);
        return;
      }

      if (url.pathname === '/api/admin/reviews' && method === 'DELETE') {
        if (url.searchParams.get('id') !== 'review-1') {
          await json(route, { error: 'unexpected_review_delete' }, 400);
          return;
        }
        if ((options.deletionStatus ?? 200) === 500) {
          await json(route, { error: 'deletion_fixture_failure' }, 500);
          return;
        }
        state.deleted = true;
        await json(route, { data: { id: 'review-1' } });
        return;
      }

      if (url.pathname === '/api/admin/settings' && method === 'GET') {
        if (state.settingsFailuresRemaining > 0) {
          state.settingsFailuresRemaining -= 1;
          await json(route, { error: 'settings_fixture_failure' }, 500);
          return;
        }
        await json(route, {
          data: state.settings,
          meta: {
            videoUsage: {
              monthlyLimit: 0,
              reservedCount: 0,
              consumedCount: 0,
              usedCount: 0,
              remainingCount: 0,
              effective: false,
              reason: 'global_disabled',
            },
          },
        });
        return;
      }

      if (url.pathname === '/api/admin/settings' && method === 'PUT') {
        if (body && typeof body === 'object' && 'widgetId' in body && 'settings' in body && typeof body.widgetId === 'string' && body.settings && typeof body.settings === 'object') {
          if ((options.settingsSaveStatus ?? 200) === 500) {
            await json(route, { error: 'settings_save_fixture_failure' }, 500);
            return;
          }
          state.settings[body.widgetId] = body.settings as Record<string, unknown>;
          await json(route, { data: { widgetId: body.widgetId, settings: body.settings } });
          return;
        }
        await json(route, { error: 'unexpected_settings_update' }, 400);
        return;
      }

      log.unexpectedRequests.push(`${method} ${url.origin}${path}`);
      await route.abort('blockedbyclient');
      return;
    }

    log.unexpectedRequests.push(`${method} ${url.origin}${path}`);
    await route.abort('blockedbyclient');
  });

  return log;
}

export async function openAdminHarness(page: Page, scenario: HarnessScenario = 'success', dashboardPath = '/dashboard'): Promise<FrameLocator> {
  const query = new URLSearchParams({ scenario, path: dashboardPath });
  await page.goto(`${HARNESS_ORIGIN}/?${query}`, { waitUntil: 'domcontentloaded' });
  return page.frameLocator('iframe[title="Renuvex Admin Dashboard"]');
}

export async function getHarnessCounts(page: Page): Promise<HarnessCounts> {
  return page.evaluate(() => {
    const state = (window as Window & {
      __renuvexAdminHarness?: { counts: HarnessCounts };
    }).__renuvexAdminHarness;
    if (!state) throw new Error('admin_harness_state_missing');
    return state.counts;
  });
}

export function requestsFor(log: AdminDashboardNetworkLog, method: string, pathname: string): ApiRequestRecord[] {
  return log.apiRequests.filter((request) => request.method === method && request.path.split('?')[0] === pathname);
}

export function duplicateRequestKeys(requests: ApiRequestRecord[]): string[] {
  const counts = new Map<string, number>();
  for (const request of requests) {
    const key = `${request.method} ${request.path}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([key]) => key).sort();
}
