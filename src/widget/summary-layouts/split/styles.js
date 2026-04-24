// summary-layouts/split/styles.js
// Desktop-first override: split-spesifik tum CSS sadece >=769px'te aktif.
// Mobile (<=768px) hicbir override almaz -> base .ikr-summary (classic) gorunum
// otomatik gecerli olur. Bu yuzden split mobile = classic mobile, birebir ayni.
// Tek istisna: .ikr-split-col wrapper'lari mobile'da display:contents ile
// seffaflasir, cocuklar dogrudan summary'nin grid item'i gibi davranir.

export var SPLIT_CSS = `
  .ikr-title-split{text-align:center;}

  /* Mobile (<=768): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) — write-btn yan yana filter ile durur. */
  .ikr-split-left,.ikr-split-mid{display:contents;}
  .ikr-split-right{
    display:flex;flex-direction:row;align-items:center;
    gap:var(--ikr-col-gap,8px);width:100%;padding:3px 6px;box-sizing:border-box;
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=769px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:769px){
    .ikr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      min-width:0;
    }

    .ikr-summary-split{
      display:flex;flex-direction:row;align-items:center;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 0;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .ikr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
    .ikr-split-left-count{
      font-size:var(--ikr-review-count-size,16px);
      color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
      font-weight:400;
    }

    /* Orta: bar chart sola hizali */
    .ikr-split-mid{flex:1 1 auto;align-items:flex-start;}
    .ikr-split-mid .ikr-summary-bars{
      max-width:var(--ikr-summary-max,340px);width:100%;margin:0;
    }

    /* Sag: write + filter yan yana */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:center;gap:8px;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{align-self:auto;}
  }
`;
