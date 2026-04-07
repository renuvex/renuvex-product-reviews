// themes/ozy/styles.js — Default tema CSS

export var CLASSIC_CSS = `
  #ikas-reviews-widget{color:rgba(0,0,0,1);margin:40px 0;padding:0}
  .ikr-title{font-size:24px;font-weight:700;text-align:center;margin-bottom:24px}

  /* Summary — 3 sütun: puan | barlar | buton */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;border-radius:6px;margin:0 auto 24px;flex-wrap:wrap;max-width:860px;}

  /* Sol — büyük ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:flex-start;min-width:120px;gap:10px;}
  .ikr-avg-row1{display:flex;align-items:center;gap:8px;}
  .ikr-avg-star{font-size:46px;color:var(--ikr-color,#000);line-height:1;}
  .ikr-avg-num{font-size:46px;font-weight:600;line-height:1;color:rgba(0,0,0,1);}
  .ikr-avg-row2{display:flex;align-items:center;gap:6px;}
  .ikr-avg-stars{margin:4px 0 2px;font-size:15px;}
  .ikr-avg-count{font-size:16px;color:rgba(0,0,0,0.75);white-space:nowrap;font-weight:400;}

  /* Orta — bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:10px;min-width:180px;max-width:500px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;cursor:pointer;border-radius:6px;padding:3px 6px;}
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-color-light);}}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;font-size:16px;color:rgba(0,0,0,0.75);}
  .ikr-bar-track{flex:1;background:rgba(0,0,0,0.10);border-radius:4px;height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-color,#000);border-radius:4px;}
  .ikr-bar-count{min-width:20px;text-align:right;color:rgba(0,0,0,0.75);font-size:14px;}

  /* Sağ — Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#000);color:#fff;padding:12px 24px;border-radius:6px;cursor:pointer;border:none;font-weight:700;font-size:14px;white-space:nowrap;align-self:center;}

  /* Tavsiye yüzdesi */
  .ikr-recommend{font-size:14px;color:rgba(0,0,0,0.75);margin-top:2px;}
  .ikr-recommend-pct{font-weight:700;color:rgba(0,0,0,1);margin-right:3px;}

  /* Buton grubu */
  .ikr-btn-group{display:flex;align-items:center;gap:8px;align-self:center;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:6px;border:2px solid var(--ikr-color,#000);background:#fff;color:var(--ikr-color,#000);cursor:pointer;}
  .ikr-filter-btn-active{background:var(--ikr-color,#000);color:#fff;}

  /* Filtre dropdown */
  .ikr-filter-wrap{position:relative;}
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;}
  .ikr-filter-item{padding:10px 16px;font-size:14px;color:rgba(0,0,0,0.75);cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:rgba(0,0,0,0.04);}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-color,#000);}

  /* Fotoğraflı Yorumlar bölümü */
  .ikr-photo-section{margin-bottom:24px;}
  .ikr-photo-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .ikr-photo-section-title{font-size:14px;font-weight:600;color:rgba(0,0,0,1);}
  .ikr-photo-section-all{font-size:13px;color:var(--ikr-color,#000);font-weight:600;cursor:pointer;}
  @media(hover:hover){.ikr-photo-section-all:hover{opacity:0.75;}}
  .ikr-photo-strip-wrap{position:relative;}
  .ikr-photo-strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-strip-thumb{width:80px;height:80px;object-fit:cover;border-radius:6px;cursor:zoom-in;flex-shrink:0;border:1px solid rgba(0,0,0,0.08);}
  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.12);border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:rgba(0,0,0,0.7);box-shadow:0 2px 8px rgba(0,0,0,0.08);}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.08);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  .ikr-review{padding:20px 0;border-bottom:1px solid rgba(0,0,0,0.08);}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{font-size:24px;}
  .ikr-review-title{font-weight:700;font-size:16px;color:rgba(0,0,0,1);}
  .ikr-author{font-size:14px;font-weight:600;font-style:italic;color:rgba(0,0,0,1);margin-top:6px;}
  .ikr-date{color:rgba(0,0,0,1);font-size:14px;font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:rgba(0,0,0,1);font-size:14px;font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:rgba(0,0,0,1);font-weight:600;cursor:pointer;font-size:12px;}
  .ikr-gallery{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;}
  .ikr-img{width:90px;height:90px;object-fit:cover;border-radius:6px;border:1px solid rgba(0,0,0,0.10);cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:rgba(0,0,0,0.03);border-radius:6px;border-left:3px solid var(--ikr-color,#000);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:14px;color:rgba(0,0,0,1);}
  .ikr-reply-text{font-size:14px;font-weight:400;color:rgba(0,0,0,0.75);line-height:1.6;}

  /* Accordion form wrapper */
  #ikr-form-accordion{overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease;}

  /* Form */
  .ikr-form{background:#fff;border:1px solid rgba(0,0,0,0.08);padding:25px;border-radius:6px;margin:16px auto;max-width:860px;}
  .ikr-form label{font-size:14px;}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid rgba(0,0,0,0.20);border-radius:6px;font-size:14px;box-sizing:border-box;color:rgba(0,0,0,0.90)}
  .ikr-input::placeholder,.ikr-textarea::placeholder{font-size:14px;color:rgba(0,0,0,0.35);}
  .ikr-btn{background:var(--ikr-color,#000);color:#fff;padding:12px 24px;border-radius:6px;cursor:pointer;border:none;font-weight:700;font-size:14px;margin-top:15px;width:100%}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
  .ikr-photo-btn{background:rgba(0,0,0,0.03);color:rgba(0,0,0,0.50);width:100%;height:56px;border-radius:6px;cursor:pointer;border:1px dashed rgba(0,0,0,0.20);font-size:14px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
  .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}

  /* Review Modal */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-modal{background:#fff;border-radius:12px;overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close{position:absolute;top:-42px;right:0;background:#000;border:2px solid #000;color:#fff;font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:100000;box-shadow:0 2px 8px rgba(0,0,0,0.20);}
  @media(hover:hover){.ikr-modal-close:hover{background:#222;border-color:#222;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.45);border:none;color:#fff;width:32px;height:32px;border-radius:6px;font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{background:rgba(0,0,0,0.70);}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);border:none;color:#fff;width:36px;height:36px;border-radius:6px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{font-size:24px;}
  .ikr-modal-date{font-size:14px;font-weight:400;color:rgba(0,0,0,1);white-space:nowrap;flex-shrink:0;}
  .ikr-modal-title{font-weight:700;font-size:16px;color:rgba(0,0,0,1);}
  .ikr-modal-author{font-size:14px;font-weight:600;font-style:italic;color:rgba(0,0,0,1);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;gap:6px;}
  .ikr-modal-body{font-size:14px;font-weight:400;line-height:1.65;color:rgba(0,0,0,1);}
  .ikr-modal-reply{margin-top:8px;padding:12px 16px;background:rgba(0,0,0,0.03);border-radius:6px;border-left:3px solid var(--ikr-color,#000);}
  .ikr-modal-reply-label{font-weight:600;font-size:14px;color:rgba(0,0,0,1);margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:14px;font-weight:400;color:rgba(0,0,0,0.75);line-height:1.6;}

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
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:column;align-items:center;gap:10px;}
    .ikr-avg-row1{justify-content:center;}
    .ikr-write-btn{flex:1;}
    .ikr-btn-group{width:100%;align-self:stretch;}
    .ikr-sort-select{margin-left:0;}
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-btn{width:100%;}
  }
`;
