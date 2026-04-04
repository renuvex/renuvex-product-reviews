// themes/ozy/theme.js — Ozy temasına ait tüm selector tanımları
// Yeni tema eklemek için bu dosyayı kopyala, selector'ları güncelle.

// Listing kartlarında ürün başlığını bulmak için kullanılan selector
export var THEME_LISTING_TITLE_SELECTOR = '.product-name';

// Quick-view modal container selector'ı
export var THEME_MODAL_SELECTOR = '.add-to-basket-modal';

// Modal içindeki ürün başlığı selector'ı
export var THEME_MODAL_TITLE_SELECTOR = 'h1.product-name';

// Single product section — tüm container
export var THEME_SINGLE_PRODUCT_CONTAINER = '.single-product-container-main';

// Single product section — sadece ürün adı linkine izin verilen alan
export var THEME_SINGLE_PRODUCT_NAME_LINK = '.single-product-product-name';

// Badge inject edilmemesi gereken dekoratif/banner alanları (blacklist — artık yedek)
export var THEME_BANNER_CONTAINERS = [
  '.hero-image-banner-main',
  '.hero-image-main',
  '.home-slider-main',
  '[class*="hero-"]',
  '[class*="banner-"]',
  '[class*="slider-banner"]',
  '[class*="marquee"]',
].join(',');

// Badge inject edilebilecek whitelist container'lar
// Sadece bu container'lar içindeki linklere badge inject edilir
export var THEME_PRODUCT_CONTAINERS = [
  '.category-products-main',       // kategori / arama sonuçları grid'i
  '.products-slider-main',         // ürün slider section
  '.infinite-scroll-component',    // sonsuz scroll listing
  '[class*="product-list"]',       // genel ürün listesi pattern'ı
  '.single-product-container-main', // tek ürün section (anasayfa embed)
].join(',');
