// review-layouts/gallery/styles.js — Loox tarzı masonry galeri tasarımı.
// CSS columns ile JS'siz masonry. Parent (#ikas-reviews-widget) :has() ile
// hedeflenir — diğer layoutlara sızmaz, sözleşme dokunulmaz.
// Foto yoksa item yine görünür, sadece metin/yıldız gösterir.

export var GALLERY_CSS = '\
  #ikas-reviews-widget:has(.ikr-review-gallery){\
    column-count:2;\
    column-gap:24px;\
  }\
  /* Container içindeki state mesajı, load-more vs. column dışına taşınmasın */\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-state-msg,\
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-load-more{\
    column-span:all;\
  }\
  .ikr-review-gallery{\
    break-inside:avoid;\
    -webkit-column-break-inside:avoid;\
    page-break-inside:avoid;\
    display:flex;flex-direction:column;gap:10px;\
    margin:0 0 24px 0;\
    padding:16px;\
    background:var(--ikr-form-bg,var(--ikr-surface,#fff));\
    border:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));\
    border-radius:var(--ikr-radius,6px);\
  }\
  .ikr-review-gallery-media{\
    margin:-16px -16px 0 -16px;\
    border-radius:var(--ikr-radius,6px) var(--ikr-radius,6px) 0 0;\
    overflow:hidden;\
    cursor:zoom-in;\
  }\
  .ikr-review-gallery-media img{\
    display:block;width:100%;height:auto;object-fit:cover;\
  }\
  .ikr-review-gallery-author{\
    font-weight:600;\
    font-size:var(--ikr-author-size,14px);\
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));\
  }\
  .ikr-review-gallery-date{\
    font-size:var(--ikr-review-date-size,12px);\
    color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));\
  }\
  .ikr-review-gallery-title{\
    font-weight:700;\
    font-size:var(--ikr-review-title-size,15px);\
    color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));\
    margin:2px 0 0 0;\
  }\
  .ikr-review-gallery-body{\
    line-height:1.55;\
    color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));\
    font-size:var(--ikr-review-text-size,14px);\
  }\
  @media (max-width:600px){\
    #ikas-reviews-widget:has(.ikr-review-gallery){\
      column-count:1;\
    }\
    .ikr-review-gallery{margin-bottom:16px;}\
  }\
';
