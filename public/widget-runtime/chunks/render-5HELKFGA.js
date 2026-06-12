/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Oe,d as Ye}from"./chunk-N7KC6W47.js";import{b as Wr,c as Ie}from"./chunk-I4DUUQZH.js";import{A as kt,B as St,C as fr,D as gr,E as hr,a as V,b as tr,c as K,d as J,e as F,f as M,g as vt,h as Pe,j as mr,k as Yr,l as ct,m as xr,n as Le,o as mt,p as xt,q as ft,r as gt,s as ht,t as bt,u as yt,v as ze,y as wt,z as zt}from"./chunk-H43GKW4S.js";import{A as Nt,B as Ce,C as wr,D as Z,E as zr,F as kr,G as jr,H as Dr,I as pe,J as Mt,K as ue,L as Rt,M as It,c as Or,e as ke,f as ee,g as ve,h as re,i as Ne,j as br,k as ar,l as Ct,m as je,n as yr,o as Et,p as Me,q as Tt,r as At,t as B,u as Pt,v as ce,w as Se,y as Lt,z as me}from"./chunk-XOGW5FR7.js";import{c as nr}from"./chunk-WWGCW5YN.js";import{a as we,b as er,c as rr,i as Bt,j as Re}from"./chunk-GTR5JH7S.js";var De=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function _t(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function We(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Sr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function Ft(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Ht(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var Ot=`
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
`,Yt=`
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
`;var jt=`
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
`;var Dt=`
  .renuvex-pr-photo-section{margin-bottom:24px;padding:0 var(--renuvex-pr-pad-review-mobile);}
  .renuvex-pr-photo-title{
    font-size:var(--renuvex-pr-photo-title-size,16px);
    font-weight:500;
    color:var(--renuvex-pr-photo-title,#111111);
    margin-bottom:12px;
    overflow-wrap:anywhere;
  }
  .renuvex-pr-photo-strip-wrap{position:relative;}

  .renuvex-pr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--renuvex-pr-photo-arrow-bg,#fff);border:1px solid var(--renuvex-pr-photo-arrow-border,rgba(0,0,0,0.12));border-radius:var(--renuvex-pr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--renuvex-pr-photo-arrow-text,#111111);transition:all 0.2s ease;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-photo-strip-arrow:hover{background:var(--renuvex-pr-photo-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);}}
  button.renuvex-pr-photo-strip-arrow:active{opacity:1;}
  .renuvex-pr-photo-strip-arrow-prev{left:-16px;}
  .renuvex-pr-photo-strip-arrow-next{right:-16px;}
  .renuvex-pr-photo-strip-arrow svg{width:18px;height:18px;}
  @media(max-width:600px){.renuvex-pr-photo-strip-arrow{display:none;}}

  .renuvex-pr-photo-section{margin:24px 0 32px;padding:0 var(--renuvex-pr-pad-review-mobile);display:block;}
  .renuvex-pr-photo-strip-container{position:relative;}
  @media(min-width:601px){
    .renuvex-pr-photo-strip-container{margin:0 calc(-1 * var(--renuvex-pr-pad-review-mobile));}
  }
  .renuvex-pr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px 0;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .renuvex-pr-photo-strip::-webkit-scrollbar{display:none;}
  .renuvex-pr-photo-strip-thumb{flex:0 0 var(--renuvex-pr-thumbnail-size,90px);width:var(--renuvex-pr-thumbnail-size,90px);height:auto;aspect-ratio:var(--renuvex-pr-photo-thumb-aspect,1/1);border-radius:var(--renuvex-pr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease;border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));}
  /* Mobil: list/gallery'de strip thumbnail, yorum-i\xE7i g\xF6rsele E\u015E\u0130TLEN\u0130R (o g\xF6rseller
     mobilde k\xFC\xE7\xFCl\xFCyor). card'da --renuvex-pr-thumbnail-size-mobile === masa\xFCst\xFC de\u011Feri
     oldu\u011Fundan de\u011Fi\u015Fmez. Breakpoint 600px \u2014 yorum-i\xE7i g\xF6rsellerle senkron. */
  @media(max-width:600px){
    .renuvex-pr-photo-strip-thumb{
      flex-basis:var(--renuvex-pr-thumbnail-size-mobile,var(--renuvex-pr-thumbnail-size,90px));
      width:var(--renuvex-pr-thumbnail-size-mobile,var(--renuvex-pr-thumbnail-size,90px));
    }
  }
  /* Foto tetikleyicisi role=button oldu\u011Fu i\xE7in BASE_RESET'in ADR_0011 press-dim'ini
     (opacity:0.85) miras al\u0131yor; bu, bir foto \xFCzerinde "flash" gibi okunuyor \u2014 lightbox'\u0131n
     a\xE7\u0131lmas\u0131 zaten geri bildirim. Press-dim'i kald\u0131r (role=button kural\u0131n\u0131 !important ile ez). */
  .renuvex-pr-photo-strip-thumb:active{opacity:1 !important;}
  @media(hover:hover) and (pointer:fine){.renuvex-pr-photo-strip-thumb:hover{transform:translateY(-2px);}}
  .renuvex-pr-photo-strip-wrap{position:relative;display:block;}
`;var Wt=`
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
    .renuvex-pr-load-more{min-height:var(--renuvex-pr-load-more-hit-target,44px);margin-top:var(--renuvex-pr-pagination-mobile-margin-top,var(--renuvex-pr-pagination-margin-top,20px));}
    .renuvex-pr-load-more-label{min-height:var(--renuvex-pr-load-more-mobile-min-height,var(--renuvex-pr-load-more-min-height,40px));}
    .renuvex-pr-pagination{gap:var(--renuvex-pr-pagination-mobile-gap,var(--renuvex-pr-pagination-gap,6px));margin-top:var(--renuvex-pr-pagination-mobile-margin-top,var(--renuvex-pr-pagination-margin-top,20px));}
    .renuvex-pr-pagination-btn,.renuvex-pr-pagination-arrow{min-width:var(--renuvex-pr-pagination-hit-target,44px);height:var(--renuvex-pr-pagination-hit-target,44px);font-size:var(--renuvex-pr-pagination-mobile-font-size,var(--renuvex-pr-load-more-size,14px));}
    .renuvex-pr-pagination-label{min-width:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));height:var(--renuvex-pr-pagination-mobile-button-size,var(--renuvex-pr-pagination-button-size,40px));}
    .renuvex-pr-pagination-gap{min-width:var(--renuvex-pr-pagination-mobile-gap-min,var(--renuvex-pr-pagination-gap-min,24px));}
  }
  @media (hover:hover) and (pointer:fine){
    .renuvex-pr-pagination-btn:not([aria-current="page"]):hover .renuvex-pr-pagination-label,.renuvex-pr-pagination-arrow:not(:disabled):hover .renuvex-pr-pagination-label{border-color:var(--renuvex-pr-pagination-text,#111111);}
  }
`;var Vt=`
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
`;var Ut=`
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-modal-wrap:focus,.renuvex-pr-modal-wrap:focus-visible{outline:none;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;transition:opacity 0.25s ease;}
  /* \u0130lk a\xE7\u0131l\u0131\u015Fta g\xF6rsel y\xFCklenene kadar opacity:0; load/error'da class kalkar ve yukar\u0131daki
     transition ile yumu\u015Fak fade-in olur (koyu zemine ani "pop"/flash yerine). */
  .renuvex-pr-modal-img-loading{opacity:0;}
  .renuvex-pr-modal-img-error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:#cccccc;background:#222;font-size:14px;line-height:1.4;text-align:center;}
  .renuvex-pr-modal-img-enter-right{animation:renuvexPrSlideInRight 0.2s ease forwards;}
  .renuvex-pr-modal-img-enter-left{animation:renuvexPrSlideInLeft 0.2s ease forwards;}
  @keyframes renuvexPrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes renuvexPrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
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
`;var Cr=[Ot,Lt,jt,Dt,Wt,Vt,Ut,Yt].join(`
`);function _a(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function Fa(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function Ha(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",l=Fa()&&!n;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),l&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Oa(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var ir=0,Ve=null;function Er(){return ir+=1,ir>1||(Ve=_a(),Ha(Ve)),Ve}function Tr(){if(ir!==0&&(ir-=1,!(ir>0))){var e=Ve;Ve=null,e&&Oa(e)}}function Ya(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Ar(){var e=Ya();return!e||e===document.body||e===document.documentElement?null:e}function te(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ja(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Vr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ja)}function Da(e,r){var t=e,a=Vr(e);!a.length&&r&&(t=r,a=Vr(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;te(n)}function Pr(e,r,t){if(e.key==="Tab"){var a=Vr(r);if(!a.length){e.preventDefault(),Da(r);return}var n=a[0],l=a[a.length-1],o=Ft(t);if(!r.contains(o)){e.preventDefault(),te(n);return}if(a.indexOf(o)===-1){e.preventDefault(),te(e.shiftKey?l:n);return}e.shiftKey&&o===n?(e.preventDefault(),te(l)):!e.shiftKey&&o===l&&(e.preventDefault(),te(n))}}var qt="renuvexPrOverlay";function Lr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[qt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Wa(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[qt]===e.id)}function Nr(e){if(Wa(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Ue(e){return Ce(e)}function Gt(e,r,t,a,n,l){Tr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&br(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),l&&te(n)}function Va(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ce(e.rating,M);var l=document.createElement("span");l.className="renuvex-pr-modal-date",l.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var i=document.createElement("div");i.className="renuvex-pr-modal-author",i.textContent=e.author||"",t.appendChild(i);var s=document.createElement("div");s.className="renuvex-pr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(s);var p=document.createElement("div");p.className="renuvex-pr-modal-reply";var c=document.createElement("div");c.className="renuvex-pr-modal-reply-label",c.textContent=B(M&&M.merchantReplyLabel,"Ma\u011Faza Sahibi");var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",p.appendChild(c),p.appendChild(m),p.style.display=e.merchantReply?"":"none",t.appendChild(p),r.appendChild(t),r}function Xt(e,r,t){var a=t||M,n=e.querySelector(".renuvex-pr-modal-scroll-content"),l=n.querySelector(".renuvex-pr-modal-stars");l.innerHTML=ce(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var o=n.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var i=n.querySelector(".renuvex-pr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var s=n.querySelector(".renuvex-pr-modal-reply");s.querySelector(".renuvex-pr-modal-reply-label").textContent=B(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),s.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",s.style.display=r.merchantReply?"":"none",e.scrollTop=0}function qr(e,r,t,a,n,l,o,i,s){var p=Ue(e),c=Math.max(0,Math.min(t||0,p.length-1)),m=document.createElement("div");m.className="renuvex-pr-modal-left";var u=document.createElement("img"),d=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(u.className="renuvex-pr-modal-main-img"+(d?" "+d:""),u.src=Dr(p[c]||""),u.decoding="async",u.width=jr,u.height=Math.round(jr*4/3),u.alt="Yorum foto\u011Fraf\u0131",!d){u.classList.add("renuvex-pr-modal-img-loading");var y=function(){u.classList.remove("renuvex-pr-modal-img-loading")};u.complete&&u.naturalWidth>0?y():(u.addEventListener("load",y,{once:!0}),u.addEventListener("error",y,{once:!0}))}Mt(u,function(L){if(L.style.display="none",!m.querySelector(".renuvex-pr-modal-img-error")){var C=document.createElement("div");C.className="renuvex-pr-modal-img-error",C.setAttribute("role","status"),C.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",m.insertBefore(C,L)}}),m.appendChild(u);var v=document.createElement("button");v.className="renuvex-pr-modal-close-mobile";var h=re(Me);h&&v.appendChild(h),v.setAttribute("aria-label","Kapat"),v.onclick=function(L){L.stopPropagation(),l()},m.appendChild(v);var f=0;if(m.addEventListener("touchstart",function(L){f=L.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(L){var C=f-L.changedTouches[0].clientX;if(!(Math.abs(C)<50)){if(C>0){if(k)xe(e,r,c+1,a,n,l,!0,"next",i,s);else if(z){var N=a[r+1];xe(N,r+1,0,a,n,l,!1,"next",i,s)}}else if(x)xe(e,r,c-1,a,n,l,!0,"prev",i,s);else if(b){var j=a[r-1],X=Ue(j);xe(j,r-1,X.length-1,a,n,l,!1,"prev",i,s)}}},{passive:!0}),p.length>1){var g=document.createElement("div");g.className="renuvex-pr-modal-thumbs",p.forEach(function(L,C){var N=document.createElement("img"),j=pe(L,kr);N.src=j.src,N.srcset=j.srcset,N.loading="lazy",N.decoding="async",N.width=kr,N.height=kr,N.className="renuvex-pr-modal-thumb"+(C===c?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(C+1),ue(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(C+1)+" se\xE7"),C===c&&N.setAttribute("aria-current","true"),(function(X){function Q(){xe(e,r,X,a,n,l,!0,null,i,s)}N.onclick=Q,N.onkeydown=function(D){(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),Q())}})(C),g.appendChild(N)}),m.appendChild(g)}var x=c>0,k=c<p.length-1,b=r>0,z=r<a.length-1,E=x||b,A=k||z;if(E){var w=document.createElement("button");w.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var T=re(je);T&&w.appendChild(T),w.setAttribute("aria-label","\xD6nceki"),w.onclick=function(L){if(L.stopPropagation(),x)xe(e,r,c-1,a,n,l,!0,"prev",i,s);else if(b){var C=a[r-1],N=Ue(C);xe(C,r-1,N.length-1,a,n,l,!1,"prev",i,s)}},m.appendChild(w)}if(A){var S=document.createElement("button");S.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var P=re(yr);P&&S.appendChild(P),S.setAttribute("aria-label","Sonraki"),S.onclick=function(L){if(L.stopPropagation(),k)xe(e,r,c+1,a,n,l,!0,"next",i,s);else if(z){var C=a[r+1];xe(C,r+1,0,a,n,l,!1,"next",i,s)}},m.appendChild(S)}return m}function Kt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Ue(a);n[0]&&(new Image().src=Dr(n[0]))}})}function Ur(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Ua(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function l(){Ur(t),Ur(a),Ur(n)}l(),t&&te(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){l(),requestAnimationFrame(l)}):setTimeout(l,0)}function xe(e,r,t,a,n,l,o,i,s,p){if(p&&(p.currentReview=e),o){var c=qr(e,r,t,a,n,l,i,s,p);n.firstChild&&n.replaceChild(c,n.firstChild)}else{var c=qr(e,r,t,a,n,l,i,s,p),m=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(c,n.firstChild),m&&Xt(m,e,p&&p.currentSettings),Ua(s,n)}Kt(r,a)}function se(e,r,t){var a=Ue(e);if(!a.length)return;var n=(t||[]).filter(function(A){return Ue(A).length>0}),l=n.findIndex(function(A){return A===e||A.id===e.id});l===-1&&(n.unshift(e),l=0);var o=a.indexOf(r);o<0&&(o=0);var i=document.createElement("div");i.className="renuvex-pr-modal-overlay";var s=document.createElement("div");s.className="renuvex-pr-modal";var p=!1,c=null,m=Ar(),u=Ye(),d=Er(),y=Lr(),v={currentReview:e,currentSettings:M},h=null;function f(A){var w=A&&A.detail&&A.detail.settings;if(!(w&&w===h)){h=w||null,v.currentSettings=w||M;var T=s.querySelector(".renuvex-pr-modal-right");!T||!v.currentReview||Xt(T,v.currentReview,v.currentSettings)}}function g(){p||(p=!0,window.removeEventListener(Re,f),Gt(c&&c.host,x,g,d,m,u))}function x(A){if(A.key==="Escape"){k();return}Pr(A,i,c&&c.root)}function k(){p||(p=!0,window.removeEventListener(Re,f),Gt(c&&c.host,x,g,d,m,u),Nr(y))}document.addEventListener("keydown",x),window.addEventListener("popstate",g),window.addEventListener(Re,f),i.onclick=function(){k()},s.onclick=function(A){A.stopPropagation()},s.appendChild(qr(e,l,o,n,s,k,null,i,v)),s.appendChild(Va(e)),Kt(l,n);var b=document.createElement("div");b.className="renuvex-pr-modal-wrap",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),b.appendChild(s);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var E=re(Me);E&&z.appendChild(E),z.setAttribute("aria-label","Kapat"),z.onclick=function(A){A.stopPropagation(),k()},b.appendChild(z),i.appendChild(b),c=Sr(),We(c.root,De+Oe+Cr),c.root.appendChild(i),Ne(c.root),te(b)}function Ee(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Zr={};we(Zr,{css:()=>tn,meta:()=>rn,render:()=>an});function qe(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,l=e.onFilterChange;ke(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var i=5;i>=1;i--){var s=r[i-1]||0,p=t>0?Math.round(s/t*100):0,c=n===i,m=s>0,u=B(M&&M.countLabel,"Yorum"),d=document.createElement("div");d.className="renuvex-pr-bar-row"+(m?"":" renuvex-pr-bar-empty")+(c?" renuvex-pr-bar-active":"")+(n&&!c?" renuvex-pr-bar-dimmed":""),m?(d.setAttribute("role","button"),d.setAttribute("tabindex","0"),d.setAttribute("aria-pressed",c?"true":"false"),d.setAttribute("aria-label",i+" y\u0131ld\u0131z, "+s.toLocaleString("tr-TR")+" "+u+", "+(c?"filtreyi kald\u0131r":"filtrele"))):d.setAttribute("aria-label",i+" y\u0131ld\u0131z, 0 "+u);for(var y="",v=1;v<=5;v++){var h=v<=i;y+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(h?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ee(h?"full":"outline")+"</span>"}d.innerHTML='<span class="renuvex-pr-bar-label">'+y+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+p+'%;"></div></div><span class="renuvex-pr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",m&&(function(f){function g(){l(f)}d.onclick=g,d.onkeydown=function(x){(x.key==="Enter"||x.key===" "||x.key==="Space"||x.key==="Spacebar")&&(x.preventDefault(),g())}})(i),o.appendChild(d)}return o}var $t="data-renuvex-pr-dismiss-gesture",Be=[],Jt=!1,Mr=!1,or=[],Ge=null;function Zt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Gr(){for(var e=Be.length-1;e>=0;e--){var r=Be[e].element;r&&r.isConnected===!1&&Be.splice(e,1)}return Be}function qa(e){!e||typeof e.setAttribute!="function"||(or.indexOf(e)===-1&&or.push(e),e.setAttribute($t,""))}function Qt(){for(var e=0;e<or.length;e++){var r=or[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute($t)}or=[],Ge&&typeof clearTimeout=="function"&&clearTimeout(Ge),Ge=null}function Ga(e){if(Mr){Mr=!1,Qt(),e.preventDefault(),e.stopPropagation();return}for(var r=Gr(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Zt(e,n.trigger)||Zt(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Xa(e){if(e.key==="Escape")for(var r=Gr(),t=r.length-1;t>=0;t--)r[t].close()}function ea(){Jt||typeof document=="undefined"||(document.addEventListener("click",Ga,!0),document.addEventListener("keydown",Xa),Jt=!0)}function Ka(e){ea(),Mr=!0,qa(e),Ge&&typeof clearTimeout=="function"&&clearTimeout(Ge),typeof setTimeout=="function"&&(Ge=setTimeout(function(){Mr=!1,Qt()},700))}function Xr(e){Ka(e)}function Rr(e){ea();var r={trigger:e.trigger,element:e.element,close:e.close};return Be.push(r),{unregister:function(){var t=Be.indexOf(r);t!==-1&&Be.splice(t,1)},notifyOpening:function(){for(var t=Gr(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function $(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,l=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var i=document.createElement("button");i.className="renuvex-pr-write-btn",i.textContent=B(M&&M.writeButtonText,"Yorum Yap"),i.onclick=n,o.appendChild(i);var s=document.createElement("div");s.className="renuvex-pr-filter-wrap";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-filter-btn",p.setAttribute("aria-label","Filtrele"),p.setAttribute("aria-haspopup","menu"),p.setAttribute("aria-expanded","false");var c=M&&M.filterIcon||"lines";p.innerHTML=ve(Ct(c));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var u=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],d=!1;function y(){return r&&r.parentNode||r||null}function v(x,k){if(!(k===!0||!x)){if(x.type==="touchstart"){Xr(y());return}if(x.type==="pointerdown"){var b=x.pointerType||"";b&&b!=="mouse"&&Xr(y());return}}}function h(x){var k=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),p.classList.remove("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","false");var b=x&&(x.restoreFocus===!0||x.restoreFocus==="auto"&&Ye());if(k&&b)try{p.focus({preventScroll:!0})}catch(z){try{p.focus()}catch(E){}}return k}function f(){g.notifyOpening(),m.classList.add("renuvex-pr-open"),p.classList.add("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","true");var x=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");x&&requestAnimationFrame(function(){try{x.focus({preventScroll:!0})}catch(k){try{x.focus()}catch(b){}}})}u.forEach(function(x){var k=x[2],b=k?a:!a&&(t||"newest")===x[0],z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(b?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=x[1];var E=!1;function A(w,T){w&&(w.preventDefault(),w.stopPropagation()),!E&&(E=!0,d=!0,v(w,T),h({restoreFocus:T}),l(x[0],k),setTimeout(function(){E=!1,d=!1},0))}z.addEventListener("pointerdown",function(w){w.button!==void 0&&w.button!==0||w.pointerType!=="mouse"&&A(w,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(w){A(w,!1)},{passive:!1}),z.addEventListener("keydown",function(w){(w.key==="Enter"||w.key===" ")&&A(w,!0)}),z.onclick=function(w){A(w,!1)},m.appendChild(z)}),p.onclick=function(){m.classList.contains("renuvex-pr-open")?h({restoreFocus:"auto"}):f()},s.addEventListener("keydown",function(x){x.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(x.stopPropagation(),h({restoreFocus:!0}))}),s.addEventListener("focusout",function(x){if(m.classList.contains("renuvex-pr-open")&&!d){var k=x.relatedTarget;k&&s.contains(k)||h()}});var g=Rr({trigger:s,element:m,close:h});return s.appendChild(p),s.appendChild(m),o.appendChild(s),o}var ra=`
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
`;function ta(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",n.appendChild(l);var o=document.createElement("button");o.className="renuvex-pr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat");var i=re(Me);i&&o.appendChild(i),n.appendChild(o);var s=!1,p=null,c=null,m=!1;function u(){te(a)}function d(b){Pr(b,a,p&&p.root)}function y(){if(!s){if(s=!0,document.removeEventListener("keydown",v),a.removeEventListener("click",h),o.removeEventListener("click",y),m)te(c);else{var b=p&&p.root?p.root.activeElement:null;if(b&&typeof b.blur=="function")try{b.blur()}catch(z){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){p?(br(p.root),p.host&&p.host.parentNode&&p.host.parentNode.removeChild(p.host)):a.parentNode&&a.parentNode.removeChild(a),Tr();try{r()}catch(z){}},200)}}function v(b){if(b.key==="Escape"){y();return}d(b)}function h(b){b.target===a&&t&&y()}document.addEventListener("keydown",v),a.addEventListener("click",h),o.addEventListener("click",y);function f(b){c=Ar(),m=Ye(),b&&l.appendChild(b),p=Sr(),We(p.root,De+Oe+ra),p.root.appendChild(a),Ne(p.root),Er(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),u()})}var g=null,x=null;function k(b,z){if(z=z||"error",g){try{g.remove()}catch(E){}g=null}x&&(clearTimeout(x),x=null),g=document.createElement("div"),g.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,g.textContent=b,n.appendChild(g),x=setTimeout(function(){g&&(g.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(g){try{g.remove()}catch(E){}g=null}},300))},4e3)}return{open:f,close:y,content:l,setAllowOutsideClose:function(b){t=!!b},setStepAttr:function(b){n.setAttribute("data-step",String(b))},showToast:k}}var Kr=4;function Xe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function aa(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(l){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Kr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(l){return l!==n})}}}}function na(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},l=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",i.setAttribute("aria-label","Geri"),i.innerHTML=ve(je)+"<span>Geri</span>",i.addEventListener("click",function(){a()}),o.appendChild(i);var s=document.createElement("div");s.className="renuvex-pr-fwizard-footer-progress";for(var p=[],c=0;c<Kr;c++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",s.appendChild(m),p.push(m)}o.appendChild(s);var u=document.createElement("button");u.type="button";var d=null;function y(h){d&&u.removeEventListener("click",d),d=h,h&&u.addEventListener("click",h)}o.appendChild(u);function v(h,f){var g=r.indexOf(h)!==-1,x=t.indexOf(h)!==-1,k=f&&(f.images&&f.images.length>0||f.pendingImages&&f.pendingImages.length>0);if(g)h===2&&k?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",y(function(){l()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",y(function(){n()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(x){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var b=Xe(h,f);u.disabled=!b,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!b),y(function(){u.disabled||l()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,y(null)}return{el:o,update:function(h,f){p.forEach(function(x,k){k+1<=h?x.classList.add("renuvex-pr-fwizard-progress-seg-active"):x.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var g=h<=1;i.style.visibility=g?"hidden":"",i.style.pointerEvents=g?"none":"",i.tabIndex=g?-1:0,v(h,f)},setNextDisabled:function(h){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!h,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!h))},setThanksState:function(h){i.style.visibility="hidden",s.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),y(h)}}}var Ja={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function fe(e){return B(M&&M[e],Ja[e])}function ia(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title",l.textContent=fe("formStepRatingTitle"),t.appendChild(l);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var i=ar(M||{});ke(i);var s=[];function p(h){s.forEach(function(f,g){var x=g<h;f.classList.toggle("renuvex-pr-fwizard-star-active",x),f.setAttribute("aria-checked",g+1===h?"true":"false"),f.innerHTML=x?ee("full"):ee("outline")})}function c(h){e.set({rating:h}),p(h)}function m(h){var f=s[h-1];if(f)try{f.focus()}catch(g){}}function u(h,f){f&&typeof f.preventDefault=="function"&&f.preventDefault(),f&&typeof f.stopPropagation=="function"&&f.stopPropagation(),!a&&(a=!0,c(h),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var d=1;d<=5;d++)(function(h){var f=document.createElement("button");f.type="button",f.className="renuvex-pr-fwizard-star",f.setAttribute("role","radio"),f.setAttribute("aria-label",h+" y\u0131ld\u0131z"),f.innerHTML=ee("outline"),f.addEventListener("mouseenter",function(){p(h)}),f.addEventListener("mouseleave",function(){p(e.get().rating)}),f.addEventListener("pointerdown",function(g){g.button&&g.button!==0||u(h,g)}),typeof window!="undefined"&&!window.PointerEvent&&f.addEventListener("touchstart",function(g){u(h,g)},{passive:!1}),f.addEventListener("mousedown",function(g){window.PointerEvent||u(h,g)}),f.addEventListener("keydown",function(g){if(g.key==="Enter"||g.key===" "){u(h,g);return}var x=0;g.key==="ArrowRight"||g.key==="ArrowUp"?x=Math.min(5,h+1):g.key==="ArrowLeft"||g.key==="ArrowDown"?x=Math.max(1,h-1):g.key==="Home"?x=1:g.key==="End"&&(x=5),x&&(g.preventDefault(),c(x),m(x))}),f.addEventListener("click",function(g){u(h,g)}),s.push(f),o.appendChild(f)})(d);p(e.get().rating);var y=null,v=function(h){var f=h&&h.detail&&h.detail.settings;f&&f===y||(y=f||null,i=ar(f||M||{}),p(e.get().rating))};return window.addEventListener(Re,v),t.appendChild(o),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Re,v)}}}var oa=3,Za=10*1024*1024;function la(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=fe("formStepPhotosTitle"),a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-subtitle",l.textContent=fe("formStepPhotosSubtitle"),a.appendChild(l);var o=document.createElement("div");o.className="renuvex-pr-fwizard-photo-card";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-photo-add",i.setAttribute("aria-label","Foto\u011Fraf ekle");var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",o.appendChild(i),o.appendChild(s);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),o.appendChild(p),a.appendChild(o);var c=r.revokeBlobUrl||function(g){g&&typeof g=="string"&&g.startsWith("blob:")&&URL.revokeObjectURL(g)},m=r.blobMap||{},u=r.urlToFinger||{};function d(){if(!t){var g=e.get().images||[],x=e.get().pendingImages||[],k=g.map(function(b){return{url:b,isPending:!1}}).concat(x.map(function(b){return{url:b.url,file:b.file,isPending:!0,error:b.error}}));p.innerHTML="",k.forEach(function(b){var z=m[b.url]||b.url,E=y(b,z);p.appendChild(E)}),h()}}function y(g,x){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var b=document.createElement("img");b.src=x,b.alt="",b.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(b);var z=document.createElement("div");z.className="renuvex-pr-fwizard-photo-loading",z.style.display="none",k.appendChild(z);var E=document.createElement("button");E.type="button",E.className="renuvex-pr-fwizard-photo-remove",E.setAttribute("aria-label","Kald\u0131r");var A=re(Me);return A&&E.appendChild(A),k.appendChild(E),v(k,g,x),k}function v(g,x,k){var b=g.querySelector("img");b.src!==k&&(b.src=k);var z=g.querySelector(".renuvex-pr-fwizard-photo-loading");if(x.isPending&&x.error){z.style.display="flex",z.textContent="";var E=document.createElement("span");E.className="renuvex-pr-upload-error",E.textContent="\u2717 "+x.error,z.appendChild(E)}else z.style.display="none",z.textContent="";var A=g.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var w=u[x.url]||(x.file?x.file.name+"_"+x.file.size:null),T=m[x.url],S={};w&&(S.fingerprints=(e.get().fingerprints||[]).filter(function(P){return P!==w})),x.isPending?S.pendingImages=(e.get().pendingImages||[]).filter(function(P){return P.url!==x.url}):S.images=(e.get().images||[]).filter(function(P){return P!==x.url}),e.set(S),c(x.url),c(T),delete u[x.url],T&&delete u[T],m[x.url]&&delete m[x.url]}}function h(){var g=(e.get().images||[]).length,x=(e.get().pendingImages||[]).length,k=g+x,b=k>=oa;k>0?(o.classList.add("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ve(At)):(o.classList.remove("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ve(Tt)+"<span>Foto\u011Fraf Ekle</span>"),b?(i.style.display="none",i.disabled=!0,s.disabled=!0):(i.style.display="flex",i.disabled=!1,s.disabled=!1,i.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}i.addEventListener("click",function(){s.disabled||s.click()}),s.onchange=async function(g){var x=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(g.target.files).slice(0,oa-x);s.value="";var b=(e.get().pendingImages||[]).length,z=e.get().images||[],E=z.length;if(k.length!==0){for(var A=[],w=[],T=0;T<k.length;T++){var S=k[T],P=S.name+"_"+S.size,L=(e.get().fingerprints||[]).some(function(O){return O===P})||A.some(function(O){return O.file.name+"_"+O.file.size===P});if(!L){if(S.size>Za){var C="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(C,"error"):alert(C);continue}var N=URL.createObjectURL(S);u[N]=P,A.push({url:N,file:S,error:null}),w.push({url:N,file:S});var j=(e.get().fingerprints||[]).slice();j.push(P),e.set({fingerprints:j})}}if(A.length!==0){var X=(e.get().pendingImages||[]).concat(A),Q=async function(){for(var O=0;O<w.length;O++){var ie=w[O],q=ie.file,G=ie.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var oe=(e.get().pendingImages||[]).filter(function(R){return R.url!==G}),he=(e.get().images||[]).slice();he.push(G),e.set({pendingImages:oe,images:he});continue}try{var ae=await nr(rr+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er})});if(!ae.ok)throw ae.status===429?new Error("rate_limit"):new Error("sign failed");var Y=await ae.json();if(!Y.folder)throw new Error("sign folder missing");var I=new FormData;I.append("file",q),I.append("api_key",Y.api_key),I.append("timestamp",Y.timestamp),I.append("signature",Y.signature),I.append("folder",Y.folder);var H=await fetch("https://api.cloudinary.com/v1_1/"+Y.cloud_name+"/image/upload",{method:"POST",body:I}),_=await H.json();if(_.secure_url&&Nt(_.secure_url)){var Te=(e.get().pendingImages||[]).some(function(R){return R.url===G});if(!Te)continue;m[_.secure_url]=G,u[_.secure_url]=u[G];var ne=(e.get().pendingImages||[]).filter(function(R){return R.url!==G}),Ze=(e.get().images||[]).slice();Ze.push(_.secure_url),e.set({pendingImages:ne,images:Ze});try{nr(rr+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er,secureUrl:_.secure_url,metadata:{assetId:_.asset_id,publicId:_.public_id,version:_.version,resourceType:_.resource_type,format:_.format,width:_.width,height:_.height,bytes:_.bytes,signature:_.signature}})}).catch(function(){})}catch(R){}}else throw new Error("invalid image url")}catch(R){console.error("[renuvex-pr] Image upload failed:",R);var $e=R.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast($e,"error");var be=(e.get().pendingImages||[]).map(function(W){return W.url===G?{url:W.url,file:W.file,error:$e}:W});e.set({pendingImages:be})}}};if(E===0&&b===0){t=!0;var D=!r.canNavigate||r.canNavigate();D&&e.goNext()}e.set({pendingImages:X}),Q()}}};var f=e.onChange(d);return d(),{el:a,destroy:function(){t=!0,s.onchange=null,f&&f()}}}var Jr=2e3,$a=60;function pa(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=fe("formStepContentTitle"),a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=$a,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),l.appendChild(o);var i=document.createElement("textarea");i.className="renuvex-pr-fwizard-textarea",i.placeholder="Deneyiminizi anlat\u0131n\u2026",i.maxLength=Jr,i.rows=6,i.setAttribute("aria-label","Yorum"),i.value=e.get().comment||"",l.appendChild(i);var s=document.createElement("div");s.className="renuvex-pr-fwizard-char-counter",s.setAttribute("aria-live","polite"),l.appendChild(s);function p(){var m=i.value.length;s.textContent=m+"/"+Jr,s.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=Jr)}function c(){return Xe(3,e.get())}return i.addEventListener("input",function(){e.set({comment:i.value}),p(),t(c())}),a.appendChild(l),p(),setTimeout(function(){t(c())},0),{el:a,destroy:function(){}}}var Qa=40;function ua(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=fe("formStepAuthorTitle"),n.appendChild(l);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var i=document.createElement("div");i.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.maxLength=Qa,p.setAttribute("aria-required","true"),p.value=e.get().author||"",i.appendChild(s),i.appendChild(p),o.appendChild(i);var c=document.createElement("div");c.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",c.appendChild(m),c.appendChild(u),o.appendChild(c);var d=document.createElement("div");d.className="renuvex-pr-fwizard-notice",d.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(d);var y=document.createElement("div");y.className="renuvex-pr-fwizard-msg",y.setAttribute("role","alert"),y.setAttribute("aria-live","assertive"),o.appendChild(y);var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-submit-btn",v.textContent="G\xF6nder",o.appendChild(v),n.appendChild(o);function h(){return Xe(4,e.get())}function f(){var b=!h(),z=(e.get().pendingImages||[]).length,E=z>0;E?(v.disabled=!0,v.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),v.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(v.disabled=b,v.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",b),v.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),f(),t(h())}),u.addEventListener("input",function(){e.set({email:u.value})}),f(),setTimeout(function(){t(h())},0);function g(){y.textContent=""}function x(b){g();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=b||"",y.appendChild(z)}v.onclick=async function(){if(!v.disabled){var b=e.get(),z=(b.author||"").trim(),E=(b.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!z){x("Gerekli alan");return}if(!b.rating){x("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}v.disabled=!0,v.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=v.textContent;if(v.textContent="G\xF6nderiliyor\u2026",g(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var w=Pt(window.location.href),T=b.productName||null,S=await nr(rr+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er,productId:b.productId||null,slug:w||null,productName:T,author:z,title:(b.title||"").trim()||null,comment:E||null,rating:b.rating,images:b.images||[]})},15e3);if(S.ok)a();else{var P=await S.json().catch(function(){return{}});throw new Error(P.error||"Yorum kaydedilemedi.")}}catch(N){var L=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),C=L?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(C,"error"):x(C),v.disabled=!1,v.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),v.textContent=A}}};var k=e.onChange(f);return{el:n,destroy:function(){v.onclick=null,k&&k()}}}function en(e,r,t){if(t=t||{},e===1)return ia(r,{canNavigate:t.canNavigate});if(e===2)return la(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return pa(r,{onValidityChange:t.onValidityChange});if(e===4)return ua(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function da(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function sa(e){e=e||{};var r=aa({productId:e.productId,productName:e.productName}),t={},a={},n={};function l(w){if(!(!w||typeof w!="string"||!w.startsWith("blob:")||n[w])){n[w]=!0;try{URL.revokeObjectURL(w)}catch(T){}}}function o(){Object.keys(a).forEach(function(T){l(T)}),Object.keys(t).forEach(function(T){l(t[T])});var w=r.get();(w.pendingImages||[]).forEach(function(T){l(T&&T.url)}),(w.images||[]).forEach(function(T){l(T)})}var i=ta({onClose:function(){window.removeEventListener("popstate",p),Nr(s),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),s=Lr(),p=function(w){i&&i.close&&i.close()};window.addEventListener("popstate",p);var c=document.createElement("div");c.className="renuvex-pr-fwizard-step-wrap";var m=na({skippableSteps:[2],nextableSteps:[3],onBack:function(){y==="idle"&&r.goBack()},onSkip:function(){y==="idle"&&r.goNext()},onNext:function(){y==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="renuvex-pr-fwizard-layout",u.appendChild(c),u.appendChild(m.el);var d=null,y="idle",v=null,h=!0,f=null;function g(w,T){c.innerHTML="";var S=en(w,r,{canNavigate:function(){return y==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:l,onValidityChange:function(C){m.setNextDisabled(!C)},onSuccess:k,showToast:i.showToast});if(d=S,m.update(w,r.get()),T){y="entering",S.el.classList.add("renuvex-pr-fwizard-step--enter");var P=null,L=function(){P&&clearTimeout(P),S.el.removeEventListener("animationend",L),S.el.classList.remove("renuvex-pr-fwizard-step--enter"),y="idle",v!==null&&b()};S.el.addEventListener("animationend",L),P=setTimeout(L,700)}else y="idle";c.appendChild(S.el),i.setStepAttr&&i.setStepAttr(w),w===3&&m.setNextDisabled(!0)}var x=!1;function k(){if(!x){if(x=!0,!d){c.innerHTML="";var w=da();w.classList.add("renuvex-pr-fwizard-step--enter"),c.appendChild(w),i.setStepAttr("thanks"),m.setThanksState(i.close);return}var T=d;y="exiting",T.el.classList.add("renuvex-pr-fwizard-step--exit");var S=function(){if(f&&clearTimeout(f),T.el.removeEventListener("animationend",S),T.destroy)try{T.destroy()}catch(L){}d===T&&(d=null),c.innerHTML="";var P=da();P.classList.add("renuvex-pr-fwizard-step--enter"),c.appendChild(P),i.setStepAttr("thanks"),m.setThanksState(i.close),y="idle"};T.el.addEventListener("animationend",S),f=setTimeout(S,300)}}function b(){var w=r.get().currentStep;if(y!=="idle"){v=w;return}if(!d){var T=!h;h=!1,g(w,T);return}var S=d;y="exiting",S.el.classList.add("renuvex-pr-fwizard-step--exit");var P=function(){if(f&&clearTimeout(f),S.el.removeEventListener("animationend",P),S.destroy)try{S.destroy()}catch(C){}if(d===S){c.innerHTML="",d=null;var L=v!==null?v:r.get().currentStep;v=null,g(L,!0),y="idle"}};S.el.addEventListener("animationend",P),f=setTimeout(P,350)}b();var z=r.get().currentStep,E=r.onChange(function(w){w.currentStep!==z?(z=w.currentStep,b()):m.update(w.currentStep,w)}),A=i.close;return i.close=function(){E&&E(),typeof f!="undefined"&&f&&clearTimeout(f),A()},i.open(u),{close:i.close}}function U(){sa({productId:F||"",productName:Pe||""})}var va=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var rn={id:"classic",name:"Klasik (A\xE7\u0131k)"},tn=va;function an(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,l=e.allCount,o=e.ratingCounts,i=e.avgRatingVal,s=e.currentRatingFilter,p=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,u=e.onSortChange;ke(n);var d=document.createElement("div");d.className="renuvex-pr-summary";var y=(o[3]||0)+(o[4]||0),v=l>0?Math.round(y/l*100):0,h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-avg",h.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ee("full")+'</span><span class="renuvex-pr-avg-num">'+i+"</span>",d.appendChild(h);var f=document.createElement("div");if(f.className="renuvex-pr-summary-block renuvex-pr-summary-count",f.textContent=l.toLocaleString("tr-TR")+" "+B(a.countLabel,"Yorum"),d.appendChild(f),a.showRecommendation!==!1&&v>0){var g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",d.appendChild(g)}return d.appendChild(qe({ratingCounts:o,allCount:l,iconPair:n,currentRatingFilter:s,onFilterChange:m})),d.appendChild($({widget:r,currentOrderBy:p,currentHasImages:c,onWriteClick:U,onSortChange:u})),d}var $r={};we($r,{css:()=>on,meta:()=>nn,render:()=>dn});var ca=`
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
`;var nn={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},on=ca,ln="__unknown_product__",lr=Object.create(null);function pn(e){return e?String(e):ln}var _e=null,pr=null;function un(){!_e||!pr||(_e.removeEventListener?_e.removeEventListener("change",pr):_e.removeListener&&_e.removeListener(pr),_e=null,pr=null)}function dn(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,l=e.allCount,o=e.ratingCounts,i=e.avgRatingVal,s=e.currentRatingFilter,p=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,u=e.onSortChange,d=pn(t),y=document.createElement("div");y.className="renuvex-pr-summary renuvex-pr-summary-compact";var v=document.createElement("div");v.className="renuvex-pr-compact-header";var h=document.createElement("div");h.className="renuvex-pr-compact-trigger-wrap";var f=document.createElement("button");f.className="renuvex-pr-compact-trigger",f.type="button",f.setAttribute("aria-expanded","false"),f.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Se(i,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+ve(Et)+"</span>";var g=f.querySelector(".renuvex-pr-compact-trigger-text"),x=f.querySelector(".renuvex-pr-compact-chevron");if(g&&(g.textContent=l.toLocaleString("tr-TR")+" "+B(a.countLabel,"Yorum")),g&&x){var k=document.createElement("span");k.className="renuvex-pr-compact-trigger-count",f.insertBefore(k,g),k.appendChild(g),k.appendChild(x)}h.appendChild(f),v.appendChild(h);var b=$({widget:r,currentOrderBy:p,currentHasImages:c,onWriteClick:U,onSortChange:u}),z=b.querySelector(".renuvex-pr-filter-wrap"),E=b.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-compact-actions-slot",E&&A.appendChild(E),z&&A.appendChild(z),v.appendChild(A),y.appendChild(v);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),w.setAttribute("aria-hidden","true");var T=document.createElement("div");T.className="renuvex-pr-compact-panel-inner";var S=document.createElement("div");S.className="renuvex-pr-compact-avg",S.innerHTML='<span class="renuvex-pr-icon">'+ee("full")+"</span><span>"+i+"</span>",T.appendChild(S),T.appendChild(qe({ratingCounts:o,allCount:l,iconPair:n,currentRatingFilter:s,onFilterChange:function(I){L()&&w.classList.contains("renuvex-pr-open")&&(lr[d]=!0),m(I)}})),w.appendChild(T);var P=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function L(){return!!(P&&P.matches)}function C(I){I?w.classList.add("renuvex-pr-open"):w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden",I?"false":"true"),f.setAttribute("aria-expanded",I?"true":"false")}function N(I){var H=I?y:h;if(w.parentNode!==H){var _=!!w.parentNode;w.classList.contains("renuvex-pr-open")&&C(!1),_&&(lr[d]=!1),H.appendChild(w)}}N(P?P.matches:!1);var j=$({widget:r,currentOrderBy:p,currentHasImages:c,onWriteClick:U,onSortChange:u}),X=j.querySelector(".renuvex-pr-filter-wrap"),Q=j.querySelector(".renuvex-pr-write-btn"),D=document.createElement("div");D.className="renuvex-pr-compact-write-row",Q&&D.appendChild(Q),X&&D.appendChild(X),y.appendChild(D);function O(){var I=w.classList.contains("renuvex-pr-open");return C(!1),L()&&(lr[d]=!1),I}function ie(){q&&q.notifyOpening(),C(!0),L()&&(lr[d]=!0)}f.onclick=function(){w.classList.contains("renuvex-pr-open")?O():ie()};var q=null;function G(I){q&&(q.unregister(),q=null),I||(q=Rr({trigger:h,element:w,close:O}))}if(G(P?P.matches:!1),un(),P){var oe=function(I){N(I.matches),G(I.matches)};P.addEventListener?P.addEventListener("change",oe):P.addListener&&P.addListener(oe),_e=P,pr=oe}if(L()&&lr[d]&&C(!0),a.showRecommendation!==!1){var he=(o[3]||0)+(o[4]||0),ae=l>0?Math.round(he/l*100):0;if(ae>0){var Y=document.createElement("div");Y.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",Y.style.marginTop="8px",Y.innerHTML='<span class="renuvex-pr-recommend-pct">%'+ae+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",T.appendChild(Y)}}return y}var Qr={};we(Qr,{css:()=>vn,meta:()=>sn,render:()=>cn});var ma=`
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
`;var sn={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},vn=ma;function cn(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,l=e.ratingCounts,o=e.avgRatingVal,i=e.currentRatingFilter,s=e.currentOrderBy,p=e.currentHasImages,c=e.onFilterChange,m=e.onSortChange;ke(a);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var d=document.createElement("div");d.className="renuvex-pr-split-col renuvex-pr-split-left";var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",y.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ee("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",d.appendChild(y);var v=document.createElement("div");v.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",v.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),d.appendChild(v),u.appendChild(d);var h=document.createElement("div");h.className="renuvex-pr-split-col renuvex-pr-split-mid",h.appendChild(qe({ratingCounts:l,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:c})),u.appendChild(h);var f=$({widget:r,currentOrderBy:s,currentHasImages:p,onWriteClick:U,onSortChange:m}),g=f.querySelector(".renuvex-pr-filter-wrap"),x=f.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-split-col renuvex-pr-split-right",x&&k.appendChild(x),g&&k.appendChild(g),u.appendChild(k);var b=(l[3]||0)+(l[4]||0),z=n>0?Math.round(b/n*100):0,E=document.createElement("div");E.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",E.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||z===0;return A&&E.classList.add("renuvex-pr-split-rec-hidden"),d.appendChild(E),u}var et={};we(et,{css:()=>xn,meta:()=>mn,render:()=>fn});var xa=`
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
`;var mn={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},xn=xa;function fn(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,l=e.avgRatingVal,o=e.currentOrderBy,i=e.currentHasImages,s=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-minimal";var c=document.createElement("div");c.className="renuvex-pr-minimal-info";var m=document.createElement("div");m.className="renuvex-pr-minimal-row";var u=document.createElement("span");u.className="renuvex-pr-minimal-avg",u.textContent=l,m.appendChild(u);var d=document.createElement("span");d.className="renuvex-pr-minimal-stars",d.innerHTML=Se(l,a),m.appendChild(d);var y=document.createElement("span");y.className="renuvex-pr-minimal-count",y.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),m.appendChild(y),c.appendChild(m),p.appendChild(c);var v=$({widget:r,currentOrderBy:o,currentHasImages:i,onWriteClick:U,onSortChange:s}),h=v.querySelector(".renuvex-pr-filter-wrap"),f=v.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");g.className="renuvex-pr-minimal-actions",f&&g.appendChild(f),h&&g.appendChild(h),p.appendChild(g);var x=$({widget:r,currentOrderBy:o,currentHasImages:i,onWriteClick:U,onSortChange:s}),k=x.querySelector(".renuvex-pr-filter-wrap"),b=x.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-minimal-write-row",b&&z.appendChild(b),k&&z.appendChild(k),p.appendChild(z),p}var rt={};we(rt,{css:()=>hn,meta:()=>gn,render:()=>bn});var fa=`
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
`;var gn={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},hn=fa;function bn(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,l=e.avgRatingVal,o=e.currentOrderBy,i=e.currentHasImages,s=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-hero";var c=document.createElement("div");c.className="renuvex-pr-hero-info";var m=document.createElement("div");m.className="renuvex-pr-hero-rating-col";var u=document.createElement("span");u.className="renuvex-pr-hero-avg",u.textContent=l,m.appendChild(u);var d=document.createElement("div");d.className="renuvex-pr-hero-meta-row";var y=document.createElement("span");y.className="renuvex-pr-hero-stars",y.innerHTML=Se(l,a),d.appendChild(y);var v=document.createElement("div");v.className="renuvex-pr-hero-count",v.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),d.appendChild(v),m.appendChild(d),c.appendChild(m),p.appendChild(c);var h=$({widget:r,currentOrderBy:o,currentHasImages:i,onWriteClick:U,onSortChange:s}),f=h.querySelector(".renuvex-pr-filter-wrap"),g=h.querySelector(".renuvex-pr-write-btn"),x=document.createElement("div");x.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",g&&x.appendChild(g),f&&x.appendChild(f),p.appendChild(x);var k=$({widget:r,currentOrderBy:o,currentHasImages:i,onWriteClick:U,onSortChange:s}),b=k.querySelector(".renuvex-pr-filter-wrap"),z=k.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");return E.className="renuvex-pr-hero-write-row",z&&E.appendChild(z),b&&E.appendChild(b),p.appendChild(E),p}var ga=`
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
`;var Ir={classic:Zr,compact:$r,split:Qr,minimal:et,hero:rt};function Br(e){return Ir[e]||Ir.classic}function ha(){var e=Object.keys(Ir).map(function(r){return Ir[r].css||""}).join(`
`);return ga+`
`+e}var tt={};we(tt,{css:()=>wn,meta:()=>yn,render:()=>zn});function Ke(e,r,t){var a=t||{},n=document.createDocumentFragment(),l=document.createElement("div");l.className=r+" renuvex-pr-body-clamped",l.textContent=e,n.appendChild(l);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",n.appendChild(o),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var i=!1;o.onclick=function(){i=!i,l.classList.toggle("renuvex-pr-body-clamped",!i),o.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:l,readMore:o}}function Je(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=B(M&&M.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",l.textContent=e,t.appendChild(l);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var i=!1;o.onclick=function(){i=!i,l.classList.toggle("renuvex-pr-reply-text-clamped",!i),o.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var ba=`
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
  .renuvex-pr-review .renuvex-pr-img{width:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));height:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));object-fit:cover;border-radius:var(--renuvex-pr-radius,6px);border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));cursor:pointer;}
  /* Kart foto tetikleyicisi role=button \u2192 BASE_RESET press-dim'ini (opacity:0.85) miras
     al\u0131yor ve bas\u0131nca "flash" gibi okunuyor. Kald\u0131r (lightbox a\xE7\u0131l\u0131\u015F\u0131 zaten geri bildirim). */
  .renuvex-pr-review .renuvex-pr-img:active{opacity:1 !important;}

  @media(max-width:600px){
    .renuvex-pr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .renuvex-pr-review .renuvex-pr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .renuvex-pr-review .renuvex-pr-gallery::-webkit-scrollbar{display:none;}
    .renuvex-pr-review .renuvex-pr-img{flex-shrink:0;}
  }
`;var yn={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},wn=ba;function zn(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var l=document.createElement("span");l.className="renuvex-pr-review-stars",l.innerHTML=ce(e.rating,M),n.appendChild(l);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-title",i.textContent=e.title,t.appendChild(i)}var s=document.createElement("div");s.className="renuvex-pr-author",s.textContent=e.author||"",t.appendChild(s);var p=(e.comment||"").trim();p&&t.appendChild(Ke(p,"renuvex-pr-body").fragment);var c=Ce(e);if(c.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",c.forEach(function(d){var y=document.createElement("img"),v=pe(d,Z);y.src=v.src,y.srcset=v.srcset,y.loading="lazy",y.decoding="async",y.width=Z,y.height=Z,y.className="renuvex-pr-img",ue(y),y.setAttribute("data-renuvex-img-url",d),(function(h){Ee(y,function(){se(e,h,r)})})(d),m.appendChild(y)}),t.appendChild(m)}var u=Je(e.merchantReply);return u&&t.appendChild(u),t}var at={};we(at,{css:()=>Sn,meta:()=>kn,render:()=>Cn});var ya=`
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
  .renuvex-pr-review-list-media img{
    display:block;flex:0 0 auto;
    width:var(--renuvex-pr-list-photo-w,120px);height:var(--renuvex-pr-list-photo-h,160px);max-width:100%;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));
    cursor:pointer;
  }
  /* Desktop: sadece ilk foto g\xF6r\xFCn\xFCr (sa\u011F kolonda tek delil g\xF6rseli). DOM'da
     t\xFCm fotolar var, modal i\xE7in kullan\u0131l\u0131r. Mobile'da kural\u0131n aktif olmamas\u0131
     i\xE7in min-width:601 media query i\xE7inde tan\u0131mland\u0131 \u2014 b\xF6ylece mobile strip
     t\xFCm fotolar\u0131 g\xF6stermeye engel olmaz. */
  @media (min-width:601px){
    .renuvex-pr-review-list-media img:not(:first-child){display:none;}
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
    .renuvex-pr-review-list-media img{
      flex-shrink:0;
      width:var(--renuvex-pr-list-photo-w-mobile,100px);
      height:var(--renuvex-pr-list-photo-h-mobile,133.33px);
      max-width:none;
      aspect-ratio:3/4;
      display:block;
    }
  }
`;var kn={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Sn=ya;function Cn(e,r){var t=Ce(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ce(e.rating,M),l.appendChild(o);var i=document.createElement("span");i.className="renuvex-pr-review-list-author-name",i.textContent=e.author||"",l.appendChild(i);var s=document.createElement("time");s.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&s.setAttribute("datetime",e.createdAt),s.textContent=me(e.createdAt),l.appendChild(s),n.appendChild(l);var p=document.createElement("div");if(p.className="renuvex-pr-review-list-content",e.title){var c=document.createElement("div");c.className="renuvex-pr-review-list-title",c.textContent=e.title,p.appendChild(c)}var m=(e.comment||"").trim();m&&p.appendChild(Ke(m,"renuvex-pr-review-list-body").fragment);var u=Je(e.merchantReply);if(u&&p.appendChild(u),n.appendChild(p),a){var d=document.createElement("div");d.className="renuvex-pr-review-list-media",t.forEach(function(y){var v=document.createElement("img"),h=pe(y,Z);v.src=h.src,v.srcset=h.srcset,v.loading="lazy",v.decoding="async",v.width=Z,v.height=Math.round(Z*4/3),v.setAttribute("data-renuvex-img-url",y),ue(v),(function(f){Ee(v,function(){se(e,f,r)})})(y),d.appendChild(v)}),n.appendChild(d)}return n}var nt={};we(nt,{css:()=>Tn,meta:()=>En,render:()=>An});var wa=`
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
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, foto strip vs. */
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-title,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-summary,
  #renuvex-reviews-widget:has(.renuvex-pr-review-gallery) > .renuvex-pr-photo-section,
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
  .renuvex-pr-review-gallery-media img{
    display:block;width:100%;height:auto;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));
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
`;var En={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Tn=wa;function An(e,r){var t=wr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ce(e.rating,M),l.appendChild(o),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-gallery-title",i.textContent=e.title,l.appendChild(i)}var s=document.createElement("div");s.className="renuvex-pr-review-gallery-author",s.textContent=e.author||"",l.appendChild(s);var p=document.createElement("time");p.className="renuvex-pr-review-gallery-date",p.style.display="block",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=me(e.createdAt),l.appendChild(p);var c=(e.comment||"").trim();if(c&&l.appendChild(Ke(c,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){se(e,t,r)}}:null).fragment),n.appendChild(l),a){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var u=document.createElement("img"),d=pe(t,zr);u.src=d.src,u.srcset=d.srcset,u.loading="lazy",u.decoding="async",u.width=zr,u.height=Math.round(zr*4/3),ue(u),u.setAttribute("data-renuvex-img-url",t),Ee(u,function(){se(e,t,r)}),m.appendChild(u),n.appendChild(m)}var y=Je(e.merchantReply,t?function(){se(e,t,r)}:null);return y&&(y.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(y)),n}var _r={card:tt,list:at,gallery:nt};function Fr(e){return _r[e]||_r.card}function za(){return Object.keys(_r).map(function(e){return _r[e].css||""}).join(`
`)}var it=0;function Fe(){return it++,it}function He(e,r){return e!==it?!1:r?!(r.productId!==void 0&&F!==r.productId||r.orderBy!==void 0&&V!==r.orderBy||r.page!==void 0&&tr!==r.page||r.ratingFilter!==void 0&&K!==r.ratingFilter||r.hasImages!==void 0&&J!==r.hasImages||r.nextCursor!==void 0&&mr!==r.nextCursor):!0}var ot={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,loadMoreHitTarget:44,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,paginationHitTarget:44,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,loadMoreHitTarget:44,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,paginationHitTarget:44,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,loadMoreHitTarget:44,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,paginationHitTarget:44,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},lt={small:80,medium:110,large:140},pt={small:80,medium:100,large:110};function ka(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var l=document.createElementNS(t,"line");l.setAttribute("x1","1"),l.setAttribute("y1","1"),l.setAttribute("x2","23"),l.setAttribute("y2","23"),a.appendChild(n),a.appendChild(l);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var i=document.createElement("div");return i.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",i.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(i),r}function Sa(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var a=document.createElement("div");a.className="renuvex-pr-empty-state-stars",a.innerHTML=Se(0,e.iconPair),t.appendChild(a);var n=document.createElement("p");n.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(n),r.appendChild(t);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",l.textContent=e.writeButtonText||"Yorum Yap",l.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(l),r}function Ca(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Ea(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function ge(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),l=parseInt(t[3],16);return"rgba("+a+","+n+","+l+","+r+")"}function Hr(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function ut(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Ta(e){return .2126*ut(e.r)+.7152*ut(e.g)+.0722*ut(e.b)}function Aa(e,r){var t=Ta(e),a=Ta(r),n=Math.max(t,a),l=Math.min(t,a);return(n+.05)/(l+.05)}function Pn(e){var r=Hr(e)||Hr("#ffffff"),t=Hr("#111111"),a=Hr("#ffffff");return Aa(t,r)>=Aa(a,r)?"#111111":"#ffffff"}function Ln(e){return ge(e,e==="#ffffff"?.1:.06)}function Pa(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",l=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",i=r.barTrackColor||"#e5e7eb",s=r.barCountColor||"#111111",p=ge(o,.06),c=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",d=r.btnBorderColor||"#111111",y=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",h=r.filterBtnBorderColor||"#111111",f=r.filterMenuBgColor||"#ffffff",g=r.filterMenuBorderColor||"#e5e7eb",x=r.filterItemTextColor||"#111111",k=r.filterItemHoverBgColor||"#f3f4f6",b=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",E=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",w=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",S=ge(w,.65),P=r.replyBgColor||"#f9fafb",L=r.replyBorderColor||"#747474",C=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",j=r.photoTitleColor||"#111111",X=ge("#111111",.05),Q=r.photoArrowBgColor||"#ffffff",D=r.photoArrowTextColor||"#111111",O=ge("#111111",.12),ie=r.formBgColor||"#ffffff",q=r.formPrimaryTextColor||"#111111",G=r.formSecondaryTextColor||"#3b3b3b",oe=r.inputTextColor||q,he=r.inputBorderColor||"#d1d5db",ae=r.placeholderColor||"#9ca3af",Y=r.formStepBarColor||"#111111",I=r.formBtnBgColor||"#111111",H=r.formBtnTextColor||"#ffffff",_=r.formBtnBorderColor||"#111111",Te=ge(I,.06),ne=ge(I,.18),Ze=ge(H,.85),$e=ge(q,.06),be=Pn(ie),R=Ln(be),W=r.loadMoreBgColor||"#ffffff",ye=r.loadMoreTextColor||"#111111",Ae=r.loadMoreBorderColor||"#111111",ur=r.paginationBgColor||"#ffffff",dr=r.paginationTextColor||"#111111",sr=r.paginationBorderColor||"#e5e7eb",vr=r.paginationActiveBgColor||"#111111",cr=r.paginationActiveTextColor||"#ffffff",le={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":l,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":i,"--renuvex-pr-bar-count":s,"--renuvex-pr-bar-hover-bg":p,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":d,"--renuvex-pr-filter-btn-bg":y,"--renuvex-pr-filter-btn-text":v,"--renuvex-pr-filter-btn-border":h,"--renuvex-pr-filter-menu-bg":f,"--renuvex-pr-filter-menu-border":g,"--renuvex-pr-filter-item-text":x,"--renuvex-pr-filter-item-hover-bg":k,"--renuvex-pr-filter-item-active":b,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":E,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":w,"--renuvex-pr-review-border":T,"--renuvex-pr-state-text":S,"--renuvex-pr-review-star-color":c,"--renuvex-pr-reply-bg-color":P,"--renuvex-pr-reply-border":L,"--renuvex-pr-reply-label":C,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":j,"--renuvex-pr-photo-image-border":X,"--renuvex-pr-photo-arrow-bg":Q,"--renuvex-pr-photo-arrow-text":D,"--renuvex-pr-photo-arrow-border":O,"--renuvex-pr-fwizard-bg":ie,"--renuvex-pr-fwizard-text":q,"--renuvex-pr-fwizard-secondary-text":G,"--renuvex-pr-fwizard-input-bg":ie,"--renuvex-pr-fwizard-input-text":oe,"--renuvex-pr-fwizard-input-border":he,"--renuvex-pr-fwizard-placeholder":ae,"--renuvex-pr-fwizard-close-text":be,"--renuvex-pr-fwizard-close-hover-bg":R,"--renuvex-pr-fwizard-progress-bg":$e,"--renuvex-pr-fwizard-progress-active":Y,"--renuvex-pr-fwizard-btn-bg":I,"--renuvex-pr-fwizard-btn-text":H,"--renuvex-pr-fwizard-btn-border":_,"--renuvex-pr-fwizard-btn-disabled-bg":ne,"--renuvex-pr-fwizard-btn-disabled-text":Ze,"--renuvex-pr-fwizard-nav-hover-bg":Te,"--renuvex-pr-load-more-bg":W,"--renuvex-pr-load-more-text":ye,"--renuvex-pr-load-more-border":Ae,"--renuvex-pr-pagination-bg":ur,"--renuvex-pr-pagination-text":dr,"--renuvex-pr-pagination-border":sr,"--renuvex-pr-pagination-active-bg":vr,"--renuvex-pr-pagination-active-text":cr};Object.keys(le).forEach(function(Qe){e.style.setProperty(Qe,le[Qe])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function La(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,l=e.wireLightboxTrigger,o=(e.photoStripReviews||[]).filter(function(k){return Ce(k).length>0});if(!(r.showPhotoGallery!==!1&&!a&&o.length>0))return null;var i=document.createElement("div");if(i.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var s=B(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),p=document.createElement("div");p.className="renuvex-pr-photo-title",p.textContent=s,i.appendChild(p)}var c=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",c);var m=document.createElement("div");m.className="renuvex-pr-photo-strip";var u=Z,d=r.reviewLayout==="card"?Z:Math.round(Z*4/3),y=0;o.forEach(function(k){if(!(y>=15)){var b=wr(k);if(b){var z=document.createElement("img"),E=pe(b,Z);z.src=E.src,z.srcset=E.srcset,z.loading=y<3?"eager":"lazy",z.decoding="async",z.width=u,z.height=d,z.className="renuvex-pr-photo-strip-thumb",z.alt="Yorum foto\u011Fraf\u0131",ue(z),(function(A,w){l(z,function(){n(w,A,o)})})(b,k),m.appendChild(z),y++}}});var v=document.createElement("button");v.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var h=re(je);h&&v.appendChild(h),v.setAttribute("aria-label","\xD6nceki"),v.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var f=document.createElement("button");f.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var g=re(yr);g&&f.appendChild(g),f.setAttribute("aria-label","Sonraki"),f.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var x=document.createElement("div");return x.className="renuvex-pr-photo-strip-wrap",x.appendChild(v),x.appendChild(m),x.appendChild(f),i.appendChild(x),i}var Nn=1,Mn=7,dt="\u2026";function Rn(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=Mn){for(var n=[],l=1;l<=t;l++)n.push(l);return n}for(var o=[],i=1;i<=t;i++)(i===1||i===t||Math.abs(i-a)<=Nn)&&o.push(i);for(var s=[],p=0;p<o.length;p++)p>0&&o[p]-o[p-1]>1&&s.push(dt),s.push(o[p]);return s}function Na(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},n=document.createElement("nav");n.className="renuvex-pr-pagination",n.setAttribute("aria-label","Yorum sayfalar\u0131");function l(s){n.setAttribute("aria-busy","true");for(var p=n.querySelectorAll("button"),c=0;c<p.length;c++)p[c].disabled=!0;a(s)}function o(s,p){var c=document.createElement("span");c.className="renuvex-pr-pagination-label",c.setAttribute("aria-hidden","true"),c.textContent=p,s.appendChild(c)}function i(s,p,c,m){var u=document.createElement("button");return u.type="button",u.className="renuvex-pr-pagination-arrow",u.setAttribute("aria-label",s),o(u,p),m?u.disabled=!0:u.onclick=function(){l(c)},u}return n.appendChild(i("\xD6nceki sayfa","\u2039",t-1,t<=1)),Rn(t,r).forEach(function(s){if(s===dt){var p=document.createElement("span");p.className="renuvex-pr-pagination-gap",p.setAttribute("aria-hidden","true"),p.textContent=dt,n.appendChild(p);return}var c=document.createElement("button");c.type="button",c.className="renuvex-pr-pagination-btn",c.setAttribute("aria-label","Sayfa "+s),o(c,String(s)),s===t?c.setAttribute("aria-current","page"):c.onclick=function(){l(s)},n.appendChild(c)}),n.appendChild(i("Sonraki sayfa","\u203A",t+1,t>=r)),n}function Ma(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Ra(e){var r=e.render;async function t(){var o=Fe(),i=F,s=V,p=K,c=J;ze(null);var m=await Ie(F,V,1,K,J);He(o,{productId:i,orderBy:s,ratingFilter:p,hasImages:c})&&await r(F,M,m,Pe,V,1,vt)}async function a(o){var i=Fe(),s=K===o?null:o,p=F,c=V,m=J;mt(s),Le(1),ze(null);var u=await Ie(F,V,1,s,J);He(i,{productId:p,orderBy:c,page:1,ratingFilter:s,hasImages:m})&&await r(F,M,u,Pe,V,1)}async function n(o,i){var s=Fe(),p=F,c=K;Le(1),ze(null);var m=o,u=!1;i&&(u=!0,m="newest"),xt(u),xr(m);var d=await Ie(F,m,1,K,u);He(s,{productId:p,orderBy:m,page:1,ratingFilter:c,hasImages:u})&&await r(F,M,d,Pe,m,1)}async function l(o){var i=Fe(),s=F,p=V,c=K,m=J;Le(o),ze(null);var u=await Ie(F,V,o,K,J);if(He(i,{productId:s,orderBy:p,page:o,ratingFilter:c,hasImages:m})){await r(F,M,u,Pe,V,o);var d=document.getElementById("renuvex-reviews"),y=d&&d.shadowRoot,v=y&&y.querySelector&&y.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(v){try{v.focus({preventScroll:!0})}catch(g){try{v.focus()}catch(x){}}Ma(y,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var h=document.getElementById("renuvex-reviews");if(h&&typeof h.scrollIntoView=="function"){var f=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;h.scrollIntoView({behavior:f?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:n,onPageChange:l}}function In(){return Bt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Bn(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=Rt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),It(t,{surface:"reviews",productId:r||""}),t}async function st(e,r,t,a,n,l,o){if(St){hr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:l,badgeSettings:o});return}gr(!0),ft(e),gt(r),o!==void 0&&ht(o),bt(a),n&&xr(n),l&&Le(l),t!=null&&(yt(t),ze(t&&t.data?t.data.nextCursor:null));var i=Ra({render:st});try{let be=function(R,W){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var ye=R.meta.sizeOverrides[W];ye&&Object.keys(ye).forEach(function(Ae){d.style.setProperty(Ae,ye[Ae])})}};var Ze=be,s=Br(r.summaryLayout),p=!(s.meta&&s.meta.supports&&s.meta.supports.title===!1),c=r.showTitle!==!1,m=B(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),u=p&&c?m:"",d=document.documentElement;Pa(d,r);var y=r.borderRadius!==void 0?r.borderRadius:8,v=ot[r.size]||ot.medium,h=lt[r.thumbnailSize]||lt.medium,f=h;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(f=pt[r.thumbnailSize]||pt.medium),d.style.setProperty("--renuvex-pr-title-size",v.titleSize+"px"),d.style.setProperty("--renuvex-pr-review-text-size",v.reviewTextSize+"px"),d.style.setProperty("--renuvex-pr-review-title-size",v.reviewTitleSize+"px"),d.style.setProperty("--renuvex-pr-author-size",v.authorSize+"px"),d.style.setProperty("--renuvex-pr-reply-name-size",v.replyNameSize+"px"),d.style.setProperty("--renuvex-pr-reply-text-size",v.replyTextSize+"px"),d.style.setProperty("--renuvex-pr-radius",y+"px"),d.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,y-4)+"px"),d.style.setProperty("--renuvex-pr-photo-title-size",v.photoTitleSize+"px"),d.style.setProperty("--renuvex-pr-avg-rating-size",v.avgRatingSize+"px"),d.style.setProperty("--renuvex-pr-review-count-size",v.reviewCountSize+"px"),d.style.setProperty("--renuvex-pr-compact-count-size",v.compactCountSize+"px"),d.style.setProperty("--renuvex-pr-recommend-size",v.recommendSize+"px"),d.style.setProperty("--renuvex-pr-btn-text-size",v.btnTextSize+"px"),d.style.setProperty("--renuvex-pr-bar-label-size",v.barLabelSize+"px"),d.style.setProperty("--renuvex-pr-minimal-avg-size",v.minimalAvgSize+"px"),d.style.setProperty("--renuvex-pr-hero-avg-size",v.heroAvgSize+"px"),d.style.setProperty("--renuvex-pr-minimal-count-size",v.minimalCountSize+"px"),d.style.setProperty("--renuvex-pr-hero-count-size",v.heroCountSize+"px"),d.style.setProperty("--renuvex-pr-bar-count-size",v.barCountSize+"px"),d.style.setProperty("--renuvex-pr-review-date-size",v.reviewDateSize+"px"),d.style.setProperty("--renuvex-pr-filter-text-size",v.filterTextSize+"px"),d.style.setProperty("--renuvex-pr-load-more-size",v.loadMoreSize+"px"),d.style.setProperty("--renuvex-pr-load-more-min-height",v.loadMoreMinHeight+"px"),d.style.setProperty("--renuvex-pr-load-more-pad-y",v.loadMorePadY+"px"),d.style.setProperty("--renuvex-pr-load-more-pad-x",v.loadMorePadX+"px"),d.style.setProperty("--renuvex-pr-load-more-mobile-min-height",v.loadMoreMobileMinHeight+"px"),d.style.setProperty("--renuvex-pr-load-more-hit-target",v.loadMoreHitTarget+"px"),d.style.setProperty("--renuvex-pr-pagination-button-size",v.paginationButtonSize+"px"),d.style.setProperty("--renuvex-pr-pagination-pad-x",v.paginationPadX+"px"),d.style.setProperty("--renuvex-pr-pagination-gap",v.paginationGap+"px"),d.style.setProperty("--renuvex-pr-pagination-margin-top",v.paginationMarginTop+"px"),d.style.setProperty("--renuvex-pr-pagination-gap-min",v.paginationGapMin+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-button-size",v.paginationMobileButtonSize+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-font-size",v.paginationMobileFontSize+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-gap",v.paginationMobileGap+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",v.paginationMobileMarginTop+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",v.paginationMobileGapMin+"px"),d.style.setProperty("--renuvex-pr-pagination-hit-target",v.paginationHitTarget+"px"),d.style.setProperty("--renuvex-pr-read-more-size",v.readMoreSize+"px"),d.style.setProperty("--renuvex-pr-thumbnail-size",h+"px"),d.style.setProperty("--renuvex-pr-thumbnail-size-mobile",f+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";d.style.setProperty("--renuvex-pr-review-star-color",g),d.style.setProperty("--renuvex-pr-star-size",v.reviewStarSize+"px"),d.style.setProperty("--renuvex-pr-avg-star-size",v.avgStarSize+"px"),be(Br(r.summaryLayout),r.size),be(Fr(r.reviewLayout),r.size);var x=ar(r),k=In();if(!k)return;var b=Bn(k,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==b&&b.appendChild(z);var E=_t(z),A=De+Oe+Cr+ha()+za();We(E,A);var w=Ht(E);if(r.enabled===!1){z.style.minHeight="auto",w.replaceChildren(ka(r.borderRadius!==void 0?r.borderRadius:8)),gr(!1);var T=fr;hr(null),T&&st(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}try{var S=t||{},P=Wr(S),L=P?[]:S.data&&S.data.reviews||[];wt(L),w.replaceChildren();var C=document.createElement("section");if(C.id="renuvex-reviews-widget",C.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),C.className="renuvex-pr-reviews-widget",C.setAttribute("data-renuvex-surface","reviews"),e&&C.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(C.style.width="100%",C.style.maxWidth="100%",C.style.marginLeft="0",C.style.marginRight="0"),u){var N=document.createElement("div"),j=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+j,N.textContent=u,C.appendChild(N)}if(P){C.appendChild(Ea(S.message,i.onRetry)),w.appendChild(C),Ne(E),Or(C,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return E.getElementById("renuvex-reviews-widget")});return}var X=S.data&&S.data.allCount||0,Q=S.data&&S.data.ratingCounts||null,D=Q||[0,0,0,0,0],O=S.data&&S.data.avgRating||"0.0";if(!Q&&L.length>0){L.forEach(function(R){R.rating>=1&&R.rating<=5&&D[R.rating-1]++});var ie=L.reduce(function(R,W){return R+W.rating},0);O=(ie/L.length).toFixed(1)}if(X===0)C.classList.add("renuvex-pr-reviews-empty"),C.appendChild(Sa({iconPair:x,writeButtonText:B(r.writeButtonText,"Yorum Yap"),emptyStateText:B(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:U}));else{var q=Br(r.summaryLayout),G=q.render({widget:C,productId:e,data:S,settings:r,iconPair:x,allCount:X,ratingCounts:D,avgRatingVal:O,currentRatingFilter:K,currentOrderBy:V,currentHasImages:J,onFilterChange:i.onFilterChange,onSortChange:i.onSortChange});C.appendChild(G);var oe=La({settings:r,root:d,currentHasImages:J,photoStripReviews:ct,openReviewModal:se,wireLightboxTrigger:Ee});if(oe&&C.appendChild(oe),L.length===0)C.appendChild(Ca());else{var he=Fr(r.reviewLayout);L.forEach(function(R){C.appendChild(he.render(R,Yr))})}var ae=r.paginationMode==="numbered"?"numbered":"loadMore";if(ae==="numbered"){var Y=S.data&&S.data.totalPages||1;Y>1&&C.appendChild(Na({page:S.data&&S.data.page||tr||1,totalPages:Y,onPageChange:i.onPageChange}))}var I=ae==="loadMore"&&S.data&&S.data.hasMore;if(I){let R=function(W){_.textContent=W,H.setAttribute("aria-label",W)};var $e=R,H=document.createElement("button");H.className="renuvex-pr-load-more";var _=document.createElement("span");_.className="renuvex-pr-load-more-label",_.setAttribute("aria-hidden","true"),H.appendChild(_),R("Daha Fazla G\xF6ster"),H.onclick=async function(){H.disabled=!0,R("Y\xFCkleniyor...");var W=Fe(),ye=F,Ae=V,ur=tr,dr=K,sr=J,vr=mr,cr=ur+1,le=await Ie(ye,Ae,cr,dr,sr,null,vr);if(He(W,{productId:ye,orderBy:Ae,page:ur,ratingFilter:dr,hasImages:sr,nextCursor:vr}))if(le&&!Wr(le)&&le.data&&Array.isArray(le.data.reviews)){var Qe=zt(le.data.reviews);kt(Qe),Le(cr),ze(le.data.nextCursor||null);var Ia=Fr(M.reviewLayout);Qe.forEach(function(Ba){C.insertBefore(Ia.render(Ba,Yr),H)}),le.data.hasMore?(H.disabled=!1,R("Daha Fazla G\xF6ster")):H.remove()}else H.disabled=!1,R("Tekrar Dene")},C.appendChild(H)}}w.appendChild(C),Ne(E),Or(C,"reviews-widget",{productId:e||""},function(){return E.getElementById("renuvex-reviews-widget")})}catch(R){console.error("[renuvex-pr] render error:",R);var Te=document.createElement("p");Te.style.cssText="text-align:center;color:#dc2626;",Te.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",w&&w.replaceChildren(Te)}}finally{if(gr(!1),fr){var ne=fr;hr(null),st(ne.productId,ne.settings,ne.reviewsData,ne.productName,ne.orderBy,ne.page,ne.badgeSettings)}}}export{st as render};
