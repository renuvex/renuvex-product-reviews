/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Re,d as Ie}from"./chunk-N7KC6W47.js";import{b as Hr,c as Oe}from"./chunk-I4DUUQZH.js";import{A as bt,B as yt,C as vr,D as cr,E as mr,a as ee,b as ur,c as oe,d as le,e as Y,f as R,g as pt,h as Be,j as sr,k as Mr,l as ut,m as dr,n as _e,o as st,p as dt,q as vt,r as ct,s as mt,t as xt,u as ft,v as Ee,y as gt,z as ht}from"./chunk-H43GKW4S.js";import{A as Tt,B as ke,C as gr,D as X,E as hr,F as br,G as Fr,H as Or,I as ue,J as At,K as se,L as Lt,M as Pt,c as _r,e as ze,f as re,g as me,h as te,i as Te,j as xr,k as er,l as wt,m as Me,n as fr,o as zt,p as Ae,q as kt,r as St,t as B,u as Ct,v as xe,w as Fe,y as Et,z as fe}from"./chunk-7XF2ZMN4.js";import{c as rr}from"./chunk-WWGCW5YN.js";import{a as we,b as $e,c as Qe,i as Nt,j as Le}from"./chunk-GTR5JH7S.js";var He=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function Rt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Ye(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function yr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function It(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Bt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var _t=`
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
`,Mt=`
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
`;var Ft=`
  .renuvex-pr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--renuvex-pr-summary-max);}

  .renuvex-pr-summary-bars{display:flex;flex-direction:column;gap:4px;width:100%;max-width:var(--renuvex-pr-summary-max);}
  .renuvex-pr-bar-row{
    display:flex;align-items:center;justify-content:flex-start;gap:var(--renuvex-pr-col-gap);width:100%;
    cursor:pointer;border-radius:var(--renuvex-pr-radius,6px);padding:3px 6px;
    box-sizing:border-box;position:relative;
  }
  @media(hover:hover) and (pointer:fine){.renuvex-pr-bar-row:hover{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07));}}
  .renuvex-pr-bar-row:focus-visible{outline:2px solid var(--renuvex-pr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .renuvex-pr-bar-active{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07))!important;}
  .renuvex-pr-bar-dimmed{opacity:0.35!important;}
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
`;var Ot=`
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
`;var Ht=`
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

  .renuvex-pr-state-msg{text-align:center;color:var(--renuvex-pr-state-text,rgba(17,17,17,0.65));font-size:14px;padding:30px 0;}
  .renuvex-pr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .renuvex-pr-state-error-text{max-width:360px;line-height:1.45;}
  .renuvex-pr-state-retry{padding:9px 22px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-state-retry:disabled{opacity:.6;cursor:not-allowed;}
`;var Yt=`
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
`;var wr=[_t,Et,Ft,Ot,Ht,Yt,Mt].join(`
`);function Ta(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function Aa(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function La(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",o=Aa()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Pa(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var tr=0,je=null;function zr(){return tr+=1,tr>1||(je=Ta(),La(je)),je}function kr(){if(tr!==0&&(tr-=1,!(tr>0))){var e=je;je=null,e&&Pa(e)}}function Na(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Sr(){var e=Na();return!e||e===document.body||e===document.documentElement?null:e}function ae(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Ra(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Yr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Ra)}function Ia(e,r){var t=e,a=Yr(e);!a.length&&r&&(t=r,a=Yr(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;ae(n)}function Cr(e,r,t){if(e.key==="Tab"){var a=Yr(r);if(!a.length){e.preventDefault(),Ia(r);return}var n=a[0],o=a[a.length-1],l=It(t);if(!r.contains(l)){e.preventDefault(),ae(n);return}if(a.indexOf(l)===-1){e.preventDefault(),ae(e.shiftKey?o:n);return}e.shiftKey&&l===n?(e.preventDefault(),ae(o)):!e.shiftKey&&l===o&&(e.preventDefault(),ae(n))}}var jt="renuvexPrOverlay";function Er(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[jt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Ba(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[jt]===e.id)}function Tr(e){if(Ba(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function De(e){return ke(e)}function Dt(e,r,t,a,n,o){kr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&xr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),o&&ae(n)}function _a(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=xe(e.rating,R);var o=document.createElement("span");o.className="renuvex-pr-modal-date",o.textContent=fe(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var i=document.createElement("div");i.className="renuvex-pr-modal-author",i.textContent=e.author||"",t.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var f=document.createElement("div");f.className="renuvex-pr-modal-reply-label",f.textContent=B(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi");var s=document.createElement("div");return s.className="renuvex-pr-modal-reply-text",s.textContent=e.merchantReply||"",u.appendChild(f),u.appendChild(s),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Ut(e,r,t){var a=t||R,n=e.querySelector(".renuvex-pr-modal-scroll-content"),o=n.querySelector(".renuvex-pr-modal-stars");o.innerHTML=xe(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=fe(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var i=n.querySelector(".renuvex-pr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=B(a&&a.merchantReplyLabel,"Ma\u011Faza Sahibi"),d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Dr(e,r,t,a,n,o,l,i,d){var u=De(e),f=Math.max(0,Math.min(t||0,u.length-1)),s=document.createElement("div");s.className="renuvex-pr-modal-left";var p=document.createElement("img"),v=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";if(p.className="renuvex-pr-modal-main-img"+(v?" "+v:""),p.src=Or(u[f]||""),p.decoding="async",p.width=Fr,p.height=Math.round(Fr*4/3),p.alt="Yorum foto\u011Fraf\u0131",!v){p.classList.add("renuvex-pr-modal-img-loading");var y=function(){p.classList.remove("renuvex-pr-modal-img-loading")};p.complete&&p.naturalWidth>0?y():(p.addEventListener("load",y,{once:!0}),p.addEventListener("error",y,{once:!0}))}At(p,function(P){if(P.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var C=document.createElement("div");C.className="renuvex-pr-modal-img-error",C.setAttribute("role","status"),C.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(C,P)}}),s.appendChild(p);var c=document.createElement("button");c.className="renuvex-pr-modal-close-mobile";var b=te(Ae);b&&c.appendChild(b),c.setAttribute("aria-label","Kapat"),c.onclick=function(P){P.stopPropagation(),o()},s.appendChild(c);var m=0;if(s.addEventListener("touchstart",function(P){m=P.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(P){var C=m-P.changedTouches[0].clientX;if(!(Math.abs(C)<50)){if(C>0){if(k)ge(e,r,f+1,a,n,o,!0,"next",i,d);else if(z){var N=a[r+1];ge(N,r+1,0,a,n,o,!1,"next",i,d)}}else if(x)ge(e,r,f-1,a,n,o,!0,"prev",i,d);else if(h){var j=a[r-1],G=De(j);ge(j,r-1,G.length-1,a,n,o,!1,"prev",i,d)}}},{passive:!0}),u.length>1){var g=document.createElement("div");g.className="renuvex-pr-modal-thumbs",u.forEach(function(P,C){var N=document.createElement("img"),j=ue(P,br);N.src=j.src,N.srcset=j.srcset,N.loading="lazy",N.decoding="async",N.width=br,N.height=br,N.className="renuvex-pr-modal-thumb"+(C===f?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(C+1),se(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(C+1)+" se\xE7"),C===f&&N.setAttribute("aria-current","true"),(function(G){function Z(){ge(e,r,G,a,n,o,!0,null,i,d)}N.onclick=Z,N.onkeydown=function(D){(D.key==="Enter"||D.key===" ")&&(D.preventDefault(),Z())}})(C),g.appendChild(N)}),s.appendChild(g)}var x=f>0,k=f<u.length-1,h=r>0,z=r<a.length-1,E=x||h,A=k||z;if(E){var w=document.createElement("button");w.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var T=te(Me);T&&w.appendChild(T),w.setAttribute("aria-label","\xD6nceki"),w.onclick=function(P){if(P.stopPropagation(),x)ge(e,r,f-1,a,n,o,!0,"prev",i,d);else if(h){var C=a[r-1],N=De(C);ge(C,r-1,N.length-1,a,n,o,!1,"prev",i,d)}},s.appendChild(w)}if(A){var S=document.createElement("button");S.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var L=te(fr);L&&S.appendChild(L),S.setAttribute("aria-label","Sonraki"),S.onclick=function(P){if(P.stopPropagation(),k)ge(e,r,f+1,a,n,o,!0,"next",i,d);else if(z){var C=a[r+1];ge(C,r+1,0,a,n,o,!1,"next",i,d)}},s.appendChild(S)}return s}function Vt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=De(a);n[0]&&(new Image().src=Or(n[0]))}})}function jr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Ma(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function o(){jr(t),jr(a),jr(n)}o(),t&&ae(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ge(e,r,t,a,n,o,l,i,d,u){if(u&&(u.currentReview=e),l){var f=Dr(e,r,t,a,n,o,i,d,u);n.firstChild&&n.replaceChild(f,n.firstChild)}else{var f=Dr(e,r,t,a,n,o,i,d,u),s=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(f,n.firstChild),s&&Ut(s,e,u&&u.currentSettings),Ma(d,n)}Vt(r,a)}function ve(e,r,t){var a=De(e);if(!a.length)return;var n=(t||[]).filter(function(A){return De(A).length>0}),o=n.findIndex(function(A){return A===e||A.id===e.id});o===-1&&(n.unshift(e),o=0);var l=a.indexOf(r);l<0&&(l=0);var i=document.createElement("div");i.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var u=!1,f=null,s=Sr(),p=Ie(),v=zr(),y=Er(),c={currentReview:e,currentSettings:R},b=null;function m(A){var w=A&&A.detail&&A.detail.settings;if(!(w&&w===b)){b=w||null,c.currentSettings=w||R;var T=d.querySelector(".renuvex-pr-modal-right");!T||!c.currentReview||Ut(T,c.currentReview,c.currentSettings)}}function g(){u||(u=!0,window.removeEventListener(Le,m),Dt(f&&f.host,x,g,v,s,p))}function x(A){if(A.key==="Escape"){k();return}Cr(A,i,f&&f.root)}function k(){u||(u=!0,window.removeEventListener(Le,m),Dt(f&&f.host,x,g,v,s,p),Tr(y))}document.addEventListener("keydown",x),window.addEventListener("popstate",g),window.addEventListener(Le,m),i.onclick=function(){k()},d.onclick=function(A){A.stopPropagation()},d.appendChild(Dr(e,o,l,n,d,k,null,i,c)),d.appendChild(_a(e)),Vt(o,n);var h=document.createElement("div");h.className="renuvex-pr-modal-wrap",h.tabIndex=-1,h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),h.appendChild(d);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var E=te(Ae);E&&z.appendChild(E),z.setAttribute("aria-label","Kapat"),z.onclick=function(A){A.stopPropagation(),k()},h.appendChild(z),i.appendChild(h),f=yr(),Ye(f.root,He+Re+wr),f.root.appendChild(i),Te(f.root),ae(h)}function Se(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Gr={};we(Gr,{css:()=>Ga,meta:()=>qa,render:()=>Ka});function Ue(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,o=e.onFilterChange;ze(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var i=5;i>=1;i--){var d=r[i-1]||0,u=t>0?Math.round(d/t*100):0,f=n===i,s=document.createElement("div");s.className="renuvex-pr-bar-row"+(f?" renuvex-pr-bar-active":"")+(n&&!f?" renuvex-pr-bar-dimmed":""),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",f?"true":"false"),s.setAttribute("aria-label",i+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" "+B(R&&R.countLabel,"Yorum")+", "+(f?"filtreyi kald\u0131r":"filtrele"));for(var p="",v=1;v<=5;v++){var y=v<=i;p+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(y?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+re(y?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+p+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(c){function b(){o(c)}s.onclick=b,s.onkeydown=function(m){(m.key==="Enter"||m.key===" "||m.key==="Space"||m.key==="Spacebar")&&(m.preventDefault(),b())}})(i),l.appendChild(s)}return l}var Gt="data-renuvex-pr-dismiss-gesture",Pe=[],Wt=!1,Ar=!1,ar=[],Ve=null;function qt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Ur(){for(var e=Pe.length-1;e>=0;e--){var r=Pe[e].element;r&&r.isConnected===!1&&Pe.splice(e,1)}return Pe}function Fa(e){!e||typeof e.setAttribute!="function"||(ar.indexOf(e)===-1&&ar.push(e),e.setAttribute(Gt,""))}function Kt(){for(var e=0;e<ar.length;e++){var r=ar[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Gt)}ar=[],Ve&&typeof clearTimeout=="function"&&clearTimeout(Ve),Ve=null}function Oa(e){if(Ar){Ar=!1,Kt(),e.preventDefault(),e.stopPropagation();return}for(var r=Ur(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];qt(e,n.trigger)||qt(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Ha(e){if(e.key==="Escape")for(var r=Ur(),t=r.length-1;t>=0;t--)r[t].close()}function Xt(){Wt||typeof document=="undefined"||(document.addEventListener("click",Oa,!0),document.addEventListener("keydown",Ha),Wt=!0)}function Ya(e){Xt(),Ar=!0,Fa(e),Ve&&typeof clearTimeout=="function"&&clearTimeout(Ve),typeof setTimeout=="function"&&(Ve=setTimeout(function(){Ar=!1,Kt()},700))}function Vr(e){Ya(e)}function Lr(e){Xt();var r={trigger:e.trigger,element:e.element,close:e.close};return Pe.push(r),{unregister:function(){var t=Pe.indexOf(r);t!==-1&&Pe.splice(t,1)},notifyOpening:function(){for(var t=Ur(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function J(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,o=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var i=document.createElement("button");i.className="renuvex-pr-write-btn",i.textContent=B(R&&R.writeButtonText,"Yorum Yap"),i.onclick=n,l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var f=R&&R.filterIcon||"lines";u.innerHTML=me(wt(f));var s=document.createElement("div");s.className="renuvex-pr-filter-menu",s.setAttribute("role","menu");var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function y(){return r&&r.parentNode||r||null}function c(x,k){if(!(k===!0||!x)){if(x.type==="touchstart"){Vr(y());return}if(x.type==="pointerdown"){var h=x.pointerType||"";h&&h!=="mouse"&&Vr(y());return}}}function b(x){var k=s.classList.contains("renuvex-pr-open");s.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var h=x&&(x.restoreFocus===!0||x.restoreFocus==="auto"&&Ie());if(k&&h)try{u.focus({preventScroll:!0})}catch(z){try{u.focus()}catch(E){}}return k}function m(){g.notifyOpening(),s.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var x=s.querySelector(".renuvex-pr-filter-item-active")||s.querySelector(".renuvex-pr-filter-item");x&&requestAnimationFrame(function(){try{x.focus({preventScroll:!0})}catch(k){try{x.focus()}catch(h){}}})}p.forEach(function(x){var k=x[2],h=k?a:!a&&(t||"newest")===x[0],z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(h?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=x[1];var E=!1;function A(w,T){w&&(w.preventDefault(),w.stopPropagation()),!E&&(E=!0,v=!0,c(w,T),b({restoreFocus:T}),o(x[0],k),setTimeout(function(){E=!1,v=!1},0))}z.addEventListener("pointerdown",function(w){w.button!==void 0&&w.button!==0||w.pointerType!=="mouse"&&A(w,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(w){A(w,!1)},{passive:!1}),z.addEventListener("keydown",function(w){(w.key==="Enter"||w.key===" ")&&A(w,!0)}),z.onclick=function(w){A(w,!1)},s.appendChild(z)}),u.onclick=function(){s.classList.contains("renuvex-pr-open")?b({restoreFocus:"auto"}):m()},d.addEventListener("keydown",function(x){x.key==="Escape"&&s.classList.contains("renuvex-pr-open")&&(x.stopPropagation(),b({restoreFocus:!0}))}),d.addEventListener("focusout",function(x){if(s.classList.contains("renuvex-pr-open")&&!v){var k=x.relatedTarget;k&&d.contains(k)||b()}});var g=Lr({trigger:d,element:s,close:b});return d.appendChild(u),d.appendChild(s),l.appendChild(d),l}var Jt=`
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
`;function Zt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content",n.appendChild(o);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var i=te(Ae);i&&l.appendChild(i),n.appendChild(l);var d=!1,u=null,f=null,s=!1;function p(){ae(a)}function v(h){Cr(h,a,u&&u.root)}function y(){if(!d){if(d=!0,document.removeEventListener("keydown",c),a.removeEventListener("click",b),l.removeEventListener("click",y),s)ae(f);else{var h=u&&u.root?u.root.activeElement:null;if(h&&typeof h.blur=="function")try{h.blur()}catch(z){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(xr(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):a.parentNode&&a.parentNode.removeChild(a),kr();try{r()}catch(z){}},200)}}function c(h){if(h.key==="Escape"){y();return}v(h)}function b(h){h.target===a&&t&&y()}document.addEventListener("keydown",c),a.addEventListener("click",b),l.addEventListener("click",y);function m(h){f=Sr(),s=Ie(),h&&o.appendChild(h),u=yr(),Ye(u.root,He+Re+Jt),u.root.appendChild(a),Te(u.root),zr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),p()})}var g=null,x=null;function k(h,z){if(z=z||"error",g){try{g.remove()}catch(E){}g=null}x&&(clearTimeout(x),x=null),g=document.createElement("div"),g.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,g.textContent=h,n.appendChild(g),x=setTimeout(function(){g&&(g.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(g){try{g.remove()}catch(E){}g=null}},300))},4e3)}return{open:m,close:y,content:o,setAllowOutsideClose:function(h){t=!!h},setStepAttr:function(h){n.setAttribute("data-step",String(h))},showToast:k}}var Wr=4;function We(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function $t(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(o){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Wr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(o){return o!==n})}}}}function Qt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},o=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",i.setAttribute("aria-label","Geri"),i.innerHTML=me(Me)+"<span>Geri</span>",i.addEventListener("click",function(){a()}),l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var u=[],f=0;f<Wr;f++){var s=document.createElement("span");s.className="renuvex-pr-fwizard-progress-seg",d.appendChild(s),u.push(s)}l.appendChild(d);var p=document.createElement("button");p.type="button";var v=null;function y(b){v&&p.removeEventListener("click",v),v=b,b&&p.addEventListener("click",b)}l.appendChild(p);function c(b,m){var g=r.indexOf(b)!==-1,x=t.indexOf(b)!==-1,k=m&&(m.images&&m.images.length>0||m.pendingImages&&m.pendingImages.length>0);if(g)b===2&&k?(p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",y(function(){o()})):(p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.setAttribute("aria-label","Atla"),p.innerHTML="<span>Atla</span>",y(function(){n()})),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p.style.visibility="",p.tabIndex=0;else if(x){p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Sonraki"),p.innerHTML="Sonraki",p.style.visibility="",p.tabIndex=0;var h=We(b,m);p.disabled=!h,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!h),y(function(){p.disabled||o()})}else p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.innerHTML="",p.style.visibility="hidden",p.tabIndex=-1,p.disabled=!0,y(null)}return{el:l,update:function(b,m){u.forEach(function(x,k){k+1<=b?x.classList.add("renuvex-pr-fwizard-progress-seg-active"):x.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var g=b<=1;i.style.visibility=g?"hidden":"",i.style.pointerEvents=g?"none":"",i.tabIndex=g?-1:0,c(b,m)},setNextDisabled:function(b){p.classList.contains("renuvex-pr-fwizard-cta-btn")&&(p.disabled=!!b,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!b))},setThanksState:function(b){i.style.visibility="hidden",d.style.visibility="hidden",p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",p.style.visibility="",p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),y(b)}}}var ja={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function he(e){return B(R&&R[e],ja[e])}function ea(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title",o.textContent=he("formStepRatingTitle"),t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var i=er(R||{});ze(i);var d=[];function u(b){d.forEach(function(m,g){var x=g<b;m.classList.toggle("renuvex-pr-fwizard-star-active",x),m.setAttribute("aria-checked",g+1===b?"true":"false"),m.innerHTML=x?re("full"):re("outline")})}function f(b){e.set({rating:b}),u(b)}function s(b){var m=d[b-1];if(m)try{m.focus()}catch(g){}}function p(b,m){m&&typeof m.preventDefault=="function"&&m.preventDefault(),m&&typeof m.stopPropagation=="function"&&m.stopPropagation(),!a&&(a=!0,f(b),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var v=1;v<=5;v++)(function(b){var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-star",m.setAttribute("role","radio"),m.setAttribute("aria-label",b+" y\u0131ld\u0131z"),m.innerHTML=re("outline"),m.addEventListener("mouseenter",function(){u(b)}),m.addEventListener("mouseleave",function(){u(e.get().rating)}),m.addEventListener("pointerdown",function(g){g.button&&g.button!==0||p(b,g)}),typeof window!="undefined"&&!window.PointerEvent&&m.addEventListener("touchstart",function(g){p(b,g)},{passive:!1}),m.addEventListener("mousedown",function(g){window.PointerEvent||p(b,g)}),m.addEventListener("keydown",function(g){if(g.key==="Enter"||g.key===" "){p(b,g);return}var x=0;g.key==="ArrowRight"||g.key==="ArrowUp"?x=Math.min(5,b+1):g.key==="ArrowLeft"||g.key==="ArrowDown"?x=Math.max(1,b-1):g.key==="Home"?x=1:g.key==="End"&&(x=5),x&&(g.preventDefault(),f(x),s(x))}),m.addEventListener("click",function(g){p(b,g)}),d.push(m),l.appendChild(m)})(v);u(e.get().rating);var y=null,c=function(b){var m=b&&b.detail&&b.detail.settings;m&&m===y||(y=m||null,i=er(m||R||{}),u(e.get().rating))};return window.addEventListener(Le,c),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Le,c)}}}var ra=3,Da=10*1024*1024;function ta(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=he("formStepPhotosTitle"),a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent=he("formStepPhotosSubtitle"),a.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-photo-add",i.setAttribute("aria-label","Foto\u011Fraf ekle");var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",l.appendChild(i),l.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),l.appendChild(u),a.appendChild(l);var f=r.revokeBlobUrl||function(g){g&&typeof g=="string"&&g.startsWith("blob:")&&URL.revokeObjectURL(g)},s=r.blobMap||{},p=r.urlToFinger||{};function v(){if(!t){var g=e.get().images||[],x=e.get().pendingImages||[],k=g.map(function(h){return{url:h,isPending:!1}}).concat(x.map(function(h){return{url:h.url,file:h.file,isPending:!0,error:h.error}}));u.innerHTML="",k.forEach(function(h){var z=s[h.url]||h.url,E=y(h,z);u.appendChild(E)}),b()}}function y(g,x){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var h=document.createElement("img");h.src=x,h.alt="",h.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(h);var z=document.createElement("div");z.className="renuvex-pr-fwizard-photo-loading",z.style.display="none",k.appendChild(z);var E=document.createElement("button");E.type="button",E.className="renuvex-pr-fwizard-photo-remove",E.setAttribute("aria-label","Kald\u0131r");var A=te(Ae);return A&&E.appendChild(A),k.appendChild(E),c(k,g,x),k}function c(g,x,k){var h=g.querySelector("img");h.src!==k&&(h.src=k);var z=g.querySelector(".renuvex-pr-fwizard-photo-loading");if(x.isPending&&x.error){z.style.display="flex",z.textContent="";var E=document.createElement("span");E.className="renuvex-pr-upload-error",E.textContent="\u2717 "+x.error,z.appendChild(E)}else z.style.display="none",z.textContent="";var A=g.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var w=p[x.url]||(x.file?x.file.name+"_"+x.file.size:null),T=s[x.url],S={};w&&(S.fingerprints=(e.get().fingerprints||[]).filter(function(L){return L!==w})),x.isPending?S.pendingImages=(e.get().pendingImages||[]).filter(function(L){return L.url!==x.url}):S.images=(e.get().images||[]).filter(function(L){return L!==x.url}),e.set(S),f(x.url),f(T),delete p[x.url],T&&delete p[T],s[x.url]&&delete s[x.url]}}function b(){var g=(e.get().images||[]).length,x=(e.get().pendingImages||[]).length,k=g+x,h=k>=ra;k>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=me(St)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=me(kt)+"<span>Foto\u011Fraf Ekle</span>"),h?(i.style.display="none",i.disabled=!0,d.disabled=!0):(i.style.display="flex",i.disabled=!1,d.disabled=!1,i.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}i.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(g){var x=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(g.target.files).slice(0,ra-x);d.value="";var h=(e.get().pendingImages||[]).length,z=e.get().images||[],E=z.length;if(k.length!==0){for(var A=[],w=[],T=0;T<k.length;T++){var S=k[T],L=S.name+"_"+S.size,P=(e.get().fingerprints||[]).some(function(H){return H===L})||A.some(function(H){return H.file.name+"_"+H.file.size===L});if(!P){if(S.size>Da){var C="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(C,"error"):alert(C);continue}var N=URL.createObjectURL(S);p[N]=L,A.push({url:N,file:S,error:null}),w.push({url:N,file:S});var j=(e.get().fingerprints||[]).slice();j.push(L),e.set({fingerprints:j})}}if(A.length!==0){var G=(e.get().pendingImages||[]).concat(A),Z=async function(){for(var H=0;H<w.length;H++){var pe=w[H],W=pe.file,q=pe.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var K=(e.get().pendingImages||[]).filter(function(O){return O.url!==q}),ce=(e.get().images||[]).slice();ce.push(q),e.set({pendingImages:K,images:ce});continue}try{var $=await rr(Qe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e})});if(!$.ok)throw $.status===429?new Error("rate_limit"):new Error("sign failed");var U=await $.json();if(!U.folder)throw new Error("sign folder missing");var I=new FormData;I.append("file",W),I.append("api_key",U.api_key),I.append("timestamp",U.timestamp),I.append("signature",U.signature),I.append("folder",U.folder);var F=await fetch("https://api.cloudinary.com/v1_1/"+U.cloud_name+"/image/upload",{method:"POST",body:I}),_=await F.json();if(_.secure_url&&Tt(_.secure_url)){var ne=(e.get().pendingImages||[]).some(function(O){return O.url===q});if(!ne)continue;s[_.secure_url]=q,p[_.secure_url]=p[q];var or=(e.get().pendingImages||[]).filter(function(O){return O.url!==q}),ye=(e.get().images||[]).slice();ye.push(_.secure_url),e.set({pendingImages:or,images:ye});try{rr(Qe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e,secureUrl:_.secure_url,metadata:{assetId:_.asset_id,publicId:_.public_id,version:_.version,resourceType:_.resource_type,format:_.format,width:_.width,height:_.height,bytes:_.bytes,signature:_.signature}})}).catch(function(){})}catch(O){}}else throw new Error("invalid image url")}catch(O){console.error("[renuvex-pr] Image upload failed:",O);var M=O.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(M,"error");var ie=(e.get().pendingImages||[]).map(function(Q){return Q.url===q?{url:Q.url,file:Q.file,error:M}:Q});e.set({pendingImages:ie})}}};if(E===0&&h===0){t=!0;var D=!r.canNavigate||r.canNavigate();D&&e.goNext()}e.set({pendingImages:G}),Z()}}};var m=e.onChange(v);return v(),{el:a,destroy:function(){t=!0,d.onchange=null,m&&m()}}}var qr=2e3,Ua=60;function aa(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent=he("formStepContentTitle"),a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=Ua,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),o.appendChild(l);var i=document.createElement("textarea");i.className="renuvex-pr-fwizard-textarea",i.placeholder="Deneyiminizi anlat\u0131n\u2026",i.maxLength=qr,i.rows=6,i.setAttribute("aria-label","Yorum"),i.value=e.get().comment||"",o.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),o.appendChild(d);function u(){var s=i.value.length;d.textContent=s+"/"+qr,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",s>=qr)}function f(){return We(3,e.get())}return i.addEventListener("input",function(){e.set({comment:i.value}),u(),t(f())}),a.appendChild(o),u(),setTimeout(function(){t(f())},0),{el:a,destroy:function(){}}}var Va=40;function na(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent=he("formStepAuthorTitle"),n.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var i=document.createElement("div");i.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=Va,u.setAttribute("aria-required","true"),u.value=e.get().author||"",i.appendChild(d),i.appendChild(u),l.appendChild(i);var f=document.createElement("div");f.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.textContent="E-posta (opsiyonel)";var p=document.createElement("input");p.type="email",p.className="renuvex-pr-fwizard-input",p.setAttribute("autocomplete","email"),p.value=e.get().email||"",f.appendChild(s),f.appendChild(p),l.appendChild(f);var v=document.createElement("div");v.className="renuvex-pr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(v);var y=document.createElement("div");y.className="renuvex-pr-fwizard-msg",y.setAttribute("role","alert"),y.setAttribute("aria-live","assertive"),l.appendChild(y);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",l.appendChild(c),n.appendChild(l);function b(){return We(4,e.get())}function m(){var h=!b(),z=(e.get().pendingImages||[]).length,E=z>0;E?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(c.disabled=h,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",h),c.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),m(),t(b())}),p.addEventListener("input",function(){e.set({email:p.value})}),m(),setTimeout(function(){t(b())},0);function g(){y.textContent=""}function x(h){g();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=h||"",y.appendChild(z)}c.onclick=async function(){if(!c.disabled){var h=e.get(),z=(h.author||"").trim(),E=(h.comment||"").trim();if(p.value.trim()&&!p.checkValidity()){p.reportValidity();return}if(!z){x("Gerekli alan");return}if(!h.rating){x("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",g(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var w=Ct(window.location.href),T=h.productName||null,S=await rr(Qe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e,productId:h.productId||null,slug:w||null,productName:T,author:z,title:(h.title||"").trim()||null,comment:E||null,rating:h.rating,images:h.images||[]})},15e3);if(S.ok)a();else{var L=await S.json().catch(function(){return{}});throw new Error(L.error||"Yorum kaydedilemedi.")}}catch(N){var P=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),C=P?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(C,"error"):x(C),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=A}}};var k=e.onChange(m);return{el:n,destroy:function(){c.onclick=null,k&&k()}}}function Wa(e,r,t){if(t=t||{},e===1)return ea(r,{canNavigate:t.canNavigate});if(e===2)return ta(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return aa(r,{onValidityChange:t.onValidityChange});if(e===4)return na(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function ia(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function oa(e){e=e||{};var r=$t({productId:e.productId,productName:e.productName}),t={},a={},n={};function o(w){if(!(!w||typeof w!="string"||!w.startsWith("blob:")||n[w])){n[w]=!0;try{URL.revokeObjectURL(w)}catch(T){}}}function l(){Object.keys(a).forEach(function(T){o(T)}),Object.keys(t).forEach(function(T){o(t[T])});var w=r.get();(w.pendingImages||[]).forEach(function(T){o(T&&T.url)}),(w.images||[]).forEach(function(T){o(T)})}var i=Zt({onClose:function(){window.removeEventListener("popstate",u),Tr(d),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=Er(),u=function(w){i&&i.close&&i.close()};window.addEventListener("popstate",u);var f=document.createElement("div");f.className="renuvex-pr-fwizard-step-wrap";var s=Qt({skippableSteps:[2],nextableSteps:[3],onBack:function(){y==="idle"&&r.goBack()},onSkip:function(){y==="idle"&&r.goNext()},onNext:function(){y==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="renuvex-pr-fwizard-layout",p.appendChild(f),p.appendChild(s.el);var v=null,y="idle",c=null,b=!0,m=null;function g(w,T){f.innerHTML="";var S=Wa(w,r,{canNavigate:function(){return y==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:o,onValidityChange:function(C){s.setNextDisabled(!C)},onSuccess:k,showToast:i.showToast});if(v=S,s.update(w,r.get()),T){y="entering",S.el.classList.add("renuvex-pr-fwizard-step--enter");var L=null,P=function(){L&&clearTimeout(L),S.el.removeEventListener("animationend",P),S.el.classList.remove("renuvex-pr-fwizard-step--enter"),y="idle",c!==null&&h()};S.el.addEventListener("animationend",P),L=setTimeout(P,700)}else y="idle";f.appendChild(S.el),i.setStepAttr&&i.setStepAttr(w),w===3&&s.setNextDisabled(!0)}var x=!1;function k(){if(!x){if(x=!0,!v){f.innerHTML="";var w=ia();w.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(w),i.setStepAttr("thanks"),s.setThanksState(i.close);return}var T=v;y="exiting",T.el.classList.add("renuvex-pr-fwizard-step--exit");var S=function(){if(m&&clearTimeout(m),T.el.removeEventListener("animationend",S),T.destroy)try{T.destroy()}catch(P){}v===T&&(v=null),f.innerHTML="";var L=ia();L.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(L),i.setStepAttr("thanks"),s.setThanksState(i.close),y="idle"};T.el.addEventListener("animationend",S),m=setTimeout(S,300)}}function h(){var w=r.get().currentStep;if(y!=="idle"){c=w;return}if(!v){var T=!b;b=!1,g(w,T);return}var S=v;y="exiting",S.el.classList.add("renuvex-pr-fwizard-step--exit");var L=function(){if(m&&clearTimeout(m),S.el.removeEventListener("animationend",L),S.destroy)try{S.destroy()}catch(C){}if(v===S){f.innerHTML="",v=null;var P=c!==null?c:r.get().currentStep;c=null,g(P,!0),y="idle"}};S.el.addEventListener("animationend",L),m=setTimeout(L,350)}h();var z=r.get().currentStep,E=r.onChange(function(w){w.currentStep!==z?(z=w.currentStep,h()):s.update(w.currentStep,w)}),A=i.close;return i.close=function(){E&&E(),typeof m!="undefined"&&m&&clearTimeout(m),A()},i.open(p),{close:i.close}}function V(){oa({productId:Y||"",productName:Be||""})}var la=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var qa={id:"classic",name:"Klasik (A\xE7\u0131k)"},Ga=la;function Ka(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,f=e.currentHasImages,s=e.onFilterChange,p=e.onSortChange;ze(n);var v=document.createElement("div");v.className="renuvex-pr-summary";var y=(l[3]||0)+(l[4]||0),c=o>0?Math.round(y/o*100):0,b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-avg",b.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+re("full")+'</span><span class="renuvex-pr-avg-num">'+i+"</span>",v.appendChild(b);var m=document.createElement("div");if(m.className="renuvex-pr-summary-block renuvex-pr-summary-count",m.textContent=o.toLocaleString("tr-TR")+" "+B(a.countLabel,"Yorum"),v.appendChild(m),a.showRecommendation!==!1&&c>0){var g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(g)}return v.appendChild(Ue({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:s})),v.appendChild(J({widget:r,currentOrderBy:u,currentHasImages:f,onWriteClick:V,onSortChange:p})),v}var Kr={};we(Kr,{css:()=>Ja,meta:()=>Xa,render:()=>en});var pa=`
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
`;var Xa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Ja=pa,Za="__unknown_product__",nr=Object.create(null);function $a(e){return e?String(e):Za}var Ne=null,ir=null;function Qa(){!Ne||!ir||(Ne.removeEventListener?Ne.removeEventListener("change",ir):Ne.removeListener&&Ne.removeListener(ir),Ne=null,ir=null)}function en(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,f=e.currentHasImages,s=e.onFilterChange,p=e.onSortChange,v=$a(t),y=document.createElement("div");y.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var b=document.createElement("div");b.className="renuvex-pr-compact-trigger-wrap";var m=document.createElement("button");m.className="renuvex-pr-compact-trigger",m.type="button",m.setAttribute("aria-expanded","false"),m.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Fe(i,n)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+me(zt)+"</span>";var g=m.querySelector(".renuvex-pr-compact-trigger-text"),x=m.querySelector(".renuvex-pr-compact-chevron");if(g&&(g.textContent=o.toLocaleString("tr-TR")+" "+B(a.countLabel,"Yorum")),g&&x){var k=document.createElement("span");k.className="renuvex-pr-compact-trigger-count",m.insertBefore(k,g),k.appendChild(g),k.appendChild(x)}b.appendChild(m),c.appendChild(b);var h=J({widget:r,currentOrderBy:u,currentHasImages:f,onWriteClick:V,onSortChange:p}),z=h.querySelector(".renuvex-pr-filter-wrap"),E=h.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-compact-actions-slot",E&&A.appendChild(E),z&&A.appendChild(z),c.appendChild(A),y.appendChild(c);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),w.setAttribute("aria-hidden","true");var T=document.createElement("div");T.className="renuvex-pr-compact-panel-inner";var S=document.createElement("div");S.className="renuvex-pr-compact-avg",S.innerHTML='<span class="renuvex-pr-icon">'+re("full")+"</span><span>"+i+"</span>",T.appendChild(S),T.appendChild(Ue({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:function(I){P()&&w.classList.contains("renuvex-pr-open")&&(nr[v]=!0),s(I)}})),w.appendChild(T);var L=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function P(){return!!(L&&L.matches)}function C(I){I?w.classList.add("renuvex-pr-open"):w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden",I?"false":"true"),m.setAttribute("aria-expanded",I?"true":"false")}function N(I){var F=I?y:b;if(w.parentNode!==F){var _=!!w.parentNode;w.classList.contains("renuvex-pr-open")&&C(!1),_&&(nr[v]=!1),F.appendChild(w)}}N(L?L.matches:!1);var j=J({widget:r,currentOrderBy:u,currentHasImages:f,onWriteClick:V,onSortChange:p}),G=j.querySelector(".renuvex-pr-filter-wrap"),Z=j.querySelector(".renuvex-pr-write-btn"),D=document.createElement("div");D.className="renuvex-pr-compact-write-row",Z&&D.appendChild(Z),G&&D.appendChild(G),y.appendChild(D);function H(){var I=w.classList.contains("renuvex-pr-open");return C(!1),P()&&(nr[v]=!1),I}function pe(){W&&W.notifyOpening(),C(!0),P()&&(nr[v]=!0)}m.onclick=function(){w.classList.contains("renuvex-pr-open")?H():pe()};var W=null;function q(I){W&&(W.unregister(),W=null),I||(W=Lr({trigger:b,element:w,close:H}))}if(q(L?L.matches:!1),Qa(),L){var K=function(I){N(I.matches),q(I.matches)};L.addEventListener?L.addEventListener("change",K):L.addListener&&L.addListener(K),Ne=L,ir=K}if(P()&&nr[v]&&C(!0),a.showRecommendation!==!1){var ce=(l[3]||0)+(l[4]||0),$=o>0?Math.round(ce/o*100):0;if($>0){var U=document.createElement("div");U.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",U.style.marginTop="8px",U.innerHTML='<span class="renuvex-pr-recommend-pct">%'+$+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",T.appendChild(U)}}return y}var Xr={};we(Xr,{css:()=>tn,meta:()=>rn,render:()=>an});var ua=`
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
`;var rn={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},tn=ua;function an(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,f=e.onFilterChange,s=e.onSortChange;ze(a);var p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-split";var v=document.createElement("div");v.className="renuvex-pr-split-col renuvex-pr-split-left";var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",y.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+re("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",v.appendChild(y);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),v.appendChild(c),p.appendChild(v);var b=document.createElement("div");b.className="renuvex-pr-split-col renuvex-pr-split-mid",b.appendChild(Ue({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:f})),p.appendChild(b);var m=J({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:V,onSortChange:s}),g=m.querySelector(".renuvex-pr-filter-wrap"),x=m.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-split-col renuvex-pr-split-right",x&&k.appendChild(x),g&&k.appendChild(g),p.appendChild(k);var h=(o[3]||0)+(o[4]||0),z=n>0?Math.round(h/n*100):0,E=document.createElement("div");E.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",E.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||z===0;return A&&E.classList.add("renuvex-pr-split-rec-hidden"),v.appendChild(E),p}var Jr={};we(Jr,{css:()=>on,meta:()=>nn,render:()=>ln});var sa=`
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
`;var nn={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},on=sa;function ln(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.avgRatingVal,l=e.currentOrderBy,i=e.currentHasImages,d=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var f=document.createElement("div");f.className="renuvex-pr-minimal-info";var s=document.createElement("div");s.className="renuvex-pr-minimal-row";var p=document.createElement("span");p.className="renuvex-pr-minimal-avg",p.textContent=o,s.appendChild(p);var v=document.createElement("span");v.className="renuvex-pr-minimal-stars",v.innerHTML=Fe(o,a),s.appendChild(v);var y=document.createElement("span");y.className="renuvex-pr-minimal-count",y.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),s.appendChild(y),f.appendChild(s),u.appendChild(f);var c=J({widget:r,currentOrderBy:l,currentHasImages:i,onWriteClick:V,onSortChange:d}),b=c.querySelector(".renuvex-pr-filter-wrap"),m=c.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");g.className="renuvex-pr-minimal-actions",m&&g.appendChild(m),b&&g.appendChild(b),u.appendChild(g);var x=J({widget:r,currentOrderBy:l,currentHasImages:i,onWriteClick:V,onSortChange:d}),k=x.querySelector(".renuvex-pr-filter-wrap"),h=x.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-minimal-write-row",h&&z.appendChild(h),k&&z.appendChild(k),u.appendChild(z),u}var Zr={};we(Zr,{css:()=>un,meta:()=>pn,render:()=>sn});var da=`
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
`;var pn={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},un=da;function sn(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.avgRatingVal,l=e.currentOrderBy,i=e.currentHasImages,d=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var f=document.createElement("div");f.className="renuvex-pr-hero-info";var s=document.createElement("div");s.className="renuvex-pr-hero-rating-col";var p=document.createElement("span");p.className="renuvex-pr-hero-avg",p.textContent=o,s.appendChild(p);var v=document.createElement("div");v.className="renuvex-pr-hero-meta-row";var y=document.createElement("span");y.className="renuvex-pr-hero-stars",y.innerHTML=Fe(o,a),v.appendChild(y);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=n.toLocaleString("tr-TR")+" "+B(t.countLabel,"Yorum"),v.appendChild(c),s.appendChild(v),f.appendChild(s),u.appendChild(f);var b=J({widget:r,currentOrderBy:l,currentHasImages:i,onWriteClick:V,onSortChange:d}),m=b.querySelector(".renuvex-pr-filter-wrap"),g=b.querySelector(".renuvex-pr-write-btn"),x=document.createElement("div");x.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",g&&x.appendChild(g),m&&x.appendChild(m),u.appendChild(x);var k=J({widget:r,currentOrderBy:l,currentHasImages:i,onWriteClick:V,onSortChange:d}),h=k.querySelector(".renuvex-pr-filter-wrap"),z=k.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");return E.className="renuvex-pr-hero-write-row",z&&E.appendChild(z),h&&E.appendChild(h),u.appendChild(E),u}var va=`
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
`;var Pr={classic:Gr,compact:Kr,split:Xr,minimal:Jr,hero:Zr};function Nr(e){return Pr[e]||Pr.classic}function ca(){var e=Object.keys(Pr).map(function(r){return Pr[r].css||""}).join(`
`);return va+`
`+e}var $r={};we($r,{css:()=>vn,meta:()=>dn,render:()=>cn});function qe(e,r,t){var a=t||{},n=document.createDocumentFragment(),o=document.createElement("div");o.className=r+" renuvex-pr-body-clamped",o.textContent=e,n.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-body-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:o,readMore:l}}function Ge(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=B(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi"),a.appendChild(n),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",o.textContent=e,t.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-reply-text-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var ma=`
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
`;var dn={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},vn=ma;function cn(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var o=document.createElement("span");o.className="renuvex-pr-review-stars",o.innerHTML=xe(e.rating,R),n.appendChild(o);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=fe(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-title",i.textContent=e.title,t.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var u=(e.comment||"").trim();u&&t.appendChild(qe(u,"renuvex-pr-body").fragment);var f=ke(e);if(f.length){var s=document.createElement("div");s.className="renuvex-pr-gallery",f.forEach(function(v){var y=document.createElement("img"),c=ue(v,X);y.src=c.src,y.srcset=c.srcset,y.loading="lazy",y.decoding="async",y.width=X,y.height=X,y.className="renuvex-pr-img",se(y),y.setAttribute("data-renuvex-img-url",v),(function(b){Se(y,function(){ve(e,b,r)})})(v),s.appendChild(y)}),t.appendChild(s)}var p=Ge(e.merchantReply);return p&&t.appendChild(p),t}var Qr={};we(Qr,{css:()=>xn,meta:()=>mn,render:()=>fn});var xa=`
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
`;var mn={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},xn=xa;function fn(e,r){var t=ke(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=xe(e.rating,R),o.appendChild(l);var i=document.createElement("span");i.className="renuvex-pr-review-list-author-name",i.textContent=e.author||"",o.appendChild(i);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=fe(e.createdAt),o.appendChild(d),n.appendChild(o);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var f=document.createElement("div");f.className="renuvex-pr-review-list-title",f.textContent=e.title,u.appendChild(f)}var s=(e.comment||"").trim();s&&u.appendChild(qe(s,"renuvex-pr-review-list-body").fragment);var p=Ge(e.merchantReply);if(p&&u.appendChild(p),n.appendChild(u),a){var v=document.createElement("div");v.className="renuvex-pr-review-list-media",t.forEach(function(y){var c=document.createElement("img"),b=ue(y,X);c.src=b.src,c.srcset=b.srcset,c.loading="lazy",c.decoding="async",c.width=X,c.height=Math.round(X*4/3),c.setAttribute("data-renuvex-img-url",y),se(c),(function(m){Se(c,function(){ve(e,m,r)})})(y),v.appendChild(c)}),n.appendChild(v)}return n}var et={};we(et,{css:()=>hn,meta:()=>gn,render:()=>bn});var fa=`
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
    #renuvex-reviews-widget:has(.renuvex-pr-review-gallery){
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
`;var gn={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},hn=fa;function bn(e,r){var t=gr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=xe(e.rating,R),o.appendChild(l),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-gallery-title",i.textContent=e.title,o.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",o.appendChild(d);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=fe(e.createdAt),o.appendChild(u);var f=(e.comment||"").trim();if(f&&o.appendChild(qe(f,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ve(e,t,r)}}:null).fragment),n.appendChild(o),a){var s=document.createElement("div");s.className="renuvex-pr-review-gallery-media";var p=document.createElement("img"),v=ue(t,hr);p.src=v.src,p.srcset=v.srcset,p.loading="lazy",p.decoding="async",p.width=hr,p.height=Math.round(hr*4/3),se(p),p.setAttribute("data-renuvex-img-url",t),Se(p,function(){ve(e,t,r)}),s.appendChild(p),n.appendChild(s)}var y=Ge(e.merchantReply,t?function(){ve(e,t,r)}:null);return y&&(y.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(y)),n}var Rr={card:$r,list:Qr,gallery:et};function Ir(e){return Rr[e]||Rr.card}function ga(){return Object.keys(Rr).map(function(e){return Rr[e].css||""}).join(`
`)}var rt=0;function Ke(){return rt++,rt}function Xe(e,r){return e!==rt?!1:r?!(r.productId!==void 0&&Y!==r.productId||r.orderBy!==void 0&&ee!==r.orderBy||r.page!==void 0&&ur!==r.page||r.ratingFilter!==void 0&&oe!==r.ratingFilter||r.hasImages!==void 0&&le!==r.hasImages||r.nextCursor!==void 0&&sr!==r.nextCursor):!0}var tt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},at={small:80,medium:110,large:140},nt={small:80,medium:100,large:110};function ha(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var o=document.createElementNS(t,"line");o.setAttribute("x1","1"),o.setAttribute("y1","1"),o.setAttribute("x2","23"),o.setAttribute("y2","23"),a.appendChild(n),a.appendChild(o);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var i=document.createElement("div");return i.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",i.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(i),r}function ba(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function be(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),o=parseInt(t[3],16);return"rgba("+a+","+n+","+o+","+r+")"}function Br(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function it(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function ya(e){return .2126*it(e.r)+.7152*it(e.g)+.0722*it(e.b)}function wa(e,r){var t=ya(e),a=ya(r),n=Math.max(t,a),o=Math.min(t,a);return(n+.05)/(o+.05)}function yn(e){var r=Br(e)||Br("#ffffff"),t=Br("#111111"),a=Br("#ffffff");return wa(t,r)>=wa(a,r)?"#111111":"#ffffff"}function wn(e){return be(e,e==="#ffffff"?.1:.06)}function za(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",i=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",u=be(l,.06),f=r.reviewStarColor||"#f59e0b",s=r.btnBgColor||"#111111",p=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",y=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",b=r.filterBtnBorderColor||"#111111",m=r.filterMenuBgColor||"#ffffff",g=r.filterMenuBorderColor||"#e5e7eb",x=r.filterItemTextColor||"#111111",k=r.filterItemHoverBgColor||"#f3f4f6",h=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",E=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",w=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",S=be(w,.65),L=r.replyBgColor||"#f9fafb",P=r.replyBorderColor||"#747474",C=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",j=r.photoTitleColor||"#111111",G=be("#111111",.05),Z=r.photoArrowBgColor||"#ffffff",D=r.photoArrowTextColor||"#111111",H=be("#111111",.12),pe=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",q=r.formSecondaryTextColor||"#3b3b3b",K=r.inputTextColor||W,ce=r.inputBorderColor||"#d1d5db",$=r.placeholderColor||"#9ca3af",U=r.formStepBarColor||"#111111",I=r.formBtnBgColor||"#111111",F=r.formBtnTextColor||"#ffffff",_=r.formBtnBorderColor||"#111111",ne=be(I,.06),or=be(I,.18),ye=be(F,.85),M=be(W,.06),ie=yn(pe),O=wn(ie),Q=r.loadMoreBgColor||"#ffffff",lr=r.loadMoreTextColor||"#111111",pr=r.loadMoreBorderColor||"#111111",Je={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":o,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":i,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":s,"--renuvex-pr-btn-text":p,"--renuvex-pr-btn-border":v,"--renuvex-pr-filter-btn-bg":y,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":b,"--renuvex-pr-filter-menu-bg":m,"--renuvex-pr-filter-menu-border":g,"--renuvex-pr-filter-item-text":x,"--renuvex-pr-filter-item-hover-bg":k,"--renuvex-pr-filter-item-active":h,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":E,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":w,"--renuvex-pr-review-border":T,"--renuvex-pr-state-text":S,"--renuvex-pr-review-star-color":f,"--renuvex-pr-reply-bg-color":L,"--renuvex-pr-reply-border":P,"--renuvex-pr-reply-label":C,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":j,"--renuvex-pr-photo-image-border":G,"--renuvex-pr-photo-arrow-bg":Z,"--renuvex-pr-photo-arrow-text":D,"--renuvex-pr-photo-arrow-border":H,"--renuvex-pr-fwizard-bg":pe,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":q,"--renuvex-pr-fwizard-input-bg":pe,"--renuvex-pr-fwizard-input-text":K,"--renuvex-pr-fwizard-input-border":ce,"--renuvex-pr-fwizard-placeholder":$,"--renuvex-pr-fwizard-close-text":ie,"--renuvex-pr-fwizard-close-hover-bg":O,"--renuvex-pr-fwizard-progress-bg":M,"--renuvex-pr-fwizard-progress-active":U,"--renuvex-pr-fwizard-btn-bg":I,"--renuvex-pr-fwizard-btn-text":F,"--renuvex-pr-fwizard-btn-border":_,"--renuvex-pr-fwizard-btn-disabled-bg":or,"--renuvex-pr-fwizard-btn-disabled-text":ye,"--renuvex-pr-fwizard-nav-hover-bg":ne,"--renuvex-pr-load-more-bg":Q,"--renuvex-pr-load-more-text":lr,"--renuvex-pr-load-more-border":pr};Object.keys(Je).forEach(function(Ze){e.style.setProperty(Ze,Je[Ze])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function ka(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,o=e.wireLightboxTrigger,l=(e.photoStripReviews||[]).filter(function(k){return ke(k).length>0});if(!(r.showPhotoGallery!==!1&&!a&&l.length>0))return null;var i=document.createElement("div");if(i.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var d=B(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),u=document.createElement("div");u.className="renuvex-pr-photo-title",u.textContent=d,i.appendChild(u)}var f=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",f);var s=document.createElement("div");s.className="renuvex-pr-photo-strip";var p=X,v=r.reviewLayout==="card"?X:Math.round(X*4/3),y=0;l.forEach(function(k){if(!(y>=15)){var h=gr(k);if(h){var z=document.createElement("img"),E=ue(h,X);z.src=E.src,z.srcset=E.srcset,z.loading=y<3?"eager":"lazy",z.decoding="async",z.width=p,z.height=v,z.className="renuvex-pr-photo-strip-thumb",z.alt="Yorum foto\u011Fraf\u0131",se(z),(function(A,w){o(z,function(){n(w,A,l)})})(h,k),s.appendChild(z),y++}}});var c=document.createElement("button");c.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var b=te(Me);b&&c.appendChild(b),c.setAttribute("aria-label","\xD6nceki"),c.onclick=function(){s.scrollBy({left:-200,behavior:"smooth"})};var m=document.createElement("button");m.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var g=te(fr);g&&m.appendChild(g),m.setAttribute("aria-label","Sonraki"),m.onclick=function(){s.scrollBy({left:200,behavior:"smooth"})};var x=document.createElement("div");return x.className="renuvex-pr-photo-strip-wrap",x.appendChild(c),x.appendChild(s),x.appendChild(m),i.appendChild(x),i}function Sa(e){var r=e.render;async function t(){var o=Ke(),l=Y,i=ee,d=oe,u=le;Ee(null);var f=await Oe(Y,ee,1,oe,le);Xe(o,{productId:l,orderBy:i,ratingFilter:d,hasImages:u})&&await r(Y,R,f,Be,ee,1,pt)}async function a(o){var l=Ke(),i=oe===o?null:o,d=Y,u=ee,f=le;st(i),_e(1),Ee(null);var s=await Oe(Y,ee,1,i,le);Xe(l,{productId:d,orderBy:u,page:1,ratingFilter:i,hasImages:f})&&await r(Y,R,s,Be,ee,1)}async function n(o,l){var i=Ke(),d=Y,u=oe;_e(1),Ee(null);var f=o,s=!1;l&&(s=!0,f="newest"),dt(s),dr(f);var p=await Oe(Y,f,1,oe,s);Xe(i,{productId:d,orderBy:f,page:1,ratingFilter:u,hasImages:s})&&await r(Y,R,p,Be,f,1)}return{onRetry:t,onFilterChange:a,onSortChange:n}}function zn(){return Nt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function kn(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=Lt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),Pt(t,{surface:"reviews",productId:r||""}),t}async function ot(e,r,t,a,n,o,l){if(yt){mr({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:o,badgeSettings:l});return}cr(!0),vt(e),ct(r),l!==void 0&&mt(l),xt(a),n&&dr(n),o&&_e(o),t!=null&&(ft(t),Ee(t&&t.data?t.data.nextCursor:null));var i=Sa({render:ot});try{let ye=function(M,ie){if(!(!M||!M.meta||!M.meta.sizeOverrides)){var O=M.meta.sizeOverrides[ie];O&&Object.keys(O).forEach(function(Q){v.style.setProperty(Q,O[Q])})}};var or=ye,d=Nr(r.summaryLayout),u=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),f=r.showTitle!==!1,s=B(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),p=u&&f?s:"",v=document.documentElement;za(v,r);var y=r.borderRadius!==void 0?r.borderRadius:8,c=tt[r.size]||tt.medium,b=at[r.thumbnailSize]||at.medium,m=b;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(m=nt[r.thumbnailSize]||nt.medium),v.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),v.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),v.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),v.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),v.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),v.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),v.style.setProperty("--renuvex-pr-radius",y+"px"),v.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,y-4)+"px"),v.style.setProperty("--renuvex-pr-photo-title-size",c.photoTitleSize+"px"),v.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),v.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),v.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),v.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),v.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),v.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),v.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),v.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),v.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),v.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),v.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),v.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),v.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),v.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),v.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size",b+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size-mobile",m+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";v.style.setProperty("--renuvex-pr-review-star-color",g),v.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),v.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),ye(Nr(r.summaryLayout),r.size),ye(Ir(r.reviewLayout),r.size);var x=er(r),k=zn();if(!k)return;var h=kn(k,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==h&&h.appendChild(z);var E=Rt(z),A=He+Re+wr+ca()+ga();Ye(E,A);var w=Bt(E);if(r.enabled===!1){z.style.minHeight="auto",w.replaceChildren(ha(r.borderRadius!==void 0?r.borderRadius:8)),cr(!1);var T=vr;mr(null),T&&ot(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}try{var S=t||{},L=Hr(S),P=L?[]:S.data&&S.data.reviews||[];gt(P),w.replaceChildren();var C=document.createElement("section");if(C.id="renuvex-reviews-widget",C.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),C.className="renuvex-pr-reviews-widget",C.setAttribute("data-renuvex-surface","reviews"),e&&C.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(C.style.width="100%",C.style.maxWidth="100%",C.style.marginLeft="0",C.style.marginRight="0"),p){var N=document.createElement("div"),j=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+j,N.textContent=p,C.appendChild(N)}if(L){C.appendChild(ba(S.message,i.onRetry)),w.appendChild(C),Te(E),_r(C,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return E.getElementById("renuvex-reviews-widget")});return}var G=S.data&&S.data.allCount||0,Z=S.data&&S.data.ratingCounts||null,D=Z||[0,0,0,0,0],H=S.data&&S.data.avgRating||"0.0";if(!Z&&P.length>0){P.forEach(function(M){M.rating>=1&&M.rating<=5&&D[M.rating-1]++});var pe=P.reduce(function(M,ie){return M+ie.rating},0);H=(pe/P.length).toFixed(1)}if(G>0){var W=Nr(r.summaryLayout),q=W.render({widget:C,productId:e,data:S,settings:r,iconPair:x,allCount:G,ratingCounts:D,avgRatingVal:H,currentRatingFilter:oe,currentOrderBy:ee,currentHasImages:le,onFilterChange:i.onFilterChange,onSortChange:i.onSortChange});C.appendChild(q)}else{var K=document.createElement("button");K.className="renuvex-pr-write-btn",K.style.cssText="display:block;margin:16px auto 0;",K.textContent=B(r.writeButtonText,"Yorum Yap"),K.onclick=V,C.appendChild(K)}var ce=ka({settings:r,root:v,currentHasImages:le,photoStripReviews:ut,openReviewModal:ve,wireLightboxTrigger:Se});if(ce&&C.appendChild(ce),P.length===0){var $=document.createElement("p");$.className="renuvex-pr-state-msg",$.textContent="Hen\xFCz yorum yok.",C.appendChild($)}else{var U=Ir(r.reviewLayout);P.forEach(function(M){C.appendChild(U.render(M,Mr))})}var I=S.data&&S.data.hasMore;if(I){var F=document.createElement("button");F.className="renuvex-pr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var M=Ke(),ie=Y,O=ee,Q=ur,lr=oe,pr=le,Je=sr,Ze=Q+1,Ce=await Oe(ie,O,Ze,lr,pr,null,Je);if(Xe(M,{productId:ie,orderBy:O,page:Q,ratingFilter:lr,hasImages:pr,nextCursor:Je}))if(Ce&&!Hr(Ce)&&Ce.data&&Array.isArray(Ce.data.reviews)){var lt=ht(Ce.data.reviews);bt(lt),_e(Ze),Ee(Ce.data.nextCursor||null);var Ca=Ir(R.reviewLayout);lt.forEach(function(Ea){C.insertBefore(Ca.render(Ea,Mr),F)}),Ce.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.disabled=!1,F.textContent="Tekrar Dene"},C.appendChild(F)}w.appendChild(C),Te(E),_r(C,"reviews-widget",{productId:e||""},function(){return E.getElementById("renuvex-reviews-widget")})}catch(M){console.error("[renuvex-pr] render error:",M);var _=document.createElement("p");_.style.cssText="text-align:center;color:#dc2626;",_.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",w&&w.replaceChildren(_)}}finally{if(cr(!1),vr){var ne=vr;mr(null),ot(ne.productId,ne.settings,ne.reviewsData,ne.productName,ne.orderBy,ne.page,ne.badgeSettings)}}}export{ot as render};
