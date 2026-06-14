export const VIDEO_CANARY_DEFAULT_QUOTA = 5;
export const VIDEO_CANARY_MAX_QUOTA = 100_000;

const STORE_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;
const ALLOWED_EXACT_ARGS = new Set([
  '--apply',
  '--expect-all-disabled',
  '--json',
  '--allow-live-activation',
]);
const ALLOWED_VALUE_ARGS = [
  '--storeId=',
  '--confirmStoreId=',
  '--quota=',
  '--toggle=',
];

function valueArg(argv, name) {
  const prefix = `--${name}=`;
  return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length).trim() ?? null;
}

function hasFlag(argv, name) {
  return argv.includes(`--${name}`);
}

function assertKnownArgs(argv) {
  const unknown = argv.slice(2).filter((arg) => (
    !ALLOWED_EXACT_ARGS.has(arg) &&
    !ALLOWED_VALUE_ARGS.some((prefix) => arg.startsWith(prefix))
  ));
  if (unknown.length > 0) throw new Error(`Unknown argument(s): ${unknown.join(', ')}`);
}

export function normalizeStoreId(value) {
  const normalized = typeof value === 'string' ? value.trim() : '';
  return STORE_ID_PATTERN.test(normalized) ? normalized : null;
}

export function parseVideoToggle(value) {
  if (value === null || value === undefined || value === '') return null;
  const normalized = String(value).trim().toLowerCase();
  if (['true', 'on', 'enabled'].includes(normalized)) return true;
  if (['false', 'off', 'disabled'].includes(normalized)) return false;
  throw new Error('--toggle must be one of: on, off, true, false, enabled, disabled');
}

export function parseVideoQuota(value) {
  if (value === null || value === undefined || value === '') return null;
  if (!/^\d+$/.test(String(value).trim())) throw new Error('--quota must be a non-negative integer');
  const quota = Number(value);
  if (!Number.isSafeInteger(quota) || quota > VIDEO_CANARY_MAX_QUOTA) {
    throw new Error(`--quota must be between 0 and ${VIDEO_CANARY_MAX_QUOTA}`);
  }
  return quota;
}

export function parseCanaryOptions(argv) {
  assertKnownArgs(argv);
  const storeIdValue = valueArg(argv, 'storeId');
  const confirmStoreIdValue = valueArg(argv, 'confirmStoreId');
  const storeId = storeIdValue === null ? null : normalizeStoreId(storeIdValue);
  const confirmStoreId = confirmStoreIdValue === null ? null : normalizeStoreId(confirmStoreIdValue);
  if (storeIdValue !== null && !storeId) throw new Error('--storeId has an invalid format');
  if (confirmStoreIdValue !== null && !confirmStoreId) throw new Error('--confirmStoreId has an invalid format');

  const options = {
    storeId,
    confirmStoreId,
    quota: parseVideoQuota(valueArg(argv, 'quota')),
    toggle: parseVideoToggle(valueArg(argv, 'toggle')),
    apply: hasFlag(argv, 'apply'),
    expectAllDisabled: hasFlag(argv, 'expect-all-disabled'),
    json: hasFlag(argv, 'json'),
    allowLiveActivation: hasFlag(argv, 'allow-live-activation'),
  };

  const hasMutation = options.quota !== null || options.toggle !== null;
  if (hasMutation && !options.storeId) throw new Error('--quota and --toggle require --storeId');
  if (options.apply && !hasMutation) throw new Error('--apply requires --quota and/or --toggle');
  if (options.apply && options.confirmStoreId !== options.storeId) {
    throw new Error('--apply requires --confirmStoreId to exactly match --storeId');
  }
  if (options.expectAllDisabled && (options.apply || hasMutation)) {
    throw new Error('--expect-all-disabled cannot be combined with mutation options');
  }
  return options;
}

export function asSettingsObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? { ...value } : {};
}

export function readVideoToggle(value) {
  return asSettingsObject(value).videoReviewsEnabled === true;
}

export function mergeVideoToggle(value, enabled) {
  return { ...asSettingsObject(value), videoReviewsEnabled: enabled };
}

export function effectiveVideoGate({ globalEnabled, quota, toggle }) {
  return globalEnabled === true && toggle === true && Number.isInteger(quota) && quota > 0;
}

export function buildStoreGateRow(store, widget, globalEnabled) {
  const toggle = readVideoToggle(widget?.settings);
  const quota = store.videoMonthlyLimit;
  return {
    storeId: store.storeId,
    quota,
    toggle,
    globalEnabled,
    effective: effectiveVideoGate({ globalEnabled, quota, toggle }),
    hasReviewsSettings: Boolean(widget),
  };
}

export function summarizeGateRows(rows) {
  return {
    stores: rows.length,
    quotaEnabled: rows.filter((row) => row.quota > 0).length,
    togglesEnabled: rows.filter((row) => row.toggle).length,
    effectivelyEnabled: rows.filter((row) => row.effective).length,
    allDisabled: rows.every((row) => row.quota === 0 && row.toggle === false && row.effective === false),
  };
}

export function buildMutationPreview(current, options, globalEnabled) {
  const next = {
    quota: options.quota ?? current.quota,
    toggle: options.toggle ?? current.toggle,
  };
  const currentEffective = effectiveVideoGate({ globalEnabled, ...current });
  const nextEffective = effectiveVideoGate({ globalEnabled, ...next });
  if (options.apply && !currentEffective && nextEffective && !options.allowLiveActivation) {
    throw new Error(
      'This change would activate video immediately because the global flag is true. '
      + 'Apply quota/toggle while the flag is false, or explicitly add --allow-live-activation.',
    );
  }
  return {
    current: { ...current, effective: currentEffective },
    next: { ...next, effective: nextEffective },
    changed: current.quota !== next.quota || current.toggle !== next.toggle,
  };
}

export function countBy(rows, key) {
  return Object.fromEntries(rows.map((row) => [String(row[key]), row._count._all]));
}

