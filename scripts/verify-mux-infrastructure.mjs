// Read-only Mux video infrastructure check.
// This script never creates uploads, assets, webhooks, or playback IDs.

const REQUIRED_PRE_WEBHOOK_ENV = [
  'MUX_TOKEN_ID',
  'MUX_TOKEN_SECRET',
  'MUX_VIDEO_QUALITY',
  'MUX_SIGNING_KEY_ID',
  'MUX_SIGNING_KEY_PRIVATE',
  'QSTASH_TOKEN',
  'QSTASH_CURRENT_SIGNING_KEY',
  'QSTASH_NEXT_SIGNING_KEY',
  'MEDIA_JOB_BASE_URL',
];

const REQUIRED_POST_WEBHOOK_ENV = [
  ...REQUIRED_PRE_WEBHOOK_ENV,
  'MUX_WEBHOOK_SECRET',
];

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function phase() {
  const raw = [...process.argv].reverse().find((arg) => arg.startsWith('--phase='))?.slice('--phase='.length) || 'pre-webhook';
  if (raw !== 'pre-webhook' && raw !== 'post-webhook') {
    throw new Error('--phase must be pre-webhook or post-webhook');
  }
  return raw;
}

function jsonMode() {
  return hasFlag('json');
}

function output(result) {
  if (jsonMode()) console.log(JSON.stringify(result, null, 2));
  else console.dir(result, { depth: null, colors: process.stdout.isTTY });
}

function envPresent(name) {
  return typeof process.env[name] === 'string' && process.env[name].trim().length > 0;
}

function validateVideoQuality() {
  const value = process.env.MUX_VIDEO_QUALITY?.trim().toLowerCase();
  return value === 'basic' || value === 'plus';
}

function mediaJobEndpointLooksValid() {
  try {
    const base = new URL(process.env.MEDIA_JOB_BASE_URL ?? '');
    return base.protocol === 'https:';
  } catch {
    return false;
  }
}

async function verifyMuxReadAccess() {
  if (!envPresent('MUX_TOKEN_ID') || !envPresent('MUX_TOKEN_SECRET')) {
    return { ok: false, status: null, error: 'missing_mux_api_credentials' };
  }
  const auth = Buffer.from(`${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`).toString('base64');
  try {
    const response = await fetch('https://api.mux.com/video/v1/uploads?limit=1', {
      headers: { Authorization: `Basic ${auth}` },
    });
    return { ok: response.ok, status: response.status, error: response.ok ? null : 'mux_read_access_failed' };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error instanceof Error ? error.name : 'mux_read_access_error',
    };
  }
}

async function main() {
  const currentPhase = phase();
  const requiredEnv = currentPhase === 'post-webhook' ? REQUIRED_POST_WEBHOOK_ENV : REQUIRED_PRE_WEBHOOK_ENV;
  const missing = requiredEnv.filter((name) => !envPresent(name));
  const globalEnabled = process.env.VIDEO_REVIEWS_ENABLED === 'true';
  const muxReadAccess = await verifyMuxReadAccess();
  const result = {
    mode: 'read-only',
    phase: currentPhase,
    globalEnabled,
    expectDisabled: hasFlag('expect-disabled'),
    env: {
      missing,
      webhookSecretRequired: currentPhase === 'post-webhook',
      videoQualityValid: validateVideoQuality(),
      mediaJobEndpointValid: mediaJobEndpointLooksValid(),
    },
    muxReadAccess,
  };
  output(result);
  if (hasFlag('expect-disabled') && globalEnabled) {
    throw new Error('VIDEO_REVIEWS_ENABLED is true while --expect-disabled was requested');
  }
  if (missing.length > 0 || !result.env.videoQualityValid || !result.env.mediaJobEndpointValid || !muxReadAccess.ok) {
    throw new Error('Mux video infrastructure check failed');
  }
}

main().catch((error) => {
  console.error(`[verify-mux-infrastructure] ${error instanceof Error ? error.message : 'unknown_error'}`);
  process.exitCode = 1;
});
