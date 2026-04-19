// summary-layouts/hero/styles.js
// Hero (Vurgulu) layout — büyük avg puan ön planda.
// Sol: dev avg sayı + (alt) yıldız + "X yorum üzerinden". Sağ: filter + write.
// Mobile'da write alta düşer (minimal pattern'ı).

export var HERO_CSS = `
  .ikr-title-hero{text-align:left;}

  .ikr-summary-hero{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 0;
  }

  .ikr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:16px;min-width:0;
  }
  .ikr-hero-avg{
    font-size:var(--ikr-hero-avg-size,64px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-1px;
  }
  .ikr-hero-meta{
    display:flex;flex-direction:column;align-items:flex-start;gap:4px;min-width:0;
  }
  .ikr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-hero-stars .ikr-icon{
    width:var(--ikr-bar-label-size,22px);height:var(--ikr-bar-label-size,22px);
  }
  .ikr-hero-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;
  }

  .ikr-hero-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .ikr-hero-info{flex:1 1 auto;gap:12px;}
    .ikr-hero-avg{font-size:calc(var(--ikr-hero-avg-size,64px) * 0.75);}
    .ikr-hero-actions{flex:0 0 auto;}
    .ikr-hero-actions .ikr-write-btn{display:none;}
    .ikr-hero-write-row{display:flex;width:100%;}
    .ikr-hero-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;
