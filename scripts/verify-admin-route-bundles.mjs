import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const root = process.cwd();
const nextDirectory = path.join(root, '.next');

const routeDefinitions = {
  reviews: {
    appPath: '/dashboard/reviews/page',
    manifest: 'server/app/dashboard/reviews/page_client-reference-manifest.js',
    owner: 'src/features/review-moderation/ReviewModerationScreen.tsx',
    expectedRouteChunk: '/app/dashboard/reviews/page-',
  },
  catalog: {
    appPath: '/dashboard/widgets/page',
    manifest: 'server/app/dashboard/widgets/page_client-reference-manifest.js',
    owner: 'src/features/widget-management/WidgetCatalogScreen.tsx',
    expectedRouteChunk: '/app/dashboard/widgets/page-',
  },
  editor: {
    appPath: '/dashboard/widgets/[widgetId]/page',
    manifest: 'server/app/dashboard/widgets/[widgetId]/page_client-reference-manifest.js',
    owner: 'src/features/widget-management/WidgetEditorScreen.tsx',
    expectedRouteChunk: '/app/dashboard/widgets/%5BwidgetId%5D/page-',
  },
};

function fail(message) {
  console.error(`admin_route_bundle_verification_failed:${message}`);
  process.exit(1);
}

function normalize(value) {
  return value.replaceAll('\\', '/');
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(nextDirectory, relativePath), 'utf8'));
}

function readClientManifest(relativePath) {
  const source = readFileSync(path.join(nextDirectory, relativePath), 'utf8');
  const assignment = source.lastIndexOf(']=');
  const terminator = source.lastIndexOf(';');
  if (assignment < 0 || terminator <= assignment) fail(`unrecognized_manifest_format:${relativePath}`);
  let parsed;
  try {
    parsed = JSON.parse(source.slice(assignment + 2, terminator));
  } catch {
    fail(`invalid_manifest_json:${relativePath}`);
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.clientModules || typeof parsed.clientModules !== 'object') {
    fail(`missing_client_modules:${relativePath}`);
  }
  return parsed;
}

function moduleChunks(manifest, moduleSuffix) {
  const entry = Object.entries(manifest.clientModules).find(([modulePath]) => normalize(modulePath).endsWith(moduleSuffix));
  if (!entry) fail(`missing_client_module:${moduleSuffix}`);
  const chunks = entry[1]?.chunks;
  if (!Array.isArray(chunks)) fail(`invalid_client_module_chunks:${moduleSuffix}`);
  return [...new Set(chunks.filter((value) => typeof value === 'string' && value.includes('/') && value.endsWith('.js')).map(normalize))];
}

function measure(chunks) {
  let rawBytes = 0;
  let gzipBytes = 0;
  for (const chunk of chunks) {
    const content = readFileSync(path.join(nextDirectory, decodeURIComponent(chunk)));
    rawBytes += content.byteLength;
    gzipBytes += gzipSync(content).byteLength;
  }
  return { rawBytes, gzipBytes };
}

const appPaths = readJson('server/app-paths-manifest.json');
for (const definition of Object.values(routeDefinitions)) {
  if (typeof appPaths[definition.appPath] !== 'string') fail(`missing_app_route:${definition.appPath}`);
}

const manifests = Object.fromEntries(Object.entries(routeDefinitions).map(([key, definition]) => [
  key,
  readClientManifest(definition.manifest),
]));

const routeChunks = Object.fromEntries(Object.entries(routeDefinitions).map(([key, definition]) => {
  const chunks = moduleChunks(manifests[key], definition.owner);
  if (chunks.length === 0) fail(`empty_route_owner_chunks:${key}`);
  if (!chunks.some((chunk) => chunk.includes(definition.expectedRouteChunk))) fail(`missing_route_owned_chunk:${key}`);
  return [key, chunks];
}));

const editorOwner = routeDefinitions.editor.owner;
const reviewOwner = routeDefinitions.reviews.owner;
const catalogOwner = routeDefinitions.catalog.owner;
if (moduleChunks(manifests.reviews, editorOwner).length !== 0) fail('editor_chunks_leaked_into_reviews');
if (moduleChunks(manifests.reviews, catalogOwner).length !== 0) fail('catalog_chunks_leaked_into_reviews');
if (moduleChunks(manifests.catalog, editorOwner).length !== 0) fail('editor_chunks_leaked_into_catalog');
if (moduleChunks(manifests.catalog, reviewOwner).length !== 0) fail('review_chunks_leaked_into_catalog');

const chunkSignatures = Object.values(routeChunks).map((chunks) => [...chunks].sort().join('|'));
if (new Set(chunkSignatures).size !== chunkSignatures.length) fail('route_owner_chunk_sets_not_distinct');

const report = Object.fromEntries(Object.entries(routeChunks).map(([key, chunks]) => [key, {
  appPath: routeDefinitions[key].appPath,
  ownerModule: routeDefinitions[key].owner,
  chunks,
  ...measure(chunks),
}]));

console.log(JSON.stringify({
  status: 'admin_route_owner_chunks_verified',
  measurement: {
    source: 'next_client_reference_manifest',
    scope: 'selected_owner_module_chunk_sets_not_complete_route_initial_javascript',
  },
  ownerModuleChunkSets: report,
}, null, 2));
