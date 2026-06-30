import { chromium } from '@playwright/test';

const targetUrl = process.env.MEASURE_STOREFRONT_URL || process.argv.slice(2).find((arg) => !arg.startsWith('-')) || '';
const waitAfterDomMs = parsePositiveInt(process.env.MEASURE_STOREFRONT_WAIT_MS, 12_000);
const navTimeoutMs = parsePositiveInt(process.env.MEASURE_STOREFRONT_NAV_TIMEOUT_MS, 45_000);
const headless = process.env.MEASURE_STOREFRONT_HEADFUL !== 'true';

if (!targetUrl) {
  console.error('Missing target URL.');
  console.error('Usage: pnpm measure:storefront-waterfall -- https://example-store.com/product');
  console.error('Or: $env:MEASURE_STOREFRONT_URL="https://example-store.com/product"; pnpm measure:storefront-waterfall');
  process.exit(2);
}

let parsedTarget;
try {
  parsedTarget = new URL(targetUrl);
} catch (error) {
  console.error(`Invalid MEASURE_STOREFRONT_URL: ${targetUrl}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}

const browser = await chromium.launch({ headless });
const context = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

const requests = new Map();
const consoleMessages = [];
const pageErrors = [];

await cdp.send('Network.enable');

await page.addInitScript(() => {
  const marks = [];
  const seen = new Set();
  const mark = (name) => {
    if (seen.has(name)) return;
    seen.add(name);
    marks.push({ name, at: performance.now() });
  };
  const findInTree = (root, selector) => {
    if (!root) return false;
    if (root.querySelector && root.querySelector(selector)) return true;
    const all = root.querySelectorAll ? Array.from(root.querySelectorAll('*')) : [];
    return all.some((node) => node.shadowRoot && findInTree(node.shadowRoot, selector));
  };
  const scan = () => {
    if (document.querySelector('script[src*="/widget.js"]')) mark('widget-script-tag-present');
    if (document.querySelector('[data-renuvex-widget="reviews"]')) mark('reviews-mount-present');
    if (findInTree(document, '[data-renuvex-slot="product-title-rating"]')) mark('rating-slot-present');
    if (findInTree(document, '.renuvex-pr-rating-badge')) mark('rating-badge-visible');
    if (findInTree(document, '#renuvex-reviews-widget')) mark('reviews-widget-visible');
    if (findInTree(document, '.renuvex-pr-media-gallery')) mark('media-gallery-visible');
  };
  window.__renuvexStorefrontWaterfall = { marks };
  const observer = new MutationObserver(scan);
  document.addEventListener('DOMContentLoaded', () => {
    mark('domcontentloaded');
    scan();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 15_000);
  });
  scan();
});

cdp.on('Network.requestWillBeSent', (event) => {
  if (!isHttpUrl(event.request.url)) return;
  requests.set(event.requestId, {
    requestId: event.requestId,
    url: event.request.url,
    method: event.request.method,
    type: event.type,
    startTs: event.timestamp,
    wallTime: event.wallTime,
    initiatorType: event.initiator?.type || '',
    status: null,
    responseTs: null,
    finishTs: null,
    failed: false,
    failureText: '',
    encodedBytes: 0,
    mimeType: '',
    headers: {},
  });
});

cdp.on('Network.responseReceived', (event) => {
  const record = requests.get(event.requestId);
  if (!record) return;
  record.status = event.response.status;
  record.responseTs = event.timestamp;
  record.mimeType = event.response.mimeType || '';
  record.headers = normalizeHeaders(event.response.headers || {});
});

cdp.on('Network.loadingFinished', (event) => {
  const record = requests.get(event.requestId);
  if (!record) return;
  record.finishTs = event.timestamp;
  record.encodedBytes = Math.max(0, Math.round(event.encodedDataLength || 0));
});

cdp.on('Network.loadingFailed', (event) => {
  const record = requests.get(event.requestId);
  if (!record) return;
  record.finishTs = event.timestamp;
  record.failed = true;
  record.failureText = event.errorText || 'loading failed';
});

page.on('console', (message) => {
  if (!['error', 'warning'].includes(message.type())) return;
  consoleMessages.push({
    type: message.type(),
    text: trim(message.text(), 400),
    location: message.location(),
  });
});

page.on('pageerror', (error) => {
  pageErrors.push(trim(error.message || String(error), 800));
});

let navigationError = null;
try {
  await page.goto(parsedTarget.toString(), { waitUntil: 'domcontentloaded', timeout: navTimeoutMs });
  await page.waitForTimeout(waitAfterDomMs);
} catch (error) {
  navigationError = error instanceof Error ? error.message : String(error);
}

const runtime = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  return {
    url: location.href,
    title: document.title,
    readyState: document.readyState,
    navigation: nav
      ? {
          startTime: nav.startTime,
          domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
          loadEventEnd: nav.loadEventEnd,
          responseStart: nav.responseStart,
          responseEnd: nav.responseEnd,
          duration: nav.duration,
          transferSize: nav.transferSize,
          encodedBodySize: nav.encodedBodySize,
          decodedBodySize: nav.decodedBodySize,
        }
      : null,
    marks: window.__renuvexStorefrontWaterfall?.marks || [],
    dom: {
      widgetScripts: document.querySelectorAll('script[src*="/widget.js"]').length,
      reviewMounts: document.querySelectorAll('[data-renuvex-widget="reviews"]').length,
    },
  };
});

await browser.close();

const records = Array.from(requests.values()).sort((a, b) => a.startTs - b.startTs);
const baseTs = records[0]?.startTs || 0;
const enriched = records.map((record) => enrichRecord(record, baseTs, parsedTarget));
const relevant = enriched.filter((record) => record.category !== 'other' || record.totalMs >= 500 || record.ttfbMs >= 300);
const byCategory = summarizeByCategory(enriched);

printReport({
  target: parsedTarget.toString(),
  navigationError,
  runtime,
  byCategory,
  relevant,
  slowestTtfb: [...enriched].sort((a, b) => b.ttfbMs - a.ttfbMs).slice(0, 12),
  slowestTotal: [...enriched].sort((a, b) => b.totalMs - a.totalMs).slice(0, 12),
  consoleMessages,
  pageErrors,
});

if (navigationError) {
  process.exitCode = 1;
}

function enrichRecord(record, baseTs, target) {
  const responseTs = record.responseTs || record.finishTs || record.startTs;
  const finishTs = Math.max(record.finishTs || responseTs, responseTs, record.startTs);
  const url = new URL(record.url);
  const ttfbMs = Math.max(0, Math.round((responseTs - record.startTs) * 1000));
  const totalMs = Math.max(0, Math.round((finishTs - record.startTs) * 1000));
  return {
    ...record,
    host: url.host,
    path: url.pathname,
    category: classifyUrl(url, target),
    safeUrl: safeUrl(url),
    startMs: Math.max(0, Math.round((record.startTs - baseTs) * 1000)),
    ttfbMs,
    totalMs,
    cache: cacheSummary(record.headers),
  };
}

function summarizeByCategory(records) {
  const grouped = new Map();
  for (const record of records) {
    const group = grouped.get(record.category) || {
      category: record.category,
      count: 0,
      bytes: 0,
      maxTtfb: 0,
      maxTotal: 0,
      statuses: new Map(),
    };
    group.count += 1;
    group.bytes += record.encodedBytes || 0;
    group.maxTtfb = Math.max(group.maxTtfb, record.ttfbMs);
    group.maxTotal = Math.max(group.maxTotal, record.totalMs);
    const statusKey = record.failed ? 'failed' : String(record.status || 'pending');
    group.statuses.set(statusKey, (group.statuses.get(statusKey) || 0) + 1);
    grouped.set(record.category, group);
  }
  return Array.from(grouped.values()).sort((a, b) => b.count - a.count);
}

function classifyUrl(url, target) {
  if (url.host === 'widget.renuvex.app') {
    if (url.pathname === '/widget.js' || url.pathname.startsWith('/widget-runtime/')) return 'renuvex-static';
    if (url.pathname.startsWith('/api/public/reviews') || url.pathname.startsWith('/api/public/ratings')) return 'renuvex-read-api';
    if (url.pathname.startsWith('/api/')) return 'renuvex-worker-api-other';
    return 'renuvex-widget-origin';
  }
  if (url.host === 'app.renuvex.app') {
    if (url.pathname.startsWith('/api/public/settings')) return 'renuvex-settings-api';
    if (url.pathname.startsWith('/api/public/')) return 'renuvex-backend-api';
    return 'renuvex-app-origin';
  }
  if (url.host.includes('mux.com')) return 'mux';
  if (url.host.includes('cloudinary.com')) return 'cloudinary';
  if (url.host === target.host || url.host.endsWith('.ikas.shop') || url.host.includes('ikas')) return 'ikas-storefront';
  if (url.host.includes('yotpo.com')) return 'yotpo';
  return 'other';
}

function cacheSummary(headers) {
  const parts = [];
  for (const key of ['cf-cache-status', 'x-renuvex-edge-cache', 'x-vercel-cache', 'x-cache', 'age', 'cache-control', 'content-encoding']) {
    if (headers[key]) parts.push(`${key}=${headers[key]}`);
  }
  return parts.join('; ');
}

function normalizeHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers)) {
    result[String(key).toLowerCase()] = Array.isArray(value) ? value.join(', ') : String(value);
  }
  return result;
}

function safeUrl(url) {
  const copy = new URL(url.toString());
  if (copy.searchParams.size > 0) {
    const params = Array.from(copy.searchParams.keys()).slice(0, 10);
    copy.search = params.map((key) => `${encodeURIComponent(key)}=...`).join('&');
  }
  return copy.toString();
}

function isHttpUrl(url) {
  return /^https?:\/\//i.test(url);
}

function parsePositiveInt(value, fallback) {
  const parsed = Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function statusSummary(statuses) {
  return Array.from(statuses.entries())
    .map(([status, count]) => `${status}:${count}`)
    .join(', ');
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function trim(value, max) {
  const text = String(value || '');
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function printReport(report) {
  console.log('# Storefront waterfall measurement');
  console.log('');
  console.log(`Target: ${report.target}`);
  console.log(`Measured at: ${new Date().toISOString()}`);
  console.log(`Navigation error: ${report.navigationError || 'none'}`);
  console.log(`Document title: ${report.runtime.title || '(empty)'}`);
  console.log(`Ready state: ${report.runtime.readyState}`);
  if (report.runtime.navigation) {
    console.log(
      `Navigation: TTFB ${Math.round(report.runtime.navigation.responseStart)} ms, DOMContentLoaded ${Math.round(
        report.runtime.navigation.domContentLoadedEventEnd,
      )} ms, load ${Math.round(report.runtime.navigation.loadEventEnd || 0)} ms, total ${Math.round(report.runtime.navigation.duration)} ms`,
    );
  }

  console.log('');
  console.log('## Browser marks');
  if (report.runtime.marks.length === 0) {
    console.log('- none');
  } else {
    for (const mark of report.runtime.marks) {
      console.log(`- ${mark.name}: ${Math.round(mark.at)} ms`);
    }
  }

  console.log('');
  console.log('## Summary by category');
  console.log('| Category | Requests | Encoded bytes | Max TTFB | Max total | Statuses |');
  console.log('|---|---:|---:|---:|---:|---|');
  for (const group of report.byCategory) {
    console.log(`| ${group.category} | ${group.count} | ${formatBytes(group.bytes)} | ${group.maxTtfb} ms | ${group.maxTotal} ms | ${statusSummary(group.statuses)} |`);
  }

  console.log('');
  console.log('## Renuvex and slow request chain');
  console.log('| Start | Category | Type | Method | Status | TTFB | Total | Bytes | Cache | URL |');
  console.log('|---:|---|---|---|---:|---:|---:|---:|---|---|');
  for (const record of report.relevant.slice(0, 80)) {
    console.log(
      `| ${record.startMs} ms | ${record.category} | ${record.type} | ${record.method} | ${record.status || (record.failed ? 'failed' : '')} | ${record.ttfbMs} ms | ${record.totalMs} ms | ${formatBytes(record.encodedBytes)} | ${trim(record.cache, 120)} | ${trim(record.safeUrl, 180)} |`,
    );
  }

  printTop('## Slowest TTFB', report.slowestTtfb);
  printTop('## Slowest total', report.slowestTotal);

  console.log('');
  console.log('## Console warnings/errors');
  if (report.consoleMessages.length === 0 && report.pageErrors.length === 0) {
    console.log('- none');
  } else {
    for (const error of report.pageErrors.slice(0, 10)) {
      console.log(`- pageerror: ${error}`);
    }
    for (const message of report.consoleMessages.slice(0, 20)) {
      console.log(`- ${message.type}: ${message.text}`);
    }
  }
}

function printTop(title, rows) {
  console.log('');
  console.log(title);
  console.log('| Category | Status | TTFB | Total | Bytes | URL |');
  console.log('|---|---:|---:|---:|---:|---|');
  for (const record of rows) {
    console.log(`| ${record.category} | ${record.status || (record.failed ? 'failed' : '')} | ${record.ttfbMs} ms | ${record.totalMs} ms | ${formatBytes(record.encodedBytes)} | ${trim(record.safeUrl, 180)} |`);
  }
}
