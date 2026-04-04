// product-widget/title-finder.js — Ürün sayfasında ürün başlığı elementini bulur
// (listing badge'deki findTitleEl'den farklı — ürün sayfası h1 tespiti için)

export function findProductTitleEl(productName) {
  if (productName) {
    var allEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,p');
    for (var i = 0; i < allEls.length; i++) {
      var el = allEls[i];
      if (el.children.length === 0 &&
          el.textContent.trim() === productName &&
          el.tagName !== 'TITLE' &&
          !el.closest('[data-ikr-listing-badge]') &&
          !el.closest('#ikas-reviews') &&
          !el.closest('nav') &&
          !el.closest('[class*="breadcrumb"]') &&
          !el.closest('[aria-label*="breadcrumb"]')) {
        return el;
      }
    }
  }
  return document.querySelector('h1');
}
