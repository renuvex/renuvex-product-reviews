// summary-layouts/compact/styles.js
// Loox-style compact layout — header bar (her zaman görünür) + collapsible panel.
// Desktop: header → [trigger ......... write-btn + filter] tek satır.
// Mobile: header → [trigger ........ filter], altında write-btn full-width.
// Panel: ortalama puan + bar chart (340px max, ortalanmış).

export var COMPACT_CSS = `
  .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;}

  .ikr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:8px 0;
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

  .ikr-compact-actions-slot{
    flex:0 0 auto;display:flex;align-items:center;gap:var(--ikr-col-gap,8px);
  }
  .ikr-compact-actions-slot .ikr-filter-wrap{flex:0 0 auto;}
  .ikr-compact-actions-slot .ikr-write-btn{flex:0 0 auto;}

  /* Mobile-only write satırı — desktop'ta gizli, mobile'da görünür ve full-width */
  .ikr-compact-write-row{display:none;}
  .ikr-compact-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}

  .ikr-compact-panel{
    overflow:hidden;max-height:0;opacity:0;
    transition:max-height 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease, margin-top 200ms ease;
    margin-top:0;
  }
  .ikr-compact-panel.ikr-open{opacity:1;margin-top:4px;}

  .ikr-compact-panel-inner{
    display:flex;flex-direction:column;align-items:stretch;gap:16px;
    padding:20px;border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.08)));
    border-radius:var(--ikr-radius,6px);
    background:var(--ikr-widget-bg,transparent);
  }
  .ikr-compact-avg{
    display:flex;align-items:center;justify-content:center;gap:8px;
    font-size:32px;line-height:1;
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));font-weight:500;
  }
  .ikr-compact-avg .ikr-icon{
    width:32px;height:32px;color:var(--ikr-review-star-color,#f59e0b);
  }
  /* Bar chart orijinal boyutta — 340px max, ortalanmış (hem desktop hem mobile) */
  .ikr-compact-panel-inner .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0 auto;
  }

  @media(max-width:600px){
    .ikr-compact-header{gap:8px;}
    .ikr-compact-panel-inner{padding:16px;}
    /* Mobile: write butonunu header'dan çıkar, alttaki satırda göster */
    .ikr-compact-actions-slot .ikr-write-btn{display:none;}
    .ikr-compact-write-row{display:flex;width:100%;}
  }
`;
