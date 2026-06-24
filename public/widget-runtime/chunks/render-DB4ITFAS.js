/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as je,d as _e}from"./chunk-N7KC6W47.js";import{b as vt,c as Fe}from"./chunk-W6RJS6FO.js";import{A as Zt,B as Qt,C as zr,D as Cr,E as Er,a as re,b as or,c as ie,d as oe,e as J,f as N,g as Vt,h as Be,j as kr,k as dt,l as Dt,m as Sr,n as Ie,o as Yt,p as jt,q as Wt,r as qt,s as Gt,t as Kt,u as Xt,v as Me,y as $t,z as Jt}from"./chunk-H43GKW4S.js";import{A as Se,B as Mr,C as ia,D as le,E as Lr,F as Rr,G as ut,H as st,I as Nr,J as oa,K as Br,L as la,M as pa,c as pt,e as Le,f as ue,g as se,h as ee,i as Oe,j as Tr,k as lr,l as ea,m as We,n as Ar,o as ra,p as we,q as Pr,r as ta,s as _r,u as H,v as aa,w as ke,x as Re,z as na}from"./chunk-OJJILCYF.js";import{c as ze}from"./chunk-WWGCW5YN.js";import{a as de,b as ye,h as da,i as Ue}from"./chunk-UOBLDAJF.js";import{a as lt,d as Pe}from"./chunk-D4BSMMIO.js";function ct(e){if(typeof e!="string"||!e)return!1;try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return!1;var t=r.hostname.toLowerCase();return t==="stream.mux.com"||t==="image.mux.com"}catch(n){return!1}}function On(e){return!e||!ct(e.href)?!1:e.hostname.toLowerCase()==="image.mux.com"?/\/thumbnail\.(jpg|jpeg|png|webp)$/i.test(e.pathname):!1}function Ir(e){if(typeof e!="string"||!e)return"";try{var r=new URL(e);if(r.protocol!=="https:"||r.username||r.password)return"";var t=r.hostname.toLowerCase();if(t!=="stream.mux.com"&&t!=="image.mux.com")return"";var n=r.pathname.split("/").filter(Boolean);return t==="stream.mux.com"&&n.length===1&&n[0].endsWith(".m3u8")?decodeURIComponent(n[0].slice(0,-5)):t==="image.mux.com"&&n.length>=2&&/^thumbnail\.(jpg|jpeg|png|webp)$/i.test(n[1])?decodeURIComponent(n[0]):""}catch(a){return""}}function Or(e){var r=Number(e);return Number.isFinite(r)&&r>0?Math.round(r):0}function qe(e,r){if(r=r||{},typeof e!="string"||!e)return"";var t;try{t=new URL(e)}catch(i){return e}if(!On(t))return e;var n=Or(r.width),a=Or(r.height);return n&&t.searchParams.set("width",String(n)),a&&t.searchParams.set("height",String(a)),t.hostname.toLowerCase()==="image.mux.com"&&(r.fit==="crop"||r.fit==="smartcrop"||r.fit==="pad"||r.fit==="stretch"||r.fit==="preserve"?t.searchParams.set("fit_mode",r.fit):r.fit&&t.searchParams.set("fit_mode","preserve")),t.href}function ua(e,r){r=r||{};var t=Or(r.width),n=Or(r.height);if(!t&&!n)return"";var a=qe(e,{width:t,height:n,fit:r.fit}),i=qe(e,{width:t?t*2:0,height:n?n*2:0,fit:r.fit});return!a||!i||a===e||i===e?"":a+" 1x, "+i+" 2x"}function Ce(e){var r=[],t={},n=e&&Array.isArray(e.media)?e.media:[];return n.forEach(function(a){if(!(!a||typeof a!="object")){if(a.type==="video"){if(!ct(a.url)||!ct(a.posterUrl||a.thumbnailUrl))return;var i=typeof a.playbackId=="string"?a.playbackId.trim():"",o=Ir(a.url);if(i&&o&&i!==o||(i=i||o,!i))return;var l=Ir(a.posterUrl||a.thumbnailUrl);if(l!==i)return;var p="video:"+a.url;if(t[p])return;t[p]=!0,r.push({type:"video",url:a.url,playbackId:i,posterUrl:a.posterUrl||a.thumbnailUrl,thumbnailUrl:a.thumbnailUrl||a.posterUrl,durationMs:typeof a.durationMs=="number"?a.durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length});return}if(a.type==="image"&&Mr(a.url)){var d="image:"+a.url.trim();if(t[d])return;t[d]=!0,r.push({type:"image",url:a.url.trim(),thumbnailUrl:a.thumbnailUrl||null,posterUrl:null,durationMs:null,width:typeof a.width=="number"?a.width:null,height:typeof a.height=="number"?a.height:null,position:typeof a.position=="number"?a.position:r.length})}}}),ia(e).forEach(function(a){var i="image:"+a;t[i]||(t[i]=!0,r.push({type:"image",url:a,thumbnailUrl:null,posterUrl:null,durationMs:null,width:null,height:null,position:r.length}))}),r.sort(function(a,i){return a.position-i.position})}function Ur(e){var r=Ce(e);return r.length?r[0]:null}function sa(e){return e&&e.type==="video"?e.posterUrl:e&&e.url}function va(e){if(typeof e!="number"||e<=0)return"";var r=Math.max(0,Math.round(e/1e3)),t=Math.floor(r/60),n=String(r%60).padStart(2,"0");return t+":"+n}var Ge=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function ca(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Ke(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function Fr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function ma(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function fa(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var xa=`
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
`,ga=`
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
`;var ha=`
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
`;var ba=`
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
`;var ya=`
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
`;var wa=`
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
`;var ka=`
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-modal-wrap:focus,.renuvex-pr-modal-wrap:focus-visible{outline:none;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img,.renuvex-pr-modal-main-video{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;transition:opacity 0.25s ease;}
  .renuvex-pr-modal-main-video{border:0;--media-object-fit:contain;--media-object-position:center;--seek-backward-button:none;--seek-forward-button:none;--airplay-button:none;--pip-button:none;--cast-button:none;--playback-rate-button:none;--rendition-menu-button:none;--audio-track-menu-button:none;--controls-backdrop-color:rgba(0,0,0,0.58);--media-primary-color:#ffffff;--media-secondary-color:#000000;}
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
`;var Sa=`
  .renuvex-pr-media-video-thumb{position:relative;display:block;padding:0;overflow:hidden;appearance:none;-webkit-appearance:none;background:#111;border:0;color:#fff;font:inherit;line-height:1;text-align:initial;}
  .renuvex-pr-media-video-thumb .renuvex-pr-media-poster{display:block;width:100%;height:100%;object-fit:cover;}
  .renuvex-pr-media-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.68);color:#fff;pointer-events:none;}
  .renuvex-pr-media-play svg{width:17px;height:17px;margin-left:2px;}
  .renuvex-pr-media-duration{position:absolute;right:6px;bottom:6px;padding:3px 5px;border-radius:3px;background:rgba(0,0,0,.76);color:#fff;font-size:11px;line-height:1;pointer-events:none;}
  .renuvex-pr-media-video-thumb:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;}
`;var Hr=[xa,na,ha,ba,ya,wa,Sa,ka,ga].join(`
`);function Un(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function xe(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function Fn(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function Hn(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",i=Fn()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function Vn(e){var r=document.body.style,t=document.documentElement.style;xe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),xe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),xe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),xe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),xe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),xe(r,"position",e.bodyPosition,e.bodyPositionPriority),xe(r,"top",e.bodyTop,e.bodyTopPriority),xe(r,"left",e.bodyLeft,e.bodyLeftPriority),xe(r,"right",e.bodyRight,e.bodyRightPriority),xe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var pr=0,Xe=null;function Vr(){return pr+=1,pr>1||(Xe=Un(),Hn(Xe)),Xe}function Dr(){if(pr!==0&&(pr-=1,!(pr>0))){var e=Xe;Xe=null,e&&Vn(e)}}function Dn(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function Yr(){var e=Dn();return!e||e===document.body||e===document.documentElement?null:e}function ve(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function Yn(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function mt(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Yn)}function jn(e,r){var t=e,n=mt(e);!n.length&&r&&(t=r,n=mt(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;ve(a)}function jr(e,r,t){if(e.key==="Tab"){var n=mt(r);if(!n.length){e.preventDefault(),jn(r);return}var a=n[0],i=n[n.length-1],o=ma(t);if(!r.contains(o)){e.preventDefault(),ve(a);return}if(n.indexOf(o)===-1){e.preventDefault(),ve(e.shiftKey?i:a);return}e.shiftKey&&o===a?(e.preventDefault(),ve(i)):!e.shiftKey&&o===i&&(e.preventDefault(),ve(a))}}var za="renuvexPrOverlay";function Wr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[za]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function Wn(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[za]===e.id)}function qr(e){if(Wn(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}var qn="media-theme-renuvex-review-storefront";var Ca="renuvex-review-storefront",Ea={controlForeground:"#ffffff",controlBackground:"#000000",controlHoverBackground:"rgba(0,0,0,0.84)",controlsBackdrop:"rgba(0,0,0,0.58)",menuBackground:"#000000",menuBorder:"rgba(255,255,255,0.18)",menuText:"#ffffff",menuCheckedText:"#ffffff",menuHoverBackground:"rgba(255,255,255,0.12)",menuCheckedBackground:"rgba(255,255,255,0.18)",menuHoverOutline:"rgba(255,255,255,0.54) solid 1px",progressPlayed:"#ffffff",progressTrack:"#000000",progressPointer:"rgba(255,255,255,0.72)",progressBuffered:"rgba(255,255,255,0.28)",progressThumbBorder:"1px solid rgba(255,255,255,0.72)",progressThumbShadow:"0 0 0 1px rgba(0,0,0,0.45)",progressPointerBorder:"1px solid rgba(0,0,0,0.55)"},Gn=lt({},Ea),dr=lt({},Ea),Gr=null;function Ta(e){return`
  :host {
    --media-control-hover-background: ${e.controlHoverBackground};
    --media-icon-color: ${e.controlForeground};
    --media-text-color: ${e.controlForeground};
  }

  media-control-bar,
  media-control-bar *,
  .center-controls,
  .center-controls * {
    --media-control-hover-background: ${e.controlHoverBackground};
    --media-icon-color: ${e.controlForeground};
    --media-text-color: ${e.controlForeground};
  }

  .center-controls.pre-playback media-play-button,
  [breakpointsm] .center-controls.pre-playback media-play-button {
    --media-control-background: ${e.controlBackground};
    --media-control-hover-background: ${e.controlHoverBackground};
    --media-icon-color: ${e.controlForeground};
  }

  media-time-range {
    --media-range-bar-color: ${e.progressPlayed};
    --media-range-thumb-background: radial-gradient(
      circle,
      ${e.controlBackground} 0%,
      ${e.controlBackground} 32%,
      ${e.controlForeground} 32%,
      ${e.controlForeground} 100%
    );
    --media-range-thumb-border: ${e.progressThumbBorder};
    --media-range-thumb-box-shadow: ${e.progressThumbShadow};
    --media-range-track-background: ${e.progressTrack};
    --media-range-track-pointer-background: ${e.progressPointer};
    --media-range-track-pointer-border-right: ${e.progressPointerBorder};
    --media-time-range-buffered-color: ${e.progressBuffered};
  }

  [part~='menu'] {
    border-color: ${e.menuBorder};
    color: ${e.menuText};
  }

  media-captions-menu,
  media-rendition-menu,
  media-audio-track-menu,
  media-playback-rate-menu {
    --media-menu-background: ${e.menuBackground};
    --media-menu-item-checked-background: ${e.menuCheckedBackground};
    --media-menu-item-hover-background: ${e.menuHoverBackground};
    --media-menu-item-hover-outline: ${e.menuHoverOutline};
    --media-text-color: ${e.menuText};
    color: ${e.menuText};
  }

  media-playback-rate-menu[part~='menu']::part(checked) {
    color: ${e.menuCheckedText};
  }
`}var Yo=Ta(Gn),Kn=Ta(dr);function Xn(e,r){if(typeof window=="undefined"||typeof document=="undefined")return;let t=window.customElements;if(t.get(e))return;let n=t.get("media-theme-gerwig"),a=n==null?void 0:n.template;if(!n||!(a instanceof HTMLTemplateElement))return;let i=a.cloneNode(!0);i.id=e;let o=document.createElement("style");o.textContent=r,i.content.append(o);class l extends n{}l.template=i,t.define(e,l)}function $n(e,r){return typeof window=="undefined"?Promise.resolve():(Gr!=null||(Gr=import("./gerwig-J4LRWRX2.js").then(()=>import("./dist-4Z3OQSFF.js")).then(()=>{})),Gr.then(()=>{Xn(e,r)}))}function Aa(){return $n(qn,Kn)}var ft=null;function Jn(){return ft||(ft=Aa()),ft}function Zn(e){if(!e||typeof e!="object")return"";var r=typeof e.playbackId=="string"?e.playbackId.trim():"",t=Ir(e.url);return r&&t&&r!==t?"":r||t}function Qn(e,r){var t=Zn(r);if(!t)return!1;var n=qe(r.posterUrl||"",{width:1280,height:720,fit:"preserve"})||r.posterUrl||"";return e.setAttribute("disable-tracking",""),e.setAttribute("disable-cookies",""),e.setAttribute("preload","metadata"),e.setAttribute("stream-type","on-demand"),e.setAttribute("playsinline",""),e.setAttribute("hotkeys","noarrowleft noarrowright"),e.setAttribute("theme",Ca),e.setAttribute("accent-color",dr.controlForeground),e.setAttribute("primary-color",dr.controlForeground),e.setAttribute("secondary-color",dr.controlBackground),n&&e.setAttribute("poster",n),e.setAttribute("playback-id",t),!0}function Pa(e){e.preventDefault()}function _a(e,r){var t=!1,n=document.createElement("mux-player");n.className=r||"renuvex-pr-modal-main-video",n.setAttribute("aria-label","Yorum videosu"),n.addEventListener("contextmenu",Pa);var a=Qn(n,e);return a?Jn().catch(function(){t||n.dispatchEvent(new Event("error"))}):setTimeout(function(){t||n.dispatchEvent(new Event("error"))},0),{element:n,cleanup:function(){t=!0;try{typeof n.pause=="function"&&n.pause()}catch(o){}n.removeAttribute("playback-id"),n.removeAttribute("playback-token"),n.removeAttribute("thumbnail-token"),n.removeAttribute("poster"),n.removeEventListener("contextmenu",Pa)}}}function $e(e){return Ce(e)}function gt(e){if(e&&typeof e.__renuvexMediaCleanup=="function"){try{e.__renuvexMediaCleanup()}catch(r){}e.__renuvexMediaCleanup=null}}function Ma(e,r,t,n,a,i){e&&e.shadowRoot&&gt(e.shadowRoot.querySelector(".renuvex-pr-modal-left")),Dr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&Tr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),i&&ve(a)}function ei(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ke(e.rating,N);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=Se(e.createdAt),n.appendChild(a),n.appendChild(i),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-modal-body",p.textContent=(e.comment||"").trim(),p.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(p);var d=document.createElement("div");d.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=H(N&&N.merchantReplyLabel,"Ma\u011Faza Sahibi");var v=document.createElement("div");return v.className="renuvex-pr-modal-reply-text",v.textContent=e.merchantReply||"",d.appendChild(m),d.appendChild(v),d.style.display=e.merchantReply?"":"none",t.appendChild(d),r.appendChild(t),r}function La(e,r,t){var n=t||N,a=e.querySelector(".renuvex-pr-modal-scroll-content"),i=a.querySelector(".renuvex-pr-modal-stars");i.innerHTML=ke(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=Se(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=a.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var p=a.querySelector(".renuvex-pr-modal-reply");p.querySelector(".renuvex-pr-modal-reply-label").textContent=H(n&&n.merchantReplyLabel,"Ma\u011Faza Sahibi"),p.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",p.style.display=r.merchantReply?"":"none",e.scrollTop=0}function ht(e,r,t,n,a,i,o,l,p){var d=$e(e),m=Math.max(0,Math.min(t||0,d.length-1)),v=d[m],u=document.createElement("div");u.className="renuvex-pr-modal-left";var s=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";if(v&&v.type==="video"){var x=_a(v,"renuvex-pr-modal-main-video"+(s?" renuvex-pr-modal-video-enter":"")),f=x.element;f.addEventListener("error",function(){if(!u.querySelector(".renuvex-pr-modal-img-error")){var M=document.createElement("div");M.className="renuvex-pr-modal-img-error",M.setAttribute("role","status"),M.textContent="Bu video \u015Fu anda oynat\u0131lam\u0131yor.",u.insertBefore(M,f)}}),u.__renuvexMediaCleanup=x.cleanup,u.appendChild(f)}else{var c=document.createElement("img");if(c.className="renuvex-pr-modal-main-img"+(s?" "+s:""),c.src=st(v?v.url:""),c.decoding="async",c.width=ut,c.height=Math.round(ut*4/3),c.alt="Yorum foto\u011Fraf\u0131",!s){c.classList.add("renuvex-pr-modal-img-loading");var h=function(){c.classList.remove("renuvex-pr-modal-img-loading")};c.complete&&c.naturalWidth>0?h():(c.addEventListener("load",h,{once:!0}),c.addEventListener("error",h,{once:!0}))}oa(c,function(M){if(M.style.display="none",!u.querySelector(".renuvex-pr-modal-img-error")){var P=document.createElement("div");P.className="renuvex-pr-modal-img-error",P.setAttribute("role","status"),P.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",u.insertBefore(P,M)}}),u.appendChild(c)}var b=document.createElement("button");b.className="renuvex-pr-modal-close-mobile";var w=ee(we);w&&b.appendChild(w),b.setAttribute("aria-label","Kapat"),b.onclick=function(M){M.stopPropagation(),i()},u.appendChild(b);var E=0;if(u.addEventListener("touchstart",function(M){E=M.touches[0].clientX},{passive:!0}),u.addEventListener("touchend",function(M){var P=E-M.changedTouches[0].clientX;if(!(Math.abs(P)<50)){if(P>0){if(g)Ee(e,r,m+1,n,a,i,!0,"next",l,p);else if(C){var B=n[r+1];Ee(B,r+1,0,n,a,i,!1,"next",l,p)}}else if(S)Ee(e,r,m-1,n,a,i,!0,"prev",l,p);else if(k){var R=n[r-1],Y=$e(R);Ee(R,r-1,Y.length-1,n,a,i,!1,"prev",l,p)}}},{passive:!0}),d.length>1){var T=document.createElement("div");T.className="renuvex-pr-modal-thumbs",d.forEach(function(M,P){var B=M.type==="video"?M.posterUrl:M.url,R=document.createElement("img"),Y=Nr(B,Rr);R.src=Y.src,R.srcset=Y.srcset,R.loading="lazy",R.decoding="async",R.width=Rr,R.height=Rr,R.className="renuvex-pr-modal-thumb"+(P===m?" renuvex-pr-modal-thumb-active":""),R.alt="K\xFC\xE7\xFCk resim "+(P+1),Br(R),R.tabIndex=0,R.setAttribute("role","button"),R.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(P+1)+" se\xE7"),P===m&&R.setAttribute("aria-current","true"),(function(G){function V(){Ee(e,r,G,n,a,i,!0,null,l,p)}R.onclick=V,R.onkeydown=function(F){(F.key==="Enter"||F.key===" ")&&(F.preventDefault(),V())}})(P),T.appendChild(R)}),u.appendChild(T)}var S=m>0,g=m<d.length-1,k=r>0,C=r<n.length-1,z=S||k,A=g||C;if(z){var L=document.createElement("button");L.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var I=ee(We);I&&L.appendChild(I),L.setAttribute("aria-label","\xD6nceki"),L.onclick=function(M){if(M.stopPropagation(),S)Ee(e,r,m-1,n,a,i,!0,"prev",l,p);else if(k){var P=n[r-1],B=$e(P);Ee(P,r-1,B.length-1,n,a,i,!1,"prev",l,p)}},u.appendChild(L)}if(A){var _=document.createElement("button");_.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var y=ee(Ar);y&&_.appendChild(y),_.setAttribute("aria-label","Sonraki"),_.onclick=function(M){if(M.stopPropagation(),g)Ee(e,r,m+1,n,a,i,!0,"next",l,p);else if(C){var P=n[r+1];Ee(P,r+1,0,n,a,i,!1,"next",l,p)}},u.appendChild(_)}return u}function Ra(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=$e(n);a[0]&&a[0].type==="image"&&(new Image().src=st(a[0].url))}})}function xt(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ri(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){xt(t),xt(n),xt(a)}i(),t&&ve(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function Ee(e,r,t,n,a,i,o,l,p,d){if(d&&(d.currentReview=e),o){var m=ht(e,r,t,n,a,i,l,p,d);a.firstChild&&(gt(a.firstChild),a.replaceChild(m,a.firstChild))}else{var m=ht(e,r,t,n,a,i,l,p,d),v=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&(gt(a.firstChild),a.replaceChild(m,a.firstChild)),v&&La(v,e,d&&d.currentSettings),ri(p,a)}Ra(r,n)}function ge(e,r,t){var n=$e(e);if(!n.length)return;var a=(t||[]).filter(function(k){return $e(k).length>0}),i=a.findIndex(function(k){return k===e||k.id===e.id});i===-1&&(a.unshift(e),i=0);var o=n.findIndex(function(k){return k.url===r});o<0&&(o=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var p=document.createElement("div");p.className="renuvex-pr-modal";var d=!1,m=null,v=Yr(),u=_e(),s=Vr(),x=Wr(),f={currentReview:e,currentSettings:N},c=null;function h(k){var C=k&&k.detail&&k.detail.settings;if(!(C&&C===c)){c=C||null,f.currentSettings=C||N;var z=p.querySelector(".renuvex-pr-modal-right");!z||!f.currentReview||La(z,f.currentReview,f.currentSettings)}}function b(){d||(d=!0,window.removeEventListener(Ue,h),Ma(m&&m.host,w,b,s,v,u))}function w(k){if(k.key==="Escape"){E();return}jr(k,l,m&&m.root)}function E(){d||(d=!0,window.removeEventListener(Ue,h),Ma(m&&m.host,w,b,s,v,u),qr(x))}document.addEventListener("keydown",w),window.addEventListener("popstate",b),window.addEventListener(Ue,h),l.onclick=function(){E()},p.onclick=function(k){k.stopPropagation()},p.appendChild(ht(e,i,o,a,p,E,null,l,f)),p.appendChild(ei(e)),Ra(i,a);var T=document.createElement("div");T.className="renuvex-pr-modal-wrap",T.tabIndex=-1,T.setAttribute("role","dialog"),T.setAttribute("aria-modal","true"),T.setAttribute("aria-label","Yorum medyas\u0131 detay\u0131"),T.appendChild(p);var S=document.createElement("button");S.className="renuvex-pr-modal-close";var g=ee(we);g&&S.appendChild(g),S.setAttribute("aria-label","Kapat"),S.onclick=function(k){k.stopPropagation(),E()},T.appendChild(S),l.appendChild(T),m=Fr(),Ke(m.root,Ge+je+Hr),m.root.appendChild(l),Oe(m.root),ve(T)}function ur(e,r,t){!e||typeof r!="function"||(e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label",t||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),e.onclick=r,e.onkeydown=function(n){(n.key==="Enter"||n.key===" "||n.key==="Spacebar")&&(n.preventDefault(),r())})}var Et={};Pe(Et,{css:()=>Hi,meta:()=>Fi,render:()=>Vi});function Je(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,i=e.onFilterChange;Le(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var p=r[l-1]||0,d=t>0?Math.round(p/t*100):0,m=a===l,v=p>0,u=H(N&&N.countLabel,"Yorum"),s=document.createElement("div");s.className="renuvex-pr-bar-row"+(v?"":" renuvex-pr-bar-empty")+(m?" renuvex-pr-bar-active":"")+(a&&!m?" renuvex-pr-bar-dimmed":""),v?(s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-pressed",m?"true":"false"),s.setAttribute("aria-label",l+" y\u0131ld\u0131z, "+p.toLocaleString("tr-TR")+" "+u+", "+(m?"filtreyi kald\u0131r":"filtrele"))):s.setAttribute("aria-label",l+" y\u0131ld\u0131z, 0 "+u);for(var x="",f=1;f<=5;f++){var c=f<=l;x+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(c?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+ue(c?"full":"outline")+"</span>"}s.innerHTML='<span class="renuvex-pr-bar-label">'+x+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+d+'%;"></div></div><span class="renuvex-pr-bar-count">('+p.toLocaleString("tr-TR")+")</span>",v&&(function(h){function b(){i(h)}s.onclick=b,s.onkeydown=function(w){(w.key==="Enter"||w.key===" "||w.key==="Space"||w.key==="Spacebar")&&(w.preventDefault(),b())}})(l),o.appendChild(s)}return o}var Ia="data-renuvex-pr-dismiss-gesture",He=[],Na=!1,Kr=!1,sr=[],Ze=null;function Ba(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function bt(){for(var e=He.length-1;e>=0;e--){var r=He[e].element;r&&r.isConnected===!1&&He.splice(e,1)}return He}function ti(e){!e||typeof e.setAttribute!="function"||(sr.indexOf(e)===-1&&sr.push(e),e.setAttribute(Ia,""))}function Oa(){for(var e=0;e<sr.length;e++){var r=sr[e];r&&typeof r.removeAttribute=="function"&&r.removeAttribute(Ia)}sr=[],Ze&&typeof clearTimeout=="function"&&clearTimeout(Ze),Ze=null}function ai(e){if(Kr){Kr=!1,Oa(),e.preventDefault(),e.stopPropagation();return}for(var r=bt(),t=!1,n=r.length-1;n>=0;n--){var a=r[n];Ba(e,a.trigger)||Ba(e,a.element)||a.close()&&(t=!0)}t&&(e.preventDefault(),e.stopPropagation())}function ni(e){if(e.key==="Escape")for(var r=bt(),t=r.length-1;t>=0;t--)r[t].close()}function Ua(){Na||typeof document=="undefined"||(document.addEventListener("click",ai,!0),document.addEventListener("keydown",ni),Na=!0)}function ii(e){Ua(),Kr=!0,ti(e),Ze&&typeof clearTimeout=="function"&&clearTimeout(Ze),typeof setTimeout=="function"&&(Ze=setTimeout(function(){Kr=!1,Oa()},700))}function yt(e){ii(e)}function Xr(e){Ua();var r={trigger:e.trigger,element:e.element,close:e.close};return He.push(r),{unregister:function(){var t=He.indexOf(r);t!==-1&&He.splice(t,1)},notifyOpening:function(){for(var t=bt(),n=0;n<t.length;n++)t[n]!==r&&t[n].close()}}}function pe(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,i=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=H(N&&N.writeButtonText,"Yorum Yap"),l.onclick=a,o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-filter-wrap";var d=document.createElement("button");d.type="button",d.className="renuvex-pr-filter-btn",d.setAttribute("aria-label","Filtrele"),d.setAttribute("aria-haspopup","menu"),d.setAttribute("aria-expanded","false");var m=N&&N.filterIcon||"lines";d.innerHTML=se(ea(m));var v=document.createElement("div");v.className="renuvex-pr-filter-menu",v.setAttribute("role","menu");var u=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],s=!1;function x(){return r&&r.parentNode||r||null}function f(w,E){if(!(E===!0||!w)){if(w.type==="touchstart"){yt(x());return}if(w.type==="pointerdown"){var T=w.pointerType||"";T&&T!=="mouse"&&yt(x());return}}}function c(w){var E=v.classList.contains("renuvex-pr-open");v.classList.remove("renuvex-pr-open"),d.classList.remove("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","false");var T=w&&(w.restoreFocus===!0||w.restoreFocus==="auto"&&_e());if(E&&T)try{d.focus({preventScroll:!0})}catch(S){try{d.focus()}catch(g){}}return E}function h(){b.notifyOpening(),v.classList.add("renuvex-pr-open"),d.classList.add("renuvex-pr-filter-btn-active"),d.setAttribute("aria-expanded","true");var w=v.querySelector(".renuvex-pr-filter-item-active")||v.querySelector(".renuvex-pr-filter-item");w&&requestAnimationFrame(function(){try{w.focus({preventScroll:!0})}catch(E){try{w.focus()}catch(T){}}})}u.forEach(function(w){var E=w[2],T=E?n:!n&&(t||"newest")===w[0],S=document.createElement("button");S.type="button",S.className="renuvex-pr-filter-item"+(T?" renuvex-pr-filter-item-active":""),S.setAttribute("role","menuitem"),S.textContent=w[1];var g=!1;function k(C,z){C&&(C.preventDefault(),C.stopPropagation()),!g&&(g=!0,s=!0,f(C,z),c({restoreFocus:z}),i(w[0],E),setTimeout(function(){g=!1,s=!1},0))}S.addEventListener("pointerdown",function(C){C.button!==void 0&&C.button!==0||C.pointerType!=="mouse"&&k(C,!1)}),typeof window!="undefined"&&!window.PointerEvent&&S.addEventListener("touchstart",function(C){k(C,!1)},{passive:!1}),S.addEventListener("keydown",function(C){(C.key==="Enter"||C.key===" ")&&k(C,!0)}),S.onclick=function(C){k(C,!1)},v.appendChild(S)}),d.onclick=function(){v.classList.contains("renuvex-pr-open")?c({restoreFocus:"auto"}):h()},p.addEventListener("keydown",function(w){w.key==="Escape"&&v.classList.contains("renuvex-pr-open")&&(w.stopPropagation(),c({restoreFocus:!0}))}),p.addEventListener("focusout",function(w){if(v.classList.contains("renuvex-pr-open")&&!s){var E=w.relatedTarget;E&&p.contains(E)||c()}});var b=Xr({trigger:p,element:v,close:c});return p.appendChild(d),p.appendChild(v),o.appendChild(p),o}var Fa=`
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
`;function Ha(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.returnFocusElement?e.returnFocusElement:null,n=e&&typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,a=e&&e.allowOutsideClose!==!1,i=document.createElement("div");i.className="renuvex-pr-fwizard-overlay",i.tabIndex=-1,i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-label","Yorum yapma formu");var o=document.createElement("div");o.className="renuvex-pr-fwizard",i.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",o.appendChild(l);var p=document.createElement("button");p.className="renuvex-pr-fwizard-close",p.type="button",p.setAttribute("aria-label","Kapat");var d=ee(we);d&&p.appendChild(d),o.appendChild(p);var m=!1,v=null,u=null,s=!1;function x(){ve(i)}function f(g){jr(g,i,v&&v.root)}function c(){if(!m){if(m=!0,document.removeEventListener("keydown",h),i.removeEventListener("click",b),p.removeEventListener("click",c),s)ve(u);else{var g=v&&v.root?v.root.activeElement:null;if(g&&typeof g.blur=="function")try{g.blur()}catch(k){}}i.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(Tr(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):i.parentNode&&i.parentNode.removeChild(i),Dr();try{r()}catch(k){}},200)}}function h(g){if(g.key==="Escape"){c();return}f(g)}function b(g){g.target===i&&a&&c()}document.addEventListener("keydown",h),i.addEventListener("click",b),p.addEventListener("click",c);function w(g){u=t||Yr(),s=n===null?_e():n,g&&l.appendChild(g),v=Fr(),Ke(v.root,Ge+je+Fa),v.root.appendChild(i),Oe(v.root),Vr(),requestAnimationFrame(function(){i.classList.add("renuvex-pr-fwizard-open"),x()})}var E=null,T=null;function S(g,k){if(k=k||"error",E){try{E.remove()}catch(C){}E=null}T&&(clearTimeout(T),T=null),E=document.createElement("div"),E.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,E.textContent=g,o.appendChild(E),T=setTimeout(function(){E&&(E.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(E){try{E.remove()}catch(C){}E=null}},300))},4e3)}return{open:w,close:c,content:l,setAllowOutsideClose:function(g){a=!!g},setStepAttr:function(g){o.setAttribute("data-step",String(g))},showToast:S}}var wt=4;function Qe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Va(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],videoUpload:null,videoSubmitted:!1,videoEnabled:e.videoEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null,fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(i){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<wt&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(i){return i!==a})}}}}function Da(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},i=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=se(We)+"<span>Geri</span>",l.addEventListener("click",function(){n()}),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-footer-progress";for(var d=[],m=0;m<wt;m++){var v=document.createElement("span");v.className="renuvex-pr-fwizard-progress-seg",p.appendChild(v),d.push(v)}o.appendChild(p);var u=document.createElement("button");u.type="button";var s=null;function x(c){s&&u.removeEventListener("click",s),s=c,c&&u.addEventListener("click",c)}o.appendChild(u);function f(c,h){var b=r.indexOf(c)!==-1,w=t.indexOf(c)!==-1,E=h&&(h.images&&h.images.length>0||h.pendingImages&&h.pendingImages.length>0||!!h.videoUpload);if(b)c===2&&E?(u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",x(function(){i()})):(u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.setAttribute("aria-label","Atla"),u.innerHTML="<span>Atla</span>",x(function(){a()})),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),u.style.visibility="",u.tabIndex=0;else if(w){u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Sonraki"),u.innerHTML="Sonraki",u.style.visibility="",u.tabIndex=0;var T=Qe(c,h);u.disabled=!T,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!T),x(function(){u.disabled||i()})}else u.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",u.innerHTML="",u.style.visibility="hidden",u.tabIndex=-1,u.disabled=!0,x(null)}return{el:o,update:function(c,h){d.forEach(function(w,E){E+1<=c?w.classList.add("renuvex-pr-fwizard-progress-seg-active"):w.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var b=c<=1;l.style.visibility=b?"hidden":"",l.style.pointerEvents=b?"none":"",l.tabIndex=b?-1:0,f(c,h)},setNextDisabled:function(c){u.classList.contains("renuvex-pr-fwizard-cta-btn")&&(u.disabled=!!c,u.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!c))},setThanksState:function(c){l.style.visibility="hidden",p.style.visibility="hidden",u.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",u.setAttribute("aria-label","Devam Et"),u.innerHTML="Devam Et",u.style.visibility="",u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),x(c)}}}var oi={formStepRatingTitle:"Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",formStepPhotosTitle:"Foto\u011Frafl\u0131 de\u011Ferlendirme",formStepPhotosSubtitle:"Foto\u011Fraf ekleyebilirsiniz.",formStepMediaTitle:"Foto\u011Fraf veya video ekleyin",formStepMediaSubtitle:"En fazla 3 foto\u011Fraf veya 60 saniyelik 1 video ekleyebilirsiniz.",formStepContentTitle:"Deneyiminizi anlat\u0131n",formStepAuthorTitle:"Hakk\u0131n\u0131zda"};function ce(e){var r=N&&N[e];return!r&&e==="formStepMediaTitle"&&(r=N&&N.formStepPhotosTitle),!r&&e==="formStepMediaSubtitle"&&(r=N&&N.formStepPhotosSubtitle),H(r,oi[e])}function Ya(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent=ce("formStepRatingTitle"),t.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=lr(N||{});Le(l);var p=[];function d(c){p.forEach(function(h,b){var w=b<c;h.classList.toggle("renuvex-pr-fwizard-star-active",w),h.setAttribute("aria-checked",b+1===c?"true":"false"),h.innerHTML=w?ue("full"):ue("outline")})}function m(c){e.set({rating:c}),d(c)}function v(c){var h=p[c-1];if(h)try{h.focus()}catch(b){}}function u(c,h){h&&typeof h.preventDefault=="function"&&h.preventDefault(),h&&typeof h.stopPropagation=="function"&&h.stopPropagation(),!n&&(n=!0,m(c),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var s=1;s<=5;s++)(function(c){var h=document.createElement("button");h.type="button",h.className="renuvex-pr-fwizard-star",h.setAttribute("role","radio"),h.setAttribute("aria-label",c+" y\u0131ld\u0131z"),h.innerHTML=ue("outline"),h.addEventListener("mouseenter",function(){d(c)}),h.addEventListener("mouseleave",function(){d(e.get().rating)}),h.addEventListener("pointerdown",function(b){b.button&&b.button!==0||u(c,b)}),typeof window!="undefined"&&!window.PointerEvent&&h.addEventListener("touchstart",function(b){u(c,b)},{passive:!1}),h.addEventListener("mousedown",function(b){window.PointerEvent||u(c,b)}),h.addEventListener("keydown",function(b){if(b.key==="Enter"||b.key===" "){u(c,b);return}var w=0;b.key==="ArrowRight"||b.key==="ArrowUp"?w=Math.min(5,c+1):b.key==="ArrowLeft"||b.key==="ArrowDown"?w=Math.max(1,c-1):b.key==="Home"?w=1:b.key==="End"&&(w=5),w&&(b.preventDefault(),m(w),v(w))}),h.addEventListener("click",function(b){u(c,b)}),p.push(h),o.appendChild(h)})(s);d(e.get().rating);var x=null,f=function(c){var h=c&&c.detail&&c.detail.settings;h&&h===x||(x=h||null,l=lr(h||N||{}),d(e.get().rating))};return window.addEventListener(Ue,f),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Ue,f)}}}var $r=3,li=10*1024*1024;function Jr(e,r){r=r||{};var t=!1,n=r.hideAddButton===!0,a=r.revealAddButtonAfterMedia===!0,i=!n||a,o=document.createElement("div");if(o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos",!r.hideHeading){var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepPhotosTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=ce("formStepPhotosSubtitle"),o.appendChild(p)}var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-card",r.embeddedMedia&&d.classList.add("renuvex-pr-fwizard-photo-card--embedded");var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add",m.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",i&&d.appendChild(m),d.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),d.appendChild(u),o.appendChild(d);var s=r.revokeBlobUrl||function(T){T&&typeof T=="string"&&T.startsWith("blob:")&&URL.revokeObjectURL(T)},x=r.blobMap||{},f=r.urlToFinger||{};function c(){if(!t){var T=e.get().images||[],S=e.get().pendingImages||[],g=T.map(function(k){return{url:k,isPending:!1}}).concat(S.map(function(k){return{url:k.url,file:k.file,isPending:!0,error:k.error}}));u.innerHTML="",g.forEach(function(k){var C=x[k.url]||k.url,z=h(k,C);u.appendChild(z)}),w()}}function h(T,S){var g=document.createElement("div");g.className="renuvex-pr-fwizard-photo-thumb";var k=document.createElement("img");k.src=S,k.alt="",k.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",g.appendChild(k);var C=document.createElement("div");C.className="renuvex-pr-fwizard-photo-loading",C.style.display="none",g.appendChild(C);var z=document.createElement("button");z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.setAttribute("aria-label","Kald\u0131r");var A=ee(we);return A&&z.appendChild(A),g.appendChild(z),b(g,T,S),g}function b(T,S,g){var k=T.querySelector("img");k.src!==g&&(k.src=g);var C=T.querySelector(".renuvex-pr-fwizard-photo-loading");if(S.isPending&&S.error){C.style.display="flex",C.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+S.error,C.appendChild(z)}else C.style.display="none",C.textContent="";var A=T.querySelector(".renuvex-pr-fwizard-photo-remove");A.onclick=function(){var L=f[S.url]||(S.file?S.file.name+"_"+S.file.size:null),I=x[S.url],_={};L&&(_.fingerprints=(e.get().fingerprints||[]).filter(function(y){return y!==L})),S.isPending?_.pendingImages=(e.get().pendingImages||[]).filter(function(y){return y.url!==S.url}):_.images=(e.get().images||[]).filter(function(y){return y!==S.url}),e.set(_),s(S.url),s(I),delete f[S.url],I&&delete f[I],x[S.url]&&delete x[S.url]}}function w(){var T=(e.get().images||[]).length,S=(e.get().pendingImages||[]).length,g=T+S,k=g>=$r;d.classList.toggle("renuvex-pr-fwizard-photo-card--compact",g>0),i&&(m.innerHTML=g>0?se(ta):se(Pr)+"<span>Foto\u011Fraf Ekle</span>"),k?(i&&(m.style.display="none"),m.disabled=!0,v.disabled=!0):(i&&(m.style.display=a&&g===0?"none":"flex"),m.disabled=!1,v.disabled=!1,m.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}m.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(T){var S=(e.get().images||[]).length+(e.get().pendingImages||[]).length,g=Array.from(T.target.files).slice(0,$r-S);v.value="";var k=(e.get().pendingImages||[]).length,C=e.get().images||[],z=C.length;if(g.length!==0){for(var A=[],L=[],I=0;I<g.length;I++){var _=g[I],y=_.name+"_"+_.size,M=(e.get().fingerprints||[]).some(function(F){return F===y})||A.some(function(F){return F.file.name+"_"+F.file.size===y});if(!M){if(_.size>li){var P="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(P,"error"):alert(P);continue}var B=URL.createObjectURL(_);f[B]=y,A.push({url:B,file:_,error:null}),L.push({url:B,file:_});var R=(e.get().fingerprints||[]).slice();R.push(y),e.set({fingerprints:R})}}if(A.length!==0){var Y=(e.get().pendingImages||[]).concat(A),G=async function(){for(var F=0;F<L.length;F++){var K=L[F],X=K.file,j=K.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var $=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==j}),O=(e.get().images||[]).slice();O.push(j),e.set({pendingImages:$,images:O});continue}try{var U=await ze(ye+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de})});if(!U.ok)throw U.status===429?new Error("rate_limit"):new Error("sign failed");var W=await U.json();if(!W.folder)throw new Error("sign folder missing");var ae=new FormData;ae.append("file",X),ae.append("api_key",W.api_key),ae.append("timestamp",W.timestamp),ae.append("signature",W.signature),ae.append("folder",W.folder);var q=await fetch("https://api.cloudinary.com/v1_1/"+W.cloud_name+"/image/upload",{method:"POST",body:ae}),Z=await q.json();if(Z.secure_url&&Mr(Z.secure_url)){var gr=(e.get().pendingImages||[]).some(function(Q){return Q.url===j});if(!gr)continue;x[Z.secure_url]=j,f[Z.secure_url]=f[j];var Ae=(e.get().pendingImages||[]).filter(function(Q){return Q.url!==j}),D=(e.get().images||[]).slice();D.push(Z.secure_url),e.set({pendingImages:Ae,images:D});try{ze(ye+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,secureUrl:Z.secure_url,metadata:{assetId:Z.asset_id,publicId:Z.public_id,version:Z.version,resourceType:Z.resource_type,format:Z.format,width:Z.width,height:Z.height,bytes:Z.bytes,signature:Z.signature}})}).catch(function(){})}catch(Q){}}else throw new Error("invalid image url")}catch(Q){console.error("[renuvex-pr] Image upload failed:",Q);var ne=Q.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ne,"error");var me=(e.get().pendingImages||[]).map(function(be){return be.url===j?{url:be.url,file:be.file,error:ne}:be});e.set({pendingImages:me})}}};if(z===0&&k===0){t=!0;var V=!r.canNavigate||r.canNavigate();V&&e.goNext()}e.set({pendingImages:Y}),G()}}};var E=e.onChange(c);return c(),{el:o,openPicker:function(){v.disabled||v.click()},destroy:function(){t=!0,v.onchange=null,E&&E()}}}var pi=150*1024*1024,di=2,ui=60,Ka=8192,Xa=5,si=3e4,vi=["video/mp4","video/quicktime"],ci="renuvex_pr_video_upload_",$a="renuvex_pr_video_cancel_",vr=null,ja=!1,mi={video_quota_exceeded:"Bu ma\u011Faza bu ayki video yorum limitine ula\u015Ft\u0131.",rate_limited:"\xC7ok fazla deneme yap\u0131ld\u0131. L\xFCtfen biraz sonra tekrar deneyin.",video_upload_disabled:"Video y\xFCkleme \u015Fu anda kullan\u0131lam\u0131yor.",video_provider_unavailable:"Video y\xFCkleme ge\xE7ici olarak kullan\u0131lam\u0131yor.",video_processing_delayed:"Video haz\u0131rlanmas\u0131 beklenenden uzun s\xFCr\xFCyor. Biraz sonra tekrar deneyin."},fi={video_quota_exceeded:!0,rate_limited:!0,video_upload_disabled:!0},he=class extends Error{constructor(r,t,n){super(r||"video_request_failed"),this.name="VideoUploadRequestError",this.code=r||"video_request_failed",this.status=t||0,this.retryAfterSec=n||null}};function Ja(e){var r=e&&typeof e.code=="string"?e.code:e&&typeof e.message=="string"?e.message:"video_request_failed";return{code:r,message:mi[r]||"Video y\xFCklenemedi. Tekrar deneyin.",retryable:fi[r]!==!0,retryAfterSec:e&&Number.isFinite(e.retryAfterSec)?e.retryAfterSec:null}}function Za(e){return!e||Number(e.status)!==404?!1:e.code==="upload_not_found"||e.code==="invalid_or_expired_upload"}function kt(e){return new Promise(function(r){setTimeout(r,e)})}function er(){return typeof performance!="undefined"&&typeof performance.now=="function"?performance.now():Date.now()}function rr(e){return Math.max(0,Math.round(er()-e))}function xi(){if(typeof window!="undefined"){var e=Number(window.__renuvexPrVideoUploadStallMs);if(Number.isFinite(e)&&e>=250)return e}return si}function gi(e,r){return new Promise(function(t,n){var a=setTimeout(i,e);function i(){r&&r.removeEventListener("abort",o),t()}function o(){clearTimeout(a),r&&r.removeEventListener("abort",o),n(new DOMException("Aborted","AbortError"))}r&&r.addEventListener("abort",o,{once:!0})})}function St(e){return[e.name,e.size,e.lastModified,e.type].join("_").slice(0,128)}function zt(e,r){return ci+de+"_"+e+"_"+St(r)}function Qa(e,r){try{var t=window.sessionStorage.getItem(zt(e,r)),n=t?JSON.parse(t):null;return!n||typeof n.token!="string"||!n.expiresAt||new Date(n.expiresAt).getTime()<=Date.now()?null:n}catch(a){return null}}function hi(e,r,t){try{window.sessionStorage.setItem(zt(e,r),JSON.stringify(t))}catch(n){}}function mr(e,r){try{window.sessionStorage.removeItem(zt(e,r))}catch(t){}}function bi(e,r){return $a+de+"_"+e+"_"+St(r)}function yi(e,r,t,n){if(!(!e||!r||!t)){var a={token:e,productId:r,expiresAt:n||null};try{window.sessionStorage.setItem(bi(r,t),JSON.stringify(a))}catch(i){}}}function wi(){var e=[];try{for(var r=0;r<window.sessionStorage.length;r+=1){var t=window.sessionStorage.key(r);if(!(!t||t.indexOf($a+de+"_")!==0)){var n=window.sessionStorage.getItem(t),a=n?JSON.parse(n):null;if(!a||typeof a.token!="string"){window.sessionStorage.removeItem(t),r-=1;continue}e.push({key:t,token:a.token})}}}catch(i){}return e}function Wa(e){try{window.sessionStorage.removeItem(e)}catch(r){}}async function tr(e,r,t){var n=await ze(ye+e,r,t||2e4),a=await n.json().catch(function(){return{}});if(!n.ok){var i=Number(n.headers.get("Retry-After"));throw new he(a.error||"video_request_failed",n.status,Number.isFinite(i)&&i>0?i:null)}return a.data||{}}async function cr(e,r,t){if(!(!e||typeof window=="undefined"||window.__ikasPreviewMode))try{await tr("/api/public/upload/video/metrics",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e,chunkSizeKb:r.chunkSizeKb||0,chunkAttempts:r.chunkAttempts||0,retryClicks:r.retryClicks||0,upchunkErrors:r.upchunkErrors||0,firstErrorCode:r.firstErrorCode||null,directUploadMs:r.directUploadMs,completeMs:r.completeMs,processingPollMs:r.processingPollMs,totalClientMs:rr(r.startedAt),finalStatus:t})},4e3)}catch(n){}}async function ki(e){try{return await tr("/api/public/upload/video",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e.token})},8e3),Wa(e.key),!0}catch(r){return r&&(Number(r.status)===404||Number(r.status)===409)?(Wa(e.key),!0):!1}}function Zr(){return typeof window=="undefined"||window.__ikasPreviewMode||typeof navigator!="undefined"&&navigator.onLine===!1?Promise.resolve():vr||(vr=(async function(){for(var e=wi(),r=0;r<e.length;r+=1)await ki(e[r])})().finally(function(){vr=null}),vr)}function Qr(){typeof window=="undefined"||ja||(ja=!0,window.addEventListener("online",function(){Zr()}),Zr())}async function Si(){var e=await import("./upchunk-KBSCWYRQ.js");if(e&&typeof e.createUpload=="function")return e.createUpload;if(e&&e.UpChunk&&typeof e.UpChunk.createUpload=="function")return e.UpChunk.createUpload.bind(e.UpChunk);throw new Error("video_upload_sdk_unavailable")}function qa(e){var r=e&&e.response,t=r&&Number(r.statusCode);return Number.isFinite(t)&&t>0?"http_"+t:e&&typeof e.message=="string"&&e.message?"upchunk_error":"upload_attempt_failed"}var zi={http_408:!0,http_502:!0,http_503:!0,http_504:!0};function Ci(e){return zi[e]!==!0}async function Ei(e){var r=await Si();return new Promise(function(t,n){var a=!1,i=null,o=null,l=xi(),p=null;function d(x){a||(a=!0,o&&clearTimeout(o),e.signal&&e.signal.removeEventListener("abort",s),p&&p(),x?n(x):t())}function m(x){a||(o&&clearTimeout(o),!(!x&&typeof navigator!="undefined"&&navigator.onLine===!1)&&(o=setTimeout(function(){if(!a){e.onUploadError&&e.onUploadError("video_upload_stalled"),d(new he("video_upload_stalled",0,null));try{i&&i.abort()}catch(f){}}},l)))}function v(){return a?!1:(m(),!0)}function u(){if(!a){e.onUploadError&&e.onUploadError("video_upload_offline"),d(new he("video_upload_offline",0,null));try{i&&i.abort()}catch(x){}}}function s(){try{i&&i.abort()}catch(x){}d(new DOMException("Aborted","AbortError"))}if(e.signal){if(e.signal.aborted)return n(new DOMException("Aborted","AbortError"));e.signal.addEventListener("abort",s,{once:!0})}if(i=r({endpoint:e.uploadUrl,file:e.file,method:"PUT",chunkSize:e.chunkSize||Ka,attempts:e.chunkAttempts||Xa,dynamicChunkSize:!0}),typeof window!="undefined"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"&&(window.addEventListener("offline",u),p=function(){window.removeEventListener("offline",u)}),typeof navigator!="undefined"&&navigator.onLine===!1){u();return}m(),i.on("attempt",function(){v()&&e.onStatus("uploading")}),i.on("attemptFailure",function(x){if(v()){var f=x&&x.detail,c=qa(f);if(e.onAttemptFailure&&e.onAttemptFailure(c),Ci(c)){e.onUploadError&&e.onUploadError(c),d(new he(c,0,null));try{i&&i.abort()}catch(h){}return}e.onStatus("upload_retrying")}}),i.on("chunkSuccess",function(){v()}),i.on("progress",function(x){if(v()){var f=Number(x&&x.detail);if(Number.isFinite(f)){var c=Math.min(95,Math.max(0,Math.round(f*.95)));Number.isFinite(e.minProgress)&&(c=Math.max(e.minProgress,c)),e.onProgress(c)}}}),i.on("offline",u),i.on("error",function(x){if(v()){var f=x&&x.detail,c=qa(f);e.onUploadError&&e.onUploadError(c),d(new he(c,0,null))}}),i.on("success",function(){v()&&(e.onProgress(95),d())})})}function Ti(e){return e<30*1e3?2e3:e<120*1e3?5e3:10*1e3}async function Ga(e,r,t){for(var n=Date.now(),a=n+600*1e3,i=0;Date.now()<a;){if(r.aborted)throw new DOMException("Aborted","AbortError");var o=Date.now()-n;try{var l=await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET",signal:r});if(i=0,t&&t(o>=30*1e3?"processing_slow":l.status||"processing"),l.status==="ready")return l;if(l.status==="failed"||l.status==="aborted")throw new he(l.errorCode||"video_processing_failed",409,null)}catch(p){if(r.aborted||p instanceof he&&p.status===409||Za(p)||(i+=1,i>=3))throw p}await gi(Ti(o),r)}throw new he("video_processing_delayed",0,null)}async function Ai(e){for(var r=null,t=1;t<=3;t+=1)try{return await tr("/api/public/upload/video/status?token="+encodeURIComponent(e),{method:"GET"},8e3)}catch(n){if(Za(n))return null;r=n,t<3&&await kt(400*t)}throw r||new Error("video_status_failed")}async function Pi(e,r,t,n){for(var a=10;a<=90;a+=20){if(r.aborted)throw new DOMException("Aborted","AbortError");t(a),await kt(120)}return n("processing"),await kt(500),t(100),{token:"preview-video-token-"+Date.now(),status:"ready",durationMs:null,posterUrl:URL.createObjectURL(e),previewOnly:!0}}function en(e){return!e||vi.indexOf(String(e.type||"").toLowerCase())===-1?{ok:!1,message:"MP4 veya MOV format\u0131nda bir video se\xE7in."}:e.size<=0||e.size>pi?{ok:!1,message:"Video en fazla 150 MB olabilir."}:{ok:!0}}function rn(e){return new Promise(function(r){var t=URL.createObjectURL(e),n=document.createElement("video"),a=!1;function i(o){if(!a){a=!0,n.removeAttribute("src");try{n.load()}catch(l){}URL.revokeObjectURL(t),r(o)}}n.preload="metadata",n.onloadedmetadata=function(){i(Number.isFinite(n.duration)?n.duration:null)},n.onerror=function(){i(null)},n.src=t,setTimeout(function(){i(null)},8e3)})}function tn(e){return e===null?{ok:!0}:e<di||e>ui?{ok:!1,message:"Video 2 ile 60 saniye aras\u0131nda olmal\u0131."}:{ok:!0}}async function an(e){if(typeof window!="undefined"&&window.__ikasPreviewMode)return Pi(e.file,e.signal,e.onProgress,e.onStatus);var r={startedAt:er(),chunkSizeKb:0,chunkAttempts:0,retryClicks:e.retryClicks||0,upchunkErrors:0,firstErrorCode:null,directUploadMs:null,completeMs:null,processingPollMs:null};function t(x){r.upchunkErrors+=1,r.firstErrorCode||(r.firstErrorCode=x||"upload_attempt_failed")}function n(){mr(e.productId,e.file),e.onSessionReset&&e.onSessionReset()}async function a(x,f){var c=await Ai(x);if(!c)return{action:"discard"};if(c.status==="ready")return e.onToken&&e.onToken(x),e.onProgress(100),mr(e.productId,e.file),await cr(x,r,"ready"),{action:"return",value:Object.assign({token:x},c)};if(c.status==="uploaded"||c.status==="processing"){e.onToken&&e.onToken(x),e.onStatus("processing");var h=er(),b=await Ga(x,e.signal,e.onStatus);return r.processingPollMs=rr(h),mr(e.productId,e.file),e.onProgress(100),await cr(x,r,"ready"),{action:"return",value:Object.assign({token:x},b)}}return c.status==="failed"||c.status==="aborted"?{action:"discard"}:!f||typeof f.uploadUrl!="string"||!f.uploadUrl?{action:"discard"}:{action:"upload"}}Qr(),await Zr();var i=Qa(e.productId,e.file),o=i&&i.token,l=i;if(o){var p=await a(o,l);if(p.action==="return")return p.value;p.action==="discard"&&(n(),o=null,l=null)}for(;;){if(!o){var d=await tr("/api/public/upload/video/initiate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:e.productId,mimeType:e.file.type,bytes:e.file.size,fileFingerprint:St(e.file)})});o=d.token,l=d,hi(e.productId,e.file,d)}e.onToken&&e.onToken(o),r.chunkSizeKb=l.chunkSize||Ka,r.chunkAttempts=l.chunkAttempts||Xa,e.onStatus("uploading");var m=er();try{await Ei({uploadUrl:l.uploadUrl,file:e.file,chunkSize:l.chunkSize,chunkAttempts:l.chunkAttempts,minProgress:e.minProgress||0,signal:e.signal,onProgress:e.onProgress,onStatus:e.onStatus,onAttemptFailure:t,onUploadError:t}),r.directUploadMs=(r.directUploadMs||0)+rr(m),e.onStatus("processing");var v=er();await tr("/api/public/upload/video/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:o})},3e4),r.completeMs=rr(v);var u=er(),s=await Ga(o,e.signal,e.onStatus);return r.processingPollMs=rr(u),mr(e.productId,e.file),e.onProgress(100),await cr(o,r,"ready"),Object.assign({token:o},s)}catch(x){throw r.directUploadMs=(r.directUploadMs||0)+rr(m),e.signal&&e.signal.aborted?(await cr(o,r,"aborted"),x):(await cr(o,r,"failed"),x)}}}async function et(e,r,t){var n=r&&t?Qa(r,t):null;e&&r&&t&&yi(e,r,t,n&&n.expiresAt),r&&t&&mr(r,t),!(!e||typeof window!="undefined"&&window.__ikasPreviewMode)&&(Qr(),await Zr())}function nn(e){return e?e.status==="ready"?"ready":e.status==="failed"?"failed":"busy":"empty"}function _i(e){return"Video Y\xFCkleniyor"}function Mi(e){return!0}function on(e,r){r=r||{};var t=!1,n=null,a=null,i=0,o=document.createElement("div");o.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent=ce("formStepMediaTitle"),o.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent=ce("formStepMediaSubtitle"),o.appendChild(p);var d=document.createElement("div");d.className="renuvex-pr-fwizard-media-card";var m=document.createElement("button");m.type="button",m.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",m.setAttribute("aria-label","Foto\u011Fraf ekle"),m.innerHTML=se(Pr)+"<span>Foto\u011Fraf Ekle</span>";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action",v.setAttribute("aria-label","Video ekle"),v.innerHTML=se(_r)+"<span>Video Ekle</span>",d.appendChild(m),d.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-media-content",d.appendChild(u),o.appendChild(d);var s=document.createElement("input");s.type="file",s.accept="video/mp4,video/quicktime,.mp4,.mov",s.style.display="none",o.appendChild(s);function x(){var y=e.get();return(y.images||[]).length>0||(y.pendingImages||[]).length>0}function f(){var y=e.get();return(y.images||[]).length+(y.pendingImages||[]).length}function c(){return e.get().videoUpload||null}function h(){return i+=1,i}function b(y,M){var P=c();return i===y&&!!P&&P.controller===M}function w(){if(!a){u.innerHTML="";return}a.retry.onclick=null,u.innerHTML="",a=null}function E(){n&&(n.destroy&&n.destroy(),n=null)}function T(y){E(),u.innerHTML="";var M=nn(y),P=document.createElement("div");P.className=M==="ready"?"renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb":M==="failed"?"renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed":"renuvex-pr-fwizard-video-uploading-card";var B=null,R=null,Y=null,G=null,V=document.createElement("button");if(V.type="button",V.className="renuvex-pr-fwizard-video-retry",V.textContent="Tekrar dene",V.setAttribute("aria-label","Video y\xFCklenemedi, tekrar dene"),M==="ready"){var F=y.posterUrl||y.localUrl||"";F&&F!==y.localUrl?(B=document.createElement("img"),B.alt="",B.src=F):(B=document.createElement("video"),B.muted=!0,B.playsInline=!0,B.preload="metadata",B.src=y.localUrl||""),B.className="renuvex-pr-fwizard-video-preview",P.appendChild(B)}else M==="busy"?(G=document.createElement("div"),G.className="renuvex-pr-fwizard-video-uploading-status",G.setAttribute("role","status"),G.setAttribute("aria-live","polite"),P.appendChild(G)):R=P;if(M==="ready"){let $=function(O){O&&(O.preventDefault(),O.stopPropagation()),A()};var j=$,K=document.createElement("button");K.type="button",K.className="renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove",K.setAttribute("aria-label","Videoyu kald\u0131r");var X=ee(we);X&&K.appendChild(X),K.addEventListener("pointerdown",$),K.addEventListener("click",$),P.appendChild(K)}u.appendChild(P),a={mode:M,card:P,preview:B,previewUrl:M==="ready"&&(y.posterUrl||y.localUrl)||"",details:R,name:Y,status:G,retry:V}}function S(){if(!t){var y=c();if(!y){w();return}var M=nn(y),P=M==="ready"&&(y.posterUrl||y.localUrl)||"";if((!a||a.mode!==M||a.previewUrl!==P)&&T(y),a.name&&(a.name.textContent=y.file?y.file.name:"Video"),a.status&&M==="busy"){var B=_i(y),R=Mi(y)?'<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>'+B+"</span>":"<span>"+B+"</span>";a.status.innerHTML!==R&&(a.status.innerHTML=R)}var Y=M==="failed"&&!!(y.error&&y.file&&y.retryable!==!1);a.retry.onclick=Y?function(){z(y.file,y.localUrl,y.durationMs)}:null,Y&&a.details&&!a.retry.isConnected?a.details.appendChild(a.retry):!Y&&a.retry.isConnected&&a.retry.remove()}}function g(){var y=x(),M=f()>=$r,P=!!c(),B=y||P;m.hidden=B,v.hidden=B,m.disabled=P||M,v.disabled=y||P,d.classList.toggle("renuvex-pr-fwizard-media-card--has-media",B),d.classList.toggle("renuvex-pr-fwizard-media-card--photo-selected",y),d.classList.toggle("renuvex-pr-fwizard-media-card--video-selected",P),m.classList.toggle("renuvex-pr-fwizard-media-action--active",y),v.classList.toggle("renuvex-pr-fwizard-media-action--active",P)}function k(y){var M=c();if(M){var P=Object.keys(y),B=P.some(function(R){return M[R]!==y[R]});B&&e.set({videoUpload:Object.assign({},M,y)})}}function C(y,M,P){b(y,M)&&k(P)}async function z(y,M,P){var B=c(),R=!!(M&&B&&B.file===y),Y=R?Math.max(0,Math.min(95,Number(B.progress)||0)):0,G=R?(Number(B.retryClicks)||0)+1:0,V=en(y);if(!V.ok){r.showToast&&r.showToast(V.message,"error");return}var F=M||URL.createObjectURL(y),K=Number.isFinite(P)?P:null,X=new AbortController,j=h();e.set({videoUpload:{file:y,localUrl:F,token:R&&B.token||null,status:"uploading",progress:Y,durationMs:K,error:null,errorCode:null,retryable:!0,retryAfterSec:null,retryClicks:G,controller:X}}),!R&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext();try{var $=P!==void 0?Number.isFinite(P)?P/1e3:null:await rn(y),O=tn($);if(!O.ok)throw Object.assign(new Error("invalid_video_duration"),{code:"invalid_video_duration",message:O.message});var U=await an({file:y,productId:e.get().productId,signal:X.signal,minProgress:Y,retryClicks:G,onToken:function(q){C(j,X,{token:q})},onProgress:function(q){C(j,X,{progress:q})},onStatus:function(q){C(j,X,{status:q})},onSessionReset:function(){C(j,X,{token:null,progress:0})}});if(!b(j,X))return;if(U.previewOnly&&U.posterUrl&&U.posterUrl!==F)try{URL.revokeObjectURL(U.posterUrl)}catch(q){}k({token:U.token,status:"ready",progress:100,posterUrl:U.previewOnly?F:U.posterUrl,durationMs:U.durationMs||($===null?null:Math.round($*1e3)),error:null,errorCode:null,retryable:!0,retryAfterSec:null,controller:null}),R&&!t&&(!r.canNavigate||r.canNavigate())&&e.goNext()}catch(q){if(X.signal.aborted||!b(j,X))return;var W=Ja(q);if(q&&q.code==="invalid_video_duration"&&(W={code:"invalid_video_duration",message:q.message||"Video s\xFCresi ge\xE7ersiz.",retryable:!1,retryAfterSec:null}),k({status:"failed",error:W.message,errorCode:W.code,retryable:W.retryable,retryAfterSec:W.retryAfterSec,controller:null}),r.showToast){var ae=W.code==="invalid_video_duration"?W.message:"Video y\xFCklenemedi";r.showToast(ae,"error")}}}function A(){var y=c();y&&(h(),y.controller&&y.controller.abort(),et(y.token,e.get().productId,y.file),r.revokeBlobUrl&&r.revokeBlobUrl(y.localUrl),e.set({videoUpload:null}))}function L(y){if(n){y&&n.openPicker&&n.openPicker();return}a=null,u.innerHTML="",n=Jr(e,{canNavigate:r.canNavigate,blobMap:r.blobMap,urlToFinger:r.urlToFinger,revokeBlobUrl:r.revokeBlobUrl,showToast:r.showToast,hideHeading:!0,hideAddButton:!0,revealAddButtonAfterMedia:!0,embeddedMedia:!0}),u.appendChild(n.el),y&&n.openPicker&&n.openPicker()}m.onclick=function(){m.disabled||L(!0)},v.onclick=function(){v.disabled||(E(),u.innerHTML="",s.click())},s.onchange=function(){var y=s.files&&s.files[0];s.value="",y&&z(y,null,void 0)};var I=!!c(),_=e.onChange(function(){g();var y=!!c();(y||I)&&S(),I=y});return g(),x()&&L(!1),c()&&S(),{el:o,destroy:function(){t=!0,m.onclick=null,v.onclick=null,s.onchange=null,n&&n.destroy&&n.destroy(),_&&_()}}}var Ct=2e3,Li=60;function ln(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent=ce("formStepContentTitle"),n.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=Li,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),i.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Ct,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",i.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-char-counter",p.setAttribute("aria-live","polite"),i.appendChild(p);function d(){var v=l.value.length;p.textContent=v+"/"+Ct,p.classList.toggle("renuvex-pr-fwizard-char-counter--max",v>=Ct)}function m(){return Qe(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),d(),t(m())}),n.appendChild(i),d(),setTimeout(function(){t(m())},0),{el:n,destroy:function(){}}}var Ri=40;function pn(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent=ce("formStepAuthorTitle"),a.appendChild(i);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var p=document.createElement("label");p.className="renuvex-pr-fwizard-label",p.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.maxLength=Ri,d.setAttribute("aria-required","true"),d.value=e.get().author||"",l.appendChild(p),l.appendChild(d),o.appendChild(l);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.textContent="E-posta (opsiyonel)";var u=document.createElement("input");u.type="email",u.className="renuvex-pr-fwizard-input",u.setAttribute("autocomplete","email"),u.value=e.get().email||"",m.appendChild(v),m.appendChild(u),o.appendChild(m);var s=document.createElement("div");s.className="renuvex-pr-fwizard-notice",s.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(s);var x=document.createElement("div");x.className="renuvex-pr-fwizard-msg",x.setAttribute("role","alert"),x.setAttribute("aria-live","assertive"),o.appendChild(x);var f=document.createElement("button");f.type="button",f.className="renuvex-pr-fwizard-submit-btn",f.textContent="G\xF6nder",o.appendChild(f),a.appendChild(o);function c(){return Qe(4,e.get())}function h(g){f.classList.remove("renuvex-pr-fwizard-submit-btn--video-pending"),f.textContent=g}function b(){f.classList.add("renuvex-pr-fwizard-submit-btn--video-pending"),f.textContent="";var g=document.createElement("span");g.className="renuvex-pr-fwizard-video-dots",g.setAttribute("aria-hidden","true"),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span")),g.appendChild(document.createElement("span"));var k=document.createElement("span");k.textContent="Video Haz\u0131rlan\u0131yor",f.appendChild(g),f.appendChild(k)}function w(){var g=!c(),k=(e.get().pendingImages||[]).length,C=k>0,z=e.get().videoUpload,A=!!(z&&z.status==="failed"),L=!!(z&&z.status!=="ready"&&z.status!=="failed");C||L||A?(f.disabled=!0,f.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),A?h("Video Y\xFCklenemedi"):L?b():h("Foto\u011Fraflar Y\xFCkleniyor...")):(f.disabled=g,f.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",g),h("G\xF6nder"))}d.addEventListener("input",function(){e.set({author:d.value}),w(),t(c())}),u.addEventListener("input",function(){e.set({email:u.value})}),w(),setTimeout(function(){t(c())},0);function E(){x.textContent=""}function T(g){E();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=g||"",x.appendChild(k)}f.onclick=async function(){if(!f.disabled){var g=e.get(),k=(g.author||"").trim(),C=(g.comment||"").trim();if(u.value.trim()&&!u.checkValidity()){u.reportValidity();return}if(!k){T("Gerekli alan");return}if(!g.rating){T("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}f.disabled=!0,f.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var z=f.textContent;if(f.textContent="G\xF6nderiliyor\u2026",E(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n()},600);return}try{var A=aa(window.location.href),L=g.productName||null,I=await ze(ye+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:de,productId:g.productId||null,slug:A||null,productName:L,author:k,title:(g.title||"").trim()||null,comment:C||null,rating:g.rating,images:g.videoUpload?[]:g.images||[],videoToken:g.videoUpload&&g.videoUpload.status==="ready"?g.videoUpload.token:null})},15e3);if(I.ok)g.videoUpload&&g.videoUpload.status==="ready"&&e.set({videoSubmitted:!0}),n();else{var _=await I.json().catch(function(){return{}});throw new Error(_.error||"Yorum kaydedilemedi.")}}catch(P){var y=P&&(P.name==="AbortError"||/signal/i.test(P.message||"")),M=y?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":P.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(M,"error"):T(M),f.disabled=!1,f.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),f.textContent=z}}};var S=e.onChange(w);return{el:a,destroy:function(){f.onclick=null,S&&S()}}}function Ni(e,r,t){if(t=t||{},e===1)return Ya(r,{canNavigate:t.canNavigate});if(e===2&&r.get().videoEnabled)return on(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===2)return Jr(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,revokeBlobUrl:t.revokeBlobUrl,showToast:t.showToast});if(e===3)return ln(r,{onValidityChange:t.onValidityChange});if(e===4)return pn(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function dn(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function un(e){e=e||{},Qr();var r=Va({productId:e.productId,productName:e.productName,videoEnabled:typeof e.videoEnabled=="boolean"?e.videoEnabled:N&&N.videoReviewsEnabled===!0,videoUnavailableReason:e.videoUnavailableReason||null}),t={},n={},a={};function i(z){if(!(!z||typeof z!="string"||!z.startsWith("blob:")||a[z])){a[z]=!0;try{URL.revokeObjectURL(z)}catch(A){}}}function o(){Object.keys(n).forEach(function(A){i(A)}),Object.keys(t).forEach(function(A){i(t[A])});var z=r.get();(z.pendingImages||[]).forEach(function(A){i(A&&A.url)}),(z.images||[]).forEach(function(A){i(A)}),z.videoUpload&&i(z.videoUpload.localUrl)}function l(){var z=r.get(),A=z.videoUpload;!A||z.videoSubmitted||(A.controller&&A.controller.abort(),et(A.token,z.productId,A.file))}var p=Ha({returnFocusElement:e.returnFocusElement||null,openedByKeyboard:typeof e.openedByKeyboard=="boolean"?e.openedByKeyboard:null,onClose:function(){window.removeEventListener("popstate",m),qr(d),l(),o(),e.onClose&&e.onClose()},allowOutsideClose:!1}),d=Wr(),m=function(z){p&&p.close&&p.close()};window.addEventListener("popstate",m);var v=document.createElement("div");v.className="renuvex-pr-fwizard-step-wrap";var u=Da({skippableSteps:[2],nextableSteps:[3],onBack:function(){f==="idle"&&r.goBack()},onSkip:function(){f==="idle"&&r.goNext()},onNext:function(){f==="idle"&&r.goNext()}}),s=document.createElement("div");s.className="renuvex-pr-fwizard-layout",s.appendChild(v),s.appendChild(u.el);var x=null,f="idle",c=null,h=!0,b=null;function w(z,A){v.innerHTML="";var L=Ni(z,r,{canNavigate:function(){return f==="idle"},blobMap:t,urlToFinger:n,revokeBlobUrl:i,onValidityChange:function(y){u.setNextDisabled(!y)},onSuccess:T,showToast:p.showToast});if(x=L,u.update(z,r.get()),A){f="entering",L.el.classList.add("renuvex-pr-fwizard-step--enter");var I=null,_=function(){I&&clearTimeout(I),L.el.removeEventListener("animationend",_),L.el.classList.remove("renuvex-pr-fwizard-step--enter"),f="idle",c!==null&&S()};L.el.addEventListener("animationend",_),I=setTimeout(_,700)}else f="idle";v.appendChild(L.el),p.setStepAttr&&p.setStepAttr(z),z===3&&u.setNextDisabled(!0)}var E=!1;function T(){if(!E){if(E=!0,!x){v.innerHTML="";var z=dn();z.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(z),p.setStepAttr("thanks"),u.setThanksState(p.close);return}var A=x;f="exiting",A.el.classList.add("renuvex-pr-fwizard-step--exit");var L=function(){if(b&&clearTimeout(b),A.el.removeEventListener("animationend",L),A.destroy)try{A.destroy()}catch(_){}x===A&&(x=null),v.innerHTML="";var I=dn();I.classList.add("renuvex-pr-fwizard-step--enter"),v.appendChild(I),p.setStepAttr("thanks"),u.setThanksState(p.close),f="idle"};A.el.addEventListener("animationend",L),b=setTimeout(L,300)}}function S(){var z=r.get().currentStep;if(f!=="idle"){c=z;return}if(!x){var A=!h;h=!1,w(z,A);return}var L=x;f="exiting",L.el.classList.add("renuvex-pr-fwizard-step--exit");var I=function(){if(b&&clearTimeout(b),L.el.removeEventListener("animationend",I),L.destroy)try{L.destroy()}catch(y){}if(x===L){v.innerHTML="",x=null;var _=c!==null?c:r.get().currentStep;c=null,w(_,!0),f="idle"}};L.el.addEventListener("animationend",I),b=setTimeout(I,350)}S();var g=r.get().currentStep,k=r.onChange(function(z){z.currentStep!==g?(g=z.currentStep,S()):u.update(z.currentStep,z)}),C=p.close;return p.close=function(){k&&k(),typeof b!="undefined"&&b&&clearTimeout(b),C()},p.open(s),{close:p.close}}var Bi=4e3;async function sn(){var e=await ze(ye+"/api/public/upload/video/capability?storeId="+encodeURIComponent(de),{method:"GET",cache:"no-store"},Bi);if(!e.ok){var r=new Error("video_capability_unavailable");throw r.code="video_capability_http",r.status=e.status,r}var t=await e.json().catch(function(){return{}}),n=t&&t.data;if(!n||typeof n.enabled!="boolean"){var a=new Error("video_capability_invalid");throw a.code="video_capability_invalid",a}return{enabled:n.enabled===!0,reason:typeof n.reason=="string"?n.reason:null}}var rt=null;function vn(){return N&&N.videoReviewsEnabled===!0}function Ii(e){var r=e&&Number(e.status),t=Number.isFinite(r)&&r>=100;return vn()&&!t?{enabled:!0,reason:"capability_unavailable"}:{enabled:!1,reason:"capability_unavailable"}}function Oi(e){if(!e)return function(){};var r=e.disabled,t=e.getAttribute("aria-busy");return e.disabled=!0,e.setAttribute("aria-busy","true"),function(){e.disabled=r,t===null?e.removeAttribute("aria-busy"):e.setAttribute("aria-busy",t)}}async function Ui(e,r){var t;if(typeof window!="undefined"&&window.__ikasPreviewMode)t={enabled:vn(),reason:null};else try{t=await sn()}catch(n){t=Ii(n)}un({productId:J||"",productName:Be||"",videoEnabled:t.enabled,videoUnavailableReason:t.reason,returnFocusElement:e,openedByKeyboard:r})}function te(e){var r=e&&e.currentTarget&&e.currentTarget.tagName==="BUTTON"?e.currentTarget:null,t=Oi(r);return rt||(rt=Ui(r,_e()).finally(function(){rt=null})),rt.finally(t)}var cn=`
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;var Fi={id:"classic",name:"Klasik (A\xE7\u0131k)"},Hi=cn;function Vi(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,d=e.currentOrderBy,m=e.currentHasImages,v=e.onFilterChange,u=e.onSortChange;Le(a);var s=document.createElement("div");s.className="renuvex-pr-summary";var x=(o[3]||0)+(o[4]||0),f=i>0?Math.round(x/i*100):0,c=document.createElement("div");c.className="renuvex-pr-summary-block renuvex-pr-summary-avg",c.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",s.appendChild(c);var h=document.createElement("div");if(h.className="renuvex-pr-summary-block renuvex-pr-summary-count",h.textContent=i.toLocaleString("tr-TR")+" "+H(n.countLabel,"Yorum"),s.appendChild(h),n.showRecommendation!==!1&&f>0){var b=document.createElement("div");b.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",b.innerHTML='<span class="renuvex-pr-recommend-pct">%'+f+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",s.appendChild(b)}return s.appendChild(Je({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:p,onFilterChange:v})),s.appendChild(pe({widget:r,currentOrderBy:d,currentHasImages:m,onWriteClick:te,onSortChange:u})),s}var Tt={};Pe(Tt,{css:()=>Yi,meta:()=>Di,render:()=>Gi});var mn=`
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
`;var Di={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Yi=mn,ji="__unknown_product__",fr=Object.create(null);function Wi(e){return e?String(e):ji}var Ve=null,xr=null;function qi(){!Ve||!xr||(Ve.removeEventListener?Ve.removeEventListener("change",xr):Ve.removeListener&&Ve.removeListener(xr),Ve=null,xr=null)}function Gi(e){var r=e.widget,t=e.productId,n=e.settings,a=e.iconPair,i=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,d=e.currentOrderBy,m=e.currentHasImages,v=e.onFilterChange,u=e.onSortChange,s=Wi(t),x=document.createElement("div");x.className="renuvex-pr-summary renuvex-pr-summary-compact";var f=document.createElement("div");f.className="renuvex-pr-compact-header";var c=document.createElement("div");c.className="renuvex-pr-compact-trigger-wrap";var h=document.createElement("button");h.className="renuvex-pr-compact-trigger",h.type="button",h.setAttribute("aria-expanded","false"),h.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Re(l,a)+'</span><span class="renuvex-pr-compact-trigger-text"></span><span class="renuvex-pr-compact-chevron">'+se(ra)+"</span>";var b=h.querySelector(".renuvex-pr-compact-trigger-text"),w=h.querySelector(".renuvex-pr-compact-chevron");if(b&&(b.textContent=i.toLocaleString("tr-TR")+" "+H(n.countLabel,"Yorum")),b&&w){var E=document.createElement("span");E.className="renuvex-pr-compact-trigger-count",h.insertBefore(E,b),E.appendChild(b),E.appendChild(w)}c.appendChild(h),f.appendChild(c);var T=pe({widget:r,currentOrderBy:d,currentHasImages:m,onWriteClick:te,onSortChange:u}),S=T.querySelector(".renuvex-pr-filter-wrap"),g=T.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-compact-actions-slot",g&&k.appendChild(g),S&&k.appendChild(S),f.appendChild(k),x.appendChild(f);var C=document.createElement("div");C.className="renuvex-pr-compact-panel",C.setAttribute("role","dialog"),C.setAttribute("aria-label","Puan da\u011F\u0131l\u0131m\u0131"),C.setAttribute("aria-hidden","true");var z=document.createElement("div");z.className="renuvex-pr-compact-panel-inner";var A=document.createElement("div");A.className="renuvex-pr-compact-avg",A.innerHTML='<span class="renuvex-pr-icon">'+ue("full")+"</span><span>"+l+"</span>",z.appendChild(A),z.appendChild(Je({ratingCounts:o,allCount:i,iconPair:a,currentRatingFilter:p,onFilterChange:function(O){I()&&C.classList.contains("renuvex-pr-open")&&(fr[s]=!0),v(O)}})),C.appendChild(z);var L=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function I(){return!!(L&&L.matches)}function _(O){O?C.classList.add("renuvex-pr-open"):C.classList.remove("renuvex-pr-open"),C.setAttribute("aria-hidden",O?"false":"true"),h.setAttribute("aria-expanded",O?"true":"false")}function y(O){var U=O?x:c;if(C.parentNode!==U){var W=!!C.parentNode;C.classList.contains("renuvex-pr-open")&&_(!1),W&&(fr[s]=!1),U.appendChild(C)}}y(L?L.matches:!1);var M=pe({widget:r,currentOrderBy:d,currentHasImages:m,onWriteClick:te,onSortChange:u}),P=M.querySelector(".renuvex-pr-filter-wrap"),B=M.querySelector(".renuvex-pr-write-btn"),R=document.createElement("div");R.className="renuvex-pr-compact-write-row",B&&R.appendChild(B),P&&R.appendChild(P),x.appendChild(R);function Y(){var O=C.classList.contains("renuvex-pr-open");return _(!1),I()&&(fr[s]=!1),O}function G(){V&&V.notifyOpening(),_(!0),I()&&(fr[s]=!0)}h.onclick=function(){C.classList.contains("renuvex-pr-open")?Y():G()};var V=null;function F(O){V&&(V.unregister(),V=null),O||(V=Xr({trigger:c,element:C,close:Y}))}if(F(L?L.matches:!1),qi(),L){var K=function(O){y(O.matches),F(O.matches)};L.addEventListener?L.addEventListener("change",K):L.addListener&&L.addListener(K),Ve=L,xr=K}if(I()&&fr[s]&&_(!0),n.showRecommendation!==!1){var X=(o[3]||0)+(o[4]||0),j=i>0?Math.round(X/i*100):0;if(j>0){var $=document.createElement("div");$.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",$.style.marginTop="8px",$.innerHTML='<span class="renuvex-pr-recommend-pct">%'+j+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild($)}}return x}var At={};Pe(At,{css:()=>Xi,meta:()=>Ki,render:()=>$i});var fn=`
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
`;var Ki={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Xi=fn;function $i(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,p=e.currentOrderBy,d=e.currentHasImages,m=e.onFilterChange,v=e.onSortChange;Le(n);var u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-split";var s=document.createElement("div");s.className="renuvex-pr-split-col renuvex-pr-split-left";var x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+ue("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",s.appendChild(x);var f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",f.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),s.appendChild(f),u.appendChild(s);var c=document.createElement("div");c.className="renuvex-pr-split-col renuvex-pr-split-mid",c.appendChild(Je({ratingCounts:i,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:m})),u.appendChild(c);var h=pe({widget:r,currentOrderBy:p,currentHasImages:d,onWriteClick:te,onSortChange:v}),b=h.querySelector(".renuvex-pr-filter-wrap"),w=h.querySelector(".renuvex-pr-write-btn"),E=document.createElement("div");E.className="renuvex-pr-split-col renuvex-pr-split-right",w&&E.appendChild(w),b&&E.appendChild(b),u.appendChild(E);var T=(i[3]||0)+(i[4]||0),S=a>0?Math.round(T/a*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+S+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var k=t.showRecommendation===!1||S===0;return k&&g.classList.add("renuvex-pr-split-rec-hidden"),s.appendChild(g),u}var Pt={};Pe(Pt,{css:()=>Zi,meta:()=>Ji,render:()=>Qi});var xn=`
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
`;var Ji={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Zi=xn;function Qi(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-minimal";var m=document.createElement("div");m.className="renuvex-pr-minimal-info";var v=document.createElement("div");v.className="renuvex-pr-minimal-row";var u=document.createElement("span");u.className="renuvex-pr-minimal-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("span");s.className="renuvex-pr-minimal-stars",s.innerHTML=Re(i,n),v.appendChild(s);var x=document.createElement("span");x.className="renuvex-pr-minimal-count",x.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),v.appendChild(x),m.appendChild(v),d.appendChild(m);var f=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),c=f.querySelector(".renuvex-pr-filter-wrap"),h=f.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-minimal-actions",h&&b.appendChild(h),c&&b.appendChild(c),d.appendChild(b);var w=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),E=w.querySelector(".renuvex-pr-filter-wrap"),T=w.querySelector(".renuvex-pr-write-btn"),S=document.createElement("div");return S.className="renuvex-pr-minimal-write-row",T&&S.appendChild(T),E&&S.appendChild(E),d.appendChild(S),d}var _t={};Pe(_t,{css:()=>ro,meta:()=>eo,render:()=>to});var gn=`
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
`;var eo={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},ro=gn;function to(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,i=e.avgRatingVal,o=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary renuvex-pr-summary-hero";var m=document.createElement("div");m.className="renuvex-pr-hero-info";var v=document.createElement("div");v.className="renuvex-pr-hero-rating-col";var u=document.createElement("span");u.className="renuvex-pr-hero-avg",u.textContent=i,v.appendChild(u);var s=document.createElement("div");s.className="renuvex-pr-hero-meta-row";var x=document.createElement("span");x.className="renuvex-pr-hero-stars",x.innerHTML=Re(i,n),s.appendChild(x);var f=document.createElement("div");f.className="renuvex-pr-hero-count",f.textContent=a.toLocaleString("tr-TR")+" "+H(t.countLabel,"Yorum"),s.appendChild(f),v.appendChild(s),m.appendChild(v),d.appendChild(m);var c=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),h=c.querySelector(".renuvex-pr-filter-wrap"),b=c.querySelector(".renuvex-pr-write-btn"),w=document.createElement("div");w.className="renuvex-pr-hero-actions renuvex-pr-hero-desktop-only",b&&w.appendChild(b),h&&w.appendChild(h),d.appendChild(w);var E=pe({widget:r,currentOrderBy:o,currentHasImages:l,onWriteClick:te,onSortChange:p}),T=E.querySelector(".renuvex-pr-filter-wrap"),S=E.querySelector(".renuvex-pr-write-btn"),g=document.createElement("div");return g.className="renuvex-pr-hero-write-row",S&&g.appendChild(S),T&&g.appendChild(T),d.appendChild(g),d}var hn=`
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
`;var tt={classic:Et,compact:Tt,split:At,minimal:Pt,hero:_t};function at(e){return tt[e]||tt.classic}function bn(){var e=Object.keys(tt).map(function(r){return tt[r].css||""}).join(`
`);return hn+`
`+e}var Mt={};Pe(Mt,{css:()=>no,meta:()=>ao,render:()=>io});function Ne(e,r){r=r||{};var t=e&&e.type==="video"?{width:r.width||r.sourceWidth||0,height:r.height||r.width||r.sourceWidth||0,fit:"crop"}:null,n=t?qe(e.posterUrl,t):sa(e);if(!n)return null;var a=document.createElement("img"),i=e.type==="image"?Nr(n,r.sourceWidth):{src:n,srcset:ua(e.posterUrl,t)};if(a.src=i.src,i.srcset&&(a.srcset=i.srcset),a.loading=r.loading||"lazy",a.decoding="async",e.type==="image"&&a.setAttribute("data-renuvex-img-url",e.url),r.width&&(a.width=r.width),r.height&&(a.height=r.height),a.alt="",Br(a),e.type!=="video")return a.className=r.className||"",ur(a,r.onOpen,r.imageLabel||"Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),a;var o=document.createElement("button");o.type="button",o.className=(r.className||"")+" renuvex-pr-media-video-thumb",a.className="renuvex-pr-media-poster",o.appendChild(a);var l=document.createElement("span");l.className="renuvex-pr-media-play";var p=ee(_r);p&&l.appendChild(p),o.appendChild(l);var d=va(e.durationMs);if(d){var m=document.createElement("span");m.className="renuvex-pr-media-duration",m.textContent=d,o.appendChild(m)}return ur(o,r.onOpen,r.videoLabel||"Yorum videosunu oynat"),o}function ar(e,r,t){var n=t||{},a=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,a.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:i,readMore:o}}function nr(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=H(N&&N.merchantReplyLabel,"Ma\u011Faza Sahibi"),n.appendChild(a),t.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,i.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var yn=`
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
`;var ao={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},no=yn;function io(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=ke(e.rating,N),a.appendChild(i);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=Se(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-author",p.textContent=e.author||"",t.appendChild(p);var d=(e.comment||"").trim();d&&t.appendChild(ar(d,"renuvex-pr-body").fragment);var m=Ce(e);if(m.length){var v=document.createElement("div");v.className="renuvex-pr-gallery",m.forEach(function(s){var x=Ne(s,{className:"renuvex-pr-img",sourceWidth:le,width:le,height:le,onOpen:function(){ge(e,s.url,r)}});x&&v.appendChild(x)}),t.appendChild(v)}var u=nr(e.merchantReply);return u&&t.appendChild(u),t}var Lt={};Pe(Lt,{css:()=>lo,meta:()=>oo,render:()=>po});var wn=`
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
`;var oo={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-h":"106.67px","--renuvex-pr-list-photo-w-mobile":"80px","--renuvex-pr-list-photo-h-mobile":"106.67px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-h":"146.67px","--renuvex-pr-list-photo-w-mobile":"100px","--renuvex-pr-list-photo-h-mobile":"133.33px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-h":"186.67px","--renuvex-pr-list-photo-w-mobile":"110px","--renuvex-pr-list-photo-h-mobile":"146.67px"}}},lo=wn;function po(e,r){var t=Ce(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=ke(e.rating,N),i.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",i.appendChild(l);var p=document.createElement("time");p.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&p.setAttribute("datetime",e.createdAt),p.textContent=Se(e.createdAt),i.appendChild(p),a.appendChild(i);var d=document.createElement("div");if(d.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,d.appendChild(m)}var v=(e.comment||"").trim();v&&d.appendChild(ar(v,"renuvex-pr-review-list-body").fragment);var u=nr(e.merchantReply);if(u&&d.appendChild(u),a.appendChild(d),n){var s=document.createElement("div");s.className="renuvex-pr-review-list-media",t.forEach(function(x){var f=Ne(x,{sourceWidth:le,width:le,height:Math.round(le*4/3),onOpen:function(){ge(e,x.url,r)}});f&&s.appendChild(f)}),a.appendChild(s)}return a}var Rt={};Pe(Rt,{css:()=>so,meta:()=>uo,render:()=>vo});var kn=`
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
`;var uo={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},so=kn;function vo(e,r){var t=Ur(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=ke(e.rating,N),i.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,i.appendChild(l)}var p=document.createElement("div");p.className="renuvex-pr-review-gallery-author",p.textContent=e.author||"",i.appendChild(p);var d=document.createElement("time");d.className="renuvex-pr-review-gallery-date",d.style.display="block",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=Se(e.createdAt),i.appendChild(d);var m=(e.comment||"").trim();if(m&&i.appendChild(ar(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){ge(e,t.url,r)}}:null).fragment),a.appendChild(i),n){var v=document.createElement("div");v.className="renuvex-pr-review-gallery-media";var u=Ne(t,{sourceWidth:Lr,width:Lr,height:Math.round(Lr*4/3),onOpen:function(){ge(e,t.url,r)}});u&&v.appendChild(u),a.appendChild(v)}var s=nr(e.merchantReply,t?function(){ge(e,t.url,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(s)),a}var nt={card:Mt,list:Lt,gallery:Rt};function it(e){return nt[e]||nt.card}function Sn(){return Object.keys(nt).map(function(e){return nt[e].css||""}).join(`
`)}var Nt=0;function De(){return Nt++,Nt}function Ye(e,r){return e!==Nt?!1:r?!(r.productId!==void 0&&J!==r.productId||r.orderBy!==void 0&&re!==r.orderBy||r.page!==void 0&&or!==r.page||r.ratingFilter!==void 0&&ie!==r.ratingFilter||r.hasImages!==void 0&&oe!==r.hasImages||r.nextCursor!==void 0&&kr!==r.nextCursor):!0}var Bt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,loadMoreMinHeight:32,loadMorePadY:7,loadMorePadX:20,loadMoreMobileMinHeight:36,paginationButtonSize:32,paginationPadX:7,paginationGap:4,paginationMarginTop:16,paginationGapMin:18,paginationMobileButtonSize:34,paginationMobileFontSize:12,paginationMobileGap:0,paginationMobileMarginTop:14,paginationMobileGapMin:14,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74,minimalCountSize:14,heroCountSize:14},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:13,loadMoreMinHeight:36,loadMorePadY:8,loadMorePadX:24,loadMoreMobileMinHeight:38,paginationButtonSize:36,paginationPadX:8,paginationGap:5,paginationMarginTop:18,paginationGapMin:20,paginationMobileButtonSize:36,paginationMobileFontSize:13,paginationMobileGap:2,paginationMobileMarginTop:16,paginationMobileGapMin:16,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90,minimalCountSize:16,heroCountSize:16},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:14,loadMoreMinHeight:40,loadMorePadY:9,loadMorePadX:28,loadMoreMobileMinHeight:40,paginationButtonSize:40,paginationPadX:10,paginationGap:6,paginationMarginTop:20,paginationGapMin:22,paginationMobileButtonSize:40,paginationMobileFontSize:14,paginationMobileGap:2,paginationMobileMarginTop:18,paginationMobileGapMin:18,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106,minimalCountSize:18,heroCountSize:18}},It={small:80,medium:110,large:140},Ot={small:80,medium:100,large:110};function zn(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),n.appendChild(a),n.appendChild(i);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(l),r}function Cn(e){e=e||{};var r=document.createElement("div");r.className="renuvex-pr-empty-state";var t=document.createElement("div");t.className="renuvex-pr-empty-state-content";var n=document.createElement("div");n.className="renuvex-pr-empty-state-stars",n.innerHTML=Re(0,e.iconPair),t.appendChild(n);var a=document.createElement("p");a.className="renuvex-pr-state-msg renuvex-pr-empty-state-text",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.textContent=e.emptyStateText||"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun.",t.appendChild(a),r.appendChild(t);var i=document.createElement("button");return i.type="button",i.className="renuvex-pr-write-btn renuvex-pr-empty-state-cta",i.textContent=e.writeButtonText||"Yorum Yap",i.onclick=typeof e.onWriteClick=="function"?e.onWriteClick:null,r.appendChild(i),r}function En(){var e=document.createElement("p");return e.className="renuvex-pr-state-msg renuvex-pr-filter-empty-state",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.textContent="Hen\xFCz yorum yok.",e}function Tn(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Te(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+n+","+a+","+i+","+r+")"}function ot(e){var r=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e||"");return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function Ut(e){var r=e/255;return r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}function An(e){return .2126*Ut(e.r)+.7152*Ut(e.g)+.0722*Ut(e.b)}function Pn(e,r){var t=An(e),n=An(r),a=Math.max(t,n),i=Math.min(t,n);return(a+.05)/(i+.05)}function co(e){var r=ot(e)||ot("#ffffff"),t=ot("#111111"),n=ot("#ffffff");return Pn(t,r)>=Pn(n,r)?"#111111":"#ffffff"}function mo(e){return Te(e,e==="#ffffff"?.1:.06)}function _n(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",p=r.barCountColor||"#111111",d=Te(o,.06),m=r.reviewStarColor||"#f59e0b",v=r.btnBgColor||"#111111",u=r.btnTextColor||"#ffffff",s=r.btnBorderColor||"#111111",x=r.filterBtnBgColor||"#111111",f=r.filterBtnTextColor||"#ffffff",c=r.filterBtnBorderColor||"#111111",h=r.filterMenuBgColor||"#ffffff",b=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",E=r.filterItemHoverBgColor||"#f3f4f6",T=r.filterItemActiveColor||"#111111",S=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",k=r.reviewDateColor||"#5e5e5e",C=r.reviewBodyColor||"#111111",z=r.reviewBorderColor||"#e5e7eb",A=Te(C,.65),L=r.replyBgColor||"#f9fafb",I=r.replyBorderColor||"#747474",_=r.replyLabelColor||"#111111",y=r.replyTextColor||"#111111",M=r.photoTitleColor||"#111111",P=Te("#111111",.05),B=r.photoArrowBgColor||"#ffffff",R=r.photoArrowTextColor||"#111111",Y=Te("#111111",.12),G=r.formBgColor||"#ffffff",V=r.formPrimaryTextColor||"#111111",F=r.formSecondaryTextColor||"#3b3b3b",K=r.inputTextColor||V,X=r.inputBorderColor||"#d1d5db",j=r.placeholderColor||"#9ca3af",$=r.formStepBarColor||"#111111",O=r.formBtnBgColor||"#111111",U=r.formBtnTextColor||"#ffffff",W=r.formBtnBorderColor||"#111111",ae=Te(O,.06),q=Te(O,.18),Z=Te(U,.85),gr=Te(V,.06),Ae=co(G),D=mo(Ae),ne=r.loadMoreBgColor||"#ffffff",me=r.loadMoreTextColor||"#111111",Q=r.loadMoreBorderColor||"#111111",be=r.paginationBgColor||"#ffffff",hr=r.paginationTextColor||"#111111",br=r.paginationBorderColor||"#e5e7eb",yr=r.paginationActiveBgColor||"#111111",wr=r.paginationActiveTextColor||"#ffffff",fe={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":p,"--renuvex-pr-bar-hover-bg":d,"--renuvex-pr-btn-bg":v,"--renuvex-pr-btn-text":u,"--renuvex-pr-btn-border":s,"--renuvex-pr-filter-btn-bg":x,"--renuvex-pr-filter-btn-text":f,"--renuvex-pr-filter-btn-border":c,"--renuvex-pr-filter-menu-bg":h,"--renuvex-pr-filter-menu-border":b,"--renuvex-pr-filter-item-text":w,"--renuvex-pr-filter-item-hover-bg":E,"--renuvex-pr-filter-item-active":T,"--renuvex-pr-review-title":S,"--renuvex-pr-review-author":g,"--renuvex-pr-review-date":k,"--renuvex-pr-review-body":C,"--renuvex-pr-review-border":z,"--renuvex-pr-state-text":A,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":L,"--renuvex-pr-reply-border":I,"--renuvex-pr-reply-label":_,"--renuvex-pr-reply-text":y,"--renuvex-pr-photo-title":M,"--renuvex-pr-photo-image-border":P,"--renuvex-pr-photo-arrow-bg":B,"--renuvex-pr-photo-arrow-text":R,"--renuvex-pr-photo-arrow-border":Y,"--renuvex-pr-fwizard-bg":G,"--renuvex-pr-fwizard-text":V,"--renuvex-pr-fwizard-secondary-text":F,"--renuvex-pr-fwizard-input-bg":G,"--renuvex-pr-fwizard-input-text":K,"--renuvex-pr-fwizard-input-border":X,"--renuvex-pr-fwizard-placeholder":j,"--renuvex-pr-fwizard-close-text":Ae,"--renuvex-pr-fwizard-close-hover-bg":D,"--renuvex-pr-fwizard-progress-bg":gr,"--renuvex-pr-fwizard-progress-active":$,"--renuvex-pr-fwizard-btn-bg":O,"--renuvex-pr-fwizard-btn-text":U,"--renuvex-pr-fwizard-btn-border":W,"--renuvex-pr-fwizard-btn-disabled-bg":q,"--renuvex-pr-fwizard-btn-disabled-text":Z,"--renuvex-pr-fwizard-nav-hover-bg":ae,"--renuvex-pr-load-more-bg":ne,"--renuvex-pr-load-more-text":me,"--renuvex-pr-load-more-border":Q,"--renuvex-pr-pagination-bg":be,"--renuvex-pr-pagination-text":hr,"--renuvex-pr-pagination-border":br,"--renuvex-pr-pagination-active-bg":yr,"--renuvex-pr-pagination-active-text":wr};Object.keys(fe).forEach(function(ir){e.style.setProperty(ir,fe[ir])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}function Mn(e){var r=e.settings,t=e.root,n=e.currentHasImages,a=e.openReviewModal,i=(e.photoStripReviews||[]).filter(function(w){return Ce(w).length>0});if(!(r.showPhotoGallery!==!1&&!n&&i.length>0))return null;var o=document.createElement("div");if(o.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var l=H(r.photoGalleryTitle,"Foto\u011Frafl\u0131 Yorumlar"),p=document.createElement("div");p.className="renuvex-pr-photo-title",p.textContent=l,o.appendChild(p)}var d=r.reviewLayout==="card"?"1/1":"3/4";t.style.setProperty("--renuvex-pr-photo-thumb-aspect",d);var m=document.createElement("div");m.className="renuvex-pr-photo-strip";var v=le,u=r.reviewLayout==="card"?le:Math.round(le*4/3),s=0;i.forEach(function(w){if(!(s>=15)){var E=Ur(w);if(E){var T=Ne(E,{className:"renuvex-pr-photo-strip-thumb",sourceWidth:le,width:v,height:u,loading:s<3?"eager":"lazy",onOpen:function(){a(w,E.url,i)}});T&&(m.appendChild(T),s++)}}});var x=document.createElement("button");x.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var f=ee(We);f&&x.appendChild(f),x.setAttribute("aria-label","\xD6nceki"),x.onclick=function(){m.scrollBy({left:-200,behavior:"smooth"})};var c=document.createElement("button");c.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var h=ee(Ar);h&&c.appendChild(h),c.setAttribute("aria-label","Sonraki"),c.onclick=function(){m.scrollBy({left:200,behavior:"smooth"})};var b=document.createElement("div");return b.className="renuvex-pr-photo-strip-wrap",b.appendChild(x),b.appendChild(m),b.appendChild(c),o.appendChild(b),o}var fo=1,xo=7,Ft="\u2026";function go(e,r){var t=Math.max(1,Math.floor(Number(r))||1),n=Math.min(Math.max(1,Math.floor(Number(e))||1),t);if(t<=xo){for(var a=[],i=1;i<=t;i++)a.push(i);return a}for(var o=[],l=1;l<=t;l++)(l===1||l===t||Math.abs(l-n)<=fo)&&o.push(l);for(var p=[],d=0;d<o.length;d++)d>0&&o[d]-o[d-1]>1&&p.push(Ft),p.push(o[d]);return p}function Ln(e){var r=Math.max(1,Math.floor(Number(e.totalPages))||1),t=Math.min(Math.max(1,Math.floor(Number(e.page))||1),r),n=typeof e.onPageChange=="function"?e.onPageChange:function(){},a=document.createElement("nav");a.className="renuvex-pr-pagination",a.setAttribute("aria-label","Yorum sayfalar\u0131");function i(p){a.setAttribute("aria-busy","true");for(var d=a.querySelectorAll("button"),m=0;m<d.length;m++)d[m].disabled=!0;n(p)}function o(p,d){var m=document.createElement("span");m.className="renuvex-pr-pagination-label",m.setAttribute("aria-hidden","true"),m.textContent=d,p.appendChild(m)}function l(p,d,m,v){var u=document.createElement("button");return u.type="button",u.className="renuvex-pr-pagination-arrow",u.setAttribute("aria-label",p),o(u,d),v?u.disabled=!0:u.onclick=function(){i(m)},u}return a.appendChild(l("\xD6nceki sayfa","\u2039",t-1,t<=1)),go(t,r).forEach(function(p){if(p===Ft){var d=document.createElement("span");d.className="renuvex-pr-pagination-gap",d.setAttribute("aria-hidden","true"),d.textContent=Ft,a.appendChild(d);return}var m=document.createElement("button");m.type="button",m.className="renuvex-pr-pagination-btn",m.setAttribute("aria-label","Sayfa "+p),o(m,String(p)),p===t?m.setAttribute("aria-current","page"):m.onclick=function(){i(p)},a.appendChild(m)}),a.appendChild(l("Sonraki sayfa","\u203A",t+1,t>=r)),a}function Rn(e,r){if(e){var t=e.getElementById&&e.getElementById("renuvex-pr-pagination-live");t||(t=document.createElement("div"),t.id="renuvex-pr-pagination-live",t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),t.style.cssText="position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;",e.appendChild(t)),t.textContent="Sayfa "+r}}function Nn(e){var r=e.render;async function t(){var o=De(),l=J,p=re,d=ie,m=oe;Me(null);var v=await Fe(J,re,1,ie,oe);Ye(o,{productId:l,orderBy:p,ratingFilter:d,hasImages:m})&&await r(J,N,v,Be,re,1,Vt)}async function n(o){var l=De(),p=ie===o?null:o,d=J,m=re,v=oe;Yt(p),Ie(1),Me(null);var u=await Fe(J,re,1,p,oe);Ye(l,{productId:d,orderBy:m,page:1,ratingFilter:p,hasImages:v})&&await r(J,N,u,Be,re,1)}async function a(o,l){var p=De(),d=J,m=ie;Ie(1),Me(null);var v=o,u=!1;l&&(u=!0,v="newest"),jt(u),Sr(v);var s=await Fe(J,v,1,ie,u);Ye(p,{productId:d,orderBy:v,page:1,ratingFilter:m,hasImages:u})&&await r(J,N,s,Be,v,1)}async function i(o){var l=De(),p=J,d=re,m=ie,v=oe;Ie(o),Me(null);var u=await Fe(J,re,o,ie,oe);if(Ye(l,{productId:p,orderBy:d,page:o,ratingFilter:m,hasImages:v})){await r(J,N,u,Be,re,o);var s=document.getElementById("renuvex-reviews"),x=s&&s.shadowRoot,f=x&&x.querySelector&&x.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');if(f){try{f.focus({preventScroll:!0})}catch(b){try{f.focus()}catch(w){}}Rn(x,o)}if(typeof window!="undefined"&&!window.__ikasPreviewMode){var c=document.getElementById("renuvex-reviews");if(c&&typeof c.scrollIntoView=="function"){var h=typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;c.scrollIntoView({behavior:h?"auto":"smooth",block:"start"})}}}}return{onRetry:t,onFilterChange:n,onSortChange:a,onPageChange:i}}function ho(){return da()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function bo(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=la({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),pa(t,{surface:"reviews",productId:r||""}),t}async function Ht(e,r,t,n,a,i,o){if(Qt){Er({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:i,badgeSettings:o});return}Cr(!0),Wt(e),qt(r),o!==void 0&&Gt(o),Kt(n),a&&Sr(a),i&&Ie(i),t!=null&&(Xt(t),Me(t&&t.data?t.data.nextCursor:null));var l=Nn({render:Ht});try{let Ae=function(D,ne){if(!(!D||!D.meta||!D.meta.sizeOverrides)){var me=D.meta.sizeOverrides[ne];me&&Object.keys(me).forEach(function(Q){s.style.setProperty(Q,me[Q])})}};var Z=Ae,p=at(r.summaryLayout),d=!(p.meta&&p.meta.supports&&p.meta.supports.title===!1),m=r.showTitle!==!1,v=H(r.title,"M\xFC\u015Fteri Yorumlar\u0131"),u=d&&m?v:"",s=document.documentElement;_n(s,r);var x=r.borderRadius!==void 0?r.borderRadius:8,f=Bt[r.size]||Bt.medium,c=It[r.thumbnailSize]||It.medium,h=c;(r.reviewLayout==="list"||r.reviewLayout==="gallery")&&(h=Ot[r.thumbnailSize]||Ot.medium),s.style.setProperty("--renuvex-pr-title-size",f.titleSize+"px"),s.style.setProperty("--renuvex-pr-review-text-size",f.reviewTextSize+"px"),s.style.setProperty("--renuvex-pr-review-title-size",f.reviewTitleSize+"px"),s.style.setProperty("--renuvex-pr-author-size",f.authorSize+"px"),s.style.setProperty("--renuvex-pr-reply-name-size",f.replyNameSize+"px"),s.style.setProperty("--renuvex-pr-reply-text-size",f.replyTextSize+"px"),s.style.setProperty("--renuvex-pr-radius",x+"px"),s.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,x-4)+"px"),s.style.setProperty("--renuvex-pr-photo-title-size",f.photoTitleSize+"px"),s.style.setProperty("--renuvex-pr-avg-rating-size",f.avgRatingSize+"px"),s.style.setProperty("--renuvex-pr-review-count-size",f.reviewCountSize+"px"),s.style.setProperty("--renuvex-pr-compact-count-size",f.compactCountSize+"px"),s.style.setProperty("--renuvex-pr-recommend-size",f.recommendSize+"px"),s.style.setProperty("--renuvex-pr-btn-text-size",f.btnTextSize+"px"),s.style.setProperty("--renuvex-pr-bar-label-size",f.barLabelSize+"px"),s.style.setProperty("--renuvex-pr-minimal-avg-size",f.minimalAvgSize+"px"),s.style.setProperty("--renuvex-pr-hero-avg-size",f.heroAvgSize+"px"),s.style.setProperty("--renuvex-pr-minimal-count-size",f.minimalCountSize+"px"),s.style.setProperty("--renuvex-pr-hero-count-size",f.heroCountSize+"px"),s.style.setProperty("--renuvex-pr-bar-count-size",f.barCountSize+"px"),s.style.setProperty("--renuvex-pr-review-date-size",f.reviewDateSize+"px"),s.style.setProperty("--renuvex-pr-filter-text-size",f.filterTextSize+"px"),s.style.setProperty("--renuvex-pr-load-more-size",f.loadMoreSize+"px"),s.style.setProperty("--renuvex-pr-load-more-min-height",f.loadMoreMinHeight+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-y",f.loadMorePadY+"px"),s.style.setProperty("--renuvex-pr-load-more-pad-x",f.loadMorePadX+"px"),s.style.setProperty("--renuvex-pr-load-more-mobile-min-height",f.loadMoreMobileMinHeight+"px"),s.style.setProperty("--renuvex-pr-pagination-button-size",f.paginationButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-pad-x",f.paginationPadX+"px"),s.style.setProperty("--renuvex-pr-pagination-gap",f.paginationGap+"px"),s.style.setProperty("--renuvex-pr-pagination-margin-top",f.paginationMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-gap-min",f.paginationGapMin+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-button-size",f.paginationMobileButtonSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-font-size",f.paginationMobileFontSize+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap",f.paginationMobileGap+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-margin-top",f.paginationMobileMarginTop+"px"),s.style.setProperty("--renuvex-pr-pagination-mobile-gap-min",f.paginationMobileGapMin+"px"),s.style.setProperty("--renuvex-pr-read-more-size",f.readMoreSize+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size",c+"px"),s.style.setProperty("--renuvex-pr-thumbnail-size-mobile",h+"px");var b=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";s.style.setProperty("--renuvex-pr-review-star-color",b),s.style.setProperty("--renuvex-pr-star-size",f.reviewStarSize+"px"),s.style.setProperty("--renuvex-pr-avg-star-size",f.avgStarSize+"px"),Ae(at(r.summaryLayout),r.size),Ae(it(r.reviewLayout),r.size);var w=lr(r),E=ho();if(!E)return;var T=bo(E,e),S=document.getElementById("renuvex-reviews");S||(S=document.createElement("div"),S.id="renuvex-reviews",S.style.minHeight="200px"),S.parentNode!==T&&T.appendChild(S);var g=ca(S),k=Ge+je+Hr+bn()+Sn();Ke(g,k);var C=fa(g);if(r.enabled===!1){S.style.minHeight="auto",C.replaceChildren(zn(r.borderRadius!==void 0?r.borderRadius:8)),Cr(!1);var z=zr;Er(null),z&&Ht(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}try{var A=t||{},L=vt(A),I=L?[]:A.data&&A.data.reviews||[];$t(I),C.replaceChildren();var _=document.createElement("section");if(_.id="renuvex-reviews-widget",_.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),_.className="renuvex-pr-reviews-widget",_.setAttribute("data-renuvex-surface","reviews"),e&&_.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(_.style.width="100%",_.style.maxWidth="100%",_.style.marginLeft="0",_.style.marginRight="0"),u){var y=document.createElement("div"),M=r.summaryLayout||"classic";y.className="renuvex-pr-title renuvex-pr-title-"+M,y.textContent=u,_.appendChild(y)}if(L){_.appendChild(Tn(A.message,l.onRetry)),C.appendChild(_),Oe(g),pt(_,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return g.getElementById("renuvex-reviews-widget")});return}var P=A.data&&A.data.allCount||0,B=A.data&&A.data.ratingCounts||null,R=B||[0,0,0,0,0],Y=A.data&&A.data.avgRating||"0.0";if(!B&&I.length>0){I.forEach(function(D){D.rating>=1&&D.rating<=5&&R[D.rating-1]++});var G=I.reduce(function(D,ne){return D+ne.rating},0);Y=(G/I.length).toFixed(1)}if(P===0)_.classList.add("renuvex-pr-reviews-empty"),_.appendChild(Cn({iconPair:w,writeButtonText:H(r.writeButtonText,"Yorum Yap"),emptyStateText:H(r.emptyStateText,"\u0130lk yorumu yazarak di\u011Fer m\xFC\u015Fterilere yard\u0131mc\u0131 olun."),onWriteClick:te}));else{var V=at(r.summaryLayout),F=V.render({widget:_,productId:e,data:A,settings:r,iconPair:w,allCount:P,ratingCounts:R,avgRatingVal:Y,currentRatingFilter:ie,currentOrderBy:re,currentHasImages:oe,onFilterChange:l.onFilterChange,onSortChange:l.onSortChange});_.appendChild(F);var K=Mn({settings:r,root:s,currentHasImages:oe,photoStripReviews:Dt,openReviewModal:ge,wireLightboxTrigger:ur});if(K&&_.appendChild(K),I.length===0)_.appendChild(En());else{var X=it(r.reviewLayout);I.forEach(function(D){_.appendChild(X.render(D,dt))})}var j=r.paginationMode==="numbered"?"numbered":"loadMore";if(j==="numbered"){var $=A.data&&A.data.totalPages||1;$>1&&_.appendChild(Ln({page:A.data&&A.data.page||or||1,totalPages:$,onPageChange:l.onPageChange}))}var O=j==="loadMore"&&A.data&&A.data.hasMore;if(O){let D=function(ne){W.textContent=ne,U.setAttribute("aria-label",ne)};var gr=D,U=document.createElement("button");U.className="renuvex-pr-load-more";var W=document.createElement("span");W.className="renuvex-pr-load-more-label",W.setAttribute("aria-hidden","true"),U.appendChild(W),D("Daha Fazla G\xF6ster"),U.onclick=async function(){U.disabled=!0,D("Y\xFCkleniyor...");var ne=De(),me=J,Q=re,be=or,hr=ie,br=oe,yr=kr,wr=be+1,fe=await Fe(me,Q,wr,hr,br,null,yr);if(Ye(ne,{productId:me,orderBy:Q,page:be,ratingFilter:hr,hasImages:br,nextCursor:yr}))if(fe&&!vt(fe)&&fe.data&&Array.isArray(fe.data.reviews)){var ir=Jt(fe.data.reviews);Zt(ir),Ie(wr),Me(fe.data.nextCursor||null);var Bn=it(N.reviewLayout);ir.forEach(function(In){_.insertBefore(Bn.render(In,dt),U)}),fe.data.hasMore?(U.disabled=!1,D("Daha Fazla G\xF6ster")):U.remove()}else U.disabled=!1,D("Tekrar Dene")},_.appendChild(U)}}C.appendChild(_),Oe(g),pt(_,"reviews-widget",{productId:e||""},function(){return g.getElementById("renuvex-reviews-widget")})}catch(D){console.error("[renuvex-pr] render error:",D);var ae=document.createElement("p");ae.style.cssText="text-align:center;color:#dc2626;",ae.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",C&&C.replaceChildren(ae)}}finally{if(Cr(!1),zr){var q=zr;Er(null),Ht(q.productId,q.settings,q.reviewsData,q.productName,q.orderBy,q.page,q.badgeSettings)}}}export{Ht as render};
