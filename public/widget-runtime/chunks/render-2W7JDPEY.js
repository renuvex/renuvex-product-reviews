/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ae,d as rr}from"./chunk-MD6JV4O6.js";import{b as Pr,c as Ie}from"./chunk-ZM24JLBV.js";import{A as ir,B as or,a as U,b as tr,c as Q,d as ee,e as O,f as P,g as Zr,h as Le,j as Ar,k as $r,l as ar,m as Ne,n as Qr,o as et,p as rt,q as tt,r as at,s as nt,t as it,v as ot,w as lt,x as pt,y as ut,z as nr}from"./chunk-NQF4A7IV.js";import{A as he,B as ur,C as V,D as dr,E as sr,F as Lr,G as Nr,H as ae,I as gt,J as ne,K as ht,L as bt,c as Tr,e as ge,f as W,g as ue,h as q,i as Ce,j as lr,k as Xe,l as dt,m as Pe,n as pr,o as st,p as ke,q as vt,r as ct,t as mt,u as de,v as Re,x as xt,y as se,z as ft}from"./chunk-US3KMQNN.js";import{a as Ke}from"./chunk-GSBAPHFO.js";import{a as fe,b as qe,c as Ge,k as wt,l as Se}from"./chunk-YCWIZ2SG.js";var Be=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function yt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function _e(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function vr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function zt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Ct(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var kt=`
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
`,St=`
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
`;var Et=`
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
`;var Tt=`
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
`;var At=`
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
`;var Lt=`
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
`;var cr=[kt,xt,Et,Tt,At,Lt,St].join(`
`);function fa(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ie(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function ga(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function ha(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",o=ga()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function ba(e){var r=document.body.style,t=document.documentElement.style;ie(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ie(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ie(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ie(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ie(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ie(r,"position",e.bodyPosition,e.bodyPositionPriority),ie(r,"top",e.bodyTop,e.bodyTopPriority),ie(r,"left",e.bodyLeft,e.bodyLeftPriority),ie(r,"right",e.bodyRight,e.bodyRightPriority),ie(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Je=0,Me=null;function mr(){return Je+=1,Je>1||(Me=fa(),ha(Me)),Me}function xr(){if(Je!==0&&(Je-=1,!(Je>0))){var e=Me;Me=null,e&&ba(e)}}function wa(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function fr(){var e=wa();return!e||e===document.body||e===document.documentElement?null:e}function G(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ya(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Rr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ya)}function za(e,r){var t=e,a=Rr(e);!a.length&&r&&(t=r,a=Rr(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;G(n)}function gr(e,r,t){if(e.key==="Tab"){var a=Rr(r);if(!a.length){e.preventDefault(),za(r);return}var n=a[0],o=a[a.length-1],l=zt(t);if(!r.contains(l)){e.preventDefault(),G(n);return}if(a.indexOf(l)===-1){e.preventDefault(),G(e.shiftKey?o:n);return}e.shiftKey&&l===n?(e.preventDefault(),G(o)):!e.shiftKey&&l===o&&(e.preventDefault(),G(n))}}var Nt="renuvexPrOverlay";function hr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Nt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Ca(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Nt]===e.id)}function br(e){if(Ca(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Fe(e){return he(e)}function Pt(e,r,t,a,n){xr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&lr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),G(n)}function ka(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=de(e.rating,P);var o=document.createElement("span");o.className="renuvex-pr-modal-date",o.textContent=se(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var i=document.createElement("div");i.className="renuvex-pr-modal-author",i.textContent=e.author||"",t.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var f=document.createElement("div");f.className="renuvex-pr-modal-reply-label",f.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi";var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",u.appendChild(f),u.appendChild(v),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Rt(e,r,t){var a=t||P,n=e.querySelector(".renuvex-pr-modal-scroll-content"),o=n.querySelector(".renuvex-pr-modal-stars");o.innerHTML=de(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=se(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var i=n.querySelector(".renuvex-pr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Br(e,r,t,a,n,o,l,i,d){var u=Fe(e),f=Math.max(0,Math.min(t||0,u.length-1)),v=document.createElement("div");v.className="renuvex-pr-modal-left";var p=document.createElement("img"),m=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";p.className="renuvex-pr-modal-main-img"+(m?" "+m:""),p.src=Nr(u[f]||""),p.decoding="async",p.width=Lr,p.height=Math.round(Lr*4/3),p.alt="Yorum foto\u011Fraf\u0131",gt(p,function(A){if(A.style.display="none",!v.querySelector(".renuvex-pr-modal-img-error")){var T=document.createElement("div");T.className="renuvex-pr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",v.insertBefore(T,A)}}),v.appendChild(p);var h=document.createElement("button");h.className="renuvex-pr-modal-close-mobile";var c=q(ke);c&&h.appendChild(c),h.setAttribute("aria-label","Kapat"),h.onclick=function(A){A.stopPropagation(),o()},v.appendChild(h);var w=0;if(v.addEventListener("touchstart",function(A){w=A.touches[0].clientX},{passive:!0}),v.addEventListener("touchend",function(A){var T=w-A.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(b)ve(e,r,f+1,a,n,o,!0,"next",i,d);else if(x){var N=a[r+1];ve(N,r+1,0,a,n,o,!1,"next",i,d)}}else if(s)ve(e,r,f-1,a,n,o,!0,"prev",i,d);else if(y){var B=a[r-1],D=Fe(B);ve(B,r-1,D.length-1,a,n,o,!1,"prev",i,d)}}},{passive:!0}),u.length>1){var g=document.createElement("div");g.className="renuvex-pr-modal-thumbs",u.forEach(function(A,T){var N=document.createElement("img"),B=ae(A,sr);N.src=B.src,N.srcset=B.srcset,N.loading="lazy",N.decoding="async",N.width=sr,N.height=sr,N.className="renuvex-pr-modal-thumb"+(T===f?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(T+1),ne(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===f&&N.setAttribute("aria-current","true"),(function(D){function X(){ve(e,r,D,a,n,o,!0,null,i,d)}N.onclick=X,N.onkeydown=function(j){(j.key==="Enter"||j.key===" ")&&(j.preventDefault(),X())}})(T),g.appendChild(N)}),v.appendChild(g)}var s=f>0,b=f<u.length-1,y=r>0,x=r<a.length-1,z=s||y,C=b||x;if(z){var S=document.createElement("button");S.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var k=q(Pe);k&&S.appendChild(k),S.setAttribute("aria-label","\xD6nceki"),S.onclick=function(A){if(A.stopPropagation(),s)ve(e,r,f-1,a,n,o,!0,"prev",i,d);else if(y){var T=a[r-1],N=Fe(T);ve(T,r-1,N.length-1,a,n,o,!1,"prev",i,d)}},v.appendChild(S)}if(C){var E=document.createElement("button");E.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var L=q(pr);L&&E.appendChild(L),E.setAttribute("aria-label","Sonraki"),E.onclick=function(A){if(A.stopPropagation(),b)ve(e,r,f+1,a,n,o,!0,"next",i,d);else if(x){var T=a[r+1];ve(T,r+1,0,a,n,o,!1,"next",i,d)}},v.appendChild(E)}return v}function It(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Fe(a);n[0]&&(new Image().src=Nr(n[0]))}})}function Ir(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Sa(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function o(){Ir(t),Ir(a),Ir(n)}o(),t&&G(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ve(e,r,t,a,n,o,l,i,d,u){if(u&&(u.currentReview=e),l){var f=Br(e,r,t,a,n,o,i,d,u);n.firstChild&&n.replaceChild(f,n.firstChild)}else{var f=Br(e,r,t,a,n,o,i,d,u),v=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(f,n.firstChild),v&&Rt(v,e,u&&u.currentSettings),Sa(d,n)}It(r,a)}function oe(e,r,t){var a=Fe(e);if(!a.length)return;var n=(t||[]).filter(function(C){return Fe(C).length>0}),o=n.findIndex(function(C){return C===e||C.id===e.id});o===-1&&(n.unshift(e),o=0);var l=a.indexOf(r);l<0&&(l=0);var i=document.createElement("div");i.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var u=!1,f=null,v=fr(),p=mr(),m=hr(),h={currentReview:e,currentSettings:P},c=null;function w(C){var S=C&&C.detail&&C.detail.settings;if(!(S&&S===c)){c=S||null,h.currentSettings=S||P;var k=d.querySelector(".renuvex-pr-modal-right");!k||!h.currentReview||Rt(k,h.currentReview,h.currentSettings)}}function g(){u||(u=!0,window.removeEventListener(Se,w),Pt(f&&f.host,s,g,p,v))}function s(C){if(C.key==="Escape"){b();return}gr(C,i,f&&f.root)}function b(){u||(u=!0,window.removeEventListener(Se,w),Pt(f&&f.host,s,g,p,v),br(m))}document.addEventListener("keydown",s),window.addEventListener("popstate",g),window.addEventListener(Se,w),i.onclick=function(){b()},d.onclick=function(C){C.stopPropagation()},d.appendChild(Br(e,o,l,n,d,b,null,i,h)),d.appendChild(ka(e)),It(o,n);var y=document.createElement("div");y.className="renuvex-pr-modal-wrap",y.tabIndex=-1,y.setAttribute("role","dialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),y.appendChild(d);var x=document.createElement("button");x.className="renuvex-pr-modal-close";var z=q(ke);z&&x.appendChild(z),x.setAttribute("aria-label","Kapat"),x.onclick=function(C){C.stopPropagation(),b()},y.appendChild(x),i.appendChild(y),f=vr(),_e(f.root,Be+Ae+cr),f.root.appendChild(i),Ce(f.root),G(y)}function be(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var Or={};fe(Or,{css:()=>_a,meta:()=>Ba,render:()=>Ma});function Oe(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,o=e.onFilterChange;ge(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var i=5;i>=1;i--){var d=r[i-1]||0,u=t>0?Math.round(d/t*100):0,f=n===i,v=document.createElement("div");v.className="renuvex-pr-bar-row"+(f?" renuvex-pr-bar-active":""),v.setAttribute("role","button"),v.setAttribute("tabindex","0"),v.setAttribute("aria-pressed",f?"true":"false"),v.setAttribute("aria-label",i+" y\u0131ld\u0131z, "+d.toLocaleString("tr-TR")+" yorum, "+(f?"filtreyi kald\u0131r":"filtrele")),n&&!f&&(v.style.opacity="0.35");for(var p="",m=1;m<=5;m++){var h=m<=i;p+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(h?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+W(h?"full":"outline")+"</span>"}v.innerHTML='<span class="renuvex-pr-bar-label">'+p+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(c){function w(){o(c)}v.onclick=w,v.onkeydown=function(g){(g.key==="Enter"||g.key===" "||g.key==="Space"||g.key==="Spacebar")&&(g.preventDefault(),w())}})(i),l.appendChild(v)}return l}var Mt="data-renuvex-pr-dismiss-gesture",Ee=[],Bt=!1,wr=!1,Ze=[],He=null;function _t(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function _r(){for(var e=Ee.length-1;e>=0;e--){var r=Ee[e].element;r&&r.isConnected===!1&&Ee.splice(e,1)}return Ee}function Ea(e){!e||typeof e.setAttribute!="function"||(Ze.indexOf(e)===-1&&Ze.push(e),e.setAttribute(Mt,""))}function Ft(){for(var e=0;e<Ze.length;e++){var r=Ze[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Mt)}Ze=[],He&&typeof clearTimeout=="function"&&clearTimeout(He),He=null}function Ta(e){if(wr){wr=!1,Ft(),e.preventDefault(),e.stopPropagation();return}for(var r=_r(),t=!1,a=r.length-1;a>=0;a--){var n=r[a];_t(e,n.trigger)||_t(e,n.element)||n.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Aa(e){if(e.key==="Escape")for(var r=_r(),t=r.length-1;t>=0;t--)r[t].close()}function Ot(){Bt||typeof document=="undefined"||(document.addEventListener("click",Ta,!0),document.addEventListener("keydown",Aa),Bt=!0)}function La(e){Ot(),wr=!0,Ea(e),He&&typeof clearTimeout=="function"&&clearTimeout(He),typeof setTimeout=="function"&&(He=setTimeout(function(){wr=!1,Ft()},700))}function Ht(e){La(e)}function yr(e){Ot();var r={trigger:e.trigger,element:e.element,close:e.close};return Ee.push(r),{unregister:function(){var t=Ee.indexOf(r);t!==-1&&Ee.splice(t,1)},notifyOpening:function(){for(var t=_r(),a=0;a<t.length;a++)t[a]!==r&&t[a].close()}}}function re(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,o=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var i=document.createElement("button");i.className="renuvex-pr-write-btn",i.textContent=P&&P.writeButtonText||"Yorum Yap",i.onclick=n,l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var f=P&&P.filterIcon||"lines";u.innerHTML=ue(dt(f));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],m=!1;function h(){return r&&r.parentNode||r||null}function c(s){var b=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var y=s&&(s.restoreFocus===!0||s.restoreFocus==="auto"&&rr());if(b&&y)try{u.focus({preventScroll:!0})}catch(x){try{u.focus()}catch(z){}}return b}function w(){g.notifyOpening(),v.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var s=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");s&&requestAnimationFrame(function(){try{s.focus({preventScroll:!0})}catch(b){try{s.focus()}catch(y){}}})}p.forEach(function(s){var b=s[2],y=b?a:!a&&(t||"newest")===s[0],x=document.createElement("button");x.type="button",x.className="renuvex-pr-filter-item"+(y?" renuvex-pr-filter-item-active":""),x.setAttribute("role","menuitem"),x.textContent=s[1];var z=!1;function C(S,k){S&&(S.preventDefault(),S.stopPropagation()),!z&&(z=!0,m=!0,k!==!0&&Ht(h()),c({restoreFocus:k}),o(s[0],b),setTimeout(function(){z=!1,m=!1},0))}x.addEventListener("pointerdown",function(S){S.button!==void 0&&S.button!==0||C(S,!1)}),typeof window!="undefined"&&!window.PointerEvent&&x.addEventListener("touchstart",function(S){C(S,!1)},{passive:!1}),x.addEventListener("mousedown",function(S){S.button!==void 0&&S.button!==0||C(S,!1)}),x.addEventListener("keydown",function(S){(S.key==="Enter"||S.key===" ")&&C(S,!0)}),x.onclick=function(S){C(S,!1)},v.appendChild(x)}),u.onclick=function(){v.classList.contains("renuvex-pr-open")?c({restoreFocus:"auto"}):w()},d.addEventListener("keydown",function(s){s.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(s.stopPropagation(),c({restoreFocus:!0}))}),d.addEventListener("focusout",function(s){if(v.classList.contains("renuvex-pr-open")&&!m){var b=s.relatedTarget;b&&d.contains(b)||c()}});var g=yr({trigger:d,element:v,close:c});return d.appendChild(u),d.appendChild(v),l.appendChild(d),l}var Yt=`
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
`;function Dt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content",n.appendChild(o);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var i=q(ke);i&&l.appendChild(i),n.appendChild(l);var d=!1,u=null,f=null,v=!1;function p(){G(a)}function m(x){gr(x,a,u&&u.root)}function h(){if(!d){if(d=!0,document.removeEventListener("keydown",c),a.removeEventListener("click",w),l.removeEventListener("click",h),v)G(f);else{var x=u&&u.root?u.root.activeElement:null;if(x&&typeof x.blur=="function")try{x.blur()}catch(z){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(lr(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):a.parentNode&&a.parentNode.removeChild(a),xr();try{r()}catch(z){}},200)}}function c(x){if(x.key==="Escape"){h();return}m(x)}function w(x){x.target===a&&t&&h()}document.addEventListener("keydown",c),a.addEventListener("click",w),l.addEventListener("click",h);function g(x){f=fr(),v=rr(),x&&o.appendChild(x),u=vr(),_e(u.root,Be+Ae+Yt),u.root.appendChild(a),Ce(u.root),mr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),p()})}var s=null,b=null;function y(x,z){if(z=z||"error",s){try{s.remove()}catch(C){}s=null}b&&(clearTimeout(b),b=null),s=document.createElement("div"),s.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,s.textContent=x,n.appendChild(s),b=setTimeout(function(){s&&(s.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(s){try{s.remove()}catch(C){}s=null}},300))},4e3)}return{open:g,close:h,content:o,setAllowOutsideClose:function(x){t=!!x},setStepAttr:function(x){n.setAttribute("data-step",String(x))},showToast:y}}var Mr=4;function Ye(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function jt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(o){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Mr&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(o){return o!==n})}}}}function Vt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},o=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",i.setAttribute("aria-label","Geri"),i.innerHTML=ue(Pe)+"<span>Geri</span>",i.addEventListener("click",function(){a()}),l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var u=[],f=0;f<Mr;f++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",d.appendChild(v),u.push(v)}l.appendChild(d);var p=document.createElement("button");p.type="button";var m=null;function h(w){m&&p.removeEventListener("click",m),m=w,w&&p.addEventListener("click",w)}l.appendChild(p);function c(w,g){var s=r.indexOf(w)!==-1,b=t.indexOf(w)!==-1,y=g&&(g.images&&g.images.length>0||g.pendingImages&&g.pendingImages.length>0);if(s)w===2&&y?(p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",h(function(){o()})):(p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.setAttribute("aria-label","Atla"),p.innerHTML="<span>Atla</span>",h(function(){n()})),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p.style.visibility="",p.tabIndex=0;else if(b){p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Sonraki"),p.innerHTML="Sonraki",p.style.visibility="",p.tabIndex=0;var x=Ye(w,g);p.disabled=!x,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!x),h(function(){p.disabled||o()})}else p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.innerHTML="",p.style.visibility="hidden",p.tabIndex=-1,p.disabled=!0,h(null)}return{el:l,update:function(w,g){u.forEach(function(b,y){y+1<=w?b.classList.add("renuvex-pr-fwizard-progress-seg-active"):b.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var s=w<=1;i.style.visibility=s?"hidden":"",i.style.pointerEvents=s?"none":"",i.tabIndex=s?-1:0,c(w,g)},setNextDisabled:function(w){p.classList.contains("renuvex-pr-fwizard-cta-btn")&&(p.disabled=!!w,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!w))},setThanksState:function(w){i.style.visibility="hidden",d.style.visibility="hidden",p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",p.style.visibility="",p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),h(w)}}}function Ut(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var i=Xe(P||{});ge(i);var d=[];function u(w){d.forEach(function(g,s){var b=s<w;g.classList.toggle("renuvex-pr-fwizard-star-active",b),g.setAttribute("aria-checked",s+1===w?"true":"false"),g.innerHTML=b?W("full"):W("outline")})}function f(w){e.set({rating:w}),u(w)}function v(w){var g=d[w-1];if(g)try{g.focus()}catch(s){}}function p(w,g){g&&typeof g.preventDefault=="function"&&g.preventDefault(),g&&typeof g.stopPropagation=="function"&&g.stopPropagation(),!a&&(a=!0,f(w),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var m=1;m<=5;m++)(function(w){var g=document.createElement("button");g.type="button",g.className="renuvex-pr-fwizard-star",g.setAttribute("role","radio"),g.setAttribute("aria-label",w+" y\u0131ld\u0131z"),g.innerHTML=W("outline"),g.addEventListener("mouseenter",function(){u(w)}),g.addEventListener("mouseleave",function(){u(e.get().rating)}),g.addEventListener("pointerdown",function(s){s.button&&s.button!==0||p(w,s)}),typeof window!="undefined"&&!window.PointerEvent&&g.addEventListener("touchstart",function(s){p(w,s)},{passive:!1}),g.addEventListener("mousedown",function(s){window.PointerEvent||p(w,s)}),g.addEventListener("keydown",function(s){if(s.key==="Enter"||s.key===" "){p(w,s);return}var b=0;s.key==="ArrowRight"||s.key==="ArrowUp"?b=Math.min(5,w+1):s.key==="ArrowLeft"||s.key==="ArrowDown"?b=Math.max(1,w-1):s.key==="Home"?b=1:s.key==="End"&&(b=5),b&&(s.preventDefault(),f(b),v(b))}),g.addEventListener("click",function(s){p(w,s)}),d.push(g),l.appendChild(g)})(m);u(e.get().rating);var h=null,c=function(w){var g=w&&w.detail&&w.detail.settings;g&&g===h||(h=g||null,i=Xe(g||P||{}),u(e.get().rating))};return window.addEventListener(Se,c),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Se,c)}}}var Wt=3,Na=10*1024*1024;function qt(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-photo-add",i.setAttribute("aria-label","Foto\u011Fraf ekle");var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",l.appendChild(i),l.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),l.appendChild(u),a.appendChild(l);var f=r.revokeBlobUrl||function(s){s&&typeof s=="string"&&s.startsWith("blob:")&&URL.revokeObjectURL(s)},v=r.blobMap||{},p=r.urlToFinger||{};function m(){if(!t){var s=e.get().images||[],b=e.get().pendingImages||[],y=s.map(function(x){return{url:x,isPending:!1}}).concat(b.map(function(x){return{url:x.url,file:x.file,isPending:!0,error:x.error}}));u.innerHTML="",y.forEach(function(x){var z=v[x.url]||x.url,C=h(x,z);u.appendChild(C)}),w()}}function h(s,b){var y=document.createElement("div");y.className="renuvex-pr-fwizard-photo-thumb";var x=document.createElement("img");x.src=b,x.alt="",x.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",y.appendChild(x);var z=document.createElement("div");z.className="renuvex-pr-fwizard-photo-loading",z.style.display="none",y.appendChild(z);var C=document.createElement("button");C.type="button",C.className="renuvex-pr-fwizard-photo-remove",C.setAttribute("aria-label","Kald\u0131r");var S=q(ke);return S&&C.appendChild(S),y.appendChild(C),c(y,s,b),y}function c(s,b,y){var x=s.querySelector("img");x.src!==y&&(x.src=y);var z=s.querySelector(".renuvex-pr-fwizard-photo-loading");if(b.isPending&&b.error){z.style.display="flex",z.textContent="";var C=document.createElement("span");C.className="renuvex-pr-upload-error",C.textContent="\u2717 "+b.error,z.appendChild(C)}else z.style.display="none",z.textContent="";var S=s.querySelector(".renuvex-pr-fwizard-photo-remove");S.onclick=function(){var k=p[b.url]||(b.file?b.file.name+"_"+b.file.size:null),E=v[b.url],L={};k&&(L.fingerprints=(e.get().fingerprints||[]).filter(function(A){return A!==k})),b.isPending?L.pendingImages=(e.get().pendingImages||[]).filter(function(A){return A.url!==b.url}):L.images=(e.get().images||[]).filter(function(A){return A!==b.url}),e.set(L),f(b.url),f(E),delete p[b.url],E&&delete p[E],v[b.url]&&delete v[b.url]}}function w(){var s=(e.get().images||[]).length,b=(e.get().pendingImages||[]).length,y=s+b,x=y>=Wt;y>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ue(ct)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=ue(vt)+"<span>Foto\u011Fraf Ekle</span>"),x?(i.style.display="none",i.disabled=!0,d.disabled=!0):(i.style.display="flex",i.disabled=!1,d.disabled=!1,i.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}i.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(s){var b=(e.get().images||[]).length+(e.get().pendingImages||[]).length,y=Array.from(s.target.files).slice(0,Wt-b);d.value="";var x=(e.get().pendingImages||[]).length,z=e.get().images||[],C=z.length;if(y.length!==0){for(var S=[],k=[],E=0;E<y.length;E++){var L=y[E],A=L.name+"_"+L.size,T=(e.get().fingerprints||[]).some(function(I){return I===A})||S.some(function(I){return I.file.name+"_"+I.file.size===A});if(!T){if(L.size>Na){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var B=URL.createObjectURL(L);p[B]=A,S.push({url:B,file:L,error:null}),k.push({url:B,file:L});var D=(e.get().fingerprints||[]).slice();D.push(A),e.set({fingerprints:D})}}if(S.length!==0){var X=(e.get().pendingImages||[]).concat(S),j=async function(){for(var I=0;I<k.length;I++){var J=k[I],we=J.file,H=J.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Te=(e.get().pendingImages||[]).filter(function(M){return M.url!==H}),me=(e.get().images||[]).slice();me.push(H),e.set({pendingImages:Te,images:me});continue}try{var ye=await Ke(Ge+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe})});if(!ye.ok)throw ye.status===429?new Error("rate_limit"):new Error("sign failed");var te=await ye.json();if(!te.folder)throw new Error("sign folder missing");var R=new FormData;R.append("file",we),R.append("api_key",te.api_key),R.append("timestamp",te.timestamp),R.append("signature",te.signature),R.append("folder",te.folder);var xe=await fetch("https://api.cloudinary.com/v1_1/"+te.cloud_name+"/image/upload",{method:"POST",body:R}),F=await xe.json();if(F.secure_url&&ft(F.secure_url)){var $e=(e.get().pendingImages||[]).some(function(M){return M.url===H});if(!$e)continue;v[F.secure_url]=H,p[F.secure_url]=p[H];var ze=(e.get().pendingImages||[]).filter(function(M){return M.url!==H}),_=(e.get().images||[]).slice();_.push(F.secure_url),e.set({pendingImages:ze,images:_});try{Ke(Ge+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,secureUrl:F.secure_url})}).catch(function(){})}catch(M){}}else throw new Error("invalid image url")}catch(M){console.error("[renuvex-pr] Image upload failed:",M);var Z=M.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Z,"error");var $=(e.get().pendingImages||[]).map(function(le){return le.url===H?{url:le.url,file:le.file,error:Z}:le});e.set({pendingImages:$})}}};if(C===0&&x===0){t=!0;var K=!r.canNavigate||r.canNavigate();K&&e.goNext()}e.set({pendingImages:X}),j()}}};var g=e.onChange(m);return m(),{el:a,destroy:function(){t=!0,d.onchange=null,g&&g()}}}var Fr=2e3,Pa=60;function Gt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=Pa,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),o.appendChild(l);var i=document.createElement("textarea");i.className="renuvex-pr-fwizard-textarea",i.placeholder="Deneyiminizi anlat\u0131n\u2026",i.maxLength=Fr,i.rows=6,i.setAttribute("aria-label","Yorum"),i.value=e.get().comment||"",o.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),o.appendChild(d);function u(){var v=i.value.length;d.textContent=v+"/"+Fr,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=Fr)}function f(){return Ye(3,e.get())}return i.addEventListener("input",function(){e.set({comment:i.value}),u(),t(f())}),a.appendChild(o),u(),setTimeout(function(){t(f())},0),{el:a,destroy:function(){}}}var Ra=40;function Xt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",n.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var i=document.createElement("div");i.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=Ra,u.setAttribute("aria-required","true"),u.value=e.get().author||"",i.appendChild(d),i.appendChild(u),l.appendChild(i);var f=document.createElement("div");f.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var p=document.createElement("input");p.type="email",p.className="renuvex-pr-fwizard-input",p.setAttribute("autocomplete","email"),p.value=e.get().email||"",f.appendChild(v),f.appendChild(p),l.appendChild(f);var m=document.createElement("div");m.className="renuvex-pr-fwizard-notice",m.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(m);var h=document.createElement("div");h.className="renuvex-pr-fwizard-msg",h.setAttribute("role","alert"),h.setAttribute("aria-live","assertive"),l.appendChild(h);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",l.appendChild(c),n.appendChild(l);function w(){return Ye(4,e.get())}function g(){var x=!w(),z=(e.get().pendingImages||[]).length,C=z>0;C?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(c.disabled=x,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",x),c.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),g(),t(w())}),p.addEventListener("input",function(){e.set({email:p.value})}),g(),setTimeout(function(){t(w())},0);function s(){h.textContent=""}function b(x){s();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=x||"",h.appendChild(z)}c.onclick=async function(){if(!c.disabled){var x=e.get(),z=(x.author||"").trim(),C=(x.comment||"").trim();if(p.value.trim()&&!p.checkValidity()){p.reportValidity();return}if(!z){b("Gerekli alan");return}if(!x.rating){b("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var S=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",s(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var k=mt(window.location.href),E=x.productName||null,L=await Ke(Ge+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,productId:x.productId||null,slug:k||null,productName:E,author:z,title:(x.title||"").trim()||null,comment:C||null,rating:x.rating,images:x.images||[]})},15e3);if(L.ok)a();else{var A=await L.json().catch(function(){return{}});throw new Error(A.error||"Yorum kaydedilemedi.")}}catch(B){var T=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),N=T?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(N,"error"):b(N),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=S}}};var y=e.onChange(g);return{el:n,destroy:function(){c.onclick=null,y&&y()}}}function Ia(e,r,t){if(t=t||{},e===1)return Ut(r,{canNavigate:t.canNavigate});if(e===2)return qt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Gt(r,{onValidityChange:t.onValidityChange});if(e===4)return Xt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Kt(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Jt(e){e=e||{};var r=jt({productId:e.productId,productName:e.productName}),t={},a={},n={};function o(k){if(!(!k||typeof k!="string"||!k.startsWith("blob:")||n[k])){n[k]=!0;try{URL.revokeObjectURL(k)}catch(E){}}}function l(){Object.keys(a).forEach(function(E){o(E)}),Object.keys(t).forEach(function(E){o(t[E])});var k=r.get();(k.pendingImages||[]).forEach(function(E){o(E&&E.url)}),(k.images||[]).forEach(function(E){o(E)})}var i=Dt({onClose:function(){window.removeEventListener("popstate",u),br(d),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=hr(),u=function(k){i&&i.close&&i.close()};window.addEventListener("popstate",u);var f=document.createElement("div");f.className="renuvex-pr-fwizard-step-wrap";var v=Vt({skippableSteps:[2],nextableSteps:[3],onBack:function(){h==="idle"&&r.goBack()},onSkip:function(){h==="idle"&&r.goNext()},onNext:function(){h==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="renuvex-pr-fwizard-layout",p.appendChild(f),p.appendChild(v.el);var m=null,h="idle",c=null,w=!0,g=null;function s(k,E){f.innerHTML="";var L=Ia(k,r,{canNavigate:function(){return h==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:o,onValidityChange:function(N){v.setNextDisabled(!N)},onSuccess:y,showToast:i.showToast});if(m=L,v.update(k,r.get()),E){h="entering",L.el.classList.add("renuvex-pr-fwizard-step--enter");var A=null,T=function(){A&&clearTimeout(A),L.el.removeEventListener("animationend",T),L.el.classList.remove("renuvex-pr-fwizard-step--enter"),h="idle",c!==null&&x()};L.el.addEventListener("animationend",T),A=setTimeout(T,700)}else h="idle";f.appendChild(L.el),i.setStepAttr&&i.setStepAttr(k),k===3&&v.setNextDisabled(!0)}var b=!1;function y(){if(!b){if(b=!0,!m){f.innerHTML="";var k=Kt();k.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(k),i.setStepAttr("thanks"),v.setThanksState(i.close);return}var E=m;h="exiting",E.el.classList.add("renuvex-pr-fwizard-step--exit");var L=function(){if(g&&clearTimeout(g),E.el.removeEventListener("animationend",L),E.destroy)try{E.destroy()}catch(T){}m===E&&(m=null),f.innerHTML="";var A=Kt();A.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(A),i.setStepAttr("thanks"),v.setThanksState(i.close),h="idle"};E.el.addEventListener("animationend",L),g=setTimeout(L,300)}}function x(){var k=r.get().currentStep;if(h!=="idle"){c=k;return}if(!m){var E=!w;w=!1,s(k,E);return}var L=m;h="exiting",L.el.classList.add("renuvex-pr-fwizard-step--exit");var A=function(){if(g&&clearTimeout(g),L.el.removeEventListener("animationend",A),L.destroy)try{L.destroy()}catch(N){}if(m===L){f.innerHTML="",m=null;var T=c!==null?c:r.get().currentStep;c=null,s(T,!0),h="idle"}};L.el.addEventListener("animationend",A),g=setTimeout(A,350)}x();var z=r.get().currentStep,C=r.onChange(function(k){k.currentStep!==z?(z=k.currentStep,x()):v.update(k.currentStep,k)}),S=i.close;return i.close=function(){C&&C(),typeof g!="undefined"&&g&&clearTimeout(g),S()},i.open(p),{close:i.close}}function Y(){Jt({productId:O||"",productName:Le||""})}var Zt=`
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
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:48px;}
  }
`;var Ba={id:"classic",name:"Klasik (A\xE7\u0131k)"},_a=Zt;function Ma(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,f=e.currentHasImages,v=e.onFilterChange,p=e.onSortChange;ge(n);var m=document.createElement("div");m.className="renuvex-pr-summary";var h=(l[3]||0)+(l[4]||0),c=o>0?Math.round(h/o*100):0,w=document.createElement("div");w.className="renuvex-pr-summary-block renuvex-pr-summary-avg",w.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+i+"</span>",m.appendChild(w);var g=document.createElement("div");if(g.className="renuvex-pr-summary-block renuvex-pr-summary-count",g.textContent=o.toLocaleString("tr-TR")+" Yorum",m.appendChild(g),a.showRecommendation!==!1&&c>0){var s=document.createElement("div");s.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",s.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",m.appendChild(s)}return m.appendChild(Oe({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:v})),m.appendChild(re({widget:r,currentOrderBy:u,currentHasImages:f,onWriteClick:Y,onSortChange:p})),m}var Hr={};fe(Hr,{css:()=>Oa,meta:()=>Fa,render:()=>Ha});var $t=`
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
`;var Fa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Oa=$t;function Ha(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,f=e.onFilterChange,v=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-compact";var m=document.createElement("div");m.className="renuvex-pr-compact-header";var h=document.createElement("div");h.className="renuvex-pr-compact-trigger-wrap";var c=document.createElement("button");c.className="renuvex-pr-compact-trigger",c.type="button",c.setAttribute("aria-expanded","false"),c.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Re(l,a)+'</span><span class="renuvex-pr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+ue(st)+"</span>",h.appendChild(c),m.appendChild(h);var w=re({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:Y,onSortChange:v}),g=w.querySelector(".renuvex-pr-filter-wrap"),s=w.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-compact-actions-slot",s&&b.appendChild(s),g&&b.appendChild(g),m.appendChild(b),p.appendChild(m);var y=document.createElement("div");y.className="renuvex-pr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var x=document.createElement("div");x.className="renuvex-pr-compact-panel-inner";var z=document.createElement("div");z.className="renuvex-pr-compact-avg",z.innerHTML='<span class="renuvex-pr-icon">'+W("full")+"</span><span>"+l+"</span>",x.appendChild(z),x.appendChild(Oe({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:f})),y.appendChild(x);var C=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function S(I){var J=I?p:h;y.parentNode!==J&&(y.classList.contains("renuvex-pr-open")&&(y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),c.setAttribute("aria-expanded","false")),J.appendChild(y))}if(S(C?C.matches:!1),C){var k=function(I){S(I.matches)};C.addEventListener?C.addEventListener("change",k):C.addListener&&C.addListener(k)}if(s){var E=document.createElement("button");E.className="renuvex-pr-write-btn",E.textContent=P&&P.writeButtonText||"Yorum Yap",E.onclick=Y;var L=document.createElement("div");L.className="renuvex-pr-compact-write-row",L.appendChild(E),p.appendChild(L)}function A(){var I=y.classList.contains("renuvex-pr-open");return y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),c.setAttribute("aria-expanded","false"),I}function T(){N&&N.notifyOpening(),y.classList.add("renuvex-pr-open"),y.setAttribute("aria-hidden","false"),c.setAttribute("aria-expanded","true")}c.onclick=function(){y.classList.contains("renuvex-pr-open")?A():T()};var N=null;function B(I){N&&(N.unregister(),N=null),I||(N=yr({trigger:h,element:y,close:A}))}if(B(C?C.matches:!1),C){var D=function(I){B(I.matches)};C.addEventListener?C.addEventListener("change",D):C.addListener&&C.addListener(D)}if(t.showRecommendation!==!1){var X=(o[3]||0)+(o[4]||0),j=n>0?Math.round(X/n*100):0;if(j>0){var K=document.createElement("div");K.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",K.style.marginTop="8px",K.innerHTML='<span class="renuvex-pr-recommend-pct">%'+j+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",x.appendChild(K)}}return p}var Yr={};fe(Yr,{css:()=>Da,meta:()=>Ya,render:()=>ja});var Qt=`
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
`;var Ya={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Da=Qt;function ja(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,f=e.onFilterChange,v=e.onSortChange;ge(a);var p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-split";var m=document.createElement("div");m.className="renuvex-pr-split-col renuvex-pr-split-left";var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",h.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+W("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",m.appendChild(h);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=n.toLocaleString("tr-TR")+" Yorum",m.appendChild(c),p.appendChild(m);var w=document.createElement("div");w.className="renuvex-pr-split-col renuvex-pr-split-mid",w.appendChild(Oe({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:f})),p.appendChild(w);var g=re({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:Y,onSortChange:v}),s=g.querySelector(".renuvex-pr-filter-wrap"),b=g.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-right",b&&y.appendChild(b),s&&y.appendChild(s),p.appendChild(y);var x=(o[3]||0)+(o[4]||0),z=n>0?Math.round(x/n*100):0,C=document.createElement("div");C.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",C.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var S=t.showRecommendation===!1||z===0;return S&&C.classList.add("renuvex-pr-split-rec-hidden"),m.appendChild(C),p}var Dr={};fe(Dr,{css:()=>Ua,meta:()=>Va,render:()=>Wa});var ea=`
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
`;var Va={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Ua=ea;function Wa(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var u=document.createElement("div");u.className="renuvex-pr-minimal-info";var f=document.createElement("div");f.className="renuvex-pr-minimal-row";var v=document.createElement("span");v.className="renuvex-pr-minimal-avg",v.textContent=n,f.appendChild(v);var p=document.createElement("span");p.className="renuvex-pr-minimal-stars",p.innerHTML=Re(n,t),f.appendChild(p);var m=document.createElement("span");m.className="renuvex-pr-minimal-count",m.textContent=a.toLocaleString("tr-TR")+" Yorum",f.appendChild(m),u.appendChild(f),d.appendChild(u);var h=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),c=h.querySelector(".renuvex-pr-filter-wrap"),w=h.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");if(g.className="renuvex-pr-minimal-actions",w&&g.appendChild(w),c&&g.appendChild(c),d.appendChild(g),w){var s=document.createElement("button");s.className="renuvex-pr-write-btn",s.textContent=P&&P.writeButtonText||"Yorum Yap",s.onclick=Y;var b=document.createElement("div");b.className="renuvex-pr-minimal-write-row",b.appendChild(s),d.appendChild(b)}return d}var jr={};fe(jr,{css:()=>Ga,meta:()=>qa,render:()=>Xa});var ra=`
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
`;var qa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ga=ra;function Xa(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var u=document.createElement("div");u.className="renuvex-pr-hero-info";var f=document.createElement("div");f.className="renuvex-pr-hero-rating-col";var v=document.createElement("span");v.className="renuvex-pr-hero-avg",v.textContent=n,f.appendChild(v);var p=document.createElement("div");p.className="renuvex-pr-hero-meta-row";var m=document.createElement("span");m.className="renuvex-pr-hero-stars",m.innerHTML=Re(n,t),p.appendChild(m);var h=document.createElement("div");h.className="renuvex-pr-hero-count",h.textContent=a.toLocaleString("tr-TR")+" Yorum",p.appendChild(h),f.appendChild(p),u.appendChild(f),d.appendChild(u);var c=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),w=c.querySelector(".renuvex-pr-filter-wrap"),g=c.querySelector(".renuvex-pr-write-btn"),s=document.createElement("div");s.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",g&&s.appendChild(g),w&&s.appendChild(w),d.appendChild(s);var b=re({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:Y,onSortChange:i}),y=b.querySelector(".renuvex-pr-filter-wrap"),x=b.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-hero-write-row",x&&z.appendChild(x),y&&z.appendChild(y),d.appendChild(z),d}var zr={classic:Or,compact:Hr,split:Yr,minimal:Dr,hero:jr};function Cr(e){return zr[e]||zr.classic}function ta(){return Object.keys(zr).map(function(e){return zr[e].css||""}).join(`
`)}var Vr={};fe(Vr,{css:()=>Ja,meta:()=>Ka,render:()=>Za});function De(e,r,t){var a=t||{},n=document.createDocumentFragment(),o=document.createElement("div");o.className=r+" renuvex-pr-body-clamped",o.textContent=e,n.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-body-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:o,readMore:l}}function je(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",o.textContent=e,t.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-reply-text-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var aa=`
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
`;var Ka={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Ja=aa;function Za(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var o=document.createElement("span");o.className="renuvex-pr-review-stars",o.innerHTML=de(e.rating,P),n.appendChild(o);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=se(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-title",i.textContent=e.title,t.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var u=(e.comment||"").trim();u&&t.appendChild(De(u,"renuvex-pr-body").fragment);var f=he(e);if(f.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",f.forEach(function(m){var h=document.createElement("img"),c=ae(m,V);h.src=c.src,h.srcset=c.srcset,h.loading="lazy",h.decoding="async",h.width=V,h.height=V,h.className="renuvex-pr-img",ne(h),h.setAttribute("data-renuvex-img-url",m),(function(w){be(h,function(){oe(e,w,r)})})(m),v.appendChild(h)}),t.appendChild(v)}var p=je(e.merchantReply);return p&&t.appendChild(p),t}var Ur={};fe(Ur,{css:()=>Qa,meta:()=>$a,render:()=>en});var na=`
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
`;var $a={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Qa=na;function en(e,r){var t=he(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=de(e.rating,P),o.appendChild(l);var i=document.createElement("span");i.className="renuvex-pr-review-list-author-name",i.textContent=e.author||"",o.appendChild(i);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=se(e.createdAt),o.appendChild(d),n.appendChild(o);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var f=document.createElement("div");f.className="renuvex-pr-review-list-title",f.textContent=e.title,u.appendChild(f)}var v=(e.comment||"").trim();v&&u.appendChild(De(v,"renuvex-pr-review-list-body").fragment);var p=je(e.merchantReply);if(p&&u.appendChild(p),n.appendChild(u),a){var m=document.createElement("div");m.className="renuvex-pr-review-list-media",t.forEach(function(h){var c=document.createElement("img"),w=ae(h,V);c.src=w.src,c.srcset=w.srcset,c.loading="lazy",c.decoding="async",c.width=V,c.height=Math.round(V*4/3),c.setAttribute("data-renuvex-img-url",h),ne(c),(function(g){be(c,function(){oe(e,g,r)})})(h),m.appendChild(c)}),n.appendChild(m)}return n}var Wr={};fe(Wr,{css:()=>tn,meta:()=>rn,render:()=>an});var ia=`
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
`;var rn={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},tn=ia;function an(e,r){var t=ur(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=de(e.rating,P),o.appendChild(l),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-gallery-title",i.textContent=e.title,o.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",o.appendChild(d);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=se(e.createdAt),o.appendChild(u);var f=(e.comment||"").trim();if(f&&o.appendChild(De(f,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){oe(e,t,r)}}:null).fragment),n.appendChild(o),a){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var p=document.createElement("img"),m=ae(t,dr);p.src=m.src,p.srcset=m.srcset,p.loading="lazy",p.decoding="async",p.width=dr,p.height=Math.round(dr*4/3),ne(p),p.setAttribute("data-renuvex-img-url",t),be(p,function(){oe(e,t,r)}),v.appendChild(p),n.appendChild(v)}var h=je(e.merchantReply,t?function(){oe(e,t,r)}:null);return h&&(h.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(h)),n}var kr={card:Vr,list:Ur,gallery:Wr};function Sr(e){return kr[e]||kr.card}function oa(){return Object.keys(kr).map(function(e){return kr[e].css||""}).join(`
`)}var qr=0;function Ve(){return qr++,qr}function Ue(e,r){return e!==qr?!1:r?!(r.productId!==void 0&&O!==r.productId||r.orderBy!==void 0&&U!==r.orderBy||r.page!==void 0&&tr!==r.page||r.ratingFilter!==void 0&&Q!==r.ratingFilter||r.hasImages!==void 0&&ee!==r.hasImages):!0}var Gr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Xr={small:80,medium:110,large:140};function la(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var o=document.createElementNS(t,"line");o.setAttribute("x1","1"),o.setAttribute("y1","1"),o.setAttribute("x2","23"),o.setAttribute("y2","23"),a.appendChild(n),a.appendChild(o);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var i=document.createElement("div");return i.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",i.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(i),r}function pa(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function ce(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),o=parseInt(t[3],16);return"rgba("+a+","+n+","+o+","+r+")"}function Er(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Kr(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function ua(e){return .2126*Kr(e.r)+.7152*Kr(e.g)+.0722*Kr(e.b)}function da(e,r){var t=ua(e),a=ua(r),n=Math.max(t,a),o=Math.min(t,a);return(n+.05)/(o+.05)}function nn(e){var r=Er(e)||Er("#ffffff"),t=Er("#111111"),a=Er("#ffffff");return da(t,r)>=da(a,r)?"#111111":"#ffffff"}function on(e){return ce(e,e==="#ffffff"?.1:.06)}function sa(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",i=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",u=ce(l,.06),f=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",p=r.btnTextColor||"#ffffff",m=r.btnBorderColor||"#111111",h=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",w=r.filterBtnBorderColor||"#111111",g=r.filterMenuBgColor||"#ffffff",s=r.filterMenuBorderColor||"#e5e7eb",b=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",x=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",C=r.reviewAuthorColor||"#111111",S=r.reviewDateColor||"#5e5e5e",k=r.reviewBodyColor||"#111111",E=r.reviewBorderColor||"#e5e7eb",L=ce(k,.65),A=r.replyBgColor||"#f9fafb",T=r.replyBorderColor||"#747474",N=r.replyLabelColor||"#111111",B=r.replyTextColor||"#111111",D=r.photoTitleColor||"#111111",X=ce("#111111",.05),j=r.photoArrowBgColor||"#ffffff",K=r.photoArrowTextColor||"#111111",I=ce("#111111",.12),J=r.formBgColor||"#ffffff",we=r.formPrimaryTextColor||"#111111",H=r.formSecondaryTextColor||"#3b3b3b",Te=r.inputTextColor||we,me=r.inputBorderColor||"#d1d5db",ye=r.placeholderColor||"#9ca3af",te=r.formStepBarColor||"#111111",R=r.formBtnBgColor||"#111111",xe=r.formBtnTextColor||"#ffffff",F=r.formBtnBorderColor||"#111111",$e=ce(R,.06),ze=ce(R,.18),_=ce(xe,.85),Z=ce(we,.06),$=nn(J),M=on($),le=r.loadMoreBgColor||"#ffffff",Qe=r.loadMoreTextColor||"#111111",er=r.loadMoreBorderColor||"#111111",pe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":o,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":i,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":p,"--renuvex-pr-btn-border":m,"--renuvex-pr-filter-btn-bg":h,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":w,"--renuvex-pr-filter-menu-bg":g,"--renuvex-pr-filter-menu-border":s,"--renuvex-pr-filter-item-text":b,"--renuvex-pr-filter-item-hover-bg":y,"--renuvex-pr-filter-item-active":x,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":C,"--renuvex-pr-review-date":S,"--renuvex-pr-review-body":k,"--renuvex-pr-review-border":E,"--renuvex-pr-state-text":L,"--renuvex-pr-review-star-color":f,"--renuvex-pr-reply-bg-color":A,"--renuvex-pr-reply-border":T,"--renuvex-pr-reply-label":N,"--renuvex-pr-reply-text":B,"--renuvex-pr-photo-title":D,"--renuvex-pr-photo-image-border":X,"--renuvex-pr-photo-arrow-bg":j,"--renuvex-pr-photo-arrow-text":K,"--renuvex-pr-photo-arrow-border":I,"--renuvex-pr-fwizard-bg":J,"--renuvex-pr-fwizard-text":we,"--renuvex-pr-fwizard-secondary-text":H,"--renuvex-pr-fwizard-input-bg":J,"--renuvex-pr-fwizard-input-text":Te,"--renuvex-pr-fwizard-input-border":me,"--renuvex-pr-fwizard-placeholder":ye,"--renuvex-pr-fwizard-close-text":$,"--renuvex-pr-fwizard-close-hover-bg":M,"--renuvex-pr-fwizard-progress-bg":Z,"--renuvex-pr-fwizard-progress-active":te,"--renuvex-pr-fwizard-btn-bg":R,"--renuvex-pr-fwizard-btn-text":xe,"--renuvex-pr-fwizard-btn-border":F,"--renuvex-pr-fwizard-btn-disabled-bg":ze,"--renuvex-pr-fwizard-btn-disabled-text":_,"--renuvex-pr-fwizard-nav-hover-bg":$e,"--renuvex-pr-load-more-bg":le,"--renuvex-pr-load-more-text":Qe,"--renuvex-pr-load-more-border":er};Object.keys(pe).forEach(function(We){e.style.setProperty(We,pe[We])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function va(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,o=e.wireLightboxTrigger,l=(e.photoStripReviews||[]).filter(function(y){return he(y).length>0});if(!(r.showPhotoGallery!==!1&&!a&&l.length>0))return null;var i=document.createElement("div");if(i.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var d=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",u=document.createElement("div");u.className="renuvex-pr-photo-title",u.textContent=d,i.appendChild(u)}var f=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",f);var v=document.createElement("div");v.className="renuvex-pr-photo-strip";var p=V,m=r.reviewLayout==="card"?V:Math.round(V*4/3),h=0;l.forEach(function(y){if(!(h>=15)){var x=ur(y);if(x){var z=document.createElement("img"),C=ae(x,V);z.src=C.src,z.srcset=C.srcset,z.loading=h<3?"eager":"lazy",z.decoding="async",z.width=p,z.height=m,z.className="renuvex-pr-photo-strip-thumb",z.alt="Yorum foto\u011Fraf\u0131",ne(z),(function(S,k){o(z,function(){n(k,S,l)})})(x,y),v.appendChild(z),h++}}});var c=document.createElement("button");c.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var w=q(Pe);w&&c.appendChild(w),c.setAttribute("aria-label","\xD6nceki"),c.onclick=function(){v.scrollBy({left:-200,behavior:"smooth"})};var g=document.createElement("button");g.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var s=q(pr);s&&g.appendChild(s),g.setAttribute("aria-label","Sonraki"),g.onclick=function(){v.scrollBy({left:200,behavior:"smooth"})};var b=document.createElement("div");return b.className="renuvex-pr-photo-strip-wrap",b.appendChild(c),b.appendChild(v),b.appendChild(g),i.appendChild(b),i}function ca(e){var r=e.render;async function t(){var o=Ve(),l=O,i=U,d=Q,u=ee,f=await Ie(O,U,1,Q,ee);Ue(o,{productId:l,orderBy:i,ratingFilter:d,hasImages:u})&&await r(O,P,f,Le,U,1,Zr)}async function a(o){var l=Ve(),i=Q===o?null:o,d=O,u=U,f=ee;Qr(i),Ne(1);var v=await Ie(O,U,1,i,ee);Ue(l,{productId:d,orderBy:u,page:1,ratingFilter:i,hasImages:f})&&await r(O,P,v,Le,U,1)}async function n(o,l){var i=Ve(),d=O,u=Q;Ne(1);var f=o,v=!1;l&&(v=!0,f="newest"),et(v),ar(f);var p=await Ie(O,f,1,Q,v);Ue(i,{productId:d,orderBy:f,page:1,ratingFilter:u,hasImages:v})&&await r(O,P,p,Le,f,1)}return{onRetry:t,onFilterChange:a,onSortChange:n}}function ln(){return wt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function pn(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ht({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),bt(t,{surface:"reviews",productId:r||""}),t}async function Jr(e,r,t,a,n,o,l){if(ut){or({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:o,badgeSettings:l});return}ir(!0),rt(e),tt(r),l!==void 0&&at(l),nt(a),n&&ar(n),o&&Ne(o),t!=null&&it(t);var i=ca({render:Jr});try{let ze=function(_,Z){if(!(!_||!_.meta||!_.meta.sizeOverrides)){var $=_.meta.sizeOverrides[Z];$&&Object.keys($).forEach(function(M){m.style.setProperty(M,$[M])})}};var $e=ze,d=Cr(r.summaryLayout),u=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),f=r.showTitle!==!1,v=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=u&&f?v:"",m=document.documentElement;sa(m,r);var h=r.borderRadius!==void 0?r.borderRadius:8,c=Gr[r.size]||Gr.medium,w=Xr[r.thumbnailSize]||Xr.medium;m.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),m.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),m.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),m.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),m.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),m.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),m.style.setProperty("--renuvex-pr-radius",h+"px"),m.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,h-4)+"px"),m.style.setProperty("--renuvex-pr-photo-title-size",c.photoTitleSize+"px"),m.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),m.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),m.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),m.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),m.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),m.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),m.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),m.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),m.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),m.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),m.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),m.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),m.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),m.style.setProperty("--renuvex-pr-thumbnail-size",w+"px");var g=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";m.style.setProperty("--renuvex-pr-review-star-color",g),m.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),m.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),ze(Cr(r.summaryLayout),r.size),ze(Sr(r.reviewLayout),r.size);var s=Xe(r),b=ln();if(!b)return;var y=pn(b,e),x=document.getElementById("renuvex-reviews");x||(x=document.createElement("div"),x.id="renuvex-reviews",x.style.minHeight="200px"),x.parentNode!==y&&y.appendChild(x);var z=yt(x),C=Be+Ae+cr+ta()+oa();_e(z,C);var S=Ct(z);if(r.enabled===!1){x.style.minHeight="auto",S.replaceChildren(la(r.borderRadius!==void 0?r.borderRadius:8)),ir(!1);var k=nr;or(null),k&&Jr(k.productId,k.settings,k.reviewsData,k.productName,k.orderBy,k.page,k.badgeSettings);return}try{var E=t||{},L=Pr(E),A=L?[]:E.data&&E.data.reviews||[];ot(A),S.replaceChildren();var T=document.createElement("section");if(T.id="renuvex-reviews-widget",T.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),T.className="renuvex-pr-reviews-widget",T.setAttribute("data-renuvex-surface","reviews"),e&&T.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(T.style.width="100%",T.style.maxWidth="100%",T.style.marginLeft="0",T.style.marginRight="0"),p){var N=document.createElement("div"),B=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+B,N.textContent=p,T.appendChild(N)}if(L){T.appendChild(pa(E.message,i.onRetry)),S.appendChild(T),Ce(z),Tr(T,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return z.getElementById("renuvex-reviews-widget")});return}var D=E.data&&E.data.allCount||0,X=E.data&&E.data.ratingCounts||null,j=X||[0,0,0,0,0],K=E.data&&E.data.avgRating||"0.0";if(!X&&A.length>0){A.forEach(function(_){_.rating>=1&&_.rating<=5&&j[_.rating-1]++});var I=A.reduce(function(_,Z){return _+Z.rating},0);K=(I/A.length).toFixed(1)}if(D>0){var J=Cr(r.summaryLayout),we=J.render({widget:T,data:E,settings:r,iconPair:s,allCount:D,ratingCounts:j,avgRatingVal:K,currentRatingFilter:Q,currentOrderBy:U,currentHasImages:ee,onFilterChange:i.onFilterChange,onSortChange:i.onSortChange});T.appendChild(we)}else{var H=document.createElement("button");H.className="renuvex-pr-write-btn",H.style.cssText="display:block;margin:16px auto 0;",H.textContent=r.writeButtonText||"Yorum Yap",H.onclick=Y,T.appendChild(H)}var Te=va({settings:r,root:m,currentHasImages:ee,photoStripReviews:$r,openReviewModal:oe,wireLightboxTrigger:be});if(Te&&T.appendChild(Te),A.length===0){var me=document.createElement("p");me.className="renuvex-pr-state-msg",me.textContent="Hen\xFCz yorum yok.",T.appendChild(me)}else{var ye=Sr(r.reviewLayout);A.forEach(function(_){T.appendChild(ye.render(_,Ar))})}var te=E.data&&E.data.hasMore;if(te){var R=document.createElement("button");R.className="renuvex-pr-load-more",R.textContent="Daha Fazla G\xF6ster",R.onclick=async function(){R.disabled=!0,R.textContent="Y\xFCkleniyor...";var _=Ve(),Z=O,$=U,M=tr,le=Q,Qe=ee,er=M+1,pe=await Ie(Z,$,er,le,Qe);if(Ue(_,{productId:Z,orderBy:$,page:M,ratingFilter:le,hasImages:Qe}))if(pe&&!Pr(pe)&&pe.data&&Array.isArray(pe.data.reviews)){var We=lt(pe.data.reviews);pt(We),Ne(er);var ma=Sr(P.reviewLayout);We.forEach(function(xa){T.insertBefore(ma.render(xa,Ar),R)}),pe.data.hasMore?(R.disabled=!1,R.textContent="Daha Fazla G\xF6ster"):R.remove()}else R.disabled=!1,R.textContent="Tekrar Dene"},T.appendChild(R)}S.appendChild(T),Ce(z),Tr(T,"reviews-widget",{productId:e||""},function(){return z.getElementById("renuvex-reviews-widget")})}catch(_){console.error("[renuvex-pr] render error:",_);var xe=document.createElement("p");xe.style.cssText="text-align:center;color:#dc2626;",xe.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",S&&S.replaceChildren(xe)}}finally{if(ir(!1),nr){var F=nr;or(null),Jr(F.productId,F.settings,F.reviewsData,F.productName,F.orderBy,F.page,F.badgeSettings)}}}export{Jr as render};
