import {
  AbortMultipartUploadCommand,
  CreateMultipartUploadCommand,
  HeadBucketCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';
import { request as httpsRequest } from 'node:https';

const REQUIRED_ENV = [
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_R2_ENDPOINT',
  'CLOUDFLARE_R2_ACCESS_KEY_ID',
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_R2_MASTER_BUCKET',
  'CLOUDFLARE_R2_INGEST_BUCKET',
  'CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL',
  'CLOUDFLARE_STREAM_API_TOKEN',
  'CLOUDFLARE_STREAM_CUSTOMER_CODE',
  'CLOUDFLARE_STREAM_WEBHOOK_SECRET',
  'VIDEO_REVIEWS_ENABLED',
];

const options = {
  requireWebhook: process.argv.includes('--require-webhook'),
  expectDisabled: process.argv.includes('--expect-disabled'),
  writeProbe: process.argv.includes('--write-probe'),
  corsOrigin: readOption('--cors-origin') ?? 'https://merchant-storefront.invalid',
};

let failures = 0;
let warnings = 0;

function readOption(name) {
  const prefix = `${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function warn(message) {
  warnings += 1;
  console.warn(`WARN ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    fail(`${name} is missing`);
    return '';
  }
  return value;
}

function normalizedBaseUrl(value, name) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') {
      fail(`${name} must use HTTPS`);
      return null;
    }
    parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    parsed.search = '';
    parsed.hash = '';
    return parsed;
  } catch {
    fail(`${name} is not a valid URL`);
    return null;
  }
}

async function verifyBucketAccess(s3, bucket, label) {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    pass(`${label} bucket is accessible (${bucket})`);
  } catch (error) {
    fail(`${label} bucket is not accessible (${error instanceof Error ? error.name : 'unknown_error'})`);
  }
}

async function verifyMasterCors(endpoint, bucket) {
  const target = new URL(`${encodeURIComponent(bucket)}/__renuvex_cors_probe__`, endpoint);
  let response;
  try {
    response = await new Promise((resolve, reject) => {
      const request = httpsRequest(target, {
        method: 'OPTIONS',
        headers: {
          Origin: options.corsOrigin,
          'Access-Control-Request-Method': 'PUT',
          'Access-Control-Request-Headers': 'content-type',
        },
      }, (result) => {
        result.resume();
        result.on('end', () => resolve({
          status: result.statusCode ?? 0,
          allowedOrigin: result.headers['access-control-allow-origin'] ?? null,
          allowedMethods: result.headers['access-control-allow-methods'] ?? '',
        }));
      });
      request.on('error', reject);
      request.end();
    });
  } catch (error) {
    fail(`master bucket CORS preflight could not be sent (${error instanceof Error ? error.name : 'unknown_error'})`);
    return;
  }

  const originAllowed = response.allowedOrigin === '*' || response.allowedOrigin === options.corsOrigin;
  const putAllowed = response.allowedMethods.split(',').some((method) => method.trim().toUpperCase() === 'PUT');

  if (response.status !== 204 || !originAllowed || !putAllowed) {
    fail(
      `master bucket CORS does not support arbitrary merchant uploads `
      + `(status=${response.status}, origin=${response.allowedOrigin ?? 'missing'}, PUT=${putAllowed})`,
    );
    return;
  }
  pass(`master bucket CORS accepts merchant origin ${options.corsOrigin}`);
}

async function verifyMultipartPut(s3, bucket) {
  const key = `infrastructure-probes/${randomUUID()}.mp4`;
  let uploadId;
  let probeFailed = false;
  try {
    const created = await s3.send(new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      ContentType: 'video/mp4',
    }));
    uploadId = created.UploadId;
    if (!uploadId) {
      fail('multipart write probe did not receive an upload id');
      return;
    }
    const uploadUrl = await getSignedUrl(s3, new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: 1,
    }), { expiresIn: 300 });
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { Origin: options.corsOrigin },
      body: Buffer.alloc(1024, 1),
    });
    const allowedOrigin = response.headers.get('access-control-allow-origin');
    const exposedHeaders = response.headers.get('access-control-expose-headers') ?? '';
    const etag = response.headers.get('etag');
    const originAllowed = allowedOrigin === '*' || allowedOrigin === options.corsOrigin;
    const etagExposed = exposedHeaders.split(',').some((header) => header.trim().toLowerCase() === 'etag');
    if (!response.ok || !originAllowed || !etagExposed || !etag) {
      probeFailed = true;
      fail(
        `multipart write probe failed `
        + `(status=${response.status}, origin=${allowedOrigin ?? 'missing'}, ETag=${Boolean(etag)}, exposed=${etagExposed})`,
      );
      return;
    }
    pass('presigned multipart PUT accepts the merchant origin and exposes a readable ETag');
  } catch (error) {
    probeFailed = true;
    fail(`multipart write probe failed (${error instanceof Error ? error.name : 'unknown_error'})`);
  } finally {
    if (uploadId) {
      try {
        await s3.send(new AbortMultipartUploadCommand({ Bucket: bucket, Key: key, UploadId: uploadId }));
        pass('multipart write probe was aborted and cleaned up');
      } catch (error) {
        fail(`multipart write probe cleanup failed (${error instanceof Error ? error.name : 'unknown_error'})`);
      }
    } else if (!probeFailed) {
      fail('multipart write probe could not be cleaned up because no upload id was returned');
    }
  }
}

async function verifyIngestDomain(baseUrl) {
  try {
    const response = await fetch(baseUrl, { method: 'HEAD', redirect: 'manual' });
    if (response.status >= 500) {
      fail(`public ingest domain returned ${response.status}`);
      return;
    }
    pass(`public ingest domain is reachable (HTTP ${response.status})`);
  } catch (error) {
    fail(`public ingest domain is unreachable (${error instanceof Error ? error.name : 'unknown_error'})`);
  }
}

async function cloudflareRequest(accountId, token, path) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const payload = await response.json().catch(() => null);
  return { response, payload };
}

async function verifyStream(accountId, token) {
  try {
    const { response, payload } = await cloudflareRequest(accountId, token, '/stream?per_page=1');
    if (!response.ok || payload?.success !== true) {
      fail(`Cloudflare Stream API access failed (HTTP ${response.status})`);
      return;
    }
    pass('Cloudflare Stream API token is valid');
  } catch (error) {
    fail(`Cloudflare Stream API check failed (${error instanceof Error ? error.name : 'unknown_error'})`);
  }
}

async function verifyStreamWebhook(accountId, token) {
  try {
    const { response, payload } = await cloudflareRequest(accountId, token, '/stream/webhook');
    if (response.ok && payload?.success === true && payload?.result?.notificationUrl) {
      pass(`Cloudflare Stream webhook is configured (${new URL(payload.result.notificationUrl).origin})`);
      return;
    }
    const message = `Cloudflare Stream webhook is not configured (HTTP ${response.status})`;
    if (options.requireWebhook) fail(message);
    else warn(message);
  } catch (error) {
    const message = `Cloudflare Stream webhook check failed (${error instanceof Error ? error.name : 'unknown_error'})`;
    if (options.requireWebhook) fail(message);
    else warn(message);
  }
}

async function main() {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) {
    for (const name of missing) fail(`${name} is missing`);
    return;
  }
  pass('required video infrastructure environment variables are present');

  if (options.expectDisabled) {
    if (process.env.VIDEO_REVIEWS_ENABLED === 'false') pass('global video feature flag is disabled');
    else fail('VIDEO_REVIEWS_ENABLED must be false before canary activation');
  }

  const endpoint = normalizedBaseUrl(required('CLOUDFLARE_R2_ENDPOINT'), 'CLOUDFLARE_R2_ENDPOINT');
  const ingestBaseUrl = normalizedBaseUrl(required('CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL'), 'CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL');
  if (!endpoint || !ingestBaseUrl) return;

  const masterBucket = required('CLOUDFLARE_R2_MASTER_BUCKET');
  const ingestBucket = required('CLOUDFLARE_R2_INGEST_BUCKET');
  if (masterBucket === ingestBucket) fail('master and ingest buckets must be different');
  else pass('master and ingest buckets are isolated');

  const s3 = new S3Client({
    region: 'auto',
    endpoint: endpoint.toString(),
    credentials: {
      accessKeyId: required('CLOUDFLARE_R2_ACCESS_KEY_ID'),
      secretAccessKey: required('CLOUDFLARE_R2_SECRET_ACCESS_KEY'),
    },
  });

  await verifyBucketAccess(s3, masterBucket, 'private master');
  await verifyBucketAccess(s3, ingestBucket, 'transient ingest');
  await verifyMasterCors(endpoint, masterBucket);
  if (options.writeProbe) await verifyMultipartPut(s3, masterBucket);
  await verifyIngestDomain(ingestBaseUrl);
  await verifyStream(required('CLOUDFLARE_ACCOUNT_ID'), required('CLOUDFLARE_STREAM_API_TOKEN'));
  await verifyStreamWebhook(required('CLOUDFLARE_ACCOUNT_ID'), required('CLOUDFLARE_STREAM_API_TOKEN'));
}

await main();
console.log(`RESULT failures=${failures} warnings=${warnings}`);
if (failures > 0) process.exitCode = 1;
