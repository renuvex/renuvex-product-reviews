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
  /* Sol kolon imza grubu: yildiz -> yazar -> tarih.\
     yildiz->yazar normal (8), yazar->tarih tight (4) ayni imza grubu. */\
  .ikr-review-list-author{\
    display:flex;flex-direction:column;\
    font-size:var(--ikr-author-size,14px);\
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));\
  }\
  .ikr-review-list-author-stars{margin-bottom:var(--ikr-gap-normal);}\
  .ikr-review-list-author-name{font-weight:600;font-style:normal;}\
  .ikr-review-list-author-date{margin-top:var(--ikr-gap-tight);font-size:var(--ikr-review-date-size,12px);color:var(--ikr-review-date,var(--ikr-text,rgba(0,0,0,0.6)));}\
  .ikr-review-list-content{display:flex;flex-direction:column;min-width:0;}\
  /* Title artik orta kolonun ilk elemani; ust margin gerekmez. */\
  .ikr-review-list-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin:0;}\
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
       Sol kolondaki author bloku DOM icinde yildiz+yazar+tarih sirasindadir.\
       Mobile icin author display:contents ile seffaflasir; yildiz/yazar/tarih\
       ayri flex item olur. Content de display:contents -> title/body/reply\
       ayri flex item olur. Tek seviyede order ile siralanir. DOM dokunulmaz. */\
    .ikr-review-list,\
    .ikr-review-list.ikr-review-list--no-media{\
      display:flex;flex-direction:column;gap:8px;padding:16px 0;\
    }\
    .ikr-review-list-author{display:contents;}\
    .ikr-review-list-content{display:contents;}\
    .ikr-review-list-author-stars{order:1;margin-bottom:0;}\
    .ikr-review-list-title{order:2;}\
    .ikr-review-list-author-name{order:3;}\
    /* yazar->tarih ayni imza grubu, galeri ile tutarli kompakt 4px (gap 8 - margin -4) */\
    .ikr-review-list-author-date{order:4;margin-top:-4px;}\
    .ikr-review-list-body{order:5;margin-top:0;}\
    /* body sonrasi read-more body ile ayni bloga ait;\
       reviewEl 8px gap sonrasi net 4px kalmasi icin -4px (galeri/card uyumu) */\
    .ikr-review-list-content > .ikr-read-more{order:6;margin-top:-4px;}\
    .ikr-review-list-media{order:7;justify-content:flex-start;}\
    .ikr-reply{order:8;}\
    .ikr-review-list-media img{max-width:160px;aspect-ratio:1/1;}\
  }\
';
