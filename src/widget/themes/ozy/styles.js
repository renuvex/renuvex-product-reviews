// themes/ozy/styles.js — Default tema CSS
//
// Tema (açık/koyu/özel) tüm widget görünümünü şu CSS değişkenleri üzerinden
// kontrol eder. render.js themeMode'a göre bu değişkenleri document root'a
// yazar — CSS default'ları sadece fallback olarak kullanılır:
//   --ikr-bg          : widget arka planı
//   --ikr-text        : birincil yazı rengi
//   --ikr-text-muted  : ikincil yazı rengi (tarih, sayaç)
//   --ikr-text-faint  : çok soluk yazı rengi (helpful sayaç vb.)
//   --ikr-border      : ayırıcı çizgi/border rengi
//   --ikr-track-bg    : bar chart track arka planı (border'dan ayrı — koyu
//                       temada track'in görünmesi için daha yüksek kontrast)
//   --ikr-reply-bg    : mağaza yanıtı kutusu arka planı
//   --ikr-surface     : form/kart üst yüzeyi (bg'den biraz farklı)
//   --ikr-input-bg    : input arka planı
//   --ikr-input-text  : input yazı rengi

export var CLASSIC_CSS = `
  /* Widget dış kutu — full-bleed: mağaza teması widget'ı padding'li bir
     section/container içine koymuş olsa bile, viewport genişliğinde yayılır.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'ı
     parent container'ın padding'inden "dışarı taşırır". Arka planı temadan
     gelir, içerideki bölümler > * kuralıyla 1200px ortalanır.
     NOT: 100vw scrollbar'ı hesaba katmaz — scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime düzeltme de yapılabilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:var(--ikr-text,rgba(0,0,0,1));background:var(--ikr-bg,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;}
  /* Doğrudan widget çocukları — inner wrap (1200px ortalı). Summary'deki
     3 sütun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak sıfırlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* Yorum metni ve mağaza yanıtı — 70ch ile okunabilir tutulur, inner 1200 olsa
     bile satırlar 800-900px civarında kalır. Başlık, summary, galeri serbest. */
  #ikas-reviews-widget .ikr-body,
  #ikas-reviews-widget .ikr-reply-text{max-width:70ch;}
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:700;text-align:center;margin-bottom:24px;color:var(--ikr-text,rgba(0,0,0,1));}

  /* Summary — 3 sütun: puan | barlar | buton (max-width widget child kuralından) */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;border-radius:var(--ikr-radius,6px);margin:0 auto 24px;flex-wrap:wrap;}

  /* Sol — büyük ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:flex-start;min-width:120px;gap:10px;}
  .ikr-avg-row1{display:flex;align-items:center;gap:8px;}
  .ikr-avg-star{font-size:var(--ikr-avg-star-size,46px);color:var(--ikr-review-star-color,#f59e0b);line-height:1;}
  .ikr-avg-num{font-size:var(--ikr-avg-rating-size,46px);font-weight:600;line-height:1;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-avg-row2{display:flex;align-items:center;gap:6px;}
  .ikr-avg-count{font-size:var(--ikr-review-count-size,16px);color:var(--ikr-text,rgba(0,0,0,1));white-space:nowrap;font-weight:400;}

  /* Orta — bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:10px;min-width:180px;max-width:700px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:var(--ikr-radius,6px);padding:3px 6px;}
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-color-light);}}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:var(--ikr-text-muted,rgba(0,0,0,0.75));}
  .ikr-bar-track{flex:1;background:var(--ikr-track-bg,rgba(0,0,0,0.10));border-radius:var(--ikr-radius-sm,4px);height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-color,#000);border-radius:var(--ikr-radius-sm,4px);}
  .ikr-bar-count{min-width:20px;text-align:right;color:var(--ikr-text-muted,rgba(0,0,0,0.75));font-size:var(--ikr-bar-count-size,14px);}

  /* Sağ — Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#000);color:var(--ikr-color-text,#fff);padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:none;font-weight:700;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;align-self:center;}

  /* Tavsiye yüzdesi */
  .ikr-recommend{font-size:var(--ikr-recommend-size,14px);color:var(--ikr-text,rgba(0,0,0,1));margin-top:2px;}
  .ikr-recommend-pct{font-weight:700;color:var(--ikr-text,rgba(0,0,0,1));margin-right:3px;}

  /* Buton grubu */
  .ikr-btn-group{display:flex;align-items:center;gap:8px;align-self:center;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--ikr-radius,6px);border:2px solid var(--ikr-color,#000);background:var(--ikr-surface,#fff);color:var(--ikr-color,#000);cursor:pointer;}
  .ikr-filter-btn-active{background:var(--ikr-color,#000);color:var(--ikr-color-text,#fff);}

  /* Filtre dropdown */
  .ikr-filter-wrap{position:relative;}
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--ikr-surface,#fff);border:1px solid var(--ikr-border,rgba(0,0,0,0.12));border-radius:var(--ikr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;}
  .ikr-filter-item{padding:10px 16px;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-text-muted,rgba(0,0,0,0.75));cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-color-light);}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-color,#000);}

  /* Fotoğraflı Yorumlar bölümü */
  .ikr-photo-section{margin-bottom:24px;}
  .ikr-photo-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .ikr-photo-section-title{font-size:14px;font-weight:600;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-photo-strip-wrap{position:relative;}
  .ikr-photo-strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-thumb{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px solid var(--ikr-border,rgba(0,0,0,0.10));transition:transform 0.2s,border-color 0.2s;flex-shrink:0;}
  @media(hover:hover){.ikr-photo-thumb:hover{transform:scale(1.03);border-color:var(--ikr-color,#000);}}

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);background:var(--ikr-surface,rgba(255,255,255,0.95));border:1px solid var(--ikr-border,rgba(0,0,0,0.12));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-text-muted,rgba(0,0,0,0.7));box-shadow:0 2px 8px rgba(0,0,0,0.08);}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-surface,#fff);box-shadow:0 2px 12px rgba(0,0,0,0.08);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  .ikr-review{padding:20px 0;border-bottom:1px solid var(--ikr-border,rgba(0,0,0,0.08));}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{font-size:var(--ikr-star-size,20px);}
  .ikr-review-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-text,rgba(0,0,0,1));margin-top:6px;}
  .ikr-date{color:var(--ikr-text,rgba(0,0,0,1));font-size:var(--ikr-review-date-size,14px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:var(--ikr-text,rgba(0,0,0,1));font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:var(--ikr-text,rgba(0,0,0,1));font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-media-row{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;margin-top:12px;}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;flex:1;}
  .ikr-img{width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-border,rgba(0,0,0,0.10));cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:var(--ikr-reply-bg,rgba(0,0,0,0.03));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-color,#000);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-text-muted,rgba(0,0,0,0.75));line-height:1.6;}

  /* Faydalı butonu */
  .ikr-helpful-btn{display:flex;align-items:center;gap:5px;background:none;border:none;padding:4px 6px;cursor:pointer;font-size:var(--ikr-helpful-size,12px);color:var(--ikr-text-faint,rgba(0,0,0,0.45));font-weight:400;transition:color 0.15s;line-height:1;min-width:44px;}
  .ikr-helpful-icon{flex-shrink:0;display:flex;align-items:center;transition:color 0.15s;}
  .ikr-helpful-count{display:inline-block;min-width:16px;text-align:left;color:var(--ikr-text-faint,rgba(0,0,0,0.45));}
  @media(hover:hover){.ikr-helpful-btn:hover .ikr-helpful-icon{color:var(--ikr-color,#000);}}
  .ikr-helpful-btn-active .ikr-helpful-icon{color:var(--ikr-color,#000)!important;}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:var(--ikr-surface,#fff);border:1px solid var(--ikr-border,rgba(0,0,0,0.08));padding:25px;border-radius:var(--ikr-radius,6px);margin:16px auto;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-form label{font-size:14px;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;background:var(--ikr-input-bg,#fff);border:1px solid var(--ikr-border,rgba(0,0,0,0.20));border-radius:var(--ikr-radius,6px);font-size:14px;box-sizing:border-box;color:var(--ikr-input-text,rgba(0,0,0,0.90));}
  .ikr-input::placeholder,.ikr-textarea::placeholder{font-size:14px;color:var(--ikr-text-faint,rgba(0,0,0,0.35));}
  .ikr-btn{background:var(--ikr-color,#000);color:var(--ikr-color-text,#fff);padding:12px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:none;font-weight:700;font-size:14px;margin-top:15px;width:100%}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}

  /* Daha Fazla Göster butonu — tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-border,rgba(0,0,0,0.30));border-radius:var(--ikr-radius,6px);background:var(--ikr-surface,#fff);color:var(--ikr-text-muted,rgba(0,0,0,0.75));font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}
  @media(hover:hover){.ikr-load-more:hover{background:var(--ikr-reply-bg,rgba(0,0,0,0.04));}}

  /* Yükleniyor / boş durum mesajları — tema uyumlu */
  .ikr-state-msg{text-align:center;color:var(--ikr-text-faint,rgba(0,0,0,0.45));font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}
  .ikr-photo-btn{background:var(--ikr-reply-bg,rgba(0,0,0,0.03));color:var(--ikr-text-muted,rgba(0,0,0,0.50));width:100%;height:56px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px dashed var(--ikr-border,rgba(0,0,0,0.20));font-size:14px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px;}
  .ikr-preview-remove{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,0.15);color:rgba(0,0,0,0.6);font-size:11px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.12);}
  @media(hover:hover){.ikr-preview-remove:hover{background:#fee2e2;border-color:#dc2626;color:#dc2626;}}
  .ikr-preview-img{width:90px;height:90px;object-fit:cover;border-radius:var(--ikr-radius,6px)}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.75);display:flex;align-items:center;justify-content:center;border-radius:var(--ikr-radius,6px);}
  .ikr-spinner{width:20px;height:20px;border:2px solid rgba(0,0,0,0.12);border-top-color:var(--ikr-color,#000);border-radius:50%;animation:ikrSpin 0.7s linear infinite;}
  @keyframes ikrSpin{to{transform:rotate(360deg);}}
  .ikr-upload-check{font-size:22px;color:#059669;line-height:1;}
  .ikr-upload-error{font-size:10px;color:#dc2626;line-height:1.3;text-align:center;padding:4px;word-break:break-word;}

  /* Review Modal */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 4px;display:block;}
  .ikr-photo-section-header{margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;}
  .ikr-photo-section-title{font-size:var(--ikr-photo-title-size,16px);font-weight:600;color:var(--ikr-text,#121926);}
  .ikr-photo-strip-container{position:relative;margin:0 -4px;}
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:var(--ikr-thumbnail-size,90px);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;border:1px solid rgba(0,0,0,0.05);}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,0.12);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}
  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.9);border:1px solid rgba(0,0,0,0.08);color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.1);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:#fff;transform:translateY(-50%) scale(1.1);box-shadow:0 4px 12px rgba(0,0,0,0.15);}}
  .ikr-photo-strip-arrow-prev{left:-12px;}
  .ikr-photo-strip-arrow-next{right:-12px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  .ikr-modal{background:var(--ikr-bg,#fff);color:var(--ikr-text,rgba(0,0,0,1));border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close{position:absolute;top:-42px;right:0;background:#000;border:2px solid #000;color:var(--ikr-color-text,#fff);font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:100000;box-shadow:0 2px 8px rgba(0,0,0,0.20);}
  @media(hover:hover){.ikr-modal-close:hover{background:#222;border-color:#222;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.45);border:none;color:#fff;width:32px;height:32px;border-radius:var(--ikr-radius,6px);font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{background:rgba(0,0,0,0.70);}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);border:none;color:#fff;width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;background:var(--ikr-bg,#fff);color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{font-size:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,14px);font-weight:400;color:var(--ikr-text,rgba(0,0,0,1));white-space:nowrap;flex-shrink:0;}
  .ikr-modal-title{font-weight:700;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:400;font-style:italic;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;gap:6px;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-text,rgba(0,0,0,1));}
  .ikr-modal-reply{margin-top:8px;padding:12px 16px;background:var(--ikr-reply-bg,rgba(0,0,0,0.03));border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-color,#000);}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,14px);color:var(--ikr-text,rgba(0,0,0,1));margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,14px);font-weight:400;color:var(--ikr-text-muted,rgba(0,0,0,0.75));line-height:1.6;}

  /* Responsive */
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:transparent;}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:auto;z-index:100000;width:100%;max-width:100%;overscroll-behavior:contain;background:rgba(0,0,0,0.50);}
    .ikr-modal{flex-direction:column;height:auto;min-height:100vh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;aspect-ratio:3/4;overflow:hidden;}
    .ikr-modal-right{overflow-y:visible;flex:none;width:100%;}
    .ikr-modal-scroll-content{padding:16px 16px 48px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:600px){
    .ikr-date{font-size:12px;}
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:column;align-items:center;gap:10px;width:100%;text-align:center;}
    .ikr-avg-row1{justify-content:center;}
    .ikr-avg-row2{justify-content:center;}
    .ikr-recommend{text-align:center;}
    .ikr-write-btn{flex:1;}
    .ikr-btn-group{width:100%;align-self:stretch;}
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-btn{width:100%;}
    /* Media row — mobilde gallery üstte tam genişlikli yatay scroll,
       helpful butonu altta sağa yasılı. Aynı satırda sıkıştırmak yerine
       dikey ayırıyoruz çünkü gallery scroll alanına ihtiyaç duyuyor. */
    .ikr-media-row{flex-direction:column;align-items:stretch;gap:8px;}
    .ikr-media-row .ikr-helpful-btn{align-self:flex-end;}
    /* Gallery — fotoğraflı yorumlar strip'i mantığı: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kalıyor,
       sığmayanlar yatay scroll'da kaydırılıyor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;
