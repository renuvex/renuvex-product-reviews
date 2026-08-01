import { createServer } from 'node:http';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { AppBridgeCallbackMessageType, AppBridgeMessageType } = require('@ikas/app-helpers');

const hostname = process.env.RENUVEX_ADMIN_HARNESS_HOSTNAME || '127.0.0.1';
const port = Number(process.env.RENUVEX_ADMIN_HARNESS_PORT || 3212);
const dashboardOrigin = process.env.RENUVEX_ADMIN_DASHBOARD_ORIGIN || 'http://127.0.0.1:3211';
const authorizedAppId = 'ci-authorized-app';

function base64Url(value) {
  return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url');
}

function buildSyntheticJwt() {
  const now = Math.floor(Date.now() / 1000);
  return [
    base64Url({ alg: 'HS256', typ: 'JWT' }),
    base64Url({ aud: authorizedAppId, sub: 'ci-merchant', iat: now, exp: now + 600 }),
    'ci-synthetic-signature',
  ].join('.');
}

function scriptValue(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function harnessDocument(scenario) {
  const token = buildSyntheticJwt();
  const messageTypes = {
    closeLoader: AppBridgeMessageType.CLOSE_LOADER,
    authorizedAppId: AppBridgeMessageType.AUTHORIZED_APP_ID,
    requestToken: AppBridgeMessageType.REQUEST_TOKEN,
    authorizedAppIdResponse: AppBridgeCallbackMessageType.AUTHORIZED_APP_ID_RESPONSE,
    requestTokenResponse: AppBridgeCallbackMessageType.REQUEST_TOKEN_RESPONSE,
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Renuvex admin test harness</title>
  <style>
    html, body { width: 100%; height: 100%; margin: 0; }
    iframe { width: 100%; height: 100%; border: 0; }
  </style>
</head>
<body>
  <iframe id="dashboard" title="Renuvex Admin Dashboard"></iframe>
  <script>
    (() => {
      const dashboardOrigin = ${scriptValue(dashboardOrigin)};
      const scenario = ${scriptValue(scenario)};
      const authorizedAppId = ${scriptValue(authorizedAppId)};
      const token = ${scriptValue(token)};
      const messageTypes = ${scriptValue(messageTypes)};
      const frame = document.getElementById('dashboard');
      const counts = {
        [messageTypes.closeLoader]: 0,
        [messageTypes.authorizedAppId]: 0,
        [messageTypes.requestToken]: 0,
      };

      window.__renuvexAdminHarness = { scenario, counts, rejectedMessages: 0 };

      window.addEventListener('message', (event) => {
        if (event.origin !== dashboardOrigin || event.source !== frame.contentWindow) {
          window.__renuvexAdminHarness.rejectedMessages += 1;
          return;
        }

        const type = event.data && event.data.type;
        if (Object.prototype.hasOwnProperty.call(counts, type)) counts[type] += 1;

        if (type === messageTypes.authorizedAppId) {
          frame.contentWindow.postMessage({
            type: messageTypes.authorizedAppIdResponse,
            data: {
              authorizedAppId: scenario === 'missing-id' ? null : authorizedAppId,
            },
          }, dashboardOrigin);
        }

        if (type === messageTypes.requestToken) {
          frame.contentWindow.postMessage({
            type: messageTypes.requestTokenResponse,
            data: {
              token: scenario === 'missing-token' ? null : token,
            },
          }, dashboardOrigin);
        }
      });

      frame.src = dashboardOrigin + '/dashboard';
    })();
  </script>
</body>
</html>`;
}

const server = createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${hostname}:${port}`);
  if (url.pathname === '/__health') {
    response.writeHead(204, { 'Cache-Control': 'no-store' });
    response.end();
    return;
  }

  if (url.pathname !== '/') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not Found');
    return;
  }

  const requestedScenario = url.searchParams.get('scenario');
  const scenario = ['success', 'missing-id', 'missing-token'].includes(requestedScenario || '')
    ? requestedScenario
    : 'success';
  const body = harnessDocument(scenario);
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/html; charset=utf-8',
    'Referrer-Policy': 'no-referrer',
  });
  response.end(body);
});

server.listen(port, hostname, () => {
  console.log(`[admin-harness] listening on http://${hostname}:${port}`);
});

function closeServer() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
