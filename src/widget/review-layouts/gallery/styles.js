// review-layouts/gallery/styles.js — Premium tarzda 2-kolon galeri tasarımı.
// CSS columns ile JS'siz masonry. Parent (#renuvex-reviews-widget) :has() ile
// hedeflenir; non-review elemanlar (summary, başlık, media-gallery-section,
// load-more, state-msg) column-span:all ile kolon dışına alınır — sözleşme
// dokunulmaz, render.js değişmez.
//
// Item içi: solda metin/yıldız/yazar, sağda foto (horizontal split).
// Foto yoksa metin tüm genişliği kullanır.
// Mobile (<600px): tek kolon, yine sol=metin sağ=foto (foto sırası asla
// metnin önüne geçmez — referans tutarlılığı).
//
// Dikey gap: content kolonu uniform gap kullanmaz, her child kendi
// margin-top'unu token ile alır (--renuvex-pr-gap-tight/normal/loose). Sözleşme:
// reviews-section/styles.js üst yorum bloğu. Yeni satır eklerken magic number
// yazma — ilişki tipine göre token seç.

export var GALLERY_CSS = `
  /* Galeri seçiliyken widget full-bleed yerine 1200px ile sınırlı —
     CSS columns parent genişliğine yayıldığı için widget kendisi sınırlanmalı.
     Diğer layoutlar (card/list) full-bleed olarak kalır. */
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery){
    width:auto;
    max-width:1200px;
    margin-left:auto;
    margin-right:auto;
    column-count:2;
    column-gap:32px;
  }
  /* Non-review elemanlar kolon dışına çıkar — summary, başlık, media gallery vs. */
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-title,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-summary,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-media-gallery-section,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-write-btn,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-load-more,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-pagination,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-state-msg{
    column-span:all;
    -webkit-column-span:all;
  }
  /* Item — column içinde kalır, içinde sol-sağ split */
  .renuvex-pr-review-gallery{
    break-inside:avoid;
    -webkit-column-break-inside:avoid;
    page-break-inside:avoid;
    display:grid;
    grid-template-columns:1fr var(--renuvex-pr-gallery-photo-w,120px);
    column-gap:32px;
    row-gap:8px;
    align-items:start;
    /* Yan padding theme mobile bloğundan gelir (--renuvex-pr-pad-review-mobile).
       Shorthand yan padding'i 0'a resetleyip theme kuralını ezmesin diye
       top/bottom ayrı set. */
    padding-top:18px;padding-bottom:18px;
    margin:0;
    border-top:1px solid var(--renuvex-pr-review-border,#e5e7eb);
  }
  .renuvex-pr-review-gallery.renuvex-pr-review-gallery--no-media{
    grid-template-columns:1fr;
  }
  .renuvex-pr-review-gallery-content{
    display:flex;flex-direction:column;min-width:0;
  }
  /* Galeri dikey sıra: stars → title → author → date → body → reply.
     stars→title (normal); title→author (normal); author→date (tight, aynı imza
     grubu); date→body (normal). Bkz: gap sözleşmesi. */
  .renuvex-pr-review-gallery-stars{
    /* en üstte; margin yok */
  }
  .renuvex-pr-review-gallery-title{
    font-weight:600;
    font-size:var(--renuvex-pr-review-title-size,15px);
    color:var(--renuvex-pr-review-title,var(--renuvex-pr-text,rgba(0,0,0,1)));
    margin:var(--renuvex-pr-gap-normal) 0 0 0;
  }
  .renuvex-pr-review-gallery-author{
    font-weight:600;
    font-size:var(--renuvex-pr-author-size,14px);
    color:var(--renuvex-pr-review-author,var(--renuvex-pr-text,rgba(0,0,0,1)));
    margin-top:var(--renuvex-pr-gap-normal);
  }
  .renuvex-pr-review-gallery-date{
    font-size:var(--renuvex-pr-review-date-size,12px);
    color:var(--renuvex-pr-review-date,#5e5e5e);
    margin-top:var(--renuvex-pr-gap-tight);
  }
  .renuvex-pr-review-gallery-body{
    line-height:1.55;
    color:var(--renuvex-pr-review-body,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-size:var(--renuvex-pr-review-text-size,14px);
    margin-top:var(--renuvex-pr-gap-normal);
    max-width:340px;
  }
  /* Mobile tap highlight kaldırıldı — modal açılırken görünür kalıyordu */
  .renuvex-pr-review-gallery .renuvex-pr-read-more{
    -webkit-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
    user-select:none;-webkit-user-select:none;
  }
  .renuvex-pr-review-gallery-media{
    cursor:pointer;
  }
  /* Reply full-width: foto+metin altında her iki kolona yayılır */
  .renuvex-pr-review-gallery-reply{
    grid-column:1 / -1;
  }
  .renuvex-pr-review-gallery-media > *{
    display:block;width:100%;height:auto;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-media-gallery-image-border,rgba(0,0,0,0.05));
  }
  @media (max-width:600px){
    /* Tek kolonda full-bleed'i geri getir. Yukarıdaki masaüstü 2-kolon kuralı kökü
       max-width:1200/margin:auto ile non-full-bleed yapıyor; bu media-scoped olmadığı
       için mobilde de geçerli kalıp gallery'yi tema konteynerinin yan padding'ine
       hapsediyordu (kart/liste full-bleed'ken). Burada full-bleed'i geri vererek
       item'ın 16px'ini TEK yan boşluk yapıyoruz → kart/liste ile birebir 16px.
       (base.js'teki full-bleed sözleşmesiyle hizalı.) */
    #renuvex-reviews-widget:has(.renuvex-pr-review-gallery){
      width:100vw;
      max-width:100vw;
      margin-left:calc(50% - 50vw);
      margin-right:calc(50% - 50vw);
      column-count:1;
      column-gap:0;
    }
    .renuvex-pr-review-gallery{
      grid-template-columns:1fr var(--renuvex-pr-gallery-photo-w-mobile,100px);
      column-gap:12px;row-gap:12px;
      /* Yan padding theme mobile bloguna tasindi (--renuvex-pr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      padding-top:16px;padding-bottom:16px;
    }
    .renuvex-pr-review-gallery.renuvex-pr-review-gallery--no-media{
      grid-template-columns:1fr;
    }
  }
`;
