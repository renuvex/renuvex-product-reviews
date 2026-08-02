function scriptValue(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function reviewsFixture() {
  return `
    <main class="preview-page preview-page--reviews">
      <div data-renuvex-widget="reviews"></div>
    </main>`;
}

function badgePdpFixture() {
  return `
    <main class="preview-page preview-page--pdp">
      <div class="preview-product">
        <div class="preview-product__media" aria-hidden="true">
          <img src="/preview-assets/review-photo-1.svg" alt="" />
        </div>
        <section class="preview-product__details">
          <span class="preview-eyebrow">Yeni sezon</span>
          <h1>Örnek Ürün</h1>
          <p class="preview-price">1.249,00 TL</p>
          <p class="preview-copy">Ürün detay sayfasındaki yıldız rozeti yerleşimi.</p>
          <div id="renuvex-reviews" class="preview-reviews-anchor" aria-hidden="true"></div>
        </section>
      </div>
    </main>`;
}

function badgeListingFixture() {
  var products = [
    ['preview-shirt', 'Klasik Gömlek', '1.249,00 TL', 'review-photo-1.svg'],
    ['preview-shorts', 'Premium Şort', '899,00 TL', 'review-photo-2.svg'],
    ['preview-jacket', 'Hafif Ceket', '1.799,00 TL', 'review-photo-3.svg'],
  ];

  return `
    <main class="preview-page preview-page--listing">
      <div class="preview-listing">
        ${products.map(function (product) {
          return `
          <a
            class="preview-card"
            data-renuvex-preview-product-card="${product[0]}"
            href="/${product[0]}"
          >
            <span class="preview-card__media"><img src="/preview-assets/${product[3]}" alt="" /></span>
            <span class="preview-card__name">${product[1]}</span>
            <span class="preview-card__price">${product[2]}</span>
          </a>`;
        }).join('')}
      </div>
    </main>`;
}

function fixtureMarkup(context) {
  if (context.widgetId === 'badge' && context.scene === 'pdp') return badgePdpFixture();
  if (context.widgetId === 'badge' && context.scene === 'listing') return badgeListingFixture();
  return reviewsFixture();
}

export function buildPreviewDocument(context) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { box-sizing: border-box; }
    html, body { min-height: 100%; margin: 0; background: transparent; scrollbar-width: thin; scrollbar-color: rgba(17,17,17,0.45) transparent; }
    body { color: #171717; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; overflow-x: hidden; }
    body::-webkit-scrollbar { width: 12px; }
    body::-webkit-scrollbar-track { background: transparent; }
    body::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.45); border: 3px solid transparent; border-radius: 999px; background-clip: content-box; }
    img { display: block; max-width: 100%; }
    .preview-page { width: 100%; padding: 24px; }
    .preview-product { display: grid; grid-template-columns: minmax(180px, 0.9fr) minmax(220px, 1.1fr); gap: 32px; max-width: 900px; margin: 0 auto; }
    .preview-product__media, .preview-card__media { overflow: hidden; background: #f2f4f7; border: 1px solid #e5e7eb; }
    .preview-product__media { aspect-ratio: 4 / 5; }
    .preview-product__media img, .preview-card__media img { width: 100%; height: 100%; object-fit: cover; }
    .preview-product__details { min-width: 0; padding-top: 20px; }
    .preview-eyebrow { display: block; margin-bottom: 10px; color: #667085; font-size: 12px; text-transform: uppercase; }
    .preview-product h1 { margin: 0; font-size: 28px; font-weight: 650; line-height: 1.2; }
    .preview-price { margin: 18px 0 12px; font-size: 18px; font-weight: 650; }
    .preview-copy { max-width: 42ch; margin: 0; color: #667085; font-size: 14px; line-height: 1.55; }
    .preview-reviews-anchor { min-height: 1px; margin-top: 32px; }
    .preview-listing { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; max-width: 940px; margin: 0 auto; }
    .preview-card { display: flex; min-width: 0; flex-direction: column; color: inherit; text-decoration: none; }
    .preview-card__media { width: 100%; aspect-ratio: 4 / 5; margin-bottom: 12px; }
    .preview-card__name { overflow-wrap: anywhere; font-size: 15px; font-weight: 600; line-height: 1.35; }
    .preview-card__price { margin-top: 6px; color: #667085; font-size: 13px; }
    @media (max-width: 640px) {
      .preview-page { padding: 16px; }
      .preview-product { grid-template-columns: 1fr; gap: 16px; }
      .preview-product__media { max-height: 300px; }
      .preview-product__details { padding-top: 0; }
      .preview-product h1 { font-size: 23px; }
      .preview-listing { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
      .preview-listing .preview-card:last-child { display: none; }
    }
  </style>
</head>
<body data-preview-widget="${context.widgetId}" data-preview-scene="${context.scene}">
  ${fixtureMarkup(context)}
  <script>
    window.__ikasPreviewMode = true;
    window.__renuvexPreviewContext = ${scriptValue(context)};
  </script>
  <script src="/widget.js?publicApiKey=preview" async></script>
</body>
</html>`;
}
