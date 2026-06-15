/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ve,d as Ce}from"./chunk-N7KC6W47.js";import{b as at,c as Be}from"./chunk-W6RJS6FO.js";import{A as Ht,B as Vt,C as br,D as yr,E as wr,a as K,b as ar,c as $,d as Q,e as D,f as L,g as Pt,h as Le,j as gr,k as et,l as Mt,m as hr,n as _e,o as Nt,p as Lt,q as _t,r as Rt,s as It,t as Bt,u as Ot,v as Ee,y as Ft,z as Ut}from"./chunk-H43GKW4S.js";import{A as fe,B as Er,C as Gt,D as ee,E as Tr,F as Ar,G as rt,H as tt,I as Pr,J as Kt,K as Mr,L as Xt,M as Jt,c as Qr,e as Te,f as ae,g as ne,h as q,i as Re,j as kr,k as nr,l as Dt,m as De,n as zr,o as Yt,p as me,q as Sr,r as jt,s as Cr,u as U,v as Wt,w as xe,x as Ae,z as qt}from"./chunk-FLWRUAT4.js";import{c as ge}from"./chunk-WWGCW5YN.js";import{a as te,b as ce,h as Zt,i as Ie}from"./chunk-UOBLDAJF.js";import{a as Se}from"./chunk-O54VMLTU.js";function $t(e){if(typeof e!="string"||!e)return!1;try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return!1;var t=r.hostname.toLowerCase();return t==="videodelivery.net"||t.endsWith(".videodelivery.net")||t==="cloudflarestream.com"||t.endsWith(".cloudflarestream.com")}catch(n){return!1}}function he(e){var r=[],t={},n=e&&Array.isArray(e.media)?e.media:[];return n.forEach(function(a){if(!(!a||typeof a!="object")){if(a.type==="video"){if(!$t(a.url)||!$t(a.posterUrl||a.thumbnailUrl))return;var i="video:"+a.url;if(t[i])return;t[i]=!0,r.push({type:"video",url:a.url,posterUrl:a.posterUrl||a.thumbnailUrl,thumbnailUrl:a.thumbnailUrl||a.posterUrl,durationMs:typeof a.durationMs=="number"?a.durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length});return}if(a.type==="image"&&Er(a.url)){var o="image:"+a.url.trim();if(t[o])return;t[o]=!0,r.push({type:"image",url:a.url.trim(),thumbnailUrl:a.thumbnailUrl||null,posterUrl:null,durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length})}}}),Gt(e).forEach(function(a){var i="image:"+a;t[i]||(t[i]=!0,r.push({type:"image",url:a,thumbnailUrl:null,posterUrl:null,durationMs:null,width:null,height:null,position:r.length}))}),r.sort(function(a,i){return a.position-i.position})}function Nr(e){var r=he(e);return r.length?r[0]:null}function Qt(e){return e&&e.type==="video"?e.posterUrl:e&&e.url}function ea(e){if(typeof e!="number"||e<=0)return"";var r=Math.max(0,Math.round(e/1e3)),t=Math.floor(r/60),n=String(r%60).padStart(2,"0");return t+":"+n}var Ye=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function ra(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function je(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Lr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function ta(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function aa(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var na=`
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
`,ia=`
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
`;var oa=`
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
`;var la=`
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
`;var pa=`
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
`;var ua=`
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
`;var da=`
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
`;var sa=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.68);color:#fff;pointer-events:none;}
  .renuvex-pr-media-play svg{width:17px;height:17px;margin-left:2px;}
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var _r=[na,qt,oa,la,pa,ua,sa,da,ia].join(`
`);function gn(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function se(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function hn(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function bn(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=hn()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function yn(e){var r=document.body.style,t=document.documentElement.style;se(t,"overflow",e.rootOverflow,e.rootOverflowPriority),se(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),se(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),se(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),se(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),se(r,"position",e.bodyPosition,e.bodyPositionPriority),se(r,"top",e.bodyTop,e.bodyTopPriority),se(r,"left",e.bodyLeft,e.bodyLeftPriority),se(r,"right",e.bodyRight,e.bodyRightPriority),se(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var ir=0,We=null;function Rr(){return ir+=1,ir>1||(We=gn(),bn(We)),We}function Ir(){if(ir!==0&&(ir-=1,!(ir>0))){var e=We;We=null,e&&yn(e)}}function wn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Br(){var e=wn();return!e||e===document.body||e===document.documentElement?null:e}function ie(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function kn(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function nt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(kn)}function zn(e,r){var t=e,n=nt(e);!n.length&&r&&(t=r,n=nt(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;ie(a)}function Or(e,r,t){if(e.key==="Tab"){var n=nt(r);if(!n.length){e.preventDefault(),zn(r);return}var a=n[0],i=n[n.length-1],o=ta(t);if(!r.contains(o)){e.preventDefault(),ie(a);return}if(n.indexOf(o)===-1){e.preventDefault(),ie(e.shiftKey?i:a);return}e.shiftKey&&o===a?(e.preventDefault(),ie(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ie(a))}}var va="renuvexPrOverlay";function Fr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[va]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Sn(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[va]===e.id)}function Ur(e){if(Sn(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function ca(e,r){var t=!1,n=null;return e.controls=!0,e.autoplay=!1,e.preload="metadata",e.playsInline=!0,e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),e.poster=r.posterUrl||"",e.canPlayType("application/vnd.apple.mpegurl")?e.src=r.url:import("./hls-HROXACUG.js").then(function(a){if(!t){var i=a.default||a;if(!i||!i.isSupported||!i.isSupported()){e.dispatchEvent(new Event("error"));return}n=new i({enableWorker:!0,lowLatencyMode:!1,backBufferLength:30}),n.loadSource(r.url),n.attachMedia(e)}}).catch(function(){t||e.dispatchEvent(new Event("error"))}),function(){t=!0;try{e.pause()}catch(i){}if(n){try{n.destroy()}catch(i){}n=null}e.removeAttribute("src");try{e.load()}catch(i){}}}function qe(e){return he(e)}function ot(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function ma(e,r,t,n,a,i){e&&e.shadowRoot&&ot(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Ir(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&kr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ie(a)}function Cn(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=xe(e.rating,L);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=fe(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-modal-author",p.textContent=e.author||"",t.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-modal-body",l.textContent=(e.comment||"").trim(),l.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var s=document.createElement("div");s.className="renuvex-pr-modal-reply-label",s.textContent=U(L&&L.merchantReplyLabel,"Ma\u011Faza Sahibi");var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",u.appendChild(s),u.appendChild(m),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function xa(e,r,t){var n=t||L,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=xe(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=fe(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var p=a.querySelector(".renuvex-pr-modal-body");p.textContent=(r.comment||"").trim(),p.style.display=r.comment&&r.comment.trim()?"":"none";var l=a.querySelector(".renuvex-pr-modal-reply");l.querySelector(".renuvex-pr-modal-reply-label").textContent=U(n&&n.merchantReplyLabel,"Ma\u011Faza Sahibi"),l.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",l.style.display=r.merchantReply?"":"none",e.scrollTop=0}function lt(e,r,t,n,a,i,o,p,l){var u=qe(e),s=Math.max(0,Math.min(t||0,u.length-1)),m=u[s],d=document.createElement("div");d.className="renuvex-pr-modal-left";var v=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(m&&m.type==="video"){var w=document.createElement("video");w.className="renuvex-pr-modal-main-video"+(v?" "+v:""),w.setAttribute("aria-label","Yorum videosu"),w.addEventListener("error",function(){if(!d.querySelector(".renuvex-pr-modal-img-error")){var M=document.createElement("div");M.className="renuvex-pr-modal-img-error",M.setAttribute("role","status"),M.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",d.insertBefore(M,w)}}),d.__renuvexMediaCleanup=ca(w,m),d.appendChild(w)}else{var c=document.createElement("img");if(c.className="renuvex-pr-modal-main-img"+(v?" "+v:""),c.src=tt(m?m.url:""),c.decoding="async",c.width=rt,c.height=Math.round(rt*4/3),c.alt="Yorum foto\u011Fraf\u0131",!v){c.classList.add("renuvex-pr-modal-img-loading");var g=function(){c.classList.remove("renuvex-pr-modal-img-loading")};c.complete&&c.naturalWidth>0?g():(c.addEventListener("load",g,{once:!0}),c.addEventListener("error",g,{once:!0}))}Kt(c,function(M){if(M.style.display="none",!d.querySelector(".renuvex-pr-modal-img-error")){var R=document.createElement("div");R.className="renuvex-pr-modal-img-error",R.setAttribute("role","status"),R.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",d.insertBefore(R,M)}}),d.appendChild(c)}var b=document.createElement("button");b.className="renuvex-pr-modal-close-mobile";var h=q(me);h&&b.appendChild(h),b.setAttribute("aria-label","Kapat"),b.onclick=function(M){M.stopPropagation(),i()},d.appendChild(b);var f=0;if(d.addEventListener("touchstart",function(M){f=M.touches[0].clientX},{passive:!0}),d.addEventListener("touchend",function(M){var R=f-M.changedTouches[0].clientX;if(!(Math.abs(R)<50)){if(R>0){if(C)be(e,r,s+1,n,a,i,!0,"next",p,l);else if(T){var I=n[r+1];be(I,r+1,0,n,a,i,!1,"next",p,l)}}else if(y)be(e,r,s-1,n,a,i,!0,"prev",p,l);else if(E){var _=n[r-1],O=qe(_);be(_,r-1,O.length-1,n,a,i,!1,"prev",p,l)}}},{passive:!0}),u.length>1){var k=document.createElement("div");k.className="renuvex-pr-modal-thumbs",u.forEach(function(M,R){var I=M.type==="video"?M.posterUrl:M.url,_=document.createElement("img"),O=Pr(I,Ar);_.src=O.src,_.srcset=O.srcset,_.loading="lazy",_.decoding="async",_.width=Ar,_.height=Ar,_.className="renuvex-pr-modal-thumb"+(R===s?" renuvex-pr-modal-thumb-active":""),_.alt="K\xFC\xE7\xFCk resim "+(R+1),Mr(_),_.tabIndex=0,_.setAttribute("role","button"),_.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(R+1)+" se\xE7"),R===s&&_.setAttribute("aria-current","true"),(function(V){function Z(){be(e,r,V,n,a,i,!0,null,p,l)}_.onclick=Z,_.onkeydown=function(Y){(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),Z())}})(R),k.appendChild(_)}),d.appendChild(k)}var y=s>0,C=s<u.length-1,E=r>0,T=r<n.length-1,x=y||E,S=C||T;if(x){var z=document.createElement("button");z.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var A=q(De);A&&z.appendChild(A),z.setAttribute("aria-label","\xD6nceki"),z.onclick=function(M){if(M.stopPropagation(),y)be(e,r,s-1,n,a,i,!0,"prev",p,l);else if(E){var R=n[r-1],I=qe(R);be(R,r-1,I.length-1,n,a,i,!1,"prev",p,l)}},d.appendChild(z)}if(S){var N=document.createElement("button");N.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var P=q(zr);P&&N.appendChild(P),N.setAttribute("aria-label","Sonraki"),N.onclick=function(M){if(M.stopPropagation(),C)be(e,r,s+1,n,a,i,!0,"next",p,l);else if(T){var R=n[r+1];be(R,r+1,0,n,a,i,!1,"next",p,l)}},d.appendChild(N)}return d}function fa(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=qe(n);a[0]&&a[0].type==="image"&&(new Image().src=tt(a[0].url))}})}function it(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function En(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){it(t),it(n),it(a)}i(),t&&ie(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function be(e,r,t,n,a,i,o,p,l,u){if(u&&(u.currentReview=e),o){var s=lt(e,r,t,n,a,i,p,l,u);a.firstChild&&(ot(a.firstChild),a.replaceChild(s,a.firstChild))}else{var s=lt(e,r,t,n,a,i,p,l,u),m=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&(ot(a.firstChild),a.replaceChild(s,a.firstChild)),m&&xa(m,e,u&&u.currentSettings),En(l,a)}fa(r,n)}function ve(e,r,t){var n=qe(e);if(!n.length)return;var a=(t||[]).filter(function(T){return qe(T).length>0}),i=a.findIndex(function(T){return T===e||T.id===e.id});i===-1&&(a.unshift(e),i=0);var o=n.findIndex(function(T){return T.url===r});o<0&&(o=0);var p=document.createElement("div");p.className="renuvex-pr-modal-overlay";var l=document.createElement("div");l.className="renuvex-pr-modal";var u=!1,s=null,m=Br(),d=Ce(),v=Rr(),w=Fr(),c={currentReview:e,currentSettings:L},g=null;function b(T){var x=T&&T.detail&&T.detail.settings;if(!(x&&x===g)){g=x||null,c.currentSettings=x||L;var S=l.querySelector(".renuvex-pr-modal-right");!S||!c.currentReview||xa(S,c.currentReview,c.currentSettings)}}function h(){u||(u=!0,window.removeEventListener(Ie,b),ma(s&&s.host,f,h,v,m,d))}function f(T){if(T.key==="Escape"){k();return}Or(T,p,s&&s.root)}function k(){u||(u=!0,window.removeEventListener(Ie,b),ma(s&&s.host,f,h,v,m,d),Ur(w))}document.addEventListener("keydown",f),window.addEventListener("popstate",h),window.addEventListener(Ie,b),p.onclick=function(){k()},l.onclick=function(T){T.stopPropagation()},l.appendChild(lt(e,i,o,a,l,k,null,p,c)),l.appendChild(Cn(e)),fa(i,a);var y=document.createElement("div");y.className="renuvex-pr-modal-wrap",y.tabIndex=-1,y.setAttribute("role","dialog"),y.setAttribute("aria-modal","true"),y.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),y.appendChild(l);var C=document.createElement("button");C.className="renuvex-pr-modal-close";var E=q(me);E&&C.appendChild(E),C.setAttribute("aria-label","Kapat"),C.onclick=function(T){T.stopPropagation(),k()},y.appendChild(C),p.appendChild(y),s=Lr(),je(s.root,Ye+Ve+_r),s.root.appendChild(p),Re(s.root),ie(y)}function or(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(n){(n.key==="Enter"||n.key===" "||n.key==="Spacebar")&&(n.preventDefault(),r())})}var mt={};Se(mt,{css:()=>li,meta:()=>oi,render:()=>pi});function Ge(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;Te(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var p=5;p>=1;p--){var l=r[p-1]||0,u=t>0?Math.round(l/t*100):0,s=a===p,m=l>0,d=U(L&&L.countLabel,"Yorum"),v=document.createElement("div");v.className="renuvex-pr-bar-row"+(m?"":" renuvex-pr-bar-empty")+(s?" renuvex-pr-bar-active":"")+(a&&!s?" renuvex-pr-bar-dimmed":""),m?(v.setAttribute("role","button"),v.setAttribute("tabindex","0"),v.setAttribute("aria-pressed",s?"true":"false"),v.setAttribute("aria-label",p+" y\u0131ld\u0131z, "+l.toLocaleString("tr-TR")+" "+d+", "+(s?"filtreyi kald\u0131r":"filtrele"))):v.setAttribute("aria-label",p+" y\u0131ld\u0131z, 0 "+d);for(var w="",c=1;c<=5;c++){var g=c<=p;w+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(g?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ae(g?"full":"outline")+"</span>"}v.innerHTML='<span class="renuvex-pr-bar-label">'+w+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+l.toLocaleString("tr-TR")+")</span>",m&&(function(b){function h(){i(b)}v.onclick=h,v.onkeydown=function(f){(f.key==="Enter"||f.key===" "||f.key==="Space"||f.key==="Spacebar")&&(f.preventDefault(),h())}})(p),o.appendChild(v)}return o}var ba="data-renuvex-pr-dismiss-gesture",Oe=[],ga=!1,Hr=!1,lr=[],Ke=null;function ha(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function pt(){for(var e=Oe.length-1;e>=0;e--){var r=Oe[e].element;r&&r.isConnected===!1&&Oe.splice(e,1)}return Oe}function Tn(e){!e||typeof e.setAttribute!="function"||(lr.indexOf(e)===-1&&lr.push(e),e.setAttribute(ba,""))}function ya(){for(var e=0;e<lr.length;e++){var r=lr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(ba)}lr=[],Ke&&typeof clearTimeout=="function"&&clearTimeout(Ke),Ke=null}function An(e){if(Hr){Hr=!1,ya(),e.preventDefault(),e.stopPropagation();return}for(var r=pt(),t=!1,n=r.length-1;n>=0;n--){var a=r[n];ha(e,a.trigger)||ha(e,a.element)||a.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function Pn(e){if(e.key==="Escape")for(var r=pt(),t=r.length-1;t>=0;t--)r[t].close()}function wa(){ga||typeof document=="undefined"||(document.addEventListener("click",An,!0),document.addEventListener("keydown",Pn),ga=!0)}function Mn(e){wa(),Hr=!0,Tn(e),Ke&&typeof clearTimeout=="function"&&clearTimeout(Ke),typeof setTimeout=="function"&&(Ke=setTimeout(function(){Hr=!1,ya()},700))}function ut(e){Mn(e)}function Vr(e){wa();var r={trigger:e.trigger,element:e.element,close:e.close};return Oe.push(r),{unregister:function(){var t=Oe.indexOf(r);t!==-1&&Oe.splice(t,1)},notifyOpening:function(){for(var t=pt(),n=0;n<t.length;n++)t[n]!==r&&t[n].close()}}}function re(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var p=document.createElement("button");p.className="renuvex-pr-write-btn",p.textContent=U(L&&L.writeButtonText,"Yorum Yap"),p.onclick=a,o.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var s=L&&L.filterIcon||"lines";u.innerHTML=ne(Dt(s));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var d=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function w(){return r&&r.parentNode||r||null}function c(f,k){if(!(k===!0||!f)){if(f.type==="touchstart"){ut(w());return}if(f.type==="pointerdown"){var y=f.pointerType||"";y&&y!=="mouse"&&ut(w());return}}}function g(f){var k=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var y=f&&(f.restoreFocus===!0||f.restoreFocus==="auto"&&Ce());if(k&&y)try{u.focus({preventScroll:!0})}catch(C){try{u.focus()}catch(E){}}return k}function b(){h.notifyOpening(),m.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var f=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");f&&requestAnimationFrame(function(){try{f.focus({preventScroll:!0})}catch(k){try{f.focus()}catch(y){}}})}d.forEach(function(f){var k=f[2],y=k?n:!n&&(t||"newest")===f[0],C=document.createElement("button");C.type="button",C.className="renuvex-pr-filter-item"+(y?" renuvex-pr-filter-item-active":""),C.setAttribute("role","menuitem"),C.textContent=f[1];var E=!1;function T(x,S){x&&(x.preventDefault(),x.stopPropagation()),!E&&(E=!0,v=!0,c(x,S),g({restoreFocus:S}),i(f[0],k),setTimeout(function(){E=!1,v=!1},0))}C.addEventListener("pointerdown",function(x){x.button!==void 0&&x.button!==0||x.pointerType!=="mouse"&&T(x,!1)}),typeof window!="undefined"&&!window.PointerEvent&&C.addEventListener("touchstart",function(x){T(x,!1)},{passive:!1}),C.addEventListener("keydown",function(x){(x.key==="Enter"||x.key===" ")&&T(x,!0)}),C.onclick=function(x){T(x,!1)},m.appendChild(C)}),u.onclick=function(){m.classList.contains("renuvex-pr-open")?g({restoreFocus:"auto"}):b()},l.addEventListener("keydown",function(f){f.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(f.stopPropagation(),g({restoreFocus:!0}))}),l.addEventListener("focusout",function(f){if(m.classList.contains("renuvex-pr-open")&&!v){var k=f.relatedTarget;k&&l.contains(k)||g()}});var h=Vr({trigger:l,element:m,close:g});return l.appendChild(u),l.appendChild(m),o.appendChild(l),o}var ka=`
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
`;function za(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,n=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,a=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",o.appendChild(p);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var u=q(me);u&&l.appendChild(u),o.appendChild(l);var s=!1,m=null,d=null,v=!1;function w(){ie(i)}function c(E){Or(E,i,m&&m.root)}function g(){if(!s){if(s=!0,document.removeEventListener("keydown",b),i.removeEventListener("click",h),l.removeEventListener("click",g),v)ie(d);else{var E=m&&m.root?m.root.activeElement:null;if(E&&typeof E.blur=="function")try{E.blur()}catch(T){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){m?(kr(m.root),m.host&&m.host.parentNode&&m.host.parentNode.removeChild(m.host)):i.parentNode&&i.parentNode.removeChild(i),Ir();try{r()}catch(T){}},200)}}function b(E){if(E.key==="Escape"){g();return}c(E)}function h(E){E.target===i&&a&&g()}document.addEventListener("keydown",b),i.addEventListener("click",h),l.addEventListener("click",g);function f(E){d=t||Br(),v=n===null?Ce():n,E&&p.appendChild(E),m=Lr(),je(m.root,Ye+Ve+ka),m.root.appendChild(i),Re(m.root),Rr(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),w()})}var k=null,y=null;function C(E,T){if(T=T||"error",k){try{k.remove()}catch(x){}k=null}y&&(clearTimeout(y),y=null),k=document.createElement("div"),k.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+T,k.textContent=E,o.appendChild(k),y=setTimeout(function(){k&&(k.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(k){try{k.remove()}catch(x){}k=null}},300))},4e3)}return{open:f,close:g,content:p,setAllowOutsideClose:function(E){a=!!E},setStepAttr:function(E){o.setAttribute("data-step",String(E))},showToast:C}}var dt=4;function Xe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Sa(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<dt&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}function Ca(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",p.setAttribute("aria-label","Geri"),p.innerHTML=ne(De)+"<span>Geri</span>",p.addEventListener("click",function(){n()}),o.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-footer-progress";for(var u=[],s=0;s<dt;s++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",l.appendChild(m),u.push(m)}o.appendChild(l);var d=document.createElement("button");d.type="button";var v=null;function w(g){v&&d.removeEventListener("click",v),v=g,g&&d.addEventListener("click",g)}o.appendChild(d);function c(g,b){var h=r.indexOf(g)!==-1,f=t.indexOf(g)!==-1,k=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0);if(h)g===2&&k?(d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Devam Et"),d.innerHTML="Devam Et",w(function(){i()})):(d.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",d.setAttribute("aria-label","Atla"),d.innerHTML="<span>Atla</span>",w(function(){a()})),d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),d.style.visibility="",d.tabIndex=0;else if(f){d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Sonraki"),d.innerHTML="Sonraki",d.style.visibility="",d.tabIndex=0;var y=Xe(g,b);d.disabled=!y,d.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!y),w(function(){d.disabled||i()})}else d.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",d.innerHTML="",d.style.visibility="hidden",d.tabIndex=-1,d.disabled=!0,w(null)}return{el:o,update:function(g,b){u.forEach(function(f,k){k+1<=g?f.classList.add("renuvex-pr-fwizard-progress-seg-active"):f.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var h=g<=1;p.style.visibility=h?"hidden":"",p.style.pointerEvents=h?"none":"",p.tabIndex=h?-1:0,c(g,b)},setNextDisabled:function(g){d.classList.contains("renuvex-pr-fwizard-cta-btn")&&(d.disabled=!!g,d.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!g))},setThanksState:function(g){p.style.visibility="hidden",l.style.visibility="hidden",d.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",d.setAttribute("aria-label","Devam Et"),d.innerHTML="Devam Et",d.style.visibility="",d.disabled=!1,d.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),w(g)}}}var Nn={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function oe(e){var r=L&&L[e];return!r&&e==="formStepMediaTitle"&&(r=L&&L.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=L&&L.formStepPhotosSubtitle),U(r,Nn[e])}function Ea(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=oe("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var p=nr(L||{});Te(p);var l=[];function u(g){l.forEach(function(b,h){var f=h<g;b.classList.toggle("renuvex-pr-fwizard-star-active",f),b.setAttribute("aria-checked",h+1===g?"true":"false"),b.innerHTML=f?ae("full"):ae("outline")})}function s(g){e.set({rating:g}),u(g)}function m(g){var b=l[g-1];if(b)try{b.focus()}catch(h){}}function d(g,b){b&&typeof b.preventDefault=="function"&&b.preventDefault(),b&&typeof b.stopPropagation=="function"&&b.stopPropagation(),!n&&(n=!0,s(g),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var v=1;v<=5;v++)(function(g){var b=document.createElement("button");b.type="button",b.className="renuvex-pr-fwizard-star",b.setAttribute("role","radio"),b.setAttribute("aria-label",g+" y\u0131ld\u0131z"),b.innerHTML=ae("outline"),b.addEventListener("mouseenter",function(){u(g)}),b.addEventListener("mouseleave",function(){u(e.get().rating)}),b.addEventListener("pointerdown",function(h){h.button&&h.button!==0||d(g,h)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(h){d(g,h)},{passive:!1}),b.addEventListener("mousedown",function(h){window.PointerEvent||d(g,h)}),b.addEventListener("keydown",function(h){if(h.key==="Enter"||h.key===" "){d(g,h);return}var f=0;h.key==="ArrowRight"||h.key==="ArrowUp"?f=Math.min(5,g+1):h.key==="ArrowLeft"||h.key==="ArrowDown"?f=Math.max(1,g-1):h.key==="Home"?f=1:h.key==="End"&&(f=5),f&&(h.preventDefault(),s(f),m(f))}),b.addEventListener("click",function(h){d(g,h)}),l.push(b),o.appendChild(b)})(v);u(e.get().rating);var w=null,c=function(g){var b=g&&g.detail&&g.detail.settings;b&&b===w||(w=b||null,p=nr(b||L||{}),u(e.get().rating))};return window.addEventListener(Ie,c),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Ie,c)}}}var Ta=3,Ln=10*1024*1024;function Dr(e,r){r=r||{};var t=!1,n=document.createElement("div");if(n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=oe("formStepPhotosTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-subtitle",i.textContent=oe("formStepPhotosSubtitle"),n.appendChild(i)}var o=document.createElement("div");o.className="renuvex-pr-fwizard-photo-card";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-photo-add",p.setAttribute("aria-label","Foto\u011Fraf ekle");var l=document.createElement("input");l.type="file",l.accept="image/*",l.multiple=!0,l.style.display="none",o.appendChild(p),o.appendChild(l);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),o.appendChild(u),n.appendChild(o);var s=r.revokeBlobUrl||function(h){h&&typeof h=="string"&&h.startsWith("blob:")&&URL.revokeObjectURL(h)},m=r.blobMap||{},d=r.urlToFinger||{};function v(){if(!t){var h=e.get().images||[],f=e.get().pendingImages||[],k=h.map(function(y){return{url:y,isPending:!1}}).concat(f.map(function(y){return{url:y.url,file:y.file,isPending:!0,error:y.error}}));u.innerHTML="",k.forEach(function(y){var C=m[y.url]||y.url,E=w(y,C);u.appendChild(E)}),g()}}function w(h,f){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var y=document.createElement("img");y.src=f,y.alt="",y.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(y);var C=document.createElement("div");C.className="renuvex-pr-fwizard-photo-loading",C.style.display="none",k.appendChild(C);var E=document.createElement("button");E.type="button",E.className="renuvex-pr-fwizard-photo-remove",E.setAttribute("aria-label","Kald\u0131r");var T=q(me);return T&&E.appendChild(T),k.appendChild(E),c(k,h,f),k}function c(h,f,k){var y=h.querySelector("img");y.src!==k&&(y.src=k);var C=h.querySelector(".renuvex-pr-fwizard-photo-loading");if(f.isPending&&f.error){C.style.display="flex",C.textContent="";var E=document.createElement("span");E.className="renuvex-pr-upload-error",E.textContent="\u2717 "+f.error,C.appendChild(E)}else C.style.display="none",C.textContent="";var T=h.querySelector(".renuvex-pr-fwizard-photo-remove");T.onclick=function(){var x=d[f.url]||(f.file?f.file.name+"_"+f.file.size:null),S=m[f.url],z={};x&&(z.fingerprints=(e.get().fingerprints||[]).filter(function(A){return A!==x})),f.isPending?z.pendingImages=(e.get().pendingImages||[]).filter(function(A){return A.url!==f.url}):z.images=(e.get().images||[]).filter(function(A){return A!==f.url}),e.set(z),s(f.url),s(S),delete d[f.url],S&&delete d[S],m[f.url]&&delete m[f.url]}}function g(){var h=(e.get().images||[]).length,f=(e.get().pendingImages||[]).length,k=h+f,y=k>=Ta;k>0?(o.classList.add("renuvex-pr-fwizard-photo-card--compact"),p.innerHTML=ne(jt)):(o.classList.remove("renuvex-pr-fwizard-photo-card--compact"),p.innerHTML=ne(Sr)+"<span>Foto\u011Fraf Ekle</span>"),y?(p.style.display="none",p.disabled=!0,l.disabled=!0):(p.style.display="flex",p.disabled=!1,l.disabled=!1,p.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}p.addEventListener("click",function(){l.disabled||l.click()}),l.onchange=async function(h){var f=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(h.target.files).slice(0,Ta-f);l.value="";var y=(e.get().pendingImages||[]).length,C=e.get().images||[],E=C.length;if(k.length!==0){for(var T=[],x=[],S=0;S<k.length;S++){var z=k[S],A=z.name+"_"+z.size,N=(e.get().fingerprints||[]).some(function(V){return V===A})||T.some(function(V){return V.file.name+"_"+V.file.size===A});if(!N){if(z.size>Ln){var P="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(P,"error"):alert(P);continue}var M=URL.createObjectURL(z);d[M]=A,T.push({url:M,file:z,error:null}),x.push({url:M,file:z});var R=(e.get().fingerprints||[]).slice();R.push(A),e.set({fingerprints:R})}}if(T.length!==0){var I=(e.get().pendingImages||[]).concat(T),_=async function(){for(var V=0;V<x.length;V++){var Z=x[V],Y=Z.file,J=Z.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var ue=(e.get().pendingImages||[]).filter(function(B){return B.url!==J}),we=(e.get().images||[]).slice();we.push(J),e.set({pendingImages:ue,images:we});continue}try{var le=await ge(ce+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:te})});if(!le.ok)throw le.status===429?new Error("rate_limit"):new Error("sign failed");var W=await le.json();if(!W.folder)throw new Error("sign folder missing");var F=new FormData;F.append("file",Y),F.append("api_key",W.api_key),F.append("timestamp",W.timestamp),F.append("signature",W.signature),F.append("folder",W.folder);var j=await fetch("https://api.cloudinary.com/v1_1/"+W.cloud_name+"/image/upload",{method:"POST",body:F}),H=await j.json();if(H.secure_url&&Er(H.secure_url)){var Me=(e.get().pendingImages||[]).some(function(B){return B.url===J});if(!Me)continue;m[H.secure_url]=J,d[H.secure_url]=d[J];var pe=(e.get().pendingImages||[]).filter(function(B){return B.url!==J}),er=(e.get().images||[]).slice();er.push(H.secure_url),e.set({pendingImages:pe,images:er});try{ge(ce+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:te,secureUrl:H.secure_url,metadata:{assetId:H.asset_id,publicId:H.public_id,version:H.version,resourceType:H.resource_type,format:H.format,width:H.width,height:H.height,bytes:H.bytes,signature:H.signature}})}).catch(function(){})}catch(B){}}else throw new Error("invalid image url")}catch(B){console.error("[renuvex-pr] Image upload failed:",B);var rr=B.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(rr,"error");var ke=(e.get().pendingImages||[]).map(function(G){return G.url===J?{url:G.url,file:G.file,error:rr}:G});e.set({pendingImages:ke})}}};if(E===0&&y===0){t=!0;var O=!r.canNavigate||r.canNavigate();O&&e.goNext()}e.set({pendingImages:I}),_()}}};var b=e.onChange(v);return v(),{el:n,openPicker:function(){l.disabled||l.click()},destroy:function(){t=!0,l.onchange=null,b&&b()}}}var _n=150*1024*1024,Rn=2,In=60,Bn=["video/mp4","video/quicktime"],On="renuvex_pr_video_upload_",Na="renuvex_pr_video_cancel_",pr=null,Aa=!1,Fn={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},Un={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},Je=class extends Error{constructor(r,t,n){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=n||null}};function La(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:Fn[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:Un[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function _a(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function Yr(e){return new Promise(function(r){setTimeout(r,e)})}function Hn(e,r){return new Promise(function(t,n){var a=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(a),r&&r.removeEventListener("abort",o),n(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function st(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function vt(e,r){return On+te+"_"+e+"_"+st(r)}function Ra(e,r){try{var t=window.sessionStorage.getItem(vt(e,r)),n=t?JSON.parse(t):null;return!n||typeof n.token!="string"||!n.expiresAt||new Date(n.expiresAt).getTime()<=Date.now()?null:n}catch(a){return null}}function Vn(e,r,t){try{window.sessionStorage.setItem(vt(e,r),JSON.stringify(t))}catch(n){}}function ur(e,r){try{window.sessionStorage.removeItem(vt(e,r))}catch(t){}}function Dn(e,r){return Na+te+"_"+e+"_"+st(r)}function Yn(e,r,t,n){if(!(!e||!r||!t)){var a={token:e,productId:r,expiresAt:n||null};try{window.sessionStorage.setItem(Dn(r,t),JSON.stringify(a))}catch(i){}}}function jn(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf(Na+te+"_")!==0)){var n=window.sessionStorage.getItem(t),a=n?JSON.parse(n):null;if(!a||typeof a.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:a.token})}}}catch(i){}return e}function Pa(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function Ze(e,r,t){var n=await ge(ce+e,r,t||2e4),a=await n.json().catch(function(){return{}});if(!n.ok){var i=Number(n.headers.get("Retry-After"));throw new Je(a.error||"video_request_failed",n.status,Number.isFinite(i)&&i>0?i:null)}return a.data||{}}async function Wn(e){try{return await Ze("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Pa(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Pa(e.key),!0):!1}}function jr(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():pr||(pr=(async function(){for(var e=jn(),r=0;r<e.length;r+=1)await Wn(e[r])})().finally(function(){pr=null}),pr)}function Wr(){typeof window=="undefined"||Aa||(Aa=!0,window.addEventListener("online",function(){jr()}),jr())}function qn(e,r,t,n){return new Promise(function(a,i){var o=new XMLHttpRequest,p=!1;function l(){t&&t.removeEventListener("abort",u)}function u(){p=!0,o.abort()}if(t){if(t.aborted)return i(new DOMException("Aborted","AbortError"));t.addEventListener("abort",u,{once:!0})}o.open("PUT",e,!0),o.upload.onprogress=function(s){s.lengthComputable&&n&&n(s.loaded)},o.onload=function(){if(l(),o.status<200||o.status>=300)return i(new Error("video_part_upload_failed"));var s=o.getResponseHeader("ETag");if(!s)return i(new Error("video_part_missing_etag"));a(s)},o.onerror=function(){l(),i(new Error("video_part_network_error"))},o.onabort=function(){l(),i(p?new DOMException("Aborted","AbortError"):new Error("video_part_aborted"))},o.send(r)})}async function Ia(e,r){return Ze("/api/public/upload/video/parts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,partNumbers:r})})}async function Gn(e){for(var r=0;r<3;){r+=1;try{var t=await Ia(e.token,[e.partNumber]),n=t.parts&&t.parts[0];if(!n||!n.uploadUrl)throw new Error("video_part_url_missing");var a=await qn(n.uploadUrl,e.blob,e.signal,e.onProgress);return{partNumber:e.partNumber,etag:a}}catch(i){if(e.signal&&e.signal.aborted||r>=3)throw i;await Yr(400*r)}}throw new Error("video_part_upload_failed")}function Kn(e,r,t,n){if(!Number.isFinite(e)||e<=0)return 0;var a=(t||[]).reduce(function(o,p){var l=(Number(p)-1)*r;return o+Math.max(0,Math.min(r,e-l))},0),i=Object.keys(n||{}).reduce(function(o,p){return o+Math.max(0,Number(n[p])||0)},0);return Math.min(95,Math.round((a+i)/e*95))}async function Xn(e){var r={};(e.completed||[]).forEach(function(s){r[s.partNumber]={partNumber:s.partNumber,etag:s.etag}});for(var t={},n=[],a=1;a<=e.partCount;a+=1)r[a]||n.push(a);function i(){e.onProgress(Kn(e.file.size,e.partSize,Object.keys(r).map(Number),t))}i();async function o(){for(;n.length>0;){if(e.signal.aborted)throw new DOMException("Aborted","AbortError");var s=n.shift(),m=(s-1)*e.partSize,d=await Gn({token:e.token,partNumber:s,blob:e.file.slice(m,Math.min(e.file.size,m+e.partSize)),signal:e.signal,onProgress:function(v){t[s]=v,i()}});delete t[s],r[s]=d,i()}}for(var p=[],l=Math.min(e.maxParallelParts||3,n.length||1),u=0;u<l;u+=1)p.push(o());return await Promise.all(p),Object.keys(r).map(function(s){return r[s]}).sort(function(s,m){return s.partNumber-m.partNumber})}function Jn(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function Ma(e,r,t){for(var n=Date.now(),a=n+600*1e3,i=0;Date.now()<a;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-n;try{var p=await Ze("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":p.status||"processing"),p.status==="ready")return p;if(p.status==="failed"||p.status==="aborted")throw new Je(p.errorCode||"video_processing_failed",409,null)}catch(l){if(r.aborted||l instanceof Je&&l.status===409||_a(l)||(i+=1,i>=3))throw l}await Hn(Jn(o),r)}throw new Je("video_processing_delayed",0,null)}async function Zn(e){for(var r=null,t=1;t<=3;t+=1)try{return await Ze("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(n){if(_a(n))return null;r=n,t<3&&await Yr(400*t)}throw r||new Error("video_status_failed")}async function $n(e,r,t,n){for(var a=10;a<=90;a+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(a),await Yr(120)}return n("processing"),await Yr(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function Ba(e){return!e||Bn.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>_n?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function Oa(e){return new Promise(function(r){var t=URL.createObjectURL(e),n=document.createElement("video"),a=!1;function i(o){if(!a){a=!0,n.removeAttribute("src");try{n.load()}catch(p){}URL.revokeObjectURL(t),r(o)}}n.preload="metadata",n.onloadedmetadata=function(){i(Number.isFinite(n.duration)?n.duration:null)},n.onerror=function(){i(null)},n.src=t,setTimeout(function(){i(null)},8e3)})}function Fa(e){return e===null?{ok:!0}:e<Rn||e>In?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function Ua(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return $n(e.file,e.signal,e.onProgress,e.onStatus);Wr(),await jr();var r=Ra(e.productId,e.file),t=r&&r.token,n=r;if(t){var a=await Zn(t);if(!a)ur(e.productId,e.file),t=null,n=null;else{if(a.status==="ready")return e.onToken&&e.onToken(t),e.onProgress(100),Object.assign({token:t},a);if(a.status==="uploaded"||a.status==="processing"){e.onToken&&e.onToken(t),e.onStatus("processing");var i=await Ma(t,e.signal,e.onStatus);return ur(e.productId,e.file),e.onProgress(100),Object.assign({token:t},i)}else(a.status==="failed"||a.status==="aborted")&&(ur(e.productId,e.file),t=null,n=null)}}if(!t){var o=await Ze("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:te,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:st(e.file)})});t=o.token,n=o,Vn(e.productId,e.file,o)}e.onToken&&e.onToken(t),e.onStatus("uploading");var p=await Ia(t),l=await Xn({token:t,file:e.file,partSize:n.partSize,partCount:n.partCount,maxParallelParts:n.maxParallelParts,completed:p.completed,signal:e.signal,onProgress:e.onProgress});e.onStatus("processing"),await Ze("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:t,parts:l})},3e4);var u=await Ma(t,e.signal,e.onStatus);return ur(e.productId,e.file),e.onProgress(100),Object.assign({token:t},u)}async function qr(e,r,t){var n=r&&t?Ra(r,t):null;e&&r&&t&&Yn(e,r,t,n&&n.expiresAt),r&&t&&ur(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(Wr(),await jr())}function Qn(e){return e?e.error?e.error:e.status==="processing"?"Video i\u015Fleniyor...":e.status==="processing_slow"?"Video haz\u0131rlan\u0131yor. Bu i\u015Flem biraz s\xFCrebilir.":e.status==="ready"?"Video haz\u0131r":"Video y\xFCkleniyor: %"+Math.max(0,Math.min(100,e.progress||0)):""}function Ha(e,r){r=r||{};var t=!1,n=null,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",o.textContent=oe("formStepMediaTitle"),i.appendChild(o);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=oe("formStepMediaSubtitle"),i.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-media-choices";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-media-choice",u.innerHTML=ne(Sr)+"<span>Foto\u011Fraf Ekle</span>";var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-media-choice",s.innerHTML=ne(Cr)+"<span>Video Ekle</span>",l.appendChild(u),l.appendChild(s),i.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-media-content",i.appendChild(m);var d=document.createElement("input");d.type="file",d.accept="video/mp4,video/quicktime,.mp4,.mov",d.style.display="none",i.appendChild(d);function v(){var x=e.get();return(x.images||[]).length>0||(x.pendingImages||[]).length>0}function w(){return e.get().videoUpload||null}function c(){if(!a){m.innerHTML="";return}a.retry.onclick=null,m.innerHTML="",a=null}function g(x){m.innerHTML="";var S=document.createElement("div");S.className="renuvex-pr-fwizard-video-card";var z=document.createElement("video");z.className="renuvex-pr-fwizard-video-preview",z.muted=!0,z.playsInline=!0,z.preload="metadata",z.src=x.localUrl||"",S.appendChild(z);var A=document.createElement("div");A.className="renuvex-pr-fwizard-video-details";var N=document.createElement("div");N.className="renuvex-pr-fwizard-video-name",N.textContent=x.file?x.file.name:"Video";var P=document.createElement("div");P.className="renuvex-pr-fwizard-video-status",P.setAttribute("role","status"),P.setAttribute("aria-live","polite"),A.appendChild(N),A.appendChild(P);var M=document.createElement("progress");M.className="renuvex-pr-fwizard-video-progress",M.max=100,M.setAttribute("aria-label","Video y\xFCkleme ilerlemesi"),A.appendChild(M);var R=document.createElement("button");R.type="button",R.className="renuvex-pr-fwizard-video-retry",R.textContent="Tekrar Dene",S.appendChild(A);var I=document.createElement("button");I.type="button",I.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",I.setAttribute("aria-label","Videoyu kald\u0131r");var _=q(me);_&&I.appendChild(_);function O(V){V&&(V.preventDefault(),V.stopPropagation()),y()}I.addEventListener("pointerdown",O),I.addEventListener("click",O),S.appendChild(I),m.appendChild(S),a={card:S,preview:z,localUrl:x.localUrl||"",details:A,name:N,status:P,progress:M,retry:R,remove:I}}function b(){if(!t){var x=w();if(!x){c();return}(!a||a.localUrl!==(x.localUrl||""))&&g(x),a.name.textContent=x.file?x.file.name:"Video",a.status.className="renuvex-pr-fwizard-video-status"+(x.error?" renuvex-pr-fwizard-video-status--error":""),a.status.setAttribute("role",x.error?"alert":"status"),a.status.textContent=Qn(x);var S=x.status==="uploading";a.progress.hidden=!S,a.progress.value=x.progress||0;var z=!!(x.error&&x.file&&x.retryable!==!1);a.retry.onclick=z?function(){k(x.file,x.localUrl,x.durationMs)}:null,z&&!a.retry.isConnected?a.details.appendChild(a.retry):!z&&a.retry.isConnected&&a.retry.remove()}}function h(){var x=v(),S=!!w();u.disabled=S,s.disabled=x||S,u.classList.toggle("renuvex-pr-fwizard-media-choice--active",x),s.classList.toggle("renuvex-pr-fwizard-media-choice--active",S)}function f(x){var S=w();if(S){var z=Object.keys(x),A=z.some(function(N){return S[N]!==x[N]});A&&e.set({videoUpload:Object.assign({},S,x)})}}async function k(x,S,z){var A=Ba(x);if(!A.ok){r.showToast&&r.showToast(A.message,"error");return}var N=z!==void 0?Number.isFinite(z)?z/1e3:null:await Oa(x),P=Fa(N);if(!P.ok){r.showToast&&r.showToast(P.message,"error");return}var M=S||URL.createObjectURL(x),R=new AbortController;e.set({videoUpload:{file:x,localUrl:M,token:null,status:"uploading",progress:0,durationMs:N===null?null:Math.round(N*1e3),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:R}});try{var I=await Ua({file:x,productId:e.get().productId,signal:R.signal,onToken:function(O){f({token:O})},onProgress:function(O){f({progress:O})},onStatus:function(O){f({status:O})}});if(I.previewOnly&&I.posterUrl&&I.posterUrl!==M)try{URL.revokeObjectURL(I.posterUrl)}catch(O){}f({token:I.token,status:"ready",progress:100,posterUrl:I.previewOnly?M:I.posterUrl,durationMs:I.durationMs||(N===null?null:Math.round(N*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(O){if(R.signal.aborted)return;var _=La(O);f({status:"failed",error:_.message,errorCode:_.code,retryable:_.retryable,retryAfterSec:_.retryAfterSec,controller:null}),r.showToast&&r.showToast(_.message,"error")}}function y(){var x=w();x&&(x.controller&&x.controller.abort(),qr(x.token,e.get().productId,x.file),r.revokeBlobUrl&&r.revokeBlobUrl(x.localUrl),e.set({videoUpload:null}))}function C(x){n||(a=null,m.innerHTML="",n=Dr(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0}),m.appendChild(n.el),x&&n.openPicker&&n.openPicker())}u.onclick=function(){u.disabled||C(!0)},s.onclick=function(){s.disabled||d.click()},d.onchange=function(){var x=d.files&&d.files[0];d.value="",x&&k(x,null,void 0)};var E=!!w(),T=e.onChange(function(){h();var x=!!w();(x||E)&&b(),E=x});return h(),v()&&C(!1),w()&&b(),{el:i,destroy:function(){t=!0,u.onclick=null,s.onclick=null,d.onchange=null,n&&n.destroy&&n.destroy(),T&&T()}}}var ct=2e3,ei=60;function Va(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=oe("formStepContentTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=ei,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var p=document.createElement("textarea");p.className="renuvex-pr-fwizard-textarea",p.placeholder="Deneyiminizi anlat\u0131n\u2026",p.maxLength=ct,p.rows=6,p.setAttribute("aria-label","Yorum"),p.value=e.get().comment||"",i.appendChild(p);var l=document.createElement("div");l.className="renuvex-pr-fwizard-char-counter",l.setAttribute("aria-live","polite"),i.appendChild(l);function u(){var m=p.value.length;l.textContent=m+"/"+ct,l.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=ct)}function s(){return Xe(3,e.get())}return p.addEventListener("input",function(){e.set({comment:p.value}),u(),t(s())}),n.appendChild(i),u(),setTimeout(function(){t(s())},0),{el:n,destroy:function(){}}}var ri=40;function Da(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=oe("formStepAuthorTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var p=document.createElement("div");p.className="renuvex-pr-fwizard-field";var l=document.createElement("label");l.className="renuvex-pr-fwizard-label",l.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=ri,u.setAttribute("aria-required","true"),u.value=e.get().author||"",p.appendChild(l),p.appendChild(u),o.appendChild(p);var s=document.createElement("div");s.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var d=document.createElement("input");d.type="email",d.className="renuvex-pr-fwizard-input",d.setAttribute("autocomplete","email"),d.value=e.get().email||"",s.appendChild(m),s.appendChild(d),o.appendChild(s);var v=document.createElement("div");v.className="renuvex-pr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(v);var w=document.createElement("div");w.className="renuvex-pr-fwizard-msg",w.setAttribute("role","alert"),w.setAttribute("aria-live","assertive"),o.appendChild(w);var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-submit-btn",c.textContent="G\xF6nder",o.appendChild(c),a.appendChild(o);function g(){return Xe(4,e.get())}function b(){var y=!g(),C=(e.get().pendingImages||[]).length,E=C>0,T=e.get().videoUpload,x=!!(T&&T.status!=="ready");E||x?(c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=x?"Video Haz\u0131rlan\u0131yor...":"Foto\u011Fraflar Y\xFCkleniyor..."):(c.disabled=y,c.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",y),c.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),b(),t(g())}),d.addEventListener("input",function(){e.set({email:d.value})}),b(),setTimeout(function(){t(g())},0);function h(){w.textContent=""}function f(y){h();var C=document.createElement("div");C.className="renuvex-pr-fwizard-msg-error",C.textContent=y||"",w.appendChild(C)}c.onclick=async function(){if(!c.disabled){var y=e.get(),C=(y.author||"").trim(),E=(y.comment||"").trim();if(d.value.trim()&&!d.checkValidity()){d.reportValidity();return}if(!C){f("Gerekli alan");return}if(!y.rating){f("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}c.disabled=!0,c.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var T=c.textContent;if(c.textContent="G\xF6nderiliyor\u2026",h(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){y.videoUpload&&y.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n()},600);return}try{var x=Wt(window.location.href),S=y.productName||null,z=await ge(ce+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:te,productId:y.productId||null,slug:x||null,productName:S,author:C,title:(y.title||"").trim()||null,comment:E||null,rating:y.rating,images:y.videoUpload?[]:y.images||[],videoToken:y.videoUpload&&y.videoUpload.status==="ready"?y.videoUpload.token:null})},15e3);if(z.ok)y.videoUpload&&y.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n();else{var A=await z.json().catch(function(){return{}});throw new Error(A.error||"Yorum kaydedilemedi.")}}catch(M){var N=M&&(M.name==="AbortError"||/signal/i.test(M.message||"")),P=N?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":M.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(P,"error"):f(P),c.disabled=!1,c.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),c.textContent=T}}};var k=e.onChange(b);return{el:a,destroy:function(){c.onclick=null,k&&k()}}}function ti(e,r,t){if(t=t||{},e===1)return Ea(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return Ha(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Dr(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return Va(r,{onValidityChange:t.onValidityChange});if(e===4)return Da(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Ya(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function ja(e){e=e||{},Wr();var r=Sa({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:L&&L.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},n={},a={};function i(S){if(!(!S||typeof S!="string"||!S.startsWith("blob:")||a[S])){a[S]=!0;try{URL.revokeObjectURL(S)}catch(z){}}}function o(){Object.keys(n).forEach(function(z){i(z)}),Object.keys(t).forEach(function(z){i(t[z])});var S=r.get();(S.pendingImages||[]).forEach(function(z){i(z&&z.url)}),(S.images||[]).forEach(function(z){i(z)}),S.videoUpload&&i(S.videoUpload.localUrl)}function p(){var S=r.get(),z=S.videoUpload;!z||S.videoSubmitted||(z.controller&&z.controller.abort(),qr(z.token,S.productId,z.file))}var l=za({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",s),Ur(u),p(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),u=Fr(),s=function(S){l&&l.close&&l.close()};window.addEventListener("popstate",s);var m=document.createElement("div");m.className="renuvex-pr-fwizard-step-wrap";var d=Ca({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),v=document.createElement("div");v.className="renuvex-pr-fwizard-layout",v.appendChild(m),v.appendChild(d.el);var w=null,c="idle",g=null,b=!0,h=null;function f(S,z){m.innerHTML="";var A=ti(S,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:n,revokeBlobUrl:i,onValidityChange:function(M){d.setNextDisabled(!M)},onSuccess:y,showToast:l.showToast});if(w=A,d.update(S,r.get()),z){c="entering",A.el.classList.add("renuvex-pr-fwizard-step--enter");var N=null,P=function(){N&&clearTimeout(N),A.el.removeEventListener("animationend",P),A.el.classList.remove("renuvex-pr-fwizard-step--enter"),c="idle",g!==null&&C()};A.el.addEventListener("animationend",P),N=setTimeout(P,700)}else c="idle";m.appendChild(A.el),l.setStepAttr&&l.setStepAttr(S),S===3&&d.setNextDisabled(!0)}var k=!1;function y(){if(!k){if(k=!0,!w){m.innerHTML="";var S=Ya();S.classList.add("renuvex-pr-fwizard-step--enter"),m.appendChild(S),l.setStepAttr("thanks"),d.setThanksState(l.close);return}var z=w;c="exiting",z.el.classList.add("renuvex-pr-fwizard-step--exit");var A=function(){if(h&&clearTimeout(h),z.el.removeEventListener("animationend",A),z.destroy)try{z.destroy()}catch(P){}w===z&&(w=null),m.innerHTML="";var N=Ya();N.classList.add("renuvex-pr-fwizard-step--enter"),m.appendChild(N),l.setStepAttr("thanks"),d.setThanksState(l.close),c="idle"};z.el.addEventListener("animationend",A),h=setTimeout(A,300)}}function C(){var S=r.get().currentStep;if(c!=="idle"){g=S;return}if(!w){var z=!b;b=!1,f(S,z);return}var A=w;c="exiting",A.el.classList.add("renuvex-pr-fwizard-step--exit");var N=function(){if(h&&clearTimeout(h),A.el.removeEventListener("animationend",N),A.destroy)try{A.destroy()}catch(M){}if(w===A){m.innerHTML="",w=null;var P=g!==null?g:r.get().currentStep;g=null,f(P,!0),c="idle"}};A.el.addEventListener("animationend",N),h=setTimeout(N,350)}C();var E=r.get().currentStep,T=r.onChange(function(S){S.currentStep!==E?(E=S.currentStep,C()):d.update(S.currentStep,S)}),x=l.close;return l.close=function(){T&&T(),typeof h!="undefined"&&h&&clearTimeout(h),x()},l.open(v),{close:l.close}}var ai=4e3;async function Wa(){var e=await ge(ce+"/api/public/upload/video/capability?storeId="+encodeURIComponent(te),{method:"GET",cache:"no-store"},ai);if(!e.ok)throw new Error("video_capability_unavailable");var r=await e.json().catch(function(){return{}}),t=r&&r.data;if(!t||typeof t.enabled!="boolean")throw new Error("video_capability_invalid");return{enabled:t.enabled===!0,reason:typeof t.reason=="string"?t.reason:null}}var Gr=null;function ni(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function ii(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:L&&L.videoReviewsEnabled===!0,reason:null};else try{t=await Wa()}catch(n){t={enabled:!1,reason:"capability_unavailable"}}ja({productId:D||"",productName:Le||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function X(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=ni(r);return Gr||(Gr=ii(r,Ce()).finally(function(){Gr=null})),Gr.finally(t)}var qa=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var oi={id:"classic",name:"Klasik (A\xE7\u0131k)"},li=qa;function pi(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,s=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange;Te(a);var v=document.createElement("div");v.className="renuvex-pr-summary";var w=(o[3]||0)+(o[4]||0),c=i>0?Math.round(w/i*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-avg",g.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ae("full")+'</span><span class="renuvex-pr-avg-num">'+p+"</span>",v.appendChild(g);var b=document.createElement("div");if(b.className="renuvex-pr-summary-block renuvex-pr-summary-count",b.textContent=i.toLocaleString("tr-TR")+" "+U(n.countLabel,"Yorum"),v.appendChild(b),n.showRecommendation!==!1&&c>0){var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",h.innerHTML='<span class="renuvex-pr-recommend-pct">%'+c+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(h)}return v.appendChild(Ge({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:m})),v.appendChild(re({widget:r,currentOrderBy:u,currentHasImages:s,onWriteClick:X,onSortChange:d})),v}var xt={};Se(xt,{css:()=>di,meta:()=>ui,render:()=>mi});var Ga=`
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
`;var ui={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},di=Ga,si="__unknown_product__",dr=Object.create(null);function vi(e){return e?String(e):si}var Fe=null,sr=null;function ci(){!Fe||!sr||(Fe.removeEventListener?Fe.removeEventListener("change",sr):Fe.removeListener&&Fe.removeListener(sr),Fe=null,sr=null)}function mi(e){var r=e.widget,t=e.productId,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,u=e.currentOrderBy,s=e.currentHasImages,m=e.onFilterChange,d=e.onSortChange,v=vi(t),w=document.createElement("div");w.className="renuvex-pr-summary renuvex-pr-summary-compact";var c=document.createElement("div");c.className="renuvex-pr-compact-header";var g=document.createElement("div");g.className="renuvex-pr-compact-trigger-wrap";var b=document.createElement("button");b.className="renuvex-pr-compact-trigger",b.type="button",b.setAttribute("aria-expanded","false"),b.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Ae(p,a)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+ne(Yt)+"</span>";var h=b.querySelector(".renuvex-pr-compact-trigger-text"),f=b.querySelector(".renuvex-pr-compact-chevron");if(h&&(h.textContent=i.toLocaleString("tr-TR")+" "+U(n.countLabel,"Yorum")),h&&f){var k=document.createElement("span");k.className="renuvex-pr-compact-trigger-count",b.insertBefore(k,h),k.appendChild(h),k.appendChild(f)}g.appendChild(b),c.appendChild(g);var y=re({widget:r,currentOrderBy:u,currentHasImages:s,onWriteClick:X,onSortChange:d}),C=y.querySelector(".renuvex-pr-filter-wrap"),E=y.querySelector(".renuvex-pr-write-btn"),T=document.createElement("div");T.className="renuvex-pr-compact-actions-slot",E&&T.appendChild(E),C&&T.appendChild(C),c.appendChild(T),w.appendChild(c);var x=document.createElement("div");x.className="renuvex-pr-compact-panel",x.setAttribute("role","dialog"),x.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),x.setAttribute("aria-hidden","true");var S=document.createElement("div");S.className="renuvex-pr-compact-panel-inner";var z=document.createElement("div");z.className="renuvex-pr-compact-avg",z.innerHTML='<span class="renuvex-pr-icon">'+ae("full")+"</span><span>"+p+"</span>",S.appendChild(z),S.appendChild(Ge({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:l,onFilterChange:function(F){N()&&x.classList.contains("renuvex-pr-open")&&(dr[v]=!0),m(F)}})),x.appendChild(S);var A=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function N(){return!!(A&&A.matches)}function P(F){F?x.classList.add("renuvex-pr-open"):x.classList.remove("renuvex-pr-open"),x.setAttribute("aria-hidden",F?"false":"true"),b.setAttribute("aria-expanded",F?"true":"false")}function M(F){var j=F?w:g;if(x.parentNode!==j){var H=!!x.parentNode;x.classList.contains("renuvex-pr-open")&&P(!1),H&&(dr[v]=!1),j.appendChild(x)}}M(A?A.matches:!1);var R=re({widget:r,currentOrderBy:u,currentHasImages:s,onWriteClick:X,onSortChange:d}),I=R.querySelector(".renuvex-pr-filter-wrap"),_=R.querySelector(".renuvex-pr-write-btn"),O=document.createElement("div");O.className="renuvex-pr-compact-write-row",_&&O.appendChild(_),I&&O.appendChild(I),w.appendChild(O);function V(){var F=x.classList.contains("renuvex-pr-open");return P(!1),N()&&(dr[v]=!1),F}function Z(){Y&&Y.notifyOpening(),P(!0),N()&&(dr[v]=!0)}b.onclick=function(){x.classList.contains("renuvex-pr-open")?V():Z()};var Y=null;function J(F){Y&&(Y.unregister(),Y=null),F||(Y=Vr({trigger:g,element:x,close:V}))}if(J(A?A.matches:!1),ci(),A){var ue=function(F){M(F.matches),J(F.matches)};A.addEventListener?A.addEventListener("change",ue):A.addListener&&A.addListener(ue),Fe=A,sr=ue}if(N()&&dr[v]&&P(!0),n.showRecommendation!==!1){var we=(o[3]||0)+(o[4]||0),le=i>0?Math.round(we/i*100):0;if(le>0){var W=document.createElement("div");W.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",W.style.marginTop="8px",W.innerHTML='<span class="renuvex-pr-recommend-pct">%'+le+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",S.appendChild(W)}}return w}var ft={};Se(ft,{css:()=>fi,meta:()=>xi,render:()=>gi});var Ka=`
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
`;var xi={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},fi=Ka;function gi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,p=e.currentRatingFilter,l=e.currentOrderBy,u=e.currentHasImages,s=e.onFilterChange,m=e.onSortChange;Te(n);var d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-split";var v=document.createElement("div");v.className="renuvex-pr-split-col renuvex-pr-split-left";var w=document.createElement("div");w.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",w.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ae("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",v.appendChild(w);var c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",c.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),v.appendChild(c),d.appendChild(v);var g=document.createElement("div");g.className="renuvex-pr-split-col renuvex-pr-split-mid",g.appendChild(Ge({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:p,onFilterChange:s})),d.appendChild(g);var b=re({widget:r,currentOrderBy:l,currentHasImages:u,onWriteClick:X,onSortChange:m}),h=b.querySelector(".renuvex-pr-filter-wrap"),f=b.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-split-col renuvex-pr-split-right",f&&k.appendChild(f),h&&k.appendChild(h),d.appendChild(k);var y=(i[3]||0)+(i[4]||0),C=a>0?Math.round(y/a*100):0,E=document.createElement("div");E.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",E.innerHTML='<span class="renuvex-pr-recommend-pct">%'+C+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var T=t.showRecommendation===!1||C===0;return T&&E.classList.add("renuvex-pr-split-rec-hidden"),v.appendChild(E),d}var gt={};Se(gt,{css:()=>bi,meta:()=>hi,render:()=>yi});var Xa=`
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
`;var hi={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},bi=Xa;function yi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var s=document.createElement("div");s.className="renuvex-pr-minimal-info";var m=document.createElement("div");m.className="renuvex-pr-minimal-row";var d=document.createElement("span");d.className="renuvex-pr-minimal-avg",d.textContent=i,m.appendChild(d);var v=document.createElement("span");v.className="renuvex-pr-minimal-stars",v.innerHTML=Ae(i,n),m.appendChild(v);var w=document.createElement("span");w.className="renuvex-pr-minimal-count",w.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),m.appendChild(w),s.appendChild(m),u.appendChild(s);var c=re({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:X,onSortChange:l}),g=c.querySelector(".renuvex-pr-filter-wrap"),b=c.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");h.className="renuvex-pr-minimal-actions",b&&h.appendChild(b),g&&h.appendChild(g),u.appendChild(h);var f=re({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:X,onSortChange:l}),k=f.querySelector(".renuvex-pr-filter-wrap"),y=f.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");return C.className="renuvex-pr-minimal-write-row",y&&C.appendChild(y),k&&C.appendChild(k),u.appendChild(C),u}var ht={};Se(ht,{css:()=>ki,meta:()=>wi,render:()=>zi});var Ja=`
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
`;var wi={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},ki=Ja;function zi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var s=document.createElement("div");s.className="renuvex-pr-hero-info";var m=document.createElement("div");m.className="renuvex-pr-hero-rating-col";var d=document.createElement("span");d.className="renuvex-pr-hero-avg",d.textContent=i,m.appendChild(d);var v=document.createElement("div");v.className="renuvex-pr-hero-meta-row";var w=document.createElement("span");w.className="renuvex-pr-hero-stars",w.innerHTML=Ae(i,n),v.appendChild(w);var c=document.createElement("div");c.className="renuvex-pr-hero-count",c.textContent=a.toLocaleString("tr-TR")+" "+U(t.countLabel,"Yorum"),v.appendChild(c),m.appendChild(v),s.appendChild(m),u.appendChild(s);var g=re({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:X,onSortChange:l}),b=g.querySelector(".renuvex-pr-filter-wrap"),h=g.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");f.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",h&&f.appendChild(h),b&&f.appendChild(b),u.appendChild(f);var k=re({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:X,onSortChange:l}),y=k.querySelector(".renuvex-pr-filter-wrap"),C=k.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");return E.className="renuvex-pr-hero-write-row",C&&E.appendChild(C),y&&E.appendChild(y),u.appendChild(E),u}var Za=`
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
`;var Kr={classic:mt,compact:xt,split:ft,minimal:gt,hero:ht};function Xr(e){return Kr[e]||Kr.classic}function $a(){var e=Object.keys(Kr).map(function(r){return Kr[r].css||""}).join(`
`);return Za+`
`+e}var bt={};Se(bt,{css:()=>Ci,meta:()=>Si,render:()=>Ei});function Pe(e,r){r=r||{};var t=Qt(e);if(!t)return null;var n=document.createElement("img"),a=e.type==="image"?Pr(t,r.sourceWidth):{src:t,srcset:""};if(n.src=a.src,a.srcset&&(n.srcset=a.srcset),n.loading=r.loading||"lazy",n.decoding="async",e.type==="image"&&n.setAttribute("data-renuvex-img-url",e.url),r.width&&(n.width=r.width),r.height&&(n.height=r.height),n.alt="",Mr(n),e.type!=="video")return n.className=r.className||"",or(n,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),n;var i=document.createElement("button");i.type="button",i.className=(r.className||"")+" renuvex-pr-media-video-thumb",n.className="renuvex-pr-media-poster",i.appendChild(n);var o=document.createElement("span");o.className="renuvex-pr-media-play";var p=q(Cr);p&&o.appendChild(p),i.appendChild(o);var l=ea(e.durationMs);if(l){var u=document.createElement("span");u.className="renuvex-pr-media-duration",u.textContent=l,i.appendChild(u)}return or(i,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),i}function $e(e,r,t){var n=t||{},a=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,a.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var p=!1;o.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-body-clamped",!p),o.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:i,readMore:o}}function Qe(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=U(L&&L.merchantReplyLabel,"Ma\u011Faza Sahibi"),n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var p=!1;o.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-reply-text-clamped",!p),o.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Qa=`
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
`;var Si={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Ci=Qa;function Ei(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=xe(e.rating,L),a.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=fe(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-title",p.textContent=e.title,t.appendChild(p)}var l=document.createElement("div");l.className="renuvex-pr-author",l.textContent=e.author||"",t.appendChild(l);var u=(e.comment||"").trim();u&&t.appendChild($e(u,"renuvex-pr-body").fragment);var s=he(e);if(s.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",s.forEach(function(v){var w=Pe(v,{className:"renuvex-pr-img",sourceWidth:ee,width:ee,height:ee,onOpen:function(){ve(e,v.url,r)}});w&&m.appendChild(w)}),t.appendChild(m)}var d=Qe(e.merchantReply);return d&&t.appendChild(d),t}var yt={};Se(yt,{css:()=>Ai,meta:()=>Ti,render:()=>Pi});var en=`
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
`;var Ti={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},Ai=en;function Pi(e,r){var t=he(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=xe(e.rating,L),i.appendChild(o);var p=document.createElement("span");p.className="renuvex-pr-review-list-author-name",p.textContent=e.author||"",i.appendChild(p);var l=document.createElement("time");l.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=fe(e.createdAt),i.appendChild(l),a.appendChild(i);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var s=document.createElement("div");s.className="renuvex-pr-review-list-title",s.textContent=e.title,u.appendChild(s)}var m=(e.comment||"").trim();m&&u.appendChild($e(m,"renuvex-pr-review-list-body").fragment);var d=Qe(e.merchantReply);if(d&&u.appendChild(d),a.appendChild(u),n){var v=document.createElement("div");v.className="renuvex-pr-review-list-media",t.forEach(function(w){var c=Pe(w,{sourceWidth:ee,width:ee,height:Math.round(ee*4/3),onOpen:function(){ve(e,w.url,r)}});c&&v.appendChild(c)}),a.appendChild(v)}return a}var wt={};Se(wt,{css:()=>Ni,meta:()=>Mi,render:()=>Li});var rn=`
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
`;var Mi={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ni=rn;function Li(e,r){var t=Nr(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=xe(e.rating,L),i.appendChild(o),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-gallery-title",p.textContent=e.title,i.appendChild(p)}var l=document.createElement("div");l.className="renuvex-pr-review-gallery-author",l.textContent=e.author||"",i.appendChild(l);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=fe(e.createdAt),i.appendChild(u);var s=(e.comment||"").trim();if(s&&i.appendChild($e(s,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ve(e,t.url,r)}}:null).fragment),a.appendChild(i),n){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var d=Pe(t,{sourceWidth:Tr,width:Tr,height:Math.round(Tr*4/3),onOpen:function(){ve(e,t.url,r)}});d&&m.appendChild(d),a.appendChild(m)}var v=Qe(e.merchantReply,t?function(){ve(e,t.url,r)}:null);return v&&(v.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(v)),a}var Jr={card:bt,list:yt,gallery:wt};function Zr(e){return Jr[e]||Jr.card}function tn(){return Object.keys(Jr).map(function(e){return Jr[e].css||""}).join(`
`)}var kt=0;function Ue(){return kt++,kt}function He(e,r){return e!==kt?!1:r?!(r.productId!==void 0&&D!==r.productId||r.orderBy!==void 0&&K!==r.orderBy||r.page!==void 0&&ar!==r.page||r.ratingFilter!==void 0&&$!==r.ratingFilter||r.hasImages!==void 0&&Q!==r.hasImages||r.nextCursor!==void 0&&gr!==r.nextCursor):!0}var zt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},St={small:80,medium:110,large:140},Ct={small:80,medium:100,large:110};function an(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),n.appendChild(a),n.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var p=document.createElement("div");return p.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",p.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(p),r}function nn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var n=document.createElement("div");n.className="renuvex-pr-empty-state-stars",n.innerHTML=Ae(0,e.iconPair),t.appendChild(n);var a=document.createElement("p");a.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(a),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function on(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function ln(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function ye(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function $r(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Et(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function pn(e){return .2126*Et(e.r)+.7152*Et(e.g)+.0722*Et(e.b)}function un(e,r){var t=pn(e),n=pn(r),a=Math.max(t,n),i=Math.min(t,n);return(a+.05)/(i+.05)}function _i(e){var r=$r(e)||$r("#ffffff"),t=$r("#111111"),n=$r("#ffffff");return un(t,r)>=un(n,r)?"#111111":"#ffffff"}function Ri(e){return ye(e,e==="#ffffff"?.1:.06)}function dn(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",p=r.barTrackColor||"#e5e7eb",l=r.barCountColor||"#111111",u=ye(o,.06),s=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",d=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",w=r.filterBtnBgColor||"#111111",c=r.filterBtnTextColor||"#ffffff",g=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",h=r.filterMenuBorderColor||"#e5e7eb",f=r.filterItemTextColor||"#111111",k=r.filterItemHoverBgColor||"#f3f4f6",y=r.filterItemActiveColor||"#111111",C=r.reviewTitleColor||"#111111",E=r.reviewAuthorColor||"#111111",T=r.reviewDateColor||"#5e5e5e",x=r.reviewBodyColor||"#111111",S=r.reviewBorderColor||"#e5e7eb",z=ye(x,.65),A=r.replyBgColor||"#f9fafb",N=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",M=r.replyTextColor||"#111111",R=r.photoTitleColor||"#111111",I=ye("#111111",.05),_=r.photoArrowBgColor||"#ffffff",O=r.photoArrowTextColor||"#111111",V=ye("#111111",.12),Z=r.formBgColor||"#ffffff",Y=r.formPrimaryTextColor||"#111111",J=r.formSecondaryTextColor||"#3b3b3b",ue=r.inputTextColor||Y,we=r.inputBorderColor||"#d1d5db",le=r.placeholderColor||"#9ca3af",W=r.formStepBarColor||"#111111",F=r.formBtnBgColor||"#111111",j=r.formBtnTextColor||"#ffffff",H=r.formBtnBorderColor||"#111111",Me=ye(F,.06),pe=ye(F,.18),er=ye(j,.85),rr=ye(Y,.06),ke=_i(Z),B=Ri(ke),G=r.loadMoreBgColor||"#ffffff",ze=r.loadMoreTextColor||"#111111",Ne=r.loadMoreBorderColor||"#111111",vr=r.paginationBgColor||"#ffffff",cr=r.paginationTextColor||"#111111",mr=r.paginationBorderColor||"#e5e7eb",xr=r.paginationActiveBgColor||"#111111",fr=r.paginationActiveTextColor||"#ffffff",de={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":p,"--renuvex-pr-bar-count":l,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":d,"--renuvex-pr-btn-border":v,"--renuvex-pr-filter-btn-bg":w,"--renuvex-pr-filter-btn-text":c,"--renuvex-pr-filter-btn-border":g,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":h,"--renuvex-pr-filter-item-text":f,"--renuvex-pr-filter-item-hover-bg":k,"--renuvex-pr-filter-item-active":y,"--renuvex-pr-review-title":C,"--renuvex-pr-review-author":E,"--renuvex-pr-review-date":T,"--renuvex-pr-review-body":x,"--renuvex-pr-review-border":S,"--renuvex-pr-state-text":z,"--renuvex-pr-review-star-color":s,"--renuvex-pr-reply-bg-color":A,"--renuvex-pr-reply-border":N,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":M,"--renuvex-pr-photo-title":R,"--renuvex-pr-photo-image-border":I,"--renuvex-pr-photo-arrow-bg":_,"--renuvex-pr-photo-arrow-text":O,"--renuvex-pr-photo-arrow-border":V,"--renuvex-pr-fwizard-bg":Z,"--renuvex-pr-fwizard-text":Y,"--renuvex-pr-fwizard-secondary-text":J,"--renuvex-pr-fwizard-input-bg":Z,"--renuvex-pr-fwizard-input-text":ue,"--renuvex-pr-fwizard-input-border":we,"--renuvex-pr-fwizard-placeholder":le,"--renuvex-pr-fwizard-close-text":ke,"--renuvex-pr-fwizard-close-hover-bg":B,"--renuvex-pr-fwizard-progress-bg":rr,"--renuvex-pr-fwizard-progress-active":W,"--renuvex-pr-fwizard-btn-bg":F,"--renuvex-pr-fwizard-btn-text":j,"--renuvex-pr-fwizard-btn-border":H,"--renuvex-pr-fwizard-btn-disabled-bg":pe,"--renuvex-pr-fwizard-btn-disabled-text":er,"--renuvex-pr-fwizard-nav-hover-bg":Me,"--renuvex-pr-load-more-bg":G,"--renuvex-pr-load-more-text":ze,"--renuvex-pr-load-more-border":Ne,"--renuvex-pr-pagination-bg":vr,"--renuvex-pr-pagination-text":cr,"--renuvex-pr-pagination-border":mr,"--renuvex-pr-pagination-active-bg":xr,"--renuvex-pr-pagination-active-text":fr};Object.keys(de).forEach(function(tr){e.style.setProperty(tr,de[tr])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function sn(e){var r=e.settings,t=e.root,n=e.currentHasImages,a=e.openReviewModal,i=(e.photoStripReviews||[]).filter(function(f){return he(f).length>0});if(!(r.showPhotoGallery!==!1&&!n&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var p=U(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),l=document.createElement("div");l.className="renuvex-pr-photo-title",l.textContent=p,o.appendChild(l)}var u=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",u);var s=document.createElement("div");s.className="renuvex-pr-photo-strip";var m=ee,d=r.reviewLayout==="card"?ee:Math.round(ee*4/3),v=0;i.forEach(function(f){if(!(v>=15)){var k=Nr(f);if(k){var y=Pe(k,{className:"renuvex-pr-photo-strip-thumb",sourceWidth:ee,width:m,height:d,loading:v<3?"eager":"lazy",onOpen:function(){a(f,k.url,i)}});y&&(s.appendChild(y),v++)}}});var w=document.createElement("button");w.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var c=q(De);c&&w.appendChild(c),w.setAttribute("aria-label","\xD6nceki"),w.onclick=function(){s.scrollBy({left:-200,behavior:"smooth"})};var g=document.createElement("button");g.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var b=q(zr);b&&g.appendChild(b),g.setAttribute("aria-label","Sonraki"),g.onclick=function(){s.scrollBy({left:200,behavior:"smooth"})};var h=document.createElement("div");return h.className="renuvex-pr-photo-strip-wrap",h.appendChild(w),h.appendChild(s),h.appendChild(g),o.appendChild(h),o}var Ii=1,Bi=7,Tt="\u2026";function Oi(e,r){var t=Math.max(1,Math.floor(Number(r))||1),n=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=Bi){for(var a=[],i=1;i<=t;i++)a.push(i);return a}for(var o=[],p=1;p<=t;p++)(p===1||p===t||Math.abs(p-n)<=Ii)&&o.push(p);for(var l=[],u=0;u<o.length;u++)u>0&&o[u]-o[u-1]>1&&l.push(Tt),l.push(o[u]);return l}function vn(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),n=typeof e.onPageChange=="function"?e.onPageChange:function(){},a=document.createElement("nav");a.className="renuvex-pr-pagination",a.setAttribute("aria-label","Yorum sayfalar\u0131");function i(l){a.setAttribute("aria-busy","true");for(var u=a.querySelectorAll("button"),s=0;s<u.length;s++)u[s].disabled=!0;n(l)}function o(l,u){var s=document.createElement("span");s.className="renuvex-pr-pagination-label",s.setAttribute("aria-hidden","true"),s.textContent=u,l.appendChild(s)}function p(l,u,s,m){var d=document.createElement("button");return d.type="button",d.className="renuvex-pr-pagination-arrow",d.setAttribute("aria-label",l),o(d,u),m?d.disabled=!0:d.onclick=function(){i(s)},d}return a.appendChild(p("\xD6nceki sayfa","\u2039",t-1,t<=1)),Oi(t,r).forEach(function(l){if(l===Tt){var u=document.createElement("span");u.className="renuvex-pr-pagination-gap",u.setAttribute("aria-hidden","true"),u.textContent=Tt,a.appendChild(u);return}var s=document.createElement("button");s.type="button",s.className="renuvex-pr-pagination-btn",s.setAttribute("aria-label","Sayfa "+l),o(s,String(l)),l===t?s.setAttribute("aria-current","page"):s.onclick=function(){i(l)},a.appendChild(s)}),a.appendChild(p("Sonraki sayfa","\u203A",t+1,t>=r)),a}function cn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function mn(e){var r=e.render;async function t(){var o=Ue(),p=D,l=K,u=$,s=Q;Ee(null);var m=await Be(D,K,1,$,Q);He(o,{productId:p,orderBy:l,ratingFilter:u,hasImages:s})&&await r(D,L,m,Le,K,1,Pt)}async function n(o){var p=Ue(),l=$===o?null:o,u=D,s=K,m=Q;Nt(l),_e(1),Ee(null);var d=await Be(D,K,1,l,Q);He(p,{productId:u,orderBy:s,page:1,ratingFilter:l,hasImages:m})&&await r(D,L,d,Le,K,1)}async function a(o,p){var l=Ue(),u=D,s=$;_e(1),Ee(null);var m=o,d=!1;p&&(d=!0,m="newest"),Lt(d),hr(m);var v=await Be(D,m,1,$,d);He(l,{productId:u,orderBy:m,page:1,ratingFilter:s,hasImages:d})&&await r(D,L,v,Le,m,1)}async function i(o){var p=Ue(),l=D,u=K,s=$,m=Q;_e(o),Ee(null);var d=await Be(D,K,o,$,Q);if(He(p,{productId:l,orderBy:u,page:o,ratingFilter:s,hasImages:m})){await r(D,L,d,Le,K,o);var v=document.getElementById("renuvex-reviews"),w=v&&v.shadowRoot,c=w&&w.querySelector&&w.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(c){try{c.focus({preventScroll:!0})}catch(h){try{c.focus()}catch(f){}}cn(w,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var g=document.getElementById("renuvex-reviews");if(g&&typeof g.scrollIntoView=="function"){var b=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;g.scrollIntoView({behavior:b?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:n,onSortChange:a,onPageChange:i}}function Fi(){return Zt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Ui(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=Xt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),Jt(t,{surface:"reviews",productId:r||""}),t}async function At(e,r,t,n,a,i,o){if(Vt){wr({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:o});return}yr(!0),_t(e),Rt(r),o!==void 0&&It(o),Bt(n),a&&hr(a),i&&_e(i),t!=null&&(Ot(t),Ee(t&&t.data?t.data.nextCursor:null));var p=mn({render:At});try{let ke=function(B,G){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var ze=B.meta.sizeOverrides[G];ze&&Object.keys(ze).forEach(function(Ne){v.style.setProperty(Ne,ze[Ne])})}};var er=ke,l=Xr(r.summaryLayout),u=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),s=r.showTitle!==!1,m=U(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),d=u&&s?m:"",v=document.documentElement;dn(v,r);var w=r.borderRadius!==void 0?r.borderRadius:8,c=zt[r.size]||zt.medium,g=St[r.thumbnailSize]||St.medium,b=g;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(b=Ct[r.thumbnailSize]||Ct.medium),v.style.setProperty("--renuvex-pr-title-size",c.titleSize+"px"),v.style.setProperty("--renuvex-pr-review-text-size",c.reviewTextSize+"px"),v.style.setProperty("--renuvex-pr-review-title-size",c.reviewTitleSize+"px"),v.style.setProperty("--renuvex-pr-author-size",c.authorSize+"px"),v.style.setProperty("--renuvex-pr-reply-name-size",c.replyNameSize+"px"),v.style.setProperty("--renuvex-pr-reply-text-size",c.replyTextSize+"px"),v.style.setProperty("--renuvex-pr-radius",w+"px"),v.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,w-4)+"px"),v.style.setProperty("--renuvex-pr-photo-title-size",c.photoTitleSize+"px"),v.style.setProperty("--renuvex-pr-avg-rating-size",c.avgRatingSize+"px"),v.style.setProperty("--renuvex-pr-review-count-size",c.reviewCountSize+"px"),v.style.setProperty("--renuvex-pr-compact-count-size",c.compactCountSize+"px"),v.style.setProperty("--renuvex-pr-recommend-size",c.recommendSize+"px"),v.style.setProperty("--renuvex-pr-btn-text-size",c.btnTextSize+"px"),v.style.setProperty("--renuvex-pr-bar-label-size",c.barLabelSize+"px"),v.style.setProperty("--renuvex-pr-minimal-avg-size",c.minimalAvgSize+"px"),v.style.setProperty("--renuvex-pr-hero-avg-size",c.heroAvgSize+"px"),v.style.setProperty("--renuvex-pr-minimal-count-size",c.minimalCountSize+"px"),v.style.setProperty("--renuvex-pr-hero-count-size",c.heroCountSize+"px"),v.style.setProperty("--renuvex-pr-bar-count-size",c.barCountSize+"px"),v.style.setProperty("--renuvex-pr-review-date-size",c.reviewDateSize+"px"),v.style.setProperty("--renuvex-pr-filter-text-size",c.filterTextSize+"px"),v.style.setProperty("--renuvex-pr-load-more-size",c.loadMoreSize+"px"),v.style.setProperty("--renuvex-pr-load-more-min-height",c.loadMoreMinHeight+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-y",c.loadMorePadY+"px"),v.style.setProperty("--renuvex-pr-load-more-pad-x",c.loadMorePadX+"px"),v.style.setProperty("--renuvex-pr-load-more-mobile-min-height",c.loadMoreMobileMinHeight+"px"),v.style.setProperty("--renuvex-pr-pagination-button-size",c.paginationButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-pad-x",c.paginationPadX+"px"),v.style.setProperty("--renuvex-pr-pagination-gap",c.paginationGap+"px"),v.style.setProperty("--renuvex-pr-pagination-margin-top",c.paginationMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-gap-min",c.paginationGapMin+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-button-size",c.paginationMobileButtonSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-font-size",c.paginationMobileFontSize+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap",c.paginationMobileGap+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",c.paginationMobileMarginTop+"px"),v.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",c.paginationMobileGapMin+"px"),v.style.setProperty("--renuvex-pr-read-more-size",c.readMoreSize+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size",g+"px"),v.style.setProperty("--renuvex-pr-thumbnail-size-mobile",b+"px");var h=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";v.style.setProperty("--renuvex-pr-review-star-color",h),v.style.setProperty("--renuvex-pr-star-size",c.reviewStarSize+"px"),v.style.setProperty("--renuvex-pr-avg-star-size",c.avgStarSize+"px"),ke(Xr(r.summaryLayout),r.size),ke(Zr(r.reviewLayout),r.size);var f=nr(r),k=Fi();if(!k)return;var y=Ui(k,e),C=document.getElementById("renuvex-reviews");C||(C=document.createElement("div"),C.id="renuvex-reviews",C.style.minHeight="200px"),C.parentNode!==y&&y.appendChild(C);var E=ra(C),T=Ye+Ve+_r+$a()+tn();je(E,T);var x=aa(E);if(r.enabled===!1){C.style.minHeight="auto",x.replaceChildren(an(r.borderRadius!==void 0?r.borderRadius:8)),yr(!1);var S=br;wr(null),S&&At(S.productId,S.settings,S.reviewsData,S.productName,S.orderBy,S.page,S.badgeSettings);return}try{var z=t||{},A=at(z),N=A?[]:z.data&&z.data.reviews||[];Ft(N),x.replaceChildren();var P=document.createElement("section");if(P.id="renuvex-reviews-widget",P.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),P.className="renuvex-pr-reviews-widget",P.setAttribute("data-renuvex-surface","reviews"),e&&P.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(P.style.width="100%",P.style.maxWidth="100%",P.style.marginLeft="0",P.style.marginRight="0"),d){var M=document.createElement("div"),R=r.summaryLayout||"classic";M.className="renuvex-pr-title renuvex-pr-title-"+R,M.textContent=d,P.appendChild(M)}if(A){P.appendChild(ln(z.message,p.onRetry)),x.appendChild(P),Re(E),Qr(P,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return E.getElementById("renuvex-reviews-widget")});return}var I=z.data&&z.data.allCount||0,_=z.data&&z.data.ratingCounts||null,O=_||[0,0,0,0,0],V=z.data&&z.data.avgRating||"0.0";if(!_&&N.length>0){N.forEach(function(B){B.rating>=1&&B.rating<=5&&O[B.rating-1]++});var Z=N.reduce(function(B,G){return B+G.rating},0);V=(Z/N.length).toFixed(1)}if(I===0)P.classList.add("renuvex-pr-reviews-empty"),P.appendChild(nn({iconPair:f,writeButtonText:U(r.writeButtonText,"Yorum Yap"),emptyStateText:U(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:X}));else{var Y=Xr(r.summaryLayout),J=Y.render({widget:P,productId:e,data:z,settings:r,iconPair:f,allCount:I,ratingCounts:O,avgRatingVal:V,currentRatingFilter:$,currentOrderBy:K,currentHasImages:Q,onFilterChange:p.onFilterChange,onSortChange:p.onSortChange});P.appendChild(J);var ue=sn({settings:r,root:v,currentHasImages:Q,photoStripReviews:Mt,openReviewModal:ve,wireLightboxTrigger:or});if(ue&&P.appendChild(ue),N.length===0)P.appendChild(on());else{var we=Zr(r.reviewLayout);N.forEach(function(B){P.appendChild(we.render(B,et))})}var le=r.paginationMode==="numbered"?"numbered":"loadMore";if(le==="numbered"){var W=z.data&&z.data.totalPages||1;W>1&&P.appendChild(vn({page:z.data&&z.data.page||ar||1,totalPages:W,onPageChange:p.onPageChange}))}var F=le==="loadMore"&&z.data&&z.data.hasMore;if(F){let B=function(G){H.textContent=G,j.setAttribute("aria-label",G)};var rr=B,j=document.createElement("button");j.className="renuvex-pr-load-more";var H=document.createElement("span");H.className="renuvex-pr-load-more-label",H.setAttribute("aria-hidden","true"),j.appendChild(H),B("Daha Fazla G\xF6ster"),j.onclick=async function(){j.disabled=!0,B("Y\xFCkleniyor...");var G=Ue(),ze=D,Ne=K,vr=ar,cr=$,mr=Q,xr=gr,fr=vr+1,de=await Be(ze,Ne,fr,cr,mr,null,xr);if(He(G,{productId:ze,orderBy:Ne,page:vr,ratingFilter:cr,hasImages:mr,nextCursor:xr}))if(de&&!at(de)&&de.data&&Array.isArray(de.data.reviews)){var tr=Ut(de.data.reviews);Ht(tr),_e(fr),Ee(de.data.nextCursor||null);var xn=Zr(L.reviewLayout);tr.forEach(function(fn){P.insertBefore(xn.render(fn,et),j)}),de.data.hasMore?(j.disabled=!1,B("Daha Fazla G\xF6ster")):j.remove()}else j.disabled=!1,B("Tekrar Dene")},P.appendChild(j)}}x.appendChild(P),Re(E),Qr(P,"reviews-widget",{productId:e||""},function(){return E.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Me=document.createElement("p");Me.style.cssText="text-align:center;color:#dc2626;",Me.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",x&&x.replaceChildren(Me)}}finally{if(yr(!1),br){var pe=br;wr(null),At(pe.productId,pe.settings,pe.reviewsData,pe.productName,pe.orderBy,pe.page,pe.badgeSettings)}}}export{At as render};
