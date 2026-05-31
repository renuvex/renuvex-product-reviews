/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Me,d as lr}from"./chunk-FW6W6ZQL.js";import{b as Dr,c as ar}from"./chunk-ZM24JLBV.js";import{A as dr,B as ur,a as oe,b as Mr,c as me,d as xe,e as U,f as I,g as nt,h as Oe,j as Or,k as it,l as Fr,m as er,n as ot,o as lt,p as pt,q as dt,r as ut,s as st,t as vt,v as ct,w as mt,x as xt,y as ft,z as pr}from"./chunk-NQF4A7IV.js";import{A as Ce,B as cr,C as q,D as mr,E as xr,F as Hr,G as Yr,H as le,I as Ct,J as pe,K as St,L as Et,c as _r,e as ke,f as Z,g as fe,h as $,i as Ae,j as sr,k as rr,l as gt,m as Fe,n as vr,o as ht,p as Ne,q as bt,r as yt,t as wt,u as ge,v as He,x as zt,y as he,z as kt}from"./chunk-IDXIH7WE.js";import{a as tr}from"./chunk-GSBAPHFO.js";import{a as ze,b as $e,c as Qe,k as Tt,l as Pe}from"./chunk-YCWIZ2SG.js";var Ye=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function Lt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function De(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function fr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function At(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Nt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var Pt=`
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
`,It=`
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
`;var Rt=`
  .renuvex-pr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--renuvex-pr-summary-max);}

  .renuvex-pr-summary-bars{display:flex;flex-direction:column;gap:4px;width:100%;max-width:var(--renuvex-pr-summary-max);}
  .renuvex-pr-bar-row{
    display:flex;align-items:center;justify-content:flex-start;gap:var(--renuvex-pr-col-gap);width:100%;
    cursor:pointer;border-radius:var(--renuvex-pr-radius,6px);padding:3px 6px;
    box-sizing:border-box;position:relative;
  }
  @media(hover:hover){.renuvex-pr-bar-row:hover{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07));}}
  .renuvex-pr-bar-active{background:var(--renuvex-pr-bar-hover-bg,rgba(17,17,17,0.07))!important;}
  .renuvex-pr-bar-label{flex:0 0 var(--renuvex-pr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--renuvex-pr-bar-label-size,16px);color:#111111;}
  .renuvex-pr-bar-star{width:var(--renuvex-pr-bar-label-size,20px);height:var(--renuvex-pr-bar-label-size,20px);}
  .renuvex-pr-bar-star-filled{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-bar-star-empty{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-bar-track{flex:1 1 auto;min-width:0;background:var(--renuvex-pr-bar-track,#e5e7eb);border-radius:var(--renuvex-pr-radius-sm,4px);height:10px;overflow:hidden;}
  .renuvex-pr-bar-fill{height:10px;background:var(--renuvex-pr-bar-fill,#111111);border-radius:var(--renuvex-pr-radius-sm,4px);}
  .renuvex-pr-bar-count{flex:0 0 var(--renuvex-pr-col-count);white-space:nowrap;text-align:right;color:var(--renuvex-pr-bar-count,#111111);font-size:var(--renuvex-pr-bar-count-size,14px);}

  .renuvex-pr-summary-actions{
    display:flex;flex-direction:row;align-items:stretch;gap:var(--renuvex-pr-col-gap);
    box-sizing:border-box;
  }
  .renuvex-pr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--renuvex-pr-btn-bg,#111111);color:var(--renuvex-pr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:1px solid var(--renuvex-pr-btn-border,#111111);font-weight:500;font-size:var(--renuvex-pr-btn-text-size,14px);white-space:nowrap;transition:opacity 0.15s;}
  @media(hover:hover){.renuvex-pr-write-btn:hover{opacity:0.92;}}
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
  @media(hover:hover){.renuvex-pr-filter-item:hover{background:var(--renuvex-pr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .renuvex-pr-filter-item-active{font-weight:700;color:var(--renuvex-pr-filter-item-active,#111111);}
  .renuvex-pr-filter-btn:focus-visible,
  .renuvex-pr-filter-item:focus-visible{outline:2px solid var(--renuvex-pr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .renuvex-pr-filter-item:focus-visible{outline-offset:-2px;background:var(--renuvex-pr-filter-item-hover-bg,rgba(17,17,17,0.07));}
`;var Bt=`
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
  @media(hover:hover){.renuvex-pr-photo-strip-arrow:hover{background:var(--renuvex-pr-photo-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);}}
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
  @media(hover:hover){.renuvex-pr-photo-strip-thumb:hover{transform:translateY(-2px);}}
  .renuvex-pr-photo-strip-wrap{position:relative;display:block;}
`;var _t=`
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

  .renuvex-pr-state-msg{text-align:center;color:rgba(17,17,17,0.45);font-size:14px;padding:30px 0;}
  .renuvex-pr-state-loading{padding:40px;}
  .renuvex-pr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .renuvex-pr-state-error-text{max-width:360px;line-height:1.45;}
  .renuvex-pr-state-retry{padding:9px 22px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-state-retry:disabled{opacity:.6;cursor:not-allowed;}
`;var Mt=`
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
  @media(hover:hover){.renuvex-pr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.renuvex-pr-modal-close{display:none;}}
  .renuvex-pr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:2;}
  @media(hover:hover){.renuvex-pr-modal-close-mobile:hover{opacity:0.85;}}
  .renuvex-pr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover){.renuvex-pr-modal-nav:hover{opacity:0.85;}}
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
`;var gr=[Pt,zt,Rt,Bt,_t,Mt,It].join(`
`);function fa(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function ga(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function ha(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",l=ga()&&!n;if(a>0){var p=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",p+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),l&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function ba(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var nr=0,je=null;function hr(){return nr+=1,nr>1||(je=fa(),ha(je)),je}function br(){if(nr!==0&&(nr-=1,!(nr>0))){var e=je;je=null,e&&ba(e)}}function ya(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function yr(){var e=ya();return!e||e===document.body||e===document.documentElement?null:e}function Q(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function wa(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function jr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(wa)}function za(e,r){var t=e,a=jr(e);!a.length&&r&&(t=r,a=jr(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;Q(n)}function wr(e,r,t){if(e.key==="Tab"){var a=jr(r);if(!a.length){e.preventDefault(),za(r);return}var n=a[0],l=a[a.length-1],p=At(t);if(!r.contains(p)){e.preventDefault(),Q(n);return}if(a.indexOf(p)===-1){e.preventDefault(),Q(e.shiftKey?l:n);return}e.shiftKey&&p===n?(e.preventDefault(),Q(l)):!e.shiftKey&&p===l&&(e.preventDefault(),Q(n))}}var Ot="renuvexPrOverlay";function zr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Ot]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function ka(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Ot]===e.id)}function kr(e){if(ka(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Ve(e){return Ce(e)}function Ft(e,r,t,a,n){br(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&sr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),Q(n)}function Ca(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ge(e.rating,I);var l=document.createElement("span");l.className="renuvex-pr-modal-date",l.textContent=he(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-modal-title",p.textContent=e.title||"",p.style.display=e.title?"":"none",t.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-modal-author",o.textContent=e.author||"",t.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(s);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var x=document.createElement("div");x.className="renuvex-pr-modal-reply-label",x.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi";var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",u.appendChild(x),u.appendChild(m),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Ht(e,r,t){var a=t||I,n=e.querySelector(".renuvex-pr-modal-scroll-content"),l=n.querySelector(".renuvex-pr-modal-stars");l.innerHTML=ge(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=he(r.createdAt);var p=n.querySelector(".renuvex-pr-modal-title");p.textContent=r.title||"",p.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var o=n.querySelector(".renuvex-pr-modal-body");o.textContent=(r.comment||"").trim(),o.style.display=r.comment&&r.comment.trim()?"":"none";var s=n.querySelector(".renuvex-pr-modal-reply");s.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",s.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",s.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Ur(e,r,t,a,n,l,p,o,s){var u=Ve(e),x=Math.max(0,Math.min(t||0,u.length-1)),m=document.createElement("div");m.className="renuvex-pr-modal-left";var i=document.createElement("img"),z=p==="next"?"renuvex-pr-modal-img-enter-right":p==="prev"?"renuvex-pr-modal-img-enter-left":"";i.className="renuvex-pr-modal-main-img"+(z?" "+z:""),i.src=Yr(u[x]||""),i.decoding="async",i.width=Hr,i.height=Math.round(Hr*4/3),i.alt="Yorum foto\u011Fraf\u0131",Ct(i,function(T){if(T.style.display="none",!m.querySelector(".renuvex-pr-modal-img-error")){var L=document.createElement("div");L.className="renuvex-pr-modal-img-error",L.setAttribute("role","status"),L.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",m.insertBefore(L,T)}}),m.appendChild(i);var d=document.createElement("button");d.className="renuvex-pr-modal-close-mobile";var b=$(Ne);b&&d.appendChild(b),d.setAttribute("aria-label","Kapat"),d.onclick=function(T){T.stopPropagation(),l()},m.appendChild(d);var f=0;if(m.addEventListener("touchstart",function(T){f=T.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(T){var L=f-T.changedTouches[0].clientX;if(!(Math.abs(L)<50)){if(L>0){if(y)be(e,r,x+1,a,n,l,!0,"next",o,s);else if(g){var N=a[r+1];be(N,r+1,0,a,n,l,!1,"next",o,s)}}else if(c)be(e,r,x-1,a,n,l,!0,"prev",o,s);else if(w){var R=a[r-1],P=Ve(R);be(R,r-1,P.length-1,a,n,l,!1,"prev",o,s)}}},{passive:!0}),u.length>1){var v=document.createElement("div");v.className="renuvex-pr-modal-thumbs",u.forEach(function(T,L){var N=document.createElement("img"),R=le(T,xr);N.src=R.src,N.srcset=R.srcset,N.loading="lazy",N.decoding="async",N.width=xr,N.height=xr,N.className="renuvex-pr-modal-thumb"+(L===x?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(L+1),pe(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(L+1)+" se\xE7"),L===x&&N.setAttribute("aria-current","true"),(function(P){function G(){be(e,r,P,a,n,l,!0,null,o,s)}N.onclick=G,N.onkeydown=function(X){(X.key==="Enter"||X.key===" ")&&(X.preventDefault(),G())}})(L),v.appendChild(N)}),m.appendChild(v)}var c=x>0,y=x<u.length-1,w=r>0,g=r<a.length-1,k=c||w,h=y||g;if(k){var A=document.createElement("button");A.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var E=$(Fe);E&&A.appendChild(E),A.setAttribute("aria-label","\xD6nceki"),A.onclick=function(T){if(T.stopPropagation(),c)be(e,r,x-1,a,n,l,!0,"prev",o,s);else if(w){var L=a[r-1],N=Ve(L);be(L,r-1,N.length-1,a,n,l,!1,"prev",o,s)}},m.appendChild(A)}if(h){var C=document.createElement("button");C.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var S=$(vr);S&&C.appendChild(S),C.setAttribute("aria-label","Sonraki"),C.onclick=function(T){if(T.stopPropagation(),y)be(e,r,x+1,a,n,l,!0,"next",o,s);else if(g){var L=a[r+1];be(L,r+1,0,a,n,l,!1,"next",o,s)}},m.appendChild(C)}return m}function Yt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Ve(a);n[0]&&(new Image().src=Yr(n[0]))}})}function Vr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Sa(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function l(){Vr(t),Vr(a),Vr(n)}l(),t&&Q(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){l(),requestAnimationFrame(l)}):setTimeout(l,0)}function be(e,r,t,a,n,l,p,o,s,u){if(u&&(u.currentReview=e),p){var x=Ur(e,r,t,a,n,l,o,s,u);n.firstChild&&n.replaceChild(x,n.firstChild)}else{var x=Ur(e,r,t,a,n,l,o,s,u),m=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(x,n.firstChild),m&&Ht(m,e,u&&u.currentSettings),Sa(s,n)}Yt(r,a)}function ue(e,r,t){var a=Ve(e);if(!a.length)return;var n=(t||[]).filter(function(h){return Ve(h).length>0}),l=n.findIndex(function(h){return h===e||h.id===e.id});l===-1&&(n.unshift(e),l=0);var p=a.indexOf(r);p<0&&(p=0);var o=document.createElement("div");o.className="renuvex-pr-modal-overlay";var s=document.createElement("div");s.className="renuvex-pr-modal";var u=!1,x=null,m=yr(),i=hr(),z=zr(),d={currentReview:e,currentSettings:I},b=null;function f(h){var A=h&&h.detail&&h.detail.settings;if(!(A&&A===b)){b=A||null,d.currentSettings=A||I;var E=s.querySelector(".renuvex-pr-modal-right");!E||!d.currentReview||Ht(E,d.currentReview,d.currentSettings)}}function v(){u||(u=!0,window.removeEventListener(Pe,f),Ft(x&&x.host,c,v,i,m))}function c(h){if(h.key==="Escape"){y();return}wr(h,o,x&&x.root)}function y(){u||(u=!0,window.removeEventListener(Pe,f),Ft(x&&x.host,c,v,i,m),kr(z))}document.addEventListener("keydown",c),window.addEventListener("popstate",v),window.addEventListener(Pe,f),o.onclick=function(){y()},s.onclick=function(h){h.stopPropagation()},s.appendChild(Ur(e,l,p,n,s,y,null,o,d)),s.appendChild(Ca(e)),Yt(l,n);var w=document.createElement("div");w.className="renuvex-pr-modal-wrap",w.tabIndex=-1,w.setAttribute("role","dialog"),w.setAttribute("aria-modal","true"),w.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),w.appendChild(s);var g=document.createElement("button");g.className="renuvex-pr-modal-close";var k=$(Ne);k&&g.appendChild(k),g.setAttribute("aria-label","Kapat"),g.onclick=function(h){h.stopPropagation(),y()},w.appendChild(g),o.appendChild(w),x=fr(),De(x.root,Ye+Me+gr),x.root.appendChild(o),Ae(x.root),Q(w)}function Se(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Gr={};ze(Gr,{css:()=>Ba,meta:()=>Ra,render:()=>_a});function Ue(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,l=e.onFilterChange;ke(a);var p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var o=5;o>=1;o--){var s=r[o-1]||0,u=t>0?Math.round(s/t*100):0,x=n===o,m=document.createElement("div");m.className="renuvex-pr-bar-row"+(x?" renuvex-pr-bar-active":""),n&&!x&&(m.style.opacity="0.35");for(var i="",z=1;z<=5;z++){var d=z<=o;i+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(d?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+Z(d?"full":"outline")+"</span>"}m.innerHTML='<span class="renuvex-pr-bar-label">'+i+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(b){m.onclick=function(){l(b)}})(o),p.appendChild(m)}return p}var se=[],Dt=!1,Cr=!1;function jt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Ea(e){if(Cr){Cr=!1,e.preventDefault(),e.stopPropagation();return}for(var r=!1,t=se.length-1;t>=0;t--){var a=se[t];jt(e,a.trigger)||jt(e,a.element)||a.close()&&(r=!0)}r&&(e.preventDefault(),e.stopPropagation())}function Ta(e){if(e.key==="Escape")for(var r=se.length-1;r>=0;r--)se[r].close()}function La(){Dt||typeof document=="undefined"||(document.addEventListener("click",Ea,!0),document.addEventListener("keydown",Ta),Dt=!0)}function Sr(e){for(var r=0;r<se.length;r++)se[r]!==e&&se[r].close()}function Vt(){Cr=!0,typeof setTimeout=="function"&&setTimeout(function(){Cr=!1},700)}function Er(e){La();var r={trigger:e.trigger,element:e.element,close:e.close};return se.push(r),function(){var a=se.indexOf(r);a!==-1&&se.splice(a,1)}}function ae(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,l=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var o=document.createElement("button");o.className="renuvex-pr-write-btn",o.textContent=I&&I.writeButtonText||"Yorum Yap",o.onclick=n,p.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var x=I&&I.filterIcon||"lines";u.innerHTML=fe(gt(x));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var i=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],z=!1;function d(v){var c=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var y=v&&(v.restoreFocus===!0||v.restoreFocus==="auto"&&lr());if(c&&y)try{u.focus({preventScroll:!0})}catch(w){try{u.focus()}catch(g){}}return c}function b(){Sr(f),m.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var v=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");v&&requestAnimationFrame(function(){try{v.focus({preventScroll:!0})}catch(c){try{v.focus()}catch(y){}}})}i.forEach(function(v){var c=v[2],y=c?a:!a&&(t||"newest")===v[0],w=document.createElement("button");w.type="button",w.className="renuvex-pr-filter-item"+(y?" renuvex-pr-filter-item-active":""),w.setAttribute("role","menuitem"),w.textContent=v[1];var g=!1;function k(h,A){h&&(h.preventDefault(),h.stopPropagation()),!g&&(g=!0,z=!0,A!==!0&&Vt(),d({restoreFocus:A}),l(v[0],c),setTimeout(function(){g=!1,z=!1},0))}w.addEventListener("pointerdown",function(h){h.button!==void 0&&h.button!==0||k(h,!1)}),typeof window!="undefined"&&!window.PointerEvent&&w.addEventListener("touchstart",function(h){k(h,!1)},{passive:!1}),w.addEventListener("mousedown",function(h){h.button!==void 0&&h.button!==0||k(h,!1)}),w.addEventListener("keydown",function(h){(h.key==="Enter"||h.key===" ")&&k(h,!0)}),w.onclick=function(h){k(h,!1)},m.appendChild(w)}),u.onclick=function(){m.classList.contains("renuvex-pr-open")?d({restoreFocus:"auto"}):b()},s.addEventListener("keydown",function(v){v.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(v.stopPropagation(),d({restoreFocus:!0}))}),s.addEventListener("focusout",function(v){if(m.classList.contains("renuvex-pr-open")&&!z){var c=v.relatedTarget;c&&s.contains(c)||d()}});var f=Er({trigger:s,element:m,close:d});return s.appendChild(u),s.appendChild(m),p.appendChild(s),p}var Ut=`
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
      color:var(--renuvex-pr-fwizard-text, #111111);
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
`;function Wt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",n.appendChild(l);var p=document.createElement("button");p.className="renuvex-pr-fwizard-close",p.type="button",p.setAttribute("aria-label","Kapat");var o=$(Ne);o&&p.appendChild(o),n.appendChild(p);var s=!1,u=null,x=null,m=!1;function i(){Q(a)}function z(g){wr(g,a,u&&u.root)}function d(){if(!s){if(s=!0,document.removeEventListener("keydown",b),a.removeEventListener("click",f),p.removeEventListener("click",d),m)Q(x);else{var g=u&&u.root?u.root.activeElement:null;if(g&&typeof g.blur=="function")try{g.blur()}catch(k){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(sr(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):a.parentNode&&a.parentNode.removeChild(a),br();try{r()}catch(k){}},200)}}function b(g){if(g.key==="Escape"){d();return}z(g)}function f(g){g.target===a&&t&&d()}document.addEventListener("keydown",b),a.addEventListener("click",f),p.addEventListener("click",d);function v(g){x=yr(),m=lr(),g&&l.appendChild(g),u=fr(),De(u.root,Ye+Me+Ut),u.root.appendChild(a),Ae(u.root),hr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),i()})}var c=null,y=null;function w(g,k){if(k=k||"error",c){try{c.remove()}catch(h){}c=null}y&&(clearTimeout(y),y=null),c=document.createElement("div"),c.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,c.textContent=g,n.appendChild(c),y=setTimeout(function(){c&&(c.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(c){try{c.remove()}catch(h){}c=null}},300))},4e3)}return{open:v,close:d,content:l,setAllowOutsideClose:function(g){t=!!g},setStepAttr:function(g){n.setAttribute("data-step",String(g))},showToast:w}}var Wr=4;function We(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function qt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(l){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Wr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(l){return l!==n})}}}}function Gt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},l=e.onNext||function(){},p=document.createElement("div");p.className="renuvex-pr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=fe(Fe)+"<span>Geri</span>",o.addEventListener("click",function(){a()}),p.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-fwizard-footer-progress";for(var u=[],x=0;x<Wr;x++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",s.appendChild(m),u.push(m)}p.appendChild(s);var i=document.createElement("button");i.type="button";var z=null;function d(f){z&&i.removeEventListener("click",z),z=f,f&&i.addEventListener("click",f)}p.appendChild(i);function b(f,v){var c=r.indexOf(f)!==-1,y=t.indexOf(f)!==-1,w=v&&(v.images&&v.images.length>0||v.pendingImages&&v.pendingImages.length>0);if(c)f===2&&w?(i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",d(function(){l()})):(i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.setAttribute("aria-label","Atla"),i.innerHTML="<span>Atla</span>",d(function(){n()})),i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),i.style.visibility="",i.tabIndex=0;else if(y){i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Sonraki"),i.innerHTML="Sonraki",i.style.visibility="",i.tabIndex=0;var g=We(f,v);i.disabled=!g,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!g),d(function(){i.disabled||l()})}else i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.innerHTML="",i.style.visibility="hidden",i.tabIndex=-1,i.disabled=!0,d(null)}return{el:p,update:function(f,v){u.forEach(function(y,w){w+1<=f?y.classList.add("renuvex-pr-fwizard-progress-seg-active"):y.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var c=f<=1;o.style.visibility=c?"hidden":"",o.style.pointerEvents=c?"none":"",o.tabIndex=c?-1:0,b(f,v)},setNextDisabled:function(f){i.classList.contains("renuvex-pr-fwizard-cta-btn")&&(i.disabled=!!f,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){o.style.visibility="hidden",s.style.visibility="hidden",i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",i.style.visibility="",i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),d(f)}}}function Xt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title",l.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-stars",p.setAttribute("role","radiogroup"),p.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var o=rr(I||{});ke(o);var s=[];function u(f){s.forEach(function(v,c){var y=c<f;v.classList.toggle("renuvex-pr-fwizard-star-active",y),v.setAttribute("aria-checked",c+1===f?"true":"false"),v.innerHTML=y?Z("full"):Z("outline")})}function x(f){e.set({rating:f}),u(f)}function m(f){var v=s[f-1];if(v)try{v.focus()}catch(c){}}function i(f,v){v&&typeof v.preventDefault=="function"&&v.preventDefault(),v&&typeof v.stopPropagation=="function"&&v.stopPropagation(),!a&&(a=!0,x(f),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var z=1;z<=5;z++)(function(f){var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-star",v.setAttribute("role","radio"),v.setAttribute("aria-label",f+" y\u0131ld\u0131z"),v.innerHTML=Z("outline"),v.addEventListener("mouseenter",function(){u(f)}),v.addEventListener("mouseleave",function(){u(e.get().rating)}),v.addEventListener("pointerdown",function(c){c.button&&c.button!==0||i(f,c)}),typeof window!="undefined"&&!window.PointerEvent&&v.addEventListener("touchstart",function(c){i(f,c)},{passive:!1}),v.addEventListener("mousedown",function(c){window.PointerEvent||i(f,c)}),v.addEventListener("keydown",function(c){if(c.key==="Enter"||c.key===" "){i(f,c);return}var y=0;c.key==="ArrowRight"||c.key==="ArrowUp"?y=Math.min(5,f+1):c.key==="ArrowLeft"||c.key==="ArrowDown"?y=Math.max(1,f-1):c.key==="Home"?y=1:c.key==="End"&&(y=5),y&&(c.preventDefault(),x(y),m(y))}),v.addEventListener("click",function(c){i(f,c)}),s.push(v),p.appendChild(v)})(z);u(e.get().rating);var d=null,b=function(f){var v=f&&f.detail&&f.detail.settings;v&&v===d||(d=v||null,o=rr(v||I||{}),u(e.get().rating))};return window.addEventListener(Pe,b),t.appendChild(p),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Pe,b)}}}var Kt=3,Aa=10*1024*1024;function Jt(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-subtitle",l.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle");var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",p.appendChild(o),p.appendChild(s);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),p.appendChild(u),a.appendChild(p);var x=r.revokeBlobUrl||function(c){c&&typeof c=="string"&&c.startsWith("blob:")&&URL.revokeObjectURL(c)},m=r.blobMap||{},i=r.urlToFinger||{};function z(){if(!t){var c=e.get().images||[],y=e.get().pendingImages||[],w=c.map(function(g){return{url:g,isPending:!1}}).concat(y.map(function(g){return{url:g.url,file:g.file,isPending:!0,error:g.error}}));u.innerHTML="",w.forEach(function(g){var k=m[g.url]||g.url,h=d(g,k);u.appendChild(h)}),f()}}function d(c,y){var w=document.createElement("div");w.className="renuvex-pr-fwizard-photo-thumb";var g=document.createElement("img");g.src=y,g.alt="",g.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",w.appendChild(g);var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-loading",k.style.display="none",w.appendChild(k);var h=document.createElement("button");h.type="button",h.className="renuvex-pr-fwizard-photo-remove",h.setAttribute("aria-label","Kald\u0131r");var A=$(Ne);return A&&h.appendChild(A),w.appendChild(h),b(w,c,y),w}function b(c,y,w){var g=c.querySelector("img");g.src!==w&&(g.src=w);var k=c.querySelector(".renuvex-pr-fwizard-photo-loading");if(y.isPending&&y.error){k.style.display="flex",k.textContent="";var h=document.createElement("span");h.className="renuvex-pr-upload-error",h.textContent="\u2717 "+y.error,k.appendChild(h)}else k.style.display="none",k.textContent="";var A=c.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var E=i[y.url]||(y.file?y.file.name+"_"+y.file.size:null),C=m[y.url],S={};E&&(S.fingerprints=(e.get().fingerprints||[]).filter(function(T){return T!==E})),y.isPending?S.pendingImages=(e.get().pendingImages||[]).filter(function(T){return T.url!==y.url}):S.images=(e.get().images||[]).filter(function(T){return T!==y.url}),e.set(S),x(y.url),x(C),delete i[y.url],C&&delete i[C],m[y.url]&&delete m[y.url]}}function f(){var c=(e.get().images||[]).length,y=(e.get().pendingImages||[]).length,w=c+y,g=w>=Kt;w>0?(p.classList.add("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=fe(yt)):(p.classList.remove("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=fe(bt)+"<span>Foto\u011Fraf Ekle</span>"),g?(o.style.display="none",o.disabled=!0,s.disabled=!0):(o.style.display="flex",o.disabled=!1,s.disabled=!1,o.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}o.addEventListener("click",function(){s.disabled||s.click()}),s.onchange=async function(c){var y=(e.get().images||[]).length+(e.get().pendingImages||[]).length,w=Array.from(c.target.files).slice(0,Kt-y);s.value="";var g=(e.get().pendingImages||[]).length,k=e.get().images||[],h=k.length;if(w.length!==0){for(var A=[],E=[],C=0;C<w.length;C++){var S=w[C],T=S.name+"_"+S.size,L=(e.get().fingerprints||[]).some(function(M){return M===T})||A.some(function(M){return M.file.name+"_"+M.file.size===T});if(L){console.log("[renuvex-pr] Duplicate file detected, skipping:",S.name);continue}if(S.size>Aa){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var R=URL.createObjectURL(S);i[R]=T,A.push({url:R,file:S,error:null}),E.push({url:R,file:S});var P=(e.get().fingerprints||[]).slice();P.push(T),e.set({fingerprints:P})}if(A.length!==0){var G=(e.get().pendingImages||[]).concat(A),X=async function(){for(var M=0;M<E.length;M++){var W=E[M],Re=W.file,re=W.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Xe=(e.get().pendingImages||[]).filter(function(F){return F.url!==re}),Be=(e.get().images||[]).slice();Be.push(re),e.set({pendingImages:Xe,images:Be});continue}try{var te=await tr(Qe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e})});if(!te.ok)throw te.status===429?new Error("rate_limit"):new Error("sign failed");var Y=await te.json();if(!Y.folder)throw new Error("sign folder missing");var D=new FormData;D.append("file",Re),D.append("api_key",Y.api_key),D.append("timestamp",Y.timestamp),D.append("signature",Y.signature),D.append("folder",Y.folder);var Ke=await fetch("https://api.cloudinary.com/v1_1/"+Y.cloud_name+"/image/upload",{method:"POST",body:D}),K=await Ke.json();if(K.secure_url&&kt(K.secure_url)){var Je=(e.get().pendingImages||[]).some(function(F){return F.url===re});if(!Je){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Skipping state update.");continue}m[K.secure_url]=re,i[K.secure_url]=i[re];var ve=(e.get().pendingImages||[]).filter(function(F){return F.url!==re}),Ee=(e.get().images||[]).slice();Ee.push(K.secure_url),e.set({pendingImages:ve,images:Ee});try{tr(Qe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e,secureUrl:K.secure_url})}).catch(function(){})}catch(F){}}else throw new Error("invalid image url")}catch(F){console.error("[renuvex-pr] Image upload failed:",F);var _e=F.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(_e,"error");var Te=(e.get().pendingImages||[]).map(function(ne){return ne.url===re?{url:ne.url,file:ne.file,error:_e}:ne});e.set({pendingImages:Te})}}};if(h===0&&g===0){t=!0;var ee=!r.canNavigate||r.canNavigate();ee&&e.goNext()}e.set({pendingImages:G}),X()}}};var v=e.onChange(z);return z(),{el:a,destroy:function(){t=!0,s.onchange=null,v&&v()}}}var qr=2e3,Na=60;function Zt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content-form";var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",p.maxLength=Na,p.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),p.value=e.get().title||"",p.addEventListener("input",function(){e.set({title:p.value})}),l.appendChild(p);var o=document.createElement("textarea");o.className="renuvex-pr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=qr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",l.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-fwizard-char-counter",s.setAttribute("aria-live","polite"),l.appendChild(s);function u(){var m=o.value.length;s.textContent=m+"/"+qr,s.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=qr)}function x(){return We(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),u(),t(x())}),a.appendChild(l),u(),setTimeout(function(){t(x())},0),{el:a,destroy:function(){}}}var Pa=40;function $t(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent="Hakk\u0131n\u0131zda",n.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-author-form";var o=document.createElement("div");o.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=Pa,u.setAttribute("aria-required","true"),u.value=e.get().author||"",o.appendChild(s),o.appendChild(u),p.appendChild(o);var x=document.createElement("div");x.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var i=document.createElement("input");i.type="email",i.className="renuvex-pr-fwizard-input",i.setAttribute("autocomplete","email"),i.value=e.get().email||"",x.appendChild(m),x.appendChild(i),p.appendChild(x);var z=document.createElement("div");z.className="renuvex-pr-fwizard-notice",z.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",p.appendChild(z);var d=document.createElement("div");d.className="renuvex-pr-fwizard-msg",d.setAttribute("role","alert"),d.setAttribute("aria-live","assertive"),p.appendChild(d);var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-submit-btn",b.textContent="G\xF6nder",p.appendChild(b),n.appendChild(p);function f(){return We(4,e.get())}function v(){var g=!f(),k=(e.get().pendingImages||[]).length,h=k>0;h?(b.disabled=!0,b.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),b.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(b.disabled=g,b.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",g),b.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),v(),t(f())}),i.addEventListener("input",function(){e.set({email:i.value})}),v(),setTimeout(function(){t(f())},0);function c(){d.textContent=""}function y(g){c();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=g||"",d.appendChild(k)}b.onclick=async function(){if(!b.disabled){var g=e.get(),k=(g.author||"").trim(),h=(g.comment||"").trim();if(i.value.trim()&&!i.checkValidity()){i.reportValidity();return}if(!k){y("Gerekli alan");return}if(!g.rating){y("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}b.disabled=!0,b.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=b.textContent;if(b.textContent="G\xF6nderiliyor\u2026",c(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var E=wt(window.location.href),C=g.productName||null,S=await tr(Qe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:$e,productId:g.productId||null,slug:E||null,productName:C,author:k,title:(g.title||"").trim()||null,comment:h||null,rating:g.rating,images:g.images||[]})},15e3);if(S.ok)a();else{var T=await S.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(R){var L=R&&(R.name==="AbortError"||/signal/i.test(R.message||"")),N=L?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":R.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(N,"error"):y(N),b.disabled=!1,b.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),b.textContent=A}}};var w=e.onChange(v);return{el:n,destroy:function(){b.onclick=null,w&&w()}}}function Ia(e,r,t){if(t=t||{},e===1)return Xt(r,{canNavigate:t.canNavigate});if(e===2)return Jt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Zt(r,{onValidityChange:t.onValidityChange});if(e===4)return $t(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Qt(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function ea(e){e=e||{};var r=qt({productId:e.productId,productName:e.productName}),t={},a={},n={};function l(E){if(!(!E||typeof E!="string"||!E.startsWith("blob:")||n[E])){n[E]=!0;try{URL.revokeObjectURL(E)}catch(C){}}}function p(){Object.keys(a).forEach(function(C){l(C)}),Object.keys(t).forEach(function(C){l(t[C])});var E=r.get();(E.pendingImages||[]).forEach(function(C){l(C&&C.url)}),(E.images||[]).forEach(function(C){l(C)})}var o=Wt({onClose:function(){window.removeEventListener("popstate",u),kr(s),p(),e.onClose&&e.onClose()},allowOutsideClose:!1}),s=zr(),u=function(E){o&&o.close&&o.close()};window.addEventListener("popstate",u);var x=document.createElement("div");x.className="renuvex-pr-fwizard-step-wrap";var m=Gt({skippableSteps:[2],nextableSteps:[3],onBack:function(){d==="idle"&&r.goBack()},onSkip:function(){d==="idle"&&r.goNext()},onNext:function(){d==="idle"&&r.goNext()}}),i=document.createElement("div");i.className="renuvex-pr-fwizard-layout",i.appendChild(x),i.appendChild(m.el);var z=null,d="idle",b=null,f=!0,v=null;function c(E,C){x.innerHTML="";var S=Ia(E,r,{canNavigate:function(){return d==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:l,onValidityChange:function(N){m.setNextDisabled(!N)},onSuccess:w,showToast:o.showToast});if(z=S,m.update(E,r.get()),C){d="entering",S.el.classList.add("renuvex-pr-fwizard-step--enter");var T=null,L=function(){T&&clearTimeout(T),S.el.removeEventListener("animationend",L),S.el.classList.remove("renuvex-pr-fwizard-step--enter"),d="idle",b!==null&&g()};S.el.addEventListener("animationend",L),T=setTimeout(L,700)}else d="idle";x.appendChild(S.el),o.setStepAttr&&o.setStepAttr(E),E===3&&m.setNextDisabled(!0)}var y=!1;function w(){if(!y){if(y=!0,!z){x.innerHTML="";var E=Qt();E.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(E),o.setStepAttr("thanks"),m.setThanksState(o.close);return}var C=z;d="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var S=function(){if(v&&clearTimeout(v),C.el.removeEventListener("animationend",S),C.destroy)try{C.destroy()}catch(L){}z===C&&(z=null),x.innerHTML="";var T=Qt();T.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(T),o.setStepAttr("thanks"),m.setThanksState(o.close),d="idle"};C.el.addEventListener("animationend",S),v=setTimeout(S,300)}}function g(){var E=r.get().currentStep;if(d!=="idle"){b=E;return}if(!z){var C=!f;f=!1,c(E,C);return}var S=z;d="exiting",S.el.classList.add("renuvex-pr-fwizard-step--exit");var T=function(){if(v&&clearTimeout(v),S.el.removeEventListener("animationend",T),S.destroy)try{S.destroy()}catch(N){}if(z===S){x.innerHTML="",z=null;var L=b!==null?b:r.get().currentStep;b=null,c(L,!0),d="idle"}};S.el.addEventListener("animationend",T),v=setTimeout(T,350)}g();var k=r.get().currentStep,h=r.onChange(function(E){E.currentStep!==k?(k=E.currentStep,g()):m.update(E.currentStep,E)}),A=o.close;return o.close=function(){h&&h(),typeof v!="undefined"&&v&&clearTimeout(v),A()},o.open(i),{close:o.close}}function H(){ea({productId:U||"",productName:Oe||""})}var ra=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}

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
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:32px;}
  }
`;var Ra={id:"classic",name:"Klasik (A\xE7\u0131k)"},Ba=ra;function _a(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,l=e.allCount,p=e.ratingCounts,o=e.avgRatingVal,s=e.currentRatingFilter,u=e.currentOrderBy,x=e.currentHasImages,m=e.onFilterChange,i=e.onSortChange;ke(n);var z=document.createElement("div");z.className="renuvex-pr-summary";var d=(p[3]||0)+(p[4]||0),b=l>0?Math.round(d/l*100):0,f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-avg",f.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+Z("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",z.appendChild(f);var v=document.createElement("div");if(v.className="renuvex-pr-summary-block renuvex-pr-summary-count",v.textContent=l.toLocaleString("tr-TR")+" Yorum",z.appendChild(v),a.showRecommendation!==!1&&b>0){var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",c.innerHTML='<span class="renuvex-pr-recommend-pct">%'+b+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(c)}return z.appendChild(Ue({ratingCounts:p,allCount:l,iconPair:n,currentRatingFilter:s,onFilterChange:m})),z.appendChild(ae({widget:r,currentOrderBy:u,currentHasImages:x,onWriteClick:H,onSortChange:i})),z}var Xr={};ze(Xr,{css:()=>Oa,meta:()=>Ma,render:()=>Fa});var ta=`
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
    animation:renuvex-pr-grow-out 200ms ease-in-out forwards;
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
`;var Ma={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Oa=ta;function Fa(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,l=e.ratingCounts,p=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,u=e.currentHasImages,x=e.onFilterChange,m=e.onSortChange,i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-compact";var z=document.createElement("div");z.className="renuvex-pr-compact-header";var d=document.createElement("div");d.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+He(p,a)+'</span><span class="renuvex-pr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+fe(ht)+"</span>",d.appendChild(b),z.appendChild(d);var f=ae({widget:r,currentOrderBy:s,currentHasImages:u,onWriteClick:H,onSortChange:m}),v=f.querySelector(".renuvex-pr-filter-wrap"),c=f.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-compact-actions-slot",c&&y.appendChild(c),v&&y.appendChild(v),z.appendChild(y),i.appendChild(z);var w=document.createElement("div");w.className="renuvex-pr-compact-panel",w.setAttribute("role","dialog"),w.setAttribute("aria-hidden","true");var g=document.createElement("div");g.className="renuvex-pr-compact-panel-inner";var k=document.createElement("div");k.className="renuvex-pr-compact-avg",k.innerHTML='<span class="renuvex-pr-icon">'+Z("full")+"</span><span>"+p+"</span>",g.appendChild(k),g.appendChild(Ue({ratingCounts:l,allCount:n,iconPair:a,currentRatingFilter:o,onFilterChange:x})),w.appendChild(g);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function A(M){var W=M?i:d;w.parentNode!==W&&(w.classList.contains("renuvex-pr-open")&&(w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden","true"),b.setAttribute("aria-expanded","false")),W.appendChild(w))}if(A(h?h.matches:!1),h){var E=function(M){A(M.matches)};h.addEventListener?h.addEventListener("change",E):h.addListener&&h.addListener(E)}if(c){var C=document.createElement("button");C.className="renuvex-pr-write-btn",C.textContent=I&&I.writeButtonText||"Yorum Yap",C.onclick=H;var S=document.createElement("div");S.className="renuvex-pr-compact-write-row",S.appendChild(C),i.appendChild(S)}function T(){w.classList.remove("renuvex-pr-open"),w.setAttribute("aria-hidden","true"),b.setAttribute("aria-expanded","false")}function L(){Sr(N),w.classList.add("renuvex-pr-open"),w.setAttribute("aria-hidden","false"),b.setAttribute("aria-expanded","true")}b.onclick=function(){w.classList.contains("renuvex-pr-open")?T():L()};var N=null;function R(M){N&&(N(),N=null),M||(N=Er({trigger:d,element:w,close:T}))}if(R(h?h.matches:!1),h){var P=function(M){R(M.matches)};h.addEventListener?h.addEventListener("change",P):h.addListener&&h.addListener(P)}if(t.showRecommendation!==!1){var G=(l[3]||0)+(l[4]||0),X=n>0?Math.round(G/n*100):0;if(X>0){var ee=document.createElement("div");ee.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",ee.style.marginTop="8px",ee.innerHTML='<span class="renuvex-pr-recommend-pct">%'+X+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",g.appendChild(ee)}}return i}var Kr={};ze(Kr,{css:()=>Ya,meta:()=>Ha,render:()=>Da});var aa=`
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
`;var Ha={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Ya=aa;function Da(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,l=e.ratingCounts,p=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,u=e.currentHasImages,x=e.onFilterChange,m=e.onSortChange;ke(a);var i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-split";var z=document.createElement("div");z.className="renuvex-pr-split-col renuvex-pr-split-left";var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",d.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+Z("full")+'</span><span class="renuvex-pr-avg-num">'+p+"</span>",z.appendChild(d);var b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",b.textContent=n.toLocaleString("tr-TR")+" Yorum",z.appendChild(b),i.appendChild(z);var f=document.createElement("div");f.className="renuvex-pr-split-col renuvex-pr-split-mid",f.appendChild(Ue({ratingCounts:l,allCount:n,iconPair:a,currentRatingFilter:o,onFilterChange:x})),i.appendChild(f);var v=ae({widget:r,currentOrderBy:s,currentHasImages:u,onWriteClick:H,onSortChange:m}),c=v.querySelector(".renuvex-pr-filter-wrap"),y=v.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-split-col renuvex-pr-split-right",y&&w.appendChild(y),c&&w.appendChild(c),i.appendChild(w);var g=(l[3]||0)+(l[4]||0),k=n>0?Math.round(g/n*100):0,h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",h.innerHTML='<span class="renuvex-pr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||k===0;return A&&h.classList.add("renuvex-pr-split-rec-hidden"),z.appendChild(h),i}var Jr={};ze(Jr,{css:()=>Va,meta:()=>ja,render:()=>Ua});var na=`
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
`;var ja={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Va=na;function Ua(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,l=e.currentOrderBy,p=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-minimal";var u=document.createElement("div");u.className="renuvex-pr-minimal-info";var x=document.createElement("div");x.className="renuvex-pr-minimal-row";var m=document.createElement("span");m.className="renuvex-pr-minimal-avg",m.textContent=n,x.appendChild(m);var i=document.createElement("span");i.className="renuvex-pr-minimal-stars",i.innerHTML=He(n,t),x.appendChild(i);var z=document.createElement("span");z.className="renuvex-pr-minimal-count",z.textContent=a.toLocaleString("tr-TR")+" Yorum",x.appendChild(z),u.appendChild(x),s.appendChild(u);var d=ae({widget:r,currentOrderBy:l,currentHasImages:p,onWriteClick:H,onSortChange:o}),b=d.querySelector(".renuvex-pr-filter-wrap"),f=d.querySelector(".renuvex-pr-write-btn"),v=document.createElement("div");if(v.className="renuvex-pr-minimal-actions",f&&v.appendChild(f),b&&v.appendChild(b),s.appendChild(v),f){var c=document.createElement("button");c.className="renuvex-pr-write-btn",c.textContent=I&&I.writeButtonText||"Yorum Yap",c.onclick=H;var y=document.createElement("div");y.className="renuvex-pr-minimal-write-row",y.appendChild(c),s.appendChild(y)}return s}var Zr={};ze(Zr,{css:()=>qa,meta:()=>Wa,render:()=>Ga});var ia=`
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
  .renuvex-pr-desktop-only{display:flex;}

  @media(max-width:600px){
    .renuvex-pr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .renuvex-pr-hero-info{gap:12px;justify-content:flex-start;width:100%;}
    .renuvex-pr-hero-rating-col{flex-direction:row;align-items:center;gap:16px;}
    .renuvex-pr-hero-avg{font-size:calc(var(--renuvex-pr-hero-avg-size,90px) * 0.65);letter-spacing:-1px;}
    .renuvex-pr-hero-meta-row{width:auto;gap:8px;}

    .renuvex-pr-desktop-only{display:none !important;}

    /* Filter ve Yorum Yap butonu yan yana */
    .renuvex-pr-hero-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .renuvex-pr-hero-write-row .renuvex-pr-write-btn{flex:1;justify-content:center;}
    .renuvex-pr-hero-write-row .renuvex-pr-filter-wrap{flex:0 0 auto;display:flex;}
    .renuvex-pr-hero-write-row .renuvex-pr-filter-btn{height:100%;aspect-ratio:1/1;}
  }
  @media(min-width:601px){
    .renuvex-pr-hero-write-row{display:none;}
  }
`;var Wa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},qa=ia;function Ga(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,l=e.currentOrderBy,p=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-hero";var u=document.createElement("div");u.className="renuvex-pr-hero-info";var x=document.createElement("div");x.className="renuvex-pr-hero-rating-col";var m=document.createElement("span");m.className="renuvex-pr-hero-avg",m.textContent=n,x.appendChild(m);var i=document.createElement("div");i.className="renuvex-pr-hero-meta-row";var z=document.createElement("span");z.className="renuvex-pr-hero-stars",z.innerHTML=He(n,t),i.appendChild(z);var d=document.createElement("div");d.className="renuvex-pr-hero-count",d.textContent=a.toLocaleString("tr-TR")+" Yorum",i.appendChild(d),x.appendChild(i),u.appendChild(x),s.appendChild(u);var b=ae({widget:r,currentOrderBy:l,currentHasImages:p,onWriteClick:H,onSortChange:o}),f=b.querySelector(".renuvex-pr-filter-wrap"),v=b.querySelector(".renuvex-pr-write-btn"),c=document.createElement("div");c.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",v&&c.appendChild(v),f&&c.appendChild(f),s.appendChild(c);var y=ae({widget:r,currentOrderBy:l,currentHasImages:p,onWriteClick:H,onSortChange:o}),w=y.querySelector(".renuvex-pr-filter-wrap"),g=y.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");return k.className="renuvex-pr-hero-write-row",g&&k.appendChild(g),w&&k.appendChild(w),s.appendChild(k),s}var Tr={classic:Gr,compact:Xr,split:Kr,minimal:Jr,hero:Zr};function Lr(e){return Tr[e]||Tr.classic}function oa(){return Object.keys(Tr).map(function(e){return Tr[e].css||""}).join(`
`)}var $r={};ze($r,{css:()=>Ka,meta:()=>Xa,render:()=>Ja});function qe(e,r,t){var a=t||{},n=document.createDocumentFragment(),l=document.createElement("div");l.className=r+" renuvex-pr-body-clamped",l.textContent=e,n.appendChild(l);var p=document.createElement("button");return p.type="button",p.className="renuvex-pr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",n.appendChild(p),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(p.style.display="inline-block",typeof a.onReadMore=="function")p.onclick=a.onReadMore;else{var o=!1;p.onclick=function(){o=!o,l.classList.toggle("renuvex-pr-body-clamped",!o),p.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:l,readMore:p}}function Ge(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",l.textContent=e,t.appendChild(l);var p=document.createElement("button");return p.type="button",p.className="renuvex-pr-read-more renuvex-pr-reply-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",t.appendChild(p),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(p.style.display="inline",typeof r=="function")p.onclick=r;else{var o=!1;p.onclick=function(){o=!o,l.classList.toggle("renuvex-pr-reply-text-clamped",!o),p.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var la=`
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
`;var Xa={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Ka=la;function Ja(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var l=document.createElement("span");l.className="renuvex-pr-review-stars",l.innerHTML=ge(e.rating,I),n.appendChild(l);var p=document.createElement("time");if(p.className="renuvex-pr-date",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=he(e.createdAt),a.appendChild(n),a.appendChild(p),t.appendChild(a),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-title",o.textContent=e.title,t.appendChild(o)}var s=document.createElement("div");s.className="renuvex-pr-author",s.textContent=e.author||"",t.appendChild(s);var u=(e.comment||"").trim();u&&t.appendChild(qe(u,"renuvex-pr-body").fragment);var x=Ce(e);if(x.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",x.forEach(function(z){var d=document.createElement("img"),b=le(z,q);d.src=b.src,d.srcset=b.srcset,d.loading="lazy",d.decoding="async",d.width=q,d.height=q,d.className="renuvex-pr-img",pe(d),d.setAttribute("data-renuvex-img-url",z),(function(f){Se(d,function(){ue(e,f,r)})})(z),m.appendChild(d)}),t.appendChild(m)}var i=Ge(e.merchantReply);return i&&t.appendChild(i),t}var Qr={};ze(Qr,{css:()=>$a,meta:()=>Za,render:()=>Qa});var pa=`
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
  .renuvex-pr-review-list-media{display:flex;justify-content:flex-end;}
  .renuvex-pr-review-list-media img{
    width:100%;max-width:var(--renuvex-pr-list-photo-w,120px);aspect-ratio:3/4;object-fit:cover;
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
      max-width:var(--renuvex-pr-list-photo-w-mobile,100px);
      aspect-ratio:3/4;
      display:block;
    }
  }
`;var Za={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},$a=pa;function Qa(e,r){var t=Ce(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-list-author";var p=document.createElement("span");p.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",p.innerHTML=ge(e.rating,I),l.appendChild(p);var o=document.createElement("span");o.className="renuvex-pr-review-list-author-name",o.textContent=e.author||"",l.appendChild(o);var s=document.createElement("time");s.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&s.setAttribute("datetime",e.createdAt),s.textContent=he(e.createdAt),l.appendChild(s),n.appendChild(l);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var x=document.createElement("div");x.className="renuvex-pr-review-list-title",x.textContent=e.title,u.appendChild(x)}var m=(e.comment||"").trim();m&&u.appendChild(qe(m,"renuvex-pr-review-list-body").fragment);var i=Ge(e.merchantReply);if(i&&u.appendChild(i),n.appendChild(u),a){var z=document.createElement("div");z.className="renuvex-pr-review-list-media",t.forEach(function(d){var b=document.createElement("img"),f=le(d,q);b.src=f.src,b.srcset=f.srcset,b.loading="lazy",b.decoding="async",b.width=q,b.height=Math.round(q*4/3),b.setAttribute("data-renuvex-img-url",d),pe(b),(function(v){Se(b,function(){ue(e,v,r)})})(d),z.appendChild(b)}),n.appendChild(z)}return n}var et={};ze(et,{css:()=>rn,meta:()=>en,render:()=>tn});var da=`
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
`;var en={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},rn=da;function tn(e,r){var t=cr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-gallery-content";var p=document.createElement("span");if(p.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",p.innerHTML=ge(e.rating,I),l.appendChild(p),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-gallery-title",o.textContent=e.title,l.appendChild(o)}var s=document.createElement("div");s.className="renuvex-pr-review-gallery-author",s.textContent=e.author||"",l.appendChild(s);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=he(e.createdAt),l.appendChild(u);var x=(e.comment||"").trim();if(x&&l.appendChild(qe(x,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ue(e,t,r)}}:null).fragment),n.appendChild(l),a){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var i=document.createElement("img"),z=le(t,mr);i.src=z.src,i.srcset=z.srcset,i.loading="lazy",i.decoding="async",i.width=mr,i.height=Math.round(mr*4/3),pe(i),i.setAttribute("data-renuvex-img-url",t),Se(i,function(){ue(e,t,r)}),m.appendChild(i),n.appendChild(m)}var d=Ge(e.merchantReply,t?function(){ue(e,t,r)}:null);return d&&(d.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(d)),n}var Ar={card:$r,list:Qr,gallery:et};function ir(e){return Ar[e]||Ar.card}function ua(){return Object.keys(Ar).map(function(e){return Ar[e].css||""}).join(`
`)}function Ie(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),l=parseInt(t[3],16);return"rgba("+a+","+n+","+l+","+r+")"}function an(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var l=document.createElementNS(t,"line");l.setAttribute("x1","1"),l.setAttribute("y1","1"),l.setAttribute("x2","23"),l.setAttribute("y2","23"),a.appendChild(n),a.appendChild(l);var p=document.createElement("div");p.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",p.textContent="Widget \u015Fu anda Pasif durumda";var o=document.createElement("div");return o.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",o.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(p),r.appendChild(o),r}function nn(){return Tt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function on(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=St({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),Et(t,{surface:"reviews",productId:r||""}),t}var sa={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},va={small:80,medium:110,large:140},rt=0;function Nr(){return rt++,rt}function Pr(e,r){return e!==rt?!1:r?!(r.productId!==void 0&&U!==r.productId||r.orderBy!==void 0&&oe!==r.orderBy||r.page!==void 0&&Mr!==r.page||r.ratingFilter!==void 0&&me!==r.ratingFilter||r.hasImages!==void 0&&xe!==r.hasImages):!0}function ln(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function pn(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",l=r.headerRecommendColor||"#111111",p=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",s=r.barCountColor||"#111111",u=Ie(p,.06),x=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",i=r.btnTextColor||"#ffffff",z=r.btnBorderColor||"#111111",d=r.filterBtnBgColor||"#111111",b=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",v=r.filterMenuBgColor||"#ffffff",c=r.filterMenuBorderColor||"#e5e7eb",y=r.filterItemTextColor||"#111111",w=r.filterItemHoverBgColor||"#f3f4f6",g=r.filterItemActiveColor||"#111111",k=r.reviewTitleColor||"#111111",h=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",C=r.reviewBorderColor||"#e5e7eb",S=r.replyBgColor||"#f9fafb",T=r.replyBorderColor||"#747474",L=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",R=r.photoTitleColor||"#111111",P=Ie("#111111",.05),G=r.photoArrowBgColor||"#ffffff",X=r.photoArrowTextColor||"#111111",ee=Ie("#111111",.12),M=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",Re=r.formSecondaryTextColor||"#3b3b3b",re=r.inputTextColor||W,Xe=r.inputBorderColor||"#d1d5db",Be=r.placeholderColor||"#9ca3af",te=r.formStepBarColor||"#111111",Y=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",Ke=r.formBtnBorderColor||"#111111",K=Ie(Y,.06),Je=Ie(Y,.18),ve=Ie(D,.85),Ee=Ie(W,.06),_e=r.loadMoreBgColor||"#ffffff",Te=r.loadMoreTextColor||"#111111",F=r.loadMoreBorderColor||"#111111",ne={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":l,"--renuvex-pr-bar-fill":p,"--renuvex-pr-bar-track":o,"--renuvex-pr-bar-count":s,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":i,"--renuvex-pr-btn-border":z,"--renuvex-pr-filter-btn-bg":d,"--renuvex-pr-filter-btn-text":b,"--renuvex-pr-filter-btn-border":f,"--renuvex-pr-filter-menu-bg":v,"--renuvex-pr-filter-menu-border":c,"--renuvex-pr-filter-item-text":y,"--renuvex-pr-filter-item-hover-bg":w,"--renuvex-pr-filter-item-active":g,"--renuvex-pr-review-title":k,"--renuvex-pr-review-author":h,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":E,"--renuvex-pr-review-border":C,"--renuvex-pr-review-star-color":x,"--renuvex-pr-reply-bg-color":S,"--renuvex-pr-reply-border":T,"--renuvex-pr-reply-label":L,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":R,"--renuvex-pr-photo-image-border":P,"--renuvex-pr-photo-arrow-bg":G,"--renuvex-pr-photo-arrow-text":X,"--renuvex-pr-photo-arrow-border":ee,"--renuvex-pr-fwizard-bg":M,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":Re,"--renuvex-pr-fwizard-input-bg":M,"--renuvex-pr-fwizard-input-text":re,"--renuvex-pr-fwizard-input-border":Xe,"--renuvex-pr-fwizard-placeholder":Be,"--renuvex-pr-fwizard-close-text":W,"--renuvex-pr-fwizard-close-hover-bg":Ee,"--renuvex-pr-fwizard-progress-bg":Ee,"--renuvex-pr-fwizard-progress-active":te,"--renuvex-pr-fwizard-btn-bg":Y,"--renuvex-pr-fwizard-btn-text":D,"--renuvex-pr-fwizard-btn-border":Ke,"--renuvex-pr-fwizard-btn-disabled-bg":Je,"--renuvex-pr-fwizard-btn-disabled-text":ve,"--renuvex-pr-fwizard-nav-hover-bg":K,"--renuvex-pr-load-more-bg":_e,"--renuvex-pr-load-more-text":Te,"--renuvex-pr-load-more-border":F};Object.keys(ne).forEach(function(ye){e.style.setProperty(ye,ne[ye])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function or(e,r,t,a,n,l,p){if(ft){ur({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:l,badgeSettings:p});return}dr(!0),pt(e),dt(r),p!==void 0&&ut(p),st(a),n&&Fr(n),l&&er(l),t!=null&&vt(t);try{let Br=function(B,O){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var _=B.meta.sizeOverrides[O];_&&Object.keys(_).forEach(function(j){i.style.setProperty(j,_[j])})}};var dn=Br,o=Lr(r.summaryLayout),s=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),u=r.showTitle!==!1,x=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",m=s&&u?x:"",i=document.documentElement;pn(i,r);var z=r.borderRadius!==void 0?r.borderRadius:8,d=sa[r.size]||sa.medium,b=va[r.thumbnailSize]||va.medium,f=ir(r.reviewLayout);if(f.meta&&f.meta.sizeOverrides&&f.meta.sizeOverrides[r.size]){var v=f.meta.sizeOverrides[r.size],c=v["--renuvex-pr-list-photo-w"]||v["--renuvex-pr-gallery-photo-w"];c&&(b=parseInt(c))}i.style.setProperty("--renuvex-pr-title-size",d.titleSize+"px"),i.style.setProperty("--renuvex-pr-review-text-size",d.reviewTextSize+"px"),i.style.setProperty("--renuvex-pr-review-title-size",d.reviewTitleSize+"px"),i.style.setProperty("--renuvex-pr-author-size",d.authorSize+"px"),i.style.setProperty("--renuvex-pr-reply-name-size",d.replyNameSize+"px"),i.style.setProperty("--renuvex-pr-reply-text-size",d.replyTextSize+"px"),i.style.setProperty("--renuvex-pr-radius",z+"px"),i.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,z-4)+"px"),i.style.setProperty("--renuvex-pr-photo-title-size",d.photoTitleSize+"px"),i.style.setProperty("--renuvex-pr-avg-rating-size",d.avgRatingSize+"px"),i.style.setProperty("--renuvex-pr-review-count-size",d.reviewCountSize+"px"),i.style.setProperty("--renuvex-pr-compact-count-size",d.compactCountSize+"px"),i.style.setProperty("--renuvex-pr-recommend-size",d.recommendSize+"px"),i.style.setProperty("--renuvex-pr-btn-text-size",d.btnTextSize+"px"),i.style.setProperty("--renuvex-pr-bar-label-size",d.barLabelSize+"px"),i.style.setProperty("--renuvex-pr-minimal-avg-size",d.minimalAvgSize+"px"),i.style.setProperty("--renuvex-pr-hero-avg-size",d.heroAvgSize+"px"),i.style.setProperty("--renuvex-pr-bar-count-size",d.barCountSize+"px"),i.style.setProperty("--renuvex-pr-review-date-size",d.reviewDateSize+"px"),i.style.setProperty("--renuvex-pr-filter-text-size",d.filterTextSize+"px"),i.style.setProperty("--renuvex-pr-load-more-size",d.loadMoreSize+"px"),i.style.setProperty("--renuvex-pr-read-more-size",d.readMoreSize+"px"),i.style.setProperty("--renuvex-pr-thumbnail-size",b+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";i.style.setProperty("--renuvex-pr-review-star-color",y),i.style.setProperty("--renuvex-pr-star-size",d.reviewStarSize+"px"),i.style.setProperty("--renuvex-pr-avg-star-size",d.avgStarSize+"px"),Br(Lr(r.summaryLayout),r.size),Br(ir(r.reviewLayout),r.size);var w=rr(r),g=nn();if(!g)return;var k=on(g,e),h=document.getElementById("renuvex-reviews");h||(h=document.createElement("div"),h.id="renuvex-reviews",h.style.minHeight="200px"),h.parentNode!==k&&k.appendChild(h);var A=Lt(h),E=Ye+Me+gr+oa()+ua();De(A,E);var C=Nt(A);if(r.enabled===!1){h.style.minHeight="auto",C.replaceChildren(an(r.borderRadius!==void 0?r.borderRadius:8)),dr(!1);var S=pr;ur(null),S&&or(S.productId,S.settings,S.reviewsData,S.productName,S.orderBy,S.page,S.badgeSettings);return}var T=document.createElement("p");T.className="renuvex-pr-state-msg renuvex-pr-state-loading",T.textContent="Yorumlar y\xFCkleniyor...",C.replaceChildren(T);try{var L=t||{},N=Dr(L),R=N?[]:L.data&&L.data.reviews||[];ct(R),C.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),m){var G=document.createElement("div"),X=r.summaryLayout||"classic";G.className="renuvex-pr-title renuvex-pr-title-"+X,G.textContent=m,P.appendChild(G)}if(N){P.appendChild(ln(L.message,async function(){var B=Nr(),O=U,_=oe,j=me,ie=xe,V=await ar(U,oe,1,me,xe);Pr(B,{productId:O,orderBy:_,ratingFilter:j,hasImages:ie})&&await or(U,I,V,Oe,oe,1,nt)})),C.appendChild(P),Ae(A),_r(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return A.getElementById("renuvex-reviews-widget")});return}var ee=L.data&&L.data.allCount||0,M=L.data&&L.data.ratingCounts||null,W=M||[0,0,0,0,0],Re=L.data&&L.data.avgRating||"0.0";if(!M&&R.length>0){R.forEach(function(B){B.rating>=1&&B.rating<=5&&W[B.rating-1]++});var re=R.reduce(function(B,O){return B+O.rating},0);Re=(re/R.length).toFixed(1)}if(ee>0){var Xe=Lr(r.summaryLayout),Be=Xe.render({widget:P,data:L,settings:r,iconPair:w,allCount:ee,ratingCounts:W,avgRatingVal:Re,currentRatingFilter:me,currentOrderBy:oe,currentHasImages:xe,onFilterChange:async function(B){var O=Nr(),_=me===B?null:B,j=U,ie=oe,V=xe;ot(_),er(1);var ce=await ar(U,oe,1,_,xe);Pr(O,{productId:j,orderBy:ie,page:1,ratingFilter:_,hasImages:V})&&await or(U,I,ce,Oe,oe,1)},onSortChange:async function(B,O){var _=Nr(),j=U,ie=me;er(1);var V=B,ce=!1;O&&(ce=!0,V="newest"),lt(ce),Fr(V);var we=await ar(U,V,1,me,ce);Pr(_,{productId:j,orderBy:V,page:1,ratingFilter:ie,hasImages:ce})&&await or(U,I,we,Oe,V,1)}});P.appendChild(Be)}else{var te=document.createElement("button");te.className="renuvex-pr-write-btn",te.style.cssText="display:block;margin:16px auto 0;",te.textContent=r.writeButtonText||"Yorum Yap",te.onclick=H,P.appendChild(te)}var Y=(it||[]).filter(function(B){return Ce(B).length>0});if(r.showPhotoGallery!==!1&&!xe&&Y.length>0){var D=document.createElement("div");if(D.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var Ke=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",K=document.createElement("div");K.className="renuvex-pr-photo-title",K.textContent=Ke,D.appendChild(K)}var Je=r.reviewLayout==="card"?"1/1":"3/4";i.style.setProperty("--renuvex-pr-photo-thumb-aspect",Je);var ve=document.createElement("div");ve.className="renuvex-pr-photo-strip";var Ee=q,_e=r.reviewLayout==="card"?q:Math.round(q*4/3),Te=0;Y.forEach(function(B){if(!(Te>=15)){var O=cr(B);if(O){var _=document.createElement("img"),j=le(O,q);_.src=j.src,_.srcset=j.srcset,_.loading=Te<3?"eager":"lazy",_.decoding="async",_.width=Ee,_.height=_e,_.className="renuvex-pr-photo-strip-thumb",_.alt="Yorum foto\u011Fraf\u0131",pe(_),(function(ie,V){Se(_,function(){ue(V,ie,Y)})})(O,B),ve.appendChild(_),Te++}}});var F=document.createElement("button");F.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var ne=$(Fe);ne&&F.appendChild(ne),F.setAttribute("aria-label","\xD6nceki"),F.onclick=function(){ve.scrollBy({left:-200,behavior:"smooth"})};var ye=document.createElement("button");ye.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var tt=$(vr);tt&&ye.appendChild(tt),ye.setAttribute("aria-label","Sonraki"),ye.onclick=function(){ve.scrollBy({left:200,behavior:"smooth"})};var Ze=document.createElement("div");Ze.className="renuvex-pr-photo-strip-wrap",Ze.appendChild(F),Ze.appendChild(ve),Ze.appendChild(ye),D.appendChild(Ze),P.appendChild(D)}if(R.length===0){var Ir=document.createElement("p");Ir.className="renuvex-pr-state-msg",Ir.textContent="Hen\xFCz yorum yok.",P.appendChild(Ir)}else{var f=ir(r.reviewLayout);R.forEach(function(O){P.appendChild(f.render(O,Or))})}var ca=L.data&&L.data.hasMore;if(ca){var J=document.createElement("button");J.className="renuvex-pr-load-more",J.textContent="Daha Fazla G\xF6ster",J.onclick=async function(){J.disabled=!0,J.textContent="Y\xFCkleniyor...";var B=Nr(),O=U,_=oe,j=Mr,ie=me,V=xe,ce=j+1,we=await ar(O,_,ce,ie,V);if(Pr(B,{productId:O,orderBy:_,page:j,ratingFilter:ie,hasImages:V}))if(we&&!Dr(we)&&we.data&&Array.isArray(we.data.reviews)){var at=mt(we.data.reviews);xt(at),er(ce);var ma=ir(I.reviewLayout);at.forEach(function(xa){P.insertBefore(ma.render(xa,Or),J)}),we.data.hasMore?(J.disabled=!1,J.textContent="Daha Fazla G\xF6ster"):J.remove()}else J.disabled=!1,J.textContent="Tekrar Dene"},P.appendChild(J)}C.appendChild(P),Ae(A),_r(P,"reviews-widget",{productId:e||""},function(){return A.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Rr=document.createElement("p");Rr.style.cssText="text-align:center;color:#dc2626;",Rr.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(Rr)}}finally{if(dr(!1),pr){var Le=pr;ur(null),or(Le.productId,Le.settings,Le.reviewsData,Le.productName,Le.orderBy,Le.page,Le.badgeSettings)}}}export{or as render};
