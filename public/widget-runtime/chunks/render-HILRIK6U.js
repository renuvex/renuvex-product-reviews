/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as He,d as Ye}from"./chunk-N7KC6W47.js";import{b as Ur,c as Be}from"./chunk-I4DUUQZH.js";import{A as kt,B as Ct,C as fr,D as gr,E as hr,a as U,b as tr,c as J,d as Z,e as F,f as R,g as vt,h as Le,j as mr,k as Yr,l as ct,m as xr,n as Pe,o as mt,p as xt,q as ft,r as gt,s as ht,t as bt,u as yt,v as ke,y as wt,z as zt}from"./chunk-H43GKW4S.js";import{A as Nt,B as Se,C as wr,D as $,E as zr,F as kr,G as Dr,H as jr,I as pe,J as Rt,K as ue,L as It,M as Bt,c as Hr,e as Ce,f as ae,g as me,h as ne,i as Ne,j as br,k as ar,l as St,m as De,n as yr,o as Et,p as Re,q as Tt,r as At,t as M,u as Lt,v as xe,w as je,y as Pt,z as fe}from"./chunk-VJLJT3UJ.js";import{c as nr}from"./chunk-WWGCW5YN.js";import{a as ze,b as er,c as rr,i as Mt,j as Ie}from"./chunk-GTR5JH7S.js";var Ue=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function _t(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Ve(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Cr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function Ft(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Ot(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var Ht=`
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
`;var Dt=`
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
`;var jt=`
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
`;var Ut=`
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

  .renuvex-pr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Numaral\u0131 sayfalama (paginationMode === 'numbered'). Ak\u0131\u015Fta, listenin alt\u0131nda,
     ortal\u0131 \u2014 sticky/fixed de\u011Fil. Aktif sayfa: dolu kutu (renkler ters); font a\u011F\u0131rl\u0131\u011F\u0131
     di\u011Fer butonlarla ayn\u0131 \u2014 dolu arka plan tek ba\u015F\u0131na yeterli ayr\u0131m. */
  .renuvex-pr-pagination{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;margin:20px auto 0;}
  .renuvex-pr-pagination-btn,.renuvex-pr-pagination-arrow{min-width:36px;height:36px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;line-height:1;box-sizing:border-box;border:1px solid var(--renuvex-pr-pagination-border,#e5e7eb);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-pagination-bg,#ffffff);color:var(--renuvex-pr-pagination-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);font-family:inherit;cursor:pointer;}
  .renuvex-pr-pagination-btn[aria-current="page"]{background:var(--renuvex-pr-pagination-active-bg,#111111);color:var(--renuvex-pr-pagination-active-text,#ffffff);border-color:var(--renuvex-pr-pagination-active-bg,#111111);cursor:default;}
  .renuvex-pr-pagination-arrow:disabled{opacity:.45;cursor:not-allowed;}
  .renuvex-pr-pagination[aria-busy="true"] button{opacity:.6;cursor:progress;}
  .renuvex-pr-pagination-gap{min-width:24px;text-align:center;color:var(--renuvex-pr-pagination-text,#111111);opacity:.55;user-select:none;}
  @media (hover:hover) and (pointer:fine){
    .renuvex-pr-pagination-btn:not([aria-current="page"]):hover,.renuvex-pr-pagination-arrow:not(:disabled):hover{border-color:var(--renuvex-pr-pagination-text,#111111);}
  }

  .renuvex-pr-state-msg{text-align:center;color:var(--renuvex-pr-state-text,rgba(17,17,17,0.65));font-size:14px;padding:30px 0;}
  .renuvex-pr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .renuvex-pr-state-error-text{max-width:360px;line-height:1.45;}
  .renuvex-pr-state-retry{padding:9px 22px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-state-retry:disabled{opacity:.6;cursor:not-allowed;}
`;var Vt=`
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
`;var Sr=[Ht,Pt,Dt,jt,Ut,Vt,Yt].join(`
`);function Ra(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function Ia(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function Ba(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),i=window.getComputedStyle(document.body).position==="fixed",p=Ia()&&!i;if(a>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),p&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Ma(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var ir=0,We=null;function Er(){return ir+=1,ir>1||(We=Ra(),Ba(We)),We}function Tr(){if(ir!==0&&(ir-=1,!(ir>0))){var e=We;We=null,e&&Ma(e)}}function _a(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Ar(){var e=_a();return!e||e===document.body||e===document.documentElement?null:e}function ie(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Fa(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Vr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Fa)}function Oa(e,r){var t=e,a=Vr(e);!a.length&&r&&(t=r,a=Vr(r));var i=a[0]||t&&t.querySelector('[role="dialog"]')||t;ie(i)}function Lr(e,r,t){if(e.key==="Tab"){var a=Vr(r);if(!a.length){e.preventDefault(),Oa(r);return}var i=a[0],p=a[a.length-1],o=Ft(t);if(!r.contains(o)){e.preventDefault(),ie(i);return}if(a.indexOf(o)===-1){e.preventDefault(),ie(e.shiftKey?p:i);return}e.shiftKey&&o===i?(e.preventDefault(),ie(p)):!e.shiftKey&&o===p&&(e.preventDefault(),ie(i))}}var Wt="renuvexPrOverlay";function Pr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Wt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Ha(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Wt]===e.id)}function Nr(e){if(Ha(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function qe(e){return Se(e)}function qt(e,r,t,a,i,p){Tr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&br(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),p&&ie(i)}function Ya(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var i=document.createElement("div");i.className="renuvex-pr-modal-stars",i.innerHTML=xe(e.rating,R);var p=document.createElement("span");p.className="renuvex-pr-modal-date",p.textContent=fe(e.createdAt),a.appendChild(i),a.appendChild(p),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var n=document.createElement("div");n.className="renuvex-pr-modal-author",n.textContent=e.author||"",t.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var l=document.createElement("div");l.className="renuvex-pr-modal-reply";var g=document.createElement("div");g.className="renuvex-pr-modal-reply-label",g.textContent=M(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",l.appendChild(g),l.appendChild(v),l.style.display=e.merchantReply?"":"none",t.appendChild(l),r.appendChild(t),r}function Gt(e,r,t){var a=t||R,i=e.querySelector(".renuvex-pr-modal-scroll-content"),p=i.querySelector(".renuvex-pr-modal-stars");p.innerHTML=xe(r.rating,a),i.querySelector(".renuvex-pr-modal-date").textContent=fe(r.createdAt);var o=i.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",i.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var n=i.querySelector(".renuvex-pr-modal-body");n.textContent=(r.comment||"").trim(),n.style.display=r.comment&&r.comment.trim()?"":"none";var d=i.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=M(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function qr(e,r,t,a,i,p,o,n,d){var l=qe(e),g=Math.max(0,Math.min(t||0,l.length-1)),v=document.createElement("div");v.className="renuvex-pr-modal-left";var u=document.createElement("img"),s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(u.className="renuvex-pr-modal-main-img"+(s?" "+s:""),u.src=jr(l[g]||""),u.decoding="async",u.width=Dr,u.height=Math.round(Dr*4/3),u.alt="Yorum foto\u011Fraf\u0131",!s){u.classList.add("renuvex-pr-modal-img-loading");var y=function(){u.classList.remove("renuvex-pr-modal-img-loading")};u.complete&&u.naturalWidth>0?y():(u.addEventListener("load",y,{once:!0}),u.addEventListener("error",y,{once:!0}))}Rt(u,function(P){if(P.style.display="none",!v.querySelector(".renuvex-pr-modal-img-error")){var S=document.createElement("div");S.className="renuvex-pr-modal-img-error",S.setAttribute("role","status"),S.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",v.insertBefore(S,P)}}),v.appendChild(u);var c=document.createElement("button");c.className="renuvex-pr-modal-close-mobile";var h=ne(Re);h&&c.appendChild(h),c.setAttribute("aria-label","Kapat"),c.onclick=function(P){P.stopPropagation(),p()},v.appendChild(c);var x=0;if(v.addEventListener("touchstart",function(P){x=P.touches[0].clientX},{passive:!0}),v.addEventListener("touchend",function(P){var S=x-P.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(k)ge(e,r,g+1,a,i,p,!0,"next",n,d);else if(z){var N=a[r+1];ge(N,r+1,0,a,i,p,!1,"next",n,d)}}else if(m)ge(e,r,g-1,a,i,p,!0,"prev",n,d);else if(b){var Y=a[r-1],G=qe(Y);ge(Y,r-1,G.length-1,a,i,p,!1,"prev",n,d)}}},{passive:!0}),l.length>1){var f=document.createElement("div");f.className="renuvex-pr-modal-thumbs",l.forEach(function(P,S){var N=document.createElement("img"),Y=pe(P,kr);N.src=Y.src,N.srcset=Y.srcset,N.loading="lazy",N.decoding="async",N.width=kr,N.height=kr,N.className="renuvex-pr-modal-thumb"+(S===g?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(S+1),ue(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(S+1)+" se\xE7"),S===g&&N.setAttribute("aria-current","true"),(function(G){function ee(){ge(e,r,G,a,i,p,!0,null,n,d)}N.onclick=ee,N.onkeydown=function(D){(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),ee())}})(S),f.appendChild(N)}),v.appendChild(f)}var m=g>0,k=g<l.length-1,b=r>0,z=r<a.length-1,E=m||b,A=k||z;if(E){var w=document.createElement("button");w.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var T=ne(De);T&&w.appendChild(T),w.setAttribute("aria-label","\xD6nceki"),w.onclick=function(P){if(P.stopPropagation(),m)ge(e,r,g-1,a,i,p,!0,"prev",n,d);else if(b){var S=a[r-1],N=qe(S);ge(S,r-1,N.length-1,a,i,p,!1,"prev",n,d)}},v.appendChild(w)}if(A){var C=document.createElement("button");C.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var L=ne(yr);L&&C.appendChild(L),C.setAttribute("aria-label","Sonraki"),C.onclick=function(P){if(P.stopPropagation(),k)ge(e,r,g+1,a,i,p,!0,"next",n,d);else if(z){var S=a[r+1];ge(S,r+1,0,a,i,p,!1,"next",n,d)}},v.appendChild(C)}return v}function Kt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var i=qe(a);i[0]&&(new Image().src=jr(i[0]))}})}function Wr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Da(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),i=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function p(){Wr(t),Wr(a),Wr(i)}p(),t&&ie(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){p(),requestAnimationFrame(p)}):setTimeout(p,0)}function ge(e,r,t,a,i,p,o,n,d,l){if(l&&(l.currentReview=e),o){var g=qr(e,r,t,a,i,p,n,d,l);i.firstChild&&i.replaceChild(g,i.firstChild)}else{var g=qr(e,r,t,a,i,p,n,d,l),v=i.querySelector(".renuvex-pr-modal-right");i.firstChild&&i.replaceChild(g,i.firstChild),v&&Gt(v,e,l&&l.currentSettings),Da(d,i)}Kt(r,a)}function se(e,r,t){var a=qe(e);if(!a.length)return;var i=(t||[]).filter(function(A){return qe(A).length>0}),p=i.findIndex(function(A){return A===e||A.id===e.id});p===-1&&(i.unshift(e),p=0);var o=a.indexOf(r);o<0&&(o=0);var n=document.createElement("div");n.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var l=!1,g=null,v=Ar(),u=Ye(),s=Er(),y=Pr(),c={currentReview:e,currentSettings:R},h=null;function x(A){var w=A&&A.detail&&A.detail.settings;if(!(w&&w===h)){h=w||null,c.currentSettings=w||R;var T=d.querySelector(".renuvex-pr-modal-right");!T||!c.currentReview||Gt(T,c.currentReview,c.currentSettings)}}function f(){l||(l=!0,window.removeEventListener(Ie,x),qt(g&&g.host,m,f,s,v,u))}function m(A){if(A.key==="Escape"){k();return}Lr(A,n,g&&g.root)}function k(){l||(l=!0,window.removeEventListener(Ie,x),qt(g&&g.host,m,f,s,v,u),Nr(y))}document.addEventListener("keydown",m),window.addEventListener("popstate",f),window.addEventListener(Ie,x),n.onclick=function(){k()},d.onclick=function(A){A.stopPropagation()},d.appendChild(qr(e,p,o,i,d,k,null,n,c)),d.appendChild(Ya(e)),Kt(p,i);var b=document.createElement("div");b.className="renuvex-pr-modal-wrap",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),b.appendChild(d);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var E=ne(Re);E&&z.appendChild(E),z.setAttribute("aria-label","Kapat"),z.onclick=function(A){A.stopPropagation(),k()},b.appendChild(z),n.appendChild(b),g=Cr(),Ve(g.root,Ue+He+Sr),g.root.appendChild(n),Ne(g.root),ie(b)}function Ee(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Zr={};ze(Zr,{css:()=>$a,meta:()=>Za,render:()=>Qa});function Ge(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,i=e.currentRatingFilter,p=e.onFilterChange;Ce(a);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var n=5;n>=1;n--){var d=r[n-1]||0,l=t>0?Math.round(d/t*100):0,g=i===n,v=d>0,u=M(R&&R.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(g?" renuvex-pr-bar-active":"")+(i&&!g?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",g?"true":"false"),s.setAttribute("aria-label",n+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" "+u+", "+(g?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",n+" y\u0131ld\u0131z, 0 "+u);for(var y="",c=1;c<=5;c++){var h=c<=n;y+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(h?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ae(h?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+y+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+l+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",v&&(function(x){function f(){p(x)}s.onclick=f,s.onkeydown=function(m){(m.key==="Enter"||m.key===" "||m.key==="Space"||m.key==="Spacebar")&&(m.preventDefault(),f())}})(n),o.appendChild(s)}return o}var Zt="data-renuvex-pr-dismiss-gesture",Me=[],Xt=!1,Rr=!1,or=[],Ke=null;function Jt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Gr(){for(var e=Me.length-1;e>=0;e--){var r=Me[e].element;r&&r.isConnected===!1&&Me.splice(e,1)}return Me}function ja(e){!e||typeof e.setAttribute!="function"||(or.indexOf(e)===-1&&or.push(e),e.setAttribute(Zt,""))}function $t(){for(var e=0;e<or.length;e++){var r=or[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Zt)}or=[],Ke&&typeof clearTimeout=="function"&&clearTimeout(Ke),Ke=null}function Ua(e){if(Rr){Rr=!1,$t(),e.preventDefault(),e.stopPropagation();return}for(var r=Gr(),t=!1,a=r.length-1;a>=0;a--){var i=r[a];Jt(e,i.trigger)||Jt(e,i.element)||i.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Va(e){if(e.key==="Escape")for(var r=Gr(),t=r.length-1;t>=0;t--)r[t].close()}function Qt(){Xt||typeof document=="undefined"||(document.addEventListener("click",Ua,!0),document.addEventListener("keydown",Va),Xt=!0)}function Wa(e){Qt(),Rr=!0,ja(e),Ke&&typeof clearTimeout=="function"&&clearTimeout(Ke),typeof setTimeout=="function"&&(Ke=setTimeout(function(){Rr=!1,$t()},700))}function Kr(e){Wa(e)}function Ir(e){Qt();var r={trigger:e.trigger,element:e.element,close:e.close};return Me.push(r),{unregister:function(){var t=Me.indexOf(r);t!==-1&&Me.splice(t,1)},notifyOpening:function(){for(var t=Gr(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function Q(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,i=e.onWriteClick,p=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var n=document.createElement("button");n.className="renuvex-pr-write-btn",n.textContent=M(R&&R.writeButtonText,"Yorum Yap"),n.onclick=i,o.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-filter-btn",l.setAttribute("aria-label","Filtrele"),l.setAttribute("aria-haspopup","menu"),l.setAttribute("aria-expanded","false");var g=R&&R.filterIcon||"lines";l.innerHTML=me(St(g));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var u=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],s=!1;function y(){return r&&r.parentNode||r||null}function c(m,k){if(!(k===!0||!m)){if(m.type==="touchstart"){Kr(y());return}if(m.type==="pointerdown"){var b=m.pointerType||"";b&&b!=="mouse"&&Kr(y());return}}}function h(m){var k=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),l.classList.remove("renuvex-pr-filter-btn-active"),l.setAttribute("aria-expanded","false");var b=m&&(m.restoreFocus===!0||m.restoreFocus==="auto"&&Ye());if(k&&b)try{l.focus({preventScroll:!0})}catch(z){try{l.focus()}catch(E){}}return k}function x(){f.notifyOpening(),v.classList.add("renuvex-pr-open"),l.classList.add("renuvex-pr-filter-btn-active"),l.setAttribute("aria-expanded","true");var m=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");m&&requestAnimationFrame(function(){try{m.focus({preventScroll:!0})}catch(k){try{m.focus()}catch(b){}}})}u.forEach(function(m){var k=m[2],b=k?a:!a&&(t||"newest")===m[0],z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(b?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=m[1];var E=!1;function A(w,T){w&&(w.preventDefault(),w.stopPropagation()),!E&&(E=!0,s=!0,c(w,T),h({restoreFocus:T}),p(m[0],k),setTimeout(function(){E=!1,s=!1},0))}z.addEventListener("pointerdown",function(w){w.button!==void 0&&w.button!==0||w.pointerType!=="mouse"&&A(w,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(w){A(w,!1)},{passive:!1}),z.addEventListener("keydown",function(w){(w.key==="Enter"||w.key===" ")&&A(w,!0)}),z.onclick=function(w){A(w,!1)},v.appendChild(z)}),l.onclick=function(){v.classList.contains("renuvex-pr-open")?h({restoreFocus:"auto"}):x()},d.addEventListener("keydown",function(m){m.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(m.stopPropagation(),h({restoreFocus:!0}))}),d.addEventListener("focusout",function(m){if(v.classList.contains("renuvex-pr-open")&&!s){var k=m.relatedTarget;k&&d.contains(k)||h()}});var f=Ir({trigger:d,element:v,close:h});return d.appendChild(l),d.appendChild(v),o.appendChild(d),o}var ea=`
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
  .renuvex-pr-fwizard-nav-btn:hover{
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
`;function ra(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var i=document.createElement("div");i.className="renuvex-pr-fwizard",a.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",i.appendChild(p);var o=document.createElement("button");o.className="renuvex-pr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat");var n=ne(Re);n&&o.appendChild(n),i.appendChild(o);var d=!1,l=null,g=null,v=!1;function u(){ie(a)}function s(b){Lr(b,a,l&&l.root)}function y(){if(!d){if(d=!0,document.removeEventListener("keydown",c),a.removeEventListener("click",h),o.removeEventListener("click",y),v)ie(g);else{var b=l&&l.root?l.root.activeElement:null;if(b&&typeof b.blur=="function")try{b.blur()}catch(z){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){l?(br(l.root),l.host&&l.host.parentNode&&l.host.parentNode.removeChild(l.host)):a.parentNode&&a.parentNode.removeChild(a),Tr();try{r()}catch(z){}},200)}}function c(b){if(b.key==="Escape"){y();return}s(b)}function h(b){b.target===a&&t&&y()}document.addEventListener("keydown",c),a.addEventListener("click",h),o.addEventListener("click",y);function x(b){g=Ar(),v=Ye(),b&&p.appendChild(b),l=Cr(),Ve(l.root,Ue+He+ea),l.root.appendChild(a),Ne(l.root),Er(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),u()})}var f=null,m=null;function k(b,z){if(z=z||"error",f){try{f.remove()}catch(E){}f=null}m&&(clearTimeout(m),m=null),f=document.createElement("div"),f.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,f.textContent=b,i.appendChild(f),m=setTimeout(function(){f&&(f.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(f){try{f.remove()}catch(E){}f=null}},300))},4e3)}return{open:x,close:y,content:p,setAllowOutsideClose:function(b){t=!!b},setStepAttr:function(b){i.setAttribute("data-step",String(b))},showToast:k}}var Xr=4;function Xe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function ta(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(i){try{i(t)}catch(p){}})}return{get:function(){return t},set:function(i){Object.assign(t,i),a()},goNext:function(){t.currentStep<Xr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(i){return r.push(i),function(){r=r.filter(function(p){return p!==i})}}}}function aa(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},i=e.onSkip||function(){},p=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var n=document.createElement("button");n.type="button",n.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",n.setAttribute("aria-label","Geri"),n.innerHTML=me(De)+"<span>Geri</span>",n.addEventListener("click",function(){a()}),o.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var l=[],g=0;g<Xr;g++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",d.appendChild(v),l.push(v)}o.appendChild(d);var u=document.createElement("button");u.type="button";var s=null;function y(h){s&&u.removeEventListener("click",s),s=h,h&&u.addEventListener("click",h)}o.appendChild(u);function c(h,x){var f=r.indexOf(h)!==-1,m=t.indexOf(h)!==-1,k=x&&(x.images&&x.images.length>0||x.pendingImages&&x.pendingImages.length>0);if(f)h===2&&k?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",y(function(){p()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",y(function(){i()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(m){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var b=Xe(h,x);u.disabled=!b,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!b),y(function(){u.disabled||p()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,y(null)}return{el:o,update:function(h,x){l.forEach(function(m,k){k+1<=h?m.classList.add("renuvex-pr-fwizard-progress-seg-active"):m.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var f=h<=1;n.style.visibility=f?"hidden":"",n.style.pointerEvents=f?"none":"",n.tabIndex=f?-1:0,c(h,x)},setNextDisabled:function(h){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!h,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!h))},setThanksState:function(h){n.style.visibility="hidden",d.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),y(h)}}}var qa={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function he(e){return M(R&&R[e],qa[e])}function na(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,i=null,p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title",p.textContent=he("formStepRatingTitle"),t.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var n=ar(R||{});Ce(n);var d=[];function l(h){d.forEach(function(x,f){var m=f<h;x.classList.toggle("renuvex-pr-fwizard-star-active",m),x.setAttribute("aria-checked",f+1===h?"true":"false"),x.innerHTML=m?ae("full"):ae("outline")})}function g(h){e.set({rating:h}),l(h)}function v(h){var x=d[h-1];if(x)try{x.focus()}catch(f){}}function u(h,x){x&&typeof x.preventDefault=="function"&&x.preventDefault(),x&&typeof x.stopPropagation=="function"&&x.stopPropagation(),!a&&(a=!0,g(h),i&&clearTimeout(i),i=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(h){var x=document.createElement("button");x.type="button",x.className="renuvex-pr-fwizard-star",x.setAttribute("role","radio"),x.setAttribute("aria-label",h+" y\u0131ld\u0131z"),x.innerHTML=ae("outline"),x.addEventListener("mouseenter",function(){l(h)}),x.addEventListener("mouseleave",function(){l(e.get().rating)}),x.addEventListener("pointerdown",function(f){f.button&&f.button!==0||u(h,f)}),typeof window!="undefined"&&!window.PointerEvent&&x.addEventListener("touchstart",function(f){u(h,f)},{passive:!1}),x.addEventListener("mousedown",function(f){window.PointerEvent||u(h,f)}),x.addEventListener("keydown",function(f){if(f.key==="Enter"||f.key===" "){u(h,f);return}var m=0;f.key==="ArrowRight"||f.key==="ArrowUp"?m=Math.min(5,h+1):f.key==="ArrowLeft"||f.key==="ArrowDown"?m=Math.max(1,h-1):f.key==="Home"?m=1:f.key==="End"&&(m=5),m&&(f.preventDefault(),g(m),v(m))}),x.addEventListener("click",function(f){u(h,f)}),d.push(x),o.appendChild(x)})(s);l(e.get().rating);var y=null,c=function(h){var x=h&&h.detail&&h.detail.settings;x&&x===y||(y=x||null,n=ar(x||R||{}),l(e.get().rating))};return window.addEventListener(Ie,c),t.appendChild(o),{el:t,destroy:function(){i&&clearTimeout(i),window.removeEventListener(Ie,c)}}}var ia=3,Ga=10*1024*1024;function oa(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=he("formStepPhotosTitle"),a.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=he("formStepPhotosSubtitle"),a.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-photo-card";var n=document.createElement("button");n.type="button",n.className="renuvex-pr-fwizard-photo-add",n.setAttribute("aria-label","Foto\u011Fraf ekle");var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",o.appendChild(n),o.appendChild(d);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-previews",l.setAttribute("aria-live","polite"),o.appendChild(l),a.appendChild(o);var g=r.revokeBlobUrl||function(f){f&&typeof f=="string"&&f.startsWith("blob:")&&URL.revokeObjectURL(f)},v=r.blobMap||{},u=r.urlToFinger||{};function s(){if(!t){var f=e.get().images||[],m=e.get().pendingImages||[],k=f.map(function(b){return{url:b,isPending:!1}}).concat(m.map(function(b){return{url:b.url,file:b.file,isPending:!0,error:b.error}}));l.innerHTML="",k.forEach(function(b){var z=v[b.url]||b.url,E=y(b,z);l.appendChild(E)}),h()}}function y(f,m){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var b=document.createElement("img");b.src=m,b.alt="",b.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(b);var z=document.createElement("div");z.className="renuvex-pr-fwizard-photo-loading",z.style.display="none",k.appendChild(z);var E=document.createElement("button");E.type="button",E.className="renuvex-pr-fwizard-photo-remove",E.setAttribute("aria-label","Kald\u0131r");var A=ne(Re);return A&&E.appendChild(A),k.appendChild(E),c(k,f,m),k}function c(f,m,k){var b=f.querySelector("img");b.src!==k&&(b.src=k);var z=f.querySelector(".renuvex-pr-fwizard-photo-loading");if(m.isPending&&m.error){z.style.display="flex",z.textContent="";var E=document.createElement("span");E.className="renuvex-pr-upload-error",E.textContent="\u2717 "+m.error,z.appendChild(E)}else z.style.display="none",z.textContent="";var A=f.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var w=u[m.url]||(m.file?m.file.name+"_"+m.file.size:null),T=v[m.url],C={};w&&(C.fingerprints=(e.get().fingerprints||[]).filter(function(L){return L!==w})),m.isPending?C.pendingImages=(e.get().pendingImages||[]).filter(function(L){return L.url!==m.url}):C.images=(e.get().images||[]).filter(function(L){return L!==m.url}),e.set(C),g(m.url),g(T),delete u[m.url],T&&delete u[T],v[m.url]&&delete v[m.url]}}function h(){var f=(e.get().images||[]).length,m=(e.get().pendingImages||[]).length,k=f+m,b=k>=ia;k>0?(o.classList.add("renuvex-pr-fwizard-photo-card--compact"),n.innerHTML=me(At)):(o.classList.remove("renuvex-pr-fwizard-photo-card--compact"),n.innerHTML=me(Tt)+"<span>Foto\u011Fraf Ekle</span>"),b?(n.style.display="none",n.disabled=!0,d.disabled=!0):(n.style.display="flex",n.disabled=!1,d.disabled=!1,n.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}n.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(f){var m=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(f.target.files).slice(0,ia-m);d.value="";var b=(e.get().pendingImages||[]).length,z=e.get().images||[],E=z.length;if(k.length!==0){for(var A=[],w=[],T=0;T<k.length;T++){var C=k[T],L=C.name+"_"+C.size,P=(e.get().fingerprints||[]).some(function(O){return O===L})||A.some(function(O){return O.file.name+"_"+O.file.size===L});if(!P){if(C.size>Ga){var S="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(S,"error"):alert(S);continue}var N=URL.createObjectURL(C);u[N]=L,A.push({url:N,file:C,error:null}),w.push({url:N,file:C});var Y=(e.get().fingerprints||[]).slice();Y.push(L),e.set({fingerprints:Y})}}if(A.length!==0){var G=(e.get().pendingImages||[]).concat(A),ee=async function(){for(var O=0;O<w.length;O++){var oe=w[O],W=oe.file,q=oe.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var K=(e.get().pendingImages||[]).filter(function(B){return B.url!==q}),ve=(e.get().images||[]).slice();ve.push(q),e.set({pendingImages:K,images:ve});continue}try{var re=await nr(rr+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er})});if(!re.ok)throw re.status===429?new Error("rate_limit"):new Error("sign failed");var j=await re.json();if(!j.folder)throw new Error("sign folder missing");var I=new FormData;I.append("file",W),I.append("api_key",j.api_key),I.append("timestamp",j.timestamp),I.append("signature",j.signature),I.append("folder",j.folder);var le=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:I}),_=await le.json();if(_.secure_url&&Nt(_.secure_url)){var H=(e.get().pendingImages||[]).some(function(B){return B.url===q});if(!H)continue;v[_.secure_url]=q,u[_.secure_url]=u[q];var Te=(e.get().pendingImages||[]).filter(function(B){return B.url!==q}),te=(e.get().images||[]).slice();te.push(_.secure_url),e.set({pendingImages:Te,images:te});try{nr(rr+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er,secureUrl:_.secure_url,metadata:{assetId:_.asset_id,publicId:_.public_id,version:_.version,resourceType:_.resource_type,format:_.format,width:_.width,height:_.height,bytes:_.bytes,signature:_.signature}})}).catch(function(){})}catch(B){}}else throw new Error("invalid image url")}catch(B){console.error("[renuvex-pr] Image upload failed:",B);var $e=B.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast($e,"error");var ye=(e.get().pendingImages||[]).map(function(X){return X.url===q?{url:X.url,file:X.file,error:$e}:X});e.set({pendingImages:ye})}}};if(E===0&&b===0){t=!0;var D=!r.canNavigate||r.canNavigate();D&&e.goNext()}e.set({pendingImages:G}),ee()}}};var x=e.onChange(s);return s(),{el:a,destroy:function(){t=!0,d.onchange=null,x&&x()}}}var Jr=2e3,Ka=60;function la(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=he("formStepContentTitle"),a.appendChild(i);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=Ka,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),p.appendChild(o);var n=document.createElement("textarea");n.className="renuvex-pr-fwizard-textarea",n.placeholder="Deneyiminizi anlat\u0131n\u2026",n.maxLength=Jr,n.rows=6,n.setAttribute("aria-label","Yorum"),n.value=e.get().comment||"",p.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),p.appendChild(d);function l(){var v=n.value.length;d.textContent=v+"/"+Jr,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=Jr)}function g(){return Xe(3,e.get())}return n.addEventListener("input",function(){e.set({comment:n.value}),l(),t(g())}),a.appendChild(p),l(),setTimeout(function(){t(g())},0),{el:a,destroy:function(){}}}var Xa=40;function pa(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},i=document.createElement("div");i.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",p.textContent=he("formStepAuthorTitle"),i.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var n=document.createElement("div");n.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.maxLength=Xa,l.setAttribute("aria-required","true"),l.value=e.get().author||"",n.appendChild(d),n.appendChild(l),o.appendChild(n);var g=document.createElement("div");g.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",g.appendChild(v),g.appendChild(u),o.appendChild(g);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var y=document.createElement("div");y.className="renuvex-pr-fwizard-msg",y.setAttribute("role","alert"),y.setAttribute("aria-live","assertive"),o.appendChild(y);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),i.appendChild(o);function h(){return Xe(4,e.get())}function x(){var b=!h(),z=(e.get().pendingImages||[]).length,E=z>0;E?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(c.disabled=b,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",b),c.textContent="G\xF6nder")}l.addEventListener("input",function(){e.set({author:l.value}),x(),t(h())}),u.addEventListener("input",function(){e.set({email:u.value})}),x(),setTimeout(function(){t(h())},0);function f(){y.textContent=""}function m(b){f();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=b||"",y.appendChild(z)}c.onclick=async function(){if(!c.disabled){var b=e.get(),z=(b.author||"").trim(),E=(b.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!z){m("Gerekli alan");return}if(!b.rating){m("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",f(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var w=Lt(window.location.href),T=b.productName||null,C=await nr(rr+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:er,productId:b.productId||null,slug:w||null,productName:T,author:z,title:(b.title||"").trim()||null,comment:E||null,rating:b.rating,images:b.images||[]})},15e3);if(C.ok)a();else{var L=await C.json().catch(function(){return{}});throw new Error(L.error||"Yorum kaydedilemedi.")}}catch(N){var P=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),S=P?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(S,"error"):m(S),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=A}}};var k=e.onChange(x);return{el:i,destroy:function(){c.onclick=null,k&&k()}}}function Ja(e,r,t){if(t=t||{},e===1)return na(r,{canNavigate:t.canNavigate});if(e===2)return oa(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return la(r,{onValidityChange:t.onValidityChange});if(e===4)return pa(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function ua(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function da(e){e=e||{};var r=ta({productId:e.productId,productName:e.productName}),t={},a={},i={};function p(w){if(!(!w||typeof w!="string"||!w.startsWith("blob:")||i[w])){i[w]=!0;try{URL.revokeObjectURL(w)}catch(T){}}}function o(){Object.keys(a).forEach(function(T){p(T)}),Object.keys(t).forEach(function(T){p(t[T])});var w=r.get();(w.pendingImages||[]).forEach(function(T){p(T&&T.url)}),(w.images||[]).forEach(function(T){p(T)})}var n=ra({onClose:function(){window.removeEventListener("popstate",l),Nr(d),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=Pr(),l=function(w){n&&n.close&&n.close()};window.addEventListener("popstate",l);var g=document.createElement("div");g.className="renuvex-pr-fwizard-step-wrap";var v=aa({skippableSteps:[2],nextableSteps:[3],onBack:function(){y==="idle"&&r.goBack()},onSkip:function(){y==="idle"&&r.goNext()},onNext:function(){y==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="renuvex-pr-fwizard-layout",u.appendChild(g),u.appendChild(v.el);var s=null,y="idle",c=null,h=!0,x=null;function f(w,T){g.innerHTML="";var C=Ja(w,r,{canNavigate:function(){return y==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:p,onValidityChange:function(S){v.setNextDisabled(!S)},onSuccess:k,showToast:n.showToast});if(s=C,v.update(w,r.get()),T){y="entering",C.el.classList.add("renuvex-pr-fwizard-step--enter");var L=null,P=function(){L&&clearTimeout(L),C.el.removeEventListener("animationend",P),C.el.classList.remove("renuvex-pr-fwizard-step--enter"),y="idle",c!==null&&b()};C.el.addEventListener("animationend",P),L=setTimeout(P,700)}else y="idle";g.appendChild(C.el),n.setStepAttr&&n.setStepAttr(w),w===3&&v.setNextDisabled(!0)}var m=!1;function k(){if(!m){if(m=!0,!s){g.innerHTML="";var w=ua();w.classList.add("renuvex-pr-fwizard-step--enter"),g.appendChild(w),n.setStepAttr("thanks"),v.setThanksState(n.close);return}var T=s;y="exiting",T.el.classList.add("renuvex-pr-fwizard-step--exit");var C=function(){if(x&&clearTimeout(x),T.el.removeEventListener("animationend",C),T.destroy)try{T.destroy()}catch(P){}s===T&&(s=null),g.innerHTML="";var L=ua();L.classList.add("renuvex-pr-fwizard-step--enter"),g.appendChild(L),n.setStepAttr("thanks"),v.setThanksState(n.close),y="idle"};T.el.addEventListener("animationend",C),x=setTimeout(C,300)}}function b(){var w=r.get().currentStep;if(y!=="idle"){c=w;return}if(!s){var T=!h;h=!1,f(w,T);return}var C=s;y="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var L=function(){if(x&&clearTimeout(x),C.el.removeEventListener("animationend",L),C.destroy)try{C.destroy()}catch(S){}if(s===C){g.innerHTML="",s=null;var P=c!==null?c:r.get().currentStep;c=null,f(P,!0),y="idle"}};C.el.addEventListener("animationend",L),x=setTimeout(L,350)}b();var z=r.get().currentStep,E=r.onChange(function(w){w.currentStep!==z?(z=w.currentStep,b()):v.update(w.currentStep,w)}),A=n.close;return n.close=function(){E&&E(),typeof x!="undefined"&&x&&clearTimeout(x),A()},n.open(u),{close:n.close}}function V(){da({productId:F||"",productName:Le||""})}var sa=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Za={id:"classic",name:"Klasik (A\xE7\u0131k)"},$a=sa;function Qa(e){var r=e.widget,t=e.data,a=e.settings,i=e.iconPair,p=e.allCount,o=e.ratingCounts,n=e.avgRatingVal,d=e.currentRatingFilter,l=e.currentOrderBy,g=e.currentHasImages,v=e.onFilterChange,u=e.onSortChange;Ce(i);var s=document.createElement("div");s.className="renuvex-pr-summary";var y=(o[3]||0)+(o[4]||0),c=p>0?Math.round(y/p*100):0,h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-avg",h.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ae("full")+'</span><span class="renuvex-pr-avg-num">'+n+"</span>",s.appendChild(h);var x=document.createElement("div");if(x.className="renuvex-pr-summary-block renuvex-pr-summary-count",x.textContent=p.toLocaleString("tr-TR")+" "+M(a.countLabel,"Yorum"),s.appendChild(x),a.showRecommendation!==!1&&c>0){var f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",f.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",s.appendChild(f)}return s.appendChild(Ge({ratingCounts:o,allCount:p,iconPair:i,currentRatingFilter:d,onFilterChange:v})),s.appendChild(Q({widget:r,currentOrderBy:l,currentHasImages:g,onWriteClick:V,onSortChange:u})),s}var $r={};ze($r,{css:()=>rn,meta:()=>en,render:()=>on});var va=`
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
`;var en={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},rn=va,tn="__unknown_product__",lr=Object.create(null);function an(e){return e?String(e):tn}var _e=null,pr=null;function nn(){!_e||!pr||(_e.removeEventListener?_e.removeEventListener("change",pr):_e.removeListener&&_e.removeListener(pr),_e=null,pr=null)}function on(e){var r=e.widget,t=e.productId,a=e.settings,i=e.iconPair,p=e.allCount,o=e.ratingCounts,n=e.avgRatingVal,d=e.currentRatingFilter,l=e.currentOrderBy,g=e.currentHasImages,v=e.onFilterChange,u=e.onSortChange,s=an(t),y=document.createElement("div");y.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var h=document.createElement("div");h.className="renuvex-pr-compact-trigger-wrap";var x=document.createElement("button");x.className="renuvex-pr-compact-trigger",x.type="button",x.setAttribute("aria-expanded","false"),x.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+je(n,i)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+me(Et)+"</span>";var f=x.querySelector(".renuvex-pr-compact-trigger-text"),m=x.querySelector(".renuvex-pr-compact-chevron");if(f&&(f.textContent=p.toLocaleString("tr-TR")+" "+M(a.countLabel,"Yorum")),f&&m){var k=document.createElement("span");k.className="renuvex-pr-compact-trigger-count",x.insertBefore(k,f),k.appendChild(f),k.appendChild(m)}h.appendChild(x),c.appendChild(h);var b=Q({widget:r,currentOrderBy:l,currentHasImages:g,onWriteClick:V,onSortChange:u}),z=b.querySelector(".renuvex-pr-filter-wrap"),E=b.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-compact-actions-slot",E&&A.appendChild(E),z&&A.appendChild(z),c.appendChild(A),y.appendChild(c);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),w.setAttribute("aria-hidden","true");var T=document.createElement("div");T.className="renuvex-pr-compact-panel-inner";var C=document.createElement("div");C.className="renuvex-pr-compact-avg",C.innerHTML='<span class="renuvex-pr-icon">'+ae("full")+"</span><span>"+n+"</span>",T.appendChild(C),T.appendChild(Ge({ratingCounts:o,allCount:p,iconPair:i,currentRatingFilter:d,onFilterChange:function(I){P()&&w.classList.contains("renuvex-pr-open")&&(lr[s]=!0),v(I)}})),w.appendChild(T);var L=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function P(){return!!(L&&L.matches)}function S(I){I?w.classList.add("renuvex-pr-open"):w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden",I?"false":"true"),x.setAttribute("aria-expanded",I?"true":"false")}function N(I){var le=I?y:h;if(w.parentNode!==le){var _=!!w.parentNode;w.classList.contains("renuvex-pr-open")&&S(!1),_&&(lr[s]=!1),le.appendChild(w)}}N(L?L.matches:!1);var Y=Q({widget:r,currentOrderBy:l,currentHasImages:g,onWriteClick:V,onSortChange:u}),G=Y.querySelector(".renuvex-pr-filter-wrap"),ee=Y.querySelector(".renuvex-pr-write-btn"),D=document.createElement("div");D.className="renuvex-pr-compact-write-row",ee&&D.appendChild(ee),G&&D.appendChild(G),y.appendChild(D);function O(){var I=w.classList.contains("renuvex-pr-open");return S(!1),P()&&(lr[s]=!1),I}function oe(){W&&W.notifyOpening(),S(!0),P()&&(lr[s]=!0)}x.onclick=function(){w.classList.contains("renuvex-pr-open")?O():oe()};var W=null;function q(I){W&&(W.unregister(),W=null),I||(W=Ir({trigger:h,element:w,close:O}))}if(q(L?L.matches:!1),nn(),L){var K=function(I){N(I.matches),q(I.matches)};L.addEventListener?L.addEventListener("change",K):L.addListener&&L.addListener(K),_e=L,pr=K}if(P()&&lr[s]&&S(!0),a.showRecommendation!==!1){var ve=(o[3]||0)+(o[4]||0),re=p>0?Math.round(ve/p*100):0;if(re>0){var j=document.createElement("div");j.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",j.style.marginTop="8px",j.innerHTML='<span class="renuvex-pr-recommend-pct">%'+re+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",T.appendChild(j)}}return y}var Qr={};ze(Qr,{css:()=>pn,meta:()=>ln,render:()=>un});var ca=`
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
`;var ln={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},pn=ca;function un(e){var r=e.widget,t=e.settings,a=e.iconPair,i=e.allCount,p=e.ratingCounts,o=e.avgRatingVal,n=e.currentRatingFilter,d=e.currentOrderBy,l=e.currentHasImages,g=e.onFilterChange,v=e.onSortChange;Ce(a);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",y.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ae("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(y);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=i.toLocaleString("tr-TR")+" "+M(t.countLabel,"Yorum"),s.appendChild(c),u.appendChild(s);var h=document.createElement("div");h.className="renuvex-pr-split-col renuvex-pr-split-mid",h.appendChild(Ge({ratingCounts:p,allCount:i,iconPair:a,currentRatingFilter:n,onFilterChange:g})),u.appendChild(h);var x=Q({widget:r,currentOrderBy:d,currentHasImages:l,onWriteClick:V,onSortChange:v}),f=x.querySelector(".renuvex-pr-filter-wrap"),m=x.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-split-col renuvex-pr-split-right",m&&k.appendChild(m),f&&k.appendChild(f),u.appendChild(k);var b=(p[3]||0)+(p[4]||0),z=i>0?Math.round(b/i*100):0,E=document.createElement("div");E.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",E.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||z===0;return A&&E.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(E),u}var et={};ze(et,{css:()=>sn,meta:()=>dn,render:()=>vn});var ma=`
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
`;var dn={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},sn=ma;function vn(e){var r=e.widget,t=e.settings,a=e.iconPair,i=e.allCount,p=e.avgRatingVal,o=e.currentOrderBy,n=e.currentHasImages,d=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary renuvex-pr-summary-minimal";var g=document.createElement("div");g.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var u=document.createElement("span");u.className="renuvex-pr-minimal-avg",u.textContent=p,v.appendChild(u);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=je(p,a),v.appendChild(s);var y=document.createElement("span");y.className="renuvex-pr-minimal-count",y.textContent=i.toLocaleString("tr-TR")+" "+M(t.countLabel,"Yorum"),v.appendChild(y),g.appendChild(v),l.appendChild(g);var c=Q({widget:r,currentOrderBy:o,currentHasImages:n,onWriteClick:V,onSortChange:d}),h=c.querySelector(".renuvex-pr-filter-wrap"),x=c.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");f.className="renuvex-pr-minimal-actions",x&&f.appendChild(x),h&&f.appendChild(h),l.appendChild(f);var m=Q({widget:r,currentOrderBy:o,currentHasImages:n,onWriteClick:V,onSortChange:d}),k=m.querySelector(".renuvex-pr-filter-wrap"),b=m.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-minimal-write-row",b&&z.appendChild(b),k&&z.appendChild(k),l.appendChild(z),l}var rt={};ze(rt,{css:()=>mn,meta:()=>cn,render:()=>xn});var xa=`
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
`;var cn={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},mn=xa;function xn(e){var r=e.widget,t=e.settings,a=e.iconPair,i=e.allCount,p=e.avgRatingVal,o=e.currentOrderBy,n=e.currentHasImages,d=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary renuvex-pr-summary-hero";var g=document.createElement("div");g.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var u=document.createElement("span");u.className="renuvex-pr-hero-avg",u.textContent=p,v.appendChild(u);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var y=document.createElement("span");y.className="renuvex-pr-hero-stars",y.innerHTML=je(p,a),s.appendChild(y);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=i.toLocaleString("tr-TR")+" "+M(t.countLabel,"Yorum"),s.appendChild(c),v.appendChild(s),g.appendChild(v),l.appendChild(g);var h=Q({widget:r,currentOrderBy:o,currentHasImages:n,onWriteClick:V,onSortChange:d}),x=h.querySelector(".renuvex-pr-filter-wrap"),f=h.querySelector(".renuvex-pr-write-btn"),m=document.createElement("div");m.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",f&&m.appendChild(f),x&&m.appendChild(x),l.appendChild(m);var k=Q({widget:r,currentOrderBy:o,currentHasImages:n,onWriteClick:V,onSortChange:d}),b=k.querySelector(".renuvex-pr-filter-wrap"),z=k.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");return E.className="renuvex-pr-hero-write-row",z&&E.appendChild(z),b&&E.appendChild(b),l.appendChild(E),l}var fa=`
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
`;var Br={classic:Zr,compact:$r,split:Qr,minimal:et,hero:rt};function Mr(e){return Br[e]||Br.classic}function ga(){var e=Object.keys(Br).map(function(r){return Br[r].css||""}).join(`
`);return fa+`
`+e}var tt={};ze(tt,{css:()=>gn,meta:()=>fn,render:()=>hn});function Je(e,r,t){var a=t||{},i=document.createDocumentFragment(),p=document.createElement("div");p.className=r+" renuvex-pr-body-clamped",p.textContent=e,i.appendChild(p);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",i.appendChild(o),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(o.style.display="inline-block",typeof a.onReadMore=="function")o.onclick=a.onReadMore;else{var n=!1;o.onclick=function(){n=!n,p.classList.toggle("renuvex-pr-body-clamped",!n),o.textContent=n?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:i,body:p,readMore:o}}function Ze(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var i=document.createElement("span");i.className="renuvex-pr-reply-label",i.textContent=M(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(i),t.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",p.textContent=e,t.appendChild(p);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var n=!1;o.onclick=function(){n=!n,p.classList.toggle("renuvex-pr-reply-text-clamped",!n),o.textContent=n?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var ha=`
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
`;var fn={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},gn=ha;function hn(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var i=document.createElement("div");i.className="renuvex-pr-review-top-left";var p=document.createElement("span");p.className="renuvex-pr-review-stars",p.innerHTML=xe(e.rating,R),i.appendChild(p);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=fe(e.createdAt),a.appendChild(i),a.appendChild(o),t.appendChild(a),e.title){var n=document.createElement("div");n.className="renuvex-pr-review-title",n.textContent=e.title,t.appendChild(n)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var l=(e.comment||"").trim();l&&t.appendChild(Je(l,"renuvex-pr-body").fragment);var g=Se(e);if(g.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",g.forEach(function(s){var y=document.createElement("img"),c=pe(s,$);y.src=c.src,y.srcset=c.srcset,y.loading="lazy",y.decoding="async",y.width=$,y.height=$,y.className="renuvex-pr-img",ue(y),y.setAttribute("data-renuvex-img-url",s),(function(h){Ee(y,function(){se(e,h,r)})})(s),v.appendChild(y)}),t.appendChild(v)}var u=Ze(e.merchantReply);return u&&t.appendChild(u),t}var at={};ze(at,{css:()=>yn,meta:()=>bn,render:()=>wn});var ba=`
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
`;var bn={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},yn=ba;function wn(e,r){var t=Se(e),a=t.length>0,i=document.createElement("article");i.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=xe(e.rating,R),p.appendChild(o);var n=document.createElement("span");n.className="renuvex-pr-review-list-author-name",n.textContent=e.author||"",p.appendChild(n);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=fe(e.createdAt),p.appendChild(d),i.appendChild(p);var l=document.createElement("div");if(l.className="renuvex-pr-review-list-content",e.title){var g=document.createElement("div");g.className="renuvex-pr-review-list-title",g.textContent=e.title,l.appendChild(g)}var v=(e.comment||"").trim();v&&l.appendChild(Je(v,"renuvex-pr-review-list-body").fragment);var u=Ze(e.merchantReply);if(u&&l.appendChild(u),i.appendChild(l),a){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(y){var c=document.createElement("img"),h=pe(y,$);c.src=h.src,c.srcset=h.srcset,c.loading="lazy",c.decoding="async",c.width=$,c.height=Math.round($*4/3),c.setAttribute("data-renuvex-img-url",y),ue(c),(function(x){Ee(c,function(){se(e,x,r)})})(y),s.appendChild(c)}),i.appendChild(s)}return i}var nt={};ze(nt,{css:()=>kn,meta:()=>zn,render:()=>Cn});var ya=`
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
`;var zn={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},kn=ya;function Cn(e,r){var t=wr(e),a=!!t,i=document.createElement("article");i.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=xe(e.rating,R),p.appendChild(o),e.title){var n=document.createElement("div");n.className="renuvex-pr-review-gallery-title",n.textContent=e.title,p.appendChild(n)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",p.appendChild(d);var l=document.createElement("time");l.className="renuvex-pr-review-gallery-date",l.style.display="block",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=fe(e.createdAt),p.appendChild(l);var g=(e.comment||"").trim();if(g&&p.appendChild(Je(g,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){se(e,t,r)}}:null).fragment),i.appendChild(p),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var u=document.createElement("img"),s=pe(t,zr);u.src=s.src,u.srcset=s.srcset,u.loading="lazy",u.decoding="async",u.width=zr,u.height=Math.round(zr*4/3),ue(u),u.setAttribute("data-renuvex-img-url",t),Ee(u,function(){se(e,t,r)}),v.appendChild(u),i.appendChild(v)}var y=Ze(e.merchantReply,t?function(){se(e,t,r)}:null);return y&&(y.classList.add("renuvex-pr-review-gallery-reply"),i.appendChild(y)),i}var _r={card:tt,list:at,gallery:nt};function Fr(e){return _r[e]||_r.card}function wa(){return Object.keys(_r).map(function(e){return _r[e].css||""}).join(`
`)}var it=0;function Fe(){return it++,it}function Oe(e,r){return e!==it?!1:r?!(r.productId!==void 0&&F!==r.productId||r.orderBy!==void 0&&U!==r.orderBy||r.page!==void 0&&tr!==r.page||r.ratingFilter!==void 0&&J!==r.ratingFilter||r.hasImages!==void 0&&Z!==r.hasImages||r.nextCursor!==void 0&&mr!==r.nextCursor):!0}var ot={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},lt={small:80,medium:110,large:140},pt={small:80,medium:100,large:110};function za(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var i=document.createElementNS(t,"path");i.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var p=document.createElementNS(t,"line");p.setAttribute("x1","1"),p.setAttribute("y1","1"),p.setAttribute("x2","23"),p.setAttribute("y2","23"),a.appendChild(i),a.appendChild(p);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var n=document.createElement("div");return n.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",n.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(o),r.appendChild(n),r}function ka(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-state-retry",i.textContent="Tekrar Dene",i.onclick=async function(){i.disabled=!0,i.textContent="Tekrar deneniyor...",await r()},t.appendChild(i),t}function be(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),i=parseInt(t[2],16),p=parseInt(t[3],16);return"rgba("+a+","+i+","+p+","+r+")"}function Or(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function ut(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Ca(e){return .2126*ut(e.r)+.7152*ut(e.g)+.0722*ut(e.b)}function Sa(e,r){var t=Ca(e),a=Ca(r),i=Math.max(t,a),p=Math.min(t,a);return(i+.05)/(p+.05)}function Sn(e){var r=Or(e)||Or("#ffffff"),t=Or("#111111"),a=Or("#ffffff");return Sa(t,r)>=Sa(a,r)?"#111111":"#ffffff"}function En(e){return be(e,e==="#ffffff"?.1:.06)}function Ea(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",i=r.headerCountColor||"#111111",p=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",n=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",l=be(o,.06),g=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",y=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",h=r.filterBtnBorderColor||"#111111",x=r.filterMenuBgColor||"#ffffff",f=r.filterMenuBorderColor||"#e5e7eb",m=r.filterItemTextColor||"#111111",k=r.filterItemHoverBgColor||"#f3f4f6",b=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",E=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",w=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",C=be(w,.65),L=r.replyBgColor||"#f9fafb",P=r.replyBorderColor||"#747474",S=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",Y=r.photoTitleColor||"#111111",G=be("#111111",.05),ee=r.photoArrowBgColor||"#ffffff",D=r.photoArrowTextColor||"#111111",O=be("#111111",.12),oe=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",q=r.formSecondaryTextColor||"#3b3b3b",K=r.inputTextColor||W,ve=r.inputBorderColor||"#d1d5db",re=r.placeholderColor||"#9ca3af",j=r.formStepBarColor||"#111111",I=r.formBtnBgColor||"#111111",le=r.formBtnTextColor||"#ffffff",_=r.formBtnBorderColor||"#111111",H=be(I,.06),Te=be(I,.18),te=be(le,.85),$e=be(W,.06),ye=Sn(oe),B=En(ye),X=r.loadMoreBgColor||"#ffffff",we=r.loadMoreTextColor||"#111111",Ae=r.loadMoreBorderColor||"#111111",ur=r.paginationBgColor||"#ffffff",dr=r.paginationTextColor||"#111111",sr=r.paginationBorderColor||"#e5e7eb",vr=r.paginationActiveBgColor||"#111111",ce=r.paginationActiveTextColor||"#ffffff",Qe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":i,"--renuvex-pr-header-recommend":p,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":n,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":l,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":y,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":h,"--renuvex-pr-filter-menu-bg":x,"--renuvex-pr-filter-menu-border":f,"--renuvex-pr-filter-item-text":m,"--renuvex-pr-filter-item-hover-bg":k,"--renuvex-pr-filter-item-active":b,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":E,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":w,"--renuvex-pr-review-border":T,"--renuvex-pr-state-text":C,"--renuvex-pr-review-star-color":g,"--renuvex-pr-reply-bg-color":L,"--renuvex-pr-reply-border":P,"--renuvex-pr-reply-label":S,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":Y,"--renuvex-pr-photo-image-border":G,"--renuvex-pr-photo-arrow-bg":ee,"--renuvex-pr-photo-arrow-text":D,"--renuvex-pr-photo-arrow-border":O,"--renuvex-pr-fwizard-bg":oe,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":q,"--renuvex-pr-fwizard-input-bg":oe,"--renuvex-pr-fwizard-input-text":K,"--renuvex-pr-fwizard-input-border":ve,"--renuvex-pr-fwizard-placeholder":re,"--renuvex-pr-fwizard-close-text":ye,"--renuvex-pr-fwizard-close-hover-bg":B,"--renuvex-pr-fwizard-progress-bg":$e,"--renuvex-pr-fwizard-progress-active":j,"--renuvex-pr-fwizard-btn-bg":I,"--renuvex-pr-fwizard-btn-text":le,"--renuvex-pr-fwizard-btn-border":_,"--renuvex-pr-fwizard-btn-disabled-bg":Te,"--renuvex-pr-fwizard-btn-disabled-text":te,"--renuvex-pr-fwizard-nav-hover-bg":H,"--renuvex-pr-load-more-bg":X,"--renuvex-pr-load-more-text":we,"--renuvex-pr-load-more-border":Ae,"--renuvex-pr-pagination-bg":ur,"--renuvex-pr-pagination-text":dr,"--renuvex-pr-pagination-border":sr,"--renuvex-pr-pagination-active-bg":vr,"--renuvex-pr-pagination-active-text":ce};Object.keys(Qe).forEach(function(cr){e.style.setProperty(cr,Qe[cr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Ta(e){var r=e.settings,t=e.root,a=e.currentHasImages,i=e.openReviewModal,p=e.wireLightboxTrigger,o=(e.photoStripReviews||[]).filter(function(k){return Se(k).length>0});if(!(r.showPhotoGallery!==!1&&!a&&o.length>0))return null;var n=document.createElement("div");if(n.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var d=M(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),l=document.createElement("div");l.className="renuvex-pr-photo-title",l.textContent=d,n.appendChild(l)}var g=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",g);var v=document.createElement("div");v.className="renuvex-pr-photo-strip";var u=$,s=r.reviewLayout==="card"?$:Math.round($*4/3),y=0;o.forEach(function(k){if(!(y>=15)){var b=wr(k);if(b){var z=document.createElement("img"),E=pe(b,$);z.src=E.src,z.srcset=E.srcset,z.loading=y<3?"eager":"lazy",z.decoding="async",z.width=u,z.height=s,z.className="renuvex-pr-photo-strip-thumb",z.alt="Yorum foto\u011Fraf\u0131",ue(z),(function(A,w){p(z,function(){i(w,A,o)})})(b,k),v.appendChild(z),y++}}});var c=document.createElement("button");c.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var h=ne(De);h&&c.appendChild(h),c.setAttribute("aria-label","\xD6nceki"),c.onclick=function(){v.scrollBy({left:-200,behavior:"smooth"})};var x=document.createElement("button");x.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var f=ne(yr);f&&x.appendChild(f),x.setAttribute("aria-label","Sonraki"),x.onclick=function(){v.scrollBy({left:200,behavior:"smooth"})};var m=document.createElement("div");return m.className="renuvex-pr-photo-strip-wrap",m.appendChild(c),m.appendChild(v),m.appendChild(x),n.appendChild(m),n}var Tn=1,An=7,dt="\u2026";function Ln(e,r){var t=Math.max(1,Math.floor(Number(r))||1),a=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=An){for(var i=[],p=1;p<=t;p++)i.push(p);return i}for(var o=[],n=1;n<=t;n++)(n===1||n===t||Math.abs(n-a)<=Tn)&&o.push(n);for(var d=[],l=0;l<o.length;l++)l>0&&o[l]-o[l-1]>1&&d.push(dt),d.push(o[l]);return d}function Aa(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),a=typeof e.onPageChange=="function"?e.onPageChange:function(){},i=document.createElement("nav");i.className="renuvex-pr-pagination",i.setAttribute("aria-label","Yorum sayfalar\u0131");function p(n){i.setAttribute("aria-busy","true");for(var d=i.querySelectorAll("button"),l=0;l<d.length;l++)d[l].disabled=!0;a(n)}function o(n,d,l,g){var v=document.createElement("button");return v.type="button",v.className="renuvex-pr-pagination-arrow",v.setAttribute("aria-label",n),v.textContent=d,g?v.disabled=!0:v.onclick=function(){p(l)},v}return i.appendChild(o("\xD6nceki sayfa","\u2039",t-1,t<=1)),Ln(t,r).forEach(function(n){if(n===dt){var d=document.createElement("span");d.className="renuvex-pr-pagination-gap",d.setAttribute("aria-hidden","true"),d.textContent=dt,i.appendChild(d);return}var l=document.createElement("button");l.type="button",l.className="renuvex-pr-pagination-btn",l.textContent=String(n),l.setAttribute("aria-label","Sayfa "+n),n===t?l.setAttribute("aria-current","page"):l.onclick=function(){p(n)},i.appendChild(l)}),i.appendChild(o("Sonraki sayfa","\u203A",t+1,t>=r)),i}function La(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Pa(e){var r=e.render;async function t(){var o=Fe(),n=F,d=U,l=J,g=Z;ke(null);var v=await Be(F,U,1,J,Z);Oe(o,{productId:n,orderBy:d,ratingFilter:l,hasImages:g})&&await r(F,R,v,Le,U,1,vt)}async function a(o){var n=Fe(),d=J===o?null:o,l=F,g=U,v=Z;mt(d),Pe(1),ke(null);var u=await Be(F,U,1,d,Z);Oe(n,{productId:l,orderBy:g,page:1,ratingFilter:d,hasImages:v})&&await r(F,R,u,Le,U,1)}async function i(o,n){var d=Fe(),l=F,g=J;Pe(1),ke(null);var v=o,u=!1;n&&(u=!0,v="newest"),xt(u),xr(v);var s=await Be(F,v,1,J,u);Oe(d,{productId:l,orderBy:v,page:1,ratingFilter:g,hasImages:u})&&await r(F,R,s,Le,v,1)}async function p(o){var n=Fe(),d=F,l=U,g=J,v=Z;Pe(o),ke(null);var u=await Be(F,U,o,J,Z);if(Oe(n,{productId:d,orderBy:l,page:o,ratingFilter:g,hasImages:v})){await r(F,R,u,Le,U,o);var s=document.getElementById("renuvex-reviews"),y=s&&s.shadowRoot,c=y&&y.querySelector&&y.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(f){try{c.focus()}catch(m){}}La(y,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var h=document.getElementById("renuvex-reviews");if(h&&typeof h.scrollIntoView=="function"){var x=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;h.scrollIntoView({behavior:x?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:a,onSortChange:i,onPageChange:p}}function Pn(){return Mt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Nn(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=It({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),Bt(t,{surface:"reviews",productId:r||""}),t}async function st(e,r,t,a,i,p,o){if(Ct){hr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:i,page:p,badgeSettings:o});return}gr(!0),ft(e),gt(r),o!==void 0&&ht(o),bt(a),i&&xr(i),p&&Pe(p),t!=null&&(yt(t),ke(t&&t.data?t.data.nextCursor:null));var n=Pa({render:st});try{let ye=function(B,X){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var we=B.meta.sizeOverrides[X];we&&Object.keys(we).forEach(function(Ae){s.style.setProperty(Ae,we[Ae])})}};var $e=ye,d=Mr(r.summaryLayout),l=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),g=r.showTitle!==!1,v=M(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),u=l&&g?v:"",s=document.documentElement;Ea(s,r);var y=r.borderRadius!==void 0?r.borderRadius:8,c=ot[r.size]||ot.medium,h=lt[r.thumbnailSize]||lt.medium,x=h;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(x=pt[r.thumbnailSize]||pt.medium),s.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",y+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,y-4)+"px"),s.style.setProperty("--renuvex-pr-photo-title-size",c.photoTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",h+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",x+"px");var f=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",f),s.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),ye(Mr(r.summaryLayout),r.size),ye(Fr(r.reviewLayout),r.size);var m=ar(r),k=Pn();if(!k)return;var b=Nn(k,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==b&&b.appendChild(z);var E=_t(z),A=Ue+He+Sr+ga()+wa();Ve(E,A);var w=Ot(E);if(r.enabled===!1){z.style.minHeight="auto",w.replaceChildren(za(r.borderRadius!==void 0?r.borderRadius:8)),gr(!1);var T=fr;hr(null),T&&st(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}try{var C=t||{},L=Ur(C),P=L?[]:C.data&&C.data.reviews||[];wt(P),w.replaceChildren();var S=document.createElement("section");if(S.id="renuvex-reviews-widget",S.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),S.className="renuvex-pr-reviews-widget",S.setAttribute("data-renuvex-surface","reviews"),e&&S.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(S.style.width="100%",S.style.maxWidth="100%",S.style.marginLeft="0",S.style.marginRight="0"),u){var N=document.createElement("div"),Y=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+Y,N.textContent=u,S.appendChild(N)}if(L){S.appendChild(ka(C.message,n.onRetry)),w.appendChild(S),Ne(E),Hr(S,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return E.getElementById("renuvex-reviews-widget")});return}var G=C.data&&C.data.allCount||0,ee=C.data&&C.data.ratingCounts||null,D=ee||[0,0,0,0,0],O=C.data&&C.data.avgRating||"0.0";if(!ee&&P.length>0){P.forEach(function(B){B.rating>=1&&B.rating<=5&&D[B.rating-1]++});var oe=P.reduce(function(B,X){return B+X.rating},0);O=(oe/P.length).toFixed(1)}if(G>0){var W=Mr(r.summaryLayout),q=W.render({widget:S,productId:e,data:C,settings:r,iconPair:m,allCount:G,ratingCounts:D,avgRatingVal:O,currentRatingFilter:J,currentOrderBy:U,currentHasImages:Z,onFilterChange:n.onFilterChange,onSortChange:n.onSortChange});S.appendChild(q)}else{var K=document.createElement("button");K.className="renuvex-pr-write-btn",K.style.cssText="display:block;margin:16px auto 0;",K.textContent=M(r.writeButtonText,"Yorum Yap"),K.onclick=V,S.appendChild(K)}var ve=Ta({settings:r,root:s,currentHasImages:Z,photoStripReviews:ct,openReviewModal:se,wireLightboxTrigger:Ee});if(ve&&S.appendChild(ve),P.length===0){var re=document.createElement("p");re.className="renuvex-pr-state-msg",re.textContent="Hen\xFCz yorum yok.",S.appendChild(re)}else{var j=Fr(r.reviewLayout);P.forEach(function(B){S.appendChild(j.render(B,Yr))})}var I=r.paginationMode==="numbered"?"numbered":"loadMore";if(I==="numbered"){var le=C.data&&C.data.totalPages||1;le>1&&S.appendChild(Aa({page:C.data&&C.data.page||tr||1,totalPages:le,onPageChange:n.onPageChange}))}var _=I==="loadMore"&&C.data&&C.data.hasMore;if(_){var H=document.createElement("button");H.className="renuvex-pr-load-more",H.textContent="Daha Fazla G\xF6ster",H.onclick=async function(){H.disabled=!0,H.textContent="Y\xFCkleniyor...";var B=Fe(),X=F,we=U,Ae=tr,ur=J,dr=Z,sr=mr,vr=Ae+1,ce=await Be(X,we,vr,ur,dr,null,sr);if(Oe(B,{productId:X,orderBy:we,page:Ae,ratingFilter:ur,hasImages:dr,nextCursor:sr}))if(ce&&!Ur(ce)&&ce.data&&Array.isArray(ce.data.reviews)){var Qe=zt(ce.data.reviews);kt(Qe),Pe(vr),ke(ce.data.nextCursor||null);var cr=Fr(R.reviewLayout);Qe.forEach(function(Na){S.insertBefore(cr.render(Na,Yr),H)}),ce.data.hasMore?(H.disabled=!1,H.textContent="Daha Fazla G\xF6ster"):H.remove()}else H.disabled=!1,H.textContent="Tekrar Dene"},S.appendChild(H)}w.appendChild(S),Ne(E),Hr(S,"reviews-widget",{productId:e||""},function(){return E.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Te=document.createElement("p");Te.style.cssText="text-align:center;color:#dc2626;",Te.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",w&&w.replaceChildren(Te)}}finally{if(gr(!1),fr){var te=fr;hr(null),st(te.productId,te.settings,te.reviewsData,te.productName,te.orderBy,te.page,te.badgeSettings)}}}export{st as render};
