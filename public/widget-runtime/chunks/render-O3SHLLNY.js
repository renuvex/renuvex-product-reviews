/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as ga,b as Xe,c as Hr,d as Ne,e as fe,f as ha,g as Vr,i as xt,j as Ve}from"./chunk-X5ZUCYSI.js";import{c as Ee}from"./chunk-WWGCW5YN.js";import{a as Ge,d as Pe}from"./chunk-N7KC6W47.js";import{A as aa,B as na,C as ia,D as oa,E as Rr,F as Nr,G as Br,a as te,b as sr,c as ie,d as oe,e as ee,f as B,g as qt,h as Ie,j as _r,k as ct,l as Kt,m as Xt,n as Lr,o as Oe,p as $t,q as Jt,r as Zt,s as Qt,t as ea,u as ra,v as ta,w as _e}from"./chunk-XNOOKDBR.js";import{c as vt,e as ma,f as fa}from"./chunk-N6V64Y5U.js";import{A as Ur,B as Ce,C as mt,D as ft,E as cr,F as ca,G as mr,a as Le,b as ue,c as se,d as re,e as Ue,f as Fr,g as vr,h as la,i as qe,j as Ir,k as da,l as ke,m as Or,n as pa,o as Ke,q as Y,r as ua,s as ze,t as Re,v as sa,w as Se,x as va,z as le}from"./chunk-TRRHE6OG.js";import{a as pe,b as we,h as xa,i as He}from"./chunk-UOBLDAJF.js";import"./chunk-W53BN4EO.js";import{a as st,b as Gt,d as Me}from"./chunk-D4BSMMIO.js";var $e=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function ba(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Je(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Dr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function ya(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function wa(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var ka=`
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
  .renuvex-pr-modal-thumb-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(0,0,0,.20);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-modal-thumb-play svg{width:12px;height:12px;margin-left:1px;}
  .renuvex-pr-modal-thumb-duration{position:absolute;right:3px;bottom:3px;padding:2px 4px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:10px;line-height:1;pointer-events:none;}
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
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:var(--renuvex-pr-media-play-size,42px);height:var(--renuvex-pr-media-play-size,42px);border-radius:50%;background:rgba(0,0,0,.20);color:var(--renuvex-pr-review-lightbox-video-icon,#ffffff);pointer-events:none;}
  .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size,21px);height:var(--renuvex-pr-media-play-icon-size,21px);margin-left:2px;}
  @media(max-width:640px){
    .renuvex-pr-media-play{width:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));height:var(--renuvex-pr-media-play-size-mobile,var(--renuvex-pr-media-play-size,42px));}
    .renuvex-pr-media-play svg{width:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));height:var(--renuvex-pr-media-play-icon-size-mobile,var(--renuvex-pr-media-play-icon-size,21px));}
  }
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Yr=[ka,sa,Sa,Ca,Ea,Ta,Ma,Aa,za].join(`
`);function Gn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function xe(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function qn(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function Kn(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",i=qn()&&!n;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Xn(e){var r=document.body.style,t=document.documentElement.style;xe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),xe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),xe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),xe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),xe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),xe(r,"position",e.bodyPosition,e.bodyPositionPriority),xe(r,"top",e.bodyTop,e.bodyTopPriority),xe(r,"left",e.bodyLeft,e.bodyLeftPriority),xe(r,"right",e.bodyRight,e.bodyRightPriority),xe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var fr=0,Ze=null;function jr(){return fr+=1,fr>1||(Ze=Gn(),Kn(Ze)),Ze}function Wr(){if(fr!==0&&(fr-=1,!(fr>0))){var e=Ze;Ze=null,e&&Xn(e)}}function $n(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Gr(){var e=$n();return!e||e===document.body||e===document.documentElement?null:e}function ve(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Jn(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function gt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Jn)}function Zn(e,r){var t=e,a=gt(e);!a.length&&r&&(t=r,a=gt(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;ve(n)}function qr(e,r,t){if(e.key==="Tab"){var a=gt(r);if(!a.length){e.preventDefault(),Zn(r);return}var n=a[0],i=a[a.length-1],o=ya(t);if(!r.contains(o)){e.preventDefault(),ve(n);return}if(a.indexOf(o)===-1){e.preventDefault(),ve(e.shiftKey?i:n);return}e.shiftKey&&o===n?(e.preventDefault(),ve(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ve(n))}}var Pa="renuvexPrOverlay";function Kr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Pa]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Qn(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Pa]===e.id)}function Xr(e){if(Qn(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}var ei="media-theme-renuvex-review-storefront";var _a="renuvex-review-storefront",Qe={controlForeground:"#ffffff",controlBackground:"#000000",controlHoverBackground:"rgba(0,0,0,0.84)",centerPlayButtonBackground:"rgba(0,0,0,0.68)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.72)",controlsBackdrop:"rgba(0,0,0,0.58)",menuBackground:"#000000",menuBorder:"rgba(255,255,255,0.18)",menuText:"#ffffff",menuCheckedText:"#ffffff",menuHoverBackground:"rgba(255,255,255,0.12)",menuCheckedBackground:"rgba(255,255,255,0.18)",menuHoverOutline:"rgba(255,255,255,0.54) solid 1px",progressPlayed:"#ffffff",progressTrack:"#000000",progressPointer:"rgba(255,255,255,0.72)",progressBuffered:"rgba(255,255,255,0.28)",progressThumbBorder:"1px solid rgba(255,255,255,0.72)",progressThumbShadow:"0 0 0 1px rgba(0,0,0,0.45)",progressPointerBorder:"1px solid rgba(0,0,0,0.55)"};function $r(e,r){return`var(--renuvex-pr-review-lightbox-video-${e}, ${r})`}var ri=st({},Qe),xr=Gt(st({},Qe),{controlForeground:$r("icon",Qe.controlForeground),centerPlayButtonBackground:"rgba(0,0,0,0.20)",centerPlayButtonHoverBackground:"rgba(0,0,0,0.28)",progressPlayed:$r("progress",Qe.progressPlayed),progressTrack:$r("progress-track",Qe.progressTrack),progressThumbBorder:`1px solid ${$r("progress",Qe.progressPlayed)}`}),Jr=null;function La(e){return`
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
`}var ol=La(ri),ti=La(xr);function ai(e,r){var d;if(typeof window=="undefined"||typeof document=="undefined")return;let t=window.customElements;if(t.get(e))return;let a=t.get("media-theme-gerwig"),n=a==null?void 0:a.template;if(!a||!(n instanceof HTMLTemplateElement))return;let i=n.cloneNode(!0);i.id=e,(d=i.content.querySelector("media-controller"))==null||d.setAttribute("lang","tr");let o=document.createElement("style");o.textContent=r,i.content.append(o);class l extends a{}l.template=i,t.define(e,l)}function ni(e,r){return typeof window=="undefined"?Promise.resolve():(Jr!=null||(Jr=import("./review-player-i18n-775ENPF7.js").then(()=>import("./dist-ESXZERR5.js")).then(()=>import("./menu-ZPT7P4I2.js")).then(()=>import("./gerwig-J4LRWRX2.js")).then(()=>import("./dist-F5RX6YFS.js")).then(()=>{})),Jr.then(()=>{ai(e,r)}))}function Ra(){return ni(ei,ti)}var bt=null,Fa="--center-play-button";function ii(){return bt||(bt=Ra()),bt}function oi(e){return new Promise(function(r){function t(a){if(a<=0){r();return}requestAnimationFrame(function(){t(a-1)})}t(e)})}function li(e){e.style.setProperty(Fa,"none")}function Na(e){e.style.removeProperty(Fa)}function di(e){if(!e||typeof e!="object")return"";var r=typeof e.playbackId=="string"?e.playbackId.trim():"",t=ga(e.url);return r&&t&&r!==t?"":r||t}function pi(e,r){var t=di(r);if(!t)return!1;var a=Xe(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"";return e.setAttribute("disable-tracking",""),e.setAttribute("disable-cookies",""),e.setAttribute("preload","metadata"),e.setAttribute("stream-type","on-demand"),e.setAttribute("muted",""),e.setAttribute("playsinline",""),e.setAttribute("nohotkeys",""),e.setAttribute("lang","tr"),e.setAttribute("theme",_a),e.setAttribute("accent-color",xr.controlForeground),e.setAttribute("primary-color",xr.controlForeground),e.setAttribute("secondary-color",xr.controlBackground),a&&e.setAttribute("poster",a),e.setAttribute("playback-id",t),!0}function Ba(e){e.preventDefault()}function Ia(e,r){var t=!1,a=document.createElement("mux-player");a.className=r||"renuvex-pr-modal-main-video",a.setAttribute("aria-label","Yorum videosu"),li(a),a.addEventListener("contextmenu",Ba);var n=pi(a,e);return n?ii().then(function(){if(window.customElements&&typeof window.customElements.whenDefined=="function")return window.customElements.whenDefined("mux-player")}).then(function(){if(!t){try{typeof a.pause=="function"&&a.pause()}catch(i){}return oi(2)}}).then(function(){t||Na(a)}).catch(function(){t||a.dispatchEvent(new Event("error"))}):setTimeout(function(){t||a.dispatchEvent(new Event("error"))},0),{element:a,cleanup:function(){t=!0;try{typeof a.pause=="function"&&a.pause()}catch(o){}a.removeAttribute("playback-id"),a.removeAttribute("playback-token"),a.removeAttribute("thumbnail-token"),a.removeAttribute("poster"),Na(a),a.removeEventListener("contextmenu",Ba)}}}function er(e){return Ne(e)}function Ua(e){return e&&e.source==="mediaGallery"}function ui(e,r){if(!Ua(r))return er(e);var t=fe(e);return t?[t]:[]}function si(e,r){return(e||[]).filter(function(t){return r==="mediaGallery"?!!fe(t):er(t).length>0})}function wt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function Oa(e,r,t,a,n,i){e&&e.shadowRoot&&wt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Wr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Fr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ve(n)}function vi(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ze(e.rating,B);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=Se(e.createdAt),a.appendChild(n),a.appendChild(i),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=Y(B&&B.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",u.appendChild(m),u.appendChild(v),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Ha(e,r,t){var a=t||B,n=e.querySelector(".renuvex-pr-modal-scroll-content"),i=n.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ze(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=Se(r.createdAt);var o=n.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=n.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=Y(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}var ci=112;function kt(e){return e&&e.touches&&e.touches.length?e.touches[0]:e&&e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null}function mi(e){var r=e&&e.target;return!!(r&&typeof r.closest=="function"&&r.closest(".renuvex-pr-modal-thumbs"))}function fi(e,r,t){if(!r||r.type!=="video"||!t)return!1;var a=kt(e);if(!a)return!1;var n=t.querySelector("mux-player.renuvex-pr-modal-main-video");if(!n||typeof n.getBoundingClientRect!="function")return!1;var i=n.getBoundingClientRect();if(!i.width||!i.height||a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom)return!1;var o=Math.min(ci,Math.max(72,i.height*.2));return a.clientY>=i.bottom-o}function xi(e){var r=e&&e.type==="video"?e.posterUrl:e&&e.url;if(e&&e.type==="video"){var t={width:Ce,height:Ce,fit:"crop"};return{src:Xe(r,t),srcset:Hr(r,t)}}return cr(r,Ce)}function gi(e,r,t){var a=e&&e.media;if(!a)return null;var n=document.createElement("button");n.type="button",n.className="renuvex-pr-modal-thumb renuvex-pr-modal-thumb-button"+(a.type==="video"?" renuvex-pr-modal-thumb-video":"")+(r?" renuvex-pr-modal-thumb-active":""),n.setAttribute("aria-label","Galeri medyas\u0131 "+(e.index+1)+" se\xE7"),r&&n.setAttribute("aria-current","true");var i=document.createElement("img");i.className="renuvex-pr-modal-thumb-img";var o=xi(a);if(i.src=o.src,o.srcset&&(i.srcset=o.srcset),i.loading="lazy",i.decoding="async",i.width=Ce,i.height=Ce,i.alt="",mr(i),n.appendChild(i),a.type==="video"){var l=document.createElement("span");l.className="renuvex-pr-modal-thumb-play";var d=re(Ke);d&&l.appendChild(d),n.appendChild(l);var u=Vr(a.durationMs);if(u){var m=document.createElement("span");m.className="renuvex-pr-modal-thumb-duration",m.textContent=u,n.appendChild(m)}}return n.onclick=t,n}function hi(e){var r=[];return(e||[]).forEach(function(t,a){var n=fe(t);n&&r.push({review:t,reviewIdx:a,media:n,index:r.length})}),r}function zt(e,r,t,a,n,i,o,l,d){var u=ui(e,d),m=Math.max(0,Math.min(t||0,u.length-1)),v=u[m],p=document.createElement("div");p.className="renuvex-pr-modal-left";var s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(v&&v.type==="video"){var x=Ia(v,"renuvex-pr-modal-main-video"+(s?" renuvex-pr-modal-video-enter":"")),c=x.element;c.addEventListener("error",function(){if(!p.querySelector(".renuvex-pr-modal-img-error")){var L=document.createElement("div");L.className="renuvex-pr-modal-img-error",L.setAttribute("role","status"),L.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",p.insertBefore(L,c)}});var f=function(){p.classList.add("renuvex-pr-modal-left-video-playing")},b=function(){p.classList.remove("renuvex-pr-modal-left-video-playing")};c.addEventListener("play",f),c.addEventListener("playing",f),c.addEventListener("pause",b),c.addEventListener("ended",b),p.__renuvexMediaCleanup=function(){c.removeEventListener("play",f),c.removeEventListener("playing",f),c.removeEventListener("pause",b),c.removeEventListener("ended",b),b(),x.cleanup()},p.appendChild(c)}else{var h=document.createElement("img");if(h.className="renuvex-pr-modal-main-img"+(s?" "+s:""),h.src=ft(v?v.url:""),h.decoding="async",h.width=mt,h.height=Math.round(mt*4/3),h.alt="Yorum foto\u011Fraf\u0131",!s){h.classList.add("renuvex-pr-modal-img-loading");var E=function(){h.classList.remove("renuvex-pr-modal-img-loading")};h.complete&&h.naturalWidth>0?E():(h.addEventListener("load",E,{once:!0}),h.addEventListener("error",E,{once:!0}))}ca(h,function(L){if(L.style.display="none",!p.querySelector(".renuvex-pr-modal-img-error")){var R=document.createElement("div");R.className="renuvex-pr-modal-img-error",R.setAttribute("role","status"),R.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",p.insertBefore(R,L)}}),p.appendChild(h)}var A=document.createElement("button");A.className="renuvex-pr-modal-close-mobile";var z=re(ke);z&&A.appendChild(z),A.setAttribute("aria-label","Kapat"),A.onclick=function(L){L.stopPropagation(),i()},p.appendChild(A);var C=0,g=!1,k=!1;if(p.addEventListener("touchstart",function(L){var R=kt(L);R&&(k=mi(L),C=R.clientX,g=!k&&fi(L,v,p))},{passive:!0}),p.addEventListener("touchend",function(L){if(k){k=!1,g=!1;return}if(g){g=!1;return}var R=kt(L);if(R){var V=C-R.clientX;if(!(Math.abs(V)<50)){if(V>0){if(_)ge(e,r,m+1,a,n,i,!0,"next",l,d);else if(y){var I=a[r+1];ge(I,r+1,0,a,n,i,!1,"next",l,d)}}else if(T)ge(e,r,m-1,a,n,i,!0,"prev",l,d);else if(O){var D=a[r-1],K=er(D);ge(D,r-1,K.length-1,a,n,i,!1,"prev",l,d)}}}},{passive:!0}),Ua(d)){var M=hi(a);if(M.length>1){var w=document.createElement("div");w.className="renuvex-pr-modal-thumbs renuvex-pr-modal-thumbs--gallery",M.forEach(function(L){var R=gi(L,L.reviewIdx===r,function(){ge(L.review,L.reviewIdx,0,a,n,i,!1,null,l,d)});R&&w.appendChild(R)}),p.appendChild(w)}}else if(u.length>1){var S=document.createElement("div");S.className="renuvex-pr-modal-thumbs",u.forEach(function(L,R){var V=L.type==="video"?L.posterUrl:L.url,I=document.createElement("img"),D=cr(V,Ce);I.src=D.src,I.srcset=D.srcset,I.loading="lazy",I.decoding="async",I.width=Ce,I.height=Ce,I.className="renuvex-pr-modal-thumb"+(R===m?" renuvex-pr-modal-thumb-active":""),I.alt="K\xFC\xE7\xFCk resim "+(R+1),mr(I),I.tabIndex=0,I.setAttribute("role","button"),I.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(R+1)+" se\xE7"),R===m&&I.setAttribute("aria-current","true"),(function(K){function U(){ge(e,r,K,a,n,i,!0,null,l,d)}I.onclick=U,I.onkeydown=function(G){(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),U())}})(R),S.appendChild(I)}),p.appendChild(S)}var T=m>0,_=m<u.length-1,O=r>0,y=r<a.length-1,P=T||O,N=_||y;if(P){var F=document.createElement("button");F.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var H=re(qe);H&&F.appendChild(H),F.setAttribute("aria-label","\xD6nceki"),F.onclick=function(L){if(L.stopPropagation(),T)ge(e,r,m-1,a,n,i,!0,"prev",l,d);else if(O){var R=a[r-1],V=er(R);ge(R,r-1,V.length-1,a,n,i,!1,"prev",l,d)}},p.appendChild(F)}if(N){var W=document.createElement("button");W.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var X=re(Ir);X&&W.appendChild(X),W.setAttribute("aria-label","Sonraki"),W.onclick=function(L){if(L.stopPropagation(),_)ge(e,r,m+1,a,n,i,!0,"next",l,d);else if(y){var R=a[r+1];ge(R,r+1,0,a,n,i,!1,"next",l,d)}},p.appendChild(W)}return p}function Va(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=er(a);n[0]&&n[0].type==="image"&&(new Image().src=ft(n[0].url))}})}function yt(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function bi(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){yt(t),yt(a),yt(n)}i(),t&&ve(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function ge(e,r,t,a,n,i,o,l,d,u){if(u&&(u.currentReview=e),o){var m=zt(e,r,t,a,n,i,l,d,u);n.firstChild&&(wt(n.firstChild),n.replaceChild(m,n.firstChild))}else{var m=zt(e,r,t,a,n,i,l,d,u),v=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&(wt(n.firstChild),n.replaceChild(m,n.firstChild)),v&&Ha(v,e,u&&u.currentSettings),bi(d,n)}Va(r,a)}function he(e,r,t,a){var n=a&&a.source==="mediaGallery"?"mediaGallery":"review",i=n==="mediaGallery"?fe(e)?[fe(e)]:[]:er(e);if(!i.length)return;var o=si(t,n),l=o.findIndex(function(w){return w===e||w.id===e.id});l===-1&&(o.unshift(e),l=0);var d=i.findIndex(function(w){return w.url===r});d<0&&(d=0);var u=document.createElement("div");u.className="renuvex-pr-modal-overlay";var m=document.createElement("div");m.className="renuvex-pr-modal";var v=!1,p=null,s=Gr(),x=Pe(),c=jr(),f=Kr(),b={currentReview:e,currentSettings:B,source:n},h=null;function E(w){var S=w&&w.detail&&w.detail.settings;if(!(S&&S===h)){h=S||null,b.currentSettings=S||B;var T=m.querySelector(".renuvex-pr-modal-right");!T||!b.currentReview||Ha(T,b.currentReview,b.currentSettings)}}function A(){v||(v=!0,window.removeEventListener(He,E),Oa(p&&p.host,z,A,c,s,x))}function z(w){if(w.key==="Escape"){C();return}qr(w,u,p&&p.root)}function C(){v||(v=!0,window.removeEventListener(He,E),Oa(p&&p.host,z,A,c,s,x),Xr(f))}document.addEventListener("keydown",z),window.addEventListener("popstate",A),window.addEventListener(He,E),u.onclick=function(){C()},m.onclick=function(w){w.stopPropagation()},m.appendChild(zt(e,l,d,o,m,C,null,u,b)),m.appendChild(vi(e)),Va(l,o);var g=document.createElement("div");g.className="renuvex-pr-modal-wrap",g.tabIndex=-1,g.setAttribute("role","dialog"),g.setAttribute("aria-modal","true"),g.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),g.appendChild(m);var k=document.createElement("button");k.className="renuvex-pr-modal-close";var M=re(ke);M&&k.appendChild(M),k.setAttribute("aria-label","Kapat"),k.onclick=function(w){w.stopPropagation(),C()},g.appendChild(k),u.appendChild(g),p=Dr(),Je(p.root,$e+Ge+Yr),p.root.appendChild(u),Ue(p.root),ve(g)}function gr(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var _t={};Me(_t,{css:()=>no,meta:()=>ao,render:()=>io});function rr(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,i=e.onFilterChange;Le(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var d=r[l-1]||0,u=t>0?Math.round(d/t*100):0,m=n===l,v=d>0,p=Y(B&&B.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(m?" renuvex-pr-bar-active":"")+(n&&!m?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",m?"true":"false"),s.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" "+p+", "+(m?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+p);for(var x="",c=1;c<=5;c++){var f=c<=l;x+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(f?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ue(f?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+x+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",v&&(function(b){function h(){i(b)}s.onclick=h,s.onkeydown=function(E){(E.key==="Enter"||E.key===" "||E.key==="Space"||E.key==="Spacebar")&&(E.preventDefault(),h())}})(l),o.appendChild(s)}return o}var ja="data-renuvex-pr-dismiss-gesture",De=[],Da=!1,Zr=!1,hr=[],tr=null;function Ya(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function St(){for(var e=De.length-1;e>=0;e--){var r=De[e].element;r&&r.isConnected===!1&&De.splice(e,1)}return De}function yi(e){!e||typeof e.setAttribute!="function"||(hr.indexOf(e)===-1&&hr.push(e),e.setAttribute(ja,""))}function Wa(){for(var e=0;e<hr.length;e++){var r=hr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(ja)}hr=[],tr&&typeof clearTimeout=="function"&&clearTimeout(tr),tr=null}function wi(e){if(Zr){Zr=!1,Wa(),e.preventDefault(),e.stopPropagation();return}for(var r=St(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Ya(e,n.trigger)||Ya(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function ki(e){if(e.key==="Escape")for(var r=St(),t=r.length-1;t>=0;t--)r[t].close()}function Ga(){Da||typeof document=="undefined"||(document.addEventListener("click",wi,!0),document.addEventListener("keydown",ki),Da=!0)}function zi(e){Ga(),Zr=!0,yi(e),tr&&typeof clearTimeout=="function"&&clearTimeout(tr),typeof setTimeout=="function"&&(tr=setTimeout(function(){Zr=!1,Wa()},700))}function Ct(e){zi(e)}function Qr(e){Ga();var r={trigger:e.trigger,element:e.element,close:e.close};return De.push(r),{unregister:function(){var t=De.indexOf(r);t!==-1&&De.splice(t,1)},notifyOpening:function(){for(var t=St(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function de(e){var r=e.widget,t=e.currentOrderBy,a=e.currentMediaFilter||"none",n=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=Y(B&&B.writeButtonText,"Yorum Yap"),l.onclick=n,o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var m=B&&B.filterIcon||"lines";u.innerHTML=se(la(m));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var p=Kt===!0?"media":"images",s=p==="media"?"Foto\u011Fraf ve Video":"Foto\u011Frafl\u0131",x=[{orderBy:"newest",label:"En Yeni",mediaFilter:"none"},{orderBy:"highest",label:"En Y\xFCksek Puan",mediaFilter:"none"},{orderBy:"lowest",label:"En D\xFC\u015F\xFCk Puan",mediaFilter:"none"},{orderBy:"newest",label:s,mediaFilter:p}],c=!1;function f(){return r&&r.parentNode||r||null}function b(z,C){if(!(C===!0||!z)){if(z.type==="touchstart"){Ct(f());return}if(z.type==="pointerdown"){var g=z.pointerType||"";g&&g!=="mouse"&&Ct(f())}}}function h(z){var C=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var g=z&&(z.restoreFocus===!0||z.restoreFocus==="auto"&&Pe());if(C&&g)try{u.focus({preventScroll:!0})}catch(k){try{u.focus()}catch(M){}}return C}function E(){A.notifyOpening(),v.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var z=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");z&&requestAnimationFrame(function(){try{z.focus({preventScroll:!0})}catch(C){try{z.focus()}catch(g){}}})}x.forEach(function(z){var C=z.mediaFilter!=="none",g=C?a===z.mediaFilter:a==="none"&&(t||"newest")===z.orderBy,k=document.createElement("button");k.type="button",k.className="renuvex-pr-filter-item"+(g?" renuvex-pr-filter-item-active":""),k.setAttribute("role","menuitem"),k.textContent=z.label;var M=!1;function w(S,T){S&&(S.preventDefault(),S.stopPropagation()),!M&&(M=!0,c=!0,b(S,T),h({restoreFocus:T}),i(z.orderBy,z.mediaFilter),setTimeout(function(){M=!1,c=!1},0))}k.addEventListener("pointerdown",function(S){S.button!==void 0&&S.button!==0||S.pointerType!=="mouse"&&w(S,!1)}),typeof window!="undefined"&&!window.PointerEvent&&k.addEventListener("touchstart",function(S){w(S,!1)},{passive:!1}),k.addEventListener("keydown",function(S){(S.key==="Enter"||S.key===" ")&&w(S,!0)}),k.onclick=function(S){w(S,!1)},v.appendChild(k)}),u.onclick=function(){v.classList.contains("renuvex-pr-open")?h({restoreFocus:"auto"}):E()},d.addEventListener("keydown",function(z){z.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(z.stopPropagation(),h({restoreFocus:!0}))}),d.addEventListener("focusout",function(z){if(v.classList.contains("renuvex-pr-open")&&!c){var C=z.relatedTarget;C&&d.contains(C)||h()}});var A=Qr({trigger:d,element:v,close:h});return d.appendChild(u),d.appendChild(v),o.appendChild(d),o}var qa=`
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
`;function Ka(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,a=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,n=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var d=document.createElement("button");d.className="renuvex-pr-fwizard-close",d.type="button",d.setAttribute("aria-label","Kapat");var u=re(ke);u&&d.appendChild(u),o.appendChild(d);var m=!1,v=null,p=null,s=!1;function x(){ve(i)}function c(g){qr(g,i,v&&v.root)}function f(){if(!m){if(m=!0,document.removeEventListener("keydown",b),i.removeEventListener("click",h),d.removeEventListener("click",f),s)ve(p);else{var g=v&&v.root?v.root.activeElement:null;if(g&&typeof g.blur=="function")try{g.blur()}catch(k){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(Fr(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):i.parentNode&&i.parentNode.removeChild(i),Wr();try{r()}catch(k){}},200)}}function b(g){if(g.key==="Escape"){f();return}c(g)}function h(g){g.target===i&&n&&f()}document.addEventListener("keydown",b),i.addEventListener("click",h),d.addEventListener("click",f);function E(g){p=t||Gr(),s=a===null?Pe():a,g&&l.appendChild(g),v=Dr(),Je(v.root,$e+Ge+qa),v.root.appendChild(i),Ue(v.root),jr(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),x()})}var A=null,z=null;function C(g,k){if(k=k||"error",A){try{A.remove()}catch(M){}A=null}z&&(clearTimeout(z),z=null),A=document.createElement("div"),A.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,A.textContent=g,o.appendChild(A),z=setTimeout(function(){A&&(A.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(A){try{A.remove()}catch(M){}A=null}},300))},4e3)}return{open:E,close:f,content:l,setAllowOutsideClose:function(g){n=!!g},setStepAttr:function(g){o.setAttribute("data-step",String(g))},showToast:C}}var Et=4;function ar(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Xa(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(i){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Et&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(i){return i!==n})}}}}function $a(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=se(qe)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var u=[],m=0;m<Et;m++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",d.appendChild(v),u.push(v)}o.appendChild(d);var p=document.createElement("button");p.type="button";var s=null;function x(f){s&&p.removeEventListener("click",s),s=f,f&&p.addEventListener("click",f)}o.appendChild(p);function c(f,b){var h=r.indexOf(f)!==-1,E=t.indexOf(f)!==-1,A=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0||!!b.videoUpload);if(h)f===2&&A?(p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",x(function(){i()})):(p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.setAttribute("aria-label","Atla"),p.innerHTML="<span>Atla</span>",x(function(){n()})),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p.style.visibility="",p.tabIndex=0;else if(E){p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Sonraki"),p.innerHTML="Sonraki",p.style.visibility="",p.tabIndex=0;var z=ar(f,b);p.disabled=!z,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!z),x(function(){p.disabled||i()})}else p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.innerHTML="",p.style.visibility="hidden",p.tabIndex=-1,p.disabled=!0,x(null)}return{el:o,update:function(f,b){u.forEach(function(E,A){A+1<=f?E.classList.add("renuvex-pr-fwizard-progress-seg-active"):E.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var h=f<=1;l.style.visibility=h?"hidden":"",l.style.pointerEvents=h?"none":"",l.tabIndex=h?-1:0,c(f,b)},setNextDisabled:function(f){p.classList.contains("renuvex-pr-fwizard-cta-btn")&&(p.disabled=!!f,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",d.style.visibility="hidden",p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",p.style.visibility="",p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),x(f)}}}var Si={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ce(e){var r=B&&B[e];return!r&&e==="formStepMediaTitle"&&(r=B&&B.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=B&&B.formStepPhotosSubtitle),Y(r,Si[e])}function Ja(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ce("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=vr(B||{});Le(l);var d=[];function u(f){d.forEach(function(b,h){var E=h<f;b.classList.toggle("renuvex-pr-fwizard-star-active",E),b.setAttribute("aria-checked",h+1===f?"true":"false"),b.innerHTML=E?ue("full"):ue("outline")})}function m(f){e.set({rating:f}),u(f)}function v(f){var b=d[f-1];if(b)try{b.focus()}catch(h){}}function p(f,b){b&&typeof b.preventDefault=="function"&&b.preventDefault(),b&&typeof b.stopPropagation=="function"&&b.stopPropagation(),!a&&(a=!0,m(f),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(f){var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-star",b.setAttribute("role","radio"),b.setAttribute("aria-label",f+" y\u0131ld\u0131z"),b.innerHTML=ue("outline"),b.addEventListener("mouseenter",function(){u(f)}),b.addEventListener("mouseleave",function(){u(e.get().rating)}),b.addEventListener("pointerdown",function(h){h.button&&h.button!==0||p(f,h)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(h){p(f,h)},{passive:!1}),b.addEventListener("mousedown",function(h){window.PointerEvent||p(f,h)}),b.addEventListener("keydown",function(h){if(h.key==="Enter"||h.key===" "){p(f,h);return}var E=0;h.key==="ArrowRight"||h.key==="ArrowUp"?E=Math.min(5,f+1):h.key==="ArrowLeft"||h.key==="ArrowDown"?E=Math.max(1,f-1):h.key==="Home"?E=1:h.key==="End"&&(E=5),E&&(h.preventDefault(),m(E),v(E))}),b.addEventListener("click",function(h){p(f,h)}),d.push(b),o.appendChild(b)})(s);u(e.get().rating);var x=null,c=function(f){var b=f&&f.detail&&f.detail.settings;b&&b===x||(x=b||null,l=vr(b||B||{}),u(e.get().rating))};return window.addEventListener(He,c),t.appendChild(o),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(He,c)}}}var et=3,Ci=10*1024*1024;function rt(e,r){r=r||{};var t=!1,a=r.hideAddButton===!0,n=r.revealAddButtonAfterMedia===!0,i=!a||n,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepPhotosTitle"),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-step-subtitle",d.textContent=ce("formStepPhotosSubtitle"),o.appendChild(d)}var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&u.classList.add("renuvex-pr-fwizard-photo-card--embedded");var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add",m.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",i&&u.appendChild(m),u.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),u.appendChild(p),o.appendChild(u);var s=r.revokeBlobUrl||function(z){z&&typeof z=="string"&&z.startsWith("blob:")&&URL.revokeObjectURL(z)},x=r.blobMap||{},c=r.urlToFinger||{};function f(){if(!t){var z=e.get().images||[],C=e.get().pendingImages||[],g=z.map(function(k){return{url:k,isPending:!1}}).concat(C.map(function(k){return{url:k.url,file:k.file,isPending:!0,error:k.error}}));p.innerHTML="",g.forEach(function(k){var M=x[k.url]||k.url,w=b(k,M);p.appendChild(w)}),E()}}function b(z,C){var g=document.createElement("div");g.className="renuvex-pr-fwizard-photo-thumb";var k=document.createElement("img");k.src=C,k.alt="",k.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",g.appendChild(k);var M=document.createElement("div");M.className="renuvex-pr-fwizard-photo-loading",M.style.display="none",g.appendChild(M);var w=document.createElement("button");w.type="button",w.className="renuvex-pr-fwizard-photo-remove",w.setAttribute("aria-label","Kald\u0131r");var S=re(ke);return S&&w.appendChild(S),g.appendChild(w),h(g,z,C),g}function h(z,C,g){var k=z.querySelector("img");k.src!==g&&(k.src=g);var M=z.querySelector(".renuvex-pr-fwizard-photo-loading");if(C.isPending&&C.error){M.style.display="flex",M.textContent="";var w=document.createElement("span");w.className="renuvex-pr-upload-error",w.textContent="\u2717 "+C.error,M.appendChild(w)}else M.style.display="none",M.textContent="";var S=z.querySelector(".renuvex-pr-fwizard-photo-remove");S.onclick=function(){var T=c[C.url]||(C.file?C.file.name+"_"+C.file.size:null),_=x[C.url],O={};T&&(O.fingerprints=(e.get().fingerprints||[]).filter(function(y){return y!==T})),C.isPending?O.pendingImages=(e.get().pendingImages||[]).filter(function(y){return y.url!==C.url}):O.images=(e.get().images||[]).filter(function(y){return y!==C.url}),e.set(O),s(C.url),s(_),delete c[C.url],_&&delete c[_],x[C.url]&&delete x[C.url]}}function E(){var z=(e.get().images||[]).length,C=(e.get().pendingImages||[]).length,g=z+C,k=g>=et;u.classList.toggle("renuvex-pr-fwizard-photo-card--compact",g>0),i&&(m.innerHTML=g>0?se(pa):se(Or)+"<span>Foto\u011Fraf Ekle</span>"),k?(i&&(m.style.display="none"),m.disabled=!0,v.disabled=!0):(i&&(m.style.display=n&&g===0?"none":"flex"),m.disabled=!1,v.disabled=!1,m.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}m.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(z){var C=(e.get().images||[]).length+(e.get().pendingImages||[]).length,g=Array.from(z.target.files).slice(0,et-C);v.value="";var k=(e.get().pendingImages||[]).length,M=e.get().images||[],w=M.length;if(g.length!==0){for(var S=[],T=[],_=0;_<g.length;_++){var O=g[_],y=O.name+"_"+O.size,P=(e.get().fingerprints||[]).some(function(R){return R===y})||S.some(function(R){return R.file.name+"_"+R.file.size===y});if(!P){if(O.size>Ci){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var F=URL.createObjectURL(O);c[F]=y,S.push({url:F,file:O,error:null}),T.push({url:F,file:O});var H=(e.get().fingerprints||[]).slice();H.push(y),e.set({fingerprints:H})}}if(S.length!==0){var W=(e.get().pendingImages||[]).concat(S),X=async function(){for(var R=0;R<T.length;R++){var V=T[R],I=V.file,D=V.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var K=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==D}),U=(e.get().images||[]).slice();U.push(D),e.set({pendingImages:K,images:U});continue}try{var G=await Ee(we+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe})});if(!G.ok)throw G.status===429?new Error("rate_limit"):new Error("sign failed");var Z=await G.json();if(!Z.folder)throw new Error("sign folder missing");var q=new FormData;q.append("file",I),q.append("api_key",Z.api_key),q.append("timestamp",Z.timestamp),q.append("signature",Z.signature),q.append("folder",Z.folder);var $=await fetch("https://api.cloudinary.com/v1_1/"+Z.cloud_name+"/image/upload",{method:"POST",body:q}),J=await $.json();if(J.secure_url&&va(J.secure_url)){var me=(e.get().pendingImages||[]).some(function(Q){return Q.url===D});if(!me)continue;x[J.secure_url]=D,c[J.secure_url]=c[D];var Sr=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==D}),pr=(e.get().images||[]).slice();pr.push(J.secure_url),e.set({pendingImages:Sr,images:pr});try{Ee(we+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,secureUrl:J.secure_url,metadata:{assetId:J.asset_id,publicId:J.public_id,version:J.version,resourceType:J.resource_type,format:J.format,width:J.width,height:J.height,bytes:J.bytes,signature:J.signature}})}).catch(function(){})}catch(Q){}}else throw new Error("invalid image url")}catch(Q){console.error("[renuvex-pr] Image upload failed:",Q);var Ae=Q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Ae,"error");var j=(e.get().pendingImages||[]).map(function(ne){return ne.url===D?{url:ne.url,file:ne.file,error:Ae}:ne});e.set({pendingImages:j})}}};if(w===0&&k===0){t=!0;var L=!r.canNavigate||r.canNavigate();L&&e.goNext()}e.set({pendingImages:W}),X()}}};var A=e.onChange(f);return f(),{el:o,openPicker:function(){v.disabled||v.click()},destroy:function(){t=!0,v.onchange=null,A&&A()}}}var Ei=150*1024*1024,Ti=2,Ai=60,tn=8192,an=5,Mi=3e4,Pi=["video/mp4","video/quicktime"],_i="renuvex_pr_video_upload_",nn="renuvex_pr_video_cancel_",br=null,Za=!1,Li={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},Ri={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},be=class extends Error{constructor(r,t,a){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=a||null}};function on(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:Li[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:Ri[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function ln(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function Tt(e){return new Promise(function(r){setTimeout(r,e)})}function nr(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function ir(e){return Math.max(0,Math.round(nr()-e))}function Ni(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return Mi}function Bi(e,r){return new Promise(function(t,a){var n=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(n),r&&r.removeEventListener("abort",o),a(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function At(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function Mt(e,r){return _i+pe+"_"+e+"_"+At(r)}function dn(e,r){try{var t=window.sessionStorage.getItem(Mt(e,r)),a=t?JSON.parse(t):null;return!a||typeof a.token!="string"||!a.expiresAt||new Date(a.expiresAt).getTime()<=Date.now()?null:a}catch(n){return null}}function Fi(e,r,t){try{window.sessionStorage.setItem(Mt(e,r),JSON.stringify(t))}catch(a){}}function wr(e,r){try{window.sessionStorage.removeItem(Mt(e,r))}catch(t){}}function Ii(e,r){return nn+pe+"_"+e+"_"+At(r)}function Oi(e,r,t,a){if(!(!e||!r||!t)){var n={token:e,productId:r,expiresAt:a||null};try{window.sessionStorage.setItem(Ii(r,t),JSON.stringify(n))}catch(i){}}}function Ui(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(nn+pe+"_")!==0)){var a=window.sessionStorage.getItem(t),n=a?JSON.parse(a):null;if(!n||typeof n.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:n.token})}}}catch(i){}return e}function Qa(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function or(e,r,t){var a=await Ee(we+e,r,t||2e4),n=await a.json().catch(function(){return{}});if(!a.ok){var i=Number(a.headers.get("Retry-After"));throw new be(n.error||"video_request_failed",a.status,Number.isFinite(i)&&i>0?i:null)}return n.data||{}}async function yr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await or("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:ir(r.startedAt),finalStatus:t})},4e3)}catch(a){}}async function Hi(e){try{return await or("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Qa(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Qa(e.key),!0):!1}}function tt(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():br||(br=(async function(){for(var e=Ui(),r=0;r<e.length;r+=1)await Hi(e[r])})().finally(function(){br=null}),br)}function at(){typeof window=="undefined"||Za||(Za=!0,window.addEventListener("online",function(){tt()}),tt())}async function Vi(){var e=await import("./upchunk-KBSCWYRQ.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function en(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var Di={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function Yi(e){return Di[e]!==!0}async function ji(e){var r=await Vi();return new Promise(function(t,a){var n=!1,i=null,o=null,l=Ni(),d=null;function u(x){n||(n=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",s),d&&d(),x?a(x):t())}function m(x){n||(o&&clearTimeout(o),!(!x&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!n){e.onUploadError&&e.onUploadError("video_upload_stalled"),u(new be("video_upload_stalled",0,null));try{i&&i.abort()}catch(c){}}},l)))}function v(){return n?!1:(m(),!0)}function p(){if(!n){e.onUploadError&&e.onUploadError("video_upload_offline"),u(new be("video_upload_offline",0,null));try{i&&i.abort()}catch(x){}}}function s(){try{i&&i.abort()}catch(x){}u(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return a(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",s,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||tn,attempts:e.chunkAttempts||an,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",p),d=function(){window.removeEventListener("offline",p)}),typeof navigator!="undefined"&&navigator.onLine===!1){p();return}m(),i.on("attempt",function(){v()&&e.onStatus("uploading")}),i.on("attemptFailure",function(x){if(v()){var c=x&&x.detail,f=en(c);if(e.onAttemptFailure&&e.onAttemptFailure(f),Yi(f)){e.onUploadError&&e.onUploadError(f),u(new be(f,0,null));try{i&&i.abort()}catch(b){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){v()}),i.on("progress",function(x){if(v()){var c=Number(x&&x.detail);if(Number.isFinite(c)){var f=Math.min(95,Math.max(0,Math.round(c*.95)));Number.isFinite(e.minProgress)&&(f=Math.max(e.minProgress,f)),e.onProgress(f)}}}),i.on("offline",p),i.on("error",function(x){if(v()){var c=x&&x.detail,f=en(c);e.onUploadError&&e.onUploadError(f),u(new be(f,0,null))}}),i.on("success",function(){v()&&(e.onProgress(95),u())})})}function Wi(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function rn(e,r,t){for(var a=Date.now(),n=a+600*1e3,i=0;Date.now()<n;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-a;try{var l=await or("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new be(l.errorCode||"video_processing_failed",409,null)}catch(d){if(r.aborted||d instanceof be&&d.status===409||ln(d)||(i+=1,i>=3))throw d}await Bi(Wi(o),r)}throw new be("video_processing_delayed",0,null)}async function Gi(e){for(var r=null,t=1;t<=3;t+=1)try{return await or("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(a){if(ln(a))return null;r=a,t<3&&await Tt(400*t)}throw r||new Error("video_status_failed")}async function qi(e,r,t,a){for(var n=10;n<=90;n+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(n),await Tt(120)}return a("processing"),await Tt(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function pn(e){return!e||Pi.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>Ei?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function un(e){return new Promise(function(r){var t=URL.createObjectURL(e),a=document.createElement("video"),n=!1;function i(o){if(!n){n=!0,a.removeAttribute("src");try{a.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}a.preload="metadata",a.onloadedmetadata=function(){i(Number.isFinite(a.duration)?a.duration:null)},a.onerror=function(){i(null)},a.src=t,setTimeout(function(){i(null)},8e3)})}function sn(e){return e===null?{ok:!0}:e<Ti||e>Ai?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function vn(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return qi(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:nr(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(x){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=x||"upload_attempt_failed")}function a(){wr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function n(x,c){var f=await Gi(x);if(!f)return{action:"discard"};if(f.status==="ready")return e.onToken&&e.onToken(x),e.onProgress(100),wr(e.productId,e.file),await yr(x,r,"ready"),{action:"return",value:Object.assign({token:x},f)};if(f.status==="uploaded"||f.status==="processing"){e.onToken&&e.onToken(x),e.onStatus("processing");var b=nr(),h=await rn(x,e.signal,e.onStatus);return r.processingPollMs=ir(b),wr(e.productId,e.file),e.onProgress(100),await yr(x,r,"ready"),{action:"return",value:Object.assign({token:x},h)}}return f.status==="failed"||f.status==="aborted"?{action:"discard"}:!c||typeof c.uploadUrl!="string"||!c.uploadUrl?{action:"discard"}:{action:"upload"}}at(),await tt();var i=dn(e.productId,e.file),o=i&&i.token,l=i;if(o){var d=await n(o,l);if(d.action==="return")return d.value;d.action==="discard"&&(a(),o=null,l=null)}for(;;){if(!o){var u=await or("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:At(e.file)})});o=u.token,l=u,Fi(e.productId,e.file,u)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||tn,r.chunkAttempts=l.chunkAttempts||an,e.onStatus("uploading");var m=nr();try{await ji({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+ir(m),e.onStatus("processing");var v=nr();await or("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=ir(v);var p=nr(),s=await rn(o,e.signal,e.onStatus);return r.processingPollMs=ir(p),wr(e.productId,e.file),e.onProgress(100),await yr(o,r,"ready"),Object.assign({token:o},s)}catch(x){throw r.directUploadMs=(r.directUploadMs||0)+ir(m),e.signal&&e.signal.aborted?(await yr(o,r,"aborted"),x):(await yr(o,r,"failed"),x)}}}async function nt(e,r,t){var a=r&&t?dn(r,t):null;e&&r&&t&&Oi(e,r,t,a&&a.expiresAt),r&&t&&wr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(at(),await tt())}function cn(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function Ki(e){return"Video Y\xFCkleniyor"}function Xi(e){return!0}function mn(e,r){r=r||{};var t=!1,a=null,n=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepMediaTitle"),o.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-step-subtitle",d.textContent=ce("formStepMediaSubtitle"),o.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-card";var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",m.setAttribute("aria-label","Foto\u011Fraf ekle"),m.innerHTML=se(Or)+"<span>Foto\u011Fraf Ekle</span>";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",v.setAttribute("aria-label","Video ekle"),v.innerHTML=se(Ke)+"<span>Video Ekle</span>",u.appendChild(m),u.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-fwizard-media-content",u.appendChild(p),o.appendChild(u);var s=document.createElement("input");s.type="file",s.accept="video/mp4,video/quicktime,.mp4,.mov",s.style.display="none",o.appendChild(s);function x(){var y=e.get();return(y.images||[]).length>0||(y.pendingImages||[]).length>0}function c(){var y=e.get();return(y.images||[]).length+(y.pendingImages||[]).length}function f(){return e.get().videoUpload||null}function b(){return i+=1,i}function h(y,P){var N=f();return i===y&&!!N&&N.controller===P}function E(){if(!n){p.innerHTML="";return}n.retry.onclick=null,p.innerHTML="",n=null}function A(){a&&(a.destroy&&a.destroy(),a=null)}function z(y){A(),p.innerHTML="";var P=cn(y),N=document.createElement("div");N.className=P==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":P==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var F=null,H=null,W=null,X=null,L=document.createElement("button");if(L.type="button",L.className="renuvex-pr-fwizard-video-retry",L.textContent="Tekrar dene",L.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),P==="ready"){var R=y.posterUrl||y.localUrl||"";R&&R!==y.localUrl?(F=document.createElement("img"),F.alt="",F.src=R):(F=document.createElement("video"),F.muted=!0,F.playsInline=!0,F.preload="metadata",F.src=y.localUrl||""),F.className="renuvex-pr-fwizard-video-preview",N.appendChild(F)}else P==="busy"?(X=document.createElement("div"),X.className="renuvex-pr-fwizard-video-uploading-status",X.setAttribute("role","status"),X.setAttribute("aria-live","polite"),N.appendChild(X)):H=N;if(P==="ready"){let K=function(U){U&&(U.preventDefault(),U.stopPropagation()),S()};var D=K,V=document.createElement("button");V.type="button",V.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",V.setAttribute("aria-label","Videoyu kald\u0131r");var I=re(ke);I&&V.appendChild(I),V.addEventListener("pointerdown",K),V.addEventListener("click",K),N.appendChild(V)}p.appendChild(N),n={mode:P,card:N,preview:F,previewUrl:P==="ready"&&(y.posterUrl||y.localUrl)||"",details:H,name:W,status:X,retry:L}}function C(){if(!t){var y=f();if(!y){E();return}var P=cn(y),N=P==="ready"&&(y.posterUrl||y.localUrl)||"";if((!n||n.mode!==P||n.previewUrl!==N)&&z(y),n.name&&(n.name.textContent=y.file?y.file.name:"Video"),n.status&&P==="busy"){var F=Ki(y),H=Xi(y)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+F+"</span>":"<span>"+F+"</span>";n.status.innerHTML!==H&&(n.status.innerHTML=H)}var W=P==="failed"&&!!(y.error&&y.file&&y.retryable!==!1);n.retry.onclick=W?function(){w(y.file,y.localUrl,y.durationMs)}:null,W&&n.details&&!n.retry.isConnected?n.details.appendChild(n.retry):!W&&n.retry.isConnected&&n.retry.remove()}}function g(){var y=x(),P=c()>=et,N=!!f(),F=y||N;m.hidden=F,v.hidden=F,m.disabled=N||P,v.disabled=y||N,u.classList.toggle("renuvex-pr-fwizard-media-card--has-media",F),u.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",y),u.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",N),m.classList.toggle("renuvex-pr-fwizard-media-action--active",y),v.classList.toggle("renuvex-pr-fwizard-media-action--active",N)}function k(y){var P=f();if(P){var N=Object.keys(y),F=N.some(function(H){return P[H]!==y[H]});F&&e.set({videoUpload:Object.assign({},P,y)})}}function M(y,P,N){h(y,P)&&k(N)}async function w(y,P,N){var F=f(),H=!!(P&&F&&F.file===y),W=H?Math.max(0,Math.min(95,Number(F.progress)||0)):0,X=H?(Number(F.retryClicks)||0)+1:0,L=pn(y);if(!L.ok){r.showToast&&r.showToast(L.message,"error");return}var R=P||URL.createObjectURL(y),V=Number.isFinite(N)?N:null,I=new AbortController,D=b();e.set({videoUpload:{file:y,localUrl:R,token:H&&F.token||null,status:"uploading",progress:W,durationMs:V,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:X,controller:I}}),!H&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var K=N!==void 0?Number.isFinite(N)?N/1e3:null:await un(y),U=sn(K);if(!U.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:U.message});var G=await vn({file:y,productId:e.get().productId,signal:I.signal,minProgress:W,retryClicks:X,onToken:function($){M(D,I,{token:$})},onProgress:function($){M(D,I,{progress:$})},onStatus:function($){M(D,I,{status:$})},onSessionReset:function(){M(D,I,{token:null,progress:0})}});if(!h(D,I))return;if(G.previewOnly&&G.posterUrl&&G.posterUrl!==R)try{URL.revokeObjectURL(G.posterUrl)}catch($){}k({token:G.token,status:"ready",progress:100,posterUrl:G.previewOnly?R:G.posterUrl,durationMs:G.durationMs||(K===null?null:Math.round(K*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),H&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch($){if(I.signal.aborted||!h(D,I))return;var Z=on($);if($&&$.code==="invalid_video_duration"&&(Z={code:"invalid_video_duration",message:$.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),k({status:"failed",error:Z.message,errorCode:Z.code,retryable:Z.retryable,retryAfterSec:Z.retryAfterSec,controller:null}),r.showToast){var q=Z.code==="invalid_video_duration"?Z.message:"Video y\xFCklenemedi";r.showToast(q,"error")}}}function S(){var y=f();y&&(b(),y.controller&&y.controller.abort(),nt(y.token,e.get().productId,y.file),r.revokeBlobUrl&&r.revokeBlobUrl(y.localUrl),e.set({videoUpload:null}))}function T(y){if(a){y&&a.openPicker&&a.openPicker();return}n=null,p.innerHTML="",a=rt(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),p.appendChild(a.el),y&&a.openPicker&&a.openPicker()}m.onclick=function(){m.disabled||T(!0)},v.onclick=function(){v.disabled||(A(),p.innerHTML="",s.click())},s.onchange=function(){var y=s.files&&s.files[0];s.value="",y&&w(y,null,void 0)};var _=!!f(),O=e.onChange(function(){g();var y=!!f();(y||_)&&C(),_=y});return g(),x()&&T(!1),f()&&C(),{el:o,destroy:function(){t=!0,m.onclick=null,v.onclick=null,s.onchange=null,a&&a.destroy&&a.destroy(),O&&O()}}}var Pt=2e3,$i=60;function fn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=ce("formStepContentTitle"),a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=$i,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Pt,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),i.appendChild(d);function u(){var v=l.value.length;d.textContent=v+"/"+Pt,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=Pt)}function m(){return ar(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),u(),t(m())}),a.appendChild(i),u(),setTimeout(function(){t(m())},0),{el:a,destroy:function(){}}}var Ji=40;function xn(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ce("formStepAuthorTitle"),n.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=Ji,u.setAttribute("aria-required","true"),u.value=e.get().author||"",l.appendChild(d),l.appendChild(u),o.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var p=document.createElement("input");p.type="email",p.className="renuvex-pr-fwizard-input",p.setAttribute("autocomplete","email"),p.value=e.get().email||"",m.appendChild(v),m.appendChild(p),o.appendChild(m);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var x=document.createElement("div");x.className="renuvex-pr-fwizard-msg",x.setAttribute("role","alert"),x.setAttribute("aria-live","assertive"),o.appendChild(x);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),n.appendChild(o);function f(){return ar(4,e.get())}function b(g){c.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent=g}function h(){c.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),c.textContent="";var g=document.createElement("span");g.className="renuvex-pr-fwizard-video-dots",g.setAttribute("aria-hidden","true"),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span"));var k=document.createElement("span");k.textContent="Video Haz\u0131rlan\u0131yor",c.appendChild(g),c.appendChild(k)}function E(){var g=!f(),k=(e.get().pendingImages||[]).length,M=k>0,w=e.get().videoUpload,S=!!(w&&w.status==="failed"),T=!!(w&&w.status!=="ready"&&w.status!=="failed");M||T||S?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),S?b("Video Y\xFCklenemedi"):T?h():b("Foto\u011Fraflar Y\xFCkleniyor...")):(c.disabled=g,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",g),b("G\xF6nder"))}u.addEventListener("input",function(){e.set({author:u.value}),E(),t(f())}),p.addEventListener("input",function(){e.set({email:p.value})}),E(),setTimeout(function(){t(f())},0);function A(){x.textContent=""}function z(g){A();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=g||"",x.appendChild(k)}c.onclick=async function(){if(!c.disabled){var g=e.get(),k=(g.author||"").trim(),M=(g.comment||"").trim();if(p.value.trim()&&!p.checkValidity()){p.reportValidity();return}if(!k){z("Gerekli alan");return}if(!g.rating){z("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var w=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",A(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a()},600);return}try{var S=ua(window.location.href),T=g.productName||null,_=await Ee(we+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:pe,productId:g.productId||null,slug:S||null,productName:T,author:k,title:(g.title||"").trim()||null,comment:M||null,rating:g.rating,images:g.videoUpload?[]:g.images||[],videoToken:g.videoUpload&&g.videoUpload.status==="ready"?g.videoUpload.token:null})},15e3);if(_.ok)g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),a();else{var O=await _.json().catch(function(){return{}});throw new Error(O.error||"Yorum kaydedilemedi.")}}catch(N){var y=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),P=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):z(P),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=w}}};var C=e.onChange(E);return{el:n,destroy:function(){c.onclick=null,C&&C()}}}function Zi(e,r,t){if(t=t||{},e===1)return Ja(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return mn(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return rt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return fn(r,{onValidityChange:t.onValidityChange});if(e===4)return xn(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function gn(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function hn(e){e=e||{},at();var r=Xa({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:B&&B.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},a={},n={};function i(w){if(!(!w||typeof w!="string"||!w.startsWith("blob:")||n[w])){n[w]=!0;try{URL.revokeObjectURL(w)}catch(S){}}}function o(){Object.keys(a).forEach(function(S){i(S)}),Object.keys(t).forEach(function(S){i(t[S])});var w=r.get();(w.pendingImages||[]).forEach(function(S){i(S&&S.url)}),(w.images||[]).forEach(function(S){i(S)}),w.videoUpload&&i(w.videoUpload.localUrl)}function l(){var w=r.get(),S=w.videoUpload;!S||w.videoSubmitted||(S.controller&&S.controller.abort(),nt(S.token,w.productId,S.file))}var d=Ka({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",m),Xr(u),l(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),u=Kr(),m=function(w){d&&d.close&&d.close()};window.addEventListener("popstate",m);var v=document.createElement("div");v.className="renuvex-pr-fwizard-step-wrap";var p=$a({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),s=document.createElement("div");s.className="renuvex-pr-fwizard-layout",s.appendChild(v),s.appendChild(p.el);var x=null,c="idle",f=null,b=!0,h=null;function E(w,S){v.innerHTML="";var T=Zi(w,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:i,onValidityChange:function(y){p.setNextDisabled(!y)},onSuccess:z,showToast:d.showToast});if(x=T,p.update(w,r.get()),S){c="entering",T.el.classList.add("renuvex-pr-fwizard-step--enter");var _=null,O=function(){_&&clearTimeout(_),T.el.removeEventListener("animationend",O),T.el.classList.remove("renuvex-pr-fwizard-step--enter"),c="idle",f!==null&&C()};T.el.addEventListener("animationend",O),_=setTimeout(O,700)}else c="idle";v.appendChild(T.el),d.setStepAttr&&d.setStepAttr(w),w===3&&p.setNextDisabled(!0)}var A=!1;function z(){if(!A){if(A=!0,!x){v.innerHTML="";var w=gn();w.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(w),d.setStepAttr("thanks"),p.setThanksState(d.close);return}var S=x;c="exiting",S.el.classList.add("renuvex-pr-fwizard-step--exit");var T=function(){if(h&&clearTimeout(h),S.el.removeEventListener("animationend",T),S.destroy)try{S.destroy()}catch(O){}x===S&&(x=null),v.innerHTML="";var _=gn();_.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(_),d.setStepAttr("thanks"),p.setThanksState(d.close),c="idle"};S.el.addEventListener("animationend",T),h=setTimeout(T,300)}}function C(){var w=r.get().currentStep;if(c!=="idle"){f=w;return}if(!x){var S=!b;b=!1,E(w,S);return}var T=x;c="exiting",T.el.classList.add("renuvex-pr-fwizard-step--exit");var _=function(){if(h&&clearTimeout(h),T.el.removeEventListener("animationend",_),T.destroy)try{T.destroy()}catch(y){}if(x===T){v.innerHTML="",x=null;var O=f!==null?f:r.get().currentStep;f=null,E(O,!0),c="idle"}};T.el.addEventListener("animationend",_),h=setTimeout(_,350)}C();var g=r.get().currentStep,k=r.onChange(function(w){w.currentStep!==g?(g=w.currentStep,C()):p.update(w.currentStep,w)}),M=d.close;return d.close=function(){k&&k(),typeof h!="undefined"&&h&&clearTimeout(h),M()},d.open(s),{close:d.close}}var Qi=4e3;async function bn(){var e=await Ee(we+"/api/public/upload/video/capability?storeId="+encodeURIComponent(pe),{method:"GET",cache:"no-store"},Qi);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),a=t&&t.data;if(!a||typeof a.enabled!="boolean"){var n=new Error("video_capability_invalid");throw n.code="video_capability_invalid",n}return{enabled:a.enabled===!0,reason:typeof a.reason=="string"?a.reason:null}}var it=null;function yn(){return B&&B.videoReviewsEnabled===!0}function eo(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return yn()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function ro(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function to(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:yn(),reason:null};else try{t=await bn()}catch(a){t=eo(a)}hn({productId:ee||"",productName:Ie||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function ae(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=ro(r);return it||(it=to(r,Pe()).finally(function(){it=null})),it.finally(t)}var wn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var ao={id:"classic",name:"Klasik (A\xE7\u0131k)"},no=wn;function io(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,p=e.onSortChange;Le(n);var s=document.createElement("div");s.className="renuvex-pr-summary";var x=(o[3]||0)+(o[4]||0),c=i>0?Math.round(x/i*100):0,f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-avg",f.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",s.appendChild(f);var b=document.createElement("div");if(b.className="renuvex-pr-summary-block renuvex-pr-summary-count",b.textContent=i.toLocaleString("tr-TR")+" "+Y(a.countLabel,"Yorum"),s.appendChild(b),a.showRecommendation!==!1&&c>0){var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",h.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",s.appendChild(h)}return s.appendChild(rr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:d,onFilterChange:v})),s.appendChild(de({widget:r,currentOrderBy:u,currentMediaFilter:m,onWriteClick:ae,onSortChange:p})),s}var Lt={};Me(Lt,{css:()=>lo,meta:()=>oo,render:()=>vo});var kn=`
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
`;var oo={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},lo=kn,po="__unknown_product__",kr=Object.create(null);function uo(e){return e?String(e):po}var Ye=null,zr=null;function so(){!Ye||!zr||(Ye.removeEventListener?Ye.removeEventListener("change",zr):Ye.removeListener&&Ye.removeListener(zr),Ye=null,zr=null)}function vo(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,m=e.currentMediaFilter,v=e.onFilterChange,p=e.onSortChange,s=uo(t),x=document.createElement("div");x.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var f=document.createElement("div");f.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Re(l,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+se(da)+"</span>";var h=b.querySelector(".renuvex-pr-compact-trigger-text"),E=b.querySelector(".renuvex-pr-compact-chevron");if(h&&(h.textContent=i.toLocaleString("tr-TR")+" "+Y(a.countLabel,"Yorum")),h&&E){var A=document.createElement("span");A.className="renuvex-pr-compact-trigger-count",b.insertBefore(A,h),A.appendChild(h),A.appendChild(E)}f.appendChild(b),c.appendChild(f);var z=de({widget:r,currentOrderBy:u,currentMediaFilter:m,onWriteClick:ae,onSortChange:p}),C=z.querySelector(".renuvex-pr-filter-wrap"),g=z.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-compact-actions-slot",g&&k.appendChild(g),C&&k.appendChild(C),c.appendChild(k),x.appendChild(c);var M=document.createElement("div");M.className="renuvex-pr-compact-panel",M.setAttribute("role","dialog"),M.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),M.setAttribute("aria-hidden","true");var w=document.createElement("div");w.className="renuvex-pr-compact-panel-inner";var S=document.createElement("div");S.className="renuvex-pr-compact-avg",S.innerHTML='<span class="renuvex-pr-icon">'+ue("full")+"</span><span>"+l+"</span>",w.appendChild(S),w.appendChild(rr({ratingCounts:o,allCount:i,iconPair:n,currentRatingFilter:d,onFilterChange:function(U){_()&&M.classList.contains("renuvex-pr-open")&&(kr[s]=!0),v(U)}})),M.appendChild(w);var T=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function _(){return!!(T&&T.matches)}function O(U){U?M.classList.add("renuvex-pr-open"):M.classList.remove("renuvex-pr-open"),M.setAttribute("aria-hidden",U?"false":"true"),b.setAttribute("aria-expanded",U?"true":"false")}function y(U){var G=U?x:f;if(M.parentNode!==G){var Z=!!M.parentNode;M.classList.contains("renuvex-pr-open")&&O(!1),Z&&(kr[s]=!1),G.appendChild(M)}}y(T?T.matches:!1);var P=de({widget:r,currentOrderBy:u,currentMediaFilter:m,onWriteClick:ae,onSortChange:p}),N=P.querySelector(".renuvex-pr-filter-wrap"),F=P.querySelector(".renuvex-pr-write-btn"),H=document.createElement("div");H.className="renuvex-pr-compact-write-row",F&&H.appendChild(F),N&&H.appendChild(N),x.appendChild(H);function W(){var U=M.classList.contains("renuvex-pr-open");return O(!1),_()&&(kr[s]=!1),U}function X(){L&&L.notifyOpening(),O(!0),_()&&(kr[s]=!0)}b.onclick=function(){M.classList.contains("renuvex-pr-open")?W():X()};var L=null;function R(U){L&&(L.unregister(),L=null),U||(L=Qr({trigger:f,element:M,close:W}))}if(R(T?T.matches:!1),so(),T){var V=function(U){y(U.matches),R(U.matches)};T.addEventListener?T.addEventListener("change",V):T.addListener&&T.addListener(V),Ye=T,zr=V}if(_()&&kr[s]&&O(!0),a.showRecommendation!==!1){var I=(o[3]||0)+(o[4]||0),D=i>0?Math.round(I/i*100):0;if(D>0){var K=document.createElement("div");K.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",K.style.marginTop="8px",K.innerHTML='<span class="renuvex-pr-recommend-pct">%'+D+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",w.appendChild(K)}}return x}var Rt={};Me(Rt,{css:()=>mo,meta:()=>co,render:()=>fo});var zn=`
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
`;var co={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},mo=zn;function fo(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentMediaFilter,m=e.onFilterChange,v=e.onSortChange;Le(a);var p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(x);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" "+Y(t.countLabel,"Yorum"),s.appendChild(c),p.appendChild(s);var f=document.createElement("div");f.className="renuvex-pr-split-col renuvex-pr-split-mid",f.appendChild(rr({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:l,onFilterChange:m})),p.appendChild(f);var b=de({widget:r,currentOrderBy:d,currentMediaFilter:u,onWriteClick:ae,onSortChange:v}),h=b.querySelector(".renuvex-pr-filter-wrap"),E=b.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-split-col renuvex-pr-split-right",E&&A.appendChild(E),h&&A.appendChild(h),p.appendChild(A);var z=(i[3]||0)+(i[4]||0),C=n>0?Math.round(z/n*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+C+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var k=t.showRecommendation===!1||C===0;return k&&g.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(g),p}var Nt={};Me(Nt,{css:()=>go,meta:()=>xo,render:()=>ho});var Sn=`
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
`;var xo={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},go=Sn;function ho(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,d=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var m=document.createElement("div");m.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var p=document.createElement("span");p.className="renuvex-pr-minimal-avg",p.textContent=i,v.appendChild(p);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=Re(i,a),v.appendChild(s);var x=document.createElement("span");x.className="renuvex-pr-minimal-count",x.textContent=n.toLocaleString("tr-TR")+" "+Y(t.countLabel,"Yorum"),v.appendChild(x),m.appendChild(v),u.appendChild(m);var c=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),f=c.querySelector(".renuvex-pr-filter-wrap"),b=c.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");h.className="renuvex-pr-minimal-actions",b&&h.appendChild(b),f&&h.appendChild(f),u.appendChild(h);var E=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),A=E.querySelector(".renuvex-pr-filter-wrap"),z=E.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");return C.className="renuvex-pr-minimal-write-row",z&&C.appendChild(z),A&&C.appendChild(A),u.appendChild(C),u}var Bt={};Me(Bt,{css:()=>yo,meta:()=>bo,render:()=>wo});var Cn=`
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
`;var bo={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},yo=Cn;function wo(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentMediaFilter,d=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var m=document.createElement("div");m.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var p=document.createElement("span");p.className="renuvex-pr-hero-avg",p.textContent=i,v.appendChild(p);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var x=document.createElement("span");x.className="renuvex-pr-hero-stars",x.innerHTML=Re(i,a),s.appendChild(x);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=n.toLocaleString("tr-TR")+" "+Y(t.countLabel,"Yorum"),s.appendChild(c),v.appendChild(s),m.appendChild(v),u.appendChild(m);var f=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),b=f.querySelector(".renuvex-pr-filter-wrap"),h=f.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",h&&E.appendChild(h),b&&E.appendChild(b),u.appendChild(E);var A=de({widget:r,currentOrderBy:o,currentMediaFilter:l,onWriteClick:ae,onSortChange:d}),z=A.querySelector(".renuvex-pr-filter-wrap"),C=A.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");return g.className="renuvex-pr-hero-write-row",C&&g.appendChild(C),z&&g.appendChild(z),u.appendChild(g),u}var En=`
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
`;var ot={classic:_t,compact:Lt,split:Rt,minimal:Nt,hero:Bt};function lt(e){return ot[e]||ot.classic}function Tn(){var e=Object.keys(ot).map(function(r){return ot[r].css||""}).join(`
`);return En+`
`+e}var Ft={};Me(Ft,{css:()=>zo,meta:()=>ko,render:()=>So});function Be(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,a=t?Xe(e.posterUrl,t):ha(e);if(!a)return null;var n=document.createElement("img"),i=e.type==="image"?cr(a,r.sourceWidth):{src:a,srcset:Hr(e.posterUrl,t)};if(n.src=i.src,i.srcset&&(n.srcset=i.srcset),n.loading=r.loading||"lazy",n.decoding="async",e.type==="image"&&n.setAttribute("data-renuvex-img-url",e.url),r.width&&(n.width=r.width),r.height&&(n.height=r.height),n.alt="",mr(n),e.type!=="video")return n.className=r.className||"",gr(n,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),n;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",n.className="renuvex-pr-media-poster",o.appendChild(n);var l=document.createElement("span");l.className="renuvex-pr-media-play";var d=re(Ke);d&&l.appendChild(d),o.appendChild(l);var u=Vr(e.durationMs);if(u){var m=document.createElement("span");m.className="renuvex-pr-media-duration",m.textContent=u,o.appendChild(m)}return gr(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function lr(e,r,t){var a=t||{},n=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,n.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",n.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:i,readMore:o}}function dr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=Y(B&&B.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var An=`
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
`;var ko={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},zo=An;function So(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ze(e.rating,B),n.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=Se(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var u=(e.comment||"").trim();u&&t.appendChild(lr(u,"renuvex-pr-body").fragment);var m=Ne(e);if(m.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",m.forEach(function(s){var x=Be(s,{className:"renuvex-pr-img",sourceWidth:le,width:le,height:le,onOpen:function(){he(e,s.url,r)}});x&&v.appendChild(x)}),t.appendChild(v)}var p=dr(e.merchantReply);return p&&t.appendChild(p),t}var It={};Me(It,{css:()=>Eo,meta:()=>Co,render:()=>To});var Mn=`
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
`;var Co={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Eo=Mn;function To(e,r){var t=Ne(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ze(e.rating,B),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=Se(e.createdAt),i.appendChild(d),n.appendChild(i);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,u.appendChild(m)}var v=(e.comment||"").trim();v&&u.appendChild(lr(v,"renuvex-pr-review-list-body").fragment);var p=dr(e.merchantReply);if(p&&u.appendChild(p),n.appendChild(u),a){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(x){var c=Be(x,{sourceWidth:le,width:le,height:Math.round(le*4/3),onOpen:function(){he(e,x.url,r)}});c&&s.appendChild(c)}),n.appendChild(s)}return n}var Ot={};Me(Ot,{css:()=>Mo,meta:()=>Ao,render:()=>Po});var Pn=`
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
`;var Ao={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Mo=Pn;function Po(e,r){var t=fe(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ze(e.rating,B),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",i.appendChild(d);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=Se(e.createdAt),i.appendChild(u);var m=(e.comment||"").trim();if(m&&i.appendChild(lr(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){he(e,t.url,r)}}:null).fragment),n.appendChild(i),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var p=Be(t,{sourceWidth:Ur,width:Ur,height:Math.round(Ur*4/3),onOpen:function(){he(e,t.url,r)}});p&&v.appendChild(p),n.appendChild(v)}var s=dr(e.merchantReply,t?function(){he(e,t.url,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(s)),n}var dt={card:Ft,list:It,gallery:Ot};function pt(e){return dt[e]||dt.card}function _n(){return Object.keys(dt).map(function(e){return dt[e].css||""}).join(`
`)}var Ut=0;function je(){return Ut++,Ut}function We(e,r){return e!==Ut?!1:r?!(r.productId!==void 0&&ee!==r.productId||r.orderBy!==void 0&&te!==r.orderBy||r.page!==void 0&&sr!==r.page||r.ratingFilter!==void 0&&ie!==r.ratingFilter||r.mediaFilter!==void 0&&oe!==r.mediaFilter||r.nextCursor!==void 0&&_r!==r.nextCursor):!0}var Ht={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,mediaGalleryTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,mediaGalleryTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,mediaGalleryTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},Vt={small:80,medium:110,large:140},Dt={small:80,medium:100,large:110};function Ln(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),a.appendChild(n),a.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(l),r}function Rn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var a=document.createElement("div");a.className="renuvex-pr-empty-state-stars",a.innerHTML=Re(0,e.iconPair),t.appendChild(a);var n=document.createElement("p");n.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(n),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function Nn(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Bn(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function Te(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+a+","+n+","+i+","+r+")"}function ut(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Yt(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Fn(e){return .2126*Yt(e.r)+.7152*Yt(e.g)+.0722*Yt(e.b)}function In(e,r){var t=Fn(e),a=Fn(r),n=Math.max(t,a),i=Math.min(t,a);return(n+.05)/(i+.05)}function _o(e){var r=ut(e)||ut("#ffffff"),t=ut("#111111"),a=ut("#ffffff");return In(t,r)>=In(a,r)?"#111111":"#ffffff"}function Lo(e){return Te(e,e==="#ffffff"?.1:.06)}function On(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",u=Te(o,.06),m=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",p=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",x=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",h=r.filterMenuBorderColor||"#e5e7eb",E=r.filterItemTextColor||"#111111",A=r.filterItemHoverBgColor||"#f3f4f6",z=r.filterItemActiveColor||"#111111",C=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",k=r.reviewDateColor||"#5e5e5e",M=r.reviewBodyColor||"#111111",w=r.reviewBorderColor||"#e5e7eb",S=Te(M,.65),T=r.replyBgColor||"#f9fafb",_=r.replyBorderColor||"#747474",O=r.replyLabelColor||"#111111",y=r.replyTextColor||"#111111",P=r.mediaGalleryTitleColor||"#111111",N=Te("#111111",.05),F=r.mediaGalleryArrowBgColor||"#ffffff",H=r.mediaGalleryArrowTextColor||"#111111",W=Te("#111111",.12),X=r.reviewLightboxVideoIconColor||"#ffffff",L=r.reviewLightboxVideoProgressColor||"#ffffff",R=r.reviewLightboxVideoProgressTrackColor||"#000000",V=r.formBgColor||"#ffffff",I=r.formPrimaryTextColor||"#111111",D=r.formSecondaryTextColor||"#3b3b3b",K=r.inputTextColor||I,U=r.inputBorderColor||"#d1d5db",G=r.placeholderColor||"#9ca3af",Z=r.formStepBarColor||"#111111",q=r.formBtnBgColor||"#111111",$=r.formBtnTextColor||"#ffffff",J=r.formBtnBorderColor||"#111111",me=Te(q,.06),Sr=Te(q,.18),pr=Te($,.85),Ae=Te(I,.06),j=_o(V),Q=Lo(j),ne=r.loadMoreBgColor||"#ffffff",Fe=r.loadMoreTextColor||"#111111",Cr=r.loadMoreBorderColor||"#111111",Er=r.paginationBgColor||"#ffffff",Tr=r.paginationTextColor||"#111111",Ar=r.paginationBorderColor||"#e5e7eb",Mr=r.paginationActiveBgColor||"#111111",ye=r.paginationActiveTextColor||"#ffffff",ur={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":p,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":x,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":f,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":h,"--renuvex-pr-filter-item-text":E,"--renuvex-pr-filter-item-hover-bg":A,"--renuvex-pr-filter-item-active":z,"--renuvex-pr-review-title":C,"--renuvex-pr-review-author":g,"--renuvex-pr-review-date":k,"--renuvex-pr-review-body":M,"--renuvex-pr-review-border":w,"--renuvex-pr-state-text":S,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":T,"--renuvex-pr-reply-border":_,"--renuvex-pr-reply-label":O,"--renuvex-pr-reply-text":y,"--renuvex-pr-media-gallery-title":P,"--renuvex-pr-media-gallery-image-border":N,"--renuvex-pr-media-gallery-arrow-bg":F,"--renuvex-pr-media-gallery-arrow-text":H,"--renuvex-pr-media-gallery-arrow-border":W,"--renuvex-pr-review-lightbox-video-icon":X,"--renuvex-pr-review-lightbox-video-progress":L,"--renuvex-pr-review-lightbox-video-progress-track":R,"--renuvex-pr-fwizard-bg":V,"--renuvex-pr-fwizard-text":I,"--renuvex-pr-fwizard-secondary-text":D,"--renuvex-pr-fwizard-input-bg":V,"--renuvex-pr-fwizard-input-text":K,"--renuvex-pr-fwizard-input-border":U,"--renuvex-pr-fwizard-placeholder":G,"--renuvex-pr-fwizard-close-text":j,"--renuvex-pr-fwizard-close-hover-bg":Q,"--renuvex-pr-fwizard-progress-bg":Ae,"--renuvex-pr-fwizard-progress-active":Z,"--renuvex-pr-fwizard-btn-bg":q,"--renuvex-pr-fwizard-btn-text":$,"--renuvex-pr-fwizard-btn-border":J,"--renuvex-pr-fwizard-btn-disabled-bg":Sr,"--renuvex-pr-fwizard-btn-disabled-text":pr,"--renuvex-pr-fwizard-nav-hover-bg":me,"--renuvex-pr-load-more-bg":ne,"--renuvex-pr-load-more-text":Fe,"--renuvex-pr-load-more-border":Cr,"--renuvex-pr-pagination-bg":Er,"--renuvex-pr-pagination-text":Tr,"--renuvex-pr-pagination-border":Ar,"--renuvex-pr-pagination-active-bg":Mr,"--renuvex-pr-pagination-active-text":ye};Object.keys(ur).forEach(function(Pr){e.style.setProperty(Pr,ur[Pr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Un(e){var r=e.settings,t=e.root,a=e.currentMediaFilter||"none",n=e.openReviewModal,i=(e.mediaStripReviews||[]).filter(function(E){return Ne(E).length>0});if(!(r.showMediaGallery!==!1&&a==="none"&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-media-gallery-section",r.showMediaGalleryTitle!==!1){var l=Y(r.mediaGalleryTitle,"M\xFC\u015Fteri G\xF6rselleri"),d=document.createElement("div");d.className="renuvex-pr-media-gallery-title",d.textContent=l,o.appendChild(d)}var u=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-media-gallery-thumb-aspect",u);var m=document.createElement("div");m.className="renuvex-pr-media-gallery-strip";var v=le,p=r.reviewLayout==="card"?le:Math.round(le*4/3),s=0;i.forEach(function(E){if(!(s>=15)){var A=fe(E);if(A){var z=Be(A,{className:"renuvex-pr-media-gallery-thumb",sourceWidth:le,width:v,height:p,loading:s<3?"eager":"lazy",onOpen:function(){n(E,A.url,i,{source:"mediaGallery"})}});z&&(m.appendChild(z),s++)}}});var x=document.createElement("button");x.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-prev";var c=re(qe);c&&x.appendChild(c),x.setAttribute("aria-label","\xD6nceki"),x.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var f=document.createElement("button");f.className="renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-next";var b=re(Ir);b&&f.appendChild(b),f.setAttribute("aria-label","Sonraki"),f.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var h=document.createElement("div");return h.className="renuvex-pr-media-gallery-strip-wrap",h.appendChild(x),h.appendChild(m),h.appendChild(f),o.appendChild(h),o}var Ro=1,No=7,jt="\u2026";function Bo(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=No){for(var n=[],i=1;i<=t;i++)n.push(i);return n}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-a)<=Ro)&&o.push(l);for(var d=[],u=0;u<o.length;u++)u>0&&o[u]-o[u-1]>1&&d.push(jt),d.push(o[u]);return d}function Hn(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},n=document.createElement("nav");n.className="renuvex-pr-pagination",n.setAttribute("aria-label","Yorum sayfalar\u0131");function i(d){n.setAttribute("aria-busy","true");for(var u=n.querySelectorAll("button"),m=0;m<u.length;m++)u[m].disabled=!0;a(d)}function o(d,u){var m=document.createElement("span");m.className="renuvex-pr-pagination-label",m.setAttribute("aria-hidden","true"),m.textContent=u,d.appendChild(m)}function l(d,u,m,v){var p=document.createElement("button");return p.type="button",p.className="renuvex-pr-pagination-arrow",p.setAttribute("aria-label",d),o(p,u),v?p.disabled=!0:p.onclick=function(){i(m)},p}return n.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),Bo(t,r).forEach(function(d){if(d===jt){var u=document.createElement("span");u.className="renuvex-pr-pagination-gap",u.setAttribute("aria-hidden","true"),u.textContent=jt,n.appendChild(u);return}var m=document.createElement("button");m.type="button",m.className="renuvex-pr-pagination-btn",m.setAttribute("aria-label","Sayfa "+d),o(m,String(d)),d===t?m.setAttribute("aria-current","page"):m.onclick=function(){i(d)},n.appendChild(m)}),n.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),n}function Vn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Dn(e){var r=e.render;async function t(){var o=je(),l=ee,d=te,u=ie,m=oe;_e(null);var v=await Ve(ee,te,1,ie,oe);We(o,{productId:l,orderBy:d,ratingFilter:u,mediaFilter:m})&&await r(ee,B,v,Ie,te,1,qt)}async function a(o){var l=je(),d=ie===o?null:o,u=ee,m=te,v=oe;$t(d),Oe(1),_e(null);var p=await Ve(ee,te,1,d,oe);We(l,{productId:u,orderBy:m,page:1,ratingFilter:d,mediaFilter:v})&&await r(ee,B,p,Ie,te,1)}async function n(o,l){var d=je(),u=ee,m=ie;Oe(1),_e(null);var v=o,p=l==="images"||l==="media"?l:"none";p!=="none"&&(v="newest"),Jt(p),Lr(v);var s=await Ve(ee,v,1,ie,p);We(d,{productId:u,orderBy:v,page:1,ratingFilter:m,mediaFilter:p})&&await r(ee,B,s,Ie,v,1)}async function i(o){var l=je(),d=ee,u=te,m=ie,v=oe;Oe(o),_e(null);var p=await Ve(ee,te,o,ie,oe);if(We(l,{productId:d,orderBy:u,page:o,ratingFilter:m,mediaFilter:v})){await r(ee,B,p,Ie,te,o);var s=document.getElementById("renuvex-reviews"),x=s&&s.shadowRoot,c=x&&x.querySelector&&x.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(h){try{c.focus()}catch(E){}}Vn(x,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var f=document.getElementById("renuvex-reviews");if(f&&typeof f.scrollIntoView=="function"){var b=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;f.scrollIntoView({behavior:b?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:n,onPageChange:i}}function Fo(){return xa()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Io(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ma({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),fa(t,{surface:"reviews",productId:r||""}),t}function Yn(e){return Math.round(Math.max(36,Math.min(52,e*.38)))}function jn(e){return Math.round(e*.5)}async function Wt(e,r,t,a,n,i,o){if(oa){Br({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:i,badgeSettings:o});return}Nr(!0),Zt(e),Qt(r),o!==void 0&&ea(o),ra(a),n&&Lr(n),i&&Oe(i),t!=null&&(ta(t),_e(t&&t.data?t.data.nextCursor:null));var l=Dn({render:Wt});try{let Ae=function(j,Q){if(!(!j||!j.meta||!j.meta.sizeOverrides)){var ne=j.meta.sizeOverrides[Q];ne&&Object.keys(ne).forEach(function(Fe){s.style.setProperty(Fe,ne[Fe])})}};var Sr=Ae,d=lt(r.summaryLayout),u=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),m=r.showTitle!==!1,v=Y(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),p=u&&m?v:"",s=document.documentElement;On(s,r);var x=r.borderRadius!==void 0?r.borderRadius:8,c=Ht[r.size]||Ht.medium,f=Vt[r.thumbnailSize]||Vt.medium,b=f;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(b=Dt[r.thumbnailSize]||Dt.medium),s.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",x+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,x-4)+"px"),s.style.setProperty("--renuvex-pr-media-gallery-title-size",c.mediaGalleryTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-load-more-min-height",c.loadMoreMinHeight+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-y",c.loadMorePadY+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-x",c.loadMorePadX+"px"),s.style.setProperty("--renuvex-pr-load-more-mobile-min-height",c.loadMoreMobileMinHeight+"px"),s.style.setProperty("--renuvex-pr-pagination-button-size",c.paginationButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-pad-x",c.paginationPadX+"px"),s.style.setProperty("--renuvex-pr-pagination-gap",c.paginationGap+"px"),s.style.setProperty("--renuvex-pr-pagination-margin-top",c.paginationMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-gap-min",c.paginationGapMin+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-button-size",c.paginationMobileButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-font-size",c.paginationMobileFontSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap",c.paginationMobileGap+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",c.paginationMobileMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",c.paginationMobileGapMin+"px"),s.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",f+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",b+"px");var h=Yn(f),E=Yn(b);s.style.setProperty("--renuvex-pr-media-play-size",h+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size",jn(h)+"px"),s.style.setProperty("--renuvex-pr-media-play-size-mobile",E+"px"),s.style.setProperty("--renuvex-pr-media-play-icon-size-mobile",jn(E)+"px");var A=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",A),s.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),Ae(lt(r.summaryLayout),r.size),Ae(pt(r.reviewLayout),r.size);var z=vr(r),C=Fo();if(!C)return;var g=Io(C,e),k=document.getElementById("renuvex-reviews");k||(k=document.createElement("div"),k.id="renuvex-reviews",k.style.minHeight="200px"),k.parentNode!==g&&g.appendChild(k);var M=ba(k),w=$e+Ge+Yr+Tn()+_n();Je(M,w);var S=wa(M);if(r.enabled===!1){k.style.minHeight="auto",S.replaceChildren(Ln(r.borderRadius!==void 0?r.borderRadius:8)),Nr(!1);var T=Rr;Br(null),T&&Wt(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}try{var _=t||{},O=xt(_),y=O?[]:_.data&&_.data.reviews||[];aa(y),S.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),p){var N=document.createElement("div"),F=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+F,N.textContent=p,P.appendChild(N)}if(O){P.appendChild(Bn(_.message,l.onRetry)),S.appendChild(P),Ue(M),vt(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return M.getElementById("renuvex-reviews-widget")});return}var H=_.data&&_.data.allCount||0,W=_.data&&_.data.ratingCounts||null,X=W||[0,0,0,0,0],L=_.data&&_.data.avgRating||"0.0";if(!W&&y.length>0){y.forEach(function(j){j.rating>=1&&j.rating<=5&&X[j.rating-1]++});var R=y.reduce(function(j,Q){return j+Q.rating},0);L=(R/y.length).toFixed(1)}if(H===0)P.classList.add("renuvex-pr-reviews-empty"),P.appendChild(Rn({iconPair:z,writeButtonText:Y(r.writeButtonText,"Yorum Yap"),emptyStateText:Y(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:ae}));else{var V=lt(r.summaryLayout),I=V.render({widget:P,productId:e,data:_,settings:r,iconPair:z,allCount:H,ratingCounts:X,avgRatingVal:L,currentRatingFilter:ie,currentOrderBy:te,currentMediaFilter:oe,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});P.appendChild(I);var D=Un({settings:r,root:s,currentMediaFilter:oe,mediaStripReviews:Xt,openReviewModal:he,wireLightboxTrigger:gr});if(D&&P.appendChild(D),y.length===0)P.appendChild(Nn());else{var K=pt(r.reviewLayout);y.forEach(function(j){P.appendChild(K.render(j,ct))})}var U=r.paginationMode==="numbered"?"numbered":"loadMore";if(U==="numbered"){var G=_.data&&_.data.totalPages||1;G>1&&P.appendChild(Hn({page:_.data&&_.data.page||sr||1,totalPages:G,onPageChange:l.onPageChange}))}var Z=U==="loadMore"&&_.data&&_.data.hasMore;if(Z){let j=function(Q){$.textContent=Q,q.setAttribute("aria-label",Q)};var pr=j,q=document.createElement("button");q.className="renuvex-pr-load-more";var $=document.createElement("span");$.className="renuvex-pr-load-more-label",$.setAttribute("aria-hidden","true"),q.appendChild($),j("Daha Fazla G\xF6ster"),q.onclick=async function(){q.disabled=!0,j("Y\xFCkleniyor...");var Q=je(),ne=ee,Fe=te,Cr=sr,Er=ie,Tr=oe,Ar=_r,Mr=Cr+1,ye=await Ve(ne,Fe,Mr,Er,Tr,null,Ar);if(We(Q,{productId:ne,orderBy:Fe,page:Cr,ratingFilter:Er,mediaFilter:Tr,nextCursor:Ar}))if(ye&&!xt(ye)&&ye.data&&Array.isArray(ye.data.reviews)){var ur=na(ye.data.reviews);ia(ur),Oe(Mr),_e(ye.data.nextCursor||null);var Pr=pt(B.reviewLayout);ur.forEach(function(Wn){P.insertBefore(Pr.render(Wn,ct),q)}),ye.data.hasMore?(q.disabled=!1,j("Daha Fazla G\xF6ster")):q.remove()}else q.disabled=!1,j("Tekrar Dene")},P.appendChild(q)}}S.appendChild(P),Ue(M),vt(P,"reviews-widget",{productId:e||""},function(){return M.getElementById("renuvex-reviews-widget")})}catch(j){console.error("[renuvex-pr] render error:",j);var J=document.createElement("p");J.style.cssText="text-align:center;color:#dc2626;",J.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",S&&S.replaceChildren(J)}}finally{if(Nr(!1),Rr){var me=Rr;Br(null),Wt(me.productId,me.settings,me.reviewsData,me.productName,me.orderBy,me.page,me.badgeSettings)}}}export{Wt as render};
