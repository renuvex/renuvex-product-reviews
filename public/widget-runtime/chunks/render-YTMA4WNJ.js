/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as fa,b as Je,c as Hr,d as Ne,e as xe,f as xa,h as gt,i as Ye,k as Ze,l as ga,m as Qe,n as Yr,o as ha,p as ba,q as ya,r as wa}from"./chunk-7UREOTFQ.js";import{c as Ce}from"./chunk-WWGCW5YN.js";import{a as Ke,d as Pe}from"./chunk-N7KC6W47.js";import{A as na,B as ia,C as oa,D as la,E as Nr,F as Br,G as Fr,a as te,b as fr,c as ie,d as ae,e as Q,f as F,g as Xt,h as Oe,j as Lr,k as ct,l as $t,m as mt,n as Rr,o as Ue,p as Jt,q as Zt,r as Qt,s as ea,t as ra,u as ta,v as aa,w as _e}from"./chunk-DSBS2GI5.js";import{c as st}from"./chunk-MMMOHZLK.js";import{A as Vr,B as Se,C as ft,D as xt,E as gr,F as ma,G as hr,a as Le,b as pe,c as ue,d as ee,e as Ve,f as Ir,g as xr,h as da,i as Xe,j as Or,k as pa,l as we,m as Ur,n as ua,o as $e,q as G,r as sa,s as ke,t as Re,v as va,w as ze,x as ca,z as oe}from"./chunk-W5EJWPUT.js";import{a as de,b as ye,d as vt,k as He}from"./chunk-SUP34WWV.js";import"./chunk-W53BN4EO.js";import{a as ut,b as Kt,d as Me}from"./chunk-D4BSMMIO.js";var ka=`
  /* Review widget frame. Full-bleed so a merchant theme container cannot trap
     the review surface inside arbitrary side padding. */
  #renuvex-reviews-widget{color:#111111;background:transparent;border:1px solid var(--renuvex-pr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;--renuvex-pr-pad-summary-mobile:16px;--renuvex-pr-pad-review-mobile:16px;}
  #renuvex-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}

  /* User-content overflow guard. Keep it scoped to text-bearing review classes. */
  #renuvex-reviews-widget .renuvex-pr-body,
  #renuvex-reviews-widget .renuvex-pr-author,
  #renuvex-reviews-widget .renuvex-pr-review-title,
  #renuvex-reviews-widget .renuvex-pr-review-list-body,
  #renuvex-reviews-widget .renuvex-pr-review-list-title,
  #renuvex-reviews-widget .renuvex-pr-review-list-author-name,
  #renuvex-reviews-widget .renuvex-pr-review-gallery-body,
  #renuvex-reviews-widget .renuvex-pr-review-gallery-title,
  #renuvex-reviews-widget .renuvex-pr-review-gallery-author,
  #renuvex-reviews-widget .renuvex-pr-reply-text{overflow-wrap:anywhere;}
  .renuvex-pr-modal-body,
  .renuvex-pr-modal-title,
  .renuvex-pr-modal-author,
  .renuvex-pr-modal-reply-text{overflow-wrap:anywhere;}

  .renuvex-pr-title{font-size:var(--renuvex-pr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--renuvex-pr-header-title,#111111);overflow-wrap:anywhere;}
  .renuvex-pr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .renuvex-pr-icon > svg{width:100%;height:100%;display:block;}
`,za=`
  @media(max-width:600px){
    #renuvex-reviews-widget{padding-left:0;padding-right:0;}
    .renuvex-pr-review-card,
    .renuvex-pr-review-list,
    .renuvex-pr-review-gallery{
      padding-left:var(--renuvex-pr-pad-review-mobile);
      padding-right:var(--renuvex-pr-pad-review-mobile);
      box-sizing:border-box;
    }
    .renuvex-pr-title{
      padding-left:var(--renuvex-pr-pad-summary-mobile);
      padding-right:var(--renuvex-pr-pad-summary-mobile);
      text-align:center;
    }
    .renuvex-pr-review-list,
    .renuvex-pr-review-list.renuvex-pr-review-list--no-media,
    .renuvex-pr-review-gallery{
      padding-left:var(--renuvex-pr-pad-review-mobile);
      padding-right:var(--renuvex-pr-pad-review-mobile);
    }
  }
`;var Sa=`
  .renuvex-pr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--renuvex-pr-summary-max);}

  .renuvex-pr-summary-bars{display:flex;flex-direction:column;gap:4px;width:100%;max-width:var(--renuvex-pr-summary-max);}
  .renuvex-pr-bar-row{
    display:flex;align-items:center;justify-content:flex-start;gap:var(--renuvex-pr-col-gap);width:100%;
    cursor:pointer;border-radius:var(--renuvex-pr-radius,6px);padding:3px 6px;
    box-sizing:border-box;position:relative;
  }
  @media(hover:hover) and (pointer:fine){.renuvex-pr-bar-row:not(.renuvex-pr-bar-empty):hover{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07));}}
  .renuvex-pr-bar-row:focus-visible{outline:2px solid var(--renuvex-pr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .renuvex-pr-bar-active{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07))!important;}
  .renuvex-pr-bar-dimmed{opacity:0.35!important;}
  .renuvex-pr-bar-empty{cursor:default;}
  .renuvex-pr-bar-label{flex:0 0 var(--renuvex-pr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--renuvex-pr-bar-label-size,16px);color:#111111;}
  .renuvex-pr-bar-star{width:var(--renuvex-pr-bar-label-size,20px);height:var(--renuvex-pr-bar-label-size,20px);}
  .renuvex-pr-bar-star-filled{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-bar-star-empty{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-bar-track{flex:1 1 auto;min-width:0;background:var(--renuvex-pr-bar-track,#e5e7eb);border-radius:var(--renuvex-pr-radius-sm,4px);height:10px;overflow:hidden;}
  .renuvex-pr-bar-fill{height:10px;background:var(--renuvex-pr-bar-fill,#111111);border-radius:var(--renuvex-pr-radius-sm,4px);}
  .renuvex-pr-bar-count{flex:0 0 auto;min-width:var(--renuvex-pr-col-count);white-space:nowrap;text-align:right;color:var(--renuvex-pr-bar-count,#111111);font-size:var(--renuvex-pr-bar-count-size,14px);font-variant-numeric:tabular-nums;font-feature-settings:"tnum";}

  .renuvex-pr-summary-actions{
    display:flex;flex-direction:row;align-items:stretch;gap:var(--renuvex-pr-col-gap);
    box-sizing:border-box;
  }
  .renuvex-pr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--renuvex-pr-btn-bg,#111111);color:var(--renuvex-pr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:1px solid var(--renuvex-pr-btn-border,#111111);font-weight:500;font-size:var(--renuvex-pr-btn-text-size,14px);white-space:nowrap;transition:opacity 0.15s;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-write-btn:hover{opacity:0.92;}}
  .renuvex-pr-filter-wrap{flex:0 0 var(--renuvex-pr-col-count);position:relative;display:flex;justify-content:flex-end;align-items:stretch;}
  .renuvex-pr-filter-btn{display:flex;align-items:center;justify-content:center;width:36px;min-height:36px;height:auto;border-radius:var(--renuvex-pr-radius,6px);border:1px solid var(--renuvex-pr-filter-btn-border,#111111);background:var(--renuvex-pr-filter-btn-bg,transparent);color:var(--renuvex-pr-filter-btn-text,#111111);cursor:pointer;}
  .renuvex-pr-filter-btn svg{width:16px;height:16px;flex-shrink:0;}

  @keyframes renuvex-pr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .renuvex-pr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--renuvex-pr-filter-menu-bg,#ffffff);border:1px solid var(--renuvex-pr-filter-menu-border,#e5e7eb);border-radius:var(--renuvex-pr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;visibility:hidden;opacity:0;pointer-events:none;transform-origin:top right;}
  .renuvex-pr-filter-menu.renuvex-pr-open{visibility:visible;pointer-events:auto;animation:renuvex-pr-grow-out 200ms ease-in-out forwards;}
  .renuvex-pr-filter-item{display:block;width:100%;text-align:left;padding:10px 16px;font:inherit;font-size:var(--renuvex-pr-filter-text-size,14px);color:var(--renuvex-pr-filter-item-text,#111111);background:transparent;border:0;cursor:pointer;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-filter-item:hover{background:var(--renuvex-pr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .renuvex-pr-filter-item-active{font-weight:700;color:var(--renuvex-pr-filter-item-active,#111111);}
  .renuvex-pr-filter-btn:focus-visible,
  .renuvex-pr-filter-item:focus-visible{outline:2px solid var(--renuvex-pr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .renuvex-pr-filter-item:focus-visible{outline-offset:-2px;background:var(--renuvex-pr-filter-item-hover-bg,rgba(17,17,17,0.07));}
`;var Ca=`
  .renuvex-pr-media-gallery-title{
    font-size:var(--renuvex-pr-media-gallery-title-size,16px);
    font-weight:500;
    color:var(--renuvex-pr-media-gallery-title,#111111);
    margin-bottom:12px;
    overflow-wrap:anywhere;
  }
  .renuvex-pr-media-gallery-strip-wrap{position:relative;}

  .renuvex-pr-media-gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--renuvex-pr-media-gallery-arrow-bg,#fff);border:1px solid var(--renuvex-pr-media-gallery-arrow-border,rgba(0,0,0,0.12));border-radius:var(--renuvex-pr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--renuvex-pr-media-gallery-arrow-text,#111111);transition:all 0.2s ease;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-media-gallery-arrow:hover{background:var(--renuvex-pr-media-gallery-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);}}
  button.renuvex-pr-media-gallery-arrow:active{opacity:1;}
  .renuvex-pr-media-gallery-arrow-prev{left:-16px;}
  .renuvex-pr-media-gallery-arrow-next{right:-16px;}
  .renuvex-pr-media-gallery-arrow svg{width:18px;height:18px;}
  @media(max-width:600px){.renuvex-pr-media-gallery-arrow{display:none;}}

  .renuvex-pr-media-gallery-section{margin:24px 0 32px;padding:0 var(--renuvex-pr-pad-review-mobile);display:block;}
  .renuvex-pr-media-gallery-section--placeholder{visibility:hidden;pointer-events:none;}
  .renuvex-pr-media-gallery-strip{display:flex;gap:10px;overflow-x:auto;padding:4px 0;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .renuvex-pr-media-gallery-strip::-webkit-scrollbar{display:none;}
  .renuvex-pr-media-gallery-thumb{flex:0 0 var(--renuvex-pr-thumbnail-size,90px);width:var(--renuvex-pr-thumbnail-size,90px);height:auto;aspect-ratio:var(--renuvex-pr-media-gallery-thumb-aspect,1/1);border-radius:var(--renuvex-pr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease;border:1px solid var(--renuvex-pr-media-gallery-image-border,rgba(0,0,0,0.05));}
  /* Mobile: list/gallery media-gallery thumbnails match review-item media size.
     card keeps the desktop value because --renuvex-pr-thumbnail-size-mobile is
     the same as the desktop value. Breakpoint 600px stays in sync with review media. */
  @media(max-width:600px){
    .renuvex-pr-media-gallery-thumb{
      flex-basis:var(--renuvex-pr-thumbnail-size-mobile,var(--renuvex-pr-thumbnail-size,90px));
      width:var(--renuvex-pr-thumbnail-size-mobile,var(--renuvex-pr-thumbnail-size,90px));
    }
  }
  /* Media triggers have role=button, so BASE_RESET ADR_0011 press-dim would add
     an unnecessary flash before the lightbox opens. Keep media thumbnails stable. */
  .renuvex-pr-media-gallery-thumb:active{opacity:1 !important;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-media-gallery-thumb:hover{transform:translateY(-2px);}}
  .renuvex-pr-media-gallery-strip-wrap{position:relative;display:block;}
`;var Ea=`
  .renuvex-pr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .renuvex-pr-review-stars .renuvex-pr-icon{width:var(--renuvex-pr-star-size,20px);height:var(--renuvex-pr-star-size,20px);}
  .renuvex-pr-stars{display:inline-flex;gap:2px;align-items:center;color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-stars .renuvex-pr-icon-filled{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-stars .renuvex-pr-icon-empty{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .renuvex-pr-read-more{display:block;margin-top:var(--renuvex-pr-gap-tight);color:var(--renuvex-pr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--renuvex-pr-read-more-size,12px);appearance:none;-webkit-appearance:none;background:none;border:0;padding:0;text-align:left;font-family:inherit;}
  .renuvex-pr-read-more:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;border-radius:2px;}
  .renuvex-pr-reply{margin-top:var(--renuvex-pr-gap-loose);padding:12px 16px;background:var(--renuvex-pr-reply-bg-color,#f9fafb);border-radius:var(--renuvex-pr-radius,6px);border-left:3px solid var(--renuvex-pr-reply-border,#747474);}
  .renuvex-pr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .renuvex-pr-reply-label{font-weight:600;font-size:var(--renuvex-pr-reply-name-size,13px);color:var(--renuvex-pr-reply-label,#111111);overflow-wrap:anywhere;}
  .renuvex-pr-reply-text{font-size:var(--renuvex-pr-reply-text-size,13px);font-weight:400;color:var(--renuvex-pr-reply-text,#111111);line-height:1.6;}
  .renuvex-pr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .renuvex-pr-reply-read-more{margin-top:var(--renuvex-pr-gap-tight);}

  .renuvex-pr-load-more{display:flex;align-items:center;justify-content:center;margin:var(--renuvex-pr-pagination-margin-top,20px) auto 0;min-height:var(--renuvex-pr-load-more-min-height,40px);padding:0;box-sizing:border-box;border:0;border-radius:var(--renuvex-pr-radius,6px);background:transparent;color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);line-height:1.2;font-family:inherit;cursor:pointer;}
  .renuvex-pr-load-more-label{display:inline-flex;align-items:center;justify-content:center;min-height:var(--renuvex-pr-load-more-min-height,40px);padding:var(--renuvex-pr-load-more-pad-y,10px) var(--renuvex-pr-load-more-pad-x,28px);box-sizing:border-box;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);}
  .renuvex-pr-load-more:focus{outline:none;}
  .renuvex-pr-load-more:focus-visible .renuvex-pr-load-more-label{outline:2px solid var(--renuvex-pr-load-more-border,#111111);outline-offset:2px;}
  .renuvex-pr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Numaral\u0131 sayfalama (paginationMode === 'numbered'). Ak\u0131\u015Fta, listenin alt\u0131nda,
     ortal\u0131 \u2014 sticky/fixed de\u011Fil. Aktif sayfa: dolu kutu (renkler ters); font a\u011F\u0131rl\u0131\u011F\u0131
     di\u011Fer butonlarla ayn\u0131 \u2014 dolu arka plan tek ba\u015F\u0131na yeterli ayr\u0131m. */
  .renuvex-pr-pagination{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:var(--renuvex-pr-pagination-gap,6px);margin:var(--renuvex-pr-pagination-margin-top,20px) auto 0;}
  .renuvex-pr-pagination-btn,.renuvex-pr-pagination-arrow{min-width:var(--renuvex-pr-pagination-button-size,40px);height:var(--renuvex-pr-pagination-button-size,40px);padding:0;display:inline-flex;align-items:center;justify-content:center;line-height:1;box-sizing:border-box;border:0;border-radius:var(--renuvex-pr-radius,6px);background:transparent;color:var(--renuvex-pr-pagination-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);font-family:inherit;cursor:pointer;}
  .renuvex-pr-pagination-label{min-width:var(--renuvex-pr-pagination-button-size,40px);height:var(--renuvex-pr-pagination-button-size,40px);padding:0 var(--renuvex-pr-pagination-pad-x,10px);display:inline-flex;align-items:center;justify-content:center;line-height:1;box-sizing:border-box;border:1px solid var(--renuvex-pr-pagination-border,#e5e7eb);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-pagination-bg,#ffffff);color:inherit;}
  .renuvex-pr-pagination-btn[aria-current="page"]{color:var(--renuvex-pr-pagination-active-text,#ffffff);cursor:default;}
  .renuvex-pr-pagination-btn[aria-current="page"] .renuvex-pr-pagination-label{background:var(--renuvex-pr-pagination-active-bg,#111111);border-color:var(--renuvex-pr-pagination-active-bg,#111111);}
  .renuvex-pr-pagination-btn:focus,.renuvex-pr-pagination-arrow:focus{outline:none;}
  .renuvex-pr-pagination-btn:focus-visible .renuvex-pr-pagination-label,.renuvex-pr-pagination-arrow:focus-visible .renuvex-pr-pagination-label{outline:2px solid var(--renuvex-pr-pagination-text,#111111);outline-offset:2px;}
  .renuvex-pr-pagination-arrow:disabled{cursor:not-allowed;}
  .renuvex-pr-pagination-arrow:disabled .renuvex-pr-pagination-label{opacity:.45;}
  .renuvex-pr-pagination[aria-busy="true"] button{cursor:progress;}
  .renuvex-pr-pagination[aria-busy="true"] button .renuvex-pr-pagination-label{opacity:.6;}
  .renuvex-pr-pagination-gap{min-width:var(--renuvex-pr-pagination-gap-min,24px);text-align:center;color:var(--renuvex-pr-pagination-text,#111111);opacity:.55;user-select:none;}
  @media (max-width:640px),(pointer:coarse){
    .renuvex-pr-load-more{min-height:var(--renuvex-pr-load-more-mobile-min-height,var(--renuvex-pr-load-more-min-height,40px));margin-top:var(--renuvex-pr-pagination-mobile-margin-top,var(--renuvex-pr-pagination-margin-top,20px));}
    .renuvex-pr-load-more-label{min-height:var(--renuvex-pr-load-more-mobile-min-height,var(--renuvex-pr-load-more-min-height,40px));}
    .renuvex-pr-pagination{gap:var(--renuvex-pr-pagination-mobile-gap,var(--renuvex-pr-pagination-gap,6px));margin-top:var(--renuvex-pr-pagination-mobile-margin-top,var(--renuvex-pr-pagination-margin-top,20px));}
    .renuvex-pr-pagination-btn,.renuvex-pr-pagination-arrow{min-width:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));height:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));font-size:var(--renuvex-pr-pagination-mobile-font-size,var(--renuvex-pr-load-more-size,14px));}
    .renuvex-pr-pagination-label{min-width:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));height:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));}
    .renuvex-pr-pagination-gap{min-width:var(--renuvex-pr-pagination-mobile-gap-min,var(--renuvex-pr-pagination-gap-min,24px));}
  }
  @media (hover:hover) and (pointer:fine){
    .renuvex-pr-pagination-btn:not([aria-current="page"]):hover .renuvex-pr-pagination-label,.renuvex-pr-pagination-arrow:not(:disabled):hover .renuvex-pr-pagination-label{border-color:var(--renuvex-pr-pagination-text,#111111);}
  }
`;var Ta=`
  .renuvex-pr-state-msg{text-align:center;color:var(--renuvex-pr-state-text,rgba(17,17,17,0.65));font-size:var(--renuvex-pr-review-text-size,14px);padding:30px 0;}
  .renuvex-pr-reviews-empty .renuvex-pr-title{text-align:left;}
  .renuvex-pr-empty-state{display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%;box-sizing:border-box;padding:16px 8px;}
  .renuvex-pr-empty-state-content{display:flex;flex-direction:column;align-items:flex-start;gap:12px;min-width:0;text-align:left;}
  .renuvex-pr-empty-state-stars{display:inline-flex;color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-empty-state-stars .renuvex-pr-star{width:var(--renuvex-pr-bar-label-size,20px);height:var(--renuvex-pr-bar-label-size,20px);}
  .renuvex-pr-empty-state-text{margin:0;padding:0;text-align:left;line-height:1.5;max-width:460px;overflow-wrap:anywhere;color:var(--renuvex-pr-review-body,#111111);}
  .renuvex-pr-empty-state-cta{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;align-self:center;margin:0 0 0 auto;}
  @media(max-width:600px){
    .renuvex-pr-empty-state{flex-direction:column;align-items:stretch;gap:20px;padding-left:var(--renuvex-pr-pad-summary-mobile);padding-right:var(--renuvex-pr-pad-summary-mobile);}
    .renuvex-pr-empty-state-content{width:100%;}
    .renuvex-pr-empty-state-cta{width:100%;margin:0;}
  }
  .renuvex-pr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .renuvex-pr-state-error-text{max-width:360px;line-height:1.45;}
  .renuvex-pr-state-retry{padding:9px 22px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-state-retry:disabled{opacity:.6;cursor:not-allowed;}
`;var Aa=`
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-modal-wrap:focus,.renuvex-pr-modal-wrap:focus-visible{outline:none;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img,.renuvex-pr-modal-main-video{position:absolute;top:0;left:0;z-index:1;width:100%;height:100%;object-fit:contain;display:block;background:#222;transition:opacity 0.25s ease;}
  .renuvex-pr-modal-main-video{border:0;--media-object-fit:contain;--media-object-position:center;--seek-backward-button:none;--seek-forward-button:none;--airplay-button:none;--pip-button:none;--cast-button:none;--fullscreen-button:none;--playback-rate-button:none;--rendition-menu-button:none;--audio-track-menu-button:none;--controls-backdrop-color:rgba(0,0,0,0.58);--media-primary-color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);--media-secondary-color:#000000;}
  /* \u0130lk a\xE7\u0131l\u0131\u015Fta g\xF6rsel y\xFCklenene kadar opacity:0; load/error'da class kalkar ve yukar\u0131daki
     transition ile yumu\u015Fak fade-in olur (koyu zemine ani "pop"/flash yerine). */
  .renuvex-pr-modal-img-loading{opacity:0;}
  .renuvex-pr-modal-img-error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:#cccccc;background:#222;font-size:14px;line-height:1.4;text-align:center;}
  .renuvex-pr-modal-img-enter-right{animation:renuvexPrSlideInRight 0.2s ease forwards;}
  .renuvex-pr-modal-img-enter-left{animation:renuvexPrSlideInLeft 0.2s ease forwards;}
  .renuvex-pr-modal-video-enter{animation:renuvexPrVideoFadeIn 0.15s ease forwards;}
  @keyframes renuvexPrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes renuvexPrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes renuvexPrVideoFadeIn{from{opacity:0;}to{opacity:1;}}
  .renuvex-pr-modal-close,
  .renuvex-pr-modal-close-mobile{background:#00000080;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--renuvex-pr-radius,6px);width:32px;height:32px;align-items:center;justify-content:center;}
  .renuvex-pr-modal-close{position:absolute;top:-42px;right:0;display:flex;z-index:100000;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.renuvex-pr-modal-close{display:none;}}
  .renuvex-pr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:4;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-modal-close-mobile:hover{opacity:0.85;}}
  .renuvex-pr-modal-nav{position:absolute;top:50%;z-index:4;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-modal-nav:hover{opacity:0.85;}}
  .renuvex-pr-modal-nav-prev{left:10px;}
  .renuvex-pr-modal-nav-next{right:10px;}
  .renuvex-pr-modal-nav svg{width:18px;height:18px;}
  .renuvex-pr-modal-close svg,.renuvex-pr-modal-close-mobile svg{width:14px;height:14px;}
  .renuvex-pr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;z-index:3;display:flex;justify-content:center;gap:6px;padding:0 12px;max-width:100%;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;touch-action:pan-x;transition:opacity 0.15s ease,transform 0.15s ease;}
  .renuvex-pr-modal-thumbs::-webkit-scrollbar{display:none;}
  .renuvex-pr-modal-thumbs--gallery{justify-content:flex-start;padding:0 14px;}
  .renuvex-pr-modal-left-video-playing .renuvex-pr-modal-thumbs{opacity:0;transform:translateY(8px);pointer-events:none;}
  .renuvex-pr-modal-thumb{flex:0 0 52px;width:52px;height:52px;object-fit:cover;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;touch-action:manipulation;}
  .renuvex-pr-modal-thumb-button{position:relative;display:block;flex:0 0 52px;padding:0;background:#222;overflow:hidden;}
  .renuvex-pr-modal-thumb-img{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-modal-thumb-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,.35);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-modal-thumb-play svg{width:12px;height:12px;margin-left:1px;}
  .renuvex-pr-modal-thumb-active{border-color:#fff;opacity:1;}
  .renuvex-pr-modal-close:focus-visible,.renuvex-pr-modal-close-mobile:focus-visible,.renuvex-pr-modal-nav:focus-visible,.renuvex-pr-modal-thumb:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}
  .renuvex-pr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:0;display:flex;flex-direction:column;background:#ffffff;color:#111111;}
  .renuvex-pr-modal-scroll-content > *{min-width:0;}
  .renuvex-pr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .renuvex-pr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .renuvex-pr-modal-stars .renuvex-pr-icon{width:var(--renuvex-pr-star-size,24px);height:var(--renuvex-pr-star-size,24px);}
  .renuvex-pr-modal-date{font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;color:var(--renuvex-pr-review-date,#5e5e5e);white-space:nowrap;flex-shrink:0;}
  .renuvex-pr-modal-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-author{font-size:var(--renuvex-pr-author-size,14px);font-weight:600;font-style:normal;color:var(--renuvex-pr-review-author,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .renuvex-pr-modal-body{font-size:var(--renuvex-pr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--renuvex-pr-review-body,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-reply{margin-top:var(--renuvex-pr-gap-loose);padding:12px 16px;background:var(--renuvex-pr-reply-bg-color,#f9fafb);border-radius:var(--renuvex-pr-radius,6px);border-left:3px solid var(--renuvex-pr-reply-border,#747474);}
  .renuvex-pr-modal-reply-label{font-weight:600;font-size:var(--renuvex-pr-reply-name-size,13px);color:var(--renuvex-pr-reply-label,#111111);margin-bottom:4px;overflow-wrap:anywhere;}
  .renuvex-pr-modal-reply-text{font-size:var(--renuvex-pr-reply-text-size,13px);font-weight:400;color:var(--renuvex-pr-reply-text,#111111);line-height:1.6;}

  @media(min-width:641px) and (max-width:800px){
    .renuvex-pr-modal-wrap{width:100%;max-width:640px;max-height:calc(100vh - 32px);max-height:calc(100svh - 32px);max-height:calc(100dvh - 32px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;}
    .renuvex-pr-modal{flex-direction:column;height:auto;max-height:none;}
    .renuvex-pr-modal-left{flex:none;width:100%;height:420px;height:min(420px, 56vh);height:min(420px, 56svh);height:min(420px, 56dvh);}
    .renuvex-pr-modal-right{flex:none;width:100%;overflow-y:visible;}
    .renuvex-pr-modal-scroll-content{padding:20px 20px 32px;}
    .renuvex-pr-modal-close{display:none;}
    .renuvex-pr-modal-close-mobile{display:flex;}
  }
  @media(max-width:640px){
    .renuvex-pr-modal-overlay{padding:0;background:transparent;}
    .renuvex-pr-modal-wrap{position:fixed;inset:0;overflow-y:scroll;z-index:100000;width:100%;max-width:100%;height:100vh;height:100svh;height:100dvh;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,0.50);}
    .renuvex-pr-modal{flex-direction:column;height:auto;min-height:100vh;min-height:100svh;min-height:100dvh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
    .renuvex-pr-modal-left{flex:none;width:100%;aspect-ratio:3/4;overflow:hidden;}
    .renuvex-pr-modal-right{overflow-y:visible;flex:none;width:100%;}
    .renuvex-pr-modal-scroll-content{padding:16px 16px 48px;}
    .renuvex-pr-modal-close{display:none;}
    .renuvex-pr-modal-close-mobile{display:flex;}
  }
`;var Ma=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:var(--renuvex-pr-media-play-size,42px);height:var(--renuvex-pr-media-play-size,42px);min-width:var(--renuvex-pr-media-play-size,42px);min-height:var(--renuvex-pr-media-play-size,42px);border-radius:50%;background:rgba(0,0,0,.35);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size,21px);height:var(--renuvex-pr-media-play-icon-size,21px);margin-left:2px;}
  @media(max-width:640px){
    .renuvex-pr-media-play{width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));min-width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));min-height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));}
    .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));height:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));}
  }
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Dr=[ka,va,Sa,Ca,Ea,Ta,Ma,Aa,za].join(`
`);function Xn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ge(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function $n(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function Jn(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",i=$n()&&!n;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Zn(e){var r=document.body.style,t=document.documentElement.style;ge(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ge(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ge(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ge(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ge(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ge(r,"position",e.bodyPosition,e.bodyPositionPriority),ge(r,"top",e.bodyTop,e.bodyTopPriority),ge(r,"left",e.bodyLeft,e.bodyLeftPriority),ge(r,"right",e.bodyRight,e.bodyRightPriority),ge(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var br=0,er=null;function jr(){return br+=1,br>1||(er=Xn(),Jn(er)),er}function Gr(){if(br!==0&&(br-=1,!(br>0))){var e=er;er=null,e&&Zn(e)}}function Qn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Wr(){var e=Qn();return!e||e===document.body||e===document.documentElement?null:e}function se(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ei(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ht(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ei)}function ri(e,r){var t=e,a=ht(e);!a.length&&r&&(t=r,a=ht(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;se(n)}function qr(e,r,t){if(e.key==="Tab"){var a=ht(r);if(!a.length){e.preventDefault(),ri(r);return}var n=a[0],i=a[a.length-1],o=ha(t);if(!r.contains(o)){e.preventDefault(),se(n);return}if(a.indexOf(o)===-1){e.preventDefault(),se(e.shiftKey?i:n);return}e.shiftKey&&o===n?(e.preventDefault(),se(i)):!e.shiftKey&&o===i&&(e.preventDefault(),se(n))}}var Pa="renuvexPrOverlay";function Kr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Pa]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function ti(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Pa]===e.id)}function Xr(e){if(ti(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}var ai="media-theme-renuvex-review-storefront";var _a="renuvex-review-storefront",rr={controlForeground:"#ffffff",controlBackground:"#000000",controlHoverBackground:"rgba(0,0,0,0.84)",centerPlayButtonBackground:"rgba(0,0,0,0.68)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.72)",controlsBackdrop:"rgba(0,0,0,0.58)",menuBackground:"#000000",menuBorder:"rgba(255,255,255,0.18)",menuText:"#ffffff",menuCheckedText:"#ffffff",menuHoverBackground:"rgba(255,255,255,0.12)",menuCheckedBackground:"rgba(255,255,255,0.18)",menuHoverOutline:"rgba(255,255,255,0.54) solid 1px",progressPlayed:"#ffffff",progressTrack:"#000000",progressPointer:"rgba(255,255,255,0.72)",progressBuffered:"rgba(255,255,255,0.28)",progressThumbBorder:"1px solid rgba(255,255,255,0.72)",progressThumbShadow:"0 0 0 1px rgba(0,0,0,0.45)",progressPointerBorder:"1px solid rgba(0,0,0,0.55)"};function $r(e,r){return`var(--renuvex-pr-review-lightbox-video-${e}, ${r})`}var ni=ut({},rr),yr=Kt(ut({},rr),{controlForeground:$r("icon",rr.controlForeground),centerPlayButtonBackground:"rgba(0,0,0,0.35)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.42)",progressPlayed:$r("progress",rr.progressPlayed),progressTrack:$r("progress-track",rr.progressTrack),progressThumbBorder:`1px solid ${$r("progress",rr.progressPlayed)}`}),Jr=null;function La(e){return`
  :host {
    --media-control-hover-background: ${e.controlHoverBackground};
    --media-icon-color: ${e.controlForeground};
    --media-text-color: ${e.controlForeground};
  }

  media-control-bar,
  media-control-bar *,
  .center-controls,
  .center-controls * {
    --media-control-hover-background: ${e.controlHoverBackground};
    --media-icon-color: ${e.controlForeground};
    --media-text-color: ${e.controlForeground};
  }

  .center-controls.pre-playback media-play-button,
  [breakpointsm] .center-controls.pre-playback media-play-button {
    --media-control-background: ${e.centerPlayButtonBackground};
    --media-control-hover-background: ${e.centerPlayButtonHoverBackground};
    --media-control-padding: 0;
    --media-button-padding: 0;
    --media-button-icon-width: 34px;
    --media-button-icon-height: 34px;
    --media-icon-color: ${e.controlForeground};
    width: 72px;
    height: 72px;
    min-width: 72px;
    border-radius: 50%;
    overflow: hidden;
  }

  [breakpointsm] .center-controls.pre-playback media-play-button {
    --media-button-icon-width: 30px;
    --media-button-icon-height: 30px;
    width: 64px;
    height: 64px;
    min-width: 64px;
  }

  media-time-range {
    --media-range-bar-color: ${e.progressPlayed};
    --media-range-thumb-background: radial-gradient(
      circle,
      ${e.controlBackground} 0%,
      ${e.controlBackground} 32%,
      ${e.progressPlayed} 32%,
      ${e.progressPlayed} 100%
    );
    --media-range-thumb-border: ${e.progressThumbBorder};
    --media-range-thumb-box-shadow: ${e.progressThumbShadow};
    --media-range-track-background: ${e.progressTrack};
    --media-range-track-pointer-background: ${e.progressPointer};
    --media-range-track-pointer-border-right: ${e.progressPointerBorder};
    --media-time-range-buffered-color: ${e.progressBuffered};
    --media-preview-thumbnail-display: none;
    --media-preview-time-background: ${e.controlBackground};
    --media-preview-time-text-shadow: none;
    --media-text-background: ${e.controlBackground};
    --media-control-background: ${e.controlBackground};
    --media-text-color: ${e.controlForeground};
  }

  [part~='menu'] {
    border-color: ${e.menuBorder};
    color: ${e.menuText};
  }

  media-captions-menu,
  media-rendition-menu,
  media-audio-track-menu,
  media-playback-rate-menu {
    --media-menu-background: ${e.menuBackground};
    --media-menu-item-checked-background: ${e.menuCheckedBackground};
    --media-menu-item-hover-background: ${e.menuHoverBackground};
    --media-menu-item-hover-outline: ${e.menuHoverOutline};
    --media-text-color: ${e.menuText};
    color: ${e.menuText};
  }

  media-playback-rate-menu[part~='menu']::part(checked) {
    color: ${e.menuCheckedText};
  }
`}var dl=La(ni),ii=La(yr);function oi(e,r){var u;if(typeof window=="undefined"||typeof document=="undefined")return;let t=window.customElements;if(t.get(e))return;let a=t.get("media-theme-gerwig"),n=a==null?void 0:a.template;if(!a||!(n instanceof HTMLTemplateElement))return;let i=n.cloneNode(!0);i.id=e,(u=i.content.querySelector("media-controller"))==null||u.setAttribute("lang","tr");let o=document.createElement("style");o.textContent=r,i.content.append(o);class l extends a{}l.template=i,t.define(e,l)}function li(e,r){return typeof window=="undefined"?Promise.resolve():(Jr!=null||(Jr=import("./review-player-i18n-775ENPF7.js").then(()=>import("./dist-ESXZERR5.js")).then(()=>import("./menu-ZPT7P4I2.js")).then(()=>import("./gerwig-J4LRWRX2.js")).then(()=>import("./dist-F5RX6YFS.js")).then(()=>{})),Jr.then(()=>{oi(e,r)}))}function Ra(){return li(ai,ii)}var yt=null,Fa="--center-play-button";function di(){return yt||(yt=Ra()),yt}function pi(e){return new Promise(function(r){function t(a){if(a<=0){r();return}requestAnimationFrame(function(){t(a-1)})}t(e)})}function ui(e){e.style.setProperty(Fa,"none")}function Na(e){e.style.removeProperty(Fa)}function si(e){if(!e||typeof e!="object")return"";var r=typeof e.playbackId=="string"?e.playbackId.trim():"",t=fa(e.url);return r&&t&&r!==t?"":r||t}function vi(e,r){var t=si(r);if(!t)return!1;var a=Je(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"";return e.setAttribute("disable-tracking",""),e.setAttribute("disable-cookies",""),e.setAttribute("preload","metadata"),e.setAttribute("stream-type","on-demand"),e.setAttribute("muted",""),e.setAttribute("playsinline",""),e.setAttribute("nohotkeys",""),e.setAttribute("lang","tr"),e.setAttribute("theme",_a),e.setAttribute("accent-color",yr.controlForeground),e.setAttribute("primary-color",yr.controlForeground),e.setAttribute("secondary-color",yr.controlBackground),a&&e.setAttribute("poster",a),e.setAttribute("playback-id",t),!0}function Ba(e){e.preventDefault()}function Ia(e,r){var t=!1,a=document.createElement("mux-player");a.className=r||"renuvex-pr-modal-main-video",a.setAttribute("aria-label","Yorum videosu"),ui(a),a.addEventListener("contextmenu",Ba);var n=vi(a,e);return n?di().then(function(){if(window.customElements&&typeof window.customElements.whenDefined=="function")return window.customElements.whenDefined("mux-player")}).then(function(){if(!t){try{typeof a.pause=="function"&&a.pause()}catch(i){}return pi(2)}}).then(function(){t||Na(a)}).catch(function(){t||a.dispatchEvent(new Event("error"))}):setTimeout(function(){t||a.dispatchEvent(new Event("error"))},0),{element:a,cleanup:function(){t=!0;try{typeof a.pause=="function"&&a.pause()}catch(o){}a.removeAttribute("playback-id"),a.removeAttribute("playback-token"),a.removeAttribute("thumbnail-token"),a.removeAttribute("poster"),Na(a),a.removeEventListener("contextmenu",Ba)}}}function tr(e){return Ne(e)}function Ua(e){return e&&e.source==="mediaGallery"}function ci(e,r){if(!Ua(r))return tr(e);var t=xe(e);return t?[t]:[]}function mi(e,r){return(e||[]).filter(function(t){return r==="mediaGallery"?!!xe(t):tr(t).length>0})}function kt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function Oa(e,r,t,a,n,i){e&&e.shadowRoot&&kt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Gr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Ir(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&se(n)}function fi(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ke(e.rating,F);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=ze(e.createdAt),a.appendChild(n),a.appendChild(i),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-modal-body",u.textContent=(e.comment||"").trim(),u.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(u);var d=document.createElement("div");d.className="renuvex-pr-modal-reply";var f=document.createElement("div");f.className="renuvex-pr-modal-reply-label",f.textContent=G(F&&F.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",d.appendChild(f),d.appendChild(v),d.style.display=e.merchantReply?"":"none",t.appendChild(d),r.appendChild(t),r}function Va(e,r,t){var a=t||F,n=e.querySelector(".renuvex-pr-modal-scroll-content"),i=n.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ke(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=ze(r.createdAt);var o=n.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=n.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var u=n.querySelector(".renuvex-pr-modal-reply");u.querySelector(".renuvex-pr-modal-reply-label").textContent=G(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),u.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",u.style.display=r.merchantReply?"":"none",e.scrollTop=0}var xi=112;function zt(e){return e&&e.touches&&e.touches.length?e.touches[0]:e&&e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null}function gi(e){var r=e&&e.target;return!!(r&&typeof r.closest=="function"&&r.closest(".renuvex-pr-modal-thumbs"))}function hi(e,r,t){if(!r||r.type!=="video"||!t)return!1;var a=zt(e);if(!a)return!1;var n=t.querySelector("mux-player.renuvex-pr-modal-main-video");if(!n||typeof n.getBoundingClientRect!="function")return!1;var i=n.getBoundingClientRect();if(!i.width||!i.height||a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom)return!1;var o=Math.min(xi,Math.max(72,i.height*.2));return a.clientY>=i.bottom-o}function bi(e){var r=e&&e.type==="video"?e.posterUrl:e&&e.url;if(e&&e.type==="video"){var t={width:Se,height:Se,fit:"crop"};return{src:Je(r,t),srcset:Hr(r,t)}}return gr(r,Se)}function yi(e,r,t){var a=e&&e.media;if(!a)return null;var n=document.createElement("button");n.type="button",n.className="renuvex-pr-modal-thumb renuvex-pr-modal-thumb-button"+(a.type==="video"?" renuvex-pr-modal-thumb-video":"")+(r?" renuvex-pr-modal-thumb-active":""),n.setAttribute("aria-label","Galeri medyas\u0131 "+(e.index+1)+" se\xE7"),r&&n.setAttribute("aria-current","true");var i=document.createElement("img");i.className="renuvex-pr-modal-thumb-img";var o=bi(a);if(i.src=o.src,o.srcset&&(i.srcset=o.srcset),i.loading="lazy",i.decoding="async",i.width=Se,i.height=Se,i.alt="",hr(i),n.appendChild(i),a.type==="video"){var l=document.createElement("span");l.className="renuvex-pr-modal-thumb-play";var u=ee($e);u&&l.appendChild(u),n.appendChild(l)}return n.onclick=t,n}function wi(e){var r=[];return(e||[]).forEach(function(t,a){var n=xe(t);n&&r.push({review:t,reviewIdx:a,media:n,index:r.length})}),r}function St(e,r,t,a,n,i,o,l,u){var d=ci(e,u),f=Math.max(0,Math.min(t||0,d.length-1)),v=d[f],p=document.createElement("div");p.className="renuvex-pr-modal-left";var s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(v&&v.type==="video"){var h=Ia(v,"renuvex-pr-modal-main-video"+(s?" renuvex-pr-modal-video-enter":"")),c=h.element;c.addEventListener("error",function(){if(!p.querySelector(".renuvex-pr-modal-img-error")){var N=document.createElement("div");N.className="renuvex-pr-modal-img-error",N.setAttribute("role","status"),N.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",p.insertBefore(N,c)}});var m=!1,b=function(){p.classList.add("renuvex-pr-modal-left-video-playing")},w=function(){m=!0,b()},S=function(){m&&b()},M=function(){m=!1,p.classList.remove("renuvex-pr-modal-left-video-playing")};c.addEventListener("play",w),c.addEventListener("playing",w),c.addEventListener("pause",S),c.addEventListener("ended",M),p.__renuvexMediaCleanup=function(){c.removeEventListener("play",w),c.removeEventListener("playing",w),c.removeEventListener("pause",S),c.removeEventListener("ended",M),M(),h.cleanup()},p.appendChild(c)}else{var y=document.createElement("img");if(y.className="renuvex-pr-modal-main-img"+(s?" "+s:""),y.src=xt(v?v.url:""),y.decoding="async",y.width=ft,y.height=Math.round(ft*4/3),y.alt="Yorum foto\u011Fraf\u0131",!s){y.classList.add("renuvex-pr-modal-img-loading");var E=function(){y.classList.remove("renuvex-pr-modal-img-loading")};y.complete&&y.naturalWidth>0?E():(y.addEventListener("load",E,{once:!0}),y.addEventListener("error",E,{once:!0}))}ma(y,function(N){if(N.style.display="none",!p.querySelector(".renuvex-pr-modal-img-error")){var _=document.createElement("div");_.className="renuvex-pr-modal-img-error",_.setAttribute("role","status"),_.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",p.insertBefore(_,N)}}),p.appendChild(y)}var x=document.createElement("button");x.className="renuvex-pr-modal-close-mobile";var z=ee(we);z&&x.appendChild(z),x.setAttribute("aria-label","Kapat"),x.onclick=function(N){N.stopPropagation(),i()},p.appendChild(x);var A=0,T=!1,P=!1;if(p.addEventListener("touchstart",function(N){var _=zt(N);_&&(P=gi(N),A=_.clientX,T=!P&&hi(N,v,p))},{passive:!0}),p.addEventListener("touchend",function(N){if(P){P=!1,T=!1;return}if(T){T=!1;return}var _=zt(N);if(_){var q=A-_.clientX;if(!(Math.abs(q)<50)){if(q>0){if(g)he(e,r,f+1,a,n,i,!0,"next",l,u);else if(O){var B=a[r+1];he(B,r+1,0,a,n,i,!1,"next",l,u)}}else if(I)he(e,r,f-1,a,n,i,!0,"prev",l,u);else if(L){var X=a[r-1],K=tr(X);he(X,r-1,K.length-1,a,n,i,!1,"prev",l,u)}}}},{passive:!0}),Ua(u)){var k=wi(a);if(k.length>1){var C=document.createElement("div");C.className="renuvex-pr-modal-thumbs renuvex-pr-modal-thumbs--gallery",k.forEach(function(N){var _=yi(N,N.reviewIdx===r,function(){he(N.review,N.reviewIdx,0,a,n,i,!1,null,l,u)});_&&C.appendChild(_)}),p.appendChild(C)}}else if(d.length>1){var R=document.createElement("div");R.className="renuvex-pr-modal-thumbs",d.forEach(function(N,_){var q=N.type==="video"?N.posterUrl:N.url,B=document.createElement("img"),X=gr(q,Se);B.src=X.src,B.srcset=X.srcset,B.loading="lazy",B.decoding="async",B.width=Se,B.height=Se,B.className="renuvex-pr-modal-thumb"+(_===f?" renuvex-pr-modal-thumb-active":""),B.alt="K\xFC\xE7\xFCk resim "+(_+1),hr(B),B.tabIndex=0,B.setAttribute("role","button"),B.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(_+1)+" se\xE7"),_===f&&B.setAttribute("aria-current","true"),(function(K){function J(){he(e,r,K,a,n,i,!0,null,l,u)}B.onclick=J,B.onkeydown=function(Z){(Z.key==="Enter"||Z.key===" ")&&(Z.preventDefault(),J())}})(_),R.appendChild(B)}),p.appendChild(R)}var I=f>0,g=f<d.length-1,L=r>0,O=r<a.length-1,U=I||L,D=g||O;if(U){var W=document.createElement("button");W.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var j=ee(Xe);j&&W.appendChild(j),W.setAttribute("aria-label","\xD6nceki"),W.onclick=function(N){if(N.stopPropagation(),I)he(e,r,f-1,a,n,i,!0,"prev",l,u);else if(L){var _=a[r-1],q=tr(_);he(_,r-1,q.length-1,a,n,i,!1,"prev",l,u)}},p.appendChild(W)}if(D){var Y=document.createElement("button");Y.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var $=ee(Or);$&&Y.appendChild($),Y.setAttribute("aria-label","Sonraki"),Y.onclick=function(N){if(N.stopPropagation(),g)he(e,r,f+1,a,n,i,!0,"next",l,u);else if(O){var _=a[r+1];he(_,r+1,0,a,n,i,!1,"next",l,u)}},p.appendChild(Y)}return p}function Ha(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=tr(a);n[0]&&n[0].type==="image"&&(new Image().src=xt(n[0].url))}})}function wt(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ki(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){wt(t),wt(a),wt(n)}i(),t&&se(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function he(e,r,t,a,n,i,o,l,u,d){if(d&&(d.currentReview=e),o){var f=St(e,r,t,a,n,i,l,u,d);n.firstChild&&(kt(n.firstChild),n.replaceChild(f,n.firstChild))}else{var f=St(e,r,t,a,n,i,l,u,d),v=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&(kt(n.firstChild),n.replaceChild(f,n.firstChild)),v&&Va(v,e,d&&d.currentSettings),ki(u,n)}Ha(r,a)}function me(e,r,t,a){var n=a&&a.source==="mediaGallery"?"mediaGallery":"review",i=n==="mediaGallery"?xe(e)?[xe(e)]:[]:tr(e);if(!i.length)return;var o=mi(t,n),l=o.findIndex(function(T){return T===e||T.id===e.id});l===-1&&(o.unshift(e),l=0);var u=i.findIndex(function(T){return T.url===r});u<0&&(u=0);var d=document.createElement("div");d.className="renuvex-pr-modal-overlay";var f=document.createElement("div");f.className="renuvex-pr-modal";var v=!1,p=null,s=Wr(),h=Pe(),c=jr(),m=Kr(),b={currentReview:e,currentSettings:F,source:n},w=null;function S(T){var P=T&&T.detail&&T.detail.settings;if(!(P&&P===w)){w=P||null,b.currentSettings=P||F;var k=f.querySelector(".renuvex-pr-modal-right");!k||!b.currentReview||Va(k,b.currentReview,b.currentSettings)}}function M(){v||(v=!0,window.removeEventListener(He,S),Oa(p&&p.host,y,M,c,s,h))}function y(T){if(T.key==="Escape"){E();return}qr(T,d,p&&p.root)}function E(){v||(v=!0,window.removeEventListener(He,S),Oa(p&&p.host,y,M,c,s,h),Xr(m))}document.addEventListener("keydown",y),window.addEventListener("popstate",M),window.addEventListener(He,S),d.onclick=function(){E()},f.onclick=function(T){T.stopPropagation()},f.appendChild(St(e,l,u,o,f,E,null,d,b)),f.appendChild(fi(e)),Ha(l,o);var x=document.createElement("div");x.className="renuvex-pr-modal-wrap",x.tabIndex=-1,x.setAttribute("role","dialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),x.appendChild(f);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var A=ee(we);A&&z.appendChild(A),z.setAttribute("aria-label","Kapat"),z.onclick=function(T){T.stopPropagation(),E()},x.appendChild(z),d.appendChild(x),p=Yr(),Qe(p.root,Ze+Ke+Dr),p.root.appendChild(d),Ve(p.root),se(x)}function ar(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Lt={};Me(Lt,{css:()=>lo,meta:()=>oo,render:()=>po});function nr(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,i=e.onFilterChange;Le(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var u=r[l-1]||0,d=t>0?Math.round(u/t*100):0,f=n===l,v=u>0,p=G(F&&F.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(f?" renuvex-pr-bar-active":"")+(n&&!f?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",f?"true":"false"),s.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+u.toLocaleString("tr-TR")+" "+p+", "+(f?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+p);for(var h="",c=1;c<=5;c++){var m=c<=l;h+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(m?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+pe(m?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+h+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+d+'%;"></div></div><span class="renuvex-pr-bar-count">('+u.toLocaleString("tr-TR")+")</span>",v&&(function(b){function w(){i(b)}s.onclick=w,s.onkeydown=function(S){(S.key==="Enter"||S.key===" "||S.key==="Space"||S.key==="Spacebar")&&(S.preventDefault(),w())}})(l),o.appendChild(s)}return o}var ja="data-renuvex-pr-dismiss-gesture",De=[],Ya=!1,Zr=!1,wr=[],ir=null;function Da(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Ct(){for(var e=De.length-1;e>=0;e--){var r=De[e].element;r&&r.isConnected===!1&&De.splice(e,1)}return De}function zi(e){!e||typeof e.setAttribute!="function"||(wr.indexOf(e)===-1&&wr.push(e),e.setAttribute(ja,""))}function Ga(){for(var e=0;e<wr.length;e++){var r=wr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(ja)}wr=[],ir&&typeof clearTimeout=="function"&&clearTimeout(ir),ir=null}function Si(e){if(Zr){Zr=!1,Ga(),e.preventDefault(),e.stopPropagation();return}for(var r=Ct(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Da(e,n.trigger)||Da(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Ci(e){if(e.key==="Escape")for(var r=Ct(),t=r.length-1;t>=0;t--)r[t].close()}function Wa(){Ya||typeof document=="undefined"||(document.addEventListener("click",Si,!0),document.addEventListener("keydown",Ci),Ya=!0)}function Ei(e){Wa(),Zr=!0,zi(e),ir&&typeof clearTimeout=="function"&&clearTimeout(ir),typeof setTimeout=="function"&&(ir=setTimeout(function(){Zr=!1,Ga()},700))}function Et(e){Ei(e)}function Qr(e){Wa();var r={trigger:e.trigger,element:e.element,close:e.close};return De.push(r),{unregister:function(){var t=De.indexOf(r);t!==-1&&De.splice(t,1)},notifyOpening:function(){for(var t=Ct(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function le(e){var r=e.widget,t=e.currentOrderBy,a=e.currentMediaFilter||"none",n=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=G(F&&F.writeButtonText,"Yorum Yap"),l.onclick=n,o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-filter-wrap";var d=document.createElement("button");d.type="button",d.className="renuvex-pr-filter-btn",d.setAttribute("aria-label","Filtrele"),d.setAttribute("aria-haspopup","menu"),d.setAttribute("aria-expanded","false");var f=F&&F.filterIcon||"lines";d.innerHTML=ue(da(f));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var p=$t===!0?"media":"images",s=p==="media"?"Foto\u011Fraf ve Video":"Foto\u011Frafl\u0131",h=[{orderBy:"newest",label:"En Yeni",mediaFilter:"none"},{orderBy:"highest",label:"En Y\xFCksek Puan",mediaFilter:"none"},{orderBy:"lowest",label:"En D\xFC\u015F\xFCk Puan",mediaFilter:"none"},{orderBy:"newest",label:s,mediaFilter:p}],c=!1;function m(){return r&&r.parentNode||r||null}function b(y,E){if(!(E===!0||!y)){if(y.type==="touchstart"){Et(m());return}if(y.type==="pointerdown"){var x=y.pointerType||"";x&&x!=="mouse"&&Et(m())}}}function w(y){var E=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),d.classList.remove("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","false");var x=y&&(y.restoreFocus===!0||y.restoreFocus==="auto"&&Pe());if(E&&x)try{d.focus({preventScroll:!0})}catch(z){try{d.focus()}catch(A){}}return E}function S(){M.notifyOpening(),v.classList.add("renuvex-pr-open"),d.classList.add("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","true");var y=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");y&&requestAnimationFrame(function(){try{y.focus({preventScroll:!0})}catch(E){try{y.focus()}catch(x){}}})}h.forEach(function(y){var E=y.mediaFilter!=="none",x=E?a===y.mediaFilter:a==="none"&&(t||"newest")===y.orderBy,z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(x?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=y.label;var A=!1;function T(P,k){P&&(P.preventDefault(),P.stopPropagation()),!A&&(A=!0,c=!0,b(P,k),w({restoreFocus:k}),i(y.orderBy,y.mediaFilter),setTimeout(function(){A=!1,c=!1},0))}z.addEventListener("pointerdown",function(P){P.button!==void 0&&P.button!==0||P.pointerType!=="mouse"&&T(P,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(P){T(P,!1)},{passive:!1}),z.addEventListener("keydown",function(P){(P.key==="Enter"||P.key===" ")&&T(P,!0)}),z.onclick=function(P){T(P,!1)},v.appendChild(z)}),d.onclick=function(){v.classList.contains("renuvex-pr-open")?w({restoreFocus:"auto"}):S()},u.addEventListener("keydown",function(y){y.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(y.stopPropagation(),w({restoreFocus:!0}))}),u.addEventListener("focusout",function(y){if(v.classList.contains("renuvex-pr-open")&&!c){var E=y.relatedTarget;E&&u.contains(E)||w()}});var M=Qr({trigger:u,element:v,close:w});return u.appendChild(d),u.appendChild(v),o.appendChild(u),o}var qa=`
  /* Backdrop \u2014 viewport'u kaplar, modal kutusunu ortalar */
  .renuvex-pr-fwizard-overlay{
    position:fixed;
    inset:0;
    overscroll-behavior:contain;
    z-index:99999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:16px;
    background:var(--renuvex-pr-fwizard-overlay-bg, rgba(0,0,0,0.50));
    /* A\xE7\u0131l\u0131\u015F fade animasyonu */
    opacity:0;
    transition:opacity 0.2s ease;
  }
  /* Overlay is the programmatic open-focus target (role=dialog); no visible ring needed. */
  .renuvex-pr-fwizard-overlay:focus,.renuvex-pr-fwizard-overlay:focus-visible{outline:none;}
  .renuvex-pr-fwizard-overlay.renuvex-pr-fwizard-open{
    opacity:1;
  }

  /* Modal kutusu \u2014 680\xD7600, max 85vh */
  .renuvex-pr-fwizard{
    position:relative;
    width:100%;
    max-width:680px;
    height:600px;
    max-height:85vh;
    background:var(--renuvex-pr-fwizard-bg, #ffffff);
    color:var(--renuvex-pr-fwizard-text, rgb(17,17,17));
    border:none;
    border-radius:var(--renuvex-pr-radius,12px);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    /* Scale kald\u0131r\u0131ld\u0131 \u2014 sayfa i\xE7eri\u011Finde sub-pixel kayma yarat\u0131yordu */
  }

  /* Close (X) butonu \u2014 sa\u011F \xFCst k\xF6\u015Fe */
  .renuvex-pr-fwizard-close{
    position:absolute;
    top:8px;
    right:8px;
    width:44px;
    height:44px;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    border:none;
    background:transparent;
    color:var(--renuvex-pr-fwizard-close-text, #6b7280);
    cursor:pointer;
    font-size:18px;
    line-height:1;
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1;
    transition:background 0.15s, color 0.15s;
  }
  .renuvex-pr-fwizard-close svg{width:18px;height:18px;}

  /* X Butonu G\xF6r\xFCn\xFCrl\xFCk Kurallar\u0131 (Desktop + Mobile) */
  .renuvex-pr-fwizard[data-step="1"] .renuvex-pr-fwizard-close,
  .renuvex-pr-fwizard[data-step="thanks"] .renuvex-pr-fwizard-close{
    display:flex;
  }
  .renuvex-pr-fwizard[data-step="2"] .renuvex-pr-fwizard-close,
  .renuvex-pr-fwizard[data-step="3"] .renuvex-pr-fwizard-close,
  .renuvex-pr-fwizard[data-step="4"] .renuvex-pr-fwizard-close{
    display:none;
  }

  @media(hover:hover){
    .renuvex-pr-fwizard-close:hover{
      background:var(--renuvex-pr-fwizard-close-hover-bg, rgba(0,0,0,0.05));
      color:var(--renuvex-pr-fwizard-close-text, #111111);
    }
  }

  /* \u0130\xE7erik konteyneri \u2014 wizard layout (step + footer) burada. */
  .renuvex-pr-fwizard-content{
    padding:0;
    overflow:hidden;
    flex:1 1 auto;
    display:flex;
    flex-direction:column;
    min-height:320px;
  }

  /* Wizard layout \u2014 step i\xE7eri\u011Fi + alttaki progress bar dikey */
  .renuvex-pr-fwizard-layout{
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    min-height:0;
  }

  /* Step i\xE7eri\u011Fi konteyneri \u2014 scroll burada */
  .renuvex-pr-fwizard-step-wrap{
    flex:1 1 auto;
    overflow-y:auto;
    overscroll-behavior:contain;
    -webkit-overflow-scrolling:touch;
    padding:48px 24px 32px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
  }

  /* Step kart \u2014 her ad\u0131m\u0131n temel layout'u */
  .renuvex-pr-fwizard-step{
    width:100%;
    min-width:0;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
  }

  /* Step ge\xE7i\u015F animasyonlar\u0131 \u2014 Standart, belirgin ve s\xFCreyi optimize eden "Deep Fade & Slide" tasar\u0131m\u0131.
     Hem masa\xFCst\xFC hem mobil i\xE7in standart. Arka plan i\u015Flemlerine (upload vb.) zaman kazand\u0131r\u0131r. */
  .renuvex-pr-fwizard-step--enter{
    animation:renuvexPrStepEnter 0.65s ease forwards;
    will-change:opacity;
  }
  .renuvex-pr-fwizard-step--exit{
    animation:renuvexPrStepExit 0.3s ease forwards;
    will-change:opacity;
  }
  @keyframes renuvexPrStepEnter{
    0%   { opacity:0; }
    100% { opacity:1; }
  }
  @keyframes renuvexPrStepExit{
    0%   { opacity:1; }
    100% { opacity:0; }
  }


  /* Step ba\u015Fl\u0131\u011F\u0131 \u2014 varsay\u0131lan (step 1: y\u0131ld\u0131z) */
  .renuvex-pr-fwizard-step-title{
    width:100%;
    max-width:100%;
    min-width:0;
    box-sizing:border-box;
    font-size:18px;
    font-weight:500;
    color:var(--renuvex-pr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
    white-space:normal;
    overflow-wrap:anywhere;
    word-break:break-word;
  }

  /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 \u2014 step 2/3/4 ba\u015Fl\u0131klar\u0131 daha g\xFC\xE7l\xFC
     g\xF6r\xFCn\xFCm gerektirir. Mobile'da @media i\xE7inde 18px/700'e iner. */
  .renuvex-pr-fwizard-step-title--lg{
    font-size:26px;
    font-weight:700;
    line-height:1.25;
  }

  /* Step alt ba\u015Fl\u0131\u011F\u0131 \u2014 ba\u015Fl\u0131\u011F\u0131n hemen alt\u0131nda, daha s\xF6n\xFCk */
  .renuvex-pr-fwizard-step-subtitle{
    width:100%;
    max-width:100%;
    min-width:0;
    box-sizing:border-box;
    margin-top:-20px;
    font-size:16px;
    font-weight:400;
    color:var(--renuvex-pr-fwizard-secondary-text, #6b7280);
    line-height:1.4;
    white-space:normal;
    overflow-wrap:anywhere;
    word-break:break-word;
  }

  /* Te\u015Fekk\xFCr Ekran\u0131 \xD6zel (Extra Large) */
  .renuvex-pr-fwizard-thanks-title{
    font-size:38px !important;
    font-weight:700 !important;
    line-height:1.1;
  }
  .renuvex-pr-fwizard-thanks-subtitle{
    font-size:16px !important;
    margin-top:0 !important;
    font-weight:400;
  }
  .renuvex-pr-fwizard-step-thanks{
    justify-content:center;
    padding-bottom:40px;
    gap:12px !important;
  }

  /* \u2500\u2500\u2500 Step 2: Foto kart\u0131 \u2500\u2500\u2500 */
  .renuvex-pr-fwizard-photo-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--renuvex-pr-fwizard-input-border, #AFAFAF);
    border-radius:var(--renuvex-pr-radius,12px);
    padding:12px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:16px;
    box-sizing:border-box;
    transition:all 0.3s ease;
  }
  /* Kompakt mod: Foto\u011Fraflar yan yana, buton kare */
  .renuvex-pr-fwizard-photo-card--compact{
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
    gap:10px;
  }
  .renuvex-pr-fwizard-photo-add{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    width:100%;
    padding:14px 20px;
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    border-radius:var(--renuvex-pr-radius-sm,8px);
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    user-select:none;
    transition:all 0.2s;
    box-sizing:border-box;
    border:1px solid transparent;
  }
  /* Kompakt buton tasar\u0131m\u0131 */
  .renuvex-pr-fwizard-photo-card--compact .renuvex-pr-fwizard-photo-add{
    width:88px;
    height:88px;
    padding:0;
    background:var(--renuvex-pr-fwizard-bg, #f9f9f9);
    color:var(--renuvex-pr-fwizard-text, #000000);
    border:1px solid var(--renuvex-pr-fwizard-input-border, #AFAFAF);
    order:10; /* Listenin sonuna atar */
  }
  .renuvex-pr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .renuvex-pr-fwizard-photo-card--compact .renuvex-pr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .renuvex-pr-fwizard-photo-add--disabled{
    opacity:0.4;
    cursor:not-allowed;
    pointer-events:none;
  }
  .renuvex-pr-fwizard-photo-add svg{
    flex-shrink:0;
    width:20px;
    height:20px;
  }
  .renuvex-pr-fwizard-photo-card--compact .renuvex-pr-fwizard-photo-add span{
    display:none;
  }
  .renuvex-pr-fwizard-photo-previews{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
  }
  .renuvex-pr-fwizard-photo-previews:empty{
    display:none;
  }
  .renuvex-pr-fwizard-photo-thumb{
    position:relative;
    width:88px;
    height:88px;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    overflow:hidden;
    border:1px solid var(--renuvex-pr-fwizard-input-border, #AFAFAF);
  }
  .renuvex-pr-fwizard-photo-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    pointer-events:none;
    -webkit-user-drag:none;
    user-select:none;
  }
  .renuvex-pr-fwizard-photo-loading{
    position:absolute;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(255,255,255,0.75);
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:var(--renuvex-pr-radius-sm,8px);
  }
  .renuvex-pr-upload-error {
    color: #ff3333;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    padding: 0 4px;
  }
  .renuvex-pr-fwizard-photo-remove{
    position:absolute;
    top:-6px;
    right:-6px;
    width:24px;
    height:24px;
    border-radius:50%;
    background:#fff;
    border:none;
    color:#000;
    font-size:14px;
    font-weight:bold;
    line-height:1;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:none;
    padding:0;
  }
  .renuvex-pr-fwizard-media-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--renuvex-pr-fwizard-input-border,#AFAFAF);
    border-radius:var(--renuvex-pr-radius,12px);
    padding:12px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:12px;
    box-sizing:border-box;
  }
  .renuvex-pr-fwizard-media-action{
    min-height:50px;
    font:inherit;
  }
  .renuvex-pr-fwizard-media-action--active{
    border-color:var(--renuvex-pr-fwizard-btn-border, var(--renuvex-pr-fwizard-btn-bg,#111));
  }
  .renuvex-pr-fwizard-media-action:disabled{
    opacity:.45;
    cursor:not-allowed;
  }
  .renuvex-pr-fwizard-media-card--photo-selected > .renuvex-pr-fwizard-media-action,
  .renuvex-pr-fwizard-media-card--video-selected > .renuvex-pr-fwizard-media-action{
    display:none;
  }
  .renuvex-pr-fwizard-media-content{
    width:100%;
    max-width:none;
  }
  .renuvex-pr-fwizard-media-card:not(.renuvex-pr-fwizard-media-card--has-media) .renuvex-pr-fwizard-media-content{
    display:none;
  }
  .renuvex-pr-fwizard-media-content:empty{
    display:none;
  }
  .renuvex-pr-fwizard-media-content .renuvex-pr-fwizard-step-photos{
    gap:0;
  }
  .renuvex-pr-fwizard-photo-card--embedded{
    max-width:none;
    border:0;
    border-radius:0;
    padding:0;
    background:transparent;
  }
  .renuvex-pr-fwizard-video-uploading-card{
    position:relative;
    min-height:50px;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:14px 20px;
    box-sizing:border-box;
  }
  .renuvex-pr-fwizard-video-uploading-status{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    min-width:0;
    font-size:15px;
    font-weight:600;
  }
  .renuvex-pr-fwizard-video-dots{
    display:inline-flex;
    align-items:center;
    gap:5px;
  }
  .renuvex-pr-fwizard-video-dots span{
    width:7px;
    height:7px;
    border-radius:50%;
    background:currentColor;
    opacity:.35;
    animation:renuvexPrVideoDotPulse 1s ease-in-out infinite;
  }
  .renuvex-pr-fwizard-video-dots span:nth-child(2){
    animation-delay:.14s;
  }
  .renuvex-pr-fwizard-video-dots span:nth-child(3){
    animation-delay:.28s;
  }
  @keyframes renuvexPrVideoDotPulse{
    0%, 80%, 100%{ opacity:.35; transform:translateY(0); }
    40%{ opacity:1; transform:translateY(-2px); }
  }
  @media (prefers-reduced-motion: reduce){
    .renuvex-pr-fwizard-video-dots span{
      animation:none;
      opacity:.85;
      transform:none;
    }
  }
  .renuvex-pr-fwizard-video-card{
    position:relative;
    display:grid;
    grid-template-columns:112px minmax(0,1fr);
    gap:14px;
    align-items:center;
    padding:12px;
    border:1px solid var(--renuvex-pr-fwizard-input-border,#AFAFAF);
    border-radius:var(--renuvex-pr-radius,12px);
  }
  .renuvex-pr-fwizard-video-card--failed{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-height:122px;
    gap:12px;
    text-align:center;
  }
  .renuvex-pr-fwizard-video-thumb{
    background:#111;
  }
  .renuvex-pr-fwizard-video-preview{
    width:112px;
    aspect-ratio:16/10;
    display:block;
    object-fit:cover;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:#111;
  }
  .renuvex-pr-fwizard-video-thumb .renuvex-pr-fwizard-video-preview{
    width:100%;
    height:100%;
    aspect-ratio:auto;
    border-radius:0;
  }
  .renuvex-pr-fwizard-video-details{
    min-width:0;
    display:flex;
    flex-direction:column;
    gap:7px;
  }
  .renuvex-pr-fwizard-video-details--failed{
    align-items:center;
    gap:12px;
    width:100%;
  }
  .renuvex-pr-fwizard-video-name{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:14px;
    font-weight:600;
  }
  .renuvex-pr-fwizard-video-retry{
    align-self:center;
    width:100%;
    min-height:50px;
    padding:14px 20px;
    border:1px solid transparent;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    font:inherit;
    font-size:15px;
    font-weight:600;
    cursor:pointer;
    text-decoration:none;
    box-sizing:border-box;
  }
  .renuvex-pr-fwizard-video-remove{
    top:6px;
    right:6px;
    border:1px solid rgba(0,0,0,.12);
    z-index:2;
    touch-action:manipulation;
    pointer-events:auto;
  }
  .renuvex-pr-fwizard-photo-remove svg{width:12px;height:12px;}

  /* \u2500\u2500\u2500 Step 3: \u0130\xE7erik formu (ba\u015Fl\u0131k + textarea) \u2500\u2500\u2500 */
  .renuvex-pr-fwizard-content-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:12px;
    text-align:left;
  }
  .renuvex-pr-fwizard-input,
  .renuvex-pr-fwizard-textarea{
    width:100%;
    padding:12px 14px;
    background:var(--renuvex-pr-fwizard-input-bg, #ffffff);
    border:1px solid var(--renuvex-pr-fwizard-input-border, #AFAFAF);
    border-radius:var(--renuvex-pr-radius-sm,8px);
    font-size:16px; /* iOS zoom bug'\u0131n\u0131 \xF6nlemek i\xE7in min 16px olmal\u0131 */
    font-family:inherit;
    color:var(--renuvex-pr-fwizard-input-text, var(--renuvex-pr-fwizard-text, rgb(17,17,17)));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  /* Input ve textarea i\xE7in klavye odak g\xF6stergesi sadece native caret \u2014
     ekstra outline a\u015Fa\u011F\u0131da :focus i\xE7in kapat\u0131l\u0131yor. */
  .renuvex-pr-fwizard-input::placeholder,
  .renuvex-pr-fwizard-textarea::placeholder{
    color:var(--renuvex-pr-fwizard-placeholder, rgba(0,0,0,0.35));
  }
  .renuvex-pr-fwizard-textarea{
    resize:none;
    min-height:140px;
    line-height:1.5;
  }
  .renuvex-pr-fwizard-char-counter{
    display:none;
  }
  .renuvex-pr-fwizard-char-counter--max{
    color:#dc2626;
  }

  /* \u2500\u2500\u2500 Step 4: Hakk\u0131n\u0131zda (Ad + E-posta + Submit) \u2500\u2500\u2500 */
  .renuvex-pr-fwizard-author-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:16px;
    text-align:left;
  }
  .renuvex-pr-fwizard-field{
    display:flex;
    flex-direction:column;
    gap:6px;
  }
  .renuvex-pr-fwizard-label{
    font-size:14px;
    font-weight:600;
    color:var(--renuvex-pr-fwizard-secondary-text, #6b7280);
  }
  .renuvex-pr-fwizard-required{
    color:#dc2626;
    margin-left:2px;
  }
  .renuvex-pr-fwizard-notice{
    font-size:12px;
    line-height:1.5;
    color:var(--renuvex-pr-fwizard-secondary-text, #6b7280);
    text-align:center;
    padding:4px 8px;
  }
  .renuvex-pr-fwizard-msg{
    min-height:20px;
  }
  .renuvex-pr-fwizard-msg-error{
    color:#dc2626;
    font-size:13px;
  }
  .renuvex-pr-fwizard-submit-btn{
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    border:1px solid var(--renuvex-pr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--renuvex-pr-radius-sm,8px);
    padding:14px 24px;
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
    margin-top:4px;
  }
  .renuvex-pr-fwizard-submit-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .renuvex-pr-fwizard-submit-btn--video-pending{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:12px;
  }
  .renuvex-pr-fwizard-submit-btn--disabled,
  .renuvex-pr-fwizard-submit-btn:disabled{
    background:var(--renuvex-pr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--renuvex-pr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--renuvex-pr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }



  /* \u2500\u2500\u2500 Step 1: Y\u0131ld\u0131z sat\u0131r\u0131 \u2500\u2500\u2500
     \u0130kon ve renk admin "Y\u0131ld\u0131z Stili"nden gelir:
       - SVG: getIconFromSettings (icons/index.js, currentSettings.reviewIcon)
       - Renk: --renuvex-pr-review-star-color (admin "Y\u0131ld\u0131z Rengi")
     Empty (inactive) stars use the same --renuvex-pr-review-star-color; the filled vs
     empty SVG shape is the active/inactive distinction (see step-rating.js). */
  .renuvex-pr-fwizard-stars{
    display:inline-flex;
    gap:8px;
    align-items:center;
  }
  .renuvex-pr-fwizard-star{
    width:48px;
    height:48px;
    padding:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:var(--renuvex-pr-review-star-color, #f59e0b);
    transition:color 0.15s, transform 0.1s;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .renuvex-pr-fwizard-star svg{
    width:100%;
    height:100%;
    display:block;
  }
  .renuvex-pr-fwizard-star:hover{
    transform:scale(1.05);
  }
  .renuvex-pr-fwizard-star-active{
    color:var(--renuvex-pr-review-star-color, #f59e0b);
  }

  /* \u2500\u2500\u2500 Footer: [Geri]  [progress]  [Atla|Sonraki] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     3-kolon grid: yan kolonlar 120px sabit, orta esnek.
       - Yan kolon geni\u015Fli\u011Fi step'ten ba\u011F\u0131ms\u0131z (her step'te ayn\u0131).
       - Buton i\xE7erikleri justify-self ile kolon kenarlar\u0131na yasl\u0131:
         Geri \u2192 start, Atla/Sonraki \u2192 end. B\xF6ylece buton geni\u015Fli\u011Fi
         k\xFC\xE7\xFCk olsa da konum sabit; her step'te ayn\u0131 X koordinat\u0131.
       - Orta kolon 1fr \u2192 progress pills do\u011Fal olarak ortalan\u0131r,
         absolute hile yok, butonlar\u0131n \xFCst\xFCne binmez. */
  .renuvex-pr-fwizard-footer{
    flex:0 0 auto;
    padding:16px;
    /* min-height: butonlar art\u0131k sabit 40px kutu, dikey padding 16px*2.
       Footer toplam 72px sabit \u2192 progress hi\xE7bir step'te dikey kaymaz. */
    min-height:72px;
    box-sizing:border-box;
    border-top:none;
    display:grid;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:16px;
  }
  .renuvex-pr-fwizard-footer-back{
    justify-self:start;
  }
  .renuvex-pr-fwizard-footer-back svg{width:14px;height:14px;}
  .renuvex-pr-fwizard-footer-next,
  .renuvex-pr-fwizard-footer-skip{
    justify-self:end;
  }
  .renuvex-pr-fwizard-footer-progress{
    justify-self:center;
    display:flex;
    align-items:center;
    gap:6px;
  }
  /* Step 1'de progress bar'\u0131 gizle (Desktop & Mobile) */
  .renuvex-pr-fwizard[data-step="1"] .renuvex-pr-fwizard-footer-progress{
    display:none;
  }
  /* CTA ve nav butonlar\u0131 \u2014 sabit width \xD7 height kutu, i\xE7erik flex
     center ile ortalan\u0131r. Step'ten step'e buton \u015Fekli birebir ayn\u0131
     kal\u0131r. Hiyerar\u015Fi: CTA dolu siyah, nav transparent. */
  .renuvex-pr-fwizard-cta-btn{
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    border:1px solid var(--renuvex-pr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--renuvex-pr-radius-sm,8px);
    width:108px;
    height:40px;
    padding:0;
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
    box-sizing:border-box;
  }
  .renuvex-pr-fwizard-cta-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .renuvex-pr-fwizard-cta-btn--disabled,
  .renuvex-pr-fwizard-cta-btn:disabled{
    background:var(--renuvex-pr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--renuvex-pr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--renuvex-pr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }
  .renuvex-pr-fwizard-cta-btn[hidden]{
    display:none;
  }
  .renuvex-pr-fwizard-progress-seg{
    flex:0 0 auto;
    width:80px;
    height:8px;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:var(--renuvex-pr-fwizard-progress-bg, rgba(0,0,0,0.08));
    transition:background 0.2s;
  }
  .renuvex-pr-fwizard-progress-seg-active{
    background:var(--renuvex-pr-fwizard-progress-active, rgb(17,17,17));
  }
  /* Nav butonlar\u0131 (Geri / Atla) \u2014 CTA ile ayn\u0131 kutu (108\xD740), sadece
     arkaplan transparent. Hiyerar\u015Fi fill vs transparent ile, boyut
     ile de\u011Fil. Hover: sadece renk de\u011Fi\u015Fikli\u011Fi \u2014 background hover
     asimetrik g\xF6z\xFCkt\xFC\u011F\xFC i\xE7in kald\u0131r\u0131ld\u0131 (ok+metin kutuda farkl\u0131
     X koordinatlar\u0131nda, hover bg buton kutusu b\xFCy\xFCkl\xFC\u011F\xFCnde olunca
     metnin ortas\u0131nda de\u011Fil, kutunun ortas\u0131nda g\xF6r\xFCn\xFCr). */
  .renuvex-pr-fwizard-nav-btn{
    background:transparent;
    border:none;
    width:108px;
    height:40px;
    padding:0;
    color:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    font-family:inherit;
    box-sizing:border-box;
    transition:background 0.15s;
  }
  @media(hover:hover) and (pointer:fine){
    .renuvex-pr-fwizard-nav-btn:hover{
      background:var(--renuvex-pr-fwizard-nav-hover-bg, rgba(17,17,17,0.06));
    }
  }
  .renuvex-pr-fwizard-nav-btn:active{
    background:var(--renuvex-pr-fwizard-nav-hover-bg, rgba(17,17,17,0.06));
  }
  .renuvex-pr-fwizard-nav-btn[hidden]{
    display:none;
  }

  .renuvex-pr-fwizard-close:focus-visible,
  .renuvex-pr-fwizard-star:focus-visible,
  .renuvex-pr-fwizard-photo-add:focus-visible,
  .renuvex-pr-fwizard-photo-remove:focus-visible,
  .renuvex-pr-fwizard-media-action:focus-visible,
  .renuvex-pr-fwizard-video-retry:focus-visible,
  .renuvex-pr-fwizard-submit-btn:focus-visible,
  .renuvex-pr-fwizard-cta-btn:focus-visible,
  .renuvex-pr-fwizard-nav-btn:focus-visible{
    outline:3px solid var(--renuvex-pr-fwizard-focus-ring, rgba(17,17,17,0.42));
    outline-offset:3px;
  }

  /* Input ve textarea klavye oda\u011F\u0131 i\xE7in ek outline \xE7izilmez \u2014 caret zaten
     yeterli odak g\xF6stergesi. Border rengi sabit; a\u011F\u0131r halka mobilde de
     masa\xFCst\xFCnde de g\xF6rsel olarak yoruyordu. Sadece native caret kals\u0131n. */
  .renuvex-pr-fwizard-input:focus,
  .renuvex-pr-fwizard-textarea:focus{
    outline:none;
  }

  /* \u2500\u2500\u2500 Mobile d\xFCzenlemeleri \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Mobil yap\u0131:
       - Modal tam ekran (100dvh \xD7 100vw)
       - Step 1: sa\u011F-\xFCstte X butonu, progress gizli (\xFCst bo\u015F)
       - Step 2-4: X gizli, progress \xFCst kenara absolute
       - Butonlar her zaman altta (footer do\u011Fal yeri):
           sol: "Geri" yaz\u0131s\u0131 (ok ikonu gizli, sadece text)
           sa\u011F: "Atla" / "Sonraki" \u2014 desktop ile ayn\u0131
       - \u0130\xE7erik dikey ortada, header ve footer aras\u0131na padded
     DOM dokunulmaz, step state'i shell.setStepAttr ile data-step
     attribute'u olarak modal kutusuna i\u015Flenir. */
  @media(max-width:640px){
    .renuvex-pr-fwizard-overlay{
      padding:0;
    }
    .renuvex-pr-fwizard{
      width:100vw;
      max-width:none;
      height:100vh;       /* fallback */
      height:100dvh;      /* dynamic viewport */
      max-height:none;
      border-radius:0;
      border:none;
    }

    /* X butonu ve Progress bar kurallar\u0131 global k\u0131s\u0131mda ve data-step ile y\xF6netiliyor */


    /* Progress bar \xFCst kenara absolute \u2014 sadece step 2-4'te g\xF6r\xFCn\xFCr */
    .renuvex-pr-fwizard-content{
      position:relative;
      padding-top:32px;
      box-sizing:border-box;
    }
    .renuvex-pr-fwizard-footer-progress{
      position:absolute;
      top:16px;
      bottom:auto;
      left:0;
      right:0;
      width:100%;
      justify-content:center;
      transform:none;
      z-index:2;
    }
    /* Step 1'de \xFCst padding'e gerek yok \u2014 X kendi position:absolute */
    .renuvex-pr-fwizard[data-step="1"] .renuvex-pr-fwizard-content{
      padding-top:0;
    }

    /* Footer butonlar\u0131 altta, do\u011Fal yerde. Geri = ok + "Geri" yaz\u0131s\u0131
       (desktop ile ayn\u0131; geri ok'u art\u0131k mobile'da da g\xF6r\xFCn\xFCr).
       Grid kolonlar\u0131 mobile'da auto/1fr/auto: yan kolonlar buton kadar,
       orta esnek. */
    .renuvex-pr-fwizard-footer{
      padding:20px;
      min-height:80px;
      grid-template-columns:auto 1fr auto;
    }
    /* Sa\u011F slot butonu (Atla / Sonraki) grid item olarak kolonun sa\u011F
       ucuna yasl\u0131 dursun. Refactor sonras\u0131 eski .footer-right wrapper
       div'i kalkt\u0131, buton do\u011Frudan footer grid item \u2014 justify-self
       atamas\u0131 burada yap\u0131l\u0131r. */
    .renuvex-pr-fwizard-footer-skip,
    .renuvex-pr-fwizard-footer-next{
      justify-self:end;
    }

    .renuvex-pr-fwizard-step-wrap{
      padding:36px 20px 28px;
    }
    .renuvex-pr-fwizard-step{
      gap:24px;
    }
    /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 mobile'da k\xFC\xE7\xFCl\xFCr: 26 \u2192 18, weight korunur */
    .renuvex-pr-fwizard-step-title--lg{
      font-size:20px;
    }
    .renuvex-pr-fwizard-star{
      width:48px;
      height:48px;
    }
    .renuvex-pr-fwizard-stars{
      gap:8px;
    }
    .renuvex-pr-fwizard-video-card{
      grid-template-columns:88px minmax(0,1fr);
      gap:10px;
    }
    .renuvex-pr-fwizard-video-preview{
      width:88px;
    }
  }

  /* \u2500\u2500\u2500 Toast bildirim \xE7ubu\u011Fu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .renuvex-pr-fwizard-toast{
    position:absolute;
    top:12px;
    left:50%;
    transform:translateX(-50%) translateY(-100%);
    z-index:9999;
    padding:6px 14px;
    border-radius:8px;
    font-size:14px;
    font-weight:500;
    line-height:1.4;
    white-space:nowrap;
    pointer-events:none;
    opacity:0;
    animation:renuvexPrToastEnter 0.35s cubic-bezier(0.21,1.02,0.73,1) forwards;
    box-shadow:rgba(0,0,0,0.1) 0px 3px 10px 0px, rgba(0,0,0,0.05) 0px 3px 3px 0px;
  }
  .renuvex-pr-fwizard-toast--error{
    background:rgb(186,26,26);
    color:#ffffff;
  }
  .renuvex-pr-fwizard-toast--exit{
    animation:renuvexPrToastExit 0.3s ease forwards;
  }
  @keyframes renuvexPrToastEnter{
    0%   { opacity:0; transform:translateX(-50%) translateY(-100%); }
    100% { opacity:1; transform:translateX(-50%) translateY(0); }
  }
  @keyframes renuvexPrToastExit{
    0%   { opacity:1; transform:translateX(-50%) translateY(0); }
    100% { opacity:0; transform:translateX(-50%) translateY(-100%); }
  }
`;function Ka(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,a=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,n=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var u=document.createElement("button");u.className="renuvex-pr-fwizard-close",u.type="button",u.setAttribute("aria-label","Kapat");var d=ee(we);d&&u.appendChild(d),o.appendChild(u);var f=!1,v=null,p=null,s=!1;function h(){se(i)}function c(x){qr(x,i,v&&v.root)}function m(){if(!f){if(f=!0,document.removeEventListener("keydown",b),i.removeEventListener("click",w),u.removeEventListener("click",m),s)se(p);else{var x=v&&v.root?v.root.activeElement:null;if(x&&typeof x.blur=="function")try{x.blur()}catch(z){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(Ir(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):i.parentNode&&i.parentNode.removeChild(i),Gr();try{r()}catch(z){}},200)}}function b(x){if(x.key==="Escape"){m();return}c(x)}function w(x){x.target===i&&n&&m()}document.addEventListener("keydown",b),i.addEventListener("click",w),u.addEventListener("click",m);function S(x){p=t||Wr(),s=a===null?Pe():a,x&&l.appendChild(x),v=Yr(),Qe(v.root,Ze+Ke+qa),v.root.appendChild(i),Ve(v.root),jr(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),h()})}var M=null,y=null;function E(x,z){if(z=z||"error",M){try{M.remove()}catch(A){}M=null}y&&(clearTimeout(y),y=null),M=document.createElement("div"),M.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,M.textContent=x,o.appendChild(M),y=setTimeout(function(){M&&(M.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(M){try{M.remove()}catch(A){}M=null}},300))},4e3)}return{open:S,close:m,content:l,setAllowOutsideClose:function(x){n=!!x},setStepAttr:function(x){o.setAttribute("data-step",String(x))},showToast:E}}var Tt=4;function or(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Xa(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoCapabilityStatus:e.videoCapabilityStatus||(e.videoEnabled===!0?"enabled":"unavailable"),videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(i){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Tt&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(i){return i!==n})}}}}function $a(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=ue(Xe)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-footer-progress";for(var d=[],f=0;f<Tt;f++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",u.appendChild(v),d.push(v)}o.appendChild(u);var p=document.createElement("button");p.type="button";var s=null;function h(m){s&&p.removeEventListener("click",s),s=m,m&&p.addEventListener("click",m)}o.appendChild(p);function c(m,b){var w=r.indexOf(m)!==-1,S=t.indexOf(m)!==-1,M=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0||!!b.videoUpload);if(w)m===2&&M?(p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",h(function(){i()})):(p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.setAttribute("aria-label","Atla"),p.innerHTML="<span>Atla</span>",h(function(){n()})),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p.style.visibility="",p.tabIndex=0;else if(S){p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Sonraki"),p.innerHTML="Sonraki",p.style.visibility="",p.tabIndex=0;var y=or(m,b);p.disabled=!y,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!y),h(function(){p.disabled||i()})}else p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.innerHTML="",p.style.visibility="hidden",p.tabIndex=-1,p.disabled=!0,h(null)}return{el:o,update:function(m,b){d.forEach(function(S,M){M+1<=m?S.classList.add("renuvex-pr-fwizard-progress-seg-active"):S.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var w=m<=1;l.style.visibility=w?"hidden":"",l.style.pointerEvents=w?"none":"",l.tabIndex=w?-1:0,c(m,b)},setNextDisabled:function(m){p.classList.contains("renuvex-pr-fwizard-cta-btn")&&(p.disabled=!!m,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!m))},setThanksState:function(m){l.style.visibility="hidden",u.style.visibility="hidden",p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",p.style.visibility="",p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),h(m)}}}var Ti={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ve(e){var r=F&&F[e];return!r&&e==="formStepMediaTitle"&&(r=F&&F.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=F&&F.formStepPhotosSubtitle),G(r,Ti[e])}function Ja(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ve("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=xr(F||{});Le(l);var u=[];function d(m){u.forEach(function(b,w){var S=w<m;b.classList.toggle("renuvex-pr-fwizard-star-active",S),b.setAttribute("aria-checked",w+1===m?"true":"false"),b.innerHTML=S?pe("full"):pe("outline")})}function f(m){e.set({rating:m}),d(m)}function v(m){var b=u[m-1];if(b)try{b.focus()}catch(w){}}function p(m,b){b&&typeof b.preventDefault=="function"&&b.preventDefault(),b&&typeof b.stopPropagation=="function"&&b.stopPropagation(),!a&&(a=!0,f(m),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(m){var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-star",b.setAttribute("role","radio"),b.setAttribute("aria-label",m+" y\u0131ld\u0131z"),b.innerHTML=pe("outline"),b.addEventListener("mouseenter",function(){d(m)}),b.addEventListener("mouseleave",function(){d(e.get().rating)}),b.addEventListener("pointerdown",function(w){w.button&&w.button!==0||p(m,w)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(w){p(m,w)},{passive:!1}),b.addEventListener("mousedown",function(w){window.PointerEvent||p(m,w)}),b.addEventListener("keydown",function(w){if(w.key==="Enter"||w.key===" "){p(m,w);return}var S=0;w.key==="ArrowRight"||w.key==="ArrowUp"?S=Math.min(5,m+1):w.key==="ArrowLeft"||w.key==="ArrowDown"?S=Math.max(1,m-1):w.key==="Home"?S=1:w.key==="End"&&(S=5),S&&(w.preventDefault(),f(S),v(S))}),b.addEventListener("click",function(w){p(m,w)}),u.push(b),o.appendChild(b)})(s);d(e.get().rating);var h=null,c=function(m){var b=m&&m.detail&&m.detail.settings;b&&b===h||(h=b||null,l=xr(b||F||{}),d(e.get().rating))};return window.addEventListener(He,c),t.appendChild(o),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(He,c)}}}var et=3,Ai=10*1024*1024;function rt(e,r){r=r||{};var t=!1,a=r.hideAddButton===!0,n=r.revealAddButtonAfterMedia===!0,i=!a||n,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ve("formStepPhotosTitle"),o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-step-subtitle",u.textContent=ve("formStepPhotosSubtitle"),o.appendChild(u)}var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&d.classList.add("renuvex-pr-fwizard-photo-card--embedded");var f=document.createElement("button");f.type="button",f.className="renuvex-pr-fwizard-photo-add",f.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",i&&d.appendChild(f),d.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),d.appendChild(p),o.appendChild(d);var s=r.revokeBlobUrl||function(y){y&&typeof y=="string"&&y.startsWith("blob:")&&URL.revokeObjectURL(y)},h=r.blobMap||{},c=r.urlToFinger||{};function m(){if(!t){var y=e.get().images||[],E=e.get().pendingImages||[],x=y.map(function(z){return{url:z,isPending:!1}}).concat(E.map(function(z){return{url:z.url,file:z.file,isPending:!0,error:z.error}}));p.innerHTML="",x.forEach(function(z){var A=h[z.url]||z.url,T=b(z,A);p.appendChild(T)}),S()}}function b(y,E){var x=document.createElement("div");x.className="renuvex-pr-fwizard-photo-thumb";var z=document.createElement("img");z.src=E,z.alt="",z.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",x.appendChild(z);var A=document.createElement("div");A.className="renuvex-pr-fwizard-photo-loading",A.style.display="none",x.appendChild(A);var T=document.createElement("button");T.type="button",T.className="renuvex-pr-fwizard-photo-remove",T.setAttribute("aria-label","Kald\u0131r");var P=ee(we);return P&&T.appendChild(P),x.appendChild(T),w(x,y,E),x}function w(y,E,x){var z=y.querySelector("img");z.src!==x&&(z.src=x);var A=y.querySelector(".renuvex-pr-fwizard-photo-loading");if(E.isPending&&E.error){A.style.display="flex",A.textContent="";var T=document.createElement("span");T.className="renuvex-pr-upload-error",T.textContent="\u2717 "+E.error,A.appendChild(T)}else A.style.display="none",A.textContent="";var P=y.querySelector(".renuvex-pr-fwizard-photo-remove");P.onclick=function(){var k=c[E.url]||(E.file?E.file.name+"_"+E.file.size:null),C=h[E.url],R={};k&&(R.fingerprints=(e.get().fingerprints||[]).filter(function(I){return I!==k})),E.isPending?R.pendingImages=(e.get().pendingImages||[]).filter(function(I){return I.url!==E.url}):R.images=(e.get().images||[]).filter(function(I){return I!==E.url}),e.set(R),s(E.url),s(C),delete c[E.url],C&&delete c[C],h[E.url]&&delete h[E.url]}}function S(){var y=(e.get().images||[]).length,E=(e.get().pendingImages||[]).length,x=y+E,z=x>=et;d.classList.toggle("renuvex-pr-fwizard-photo-card--compact",x>0),i&&(f.innerHTML=x>0?ue(ua):ue(Ur)+"<span>Foto\u011Fraf Ekle</span>"),z?(i&&(f.style.display="none"),f.disabled=!0,v.disabled=!0):(i&&(f.style.display=n&&x===0?"none":"flex"),f.disabled=!1,v.disabled=!1,f.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}f.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(y){var E=(e.get().images||[]).length+(e.get().pendingImages||[]).length,x=Array.from(y.target.files).slice(0,et-E);v.value="";var z=(e.get().pendingImages||[]).length,A=e.get().images||[],T=A.length;if(x.length!==0){for(var P=[],k=[],C=0;C<x.length;C++){var R=x[C],I=R.name+"_"+R.size,g=(e.get().fingerprints||[]).some(function(Y){return Y===I})||P.some(function(Y){return Y.file.name+"_"+Y.file.size===I});if(!g){if(R.size>Ai){var L="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(L,"error"):alert(L);continue}var O=URL.createObjectURL(R);c[O]=I,P.push({url:O,file:R,error:null}),k.push({url:O,file:R});var U=(e.get().fingerprints||[]).slice();U.push(I),e.set({fingerprints:U})}}if(P.length!==0){var D=(e.get().pendingImages||[]).concat(P),W=async function(){for(var Y=0;Y<k.length;Y++){var $=k[Y],N=$.file,_=$.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var q=(e.get().pendingImages||[]).filter(function(H){return H.url!==_}),B=(e.get().images||[]).slice();B.push(_),e.set({pendingImages:q,images:B});continue}try{var X=await Ce(ye+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de})});if(!X.ok)throw X.status===429?new Error("rate_limit"):new Error("sign failed");var K=await X.json();if(!K.folder)throw new Error("sign folder missing");var J=new FormData;J.append("file",N),J.append("api_key",K.api_key),J.append("timestamp",K.timestamp),J.append("signature",K.signature),J.append("folder",K.folder);var Z=await fetch("https://api.cloudinary.com/v1_1/"+K.cloud_name+"/image/upload",{method:"POST",body:J}),V=await Z.json();if(V.secure_url&&ca(V.secure_url)){var Fe=(e.get().pendingImages||[]).some(function(H){return H.url===_});if(!Fe)continue;h[V.secure_url]=_,c[V.secure_url]=c[_];var ce=(e.get().pendingImages||[]).filter(function(H){return H.url!==_}),vr=(e.get().images||[]).slice();vr.push(V.secure_url),e.set({pendingImages:ce,images:vr});try{Ce(ye+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,secureUrl:V.secure_url,metadata:{assetId:V.asset_id,publicId:V.public_id,version:V.version,resourceType:V.resource_type,format:V.format,width:V.width,height:V.height,bytes:V.bytes,signature:V.signature}})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[renuvex-pr] Image upload failed:",H);var cr=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(cr,"error");var Te=(e.get().pendingImages||[]).map(function(re){return re.url===_?{url:re.url,file:re.file,error:cr}:re});e.set({pendingImages:Te})}}};if(T===0&&z===0){t=!0;var j=!r.canNavigate||r.canNavigate();j&&e.goNext()}e.set({pendingImages:D}),W()}}};var M=e.onChange(m);return m(),{el:o,openPicker:function(){v.disabled||v.click()},destroy:function(){t=!0,v.onchange=null,M&&M()}}}var Mi=150*1024*1024,Pi=2,_i=60,tn=8192,an=5,Li=3e4,Ri=["video/mp4","video/quicktime"],Ni="renuvex_pr_video_upload_",nn="renuvex_pr_video_cancel_",kr=null,Za=!1,Bi={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},Fi={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},be=class extends Error{constructor(r,t,a){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=a||null}};function on(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:Bi[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:Fi[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function ln(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function At(e){return new Promise(function(r){setTimeout(r,e)})}function lr(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function dr(e){return Math.max(0,Math.round(lr()-e))}function Ii(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return Li}function Oi(e,r){return new Promise(function(t,a){var n=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(n),r&&r.removeEventListener("abort",o),a(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function Mt(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function Pt(e,r){return Ni+de+"_"+e+"_"+Mt(r)}function dn(e,r){try{var t=window.sessionStorage.getItem(Pt(e,r)),a=t?JSON.parse(t):null;return!a||typeof a.token!="string"||!a.expiresAt||new Date(a.expiresAt).getTime()<=Date.now()?null:a}catch(n){return null}}function Ui(e,r,t){try{window.sessionStorage.setItem(Pt(e,r),JSON.stringify(t))}catch(a){}}function Sr(e,r){try{window.sessionStorage.removeItem(Pt(e,r))}catch(t){}}function Vi(e,r){return nn+de+"_"+e+"_"+Mt(r)}function Hi(e,r,t,a){if(!(!e||!r||!t)){var n={token:e,productId:r,expiresAt:a||null};try{window.sessionStorage.setItem(Vi(r,t),JSON.stringify(n))}catch(i){}}}function Yi(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(nn+de+"_")!==0)){var a=window.sessionStorage.getItem(t),n=a?JSON.parse(a):null;if(!n||typeof n.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:n.token})}}}catch(i){}return e}function Qa(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function pr(e,r,t){var a=await Ce(ye+e,r,t||2e4),n=await a.json().catch(function(){return{}});if(!a.ok){var i=Number(a.headers.get("Retry-After"));throw new be(n.error||"video_request_failed",a.status,Number.isFinite(i)&&i>0?i:null)}return n.data||{}}async function zr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await pr("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:dr(r.startedAt),finalStatus:t})},4e3)}catch(a){}}async function Di(e){try{return await pr("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Qa(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Qa(e.key),!0):!1}}function tt(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():kr||(kr=(async function(){for(var e=Yi(),r=0;r<e.length;r+=1)await Di(e[r])})().finally(function(){kr=null}),kr)}function at(){typeof window=="undefined"||Za||(Za=!0,window.addEventListener("online",function(){tt()}),tt())}async function ji(){var e=await import("./upchunk-KBSCWYRQ.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function en(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var Gi={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function Wi(e){return Gi[e]!==!0}async function qi(e){var r=await ji();return new Promise(function(t,a){var n=!1,i=null,o=null,l=Ii(),u=null;function d(h){n||(n=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",s),u&&u(),h?a(h):t())}function f(h){n||(o&&clearTimeout(o),!(!h&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!n){e.onUploadError&&e.onUploadError("video_upload_stalled"),d(new be("video_upload_stalled",0,null));try{i&&i.abort()}catch(c){}}},l)))}function v(){return n?!1:(f(),!0)}function p(){if(!n){e.onUploadError&&e.onUploadError("video_upload_offline"),d(new be("video_upload_offline",0,null));try{i&&i.abort()}catch(h){}}}function s(){try{i&&i.abort()}catch(h){}d(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return a(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",s,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||tn,attempts:e.chunkAttempts||an,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",p),u=function(){window.removeEventListener("offline",p)}),typeof navigator!="undefined"&&navigator.onLine===!1){p();return}f(),i.on("attempt",function(){v()&&e.onStatus("uploading")}),i.on("attemptFailure",function(h){if(v()){var c=h&&h.detail,m=en(c);if(e.onAttemptFailure&&e.onAttemptFailure(m),Wi(m)){e.onUploadError&&e.onUploadError(m),d(new be(m,0,null));try{i&&i.abort()}catch(b){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){v()}),i.on("progress",function(h){if(v()){var c=Number(h&&h.detail);if(Number.isFinite(c)){var m=Math.min(95,Math.max(0,Math.round(c*.95)));Number.isFinite(e.minProgress)&&(m=Math.max(e.minProgress,m)),e.onProgress(m)}}}),i.on("offline",p),i.on("error",function(h){if(v()){var c=h&&h.detail,m=en(c);e.onUploadError&&e.onUploadError(m),d(new be(m,0,null))}}),i.on("success",function(){v()&&(e.onProgress(95),d())})})}function Ki(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function rn(e,r,t){for(var a=Date.now(),n=a+600*1e3,i=0;Date.now()<n;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-a;try{var l=await pr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new be(l.errorCode||"video_processing_failed",409,null)}catch(u){if(r.aborted||u instanceof be&&u.status===409||ln(u)||(i+=1,i>=3))throw u}await Oi(Ki(o),r)}throw new be("video_processing_delayed",0,null)}async function Xi(e){for(var r=null,t=1;t<=3;t+=1)try{return await pr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(a){if(ln(a))return null;r=a,t<3&&await At(400*t)}throw r||new Error("video_status_failed")}async function $i(e,r,t,a){for(var n=10;n<=90;n+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(n),await At(120)}return a("processing"),await At(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function pn(e){return!e||Ri.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>Mi?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function un(e){return new Promise(function(r){var t=URL.createObjectURL(e),a=document.createElement("video"),n=!1;function i(o){if(!n){n=!0,a.removeAttribute("src");try{a.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}a.preload="metadata",a.onloadedmetadata=function(){i(Number.isFinite(a.duration)?a.duration:null)},a.onerror=function(){i(null)},a.src=t,setTimeout(function(){i(null)},8e3)})}function sn(e){return e===null?{ok:!0}:e<Pi||e>_i?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function vn(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return $i(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:lr(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(h){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=h||"upload_attempt_failed")}function a(){Sr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function n(h,c){var m=await Xi(h);if(!m)return{action:"discard"};if(m.status==="ready")return e.onToken&&e.onToken(h),e.onProgress(100),Sr(e.productId,e.file),await zr(h,r,"ready"),{action:"return",value:Object.assign({token:h},m)};if(m.status==="uploaded"||m.status==="processing"){e.onToken&&e.onToken(h),e.onStatus("processing");var b=lr(),w=await rn(h,e.signal,e.onStatus);return r.processingPollMs=dr(b),Sr(e.productId,e.file),e.onProgress(100),await zr(h,r,"ready"),{action:"return",value:Object.assign({token:h},w)}}return m.status==="failed"||m.status==="aborted"?{action:"discard"}:!c||typeof c.uploadUrl!="string"||!c.uploadUrl?{action:"discard"}:{action:"upload"}}at(),await tt();var i=dn(e.productId,e.file),o=i&&i.token,l=i;if(o){var u=await n(o,l);if(u.action==="return")return u.value;u.action==="discard"&&(a(),o=null,l=null)}for(;;){if(!o){var d=await pr("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:Mt(e.file)})});o=d.token,l=d,Ui(e.productId,e.file,d)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||tn,r.chunkAttempts=l.chunkAttempts||an,e.onStatus("uploading");var f=lr();try{await qi({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+dr(f),e.onStatus("processing");var v=lr();await pr("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=dr(v);var p=lr(),s=await rn(o,e.signal,e.onStatus);return r.processingPollMs=dr(p),Sr(e.productId,e.file),e.onProgress(100),await zr(o,r,"ready"),Object.assign({token:o},s)}catch(h){throw r.directUploadMs=(r.directUploadMs||0)+dr(f),e.signal&&e.signal.aborted?(await zr(o,r,"aborted"),h):(await zr(o,r,"failed"),h)}}}async function nt(e,r,t){var a=r&&t?dn(r,t):null;e&&r&&t&&Hi(e,r,t,a&&a.expiresAt),r&&t&&Sr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(at(),await tt())}function cn(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function Ji(e){return"Video Y\xFCkleniyor"}function Zi(e){return!0}function mn(e,r){r=r||{};var t=!1,a=null,n=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ve("formStepMediaTitle"),o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-step-subtitle",u.textContent=ve("formStepMediaSubtitle"),o.appendChild(u);var d=document.createElement("div");d.className="renuvex-pr-fwizard-media-card";var f=document.createElement("button");f.type="button",f.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",f.setAttribute("aria-label","Foto\u011Fraf ekle"),f.innerHTML=ue(Ur)+"<span>Foto\u011Fraf Ekle</span>";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",v.setAttribute("aria-label","Video ekle"),v.innerHTML=ue($e)+"<span>Video Ekle</span>",d.appendChild(f),d.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-fwizard-media-content",d.appendChild(p),o.appendChild(d);var s=document.createElement("input");s.type="file",s.accept="video/mp4,video/quicktime,.mp4,.mov",s.style.display="none",o.appendChild(s);function h(){var g=e.get();return(g.images||[]).length>0||(g.pendingImages||[]).length>0}function c(){var g=e.get();return(g.images||[]).length+(g.pendingImages||[]).length}function m(){return e.get().videoUpload||null}function b(){var g=e.get();return g.videoCapabilityStatus||(g.videoEnabled?"enabled":"unavailable")}function w(){return i+=1,i}function S(g,L){var O=m();return i===g&&!!O&&O.controller===L}function M(){if(!n){p.innerHTML="";return}n.retry.onclick=null,p.innerHTML="",n=null}function y(){a&&(a.destroy&&a.destroy(),a=null)}function E(g){y(),p.innerHTML="";var L=cn(g),O=document.createElement("div");O.className=L==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":L==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var U=null,D=null,W=null,j=null,Y=document.createElement("button");if(Y.type="button",Y.className="renuvex-pr-fwizard-video-retry",Y.textContent="Tekrar dene",Y.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),L==="ready"){var $=g.posterUrl||g.localUrl||"";$&&$!==g.localUrl?(U=document.createElement("img"),U.alt="",U.src=$):(U=document.createElement("video"),U.muted=!0,U.playsInline=!0,U.preload="metadata",U.src=g.localUrl||""),U.className="renuvex-pr-fwizard-video-preview",O.appendChild(U)}else L==="busy"?(j=document.createElement("div"),j.className="renuvex-pr-fwizard-video-uploading-status",j.setAttribute("role","status"),j.setAttribute("aria-live","polite"),O.appendChild(j)):D=O;if(L==="ready"){let B=function(X){X&&(X.preventDefault(),X.stopPropagation()),k()};var q=B,N=document.createElement("button");N.type="button",N.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",N.setAttribute("aria-label","Videoyu kald\u0131r");var _=ee(we);_&&N.appendChild(_),N.addEventListener("pointerdown",B),N.addEventListener("click",B),O.appendChild(N)}p.appendChild(O),n={mode:L,card:O,preview:U,previewUrl:L==="ready"&&(g.posterUrl||g.localUrl)||"",details:D,name:W,status:j,retry:Y}}function x(){if(!t){var g=m();if(!g){M();return}var L=cn(g),O=L==="ready"&&(g.posterUrl||g.localUrl)||"";if((!n||n.mode!==L||n.previewUrl!==O)&&E(g),n.name&&(n.name.textContent=g.file?g.file.name:"Video"),n.status&&L==="busy"){var U=Ji(g),D=Zi(g)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+U+"</span>":"<span>"+U+"</span>";n.status.innerHTML!==D&&(n.status.innerHTML=D)}var W=L==="failed"&&!!(g.error&&g.file&&g.retryable!==!1);n.retry.onclick=W?function(){P(g.file,g.localUrl,g.durationMs)}:null,W&&n.details&&!n.retry.isConnected?n.details.appendChild(n.retry):!W&&n.retry.isConnected&&n.retry.remove()}}function z(){var g=h(),L=c()>=et,O=!!m(),U=g||O,D=b(),W=D==="pending",j=D==="unavailable";f.hidden=U,v.hidden=U||j,f.disabled=O||L,v.disabled=g||O||W,W&&!U?v.setAttribute("aria-busy","true"):v.removeAttribute("aria-busy"),d.classList.toggle("renuvex-pr-fwizard-media-card--has-media",U),d.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",g),d.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",O),f.classList.toggle("renuvex-pr-fwizard-media-action--active",g),v.classList.toggle("renuvex-pr-fwizard-media-action--active",O),v.classList.toggle("renuvex-pr-fwizard-media-action--pending",W&&!U)}function A(g){var L=m();if(L){var O=Object.keys(g),U=O.some(function(D){return L[D]!==g[D]});U&&e.set({videoUpload:Object.assign({},L,g)})}}function T(g,L,O){S(g,L)&&A(O)}async function P(g,L,O){var U=m(),D=!!(L&&U&&U.file===g),W=D?Math.max(0,Math.min(95,Number(U.progress)||0)):0,j=D?(Number(U.retryClicks)||0)+1:0,Y=pn(g);if(!Y.ok){r.showToast&&r.showToast(Y.message,"error");return}var $=L||URL.createObjectURL(g),N=Number.isFinite(O)?O:null,_=new AbortController,q=w();e.set({videoUpload:{file:g,localUrl:$,token:D&&U.token||null,status:"uploading",progress:W,durationMs:N,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:j,controller:_}}),!D&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var B=O!==void 0?Number.isFinite(O)?O/1e3:null:await un(g),X=sn(B);if(!X.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:X.message});var K=await vn({file:g,productId:e.get().productId,signal:_.signal,minProgress:W,retryClicks:j,onToken:function(V){T(q,_,{token:V})},onProgress:function(V){T(q,_,{progress:V})},onStatus:function(V){T(q,_,{status:V})},onSessionReset:function(){T(q,_,{token:null,progress:0})}});if(!S(q,_))return;if(K.previewOnly&&K.posterUrl&&K.posterUrl!==$)try{URL.revokeObjectURL(K.posterUrl)}catch(V){}A({token:K.token,status:"ready",progress:100,posterUrl:K.previewOnly?$:K.posterUrl,durationMs:K.durationMs||(B===null?null:Math.round(B*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),D&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(V){if(_.signal.aborted||!S(q,_))return;var J=on(V);if(V&&V.code==="invalid_video_duration"&&(J={code:"invalid_video_duration",message:V.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),A({status:"failed",error:J.message,errorCode:J.code,retryable:J.retryable,retryAfterSec:J.retryAfterSec,controller:null}),r.showToast){var Z=J.code==="invalid_video_duration"?J.message:"Video y\xFCklenemedi";r.showToast(Z,"error")}}}function k(){var g=m();g&&(w(),g.controller&&g.controller.abort(),nt(g.token,e.get().productId,g.file),r.revokeBlobUrl&&r.revokeBlobUrl(g.localUrl),e.set({videoUpload:null}))}function C(g){if(a){g&&a.openPicker&&a.openPicker();return}n=null,p.innerHTML="",a=rt(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),p.appendChild(a.el),g&&a.openPicker&&a.openPicker()}f.onclick=function(){f.disabled||C(!0)},v.onclick=function(){v.disabled||(y(),p.innerHTML="",s.click())},s.onchange=function(){var g=s.files&&s.files[0];s.value="",g&&P(g,null,void 0)};var R=!!m(),I=e.onChange(function(){z();var g=!!m();(g||R)&&x(),R=g});return z(),h()&&C(!1),m()&&x(),{el:o,destroy:function(){t=!0,f.onclick=null,v.onclick=null,s.onchange=null,a&&a.destroy&&a.destroy(),I&&I()}}}var _t=2e3,Qi=60;function fn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=ve("formStepContentTitle"),a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=Qi,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=_t,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-char-counter",u.setAttribute("aria-live","polite"),i.appendChild(u);function d(){var v=l.value.length;u.textContent=v+"/"+_t,u.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=_t)}function f(){return or(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),d(),t(f())}),a.appendChild(i),d(),setTimeout(function(){t(f())},0),{el:a,destroy:function(){}}}var eo=40;function xn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ve("formStepAuthorTitle"),n.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var u=document.createElement("label");u.className="renuvex-pr-fwizard-label",u.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.maxLength=eo,d.setAttribute("aria-required","true"),d.value=e.get().author||"",l.appendChild(u),l.appendChild(d),o.appendChild(l);var f=document.createElement("div");f.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var p=document.createElement("input");p.type="email",p.className="renuvex-pr-fwizard-input",p.setAttribute("autocomplete","email"),p.value=e.get().email||"",f.appendChild(v),f.appendChild(p),o.appendChild(f);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var h=document.createElement("div");h.className="renuvex-pr-fwizard-msg",h.setAttribute("role","alert"),h.setAttribute("aria-live","assertive"),o.appendChild(h);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),n.appendChild(o);function m(){return or(4,e.get())}function b(x){c.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent=x}function w(){c.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent="";var x=document.createElement("span");x.className="renuvex-pr-fwizard-video-dots",x.setAttribute("aria-hidden","true"),x.appendChild(document.createElement("span")),x.appendChild(document.createElement("span")),x.appendChild(document.createElement("span"));var z=document.createElement("span");z.textContent="Video Haz\u0131rlan\u0131yor",c.appendChild(x),c.appendChild(z)}function S(){var x=!m(),z=(e.get().pendingImages||[]).length,A=z>0,T=e.get().videoUpload,P=!!(T&&T.status==="failed"),k=!!(T&&T.status!=="ready"&&T.status!=="failed");A||k||P?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),P?b("Video Y\xFCklenemedi"):k?w():b("Foto\u011Fraflar Y\xFCkleniyor...")):(c.disabled=x,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",x),b("G\xF6nder"))}d.addEventListener("input",function(){e.set({author:d.value}),S(),t(m())}),p.addEventListener("input",function(){e.set({email:p.value})}),S(),setTimeout(function(){t(m())},0);function M(){h.textContent=""}function y(x){M();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=x||"",h.appendChild(z)}c.onclick=async function(){if(!c.disabled){var x=e.get(),z=(x.author||"").trim(),A=(x.comment||"").trim();if(p.value.trim()&&!p.checkValidity()){p.reportValidity();return}if(!z){y("Gerekli alan");return}if(!x.rating){y("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var T=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",M(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){x.videoUpload&&x.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a()},600);return}try{var P=sa(window.location.href),k=x.productName||null,C=await Ce(ye+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:x.productId||null,slug:P||null,productName:k,author:z,title:(x.title||"").trim()||null,comment:A||null,rating:x.rating,images:x.videoUpload?[]:x.images||[],videoToken:x.videoUpload&&x.videoUpload.status==="ready"?x.videoUpload.token:null})},15e3);if(C.ok)x.videoUpload&&x.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a();else{var R=await C.json().catch(function(){return{}});throw new Error(R.error||"Yorum kaydedilemedi.")}}catch(L){var I=L&&(L.name==="AbortError"||/signal/i.test(L.message||"")),g=I?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":L.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(g,"error"):y(g),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=T}}};var E=e.onChange(S);return{el:n,destroy:function(){c.onclick=null,E&&E()}}}function bn(e){return!!(e&&e.videoEnabled===!0&&e.videoCapabilityStatus!=="unavailable")}function gn(e,r){return e===2?bn(r)?"2:media":"2:photos":String(e)}function ro(e,r,t){if(t=t||{},e===1)return Ja(r,{canNavigate:t.canNavigate});if(e===2&&bn(r.get()))return mn(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return rt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return fn(r,{onValidityChange:t.onValidityChange});if(e===4)return xn(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function hn(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function yn(e){e=e||{},at();var r=!1,t=Xa({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:F&&F.videoReviewsEnabled===!0,videoCapabilityStatus:e.videoCapabilityStatus,videoUnavailableReason:e.videoUnavailableReason||null}),a={},n={},i={};function o(k){if(!(!k||typeof k!="string"||!k.startsWith("blob:")||i[k])){i[k]=!0;try{URL.revokeObjectURL(k)}catch(C){}}}function l(){Object.keys(n).forEach(function(C){o(C)}),Object.keys(a).forEach(function(C){o(a[C])});var k=t.get();(k.pendingImages||[]).forEach(function(C){o(C&&C.url)}),(k.images||[]).forEach(function(C){o(C)}),k.videoUpload&&o(k.videoUpload.localUrl)}function u(){var k=t.get(),C=k.videoUpload;!C||k.videoSubmitted||(C.controller&&C.controller.abort(),nt(C.token,k.productId,C.file))}var d=Ka({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){r=!0,window.removeEventListener("popstate",v),Xr(f),u(),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),f=Kr(),v=function(k){d&&d.close&&d.close()};window.addEventListener("popstate",v);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-wrap";var s=$a({skippableSteps:[2],nextableSteps:[3],onBack:function(){m==="idle"&&t.goBack()},onSkip:function(){m==="idle"&&t.goNext()},onNext:function(){m==="idle"&&t.goNext()}}),h=document.createElement("div");h.className="renuvex-pr-fwizard-layout",h.appendChild(p),h.appendChild(s.el);var c=null,m="idle",b=null,w=!0,S=null;function M(k,C){p.innerHTML="";var R=ro(k,t,{canNavigate:function(){return m==="idle"},blobMap:a,urlToFinger:n,revokeBlobUrl:o,onValidityChange:function(L){s.setNextDisabled(!L)},onSuccess:E,showToast:d.showToast});if(c=R,s.update(k,t.get()),C){m="entering",R.el.classList.add("renuvex-pr-fwizard-step--enter");var I=null,g=function(){I&&clearTimeout(I),R.el.removeEventListener("animationend",g),R.el.classList.remove("renuvex-pr-fwizard-step--enter"),m="idle",b!==null&&x()};R.el.addEventListener("animationend",g),I=setTimeout(g,700)}else m="idle";p.appendChild(R.el),d.setStepAttr&&d.setStepAttr(k),k===3&&s.setNextDisabled(!0)}var y=!1;function E(){if(!y){if(y=!0,!c){p.innerHTML="";var k=hn();k.classList.add("renuvex-pr-fwizard-step--enter"),p.appendChild(k),d.setStepAttr("thanks"),s.setThanksState(d.close);return}var C=c;m="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var R=function(){if(S&&clearTimeout(S),C.el.removeEventListener("animationend",R),C.destroy)try{C.destroy()}catch(g){}c===C&&(c=null),p.innerHTML="";var I=hn();I.classList.add("renuvex-pr-fwizard-step--enter"),p.appendChild(I),d.setStepAttr("thanks"),s.setThanksState(d.close),m="idle"};C.el.addEventListener("animationend",R),S=setTimeout(R,300)}}function x(){var k=t.get().currentStep;if(m!=="idle"){b=k;return}if(!c){var C=!w;w=!1,M(k,C);return}var R=c;m="exiting",R.el.classList.add("renuvex-pr-fwizard-step--exit");var I=function(){if(S&&clearTimeout(S),R.el.removeEventListener("animationend",I),R.destroy)try{R.destroy()}catch(L){}if(c===R){p.innerHTML="",c=null;var g=b!==null?b:t.get().currentStep;b=null,M(g,!0),m="idle"}};R.el.addEventListener("animationend",I),S=setTimeout(I,350)}x();var z=t.get().currentStep,A=gn(z,t.get()),T=t.onChange(function(k){var C=gn(k.currentStep,k);k.currentStep!==z||C!==A?(z=k.currentStep,A=C,x()):s.update(k.currentStep,k)}),P=d.close;return d.close=function(){T&&T(),typeof S!="undefined"&&S&&clearTimeout(S),P()},d.open(h),{close:d.close,setVideoCapability:function(k){if(!r){var C=!!(k&&k.enabled===!0);t.set({videoEnabled:C,videoCapabilityStatus:C?"enabled":"unavailable",videoUnavailableReason:k&&k.reason?k.reason:null})}}}}var to=4e3;async function wn(){var e=await Ce(ye+"/api/public/upload/video/capability?storeId="+encodeURIComponent(de),{method:"GET",cache:"no-store"},to);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),a=t&&t.data;if(!a||typeof a.enabled!="boolean"){var n=new Error("video_capability_invalid");throw n.code="video_capability_invalid",n}return{enabled:a.enabled===!0,reason:typeof a.reason=="string"?a.reason:null}}var je=null;function kn(){return F&&F.videoReviewsEnabled===!0}function ao(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return kn()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function no(e,r,t,a){var n=yn({productId:Q||"",productName:Oe||"",videoEnabled:t,videoCapabilityStatus:a,videoUnavailableReason:null,returnFocusElement:e,openedByKeyboard:r,onClose:function(){je===n&&(je=null)}});return je=n,n}function io(e){wn().then(function(r){je===e&&e&&e.setVideoCapability&&e.setVideoCapability(r)}).catch(function(r){je===e&&e&&e.setVideoCapability&&e.setVideoCapability(ao(r))})}function ne(e){if(je)return je;var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=kn(),a=typeof window!="undefined"&&window.__ikasPreviewMode,n=t?a?"enabled":"pending":"unavailable",i=no(r,Pe(),t,n);return t&&!a&&io(i),i}var zn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var oo={id:"classic",name:"Klasik (A\xE7\u0131k)"},lo=zn;function po(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,u=e.currentRatingFilter,d=e.currentOrderBy,f=e.currentMediaFilter,v=e.onFilterChange,p=e.onSortChange;Le(n);var s=document.createElement("div");s.className="renuvex-pr-summary";var h=(o[3]||0)+(o[4]||0),c=i>0?Math.round(h/i*100):0,m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-avg",m.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+pe("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",s.appendChild(m);var b=document.createElement("div");if(b.className="renuvex-pr-summary-block renuvex-pr-summary-count",b.textContent=i.toLocaleString("tr-TR")+" "+G(a.countLabel,"Yorum"),s.appendChild(b),a.showRecommendation!==!1&&c>0){var w=document.createElement("div");w.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",w.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",s.appendChild(w)}return s.appendChild(nr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:u,onFilterChange:v})),s.appendChild(le({widget:r,currentOrderBy:d,currentMediaFilter:f,onWriteClick:ne,onSortChange:p})),s}var Rt={};Me(Rt,{css:()=>so,meta:()=>uo,render:()=>fo});var Sn=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 \u2014 t\xFCm layout'larda tutarl\u0131 */
  .renuvex-pr-title-compact{text-align:left;}

  .renuvex-pr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:0;
  }

  /* Trigger wrap \u2014 popover anchor'\u0131 (position:relative parent) */
  .renuvex-pr-compact-trigger-wrap{
    position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;
  }

  .renuvex-pr-compact-trigger{
    /* flex-wrap: s\u0131\u011Fmazsa saya\xE7 metni y\u0131ld\u0131zlar\u0131n ALTINA b\xFCt\xFCn halinde iner
       (tam geni\u015Flik slot) \u2014 dar slotta kelime ortas\u0131ndan b\xF6l\xFCnmek yerine. */
    display:flex;align-items:center;gap:10px;flex-wrap:wrap;
    background:transparent;border:0;padding:0;cursor:pointer;
    /* flex:0 1 auto + min-width:0: s\u0131\u011Fmazsa trigger k\xFC\xE7\xFClebilir, metin sarabilir
       (y\u0131ld\u0131z + chevron flex-shrink:0 ile sabit kal\u0131r). */
    font-family:inherit;color:inherit;flex:0 1 auto;min-width:0;
  }
  /* The trigger wraps the rating stars + count (content, not a plain button surface), so
     the global press-dim (base-reset \`button:active{opacity:.85}\`) would dim that content
     on tap while the chart opens \u2014 read as an unwanted hover. The chevron rotation + panel
     toggle ARE the affordance, so opt the trigger out. Element-qualified to tie base-reset's
     \`button[class^="renuvex-pr-"]:active\` and win by source order (layout CSS is concatenated
     after BASE_RESET_CSS in render.js). */
  button.renuvex-pr-compact-trigger:active{opacity:1;}
  .renuvex-pr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  /* Compact trigger yildizlari kendi degiskeni; global bar-label-size'i etkilemez.
     Fallback bar-label-size, eski davranista geri donus icin. */
  .renuvex-pr-compact-trigger-stars .renuvex-pr-icon,
  .renuvex-pr-compact-trigger-stars .renuvex-pr-star{
    width:var(--renuvex-pr-compact-star-size,var(--renuvex-pr-bar-label-size,20px));
    height:var(--renuvex-pr-compact-star-size,var(--renuvex-pr-bar-label-size,20px));
    color:var(--renuvex-pr-review-star-color,#f59e0b);line-height:1;
  }
  /* Saya\xE7 + chevron grubu \u2014 trigger sar\u0131nca \u0130K\u0130S\u0130 B\u0130RL\u0130KTE y\u0131ld\u0131zlar\u0131n alt\u0131na iner;
     chevron tek ba\u015F\u0131na ayr\u0131 sat\u0131ra d\xFC\u015Fmez. Grup tam-geni\u015Flik slotta oldu\u011Funda
     metin tek sat\u0131ra s\u0131\u011Far, chevron metnin yan\u0131nda kal\u0131r. */
  .renuvex-pr-compact-trigger-count{
    display:inline-flex;align-items:center;gap:8px;min-width:0;
  }
  .renuvex-pr-compact-trigger-text{
    font-size:var(--renuvex-pr-compact-count-size,16px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,1)));
    /* Saya\xE7 ASLA k\u0131salt\u0131lmaz ("\u2026" yok). S\u0131\u011Fmad\u0131\u011F\u0131nda trigger k\xFC\xE7\xFCl\xFCr (flex:0 1 auto
       + min-width:0) ve metin alt sat\u0131ra sarar; y\u0131ld\u0131z/chevron dikey ortal\u0131 kal\u0131r.
       Normal k\u0131sa saya\xE7 ("8 Yorum") tek sat\u0131r tam g\xF6r\xFCn\xFCr. */
    font-weight:500;overflow-wrap:anywhere;min-width:0;
  }
  .renuvex-pr-compact-chevron{
    display:inline-flex;align-items:center;justify-content:center;
    width:14px;height:14px;flex-shrink:0;
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,1)));
    transition:transform 200ms cubic-bezier(0.4,0,0.2,1);
  }
  .renuvex-pr-compact-chevron svg{width:14px;height:14px;}
  .renuvex-pr-compact-trigger[aria-expanded="true"] .renuvex-pr-compact-chevron{transform:rotate(180deg);}

  .renuvex-pr-compact-actions-slot{
    flex:0 0 auto;display:flex;align-items:center;gap:var(--renuvex-pr-col-gap,8px);
  }
  /* filter-wrap basis'i (--renuvex-pr-col-count, 60px) global tanimli \u2014 diger summary
     layoutlariyla ayni buton arasi gorsel gap icin override'i kaldirdik. */
  .renuvex-pr-compact-actions-slot .renuvex-pr-write-btn{flex:0 0 auto;}

  /* Mobile-only write sat\u0131r\u0131 */
  .renuvex-pr-compact-write-row{display:none;}
  .renuvex-pr-compact-write-row .renuvex-pr-write-btn{flex:1 1 auto;justify-content:center;}

  /* \u2500\u2500\u2500 POPOVER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Premium tarzda: scale(0.7) translateY(-20px) \u2192 scale(1), opacity 0 \u2192 1.
     200ms ease-in-out, forwards (son state'te kal\u0131r). */
  @keyframes renuvex-pr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .renuvex-pr-compact-panel{
    position:absolute;top:calc(100% + 8px);left:0;
    z-index:1000;
    /* Bar chart 340px + panel-inner padding (28*2) + border (2) = 398px sabit */
    width:calc(var(--renuvex-pr-summary-max,340px) + 58px);
    opacity:0;visibility:hidden;pointer-events:none;
    transform-origin:top left;
  }
  .renuvex-pr-compact-panel.renuvex-pr-open{
    visibility:visible;pointer-events:auto;
  }

  .renuvex-pr-compact-panel-inner{
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;
    border:1px solid var(--renuvex-pr-widget-border,var(--renuvex-pr-border,rgba(0,0,0,0.10)));
    border-radius:var(--renuvex-pr-radius,6px);
    background:#ffffff;
    box-shadow:0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
    width:100%;box-sizing:border-box;
  }
  .renuvex-pr-compact-avg{
    display:flex;align-items:center;justify-content:center;gap:8px;
    font-size:var(--renuvex-pr-avg-rating-size,46px);line-height:1;
    color:var(--renuvex-pr-header-avg,var(--renuvex-pr-text,rgba(0,0,0,1)));font-weight:500;
  }
  .renuvex-pr-compact-avg .renuvex-pr-icon{
    width:var(--renuvex-pr-avg-star-size,58px);height:var(--renuvex-pr-avg-star-size,58px);
    color:var(--renuvex-pr-review-star-color,#f59e0b);
  }
  /* Bar chart 340px max, ortalanm\u0131\u015F */
  .renuvex-pr-compact-panel-inner .renuvex-pr-summary-bars{
    max-width:var(--renuvex-pr-summary-max,340px);width:100%;margin:0 auto;
  }

  /* Desktop: summary padding s\u0131f\u0131r \u2014 trigger sola yasl\u0131 */
  @media(min-width:601px){
    .renuvex-pr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding:0;}
    .renuvex-pr-compact-panel.renuvex-pr-open{animation:renuvex-pr-grow-out 200ms ease-in-out forwards;}
  }

  @media(max-width:600px){
    /* Header: trigger sola, filter sa\u011Fa; panel JS ile summary'nin direkt
       \xE7ocu\u011Fu olarak header'\u0131n alt\u0131na eklendi \u2192 flow'da accordion. */
    /* Mobile: trigger ve filter arasi gap acilir, yapisik gorunmesin */
    .renuvex-pr-compact-header{gap:16px;align-items:center;}
    /* Mobil: header'daki aksiyon slot'u tamamen gizle; filtre + Yorum Yap alta
       B\u0130RL\u0130KTE iner (hero/minimal deseni). Desktop original kal\u0131r. */
    .renuvex-pr-compact-actions-slot{display:none;}
    .renuvex-pr-compact-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .renuvex-pr-compact-write-row .renuvex-pr-filter-wrap{flex:0 0 auto;display:flex;}
    .renuvex-pr-compact-write-row .renuvex-pr-filter-btn{height:100%;aspect-ratio:1/1;}

    .renuvex-pr-compact-trigger-wrap{
      position:static;display:flex;align-items:center;
      flex:1 1 auto;min-width:0;
    }

    /* Panel mobilde flow i\xE7inde \u2014 trigger-wrap d\u0131\u015F\u0131nda, summary'nin \xE7ocu\u011Fu.
       Static position, max-height accordion animasyonu. */
    .renuvex-pr-compact-panel{
      position:static;
      width:100%;max-width:100%;min-width:0;
      transform:none;visibility:visible;pointer-events:auto;
      max-height:0;overflow:hidden;opacity:1;
      transition:max-height 280ms cubic-bezier(0.4,0,0.2,1);
      z-index:1;
    }
    .renuvex-pr-compact-panel.renuvex-pr-open{max-height:600px;}

    /* Filter men\xFC panel'in \xFCst\xFCnde kals\u0131n \u2014 header z-index panel'den y\xFCksek */
    .renuvex-pr-compact-header{position:relative;z-index:2;}
    .renuvex-pr-compact-actions-slot{position:relative;z-index:3;}

    .renuvex-pr-compact-panel-inner{
      padding:16px;
      box-shadow:none;
    }
  }
`;var uo={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},so=Sn,vo="__unknown_product__",Cr=Object.create(null);function co(e){return e?String(e):vo}var Ge=null,Er=null;function mo(){!Ge||!Er||(Ge.removeEventListener?Ge.removeEventListener("change",Er):Ge.removeListener&&Ge.removeListener(Er),Ge=null,Er=null)}function fo(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,u=e.currentRatingFilter,d=e.currentOrderBy,f=e.currentMediaFilter,v=e.onFilterChange,p=e.onSortChange,s=co(t),h=document.createElement("div");h.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var m=document.createElement("div");m.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Re(l,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+ue(pa)+"</span>";var w=b.querySelector(".renuvex-pr-compact-trigger-text"),S=b.querySelector(".renuvex-pr-compact-chevron");if(w&&(w.textContent=i.toLocaleString("tr-TR")+" "+G(a.countLabel,"Yorum")),w&&S){var M=document.createElement("span");M.className="renuvex-pr-compact-trigger-count",b.insertBefore(M,w),M.appendChild(w),M.appendChild(S)}m.appendChild(b),c.appendChild(m);var y=le({widget:r,currentOrderBy:d,currentMediaFilter:f,onWriteClick:ne,onSortChange:p}),E=y.querySelector(".renuvex-pr-filter-wrap"),x=y.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");z.className="renuvex-pr-compact-actions-slot",x&&z.appendChild(x),E&&z.appendChild(E),c.appendChild(z),h.appendChild(c);var A=document.createElement("div");A.className="renuvex-pr-compact-panel",A.setAttribute("role","dialog"),A.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),A.setAttribute("aria-hidden","true");var T=document.createElement("div");T.className="renuvex-pr-compact-panel-inner";var P=document.createElement("div");P.className="renuvex-pr-compact-avg",P.innerHTML='<span class="renuvex-pr-icon">'+pe("full")+"</span><span>"+l+"</span>",T.appendChild(P),T.appendChild(nr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:u,onFilterChange:function(B){C()&&A.classList.contains("renuvex-pr-open")&&(Cr[s]=!0),v(B)}})),A.appendChild(T);var k=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function C(){return!!(k&&k.matches)}function R(B){B?A.classList.add("renuvex-pr-open"):A.classList.remove("renuvex-pr-open"),A.setAttribute("aria-hidden",B?"false":"true"),b.setAttribute("aria-expanded",B?"true":"false")}function I(B){var X=B?h:m;if(A.parentNode!==X){var K=!!A.parentNode;A.classList.contains("renuvex-pr-open")&&R(!1),K&&(Cr[s]=!1),X.appendChild(A)}}I(k?k.matches:!1);var g=le({widget:r,currentOrderBy:d,currentMediaFilter:f,onWriteClick:ne,onSortChange:p}),L=g.querySelector(".renuvex-pr-filter-wrap"),O=g.querySelector(".renuvex-pr-write-btn"),U=document.createElement("div");U.className="renuvex-pr-compact-write-row",O&&U.appendChild(O),L&&U.appendChild(L),h.appendChild(U);function D(){var B=A.classList.contains("renuvex-pr-open");return R(!1),C()&&(Cr[s]=!1),B}function W(){j&&j.notifyOpening(),R(!0),C()&&(Cr[s]=!0)}b.onclick=function(){A.classList.contains("renuvex-pr-open")?D():W()};var j=null;function Y(B){j&&(j.unregister(),j=null),B||(j=Qr({trigger:m,element:A,close:D}))}if(Y(k?k.matches:!1),mo(),k){var $=function(B){I(B.matches),Y(B.matches)};k.addEventListener?k.addEventListener("change",$):k.addListener&&k.addListener($),Ge=k,Er=$}if(C()&&Cr[s]&&R(!0),a.showRecommendation!==!1){var N=(o[3]||0)+(o[4]||0),_=i>0?Math.round(N/i*100):0;if(_>0){var q=document.createElement("div");q.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",q.style.marginTop="8px",q.innerHTML='<span class="renuvex-pr-recommend-pct">%'+_+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",T.appendChild(q)}}return h}var Nt={};Me(Nt,{css:()=>go,meta:()=>xo,render:()=>ho});var Cn=`
  /* Ba\u015Fl\u0131k sola hizali \u2014 t\xFCm layout'larda tutarl\u0131 */
  .renuvex-pr-title-split{text-align:left;}

  /* Mobile (<=600): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .renuvex-pr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) \u2014 write-btn yan yana filter ile durur. */
  @media(max-width:768px){
    /* Mobile'da split classic gibi davranir -> baslik ortali. */
    .renuvex-pr-title-split{text-align:center;}
    .renuvex-pr-split-left,.renuvex-pr-split-mid{display:contents;}
    /* .renuvex-pr-split-right classic'in .renuvex-pr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .renuvex-pr-split-right{
      display:flex;flex-direction:row;align-items:stretch;
      gap:var(--renuvex-pr-col-gap,8px);
      width:100%;max-width:var(--renuvex-pr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=601px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:769px){
    .renuvex-pr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
      min-width:0;
    }

    .renuvex-pr-summary-split{
      display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 8px;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .renuvex-pr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;align-self:flex-start;}
    .renuvex-pr-split-left .renuvex-pr-split-left-avg-block{align-self:flex-start;margin:0;}
    /* Count ve tavsiye ortalama puanin altinda, center hizali */
    .renuvex-pr-split-left .renuvex-pr-split-left-count{align-self:center;text-align:center;}
    .renuvex-pr-split-left .renuvex-pr-summary-recommend{align-self:center;text-align:center;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .renuvex-pr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart okunabilir genislikte: 500px max.
       Full genislik okuma mesafesini uzatiyordu, 500 dengeli. */
    .renuvex-pr-split-mid .renuvex-pr-summary-bars{
      max-width:400px;width:100%;margin:0;
    }
    /* Bar row sikilastir: satirlar arasi ve satir ici padding daralir.
       Premium tarzda kompakt his. */
    .renuvex-pr-split-mid .renuvex-pr-summary-bars{gap:2px;}
    .renuvex-pr-split-mid .renuvex-pr-bar-row{padding:2px 4px;}

    /* Sag: write + filter yan yana, dikey ortali */
    .renuvex-pr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:stretch;gap:8px;align-self:center;
    }
    .renuvex-pr-split-right .renuvex-pr-write-btn{flex:0 0 auto;}
    .renuvex-pr-split-right .renuvex-pr-filter-wrap{flex:0 0 auto; align-self:stretch;}

    /* Gizli tavsiye yuzdesi desktop'ta yer kaplar (sol kolonu cokertmemek icin) */
    .renuvex-pr-split-rec-hidden { visibility: hidden; }
  }

  @media(max-width:768px){
    /* Mobilde split = classic stack. Eger tavsiye yuzdesi kapaliysa,
       yer kaplamasina gerek yok cunku yan yana kolon dengesi diye bir sey yok.
       Bu sayede mobildeki devasa boslugu onleriz. */
    .renuvex-pr-split-rec-hidden { display: none !important; }
  }
`;var xo={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},go=Cn;function ho(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,d=e.currentMediaFilter,f=e.onFilterChange,v=e.onSortChange;Le(a);var p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",h.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+pe("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(h);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" "+G(t.countLabel,"Yorum"),s.appendChild(c),p.appendChild(s);var m=document.createElement("div");m.className="renuvex-pr-split-col renuvex-pr-split-mid",m.appendChild(nr({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:l,onFilterChange:f})),p.appendChild(m);var b=le({widget:r,currentOrderBy:u,currentMediaFilter:d,onWriteClick:ne,onSortChange:v}),w=b.querySelector(".renuvex-pr-filter-wrap"),S=b.querySelector(".renuvex-pr-write-btn"),M=document.createElement("div");M.className="renuvex-pr-split-col renuvex-pr-split-right",S&&M.appendChild(S),w&&M.appendChild(w),p.appendChild(M);var y=(i[3]||0)+(i[4]||0),E=n>0?Math.round(y/n*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",x.innerHTML='<span class="renuvex-pr-recommend-pct">%'+E+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var z=t.showRecommendation===!1||E===0;return z&&x.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(x),p}var Bt={};Me(Bt,{css:()=>yo,meta:()=>bo,render:()=>wo});var En=`
  .renuvex-pr-title-minimal{text-align:left;}

  .renuvex-pr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px;
  }

  .renuvex-pr-minimal-info{
    display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;
  }
  .renuvex-pr-minimal-row{
    /* flex-wrap: saya\xE7 (say\u0131+etiket) s\u0131\u011Fmazsa b\xFCt\xFCn halinde alt sat\u0131ra iner \u2014
       y\u0131ld\u0131z/avg \xFCst sat\u0131rda kal\u0131r, ifade ortas\u0131ndan b\xF6l\xFCnmez. */
    display:flex;align-items:center;gap:8px;flex-wrap:wrap;
  }
  .renuvex-pr-minimal-avg{
    font-size:var(--renuvex-pr-minimal-avg-size,22px);
    color:var(--renuvex-pr-header-avg,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1;
  }
  .renuvex-pr-minimal-stars{
    display:inline-flex;gap:2px;
    color:var(--renuvex-pr-review-star-color,#f59e0b);
  }
  .renuvex-pr-minimal-stars .renuvex-pr-icon,
  .renuvex-pr-minimal-stars .renuvex-pr-star{
    width:var(--renuvex-pr-bar-label-size,20px);height:var(--renuvex-pr-bar-label-size,20px);
  }
  .renuvex-pr-minimal-count{
    font-size:var(--renuvex-pr-minimal-count-size,16px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,1)));
    /* overflow-wrap: a\u015F\u0131r\u0131 dar kapsay\u0131c\u0131da tek uzun kelime bile ta\u015Fmadan k\u0131r\u0131l\u0131r. */
    font-weight:400;line-height:1.2;overflow-wrap:anywhere;
  }

  .renuvex-pr-minimal-actions{
    display:flex;align-items:center;gap:var(--renuvex-pr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .renuvex-pr-summary-minimal{
      flex-wrap:wrap;gap:12px;
      /* Mobilde yatay padding'i summary gutter token'\u0131na hizala (review listesiyle ayn\u0131 16px) */
      padding-left:var(--renuvex-pr-pad-summary-mobile);padding-right:var(--renuvex-pr-pad-summary-mobile);
    }
    .renuvex-pr-minimal-info{flex:1 1 auto;}
    /* Mobilde desktop sa\u011F-\xFCst aksiyonlar\u0131n\u0131 gizle; filtre + Yorum Yap alt sat\u0131ra
       B\u0130RL\u0130KTE iner (hero deseni) \u2014 filtre tek ba\u015F\u0131na sol-alta orphan d\xFC\u015Fmez. */
    .renuvex-pr-minimal-actions{display:none;}
    .renuvex-pr-minimal-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .renuvex-pr-minimal-write-row .renuvex-pr-write-btn{flex:1 1 auto;justify-content:center;}
    .renuvex-pr-minimal-write-row .renuvex-pr-filter-wrap{flex:0 0 auto;display:flex;}
    .renuvex-pr-minimal-write-row .renuvex-pr-filter-btn{height:100%;aspect-ratio:1/1;}
  }
  @media(min-width:601px){
    .renuvex-pr-minimal-write-row{display:none;}
  }
`;var bo={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},yo=En;function wo(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,u=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var f=document.createElement("div");f.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var p=document.createElement("span");p.className="renuvex-pr-minimal-avg",p.textContent=i,v.appendChild(p);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=Re(i,a),v.appendChild(s);var h=document.createElement("span");h.className="renuvex-pr-minimal-count",h.textContent=n.toLocaleString("tr-TR")+" "+G(t.countLabel,"Yorum"),v.appendChild(h),f.appendChild(v),d.appendChild(f);var c=le({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ne,onSortChange:u}),m=c.querySelector(".renuvex-pr-filter-wrap"),b=c.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-minimal-actions",b&&w.appendChild(b),m&&w.appendChild(m),d.appendChild(w);var S=le({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ne,onSortChange:u}),M=S.querySelector(".renuvex-pr-filter-wrap"),y=S.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");return E.className="renuvex-pr-minimal-write-row",y&&E.appendChild(y),M&&E.appendChild(M),d.appendChild(E),d}var Ft={};Me(Ft,{css:()=>zo,meta:()=>ko,render:()=>So});var Tn=`
  .renuvex-pr-title-hero{text-align:left;}

  .renuvex-pr-summary-hero{
    /* container-type: dev avg say\u0131s\u0131n\u0131n kapsay\u0131c\u0131 geni\u015Fli\u011Fine g\xF6re (viewport de\u011Fil)
       k\xFC\xE7\xFClebilmesi i\xE7in container-query ba\u011Flam\u0131 kurar. Bkz .renuvex-pr-hero-avg clamp. */
    container-type:inline-size;
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 8px;
  }

  .renuvex-pr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:24px;min-width:0;flex:1;
  }
  .renuvex-pr-hero-rating-col{
    display:flex;flex-direction:row;align-items:center;gap:20px;
  }
  .renuvex-pr-hero-meta-row{
    /* flex-wrap: dar kapsay\u0131c\u0131da saya\xE7 y\u0131ld\u0131zlar\u0131n alt\u0131na b\xFCt\xFCn halinde iner \u2014
       "Yorum Yap" butonuyla \xE7ak\u0131\u015Fmaz, ifade ortas\u0131ndan b\xF6l\xFCnmez. */
    display:flex;flex-direction:row;align-items:center;gap:8px;flex-wrap:wrap;
  }
  .renuvex-pr-hero-avg{
    /* Kapsay\u0131c\u0131-duyarl\u0131 boyut: geni\u015F kolonda size preset'i (b\xFCy\xFCk=106px) tavan,
       dar kolonda 44px'e kadar k\xFC\xE7\xFCl\xFCr (16cqi) \u2192 sayaca/aksiyonlara yer a\xE7\u0131l\u0131r.
       cqi = .renuvex-pr-summary-hero inline geni\u015Fli\u011Finin %1'i. */
    font-size:clamp(44px, 14cqi, var(--renuvex-pr-hero-avg-size,90px));
    color:var(--renuvex-pr-header-avg,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-2px;
  }
  .renuvex-pr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--renuvex-pr-review-star-color,#f59e0b);
  }
  .renuvex-pr-hero-stars .renuvex-pr-icon,
  .renuvex-pr-hero-stars .renuvex-pr-star{
    width:var(--renuvex-pr-bar-label-size,22px);height:var(--renuvex-pr-bar-label-size,22px);
  }
  .renuvex-pr-hero-count{
    font-size:var(--renuvex-pr-hero-count-size,16px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,0.6)));
    /* overflow-wrap: a\u015F\u0131r\u0131 dar kapsay\u0131c\u0131da tek uzun kelime bile ta\u015Fmadan k\u0131r\u0131l\u0131r. */
    font-weight:400;line-height:1;overflow-wrap:anywhere;
  }

  .renuvex-pr-hero-actions{
    display:flex;align-items:center;gap:var(--renuvex-pr-col-gap,8px);flex:0 0 auto;
  }
  .renuvex-pr-hero-desktop-only{display:flex;}

  @media(max-width:600px){
    .renuvex-pr-summary-hero{
      flex-wrap:wrap;gap:16px;
      /* Mobilde yatay padding'i summary gutter token'\u0131na hizala (review listesiyle ayn\u0131 16px) */
      padding-left:var(--renuvex-pr-pad-summary-mobile);padding-right:var(--renuvex-pr-pad-summary-mobile);
    }
    .renuvex-pr-hero-info{gap:12px;justify-content:flex-start;width:100%;}
    .renuvex-pr-hero-rating-col{flex-direction:row;align-items:center;gap:16px;}
    .renuvex-pr-hero-avg{font-size:calc(var(--renuvex-pr-hero-avg-size,90px) * 0.65);letter-spacing:-1px;}
    .renuvex-pr-hero-meta-row{width:auto;gap:8px;}

    .renuvex-pr-hero-desktop-only{display:none !important;}

    /* Filter ve Yorum Yap butonu yan yana */
    .renuvex-pr-hero-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .renuvex-pr-hero-write-row .renuvex-pr-write-btn{flex:1;justify-content:center;}
    .renuvex-pr-hero-write-row .renuvex-pr-filter-wrap{flex:0 0 auto;display:flex;}
    .renuvex-pr-hero-write-row .renuvex-pr-filter-btn{height:100%;aspect-ratio:1/1;}
  }
  @media(min-width:601px){
    .renuvex-pr-hero-write-row{display:none;}
  }
`;var ko={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},zo=Tn;function So(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,u=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var f=document.createElement("div");f.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var p=document.createElement("span");p.className="renuvex-pr-hero-avg",p.textContent=i,v.appendChild(p);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var h=document.createElement("span");h.className="renuvex-pr-hero-stars",h.innerHTML=Re(i,a),s.appendChild(h);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=n.toLocaleString("tr-TR")+" "+G(t.countLabel,"Yorum"),s.appendChild(c),v.appendChild(s),f.appendChild(v),d.appendChild(f);var m=le({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ne,onSortChange:u}),b=m.querySelector(".renuvex-pr-filter-wrap"),w=m.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");S.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",w&&S.appendChild(w),b&&S.appendChild(b),d.appendChild(S);var M=le({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ne,onSortChange:u}),y=M.querySelector(".renuvex-pr-filter-wrap"),E=M.querySelector(".renuvex-pr-write-btn"),x=document.createElement("div");return x.className="renuvex-pr-hero-write-row",E&&x.appendChild(E),y&&x.appendChild(y),d.appendChild(x),d}var An=`
  .renuvex-pr-summary{
    --renuvex-pr-col-label:104px;
    --renuvex-pr-col-count:60px;
    --renuvex-pr-col-gap:4px;
    --renuvex-pr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;border-radius:var(--renuvex-pr-radius,6px);margin:0 auto 24px;
  }

  .renuvex-pr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .renuvex-pr-avg-star{width:var(--renuvex-pr-avg-star-size,52px);height:var(--renuvex-pr-avg-star-size,52px);color:var(--renuvex-pr-review-star-color,#f59e0b);line-height:1;}
  .renuvex-pr-avg-num{font-size:var(--renuvex-pr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--renuvex-pr-header-avg,#111111);}

  .renuvex-pr-summary-count{font-size:var(--renuvex-pr-review-count-size,16px);color:var(--renuvex-pr-header-count,#111111);white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  .renuvex-pr-summary-recommend{display:block;font-size:var(--renuvex-pr-recommend-size,14px);color:var(--renuvex-pr-header-recommend,#111111);text-align:center;max-width:none;width:auto;}
  .renuvex-pr-recommend-pct{font-weight:700;color:var(--renuvex-pr-header-recommend,#111111);margin-right:3px;}

  @media(max-width:600px){
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:48px;}
  }
`;var it={classic:Lt,compact:Rt,split:Nt,minimal:Bt,hero:Ft};function ot(e){return it[e]||it.classic}function Mn(){var e=Object.keys(it).map(function(r){return it[r].css||""}).join(`
`);return An+`
`+e}var It={};Me(It,{css:()=>Eo,meta:()=>Co,render:()=>To});function Be(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,a=t?Je(e.posterUrl,t):xa(e);if(!a)return null;var n=document.createElement("img"),i=e.type==="image"?gr(a,r.sourceWidth):{src:a,srcset:Hr(e.posterUrl,t)};if(n.src=i.src,i.srcset&&(n.srcset=i.srcset),n.loading=r.loading||"lazy",n.decoding="async",e.type==="image"&&n.setAttribute("data-renuvex-img-url",e.url),r.width&&(n.width=r.width),r.height&&(n.height=r.height),n.alt="",hr(n),e.type!=="video")return n.className=r.className||"",ar(n,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),n;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",n.className="renuvex-pr-media-poster",o.appendChild(n);var l=document.createElement("span");l.className="renuvex-pr-media-play";var u=ee($e);return u&&l.appendChild(u),o.appendChild(l),ar(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function ur(e,r,t){var a=t||{},n=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,n.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",n.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:i,readMore:o}}function sr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=G(F&&F.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Pn=`
  /* Card review item: side padding is supplied by the shared mobile padding block. */
  .renuvex-pr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--renuvex-pr-review-border,#e5e7eb);}
  .renuvex-pr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .renuvex-pr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}

  /* Card vertical rhythm: stars -> title -> author -> body -> reply. */
  .renuvex-pr-review .renuvex-pr-review-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-review .renuvex-pr-author{font-size:var(--renuvex-pr-author-size,14px);font-weight:600;font-style:normal;color:var(--renuvex-pr-review-author,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-review .renuvex-pr-date{color:var(--renuvex-pr-review-date,#5e5e5e);font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .renuvex-pr-review .renuvex-pr-body{margin-top:var(--renuvex-pr-gap-normal);line-height:1.65;color:var(--renuvex-pr-review-body,#111111);font-size:var(--renuvex-pr-review-text-size,14px);font-weight:400;}

  .renuvex-pr-review .renuvex-pr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--renuvex-pr-gap-loose);}
  .renuvex-pr-review .renuvex-pr-img{width:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));height:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));object-fit:cover;border-radius:var(--renuvex-pr-radius,6px);border:1px solid var(--renuvex-pr-media-gallery-image-border,rgba(0,0,0,0.05));cursor:pointer;}
  /* Kart foto tetikleyicisi role=button \u2192 BASE_RESET press-dim'ini (opacity:0.85) miras
     al\u0131yor ve bas\u0131nca "flash" gibi okunuyor. Kald\u0131r (lightbox a\xE7\u0131l\u0131\u015F\u0131 zaten geri bildirim). */
  .renuvex-pr-review .renuvex-pr-img:active{opacity:1 !important;}

  @media(max-width:600px){
    .renuvex-pr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .renuvex-pr-review .renuvex-pr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .renuvex-pr-review .renuvex-pr-gallery::-webkit-scrollbar{display:none;}
    .renuvex-pr-review .renuvex-pr-img{flex-shrink:0;}
  }
`;var Co={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Eo=Pn;function To(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ke(e.rating,F),n.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=ze(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-author",u.textContent=e.author||"",t.appendChild(u);var d=(e.comment||"").trim();d&&t.appendChild(ur(d,"renuvex-pr-body").fragment);var f=Ne(e);if(f.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",f.forEach(function(s){var h=Be(s,{className:"renuvex-pr-img",sourceWidth:oe,width:oe,height:oe,onOpen:function(){me(e,s.url,r)}});h&&v.appendChild(h)}),t.appendChild(v)}var p=sr(e.merchantReply);return p&&t.appendChild(p),t}var Ot={};Me(Ot,{css:()=>Mo,meta:()=>Ao,render:()=>Po});var _n=`
  .renuvex-pr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--renuvex-pr-list-photo-w,120px);
    gap:60px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--renuvex-pr-pad-review-mobile).
       Shorthand padding:24px 0 yan padding'i 0'a resetler ve theme kural\u0131n\u0131
       specifity sava\u015F\u0131nda ezer. Sadece top/bottom ayr\u0131 set. */
    padding-top:24px;padding-bottom:24px;
    border-top:1px solid var(--renuvex-pr-review-border,#e5e7eb);
    border-bottom:none;
  }
  .renuvex-pr-review-list.renuvex-pr-review-list--no-media{grid-template-columns:140px 1fr;}
  /* Sol kolon imza grubu: y\u0131ld\u0131z \u2192 yazar \u2192 tarih.
     y\u0131ld\u0131z\u2192yazar normal (8), yazar\u2192tarih tight (4) ayn\u0131 imza grubu. */
  .renuvex-pr-review-list-author{
    display:flex;flex-direction:column;
    font-size:var(--renuvex-pr-author-size,14px);
    color:var(--renuvex-pr-review-author,var(--renuvex-pr-text,rgba(0,0,0,1)));
  }
  .renuvex-pr-review-list-author-stars{margin-bottom:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-review-list-author-name{font-weight:600;font-style:normal;}
  .renuvex-pr-review-list-author-date{margin-top:var(--renuvex-pr-gap-tight);font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;color:var(--renuvex-pr-review-date,#5e5e5e);white-space:nowrap;flex-shrink:0;}
  .renuvex-pr-review-list-content{display:flex;flex-direction:column;min-width:0;}
  /* Title art\u0131k orta kolonun ilk eleman\u0131; \xFCst margin gerekmez. */
  .renuvex-pr-review-list-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,var(--renuvex-pr-text,rgba(0,0,0,1)));margin:0;}
  .renuvex-pr-review-list-body{margin-top:var(--renuvex-pr-gap-normal);line-height:1.6;color:var(--renuvex-pr-review-body,var(--renuvex-pr-text,rgba(0,0,0,1)));font-size:var(--renuvex-pr-review-text-size,14px);}
  .renuvex-pr-review-list-media{display:flex;justify-content:flex-end;align-items:flex-start;}
  .renuvex-pr-review-list-media > *{
    display:block;flex:0 0 auto;
    width:var(--renuvex-pr-list-photo-w,120px);height:var(--renuvex-pr-list-photo-h,160px);max-width:100%;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-media-gallery-image-border,rgba(0,0,0,0.05));
    cursor:pointer;
  }
  /* Desktop: sadece ilk foto g\xF6r\xFCn\xFCr (sa\u011F kolonda tek delil g\xF6rseli). DOM'da
     t\xFCm fotolar var, modal i\xE7in kullan\u0131l\u0131r. Mobile'da kural\u0131n aktif olmamas\u0131
     i\xE7in min-width:601 media query i\xE7inde tan\u0131mland\u0131 \u2014 b\xF6ylece mobile strip
     t\xFCm fotolar\u0131 g\xF6stermeye engel olmaz. */
  @media (min-width:601px){
    .renuvex-pr-review-list-media > *:not(:first-child){display:none;}
  }
  @media (max-width:600px){
    /* Mobile s\u0131ra: y\u0131ld\u0131z \u2192 title \u2192 yazar \u2192 tarih \u2192 body \u2192 foto \u2192 reply.
       Sol kolondaki author blo\u011Fu DOM'da y\u0131ld\u0131z+yazar+tarih s\u0131ras\u0131ndad\u0131r.
       Mobile'da author display:contents ile \u015Feffafla\u015F\u0131r; y\u0131ld\u0131z/yazar/tarih
       ayr\u0131 flex item olur. Content de display:contents \u2192 title/body/reply
       ayr\u0131 flex item olur. Tek seviyede order ile s\u0131ralan\u0131r. DOM dokunulmaz. */
    .renuvex-pr-review-list,
    .renuvex-pr-review-list.renuvex-pr-review-list--no-media{
      /* Yan padding theme mobile bloguna tasindi (--renuvex-pr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      display:flex;flex-direction:column;gap:8px;padding-top:16px;padding-bottom:16px;
    }
    .renuvex-pr-review-list-author{display:contents;}
    .renuvex-pr-review-list-content{display:contents;}
    .renuvex-pr-review-list-author-stars{order:1;margin-bottom:0;}
    .renuvex-pr-review-list-title{order:2;}
    .renuvex-pr-review-list-author-name{order:3;}
    /* yazar\u2192tarih ayn\u0131 imza grubu, galeri ile tutarl\u0131 kompakt 4px (gap 8 - margin -4) */
    .renuvex-pr-review-list-author-date{order:4;margin-top:-4px;}
    .renuvex-pr-review-list-body{order:5;margin-top:0;}
    /* body sonras\u0131 read-more body ile ayn\u0131 blo\u011Fa ait;
       reviewEl 8px gap sonras\u0131 net 4px kalmas\u0131 i\xE7in -4px (galeri/card uyumu) */
    .renuvex-pr-review-list-content > .renuvex-pr-read-more{order:6;margin-top:-4px;}
    .renuvex-pr-review-list-media{order:7;justify-content:flex-start;}
    .renuvex-pr-reply{order:8;width:100%;}
    /* Mobile media: t\xFCm fotolar yatay strip (overflow-x:auto). flex-shrink:0
       ile fotolar k\xFC\xE7\xFClmez, s\u0131\u011Fmayanlar yatay scroll. Desktop'taki "sadece ilk
       foto" kural\u0131 burada ezilir. Scroll bar gizli, parmakla kayd\u0131rma. */
    .renuvex-pr-review-list-media{
      flex-wrap:nowrap;overflow-x:auto;gap:8px;
      padding-bottom:4px;scrollbar-width:none;
      justify-content:flex-start;
    }
    .renuvex-pr-review-list-media::-webkit-scrollbar{display:none;}
    .renuvex-pr-review-list-media > *{
      flex-shrink:0;
      width:var(--renuvex-pr-list-photo-w-mobile,100px);
      height:var(--renuvex-pr-list-photo-h-mobile,133.33px);
      max-width:none;
      aspect-ratio:3/4;
      display:block;
    }
  }
`;var Ao={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Mo=_n;function Po(e,r){var t=Ne(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ke(e.rating,F),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var u=document.createElement("time");u.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ze(e.createdAt),i.appendChild(u),n.appendChild(i);var d=document.createElement("div");if(d.className="renuvex-pr-review-list-content",e.title){var f=document.createElement("div");f.className="renuvex-pr-review-list-title",f.textContent=e.title,d.appendChild(f)}var v=(e.comment||"").trim();v&&d.appendChild(ur(v,"renuvex-pr-review-list-body").fragment);var p=sr(e.merchantReply);if(p&&d.appendChild(p),n.appendChild(d),a){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(h){var c=Be(h,{sourceWidth:oe,width:oe,height:Math.round(oe*4/3),onOpen:function(){me(e,h.url,r)}});c&&s.appendChild(c)}),n.appendChild(s)}return n}var Ut={};Me(Ut,{css:()=>Lo,meta:()=>_o,render:()=>Ro});var Ln=`
  /* Galeri se\xE7iliyken widget full-bleed yerine 1200px ile s\u0131n\u0131rl\u0131 \u2014
     CSS columns parent geni\u015Fli\u011Fine yay\u0131ld\u0131\u011F\u0131 i\xE7in widget kendisi s\u0131n\u0131rlanmal\u0131.
     Di\u011Fer layoutlar (card/list) full-bleed olarak kal\u0131r. */
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery){
    width:auto;
    max-width:1200px;
    margin-left:auto;
    margin-right:auto;
    column-count:2;
    column-gap:32px;
  }
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, media gallery vs. */
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-title,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-summary,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-media-gallery-section,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-write-btn,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-load-more,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-pagination,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-state-msg{
    column-span:all;
    -webkit-column-span:all;
  }
  /* Item \u2014 column i\xE7inde kal\u0131r, i\xE7inde sol-sa\u011F split */
  .renuvex-pr-review-gallery{
    break-inside:avoid;
    -webkit-column-break-inside:avoid;
    page-break-inside:avoid;
    display:grid;
    grid-template-columns:1fr var(--renuvex-pr-gallery-photo-w,120px);
    column-gap:32px;
    row-gap:8px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--renuvex-pr-pad-review-mobile).
       Shorthand yan padding'i 0'a resetleyip theme kural\u0131n\u0131 ezmesin diye
       top/bottom ayr\u0131 set. */
    padding-top:18px;padding-bottom:18px;
    margin:0;
    border-top:1px solid var(--renuvex-pr-review-border,#e5e7eb);
  }
  .renuvex-pr-review-gallery.renuvex-pr-review-gallery--no-media{
    grid-template-columns:1fr;
  }
  .renuvex-pr-review-gallery-content{
    display:flex;flex-direction:column;min-width:0;
  }
  /* Galeri dikey s\u0131ra: stars \u2192 title \u2192 author \u2192 date \u2192 body \u2192 reply.
     stars\u2192title (normal); title\u2192author (normal); author\u2192date (tight, ayn\u0131 imza
     grubu); date\u2192body (normal). Bkz: gap s\xF6zle\u015Fmesi. */
  .renuvex-pr-review-gallery-stars{
    /* en \xFCstte; margin yok */
  }
  .renuvex-pr-review-gallery-title{
    font-weight:600;
    font-size:var(--renuvex-pr-review-title-size,15px);
    color:var(--renuvex-pr-review-title,var(--renuvex-pr-text,rgba(0,0,0,1)));
    margin:var(--renuvex-pr-gap-normal) 0 0 0;
  }
  .renuvex-pr-review-gallery-author{
    font-weight:600;
    font-size:var(--renuvex-pr-author-size,14px);
    color:var(--renuvex-pr-review-author,var(--renuvex-pr-text,rgba(0,0,0,1)));
    margin-top:var(--renuvex-pr-gap-normal);
  }
  .renuvex-pr-review-gallery-date{
    font-size:var(--renuvex-pr-review-date-size,12px);
    color:var(--renuvex-pr-review-date,#5e5e5e);
    margin-top:var(--renuvex-pr-gap-tight);
  }
  .renuvex-pr-review-gallery-body{
    line-height:1.55;
    color:var(--renuvex-pr-review-body,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-size:var(--renuvex-pr-review-text-size,14px);
    margin-top:var(--renuvex-pr-gap-normal);
    max-width:340px;
  }
  /* Mobile tap highlight kald\u0131r\u0131ld\u0131 \u2014 modal a\xE7\u0131l\u0131rken g\xF6r\xFCn\xFCr kal\u0131yordu */
  .renuvex-pr-review-gallery .renuvex-pr-read-more{
    -webkit-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
    user-select:none;-webkit-user-select:none;
  }
  .renuvex-pr-review-gallery-media{
    cursor:pointer;
  }
  /* Reply full-width: foto+metin alt\u0131nda her iki kolona yay\u0131l\u0131r */
  .renuvex-pr-review-gallery-reply{
    grid-column:1 / -1;
  }
  .renuvex-pr-review-gallery-media > *{
    display:block;width:100%;height:auto;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-media-gallery-image-border,rgba(0,0,0,0.05));
  }
  .renuvex-pr-review-gallery-media > .renuvex-pr-media-video-thumb{
    display:grid;
    place-items:center;
  }
  .renuvex-pr-review-gallery-media > .renuvex-pr-media-video-thumb > .renuvex-pr-media-poster,
  .renuvex-pr-review-gallery-media > .renuvex-pr-media-video-thumb > .renuvex-pr-media-play{
    grid-area:1 / 1;
  }
  .renuvex-pr-review-gallery-media > .renuvex-pr-media-video-thumb > .renuvex-pr-media-play{
    position:relative;
    left:auto;
    top:auto;
    transform:none;
    justify-self:center;
    align-self:center;
    z-index:1;
  }
  @media (max-width:600px){
    /* Tek kolonda full-bleed'i geri getir. Yukar\u0131daki masa\xFCst\xFC 2-kolon kural\u0131 k\xF6k\xFC
       max-width:1200/margin:auto ile non-full-bleed yap\u0131yor; bu media-scoped olmad\u0131\u011F\u0131
       i\xE7in mobilde de ge\xE7erli kal\u0131p gallery'yi tema konteynerinin yan padding'ine
       hapsediyordu (kart/liste full-bleed'ken). Burada full-bleed'i geri vererek
       item'\u0131n 16px'ini TEK yan bo\u015Fluk yap\u0131yoruz \u2192 kart/liste ile birebir 16px.
       (base.js'teki full-bleed s\xF6zle\u015Fmesiyle hizal\u0131.) */
    #renuvex-reviews-widget:has(.renuvex-pr-review-gallery){
      width:100vw;
      max-width:100vw;
      margin-left:calc(50% - 50vw);
      margin-right:calc(50% - 50vw);
      column-count:1;
      column-gap:0;
    }
    .renuvex-pr-review-gallery{
      grid-template-columns:1fr var(--renuvex-pr-gallery-photo-w-mobile,100px);
      column-gap:12px;row-gap:12px;
      /* Yan padding theme mobile bloguna tasindi (--renuvex-pr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      padding-top:16px;padding-bottom:16px;
    }
    .renuvex-pr-review-gallery.renuvex-pr-review-gallery--no-media{
      grid-template-columns:1fr;
    }
  }
`;var _o={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Lo=Ln;function Ro(e,r){var t=xe(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ke(e.rating,F),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var u=document.createElement("div");u.className="renuvex-pr-review-gallery-author",u.textContent=e.author||"",i.appendChild(u);var d=document.createElement("time");d.className="renuvex-pr-review-gallery-date",d.style.display="block",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=ze(e.createdAt),i.appendChild(d);var f=(e.comment||"").trim();if(f&&i.appendChild(ur(f,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){me(e,t.url,r)}}:null).fragment),n.appendChild(i),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var p=Be(t,{sourceWidth:Vr,width:Vr,height:Math.round(Vr*4/3),onOpen:function(){me(e,t.url,r)}});p&&v.appendChild(p),n.appendChild(v)}var s=sr(e.merchantReply,t?function(){me(e,t.url,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(s)),n}var lt={card:It,list:Ot,gallery:Ut};function dt(e){return lt[e]||lt.card}function Rn(){return Object.keys(lt).map(function(e){return lt[e].css||""}).join(`
`)}var Vt=0;function We(){return Vt++,Vt}function qe(e,r){return e!==Vt?!1:r?!(r.productId!==void 0&&Q!==r.productId||r.orderBy!==void 0&&te!==r.orderBy||r.page!==void 0&&fr!==r.page||r.ratingFilter!==void 0&&ie!==r.ratingFilter||r.mediaFilter!==void 0&&ae!==r.mediaFilter||r.nextCursor!==void 0&&Lr!==r.nextCursor):!0}var Ht={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,mediaGalleryTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,mediaGalleryTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,mediaGalleryTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},Yt={small:80,medium:110,large:140},Dt={small:80,medium:100,large:110};function Nn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),a.appendChild(n),a.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(l),r}function Bn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var a=document.createElement("div");a.className="renuvex-pr-empty-state-stars",a.innerHTML=Re(0,e.iconPair),t.appendChild(a);var n=document.createElement("p");n.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(n),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function Fn(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function In(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function Ee(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+a+","+n+","+i+","+r+")"}function pt(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function jt(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function On(e){return .2126*jt(e.r)+.7152*jt(e.g)+.0722*jt(e.b)}function Un(e,r){var t=On(e),a=On(r),n=Math.max(t,a),i=Math.min(t,a);return(n+.05)/(i+.05)}function No(e){var r=pt(e)||pt("#ffffff"),t=pt("#111111"),a=pt("#ffffff");return Un(t,r)>=Un(a,r)?"#111111":"#ffffff"}function Bo(e){return Ee(e,e==="#ffffff"?.1:.06)}function Vn(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",u=r.barCountColor||"#111111",d=Ee(o,.06),f=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",p=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",h=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",m=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",w=r.filterMenuBorderColor||"#e5e7eb",S=r.filterItemTextColor||"#111111",M=r.filterItemHoverBgColor||"#f3f4f6",y=r.filterItemActiveColor||"#111111",E=r.reviewTitleColor||"#111111",x=r.reviewAuthorColor||"#111111",z=r.reviewDateColor||"#5e5e5e",A=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",P=Ee(A,.65),k=r.replyBgColor||"#f9fafb",C=r.replyBorderColor||"#747474",R=r.replyLabelColor||"#111111",I=r.replyTextColor||"#111111",g=r.mediaGalleryTitleColor||"#111111",L=Ee("#111111",.05),O=r.mediaGalleryArrowBgColor||"#ffffff",U=r.mediaGalleryArrowTextColor||"#111111",D=Ee("#111111",.12),W=r.reviewLightboxVideoIconColor||"#ffffff",j=r.reviewLightboxVideoProgressColor||"#ffffff",Y=r.reviewLightboxVideoProgressTrackColor||"#000000",$=r.formBgColor||"#ffffff",N=r.formPrimaryTextColor||"#111111",_=r.formSecondaryTextColor||"#3b3b3b",q=r.inputTextColor||N,B=r.inputBorderColor||"#d1d5db",X=r.placeholderColor||"#9ca3af",K=r.formStepBarColor||"#111111",J=r.formBtnBgColor||"#111111",Z=r.formBtnTextColor||"#ffffff",V=r.formBtnBorderColor||"#111111",Fe=Ee(J,.06),ce=Ee(J,.18),vr=Ee(Z,.85),cr=Ee(N,.06),Te=No($),H=Bo(Te),re=r.loadMoreBgColor||"#ffffff",Ae=r.loadMoreTextColor||"#111111",Ie=r.loadMoreBorderColor||"#111111",Tr=r.paginationBgColor||"#ffffff",Ar=r.paginationTextColor||"#111111",Mr=r.paginationBorderColor||"#e5e7eb",Pr=r.paginationActiveBgColor||"#111111",_r=r.paginationActiveTextColor||"#ffffff",fe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":u,"--renuvex-pr-bar-hover-bg":d,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":p,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":h,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":m,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":w,"--renuvex-pr-filter-item-text":S,"--renuvex-pr-filter-item-hover-bg":M,"--renuvex-pr-filter-item-active":y,"--renuvex-pr-review-title":E,"--renuvex-pr-review-author":x,"--renuvex-pr-review-date":z,"--renuvex-pr-review-body":A,"--renuvex-pr-review-border":T,"--renuvex-pr-state-text":P,"--renuvex-pr-review-star-color":f,"--renuvex-pr-reply-bg-color":k,"--renuvex-pr-reply-border":C,"--renuvex-pr-reply-label":R,"--renuvex-pr-reply-text":I,"--renuvex-pr-media-gallery-title":g,"--renuvex-pr-media-gallery-image-border":L,"--renuvex-pr-media-gallery-arrow-bg":O,"--renuvex-pr-media-gallery-arrow-text":U,"--renuvex-pr-media-gallery-arrow-border":D,"--renuvex-pr-review-lightbox-video-icon":W,"--renuvex-pr-review-lightbox-video-progress":j,"--renuvex-pr-review-lightbox-video-progress-track":Y,"--renuvex-pr-fwizard-bg":$,"--renuvex-pr-fwizard-text":N,"--renuvex-pr-fwizard-secondary-text":_,"--renuvex-pr-fwizard-input-bg":$,"--renuvex-pr-fwizard-input-text":q,"--renuvex-pr-fwizard-input-border":B,"--renuvex-pr-fwizard-placeholder":X,"--renuvex-pr-fwizard-close-text":Te,"--renuvex-pr-fwizard-close-hover-bg":H,"--renuvex-pr-fwizard-progress-bg":cr,"--renuvex-pr-fwizard-progress-active":K,"--renuvex-pr-fwizard-btn-bg":J,"--renuvex-pr-fwizard-btn-text":Z,"--renuvex-pr-fwizard-btn-border":V,"--renuvex-pr-fwizard-btn-disabled-bg":ce,"--renuvex-pr-fwizard-btn-disabled-text":vr,"--renuvex-pr-fwizard-nav-hover-bg":Fe,"--renuvex-pr-load-more-bg":re,"--renuvex-pr-load-more-text":Ae,"--renuvex-pr-load-more-border":Ie,"--renuvex-pr-pagination-bg":Tr,"--renuvex-pr-pagination-text":Ar,"--renuvex-pr-pagination-border":Mr,"--renuvex-pr-pagination-active-bg":Pr,"--renuvex-pr-pagination-active-text":_r};Object.keys(fe).forEach(function(mr){e.style.setProperty(mr,fe[mr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Hn(e){var r=e.settings||{},t=e.root,a=e.currentMediaFilter||"none";if(!(r.showMediaGallery!==!1&&a==="none"))return null;var n=document.createElement("div");n.className="renuvex-pr-media-gallery-section renuvex-pr-media-gallery-section--placeholder",n.setAttribute("aria-hidden","true");var i=r.reviewLayout==="card"?"1/1":"3/4";if(t&&t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",i),r.showMediaGalleryTitle!==!1){var o=document.createElement("div");o.className="renuvex-pr-media-gallery-title",o.textContent=G(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),n.appendChild(o)}var l=document.createElement("div");l.className="renuvex-pr-media-gallery-strip-wrap";var u=document.createElement("div");u.className="renuvex-pr-media-gallery-strip";var d=document.createElement("div");return d.className="renuvex-pr-media-gallery-thumb renuvex-pr-media-gallery-thumb--placeholder",u.appendChild(d),l.appendChild(u),n.appendChild(l),n}function Gt(e){var r=e.settings,t=e.root,a=e.currentMediaFilter||"none",n=e.openReviewModal,i=(e.mediaStripReviews||[]).filter(function(S){return Ne(S).length>0});if(!(r.showMediaGallery!==!1&&a==="none"&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-media-gallery-section",r.showMediaGalleryTitle!==!1){var l=G(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),u=document.createElement("div");u.className="renuvex-pr-media-gallery-title",u.textContent=l,o.appendChild(u)}var d=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",d);var f=document.createElement("div");f.className="renuvex-pr-media-gallery-strip";var v=oe,p=r.reviewLayout==="card"?oe:Math.round(oe*4/3),s=0;i.forEach(function(S){if(!(s>=15)){var M=xe(S);if(M){var y=Be(M,{className:"renuvex-pr-media-gallery-thumb",sourceWidth:oe,width:v,height:p,loading:s<3?"eager":"lazy",onOpen:function(){n(S,M.url,i,{source:"mediaGallery"})}});y&&(f.appendChild(y),s++)}}});var h=document.createElement("button");h.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-prev";var c=ee(Xe);c&&h.appendChild(c),h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(){f.scrollBy({left:-200,behavior:"smooth"})};var m=document.createElement("button");m.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-next";var b=ee(Or);b&&m.appendChild(b),m.setAttribute("aria-label","Sonraki"),m.onclick=function(){f.scrollBy({left:200,behavior:"smooth"})};var w=document.createElement("div");return w.className="renuvex-pr-media-gallery-strip-wrap",w.appendChild(h),w.appendChild(f),w.appendChild(m),o.appendChild(w),o}var Fo=1,Io=7,Wt="\u2026";function Oo(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=Io){for(var n=[],i=1;i<=t;i++)n.push(i);return n}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-a)<=Fo)&&o.push(l);for(var u=[],d=0;d<o.length;d++)d>0&&o[d]-o[d-1]>1&&u.push(Wt),u.push(o[d]);return u}function Yn(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},n=document.createElement("nav");n.className="renuvex-pr-pagination",n.setAttribute("aria-label","Yorum sayfalar\u0131");function i(u){n.setAttribute("aria-busy","true");for(var d=n.querySelectorAll("button"),f=0;f<d.length;f++)d[f].disabled=!0;a(u)}function o(u,d){var f=document.createElement("span");f.className="renuvex-pr-pagination-label",f.setAttribute("aria-hidden","true"),f.textContent=d,u.appendChild(f)}function l(u,d,f,v){var p=document.createElement("button");return p.type="button",p.className="renuvex-pr-pagination-arrow",p.setAttribute("aria-label",u),o(p,d),v?p.disabled=!0:p.onclick=function(){i(f)},p}return n.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),Oo(t,r).forEach(function(u){if(u===Wt){var d=document.createElement("span");d.className="renuvex-pr-pagination-gap",d.setAttribute("aria-hidden","true"),d.textContent=Wt,n.appendChild(d);return}var f=document.createElement("button");f.type="button",f.className="renuvex-pr-pagination-btn",f.setAttribute("aria-label","Sayfa "+u),o(f,String(u)),u===t?f.setAttribute("aria-current","page"):f.onclick=function(){i(u)},n.appendChild(f)}),n.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),n}function Dn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function jn(e){var r=e.render;async function t(){var o=We(),l=Q,u=te,d=ie,f=ae;_e(null);var v=await Ye(Q,te,1,ie,ae);qe(o,{productId:l,orderBy:u,ratingFilter:d,mediaFilter:f})&&await r(Q,F,v,Oe,te,1,Xt)}async function a(o){var l=We(),u=ie===o?null:o,d=Q,f=te,v=ae;Jt(u),Ue(1),_e(null);var p=await Ye(Q,te,1,u,ae);qe(l,{productId:d,orderBy:f,page:1,ratingFilter:u,mediaFilter:v})&&await r(Q,F,p,Oe,te,1)}async function n(o,l){var u=We(),d=Q,f=ie;Ue(1),_e(null);var v=o,p=l==="images"||l==="media"?l:"none";p!=="none"&&(v="newest"),Zt(p),Rr(v);var s=await Ye(Q,v,1,ie,p);qe(u,{productId:d,orderBy:v,page:1,ratingFilter:f,mediaFilter:p})&&await r(Q,F,s,Oe,v,1)}async function i(o){var l=We(),u=Q,d=te,f=ie,v=ae;Ue(o),_e(null);var p=await Ye(Q,te,o,ie,ae);if(qe(l,{productId:u,orderBy:d,page:o,ratingFilter:f,mediaFilter:v})){await r(Q,F,p,Oe,te,o);var s=document.getElementById("renuvex-reviews"),h=s&&s.shadowRoot,c=h&&h.querySelector&&h.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(w){try{c.focus()}catch(S){}}Dn(h,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var m=document.getElementById("renuvex-reviews");if(m&&typeof m.scrollIntoView=="function"){var b=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;m.scrollIntoView({behavior:b?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:n,onPageChange:i}}function Gn(e){return Math.round(Math.max(36,Math.min(52,e*.38)))}function Wn(e){return Math.round(e*.5)}function Uo(e){return e.querySelector(".renuvex-pr-review, .renuvex-pr-review-list, .renuvex-pr-review-gallery, .renuvex-pr-state-msg, .renuvex-pr-load-more, .renuvex-pr-pagination")}function Vo(e){var r=e&&e.data;if(!r)return!1;var t=Number(r.mediaReviewCount);return Number.isFinite(t)&&t>0}function ds(e,r){if(String(Q||"")!==String(e||""))return!1;var t=document.getElementById("renuvex-reviews"),a=t&&t.shadowRoot,n=a&&a.getElementById("renuvex-reviews-widget");if(!n||n.getAttribute("data-renuvex-product-id")!==String(e||""))return!1;var i=Gt({settings:r,root:document.documentElement,currentMediaFilter:ae,mediaStripReviews:mt,openReviewModal:me,wireLightboxTrigger:ar});if(!i)return!1;var o=n.querySelector(".renuvex-pr-media-gallery-section");return o?o.replaceWith(i):n.insertBefore(i,Uo(n)),!0}async function qt(e,r,t,a,n,i,o){if(la){Fr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:i,badgeSettings:o});return}Br(!0),Qt(e),ea(r),o!==void 0&&ra(o),ta(a),n&&Rr(n),i&&Ue(i),t!=null&&(aa(t),_e(t&&t.data?t.data.nextCursor:null));var l=jn({render:qt});try{let Te=function(H,re){if(!(!H||!H.meta||!H.meta.sizeOverrides)){var Ae=H.meta.sizeOverrides[re];Ae&&Object.keys(Ae).forEach(function(Ie){s.style.setProperty(Ie,Ae[Ie])})}};var vr=Te,u=ot(r.summaryLayout),d=!(u.meta&&u.meta.supports&&u.meta.supports.title===!1),f=r.showTitle!==!1,v=G(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),p=d&&f?v:"",s=document.documentElement;Vn(s,r);var h=r.borderRadius!==void 0?r.borderRadius:8,c=Ht[r.size]||Ht.medium,m=Yt[r.thumbnailSize]||Yt.medium,b=m;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(b=Dt[r.thumbnailSize]||Dt.medium),s.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",h+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,h-4)+"px"),s.style.setProperty("--renuvex-pr-media-gallery-title-size",c.mediaGalleryTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-load-more-min-height",c.loadMoreMinHeight+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-y",c.loadMorePadY+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-x",c.loadMorePadX+"px"),s.style.setProperty("--renuvex-pr-load-more-mobile-min-height",c.loadMoreMobileMinHeight+"px"),s.style.setProperty("--renuvex-pr-pagination-button-size",c.paginationButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-pad-x",c.paginationPadX+"px"),s.style.setProperty("--renuvex-pr-pagination-gap",c.paginationGap+"px"),s.style.setProperty("--renuvex-pr-pagination-margin-top",c.paginationMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-gap-min",c.paginationGapMin+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-button-size",c.paginationMobileButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-font-size",c.paginationMobileFontSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap",c.paginationMobileGap+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",c.paginationMobileMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",c.paginationMobileGapMin+"px"),s.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",m+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",b+"px");var w=Gn(m),S=Gn(b);s.style.setProperty("--renuvex-pr-media-play-size",w+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size",Wn(w)+"px"),s.style.setProperty("--renuvex-pr-media-play-size-mobile",S+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size-mobile",Wn(S)+"px");var M=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",M),s.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),Te(ot(r.summaryLayout),r.size),Te(dt(r.reviewLayout),r.size);var y=xr(r),E=ya();if(!E)return;var x=wa(E,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==x&&x.appendChild(z);var A=ga(z),T=Ze+Ke+Dr+Mn()+Rn();Qe(A,T);var P=ba(A);if(r.enabled===!1){z.style.minHeight="auto",z.removeAttribute("data-renuvex-transitioning"),P.replaceChildren(Nn(r.borderRadius!==void 0?r.borderRadius:8)),Br(!1);var k=Nr;Fr(null),k&&qt(k.productId,k.settings,k.reviewsData,k.productName,k.orderBy,k.page,k.badgeSettings);return}try{var C=t||{},R=gt(C),I=R?[]:C.data&&C.data.reviews||[];na(I),P.replaceChildren(),z.removeAttribute("data-renuvex-transitioning");var g=document.createElement("section");if(g.id="renuvex-reviews-widget",g.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),g.className="renuvex-pr-reviews-widget",g.setAttribute("data-renuvex-surface","reviews"),e&&g.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(g.style.width="100%",g.style.maxWidth="100%",g.style.marginLeft="0",g.style.marginRight="0"),p){var L=document.createElement("div"),O=r.summaryLayout||"classic";L.className="renuvex-pr-title renuvex-pr-title-"+O,L.textContent=p,g.appendChild(L)}if(R){g.appendChild(In(C.message,l.onRetry)),P.appendChild(g),Ve(A),st(g,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return A.getElementById("renuvex-reviews-widget")}),vt("reviews-widget-visible");return}var U=C.data&&C.data.allCount||0,D=C.data&&C.data.ratingCounts||null,W=D||[0,0,0,0,0],j=C.data&&C.data.avgRating||"0.0";if(!D&&I.length>0){I.forEach(function(H){H.rating>=1&&H.rating<=5&&W[H.rating-1]++});var Y=I.reduce(function(H,re){return H+re.rating},0);j=(Y/I.length).toFixed(1)}if(U===0)g.classList.add("renuvex-pr-reviews-empty"),g.appendChild(Bn({iconPair:y,writeButtonText:G(r.writeButtonText,"Yorum Yap"),emptyStateText:G(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:ne}));else{var $=ot(r.summaryLayout),N=$.render({widget:g,productId:e,data:C,settings:r,iconPair:y,allCount:U,ratingCounts:W,avgRatingVal:j,currentRatingFilter:ie,currentOrderBy:te,currentMediaFilter:ae,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});g.appendChild(N);var _=Gt({settings:r,root:s,currentMediaFilter:ae,mediaStripReviews:mt,openReviewModal:me,wireLightboxTrigger:ar});if(_)g.appendChild(_);else if(Vo(C)){var q=Hn({settings:r,root:s,currentMediaFilter:ae});q&&g.appendChild(q)}if(I.length===0)g.appendChild(Fn());else{var B=dt(r.reviewLayout);I.forEach(function(H){g.appendChild(B.render(H,ct))})}var X=r.paginationMode==="numbered"?"numbered":"loadMore";if(X==="numbered"){var K=C.data&&C.data.totalPages||1;K>1&&g.appendChild(Yn({page:C.data&&C.data.page||fr||1,totalPages:K,onPageChange:l.onPageChange}))}var J=X==="loadMore"&&C.data&&C.data.hasMore;if(J){let H=function(re){V.textContent=re,Z.setAttribute("aria-label",re)};var cr=H,Z=document.createElement("button");Z.className="renuvex-pr-load-more";var V=document.createElement("span");V.className="renuvex-pr-load-more-label",V.setAttribute("aria-hidden","true"),Z.appendChild(V),H("Daha Fazla G\xF6ster"),Z.onclick=async function(){Z.disabled=!0,H("Y\xFCkleniyor...");var re=We(),Ae=Q,Ie=te,Tr=fr,Ar=ie,Mr=ae,Pr=Lr,_r=Tr+1,fe=await Ye(Ae,Ie,_r,Ar,Mr,null,Pr);if(qe(re,{productId:Ae,orderBy:Ie,page:Tr,ratingFilter:Ar,mediaFilter:Mr,nextCursor:Pr}))if(fe&&!gt(fe)&&fe.data&&Array.isArray(fe.data.reviews)){var mr=ia(fe.data.reviews);oa(mr),Ue(_r),_e(fe.data.nextCursor||null);var qn=dt(F.reviewLayout);mr.forEach(function(Kn){g.insertBefore(qn.render(Kn,ct),Z)}),fe.data.hasMore?(Z.disabled=!1,H("Daha Fazla G\xF6ster")):Z.remove()}else Z.disabled=!1,H("Tekrar Dene")},g.appendChild(Z)}}P.appendChild(g),Ve(A),st(g,"reviews-widget",{productId:e||""},function(){return A.getElementById("renuvex-reviews-widget")}),vt("reviews-widget-visible")}catch(H){console.error("[renuvex-pr] render error:",H);var Fe=document.createElement("p");Fe.style.cssText="text-align:center;color:#dc2626;",Fe.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",P&&P.replaceChildren(Fe)}}finally{if(Br(!1),Nr){var ce=Nr;Fr(null),qt(ce.productId,ce.settings,ce.reviewsData,ce.productName,ce.orderBy,ce.page,ce.badgeSettings)}}}export{qt as render,ds as renderDeferredMediaGallery};
