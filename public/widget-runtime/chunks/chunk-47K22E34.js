/* Renuvex Product Reviews ESM runtime | theme: default */
import{a as er,d as rr}from"./chunk-FW6W6ZQL.js";import{a as he,b as mt,c as sr,d as vr,e as xt,f as $e,g as ft,j as gt,k as ht,l as bt}from"./chunk-7N7IQTLV.js";import{$ as st,A as tt,B as at,C as nt,D as it,E as ot,F as ar,G as nr,H as ir,N as xe,O as X,P as J,Q as Se,R as or,S as Je,T as lt,V as pt,W as de,X as fe,Y as dt,Z as ut,_ as ue,a as ve,aa as ge,b as ce,ba as lr,c as me,ca as q,da as pr,e as Lr,ea as dr,f as Ke,fa as Rr,g as Kr,ga as Br,h as ze,ha as ne,i as Xr,ia as vt,j as Be,ja as ie,k as Ie,ka as ct,l as Q,la as Ze,m as N,n as Pr,na as ur,o as Me,oa as Ee,q as Nr,r as Jr,s as Xe,t as Ce,u as tr,v as Zr,w as $r,x as Qr,y as et,z as rt}from"./chunk-QPSUBF2V.js";var Qt=15,ea=60*1e3,yt="__renuvexProductReviewsFetchError",Ir={};function cr(e){return{type:yt,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function mr(e){return!!(e&&e.type===yt)}async function Te(e,r,t,a,n,i){if(window.__ikasPreviewMode){try{var l=window.__ikasPreviewBaseUrl||me,p=l+"/api/preview/reviews?page="+encodeURIComponent(t||1),u=await he(p);if(u.ok)return await u.json()}catch(h){}return cr()}r=r||"newest",t=t||1;var v=i?"_l"+i:"",m="renuvex_pr_reviews_"+ce+"_"+e+"_"+r+"_"+t+"_"+(a||"")+"_"+(n?"1":"0")+v,c=null,o=ct(m);if(o)try{var y=JSON.parse(o);if(y&&y.t!==void 0&&y.v){if(Date.now()-y.t<ea)return y.v;c=y.v,Ze(m,"")}else Ze(m,"")}catch(h){Ze(m,"")}try{var d=me+"/api/public/reviews?storeId="+encodeURIComponent(ce)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(t)+(a?"&rating="+encodeURIComponent(a):"")+(n?"&hasImages=true":"")+(i?"&limit="+encodeURIComponent(i):""),s=await he(d);if(!s.ok)return c||cr();var x=await s.json();return Ze(m,JSON.stringify({t:Date.now(),v:x})),x}catch(h){return console.error("[renuvex-pr] fetchReviews error:",h),c||cr()}}async function ra(e){var r=await Te(e,"newest",1,null,!0,Qt);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function ln(e,r){var t=document.getElementById("renuvex-pr-rating-badge");t&&t.remove();var a=document.getElementById("renuvex-pr-jsonld");if(a&&a.remove(),!Ir[e]){Ir[e]=!0;var n={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},i={enabled:!0,size:"medium"};try{var l=await mt();if(!l)return;var p=l.widgets&&l.widgets.reviews||n,u=l.widgets&&l.widgets.badge||i;if(p.enabled===!1)return;Xe("newest"),Ce(1),tr(null);var v=await Promise.all([Te(e,"newest",1,null),ra(e)]),m=v[0];at(v[1]),await be(e,p,m,r,"newest",1,u)}catch(c){console.error("[renuvex-pr] bootstrap error:",c),await be(e,n,cr(),r,void 0,void 0,i)}finally{delete Ir[e]}}}var _e=":host{display:block;box-sizing:border-box;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}:host *,:host *::before,:host *::after{box-sizing:border-box;}";function wt(e){return e?e.shadowRoot||e.attachShadow({mode:"open"}):null}function Fe(e,r){if(e){var t=e.querySelector("style[data-renuvex-shadow-style]");t||(t=document.createElement("style"),t.setAttribute("data-renuvex-shadow-style",""),e.appendChild(t)),t.textContent=r||""}}function xr(){var e=document.createElement("div");e.setAttribute("data-renuvex-shadow-overlay",""),document.body.appendChild(e);var r=e.attachShadow({mode:"open"});return{host:e,root:r}}function fr(e){var r=document.activeElement;return e&&r===e.host&&e.activeElement||r}function kt(e){if(!e)return null;var r=e.querySelector("[data-renuvex-shadow-content]");return r||(r=document.createElement("div"),r.setAttribute("data-renuvex-shadow-content",""),e.appendChild(r),r)}var gr=`
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

${ut}

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
`;function Oe(e){return ge(e)}function ta(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function oe(e,r,t,a){t?e.setProperty(r,t,a||""):e.removeProperty(r)}function aa(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",t=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&t>1;return a&&/AppleWebKit/i.test(r)}function na(){var e=ta(),r=document.body.style,t=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",i=aa()&&!n;if(a>0){var l=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",l+a+"px","important")}return t.setProperty("overflow","hidden","important"),t.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),i&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function ia(e){if(e){var r=document.body.style,t=document.documentElement.style;oe(t,"overflow",e.rootOverflow,e.rootOverflowPriority),oe(t,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),oe(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),oe(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),oe(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),oe(r,"position",e.bodyPosition,e.bodyPositionPriority),oe(r,"top",e.bodyTop,e.bodyTopPriority),oe(r,"left",e.bodyLeft,e.bodyLeftPriority),oe(r,"right",e.bodyRight,e.bodyRightPriority),oe(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function oa(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function He(e){if(!(!e||!e.isConnected||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(t){}}}function la(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function Ct(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(la)}function St(e){var r=Ct(e),t=r[0]||e.querySelector('[role="dialog"]')||e;He(t)}function pa(e,r,t){if(e.key==="Tab"){var a=Ct(r);if(!a.length){e.preventDefault(),St(r);return}var n=a[0],i=a[a.length-1],l=fr(t);if(!r.contains(l)){e.preventDefault(),He(n);return}e.shiftKey&&l===n?(e.preventDefault(),He(i)):!e.shiftKey&&l===i&&(e.preventDefault(),He(n))}}function da(){var e={id:"renuvex-pr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({renuvexPrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function ua(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.renuvexPrModal===e.id)}function sa(e){if(ua(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function zt(e,r,t,a,n){ia(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",t),e&&e.shadowRoot&&or(e.shadowRoot),e&&e.parentNode&&e.parentNode.removeChild(e),He(n)}function va(e){var r=document.createElement("div");r.className="renuvex-pr-modal-right";var t=document.createElement("div");t.className="renuvex-pr-modal-scroll-content";var a=document.createElement("div");a.className="renuvex-pr-modal-top-row";var n=document.createElement("div");n.className="renuvex-pr-modal-stars",n.innerHTML=de(e.rating,N);var i=document.createElement("span");i.className="renuvex-pr-modal-date",i.textContent=ue(e.createdAt),a.appendChild(n),a.appendChild(i),t.appendChild(a);var l=document.createElement("div");l.className="renuvex-pr-modal-title",l.textContent=e.title||"",l.style.display=e.title?"":"none",t.appendChild(l);var p=document.createElement("div");p.className="renuvex-pr-modal-author",p.textContent=e.author||"",t.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-modal-body",u.textContent=(e.comment||"").trim(),u.style.display=e.comment&&e.comment.trim()?"":"none",t.appendChild(u);var v=document.createElement("div");v.className="renuvex-pr-modal-reply";var m=document.createElement("div");m.className="renuvex-pr-modal-reply-label",m.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi";var c=document.createElement("div");return c.className="renuvex-pr-modal-reply-text",c.textContent=e.merchantReply||"",v.appendChild(m),v.appendChild(c),v.style.display=e.merchantReply?"":"none",t.appendChild(v),r.appendChild(t),r}function Et(e,r,t){var a=t||N,n=e.querySelector(".renuvex-pr-modal-scroll-content"),i=n.querySelector(".renuvex-pr-modal-stars");i.innerHTML=de(r.rating,a),n.querySelector(".renuvex-pr-modal-date").textContent=ue(r.createdAt);var l=n.querySelector(".renuvex-pr-modal-title");l.textContent=r.title||"",l.style.display=r.title?"":"none",n.querySelector(".renuvex-pr-modal-author").textContent=r.author||"";var p=n.querySelector(".renuvex-pr-modal-body");p.textContent=(r.comment||"").trim(),p.style.display=r.comment&&r.comment.trim()?"":"none";var u=n.querySelector(".renuvex-pr-modal-reply");u.querySelector(".renuvex-pr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",u.querySelector(".renuvex-pr-modal-reply-text").textContent=r.merchantReply||"",u.style.display=r.merchantReply?"":"none",e.scrollTop=0}function _r(e,r,t,a,n,i,l,p,u){var v=Oe(e),m=Math.max(0,Math.min(t||0,v.length-1)),c=document.createElement("div");c.className="renuvex-pr-modal-left";var o=document.createElement("img"),y=l==="next"?"renuvex-pr-modal-img-enter-right":l==="prev"?"renuvex-pr-modal-img-enter-left":"";o.className="renuvex-pr-modal-main-img"+(y?" "+y:""),o.src=Br(v[m]||""),o.decoding="async",o.width=Rr,o.height=Math.round(Rr*4/3),o.alt="Yorum foto\u011Fraf\u0131",vt(o,function(E){if(E.style.display="none",!c.querySelector(".renuvex-pr-modal-img-error")){var T=document.createElement("div");T.className="renuvex-pr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",c.insertBefore(T,E)}}),c.appendChild(o);var d=document.createElement("button");d.className="renuvex-pr-modal-close-mobile",d.textContent="\u2715",d.setAttribute("aria-label","Kapat"),d.onclick=function(E){E.stopPropagation(),i()},c.appendChild(d);var s=0;if(c.addEventListener("touchstart",function(E){s=E.touches[0].clientX},{passive:!0}),c.addEventListener("touchend",function(E){var T=s-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(z)se(e,r,m+1,a,n,i,!0,"next",p,u);else if(b){var A=a[r+1];se(A,r+1,0,a,n,i,!1,"next",p,u)}}else if(h)se(e,r,m-1,a,n,i,!0,"prev",p,u);else if(C){var w=a[r-1],P=Oe(w);se(w,r-1,P.length-1,a,n,i,!1,"prev",p,u)}}},{passive:!0}),v.length>1){var x=document.createElement("div");x.className="renuvex-pr-modal-thumbs",v.forEach(function(E,T){var A=document.createElement("img"),w=ne(E,dr);A.src=w.src,A.srcset=w.srcset,A.loading="lazy",A.decoding="async",A.width=dr,A.height=dr,A.className="renuvex-pr-modal-thumb"+(T===m?" renuvex-pr-modal-thumb-active":""),A.alt="K\xFC\xE7\xFCk resim "+(T+1),ie(A),A.tabIndex=0,A.setAttribute("role","button"),A.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===m&&A.setAttribute("aria-current","true"),(function(P){function L(){se(e,r,P,a,n,i,!0,null,p,u)}A.onclick=L,A.onkeydown=function(_){(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),L())}})(T),x.appendChild(A)}),c.appendChild(x)}var h=m>0,z=m<v.length-1,C=r>0,b=r<a.length-1,k=h||C,f=z||b;if(k){var g=document.createElement("button");g.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-prev",g.innerHTML="&#8249;",g.setAttribute("aria-label","\xD6nceki"),g.onclick=function(E){if(E.stopPropagation(),h)se(e,r,m-1,a,n,i,!0,"prev",p,u);else if(C){var T=a[r-1],A=Oe(T);se(T,r-1,A.length-1,a,n,i,!1,"prev",p,u)}},c.appendChild(g)}if(f){var S=document.createElement("button");S.className="renuvex-pr-modal-nav renuvex-pr-modal-nav-next",S.innerHTML="&#8250;",S.setAttribute("aria-label","Sonraki"),S.onclick=function(E){if(E.stopPropagation(),z)se(e,r,m+1,a,n,i,!0,"next",p,u);else if(b){var T=a[r+1];se(T,r+1,0,a,n,i,!1,"next",p,u)}},c.appendChild(S)}return c}function Tt(e,r){[-1,1].forEach(function(t){var a=r[e+t];if(a){var n=Oe(a);n[0]&&(new Image().src=Br(n[0]))}})}function Mr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function ca(e,r){var t=e&&e.querySelector(".renuvex-pr-modal-wrap"),a=r&&r.querySelector(".renuvex-pr-modal-right"),n=r&&r.querySelector(".renuvex-pr-modal-scroll-content");function i(){Mr(t),Mr(a),Mr(n)}i(),t&&He(t),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){i(),requestAnimationFrame(i)}):setTimeout(i,0)}function se(e,r,t,a,n,i,l,p,u,v){if(v&&(v.currentReview=e),l){var m=_r(e,r,t,a,n,i,p,u,v);n.firstChild&&n.replaceChild(m,n.firstChild)}else{var m=_r(e,r,t,a,n,i,p,u,v),c=n.querySelector(".renuvex-pr-modal-right");n.firstChild&&n.replaceChild(m,n.firstChild),c&&Et(c,e,v&&v.currentSettings),ca(u,n)}Tt(r,a)}function le(e,r,t){var a=Oe(e);if(!a.length)return;var n=(t||[]).filter(function(f){return Oe(f).length>0}),i=n.findIndex(function(f){return f===e||f.id===e.id});i===-1&&(n.unshift(e),i=0);var l=a.indexOf(r);l<0&&(l=0);var p=document.createElement("div");p.className="renuvex-pr-modal-overlay";var u=document.createElement("div");u.className="renuvex-pr-modal";var v=!1,m=null,c=oa(),o=na(),y=da(),d={currentReview:e,currentSettings:N},s=null;function x(f){var g=f&&f.detail&&f.detail.settings;if(!(g&&g===s)){s=g||null,d.currentSettings=g||N;var S=u.querySelector(".renuvex-pr-modal-right");!S||!d.currentReview||Et(S,d.currentReview,d.currentSettings)}}function h(){v||(v=!0,window.removeEventListener(Ee,x),zt(m&&m.host,z,h,o,c))}function z(f){if(f.key==="Escape"){C();return}pa(f,p,m&&m.root)}function C(){v||(v=!0,window.removeEventListener(Ee,x),zt(m&&m.host,z,h,o,c),sa(y))}document.addEventListener("keydown",z),window.addEventListener("popstate",h),window.addEventListener(Ee,x),p.onclick=function(){C()},u.onclick=function(f){f.stopPropagation()},u.appendChild(_r(e,i,l,n,u,C,null,p,d)),u.appendChild(va(e)),Tt(i,n);var b=document.createElement("div");b.className="renuvex-pr-modal-wrap",b.tabIndex=-1,b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),b.appendChild(u);var k=document.createElement("button");k.className="renuvex-pr-modal-close",k.textContent="\u2715",k.setAttribute("aria-label","Kapat"),k.onclick=function(f){f.stopPropagation(),C()},b.appendChild(k),p.appendChild(b),m=xr(),Fe(m.root,_e+er+gr),m.root.appendChild(p),Se(m.root),St(p)}function At(e){var r=ur();if(r&&typeof r.findProductTitle=="function")try{var t=r.findProductTitle(e);if(t)return t}catch(l){}if(e)for(var a=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),n=0;n<a.length;n++){var i=a[n];if(i.children.length===0&&i.textContent.trim()===e&&i.tagName!=="TITLE"&&!i.closest("[data-renuvex-listing-badge]")&&!i.closest("[data-renuvex-slot]")&&!i.closest("#renuvex-reviews")&&!i.closest("nav")&&!i.closest("header")&&!i.closest('[class*="breadcrumb"]')&&!i.closest('[aria-label*="breadcrumb"]'))return i}return document.querySelector("h1")}var hr=null,br=null;function ma(e,r){return fe(e,r)}function xa(e){var r=ur();if(r&&typeof r.getProductBadgeMountPoint=="function")try{var t=r.getProductBadgeMountPoint(e);if(t&&t.parent)return t}catch(a){}return gt(e)}function Fr(e,r,t,a,n,i,l){hr&&(hr.disconnect(),hr=null),br&&(br.disconnect(),br=null),xt("product-title-rating");var p=document.querySelector(".renuvex-pr-rating-badge--pdp");if(p&&p.remove(),!!e&&!(a&&a.enabled===!1)){var u=document.getElementById("renuvex-pr-jsonld");u&&u.remove();var v=document.createElement("script");v.id="renuvex-pr-jsonld",v.type="application/ld+json",v.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:t||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(v);var m=At(t);if(!m||!m.parentNode){Lr("dom-conflict","PDP product title could not be found for badge placement",{surface:"pdp-badge",reason:"title_not_found",productName:t||"",productId:i||""});return}var c=xa(m);if(!c||!c.parent){Lr("dom-conflict","PDP badge mount point could not be resolved",{surface:"pdp-badge",reason:"mount_not_found",productName:t||"",productId:i||""});return}var o=a&&a.size||"medium",y=$e[o]||$e.medium,d=null;if(a&&a.mobileOverride===!0){var s=a.mobileSize||"small";d=$e[s]||$e.small}ft(y,d);var x=sr({slot:"product-title-rating",className:"renuvex-pr-product-badge-slot",context:{surface:"pdp",productId:i||""}}),h=document.createElement("a");h.className="renuvex-pr-rating-badge renuvex-pr-rating-badge--pdp",h.href="#renuvex-reviews";var z=dt(e,r);h.setAttribute("aria-labelledby",z.id),h.setAttribute("data-renuvex-surface","pdp"),h.setAttribute("data-renuvex-rating",String(e)),h.setAttribute("data-renuvex-count",String(r)),vr(h,{surface:"pdp",productId:i||""});var C=window.getComputedStyle(m).textAlign,b=C==="center"?"center":C==="right"?"right":"left";h.setAttribute("data-renuvex-align",b),h.insertAdjacentHTML("beforeend",z.html+ma(e,n));var k=document.createElement("span");k.className="renuvex-pr-rating-badge__label",k.textContent=e+" ("+r+" yorum)",h.appendChild(k),h.onclick=function(f){f.preventDefault();var g=document.getElementById("renuvex-reviews-widget")||document.getElementById("renuvex-reviews");if(g){var S=document.querySelector("header"),E=S?S.getBoundingClientRect().height:0,T=g.getBoundingClientRect().top+window.pageYOffset-E-16;window.scrollTo({top:T,behavior:"smooth"})}},x.appendChild(h),ht(x,c),br=bt(x,c,{surface:"pdp-badge",reason:"position_reanchored",message:"PDP badge slot reordered after render",extra:{productName:t||"",productId:i||""}}),Ke(x,"pdp-badge",{productName:t||"",productId:i||""},function(){return document.querySelector('[data-renuvex-slot="product-title-rating"]')}),l||(hr=Kr(x,"pdp-badge",function(){Fr(e,r,t,a,n,i,!0)},{productName:t||"",productId:i||""}))}}var Yr={};ve(Yr,{meta:()=>Ca,render:()=>Sa});function Ye(e){var r=e.ratingCounts,t=e.allCount,a=e.iconPair,n=e.currentRatingFilter,i=e.onFilterChange;xe(a);var l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-bars";for(var p=5;p>=1;p--){var u=r[p-1]||0,v=t>0?Math.round(u/t*100):0,m=n===p,c=document.createElement("div");c.className="renuvex-pr-bar-row"+(m?" renuvex-pr-bar-active":""),n&&!m&&(c.style.opacity="0.35");for(var o="",y=1;y<=5;y++){var d=y<=p;o+='<span class="renuvex-pr-bar-star renuvex-pr-icon '+(d?"renuvex-pr-bar-star-filled":"renuvex-pr-bar-star-empty")+'">'+X(d?"full":"outline")+"</span>"}c.innerHTML='<span class="renuvex-pr-bar-label">'+o+'</span><div class="renuvex-pr-bar-track"><div class="renuvex-pr-bar-fill" style="width:'+v+'%;"></div></div><span class="renuvex-pr-bar-count">('+u.toLocaleString("tr-TR")+")</span>",(function(s){c.onclick=function(){i(s)}})(p),l.appendChild(c)}return l}var pe=[],Lt=!1;function fa(e){for(var r=pe.length-1;r>=0;r--){var t=pe[r];t.trigger&&t.trigger.contains(e.target)||t.element&&t.element.contains(e.target)||t.close()}}function ga(e){if(e.key==="Escape")for(var r=pe.length-1;r>=0;r--)pe[r].close()}function ha(){Lt||typeof document=="undefined"||(document.addEventListener("click",fa,!0),document.addEventListener("keydown",ga),Lt=!0)}function yr(e){for(var r=0;r<pe.length;r++)pe[r]!==e&&pe[r].close()}function wr(e){ha();var r={trigger:e.trigger,element:e.element,close:e.close};return pe.push(r),function(){var a=pe.indexOf(r);a!==-1&&pe.splice(a,1)}}function ee(e){var r=e.widget,t=e.currentOrderBy,a=e.currentHasImages,n=e.onWriteClick,i=e.onSortChange,l=document.createElement("div");l.className="renuvex-pr-summary-block renuvex-pr-summary-actions";var p=document.createElement("button");p.className="renuvex-pr-write-btn",p.textContent=N&&N.writeButtonText||"Yorum Yap",p.onclick=n,l.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-filter-wrap";var v=document.createElement("button");v.type="button",v.className="renuvex-pr-filter-btn",v.setAttribute("aria-label","Filtrele"),v.setAttribute("aria-haspopup","menu"),v.setAttribute("aria-expanded","false");var m=N&&N.filterIcon||"lines";v.innerHTML=J(lt(m));var c=document.createElement("div");c.className="renuvex-pr-filter-menu",c.setAttribute("role","menu");var o=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],y=!1;function d(h){var z=c.classList.contains("renuvex-pr-open");c.classList.remove("renuvex-pr-open"),v.classList.remove("renuvex-pr-filter-btn-active"),v.setAttribute("aria-expanded","false");var C=h&&(h.restoreFocus===!0||h.restoreFocus==="auto"&&rr());if(z&&C)try{v.focus({preventScroll:!0})}catch(b){try{v.focus()}catch(k){}}}function s(){yr(x),c.classList.add("renuvex-pr-open"),v.classList.add("renuvex-pr-filter-btn-active"),v.setAttribute("aria-expanded","true");var h=c.querySelector(".renuvex-pr-filter-item-active")||c.querySelector(".renuvex-pr-filter-item");h&&requestAnimationFrame(function(){try{h.focus({preventScroll:!0})}catch(z){try{h.focus()}catch(C){}}})}o.forEach(function(h){var z=h[2],C=z?a:!a&&(t||"newest")===h[0],b=document.createElement("button");b.type="button",b.className="renuvex-pr-filter-item"+(C?" renuvex-pr-filter-item-active":""),b.setAttribute("role","menuitem"),b.textContent=h[1];var k=!1;function f(g,S){g&&(g.preventDefault(),g.stopPropagation()),!k&&(k=!0,y=!0,d({restoreFocus:S}),i(h[0],z),setTimeout(function(){k=!1,y=!1},0))}b.addEventListener("pointerdown",function(g){g.button!==void 0&&g.button!==0||f(g,!1)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(g){f(g,!1)},{passive:!1}),b.addEventListener("mousedown",function(g){g.button!==void 0&&g.button!==0||f(g,!1)}),b.addEventListener("keydown",function(g){(g.key==="Enter"||g.key===" ")&&f(g,!0)}),b.onclick=function(g){f(g,!1)},c.appendChild(b)}),v.onclick=function(){c.classList.contains("renuvex-pr-open")?d({restoreFocus:"auto"}):s()},u.addEventListener("keydown",function(h){h.key==="Escape"&&c.classList.contains("renuvex-pr-open")&&(h.stopPropagation(),d({restoreFocus:!0}))}),u.addEventListener("focusout",function(h){if(c.classList.contains("renuvex-pr-open")&&!y){var z=h.relatedTarget;z&&u.contains(z)||d()}});var x=wr({trigger:u,element:c,close:d});return u.appendChild(v),u.appendChild(c),l.appendChild(u),l}var Pt=`
  /* Backdrop \u2014 viewport'u kaplar, modal kutusunu ortalar */
  .renuvex-pr-fwizard-overlay{
    position:fixed;
    inset:0;
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
`;function Nt(e){var r=e&&e.onClose?e.onClose:function(){},t=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="renuvex-pr-fwizard",a.appendChild(n);var i=document.createElement("button");i.className="renuvex-pr-fwizard-close",i.type="button",i.setAttribute("aria-label","Kapat"),i.innerHTML=J('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),n.appendChild(i);var l=document.createElement("div");l.className="renuvex-pr-fwizard-content",n.appendChild(l);var p=!1,u=null,v=null,m=!1,c="",o="";function y(){var w=document.activeElement;return!w||w===document.body||w===document.documentElement?null:w}function d(w){if(!(!w||!w.isConnected||typeof w.focus!="function"))try{w.focus({preventScroll:!0})}catch(P){try{w.focus()}catch(L){}}}function s(w){if(!w||w.disabled||w.getAttribute("aria-hidden")==="true")return!1;var P=window.getComputedStyle?window.getComputedStyle(w):null;return P&&(P.display==="none"||P.visibility==="hidden")?!1:!!(w.offsetWidth||w.offsetHeight||w.getClientRects().length)}function x(w){var P=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(w.querySelectorAll(P)).filter(s)}function h(){var w=x(l),P=x(a),L=w[0]||P[0]||a;d(L)}function z(w){if(w.key==="Tab"){var P=x(a);if(!P.length){w.preventDefault(),d(a);return}var L=P[0],_=P[P.length-1],F=fr(u&&u.root);if(!a.contains(F)){w.preventDefault(),d(L);return}w.shiftKey&&F===L?(w.preventDefault(),d(_)):!w.shiftKey&&F===_&&(w.preventDefault(),d(L))}}function C(){var w=window.innerWidth-document.documentElement.clientWidth;c=document.body.style.overflow,o=document.body.style.paddingRight,document.body.style.overflow="hidden",w>0&&(document.body.style.paddingRight=w+"px")}function b(){document.body.style.overflow=c,document.body.style.paddingRight=o}function k(){p||(p=!0,document.removeEventListener("keydown",f),a.removeEventListener("click",g),i.removeEventListener("click",k),a.classList.remove("renuvex-pr-fwizard-open"),setTimeout(function(){u?(or(u.root),u.host&&u.host.parentNode&&u.host.parentNode.removeChild(u.host)):a.parentNode&&a.parentNode.removeChild(a),b(),m&&d(v);try{r()}catch(w){}},200))}function f(w){if(w.key==="Escape"){k();return}z(w)}function g(w){w.target===a&&t&&k()}document.addEventListener("keydown",f),a.addEventListener("click",g),i.addEventListener("click",k);function S(w){v=y(),m=rr(),w&&l.appendChild(w),u=xr(),Fe(u.root,_e+Pt),u.root.appendChild(a),Se(u.root),C(),requestAnimationFrame(function(){a.classList.add("renuvex-pr-fwizard-open"),h()})}var E=null,T=null;function A(w,P){if(P=P||"error",E){try{E.remove()}catch(L){}E=null}T&&(clearTimeout(T),T=null),E=document.createElement("div"),E.className="renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--"+P,E.textContent=w,n.appendChild(E),T=setTimeout(function(){E&&(E.classList.add("renuvex-pr-fwizard-toast--exit"),setTimeout(function(){if(E){try{E.remove()}catch(L){}E=null}},300))},4e3)}return{open:S,close:k,content:l,setAllowOutsideClose:function(w){t=!!w},setStepAttr:function(w){n.setAttribute("data-step",String(w))},focusFirstControl:h,showToast:A}}var Or=4;function je(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function Rt(e){e=e||{};var r=[],t={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(n){try{n(t)}catch(i){}})}return{get:function(){return t},set:function(n){Object.assign(t,n),a()},goNext:function(){t.currentStep<Or&&(t.currentStep+=1,a())},goBack:function(){t.currentStep>1&&(t.currentStep-=1,a())},onChange:function(n){return r.push(n),function(){r=r.filter(function(i){return i!==n})}}}}var ba='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function Bt(e){e=e||{};var r=e.skippableSteps||[],t=e.nextableSteps||[],a=e.onBack||function(){},n=e.onSkip||function(){},i=e.onNext||function(){},l=document.createElement("div");l.className="renuvex-pr-fwizard-footer";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-back",p.setAttribute("aria-label","Geri"),p.innerHTML=J(ba)+"<span>Geri</span>",p.addEventListener("click",function(){a()}),l.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-fwizard-footer-progress";for(var v=[],m=0;m<Or;m++){var c=document.createElement("span");c.className="renuvex-pr-fwizard-progress-seg",u.appendChild(c),v.push(c)}l.appendChild(u);var o=document.createElement("button");o.type="button";var y=null;function d(x){y&&o.removeEventListener("click",y),y=x,x&&o.addEventListener("click",x)}l.appendChild(o);function s(x,h){var z=r.indexOf(x)!==-1,C=t.indexOf(x)!==-1,b=h&&(h.images&&h.images.length>0||h.pendingImages&&h.pendingImages.length>0);if(z)x===2&&b?(o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",d(function(){i()})):(o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",o.setAttribute("aria-label","Atla"),o.innerHTML="<span>Atla</span>",d(function(){n()})),o.disabled=!1,o.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),o.style.visibility="",o.tabIndex=0;else if(C){o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Sonraki"),o.innerHTML="Sonraki",o.style.visibility="",o.tabIndex=0;var k=je(x,h);o.disabled=!k,o.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!k),d(function(){o.disabled||i()})}else o.className="renuvex-pr-fwizard-nav-btn renuvex-pr-fwizard-footer-skip",o.innerHTML="",o.style.visibility="hidden",o.tabIndex=-1,o.disabled=!0,d(null)}return{el:l,update:function(x,h){v.forEach(function(C,b){b+1<=x?C.classList.add("renuvex-pr-fwizard-progress-seg-active"):C.classList.remove("renuvex-pr-fwizard-progress-seg-active")});var z=x<=1;p.style.visibility=z?"hidden":"",p.style.pointerEvents=z?"none":"",p.tabIndex=z?-1:0,s(x,h)},setNextDisabled:function(x){o.classList.contains("renuvex-pr-fwizard-cta-btn")&&(o.disabled=!!x,o.classList.toggle("renuvex-pr-fwizard-cta-btn--disabled",!!x))},setThanksState:function(x){p.style.visibility="hidden",u.style.visibility="hidden",o.className="renuvex-pr-fwizard-cta-btn renuvex-pr-fwizard-footer-next",o.setAttribute("aria-label","Devam Et"),o.innerHTML="Devam Et",o.style.visibility="",o.disabled=!1,o.classList.remove("renuvex-pr-fwizard-cta-btn--disabled"),d(x)}}}function It(e,r){r=r||{};var t=document.createElement("div");t.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating";var a=!1,n=null,i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title",i.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",t.appendChild(i);var l=document.createElement("div");l.className="renuvex-pr-fwizard-stars",l.setAttribute("role","radiogroup"),l.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var p=Je(N||{});xe(p);var u=[];function v(d){u.forEach(function(s,x){var h=x<d;s.classList.toggle("renuvex-pr-fwizard-star-active",h),s.setAttribute("aria-checked",x+1===d?"true":"false"),s.innerHTML=h?X("full"):X("outline")})}function m(d,s){s&&typeof s.preventDefault=="function"&&s.preventDefault(),s&&typeof s.stopPropagation=="function"&&s.stopPropagation(),!a&&(a=!0,e.set({rating:d}),v(d),n&&clearTimeout(n),n=setTimeout(function(){e.goNext()},280))}for(var c=1;c<=5;c++)(function(d){var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-star",s.setAttribute("role","radio"),s.setAttribute("aria-label",d+" y\u0131ld\u0131z"),s.innerHTML=X("outline"),s.addEventListener("mouseenter",function(){v(d)}),s.addEventListener("mouseleave",function(){v(e.get().rating)}),s.addEventListener("pointerdown",function(x){x.button&&x.button!==0||m(d,x)}),typeof window!="undefined"&&!window.PointerEvent&&s.addEventListener("touchstart",function(x){m(d,x)},{passive:!1}),s.addEventListener("mousedown",function(x){window.PointerEvent||m(d,x)}),s.addEventListener("keydown",function(x){(x.key==="Enter"||x.key===" ")&&m(d,x)}),s.addEventListener("click",function(x){m(d,x)}),u.push(s),l.appendChild(s)})(c);v(e.get().rating);var o=null,y=function(d){var s=d&&d.detail&&d.detail.settings;s&&s===o||(o=s||null,p=Je(s||N||{}),v(e.get().rating))};return window.addEventListener(Ee,y),t.appendChild(l),{el:t,destroy:function(){n&&clearTimeout(n),window.removeEventListener(Ee,y)}}}var Mt=3,ya=10*1024*1024;function _t(e,r){r=r||{};var t=!1,a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-subtitle",i.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(i);var l=document.createElement("div");l.className="renuvex-pr-fwizard-photo-card";var p=document.createElement("button");p.type="button",p.className="renuvex-pr-fwizard-photo-add",p.setAttribute("aria-label","Foto\u011Fraf ekle"),p.innerHTML=J('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>')+"<span>Foto\u011Fraf Ekle</span>";var u=document.createElement("input");u.type="file",u.accept="image/*",u.multiple=!0,u.style.display="none",l.appendChild(p),l.appendChild(u);var v=document.createElement("div");v.className="renuvex-pr-fwizard-photo-previews",v.setAttribute("aria-live","polite"),l.appendChild(v),a.appendChild(l);var m=r.blobMap||{},c=r.urlToFinger||{};function o(){if(!t){var C=e.get().images||[],b=e.get().pendingImages||[],k=C.map(function(f){return{url:f,isPending:!1}}).concat(b.map(function(f){return{url:f.url,file:f.file,isPending:!0,error:f.error}}));v.innerHTML="",k.forEach(function(f){var g=m[f.url]||f.url,S=y(f,g);v.appendChild(S)}),h()}}function y(C,b){var k=document.createElement("div");k.className="renuvex-pr-fwizard-photo-thumb";var f=document.createElement("img");f.src=b,f.alt="",f.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",k.appendChild(f);var g=document.createElement("div");g.className="renuvex-pr-fwizard-photo-loading",g.style.display="none",k.appendChild(g);var S=document.createElement("button");return S.type="button",S.className="renuvex-pr-fwizard-photo-remove",S.innerHTML="&#x2715;",k.appendChild(S),d(k,C,b),k}function d(C,b,k){var f=C.querySelector("img");f.src!==k&&(f.src=k);var g=C.querySelector(".renuvex-pr-fwizard-photo-loading");if(b.isPending&&b.error){g.style.display="flex",g.textContent="";var S=document.createElement("span");S.className="renuvex-pr-upload-error",S.textContent="\u2717 "+b.error,g.appendChild(S)}else g.style.display="none",g.textContent="";var E=C.querySelector(".renuvex-pr-fwizard-photo-remove");E.onclick=function(){var T=c[b.url]||(b.file?b.file.name+"_"+b.file.size:null);if(b.url.startsWith("blob:")&&URL.revokeObjectURL(b.url),T){var A=(e.get().fingerprints||[]).filter(function(L){return L!==T});e.set({fingerprints:A})}if(b.isPending){var w=(e.get().pendingImages||[]).filter(function(L){return L.url!==b.url});e.set({pendingImages:w})}else{var P=(e.get().images||[]).filter(function(L){return L!==b.url});e.set({images:P})}}}var s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',x='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function h(){var C=(e.get().images||[]).length,b=(e.get().pendingImages||[]).length,k=C+b,f=k>=Mt;k>0?(l.classList.add("renuvex-pr-fwizard-photo-card--compact"),p.innerHTML=J(x)):(l.classList.remove("renuvex-pr-fwizard-photo-card--compact"),p.innerHTML=J(s)+"<span>Foto\u011Fraf Ekle</span>"),f?(p.style.display="none",p.disabled=!0,u.disabled=!0):(p.style.display="flex",p.disabled=!1,u.disabled=!1,p.classList.remove("renuvex-pr-fwizard-photo-add--disabled"))}p.addEventListener("click",function(){u.disabled||u.click()}),u.onchange=async function(C){var b=(e.get().images||[]).length+(e.get().pendingImages||[]).length,k=Array.from(C.target.files).slice(0,Mt-b);u.value="";var f=(e.get().pendingImages||[]).length,g=e.get().images||[],S=g.length;if(k.length!==0){for(var E=[],T=[],A=0;A<k.length;A++){var w=k[A],P=w.name+"_"+w.size,L=(e.get().fingerprints||[]).some(function(O){return O===P})||E.some(function(O){return O.file.name+"_"+O.file.size===P});if(L){console.log("[renuvex-pr] Duplicate file detected, skipping:",w.name);continue}if(w.size>ya){var _="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(_,"error"):alert(_);continue}var F=URL.createObjectURL(w);c[F]=P,E.push({url:F,file:w,error:null}),T.push({url:F,file:w});var R=(e.get().fingerprints||[]).slice();R.push(P),e.set({fingerprints:R})}if(E.length!==0){var re=(e.get().pendingImages||[]).concat(E),te=async function(){for(var O=0;O<T.length;O++){var ye=T[O],Le=ye.file,Z=ye.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var We=(e.get().pendingImages||[]).filter(function(H){return H.url!==Z}),Pe=(e.get().images||[]).slice();Pe.push(Z),e.set({pendingImages:We,images:Pe});continue}try{var D=await he(me+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ce})});if(!D.ok)throw D.status===429?new Error("rate_limit"):new Error("sign failed");var V=await D.json();if(!V.folder)throw new Error("sign folder missing");var W=new FormData;W.append("file",Le),W.append("api_key",V.api_key),W.append("timestamp",V.timestamp),W.append("signature",V.signature),W.append("folder",V.folder);var Ge=await fetch("https://api.cloudinary.com/v1_1/"+V.cloud_name+"/image/upload",{method:"POST",body:W}),U=await Ge.json();if(U.secure_url&&st(U.secure_url)){var qe=(e.get().pendingImages||[]).some(function(H){return H.url===Z});if(!qe){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}m[U.secure_url]=Z,c[U.secure_url]=c[Z];var ae=(e.get().pendingImages||[]).filter(function(H){return H.url!==Z}),Ne=(e.get().images||[]).slice();Ne.push(U.secure_url),e.set({pendingImages:ae,images:Ne});try{he(me+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ce,secureUrl:U.secure_url})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[renuvex-pr] Image upload failed:",H);var Re=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Re,"error");var we=(e.get().pendingImages||[]).map(function(G){return G.url===Z?{url:G.url,file:G.file,error:Re}:G});e.set({pendingImages:we})}}};if(S===0&&f===0){t=!0;var Y=!r.canNavigate||r.canNavigate();Y&&e.goNext()}e.set({pendingImages:re}),te()}}};var z=e.onChange(o);return o(),{el:a,destroy:function(){t=!0,u.onchange=null,z&&z()}}}var Hr=2e3,wa=60;function Ft(e,r){r=r||{};var t=r.onValidityChange||function(){},a=document.createElement("div");a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content";var n=document.createElement("div");n.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",a.appendChild(n);var i=document.createElement("div");i.className="renuvex-pr-fwizard-content-form";var l=document.createElement("input");l.type="text",l.className="renuvex-pr-fwizard-input",l.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",l.maxLength=wa,l.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),l.value=e.get().title||"",l.addEventListener("input",function(){e.set({title:l.value})}),i.appendChild(l);var p=document.createElement("textarea");p.className="renuvex-pr-fwizard-textarea",p.placeholder="Deneyiminizi anlat\u0131n\u2026",p.maxLength=Hr,p.rows=6,p.setAttribute("aria-label","Yorum"),p.value=e.get().comment||"",i.appendChild(p);var u=document.createElement("div");u.className="renuvex-pr-fwizard-char-counter",u.setAttribute("aria-live","polite"),i.appendChild(u);function v(){var c=p.value.length;u.textContent=c+"/"+Hr,u.classList.toggle("renuvex-pr-fwizard-char-counter--max",c>=Hr)}function m(){return je(3,e.get())}return p.addEventListener("input",function(){e.set({comment:p.value}),v(),t(m())}),a.appendChild(i),v(),setTimeout(function(){t(m())},0),{el:a,destroy:function(){}}}var ka=40;function Ot(e,r){r=r||{};var t=r.onValidityChange||function(){},a=r.onSuccess||function(){},n=document.createElement("div");n.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author";var i=document.createElement("div");i.className="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg",i.textContent="Hakk\u0131n\u0131zda",n.appendChild(i);var l=document.createElement("div");l.className="renuvex-pr-fwizard-author-form";var p=document.createElement("div");p.className="renuvex-pr-fwizard-field";var u=document.createElement("label");u.className="renuvex-pr-fwizard-label",u.innerHTML='Ad\u0131n\u0131z <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';var v=document.createElement("input");v.type="text",v.className="renuvex-pr-fwizard-input",v.maxLength=ka,v.setAttribute("aria-required","true"),v.value=e.get().author||"",p.appendChild(u),p.appendChild(v),l.appendChild(p);var m=document.createElement("div");m.className="renuvex-pr-fwizard-field";var c=document.createElement("label");c.className="renuvex-pr-fwizard-label",c.textContent="E-posta (opsiyonel)";var o=document.createElement("input");o.type="email",o.className="renuvex-pr-fwizard-input",o.setAttribute("autocomplete","email"),o.value=e.get().email||"",m.appendChild(c),m.appendChild(o),l.appendChild(m);var y=document.createElement("div");y.className="renuvex-pr-fwizard-notice",y.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",l.appendChild(y);var d=document.createElement("div");d.className="renuvex-pr-fwizard-msg",d.setAttribute("role","alert"),d.setAttribute("aria-live","assertive"),l.appendChild(d);var s=document.createElement("button");s.type="button",s.className="renuvex-pr-fwizard-submit-btn",s.textContent="G\xF6nder",l.appendChild(s),n.appendChild(l);function x(){return je(4,e.get())}function h(){var k=!x(),f=(e.get().pendingImages||[]).length,g=f>0;g?(s.disabled=!0,s.classList.add("renuvex-pr-fwizard-submit-btn--disabled"),s.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(s.disabled=k,s.classList.toggle("renuvex-pr-fwizard-submit-btn--disabled",k),s.textContent="G\xF6nder")}v.addEventListener("input",function(){e.set({author:v.value}),h(),t(x())}),o.addEventListener("input",function(){e.set({email:o.value})}),h(),setTimeout(function(){t(x())},0);function z(){d.textContent=""}function C(k){z();var f=document.createElement("div");f.className="renuvex-pr-fwizard-msg-error",f.textContent=k||"",d.appendChild(f)}s.onclick=async function(){if(!s.disabled){var k=e.get(),f=(k.author||"").trim(),g=(k.comment||"").trim();if(o.value.trim()&&!o.checkValidity()){o.reportValidity();return}if(!f){C("Gerekli alan");return}if(!k.rating){C("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}s.disabled=!0,s.classList.add("renuvex-pr-fwizard-submit-btn--disabled");var S=s.textContent;if(s.textContent="G\xF6nderiliyor\u2026",z(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var E=pt(window.location.href),T=k.productName||null,A=await he(me+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ce,productId:k.productId||null,slug:E||null,productName:T,author:f,title:(k.title||"").trim()||null,comment:g||null,rating:k.rating,images:k.images||[]})},15e3);if(A.ok)a();else{var w=await A.json().catch(function(){return{}});throw new Error(w.error||"Yorum kaydedilemedi.")}}catch(_){var P=_&&(_.name==="AbortError"||/signal/i.test(_.message||"")),L=P?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":_.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):C(L),s.disabled=!1,s.classList.remove("renuvex-pr-fwizard-submit-btn--disabled"),s.textContent=S}}};var b=e.onChange(h);return{el:n,destroy:function(){s.onclick=null,b&&b()}}}function za(e,r,t){if(t=t||{},e===1)return It(r,{canNavigate:t.canNavigate});if(e===2)return _t(r,{canNavigate:t.canNavigate,blobMap:t.blobMap,urlToFinger:t.urlToFinger,showToast:t.showToast});if(e===3)return Ft(r,{onValidityChange:t.onValidityChange});if(e===4)return Ot(r,{onValidityChange:t.onValidityChange,onSuccess:t.onSuccess,showToast:t.showToast});var a=document.createElement("div");return a.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Ht(){var e=document.createElement("div");return e.className="renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks",e.innerHTML='<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Yt(e){e=e||{};var r=Rt({productId:e.productId,productName:e.productName}),t={},a={},n=Nt({onClose:function(){window.removeEventListener("popstate",l),window.history.state&&window.history.state.renuvexPrReviewModal&&window.history.back(),Object.keys(t).forEach(function(f){var g=t[f];g&&g.startsWith("blob:")&&URL.revokeObjectURL(g)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),i={renuvexPrReviewModal:!0};window.history.pushState(i,null,"");var l=function(f){n&&n.close&&n.close()};window.addEventListener("popstate",l);var p=document.createElement("div");p.className="renuvex-pr-fwizard-step-wrap";var u=Bt({skippableSteps:[2],nextableSteps:[3],onBack:function(){c==="idle"&&r.goBack()},onSkip:function(){c==="idle"&&r.goNext()},onNext:function(){c==="idle"&&r.goNext()}}),v=document.createElement("div");v.className="renuvex-pr-fwizard-layout",v.appendChild(p),v.appendChild(u.el);var m=null,c="idle",o=null,y=!0,d=null;function s(f,g){p.innerHTML="";var S=za(f,r,{canNavigate:function(){return c==="idle"},blobMap:t,urlToFinger:a,onValidityChange:function(A){u.setNextDisabled(!A)},onSuccess:h,showToast:n.showToast});if(m=S,u.update(f,r.get()),g){c="entering",S.el.classList.add("renuvex-pr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),S.el.removeEventListener("animationend",T),S.el.classList.remove("renuvex-pr-fwizard-step--enter"),c="idle",o!==null&&z()};S.el.addEventListener("animationend",T),E=setTimeout(T,700)}else c="idle";p.appendChild(S.el),n.setStepAttr&&n.setStepAttr(f),f===3&&u.setNextDisabled(!0)}var x=!1;function h(){if(!x){if(x=!0,!m){p.innerHTML="";var f=Ht();f.classList.add("renuvex-pr-fwizard-step--enter"),p.appendChild(f),n.setStepAttr("thanks"),u.setThanksState(n.close);return}var g=m;c="exiting",g.el.classList.add("renuvex-pr-fwizard-step--exit");var S=function(){if(d&&clearTimeout(d),g.el.removeEventListener("animationend",S),g.destroy)try{g.destroy()}catch(T){}m===g&&(m=null),p.innerHTML="";var E=Ht();E.classList.add("renuvex-pr-fwizard-step--enter"),p.appendChild(E),n.setStepAttr("thanks"),u.setThanksState(n.close),c="idle"};g.el.addEventListener("animationend",S),d=setTimeout(S,300)}}function z(){var f=r.get().currentStep;if(c!=="idle"){o=f;return}if(!m){var g=!y;y=!1,s(f,g);return}var S=m;c="exiting",S.el.classList.add("renuvex-pr-fwizard-step--exit");var E=function(){if(d&&clearTimeout(d),S.el.removeEventListener("animationend",E),S.destroy)try{S.destroy()}catch(A){}if(m===S){p.innerHTML="",m=null;var T=o!==null?o:r.get().currentStep;o=null,s(T,!0),c="idle"}};S.el.addEventListener("animationend",E),d=setTimeout(E,350)}z();var C=r.get().currentStep,b=r.onChange(function(f){f.currentStep!==C?(C=f.currentStep,z()):u.update(f.currentStep,f)}),k=n.close;return n.close=function(){b&&b(),typeof d!="undefined"&&d&&clearTimeout(d),k()},n.open(v),{close:n.close}}function j(){Yt({productId:Q||"",productName:Me||""})}var Ca={id:"classic",name:"Klasik (A\xE7\u0131k)"};function Sa(e){var r=e.widget,t=e.data,a=e.settings,n=e.iconPair,i=e.allCount,l=e.ratingCounts,p=e.avgRatingVal,u=e.currentRatingFilter,v=e.currentOrderBy,m=e.currentHasImages,c=e.onFilterChange,o=e.onSortChange;xe(n);var y=document.createElement("div");y.className="renuvex-pr-summary";var d=(l[3]||0)+(l[4]||0),s=i>0?Math.round(d/i*100):0,x=document.createElement("div");x.className="renuvex-pr-summary-block renuvex-pr-summary-avg",x.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+X("full")+'</span><span class="renuvex-pr-avg-num">'+p+"</span>",y.appendChild(x);var h=document.createElement("div");if(h.className="renuvex-pr-summary-block renuvex-pr-summary-count",h.textContent=i.toLocaleString("tr-TR")+" Yorum",y.appendChild(h),a.showRecommendation!==!1&&s>0){var z=document.createElement("div");z.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",z.innerHTML='<span class="renuvex-pr-recommend-pct">%'+s+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",y.appendChild(z)}return y.appendChild(Ye({ratingCounts:l,allCount:i,iconPair:n,currentRatingFilter:u,onFilterChange:c})),y.appendChild(ee({widget:r,currentOrderBy:v,currentHasImages:m,onWriteClick:j,onSortChange:o})),y}var jr={};ve(jr,{css:()=>Ta,meta:()=>Ea,render:()=>Aa});var jt=`
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
`;var Ea={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--renuvex-pr-compact-star-size":"20px"},medium:{"--renuvex-pr-compact-star-size":"24px"},large:{"--renuvex-pr-compact-star-size":"28px"}}},Ta=jt;function Aa(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,u=e.currentOrderBy,v=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange,o=document.createElement("div");o.className="renuvex-pr-summary renuvex-pr-summary-compact";var y=document.createElement("div");y.className="renuvex-pr-compact-header";var d=document.createElement("div");d.className="renuvex-pr-compact-trigger-wrap";var s=document.createElement("button");s.className="renuvex-pr-compact-trigger",s.type="button",s.setAttribute("aria-expanded","false"),s.innerHTML='<span class="renuvex-pr-compact-trigger-stars">'+fe(l,a)+'</span><span class="renuvex-pr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="renuvex-pr-compact-chevron">'+J('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>')+"</span>",d.appendChild(s),y.appendChild(d);var x=ee({widget:r,currentOrderBy:u,currentHasImages:v,onWriteClick:j,onSortChange:c}),h=x.querySelector(".renuvex-pr-filter-wrap"),z=x.querySelector(".renuvex-pr-write-btn"),C=document.createElement("div");C.className="renuvex-pr-compact-actions-slot",z&&C.appendChild(z),h&&C.appendChild(h),y.appendChild(C),o.appendChild(y);var b=document.createElement("div");b.className="renuvex-pr-compact-panel",b.setAttribute("role","dialog"),b.setAttribute("aria-hidden","true");var k=document.createElement("div");k.className="renuvex-pr-compact-panel-inner";var f=document.createElement("div");f.className="renuvex-pr-compact-avg",f.innerHTML='<span class="renuvex-pr-icon">'+X("full")+"</span><span>"+l+"</span>",k.appendChild(f),k.appendChild(Ye({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:p,onFilterChange:m})),b.appendChild(k);var g=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function S(Y){var O=Y?o:d;b.parentNode!==O&&(b.classList.contains("renuvex-pr-open")&&(b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),s.setAttribute("aria-expanded","false")),O.appendChild(b))}if(S(g?g.matches:!1),g){var E=function(Y){S(Y.matches)};g.addEventListener?g.addEventListener("change",E):g.addListener&&g.addListener(E)}if(z){var T=document.createElement("button");T.className="renuvex-pr-write-btn",T.textContent=N&&N.writeButtonText||"Yorum Yap",T.onclick=j;var A=document.createElement("div");A.className="renuvex-pr-compact-write-row",A.appendChild(T),o.appendChild(A)}function w(){b.classList.remove("renuvex-pr-open"),b.setAttribute("aria-hidden","true"),s.setAttribute("aria-expanded","false")}function P(){yr(L),b.classList.add("renuvex-pr-open"),b.setAttribute("aria-hidden","false"),s.setAttribute("aria-expanded","true")}s.onclick=function(){b.classList.contains("renuvex-pr-open")?w():P()};var L=null;function _(Y){L&&(L(),L=null),Y||(L=wr({trigger:d,element:b,close:w}))}if(_(g?g.matches:!1),g){var F=function(Y){_(Y.matches)};g.addEventListener?g.addEventListener("change",F):g.addListener&&g.addListener(F)}if(t.showRecommendation!==!1){var R=(i[3]||0)+(i[4]||0),re=n>0?Math.round(R/n*100):0;if(re>0){var te=document.createElement("div");te.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",te.style.marginTop="8px",te.innerHTML='<span class="renuvex-pr-recommend-pct">%'+re+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",k.appendChild(te)}}return o}var Dr={};ve(Dr,{css:()=>Pa,meta:()=>La,render:()=>Na});var Dt=`
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
`;var La={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},Pa=Dt;function Na(e){var r=e.widget,t=e.settings,a=e.iconPair,n=e.allCount,i=e.ratingCounts,l=e.avgRatingVal,p=e.currentRatingFilter,u=e.currentOrderBy,v=e.currentHasImages,m=e.onFilterChange,c=e.onSortChange;xe(a);var o=document.createElement("div");o.className="renuvex-pr-summary renuvex-pr-summary-split";var y=document.createElement("div");y.className="renuvex-pr-split-col renuvex-pr-split-left";var d=document.createElement("div");d.className="renuvex-pr-summary-block renuvex-pr-summary-avg renuvex-pr-split-left-avg-block",d.innerHTML='<span class="renuvex-pr-avg-star renuvex-pr-icon">'+X("full")+'</span><span class="renuvex-pr-avg-num">'+l+"</span>",y.appendChild(d);var s=document.createElement("div");s.className="renuvex-pr-summary-block renuvex-pr-summary-count renuvex-pr-split-left-count",s.textContent=n.toLocaleString("tr-TR")+" Yorum",y.appendChild(s),o.appendChild(y);var x=document.createElement("div");x.className="renuvex-pr-split-col renuvex-pr-split-mid",x.appendChild(Ye({ratingCounts:i,allCount:n,iconPair:a,currentRatingFilter:p,onFilterChange:m})),o.appendChild(x);var h=ee({widget:r,currentOrderBy:u,currentHasImages:v,onWriteClick:j,onSortChange:c}),z=h.querySelector(".renuvex-pr-filter-wrap"),C=h.querySelector(".renuvex-pr-write-btn"),b=document.createElement("div");b.className="renuvex-pr-split-col renuvex-pr-split-right",C&&b.appendChild(C),z&&b.appendChild(z),o.appendChild(b);var k=(i[3]||0)+(i[4]||0),f=n>0?Math.round(k/n*100):0,g=document.createElement("div");g.className="renuvex-pr-summary-block renuvex-pr-summary-recommend",g.innerHTML='<span class="renuvex-pr-recommend-pct">%'+f+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var S=t.showRecommendation===!1||f===0;return S&&g.classList.add("renuvex-pr-split-rec-hidden"),y.appendChild(g),o}var Vr={};ve(Vr,{css:()=>Ba,meta:()=>Ra,render:()=>Ia});var Vt=`
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
`;var Ra={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},Ba=Vt;function Ia(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,i=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-minimal";var v=document.createElement("div");v.className="renuvex-pr-minimal-info";var m=document.createElement("div");m.className="renuvex-pr-minimal-row";var c=document.createElement("span");c.className="renuvex-pr-minimal-avg",c.textContent=n,m.appendChild(c);var o=document.createElement("span");o.className="renuvex-pr-minimal-stars",o.innerHTML=fe(n,t),m.appendChild(o);var y=document.createElement("span");y.className="renuvex-pr-minimal-count",y.textContent=a.toLocaleString("tr-TR")+" Yorum",m.appendChild(y),v.appendChild(m),u.appendChild(v);var d=ee({widget:r,currentOrderBy:i,currentHasImages:l,onWriteClick:j,onSortChange:p}),s=d.querySelector(".renuvex-pr-filter-wrap"),x=d.querySelector(".renuvex-pr-write-btn"),h=document.createElement("div");if(h.className="renuvex-pr-minimal-actions",x&&h.appendChild(x),s&&h.appendChild(s),u.appendChild(h),x){var z=document.createElement("button");z.className="renuvex-pr-write-btn",z.textContent=N&&N.writeButtonText||"Yorum Yap",z.onclick=j;var C=document.createElement("div");C.className="renuvex-pr-minimal-write-row",C.appendChild(z),u.appendChild(C)}return u}var Wr={};ve(Wr,{css:()=>_a,meta:()=>Ma,render:()=>Fa});var Wt=`
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
`;var Ma={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},_a=Wt;function Fa(e){var r=e.widget,t=e.iconPair,a=e.allCount,n=e.avgRatingVal,i=e.currentOrderBy,l=e.currentHasImages,p=e.onSortChange,u=document.createElement("div");u.className="renuvex-pr-summary renuvex-pr-summary-hero";var v=document.createElement("div");v.className="renuvex-pr-hero-info";var m=document.createElement("div");m.className="renuvex-pr-hero-rating-col";var c=document.createElement("span");c.className="renuvex-pr-hero-avg",c.textContent=n,m.appendChild(c);var o=document.createElement("div");o.className="renuvex-pr-hero-meta-row";var y=document.createElement("span");y.className="renuvex-pr-hero-stars",y.innerHTML=fe(n,t),o.appendChild(y);var d=document.createElement("div");d.className="renuvex-pr-hero-count",d.textContent=a.toLocaleString("tr-TR")+" Yorum",o.appendChild(d),m.appendChild(o),v.appendChild(m),u.appendChild(v);var s=ee({widget:r,currentOrderBy:i,currentHasImages:l,onWriteClick:j,onSortChange:p}),x=s.querySelector(".renuvex-pr-filter-wrap"),h=s.querySelector(".renuvex-pr-write-btn"),z=document.createElement("div");z.className="renuvex-pr-hero-actions renuvex-pr-desktop-only",h&&z.appendChild(h),x&&z.appendChild(x),u.appendChild(z);var C=ee({widget:r,currentOrderBy:i,currentHasImages:l,onWriteClick:j,onSortChange:p}),b=C.querySelector(".renuvex-pr-filter-wrap"),k=C.querySelector(".renuvex-pr-write-btn"),f=document.createElement("div");return f.className="renuvex-pr-hero-write-row",k&&f.appendChild(k),b&&f.appendChild(b),u.appendChild(f),u}var kr={classic:Yr,compact:jr,split:Dr,minimal:Vr,hero:Wr};function zr(e){return kr[e]||kr.classic}function Gt(){return Object.keys(kr).map(function(e){return kr[e].css||""}).join(`
`)}var Gr={};ve(Gr,{css:()=>Ha,meta:()=>Oa,render:()=>Ya});function De(e,r,t){var a=t||{},n=document.createDocumentFragment(),i=document.createElement("div");i.className=r+" renuvex-pr-body-clamped",i.textContent=e,n.appendChild(i);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",n.appendChild(l),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(l.style.display="inline-block",typeof a.onReadMore=="function")l.onclick=a.onReadMore;else{var p=!1;l.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-body-clamped",!p),l.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),{fragment:n,body:i,readMore:l}}function Ve(e,r){if(!e)return null;var t=document.createElement("div");t.className="renuvex-pr-reply";var a=document.createElement("div");a.className="renuvex-pr-reply-header";var n=document.createElement("span");n.className="renuvex-pr-reply-label",n.textContent=N&&N.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.className="renuvex-pr-reply-text renuvex-pr-reply-text-clamped",i.textContent=e,t.appendChild(i);var l=document.createElement("button");return l.type="button",l.className="renuvex-pr-read-more renuvex-pr-reply-read-more",l.textContent="Devam\u0131n\u0131 oku",l.style.display="none",t.appendChild(l),requestAnimationFrame(function(){if(i.scrollHeight>i.clientHeight+2)if(l.style.display="inline",typeof r=="function")l.onclick=r;else{var p=!1;l.onclick=function(){p=!p,i.classList.toggle("renuvex-pr-reply-text-clamped",!p),l.textContent=p?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),t}var Oa={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--renuvex-pr-card-photo-w":"80px"},medium:{"--renuvex-pr-card-photo-w":"110px"},large:{"--renuvex-pr-card-photo-w":"140px"}}},Ha="";function Ya(e,r){var t=document.createElement("article");t.className="renuvex-pr-review renuvex-pr-review-card";var a=document.createElement("div");a.className="renuvex-pr-review-top";var n=document.createElement("div");n.className="renuvex-pr-review-top-left";var i=document.createElement("span");i.className="renuvex-pr-review-stars",i.innerHTML=de(e.rating,N),n.appendChild(i);var l=document.createElement("time");if(l.className="renuvex-pr-date",e.createdAt&&l.setAttribute("datetime",e.createdAt),l.textContent=ue(e.createdAt),a.appendChild(n),a.appendChild(l),t.appendChild(a),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-title",p.textContent=e.title,t.appendChild(p)}var u=document.createElement("div");u.className="renuvex-pr-author",u.textContent=e.author||"",t.appendChild(u);var v=(e.comment||"").trim();v&&t.appendChild(De(v,"renuvex-pr-body").fragment);var m=ge(e);if(m.length){var c=document.createElement("div");c.className="renuvex-pr-gallery",m.forEach(function(y){var d=document.createElement("img"),s=ne(y,q);d.src=s.src,d.srcset=s.srcset,d.loading="lazy",d.decoding="async",d.width=q,d.height=q,d.className="renuvex-pr-img",ie(d),d.setAttribute("data-renuvex-img-url",y),d.setAttribute("role","button"),d.setAttribute("tabindex","0"),d.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(x){var h=function(){le(e,x,r)};d.onclick=h,d.onkeydown=function(z){(z.key==="Enter"||z.key===" "||z.key==="Spacebar")&&(z.preventDefault(),h())}})(y),c.appendChild(d)}),t.appendChild(c)}var o=Ve(e.merchantReply);return o&&t.appendChild(o),t}var qr={};ve(qr,{css:()=>Da,meta:()=>ja,render:()=>Va});var qt=`
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
`;var ja={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--renuvex-pr-list-photo-w":"80px","--renuvex-pr-list-photo-w-mobile":"80px"},medium:{"--renuvex-pr-list-photo-w":"110px","--renuvex-pr-list-photo-w-mobile":"100px"},large:{"--renuvex-pr-list-photo-w":"140px","--renuvex-pr-list-photo-w-mobile":"110px"}}},Da=qt;function Va(e,r){var t=ge(e),a=t.length>0,n=document.createElement("article");n.className="renuvex-pr-review-list"+(a?"":" renuvex-pr-review-list--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-list-author";var l=document.createElement("span");l.className="renuvex-pr-review-stars renuvex-pr-review-list-author-stars",l.innerHTML=de(e.rating,N),i.appendChild(l);var p=document.createElement("span");p.className="renuvex-pr-review-list-author-name",p.textContent=e.author||"",i.appendChild(p);var u=document.createElement("time");u.className="renuvex-pr-date renuvex-pr-review-list-author-date",e.createdAt&&u.setAttribute("datetime",e.createdAt),u.textContent=ue(e.createdAt),i.appendChild(u),n.appendChild(i);var v=document.createElement("div");if(v.className="renuvex-pr-review-list-content",e.title){var m=document.createElement("div");m.className="renuvex-pr-review-list-title",m.textContent=e.title,v.appendChild(m)}var c=(e.comment||"").trim();c&&v.appendChild(De(c,"renuvex-pr-review-list-body").fragment);var o=Ve(e.merchantReply);if(o&&v.appendChild(o),n.appendChild(v),a){var y=document.createElement("div");y.className="renuvex-pr-review-list-media",t.forEach(function(d){var s=document.createElement("img"),x=ne(d,q);s.src=x.src,s.srcset=x.srcset,s.loading="lazy",s.decoding="async",s.width=q,s.height=Math.round(q*4/3),s.setAttribute("data-renuvex-img-url",d),ie(s),s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt"),(function(h){var z=function(){le(e,h,r)};s.onclick=z,s.onkeydown=function(C){(C.key==="Enter"||C.key===" "||C.key==="Spacebar")&&(C.preventDefault(),z())}})(d),y.appendChild(s)}),n.appendChild(y)}return n}var Ur={};ve(Ur,{css:()=>Ga,meta:()=>Wa,render:()=>qa});var Ut=`
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
`;var Wa={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--renuvex-pr-gallery-photo-w":"80px","--renuvex-pr-gallery-photo-w-mobile":"80px"},medium:{"--renuvex-pr-gallery-photo-w":"110px","--renuvex-pr-gallery-photo-w-mobile":"100px"},large:{"--renuvex-pr-gallery-photo-w":"140px","--renuvex-pr-gallery-photo-w-mobile":"110px"}}},Ga=Ut;function qa(e,r){var t=lr(e),a=!!t,n=document.createElement("article");n.className="renuvex-pr-review-gallery"+(a?"":" renuvex-pr-review-gallery--no-media");var i=document.createElement("div");i.className="renuvex-pr-review-gallery-content";var l=document.createElement("span");if(l.className="renuvex-pr-review-stars renuvex-pr-review-gallery-stars",l.innerHTML=de(e.rating,N),i.appendChild(l),e.title){var p=document.createElement("div");p.className="renuvex-pr-review-gallery-title",p.textContent=e.title,i.appendChild(p)}var u=document.createElement("div");u.className="renuvex-pr-review-gallery-author",u.textContent=e.author||"",i.appendChild(u);var v=document.createElement("time");v.className="renuvex-pr-review-gallery-date",v.style.display="block",e.createdAt&&v.setAttribute("datetime",e.createdAt),v.textContent=ue(e.createdAt),i.appendChild(v);var m=(e.comment||"").trim();if(m&&i.appendChild(De(m,"renuvex-pr-review-gallery-body",t?{onReadMore:function(){le(e,t,r)}}:null).fragment),n.appendChild(i),a){var c=document.createElement("div");c.className="renuvex-pr-review-gallery-media";var o=document.createElement("img"),y=ne(t,pr);o.src=y.src,o.srcset=y.srcset,o.loading="lazy",o.decoding="async",o.width=pr,o.height=Math.round(pr*4/3),ie(o),o.setAttribute("data-renuvex-img-url",t),o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Yorum foto\u011Fraf\u0131n\u0131 b\xFCy\xFCt");var d=function(){le(e,t,r)};o.onclick=d,o.onkeydown=function(x){(x.key==="Enter"||x.key===" "||x.key==="Spacebar")&&(x.preventDefault(),d())},c.appendChild(o),n.appendChild(c)}var s=Ve(e.merchantReply,t?function(){le(e,t,r)}:null);return s&&(s.classList.add("renuvex-pr-review-gallery-reply"),n.appendChild(s)),n}var Cr={card:Gr,list:qr,gallery:Ur};function Qe(e){return Cr[e]||Cr.card}function Kt(){return Object.keys(Cr).map(function(e){return Cr[e].css||""}).join(`
`)}function Ae(e,r){var t=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!t)return"rgba(0,0,0,"+r+")";var a=parseInt(t[1],16),n=parseInt(t[2],16),i=parseInt(t[3],16);return"rgba("+a+","+n+","+i+","+r+")"}function Ua(e){var r=document.createElement("div");r.style.cssText="padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;border:1px dashed #e3e1e5;border-radius:"+e+"px;background:#fafafa;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;";var t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");a.setAttribute("width","32"),a.setAttribute("height","32"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),a.style.cssText="color:#6e6d7a;margin-bottom:4px;";var n=document.createElementNS(t,"path");n.setAttribute("d","M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24");var i=document.createElementNS(t,"line");i.setAttribute("x1","1"),i.setAttribute("y1","1"),i.setAttribute("x2","23"),i.setAttribute("y2","23"),a.appendChild(n),a.appendChild(i);var l=document.createElement("div");l.style.cssText="font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;",l.textContent="Widget \u015Fu anda Pasif durumda";var p=document.createElement("div");return p.style.cssText="font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;",p.textContent="Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.",r.appendChild(a),r.appendChild(l),r.appendChild(p),r}function Ka(){return document.querySelector('[data-renuvex-widget="reviews"]')}function Xa(e){var r=e||{};if(mr(r))return{avg:null,totalCount:0};var t=r.data||{},a=t.totalCount||0,n=t.allCount||0,i=t.avgRating||"0.0",l=t.reviews||[];if(!t.ratingCounts&&l.length>0){var p=l.reduce(function(u,v){return u+v.rating},0);i=(p/l.length).toFixed(1)}return{avg:n>0?i:null,totalCount:a}}function Ja(e,r){var t=e.querySelector('[data-renuvex-slot="product-reviews"]');return t||(t=sr({slot:"product-reviews",className:"renuvex-pr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(t)),vr(t,{surface:"reviews",productId:r||""}),t}var Xt={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Jt={small:80,medium:110,large:140};function Za(e,r){var t=document.createElement("div");t.className="renuvex-pr-state-msg renuvex-pr-state-error",t.setAttribute("role","status"),t.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="renuvex-pr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",t.appendChild(a);var n=document.createElement("button");return n.type="button",n.className="renuvex-pr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},t.appendChild(n),t}function $a(e,r){var t=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",i=r.headerRecommendColor||"#111111",l=r.barFillColor||"#111111",p=r.barTrackColor||"#e5e7eb",u=r.barCountColor||"#111111",v=Ae(l,.06),m=r.reviewStarColor||"#f59e0b",c=r.btnBgColor||"#111111",o=r.btnTextColor||"#ffffff",y=r.btnBorderColor||"#111111",d=r.filterBtnBgColor||"#111111",s=r.filterBtnTextColor||"#ffffff",x=r.filterBtnBorderColor||"#111111",h=r.filterMenuBgColor||"#ffffff",z=r.filterMenuBorderColor||"#e5e7eb",C=r.filterItemTextColor||"#111111",b=r.filterItemHoverBgColor||"#f3f4f6",k=r.filterItemActiveColor||"#111111",f=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",S=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",A=r.replyBgColor||"#f9fafb",w=r.replyBorderColor||"#747474",P=r.replyLabelColor||"#111111",L=r.replyTextColor||"#111111",_=r.photoTitleColor||"#111111",F=Ae("#111111",.05),R=r.photoArrowBgColor||"#ffffff",re=r.photoArrowTextColor||"#111111",te=Ae("#111111",.12),Y=r.formBgColor||"#ffffff",O=r.formPrimaryTextColor||"#111111",ye=r.formSecondaryTextColor||"#3b3b3b",Le=r.inputTextColor||O,Z=r.inputBorderColor||"#d1d5db",We=r.placeholderColor||"#9ca3af",Pe=r.formStepBarColor||"#111111",D=r.formBtnBgColor||"#111111",V=r.formBtnTextColor||"#ffffff",W=r.formBtnBorderColor||"#111111",Ge=Ae(D,.06),U=Ae(D,.18),qe=Ae(V,.85),ae=Ae(O,.06),Ne=r.loadMoreBgColor||"#ffffff",Re=r.loadMoreTextColor||"#111111",we=r.loadMoreBorderColor||"#111111",H={"--renuvex-pr-widget-bg":"#ffffff00","--renuvex-pr-widget-border":"#ffffff00","--renuvex-pr-header-title":t,"--renuvex-pr-header-avg":a,"--renuvex-pr-header-count":n,"--renuvex-pr-header-recommend":i,"--renuvex-pr-bar-fill":l,"--renuvex-pr-bar-track":p,"--renuvex-pr-bar-count":u,"--renuvex-pr-bar-hover-bg":v,"--renuvex-pr-btn-bg":c,"--renuvex-pr-btn-text":o,"--renuvex-pr-btn-border":y,"--renuvex-pr-filter-btn-bg":d,"--renuvex-pr-filter-btn-text":s,"--renuvex-pr-filter-btn-border":x,"--renuvex-pr-filter-menu-bg":h,"--renuvex-pr-filter-menu-border":z,"--renuvex-pr-filter-item-text":C,"--renuvex-pr-filter-item-hover-bg":b,"--renuvex-pr-filter-item-active":k,"--renuvex-pr-review-title":f,"--renuvex-pr-review-author":g,"--renuvex-pr-review-date":S,"--renuvex-pr-review-body":E,"--renuvex-pr-review-border":T,"--renuvex-pr-review-star-color":m,"--renuvex-pr-reply-bg-color":A,"--renuvex-pr-reply-border":w,"--renuvex-pr-reply-label":P,"--renuvex-pr-reply-text":L,"--renuvex-pr-photo-title":_,"--renuvex-pr-photo-image-border":F,"--renuvex-pr-photo-arrow-bg":R,"--renuvex-pr-photo-arrow-text":re,"--renuvex-pr-photo-arrow-border":te,"--renuvex-pr-fwizard-bg":Y,"--renuvex-pr-fwizard-text":O,"--renuvex-pr-fwizard-secondary-text":ye,"--renuvex-pr-fwizard-input-bg":Y,"--renuvex-pr-fwizard-input-text":Le,"--renuvex-pr-fwizard-input-border":Z,"--renuvex-pr-fwizard-placeholder":We,"--renuvex-pr-fwizard-close-text":O,"--renuvex-pr-fwizard-close-hover-bg":ae,"--renuvex-pr-fwizard-progress-bg":ae,"--renuvex-pr-fwizard-progress-active":Pe,"--renuvex-pr-fwizard-btn-bg":D,"--renuvex-pr-fwizard-btn-text":V,"--renuvex-pr-fwizard-btn-border":W,"--renuvex-pr-fwizard-btn-disabled-bg":U,"--renuvex-pr-fwizard-btn-disabled-text":qe,"--renuvex-pr-fwizard-nav-hover-bg":Ge,"--renuvex-pr-load-more-bg":Ne,"--renuvex-pr-load-more-text":Re,"--renuvex-pr-load-more-border":we};Object.keys(H).forEach(function(G){e.style.setProperty(G,H[G])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function be(e,r,t,a,n,i,l){if(ot){ir({productId:e,settings:r,reviewsData:t,productName:a,orderBy:n,page:i,badgeSettings:l});return}nr(!0),$r(e),Qr(r),l!==void 0&&et(l),rt(a),n&&Xe(n),i&&Ce(i),t!=null&&tt(t);try{let Tr=function(B,M){if(!(!B||!B.meta||!B.meta.sizeOverrides)){var I=B.meta.sizeOverrides[M];I&&Object.keys(I).forEach(function($){o.style.setProperty($,I[$])})}};var Qa=Tr,p=zr(r.summaryLayout),u=!(p.meta&&p.meta.supports&&p.meta.supports.title===!1),v=r.showTitle!==!1,m=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",c=u&&v?m:"",o=document.documentElement;$a(o,r);var y=r.borderRadius!==void 0?r.borderRadius:8,d=Xt[r.size]||Xt.medium,s=Jt[r.thumbnailSize]||Jt.medium,x=Qe(r.reviewLayout);if(x.meta&&x.meta.sizeOverrides&&x.meta.sizeOverrides[r.size]){var h=x.meta.sizeOverrides[r.size],z=h["--renuvex-pr-list-photo-w"]||h["--renuvex-pr-gallery-photo-w"];z&&(s=parseInt(z))}o.style.setProperty("--renuvex-pr-title-size",d.titleSize+"px"),o.style.setProperty("--renuvex-pr-review-text-size",d.reviewTextSize+"px"),o.style.setProperty("--renuvex-pr-review-title-size",d.reviewTitleSize+"px"),o.style.setProperty("--renuvex-pr-author-size",d.authorSize+"px"),o.style.setProperty("--renuvex-pr-reply-name-size",d.replyNameSize+"px"),o.style.setProperty("--renuvex-pr-reply-text-size",d.replyTextSize+"px"),o.style.setProperty("--renuvex-pr-radius",y+"px"),o.style.setProperty("--renuvex-pr-radius-sm",Math.max(0,y-4)+"px"),o.style.setProperty("--renuvex-pr-photo-title-size",d.photoTitleSize+"px"),o.style.setProperty("--renuvex-pr-avg-rating-size",d.avgRatingSize+"px"),o.style.setProperty("--renuvex-pr-review-count-size",d.reviewCountSize+"px"),o.style.setProperty("--renuvex-pr-compact-count-size",d.compactCountSize+"px"),o.style.setProperty("--renuvex-pr-recommend-size",d.recommendSize+"px"),o.style.setProperty("--renuvex-pr-btn-text-size",d.btnTextSize+"px"),o.style.setProperty("--renuvex-pr-bar-label-size",d.barLabelSize+"px"),o.style.setProperty("--renuvex-pr-minimal-avg-size",d.minimalAvgSize+"px"),o.style.setProperty("--renuvex-pr-hero-avg-size",d.heroAvgSize+"px"),o.style.setProperty("--renuvex-pr-bar-count-size",d.barCountSize+"px"),o.style.setProperty("--renuvex-pr-review-date-size",d.reviewDateSize+"px"),o.style.setProperty("--renuvex-pr-filter-text-size",d.filterTextSize+"px"),o.style.setProperty("--renuvex-pr-load-more-size",d.loadMoreSize+"px"),o.style.setProperty("--renuvex-pr-read-more-size",d.readMoreSize+"px"),o.style.setProperty("--renuvex-pr-thumbnail-size",s+"px");var C=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";o.style.setProperty("--renuvex-pr-review-star-color",C),o.style.setProperty("--renuvex-pr-star-size",d.reviewStarSize+"px"),o.style.setProperty("--renuvex-pr-avg-star-size",d.avgStarSize+"px"),Tr(zr(r.summaryLayout),r.size),Tr(Qe(r.reviewLayout),r.size);var b=Je(r);try{var k=Xa(t);Fr(k.avg,k.totalCount,a,Pr,b,Q)}catch(B){try{console.error("[renuvex-pr] rating badge inject error:",B)}catch(M){}}var f=Ka();if(!f)return;var g=Ja(f,e),S=document.getElementById("renuvex-reviews");S||(S=document.createElement("div"),S.id="renuvex-reviews",S.style.minHeight="200px"),S.parentNode!==g&&g.appendChild(S);var E=wt(S),T=_e+er+gr+Gt()+Kt();Fe(E,T);var A=kt(E);if(r.enabled===!1){S.style.minHeight="auto",A.replaceChildren(Ua(r.borderRadius!==void 0?r.borderRadius:8)),nr(!1);var w=ar;ir(null),w&&be(w.productId,w.settings,w.reviewsData,w.productName,w.orderBy,w.page,w.badgeSettings);return}var P=document.createElement("p");P.className="renuvex-pr-state-msg renuvex-pr-state-loading",P.textContent="Yorumlar y\xFCkleniyor...",A.replaceChildren(P);try{var L=t||{},_=mr(L),F=_?[]:L.data&&L.data.reviews||[];nt(F),A.replaceChildren();var R=document.createElement("section");if(R.id="renuvex-reviews-widget",R.setAttribute("aria-label","\xDCr\xFCn yorumlar\u0131"),R.className="renuvex-pr-reviews-widget",R.setAttribute("data-renuvex-surface","reviews"),e&&R.setAttribute("data-renuvex-product-id",String(e)),typeof window!="undefined"&&window.__ikasPreviewMode&&(R.style.width="100%",R.style.maxWidth="100%",R.style.marginLeft="0",R.style.marginRight="0"),c){var re=document.createElement("div"),te=r.summaryLayout||"classic";re.className="renuvex-pr-title renuvex-pr-title-"+te,re.textContent=c,R.appendChild(re)}if(_){R.appendChild(Za(L.message,async function(){var B=await Te(Q,ze,1,Be,Ie);await be(Q,N,B,Me,ze,1,Pr)})),A.appendChild(R),Se(E),Ke(R,"reviews-widget",{productId:e||"",reason:"fetch_error"},function(){return E.getElementById("renuvex-reviews-widget")});return}var Y=L.data&&L.data.allCount||0,O=L.data&&L.data.ratingCounts||null,ye=O||[0,0,0,0,0],Le=L.data&&L.data.avgRating||"0.0";if(!O&&F.length>0){F.forEach(function(B){B.rating>=1&&B.rating<=5&&ye[B.rating-1]++});var Z=F.reduce(function(B,M){return B+M.rating},0);Le=(Z/F.length).toFixed(1)}if(Y>0){var We=zr(r.summaryLayout),Pe=We.render({widget:R,data:L,settings:r,iconPair:b,allCount:Y,ratingCounts:ye,avgRatingVal:Le,currentRatingFilter:Be,currentOrderBy:ze,currentHasImages:Ie,onFilterChange:async function(B){var M=Be===B?null:B;tr(M),Ce(1);var I=await Te(Q,ze,1,M,Ie);await be(Q,N,I,Me,ze,1)},onSortChange:async function(B,M){Ce(1);var I=B,$=!1;M&&($=!0,I="newest"),Zr($),Xe(I);var Ar=await Te(Q,I,1,Be,$);await be(Q,N,Ar,Me,I,1)}});R.appendChild(Pe)}else{var D=document.createElement("button");D.className="renuvex-pr-write-btn",D.style.cssText="display:block;margin:16px auto 0;",D.textContent=r.writeButtonText||"Yorum Yap",D.onclick=j,R.appendChild(D)}var V=(Jr||[]).filter(function(B){return ge(B).length>0});if(r.showPhotoGallery!==!1&&!Ie&&V.length>0){var W=document.createElement("div");if(W.className="renuvex-pr-photo-section",r.showPhotoGalleryTitle!==!1){var Ge=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",U=document.createElement("div");U.className="renuvex-pr-photo-title",U.textContent=Ge,W.appendChild(U)}var qe=r.reviewLayout==="card"?"1/1":"3/4";o.style.setProperty("--renuvex-pr-photo-thumb-aspect",qe);var ae=document.createElement("div");ae.className="renuvex-pr-photo-strip";var Ne=q,Re=r.reviewLayout==="card"?q:Math.round(q*4/3),we=0;V.forEach(function(B){if(!(we>=15)){var M=lr(B);if(M){var I=document.createElement("img"),$=ne(M,q);I.src=$.src,I.srcset=$.srcset,I.loading=we<3?"eager":"lazy",I.decoding="async",I.width=Ne,I.height=Re,I.className="renuvex-pr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",ie(I),(function(Ar,$t){I.onclick=function(){le($t,Ar,V)}})(M,B),ae.appendChild(I),we++}}});var H=document.createElement("button");H.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev",H.innerHTML="&#8249;",H.setAttribute("aria-label","\xD6nceki"),H.onclick=function(){ae.scrollBy({left:-200,behavior:"smooth"})};var G=document.createElement("button");G.className="renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next",G.innerHTML="&#8250;",G.setAttribute("aria-label","Sonraki"),G.onclick=function(){ae.scrollBy({left:200,behavior:"smooth"})};var Ue=document.createElement("div");Ue.className="renuvex-pr-photo-strip-wrap",Ue.appendChild(H),Ue.appendChild(ae),Ue.appendChild(G),W.appendChild(Ue),R.appendChild(W)}if(F.length===0){var Sr=document.createElement("p");Sr.className="renuvex-pr-state-msg",Sr.textContent="Hen\xFCz yorum yok.",R.appendChild(Sr)}else{var x=Qe(r.reviewLayout);F.forEach(function(M){R.appendChild(x.render(M,Nr))})}var Zt=L.data&&L.data.hasMore;if(Zt){var K=document.createElement("button");K.className="renuvex-pr-load-more",K.textContent="Daha Fazla G\xF6ster",K.onclick=async function(){K.disabled=!0,K.textContent="Y\xFCkleniyor...";var B=Xr+1,M=await Te(Q,ze,B,Be,Ie);if(M&&!mr(M)&&M.data&&Array.isArray(M.data.reviews)){it(M.data.reviews),Ce(B);var I=Qe(N.reviewLayout);M.data.reviews.forEach(function($){R.insertBefore(I.render($,Nr),K)}),M.data.hasMore?(K.disabled=!1,K.textContent="Daha Fazla G\xF6ster"):K.remove()}else K.disabled=!1,K.textContent="Tekrar Dene"},R.appendChild(K)}A.appendChild(R),Se(E),Ke(R,"reviews-widget",{productId:e||""},function(){return E.getElementById("renuvex-reviews-widget")})}catch(B){console.error("[renuvex-pr] render error:",B);var Er=document.createElement("p");Er.style.cssText="text-align:center;color:#dc2626;",Er.textContent="Yorumlar y\xFCklenirken bir hata olu\u015Ftu.",A&&A.replaceChildren(Er)}}finally{if(nr(!1),ar){var ke=ar;ir(null),be(ke.productId,ke.settings,ke.reviewsData,ke.productName,ke.orderBy,ke.page,ke.badgeSettings)}}}export{be as a,cr as b,mr as c,Te as d,ra as e,ln as f};
