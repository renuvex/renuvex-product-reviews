import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /preview
 * Returns a standalone HTML page for iframe widget preview.
 * Uses route handler to bypass Next.js root layout.
 */
export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; }
    .preview-container { max-width: 100%; padding: 24px; }
  </style>
</head>
<body>
  <div class="preview-container">
    <div id="ikas-reviews-anchor"></div>
  </div>

  <script>
    window.__ikasPreviewMode = true;
    window.__ikasPreviewBaseUrl = '${baseUrl}';
    window.__ikasPreviewSettings = sessionStorage.getItem('ikr_preview_settings') || '';
  </script>
  <script src="${baseUrl}/widget.js?publicApiKey=preview" async></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
