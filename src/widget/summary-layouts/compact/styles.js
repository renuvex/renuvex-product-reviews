// summary-layouts/compact/styles.js
// Loox-style compact layout — header bar (her zaman görünür) + collapsible panel.
// Header'da yıldız + sayı + chevron; sağda Yorum Yap + filtre butonları.
// Tıklayınca panel açılır, içinde büyük ortalama puan + bar chart.

export var COMPACT_CSS = `
  .ikr-summary-compact{display:flex;flex-direction:column;width:100%;}

  .ikr-compact-header{
    display:flex;align-items:center;justify-content:space-between;gap:12px;
    width:100%;padding:8px 0;flex-wrap:wrap;
  }
  .ikr-compact-trigger{
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:8px 0;cursor:pointer;
    font-family:inherit;color:inherit;flex:1 1 auto;min-width:0;
  }
  .ikr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  .ikr-compact-trigger-stars .ikr-icon{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
    color:var(--ikr-review-star-color,#f59e0b);line-height:1;
  }
  .ikr-compact-trigger-text{
    font-size:var(--ikr-review-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:500;white-space:nowrap;
  }
  .ikr-compact-chevron{
    display:inline-flex;align-items:center;justify-content:center;
    width:14px;height:14px;flex-shrink:0;
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    transition:transform 200ms cubic-bezier(0.4,0,0.2,1);
  }
  .ikr-compact-trigger[aria-expanded="true"] .ikr-compact-chevron{transform:rotate(180deg);}

  .ikr-compact-actions{display:flex;align-items:center;gap:var(--ikr-col-gap,4px);flex-shrink:0;}
  .ikr-compact-actions .ikr-write-btn{padding:10px 20px;flex:0 0 auto;}
  .ikr-compact-actions .ikr-filter-wrap{flex:0 0 auto;}

  .ikr-compact-panel{
    overflow:hidden;max-height:0;opacity:0;
    transition:max-height 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease, margin-top 200ms ease;
    margin-top:0;
  }
  .ikr-compact-panel.ikr-open{opacity:1;margin-top:12px;}

  .ikr-compact-panel-inner{
    display:flex;flex-direction:column;align-items:center;gap:12px;
    padding:16px;border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.08)));
    border-radius:var(--ikr-radius,6px);
    background:var(--ikr-widget-bg,transparent);
  }
  .ikr-compact-avg{
    display:flex;align-items:center;gap:8px;font-size:32px;line-height:1;
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));font-weight:500;
  }
  .ikr-compact-avg .ikr-icon{
    width:32px;height:32px;color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-compact-panel-inner .ikr-summary-bars{max-width:var(--ikr-summary-max,340px);}

  @media(max-width:600px){
    .ikr-compact-actions .ikr-write-btn{padding:8px 12px;font-size:13px;}
    .ikr-compact-actions{gap:6px;}
  }
`;
