/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ae,d as ar}from"./chunk-FW6W6ZQL.js";import{b as Mr,c as $e}from"./chunk-ZM24JLBV.js";import{A as or,a as ke,b as Jr,c as Le,d as Ne,e as te,f as A,g as Zr,h as Pe,j as Pr,k as $r,l as Rr,m as Ke,n as Qr,o as et,p as rt,q as tt,r as at,s as nt,t as it,v as ot,w as lt,x as pt,y as nr,z as ir}from"./chunk-4OXLOSZH.js";import{A as ge,B as dr,C as V,D as ur,E as sr,F as Br,G as Ir,H as ae,I as ft,J as ne,K as gt,L as ht,c as Nr,e as fe,f as J,g as de,h as Z,i as ze,j as lr,k as Je,l as dt,m as Re,n as pr,o as ut,p as Ce,q as st,r as vt,t as ct,u as ue,v as Be,x as mt,y as se,z as xt}from"./chunk-RQNBC2V2.js";import{a as Ze}from"./chunk-GSBAPHFO.js";import{a as xe,b as qe,c as Xe,k as bt,l as Se}from"./chunk-YCWIZ2SG.js";var Ie=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function yt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Me(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function vr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function wt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function kt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var cr=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #renuvex-reviews-widget{color:#111111;background:transparent;border:1px solid var(--renuvex-pr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;--renuvex-pr-pad-summary-mobile:16px;--renuvex-pr-pad-review-mobile:16px;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #renuvex-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* NOT: Eskiden burada .renuvex-pr-body ve .renuvex-pr-reply-text i\xE7in max-width:70ch vard\u0131
     (okunabilirlik). Card layout'ta "Devam\u0131n\u0131 oku" sonras\u0131 body 70ch'de kesiliyor,
     parent geni\u015Fli\u011Fini kullanm\u0131yordu \u2014 kald\u0131r\u0131ld\u0131. Sat\u0131r uzunlu\u011Fu art\u0131k layout
     container'\u0131na ba\u011Fl\u0131. Uzun-kelime ta\u015Fma korumas\u0131 overflow-wrap:anywhere ile
     ayr\u0131 kuralda (a\u015Fa\u011F\u0131da), o davran\u0131\u015F de\u011Fi\u015Fmedi. */
  /* Kullan\u0131c\u0131 i\xE7eri\u011Fi ta\u015Fma korumas\u0131 \u2014 uzun bo\u015Fluksuz string (URL, "aaaa...",
     \xFCr\xFCn kodu) container'\u0131 zorlamas\u0131n diye yumu\u015Fak k\u0131rma. Sadece text class'lar\u0131na
     uygulan\u0131r, buton/UI tipografisine dokunulmaz. Gallery masonry i\xE7in kritik:
     tek bir uzun string break-inside:avoid'a ra\u011Fmen kolon dengesini bozard\u0131. */
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
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget scope'undan \xC7IKAR. Global kural \u015Fart. */
  .renuvex-pr-modal-body,
  .renuvex-pr-modal-title,
  .renuvex-pr-modal-author,
  .renuvex-pr-modal-reply-text{overflow-wrap:anywhere;}
  .renuvex-pr-title{font-size:var(--renuvex-pr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--renuvex-pr-header-title,#111111);overflow-wrap:anywhere;}
  /* Classic layout basligi ortali \u2014 classic disindaki layout'lar sola yasli */
  .renuvex-pr-title-classic{text-align:center;}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .renuvex-pr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .renuvex-pr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .renuvex-pr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .renuvex-pr-icon > svg{width:100%;height:100%;display:block;}

${mt}

  /* \u2500\u2500\u2500 SUMMARY LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her blok ba\u011F\u0131ms\u0131z \u2014 s\u0131ra/gizleme CSS ile kolayca de\u011Fi\u015Ftirilebilir.
     Kolon geni\u015Flikleri CSS variable ile payla\u015F\u0131l\u0131r (label/count s\xFCtunlar\u0131).
     Bu sayede bar-row ve actions-row ayn\u0131 hizada kal\u0131r. */
  .renuvex-pr-summary{
    --renuvex-pr-col-label:104px;
    --renuvex-pr-col-count:60px;
    --renuvex-pr-col-gap:4px;
    --renuvex-pr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;border-radius:var(--renuvex-pr-radius,6px);margin:0 auto 24px;
  }
  .renuvex-pr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--renuvex-pr-summary-max);}

  /* Blok: Ortalama puan (b\xFCy\xFCk) */
  .renuvex-pr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .renuvex-pr-avg-star{width:var(--renuvex-pr-avg-star-size,52px);height:var(--renuvex-pr-avg-star-size,52px);color:var(--renuvex-pr-review-star-color,#f59e0b);line-height:1;}
  .renuvex-pr-avg-num{font-size:var(--renuvex-pr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--renuvex-pr-header-avg,#111111);}

  /* Blok: Toplam yorum say\u0131s\u0131 */
  .renuvex-pr-summary-count{font-size:var(--renuvex-pr-review-count-size,16px);color:var(--renuvex-pr-header-count,#111111);white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  /* Blok: Tavsiye y\xFCzdesi */
  .renuvex-pr-summary-recommend{display:block;font-size:var(--renuvex-pr-recommend-size,14px);color:var(--renuvex-pr-header-recommend,#111111);text-align:center;max-width:none;width:auto;}
  .renuvex-pr-recommend-pct{font-weight:700;color:var(--renuvex-pr-header-recommend,#111111);margin-right:3px;}

  /* Blok: Bar chart \u2014 her sat\u0131r 3 kolon (label | track | count) */
  /* Bar chart \u2014 flex layout. Track her sat\u0131rda sabit geni\u015Flik (label+count
     kolonu \xE7\u0131kart\u0131lm\u0131\u015F kalan alan). Count absolute, track'in sa\u011F\u0131nda
     say\u0131 kadar yer kaplar \u2014 di\u011Fer sat\u0131rlar\u0131n track'ini etkilemez. */
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

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda.
     Padding yok ki wrapper tam 340px kullansin; bar chart ile kenar hizasi
     tutsun. Bar row'un kendi 3px 6px padding'i hover alani icin, actions'in
     buna ihtiyaci yok. */
  .renuvex-pr-summary-actions{
    display:flex;flex-direction:row;align-items:stretch;gap:var(--renuvex-pr-col-gap);
    box-sizing:border-box;
  }
  /* min-height:36px \u2014 filter butonu (36\xD736 sabit) ile ayni yukseklikte tutar.
     Font small/medium'da yukseklik 36'ya kilitlenir; large font'ta padding
     katkisi ile bir miktar buyur ama filter'la dengeli kalir. */
  .renuvex-pr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--renuvex-pr-btn-bg,#111111);color:var(--renuvex-pr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;border:1px solid var(--renuvex-pr-btn-border,#111111);font-weight:500;font-size:var(--renuvex-pr-btn-text-size,14px);white-space:nowrap;transition:opacity 0.15s;}
  @media(hover:hover){.renuvex-pr-write-btn:hover{opacity:0.92;}}
  .renuvex-pr-filter-wrap{flex:0 0 var(--renuvex-pr-col-count);position:relative;display:flex;justify-content:flex-end;align-items:stretch;}
  /* Filter button colors come from the Filtre color group in admin. */
  .renuvex-pr-filter-btn{display:flex;align-items:center;justify-content:center;width:36px;min-height:36px;height:auto;border-radius:var(--renuvex-pr-radius,6px);border:1px solid var(--renuvex-pr-filter-btn-border,#111111);background:var(--renuvex-pr-filter-btn-bg,transparent);color:var(--renuvex-pr-filter-btn-text,#111111);cursor:pointer;}
  /* Material Symbols viewBox 0 -960 960 960 \u2014 buton i\xE7ine s\u0131\u011Fmas\u0131 i\xE7in 16x16 */
  .renuvex-pr-filter-btn svg{width:16px;height:16px;flex-shrink:0;}

  /* Filtre dropdown (wrap yukar\u0131da tan\u0131mland\u0131) */
  /* Filter dropdown \u2014 Premium growOut animasyonu (200ms ease-in-out) */
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

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .renuvex-pr-photo-section{margin-bottom:24px;padding:0 var(--renuvex-pr-pad-review-mobile);}
  /* Strip \xFCst\xFCndeki b\xF6l\xFCm ba\u015Fl\u0131\u011F\u0131 (End\xFCstri standard\u0131: "Customer Photos") \u2014
     admin "Foto\u011Fraf Galerisi \u2192 Ba\u015Fl\u0131k Rengi" ve SIZE_PRESETS.photoTitleSize
     bu \xF6\u011Feyi kontrol eder. */
  .renuvex-pr-photo-title{
    font-size:var(--renuvex-pr-photo-title-size,16px);
    font-weight:500;
    color:var(--renuvex-pr-photo-title,#111111);
    margin-bottom:12px;
    overflow-wrap:anywhere;
  }
  .renuvex-pr-photo-strip-wrap{position:relative;}
  /* .renuvex-pr-photo-strip ve .renuvex-pr-photo-strip-thumb as\u0131l tan\u0131mlar\u0131 a\u015Fa\u011F\u0131da
     (sat\u0131r 266 ve 268). Bu \xF6l\xFC duplicate kurallar temizlendi.
     .renuvex-pr-photo-thumb hi\xE7bir DOM taraf\u0131ndan kullan\u0131lm\u0131yordu \u2014 silindi. */

  .renuvex-pr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--renuvex-pr-photo-arrow-bg,#fff);border:1px solid var(--renuvex-pr-photo-arrow-border,rgba(0,0,0,0.12));border-radius:var(--renuvex-pr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--renuvex-pr-photo-arrow-text,#111111);box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.renuvex-pr-photo-strip-arrow:hover{background:var(--renuvex-pr-photo-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .renuvex-pr-photo-strip-arrow-prev{left:-16px;}
  .renuvex-pr-photo-strip-arrow-next{right:-16px;}
  .renuvex-pr-photo-strip-arrow svg{width:18px;height:18px;}
  @media(max-width:600px){.renuvex-pr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  /* Card review item \u2014 yan padding mobile'da --renuvex-pr-pad-review-mobile uzerinden
     (mobile blo\u011Funda set edilir). Burada sadece top/bottom; shorthand yerine
     ayr\u0131 property ki mobile yan override'\u0131 specificity sava\u015F\u0131nda kaybetmesin. */
  .renuvex-pr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--renuvex-pr-review-border,#e5e7eb);}
  .renuvex-pr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .renuvex-pr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .renuvex-pr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .renuvex-pr-review-stars .renuvex-pr-icon{width:var(--renuvex-pr-star-size,20px);height:var(--renuvex-pr-star-size,20px);}
  .renuvex-pr-stars{display:inline-flex;gap:2px;align-items:center;color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-stars .renuvex-pr-icon-filled{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  .renuvex-pr-stars .renuvex-pr-icon-empty{color:var(--renuvex-pr-review-star-color,#f59e0b);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .renuvex-pr-review-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-author{font-size:var(--renuvex-pr-author-size,14px);font-weight:600;font-style:normal;color:var(--renuvex-pr-review-author,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-date{color:var(--renuvex-pr-review-date,#5e5e5e);font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .renuvex-pr-body{margin-top:var(--renuvex-pr-gap-normal);line-height:1.65;color:var(--renuvex-pr-review-body,#111111);font-size:var(--renuvex-pr-review-text-size,14px);font-weight:400;}
  .renuvex-pr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .renuvex-pr-read-more{display:block;margin-top:var(--renuvex-pr-gap-tight);color:var(--renuvex-pr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--renuvex-pr-read-more-size,12px);appearance:none;-webkit-appearance:none;background:none;border:0;padding:0;text-align:left;font-family:inherit;}
  .renuvex-pr-read-more:focus-visible{outline:2px solid var(--renuvex-pr-review-star-color,#f59e0b);outline-offset:2px;border-radius:2px;}
  .renuvex-pr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--renuvex-pr-gap-loose);}
  .renuvex-pr-img{width:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));height:var(--renuvex-pr-card-photo-w,var(--renuvex-pr-thumbnail-size,90px));object-fit:cover;border-radius:var(--renuvex-pr-radius,6px);border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));cursor:zoom-in;}
  .renuvex-pr-reply{margin-top:var(--renuvex-pr-gap-loose);padding:12px 16px;background:var(--renuvex-pr-reply-bg-color,#f9fafb);border-radius:var(--renuvex-pr-radius,6px);border-left:3px solid var(--renuvex-pr-reply-border,#747474);}
  .renuvex-pr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .renuvex-pr-reply-label{font-weight:600;font-size:var(--renuvex-pr-reply-name-size,13px);color:var(--renuvex-pr-reply-label,#111111);overflow-wrap:anywhere;}
  .renuvex-pr-reply-text{font-size:var(--renuvex-pr-reply-text-size,13px);font-weight:400;color:var(--renuvex-pr-reply-text,#111111);line-height:1.6;}
  /* Reply clamp: yorum metni (.renuvex-pr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .renuvex-pr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .renuvex-pr-reply-read-more{margin-top:var(--renuvex-pr-gap-tight);}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .renuvex-pr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .renuvex-pr-state-msg{text-align:center;color:rgba(17,17,17,0.45);font-size:14px;padding:30px 0;}
  .renuvex-pr-state-loading{padding:40px;}
  .renuvex-pr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .renuvex-pr-state-error-text{max-width:360px;line-height:1.45;}
  .renuvex-pr-state-retry{padding:9px 22px;border:1px solid var(--renuvex-pr-load-more-border,#111111);border-radius:var(--renuvex-pr-radius,6px);background:var(--renuvex-pr-load-more-bg,#ffffff);color:var(--renuvex-pr-load-more-text,#111111);font-size:var(--renuvex-pr-load-more-size,14px);cursor:pointer;}
  .renuvex-pr-state-retry:disabled{opacity:.6;cursor:not-allowed;}

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--renuvex-pr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .renuvex-pr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--renuvex-pr-gap-tight:4px;--renuvex-pr-gap-normal:8px;--renuvex-pr-gap-loose:16px;--renuvex-pr-gap-section:24px;}
  .renuvex-pr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .renuvex-pr-photo-section{margin:24px 0 32px;padding:0 var(--renuvex-pr-pad-review-mobile);display:block;}
  .renuvex-pr-photo-strip-container{position:relative;}
  /* Desktop: ok'lar icin negatif margin. Mobile'da ok yok, margin gerekmez. */
  @media(min-width:601px){
    .renuvex-pr-photo-strip-container{margin:0 calc(-1 * var(--renuvex-pr-pad-review-mobile));}
  }
  .renuvex-pr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px 0;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .renuvex-pr-photo-strip::-webkit-scrollbar{display:none;}
  /* Thumbnail geni\u015Fli\u011Fi sabit (--renuvex-pr-thumbnail-size); y\xFCksekli\u011Fi aspect-ratio
     ile gelir. --renuvex-pr-photo-thumb-aspect render.js'de review layout'a g\xF6re set
     edilir: card -> 1/1 (kare), list & gallery -> 3/4 (portre, item fotolar\u0131yla
     tutarl\u0131). Fallback 1/1, eski davran\u0131\u015F. */
  .renuvex-pr-photo-strip-thumb{flex:0 0 var(--renuvex-pr-thumbnail-size,90px);width:var(--renuvex-pr-thumbnail-size,90px);height:auto;aspect-ratio:var(--renuvex-pr-photo-thumb-aspect,1/1);border-radius:var(--renuvex-pr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease;border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.renuvex-pr-photo-strip-thumb:hover{transform:translateY(-2px);}}

  .renuvex-pr-photo-strip-wrap{position:relative;display:block;}

  .renuvex-pr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--renuvex-pr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .renuvex-pr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .renuvex-pr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;}
  /* G\xF6rsel y\xFCklenemedi\u011Finde ana <img> gizlenir, yerine bu placeholder konur.
     renuvex-pr-modal-left koyu zemini koruyor, metin n\xF6tr kal\u0131yor. */
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
  .renuvex-pr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--renuvex-pr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
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
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .renuvex-pr-modal-scroll-content > *{min-width:0;}
  .renuvex-pr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .renuvex-pr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .renuvex-pr-modal-stars .renuvex-pr-icon{width:var(--renuvex-pr-star-size,24px);height:var(--renuvex-pr-star-size,24px);}
  .renuvex-pr-modal-date{font-size:var(--renuvex-pr-review-date-size,12px);font-weight:400;color:var(--renuvex-pr-review-date,#5e5e5e);white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .renuvex-pr-modal-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-author{font-size:var(--renuvex-pr-author-size,14px);font-weight:600;font-style:normal;color:var(--renuvex-pr-review-author,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .renuvex-pr-modal-body{font-size:var(--renuvex-pr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--renuvex-pr-review-body,#111111);margin-top:var(--renuvex-pr-gap-normal);}
  .renuvex-pr-modal-reply{margin-top:var(--renuvex-pr-gap-loose);padding:12px 16px;background:var(--renuvex-pr-reply-bg-color,#f9fafb);border-radius:var(--renuvex-pr-radius,6px);border-left:3px solid var(--renuvex-pr-reply-border,#747474);}
  .renuvex-pr-modal-reply-label{font-weight:600;font-size:var(--renuvex-pr-reply-name-size,13px);color:var(--renuvex-pr-reply-label,#111111);margin-bottom:4px;overflow-wrap:anywhere;}
  .renuvex-pr-modal-reply-text{font-size:var(--renuvex-pr-reply-text-size,13px);font-weight:400;color:var(--renuvex-pr-reply-text,#111111);line-height:1.6;}

  /* Responsive */
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
  @media(max-width:600px){
    /* Mobile'da yan padding bagimsiz: summary ve review listesi ayri
       CSS degiskenleri uzerinden. Root frame padding 0 olur, her blok
       kendi yan bosluklarini verir.
       --renuvex-pr-pad-summary-mobile: summary bloklari (classic/split/compact/hero/minimal)
       --renuvex-pr-pad-review-mobile:  yorum listesi container'i (#renuvex-reviews)
       Ileride admin panelinden degistirmek icin: settings -> CSS variable. */
    #renuvex-reviews-widget{padding-left:0;padding-right:0;}
    /* Summary yan padding'i .renuvex-pr-summary mobile bloguna eklendi (--renuvex-pr-pad-summary-mobile) */
    /* Review layoutlari widget direct child \u2014 her item kendi yan padding'ini
       --renuvex-pr-pad-review-mobile uzerinden alir. #renuvex-reviews container'ina
       padding vermek yerine item class'larina vermek gerek cunku review'lar
       widget'in child'i, #renuvex-reviews icinde degil. */
    .renuvex-pr-review-card,
    .renuvex-pr-review-list,
    .renuvex-pr-review-gallery{
      padding-left:var(--renuvex-pr-pad-review-mobile);
      padding-right:var(--renuvex-pr-pad-review-mobile);
      box-sizing:border-box;
    }
    /* Yan padding --renuvex-pr-pad-summary-mobile uzerinden; top/bottom 16px sabit */
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:32px;}
    /* Widget basligi summary'nin disinda, widget direct child \u2014 kendi yan
       padding'ini ayni variable'dan alir (summary ile hizali kalsin). */
    .renuvex-pr-title{
      padding-left:var(--renuvex-pr-pad-summary-mobile);
      padding-right:var(--renuvex-pr-pad-summary-mobile);
      text-align:center;
    }
    /* Review item yan padding'i mobile'da --renuvex-pr-pad-review-mobile. Card
       (.renuvex-pr-review), list (.renuvex-pr-review-list) ve gallery (.renuvex-pr-review-gallery)
       kendi top/bottom padding'lerini koruyarak yan padding'i variable'dan alir.
       Shorthand kullanilmadigi icin her layout'un kendi kuralini ezmez. */
    .renuvex-pr-review,
    .renuvex-pr-review-list,
    .renuvex-pr-review-list.renuvex-pr-review-list--no-media,
    .renuvex-pr-review-gallery{
      padding-left:var(--renuvex-pr-pad-review-mobile);
      padding-right:var(--renuvex-pr-pad-review-mobile);
    }
    .renuvex-pr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .renuvex-pr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .renuvex-pr-gallery::-webkit-scrollbar{display:none;}
    .renuvex-pr-img{flex-shrink:0;}
  }
`;function Qt(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ie(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function ea(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function ra(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",l=ea()&&!a;if(n>0){var d=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",d+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),l&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function ta(e){var r=document.body.style,t=document.documentElement.style;ie(t,"overflow",e.rootOverflow,e.rootOverflowPriority),ie(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ie(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ie(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ie(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ie(r,"position",e.bodyPosition,e.bodyPositionPriority),ie(r,"top",e.bodyTop,e.bodyTopPriority),ie(r,"left",e.bodyLeft,e.bodyLeftPriority),ie(r,"right",e.bodyRight,e.bodyRightPriority),ie(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Qe=0,Fe=null;function mr(){return Qe+=1,Qe>1||(Fe=Qt(),ra(Fe)),Fe}function xr(){if(Qe!==0&&(Qe-=1,!(Qe>0))){var e=Fe;Fe=null,e&&ta(e)}}function fr(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function ve(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function aa(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Fr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(aa)}function er(e,r){var t=e,n=Fr(e);!n.length&&r&&(t=r,n=Fr(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;ve(a)}function gr(e,r,t){if(e.key==="Tab"){var n=Fr(r);if(!n.length){e.preventDefault(),er(r);return}var a=n[0],l=n[n.length-1],d=wt(t);if(!r.contains(d)){e.preventDefault(),ve(a);return}e.shiftKey&&d===a?(e.preventDefault(),ve(l)):!e.shiftKey&&d===l&&(e.preventDefault(),ve(a))}}var zt="renuvexPrOverlay";function hr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[zt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function na(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[zt]===e.id)}function br(e){if(na(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Oe(e){return ge(e)}function Ct(e,r,t,n,a){xr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&lr(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),ve(a)}function ia(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=ue(e.rating,A);var l=document.createElement("span");l.className="renuvex-pr-modal-date",l.textContent=se(e.createdAt),n.appendChild(a),n.appendChild(l),t.appendChild(n);var d=document.createElement("div");d.className="renuvex-pr-modal-title",d.textContent=e.title||"",d.style.display=e.title?"":"none",t.appendChild(d);var o=document.createElement("div");o.className="renuvex-pr-modal-author",o.textContent=e.author||"",t.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(s);var v=document.createElement("div");v.className="renuvex-pr-modal-reply";var f=document.createElement("div");f.className="renuvex-pr-modal-reply-label",f.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="renuvex-pr-modal-reply-text",c.textContent=e.merchantReply||"",v.appendChild(f),v.appendChild(c),v.style.display=e.merchantReply?"":"none",t.appendChild(v),r.appendChild(t),r}function St(e,r,t){var n=t||A,a=e.querySelector(".renuvex-pr-modal-scroll-content"),l=a.querySelector(".renuvex-pr-modal-stars");l.innerHTML=ue(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=se(r.createdAt);var d=a.querySelector(".renuvex-pr-modal-title");d.textContent=r.title||"",d.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var o=a.querySelector(".renuvex-pr-modal-body");o.textContent=(r.comment||"").trim(),o.style.display=r.comment&&r.comment.trim()?"":"none";var s=a.querySelector(".renuvex-pr-modal-reply");s.querySelector(".renuvex-pr-modal-reply-label").textContent=n&&n.merchantReplyLabel||"Ma\u011Faza Sahibi",s.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",s.style.display=r.merchantReply?"":"none",e.scrollTop=0}function _r(e,r,t,n,a,l,d,o,s){var v=Oe(e),f=Math.max(0,Math.min(t||0,v.length-1)),c=document.createElement("div");c.className="renuvex-pr-modal-left";var i=document.createElement("img"),w=d==="next"?"renuvex-pr-modal-img-enter-right":d==="prev"?"renuvex-pr-modal-img-enter-left":"";i.className="renuvex-pr-modal-main-img"+(w?" "+w:""),i.src=Ir(v[f]||""),i.decoding="async",i.width=Br,i.height=Math.round(Br*4/3),i.alt="Yorum foto\u011Fraf\u0131",ft(i,function(N){if(N.style.display="none",!c.querySelector(".renuvex-pr-modal-img-error")){var S=document.createElement("div");S.className="renuvex-pr-modal-img-error",S.setAttribute("role","status"),S.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",c.insertBefore(S,N)}}),c.appendChild(i);var p=document.createElement("button");p.className="renuvex-pr-modal-close-mobile";var u=Z(Ce);u&&p.appendChild(u),p.setAttribute("aria-label","Kapat"),p.onclick=function(N){N.stopPropagation(),l()},c.appendChild(p);var g=0;if(c.addEventListener("touchstart",function(N){g=N.touches[0].clientX},{passive:!0}),c.addEventListener("touchend",function(N){var S=g-N.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(k)ce(e,r,f+1,n,a,l,!0,"next",o,s);else if(y){var T=n[r+1];ce(T,r+1,0,n,a,l,!1,"next",o,s)}}else if(m)ce(e,r,f-1,n,a,l,!0,"prev",o,s);else if(h){var I=n[r-1],L=Oe(I);ce(I,r-1,L.length-1,n,a,l,!1,"prev",o,s)}}},{passive:!0}),v.length>1){var b=document.createElement("div");b.className="renuvex-pr-modal-thumbs",v.forEach(function(N,S){var T=document.createElement("img"),I=ae(N,sr);T.src=I.src,T.srcset=I.srcset,T.loading="lazy",T.decoding="async",T.width=sr,T.height=sr,T.className="renuvex-pr-modal-thumb"+(S===f?" renuvex-pr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(S+1),ne(T),T.tabIndex=0,T.setAttribute("role","button"),T.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(S+1)+" se\xE7"),S===f&&T.setAttribute("aria-current","true"),(function(L){function U(){ce(e,r,L,n,a,l,!0,null,o,s)}T.onclick=U,T.onkeydown=function(G){(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),U())}})(S),b.appendChild(T)}),c.appendChild(b)}var m=f>0,k=f<v.length-1,h=r>0,y=r<n.length-1,z=m||h,x=k||y;if(z){var C=document.createElement("button");C.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var P=Z(Re);P&&C.appendChild(P),C.setAttribute("aria-label","\xD6nceki"),C.onclick=function(N){if(N.stopPropagation(),m)ce(e,r,f-1,n,a,l,!0,"prev",o,s);else if(h){var S=n[r-1],T=Oe(S);ce(S,r-1,T.length-1,n,a,l,!1,"prev",o,s)}},c.appendChild(C)}if(x){var E=document.createElement("button");E.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var R=Z(pr);R&&E.appendChild(R),E.setAttribute("aria-label","Sonraki"),E.onclick=function(N){if(N.stopPropagation(),k)ce(e,r,f+1,n,a,l,!0,"next",o,s);else if(y){var S=n[r+1];ce(S,r+1,0,n,a,l,!1,"next",o,s)}},c.appendChild(E)}return c}function Et(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Oe(n);a[0]&&(new Image().src=Ir(a[0]))}})}function Or(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function oa(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function l(){Or(t),Or(n),Or(a)}l(),t&&ve(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){l(),requestAnimationFrame(l)}):setTimeout(l,0)}function ce(e,r,t,n,a,l,d,o,s,v){if(v&&(v.currentReview=e),d){var f=_r(e,r,t,n,a,l,o,s,v);a.firstChild&&a.replaceChild(f,a.firstChild)}else{var f=_r(e,r,t,n,a,l,o,s,v),c=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&a.replaceChild(f,a.firstChild),c&&St(c,e,v&&v.currentSettings),oa(s,a)}Et(r,n)}function oe(e,r,t){var n=Oe(e);if(!n.length)return;var a=(t||[]).filter(function(x){return Oe(x).length>0}),l=a.findIndex(function(x){return x===e||x.id===e.id});l===-1&&(a.unshift(e),l=0);var d=n.indexOf(r);d<0&&(d=0);var o=document.createElement("div");o.className="renuvex-pr-modal-overlay";var s=document.createElement("div");s.className="renuvex-pr-modal";var v=!1,f=null,c=fr(),i=mr(),w=hr(),p={currentReview:e,currentSettings:A},u=null;function g(x){var C=x&&x.detail&&x.detail.settings;if(!(C&&C===u)){u=C||null,p.currentSettings=C||A;var P=s.querySelector(".renuvex-pr-modal-right");!P||!p.currentReview||St(P,p.currentReview,p.currentSettings)}}function b(){v||(v=!0,window.removeEventListener(Se,g),Ct(f&&f.host,m,b,i,c))}function m(x){if(x.key==="Escape"){k();return}gr(x,o,f&&f.root)}function k(){v||(v=!0,window.removeEventListener(Se,g),Ct(f&&f.host,m,b,i,c),br(w))}document.addEventListener("keydown",m),window.addEventListener("popstate",b),window.addEventListener(Se,g),o.onclick=function(){k()},s.onclick=function(x){x.stopPropagation()},s.appendChild(_r(e,l,d,a,s,k,null,o,p)),s.appendChild(ia(e)),Et(l,a);var h=document.createElement("div");h.className="renuvex-pr-modal-wrap",h.tabIndex=-1,h.setAttribute("role","dialog"),h.setAttribute("aria-modal","true"),h.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),h.appendChild(s);var y=document.createElement("button");y.className="renuvex-pr-modal-close";var z=Z(Ce);z&&y.appendChild(z),y.setAttribute("aria-label","Kapat"),y.onclick=function(x){x.stopPropagation(),k()},h.appendChild(y),o.appendChild(h),f=vr(),Me(f.root,Ie+Ae+cr),f.root.appendChild(o),ze(f.root),er(o)}var Dr={};xe(Dr,{meta:()=>ma,render:()=>xa});function _e(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,l=e.onFilterChange;fe(n);var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var o=5;o>=1;o--){var s=r[o-1]||0,v=t>0?Math.round(s/t*100):0,f=a===o,c=document.createElement("div");c.className="renuvex-pr-bar-row"+(f?" renuvex-pr-bar-active":""),a&&!f&&(c.style.opacity="0.35");for(var i="",w=1;w<=5;w++){var p=w<=o;i+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(p?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+J(p?"full":"outline")+"</span>"}c.innerHTML='<span class="renuvex-pr-bar-label">'+i+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+v+'%;"></div></div><span class="renuvex-pr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(u){c.onclick=function(){l(u)}})(o),d.appendChild(c)}return d}var le=[],Tt=!1,yr=!1;function At(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function la(e){if(yr){yr=!1,e.preventDefault(),e.stopPropagation();return}for(var r=!1,t=le.length-1;t>=0;t--){var n=le[t];At(e,n.trigger)||At(e,n.element)||n.close()&&(r=!0)}r&&(e.preventDefault(),e.stopPropagation())}function pa(e){if(e.key==="Escape")for(var r=le.length-1;r>=0;r--)le[r].close()}function da(){Tt||typeof document=="undefined"||(document.addEventListener("click",la,!0),document.addEventListener("keydown",pa),Tt=!0)}function wr(e){for(var r=0;r<le.length;r++)le[r]!==e&&le[r].close()}function Lt(){yr=!0,typeof setTimeout=="function"&&setTimeout(function(){yr=!1},700)}function kr(e){da();var r={trigger:e.trigger,element:e.element,close:e.close};return le.push(r),function(){var n=le.indexOf(r);n!==-1&&le.splice(n,1)}}function Q(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,l=e.onSortChange,d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var o=document.createElement("button");o.className="renuvex-pr-write-btn",o.textContent=A&&A.writeButtonText||"Yorum Yap",o.onclick=a,d.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-filter-wrap";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-filter-btn",v.setAttribute("aria-label","Filtrele"),v.setAttribute("aria-haspopup","menu"),v.setAttribute("aria-expanded","false");var f=A&&A.filterIcon||"lines";v.innerHTML=de(dt(f));var c=document.createElement("div");c.className="renuvex-pr-filter-menu",c.setAttribute("role","menu");var i=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],w=!1;function p(b){var m=c.classList.contains("renuvex-pr-open");c.classList.remove("renuvex-pr-open"),v.classList.remove("renuvex-pr-filter-btn-active"),v.setAttribute("aria-expanded","false");var k=b&&(b.restoreFocus===!0||b.restoreFocus==="auto"&&ar());if(m&&k)try{v.focus({preventScroll:!0})}catch(h){try{v.focus()}catch(y){}}return m}function u(){wr(g),c.classList.add("renuvex-pr-open"),v.classList.add("renuvex-pr-filter-btn-active"),v.setAttribute("aria-expanded","true");var b=c.querySelector(".renuvex-pr-filter-item-active")||c.querySelector(".renuvex-pr-filter-item");b&&requestAnimationFrame(function(){try{b.focus({preventScroll:!0})}catch(m){try{b.focus()}catch(k){}}})}i.forEach(function(b){var m=b[2],k=m?n:!n&&(t||"newest")===b[0],h=document.createElement("button");h.type="button",h.className="renuvex-pr-filter-item"+(k?" renuvex-pr-filter-item-active":""),h.setAttribute("role","menuitem"),h.textContent=b[1];var y=!1;function z(x,C){x&&(x.preventDefault(),x.stopPropagation()),!y&&(y=!0,w=!0,C!==!0&&Lt(),p({restoreFocus:C}),l(b[0],m),setTimeout(function(){y=!1,w=!1},0))}h.addEventListener("pointerdown",function(x){x.button!==void 0&&x.button!==0||z(x,!1)}),typeof window!="undefined"&&!window.PointerEvent&&h.addEventListener("touchstart",function(x){z(x,!1)},{passive:!1}),h.addEventListener("mousedown",function(x){x.button!==void 0&&x.button!==0||z(x,!1)}),h.addEventListener("keydown",function(x){(x.key==="Enter"||x.key===" ")&&z(x,!0)}),h.onclick=function(x){z(x,!1)},c.appendChild(h)}),v.onclick=function(){c.classList.contains("renuvex-pr-open")?p({restoreFocus:"auto"}):u()},s.addEventListener("keydown",function(b){b.key==="Escape"&&c.classList.contains("renuvex-pr-open")&&(b.stopPropagation(),p({restoreFocus:!0}))}),s.addEventListener("focusout",function(b){if(c.classList.contains("renuvex-pr-open")&&!w){var m=b.relatedTarget;m&&s.contains(m)||p()}});var g=kr({trigger:s,element:c,close:p});return s.appendChild(v),s.appendChild(c),d.appendChild(s),d}var Nt=`
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

    /* Footer butonlar\u0131 altta, do\u011Fal yerde. Geri = sadece "Geri" yaz\u0131s\u0131,
       ok ikonu gizli. Atla zaten yaz\u0131+ok (desktop ile ayn\u0131).
       Grid kolonlar\u0131 mobile'da auto/1fr/auto: yan kolonlar buton kadar,
       orta esnek. */
    .renuvex-pr-fwizard-footer{
      padding:20px;
      min-height:80px;
      grid-template-columns:auto 1fr auto;
    }
    .renuvex-pr-fwizard-footer-back > svg{
      display:none;
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
`;function Pt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="renuvex-pr-fwizard",n.appendChild(a);var l=document.createElement("button");l.className="renuvex-pr-fwizard-close",l.type="button",l.setAttribute("aria-label","Kapat");var d=Z(Ce);d&&l.appendChild(d),a.appendChild(l);var o=document.createElement("div");o.className="renuvex-pr-fwizard-content",a.appendChild(o);var s=!1,v=null,f=null,c=!1;function i(){er(o,n)}function w(y){gr(y,n,v&&v.root)}function p(){s||(s=!0,document.removeEventListener("keydown",u),n.removeEventListener("click",g),l.removeEventListener("click",p),n.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){v?(lr(v.root),v.host&&v.host.parentNode&&v.host.parentNode.removeChild(v.host)):n.parentNode&&n.parentNode.removeChild(n),xr(),c&&ve(f);try{r()}catch(y){}},200))}function u(y){if(y.key==="Escape"){p();return}w(y)}function g(y){y.target===n&&t&&p()}document.addEventListener("keydown",u),n.addEventListener("click",g),l.addEventListener("click",p);function b(y){f=fr(),c=ar(),y&&o.appendChild(y),v=vr(),Me(v.root,Ie+Ae+Nt),v.root.appendChild(n),ze(v.root),mr(),requestAnimationFrame(function(){n.classList.add("renuvex-pr-fwizard-open"),i()})}var m=null,k=null;function h(y,z){if(z=z||"error",m){try{m.remove()}catch(x){}m=null}k&&(clearTimeout(k),k=null),m=document.createElement("div"),m.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+z,m.textContent=y,a.appendChild(m),k=setTimeout(function(){m&&(m.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(m){try{m.remove()}catch(x){}m=null}},300))},4e3)}return{open:b,close:p,content:o,setAllowOutsideClose:function(y){t=!!y},setStepAttr:function(y){a.setAttribute("data-step",String(y))},focusFirstControl:i,showToast:h}}var Hr=4;function He(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Rt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(l){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<Hr&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(l){return l!==a})}}}}function Bt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},l=e.onNext||function(){},d=document.createElement("div");d.className="renuvex-pr-fwizard-footer";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",o.setAttribute("aria-label","Geri"),o.innerHTML=de(Re)+"<span>Geri</span>",o.addEventListener("click",function(){n()}),d.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-fwizard-footer-progress";for(var v=[],f=0;f<Hr;f++){var c=document.createElement("span");c.className="renuvex-pr-fwizard-progress-seg",s.appendChild(c),v.push(c)}d.appendChild(s);var i=document.createElement("button");i.type="button";var w=null;function p(g){w&&i.removeEventListener("click",w),w=g,g&&i.addEventListener("click",g)}d.appendChild(i);function u(g,b){var m=r.indexOf(g)!==-1,k=t.indexOf(g)!==-1,h=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0);if(m)g===2&&h?(i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",p(function(){l()})):(i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.setAttribute("aria-label","Atla"),i.innerHTML="<span>Atla</span>",p(function(){a()})),i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),i.style.visibility="",i.tabIndex=0;else if(k){i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Sonraki"),i.innerHTML="Sonraki",i.style.visibility="",i.tabIndex=0;var y=He(g,b);i.disabled=!y,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!y),p(function(){i.disabled||l()})}else i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.innerHTML="",i.style.visibility="hidden",i.tabIndex=-1,i.disabled=!0,p(null)}return{el:d,update:function(g,b){v.forEach(function(k,h){h+1<=g?k.classList.add("renuvex-pr-fwizard-progress-seg-active"):k.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var m=g<=1;o.style.visibility=m?"hidden":"",o.style.pointerEvents=m?"none":"",o.tabIndex=m?-1:0,u(g,b)},setNextDisabled:function(g){i.classList.contains("renuvex-pr-fwizard-cta-btn")&&(i.disabled=!!g,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!g))},setThanksState:function(g){o.style.visibility="hidden",s.style.visibility="hidden",i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",i.style.visibility="",i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),p(g)}}}function It(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title",l.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-stars",d.setAttribute("role","radiogroup"),d.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var o=Je(A||{});fe(o);var s=[];function v(p){s.forEach(function(u,g){var b=g<p;u.classList.toggle("renuvex-pr-fwizard-star-active",b),u.setAttribute("aria-checked",g+1===p?"true":"false"),u.innerHTML=b?J("full"):J("outline")})}function f(p,u){u&&typeof u.preventDefault=="function"&&u.preventDefault(),u&&typeof u.stopPropagation=="function"&&u.stopPropagation(),!n&&(n=!0,e.set({rating:p}),v(p),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var c=1;c<=5;c++)(function(p){var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-star",u.setAttribute("role","radio"),u.setAttribute("aria-label",p+" y\u0131ld\u0131z"),u.innerHTML=J("outline"),u.addEventListener("mouseenter",function(){v(p)}),u.addEventListener("mouseleave",function(){v(e.get().rating)}),u.addEventListener("pointerdown",function(g){g.button&&g.button!==0||f(p,g)}),typeof window!="undefined"&&!window.PointerEvent&&u.addEventListener("touchstart",function(g){f(p,g)},{passive:!1}),u.addEventListener("mousedown",function(g){window.PointerEvent||f(p,g)}),u.addEventListener("keydown",function(g){(g.key==="Enter"||g.key===" ")&&f(p,g)}),u.addEventListener("click",function(g){f(p,g)}),s.push(u),d.appendChild(u)})(c);v(e.get().rating);var i=null,w=function(p){var u=p&&p.detail&&p.detail.settings;u&&u===i||(i=u||null,o=Je(u||A||{}),v(e.get().rating))};return window.addEventListener(Se,w),t.appendChild(d),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Se,w)}}}var Mt=3,ua=10*1024*1024;function Ft(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-subtitle",l.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-photo-card";var o=document.createElement("button");o.type="button",o.className="renuvex-pr-fwizard-photo-add",o.setAttribute("aria-label","Foto\u011Fraf ekle");var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",d.appendChild(o),d.appendChild(s);var v=document.createElement("div");v.className="renuvex-pr-fwizard-photo-previews",v.setAttribute("aria-live","polite"),d.appendChild(v),n.appendChild(d);var f=r.blobMap||{},c=r.urlToFinger||{};function i(){if(!t){var b=e.get().images||[],m=e.get().pendingImages||[],k=b.map(function(h){return{url:h,isPending:!1}}).concat(m.map(function(h){return{url:h.url,file:h.file,isPending:!0,error:h.error}}));v.innerHTML="",k.forEach(function(h){var y=f[h.url]||h.url,z=w(h,y);v.appendChild(z)}),u()}}function w(b,m){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var h=document.createElement("img");h.src=m,h.alt="",h.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(h);var y=document.createElement("div");y.className="renuvex-pr-fwizard-photo-loading",y.style.display="none",k.appendChild(y);var z=document.createElement("button");z.type="button",z.className="renuvex-pr-fwizard-photo-remove",z.setAttribute("aria-label","Kald\u0131r");var x=Z(Ce);return x&&z.appendChild(x),k.appendChild(z),p(k,b,m),k}function p(b,m,k){var h=b.querySelector("img");h.src!==k&&(h.src=k);var y=b.querySelector(".renuvex-pr-fwizard-photo-loading");if(m.isPending&&m.error){y.style.display="flex",y.textContent="";var z=document.createElement("span");z.className="renuvex-pr-upload-error",z.textContent="\u2717 "+m.error,y.appendChild(z)}else y.style.display="none",y.textContent="";var x=b.querySelector(".renuvex-pr-fwizard-photo-remove");x.onclick=function(){var C=c[m.url]||(m.file?m.file.name+"_"+m.file.size:null);if(m.url.startsWith("blob:")&&URL.revokeObjectURL(m.url),C){var P=(e.get().fingerprints||[]).filter(function(N){return N!==C});e.set({fingerprints:P})}if(m.isPending){var E=(e.get().pendingImages||[]).filter(function(N){return N.url!==m.url});e.set({pendingImages:E})}else{var R=(e.get().images||[]).filter(function(N){return N!==m.url});e.set({images:R})}}}function u(){var b=(e.get().images||[]).length,m=(e.get().pendingImages||[]).length,k=b+m,h=k>=Mt;k>0?(d.classList.add("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=de(vt)):(d.classList.remove("renuvex-pr-fwizard-photo-card--compact"),o.innerHTML=de(st)+"<span>Foto\u011Fraf Ekle</span>"),h?(o.style.display="none",o.disabled=!0,s.disabled=!0):(o.style.display="flex",o.disabled=!1,s.disabled=!1,o.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}o.addEventListener("click",function(){s.disabled||s.click()}),s.onchange=async function(b){var m=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(b.target.files).slice(0,Mt-m);s.value="";var h=(e.get().pendingImages||[]).length,y=e.get().images||[],z=y.length;if(k.length!==0){for(var x=[],C=[],P=0;P<k.length;P++){var E=k[P],R=E.name+"_"+E.size,N=(e.get().fingerprints||[]).some(function(O){return O===R})||x.some(function(O){return O.file.name+"_"+O.file.size===R});if(N){console.log("[renuvex-pr] Duplicate file detected, skipping:",E.name);continue}if(E.size>ua){var S="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(S,"error"):alert(S);continue}var T=URL.createObjectURL(E);c[T]=R,x.push({url:T,file:E,error:null}),C.push({url:T,file:E});var I=(e.get().fingerprints||[]).slice();I.push(R),e.set({fingerprints:I})}if(x.length!==0){var L=(e.get().pendingImages||[]).concat(x),U=async function(){for(var O=0;O<C.length;O++){var _=C[O],W=_.file,q=_.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var je=(e.get().pendingImages||[]).filter(function(H){return H.url!==q}),Te=(e.get().images||[]).slice();Te.push(q),e.set({pendingImages:je,images:Te});continue}try{var he=await Ze(Xe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe})});if(!he.ok)throw he.status===429?new Error("rate_limit"):new Error("sign failed");var D=await he.json();if(!D.folder)throw new Error("sign folder missing");var j=new FormData;j.append("file",W),j.append("api_key",D.api_key),j.append("timestamp",D.timestamp),j.append("signature",D.signature),j.append("folder",D.folder);var pe=await fetch("https://api.cloudinary.com/v1_1/"+D.cloud_name+"/image/upload",{method:"POST",body:j}),ee=await pe.json();if(ee.secure_url&&xt(ee.secure_url)){var be=(e.get().pendingImages||[]).some(function(H){return H.url===q});if(!be){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}f[ee.secure_url]=q,c[ee.secure_url]=c[q];var Ve=(e.get().pendingImages||[]).filter(function(H){return H.url!==q}),re=(e.get().images||[]).slice();re.push(ee.secure_url),e.set({pendingImages:Ve,images:re});try{Ze(Xe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,secureUrl:ee.secure_url})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[renuvex-pr] Image upload failed:",H);var ye=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ye,"error");var Ue=(e.get().pendingImages||[]).map(function(X){return X.url===q?{url:X.url,file:X.file,error:ye}:X});e.set({pendingImages:Ue})}}};if(z===0&&h===0){t=!0;var G=!r.canNavigate||r.canNavigate();G&&e.goNext()}e.set({pendingImages:L}),U()}}};var g=e.onChange(i);return i(),{el:n,destroy:function(){t=!0,s.onchange=null,g&&g()}}}var Yr=2e3,sa=60;function Ot(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",n.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content-form";var d=document.createElement("input");d.type="text",d.className="renuvex-pr-fwizard-input",d.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",d.maxLength=sa,d.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),d.value=e.get().title||"",d.addEventListener("input",function(){e.set({title:d.value})}),l.appendChild(d);var o=document.createElement("textarea");o.className="renuvex-pr-fwizard-textarea",o.placeholder="Deneyiminizi anlat\u0131n\u2026",o.maxLength=Yr,o.rows=6,o.setAttribute("aria-label","Yorum"),o.value=e.get().comment||"",l.appendChild(o);var s=document.createElement("div");s.className="renuvex-pr-fwizard-char-counter",s.setAttribute("aria-live","polite"),l.appendChild(s);function v(){var c=o.value.length;s.textContent=c+"/"+Yr,s.classList.toggle("renuvex-pr-fwizard-char-counter--max",c>=Yr)}function f(){return He(3,e.get())}return o.addEventListener("input",function(){e.set({comment:o.value}),v(),t(f())}),n.appendChild(l),v(),setTimeout(function(){t(f())},0),{el:n,destroy:function(){}}}var va=40;function _t(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",l.textContent="Hakk\u0131n\u0131zda",a.appendChild(l);var d=document.createElement("div");d.className="renuvex-pr-fwizard-author-form";var o=document.createElement("div");o.className="renuvex-pr-fwizard-field";var s=document.createElement("label");s.className="renuvex-pr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var v=document.createElement("input");v.type="text",v.className="renuvex-pr-fwizard-input",v.maxLength=va,v.setAttribute("aria-required","true"),v.value=e.get().author||"",o.appendChild(s),o.appendChild(v),d.appendChild(o);var f=document.createElement("div");f.className="renuvex-pr-fwizard-field";var c=document.createElement("label");c.className="renuvex-pr-fwizard-label",c.textContent="E-posta (opsiyonel)";var i=document.createElement("input");i.type="email",i.className="renuvex-pr-fwizard-input",i.setAttribute("autocomplete","email"),i.value=e.get().email||"",f.appendChild(c),f.appendChild(i),d.appendChild(f);var w=document.createElement("div");w.className="renuvex-pr-fwizard-notice",w.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",d.appendChild(w);var p=document.createElement("div");p.className="renuvex-pr-fwizard-msg",p.setAttribute("role","alert"),p.setAttribute("aria-live","assertive"),d.appendChild(p);var u=document.createElement("button");u.type="button",u.className="renuvex-pr-fwizard-submit-btn",u.textContent="G\xF6nder",d.appendChild(u),a.appendChild(d);function g(){return He(4,e.get())}function b(){var y=!g(),z=(e.get().pendingImages||[]).length,x=z>0;x?(u.disabled=!0,u.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),u.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(u.disabled=y,u.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",y),u.textContent="G\xF6nder")}v.addEventListener("input",function(){e.set({author:v.value}),b(),t(g())}),i.addEventListener("input",function(){e.set({email:i.value})}),b(),setTimeout(function(){t(g())},0);function m(){p.textContent=""}function k(y){m();var z=document.createElement("div");z.className="renuvex-pr-fwizard-msg-error",z.textContent=y||"",p.appendChild(z)}u.onclick=async function(){if(!u.disabled){var y=e.get(),z=(y.author||"").trim(),x=(y.comment||"").trim();if(i.value.trim()&&!i.checkValidity()){i.reportValidity();return}if(!z){k("Gerekli alan");return}if(!y.rating){k("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}u.disabled=!0,u.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var C=u.textContent;if(u.textContent="G\xF6nderiliyor\u2026",m(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var P=ct(window.location.href),E=y.productName||null,R=await Ze(Xe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,productId:y.productId||null,slug:P||null,productName:E,author:z,title:(y.title||"").trim()||null,comment:x||null,rating:y.rating,images:y.images||[]})},15e3);if(R.ok)n();else{var N=await R.json().catch(function(){return{}});throw new Error(N.error||"Yorum kaydedilemedi.")}}catch(I){var S=I&&(I.name==="AbortError"||/signal/i.test(I.message||"")),T=S?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":I.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(T,"error"):k(T),u.disabled=!1,u.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),u.textContent=C}}};var h=e.onChange(b);return{el:a,destroy:function(){u.onclick=null,h&&h()}}}function ca(e,r,t){if(t=t||{},e===1)return It(r,{canNavigate:t.canNavigate});if(e===2)return Ft(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return Ot(r,{onValidityChange:t.onValidityChange});if(e===4)return _t(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function Ht(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Yt(e){e=e||{};var r=Rt({productId:e.productId,productName:e.productName}),t={},n={},a=Pt({onClose:function(){window.removeEventListener("popstate",d),br(l),Object.keys(t).forEach(function(z){var x=t[z];x&&x.startsWith("blob:")&&URL.revokeObjectURL(x)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),l=hr(),d=function(z){a&&a.close&&a.close()};window.addEventListener("popstate",d);var o=document.createElement("div");o.className="renuvex-pr-fwizard-step-wrap";var s=Bt({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),v=document.createElement("div");v.className="renuvex-pr-fwizard-layout",v.appendChild(o),v.appendChild(s.el);var f=null,c="idle",i=null,w=!0,p=null;function u(z,x){o.innerHTML="";var C=ca(z,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(R){s.setNextDisabled(!R)},onSuccess:b,showToast:a.showToast});if(f=C,s.update(z,r.get()),x){c="entering",C.el.classList.add("renuvex-pr-fwizard-step--enter");var P=null,E=function(){P&&clearTimeout(P),C.el.removeEventListener("animationend",E),C.el.classList.remove("renuvex-pr-fwizard-step--enter"),c="idle",i!==null&&m()};C.el.addEventListener("animationend",E),P=setTimeout(E,700)}else c="idle";o.appendChild(C.el),a.setStepAttr&&a.setStepAttr(z),z===3&&s.setNextDisabled(!0)}var g=!1;function b(){if(!g){if(g=!0,!f){o.innerHTML="";var z=Ht();z.classList.add("renuvex-pr-fwizard-step--enter"),o.appendChild(z),a.setStepAttr("thanks"),s.setThanksState(a.close);return}var x=f;c="exiting",x.el.classList.add("renuvex-pr-fwizard-step--exit");var C=function(){if(p&&clearTimeout(p),x.el.removeEventListener("animationend",C),x.destroy)try{x.destroy()}catch(E){}f===x&&(f=null),o.innerHTML="";var P=Ht();P.classList.add("renuvex-pr-fwizard-step--enter"),o.appendChild(P),a.setStepAttr("thanks"),s.setThanksState(a.close),c="idle"};x.el.addEventListener("animationend",C),p=setTimeout(C,300)}}function m(){var z=r.get().currentStep;if(c!=="idle"){i=z;return}if(!f){var x=!w;w=!1,u(z,x);return}var C=f;c="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var P=function(){if(p&&clearTimeout(p),C.el.removeEventListener("animationend",P),C.destroy)try{C.destroy()}catch(R){}if(f===C){o.innerHTML="",f=null;var E=i!==null?i:r.get().currentStep;i=null,u(E,!0),c="idle"}};C.el.addEventListener("animationend",P),p=setTimeout(P,350)}m();var k=r.get().currentStep,h=r.onChange(function(z){z.currentStep!==k?(k=z.currentStep,m()):s.update(z.currentStep,z)}),y=a.close;return a.close=function(){h&&h(),typeof p!="undefined"&&p&&clearTimeout(p),y()},a.open(v),{close:a.close}}function Y(){Yt({productId:te||"",productName:Pe||""})}var ma={id:"classic",name:"Klasik (A\xE7\u0131k)"};function xa(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,l=e.allCount,d=e.ratingCounts,o=e.avgRatingVal,s=e.currentRatingFilter,v=e.currentOrderBy,f=e.currentHasImages,c=e.onFilterChange,i=e.onSortChange;fe(a);var w=document.createElement("div");w.className="renuvex-pr-summary";var p=(d[3]||0)+(d[4]||0),u=l>0?Math.round(p/l*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-avg",g.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+J("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",w.appendChild(g);var b=document.createElement("div");if(b.className="renuvex-pr-summary-block renuvex-pr-summary-count",b.textContent=l.toLocaleString("tr-TR")+" Yorum",w.appendChild(b),n.showRecommendation!==!1&&u>0){var m=document.createElement("div");m.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",m.innerHTML='<span class="renuvex-pr-recommend-pct">%'+u+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",w.appendChild(m)}return w.appendChild(_e({ratingCounts:d,allCount:l,iconPair:a,currentRatingFilter:s,onFilterChange:c})),w.appendChild(Q({widget:r,currentOrderBy:v,currentHasImages:f,onWriteClick:Y,onSortChange:i})),w}var jr={};xe(jr,{css:()=>ga,meta:()=>fa,render:()=>ha});var Dt=`
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
`;var fa={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},ga=Dt;function ha(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,l=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,v=e.currentHasImages,f=e.onFilterChange,c=e.onSortChange,i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-compact";var w=document.createElement("div");w.className="renuvex-pr-compact-header";var p=document.createElement("div");p.className="renuvex-pr-compact-trigger-wrap";var u=document.createElement("button");u.className="renuvex-pr-compact-trigger",u.type="button",u.setAttribute("aria-expanded","false"),u.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Be(d,n)+'</span><span class="renuvex-pr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+de(ut)+"</span>",p.appendChild(u),w.appendChild(p);var g=Q({widget:r,currentOrderBy:s,currentHasImages:v,onWriteClick:Y,onSortChange:c}),b=g.querySelector(".renuvex-pr-filter-wrap"),m=g.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");k.className="renuvex-pr-compact-actions-slot",m&&k.appendChild(m),b&&k.appendChild(b),w.appendChild(k),i.appendChild(w);var h=document.createElement("div");h.className="renuvex-pr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var y=document.createElement("div");y.className="renuvex-pr-compact-panel-inner";var z=document.createElement("div");z.className="renuvex-pr-compact-avg",z.innerHTML='<span class="renuvex-pr-icon">'+J("full")+"</span><span>"+d+"</span>",y.appendChild(z),y.appendChild(_e({ratingCounts:l,allCount:a,iconPair:n,currentRatingFilter:o,onFilterChange:f})),h.appendChild(y);var x=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function C(_){var W=_?i:p;h.parentNode!==W&&(h.classList.contains("renuvex-pr-open")&&(h.classList.remove("renuvex-pr-open"),h.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")),W.appendChild(h))}if(C(x?x.matches:!1),x){var P=function(_){C(_.matches)};x.addEventListener?x.addEventListener("change",P):x.addListener&&x.addListener(P)}if(m){var E=document.createElement("button");E.className="renuvex-pr-write-btn",E.textContent=A&&A.writeButtonText||"Yorum Yap",E.onclick=Y;var R=document.createElement("div");R.className="renuvex-pr-compact-write-row",R.appendChild(E),i.appendChild(R)}function N(){h.classList.remove("renuvex-pr-open"),h.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")}function S(){wr(T),h.classList.add("renuvex-pr-open"),h.setAttribute("aria-hidden","false"),u.setAttribute("aria-expanded","true")}u.onclick=function(){h.classList.contains("renuvex-pr-open")?N():S()};var T=null;function I(_){T&&(T(),T=null),_||(T=kr({trigger:p,element:h,close:N}))}if(I(x?x.matches:!1),x){var L=function(_){I(_.matches)};x.addEventListener?x.addEventListener("change",L):x.addListener&&x.addListener(L)}if(t.showRecommendation!==!1){var U=(l[3]||0)+(l[4]||0),G=a>0?Math.round(U/a*100):0;if(G>0){var O=document.createElement("div");O.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",O.style.marginTop="8px",O.innerHTML='<span class="renuvex-pr-recommend-pct">%'+G+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",y.appendChild(O)}}return i}var Vr={};xe(Vr,{css:()=>ya,meta:()=>ba,render:()=>wa});var jt=`
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
`;var ba={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},ya=jt;function wa(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,l=e.ratingCounts,d=e.avgRatingVal,o=e.currentRatingFilter,s=e.currentOrderBy,v=e.currentHasImages,f=e.onFilterChange,c=e.onSortChange;fe(n);var i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-split";var w=document.createElement("div");w.className="renuvex-pr-split-col renuvex-pr-split-left";var p=document.createElement("div");p.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",p.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+J("full")+'</span><span class="renuvex-pr-avg-num">'+d+"</span>",w.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",u.textContent=a.toLocaleString("tr-TR")+" Yorum",w.appendChild(u),i.appendChild(w);var g=document.createElement("div");g.className="renuvex-pr-split-col renuvex-pr-split-mid",g.appendChild(_e({ratingCounts:l,allCount:a,iconPair:n,currentRatingFilter:o,onFilterChange:f})),i.appendChild(g);var b=Q({widget:r,currentOrderBy:s,currentHasImages:v,onWriteClick:Y,onSortChange:c}),m=b.querySelector(".renuvex-pr-filter-wrap"),k=b.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");h.className="renuvex-pr-split-col renuvex-pr-split-right",k&&h.appendChild(k),m&&h.appendChild(m),i.appendChild(h);var y=(l[3]||0)+(l[4]||0),z=a>0?Math.round(y/a*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",x.innerHTML='<span class="renuvex-pr-recommend-pct">%'+z+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var C=t.showRecommendation===!1||z===0;return C&&x.classList.add("renuvex-pr-split-rec-hidden"),w.appendChild(x),i}var Ur={};xe(Ur,{css:()=>za,meta:()=>ka,render:()=>Ca});var Vt=`
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
`;var ka={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},za=Vt;function Ca(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,l=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-minimal";var v=document.createElement("div");v.className="renuvex-pr-minimal-info";var f=document.createElement("div");f.className="renuvex-pr-minimal-row";var c=document.createElement("span");c.className="renuvex-pr-minimal-avg",c.textContent=a,f.appendChild(c);var i=document.createElement("span");i.className="renuvex-pr-minimal-stars",i.innerHTML=Be(a,t),f.appendChild(i);var w=document.createElement("span");w.className="renuvex-pr-minimal-count",w.textContent=n.toLocaleString("tr-TR")+" Yorum",f.appendChild(w),v.appendChild(f),s.appendChild(v);var p=Q({widget:r,currentOrderBy:l,currentHasImages:d,onWriteClick:Y,onSortChange:o}),u=p.querySelector(".renuvex-pr-filter-wrap"),g=p.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");if(b.className="renuvex-pr-minimal-actions",g&&b.appendChild(g),u&&b.appendChild(u),s.appendChild(b),g){var m=document.createElement("button");m.className="renuvex-pr-write-btn",m.textContent=A&&A.writeButtonText||"Yorum Yap",m.onclick=Y;var k=document.createElement("div");k.className="renuvex-pr-minimal-write-row",k.appendChild(m),s.appendChild(k)}return s}var Gr={};xe(Gr,{css:()=>Ea,meta:()=>Sa,render:()=>Ta});var Ut=`
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
`;var Sa={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ea=Ut;function Ta(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,l=e.currentOrderBy,d=e.currentHasImages,o=e.onSortChange,s=document.createElement("div");s.className="renuvex-pr-summary renuvex-pr-summary-hero";var v=document.createElement("div");v.className="renuvex-pr-hero-info";var f=document.createElement("div");f.className="renuvex-pr-hero-rating-col";var c=document.createElement("span");c.className="renuvex-pr-hero-avg",c.textContent=a,f.appendChild(c);var i=document.createElement("div");i.className="renuvex-pr-hero-meta-row";var w=document.createElement("span");w.className="renuvex-pr-hero-stars",w.innerHTML=Be(a,t),i.appendChild(w);var p=document.createElement("div");p.className="renuvex-pr-hero-count",p.textContent=n.toLocaleString("tr-TR")+" Yorum",i.appendChild(p),f.appendChild(i),v.appendChild(f),s.appendChild(v);var u=Q({widget:r,currentOrderBy:l,currentHasImages:d,onWriteClick:Y,onSortChange:o}),g=u.querySelector(".renuvex-pr-filter-wrap"),b=u.querySelector(".renuvex-pr-write-btn"),m=document.createElement("div");m.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",b&&m.appendChild(b),g&&m.appendChild(g),s.appendChild(m);var k=Q({widget:r,currentOrderBy:l,currentHasImages:d,onWriteClick:Y,onSortChange:o}),h=k.querySelector(".renuvex-pr-filter-wrap"),y=k.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");return z.className="renuvex-pr-hero-write-row",y&&z.appendChild(y),h&&z.appendChild(h),s.appendChild(z),s}var zr={classic:Dr,compact:jr,split:Vr,minimal:Ur,hero:Gr};function Cr(e){return zr[e]||zr.classic}function Gt(){return Object.keys(zr).map(function(e){return zr[e].css||""}).join(`
`)}var Wr={};xe(Wr,{css:()=>La,meta:()=>Aa,render:()=>Na});function Ye(e,r,t){var n=t||{},a=document.createDocumentFragment(),l=document.createElement("div");l.className=r+" renuvex-pr-body-clamped",l.textContent=e,a.appendChild(l);var d=document.createElement("button");return d.type="button",d.className="renuvex-pr-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",a.appendChild(d),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(d.style.display="inline-block",typeof n.onReadMore=="function")d.onclick=n.onReadMore;else{var o=!1;d.onclick=function(){o=!o,l.classList.toggle("renuvex-pr-body-clamped",!o),d.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:l,readMore:d}}function De(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi",n.appendChild(a),t.appendChild(n);var l=document.createElement("div");l.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",l.textContent=e,t.appendChild(l);var d=document.createElement("button");return d.type="button",d.className="renuvex-pr-read-more renuvex-pr-reply-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",t.appendChild(d),requestAnimationFrame(function(){if(l.scrollHeight>l.clientHeight+2)if(d.style.display="inline",typeof r=="function")d.onclick=r;else{var o=!1;d.onclick=function(){o=!o,l.classList.toggle("renuvex-pr-reply-text-clamped",!o),d.textContent=o?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Aa={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},La="";function Na(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var l=document.createElement("span");l.className="renuvex-pr-review-stars",l.innerHTML=ue(e.rating,A),a.appendChild(l);var d=document.createElement("time");if(d.className="renuvex-pr-date",e.createdAt&&d.setAttribute("datetime",e.createdAt),d.textContent=se(e.createdAt),n.appendChild(a),n.appendChild(d),t.appendChild(n),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-title",o.textContent=e.title,t.appendChild(o)}var s=document.createElement("div");s.className="renuvex-pr-author",s.textContent=e.author||"",t.appendChild(s);var v=(e.comment||"").trim();v&&t.appendChild(Ye(v,"renuvex-pr-body").fragment);var f=ge(e);if(f.length){var c=document.createElement("div");c.className="renuvex-pr-gallery",f.forEach(function(w){var p=document.createElement("img"),u=ae(w,V);p.src=u.src,p.srcset=u.srcset,p.loading="lazy",p.decoding="async",p.width=V,p.height=V,p.className="renuvex-pr-img",ne(p),p.setAttribute("data-renuvex-img-url",w),p.setAttribute("role","button"),p.setAttribute("tabindex","0"),p.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(g){var b=function(){oe(e,g,r)};p.onclick=b,p.onkeydown=function(m){(m.key==="Enter"||m.key===" "||m.key==="Spacebar")&&(m.preventDefault(),b())}})(w),c.appendChild(p)}),t.appendChild(c)}var i=De(e.merchantReply);return i&&t.appendChild(i),t}var qr={};xe(qr,{css:()=>Ra,meta:()=>Pa,render:()=>Ba});var Wt=`
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
  .renuvex-pr-review-list-author-date{margin-top:var(--renuvex-pr-gap-tight);font-size:var(--renuvex-pr-review-date-size,12px);color:var(--renuvex-pr-review-date,#5e5e5e);}
  .renuvex-pr-review-list-content{display:flex;flex-direction:column;min-width:0;}
  /* Title art\u0131k orta kolonun ilk eleman\u0131; \xFCst margin gerekmez. */
  .renuvex-pr-review-list-title{font-weight:600;font-size:var(--renuvex-pr-review-title-size,16px);color:var(--renuvex-pr-review-title,var(--renuvex-pr-text,rgba(0,0,0,1)));margin:0;}
  .renuvex-pr-review-list-body{margin-top:var(--renuvex-pr-gap-normal);line-height:1.6;color:var(--renuvex-pr-review-body,var(--renuvex-pr-text,rgba(0,0,0,1)));font-size:var(--renuvex-pr-review-text-size,14px);}
  .renuvex-pr-review-list-media{display:flex;justify-content:flex-end;}
  .renuvex-pr-review-list-media img{
    width:100%;max-width:var(--renuvex-pr-list-photo-w,120px);aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--renuvex-pr-radius,6px);
    border:1px solid var(--renuvex-pr-photo-image-border,rgba(0,0,0,0.05));
    cursor:zoom-in;
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
`;var Pa={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Ra=Wt;function Ba(e,r){var t=ge(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-list-author";var d=document.createElement("span");d.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",d.innerHTML=ue(e.rating,A),l.appendChild(d);var o=document.createElement("span");o.className="renuvex-pr-review-list-author-name",o.textContent=e.author||"",l.appendChild(o);var s=document.createElement("time");s.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&s.setAttribute("datetime",e.createdAt),s.textContent=se(e.createdAt),l.appendChild(s),a.appendChild(l);var v=document.createElement("div");if(v.className="renuvex-pr-review-list-content",e.title){var f=document.createElement("div");f.className="renuvex-pr-review-list-title",f.textContent=e.title,v.appendChild(f)}var c=(e.comment||"").trim();c&&v.appendChild(Ye(c,"renuvex-pr-review-list-body").fragment);var i=De(e.merchantReply);if(i&&v.appendChild(i),a.appendChild(v),n){var w=document.createElement("div");w.className="renuvex-pr-review-list-media",t.forEach(function(p){var u=document.createElement("img"),g=ae(p,V);u.src=g.src,u.srcset=g.srcset,u.loading="lazy",u.decoding="async",u.width=V,u.height=Math.round(V*4/3),u.setAttribute("data-renuvex-img-url",p),ne(u),u.setAttribute("role","button"),u.setAttribute("tabindex","0"),u.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(b){var m=function(){oe(e,b,r)};u.onclick=m,u.onkeydown=function(k){(k.key==="Enter"||k.key===" "||k.key==="Spacebar")&&(k.preventDefault(),m())}})(p),w.appendChild(u)}),a.appendChild(w)}return a}var Xr={};xe(Xr,{css:()=>Ma,meta:()=>Ia,render:()=>Fa});var qt=`
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
    cursor:zoom-in;
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
`;var Ia={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ma=qt;function Fa(e,r){var t=dr(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var l=document.createElement("div");l.className="renuvex-pr-review-gallery-content";var d=document.createElement("span");if(d.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",d.innerHTML=ue(e.rating,A),l.appendChild(d),e.title){var o=document.createElement("div");o.className="renuvex-pr-review-gallery-title",o.textContent=e.title,l.appendChild(o)}var s=document.createElement("div");s.className="renuvex-pr-review-gallery-author",s.textContent=e.author||"",l.appendChild(s);var v=document.createElement("time");v.className="renuvex-pr-review-gallery-date",v.style.display="block",e.createdAt&&v.setAttribute("datetime",e.createdAt),v.textContent=se(e.createdAt),l.appendChild(v);var f=(e.comment||"").trim();if(f&&l.appendChild(Ye(f,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){oe(e,t,r)}}:null).fragment),a.appendChild(l),n){var c=document.createElement("div");c.className="renuvex-pr-review-gallery-media";var i=document.createElement("img"),w=ae(t,ur);i.src=w.src,i.srcset=w.srcset,i.loading="lazy",i.decoding="async",i.width=ur,i.height=Math.round(ur*4/3),ne(i),i.setAttribute("data-renuvex-img-url",t),i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt");var p=function(){oe(e,t,r)};i.onclick=p,i.onkeydown=function(g){(g.key==="Enter"||g.key===" "||g.key==="Spacebar")&&(g.preventDefault(),p())},c.appendChild(i),a.appendChild(c)}var u=De(e.merchantReply,t?function(){oe(e,t,r)}:null);return u&&(u.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(u)),a}var Sr={card:Wr,list:qr,gallery:Xr};function rr(e){return Sr[e]||Sr.card}function Xt(){return Object.keys(Sr).map(function(e){return Sr[e].css||""}).join(`
`)}function Ee(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),l=parseInt(t[3],16);return"rgba("+n+","+a+","+l+","+r+")"}function Oa(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var l=document.createElementNS(t,"line");l.setAttribute("x1","1"),l.setAttribute("y1","1"),l.setAttribute("x2","23"),l.setAttribute("y2","23"),n.appendChild(a),n.appendChild(l);var d=document.createElement("div");d.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",d.textContent="Widget \u015Fu anda Pasif durumda";var o=document.createElement("div");return o.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",o.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(d),r.appendChild(o),r}function _a(){return bt()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Ha(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=gt({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),ht(t,{surface:"reviews",productId:r||""}),t}var Kt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Jt={small:80,medium:110,large:140};function Ya(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function Da(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",l=r.headerRecommendColor||"#111111",d=r.barFillColor||"#111111",o=r.barTrackColor||"#e5e7eb",s=r.barCountColor||"#111111",v=Ee(d,.06),f=r.reviewStarColor||"#f59e0b",c=r.btnBgColor||"#111111",i=r.btnTextColor||"#ffffff",w=r.btnBorderColor||"#111111",p=r.filterBtnBgColor||"#111111",u=r.filterBtnTextColor||"#ffffff",g=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",m=r.filterMenuBorderColor||"#e5e7eb",k=r.filterItemTextColor||"#111111",h=r.filterItemHoverBgColor||"#f3f4f6",y=r.filterItemActiveColor||"#111111",z=r.reviewTitleColor||"#111111",x=r.reviewAuthorColor||"#111111",C=r.reviewDateColor||"#5e5e5e",P=r.reviewBodyColor||"#111111",E=r.reviewBorderColor||"#e5e7eb",R=r.replyBgColor||"#f9fafb",N=r.replyBorderColor||"#747474",S=r.replyLabelColor||"#111111",T=r.replyTextColor||"#111111",I=r.photoTitleColor||"#111111",L=Ee("#111111",.05),U=r.photoArrowBgColor||"#ffffff",G=r.photoArrowTextColor||"#111111",O=Ee("#111111",.12),_=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",q=r.formSecondaryTextColor||"#3b3b3b",je=r.inputTextColor||W,Te=r.inputBorderColor||"#d1d5db",he=r.placeholderColor||"#9ca3af",D=r.formStepBarColor||"#111111",j=r.formBtnBgColor||"#111111",pe=r.formBtnTextColor||"#ffffff",ee=r.formBtnBorderColor||"#111111",be=Ee(j,.06),Ve=Ee(j,.18),re=Ee(pe,.85),ye=Ee(W,.06),Ue=r.loadMoreBgColor||"#ffffff",H=r.loadMoreTextColor||"#111111",X=r.loadMoreBorderColor||"#111111",Ge={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":l,"--renuvex-pr-bar-fill":d,"--renuvex-pr-bar-track":o,"--renuvex-pr-bar-count":s,"--renuvex-pr-bar-hover-bg":v,"--renuvex-pr-btn-bg":c,"--renuvex-pr-btn-text":i,"--renuvex-pr-btn-border":w,"--renuvex-pr-filter-btn-bg":p,"--renuvex-pr-filter-btn-text":u,"--renuvex-pr-filter-btn-border":g,"--renuvex-pr-filter-menu-bg":b,"--renuvex-pr-filter-menu-border":m,"--renuvex-pr-filter-item-text":k,"--renuvex-pr-filter-item-hover-bg":h,"--renuvex-pr-filter-item-active":y,"--renuvex-pr-review-title":z,"--renuvex-pr-review-author":x,"--renuvex-pr-review-date":C,"--renuvex-pr-review-body":P,"--renuvex-pr-review-border":E,"--renuvex-pr-review-star-color":f,"--renuvex-pr-reply-bg-color":R,"--renuvex-pr-reply-border":N,"--renuvex-pr-reply-label":S,"--renuvex-pr-reply-text":T,"--renuvex-pr-photo-title":I,"--renuvex-pr-photo-image-border":L,"--renuvex-pr-photo-arrow-bg":U,"--renuvex-pr-photo-arrow-text":G,"--renuvex-pr-photo-arrow-border":O,"--renuvex-pr-fwizard-bg":_,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":q,"--renuvex-pr-fwizard-input-bg":_,"--renuvex-pr-fwizard-input-text":je,"--renuvex-pr-fwizard-input-border":Te,"--renuvex-pr-fwizard-placeholder":he,"--renuvex-pr-fwizard-close-text":W,"--renuvex-pr-fwizard-close-hover-bg":ye,"--renuvex-pr-fwizard-progress-bg":ye,"--renuvex-pr-fwizard-progress-active":D,"--renuvex-pr-fwizard-btn-bg":j,"--renuvex-pr-fwizard-btn-text":pe,"--renuvex-pr-fwizard-btn-border":ee,"--renuvex-pr-fwizard-btn-disabled-bg":Ve,"--renuvex-pr-fwizard-btn-disabled-text":re,"--renuvex-pr-fwizard-nav-hover-bg":be,"--renuvex-pr-load-more-bg":Ue,"--renuvex-pr-load-more-text":H,"--renuvex-pr-load-more-border":X};Object.keys(Ge).forEach(function(me){e.style.setProperty(me,Ge[me])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function tr(e,r,t,n,a,l,d){if(pt){or({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:l,badgeSettings:d});return}ir(!0),rt(e),tt(r),d!==void 0&&at(d),nt(n),a&&Rr(a),l&&Ke(l),t!=null&&it(t);try{let Ar=function(B,F){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var M=B.meta.sizeOverrides[F];M&&Object.keys(M).forEach(function($){i.style.setProperty($,M[$])})}};var ja=Ar,o=Cr(r.summaryLayout),s=!(o.meta&&o.meta.supports&&o.meta.supports.title===!1),v=r.showTitle!==!1,f=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=s&&v?f:"",i=document.documentElement;Da(i,r);var w=r.borderRadius!==void 0?r.borderRadius:8,p=Kt[r.size]||Kt.medium,u=Jt[r.thumbnailSize]||Jt.medium,g=rr(r.reviewLayout);if(g.meta&&g.meta.sizeOverrides&&g.meta.sizeOverrides[r.size]){var b=g.meta.sizeOverrides[r.size],m=b["--renuvex-pr-list-photo-w"]||b["--renuvex-pr-gallery-photo-w"];m&&(u=parseInt(m))}i.style.setProperty("--renuvex-pr-title-size",p.titleSize+"px"),i.style.setProperty("--renuvex-pr-review-text-size",p.reviewTextSize+"px"),i.style.setProperty("--renuvex-pr-review-title-size",p.reviewTitleSize+"px"),i.style.setProperty("--renuvex-pr-author-size",p.authorSize+"px"),i.style.setProperty("--renuvex-pr-reply-name-size",p.replyNameSize+"px"),i.style.setProperty("--renuvex-pr-reply-text-size",p.replyTextSize+"px"),i.style.setProperty("--renuvex-pr-radius",w+"px"),i.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,w-4)+"px"),i.style.setProperty("--renuvex-pr-photo-title-size",p.photoTitleSize+"px"),i.style.setProperty("--renuvex-pr-avg-rating-size",p.avgRatingSize+"px"),i.style.setProperty("--renuvex-pr-review-count-size",p.reviewCountSize+"px"),i.style.setProperty("--renuvex-pr-compact-count-size",p.compactCountSize+"px"),i.style.setProperty("--renuvex-pr-recommend-size",p.recommendSize+"px"),i.style.setProperty("--renuvex-pr-btn-text-size",p.btnTextSize+"px"),i.style.setProperty("--renuvex-pr-bar-label-size",p.barLabelSize+"px"),i.style.setProperty("--renuvex-pr-minimal-avg-size",p.minimalAvgSize+"px"),i.style.setProperty("--renuvex-pr-hero-avg-size",p.heroAvgSize+"px"),i.style.setProperty("--renuvex-pr-bar-count-size",p.barCountSize+"px"),i.style.setProperty("--renuvex-pr-review-date-size",p.reviewDateSize+"px"),i.style.setProperty("--renuvex-pr-filter-text-size",p.filterTextSize+"px"),i.style.setProperty("--renuvex-pr-load-more-size",p.loadMoreSize+"px"),i.style.setProperty("--renuvex-pr-read-more-size",p.readMoreSize+"px"),i.style.setProperty("--renuvex-pr-thumbnail-size",u+"px");var k=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";i.style.setProperty("--renuvex-pr-review-star-color",k),i.style.setProperty("--renuvex-pr-star-size",p.reviewStarSize+"px"),i.style.setProperty("--renuvex-pr-avg-star-size",p.avgStarSize+"px"),Ar(Cr(r.summaryLayout),r.size),Ar(rr(r.reviewLayout),r.size);var h=Je(r),y=_a();if(!y)return;var z=Ha(y,e),x=document.getElementById("renuvex-reviews");x||(x=document.createElement("div"),x.id="renuvex-reviews",x.style.minHeight="200px"),x.parentNode!==z&&z.appendChild(x);var C=yt(x),P=Ie+Ae+cr+Gt()+Xt();Me(C,P);var E=kt(C);if(r.enabled===!1){x.style.minHeight="auto",E.replaceChildren(Oa(r.borderRadius!==void 0?r.borderRadius:8)),ir(!1);var R=nr;or(null),R&&tr(R.productId,R.settings,R.reviewsData,R.productName,R.orderBy,R.page,R.badgeSettings);return}var N=document.createElement("p");N.className="renuvex-pr-state-msg renuvex-pr-state-loading",N.textContent="Yorumlar y\xFCkleniyor...",E.replaceChildren(N);try{var S=t||{},T=Mr(S),I=T?[]:S.data&&S.data.reviews||[];ot(I),E.replaceChildren();var L=document.createElement("section");if(L.id="renuvex-reviews-widget",L.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),L.className="renuvex-pr-reviews-widget",L.setAttribute("data-renuvex-surface","reviews"),e&&L.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),c){var U=document.createElement("div"),G=r.summaryLayout||"classic";U.className="renuvex-pr-title renuvex-pr-title-"+G,U.textContent=c,L.appendChild(U)}if(T){L.appendChild(Ya(S.message,async function(){var B=await $e(te,ke,1,Le,Ne);await tr(te,A,B,Pe,ke,1,Zr)})),E.appendChild(L),ze(C),Nr(L,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return C.getElementById("renuvex-reviews-widget")});return}var O=S.data&&S.data.allCount||0,_=S.data&&S.data.ratingCounts||null,W=_||[0,0,0,0,0],q=S.data&&S.data.avgRating||"0.0";if(!_&&I.length>0){I.forEach(function(B){B.rating>=1&&B.rating<=5&&W[B.rating-1]++});var je=I.reduce(function(B,F){return B+F.rating},0);q=(je/I.length).toFixed(1)}if(O>0){var Te=Cr(r.summaryLayout),he=Te.render({widget:L,data:S,settings:r,iconPair:h,allCount:O,ratingCounts:W,avgRatingVal:q,currentRatingFilter:Le,currentOrderBy:ke,currentHasImages:Ne,onFilterChange:async function(B){var F=Le===B?null:B;Qr(F),Ke(1);var M=await $e(te,ke,1,F,Ne);await tr(te,A,M,Pe,ke,1)},onSortChange:async function(B,F){Ke(1);var M=B,$=!1;F&&($=!0,M="newest"),et($),Rr(M);var Lr=await $e(te,M,1,Le,$);await tr(te,A,Lr,Pe,M,1)}});L.appendChild(he)}else{var D=document.createElement("button");D.className="renuvex-pr-write-btn",D.style.cssText="display:block;margin:16px auto 0;",D.textContent=r.writeButtonText||"Yorum Yap",D.onclick=Y,L.appendChild(D)}var j=($r||[]).filter(function(B){return ge(B).length>0});if(r.showPhotoGallery!==!1&&!Ne&&j.length>0){var pe=document.createElement("div");if(pe.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var ee=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",be=document.createElement("div");be.className="renuvex-pr-photo-title",be.textContent=ee,pe.appendChild(be)}var Ve=r.reviewLayout==="card"?"1/1":"3/4";i.style.setProperty("--renuvex-pr-photo-thumb-aspect",Ve);var re=document.createElement("div");re.className="renuvex-pr-photo-strip";var ye=V,Ue=r.reviewLayout==="card"?V:Math.round(V*4/3),H=0;j.forEach(function(B){if(!(H>=15)){var F=dr(B);if(F){var M=document.createElement("img"),$=ae(F,V);M.src=$.src,M.srcset=$.srcset,M.loading=H<3?"eager":"lazy",M.decoding="async",M.width=ye,M.height=Ue,M.className="renuvex-pr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",ne(M),(function(Lr,$t){M.onclick=function(){oe($t,Lr,j)}})(F,B),re.appendChild(M),H++}}});var X=document.createElement("button");X.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var Ge=Z(Re);Ge&&X.appendChild(Ge),X.setAttribute("aria-label","\xD6nceki"),X.onclick=function(){re.scrollBy({left:-200,behavior:"smooth"})};var me=document.createElement("button");me.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var Kr=Z(pr);Kr&&me.appendChild(Kr),me.setAttribute("aria-label","Sonraki"),me.onclick=function(){re.scrollBy({left:200,behavior:"smooth"})};var We=document.createElement("div");We.className="renuvex-pr-photo-strip-wrap",We.appendChild(X),We.appendChild(re),We.appendChild(me),pe.appendChild(We),L.appendChild(pe)}if(I.length===0){var Er=document.createElement("p");Er.className="renuvex-pr-state-msg",Er.textContent="Hen\xFCz yorum yok.",L.appendChild(Er)}else{var g=rr(r.reviewLayout);I.forEach(function(F){L.appendChild(g.render(F,Pr))})}var Zt=S.data&&S.data.hasMore;if(Zt){var K=document.createElement("button");K.className="renuvex-pr-load-more",K.textContent="Daha Fazla G\xF6ster",K.onclick=async function(){K.disabled=!0,K.textContent="Y\xFCkleniyor...";var B=Jr+1,F=await $e(te,ke,B,Le,Ne);if(F&&!Mr(F)&&F.data&&Array.isArray(F.data.reviews)){lt(F.data.reviews),Ke(B);var M=rr(A.reviewLayout);F.data.reviews.forEach(function($){L.insertBefore(M.render($,Pr),K)}),F.data.hasMore?(K.disabled=!1,K.textContent="Daha Fazla G\xF6ster"):K.remove()}else K.disabled=!1,K.textContent="Tekrar Dene"},L.appendChild(K)}E.appendChild(L),ze(C),Nr(L,"reviews-widget",{productId:e||""},function(){return C.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Tr=document.createElement("p");Tr.style.cssText="text-align:center;color:#dc2626;",Tr.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",E&&E.replaceChildren(Tr)}}finally{if(ir(!1),nr){var we=nr;or(null),tr(we.productId,we.settings,we.reviewsData,we.productName,we.orderBy,we.page,we.badgeSettings)}}}export{tr as render};
