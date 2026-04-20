// review-layouts/list/styles.js — Liste tasarımı 3-kolon grid CSS'i.
// Sol: yazar | Orta: yıldız+başlık+metin | Sağ: foto (varsa).
// Foto yoksa orta kolon foto kolonunu da kapsar.
// Mobile: dikey diziliş (yazar → içerik → foto).
//
// Dikey gap: orta kolon uniform gap kullanmaz, her child kendi margin-top'unu
// token ile alır (--ikr-gap-tight/normal/loose). Sözleşme: themes/ozy/styles.js
// üst yorum bloğu. Yeni satır eklerken magic number yazma — ilişki tipine göre
// token seç.

export var LIST_CSS = '\
  .ikr-review-list{\
    display:grid;\
    grid-template-columns:140px 1fr 200px;\
    gap:24px;\
    align-items:start;\
    padding:24px 0;\
    border-top:1px solid var(--ikr-review-border,var(--ikr-separator,rgba(0,0,0,0.08)));\
    border-bottom:none;\
  }\
  .ikr-review-list.ikr-review-list--no-media{grid-template-columns:140px 1fr;}\
  .ikr-review-list-author{\
    display:flex;flex-direction:column;gap:4px;\
    font-size:var(--ikr-author-size,14px);\
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));\
  }\
  .ikr-review-list-author-name{font-weight:600;font-style:normal;}\
  .ikr-review-list-content{display:flex;flex-direction:column;min-width:0;}\
  .ikr-review-list-head{display:flex;align-items:center;justify-content:space-between;gap:12px;}\
  .ikr-review-list-head-left{display:flex;align-items:center;gap:10px;}\
  /* head->title (medium), title->body (normal). Author sol kolonda olduğu için\
     orta kolon akışında author satırı yok. body->reply (.ikr-reply zaten loose). */\
  .ikr-review-list-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin:var(--ikr-gap-medium) 0 0 0;}\
  .ikr-review-list-body{margin-top:var(--ikr-gap-normal);line-height:1.6;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);}\
  .ikr-review-list-media{display:flex;justify-content:flex-end;}\
  .ikr-review-list-media img{\
    width:100%;max-width:200px;aspect-ratio:3/4;object-fit:cover;\
    border-radius:var(--ikr-radius,6px);\
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));\
    cursor:zoom-in;\
  }\
  @media (max-width:600px){\
    .ikr-review-list,\
    .ikr-review-list.ikr-review-list--no-media{\
      grid-template-columns:1fr;\
      gap:12px;padding:16px 0;\
    }\
    .ikr-review-list-author{flex-direction:row;align-items:center;gap:8px;}\
    .ikr-review-list-head{flex-direction:column;align-items:flex-start;gap:6px;}\
    .ikr-review-list-media{justify-content:flex-start;}\
    .ikr-review-list-media img{max-width:160px;aspect-ratio:1/1;}\
  }\
';
