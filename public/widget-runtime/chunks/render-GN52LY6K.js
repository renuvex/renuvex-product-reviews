/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ve,d as Ee}from"./chunk-N7KC6W47.js";import{b as pt,c as Be}from"./chunk-W6RJS6FO.js";import{A as Gt,B as Kt,C as zr,D as Sr,E as Cr,a as Z,b as nr,c as re,d as te,e as X,f as _,g as Bt,h as _e,j as wr,k as it,l as Ft,m as kr,n as Le,o as Ot,p as Ut,q as Ht,r as Vt,s as Dt,t as Yt,u as jt,v as Te,y as Wt,z as qt}from"./chunk-H43GKW4S.js";import{A as ye,B as Mr,C as ea,D as ae,E as Nr,F as _r,G as ot,H as lt,I as Lr,J as ra,K as Rr,L as ta,M as aa,c as nt,e as Ae,f as oe,g as le,h as J,i as Re,j as Er,k as ir,l as Xt,m as De,n as Tr,o as Jt,p as he,q as Ar,r as Zt,s as Pr,u as U,v as $t,w as be,x as Pe,z as Qt}from"./chunk-LROBNK66.js";import{c as we}from"./chunk-WWGCW5YN.js";import{a as ie,b as ge,h as na,i as Ie}from"./chunk-UOBLDAJF.js";import{c as Ce}from"./chunk-NGSVSVJA.js";function ut(e){if(typeof e!="string"||!e)return!1;try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return!1;var t=r.hostname.toLowerCase();return t==="stream.mux.com"||t==="image.mux.com"}catch(n){return!1}}function En(e){return!e||!ut(e.href)?!1:e.hostname.toLowerCase()==="image.mux.com"?/\/thumbnail\.(jpg|jpeg|png|webp)$/i.test(e.pathname):!1}function Ir(e){var r=Number(e);return Number.isFinite(r)&&r>0?Math.round(r):0}function Ye(e,r){if(r=r||{},typeof e!="string"||!e)return"";var t;try{t=new URL(e)}catch(i){return e}if(!En(t))return e;var n=Ir(r.width),a=Ir(r.height);return n&&t.searchParams.set("width",String(n)),a&&t.searchParams.set("height",String(a)),t.hostname.toLowerCase()==="image.mux.com"&&(r.fit==="crop"||r.fit==="smartcrop"||r.fit==="pad"||r.fit==="stretch"||r.fit==="preserve"?t.searchParams.set("fit_mode",r.fit):r.fit&&t.searchParams.set("fit_mode","preserve")),t.href}function ia(e,r){r=r||{};var t=Ir(r.width),n=Ir(r.height);if(!t&&!n)return"";var a=Ye(e,{width:t,height:n,fit:r.fit}),i=Ye(e,{width:t?t*2:0,height:n?n*2:0,fit:r.fit});return!a||!i||a===e||i===e?"":a+" 1x, "+i+" 2x"}function ke(e){var r=[],t={},n=e&&Array.isArray(e.media)?e.media:[];return n.forEach(function(a){if(!(!a||typeof a!="object")){if(a.type==="video"){if(!ut(a.url)||!ut(a.posterUrl||a.thumbnailUrl))return;var i="video:"+a.url;if(t[i])return;t[i]=!0,r.push({type:"video",url:a.url,posterUrl:a.posterUrl||a.thumbnailUrl,thumbnailUrl:a.thumbnailUrl||a.posterUrl,durationMs:typeof a.durationMs=="number"?a.durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length});return}if(a.type==="image"&&Mr(a.url)){var o="image:"+a.url.trim();if(t[o])return;t[o]=!0,r.push({type:"image",url:a.url.trim(),thumbnailUrl:a.thumbnailUrl||null,posterUrl:null,durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length})}}}),ea(e).forEach(function(a){var i="image:"+a;t[i]||(t[i]=!0,r.push({type:"image",url:a,thumbnailUrl:null,posterUrl:null,durationMs:null,width:null,height:null,position:r.length}))}),r.sort(function(a,i){return a.position-i.position})}function Br(e){var r=ke(e);return r.length?r[0]:null}function oa(e){return e&&e.type==="video"?e.posterUrl:e&&e.url}function la(e){if(typeof e!="number"||e<=0)return"";var r=Math.max(0,Math.round(e/1e3)),t=Math.floor(r/60),n=String(r%60).padStart(2,"0");return t+":"+n}var je=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function pa(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function We(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Fr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function ua(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function da(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var sa=`
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
`,va=`
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
`;var ca=`
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
`;var ma=`
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
`;var fa=`
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
`;var xa=`
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
`;var ga=`
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
  .renuvex-pr-modal-video-enter{animation:renuvexPrVideoFadeIn 0.15s ease forwards;}
  @keyframes renuvexPrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes renuvexPrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes renuvexPrVideoFadeIn{from{opacity:0;}to{opacity:1;}}
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
`;var ha=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.68);color:#fff;pointer-events:none;}
  .renuvex-pr-media-play svg{width:17px;height:17px;margin-left:2px;}
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Or=[sa,Qt,ca,ma,fa,xa,ha,ga,va].join(`
`);function Tn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function me(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function An(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function Pn(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=An()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Mn(e){var r=document.body.style,t=document.documentElement.style;me(t,"overflow",e.rootOverflow,e.rootOverflowPriority),me(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),me(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),me(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),me(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),me(r,"position",e.bodyPosition,e.bodyPositionPriority),me(r,"top",e.bodyTop,e.bodyTopPriority),me(r,"left",e.bodyLeft,e.bodyLeftPriority),me(r,"right",e.bodyRight,e.bodyRightPriority),me(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var or=0,qe=null;function Ur(){return or+=1,or>1||(qe=Tn(),Pn(qe)),qe}function Hr(){if(or!==0&&(or-=1,!(or>0))){var e=qe;qe=null,e&&Mn(e)}}function Nn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Vr(){var e=Nn();return!e||e===document.body||e===document.documentElement?null:e}function pe(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function _n(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function dt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(_n)}function Ln(e,r){var t=e,n=dt(e);!n.length&&r&&(t=r,n=dt(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;pe(a)}function Dr(e,r,t){if(e.key==="Tab"){var n=dt(r);if(!n.length){e.preventDefault(),Ln(r);return}var a=n[0],i=n[n.length-1],o=ua(t);if(!r.contains(o)){e.preventDefault(),pe(a);return}if(n.indexOf(o)===-1){e.preventDefault(),pe(e.shiftKey?i:a);return}e.shiftKey&&o===a?(e.preventDefault(),pe(i)):!e.shiftKey&&o===i&&(e.preventDefault(),pe(a))}}var ba="renuvexPrOverlay";function Yr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[ba]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Rn(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[ba]===e.id)}function jr(e){if(Rn(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function In(e){var r=e||(typeof navigator!="undefined"?navigator:null),t=r&&(r.connection||r.webkitConnection||r.mozConnection);if(t&&t.saveData===!0)return!1;var n=t&&typeof t.effectiveType=="string"?t.effectiveType.toLowerCase():"";return n!=="slow-2g"&&n!=="2g"}function Bn(e){var r=Number(e&&e.width),t=Number(e&&e.height),n=Number(e&&(e.bitrate||e.bandwidth));return Number.isFinite(r)||Number.isFinite(t)?(Number.isFinite(t)?t:0)*1e5+(Number.isFinite(r)?r:0):Number.isFinite(n)?n:0}function Fn(e,r,t){if(!Array.isArray(e)||!e.length)return-1;var n=t||(typeof window!="undefined"?window:null),a=r&&typeof r.getBoundingClientRect=="function"?r.getBoundingClientRect():{width:0,height:0},i=Math.max(Number(a.width)||0,Number(r&&r.clientWidth)||0,360),o=Math.max(Number(a.height)||0,Number(r&&r.clientHeight)||0,360),p=Number(n&&n.devicePixelRatio),l=Number.isFinite(p)&&p>0?Math.min(p,2):1,u=Math.round(i*l*1.15),c=Math.round(o*l*1.15),m=-1,d=-1,v=0,k=Number.POSITIVE_INFINITY;return e.forEach(function(s,x){var g=Bn(s);g<k&&(k=g,v=x);var y=Number(s&&s.width),h=Number(s&&s.height),w=!Number.isFinite(y)||y<=u,b=!Number.isFinite(h)||h<=c;w&&b&&g>d&&(d=g,m=x)}),m>=0?m:v}function On(e,r,t){if(In()){var n=e&&e.Events&&e.Events.MANIFEST_PARSED;if(!(!n||!r||typeof r.on!="function")){var a=function(){typeof r.off=="function"&&r.off(n,a);var i=Fn(r.levels,t);if(i>=0)try{r.startLevel=i}catch(o){}};r.on(n,a)}}}function ya(e,r){var t=!1,n=null;return e.controls=!0,e.autoplay=!1,e.preload="metadata",e.playsInline=!0,e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),e.poster=Ye(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"",e.canPlayType("application/vnd.apple.mpegurl")?e.src=r.url:import("./hls-64XD2IDA.js").then(function(a){if(!t){var i=a.default||a;if(!i||!i.isSupported||!i.isSupported()){e.dispatchEvent(new Event("error"));return}n=new i({enableWorker:!0,lowLatencyMode:!1,capLevelToPlayerSize:!0,backBufferLength:30}),On(i,n,e),n.loadSource(r.url),n.attachMedia(e)}}).catch(function(){t||e.dispatchEvent(new Event("error"))}),function(){t=!0;try{e.pause()}catch(i){}if(n){try{n.destroy()}catch(i){}n=null}e.removeAttribute("src");try{e.load()}catch(i){}}}function Ge(e){return ke(e)}function vt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function wa(e,r,t,n,a,i){e&&e.shadowRoot&&vt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Hr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Er(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&pe(a)}function Un(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=be(e.rating,_);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=ye(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-modal-author",p.textContent=e.author||"",t.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-modal-body",l.textContent=(e.comment||"").trim(),l.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var c=document.createElement("div");c.className="renuvex-pr-modal-reply-label",c.textContent=U(_&&_.merchantReplyLabel,"Ma\u011Faza Sahibi");var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",u.appendChild(c),u.appendChild(m),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function ka(e,r,t){var n=t||_,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=be(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=ye(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var p=a.querySelector(".renuvex-pr-modal-body");p.textContent=(r.comment||"").trim(),p.style.display=r.comment&&r.comment.trim()?"":"none";var l=a.querySelector(".renuvex-pr-modal-reply");l.querySelector(".renuvex-pr-modal-reply-label").textContent=U(n&&n.merchantReplyLabel,"Ma\u011Faza Sahibi"),l.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",l.style.display=r.merchantReply?"":"none",e.scrollTop=0}function ct(e,r,t,n,a,i,o,p,l){var u=Ge(e),c=Math.max(0,Math.min(t||0,u.length-1)),m=u[c],d=document.createElement("div");d.className="renuvex-pr-modal-left";var v=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(m&&m.type==="video"){var k=document.createElement("video");k.className="renuvex-pr-modal-main-video"+(v?" renuvex-pr-modal-video-enter":""),k.setAttribute("aria-label","Yorum videosu"),k.addEventListener("error",function(){if(!d.querySelector(".renuvex-pr-modal-img-error")){var N=document.createElement("div");N.className="renuvex-pr-modal-img-error",N.setAttribute("role","status"),N.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",d.insertBefore(N,k)}}),d.__renuvexMediaCleanup=ya(k,m),d.appendChild(k)}else{var s=document.createElement("img");if(s.className="renuvex-pr-modal-main-img"+(v?" "+v:""),s.src=lt(m?m.url:""),s.decoding="async",s.width=ot,s.height=Math.round(ot*4/3),s.alt="Yorum foto\u011Fraf\u0131",!v){s.classList.add("renuvex-pr-modal-img-loading");var x=function(){s.classList.remove("renuvex-pr-modal-img-loading")};s.complete&&s.naturalWidth>0?x():(s.addEventListener("load",x,{once:!0}),s.addEventListener("error",x,{once:!0}))}ra(s,function(N){if(N.style.display="none",!d.querySelector(".renuvex-pr-modal-img-error")){var L=document.createElement("div");L.className="renuvex-pr-modal-img-error",L.setAttribute("role","status"),L.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",d.insertBefore(L,N)}}),d.appendChild(s)}var g=document.createElement("button");g.className="renuvex-pr-modal-close-mobile";var y=J(he);y&&g.appendChild(y),g.setAttribute("aria-label","Kapat"),g.onclick=function(N){N.stopPropagation(),i()},d.appendChild(g);var h=0;if(d.addEventListener("touchstart",function(N){h=N.touches[0].clientX},{passive:!0}),d.addEventListener("touchend",function(N){var L=h-N.changedTouches[0].clientX;if(!(Math.abs(L)<50)){if(L>0){if(z)ze(e,r,c+1,n,a,i,!0,"next",p,l);else if(A){var B=n[r+1];ze(B,r+1,0,n,a,i,!1,"next",p,l)}}else if(b)ze(e,r,c-1,n,a,i,!0,"prev",p,l);else if(S){var R=n[r-1],H=Ge(R);ze(R,r-1,H.length-1,n,a,i,!1,"prev",p,l)}}},{passive:!0}),u.length>1){var w=document.createElement("div");w.className="renuvex-pr-modal-thumbs",u.forEach(function(N,L){var B=N.type==="video"?N.posterUrl:N.url,R=document.createElement("img"),H=Lr(B,_r);R.src=H.src,R.srcset=H.srcset,R.loading="lazy",R.decoding="async",R.width=_r,R.height=_r,R.className="renuvex-pr-modal-thumb"+(L===c?" renuvex-pr-modal-thumb-active":""),R.alt="K\xFC\xE7\xFCk resim "+(L+1),Rr(R),R.tabIndex=0,R.setAttribute("role","button"),R.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(L+1)+" se\xE7"),L===c&&R.setAttribute("aria-current","true"),(function(G){function I(){ze(e,r,G,n,a,i,!0,null,p,l)}R.onclick=I,R.onkeydown=function(V){(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),I())}})(L),w.appendChild(R)}),d.appendChild(w)}var b=c>0,z=c<u.length-1,S=r>0,A=r<n.length-1,E=b||S,T=z||A;if(E){var f=document.createElement("button");f.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var C=J(De);C&&f.appendChild(C),f.setAttribute("aria-label","\xD6nceki"),f.onclick=function(N){if(N.stopPropagation(),b)ze(e,r,c-1,n,a,i,!0,"prev",p,l);else if(S){var L=n[r-1],B=Ge(L);ze(L,r-1,B.length-1,n,a,i,!1,"prev",p,l)}},d.appendChild(f)}if(T){var M=document.createElement("button");M.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var P=J(Tr);P&&M.appendChild(P),M.setAttribute("aria-label","Sonraki"),M.onclick=function(N){if(N.stopPropagation(),z)ze(e,r,c+1,n,a,i,!0,"next",p,l);else if(A){var L=n[r+1];ze(L,r+1,0,n,a,i,!1,"next",p,l)}},d.appendChild(M)}return d}function za(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Ge(n);a[0]&&a[0].type==="image"&&(new Image().src=lt(a[0].url))}})}function st(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Hn(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){st(t),st(n),st(a)}i(),t&&pe(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function ze(e,r,t,n,a,i,o,p,l,u){if(u&&(u.currentReview=e),o){var c=ct(e,r,t,n,a,i,p,l,u);a.firstChild&&(vt(a.firstChild),a.replaceChild(c,a.firstChild))}else{var c=ct(e,r,t,n,a,i,p,l,u),m=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&(vt(a.firstChild),a.replaceChild(c,a.firstChild)),m&&ka(m,e,u&&u.currentSettings),Hn(l,a)}za(r,n)}function fe(e,r,t){var n=Ge(e);if(!n.length)return;var a=(t||[]).filter(function(A){return Ge(A).length>0}),i=a.findIndex(function(A){return A===e||A.id===e.id});i===-1&&(a.unshift(e),i=0);var o=n.findIndex(function(A){return A.url===r});o<0&&(o=0);var p=document.createElement("div");p.className="renuvex-pr-modal-overlay";var l=document.createElement("div");l.className="renuvex-pr-modal";var u=!1,c=null,m=Vr(),d=Ee(),v=Ur(),k=Yr(),s={currentReview:e,currentSettings:_},x=null;function g(A){var E=A&&A.detail&&A.detail.settings;if(!(E&&E===x)){x=E||null,s.currentSettings=E||_;var T=l.querySelector(".renuvex-pr-modal-right");!T||!s.currentReview||ka(T,s.currentReview,s.currentSettings)}}function y(){u||(u=!0,window.removeEventListener(Ie,g),wa(c&&c.host,h,y,v,m,d))}function h(A){if(A.key==="Escape"){w();return}Dr(A,p,c&&c.root)}function w(){u||(u=!0,window.removeEventListener(Ie,g),wa(c&&c.host,h,y,v,m,d),jr(k))}document.addEventListener("keydown",h),window.addEventListener("popstate",y),window.addEventListener(Ie,g),p.onclick=function(){w()},l.onclick=function(A){A.stopPropagation()},l.appendChild(ct(e,i,o,a,l,w,null,p,s)),l.appendChild(Un(e)),za(i,a);var b=document.createElement("div");b.className="renuvex-pr-modal-wrap",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),b.appendChild(l);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var S=J(he);S&&z.appendChild(S),z.setAttribute("aria-label","Kapat"),z.onclick=function(A){A.stopPropagation(),w()},b.appendChild(z),p.appendChild(b),c=Fr(),We(c.root,je+Ve+Or),c.root.appendChild(p),Re(c.root),pe(b)}function lr(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(n){(n.key==="Enter"||n.key===" "||n.key==="Spacebar")&&(n.preventDefault(),r())})}var wt={};Ce(wt,{css:()=>bi,meta:()=>hi,render:()=>yi});function Ke(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;Ae(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var p=5;p>=1;p--){var l=r[p-1]||0,u=t>0?Math.round(l/t*100):0,c=a===p,m=l>0,d=U(_&&_.countLabel,"Yorum"),v=document.createElement("div");v.className="renuvex-pr-bar-row"+(m?"":" renuvex-pr-bar-empty")+(c?" renuvex-pr-bar-active":"")+(a&&!c?" renuvex-pr-bar-dimmed":""),m?(v.setAttribute("role","button"),v.setAttribute("tabindex","0"),v.setAttribute("aria-pressed",c?"true":"false"),v.setAttribute("aria-label",p+" y\u0131ld\u0131z, "+l.toLocaleString("tr-TR")+" "+d+", "+(c?"filtreyi kald\u0131r":"filtrele"))):v.setAttribute("aria-label",p+" y\u0131ld\u0131z, 0 "+d);for(var k="",s=1;s<=5;s++){var x=s<=p;k+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(x?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+oe(x?"full":"outline")+"</span>"}v.innerHTML='<span class="renuvex-pr-bar-label">'+k+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+l.toLocaleString("tr-TR")+")</span>",m&&(function(g){function y(){i(g)}v.onclick=y,v.onkeydown=function(h){(h.key==="Enter"||h.key===" "||h.key==="Space"||h.key==="Spacebar")&&(h.preventDefault(),y())}})(p),o.appendChild(v)}return o}var Ea="data-renuvex-pr-dismiss-gesture",Fe=[],Sa=!1,Wr=!1,pr=[],Xe=null;function Ca(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function mt(){for(var e=Fe.length-1;e>=0;e--){var r=Fe[e].element;r&&r.isConnected===!1&&Fe.splice(e,1)}return Fe}function Vn(e){!e||typeof e.setAttribute!="function"||(pr.indexOf(e)===-1&&pr.push(e),e.setAttribute(Ea,""))}function Ta(){for(var e=0;e<pr.length;e++){var r=pr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Ea)}pr=[],Xe&&typeof clearTimeout=="function"&&clearTimeout(Xe),Xe=null}function Dn(e){if(Wr){Wr=!1,Ta(),e.preventDefault(),e.stopPropagation();return}for(var r=mt(),t=!1,n=r.length-1;n>=0;n--){var a=r[n];Ca(e,a.trigger)||Ca(e,a.element)||a.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Yn(e){if(e.key==="Escape")for(var r=mt(),t=r.length-1;t>=0;t--)r[t].close()}function Aa(){Sa||typeof document=="undefined"||(document.addEventListener("click",Dn,!0),document.addEventListener("keydown",Yn),Sa=!0)}function jn(e){Aa(),Wr=!0,Vn(e),Xe&&typeof clearTimeout=="function"&&clearTimeout(Xe),typeof setTimeout=="function"&&(Xe=setTimeout(function(){Wr=!1,Ta()},700))}function ft(e){jn(e)}function qr(e){Aa();var r={trigger:e.trigger,element:e.element,close:e.close};return Fe.push(r),{unregister:function(){var t=Fe.indexOf(r);t!==-1&&Fe.splice(t,1)},notifyOpening:function(){for(var t=mt(),n=0;n<t.length;n++)t[n]!==r&&t[n].close()}}}function ne(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var p=document.createElement("button");p.className="renuvex-pr-write-btn",p.textContent=U(_&&_.writeButtonText,"Yorum Yap"),p.onclick=a,o.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var c=_&&_.filterIcon||"lines";u.innerHTML=le(Xt(c));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var d=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function k(){return r&&r.parentNode||r||null}function s(h,w){if(!(w===!0||!h)){if(h.type==="touchstart"){ft(k());return}if(h.type==="pointerdown"){var b=h.pointerType||"";b&&b!=="mouse"&&ft(k());return}}}function x(h){var w=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var b=h&&(h.restoreFocus===!0||h.restoreFocus==="auto"&&Ee());if(w&&b)try{u.focus({preventScroll:!0})}catch(z){try{u.focus()}catch(S){}}return w}function g(){y.notifyOpening(),m.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var h=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");h&&requestAnimationFrame(function(){try{h.focus({preventScroll:!0})}catch(w){try{h.focus()}catch(b){}}})}d.forEach(function(h){var w=h[2],b=w?n:!n&&(t||"newest")===h[0],z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(b?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=h[1];var S=!1;function A(E,T){E&&(E.preventDefault(),E.stopPropagation()),!S&&(S=!0,v=!0,s(E,T),x({restoreFocus:T}),i(h[0],w),setTimeout(function(){S=!1,v=!1},0))}z.addEventListener("pointerdown",function(E){E.button!==void 0&&E.button!==0||E.pointerType!=="mouse"&&A(E,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(E){A(E,!1)},{passive:!1}),z.addEventListener("keydown",function(E){(E.key==="Enter"||E.key===" ")&&A(E,!0)}),z.onclick=function(E){A(E,!1)},m.appendChild(z)}),u.onclick=function(){m.classList.contains("renuvex-pr-open")?x({restoreFocus:"auto"}):g()},l.addEventListener("keydown",function(h){h.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(h.stopPropagation(),x({restoreFocus:!0}))}),l.addEventListener("focusout",function(h){if(m.classList.contains("renuvex-pr-open")&&!v){var w=h.relatedTarget;w&&l.contains(w)||x()}});var y=qr({trigger:l,element:m,close:x});return l.appendChild(u),l.appendChild(m),o.appendChild(l),o}var Pa=`
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
    min-height:76px;
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
`;function Ma(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,n=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,a=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",o.appendChild(p);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var u=J(he);u&&l.appendChild(u),o.appendChild(l);var c=!1,m=null,d=null,v=!1;function k(){pe(i)}function s(S){Dr(S,i,m&&m.root)}function x(){if(!c){if(c=!0,document.removeEventListener("keydown",g),i.removeEventListener("click",y),l.removeEventListener("click",x),v)pe(d);else{var S=m&&m.root?m.root.activeElement:null;if(S&&typeof S.blur=="function")try{S.blur()}catch(A){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){m?(Er(m.root),m.host&&m.host.parentNode&&m.host.parentNode.removeChild(m.host)):i.parentNode&&i.parentNode.removeChild(i),Hr();try{r()}catch(A){}},200)}}function g(S){if(S.key==="Escape"){x();return}s(S)}function y(S){S.target===i&&a&&x()}document.addEventListener("keydown",g),i.addEventListener("click",y),l.addEventListener("click",x);function h(S){d=t||Vr(),v=n===null?Ee():n,S&&p.appendChild(S),m=Fr(),We(m.root,je+Ve+Pa),m.root.appendChild(i),Re(m.root),Ur(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),k()})}var w=null,b=null;function z(S,A){if(A=A||"error",w){try{w.remove()}catch(E){}w=null}b&&(clearTimeout(b),b=null),w=document.createElement("div"),w.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+A,w.textContent=S,o.appendChild(w),b=setTimeout(function(){w&&(w.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(w){try{w.remove()}catch(E){}w=null}},300))},4e3)}return{open:h,close:x,content:p,setAllowOutsideClose:function(S){a=!!S},setStepAttr:function(S){o.setAttribute("data-step",String(S))},showToast:z}}var xt=4;function Je(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Na(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<xt&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}function _a(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",p.setAttribute("aria-label","Geri"),p.innerHTML=le(De)+"<span>Geri</span>",p.addEventListener("click",function(){n()}),o.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-footer-progress";for(var u=[],c=0;c<xt;c++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",l.appendChild(m),u.push(m)}o.appendChild(l);var d=document.createElement("button");d.type="button";var v=null;function k(x){v&&d.removeEventListener("click",v),v=x,x&&d.addEventListener("click",x)}o.appendChild(d);function s(x,g){var y=r.indexOf(x)!==-1,h=t.indexOf(x)!==-1,w=g&&(g.images&&g.images.length>0||g.pendingImages&&g.pendingImages.length>0||!!g.videoUpload);if(y)x===2&&w?(d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Devam Et"),d.innerHTML="Devam Et",k(function(){i()})):(d.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",d.setAttribute("aria-label","Atla"),d.innerHTML="<span>Atla</span>",k(function(){a()})),d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),d.style.visibility="",d.tabIndex=0;else if(h){d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Sonraki"),d.innerHTML="Sonraki",d.style.visibility="",d.tabIndex=0;var b=Je(x,g);d.disabled=!b,d.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!b),k(function(){d.disabled||i()})}else d.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",d.innerHTML="",d.style.visibility="hidden",d.tabIndex=-1,d.disabled=!0,k(null)}return{el:o,update:function(x,g){u.forEach(function(h,w){w+1<=x?h.classList.add("renuvex-pr-fwizard-progress-seg-active"):h.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var y=x<=1;p.style.visibility=y?"hidden":"",p.style.pointerEvents=y?"none":"",p.tabIndex=y?-1:0,s(x,g)},setNextDisabled:function(x){d.classList.contains("renuvex-pr-fwizard-cta-btn")&&(d.disabled=!!x,d.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!x))},setThanksState:function(x){p.style.visibility="hidden",l.style.visibility="hidden",d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Devam Et"),d.innerHTML="Devam Et",d.style.visibility="",d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),k(x)}}}var Wn={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ue(e){var r=_&&_[e];return!r&&e==="formStepMediaTitle"&&(r=_&&_.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=_&&_.formStepPhotosSubtitle),U(r,Wn[e])}function La(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ue("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var p=ir(_||{});Ae(p);var l=[];function u(x){l.forEach(function(g,y){var h=y<x;g.classList.toggle("renuvex-pr-fwizard-star-active",h),g.setAttribute("aria-checked",y+1===x?"true":"false"),g.innerHTML=h?oe("full"):oe("outline")})}function c(x){e.set({rating:x}),u(x)}function m(x){var g=l[x-1];if(g)try{g.focus()}catch(y){}}function d(x,g){g&&typeof g.preventDefault=="function"&&g.preventDefault(),g&&typeof g.stopPropagation=="function"&&g.stopPropagation(),!n&&(n=!0,c(x),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var v=1;v<=5;v++)(function(x){var g=document.createElement("button");g.type="button",g.className="renuvex-pr-fwizard-star",g.setAttribute("role","radio"),g.setAttribute("aria-label",x+" y\u0131ld\u0131z"),g.innerHTML=oe("outline"),g.addEventListener("mouseenter",function(){u(x)}),g.addEventListener("mouseleave",function(){u(e.get().rating)}),g.addEventListener("pointerdown",function(y){y.button&&y.button!==0||d(x,y)}),typeof window!="undefined"&&!window.PointerEvent&&g.addEventListener("touchstart",function(y){d(x,y)},{passive:!1}),g.addEventListener("mousedown",function(y){window.PointerEvent||d(x,y)}),g.addEventListener("keydown",function(y){if(y.key==="Enter"||y.key===" "){d(x,y);return}var h=0;y.key==="ArrowRight"||y.key==="ArrowUp"?h=Math.min(5,x+1):y.key==="ArrowLeft"||y.key==="ArrowDown"?h=Math.max(1,x-1):y.key==="Home"?h=1:y.key==="End"&&(h=5),h&&(y.preventDefault(),c(h),m(h))}),g.addEventListener("click",function(y){d(x,y)}),l.push(g),o.appendChild(g)})(v);u(e.get().rating);var k=null,s=function(x){var g=x&&x.detail&&x.detail.settings;g&&g===k||(k=g||null,p=ir(g||_||{}),u(e.get().rating))};return window.addEventListener(Ie,s),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Ie,s)}}}var Gr=3,qn=10*1024*1024;function Kr(e,r){r=r||{};var t=!1,n=r.hideAddButton===!0,a=document.createElement("div");if(a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ue("formStepPhotosTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-subtitle",o.textContent=ue("formStepPhotosSubtitle"),a.appendChild(o)}var p=document.createElement("div");p.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&p.classList.add("renuvex-pr-fwizard-photo-card--embedded");var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle");var u=document.createElement("input");u.type="file",u.accept="image/*",u.multiple=!0,u.style.display="none",n||p.appendChild(l),p.appendChild(u);var c=document.createElement("div");c.className="renuvex-pr-fwizard-photo-previews",c.setAttribute("aria-live","polite"),p.appendChild(c),a.appendChild(p);var m=r.revokeBlobUrl||function(h){h&&typeof h=="string"&&h.startsWith("blob:")&&URL.revokeObjectURL(h)},d=r.blobMap||{},v=r.urlToFinger||{};function k(){if(!t){var h=e.get().images||[],w=e.get().pendingImages||[],b=h.map(function(z){return{url:z,isPending:!1}}).concat(w.map(function(z){return{url:z.url,file:z.file,isPending:!0,error:z.error}}));c.innerHTML="",b.forEach(function(z){var S=d[z.url]||z.url,A=s(z,S);c.appendChild(A)}),g()}}function s(h,w){var b=document.createElement("div");b.className="renuvex-pr-fwizard-photo-thumb";var z=document.createElement("img");z.src=w,z.alt="",z.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",b.appendChild(z);var S=document.createElement("div");S.className="renuvex-pr-fwizard-photo-loading",S.style.display="none",b.appendChild(S);var A=document.createElement("button");A.type="button",A.className="renuvex-pr-fwizard-photo-remove",A.setAttribute("aria-label","Kald\u0131r");var E=J(he);return E&&A.appendChild(E),b.appendChild(A),x(b,h,w),b}function x(h,w,b){var z=h.querySelector("img");z.src!==b&&(z.src=b);var S=h.querySelector(".renuvex-pr-fwizard-photo-loading");if(w.isPending&&w.error){S.style.display="flex",S.textContent="";var A=document.createElement("span");A.className="renuvex-pr-upload-error",A.textContent="\u2717 "+w.error,S.appendChild(A)}else S.style.display="none",S.textContent="";var E=h.querySelector(".renuvex-pr-fwizard-photo-remove");E.onclick=function(){var T=v[w.url]||(w.file?w.file.name+"_"+w.file.size:null),f=d[w.url],C={};T&&(C.fingerprints=(e.get().fingerprints||[]).filter(function(M){return M!==T})),w.isPending?C.pendingImages=(e.get().pendingImages||[]).filter(function(M){return M.url!==w.url}):C.images=(e.get().images||[]).filter(function(M){return M!==w.url}),e.set(C),m(w.url),m(f),delete v[w.url],f&&delete v[f],d[w.url]&&delete d[w.url]}}function g(){var h=(e.get().images||[]).length,w=(e.get().pendingImages||[]).length,b=h+w,z=b>=Gr;p.classList.toggle("renuvex-pr-fwizard-photo-card--compact",b>0),n||(l.innerHTML=b>0?le(Zt):le(Ar)+"<span>Foto\u011Fraf Ekle</span>"),z?(n||(l.style.display="none"),l.disabled=!0,u.disabled=!0):(n||(l.style.display="flex"),l.disabled=!1,u.disabled=!1,l.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){u.disabled||u.click()}),u.onchange=async function(h){var w=(e.get().images||[]).length+(e.get().pendingImages||[]).length,b=Array.from(h.target.files).slice(0,Gr-w);u.value="";var z=(e.get().pendingImages||[]).length,S=e.get().images||[],A=S.length;if(b.length!==0){for(var E=[],T=[],f=0;f<b.length;f++){var C=b[f],M=C.name+"_"+C.size,P=(e.get().fingerprints||[]).some(function(I){return I===M})||E.some(function(I){return I.file.name+"_"+I.file.size===M});if(!P){if(C.size>qn){var N="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(N,"error"):alert(N);continue}var L=URL.createObjectURL(C);v[L]=M,E.push({url:L,file:C,error:null}),T.push({url:L,file:C});var B=(e.get().fingerprints||[]).slice();B.push(M),e.set({fingerprints:B})}}if(E.length!==0){var R=(e.get().pendingImages||[]).concat(E),H=async function(){for(var I=0;I<T.length;I++){var V=T[I],W=V.file,F=V.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var K=(e.get().pendingImages||[]).filter(function(q){return q.url!==F}),se=(e.get().images||[]).slice();se.push(F),e.set({pendingImages:K,images:se});continue}try{var Q=await we(ge+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ie})});if(!Q.ok)throw Q.status===429?new Error("rate_limit"):new Error("sign failed");var O=await Q.json();if(!O.folder)throw new Error("sign folder missing");var Y=new FormData;Y.append("file",W),Y.append("api_key",O.api_key),Y.append("timestamp",O.timestamp),Y.append("signature",O.signature),Y.append("folder",O.folder);var ve=await fetch("https://api.cloudinary.com/v1_1/"+O.cloud_name+"/image/upload",{method:"POST",body:Y}),j=await ve.json();if(j.secure_url&&Mr(j.secure_url)){var de=(e.get().pendingImages||[]).some(function(q){return q.url===F});if(!de)continue;d[j.secure_url]=F,v[j.secure_url]=v[F];var fr=(e.get().pendingImages||[]).filter(function(q){return q.url!==F}),tr=(e.get().images||[]).slice();tr.push(j.secure_url),e.set({pendingImages:fr,images:tr});try{we(ge+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ie,secureUrl:j.secure_url,metadata:{assetId:j.asset_id,publicId:j.public_id,version:j.version,resourceType:j.resource_type,format:j.format,width:j.width,height:j.height,bytes:j.bytes,signature:j.signature}})}).catch(function(){})}catch(q){}}else throw new Error("invalid image url")}catch(q){console.error("[renuvex-pr] Image upload failed:",q);var xe=q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(xe,"error");var D=(e.get().pendingImages||[]).map(function(ee){return ee.url===F?{url:ee.url,file:ee.file,error:xe}:ee});e.set({pendingImages:D})}}};if(A===0&&z===0){t=!0;var G=!r.canNavigate||r.canNavigate();G&&e.goNext()}e.set({pendingImages:R}),H()}}};var y=e.onChange(k);return k(),{el:a,openPicker:function(){u.disabled||u.click()},destroy:function(){t=!0,u.onchange=null,y&&y()}}}var Gn=150*1024*1024,Kn=2,Xn=60,Oa=8192,Ua=5,Jn=["video/mp4","video/quicktime"],Zn="renuvex_pr_video_upload_",Ha="renuvex_pr_video_cancel_",ur=null,Ra=!1,$n={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},Qn={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},$e=class extends Error{constructor(r,t,n){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=n||null}};function Va(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:$n[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:Qn[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function Da(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function gt(e){return new Promise(function(r){setTimeout(r,e)})}function Ze(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function sr(e){return Math.max(0,Math.round(Ze()-e))}function ei(e,r){return new Promise(function(t,n){var a=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(a),r&&r.removeEventListener("abort",o),n(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function ht(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function bt(e,r){return Zn+ie+"_"+e+"_"+ht(r)}function Ya(e,r){try{var t=window.sessionStorage.getItem(bt(e,r)),n=t?JSON.parse(t):null;return!n||typeof n.token!="string"||!n.expiresAt||new Date(n.expiresAt).getTime()<=Date.now()?null:n}catch(a){return null}}function ri(e,r,t){try{window.sessionStorage.setItem(bt(e,r),JSON.stringify(t))}catch(n){}}function vr(e,r){try{window.sessionStorage.removeItem(bt(e,r))}catch(t){}}function ti(e,r){return Ha+ie+"_"+e+"_"+ht(r)}function ai(e,r,t,n){if(!(!e||!r||!t)){var a={token:e,productId:r,expiresAt:n||null};try{window.sessionStorage.setItem(ti(r,t),JSON.stringify(a))}catch(i){}}}function ni(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(Ha+ie+"_")!==0)){var n=window.sessionStorage.getItem(t),a=n?JSON.parse(n):null;if(!a||typeof a.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:a.token})}}}catch(i){}return e}function Ia(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function Qe(e,r,t){var n=await we(ge+e,r,t||2e4),a=await n.json().catch(function(){return{}});if(!n.ok){var i=Number(n.headers.get("Retry-After"));throw new $e(a.error||"video_request_failed",n.status,Number.isFinite(i)&&i>0?i:null)}return a.data||{}}async function dr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await Qe("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:sr(r.startedAt),finalStatus:t})},4e3)}catch(n){}}async function ii(e){try{return await Qe("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Ia(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Ia(e.key),!0):!1}}function Xr(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():ur||(ur=(async function(){for(var e=ni(),r=0;r<e.length;r+=1)await ii(e[r])})().finally(function(){ur=null}),ur)}function Jr(){typeof window=="undefined"||Ra||(Ra=!0,window.addEventListener("online",function(){Xr()}),Xr())}async function oi(){var e=await import("./upchunk-QJXCGVJW.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function Ba(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}async function li(e){var r=await oi();return new Promise(function(t,n){var a=!1,i=null;function o(l){a||(a=!0,e.signal&&e.signal.removeEventListener("abort",p),l?n(l):t())}function p(){try{i&&i.abort()}catch(l){}o(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return n(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",p,{once:!0})}i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||Oa,attempts:e.chunkAttempts||Ua,dynamicChunkSize:!0}),i.on("attempt",function(){e.onStatus("uploading")}),i.on("attemptFailure",function(l){var u=l&&l.detail;e.onAttemptFailure&&e.onAttemptFailure(Ba(u)),e.onStatus("upload_retrying")}),i.on("progress",function(l){var u=Number(l&&l.detail);if(Number.isFinite(u)){var c=Math.min(95,Math.max(0,Math.round(u*.95)));Number.isFinite(e.minProgress)&&(c=Math.max(e.minProgress,c)),e.onProgress(c)}}),i.on("offline",function(){e.onStatus("uploading_offline")}),i.on("online",function(){e.onStatus("uploading")}),i.on("error",function(l){var u=l&&l.detail,c=u&&typeof u.message=="string"?u.message:"video_upload_failed";e.onUploadError&&e.onUploadError(Ba(u)),o(new Error(c))}),i.on("success",function(){e.onProgress(95),o()})})}function pi(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function Fa(e,r,t){for(var n=Date.now(),a=n+600*1e3,i=0;Date.now()<a;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-n;try{var p=await Qe("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":p.status||"processing"),p.status==="ready")return p;if(p.status==="failed"||p.status==="aborted")throw new $e(p.errorCode||"video_processing_failed",409,null)}catch(l){if(r.aborted||l instanceof $e&&l.status===409||Da(l)||(i+=1,i>=3))throw l}await ei(pi(o),r)}throw new $e("video_processing_delayed",0,null)}async function ui(e){for(var r=null,t=1;t<=3;t+=1)try{return await Qe("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(n){if(Da(n))return null;r=n,t<3&&await gt(400*t)}throw r||new Error("video_status_failed")}async function di(e,r,t,n){for(var a=10;a<=90;a+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(a),await gt(120)}return n("processing"),await gt(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function ja(e){return!e||Jn.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>Gn?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function Wa(e){return new Promise(function(r){var t=URL.createObjectURL(e),n=document.createElement("video"),a=!1;function i(o){if(!a){a=!0,n.removeAttribute("src");try{n.load()}catch(p){}URL.revokeObjectURL(t),r(o)}}n.preload="metadata",n.onloadedmetadata=function(){i(Number.isFinite(n.duration)?n.duration:null)},n.onerror=function(){i(null)},n.src=t,setTimeout(function(){i(null)},8e3)})}function qa(e){return e===null?{ok:!0}:e<Kn||e>Xn?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function Ga(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return di(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:Ze(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(s){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=s||"upload_attempt_failed")}function n(){vr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}Jr(),await Xr();var a=Ya(e.productId,e.file),i=a&&a.token,o=a;if(i){var p=await ui(i);if(!p)n(),i=null,o=null;else{if(p.status==="ready")return e.onToken&&e.onToken(i),e.onProgress(100),vr(e.productId,e.file),await dr(i,r,"ready"),Object.assign({token:i},p);if(p.status==="uploaded"||p.status==="processing"){e.onToken&&e.onToken(i),e.onStatus("processing");var l=Ze(),u=await Fa(i,e.signal,e.onStatus);return r.processingPollMs=sr(l),vr(e.productId,e.file),e.onProgress(100),await dr(i,r,"ready"),Object.assign({token:i},u)}else(p.status==="failed"||p.status==="aborted")&&(n(),i=null,o=null)}i&&(!o||typeof o.uploadUrl!="string"||!o.uploadUrl)&&(n(),i=null,o=null)}if(!i){var c=await Qe("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ie,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:ht(e.file)})});i=c.token,o=c,ri(e.productId,e.file,c)}e.onToken&&e.onToken(i),r.chunkSizeKb=o.chunkSize||Oa,r.chunkAttempts=o.chunkAttempts||Ua,e.onStatus("uploading");try{var m=Ze();await li({uploadUrl:o.uploadUrl,file:e.file,chunkSize:o.chunkSize,chunkAttempts:o.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=sr(m),e.onStatus("processing");var d=Ze();await Qe("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:i})},3e4),r.completeMs=sr(d);var v=Ze(),k=await Fa(i,e.signal,e.onStatus);return r.processingPollMs=sr(v),vr(e.productId,e.file),e.onProgress(100),await dr(i,r,"ready"),Object.assign({token:i},k)}catch(s){throw e.signal&&e.signal.aborted?(await dr(i,r,"aborted"),s):(await dr(i,r,"failed"),s)}}async function Zr(e,r,t){var n=r&&t?Ya(r,t):null;e&&r&&t&&ai(e,r,t,n&&n.expiresAt),r&&t&&vr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(Jr(),await Xr())}function si(e){return e?e.error?e.error:e.status==="upload_retrying"?"Ba\u011Flant\u0131 yeniden deneniyor...":e.status==="uploading_offline"?"Ba\u011Flant\u0131 bekleniyor...":e.status==="processing"?"Video i\u015Fleniyor...":e.status==="processing_slow"?"Video haz\u0131rlan\u0131yor. Bu i\u015Flem biraz s\xFCrebilir.":e.status==="ready"?"Video haz\u0131r":"Video haz\u0131rlan\u0131yor":""}function Ka(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function Xa(e,r){r=r||{};var t=!1,n=null,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent=ue("formStepMediaTitle"),i.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=ue("formStepMediaSubtitle"),i.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-media-card";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",u.setAttribute("aria-label","Foto\u011Fraf ekle"),u.innerHTML=le(Ar)+"<span>Foto\u011Fraf Ekle</span>";var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",c.setAttribute("aria-label","Video ekle"),c.innerHTML=le(Pr)+"<span>Video Ekle</span>",l.appendChild(u),l.appendChild(c);var m=document.createElement("div");m.className="renuvex-pr-fwizard-media-content",l.appendChild(m),i.appendChild(l);var d=document.createElement("input");d.type="file",d.accept="video/mp4,video/quicktime,.mp4,.mov",d.style.display="none",i.appendChild(d);function v(){var f=e.get();return(f.images||[]).length>0||(f.pendingImages||[]).length>0}function k(){var f=e.get();return(f.images||[]).length+(f.pendingImages||[]).length}function s(){return e.get().videoUpload||null}function x(){if(!a){m.innerHTML="";return}a.retry.onclick=null,m.innerHTML="",a=null}function g(){n&&(n.destroy&&n.destroy(),n=null)}function y(f){g(),m.innerHTML="";var C=Ka(f),M=document.createElement("div");M.className=C==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":C==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var P=null,N=null,L=null,B=null,R=null,H=document.createElement("button");if(H.type="button",H.className="renuvex-pr-fwizard-video-retry",H.textContent="Tekrar Dene",C==="ready"){var G=f.posterUrl||f.localUrl||"";G&&G!==f.localUrl?(P=document.createElement("img"),P.alt="",P.src=G):(P=document.createElement("video"),P.muted=!0,P.playsInline=!0,P.preload="metadata",P.src=f.localUrl||""),P.className="renuvex-pr-fwizard-video-preview",M.appendChild(P)}else C==="busy"?(B=document.createElement("div"),B.className="renuvex-pr-fwizard-video-uploading-status",B.setAttribute("role","status"),B.setAttribute("aria-live","polite"),B.innerHTML='<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>Video haz\u0131rlan\u0131yor</span>',M.appendChild(B)):(N=document.createElement("div"),N.className="renuvex-pr-fwizard-video-details",L=document.createElement("div"),L.className="renuvex-pr-fwizard-video-name",L.textContent=f.file?f.file.name:"Video",B=document.createElement("div"),B.className="renuvex-pr-fwizard-video-status renuvex-pr-fwizard-video-status--error",B.setAttribute("role","alert"),B.setAttribute("aria-live","assertive"),N.appendChild(L),N.appendChild(B),M.appendChild(N));var I=document.createElement("button");I.type="button",I.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",I.setAttribute("aria-label","Videoyu kald\u0131r");var V=J(he);V&&I.appendChild(V);function W(F){F&&(F.preventDefault(),F.stopPropagation()),S()}I.addEventListener("pointerdown",W),I.addEventListener("click",W),C!=="busy"&&M.appendChild(I),m.appendChild(M),a={mode:C,card:M,preview:P,previewUrl:C==="ready"&&(f.posterUrl||f.localUrl)||"",details:N,name:L,status:B,progress:R,retry:H,remove:I}}function h(){if(!t){var f=s();if(!f){x();return}var C=Ka(f),M=C==="ready"&&(f.posterUrl||f.localUrl)||"";(!a||a.mode!==C||a.previewUrl!==M)&&y(f),a.name&&(a.name.textContent=f.file?f.file.name:"Video"),a.status&&C==="failed"&&(a.status.className="renuvex-pr-fwizard-video-status renuvex-pr-fwizard-video-status--error",a.status.setAttribute("role","alert"),a.status.textContent=si(f));var P=f.status==="uploading"||f.status==="upload_retrying"||f.status==="uploading_offline";a.progress&&(a.progress.hidden=!P,a.progress.value=f.progress||0);var N=C==="failed"&&!!(f.error&&f.file&&f.retryable!==!1);a.retry.onclick=N?function(){z(f.file,f.localUrl,f.durationMs)}:null,N&&a.details&&!a.retry.isConnected?a.details.appendChild(a.retry):!N&&a.retry.isConnected&&a.retry.remove()}}function w(){var f=v(),C=k()>=Gr,M=!!s(),P=f||M;u.disabled=M||C,c.disabled=f||M,l.classList.toggle("renuvex-pr-fwizard-media-card--has-media",P),l.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",M),u.classList.toggle("renuvex-pr-fwizard-media-action--active",f),c.classList.toggle("renuvex-pr-fwizard-media-action--active",M)}function b(f){var C=s();if(C){var M=Object.keys(f),P=M.some(function(N){return C[N]!==f[N]});P&&e.set({videoUpload:Object.assign({},C,f)})}}async function z(f,C,M){var P=s(),N=!!(C&&P&&P.file===f),L=N?Math.max(0,Math.min(95,Number(P.progress)||0)):0,B=N?(Number(P.retryClicks)||0)+1:0,R=ja(f);if(!R.ok){r.showToast&&r.showToast(R.message,"error");return}var H=C||URL.createObjectURL(f),G=new AbortController;e.set({videoUpload:{file:f,localUrl:H,token:N&&P.token||null,status:"uploading",progress:L,durationMs:I===null?null:Math.round(I*1e3),error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:B,controller:G}}),!N&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var I=M!==void 0?Number.isFinite(M)?M/1e3:null:await Wa(f),V=qa(I);if(!V.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:V.message});var W=await Ga({file:f,productId:e.get().productId,signal:G.signal,minProgress:L,retryClicks:B,onToken:function(K){b({token:K})},onProgress:function(K){b({progress:K})},onStatus:function(K){b({status:K})},onSessionReset:function(){b({token:null,progress:0})}});if(W.previewOnly&&W.posterUrl&&W.posterUrl!==H)try{URL.revokeObjectURL(W.posterUrl)}catch(K){}b({token:W.token,status:"ready",progress:100,posterUrl:W.previewOnly?H:W.posterUrl,durationMs:W.durationMs||(I===null?null:Math.round(I*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),N&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(K){if(G.signal.aborted)return;var F=Va(K);K&&K.code==="invalid_video_duration"&&(F={code:"invalid_video_duration",message:K.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),b({status:"failed",error:F.message,errorCode:F.code,retryable:F.retryable,retryAfterSec:F.retryAfterSec,controller:null}),r.showToast&&r.showToast(F.message,"error")}}function S(){var f=s();f&&(f.controller&&f.controller.abort(),Zr(f.token,e.get().productId,f.file),r.revokeBlobUrl&&r.revokeBlobUrl(f.localUrl),e.set({videoUpload:null}))}function A(f){if(n){f&&n.openPicker&&n.openPicker();return}a=null,m.innerHTML="",n=Kr(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,embeddedMedia:!0}),m.appendChild(n.el),f&&n.openPicker&&n.openPicker()}u.onclick=function(){u.disabled||A(!0)},c.onclick=function(){c.disabled||(g(),m.innerHTML="",d.click())},d.onchange=function(){var f=d.files&&d.files[0];d.value="",f&&z(f,null,void 0)};var E=!!s(),T=e.onChange(function(){w();var f=!!s();(f||E)&&h(),E=f});return w(),v()&&A(!1),s()&&h(),{el:i,destroy:function(){t=!0,u.onclick=null,c.onclick=null,d.onchange=null,n&&n.destroy&&n.destroy(),T&&T()}}}var yt=2e3,vi=60;function Ja(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=ue("formStepContentTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=vi,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var p=document.createElement("textarea");p.className="renuvex-pr-fwizard-textarea",p.placeholder="Deneyiminizi anlat\u0131n\u2026",p.maxLength=yt,p.rows=6,p.setAttribute("aria-label","Yorum"),p.value=e.get().comment||"",i.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-char-counter",l.setAttribute("aria-live","polite"),i.appendChild(l);function u(){var m=p.value.length;l.textContent=m+"/"+yt,l.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=yt)}function c(){return Je(3,e.get())}return p.addEventListener("input",function(){e.set({comment:p.value}),u(),t(c())}),n.appendChild(i),u(),setTimeout(function(){t(c())},0),{el:n,destroy:function(){}}}var ci=40;function Za(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ue("formStepAuthorTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var p=document.createElement("div");p.className="renuvex-pr-fwizard-field";var l=document.createElement("label");l.className="renuvex-pr-fwizard-label",l.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=ci,u.setAttribute("aria-required","true"),u.value=e.get().author||"",p.appendChild(l),p.appendChild(u),o.appendChild(p);var c=document.createElement("div");c.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var d=document.createElement("input");d.type="email",d.className="renuvex-pr-fwizard-input",d.setAttribute("autocomplete","email"),d.value=e.get().email||"",c.appendChild(m),c.appendChild(d),o.appendChild(c);var v=document.createElement("div");v.className="renuvex-pr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(v);var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg",k.setAttribute("role","alert"),k.setAttribute("aria-live","assertive"),o.appendChild(k);var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-submit-btn",s.textContent="G\xF6nder",o.appendChild(s),a.appendChild(o);function x(){return Je(4,e.get())}function g(){var b=!x(),z=(e.get().pendingImages||[]).length,S=z>0,A=e.get().videoUpload,E=!!(A&&A.status==="failed"),T=!!(A&&A.status!=="ready"&&A.status!=="failed");S||T||E?(s.disabled=!0,s.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),s.textContent=E?"Video Y\xFCklenemedi":T?"Video Haz\u0131rlan\u0131yor...":"Foto\u011Fraflar Y\xFCkleniyor..."):(s.disabled=b,s.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",b),s.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),g(),t(x())}),d.addEventListener("input",function(){e.set({email:d.value})}),g(),setTimeout(function(){t(x())},0);function y(){k.textContent=""}function h(b){y();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=b||"",k.appendChild(z)}s.onclick=async function(){if(!s.disabled){var b=e.get(),z=(b.author||"").trim(),S=(b.comment||"").trim();if(d.value.trim()&&!d.checkValidity()){d.reportValidity();return}if(!z){h("Gerekli alan");return}if(!b.rating){h("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}s.disabled=!0,s.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var A=s.textContent;if(s.textContent="G\xF6nderiliyor\u2026",y(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){b.videoUpload&&b.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n()},600);return}try{var E=$t(window.location.href),T=b.productName||null,f=await we(ge+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ie,productId:b.productId||null,slug:E||null,productName:T,author:z,title:(b.title||"").trim()||null,comment:S||null,rating:b.rating,images:b.videoUpload?[]:b.images||[],videoToken:b.videoUpload&&b.videoUpload.status==="ready"?b.videoUpload.token:null})},15e3);if(f.ok)b.videoUpload&&b.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n();else{var C=await f.json().catch(function(){return{}});throw new Error(C.error||"Yorum kaydedilemedi.")}}catch(N){var M=N&&(N.name==="AbortError"||/signal/i.test(N.message||"")),P=M?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":N.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):h(P),s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),s.textContent=A}}};var w=e.onChange(g);return{el:a,destroy:function(){s.onclick=null,w&&w()}}}function mi(e,r,t){if(t=t||{},e===1)return La(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return Xa(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Kr(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Ja(r,{onValidityChange:t.onValidityChange});if(e===4)return Za(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function $a(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Qa(e){e=e||{},Jr();var r=Na({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:_&&_.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},n={},a={};function i(T){if(!(!T||typeof T!="string"||!T.startsWith("blob:")||a[T])){a[T]=!0;try{URL.revokeObjectURL(T)}catch(f){}}}function o(){Object.keys(n).forEach(function(f){i(f)}),Object.keys(t).forEach(function(f){i(t[f])});var T=r.get();(T.pendingImages||[]).forEach(function(f){i(f&&f.url)}),(T.images||[]).forEach(function(f){i(f)}),T.videoUpload&&i(T.videoUpload.localUrl)}function p(){var T=r.get(),f=T.videoUpload;!f||T.videoSubmitted||(f.controller&&f.controller.abort(),Zr(f.token,T.productId,f.file))}var l=Ma({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",c),jr(u),p(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),u=Yr(),c=function(T){l&&l.close&&l.close()};window.addEventListener("popstate",c);var m=document.createElement("div");m.className="renuvex-pr-fwizard-step-wrap";var d=_a({skippableSteps:[2],nextableSteps:[3],onBack:function(){s==="idle"&&r.goBack()},onSkip:function(){s==="idle"&&r.goNext()},onNext:function(){s==="idle"&&r.goNext()}}),v=document.createElement("div");v.className="renuvex-pr-fwizard-layout",v.appendChild(m),v.appendChild(d.el);var k=null,s="idle",x=null,g=!0,y=null;function h(T,f){m.innerHTML="";var C=mi(T,r,{canNavigate:function(){return s==="idle"},blobMap:t,urlToFinger:n,revokeBlobUrl:i,onValidityChange:function(N){d.setNextDisabled(!N)},onSuccess:b,showToast:l.showToast});if(k=C,d.update(T,r.get()),f){s="entering",C.el.classList.add("renuvex-pr-fwizard-step--enter");var M=null,P=function(){M&&clearTimeout(M),C.el.removeEventListener("animationend",P),C.el.classList.remove("renuvex-pr-fwizard-step--enter"),s="idle",x!==null&&z()};C.el.addEventListener("animationend",P),M=setTimeout(P,700)}else s="idle";m.appendChild(C.el),l.setStepAttr&&l.setStepAttr(T),T===3&&d.setNextDisabled(!0)}var w=!1;function b(){if(!w){if(w=!0,!k){m.innerHTML="";var T=$a();T.classList.add("renuvex-pr-fwizard-step--enter"),m.appendChild(T),l.setStepAttr("thanks"),d.setThanksState(l.close);return}var f=k;s="exiting",f.el.classList.add("renuvex-pr-fwizard-step--exit");var C=function(){if(y&&clearTimeout(y),f.el.removeEventListener("animationend",C),f.destroy)try{f.destroy()}catch(P){}k===f&&(k=null),m.innerHTML="";var M=$a();M.classList.add("renuvex-pr-fwizard-step--enter"),m.appendChild(M),l.setStepAttr("thanks"),d.setThanksState(l.close),s="idle"};f.el.addEventListener("animationend",C),y=setTimeout(C,300)}}function z(){var T=r.get().currentStep;if(s!=="idle"){x=T;return}if(!k){var f=!g;g=!1,h(T,f);return}var C=k;s="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var M=function(){if(y&&clearTimeout(y),C.el.removeEventListener("animationend",M),C.destroy)try{C.destroy()}catch(N){}if(k===C){m.innerHTML="",k=null;var P=x!==null?x:r.get().currentStep;x=null,h(P,!0),s="idle"}};C.el.addEventListener("animationend",M),y=setTimeout(M,350)}z();var S=r.get().currentStep,A=r.onChange(function(T){T.currentStep!==S?(S=T.currentStep,z()):d.update(T.currentStep,T)}),E=l.close;return l.close=function(){A&&A(),typeof y!="undefined"&&y&&clearTimeout(y),E()},l.open(v),{close:l.close}}var fi=4e3;async function en(){var e=await we(ge+"/api/public/upload/video/capability?storeId="+encodeURIComponent(ie),{method:"GET",cache:"no-store"},fi);if(!e.ok)throw new Error("video_capability_unavailable");var r=await e.json().catch(function(){return{}}),t=r&&r.data;if(!t||typeof t.enabled!="boolean")throw new Error("video_capability_invalid");return{enabled:t.enabled===!0,reason:typeof t.reason=="string"?t.reason:null}}var $r=null;function xi(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function gi(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:_&&_.videoReviewsEnabled===!0,reason:null};else try{t=await en()}catch(n){t={enabled:!1,reason:"capability_unavailable"}}Qa({productId:X||"",productName:_e||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function $(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=xi(r);return $r||($r=gi(r,Ee()).finally(function(){$r=null})),$r.finally(t)}var rn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var hi={id:"classic",name:"Klasik (A\xE7\u0131k)"},bi=rn;function yi(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange;Ae(a);var v=document.createElement("div");v.className="renuvex-pr-summary";var k=(o[3]||0)+(o[4]||0),s=i>0?Math.round(k/i*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+oe("full")+'</span><span class="renuvex-pr-avg-num">'+p+"</span>",v.appendChild(x);var g=document.createElement("div");if(g.className="renuvex-pr-summary-block renuvex-pr-summary-count",g.textContent=i.toLocaleString("tr-TR")+" "+U(n.countLabel,"Yorum"),v.appendChild(g),n.showRecommendation!==!1&&s>0){var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",y.innerHTML='<span class="renuvex-pr-recommend-pct">%'+s+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(y)}return v.appendChild(Ke({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:m})),v.appendChild(ne({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:$,onSortChange:d})),v}var kt={};Ce(kt,{css:()=>ki,meta:()=>wi,render:()=>Ei});var tn=`
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
`;var wi={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},ki=tn,zi="__unknown_product__",cr=Object.create(null);function Si(e){return e?String(e):zi}var Oe=null,mr=null;function Ci(){!Oe||!mr||(Oe.removeEventListener?Oe.removeEventListener("change",mr):Oe.removeListener&&Oe.removeListener(mr),Oe=null,mr=null)}function Ei(e){var r=e.widget,t=e.productId,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,c=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange,v=Si(t),k=document.createElement("div");k.className="renuvex-pr-summary renuvex-pr-summary-compact";var s=document.createElement("div");s.className="renuvex-pr-compact-header";var x=document.createElement("div");x.className="renuvex-pr-compact-trigger-wrap";var g=document.createElement("button");g.className="renuvex-pr-compact-trigger",g.type="button",g.setAttribute("aria-expanded","false"),g.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Pe(p,a)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+le(Jt)+"</span>";var y=g.querySelector(".renuvex-pr-compact-trigger-text"),h=g.querySelector(".renuvex-pr-compact-chevron");if(y&&(y.textContent=i.toLocaleString("tr-TR")+" "+U(n.countLabel,"Yorum")),y&&h){var w=document.createElement("span");w.className="renuvex-pr-compact-trigger-count",g.insertBefore(w,y),w.appendChild(y),w.appendChild(h)}x.appendChild(g),s.appendChild(x);var b=ne({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:$,onSortChange:d}),z=b.querySelector(".renuvex-pr-filter-wrap"),S=b.querySelector(".renuvex-pr-write-btn"),A=document.createElement("div");A.className="renuvex-pr-compact-actions-slot",S&&A.appendChild(S),z&&A.appendChild(z),s.appendChild(A),k.appendChild(s);var E=document.createElement("div");E.className="renuvex-pr-compact-panel",E.setAttribute("role","dialog"),E.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),E.setAttribute("aria-hidden","true");var T=document.createElement("div");T.className="renuvex-pr-compact-panel-inner";var f=document.createElement("div");f.className="renuvex-pr-compact-avg",f.innerHTML='<span class="renuvex-pr-icon">'+oe("full")+"</span><span>"+p+"</span>",T.appendChild(f),T.appendChild(Ke({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:function(O){M()&&E.classList.contains("renuvex-pr-open")&&(cr[v]=!0),m(O)}})),E.appendChild(T);var C=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function M(){return!!(C&&C.matches)}function P(O){O?E.classList.add("renuvex-pr-open"):E.classList.remove("renuvex-pr-open"),E.setAttribute("aria-hidden",O?"false":"true"),g.setAttribute("aria-expanded",O?"true":"false")}function N(O){var Y=O?k:x;if(E.parentNode!==Y){var ve=!!E.parentNode;E.classList.contains("renuvex-pr-open")&&P(!1),ve&&(cr[v]=!1),Y.appendChild(E)}}N(C?C.matches:!1);var L=ne({widget:r,currentOrderBy:u,currentHasImages:c,onWriteClick:$,onSortChange:d}),B=L.querySelector(".renuvex-pr-filter-wrap"),R=L.querySelector(".renuvex-pr-write-btn"),H=document.createElement("div");H.className="renuvex-pr-compact-write-row",R&&H.appendChild(R),B&&H.appendChild(B),k.appendChild(H);function G(){var O=E.classList.contains("renuvex-pr-open");return P(!1),M()&&(cr[v]=!1),O}function I(){V&&V.notifyOpening(),P(!0),M()&&(cr[v]=!0)}g.onclick=function(){E.classList.contains("renuvex-pr-open")?G():I()};var V=null;function W(O){V&&(V.unregister(),V=null),O||(V=qr({trigger:x,element:E,close:G}))}if(W(C?C.matches:!1),Ci(),C){var F=function(O){N(O.matches),W(O.matches)};C.addEventListener?C.addEventListener("change",F):C.addListener&&C.addListener(F),Oe=C,mr=F}if(M()&&cr[v]&&P(!0),n.showRecommendation!==!1){var K=(o[3]||0)+(o[4]||0),se=i>0?Math.round(K/i*100):0;if(se>0){var Q=document.createElement("div");Q.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",Q.style.marginTop="8px",Q.innerHTML='<span class="renuvex-pr-recommend-pct">%'+se+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",T.appendChild(Q)}}return k}var zt={};Ce(zt,{css:()=>Ai,meta:()=>Ti,render:()=>Pi});var an=`
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
`;var Ti={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Ai=an;function Pi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,p=e.currentRatingFilter,l=e.currentOrderBy,u=e.currentHasImages,c=e.onFilterChange,m=e.onSortChange;Ae(n);var d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-split";var v=document.createElement("div");v.className="renuvex-pr-split-col renuvex-pr-split-left";var k=document.createElement("div");k.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",k.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+oe("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",v.appendChild(k);var s=document.createElement("div");s.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",s.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),v.appendChild(s),d.appendChild(v);var x=document.createElement("div");x.className="renuvex-pr-split-col renuvex-pr-split-mid",x.appendChild(Ke({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:p,onFilterChange:c})),d.appendChild(x);var g=ne({widget:r,currentOrderBy:l,currentHasImages:u,onWriteClick:$,onSortChange:m}),y=g.querySelector(".renuvex-pr-filter-wrap"),h=g.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-split-col renuvex-pr-split-right",h&&w.appendChild(h),y&&w.appendChild(y),d.appendChild(w);var b=(i[3]||0)+(i[4]||0),z=a>0?Math.round(b/a*100):0,S=document.createElement("div");S.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",S.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var A=t.showRecommendation===!1||z===0;return A&&S.classList.add("renuvex-pr-split-rec-hidden"),v.appendChild(S),d}var St={};Ce(St,{css:()=>Ni,meta:()=>Mi,render:()=>_i});var nn=`
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
`;var Mi={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Ni=nn;function _i(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var c=document.createElement("div");c.className="renuvex-pr-minimal-info";var m=document.createElement("div");m.className="renuvex-pr-minimal-row";var d=document.createElement("span");d.className="renuvex-pr-minimal-avg",d.textContent=i,m.appendChild(d);var v=document.createElement("span");v.className="renuvex-pr-minimal-stars",v.innerHTML=Pe(i,n),m.appendChild(v);var k=document.createElement("span");k.className="renuvex-pr-minimal-count",k.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),m.appendChild(k),c.appendChild(m),u.appendChild(c);var s=ne({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:$,onSortChange:l}),x=s.querySelector(".renuvex-pr-filter-wrap"),g=s.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-minimal-actions",g&&y.appendChild(g),x&&y.appendChild(x),u.appendChild(y);var h=ne({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:$,onSortChange:l}),w=h.querySelector(".renuvex-pr-filter-wrap"),b=h.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-minimal-write-row",b&&z.appendChild(b),w&&z.appendChild(w),u.appendChild(z),u}var Ct={};Ce(Ct,{css:()=>Ri,meta:()=>Li,render:()=>Ii});var on=`
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
`;var Li={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ri=on;function Ii(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var c=document.createElement("div");c.className="renuvex-pr-hero-info";var m=document.createElement("div");m.className="renuvex-pr-hero-rating-col";var d=document.createElement("span");d.className="renuvex-pr-hero-avg",d.textContent=i,m.appendChild(d);var v=document.createElement("div");v.className="renuvex-pr-hero-meta-row";var k=document.createElement("span");k.className="renuvex-pr-hero-stars",k.innerHTML=Pe(i,n),v.appendChild(k);var s=document.createElement("div");s.className="renuvex-pr-hero-count",s.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),v.appendChild(s),m.appendChild(v),c.appendChild(m),u.appendChild(c);var x=ne({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:$,onSortChange:l}),g=x.querySelector(".renuvex-pr-filter-wrap"),y=x.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");h.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",y&&h.appendChild(y),g&&h.appendChild(g),u.appendChild(h);var w=ne({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:$,onSortChange:l}),b=w.querySelector(".renuvex-pr-filter-wrap"),z=w.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");return S.className="renuvex-pr-hero-write-row",z&&S.appendChild(z),b&&S.appendChild(b),u.appendChild(S),u}var ln=`
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
`;var Qr={classic:wt,compact:kt,split:zt,minimal:St,hero:Ct};function et(e){return Qr[e]||Qr.classic}function pn(){var e=Object.keys(Qr).map(function(r){return Qr[r].css||""}).join(`
`);return ln+`
`+e}var Et={};Ce(Et,{css:()=>Fi,meta:()=>Bi,render:()=>Oi});function Me(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,n=t?Ye(e.posterUrl,t):oa(e);if(!n)return null;var a=document.createElement("img"),i=e.type==="image"?Lr(n,r.sourceWidth):{src:n,srcset:ia(e.posterUrl,t)};if(a.src=i.src,i.srcset&&(a.srcset=i.srcset),a.loading=r.loading||"lazy",a.decoding="async",e.type==="image"&&a.setAttribute("data-renuvex-img-url",e.url),r.width&&(a.width=r.width),r.height&&(a.height=r.height),a.alt="",Rr(a),e.type!=="video")return a.className=r.className||"",lr(a,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),a;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",a.className="renuvex-pr-media-poster",o.appendChild(a);var p=document.createElement("span");p.className="renuvex-pr-media-play";var l=J(Pr);l&&p.appendChild(l),o.appendChild(p);var u=la(e.durationMs);if(u){var c=document.createElement("span");c.className="renuvex-pr-media-duration",c.textContent=u,o.appendChild(c)}return lr(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function er(e,r,t){var n=t||{},a=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,a.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var p=!1;o.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-body-clamped",!p),o.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:i,readMore:o}}function rr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=U(_&&_.merchantReplyLabel,"Ma\u011Faza Sahibi"),n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var p=!1;o.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-reply-text-clamped",!p),o.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var un=`
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
`;var Bi={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Fi=un;function Oi(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=be(e.rating,_),a.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=ye(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-title",p.textContent=e.title,t.appendChild(p)}var l=document.createElement("div");l.className="renuvex-pr-author",l.textContent=e.author||"",t.appendChild(l);var u=(e.comment||"").trim();u&&t.appendChild(er(u,"renuvex-pr-body").fragment);var c=ke(e);if(c.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",c.forEach(function(v){var k=Me(v,{className:"renuvex-pr-img",sourceWidth:ae,width:ae,height:ae,onOpen:function(){fe(e,v.url,r)}});k&&m.appendChild(k)}),t.appendChild(m)}var d=rr(e.merchantReply);return d&&t.appendChild(d),t}var Tt={};Ce(Tt,{css:()=>Hi,meta:()=>Ui,render:()=>Vi});var dn=`
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
`;var Ui={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Hi=dn;function Vi(e,r){var t=ke(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=be(e.rating,_),i.appendChild(o);var p=document.createElement("span");p.className="renuvex-pr-review-list-author-name",p.textContent=e.author||"",i.appendChild(p);var l=document.createElement("time");l.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=ye(e.createdAt),i.appendChild(l),a.appendChild(i);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var c=document.createElement("div");c.className="renuvex-pr-review-list-title",c.textContent=e.title,u.appendChild(c)}var m=(e.comment||"").trim();m&&u.appendChild(er(m,"renuvex-pr-review-list-body").fragment);var d=rr(e.merchantReply);if(d&&u.appendChild(d),a.appendChild(u),n){var v=document.createElement("div");v.className="renuvex-pr-review-list-media",t.forEach(function(k){var s=Me(k,{sourceWidth:ae,width:ae,height:Math.round(ae*4/3),onOpen:function(){fe(e,k.url,r)}});s&&v.appendChild(s)}),a.appendChild(v)}return a}var At={};Ce(At,{css:()=>Yi,meta:()=>Di,render:()=>ji});var sn=`
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
`;var Di={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Yi=sn;function ji(e,r){var t=Br(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=be(e.rating,_),i.appendChild(o),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-gallery-title",p.textContent=e.title,i.appendChild(p)}var l=document.createElement("div");l.className="renuvex-pr-review-gallery-author",l.textContent=e.author||"",i.appendChild(l);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ye(e.createdAt),i.appendChild(u);var c=(e.comment||"").trim();if(c&&i.appendChild(er(c,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){fe(e,t.url,r)}}:null).fragment),a.appendChild(i),n){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var d=Me(t,{sourceWidth:Nr,width:Nr,height:Math.round(Nr*4/3),onOpen:function(){fe(e,t.url,r)}});d&&m.appendChild(d),a.appendChild(m)}var v=rr(e.merchantReply,t?function(){fe(e,t.url,r)}:null);return v&&(v.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(v)),a}var rt={card:Et,list:Tt,gallery:At};function tt(e){return rt[e]||rt.card}function vn(){return Object.keys(rt).map(function(e){return rt[e].css||""}).join(`
`)}var Pt=0;function Ue(){return Pt++,Pt}function He(e,r){return e!==Pt?!1:r?!(r.productId!==void 0&&X!==r.productId||r.orderBy!==void 0&&Z!==r.orderBy||r.page!==void 0&&nr!==r.page||r.ratingFilter!==void 0&&re!==r.ratingFilter||r.hasImages!==void 0&&te!==r.hasImages||r.nextCursor!==void 0&&wr!==r.nextCursor):!0}var Mt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},Nt={small:80,medium:110,large:140},_t={small:80,medium:100,large:110};function cn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),n.appendChild(a),n.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var p=document.createElement("div");return p.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",p.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(p),r}function mn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var n=document.createElement("div");n.className="renuvex-pr-empty-state-stars",n.innerHTML=Pe(0,e.iconPair),t.appendChild(n);var a=document.createElement("p");a.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(a),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function fn(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function xn(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Se(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function at(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Lt(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function gn(e){return .2126*Lt(e.r)+.7152*Lt(e.g)+.0722*Lt(e.b)}function hn(e,r){var t=gn(e),n=gn(r),a=Math.max(t,n),i=Math.min(t,n);return(a+.05)/(i+.05)}function Wi(e){var r=at(e)||at("#ffffff"),t=at("#111111"),n=at("#ffffff");return hn(t,r)>=hn(n,r)?"#111111":"#ffffff"}function qi(e){return Se(e,e==="#ffffff"?.1:.06)}function bn(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",p=r.barTrackColor||"#e5e7eb",l=r.barCountColor||"#111111",u=Se(o,.06),c=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",d=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",k=r.filterBtnBgColor||"#111111",s=r.filterBtnTextColor||"#ffffff",x=r.filterBtnBorderColor||"#111111",g=r.filterMenuBgColor||"#ffffff",y=r.filterMenuBorderColor||"#e5e7eb",h=r.filterItemTextColor||"#111111",w=r.filterItemHoverBgColor||"#f3f4f6",b=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",S=r.reviewAuthorColor||"#111111",A=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",f=Se(E,.65),C=r.replyBgColor||"#f9fafb",M=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",L=r.photoTitleColor||"#111111",B=Se("#111111",.05),R=r.photoArrowBgColor||"#ffffff",H=r.photoArrowTextColor||"#111111",G=Se("#111111",.12),I=r.formBgColor||"#ffffff",V=r.formPrimaryTextColor||"#111111",W=r.formSecondaryTextColor||"#3b3b3b",F=r.inputTextColor||V,K=r.inputBorderColor||"#d1d5db",se=r.placeholderColor||"#9ca3af",Q=r.formStepBarColor||"#111111",O=r.formBtnBgColor||"#111111",Y=r.formBtnTextColor||"#ffffff",ve=r.formBtnBorderColor||"#111111",j=Se(O,.06),de=Se(O,.18),fr=Se(Y,.85),tr=Se(V,.06),xe=Wi(I),D=qi(xe),q=r.loadMoreBgColor||"#ffffff",ee=r.loadMoreTextColor||"#111111",Ne=r.loadMoreBorderColor||"#111111",xr=r.paginationBgColor||"#ffffff",gr=r.paginationTextColor||"#111111",hr=r.paginationBorderColor||"#e5e7eb",br=r.paginationActiveBgColor||"#111111",yr=r.paginationActiveTextColor||"#ffffff",ce={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":p,"--renuvex-pr-bar-count":l,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":d,"--renuvex-pr-btn-border":v,"--renuvex-pr-filter-btn-bg":k,"--renuvex-pr-filter-btn-text":s,"--renuvex-pr-filter-btn-border":x,"--renuvex-pr-filter-menu-bg":g,"--renuvex-pr-filter-menu-border":y,"--renuvex-pr-filter-item-text":h,"--renuvex-pr-filter-item-hover-bg":w,"--renuvex-pr-filter-item-active":b,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":S,"--renuvex-pr-review-date":A,"--renuvex-pr-review-body":E,"--renuvex-pr-review-border":T,"--renuvex-pr-state-text":f,"--renuvex-pr-review-star-color":c,"--renuvex-pr-reply-bg-color":C,"--renuvex-pr-reply-border":M,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":N,"--renuvex-pr-photo-title":L,"--renuvex-pr-photo-image-border":B,"--renuvex-pr-photo-arrow-bg":R,"--renuvex-pr-photo-arrow-text":H,"--renuvex-pr-photo-arrow-border":G,"--renuvex-pr-fwizard-bg":I,"--renuvex-pr-fwizard-text":V,"--renuvex-pr-fwizard-secondary-text":W,"--renuvex-pr-fwizard-input-bg":I,"--renuvex-pr-fwizard-input-text":F,"--renuvex-pr-fwizard-input-border":K,"--renuvex-pr-fwizard-placeholder":se,"--renuvex-pr-fwizard-close-text":xe,"--renuvex-pr-fwizard-close-hover-bg":D,"--renuvex-pr-fwizard-progress-bg":tr,"--renuvex-pr-fwizard-progress-active":Q,"--renuvex-pr-fwizard-btn-bg":O,"--renuvex-pr-fwizard-btn-text":Y,"--renuvex-pr-fwizard-btn-border":ve,"--renuvex-pr-fwizard-btn-disabled-bg":de,"--renuvex-pr-fwizard-btn-disabled-text":fr,"--renuvex-pr-fwizard-nav-hover-bg":j,"--renuvex-pr-load-more-bg":q,"--renuvex-pr-load-more-text":ee,"--renuvex-pr-load-more-border":Ne,"--renuvex-pr-pagination-bg":xr,"--renuvex-pr-pagination-text":gr,"--renuvex-pr-pagination-border":hr,"--renuvex-pr-pagination-active-bg":br,"--renuvex-pr-pagination-active-text":yr};Object.keys(ce).forEach(function(ar){e.style.setProperty(ar,ce[ar])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function yn(e){var r=e.settings,t=e.root,n=e.currentHasImages,a=e.openReviewModal,i=(e.photoStripReviews||[]).filter(function(h){return ke(h).length>0});if(!(r.showPhotoGallery!==!1&&!n&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var p=U(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),l=document.createElement("div");l.className="renuvex-pr-photo-title",l.textContent=p,o.appendChild(l)}var u=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",u);var c=document.createElement("div");c.className="renuvex-pr-photo-strip";var m=ae,d=r.reviewLayout==="card"?ae:Math.round(ae*4/3),v=0;i.forEach(function(h){if(!(v>=15)){var w=Br(h);if(w){var b=Me(w,{className:"renuvex-pr-photo-strip-thumb",sourceWidth:ae,width:m,height:d,loading:v<3?"eager":"lazy",onOpen:function(){a(h,w.url,i)}});b&&(c.appendChild(b),v++)}}});var k=document.createElement("button");k.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var s=J(De);s&&k.appendChild(s),k.setAttribute("aria-label","\xD6nceki"),k.onclick=function(){c.scrollBy({left:-200,behavior:"smooth"})};var x=document.createElement("button");x.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var g=J(Tr);g&&x.appendChild(g),x.setAttribute("aria-label","Sonraki"),x.onclick=function(){c.scrollBy({left:200,behavior:"smooth"})};var y=document.createElement("div");return y.className="renuvex-pr-photo-strip-wrap",y.appendChild(k),y.appendChild(c),y.appendChild(x),o.appendChild(y),o}var Gi=1,Ki=7,Rt="\u2026";function Xi(e,r){var t=Math.max(1,Math.floor(Number(r))||1),n=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=Ki){for(var a=[],i=1;i<=t;i++)a.push(i);return a}for(var o=[],p=1;p<=t;p++)(p===1||p===t||Math.abs(p-n)<=Gi)&&o.push(p);for(var l=[],u=0;u<o.length;u++)u>0&&o[u]-o[u-1]>1&&l.push(Rt),l.push(o[u]);return l}function wn(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),n=typeof e.onPageChange=="function"?e.onPageChange:function(){},a=document.createElement("nav");a.className="renuvex-pr-pagination",a.setAttribute("aria-label","Yorum sayfalar\u0131");function i(l){a.setAttribute("aria-busy","true");for(var u=a.querySelectorAll("button"),c=0;c<u.length;c++)u[c].disabled=!0;n(l)}function o(l,u){var c=document.createElement("span");c.className="renuvex-pr-pagination-label",c.setAttribute("aria-hidden","true"),c.textContent=u,l.appendChild(c)}function p(l,u,c,m){var d=document.createElement("button");return d.type="button",d.className="renuvex-pr-pagination-arrow",d.setAttribute("aria-label",l),o(d,u),m?d.disabled=!0:d.onclick=function(){i(c)},d}return a.appendChild(p("\xD6nceki sayfa","\u2039",t-1,t<=1)),Xi(t,r).forEach(function(l){if(l===Rt){var u=document.createElement("span");u.className="renuvex-pr-pagination-gap",u.setAttribute("aria-hidden","true"),u.textContent=Rt,a.appendChild(u);return}var c=document.createElement("button");c.type="button",c.className="renuvex-pr-pagination-btn",c.setAttribute("aria-label","Sayfa "+l),o(c,String(l)),l===t?c.setAttribute("aria-current","page"):c.onclick=function(){i(l)},a.appendChild(c)}),a.appendChild(p("Sonraki sayfa","\u203A",t+1,t>=r)),a}function kn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function zn(e){var r=e.render;async function t(){var o=Ue(),p=X,l=Z,u=re,c=te;Te(null);var m=await Be(X,Z,1,re,te);He(o,{productId:p,orderBy:l,ratingFilter:u,hasImages:c})&&await r(X,_,m,_e,Z,1,Bt)}async function n(o){var p=Ue(),l=re===o?null:o,u=X,c=Z,m=te;Ot(l),Le(1),Te(null);var d=await Be(X,Z,1,l,te);He(p,{productId:u,orderBy:c,page:1,ratingFilter:l,hasImages:m})&&await r(X,_,d,_e,Z,1)}async function a(o,p){var l=Ue(),u=X,c=re;Le(1),Te(null);var m=o,d=!1;p&&(d=!0,m="newest"),Ut(d),kr(m);var v=await Be(X,m,1,re,d);He(l,{productId:u,orderBy:m,page:1,ratingFilter:c,hasImages:d})&&await r(X,_,v,_e,m,1)}async function i(o){var p=Ue(),l=X,u=Z,c=re,m=te;Le(o),Te(null);var d=await Be(X,Z,o,re,te);if(He(p,{productId:l,orderBy:u,page:o,ratingFilter:c,hasImages:m})){await r(X,_,d,_e,Z,o);var v=document.getElementById("renuvex-reviews"),k=v&&v.shadowRoot,s=k&&k.querySelector&&k.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(s){try{s.focus({preventScroll:!0})}catch(y){try{s.focus()}catch(h){}}kn(k,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var x=document.getElementById("renuvex-reviews");if(x&&typeof x.scrollIntoView=="function"){var g=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;x.scrollIntoView({behavior:g?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:n,onSortChange:a,onPageChange:i}}function Ji(){return na()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Zi(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ta({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),aa(t,{surface:"reviews",productId:r||""}),t}async function It(e,r,t,n,a,i,o){if(Kt){Cr({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:o});return}Sr(!0),Ht(e),Vt(r),o!==void 0&&Dt(o),Yt(n),a&&kr(a),i&&Le(i),t!=null&&(jt(t),Te(t&&t.data?t.data.nextCursor:null));var p=zn({render:It});try{let xe=function(D,q){if(!(!D||!D.meta||!D.meta.sizeOverrides)){var ee=D.meta.sizeOverrides[q];ee&&Object.keys(ee).forEach(function(Ne){v.style.setProperty(Ne,ee[Ne])})}};var fr=xe,l=et(r.summaryLayout),u=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),c=r.showTitle!==!1,m=U(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),d=u&&c?m:"",v=document.documentElement;bn(v,r);var k=r.borderRadius!==void 0?r.borderRadius:8,s=Mt[r.size]||Mt.medium,x=Nt[r.thumbnailSize]||Nt.medium,g=x;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(g=_t[r.thumbnailSize]||_t.medium),v.style.setProperty("--renuvex-pr-title-size",s.titleSize+"px"),v.style.setProperty("--renuvex-pr-review-text-size",s.reviewTextSize+"px"),v.style.setProperty("--renuvex-pr-review-title-size",s.reviewTitleSize+"px"),v.style.setProperty("--renuvex-pr-author-size",s.authorSize+"px"),v.style.setProperty("--renuvex-pr-reply-name-size",s.replyNameSize+"px"),v.style.setProperty("--renuvex-pr-reply-text-size",s.replyTextSize+"px"),v.style.setProperty("--renuvex-pr-radius",k+"px"),v.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,k-4)+"px"),v.style.setProperty("--renuvex-pr-photo-title-size",s.photoTitleSize+"px"),v.style.setProperty("--renuvex-pr-avg-rating-size",s.avgRatingSize+"px"),v.style.setProperty("--renuvex-pr-review-count-size",s.reviewCountSize+"px"),v.style.setProperty("--renuvex-pr-compact-count-size",s.compactCountSize+"px"),v.style.setProperty("--renuvex-pr-recommend-size",s.recommendSize+"px"),v.style.setProperty("--renuvex-pr-btn-text-size",s.btnTextSize+"px"),v.style.setProperty("--renuvex-pr-bar-label-size",s.barLabelSize+"px"),v.style.setProperty("--renuvex-pr-minimal-avg-size",s.minimalAvgSize+"px"),v.style.setProperty("--renuvex-pr-hero-avg-size",s.heroAvgSize+"px"),v.style.setProperty("--renuvex-pr-minimal-count-size",s.minimalCountSize+"px"),v.style.setProperty("--renuvex-pr-hero-count-size",s.heroCountSize+"px"),v.style.setProperty("--renuvex-pr-bar-count-size",s.barCountSize+"px"),v.style.setProperty("--renuvex-pr-review-date-size",s.reviewDateSize+"px"),v.style.setProperty("--renuvex-pr-filter-text-size",s.filterTextSize+"px"),v.style.setProperty("--renuvex-pr-load-more-size",s.loadMoreSize+"px"),v.style.setProperty("--renuvex-pr-load-more-min-height",s.loadMoreMinHeight+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-y",s.loadMorePadY+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-x",s.loadMorePadX+"px"),v.style.setProperty("--renuvex-pr-load-more-mobile-min-height",s.loadMoreMobileMinHeight+"px"),v.style.setProperty("--renuvex-pr-pagination-button-size",s.paginationButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-pad-x",s.paginationPadX+"px"),v.style.setProperty("--renuvex-pr-pagination-gap",s.paginationGap+"px"),v.style.setProperty("--renuvex-pr-pagination-margin-top",s.paginationMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-gap-min",s.paginationGapMin+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-button-size",s.paginationMobileButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-font-size",s.paginationMobileFontSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap",s.paginationMobileGap+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",s.paginationMobileMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",s.paginationMobileGapMin+"px"),v.style.setProperty("--renuvex-pr-read-more-size",s.readMoreSize+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size",x+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size-mobile",g+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";v.style.setProperty("--renuvex-pr-review-star-color",y),v.style.setProperty("--renuvex-pr-star-size",s.reviewStarSize+"px"),v.style.setProperty("--renuvex-pr-avg-star-size",s.avgStarSize+"px"),xe(et(r.summaryLayout),r.size),xe(tt(r.reviewLayout),r.size);var h=ir(r),w=Ji();if(!w)return;var b=Zi(w,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==b&&b.appendChild(z);var S=pa(z),A=je+Ve+Or+pn()+vn();We(S,A);var E=da(S);if(r.enabled===!1){z.style.minHeight="auto",E.replaceChildren(cn(r.borderRadius!==void 0?r.borderRadius:8)),Sr(!1);var T=zr;Cr(null),T&&It(T.productId,T.settings,T.reviewsData,T.productName,T.orderBy,T.page,T.badgeSettings);return}try{var f=t||{},C=pt(f),M=C?[]:f.data&&f.data.reviews||[];Wt(M),E.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),d){var N=document.createElement("div"),L=r.summaryLayout||"classic";N.className="renuvex-pr-title renuvex-pr-title-"+L,N.textContent=d,P.appendChild(N)}if(C){P.appendChild(xn(f.message,p.onRetry)),E.appendChild(P),Re(S),nt(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return S.getElementById("renuvex-reviews-widget")});return}var B=f.data&&f.data.allCount||0,R=f.data&&f.data.ratingCounts||null,H=R||[0,0,0,0,0],G=f.data&&f.data.avgRating||"0.0";if(!R&&M.length>0){M.forEach(function(D){D.rating>=1&&D.rating<=5&&H[D.rating-1]++});var I=M.reduce(function(D,q){return D+q.rating},0);G=(I/M.length).toFixed(1)}if(B===0)P.classList.add("renuvex-pr-reviews-empty"),P.appendChild(mn({iconPair:h,writeButtonText:U(r.writeButtonText,"Yorum Yap"),emptyStateText:U(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:$}));else{var V=et(r.summaryLayout),W=V.render({widget:P,productId:e,data:f,settings:r,iconPair:h,allCount:B,ratingCounts:H,avgRatingVal:G,currentRatingFilter:re,currentOrderBy:Z,currentHasImages:te,onFilterChange:p.onFilterChange,onSortChange:p.onSortChange});P.appendChild(W);var F=yn({settings:r,root:v,currentHasImages:te,photoStripReviews:Ft,openReviewModal:fe,wireLightboxTrigger:lr});if(F&&P.appendChild(F),M.length===0)P.appendChild(fn());else{var K=tt(r.reviewLayout);M.forEach(function(D){P.appendChild(K.render(D,it))})}var se=r.paginationMode==="numbered"?"numbered":"loadMore";if(se==="numbered"){var Q=f.data&&f.data.totalPages||1;Q>1&&P.appendChild(wn({page:f.data&&f.data.page||nr||1,totalPages:Q,onPageChange:p.onPageChange}))}var O=se==="loadMore"&&f.data&&f.data.hasMore;if(O){let D=function(q){ve.textContent=q,Y.setAttribute("aria-label",q)};var tr=D,Y=document.createElement("button");Y.className="renuvex-pr-load-more";var ve=document.createElement("span");ve.className="renuvex-pr-load-more-label",ve.setAttribute("aria-hidden","true"),Y.appendChild(ve),D("Daha Fazla G\xF6ster"),Y.onclick=async function(){Y.disabled=!0,D("Y\xFCkleniyor...");var q=Ue(),ee=X,Ne=Z,xr=nr,gr=re,hr=te,br=wr,yr=xr+1,ce=await Be(ee,Ne,yr,gr,hr,null,br);if(He(q,{productId:ee,orderBy:Ne,page:xr,ratingFilter:gr,hasImages:hr,nextCursor:br}))if(ce&&!pt(ce)&&ce.data&&Array.isArray(ce.data.reviews)){var ar=qt(ce.data.reviews);Gt(ar),Le(yr),Te(ce.data.nextCursor||null);var Sn=tt(_.reviewLayout);ar.forEach(function(Cn){P.insertBefore(Sn.render(Cn,it),Y)}),ce.data.hasMore?(Y.disabled=!1,D("Daha Fazla G\xF6ster")):Y.remove()}else Y.disabled=!1,D("Tekrar Dene")},P.appendChild(Y)}}E.appendChild(P),Re(S),nt(P,"reviews-widget",{productId:e||""},function(){return S.getElementById("renuvex-reviews-widget")})}catch(D){console.error("[renuvex-pr] render error:",D);var j=document.createElement("p");j.style.cssText="text-align:center;color:#dc2626;",j.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",E&&E.replaceChildren(j)}}finally{if(Sr(!1),zr){var de=zr;Cr(null),It(de.productId,de.settings,de.reviewsData,de.productName,de.orderBy,de.page,de.badgeSettings)}}}export{It as render};
