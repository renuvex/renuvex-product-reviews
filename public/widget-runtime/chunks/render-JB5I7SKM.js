/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Pe,d as tr}from"./chunk-FW6W6ZQL.js";import{b as Pr,c as Je}from"./chunk-ZM24JLBV.js";import{A as ir,B as or,a as te,b as ar,c as ne,d as ie,e as H,f as I,g as Kr,h as Ie,j as Tr,k as Jr,l as Ar,m as Ge,n as Zr,o as $r,p as Qr,q as et,r as rt,s as tt,t as at,v as nt,w as it,x as ot,y as lt,z as nr}from"./chunk-NQF4A7IV.js";import{A as ye,B as ur,C as W,D as dr,E as sr,F as Lr,G as Nr,H as oe,I as xt,J as le,K as ft,L as gt,c as Er,e as we,f as K,g as ve,h as J,i as Ce,j as lr,k as Xe,l as pt,m as Re,n as pr,o as ut,p as Se,q as dt,r as st,t as vt,u as ce,v as Be,x as ct,y as me,z as mt}from"./chunk-SJ57Y4UE.js";import{a as Ke}from"./chunk-GSBAPHFO.js";import{a as be,b as We,c as qe,k as ht,l as Ee}from"./chunk-YCWIZ2SG.js";var _e=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function bt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Me(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function vr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function wt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function yt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var zt=`
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
`,kt=`
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
`;var Ct=`
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
`;var St=`
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
`;var Et=`
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
`;var Tt=`
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
`;var cr=[zt,ct,Ct,St,Et,Tt,kt].join(`
`);function pa(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function pe(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function ua(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function da(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",p=ua()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),p&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function sa(e){var r=document.body.style,t=document.documentElement.style;pe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),pe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),pe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),pe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),pe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),pe(r,"position",e.bodyPosition,e.bodyPositionPriority),pe(r,"top",e.bodyTop,e.bodyTopPriority),pe(r,"left",e.bodyLeft,e.bodyLeftPriority),pe(r,"right",e.bodyRight,e.bodyRightPriority),pe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Ze=0,Oe=null;function mr(){return Ze+=1,Ze>1||(Oe=pa(),da(Oe)),Oe}function xr(){if(Ze!==0&&(Ze-=1,!(Ze>0))){var e=Oe;Oe=null,e&&sa(e)}}function va(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function fr(){var e=va();return!e||e===document.body||e===document.documentElement?null:e}function Z(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ca(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Ir(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ca)}function ma(e,r){var t=e,a=Ir(e);!a.length&&r&&(t=r,a=Ir(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;Z(n)}function gr(e,r,t){if(e.key==="Tab"){var a=Ir(r);if(!a.length){e.preventDefault(),ma(r);return}var n=a[0],p=a[a.length-1],l=wt(t);if(!r.contains(l)){e.preventDefault(),Z(n);return}if(a.indexOf(l)===-1){e.preventDefault(),Z(e.shiftKey?p:n);return}e.shiftKey&&l===n?(e.preventDefault(),Z(p)):!e.shiftKey&&l===p&&(e.preventDefault(),Z(n))}}var At="renuvexPrOverlay";function hr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[At]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function xa(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[At]===e.id)}function br(e){if(xa(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Fe(e){return ye(e)}function Lt(e,r,t,a,n){xr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&lr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),Z(n)}function fa(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=ce(e.rating,I);var p=document.createElement("span");p.className="renuvex-pr-modal-date",p.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(p),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var o=document.createElement("div");o.className="renuvex-pr-modal-author",o.textContent=e.author||"",t.appendChild(o);var v=document.createElement("div");v.className="renuvex-pr-modal-body",v.textContent=(e.comment||"").trim(),v.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(v);var d=document.createElement("div");d.className="renuvex-pr-modal-reply";var g=document.createElement("div");g.className="renuvex-pr-modal-reply-label",g.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi";var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",d.appendChild(g),d.appendChild(m),d.style.display=e.merchantReply?"":"none",t.appendChild(d),r.appendChild(t),r}function Nt(e,r,t){var a=t||I,n=e.querySelector(".renuvex-pr-modal-scroll-content"),p=n.querySelector(".renuvex-pr-modal-stars");p.innerHTML=ce(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var o=n.querySelector(".renuvex-pr-modal-body");o.textContent=(r.comment||"").trim(),o.style.display=r.comment&&r.comment.trim()?"":"none";var v=n.querySelector(".renuvex-pr-modal-reply");v.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",v.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",v.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Br(e,r,t,a,n,p,l,o,v){var d=Fe(e),g=Math.max(0,Math.min(t||0,d.length-1)),m=document.createElement("div");m.className="renuvex-pr-modal-left";var i=document.createElement("img"),z=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";i.className="renuvex-pr-modal-main-img"+(z?" "+z:""),i.src=Nr(d[g]||""),i.decoding="async",i.width=Lr,i.height=Math.round(Lr*4/3),i.alt="Yorum foto\u011Fraf\u0131",xt(i,function(T){if(T.style.display="none",!m.querySelector(".renuvex-pr-modal-img-error")){var A=document.createElement("div");A.className="renuvex-pr-modal-img-error",A.setAttribute("role","status"),A.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",m.insertBefore(A,T)}}),m.appendChild(i);var u=document.createElement("button");u.className="renuvex-pr-modal-close-mobile";var h=J(Se);h&&u.appendChild(h),u.setAttribute("aria-label","Kapat"),u.onclick=function(T){T.stopPropagation(),p()},m.appendChild(u);var x=0;if(m.addEventListener("touchstart",function(T){x=T.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(T){var A=x-T.changedTouches[0].clientX;if(!(Math.abs(A)<50)){if(A>0){if(w)xe(e,r,g+1,a,n,p,!0,"next",o,v);else if(f){var N=a[r+1];xe(N,r+1,0,a,n,p,!1,"next",o,v)}}else if(c)xe(e,r,g-1,a,n,p,!0,"prev",o,v);else if(y){var R=a[r-1],P=Fe(R);xe(R,r-1,P.length-1,a,n,p,!1,"prev",o,v)}}},{passive:!0}),d.length>1){var s=document.createElement("div");s.className="renuvex-pr-modal-thumbs",d.forEach(function(T,A){var N=document.createElement("img"),R=oe(T,sr);N.src=R.src,N.srcset=R.srcset,N.loading="lazy",N.decoding="async",N.width=sr,N.height=sr,N.className="renuvex-pr-modal-thumb"+(A===g?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(A+1),le(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(A+1)+" se\xE7"),A===g&&N.setAttribute("aria-current","true"),(function(P){function q(){xe(e,r,P,a,n,p,!0,null,o,v)}N.onclick=q,N.onkeydown=function(G){(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),q())}})(A),s.appendChild(N)}),m.appendChild(s)}var c=g>0,w=g<d.length-1,y=r>0,f=r<a.length-1,k=c||y,b=w||f;if(k){var L=document.createElement("button");L.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var S=J(Re);S&&L.appendChild(S),L.setAttribute("aria-label","\xD6nceki"),L.onclick=function(T){if(T.stopPropagation(),c)xe(e,r,g-1,a,n,p,!0,"prev",o,v);else if(y){var A=a[r-1],N=Fe(A);xe(A,r-1,N.length-1,a,n,p,!1,"prev",o,v)}},m.appendChild(L)}if(b){var C=document.createElement("button");C.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var E=J(pr);E&&C.appendChild(E),C.setAttribute("aria-label","Sonraki"),C.onclick=function(T){if(T.stopPropagation(),w)xe(e,r,g+1,a,n,p,!0,"next",o,v);else if(f){var A=a[r+1];xe(A,r+1,0,a,n,p,!1,"next",o,v)}},m.appendChild(C)}return m}function Pt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Fe(a);n[0]&&(new Image().src=Nr(n[0]))}})}function Rr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ga(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function p(){Rr(t),Rr(a),Rr(n)}p(),t&&Z(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){p(),requestAnimationFrame(p)}):setTimeout(p,0)}function xe(e,r,t,a,n,p,l,o,v,d){if(d&&(d.currentReview=e),l){var g=Br(e,r,t,a,n,p,o,v,d);n.firstChild&&n.replaceChild(g,n.firstChild)}else{var g=Br(e,r,t,a,n,p,o,v,d),m=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(g,n.firstChild),m&&Nt(m,e,d&&d.currentSettings),ga(v,n)}Pt(r,a)}function ue(e,r,t){var a=Fe(e);if(!a.length)return;var n=(t||[]).filter(function(b){return Fe(b).length>0}),p=n.findIndex(function(b){return b===e||b.id===e.id});p===-1&&(n.unshift(e),p=0);var l=a.indexOf(r);l<0&&(l=0);var o=document.createElement("div");o.className="renuvex-pr-modal-overlay";var v=document.createElement("div");v.className="renuvex-pr-modal";var d=!1,g=null,m=fr(),i=mr(),z=hr(),u={currentReview:e,currentSettings:I},h=null;function x(b){var L=b&&b.detail&&b.detail.settings;if(!(L&&L===h)){h=L||null,u.currentSettings=L||I;var S=v.querySelector(".renuvex-pr-modal-right");!S||!u.currentReview||Nt(S,u.currentReview,u.currentSettings)}}function s(){d||(d=!0,window.removeEventListener(Ee,x),Lt(g&&g.host,c,s,i,m))}function c(b){if(b.key==="Escape"){w();return}gr(b,o,g&&g.root)}function w(){d||(d=!0,window.removeEventListener(Ee,x),Lt(g&&g.host,c,s,i,m),br(z))}document.addEventListener("keydown",c),window.addEventListener("popstate",s),window.addEventListener(Ee,x),o.onclick=function(){w()},v.onclick=function(b){b.stopPropagation()},v.appendChild(Br(e,p,l,n,v,w,null,o,u)),v.appendChild(fa(e)),Pt(p,n);var y=document.createElement("div");y.className="renuvex-pr-modal-wrap",y.tabIndex=-1,y.setAttribute("role","dialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),y.appendChild(v);var f=document.createElement("button");f.className="renuvex-pr-modal-close";var k=J(Se);k&&f.appendChild(k),f.setAttribute("aria-label","Kapat"),f.onclick=function(b){b.stopPropagation(),w()},y.appendChild(f),o.appendChild(y),g=vr(),Me(g.root,_e+Pe+cr),g.root.appendChild(o),Ce(g.root),Z(y)}function ze(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Or={};be(Or,{css:()=>Ea,meta:()=>Sa,render:()=>Ta});function He(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,p=e.onFilterChange;we(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var o=5;o>=1;o--){var v=r[o-1]||0,d=t>0?Math.round(v/t*100):0,g=n===o,m=document.createElement("div");m.className="renuvex-pr-bar-row"+(g?" renuvex-pr-bar-active":""),n&&!g&&(m.style.opacity="0.35");for(var i="",z=1;z<=5;z++){var u=z<=o;i+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(u?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+K(u?"full":"outline")+"</span>"}m.innerHTML='<span class="renuvex-pr-bar-label">'+i+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+d+'%;"></div></div><span class="renuvex-pr-bar-count">('+v.toLocaleString("tr-TR")+")</span>",(function(h){m.onclick=function(){p(h)}})(o),l.appendChild(m)}return l}var de=[],It=!1,wr=!1;function Rt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function ha(e){if(wr){wr=!1,e.preventDefault(),e.stopPropagation();return}for(var r=!1,t=de.length-1;t>=0;t--){var a=de[t];Rt(e,a.trigger)||Rt(e,a.element)||a.close()&&(r=!0)}r&&(e.preventDefault(),e.stopPropagation())}function ba(e){if(e.key==="Escape")for(var r=de.length-1;r>=0;r--)de[r].close()}function wa(){It||typeof document=="undefined"||(document.addEventListener("click",ha,!0),document.addEventListener("keydown",ba),It=!0)}function yr(e){for(var r=0;r<de.length;r++)de[r]!==e&&de[r].close()}function Bt(){wr=!0,typeof setTimeout=="function"&&setTimeout(function(){wr=!1},700)}function zr(e){wa();var r={trigger:e.trigger,element:e.element,close:e.close};return de.push(r),function(){var a=de.indexOf(r);a!==-1&&de.splice(a,1)}}function ae(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,p=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var o=document.createElement("button");o.className="renuvex-pr-write-btn",o.textContent=I&&I.writeButtonText||"Yorum Yap",o.onclick=n,l.appendChild(o);var v=document.createElement("div");v.className="renuvex-pr-filter-wrap";var d=document.createElement("button");d.type="button",d.className="renuvex-pr-filter-btn",d.setAttribute("aria-label","Filtrele"),d.setAttribute("aria-haspopup","menu"),d.setAttribute("aria-expanded","false");var g=I&&I.filterIcon||"lines";d.innerHTML=ve(pt(g));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var i=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],z=!1;function u(s){var c=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),d.classList.remove("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","false");var w=s&&(s.restoreFocus===!0||s.restoreFocus==="auto"&&tr());if(c&&w)try{d.focus({preventScroll:!0})}catch(y){try{d.focus()}catch(f){}}return c}function h(){yr(x),m.classList.add("renuvex-pr-open"),d.classList.add("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","true");var s=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");s&&requestAnimationFrame(function(){try{s.focus({preventScroll:!0})}catch(c){try{s.focus()}catch(w){}}})}i.forEach(function(s){var c=s[2],w=c?a:!a&&(t||"newest")===s[0],y=document.createElement("button");y.type="button",y.className="renuvex-pr-filter-item"+(w?" renuvex-pr-filter-item-active":""),y.setAttribute("role","menuitem"),y.textContent=s[1];var f=!1;function k(b,L){b&&(b.preventDefault(),b.stopPropagation()),!f&&(f=!0,z=!0,L!==!0&&Bt(),u({restoreFocus:L}),p(s[0],c),setTimeout(function(){f=!1,z=!1},0))}y.addEventListener("pointerdown",function(b){b.button!==void 0&&b.button!==0||k(b,!1)}),typeof window!="undefined"&&!window.PointerEvent&&y.addEventListener("touchstart",function(b){k(b,!1)},{passive:!1}),y.addEventListener("mousedown",function(b){b.button!==void 0&&b.button!==0||k(b,!1)}),y.addEventListener("keydown",function(b){(b.key==="Enter"||b.key===" ")&&k(b,!0)}),y.onclick=function(b){k(b,!1)},m.appendChild(y)}),d.onclick=function(){m.classList.contains("renuvex-pr-open")?u({restoreFocus:"auto"}):h()},v.addEventListener("keydown",function(s){s.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(s.stopPropagation(),u({restoreFocus:!0}))}),v.addEventListener("focusout",function(s){if(m.classList.contains("renuvex-pr-open")&&!z){var c=s.relatedTarget;c&&v.contains(c)||u()}});var x=zr({trigger:v,element:m,close:u});return v.appendChild(d),v.appendChild(m),l.appendChild(v),l}var _t=`
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
`;function Mt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",n.appendChild(p);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var o=J(Se);o&&l.appendChild(o),n.appendChild(l);var v=!1,d=null,g=null,m=!1;function i(){Z(a)}function z(f){gr(f,a,d&&d.root)}function u(){if(!v){if(v=!0,document.removeEventListener("keydown",h),a.removeEventListener("click",x),l.removeEventListener("click",u),m)Z(g);else{var f=d&&d.root?d.root.activeElement:null;if(f&&typeof f.blur=="function")try{f.blur()}catch(k){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){d?(lr(d.root),d.host&&d.host.parentNode&&d.host.parentNode.removeChild(d.host)):a.parentNode&&a.parentNode.removeChild(a),xr();try{r()}catch(k){}},200)}}function h(f){if(f.key==="Escape"){u();return}z(f)}function x(f){f.target===a&&t&&u()}document.addEventListener("keydown",h),a.addEventListener("click",x),l.addEventListener("click",u);function s(f){g=fr(),m=tr(),f&&p.appendChild(f),d=vr(),Me(d.root,_e+Pe+_t),d.root.appendChild(a),Ce(d.root),mr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),i()})}var c=null,w=null;function y(f,k){if(k=k||"error",c){try{c.remove()}catch(b){}c=null}w&&(clearTimeout(w),w=null),c=document.createElement("div"),c.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,c.textContent=f,n.appendChild(c),w=setTimeout(function(){c&&(c.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(c){try{c.remove()}catch(b){}c=null}},300))},4e3)}return{open:s,close:u,content:p,setAllowOutsideClose:function(f){t=!!f},setStepAttr:function(f){n.setAttribute("data-step",String(f))},showToast:y}}var _r=4;function Ye(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Ot(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(p){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<_r&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(p){return p!==n})}}}}function Ft(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},p=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=ve(Re)+"<span>Geri</span>",o.addEventListener("click",function(){a()}),l.appendChild(o);var v=document.createElement("div");v.className="renuvex-pr-fwizard-footer-progress";for(var d=[],g=0;g<_r;g++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",v.appendChild(m),d.push(m)}l.appendChild(v);var i=document.createElement("button");i.type="button";var z=null;function u(x){z&&i.removeEventListener("click",z),z=x,x&&i.addEventListener("click",x)}l.appendChild(i);function h(x,s){var c=r.indexOf(x)!==-1,w=t.indexOf(x)!==-1,y=s&&(s.images&&s.images.length>0||s.pendingImages&&s.pendingImages.length>0);if(c)x===2&&y?(i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",u(function(){p()})):(i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.setAttribute("aria-label","Atla"),i.innerHTML="<span>Atla</span>",u(function(){n()})),i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),i.style.visibility="",i.tabIndex=0;else if(w){i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Sonraki"),i.innerHTML="Sonraki",i.style.visibility="",i.tabIndex=0;var f=Ye(x,s);i.disabled=!f,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!f),u(function(){i.disabled||p()})}else i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.innerHTML="",i.style.visibility="hidden",i.tabIndex=-1,i.disabled=!0,u(null)}return{el:l,update:function(x,s){d.forEach(function(w,y){y+1<=x?w.classList.add("renuvex-pr-fwizard-progress-seg-active"):w.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var c=x<=1;o.style.visibility=c?"hidden":"",o.style.pointerEvents=c?"none":"",o.tabIndex=c?-1:0,h(x,s)},setNextDisabled:function(x){i.classList.contains("renuvex-pr-fwizard-cta-btn")&&(i.disabled=!!x,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!x))},setThanksState:function(x){o.style.visibility="hidden",v.style.visibility="hidden",i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",i.style.visibility="",i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u(x)}}}function Ht(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title",p.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var o=Xe(I||{});we(o);var v=[];function d(x){v.forEach(function(s,c){var w=c<x;s.classList.toggle("renuvex-pr-fwizard-star-active",w),s.setAttribute("aria-checked",c+1===x?"true":"false"),s.innerHTML=w?K("full"):K("outline")})}function g(x){e.set({rating:x}),d(x)}function m(x){var s=v[x-1];if(s)try{s.focus()}catch(c){}}function i(x,s){s&&typeof s.preventDefault=="function"&&s.preventDefault(),s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),!a&&(a=!0,g(x),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var z=1;z<=5;z++)(function(x){var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-star",s.setAttribute("role","radio"),s.setAttribute("aria-label",x+" y\u0131ld\u0131z"),s.innerHTML=K("outline"),s.addEventListener("mouseenter",function(){d(x)}),s.addEventListener("mouseleave",function(){d(e.get().rating)}),s.addEventListener("pointerdown",function(c){c.button&&c.button!==0||i(x,c)}),typeof window!="undefined"&&!window.PointerEvent&&s.addEventListener("touchstart",function(c){i(x,c)},{passive:!1}),s.addEventListener("mousedown",function(c){window.PointerEvent||i(x,c)}),s.addEventListener("keydown",function(c){if(c.key==="Enter"||c.key===" "){i(x,c);return}var w=0;c.key==="ArrowRight"||c.key==="ArrowUp"?w=Math.min(5,x+1):c.key==="ArrowLeft"||c.key==="ArrowDown"?w=Math.max(1,x-1):c.key==="Home"?w=1:c.key==="End"&&(w=5),w&&(c.preventDefault(),g(w),m(w))}),s.addEventListener("click",function(c){i(x,c)}),v.push(s),l.appendChild(s)})(z);d(e.get().rating);var u=null,h=function(x){var s=x&&x.detail&&x.detail.settings;s&&s===u||(u=s||null,o=Xe(s||I||{}),d(e.get().rating))};return window.addEventListener(Ee,h),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Ee,h)}}}var Yt=3,ya=10*1024*1024;function Dt(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",l.appendChild(o),l.appendChild(v);var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-previews",d.setAttribute("aria-live","polite"),l.appendChild(d),a.appendChild(l);var g=r.revokeBlobUrl||function(c){c&&typeof c=="string"&&c.startsWith("blob:")&&URL.revokeObjectURL(c)},m=r.blobMap||{},i=r.urlToFinger||{};function z(){if(!t){var c=e.get().images||[],w=e.get().pendingImages||[],y=c.map(function(f){return{url:f,isPending:!1}}).concat(w.map(function(f){return{url:f.url,file:f.file,isPending:!0,error:f.error}}));d.innerHTML="",y.forEach(function(f){var k=m[f.url]||f.url,b=u(f,k);d.appendChild(b)}),x()}}function u(c,w){var y=document.createElement("div");y.className="renuvex-pr-fwizard-photo-thumb";var f=document.createElement("img");f.src=w,f.alt="",f.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",y.appendChild(f);var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-loading",k.style.display="none",y.appendChild(k);var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-photo-remove",b.setAttribute("aria-label","Kald\u0131r");var L=J(Se);return L&&b.appendChild(L),y.appendChild(b),h(y,c,w),y}function h(c,w,y){var f=c.querySelector("img");f.src!==y&&(f.src=y);var k=c.querySelector(".renuvex-pr-fwizard-photo-loading");if(w.isPending&&w.error){k.style.display="flex",k.textContent="";var b=document.createElement("span");b.className="renuvex-pr-upload-error",b.textContent="\u2717 "+w.error,k.appendChild(b)}else k.style.display="none",k.textContent="";var L=c.querySelector(".renuvex-pr-fwizard-photo-remove");L.onclick=function(){var S=i[w.url]||(w.file?w.file.name+"_"+w.file.size:null),C=m[w.url],E={};S&&(E.fingerprints=(e.get().fingerprints||[]).filter(function(T){return T!==S})),w.isPending?E.pendingImages=(e.get().pendingImages||[]).filter(function(T){return T.url!==w.url}):E.images=(e.get().images||[]).filter(function(T){return T!==w.url}),e.set(E),g(w.url),g(C),delete i[w.url],C&&delete i[C],m[w.url]&&delete m[w.url]}}function x(){var c=(e.get().images||[]).length,w=(e.get().pendingImages||[]).length,y=c+w,f=y>=Yt;y>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=ve(st)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=ve(dt)+"<span>Foto\u011Fraf Ekle</span>"),f?(o.style.display="none",o.disabled=!0,v.disabled=!0):(o.style.display="flex",o.disabled=!1,v.disabled=!1,o.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}o.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(c){var w=(e.get().images||[]).length+(e.get().pendingImages||[]).length,y=Array.from(c.target.files).slice(0,Yt-w);v.value="";var f=(e.get().pendingImages||[]).length,k=e.get().images||[],b=k.length;if(y.length!==0){for(var L=[],S=[],C=0;C<y.length;C++){var E=y[C],T=E.name+"_"+E.size,A=(e.get().fingerprints||[]).some(function(M){return M===T})||L.some(function(M){return M.file.name+"_"+M.file.size===T});if(!A){if(E.size>ya){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var R=URL.createObjectURL(E);i[R]=T,L.push({url:R,file:E,error:null}),S.push({url:R,file:E});var P=(e.get().fingerprints||[]).slice();P.push(T),e.set({fingerprints:P})}}if(L.length!==0){var q=(e.get().pendingImages||[]).concat(L),G=async function(){for(var M=0;M<S.length;M++){var j=S[M],Ae=j.file,Q=j.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Ve=(e.get().pendingImages||[]).filter(function(B){return B.url!==Q}),Le=(e.get().images||[]).slice();Le.push(Q),e.set({pendingImages:Ve,images:Le});continue}try{var ee=await Ke(qe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:We})});if(!ee.ok)throw ee.status===429?new Error("rate_limit"):new Error("sign failed");var V=await ee.json();if(!V.folder)throw new Error("sign folder missing");var U=new FormData;U.append("file",Ae),U.append("api_key",V.api_key),U.append("timestamp",V.timestamp),U.append("signature",V.signature),U.append("folder",V.folder);var Ue=await fetch("https://api.cloudinary.com/v1_1/"+V.cloud_name+"/image/upload",{method:"POST",body:U}),F=await Ue.json();if(F.secure_url&&mt(F.secure_url)){var ke=(e.get().pendingImages||[]).some(function(B){return B.url===Q});if(!ke)continue;m[F.secure_url]=Q,i[F.secure_url]=i[Q];var re=(e.get().pendingImages||[]).filter(function(B){return B.url!==Q}),Ne=(e.get().images||[]).slice();Ne.push(F.secure_url),e.set({pendingImages:re,images:Ne});try{Ke(qe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:We,secureUrl:F.secure_url})}).catch(function(){})}catch(B){}}else throw new Error("invalid image url")}catch(B){console.error("[renuvex-pr] Image upload failed:",B);var fe=B.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(fe,"error");var _=(e.get().pendingImages||[]).map(function(O){return O.url===Q?{url:O.url,file:O.file,error:fe}:O});e.set({pendingImages:_})}}};if(b===0&&f===0){t=!0;var $=!r.canNavigate||r.canNavigate();$&&e.goNext()}e.set({pendingImages:q}),G()}}};var s=e.onChange(z);return z(),{el:a,destroy:function(){t=!0,v.onchange=null,s&&s()}}}var Mr=2e3,za=60;function jt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=za,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),p.appendChild(l);var o=document.createElement("textarea");o.className="renuvex-pr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=Mr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",p.appendChild(o);var v=document.createElement("div");v.className="renuvex-pr-fwizard-char-counter",v.setAttribute("aria-live","polite"),p.appendChild(v);function d(){var m=o.value.length;v.textContent=m+"/"+Mr,v.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=Mr)}function g(){return Ye(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),d(),t(g())}),a.appendChild(p),d(),setTimeout(function(){t(g())},0),{el:a,destroy:function(){}}}var ka=40;function Vt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",p.textContent="Hakk\u0131n\u0131zda",n.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var o=document.createElement("div");o.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.maxLength=ka,d.setAttribute("aria-required","true"),d.value=e.get().author||"",o.appendChild(v),o.appendChild(d),l.appendChild(o);var g=document.createElement("div");g.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var i=document.createElement("input");i.type="email",i.className="renuvex-pr-fwizard-input",i.setAttribute("autocomplete","email"),i.value=e.get().email||"",g.appendChild(m),g.appendChild(i),l.appendChild(g);var z=document.createElement("div");z.className="renuvex-pr-fwizard-notice",z.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(z);var u=document.createElement("div");u.className="renuvex-pr-fwizard-msg",u.setAttribute("role","alert"),u.setAttribute("aria-live","assertive"),l.appendChild(u);var h=document.createElement("button");h.type="button",h.className="renuvex-pr-fwizard-submit-btn",h.textContent="G\xF6nder",l.appendChild(h),n.appendChild(l);function x(){return Ye(4,e.get())}function s(){var f=!x(),k=(e.get().pendingImages||[]).length,b=k>0;b?(h.disabled=!0,h.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),h.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(h.disabled=f,h.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",f),h.textContent="G\xF6nder")}d.addEventListener("input",function(){e.set({author:d.value}),s(),t(x())}),i.addEventListener("input",function(){e.set({email:i.value})}),s(),setTimeout(function(){t(x())},0);function c(){u.textContent=""}function w(f){c();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=f||"",u.appendChild(k)}h.onclick=async function(){if(!h.disabled){var f=e.get(),k=(f.author||"").trim(),b=(f.comment||"").trim();if(i.value.trim()&&!i.checkValidity()){i.reportValidity();return}if(!k){w("Gerekli alan");return}if(!f.rating){w("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}h.disabled=!0,h.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var L=h.textContent;if(h.textContent="G\xF6nderiliyor\u2026",c(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var S=vt(window.location.href),C=f.productName||null,E=await Ke(qe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:We,productId:f.productId||null,slug:S||null,productName:C,author:k,title:(f.title||"").trim()||null,comment:b||null,rating:f.rating,images:f.images||[]})},15e3);if(E.ok)a();else{var T=await E.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(R){var A=R&&(R.name==="AbortError"||/signal/i.test(R.message||"")),N=A?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":R.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(N,"error"):w(N),h.disabled=!1,h.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),h.textContent=L}}};var y=e.onChange(s);return{el:n,destroy:function(){h.onclick=null,y&&y()}}}function Ca(e,r,t){if(t=t||{},e===1)return Ht(r,{canNavigate:t.canNavigate});if(e===2)return Dt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return jt(r,{onValidityChange:t.onValidityChange});if(e===4)return Vt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Ut(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Wt(e){e=e||{};var r=Ot({productId:e.productId,productName:e.productName}),t={},a={},n={};function p(S){if(!(!S||typeof S!="string"||!S.startsWith("blob:")||n[S])){n[S]=!0;try{URL.revokeObjectURL(S)}catch(C){}}}function l(){Object.keys(a).forEach(function(C){p(C)}),Object.keys(t).forEach(function(C){p(t[C])});var S=r.get();(S.pendingImages||[]).forEach(function(C){p(C&&C.url)}),(S.images||[]).forEach(function(C){p(C)})}var o=Mt({onClose:function(){window.removeEventListener("popstate",d),br(v),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),v=hr(),d=function(S){o&&o.close&&o.close()};window.addEventListener("popstate",d);var g=document.createElement("div");g.className="renuvex-pr-fwizard-step-wrap";var m=Ft({skippableSteps:[2],nextableSteps:[3],onBack:function(){u==="idle"&&r.goBack()},onSkip:function(){u==="idle"&&r.goNext()},onNext:function(){u==="idle"&&r.goNext()}}),i=document.createElement("div");i.className="renuvex-pr-fwizard-layout",i.appendChild(g),i.appendChild(m.el);var z=null,u="idle",h=null,x=!0,s=null;function c(S,C){g.innerHTML="";var E=Ca(S,r,{canNavigate:function(){return u==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:p,onValidityChange:function(N){m.setNextDisabled(!N)},onSuccess:y,showToast:o.showToast});if(z=E,m.update(S,r.get()),C){u="entering",E.el.classList.add("renuvex-pr-fwizard-step--enter");var T=null,A=function(){T&&clearTimeout(T),E.el.removeEventListener("animationend",A),E.el.classList.remove("renuvex-pr-fwizard-step--enter"),u="idle",h!==null&&f()};E.el.addEventListener("animationend",A),T=setTimeout(A,700)}else u="idle";g.appendChild(E.el),o.setStepAttr&&o.setStepAttr(S),S===3&&m.setNextDisabled(!0)}var w=!1;function y(){if(!w){if(w=!0,!z){g.innerHTML="";var S=Ut();S.classList.add("renuvex-pr-fwizard-step--enter"),g.appendChild(S),o.setStepAttr("thanks"),m.setThanksState(o.close);return}var C=z;u="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var E=function(){if(s&&clearTimeout(s),C.el.removeEventListener("animationend",E),C.destroy)try{C.destroy()}catch(A){}z===C&&(z=null),g.innerHTML="";var T=Ut();T.classList.add("renuvex-pr-fwizard-step--enter"),g.appendChild(T),o.setStepAttr("thanks"),m.setThanksState(o.close),u="idle"};C.el.addEventListener("animationend",E),s=setTimeout(E,300)}}function f(){var S=r.get().currentStep;if(u!=="idle"){h=S;return}if(!z){var C=!x;x=!1,c(S,C);return}var E=z;u="exiting",E.el.classList.add("renuvex-pr-fwizard-step--exit");var T=function(){if(s&&clearTimeout(s),E.el.removeEventListener("animationend",T),E.destroy)try{E.destroy()}catch(N){}if(z===E){g.innerHTML="",z=null;var A=h!==null?h:r.get().currentStep;h=null,c(A,!0),u="idle"}};E.el.addEventListener("animationend",T),s=setTimeout(T,350)}f();var k=r.get().currentStep,b=r.onChange(function(S){S.currentStep!==k?(k=S.currentStep,f()):m.update(S.currentStep,S)}),L=o.close;return o.close=function(){b&&b(),typeof s!="undefined"&&s&&clearTimeout(s),L()},o.open(i),{close:o.close}}function Y(){Wt({productId:H||"",productName:Ie||""})}var qt=`
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
`;var Sa={id:"classic",name:"Klasik (A\xE7\u0131k)"},Ea=qt;function Ta(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,p=e.allCount,l=e.ratingCounts,o=e.avgRatingVal,v=e.currentRatingFilter,d=e.currentOrderBy,g=e.currentHasImages,m=e.onFilterChange,i=e.onSortChange;we(n);var z=document.createElement("div");z.className="renuvex-pr-summary";var u=(l[3]||0)+(l[4]||0),h=p>0?Math.round(u/p*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+K("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",z.appendChild(x);var s=document.createElement("div");if(s.className="renuvex-pr-summary-block renuvex-pr-summary-count",s.textContent=p.toLocaleString("tr-TR")+" Yorum",z.appendChild(s),a.showRecommendation!==!1&&h>0){var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",c.innerHTML='<span class="renuvex-pr-recommend-pct">%'+h+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(c)}return z.appendChild(He({ratingCounts:l,allCount:p,iconPair:n,currentRatingFilter:v,onFilterChange:m})),z.appendChild(ae({widget:r,currentOrderBy:d,currentHasImages:g,onWriteClick:Y,onSortChange:i})),z}var Fr={};be(Fr,{css:()=>La,meta:()=>Aa,render:()=>Na});var Gt=`
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
`;var Aa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},La=Gt;function Na(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,p=e.ratingCounts,l=e.avgRatingVal,o=e.currentRatingFilter,v=e.currentOrderBy,d=e.currentHasImages,g=e.onFilterChange,m=e.onSortChange,i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-compact";var z=document.createElement("div");z.className="renuvex-pr-compact-header";var u=document.createElement("div");u.className="renuvex-pr-compact-trigger-wrap";var h=document.createElement("button");h.className="renuvex-pr-compact-trigger",h.type="button",h.setAttribute("aria-expanded","false"),h.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Be(l,a)+'</span><span class="renuvex-pr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+ve(ut)+"</span>",u.appendChild(h),z.appendChild(u);var x=ae({widget:r,currentOrderBy:v,currentHasImages:d,onWriteClick:Y,onSortChange:m}),s=x.querySelector(".renuvex-pr-filter-wrap"),c=x.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-compact-actions-slot",c&&w.appendChild(c),s&&w.appendChild(s),z.appendChild(w),i.appendChild(z);var y=document.createElement("div");y.className="renuvex-pr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var f=document.createElement("div");f.className="renuvex-pr-compact-panel-inner";var k=document.createElement("div");k.className="renuvex-pr-compact-avg",k.innerHTML='<span class="renuvex-pr-icon">'+K("full")+"</span><span>"+l+"</span>",f.appendChild(k),f.appendChild(He({ratingCounts:p,allCount:n,iconPair:a,currentRatingFilter:o,onFilterChange:g})),y.appendChild(f);var b=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function L(M){var j=M?i:u;y.parentNode!==j&&(y.classList.contains("renuvex-pr-open")&&(y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),h.setAttribute("aria-expanded","false")),j.appendChild(y))}if(L(b?b.matches:!1),b){var S=function(M){L(M.matches)};b.addEventListener?b.addEventListener("change",S):b.addListener&&b.addListener(S)}if(c){var C=document.createElement("button");C.className="renuvex-pr-write-btn",C.textContent=I&&I.writeButtonText||"Yorum Yap",C.onclick=Y;var E=document.createElement("div");E.className="renuvex-pr-compact-write-row",E.appendChild(C),i.appendChild(E)}function T(){y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),h.setAttribute("aria-expanded","false")}function A(){yr(N),y.classList.add("renuvex-pr-open"),y.setAttribute("aria-hidden","false"),h.setAttribute("aria-expanded","true")}h.onclick=function(){y.classList.contains("renuvex-pr-open")?T():A()};var N=null;function R(M){N&&(N(),N=null),M||(N=zr({trigger:u,element:y,close:T}))}if(R(b?b.matches:!1),b){var P=function(M){R(M.matches)};b.addEventListener?b.addEventListener("change",P):b.addListener&&b.addListener(P)}if(t.showRecommendation!==!1){var q=(p[3]||0)+(p[4]||0),G=n>0?Math.round(q/n*100):0;if(G>0){var $=document.createElement("div");$.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",$.style.marginTop="8px",$.innerHTML='<span class="renuvex-pr-recommend-pct">%'+G+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",f.appendChild($)}}return i}var Hr={};be(Hr,{css:()=>Ia,meta:()=>Pa,render:()=>Ra});var Xt=`
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
`;var Pa={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Ia=Xt;function Ra(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,p=e.ratingCounts,l=e.avgRatingVal,o=e.currentRatingFilter,v=e.currentOrderBy,d=e.currentHasImages,g=e.onFilterChange,m=e.onSortChange;we(a);var i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-split";var z=document.createElement("div");z.className="renuvex-pr-split-col renuvex-pr-split-left";var u=document.createElement("div");u.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",u.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+K("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",z.appendChild(u);var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",h.textContent=n.toLocaleString("tr-TR")+" Yorum",z.appendChild(h),i.appendChild(z);var x=document.createElement("div");x.className="renuvex-pr-split-col renuvex-pr-split-mid",x.appendChild(He({ratingCounts:p,allCount:n,iconPair:a,currentRatingFilter:o,onFilterChange:g})),i.appendChild(x);var s=ae({widget:r,currentOrderBy:v,currentHasImages:d,onWriteClick:Y,onSortChange:m}),c=s.querySelector(".renuvex-pr-filter-wrap"),w=s.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-right",w&&y.appendChild(w),c&&y.appendChild(c),i.appendChild(y);var f=(p[3]||0)+(p[4]||0),k=n>0?Math.round(f/n*100):0,b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",b.innerHTML='<span class="renuvex-pr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var L=t.showRecommendation===!1||k===0;return L&&b.classList.add("renuvex-pr-split-rec-hidden"),z.appendChild(b),i}var Yr={};be(Yr,{css:()=>_a,meta:()=>Ba,render:()=>Ma});var Kt=`
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
`;var Ba={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},_a=Kt;function Ma(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,p=e.currentOrderBy,l=e.currentHasImages,o=e.onSortChange,v=document.createElement("div");v.className="renuvex-pr-summary renuvex-pr-summary-minimal";var d=document.createElement("div");d.className="renuvex-pr-minimal-info";var g=document.createElement("div");g.className="renuvex-pr-minimal-row";var m=document.createElement("span");m.className="renuvex-pr-minimal-avg",m.textContent=n,g.appendChild(m);var i=document.createElement("span");i.className="renuvex-pr-minimal-stars",i.innerHTML=Be(n,t),g.appendChild(i);var z=document.createElement("span");z.className="renuvex-pr-minimal-count",z.textContent=a.toLocaleString("tr-TR")+" Yorum",g.appendChild(z),d.appendChild(g),v.appendChild(d);var u=ae({widget:r,currentOrderBy:p,currentHasImages:l,onWriteClick:Y,onSortChange:o}),h=u.querySelector(".renuvex-pr-filter-wrap"),x=u.querySelector(".renuvex-pr-write-btn"),s=document.createElement("div");if(s.className="renuvex-pr-minimal-actions",x&&s.appendChild(x),h&&s.appendChild(h),v.appendChild(s),x){var c=document.createElement("button");c.className="renuvex-pr-write-btn",c.textContent=I&&I.writeButtonText||"Yorum Yap",c.onclick=Y;var w=document.createElement("div");w.className="renuvex-pr-minimal-write-row",w.appendChild(c),v.appendChild(w)}return v}var Dr={};be(Dr,{css:()=>Fa,meta:()=>Oa,render:()=>Ha});var Jt=`
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
`;var Oa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Fa=Jt;function Ha(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,p=e.currentOrderBy,l=e.currentHasImages,o=e.onSortChange,v=document.createElement("div");v.className="renuvex-pr-summary renuvex-pr-summary-hero";var d=document.createElement("div");d.className="renuvex-pr-hero-info";var g=document.createElement("div");g.className="renuvex-pr-hero-rating-col";var m=document.createElement("span");m.className="renuvex-pr-hero-avg",m.textContent=n,g.appendChild(m);var i=document.createElement("div");i.className="renuvex-pr-hero-meta-row";var z=document.createElement("span");z.className="renuvex-pr-hero-stars",z.innerHTML=Be(n,t),i.appendChild(z);var u=document.createElement("div");u.className="renuvex-pr-hero-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",i.appendChild(u),g.appendChild(i),d.appendChild(g),v.appendChild(d);var h=ae({widget:r,currentOrderBy:p,currentHasImages:l,onWriteClick:Y,onSortChange:o}),x=h.querySelector(".renuvex-pr-filter-wrap"),s=h.querySelector(".renuvex-pr-write-btn"),c=document.createElement("div");c.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",s&&c.appendChild(s),x&&c.appendChild(x),v.appendChild(c);var w=ae({widget:r,currentOrderBy:p,currentHasImages:l,onWriteClick:Y,onSortChange:o}),y=w.querySelector(".renuvex-pr-filter-wrap"),f=w.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");return k.className="renuvex-pr-hero-write-row",f&&k.appendChild(f),y&&k.appendChild(y),v.appendChild(k),v}var kr={classic:Or,compact:Fr,split:Hr,minimal:Yr,hero:Dr};function Cr(e){return kr[e]||kr.classic}function Zt(){return Object.keys(kr).map(function(e){return kr[e].css||""}).join(`
`)}var jr={};be(jr,{css:()=>Da,meta:()=>Ya,render:()=>ja});function De(e,r,t){var a=t||{},n=document.createDocumentFragment(),p=document.createElement("div");p.className=r+" renuvex-pr-body-clamped",p.textContent=e,n.appendChild(p);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var o=!1;l.onclick=function(){o=!o,p.classList.toggle("renuvex-pr-body-clamped",!o),l.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:p,readMore:l}}function je(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=I&&I.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",p.textContent=e,t.appendChild(p);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var o=!1;l.onclick=function(){o=!o,p.classList.toggle("renuvex-pr-reply-text-clamped",!o),l.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var $t=`
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
`;var Ya={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Da=$t;function ja(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var p=document.createElement("span");p.className="renuvex-pr-review-stars",p.innerHTML=ce(e.rating,I),n.appendChild(p);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=me(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-title",o.textContent=e.title,t.appendChild(o)}var v=document.createElement("div");v.className="renuvex-pr-author",v.textContent=e.author||"",t.appendChild(v);var d=(e.comment||"").trim();d&&t.appendChild(De(d,"renuvex-pr-body").fragment);var g=ye(e);if(g.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",g.forEach(function(z){var u=document.createElement("img"),h=oe(z,W);u.src=h.src,u.srcset=h.srcset,u.loading="lazy",u.decoding="async",u.width=W,u.height=W,u.className="renuvex-pr-img",le(u),u.setAttribute("data-renuvex-img-url",z),(function(x){ze(u,function(){ue(e,x,r)})})(z),m.appendChild(u)}),t.appendChild(m)}var i=je(e.merchantReply);return i&&t.appendChild(i),t}var Vr={};be(Vr,{css:()=>Ua,meta:()=>Va,render:()=>Wa});var Qt=`
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
`;var Va={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Ua=Qt;function Wa(e,r){var t=ye(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=ce(e.rating,I),p.appendChild(l);var o=document.createElement("span");o.className="renuvex-pr-review-list-author-name",o.textContent=e.author||"",p.appendChild(o);var v=document.createElement("time");v.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&v.setAttribute("datetime",e.createdAt),v.textContent=me(e.createdAt),p.appendChild(v),n.appendChild(p);var d=document.createElement("div");if(d.className="renuvex-pr-review-list-content",e.title){var g=document.createElement("div");g.className="renuvex-pr-review-list-title",g.textContent=e.title,d.appendChild(g)}var m=(e.comment||"").trim();m&&d.appendChild(De(m,"renuvex-pr-review-list-body").fragment);var i=je(e.merchantReply);if(i&&d.appendChild(i),n.appendChild(d),a){var z=document.createElement("div");z.className="renuvex-pr-review-list-media",t.forEach(function(u){var h=document.createElement("img"),x=oe(u,W);h.src=x.src,h.srcset=x.srcset,h.loading="lazy",h.decoding="async",h.width=W,h.height=Math.round(W*4/3),h.setAttribute("data-renuvex-img-url",u),le(h),(function(s){ze(h,function(){ue(e,s,r)})})(u),z.appendChild(h)}),n.appendChild(z)}return n}var Ur={};be(Ur,{css:()=>Ga,meta:()=>qa,render:()=>Xa});var ea=`
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
`;var qa={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ga=ea;function Xa(e,r){var t=ur(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=ce(e.rating,I),p.appendChild(l),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-gallery-title",o.textContent=e.title,p.appendChild(o)}var v=document.createElement("div");v.className="renuvex-pr-review-gallery-author",v.textContent=e.author||"",p.appendChild(v);var d=document.createElement("time");d.className="renuvex-pr-review-gallery-date",d.style.display="block",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=me(e.createdAt),p.appendChild(d);var g=(e.comment||"").trim();if(g&&p.appendChild(De(g,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ue(e,t,r)}}:null).fragment),n.appendChild(p),a){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var i=document.createElement("img"),z=oe(t,dr);i.src=z.src,i.srcset=z.srcset,i.loading="lazy",i.decoding="async",i.width=dr,i.height=Math.round(dr*4/3),le(i),i.setAttribute("data-renuvex-img-url",t),ze(i,function(){ue(e,t,r)}),m.appendChild(i),n.appendChild(m)}var u=je(e.merchantReply,t?function(){ue(e,t,r)}:null);return u&&(u.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(u)),n}var Sr={card:jr,list:Vr,gallery:Ur};function $e(e){return Sr[e]||Sr.card}function ra(){return Object.keys(Sr).map(function(e){return Sr[e].css||""}).join(`
`)}var Wr=0;function Qe(){return Wr++,Wr}function er(e,r){return e!==Wr?!1:r?!(r.productId!==void 0&&H!==r.productId||r.orderBy!==void 0&&te!==r.orderBy||r.page!==void 0&&ar!==r.page||r.ratingFilter!==void 0&&ne!==r.ratingFilter||r.hasImages!==void 0&&ie!==r.hasImages):!0}var qr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Gr={small:80,medium:110,large:140};function ta(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var p=document.createElementNS(t,"line");p.setAttribute("x1","1"),p.setAttribute("y1","1"),p.setAttribute("x2","23"),p.setAttribute("y2","23"),a.appendChild(n),a.appendChild(p);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var o=document.createElement("div");return o.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",o.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(o),r}function aa(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function Te(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),p=parseInt(t[3],16);return"rgba("+a+","+n+","+p+","+r+")"}function na(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",p=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",v=r.barCountColor||"#111111",d=Te(l,.06),g=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",i=r.btnTextColor||"#ffffff",z=r.btnBorderColor||"#111111",u=r.filterBtnBgColor||"#111111",h=r.filterBtnTextColor||"#ffffff",x=r.filterBtnBorderColor||"#111111",s=r.filterMenuBgColor||"#ffffff",c=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",f=r.filterItemActiveColor||"#111111",k=r.reviewTitleColor||"#111111",b=r.reviewAuthorColor||"#111111",L=r.reviewDateColor||"#5e5e5e",S=r.reviewBodyColor||"#111111",C=r.reviewBorderColor||"#e5e7eb",E=r.replyBgColor||"#f9fafb",T=r.replyBorderColor||"#747474",A=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",R=r.photoTitleColor||"#111111",P=Te("#111111",.05),q=r.photoArrowBgColor||"#ffffff",G=r.photoArrowTextColor||"#111111",$=Te("#111111",.12),M=r.formBgColor||"#ffffff",j=r.formPrimaryTextColor||"#111111",Ae=r.formSecondaryTextColor||"#3b3b3b",Q=r.inputTextColor||j,Ve=r.inputBorderColor||"#d1d5db",Le=r.placeholderColor||"#9ca3af",ee=r.formStepBarColor||"#111111",V=r.formBtnBgColor||"#111111",U=r.formBtnTextColor||"#ffffff",Ue=r.formBtnBorderColor||"#111111",F=Te(V,.06),ke=Te(V,.18),re=Te(U,.85),Ne=Te(j,.06),fe=r.loadMoreBgColor||"#ffffff",_=r.loadMoreTextColor||"#111111",B=r.loadMoreBorderColor||"#111111",O={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":p,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":o,"--renuvex-pr-bar-count":v,"--renuvex-pr-bar-hover-bg":d,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":i,"--renuvex-pr-btn-border":z,"--renuvex-pr-filter-btn-bg":u,"--renuvex-pr-filter-btn-text":h,"--renuvex-pr-filter-btn-border":x,"--renuvex-pr-filter-menu-bg":s,"--renuvex-pr-filter-menu-border":c,"--renuvex-pr-filter-item-text":w,"--renuvex-pr-filter-item-hover-bg":y,"--renuvex-pr-filter-item-active":f,"--renuvex-pr-review-title":k,"--renuvex-pr-review-author":b,"--renuvex-pr-review-date":L,"--renuvex-pr-review-body":S,"--renuvex-pr-review-border":C,"--renuvex-pr-review-star-color":g,"--renuvex-pr-reply-bg-color":E,"--renuvex-pr-reply-border":T,"--renuvex-pr-reply-label":A,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":R,"--renuvex-pr-photo-image-border":P,"--renuvex-pr-photo-arrow-bg":q,"--renuvex-pr-photo-arrow-text":G,"--renuvex-pr-photo-arrow-border":$,"--renuvex-pr-fwizard-bg":M,"--renuvex-pr-fwizard-text":j,"--renuvex-pr-fwizard-secondary-text":Ae,"--renuvex-pr-fwizard-input-bg":M,"--renuvex-pr-fwizard-input-text":Q,"--renuvex-pr-fwizard-input-border":Ve,"--renuvex-pr-fwizard-placeholder":Le,"--renuvex-pr-fwizard-close-text":j,"--renuvex-pr-fwizard-close-hover-bg":Ne,"--renuvex-pr-fwizard-progress-bg":Ne,"--renuvex-pr-fwizard-progress-active":ee,"--renuvex-pr-fwizard-btn-bg":V,"--renuvex-pr-fwizard-btn-text":U,"--renuvex-pr-fwizard-btn-border":Ue,"--renuvex-pr-fwizard-btn-disabled-bg":ke,"--renuvex-pr-fwizard-btn-disabled-text":re,"--renuvex-pr-fwizard-nav-hover-bg":F,"--renuvex-pr-load-more-bg":fe,"--renuvex-pr-load-more-text":_,"--renuvex-pr-load-more-border":B};Object.keys(O).forEach(function(D){e.style.setProperty(D,O[D])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function ia(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,p=e.wireLightboxTrigger,l=(e.photoStripReviews||[]).filter(function(y){return ye(y).length>0});if(!(r.showPhotoGallery!==!1&&!a&&l.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var v=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",d=document.createElement("div");d.className="renuvex-pr-photo-title",d.textContent=v,o.appendChild(d)}var g=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",g);var m=document.createElement("div");m.className="renuvex-pr-photo-strip";var i=W,z=r.reviewLayout==="card"?W:Math.round(W*4/3),u=0;l.forEach(function(y){if(!(u>=15)){var f=ur(y);if(f){var k=document.createElement("img"),b=oe(f,W);k.src=b.src,k.srcset=b.srcset,k.loading=u<3?"eager":"lazy",k.decoding="async",k.width=i,k.height=z,k.className="renuvex-pr-photo-strip-thumb",k.alt="Yorum foto\u011Fraf\u0131",le(k),(function(L,S){p(k,function(){n(S,L,l)})})(f,y),m.appendChild(k),u++}}});var h=document.createElement("button");h.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var x=J(Re);x&&h.appendChild(x),h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var s=document.createElement("button");s.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var c=J(pr);c&&s.appendChild(c),s.setAttribute("aria-label","Sonraki"),s.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var w=document.createElement("div");return w.className="renuvex-pr-photo-strip-wrap",w.appendChild(h),w.appendChild(m),w.appendChild(s),o.appendChild(w),o}function Ka(){return ht()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Ja(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ft({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),gt(t,{surface:"reviews",productId:r||""}),t}async function rr(e,r,t,a,n,p,l){if(lt){or({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:p,badgeSettings:l});return}ir(!0),Qr(e),et(r),l!==void 0&&rt(l),tt(a),n&&Ar(n),p&&Ge(p),t!=null&&at(t);try{let fe=function(_,B){if(!(!_||!_.meta||!_.meta.sizeOverrides)){var O=_.meta.sizeOverrides[B];O&&Object.keys(O).forEach(function(D){i.style.setProperty(D,O[D])})}};var Ne=fe,o=Cr(r.summaryLayout),v=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),d=r.showTitle!==!1,g=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",m=v&&d?g:"",i=document.documentElement;na(i,r);var z=r.borderRadius!==void 0?r.borderRadius:8,u=qr[r.size]||qr.medium,h=Gr[r.thumbnailSize]||Gr.medium,x=$e(r.reviewLayout);if(x.meta&&x.meta.sizeOverrides&&x.meta.sizeOverrides[r.size]){var s=x.meta.sizeOverrides[r.size],c=s["--renuvex-pr-list-photo-w"]||s["--renuvex-pr-gallery-photo-w"];c&&(h=parseInt(c))}i.style.setProperty("--renuvex-pr-title-size",u.titleSize+"px"),i.style.setProperty("--renuvex-pr-review-text-size",u.reviewTextSize+"px"),i.style.setProperty("--renuvex-pr-review-title-size",u.reviewTitleSize+"px"),i.style.setProperty("--renuvex-pr-author-size",u.authorSize+"px"),i.style.setProperty("--renuvex-pr-reply-name-size",u.replyNameSize+"px"),i.style.setProperty("--renuvex-pr-reply-text-size",u.replyTextSize+"px"),i.style.setProperty("--renuvex-pr-radius",z+"px"),i.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,z-4)+"px"),i.style.setProperty("--renuvex-pr-photo-title-size",u.photoTitleSize+"px"),i.style.setProperty("--renuvex-pr-avg-rating-size",u.avgRatingSize+"px"),i.style.setProperty("--renuvex-pr-review-count-size",u.reviewCountSize+"px"),i.style.setProperty("--renuvex-pr-compact-count-size",u.compactCountSize+"px"),i.style.setProperty("--renuvex-pr-recommend-size",u.recommendSize+"px"),i.style.setProperty("--renuvex-pr-btn-text-size",u.btnTextSize+"px"),i.style.setProperty("--renuvex-pr-bar-label-size",u.barLabelSize+"px"),i.style.setProperty("--renuvex-pr-minimal-avg-size",u.minimalAvgSize+"px"),i.style.setProperty("--renuvex-pr-hero-avg-size",u.heroAvgSize+"px"),i.style.setProperty("--renuvex-pr-bar-count-size",u.barCountSize+"px"),i.style.setProperty("--renuvex-pr-review-date-size",u.reviewDateSize+"px"),i.style.setProperty("--renuvex-pr-filter-text-size",u.filterTextSize+"px"),i.style.setProperty("--renuvex-pr-load-more-size",u.loadMoreSize+"px"),i.style.setProperty("--renuvex-pr-read-more-size",u.readMoreSize+"px"),i.style.setProperty("--renuvex-pr-thumbnail-size",h+"px");var w=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";i.style.setProperty("--renuvex-pr-review-star-color",w),i.style.setProperty("--renuvex-pr-star-size",u.reviewStarSize+"px"),i.style.setProperty("--renuvex-pr-avg-star-size",u.avgStarSize+"px"),fe(Cr(r.summaryLayout),r.size),fe($e(r.reviewLayout),r.size);var y=Xe(r),f=Ka();if(!f)return;var k=Ja(f,e),b=document.getElementById("renuvex-reviews");b||(b=document.createElement("div"),b.id="renuvex-reviews",b.style.minHeight="200px"),b.parentNode!==k&&k.appendChild(b);var L=bt(b),S=_e+Pe+cr+Zt()+ra();Me(L,S);var C=yt(L);if(r.enabled===!1){b.style.minHeight="auto",C.replaceChildren(ta(r.borderRadius!==void 0?r.borderRadius:8)),ir(!1);var E=nr;or(null),E&&rr(E.productId,E.settings,E.reviewsData,E.productName,E.orderBy,E.page,E.badgeSettings);return}var T=document.createElement("p");T.className="renuvex-pr-state-msg renuvex-pr-state-loading",T.textContent="Yorumlar y\xFCkleniyor...",C.replaceChildren(T);try{var A=t||{},N=Pr(A),R=N?[]:A.data&&A.data.reviews||[];nt(R),C.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),m){var q=document.createElement("div"),G=r.summaryLayout||"classic";q.className="renuvex-pr-title renuvex-pr-title-"+G,q.textContent=m,P.appendChild(q)}if(N){P.appendChild(aa(A.message,async function(){var _=Qe(),B=H,O=te,D=ne,ge=ie,X=await Je(H,te,1,ne,ie);er(_,{productId:B,orderBy:O,ratingFilter:D,hasImages:ge})&&await rr(H,I,X,Ie,te,1,Kr)})),C.appendChild(P),Ce(L),Er(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return L.getElementById("renuvex-reviews-widget")});return}var $=A.data&&A.data.allCount||0,M=A.data&&A.data.ratingCounts||null,j=M||[0,0,0,0,0],Ae=A.data&&A.data.avgRating||"0.0";if(!M&&R.length>0){R.forEach(function(_){_.rating>=1&&_.rating<=5&&j[_.rating-1]++});var Q=R.reduce(function(_,B){return _+B.rating},0);Ae=(Q/R.length).toFixed(1)}if($>0){var Ve=Cr(r.summaryLayout),Le=Ve.render({widget:P,data:A,settings:r,iconPair:y,allCount:$,ratingCounts:j,avgRatingVal:Ae,currentRatingFilter:ne,currentOrderBy:te,currentHasImages:ie,onFilterChange:async function(_){var B=Qe(),O=ne===_?null:_,D=H,ge=te,X=ie;Zr(O),Ge(1);var se=await Je(H,te,1,O,ie);er(B,{productId:D,orderBy:ge,page:1,ratingFilter:O,hasImages:X})&&await rr(H,I,se,Ie,te,1)},onSortChange:async function(_,B){var O=Qe(),D=H,ge=ne;Ge(1);var X=_,se=!1;B&&(se=!0,X="newest"),$r(se),Ar(X);var he=await Je(H,X,1,ne,se);er(O,{productId:D,orderBy:X,page:1,ratingFilter:ge,hasImages:se})&&await rr(H,I,he,Ie,X,1)}});P.appendChild(Le)}else{var ee=document.createElement("button");ee.className="renuvex-pr-write-btn",ee.style.cssText="display:block;margin:16px auto 0;",ee.textContent=r.writeButtonText||"Yorum Yap",ee.onclick=Y,P.appendChild(ee)}var V=ia({settings:r,root:i,currentHasImages:ie,photoStripReviews:Jr,openReviewModal:ue,wireLightboxTrigger:ze});if(V&&P.appendChild(V),R.length===0){var U=document.createElement("p");U.className="renuvex-pr-state-msg",U.textContent="Hen\xFCz yorum yok.",P.appendChild(U)}else{var x=$e(r.reviewLayout);R.forEach(function(B){P.appendChild(x.render(B,Tr))})}var Ue=A.data&&A.data.hasMore;if(Ue){var F=document.createElement("button");F.className="renuvex-pr-load-more",F.textContent="Daha Fazla G\xF6ster",F.onclick=async function(){F.disabled=!0,F.textContent="Y\xFCkleniyor...";var _=Qe(),B=H,O=te,D=ar,ge=ne,X=ie,se=D+1,he=await Je(B,O,se,ge,X);if(er(_,{productId:B,orderBy:O,page:D,ratingFilter:ge,hasImages:X}))if(he&&!Pr(he)&&he.data&&Array.isArray(he.data.reviews)){var Xr=it(he.data.reviews);ot(Xr),Ge(se);var oa=$e(I.reviewLayout);Xr.forEach(function(la){P.insertBefore(oa.render(la,Tr),F)}),he.data.hasMore?(F.disabled=!1,F.textContent="Daha Fazla G\xF6ster"):F.remove()}else F.disabled=!1,F.textContent="Tekrar Dene"},P.appendChild(F)}C.appendChild(P),Ce(L),Er(P,"reviews-widget",{productId:e||""},function(){return L.getElementById("renuvex-reviews-widget")})}catch(_){console.error("[renuvex-pr] render error:",_);var ke=document.createElement("p");ke.style.cssText="text-align:center;color:#dc2626;",ke.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(ke)}}finally{if(ir(!1),nr){var re=nr;or(null),rr(re.productId,re.settings,re.reviewsData,re.productName,re.orderBy,re.page,re.badgeSettings)}}}export{rr as render};
