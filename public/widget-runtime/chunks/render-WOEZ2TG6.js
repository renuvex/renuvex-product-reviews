/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Te,d as er}from"./chunk-FW6W6ZQL.js";import{b as Nr,c as Re}from"./chunk-ZM24JLBV.js";import{A as nr,B as ir,a as G,b as rr,c as re,d as te,e as O,f as P,g as Zr,h as Ae,j as Tr,k as $r,l as tr,m as Le,n as Qr,o as et,p as rt,q as tt,r as at,s as nt,t as it,v as ot,w as lt,x as pt,y as ut,z as ar}from"./chunk-NQF4A7IV.js";import{A as fe,B as pr,C as V,D as ur,E as dr,F as Ar,G as Lr,H as ne,I as gt,J as ie,K as ht,L as bt,c as Er,e as xe,f as X,g as de,h as K,i as ye,j as or,k as Je,l as dt,m as Ne,n as lr,o as st,p as ze,q as vt,r as ct,t as mt,u as se,v as Pe,x as xt,y as ve,z as ft}from"./chunk-MTTT6TY3.js";import{a as Ze}from"./chunk-GSBAPHFO.js";import{a as me,b as Xe,c as Ke,k as wt,l as Ce}from"./chunk-YCWIZ2SG.js";var Ie=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function yt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Be(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function sr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function zt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Ct(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var kt=`
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

  .renuvex-pr-state-msg{text-align:center;color:rgba(17,17,17,0.45);font-size:14px;padding:30px 0;}
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
`;var vr=[kt,xt,Et,Tt,At,Lt,St].join(`
`);function ca(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function oe(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function ma(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function xa(e){var r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",o=ma()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function fa(e){var r=document.body.style,t=document.documentElement.style;oe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),oe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),oe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),oe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),oe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),oe(r,"position",e.bodyPosition,e.bodyPositionPriority),oe(r,"top",e.bodyTop,e.bodyTopPriority),oe(r,"left",e.bodyLeft,e.bodyLeftPriority),oe(r,"right",e.bodyRight,e.bodyRightPriority),oe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var $e=0,Me=null;function cr(){return $e+=1,$e>1||(Me=ca(),xa(Me)),Me}function mr(){if($e!==0&&($e-=1,!($e>0))){var e=Me;Me=null,e&&fa(e)}}function ga(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function xr(){var e=ga();return!e||e===document.body||e===document.documentElement?null:e}function J(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function ha(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Pr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ha)}function ba(e,r){var t=e,a=Pr(e);!a.length&&r&&(t=r,a=Pr(r));var n=a[0]||t&&t.querySelector('[role="dialog"]')||t;J(n)}function fr(e,r,t){if(e.key==="Tab"){var a=Pr(r);if(!a.length){e.preventDefault(),ba(r);return}var n=a[0],o=a[a.length-1],l=zt(t);if(!r.contains(l)){e.preventDefault(),J(n);return}if(a.indexOf(l)===-1){e.preventDefault(),J(e.shiftKey?o:n);return}e.shiftKey&&l===n?(e.preventDefault(),J(o)):!e.shiftKey&&l===o&&(e.preventDefault(),J(n))}}var Nt="renuvexPrOverlay";function gr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[Nt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function wa(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[Nt]===e.id)}function hr(e){if(wa(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function _e(e){return fe(e)}function Pt(e,r,t,a,n){mr(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&or(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),J(n)}function ya(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=se(e.rating,P);var o=document.createElement("span");o.className="renuvex-pr-modal-date",o.textContent=ve(e.createdAt),a.appendChild(n),a.appendChild(o),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var i=document.createElement("div");i.className="renuvex-pr-modal-author",i.textContent=e.author||"",t.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-modal-body",d.textContent=(e.comment||"").trim(),d.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var f=document.createElement("div");f.className="renuvex-pr-modal-reply-label",f.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="renuvex-pr-modal-reply-text",c.textContent=e.merchantReply||"",u.appendChild(f),u.appendChild(c),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Rt(e,r,t){var a=t||P,n=e.querySelector(".renuvex-pr-modal-scroll-content"),o=n.querySelector(".renuvex-pr-modal-stars");o.innerHTML=se(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=ve(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var i=n.querySelector(".renuvex-pr-modal-body");i.textContent=(r.comment||"").trim(),i.style.display=r.comment&&r.comment.trim()?"":"none";var d=n.querySelector(".renuvex-pr-modal-reply");d.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",d.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",d.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Ir(e,r,t,a,n,o,l,i,d){var u=_e(e),f=Math.max(0,Math.min(t||0,u.length-1)),c=document.createElement("div");c.className="renuvex-pr-modal-left";var p=document.createElement("img"),x=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";p.className="renuvex-pr-modal-main-img"+(x?" "+x:""),p.src=Lr(u[f]||""),p.decoding="async",p.width=Ar,p.height=Math.round(Ar*4/3),p.alt="Yorum foto\u011Fraf\u0131",gt(p,function(S){if(S.style.display="none",!c.querySelector(".renuvex-pr-modal-img-error")){var T=document.createElement("div");T.className="renuvex-pr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",c.insertBefore(T,S)}}),c.appendChild(p);var g=document.createElement("button");g.className="renuvex-pr-modal-close-mobile";var v=K(ze);v&&g.appendChild(v),g.setAttribute("aria-label","Kapat"),g.onclick=function(S){S.stopPropagation(),o()},c.appendChild(g);var b=0;if(c.addEventListener("touchstart",function(S){b=S.touches[0].clientX},{passive:!0}),c.addEventListener("touchend",function(S){var T=b-S.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(w)ce(e,r,f+1,a,n,o,!0,"next",i,d);else if(h){var N=a[r+1];ce(N,r+1,0,a,n,o,!1,"next",i,d)}}else if(m)ce(e,r,f-1,a,n,o,!0,"prev",i,d);else if(y){var I=a[r-1],R=_e(I);ce(I,r-1,R.length-1,a,n,o,!1,"prev",i,d)}}},{passive:!0}),u.length>1){var s=document.createElement("div");s.className="renuvex-pr-modal-thumbs",u.forEach(function(S,T){var N=document.createElement("img"),I=ne(S,dr);N.src=I.src,N.srcset=I.srcset,N.loading="lazy",N.decoding="async",N.width=dr,N.height=dr,N.className="renuvex-pr-modal-thumb"+(T===f?" renuvex-pr-modal-thumb-active":""),N.alt="K\xFC\xE7\xFCk resim "+(T+1),ie(N),N.tabIndex=0,N.setAttribute("role","button"),N.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===f&&N.setAttribute("aria-current","true"),(function(R){function U(){ce(e,r,R,a,n,o,!0,null,i,d)}N.onclick=U,N.onkeydown=function(W){(W.key==="Enter"||W.key===" ")&&(W.preventDefault(),U())}})(T),s.appendChild(N)}),c.appendChild(s)}var m=f>0,w=f<u.length-1,y=r>0,h=r<a.length-1,C=m||y,z=w||h;if(C){var A=document.createElement("button");A.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var k=K(Ne);k&&A.appendChild(k),A.setAttribute("aria-label","\xD6nceki"),A.onclick=function(S){if(S.stopPropagation(),m)ce(e,r,f-1,a,n,o,!0,"prev",i,d);else if(y){var T=a[r-1],N=_e(T);ce(T,r-1,N.length-1,a,n,o,!1,"prev",i,d)}},c.appendChild(A)}if(z){var L=document.createElement("button");L.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var E=K(lr);E&&L.appendChild(E),L.setAttribute("aria-label","Sonraki"),L.onclick=function(S){if(S.stopPropagation(),w)ce(e,r,f+1,a,n,o,!0,"next",i,d);else if(h){var T=a[r+1];ce(T,r+1,0,a,n,o,!1,"next",i,d)}},c.appendChild(L)}return c}function It(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=_e(a);n[0]&&(new Image().src=Lr(n[0]))}})}function Rr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function za(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function o(){Rr(t),Rr(a),Rr(n)}o(),t&&J(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ce(e,r,t,a,n,o,l,i,d,u){if(u&&(u.currentReview=e),l){var f=Ir(e,r,t,a,n,o,i,d,u);n.firstChild&&n.replaceChild(f,n.firstChild)}else{var f=Ir(e,r,t,a,n,o,i,d,u),c=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(f,n.firstChild),c&&Rt(c,e,u&&u.currentSettings),za(d,n)}It(r,a)}function le(e,r,t){var a=_e(e);if(!a.length)return;var n=(t||[]).filter(function(z){return _e(z).length>0}),o=n.findIndex(function(z){return z===e||z.id===e.id});o===-1&&(n.unshift(e),o=0);var l=a.indexOf(r);l<0&&(l=0);var i=document.createElement("div");i.className="renuvex-pr-modal-overlay";var d=document.createElement("div");d.className="renuvex-pr-modal";var u=!1,f=null,c=xr(),p=cr(),x=gr(),g={currentReview:e,currentSettings:P},v=null;function b(z){var A=z&&z.detail&&z.detail.settings;if(!(A&&A===v)){v=A||null,g.currentSettings=A||P;var k=d.querySelector(".renuvex-pr-modal-right");!k||!g.currentReview||Rt(k,g.currentReview,g.currentSettings)}}function s(){u||(u=!0,window.removeEventListener(Ce,b),Pt(f&&f.host,m,s,p,c))}function m(z){if(z.key==="Escape"){w();return}fr(z,i,f&&f.root)}function w(){u||(u=!0,window.removeEventListener(Ce,b),Pt(f&&f.host,m,s,p,c),hr(x))}document.addEventListener("keydown",m),window.addEventListener("popstate",s),window.addEventListener(Ce,b),i.onclick=function(){w()},d.onclick=function(z){z.stopPropagation()},d.appendChild(Ir(e,o,l,n,d,w,null,i,g)),d.appendChild(ya(e)),It(o,n);var y=document.createElement("div");y.className="renuvex-pr-modal-wrap",y.tabIndex=-1,y.setAttribute("role","dialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),y.appendChild(d);var h=document.createElement("button");h.className="renuvex-pr-modal-close";var C=K(ze);C&&h.appendChild(C),h.setAttribute("aria-label","Kapat"),h.onclick=function(z){z.stopPropagation(),w()},y.appendChild(h),i.appendChild(y),f=sr(),Be(f.root,Ie+Te+vr),f.root.appendChild(i),ye(f.root),J(y)}function ge(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(a){(a.key==="Enter"||a.key===" "||a.key==="Spacebar")&&(a.preventDefault(),r())})}var _r={};me(_r,{css:()=>Pa,meta:()=>Na,render:()=>Ra});function Fe(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,o=e.onFilterChange;xe(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var i=5;i>=1;i--){var d=r[i-1]||0,u=t>0?Math.round(d/t*100):0,f=n===i,c=document.createElement("div");c.className="renuvex-pr-bar-row"+(f?" renuvex-pr-bar-active":""),n&&!f&&(c.style.opacity="0.35");for(var p="",x=1;x<=5;x++){var g=x<=i;p+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(g?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+X(g?"full":"outline")+"</span>"}c.innerHTML='<span class="renuvex-pr-bar-label">'+p+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+d.toLocaleString("tr-TR")+")</span>",(function(v){c.onclick=function(){o(v)}})(i),l.appendChild(c)}return l}var pe=[],Bt=!1,br=!1;function Mt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function Ca(e){if(br){br=!1,e.preventDefault(),e.stopPropagation();return}for(var r=!1,t=pe.length-1;t>=0;t--){var a=pe[t];Mt(e,a.trigger)||Mt(e,a.element)||a.close()&&(r=!0)}r&&(e.preventDefault(),e.stopPropagation())}function ka(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function Sa(){Bt||typeof document=="undefined"||(document.addEventListener("click",Ca,!0),document.addEventListener("keydown",ka),Bt=!0)}function wr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function _t(){br=!0,typeof setTimeout=="function"&&setTimeout(function(){br=!1},700)}function yr(e){Sa();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var a=pe.indexOf(r);a!==-1&&pe.splice(a,1)}}function ae(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,o=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var i=document.createElement("button");i.className="renuvex-pr-write-btn",i.textContent=P&&P.writeButtonText||"Yorum Yap",i.onclick=n,l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var f=P&&P.filterIcon||"lines";u.innerHTML=de(dt(f));var c=document.createElement("div");c.className="renuvex-pr-filter-menu",c.setAttribute("role","menu");var p=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],x=!1;function g(s){var m=c.classList.contains("renuvex-pr-open");c.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var w=s&&(s.restoreFocus===!0||s.restoreFocus==="auto"&&er());if(m&&w)try{u.focus({preventScroll:!0})}catch(y){try{u.focus()}catch(h){}}return m}function v(){wr(b),c.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var s=c.querySelector(".renuvex-pr-filter-item-active")||c.querySelector(".renuvex-pr-filter-item");s&&requestAnimationFrame(function(){try{s.focus({preventScroll:!0})}catch(m){try{s.focus()}catch(w){}}})}p.forEach(function(s){var m=s[2],w=m?a:!a&&(t||"newest")===s[0],y=document.createElement("button");y.type="button",y.className="renuvex-pr-filter-item"+(w?" renuvex-pr-filter-item-active":""),y.setAttribute("role","menuitem"),y.textContent=s[1];var h=!1;function C(z,A){z&&(z.preventDefault(),z.stopPropagation()),!h&&(h=!0,x=!0,A!==!0&&_t(),g({restoreFocus:A}),o(s[0],m),setTimeout(function(){h=!1,x=!1},0))}y.addEventListener("pointerdown",function(z){z.button!==void 0&&z.button!==0||C(z,!1)}),typeof window!="undefined"&&!window.PointerEvent&&y.addEventListener("touchstart",function(z){C(z,!1)},{passive:!1}),y.addEventListener("mousedown",function(z){z.button!==void 0&&z.button!==0||C(z,!1)}),y.addEventListener("keydown",function(z){(z.key==="Enter"||z.key===" ")&&C(z,!0)}),y.onclick=function(z){C(z,!1)},c.appendChild(y)}),u.onclick=function(){c.classList.contains("renuvex-pr-open")?g({restoreFocus:"auto"}):v()},d.addEventListener("keydown",function(s){s.key==="Escape"&&c.classList.contains("renuvex-pr-open")&&(s.stopPropagation(),g({restoreFocus:!0}))}),d.addEventListener("focusout",function(s){if(c.classList.contains("renuvex-pr-open")&&!x){var m=s.relatedTarget;m&&d.contains(m)||g()}});var b=yr({trigger:d,element:c,close:g});return d.appendChild(u),d.appendChild(c),l.appendChild(d),l}var Ft=`
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
`;function Ot(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content",n.appendChild(o);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var i=K(ze);i&&l.appendChild(i),n.appendChild(l);var d=!1,u=null,f=null,c=!1;function p(){J(a)}function x(h){fr(h,a,u&&u.root)}function g(){if(!d){if(d=!0,document.removeEventListener("keydown",v),a.removeEventListener("click",b),l.removeEventListener("click",g),c)J(f);else{var h=u&&u.root?u.root.activeElement:null;if(h&&typeof h.blur=="function")try{h.blur()}catch(C){}}a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(or(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):a.parentNode&&a.parentNode.removeChild(a),mr();try{r()}catch(C){}},200)}}function v(h){if(h.key==="Escape"){g();return}x(h)}function b(h){h.target===a&&t&&g()}document.addEventListener("keydown",v),a.addEventListener("click",b),l.addEventListener("click",g);function s(h){f=xr(),c=er(),h&&o.appendChild(h),u=sr(),Be(u.root,Ie+Te+Ft),u.root.appendChild(a),ye(u.root),cr(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),p()})}var m=null,w=null;function y(h,C){if(C=C||"error",m){try{m.remove()}catch(z){}m=null}w&&(clearTimeout(w),w=null),m=document.createElement("div"),m.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+C,m.textContent=h,n.appendChild(m),w=setTimeout(function(){m&&(m.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(m){try{m.remove()}catch(z){}m=null}},300))},4e3)}return{open:s,close:g,content:o,setAllowOutsideClose:function(h){t=!!h},setStepAttr:function(h){n.setAttribute("data-step",String(h))},showToast:y}}var Br=4;function Oe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Ht(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(o){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Br&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(o){return o!==n})}}}}function Yt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},o=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",i.setAttribute("aria-label","Geri"),i.innerHTML=de(Ne)+"<span>Geri</span>",i.addEventListener("click",function(){a()}),l.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-footer-progress";for(var u=[],f=0;f<Br;f++){var c=document.createElement("span");c.className="renuvex-pr-fwizard-progress-seg",d.appendChild(c),u.push(c)}l.appendChild(d);var p=document.createElement("button");p.type="button";var x=null;function g(b){x&&p.removeEventListener("click",x),x=b,b&&p.addEventListener("click",b)}l.appendChild(p);function v(b,s){var m=r.indexOf(b)!==-1,w=t.indexOf(b)!==-1,y=s&&(s.images&&s.images.length>0||s.pendingImages&&s.pendingImages.length>0);if(m)b===2&&y?(p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",g(function(){o()})):(p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.setAttribute("aria-label","Atla"),p.innerHTML="<span>Atla</span>",g(function(){n()})),p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p.style.visibility="",p.tabIndex=0;else if(w){p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Sonraki"),p.innerHTML="Sonraki",p.style.visibility="",p.tabIndex=0;var h=Oe(b,s);p.disabled=!h,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!h),g(function(){p.disabled||o()})}else p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",p.innerHTML="",p.style.visibility="hidden",p.tabIndex=-1,p.disabled=!0,g(null)}return{el:l,update:function(b,s){u.forEach(function(w,y){y+1<=b?w.classList.add("renuvex-pr-fwizard-progress-seg-active"):w.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var m=b<=1;i.style.visibility=m?"hidden":"",i.style.pointerEvents=m?"none":"",i.tabIndex=m?-1:0,v(b,s)},setNextDisabled:function(b){p.classList.contains("renuvex-pr-fwizard-cta-btn")&&(p.disabled=!!b,p.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!b))},setThanksState:function(b){i.style.visibility="hidden",d.style.visibility="hidden",p.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",p.setAttribute("aria-label","Devam Et"),p.innerHTML="Devam Et",p.style.visibility="",p.disabled=!1,p.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),g(b)}}}function Dt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var i=Je(P||{});xe(i);var d=[];function u(b){d.forEach(function(s,m){var w=m<b;s.classList.toggle("renuvex-pr-fwizard-star-active",w),s.setAttribute("aria-checked",m+1===b?"true":"false"),s.innerHTML=w?X("full"):X("outline")})}function f(b){e.set({rating:b}),u(b)}function c(b){var s=d[b-1];if(s)try{s.focus()}catch(m){}}function p(b,s){s&&typeof s.preventDefault=="function"&&s.preventDefault(),s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),!a&&(a=!0,f(b),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var x=1;x<=5;x++)(function(b){var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-star",s.setAttribute("role","radio"),s.setAttribute("aria-label",b+" y\u0131ld\u0131z"),s.innerHTML=X("outline"),s.addEventListener("mouseenter",function(){u(b)}),s.addEventListener("mouseleave",function(){u(e.get().rating)}),s.addEventListener("pointerdown",function(m){m.button&&m.button!==0||p(b,m)}),typeof window!="undefined"&&!window.PointerEvent&&s.addEventListener("touchstart",function(m){p(b,m)},{passive:!1}),s.addEventListener("mousedown",function(m){window.PointerEvent||p(b,m)}),s.addEventListener("keydown",function(m){if(m.key==="Enter"||m.key===" "){p(b,m);return}var w=0;m.key==="ArrowRight"||m.key==="ArrowUp"?w=Math.min(5,b+1):m.key==="ArrowLeft"||m.key==="ArrowDown"?w=Math.max(1,b-1):m.key==="Home"?w=1:m.key==="End"&&(w=5),w&&(m.preventDefault(),f(w),c(w))}),s.addEventListener("click",function(m){p(b,m)}),d.push(s),l.appendChild(s)})(x);u(e.get().rating);var g=null,v=function(b){var s=b&&b.detail&&b.detail.settings;s&&s===g||(g=s||null,i=Je(s||P||{}),u(e.get().rating))};return window.addEventListener(Ce,v),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Ce,v)}}}var jt=3,Ea=10*1024*1024;function Vt(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var i=document.createElement("button");i.type="button",i.className="renuvex-pr-fwizard-photo-add",i.setAttribute("aria-label","Foto\u011Fraf ekle");var d=document.createElement("input");d.type="file",d.accept="image/*",d.multiple=!0,d.style.display="none",l.appendChild(i),l.appendChild(d);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),l.appendChild(u),a.appendChild(l);var f=r.revokeBlobUrl||function(m){m&&typeof m=="string"&&m.startsWith("blob:")&&URL.revokeObjectURL(m)},c=r.blobMap||{},p=r.urlToFinger||{};function x(){if(!t){var m=e.get().images||[],w=e.get().pendingImages||[],y=m.map(function(h){return{url:h,isPending:!1}}).concat(w.map(function(h){return{url:h.url,file:h.file,isPending:!0,error:h.error}}));u.innerHTML="",y.forEach(function(h){var C=c[h.url]||h.url,z=g(h,C);u.appendChild(z)}),b()}}function g(m,w){var y=document.createElement("div");y.className="renuvex-pr-fwizard-photo-thumb";var h=document.createElement("img");h.src=w,h.alt="",h.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",y.appendChild(h);var C=document.createElement("div");C.className="renuvex-pr-fwizard-photo-loading",C.style.display="none",y.appendChild(C);var z=document.createElement("button");z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.setAttribute("aria-label","Kald\u0131r");var A=K(ze);return A&&z.appendChild(A),y.appendChild(z),v(y,m,w),y}function v(m,w,y){var h=m.querySelector("img");h.src!==y&&(h.src=y);var C=m.querySelector(".renuvex-pr-fwizard-photo-loading");if(w.isPending&&w.error){C.style.display="flex",C.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+w.error,C.appendChild(z)}else C.style.display="none",C.textContent="";var A=m.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var k=p[w.url]||(w.file?w.file.name+"_"+w.file.size:null),L=c[w.url],E={};k&&(E.fingerprints=(e.get().fingerprints||[]).filter(function(S){return S!==k})),w.isPending?E.pendingImages=(e.get().pendingImages||[]).filter(function(S){return S.url!==w.url}):E.images=(e.get().images||[]).filter(function(S){return S!==w.url}),e.set(E),f(w.url),f(L),delete p[w.url],L&&delete p[L],c[w.url]&&delete c[w.url]}}function b(){var m=(e.get().images||[]).length,w=(e.get().pendingImages||[]).length,y=m+w,h=y>=jt;y>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=de(ct)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),i.innerHTML=de(vt)+"<span>Foto\u011Fraf Ekle</span>"),h?(i.style.display="none",i.disabled=!0,d.disabled=!0):(i.style.display="flex",i.disabled=!1,d.disabled=!1,i.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}i.addEventListener("click",function(){d.disabled||d.click()}),d.onchange=async function(m){var w=(e.get().images||[]).length+(e.get().pendingImages||[]).length,y=Array.from(m.target.files).slice(0,jt-w);d.value="";var h=(e.get().pendingImages||[]).length,C=e.get().images||[],z=C.length;if(y.length!==0){for(var A=[],k=[],L=0;L<y.length;L++){var E=y[L],S=E.name+"_"+E.size,T=(e.get().fingerprints||[]).some(function(B){return B===S})||A.some(function(B){return B.file.name+"_"+B.file.size===S});if(!T){if(E.size>Ea){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var I=URL.createObjectURL(E);p[I]=S,A.push({url:I,file:E,error:null}),k.push({url:I,file:E});var R=(e.get().fingerprints||[]).slice();R.push(S),e.set({fingerprints:R})}}if(A.length!==0){var U=(e.get().pendingImages||[]).concat(A),W=async function(){for(var B=0;B<k.length;B++){var q=k[B],ke=q.file,$=q.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Ve=(e.get().pendingImages||[]).filter(function(_){return _.url!==$}),Se=(e.get().images||[]).slice();Se.push($),e.set({pendingImages:Ve,images:Se});continue}try{var Q=await Ze(Ke+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Xe})});if(!Q.ok)throw Q.status===429?new Error("rate_limit"):new Error("sign failed");var Y=await Q.json();if(!Y.folder)throw new Error("sign folder missing");var D=new FormData;D.append("file",ke),D.append("api_key",Y.api_key),D.append("timestamp",Y.timestamp),D.append("signature",Y.signature),D.append("folder",Y.folder);var Ue=await fetch("https://api.cloudinary.com/v1_1/"+Y.cloud_name+"/image/upload",{method:"POST",body:D}),M=await Ue.json();if(M.secure_url&&ft(M.secure_url)){var be=(e.get().pendingImages||[]).some(function(_){return _.url===$});if(!be)continue;c[M.secure_url]=$,p[M.secure_url]=p[$];var ee=(e.get().pendingImages||[]).filter(function(_){return _.url!==$}),We=(e.get().images||[]).slice();We.push(M.secure_url),e.set({pendingImages:ee,images:We});try{Ze(Ke+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Xe,secureUrl:M.secure_url})}).catch(function(){})}catch(_){}}else throw new Error("invalid image url")}catch(_){console.error("[renuvex-pr] Image upload failed:",_);var ue=_.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ue,"error");var F=(e.get().pendingImages||[]).map(function(j){return j.url===$?{url:j.url,file:j.file,error:ue}:j});e.set({pendingImages:F})}}};if(z===0&&h===0){t=!0;var Z=!r.canNavigate||r.canNavigate();Z&&e.goNext()}e.set({pendingImages:U}),W()}}};var s=e.onChange(x);return x(),{el:a,destroy:function(){t=!0,d.onchange=null,s&&s()}}}var Mr=2e3,Ta=60;function Ut(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=Ta,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),o.appendChild(l);var i=document.createElement("textarea");i.className="renuvex-pr-fwizard-textarea",i.placeholder="Deneyiminizi anlat\u0131n\u2026",i.maxLength=Mr,i.rows=6,i.setAttribute("aria-label","Yorum"),i.value=e.get().comment||"",o.appendChild(i);var d=document.createElement("div");d.className="renuvex-pr-fwizard-char-counter",d.setAttribute("aria-live","polite"),o.appendChild(d);function u(){var c=i.value.length;d.textContent=c+"/"+Mr,d.classList.toggle("renuvex-pr-fwizard-char-counter--max",c>=Mr)}function f(){return Oe(3,e.get())}return i.addEventListener("input",function(){e.set({comment:i.value}),u(),t(f())}),a.appendChild(o),u(),setTimeout(function(){t(f())},0),{el:a,destroy:function(){}}}var Aa=40;function Wt(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",n.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var i=document.createElement("div");i.className="renuvex-pr-fwizard-field";var d=document.createElement("label");d.className="renuvex-pr-fwizard-label",d.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=Aa,u.setAttribute("aria-required","true"),u.value=e.get().author||"",i.appendChild(d),i.appendChild(u),l.appendChild(i);var f=document.createElement("div");f.className="renuvex-pr-fwizard-field";var c=document.createElement("label");c.className="renuvex-pr-fwizard-label",c.textContent="E-posta (opsiyonel)";var p=document.createElement("input");p.type="email",p.className="renuvex-pr-fwizard-input",p.setAttribute("autocomplete","email"),p.value=e.get().email||"",f.appendChild(c),f.appendChild(p),l.appendChild(f);var x=document.createElement("div");x.className="renuvex-pr-fwizard-notice",x.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(x);var g=document.createElement("div");g.className="renuvex-pr-fwizard-msg",g.setAttribute("role","alert"),g.setAttribute("aria-live","assertive"),l.appendChild(g);var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-submit-btn",v.textContent="G\xF6nder",l.appendChild(v),n.appendChild(l);function b(){return Oe(4,e.get())}function s(){var h=!b(),C=(e.get().pendingImages||[]).length,z=C>0;z?(v.disabled=!0,v.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),v.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(v.disabled=h,v.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",h),v.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),s(),t(b())}),p.addEventListener("input",function(){e.set({email:p.value})}),s(),setTimeout(function(){t(b())},0);function m(){g.textContent=""}function w(h){m();var C=document.createElement("div");C.className="renuvex-pr-fwizard-msg-error",C.textContent=h||"",g.appendChild(C)}v.onclick=async function(){if(!v.disabled){var h=e.get(),C=(h.author||"").trim(),z=(h.comment||"").trim();if(p.value.trim()&&!p.checkValidity()){p.reportValidity();return}if(!C){w("Gerekli alan");return}if(!h.rating){w("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}v.disabled=!0,v.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=v.textContent;if(v.textContent="G\xF6nderiliyor\u2026",m(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var k=mt(window.location.href),L=h.productName||null,E=await Ze(Ke+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:Xe,productId:h.productId||null,slug:k||null,productName:L,author:C,title:(h.title||"").trim()||null,comment:z||null,rating:h.rating,images:h.images||[]})},15e3);if(E.ok)a();else{var S=await E.json().catch(function(){return{}});throw new Error(S.error||"Yorum kaydedilemedi.")}}catch(I){var T=I&&(I.name==="AbortError"||/signal/i.test(I.message||"")),N=T?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":I.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(N,"error"):w(N),v.disabled=!1,v.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),v.textContent=A}}};var y=e.onChange(s);return{el:n,destroy:function(){v.onclick=null,y&&y()}}}function La(e,r,t){if(t=t||{},e===1)return Dt(r,{canNavigate:t.canNavigate});if(e===2)return Vt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Ut(r,{onValidityChange:t.onValidityChange});if(e===4)return Wt(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function qt(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Gt(e){e=e||{};var r=Ht({productId:e.productId,productName:e.productName}),t={},a={},n={};function o(k){if(!(!k||typeof k!="string"||!k.startsWith("blob:")||n[k])){n[k]=!0;try{URL.revokeObjectURL(k)}catch(L){}}}function l(){Object.keys(a).forEach(function(L){o(L)}),Object.keys(t).forEach(function(L){o(t[L])});var k=r.get();(k.pendingImages||[]).forEach(function(L){o(L&&L.url)}),(k.images||[]).forEach(function(L){o(L)})}var i=Ot({onClose:function(){window.removeEventListener("popstate",u),hr(d),l(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=gr(),u=function(k){i&&i.close&&i.close()};window.addEventListener("popstate",u);var f=document.createElement("div");f.className="renuvex-pr-fwizard-step-wrap";var c=Yt({skippableSteps:[2],nextableSteps:[3],onBack:function(){g==="idle"&&r.goBack()},onSkip:function(){g==="idle"&&r.goNext()},onNext:function(){g==="idle"&&r.goNext()}}),p=document.createElement("div");p.className="renuvex-pr-fwizard-layout",p.appendChild(f),p.appendChild(c.el);var x=null,g="idle",v=null,b=!0,s=null;function m(k,L){f.innerHTML="";var E=La(k,r,{canNavigate:function(){return g==="idle"},blobMap:t,urlToFinger:a,revokeBlobUrl:o,onValidityChange:function(N){c.setNextDisabled(!N)},onSuccess:y,showToast:i.showToast});if(x=E,c.update(k,r.get()),L){g="entering",E.el.classList.add("renuvex-pr-fwizard-step--enter");var S=null,T=function(){S&&clearTimeout(S),E.el.removeEventListener("animationend",T),E.el.classList.remove("renuvex-pr-fwizard-step--enter"),g="idle",v!==null&&h()};E.el.addEventListener("animationend",T),S=setTimeout(T,700)}else g="idle";f.appendChild(E.el),i.setStepAttr&&i.setStepAttr(k),k===3&&c.setNextDisabled(!0)}var w=!1;function y(){if(!w){if(w=!0,!x){f.innerHTML="";var k=qt();k.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(k),i.setStepAttr("thanks"),c.setThanksState(i.close);return}var L=x;g="exiting",L.el.classList.add("renuvex-pr-fwizard-step--exit");var E=function(){if(s&&clearTimeout(s),L.el.removeEventListener("animationend",E),L.destroy)try{L.destroy()}catch(T){}x===L&&(x=null),f.innerHTML="";var S=qt();S.classList.add("renuvex-pr-fwizard-step--enter"),f.appendChild(S),i.setStepAttr("thanks"),c.setThanksState(i.close),g="idle"};L.el.addEventListener("animationend",E),s=setTimeout(E,300)}}function h(){var k=r.get().currentStep;if(g!=="idle"){v=k;return}if(!x){var L=!b;b=!1,m(k,L);return}var E=x;g="exiting",E.el.classList.add("renuvex-pr-fwizard-step--exit");var S=function(){if(s&&clearTimeout(s),E.el.removeEventListener("animationend",S),E.destroy)try{E.destroy()}catch(N){}if(x===E){f.innerHTML="",x=null;var T=v!==null?v:r.get().currentStep;v=null,m(T,!0),g="idle"}};E.el.addEventListener("animationend",S),s=setTimeout(S,350)}h();var C=r.get().currentStep,z=r.onChange(function(k){k.currentStep!==C?(C=k.currentStep,h()):c.update(k.currentStep,k)}),A=i.close;return i.close=function(){z&&z(),typeof s!="undefined"&&s&&clearTimeout(s),A()},i.open(p),{close:i.close}}function H(){Gt({productId:O||"",productName:Ae||""})}var Xt=`
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
`;var Na={id:"classic",name:"Klasik (A\xE7\u0131k)"},Pa=Xt;function Ra(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,o=e.allCount,l=e.ratingCounts,i=e.avgRatingVal,d=e.currentRatingFilter,u=e.currentOrderBy,f=e.currentHasImages,c=e.onFilterChange,p=e.onSortChange;xe(n);var x=document.createElement("div");x.className="renuvex-pr-summary";var g=(l[3]||0)+(l[4]||0),v=o>0?Math.round(g/o*100):0,b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-avg",b.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+X("full")+'</span><span class="renuvex-pr-avg-num">'+i+"</span>",x.appendChild(b);var s=document.createElement("div");if(s.className="renuvex-pr-summary-block renuvex-pr-summary-count",s.textContent=o.toLocaleString("tr-TR")+" Yorum",x.appendChild(s),a.showRecommendation!==!1&&v>0){var m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",m.innerHTML='<span class="renuvex-pr-recommend-pct">%'+v+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",x.appendChild(m)}return x.appendChild(Fe({ratingCounts:l,allCount:o,iconPair:n,currentRatingFilter:d,onFilterChange:c})),x.appendChild(ae({widget:r,currentOrderBy:u,currentHasImages:f,onWriteClick:H,onSortChange:p})),x}var Fr={};me(Fr,{css:()=>Ba,meta:()=>Ia,render:()=>Ma});var Kt=`
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
`;var Ia={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Ba=Kt;function Ma(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,f=e.onFilterChange,c=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-compact";var x=document.createElement("div");x.className="renuvex-pr-compact-header";var g=document.createElement("div");g.className="renuvex-pr-compact-trigger-wrap";var v=document.createElement("button");v.className="renuvex-pr-compact-trigger",v.type="button",v.setAttribute("aria-expanded","false"),v.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Pe(l,a)+'</span><span class="renuvex-pr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+de(st)+"</span>",g.appendChild(v),x.appendChild(g);var b=ae({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:H,onSortChange:c}),s=b.querySelector(".renuvex-pr-filter-wrap"),m=b.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-compact-actions-slot",m&&w.appendChild(m),s&&w.appendChild(s),x.appendChild(w),p.appendChild(x);var y=document.createElement("div");y.className="renuvex-pr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var h=document.createElement("div");h.className="renuvex-pr-compact-panel-inner";var C=document.createElement("div");C.className="renuvex-pr-compact-avg",C.innerHTML='<span class="renuvex-pr-icon">'+X("full")+"</span><span>"+l+"</span>",h.appendChild(C),h.appendChild(Fe({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:f})),y.appendChild(h);var z=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function A(B){var q=B?p:g;y.parentNode!==q&&(y.classList.contains("renuvex-pr-open")&&(y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")),q.appendChild(y))}if(A(z?z.matches:!1),z){var k=function(B){A(B.matches)};z.addEventListener?z.addEventListener("change",k):z.addListener&&z.addListener(k)}if(m){var L=document.createElement("button");L.className="renuvex-pr-write-btn",L.textContent=P&&P.writeButtonText||"Yorum Yap",L.onclick=H;var E=document.createElement("div");E.className="renuvex-pr-compact-write-row",E.appendChild(L),p.appendChild(E)}function S(){y.classList.remove("renuvex-pr-open"),y.setAttribute("aria-hidden","true"),v.setAttribute("aria-expanded","false")}function T(){wr(N),y.classList.add("renuvex-pr-open"),y.setAttribute("aria-hidden","false"),v.setAttribute("aria-expanded","true")}v.onclick=function(){y.classList.contains("renuvex-pr-open")?S():T()};var N=null;function I(B){N&&(N(),N=null),B||(N=yr({trigger:g,element:y,close:S}))}if(I(z?z.matches:!1),z){var R=function(B){I(B.matches)};z.addEventListener?z.addEventListener("change",R):z.addListener&&z.addListener(R)}if(t.showRecommendation!==!1){var U=(o[3]||0)+(o[4]||0),W=n>0?Math.round(U/n*100):0;if(W>0){var Z=document.createElement("div");Z.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",Z.style.marginTop="8px",Z.innerHTML='<span class="renuvex-pr-recommend-pct">%'+W+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",h.appendChild(Z)}}return p}var Or={};me(Or,{css:()=>Fa,meta:()=>_a,render:()=>Oa});var Jt=`
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
`;var _a={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Fa=Jt;function Oa(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,i=e.currentRatingFilter,d=e.currentOrderBy,u=e.currentHasImages,f=e.onFilterChange,c=e.onSortChange;xe(a);var p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-split";var x=document.createElement("div");x.className="renuvex-pr-split-col renuvex-pr-split-left";var g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",g.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+X("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",x.appendChild(g);var v=document.createElement("div");v.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",v.textContent=n.toLocaleString("tr-TR")+" Yorum",x.appendChild(v),p.appendChild(x);var b=document.createElement("div");b.className="renuvex-pr-split-col renuvex-pr-split-mid",b.appendChild(Fe({ratingCounts:o,allCount:n,iconPair:a,currentRatingFilter:i,onFilterChange:f})),p.appendChild(b);var s=ae({widget:r,currentOrderBy:d,currentHasImages:u,onWriteClick:H,onSortChange:c}),m=s.querySelector(".renuvex-pr-filter-wrap"),w=s.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-right",w&&y.appendChild(w),m&&y.appendChild(m),p.appendChild(y);var h=(o[3]||0)+(o[4]||0),C=n>0?Math.round(h/n*100):0,z=document.createElement("div");z.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",z.innerHTML='<span class="renuvex-pr-recommend-pct">%'+C+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||C===0;return A&&z.classList.add("renuvex-pr-split-rec-hidden"),x.appendChild(z),p}var Hr={};me(Hr,{css:()=>Ya,meta:()=>Ha,render:()=>Da});var Zt=`
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
`;var Ha={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Ya=Zt;function Da(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var u=document.createElement("div");u.className="renuvex-pr-minimal-info";var f=document.createElement("div");f.className="renuvex-pr-minimal-row";var c=document.createElement("span");c.className="renuvex-pr-minimal-avg",c.textContent=n,f.appendChild(c);var p=document.createElement("span");p.className="renuvex-pr-minimal-stars",p.innerHTML=Pe(n,t),f.appendChild(p);var x=document.createElement("span");x.className="renuvex-pr-minimal-count",x.textContent=a.toLocaleString("tr-TR")+" Yorum",f.appendChild(x),u.appendChild(f),d.appendChild(u);var g=ae({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:H,onSortChange:i}),v=g.querySelector(".renuvex-pr-filter-wrap"),b=g.querySelector(".renuvex-pr-write-btn"),s=document.createElement("div");if(s.className="renuvex-pr-minimal-actions",b&&s.appendChild(b),v&&s.appendChild(v),d.appendChild(s),b){var m=document.createElement("button");m.className="renuvex-pr-write-btn",m.textContent=P&&P.writeButtonText||"Yorum Yap",m.onclick=H;var w=document.createElement("div");w.className="renuvex-pr-minimal-write-row",w.appendChild(m),d.appendChild(w)}return d}var Yr={};me(Yr,{css:()=>Va,meta:()=>ja,render:()=>Ua});var $t=`
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
`;var ja={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Va=$t;function Ua(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,i=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var u=document.createElement("div");u.className="renuvex-pr-hero-info";var f=document.createElement("div");f.className="renuvex-pr-hero-rating-col";var c=document.createElement("span");c.className="renuvex-pr-hero-avg",c.textContent=n,f.appendChild(c);var p=document.createElement("div");p.className="renuvex-pr-hero-meta-row";var x=document.createElement("span");x.className="renuvex-pr-hero-stars",x.innerHTML=Pe(n,t),p.appendChild(x);var g=document.createElement("div");g.className="renuvex-pr-hero-count",g.textContent=a.toLocaleString("tr-TR")+" Yorum",p.appendChild(g),f.appendChild(p),u.appendChild(f),d.appendChild(u);var v=ae({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:H,onSortChange:i}),b=v.querySelector(".renuvex-pr-filter-wrap"),s=v.querySelector(".renuvex-pr-write-btn"),m=document.createElement("div");m.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",s&&m.appendChild(s),b&&m.appendChild(b),d.appendChild(m);var w=ae({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:H,onSortChange:i}),y=w.querySelector(".renuvex-pr-filter-wrap"),h=w.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");return C.className="renuvex-pr-hero-write-row",h&&C.appendChild(h),y&&C.appendChild(y),d.appendChild(C),d}var zr={classic:_r,compact:Fr,split:Or,minimal:Hr,hero:Yr};function Cr(e){return zr[e]||zr.classic}function Qt(){return Object.keys(zr).map(function(e){return zr[e].css||""}).join(`
`)}var Dr={};me(Dr,{css:()=>qa,meta:()=>Wa,render:()=>Ga});function He(e,r,t){var a=t||{},n=document.createDocumentFragment(),o=document.createElement("div");o.className=r+" renuvex-pr-body-clamped",o.textContent=e,n.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-body-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:o,readMore:l}}function Ye(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var o=document.createElement("div");o.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",o.textContent=e,t.appendChild(o);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var i=!1;l.onclick=function(){i=!i,o.classList.toggle("renuvex-pr-reply-text-clamped",!i),l.textContent=i?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var ea=`
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
`;var Wa={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},qa=ea;function Ga(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var o=document.createElement("span");o.className="renuvex-pr-review-stars",o.innerHTML=se(e.rating,P),n.appendChild(o);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=ve(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-title",i.textContent=e.title,t.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-author",d.textContent=e.author||"",t.appendChild(d);var u=(e.comment||"").trim();u&&t.appendChild(He(u,"renuvex-pr-body").fragment);var f=fe(e);if(f.length){var c=document.createElement("div");c.className="renuvex-pr-gallery",f.forEach(function(x){var g=document.createElement("img"),v=ne(x,V);g.src=v.src,g.srcset=v.srcset,g.loading="lazy",g.decoding="async",g.width=V,g.height=V,g.className="renuvex-pr-img",ie(g),g.setAttribute("data-renuvex-img-url",x),(function(b){ge(g,function(){le(e,b,r)})})(x),c.appendChild(g)}),t.appendChild(c)}var p=Ye(e.merchantReply);return p&&t.appendChild(p),t}var jr={};me(jr,{css:()=>Ka,meta:()=>Xa,render:()=>Ja});var ra=`
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
`;var Xa={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Ka=ra;function Ja(e,r){var t=fe(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=se(e.rating,P),o.appendChild(l);var i=document.createElement("span");i.className="renuvex-pr-review-list-author-name",i.textContent=e.author||"",o.appendChild(i);var d=document.createElement("time");d.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=ve(e.createdAt),o.appendChild(d),n.appendChild(o);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var f=document.createElement("div");f.className="renuvex-pr-review-list-title",f.textContent=e.title,u.appendChild(f)}var c=(e.comment||"").trim();c&&u.appendChild(He(c,"renuvex-pr-review-list-body").fragment);var p=Ye(e.merchantReply);if(p&&u.appendChild(p),n.appendChild(u),a){var x=document.createElement("div");x.className="renuvex-pr-review-list-media",t.forEach(function(g){var v=document.createElement("img"),b=ne(g,V);v.src=b.src,v.srcset=b.srcset,v.loading="lazy",v.decoding="async",v.width=V,v.height=Math.round(V*4/3),v.setAttribute("data-renuvex-img-url",g),ie(v),(function(s){ge(v,function(){le(e,s,r)})})(g),x.appendChild(v)}),n.appendChild(x)}return n}var Vr={};me(Vr,{css:()=>$a,meta:()=>Za,render:()=>Qa});var ta=`
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
`;var Za={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},$a=ta;function Qa(e,r){var t=pr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var o=document.createElement("div");o.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=se(e.rating,P),o.appendChild(l),e.title){var i=document.createElement("div");i.className="renuvex-pr-review-gallery-title",i.textContent=e.title,o.appendChild(i)}var d=document.createElement("div");d.className="renuvex-pr-review-gallery-author",d.textContent=e.author||"",o.appendChild(d);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ve(e.createdAt),o.appendChild(u);var f=(e.comment||"").trim();if(f&&o.appendChild(He(f,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){le(e,t,r)}}:null).fragment),n.appendChild(o),a){var c=document.createElement("div");c.className="renuvex-pr-review-gallery-media";var p=document.createElement("img"),x=ne(t,ur);p.src=x.src,p.srcset=x.srcset,p.loading="lazy",p.decoding="async",p.width=ur,p.height=Math.round(ur*4/3),ie(p),p.setAttribute("data-renuvex-img-url",t),ge(p,function(){le(e,t,r)}),c.appendChild(p),n.appendChild(c)}var g=Ye(e.merchantReply,t?function(){le(e,t,r)}:null);return g&&(g.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(g)),n}var kr={card:Dr,list:jr,gallery:Vr};function Qe(e){return kr[e]||kr.card}function aa(){return Object.keys(kr).map(function(e){return kr[e].css||""}).join(`
`)}var Ur=0;function De(){return Ur++,Ur}function je(e,r){return e!==Ur?!1:r?!(r.productId!==void 0&&O!==r.productId||r.orderBy!==void 0&&G!==r.orderBy||r.page!==void 0&&rr!==r.page||r.ratingFilter!==void 0&&re!==r.ratingFilter||r.hasImages!==void 0&&te!==r.hasImages):!0}var Wr={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},qr={small:80,medium:110,large:140};function na(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var o=document.createElementNS(t,"line");o.setAttribute("x1","1"),o.setAttribute("y1","1"),o.setAttribute("x2","23"),o.setAttribute("y2","23"),a.appendChild(n),a.appendChild(o);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var i=document.createElement("div");return i.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",i.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(i),r}function ia(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function he(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),o=parseInt(t[3],16);return"rgba("+a+","+n+","+o+","+r+")"}function Sr(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Gr(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function oa(e){return .2126*Gr(e.r)+.7152*Gr(e.g)+.0722*Gr(e.b)}function la(e,r){var t=oa(e),a=oa(r),n=Math.max(t,a),o=Math.min(t,a);return(n+.05)/(o+.05)}function en(e){var r=Sr(e)||Sr("#ffffff"),t=Sr("#111111"),a=Sr("#ffffff");return la(t,r)>=la(a,r)?"#111111":"#ffffff"}function rn(e){return he(e,e==="#ffffff"?.1:.06)}function pa(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",i=r.barTrackColor||"#e5e7eb",d=r.barCountColor||"#111111",u=he(l,.06),f=r.reviewStarColor||"#f59e0b",c=r.btnBgColor||"#111111",p=r.btnTextColor||"#ffffff",x=r.btnBorderColor||"#111111",g=r.filterBtnBgColor||"#111111",v=r.filterBtnTextColor||"#ffffff",b=r.filterBtnBorderColor||"#111111",s=r.filterMenuBgColor||"#ffffff",m=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",h=r.filterItemActiveColor||"#111111",C=r.reviewTitleColor||"#111111",z=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",k=r.reviewBodyColor||"#111111",L=r.reviewBorderColor||"#e5e7eb",E=r.replyBgColor||"#f9fafb",S=r.replyBorderColor||"#747474",T=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",I=r.photoTitleColor||"#111111",R=he("#111111",.05),U=r.photoArrowBgColor||"#ffffff",W=r.photoArrowTextColor||"#111111",Z=he("#111111",.12),B=r.formBgColor||"#ffffff",q=r.formPrimaryTextColor||"#111111",ke=r.formSecondaryTextColor||"#3b3b3b",$=r.inputTextColor||q,Ve=r.inputBorderColor||"#d1d5db",Se=r.placeholderColor||"#9ca3af",Q=r.formStepBarColor||"#111111",Y=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",Ue=r.formBtnBorderColor||"#111111",M=he(Y,.06),be=he(Y,.18),ee=he(D,.85),We=he(q,.06),ue=en(B),F=rn(ue),_=r.loadMoreBgColor||"#ffffff",j=r.loadMoreTextColor||"#111111",we=r.loadMoreBorderColor||"#111111",qe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":o,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":i,"--renuvex-pr-bar-count":d,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":c,"--renuvex-pr-btn-text":p,"--renuvex-pr-btn-border":x,"--renuvex-pr-filter-btn-bg":g,"--renuvex-pr-filter-btn-text":v,"--renuvex-pr-filter-btn-border":b,"--renuvex-pr-filter-menu-bg":s,"--renuvex-pr-filter-menu-border":m,"--renuvex-pr-filter-item-text":w,"--renuvex-pr-filter-item-hover-bg":y,"--renuvex-pr-filter-item-active":h,"--renuvex-pr-review-title":C,"--renuvex-pr-review-author":z,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":k,"--renuvex-pr-review-border":L,"--renuvex-pr-review-star-color":f,"--renuvex-pr-reply-bg-color":E,"--renuvex-pr-reply-border":S,"--renuvex-pr-reply-label":T,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":I,"--renuvex-pr-photo-image-border":R,"--renuvex-pr-photo-arrow-bg":U,"--renuvex-pr-photo-arrow-text":W,"--renuvex-pr-photo-arrow-border":Z,"--renuvex-pr-fwizard-bg":B,"--renuvex-pr-fwizard-text":q,"--renuvex-pr-fwizard-secondary-text":ke,"--renuvex-pr-fwizard-input-bg":B,"--renuvex-pr-fwizard-input-text":$,"--renuvex-pr-fwizard-input-border":Ve,"--renuvex-pr-fwizard-placeholder":Se,"--renuvex-pr-fwizard-close-text":ue,"--renuvex-pr-fwizard-close-hover-bg":F,"--renuvex-pr-fwizard-progress-bg":We,"--renuvex-pr-fwizard-progress-active":Q,"--renuvex-pr-fwizard-btn-bg":Y,"--renuvex-pr-fwizard-btn-text":D,"--renuvex-pr-fwizard-btn-border":Ue,"--renuvex-pr-fwizard-btn-disabled-bg":be,"--renuvex-pr-fwizard-btn-disabled-text":ee,"--renuvex-pr-fwizard-nav-hover-bg":M,"--renuvex-pr-load-more-bg":_,"--renuvex-pr-load-more-text":j,"--renuvex-pr-load-more-border":we};Object.keys(qe).forEach(function(Ge){e.style.setProperty(Ge,qe[Ge])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function ua(e){var r=e.settings,t=e.root,a=e.currentHasImages,n=e.openReviewModal,o=e.wireLightboxTrigger,l=(e.photoStripReviews||[]).filter(function(y){return fe(y).length>0});if(!(r.showPhotoGallery!==!1&&!a&&l.length>0))return null;var i=document.createElement("div");if(i.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var d=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",u=document.createElement("div");u.className="renuvex-pr-photo-title",u.textContent=d,i.appendChild(u)}var f=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",f);var c=document.createElement("div");c.className="renuvex-pr-photo-strip";var p=V,x=r.reviewLayout==="card"?V:Math.round(V*4/3),g=0;l.forEach(function(y){if(!(g>=15)){var h=pr(y);if(h){var C=document.createElement("img"),z=ne(h,V);C.src=z.src,C.srcset=z.srcset,C.loading=g<3?"eager":"lazy",C.decoding="async",C.width=p,C.height=x,C.className="renuvex-pr-photo-strip-thumb",C.alt="Yorum foto\u011Fraf\u0131",ie(C),(function(A,k){o(C,function(){n(k,A,l)})})(h,y),c.appendChild(C),g++}}});var v=document.createElement("button");v.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var b=K(Ne);b&&v.appendChild(b),v.setAttribute("aria-label","\xD6nceki"),v.onclick=function(){c.scrollBy({left:-200,behavior:"smooth"})};var s=document.createElement("button");s.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var m=K(lr);m&&s.appendChild(m),s.setAttribute("aria-label","Sonraki"),s.onclick=function(){c.scrollBy({left:200,behavior:"smooth"})};var w=document.createElement("div");return w.className="renuvex-pr-photo-strip-wrap",w.appendChild(v),w.appendChild(c),w.appendChild(s),i.appendChild(w),i}function da(e){var r=e.render;async function t(){var o=De(),l=O,i=G,d=re,u=te,f=await Re(O,G,1,re,te);je(o,{productId:l,orderBy:i,ratingFilter:d,hasImages:u})&&await r(O,P,f,Ae,G,1,Zr)}async function a(o){var l=De(),i=re===o?null:o,d=O,u=G,f=te;Qr(i),Le(1);var c=await Re(O,G,1,i,te);je(l,{productId:d,orderBy:u,page:1,ratingFilter:i,hasImages:f})&&await r(O,P,c,Ae,G,1)}async function n(o,l){var i=De(),d=O,u=re;Le(1);var f=o,c=!1;l&&(c=!0,f="newest"),et(c),tr(f);var p=await Re(O,f,1,re,c);je(i,{productId:d,orderBy:f,page:1,ratingFilter:u,hasImages:c})&&await r(O,P,p,Ae,f,1)}return{onRetry:t,onFilterChange:a,onSortChange:n}}function tn(){return wt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function an(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ht({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),bt(t,{surface:"reviews",productId:r||""}),t}async function Xr(e,r,t,a,n,o,l){if(ut){ir({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:o,badgeSettings:l});return}nr(!0),rt(e),tt(r),l!==void 0&&at(l),nt(a),n&&tr(n),o&&Le(o),t!=null&&it(t);var i=da({render:Xr});try{let ue=function(F,_){if(!(!F||!F.meta||!F.meta.sizeOverrides)){var j=F.meta.sizeOverrides[_];j&&Object.keys(j).forEach(function(we){x.style.setProperty(we,j[we])})}};var We=ue,d=Cr(r.summaryLayout),u=!(d.meta&&d.meta.supports&&d.meta.supports.title===!1),f=r.showTitle!==!1,c=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=u&&f?c:"",x=document.documentElement;pa(x,r);var g=r.borderRadius!==void 0?r.borderRadius:8,v=Wr[r.size]||Wr.medium,b=qr[r.thumbnailSize]||qr.medium,s=Qe(r.reviewLayout);if(s.meta&&s.meta.sizeOverrides&&s.meta.sizeOverrides[r.size]){var m=s.meta.sizeOverrides[r.size],w=m["--renuvex-pr-list-photo-w"]||m["--renuvex-pr-gallery-photo-w"];w&&(b=parseInt(w))}x.style.setProperty("--renuvex-pr-title-size",v.titleSize+"px"),x.style.setProperty("--renuvex-pr-review-text-size",v.reviewTextSize+"px"),x.style.setProperty("--renuvex-pr-review-title-size",v.reviewTitleSize+"px"),x.style.setProperty("--renuvex-pr-author-size",v.authorSize+"px"),x.style.setProperty("--renuvex-pr-reply-name-size",v.replyNameSize+"px"),x.style.setProperty("--renuvex-pr-reply-text-size",v.replyTextSize+"px"),x.style.setProperty("--renuvex-pr-radius",g+"px"),x.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,g-4)+"px"),x.style.setProperty("--renuvex-pr-photo-title-size",v.photoTitleSize+"px"),x.style.setProperty("--renuvex-pr-avg-rating-size",v.avgRatingSize+"px"),x.style.setProperty("--renuvex-pr-review-count-size",v.reviewCountSize+"px"),x.style.setProperty("--renuvex-pr-compact-count-size",v.compactCountSize+"px"),x.style.setProperty("--renuvex-pr-recommend-size",v.recommendSize+"px"),x.style.setProperty("--renuvex-pr-btn-text-size",v.btnTextSize+"px"),x.style.setProperty("--renuvex-pr-bar-label-size",v.barLabelSize+"px"),x.style.setProperty("--renuvex-pr-minimal-avg-size",v.minimalAvgSize+"px"),x.style.setProperty("--renuvex-pr-hero-avg-size",v.heroAvgSize+"px"),x.style.setProperty("--renuvex-pr-bar-count-size",v.barCountSize+"px"),x.style.setProperty("--renuvex-pr-review-date-size",v.reviewDateSize+"px"),x.style.setProperty("--renuvex-pr-filter-text-size",v.filterTextSize+"px"),x.style.setProperty("--renuvex-pr-load-more-size",v.loadMoreSize+"px"),x.style.setProperty("--renuvex-pr-read-more-size",v.readMoreSize+"px"),x.style.setProperty("--renuvex-pr-thumbnail-size",b+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";x.style.setProperty("--renuvex-pr-review-star-color",y),x.style.setProperty("--renuvex-pr-star-size",v.reviewStarSize+"px"),x.style.setProperty("--renuvex-pr-avg-star-size",v.avgStarSize+"px"),ue(Cr(r.summaryLayout),r.size),ue(Qe(r.reviewLayout),r.size);var h=Je(r),C=tn();if(!C)return;var z=an(C,e),A=document.getElementById("renuvex-reviews");A||(A=document.createElement("div"),A.id="renuvex-reviews",A.style.minHeight="200px"),A.parentNode!==z&&z.appendChild(A);var k=yt(A),L=Ie+Te+vr+Qt()+aa();Be(k,L);var E=Ct(k);if(r.enabled===!1){A.style.minHeight="auto",E.replaceChildren(na(r.borderRadius!==void 0?r.borderRadius:8)),nr(!1);var S=ar;ir(null),S&&Xr(S.productId,S.settings,S.reviewsData,S.productName,S.orderBy,S.page,S.badgeSettings);return}try{var T=t||{},N=Nr(T),I=N?[]:T.data&&T.data.reviews||[];ot(I),E.replaceChildren();var R=document.createElement("section");if(R.id="renuvex-reviews-widget",R.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),R.className="renuvex-pr-reviews-widget",R.setAttribute("data-renuvex-surface","reviews"),e&&R.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(R.style.width="100%",R.style.maxWidth="100%",R.style.marginLeft="0",R.style.marginRight="0"),p){var U=document.createElement("div"),W=r.summaryLayout||"classic";U.className="renuvex-pr-title renuvex-pr-title-"+W,U.textContent=p,R.appendChild(U)}if(N){R.appendChild(ia(T.message,i.onRetry)),E.appendChild(R),ye(k),Er(R,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return k.getElementById("renuvex-reviews-widget")});return}var Z=T.data&&T.data.allCount||0,B=T.data&&T.data.ratingCounts||null,q=B||[0,0,0,0,0],ke=T.data&&T.data.avgRating||"0.0";if(!B&&I.length>0){I.forEach(function(F){F.rating>=1&&F.rating<=5&&q[F.rating-1]++});var $=I.reduce(function(F,_){return F+_.rating},0);ke=($/I.length).toFixed(1)}if(Z>0){var Ve=Cr(r.summaryLayout),Se=Ve.render({widget:R,data:T,settings:r,iconPair:h,allCount:Z,ratingCounts:q,avgRatingVal:ke,currentRatingFilter:re,currentOrderBy:G,currentHasImages:te,onFilterChange:i.onFilterChange,onSortChange:i.onSortChange});R.appendChild(Se)}else{var Q=document.createElement("button");Q.className="renuvex-pr-write-btn",Q.style.cssText="display:block;margin:16px auto 0;",Q.textContent=r.writeButtonText||"Yorum Yap",Q.onclick=H,R.appendChild(Q)}var Y=ua({settings:r,root:x,currentHasImages:te,photoStripReviews:$r,openReviewModal:le,wireLightboxTrigger:ge});if(Y&&R.appendChild(Y),I.length===0){var D=document.createElement("p");D.className="renuvex-pr-state-msg",D.textContent="Hen\xFCz yorum yok.",R.appendChild(D)}else{var s=Qe(r.reviewLayout);I.forEach(function(_){R.appendChild(s.render(_,Tr))})}var Ue=T.data&&T.data.hasMore;if(Ue){var M=document.createElement("button");M.className="renuvex-pr-load-more",M.textContent="Daha Fazla G\xF6ster",M.onclick=async function(){M.disabled=!0,M.textContent="Y\xFCkleniyor...";var F=De(),_=O,j=G,we=rr,qe=re,Ge=te,Kr=we+1,Ee=await Re(_,j,Kr,qe,Ge);if(je(F,{productId:_,orderBy:j,page:we,ratingFilter:qe,hasImages:Ge}))if(Ee&&!Nr(Ee)&&Ee.data&&Array.isArray(Ee.data.reviews)){var Jr=lt(Ee.data.reviews);pt(Jr),Le(Kr);var sa=Qe(P.reviewLayout);Jr.forEach(function(va){R.insertBefore(sa.render(va,Tr),M)}),Ee.data.hasMore?(M.disabled=!1,M.textContent="Daha Fazla G\xF6ster"):M.remove()}else M.disabled=!1,M.textContent="Tekrar Dene"},R.appendChild(M)}E.appendChild(R),ye(k),Er(R,"reviews-widget",{productId:e||""},function(){return k.getElementById("renuvex-reviews-widget")})}catch(F){console.error("[renuvex-pr] render error:",F);var be=document.createElement("p");be.style.cssText="text-align:center;color:#dc2626;",be.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",E&&E.replaceChildren(be)}}finally{if(nr(!1),ar){var ee=ar;ir(null),Xr(ee.productId,ee.settings,ee.reviewsData,ee.productName,ee.orderBy,ee.page,ee.badgeSettings)}}}export{Xr as render};
