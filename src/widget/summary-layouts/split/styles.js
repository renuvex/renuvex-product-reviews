// summary-layouts/split/styles.js
// Desktop-first override: split-spesifik tum CSS sadece >=769px'te aktif.
// Mobile (<=768px) split-col wrapper'lari display:contents ile seffaflasir
// -> base .ikr-summary (classic) gorunum otomatik gecerli olur.
// KRITIK: display:contents kurali MUTLAKA medya sorgusu icinde olmali; aksi
// halde desktop'ta da uygulanir ve flex:1 1 auto cocuklarini bozar.

export var SPLIT_CSS = `
  .ikr-title-split{text-align:center;}

  /* Mobile (<=768): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) — write-btn yan yana filter ile durur. */
  @media(max-width:600px){
    .ikr-split-left,.ikr-split-mid{display:contents;}
    /* .ikr-split-right classic'in .ikr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:center;
      gap:var(--ikr-col-gap,8px);
      width:100%;max-width:var(--ikr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=769px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:601px){
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
    /* Count classic .ikr-summary-count kullanir (font-size/weight/color
       oradan gelir). Burada sadece sola yaslama override. */
    .ikr-split-left .ikr-split-left-count{align-self:flex-start;text-align:left;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .ikr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart classic'teki 340px sınırının üzerine çıkar;
       split'in 3 kolon düzeninde mid kolon geniş alana yayıldığı için
       340px dar kalıyor, 480px okunabilirliği bozmadan sağı doldurur. */
    .ikr-split-mid .ikr-summary-bars{
      max-width:480px;width:100%;margin:0;
    }

    /* Sag: write + filter yan yana */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:center;gap:8px;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{align-self:auto;}
  }
`;
