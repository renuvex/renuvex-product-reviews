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
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,200px);\
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
  /* head->title (normal), title->body (normal). Author sol kolonda olduğu için\
     orta kolon akışında author satırı yok. body->reply (.ikr-reply zaten loose). */\
  .ikr-review-list-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin:var(--ikr-gap-normal) 0 0 0;}\
  .ikr-review-list-body{margin-top:var(--ikr-gap-normal);line-height:1.6;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);}\
  .ikr-review-list-media{display:flex;justify-content:flex-end;}\
  .ikr-review-list-media img{\
    width:100%;max-width:var(--ikr-list-photo-w,200px);aspect-ratio:3/4;object-fit:cover;\
    border-radius:var(--ikr-radius,6px);\
    border:1px solid var(--ikr-photo-border,var(--ikr-border,rgba(0,0,0,0.10)));\
    cursor:zoom-in;\
  }\
  @media (max-width:600px){\
    /* Mobile sira: yildiz -> title -> yazar -> tarih -> body -> foto -> reply.\
       reviewEl flex column olur; icindeki author/content/media grid item\
       olmaktan cikip flex item olur. Content display:contents ile seffaflasinca\
       head/title/body/reply child elemanlari da flex item olur -> tek seviyede\
       order ile siralanir. DOM dokunulmaz. */\
    .ikr-review-list,\
    .ikr-review-list.ikr-review-list--no-media{\
      display:flex;flex-direction:column;gap:8px;padding:16px 0;\
    }\
    .ikr-review-list-content{display:contents;}\
    /* head de display:contents -> yildiz ve tarih ayri flex item olur, order alir */\
    .ikr-review-list-head{display:contents;}\
    .ikr-review-list-head-left{order:1;}\
    .ikr-review-list-title{order:2;margin-top:0;}\
    .ikr-review-list-author{order:3;flex-direction:row;align-items:center;gap:8px;}\
    .ikr-review-list-head .ikr-date{order:4;}\
    .ikr-review-list-body{order:5;margin-top:0;}\
    .ikr-review-list-media{order:6;justify-content:flex-start;}\
    .ikr-reply{order:7;}\
    .ikr-review-list-media img{max-width:160px;aspect-ratio:1/1;}\
  }\
';
