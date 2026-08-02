import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  buildWidgetPreviewPath,
  getWidgetPreviewRouteParams,
} from '../src/lib/widgets/preview-routes';

type PrerenderRoute = {
  srcRoute?: string | null;
  initialHeaders?: Record<string, string>;
  initialRevalidateSeconds?: number | false;
};

type DynamicPrerenderRoute = {
  fallback?: unknown;
};

type PrerenderManifest = {
  routes?: Record<string, PrerenderRoute>;
  dynamicRoutes?: Record<string, DynamicPrerenderRoute>;
};

const nextDirectory = path.join(process.cwd(), '.next');

function fail(message: string): never {
  console.error(`preview_route_prerender_verification_failed:${message}`);
  process.exit(1);
}

function readJson<T>(relativePath: string): T {
  try {
    return JSON.parse(readFileSync(path.join(nextDirectory, relativePath), 'utf8')) as T;
  } catch {
    return fail(`unreadable_json:${relativePath}`);
  }
}

const expectedRoutes = getWidgetPreviewRouteParams()
  .map(({ widgetId, scene }) => buildWidgetPreviewPath(widgetId, scene))
  .sort();
if (expectedRoutes.length === 0) fail('empty_scene_registry');
if (new Set(expectedRoutes).size !== expectedRoutes.length) fail('duplicate_scene_route');

const appPaths = readJson<Record<string, string>>('server/app-paths-manifest.json');
const dynamicRouteKey = '/(preview)/preview/[widgetId]/[scene]/route';
if (typeof appPaths[dynamicRouteKey] !== 'string') fail(`missing_app_route:${dynamicRouteKey}`);

const prerenderManifest = readJson<PrerenderManifest>('prerender-manifest.json');
if (!prerenderManifest.routes || typeof prerenderManifest.routes !== 'object') {
  fail('missing_prerender_routes');
}

const actualRoutes = Object.keys(prerenderManifest.routes)
  .filter((route) => route.startsWith('/preview/'))
  .sort();
if (JSON.stringify(actualRoutes) !== JSON.stringify(expectedRoutes)) {
  fail(`route_set_mismatch:expected=${expectedRoutes.join(',')}:actual=${actualRoutes.join(',')}`);
}
if (Object.hasOwn(prerenderManifest.routes, '/preview')) {
  fail('compatibility_route_must_remain_dynamic');
}

for (const route of expectedRoutes) {
  const entry = prerenderManifest.routes[route];
  if (!entry || typeof entry !== 'object') fail(`invalid_route_entry:${route}`);
  if (entry.srcRoute !== '/preview/[widgetId]/[scene]') fail(`unexpected_source_route:${route}`);
  if (entry.initialRevalidateSeconds !== false) fail(`route_is_not_permanent_prerender:${route}`);
  if (entry.initialHeaders?.['cache-control'] !== 'public, max-age=0, must-revalidate') {
    fail(`unexpected_cache_control:${route}`);
  }
  if (entry.initialHeaders?.['content-type'] !== 'text/html; charset=utf-8') {
    fail(`unexpected_content_type:${route}`);
  }
  if (entry.initialHeaders?.['referrer-policy'] !== 'no-referrer') {
    fail(`unexpected_referrer_policy:${route}`);
  }
  if (entry.initialHeaders?.['x-content-type-options'] !== 'nosniff') {
    fail(`unexpected_content_type_options:${route}`);
  }
}

const dynamicEntry = prerenderManifest.dynamicRoutes?.['/preview/[widgetId]/[scene]'];
if (!dynamicEntry || dynamicEntry.fallback !== false) fail('dynamic_route_must_fail_closed');

console.log(JSON.stringify({
  status: 'preview_routes_prerendered',
  source: 'widget_preview_scene_registry',
  routes: expectedRoutes,
}, null, 2));
