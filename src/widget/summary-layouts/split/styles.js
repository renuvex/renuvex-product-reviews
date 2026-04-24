// summary-layouts/split/styles.js
// Yatay 3 kolon: [SOL: ortalama+sayı] [ORTA: bar chart] [SAĞ: filter+write]
// Tüm değerler CSS variable üzerinden — admin renk/radius/font ayarlarına bağlı kalır.

export var SPLIT_CSS = `
  .ikr-title-split{text-align:center;}

  /* Ana grid — base .ikr-summary'nin column flex'ini override et */
  .ikr-summary-split{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:16px 0;
  }

  .ikr-split-col{
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    min-width:0;
  }

  /* Sol: avg (buyuk yildiz + sayi yan yana) -> sayi -> tavsiye, sol hizali */
  .ikr-split-left{flex:0 0 auto;gap:6px;text-align:left;align-items:flex-start;}
  /* Sol blok icindeyken avg-block soldan baslasin (base center'i ezer) */
  .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
  .ikr-split-left-count{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;
  }

  /* Orta: bar chart — sola hizali (margin:0 auto kaldirildi) */
  .ikr-split-mid{
    flex:1 1 auto;align-items:flex-start;
  }
  .ikr-split-mid .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0;
  }

  /* Sag: filter + write yan yana */
  .ikr-split-right{
    flex:0 0 auto;flex-direction:row;align-items:center;gap:8px;
  }
  .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
  .ikr-split-right .ikr-filter-wrap{align-self:auto;}

  @media(max-width:768px){
    /* Mobile: split'i tamamen classic davranisina dondur. Base .ikr-summary
       zaten flex column + center; split-spesifik override'lari sifirlariz.
       Boylece mobile'da split = classic gorunum (sol blok center, bar chart
       center, actions classic-style). */
    .ikr-summary-split{
      flex-direction:column;align-items:center;justify-content:flex-start;
      gap:0;padding:0;
    }
    /* Mid kolon icin width:100% sart - bar chart tam genislik almazsa
       .ikr-bar-track flex:1 1 auto'ya yer kalmaz, baralar gorunmez. */
    .ikr-split-col{width:auto;align-items:center;}
    .ikr-split-mid{width:100%;}
    /* Sol blok center hizalama (sol hizalamayi mobile'da kaldir) */
    .ikr-split-left{text-align:center;align-items:center;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:center;}
    /* Orta bar chart center */
    .ikr-split-mid{align-items:center;}
    .ikr-split-mid .ikr-summary-bars{max-width:var(--ikr-summary-max,340px);margin:0 auto;}
    /* Sag classic-style: yatay write + filter (zaten yatay), tam genislik */
    .ikr-split-right{width:100%;justify-content:center;}
  }
`;
