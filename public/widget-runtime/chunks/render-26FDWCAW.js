/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ue,d as Ye}from"./chunk-N7KC6W47.js";import{b as $r,c as Ie}from"./chunk-W6RJS6FO.js";import{A as _t,B as It,C as gr,D as hr,E as br,a as X,b as tr,c as $,d as Q,e as H,f as L,g as kt,h as Me,j as xr,k as Kr,l as St,m as fr,n as Le,o as Ct,p as Et,q as Tt,r as At,s as Pt,t as Mt,u as Lt,v as ke,y as Nt,z as Rt}from"./chunk-H43GKW4S.js";import{A as me,B as Sr,C as Yt,D as ee,E as Cr,F as Er,G as Jr,H as Zr,I as Tr,J as Dt,K as Ar,L as Vt,M as jt,c as Xr,e as Se,f as te,g as ae,h as W,i as Ne,j as yr,k as ar,l as Bt,m as De,n as wr,o as Ot,p as ve,q as zr,r as Ft,s as kr,u as O,v as Ht,w as ce,x as Ce,z as Ut}from"./chunk-C6ECKFKS.js";import{c as Re}from"./chunk-WWGCW5YN.js";import{a as ze,b as Pe,h as Wt,i as _e}from"./chunk-UOBLDAJF.js";import{a as we}from"./chunk-O54VMLTU.js";function qt(e){if(typeof e!="string"||!e)return!1;try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return!1;var t=r.hostname.toLowerCase();return t==="videodelivery.net"||t.endsWith(".videodelivery.net")||t==="cloudflarestream.com"||t.endsWith(".cloudflarestream.com")}catch(n){return!1}}function xe(e){var r=[],t={},n=e&&Array.isArray(e.media)?e.media:[];return n.forEach(function(a){if(!(!a||typeof a!="object")){if(a.type==="video"){if(!qt(a.url)||!qt(a.posterUrl||a.thumbnailUrl))return;var i="video:"+a.url;if(t[i])return;t[i]=!0,r.push({type:"video",url:a.url,posterUrl:a.posterUrl||a.thumbnailUrl,thumbnailUrl:a.thumbnailUrl||a.posterUrl,durationMs:typeof a.durationMs=="number"?a.durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length});return}if(a.type==="image"&&Sr(a.url)){var o="image:"+a.url.trim();if(t[o])return;t[o]=!0,r.push({type:"image",url:a.url.trim(),thumbnailUrl:a.thumbnailUrl||null,posterUrl:null,durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length})}}}),Yt(e).forEach(function(a){var i="image:"+a;t[i]||(t[i]=!0,r.push({type:"image",url:a,thumbnailUrl:null,posterUrl:null,durationMs:null,width:null,height:null,position:r.length}))}),r.sort(function(a,i){return a.position-i.position})}function Pr(e){var r=xe(e);return r.length?r[0]:null}function Gt(e){return e&&e.type==="video"?e.posterUrl:e&&e.url}function Xt(e){if(typeof e!="number"||e<=0)return"";var r=Math.max(0,Math.round(e/1e3)),t=Math.floor(r/60),n=String(r%60).padStart(2,"0");return t+":"+n}var Ve=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function Kt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function je(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Mr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function Jt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function Zt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var $t=`
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
`,Qt=`
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
`;var ea=`
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
`;var ra=`
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
`;var ta=`
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
`;var aa=`
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
`;var na=`
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-modal-wrap:focus,.renuvex-pr-modal-wrap:focus-visible{outline:none;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img,.renuvex-pr-modal-main-video{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;transition:opacity 0.25s ease;}
  .renuvex-pr-modal-main-video{border:0;}
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
`;var ia=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.68);color:#fff;pointer-events:none;}
  .renuvex-pr-media-play svg{width:17px;height:17px;margin-left:2px;}
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Lr=[$t,Ut,ea,ra,ta,aa,ia,na,Qt].join(`
`);function nn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function de(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function on(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function ln(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=on()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function pn(e){var r=document.body.style,t=document.documentElement.style;de(t,"overflow",e.rootOverflow,e.rootOverflowPriority),de(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),de(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),de(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),de(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),de(r,"position",e.bodyPosition,e.bodyPositionPriority),de(r,"top",e.bodyTop,e.bodyTopPriority),de(r,"left",e.bodyLeft,e.bodyLeftPriority),de(r,"right",e.bodyRight,e.bodyRightPriority),de(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var nr=0,We=null;function Nr(){return nr+=1,nr>1||(We=nn(),ln(We)),We}function Rr(){if(nr!==0&&(nr-=1,!(nr>0))){var e=We;We=null,e&&pn(e)}}function un(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function _r(){var e=un();return!e||e===document.body||e===document.documentElement?null:e}function ne(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function dn(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Qr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(dn)}function sn(e,r){var t=e,n=Qr(e);!n.length&&r&&(t=r,n=Qr(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;ne(a)}function Ir(e,r,t){if(e.key==="Tab"){var n=Qr(r);if(!n.length){e.preventDefault(),sn(r);return}var a=n[0],i=n[n.length-1],o=Jt(t);if(!r.contains(o)){e.preventDefault(),ne(a);return}if(n.indexOf(o)===-1){e.preventDefault(),ne(e.shiftKey?i:a);return}e.shiftKey&&o===a?(e.preventDefault(),ne(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ne(a))}}var oa="renuvexPrOverlay";function Br(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[oa]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function vn(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[oa]===e.id)}function Or(e){if(vn(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function la(e,r){var t=!1,n=null;return e.controls=!0,e.autoplay=!1,e.preload="metadata",e.playsInline=!0,e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),e.poster=r.posterUrl||"",e.canPlayType("application/vnd.apple.mpegurl")?e.src=r.url:import("./hls-HROXACUG.js").then(function(a){if(!t){var i=a.default||a;if(!i||!i.isSupported||!i.isSupported()){e.dispatchEvent(new Event("error"));return}n=new i({enableWorker:!0,lowLatencyMode:!1,backBufferLength:30}),n.loadSource(r.url),n.attachMedia(e)}}).catch(function(){t||e.dispatchEvent(new Event("error"))}),function(){t=!0;try{e.pause()}catch(i){}if(n){try{n.destroy()}catch(i){}n=null}e.removeAttribute("src");try{e.load()}catch(i){}}}function qe(e){return xe(e)}function rt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function pa(e,r,t,n,a,i){e&&e.shadowRoot&&rt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Rr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&yr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ne(a)}function cn(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ce(e.rating,L);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var u=document.createElement("div");u.className="renuvex-pr-modal-author",u.textContent=e.author||"",t.appendChild(u);var l=document.createElement("div");l.className="renuvex-pr-modal-body",l.textContent=(e.comment||"").trim(),l.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-modal-reply";var v=document.createElement("div");v.className="renuvex-pr-modal-reply-label",v.textContent=O(L&&L.merchantReplyLabel,"Ma\u011Faza Sahibi");var x=document.createElement("div");return x.className="renuvex-pr-modal-reply-text",x.textContent=e.merchantReply||"",p.appendChild(v),p.appendChild(x),p.style.display=e.merchantReply?"":"none",t.appendChild(p),r.appendChild(t),r}function ua(e,r,t){var n=t||L,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ce(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=me(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var u=a.querySelector(".renuvex-pr-modal-body");u.textContent=(r.comment||"").trim(),u.style.display=r.comment&&r.comment.trim()?"":"none";var l=a.querySelector(".renuvex-pr-modal-reply");l.querySelector(".renuvex-pr-modal-reply-label").textContent=O(n&&n.merchantReplyLabel,"Ma\u011Faza Sahibi"),l.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",l.style.display=r.merchantReply?"":"none",e.scrollTop=0}function tt(e,r,t,n,a,i,o,u,l){var p=qe(e),v=Math.max(0,Math.min(t||0,p.length-1)),x=p[v],s=document.createElement("div");s.className="renuvex-pr-modal-left";var d=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(x&&x.type==="video"){var y=document.createElement("video");y.className="renuvex-pr-modal-main-video"+(d?" "+d:""),y.setAttribute("aria-label","Yorum videosu"),y.addEventListener("error",function(){if(!s.querySelector(".renuvex-pr-modal-img-error")){var N=document.createElement("div");N.className="renuvex-pr-modal-img-error",N.setAttribute("role","status"),N.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",s.insertBefore(N,y)}}),s.__renuvexMediaCleanup=la(y,x),s.appendChild(y)}else{var m=document.createElement("img");if(m.className="renuvex-pr-modal-main-img"+(d?" "+d:""),m.src=Zr(x?x.url:""),m.decoding="async",m.width=Jr,m.height=Math.round(Jr*4/3),m.alt="Yorum foto\u011Fraf\u0131",!d){m.classList.add("renuvex-pr-modal-img-loading");var h=function(){m.classList.remove("renuvex-pr-modal-img-loading")};m.complete&&m.naturalWidth>0?h():(m.addEventListener("load",h,{once:!0}),m.addEventListener("error",h,{once:!0}))}Dt(m,function(N){if(N.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var I=document.createElement("div");I.className="renuvex-pr-modal-img-error",I.setAttribute("role","status"),I.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(I,N)}}),s.appendChild(m)}var b=document.createElement("button");b.className="renuvex-pr-modal-close-mobile";var f=W(ve);f&&b.appendChild(f),b.setAttribute("aria-label","Kapat"),b.onclick=function(N){N.stopPropagation(),i()},s.appendChild(b);var g=0;if(s.addEventListener("touchstart",function(N){g=N.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(N){var I=g-N.changedTouches[0].clientX;if(!(Math.abs(I)<50)){if(I>0){if(w)fe(e,r,v+1,n,a,i,!0,"next",u,l);else if(E){var q=n[r+1];fe(q,r+1,0,n,a,i,!1,"next",u,l)}}else if(c)fe(e,r,v-1,n,a,i,!0,"prev",u,l);else if(T){var _=n[r-1],V=qe(_);fe(_,r-1,V.length-1,n,a,i,!1,"prev",u,l)}}},{passive:!0}),p.length>1){var k=document.createElement("div");k.className="renuvex-pr-modal-thumbs",p.forEach(function(N,I){var q=N.type==="video"?N.posterUrl:N.url,_=document.createElement("img"),V=Tr(q,Er);_.src=V.src,_.srcset=V.srcset,_.loading="lazy",_.decoding="async",_.width=Er,_.height=Er,_.className="renuvex-pr-modal-thumb"+(I===v?" renuvex-pr-modal-thumb-active":""),_.alt="K\xFC\xE7\xFCk resim "+(I+1),Ar(_),_.tabIndex=0,_.setAttribute("role","button"),_.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(I+1)+" se\xE7"),I===v&&_.setAttribute("aria-current","true"),(function(U){function Z(){fe(e,r,U,n,a,i,!0,null,u,l)}_.onclick=Z,_.onkeydown=function(Y){(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),Z())}})(I),k.appendChild(_)}),s.appendChild(k)}var c=v>0,w=v<p.length-1,T=r>0,E=r<n.length-1,C=c||T,S=w||E;if(C){var z=document.createElement("button");z.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var A=W(De);A&&z.appendChild(A),z.setAttribute("aria-label","\xD6nceki"),z.onclick=function(N){if(N.stopPropagation(),c)fe(e,r,v-1,n,a,i,!0,"prev",u,l);else if(T){var I=n[r-1],q=qe(I);fe(I,r-1,q.length-1,n,a,i,!1,"prev",u,l)}},s.appendChild(z)}if(S){var M=document.createElement("button");M.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var P=W(wr);P&&M.appendChild(P),M.setAttribute("aria-label","Sonraki"),M.onclick=function(N){if(N.stopPropagation(),w)fe(e,r,v+1,n,a,i,!0,"next",u,l);else if(E){var I=n[r+1];fe(I,r+1,0,n,a,i,!1,"next",u,l)}},s.appendChild(M)}return s}function da(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=qe(n);a[0]&&a[0].type==="image"&&(new Image().src=Zr(a[0].url))}})}function et(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function mn(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){et(t),et(n),et(a)}i(),t&&ne(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function fe(e,r,t,n,a,i,o,u,l,p){if(p&&(p.currentReview=e),o){var v=tt(e,r,t,n,a,i,u,l,p);a.firstChild&&(rt(a.firstChild),a.replaceChild(v,a.firstChild))}else{var v=tt(e,r,t,n,a,i,u,l,p),x=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&(rt(a.firstChild),a.replaceChild(v,a.firstChild)),x&&ua(x,e,p&&p.currentSettings),mn(l,a)}da(r,n)}function se(e,r,t){var n=qe(e);if(!n.length)return;var a=(t||[]).filter(function(E){return qe(E).length>0}),i=a.findIndex(function(E){return E===e||E.id===e.id});i===-1&&(a.unshift(e),i=0);var o=n.findIndex(function(E){return E.url===r});o<0&&(o=0);var u=document.createElement("div");u.className="renuvex-pr-modal-overlay";var l=document.createElement("div");l.className="renuvex-pr-modal";var p=!1,v=null,x=_r(),s=Ye(),d=Nr(),y=Br(),m={currentReview:e,currentSettings:L},h=null;function b(E){var C=E&&E.detail&&E.detail.settings;if(!(C&&C===h)){h=C||null,m.currentSettings=C||L;var S=l.querySelector(".renuvex-pr-modal-right");!S||!m.currentReview||ua(S,m.currentReview,m.currentSettings)}}function f(){p||(p=!0,window.removeEventListener(_e,b),pa(v&&v.host,g,f,d,x,s))}function g(E){if(E.key==="Escape"){k();return}Ir(E,u,v&&v.root)}function k(){p||(p=!0,window.removeEventListener(_e,b),pa(v&&v.host,g,f,d,x,s),Or(y))}document.addEventListener("keydown",g),window.addEventListener("popstate",f),window.addEventListener(_e,b),u.onclick=function(){k()},l.onclick=function(E){E.stopPropagation()},l.appendChild(tt(e,i,o,a,l,k,null,u,m)),l.appendChild(cn(e)),da(i,a);var c=document.createElement("div");c.className="renuvex-pr-modal-wrap",c.tabIndex=-1,c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),c.appendChild(l);var w=document.createElement("button");w.className="renuvex-pr-modal-close";var T=W(ve);T&&w.appendChild(T),w.setAttribute("aria-label","Kapat"),w.onclick=function(E){E.stopPropagation(),k()},c.appendChild(w),u.appendChild(c),v=Mr(),je(v.root,Ve+Ue+Lr),v.root.appendChild(u),Ne(v.root),ne(c)}function ir(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(n){(n.key==="Enter"||n.key===" "||n.key==="Spacebar")&&(n.preventDefault(),r())})}var pt={};we(pt,{css:()=>On,meta:()=>Bn,render:()=>Fn});function Ge(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;Se(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var u=5;u>=1;u--){var l=r[u-1]||0,p=t>0?Math.round(l/t*100):0,v=a===u,x=l>0,s=O(L&&L.countLabel,"Yorum"),d=document.createElement("div");d.className="renuvex-pr-bar-row"+(x?"":" renuvex-pr-bar-empty")+(v?" renuvex-pr-bar-active":"")+(a&&!v?" renuvex-pr-bar-dimmed":""),x?(d.setAttribute("role","button"),d.setAttribute("tabindex","0"),d.setAttribute("aria-pressed",v?"true":"false"),d.setAttribute("aria-label",u+" y\u0131ld\u0131z, "+l.toLocaleString("tr-TR")+" "+s+", "+(v?"filtreyi kald\u0131r":"filtrele"))):d.setAttribute("aria-label",u+" y\u0131ld\u0131z, 0 "+s);for(var y="",m=1;m<=5;m++){var h=m<=u;y+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(h?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+te(h?"full":"outline")+"</span>"}d.innerHTML='<span class="renuvex-pr-bar-label">'+y+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+p+'%;"></div></div><span class="renuvex-pr-bar-count">('+l.toLocaleString("tr-TR")+")</span>",x&&(function(b){function f(){i(b)}d.onclick=f,d.onkeydown=function(g){(g.key==="Enter"||g.key===" "||g.key==="Space"||g.key==="Spacebar")&&(g.preventDefault(),f())}})(u),o.appendChild(d)}return o}var ca="data-renuvex-pr-dismiss-gesture",Be=[],sa=!1,Fr=!1,or=[],Xe=null;function va(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function at(){for(var e=Be.length-1;e>=0;e--){var r=Be[e].element;r&&r.isConnected===!1&&Be.splice(e,1)}return Be}function xn(e){!e||typeof e.setAttribute!="function"||(or.indexOf(e)===-1&&or.push(e),e.setAttribute(ca,""))}function ma(){for(var e=0;e<or.length;e++){var r=or[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(ca)}or=[],Xe&&typeof clearTimeout=="function"&&clearTimeout(Xe),Xe=null}function fn(e){if(Fr){Fr=!1,ma(),e.preventDefault(),e.stopPropagation();return}for(var r=at(),t=!1,n=r.length-1;n>=0;n--){var a=r[n];va(e,a.trigger)||va(e,a.element)||a.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function gn(e){if(e.key==="Escape")for(var r=at(),t=r.length-1;t>=0;t--)r[t].close()}function xa(){sa||typeof document=="undefined"||(document.addEventListener("click",fn,!0),document.addEventListener("keydown",gn),sa=!0)}function hn(e){xa(),Fr=!0,xn(e),Xe&&typeof clearTimeout=="function"&&clearTimeout(Xe),typeof setTimeout=="function"&&(Xe=setTimeout(function(){Fr=!1,ma()},700))}function nt(e){hn(e)}function Hr(e){xa();var r={trigger:e.trigger,element:e.element,close:e.close};return Be.push(r),{unregister:function(){var t=Be.indexOf(r);t!==-1&&Be.splice(t,1)},notifyOpening:function(){for(var t=at(),n=0;n<t.length;n++)t[n]!==r&&t[n].close()}}}function re(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var u=document.createElement("button");u.className="renuvex-pr-write-btn",u.textContent=O(L&&L.writeButtonText,"Yorum Yap"),u.onclick=a,o.appendChild(u);var l=document.createElement("div");l.className="renuvex-pr-filter-wrap";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-filter-btn",p.setAttribute("aria-label","Filtrele"),p.setAttribute("aria-haspopup","menu"),p.setAttribute("aria-expanded","false");var v=L&&L.filterIcon||"lines";p.innerHTML=ae(Bt(v));var x=document.createElement("div");x.className="renuvex-pr-filter-menu",x.setAttribute("role","menu");var s=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],d=!1;function y(){return r&&r.parentNode||r||null}function m(g,k){if(!(k===!0||!g)){if(g.type==="touchstart"){nt(y());return}if(g.type==="pointerdown"){var c=g.pointerType||"";c&&c!=="mouse"&&nt(y());return}}}function h(g){var k=x.classList.contains("renuvex-pr-open");x.classList.remove("renuvex-pr-open"),p.classList.remove("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","false");var c=g&&(g.restoreFocus===!0||g.restoreFocus==="auto"&&Ye());if(k&&c)try{p.focus({preventScroll:!0})}catch(w){try{p.focus()}catch(T){}}return k}function b(){f.notifyOpening(),x.classList.add("renuvex-pr-open"),p.classList.add("renuvex-pr-filter-btn-active"),p.setAttribute("aria-expanded","true");var g=x.querySelector(".renuvex-pr-filter-item-active")||x.querySelector(".renuvex-pr-filter-item");g&&requestAnimationFrame(function(){try{g.focus({preventScroll:!0})}catch(k){try{g.focus()}catch(c){}}})}s.forEach(function(g){var k=g[2],c=k?n:!n&&(t||"newest")===g[0],w=document.createElement("button");w.type="button",w.className="renuvex-pr-filter-item"+(c?" renuvex-pr-filter-item-active":""),w.setAttribute("role","menuitem"),w.textContent=g[1];var T=!1;function E(C,S){C&&(C.preventDefault(),C.stopPropagation()),!T&&(T=!0,d=!0,m(C,S),h({restoreFocus:S}),i(g[0],k),setTimeout(function(){T=!1,d=!1},0))}w.addEventListener("pointerdown",function(C){C.button!==void 0&&C.button!==0||C.pointerType!=="mouse"&&E(C,!1)}),typeof window!="undefined"&&!window.PointerEvent&&w.addEventListener("touchstart",function(C){E(C,!1)},{passive:!1}),w.addEventListener("keydown",function(C){(C.key==="Enter"||C.key===" ")&&E(C,!0)}),w.onclick=function(C){E(C,!1)},x.appendChild(w)}),p.onclick=function(){x.classList.contains("renuvex-pr-open")?h({restoreFocus:"auto"}):b()},l.addEventListener("keydown",function(g){g.key==="Escape"&&x.classList.contains("renuvex-pr-open")&&(g.stopPropagation(),h({restoreFocus:!0}))}),l.addEventListener("focusout",function(g){if(x.classList.contains("renuvex-pr-open")&&!d){var k=g.relatedTarget;k&&l.contains(k)||h()}});var f=Hr({trigger:l,element:x,close:h});return l.appendChild(p),l.appendChild(x),o.appendChild(l),o}var fa=`
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
  .renuvex-pr-fwizard-media-choices{
    width:100%;
    max-width:420px;
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    gap:10px;
  }
  .renuvex-pr-fwizard-media-choice{
    min-height:48px;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    padding:10px 14px;
    border:1px solid var(--renuvex-pr-fwizard-input-border,#AFAFAF);
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:var(--renuvex-pr-fwizard-bg,#fff);
    color:var(--renuvex-pr-fwizard-text,#111);
    font:inherit;
    cursor:pointer;
  }
  .renuvex-pr-fwizard-media-choice svg{
    width:20px;
    height:20px;
  }
  .renuvex-pr-fwizard-media-choice--active{
    border-color:var(--renuvex-pr-fwizard-btn-bg,#111);
  }
  .renuvex-pr-fwizard-media-choice:disabled{
    opacity:.45;
    cursor:not-allowed;
  }
  .renuvex-pr-fwizard-media-content{
    width:100%;
    max-width:420px;
  }
  .renuvex-pr-fwizard-media-content .renuvex-pr-fwizard-step-photos{
    gap:0;
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
  .renuvex-pr-fwizard-video-preview{
    width:112px;
    aspect-ratio:16/10;
    display:block;
    object-fit:cover;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:#111;
  }
  .renuvex-pr-fwizard-video-details{
    min-width:0;
    display:flex;
    flex-direction:column;
    gap:7px;
  }
  .renuvex-pr-fwizard-video-name{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:14px;
    font-weight:600;
  }
  .renuvex-pr-fwizard-video-status{
    color:var(--renuvex-pr-fwizard-secondary-text,#6b7280);
    font-size:13px;
  }
  .renuvex-pr-fwizard-video-status--error{
    color:#b91c1c;
  }
  .renuvex-pr-fwizard-video-progress{
    width:100%;
    height:6px;
    accent-color:var(--renuvex-pr-fwizard-btn-bg,#111);
  }
  .renuvex-pr-fwizard-video-retry{
    align-self:flex-start;
    padding:0;
    border:0;
    background:transparent;
    color:var(--renuvex-pr-fwizard-text,#111);
    font:inherit;
    font-size:13px;
    font-weight:600;
    cursor:pointer;
    text-decoration:underline;
  }
  .renuvex-pr-fwizard-video-remove{
    top:6px;
    right:6px;
    border:1px solid rgba(0,0,0,.12);
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
  .renuvex-pr-fwizard-media-choice:focus-visible,
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
`;function ga(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="renuvex-pr-fwizard",n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content",a.appendChild(i);var o=document.createElement("button");o.className="renuvex-pr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat");var u=W(ve);u&&o.appendChild(u),a.appendChild(o);var l=!1,p=null,v=null,x=!1;function s(){ne(n)}function d(c){Ir(c,n,p&&p.root)}function y(){if(!l){if(l=!0,document.removeEventListener("keydown",m),n.removeEventListener("click",h),o.removeEventListener("click",y),x)ne(v);else{var c=p&&p.root?p.root.activeElement:null;if(c&&typeof c.blur=="function")try{c.blur()}catch(w){}}n.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){p?(yr(p.root),p.host&&p.host.parentNode&&p.host.parentNode.removeChild(p.host)):n.parentNode&&n.parentNode.removeChild(n),Rr();try{r()}catch(w){}},200)}}function m(c){if(c.key==="Escape"){y();return}d(c)}function h(c){c.target===n&&t&&y()}document.addEventListener("keydown",m),n.addEventListener("click",h),o.addEventListener("click",y);function b(c){v=_r(),x=Ye(),c&&i.appendChild(c),p=Mr(),je(p.root,Ve+Ue+fa),p.root.appendChild(n),Ne(p.root),Nr(),requestAnimationFrame(function(){n.classList.add("renuvex-pr-fwizard-open"),s()})}var f=null,g=null;function k(c,w){if(w=w||"error",f){try{f.remove()}catch(T){}f=null}g&&(clearTimeout(g),g=null),f=document.createElement("div"),f.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+w,f.textContent=c,a.appendChild(f),g=setTimeout(function(){f&&(f.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(f){try{f.remove()}catch(T){}f=null}},300))},4e3)}return{open:b,close:y,content:i,setAllowOutsideClose:function(c){t=!!c},setStepAttr:function(c){a.setAttribute("data-step",String(c))},showToast:k}}var it=4;function Ke(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function ha(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<it&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}function ba(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",u.setAttribute("aria-label","Geri"),u.innerHTML=ae(De)+"<span>Geri</span>",u.addEventListener("click",function(){n()}),o.appendChild(u);var l=document.createElement("div");l.className="renuvex-pr-fwizard-footer-progress";for(var p=[],v=0;v<it;v++){var x=document.createElement("span");x.className="renuvex-pr-fwizard-progress-seg",l.appendChild(x),p.push(x)}o.appendChild(l);var s=document.createElement("button");s.type="button";var d=null;function y(h){d&&s.removeEventListener("click",d),d=h,h&&s.addEventListener("click",h)}o.appendChild(s);function m(h,b){var f=r.indexOf(h)!==-1,g=t.indexOf(h)!==-1,k=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0);if(f)h===2&&k?(s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Devam Et"),s.innerHTML="Devam Et",y(function(){i()})):(s.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",s.setAttribute("aria-label","Atla"),s.innerHTML="<span>Atla</span>",y(function(){a()})),s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),s.style.visibility="",s.tabIndex=0;else if(g){s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Sonraki"),s.innerHTML="Sonraki",s.style.visibility="",s.tabIndex=0;var c=Ke(h,b);s.disabled=!c,s.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!c),y(function(){s.disabled||i()})}else s.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",s.innerHTML="",s.style.visibility="hidden",s.tabIndex=-1,s.disabled=!0,y(null)}return{el:o,update:function(h,b){p.forEach(function(g,k){k+1<=h?g.classList.add("renuvex-pr-fwizard-progress-seg-active"):g.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var f=h<=1;u.style.visibility=f?"hidden":"",u.style.pointerEvents=f?"none":"",u.tabIndex=f?-1:0,m(h,b)},setNextDisabled:function(h){s.classList.contains("renuvex-pr-fwizard-cta-btn")&&(s.disabled=!!h,s.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!h))},setThanksState:function(h){u.style.visibility="hidden",l.style.visibility="hidden",s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Devam Et"),s.innerHTML="Devam Et",s.style.visibility="",s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),y(h)}}}var bn={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ie(e){var r=L&&L[e];return!r&&e==="formStepMediaTitle"&&(r=L&&L.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=L&&L.formStepPhotosSubtitle),O(r,bn[e])}function ya(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ie("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var u=ar(L||{});Se(u);var l=[];function p(h){l.forEach(function(b,f){var g=f<h;b.classList.toggle("renuvex-pr-fwizard-star-active",g),b.setAttribute("aria-checked",f+1===h?"true":"false"),b.innerHTML=g?te("full"):te("outline")})}function v(h){e.set({rating:h}),p(h)}function x(h){var b=l[h-1];if(b)try{b.focus()}catch(f){}}function s(h,b){b&&typeof b.preventDefault=="function"&&b.preventDefault(),b&&typeof b.stopPropagation=="function"&&b.stopPropagation(),!n&&(n=!0,v(h),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var d=1;d<=5;d++)(function(h){var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-star",b.setAttribute("role","radio"),b.setAttribute("aria-label",h+" y\u0131ld\u0131z"),b.innerHTML=te("outline"),b.addEventListener("mouseenter",function(){p(h)}),b.addEventListener("mouseleave",function(){p(e.get().rating)}),b.addEventListener("pointerdown",function(f){f.button&&f.button!==0||s(h,f)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(f){s(h,f)},{passive:!1}),b.addEventListener("mousedown",function(f){window.PointerEvent||s(h,f)}),b.addEventListener("keydown",function(f){if(f.key==="Enter"||f.key===" "){s(h,f);return}var g=0;f.key==="ArrowRight"||f.key==="ArrowUp"?g=Math.min(5,h+1):f.key==="ArrowLeft"||f.key==="ArrowDown"?g=Math.max(1,h-1):f.key==="Home"?g=1:f.key==="End"&&(g=5),g&&(f.preventDefault(),v(g),x(g))}),b.addEventListener("click",function(f){s(h,f)}),l.push(b),o.appendChild(b)})(d);p(e.get().rating);var y=null,m=function(h){var b=h&&h.detail&&h.detail.settings;b&&b===y||(y=b||null,u=ar(b||L||{}),p(e.get().rating))};return window.addEventListener(_e,m),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(_e,m)}}}var wa=3,yn=10*1024*1024;function Ur(e,r){r=r||{};var t=!1,n=document.createElement("div");if(n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=ie("formStepPhotosTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-subtitle",i.textContent=ie("formStepPhotosSubtitle"),n.appendChild(i)}var o=document.createElement("div");o.className="renuvex-pr-fwizard-photo-card";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-photo-add",u.setAttribute("aria-label","Foto\u011Fraf ekle");var l=document.createElement("input");l.type="file",l.accept="image/*",l.multiple=!0,l.style.display="none",o.appendChild(u),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-previews",p.setAttribute("aria-live","polite"),o.appendChild(p),n.appendChild(o);var v=r.revokeBlobUrl||function(f){f&&typeof f=="string"&&f.startsWith("blob:")&&URL.revokeObjectURL(f)},x=r.blobMap||{},s=r.urlToFinger||{};function d(){if(!t){var f=e.get().images||[],g=e.get().pendingImages||[],k=f.map(function(c){return{url:c,isPending:!1}}).concat(g.map(function(c){return{url:c.url,file:c.file,isPending:!0,error:c.error}}));p.innerHTML="",k.forEach(function(c){var w=x[c.url]||c.url,T=y(c,w);p.appendChild(T)}),h()}}function y(f,g){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var c=document.createElement("img");c.src=g,c.alt="",c.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(c);var w=document.createElement("div");w.className="renuvex-pr-fwizard-photo-loading",w.style.display="none",k.appendChild(w);var T=document.createElement("button");T.type="button",T.className="renuvex-pr-fwizard-photo-remove",T.setAttribute("aria-label","Kald\u0131r");var E=W(ve);return E&&T.appendChild(E),k.appendChild(T),m(k,f,g),k}function m(f,g,k){var c=f.querySelector("img");c.src!==k&&(c.src=k);var w=f.querySelector(".renuvex-pr-fwizard-photo-loading");if(g.isPending&&g.error){w.style.display="flex",w.textContent="";var T=document.createElement("span");T.className="renuvex-pr-upload-error",T.textContent="\u2717 "+g.error,w.appendChild(T)}else w.style.display="none",w.textContent="";var E=f.querySelector(".renuvex-pr-fwizard-photo-remove");E.onclick=function(){var C=s[g.url]||(g.file?g.file.name+"_"+g.file.size:null),S=x[g.url],z={};C&&(z.fingerprints=(e.get().fingerprints||[]).filter(function(A){return A!==C})),g.isPending?z.pendingImages=(e.get().pendingImages||[]).filter(function(A){return A.url!==g.url}):z.images=(e.get().images||[]).filter(function(A){return A!==g.url}),e.set(z),v(g.url),v(S),delete s[g.url],S&&delete s[S],x[g.url]&&delete x[g.url]}}function h(){var f=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,k=f+g,c=k>=wa;k>0?(o.classList.add("renuvex-pr-fwizard-photo-card--compact"),u.innerHTML=ae(Ft)):(o.classList.remove("renuvex-pr-fwizard-photo-card--compact"),u.innerHTML=ae(zr)+"<span>Foto\u011Fraf Ekle</span>"),c?(u.style.display="none",u.disabled=!0,l.disabled=!0):(u.style.display="flex",u.disabled=!1,l.disabled=!1,u.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}u.addEventListener("click",function(){l.disabled||l.click()}),l.onchange=async function(f){var g=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(f.target.files).slice(0,wa-g);l.value="";var c=(e.get().pendingImages||[]).length,w=e.get().images||[],T=w.length;if(k.length!==0){for(var E=[],C=[],S=0;S<k.length;S++){var z=k[S],A=z.name+"_"+z.size,M=(e.get().fingerprints||[]).some(function(U){return U===A})||E.some(function(U){return U.file.name+"_"+U.file.size===A});if(!M){if(z.size>yn){var P="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(P,"error"):alert(P);continue}var N=URL.createObjectURL(z);s[N]=A,E.push({url:N,file:z,error:null}),C.push({url:N,file:z});var I=(e.get().fingerprints||[]).slice();I.push(A),e.set({fingerprints:I})}}if(E.length!==0){var q=(e.get().pendingImages||[]).concat(E),_=async function(){for(var U=0;U<C.length;U++){var Z=C[U],Y=Z.file,J=Z.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var pe=(e.get().pendingImages||[]).filter(function(R){return R.url!==J}),he=(e.get().images||[]).slice();he.push(J),e.set({pendingImages:pe,images:he});continue}try{var oe=await Re(Pe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ze})});if(!oe.ok)throw oe.status===429?new Error("rate_limit"):new Error("sign failed");var j=await oe.json();if(!j.folder)throw new Error("sign folder missing");var B=new FormData;B.append("file",Y),B.append("api_key",j.api_key),B.append("timestamp",j.timestamp),B.append("signature",j.signature),B.append("folder",j.folder);var D=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:B}),F=await D.json();if(F.secure_url&&Sr(F.secure_url)){var Te=(e.get().pendingImages||[]).some(function(R){return R.url===J});if(!Te)continue;x[F.secure_url]=J,s[F.secure_url]=s[J];var le=(e.get().pendingImages||[]).filter(function(R){return R.url!==J}),Qe=(e.get().images||[]).slice();Qe.push(F.secure_url),e.set({pendingImages:le,images:Qe});try{Re(Pe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ze,secureUrl:F.secure_url,metadata:{assetId:F.asset_id,publicId:F.public_id,version:F.version,resourceType:F.resource_type,format:F.format,width:F.width,height:F.height,bytes:F.bytes,signature:F.signature}})}).catch(function(){})}catch(R){}}else throw new Error("invalid image url")}catch(R){console.error("[renuvex-pr] Image upload failed:",R);var er=R.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(er,"error");var be=(e.get().pendingImages||[]).map(function(G){return G.url===J?{url:G.url,file:G.file,error:er}:G});e.set({pendingImages:be})}}};if(T===0&&c===0){t=!0;var V=!r.canNavigate||r.canNavigate();V&&e.goNext()}e.set({pendingImages:q}),_()}}};var b=e.onChange(d);return d(),{el:n,openPicker:function(){l.disabled||l.click()},destroy:function(){t=!0,l.onchange=null,b&&b()}}}var wn=150*1024*1024,zn=2,kn=60,Sn=["video/mp4","video/quicktime"],Cn="renuvex_pr_video_upload_";function Yr(e){return new Promise(function(r){setTimeout(r,e)})}function ka(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function ot(e,r){return Cn+ze+"_"+e+"_"+ka(r)}function En(e,r){try{var t=window.sessionStorage.getItem(ot(e,r)),n=t?JSON.parse(t):null;return!n||typeof n.token!="string"||!n.expiresAt||new Date(n.expiresAt).getTime()<=Date.now()?null:n}catch(a){return null}}function Tn(e,r,t){try{window.sessionStorage.setItem(ot(e,r),JSON.stringify(t))}catch(n){}}function lr(e,r){try{window.sessionStorage.removeItem(ot(e,r))}catch(t){}}async function Je(e,r,t){var n=await Re(Pe+e,r,t||2e4),a=await n.json().catch(function(){return{}});if(!n.ok)throw new Error(a.error||"video_request_failed");return a.data||{}}function An(e,r,t,n){return new Promise(function(a,i){var o=new XMLHttpRequest,u=!1;function l(){t&&t.removeEventListener("abort",p)}function p(){u=!0,o.abort()}if(t){if(t.aborted)return i(new DOMException("Aborted","AbortError"));t.addEventListener("abort",p,{once:!0})}o.open("PUT",e,!0),o.upload.onprogress=function(v){v.lengthComputable&&n&&n(v.loaded)},o.onload=function(){if(l(),o.status<200||o.status>=300)return i(new Error("video_part_upload_failed"));var v=o.getResponseHeader("ETag");if(!v)return i(new Error("video_part_missing_etag"));a(v)},o.onerror=function(){l(),i(new Error("video_part_network_error"))},o.onabort=function(){l(),i(u?new DOMException("Aborted","AbortError"):new Error("video_part_aborted"))},o.send(r)})}async function Sa(e,r){return Je("/api/public/upload/video/parts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,partNumbers:r})})}async function Pn(e){for(var r=0;r<3;){r+=1;try{var t=await Sa(e.token,[e.partNumber]),n=t.parts&&t.parts[0];if(!n||!n.uploadUrl)throw new Error("video_part_url_missing");var a=await An(n.uploadUrl,e.blob,e.signal,e.onProgress);return{partNumber:e.partNumber,etag:a}}catch(i){if(e.signal&&e.signal.aborted||r>=3)throw i;await Yr(400*r)}}throw new Error("video_part_upload_failed")}async function Mn(e){var r={};(e.completed||[]).forEach(function(v){r[v.partNumber]={partNumber:v.partNumber,etag:v.etag}});for(var t={},n=[],a=1;a<=e.partCount;a+=1)r[a]||n.push(a);function i(){var v=Object.keys(r).reduce(function(s,d){var y=Number(d),m=(y-1)*e.partSize;return s+Math.min(e.partSize,e.file.size-m)},0),x=Object.keys(t).reduce(function(s,d){return s+t[d]},0);e.onProgress(Math.min(95,Math.round((v+x)/e.file.size*95)))}i();async function o(){for(;n.length>0;){if(e.signal.aborted)throw new DOMException("Aborted","AbortError");var v=n.shift(),x=(v-1)*e.partSize,s=await Pn({token:e.token,partNumber:v,blob:e.file.slice(x,Math.min(e.file.size,x+e.partSize)),signal:e.signal,onProgress:function(d){t[v]=d,i()}});delete t[v],r[v]=s,i()}}for(var u=[],l=Math.min(e.maxParallelParts||3,n.length||1),p=0;p<l;p+=1)u.push(o());return await Promise.all(u),Object.keys(r).map(function(v){return r[v]}).sort(function(v,x){return v.partNumber-x.partNumber})}async function za(e,r,t){for(var n=Date.now()+6e5;Date.now()<n;){if(r.aborted)throw new DOMException("Aborted","AbortError");var a=await Je("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"});if(t&&t(a.status||"processing"),a.status==="ready")return a;if(a.status==="failed"||a.status==="aborted")throw new Error(a.errorCode||"video_processing_failed");await Yr(2e3)}throw new Error("video_processing_timeout")}async function Ln(e,r,t,n){for(var a=10;a<=90;a+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(a),await Yr(120)}return n("processing"),await Yr(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function Ca(e){return!e||Sn.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>wn?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function Ea(e){return new Promise(function(r){var t=URL.createObjectURL(e),n=document.createElement("video"),a=!1;function i(o){if(!a){a=!0,n.removeAttribute("src");try{n.load()}catch(u){}URL.revokeObjectURL(t),r(o)}}n.preload="metadata",n.onloadedmetadata=function(){i(Number.isFinite(n.duration)?n.duration:null)},n.onerror=function(){i(null)},n.src=t,setTimeout(function(){i(null)},8e3)})}function Ta(e){return e===null?{ok:!0}:e<zn||e>kn?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function Aa(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return Ln(e.file,e.signal,e.onProgress,e.onStatus);var r=En(e.productId,e.file),t=r&&r.token,n=r;if(t){var a=await Je("/api/public/upload/video/status?token="+encodeURIComponent(t),{method:"GET"}).catch(function(){return null});if(!a)lr(e.productId,e.file),t=null,n=null;else{if(a.status==="ready")return e.onToken&&e.onToken(t),e.onProgress(100),Object.assign({token:t},a);if(a.status==="uploaded"||a.status==="processing"){e.onToken&&e.onToken(t),e.onStatus("processing");var i=await za(t,e.signal,e.onStatus);return lr(e.productId,e.file),e.onProgress(100),Object.assign({token:t},i)}else(a.status==="failed"||a.status==="aborted")&&(lr(e.productId,e.file),t=null,n=null)}}if(!t){var o=await Je("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ze,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:ka(e.file)})});t=o.token,n=o,Tn(e.productId,e.file,o)}e.onToken&&e.onToken(t),e.onStatus("uploading");var u=await Sa(t),l=await Mn({token:t,file:e.file,partSize:n.partSize,partCount:n.partCount,maxParallelParts:n.maxParallelParts,completed:u.completed,signal:e.signal,onProgress:e.onProgress});e.onStatus("processing"),await Je("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,parts:l})},3e4);var p=await za(t,e.signal,e.onStatus);return lr(e.productId,e.file),e.onProgress(100),Object.assign({token:t},p)}async function Dr(e,r,t){r&&t&&lr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&await Je("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})}).catch(function(){})}function Nn(e){return e?e.error?e.error:e.status==="processing"?"Video i\u015Fleniyor...":e.status==="ready"?"Video haz\u0131r":"Video y\xFCkleniyor: %"+Math.max(0,Math.min(100,e.progress||0)):""}function Pa(e,r){r=r||{};var t=!1,n=null,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ie("formStepMediaTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent=ie("formStepMediaSubtitle"),a.appendChild(o);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-choices";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-media-choice",l.innerHTML=ae(zr)+"<span>Foto\u011Fraf Ekle</span>";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-media-choice",p.innerHTML=ae(kr)+"<span>Video Ekle</span>",u.appendChild(l),u.appendChild(p),a.appendChild(u);var v=document.createElement("div");v.className="renuvex-pr-fwizard-media-content",a.appendChild(v);var x=document.createElement("input");x.type="file",x.accept="video/mp4,video/quicktime,.mp4,.mov",x.style.display="none",a.appendChild(x);function s(){var c=e.get();return(c.images||[]).length>0||(c.pendingImages||[]).length>0}function d(){return e.get().videoUpload||null}function y(){if(!t){var c=d();if(v.innerHTML="",!!c){var w=document.createElement("div");w.className="renuvex-pr-fwizard-video-card";var T=document.createElement("video");T.className="renuvex-pr-fwizard-video-preview",T.muted=!0,T.playsInline=!0,T.preload="metadata",T.src=c.localUrl||"",w.appendChild(T);var E=document.createElement("div");E.className="renuvex-pr-fwizard-video-details";var C=document.createElement("div");C.className="renuvex-pr-fwizard-video-name",C.textContent=c.file?c.file.name:"Video";var S=document.createElement("div");if(S.className="renuvex-pr-fwizard-video-status"+(c.error?" renuvex-pr-fwizard-video-status--error":""),S.setAttribute("role",c.error?"alert":"status"),S.setAttribute("aria-live","polite"),S.textContent=Nn(c),E.appendChild(C),E.appendChild(S),c.status==="uploading"){var z=document.createElement("progress");z.className="renuvex-pr-fwizard-video-progress",z.max=100,z.value=c.progress||0,z.setAttribute("aria-label","Video y\xFCkleme ilerlemesi"),E.appendChild(z)}if(c.error&&c.file){var A=document.createElement("button");A.type="button",A.className="renuvex-pr-fwizard-video-retry",A.textContent="Tekrar Dene",A.onclick=function(){b(c.file,c.localUrl)},E.appendChild(A)}w.appendChild(E);var M=document.createElement("button");M.type="button",M.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",M.setAttribute("aria-label","Videoyu kald\u0131r");var P=W(ve);P&&M.appendChild(P),M.onclick=f,w.appendChild(M),v.appendChild(w)}}}function m(){var c=s(),w=!!d();l.disabled=w,p.disabled=c||w,l.classList.toggle("renuvex-pr-fwizard-media-choice--active",c),p.classList.toggle("renuvex-pr-fwizard-media-choice--active",w)}function h(c){var w=d();w&&e.set({videoUpload:Object.assign({},w,c)})}async function b(c,w){var T=Ca(c);if(!T.ok){r.showToast&&r.showToast(T.message,"error");return}var E=await Ea(c),C=Ta(E);if(!C.ok){r.showToast&&r.showToast(C.message,"error");return}var S=w||URL.createObjectURL(c),z=new AbortController;e.set({videoUpload:{file:c,localUrl:S,token:null,status:"uploading",progress:0,durationMs:E===null?null:Math.round(E*1e3),error:null,controller:z}});try{var A=await Aa({file:c,productId:e.get().productId,signal:z.signal,onToken:function(M){h({token:M})},onProgress:function(M){h({progress:M})},onStatus:function(M){h({status:M})}});if(A.previewOnly&&A.posterUrl&&A.posterUrl!==S)try{URL.revokeObjectURL(A.posterUrl)}catch(M){}h({token:A.token,status:"ready",progress:100,posterUrl:A.previewOnly?S:A.posterUrl,durationMs:A.durationMs||(E===null?null:Math.round(E*1e3)),error:null,controller:null}),!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(M){if(z.signal.aborted)return;h({status:"failed",error:"Video y\xFCklenemedi. Tekrar deneyin.",controller:null}),r.showToast&&r.showToast("Video y\xFCklenemedi. Tekrar deneyin.","error")}}function f(){var c=d();c&&(c.controller&&c.controller.abort(),Dr(c.token,e.get().productId,c.file),r.revokeBlobUrl&&r.revokeBlobUrl(c.localUrl),e.set({videoUpload:null}))}function g(c){n||(v.innerHTML="",n=Ur(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0}),v.appendChild(n.el),c&&n.openPicker&&n.openPicker())}l.onclick=function(){l.disabled||g(!0)},p.onclick=function(){p.disabled||x.click()},x.onchange=function(){var c=x.files&&x.files[0];x.value="",c&&b(c,null)};var k=e.onChange(function(){m(),d()&&y()});return m(),s()&&g(!1),d()&&y(),{el:a,destroy:function(){t=!0,l.onclick=null,p.onclick=null,x.onchange=null,n&&n.destroy&&n.destroy(),k&&k()}}}var lt=2e3,Rn=60;function Ma(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=ie("formStepContentTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=Rn,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var u=document.createElement("textarea");u.className="renuvex-pr-fwizard-textarea",u.placeholder="Deneyiminizi anlat\u0131n\u2026",u.maxLength=lt,u.rows=6,u.setAttribute("aria-label","Yorum"),u.value=e.get().comment||"",i.appendChild(u);var l=document.createElement("div");l.className="renuvex-pr-fwizard-char-counter",l.setAttribute("aria-live","polite"),i.appendChild(l);function p(){var x=u.value.length;l.textContent=x+"/"+lt,l.classList.toggle("renuvex-pr-fwizard-char-counter--max",x>=lt)}function v(){return Ke(3,e.get())}return u.addEventListener("input",function(){e.set({comment:u.value}),p(),t(v())}),n.appendChild(i),p(),setTimeout(function(){t(v())},0),{el:n,destroy:function(){}}}var _n=40;function La(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ie("formStepAuthorTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var u=document.createElement("div");u.className="renuvex-pr-fwizard-field";var l=document.createElement("label");l.className="renuvex-pr-fwizard-label",l.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var p=document.createElement("input");p.type="text",p.className="renuvex-pr-fwizard-input",p.maxLength=_n,p.setAttribute("aria-required","true"),p.value=e.get().author||"",u.appendChild(l),u.appendChild(p),o.appendChild(u);var v=document.createElement("div");v.className="renuvex-pr-fwizard-field";var x=document.createElement("label");x.className="renuvex-pr-fwizard-label",x.textContent="E-posta (opsiyonel)";var s=document.createElement("input");s.type="email",s.className="renuvex-pr-fwizard-input",s.setAttribute("autocomplete","email"),s.value=e.get().email||"",v.appendChild(x),v.appendChild(s),o.appendChild(v);var d=document.createElement("div");d.className="renuvex-pr-fwizard-notice",d.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(d);var y=document.createElement("div");y.className="renuvex-pr-fwizard-msg",y.setAttribute("role","alert"),y.setAttribute("aria-live","assertive"),o.appendChild(y);var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-submit-btn",m.textContent="G\xF6nder",o.appendChild(m),a.appendChild(o);function h(){return Ke(4,e.get())}function b(){var c=!h(),w=(e.get().pendingImages||[]).length,T=w>0,E=e.get().videoUpload,C=!!(E&&E.status!=="ready");T||C?(m.disabled=!0,m.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),m.textContent=C?"Video Haz\u0131rlan\u0131yor...":"Foto\u011Fraflar Y\xFCkleniyor..."):(m.disabled=c,m.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",c),m.textContent="G\xF6nder")}p.addEventListener("input",function(){e.set({author:p.value}),b(),t(h())}),s.addEventListener("input",function(){e.set({email:s.value})}),b(),setTimeout(function(){t(h())},0);function f(){y.textContent=""}function g(c){f();var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg-error",w.textContent=c||"",y.appendChild(w)}m.onclick=async function(){if(!m.disabled){var c=e.get(),w=(c.author||"").trim(),T=(c.comment||"").trim();if(s.value.trim()&&!s.checkValidity()){s.reportValidity();return}if(!w){g("Gerekli alan");return}if(!c.rating){g("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}m.disabled=!0,m.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var E=m.textContent;if(m.textContent="G\xF6nderiliyor\u2026",f(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){c.videoUpload&&c.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n()},600);return}try{var C=Ht(window.location.href),S=c.productName||null,z=await Re(Pe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ze,productId:c.productId||null,slug:C||null,productName:S,author:w,title:(c.title||"").trim()||null,comment:T||null,rating:c.rating,images:c.videoUpload?[]:c.images||[],videoToken:c.videoUpload&&c.videoUpload.status==="ready"?c.videoUpload.token:null})},15e3);if(z.ok)c.videoUpload&&c.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n();else{var A=await z.json().catch(function(){return{}});throw new Error(A.error||"Yorum kaydedilemedi.")}}catch(N){var M=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),P=M?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):g(P),m.disabled=!1,m.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),m.textContent=E}}};var k=e.onChange(b);return{el:a,destroy:function(){m.onclick=null,k&&k()}}}function In(e,r,t){if(t=t||{},e===1)return ya(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return Pa(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Ur(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Ma(r,{onValidityChange:t.onValidityChange});if(e===4)return La(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Na(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Ra(e){e=e||{};var r=ha({productId:e.productId,productName:e.productName,videoEnabled:L&&L.videoReviewsEnabled===!0}),t={},n={},a={};function i(S){if(!(!S||typeof S!="string"||!S.startsWith("blob:")||a[S])){a[S]=!0;try{URL.revokeObjectURL(S)}catch(z){}}}function o(){Object.keys(n).forEach(function(z){i(z)}),Object.keys(t).forEach(function(z){i(t[z])});var S=r.get();(S.pendingImages||[]).forEach(function(z){i(z&&z.url)}),(S.images||[]).forEach(function(z){i(z)}),S.videoUpload&&i(S.videoUpload.localUrl)}function u(){var S=r.get(),z=S.videoUpload;!z||S.videoSubmitted||(z.controller&&z.controller.abort(),Dr(z.token,S.productId,z.file))}var l=ga({onClose:function(){window.removeEventListener("popstate",v),Or(p),u(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),p=Br(),v=function(S){l&&l.close&&l.close()};window.addEventListener("popstate",v);var x=document.createElement("div");x.className="renuvex-pr-fwizard-step-wrap";var s=ba({skippableSteps:[2],nextableSteps:[3],onBack:function(){m==="idle"&&r.goBack()},onSkip:function(){m==="idle"&&r.goNext()},onNext:function(){m==="idle"&&r.goNext()}}),d=document.createElement("div");d.className="renuvex-pr-fwizard-layout",d.appendChild(x),d.appendChild(s.el);var y=null,m="idle",h=null,b=!0,f=null;function g(S,z){x.innerHTML="";var A=In(S,r,{canNavigate:function(){return m==="idle"},blobMap:t,urlToFinger:n,revokeBlobUrl:i,onValidityChange:function(N){s.setNextDisabled(!N)},onSuccess:c,showToast:l.showToast});if(y=A,s.update(S,r.get()),z){m="entering",A.el.classList.add("renuvex-pr-fwizard-step--enter");var M=null,P=function(){M&&clearTimeout(M),A.el.removeEventListener("animationend",P),A.el.classList.remove("renuvex-pr-fwizard-step--enter"),m="idle",h!==null&&w()};A.el.addEventListener("animationend",P),M=setTimeout(P,700)}else m="idle";x.appendChild(A.el),l.setStepAttr&&l.setStepAttr(S),S===3&&s.setNextDisabled(!0)}var k=!1;function c(){if(!k){if(k=!0,!y){x.innerHTML="";var S=Na();S.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(S),l.setStepAttr("thanks"),s.setThanksState(l.close);return}var z=y;m="exiting",z.el.classList.add("renuvex-pr-fwizard-step--exit");var A=function(){if(f&&clearTimeout(f),z.el.removeEventListener("animationend",A),z.destroy)try{z.destroy()}catch(P){}y===z&&(y=null),x.innerHTML="";var M=Na();M.classList.add("renuvex-pr-fwizard-step--enter"),x.appendChild(M),l.setStepAttr("thanks"),s.setThanksState(l.close),m="idle"};z.el.addEventListener("animationend",A),f=setTimeout(A,300)}}function w(){var S=r.get().currentStep;if(m!=="idle"){h=S;return}if(!y){var z=!b;b=!1,g(S,z);return}var A=y;m="exiting",A.el.classList.add("renuvex-pr-fwizard-step--exit");var M=function(){if(f&&clearTimeout(f),A.el.removeEventListener("animationend",M),A.destroy)try{A.destroy()}catch(N){}if(y===A){x.innerHTML="",y=null;var P=h!==null?h:r.get().currentStep;h=null,g(P,!0),m="idle"}};A.el.addEventListener("animationend",M),f=setTimeout(M,350)}w();var T=r.get().currentStep,E=r.onChange(function(S){S.currentStep!==T?(T=S.currentStep,w()):s.update(S.currentStep,S)}),C=l.close;return l.close=function(){E&&E(),typeof f!="undefined"&&f&&clearTimeout(f),C()},l.open(d),{close:l.close}}function K(){Ra({productId:H||"",productName:Me||""})}var _a=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Bn={id:"classic",name:"Klasik (A\xE7\u0131k)"},On=_a;function Fn(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,u=e.avgRatingVal,l=e.currentRatingFilter,p=e.currentOrderBy,v=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange;Se(a);var d=document.createElement("div");d.className="renuvex-pr-summary";var y=(o[3]||0)+(o[4]||0),m=i>0?Math.round(y/i*100):0,h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-avg",h.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+te("full")+'</span><span class="renuvex-pr-avg-num">'+u+"</span>",d.appendChild(h);var b=document.createElement("div");if(b.className="renuvex-pr-summary-block renuvex-pr-summary-count",b.textContent=i.toLocaleString("tr-TR")+" "+O(n.countLabel,"Yorum"),d.appendChild(b),n.showRecommendation!==!1&&m>0){var f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",f.innerHTML='<span class="renuvex-pr-recommend-pct">%'+m+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",d.appendChild(f)}return d.appendChild(Ge({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:x})),d.appendChild(re({widget:r,currentOrderBy:p,currentHasImages:v,onWriteClick:K,onSortChange:s})),d}var ut={};we(ut,{css:()=>Un,meta:()=>Hn,render:()=>jn});var Ia=`
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
`;var Hn={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Un=Ia,Yn="__unknown_product__",pr=Object.create(null);function Dn(e){return e?String(e):Yn}var Oe=null,ur=null;function Vn(){!Oe||!ur||(Oe.removeEventListener?Oe.removeEventListener("change",ur):Oe.removeListener&&Oe.removeListener(ur),Oe=null,ur=null)}function jn(e){var r=e.widget,t=e.productId,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,u=e.avgRatingVal,l=e.currentRatingFilter,p=e.currentOrderBy,v=e.currentHasImages,x=e.onFilterChange,s=e.onSortChange,d=Dn(t),y=document.createElement("div");y.className="renuvex-pr-summary renuvex-pr-summary-compact";var m=document.createElement("div");m.className="renuvex-pr-compact-header";var h=document.createElement("div");h.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Ce(u,a)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+ae(Ot)+"</span>";var f=b.querySelector(".renuvex-pr-compact-trigger-text"),g=b.querySelector(".renuvex-pr-compact-chevron");if(f&&(f.textContent=i.toLocaleString("tr-TR")+" "+O(n.countLabel,"Yorum")),f&&g){var k=document.createElement("span");k.className="renuvex-pr-compact-trigger-count",b.insertBefore(k,f),k.appendChild(f),k.appendChild(g)}h.appendChild(b),m.appendChild(h);var c=re({widget:r,currentOrderBy:p,currentHasImages:v,onWriteClick:K,onSortChange:s}),w=c.querySelector(".renuvex-pr-filter-wrap"),T=c.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-compact-actions-slot",T&&E.appendChild(T),w&&E.appendChild(w),m.appendChild(E),y.appendChild(m);var C=document.createElement("div");C.className="renuvex-pr-compact-panel",C.setAttribute("role","dialog"),C.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),C.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="renuvex-pr-compact-panel-inner";var z=document.createElement("div");z.className="renuvex-pr-compact-avg",z.innerHTML='<span class="renuvex-pr-icon">'+te("full")+"</span><span>"+u+"</span>",S.appendChild(z),S.appendChild(Ge({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:function(B){M()&&C.classList.contains("renuvex-pr-open")&&(pr[d]=!0),x(B)}})),C.appendChild(S);var A=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function M(){return!!(A&&A.matches)}function P(B){B?C.classList.add("renuvex-pr-open"):C.classList.remove("renuvex-pr-open"),C.setAttribute("aria-hidden",B?"false":"true"),b.setAttribute("aria-expanded",B?"true":"false")}function N(B){var D=B?y:h;if(C.parentNode!==D){var F=!!C.parentNode;C.classList.contains("renuvex-pr-open")&&P(!1),F&&(pr[d]=!1),D.appendChild(C)}}N(A?A.matches:!1);var I=re({widget:r,currentOrderBy:p,currentHasImages:v,onWriteClick:K,onSortChange:s}),q=I.querySelector(".renuvex-pr-filter-wrap"),_=I.querySelector(".renuvex-pr-write-btn"),V=document.createElement("div");V.className="renuvex-pr-compact-write-row",_&&V.appendChild(_),q&&V.appendChild(q),y.appendChild(V);function U(){var B=C.classList.contains("renuvex-pr-open");return P(!1),M()&&(pr[d]=!1),B}function Z(){Y&&Y.notifyOpening(),P(!0),M()&&(pr[d]=!0)}b.onclick=function(){C.classList.contains("renuvex-pr-open")?U():Z()};var Y=null;function J(B){Y&&(Y.unregister(),Y=null),B||(Y=Hr({trigger:h,element:C,close:U}))}if(J(A?A.matches:!1),Vn(),A){var pe=function(B){N(B.matches),J(B.matches)};A.addEventListener?A.addEventListener("change",pe):A.addListener&&A.addListener(pe),Oe=A,ur=pe}if(M()&&pr[d]&&P(!0),n.showRecommendation!==!1){var he=(o[3]||0)+(o[4]||0),oe=i>0?Math.round(he/i*100):0;if(oe>0){var j=document.createElement("div");j.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",j.style.marginTop="8px",j.innerHTML='<span class="renuvex-pr-recommend-pct">%'+oe+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild(j)}}return y}var dt={};we(dt,{css:()=>qn,meta:()=>Wn,render:()=>Gn});var Ba=`
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
`;var Wn={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},qn=Ba;function Gn(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,u=e.currentRatingFilter,l=e.currentOrderBy,p=e.currentHasImages,v=e.onFilterChange,x=e.onSortChange;Se(n);var s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-split";var d=document.createElement("div");d.className="renuvex-pr-split-col renuvex-pr-split-left";var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",y.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+te("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",d.appendChild(y);var m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",m.textContent=a.toLocaleString("tr-TR")+" "+O(t.countLabel,"Yorum"),d.appendChild(m),s.appendChild(d);var h=document.createElement("div");h.className="renuvex-pr-split-col renuvex-pr-split-mid",h.appendChild(Ge({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:u,onFilterChange:v})),s.appendChild(h);var b=re({widget:r,currentOrderBy:l,currentHasImages:p,onWriteClick:K,onSortChange:x}),f=b.querySelector(".renuvex-pr-filter-wrap"),g=b.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-split-col renuvex-pr-split-right",g&&k.appendChild(g),f&&k.appendChild(f),s.appendChild(k);var c=(i[3]||0)+(i[4]||0),w=a>0?Math.round(c/a*100):0,T=document.createElement("div");T.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",T.innerHTML='<span class="renuvex-pr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var E=t.showRecommendation===!1||w===0;return E&&T.classList.add("renuvex-pr-split-rec-hidden"),d.appendChild(T),s}var st={};we(st,{css:()=>Kn,meta:()=>Xn,render:()=>Jn});var Oa=`
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
`;var Xn={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Kn=Oa;function Jn(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,u=e.currentHasImages,l=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-minimal";var v=document.createElement("div");v.className="renuvex-pr-minimal-info";var x=document.createElement("div");x.className="renuvex-pr-minimal-row";var s=document.createElement("span");s.className="renuvex-pr-minimal-avg",s.textContent=i,x.appendChild(s);var d=document.createElement("span");d.className="renuvex-pr-minimal-stars",d.innerHTML=Ce(i,n),x.appendChild(d);var y=document.createElement("span");y.className="renuvex-pr-minimal-count",y.textContent=a.toLocaleString("tr-TR")+" "+O(t.countLabel,"Yorum"),x.appendChild(y),v.appendChild(x),p.appendChild(v);var m=re({widget:r,currentOrderBy:o,currentHasImages:u,onWriteClick:K,onSortChange:l}),h=m.querySelector(".renuvex-pr-filter-wrap"),b=m.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");f.className="renuvex-pr-minimal-actions",b&&f.appendChild(b),h&&f.appendChild(h),p.appendChild(f);var g=re({widget:r,currentOrderBy:o,currentHasImages:u,onWriteClick:K,onSortChange:l}),k=g.querySelector(".renuvex-pr-filter-wrap"),c=g.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");return w.className="renuvex-pr-minimal-write-row",c&&w.appendChild(c),k&&w.appendChild(k),p.appendChild(w),p}var vt={};we(vt,{css:()=>$n,meta:()=>Zn,render:()=>Qn});var Fa=`
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
`;var Zn={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},$n=Fa;function Qn(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,u=e.currentHasImages,l=e.onSortChange,p=document.createElement("div");p.className="renuvex-pr-summary renuvex-pr-summary-hero";var v=document.createElement("div");v.className="renuvex-pr-hero-info";var x=document.createElement("div");x.className="renuvex-pr-hero-rating-col";var s=document.createElement("span");s.className="renuvex-pr-hero-avg",s.textContent=i,x.appendChild(s);var d=document.createElement("div");d.className="renuvex-pr-hero-meta-row";var y=document.createElement("span");y.className="renuvex-pr-hero-stars",y.innerHTML=Ce(i,n),d.appendChild(y);var m=document.createElement("div");m.className="renuvex-pr-hero-count",m.textContent=a.toLocaleString("tr-TR")+" "+O(t.countLabel,"Yorum"),d.appendChild(m),x.appendChild(d),v.appendChild(x),p.appendChild(v);var h=re({widget:r,currentOrderBy:o,currentHasImages:u,onWriteClick:K,onSortChange:l}),b=h.querySelector(".renuvex-pr-filter-wrap"),f=h.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");g.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",f&&g.appendChild(f),b&&g.appendChild(b),p.appendChild(g);var k=re({widget:r,currentOrderBy:o,currentHasImages:u,onWriteClick:K,onSortChange:l}),c=k.querySelector(".renuvex-pr-filter-wrap"),w=k.querySelector(".renuvex-pr-write-btn"),T=document.createElement("div");return T.className="renuvex-pr-hero-write-row",w&&T.appendChild(w),c&&T.appendChild(c),p.appendChild(T),p}var Ha=`
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
`;var Vr={classic:pt,compact:ut,split:dt,minimal:st,hero:vt};function jr(e){return Vr[e]||Vr.classic}function Ua(){var e=Object.keys(Vr).map(function(r){return Vr[r].css||""}).join(`
`);return Ha+`
`+e}var ct={};we(ct,{css:()=>ri,meta:()=>ei,render:()=>ti});function Ee(e,r){r=r||{};var t=Gt(e);if(!t)return null;var n=document.createElement("img"),a=e.type==="image"?Tr(t,r.sourceWidth):{src:t,srcset:""};if(n.src=a.src,a.srcset&&(n.srcset=a.srcset),n.loading=r.loading||"lazy",n.decoding="async",e.type==="image"&&n.setAttribute("data-renuvex-img-url",e.url),r.width&&(n.width=r.width),r.height&&(n.height=r.height),n.alt="",Ar(n),e.type!=="video")return n.className=r.className||"",ir(n,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),n;var i=document.createElement("button");i.type="button",i.className=(r.className||"")+" renuvex-pr-media-video-thumb",n.className="renuvex-pr-media-poster",i.appendChild(n);var o=document.createElement("span");o.className="renuvex-pr-media-play";var u=W(kr);u&&o.appendChild(u),i.appendChild(o);var l=Xt(e.durationMs);if(l){var p=document.createElement("span");p.className="renuvex-pr-media-duration",p.textContent=l,i.appendChild(p)}return ir(i,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),i}function Ze(e,r,t){var n=t||{},a=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,a.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var u=!1;o.onclick=function(){u=!u,i.classList.toggle("renuvex-pr-body-clamped",!u),o.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:i,readMore:o}}function $e(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=O(L&&L.merchantReplyLabel,"Ma\u011Faza Sahibi"),n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var u=!1;o.onclick=function(){u=!u,i.classList.toggle("renuvex-pr-reply-text-clamped",!u),o.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Ya=`
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
`;var ei={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},ri=Ya;function ti(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ce(e.rating,L),a.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=me(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var u=document.createElement("div");u.className="renuvex-pr-review-title",u.textContent=e.title,t.appendChild(u)}var l=document.createElement("div");l.className="renuvex-pr-author",l.textContent=e.author||"",t.appendChild(l);var p=(e.comment||"").trim();p&&t.appendChild(Ze(p,"renuvex-pr-body").fragment);var v=xe(e);if(v.length){var x=document.createElement("div");x.className="renuvex-pr-gallery",v.forEach(function(d){var y=Ee(d,{className:"renuvex-pr-img",sourceWidth:ee,width:ee,height:ee,onOpen:function(){se(e,d.url,r)}});y&&x.appendChild(y)}),t.appendChild(x)}var s=$e(e.merchantReply);return s&&t.appendChild(s),t}var mt={};we(mt,{css:()=>ni,meta:()=>ai,render:()=>ii});var Da=`
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
    border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));
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
`;var ai={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},ni=Da;function ii(e,r){var t=xe(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ce(e.rating,L),i.appendChild(o);var u=document.createElement("span");u.className="renuvex-pr-review-list-author-name",u.textContent=e.author||"",i.appendChild(u);var l=document.createElement("time");l.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=me(e.createdAt),i.appendChild(l),a.appendChild(i);var p=document.createElement("div");if(p.className="renuvex-pr-review-list-content",e.title){var v=document.createElement("div");v.className="renuvex-pr-review-list-title",v.textContent=e.title,p.appendChild(v)}var x=(e.comment||"").trim();x&&p.appendChild(Ze(x,"renuvex-pr-review-list-body").fragment);var s=$e(e.merchantReply);if(s&&p.appendChild(s),a.appendChild(p),n){var d=document.createElement("div");d.className="renuvex-pr-review-list-media",t.forEach(function(y){var m=Ee(y,{sourceWidth:ee,width:ee,height:Math.round(ee*4/3),onOpen:function(){se(e,y.url,r)}});m&&d.appendChild(m)}),a.appendChild(d)}return a}var xt={};we(xt,{css:()=>li,meta:()=>oi,render:()=>pi});var Va=`
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
  .renuvex-pr-review-gallery-media > *{
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
`;var oi={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},li=Va;function pi(e,r){var t=Pr(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ce(e.rating,L),i.appendChild(o),e.title){var u=document.createElement("div");u.className="renuvex-pr-review-gallery-title",u.textContent=e.title,i.appendChild(u)}var l=document.createElement("div");l.className="renuvex-pr-review-gallery-author",l.textContent=e.author||"",i.appendChild(l);var p=document.createElement("time");p.className="renuvex-pr-review-gallery-date",p.style.display="block",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=me(e.createdAt),i.appendChild(p);var v=(e.comment||"").trim();if(v&&i.appendChild(Ze(v,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){se(e,t.url,r)}}:null).fragment),a.appendChild(i),n){var x=document.createElement("div");x.className="renuvex-pr-review-gallery-media";var s=Ee(t,{sourceWidth:Cr,width:Cr,height:Math.round(Cr*4/3),onOpen:function(){se(e,t.url,r)}});s&&x.appendChild(s),a.appendChild(x)}var d=$e(e.merchantReply,t?function(){se(e,t.url,r)}:null);return d&&(d.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(d)),a}var Wr={card:ct,list:mt,gallery:xt};function qr(e){return Wr[e]||Wr.card}function ja(){return Object.keys(Wr).map(function(e){return Wr[e].css||""}).join(`
`)}var ft=0;function Fe(){return ft++,ft}function He(e,r){return e!==ft?!1:r?!(r.productId!==void 0&&H!==r.productId||r.orderBy!==void 0&&X!==r.orderBy||r.page!==void 0&&tr!==r.page||r.ratingFilter!==void 0&&$!==r.ratingFilter||r.hasImages!==void 0&&Q!==r.hasImages||r.nextCursor!==void 0&&xr!==r.nextCursor):!0}var gt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},ht={small:80,medium:110,large:140},bt={small:80,medium:100,large:110};function Wa(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),n.appendChild(a),n.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var u=document.createElement("div");return u.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",u.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(u),r}function qa(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var n=document.createElement("div");n.className="renuvex-pr-empty-state-stars",n.innerHTML=Ce(0,e.iconPair),t.appendChild(n);var a=document.createElement("p");a.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(a),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function Ga(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Xa(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function ge(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function Gr(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function yt(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function Ka(e){return .2126*yt(e.r)+.7152*yt(e.g)+.0722*yt(e.b)}function Ja(e,r){var t=Ka(e),n=Ka(r),a=Math.max(t,n),i=Math.min(t,n);return(a+.05)/(i+.05)}function ui(e){var r=Gr(e)||Gr("#ffffff"),t=Gr("#111111"),n=Gr("#ffffff");return Ja(t,r)>=Ja(n,r)?"#111111":"#ffffff"}function di(e){return ge(e,e==="#ffffff"?.1:.06)}function Za(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",u=r.barTrackColor||"#e5e7eb",l=r.barCountColor||"#111111",p=ge(o,.06),v=r.reviewStarColor||"#f59e0b",x=r.btnBgColor||"#111111",s=r.btnTextColor||"#ffffff",d=r.btnBorderColor||"#111111",y=r.filterBtnBgColor||"#111111",m=r.filterBtnTextColor||"#ffffff",h=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",f=r.filterMenuBorderColor||"#e5e7eb",g=r.filterItemTextColor||"#111111",k=r.filterItemHoverBgColor||"#f3f4f6",c=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",T=r.reviewAuthorColor||"#111111",E=r.reviewDateColor||"#5e5e5e",C=r.reviewBodyColor||"#111111",S=r.reviewBorderColor||"#e5e7eb",z=ge(C,.65),A=r.replyBgColor||"#f9fafb",M=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",I=r.photoTitleColor||"#111111",q=ge("#111111",.05),_=r.photoArrowBgColor||"#ffffff",V=r.photoArrowTextColor||"#111111",U=ge("#111111",.12),Z=r.formBgColor||"#ffffff",Y=r.formPrimaryTextColor||"#111111",J=r.formSecondaryTextColor||"#3b3b3b",pe=r.inputTextColor||Y,he=r.inputBorderColor||"#d1d5db",oe=r.placeholderColor||"#9ca3af",j=r.formStepBarColor||"#111111",B=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",F=r.formBtnBorderColor||"#111111",Te=ge(B,.06),le=ge(B,.18),Qe=ge(D,.85),er=ge(Y,.06),be=ui(Z),R=di(be),G=r.loadMoreBgColor||"#ffffff",ye=r.loadMoreTextColor||"#111111",Ae=r.loadMoreBorderColor||"#111111",dr=r.paginationBgColor||"#ffffff",sr=r.paginationTextColor||"#111111",vr=r.paginationBorderColor||"#e5e7eb",cr=r.paginationActiveBgColor||"#111111",mr=r.paginationActiveTextColor||"#ffffff",ue={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":u,"--renuvex-pr-bar-count":l,"--renuvex-pr-bar-hover-bg":p,"--renuvex-pr-btn-bg":x,"--renuvex-pr-btn-text":s,"--renuvex-pr-btn-border":d,"--renuvex-pr-filter-btn-bg":y,"--renuvex-pr-filter-btn-text":m,"--renuvex-pr-filter-btn-border":h,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":f,"--renuvex-pr-filter-item-text":g,"--renuvex-pr-filter-item-hover-bg":k,"--renuvex-pr-filter-item-active":c,"--renuvex-pr-review-title":w,"--renuvex-pr-review-author":T,"--renuvex-pr-review-date":E,"--renuvex-pr-review-body":C,"--renuvex-pr-review-border":S,"--renuvex-pr-state-text":z,"--renuvex-pr-review-star-color":v,"--renuvex-pr-reply-bg-color":A,"--renuvex-pr-reply-border":M,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":I,"--renuvex-pr-photo-image-border":q,"--renuvex-pr-photo-arrow-bg":_,"--renuvex-pr-photo-arrow-text":V,"--renuvex-pr-photo-arrow-border":U,"--renuvex-pr-fwizard-bg":Z,"--renuvex-pr-fwizard-text":Y,"--renuvex-pr-fwizard-secondary-text":J,"--renuvex-pr-fwizard-input-bg":Z,"--renuvex-pr-fwizard-input-text":pe,"--renuvex-pr-fwizard-input-border":he,"--renuvex-pr-fwizard-placeholder":oe,"--renuvex-pr-fwizard-close-text":be,"--renuvex-pr-fwizard-close-hover-bg":R,"--renuvex-pr-fwizard-progress-bg":er,"--renuvex-pr-fwizard-progress-active":j,"--renuvex-pr-fwizard-btn-bg":B,"--renuvex-pr-fwizard-btn-text":D,"--renuvex-pr-fwizard-btn-border":F,"--renuvex-pr-fwizard-btn-disabled-bg":le,"--renuvex-pr-fwizard-btn-disabled-text":Qe,"--renuvex-pr-fwizard-nav-hover-bg":Te,"--renuvex-pr-load-more-bg":G,"--renuvex-pr-load-more-text":ye,"--renuvex-pr-load-more-border":Ae,"--renuvex-pr-pagination-bg":dr,"--renuvex-pr-pagination-text":sr,"--renuvex-pr-pagination-border":vr,"--renuvex-pr-pagination-active-bg":cr,"--renuvex-pr-pagination-active-text":mr};Object.keys(ue).forEach(function(rr){e.style.setProperty(rr,ue[rr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function $a(e){var r=e.settings,t=e.root,n=e.currentHasImages,a=e.openReviewModal,i=(e.photoStripReviews||[]).filter(function(g){return xe(g).length>0});if(!(r.showPhotoGallery!==!1&&!n&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var u=O(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),l=document.createElement("div");l.className="renuvex-pr-photo-title",l.textContent=u,o.appendChild(l)}var p=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",p);var v=document.createElement("div");v.className="renuvex-pr-photo-strip";var x=ee,s=r.reviewLayout==="card"?ee:Math.round(ee*4/3),d=0;i.forEach(function(g){if(!(d>=15)){var k=Pr(g);if(k){var c=Ee(k,{className:"renuvex-pr-photo-strip-thumb",sourceWidth:ee,width:x,height:s,loading:d<3?"eager":"lazy",onOpen:function(){a(g,k.url,i)}});c&&(v.appendChild(c),d++)}}});var y=document.createElement("button");y.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var m=W(De);m&&y.appendChild(m),y.setAttribute("aria-label","\xD6nceki"),y.onclick=function(){v.scrollBy({left:-200,behavior:"smooth"})};var h=document.createElement("button");h.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var b=W(wr);b&&h.appendChild(b),h.setAttribute("aria-label","Sonraki"),h.onclick=function(){v.scrollBy({left:200,behavior:"smooth"})};var f=document.createElement("div");return f.className="renuvex-pr-photo-strip-wrap",f.appendChild(y),f.appendChild(v),f.appendChild(h),o.appendChild(f),o}var si=1,vi=7,wt="\u2026";function ci(e,r){var t=Math.max(1,Math.floor(Number(r))||1),n=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=vi){for(var a=[],i=1;i<=t;i++)a.push(i);return a}for(var o=[],u=1;u<=t;u++)(u===1||u===t||Math.abs(u-n)<=si)&&o.push(u);for(var l=[],p=0;p<o.length;p++)p>0&&o[p]-o[p-1]>1&&l.push(wt),l.push(o[p]);return l}function Qa(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),n=typeof e.onPageChange=="function"?e.onPageChange:function(){},a=document.createElement("nav");a.className="renuvex-pr-pagination",a.setAttribute("aria-label","Yorum sayfalar\u0131");function i(l){a.setAttribute("aria-busy","true");for(var p=a.querySelectorAll("button"),v=0;v<p.length;v++)p[v].disabled=!0;n(l)}function o(l,p){var v=document.createElement("span");v.className="renuvex-pr-pagination-label",v.setAttribute("aria-hidden","true"),v.textContent=p,l.appendChild(v)}function u(l,p,v,x){var s=document.createElement("button");return s.type="button",s.className="renuvex-pr-pagination-arrow",s.setAttribute("aria-label",l),o(s,p),x?s.disabled=!0:s.onclick=function(){i(v)},s}return a.appendChild(u("\xD6nceki sayfa","\u2039",t-1,t<=1)),ci(t,r).forEach(function(l){if(l===wt){var p=document.createElement("span");p.className="renuvex-pr-pagination-gap",p.setAttribute("aria-hidden","true"),p.textContent=wt,a.appendChild(p);return}var v=document.createElement("button");v.type="button",v.className="renuvex-pr-pagination-btn",v.setAttribute("aria-label","Sayfa "+l),o(v,String(l)),l===t?v.setAttribute("aria-current","page"):v.onclick=function(){i(l)},a.appendChild(v)}),a.appendChild(u("Sonraki sayfa","\u203A",t+1,t>=r)),a}function en(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function rn(e){var r=e.render;async function t(){var o=Fe(),u=H,l=X,p=$,v=Q;ke(null);var x=await Ie(H,X,1,$,Q);He(o,{productId:u,orderBy:l,ratingFilter:p,hasImages:v})&&await r(H,L,x,Me,X,1,kt)}async function n(o){var u=Fe(),l=$===o?null:o,p=H,v=X,x=Q;Ct(l),Le(1),ke(null);var s=await Ie(H,X,1,l,Q);He(u,{productId:p,orderBy:v,page:1,ratingFilter:l,hasImages:x})&&await r(H,L,s,Me,X,1)}async function a(o,u){var l=Fe(),p=H,v=$;Le(1),ke(null);var x=o,s=!1;u&&(s=!0,x="newest"),Et(s),fr(x);var d=await Ie(H,x,1,$,s);He(l,{productId:p,orderBy:x,page:1,ratingFilter:v,hasImages:s})&&await r(H,L,d,Me,x,1)}async function i(o){var u=Fe(),l=H,p=X,v=$,x=Q;Le(o),ke(null);var s=await Ie(H,X,o,$,Q);if(He(u,{productId:l,orderBy:p,page:o,ratingFilter:v,hasImages:x})){await r(H,L,s,Me,X,o);var d=document.getElementById("renuvex-reviews"),y=d&&d.shadowRoot,m=y&&y.querySelector&&y.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(m){try{m.focus({preventScroll:!0})}catch(f){try{m.focus()}catch(g){}}en(y,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var h=document.getElementById("renuvex-reviews");if(h&&typeof h.scrollIntoView=="function"){var b=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;h.scrollIntoView({behavior:b?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:n,onSortChange:a,onPageChange:i}}function mi(){return Wt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function xi(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=Vt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),jt(t,{surface:"reviews",productId:r||""}),t}async function zt(e,r,t,n,a,i,o){if(It){br({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:o});return}hr(!0),Tt(e),At(r),o!==void 0&&Pt(o),Mt(n),a&&fr(a),i&&Le(i),t!=null&&(Lt(t),ke(t&&t.data?t.data.nextCursor:null));var u=rn({render:zt});try{let be=function(R,G){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var ye=R.meta.sizeOverrides[G];ye&&Object.keys(ye).forEach(function(Ae){d.style.setProperty(Ae,ye[Ae])})}};var Qe=be,l=jr(r.summaryLayout),p=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),v=r.showTitle!==!1,x=O(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),s=p&&v?x:"",d=document.documentElement;Za(d,r);var y=r.borderRadius!==void 0?r.borderRadius:8,m=gt[r.size]||gt.medium,h=ht[r.thumbnailSize]||ht.medium,b=h;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(b=bt[r.thumbnailSize]||bt.medium),d.style.setProperty("--renuvex-pr-title-size",m.titleSize+"px"),d.style.setProperty("--renuvex-pr-review-text-size",m.reviewTextSize+"px"),d.style.setProperty("--renuvex-pr-review-title-size",m.reviewTitleSize+"px"),d.style.setProperty("--renuvex-pr-author-size",m.authorSize+"px"),d.style.setProperty("--renuvex-pr-reply-name-size",m.replyNameSize+"px"),d.style.setProperty("--renuvex-pr-reply-text-size",m.replyTextSize+"px"),d.style.setProperty("--renuvex-pr-radius",y+"px"),d.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,y-4)+"px"),d.style.setProperty("--renuvex-pr-photo-title-size",m.photoTitleSize+"px"),d.style.setProperty("--renuvex-pr-avg-rating-size",m.avgRatingSize+"px"),d.style.setProperty("--renuvex-pr-review-count-size",m.reviewCountSize+"px"),d.style.setProperty("--renuvex-pr-compact-count-size",m.compactCountSize+"px"),d.style.setProperty("--renuvex-pr-recommend-size",m.recommendSize+"px"),d.style.setProperty("--renuvex-pr-btn-text-size",m.btnTextSize+"px"),d.style.setProperty("--renuvex-pr-bar-label-size",m.barLabelSize+"px"),d.style.setProperty("--renuvex-pr-minimal-avg-size",m.minimalAvgSize+"px"),d.style.setProperty("--renuvex-pr-hero-avg-size",m.heroAvgSize+"px"),d.style.setProperty("--renuvex-pr-minimal-count-size",m.minimalCountSize+"px"),d.style.setProperty("--renuvex-pr-hero-count-size",m.heroCountSize+"px"),d.style.setProperty("--renuvex-pr-bar-count-size",m.barCountSize+"px"),d.style.setProperty("--renuvex-pr-review-date-size",m.reviewDateSize+"px"),d.style.setProperty("--renuvex-pr-filter-text-size",m.filterTextSize+"px"),d.style.setProperty("--renuvex-pr-load-more-size",m.loadMoreSize+"px"),d.style.setProperty("--renuvex-pr-load-more-min-height",m.loadMoreMinHeight+"px"),d.style.setProperty("--renuvex-pr-load-more-pad-y",m.loadMorePadY+"px"),d.style.setProperty("--renuvex-pr-load-more-pad-x",m.loadMorePadX+"px"),d.style.setProperty("--renuvex-pr-load-more-mobile-min-height",m.loadMoreMobileMinHeight+"px"),d.style.setProperty("--renuvex-pr-pagination-button-size",m.paginationButtonSize+"px"),d.style.setProperty("--renuvex-pr-pagination-pad-x",m.paginationPadX+"px"),d.style.setProperty("--renuvex-pr-pagination-gap",m.paginationGap+"px"),d.style.setProperty("--renuvex-pr-pagination-margin-top",m.paginationMarginTop+"px"),d.style.setProperty("--renuvex-pr-pagination-gap-min",m.paginationGapMin+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-button-size",m.paginationMobileButtonSize+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-font-size",m.paginationMobileFontSize+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-gap",m.paginationMobileGap+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",m.paginationMobileMarginTop+"px"),d.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",m.paginationMobileGapMin+"px"),d.style.setProperty("--renuvex-pr-read-more-size",m.readMoreSize+"px"),d.style.setProperty("--renuvex-pr-thumbnail-size",h+"px"),d.style.setProperty("--renuvex-pr-thumbnail-size-mobile",b+"px");var f=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";d.style.setProperty("--renuvex-pr-review-star-color",f),d.style.setProperty("--renuvex-pr-star-size",m.reviewStarSize+"px"),d.style.setProperty("--renuvex-pr-avg-star-size",m.avgStarSize+"px"),be(jr(r.summaryLayout),r.size),be(qr(r.reviewLayout),r.size);var g=ar(r),k=mi();if(!k)return;var c=xi(k,e),w=document.getElementById("renuvex-reviews");w||(w=document.createElement("div"),w.id="renuvex-reviews",w.style.minHeight="200px"),w.parentNode!==c&&c.appendChild(w);var T=Kt(w),E=Ve+Ue+Lr+Ua()+ja();je(T,E);var C=Zt(T);if(r.enabled===!1){w.style.minHeight="auto",C.replaceChildren(Wa(r.borderRadius!==void 0?r.borderRadius:8)),hr(!1);var S=gr;br(null),S&&zt(S.productId,S.settings,S.reviewsData,S.productName,S.orderBy,S.page,S.badgeSettings);return}try{var z=t||{},A=$r(z),M=A?[]:z.data&&z.data.reviews||[];Nt(M),C.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),s){var N=document.createElement("div"),I=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+I,N.textContent=s,P.appendChild(N)}if(A){P.appendChild(Xa(z.message,u.onRetry)),C.appendChild(P),Ne(T),Xr(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return T.getElementById("renuvex-reviews-widget")});return}var q=z.data&&z.data.allCount||0,_=z.data&&z.data.ratingCounts||null,V=_||[0,0,0,0,0],U=z.data&&z.data.avgRating||"0.0";if(!_&&M.length>0){M.forEach(function(R){R.rating>=1&&R.rating<=5&&V[R.rating-1]++});var Z=M.reduce(function(R,G){return R+G.rating},0);U=(Z/M.length).toFixed(1)}if(q===0)P.classList.add("renuvex-pr-reviews-empty"),P.appendChild(qa({iconPair:g,writeButtonText:O(r.writeButtonText,"Yorum Yap"),emptyStateText:O(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:K}));else{var Y=jr(r.summaryLayout),J=Y.render({widget:P,productId:e,data:z,settings:r,iconPair:g,allCount:q,ratingCounts:V,avgRatingVal:U,currentRatingFilter:$,currentOrderBy:X,currentHasImages:Q,onFilterChange:u.onFilterChange,onSortChange:u.onSortChange});P.appendChild(J);var pe=$a({settings:r,root:d,currentHasImages:Q,photoStripReviews:St,openReviewModal:se,wireLightboxTrigger:ir});if(pe&&P.appendChild(pe),M.length===0)P.appendChild(Ga());else{var he=qr(r.reviewLayout);M.forEach(function(R){P.appendChild(he.render(R,Kr))})}var oe=r.paginationMode==="numbered"?"numbered":"loadMore";if(oe==="numbered"){var j=z.data&&z.data.totalPages||1;j>1&&P.appendChild(Qa({page:z.data&&z.data.page||tr||1,totalPages:j,onPageChange:u.onPageChange}))}var B=oe==="loadMore"&&z.data&&z.data.hasMore;if(B){let R=function(G){F.textContent=G,D.setAttribute("aria-label",G)};var er=R,D=document.createElement("button");D.className="renuvex-pr-load-more";var F=document.createElement("span");F.className="renuvex-pr-load-more-label",F.setAttribute("aria-hidden","true"),D.appendChild(F),R("Daha Fazla G\xF6ster"),D.onclick=async function(){D.disabled=!0,R("Y\xFCkleniyor...");var G=Fe(),ye=H,Ae=X,dr=tr,sr=$,vr=Q,cr=xr,mr=dr+1,ue=await Ie(ye,Ae,mr,sr,vr,null,cr);if(He(G,{productId:ye,orderBy:Ae,page:dr,ratingFilter:sr,hasImages:vr,nextCursor:cr}))if(ue&&!$r(ue)&&ue.data&&Array.isArray(ue.data.reviews)){var rr=Rt(ue.data.reviews);_t(rr),Le(mr),ke(ue.data.nextCursor||null);var tn=qr(L.reviewLayout);rr.forEach(function(an){P.insertBefore(tn.render(an,Kr),D)}),ue.data.hasMore?(D.disabled=!1,R("Daha Fazla G\xF6ster")):D.remove()}else D.disabled=!1,R("Tekrar Dene")},P.appendChild(D)}}C.appendChild(P),Ne(T),Xr(P,"reviews-widget",{productId:e||""},function(){return T.getElementById("renuvex-reviews-widget")})}catch(R){console.error("[renuvex-pr] render error:",R);var Te=document.createElement("p");Te.style.cssText="text-align:center;color:#dc2626;",Te.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(Te)}}finally{if(hr(!1),gr){var le=gr;br(null),zt(le.productId,le.settings,le.reviewsData,le.productName,le.orderBy,le.page,le.badgeSettings)}}}export{zt as render};
