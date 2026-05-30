/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as Ae,d as tr}from"./chunk-FW6W6ZQL.js";import{b as Ir,c as $e}from"./chunk-ZM24JLBV.js";import{A as ir,a as ke,b as Kr,c as Le,d as Ne,e as ae,f as A,g as Jr,h as Pe,j as Nr,k as Zr,l as Pr,m as Ke,n as $r,o as Qr,p as et,q as rt,r as tt,s as at,t as nt,v as it,w as ot,x as lt,y as ar,z as nr}from"./chunk-4OXLOSZH.js";import{A as ge,B as pr,C as V,D as dr,E as ur,F as Rr,G as Br,H as ne,I as xt,J as ie,K as ft,L as gt,c as Lr,e as fe,f as J,g as ue,h as Z,i as ze,j as or,k as Je,l as pt,m as Re,n as lr,o as dt,p as Ce,q as ut,r as st,t as vt,u as se,v as Be,x as ct,y as ve,z as mt}from"./chunk-22YN2NDJ.js";import{a as Ze}from"./chunk-GSBAPHFO.js";import{a as xe,b as qe,c as Xe,k as ht,l as Se}from"./chunk-YCWIZ2SG.js";var Ie=":host{display:block;box-sizing:border-box;-webkit-tap-highlight-color:transparent;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function bt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Me(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function sr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function yt(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function wt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var vr=`
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

${ct}

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
`;function $t(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function oe(e,r,t,n){t?e.setProperty(r,t,n||""):e.removeProperty(r)}function Qt(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,n=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return n&&/AppleWebKit/i.test(r)}function ea(e){var r=document.body.style,t=document.documentElement.style,n=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",p=Qt()&&!a;if(n>0){var o=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",o+n+"px","important")}t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),p&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important"))}function ra(e){var r=document.body.style,t=document.documentElement.style;oe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),oe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),oe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),oe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),oe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),oe(r,"position",e.bodyPosition,e.bodyPositionPriority),oe(r,"top",e.bodyTop,e.bodyTopPriority),oe(r,"left",e.bodyLeft,e.bodyLeftPriority),oe(r,"right",e.bodyRight,e.bodyRightPriority),oe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}var Qe=0,Fe=null;function cr(){return Qe+=1,Qe>1||(Fe=$t(),ea(Fe)),Fe}function mr(){if(Qe!==0&&(Qe-=1,!(Qe>0))){var e=Fe;Fe=null,e&&ra(e)}}function ta(){for(var e=document.activeElement;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}function xr(){var e=ta();return!e||e===document.body||e===document.documentElement?null:e}function Q(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function aa(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"||typeof e.tabIndex=="number"&&e.tabIndex<0?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Mr(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(aa)}function na(e,r){var t=e,n=Mr(e);!n.length&&r&&(t=r,n=Mr(r));var a=n[0]||t&&t.querySelector('[role="dialog"]')||t;Q(a)}function fr(e,r,t){if(e.key==="Tab"){var n=Mr(r);if(!n.length){e.preventDefault(),na(r);return}var a=n[0],p=n[n.length-1],o=yt(t);if(!r.contains(o)){e.preventDefault(),Q(a);return}e.shiftKey&&o===a?(e.preventDefault(),Q(p)):!e.shiftKey&&o===p&&(e.preventDefault(),Q(a))}}var kt="renuvexPrOverlay";function gr(){var e={id:"renuvex-pr-overlay-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state;var r={};r[kt]=e.id,history.pushState(r,"",e.url),e.pushed=!0}catch(t){}return e}function ia(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state[kt]===e.id)}function hr(e){if(ia(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Oe(e){return ge(e)}function zt(e,r,t,n,a){mr(n),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&or(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),Q(a)}function oa(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var n=document.createElement("div");n.className="renuvex-pr-modal-top-row";var a=document.createElement("div");a.className="renuvex-pr-modal-stars",a.innerHTML=se(e.rating,A);var p=document.createElement("span");p.className="renuvex-pr-modal-date",p.textContent=ve(e.createdAt),n.appendChild(a),n.appendChild(p),t.appendChild(n);var o=document.createElement("div");o.className="renuvex-pr-modal-title",o.textContent=e.title||"",o.style.display=e.title?"":"none",t.appendChild(o);var l=document.createElement("div");l.className="renuvex-pr-modal-author",l.textContent=e.author||"",t.appendChild(l);var v=document.createElement("div");v.className="renuvex-pr-modal-body",v.textContent=(e.comment||"").trim(),v.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-modal-reply";var g=document.createElement("div");g.className="renuvex-pr-modal-reply-label",g.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi";var m=document.createElement("div");return m.className="renuvex-pr-modal-reply-text",m.textContent=e.merchantReply||"",u.appendChild(g),u.appendChild(m),u.style.display=e.merchantReply?"":"none",t.appendChild(u),r.appendChild(t),r}function Ct(e,r,t){var n=t||A,a=e.querySelector(".renuvex-pr-modal-scroll-content"),p=a.querySelector(".renuvex-pr-modal-stars");p.innerHTML=se(r.rating,n),a.querySelector(".renuvex-pr-modal-date").textContent=ve(r.createdAt);var o=a.querySelector(".renuvex-pr-modal-title");o.textContent=r.title||"",o.style.display=r.title?"":"none",a.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var l=a.querySelector(".renuvex-pr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var v=a.querySelector(".renuvex-pr-modal-reply");v.querySelector(".renuvex-pr-modal-reply-label").textContent=n&&n.merchantReplyLabel||"Ma\u011Faza Sahibi",v.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",v.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Or(e,r,t,n,a,p,o,l,v){var u=Oe(e),g=Math.max(0,Math.min(t||0,u.length-1)),m=document.createElement("div");m.className="renuvex-pr-modal-left";var i=document.createElement("img"),z=o==="next"?"renuvex-pr-modal-img-enter-right":o==="prev"?"renuvex-pr-modal-img-enter-left":"";i.className="renuvex-pr-modal-main-img"+(z?" "+z:""),i.src=Br(u[g]||""),i.decoding="async",i.width=Rr,i.height=Math.round(Rr*4/3),i.alt="Yorum foto\u011Fraf\u0131",xt(i,function(N){if(N.style.display="none",!m.querySelector(".renuvex-pr-modal-img-error")){var S=document.createElement("div");S.className="renuvex-pr-modal-img-error",S.setAttribute("role","status"),S.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",m.insertBefore(S,N)}}),m.appendChild(i);var s=document.createElement("button");s.className="renuvex-pr-modal-close-mobile";var h=Z(Ce);h&&s.appendChild(h),s.setAttribute("aria-label","Kapat"),s.onclick=function(N){N.stopPropagation(),p()},m.appendChild(s);var x=0;if(m.addEventListener("touchstart",function(N){x=N.touches[0].clientX},{passive:!0}),m.addEventListener("touchend",function(N){var S=x-N.changedTouches[0].clientX;if(!(Math.abs(S)<50)){if(S>0){if(y)ce(e,r,g+1,n,a,p,!0,"next",l,v);else if(w){var T=n[r+1];ce(T,r+1,0,n,a,p,!1,"next",l,v)}}else if(d)ce(e,r,g-1,n,a,p,!0,"prev",l,v);else if(b){var I=n[r-1],L=Oe(I);ce(I,r-1,L.length-1,n,a,p,!1,"prev",l,v)}}},{passive:!0}),u.length>1){var c=document.createElement("div");c.className="renuvex-pr-modal-thumbs",u.forEach(function(N,S){var T=document.createElement("img"),I=ne(N,ur);T.src=I.src,T.srcset=I.srcset,T.loading="lazy",T.decoding="async",T.width=ur,T.height=ur,T.className="renuvex-pr-modal-thumb"+(S===g?" renuvex-pr-modal-thumb-active":""),T.alt="K\xFC\xE7\xFCk resim "+(S+1),ie(T),T.tabIndex=0,T.setAttribute("role","button"),T.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(S+1)+" se\xE7"),S===g&&T.setAttribute("aria-current","true"),(function(L){function U(){ce(e,r,L,n,a,p,!0,null,l,v)}T.onclick=U,T.onkeydown=function(G){(G.key==="Enter"||G.key===" ")&&(G.preventDefault(),U())}})(S),c.appendChild(T)}),m.appendChild(c)}var d=g>0,y=g<u.length-1,b=r>0,w=r<n.length-1,k=d||b,f=y||w;if(k){var C=document.createElement("button");C.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev";var P=Z(Re);P&&C.appendChild(P),C.setAttribute("aria-label","\xD6nceki"),C.onclick=function(N){if(N.stopPropagation(),d)ce(e,r,g-1,n,a,p,!0,"prev",l,v);else if(b){var S=n[r-1],T=Oe(S);ce(S,r-1,T.length-1,n,a,p,!1,"prev",l,v)}},m.appendChild(C)}if(f){var E=document.createElement("button");E.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next";var R=Z(lr);R&&E.appendChild(R),E.setAttribute("aria-label","Sonraki"),E.onclick=function(N){if(N.stopPropagation(),y)ce(e,r,g+1,n,a,p,!0,"next",l,v);else if(w){var S=n[r+1];ce(S,r+1,0,n,a,p,!1,"next",l,v)}},m.appendChild(E)}return m}function St(e,r){[-1,1].forEach(function(t){var n=r[e+t];if(n){var a=Oe(n);a[0]&&(new Image().src=Br(a[0]))}})}function Fr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function la(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),n=r&&r.querySelector(".renuvex-pr-modal-right"),a=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function p(){Fr(t),Fr(n),Fr(a)}p(),t&&Q(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){p(),requestAnimationFrame(p)}):setTimeout(p,0)}function ce(e,r,t,n,a,p,o,l,v,u){if(u&&(u.currentReview=e),o){var g=Or(e,r,t,n,a,p,l,v,u);a.firstChild&&a.replaceChild(g,a.firstChild)}else{var g=Or(e,r,t,n,a,p,l,v,u),m=a.querySelector(".renuvex-pr-modal-right");a.firstChild&&a.replaceChild(g,a.firstChild),m&&Ct(m,e,u&&u.currentSettings),la(v,a)}St(r,n)}function le(e,r,t){var n=Oe(e);if(!n.length)return;var a=(t||[]).filter(function(f){return Oe(f).length>0}),p=a.findIndex(function(f){return f===e||f.id===e.id});p===-1&&(a.unshift(e),p=0);var o=n.indexOf(r);o<0&&(o=0);var l=document.createElement("div");l.className="renuvex-pr-modal-overlay";var v=document.createElement("div");v.className="renuvex-pr-modal";var u=!1,g=null,m=xr(),i=cr(),z=gr(),s={currentReview:e,currentSettings:A},h=null;function x(f){var C=f&&f.detail&&f.detail.settings;if(!(C&&C===h)){h=C||null,s.currentSettings=C||A;var P=v.querySelector(".renuvex-pr-modal-right");!P||!s.currentReview||Ct(P,s.currentReview,s.currentSettings)}}function c(){u||(u=!0,window.removeEventListener(Se,x),zt(g&&g.host,d,c,i,m))}function d(f){if(f.key==="Escape"){y();return}fr(f,l,g&&g.root)}function y(){u||(u=!0,window.removeEventListener(Se,x),zt(g&&g.host,d,c,i,m),hr(z))}document.addEventListener("keydown",d),window.addEventListener("popstate",c),window.addEventListener(Se,x),l.onclick=function(){y()},v.onclick=function(f){f.stopPropagation()},v.appendChild(Or(e,p,o,a,v,y,null,l,s)),v.appendChild(oa(e)),St(p,a);var b=document.createElement("div");b.className="renuvex-pr-modal-wrap",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),b.appendChild(v);var w=document.createElement("button");w.className="renuvex-pr-modal-close";var k=Z(Ce);k&&w.appendChild(k),w.setAttribute("aria-label","Kapat"),w.onclick=function(f){f.stopPropagation(),y()},b.appendChild(w),l.appendChild(b),g=sr(),Me(g.root,Ie+Ae+vr),g.root.appendChild(l),ze(g.root),Q(b)}var Yr={};xe(Yr,{meta:()=>xa,render:()=>fa});function _e(e){var r=e.ratingCounts,t=e.allCount,n=e.iconPair,a=e.currentRatingFilter,p=e.onFilterChange;fe(n);var o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var l=5;l>=1;l--){var v=r[l-1]||0,u=t>0?Math.round(v/t*100):0,g=a===l,m=document.createElement("div");m.className="renuvex-pr-bar-row"+(g?" renuvex-pr-bar-active":""),a&&!g&&(m.style.opacity="0.35");for(var i="",z=1;z<=5;z++){var s=z<=l;i+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(s?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+J(s?"full":"outline")+"</span>"}m.innerHTML='<span class="renuvex-pr-bar-label">'+i+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+u+'%;"></div></div><span class="renuvex-pr-bar-count">('+v.toLocaleString("tr-TR")+")</span>",(function(h){m.onclick=function(){p(h)}})(l),o.appendChild(m)}return o}var pe=[],Et=!1,br=!1;function Tt(e,r){if(!r)return!1;if(typeof e.composedPath=="function"){var t=e.composedPath();if(t&&t.length)return t.indexOf(r)!==-1}return r.contains(e.target)}function pa(e){if(br){br=!1,e.preventDefault(),e.stopPropagation();return}for(var r=!1,t=pe.length-1;t>=0;t--){var n=pe[t];Tt(e,n.trigger)||Tt(e,n.element)||n.close()&&(r=!0)}r&&(e.preventDefault(),e.stopPropagation())}function da(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function ua(){Et||typeof document=="undefined"||(document.addEventListener("click",pa,!0),document.addEventListener("keydown",da),Et=!0)}function yr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function At(){br=!0,typeof setTimeout=="function"&&setTimeout(function(){br=!1},700)}function wr(e){ua();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var n=pe.indexOf(r);n!==-1&&pe.splice(n,1)}}function ee(e){var r=e.widget,t=e.currentOrderBy,n=e.currentHasImages,a=e.onWriteClick,p=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var l=document.createElement("button");l.className="renuvex-pr-write-btn",l.textContent=A&&A.writeButtonText||"Yorum Yap",l.onclick=a,o.appendChild(l);var v=document.createElement("div");v.className="renuvex-pr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="renuvex-pr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var g=A&&A.filterIcon||"lines";u.innerHTML=ue(pt(g));var m=document.createElement("div");m.className="renuvex-pr-filter-menu",m.setAttribute("role","menu");var i=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],z=!1;function s(c){var d=m.classList.contains("renuvex-pr-open");m.classList.remove("renuvex-pr-open"),u.classList.remove("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","false");var y=c&&(c.restoreFocus===!0||c.restoreFocus==="auto"&&tr());if(d&&y)try{u.focus({preventScroll:!0})}catch(b){try{u.focus()}catch(w){}}return d}function h(){yr(x),m.classList.add("renuvex-pr-open"),u.classList.add("renuvex-pr-filter-btn-active"),u.setAttribute("aria-expanded","true");var c=m.querySelector(".renuvex-pr-filter-item-active")||m.querySelector(".renuvex-pr-filter-item");c&&requestAnimationFrame(function(){try{c.focus({preventScroll:!0})}catch(d){try{c.focus()}catch(y){}}})}i.forEach(function(c){var d=c[2],y=d?n:!n&&(t||"newest")===c[0],b=document.createElement("button");b.type="button",b.className="renuvex-pr-filter-item"+(y?" renuvex-pr-filter-item-active":""),b.setAttribute("role","menuitem"),b.textContent=c[1];var w=!1;function k(f,C){f&&(f.preventDefault(),f.stopPropagation()),!w&&(w=!0,z=!0,C!==!0&&At(),s({restoreFocus:C}),p(c[0],d),setTimeout(function(){w=!1,z=!1},0))}b.addEventListener("pointerdown",function(f){f.button!==void 0&&f.button!==0||k(f,!1)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(f){k(f,!1)},{passive:!1}),b.addEventListener("mousedown",function(f){f.button!==void 0&&f.button!==0||k(f,!1)}),b.addEventListener("keydown",function(f){(f.key==="Enter"||f.key===" ")&&k(f,!0)}),b.onclick=function(f){k(f,!1)},m.appendChild(b)}),u.onclick=function(){m.classList.contains("renuvex-pr-open")?s({restoreFocus:"auto"}):h()},v.addEventListener("keydown",function(c){c.key==="Escape"&&m.classList.contains("renuvex-pr-open")&&(c.stopPropagation(),s({restoreFocus:!0}))}),v.addEventListener("focusout",function(c){if(m.classList.contains("renuvex-pr-open")&&!z){var d=c.relatedTarget;d&&v.contains(d)||s()}});var x=wr({trigger:v,element:m,close:s});return v.appendChild(u),v.appendChild(m),o.appendChild(v),o}var Lt=`
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
`;function Nt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-overlay",n.tabIndex=-1,n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="renuvex-pr-fwizard",n.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content",a.appendChild(p);var o=document.createElement("button");o.className="renuvex-pr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat");var l=Z(Ce);l&&o.appendChild(l),a.appendChild(o);var v=!1,u=null,g=null,m=!1;function i(){Q(n)}function z(w){fr(w,n,u&&u.root)}function s(){if(!v){if(v=!0,document.removeEventListener("keydown",h),n.removeEventListener("click",x),o.removeEventListener("click",s),m)Q(g);else{var w=u&&u.root?u.root.activeElement:null;if(w&&typeof w.blur=="function")try{w.blur()}catch(k){}}n.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(or(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):n.parentNode&&n.parentNode.removeChild(n),mr();try{r()}catch(k){}},200)}}function h(w){if(w.key==="Escape"){s();return}z(w)}function x(w){w.target===n&&t&&s()}document.addEventListener("keydown",h),n.addEventListener("click",x),o.addEventListener("click",s);function c(w){g=xr(),m=tr(),w&&p.appendChild(w),u=sr(),Me(u.root,Ie+Ae+Lt),u.root.appendChild(n),ze(u.root),cr(),requestAnimationFrame(function(){n.classList.add("renuvex-pr-fwizard-open"),i()})}var d=null,y=null;function b(w,k){if(k=k||"error",d){try{d.remove()}catch(f){}d=null}y&&(clearTimeout(y),y=null),d=document.createElement("div"),d.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+k,d.textContent=w,a.appendChild(d),y=setTimeout(function(){d&&(d.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(d){try{d.remove()}catch(f){}d=null}},300))},4e3)}return{open:c,close:s,content:p,setAllowOutsideClose:function(w){t=!!w},setStepAttr:function(w){a.setAttribute("data-step",String(w))},showToast:b}}var _r=4;function He(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Pt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function n(){r.forEach(function(a){try{a(t)}catch(p){}})}return{get:function(){return t},set:function(a){Object.assign(t,a),n()},goNext:function(){t.currentStep<_r&&(t.currentStep+=1,n())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,n())},onChange:function(a){return r.push(a),function(){r=r.filter(function(p){return p!==a})}}}}function Rt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],n=e.onBack||function(){},a=e.onSkip||function(){},p=e.onNext||function(){},o=document.createElement("div");o.className="renuvex-pr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=ue(Re)+"<span>Geri</span>",l.addEventListener("click",function(){n()}),o.appendChild(l);var v=document.createElement("div");v.className="renuvex-pr-fwizard-footer-progress";for(var u=[],g=0;g<_r;g++){var m=document.createElement("span");m.className="renuvex-pr-fwizard-progress-seg",v.appendChild(m),u.push(m)}o.appendChild(v);var i=document.createElement("button");i.type="button";var z=null;function s(x){z&&i.removeEventListener("click",z),z=x,x&&i.addEventListener("click",x)}o.appendChild(i);function h(x,c){var d=r.indexOf(x)!==-1,y=t.indexOf(x)!==-1,b=c&&(c.images&&c.images.length>0||c.pendingImages&&c.pendingImages.length>0);if(d)x===2&&b?(i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",s(function(){p()})):(i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.setAttribute("aria-label","Atla"),i.innerHTML="<span>Atla</span>",s(function(){a()})),i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),i.style.visibility="",i.tabIndex=0;else if(y){i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Sonraki"),i.innerHTML="Sonraki",i.style.visibility="",i.tabIndex=0;var w=He(x,c);i.disabled=!w,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!w),s(function(){i.disabled||p()})}else i.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",i.innerHTML="",i.style.visibility="hidden",i.tabIndex=-1,i.disabled=!0,s(null)}return{el:o,update:function(x,c){u.forEach(function(y,b){b+1<=x?y.classList.add("renuvex-pr-fwizard-progress-seg-active"):y.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var d=x<=1;l.style.visibility=d?"hidden":"",l.style.pointerEvents=d?"none":"",l.tabIndex=d?-1:0,h(x,c)},setNextDisabled:function(x){i.classList.contains("renuvex-pr-fwizard-cta-btn")&&(i.disabled=!!x,i.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!x))},setThanksState:function(x){l.style.visibility="hidden",v.style.visibility="hidden",i.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",i.setAttribute("aria-label","Devam Et"),i.innerHTML="Devam Et",i.style.visibility="",i.disabled=!1,i.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),s(x)}}}function Bt(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var n=!1,a=null,p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title",p.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=Je(A||{});fe(l);var v=[];function u(x){v.forEach(function(c,d){var y=d<x;c.classList.toggle("renuvex-pr-fwizard-star-active",y),c.setAttribute("aria-checked",d+1===x?"true":"false"),c.innerHTML=y?J("full"):J("outline")})}function g(x){e.set({rating:x}),u(x)}function m(x){var c=v[x-1];if(c)try{c.focus()}catch(d){}}function i(x,c){c&&typeof c.preventDefault=="function"&&c.preventDefault(),c&&typeof c.stopPropagation=="function"&&c.stopPropagation(),!n&&(n=!0,g(x),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var z=1;z<=5;z++)(function(x){var c=document.createElement("button");c.type="button",c.className="renuvex-pr-fwizard-star",c.setAttribute("role","radio"),c.setAttribute("aria-label",x+" y\u0131ld\u0131z"),c.innerHTML=J("outline"),c.addEventListener("mouseenter",function(){u(x)}),c.addEventListener("mouseleave",function(){u(e.get().rating)}),c.addEventListener("pointerdown",function(d){d.button&&d.button!==0||i(x,d)}),typeof window!="undefined"&&!window.PointerEvent&&c.addEventListener("touchstart",function(d){i(x,d)},{passive:!1}),c.addEventListener("mousedown",function(d){window.PointerEvent||i(x,d)}),c.addEventListener("keydown",function(d){if(d.key==="Enter"||d.key===" "){i(x,d);return}var y=0;d.key==="ArrowRight"||d.key==="ArrowUp"?y=Math.min(5,x+1):d.key==="ArrowLeft"||d.key==="ArrowDown"?y=Math.max(1,x-1):d.key==="Home"?y=1:d.key==="End"&&(y=5),y&&(d.preventDefault(),g(y),m(y))}),c.addEventListener("click",function(d){i(x,d)}),v.push(c),o.appendChild(c)})(z);u(e.get().rating);var s=null,h=function(x){var c=x&&x.detail&&x.detail.settings;c&&c===s||(s=c||null,l=Je(c||A||{}),u(e.get().rating))};return window.addEventListener(Se,h),t.appendChild(o),{el:t,destroy:function(){a&&clearTimeout(a),window.removeEventListener(Se,h)}}}var It=3,sa=10*1024*1024;function Mt(e,r){r=r||{};var t=!1,n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",n.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-subtitle",p.textContent="Foto\u011Fraf ekleyebilirsiniz.",n.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="renuvex-pr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle");var v=document.createElement("input");v.type="file",v.accept="image/*",v.multiple=!0,v.style.display="none",o.appendChild(l),o.appendChild(v);var u=document.createElement("div");u.className="renuvex-pr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),o.appendChild(u),n.appendChild(o);var g=r.blobMap||{},m=r.urlToFinger||{};function i(){if(!t){var c=e.get().images||[],d=e.get().pendingImages||[],y=c.map(function(b){return{url:b,isPending:!1}}).concat(d.map(function(b){return{url:b.url,file:b.file,isPending:!0,error:b.error}}));u.innerHTML="",y.forEach(function(b){var w=g[b.url]||b.url,k=z(b,w);u.appendChild(k)}),h()}}function z(c,d){var y=document.createElement("div");y.className="renuvex-pr-fwizard-photo-thumb";var b=document.createElement("img");b.src=d,b.alt="",b.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",y.appendChild(b);var w=document.createElement("div");w.className="renuvex-pr-fwizard-photo-loading",w.style.display="none",y.appendChild(w);var k=document.createElement("button");k.type="button",k.className="renuvex-pr-fwizard-photo-remove",k.setAttribute("aria-label","Kald\u0131r");var f=Z(Ce);return f&&k.appendChild(f),y.appendChild(k),s(y,c,d),y}function s(c,d,y){var b=c.querySelector("img");b.src!==y&&(b.src=y);var w=c.querySelector(".renuvex-pr-fwizard-photo-loading");if(d.isPending&&d.error){w.style.display="flex",w.textContent="";var k=document.createElement("span");k.className="renuvex-pr-upload-error",k.textContent="\u2717 "+d.error,w.appendChild(k)}else w.style.display="none",w.textContent="";var f=c.querySelector(".renuvex-pr-fwizard-photo-remove");f.onclick=function(){var C=m[d.url]||(d.file?d.file.name+"_"+d.file.size:null);if(d.url.startsWith("blob:")&&URL.revokeObjectURL(d.url),C){var P=(e.get().fingerprints||[]).filter(function(N){return N!==C});e.set({fingerprints:P})}if(d.isPending){var E=(e.get().pendingImages||[]).filter(function(N){return N.url!==d.url});e.set({pendingImages:E})}else{var R=(e.get().images||[]).filter(function(N){return N!==d.url});e.set({images:R})}}}function h(){var c=(e.get().images||[]).length,d=(e.get().pendingImages||[]).length,y=c+d,b=y>=It;y>0?(o.classList.add("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=ue(st)):(o.classList.remove("renuvex-pr-fwizard-photo-card--compact"),l.innerHTML=ue(ut)+"<span>Foto\u011Fraf Ekle</span>"),b?(l.style.display="none",l.disabled=!0,v.disabled=!0):(l.style.display="flex",l.disabled=!1,v.disabled=!1,l.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){v.disabled||v.click()}),v.onchange=async function(c){var d=(e.get().images||[]).length+(e.get().pendingImages||[]).length,y=Array.from(c.target.files).slice(0,It-d);v.value="";var b=(e.get().pendingImages||[]).length,w=e.get().images||[],k=w.length;if(y.length!==0){for(var f=[],C=[],P=0;P<y.length;P++){var E=y[P],R=E.name+"_"+E.size,N=(e.get().fingerprints||[]).some(function(O){return O===R})||f.some(function(O){return O.file.name+"_"+O.file.size===R});if(N){console.log("[renuvex-pr] Duplicate file detected, skipping:",E.name);continue}if(E.size>sa){var S="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(S,"error"):alert(S);continue}var T=URL.createObjectURL(E);m[T]=R,f.push({url:T,file:E,error:null}),C.push({url:T,file:E});var I=(e.get().fingerprints||[]).slice();I.push(R),e.set({fingerprints:I})}if(f.length!==0){var L=(e.get().pendingImages||[]).concat(f),U=async function(){for(var O=0;O<C.length;O++){var _=C[O],W=_.file,q=_.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var je=(e.get().pendingImages||[]).filter(function(H){return H.url!==q}),Te=(e.get().images||[]).slice();Te.push(q),e.set({pendingImages:je,images:Te});continue}try{var he=await Ze(Xe+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe})});if(!he.ok)throw he.status===429?new Error("rate_limit"):new Error("sign failed");var D=await he.json();if(!D.folder)throw new Error("sign folder missing");var j=new FormData;j.append("file",W),j.append("api_key",D.api_key),j.append("timestamp",D.timestamp),j.append("signature",D.signature),j.append("folder",D.folder);var de=await fetch("https://api.cloudinary.com/v1_1/"+D.cloud_name+"/image/upload",{method:"POST",body:j}),re=await de.json();if(re.secure_url&&mt(re.secure_url)){var be=(e.get().pendingImages||[]).some(function(H){return H.url===q});if(!be){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}g[re.secure_url]=q,m[re.secure_url]=m[q];var Ve=(e.get().pendingImages||[]).filter(function(H){return H.url!==q}),te=(e.get().images||[]).slice();te.push(re.secure_url),e.set({pendingImages:Ve,images:te});try{Ze(Xe+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,secureUrl:re.secure_url})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[renuvex-pr] Image upload failed:",H);var ye=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(ye,"error");var Ue=(e.get().pendingImages||[]).map(function(X){return X.url===q?{url:X.url,file:X.file,error:ye}:X});e.set({pendingImages:Ue})}}};if(k===0&&b===0){t=!0;var G=!r.canNavigate||r.canNavigate();G&&e.goNext()}e.set({pendingImages:L}),U()}}};var x=e.onChange(i);return i(),{el:n,destroy:function(){t=!0,v.onchange=null,x&&x()}}}var Hr=2e3,va=60;function Ft(e,r){r=r||{};var t=r.onValidityChange||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var a=document.createElement("div");a.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",n.appendChild(a);var p=document.createElement("div");p.className="renuvex-pr-fwizard-content-form";var o=document.createElement("input");o.type="text",o.className="renuvex-pr-fwizard-input",o.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",o.maxLength=va,o.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),o.value=e.get().title||"",o.addEventListener("input",function(){e.set({title:o.value})}),p.appendChild(o);var l=document.createElement("textarea");l.className="renuvex-pr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Hr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",p.appendChild(l);var v=document.createElement("div");v.className="renuvex-pr-fwizard-char-counter",v.setAttribute("aria-live","polite"),p.appendChild(v);function u(){var m=l.value.length;v.textContent=m+"/"+Hr,v.classList.toggle("renuvex-pr-fwizard-char-counter--max",m>=Hr)}function g(){return He(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),u(),t(g())}),n.appendChild(p),u(),setTimeout(function(){t(g())},0),{el:n,destroy:function(){}}}var ca=40;function Ot(e,r){r=r||{};var t=r.onValidityChange||function(){},n=r.onSuccess||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",p.textContent="Hakk\u0131n\u0131zda",a.appendChild(p);var o=document.createElement("div");o.className="renuvex-pr-fwizard-author-form";var l=document.createElement("div");l.className="renuvex-pr-fwizard-field";var v=document.createElement("label");v.className="renuvex-pr-fwizard-label",v.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="renuvex-pr-fwizard-input",u.maxLength=ca,u.setAttribute("aria-required","true"),u.value=e.get().author||"",l.appendChild(v),l.appendChild(u),o.appendChild(l);var g=document.createElement("div");g.className="renuvex-pr-fwizard-field";var m=document.createElement("label");m.className="renuvex-pr-fwizard-label",m.textContent="E-posta (opsiyonel)";var i=document.createElement("input");i.type="email",i.className="renuvex-pr-fwizard-input",i.setAttribute("autocomplete","email"),i.value=e.get().email||"",g.appendChild(m),g.appendChild(i),o.appendChild(g);var z=document.createElement("div");z.className="renuvex-pr-fwizard-notice",z.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",o.appendChild(z);var s=document.createElement("div");s.className="renuvex-pr-fwizard-msg",s.setAttribute("role","alert"),s.setAttribute("aria-live","assertive"),o.appendChild(s);var h=document.createElement("button");h.type="button",h.className="renuvex-pr-fwizard-submit-btn",h.textContent="G\xF6nder",o.appendChild(h),a.appendChild(o);function x(){return He(4,e.get())}function c(){var w=!x(),k=(e.get().pendingImages||[]).length,f=k>0;f?(h.disabled=!0,h.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),h.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(h.disabled=w,h.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",w),h.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),c(),t(x())}),i.addEventListener("input",function(){e.set({email:i.value})}),c(),setTimeout(function(){t(x())},0);function d(){s.textContent=""}function y(w){d();var k=document.createElement("div");k.className="renuvex-pr-fwizard-msg-error",k.textContent=w||"",s.appendChild(k)}h.onclick=async function(){if(!h.disabled){var w=e.get(),k=(w.author||"").trim(),f=(w.comment||"").trim();if(i.value.trim()&&!i.checkValidity()){i.reportValidity();return}if(!k){y("Gerekli alan");return}if(!w.rating){y("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}h.disabled=!0,h.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var C=h.textContent;if(h.textContent="G\xF6nderiliyor\u2026",d(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){n()},600);return}try{var P=vt(window.location.href),E=w.productName||null,R=await Ze(Xe+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:qe,productId:w.productId||null,slug:P||null,productName:E,author:k,title:(w.title||"").trim()||null,comment:f||null,rating:w.rating,images:w.images||[]})},15e3);if(R.ok)n();else{var N=await R.json().catch(function(){return{}});throw new Error(N.error||"Yorum kaydedilemedi.")}}catch(I){var S=I&&(I.name==="AbortError"||/signal/i.test(I.message||"")),T=S?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":I.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(T,"error"):y(T),h.disabled=!1,h.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),h.textContent=C}}};var b=e.onChange(c);return{el:a,destroy:function(){h.onclick=null,b&&b()}}}function ma(e,r,t){if(t=t||{},e===1)return Bt(r,{canNavigate:t.canNavigate});if(e===2)return Mt(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return Ft(r,{onValidityChange:t.onValidityChange});if(e===4)return Ot(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var n=document.createElement("div");return n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:n,destroy:function(){}}}function _t(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Ht(e){e=e||{};var r=Pt({productId:e.productId,productName:e.productName}),t={},n={},a=Nt({onClose:function(){window.removeEventListener("popstate",o),hr(p),Object.keys(t).forEach(function(k){var f=t[k];f&&f.startsWith("blob:")&&URL.revokeObjectURL(f)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),p=gr(),o=function(k){a&&a.close&&a.close()};window.addEventListener("popstate",o);var l=document.createElement("div");l.className="renuvex-pr-fwizard-step-wrap";var v=Rt({skippableSteps:[2],nextableSteps:[3],onBack:function(){m==="idle"&&r.goBack()},onSkip:function(){m==="idle"&&r.goNext()},onNext:function(){m==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="renuvex-pr-fwizard-layout",u.appendChild(l),u.appendChild(v.el);var g=null,m="idle",i=null,z=!0,s=null;function h(k,f){l.innerHTML="";var C=ma(k,r,{canNavigate:function(){return m==="idle"},blobMap:t,urlToFinger:n,onValidityChange:function(R){v.setNextDisabled(!R)},onSuccess:c,showToast:a.showToast});if(g=C,v.update(k,r.get()),f){m="entering",C.el.classList.add("renuvex-pr-fwizard-step--enter");var P=null,E=function(){P&&clearTimeout(P),C.el.removeEventListener("animationend",E),C.el.classList.remove("renuvex-pr-fwizard-step--enter"),m="idle",i!==null&&d()};C.el.addEventListener("animationend",E),P=setTimeout(E,700)}else m="idle";l.appendChild(C.el),a.setStepAttr&&a.setStepAttr(k),k===3&&v.setNextDisabled(!0)}var x=!1;function c(){if(!x){if(x=!0,!g){l.innerHTML="";var k=_t();k.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(k),a.setStepAttr("thanks"),v.setThanksState(a.close);return}var f=g;m="exiting",f.el.classList.add("renuvex-pr-fwizard-step--exit");var C=function(){if(s&&clearTimeout(s),f.el.removeEventListener("animationend",C),f.destroy)try{f.destroy()}catch(E){}g===f&&(g=null),l.innerHTML="";var P=_t();P.classList.add("renuvex-pr-fwizard-step--enter"),l.appendChild(P),a.setStepAttr("thanks"),v.setThanksState(a.close),m="idle"};f.el.addEventListener("animationend",C),s=setTimeout(C,300)}}function d(){var k=r.get().currentStep;if(m!=="idle"){i=k;return}if(!g){var f=!z;z=!1,h(k,f);return}var C=g;m="exiting",C.el.classList.add("renuvex-pr-fwizard-step--exit");var P=function(){if(s&&clearTimeout(s),C.el.removeEventListener("animationend",P),C.destroy)try{C.destroy()}catch(R){}if(g===C){l.innerHTML="",g=null;var E=i!==null?i:r.get().currentStep;i=null,h(E,!0),m="idle"}};C.el.addEventListener("animationend",P),s=setTimeout(P,350)}d();var y=r.get().currentStep,b=r.onChange(function(k){k.currentStep!==y?(y=k.currentStep,d()):v.update(k.currentStep,k)}),w=a.close;return a.close=function(){b&&b(),typeof s!="undefined"&&s&&clearTimeout(s),w()},a.open(u),{close:a.close}}function Y(){Ht({productId:ae||"",productName:Pe||""})}var xa={id:"classic",name:"Klasik (A\xE7\u0131k)"};function fa(e){var r=e.widget,t=e.data,n=e.settings,a=e.iconPair,p=e.allCount,o=e.ratingCounts,l=e.avgRatingVal,v=e.currentRatingFilter,u=e.currentOrderBy,g=e.currentHasImages,m=e.onFilterChange,i=e.onSortChange;fe(a);var z=document.createElement("div");z.className="renuvex-pr-summary";var s=(o[3]||0)+(o[4]||0),h=p>0?Math.round(s/p*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+J("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",z.appendChild(x);var c=document.createElement("div");if(c.className="renuvex-pr-summary-block renuvex-pr-summary-count",c.textContent=p.toLocaleString("tr-TR")+" Yorum",z.appendChild(c),n.showRecommendation!==!1&&h>0){var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",d.innerHTML='<span class="renuvex-pr-recommend-pct">%'+h+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",z.appendChild(d)}return z.appendChild(_e({ratingCounts:o,allCount:p,iconPair:a,currentRatingFilter:v,onFilterChange:m})),z.appendChild(ee({widget:r,currentOrderBy:u,currentHasImages:g,onWriteClick:Y,onSortChange:i})),z}var Dr={};xe(Dr,{css:()=>ha,meta:()=>ga,render:()=>ba});var Yt=`
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
`;var ga={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},ha=Yt;function ba(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,p=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,v=e.currentOrderBy,u=e.currentHasImages,g=e.onFilterChange,m=e.onSortChange,i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-compact";var z=document.createElement("div");z.className="renuvex-pr-compact-header";var s=document.createElement("div");s.className="renuvex-pr-compact-trigger-wrap";var h=document.createElement("button");h.className="renuvex-pr-compact-trigger",h.type="button",h.setAttribute("aria-expanded","false"),h.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+Be(o,n)+'</span><span class="renuvex-pr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+ue(dt)+"</span>",s.appendChild(h),z.appendChild(s);var x=ee({widget:r,currentOrderBy:v,currentHasImages:u,onWriteClick:Y,onSortChange:m}),c=x.querySelector(".renuvex-pr-filter-wrap"),d=x.querySelector(".renuvex-pr-write-btn"),y=document.createElement("div");y.className="renuvex-pr-compact-actions-slot",d&&y.appendChild(d),c&&y.appendChild(c),z.appendChild(y),i.appendChild(z);var b=document.createElement("div");b.className="renuvex-pr-compact-panel",b.setAttribute("role","dialog"),b.setAttribute("aria-hidden","true");var w=document.createElement("div");w.className="renuvex-pr-compact-panel-inner";var k=document.createElement("div");k.className="renuvex-pr-compact-avg",k.innerHTML='<span class="renuvex-pr-icon">'+J("full")+"</span><span>"+o+"</span>",w.appendChild(k),w.appendChild(_e({ratingCounts:p,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:g})),b.appendChild(w);var f=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function C(_){var W=_?i:s;b.parentNode!==W&&(b.classList.contains("renuvex-pr-open")&&(b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),h.setAttribute("aria-expanded","false")),W.appendChild(b))}if(C(f?f.matches:!1),f){var P=function(_){C(_.matches)};f.addEventListener?f.addEventListener("change",P):f.addListener&&f.addListener(P)}if(d){var E=document.createElement("button");E.className="renuvex-pr-write-btn",E.textContent=A&&A.writeButtonText||"Yorum Yap",E.onclick=Y;var R=document.createElement("div");R.className="renuvex-pr-compact-write-row",R.appendChild(E),i.appendChild(R)}function N(){b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),h.setAttribute("aria-expanded","false")}function S(){yr(T),b.classList.add("renuvex-pr-open"),b.setAttribute("aria-hidden","false"),h.setAttribute("aria-expanded","true")}h.onclick=function(){b.classList.contains("renuvex-pr-open")?N():S()};var T=null;function I(_){T&&(T(),T=null),_||(T=wr({trigger:s,element:b,close:N}))}if(I(f?f.matches:!1),f){var L=function(_){I(_.matches)};f.addEventListener?f.addEventListener("change",L):f.addListener&&f.addListener(L)}if(t.showRecommendation!==!1){var U=(p[3]||0)+(p[4]||0),G=a>0?Math.round(U/a*100):0;if(G>0){var O=document.createElement("div");O.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",O.style.marginTop="8px",O.innerHTML='<span class="renuvex-pr-recommend-pct">%'+G+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",w.appendChild(O)}}return i}var jr={};xe(jr,{css:()=>wa,meta:()=>ya,render:()=>ka});var Dt=`
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
`;var ya={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},wa=Dt;function ka(e){var r=e.widget,t=e.settings,n=e.iconPair,a=e.allCount,p=e.ratingCounts,o=e.avgRatingVal,l=e.currentRatingFilter,v=e.currentOrderBy,u=e.currentHasImages,g=e.onFilterChange,m=e.onSortChange;fe(n);var i=document.createElement("div");i.className="renuvex-pr-summary renuvex-pr-summary-split";var z=document.createElement("div");z.className="renuvex-pr-split-col renuvex-pr-split-left";var s=document.createElement("div");s.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",s.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+J("full")+'</span><span class="renuvex-pr-avg-num">'+o+"</span>",z.appendChild(s);var h=document.createElement("div");h.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",h.textContent=a.toLocaleString("tr-TR")+" Yorum",z.appendChild(h),i.appendChild(z);var x=document.createElement("div");x.className="renuvex-pr-split-col renuvex-pr-split-mid",x.appendChild(_e({ratingCounts:p,allCount:a,iconPair:n,currentRatingFilter:l,onFilterChange:g})),i.appendChild(x);var c=ee({widget:r,currentOrderBy:v,currentHasImages:u,onWriteClick:Y,onSortChange:m}),d=c.querySelector(".renuvex-pr-filter-wrap"),y=c.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-split-col renuvex-pr-split-right",y&&b.appendChild(y),d&&b.appendChild(d),i.appendChild(b);var w=(p[3]||0)+(p[4]||0),k=a>0?Math.round(w/a*100):0,f=document.createElement("div");f.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",f.innerHTML='<span class="renuvex-pr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var C=t.showRecommendation===!1||k===0;return C&&f.classList.add("renuvex-pr-split-rec-hidden"),z.appendChild(f),i}var Vr={};xe(Vr,{css:()=>Ca,meta:()=>za,render:()=>Sa});var jt=`
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
`;var za={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Ca=jt;function Sa(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,p=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,v=document.createElement("div");v.className="renuvex-pr-summary renuvex-pr-summary-minimal";var u=document.createElement("div");u.className="renuvex-pr-minimal-info";var g=document.createElement("div");g.className="renuvex-pr-minimal-row";var m=document.createElement("span");m.className="renuvex-pr-minimal-avg",m.textContent=a,g.appendChild(m);var i=document.createElement("span");i.className="renuvex-pr-minimal-stars",i.innerHTML=Be(a,t),g.appendChild(i);var z=document.createElement("span");z.className="renuvex-pr-minimal-count",z.textContent=n.toLocaleString("tr-TR")+" Yorum",g.appendChild(z),u.appendChild(g),v.appendChild(u);var s=ee({widget:r,currentOrderBy:p,currentHasImages:o,onWriteClick:Y,onSortChange:l}),h=s.querySelector(".renuvex-pr-filter-wrap"),x=s.querySelector(".renuvex-pr-write-btn"),c=document.createElement("div");if(c.className="renuvex-pr-minimal-actions",x&&c.appendChild(x),h&&c.appendChild(h),v.appendChild(c),x){var d=document.createElement("button");d.className="renuvex-pr-write-btn",d.textContent=A&&A.writeButtonText||"Yorum Yap",d.onclick=Y;var y=document.createElement("div");y.className="renuvex-pr-minimal-write-row",y.appendChild(d),v.appendChild(y)}return v}var Ur={};xe(Ur,{css:()=>Ta,meta:()=>Ea,render:()=>Aa});var Vt=`
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
`;var Ea={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Ta=Vt;function Aa(e){var r=e.widget,t=e.iconPair,n=e.allCount,a=e.avgRatingVal,p=e.currentOrderBy,o=e.currentHasImages,l=e.onSortChange,v=document.createElement("div");v.className="renuvex-pr-summary renuvex-pr-summary-hero";var u=document.createElement("div");u.className="renuvex-pr-hero-info";var g=document.createElement("div");g.className="renuvex-pr-hero-rating-col";var m=document.createElement("span");m.className="renuvex-pr-hero-avg",m.textContent=a,g.appendChild(m);var i=document.createElement("div");i.className="renuvex-pr-hero-meta-row";var z=document.createElement("span");z.className="renuvex-pr-hero-stars",z.innerHTML=Be(a,t),i.appendChild(z);var s=document.createElement("div");s.className="renuvex-pr-hero-count",s.textContent=n.toLocaleString("tr-TR")+" Yorum",i.appendChild(s),g.appendChild(i),u.appendChild(g),v.appendChild(u);var h=ee({widget:r,currentOrderBy:p,currentHasImages:o,onWriteClick:Y,onSortChange:l}),x=h.querySelector(".renuvex-pr-filter-wrap"),c=h.querySelector(".renuvex-pr-write-btn"),d=document.createElement("div");d.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",c&&d.appendChild(c),x&&d.appendChild(x),v.appendChild(d);var y=ee({widget:r,currentOrderBy:p,currentHasImages:o,onWriteClick:Y,onSortChange:l}),b=y.querySelector(".renuvex-pr-filter-wrap"),w=y.querySelector(".renuvex-pr-write-btn"),k=document.createElement("div");return k.className="renuvex-pr-hero-write-row",w&&k.appendChild(w),b&&k.appendChild(b),v.appendChild(k),v}var kr={classic:Yr,compact:Dr,split:jr,minimal:Vr,hero:Ur};function zr(e){return kr[e]||kr.classic}function Ut(){return Object.keys(kr).map(function(e){return kr[e].css||""}).join(`
`)}var Gr={};xe(Gr,{css:()=>Na,meta:()=>La,render:()=>Pa});function Ye(e,r,t){var n=t||{},a=document.createDocumentFragment(),p=document.createElement("div");p.className=r+" renuvex-pr-body-clamped",p.textContent=e,a.appendChild(p);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",a.appendChild(o),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(o.style.display="inline-block",typeof n.onReadMore=="function")o.onclick=n.onReadMore;else{var l=!1;o.onclick=function(){l=!l,p.classList.toggle("renuvex-pr-body-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:a,body:p,readMore:o}}function De(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var n=document.createElement("div");n.className="renuvex-pr-reply-header";var a=document.createElement("span");a.className="renuvex-pr-reply-label",a.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi",n.appendChild(a),t.appendChild(n);var p=document.createElement("div");p.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",p.textContent=e,t.appendChild(p);var o=document.createElement("button");return o.type="button",o.className="renuvex-pr-read-more renuvex-pr-reply-read-more",o.textContent="Devam\u0131n\u0131 oku",o.style.display="none",t.appendChild(o),requestAnimationFrame(function(){if(p.scrollHeight>p.clientHeight+2)if(o.style.display="inline",typeof r=="function")o.onclick=r;else{var l=!1;o.onclick=function(){l=!l,p.classList.toggle("renuvex-pr-reply-text-clamped",!l),o.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var La={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Na="";function Pa(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var n=document.createElement("div");n.className="renuvex-pr-review-top";var a=document.createElement("div");a.className="renuvex-pr-review-top-left";var p=document.createElement("span");p.className="renuvex-pr-review-stars",p.innerHTML=se(e.rating,A),a.appendChild(p);var o=document.createElement("time");if(o.className="renuvex-pr-date",e.createdAt&&o.setAttribute("datetime",e.createdAt),o.textContent=ve(e.createdAt),n.appendChild(a),n.appendChild(o),t.appendChild(n),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-title",l.textContent=e.title,t.appendChild(l)}var v=document.createElement("div");v.className="renuvex-pr-author",v.textContent=e.author||"",t.appendChild(v);var u=(e.comment||"").trim();u&&t.appendChild(Ye(u,"renuvex-pr-body").fragment);var g=ge(e);if(g.length){var m=document.createElement("div");m.className="renuvex-pr-gallery",g.forEach(function(z){var s=document.createElement("img"),h=ne(z,V);s.src=h.src,s.srcset=h.srcset,s.loading="lazy",s.decoding="async",s.width=V,s.height=V,s.className="renuvex-pr-img",ie(s),s.setAttribute("data-renuvex-img-url",z),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(x){var c=function(){le(e,x,r)};s.onclick=c,s.onkeydown=function(d){(d.key==="Enter"||d.key===" "||d.key==="Spacebar")&&(d.preventDefault(),c())}})(z),m.appendChild(s)}),t.appendChild(m)}var i=De(e.merchantReply);return i&&t.appendChild(i),t}var Wr={};xe(Wr,{css:()=>Ba,meta:()=>Ra,render:()=>Ia});var Gt=`
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
`;var Ra={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Ba=Gt;function Ia(e,r){var t=ge(e),n=t.length>0,a=document.createElement("article");a.className="renuvex-pr-review-list"+(n?"":" renuvex-pr-review-list--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-list-author";var o=document.createElement("span");o.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",o.innerHTML=se(e.rating,A),p.appendChild(o);var l=document.createElement("span");l.className="renuvex-pr-review-list-author-name",l.textContent=e.author||"",p.appendChild(l);var v=document.createElement("time");v.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&v.setAttribute("datetime",e.createdAt),v.textContent=ve(e.createdAt),p.appendChild(v),a.appendChild(p);var u=document.createElement("div");if(u.className="renuvex-pr-review-list-content",e.title){var g=document.createElement("div");g.className="renuvex-pr-review-list-title",g.textContent=e.title,u.appendChild(g)}var m=(e.comment||"").trim();m&&u.appendChild(Ye(m,"renuvex-pr-review-list-body").fragment);var i=De(e.merchantReply);if(i&&u.appendChild(i),a.appendChild(u),n){var z=document.createElement("div");z.className="renuvex-pr-review-list-media",t.forEach(function(s){var h=document.createElement("img"),x=ne(s,V);h.src=x.src,h.srcset=x.srcset,h.loading="lazy",h.decoding="async",h.width=V,h.height=Math.round(V*4/3),h.setAttribute("data-renuvex-img-url",s),ie(h),h.setAttribute("role","button"),h.setAttribute("tabindex","0"),h.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(c){var d=function(){le(e,c,r)};h.onclick=d,h.onkeydown=function(y){(y.key==="Enter"||y.key===" "||y.key==="Spacebar")&&(y.preventDefault(),d())}})(s),z.appendChild(h)}),a.appendChild(z)}return a}var qr={};xe(qr,{css:()=>Fa,meta:()=>Ma,render:()=>Oa});var Wt=`
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
`;var Ma={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Fa=Wt;function Oa(e,r){var t=pr(e),n=!!t,a=document.createElement("article");a.className="renuvex-pr-review-gallery"+(n?"":" renuvex-pr-review-gallery--no-media");var p=document.createElement("div");p.className="renuvex-pr-review-gallery-content";var o=document.createElement("span");if(o.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",o.innerHTML=se(e.rating,A),p.appendChild(o),e.title){var l=document.createElement("div");l.className="renuvex-pr-review-gallery-title",l.textContent=e.title,p.appendChild(l)}var v=document.createElement("div");v.className="renuvex-pr-review-gallery-author",v.textContent=e.author||"",p.appendChild(v);var u=document.createElement("time");u.className="renuvex-pr-review-gallery-date",u.style.display="block",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ve(e.createdAt),p.appendChild(u);var g=(e.comment||"").trim();if(g&&p.appendChild(Ye(g,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){le(e,t,r)}}:null).fragment),a.appendChild(p),n){var m=document.createElement("div");m.className="renuvex-pr-review-gallery-media";var i=document.createElement("img"),z=ne(t,dr);i.src=z.src,i.srcset=z.srcset,i.loading="lazy",i.decoding="async",i.width=dr,i.height=Math.round(dr*4/3),ie(i),i.setAttribute("data-renuvex-img-url",t),i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt");var s=function(){le(e,t,r)};i.onclick=s,i.onkeydown=function(x){(x.key==="Enter"||x.key===" "||x.key==="Spacebar")&&(x.preventDefault(),s())},m.appendChild(i),a.appendChild(m)}var h=De(e.merchantReply,t?function(){le(e,t,r)}:null);return h&&(h.classList.add("renuvex-pr-review-gallery-reply"),a.appendChild(h)),a}var Cr={card:Gr,list:Wr,gallery:qr};function er(e){return Cr[e]||Cr.card}function qt(){return Object.keys(Cr).map(function(e){return Cr[e].css||""}).join(`
`)}function Ee(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var n=parseInt(t[1],16),a=parseInt(t[2],16),p=parseInt(t[3],16);return"rgba("+n+","+a+","+p+","+r+")"}function _a(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");n.setAttribute("width","32"),n.setAttribute("height","32"),n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","2"),n.setAttribute("stroke-linecap","round"),n.setAttribute("stroke-linejoin","round"),n.style.cssText="color:#6e6d7a;margin-bottom:4px;";var a=document.createElementNS(t,"path");a.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var p=document.createElementNS(t,"line");p.setAttribute("x1","1"),p.setAttribute("y1","1"),p.setAttribute("x2","23"),p.setAttribute("y2","23"),n.appendChild(a),n.appendChild(p);var o=document.createElement("div");o.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",o.textContent="Widget \u015Fu anda Pasif durumda";var l=document.createElement("div");return l.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",l.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(n),r.appendChild(o),r.appendChild(l),r}function Ha(){return ht()?document.querySelector('[data-renuvex-widget="reviews"]'):null}function Ya(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=ft({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),gt(t,{surface:"reviews",productId:r||""}),t}var Xt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Kt={small:80,medium:110,large:140};function Da(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var n=document.createElement("div");n.className="renuvex-pr-state-error-text",n.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(n);var a=document.createElement("button");return a.type="button",a.className="renuvex-pr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},t.appendChild(a),t}function ja(e,r){var t=r.headerTitleColor||"#111111",n=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",p=r.headerRecommendColor||"#111111",o=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",v=r.barCountColor||"#111111",u=Ee(o,.06),g=r.reviewStarColor||"#f59e0b",m=r.btnBgColor||"#111111",i=r.btnTextColor||"#ffffff",z=r.btnBorderColor||"#111111",s=r.filterBtnBgColor||"#111111",h=r.filterBtnTextColor||"#ffffff",x=r.filterBtnBorderColor||"#111111",c=r.filterMenuBgColor||"#ffffff",d=r.filterMenuBorderColor||"#e5e7eb",y=r.filterItemTextColor||"#111111",b=r.filterItemHoverBgColor||"#f3f4f6",w=r.filterItemActiveColor||"#111111",k=r.reviewTitleColor||"#111111",f=r.reviewAuthorColor||"#111111",C=r.reviewDateColor||"#5e5e5e",P=r.reviewBodyColor||"#111111",E=r.reviewBorderColor||"#e5e7eb",R=r.replyBgColor||"#f9fafb",N=r.replyBorderColor||"#747474",S=r.replyLabelColor||"#111111",T=r.replyTextColor||"#111111",I=r.photoTitleColor||"#111111",L=Ee("#111111",.05),U=r.photoArrowBgColor||"#ffffff",G=r.photoArrowTextColor||"#111111",O=Ee("#111111",.12),_=r.formBgColor||"#ffffff",W=r.formPrimaryTextColor||"#111111",q=r.formSecondaryTextColor||"#3b3b3b",je=r.inputTextColor||W,Te=r.inputBorderColor||"#d1d5db",he=r.placeholderColor||"#9ca3af",D=r.formStepBarColor||"#111111",j=r.formBtnBgColor||"#111111",de=r.formBtnTextColor||"#ffffff",re=r.formBtnBorderColor||"#111111",be=Ee(j,.06),Ve=Ee(j,.18),te=Ee(de,.85),ye=Ee(W,.06),Ue=r.loadMoreBgColor||"#ffffff",H=r.loadMoreTextColor||"#111111",X=r.loadMoreBorderColor||"#111111",Ge={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":n,"--renuvex-pr-header-count":a,"--renuvex-pr-header-recommend":p,"--renuvex-pr-bar-fill":o,"--renuvex-pr-bar-track":l,"--renuvex-pr-bar-count":v,"--renuvex-pr-bar-hover-bg":u,"--renuvex-pr-btn-bg":m,"--renuvex-pr-btn-text":i,"--renuvex-pr-btn-border":z,"--renuvex-pr-filter-btn-bg":s,"--renuvex-pr-filter-btn-text":h,"--renuvex-pr-filter-btn-border":x,"--renuvex-pr-filter-menu-bg":c,"--renuvex-pr-filter-menu-border":d,"--renuvex-pr-filter-item-text":y,"--renuvex-pr-filter-item-hover-bg":b,"--renuvex-pr-filter-item-active":w,"--renuvex-pr-review-title":k,"--renuvex-pr-review-author":f,"--renuvex-pr-review-date":C,"--renuvex-pr-review-body":P,"--renuvex-pr-review-border":E,"--renuvex-pr-review-star-color":g,"--renuvex-pr-reply-bg-color":R,"--renuvex-pr-reply-border":N,"--renuvex-pr-reply-label":S,"--renuvex-pr-reply-text":T,"--renuvex-pr-photo-title":I,"--renuvex-pr-photo-image-border":L,"--renuvex-pr-photo-arrow-bg":U,"--renuvex-pr-photo-arrow-text":G,"--renuvex-pr-photo-arrow-border":O,"--renuvex-pr-fwizard-bg":_,"--renuvex-pr-fwizard-text":W,"--renuvex-pr-fwizard-secondary-text":q,"--renuvex-pr-fwizard-input-bg":_,"--renuvex-pr-fwizard-input-text":je,"--renuvex-pr-fwizard-input-border":Te,"--renuvex-pr-fwizard-placeholder":he,"--renuvex-pr-fwizard-close-text":W,"--renuvex-pr-fwizard-close-hover-bg":ye,"--renuvex-pr-fwizard-progress-bg":ye,"--renuvex-pr-fwizard-progress-active":D,"--renuvex-pr-fwizard-btn-bg":j,"--renuvex-pr-fwizard-btn-text":de,"--renuvex-pr-fwizard-btn-border":re,"--renuvex-pr-fwizard-btn-disabled-bg":Ve,"--renuvex-pr-fwizard-btn-disabled-text":te,"--renuvex-pr-fwizard-nav-hover-bg":be,"--renuvex-pr-load-more-bg":Ue,"--renuvex-pr-load-more-text":H,"--renuvex-pr-load-more-border":X};Object.keys(Ge).forEach(function(me){e.style.setProperty(me,Ge[me])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function rr(e,r,t,n,a,p,o){if(lt){ir({productId:e,settings:r,reviewsData:t,productName:n,orderBy:a,page:p,badgeSettings:o});return}nr(!0),et(e),rt(r),o!==void 0&&tt(o),at(n),a&&Pr(a),p&&Ke(p),t!=null&&nt(t);try{let Tr=function(B,F){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var M=B.meta.sizeOverrides[F];M&&Object.keys(M).forEach(function($){i.style.setProperty($,M[$])})}};var Va=Tr,l=zr(r.summaryLayout),v=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),u=r.showTitle!==!1,g=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",m=v&&u?g:"",i=document.documentElement;ja(i,r);var z=r.borderRadius!==void 0?r.borderRadius:8,s=Xt[r.size]||Xt.medium,h=Kt[r.thumbnailSize]||Kt.medium,x=er(r.reviewLayout);if(x.meta&&x.meta.sizeOverrides&&x.meta.sizeOverrides[r.size]){var c=x.meta.sizeOverrides[r.size],d=c["--renuvex-pr-list-photo-w"]||c["--renuvex-pr-gallery-photo-w"];d&&(h=parseInt(d))}i.style.setProperty("--renuvex-pr-title-size",s.titleSize+"px"),i.style.setProperty("--renuvex-pr-review-text-size",s.reviewTextSize+"px"),i.style.setProperty("--renuvex-pr-review-title-size",s.reviewTitleSize+"px"),i.style.setProperty("--renuvex-pr-author-size",s.authorSize+"px"),i.style.setProperty("--renuvex-pr-reply-name-size",s.replyNameSize+"px"),i.style.setProperty("--renuvex-pr-reply-text-size",s.replyTextSize+"px"),i.style.setProperty("--renuvex-pr-radius",z+"px"),i.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,z-4)+"px"),i.style.setProperty("--renuvex-pr-photo-title-size",s.photoTitleSize+"px"),i.style.setProperty("--renuvex-pr-avg-rating-size",s.avgRatingSize+"px"),i.style.setProperty("--renuvex-pr-review-count-size",s.reviewCountSize+"px"),i.style.setProperty("--renuvex-pr-compact-count-size",s.compactCountSize+"px"),i.style.setProperty("--renuvex-pr-recommend-size",s.recommendSize+"px"),i.style.setProperty("--renuvex-pr-btn-text-size",s.btnTextSize+"px"),i.style.setProperty("--renuvex-pr-bar-label-size",s.barLabelSize+"px"),i.style.setProperty("--renuvex-pr-minimal-avg-size",s.minimalAvgSize+"px"),i.style.setProperty("--renuvex-pr-hero-avg-size",s.heroAvgSize+"px"),i.style.setProperty("--renuvex-pr-bar-count-size",s.barCountSize+"px"),i.style.setProperty("--renuvex-pr-review-date-size",s.reviewDateSize+"px"),i.style.setProperty("--renuvex-pr-filter-text-size",s.filterTextSize+"px"),i.style.setProperty("--renuvex-pr-load-more-size",s.loadMoreSize+"px"),i.style.setProperty("--renuvex-pr-read-more-size",s.readMoreSize+"px"),i.style.setProperty("--renuvex-pr-thumbnail-size",h+"px");var y=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";i.style.setProperty("--renuvex-pr-review-star-color",y),i.style.setProperty("--renuvex-pr-star-size",s.reviewStarSize+"px"),i.style.setProperty("--renuvex-pr-avg-star-size",s.avgStarSize+"px"),Tr(zr(r.summaryLayout),r.size),Tr(er(r.reviewLayout),r.size);var b=Je(r),w=Ha();if(!w)return;var k=Ya(w,e),f=document.getElementById("renuvex-reviews");f||(f=document.createElement("div"),f.id="renuvex-reviews",f.style.minHeight="200px"),f.parentNode!==k&&k.appendChild(f);var C=bt(f),P=Ie+Ae+vr+Ut()+qt();Me(C,P);var E=wt(C);if(r.enabled===!1){f.style.minHeight="auto",E.replaceChildren(_a(r.borderRadius!==void 0?r.borderRadius:8)),nr(!1);var R=ar;ir(null),R&&rr(R.productId,R.settings,R.reviewsData,R.productName,R.orderBy,R.page,R.badgeSettings);return}var N=document.createElement("p");N.className="renuvex-pr-state-msg renuvex-pr-state-loading",N.textContent="Yorumlar y\xFCkleniyor...",E.replaceChildren(N);try{var S=t||{},T=Ir(S),I=T?[]:S.data&&S.data.reviews||[];it(I),E.replaceChildren();var L=document.createElement("section");if(L.id="renuvex-reviews-widget",L.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),L.className="renuvex-pr-reviews-widget",L.setAttribute("data-renuvex-surface","reviews"),e&&L.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),m){var U=document.createElement("div"),G=r.summaryLayout||"classic";U.className="renuvex-pr-title renuvex-pr-title-"+G,U.textContent=m,L.appendChild(U)}if(T){L.appendChild(Da(S.message,async function(){var B=await $e(ae,ke,1,Le,Ne);await rr(ae,A,B,Pe,ke,1,Jr)})),E.appendChild(L),ze(C),Lr(L,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return C.getElementById("renuvex-reviews-widget")});return}var O=S.data&&S.data.allCount||0,_=S.data&&S.data.ratingCounts||null,W=_||[0,0,0,0,0],q=S.data&&S.data.avgRating||"0.0";if(!_&&I.length>0){I.forEach(function(B){B.rating>=1&&B.rating<=5&&W[B.rating-1]++});var je=I.reduce(function(B,F){return B+F.rating},0);q=(je/I.length).toFixed(1)}if(O>0){var Te=zr(r.summaryLayout),he=Te.render({widget:L,data:S,settings:r,iconPair:b,allCount:O,ratingCounts:W,avgRatingVal:q,currentRatingFilter:Le,currentOrderBy:ke,currentHasImages:Ne,onFilterChange:async function(B){var F=Le===B?null:B;$r(F),Ke(1);var M=await $e(ae,ke,1,F,Ne);await rr(ae,A,M,Pe,ke,1)},onSortChange:async function(B,F){Ke(1);var M=B,$=!1;F&&($=!0,M="newest"),Qr($),Pr(M);var Ar=await $e(ae,M,1,Le,$);await rr(ae,A,Ar,Pe,M,1)}});L.appendChild(he)}else{var D=document.createElement("button");D.className="renuvex-pr-write-btn",D.style.cssText="display:block;margin:16px auto 0;",D.textContent=r.writeButtonText||"Yorum Yap",D.onclick=Y,L.appendChild(D)}var j=(Zr||[]).filter(function(B){return ge(B).length>0});if(r.showPhotoGallery!==!1&&!Ne&&j.length>0){var de=document.createElement("div");if(de.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var re=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",be=document.createElement("div");be.className="renuvex-pr-photo-title",be.textContent=re,de.appendChild(be)}var Ve=r.reviewLayout==="card"?"1/1":"3/4";i.style.setProperty("--renuvex-pr-photo-thumb-aspect",Ve);var te=document.createElement("div");te.className="renuvex-pr-photo-strip";var ye=V,Ue=r.reviewLayout==="card"?V:Math.round(V*4/3),H=0;j.forEach(function(B){if(!(H>=15)){var F=pr(B);if(F){var M=document.createElement("img"),$=ne(F,V);M.src=$.src,M.srcset=$.srcset,M.loading=H<3?"eager":"lazy",M.decoding="async",M.width=ye,M.height=Ue,M.className="renuvex-pr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",ie(M),(function(Ar,Zt){M.onclick=function(){le(Zt,Ar,j)}})(F,B),te.appendChild(M),H++}}});var X=document.createElement("button");X.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev";var Ge=Z(Re);Ge&&X.appendChild(Ge),X.setAttribute("aria-label","\xD6nceki"),X.onclick=function(){te.scrollBy({left:-200,behavior:"smooth"})};var me=document.createElement("button");me.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next";var Xr=Z(lr);Xr&&me.appendChild(Xr),me.setAttribute("aria-label","Sonraki"),me.onclick=function(){te.scrollBy({left:200,behavior:"smooth"})};var We=document.createElement("div");We.className="renuvex-pr-photo-strip-wrap",We.appendChild(X),We.appendChild(te),We.appendChild(me),de.appendChild(We),L.appendChild(de)}if(I.length===0){var Sr=document.createElement("p");Sr.className="renuvex-pr-state-msg",Sr.textContent="Hen\xFCz yorum yok.",L.appendChild(Sr)}else{var x=er(r.reviewLayout);I.forEach(function(F){L.appendChild(x.render(F,Nr))})}var Jt=S.data&&S.data.hasMore;if(Jt){var K=document.createElement("button");K.className="renuvex-pr-load-more",K.textContent="Daha Fazla G\xF6ster",K.onclick=async function(){K.disabled=!0,K.textContent="Y\xFCkleniyor...";var B=Kr+1,F=await $e(ae,ke,B,Le,Ne);if(F&&!Ir(F)&&F.data&&Array.isArray(F.data.reviews)){ot(F.data.reviews),Ke(B);var M=er(A.reviewLayout);F.data.reviews.forEach(function($){L.insertBefore(M.render($,Nr),K)}),F.data.hasMore?(K.disabled=!1,K.textContent="Daha Fazla G\xF6ster"):K.remove()}else K.disabled=!1,K.textContent="Tekrar Dene"},L.appendChild(K)}E.appendChild(L),ze(C),Lr(L,"reviews-widget",{productId:e||""},function(){return C.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Er=document.createElement("p");Er.style.cssText="text-align:center;color:#dc2626;",Er.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",E&&E.replaceChildren(Er)}}finally{if(nr(!1),ar){var we=ar;ir(null),rr(we.productId,we.settings,we.reviewsData,we.productName,we.orderBy,we.page,we.badgeSettings)}}}export{rr as render};
