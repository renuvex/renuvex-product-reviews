// themes/ozy/styles.js — Default tema CSS

export var CLASSIC_CSS = `
  #ikas-reviews-widget{color:#111;margin:40px 0;padding:0}
  .ikr-title{font-size:24px;font-weight:800;text-align:center;margin-bottom:24px}

  /* Summary — 3 sütun: puan | barlar | buton */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;background:#f9f9f9;border-radius:16px;margin-bottom:24px;flex-wrap:wrap;max-width:780px;margin-left:auto;margin-right:auto;}

  /* Sol — büyük ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:center;min-width:120px;gap:4px;}
  .ikr-avg-star{font-size:48px;color:var(--ikr-color,#111);line-height:1;}
  .ikr-avg-num{font-size:44px;font-weight:800;line-height:1;color:#111;}
  .ikr-avg-stars{margin:4px 0 2px;font-size:16px;}
  .ikr-avg-count{font-size:14px;color:#555;white-space:nowrap;font-weight:500;}

  /* Orta — bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:6px;min-width:180px;max-width:400px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;font-size:14px;color:#555;cursor:pointer;border-radius:6px;padding:3px 6px;}
  .ikr-bar-row:hover{background:var(--ikr-color-light);}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;}
  .ikr-bar-track{flex:1;background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;}
  .ikr-bar-fill{height:8px;background:var(--ikr-color,#111);border-radius:4px;}
  .ikr-bar-count{min-width:32px;text-align:right;color:#888;}

  /* Sağ — Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#111);color:#fff;padding:12px 24px;border-radius:10px;cursor:pointer;border:none;font-weight:700;font-size:14px;white-space:nowrap;align-self:center;}
  .ikr-write-btn:hover{opacity:.88;}

  /* Sıralama satırı */
  .ikr-controls-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .ikr-review-count-label{font-size:14px;color:#888;font-weight:500;}
  .ikr-sort-select{font-size:13px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;color:#555;cursor:pointer;outline:none;}

  /* Yorumlar */
  .ikr-review{padding:25px 0;border-bottom:1px solid #eee}
  .ikr-author{font-weight:700;font-size:15px}
  .ikr-date{color:#888;font-size:12px;margin-left:10px}
  .ikr-body{margin-top:10px;line-height:1.6;color:#333}
  .ikr-gallery{display:flex;gap:10px;margin-top:15px;flex-wrap:wrap}
  .ikr-img{width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #ddd;cursor:zoom-in}
  .ikr-reply{margin-top:15px;padding:15px;background:#f9f9f9;border-radius:8px;border-left:3px solid #111;font-size:14px}

  /* Form */
  .ikr-form{background:#fff;border:1px solid #eee;padding:25px;border-radius:12px;margin-top:30px}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box}
  .ikr-btn{background:var(--ikr-color,#111);color:#fff;padding:10px 25px;border-radius:6px;cursor:pointer;border:none;font-weight:600;margin-top:15px}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
  .ikr-photo-btn{background:#f3f3f3;color:#444;padding:8px 15px;border-radius:6px;cursor:pointer;border:1px dashed #ccc;font-size:13px;display:inline-block;margin-top:10px}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
  .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}

  /* Responsive */
  @media(max-width:600px){
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:row;justify-content:center;gap:12px;flex-wrap:wrap;}
    .ikr-write-btn{width:100%;}
    .ikr-sort-select{margin-left:0;}
  }
`;
