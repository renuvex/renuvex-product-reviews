// summary-layouts/minimal/styles.js
// Minimal layout — bar chart yok. Sol: avg + yıldız + alt satırda "X yorum".
// Sağ: filter + write. Mobile'da write alta düşer.

export var MINIMAL_CSS = `
  .ikr-title-minimal{text-align:left;}

  .ikr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px 0;
  }

  .ikr-minimal-info{
    display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;
  }
  .ikr-minimal-row{
    display:flex;align-items:center;gap:8px;
  }
  .ikr-minimal-avg{
    font-size:var(--ikr-minimal-avg-size,22px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1;
  }
  .ikr-minimal-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-minimal-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
  }
  .ikr-minimal-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;
  }

  .ikr-minimal-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-minimal{
      flex-wrap:wrap;gap:12px;
    }
    .ikr-minimal-info{flex:1 1 100%;}
    /* Write + filter tek satirda alt satira dusar, write full-genislik buyur,
       filter sagda ikon kutusu olarak kalir. */
    .ikr-minimal-actions{
      flex:1 1 100%;width:100%;justify-content:stretch;
    }
    .ikr-minimal-actions .ikr-write-btn{flex:1 1 auto;justify-content:center;}
    .ikr-minimal-actions .ikr-filter-wrap{flex:0 0 auto;}
    /* Eski mobile write-row artik gerekmez — actions zaten tam satirda */
    .ikr-minimal-write-row{display:none;}
  }
  @media(min-width:601px){
    .ikr-minimal-write-row{display:none;}
  }
`;
