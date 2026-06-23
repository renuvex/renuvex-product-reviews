/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as je,d as Me}from"./chunk-N7KC6W47.js";import{b as pt,c as Ue}from"./chunk-W6RJS6FO.js";import{A as Gt,B as Kt,C as zr,D as Sr,E as Cr,a as re,b as or,c as ie,d as oe,e as Z,f as R,g as Bt,h as Ie,j as wr,k as it,l as Ft,m as kr,n as Be,o as Ot,p as Ut,q as Ht,r as Vt,s as Dt,t as Yt,u as jt,v as _e,y as Wt,z as qt}from"./chunk-H43GKW4S.js";import{A as ze,B as Mr,C as ea,D as le,E as _r,F as Nr,G as ot,H as lt,I as Lr,J as ra,K as Rr,L as ta,M as aa,c as nt,e as Ne,f as ue,g as se,h as ee,i as Fe,j as Er,k as lr,l as Xt,m as We,n as Tr,o as Jt,p as we,q as Ar,r as Zt,s as Pr,u as H,v as $t,w as ke,x as Le,z as Qt}from"./chunk-QOYNZOL7.js";import{c as Se}from"./chunk-WWGCW5YN.js";import{a as de,b as ye,h as na,i as Oe}from"./chunk-UOBLDAJF.js";import{c as Pe}from"./chunk-NGSVSVJA.js";function dt(e){if(typeof e!="string"||!e)return!1;try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return!1;var t=r.hostname.toLowerCase();return t==="stream.mux.com"||t==="image.mux.com"}catch(n){return!1}}function Tn(e){return!e||!dt(e.href)?!1:e.hostname.toLowerCase()==="image.mux.com"?/\/thumbnail\.(jpg|jpeg|png|webp)$/i.test(e.pathname):!1}function Ir(e){var r=Number(e);return Number.isFinite(r)&&r>0?Math.round(r):0}function qe(e,r){if(r=r||{},typeof e!="string"||!e)return"";var t;try{t=new URL(e)}catch(i){return e}if(!Tn(t))return e;var n=Ir(r.width),a=Ir(r.height);return n&&t.searchParams.set("width",String(n)),a&&t.searchParams.set("height",String(a)),t.hostname.toLowerCase()==="image.mux.com"&&(r.fit==="crop"||r.fit==="smartcrop"||r.fit==="pad"||r.fit==="stretch"||r.fit==="preserve"?t.searchParams.set("fit_mode",r.fit):r.fit&&t.searchParams.set("fit_mode","preserve")),t.href}function ia(e,r){r=r||{};var t=Ir(r.width),n=Ir(r.height);if(!t&&!n)return"";var a=qe(e,{width:t,height:n,fit:r.fit}),i=qe(e,{width:t?t*2:0,height:n?n*2:0,fit:r.fit});return!a||!i||a===e||i===e?"":a+" 1x, "+i+" 2x"}function Ce(e){var r=[],t={},n=e&&Array.isArray(e.media)?e.media:[];return n.forEach(function(a){if(!(!a||typeof a!="object")){if(a.type==="video"){if(!dt(a.url)||!dt(a.posterUrl||a.thumbnailUrl))return;var i="video:"+a.url;if(t[i])return;t[i]=!0,r.push({type:"video",url:a.url,posterUrl:a.posterUrl||a.thumbnailUrl,thumbnailUrl:a.thumbnailUrl||a.posterUrl,durationMs:typeof a.durationMs=="number"?a.durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length});return}if(a.type==="image"&&Mr(a.url)){var o="image:"+a.url.trim();if(t[o])return;t[o]=!0,r.push({type:"image",url:a.url.trim(),thumbnailUrl:a.thumbnailUrl||null,posterUrl:null,durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length})}}}),ea(e).forEach(function(a){var i="image:"+a;t[i]||(t[i]=!0,r.push({type:"image",url:a,thumbnailUrl:null,posterUrl:null,durationMs:null,width:null,height:null,position:r.length}))}),r.sort(function(a,i){return a.position-i.position})}function Br(e){var r=Ce(e);return r.length?r[0]:null}function oa(e){return e&&e.type==="video"?e.posterUrl:e&&e.url}function la(e){if(typeof e!="number"||e<=0)return"";var r=Math.max(0,Math.round(e/1e3)),t=Math.floor(r/60),n=String(r%60).padStart(2,"0");return t+":"+n}var Ge=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function pa(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Ke(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Fr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function da(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function ua(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var sa=`
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
`);function An(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function xe(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function Pn(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function Mn(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=Pn()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function _n(e){var r=document.body.style,t=document.documentElement.style;xe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),xe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),xe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),xe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),xe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),xe(r,"position",e.bodyPosition,e.bodyPositionPriority),xe(r,"top",e.bodyTop,e.bodyTopPriority),xe(r,"left",e.bodyLeft,e.bodyLeftPriority),xe(r,"right",e.bodyRight,e.bodyRightPriority),xe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var pr=0,Xe=null;function Ur(){return pr+=1,pr>1||(Xe=An(),Mn(Xe)),Xe}function Hr(){if(pr!==0&&(pr-=1,!(pr>0))){var e=Xe;Xe=null,e&&_n(e)}}function Nn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Vr(){var e=Nn();return!e||e===document.body||e===document.documentElement?null:e}function ve(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Ln(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ut(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Ln)}function Rn(e,r){var t=e,n=ut(e);!n.length&&r&&(t=r,n=ut(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;ve(a)}function Dr(e,r,t){if(e.key==="Tab"){var n=ut(r);if(!n.length){e.preventDefault(),Rn(r);return}var a=n[0],i=n[n.length-1],o=da(t);if(!r.contains(o)){e.preventDefault(),ve(a);return}if(n.indexOf(o)===-1){e.preventDefault(),ve(e.shiftKey?i:a);return}e.shiftKey&&o===a?(e.preventDefault(),ve(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ve(a))}}var ba="renuvexPrOverlay";function Yr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[ba]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function In(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[ba]===e.id)}function jr(e){if(In(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Bn(e){var r=e||(typeof navigator!="undefined"?navigator:null),t=r&&(r.connection||r.webkitConnection||r.mozConnection);if(t&&t.saveData===!0)return!1;var n=t&&typeof t.effectiveType=="string"?t.effectiveType.toLowerCase():"";return n!=="slow-2g"&&n!=="2g"}function Fn(e){var r=Number(e&&e.width),t=Number(e&&e.height),n=Number(e&&(e.bitrate||e.bandwidth));return Number.isFinite(r)||Number.isFinite(t)?(Number.isFinite(t)?t:0)*1e5+(Number.isFinite(r)?r:0):Number.isFinite(n)?n:0}function On(e,r,t){if(!Array.isArray(e)||!e.length)return-1;var n=t||(typeof window!="undefined"?window:null),a=r&&typeof r.getBoundingClientRect=="function"?r.getBoundingClientRect():{width:0,height:0},i=Math.max(Number(a.width)||0,Number(r&&r.clientWidth)||0,360),o=Math.max(Number(a.height)||0,Number(r&&r.clientHeight)||0,360),l=Number(n&&n.devicePixelRatio),p=Number.isFinite(l)&&l>0?Math.min(l,2):1,u=Math.round(i*p*1.15),m=Math.round(o*p*1.15),c=-1,s=-1,v=0,x=Number.POSITIVE_INFINITY;return e.forEach(function(d,f){var g=Fn(d);g<x&&(x=g,v=f);var y=Number(d&&d.width),w=Number(d&&d.height),E=!Number.isFinite(y)||y<=u,T=!Number.isFinite(w)||w<=m;E&&T&&g>s&&(s=g,c=f)}),c>=0?c:v}function Un(e,r,t){if(Bn()){var n=e&&e.Events&&e.Events.MANIFEST_PARSED;if(!(!n||!r||typeof r.on!="function")){var a=function(){typeof r.off=="function"&&r.off(n,a);var i=On(r.levels,t);if(i>=0)try{r.startLevel=i}catch(o){}};r.on(n,a)}}}function ya(e,r){var t=!1,n=null;return e.controls=!0,e.autoplay=!1,e.preload="metadata",e.playsInline=!0,e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),e.poster=qe(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"",e.canPlayType("application/vnd.apple.mpegurl")?e.src=r.url:import("./hls-64XD2IDA.js").then(function(a){if(!t){var i=a.default||a;if(!i||!i.isSupported||!i.isSupported()){e.dispatchEvent(new Event("error"));return}n=new i({enableWorker:!0,lowLatencyMode:!1,capLevelToPlayerSize:!0,backBufferLength:30}),Un(i,n,e),n.loadSource(r.url),n.attachMedia(e)}}).catch(function(){t||e.dispatchEvent(new Event("error"))}),function(){t=!0;try{e.pause()}catch(i){}if(n){try{n.destroy()}catch(i){}n=null}e.removeAttribute("src");try{e.load()}catch(i){}}}function Je(e){return Ce(e)}function vt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function wa(e,r,t,n,a,i){e&&e.shadowRoot&&vt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Hr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Er(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ve(a)}function Hn(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ke(e.rating,R);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=ze(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-modal-body",p.textContent=(e.comment||"").trim(),p.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=H(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi");var c=document.createElement("div");return c.className="renuvex-pr-modal-reply-text",c.textContent=e.merchantReply||"",u.appendChild(m),u.appendChild(c),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function ka(e,r,t){var n=t||R,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ke(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=ze(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=a.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var p=a.querySelector(".renuvex-pr-modal-reply");p.querySelector(".renuvex-pr-modal-reply-label").textContent=H(n&&n.merchantReplyLabel,"Ma\u011Faza Sahibi"),p.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",p.style.display=r.merchantReply?"":"none",e.scrollTop=0}function ct(e,r,t,n,a,i,o,l,p){var u=Je(e),m=Math.max(0,Math.min(t||0,u.length-1)),c=u[m],s=document.createElement("div");s.className="renuvex-pr-modal-left";var v=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(c&&c.type==="video"){var x=document.createElement("video");x.className="renuvex-pr-modal-main-video"+(v?" renuvex-pr-modal-video-enter":""),x.setAttribute("aria-label","Yorum videosu"),x.addEventListener("error",function(){if(!s.querySelector(".renuvex-pr-modal-img-error")){var h=document.createElement("div");h.className="renuvex-pr-modal-img-error",h.setAttribute("role","status"),h.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",s.insertBefore(h,x)}}),s.__renuvexMediaCleanup=ya(x,c),s.appendChild(x)}else{var d=document.createElement("img");if(d.className="renuvex-pr-modal-main-img"+(v?" "+v:""),d.src=lt(c?c.url:""),d.decoding="async",d.width=ot,d.height=Math.round(ot*4/3),d.alt="Yorum foto\u011Fraf\u0131",!v){d.classList.add("renuvex-pr-modal-img-loading");var f=function(){d.classList.remove("renuvex-pr-modal-img-loading")};d.complete&&d.naturalWidth>0?f():(d.addEventListener("load",f,{once:!0}),d.addEventListener("error",f,{once:!0}))}ra(d,function(h){if(h.style.display="none",!s.querySelector(".renuvex-pr-modal-img-error")){var _=document.createElement("div");_.className="renuvex-pr-modal-img-error",_.setAttribute("role","status"),_.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",s.insertBefore(_,h)}}),s.appendChild(d)}var g=document.createElement("button");g.className="renuvex-pr-modal-close-mobile";var y=ee(we);y&&g.appendChild(y),g.setAttribute("aria-label","Kapat"),g.onclick=function(h){h.stopPropagation(),i()},s.appendChild(g);var w=0;if(s.addEventListener("touchstart",function(h){w=h.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",function(h){var _=w-h.changedTouches[0].clientX;if(!(Math.abs(_)<50)){if(_>0){if(z)Ee(e,r,m+1,n,a,i,!0,"next",l,p);else if(k){var L=n[r+1];Ee(L,r+1,0,n,a,i,!1,"next",l,p)}}else if(T)Ee(e,r,m-1,n,a,i,!0,"prev",l,p);else if(b){var M=n[r-1],B=Je(M);Ee(M,r-1,B.length-1,n,a,i,!1,"prev",l,p)}}},{passive:!0}),u.length>1){var E=document.createElement("div");E.className="renuvex-pr-modal-thumbs",u.forEach(function(h,_){var L=h.type==="video"?h.posterUrl:h.url,M=document.createElement("img"),B=Lr(L,Nr);M.src=B.src,M.srcset=B.srcset,M.loading="lazy",M.decoding="async",M.width=Nr,M.height=Nr,M.className="renuvex-pr-modal-thumb"+(_===m?" renuvex-pr-modal-thumb-active":""),M.alt="K\xFC\xE7\xFCk resim "+(_+1),Rr(M),M.tabIndex=0,M.setAttribute("role","button"),M.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(_+1)+" se\xE7"),_===m&&M.setAttribute("aria-current","true"),(function(K){function q(){Ee(e,r,K,n,a,i,!0,null,l,p)}M.onclick=q,M.onkeydown=function(U){(U.key==="Enter"||U.key===" ")&&(U.preventDefault(),q())}})(_),E.appendChild(M)}),s.appendChild(E)}var T=m>0,z=m<u.length-1,b=r>0,k=r<n.length-1,C=T||b,S=z||k;if(C){var A=document.createElement("button");A.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var N=ee(We);N&&A.appendChild(N),A.setAttribute("aria-label","\xD6nceki"),A.onclick=function(h){if(h.stopPropagation(),T)Ee(e,r,m-1,n,a,i,!0,"prev",l,p);else if(b){var _=n[r-1],L=Je(_);Ee(_,r-1,L.length-1,n,a,i,!1,"prev",l,p)}},s.appendChild(A)}if(S){var I=document.createElement("button");I.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var P=ee(Tr);P&&I.appendChild(P),I.setAttribute("aria-label","Sonraki"),I.onclick=function(h){if(h.stopPropagation(),z)Ee(e,r,m+1,n,a,i,!0,"next",l,p);else if(k){var _=n[r+1];Ee(_,r+1,0,n,a,i,!1,"next",l,p)}},s.appendChild(I)}return s}function za(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Je(n);a[0]&&a[0].type==="image"&&(new Image().src=lt(a[0].url))}})}function st(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Vn(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){st(t),st(n),st(a)}i(),t&&ve(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function Ee(e,r,t,n,a,i,o,l,p,u){if(u&&(u.currentReview=e),o){var m=ct(e,r,t,n,a,i,l,p,u);a.firstChild&&(vt(a.firstChild),a.replaceChild(m,a.firstChild))}else{var m=ct(e,r,t,n,a,i,l,p,u),c=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&(vt(a.firstChild),a.replaceChild(m,a.firstChild)),c&&ka(c,e,u&&u.currentSettings),Vn(p,a)}za(r,n)}function ge(e,r,t){var n=Je(e);if(!n.length)return;var a=(t||[]).filter(function(k){return Je(k).length>0}),i=a.findIndex(function(k){return k===e||k.id===e.id});i===-1&&(a.unshift(e),i=0);var o=n.findIndex(function(k){return k.url===r});o<0&&(o=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var p=document.createElement("div");p.className="renuvex-pr-modal";var u=!1,m=null,c=Vr(),s=Me(),v=Ur(),x=Yr(),d={currentReview:e,currentSettings:R},f=null;function g(k){var C=k&&k.detail&&k.detail.settings;if(!(C&&C===f)){f=C||null,d.currentSettings=C||R;var S=p.querySelector(".renuvex-pr-modal-right");!S||!d.currentReview||ka(S,d.currentReview,d.currentSettings)}}function y(){u||(u=!0,window.removeEventListener(Oe,g),wa(m&&m.host,w,y,v,c,s))}function w(k){if(k.key==="Escape"){E();return}Dr(k,l,m&&m.root)}function E(){u||(u=!0,window.removeEventListener(Oe,g),wa(m&&m.host,w,y,v,c,s),jr(x))}document.addEventListener("keydown",w),window.addEventListener("popstate",y),window.addEventListener(Oe,g),l.onclick=function(){E()},p.onclick=function(k){k.stopPropagation()},p.appendChild(ct(e,i,o,a,p,E,null,l,d)),p.appendChild(Hn(e)),za(i,a);var T=document.createElement("div");T.className="renuvex-pr-modal-wrap",T.tabIndex=-1,T.setAttribute("role","dialog"),T.setAttribute("aria-modal","true"),T.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),T.appendChild(p);var z=document.createElement("button");z.className="renuvex-pr-modal-close";var b=ee(we);b&&z.appendChild(b),z.setAttribute("aria-label","Kapat"),z.onclick=function(k){k.stopPropagation(),E()},T.appendChild(z),l.appendChild(T),m=Fr(),Ke(m.root,Ge+je+Or),m.root.appendChild(l),Fe(m.root),ve(T)}function dr(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(n){(n.key==="Enter"||n.key===" "||n.key==="Spacebar")&&(n.preventDefault(),r())})}var wt={};Pe(wt,{css:()=>Ei,meta:()=>Ci,render:()=>Ti});function Ze(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;Ne(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var p=r[l-1]||0,u=t>0?Math.round(p/t*100):0,m=a===l,c=p>0,s=H(R&&R.countLabel,"Yorum"),v=document.createElement("div");v.className="renuvex-pr-bar-row"+(c?"":" renuvex-pr-bar-empty")+(m?" renuvex-pr-bar-active":"")+(a&&!m?" renuvex-pr-bar-dimmed":""),c?(v.setAttribute("role","button"),v.setAttribute("tabindex","0"),v.setAttribute("aria-pressed",m?"true":"false"),v.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+p.toLocaleString("tr-TR")+" "+s+", "+(m?"filtreyi kald\u0131r":"filtrele"))):v.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+s);for(var x="",d=1;d<=5;d++){var f=d<=l;x+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(f?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ue(f?"full":"outline")+"</span>"}v.innerHTML='<span class="renuvex-pr-bar-label">'+x+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+p.toLocaleString("tr-TR")+")</span>",c&&(function(g){function y(){i(g)}v.onclick=y,v.onkeydown=function(w){(w.key==="Enter"||w.key===" "||w.key==="Space"||w.key==="Spacebar")&&(w.preventDefault(),y())}})(l),o.appendChild(v)}return o}var Ea="data-renuvex-pr-dismiss-gesture",He=[],Sa=!1,Wr=!1,ur=[],$e=null;function Ca(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function mt(){for(var e=He.length-1;e>=0;e--){var r=He[e].element;r&&r.isConnected===!1&&He.splice(e,1)}return He}function Dn(e){!e||typeof e.setAttribute!="function"||(ur.indexOf(e)===-1&&ur.push(e),e.setAttribute(Ea,""))}function Ta(){for(var e=0;e<ur.length;e++){var r=ur[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Ea)}ur=[],$e&&typeof clearTimeout=="function"&&clearTimeout($e),$e=null}function Yn(e){if(Wr){Wr=!1,Ta(),e.preventDefault(),e.stopPropagation();return}for(var r=mt(),t=!1,n=r.length-1;n>=0;n--){var a=r[n];Ca(e,a.trigger)||Ca(e,a.element)||a.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function jn(e){if(e.key==="Escape")for(var r=mt(),t=r.length-1;t>=0;t--)r[t].close()}function Aa(){Sa||typeof document=="undefined"||(document.addEventListener("click",Yn,!0),document.addEventListener("keydown",jn),Sa=!0)}function Wn(e){Aa(),Wr=!0,Dn(e),$e&&typeof clearTimeout=="function"&&clearTimeout($e),typeof setTimeout=="function"&&($e=setTimeout(function(){Wr=!1,Ta()},700))}function ft(e){Wn(e)}function qr(e){Aa();var r={trigger:e.trigger,element:e.element,close:e.close};return He.push(r),{unregister:function(){var t=He.indexOf(r);t!==-1&&He.splice(t,1)},notifyOpening:function(){for(var t=mt(),n=0;n<t.length;n++)t[n]!==r&&t[n].close()}}}function pe(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=H(R&&R.writeButtonText,"Yorum Yap"),l.onclick=a,o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var m=R&&R.filterIcon||"lines";u.innerHTML=se(Xt(m));var c=document.createElement("div");c.className="renuvex-pr-filter-menu",c.setAttribute("role","menu");var s=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function x(){return r&&r.parentNode||r||null}function d(w,E){if(!(E===!0||!w)){if(w.type==="touchstart"){ft(x());return}if(w.type==="pointerdown"){var T=w.pointerType||"";T&&T!=="mouse"&&ft(x());return}}}function f(w){var E=c.classList.contains("renuvex-pr-open");c.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var T=w&&(w.restoreFocus===!0||w.restoreFocus==="auto"&&Me());if(E&&T)try{u.focus({preventScroll:!0})}catch(z){try{u.focus()}catch(b){}}return E}function g(){y.notifyOpening(),c.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var w=c.querySelector(".renuvex-pr-filter-item-active")||c.querySelector(".renuvex-pr-filter-item");w&&requestAnimationFrame(function(){try{w.focus({preventScroll:!0})}catch(E){try{w.focus()}catch(T){}}})}s.forEach(function(w){var E=w[2],T=E?n:!n&&(t||"newest")===w[0],z=document.createElement("button");z.type="button",z.className="renuvex-pr-filter-item"+(T?" renuvex-pr-filter-item-active":""),z.setAttribute("role","menuitem"),z.textContent=w[1];var b=!1;function k(C,S){C&&(C.preventDefault(),C.stopPropagation()),!b&&(b=!0,v=!0,d(C,S),f({restoreFocus:S}),i(w[0],E),setTimeout(function(){b=!1,v=!1},0))}z.addEventListener("pointerdown",function(C){C.button!==void 0&&C.button!==0||C.pointerType!=="mouse"&&k(C,!1)}),typeof window!="undefined"&&!window.PointerEvent&&z.addEventListener("touchstart",function(C){k(C,!1)},{passive:!1}),z.addEventListener("keydown",function(C){(C.key==="Enter"||C.key===" ")&&k(C,!0)}),z.onclick=function(C){k(C,!1)},c.appendChild(z)}),u.onclick=function(){c.classList.contains("renuvex-pr-open")?f({restoreFocus:"auto"}):g()},p.addEventListener("keydown",function(w){w.key==="Escape"&&c.classList.contains("renuvex-pr-open")&&(w.stopPropagation(),f({restoreFocus:!0}))}),p.addEventListener("focusout",function(w){if(c.classList.contains("renuvex-pr-open")&&!v){var E=w.relatedTarget;E&&p.contains(E)||f()}});var y=qr({trigger:p,element:c,close:f});return p.appendChild(u),p.appendChild(c),o.appendChild(p),o}var Pa=`
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
  .renuvex-pr-fwizard-media-card--photo-selected > .renuvex-pr-fwizard-media-action,
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
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-height:122px;
    gap:12px;
    text-align:center;
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
  .renuvex-pr-fwizard-video-details--failed{
    align-items:center;
    gap:12px;
    width:100%;
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
  .renuvex-pr-fwizard-video-retry{
    align-self:center;
    width:100%;
    min-height:50px;
    padding:14px 20px;
    border:1px solid transparent;
    border-radius:var(--renuvex-pr-radius-sm,8px);
    background:var(--renuvex-pr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--renuvex-pr-fwizard-btn-text, #ffffff);
    font:inherit;
    font-size:15px;
    font-weight:600;
    cursor:pointer;
    text-decoration:none;
    box-sizing:border-box;
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
  .renuvex-pr-fwizard-submit-btn--video-pending{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:12px;
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
`;function Ma(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,n=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,a=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var p=document.createElement("button");p.className="renuvex-pr-fwizard-close",p.type="button",p.setAttribute("aria-label","Kapat");var u=ee(we);u&&p.appendChild(u),o.appendChild(p);var m=!1,c=null,s=null,v=!1;function x(){ve(i)}function d(b){Dr(b,i,c&&c.root)}function f(){if(!m){if(m=!0,document.removeEventListener("keydown",g),i.removeEventListener("click",y),p.removeEventListener("click",f),v)ve(s);else{var b=c&&c.root?c.root.activeElement:null;if(b&&typeof b.blur=="function")try{b.blur()}catch(k){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){c?(Er(c.root),c.host&&c.host.parentNode&&c.host.parentNode.removeChild(c.host)):i.parentNode&&i.parentNode.removeChild(i),Hr();try{r()}catch(k){}},200)}}function g(b){if(b.key==="Escape"){f();return}d(b)}function y(b){b.target===i&&a&&f()}document.addEventListener("keydown",g),i.addEventListener("click",y),p.addEventListener("click",f);function w(b){s=t||Vr(),v=n===null?Me():n,b&&l.appendChild(b),c=Fr(),Ke(c.root,Ge+je+Pa),c.root.appendChild(i),Fe(c.root),Ur(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),x()})}var E=null,T=null;function z(b,k){if(k=k||"error",E){try{E.remove()}catch(C){}E=null}T&&(clearTimeout(T),T=null),E=document.createElement("div"),E.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,E.textContent=b,o.appendChild(E),T=setTimeout(function(){E&&(E.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(E){try{E.remove()}catch(C){}E=null}},300))},4e3)}return{open:w,close:f,content:l,setAllowOutsideClose:function(b){a=!!b},setStepAttr:function(b){o.setAttribute("data-step",String(b))},showToast:z}}var xt=4;function Qe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function _a(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<xt&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}function Na(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=se(We)+"<span>Geri</span>",l.addEventListener("click",function(){n()}),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-footer-progress";for(var u=[],m=0;m<xt;m++){var c=document.createElement("span");c.className="renuvex-pr-fwizard-progress-seg",p.appendChild(c),u.push(c)}o.appendChild(p);var s=document.createElement("button");s.type="button";var v=null;function x(f){v&&s.removeEventListener("click",v),v=f,f&&s.addEventListener("click",f)}o.appendChild(s);function d(f,g){var y=r.indexOf(f)!==-1,w=t.indexOf(f)!==-1,E=g&&(g.images&&g.images.length>0||g.pendingImages&&g.pendingImages.length>0||!!g.videoUpload);if(y)f===2&&E?(s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Devam Et"),s.innerHTML="Devam Et",x(function(){i()})):(s.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",s.setAttribute("aria-label","Atla"),s.innerHTML="<span>Atla</span>",x(function(){a()})),s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),s.style.visibility="",s.tabIndex=0;else if(w){s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Sonraki"),s.innerHTML="Sonraki",s.style.visibility="",s.tabIndex=0;var T=Qe(f,g);s.disabled=!T,s.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!T),x(function(){s.disabled||i()})}else s.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",s.innerHTML="",s.style.visibility="hidden",s.tabIndex=-1,s.disabled=!0,x(null)}return{el:o,update:function(f,g){u.forEach(function(w,E){E+1<=f?w.classList.add("renuvex-pr-fwizard-progress-seg-active"):w.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var y=f<=1;l.style.visibility=y?"hidden":"",l.style.pointerEvents=y?"none":"",l.tabIndex=y?-1:0,d(f,g)},setNextDisabled:function(f){s.classList.contains("renuvex-pr-fwizard-cta-btn")&&(s.disabled=!!f,s.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",p.style.visibility="hidden",s.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",s.setAttribute("aria-label","Devam Et"),s.innerHTML="Devam Et",s.style.visibility="",s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),x(f)}}}var qn={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ce(e){var r=R&&R[e];return!r&&e==="formStepMediaTitle"&&(r=R&&R.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=R&&R.formStepPhotosSubtitle),H(r,qn[e])}function La(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ce("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=lr(R||{});Ne(l);var p=[];function u(f){p.forEach(function(g,y){var w=y<f;g.classList.toggle("renuvex-pr-fwizard-star-active",w),g.setAttribute("aria-checked",y+1===f?"true":"false"),g.innerHTML=w?ue("full"):ue("outline")})}function m(f){e.set({rating:f}),u(f)}function c(f){var g=p[f-1];if(g)try{g.focus()}catch(y){}}function s(f,g){g&&typeof g.preventDefault=="function"&&g.preventDefault(),g&&typeof g.stopPropagation=="function"&&g.stopPropagation(),!n&&(n=!0,m(f),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var v=1;v<=5;v++)(function(f){var g=document.createElement("button");g.type="button",g.className="renuvex-pr-fwizard-star",g.setAttribute("role","radio"),g.setAttribute("aria-label",f+" y\u0131ld\u0131z"),g.innerHTML=ue("outline"),g.addEventListener("mouseenter",function(){u(f)}),g.addEventListener("mouseleave",function(){u(e.get().rating)}),g.addEventListener("pointerdown",function(y){y.button&&y.button!==0||s(f,y)}),typeof window!="undefined"&&!window.PointerEvent&&g.addEventListener("touchstart",function(y){s(f,y)},{passive:!1}),g.addEventListener("mousedown",function(y){window.PointerEvent||s(f,y)}),g.addEventListener("keydown",function(y){if(y.key==="Enter"||y.key===" "){s(f,y);return}var w=0;y.key==="ArrowRight"||y.key==="ArrowUp"?w=Math.min(5,f+1):y.key==="ArrowLeft"||y.key==="ArrowDown"?w=Math.max(1,f-1):y.key==="Home"?w=1:y.key==="End"&&(w=5),w&&(y.preventDefault(),m(w),c(w))}),g.addEventListener("click",function(y){s(f,y)}),p.push(g),o.appendChild(g)})(v);u(e.get().rating);var x=null,d=function(f){var g=f&&f.detail&&f.detail.settings;g&&g===x||(x=g||null,l=lr(g||R||{}),u(e.get().rating))};return window.addEventListener(Oe,d),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Oe,d)}}}var Gr=3,Gn=10*1024*1024;function Kr(e,r){r=r||{};var t=!1,n=r.hideAddButton===!0,a=r.revealAddButtonAfterMedia===!0,i=!n||a,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepPhotosTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=ce("formStepPhotosSubtitle"),o.appendChild(p)}var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&u.classList.add("renuvex-pr-fwizard-photo-card--embedded");var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add",m.setAttribute("aria-label","Foto\u011Fraf ekle");var c=document.createElement("input");c.type="file",c.accept="image/*",c.multiple=!0,c.style.display="none",i&&u.appendChild(m),u.appendChild(c);var s=document.createElement("div");s.className="renuvex-pr-fwizard-photo-previews",s.setAttribute("aria-live","polite"),u.appendChild(s),o.appendChild(u);var v=r.revokeBlobUrl||function(T){T&&typeof T=="string"&&T.startsWith("blob:")&&URL.revokeObjectURL(T)},x=r.blobMap||{},d=r.urlToFinger||{};function f(){if(!t){var T=e.get().images||[],z=e.get().pendingImages||[],b=T.map(function(k){return{url:k,isPending:!1}}).concat(z.map(function(k){return{url:k.url,file:k.file,isPending:!0,error:k.error}}));s.innerHTML="",b.forEach(function(k){var C=x[k.url]||k.url,S=g(k,C);s.appendChild(S)}),w()}}function g(T,z){var b=document.createElement("div");b.className="renuvex-pr-fwizard-photo-thumb";var k=document.createElement("img");k.src=z,k.alt="",k.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",b.appendChild(k);var C=document.createElement("div");C.className="renuvex-pr-fwizard-photo-loading",C.style.display="none",b.appendChild(C);var S=document.createElement("button");S.type="button",S.className="renuvex-pr-fwizard-photo-remove",S.setAttribute("aria-label","Kald\u0131r");var A=ee(we);return A&&S.appendChild(A),b.appendChild(S),y(b,T,z),b}function y(T,z,b){var k=T.querySelector("img");k.src!==b&&(k.src=b);var C=T.querySelector(".renuvex-pr-fwizard-photo-loading");if(z.isPending&&z.error){C.style.display="flex",C.textContent="";var S=document.createElement("span");S.className="renuvex-pr-upload-error",S.textContent="\u2717 "+z.error,C.appendChild(S)}else C.style.display="none",C.textContent="";var A=T.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var N=d[z.url]||(z.file?z.file.name+"_"+z.file.size:null),I=x[z.url],P={};N&&(P.fingerprints=(e.get().fingerprints||[]).filter(function(h){return h!==N})),z.isPending?P.pendingImages=(e.get().pendingImages||[]).filter(function(h){return h.url!==z.url}):P.images=(e.get().images||[]).filter(function(h){return h!==z.url}),e.set(P),v(z.url),v(I),delete d[z.url],I&&delete d[I],x[z.url]&&delete x[z.url]}}function w(){var T=(e.get().images||[]).length,z=(e.get().pendingImages||[]).length,b=T+z,k=b>=Gr;u.classList.toggle("renuvex-pr-fwizard-photo-card--compact",b>0),i&&(m.innerHTML=b>0?se(Zt):se(Ar)+"<span>Foto\u011Fraf Ekle</span>"),k?(i&&(m.style.display="none"),m.disabled=!0,c.disabled=!0):(i&&(m.style.display=a&&b===0?"none":"flex"),m.disabled=!1,c.disabled=!1,m.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}m.addEventListener("click",function(){c.disabled||c.click()}),c.onchange=async function(T){var z=(e.get().images||[]).length+(e.get().pendingImages||[]).length,b=Array.from(T.target.files).slice(0,Gr-z);c.value="";var k=(e.get().pendingImages||[]).length,C=e.get().images||[],S=C.length;if(b.length!==0){for(var A=[],N=[],I=0;I<b.length;I++){var P=b[I],h=P.name+"_"+P.size,_=(e.get().fingerprints||[]).some(function(D){return D===h})||A.some(function(D){return D.file.name+"_"+D.file.size===h});if(!_){if(P.size>Gn){var L="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(L,"error"):alert(L);continue}var M=URL.createObjectURL(P);d[M]=h,A.push({url:M,file:P,error:null}),N.push({url:M,file:P});var B=(e.get().fingerprints||[]).slice();B.push(h),e.set({fingerprints:B})}}if(A.length!==0){var K=(e.get().pendingImages||[]).concat(A),q=async function(){for(var D=0;D<N.length;D++){var G=N[D],X=G.file,Y=G.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var J=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==Y}),F=(e.get().images||[]).slice();F.push(Y),e.set({pendingImages:J,images:F});continue}try{var O=await Se(ye+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de})});if(!O.ok)throw O.status===429?new Error("rate_limit"):new Error("sign failed");var j=await O.json();if(!j.folder)throw new Error("sign folder missing");var ae=new FormData;ae.append("file",X),ae.append("api_key",j.api_key),ae.append("timestamp",j.timestamp),ae.append("signature",j.signature),ae.append("folder",j.folder);var W=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:ae}),$=await W.json();if($.secure_url&&Mr($.secure_url)){var xr=(e.get().pendingImages||[]).some(function(Q){return Q.url===Y});if(!xr)continue;x[$.secure_url]=Y,d[$.secure_url]=d[Y];var Ae=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==Y}),V=(e.get().images||[]).slice();V.push($.secure_url),e.set({pendingImages:Ae,images:V});try{Se(ye+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,secureUrl:$.secure_url,metadata:{assetId:$.asset_id,publicId:$.public_id,version:$.version,resourceType:$.resource_type,format:$.format,width:$.width,height:$.height,bytes:$.bytes,signature:$.signature}})}).catch(function(){})}catch(Q){}}else throw new Error("invalid image url")}catch(Q){console.error("[renuvex-pr] Image upload failed:",Q);var ne=Q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ne,"error");var me=(e.get().pendingImages||[]).map(function(be){return be.url===Y?{url:be.url,file:be.file,error:ne}:be});e.set({pendingImages:me})}}};if(S===0&&k===0){t=!0;var U=!r.canNavigate||r.canNavigate();U&&e.goNext()}e.set({pendingImages:K}),q()}}};var E=e.onChange(f);return f(),{el:o,openPicker:function(){c.disabled||c.click()},destroy:function(){t=!0,c.onchange=null,E&&E()}}}var Kn=150*1024*1024,Xn=2,Jn=60,Oa=8192,Ua=5,Zn=3e4,$n=["video/mp4","video/quicktime"],Qn="renuvex_pr_video_upload_",Ha="renuvex_pr_video_cancel_",sr=null,Ra=!1,ei={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},ri={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},he=class extends Error{constructor(r,t,n){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=n||null}};function Va(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:ei[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:ri[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function Da(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function gt(e){return new Promise(function(r){setTimeout(r,e)})}function er(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function rr(e){return Math.max(0,Math.round(er()-e))}function ti(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return Zn}function ai(e,r){return new Promise(function(t,n){var a=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(a),r&&r.removeEventListener("abort",o),n(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function ht(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function bt(e,r){return Qn+de+"_"+e+"_"+ht(r)}function Ya(e,r){try{var t=window.sessionStorage.getItem(bt(e,r)),n=t?JSON.parse(t):null;return!n||typeof n.token!="string"||!n.expiresAt||new Date(n.expiresAt).getTime()<=Date.now()?null:n}catch(a){return null}}function ni(e,r,t){try{window.sessionStorage.setItem(bt(e,r),JSON.stringify(t))}catch(n){}}function cr(e,r){try{window.sessionStorage.removeItem(bt(e,r))}catch(t){}}function ii(e,r){return Ha+de+"_"+e+"_"+ht(r)}function oi(e,r,t,n){if(!(!e||!r||!t)){var a={token:e,productId:r,expiresAt:n||null};try{window.sessionStorage.setItem(ii(r,t),JSON.stringify(a))}catch(i){}}}function li(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(Ha+de+"_")!==0)){var n=window.sessionStorage.getItem(t),a=n?JSON.parse(n):null;if(!a||typeof a.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:a.token})}}}catch(i){}return e}function Ia(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function tr(e,r,t){var n=await Se(ye+e,r,t||2e4),a=await n.json().catch(function(){return{}});if(!n.ok){var i=Number(n.headers.get("Retry-After"));throw new he(a.error||"video_request_failed",n.status,Number.isFinite(i)&&i>0?i:null)}return a.data||{}}async function vr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await tr("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:rr(r.startedAt),finalStatus:t})},4e3)}catch(n){}}async function pi(e){try{return await tr("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Ia(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Ia(e.key),!0):!1}}function Xr(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():sr||(sr=(async function(){for(var e=li(),r=0;r<e.length;r+=1)await pi(e[r])})().finally(function(){sr=null}),sr)}function Jr(){typeof window=="undefined"||Ra||(Ra=!0,window.addEventListener("online",function(){Xr()}),Xr())}async function di(){var e=await import("./upchunk-QJXCGVJW.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function Ba(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var ui={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function si(e){return ui[e]!==!0}async function vi(e){var r=await di();return new Promise(function(t,n){var a=!1,i=null,o=null,l=ti(),p=null;function u(x){a||(a=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",v),p&&p(),x?n(x):t())}function m(x){a||(o&&clearTimeout(o),!(!x&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!a){e.onUploadError&&e.onUploadError("video_upload_stalled"),u(new he("video_upload_stalled",0,null));try{i&&i.abort()}catch(d){}}},l)))}function c(){return a?!1:(m(),!0)}function s(){if(!a){e.onUploadError&&e.onUploadError("video_upload_offline"),u(new he("video_upload_offline",0,null));try{i&&i.abort()}catch(x){}}}function v(){try{i&&i.abort()}catch(x){}u(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return n(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",v,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||Oa,attempts:e.chunkAttempts||Ua,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",s),p=function(){window.removeEventListener("offline",s)}),typeof navigator!="undefined"&&navigator.onLine===!1){s();return}m(),i.on("attempt",function(){c()&&e.onStatus("uploading")}),i.on("attemptFailure",function(x){if(c()){var d=x&&x.detail,f=Ba(d);if(e.onAttemptFailure&&e.onAttemptFailure(f),si(f)){e.onUploadError&&e.onUploadError(f),u(new he(f,0,null));try{i&&i.abort()}catch(g){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){c()}),i.on("progress",function(x){if(c()){var d=Number(x&&x.detail);if(Number.isFinite(d)){var f=Math.min(95,Math.max(0,Math.round(d*.95)));Number.isFinite(e.minProgress)&&(f=Math.max(e.minProgress,f)),e.onProgress(f)}}}),i.on("offline",s),i.on("error",function(x){if(c()){var d=x&&x.detail,f=Ba(d);e.onUploadError&&e.onUploadError(f),u(new he(f,0,null))}}),i.on("success",function(){c()&&(e.onProgress(95),u())})})}function ci(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function Fa(e,r,t){for(var n=Date.now(),a=n+600*1e3,i=0;Date.now()<a;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-n;try{var l=await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new he(l.errorCode||"video_processing_failed",409,null)}catch(p){if(r.aborted||p instanceof he&&p.status===409||Da(p)||(i+=1,i>=3))throw p}await ai(ci(o),r)}throw new he("video_processing_delayed",0,null)}async function mi(e){for(var r=null,t=1;t<=3;t+=1)try{return await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(n){if(Da(n))return null;r=n,t<3&&await gt(400*t)}throw r||new Error("video_status_failed")}async function fi(e,r,t,n){for(var a=10;a<=90;a+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(a),await gt(120)}return n("processing"),await gt(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function ja(e){return!e||$n.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>Kn?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function Wa(e){return new Promise(function(r){var t=URL.createObjectURL(e),n=document.createElement("video"),a=!1;function i(o){if(!a){a=!0,n.removeAttribute("src");try{n.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}n.preload="metadata",n.onloadedmetadata=function(){i(Number.isFinite(n.duration)?n.duration:null)},n.onerror=function(){i(null)},n.src=t,setTimeout(function(){i(null)},8e3)})}function qa(e){return e===null?{ok:!0}:e<Xn||e>Jn?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function Ga(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return fi(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:er(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(x){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=x||"upload_attempt_failed")}function n(){cr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function a(x,d){var f=await mi(x);if(!f)return{action:"discard"};if(f.status==="ready")return e.onToken&&e.onToken(x),e.onProgress(100),cr(e.productId,e.file),await vr(x,r,"ready"),{action:"return",value:Object.assign({token:x},f)};if(f.status==="uploaded"||f.status==="processing"){e.onToken&&e.onToken(x),e.onStatus("processing");var g=er(),y=await Fa(x,e.signal,e.onStatus);return r.processingPollMs=rr(g),cr(e.productId,e.file),e.onProgress(100),await vr(x,r,"ready"),{action:"return",value:Object.assign({token:x},y)}}return f.status==="failed"||f.status==="aborted"?{action:"discard"}:!d||typeof d.uploadUrl!="string"||!d.uploadUrl?{action:"discard"}:{action:"upload"}}Jr(),await Xr();var i=Ya(e.productId,e.file),o=i&&i.token,l=i;if(o){var p=await a(o,l);if(p.action==="return")return p.value;p.action==="discard"&&(n(),o=null,l=null)}for(;;){if(!o){var u=await tr("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:ht(e.file)})});o=u.token,l=u,ni(e.productId,e.file,u)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||Oa,r.chunkAttempts=l.chunkAttempts||Ua,e.onStatus("uploading");var m=er();try{await vi({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+rr(m),e.onStatus("processing");var c=er();await tr("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=rr(c);var s=er(),v=await Fa(o,e.signal,e.onStatus);return r.processingPollMs=rr(s),cr(e.productId,e.file),e.onProgress(100),await vr(o,r,"ready"),Object.assign({token:o},v)}catch(x){throw r.directUploadMs=(r.directUploadMs||0)+rr(m),e.signal&&e.signal.aborted?(await vr(o,r,"aborted"),x):(await vr(o,r,"failed"),x)}}}async function Zr(e,r,t){var n=r&&t?Ya(r,t):null;e&&r&&t&&oi(e,r,t,n&&n.expiresAt),r&&t&&cr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(Jr(),await Xr())}function Ka(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function xi(e){return"Video Y\xFCkleniyor"}function gi(e){return!0}function Xa(e,r){r=r||{};var t=!1,n=null,a=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepMediaTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=ce("formStepMediaSubtitle"),o.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-card";var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",m.setAttribute("aria-label","Foto\u011Fraf ekle"),m.innerHTML=se(Ar)+"<span>Foto\u011Fraf Ekle</span>";var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",c.setAttribute("aria-label","Video ekle"),c.innerHTML=se(Pr)+"<span>Video Ekle</span>",u.appendChild(m),u.appendChild(c);var s=document.createElement("div");s.className="renuvex-pr-fwizard-media-content",u.appendChild(s),o.appendChild(u);var v=document.createElement("input");v.type="file",v.accept="video/mp4,video/quicktime,.mp4,.mov",v.style.display="none",o.appendChild(v);function x(){var h=e.get();return(h.images||[]).length>0||(h.pendingImages||[]).length>0}function d(){var h=e.get();return(h.images||[]).length+(h.pendingImages||[]).length}function f(){return e.get().videoUpload||null}function g(){return i+=1,i}function y(h,_){var L=f();return i===h&&!!L&&L.controller===_}function w(){if(!a){s.innerHTML="";return}a.retry.onclick=null,s.innerHTML="",a=null}function E(){n&&(n.destroy&&n.destroy(),n=null)}function T(h){E(),s.innerHTML="";var _=Ka(h),L=document.createElement("div");L.className=_==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":_==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var M=null,B=null,K=null,q=null,U=document.createElement("button");if(U.type="button",U.className="renuvex-pr-fwizard-video-retry",U.textContent="Tekrar dene",U.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),_==="ready"){var D=h.posterUrl||h.localUrl||"";D&&D!==h.localUrl?(M=document.createElement("img"),M.alt="",M.src=D):(M=document.createElement("video"),M.muted=!0,M.playsInline=!0,M.preload="metadata",M.src=h.localUrl||""),M.className="renuvex-pr-fwizard-video-preview",L.appendChild(M)}else _==="busy"?(q=document.createElement("div"),q.className="renuvex-pr-fwizard-video-uploading-status",q.setAttribute("role","status"),q.setAttribute("aria-live","polite"),L.appendChild(q)):B=L;if(_==="ready"){let J=function(F){F&&(F.preventDefault(),F.stopPropagation()),A()};var Y=J,G=document.createElement("button");G.type="button",G.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",G.setAttribute("aria-label","Videoyu kald\u0131r");var X=ee(we);X&&G.appendChild(X),G.addEventListener("pointerdown",J),G.addEventListener("click",J),L.appendChild(G)}s.appendChild(L),a={mode:_,card:L,preview:M,previewUrl:_==="ready"&&(h.posterUrl||h.localUrl)||"",details:B,name:K,status:q,retry:U}}function z(){if(!t){var h=f();if(!h){w();return}var _=Ka(h),L=_==="ready"&&(h.posterUrl||h.localUrl)||"";if((!a||a.mode!==_||a.previewUrl!==L)&&T(h),a.name&&(a.name.textContent=h.file?h.file.name:"Video"),a.status&&_==="busy"){var M=xi(h),B=gi(h)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+M+"</span>":"<span>"+M+"</span>";a.status.innerHTML!==B&&(a.status.innerHTML=B)}var K=_==="failed"&&!!(h.error&&h.file&&h.retryable!==!1);a.retry.onclick=K?function(){S(h.file,h.localUrl,h.durationMs)}:null,K&&a.details&&!a.retry.isConnected?a.details.appendChild(a.retry):!K&&a.retry.isConnected&&a.retry.remove()}}function b(){var h=x(),_=d()>=Gr,L=!!f(),M=h||L;m.hidden=M,c.hidden=M,m.disabled=L||_,c.disabled=h||L,u.classList.toggle("renuvex-pr-fwizard-media-card--has-media",M),u.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",h),u.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",L),m.classList.toggle("renuvex-pr-fwizard-media-action--active",h),c.classList.toggle("renuvex-pr-fwizard-media-action--active",L)}function k(h){var _=f();if(_){var L=Object.keys(h),M=L.some(function(B){return _[B]!==h[B]});M&&e.set({videoUpload:Object.assign({},_,h)})}}function C(h,_,L){y(h,_)&&k(L)}async function S(h,_,L){var M=f(),B=!!(_&&M&&M.file===h),K=B?Math.max(0,Math.min(95,Number(M.progress)||0)):0,q=B?(Number(M.retryClicks)||0)+1:0,U=ja(h);if(!U.ok){r.showToast&&r.showToast(U.message,"error");return}var D=_||URL.createObjectURL(h),G=Number.isFinite(L)?L:null,X=new AbortController,Y=g();e.set({videoUpload:{file:h,localUrl:D,token:B&&M.token||null,status:"uploading",progress:K,durationMs:G,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:q,controller:X}}),!B&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var J=L!==void 0?Number.isFinite(L)?L/1e3:null:await Wa(h),F=qa(J);if(!F.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:F.message});var O=await Ga({file:h,productId:e.get().productId,signal:X.signal,minProgress:K,retryClicks:q,onToken:function(W){C(Y,X,{token:W})},onProgress:function(W){C(Y,X,{progress:W})},onStatus:function(W){C(Y,X,{status:W})},onSessionReset:function(){C(Y,X,{token:null,progress:0})}});if(!y(Y,X))return;if(O.previewOnly&&O.posterUrl&&O.posterUrl!==D)try{URL.revokeObjectURL(O.posterUrl)}catch(W){}k({token:O.token,status:"ready",progress:100,posterUrl:O.previewOnly?D:O.posterUrl,durationMs:O.durationMs||(J===null?null:Math.round(J*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),B&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(W){if(X.signal.aborted||!y(Y,X))return;var j=Va(W);if(W&&W.code==="invalid_video_duration"&&(j={code:"invalid_video_duration",message:W.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),k({status:"failed",error:j.message,errorCode:j.code,retryable:j.retryable,retryAfterSec:j.retryAfterSec,controller:null}),r.showToast){var ae=j.code==="invalid_video_duration"?j.message:"Video y\xFCklenemedi";r.showToast(ae,"error")}}}function A(){var h=f();h&&(g(),h.controller&&h.controller.abort(),Zr(h.token,e.get().productId,h.file),r.revokeBlobUrl&&r.revokeBlobUrl(h.localUrl),e.set({videoUpload:null}))}function N(h){if(n){h&&n.openPicker&&n.openPicker();return}a=null,s.innerHTML="",n=Kr(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),s.appendChild(n.el),h&&n.openPicker&&n.openPicker()}m.onclick=function(){m.disabled||N(!0)},c.onclick=function(){c.disabled||(E(),s.innerHTML="",v.click())},v.onchange=function(){var h=v.files&&v.files[0];v.value="",h&&S(h,null,void 0)};var I=!!f(),P=e.onChange(function(){b();var h=!!f();(h||I)&&z(),I=h});return b(),x()&&N(!1),f()&&z(),{el:o,destroy:function(){t=!0,m.onclick=null,c.onclick=null,v.onchange=null,n&&n.destroy&&n.destroy(),P&&P()}}}var yt=2e3,hi=60;function Ja(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=ce("formStepContentTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=hi,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=yt,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-char-counter",p.setAttribute("aria-live","polite"),i.appendChild(p);function u(){var c=l.value.length;p.textContent=c+"/"+yt,p.classList.toggle("renuvex-pr-fwizard-char-counter--max",c>=yt)}function m(){return Qe(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),u(),t(m())}),n.appendChild(i),u(),setTimeout(function(){t(m())},0),{el:n,destroy:function(){}}}var bi=40;function Za(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ce("formStepAuthorTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var p=document.createElement("label");p.className="renuvex-pr-fwizard-label",p.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=bi,u.setAttribute("aria-required","true"),u.value=e.get().author||"",l.appendChild(p),l.appendChild(u),o.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var c=document.createElement("label");c.className="renuvex-pr-fwizard-label",c.textContent="E-posta (opsiyonel)";var s=document.createElement("input");s.type="email",s.className="renuvex-pr-fwizard-input",s.setAttribute("autocomplete","email"),s.value=e.get().email||"",m.appendChild(c),m.appendChild(s),o.appendChild(m);var v=document.createElement("div");v.className="renuvex-pr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(v);var x=document.createElement("div");x.className="renuvex-pr-fwizard-msg",x.setAttribute("role","alert"),x.setAttribute("aria-live","assertive"),o.appendChild(x);var d=document.createElement("button");d.type="button",d.className="renuvex-pr-fwizard-submit-btn",d.textContent="G\xF6nder",o.appendChild(d),a.appendChild(o);function f(){return Qe(4,e.get())}function g(b){d.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),d.textContent=b}function y(){d.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),d.textContent="";var b=document.createElement("span");b.className="renuvex-pr-fwizard-video-dots",b.setAttribute("aria-hidden","true"),b.appendChild(document.createElement("span")),b.appendChild(document.createElement("span")),b.appendChild(document.createElement("span"));var k=document.createElement("span");k.textContent="Video Haz\u0131rlan\u0131yor",d.appendChild(b),d.appendChild(k)}function w(){var b=!f(),k=(e.get().pendingImages||[]).length,C=k>0,S=e.get().videoUpload,A=!!(S&&S.status==="failed"),N=!!(S&&S.status!=="ready"&&S.status!=="failed");C||N||A?(d.disabled=!0,d.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),A?g("Video Y\xFCklenemedi"):N?y():g("Foto\u011Fraflar Y\xFCkleniyor...")):(d.disabled=b,d.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",b),g("G\xF6nder"))}u.addEventListener("input",function(){e.set({author:u.value}),w(),t(f())}),s.addEventListener("input",function(){e.set({email:s.value})}),w(),setTimeout(function(){t(f())},0);function E(){x.textContent=""}function T(b){E();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=b||"",x.appendChild(k)}d.onclick=async function(){if(!d.disabled){var b=e.get(),k=(b.author||"").trim(),C=(b.comment||"").trim();if(s.value.trim()&&!s.checkValidity()){s.reportValidity();return}if(!k){T("Gerekli alan");return}if(!b.rating){T("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}d.disabled=!0,d.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var S=d.textContent;if(d.textContent="G\xF6nderiliyor\u2026",E(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){b.videoUpload&&b.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n()},600);return}try{var A=$t(window.location.href),N=b.productName||null,I=await Se(ye+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:b.productId||null,slug:A||null,productName:N,author:k,title:(b.title||"").trim()||null,comment:C||null,rating:b.rating,images:b.videoUpload?[]:b.images||[],videoToken:b.videoUpload&&b.videoUpload.status==="ready"?b.videoUpload.token:null})},15e3);if(I.ok)b.videoUpload&&b.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n();else{var P=await I.json().catch(function(){return{}});throw new Error(P.error||"Yorum kaydedilemedi.")}}catch(L){var h=L&&(L.name==="AbortError"||/signal/i.test(L.message||"")),_=h?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":L.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(_,"error"):T(_),d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),d.textContent=S}}};var z=e.onChange(w);return{el:a,destroy:function(){d.onclick=null,z&&z()}}}function yi(e,r,t){if(t=t||{},e===1)return La(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return Xa(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Kr(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Ja(r,{onValidityChange:t.onValidityChange});if(e===4)return Za(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function $a(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Qa(e){e=e||{},Jr();var r=_a({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:R&&R.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},n={},a={};function i(S){if(!(!S||typeof S!="string"||!S.startsWith("blob:")||a[S])){a[S]=!0;try{URL.revokeObjectURL(S)}catch(A){}}}function o(){Object.keys(n).forEach(function(A){i(A)}),Object.keys(t).forEach(function(A){i(t[A])});var S=r.get();(S.pendingImages||[]).forEach(function(A){i(A&&A.url)}),(S.images||[]).forEach(function(A){i(A)}),S.videoUpload&&i(S.videoUpload.localUrl)}function l(){var S=r.get(),A=S.videoUpload;!A||S.videoSubmitted||(A.controller&&A.controller.abort(),Zr(A.token,S.productId,A.file))}var p=Ma({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",m),jr(u),l(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),u=Yr(),m=function(S){p&&p.close&&p.close()};window.addEventListener("popstate",m);var c=document.createElement("div");c.className="renuvex-pr-fwizard-step-wrap";var s=Na({skippableSteps:[2],nextableSteps:[3],onBack:function(){d==="idle"&&r.goBack()},onSkip:function(){d==="idle"&&r.goNext()},onNext:function(){d==="idle"&&r.goNext()}}),v=document.createElement("div");v.className="renuvex-pr-fwizard-layout",v.appendChild(c),v.appendChild(s.el);var x=null,d="idle",f=null,g=!0,y=null;function w(S,A){c.innerHTML="";var N=yi(S,r,{canNavigate:function(){return d==="idle"},blobMap:t,urlToFinger:n,revokeBlobUrl:i,onValidityChange:function(h){s.setNextDisabled(!h)},onSuccess:T,showToast:p.showToast});if(x=N,s.update(S,r.get()),A){d="entering",N.el.classList.add("renuvex-pr-fwizard-step--enter");var I=null,P=function(){I&&clearTimeout(I),N.el.removeEventListener("animationend",P),N.el.classList.remove("renuvex-pr-fwizard-step--enter"),d="idle",f!==null&&z()};N.el.addEventListener("animationend",P),I=setTimeout(P,700)}else d="idle";c.appendChild(N.el),p.setStepAttr&&p.setStepAttr(S),S===3&&s.setNextDisabled(!0)}var E=!1;function T(){if(!E){if(E=!0,!x){c.innerHTML="";var S=$a();S.classList.add("renuvex-pr-fwizard-step--enter"),c.appendChild(S),p.setStepAttr("thanks"),s.setThanksState(p.close);return}var A=x;d="exiting",A.el.classList.add("renuvex-pr-fwizard-step--exit");var N=function(){if(y&&clearTimeout(y),A.el.removeEventListener("animationend",N),A.destroy)try{A.destroy()}catch(P){}x===A&&(x=null),c.innerHTML="";var I=$a();I.classList.add("renuvex-pr-fwizard-step--enter"),c.appendChild(I),p.setStepAttr("thanks"),s.setThanksState(p.close),d="idle"};A.el.addEventListener("animationend",N),y=setTimeout(N,300)}}function z(){var S=r.get().currentStep;if(d!=="idle"){f=S;return}if(!x){var A=!g;g=!1,w(S,A);return}var N=x;d="exiting",N.el.classList.add("renuvex-pr-fwizard-step--exit");var I=function(){if(y&&clearTimeout(y),N.el.removeEventListener("animationend",I),N.destroy)try{N.destroy()}catch(h){}if(x===N){c.innerHTML="",x=null;var P=f!==null?f:r.get().currentStep;f=null,w(P,!0),d="idle"}};N.el.addEventListener("animationend",I),y=setTimeout(I,350)}z();var b=r.get().currentStep,k=r.onChange(function(S){S.currentStep!==b?(b=S.currentStep,z()):s.update(S.currentStep,S)}),C=p.close;return p.close=function(){k&&k(),typeof y!="undefined"&&y&&clearTimeout(y),C()},p.open(v),{close:p.close}}var wi=4e3;async function en(){var e=await Se(ye+"/api/public/upload/video/capability?storeId="+encodeURIComponent(de),{method:"GET",cache:"no-store"},wi);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),n=t&&t.data;if(!n||typeof n.enabled!="boolean"){var a=new Error("video_capability_invalid");throw a.code="video_capability_invalid",a}return{enabled:n.enabled===!0,reason:typeof n.reason=="string"?n.reason:null}}var $r=null;function rn(){return R&&R.videoReviewsEnabled===!0}function ki(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return rn()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function zi(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function Si(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:rn(),reason:null};else try{t=await en()}catch(n){t=ki(n)}Qa({productId:Z||"",productName:Ie||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function te(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=zi(r);return $r||($r=Si(r,Me()).finally(function(){$r=null})),$r.finally(t)}var tn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Ci={id:"classic",name:"Klasik (A\xE7\u0131k)"},Ei=tn;function Ti(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,u=e.currentOrderBy,m=e.currentHasImages,c=e.onFilterChange,s=e.onSortChange;Ne(a);var v=document.createElement("div");v.className="renuvex-pr-summary";var x=(o[3]||0)+(o[4]||0),d=i>0?Math.round(x/i*100):0,f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-avg",f.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",v.appendChild(f);var g=document.createElement("div");if(g.className="renuvex-pr-summary-block renuvex-pr-summary-count",g.textContent=i.toLocaleString("tr-TR")+" "+H(n.countLabel,"Yorum"),v.appendChild(g),n.showRecommendation!==!1&&d>0){var y=document.createElement("div");y.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",y.innerHTML='<span class="renuvex-pr-recommend-pct">%'+d+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(y)}return v.appendChild(Ze({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:p,onFilterChange:c})),v.appendChild(pe({widget:r,currentOrderBy:u,currentHasImages:m,onWriteClick:te,onSortChange:s})),v}var kt={};Pe(kt,{css:()=>Pi,meta:()=>Ai,render:()=>Li});var an=`
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
`;var Ai={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Pi=an,Mi="__unknown_product__",mr=Object.create(null);function _i(e){return e?String(e):Mi}var Ve=null,fr=null;function Ni(){!Ve||!fr||(Ve.removeEventListener?Ve.removeEventListener("change",fr):Ve.removeListener&&Ve.removeListener(fr),Ve=null,fr=null)}function Li(e){var r=e.widget,t=e.productId,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,u=e.currentOrderBy,m=e.currentHasImages,c=e.onFilterChange,s=e.onSortChange,v=_i(t),x=document.createElement("div");x.className="renuvex-pr-summary renuvex-pr-summary-compact";var d=document.createElement("div");d.className="renuvex-pr-compact-header";var f=document.createElement("div");f.className="renuvex-pr-compact-trigger-wrap";var g=document.createElement("button");g.className="renuvex-pr-compact-trigger",g.type="button",g.setAttribute("aria-expanded","false"),g.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Le(l,a)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+se(Jt)+"</span>";var y=g.querySelector(".renuvex-pr-compact-trigger-text"),w=g.querySelector(".renuvex-pr-compact-chevron");if(y&&(y.textContent=i.toLocaleString("tr-TR")+" "+H(n.countLabel,"Yorum")),y&&w){var E=document.createElement("span");E.className="renuvex-pr-compact-trigger-count",g.insertBefore(E,y),E.appendChild(y),E.appendChild(w)}f.appendChild(g),d.appendChild(f);var T=pe({widget:r,currentOrderBy:u,currentHasImages:m,onWriteClick:te,onSortChange:s}),z=T.querySelector(".renuvex-pr-filter-wrap"),b=T.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-compact-actions-slot",b&&k.appendChild(b),z&&k.appendChild(z),d.appendChild(k),x.appendChild(d);var C=document.createElement("div");C.className="renuvex-pr-compact-panel",C.setAttribute("role","dialog"),C.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),C.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="renuvex-pr-compact-panel-inner";var A=document.createElement("div");A.className="renuvex-pr-compact-avg",A.innerHTML='<span class="renuvex-pr-icon">'+ue("full")+"</span><span>"+l+"</span>",S.appendChild(A),S.appendChild(Ze({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:p,onFilterChange:function(F){I()&&C.classList.contains("renuvex-pr-open")&&(mr[v]=!0),c(F)}})),C.appendChild(S);var N=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function I(){return!!(N&&N.matches)}function P(F){F?C.classList.add("renuvex-pr-open"):C.classList.remove("renuvex-pr-open"),C.setAttribute("aria-hidden",F?"false":"true"),g.setAttribute("aria-expanded",F?"true":"false")}function h(F){var O=F?x:f;if(C.parentNode!==O){var j=!!C.parentNode;C.classList.contains("renuvex-pr-open")&&P(!1),j&&(mr[v]=!1),O.appendChild(C)}}h(N?N.matches:!1);var _=pe({widget:r,currentOrderBy:u,currentHasImages:m,onWriteClick:te,onSortChange:s}),L=_.querySelector(".renuvex-pr-filter-wrap"),M=_.querySelector(".renuvex-pr-write-btn"),B=document.createElement("div");B.className="renuvex-pr-compact-write-row",M&&B.appendChild(M),L&&B.appendChild(L),x.appendChild(B);function K(){var F=C.classList.contains("renuvex-pr-open");return P(!1),I()&&(mr[v]=!1),F}function q(){U&&U.notifyOpening(),P(!0),I()&&(mr[v]=!0)}g.onclick=function(){C.classList.contains("renuvex-pr-open")?K():q()};var U=null;function D(F){U&&(U.unregister(),U=null),F||(U=qr({trigger:f,element:C,close:K}))}if(D(N?N.matches:!1),Ni(),N){var G=function(F){h(F.matches),D(F.matches)};N.addEventListener?N.addEventListener("change",G):N.addListener&&N.addListener(G),Ve=N,fr=G}if(I()&&mr[v]&&P(!0),n.showRecommendation!==!1){var X=(o[3]||0)+(o[4]||0),Y=i>0?Math.round(X/i*100):0;if(Y>0){var J=document.createElement("div");J.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",J.style.marginTop="8px",J.innerHTML='<span class="renuvex-pr-recommend-pct">%'+Y+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild(J)}}return x}var zt={};Pe(zt,{css:()=>Ii,meta:()=>Ri,render:()=>Bi});var nn=`
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
`;var Ri={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Ii=nn;function Bi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,p=e.currentOrderBy,u=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange;Ne(n);var s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-split";var v=document.createElement("div");v.className="renuvex-pr-split-col renuvex-pr-split-left";var x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",v.appendChild(x);var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",d.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),v.appendChild(d),s.appendChild(v);var f=document.createElement("div");f.className="renuvex-pr-split-col renuvex-pr-split-mid",f.appendChild(Ze({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:m})),s.appendChild(f);var g=pe({widget:r,currentOrderBy:p,currentHasImages:u,onWriteClick:te,onSortChange:c}),y=g.querySelector(".renuvex-pr-filter-wrap"),w=g.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-split-col renuvex-pr-split-right",w&&E.appendChild(w),y&&E.appendChild(y),s.appendChild(E);var T=(i[3]||0)+(i[4]||0),z=a>0?Math.round(T/a*100):0,b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",b.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var k=t.showRecommendation===!1||z===0;return k&&b.classList.add("renuvex-pr-split-rec-hidden"),v.appendChild(b),s}var St={};Pe(St,{css:()=>Oi,meta:()=>Fi,render:()=>Ui});var on=`
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
`;var Fi={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Oi=on;function Ui(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var m=document.createElement("div");m.className="renuvex-pr-minimal-info";var c=document.createElement("div");c.className="renuvex-pr-minimal-row";var s=document.createElement("span");s.className="renuvex-pr-minimal-avg",s.textContent=i,c.appendChild(s);var v=document.createElement("span");v.className="renuvex-pr-minimal-stars",v.innerHTML=Le(i,n),c.appendChild(v);var x=document.createElement("span");x.className="renuvex-pr-minimal-count",x.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),c.appendChild(x),m.appendChild(c),u.appendChild(m);var d=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),f=d.querySelector(".renuvex-pr-filter-wrap"),g=d.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-minimal-actions",g&&y.appendChild(g),f&&y.appendChild(f),u.appendChild(y);var w=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),E=w.querySelector(".renuvex-pr-filter-wrap"),T=w.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-minimal-write-row",T&&z.appendChild(T),E&&z.appendChild(E),u.appendChild(z),u}var Ct={};Pe(Ct,{css:()=>Vi,meta:()=>Hi,render:()=>Di});var ln=`
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
`;var Hi={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Vi=ln;function Di(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var m=document.createElement("div");m.className="renuvex-pr-hero-info";var c=document.createElement("div");c.className="renuvex-pr-hero-rating-col";var s=document.createElement("span");s.className="renuvex-pr-hero-avg",s.textContent=i,c.appendChild(s);var v=document.createElement("div");v.className="renuvex-pr-hero-meta-row";var x=document.createElement("span");x.className="renuvex-pr-hero-stars",x.innerHTML=Le(i,n),v.appendChild(x);var d=document.createElement("div");d.className="renuvex-pr-hero-count",d.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),v.appendChild(d),c.appendChild(v),m.appendChild(c),u.appendChild(m);var f=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),g=f.querySelector(".renuvex-pr-filter-wrap"),y=f.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",y&&w.appendChild(y),g&&w.appendChild(g),u.appendChild(w);var E=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),T=E.querySelector(".renuvex-pr-filter-wrap"),z=E.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");return b.className="renuvex-pr-hero-write-row",z&&b.appendChild(z),T&&b.appendChild(T),u.appendChild(b),u}var pn=`
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
`;var Qr={classic:wt,compact:kt,split:zt,minimal:St,hero:Ct};function et(e){return Qr[e]||Qr.classic}function dn(){var e=Object.keys(Qr).map(function(r){return Qr[r].css||""}).join(`
`);return pn+`
`+e}var Et={};Pe(Et,{css:()=>ji,meta:()=>Yi,render:()=>Wi});function Re(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,n=t?qe(e.posterUrl,t):oa(e);if(!n)return null;var a=document.createElement("img"),i=e.type==="image"?Lr(n,r.sourceWidth):{src:n,srcset:ia(e.posterUrl,t)};if(a.src=i.src,i.srcset&&(a.srcset=i.srcset),a.loading=r.loading||"lazy",a.decoding="async",e.type==="image"&&a.setAttribute("data-renuvex-img-url",e.url),r.width&&(a.width=r.width),r.height&&(a.height=r.height),a.alt="",Rr(a),e.type!=="video")return a.className=r.className||"",dr(a,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),a;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",a.className="renuvex-pr-media-poster",o.appendChild(a);var l=document.createElement("span");l.className="renuvex-pr-media-play";var p=ee(Pr);p&&l.appendChild(p),o.appendChild(l);var u=la(e.durationMs);if(u){var m=document.createElement("span");m.className="renuvex-pr-media-duration",m.textContent=u,o.appendChild(m)}return dr(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function ar(e,r,t){var n=t||{},a=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,a.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:i,readMore:o}}function nr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=H(R&&R.merchantReplyLabel,"Ma\u011Faza Sahibi"),n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var un=`
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
`;var Yi={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},ji=un;function Wi(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ke(e.rating,R),a.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=ze(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-author",p.textContent=e.author||"",t.appendChild(p);var u=(e.comment||"").trim();u&&t.appendChild(ar(u,"renuvex-pr-body").fragment);var m=Ce(e);if(m.length){var c=document.createElement("div");c.className="renuvex-pr-gallery",m.forEach(function(v){var x=Re(v,{className:"renuvex-pr-img",sourceWidth:le,width:le,height:le,onOpen:function(){ge(e,v.url,r)}});x&&c.appendChild(x)}),t.appendChild(c)}var s=nr(e.merchantReply);return s&&t.appendChild(s),t}var Tt={};Pe(Tt,{css:()=>Gi,meta:()=>qi,render:()=>Ki});var sn=`
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
`;var qi={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Gi=sn;function Ki(e,r){var t=Ce(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ke(e.rating,R),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var p=document.createElement("time");p.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=ze(e.createdAt),i.appendChild(p),a.appendChild(i);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,u.appendChild(m)}var c=(e.comment||"").trim();c&&u.appendChild(ar(c,"renuvex-pr-review-list-body").fragment);var s=nr(e.merchantReply);if(s&&u.appendChild(s),a.appendChild(u),n){var v=document.createElement("div");v.className="renuvex-pr-review-list-media",t.forEach(function(x){var d=Re(x,{sourceWidth:le,width:le,height:Math.round(le*4/3),onOpen:function(){ge(e,x.url,r)}});d&&v.appendChild(d)}),a.appendChild(v)}return a}var At={};Pe(At,{css:()=>Ji,meta:()=>Xi,render:()=>Zi});var vn=`
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
`;var Xi={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ji=vn;function Zi(e,r){var t=Br(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ke(e.rating,R),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-review-gallery-author",p.textContent=e.author||"",i.appendChild(p);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ze(e.createdAt),i.appendChild(u);var m=(e.comment||"").trim();if(m&&i.appendChild(ar(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ge(e,t.url,r)}}:null).fragment),a.appendChild(i),n){var c=document.createElement("div");c.className="renuvex-pr-review-gallery-media";var s=Re(t,{sourceWidth:_r,width:_r,height:Math.round(_r*4/3),onOpen:function(){ge(e,t.url,r)}});s&&c.appendChild(s),a.appendChild(c)}var v=nr(e.merchantReply,t?function(){ge(e,t.url,r)}:null);return v&&(v.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(v)),a}var rt={card:Et,list:Tt,gallery:At};function tt(e){return rt[e]||rt.card}function cn(){return Object.keys(rt).map(function(e){return rt[e].css||""}).join(`
`)}var Pt=0;function De(){return Pt++,Pt}function Ye(e,r){return e!==Pt?!1:r?!(r.productId!==void 0&&Z!==r.productId||r.orderBy!==void 0&&re!==r.orderBy||r.page!==void 0&&or!==r.page||r.ratingFilter!==void 0&&ie!==r.ratingFilter||r.hasImages!==void 0&&oe!==r.hasImages||r.nextCursor!==void 0&&wr!==r.nextCursor):!0}var Mt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},_t={small:80,medium:110,large:140},Nt={small:80,medium:100,large:110};function mn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),n.appendChild(a),n.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(l),r}function fn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var n=document.createElement("div");n.className="renuvex-pr-empty-state-stars",n.innerHTML=Le(0,e.iconPair),t.appendChild(n);var a=document.createElement("p");a.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(a),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function xn(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function gn(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Te(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function at(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Lt(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function hn(e){return .2126*Lt(e.r)+.7152*Lt(e.g)+.0722*Lt(e.b)}function bn(e,r){var t=hn(e),n=hn(r),a=Math.max(t,n),i=Math.min(t,n);return(a+.05)/(i+.05)}function $i(e){var r=at(e)||at("#ffffff"),t=at("#111111"),n=at("#ffffff");return bn(t,r)>=bn(n,r)?"#111111":"#ffffff"}function Qi(e){return Te(e,e==="#ffffff"?.1:.06)}function yn(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",p=r.barCountColor||"#111111",u=Te(o,.06),m=r.reviewStarColor||"#f59e0b",c=r.btnBgColor||"#111111",s=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",x=r.filterBtnBgColor||"#111111",d=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",g=r.filterMenuBgColor||"#ffffff",y=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",E=r.filterItemHoverBgColor||"#f3f4f6",T=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",b=r.reviewAuthorColor||"#111111",k=r.reviewDateColor||"#5e5e5e",C=r.reviewBodyColor||"#111111",S=r.reviewBorderColor||"#e5e7eb",A=Te(C,.65),N=r.replyBgColor||"#f9fafb",I=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",h=r.replyTextColor||"#111111",_=r.photoTitleColor||"#111111",L=Te("#111111",.05),M=r.photoArrowBgColor||"#ffffff",B=r.photoArrowTextColor||"#111111",K=Te("#111111",.12),q=r.formBgColor||"#ffffff",U=r.formPrimaryTextColor||"#111111",D=r.formSecondaryTextColor||"#3b3b3b",G=r.inputTextColor||U,X=r.inputBorderColor||"#d1d5db",Y=r.placeholderColor||"#9ca3af",J=r.formStepBarColor||"#111111",F=r.formBtnBgColor||"#111111",O=r.formBtnTextColor||"#ffffff",j=r.formBtnBorderColor||"#111111",ae=Te(F,.06),W=Te(F,.18),$=Te(O,.85),xr=Te(U,.06),Ae=$i(q),V=Qi(Ae),ne=r.loadMoreBgColor||"#ffffff",me=r.loadMoreTextColor||"#111111",Q=r.loadMoreBorderColor||"#111111",be=r.paginationBgColor||"#ffffff",gr=r.paginationTextColor||"#111111",hr=r.paginationBorderColor||"#e5e7eb",br=r.paginationActiveBgColor||"#111111",yr=r.paginationActiveTextColor||"#ffffff",fe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":p,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":c,"--renuvex-pr-btn-text":s,"--renuvex-pr-btn-border":v,"--renuvex-pr-filter-btn-bg":x,"--renuvex-pr-filter-btn-text":d,"--renuvex-pr-filter-btn-border":f,"--renuvex-pr-filter-menu-bg":g,"--renuvex-pr-filter-menu-border":y,"--renuvex-pr-filter-item-text":w,"--renuvex-pr-filter-item-hover-bg":E,"--renuvex-pr-filter-item-active":T,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":b,"--renuvex-pr-review-date":k,"--renuvex-pr-review-body":C,"--renuvex-pr-review-border":S,"--renuvex-pr-state-text":A,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":N,"--renuvex-pr-reply-border":I,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":h,"--renuvex-pr-photo-title":_,"--renuvex-pr-photo-image-border":L,"--renuvex-pr-photo-arrow-bg":M,"--renuvex-pr-photo-arrow-text":B,"--renuvex-pr-photo-arrow-border":K,"--renuvex-pr-fwizard-bg":q,"--renuvex-pr-fwizard-text":U,"--renuvex-pr-fwizard-secondary-text":D,"--renuvex-pr-fwizard-input-bg":q,"--renuvex-pr-fwizard-input-text":G,"--renuvex-pr-fwizard-input-border":X,"--renuvex-pr-fwizard-placeholder":Y,"--renuvex-pr-fwizard-close-text":Ae,"--renuvex-pr-fwizard-close-hover-bg":V,"--renuvex-pr-fwizard-progress-bg":xr,"--renuvex-pr-fwizard-progress-active":J,"--renuvex-pr-fwizard-btn-bg":F,"--renuvex-pr-fwizard-btn-text":O,"--renuvex-pr-fwizard-btn-border":j,"--renuvex-pr-fwizard-btn-disabled-bg":W,"--renuvex-pr-fwizard-btn-disabled-text":$,"--renuvex-pr-fwizard-nav-hover-bg":ae,"--renuvex-pr-load-more-bg":ne,"--renuvex-pr-load-more-text":me,"--renuvex-pr-load-more-border":Q,"--renuvex-pr-pagination-bg":be,"--renuvex-pr-pagination-text":gr,"--renuvex-pr-pagination-border":hr,"--renuvex-pr-pagination-active-bg":br,"--renuvex-pr-pagination-active-text":yr};Object.keys(fe).forEach(function(ir){e.style.setProperty(ir,fe[ir])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function wn(e){var r=e.settings,t=e.root,n=e.currentHasImages,a=e.openReviewModal,i=(e.photoStripReviews||[]).filter(function(w){return Ce(w).length>0});if(!(r.showPhotoGallery!==!1&&!n&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var l=H(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),p=document.createElement("div");p.className="renuvex-pr-photo-title",p.textContent=l,o.appendChild(p)}var u=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",u);var m=document.createElement("div");m.className="renuvex-pr-photo-strip";var c=le,s=r.reviewLayout==="card"?le:Math.round(le*4/3),v=0;i.forEach(function(w){if(!(v>=15)){var E=Br(w);if(E){var T=Re(E,{className:"renuvex-pr-photo-strip-thumb",sourceWidth:le,width:c,height:s,loading:v<3?"eager":"lazy",onOpen:function(){a(w,E.url,i)}});T&&(m.appendChild(T),v++)}}});var x=document.createElement("button");x.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var d=ee(We);d&&x.appendChild(d),x.setAttribute("aria-label","\xD6nceki"),x.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var f=document.createElement("button");f.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var g=ee(Tr);g&&f.appendChild(g),f.setAttribute("aria-label","Sonraki"),f.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var y=document.createElement("div");return y.className="renuvex-pr-photo-strip-wrap",y.appendChild(x),y.appendChild(m),y.appendChild(f),o.appendChild(y),o}var eo=1,ro=7,Rt="\u2026";function to(e,r){var t=Math.max(1,Math.floor(Number(r))||1),n=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=ro){for(var a=[],i=1;i<=t;i++)a.push(i);return a}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-n)<=eo)&&o.push(l);for(var p=[],u=0;u<o.length;u++)u>0&&o[u]-o[u-1]>1&&p.push(Rt),p.push(o[u]);return p}function kn(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),n=typeof e.onPageChange=="function"?e.onPageChange:function(){},a=document.createElement("nav");a.className="renuvex-pr-pagination",a.setAttribute("aria-label","Yorum sayfalar\u0131");function i(p){a.setAttribute("aria-busy","true");for(var u=a.querySelectorAll("button"),m=0;m<u.length;m++)u[m].disabled=!0;n(p)}function o(p,u){var m=document.createElement("span");m.className="renuvex-pr-pagination-label",m.setAttribute("aria-hidden","true"),m.textContent=u,p.appendChild(m)}function l(p,u,m,c){var s=document.createElement("button");return s.type="button",s.className="renuvex-pr-pagination-arrow",s.setAttribute("aria-label",p),o(s,u),c?s.disabled=!0:s.onclick=function(){i(m)},s}return a.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),to(t,r).forEach(function(p){if(p===Rt){var u=document.createElement("span");u.className="renuvex-pr-pagination-gap",u.setAttribute("aria-hidden","true"),u.textContent=Rt,a.appendChild(u);return}var m=document.createElement("button");m.type="button",m.className="renuvex-pr-pagination-btn",m.setAttribute("aria-label","Sayfa "+p),o(m,String(p)),p===t?m.setAttribute("aria-current","page"):m.onclick=function(){i(p)},a.appendChild(m)}),a.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),a}function zn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Sn(e){var r=e.render;async function t(){var o=De(),l=Z,p=re,u=ie,m=oe;_e(null);var c=await Ue(Z,re,1,ie,oe);Ye(o,{productId:l,orderBy:p,ratingFilter:u,hasImages:m})&&await r(Z,R,c,Ie,re,1,Bt)}async function n(o){var l=De(),p=ie===o?null:o,u=Z,m=re,c=oe;Ot(p),Be(1),_e(null);var s=await Ue(Z,re,1,p,oe);Ye(l,{productId:u,orderBy:m,page:1,ratingFilter:p,hasImages:c})&&await r(Z,R,s,Ie,re,1)}async function a(o,l){var p=De(),u=Z,m=ie;Be(1),_e(null);var c=o,s=!1;l&&(s=!0,c="newest"),Ut(s),kr(c);var v=await Ue(Z,c,1,ie,s);Ye(p,{productId:u,orderBy:c,page:1,ratingFilter:m,hasImages:s})&&await r(Z,R,v,Ie,c,1)}async function i(o){var l=De(),p=Z,u=re,m=ie,c=oe;Be(o),_e(null);var s=await Ue(Z,re,o,ie,oe);if(Ye(l,{productId:p,orderBy:u,page:o,ratingFilter:m,hasImages:c})){await r(Z,R,s,Ie,re,o);var v=document.getElementById("renuvex-reviews"),x=v&&v.shadowRoot,d=x&&x.querySelector&&x.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(d){try{d.focus({preventScroll:!0})}catch(y){try{d.focus()}catch(w){}}zn(x,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var f=document.getElementById("renuvex-reviews");if(f&&typeof f.scrollIntoView=="function"){var g=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;f.scrollIntoView({behavior:g?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:n,onSortChange:a,onPageChange:i}}function ao(){return na()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function no(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ta({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),aa(t,{surface:"reviews",productId:r||""}),t}async function It(e,r,t,n,a,i,o){if(Kt){Cr({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:o});return}Sr(!0),Ht(e),Vt(r),o!==void 0&&Dt(o),Yt(n),a&&kr(a),i&&Be(i),t!=null&&(jt(t),_e(t&&t.data?t.data.nextCursor:null));var l=Sn({render:It});try{let Ae=function(V,ne){if(!(!V||!V.meta||!V.meta.sizeOverrides)){var me=V.meta.sizeOverrides[ne];me&&Object.keys(me).forEach(function(Q){v.style.setProperty(Q,me[Q])})}};var $=Ae,p=et(r.summaryLayout),u=!(p.meta&&p.meta.supports&&p.meta.supports.title===!1),m=r.showTitle!==!1,c=H(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),s=u&&m?c:"",v=document.documentElement;yn(v,r);var x=r.borderRadius!==void 0?r.borderRadius:8,d=Mt[r.size]||Mt.medium,f=_t[r.thumbnailSize]||_t.medium,g=f;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(g=Nt[r.thumbnailSize]||Nt.medium),v.style.setProperty("--renuvex-pr-title-size",d.titleSize+"px"),v.style.setProperty("--renuvex-pr-review-text-size",d.reviewTextSize+"px"),v.style.setProperty("--renuvex-pr-review-title-size",d.reviewTitleSize+"px"),v.style.setProperty("--renuvex-pr-author-size",d.authorSize+"px"),v.style.setProperty("--renuvex-pr-reply-name-size",d.replyNameSize+"px"),v.style.setProperty("--renuvex-pr-reply-text-size",d.replyTextSize+"px"),v.style.setProperty("--renuvex-pr-radius",x+"px"),v.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,x-4)+"px"),v.style.setProperty("--renuvex-pr-photo-title-size",d.photoTitleSize+"px"),v.style.setProperty("--renuvex-pr-avg-rating-size",d.avgRatingSize+"px"),v.style.setProperty("--renuvex-pr-review-count-size",d.reviewCountSize+"px"),v.style.setProperty("--renuvex-pr-compact-count-size",d.compactCountSize+"px"),v.style.setProperty("--renuvex-pr-recommend-size",d.recommendSize+"px"),v.style.setProperty("--renuvex-pr-btn-text-size",d.btnTextSize+"px"),v.style.setProperty("--renuvex-pr-bar-label-size",d.barLabelSize+"px"),v.style.setProperty("--renuvex-pr-minimal-avg-size",d.minimalAvgSize+"px"),v.style.setProperty("--renuvex-pr-hero-avg-size",d.heroAvgSize+"px"),v.style.setProperty("--renuvex-pr-minimal-count-size",d.minimalCountSize+"px"),v.style.setProperty("--renuvex-pr-hero-count-size",d.heroCountSize+"px"),v.style.setProperty("--renuvex-pr-bar-count-size",d.barCountSize+"px"),v.style.setProperty("--renuvex-pr-review-date-size",d.reviewDateSize+"px"),v.style.setProperty("--renuvex-pr-filter-text-size",d.filterTextSize+"px"),v.style.setProperty("--renuvex-pr-load-more-size",d.loadMoreSize+"px"),v.style.setProperty("--renuvex-pr-load-more-min-height",d.loadMoreMinHeight+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-y",d.loadMorePadY+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-x",d.loadMorePadX+"px"),v.style.setProperty("--renuvex-pr-load-more-mobile-min-height",d.loadMoreMobileMinHeight+"px"),v.style.setProperty("--renuvex-pr-pagination-button-size",d.paginationButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-pad-x",d.paginationPadX+"px"),v.style.setProperty("--renuvex-pr-pagination-gap",d.paginationGap+"px"),v.style.setProperty("--renuvex-pr-pagination-margin-top",d.paginationMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-gap-min",d.paginationGapMin+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-button-size",d.paginationMobileButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-font-size",d.paginationMobileFontSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap",d.paginationMobileGap+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",d.paginationMobileMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",d.paginationMobileGapMin+"px"),v.style.setProperty("--renuvex-pr-read-more-size",d.readMoreSize+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size",f+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size-mobile",g+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";v.style.setProperty("--renuvex-pr-review-star-color",y),v.style.setProperty("--renuvex-pr-star-size",d.reviewStarSize+"px"),v.style.setProperty("--renuvex-pr-avg-star-size",d.avgStarSize+"px"),Ae(et(r.summaryLayout),r.size),Ae(tt(r.reviewLayout),r.size);var w=lr(r),E=ao();if(!E)return;var T=no(E,e),z=document.getElementById("renuvex-reviews");z||(z=document.createElement("div"),z.id="renuvex-reviews",z.style.minHeight="200px"),z.parentNode!==T&&T.appendChild(z);var b=pa(z),k=Ge+je+Or+dn()+cn();Ke(b,k);var C=ua(b);if(r.enabled===!1){z.style.minHeight="auto",C.replaceChildren(mn(r.borderRadius!==void 0?r.borderRadius:8)),Sr(!1);var S=zr;Cr(null),S&&It(S.productId,S.settings,S.reviewsData,S.productName,S.orderBy,S.page,S.badgeSettings);return}try{var A=t||{},N=pt(A),I=N?[]:A.data&&A.data.reviews||[];Wt(I),C.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),s){var h=document.createElement("div"),_=r.summaryLayout||"classic";h.className="renuvex-pr-title renuvex-pr-title-"+_,h.textContent=s,P.appendChild(h)}if(N){P.appendChild(gn(A.message,l.onRetry)),C.appendChild(P),Fe(b),nt(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return b.getElementById("renuvex-reviews-widget")});return}var L=A.data&&A.data.allCount||0,M=A.data&&A.data.ratingCounts||null,B=M||[0,0,0,0,0],K=A.data&&A.data.avgRating||"0.0";if(!M&&I.length>0){I.forEach(function(V){V.rating>=1&&V.rating<=5&&B[V.rating-1]++});var q=I.reduce(function(V,ne){return V+ne.rating},0);K=(q/I.length).toFixed(1)}if(L===0)P.classList.add("renuvex-pr-reviews-empty"),P.appendChild(fn({iconPair:w,writeButtonText:H(r.writeButtonText,"Yorum Yap"),emptyStateText:H(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:te}));else{var U=et(r.summaryLayout),D=U.render({widget:P,productId:e,data:A,settings:r,iconPair:w,allCount:L,ratingCounts:B,avgRatingVal:K,currentRatingFilter:ie,currentOrderBy:re,currentHasImages:oe,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});P.appendChild(D);var G=wn({settings:r,root:v,currentHasImages:oe,photoStripReviews:Ft,openReviewModal:ge,wireLightboxTrigger:dr});if(G&&P.appendChild(G),I.length===0)P.appendChild(xn());else{var X=tt(r.reviewLayout);I.forEach(function(V){P.appendChild(X.render(V,it))})}var Y=r.paginationMode==="numbered"?"numbered":"loadMore";if(Y==="numbered"){var J=A.data&&A.data.totalPages||1;J>1&&P.appendChild(kn({page:A.data&&A.data.page||or||1,totalPages:J,onPageChange:l.onPageChange}))}var F=Y==="loadMore"&&A.data&&A.data.hasMore;if(F){let V=function(ne){j.textContent=ne,O.setAttribute("aria-label",ne)};var xr=V,O=document.createElement("button");O.className="renuvex-pr-load-more";var j=document.createElement("span");j.className="renuvex-pr-load-more-label",j.setAttribute("aria-hidden","true"),O.appendChild(j),V("Daha Fazla G\xF6ster"),O.onclick=async function(){O.disabled=!0,V("Y\xFCkleniyor...");var ne=De(),me=Z,Q=re,be=or,gr=ie,hr=oe,br=wr,yr=be+1,fe=await Ue(me,Q,yr,gr,hr,null,br);if(Ye(ne,{productId:me,orderBy:Q,page:be,ratingFilter:gr,hasImages:hr,nextCursor:br}))if(fe&&!pt(fe)&&fe.data&&Array.isArray(fe.data.reviews)){var ir=qt(fe.data.reviews);Gt(ir),Be(yr),_e(fe.data.nextCursor||null);var Cn=tt(R.reviewLayout);ir.forEach(function(En){P.insertBefore(Cn.render(En,it),O)}),fe.data.hasMore?(O.disabled=!1,V("Daha Fazla G\xF6ster")):O.remove()}else O.disabled=!1,V("Tekrar Dene")},P.appendChild(O)}}C.appendChild(P),Fe(b),nt(P,"reviews-widget",{productId:e||""},function(){return b.getElementById("renuvex-reviews-widget")})}catch(V){console.error("[renuvex-pr] render error:",V);var ae=document.createElement("p");ae.style.cssText="text-align:center;color:#dc2626;",ae.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(ae)}}finally{if(Sr(!1),zr){var W=zr;Cr(null),It(W.productId,W.settings,W.reviewsData,W.productName,W.orderBy,W.page,W.badgeSettings)}}}export{It as render};
