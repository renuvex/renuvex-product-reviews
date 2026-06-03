/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Le,d as nr}from"./chunk-N7KC6W47.js";import{b as Br,c as Be}from"./chunk-ZM24JLBV.js";import{A as pr,B as ur,a as q,b as ir,c as Q,d as ee,e as H,f as N,g as rt,h as Pe,j as Nr,k as tt,l as or,m as Ne,n as at,o as nt,p as it,q as ot,r as lt,s as pt,t as ut,v as dt,w as st,x as vt,y as ct,z as lr}from"./chunk-NQF4A7IV.js";import{A as ye,B as vr,C as V,D as cr,E as mr,F as Rr,G as Ir,H as ie,I as wt,J as oe,K as zt,L as St,c as Pr,e as be,f as G,g as ve,h as X,i as Ce,j as dr,k as Ke,l as mt,m as Re,n as sr,o as xt,p as ke,q as ft,r as gt,t as ht,u as ce,v as Ie,x as bt,y as me,z as yt}from"./chunk-37VAD4Y7.js";import{a as Je}from"./chunk-GSBAPHFO.js";import{a as he,b as Ge,c as Xe,k as Ct,l as Ee}from"./chunk-YCWIZ2SG.js";var _e=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function kt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Me(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function xr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function Et(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Tt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var At=`
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
`,Lt=`
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
`;var Pt=`
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
`;var Nt=`
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
  @media(hover:hover) and (pointer:fine){.renuvex-pr-photo-strip-thumb:hover{transform:translateY(-2px);}}
  .renuvex-pr-photo-strip-wrap{position:relative;display:block;}
`;var Rt=`
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
`;var It=`
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-modal-wrap:focus,.renuvex-pr-modal-wrap:focus-visible{outline:none;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;}
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
`;var fr=[At,bt,Pt,Nt,Rt,It,Lt].join(`
`);function ya(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function le(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function wa(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function za(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",o=wa()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Sa(e){var r=document.body.style,t=document.documentElement.style;le(t,"overflow",e.rootOverflow,e.rootOverflowPriority),le(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),le(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),le(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),le(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),le(r,"position",e.bodyPosition,e.bodyPositionPriority),le(r,"top",e.bodyTop,e.bodyTopPriority),le(r,"left",e.bodyLeft,e.bodyLeftPriority),le(r,"right",e.bodyRight,e.bodyRightPriority),le(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Ze=0,Fe=null;function gr(){return Ze+=1,Ze>1||(Fe=ya(),za(Fe)),Fe}function hr(){if(Ze!==0&&(Ze-=1,!(Ze>0))){var e=Fe;Fe=null,e&&Sa(e)}}function Ca(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function br(){var e=Ca();return!e||e===document.body||e===document.documentElement?null:e}function K(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ka(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function _r(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ka)}function Ea(e,r){var t=e,a=_r(e);!a.length&&r&&(t=r,a=_r(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;K(n)}function yr(e,r,t){if(e.key==="Tab"){var a=_r(r);if(!a.length){e.preventDefault(),Ea(r);return}var n=a[0],o=a[a.length-1],l=Et(t);if(!r.contains(l)){e.preventDefault(),K(n);return}if(a.indexOf(l)===-1){e.preventDefault(),K(e.shiftKey?o:n);return}e.shiftKey&&l===n?(e.preventDefault(),K(o)):!e.shiftKey&&l===o&&(e.preventDefault(),K(n))}}var Bt="renuvexPrOverlay";function wr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Bt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Ta(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Bt]===e.id)}function zr(e){if(Ta(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Oe(e){return ye(e)}function _t(e,r,t,a,n){hr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&dr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),K(n)}function Aa(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ce(e.rating,N);var o=document.createElement("span");o.className="renuvex-pr-modal-date",o.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var i=document.createElement("div");i.className="renuvex-pr-modal-author",i.textContent=e.author||"",t.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var p=document.createElement("div");p.className="renuvex-pr-modal-reply";var x=document.createElement("div");x.className="renuvex-pr-modal-reply-label",x.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi";var s=document.createElement("div");return s.className="renuvex-pr-modal-reply-text",s.textContent=e.merchantReply||"",p.appendChild(x),p.appendChild(s),p.style.display=e.merchantReply?"":"none",t.appendChild(p),r.appendChild(t),r}function Mt(e,r,t){var a=t||N,n=e.querySelector(".renuvex-pr-modal-scroll-content"),o=n.querySelector(".renuvex-pr-modal-stars");o.innerHTML=ce(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var i=n.querySelector(".renuvex-pr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Fr(e,r,t,a,n,o,l,i,d){var p=Oe(e),x=Math.max(0,Math.min(t||0,p.length-1)),s=document.createElement("div");s.className="renuvex-pr-modal-left";var u=document.createElement("img"),v=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";u.className="renuvex-pr-modal-main-img"+(v?" "+v:""),u.src=Ir(p[x]||""),u.decoding="async",u.width=Rr,u.height=Math.round(Rr*4/3),u.alt="Yorum foto\u011Fraf\u0131",wt(u,function(T){if(T.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var E=document.createElement("div");E.className="renuvex-pr-modal-img-error",E.setAttribute("role","status"),E.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(E,T)}}),s.appendChild(u);var b=document.createElement("button");b.className="renuvex-pr-modal-close-mobile";var m=X(ke);m&&b.appendChild(m),b.setAttribute("aria-label","Kapat"),b.onclick=function(T){T.stopPropagation(),o()},s.appendChild(b);var y=0;if(s.addEventListener("touchstart",function(T){y=T.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(T){var E=y-T.changedTouches[0].clientX;if(!(Math.abs(E)<50)){if(E>0){if(f)xe(e,r,x+1,a,n,o,!0,"next",i,d);else if(g){var P=a[r+1];xe(P,r+1,0,a,n,o,!1,"next",i,d)}}else if(h)xe(e,r,x-1,a,n,o,!0,"prev",i,d);else if(S){var B=a[r-1],j=Oe(B);xe(B,r-1,j.length-1,a,n,o,!1,"prev",i,d)}}},{passive:!0}),p.length>1){var c=document.createElement("div");c.className="renuvex-pr-modal-thumbs",p.forEach(function(T,E){var P=document.createElement("img"),B=ie(T,mr);P.src=B.src,P.srcset=B.srcset,P.loading="lazy",P.decoding="async",P.width=mr,P.height=mr,P.className="renuvex-pr-modal-thumb"+(E===x?" renuvex-pr-modal-thumb-active":""),P.alt="K\xFC\xE7\xFCk resim "+(E+1),oe(P),P.tabIndex=0,P.setAttribute("role","button"),P.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(E+1)+" se\xE7"),E===x&&P.setAttribute("aria-current","true"),(function(j){function F(){xe(e,r,j,a,n,o,!0,null,i,d)}P.onclick=F,P.onkeydown=function(U){(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),F())}})(E),c.appendChild(P)}),s.appendChild(c)}var h=x>0,f=x<p.length-1,S=r>0,g=r<a.length-1,w=h||S,C=f||g;if(w){var A=document.createElement("button");A.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var z=X(Re);z&&A.appendChild(z),A.setAttribute("aria-label","\xD6nceki"),A.onclick=function(T){if(T.stopPropagation(),h)xe(e,r,x-1,a,n,o,!0,"prev",i,d);else if(S){var E=a[r-1],P=Oe(E);xe(E,r-1,P.length-1,a,n,o,!1,"prev",i,d)}},s.appendChild(A)}if(C){var k=document.createElement("button");k.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var L=X(sr);L&&k.appendChild(L),k.setAttribute("aria-label","Sonraki"),k.onclick=function(T){if(T.stopPropagation(),f)xe(e,r,x+1,a,n,o,!0,"next",i,d);else if(g){var E=a[r+1];xe(E,r+1,0,a,n,o,!1,"next",i,d)}},s.appendChild(k)}return s}function Ft(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Oe(a);n[0]&&(new Image().src=Ir(n[0]))}})}function Mr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function La(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function o(){Mr(t),Mr(a),Mr(n)}o(),t&&K(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function xe(e,r,t,a,n,o,l,i,d,p){if(p&&(p.currentReview=e),l){var x=Fr(e,r,t,a,n,o,i,d,p);n.firstChild&&n.replaceChild(x,n.firstChild)}else{var x=Fr(e,r,t,a,n,o,i,d,p),s=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(x,n.firstChild),s&&Mt(s,e,p&&p.currentSettings),La(d,n)}Ft(r,a)}function pe(e,r,t){var a=Oe(e);if(!a.length)return;var n=(t||[]).filter(function(C){return Oe(C).length>0}),o=n.findIndex(function(C){return C===e||C.id===e.id});o===-1&&(n.unshift(e),o=0);var l=a.indexOf(r);l<0&&(l=0);var i=document.createElement("div");i.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var p=!1,x=null,s=br(),u=gr(),v=wr(),b={currentReview:e,currentSettings:N},m=null;function y(C){var A=C&&C.detail&&C.detail.settings;if(!(A&&A===m)){m=A||null,b.currentSettings=A||N;var z=d.querySelector(".renuvex-pr-modal-right");!z||!b.currentReview||Mt(z,b.currentReview,b.currentSettings)}}function c(){p||(p=!0,window.removeEventListener(Ee,y),_t(x&&x.host,h,c,u,s))}function h(C){if(C.key==="Escape"){f();return}yr(C,i,x&&x.root)}function f(){p||(p=!0,window.removeEventListener(Ee,y),_t(x&&x.host,h,c,u,s),zr(v))}document.addEventListener("keydown",h),window.addEventListener("popstate",c),window.addEventListener(Ee,y),i.onclick=function(){f()},d.onclick=function(C){C.stopPropagation()},d.appendChild(Fr(e,o,l,n,d,f,null,i,b)),d.appendChild(Aa(e)),Ft(o,n);var S=document.createElement("div");S.className="renuvex-pr-modal-wrap",S.tabIndex=-1,S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),S.appendChild(d);var g=document.createElement("button");g.className="renuvex-pr-modal-close";var w=X(ke);w&&g.appendChild(w),g.setAttribute("aria-label","Kapat"),g.onclick=function(C){C.stopPropagation(),f()},S.appendChild(g),i.appendChild(S),x=xr(),Me(x.root,_e+Le+fr),x.root.appendChild(i),Ce(x.root),K(S)}function we(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var jr={};he(jr,{css:()=>Ha,meta:()=>Oa,render:()=>Ya});function He(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,o=e.onFilterChange;be(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var i=5;i>=1;i--){var d=r[i-1]||0,p=t>0?Math.round(d/t*100):0,x=n===i,s=document.createElement("div");s.className="renuvex-pr-bar-row"+(x?" renuvex-pr-bar-active":"")+(n&&!x?" renuvex-pr-bar-dimmed":""),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",x?"true":"false"),s.setAttribute("aria-label",i+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" yorum, "+(x?"filtreyi kald\u0131r":"filtrele"));for(var u="",v=1;v<=5;v++){var b=v<=i;u+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(b?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+G(b?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+u+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+p+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(m){function y(){o(m)}s.onclick=y,s.onkeydown=function(c){(c.key==="Enter"||c.key===" "||c.key==="Space"||c.key==="Spacebar")&&(c.preventDefault(),y())}})(i),l.appendChild(s)}return l}var Yt="data-renuvex-pr-dismiss-gesture",Te=[],Ot=!1,Sr=!1,$e=[],Ye=null;function Ht(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Or(){for(var e=Te.length-1;e>=0;e--){var r=Te[e].element;r&&r.isConnected===!1&&Te.splice(e,1)}return Te}function Pa(e){!e||typeof e.setAttribute!="function"||($e.indexOf(e)===-1&&$e.push(e),e.setAttribute(Yt,""))}function Dt(){for(var e=0;e<$e.length;e++){var r=$e[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Yt)}$e=[],Ye&&typeof clearTimeout=="function"&&clearTimeout(Ye),Ye=null}function Na(e){if(Sr){Sr=!1,Dt(),e.preventDefault(),e.stopPropagation();return}for(var r=Or(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];Ht(e,n.trigger)||Ht(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Ra(e){if(e.key==="Escape")for(var r=Or(),t=r.length-1;t>=0;t--)r[t].close()}function jt(){Ot||typeof document=="undefined"||(document.addEventListener("click",Na,!0),document.addEventListener("keydown",Ra),Ot=!0)}function Ia(e){jt(),Sr=!0,Pa(e),Ye&&typeof clearTimeout=="function"&&clearTimeout(Ye),typeof setTimeout=="function"&&(Ye=setTimeout(function(){Sr=!1,Dt()},700))}function Hr(e){Ia(e)}function Cr(e){jt();var r={trigger:e.trigger,element:e.element,close:e.close};return Te.push(r),{unregister:function(){var t=Te.indexOf(r);t!==-1&&Te.splice(t,1)},notifyOpening:function(){for(var t=Or(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function re(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,o=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var i=document.createElement("button");i.className="renuvex-pr-write-btn",i.textContent=N&&N.writeButtonText||"Yorum Yap",i.onclick=n,l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-filter-btn",p.setAttribute("aria-label","Filtrele"),p.setAttribute("aria-haspopup","menu"),p.setAttribute("aria-expanded","false");var x=N&&N.filterIcon||"lines";p.innerHTML=ve(mt(x));var s=document.createElement("div");s.className="renuvex-pr-filter-menu",s.setAttribute("role","menu");var u=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function b(){return r&&r.parentNode||r||null}function m(f,S){if(!(S===!0||!f)){if(f.type==="touchstart"){Hr(b());return}if(f.type==="pointerdown"){var g=f.pointerType||"";g&&g!=="mouse"&&Hr(b());return}}}function y(f){var S=s.classList.contains("renuvex-pr-open");s.classList.remove("renuvex-pr-open"),p.classList.remove("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","false");var g=f&&(f.restoreFocus===!0||f.restoreFocus==="auto"&&nr());if(S&&g)try{p.focus({preventScroll:!0})}catch(w){try{p.focus()}catch(C){}}return S}function c(){h.notifyOpening(),s.classList.add("renuvex-pr-open"),p.classList.add("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","true");var f=s.querySelector(".renuvex-pr-filter-item-active")||s.querySelector(".renuvex-pr-filter-item");f&&requestAnimationFrame(function(){try{f.focus({preventScroll:!0})}catch(S){try{f.focus()}catch(g){}}})}u.forEach(function(f){var S=f[2],g=S?a:!a&&(t||"newest")===f[0],w=document.createElement("button");w.type="button",w.className="renuvex-pr-filter-item"+(g?" renuvex-pr-filter-item-active":""),w.setAttribute("role","menuitem"),w.textContent=f[1];var C=!1;function A(z,k){z&&(z.preventDefault(),z.stopPropagation()),!C&&(C=!0,v=!0,m(z,k),y({restoreFocus:k}),o(f[0],S),setTimeout(function(){C=!1,v=!1},0))}w.addEventListener("pointerdown",function(z){z.button!==void 0&&z.button!==0||z.pointerType!=="mouse"&&A(z,!1)}),typeof window!="undefined"&&!window.PointerEvent&&w.addEventListener("touchstart",function(z){A(z,!1)},{passive:!1}),w.addEventListener("keydown",function(z){(z.key==="Enter"||z.key===" ")&&A(z,!0)}),w.onclick=function(z){A(z,!1)},s.appendChild(w)}),p.onclick=function(){s.classList.contains("renuvex-pr-open")?y({restoreFocus:"auto"}):c()},d.addEventListener("keydown",function(f){f.key==="Escape"&&s.classList.contains("renuvex-pr-open")&&(f.stopPropagation(),y({restoreFocus:!0}))}),d.addEventListener("focusout",function(f){if(s.classList.contains("renuvex-pr-open")&&!v){var S=f.relatedTarget;S&&d.contains(S)||y()}});var h=Cr({trigger:d,element:s,close:y});return d.appendChild(p),d.appendChild(s),l.appendChild(d),l}var Ut=`
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
    font-size:18px;
    font-weight:500;
    color:var(--renuvex-pr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
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
    margin-top:-20px;
    font-size:16px;
    font-weight:400;
    color:var(--renuvex-pr-fwizard-secondary-text, #6b7280);
    line-height:1.4;
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
`;function Vt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content",n.appendChild(o);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var i=X(ke);i&&l.appendChild(i),n.appendChild(l);var d=!1,p=null,x=null,s=!1;function u(){K(a)}function v(g){yr(g,a,p&&p.root)}function b(){if(!d){if(d=!0,document.removeEventListener("keydown",m),a.removeEventListener("click",y),l.removeEventListener("click",b),s)K(x);else{var g=p&&p.root?p.root.activeElement:null;if(g&&typeof g.blur=="function")try{g.blur()}catch(w){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){p?(dr(p.root),p.host&&p.host.parentNode&&p.host.parentNode.removeChild(p.host)):a.parentNode&&a.parentNode.removeChild(a),hr();try{r()}catch(w){}},200)}}function m(g){if(g.key==="Escape"){b();return}v(g)}function y(g){g.target===a&&t&&b()}document.addEventListener("keydown",m),a.addEventListener("click",y),l.addEventListener("click",b);function c(g){x=br(),s=nr(),g&&o.appendChild(g),p=xr(),Me(p.root,_e+Le+Ut),p.root.appendChild(a),Ce(p.root),gr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),u()})}var h=null,f=null;function S(g,w){if(w=w||"error",h){try{h.remove()}catch(C){}h=null}f&&(clearTimeout(f),f=null),h=document.createElement("div"),h.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+w,h.textContent=g,n.appendChild(h),f=setTimeout(function(){h&&(h.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(h){try{h.remove()}catch(C){}h=null}},300))},4e3)}return{open:c,close:b,content:o,setAllowOutsideClose:function(g){t=!!g},setStepAttr:function(g){n.setAttribute("data-step",String(g))},showToast:S}}var Yr=4;function De(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Wt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(o){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Yr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(o){return o!==n})}}}}function qt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},o=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",i.setAttribute("aria-label","Geri"),i.innerHTML=ve(Re)+"<span>Geri</span>",i.addEventListener("click",function(){a()}),l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var p=[],x=0;x<Yr;x++){var s=document.createElement("span");s.className="renuvex-pr-fwizard-progress-seg",d.appendChild(s),p.push(s)}l.appendChild(d);var u=document.createElement("button");u.type="button";var v=null;function b(y){v&&u.removeEventListener("click",v),v=y,y&&u.addEventListener("click",y)}l.appendChild(u);function m(y,c){var h=r.indexOf(y)!==-1,f=t.indexOf(y)!==-1,S=c&&(c.images&&c.images.length>0||c.pendingImages&&c.pendingImages.length>0);if(h)y===2&&S?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",b(function(){o()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",b(function(){n()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(f){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var g=De(y,c);u.disabled=!g,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!g),b(function(){u.disabled||o()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,b(null)}return{el:l,update:function(y,c){p.forEach(function(f,S){S+1<=y?f.classList.add("renuvex-pr-fwizard-progress-seg-active"):f.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var h=y<=1;i.style.visibility=h?"hidden":"",i.style.pointerEvents=h?"none":"",i.tabIndex=h?-1:0,m(y,c)},setNextDisabled:function(y){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!y,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!y))},setThanksState:function(y){i.style.visibility="hidden",d.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),b(y)}}}function Gt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var i=Ke(N||{});be(i);var d=[];function p(y){d.forEach(function(c,h){var f=h<y;c.classList.toggle("renuvex-pr-fwizard-star-active",f),c.setAttribute("aria-checked",h+1===y?"true":"false"),c.innerHTML=f?G("full"):G("outline")})}function x(y){e.set({rating:y}),p(y)}function s(y){var c=d[y-1];if(c)try{c.focus()}catch(h){}}function u(y,c){c&&typeof c.preventDefault=="function"&&c.preventDefault(),c&&typeof c.stopPropagation=="function"&&c.stopPropagation(),!a&&(a=!0,x(y),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var v=1;v<=5;v++)(function(y){var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-star",c.setAttribute("role","radio"),c.setAttribute("aria-label",y+" y\u0131ld\u0131z"),c.innerHTML=G("outline"),c.addEventListener("mouseenter",function(){p(y)}),c.addEventListener("mouseleave",function(){p(e.get().rating)}),c.addEventListener("pointerdown",function(h){h.button&&h.button!==0||u(y,h)}),typeof window!="undefined"&&!window.PointerEvent&&c.addEventListener("touchstart",function(h){u(y,h)},{passive:!1}),c.addEventListener("mousedown",function(h){window.PointerEvent||u(y,h)}),c.addEventListener("keydown",function(h){if(h.key==="Enter"||h.key===" "){u(y,h);return}var f=0;h.key==="ArrowRight"||h.key==="ArrowUp"?f=Math.min(5,y+1):h.key==="ArrowLeft"||h.key==="ArrowDown"?f=Math.max(1,y-1):h.key==="Home"?f=1:h.key==="End"&&(f=5),f&&(h.preventDefault(),x(f),s(f))}),c.addEventListener("click",function(h){u(y,h)}),d.push(c),l.appendChild(c)})(v);p(e.get().rating);var b=null,m=function(y){var c=y&&y.detail&&y.detail.settings;c&&c===b||(b=c||null,i=Ke(c||N||{}),p(e.get().rating))};return window.addEventListener(Ee,m),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Ee,m)}}}var Xt=3,Ba=10*1024*1024;function Kt(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-photo-add",i.setAttribute("aria-label","Foto\u011Fraf ekle");var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",l.appendChild(i),l.appendChild(d);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),l.appendChild(p),a.appendChild(l);var x=r.revokeBlobUrl||function(h){h&&typeof h=="string"&&h.startsWith("blob:")&&URL.revokeObjectURL(h)},s=r.blobMap||{},u=r.urlToFinger||{};function v(){if(!t){var h=e.get().images||[],f=e.get().pendingImages||[],S=h.map(function(g){return{url:g,isPending:!1}}).concat(f.map(function(g){return{url:g.url,file:g.file,isPending:!0,error:g.error}}));p.innerHTML="",S.forEach(function(g){var w=s[g.url]||g.url,C=b(g,w);p.appendChild(C)}),y()}}function b(h,f){var S=document.createElement("div");S.className="renuvex-pr-fwizard-photo-thumb";var g=document.createElement("img");g.src=f,g.alt="",g.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",S.appendChild(g);var w=document.createElement("div");w.className="renuvex-pr-fwizard-photo-loading",w.style.display="none",S.appendChild(w);var C=document.createElement("button");C.type="button",C.className="renuvex-pr-fwizard-photo-remove",C.setAttribute("aria-label","Kald\u0131r");var A=X(ke);return A&&C.appendChild(A),S.appendChild(C),m(S,h,f),S}function m(h,f,S){var g=h.querySelector("img");g.src!==S&&(g.src=S);var w=h.querySelector(".renuvex-pr-fwizard-photo-loading");if(f.isPending&&f.error){w.style.display="flex",w.textContent="";var C=document.createElement("span");C.className="renuvex-pr-upload-error",C.textContent="\u2717 "+f.error,w.appendChild(C)}else w.style.display="none",w.textContent="";var A=h.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var z=u[f.url]||(f.file?f.file.name+"_"+f.file.size:null),k=s[f.url],L={};z&&(L.fingerprints=(e.get().fingerprints||[]).filter(function(T){return T!==z})),f.isPending?L.pendingImages=(e.get().pendingImages||[]).filter(function(T){return T.url!==f.url}):L.images=(e.get().images||[]).filter(function(T){return T!==f.url}),e.set(L),x(f.url),x(k),delete u[f.url],k&&delete u[k],s[f.url]&&delete s[f.url]}}function y(){var h=(e.get().images||[]).length,f=(e.get().pendingImages||[]).length,S=h+f,g=S>=Xt;S>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ve(gt)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ve(ft)+"<span>Foto\u011Fraf Ekle</span>"),g?(i.style.display="none",i.disabled=!0,d.disabled=!0):(i.style.display="flex",i.disabled=!1,d.disabled=!1,i.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}i.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(h){var f=(e.get().images||[]).length+(e.get().pendingImages||[]).length,S=Array.from(h.target.files).slice(0,Xt-f);d.value="";var g=(e.get().pendingImages||[]).length,w=e.get().images||[],C=w.length;if(S.length!==0){for(var A=[],z=[],k=0;k<S.length;k++){var L=S[k],T=L.name+"_"+L.size,E=(e.get().fingerprints||[]).some(function(D){return D===T})||A.some(function(D){return D.file.name+"_"+D.file.size===T});if(!E){if(L.size>Ba){var P="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(P,"error"):alert(P);continue}var B=URL.createObjectURL(L);u[B]=T,A.push({url:B,file:L,error:null}),z.push({url:B,file:L});var j=(e.get().fingerprints||[]).slice();j.push(T),e.set({fingerprints:j})}}if(A.length!==0){var F=(e.get().pendingImages||[]).concat(A),U=async function(){for(var D=0;D<z.length;D++){var J=z[D],W=J.file,R=J.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var ue=(e.get().pendingImages||[]).filter(function(M){return M.url!==R}),ae=(e.get().images||[]).slice();ae.push(R),e.set({pendingImages:ue,images:ae});continue}try{var ze=await Je(Xe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Ge})});if(!ze.ok)throw ze.status===429?new Error("rate_limit"):new Error("sign failed");var ne=await ze.json();if(!ne.folder)throw new Error("sign folder missing");var I=new FormData;I.append("file",W),I.append("api_key",ne.api_key),I.append("timestamp",ne.timestamp),I.append("signature",ne.signature),I.append("folder",ne.folder);var ge=await fetch("https://api.cloudinary.com/v1_1/"+ne.cloud_name+"/image/upload",{method:"POST",body:I}),O=await ge.json();if(O.secure_url&&yt(O.secure_url)){var rr=(e.get().pendingImages||[]).some(function(M){return M.url===R});if(!rr)continue;s[O.secure_url]=R,u[O.secure_url]=u[R];var Se=(e.get().pendingImages||[]).filter(function(M){return M.url!==R}),_=(e.get().images||[]).slice();_.push(O.secure_url),e.set({pendingImages:Se,images:_});try{Je(Xe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Ge,secureUrl:O.secure_url})}).catch(function(){})}catch(M){}}else throw new Error("invalid image url")}catch(M){console.error("[renuvex-pr] Image upload failed:",M);var Z=M.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Z,"error");var $=(e.get().pendingImages||[]).map(function(de){return de.url===R?{url:de.url,file:de.file,error:Z}:de});e.set({pendingImages:$})}}};if(C===0&&g===0){t=!0;var te=!r.canNavigate||r.canNavigate();te&&e.goNext()}e.set({pendingImages:F}),U()}}};var c=e.onChange(v);return v(),{el:a,destroy:function(){t=!0,d.onchange=null,c&&c()}}}var Dr=2e3,_a=60;function Jt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=_a,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),o.appendChild(l);var i=document.createElement("textarea");i.className="renuvex-pr-fwizard-textarea",i.placeholder="Deneyiminizi anlat\u0131n\u2026",i.maxLength=Dr,i.rows=6,i.setAttribute("aria-label","Yorum"),i.value=e.get().comment||"",o.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),o.appendChild(d);function p(){var s=i.value.length;d.textContent=s+"/"+Dr,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",s>=Dr)}function x(){return De(3,e.get())}return i.addEventListener("input",function(){e.set({comment:i.value}),p(),t(x())}),a.appendChild(o),p(),setTimeout(function(){t(x())},0),{el:a,destroy:function(){}}}var Ma=40;function Zt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",n.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var i=document.createElement("div");i.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.maxLength=Ma,p.setAttribute("aria-required","true"),p.value=e.get().author||"",i.appendChild(d),i.appendChild(p),l.appendChild(i);var x=document.createElement("div");x.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",x.appendChild(s),x.appendChild(u),l.appendChild(x);var v=document.createElement("div");v.className="renuvex-pr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(v);var b=document.createElement("div");b.className="renuvex-pr-fwizard-msg",b.setAttribute("role","alert"),b.setAttribute("aria-live","assertive"),l.appendChild(b);var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-submit-btn",m.textContent="G\xF6nder",l.appendChild(m),n.appendChild(l);function y(){return De(4,e.get())}function c(){var g=!y(),w=(e.get().pendingImages||[]).length,C=w>0;C?(m.disabled=!0,m.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),m.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(m.disabled=g,m.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",g),m.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),c(),t(y())}),u.addEventListener("input",function(){e.set({email:u.value})}),c(),setTimeout(function(){t(y())},0);function h(){b.textContent=""}function f(g){h();var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg-error",w.textContent=g||"",b.appendChild(w)}m.onclick=async function(){if(!m.disabled){var g=e.get(),w=(g.author||"").trim(),C=(g.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!w){f("Gerekli alan");return}if(!g.rating){f("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}m.disabled=!0,m.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=m.textContent;if(m.textContent="G\xF6nderiliyor\u2026",h(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var z=ht(window.location.href),k=g.productName||null,L=await Je(Xe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Ge,productId:g.productId||null,slug:z||null,productName:k,author:w,title:(g.title||"").trim()||null,comment:C||null,rating:g.rating,images:g.images||[]})},15e3);if(L.ok)a();else{var T=await L.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(B){var E=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),P=E?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):f(P),m.disabled=!1,m.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),m.textContent=A}}};var S=e.onChange(c);return{el:n,destroy:function(){m.onclick=null,S&&S()}}}function Fa(e,r,t){if(t=t||{},e===1)return Gt(r,{canNavigate:t.canNavigate});if(e===2)return Kt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Jt(r,{onValidityChange:t.onValidityChange});if(e===4)return Zt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function $t(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Qt(e){e=e||{};var r=Wt({productId:e.productId,productName:e.productName}),t={},a={},n={};function o(z){if(!(!z||typeof z!="string"||!z.startsWith("blob:")||n[z])){n[z]=!0;try{URL.revokeObjectURL(z)}catch(k){}}}function l(){Object.keys(a).forEach(function(k){o(k)}),Object.keys(t).forEach(function(k){o(t[k])});var z=r.get();(z.pendingImages||[]).forEach(function(k){o(k&&k.url)}),(z.images||[]).forEach(function(k){o(k)})}var i=Vt({onClose:function(){window.removeEventListener("popstate",p),zr(d),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=wr(),p=function(z){i&&i.close&&i.close()};window.addEventListener("popstate",p);var x=document.createElement("div");x.className="renuvex-pr-fwizard-step-wrap";var s=qt({skippableSteps:[2],nextableSteps:[3],onBack:function(){b==="idle"&&r.goBack()},onSkip:function(){b==="idle"&&r.goNext()},onNext:function(){b==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="renuvex-pr-fwizard-layout",u.appendChild(x),u.appendChild(s.el);var v=null,b="idle",m=null,y=!0,c=null;function h(z,k){x.innerHTML="";var L=Fa(z,r,{canNavigate:function(){return b==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:o,onValidityChange:function(P){s.setNextDisabled(!P)},onSuccess:S,showToast:i.showToast});if(v=L,s.update(z,r.get()),k){b="entering",L.el.classList.add("renuvex-pr-fwizard-step--enter");var T=null,E=function(){T&&clearTimeout(T),L.el.removeEventListener("animationend",E),L.el.classList.remove("renuvex-pr-fwizard-step--enter"),b="idle",m!==null&&g()};L.el.addEventListener("animationend",E),T=setTimeout(E,700)}else b="idle";x.appendChild(L.el),i.setStepAttr&&i.setStepAttr(z),z===3&&s.setNextDisabled(!0)}var f=!1;function S(){if(!f){if(f=!0,!v){x.innerHTML="";var z=$t();z.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(z),i.setStepAttr("thanks"),s.setThanksState(i.close);return}var k=v;b="exiting",k.el.classList.add("renuvex-pr-fwizard-step--exit");var L=function(){if(c&&clearTimeout(c),k.el.removeEventListener("animationend",L),k.destroy)try{k.destroy()}catch(E){}v===k&&(v=null),x.innerHTML="";var T=$t();T.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(T),i.setStepAttr("thanks"),s.setThanksState(i.close),b="idle"};k.el.addEventListener("animationend",L),c=setTimeout(L,300)}}function g(){var z=r.get().currentStep;if(b!=="idle"){m=z;return}if(!v){var k=!y;y=!1,h(z,k);return}var L=v;b="exiting",L.el.classList.add("renuvex-pr-fwizard-step--exit");var T=function(){if(c&&clearTimeout(c),L.el.removeEventListener("animationend",T),L.destroy)try{L.destroy()}catch(P){}if(v===L){x.innerHTML="",v=null;var E=m!==null?m:r.get().currentStep;m=null,h(E,!0),b="idle"}};L.el.addEventListener("animationend",T),c=setTimeout(T,350)}g();var w=r.get().currentStep,C=r.onChange(function(z){z.currentStep!==w?(w=z.currentStep,g()):s.update(z.currentStep,z)}),A=i.close;return i.close=function(){C&&C(),typeof c!="undefined"&&c&&clearTimeout(c),A()},i.open(u),{close:i.close}}function Y(){Qt({productId:H||"",productName:Pe||""})}var ea=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Oa={id:"classic",name:"Klasik (A\xE7\u0131k)"},Ha=ea;function Ya(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,x=e.currentHasImages,s=e.onFilterChange,u=e.onSortChange;be(n);var v=document.createElement("div");v.className="renuvex-pr-summary";var b=(l[3]||0)+(l[4]||0),m=o>0?Math.round(b/o*100):0,y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-avg",y.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+G("full")+'</span><span class="renuvex-pr-avg-num">'+i+"</span>",v.appendChild(y);var c=document.createElement("div");if(c.className="renuvex-pr-summary-block renuvex-pr-summary-count",c.textContent=o.toLocaleString("tr-TR")+" Yorum",v.appendChild(c),a.showRecommendation!==!1&&m>0){var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",h.innerHTML='<span class="renuvex-pr-recommend-pct">%'+m+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(h)}return v.appendChild(He({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:s})),v.appendChild(re({widget:r,currentOrderBy:p,currentHasImages:x,onWriteClick:Y,onSortChange:u})),v}var Ur={};he(Ur,{css:()=>ja,meta:()=>Da,render:()=>qa});var ra=`
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
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:0;cursor:pointer;
    font-family:inherit;color:inherit;flex:0 0 auto;
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
  .renuvex-pr-compact-trigger-text{
    font-size:var(--renuvex-pr-compact-count-size,16px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-weight:500;white-space:nowrap;
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
    .renuvex-pr-compact-actions-slot .renuvex-pr-write-btn{display:none;}
    .renuvex-pr-compact-write-row{display:flex;width:100%;}

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
`;var Da={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},ja=ra,Ua="__unknown_product__",Qe=Object.create(null);function Va(e){return e?String(e):Ua}var Ae=null,er=null;function Wa(){!Ae||!er||(Ae.removeEventListener?Ae.removeEventListener("change",er):Ae.removeListener&&Ae.removeListener(er),Ae=null,er=null)}function qa(e){var r=e.widget,t=e.productId,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,p=e.currentOrderBy,x=e.currentHasImages,s=e.onFilterChange,u=e.onSortChange,v=Va(t),b=document.createElement("div");b.className="renuvex-pr-summary renuvex-pr-summary-compact";var m=document.createElement("div");m.className="renuvex-pr-compact-header";var y=document.createElement("div");y.className="renuvex-pr-compact-trigger-wrap";var c=document.createElement("button");c.className="renuvex-pr-compact-trigger",c.type="button",c.setAttribute("aria-expanded","false"),c.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Ie(i,n)+'</span><span class="renuvex-pr-compact-trigger-text">'+o.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+ve(xt)+"</span>",y.appendChild(c),m.appendChild(y);var h=re({widget:r,currentOrderBy:p,currentHasImages:x,onWriteClick:Y,onSortChange:u}),f=h.querySelector(".renuvex-pr-filter-wrap"),S=h.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");g.className="renuvex-pr-compact-actions-slot",S&&g.appendChild(S),f&&g.appendChild(f),m.appendChild(g),b.appendChild(m);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),w.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="renuvex-pr-compact-panel-inner";var A=document.createElement("div");A.className="renuvex-pr-compact-avg",A.innerHTML='<span class="renuvex-pr-icon">'+G("full")+"</span><span>"+i+"</span>",C.appendChild(A),C.appendChild(He({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:function(R){k()&&w.classList.contains("renuvex-pr-open")&&(Qe[v]=!0),s(R)}})),w.appendChild(C);var z=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function k(){return!!(z&&z.matches)}function L(R){R?w.classList.add("renuvex-pr-open"):w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden",R?"false":"true"),c.setAttribute("aria-expanded",R?"true":"false")}function T(R){var ue=R?b:y;if(w.parentNode!==ue){var ae=!!w.parentNode;w.classList.contains("renuvex-pr-open")&&L(!1),ae&&(Qe[v]=!1),ue.appendChild(w)}}if(T(z?z.matches:!1),S){var E=document.createElement("button");E.className="renuvex-pr-write-btn",E.textContent=N&&N.writeButtonText||"Yorum Yap",E.onclick=Y;var P=document.createElement("div");P.className="renuvex-pr-compact-write-row",P.appendChild(E),b.appendChild(P)}function B(){var R=w.classList.contains("renuvex-pr-open");return L(!1),k()&&(Qe[v]=!1),R}function j(){F&&F.notifyOpening(),L(!0),k()&&(Qe[v]=!0)}c.onclick=function(){w.classList.contains("renuvex-pr-open")?B():j()};var F=null;function U(R){F&&(F.unregister(),F=null),R||(F=Cr({trigger:y,element:w,close:B}))}if(U(z?z.matches:!1),Wa(),z){var te=function(R){T(R.matches),U(R.matches)};z.addEventListener?z.addEventListener("change",te):z.addListener&&z.addListener(te),Ae=z,er=te}if(k()&&Qe[v]&&L(!0),a.showRecommendation!==!1){var D=(l[3]||0)+(l[4]||0),J=o>0?Math.round(D/o*100):0;if(J>0){var W=document.createElement("div");W.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",W.style.marginTop="8px",W.innerHTML='<span class="renuvex-pr-recommend-pct">%'+J+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",C.appendChild(W)}}return b}var Vr={};he(Vr,{css:()=>Xa,meta:()=>Ga,render:()=>Ka});var ta=`
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
`;var Ga={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Xa=ta;function Ka(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,p=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange;be(a);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var v=document.createElement("div");v.className="renuvex-pr-split-col renuvex-pr-split-left";var b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",b.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+G("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",v.appendChild(b);var m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",m.textContent=n.toLocaleString("tr-TR")+" Yorum",v.appendChild(m),u.appendChild(v);var y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-mid",y.appendChild(He({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:x})),u.appendChild(y);var c=re({widget:r,currentOrderBy:d,currentHasImages:p,onWriteClick:Y,onSortChange:s}),h=c.querySelector(".renuvex-pr-filter-wrap"),f=c.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");S.className="renuvex-pr-split-col renuvex-pr-split-right",f&&S.appendChild(f),h&&S.appendChild(h),u.appendChild(S);var g=(o[3]||0)+(o[4]||0),w=n>0?Math.round(g/n*100):0,C=document.createElement("div");C.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",C.innerHTML='<span class="renuvex-pr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||w===0;return A&&C.classList.add("renuvex-pr-split-rec-hidden"),v.appendChild(C),u}var Wr={};he(Wr,{css:()=>Za,meta:()=>Ja,render:()=>$a});var aa=`
  .renuvex-pr-title-minimal{text-align:left;}

  .renuvex-pr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px;
  }

  .renuvex-pr-minimal-info{
    display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;
  }
  .renuvex-pr-minimal-row{
    display:flex;align-items:center;gap:8px;
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
    font-size:var(--renuvex-pr-recommend-size,14px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;
  }

  .renuvex-pr-minimal-actions{
    display:flex;align-items:center;gap:var(--renuvex-pr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .renuvex-pr-summary-minimal{
      flex-wrap:wrap;gap:12px;
    }
    .renuvex-pr-minimal-info{flex:1 1 auto;}
    .renuvex-pr-minimal-actions{flex:0 0 auto;}
    /* Filter info'nun yaninda kalir (sag ust kose), Yorum Yap full-genislik
       alta tek basina duser. Hero ve minimal'in kompakt karakterine uygun. */
    .renuvex-pr-minimal-actions .renuvex-pr-write-btn{display:none;}
    .renuvex-pr-minimal-write-row{display:flex;width:100%;}
    .renuvex-pr-minimal-write-row .renuvex-pr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .renuvex-pr-minimal-write-row{display:none;}
  }
`;var Ja={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Za=aa;function $a(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var p=document.createElement("div");p.className="renuvex-pr-minimal-info";var x=document.createElement("div");x.className="renuvex-pr-minimal-row";var s=document.createElement("span");s.className="renuvex-pr-minimal-avg",s.textContent=n,x.appendChild(s);var u=document.createElement("span");u.className="renuvex-pr-minimal-stars",u.innerHTML=Ie(n,t),x.appendChild(u);var v=document.createElement("span");v.className="renuvex-pr-minimal-count",v.textContent=a.toLocaleString("tr-TR")+" Yorum",x.appendChild(v),p.appendChild(x),d.appendChild(p);var b=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),m=b.querySelector(".renuvex-pr-filter-wrap"),y=b.querySelector(".renuvex-pr-write-btn"),c=document.createElement("div");if(c.className="renuvex-pr-minimal-actions",y&&c.appendChild(y),m&&c.appendChild(m),d.appendChild(c),y){var h=document.createElement("button");h.className="renuvex-pr-write-btn",h.textContent=N&&N.writeButtonText||"Yorum Yap",h.onclick=Y;var f=document.createElement("div");f.className="renuvex-pr-minimal-write-row",f.appendChild(h),d.appendChild(f)}return d}var qr={};he(qr,{css:()=>en,meta:()=>Qa,render:()=>rn});var na=`
  .renuvex-pr-title-hero{text-align:left;}

  .renuvex-pr-summary-hero{
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
    display:flex;flex-direction:row;align-items:center;gap:8px;
  }
  .renuvex-pr-hero-avg{
    font-size:var(--renuvex-pr-hero-avg-size,90px);
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
    font-size:var(--renuvex-pr-recommend-size,14px);
    color:var(--renuvex-pr-header-count,var(--renuvex-pr-text,rgba(0,0,0,0.6)));
    font-weight:400;line-height:1;
  }

  .renuvex-pr-hero-actions{
    display:flex;align-items:center;gap:var(--renuvex-pr-col-gap,8px);flex:0 0 auto;
  }
  .renuvex-pr-hero-desktop-only{display:flex;}

  @media(max-width:600px){
    .renuvex-pr-summary-hero{
      flex-wrap:wrap;gap:16px;
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
`;var Qa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},en=na;function rn(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var p=document.createElement("div");p.className="renuvex-pr-hero-info";var x=document.createElement("div");x.className="renuvex-pr-hero-rating-col";var s=document.createElement("span");s.className="renuvex-pr-hero-avg",s.textContent=n,x.appendChild(s);var u=document.createElement("div");u.className="renuvex-pr-hero-meta-row";var v=document.createElement("span");v.className="renuvex-pr-hero-stars",v.innerHTML=Ie(n,t),u.appendChild(v);var b=document.createElement("div");b.className="renuvex-pr-hero-count",b.textContent=a.toLocaleString("tr-TR")+" Yorum",u.appendChild(b),x.appendChild(u),p.appendChild(x),d.appendChild(p);var m=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),y=m.querySelector(".renuvex-pr-filter-wrap"),c=m.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");h.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",c&&h.appendChild(c),y&&h.appendChild(y),d.appendChild(h);var f=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),S=f.querySelector(".renuvex-pr-filter-wrap"),g=f.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");return w.className="renuvex-pr-hero-write-row",g&&w.appendChild(g),S&&w.appendChild(S),d.appendChild(w),d}var ia=`
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
`;var kr={classic:jr,compact:Ur,split:Vr,minimal:Wr,hero:qr};function Er(e){return kr[e]||kr.classic}function oa(){var e=Object.keys(kr).map(function(r){return kr[r].css||""}).join(`
`);return ia+`
`+e}var Gr={};he(Gr,{css:()=>an,meta:()=>tn,render:()=>nn});function je(e,r,t){var a=t||{},n=document.createDocumentFragment(),o=document.createElement("div");o.className=r+" renuvex-pr-body-clamped",o.textContent=e,n.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-body-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:o,readMore:l}}function Ue(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",o.textContent=e,t.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-reply-text-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var la=`
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

  @media(max-width:600px){
    .renuvex-pr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    .renuvex-pr-review .renuvex-pr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .renuvex-pr-review .renuvex-pr-gallery::-webkit-scrollbar{display:none;}
    .renuvex-pr-review .renuvex-pr-img{flex-shrink:0;}
  }
`;var tn={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},an=la;function nn(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var o=document.createElement("span");o.className="renuvex-pr-review-stars",o.innerHTML=ce(e.rating,N),n.appendChild(o);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-title",i.textContent=e.title,t.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var p=(e.comment||"").trim();p&&t.appendChild(je(p,"renuvex-pr-body").fragment);var x=ye(e);if(x.length){var s=document.createElement("div");s.className="renuvex-pr-gallery",x.forEach(function(v){var b=document.createElement("img"),m=ie(v,V);b.src=m.src,b.srcset=m.srcset,b.loading="lazy",b.decoding="async",b.width=V,b.height=V,b.className="renuvex-pr-img",oe(b),b.setAttribute("data-renuvex-img-url",v),(function(y){we(b,function(){pe(e,y,r)})})(v),s.appendChild(b)}),t.appendChild(s)}var u=Ue(e.merchantReply);return u&&t.appendChild(u),t}var Xr={};he(Xr,{css:()=>ln,meta:()=>on,render:()=>pn});var pa=`
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
`;var on={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},ln=pa;function pn(e,r){var t=ye(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=ce(e.rating,N),o.appendChild(l);var i=document.createElement("span");i.className="renuvex-pr-review-list-author-name",i.textContent=e.author||"",o.appendChild(i);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=me(e.createdAt),o.appendChild(d),n.appendChild(o);var p=document.createElement("div");if(p.className="renuvex-pr-review-list-content",e.title){var x=document.createElement("div");x.className="renuvex-pr-review-list-title",x.textContent=e.title,p.appendChild(x)}var s=(e.comment||"").trim();s&&p.appendChild(je(s,"renuvex-pr-review-list-body").fragment);var u=Ue(e.merchantReply);if(u&&p.appendChild(u),n.appendChild(p),a){var v=document.createElement("div");v.className="renuvex-pr-review-list-media",t.forEach(function(b){var m=document.createElement("img"),y=ie(b,V);m.src=y.src,m.srcset=y.srcset,m.loading="lazy",m.decoding="async",m.width=V,m.height=Math.round(V*4/3),m.setAttribute("data-renuvex-img-url",b),oe(m),(function(c){we(m,function(){pe(e,c,r)})})(b),v.appendChild(m)}),n.appendChild(v)}return n}var Kr={};he(Kr,{css:()=>dn,meta:()=>un,render:()=>sn});var ua=`
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
`;var un={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},dn=ua;function sn(e,r){var t=vr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=ce(e.rating,N),o.appendChild(l),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-gallery-title",i.textContent=e.title,o.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",o.appendChild(d);var p=document.createElement("time");p.className="renuvex-pr-review-gallery-date",p.style.display="block",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=me(e.createdAt),o.appendChild(p);var x=(e.comment||"").trim();if(x&&o.appendChild(je(x,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){pe(e,t,r)}}:null).fragment),n.appendChild(o),a){var s=document.createElement("div");s.className="renuvex-pr-review-gallery-media";var u=document.createElement("img"),v=ie(t,cr);u.src=v.src,u.srcset=v.srcset,u.loading="lazy",u.decoding="async",u.width=cr,u.height=Math.round(cr*4/3),oe(u),u.setAttribute("data-renuvex-img-url",t),we(u,function(){pe(e,t,r)}),s.appendChild(u),n.appendChild(s)}var b=Ue(e.merchantReply,t?function(){pe(e,t,r)}:null);return b&&(b.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(b)),n}var Tr={card:Gr,list:Xr,gallery:Kr};function Ar(e){return Tr[e]||Tr.card}function da(){return Object.keys(Tr).map(function(e){return Tr[e].css||""}).join(`
`)}var Jr=0;function Ve(){return Jr++,Jr}function We(e,r){return e!==Jr?!1:r?!(r.productId!==void 0&&H!==r.productId||r.orderBy!==void 0&&q!==r.orderBy||r.page!==void 0&&ir!==r.page||r.ratingFilter!==void 0&&Q!==r.ratingFilter||r.hasImages!==void 0&&ee!==r.hasImages):!0}var Zr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},$r={small:80,medium:110,large:140};function sa(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var o=document.createElementNS(t,"line");o.setAttribute("x1","1"),o.setAttribute("y1","1"),o.setAttribute("x2","23"),o.setAttribute("y2","23"),a.appendChild(n),a.appendChild(o);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var i=document.createElement("div");return i.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",i.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(i),r}function va(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function fe(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),o=parseInt(t[3],16);return"rgba("+a+","+n+","+o+","+r+")"}function Lr(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Qr(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function ca(e){return .2126*Qr(e.r)+.7152*Qr(e.g)+.0722*Qr(e.b)}function ma(e,r){var t=ca(e),a=ca(r),n=Math.max(t,a),o=Math.min(t,a);return(n+.05)/(o+.05)}function vn(e){var r=Lr(e)||Lr("#ffffff"),t=Lr("#111111"),a=Lr("#ffffff");return ma(t,r)>=ma(a,r)?"#111111":"#ffffff"}function cn(e){return fe(e,e==="#ffffff"?.1:.06)}function xa(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",i=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",p=fe(l,.06),x=r.reviewStarColor||"#f59e0b",s=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",b=r.filterBtnBgColor||"#111111",m=r.filterBtnTextColor||"#ffffff",y=r.filterBtnBorderColor||"#111111",c=r.filterMenuBgColor||"#ffffff",h=r.filterMenuBorderColor||"#e5e7eb",f=r.filterItemTextColor||"#111111",S=r.filterItemHoverBgColor||"#f3f4f6",g=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",C=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",z=r.reviewBodyColor||"#111111",k=r.reviewBorderColor||"#e5e7eb",L=fe(z,.65),T=r.replyBgColor||"#f9fafb",E=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",B=r.replyTextColor||"#111111",j=r.photoTitleColor||"#111111",F=fe("#111111",.05),U=r.photoArrowBgColor||"#ffffff",te=r.photoArrowTextColor||"#111111",D=fe("#111111",.12),J=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",R=r.formSecondaryTextColor||"#3b3b3b",ue=r.inputTextColor||W,ae=r.inputBorderColor||"#d1d5db",ze=r.placeholderColor||"#9ca3af",ne=r.formStepBarColor||"#111111",I=r.formBtnBgColor||"#111111",ge=r.formBtnTextColor||"#ffffff",O=r.formBtnBorderColor||"#111111",rr=fe(I,.06),Se=fe(I,.18),_=fe(ge,.85),Z=fe(W,.06),$=vn(J),M=cn($),de=r.loadMoreBgColor||"#ffffff",tr=r.loadMoreTextColor||"#111111",ar=r.loadMoreBorderColor||"#111111",se={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":o,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":i,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":p,"--renuvex-pr-btn-bg":s,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":v,"--renuvex-pr-filter-btn-bg":b,"--renuvex-pr-filter-btn-text":m,"--renuvex-pr-filter-btn-border":y,"--renuvex-pr-filter-menu-bg":c,"--renuvex-pr-filter-menu-border":h,"--renuvex-pr-filter-item-text":f,"--renuvex-pr-filter-item-hover-bg":S,"--renuvex-pr-filter-item-active":g,"--renuvex-pr-review-title":w,"--renuvex-pr-review-author":C,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":z,"--renuvex-pr-review-border":k,"--renuvex-pr-state-text":L,"--renuvex-pr-review-star-color":x,"--renuvex-pr-reply-bg-color":T,"--renuvex-pr-reply-border":E,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":B,"--renuvex-pr-photo-title":j,"--renuvex-pr-photo-image-border":F,"--renuvex-pr-photo-arrow-bg":U,"--renuvex-pr-photo-arrow-text":te,"--renuvex-pr-photo-arrow-border":D,"--renuvex-pr-fwizard-bg":J,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":R,"--renuvex-pr-fwizard-input-bg":J,"--renuvex-pr-fwizard-input-text":ue,"--renuvex-pr-fwizard-input-border":ae,"--renuvex-pr-fwizard-placeholder":ze,"--renuvex-pr-fwizard-close-text":$,"--renuvex-pr-fwizard-close-hover-bg":M,"--renuvex-pr-fwizard-progress-bg":Z,"--renuvex-pr-fwizard-progress-active":ne,"--renuvex-pr-fwizard-btn-bg":I,"--renuvex-pr-fwizard-btn-text":ge,"--renuvex-pr-fwizard-btn-border":O,"--renuvex-pr-fwizard-btn-disabled-bg":Se,"--renuvex-pr-fwizard-btn-disabled-text":_,"--renuvex-pr-fwizard-nav-hover-bg":rr,"--renuvex-pr-load-more-bg":de,"--renuvex-pr-load-more-text":tr,"--renuvex-pr-load-more-border":ar};Object.keys(se).forEach(function(qe){e.style.setProperty(qe,se[qe])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function fa(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,o=e.wireLightboxTrigger,l=(e.photoStripReviews||[]).filter(function(S){return ye(S).length>0});if(!(r.showPhotoGallery!==!1&&!a&&l.length>0))return null;var i=document.createElement("div");if(i.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var d=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",p=document.createElement("div");p.className="renuvex-pr-photo-title",p.textContent=d,i.appendChild(p)}var x=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",x);var s=document.createElement("div");s.className="renuvex-pr-photo-strip";var u=V,v=r.reviewLayout==="card"?V:Math.round(V*4/3),b=0;l.forEach(function(S){if(!(b>=15)){var g=vr(S);if(g){var w=document.createElement("img"),C=ie(g,V);w.src=C.src,w.srcset=C.srcset,w.loading=b<3?"eager":"lazy",w.decoding="async",w.width=u,w.height=v,w.className="renuvex-pr-photo-strip-thumb",w.alt="Yorum foto\u011Fraf\u0131",oe(w),(function(A,z){o(w,function(){n(z,A,l)})})(g,S),s.appendChild(w),b++}}});var m=document.createElement("button");m.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var y=X(Re);y&&m.appendChild(y),m.setAttribute("aria-label","\xD6nceki"),m.onclick=function(){s.scrollBy({left:-200,behavior:"smooth"})};var c=document.createElement("button");c.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var h=X(sr);h&&c.appendChild(h),c.setAttribute("aria-label","Sonraki"),c.onclick=function(){s.scrollBy({left:200,behavior:"smooth"})};var f=document.createElement("div");return f.className="renuvex-pr-photo-strip-wrap",f.appendChild(m),f.appendChild(s),f.appendChild(c),i.appendChild(f),i}function ga(e){var r=e.render;async function t(){var o=Ve(),l=H,i=q,d=Q,p=ee,x=await Be(H,q,1,Q,ee);We(o,{productId:l,orderBy:i,ratingFilter:d,hasImages:p})&&await r(H,N,x,Pe,q,1,rt)}async function a(o){var l=Ve(),i=Q===o?null:o,d=H,p=q,x=ee;at(i),Ne(1);var s=await Be(H,q,1,i,ee);We(l,{productId:d,orderBy:p,page:1,ratingFilter:i,hasImages:x})&&await r(H,N,s,Pe,q,1)}async function n(o,l){var i=Ve(),d=H,p=Q;Ne(1);var x=o,s=!1;l&&(s=!0,x="newest"),nt(s),or(x);var u=await Be(H,x,1,Q,s);We(i,{productId:d,orderBy:x,page:1,ratingFilter:p,hasImages:s})&&await r(H,N,u,Pe,x,1)}return{onRetry:t,onFilterChange:a,onSortChange:n}}function mn(){return Ct()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function xn(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=zt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),St(t,{surface:"reviews",productId:r||""}),t}async function et(e,r,t,a,n,o,l){if(ct){ur({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:o,badgeSettings:l});return}pr(!0),it(e),ot(r),l!==void 0&&lt(l),pt(a),n&&or(n),o&&Ne(o),t!=null&&ut(t);var i=ga({render:et});try{let Se=function(_,Z){if(!(!_||!_.meta||!_.meta.sizeOverrides)){var $=_.meta.sizeOverrides[Z];$&&Object.keys($).forEach(function(M){v.style.setProperty(M,$[M])})}};var rr=Se,d=Er(r.summaryLayout),p=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),x=r.showTitle!==!1,s=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",u=p&&x?s:"",v=document.documentElement;xa(v,r);var b=r.borderRadius!==void 0?r.borderRadius:8,m=Zr[r.size]||Zr.medium,y=$r[r.thumbnailSize]||$r.medium;v.style.setProperty("--renuvex-pr-title-size",m.titleSize+"px"),v.style.setProperty("--renuvex-pr-review-text-size",m.reviewTextSize+"px"),v.style.setProperty("--renuvex-pr-review-title-size",m.reviewTitleSize+"px"),v.style.setProperty("--renuvex-pr-author-size",m.authorSize+"px"),v.style.setProperty("--renuvex-pr-reply-name-size",m.replyNameSize+"px"),v.style.setProperty("--renuvex-pr-reply-text-size",m.replyTextSize+"px"),v.style.setProperty("--renuvex-pr-radius",b+"px"),v.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,b-4)+"px"),v.style.setProperty("--renuvex-pr-photo-title-size",m.photoTitleSize+"px"),v.style.setProperty("--renuvex-pr-avg-rating-size",m.avgRatingSize+"px"),v.style.setProperty("--renuvex-pr-review-count-size",m.reviewCountSize+"px"),v.style.setProperty("--renuvex-pr-compact-count-size",m.compactCountSize+"px"),v.style.setProperty("--renuvex-pr-recommend-size",m.recommendSize+"px"),v.style.setProperty("--renuvex-pr-btn-text-size",m.btnTextSize+"px"),v.style.setProperty("--renuvex-pr-bar-label-size",m.barLabelSize+"px"),v.style.setProperty("--renuvex-pr-minimal-avg-size",m.minimalAvgSize+"px"),v.style.setProperty("--renuvex-pr-hero-avg-size",m.heroAvgSize+"px"),v.style.setProperty("--renuvex-pr-bar-count-size",m.barCountSize+"px"),v.style.setProperty("--renuvex-pr-review-date-size",m.reviewDateSize+"px"),v.style.setProperty("--renuvex-pr-filter-text-size",m.filterTextSize+"px"),v.style.setProperty("--renuvex-pr-load-more-size",m.loadMoreSize+"px"),v.style.setProperty("--renuvex-pr-read-more-size",m.readMoreSize+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size",y+"px");var c=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";v.style.setProperty("--renuvex-pr-review-star-color",c),v.style.setProperty("--renuvex-pr-star-size",m.reviewStarSize+"px"),v.style.setProperty("--renuvex-pr-avg-star-size",m.avgStarSize+"px"),Se(Er(r.summaryLayout),r.size),Se(Ar(r.reviewLayout),r.size);var h=Ke(r),f=mn();if(!f)return;var S=xn(f,e),g=document.getElementById("renuvex-reviews");g||(g=document.createElement("div"),g.id="renuvex-reviews",g.style.minHeight="200px"),g.parentNode!==S&&S.appendChild(g);var w=kt(g),C=_e+Le+fr+oa()+da();Me(w,C);var A=Tt(w);if(r.enabled===!1){g.style.minHeight="auto",A.replaceChildren(sa(r.borderRadius!==void 0?r.borderRadius:8)),pr(!1);var z=lr;ur(null),z&&et(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}try{var k=t||{},L=Br(k),T=L?[]:k.data&&k.data.reviews||[];dt(T),A.replaceChildren();var E=document.createElement("section");if(E.id="renuvex-reviews-widget",E.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),E.className="renuvex-pr-reviews-widget",E.setAttribute("data-renuvex-surface","reviews"),e&&E.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(E.style.width="100%",E.style.maxWidth="100%",E.style.marginLeft="0",E.style.marginRight="0"),u){var P=document.createElement("div"),B=r.summaryLayout||"classic";P.className="renuvex-pr-title renuvex-pr-title-"+B,P.textContent=u,E.appendChild(P)}if(L){E.appendChild(va(k.message,i.onRetry)),A.appendChild(E),Ce(w),Pr(E,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return w.getElementById("renuvex-reviews-widget")});return}var j=k.data&&k.data.allCount||0,F=k.data&&k.data.ratingCounts||null,U=F||[0,0,0,0,0],te=k.data&&k.data.avgRating||"0.0";if(!F&&T.length>0){T.forEach(function(_){_.rating>=1&&_.rating<=5&&U[_.rating-1]++});var D=T.reduce(function(_,Z){return _+Z.rating},0);te=(D/T.length).toFixed(1)}if(j>0){var J=Er(r.summaryLayout),W=J.render({widget:E,productId:e,data:k,settings:r,iconPair:h,allCount:j,ratingCounts:U,avgRatingVal:te,currentRatingFilter:Q,currentOrderBy:q,currentHasImages:ee,onFilterChange:i.onFilterChange,onSortChange:i.onSortChange});E.appendChild(W)}else{var R=document.createElement("button");R.className="renuvex-pr-write-btn",R.style.cssText="display:block;margin:16px auto 0;",R.textContent=r.writeButtonText||"Yorum Yap",R.onclick=Y,E.appendChild(R)}var ue=fa({settings:r,root:v,currentHasImages:ee,photoStripReviews:tt,openReviewModal:pe,wireLightboxTrigger:we});if(ue&&E.appendChild(ue),T.length===0){var ae=document.createElement("p");ae.className="renuvex-pr-state-msg",ae.textContent="Hen\xFCz yorum yok.",E.appendChild(ae)}else{var ze=Ar(r.reviewLayout);T.forEach(function(_){E.appendChild(ze.render(_,Nr))})}var ne=k.data&&k.data.hasMore;if(ne){var I=document.createElement("button");I.className="renuvex-pr-load-more",I.textContent="Daha Fazla G\xF6ster",I.onclick=async function(){I.disabled=!0,I.textContent="Y\xFCkleniyor...";var _=Ve(),Z=H,$=q,M=ir,de=Q,tr=ee,ar=M+1,se=await Be(Z,$,ar,de,tr);if(We(_,{productId:Z,orderBy:$,page:M,ratingFilter:de,hasImages:tr}))if(se&&!Br(se)&&se.data&&Array.isArray(se.data.reviews)){var qe=st(se.data.reviews);vt(qe),Ne(ar);var ha=Ar(N.reviewLayout);qe.forEach(function(ba){E.insertBefore(ha.render(ba,Nr),I)}),se.data.hasMore?(I.disabled=!1,I.textContent="Daha Fazla G\xF6ster"):I.remove()}else I.disabled=!1,I.textContent="Tekrar Dene"},E.appendChild(I)}A.appendChild(E),Ce(w),Pr(E,"reviews-widget",{productId:e||""},function(){return w.getElementById("renuvex-reviews-widget")})}catch(_){console.error("[renuvex-pr] render error:",_);var ge=document.createElement("p");ge.style.cssText="text-align:center;color:#dc2626;",ge.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",A&&A.replaceChildren(ge)}}finally{if(pr(!1),lr){var O=lr;ur(null),et(O.productId,O.settings,O.reviewsData,O.productName,O.orderBy,O.page,O.badgeSettings)}}}export{et as render};
