/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as fa,b as Or,c as xa,d as Le,e as Ur,f as ga,g as ha,i as mt,j as Ue}from"./chunk-X5ZUCYSI.js";import{c as ze}from"./chunk-WWGCW5YN.js";import{a as je,d as Ae}from"./chunk-N7KC6W47.js";import{A as ra,B as ta,C as aa,D as na,E as Tr,F as Ar,G as Mr,a as te,b as lr,c as ie,d as oe,e as Q,f as N,g as Wt,h as Be,j as Cr,k as st,l as Gt,m as qt,n as Er,o as Fe,p as Kt,q as Xt,r as $t,s as Jt,t as Zt,u as Qt,v as ea,w as Me}from"./chunk-XNOOKDBR.js";import{c as ut,e as va,f as ca}from"./chunk-ABQJE6EG.js";import{A as Nr,B as Br,C as vt,D as ct,E as Fr,F as sa,G as Ir,a as Pe,b as ue,c as se,d as re,e as Ie,f as Pr,g as dr,h as ia,i as We,j as _r,k as oa,l as ye,m as Lr,n as la,o as Rr,q as U,r as da,s as we,t as _e,v as pa,w as ke,x as ua,z as le}from"./chunk-TRRHE6OG.js";import{a as pe,b as be,h as ma,i as Oe}from"./chunk-UOBLDAJF.js";import"./chunk-W53BN4EO.js";import{a as pt,b as jt,d as Te}from"./chunk-D4BSMMIO.js";var Ge=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function ba(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function qe(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Vr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function ya(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function wa(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var ka=`
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
  .renuvex-pr-modal-main-img,.renuvex-pr-modal-main-video{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;transition:opacity 0.25s ease;}
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
  .renuvex-pr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:2;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-modal-close-mobile:hover{opacity:0.85;}}
  .renuvex-pr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-modal-nav:hover{opacity:0.85;}}
  .renuvex-pr-modal-nav-prev{left:10px;}
  .renuvex-pr-modal-nav-next{right:10px;}
  .renuvex-pr-modal-nav svg{width:18px;height:18px;}
  .renuvex-pr-modal-close svg,.renuvex-pr-modal-close-mobile svg{width:14px;height:14px;}
  .renuvex-pr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .renuvex-pr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
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
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:var(--renuvex-pr-media-play-size,42px);height:var(--renuvex-pr-media-play-size,42px);border-radius:50%;background:rgba(0,0,0,.68);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size,21px);height:var(--renuvex-pr-media-play-icon-size,21px);margin-left:2px;}
  @media(max-width:640px){
    .renuvex-pr-media-play{width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));}
    .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));height:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));}
  }
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Hr=[ka,pa,Sa,Ca,Ea,Ta,Ma,Aa,za].join(`
`);function Yn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function fe(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function jn(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function Wn(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",i=jn()&&!n;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Gn(e){var r=document.body.style,t=document.documentElement.style;fe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),fe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),fe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),fe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),fe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),fe(r,"position",e.bodyPosition,e.bodyPositionPriority),fe(r,"top",e.bodyTop,e.bodyTopPriority),fe(r,"left",e.bodyLeft,e.bodyLeftPriority),fe(r,"right",e.bodyRight,e.bodyRightPriority),fe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var pr=0,Ke=null;function Dr(){return pr+=1,pr>1||(Ke=Yn(),Wn(Ke)),Ke}function Yr(){if(pr!==0&&(pr-=1,!(pr>0))){var e=Ke;Ke=null,e&&Gn(e)}}function qn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function jr(){var e=qn();return!e||e===document.body||e===document.documentElement?null:e}function ve(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Kn(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ft(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Kn)}function Xn(e,r){var t=e,a=ft(e);!a.length&&r&&(t=r,a=ft(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;ve(n)}function Wr(e,r,t){if(e.key==="Tab"){var a=ft(r);if(!a.length){e.preventDefault(),Xn(r);return}var n=a[0],i=a[a.length-1],o=ya(t);if(!r.contains(o)){e.preventDefault(),ve(n);return}if(a.indexOf(o)===-1){e.preventDefault(),ve(e.shiftKey?i:n);return}e.shiftKey&&o===n?(e.preventDefault(),ve(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ve(n))}}var Pa="renuvexPrOverlay";function Gr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Pa]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function $n(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Pa]===e.id)}function qr(e){if($n(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}var Jn="media-theme-renuvex-review-storefront";var _a="renuvex-review-storefront",Xe={controlForeground:"#ffffff",controlBackground:"#000000",controlHoverBackground:"rgba(0,0,0,0.84)",centerPlayButtonBackground:"rgba(0,0,0,0.68)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.84)",controlsBackdrop:"rgba(0,0,0,0.58)",menuBackground:"#000000",menuBorder:"rgba(255,255,255,0.18)",menuText:"#ffffff",menuCheckedText:"#ffffff",menuHoverBackground:"rgba(255,255,255,0.12)",menuCheckedBackground:"rgba(255,255,255,0.18)",menuHoverOutline:"rgba(255,255,255,0.54) solid 1px",progressPlayed:"#ffffff",progressTrack:"#000000",progressPointer:"rgba(255,255,255,0.72)",progressBuffered:"rgba(255,255,255,0.28)",progressThumbBorder:"1px solid rgba(255,255,255,0.72)",progressThumbShadow:"0 0 0 1px rgba(0,0,0,0.45)",progressPointerBorder:"1px solid rgba(0,0,0,0.55)"};function Kr(e,r){return`var(--renuvex-pr-review-lightbox-video-${e}, ${r})`}var Zn=pt({},Xe),ur=jt(pt({},Xe),{controlForeground:Kr("icon",Xe.controlForeground),progressPlayed:Kr("progress",Xe.progressPlayed),progressTrack:Kr("progress-track",Xe.progressTrack),progressThumbBorder:`1px solid ${Kr("progress",Xe.progressPlayed)}`}),Xr=null;function La(e){return`
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
    --media-icon-color: ${e.controlForeground};
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
`}var Xo=La(Zn),Qn=La(ur);function ei(e,r){var d;if(typeof window=="undefined"||typeof document=="undefined")return;let t=window.customElements;if(t.get(e))return;let a=t.get("media-theme-gerwig"),n=a==null?void 0:a.template;if(!a||!(n instanceof HTMLTemplateElement))return;let i=n.cloneNode(!0);i.id=e,(d=i.content.querySelector("media-controller"))==null||d.setAttribute("lang","tr");let o=document.createElement("style");o.textContent=r,i.content.append(o);class l extends a{}l.template=i,t.define(e,l)}function ri(e,r){return typeof window=="undefined"?Promise.resolve():(Xr!=null||(Xr=import("./review-player-i18n-775ENPF7.js").then(()=>import("./dist-ESXZERR5.js")).then(()=>import("./menu-ZPT7P4I2.js")).then(()=>import("./gerwig-J4LRWRX2.js")).then(()=>import("./dist-F5RX6YFS.js")).then(()=>{})),Xr.then(()=>{ei(e,r)}))}function Ra(){return ri(Jn,Qn)}var gt=null;function ti(){return gt||(gt=Ra()),gt}function ai(e){if(!e||typeof e!="object")return"";var r=typeof e.playbackId=="string"?e.playbackId.trim():"",t=fa(e.url);return r&&t&&r!==t?"":r||t}function ni(e,r){var t=ai(r);if(!t)return!1;var a=Or(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"";return e.setAttribute("disable-tracking",""),e.setAttribute("disable-cookies",""),e.setAttribute("preload","metadata"),e.setAttribute("stream-type","on-demand"),e.setAttribute("muted",""),e.setAttribute("playsinline",""),e.setAttribute("hotkeys","noarrowleft noarrowright"),e.setAttribute("lang","tr"),e.setAttribute("theme",_a),e.setAttribute("accent-color",ur.controlForeground),e.setAttribute("primary-color",ur.controlForeground),e.setAttribute("secondary-color",ur.controlBackground),a&&e.setAttribute("poster",a),e.setAttribute("playback-id",t),!0}function Na(e){e.preventDefault()}function Ba(e,r){var t=!1,a=document.createElement("mux-player");a.className=r||"renuvex-pr-modal-main-video",a.setAttribute("aria-label","Yorum videosu"),a.addEventListener("contextmenu",Na);var n=ni(a,e);return n?ti().catch(function(){t||a.dispatchEvent(new Event("error"))}):setTimeout(function(){t||a.dispatchEvent(new Event("error"))},0),{element:a,cleanup:function(){t=!0;try{typeof a.pause=="function"&&a.pause()}catch(o){}a.removeAttribute("playback-id"),a.removeAttribute("playback-token"),a.removeAttribute("thumbnail-token"),a.removeAttribute("poster"),a.removeEventListener("contextmenu",Na)}}}function $e(e){return Le(e)}function bt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function Fa(e,r,t,a,n,i){e&&e.shadowRoot&&bt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Yr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Pr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ve(n)}function ii(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=we(e.rating,N);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=ke(e.createdAt),a.appendChild(n),a.appendChild(i),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var p=document.createElement("div");p.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=U(N&&N.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",p.appendChild(m),p.appendChild(v),p.style.display=e.merchantReply?"":"none",t.appendChild(p),r.appendChild(t),r}function Ia(e,r,t){var a=t||N,n=e.querySelector(".renuvex-pr-modal-scroll-content"),i=n.querySelector(".renuvex-pr-modal-stars");i.innerHTML=we(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=ke(r.createdAt);var o=n.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=n.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=U(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}var oi=112;function yt(e){return e&&e.touches&&e.touches.length?e.touches[0]:e&&e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null}function li(e,r,t){if(!r||r.type!=="video"||!t)return!1;var a=yt(e);if(!a)return!1;var n=t.querySelector("mux-player.renuvex-pr-modal-main-video");if(!n||typeof n.getBoundingClientRect!="function")return!1;var i=n.getBoundingClientRect();if(!i.width||!i.height||a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom)return!1;var o=Math.min(oi,Math.max(72,i.height*.2));return a.clientY>=i.bottom-o}function wt(e,r,t,a,n,i,o,l,d){var p=$e(e),m=Math.max(0,Math.min(t||0,p.length-1)),v=p[m],u=document.createElement("div");u.className="renuvex-pr-modal-left";var s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(v&&v.type==="video"){var x=Ba(v,"renuvex-pr-modal-main-video"+(s?" renuvex-pr-modal-video-enter":"")),c=x.element;c.addEventListener("error",function(){if(!u.querySelector(".renuvex-pr-modal-img-error")){var T=document.createElement("div");T.className="renuvex-pr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",u.insertBefore(T,c)}}),u.__renuvexMediaCleanup=x.cleanup,u.appendChild(c)}else{var f=document.createElement("img");if(f.className="renuvex-pr-modal-main-img"+(s?" "+s:""),f.src=ct(v?v.url:""),f.decoding="async",f.width=vt,f.height=Math.round(vt*4/3),f.alt="Yorum foto\u011Fraf\u0131",!s){f.classList.add("renuvex-pr-modal-img-loading");var h=function(){f.classList.remove("renuvex-pr-modal-img-loading")};f.complete&&f.naturalWidth>0?h():(f.addEventListener("load",h,{once:!0}),f.addEventListener("error",h,{once:!0}))}sa(f,function(T){if(T.style.display="none",!u.querySelector(".renuvex-pr-modal-img-error")){var L=document.createElement("div");L.className="renuvex-pr-modal-img-error",L.setAttribute("role","status"),L.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",u.insertBefore(L,T)}}),u.appendChild(f)}var b=document.createElement("button");b.className="renuvex-pr-modal-close-mobile";var E=re(ye);E&&b.appendChild(E),b.setAttribute("aria-label","Kapat"),b.onclick=function(T){T.stopPropagation(),i()},u.appendChild(b);var P=0,k=!1;if(u.addEventListener("touchstart",function(T){var L=yt(T);L&&(P=L.clientX,k=li(T,v,u))},{passive:!0}),u.addEventListener("touchend",function(T){if(k){k=!1;return}var L=yt(T);if(L){var I=P-L.clientX;if(!(Math.abs(I)<50)){if(I>0){if(w)Se(e,r,m+1,a,n,i,!0,"next",l,d);else if(z){var B=a[r+1];Se(B,r+1,0,a,n,i,!1,"next",l,d)}}else if(g)Se(e,r,m-1,a,n,i,!0,"prev",l,d);else if(A){var j=a[r-1],V=$e(j);Se(j,r-1,V.length-1,a,n,i,!1,"prev",l,d)}}}},{passive:!0}),p.length>1){var S=document.createElement("div");S.className="renuvex-pr-modal-thumbs",p.forEach(function(T,L){var I=T.type==="video"?T.posterUrl:T.url,B=document.createElement("img"),j=Fr(I,Br);B.src=j.src,B.srcset=j.srcset,B.loading="lazy",B.decoding="async",B.width=Br,B.height=Br,B.className="renuvex-pr-modal-thumb"+(L===m?" renuvex-pr-modal-thumb-active":""),B.alt="K\xFC\xE7\xFCk resim "+(L+1),Ir(B),B.tabIndex=0,B.setAttribute("role","button"),B.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(L+1)+" se\xE7"),L===m&&B.setAttribute("aria-current","true"),(function(V){function H(){Se(e,r,V,a,n,i,!0,null,l,d)}B.onclick=H,B.onkeydown=function(D){(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),H())}})(L),S.appendChild(B)}),u.appendChild(S)}var g=m>0,w=m<p.length-1,A=r>0,z=r<a.length-1,C=g||A,_=w||z;if(C){var R=document.createElement("button");R.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var F=re(We);F&&R.appendChild(F),R.setAttribute("aria-label","\xD6nceki"),R.onclick=function(T){if(T.stopPropagation(),g)Se(e,r,m-1,a,n,i,!0,"prev",l,d);else if(A){var L=a[r-1],I=$e(L);Se(L,r-1,I.length-1,a,n,i,!1,"prev",l,d)}},u.appendChild(R)}if(_){var y=document.createElement("button");y.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var M=re(_r);M&&y.appendChild(M),y.setAttribute("aria-label","Sonraki"),y.onclick=function(T){if(T.stopPropagation(),w)Se(e,r,m+1,a,n,i,!0,"next",l,d);else if(z){var L=a[r+1];Se(L,r+1,0,a,n,i,!1,"next",l,d)}},u.appendChild(y)}return u}function Oa(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=$e(a);n[0]&&n[0].type==="image"&&(new Image().src=ct(n[0].url))}})}function ht(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function di(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){ht(t),ht(a),ht(n)}i(),t&&ve(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function Se(e,r,t,a,n,i,o,l,d,p){if(p&&(p.currentReview=e),o){var m=wt(e,r,t,a,n,i,l,d,p);n.firstChild&&(bt(n.firstChild),n.replaceChild(m,n.firstChild))}else{var m=wt(e,r,t,a,n,i,l,d,p),v=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&(bt(n.firstChild),n.replaceChild(m,n.firstChild)),v&&Ia(v,e,p&&p.currentSettings),di(d,n)}Oa(r,a)}function xe(e,r,t){var a=$e(e);if(!a.length)return;var n=(t||[]).filter(function(w){return $e(w).length>0}),i=n.findIndex(function(w){return w===e||w.id===e.id});i===-1&&(n.unshift(e),i=0);var o=a.findIndex(function(w){return w.url===r});o<0&&(o=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var p=!1,m=null,v=jr(),u=Ae(),s=Dr(),x=Gr(),c={currentReview:e,currentSettings:N},f=null;function h(w){var A=w&&w.detail&&w.detail.settings;if(!(A&&A===f)){f=A||null,c.currentSettings=A||N;var z=d.querySelector(".renuvex-pr-modal-right");!z||!c.currentReview||Ia(z,c.currentReview,c.currentSettings)}}function b(){p||(p=!0,window.removeEventListener(Oe,h),Fa(m&&m.host,E,b,s,v,u))}function E(w){if(w.key==="Escape"){P();return}Wr(w,l,m&&m.root)}function P(){p||(p=!0,window.removeEventListener(Oe,h),Fa(m&&m.host,E,b,s,v,u),qr(x))}document.addEventListener("keydown",E),window.addEventListener("popstate",b),window.addEventListener(Oe,h),l.onclick=function(){P()},d.onclick=function(w){w.stopPropagation()},d.appendChild(wt(e,i,o,n,d,P,null,l,c)),d.appendChild(ii(e)),Oa(i,n);var k=document.createElement("div");k.className="renuvex-pr-modal-wrap",k.tabIndex=-1,k.setAttribute("role","dialog"),k.setAttribute("aria-modal","true"),k.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),k.appendChild(d);var S=document.createElement("button");S.className="renuvex-pr-modal-close";var g=re(ye);g&&S.appendChild(g),S.setAttribute("aria-label","Kapat"),S.onclick=function(w){w.stopPropagation(),P()},k.appendChild(S),l.appendChild(k),m=Vr(),qe(m.root,Ge+je+Hr),m.root.appendChild(l),Ie(m.root),ve(k)}function sr(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Mt={};Te(Mt,{css:()=>qi,meta:()=>Gi,render:()=>Ki});function Je(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,i=e.onFilterChange;Pe(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,p=t>0?Math.round(d/t*100):0,m=n===l,v=d>0,u=U(N&&N.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(m?" renuvex-pr-bar-active":"")+(n&&!m?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",m?"true":"false"),s.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" "+u+", "+(m?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+u);for(var x="",c=1;c<=5;c++){var f=c<=l;x+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(f?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ue(f?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+x+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+p+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",v&&(function(h){function b(){i(h)}s.onclick=b,s.onkeydown=function(E){(E.key==="Enter"||E.key===" "||E.key==="Space"||E.key==="Spacebar")&&(E.preventDefault(),b())}})(l),o.appendChild(s)}return o}var Ha="data-renuvex-pr-dismiss-gesture",Ve=[],Ua=!1,$r=!1,vr=[],Ze=null;function Va(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function kt(){for(var e=Ve.length-1;e>=0;e--){var r=Ve[e].element;r&&r.isConnected===!1&&Ve.splice(e,1)}return Ve}function pi(e){!e||typeof e.setAttribute!="function"||(vr.indexOf(e)===-1&&vr.push(e),e.setAttribute(Ha,""))}function Da(){for(var e=0;e<vr.length;e++){var r=vr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Ha)}vr=[],Ze&&typeof clearTimeout=="function"&&clearTimeout(Ze),Ze=null}function ui(e){if($r){$r=!1,Da(),e.preventDefault(),e.stopPropagation();return}for(var r=kt(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Va(e,n.trigger)||Va(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function si(e){if(e.key==="Escape")for(var r=kt(),t=r.length-1;t>=0;t--)r[t].close()}function Ya(){Ua||typeof document=="undefined"||(document.addEventListener("click",ui,!0),document.addEventListener("keydown",si),Ua=!0)}function vi(e){Ya(),$r=!0,pi(e),Ze&&typeof clearTimeout=="function"&&clearTimeout(Ze),typeof setTimeout=="function"&&(Ze=setTimeout(function(){$r=!1,Da()},700))}function zt(e){vi(e)}function Jr(e){Ya();var r={trigger:e.trigger,element:e.element,close:e.close};return Ve.push(r),{unregister:function(){var t=Ve.indexOf(r);t!==-1&&Ve.splice(t,1)},notifyOpening:function(){for(var t=kt(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function de(e){var r=e.widget,t=e.currentOrderBy,a=e.currentMediaFilter||"none",n=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=U(N&&N.writeButtonText,"Yorum Yap"),l.onclick=n,o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-filter-btn",p.setAttribute("aria-label","Filtrele"),p.setAttribute("aria-haspopup","menu"),p.setAttribute("aria-expanded","false");var m=N&&N.filterIcon||"lines";p.innerHTML=se(ia(m));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var u=Gt===!0?"media":"images",s=u==="media"?"Foto\u011Fraf ve Video":"Foto\u011Frafl\u0131",x=[{orderBy:"newest",label:"En Yeni",mediaFilter:"none"},{orderBy:"highest",label:"En Y\xFCksek Puan",mediaFilter:"none"},{orderBy:"lowest",label:"En D\xFC\u015F\xFCk Puan",mediaFilter:"none"},{orderBy:"newest",label:s,mediaFilter:u}],c=!1;function f(){return r&&r.parentNode||r||null}function h(k,S){if(!(S===!0||!k)){if(k.type==="touchstart"){zt(f());return}if(k.type==="pointerdown"){var g=k.pointerType||"";g&&g!=="mouse"&&zt(f())}}}function b(k){var S=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),p.classList.remove("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","false");var g=k&&(k.restoreFocus===!0||k.restoreFocus==="auto"&&Ae());if(S&&g)try{p.focus({preventScroll:!0})}catch(w){try{p.focus()}catch(A){}}return S}function E(){P.notifyOpening(),v.classList.add("renuvex-pr-open"),p.classList.add("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","true");var k=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");k&&requestAnimationFrame(function(){try{k.focus({preventScroll:!0})}catch(S){try{k.focus()}catch(g){}}})}x.forEach(function(k){var S=k.mediaFilter!=="none",g=S?a===k.mediaFilter:a==="none"&&(t||"newest")===k.orderBy,w=document.createElement("button");w.type="button",w.className="renuvex-pr-filter-item"+(g?" renuvex-pr-filter-item-active":""),w.setAttribute("role","menuitem"),w.textContent=k.label;var A=!1;function z(C,_){C&&(C.preventDefault(),C.stopPropagation()),!A&&(A=!0,c=!0,h(C,_),b({restoreFocus:_}),i(k.orderBy,k.mediaFilter),setTimeout(function(){A=!1,c=!1},0))}w.addEventListener("pointerdown",function(C){C.button!==void 0&&C.button!==0||C.pointerType!=="mouse"&&z(C,!1)}),typeof window!="undefined"&&!window.PointerEvent&&w.addEventListener("touchstart",function(C){z(C,!1)},{passive:!1}),w.addEventListener("keydown",function(C){(C.key==="Enter"||C.key===" ")&&z(C,!0)}),w.onclick=function(C){z(C,!1)},v.appendChild(w)}),p.onclick=function(){v.classList.contains("renuvex-pr-open")?b({restoreFocus:"auto"}):E()},d.addEventListener("keydown",function(k){k.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(k.stopPropagation(),b({restoreFocus:!0}))}),d.addEventListener("focusout",function(k){if(v.classList.contains("renuvex-pr-open")&&!c){var S=k.relatedTarget;S&&d.contains(S)||b()}});var P=Jr({trigger:d,element:v,close:b});return d.appendChild(p),d.appendChild(v),o.appendChild(d),o}var ja=`
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
`;function Wa(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,a=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,n=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var d=document.createElement("button");d.className="renuvex-pr-fwizard-close",d.type="button",d.setAttribute("aria-label","Kapat");var p=re(ye);p&&d.appendChild(p),o.appendChild(d);var m=!1,v=null,u=null,s=!1;function x(){ve(i)}function c(g){Wr(g,i,v&&v.root)}function f(){if(!m){if(m=!0,document.removeEventListener("keydown",h),i.removeEventListener("click",b),d.removeEventListener("click",f),s)ve(u);else{var g=v&&v.root?v.root.activeElement:null;if(g&&typeof g.blur=="function")try{g.blur()}catch(w){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(Pr(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):i.parentNode&&i.parentNode.removeChild(i),Yr();try{r()}catch(w){}},200)}}function h(g){if(g.key==="Escape"){f();return}c(g)}function b(g){g.target===i&&n&&f()}document.addEventListener("keydown",h),i.addEventListener("click",b),d.addEventListener("click",f);function E(g){u=t||jr(),s=a===null?Ae():a,g&&l.appendChild(g),v=Vr(),qe(v.root,Ge+je+ja),v.root.appendChild(i),Ie(v.root),Dr(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),x()})}var P=null,k=null;function S(g,w){if(w=w||"error",P){try{P.remove()}catch(A){}P=null}k&&(clearTimeout(k),k=null),P=document.createElement("div"),P.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+w,P.textContent=g,o.appendChild(P),k=setTimeout(function(){P&&(P.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(P){try{P.remove()}catch(A){}P=null}},300))},4e3)}return{open:E,close:f,content:l,setAllowOutsideClose:function(g){n=!!g},setStepAttr:function(g){o.setAttribute("data-step",String(g))},showToast:S}}var St=4;function Qe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Ga(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(i){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<St&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(i){return i!==n})}}}}function qa(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=se(We)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var p=[],m=0;m<St;m++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",d.appendChild(v),p.push(v)}o.appendChild(d);var u=document.createElement("button");u.type="button";var s=null;function x(f){s&&u.removeEventListener("click",s),s=f,f&&u.addEventListener("click",f)}o.appendChild(u);function c(f,h){var b=r.indexOf(f)!==-1,E=t.indexOf(f)!==-1,P=h&&(h.images&&h.images.length>0||h.pendingImages&&h.pendingImages.length>0||!!h.videoUpload);if(b)f===2&&P?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",x(function(){i()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",x(function(){n()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(E){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var k=Qe(f,h);u.disabled=!k,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!k),x(function(){u.disabled||i()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,x(null)}return{el:o,update:function(f,h){p.forEach(function(E,P){P+1<=f?E.classList.add("renuvex-pr-fwizard-progress-seg-active"):E.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var b=f<=1;l.style.visibility=b?"hidden":"",l.style.pointerEvents=b?"none":"",l.tabIndex=b?-1:0,c(f,h)},setNextDisabled:function(f){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!f,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",d.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),x(f)}}}var ci={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ce(e){var r=N&&N[e];return!r&&e==="formStepMediaTitle"&&(r=N&&N.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=N&&N.formStepPhotosSubtitle),U(r,ci[e])}function Ka(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ce("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=dr(N||{});Pe(l);var d=[];function p(f){d.forEach(function(h,b){var E=b<f;h.classList.toggle("renuvex-pr-fwizard-star-active",E),h.setAttribute("aria-checked",b+1===f?"true":"false"),h.innerHTML=E?ue("full"):ue("outline")})}function m(f){e.set({rating:f}),p(f)}function v(f){var h=d[f-1];if(h)try{h.focus()}catch(b){}}function u(f,h){h&&typeof h.preventDefault=="function"&&h.preventDefault(),h&&typeof h.stopPropagation=="function"&&h.stopPropagation(),!a&&(a=!0,m(f),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(f){var h=document.createElement("button");h.type="button",h.className="renuvex-pr-fwizard-star",h.setAttribute("role","radio"),h.setAttribute("aria-label",f+" y\u0131ld\u0131z"),h.innerHTML=ue("outline"),h.addEventListener("mouseenter",function(){p(f)}),h.addEventListener("mouseleave",function(){p(e.get().rating)}),h.addEventListener("pointerdown",function(b){b.button&&b.button!==0||u(f,b)}),typeof window!="undefined"&&!window.PointerEvent&&h.addEventListener("touchstart",function(b){u(f,b)},{passive:!1}),h.addEventListener("mousedown",function(b){window.PointerEvent||u(f,b)}),h.addEventListener("keydown",function(b){if(b.key==="Enter"||b.key===" "){u(f,b);return}var E=0;b.key==="ArrowRight"||b.key==="ArrowUp"?E=Math.min(5,f+1):b.key==="ArrowLeft"||b.key==="ArrowDown"?E=Math.max(1,f-1):b.key==="Home"?E=1:b.key==="End"&&(E=5),E&&(b.preventDefault(),m(E),v(E))}),h.addEventListener("click",function(b){u(f,b)}),d.push(h),o.appendChild(h)})(s);p(e.get().rating);var x=null,c=function(f){var h=f&&f.detail&&f.detail.settings;h&&h===x||(x=h||null,l=dr(h||N||{}),p(e.get().rating))};return window.addEventListener(Oe,c),t.appendChild(o),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Oe,c)}}}var Zr=3,mi=10*1024*1024;function Qr(e,r){r=r||{};var t=!1,a=r.hideAddButton===!0,n=r.revealAddButtonAfterMedia===!0,i=!a||n,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepPhotosTitle"),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-step-subtitle",d.textContent=ce("formStepPhotosSubtitle"),o.appendChild(d)}var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&p.classList.add("renuvex-pr-fwizard-photo-card--embedded");var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add",m.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",i&&p.appendChild(m),p.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),p.appendChild(u),o.appendChild(p);var s=r.revokeBlobUrl||function(k){k&&typeof k=="string"&&k.startsWith("blob:")&&URL.revokeObjectURL(k)},x=r.blobMap||{},c=r.urlToFinger||{};function f(){if(!t){var k=e.get().images||[],S=e.get().pendingImages||[],g=k.map(function(w){return{url:w,isPending:!1}}).concat(S.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));u.innerHTML="",g.forEach(function(w){var A=x[w.url]||w.url,z=h(w,A);u.appendChild(z)}),E()}}function h(k,S){var g=document.createElement("div");g.className="renuvex-pr-fwizard-photo-thumb";var w=document.createElement("img");w.src=S,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",g.appendChild(w);var A=document.createElement("div");A.className="renuvex-pr-fwizard-photo-loading",A.style.display="none",g.appendChild(A);var z=document.createElement("button");z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.setAttribute("aria-label","Kald\u0131r");var C=re(ye);return C&&z.appendChild(C),g.appendChild(z),b(g,k,S),g}function b(k,S,g){var w=k.querySelector("img");w.src!==g&&(w.src=g);var A=k.querySelector(".renuvex-pr-fwizard-photo-loading");if(S.isPending&&S.error){A.style.display="flex",A.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+S.error,A.appendChild(z)}else A.style.display="none",A.textContent="";var C=k.querySelector(".renuvex-pr-fwizard-photo-remove");C.onclick=function(){var _=c[S.url]||(S.file?S.file.name+"_"+S.file.size:null),R=x[S.url],F={};_&&(F.fingerprints=(e.get().fingerprints||[]).filter(function(y){return y!==_})),S.isPending?F.pendingImages=(e.get().pendingImages||[]).filter(function(y){return y.url!==S.url}):F.images=(e.get().images||[]).filter(function(y){return y!==S.url}),e.set(F),s(S.url),s(R),delete c[S.url],R&&delete c[R],x[S.url]&&delete x[S.url]}}function E(){var k=(e.get().images||[]).length,S=(e.get().pendingImages||[]).length,g=k+S,w=g>=Zr;p.classList.toggle("renuvex-pr-fwizard-photo-card--compact",g>0),i&&(m.innerHTML=g>0?se(la):se(Lr)+"<span>Foto\u011Fraf Ekle</span>"),w?(i&&(m.style.display="none"),m.disabled=!0,v.disabled=!0):(i&&(m.style.display=n&&g===0?"none":"flex"),m.disabled=!1,v.disabled=!1,m.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}m.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(k){var S=(e.get().images||[]).length+(e.get().pendingImages||[]).length,g=Array.from(k.target.files).slice(0,Zr-S);v.value="";var w=(e.get().pendingImages||[]).length,A=e.get().images||[],z=A.length;if(g.length!==0){for(var C=[],_=[],R=0;R<g.length;R++){var F=g[R],y=F.name+"_"+F.size,M=(e.get().fingerprints||[]).some(function(H){return H===y})||C.some(function(H){return H.file.name+"_"+H.file.size===y});if(!M){if(F.size>mi){var T="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(T,"error"):alert(T);continue}var L=URL.createObjectURL(F);c[L]=y,C.push({url:L,file:F,error:null}),_.push({url:L,file:F});var I=(e.get().fingerprints||[]).slice();I.push(y),e.set({fingerprints:I})}}if(C.length!==0){var B=(e.get().pendingImages||[]).concat(C),j=async function(){for(var H=0;H<_.length;H++){var D=_[H],q=D.file,W=D.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var ee=(e.get().pendingImages||[]).filter(function(Z){return Z.url!==W}),O=(e.get().images||[]).slice();O.push(W),e.set({pendingImages:ee,images:O});continue}try{var $=await ze(be+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe})});if(!$.ok)throw $.status===429?new Error("rate_limit"):new Error("sign failed");var J=await $.json();if(!J.folder)throw new Error("sign folder missing");var G=new FormData;G.append("file",q),G.append("api_key",J.api_key),G.append("timestamp",J.timestamp),G.append("signature",J.signature),G.append("folder",J.folder);var K=await fetch("https://api.cloudinary.com/v1_1/"+J.cloud_name+"/image/upload",{method:"POST",body:G}),X=await K.json();if(X.secure_url&&ua(X.secure_url)){var me=(e.get().pendingImages||[]).some(function(Z){return Z.url===W});if(!me)continue;x[X.secure_url]=W,c[X.secure_url]=c[W];var hr=(e.get().pendingImages||[]).filter(function(Z){return Z.url!==W}),ir=(e.get().images||[]).slice();ir.push(X.secure_url),e.set({pendingImages:hr,images:ir});try{ze(be+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,secureUrl:X.secure_url,metadata:{assetId:X.asset_id,publicId:X.public_id,version:X.version,resourceType:X.resource_type,format:X.format,width:X.width,height:X.height,bytes:X.bytes,signature:X.signature}})}).catch(function(){})}catch(Z){}}else throw new Error("invalid image url")}catch(Z){console.error("[renuvex-pr] Image upload failed:",Z);var Ee=Z.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Ee,"error");var Y=(e.get().pendingImages||[]).map(function(ne){return ne.url===W?{url:ne.url,file:ne.file,error:Ee}:ne});e.set({pendingImages:Y})}}};if(z===0&&w===0){t=!0;var V=!r.canNavigate||r.canNavigate();V&&e.goNext()}e.set({pendingImages:B}),j()}}};var P=e.onChange(f);return f(),{el:o,openPicker:function(){v.disabled||v.click()},destroy:function(){t=!0,v.onchange=null,P&&P()}}}var fi=150*1024*1024,xi=2,gi=60,Qa=8192,en=5,hi=3e4,bi=["video/mp4","video/quicktime"],yi="renuvex_pr_video_upload_",rn="renuvex_pr_video_cancel_",cr=null,Xa=!1,wi={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},ki={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},ge=class extends Error{constructor(r,t,a){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=a||null}};function tn(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:wi[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:ki[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function an(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function Ct(e){return new Promise(function(r){setTimeout(r,e)})}function er(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function rr(e){return Math.max(0,Math.round(er()-e))}function zi(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return hi}function Si(e,r){return new Promise(function(t,a){var n=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(n),r&&r.removeEventListener("abort",o),a(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function Et(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function Tt(e,r){return yi+pe+"_"+e+"_"+Et(r)}function nn(e,r){try{var t=window.sessionStorage.getItem(Tt(e,r)),a=t?JSON.parse(t):null;return!a||typeof a.token!="string"||!a.expiresAt||new Date(a.expiresAt).getTime()<=Date.now()?null:a}catch(n){return null}}function Ci(e,r,t){try{window.sessionStorage.setItem(Tt(e,r),JSON.stringify(t))}catch(a){}}function fr(e,r){try{window.sessionStorage.removeItem(Tt(e,r))}catch(t){}}function Ei(e,r){return rn+pe+"_"+e+"_"+Et(r)}function Ti(e,r,t,a){if(!(!e||!r||!t)){var n={token:e,productId:r,expiresAt:a||null};try{window.sessionStorage.setItem(Ei(r,t),JSON.stringify(n))}catch(i){}}}function Ai(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(rn+pe+"_")!==0)){var a=window.sessionStorage.getItem(t),n=a?JSON.parse(a):null;if(!n||typeof n.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:n.token})}}}catch(i){}return e}function $a(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function tr(e,r,t){var a=await ze(be+e,r,t||2e4),n=await a.json().catch(function(){return{}});if(!a.ok){var i=Number(a.headers.get("Retry-After"));throw new ge(n.error||"video_request_failed",a.status,Number.isFinite(i)&&i>0?i:null)}return n.data||{}}async function mr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await tr("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:rr(r.startedAt),finalStatus:t})},4e3)}catch(a){}}async function Mi(e){try{return await tr("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),$a(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?($a(e.key),!0):!1}}function et(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():cr||(cr=(async function(){for(var e=Ai(),r=0;r<e.length;r+=1)await Mi(e[r])})().finally(function(){cr=null}),cr)}function rt(){typeof window=="undefined"||Xa||(Xa=!0,window.addEventListener("online",function(){et()}),et())}async function Pi(){var e=await import("./upchunk-KBSCWYRQ.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function Ja(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var _i={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function Li(e){return _i[e]!==!0}async function Ri(e){var r=await Pi();return new Promise(function(t,a){var n=!1,i=null,o=null,l=zi(),d=null;function p(x){n||(n=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",s),d&&d(),x?a(x):t())}function m(x){n||(o&&clearTimeout(o),!(!x&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!n){e.onUploadError&&e.onUploadError("video_upload_stalled"),p(new ge("video_upload_stalled",0,null));try{i&&i.abort()}catch(c){}}},l)))}function v(){return n?!1:(m(),!0)}function u(){if(!n){e.onUploadError&&e.onUploadError("video_upload_offline"),p(new ge("video_upload_offline",0,null));try{i&&i.abort()}catch(x){}}}function s(){try{i&&i.abort()}catch(x){}p(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return a(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",s,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||Qa,attempts:e.chunkAttempts||en,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",u),d=function(){window.removeEventListener("offline",u)}),typeof navigator!="undefined"&&navigator.onLine===!1){u();return}m(),i.on("attempt",function(){v()&&e.onStatus("uploading")}),i.on("attemptFailure",function(x){if(v()){var c=x&&x.detail,f=Ja(c);if(e.onAttemptFailure&&e.onAttemptFailure(f),Li(f)){e.onUploadError&&e.onUploadError(f),p(new ge(f,0,null));try{i&&i.abort()}catch(h){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){v()}),i.on("progress",function(x){if(v()){var c=Number(x&&x.detail);if(Number.isFinite(c)){var f=Math.min(95,Math.max(0,Math.round(c*.95)));Number.isFinite(e.minProgress)&&(f=Math.max(e.minProgress,f)),e.onProgress(f)}}}),i.on("offline",u),i.on("error",function(x){if(v()){var c=x&&x.detail,f=Ja(c);e.onUploadError&&e.onUploadError(f),p(new ge(f,0,null))}}),i.on("success",function(){v()&&(e.onProgress(95),p())})})}function Ni(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function Za(e,r,t){for(var a=Date.now(),n=a+600*1e3,i=0;Date.now()<n;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-a;try{var l=await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new ge(l.errorCode||"video_processing_failed",409,null)}catch(d){if(r.aborted||d instanceof ge&&d.status===409||an(d)||(i+=1,i>=3))throw d}await Si(Ni(o),r)}throw new ge("video_processing_delayed",0,null)}async function Bi(e){for(var r=null,t=1;t<=3;t+=1)try{return await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(a){if(an(a))return null;r=a,t<3&&await Ct(400*t)}throw r||new Error("video_status_failed")}async function Fi(e,r,t,a){for(var n=10;n<=90;n+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(n),await Ct(120)}return a("processing"),await Ct(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function on(e){return!e||bi.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>fi?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function ln(e){return new Promise(function(r){var t=URL.createObjectURL(e),a=document.createElement("video"),n=!1;function i(o){if(!n){n=!0,a.removeAttribute("src");try{a.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}a.preload="metadata",a.onloadedmetadata=function(){i(Number.isFinite(a.duration)?a.duration:null)},a.onerror=function(){i(null)},a.src=t,setTimeout(function(){i(null)},8e3)})}function dn(e){return e===null?{ok:!0}:e<xi||e>gi?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function pn(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return Fi(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:er(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(x){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=x||"upload_attempt_failed")}function a(){fr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function n(x,c){var f=await Bi(x);if(!f)return{action:"discard"};if(f.status==="ready")return e.onToken&&e.onToken(x),e.onProgress(100),fr(e.productId,e.file),await mr(x,r,"ready"),{action:"return",value:Object.assign({token:x},f)};if(f.status==="uploaded"||f.status==="processing"){e.onToken&&e.onToken(x),e.onStatus("processing");var h=er(),b=await Za(x,e.signal,e.onStatus);return r.processingPollMs=rr(h),fr(e.productId,e.file),e.onProgress(100),await mr(x,r,"ready"),{action:"return",value:Object.assign({token:x},b)}}return f.status==="failed"||f.status==="aborted"?{action:"discard"}:!c||typeof c.uploadUrl!="string"||!c.uploadUrl?{action:"discard"}:{action:"upload"}}rt(),await et();var i=nn(e.productId,e.file),o=i&&i.token,l=i;if(o){var d=await n(o,l);if(d.action==="return")return d.value;d.action==="discard"&&(a(),o=null,l=null)}for(;;){if(!o){var p=await tr("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:Et(e.file)})});o=p.token,l=p,Ci(e.productId,e.file,p)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||Qa,r.chunkAttempts=l.chunkAttempts||en,e.onStatus("uploading");var m=er();try{await Ri({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+rr(m),e.onStatus("processing");var v=er();await tr("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=rr(v);var u=er(),s=await Za(o,e.signal,e.onStatus);return r.processingPollMs=rr(u),fr(e.productId,e.file),e.onProgress(100),await mr(o,r,"ready"),Object.assign({token:o},s)}catch(x){throw r.directUploadMs=(r.directUploadMs||0)+rr(m),e.signal&&e.signal.aborted?(await mr(o,r,"aborted"),x):(await mr(o,r,"failed"),x)}}}async function tt(e,r,t){var a=r&&t?nn(r,t):null;e&&r&&t&&Ti(e,r,t,a&&a.expiresAt),r&&t&&fr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(rt(),await et())}function un(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function Ii(e){return"Video Y\xFCkleniyor"}function Oi(e){return!0}function sn(e,r){r=r||{};var t=!1,a=null,n=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepMediaTitle"),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-step-subtitle",d.textContent=ce("formStepMediaSubtitle"),o.appendChild(d);var p=document.createElement("div");p.className="renuvex-pr-fwizard-media-card";var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",m.setAttribute("aria-label","Foto\u011Fraf ekle"),m.innerHTML=se(Lr)+"<span>Foto\u011Fraf Ekle</span>";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",v.setAttribute("aria-label","Video ekle"),v.innerHTML=se(Rr)+"<span>Video Ekle</span>",p.appendChild(m),p.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-content",p.appendChild(u),o.appendChild(p);var s=document.createElement("input");s.type="file",s.accept="video/mp4,video/quicktime,.mp4,.mov",s.style.display="none",o.appendChild(s);function x(){var y=e.get();return(y.images||[]).length>0||(y.pendingImages||[]).length>0}function c(){var y=e.get();return(y.images||[]).length+(y.pendingImages||[]).length}function f(){return e.get().videoUpload||null}function h(){return i+=1,i}function b(y,M){var T=f();return i===y&&!!T&&T.controller===M}function E(){if(!n){u.innerHTML="";return}n.retry.onclick=null,u.innerHTML="",n=null}function P(){a&&(a.destroy&&a.destroy(),a=null)}function k(y){P(),u.innerHTML="";var M=un(y),T=document.createElement("div");T.className=M==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":M==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var L=null,I=null,B=null,j=null,V=document.createElement("button");if(V.type="button",V.className="renuvex-pr-fwizard-video-retry",V.textContent="Tekrar dene",V.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),M==="ready"){var H=y.posterUrl||y.localUrl||"";H&&H!==y.localUrl?(L=document.createElement("img"),L.alt="",L.src=H):(L=document.createElement("video"),L.muted=!0,L.playsInline=!0,L.preload="metadata",L.src=y.localUrl||""),L.className="renuvex-pr-fwizard-video-preview",T.appendChild(L)}else M==="busy"?(j=document.createElement("div"),j.className="renuvex-pr-fwizard-video-uploading-status",j.setAttribute("role","status"),j.setAttribute("aria-live","polite"),T.appendChild(j)):I=T;if(M==="ready"){let ee=function(O){O&&(O.preventDefault(),O.stopPropagation()),C()};var W=ee,D=document.createElement("button");D.type="button",D.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",D.setAttribute("aria-label","Videoyu kald\u0131r");var q=re(ye);q&&D.appendChild(q),D.addEventListener("pointerdown",ee),D.addEventListener("click",ee),T.appendChild(D)}u.appendChild(T),n={mode:M,card:T,preview:L,previewUrl:M==="ready"&&(y.posterUrl||y.localUrl)||"",details:I,name:B,status:j,retry:V}}function S(){if(!t){var y=f();if(!y){E();return}var M=un(y),T=M==="ready"&&(y.posterUrl||y.localUrl)||"";if((!n||n.mode!==M||n.previewUrl!==T)&&k(y),n.name&&(n.name.textContent=y.file?y.file.name:"Video"),n.status&&M==="busy"){var L=Ii(y),I=Oi(y)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+L+"</span>":"<span>"+L+"</span>";n.status.innerHTML!==I&&(n.status.innerHTML=I)}var B=M==="failed"&&!!(y.error&&y.file&&y.retryable!==!1);n.retry.onclick=B?function(){z(y.file,y.localUrl,y.durationMs)}:null,B&&n.details&&!n.retry.isConnected?n.details.appendChild(n.retry):!B&&n.retry.isConnected&&n.retry.remove()}}function g(){var y=x(),M=c()>=Zr,T=!!f(),L=y||T;m.hidden=L,v.hidden=L,m.disabled=T||M,v.disabled=y||T,p.classList.toggle("renuvex-pr-fwizard-media-card--has-media",L),p.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",y),p.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",T),m.classList.toggle("renuvex-pr-fwizard-media-action--active",y),v.classList.toggle("renuvex-pr-fwizard-media-action--active",T)}function w(y){var M=f();if(M){var T=Object.keys(y),L=T.some(function(I){return M[I]!==y[I]});L&&e.set({videoUpload:Object.assign({},M,y)})}}function A(y,M,T){b(y,M)&&w(T)}async function z(y,M,T){var L=f(),I=!!(M&&L&&L.file===y),B=I?Math.max(0,Math.min(95,Number(L.progress)||0)):0,j=I?(Number(L.retryClicks)||0)+1:0,V=on(y);if(!V.ok){r.showToast&&r.showToast(V.message,"error");return}var H=M||URL.createObjectURL(y),D=Number.isFinite(T)?T:null,q=new AbortController,W=h();e.set({videoUpload:{file:y,localUrl:H,token:I&&L.token||null,status:"uploading",progress:B,durationMs:D,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:j,controller:q}}),!I&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var ee=T!==void 0?Number.isFinite(T)?T/1e3:null:await ln(y),O=dn(ee);if(!O.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:O.message});var $=await pn({file:y,productId:e.get().productId,signal:q.signal,minProgress:B,retryClicks:j,onToken:function(K){A(W,q,{token:K})},onProgress:function(K){A(W,q,{progress:K})},onStatus:function(K){A(W,q,{status:K})},onSessionReset:function(){A(W,q,{token:null,progress:0})}});if(!b(W,q))return;if($.previewOnly&&$.posterUrl&&$.posterUrl!==H)try{URL.revokeObjectURL($.posterUrl)}catch(K){}w({token:$.token,status:"ready",progress:100,posterUrl:$.previewOnly?H:$.posterUrl,durationMs:$.durationMs||(ee===null?null:Math.round(ee*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),I&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(K){if(q.signal.aborted||!b(W,q))return;var J=tn(K);if(K&&K.code==="invalid_video_duration"&&(J={code:"invalid_video_duration",message:K.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),w({status:"failed",error:J.message,errorCode:J.code,retryable:J.retryable,retryAfterSec:J.retryAfterSec,controller:null}),r.showToast){var G=J.code==="invalid_video_duration"?J.message:"Video y\xFCklenemedi";r.showToast(G,"error")}}}function C(){var y=f();y&&(h(),y.controller&&y.controller.abort(),tt(y.token,e.get().productId,y.file),r.revokeBlobUrl&&r.revokeBlobUrl(y.localUrl),e.set({videoUpload:null}))}function _(y){if(a){y&&a.openPicker&&a.openPicker();return}n=null,u.innerHTML="",a=Qr(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),u.appendChild(a.el),y&&a.openPicker&&a.openPicker()}m.onclick=function(){m.disabled||_(!0)},v.onclick=function(){v.disabled||(P(),u.innerHTML="",s.click())},s.onchange=function(){var y=s.files&&s.files[0];s.value="",y&&z(y,null,void 0)};var R=!!f(),F=e.onChange(function(){g();var y=!!f();(y||R)&&S(),R=y});return g(),x()&&_(!1),f()&&S(),{el:o,destroy:function(){t=!0,m.onclick=null,v.onclick=null,s.onchange=null,a&&a.destroy&&a.destroy(),F&&F()}}}var At=2e3,Ui=60;function vn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=ce("formStepContentTitle"),a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=Ui,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=At,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),i.appendChild(d);function p(){var v=l.value.length;d.textContent=v+"/"+At,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=At)}function m(){return Qe(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),p(),t(m())}),a.appendChild(i),p(),setTimeout(function(){t(m())},0),{el:a,destroy:function(){}}}var Vi=40;function cn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ce("formStepAuthorTitle"),n.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.maxLength=Vi,p.setAttribute("aria-required","true"),p.value=e.get().author||"",l.appendChild(d),l.appendChild(p),o.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",m.appendChild(v),m.appendChild(u),o.appendChild(m);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var x=document.createElement("div");x.className="renuvex-pr-fwizard-msg",x.setAttribute("role","alert"),x.setAttribute("aria-live","assertive"),o.appendChild(x);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),n.appendChild(o);function f(){return Qe(4,e.get())}function h(g){c.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent=g}function b(){c.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent="";var g=document.createElement("span");g.className="renuvex-pr-fwizard-video-dots",g.setAttribute("aria-hidden","true"),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span"));var w=document.createElement("span");w.textContent="Video Haz\u0131rlan\u0131yor",c.appendChild(g),c.appendChild(w)}function E(){var g=!f(),w=(e.get().pendingImages||[]).length,A=w>0,z=e.get().videoUpload,C=!!(z&&z.status==="failed"),_=!!(z&&z.status!=="ready"&&z.status!=="failed");A||_||C?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),C?h("Video Y\xFCklenemedi"):_?b():h("Foto\u011Fraflar Y\xFCkleniyor...")):(c.disabled=g,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",g),h("G\xF6nder"))}p.addEventListener("input",function(){e.set({author:p.value}),E(),t(f())}),u.addEventListener("input",function(){e.set({email:u.value})}),E(),setTimeout(function(){t(f())},0);function P(){x.textContent=""}function k(g){P();var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg-error",w.textContent=g||"",x.appendChild(w)}c.onclick=async function(){if(!c.disabled){var g=e.get(),w=(g.author||"").trim(),A=(g.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!w){k("Gerekli alan");return}if(!g.rating){k("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var z=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",P(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a()},600);return}try{var C=da(window.location.href),_=g.productName||null,R=await ze(be+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,productId:g.productId||null,slug:C||null,productName:_,author:w,title:(g.title||"").trim()||null,comment:A||null,rating:g.rating,images:g.videoUpload?[]:g.images||[],videoToken:g.videoUpload&&g.videoUpload.status==="ready"?g.videoUpload.token:null})},15e3);if(R.ok)g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a();else{var F=await R.json().catch(function(){return{}});throw new Error(F.error||"Yorum kaydedilemedi.")}}catch(T){var y=T&&(T.name==="AbortError"||/signal/i.test(T.message||"")),M=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":T.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(M,"error"):k(M),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=z}}};var S=e.onChange(E);return{el:n,destroy:function(){c.onclick=null,S&&S()}}}function Hi(e,r,t){if(t=t||{},e===1)return Ka(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return sn(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Qr(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return vn(r,{onValidityChange:t.onValidityChange});if(e===4)return cn(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function mn(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function fn(e){e=e||{},rt();var r=Ga({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:N&&N.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},a={},n={};function i(z){if(!(!z||typeof z!="string"||!z.startsWith("blob:")||n[z])){n[z]=!0;try{URL.revokeObjectURL(z)}catch(C){}}}function o(){Object.keys(a).forEach(function(C){i(C)}),Object.keys(t).forEach(function(C){i(t[C])});var z=r.get();(z.pendingImages||[]).forEach(function(C){i(C&&C.url)}),(z.images||[]).forEach(function(C){i(C)}),z.videoUpload&&i(z.videoUpload.localUrl)}function l(){var z=r.get(),C=z.videoUpload;!C||z.videoSubmitted||(C.controller&&C.controller.abort(),tt(C.token,z.productId,C.file))}var d=Wa({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",m),qr(p),l(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),p=Gr(),m=function(z){d&&d.close&&d.close()};window.addEventListener("popstate",m);var v=document.createElement("div");v.className="renuvex-pr-fwizard-step-wrap";var u=qa({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),s=document.createElement("div");s.className="renuvex-pr-fwizard-layout",s.appendChild(v),s.appendChild(u.el);var x=null,c="idle",f=null,h=!0,b=null;function E(z,C){v.innerHTML="";var _=Hi(z,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:i,onValidityChange:function(y){u.setNextDisabled(!y)},onSuccess:k,showToast:d.showToast});if(x=_,u.update(z,r.get()),C){c="entering",_.el.classList.add("renuvex-pr-fwizard-step--enter");var R=null,F=function(){R&&clearTimeout(R),_.el.removeEventListener("animationend",F),_.el.classList.remove("renuvex-pr-fwizard-step--enter"),c="idle",f!==null&&S()};_.el.addEventListener("animationend",F),R=setTimeout(F,700)}else c="idle";v.appendChild(_.el),d.setStepAttr&&d.setStepAttr(z),z===3&&u.setNextDisabled(!0)}var P=!1;function k(){if(!P){if(P=!0,!x){v.innerHTML="";var z=mn();z.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(z),d.setStepAttr("thanks"),u.setThanksState(d.close);return}var C=x;c="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var _=function(){if(b&&clearTimeout(b),C.el.removeEventListener("animationend",_),C.destroy)try{C.destroy()}catch(F){}x===C&&(x=null),v.innerHTML="";var R=mn();R.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(R),d.setStepAttr("thanks"),u.setThanksState(d.close),c="idle"};C.el.addEventListener("animationend",_),b=setTimeout(_,300)}}function S(){var z=r.get().currentStep;if(c!=="idle"){f=z;return}if(!x){var C=!h;h=!1,E(z,C);return}var _=x;c="exiting",_.el.classList.add("renuvex-pr-fwizard-step--exit");var R=function(){if(b&&clearTimeout(b),_.el.removeEventListener("animationend",R),_.destroy)try{_.destroy()}catch(y){}if(x===_){v.innerHTML="",x=null;var F=f!==null?f:r.get().currentStep;f=null,E(F,!0),c="idle"}};_.el.addEventListener("animationend",R),b=setTimeout(R,350)}S();var g=r.get().currentStep,w=r.onChange(function(z){z.currentStep!==g?(g=z.currentStep,S()):u.update(z.currentStep,z)}),A=d.close;return d.close=function(){w&&w(),typeof b!="undefined"&&b&&clearTimeout(b),A()},d.open(s),{close:d.close}}var Di=4e3;async function xn(){var e=await ze(be+"/api/public/upload/video/capability?storeId="+encodeURIComponent(pe),{method:"GET",cache:"no-store"},Di);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),a=t&&t.data;if(!a||typeof a.enabled!="boolean"){var n=new Error("video_capability_invalid");throw n.code="video_capability_invalid",n}return{enabled:a.enabled===!0,reason:typeof a.reason=="string"?a.reason:null}}var at=null;function gn(){return N&&N.videoReviewsEnabled===!0}function Yi(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return gn()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function ji(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function Wi(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:gn(),reason:null};else try{t=await xn()}catch(a){t=Yi(a)}fn({productId:Q||"",productName:Be||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function ae(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=ji(r);return at||(at=Wi(r,Ae()).finally(function(){at=null})),at.finally(t)}var hn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Gi={id:"classic",name:"Klasik (A\xE7\u0131k)"},qi=hn;function Ki(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,u=e.onSortChange;Pe(n);var s=document.createElement("div");s.className="renuvex-pr-summary";var x=(o[3]||0)+(o[4]||0),c=i>0?Math.round(x/i*100):0,f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-avg",f.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",s.appendChild(f);var h=document.createElement("div");if(h.className="renuvex-pr-summary-block renuvex-pr-summary-count",h.textContent=i.toLocaleString("tr-TR")+" "+U(a.countLabel,"Yorum"),s.appendChild(h),a.showRecommendation!==!1&&c>0){var b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",b.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",s.appendChild(b)}return s.appendChild(Je({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:d,onFilterChange:v})),s.appendChild(de({widget:r,currentOrderBy:p,currentMediaFilter:m,onWriteClick:ae,onSortChange:u})),s}var Pt={};Te(Pt,{css:()=>$i,meta:()=>Xi,render:()=>eo});var bn=`
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
`;var Xi={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},$i=bn,Ji="__unknown_product__",xr=Object.create(null);function Zi(e){return e?String(e):Ji}var He=null,gr=null;function Qi(){!He||!gr||(He.removeEventListener?He.removeEventListener("change",gr):He.removeListener&&He.removeListener(gr),He=null,gr=null)}function eo(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,u=e.onSortChange,s=Zi(t),x=document.createElement("div");x.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var f=document.createElement("div");f.className="renuvex-pr-compact-trigger-wrap";var h=document.createElement("button");h.className="renuvex-pr-compact-trigger",h.type="button",h.setAttribute("aria-expanded","false"),h.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+_e(l,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+se(oa)+"</span>";var b=h.querySelector(".renuvex-pr-compact-trigger-text"),E=h.querySelector(".renuvex-pr-compact-chevron");if(b&&(b.textContent=i.toLocaleString("tr-TR")+" "+U(a.countLabel,"Yorum")),b&&E){var P=document.createElement("span");P.className="renuvex-pr-compact-trigger-count",h.insertBefore(P,b),P.appendChild(b),P.appendChild(E)}f.appendChild(h),c.appendChild(f);var k=de({widget:r,currentOrderBy:p,currentMediaFilter:m,onWriteClick:ae,onSortChange:u}),S=k.querySelector(".renuvex-pr-filter-wrap"),g=k.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-compact-actions-slot",g&&w.appendChild(g),S&&w.appendChild(S),c.appendChild(w),x.appendChild(c);var A=document.createElement("div");A.className="renuvex-pr-compact-panel",A.setAttribute("role","dialog"),A.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),A.setAttribute("aria-hidden","true");var z=document.createElement("div");z.className="renuvex-pr-compact-panel-inner";var C=document.createElement("div");C.className="renuvex-pr-compact-avg",C.innerHTML='<span class="renuvex-pr-icon">'+ue("full")+"</span><span>"+l+"</span>",z.appendChild(C),z.appendChild(Je({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:d,onFilterChange:function(O){R()&&A.classList.contains("renuvex-pr-open")&&(xr[s]=!0),v(O)}})),A.appendChild(z);var _=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function R(){return!!(_&&_.matches)}function F(O){O?A.classList.add("renuvex-pr-open"):A.classList.remove("renuvex-pr-open"),A.setAttribute("aria-hidden",O?"false":"true"),h.setAttribute("aria-expanded",O?"true":"false")}function y(O){var $=O?x:f;if(A.parentNode!==$){var J=!!A.parentNode;A.classList.contains("renuvex-pr-open")&&F(!1),J&&(xr[s]=!1),$.appendChild(A)}}y(_?_.matches:!1);var M=de({widget:r,currentOrderBy:p,currentMediaFilter:m,onWriteClick:ae,onSortChange:u}),T=M.querySelector(".renuvex-pr-filter-wrap"),L=M.querySelector(".renuvex-pr-write-btn"),I=document.createElement("div");I.className="renuvex-pr-compact-write-row",L&&I.appendChild(L),T&&I.appendChild(T),x.appendChild(I);function B(){var O=A.classList.contains("renuvex-pr-open");return F(!1),R()&&(xr[s]=!1),O}function j(){V&&V.notifyOpening(),F(!0),R()&&(xr[s]=!0)}h.onclick=function(){A.classList.contains("renuvex-pr-open")?B():j()};var V=null;function H(O){V&&(V.unregister(),V=null),O||(V=Jr({trigger:f,element:A,close:B}))}if(H(_?_.matches:!1),Qi(),_){var D=function(O){y(O.matches),H(O.matches)};_.addEventListener?_.addEventListener("change",D):_.addListener&&_.addListener(D),He=_,gr=D}if(R()&&xr[s]&&F(!0),a.showRecommendation!==!1){var q=(o[3]||0)+(o[4]||0),W=i>0?Math.round(q/i*100):0;if(W>0){var ee=document.createElement("div");ee.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",ee.style.marginTop="8px",ee.innerHTML='<span class="renuvex-pr-recommend-pct">%'+W+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(ee)}}return x}var _t={};Te(_t,{css:()=>to,meta:()=>ro,render:()=>ao});var yn=`
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
`;var ro={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},to=yn;function ao(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentMediaFilter,m=e.onFilterChange,v=e.onSortChange;Pe(a);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(x);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),s.appendChild(c),u.appendChild(s);var f=document.createElement("div");f.className="renuvex-pr-split-col renuvex-pr-split-mid",f.appendChild(Je({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:l,onFilterChange:m})),u.appendChild(f);var h=de({widget:r,currentOrderBy:d,currentMediaFilter:p,onWriteClick:ae,onSortChange:v}),b=h.querySelector(".renuvex-pr-filter-wrap"),E=h.querySelector(".renuvex-pr-write-btn"),P=document.createElement("div");P.className="renuvex-pr-split-col renuvex-pr-split-right",E&&P.appendChild(E),b&&P.appendChild(b),u.appendChild(P);var k=(i[3]||0)+(i[4]||0),S=n>0?Math.round(k/n*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+S+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var w=t.showRecommendation===!1||S===0;return w&&g.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(g),u}var Lt={};Te(Lt,{css:()=>io,meta:()=>no,render:()=>oo});var wn=`
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
`;var no={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},io=wn;function oo(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,d=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-minimal";var m=document.createElement("div");m.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var u=document.createElement("span");u.className="renuvex-pr-minimal-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=_e(i,a),v.appendChild(s);var x=document.createElement("span");x.className="renuvex-pr-minimal-count",x.textContent=n.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),v.appendChild(x),m.appendChild(v),p.appendChild(m);var c=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),f=c.querySelector(".renuvex-pr-filter-wrap"),h=c.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-minimal-actions",h&&b.appendChild(h),f&&b.appendChild(f),p.appendChild(b);var E=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),P=E.querySelector(".renuvex-pr-filter-wrap"),k=E.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");return S.className="renuvex-pr-minimal-write-row",k&&S.appendChild(k),P&&S.appendChild(P),p.appendChild(S),p}var Rt={};Te(Rt,{css:()=>po,meta:()=>lo,render:()=>uo});var kn=`
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
`;var lo={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},po=kn;function uo(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,d=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-hero";var m=document.createElement("div");m.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var u=document.createElement("span");u.className="renuvex-pr-hero-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var x=document.createElement("span");x.className="renuvex-pr-hero-stars",x.innerHTML=_e(i,a),s.appendChild(x);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=n.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),s.appendChild(c),v.appendChild(s),m.appendChild(v),p.appendChild(m);var f=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),h=f.querySelector(".renuvex-pr-filter-wrap"),b=f.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",b&&E.appendChild(b),h&&E.appendChild(h),p.appendChild(E);var P=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),k=P.querySelector(".renuvex-pr-filter-wrap"),S=P.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");return g.className="renuvex-pr-hero-write-row",S&&g.appendChild(S),k&&g.appendChild(k),p.appendChild(g),p}var zn=`
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
`;var nt={classic:Mt,compact:Pt,split:_t,minimal:Lt,hero:Rt};function it(e){return nt[e]||nt.classic}function Sn(){var e=Object.keys(nt).map(function(r){return nt[r].css||""}).join(`
`);return zn+`
`+e}var Nt={};Te(Nt,{css:()=>vo,meta:()=>so,render:()=>co});function Re(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,a=t?Or(e.posterUrl,t):ga(e);if(!a)return null;var n=document.createElement("img"),i=e.type==="image"?Fr(a,r.sourceWidth):{src:a,srcset:xa(e.posterUrl,t)};if(n.src=i.src,i.srcset&&(n.srcset=i.srcset),n.loading=r.loading||"lazy",n.decoding="async",e.type==="image"&&n.setAttribute("data-renuvex-img-url",e.url),r.width&&(n.width=r.width),r.height&&(n.height=r.height),n.alt="",Ir(n),e.type!=="video")return n.className=r.className||"",sr(n,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),n;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",n.className="renuvex-pr-media-poster",o.appendChild(n);var l=document.createElement("span");l.className="renuvex-pr-media-play";var d=re(Rr);d&&l.appendChild(d),o.appendChild(l);var p=ha(e.durationMs);if(p){var m=document.createElement("span");m.className="renuvex-pr-media-duration",m.textContent=p,o.appendChild(m)}return sr(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function ar(e,r,t){var a=t||{},n=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,n.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",n.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:i,readMore:o}}function nr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=U(N&&N.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Cn=`
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
`;var so={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},vo=Cn;function co(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=we(e.rating,N),n.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=ke(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var p=(e.comment||"").trim();p&&t.appendChild(ar(p,"renuvex-pr-body").fragment);var m=Le(e);if(m.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",m.forEach(function(s){var x=Re(s,{className:"renuvex-pr-img",sourceWidth:le,width:le,height:le,onOpen:function(){xe(e,s.url,r)}});x&&v.appendChild(x)}),t.appendChild(v)}var u=nr(e.merchantReply);return u&&t.appendChild(u),t}var Bt={};Te(Bt,{css:()=>fo,meta:()=>mo,render:()=>xo});var En=`
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
`;var mo={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},fo=En;function xo(e,r){var t=Le(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=we(e.rating,N),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=ke(e.createdAt),i.appendChild(d),n.appendChild(i);var p=document.createElement("div");if(p.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,p.appendChild(m)}var v=(e.comment||"").trim();v&&p.appendChild(ar(v,"renuvex-pr-review-list-body").fragment);var u=nr(e.merchantReply);if(u&&p.appendChild(u),n.appendChild(p),a){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(x){var c=Re(x,{sourceWidth:le,width:le,height:Math.round(le*4/3),onOpen:function(){xe(e,x.url,r)}});c&&s.appendChild(c)}),n.appendChild(s)}return n}var Ft={};Te(Ft,{css:()=>ho,meta:()=>go,render:()=>bo});var Tn=`
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
`;var go={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},ho=Tn;function bo(e,r){var t=Ur(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=we(e.rating,N),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",i.appendChild(d);var p=document.createElement("time");p.className="renuvex-pr-review-gallery-date",p.style.display="block",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=ke(e.createdAt),i.appendChild(p);var m=(e.comment||"").trim();if(m&&i.appendChild(ar(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){xe(e,t.url,r)}}:null).fragment),n.appendChild(i),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var u=Re(t,{sourceWidth:Nr,width:Nr,height:Math.round(Nr*4/3),onOpen:function(){xe(e,t.url,r)}});u&&v.appendChild(u),n.appendChild(v)}var s=nr(e.merchantReply,t?function(){xe(e,t.url,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(s)),n}var ot={card:Nt,list:Bt,gallery:Ft};function lt(e){return ot[e]||ot.card}function An(){return Object.keys(ot).map(function(e){return ot[e].css||""}).join(`
`)}var It=0;function De(){return It++,It}function Ye(e,r){return e!==It?!1:r?!(r.productId!==void 0&&Q!==r.productId||r.orderBy!==void 0&&te!==r.orderBy||r.page!==void 0&&lr!==r.page||r.ratingFilter!==void 0&&ie!==r.ratingFilter||r.mediaFilter!==void 0&&oe!==r.mediaFilter||r.nextCursor!==void 0&&Cr!==r.nextCursor):!0}var Ot={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,mediaGalleryTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,mediaGalleryTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,mediaGalleryTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},Ut={small:80,medium:110,large:140},Vt={small:80,medium:100,large:110};function Mn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),a.appendChild(n),a.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(l),r}function Pn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var a=document.createElement("div");a.className="renuvex-pr-empty-state-stars",a.innerHTML=_e(0,e.iconPair),t.appendChild(a);var n=document.createElement("p");n.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(n),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function _n(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Ln(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function Ce(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+a+","+n+","+i+","+r+")"}function dt(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Ht(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Rn(e){return .2126*Ht(e.r)+.7152*Ht(e.g)+.0722*Ht(e.b)}function Nn(e,r){var t=Rn(e),a=Rn(r),n=Math.max(t,a),i=Math.min(t,a);return(n+.05)/(i+.05)}function yo(e){var r=dt(e)||dt("#ffffff"),t=dt("#111111"),a=dt("#ffffff");return Nn(t,r)>=Nn(a,r)?"#111111":"#ffffff"}function wo(e){return Ce(e,e==="#ffffff"?.1:.06)}function Bn(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",p=Ce(o,.06),m=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",x=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",h=r.filterMenuBgColor||"#ffffff",b=r.filterMenuBorderColor||"#e5e7eb",E=r.filterItemTextColor||"#111111",P=r.filterItemHoverBgColor||"#f3f4f6",k=r.filterItemActiveColor||"#111111",S=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",w=r.reviewDateColor||"#5e5e5e",A=r.reviewBodyColor||"#111111",z=r.reviewBorderColor||"#e5e7eb",C=Ce(A,.65),_=r.replyBgColor||"#f9fafb",R=r.replyBorderColor||"#747474",F=r.replyLabelColor||"#111111",y=r.replyTextColor||"#111111",M=r.mediaGalleryTitleColor||"#111111",T=Ce("#111111",.05),L=r.mediaGalleryArrowBgColor||"#ffffff",I=r.mediaGalleryArrowTextColor||"#111111",B=Ce("#111111",.12),j=r.reviewLightboxVideoIconColor||"#ffffff",V=r.reviewLightboxVideoProgressColor||"#ffffff",H=r.reviewLightboxVideoProgressTrackColor||"#000000",D=r.formBgColor||"#ffffff",q=r.formPrimaryTextColor||"#111111",W=r.formSecondaryTextColor||"#3b3b3b",ee=r.inputTextColor||q,O=r.inputBorderColor||"#d1d5db",$=r.placeholderColor||"#9ca3af",J=r.formStepBarColor||"#111111",G=r.formBtnBgColor||"#111111",K=r.formBtnTextColor||"#ffffff",X=r.formBtnBorderColor||"#111111",me=Ce(G,.06),hr=Ce(G,.18),ir=Ce(K,.85),Ee=Ce(q,.06),Y=yo(D),Z=wo(Y),ne=r.loadMoreBgColor||"#ffffff",Ne=r.loadMoreTextColor||"#111111",br=r.loadMoreBorderColor||"#111111",yr=r.paginationBgColor||"#ffffff",wr=r.paginationTextColor||"#111111",kr=r.paginationBorderColor||"#e5e7eb",zr=r.paginationActiveBgColor||"#111111",he=r.paginationActiveTextColor||"#ffffff",or={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":p,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":x,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":f,"--renuvex-pr-filter-menu-bg":h,"--renuvex-pr-filter-menu-border":b,"--renuvex-pr-filter-item-text":E,"--renuvex-pr-filter-item-hover-bg":P,"--renuvex-pr-filter-item-active":k,"--renuvex-pr-review-title":S,"--renuvex-pr-review-author":g,"--renuvex-pr-review-date":w,"--renuvex-pr-review-body":A,"--renuvex-pr-review-border":z,"--renuvex-pr-state-text":C,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":_,"--renuvex-pr-reply-border":R,"--renuvex-pr-reply-label":F,"--renuvex-pr-reply-text":y,"--renuvex-pr-media-gallery-title":M,"--renuvex-pr-media-gallery-image-border":T,"--renuvex-pr-media-gallery-arrow-bg":L,"--renuvex-pr-media-gallery-arrow-text":I,"--renuvex-pr-media-gallery-arrow-border":B,"--renuvex-pr-review-lightbox-video-icon":j,"--renuvex-pr-review-lightbox-video-progress":V,"--renuvex-pr-review-lightbox-video-progress-track":H,"--renuvex-pr-fwizard-bg":D,"--renuvex-pr-fwizard-text":q,"--renuvex-pr-fwizard-secondary-text":W,"--renuvex-pr-fwizard-input-bg":D,"--renuvex-pr-fwizard-input-text":ee,"--renuvex-pr-fwizard-input-border":O,"--renuvex-pr-fwizard-placeholder":$,"--renuvex-pr-fwizard-close-text":Y,"--renuvex-pr-fwizard-close-hover-bg":Z,"--renuvex-pr-fwizard-progress-bg":Ee,"--renuvex-pr-fwizard-progress-active":J,"--renuvex-pr-fwizard-btn-bg":G,"--renuvex-pr-fwizard-btn-text":K,"--renuvex-pr-fwizard-btn-border":X,"--renuvex-pr-fwizard-btn-disabled-bg":hr,"--renuvex-pr-fwizard-btn-disabled-text":ir,"--renuvex-pr-fwizard-nav-hover-bg":me,"--renuvex-pr-load-more-bg":ne,"--renuvex-pr-load-more-text":Ne,"--renuvex-pr-load-more-border":br,"--renuvex-pr-pagination-bg":yr,"--renuvex-pr-pagination-text":wr,"--renuvex-pr-pagination-border":kr,"--renuvex-pr-pagination-active-bg":zr,"--renuvex-pr-pagination-active-text":he};Object.keys(or).forEach(function(Sr){e.style.setProperty(Sr,or[Sr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Fn(e){var r=e.settings,t=e.root,a=e.currentMediaFilter||"none",n=e.openReviewModal,i=(e.mediaStripReviews||[]).filter(function(E){return Le(E).length>0});if(!(r.showMediaGallery!==!1&&a==="none"&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-media-gallery-section",r.showMediaGalleryTitle!==!1){var l=U(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),d=document.createElement("div");d.className="renuvex-pr-media-gallery-title",d.textContent=l,o.appendChild(d)}var p=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",p);var m=document.createElement("div");m.className="renuvex-pr-media-gallery-strip";var v=le,u=r.reviewLayout==="card"?le:Math.round(le*4/3),s=0;i.forEach(function(E){if(!(s>=15)){var P=Ur(E);if(P){var k=Re(P,{className:"renuvex-pr-media-gallery-thumb",sourceWidth:le,width:v,height:u,loading:s<3?"eager":"lazy",onOpen:function(){n(E,P.url,i)}});k&&(m.appendChild(k),s++)}}});var x=document.createElement("button");x.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-prev";var c=re(We);c&&x.appendChild(c),x.setAttribute("aria-label","\xD6nceki"),x.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var f=document.createElement("button");f.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-next";var h=re(_r);h&&f.appendChild(h),f.setAttribute("aria-label","Sonraki"),f.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var b=document.createElement("div");return b.className="renuvex-pr-media-gallery-strip-wrap",b.appendChild(x),b.appendChild(m),b.appendChild(f),o.appendChild(b),o}var ko=1,zo=7,Dt="\u2026";function So(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=zo){for(var n=[],i=1;i<=t;i++)n.push(i);return n}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-a)<=ko)&&o.push(l);for(var d=[],p=0;p<o.length;p++)p>0&&o[p]-o[p-1]>1&&d.push(Dt),d.push(o[p]);return d}function In(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},n=document.createElement("nav");n.className="renuvex-pr-pagination",n.setAttribute("aria-label","Yorum sayfalar\u0131");function i(d){n.setAttribute("aria-busy","true");for(var p=n.querySelectorAll("button"),m=0;m<p.length;m++)p[m].disabled=!0;a(d)}function o(d,p){var m=document.createElement("span");m.className="renuvex-pr-pagination-label",m.setAttribute("aria-hidden","true"),m.textContent=p,d.appendChild(m)}function l(d,p,m,v){var u=document.createElement("button");return u.type="button",u.className="renuvex-pr-pagination-arrow",u.setAttribute("aria-label",d),o(u,p),v?u.disabled=!0:u.onclick=function(){i(m)},u}return n.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),So(t,r).forEach(function(d){if(d===Dt){var p=document.createElement("span");p.className="renuvex-pr-pagination-gap",p.setAttribute("aria-hidden","true"),p.textContent=Dt,n.appendChild(p);return}var m=document.createElement("button");m.type="button",m.className="renuvex-pr-pagination-btn",m.setAttribute("aria-label","Sayfa "+d),o(m,String(d)),d===t?m.setAttribute("aria-current","page"):m.onclick=function(){i(d)},n.appendChild(m)}),n.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),n}function On(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Un(e){var r=e.render;async function t(){var o=De(),l=Q,d=te,p=ie,m=oe;Me(null);var v=await Ue(Q,te,1,ie,oe);Ye(o,{productId:l,orderBy:d,ratingFilter:p,mediaFilter:m})&&await r(Q,N,v,Be,te,1,Wt)}async function a(o){var l=De(),d=ie===o?null:o,p=Q,m=te,v=oe;Kt(d),Fe(1),Me(null);var u=await Ue(Q,te,1,d,oe);Ye(l,{productId:p,orderBy:m,page:1,ratingFilter:d,mediaFilter:v})&&await r(Q,N,u,Be,te,1)}async function n(o,l){var d=De(),p=Q,m=ie;Fe(1),Me(null);var v=o,u=l==="images"||l==="media"?l:"none";u!=="none"&&(v="newest"),Xt(u),Er(v);var s=await Ue(Q,v,1,ie,u);Ye(d,{productId:p,orderBy:v,page:1,ratingFilter:m,mediaFilter:u})&&await r(Q,N,s,Be,v,1)}async function i(o){var l=De(),d=Q,p=te,m=ie,v=oe;Fe(o),Me(null);var u=await Ue(Q,te,o,ie,oe);if(Ye(l,{productId:d,orderBy:p,page:o,ratingFilter:m,mediaFilter:v})){await r(Q,N,u,Be,te,o);var s=document.getElementById("renuvex-reviews"),x=s&&s.shadowRoot,c=x&&x.querySelector&&x.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(b){try{c.focus()}catch(E){}}On(x,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var f=document.getElementById("renuvex-reviews");if(f&&typeof f.scrollIntoView=="function"){var h=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;f.scrollIntoView({behavior:h?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:n,onPageChange:i}}function Co(){return ma()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Eo(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=va({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),ca(t,{surface:"reviews",productId:r||""}),t}function Vn(e){return Math.round(Math.max(36,Math.min(52,e*.38)))}function Hn(e){return Math.round(e*.5)}async function Yt(e,r,t,a,n,i,o){if(na){Mr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:i,badgeSettings:o});return}Ar(!0),$t(e),Jt(r),o!==void 0&&Zt(o),Qt(a),n&&Er(n),i&&Fe(i),t!=null&&(ea(t),Me(t&&t.data?t.data.nextCursor:null));var l=Un({render:Yt});try{let Ee=function(Y,Z){if(!(!Y||!Y.meta||!Y.meta.sizeOverrides)){var ne=Y.meta.sizeOverrides[Z];ne&&Object.keys(ne).forEach(function(Ne){s.style.setProperty(Ne,ne[Ne])})}};var hr=Ee,d=it(r.summaryLayout),p=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),m=r.showTitle!==!1,v=U(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),u=p&&m?v:"",s=document.documentElement;Bn(s,r);var x=r.borderRadius!==void 0?r.borderRadius:8,c=Ot[r.size]||Ot.medium,f=Ut[r.thumbnailSize]||Ut.medium,h=f;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(h=Vt[r.thumbnailSize]||Vt.medium),s.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",x+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,x-4)+"px"),s.style.setProperty("--renuvex-pr-media-gallery-title-size",c.mediaGalleryTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-load-more-min-height",c.loadMoreMinHeight+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-y",c.loadMorePadY+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-x",c.loadMorePadX+"px"),s.style.setProperty("--renuvex-pr-load-more-mobile-min-height",c.loadMoreMobileMinHeight+"px"),s.style.setProperty("--renuvex-pr-pagination-button-size",c.paginationButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-pad-x",c.paginationPadX+"px"),s.style.setProperty("--renuvex-pr-pagination-gap",c.paginationGap+"px"),s.style.setProperty("--renuvex-pr-pagination-margin-top",c.paginationMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-gap-min",c.paginationGapMin+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-button-size",c.paginationMobileButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-font-size",c.paginationMobileFontSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap",c.paginationMobileGap+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",c.paginationMobileMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",c.paginationMobileGapMin+"px"),s.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",f+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",h+"px");var b=Vn(f),E=Vn(h);s.style.setProperty("--renuvex-pr-media-play-size",b+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size",Hn(b)+"px"),s.style.setProperty("--renuvex-pr-media-play-size-mobile",E+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size-mobile",Hn(E)+"px");var P=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",P),s.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),Ee(it(r.summaryLayout),r.size),Ee(lt(r.reviewLayout),r.size);var k=dr(r),S=Co();if(!S)return;var g=Eo(S,e),w=document.getElementById("renuvex-reviews");w||(w=document.createElement("div"),w.id="renuvex-reviews",w.style.minHeight="200px"),w.parentNode!==g&&g.appendChild(w);var A=ba(w),z=Ge+je+Hr+Sn()+An();qe(A,z);var C=wa(A);if(r.enabled===!1){w.style.minHeight="auto",C.replaceChildren(Mn(r.borderRadius!==void 0?r.borderRadius:8)),Ar(!1);var _=Tr;Mr(null),_&&Yt(_.productId,_.settings,_.reviewsData,_.productName,_.orderBy,_.page,_.badgeSettings);return}try{var R=t||{},F=mt(R),y=F?[]:R.data&&R.data.reviews||[];ra(y),C.replaceChildren();var M=document.createElement("section");if(M.id="renuvex-reviews-widget",M.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),M.className="renuvex-pr-reviews-widget",M.setAttribute("data-renuvex-surface","reviews"),e&&M.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(M.style.width="100%",M.style.maxWidth="100%",M.style.marginLeft="0",M.style.marginRight="0"),u){var T=document.createElement("div"),L=r.summaryLayout||"classic";T.className="renuvex-pr-title renuvex-pr-title-"+L,T.textContent=u,M.appendChild(T)}if(F){M.appendChild(Ln(R.message,l.onRetry)),C.appendChild(M),Ie(A),ut(M,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return A.getElementById("renuvex-reviews-widget")});return}var I=R.data&&R.data.allCount||0,B=R.data&&R.data.ratingCounts||null,j=B||[0,0,0,0,0],V=R.data&&R.data.avgRating||"0.0";if(!B&&y.length>0){y.forEach(function(Y){Y.rating>=1&&Y.rating<=5&&j[Y.rating-1]++});var H=y.reduce(function(Y,Z){return Y+Z.rating},0);V=(H/y.length).toFixed(1)}if(I===0)M.classList.add("renuvex-pr-reviews-empty"),M.appendChild(Pn({iconPair:k,writeButtonText:U(r.writeButtonText,"Yorum Yap"),emptyStateText:U(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:ae}));else{var D=it(r.summaryLayout),q=D.render({widget:M,productId:e,data:R,settings:r,iconPair:k,allCount:I,ratingCounts:j,avgRatingVal:V,currentRatingFilter:ie,currentOrderBy:te,currentMediaFilter:oe,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});M.appendChild(q);var W=Fn({settings:r,root:s,currentMediaFilter:oe,mediaStripReviews:qt,openReviewModal:xe,wireLightboxTrigger:sr});if(W&&M.appendChild(W),y.length===0)M.appendChild(_n());else{var ee=lt(r.reviewLayout);y.forEach(function(Y){M.appendChild(ee.render(Y,st))})}var O=r.paginationMode==="numbered"?"numbered":"loadMore";if(O==="numbered"){var $=R.data&&R.data.totalPages||1;$>1&&M.appendChild(In({page:R.data&&R.data.page||lr||1,totalPages:$,onPageChange:l.onPageChange}))}var J=O==="loadMore"&&R.data&&R.data.hasMore;if(J){let Y=function(Z){K.textContent=Z,G.setAttribute("aria-label",Z)};var ir=Y,G=document.createElement("button");G.className="renuvex-pr-load-more";var K=document.createElement("span");K.className="renuvex-pr-load-more-label",K.setAttribute("aria-hidden","true"),G.appendChild(K),Y("Daha Fazla G\xF6ster"),G.onclick=async function(){G.disabled=!0,Y("Y\xFCkleniyor...");var Z=De(),ne=Q,Ne=te,br=lr,yr=ie,wr=oe,kr=Cr,zr=br+1,he=await Ue(ne,Ne,zr,yr,wr,null,kr);if(Ye(Z,{productId:ne,orderBy:Ne,page:br,ratingFilter:yr,mediaFilter:wr,nextCursor:kr}))if(he&&!mt(he)&&he.data&&Array.isArray(he.data.reviews)){var or=ta(he.data.reviews);aa(or),Fe(zr),Me(he.data.nextCursor||null);var Sr=lt(N.reviewLayout);or.forEach(function(Dn){M.insertBefore(Sr.render(Dn,st),G)}),he.data.hasMore?(G.disabled=!1,Y("Daha Fazla G\xF6ster")):G.remove()}else G.disabled=!1,Y("Tekrar Dene")},M.appendChild(G)}}C.appendChild(M),Ie(A),ut(M,"reviews-widget",{productId:e||""},function(){return A.getElementById("renuvex-reviews-widget")})}catch(Y){console.error("[renuvex-pr] render error:",Y);var X=document.createElement("p");X.style.cssText="text-align:center;color:#dc2626;",X.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(X)}}finally{if(Ar(!1),Tr){var me=Tr;Mr(null),Yt(me.productId,me.settings,me.reviewsData,me.productName,me.orderBy,me.page,me.badgeSettings)}}}export{Yt as render};
