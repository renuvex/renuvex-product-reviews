/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as ka,b as lr,c as jr,d as Ue,e as we,f as Sa,h as St,i as Ke,k as dr,l as za,m as pr,n as Kr,o as qr,p as Ca,q as Ea,r as Ta,s as Aa}from"./chunk-DHCH2MHO.js";import{c as Me}from"./chunk-WWGCW5YN.js";import{a as tr,d as Ne}from"./chunk-N7KC6W47.js";import{A as ua,B as sa,C as va,D as ca,E as Ur,F as Hr,G as Dr,a as ie,b as Cr,c as pe,d as oe,e as ee,f as F,g as ra,h as Ye,j as Fr,k as yt,l as ta,m as wt,n as Or,o as We,p as aa,q as na,r as ia,s as oa,t as la,u as da,v as pa,w as Be}from"./chunk-DSBS2GI5.js";import{c as ht}from"./chunk-U53GWZAW.js";import{A as Oe,B as Gr,C as ye,D as ir,E as or,F as ba,G as ya,H as Tr,I as Ar,J as wa,a as Ie,b as ve,c as ce,d as re,e as Ge,f as Vr,g as Er,h as ma,i as ar,j as Yr,k as fa,l as Ee,m as Wr,n as xa,o as nr,q as D,r as ga,s as Te,t as Fe,v as ha,w as Ae,y as me,z as kt}from"./chunk-DFLKYUYG.js";import{a as se,b as Ce,d as bt,k as je}from"./chunk-SUP34WWV.js";import"./chunk-W53BN4EO.js";import{a as gt,b as ea,d as Re}from"./chunk-D4BSMMIO.js";var Ma=`
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
`,_a=`
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
`;var Pa=`
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
  .renuvex-pr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--renuvex-pr-btn-bg,#111111);color:var(--renuvex-pr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:1px solid var(--renuvex-pr-btn-border,#111111);font-weight:500;font-size:var(--renuvex-pr-btn-text-size,14px);line-height:1.2;text-align:center;white-space:normal;overflow-wrap:anywhere;word-break:break-word;transition:opacity 0.15s;}
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
`;var La=`
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
`;var Ra=`
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
`;var Na=`
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
`;var Ba=`
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
`;var Ia=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:var(--renuvex-pr-media-play-size,42px);height:var(--renuvex-pr-media-play-size,42px);min-width:var(--renuvex-pr-media-play-size,42px);min-height:var(--renuvex-pr-media-play-size,42px);border-radius:50%;background:rgba(0,0,0,.35);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size,21px);height:var(--renuvex-pr-media-play-icon-size,21px);margin-left:2px;}
  @media(max-width:640px){
    .renuvex-pr-media-play{width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));min-width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));min-height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));}
    .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));height:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));}
  }
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Xr=[Ma,ha,Pa,La,Ra,Na,Ia,Ba,_a].join(`
`);function ni(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ke(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function ii(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function oi(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",i=ii()&&!n;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function li(e){var r=document.body.style,t=document.documentElement.style;ke(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ke(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ke(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ke(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ke(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ke(r,"position",e.bodyPosition,e.bodyPositionPriority),ke(r,"top",e.bodyTop,e.bodyTopPriority),ke(r,"left",e.bodyLeft,e.bodyLeftPriority),ke(r,"right",e.bodyRight,e.bodyRightPriority),ke(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Mr=0,ur=null;function $r(){return Mr+=1,Mr>1||(ur=ni(),oi(ur)),ur}function Jr(){if(Mr!==0&&(Mr-=1,!(Mr>0))){var e=ur;ur=null,e&&li(e)}}function di(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Zr(){var e=di();return!e||e===document.body||e===document.documentElement?null:e}function fe(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function pi(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function zt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(pi)}function ui(e,r){var t=e,a=zt(e);!a.length&&r&&(t=r,a=zt(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;fe(n)}function Qr(e,r,t){if(e.key==="Tab"){var a=zt(r);if(!a.length){e.preventDefault(),ui(r);return}var n=a[0],i=a[a.length-1],o=Ca(t);if(!r.contains(o)){e.preventDefault(),fe(n);return}if(a.indexOf(o)===-1){e.preventDefault(),fe(e.shiftKey?i:n);return}e.shiftKey&&o===n?(e.preventDefault(),fe(i)):!e.shiftKey&&o===i&&(e.preventDefault(),fe(n))}}var Fa="renuvexPrOverlay";function et(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Fa]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function si(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Fa]===e.id)}function rt(e){if(si(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}var vi="media-theme-renuvex-review-storefront";var Oa="renuvex-review-storefront",sr={controlForeground:"#ffffff",controlBackground:"#000000",controlHoverBackground:"rgba(0,0,0,0.84)",centerPlayButtonBackground:"rgba(0,0,0,0.68)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.72)",controlsBackdrop:"rgba(0,0,0,0.58)",menuBackground:"#000000",menuBorder:"rgba(255,255,255,0.18)",menuText:"#ffffff",menuCheckedText:"#ffffff",menuHoverBackground:"rgba(255,255,255,0.12)",menuCheckedBackground:"rgba(255,255,255,0.18)",menuHoverOutline:"rgba(255,255,255,0.54) solid 1px",progressPlayed:"#ffffff",progressTrack:"#000000",progressPointer:"rgba(255,255,255,0.72)",progressBuffered:"rgba(255,255,255,0.28)",progressThumbBorder:"1px solid rgba(255,255,255,0.72)",progressThumbShadow:"0 0 0 1px rgba(0,0,0,0.45)",progressPointerBorder:"1px solid rgba(0,0,0,0.55)"};function tt(e,r){return`var(--renuvex-pr-review-lightbox-video-${e}, ${r})`}var ci=gt({},sr),_r=ea(gt({},sr),{controlForeground:tt("icon",sr.controlForeground),centerPlayButtonBackground:"rgba(0,0,0,0.35)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.42)",progressPlayed:tt("progress",sr.progressPlayed),progressTrack:tt("progress-track",sr.progressTrack),progressThumbBorder:`1px solid ${tt("progress",sr.progressPlayed)}`}),at=null;function Ua(e){return`
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
`}var hl=Ua(ci),mi=Ua(_r);function fi(e,r){var p;if(typeof window=="undefined"||typeof document=="undefined")return;let t=window.customElements;if(t.get(e))return;let a=t.get("media-theme-gerwig"),n=a==null?void 0:a.template;if(!a||!(n instanceof HTMLTemplateElement))return;let i=n.cloneNode(!0);i.id=e,(p=i.content.querySelector("media-controller"))==null||p.setAttribute("lang","tr");let o=document.createElement("style");o.textContent=r,i.content.append(o);class l extends a{}l.template=i,t.define(e,l)}function xi(e,r){return typeof window=="undefined"?Promise.resolve():(at!=null||(at=import("./review-player-i18n-775ENPF7.js").then(()=>import("./dist-ESXZERR5.js")).then(()=>import("./menu-ZPT7P4I2.js")).then(()=>import("./gerwig-J4LRWRX2.js")).then(()=>import("./dist-F5RX6YFS.js")).then(()=>{})),at.then(()=>{fi(e,r)}))}function Ha(){return xi(vi,mi)}var Et=null,Ya="--center-play-button";function gi(){return Et||(Et=Ha()),Et}function hi(e){return new Promise(function(r){function t(a){if(a<=0){r();return}requestAnimationFrame(function(){t(a-1)})}t(e)})}function bi(e){e.style.setProperty(Ya,"none")}function Da(e){e.style.removeProperty(Ya)}function yi(e){if(!e||typeof e!="object")return"";var r=typeof e.playbackId=="string"?e.playbackId.trim():"",t=ka(e.url);return r&&t&&r!==t?"":r||t}function wi(e,r){var t=yi(r);if(!t)return!1;var a=lr(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"";return e.setAttribute("disable-tracking",""),e.setAttribute("disable-cookies",""),e.setAttribute("preload","metadata"),e.setAttribute("stream-type","on-demand"),e.setAttribute("muted",""),e.setAttribute("playsinline",""),e.setAttribute("nohotkeys",""),e.setAttribute("lang","tr"),e.setAttribute("theme",Oa),e.setAttribute("accent-color",_r.controlForeground),e.setAttribute("primary-color",_r.controlForeground),e.setAttribute("secondary-color",_r.controlBackground),a&&e.setAttribute("poster",a),e.setAttribute("playback-id",t),!0}function Va(e){e.preventDefault()}function Wa(e,r){var t=!1,a=document.createElement("mux-player");a.className=r||"renuvex-pr-modal-main-video",a.setAttribute("aria-label","Yorum videosu"),bi(a),a.addEventListener("contextmenu",Va);var n=wi(a,e);return n?gi().then(function(){if(window.customElements&&typeof window.customElements.whenDefined=="function")return window.customElements.whenDefined("mux-player")}).then(function(){if(!t){try{typeof a.pause=="function"&&a.pause()}catch(i){}return hi(2)}}).then(function(){t||Da(a)}).catch(function(){t||a.dispatchEvent(new Event("error"))}):setTimeout(function(){t||a.dispatchEvent(new Event("error"))},0),{element:a,cleanup:function(){t=!0;try{typeof a.pause=="function"&&a.pause()}catch(o){}a.removeAttribute("playback-id"),a.removeAttribute("playback-token"),a.removeAttribute("thumbnail-token"),a.removeAttribute("poster"),Da(a),a.removeEventListener("contextmenu",Va)}}}function vr(e){return Ue(e)}function ja(e){return e&&e.source==="mediaGallery"}function ki(e,r){if(!ja(r))return vr(e);var t=we(e);return t?[t]:[]}function Si(e,r){return(e||[]).filter(function(t){return r==="mediaGallery"?!!we(t):vr(t).length>0})}function At(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function Ga(e,r,t,a,n,i){e&&e.shadowRoot&&At(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Jr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Vr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&fe(n)}function zi(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=Te(e.rating,F);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=Ae(e.createdAt),a.appendChild(n),a.appendChild(i),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-modal-body",p.textContent=(e.comment||"").trim(),p.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(p);var d=document.createElement("div");d.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=D(F&&F.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",d.appendChild(m),d.appendChild(v),d.style.display=e.merchantReply?"":"none",t.appendChild(d),r.appendChild(t),r}function Ka(e,r,t){var a=t||F,n=e.querySelector(".renuvex-pr-modal-scroll-content"),i=n.querySelector(".renuvex-pr-modal-stars");i.innerHTML=Te(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=Ae(r.createdAt);var o=n.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=n.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var p=n.querySelector(".renuvex-pr-modal-reply");p.querySelector(".renuvex-pr-modal-reply-label").textContent=D(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),p.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",p.style.display=r.merchantReply?"":"none",e.scrollTop=0}var Ci=112;function Mt(e){return e&&e.touches&&e.touches.length?e.touches[0]:e&&e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null}function Ei(e){var r=e&&e.target;return!!(r&&typeof r.closest=="function"&&r.closest(".renuvex-pr-modal-thumbs"))}function Ti(e,r,t){if(!r||r.type!=="video"||!t)return!1;var a=Mt(e);if(!a)return!1;var n=t.querySelector("mux-player.renuvex-pr-modal-main-video");if(!n||typeof n.getBoundingClientRect!="function")return!1;var i=n.getBoundingClientRect();if(!i.width||!i.height||a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom)return!1;var o=Math.min(Ci,Math.max(72,i.height*.2));return a.clientY>=i.bottom-o}function qa(e){var r=e&&e.type==="video"?e.posterUrl:e&&e.url;if(e&&e.type==="video"){var t={width:Oe,height:Oe,fit:"crop"};return{src:lr(r,t),srcset:jr(r,t)}}return Ar(e,Oe)}function Ai(e,r,t){var a=e&&e.media;if(!a)return null;var n=document.createElement("button");n.type="button",n.className="renuvex-pr-modal-thumb renuvex-pr-modal-thumb-button"+(a.type==="video"?" renuvex-pr-modal-thumb-video":"")+(r?" renuvex-pr-modal-thumb-active":""),n.setAttribute("aria-label","Galeri medyas\u0131 "+(e.index+1)+" se\xE7"),r&&n.setAttribute("aria-current","true");var i=document.createElement("img");i.className="renuvex-pr-modal-thumb-img";var o=qa(a);if(i.src=o.src,o.srcset&&(i.srcset=o.srcset),i.loading="lazy",i.decoding="async",i.width=Oe,i.height=Oe,i.alt="",Tr(i),n.appendChild(i),a.type==="video"){var l=document.createElement("span");l.className="renuvex-pr-modal-thumb-play";var p=re(nr);p&&l.appendChild(p),n.appendChild(l)}return n.onclick=t,n}function Mi(e){var r=[];return(e||[]).forEach(function(t,a){var n=we(t);n&&r.push({review:t,reviewIdx:a,media:n,index:r.length})}),r}function _t(e,r,t,a,n,i,o,l,p){var d=ki(e,p),m=Math.max(0,Math.min(t||0,d.length-1)),v=d[m],u=document.createElement("div");u.className="renuvex-pr-modal-left";var s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(v&&v.type==="video"){var g=Wa(v,"renuvex-pr-modal-main-video"+(s?" renuvex-pr-modal-video-enter":"")),c=g.element;c.addEventListener("error",function(){if(!u.querySelector(".renuvex-pr-modal-img-error")){var I=document.createElement("div");I.className="renuvex-pr-modal-img-error",I.setAttribute("role","status"),I.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",u.insertBefore(I,c)}});var f=!1,b=function(){u.classList.add("renuvex-pr-modal-left-video-playing")},k=function(){f=!0,b()},E=function(){f&&b()},M=function(){f=!1,u.classList.remove("renuvex-pr-modal-left-video-playing")};c.addEventListener("play",k),c.addEventListener("playing",k),c.addEventListener("pause",E),c.addEventListener("ended",M),u.__renuvexMediaCleanup=function(){c.removeEventListener("play",k),c.removeEventListener("playing",k),c.removeEventListener("pause",E),c.removeEventListener("ended",M),M(),g.cleanup()},u.appendChild(c)}else{var S=document.createElement("img");S.className="renuvex-pr-modal-main-img"+(s?" "+s:"");var R=Ar(v,Gr,{preferFullSize:!0});if(S.src=R.src,R.srcset&&(S.srcset=R.srcset),S.decoding="async",S.width=Gr,S.height=Math.round(Gr*4/3),S.alt="Yorum foto\u011Fraf\u0131",!s){S.classList.add("renuvex-pr-modal-img-loading");var y=function(){S.classList.remove("renuvex-pr-modal-img-loading")};S.complete&&S.naturalWidth>0?y():(S.addEventListener("load",y,{once:!0}),S.addEventListener("error",y,{once:!0}))}ya(S,function(I){if(I.style.display="none",!u.querySelector(".renuvex-pr-modal-img-error")){var P=document.createElement("div");P.className="renuvex-pr-modal-img-error",P.setAttribute("role","status"),P.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",u.insertBefore(P,I)}}),u.appendChild(S)}var A=document.createElement("button");A.className="renuvex-pr-modal-close-mobile";var w=re(Ee);w&&A.appendChild(w),A.setAttribute("aria-label","Kapat"),A.onclick=function(I){I.stopPropagation(),i()},u.appendChild(A);var C=0,T=!1,h=!1;if(u.addEventListener("touchstart",function(I){var P=Mt(I);P&&(h=Ei(I),C=P.clientX,T=!h&&Ti(I,v,u))},{passive:!0}),u.addEventListener("touchend",function(I){if(h){h=!1,T=!1;return}if(T){T=!1;return}var P=Mt(I);if(P){var O=C-P.clientX;if(!(Math.abs(O)<50)){if(O>0){if(_)Se(e,r,m+1,a,n,i,!0,"next",l,p);else if(L){var $=a[r+1];Se($,r+1,0,a,n,i,!1,"next",l,p)}}else if(x)Se(e,r,m-1,a,n,i,!0,"prev",l,p);else if(N){var G=a[r-1],Y=vr(G);Se(G,r-1,Y.length-1,a,n,i,!1,"prev",l,p)}}}},{passive:!0}),ja(p)){var z=Mi(a);if(z.length>1){var B=document.createElement("div");B.className="renuvex-pr-modal-thumbs renuvex-pr-modal-thumbs--gallery",z.forEach(function(I){var P=Ai(I,I.reviewIdx===r,function(){Se(I.review,I.reviewIdx,0,a,n,i,!1,null,l,p)});P&&B.appendChild(P)}),u.appendChild(B)}}else if(d.length>1){var U=document.createElement("div");U.className="renuvex-pr-modal-thumbs",d.forEach(function(I,P){var O=document.createElement("img"),$=qa(I);O.src=$.src,O.srcset=$.srcset,O.loading="lazy",O.decoding="async",O.width=Oe,O.height=Oe,O.className="renuvex-pr-modal-thumb"+(P===m?" renuvex-pr-modal-thumb-active":""),O.alt="K\xFC\xE7\xFCk resim "+(P+1),Tr(O),O.tabIndex=0,O.setAttribute("role","button"),O.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(P+1)+" se\xE7"),P===m&&O.setAttribute("aria-current","true"),(function(G){function Y(){Se(e,r,G,a,n,i,!0,null,l,p)}O.onclick=Y,O.onkeydown=function(J){(J.key==="Enter"||J.key===" ")&&(J.preventDefault(),Y())}})(P),U.appendChild(O)}),u.appendChild(U)}var x=m>0,_=m<d.length-1,N=r>0,L=r<a.length-1,V=x||N,j=_||L;if(V){var H=document.createElement("button");H.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var X=re(ar);X&&H.appendChild(X),H.setAttribute("aria-label","\xD6nceki"),H.onclick=function(I){if(I.stopPropagation(),x)Se(e,r,m-1,a,n,i,!0,"prev",l,p);else if(N){var P=a[r-1],O=vr(P);Se(P,r-1,O.length-1,a,n,i,!1,"prev",l,p)}},u.appendChild(H)}if(j){var W=document.createElement("button");W.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var q=re(Yr);q&&W.appendChild(q),W.setAttribute("aria-label","Sonraki"),W.onclick=function(I){if(I.stopPropagation(),_)Se(e,r,m+1,a,n,i,!0,"next",l,p);else if(L){var P=a[r+1];Se(P,r+1,0,a,n,i,!1,"next",l,p)}},u.appendChild(W)}return u}function Xa(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=vr(a);n[0]&&n[0].type==="image"&&(new Image().src=ba(n[0].url))}})}function Tt(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function _i(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){Tt(t),Tt(a),Tt(n)}i(),t&&fe(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function Se(e,r,t,a,n,i,o,l,p,d){if(d&&(d.currentReview=e),o){var m=_t(e,r,t,a,n,i,l,p,d);n.firstChild&&(At(n.firstChild),n.replaceChild(m,n.firstChild))}else{var m=_t(e,r,t,a,n,i,l,p,d),v=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&(At(n.firstChild),n.replaceChild(m,n.firstChild)),v&&Ka(v,e,d&&d.currentSettings),_i(p,n)}Xa(r,a)}function ge(e,r,t,a){var n=a&&a.source==="mediaGallery"?"mediaGallery":"review",i=n==="mediaGallery"?we(e)?[we(e)]:[]:vr(e);if(!i.length)return;var o=Si(t,n),l=o.findIndex(function(C){return C===e||C.id===e.id});l===-1&&(o.unshift(e),l=0);var p=i.findIndex(function(C){return C.url===r});p<0&&(p=0);var d=document.createElement("div");d.className="renuvex-pr-modal-overlay";var m=document.createElement("div");m.className="renuvex-pr-modal";var v=!1,u=null,s=Zr(),g=Ne(),c=$r(),f=et(),b={currentReview:e,currentSettings:F,source:n},k=null;function E(C){var T=C&&C.detail&&C.detail.settings;if(!(T&&T===k)){k=T||null,b.currentSettings=T||F;var h=m.querySelector(".renuvex-pr-modal-right");!h||!b.currentReview||Ka(h,b.currentReview,b.currentSettings)}}function M(){v||(v=!0,window.removeEventListener(je,E),Ga(u&&u.host,S,M,c,s,g))}function S(C){if(C.key==="Escape"){R();return}Qr(C,d,u&&u.root)}function R(){v||(v=!0,window.removeEventListener(je,E),Ga(u&&u.host,S,M,c,s,g),rt(f))}document.addEventListener("keydown",S),window.addEventListener("popstate",M),window.addEventListener(je,E),d.onclick=function(){R()},m.onclick=function(C){C.stopPropagation()},m.appendChild(_t(e,l,p,o,m,R,null,d,b)),m.appendChild(zi(e)),Xa(l,o);var y=document.createElement("div");y.className="renuvex-pr-modal-wrap",y.tabIndex=-1,y.setAttribute("role","dialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),y.appendChild(m);var A=document.createElement("button");A.className="renuvex-pr-modal-close";var w=re(Ee);w&&A.appendChild(w),A.setAttribute("aria-label","Kapat"),A.onclick=function(C){C.stopPropagation(),R()},y.appendChild(A),d.appendChild(y),u=qr(),pr(u.root,dr+tr+Xr),Kr(u.root,d),Ge(u.root),fe(y)}function cr(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Ot={};Re(Ot,{css:()=>go,meta:()=>xo,render:()=>ho});function mr(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,i=e.onFilterChange;Ie(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var p=r[l-1]||0,d=t>0?Math.round(p/t*100):0,m=n===l,v=p>0,u=D(F&&F.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(m?" renuvex-pr-bar-active":"")+(n&&!m?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",m?"true":"false"),s.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+p.toLocaleString("tr-TR")+" "+u+", "+(m?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+u);for(var g="",c=1;c<=5;c++){var f=c<=l;g+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(f?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ve(f?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+g+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+d+'%;"></div></div><span class="renuvex-pr-bar-count">('+p.toLocaleString("tr-TR")+")</span>",v&&(function(b){function k(){i(b)}s.onclick=k,s.onkeydown=function(E){(E.key==="Enter"||E.key===" "||E.key==="Space"||E.key==="Spacebar")&&(E.preventDefault(),k())}})(l),o.appendChild(s)}return o}var Za="data-renuvex-pr-dismiss-gesture",qe=[],$a=!1,nt=!1,Pr=[],fr=null;function Ja(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Pt(){for(var e=qe.length-1;e>=0;e--){var r=qe[e].element;r&&r.isConnected===!1&&qe.splice(e,1)}return qe}function Pi(e){!e||typeof e.setAttribute!="function"||(Pr.indexOf(e)===-1&&Pr.push(e),e.setAttribute(Za,""))}function Qa(){for(var e=0;e<Pr.length;e++){var r=Pr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Za)}Pr=[],fr&&typeof clearTimeout=="function"&&clearTimeout(fr),fr=null}function Li(e){if(nt){nt=!1,Qa(),e.preventDefault(),e.stopPropagation();return}for(var r=Pt(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Ja(e,n.trigger)||Ja(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Ri(e){if(e.key==="Escape")for(var r=Pt(),t=r.length-1;t>=0;t--)r[t].close()}function en(){$a||typeof document=="undefined"||(document.addEventListener("click",Li,!0),document.addEventListener("keydown",Ri),$a=!0)}function Ni(e){en(),nt=!0,Pi(e),fr&&typeof clearTimeout=="function"&&clearTimeout(fr),typeof setTimeout=="function"&&(fr=setTimeout(function(){nt=!1,Qa()},700))}function Lt(e){Ni(e)}function it(e){en();var r={trigger:e.trigger,element:e.element,close:e.close};return qe.push(r),{unregister:function(){var t=qe.indexOf(r);t!==-1&&qe.splice(t,1)},notifyOpening:function(){for(var t=Pt(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function ue(e){var r=e.widget,t=e.currentOrderBy,a=e.currentMediaFilter||"none",n=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=D(F&&F.writeButtonText,"Yorum Yap"),l.onclick=n,o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-filter-wrap";var d=document.createElement("button");d.type="button",d.className="renuvex-pr-filter-btn",d.setAttribute("aria-label","Filtrele"),d.setAttribute("aria-haspopup","menu"),d.setAttribute("aria-expanded","false");var m=F&&F.filterIcon||"lines";d.innerHTML=ce(ma(m));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var u=ta===!0?"media":"images",s=u==="media"?"Foto\u011Fraf ve Video":"Foto\u011Frafl\u0131",g=[{orderBy:"newest",label:"En Yeni",mediaFilter:"none"},{orderBy:"highest",label:"En Y\xFCksek Puan",mediaFilter:"none"},{orderBy:"lowest",label:"En D\xFC\u015F\xFCk Puan",mediaFilter:"none"},{orderBy:"newest",label:s,mediaFilter:u}],c=!1;function f(){return r&&r.parentNode||r||null}function b(S,R){if(!(R===!0||!S)){if(S.type==="touchstart"){Lt(f());return}if(S.type==="pointerdown"){var y=S.pointerType||"";y&&y!=="mouse"&&Lt(f())}}}function k(S){var R=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),d.classList.remove("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","false");var y=S&&(S.restoreFocus===!0||S.restoreFocus==="auto"&&Ne());if(R&&y)try{d.focus({preventScroll:!0})}catch(A){try{d.focus()}catch(w){}}return R}function E(){M.notifyOpening(),v.classList.add("renuvex-pr-open"),d.classList.add("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","true");var S=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");S&&requestAnimationFrame(function(){try{S.focus({preventScroll:!0})}catch(R){try{S.focus()}catch(y){}}})}g.forEach(function(S){var R=S.mediaFilter!=="none",y=R?a===S.mediaFilter:a==="none"&&(t||"newest")===S.orderBy,A=document.createElement("button");A.type="button",A.className="renuvex-pr-filter-item"+(y?" renuvex-pr-filter-item-active":""),A.setAttribute("role","menuitem"),A.textContent=S.label;var w=!1;function C(T,h){T&&(T.preventDefault(),T.stopPropagation()),!w&&(w=!0,c=!0,b(T,h),k({restoreFocus:h}),i(S.orderBy,S.mediaFilter),setTimeout(function(){w=!1,c=!1},0))}A.addEventListener("pointerdown",function(T){T.button!==void 0&&T.button!==0||T.pointerType!=="mouse"&&C(T,!1)}),typeof window!="undefined"&&!window.PointerEvent&&A.addEventListener("touchstart",function(T){C(T,!1)},{passive:!1}),A.addEventListener("keydown",function(T){(T.key==="Enter"||T.key===" ")&&C(T,!0)}),A.onclick=function(T){C(T,!1)},v.appendChild(A)}),d.onclick=function(){v.classList.contains("renuvex-pr-open")?k({restoreFocus:"auto"}):E()},p.addEventListener("keydown",function(S){S.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(S.stopPropagation(),k({restoreFocus:!0}))}),p.addEventListener("focusout",function(S){if(v.classList.contains("renuvex-pr-open")&&!c){var R=S.relatedTarget;R&&p.contains(R)||k()}});var M=it({trigger:p,element:v,close:k});return p.appendChild(d),p.appendChild(v),o.appendChild(p),o}var rn=`
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
`;function tn(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,a=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,n=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var p=document.createElement("button");p.className="renuvex-pr-fwizard-close",p.type="button",p.setAttribute("aria-label","Kapat");var d=re(Ee);d&&p.appendChild(d),o.appendChild(p);var m=!1,v=null,u=null,s=!1;function g(){fe(i)}function c(y){Qr(y,i,v&&v.root)}function f(){if(!m){if(m=!0,document.removeEventListener("keydown",b),i.removeEventListener("click",k),p.removeEventListener("click",f),s)fe(u);else{var y=v&&v.root?v.root.activeElement:null;if(y&&typeof y.blur=="function")try{y.blur()}catch(A){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(Vr(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):i.parentNode&&i.parentNode.removeChild(i),Jr();try{r()}catch(A){}},200)}}function b(y){if(y.key==="Escape"){f();return}c(y)}function k(y){y.target===i&&n&&f()}document.addEventListener("keydown",b),i.addEventListener("click",k),p.addEventListener("click",f);function E(y){u=t||Zr(),s=a===null?Ne():a,y&&l.appendChild(y),v=qr(),pr(v.root,dr+tr+rn),Kr(v.root,i),Ge(v.root),$r(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),g()})}var M=null,S=null;function R(y,A){if(A=A||"error",M){try{M.remove()}catch(w){}M=null}S&&(clearTimeout(S),S=null),M=document.createElement("div"),M.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+A,M.textContent=y,o.appendChild(M),S=setTimeout(function(){M&&(M.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(M){try{M.remove()}catch(w){}M=null}},300))},4e3)}return{open:E,close:f,content:l,setAllowOutsideClose:function(y){n=!!y},setStepAttr:function(y){o.setAttribute("data-step",String(y))},showToast:R}}var Rt=4;function xr(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function an(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoCapabilityStatus:e.videoCapabilityStatus||(e.videoEnabled===!0?"enabled":"unavailable"),videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(i){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Rt&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(i){return i!==n})}}}}function nn(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=ce(ar)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-footer-progress";for(var d=[],m=0;m<Rt;m++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",p.appendChild(v),d.push(v)}o.appendChild(p);var u=document.createElement("button");u.type="button";var s=null;function g(f){s&&u.removeEventListener("click",s),s=f,f&&u.addEventListener("click",f)}o.appendChild(u);function c(f,b){var k=r.indexOf(f)!==-1,E=t.indexOf(f)!==-1,M=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0||!!b.videoUpload);if(k)f===2&&M?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",g(function(){i()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",g(function(){n()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(E){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var S=xr(f,b);u.disabled=!S,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!S),g(function(){u.disabled||i()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,g(null)}return{el:o,update:function(f,b){d.forEach(function(E,M){M+1<=f?E.classList.add("renuvex-pr-fwizard-progress-seg-active"):E.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var k=f<=1;l.style.visibility=k?"hidden":"",l.style.pointerEvents=k?"none":"",l.tabIndex=k?-1:0,c(f,b)},setNextDisabled:function(f){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!f,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",p.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),g(f)}}}var Bi={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function xe(e){var r=F&&F[e];return!r&&e==="formStepMediaTitle"&&(r=F&&F.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=F&&F.formStepPhotosSubtitle),D(r,Bi[e])}function on(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=xe("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=Er(F||{});Ie(l);var p=[];function d(f){p.forEach(function(b,k){var E=k<f;b.classList.toggle("renuvex-pr-fwizard-star-active",E),b.setAttribute("aria-checked",k+1===f?"true":"false"),b.innerHTML=E?ve("full"):ve("outline")})}function m(f){e.set({rating:f}),d(f)}function v(f){var b=p[f-1];if(b)try{b.focus()}catch(k){}}function u(f,b){b&&typeof b.preventDefault=="function"&&b.preventDefault(),b&&typeof b.stopPropagation=="function"&&b.stopPropagation(),!a&&(a=!0,m(f),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(f){var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-star",b.setAttribute("role","radio"),b.setAttribute("aria-label",f+" y\u0131ld\u0131z"),b.innerHTML=ve("outline"),b.addEventListener("mouseenter",function(){d(f)}),b.addEventListener("mouseleave",function(){d(e.get().rating)}),b.addEventListener("pointerdown",function(k){k.button&&k.button!==0||u(f,k)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(k){u(f,k)},{passive:!1}),b.addEventListener("mousedown",function(k){window.PointerEvent||u(f,k)}),b.addEventListener("keydown",function(k){if(k.key==="Enter"||k.key===" "){u(f,k);return}var E=0;k.key==="ArrowRight"||k.key==="ArrowUp"?E=Math.min(5,f+1):k.key==="ArrowLeft"||k.key==="ArrowDown"?E=Math.max(1,f-1):k.key==="Home"?E=1:k.key==="End"&&(E=5),E&&(k.preventDefault(),m(E),v(E))}),b.addEventListener("click",function(k){u(f,k)}),p.push(b),o.appendChild(b)})(s);d(e.get().rating);var g=null,c=function(f){var b=f&&f.detail&&f.detail.settings;b&&b===g||(g=b||null,l=Er(b||F||{}),d(e.get().rating))};return window.addEventListener(je,c),t.appendChild(o),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(je,c)}}}var ot=3,Ii=10*1024*1024;function lt(e,r){r=r||{};var t=!1,a=r.hideAddButton===!0,n=r.revealAddButtonAfterMedia===!0,i=!a||n,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=xe("formStepPhotosTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=xe("formStepPhotosSubtitle"),o.appendChild(p)}var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&d.classList.add("renuvex-pr-fwizard-photo-card--embedded");var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add",m.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",i&&d.appendChild(m),d.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),d.appendChild(u),o.appendChild(d);var s=r.revokeBlobUrl||function(w){w&&typeof w=="string"&&w.startsWith("blob:")&&URL.revokeObjectURL(w)},g=r.blobMap||{},c=r.urlToFinger||{};function f(w){return typeof w=="string"?w:w&&typeof w=="object"&&(w.uploadSessionId||w.assetId||w.objectKey||w.previewUrl)||""}function b(w){if(typeof w=="string")return g[w]||w;if(w&&typeof w=="object"){var C=f(w);return g[C]||w.previewUrl||""}return""}function k(w){for(var C=new Uint8Array(w),T="",h=0;h<C.length;h+=32768){var z=C.subarray(h,h+32768);T+=String.fromCharCode.apply(null,Array.prototype.slice.call(z))}return btoa(T)}async function E(w){if(!window.crypto||!window.crypto.subtle)throw new Error("checksum_unavailable");return k(await window.crypto.subtle.digest("SHA-256",await w.arrayBuffer()))}function M(){if(!t){var w=e.get().images||[],C=e.get().pendingImages||[],T=w.map(function(h){return{url:f(h),image:h,isPending:!1}}).concat(C.map(function(h){return{url:h.url,file:h.file,isPending:!0,error:h.error}}));u.innerHTML="",T.forEach(function(h){var z=h.image?b(h.image):g[h.url]||h.url,B=S(h,z);u.appendChild(B)}),y()}}function S(w,C){var T=document.createElement("div");T.className="renuvex-pr-fwizard-photo-thumb";var h=document.createElement("img");h.src=C,h.alt="",h.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",T.appendChild(h);var z=document.createElement("div");z.className="renuvex-pr-fwizard-photo-loading",z.style.display="none",T.appendChild(z);var B=document.createElement("button");B.type="button",B.className="renuvex-pr-fwizard-photo-remove",B.setAttribute("aria-label","Kald\u0131r");var U=re(Ee);return U&&B.appendChild(U),T.appendChild(B),R(T,w,C),T}function R(w,C,T){var h=w.querySelector("img");h.src!==T&&(h.src=T);var z=w.querySelector(".renuvex-pr-fwizard-photo-loading");if(C.isPending&&C.error){z.style.display="flex",z.textContent="";var B=document.createElement("span");B.className="renuvex-pr-upload-error",B.textContent="\u2717 "+C.error,z.appendChild(B)}else z.style.display="none",z.textContent="";var U=w.querySelector(".renuvex-pr-fwizard-photo-remove");U.onclick=function(){var x=c[C.url]||(C.file?C.file.name+"_"+C.file.size:null),_=g[C.url],N={};x&&(N.fingerprints=(e.get().fingerprints||[]).filter(function(L){return L!==x})),C.isPending?N.pendingImages=(e.get().pendingImages||[]).filter(function(L){return L.url!==C.url}):N.images=(e.get().images||[]).filter(function(L){return f(L)!==C.url}),e.set(N),s(C.url),s(_),delete c[C.url],_&&delete c[_],g[C.url]&&delete g[C.url]}}function y(){var w=(e.get().images||[]).length,C=(e.get().pendingImages||[]).length,T=w+C,h=T>=ot;d.classList.toggle("renuvex-pr-fwizard-photo-card--compact",T>0),i&&(m.innerHTML=T>0?ce(xa):ce(Wr)+"<span>Foto\u011Fraf Ekle</span>"),h?(i&&(m.style.display="none"),m.disabled=!0,v.disabled=!0):(i&&(m.style.display=n&&T===0?"none":"flex"),m.disabled=!1,v.disabled=!1,m.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}m.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(w){var C=(e.get().images||[]).length+(e.get().pendingImages||[]).length,T=Array.from(w.target.files).slice(0,ot-C);v.value="";var h=(e.get().pendingImages||[]).length,z=e.get().images||[],B=z.length;if(T.length!==0){for(var U=[],x=[],_=0;_<T.length;_++){var N=T[_],L=N.name+"_"+N.size,V=(e.get().fingerprints||[]).some(function(O){return O===L})||U.some(function(O){return O.file.name+"_"+O.file.size===L});if(!V){if(N.size>Ii){var j="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(j,"error"):alert(j);continue}if(["image/jpeg","image/png","image/webp"].indexOf(N.type)===-1){var H="Sadece JPG, PNG veya WebP fotograf yukleyebilirsin.";r.showToast?r.showToast(H,"error"):alert(H);continue}var X=URL.createObjectURL(N);c[X]=L,U.push({url:X,file:N,error:null}),x.push({url:X,file:N});var W=(e.get().fingerprints||[]).slice();W.push(L),e.set({fingerprints:W})}}if(U.length!==0){var q=(e.get().pendingImages||[]).concat(U),I=async function(){for(var O=0;O<x.length;O++){var $=x[O],G=$.file,Y=$.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var J=(e.get().pendingImages||[]).filter(function(te){return te.url!==Y}),Z=(e.get().images||[]).slice();Z.push(Y),e.set({pendingImages:J,images:Z});continue}try{var Pe=await E(G),de=await Me(Ce+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:se,fileName:G.name||"review-image",contentType:G.type,bytes:G.size,checksumAlgorithm:"SHA256",checksumSha256:Pe})});if(!de.ok)throw de.status===429?new Error("rate_limit"):new Error("sign failed");var ae=await de.json();if(ae.provider==="aws_s3"){if(!ae.uploadUrl||!ae.fields||!ae.assetId||!ae.uploadSessionId||!ae.objectKey)throw new Error("sign fields missing");var Qe=new FormData;Object.keys(ae.fields).forEach(function(te){Qe.append(te,ae.fields[te])}),Qe.append("file",G);var Le=await fetch(ae.uploadUrl,{method:"POST",body:Qe});if(Le.status!==204)throw new Error("upload failed");var K=(e.get().pendingImages||[]).some(function(te){return te.url===Y});if(!K)continue;var Q={provider:"aws_s3",assetId:ae.assetId,uploadSessionId:ae.uploadSessionId,objectKey:ae.objectKey,contentType:G.type,bytes:G.size,checksumAlgorithm:"SHA256",checksumSha256:Pe,previewUrl:Y},he=await Me(Ce+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:se,provider:"aws_s3",assetId:Q.assetId,uploadSessionId:Q.uploadSessionId,objectKey:Q.objectKey,contentType:Q.contentType,bytes:Q.bytes,checksumAlgorithm:Q.checksumAlgorithm,checksumSha256:Q.checksumSha256})});if(!he.ok)throw new Error("register failed");var be=f(Q);g[be]=Y,c[be]=c[Y];var er=(e.get().pendingImages||[]).filter(function(te){return te.url!==Y}),De=(e.get().images||[]).slice();De.push(Q),e.set({pendingImages:er,images:De});continue}throw new Error("unsupported image provider")}catch(te){console.error("[renuvex-pr] Image upload failed:",te);var Ve=te.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Ve,"error");var rr=(e.get().pendingImages||[]).map(function(ne){return ne.url===Y?{url:ne.url,file:ne.file,error:Ve}:ne});e.set({pendingImages:rr})}}};if(B===0&&h===0){t=!0;var P=!r.canNavigate||r.canNavigate();P&&e.goNext()}e.set({pendingImages:q}),I()}}};var A=e.onChange(M);return M(),{el:o,openPicker:function(){v.disabled||v.click()},destroy:function(){t=!0,v.onchange=null,A&&A()}}}var Fi=150*1024*1024,Oi=2,Ui=60,sn=8192,vn=5,Hi=3e4,Di=["video/mp4","video/quicktime"],Vi="renuvex_pr_video_upload_",cn="renuvex_pr_video_cancel_",Lr=null,ln=!1,Yi={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},Wi={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},ze=class extends Error{constructor(r,t,a){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=a||null}};function mn(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:Yi[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:Wi[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function fn(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function Nt(e){return new Promise(function(r){setTimeout(r,e)})}function gr(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function hr(e){return Math.max(0,Math.round(gr()-e))}function Gi(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return Hi}function ji(e,r){return new Promise(function(t,a){var n=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(n),r&&r.removeEventListener("abort",o),a(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function Bt(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function It(e,r){return Vi+se+"_"+e+"_"+Bt(r)}function xn(e,r){try{var t=window.sessionStorage.getItem(It(e,r)),a=t?JSON.parse(t):null;return!a||typeof a.token!="string"||!a.expiresAt||new Date(a.expiresAt).getTime()<=Date.now()?null:a}catch(n){return null}}function Ki(e,r,t){try{window.sessionStorage.setItem(It(e,r),JSON.stringify(t))}catch(a){}}function Nr(e,r){try{window.sessionStorage.removeItem(It(e,r))}catch(t){}}function qi(e,r){return cn+se+"_"+e+"_"+Bt(r)}function Xi(e,r,t,a){if(!(!e||!r||!t)){var n={token:e,productId:r,expiresAt:a||null};try{window.sessionStorage.setItem(qi(r,t),JSON.stringify(n))}catch(i){}}}function $i(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(cn+se+"_")!==0)){var a=window.sessionStorage.getItem(t),n=a?JSON.parse(a):null;if(!n||typeof n.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:n.token})}}}catch(i){}return e}function dn(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function br(e,r,t){var a=await Me(Ce+e,r,t||2e4),n=await a.json().catch(function(){return{}});if(!a.ok){var i=Number(a.headers.get("Retry-After"));throw new ze(n.error||"video_request_failed",a.status,Number.isFinite(i)&&i>0?i:null)}return n.data||{}}async function Rr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await br("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:hr(r.startedAt),finalStatus:t})},4e3)}catch(a){}}async function Ji(e){try{return await br("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),dn(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(dn(e.key),!0):!1}}function dt(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():Lr||(Lr=(async function(){for(var e=$i(),r=0;r<e.length;r+=1)await Ji(e[r])})().finally(function(){Lr=null}),Lr)}function pt(){typeof window=="undefined"||ln||(ln=!0,window.addEventListener("online",function(){dt()}),dt())}async function Zi(){var e=await import("./upchunk-KBSCWYRQ.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function pn(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var Qi={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function eo(e){return Qi[e]!==!0}async function ro(e){var r=await Zi();return new Promise(function(t,a){var n=!1,i=null,o=null,l=Gi(),p=null;function d(g){n||(n=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",s),p&&p(),g?a(g):t())}function m(g){n||(o&&clearTimeout(o),!(!g&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!n){e.onUploadError&&e.onUploadError("video_upload_stalled"),d(new ze("video_upload_stalled",0,null));try{i&&i.abort()}catch(c){}}},l)))}function v(){return n?!1:(m(),!0)}function u(){if(!n){e.onUploadError&&e.onUploadError("video_upload_offline"),d(new ze("video_upload_offline",0,null));try{i&&i.abort()}catch(g){}}}function s(){try{i&&i.abort()}catch(g){}d(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return a(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",s,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||sn,attempts:e.chunkAttempts||vn,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",u),p=function(){window.removeEventListener("offline",u)}),typeof navigator!="undefined"&&navigator.onLine===!1){u();return}m(),i.on("attempt",function(){v()&&e.onStatus("uploading")}),i.on("attemptFailure",function(g){if(v()){var c=g&&g.detail,f=pn(c);if(e.onAttemptFailure&&e.onAttemptFailure(f),eo(f)){e.onUploadError&&e.onUploadError(f),d(new ze(f,0,null));try{i&&i.abort()}catch(b){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){v()}),i.on("progress",function(g){if(v()){var c=Number(g&&g.detail);if(Number.isFinite(c)){var f=Math.min(95,Math.max(0,Math.round(c*.95)));Number.isFinite(e.minProgress)&&(f=Math.max(e.minProgress,f)),e.onProgress(f)}}}),i.on("offline",u),i.on("error",function(g){if(v()){var c=g&&g.detail,f=pn(c);e.onUploadError&&e.onUploadError(f),d(new ze(f,0,null))}}),i.on("success",function(){v()&&(e.onProgress(95),d())})})}function to(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function un(e,r,t){for(var a=Date.now(),n=a+600*1e3,i=0;Date.now()<n;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-a;try{var l=await br("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new ze(l.errorCode||"video_processing_failed",409,null)}catch(p){if(r.aborted||p instanceof ze&&p.status===409||fn(p)||(i+=1,i>=3))throw p}await ji(to(o),r)}throw new ze("video_processing_delayed",0,null)}async function ao(e){for(var r=null,t=1;t<=3;t+=1)try{return await br("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(a){if(fn(a))return null;r=a,t<3&&await Nt(400*t)}throw r||new Error("video_status_failed")}async function no(e,r,t,a){for(var n=10;n<=90;n+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(n),await Nt(120)}return a("processing"),await Nt(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function gn(e){return!e||Di.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>Fi?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function hn(e){return new Promise(function(r){var t=URL.createObjectURL(e),a=document.createElement("video"),n=!1;function i(o){if(!n){n=!0,a.removeAttribute("src");try{a.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}a.preload="metadata",a.onloadedmetadata=function(){i(Number.isFinite(a.duration)?a.duration:null)},a.onerror=function(){i(null)},a.src=t,setTimeout(function(){i(null)},8e3)})}function bn(e){return e===null?{ok:!0}:e<Oi||e>Ui?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function yn(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return no(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:gr(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(g){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=g||"upload_attempt_failed")}function a(){Nr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function n(g,c){var f=await ao(g);if(!f)return{action:"discard"};if(f.status==="ready")return e.onToken&&e.onToken(g),e.onProgress(100),Nr(e.productId,e.file),await Rr(g,r,"ready"),{action:"return",value:Object.assign({token:g},f)};if(f.status==="uploaded"||f.status==="processing"){e.onToken&&e.onToken(g),e.onStatus("processing");var b=gr(),k=await un(g,e.signal,e.onStatus);return r.processingPollMs=hr(b),Nr(e.productId,e.file),e.onProgress(100),await Rr(g,r,"ready"),{action:"return",value:Object.assign({token:g},k)}}return f.status==="failed"||f.status==="aborted"?{action:"discard"}:!c||typeof c.uploadUrl!="string"||!c.uploadUrl?{action:"discard"}:{action:"upload"}}pt(),await dt();var i=xn(e.productId,e.file),o=i&&i.token,l=i;if(o){var p=await n(o,l);if(p.action==="return")return p.value;p.action==="discard"&&(a(),o=null,l=null)}for(;;){if(!o){var d=await br("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:se,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:Bt(e.file)})});o=d.token,l=d,Ki(e.productId,e.file,d)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||sn,r.chunkAttempts=l.chunkAttempts||vn,e.onStatus("uploading");var m=gr();try{await ro({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+hr(m),e.onStatus("processing");var v=gr();await br("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=hr(v);var u=gr(),s=await un(o,e.signal,e.onStatus);return r.processingPollMs=hr(u),Nr(e.productId,e.file),e.onProgress(100),await Rr(o,r,"ready"),Object.assign({token:o},s)}catch(g){throw r.directUploadMs=(r.directUploadMs||0)+hr(m),e.signal&&e.signal.aborted?(await Rr(o,r,"aborted"),g):(await Rr(o,r,"failed"),g)}}}async function ut(e,r,t){var a=r&&t?xn(r,t):null;e&&r&&t&&Xi(e,r,t,a&&a.expiresAt),r&&t&&Nr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(pt(),await dt())}function wn(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function io(e){return"Video Y\xFCkleniyor"}function oo(e){return!0}function kn(e,r){r=r||{};var t=!1,a=null,n=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=xe("formStepMediaTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=xe("formStepMediaSubtitle"),o.appendChild(p);var d=document.createElement("div");d.className="renuvex-pr-fwizard-media-card";var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",m.setAttribute("aria-label","Foto\u011Fraf ekle"),m.innerHTML=ce(Wr)+"<span>Foto\u011Fraf Ekle</span>";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",v.setAttribute("aria-label","Video ekle"),v.innerHTML=ce(nr)+"<span>Video Ekle</span>",d.appendChild(m),d.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-content",d.appendChild(u),o.appendChild(d);var s=document.createElement("input");s.type="file",s.accept="video/mp4,video/quicktime,.mp4,.mov",s.style.display="none",o.appendChild(s);function g(){var x=e.get();return(x.images||[]).length>0||(x.pendingImages||[]).length>0}function c(){var x=e.get();return(x.images||[]).length+(x.pendingImages||[]).length}function f(){return e.get().videoUpload||null}function b(){var x=e.get();return x.videoCapabilityStatus||(x.videoEnabled?"enabled":"unavailable")}function k(){return i+=1,i}function E(x,_){var N=f();return i===x&&!!N&&N.controller===_}function M(){if(!n){u.innerHTML="";return}n.retry.onclick=null,u.innerHTML="",n=null}function S(){a&&(a.destroy&&a.destroy(),a=null)}function R(x){S(),u.innerHTML="";var _=wn(x),N=document.createElement("div");N.className=_==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":_==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var L=null,V=null,j=null,H=null,X=document.createElement("button");if(X.type="button",X.className="renuvex-pr-fwizard-video-retry",X.textContent="Tekrar dene",X.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),_==="ready"){var W=x.posterUrl||x.localUrl||"";W&&W!==x.localUrl?(L=document.createElement("img"),L.alt="",L.src=W):(L=document.createElement("video"),L.muted=!0,L.playsInline=!0,L.preload="metadata",L.src=x.localUrl||""),L.className="renuvex-pr-fwizard-video-preview",N.appendChild(L)}else _==="busy"?(H=document.createElement("div"),H.className="renuvex-pr-fwizard-video-uploading-status",H.setAttribute("role","status"),H.setAttribute("aria-live","polite"),N.appendChild(H)):V=N;if(_==="ready"){let O=function($){$&&($.preventDefault(),$.stopPropagation()),h()};var P=O,q=document.createElement("button");q.type="button",q.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",q.setAttribute("aria-label","Videoyu kald\u0131r");var I=re(Ee);I&&q.appendChild(I),q.addEventListener("pointerdown",O),q.addEventListener("click",O),N.appendChild(q)}u.appendChild(N),n={mode:_,card:N,preview:L,previewUrl:_==="ready"&&(x.posterUrl||x.localUrl)||"",details:V,name:j,status:H,retry:X}}function y(){if(!t){var x=f();if(!x){M();return}var _=wn(x),N=_==="ready"&&(x.posterUrl||x.localUrl)||"";if((!n||n.mode!==_||n.previewUrl!==N)&&R(x),n.name&&(n.name.textContent=x.file?x.file.name:"Video"),n.status&&_==="busy"){var L=io(x),V=oo(x)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+L+"</span>":"<span>"+L+"</span>";n.status.innerHTML!==V&&(n.status.innerHTML=V)}var j=_==="failed"&&!!(x.error&&x.file&&x.retryable!==!1);n.retry.onclick=j?function(){T(x.file,x.localUrl,x.durationMs)}:null,j&&n.details&&!n.retry.isConnected?n.details.appendChild(n.retry):!j&&n.retry.isConnected&&n.retry.remove()}}function A(){var x=g(),_=c()>=ot,N=!!f(),L=x||N,V=b(),j=V==="pending",H=V==="unavailable";m.hidden=L,v.hidden=L||H,m.disabled=N||_,v.disabled=x||N||j,j&&!L?v.setAttribute("aria-busy","true"):v.removeAttribute("aria-busy"),d.classList.toggle("renuvex-pr-fwizard-media-card--has-media",L),d.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",x),d.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",N),m.classList.toggle("renuvex-pr-fwizard-media-action--active",x),v.classList.toggle("renuvex-pr-fwizard-media-action--active",N),v.classList.toggle("renuvex-pr-fwizard-media-action--pending",j&&!L)}function w(x){var _=f();if(_){var N=Object.keys(x),L=N.some(function(V){return _[V]!==x[V]});L&&e.set({videoUpload:Object.assign({},_,x)})}}function C(x,_,N){E(x,_)&&w(N)}async function T(x,_,N){var L=f(),V=!!(_&&L&&L.file===x),j=V?Math.max(0,Math.min(95,Number(L.progress)||0)):0,H=V?(Number(L.retryClicks)||0)+1:0,X=gn(x);if(!X.ok){r.showToast&&r.showToast(X.message,"error");return}var W=_||URL.createObjectURL(x),q=Number.isFinite(N)?N:null,I=new AbortController,P=k();e.set({videoUpload:{file:x,localUrl:W,token:V&&L.token||null,status:"uploading",progress:j,durationMs:q,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:H,controller:I}}),!V&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var O=N!==void 0?Number.isFinite(N)?N/1e3:null:await hn(x),$=bn(O);if(!$.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:$.message});var G=await yn({file:x,productId:e.get().productId,signal:I.signal,minProgress:j,retryClicks:H,onToken:function(Z){C(P,I,{token:Z})},onProgress:function(Z){C(P,I,{progress:Z})},onStatus:function(Z){C(P,I,{status:Z})},onSessionReset:function(){C(P,I,{token:null,progress:0})}});if(!E(P,I))return;if(G.previewOnly&&G.posterUrl&&G.posterUrl!==W)try{URL.revokeObjectURL(G.posterUrl)}catch(Z){}w({token:G.token,status:"ready",progress:100,posterUrl:G.previewOnly?W:G.posterUrl,durationMs:G.durationMs||(O===null?null:Math.round(O*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),V&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(Z){if(I.signal.aborted||!E(P,I))return;var Y=mn(Z);if(Z&&Z.code==="invalid_video_duration"&&(Y={code:"invalid_video_duration",message:Z.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),w({status:"failed",error:Y.message,errorCode:Y.code,retryable:Y.retryable,retryAfterSec:Y.retryAfterSec,controller:null}),r.showToast){var J=Y.code==="invalid_video_duration"?Y.message:"Video y\xFCklenemedi";r.showToast(J,"error")}}}function h(){var x=f();x&&(k(),x.controller&&x.controller.abort(),ut(x.token,e.get().productId,x.file),r.revokeBlobUrl&&r.revokeBlobUrl(x.localUrl),e.set({videoUpload:null}))}function z(x){if(a){x&&a.openPicker&&a.openPicker();return}n=null,u.innerHTML="",a=lt(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),u.appendChild(a.el),x&&a.openPicker&&a.openPicker()}m.onclick=function(){m.disabled||z(!0)},v.onclick=function(){v.disabled||(S(),u.innerHTML="",s.click())},s.onchange=function(){var x=s.files&&s.files[0];s.value="",x&&T(x,null,void 0)};var B=!!f(),U=e.onChange(function(){A();var x=!!f();(x||B)&&y(),B=x});return A(),g()&&z(!1),f()&&y(),{el:o,destroy:function(){t=!0,m.onclick=null,v.onclick=null,s.onchange=null,a&&a.destroy&&a.destroy(),U&&U()}}}var Ft=2e3,lo=60;function Sn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=xe("formStepContentTitle"),a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=lo,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Ft,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-char-counter",p.setAttribute("aria-live","polite"),i.appendChild(p);function d(){var v=l.value.length;p.textContent=v+"/"+Ft,p.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=Ft)}function m(){return xr(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),d(),t(m())}),a.appendChild(i),d(),setTimeout(function(){t(m())},0),{el:a,destroy:function(){}}}var po=40;function zn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=xe("formStepAuthorTitle"),n.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var p=document.createElement("label");p.className="renuvex-pr-fwizard-label",p.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.maxLength=po,d.setAttribute("aria-required","true"),d.value=e.get().author||"",l.appendChild(p),l.appendChild(d),o.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",m.appendChild(v),m.appendChild(u),o.appendChild(m);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var g=document.createElement("div");g.className="renuvex-pr-fwizard-msg",g.setAttribute("role","alert"),g.setAttribute("aria-live","assertive"),o.appendChild(g);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),n.appendChild(o);function f(){return xr(4,e.get())}function b(y){c.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent=y}function k(){c.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent="";var y=document.createElement("span");y.className="renuvex-pr-fwizard-video-dots",y.setAttribute("aria-hidden","true"),y.appendChild(document.createElement("span")),y.appendChild(document.createElement("span")),y.appendChild(document.createElement("span"));var A=document.createElement("span");A.textContent="Video Haz\u0131rlan\u0131yor",c.appendChild(y),c.appendChild(A)}function E(){var y=!f(),A=(e.get().pendingImages||[]).length,w=A>0,C=e.get().videoUpload,T=!!(C&&C.status==="failed"),h=!!(C&&C.status!=="ready"&&C.status!=="failed");w||h||T?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),T?b("Video Y\xFCklenemedi"):h?k():b("Foto\u011Fraflar Y\xFCkleniyor...")):(c.disabled=y,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",y),b("G\xF6nder"))}d.addEventListener("input",function(){e.set({author:d.value}),E(),t(f())}),u.addEventListener("input",function(){e.set({email:u.value})}),E(),setTimeout(function(){t(f())},0);function M(){g.textContent=""}function S(y){M();var A=document.createElement("div");A.className="renuvex-pr-fwizard-msg-error",A.textContent=y||"",g.appendChild(A)}c.onclick=async function(){if(!c.disabled){var y=e.get(),A=(y.author||"").trim(),w=(y.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!A){S("Gerekli alan");return}if(!y.rating){S("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var C=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",M(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){y.videoUpload&&y.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a()},600);return}try{var T=ga(window.location.href),h=y.productName||null,z=await Me(Ce+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:se,productId:y.productId||null,slug:T||null,productName:h,author:A,title:(y.title||"").trim()||null,comment:w||null,rating:y.rating,images:y.videoUpload?[]:y.images||[],videoToken:y.videoUpload&&y.videoUpload.status==="ready"?y.videoUpload.token:null})},15e3);if(z.ok)y.videoUpload&&y.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a();else{var B=await z.json().catch(function(){return{}});throw new Error(B.error||"Yorum kaydedilemedi.")}}catch(_){var U=_&&(_.name==="AbortError"||/signal/i.test(_.message||"")),x=U?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":_.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(x,"error"):S(x),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=C}}};var R=e.onChange(E);return{el:n,destroy:function(){c.onclick=null,R&&R()}}}function Tn(e){return!!(e&&e.videoEnabled===!0&&e.videoCapabilityStatus!=="unavailable")}function Cn(e,r){return e===2?Tn(r)?"2:media":"2:photos":String(e)}function uo(e,r,t){if(t=t||{},e===1)return on(r,{canNavigate:t.canNavigate});if(e===2&&Tn(r.get()))return kn(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return lt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Sn(r,{onValidityChange:t.onValidityChange});if(e===4)return zn(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function En(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function An(e){e=e||{},pt();var r=!1,t=an({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:F&&F.videoReviewsEnabled===!0,videoCapabilityStatus:e.videoCapabilityStatus,videoUnavailableReason:e.videoUnavailableReason||null}),a={},n={},i={};function o(h){if(!(!h||typeof h!="string"||!h.startsWith("blob:")||i[h])){i[h]=!0;try{URL.revokeObjectURL(h)}catch(z){}}}function l(){Object.keys(n).forEach(function(z){o(z)}),Object.keys(a).forEach(function(z){o(a[z])});var h=t.get();(h.pendingImages||[]).forEach(function(z){o(z&&z.url)}),(h.images||[]).forEach(function(z){o(z)}),h.videoUpload&&o(h.videoUpload.localUrl)}function p(){var h=t.get(),z=h.videoUpload;!z||h.videoSubmitted||(z.controller&&z.controller.abort(),ut(z.token,h.productId,z.file))}var d=tn({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){r=!0,window.removeEventListener("popstate",v),rt(m),p(),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),m=et(),v=function(h){d&&d.close&&d.close()};window.addEventListener("popstate",v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-step-wrap";var s=nn({skippableSteps:[2],nextableSteps:[3],onBack:function(){f==="idle"&&t.goBack()},onSkip:function(){f==="idle"&&t.goNext()},onNext:function(){f==="idle"&&t.goNext()}}),g=document.createElement("div");g.className="renuvex-pr-fwizard-layout",g.appendChild(u),g.appendChild(s.el);var c=null,f="idle",b=null,k=!0,E=null;function M(h,z){u.innerHTML="";var B=uo(h,t,{canNavigate:function(){return f==="idle"},blobMap:a,urlToFinger:n,revokeBlobUrl:o,onValidityChange:function(_){s.setNextDisabled(!_)},onSuccess:R,showToast:d.showToast});if(c=B,s.update(h,t.get()),z){f="entering",B.el.classList.add("renuvex-pr-fwizard-step--enter");var U=null,x=function(){U&&clearTimeout(U),B.el.removeEventListener("animationend",x),B.el.classList.remove("renuvex-pr-fwizard-step--enter"),f="idle",b!==null&&y()};B.el.addEventListener("animationend",x),U=setTimeout(x,700)}else f="idle";u.appendChild(B.el),d.setStepAttr&&d.setStepAttr(h),h===3&&s.setNextDisabled(!0)}var S=!1;function R(){if(!S){if(S=!0,!c){u.innerHTML="";var h=En();h.classList.add("renuvex-pr-fwizard-step--enter"),u.appendChild(h),d.setStepAttr("thanks"),s.setThanksState(d.close);return}var z=c;f="exiting",z.el.classList.add("renuvex-pr-fwizard-step--exit");var B=function(){if(E&&clearTimeout(E),z.el.removeEventListener("animationend",B),z.destroy)try{z.destroy()}catch(x){}c===z&&(c=null),u.innerHTML="";var U=En();U.classList.add("renuvex-pr-fwizard-step--enter"),u.appendChild(U),d.setStepAttr("thanks"),s.setThanksState(d.close),f="idle"};z.el.addEventListener("animationend",B),E=setTimeout(B,300)}}function y(){var h=t.get().currentStep;if(f!=="idle"){b=h;return}if(!c){var z=!k;k=!1,M(h,z);return}var B=c;f="exiting",B.el.classList.add("renuvex-pr-fwizard-step--exit");var U=function(){if(E&&clearTimeout(E),B.el.removeEventListener("animationend",U),B.destroy)try{B.destroy()}catch(_){}if(c===B){u.innerHTML="",c=null;var x=b!==null?b:t.get().currentStep;b=null,M(x,!0),f="idle"}};B.el.addEventListener("animationend",U),E=setTimeout(U,350)}y();var A=t.get().currentStep,w=Cn(A,t.get()),C=t.onChange(function(h){var z=Cn(h.currentStep,h);h.currentStep!==A||z!==w?(A=h.currentStep,w=z,y()):s.update(h.currentStep,h)}),T=d.close;return d.close=function(){C&&C(),typeof E!="undefined"&&E&&clearTimeout(E),T()},d.open(g),{close:d.close,setVideoCapability:function(h){if(!r){var z=!!(h&&h.enabled===!0);t.set({videoEnabled:z,videoCapabilityStatus:z?"enabled":"unavailable",videoUnavailableReason:h&&h.reason?h.reason:null})}}}}var so=4e3;async function Mn(){var e=await Me(Ce+"/api/public/upload/video/capability?storeId="+encodeURIComponent(se),{method:"GET",cache:"no-store"},so);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),a=t&&t.data;if(!a||typeof a.enabled!="boolean"){var n=new Error("video_capability_invalid");throw n.code="video_capability_invalid",n}return{enabled:a.enabled===!0,reason:typeof a.reason=="string"?a.reason:null}}var Xe=null;function _n(){return F&&F.videoReviewsEnabled===!0}function vo(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return _n()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function co(e,r,t,a){var n=An({productId:ee||"",productName:Ye||"",videoEnabled:t,videoCapabilityStatus:a,videoUnavailableReason:null,returnFocusElement:e,openedByKeyboard:r,onClose:function(){Xe===n&&(Xe=null)}});return Xe=n,n}function mo(e){Mn().then(function(r){Xe===e&&e&&e.setVideoCapability&&e.setVideoCapability(r)}).catch(function(r){Xe===e&&e&&e.setVideoCapability&&e.setVideoCapability(vo(r))})}function le(e){if(Xe)return Xe;var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=_n(),a=typeof window!="undefined"&&window.__ikasPreviewMode,n=t?a?"enabled":"pending":"unavailable",i=co(r,Ne(),t,n);return t&&!a&&mo(i),i}var fo="bu \xFCr\xFCn\xFC tavsiye ediyor";function yr(e,r){var t=(e[3]||0)+(e[4]||0);return r>0?Math.round(t/r*100):0}function wr(e,r){var t=document.createElement("div");t.className="renuvex-pr-summary-block renuvex-pr-summary-recommend";var a=document.createElement("span");return a.className="renuvex-pr-recommend-pct",a.textContent="%"+r,t.appendChild(a),t.appendChild(document.createTextNode(" "+D(e&&e.recommendationLabel,fo))),t}var Pn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var xo={id:"classic",name:"Klasik (A\xE7\u0131k)"},go=Pn;function ho(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,d=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,u=e.onSortChange;Ie(n);var s=document.createElement("div");s.className="renuvex-pr-summary";var g=yr(o,i),c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-avg",c.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ve("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",s.appendChild(c);var f=document.createElement("div");return f.className="renuvex-pr-summary-block renuvex-pr-summary-count",f.textContent=i.toLocaleString("tr-TR")+" "+D(a.countLabel,"Yorum"),s.appendChild(f),a.showRecommendation!==!1&&g>0&&s.appendChild(wr(a,g)),s.appendChild(mr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:p,onFilterChange:v})),s.appendChild(ue({widget:r,currentOrderBy:d,currentMediaFilter:m,onWriteClick:le,onSortChange:u})),s}var Ut={};Re(Ut,{css:()=>yo,meta:()=>bo,render:()=>zo});var Ln=`
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
`;var bo={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},yo=Ln,wo="__unknown_product__",Br=Object.create(null);function ko(e){return e?String(e):wo}var $e=null,Ir=null;function So(){!$e||!Ir||($e.removeEventListener?$e.removeEventListener("change",Ir):$e.removeListener&&$e.removeListener(Ir),$e=null,Ir=null)}function zo(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,d=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,u=e.onSortChange,s=ko(t),g=document.createElement("div");g.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var f=document.createElement("div");f.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Fe(l,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+ce(fa)+"</span>";var k=b.querySelector(".renuvex-pr-compact-trigger-text"),E=b.querySelector(".renuvex-pr-compact-chevron");if(k&&(k.textContent=i.toLocaleString("tr-TR")+" "+D(a.countLabel,"Yorum")),k&&E){var M=document.createElement("span");M.className="renuvex-pr-compact-trigger-count",b.insertBefore(M,k),M.appendChild(k),M.appendChild(E)}f.appendChild(b),c.appendChild(f);var S=ue({widget:r,currentOrderBy:d,currentMediaFilter:m,onWriteClick:le,onSortChange:u}),R=S.querySelector(".renuvex-pr-filter-wrap"),y=S.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-compact-actions-slot",y&&A.appendChild(y),R&&A.appendChild(R),c.appendChild(A),g.appendChild(c);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),w.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="renuvex-pr-compact-panel-inner";var T=document.createElement("div");T.className="renuvex-pr-compact-avg",T.innerHTML='<span class="renuvex-pr-icon">'+ve("full")+"</span><span>"+l+"</span>",C.appendChild(T),C.appendChild(mr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:p,onFilterChange:function(P){z()&&w.classList.contains("renuvex-pr-open")&&(Br[s]=!0),v(P)}})),w.appendChild(C);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(){return!!(h&&h.matches)}function B(P){P?w.classList.add("renuvex-pr-open"):w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden",P?"false":"true"),b.setAttribute("aria-expanded",P?"true":"false")}function U(P){var O=P?g:f;if(w.parentNode!==O){var $=!!w.parentNode;w.classList.contains("renuvex-pr-open")&&B(!1),$&&(Br[s]=!1),O.appendChild(w)}}U(h?h.matches:!1);var x=ue({widget:r,currentOrderBy:d,currentMediaFilter:m,onWriteClick:le,onSortChange:u}),_=x.querySelector(".renuvex-pr-filter-wrap"),N=x.querySelector(".renuvex-pr-write-btn"),L=document.createElement("div");L.className="renuvex-pr-compact-write-row",N&&L.appendChild(N),_&&L.appendChild(_),g.appendChild(L);function V(){var P=w.classList.contains("renuvex-pr-open");return B(!1),z()&&(Br[s]=!1),P}function j(){H&&H.notifyOpening(),B(!0),z()&&(Br[s]=!0)}b.onclick=function(){w.classList.contains("renuvex-pr-open")?V():j()};var H=null;function X(P){H&&(H.unregister(),H=null),P||(H=it({trigger:f,element:w,close:V}))}if(X(h?h.matches:!1),So(),h){var W=function(P){U(P.matches),X(P.matches)};h.addEventListener?h.addEventListener("change",W):h.addListener&&h.addListener(W),$e=h,Ir=W}if(z()&&Br[s]&&B(!0),a.showRecommendation!==!1){var q=yr(o,i);if(q>0){var I=wr(a,q);I.style.marginTop="8px",C.appendChild(I)}}return g}var Ht={};Re(Ht,{css:()=>Eo,meta:()=>Co,render:()=>To});var Rn=`
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
`;var Co={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Eo=Rn;function To(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,p=e.currentOrderBy,d=e.currentMediaFilter,m=e.onFilterChange,v=e.onSortChange;Ie(a);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",g.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ve("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(g);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" "+D(t.countLabel,"Yorum"),s.appendChild(c),u.appendChild(s);var f=document.createElement("div");f.className="renuvex-pr-split-col renuvex-pr-split-mid",f.appendChild(mr({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:l,onFilterChange:m})),u.appendChild(f);var b=ue({widget:r,currentOrderBy:p,currentMediaFilter:d,onWriteClick:le,onSortChange:v}),k=b.querySelector(".renuvex-pr-filter-wrap"),E=b.querySelector(".renuvex-pr-write-btn"),M=document.createElement("div");M.className="renuvex-pr-split-col renuvex-pr-split-right",E&&M.appendChild(E),k&&M.appendChild(k),u.appendChild(M);var S=yr(i,n),R=wr(t,S),y=t.showRecommendation===!1||S===0;return y&&R.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(R),u}var Dt={};Re(Dt,{css:()=>Mo,meta:()=>Ao,render:()=>_o});var Nn=`
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
`;var Ao={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Mo=Nn;function _o(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,p=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var m=document.createElement("div");m.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var u=document.createElement("span");u.className="renuvex-pr-minimal-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=Fe(i,a),v.appendChild(s);var g=document.createElement("span");g.className="renuvex-pr-minimal-count",g.textContent=n.toLocaleString("tr-TR")+" "+D(t.countLabel,"Yorum"),v.appendChild(g),m.appendChild(v),d.appendChild(m);var c=ue({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:le,onSortChange:p}),f=c.querySelector(".renuvex-pr-filter-wrap"),b=c.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-minimal-actions",b&&k.appendChild(b),f&&k.appendChild(f),d.appendChild(k);var E=ue({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:le,onSortChange:p}),M=E.querySelector(".renuvex-pr-filter-wrap"),S=E.querySelector(".renuvex-pr-write-btn"),R=document.createElement("div");return R.className="renuvex-pr-minimal-write-row",S&&R.appendChild(S),M&&R.appendChild(M),d.appendChild(R),d}var Vt={};Re(Vt,{css:()=>Lo,meta:()=>Po,render:()=>Ro});var Bn=`
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
`;var Po={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Lo=Bn;function Ro(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,p=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var m=document.createElement("div");m.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var u=document.createElement("span");u.className="renuvex-pr-hero-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var g=document.createElement("span");g.className="renuvex-pr-hero-stars",g.innerHTML=Fe(i,a),s.appendChild(g);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=n.toLocaleString("tr-TR")+" "+D(t.countLabel,"Yorum"),s.appendChild(c),v.appendChild(s),m.appendChild(v),d.appendChild(m);var f=ue({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:le,onSortChange:p}),b=f.querySelector(".renuvex-pr-filter-wrap"),k=f.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",k&&E.appendChild(k),b&&E.appendChild(b),d.appendChild(E);var M=ue({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:le,onSortChange:p}),S=M.querySelector(".renuvex-pr-filter-wrap"),R=M.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");return y.className="renuvex-pr-hero-write-row",R&&y.appendChild(R),S&&y.appendChild(S),d.appendChild(y),d}var In=`
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

  .renuvex-pr-summary-count{font-size:var(--renuvex-pr-review-count-size,16px);color:var(--renuvex-pr-header-count,#111111);white-space:normal;font-weight:400;max-width:100%;width:auto;overflow-wrap:anywhere;word-break:break-word;line-height:1.2;text-align:center;}

  .renuvex-pr-summary-recommend{display:block;font-size:var(--renuvex-pr-recommend-size,14px);color:var(--renuvex-pr-header-recommend,#111111);text-align:center;max-width:100%;width:auto;overflow-wrap:anywhere;word-break:break-word;}
  .renuvex-pr-recommend-pct{font-weight:700;color:var(--renuvex-pr-header-recommend,#111111);margin-right:3px;}

  @media(max-width:600px){
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:48px;}
  }
`;var st={classic:Ot,compact:Ut,split:Ht,minimal:Dt,hero:Vt};function vt(e){return st[e]||st.classic}function Fn(){var e=Object.keys(st).map(function(r){return st[r].css||""}).join(`
`);return In+`
`+e}var Yt={};Re(Yt,{css:()=>Io,meta:()=>Bo,render:()=>Fo});function No(e){var r=Number(e);return Number.isFinite(r)&&r>0?Math.round(r):0}function ct(){for(var e=0;e<arguments.length;e++){var r=No(arguments[e]);if(r)return r}return 0}function He(e,r){r=r||{};var t=ct(r.sourceWidth,me),a=ct(r.sourceHeight,t),n=ct(r.displayWidth,ye),i=ct(r.displayHeight,ir),o=e&&e.type==="video"?{width:t,height:a,fit:"crop"}:null,l=o?lr(e.posterUrl,o):Sa(e);if(!l)return null;var p=document.createElement("img"),d=e.type==="image"?Ar(e,t):{src:l,srcset:jr(e.posterUrl,o)};if(p.src=d.src,d.srcset&&(p.srcset=d.srcset),p.loading=r.loading||"lazy",p.decoding="async",e.type==="image"){var m=wa(e);m&&p.setAttribute("data-renuvex-img-url",m)}if(p.width=n,p.height=i,p.alt="",Tr(p),e.type!=="video")return p.className=r.className||"",cr(p,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),p;var v=document.createElement("button");v.type="button",v.className=(r.className||"")+" renuvex-pr-media-video-thumb",p.className="renuvex-pr-media-poster",v.appendChild(p);var u=document.createElement("span");u.className="renuvex-pr-media-play";var s=re(nr);return s&&u.appendChild(s),v.appendChild(u),cr(v,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),v}function kr(e,r,t){var a=t||{},n=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,n.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",n.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:i,readMore:o}}function Sr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=D(F&&F.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var On=`
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
`;var Bo={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Io=On;function Fo(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=Te(e.rating,F),n.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=Ae(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-author",p.textContent=e.author||"",t.appendChild(p);var d=(e.comment||"").trim();d&&t.appendChild(kr(d,"renuvex-pr-body").fragment);var m=Ue(e);if(m.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",m.forEach(function(s){var g=He(s,{className:"renuvex-pr-img",sourceWidth:me,sourceHeight:me,displayWidth:ye,displayHeight:ir,onOpen:function(){ge(e,s.url,r)}});g&&v.appendChild(g)}),t.appendChild(v)}var u=Sr(e.merchantReply);return u&&t.appendChild(u),t}var Wt={};Re(Wt,{css:()=>Uo,meta:()=>Oo,render:()=>Ho});var Un=`
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
`;var Oo={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Uo=Un;function Ho(e,r){var t=Ue(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=Te(e.rating,F),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var p=document.createElement("time");p.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=Ae(e.createdAt),i.appendChild(p),n.appendChild(i);var d=document.createElement("div");if(d.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,d.appendChild(m)}var v=(e.comment||"").trim();v&&d.appendChild(kr(v,"renuvex-pr-review-list-body").fragment);var u=Sr(e.merchantReply);if(u&&d.appendChild(u),n.appendChild(d),a){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(g){var c=He(g,{sourceWidth:me,sourceHeight:Math.round(me*4/3),displayWidth:ye,displayHeight:or,onOpen:function(){ge(e,g.url,r)}});c&&s.appendChild(c)}),n.appendChild(s)}return n}var Gt={};Re(Gt,{css:()=>Vo,meta:()=>Do,render:()=>Yo});var Hn=`
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
`;var Do={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Vo=Hn;function Yo(e,r){var t=we(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=Te(e.rating,F),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-review-gallery-author",p.textContent=e.author||"",i.appendChild(p);var d=document.createElement("time");d.className="renuvex-pr-review-gallery-date",d.style.display="block",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=Ae(e.createdAt),i.appendChild(d);var m=(e.comment||"").trim();if(m&&i.appendChild(kr(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ge(e,t.url,r)}}:null).fragment),n.appendChild(i),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var u=He(t,{sourceWidth:kt,sourceHeight:Math.round(kt*4/3),displayWidth:ye,displayHeight:or,onOpen:function(){ge(e,t.url,r)}});u&&v.appendChild(u),n.appendChild(v)}var s=Sr(e.merchantReply,t?function(){ge(e,t.url,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(s)),n}var mt={card:Yt,list:Wt,gallery:Gt};function ft(e){return mt[e]||mt.card}function Dn(){return Object.keys(mt).map(function(e){return mt[e].css||""}).join(`
`)}var jt=0;function Je(){return jt++,jt}function Ze(e,r){return e!==jt?!1:r?!(r.productId!==void 0&&ee!==r.productId||r.orderBy!==void 0&&ie!==r.orderBy||r.page!==void 0&&Cr!==r.page||r.ratingFilter!==void 0&&pe!==r.ratingFilter||r.mediaFilter!==void 0&&oe!==r.mediaFilter||r.nextCursor!==void 0&&Fr!==r.nextCursor):!0}var Kt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,mediaGalleryTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,mediaGalleryTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,mediaGalleryTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},qt={small:80,medium:110,large:140},Xt={small:80,medium:100,large:110};function Vn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),a.appendChild(n),a.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(l),r}function Yn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var a=document.createElement("div");a.className="renuvex-pr-empty-state-stars",a.innerHTML=Fe(0,e.iconPair),t.appendChild(a);var n=document.createElement("p");n.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(n),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function Wn(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Gn(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function _e(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+a+","+n+","+i+","+r+")"}function xt(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function $t(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function jn(e){return .2126*$t(e.r)+.7152*$t(e.g)+.0722*$t(e.b)}function Kn(e,r){var t=jn(e),a=jn(r),n=Math.max(t,a),i=Math.min(t,a);return(n+.05)/(i+.05)}function Wo(e){var r=xt(e)||xt("#ffffff"),t=xt("#111111"),a=xt("#ffffff");return Kn(t,r)>=Kn(a,r)?"#111111":"#ffffff"}function Go(e){return _e(e,e==="#ffffff"?.1:.06)}function qn(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",p=r.barCountColor||"#111111",d=_e(o,.06),m=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",g=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",k=r.filterMenuBorderColor||"#e5e7eb",E=r.filterItemTextColor||"#111111",M=r.filterItemHoverBgColor||"#f3f4f6",S=r.filterItemActiveColor||"#111111",R=r.reviewTitleColor||"#111111",y=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",w=r.reviewBodyColor||"#111111",C=r.reviewBorderColor||"#e5e7eb",T=_e(w,.65),h=r.replyBgColor||"#f9fafb",z=r.replyBorderColor||"#747474",B=r.replyLabelColor||"#111111",U=r.replyTextColor||"#111111",x=r.mediaGalleryTitleColor||"#111111",_=_e("#111111",.05),N=r.mediaGalleryArrowBgColor||"#ffffff",L=r.mediaGalleryArrowTextColor||"#111111",V=_e("#111111",.12),j=r.reviewLightboxVideoIconColor||"#ffffff",H=r.reviewLightboxVideoProgressColor||"#ffffff",X=r.reviewLightboxVideoProgressTrackColor||"#000000",W=r.formBgColor||"#ffffff",q=r.formPrimaryTextColor||"#111111",I=r.formSecondaryTextColor||"#3b3b3b",P=r.inputTextColor||q,O=r.inputBorderColor||"#d1d5db",$=r.placeholderColor||"#9ca3af",G=r.formStepBarColor||"#111111",Y=r.formBtnBgColor||"#111111",J=r.formBtnTextColor||"#ffffff",Z=r.formBtnBorderColor||"#111111",Pe=_e(Y,.06),de=_e(Y,.18),ae=_e(J,.85),Qe=_e(q,.06),Le=Wo(W),K=Go(Le),Q=r.loadMoreBgColor||"#ffffff",he=r.loadMoreTextColor||"#111111",be=r.loadMoreBorderColor||"#111111",er=r.paginationBgColor||"#ffffff",De=r.paginationTextColor||"#111111",Ve=r.paginationBorderColor||"#e5e7eb",rr=r.paginationActiveBgColor||"#111111",te=r.paginationActiveTextColor||"#ffffff",ne={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":p,"--renuvex-pr-bar-hover-bg":d,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":g,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":f,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":k,"--renuvex-pr-filter-item-text":E,"--renuvex-pr-filter-item-hover-bg":M,"--renuvex-pr-filter-item-active":S,"--renuvex-pr-review-title":R,"--renuvex-pr-review-author":y,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":w,"--renuvex-pr-review-border":C,"--renuvex-pr-state-text":T,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":h,"--renuvex-pr-reply-border":z,"--renuvex-pr-reply-label":B,"--renuvex-pr-reply-text":U,"--renuvex-pr-media-gallery-title":x,"--renuvex-pr-media-gallery-image-border":_,"--renuvex-pr-media-gallery-arrow-bg":N,"--renuvex-pr-media-gallery-arrow-text":L,"--renuvex-pr-media-gallery-arrow-border":V,"--renuvex-pr-review-lightbox-video-icon":j,"--renuvex-pr-review-lightbox-video-progress":H,"--renuvex-pr-review-lightbox-video-progress-track":X,"--renuvex-pr-fwizard-bg":W,"--renuvex-pr-fwizard-text":q,"--renuvex-pr-fwizard-secondary-text":I,"--renuvex-pr-fwizard-input-bg":W,"--renuvex-pr-fwizard-input-text":P,"--renuvex-pr-fwizard-input-border":O,"--renuvex-pr-fwizard-placeholder":$,"--renuvex-pr-fwizard-close-text":Le,"--renuvex-pr-fwizard-close-hover-bg":K,"--renuvex-pr-fwizard-progress-bg":Qe,"--renuvex-pr-fwizard-progress-active":G,"--renuvex-pr-fwizard-btn-bg":Y,"--renuvex-pr-fwizard-btn-text":J,"--renuvex-pr-fwizard-btn-border":Z,"--renuvex-pr-fwizard-btn-disabled-bg":de,"--renuvex-pr-fwizard-btn-disabled-text":ae,"--renuvex-pr-fwizard-nav-hover-bg":Pe,"--renuvex-pr-load-more-bg":Q,"--renuvex-pr-load-more-text":he,"--renuvex-pr-load-more-border":be,"--renuvex-pr-pagination-bg":er,"--renuvex-pr-pagination-text":De,"--renuvex-pr-pagination-border":Ve,"--renuvex-pr-pagination-active-bg":rr,"--renuvex-pr-pagination-active-text":te};Object.keys(ne).forEach(function(zr){e.style.setProperty(zr,ne[zr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Xn(e){var r=e.settings||{},t=e.root,a=e.currentMediaFilter||"none";if(!(r.showMediaGallery!==!1&&a==="none"))return null;var n=document.createElement("div");n.className="renuvex-pr-media-gallery-section renuvex-pr-media-gallery-section--placeholder",n.setAttribute("aria-hidden","true");var i=r.reviewLayout==="card"?"1/1":"3/4";if(t&&t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",i),r.showMediaGalleryTitle!==!1){var o=document.createElement("div");o.className="renuvex-pr-media-gallery-title",o.textContent=D(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),n.appendChild(o)}var l=document.createElement("div");l.className="renuvex-pr-media-gallery-strip-wrap";var p=document.createElement("div");p.className="renuvex-pr-media-gallery-strip";var d=document.createElement("div");return d.className="renuvex-pr-media-gallery-thumb renuvex-pr-media-gallery-thumb--placeholder",p.appendChild(d),l.appendChild(p),n.appendChild(l),n}function Jt(e){var r=e.settings,t=e.root,a=e.currentMediaFilter||"none",n=e.openReviewModal,i=(e.mediaStripReviews||[]).filter(function(M){return Ue(M).length>0});if(!(r.showMediaGallery!==!1&&a==="none"&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-media-gallery-section",r.showMediaGalleryTitle!==!1){var l=D(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),p=document.createElement("div");p.className="renuvex-pr-media-gallery-title",p.textContent=l,o.appendChild(p)}var d=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",d);var m=document.createElement("div");m.className="renuvex-pr-media-gallery-strip";var v=me,u=r.reviewLayout==="card"?me:Math.round(me*4/3),s=r.reviewLayout==="card"?ir:or,g=0;i.forEach(function(M){if(!(g>=15)){var S=we(M);if(S){var R=He(S,{className:"renuvex-pr-media-gallery-thumb",sourceWidth:v,sourceHeight:u,displayWidth:ye,displayHeight:s,loading:g<3?"eager":"lazy",onOpen:function(){n(M,S.url,i,{source:"mediaGallery"})}});R&&(m.appendChild(R),g++)}}});var c=document.createElement("button");c.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-prev";var f=re(ar);f&&c.appendChild(f),c.setAttribute("aria-label","\xD6nceki"),c.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var b=document.createElement("button");b.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-next";var k=re(Yr);k&&b.appendChild(k),b.setAttribute("aria-label","Sonraki"),b.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var E=document.createElement("div");return E.className="renuvex-pr-media-gallery-strip-wrap",E.appendChild(c),E.appendChild(m),E.appendChild(b),o.appendChild(E),o}var jo=1,Ko=7,Zt="\u2026";function qo(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=Ko){for(var n=[],i=1;i<=t;i++)n.push(i);return n}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-a)<=jo)&&o.push(l);for(var p=[],d=0;d<o.length;d++)d>0&&o[d]-o[d-1]>1&&p.push(Zt),p.push(o[d]);return p}function $n(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},n=document.createElement("nav");n.className="renuvex-pr-pagination",n.setAttribute("aria-label","Yorum sayfalar\u0131");function i(p){n.setAttribute("aria-busy","true");for(var d=n.querySelectorAll("button"),m=0;m<d.length;m++)d[m].disabled=!0;a(p)}function o(p,d){var m=document.createElement("span");m.className="renuvex-pr-pagination-label",m.setAttribute("aria-hidden","true"),m.textContent=d,p.appendChild(m)}function l(p,d,m,v){var u=document.createElement("button");return u.type="button",u.className="renuvex-pr-pagination-arrow",u.setAttribute("aria-label",p),o(u,d),v?u.disabled=!0:u.onclick=function(){i(m)},u}return n.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),qo(t,r).forEach(function(p){if(p===Zt){var d=document.createElement("span");d.className="renuvex-pr-pagination-gap",d.setAttribute("aria-hidden","true"),d.textContent=Zt,n.appendChild(d);return}var m=document.createElement("button");m.type="button",m.className="renuvex-pr-pagination-btn",m.setAttribute("aria-label","Sayfa "+p),o(m,String(p)),p===t?m.setAttribute("aria-current","page"):m.onclick=function(){i(p)},n.appendChild(m)}),n.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),n}function Jn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Zn(e){var r=e.render;async function t(){var o=Je(),l=ee,p=ie,d=pe,m=oe;Be(null);var v=await Ke(ee,ie,1,pe,oe);Ze(o,{productId:l,orderBy:p,ratingFilter:d,mediaFilter:m})&&await r(ee,F,v,Ye,ie,1,ra)}async function a(o){var l=Je(),p=pe===o?null:o,d=ee,m=ie,v=oe;aa(p),We(1),Be(null);var u=await Ke(ee,ie,1,p,oe);Ze(l,{productId:d,orderBy:m,page:1,ratingFilter:p,mediaFilter:v})&&await r(ee,F,u,Ye,ie,1)}async function n(o,l){var p=Je(),d=ee,m=pe;We(1),Be(null);var v=o,u=l==="images"||l==="media"?l:"none";u!=="none"&&(v="newest"),na(u),Or(v);var s=await Ke(ee,v,1,pe,u);Ze(p,{productId:d,orderBy:v,page:1,ratingFilter:m,mediaFilter:u})&&await r(ee,F,s,Ye,v,1)}async function i(o){var l=Je(),p=ee,d=ie,m=pe,v=oe;We(o),Be(null);var u=await Ke(ee,ie,o,pe,oe);if(Ze(l,{productId:p,orderBy:d,page:o,ratingFilter:m,mediaFilter:v})){await r(ee,F,u,Ye,ie,o);var s=document.getElementById("renuvex-reviews"),g=s&&s.shadowRoot,c=g&&g.querySelector&&g.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(k){try{c.focus()}catch(E){}}Jn(g,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var f=document.getElementById("renuvex-reviews");if(f&&typeof f.scrollIntoView=="function"){var b=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;f.scrollIntoView({behavior:b?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:n,onPageChange:i}}function Qn(e){return Math.round(Math.max(36,Math.min(52,e*.38)))}function ei(e){return Math.round(e*.5)}function Xo(e){return e.querySelector(".renuvex-pr-review, .renuvex-pr-review-list, .renuvex-pr-review-gallery, .renuvex-pr-state-msg, .renuvex-pr-load-more, .renuvex-pr-pagination")}function $o(e){var r=e&&e.data;if(!r)return!1;var t=Number(r.mediaReviewCount);return Number.isFinite(t)&&t>0}function ri(e,r,t){if(e.getAttribute("data-renuvex-transitioning")==="true")return!1;var a=r.getElementById("renuvex-reviews-widget");return a?String(a.getAttribute("data-renuvex-product-id")||"")===String(t||""):!0}function ks(e,r){if(String(ee||"")!==String(e||""))return!1;var t=document.getElementById("renuvex-reviews"),a=t&&t.shadowRoot,n=a&&a.getElementById("renuvex-reviews-widget");if(!n||n.getAttribute("data-renuvex-product-id")!==String(e||""))return!1;var i=Jt({settings:r,root:document.documentElement,currentMediaFilter:oe,mediaStripReviews:wt,openReviewModal:ge,wireLightboxTrigger:cr});if(!i)return!1;var o=n.querySelector(".renuvex-pr-media-gallery-section");return o?o.replaceWith(i):n.insertBefore(i,Xo(n)),!0}async function Qt(e,r,t,a,n,i,o){if(ca){Dr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:i,badgeSettings:o});return}Hr(!0),ia(e),oa(r),o!==void 0&&la(o),da(a),n&&Or(n),i&&We(i),t!=null&&(pa(t),Be(t&&t.data?t.data.nextCursor:null));var l=Zn({render:Qt});try{let Le=function(K,Q){if(!(!K||!K.meta||!K.meta.sizeOverrides)){var he=K.meta.sizeOverrides[Q];he&&Object.keys(he).forEach(function(be){s.style.setProperty(be,he[be])})}};var ae=Le,p=vt(r.summaryLayout),d=!(p.meta&&p.meta.supports&&p.meta.supports.title===!1),m=r.showTitle!==!1,v=D(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),u=d&&m?v:"",s=document.documentElement;qn(s,r);var g=r.borderRadius!==void 0?r.borderRadius:8,c=Kt[r.size]||Kt.medium,f=qt[r.thumbnailSize]||qt.medium,b=f;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(b=Xt[r.thumbnailSize]||Xt.medium),s.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",g+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,g-4)+"px"),s.style.setProperty("--renuvex-pr-media-gallery-title-size",c.mediaGalleryTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-load-more-min-height",c.loadMoreMinHeight+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-y",c.loadMorePadY+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-x",c.loadMorePadX+"px"),s.style.setProperty("--renuvex-pr-load-more-mobile-min-height",c.loadMoreMobileMinHeight+"px"),s.style.setProperty("--renuvex-pr-pagination-button-size",c.paginationButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-pad-x",c.paginationPadX+"px"),s.style.setProperty("--renuvex-pr-pagination-gap",c.paginationGap+"px"),s.style.setProperty("--renuvex-pr-pagination-margin-top",c.paginationMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-gap-min",c.paginationGapMin+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-button-size",c.paginationMobileButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-font-size",c.paginationMobileFontSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap",c.paginationMobileGap+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",c.paginationMobileMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",c.paginationMobileGapMin+"px"),s.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",f+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",b+"px");var k=Qn(f),E=Qn(b);s.style.setProperty("--renuvex-pr-media-play-size",k+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size",ei(k)+"px"),s.style.setProperty("--renuvex-pr-media-play-size-mobile",E+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size-mobile",ei(E)+"px");var M=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",M),s.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),Le(vt(r.summaryLayout),r.size),Le(ft(r.reviewLayout),r.size);var S=Er(r),R=Ta();if(!R)return;var y=Aa(R,e),A=document.getElementById("renuvex-reviews");A||(A=document.createElement("div"),A.id="renuvex-reviews",A.style.minHeight="200px"),A.parentNode!==y&&y.appendChild(A);var w=za(A),C=dr+tr+Xr+Fn()+Dn();pr(w,C);var T=Ea(w);if(r.enabled===!1){A.style.minHeight="auto",A.removeAttribute("data-renuvex-transitioning"),T.replaceChildren(Vn(r.borderRadius!==void 0?r.borderRadius:8)),Hr(!1);var h=Ur;Dr(null),h&&Qt(h.productId,h.settings,h.reviewsData,h.productName,h.orderBy,h.page,h.badgeSettings);return}try{var z=t||{},B=St(z),U=B?[]:z.data&&z.data.reviews||[];ua(U),T.replaceChildren(),A.removeAttribute("data-renuvex-transitioning");var x=document.createElement("section");if(x.id="renuvex-reviews-widget",x.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),x.className="renuvex-pr-reviews-widget",x.setAttribute("data-renuvex-surface","reviews"),e&&x.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(x.style.width="100%",x.style.maxWidth="100%",x.style.marginLeft="0",x.style.marginRight="0"),u){var _=document.createElement("div"),N=r.summaryLayout||"classic";_.className="renuvex-pr-title renuvex-pr-title-"+N,_.textContent=u,x.appendChild(_)}if(B){x.appendChild(Gn(z.message,l.onRetry)),T.appendChild(x),Ge(w),ht(x,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return w.getElementById("renuvex-reviews-widget")},function(){return ri(A,w,e)}),bt("reviews-widget-visible");return}var L=z.data&&z.data.allCount||0,V=z.data&&z.data.ratingCounts||null,j=V||[0,0,0,0,0],H=z.data&&z.data.avgRating||"0.0";if(!V&&U.length>0){U.forEach(function(K){K.rating>=1&&K.rating<=5&&j[K.rating-1]++});var X=U.reduce(function(K,Q){return K+Q.rating},0);H=(X/U.length).toFixed(1)}if(L===0)x.classList.add("renuvex-pr-reviews-empty"),x.appendChild(Yn({iconPair:S,writeButtonText:D(r.writeButtonText,"Yorum Yap"),emptyStateText:D(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:le}));else{var W=vt(r.summaryLayout),q=W.render({widget:x,productId:e,data:z,settings:r,iconPair:S,allCount:L,ratingCounts:j,avgRatingVal:H,currentRatingFilter:pe,currentOrderBy:ie,currentMediaFilter:oe,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});x.appendChild(q);var I=Jt({settings:r,root:s,currentMediaFilter:oe,mediaStripReviews:wt,openReviewModal:ge,wireLightboxTrigger:cr});if(I)x.appendChild(I);else if($o(z)){var P=Xn({settings:r,root:s,currentMediaFilter:oe});P&&x.appendChild(P)}if(U.length===0)x.appendChild(Wn());else{var O=ft(r.reviewLayout);U.forEach(function(K){x.appendChild(O.render(K,yt))})}var $=r.paginationMode==="numbered"?"numbered":"loadMore";if($==="numbered"){var G=z.data&&z.data.totalPages||1;G>1&&x.appendChild($n({page:z.data&&z.data.page||Cr||1,totalPages:G,onPageChange:l.onPageChange}))}var Y=$==="loadMore"&&z.data&&z.data.hasMore;if(Y){let K=function(Q){Z.textContent=Q,J.setAttribute("aria-label",Q)};var Qe=K,J=document.createElement("button");J.className="renuvex-pr-load-more";var Z=document.createElement("span");Z.className="renuvex-pr-load-more-label",Z.setAttribute("aria-hidden","true"),J.appendChild(Z),K("Daha Fazla G\xF6ster"),J.onclick=async function(){J.disabled=!0,K("Y\xFCkleniyor...");var Q=Je(),he=ee,be=ie,er=Cr,De=pe,Ve=oe,rr=Fr,te=er+1,ne=await Ke(he,be,te,De,Ve,null,rr);if(Ze(Q,{productId:he,orderBy:be,page:er,ratingFilter:De,mediaFilter:Ve,nextCursor:rr}))if(ne&&!St(ne)&&ne.data&&Array.isArray(ne.data.reviews)){var zr=sa(ne.data.reviews);va(zr),We(te),Be(ne.data.nextCursor||null);var ti=ft(F.reviewLayout);zr.forEach(function(ai){x.insertBefore(ti.render(ai,yt),J)}),ne.data.hasMore?(J.disabled=!1,K("Daha Fazla G\xF6ster")):J.remove()}else J.disabled=!1,K("Tekrar Dene")},x.appendChild(J)}}T.appendChild(x),Ge(w),ht(x,"reviews-widget",{productId:e||""},function(){return w.getElementById("renuvex-reviews-widget")},function(){return ri(A,w,e)}),bt("reviews-widget-visible")}catch(K){console.error("[renuvex-pr] render error:",K);var Pe=document.createElement("p");Pe.style.cssText="text-align:center;color:#dc2626;",Pe.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",T&&T.replaceChildren(Pe)}}finally{if(Hr(!1),Ur){var de=Ur;Dr(null),Qt(de.productId,de.settings,de.reviewsData,de.productName,de.orderBy,de.page,de.badgeSettings)}}}export{Qt as render,ks as renderDeferredMediaGallery};
