import { chromium } from '@playwright/test';

const targetUrl = process.env.MEASURE_STOREFRONT_URL || process.argv.slice(2).find((arg) => !arg.startsWith('-')) || '';
const waitAfterDomMs = parsePositiveInt(process.env.MEASURE_STOREFRONT_WAIT_MS, 12_000);
const navTimeoutMs = parsePositiveInt(process.env.MEASURE_STOREFRONT_NAV_TIMEOUT_MS, 45_000);
const runCount = parsePositiveInt(process.env.MEASURE_STOREFRONT_RUNS || readArgValue('--runs'), 1);
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
  parsedTarget.searchParams.set('renuvexPerf', '1');
} catch (error) {
  console.error(`Invalid MEASURE_STOREFRONT_URL: ${targetUrl}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}

const reports = [];
for (let run = 1; run <= runCount; run++) {
  const report = await measureOnce(parsedTarget, run);
  reports.push(report);
  if (runCount === 1) {
    printReport(report);
  } else {
    printRunLine(report, run);
  }
  if (report.navigationError) process.exitCode = 1;
}

if (runCount > 1) {
  printMultiRunSummary(reports);
}

async function measureOnce(target, runIndex) {
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
    window.__renuvexPerfEnabled = true;
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
    await page.goto(target.toString(), { waitUntil: 'domcontentloaded', timeout: navTimeoutMs });
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
      widgetTimeline: window.__renuvexPerfTimeline?.marks || [],
      dom: {
        widgetScripts: document.querySelectorAll('script[src*="/widget.js"]').length,
        reviewMounts: document.querySelectorAll('[data-renuvex-widget="reviews"]').length,
      },
    };
  });

  await browser.close();

  const records = Array.from(requests.values()).sort((a, b) => a.startTs - b.startTs);
  const baseTs = records[0]?.startTs || 0;
  const enriched = records.map((record) => enrichRecord(record, baseTs, target));
  const relevant = enriched.filter((record) => record.category !== 'other' || record.totalMs >= 500 || record.ttfbMs >= 300);
  const byCategory = summarizeByCategory(enriched);

  const report = {
    runIndex,
    target: target.toString(),
    navigationError,
    runtime,
    startup: summarizeStartup(runtime, byCategory),
    byCategory,
    relevant,
    slowestTtfb: [...enriched].sort((a, b) => b.ttfbMs - a.ttfbMs).slice(0, 12),
    slowestTotal: [...enriched].sort((a, b) => b.totalMs - a.totalMs).slice(0, 12),
    consoleMessages,
    pageErrors,
  };
  report.classification = classifyStartup(report);
  return report;
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

function readArgValue(name) {
  const prefix = `${name}=`;
  const arg = process.argv.slice(2).find((item) => item === name || item.startsWith(prefix));
  if (!arg) return '';
  if (arg === name) return '1';
  return arg.slice(prefix.length);
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

function firstMark(marks, name) {
  const mark = (marks || []).find((item) => item && item.name === name);
  return mark ? Math.round(mark.at) : null;
}

function firstWidgetMark(runtime, name) {
  return firstMark(runtime.widgetTimeline || [], name);
}

function firstBrowserMark(runtime, name) {
  return firstMark(runtime.marks || [], name);
}

function duration(start, end) {
  return start !== null && end !== null && end >= start ? end - start : null;
}

function categorySummary(groups, category) {
  return groups.find((group) => group.category === category) || null;
}

function summarizeStartup(runtime, groups) {
  const scriptTag = firstWidgetMark(runtime, 'script-tag-present') ?? firstBrowserMark(runtime, 'widget-script-tag-present');
  const loaderStart = firstWidgetMark(runtime, 'classic-loader-start');
  const runtimeImportStart = firstWidgetMark(runtime, 'runtime-import-start');
  const runtimeImportDone = firstWidgetMark(runtime, 'runtime-import-done');
  const runtimeEntryStart = firstWidgetMark(runtime, 'runtime-entry-start');
  const settingsStart = firstWidgetMark(runtime, 'settings-start');
  const settingsDone = firstWidgetMark(runtime, 'settings-done');
  const reviewsMainStart = firstWidgetMark(runtime, 'reviews-main-import-start');
  const reviewsMainDone = firstWidgetMark(runtime, 'reviews-main-import-done');
  const reviewsApiStart = firstWidgetMark(runtime, 'reviews-api-start');
  const reviewsApiDone = firstWidgetMark(runtime, 'reviews-api-done');
  const renderImportStart = firstWidgetMark(runtime, 'render-import-start');
  const renderImportDone = firstWidgetMark(runtime, 'render-import-done');
  const firstRenderStart = firstWidgetMark(runtime, 'first-render-start');
  const firstRenderDone = firstWidgetMark(runtime, 'first-render-done');
  const visible = firstWidgetMark(runtime, 'reviews-widget-visible') ?? firstBrowserMark(runtime, 'reviews-widget-visible');
  const staticGroup = categorySummary(groups, 'renuvex-static');
  const readApiGroup = categorySummary(groups, 'renuvex-read-api');
  const settingsGroup = categorySummary(groups, 'renuvex-settings-api');

  return {
    scriptTag,
    loaderStart,
    runtimeImportStart,
    runtimeImportDone,
    runtimeEntryStart,
    settingsStart,
    settingsDone,
    reviewsMainStart,
    reviewsMainDone,
    reviewsApiStart,
    reviewsApiDone,
    renderImportStart,
    renderImportDone,
    firstRenderStart,
    firstRenderDone,
    visible,
    runtimeImportMs: duration(runtimeImportStart, runtimeImportDone),
    settingsMs: duration(settingsStart, settingsDone),
    reviewsMainImportMs: duration(reviewsMainStart, reviewsMainDone),
    reviewsApiMs: duration(reviewsApiStart, reviewsApiDone),
    renderImportMs: duration(renderImportStart, renderImportDone),
    renderMs: duration(firstRenderStart, firstRenderDone),
    visibleFromRenderStartMs: duration(firstRenderStart, visible),
    visibleAfterRenderMs: duration(firstRenderDone, visible),
    staticMaxTtfb: staticGroup ? staticGroup.maxTtfb : null,
    readApiMaxTtfb: readApiGroup ? readApiGroup.maxTtfb : null,
    settingsMaxTtfb: settingsGroup ? settingsGroup.maxTtfb : null,
  };
}

function classifyStartup(report) {
  const startup = report.startup;
  if (!startup) return 'unknown';
  if (startup.scriptTag !== null && startup.scriptTag > 1000) return 'injection/discovery';
  if (startup.staticMaxTtfb !== null && startup.staticMaxTtfb > 220) return 'CDN/client-to-edge';
  if ((startup.runtimeImportMs !== null && startup.runtimeImportMs > 400) || (startup.renderImportMs !== null && startup.renderImportMs > 400)) {
    return 'chunk graph';
  }
  if ((startup.settingsMs !== null && startup.settingsMs > 400) || (startup.reviewsApiMs !== null && startup.reviewsApiMs > 400)) {
    return 'read API/cache/backend';
  }
  if (
    (startup.renderMs !== null && startup.renderMs > 400)
    || (startup.visibleFromRenderStartMs !== null && startup.visibleFromRenderStartMs > 500)
    || (startup.visibleAfterRenderMs !== null && startup.visibleAfterRenderMs > 300)
  ) {
    return 'render/main-thread/host page pressure';
  }
  return 'no single dominant bottleneck';
}

function formatMs(value) {
  return value === null || value === undefined ? 'n/a' : `${value} ms`;
}

function printStartupSummary(startup, classification) {
  console.log('');
  console.log('## Widget startup timeline');
  console.log(`Dominant classification: ${classification}`);
  console.log('| Segment | Value |');
  console.log('|---|---:|');
  console.log(`| Script tag present | ${formatMs(startup.scriptTag)} |`);
  console.log(`| Classic loader start | ${formatMs(startup.loaderStart)} |`);
  console.log(`| Runtime import | ${formatMs(startup.runtimeImportMs)} |`);
  console.log(`| Runtime entry start | ${formatMs(startup.runtimeEntryStart)} |`);
  console.log(`| Settings request | ${formatMs(startup.settingsMs)} |`);
  console.log(`| Reviews main import | ${formatMs(startup.reviewsMainImportMs)} |`);
  console.log(`| Reviews API | ${formatMs(startup.reviewsApiMs)} |`);
  console.log(`| Render import | ${formatMs(startup.renderImportMs)} |`);
  console.log(`| First render | ${formatMs(startup.renderMs)} |`);
  console.log(`| Visible from render start | ${formatMs(startup.visibleFromRenderStartMs)} |`);
  console.log(`| Visible after render | ${formatMs(startup.visibleAfterRenderMs)} |`);
  console.log(`| Reviews widget visible | ${formatMs(startup.visible)} |`);
  console.log(`| Static max TTFB | ${formatMs(startup.staticMaxTtfb)} |`);
  console.log(`| Read API max TTFB | ${formatMs(startup.readApiMaxTtfb)} |`);
  console.log(`| Settings max TTFB | ${formatMs(startup.settingsMaxTtfb)} |`);
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
  console.log('## Widget perf timeline');
  if (!report.runtime.widgetTimeline || report.runtime.widgetTimeline.length === 0) {
    console.log('- none');
  } else {
    for (const mark of report.runtime.widgetTimeline) {
      const detail = mark.detail ? ` ${JSON.stringify(mark.detail)}` : '';
      console.log(`- ${mark.name}: ${Math.round(mark.at)} ms${detail}`);
    }
  }

  printStartupSummary(report.startup, report.classification);

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

function printRunLine(report, run) {
  console.log(
    [
      `run=${run}`,
      `visible=${formatMs(report.startup.visible)}`,
      `staticMaxTtfb=${formatMs(report.startup.staticMaxTtfb)}`,
      `settings=${formatMs(report.startup.settingsMs)}`,
      `reviewsApi=${formatMs(report.startup.reviewsApiMs)}`,
      `render=${formatMs(report.startup.renderMs)}`,
      `classification=${report.classification}`,
      report.navigationError ? `navigationError=${trim(report.navigationError, 80)}` : '',
    ].filter(Boolean).join(' | '),
  );
}

function percentile(values, p) {
  const clean = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (clean.length === 0) return null;
  const idx = Math.min(clean.length - 1, Math.max(0, Math.ceil((p / 100) * clean.length) - 1));
  return clean[idx];
}

function stats(values) {
  const clean = values.filter((value) => Number.isFinite(value));
  if (clean.length === 0) return { min: null, median: null, p90: null, p95: null, max: null };
  return {
    min: Math.min(...clean),
    median: percentile(clean, 50),
    p90: percentile(clean, 90),
    p95: percentile(clean, 95),
    max: Math.max(...clean),
  };
}

function printStatsRow(label, values) {
  const row = stats(values);
  console.log(`| ${label} | ${formatMs(row.min)} | ${formatMs(row.median)} | ${formatMs(row.p90)} | ${formatMs(row.p95)} | ${formatMs(row.max)} |`);
}

function countBy(values) {
  const result = new Map();
  for (const value of values) result.set(value, (result.get(value) || 0) + 1);
  return Array.from(result.entries()).sort((a, b) => b[1] - a[1]);
}

function printMultiRunSummary(reports) {
  console.log('');
  console.log('# Storefront startup multi-run summary');
  console.log('');
  console.log(`Target: ${reports[0]?.target || ''}`);
  console.log(`Runs: ${reports.length}`);
  console.log('');
  console.log('| Metric | Min | Median | P90 | P95 | Max |');
  console.log('|---|---:|---:|---:|---:|---:|');
  printStatsRow('Reviews widget visible', reports.map((report) => report.startup.visible));
  printStatsRow('Static max TTFB', reports.map((report) => report.startup.staticMaxTtfb));
  printStatsRow('Settings duration', reports.map((report) => report.startup.settingsMs));
  printStatsRow('Reviews API duration', reports.map((report) => report.startup.reviewsApiMs));
  printStatsRow('Runtime import duration', reports.map((report) => report.startup.runtimeImportMs));
  printStatsRow('Render import duration', reports.map((report) => report.startup.renderImportMs));
  printStatsRow('First render duration', reports.map((report) => report.startup.renderMs));
  printStatsRow('Visible from render start', reports.map((report) => report.startup.visibleFromRenderStartMs));

  console.log('');
  console.log('## Classification counts');
  for (const [classification, count] of countBy(reports.map((report) => report.classification))) {
    console.log(`- ${classification}: ${count}`);
  }
}
