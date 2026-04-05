// themes/ozy/styles.js — Default tema CSS

export var CLASSIC_CSS = `
  #ikas-reviews-widget{color:rgba(0,0,0,1);margin:40px 0;padding:0}
  .ikr-title{font-size:24px;font-weight:800;text-align:center;margin-bottom:24px}

  /* Summary — 3 sütun: puan | barlar | buton */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;background:rgba(0,0,0,0.03);border-radius:16px;margin-bottom:24px;flex-wrap:wrap;max-width:780px;margin-left:auto;margin-right:auto;}

  /* Sol — büyük ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:flex-start;min-width:120px;gap:4px;}
  .ikr-avg-row1{display:flex;align-items:center;gap:8px;}
  .ikr-avg-star{font-size:48px;color:var(--ikr-color,#000);line-height:1;}
  .ikr-avg-num{font-size:38px;font-weight:700;line-height:1;color:rgba(0,0,0,1);}
  .ikr-avg-row2{display:flex;align-items:center;gap:6px;}
  .ikr-avg-stars{margin:4px 0 2px;font-size:15px;}
  .ikr-avg-count{font-size:13px;color:rgba(0,0,0,0.75);white-space:nowrap;font-weight:500;}

  /* Orta — bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:6px;min-width:180px;max-width:400px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;font-size:14px;color:rgba(0,0,0,0.75);cursor:pointer;border-radius:6px;padding:3px 6px;}
  .ikr-bar-row:hover{background:var(--ikr-color-light);}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;}
  .ikr-bar-track{flex:1;background:rgba(0,0,0,0.10);border-radius:4px;height:8px;overflow:hidden;}
  .ikr-bar-fill{height:8px;background:var(--ikr-color,#000);border-radius:4px;}
  .ikr-bar-count{min-width:32px;text-align:right;color:rgba(0,0,0,0.75);}

  /* Sağ — Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#000);color:#fff;padding:12px 24px;border-radius:10px;cursor:pointer;border:none;font-weight:700;font-size:14px;white-space:nowrap;align-self:center;}

  /* Tavsiye yüzdesi */
  .ikr-recommend{font-size:13px;color:rgba(0,0,0,0.75);margin-top:2px;}
  .ikr-recommend-pct{font-weight:800;color:rgba(0,0,0,1);margin-right:3px;}

  /* Buton grubu */
  .ikr-btn-group{display:flex;align-items:center;gap:8px;align-self:center;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:10px;border:2px solid var(--ikr-color,#000);background:#fff;color:var(--ikr-color,#000);cursor:pointer;}
  .ikr-filter-btn-active{background:var(--ikr-color,#000);color:#fff;}

  /* Filtre dropdown */
  .ikr-filter-wrap{position:relative;}
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.12);min-width:180px;overflow:hidden;z-index:999;}
  .ikr-filter-item{padding:10px 16px;font-size:13px;color:rgba(0,0,0,0.75);cursor:pointer;}
  .ikr-filter-item:hover{background:rgba(0,0,0,0.04);}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-color,#000);}

  /* Yorumlar */
  .ikr-review{padding:20px 0;border-bottom:1px solid rgba(0,0,0,0.08);}
  .ikr-review-top{display:flex;align-items:center;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:20px;}
  .ikr-review-title{font-weight:700;font-size:15px;color:rgba(0,0,0,1);}
  .ikr-author{font-size:13px;color:rgba(0,0,0,0.75);margin-top:3px;}
  .ikr-date{color:rgba(0,0,0,0.40);font-size:13px;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:rgba(0,0,0,1);font-size:14px;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:var(--ikr-color,#000);font-weight:600;cursor:pointer;font-size:13px;}
  .ikr-gallery{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;}
  .ikr-img{width:90px;height:90px;object-fit:cover;border-radius:8px;border:1px solid rgba(0,0,0,0.10);cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:rgba(0,0,0,0.03);border-radius:8px;border-left:3px solid var(--ikr-color,#000);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:700;font-size:13px;color:rgba(0,0,0,1);}
  .ikr-reply-text{font-size:13px;color:rgba(0,0,0,0.75);line-height:1.6;}

  /* Form */
  .ikr-form{background:#fff;border:1px solid rgba(0,0,0,0.08);padding:25px;border-radius:12px;margin-top:30px}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid rgba(0,0,0,0.15);border-radius:6px;font-size:14px;box-sizing:border-box;color:rgba(0,0,0,0.90)}
  .ikr-btn{background:var(--ikr-color,#000);color:#fff;padding:10px 25px;border-radius:6px;cursor:pointer;border:none;font-weight:600;margin-top:15px}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
  .ikr-photo-btn{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.60);padding:8px 15px;border-radius:6px;cursor:pointer;border:1px dashed rgba(0,0,0,0.20);font-size:13px;display:inline-block;margin-top:10px}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
  .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}

  /* Responsive */
  @media(max-width:600px){
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:row;justify-content:center;gap:12px;flex-wrap:wrap;}
    .ikr-write-btn{width:100%;}
    .ikr-sort-select{margin-left:0;}
    .ikr-review-top-left{font-size:18px;}
    .ikr-review-title{font-size:14px;}
    .ikr-author{font-size:12px;}
    .ikr-date{font-size:12px;}
    .ikr-body{font-size:13px;}
    .ikr-read-more{font-size:12px;}
    .ikr-reply-label{font-size:12px;}
    .ikr-reply-text{font-size:12px;}
  }
`;
