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
    html, body { background: transparent; scrollbar-width: thin; scrollbar-color: rgba(17,17,17,0.45) transparent; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; overflow-x: hidden; }
    body::-webkit-scrollbar { width: 12px; }
    body::-webkit-scrollbar-track { background: transparent; }
    body::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.45); border-radius: 999px; border: 3px solid transparent; background-clip: content-box; }
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
    window.__renuvexProductReviewsPreviewSettings = sessionStorage.getItem('renuvex_pr_preview_settings') || '';
    window.__ikasPreviewSettings = window.__renuvexProductReviewsPreviewSettings || '';
  </script>
  <!-- v= timestamp -> her preview acılısında widget.js bypass cache; admin
       degisiklik yapınca anında güncel goruntu (sadece preview, prod widget'a
       dokunulmaz). Endustri pratigi: Shopify themes ?v={{now|date}}, Industry standard
       benzer pattern. -->
  <script src="${baseUrl}/widget.js?publicApiKey=preview&v=${Date.now()}" async></script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
