// themes/ozy/theme.js — Ozy temasına ait tüm selector tanımları
// Yeni tema eklemek için bu dosyayı kopyala, selector'ları güncelle.

// Listing kartlarında ürün başlığını bulmak için kullanılan selector
export var THEME_LISTING_TITLE_SELECTOR = '.product-name';

// PDP product title. Prefer the title inside product-name-main so navigation
// and recommendation titles cannot be selected before the actual PDP title.
export var THEME_PRODUCT_TITLE_SELECTOR = '.product-name-main h1.product-name, .product-name-main h1, h1.product-name';

// Quick-view modal container selector'ı
export var THEME_MODAL_SELECTOR = '.add-to-basket-modal';

// Modal içindeki ürün başlığı selector'ı
export var THEME_MODAL_TITLE_SELECTOR = 'h1.product-name';

// Production runtime attestation only uses exact Ozy surface selectors.
export var THEME_STRICT_PRODUCT_CONTAINERS = [
  '.category-products-main',
  '.products-slider-main',
  '.infinite-scroll-component',
  '.single-product-container-main',
  '.product-block-container',
].join(',');
