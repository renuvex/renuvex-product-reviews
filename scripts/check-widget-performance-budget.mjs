import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const args = process.argv.slice(2);

const options = {
  configPath: readArgValue('--config') || 'config/widget-performance-budget.json',
  includeNetwork: args.includes('--include-network'),
  networkReportPath: readArgValue('--network-report'),
  warnOnly: args.includes('--warn'),
};

const config = readJson(options.configPath);
const manifest = readJson('public/widget-runtime/build-manifest.json');
const manifestOutputs = Array.isArray(manifest.outputs) ? manifest.outputs : [];
const outputByFile = new Map(manifestOutputs.map((output) => [normalizeManifestPath(output.file), output]));
const findings = [];

checkArtifactBudgets();

if (options.includeNetwork || options.networkReportPath) {
  const report = options.networkReportPath ? readJson(options.networkReportPath) : runDeployedWidgetMeasurement();
  checkSyntheticNetworkBudgets(report);
}

printFindings();

const failures = findings.filter((finding) => finding.status === 'fail');
if (failures.length > 0 && !options.warnOnly) {
  process.exitCode = 1;
}

function readArgValue(name) {
  const exact = args.find((arg) => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : '';
}

function readJson(filePath) {
  const absolutePath = path.resolve(rootDir, filePath);
  return JSON.parse(readFileSync(absolutePath, 'utf8'));
}

function normalizeManifestPath(filePath) {
  return String(filePath || '').replace(/\\/g, '/').replace(/^public\//, '');
}

function fileSize(relativePath) {
  const absolutePath = path.resolve(rootDir, relativePath);
  if (!existsSync(absolutePath)) {
    addFinding('fail', relativePath, 0, 0, 'file is missing');
    return 0;
  }
  return readFileSync(absolutePath).byteLength;
}

function manifestBytes(filePath) {
  const output = outputByFile.get(normalizeManifestPath(filePath));
  return output ? Number(output.bytes || 0) : 0;
}

function findOutputByPrefix(prefix) {
  return manifestOutputs.find((output) => path.basename(output.file).startsWith(prefix)) || null;
}

function staticGraphBytes(filePath, seen = new Set()) {
  const normalized = normalizeManifestPath(filePath);
  if (seen.has(normalized)) return 0;
  seen.add(normalized);

  const output = outputByFile.get(normalized);
  if (!output) return 0;

  let total = Number(output.bytes || 0);
  for (const item of output.imports || []) {
    if (item.kind === 'import-statement') {
      total += staticGraphBytes(item.path, seen);
    }
  }
  return total;
}

function dynamicImportGraphBytes(filePath) {
  const output = outputByFile.get(normalizeManifestPath(filePath));
  if (!output) return 0;

  const seen = new Set();
  let total = 0;
  for (const item of output.imports || []) {
    if (item.kind === 'dynamic-import') {
      total += staticGraphBytes(item.path, seen);
    }
  }
  return total;
}

function checkArtifactBudgets() {
  const budget = config.artifactBudgets || {};
  const widgetJsBytes = fileSize('public/widget.js');
  const stableRuntimePath = manifest.stableEntry ? `public/${manifest.stableEntry}` : '';
  const stableRuntimeBytes = stableRuntimePath ? fileSize(stableRuntimePath) : 0;
  const runtimeEntryBytes = manifestBytes(manifest.entry);
  const alwaysLoadedGraphBytes = widgetJsBytes + staticGraphBytes(manifest.entry);

  const bootstrap = findOutputByPrefix('bootstrap-');
  const listingBadges = findOutputByPrefix('listing-badges-');
  const ratingBadge = findOutputByPrefix('rating-badge-');
  const structuredData = findOutputByPrefix('structured-data-');
  const reviewRender = findOutputByPrefix('render-');

  checkMax('artifact: public/widget.js raw bytes', widgetJsBytes, budget.widgetJsMaxBytes);
  checkMax('artifact: stable runtime shim raw bytes', stableRuntimeBytes, budget.stableRuntimeShimMaxBytes);
  checkMax('artifact: runtime entry raw bytes', runtimeEntryBytes, budget.runtimeEntryMaxBytes);
  checkMax('artifact: always-loaded graph raw bytes', alwaysLoadedGraphBytes, budget.alwaysLoadedGraphMaxBytes);
  checkMax('artifact: bootstrap static graph raw bytes', bootstrap ? staticGraphBytes(bootstrap.file) : 0, budget.bootstrapStaticGraphMaxBytes);
  checkMax('artifact: listing badges static graph raw bytes', listingBadges ? staticGraphBytes(listingBadges.file) : 0, budget.listingBadgesStaticGraphMaxBytes);
  checkMax('artifact: rating badge static graph raw bytes', ratingBadge ? staticGraphBytes(ratingBadge.file) : 0, budget.ratingBadgeStaticGraphMaxBytes);
  checkMax('artifact: structured data static graph raw bytes', structuredData ? staticGraphBytes(structuredData.file) : 0, budget.structuredDataStaticGraphMaxBytes);
  checkMax('artifact: review render entry raw bytes', reviewRender ? Number(reviewRender.bytes || 0) : 0, budget.reviewRenderEntryMaxBytes);
  checkMax('artifact: review render static graph raw bytes', reviewRender ? staticGraphBytes(reviewRender.file) : 0, budget.reviewRenderStaticGraphMaxBytes);
  checkMax('artifact: review deferred dynamic graph raw bytes', reviewRender ? dynamicImportGraphBytes(reviewRender.file) : 0, budget.reviewDeferredDynamicGraphMaxBytes);
  checkMax('artifact: max single manifest output raw bytes', Math.max(0, ...manifestOutputs.map((output) => Number(output.bytes || 0))), budget.maxSingleManifestOutputBytes);
  checkMax('artifact: manifest output count', manifestOutputs.length, budget.maxManifestOutputCount);
}

function runDeployedWidgetMeasurement() {
  const result = spawnSync(process.execPath, ['scripts/measure-deployed-widget-network.mjs', '--json'], {
    cwd: rootDir,
    encoding: 'utf8',
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    const detail = result.stderr.trim() || result.stdout.trim() || `exit ${result.status}`;
    addFinding('fail', 'network: deployed widget measurement', 0, 0, detail);
    return [];
  }

  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    addFinding('fail', 'network: deployed widget measurement JSON', 0, 0, error instanceof Error ? error.message : String(error));
    return [];
  }
}

function checkSyntheticNetworkBudgets(report) {
  const budgets = config.syntheticNetworkBudgets || {};
  const byScenario = new Map((Array.isArray(report) ? report : []).map((item) => [item.scenario, item]));

  for (const [scenario, budget] of Object.entries(budgets)) {
    const result = byScenario.get(scenario);
    if (!result) {
      addFinding('fail', `network: ${scenario}`, 0, 0, 'scenario is missing from measurement report');
      continue;
    }

    checkMax(`network: ${scenario} script count`, Number(result.scriptCount || 0), budget.scriptCountMax);
    checkMax(`network: ${scenario} encoded transfer bytes`, Number(result.encodedTransferBytes || 0), budget.encodedTransferBytesMax);
    checkMax(`network: ${scenario} decoded bytes`, Number(result.decodedBytes || 0), budget.decodedBytesMax);

    for (const [key, expected] of Object.entries(budget.apiCalls || {})) {
      const actual = Number(result.apiCalls?.[key] ?? 0);
      if (actual !== expected) {
        addFinding('fail', `network: ${scenario} apiCalls.${key}`, actual, expected, 'expected exact API call count');
      } else {
        addFinding('pass', `network: ${scenario} apiCalls.${key}`, actual, expected);
      }
    }

    for (const prefix of budget.requiredChunkPrefixes || []) {
      const hasChunk = (result.chunks || []).some((chunk) => String(chunk).startsWith(prefix));
      addFinding(hasChunk ? 'pass' : 'fail', `network: ${scenario} requires ${prefix}`, hasChunk ? 1 : 0, 1);
    }

    for (const prefix of budget.forbiddenChunkPrefixes || []) {
      const hasChunk = (result.chunks || []).some((chunk) => String(chunk).startsWith(prefix));
      addFinding(hasChunk ? 'fail' : 'pass', `network: ${scenario} forbids ${prefix}`, hasChunk ? 1 : 0, 0);
    }
  }
}

function checkMax(label, actual, max) {
  if (typeof max !== 'number') return;
  addFinding(actual <= max ? 'pass' : 'fail', label, actual, max);
}

function addFinding(status, label, actual, limit, note = '') {
  findings.push({ status, label, actual, limit, note });
}

function printFindings() {
  console.log('# Widget performance budget');
  console.log('');
  console.log(`Mode: ${options.warnOnly ? 'warn' : 'fail-on-budget-exceed'}`);
  console.log(`Config: ${path.relative(rootDir, path.resolve(rootDir, options.configPath))}`);
  console.log('');
  console.log('| Status | Check | Actual | Budget | Note |');
  console.log('|---|---|---:|---:|---|');
  for (const finding of findings) {
    const status = finding.status === 'pass' ? 'PASS' : options.warnOnly ? 'WARN' : 'FAIL';
    console.log(`| ${status} | ${finding.label} | ${finding.actual} | ${finding.limit} | ${finding.note || ''} |`);
  }
  console.log('');

  const failures = findings.filter((finding) => finding.status === 'fail');
  if (failures.length === 0) {
    console.log('All widget performance budgets passed.');
  } else if (options.warnOnly) {
    console.log(`${failures.length} widget performance budget warning(s).`);
  } else {
    console.log(`${failures.length} widget performance budget failure(s).`);
  }
}
