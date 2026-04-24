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
    /* Mobile'da split = classic. Split-spesifik tum wrapper'lari
       display:contents ile seffaflastir; child'lar (avg-block, count, recommend,
       bars, write-btn, filter-wrap) dogrudan .ikr-summary'nin (base classic)
       child'i gibi davranir. Padding/gap/hizalama base .ikr-summary'den gelir. */
    .ikr-summary-split{display:flex;flex-direction:column;align-items:center;
      justify-content:flex-start;gap:0;padding:0;max-width:none;width:100%;}
    /* Sol ve orta wrapper'lari seffaflastir; sag wrapper kalir cunku
       write-btn (flex:1 1 auto) + filter-wrap (flex:0 0 col-count) icin
       bir flex-row container'a ihtiyac var. Aksi halde write-btn icerik
       kadar buzusur ve filter alta duser. */
    .ikr-split-left,.ikr-split-mid{display:contents;}
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:center;
      gap:var(--ikr-col-gap,8px);width:100%;padding:3px 6px;box-sizing:border-box;
    }
    .ikr-split-left-avg-block{align-self:center;margin:0 auto;}
    .ikr-summary-split .ikr-summary-bars{max-width:var(--ikr-summary-max,340px);margin:0 auto;}
  }
`;
