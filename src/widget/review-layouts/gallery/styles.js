// review-layouts/gallery/styles.js — Loox tarzı 2-kolon galeri tasarımı.
// CSS columns ile JS'siz masonry. Parent (#ikas-reviews-widget) :has() ile
// hedeflenir; non-review elemanlar (summary, başlık, accordion, photo-section,
// load-more, state-msg) column-span:all ile kolon dışına alınır — sözleşme
// dokunulmaz, render.js değişmez.
//
// Item içi: solda metin/yıldız/yazar, sağda foto (horizontal split).
// Foto yoksa metin tüm genişliği kullanır.
// Mobile (<600px): tek kolon, yine sol=metin sağ=foto (foto sırası asla
// metnin önüne geçmez — referans tutarlılığı).

export var GALLERY_CSS = '\
  /* Galeri seçiliyken widget full-bleed yerine 1200px ile sınırlı —\
     CSS columns parent genişliğine yayıldığı için widget kendisi sınırlanmalı.\
     Diğer layoutlar (card/list) full-bleed olarak kalır. */\
  #ikas-reviews-widget:has(.ikr-review-gallery){\
    width:auto;\
    max-width:1200px;\
    margin-left:auto;\
    margin-right:auto;\
    column-count:2;\
    column-gap:20px;\
  }\
  /* Non-review elemanlar kolon dışına çıkar — summary, başlık, form, foto strip vs. */\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-title,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-summary,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > #ikr-form-accordion,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-photo-section,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-write-btn,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-load-more,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-state-msg{\
    column-span:all;\
    -webkit-column-span:all;\
  }\
  /* Item — column içinde kalır, içinde sol-sağ split */\
  .ikr-review-gallery{\
    break-inside:avoid;\
    -webkit-column-break-inside:avoid;\
    page-break-inside:avoid;\
    display:grid;\
    grid-template-columns:1fr 120px;\
    gap:14px;\
    align-items:start;\
    padding:18px 0;\
    margin:0;\
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));\
  }\
  .ikr-review-gallery.ikr-review-gallery--no-media{\
    grid-template-columns:1fr;\
  }\
  .ikr-review-gallery-content{\
    display:flex;flex-direction:column;gap:6px;min-width:0;\
  }\
  .ikr-review-gallery-head{\
    display:flex;align-items:center;justify-content:space-between;gap:8px;\
  }\
  .ikr-review-gallery-author{\
    font-weight:600;\
    font-size:var(--ikr-author-size,14px);\
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));\
  }\
  .ikr-review-gallery-date{\
    font-size:var(--ikr-review-date-size,12px);\
    color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));\
    white-space:nowrap;flex-shrink:0;\
  }\
  .ikr-review-gallery-title{\
    font-weight:600;\
    font-size:var(--ikr-review-title-size,15px);\
    color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));\
    margin:2px 0 0 0;\
  }\
  .ikr-review-gallery-body{\
    line-height:1.55;\
    color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));\
    font-size:var(--ikr-review-text-size,14px);\
    margin-top:2px;\
  }\
  /* Mobile tap highlight kaldirildi — modal acilirken gorunur kaliyordu */\
  .ikr-review-gallery .ikr-read-more{\
    -webkit-tap-highlight-color:transparent;\
    tap-highlight-color:transparent;\
    user-select:none;-webkit-user-select:none;\
  }\
  .ikr-review-gallery-media{\
    cursor:zoom-in;\
  }\
  .ikr-review-gallery-media img{\
    display:block;width:100%;height:auto;\
    aspect-ratio:3/4;object-fit:cover;\
    border-radius:var(--ikr-radius,6px);\
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));\
  }\
  @media (max-width:600px){\
    #ikas-reviews-widget:has(.ikr-review-gallery){\
      column-count:1;\
      column-gap:0;\
    }\
    .ikr-review-gallery{\
      grid-template-columns:1fr 100px;\
      gap:12px;padding:16px 0;\
    }\
    .ikr-review-gallery.ikr-review-gallery--no-media{\
      grid-template-columns:1fr;\
    }\
  }\
';
