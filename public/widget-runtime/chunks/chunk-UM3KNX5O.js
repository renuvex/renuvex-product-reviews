/* Renuvex Product Reviews ESM runtime | theme: default */
import{b as Je}from"./chunk-IVH3XSVO.js";import{a as ze,b as oi,c as nr,d as or,e as li,f as Ke,g as di,j as si,k as ci,l as pi}from"./chunk-GKFAEAGK.js";import{$ as $r,A as Wr,B as Ur,C as qr,D as Kr,E as Xr,F as $e,G as Qe,H as er,N as ye,O as G,P as W,Q as Ue,R as Jr,S as Pe,T as Ae,Y as Zr,a as ge,aa as ue,b as he,ba as we,c as be,ca as Qr,da as ei,e as gr,ea as fe,f as Ge,fa as ri,g as _r,ga as ii,h as Te,ha as xe,i as Or,ia as rr,j as Ie,ja as j,k as Me,ka as ir,l as K,la as tr,m as A,ma as yr,n as hr,na as wr,o as Fe,oa as ie,pa as ti,q as br,qa as te,r as Hr,ra as ai,s as We,sa as qe,t as Le,ta as ni,u as Ze,v as Yr,va as ar,w as Dr,x as jr,y as Vr,z as Gr}from"./chunk-ITEK53A4.js";var Gi=15,Wi=60*1e3,mi="__renuvexProductReviewsFetchError",xr={};function lr(e){return{type:mi,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function zr(e){return!!(e&&e.type===mi)}async function Ne(e,r,i,a,t,o){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||be,l=s+"/api/preview/reviews?page="+encodeURIComponent(i||1),c=await ze(l);if(c.ok)return await c.json()}catch(v){}return lr()}r=r||"newest",i=i||1;var u=o?"_l"+o:"",k="renuvex_pr_reviews_"+he+"_"+e+"_"+r+"_"+i+"_"+(a||"")+"_"+(t?"1":"0")+u,p=null,n=ai(k);if(n)try{var h=JSON.parse(n);if(h&&h.t!==void 0&&h.v){if(Date.now()-h.t<Wi)return h.v;p=h.v,qe(k,"")}else qe(k,"")}catch(v){qe(k,"")}try{var m=be+"/api/public/reviews?storeId="+encodeURIComponent(he)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(a?"&rating="+encodeURIComponent(a):"")+(t?"&hasImages=true":"")+(o?"&limit="+encodeURIComponent(o):""),d=await ze(m);if(!d.ok)return p||lr();var f=await d.json();return qe(k,JSON.stringify({t:Date.now(),v:f})),f}catch(v){return console.error("[renuvex-pr] fetchReviews error:",v),p||lr()}}async function Ui(e){var r=await Ne(e,"newest",1,null,!0,Gi);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Jt(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!xr[e]){xr[e]=!0;var t={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},o={enabled:!0,size:"medium"};try{var s=await oi();if(!s)return;var l=s.widgets&&s.widgets.reviews||t,c=s.widgets&&s.widgets.badge||o;if(l.enabled===!1)return;We("newest"),Le(1),Ze(null);var u=await Promise.all([Ne(e,"newest",1,null),Ui(e)]),k=u[0];Ur(u[1]),await Ce(e,l,k,r,"newest",1,c)}catch(p){console.error("[renuvex-pr] bootstrap error:",p),await Ce(e,t,lr(),r,void 0,void 0,o)}finally{delete xr[e]}}}function _e(e){return xe(e)}function qi(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ae(e,r,i,a){i?e.setProperty(r,i,a||""):e.removeProperty(r)}function Ki(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",i=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&i>1;return a&&/AppleWebKit/i.test(r)}function Xi(){var e=qi(),r=document.body.style,i=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),t=window.getComputedStyle(document.body).position==="fixed",o=Ki()&&!t;if(a>0){var s=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",s+a+"px","important")}return i.setProperty("overflow","hidden","important"),i.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Ji(e){if(e){var r=document.body.style,i=document.documentElement.style;ae(i,"overflow",e.rootOverflow,e.rootOverflowPriority),ae(i,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ae(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ae(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ae(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ae(r,"position",e.bodyPosition,e.bodyPositionPriority),ae(r,"top",e.bodyTop,e.bodyTopPriority),ae(r,"left",e.bodyLeft,e.bodyLeftPriority),ae(r,"right",e.bodyRight,e.bodyRightPriority),ae(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Zi(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Oe(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(i){}}}function $i(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function fi(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter($i)}function vi(e){var r=fi(e),i=r[0]||e.querySelector('[role="dialog"]')||e;Oe(i)}function Qi(e,r){if(e.key==="Tab"){var i=fi(r);if(!i.length){e.preventDefault(),vi(r);return}var a=i[0],t=i[i.length-1],o=document.activeElement;if(!r.contains(o)){e.preventDefault(),Oe(a);return}e.shiftKey&&o===a?(e.preventDefault(),Oe(t)):!e.shiftKey&&o===t&&(e.preventDefault(),Oe(a))}}function et(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function rt(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function it(e){if(rt(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function ui(e,r,i,a,t){Ji(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e),Oe(t)}function tt(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var t=document.createElement("div");t.className="ikr-modal-stars",t.innerHTML=ue(e.rating,A);var o=document.createElement("span");o.className="ikr-modal-date",o.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(o),i.appendChild(a);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var c=document.createElement("div");c.className="ikr-modal-body",c.textContent=(e.comment||"").trim(),c.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(c);var u=document.createElement("div");u.className="ikr-modal-reply";var k=document.createElement("div");k.className="ikr-modal-reply-label",k.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",u.appendChild(k),u.appendChild(p),u.style.display=e.merchantReply?"":"none",i.appendChild(u),r.appendChild(i),r}function ki(e,r,i){var a=i||A,t=e.querySelector(".ikr-modal-scroll-content"),o=t.querySelector(".ikr-modal-stars");o.innerHTML=ue(r.rating,a),t.querySelector(".ikr-modal-date").textContent=fe(r.createdAt);var s=t.querySelector(".ikr-modal-title");s.textContent=r.title||"",s.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var l=t.querySelector(".ikr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var c=t.querySelector(".ikr-modal-reply");c.querySelector(".ikr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",c.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",c.style.display=r.merchantReply?"":"none",e.scrollTop=0}function Sr(e,r,i,a,t,o,s,l,c){var u=_e(e),k=Math.max(0,Math.min(i||0,u.length-1)),p=document.createElement("div");p.className="ikr-modal-left";var n=document.createElement("img"),h=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";n.className="ikr-modal-main-img"+(h?" "+h:""),n.src=wr(u[k]||""),n.decoding="async",n.width=yr,n.height=Math.round(yr*4/3),n.alt="Yorum foto\u011Fraf\u0131",ti(n,function(E){if(E.style.display="none",!p.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",p.insertBefore(T,E)}}),p.appendChild(n);var m=document.createElement("button");m.className="ikr-modal-close-mobile",m.textContent="\u2715",m.setAttribute("aria-label","Kapat"),m.onclick=function(E){E.stopPropagation(),o()},p.appendChild(m);var d=0;if(p.addEventListener("touchstart",function(E){d=E.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(E){var T=d-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(C)ve(e,r,k+1,a,t,o,!0,"next",l,c);else if(y){var b=a[r+1];ve(b,r+1,0,a,t,o,!1,"next",l,c)}}else if(v)ve(e,r,k-1,a,t,o,!0,"prev",l,c);else if(S){var P=a[r-1],N=_e(P);ve(P,r-1,N.length-1,a,t,o,!1,"prev",l,c)}}},{passive:!0}),u.length>1){var f=document.createElement("div");f.className="ikr-modal-thumbs",u.forEach(function(E,T){var b=document.createElement("img"),P=ie(E,tr);b.src=P.src,b.srcset=P.srcset,b.loading="lazy",b.decoding="async",b.width=tr,b.height=tr,b.className="ikr-modal-thumb"+(T===k?" ikr-modal-thumb-active":""),b.alt="K\xFC\xE7\xFCk resim "+(T+1),te(b),b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===k&&b.setAttribute("aria-current","true"),(function(N){function L(){ve(e,r,N,a,t,o,!0,null,l,c)}b.onclick=L,b.onkeydown=function(B){(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),L())}})(T),f.appendChild(b)}),p.appendChild(f)}var v=k>0,C=k<u.length-1,S=r>0,y=r<a.length-1,x=v||S,w=C||y;if(x){var g=document.createElement("button");g.className="ikr-modal-nav ikr-modal-nav-prev",g.innerHTML="&#8249;",g.setAttribute("aria-label","\xD6nceki"),g.onclick=function(E){if(E.stopPropagation(),v)ve(e,r,k-1,a,t,o,!0,"prev",l,c);else if(S){var T=a[r-1],b=_e(T);ve(T,r-1,b.length-1,a,t,o,!1,"prev",l,c)}},p.appendChild(g)}if(w){var z=document.createElement("button");z.className="ikr-modal-nav ikr-modal-nav-next",z.innerHTML="&#8250;",z.setAttribute("aria-label","Sonraki"),z.onclick=function(E){if(E.stopPropagation(),C)ve(e,r,k+1,a,t,o,!0,"next",l,c);else if(y){var T=a[r+1];ve(T,r+1,0,a,t,o,!1,"next",l,c)}},p.appendChild(z)}return p}function gi(e,r){[-1,1].forEach(function(i){var a=r[e+i];if(a){var t=_e(a);t[0]&&(new Image().src=wr(t[0]))}})}function Cr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function at(e,r){var i=e&&e.querySelector(".ikr-modal-wrap"),a=r&&r.querySelector(".ikr-modal-right"),t=r&&r.querySelector(".ikr-modal-scroll-content");function o(){Cr(i),Cr(a),Cr(t)}o(),i&&Oe(i),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ve(e,r,i,a,t,o,s,l,c,u){if(u&&(u.currentReview=e),s){var k=Sr(e,r,i,a,t,o,l,c,u);t.firstChild&&t.replaceChild(k,t.firstChild)}else{var k=Sr(e,r,i,a,t,o,l,c,u),p=t.querySelector(".ikr-modal-right");t.firstChild&&t.replaceChild(k,t.firstChild),p&&ki(p,e,u&&u.currentSettings),at(c,t)}gi(r,a)}function ne(e,r,i){var a=_e(e);if(!a.length)return;var t=(i||[]).filter(function(x){return _e(x).length>0}),o=t.findIndex(function(x){return x===e||x.id===e.id});o===-1&&(t.unshift(e),o=0);var s=a.indexOf(r);s<0&&(s=0);var l=document.createElement("div");l.className="ikr-modal-overlay";var c=document.createElement("div");c.className="ikr-modal";var u=!1,k=Zi(),p=Xi(),n=et(),h={currentReview:e,currentSettings:A},m=null;function d(x){var w=x&&x.detail&&x.detail.settings;if(!(w&&w===m)){m=w||null,h.currentSettings=w||A;var g=c.querySelector(".ikr-modal-right");!g||!h.currentReview||ki(g,h.currentReview,h.currentSettings)}}function f(){u||(u=!0,window.removeEventListener(Pe,d),window.removeEventListener(Ae,d),ui(l,v,f,p,k))}function v(x){if(x.key==="Escape"){C();return}Qi(x,l)}function C(){u||(u=!0,window.removeEventListener(Pe,d),window.removeEventListener(Ae,d),ui(l,v,f,p,k),it(n))}document.addEventListener("keydown",v),window.addEventListener("popstate",f),window.addEventListener(Pe,d),window.addEventListener(Ae,d),l.onclick=function(){C()},c.onclick=function(x){x.stopPropagation()},c.appendChild(Sr(e,o,s,t,c,C,null,l,h)),c.appendChild(tt(e)),gi(o,t);var S=document.createElement("div");S.className="ikr-modal-wrap",S.tabIndex=-1,S.setAttribute("role","dialog"),S.setAttribute("aria-modal","true"),S.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),S.appendChild(c);var y=document.createElement("button");y.className="ikr-modal-close",y.textContent="\u2715",y.setAttribute("aria-label","Kapat"),y.onclick=function(x){x.stopPropagation(),C()},S.appendChild(y),l.appendChild(S),document.body.appendChild(l),vi(l)}function hi(e){var r=ar();if(r&&typeof r.findProductTitle=="function")try{var i=r.findProductTitle(e);if(i)return i}catch(s){}if(e)for(var a=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<a.length;t++){var o=a[t];if(o.children.length===0&&o.textContent.trim()===e&&o.tagName!=="TITLE"&&!o.closest("[data-renuvex-listing-badge]")&&!o.closest("[data-ikr-listing-badge]")&&!o.closest("[data-renuvex-slot]")&&!o.closest("#ikas-reviews")&&!o.closest("nav")&&!o.closest("header")&&!o.closest('[class*="breadcrumb"]')&&!o.closest('[aria-label*="breadcrumb"]'))return o}return document.querySelector("h1")}var dr=null,sr=null;function nt(e,r){return we(e,r)}function ot(e){var r=ar();if(r&&typeof r.getProductBadgeMountPoint=="function")try{var i=r.getProductBadgeMountPoint(e);if(i&&i.parent)return i}catch(a){}return si(e)}function Er(e,r,i,a,t,o,s){dr&&(dr.disconnect(),dr=null),sr&&(sr.disconnect(),sr=null),li("product-title-rating","product-title-badge");var l=document.querySelector(".ikr-rating-badge--pdp");if(l&&l.remove(),!!e&&!(a&&a.enabled===!1)){var c=document.getElementById("ikr-jsonld");c&&c.remove();var u=document.createElement("script");u.id="ikr-jsonld",u.type="application/ld+json",u.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(u);var k=hi(i);if(!k||!k.parentNode){gr("dom-conflict","PDP product title could not be found for badge placement",{surface:"pdp-badge",reason:"title_not_found",productName:i||"",productId:o||""});return}var p=ot(k);if(!p||!p.parent){gr("dom-conflict","PDP badge mount point could not be resolved",{surface:"pdp-badge",reason:"mount_not_found",productName:i||"",productId:o||""});return}var n=a&&a.size||"medium",h=Ke[n]||Ke.medium,m=null;if(a&&a.mobileOverride===!0){var d=a.mobileSize||"small";m=Ke[d]||Ke.small}di(h,m);var f=nr({slot:"product-title-rating",legacySlot:"product-title-badge",className:"renuvex-pr-product-badge-slot ikr-product-badge-slot",context:{surface:"pdp",productId:o||""}}),v=document.createElement("a");v.className="renuvex-pr-rating-badge ikr-rating-badge ikr-rating-badge--pdp",v.href="#ikas-reviews";var C=Qr(e,r);v.setAttribute("aria-labelledby",C.id),v.setAttribute("data-ikr-surface","pdp"),v.setAttribute("data-renuvex-surface","pdp"),v.setAttribute("data-ikr-rating",String(e)),v.setAttribute("data-renuvex-rating",String(e)),v.setAttribute("data-ikr-count",String(r)),v.setAttribute("data-renuvex-count",String(r)),or(v,{surface:"pdp",productId:o||""});var S=window.getComputedStyle(k).textAlign,y=S==="center"?"center":S==="right"?"right":"left";v.setAttribute("data-renuvex-align",y),v.setAttribute("data-ikr-align",y),v.insertAdjacentHTML("beforeend",C.html+nt(e,t));var x=document.createElement("span");x.className="ikr-rating-badge__label",x.textContent=e+" ("+r+" yorum)",v.appendChild(x),v.onclick=function(w){w.preventDefault();var g=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(g){var z=document.querySelector("header"),E=z?z.getBoundingClientRect().height:0,T=g.getBoundingClientRect().top+window.pageYOffset-E-16;window.scrollTo({top:T,behavior:"smooth"})}},f.appendChild(v),ci(f,p),sr=pi(f,p,{surface:"pdp-badge",reason:"position_reanchored",message:"PDP badge slot reordered after render",extra:{productName:i||"",productId:o||""}}),Ge(f,"pdp-badge",{productName:i||"",productId:o||""}),s||(dr=_r(f,"pdp-badge",function(){Er(e,r,i,a,t,o,!0)},{productName:i||"",productId:o||""}))}}var bi=`
  /* Widget d\u0131\u015F kutu \u2014 full-bleed: ma\u011Faza temas\u0131 widget'\u0131 padding'li bir
     section/container i\xE7ine koymu\u015F olsa bile, viewport geni\u015Fli\u011Finde yay\u0131l\u0131r.
     Teknik: width:100vw + margin-left:calc(-50vw + 50%). Bu kural widget'\u0131
     parent container'\u0131n padding'inden "d\u0131\u015Far\u0131 ta\u015F\u0131r\u0131r". Arka plan\u0131 temadan
     gelir, i\xE7erideki b\xF6l\xFCmler > * kural\u0131yla 1200px ortalan\u0131r.
     NOT: 100vw scrollbar'\u0131 hesaba katmaz \u2014 scroll varsa margin-left yerine
     parent.getBoundingClientRect() ile runtime d\xFCzeltme de yap\u0131labilir, ama
     genelde bu kural yeterli. */
  #ikas-reviews-widget{color:#111111;background:transparent;border:1px solid var(--ikr-widget-border,transparent);width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);margin-top:40px;margin-bottom:40px;padding:40px 16px;box-sizing:border-box;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;--ikr-pad-summary-mobile:16px;--ikr-pad-review-mobile:16px;}
  /* Do\u011Frudan widget \xE7ocuklar\u0131 \u2014 inner wrap (1200px ortal\u0131). Summary'deki
     3 s\xFCtun (puan + bars + buton) max boyutlarda ancak ~1030px tutuyor,
     1200px tavan wrap riskini pratik olarak s\u0131f\u0131rlar. */
  #ikas-reviews-widget > *{max-width:1200px;margin-left:auto;margin-right:auto;}
  /* NOT: Eskiden burada .ikr-body ve .ikr-reply-text i\xE7in max-width:70ch vard\u0131
     (okunabilirlik). Card layout'ta "Devam\u0131n\u0131 oku" sonras\u0131 body 70ch'de kesiliyor,
     parent geni\u015Fli\u011Fini kullanm\u0131yordu \u2014 kald\u0131r\u0131ld\u0131. Sat\u0131r uzunlu\u011Fu art\u0131k layout
     container'\u0131na ba\u011Fl\u0131. Uzun-kelime ta\u015Fma korumas\u0131 overflow-wrap:anywhere ile
     ayr\u0131 kuralda (a\u015Fa\u011F\u0131da), o davran\u0131\u015F de\u011Fi\u015Fmedi. */
  /* Kullan\u0131c\u0131 i\xE7eri\u011Fi ta\u015Fma korumas\u0131 \u2014 uzun bo\u015Fluksuz string (URL, "aaaa...",
     \xFCr\xFCn kodu) container'\u0131 zorlamas\u0131n diye yumu\u015Fak k\u0131rma. Sadece text class'lar\u0131na
     uygulan\u0131r, buton/UI tipografisine dokunulmaz. Gallery masonry i\xE7in kritik:
     tek bir uzun string break-inside:avoid'a ra\u011Fmen kolon dengesini bozard\u0131. */
  #ikas-reviews-widget .ikr-body,
  #ikas-reviews-widget .ikr-author,
  #ikas-reviews-widget .ikr-review-title,
  #ikas-reviews-widget .ikr-review-list-body,
  #ikas-reviews-widget .ikr-review-list-title,
  #ikas-reviews-widget .ikr-review-list-author-name,
  #ikas-reviews-widget .ikr-review-gallery-body,
  #ikas-reviews-widget .ikr-review-gallery-title,
  #ikas-reviews-widget .ikr-review-gallery-author,
  #ikas-reviews-widget .ikr-reply-text{overflow-wrap:anywhere;}
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget scope'undan \xC7IKAR. Global kural \u015Fart. */
  .ikr-modal-body,
  .ikr-modal-title,
  .ikr-modal-author,
  .ikr-modal-reply-text{overflow-wrap:anywhere;}
  .ikr-title{font-size:var(--ikr-title-size,24px);font-weight:500;text-align:left;margin-bottom:12px;color:var(--ikr-header-title,#111111);overflow-wrap:anywhere;}
  /* Classic layout basligi ortali \u2014 classic disindaki layout'lar sola yasli */
  .ikr-title-classic{text-align:center;}

  /* \u2500\u2500\u2500 SVG ICON WRAPPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     .ikr-icon span'\u0131 SVG'yi sarar. Boyut parent'tan (em veya inline style) gelir,
     SVG de ona g\xF6re \xF6l\xE7eklenir. color \u2192 fill (currentColor) \u2014 yani renk
     .ikr-icon'a veya parent'\u0131na verildi\u011Finde SVG o rengi al\u0131r. */
  .ikr-icon{display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}
  .ikr-icon > svg{width:100%;height:100%;display:block;}

${ei}

  /* \u2500\u2500\u2500 SUMMARY LAYOUT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Her blok ba\u011F\u0131ms\u0131z \u2014 s\u0131ra/gizleme CSS ile kolayca de\u011Fi\u015Ftirilebilir.
     Kolon geni\u015Flikleri CSS variable ile payla\u015F\u0131l\u0131r (label/count s\xFCtunlar\u0131).
     Bu sayede bar-row ve actions-row ayn\u0131 hizada kal\u0131r. */
  .ikr-summary{
    --ikr-col-label:104px;
    --ikr-col-count:60px;
    --ikr-col-gap:4px;
    --ikr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;border-radius:var(--ikr-radius,6px);margin:0 auto 24px;
  }
  .ikr-summary-block{display:flex;flex-direction:column;align-items:center;width:100%;max-width:var(--ikr-summary-max);}

  /* Blok: Ortalama puan (b\xFCy\xFCk) */
  .ikr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .ikr-avg-star{width:var(--ikr-avg-star-size,52px);height:var(--ikr-avg-star-size,52px);color:var(--ikr-review-star-color,#f59e0b);line-height:1;}
  .ikr-avg-num{font-size:var(--ikr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--ikr-header-avg,#111111);}

  /* Blok: Toplam yorum say\u0131s\u0131 */
  .ikr-summary-count{font-size:var(--ikr-review-count-size,16px);color:var(--ikr-header-count,#111111);white-space:nowrap;font-weight:400;max-width:none;width:auto;}

  /* Blok: Tavsiye y\xFCzdesi */
  .ikr-summary-recommend{display:block;font-size:var(--ikr-recommend-size,14px);color:var(--ikr-header-recommend,#111111);text-align:center;max-width:none;width:auto;}
  .ikr-recommend-pct{font-weight:700;color:var(--ikr-header-recommend,#111111);margin-right:3px;}

  /* Blok: Bar chart \u2014 her sat\u0131r 3 kolon (label | track | count) */
  /* Bar chart \u2014 flex layout. Track her sat\u0131rda sabit geni\u015Flik (label+count
     kolonu \xE7\u0131kart\u0131lm\u0131\u015F kalan alan). Count absolute, track'in sa\u011F\u0131nda
     say\u0131 kadar yer kaplar \u2014 di\u011Fer sat\u0131rlar\u0131n track'ini etkilemez. */
  .ikr-summary-bars{display:flex;flex-direction:column;gap:4px;width:100%;max-width:var(--ikr-summary-max);}
  .ikr-bar-row{
    display:flex;align-items:center;justify-content:flex-start;gap:var(--ikr-col-gap);width:100%;
    cursor:pointer;border-radius:var(--ikr-radius,6px);padding:3px 6px;
    box-sizing:border-box;position:relative;
  }
  @media(hover:hover){.ikr-bar-row:hover{background:var(--ikr-bar-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-bar-active{background:var(--ikr-bar-hover-bg,rgba(17,17,17,0.07))!important;}
  .ikr-bar-label{flex:0 0 var(--ikr-col-label);display:inline-flex;align-items:center;gap:2px;white-space:nowrap;font-size:var(--ikr-bar-label-size,16px);color:#111111;}
  .ikr-bar-star{width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);}
  .ikr-bar-star-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-star-empty{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-bar-track{flex:1 1 auto;min-width:0;background:var(--ikr-bar-track,#e5e7eb);border-radius:var(--ikr-radius-sm,4px);height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-bar-fill,#111111);border-radius:var(--ikr-radius-sm,4px);}
  .ikr-bar-count{flex:0 0 var(--ikr-col-count);white-space:nowrap;text-align:right;color:var(--ikr-bar-count,#111111);font-size:var(--ikr-bar-count-size,14px);}

  /* Blok: Aksiyon sat\u0131r\u0131 (yorum yap + filtre) \u2014 bar row sol kenar\u0131ndan ba\u015Flar, filtre count hizas\u0131nda.
     Padding yok ki wrapper tam 340px kullansin; bar chart ile kenar hizasi
     tutsun. Bar row'un kendi 3px 6px padding'i hover alani icin, actions'in
     buna ihtiyaci yok. */
  .ikr-summary-actions{
    display:flex;flex-direction:row;align-items:stretch;gap:var(--ikr-col-gap);
    box-sizing:border-box;
  }
  /* min-height:36px \u2014 filter butonu (36\xD736 sabit) ile ayni yukseklikte tutar.
     Font small/medium'da yukseklik 36'ya kilitlenir; large font'ta padding
     katkisi ile bir miktar buyur ama filter'la dengeli kalir. */
  .ikr-write-btn{flex:1 1 auto;min-width:0;min-height:36px;background:var(--ikr-btn-bg,#111111);color:var(--ikr-btn-text,#ffffff);padding:10px 24px;border-radius:var(--ikr-radius,6px);cursor:pointer;border:1px solid var(--ikr-btn-border,#111111);font-weight:500;font-size:var(--ikr-btn-text-size,14px);white-space:nowrap;transition:opacity 0.15s;}
  @media(hover:hover){.ikr-write-btn:hover{opacity:0.92;}}
  .ikr-filter-wrap{flex:0 0 var(--ikr-col-count);position:relative;display:flex;justify-content:flex-end;align-items:stretch;}
  /* Filter button colors come from the Filtre color group in admin. */
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:36px;min-height:36px;height:auto;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-filter-btn-border,#111111);background:var(--ikr-filter-btn-bg,transparent);color:var(--ikr-filter-btn-text,#111111);cursor:pointer;}
  /* Material Symbols viewBox 0 -960 960 960 \u2014 buton i\xE7ine s\u0131\u011Fmas\u0131 i\xE7in 16x16 */
  .ikr-filter-btn svg{width:16px;height:16px;flex-shrink:0;}

  /* Filtre dropdown (wrap yukar\u0131da tan\u0131mland\u0131) */
  /* Filter dropdown \u2014 Premium growOut animasyonu (200ms ease-in-out) */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:var(--ikr-filter-menu-bg,#ffffff);border:1px solid var(--ikr-filter-menu-border,#e5e7eb);border-radius:var(--ikr-radius,6px);box-shadow:0 4px 16px rgba(0,0,0,0.08);min-width:180px;overflow:hidden;z-index:999;visibility:hidden;opacity:0;pointer-events:none;transform-origin:top right;}
  .ikr-filter-menu.ikr-open{visibility:visible;pointer-events:auto;animation:ikr-grow-out 200ms ease-in-out forwards;}
  .ikr-filter-item{display:block;width:100%;text-align:left;padding:10px 16px;font:inherit;font-size:var(--ikr-filter-text-size,14px);color:var(--ikr-filter-item-text,#111111);background:transparent;border:0;cursor:pointer;}
  @media(hover:hover){.ikr-filter-item:hover{background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-filter-item-active,#111111);}
  .ikr-filter-btn:focus-visible,
  .ikr-filter-item:focus-visible{outline:2px solid var(--ikr-filter-focus-ring,rgba(17,17,17,0.55));outline-offset:2px;}
  .ikr-filter-item:focus-visible{outline-offset:-2px;background:var(--ikr-filter-item-hover-bg,rgba(17,17,17,0.07));}

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .ikr-photo-section{margin-bottom:24px;padding:0 var(--ikr-pad-review-mobile);}
  /* Strip \xFCst\xFCndeki b\xF6l\xFCm ba\u015Fl\u0131\u011F\u0131 (End\xFCstri standard\u0131: "Customer Photos") \u2014
     admin "Foto\u011Fraf Galerisi \u2192 Ba\u015Fl\u0131k Rengi" ve SIZE_PRESETS.photoTitleSize
     bu \xF6\u011Feyi kontrol eder. */
  .ikr-photo-title{
    font-size:var(--ikr-photo-title-size,16px);
    font-weight:500;
    color:var(--ikr-photo-title,#111111);
    margin-bottom:12px;
    overflow-wrap:anywhere;
  }
  .ikr-photo-strip-wrap{position:relative;}
  /* .ikr-photo-strip ve .ikr-photo-strip-thumb as\u0131l tan\u0131mlar\u0131 a\u015Fa\u011F\u0131da
     (sat\u0131r 266 ve 268). Bu \xF6l\xFC duplicate kurallar temizlendi.
     .ikr-photo-thumb hi\xE7bir DOM taraf\u0131ndan kullan\u0131lm\u0131yordu \u2014 silindi. */

  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:10;background:var(--ikr-photo-arrow-bg,#fff);border:1px solid var(--ikr-photo-arrow-border,rgba(0,0,0,0.12));border-radius:var(--ikr-radius,6px);width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:var(--ikr-photo-arrow-text,#111111);box-shadow:0 2px 8px rgba(0,0,0,0.08);transition:all 0.2s ease;}
  @media(hover:hover){.ikr-photo-strip-arrow:hover{background:var(--ikr-photo-arrow-bg,#fff);transform:translateY(-50%) scale(1.08);box-shadow:0 4px 12px rgba(0,0,0,0.12);}}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  /* Card review item \u2014 yan padding mobile'da --ikr-pad-review-mobile uzerinden
     (mobile blo\u011Funda set edilir). Burada sadece top/bottom; shorthand yerine
     ayr\u0131 property ki mobile yan override'\u0131 specificity sava\u015F\u0131nda kaybetmesin. */
  .ikr-review{padding-top:20px;padding-bottom:20px;border-bottom:1px solid var(--ikr-review-border,#e5e7eb);}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .ikr-review-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-review-stars .ikr-icon{width:var(--ikr-star-size,20px);height:var(--ikr-star-size,20px);}
  .ikr-stars .ikr-icon-filled{color:var(--ikr-review-star-color,#f59e0b);}
  .ikr-stars .ikr-icon-empty{color:var(--ikr-review-star-color,#f59e0b);}
  /* Yorum item dikey ritm: stars\u2192title (normal), title\u2192author (normal),
     author\u2192body (normal), body\u2192reply (loose). Bkz: gap s\xF6zle\u015Fmesi (\xFCst yorum). */
  .ikr-review-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-date{color:var(--ikr-review-date,#5e5e5e);font-size:var(--ikr-review-date-size,12px);font-weight:400;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:var(--ikr-gap-normal);line-height:1.65;color:var(--ikr-review-body,#111111);font-size:var(--ikr-review-text-size,14px);font-weight:400;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:var(--ikr-gap-tight);color:var(--ikr-review-body,#111111);font-weight:600;cursor:pointer;font-size:var(--ikr-read-more-size,12px);}
  .ikr-gallery{display:flex;gap:10px;flex-wrap:wrap;margin-top:var(--ikr-gap-loose);}
  .ikr-img{width:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));height:var(--ikr-card-photo-w,var(--ikr-thumbnail-size,90px));object-fit:cover;border-radius:var(--ikr-radius,6px);border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));cursor:zoom-in;}
  .ikr-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);overflow-wrap:anywhere;}
  .ikr-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,#111111);line-height:1.6;}
  /* Reply clamp: yorum metni (.ikr-body-clamped) 4 sat\u0131r; reply 2 sat\u0131r
     (subordinate, m\xFC\u015Fteri yorumundan k\u0131sa kal\u0131r). "Devam\u0131n\u0131 oku" sadece
     clamp devreye girdiyse g\xF6r\xFCn\xFCr \u2014 buildReplyEl helper'\u0131 runtime kontrol eder. */
  .ikr-reply-text-clamped{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-reply-read-more{margin-top:var(--ikr-gap-tight);}

  /* Daha Fazla G\xF6ster butonu \u2014 tema uyumlu, outline stil */
  .ikr-load-more{display:block;margin:20px auto 0;padding:10px 28px;border:1px solid var(--ikr-load-more-border,#111111);border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,#ffffff);color:var(--ikr-load-more-text,#111111);font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-load-more:disabled{opacity:.6;cursor:not-allowed;}

  /* Y\xFCkleniyor / bo\u015F durum mesajlar\u0131 \u2014 tema uyumlu */
  .ikr-state-msg{text-align:center;color:rgba(17,17,17,0.45);font-size:14px;padding:30px 0;}
  .ikr-state-loading{padding:40px;}
  .ikr-state-error{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#991b1b;}
  .ikr-state-error-text{max-width:360px;line-height:1.45;}
  .ikr-state-retry{padding:9px 22px;border:1px solid var(--ikr-load-more-border,#111111);border-radius:var(--ikr-radius,6px);background:var(--ikr-load-more-bg,#ffffff);color:var(--ikr-load-more-text,#111111);font-size:var(--ikr-load-more-size,14px);cursor:pointer;}
  .ikr-state-retry:disabled{opacity:.6;cursor:not-allowed;}

  /* Review Modal */
  /* Modal document.body'ye portal'lan\u0131r \u2192 widget root scope'undan \xC7IKAR.
     Yorum item gap token'lar\u0131 (--ikr-gap-*) burada da yeniden tan\u0131mlan\u0131r
     ki modal-* selekt\xF6rleri base ile ayn\u0131 dili konu\u015Fsun. Tek do\u011Fruluk
     kayna\u011F\u0131 yine \xFCstteki s\xF6zle\u015Fme yorumudur. */
  .ikr-modal-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,0.50);overscroll-behavior:contain;--ikr-gap-tight:4px;--ikr-gap-normal:8px;--ikr-gap-loose:16px;--ikr-gap-section:24px;}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-photo-section{margin:24px 0 32px;padding:0 var(--ikr-pad-review-mobile);display:block;}
  .ikr-photo-strip-container{position:relative;}
  /* Desktop: ok'lar icin negatif margin. Mobile'da ok yok, margin gerekmez. */
  @media(min-width:601px){
    .ikr-photo-strip-container{margin:0 calc(-1 * var(--ikr-pad-review-mobile));}
  }
  .ikr-photo-strip{display:flex;gap:10px;overflow-x:auto;padding:4px 0;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  /* Thumbnail geni\u015Fli\u011Fi sabit (--ikr-thumbnail-size); y\xFCksekli\u011Fi aspect-ratio
     ile gelir. --ikr-photo-thumb-aspect render.js'de review layout'a g\xF6re set
     edilir: card -> 1/1 (kare), list & gallery -> 3/4 (portre, item fotolar\u0131yla
     tutarl\u0131). Fallback 1/1, eski davran\u0131\u015F. */
  .ikr-photo-strip-thumb{flex:0 0 var(--ikr-thumbnail-size,90px);width:var(--ikr-thumbnail-size,90px);height:auto;aspect-ratio:var(--ikr-photo-thumb-aspect,1/1);border-radius:var(--ikr-radius,8px);object-fit:cover;cursor:pointer;transition:transform 0.2s ease;border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));}
  @media(hover:hover){.ikr-photo-strip-thumb:hover{transform:translateY(-2px);}}

  .ikr-photo-strip-wrap{position:relative;display:block;}

  .ikr-modal{background:#ffffff;color:#111111;border-radius:calc(var(--ikr-radius, 8px) * 1.5);overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;display:block;background:#222;}
  /* G\xF6rsel y\xFCklenemedi\u011Finde ana <img> gizlenir, yerine bu placeholder konur.
     ikr-modal-left koyu zemini koruyor, metin n\xF6tr kal\u0131yor. */
  .ikr-modal-img-error{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;color:#cccccc;background:#222;font-size:14px;line-height:1.4;text-align:center;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close,
  .ikr-modal-close-mobile{background:#00000080;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:var(--ikr-radius,6px);width:32px;height:32px;align-items:center;justify-content:center;}
  .ikr-modal-close{position:absolute;top:-42px;right:0;display:flex;z-index:100000;}
  @media(hover:hover){.ikr-modal-close:hover{opacity:0.85;}}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;z-index:2;}
  @media(hover:hover){.ikr-modal-close-mobile:hover{opacity:0.85;}}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:#00000059;border:1px solid #ffffff33;box-sizing:border-box;color:#ffffff;width:36px;height:36px;border-radius:var(--ikr-radius,6px);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  @media(hover:hover){.ikr-modal-nav:hover{opacity:0.85;}}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:var(--ikr-radius,6px);cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-close:focus-visible,.ikr-modal-close-mobile:focus-visible,.ikr-modal-nav:focus-visible,.ikr-modal-thumb:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}
  .ikr-modal-right{flex:1;min-width:0;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:0;display:flex;flex-direction:column;background:#ffffff;color:#111111;}
  /* Flex zincirinde her seviye min-width:0 olmazsa unbreakable string parent'\u0131 zorlar.
     scroll-content de flex column \u2192 child'lar\u0131 (modal-body vs.) shrink edebilsin diye
     burada da min-width:0 zorunlu. overflow-wrap:anywhere ancak shrink m\xFCmk\xFCnse i\u015F g\xF6r\xFCr. */
  .ikr-modal-scroll-content > *{min-width:0;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .ikr-modal-stars{display:inline-flex;gap:2px;align-items:center;}
  .ikr-modal-stars .ikr-icon{width:var(--ikr-star-size,24px);height:var(--ikr-star-size,24px);}
  .ikr-modal-date{font-size:var(--ikr-review-date-size,12px);font-weight:400;color:var(--ikr-review-date,#5e5e5e);white-space:nowrap;flex-shrink:0;}
  /* Modal yorum item dikey ritm \u2014 base ile ayn\u0131 s\xF6zle\u015Fme. scroll-content
     uniform gap kullanmaz, her child kendi margin-top'unu token ile al\u0131r. */
  .ikr-modal-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-author{font-size:var(--ikr-author-size,14px);font-weight:600;font-style:normal;color:var(--ikr-review-author,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;min-width:0;}
  .ikr-modal-body{font-size:var(--ikr-review-text-size,14px);font-weight:400;line-height:1.65;color:var(--ikr-review-body,#111111);margin-top:var(--ikr-gap-normal);}
  .ikr-modal-reply{margin-top:var(--ikr-gap-loose);padding:12px 16px;background:var(--ikr-reply-bg-color,#f9fafb);border-radius:var(--ikr-radius,6px);border-left:3px solid var(--ikr-reply-border,#747474);}
  .ikr-modal-reply-label{font-weight:600;font-size:var(--ikr-reply-name-size,13px);color:var(--ikr-reply-label,#111111);margin-bottom:4px;overflow-wrap:anywhere;}
  .ikr-modal-reply-text{font-size:var(--ikr-reply-text-size,13px);font-weight:400;color:var(--ikr-reply-text,#111111);line-height:1.6;}

  /* Responsive */
  @media(min-width:641px) and (max-width:800px){
    .ikr-modal-wrap{width:100%;max-width:640px;max-height:calc(100vh - 32px);max-height:calc(100svh - 32px);max-height:calc(100dvh - 32px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;}
    .ikr-modal{flex-direction:column;height:auto;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;height:420px;height:min(420px, 56vh);height:min(420px, 56svh);height:min(420px, 56dvh);}
    .ikr-modal-right{flex:none;width:100%;overflow-y:visible;}
    .ikr-modal-scroll-content{padding:20px 20px 32px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:transparent;}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:scroll;z-index:100000;width:100%;max-width:100%;height:100vh;height:100svh;height:100dvh;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,0.50);}
    .ikr-modal{flex-direction:column;height:auto;min-height:100vh;min-height:100svh;min-height:100dvh;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;aspect-ratio:3/4;overflow:hidden;}
    .ikr-modal-right{overflow-y:visible;flex:none;width:100%;}
    .ikr-modal-scroll-content{padding:16px 16px 48px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:600px){
    /* Mobile'da yan padding bagimsiz: summary ve review listesi ayri
       CSS degiskenleri uzerinden. Root frame padding 0 olur, her blok
       kendi yan bosluklarini verir.
       --ikr-pad-summary-mobile: summary bloklari (classic/split/compact/hero/minimal)
       --ikr-pad-review-mobile:  yorum listesi container'i (#ikas-reviews)
       Ileride admin panelinden degistirmek icin: settings -> CSS variable. */
    #ikas-reviews-widget{padding-left:0;padding-right:0;}
    /* Summary yan padding'i .ikr-summary mobile bloguna eklendi (--ikr-pad-summary-mobile) */
    /* Review layoutlari widget direct child \u2014 her item kendi yan padding'ini
       --ikr-pad-review-mobile uzerinden alir. #ikas-reviews container'ina
       padding vermek yerine item class'larina vermek gerek cunku review'lar
       widget'in child'i, #ikas-reviews icinde degil. */
    .ikr-review-card,
    .ikr-review-list,
    .ikr-review-gallery{
      padding-left:var(--ikr-pad-review-mobile);
      padding-right:var(--ikr-pad-review-mobile);
      box-sizing:border-box;
    }
    /* Yan padding --ikr-pad-summary-mobile uzerinden; top/bottom 16px sabit */
    .ikr-summary{padding:16px var(--ikr-pad-summary-mobile);gap:14px;--ikr-col-label:92px;--ikr-col-count:32px;}
    /* Widget basligi summary'nin disinda, widget direct child \u2014 kendi yan
       padding'ini ayni variable'dan alir (summary ile hizali kalsin). */
    .ikr-title{
      padding-left:var(--ikr-pad-summary-mobile);
      padding-right:var(--ikr-pad-summary-mobile);
      text-align:center;
    }
    /* Review item yan padding'i mobile'da --ikr-pad-review-mobile. Card
       (.ikr-review), list (.ikr-review-list) ve gallery (.ikr-review-gallery)
       kendi top/bottom padding'lerini koruyarak yan padding'i variable'dan alir.
       Shorthand kullanilmadigi icin her layout'un kendi kuralini ezmez. */
    .ikr-review,
    .ikr-review-list,
    .ikr-review-list.ikr-review-list--no-media,
    .ikr-review-gallery{
      padding-left:var(--ikr-pad-review-mobile);
      padding-right:var(--ikr-pad-review-mobile);
    }
    .ikr-review-top-left{flex-direction:column;align-items:flex-start;gap:4px;}
    /* Gallery \u2014 foto\u011Frafl\u0131 yorumlar strip'i mant\u0131\u011F\u0131: flex-wrap:nowrap +
       overflow-x:auto, thumb'lar flex-shrink:0 ile orjinal boyutta kal\u0131yor,
       s\u0131\u011Fmayanlar yatay scroll'da kayd\u0131r\u0131l\u0131yor. */
    .ikr-gallery{flex-wrap:nowrap;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
    .ikr-gallery::-webkit-scrollbar{display:none;}
    .ikr-img{flex-shrink:0;}
  }
`;var Pr={};ge(Pr,{meta:()=>kt,render:()=>gt});function He(e){var r=e.ratingCounts,i=e.allCount,a=e.iconPair,t=e.currentRatingFilter,o=e.onFilterChange;ye(a);var s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var c=r[l-1]||0,u=i>0?Math.round(c/i*100):0,k=t===l,p=document.createElement("div");p.className="ikr-bar-row"+(k?" ikr-bar-active":""),t&&!k&&(p.style.opacity="0.35");for(var n="",h=1;h<=5;h++){var m=h<=l;n+='<span class="ikr-bar-star ikr-icon '+(m?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+G(m?"full":"outline")+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+n+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+u+'%;"></div></div><span class="ikr-bar-count">('+c.toLocaleString("tr-TR")+")</span>",(function(d){p.onclick=function(){o(d)}})(l),s.appendChild(p)}return s}var oe=[],yi=!1;function lt(e){for(var r=oe.length-1;r>=0;r--){var i=oe[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function dt(e){if(e.key==="Escape")for(var r=oe.length-1;r>=0;r--)oe[r].close()}function st(){yi||typeof document=="undefined"||(document.addEventListener("click",lt,!0),document.addEventListener("keydown",dt),yi=!0)}function cr(e){for(var r=0;r<oe.length;r++)oe[r]!==e&&oe[r].close()}function pr(e){st();var r={trigger:e.trigger,element:e.element,close:e.close};return oe.push(r),function(){var a=oe.indexOf(r);a!==-1&&oe.splice(a,1)}}function X(e){var r=e.widget,i=e.currentOrderBy,a=e.currentHasImages,t=e.onWriteClick,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent=A&&A.writeButtonText||"Yorum Yap",l.onclick=t,s.appendChild(l);var c=document.createElement("div");c.className="ikr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="ikr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var k=A&&A.filterIcon||"lines";u.innerHTML=W(Jr(k));var p=document.createElement("div");p.className="ikr-filter-menu",p.setAttribute("role","menu");var n=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],h=!1;function m(v){var C=p.classList.contains("ikr-open");p.classList.remove("ikr-open"),u.classList.remove("ikr-filter-btn-active"),u.setAttribute("aria-expanded","false");var S=v&&(v.restoreFocus===!0||v.restoreFocus==="auto"&&Je());if(C&&S)try{u.focus({preventScroll:!0})}catch(y){try{u.focus()}catch(x){}}}function d(){cr(f),p.classList.add("ikr-open"),u.classList.add("ikr-filter-btn-active"),u.setAttribute("aria-expanded","true");var v=p.querySelector(".ikr-filter-item-active")||p.querySelector(".ikr-filter-item");v&&requestAnimationFrame(function(){try{v.focus({preventScroll:!0})}catch(C){try{v.focus()}catch(S){}}})}n.forEach(function(v){var C=v[2],S=C?a:!a&&(i||"newest")===v[0],y=document.createElement("button");y.type="button",y.className="ikr-filter-item"+(S?" ikr-filter-item-active":""),y.setAttribute("role","menuitem"),y.textContent=v[1];var x=!1;function w(g,z){g&&(g.preventDefault(),g.stopPropagation()),!x&&(x=!0,h=!0,m({restoreFocus:z}),o(v[0],C),setTimeout(function(){x=!1,h=!1},0))}y.addEventListener("pointerdown",function(g){g.button!==void 0&&g.button!==0||w(g,!1)}),typeof window!="undefined"&&!window.PointerEvent&&y.addEventListener("touchstart",function(g){w(g,!1)},{passive:!1}),y.addEventListener("mousedown",function(g){g.button!==void 0&&g.button!==0||w(g,!1)}),y.addEventListener("keydown",function(g){(g.key==="Enter"||g.key===" ")&&w(g,!0)}),y.onclick=function(g){w(g,!1)},p.appendChild(y)}),u.onclick=function(){p.classList.contains("ikr-open")?m({restoreFocus:"auto"}):d()},c.addEventListener("keydown",function(v){v.key==="Escape"&&p.classList.contains("ikr-open")&&(v.stopPropagation(),m({restoreFocus:!0}))}),c.addEventListener("focusout",function(v){if(p.classList.contains("ikr-open")&&!h){var C=v.relatedTarget;C&&c.contains(C)||m()}});var f=pr({trigger:c,element:p,close:m});return c.appendChild(u),c.appendChild(p),s.appendChild(c),s}function wi(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var t=document.createElement("div");t.className="ikr-fwizard",a.appendChild(t);var o=document.createElement("button");o.className="ikr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat"),o.innerHTML=W('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),t.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-content",t.appendChild(s);var l=!1,c=null,u=!1,k="",p="";function n(){var b=document.activeElement;return!b||b===document.body||b===document.documentElement?null:b}function h(b){if(!(!b||!document.contains(b)||typeof b.focus!="function"))try{b.focus({preventScroll:!0})}catch(P){try{b.focus()}catch(N){}}}function m(b){if(!b||b.disabled||b.getAttribute("aria-hidden")==="true")return!1;var P=window.getComputedStyle?window.getComputedStyle(b):null;return P&&(P.display==="none"||P.visibility==="hidden")?!1:!!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)}function d(b){var P=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(b.querySelectorAll(P)).filter(m)}function f(){var b=d(s),P=d(a),N=b[0]||P[0]||a;h(N)}function v(b){if(b.key==="Tab"){var P=d(a);if(!P.length){b.preventDefault(),h(a);return}var N=P[0],L=P[P.length-1],B=document.activeElement;if(!a.contains(B)){b.preventDefault(),h(N);return}b.shiftKey&&B===N?(b.preventDefault(),h(L)):!b.shiftKey&&B===L&&(b.preventDefault(),h(N))}}function C(){var b=window.innerWidth-document.documentElement.clientWidth;k=document.body.style.overflow,p=document.body.style.paddingRight,document.body.style.overflow="hidden",b>0&&(document.body.style.paddingRight=b+"px")}function S(){document.body.style.overflow=k,document.body.style.paddingRight=p}function y(){l||(l=!0,document.removeEventListener("keydown",x),a.removeEventListener("click",w),o.removeEventListener("click",y),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),S(),u&&h(c);try{r()}catch(b){}},200))}function x(b){if(b.key==="Escape"){y();return}v(b)}function w(b){b.target===a&&i&&y()}document.addEventListener("keydown",x),a.addEventListener("click",w),o.addEventListener("click",y);function g(b){c=n(),u=Je(),b&&s.appendChild(b),document.body.appendChild(a),C(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open"),f()})}var z=null,E=null;function T(b,P){if(P=P||"error",z){try{z.remove()}catch(N){}z=null}E&&(clearTimeout(E),E=null),z=document.createElement("div"),z.className="ikr-fwizard-toast ikr-fwizard-toast--"+P,z.textContent=b,t.appendChild(z),E=setTimeout(function(){z&&(z.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(z){try{z.remove()}catch(N){}z=null}},300))},4e3)}return{open:g,close:y,content:s,setAllowOutsideClose:function(b){i=!!b},setStepAttr:function(b){t.setAttribute("data-step",String(b))},focusFirstControl:f,showToast:T}}var xi=`
  /* Backdrop \u2014 viewport'u kaplar, modal kutusunu ortalar */
  .ikr-fwizard-overlay{
    position:fixed;
    inset:0;
    z-index:99999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:16px;
    background:var(--ikr-fwizard-overlay-bg, rgba(0,0,0,0.50));
    /* A\xE7\u0131l\u0131\u015F fade animasyonu */
    opacity:0;
    transition:opacity 0.2s ease;
  }
  .ikr-fwizard-overlay.ikr-fwizard-open{
    opacity:1;
  }

  /* Modal kutusu \u2014 680\xD7600, max 85vh */
  .ikr-fwizard{
    position:relative;
    width:100%;
    max-width:680px;
    height:600px;
    max-height:85vh;
    background:var(--ikr-fwizard-bg, #ffffff);
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    border:none;
    border-radius:var(--ikr-radius,12px);
    display:flex;
    flex-direction:column;
    overflow:hidden;
    /* Scale kald\u0131r\u0131ld\u0131 \u2014 sayfa i\xE7eri\u011Finde sub-pixel kayma yarat\u0131yordu */
  }

  /* Close (X) butonu \u2014 sa\u011F \xFCst k\xF6\u015Fe */
  .ikr-fwizard-close{
    position:absolute;
    top:8px;
    right:8px;
    width:44px;
    height:44px;
    border-radius:var(--ikr-radius-sm,8px);
    border:none;
    background:transparent;
    color:var(--ikr-fwizard-close-text, #6b7280);
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
  .ikr-fwizard[data-step="1"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="thanks"] .ikr-fwizard-close{
    display:flex;
  }
  .ikr-fwizard[data-step="2"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="3"] .ikr-fwizard-close,
  .ikr-fwizard[data-step="4"] .ikr-fwizard-close{
    display:none;
  }

  @media(hover:hover){
    .ikr-fwizard-close:hover{
      background:var(--ikr-fwizard-close-hover-bg, rgba(0,0,0,0.05));
      color:var(--ikr-fwizard-text, #111111);
    }
  }

  /* \u0130\xE7erik konteyneri \u2014 wizard layout (step + footer) burada. */
  .ikr-fwizard-content{
    padding:0;
    overflow:hidden;
    flex:1 1 auto;
    display:flex;
    flex-direction:column;
    min-height:320px;
  }

  /* Wizard layout \u2014 step i\xE7eri\u011Fi + alttaki progress bar dikey */
  .ikr-fwizard-layout{
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    min-height:0;
  }

  /* Step i\xE7eri\u011Fi konteyneri \u2014 scroll burada */
  .ikr-fwizard-step-wrap{
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
  .ikr-fwizard-step{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:32px;
  }

  /* Step ge\xE7i\u015F animasyonlar\u0131 \u2014 Standart, belirgin ve s\xFCreyi optimize eden "Deep Fade & Slide" tasar\u0131m\u0131.
     Hem masa\xFCst\xFC hem mobil i\xE7in standart. Arka plan i\u015Flemlerine (upload vb.) zaman kazand\u0131r\u0131r. */
  .ikr-fwizard-step--enter{
    animation:ikrStepEnter 0.65s ease forwards;
    will-change:opacity;
  }
  .ikr-fwizard-step--exit{
    animation:ikrStepExit 0.3s ease forwards;
    will-change:opacity;
  }
  @keyframes ikrStepEnter{
    0%   { opacity:0; }
    100% { opacity:1; }
  }
  @keyframes ikrStepExit{
    0%   { opacity:1; }
    100% { opacity:0; }
  }


  /* Step ba\u015Fl\u0131\u011F\u0131 \u2014 varsay\u0131lan (step 1: y\u0131ld\u0131z) */
  .ikr-fwizard-step-title{
    font-size:18px;
    font-weight:500;
    color:var(--ikr-fwizard-text, rgb(17,17,17));
    line-height:1.3;
  }

  /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 \u2014 step 2/3/4 ba\u015Fl\u0131klar\u0131 daha g\xFC\xE7l\xFC
     g\xF6r\xFCn\xFCm gerektirir. Mobile'da @media i\xE7inde 18px/700'e iner. */
  .ikr-fwizard-step-title--lg{
    font-size:26px;
    font-weight:700;
    line-height:1.25;
  }

  /* Step alt ba\u015Fl\u0131\u011F\u0131 \u2014 ba\u015Fl\u0131\u011F\u0131n hemen alt\u0131nda, daha s\xF6n\xFCk */
  .ikr-fwizard-step-subtitle{
    margin-top:-20px;
    font-size:16px;
    font-weight:400;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
    line-height:1.4;
  }

  /* Te\u015Fekk\xFCr Ekran\u0131 \xD6zel (Extra Large) */
  .ikr-fwizard-thanks-title{
    font-size:38px !important;
    font-weight:700 !important;
    line-height:1.1;
  }
  .ikr-fwizard-thanks-subtitle{
    font-size:16px !important;
    margin-top:0 !important;
    font-weight:400;
  }
  .ikr-fwizard-step-thanks{
    justify-content:center;
    padding-bottom:40px;
    gap:12px !important;
  }

  /* \u2500\u2500\u2500 Step 2: Foto kart\u0131 \u2500\u2500\u2500 */
  .ikr-fwizard-photo-card{
    width:100%;
    max-width:420px;
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    border-radius:var(--ikr-radius,12px);
    padding:12px;
    display:flex;
    flex-direction:column;
    align-items:stretch;
    gap:16px;
    box-sizing:border-box;
    transition:all 0.3s ease;
  }
  /* Kompakt mod: Foto\u011Fraflar yan yana, buton kare */
  .ikr-fwizard-photo-card--compact{
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
    gap:10px;
  }
  .ikr-fwizard-photo-add{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:10px;
    width:100%;
    padding:14px 20px;
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border-radius:var(--ikr-radius-sm,8px);
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    user-select:none;
    transition:all 0.2s;
    box-sizing:border-box;
    border:1px solid transparent;
  }
  /* Kompakt buton tasar\u0131m\u0131 */
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add{
    width:88px;
    height:88px;
    padding:0;
    background:var(--ikr-fwizard-bg, #f9f9f9);
    color:var(--ikr-fwizard-text, #000000);
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    order:10; /* Listenin sonuna atar */
  }
  .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add:hover{
    opacity:0.92;
  }
  .ikr-fwizard-photo-add--disabled{
    opacity:0.4;
    cursor:not-allowed;
    pointer-events:none;
  }
  .ikr-fwizard-photo-add svg{
    flex-shrink:0;
    width:20px;
    height:20px;
  }
  .ikr-fwizard-photo-card--compact .ikr-fwizard-photo-add span{
    display:none;
  }
  .ikr-fwizard-photo-previews{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
  }
  .ikr-fwizard-photo-previews:empty{
    display:none;
  }
  .ikr-fwizard-photo-thumb{
    position:relative;
    width:88px;
    height:88px;
    border-radius:var(--ikr-radius-sm,8px);
    overflow:hidden;
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
  }
  .ikr-fwizard-photo-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    pointer-events:none;
    -webkit-user-drag:none;
    user-select:none;
  }
  .ikr-fwizard-photo-loading{
    position:absolute;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(255,255,255,0.75);
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:var(--ikr-radius-sm,8px);
  }
  .ikr-upload-error {
    color: #ff3333;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
    padding: 0 4px;
  }
  .ikr-fwizard-photo-remove{
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
  .ikr-fwizard-content-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:12px;
    text-align:left;
  }
  .ikr-fwizard-input,
  .ikr-fwizard-textarea{
    width:100%;
    padding:12px 14px;
    background:var(--ikr-fwizard-input-bg, #ffffff);
    border:1px solid var(--ikr-fwizard-input-border, #AFAFAF);
    border-radius:var(--ikr-radius-sm,8px);
    font-size:16px; /* iOS zoom bug'\u0131n\u0131 \xF6nlemek i\xE7in min 16px olmal\u0131 */
    font-family:inherit;
    color:var(--ikr-fwizard-input-text, var(--ikr-fwizard-text, rgb(17,17,17)));
    box-sizing:border-box;
    transition:border-color 0.15s;
  }
  /* Input ve textarea i\xE7in klavye odak g\xF6stergesi sadece native caret \u2014
     ekstra outline a\u015Fa\u011F\u0131da :focus i\xE7in kapat\u0131l\u0131yor. */
  .ikr-fwizard-input::placeholder,
  .ikr-fwizard-textarea::placeholder{
    color:var(--ikr-fwizard-placeholder, rgba(0,0,0,0.35));
  }
  .ikr-fwizard-textarea{
    resize:none;
    min-height:140px;
    line-height:1.5;
  }
  .ikr-fwizard-char-counter{
    display:none;
  }
  .ikr-fwizard-char-counter--max{
    color:#dc2626;
  }

  /* \u2500\u2500\u2500 Step 4: Hakk\u0131n\u0131zda (Ad + E-posta + Submit) \u2500\u2500\u2500 */
  .ikr-fwizard-author-form{
    width:100%;
    max-width:520px;
    display:flex;
    flex-direction:column;
    gap:16px;
    text-align:left;
  }
  .ikr-fwizard-field{
    display:flex;
    flex-direction:column;
    gap:6px;
  }
  .ikr-fwizard-label{
    font-size:14px;
    font-weight:600;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
  }
  .ikr-fwizard-required{
    color:#dc2626;
    margin-left:2px;
  }
  .ikr-fwizard-notice{
    font-size:12px;
    line-height:1.5;
    color:var(--ikr-fwizard-secondary-text, #6b7280);
    text-align:center;
    padding:4px 8px;
  }
  .ikr-fwizard-msg{
    min-height:20px;
  }
  .ikr-fwizard-msg-error{
    color:#dc2626;
    font-size:13px;
  }
  .ikr-fwizard-submit-btn{
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border:1px solid var(--ikr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--ikr-radius-sm,8px);
    padding:14px 24px;
    font-size:15px;
    font-weight:500;
    cursor:pointer;
    transition:opacity 0.15s, background 0.15s;
    font-family:inherit;
    margin-top:4px;
  }
  .ikr-fwizard-submit-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .ikr-fwizard-submit-btn--disabled,
  .ikr-fwizard-submit-btn:disabled{
    background:var(--ikr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }



  /* \u2500\u2500\u2500 Step 1: Y\u0131ld\u0131z sat\u0131r\u0131 \u2500\u2500\u2500
     \u0130kon ve renk admin "Y\u0131ld\u0131z Stili"nden gelir:
       - SVG: getIconFromSettings (icons/index.js, currentSettings.reviewIcon)
       - Renk: --ikr-review-star-color (admin "Y\u0131ld\u0131z Rengi")
     Empty (inactive) stars use the same --ikr-review-star-color; the filled vs
     empty SVG shape is the active/inactive distinction (see step-rating.js). */
  .ikr-fwizard-stars{
    display:inline-flex;
    gap:8px;
    align-items:center;
  }
  .ikr-fwizard-star{
    width:48px;
    height:48px;
    padding:0;
    border:none;
    background:transparent;
    cursor:pointer;
    color:var(--ikr-review-star-color, #f59e0b);
    transition:color 0.15s, transform 0.1s;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .ikr-fwizard-star svg{
    width:100%;
    height:100%;
    display:block;
  }
  .ikr-fwizard-star:hover{
    transform:scale(1.05);
  }
  .ikr-fwizard-star-active{
    color:var(--ikr-review-star-color, #f59e0b);
  }

  /* \u2500\u2500\u2500 Footer: [Geri]  [progress]  [Atla|Sonraki] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     3-kolon grid: yan kolonlar 120px sabit, orta esnek.
       - Yan kolon geni\u015Fli\u011Fi step'ten ba\u011F\u0131ms\u0131z (her step'te ayn\u0131).
       - Buton i\xE7erikleri justify-self ile kolon kenarlar\u0131na yasl\u0131:
         Geri \u2192 start, Atla/Sonraki \u2192 end. B\xF6ylece buton geni\u015Fli\u011Fi
         k\xFC\xE7\xFCk olsa da konum sabit; her step'te ayn\u0131 X koordinat\u0131.
       - Orta kolon 1fr \u2192 progress pills do\u011Fal olarak ortalan\u0131r,
         absolute hile yok, butonlar\u0131n \xFCst\xFCne binmez. */
  .ikr-fwizard-footer{
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
  .ikr-fwizard-footer-back{
    justify-self:start;
  }
  .ikr-fwizard-footer-next,
  .ikr-fwizard-footer-skip{
    justify-self:end;
  }
  .ikr-fwizard-footer-progress{
    justify-self:center;
    display:flex;
    align-items:center;
    gap:6px;
  }
  /* Step 1'de progress bar'\u0131 gizle (Desktop & Mobile) */
  .ikr-fwizard[data-step="1"] .ikr-fwizard-footer-progress{
    display:none;
  }
  /* CTA ve nav butonlar\u0131 \u2014 sabit width \xD7 height kutu, i\xE7erik flex
     center ile ortalan\u0131r. Step'ten step'e buton \u015Fekli birebir ayn\u0131
     kal\u0131r. Hiyerar\u015Fi: CTA dolu siyah, nav transparent. */
  .ikr-fwizard-cta-btn{
    background:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    color:var(--ikr-fwizard-btn-text, #ffffff);
    border:1px solid var(--ikr-fwizard-btn-border, rgb(17,17,17));
    border-radius:var(--ikr-radius-sm,8px);
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
  .ikr-fwizard-cta-btn:hover:not(:disabled){
    opacity:0.92;
  }
  .ikr-fwizard-cta-btn--disabled,
  .ikr-fwizard-cta-btn:disabled{
    background:var(--ikr-fwizard-btn-disabled-bg, rgba(0,0,0,0.18));
    color:var(--ikr-fwizard-btn-disabled-text, rgba(255,255,255,0.85));
    border-color:var(--ikr-fwizard-btn-disabled-border, transparent);
    cursor:not-allowed;
  }
  .ikr-fwizard-cta-btn[hidden]{
    display:none;
  }
  .ikr-fwizard-progress-seg{
    flex:0 0 auto;
    width:80px;
    height:8px;
    border-radius:var(--ikr-radius-sm,8px);
    background:var(--ikr-fwizard-progress-bg, rgba(0,0,0,0.08));
    transition:background 0.2s;
  }
  .ikr-fwizard-progress-seg-active{
    background:var(--ikr-fwizard-progress-active, rgb(17,17,17));
  }
  /* Nav butonlar\u0131 (Geri / Atla) \u2014 CTA ile ayn\u0131 kutu (108\xD740), sadece
     arkaplan transparent. Hiyerar\u015Fi fill vs transparent ile, boyut
     ile de\u011Fil. Hover: sadece renk de\u011Fi\u015Fikli\u011Fi \u2014 background hover
     asimetrik g\xF6z\xFCkt\xFC\u011F\xFC i\xE7in kald\u0131r\u0131ld\u0131 (ok+metin kutuda farkl\u0131
     X koordinatlar\u0131nda, hover bg buton kutusu b\xFCy\xFCkl\xFC\u011F\xFCnde olunca
     metnin ortas\u0131nda de\u011Fil, kutunun ortas\u0131nda g\xF6r\xFCn\xFCr). */
  .ikr-fwizard-nav-btn{
    background:transparent;
    border:none;
    width:108px;
    height:40px;
    padding:0;
    color:var(--ikr-fwizard-btn-bg, rgb(17,17,17));
    font-size:15px;
    font-weight:600;
    line-height:1;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    border-radius:var(--ikr-radius-sm,8px);
    font-family:inherit;
    box-sizing:border-box;
    transition:background 0.15s;
  }
  .ikr-fwizard-nav-btn:hover{
    background:var(--ikr-fwizard-nav-hover-bg, rgba(17,17,17,0.06));
  }
  .ikr-fwizard-nav-btn[hidden]{
    display:none;
  }

  .ikr-fwizard-close:focus-visible,
  .ikr-fwizard-star:focus-visible,
  .ikr-fwizard-photo-add:focus-visible,
  .ikr-fwizard-photo-remove:focus-visible,
  .ikr-fwizard-submit-btn:focus-visible,
  .ikr-fwizard-cta-btn:focus-visible,
  .ikr-fwizard-nav-btn:focus-visible{
    outline:3px solid var(--ikr-fwizard-focus-ring, rgba(17,17,17,0.42));
    outline-offset:3px;
  }

  /* Input ve textarea klavye oda\u011F\u0131 i\xE7in ek outline \xE7izilmez \u2014 caret zaten
     yeterli odak g\xF6stergesi. Border rengi sabit; a\u011F\u0131r halka mobilde de
     masa\xFCst\xFCnde de g\xF6rsel olarak yoruyordu. Sadece native caret kals\u0131n. */
  .ikr-fwizard-input:focus,
  .ikr-fwizard-textarea:focus{
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
    .ikr-fwizard-overlay{
      padding:0;
    }
    .ikr-fwizard{
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
    .ikr-fwizard-content{
      position:relative;
      padding-top:32px;
      box-sizing:border-box;
    }
    .ikr-fwizard-footer-progress{
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
    .ikr-fwizard[data-step="1"] .ikr-fwizard-content{
      padding-top:0;
    }

    /* Footer butonlar\u0131 altta, do\u011Fal yerde. Geri = sadece "Geri" yaz\u0131s\u0131,
       ok ikonu gizli. Atla zaten yaz\u0131+ok (desktop ile ayn\u0131).
       Grid kolonlar\u0131 mobile'da auto/1fr/auto: yan kolonlar buton kadar,
       orta esnek. */
    .ikr-fwizard-footer{
      padding:20px;
      min-height:80px;
      grid-template-columns:auto 1fr auto;
    }
    .ikr-fwizard-footer-back > svg{
      display:none;
    }
    /* Sa\u011F slot butonu (Atla / Sonraki) grid item olarak kolonun sa\u011F
       ucuna yasl\u0131 dursun. Refactor sonras\u0131 eski .footer-right wrapper
       div'i kalkt\u0131, buton do\u011Frudan footer grid item \u2014 justify-self
       atamas\u0131 burada yap\u0131l\u0131r. */
    .ikr-fwizard-footer-skip,
    .ikr-fwizard-footer-next{
      justify-self:end;
    }

    .ikr-fwizard-step-wrap{
      padding:36px 20px 28px;
    }
    .ikr-fwizard-step{
      gap:24px;
    }
    /* B\xFCy\xFCk ba\u015Fl\u0131k varyant\u0131 mobile'da k\xFC\xE7\xFCl\xFCr: 26 \u2192 18, weight korunur */
    .ikr-fwizard-step-title--lg{
      font-size:20px;
    }
    .ikr-fwizard-star{
      width:48px;
      height:48px;
    }
    .ikr-fwizard-stars{
      gap:8px;
    }
  }

  /* \u2500\u2500\u2500 Toast bildirim \xE7ubu\u011Fu \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .ikr-fwizard-toast{
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
    animation:ikrToastEnter 0.35s cubic-bezier(0.21,1.02,0.73,1) forwards;
    box-shadow:rgba(0,0,0,0.1) 0px 3px 10px 0px, rgba(0,0,0,0.05) 0px 3px 3px 0px;
  }
  .ikr-fwizard-toast--error{
    background:rgb(186,26,26);
    color:#ffffff;
  }
  .ikr-fwizard-toast--exit{
    animation:ikrToastExit 0.3s ease forwards;
  }
  @keyframes ikrToastEnter{
    0%   { opacity:0; transform:translateX(-50%) translateY(-100%); }
    100% { opacity:1; transform:translateX(-50%) translateY(0); }
  }
  @keyframes ikrToastExit{
    0%   { opacity:1; transform:translateX(-50%) translateY(0); }
    100% { opacity:0; transform:translateX(-50%) translateY(-100%); }
  }
`;var Tr=4;function Ye(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function zi(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(t){try{t(i)}catch(o){}})}return{get:function(){return i},set:function(t){Object.assign(i,t),a()},goNext:function(){i.currentStep<Tr&&(i.currentStep+=1,a())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,a())},onChange:function(t){return r.push(t),function(){r=r.filter(function(o){return o!==t})}}}}var ct='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function Ci(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],a=e.onBack||function(){},t=e.onSkip||function(){},o=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=W(ct)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),s.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-footer-progress";for(var u=[],k=0;k<Tr;k++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",c.appendChild(p),u.push(p)}s.appendChild(c);var n=document.createElement("button");n.type="button";var h=null;function m(f){h&&n.removeEventListener("click",h),h=f,f&&n.addEventListener("click",f)}s.appendChild(n);function d(f,v){var C=r.indexOf(f)!==-1,S=i.indexOf(f)!==-1,y=v&&(v.images&&v.images.length>0||v.pendingImages&&v.pendingImages.length>0);if(C)f===2&&y?(n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",m(function(){o()})):(n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.setAttribute("aria-label","Atla"),n.innerHTML="<span>Atla</span>",m(function(){t()})),n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),n.style.visibility="",n.tabIndex=0;else if(S){n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Sonraki"),n.innerHTML="Sonraki",n.style.visibility="",n.tabIndex=0;var x=Ye(f,v);n.disabled=!x,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!x),m(function(){n.disabled||o()})}else n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.innerHTML="",n.style.visibility="hidden",n.tabIndex=-1,n.disabled=!0,m(null)}return{el:s,update:function(f,v){u.forEach(function(S,y){y+1<=f?S.classList.add("ikr-fwizard-progress-seg-active"):S.classList.remove("ikr-fwizard-progress-seg-active")});var C=f<=1;l.style.visibility=C?"hidden":"",l.style.pointerEvents=C?"none":"",l.tabIndex=C?-1:0,d(f,v)},setNextDisabled:function(f){n.classList.contains("ikr-fwizard-cta-btn")&&(n.disabled=!!f,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",c.style.visibility="hidden",n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",n.style.visibility="",n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),m(f)}}}function Si(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,t=null,o=document.createElement("div");o.className="ikr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-stars",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=Ue(A||{});ye(l);var c=[];function u(m){c.forEach(function(d,f){var v=f<m;d.classList.toggle("ikr-fwizard-star-active",v),d.setAttribute("aria-checked",f+1===m?"true":"false"),d.innerHTML=v?G("full"):G("outline")})}function k(m,d){d&&typeof d.preventDefault=="function"&&d.preventDefault(),d&&typeof d.stopPropagation=="function"&&d.stopPropagation(),!a&&(a=!0,e.set({rating:m}),u(m),t&&clearTimeout(t),t=setTimeout(function(){e.goNext()},280))}for(var p=1;p<=5;p++)(function(m){var d=document.createElement("button");d.type="button",d.className="ikr-fwizard-star",d.setAttribute("role","radio"),d.setAttribute("aria-label",m+" y\u0131ld\u0131z"),d.innerHTML=G("outline"),d.addEventListener("mouseenter",function(){u(m)}),d.addEventListener("mouseleave",function(){u(e.get().rating)}),d.addEventListener("pointerdown",function(f){f.button&&f.button!==0||k(m,f)}),typeof window!="undefined"&&!window.PointerEvent&&d.addEventListener("touchstart",function(f){k(m,f)},{passive:!1}),d.addEventListener("mousedown",function(f){window.PointerEvent||k(m,f)}),d.addEventListener("keydown",function(f){(f.key==="Enter"||f.key===" ")&&k(m,f)}),d.addEventListener("click",function(f){k(m,f)}),c.push(d),s.appendChild(d)})(p);u(e.get().rating);var n=null,h=function(m){var d=m&&m.detail&&m.detail.settings;d&&d===n||(n=d||null,l=Ue(d||A||{}),u(e.get().rating))};return window.addEventListener(Pe,h),window.addEventListener(Ae,h),i.appendChild(s),{el:i,destroy:function(){t&&clearTimeout(t),window.removeEventListener(Pe,h),window.removeEventListener(Ae,h)}}}var Ei=3,pt=10*1024*1024;function Ti(e,r){r=r||{};var i=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(t);var o=document.createElement("div");o.className="ikr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML=W('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>')+"<span>Foto\u011Fraf Ekle</span>";var c=document.createElement("input");c.type="file",c.accept="image/*",c.multiple=!0,c.style.display="none",s.appendChild(l),s.appendChild(c);var u=document.createElement("div");u.className="ikr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),s.appendChild(u),a.appendChild(s);var k=r.blobMap||{},p=r.urlToFinger||{};function n(){if(!i){var S=e.get().images||[],y=e.get().pendingImages||[],x=S.map(function(w){return{url:w,isPending:!1}}).concat(y.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));u.innerHTML="",x.forEach(function(w){var g=k[w.url]||w.url,z=h(w,g);u.appendChild(z)}),v()}}function h(S,y){var x=document.createElement("div");x.className="ikr-fwizard-photo-thumb";var w=document.createElement("img");w.src=y,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",x.appendChild(w);var g=document.createElement("div");g.className="ikr-fwizard-photo-loading",g.style.display="none",x.appendChild(g);var z=document.createElement("button");return z.type="button",z.className="ikr-fwizard-photo-remove",z.innerHTML="&#x2715;",x.appendChild(z),m(x,S,y),x}function m(S,y,x){var w=S.querySelector("img");w.src!==x&&(w.src=x);var g=S.querySelector(".ikr-fwizard-photo-loading");if(y.isPending&&y.error){g.style.display="flex",g.textContent="";var z=document.createElement("span");z.className="ikr-upload-error",z.textContent="\u2717 "+y.error,g.appendChild(z)}else g.style.display="none",g.textContent="";var E=S.querySelector(".ikr-fwizard-photo-remove");E.onclick=function(){var T=p[y.url]||(y.file?y.file.name+"_"+y.file.size:null);if(y.url.startsWith("blob:")&&URL.revokeObjectURL(y.url),T){var b=(e.get().fingerprints||[]).filter(function(L){return L!==T});e.set({fingerprints:b})}if(y.isPending){var P=(e.get().pendingImages||[]).filter(function(L){return L.url!==y.url});e.set({pendingImages:P})}else{var N=(e.get().images||[]).filter(function(L){return L!==y.url});e.set({images:N})}}}var d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',f='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function v(){var S=(e.get().images||[]).length,y=(e.get().pendingImages||[]).length,x=S+y,w=x>=Ei;x>0?(s.classList.add("ikr-fwizard-photo-card--compact"),l.innerHTML=W(f)):(s.classList.remove("ikr-fwizard-photo-card--compact"),l.innerHTML=W(d)+"<span>Foto\u011Fraf Ekle</span>"),w?(l.style.display="none",l.disabled=!0,c.disabled=!0):(l.style.display="flex",l.disabled=!1,c.disabled=!1,l.classList.remove("ikr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){c.disabled||c.click()}),c.onchange=async function(S){var y=(e.get().images||[]).length+(e.get().pendingImages||[]).length,x=Array.from(S.target.files).slice(0,Ei-y);c.value="";var w=(e.get().pendingImages||[]).length,g=e.get().images||[],z=g.length;if(x.length!==0){for(var E=[],T=[],b=0;b<x.length;b++){var P=x[b],N=P.name+"_"+P.size,L=(e.get().fingerprints||[]).some(function(F){return F===N})||E.some(function(F){return F.file.name+"_"+F.file.size===N});if(L){console.log("[renuvex-pr] Duplicate file detected, skipping:",P.name);continue}if(P.size>pt){var B="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(B,"error"):alert(B);continue}var J=URL.createObjectURL(P);p[J]=N,E.push({url:J,file:P,error:null}),T.push({url:J,file:P});var Z=(e.get().fingerprints||[]).slice();Z.push(N),e.set({fingerprints:Z})}if(E.length!==0){var le=(e.get().pendingImages||[]).concat(E),U=async function(){for(var F=0;F<T.length;F++){var Be=T[F],je=Be.file,H=Be.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Se=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),de=(e.get().images||[]).slice();de.push(H),e.set({pendingImages:Se,images:de});continue}try{var se=await ze(be+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he})});if(!se.ok)throw se.status===429?new Error("rate_limit"):new Error("sign failed");var D=await se.json();if(!D.folder)throw new Error("sign folder missing");var $=new FormData;$.append("file",je),$.append("api_key",D.api_key),$.append("timestamp",D.timestamp),$.append("signature",D.signature),$.append("folder",D.folder);var ce=await fetch("https://api.cloudinary.com/v1_1/"+D.cloud_name+"/image/upload",{method:"POST",body:$}),Q=await ce.json();if(Q.secure_url&&ii(Q.secure_url)){var Ve=(e.get().pendingImages||[]).some(function(O){return O.url===H});if(!Ve){console.log("[renuvex-pr] Upload finished but image was already deleted by user. Aborting state update.");return}k[Q.secure_url]=H,p[Q.secure_url]=p[H];var ke=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),ee=(e.get().images||[]).slice();ee.push(Q.secure_url),e.set({pendingImages:ke,images:ee});try{ze(be+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,secureUrl:Q.secure_url})}).catch(function(){})}catch(O){}}else throw new Error("invalid image url")}catch(O){console.error("[renuvex-pr] Image upload failed:",O);var re=O.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(re,"error");var pe=(e.get().pendingImages||[]).map(function(me){return me.url===H?{url:me.url,file:me.file,error:re}:me});e.set({pendingImages:pe})}}};if(z===0&&w===0){i=!0;var _=!r.canNavigate||r.canNavigate();_&&e.goNext()}e.set({pendingImages:le}),U()}}};var C=e.onChange(n);return n(),{el:a,destroy:function(){i=!0,c.onchange=null,C&&C()}}}var Lr=2e3,mt=60;function Li(e,r){r=r||{};var i=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Deneyiminizi anlat\u0131n",a.appendChild(t);var o=document.createElement("div");o.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=mt,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),o.appendChild(s);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Lr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",o.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-char-counter",c.setAttribute("aria-live","polite"),o.appendChild(c);function u(){var p=l.value.length;c.textContent=p+"/"+Lr,c.classList.toggle("ikr-fwizard-char-counter--max",p>=Lr)}function k(){return Ye(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),u(),i(k())}),a.appendChild(o),u(),setTimeout(function(){i(k())},0),{el:a,destroy:function(){}}}var ut=40;function Pi(e,r){r=r||{};var i=r.onValidityChange||function(){},a=r.onSuccess||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-author";var o=document.createElement("div");o.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",t.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var l=document.createElement("div");l.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="ikr-fwizard-input",u.maxLength=ut,u.setAttribute("aria-required","true"),u.value=e.get().author||"",l.appendChild(c),l.appendChild(u),s.appendChild(l);var k=document.createElement("div");k.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var n=document.createElement("input");n.type="email",n.className="ikr-fwizard-input",n.setAttribute("autocomplete","email"),n.value=e.get().email||"",k.appendChild(p),k.appendChild(n),s.appendChild(k);var h=document.createElement("div");h.className="ikr-fwizard-notice",h.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(h);var m=document.createElement("div");m.className="ikr-fwizard-msg",m.setAttribute("role","alert"),m.setAttribute("aria-live","assertive"),s.appendChild(m);var d=document.createElement("button");d.type="button",d.className="ikr-fwizard-submit-btn",d.textContent="G\xF6nder",s.appendChild(d),t.appendChild(s);function f(){return Ye(4,e.get())}function v(){var x=!f(),w=(e.get().pendingImages||[]).length,g=w>0;g?(d.disabled=!0,d.classList.add("ikr-fwizard-submit-btn--disabled"),d.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(d.disabled=x,d.classList.toggle("ikr-fwizard-submit-btn--disabled",x),d.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),v(),i(f())}),n.addEventListener("input",function(){e.set({email:n.value})}),v(),setTimeout(function(){i(f())},0);function C(){m.textContent=""}function S(x){C();var w=document.createElement("div");w.className="ikr-fwizard-msg-error",w.textContent=x||"",m.appendChild(w)}d.onclick=async function(){if(!d.disabled){var x=e.get(),w=(x.author||"").trim(),g=(x.comment||"").trim();if(n.value.trim()&&!n.checkValidity()){n.reportValidity();return}if(!w){S("Gerekli alan");return}if(!x.rating){S("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}d.disabled=!0,d.classList.add("ikr-fwizard-submit-btn--disabled");var z=d.textContent;if(d.textContent="G\xF6nderiliyor\u2026",C(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var E=$r(window.location.href),T=x.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),b=await ze(be+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,productId:x.productId||null,slug:E||null,productName:T,author:w,title:(x.title||"").trim()||null,comment:g||null,rating:x.rating,images:x.images||[]})},15e3);if(b.ok)a();else{var P=await b.json().catch(function(){return{}});throw new Error(P.error||"Yorum kaydedilemedi.")}}catch(B){var N=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),L=N?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):S(L),d.disabled=!1,d.classList.remove("ikr-fwizard-submit-btn--disabled"),d.textContent=z}}};var y=e.onChange(v);return{el:t,destroy:function(){d.onclick=null,y&&y()}}}var Ai=!1;function ft(){if(!Ai){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.setAttribute("data-renuvex-pr-style","review-form-wizard"),e.textContent=Zr(xi),document.head.appendChild(e),Ai=!0}}function vt(e,r,i){if(i=i||{},e===1)return Si(r,{canNavigate:i.canNavigate});if(e===2)return Ti(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return Li(r,{onValidityChange:i.onValidityChange});if(e===4)return Pi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Ni(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Ri(e){e=e||{},ft();var r=zi({productId:e.productId,productName:e.productName}),i={},a={},t=wi({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(w){var g=i[w];g&&g.startsWith("blob:")&&URL.revokeObjectURL(g)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),o={ikrReviewModal:!0};window.history.pushState(o,null,"");var s=function(w){t&&t.close&&t.close()};window.addEventListener("popstate",s);var l=document.createElement("div");l.className="ikr-fwizard-step-wrap";var c=Ci({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="ikr-fwizard-layout",u.appendChild(l),u.appendChild(c.el);var k=null,p="idle",n=null,h=!0,m=null;function d(w,g){l.innerHTML="";var z=vt(w,r,{canNavigate:function(){return p==="idle"},blobMap:i,urlToFinger:a,onValidityChange:function(b){c.setNextDisabled(!b)},onSuccess:v,showToast:t.showToast});if(k=z,c.update(w,r.get()),g){p="entering",z.el.classList.add("ikr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),z.el.removeEventListener("animationend",T),z.el.classList.remove("ikr-fwizard-step--enter"),p="idle",n!==null&&C()};z.el.addEventListener("animationend",T),E=setTimeout(T,700)}else p="idle";l.appendChild(z.el),t.setStepAttr&&t.setStepAttr(w),w===3&&c.setNextDisabled(!0)}var f=!1;function v(){if(!f){if(f=!0,!k){l.innerHTML="";var w=Ni();w.classList.add("ikr-fwizard-step--enter"),l.appendChild(w),t.setStepAttr("thanks"),c.setThanksState(t.close);return}var g=k;p="exiting",g.el.classList.add("ikr-fwizard-step--exit");var z=function(){if(m&&clearTimeout(m),g.el.removeEventListener("animationend",z),g.destroy)try{g.destroy()}catch(T){}k===g&&(k=null),l.innerHTML="";var E=Ni();E.classList.add("ikr-fwizard-step--enter"),l.appendChild(E),t.setStepAttr("thanks"),c.setThanksState(t.close),p="idle"};g.el.addEventListener("animationend",z),m=setTimeout(z,300)}}function C(){var w=r.get().currentStep;if(p!=="idle"){n=w;return}if(!k){var g=!h;h=!1,d(w,g);return}var z=k;p="exiting",z.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(m&&clearTimeout(m),z.el.removeEventListener("animationend",E),z.destroy)try{z.destroy()}catch(b){}if(k===z){l.innerHTML="",k=null;var T=n!==null?n:r.get().currentStep;n=null,d(T,!0),p="idle"}};z.el.addEventListener("animationend",E),m=setTimeout(E,350)}C();var S=r.get().currentStep,y=r.onChange(function(w){w.currentStep!==S?(S=w.currentStep,C()):c.update(w.currentStep,w)}),x=t.close;return t.close=function(){y&&y(),typeof m!="undefined"&&m&&clearTimeout(m),x()},t.open(u),{close:t.close}}function Y(){Ri({productId:K||"",productName:Fe||""})}var kt={id:"classic",name:"Klasik (A\xE7\u0131k)"};function gt(e){var r=e.widget,i=e.data,a=e.settings,t=e.iconPair,o=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,c=e.currentRatingFilter,u=e.currentOrderBy,k=e.currentHasImages,p=e.onFilterChange,n=e.onSortChange;ye(t);var h=document.createElement("div");h.className="ikr-summary";var m=(s[3]||0)+(s[4]||0),d=o>0?Math.round(m/o*100):0,f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+G("full")+'</span><span class="ikr-avg-num">'+l+"</span>",h.appendChild(f);var v=document.createElement("div");if(v.className="ikr-summary-block ikr-summary-count",v.textContent=o.toLocaleString("tr-TR")+" Yorum",h.appendChild(v),a.showRecommendation!==!1&&d>0){var C=document.createElement("div");C.className="ikr-summary-block ikr-summary-recommend",C.innerHTML='<span class="ikr-recommend-pct">%'+d+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",h.appendChild(C)}return h.appendChild(He({ratingCounts:s,allCount:o,iconPair:t,currentRatingFilter:c,onFilterChange:p})),h.appendChild(X({widget:r,currentOrderBy:u,currentHasImages:k,onWriteClick:Y,onSortChange:n})),h}var Ar={};ge(Ar,{css:()=>bt,meta:()=>ht,render:()=>yt});var Bi=`
  /* Compact layout ba\u015Fl\u0131\u011F\u0131 sola hizal\u0131 \u2014 t\xFCm layout'larda tutarl\u0131 */
  .ikr-title-compact{text-align:left;}

  .ikr-compact-header{
    display:flex;align-items:center;gap:12px;
    width:100%;padding:0;
  }

  /* Trigger wrap \u2014 popover anchor'\u0131 (position:relative parent) */
  .ikr-compact-trigger-wrap{
    position:relative;flex:1 1 auto;min-width:0;display:flex;align-items:center;
  }

  .ikr-compact-trigger{
    display:flex;align-items:center;gap:10px;
    background:transparent;border:0;padding:0;cursor:pointer;
    font-family:inherit;color:inherit;flex:0 0 auto;
  }
  .ikr-compact-trigger-stars{display:inline-flex;gap:2px;flex-shrink:0;}
  /* Compact trigger yildizlari kendi degiskeni; global bar-label-size'i etkilemez.
     Fallback bar-label-size, eski davranista geri donus icin. */
  .ikr-compact-trigger-stars .ikr-icon,
  .ikr-compact-trigger-stars .ikr-star{
    width:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    height:var(--ikr-compact-star-size,var(--ikr-bar-label-size,20px));
    color:var(--ikr-review-star-color,#f59e0b);line-height:1;
  }
  .ikr-compact-trigger-text{
    font-size:var(--ikr-compact-count-size,16px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:500;white-space:nowrap;
  }
  .ikr-compact-chevron{
    display:inline-flex;align-items:center;justify-content:center;
    width:14px;height:14px;flex-shrink:0;
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    transition:transform 200ms cubic-bezier(0.4,0,0.2,1);
  }
  .ikr-compact-trigger[aria-expanded="true"] .ikr-compact-chevron{transform:rotate(180deg);}

  .ikr-compact-actions-slot{
    flex:0 0 auto;display:flex;align-items:center;gap:var(--ikr-col-gap,8px);
  }
  /* filter-wrap basis'i (--ikr-col-count, 60px) global tanimli \u2014 diger summary
     layoutlariyla ayni buton arasi gorsel gap icin override'i kaldirdik. */
  .ikr-compact-actions-slot .ikr-write-btn{flex:0 0 auto;}

  /* Mobile-only write sat\u0131r\u0131 */
  .ikr-compact-write-row{display:none;}
  .ikr-compact-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}

  /* \u2500\u2500\u2500 POPOVER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     Premium tarzda: scale(0.7) translateY(-20px) \u2192 scale(1), opacity 0 \u2192 1.
     200ms ease-in-out, forwards (son state'te kal\u0131r). */
  @keyframes ikr-grow-out {
    0%   { opacity: 0; transform: scale(0.7) translateY(-20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .ikr-compact-panel{
    position:absolute;top:calc(100% + 8px);left:0;
    z-index:1000;
    /* Bar chart 340px + panel-inner padding (28*2) + border (2) = 398px sabit */
    width:calc(var(--ikr-summary-max,340px) + 58px);
    opacity:0;visibility:hidden;pointer-events:none;
    transform-origin:top left;
  }
  .ikr-compact-panel.ikr-open{
    visibility:visible;pointer-events:auto;
    animation:ikr-grow-out 200ms ease-in-out forwards;
  }

  .ikr-compact-panel-inner{
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;
    border:1px solid var(--ikr-widget-border,var(--ikr-border,rgba(0,0,0,0.10)));
    border-radius:var(--ikr-radius,6px);
    background:#ffffff;
    box-shadow:0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
    width:100%;box-sizing:border-box;
  }
  .ikr-compact-avg{
    display:flex;align-items:center;justify-content:center;gap:8px;
    font-size:var(--ikr-avg-rating-size,46px);line-height:1;
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));font-weight:500;
  }
  .ikr-compact-avg .ikr-icon{
    width:var(--ikr-avg-star-size,58px);height:var(--ikr-avg-star-size,58px);
    color:var(--ikr-review-star-color,#f59e0b);
  }
  /* Bar chart 340px max, ortalanm\u0131\u015F */
  .ikr-compact-panel-inner .ikr-summary-bars{
    max-width:var(--ikr-summary-max,340px);width:100%;margin:0 auto;
  }

  /* Desktop: summary padding s\u0131f\u0131r \u2014 trigger sola yasl\u0131 */
  @media(min-width:601px){
    .ikr-summary-compact{display:flex;flex-direction:column;width:100%;gap:8px;padding:0;}
  }

  @media(max-width:600px){
    /* Header: trigger sola, filter sa\u011Fa; panel JS ile summary'nin direkt
       \xE7ocu\u011Fu olarak header'\u0131n alt\u0131na eklendi \u2192 flow'da accordion. */
    /* Mobile: trigger ve filter arasi gap acilir, yapisik gorunmesin */
    .ikr-compact-header{gap:16px;align-items:center;}
    .ikr-compact-actions-slot .ikr-write-btn{display:none;}
    .ikr-compact-write-row{display:flex;width:100%;}

    .ikr-compact-trigger-wrap{
      position:static;display:flex;align-items:center;
      flex:1 1 auto;min-width:0;
    }

    /* Panel mobilde flow i\xE7inde \u2014 trigger-wrap d\u0131\u015F\u0131nda, summary'nin \xE7ocu\u011Fu.
       Static position, max-height accordion animasyonu. */
    .ikr-compact-panel{
      position:static;
      width:100%;max-width:100%;min-width:0;
      transform:none;visibility:visible;pointer-events:auto;
      max-height:0;overflow:hidden;opacity:1;
      transition:max-height 280ms cubic-bezier(0.4,0,0.2,1);
      z-index:1;
    }
    .ikr-compact-panel.ikr-open{max-height:600px;}

    /* Filter men\xFC panel'in \xFCst\xFCnde kals\u0131n \u2014 header z-index panel'den y\xFCksek */
    .ikr-compact-header{position:relative;z-index:2;}
    .ikr-compact-actions-slot{position:relative;z-index:3;}

    .ikr-compact-panel-inner{
      padding:16px;
      box-shadow:none;
    }
  }
`;var ht={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},bt=Bi;function yt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,p=e.onSortChange,n=document.createElement("div");n.className="ikr-summary ikr-summary-compact";var h=document.createElement("div");h.className="ikr-compact-header";var m=document.createElement("div");m.className="ikr-compact-trigger-wrap";var d=document.createElement("button");d.className="ikr-compact-trigger",d.type="button",d.setAttribute("aria-expanded","false"),d.innerHTML='<span class="ikr-compact-trigger-stars">'+we(s,a)+'</span><span class="ikr-compact-trigger-text">'+t.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron">'+W('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>')+"</span>",m.appendChild(d),h.appendChild(m);var f=X({widget:r,currentOrderBy:c,currentHasImages:u,onWriteClick:Y,onSortChange:p}),v=f.querySelector(".ikr-filter-wrap"),C=f.querySelector(".ikr-write-btn"),S=document.createElement("div");S.className="ikr-compact-actions-slot",C&&S.appendChild(C),v&&S.appendChild(v),h.appendChild(S),n.appendChild(h);var y=document.createElement("div");y.className="ikr-compact-panel",y.setAttribute("role","dialog"),y.setAttribute("aria-hidden","true");var x=document.createElement("div");x.className="ikr-compact-panel-inner";var w=document.createElement("div");w.className="ikr-compact-avg",w.innerHTML='<span class="ikr-icon">'+G("full")+"</span><span>"+s+"</span>",x.appendChild(w),x.appendChild(He({ratingCounts:o,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:k})),y.appendChild(x);var g=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(_){var F=_?n:m;y.parentNode!==F&&(y.classList.contains("ikr-open")&&(y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),d.setAttribute("aria-expanded","false")),F.appendChild(y))}if(z(g?g.matches:!1),g){var E=function(_){z(_.matches)};g.addEventListener?g.addEventListener("change",E):g.addListener&&g.addListener(E)}if(C){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=A&&A.writeButtonText||"Yorum Yap",T.onclick=Y;var b=document.createElement("div");b.className="ikr-compact-write-row",b.appendChild(T),n.appendChild(b)}function P(){y.classList.remove("ikr-open"),y.setAttribute("aria-hidden","true"),d.setAttribute("aria-expanded","false")}function N(){cr(L),y.classList.add("ikr-open"),y.setAttribute("aria-hidden","false"),d.setAttribute("aria-expanded","true")}d.onclick=function(){y.classList.contains("ikr-open")?P():N()};var L=null;function B(_){L&&(L(),L=null),_||(L=pr({trigger:m,element:y,close:P}))}if(B(g?g.matches:!1),g){var J=function(_){B(_.matches)};g.addEventListener?g.addEventListener("change",J):g.addListener&&g.addListener(J)}if(i.showRecommendation!==!1){var Z=(o[3]||0)+(o[4]||0),le=t>0?Math.round(Z/t*100):0;if(le>0){var U=document.createElement("div");U.className="ikr-summary-block ikr-summary-recommend",U.style.marginTop="8px",U.innerHTML='<span class="ikr-recommend-pct">%'+le+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",x.appendChild(U)}}return n}var Nr={};ge(Nr,{css:()=>xt,meta:()=>wt,render:()=>zt});var Ii=`
  /* Ba\u015Fl\u0131k sola hizali \u2014 t\xFCm layout'larda tutarl\u0131 */
  .ikr-title-split{text-align:left;}

  /* Mobile (<=600): split = classic. Sol ve orta wrapper'lar seffaf
     (cocuklar dogrudan summary'nin child'i olur). Sag wrapper kalir ve
     classic'in .ikr-summary-actions wrapper'iyla ayni davranisi alir
     (flex row + width 100%) \u2014 write-btn yan yana filter ile durur. */
  @media(max-width:768px){
    /* Mobile'da split classic gibi davranir -> baslik ortali. */
    .ikr-title-split{text-align:center;}
    .ikr-split-left,.ikr-split-mid{display:contents;}
    /* .ikr-split-right classic'in .ikr-summary-actions pattern'ini taklit
       eder: max-width:340 ortali, bar chart ile ayni genislikte. Width:100%
       + tam genislige yayilmasini onler. */
    .ikr-split-right{
      display:flex;flex-direction:row;align-items:stretch;
      gap:var(--ikr-col-gap,8px);
      width:100%;max-width:var(--ikr-summary-max,340px);
      margin-left:auto;margin-right:auto;
      box-sizing:border-box;
    }
    /* Split mobile = classic mobile birebir: bar ve actions classic'teki
       max-width:340 sinirinden gelir (override yok). */
  }

  /* Desktop-only: split'in 3-kolon yatay tasarimi sadece >=601px'te aktif.
     Mobile'da hicbiri uygulanmaz -> base classic gorunum. */
  @media(min-width:769px){
    .ikr-split-col{
      display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
      min-width:0;
    }

    .ikr-summary-split{
      display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;
      gap:24px;width:100%;max-width:none;padding:16px 8px;
    }

    /* Sol: avg (buyuk yildiz + sayi) -> sayi -> tavsiye, sol hizali */
    .ikr-split-left{flex:0 0 auto;gap:12px;text-align:left;align-items:flex-start;align-self:flex-start;}
    .ikr-split-left .ikr-split-left-avg-block{align-self:flex-start;margin:0;}
    /* Count ve tavsiye ortalama puanin altinda, center hizali */
    .ikr-split-left .ikr-split-left-count{align-self:center;text-align:center;}
    .ikr-split-left .ikr-summary-recommend{align-self:center;text-align:center;}

    /* Orta: bar chart sola hizali. align-items:stretch sart -
       flex-start ile child width:auto'ya duser ve track'ler buzusur. */
    .ikr-split-mid{flex:1 1 auto;align-items:stretch;}
    /* Split desktop'ta bar chart okunabilir genislikte: 500px max.
       Full genislik okuma mesafesini uzatiyordu, 500 dengeli. */
    .ikr-split-mid .ikr-summary-bars{
      max-width:400px;width:100%;margin:0;
    }
    /* Bar row sikilastir: satirlar arasi ve satir ici padding daralir.
       Premium tarzda kompakt his. */
    .ikr-split-mid .ikr-summary-bars{gap:2px;}
    .ikr-split-mid .ikr-bar-row{padding:2px 4px;}

    /* Sag: write + filter yan yana, dikey ortali */
    .ikr-split-right{
      flex:0 0 auto;flex-direction:row;align-items:stretch;gap:8px;align-self:center;
    }
    .ikr-split-right .ikr-write-btn{flex:0 0 auto;}
    .ikr-split-right .ikr-filter-wrap{flex:0 0 auto; align-self:stretch;}

    /* Gizli tavsiye yuzdesi desktop'ta yer kaplar (sol kolonu cokertmemek icin) */
    .ikr-split-rec-hidden { visibility: hidden; }
  }

  @media(max-width:768px){
    /* Mobilde split = classic stack. Eger tavsiye yuzdesi kapaliysa,
       yer kaplamasina gerek yok cunku yan yana kolon dengesi diye bir sey yok.
       Bu sayede mobildeki devasa boslugu onleriz. */
    .ikr-split-rec-hidden { display: none !important; }
  }
`;var wt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},xt=Ii;function zt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,p=e.onSortChange;ye(a);var n=document.createElement("div");n.className="ikr-summary ikr-summary-split";var h=document.createElement("div");h.className="ikr-split-col ikr-split-left";var m=document.createElement("div");m.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",m.innerHTML='<span class="ikr-avg-star ikr-icon">'+G("full")+'</span><span class="ikr-avg-num">'+s+"</span>",h.appendChild(m);var d=document.createElement("div");d.className="ikr-summary-block ikr-summary-count ikr-split-left-count",d.textContent=t.toLocaleString("tr-TR")+" Yorum",h.appendChild(d),n.appendChild(h);var f=document.createElement("div");f.className="ikr-split-col ikr-split-mid",f.appendChild(He({ratingCounts:o,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:k})),n.appendChild(f);var v=X({widget:r,currentOrderBy:c,currentHasImages:u,onWriteClick:Y,onSortChange:p}),C=v.querySelector(".ikr-filter-wrap"),S=v.querySelector(".ikr-write-btn"),y=document.createElement("div");y.className="ikr-split-col ikr-split-right",S&&y.appendChild(S),C&&y.appendChild(C),n.appendChild(y);var x=(o[3]||0)+(o[4]||0),w=t>0?Math.round(x/t*100):0,g=document.createElement("div");g.className="ikr-summary-block ikr-summary-recommend",g.innerHTML='<span class="ikr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var z=i.showRecommendation===!1||w===0;return z&&g.classList.add("ikr-split-rec-hidden"),h.appendChild(g),n}var Rr={};ge(Rr,{css:()=>St,meta:()=>Ct,render:()=>Et});var Mi=`
  .ikr-title-minimal{text-align:left;}

  .ikr-summary-minimal{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:16px;width:100%;max-width:none;padding:8px;
  }

  .ikr-minimal-info{
    display:flex;flex-direction:column;align-items:flex-start;gap:6px;min-width:0;
  }
  .ikr-minimal-row{
    display:flex;align-items:center;gap:8px;
  }
  .ikr-minimal-avg{
    font-size:var(--ikr-minimal-avg-size,22px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1;
  }
  .ikr-minimal-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-minimal-stars .ikr-icon,
  .ikr-minimal-stars .ikr-star{
    width:var(--ikr-bar-label-size,20px);height:var(--ikr-bar-label-size,20px);
  }
  .ikr-minimal-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:400;line-height:1.2;
  }

  .ikr-minimal-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }

  @media(max-width:600px){
    .ikr-summary-minimal{
      flex-wrap:wrap;gap:12px;
    }
    .ikr-minimal-info{flex:1 1 auto;}
    .ikr-minimal-actions{flex:0 0 auto;}
    /* Filter info'nun yaninda kalir (sag ust kose), Yorum Yap full-genislik
       alta tek basina duser. Hero ve minimal'in kompakt karakterine uygun. */
    .ikr-minimal-actions .ikr-write-btn{display:none;}
    .ikr-minimal-write-row{display:flex;width:100%;}
    .ikr-minimal-write-row .ikr-write-btn{flex:1 1 auto;justify-content:center;}
  }
  @media(min-width:601px){
    .ikr-minimal-write-row{display:none;}
  }
`;var Ct={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},St=Mi;function Et(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-minimal";var u=document.createElement("div");u.className="ikr-minimal-info";var k=document.createElement("div");k.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=t,k.appendChild(p);var n=document.createElement("span");n.className="ikr-minimal-stars",n.innerHTML=we(t,i),k.appendChild(n);var h=document.createElement("span");h.className="ikr-minimal-count",h.textContent=a.toLocaleString("tr-TR")+" Yorum",k.appendChild(h),u.appendChild(k),c.appendChild(u);var m=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),d=m.querySelector(".ikr-filter-wrap"),f=m.querySelector(".ikr-write-btn"),v=document.createElement("div");if(v.className="ikr-minimal-actions",f&&v.appendChild(f),d&&v.appendChild(d),c.appendChild(v),f){var C=document.createElement("button");C.className="ikr-write-btn",C.textContent=A&&A.writeButtonText||"Yorum Yap",C.onclick=Y;var S=document.createElement("div");S.className="ikr-minimal-write-row",S.appendChild(C),c.appendChild(S)}return c}var Br={};ge(Br,{css:()=>Lt,meta:()=>Tt,render:()=>Pt});var Fi=`
  .ikr-title-hero{text-align:left;}

  .ikr-summary-hero{
    display:flex;flex-direction:row;align-items:center;justify-content:space-between;
    gap:24px;width:100%;max-width:none;padding:12px 8px;
  }

  .ikr-hero-info{
    display:flex;flex-direction:row;align-items:center;gap:24px;min-width:0;flex:1;
  }
  .ikr-hero-rating-col{
    display:flex;flex-direction:row;align-items:center;gap:20px;
  }
  .ikr-hero-meta-row{
    display:flex;flex-direction:row;align-items:center;gap:8px;
  }
  .ikr-hero-avg{
    font-size:var(--ikr-hero-avg-size,90px);
    color:var(--ikr-header-avg,var(--ikr-text,rgba(0,0,0,1)));
    font-weight:700;line-height:1;letter-spacing:-2px;
  }
  .ikr-hero-stars{
    display:inline-flex;gap:2px;
    color:var(--ikr-review-star-color,#f59e0b);
  }
  .ikr-hero-stars .ikr-icon,
  .ikr-hero-stars .ikr-star{
    width:var(--ikr-bar-label-size,22px);height:var(--ikr-bar-label-size,22px);
  }
  .ikr-hero-count{
    font-size:var(--ikr-recommend-size,14px);
    color:var(--ikr-header-count,var(--ikr-text,rgba(0,0,0,0.6)));
    font-weight:400;line-height:1;
  }

  .ikr-hero-actions{
    display:flex;align-items:center;gap:var(--ikr-col-gap,8px);flex:0 0 auto;
  }
  .ikr-desktop-only{display:flex;}

  @media(max-width:600px){
    .ikr-summary-hero{
      flex-wrap:wrap;gap:16px;
    }
    .ikr-hero-info{gap:12px;justify-content:flex-start;width:100%;}
    .ikr-hero-rating-col{flex-direction:row;align-items:center;gap:16px;}
    .ikr-hero-avg{font-size:calc(var(--ikr-hero-avg-size,90px) * 0.65);letter-spacing:-1px;}
    .ikr-hero-meta-row{width:auto;gap:8px;}

    .ikr-desktop-only{display:none !important;}

    /* Filter ve Yorum Yap butonu yan yana */
    .ikr-hero-write-row{display:flex;width:100%;gap:8px;align-items:stretch;}
    .ikr-hero-write-row .ikr-write-btn{flex:1;justify-content:center;}
    .ikr-hero-write-row .ikr-filter-wrap{flex:0 0 auto;display:flex;}
    .ikr-hero-write-row .ikr-filter-btn{height:100%;aspect-ratio:1/1;}
  }
  @media(min-width:601px){
    .ikr-hero-write-row{display:none;}
  }
`;var Tt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},Lt=Fi;function Pt(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-hero";var u=document.createElement("div");u.className="ikr-hero-info";var k=document.createElement("div");k.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=t,k.appendChild(p);var n=document.createElement("div");n.className="ikr-hero-meta-row";var h=document.createElement("span");h.className="ikr-hero-stars",h.innerHTML=we(t,i),n.appendChild(h);var m=document.createElement("div");m.className="ikr-hero-count",m.textContent=a.toLocaleString("tr-TR")+" Yorum",n.appendChild(m),k.appendChild(n),u.appendChild(k),c.appendChild(u);var d=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),f=d.querySelector(".ikr-filter-wrap"),v=d.querySelector(".ikr-write-btn"),C=document.createElement("div");C.className="ikr-hero-actions ikr-desktop-only",v&&C.appendChild(v),f&&C.appendChild(f),c.appendChild(C);var S=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),y=S.querySelector(".ikr-filter-wrap"),x=S.querySelector(".ikr-write-btn"),w=document.createElement("div");return w.className="ikr-hero-write-row",x&&w.appendChild(x),y&&w.appendChild(y),c.appendChild(w),c}var mr={classic:Pr,compact:Ar,split:Nr,minimal:Rr,hero:Br};function ur(e){return mr[e]||mr.classic}function _i(){return Object.keys(mr).map(function(e){return mr[e].css||""}).join(`
`)}var Ir={};ge(Ir,{css:()=>Nt,meta:()=>At,render:()=>Rt});function De(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var t=document.createElement("span");t.className="ikr-reply-label",t.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(t),i.appendChild(a);var o=document.createElement("div");o.className="ikr-reply-text ikr-reply-text-clamped",o.textContent=e,i.appendChild(o);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var l=!1;s.onclick=function(){l=!l,o.classList.toggle("ikr-reply-text-clamped",!l),s.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var At={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Nt="";function Rt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var t=document.createElement("div");t.className="ikr-review-top-left";var o=document.createElement("span");o.className="ikr-review-stars",o.innerHTML=ue(e.rating,A),t.appendChild(o);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(s),i.appendChild(a),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var c=document.createElement("div");c.className="ikr-author",c.textContent=e.author||"",i.appendChild(c);var u=(e.comment||"").trim();if(u){var k=document.createElement("div");k.className="ikr-body ikr-body-clamped",k.textContent=u,i.appendChild(k);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(k.scrollHeight>k.clientHeight+2){p.style.display="inline";var d=!1;p.onclick=function(){d=!d,k.classList.toggle("ikr-body-clamped",!d),p.textContent=d?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var n=xe(e);if(n.length){var h=document.createElement("div");h.className="ikr-gallery",n.forEach(function(d){var f=document.createElement("img"),v=ie(d,j);f.src=v.src,f.srcset=v.srcset,f.loading="lazy",f.decoding="async",f.width=j,f.height=j,f.className="ikr-img",te(f),f.setAttribute("data-ikr-img-url",d),(function(C){f.onclick=function(){ne(e,C,r)}})(d),h.appendChild(f)}),i.appendChild(h)}var m=De(e.merchantReply);return m&&i.appendChild(m),i}var Mr={};ge(Mr,{css:()=>It,meta:()=>Bt,render:()=>Mt});var Oi=`
  .ikr-review-list{
    display:grid;
    grid-template-columns:140px 1fr var(--ikr-list-photo-w,120px);
    gap:60px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand padding:24px 0 yan padding'i 0'a resetler ve theme kural\u0131n\u0131
       specifity sava\u015F\u0131nda ezer. Sadece top/bottom ayr\u0131 set. */
    padding-top:24px;padding-bottom:24px;
    border-top:1px solid var(--ikr-review-border,#e5e7eb);
    border-bottom:none;
  }
  .ikr-review-list.ikr-review-list--no-media{grid-template-columns:140px 1fr;}
  /* Sol kolon imza grubu: y\u0131ld\u0131z \u2192 yazar \u2192 tarih.
     y\u0131ld\u0131z\u2192yazar normal (8), yazar\u2192tarih tight (4) ayn\u0131 imza grubu. */
  .ikr-review-list-author{
    display:flex;flex-direction:column;
    font-size:var(--ikr-author-size,14px);
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));
  }
  .ikr-review-list-author-stars{margin-bottom:var(--ikr-gap-normal);}
  .ikr-review-list-author-name{font-weight:600;font-style:normal;}
  .ikr-review-list-author-date{margin-top:var(--ikr-gap-tight);font-size:var(--ikr-review-date-size,12px);color:var(--ikr-review-date,#5e5e5e);}
  .ikr-review-list-content{display:flex;flex-direction:column;min-width:0;}
  /* Title art\u0131k orta kolonun ilk eleman\u0131; \xFCst margin gerekmez. */
  .ikr-review-list-title{font-weight:600;font-size:var(--ikr-review-title-size,16px);color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));margin:0;}
  .ikr-review-list-body{margin-top:var(--ikr-gap-normal);line-height:1.6;color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));font-size:var(--ikr-review-text-size,14px);}
  .ikr-review-list-media{display:flex;justify-content:flex-end;}
  .ikr-review-list-media img{
    width:100%;max-width:var(--ikr-list-photo-w,120px);aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--ikr-radius,6px);
    border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));
    cursor:zoom-in;
  }
  /* Desktop: sadece ilk foto g\xF6r\xFCn\xFCr (sa\u011F kolonda tek delil g\xF6rseli). DOM'da
     t\xFCm fotolar var, modal i\xE7in kullan\u0131l\u0131r. Mobile'da kural\u0131n aktif olmamas\u0131
     i\xE7in min-width:601 media query i\xE7inde tan\u0131mland\u0131 \u2014 b\xF6ylece mobile strip
     t\xFCm fotolar\u0131 g\xF6stermeye engel olmaz. */
  @media (min-width:601px){
    .ikr-review-list-media img:not(:first-child){display:none;}
  }
  @media (max-width:600px){
    /* Mobile s\u0131ra: y\u0131ld\u0131z \u2192 title \u2192 yazar \u2192 tarih \u2192 body \u2192 foto \u2192 reply.
       Sol kolondaki author blo\u011Fu DOM'da y\u0131ld\u0131z+yazar+tarih s\u0131ras\u0131ndad\u0131r.
       Mobile'da author display:contents ile \u015Feffafla\u015F\u0131r; y\u0131ld\u0131z/yazar/tarih
       ayr\u0131 flex item olur. Content de display:contents \u2192 title/body/reply
       ayr\u0131 flex item olur. Tek seviyede order ile s\u0131ralan\u0131r. DOM dokunulmaz. */
    .ikr-review-list,
    .ikr-review-list.ikr-review-list--no-media{
      /* Yan padding theme mobile bloguna tasindi (--ikr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      display:flex;flex-direction:column;gap:8px;padding-top:16px;padding-bottom:16px;
    }
    .ikr-review-list-author{display:contents;}
    .ikr-review-list-content{display:contents;}
    .ikr-review-list-author-stars{order:1;margin-bottom:0;}
    .ikr-review-list-title{order:2;}
    .ikr-review-list-author-name{order:3;}
    /* yazar\u2192tarih ayn\u0131 imza grubu, galeri ile tutarl\u0131 kompakt 4px (gap 8 - margin -4) */
    .ikr-review-list-author-date{order:4;margin-top:-4px;}
    .ikr-review-list-body{order:5;margin-top:0;}
    /* body sonras\u0131 read-more body ile ayn\u0131 blo\u011Fa ait;
       reviewEl 8px gap sonras\u0131 net 4px kalmas\u0131 i\xE7in -4px (galeri/card uyumu) */
    .ikr-review-list-content > .ikr-read-more{order:6;margin-top:-4px;}
    .ikr-review-list-media{order:7;justify-content:flex-start;}
    .ikr-reply{order:8;width:100%;}
    /* Mobile media: t\xFCm fotolar yatay strip (overflow-x:auto). flex-shrink:0
       ile fotolar k\xFC\xE7\xFClmez, s\u0131\u011Fmayanlar yatay scroll. Desktop'taki "sadece ilk
       foto" kural\u0131 burada ezilir. Scroll bar gizli, parmakla kayd\u0131rma. */
    .ikr-review-list-media{
      flex-wrap:nowrap;overflow-x:auto;gap:8px;
      padding-bottom:4px;scrollbar-width:none;
      justify-content:flex-start;
    }
    .ikr-review-list-media::-webkit-scrollbar{display:none;}
    .ikr-review-list-media img{
      flex-shrink:0;
      max-width:var(--ikr-list-photo-w-mobile,100px);
      aspect-ratio:3/4;
      display:block;
    }
  }
`;var Bt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},It=Oi;function Mt(e,r){var i=xe(e),a=i.length>0,t=document.createElement("div");t.className="ikr-review-list"+(a?"":" ikr-review-list--no-media");var o=document.createElement("div");o.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=ue(e.rating,A),o.appendChild(s);var l=document.createElement("span");l.className="ikr-review-list-author-name",l.textContent=e.author||"",o.appendChild(l);var c=document.createElement("span");c.className="ikr-date ikr-review-list-author-date",c.textContent=fe(e.createdAt),o.appendChild(c),t.appendChild(o);var u=document.createElement("div");if(u.className="ikr-review-list-content",e.title){var k=document.createElement("div");k.className="ikr-review-list-title",k.textContent=e.title,u.appendChild(k)}var p=(e.comment||"").trim();if(p){var n=document.createElement("div");n.className="ikr-review-list-body ikr-body-clamped",n.textContent=p,u.appendChild(n);var h=document.createElement("span");h.className="ikr-read-more",h.textContent="Devam\u0131n\u0131 oku",h.style.display="none",u.appendChild(h),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2){h.style.display="inline";var f=!1;h.onclick=function(){f=!f,n.classList.toggle("ikr-body-clamped",!f),h.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var m=De(e.merchantReply);if(m&&u.appendChild(m),t.appendChild(u),a){var d=document.createElement("div");d.className="ikr-review-list-media",i.forEach(function(f){var v=document.createElement("img"),C=ie(f,j);v.src=C.src,v.srcset=C.srcset,v.loading="lazy",v.decoding="async",v.width=j,v.height=Math.round(j*4/3),v.setAttribute("data-ikr-img-url",f),te(v),(function(S){v.onclick=function(){ne(e,S,r)}})(f),d.appendChild(v)}),t.appendChild(d)}return t}var Fr={};ge(Fr,{css:()=>_t,meta:()=>Ft,render:()=>Ot});var Hi=`
  /* Galeri se\xE7iliyken widget full-bleed yerine 1200px ile s\u0131n\u0131rl\u0131 \u2014
     CSS columns parent geni\u015Fli\u011Fine yay\u0131ld\u0131\u011F\u0131 i\xE7in widget kendisi s\u0131n\u0131rlanmal\u0131.
     Di\u011Fer layoutlar (card/list) full-bleed olarak kal\u0131r. */
  #ikas-reviews-widget:has(.ikr-review-gallery){
    width:auto;
    max-width:1200px;
    margin-left:auto;
    margin-right:auto;
    column-count:2;
    column-gap:32px;
  }
  /* Non-review elemanlar kolon d\u0131\u015F\u0131na \xE7\u0131kar \u2014 summary, ba\u015Fl\u0131k, foto strip vs. */
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-title,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-summary,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-photo-section,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-write-btn,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-load-more,
  #ikas-reviews-widget:has(.ikr-review-gallery) > .ikr-state-msg{
    column-span:all;
    -webkit-column-span:all;
  }
  /* Item \u2014 column i\xE7inde kal\u0131r, i\xE7inde sol-sa\u011F split */
  .ikr-review-gallery{
    break-inside:avoid;
    -webkit-column-break-inside:avoid;
    page-break-inside:avoid;
    display:grid;
    grid-template-columns:1fr var(--ikr-gallery-photo-w,120px);
    column-gap:32px;
    row-gap:8px;
    align-items:start;
    /* Yan padding theme mobile blo\u011Fundan gelir (--ikr-pad-review-mobile).
       Shorthand yan padding'i 0'a resetleyip theme kural\u0131n\u0131 ezmesin diye
       top/bottom ayr\u0131 set. */
    padding-top:18px;padding-bottom:18px;
    margin:0;
    border-top:1px solid var(--ikr-review-border,#e5e7eb);
  }
  .ikr-review-gallery.ikr-review-gallery--no-media{
    grid-template-columns:1fr;
  }
  .ikr-review-gallery-content{
    display:flex;flex-direction:column;min-width:0;
  }
  /* Galeri dikey s\u0131ra: stars \u2192 title \u2192 author \u2192 date \u2192 body \u2192 reply.
     stars\u2192title (normal); title\u2192author (normal); author\u2192date (tight, ayn\u0131 imza
     grubu); date\u2192body (normal). Bkz: gap s\xF6zle\u015Fmesi. */
  .ikr-review-gallery-stars{
    /* en \xFCstte; margin yok */
  }
  .ikr-review-gallery-title{
    font-weight:600;
    font-size:var(--ikr-review-title-size,15px);
    color:var(--ikr-review-title,var(--ikr-text,rgba(0,0,0,1)));
    margin:var(--ikr-gap-normal) 0 0 0;
  }
  .ikr-review-gallery-author{
    font-weight:600;
    font-size:var(--ikr-author-size,14px);
    color:var(--ikr-review-author,var(--ikr-text,rgba(0,0,0,1)));
    margin-top:var(--ikr-gap-normal);
  }
  .ikr-review-gallery-date{
    font-size:var(--ikr-review-date-size,12px);
    color:var(--ikr-review-date,#5e5e5e);
    margin-top:var(--ikr-gap-tight);
  }
  .ikr-review-gallery-body{
    line-height:1.55;
    color:var(--ikr-review-body,var(--ikr-text,rgba(0,0,0,1)));
    font-size:var(--ikr-review-text-size,14px);
    margin-top:var(--ikr-gap-normal);
    max-width:340px;
  }
  /* Mobile tap highlight kald\u0131r\u0131ld\u0131 \u2014 modal a\xE7\u0131l\u0131rken g\xF6r\xFCn\xFCr kal\u0131yordu */
  .ikr-review-gallery .ikr-read-more{
    -webkit-tap-highlight-color:transparent;
    tap-highlight-color:transparent;
    user-select:none;-webkit-user-select:none;
  }
  .ikr-review-gallery-media{
    cursor:zoom-in;
  }
  /* Reply full-width: foto+metin alt\u0131nda her iki kolona yay\u0131l\u0131r */
  .ikr-review-gallery-reply{
    grid-column:1 / -1;
  }
  .ikr-review-gallery-media img{
    display:block;width:100%;height:auto;
    aspect-ratio:3/4;object-fit:cover;
    border-radius:var(--ikr-radius,6px);
    border:1px solid var(--ikr-photo-image-border,rgba(0,0,0,0.05));
  }
  @media (max-width:600px){
    #ikas-reviews-widget:has(.ikr-review-gallery){
      column-count:1;
      column-gap:0;
    }
    .ikr-review-gallery{
      grid-template-columns:1fr var(--ikr-gallery-photo-w-mobile,100px);
      column-gap:12px;row-gap:12px;
      /* Yan padding theme mobile bloguna tasindi (--ikr-pad-review-mobile).
         Burada sadece top/bottom set edilir ki theme kuralini ezmesin. */
      padding-top:16px;padding-bottom:16px;
    }
    .ikr-review-gallery.ikr-review-gallery--no-media{
      grid-template-columns:1fr;
    }
  }
`;var Ft={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},_t=Hi;function Ot(e,r){var i=rr(e),a=!!i,t=document.createElement("div");t.className="ikr-review-gallery"+(a?"":" ikr-review-gallery--no-media");var o=document.createElement("div");o.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=ue(e.rating,A),o.appendChild(s),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,o.appendChild(l)}var c=document.createElement("div");c.className="ikr-review-gallery-author",c.textContent=e.author||"",o.appendChild(c);var u=document.createElement("div");u.className="ikr-review-gallery-date",u.textContent=fe(e.createdAt),o.appendChild(u);var k=(e.comment||"").trim();if(k){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=k,o.appendChild(p);var n=document.createElement("span");n.className="ikr-read-more",n.textContent="Devam\u0131n\u0131 oku",n.style.display="none",n.style.cursor="pointer";var h=!1;n.onclick=function(){if(i){ne(e,i,r);return}h=!h,p.classList.toggle("ikr-body-clamped",!h),n.textContent=h?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},o.appendChild(n),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(n.style.display="inline")})}if(t.appendChild(o),a){var m=document.createElement("div");m.className="ikr-review-gallery-media";var d=document.createElement("img"),f=ie(i,ir);d.src=f.src,d.srcset=f.srcset,d.loading="lazy",d.decoding="async",d.width=ir,d.height=Math.round(ir*4/3),te(d),d.setAttribute("data-ikr-img-url",i),d.onclick=function(){ne(e,i,r)},m.appendChild(d),t.appendChild(m)}var v=De(e.merchantReply,i?function(){ne(e,i,r)}:null);return v&&(v.classList.add("ikr-review-gallery-reply"),t.appendChild(v)),t}var fr={card:Ir,list:Mr,gallery:Fr};function Xe(e){return fr[e]||fr.card}function Yi(){return Object.keys(fr).map(function(e){return fr[e].css||""}).join(`
`)}function Re(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var a=parseInt(i[1],16),t=parseInt(i[2],16),o=parseInt(i[3],16);return"rgba("+a+","+t+","+o+","+r+")"}function Ht(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(ni)}catch(a){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var i=document.querySelector("main")||document.body;return i?(i.appendChild(e),e):null}function Yt(e,r){var i=e.querySelector('[data-renuvex-slot="product-reviews"],[data-ikr-slot="product-reviews"]');return i||(i=nr({slot:"product-reviews",legacySlot:"product-reviews",className:"renuvex-pr-reviews-slot ikr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(i)),or(i,{surface:"reviews",productId:r||""}),i}var Di={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},ji={small:80,medium:110,large:140};function Dt(e,r){var i=document.createElement("div");i.className="ikr-state-msg ikr-state-error",i.setAttribute("role","status"),i.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="ikr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",i.appendChild(a);var t=document.createElement("button");return t.type="button",t.className="ikr-state-retry",t.textContent="Tekrar Dene",t.onclick=async function(){t.disabled=!0,t.textContent="Tekrar deneniyor...",await r()},i.appendChild(t),i}function jt(e,r){var i=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",t=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",c=r.barCountColor||"#111111",u=Re(s,.06),k=r.reviewStarColor||"#f59e0b",p=r.btnBgColor||"#111111",n=r.btnTextColor||"#ffffff",h=r.btnBorderColor||"#111111",m=r.filterBtnBgColor||"#111111",d=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",v=r.filterMenuBgColor||"#ffffff",C=r.filterMenuBorderColor||"#e5e7eb",S=r.filterItemTextColor||"#111111",y=r.filterItemHoverBgColor||"#f3f4f6",x=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",g=r.reviewAuthorColor||"#111111",z=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",b=r.replyBgColor||"#f9fafb",P=r.replyBorderColor||"#747474",N=r.replyLabelColor||"#111111",L=r.replyTextColor||"#111111",B=r.photoTitleColor||"#111111",J=Re("#111111",.05),Z=r.photoArrowBgColor||"#ffffff",le=r.photoArrowTextColor||"#111111",U=Re("#111111",.12),_=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Be=r.formSecondaryTextColor||"#3b3b3b",je=r.inputTextColor||F,H=r.inputBorderColor||"#d1d5db",Se=r.placeholderColor||"#9ca3af",de=r.formStepBarColor||"#111111",se=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",$=r.formBtnBorderColor||"#111111",ce=Re(se,.06),Q=Re(se,.18),Ve=Re(D,.85),ke=Re(F,.06),ee=r.loadMoreBgColor||"#ffffff",re=r.loadMoreTextColor||"#111111",pe=r.loadMoreBorderColor||"#111111",O={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":a,"--ikr-header-count":t,"--ikr-header-recommend":o,"--ikr-bar-fill":s,"--ikr-bar-track":l,"--ikr-bar-count":c,"--ikr-bar-hover-bg":u,"--ikr-btn-bg":p,"--ikr-btn-text":n,"--ikr-btn-border":h,"--ikr-filter-btn-bg":m,"--ikr-filter-btn-text":d,"--ikr-filter-btn-border":f,"--ikr-filter-menu-bg":v,"--ikr-filter-menu-border":C,"--ikr-filter-item-text":S,"--ikr-filter-item-hover-bg":y,"--ikr-filter-item-active":x,"--ikr-review-title":w,"--ikr-review-author":g,"--ikr-review-date":z,"--ikr-review-body":E,"--ikr-review-border":T,"--ikr-review-star-color":k,"--ikr-reply-bg-color":b,"--ikr-reply-border":P,"--ikr-reply-label":N,"--ikr-reply-text":L,"--ikr-photo-title":B,"--ikr-photo-image-border":J,"--ikr-photo-arrow-bg":Z,"--ikr-photo-arrow-text":le,"--ikr-photo-arrow-border":U,"--ikr-fwizard-bg":_,"--ikr-fwizard-text":F,"--ikr-fwizard-secondary-text":Be,"--ikr-fwizard-input-bg":_,"--ikr-fwizard-input-text":je,"--ikr-fwizard-input-border":H,"--ikr-fwizard-placeholder":Se,"--ikr-fwizard-close-text":F,"--ikr-fwizard-close-hover-bg":ke,"--ikr-fwizard-progress-bg":ke,"--ikr-fwizard-progress-active":de,"--ikr-fwizard-btn-bg":se,"--ikr-fwizard-btn-text":D,"--ikr-fwizard-btn-border":$,"--ikr-fwizard-btn-disabled-bg":Q,"--ikr-fwizard-btn-disabled-text":Ve,"--ikr-fwizard-nav-hover-bg":ce,"--ikr-load-more-bg":ee,"--ikr-load-more-text":re,"--ikr-load-more-border":pe};Object.keys(O).forEach(function(me){e.style.setProperty(me,O[me])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function Ce(e,r,i,a,t,o,s){if(Xr){er({productId:e,settings:r,reviewsData:i,productName:a,orderBy:t,page:o,badgeSettings:s});return}Qe(!0),Dr(e),jr(r),s!==void 0&&Vr(s),Gr(a),t&&We(t),o&&Le(o),i!=null&&Wr(i);try{let vr=function(R,M){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var I=R.meta.sizeOverrides[M];I&&Object.keys(I).forEach(function(q){n.style.setProperty(q,I[q])})}};var Vt=vr,l=ur(r.summaryLayout),c=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),u=r.showTitle!==!1,k=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=c&&u?k:"",n=document.documentElement;jt(n,r),ri("#111111",bi+_i()+Yi());var h=r.borderRadius!==void 0?r.borderRadius:8,m=Di[r.size]||Di.medium,d=ji[r.thumbnailSize]||ji.medium,f=Xe(r.reviewLayout);if(f.meta&&f.meta.sizeOverrides&&f.meta.sizeOverrides[r.size]){var v=f.meta.sizeOverrides[r.size],C=v["--ikr-list-photo-w"]||v["--ikr-gallery-photo-w"];C&&(d=parseInt(C))}n.style.setProperty("--ikr-title-size",m.titleSize+"px"),n.style.setProperty("--ikr-review-text-size",m.reviewTextSize+"px"),n.style.setProperty("--ikr-review-title-size",m.reviewTitleSize+"px"),n.style.setProperty("--ikr-author-size",m.authorSize+"px"),n.style.setProperty("--ikr-reply-name-size",m.replyNameSize+"px"),n.style.setProperty("--ikr-reply-text-size",m.replyTextSize+"px"),n.style.setProperty("--ikr-radius",h+"px"),n.style.setProperty("--ikr-radius-sm",Math.max(0,h-4)+"px"),n.style.setProperty("--ikr-photo-title-size",m.photoTitleSize+"px"),n.style.setProperty("--ikr-avg-rating-size",m.avgRatingSize+"px"),n.style.setProperty("--ikr-review-count-size",m.reviewCountSize+"px"),n.style.setProperty("--ikr-compact-count-size",m.compactCountSize+"px"),n.style.setProperty("--ikr-recommend-size",m.recommendSize+"px"),n.style.setProperty("--ikr-btn-text-size",m.btnTextSize+"px"),n.style.setProperty("--ikr-bar-label-size",m.barLabelSize+"px"),n.style.setProperty("--ikr-minimal-avg-size",m.minimalAvgSize+"px"),n.style.setProperty("--ikr-hero-avg-size",m.heroAvgSize+"px"),n.style.setProperty("--ikr-bar-count-size",m.barCountSize+"px"),n.style.setProperty("--ikr-review-date-size",m.reviewDateSize+"px"),n.style.setProperty("--ikr-filter-text-size",m.filterTextSize+"px"),n.style.setProperty("--ikr-load-more-size",m.loadMoreSize+"px"),n.style.setProperty("--ikr-read-more-size",m.readMoreSize+"px"),n.style.setProperty("--ikr-thumbnail-size",d+"px");var S=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";n.style.setProperty("--ikr-review-star-color",S),n.style.setProperty("--ikr-star-size",m.reviewStarSize+"px"),n.style.setProperty("--ikr-avg-star-size",m.avgStarSize+"px"),vr(ur(r.summaryLayout),r.size),vr(Xe(r.reviewLayout),r.size);var y=Ue(r),x=Ht();if(!x)return;var w=Yt(x,e),g=document.getElementById("ikas-reviews");if(g||(g=document.createElement("div"),g.id="ikas-reviews",g.style.minHeight="200px"),g.parentNode!==w&&w.appendChild(g),r.enabled===!1){g.style.minHeight="auto",g.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Qe(!1);var z=$e;er(null),z&&Ce(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}g.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var E=i||{},T=zr(E),b=T?[]:E.data&&E.data.reviews||[],P=T?0:E.data&&E.data.totalCount||0;qr(b);var N=g.cloneNode(!1);g.parentNode.replaceChild(N,g),g=N;var L=document.createElement("div");if(L.id="ikas-reviews-widget",L.className="renuvex-pr-reviews-widget",L.setAttribute("data-renuvex-surface","reviews"),L.setAttribute("data-ikr-surface","reviews"),e&&(L.setAttribute("data-renuvex-product-id",String(e)),L.setAttribute("data-ikr-product-id",String(e))),typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),p){var B=document.createElement("div"),J=r.summaryLayout||"classic";B.className="ikr-title ikr-title-"+J,B.textContent=p,L.appendChild(B)}if(T){L.appendChild(Dt(E.message,async function(){var R=await Ne(K,Te,1,Ie,Me);await Ce(K,A,R,Fe,Te,1,hr)})),g.appendChild(L),Ge(L,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var Z=E.data&&E.data.allCount||0,le=E.data&&E.data.ratingCounts||null,U=le||[0,0,0,0,0],_=E.data&&E.data.avgRating||"0.0";if(!le&&b.length>0){b.forEach(function(R){R.rating>=1&&R.rating<=5&&U[R.rating-1]++});var F=b.reduce(function(R,M){return R+M.rating},0);_=(F/b.length).toFixed(1)}if(Z>0){var Be=ur(r.summaryLayout),je=Be.render({widget:L,data:E,settings:r,iconPair:y,allCount:Z,ratingCounts:U,avgRatingVal:_,currentRatingFilter:Ie,currentOrderBy:Te,currentHasImages:Me,onFilterChange:async function(R){var M=Ie===R?null:R;Ze(M),Le(1);var I=await Ne(K,Te,1,M,Me);await Ce(K,A,I,Fe,Te,1)},onSortChange:async function(R,M){Le(1);var I=R,q=!1;M&&(q=!0,I="newest"),Yr(q),We(I);var kr=await Ne(K,I,1,Ie,q);await Ce(K,A,kr,Fe,I,1)}});L.appendChild(je)}else{var H=document.createElement("button");H.className="ikr-write-btn",H.style.cssText="display:block;margin:16px auto 0;",H.textContent=r.writeButtonText||"Yorum Yap",H.onclick=Y,L.appendChild(H)}var Se=(Hr||[]).filter(function(R){return xe(R).length>0});if(r.showPhotoGallery!==!1&&!Me&&Se.length>0){var de=document.createElement("div");if(de.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var se=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",D=document.createElement("div");D.className="ikr-photo-title",D.textContent=se,de.appendChild(D)}var $=r.reviewLayout==="card"?"1/1":"3/4";n.style.setProperty("--ikr-photo-thumb-aspect",$);var ce=document.createElement("div");ce.className="ikr-photo-strip";var Q=j,Ve=r.reviewLayout==="card"?j:Math.round(j*4/3),ke=0;Se.forEach(function(R){if(!(ke>=15)){var M=rr(R);if(M){var I=document.createElement("img"),q=ie(M,j);I.src=q.src,I.srcset=q.srcset,I.loading=ke<3?"eager":"lazy",I.decoding="async",I.width=Q,I.height=Ve,I.className="ikr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",te(I),(function(kr,Vi){I.onclick=function(){ne(Vi,kr,Se)}})(M,R),ce.appendChild(I),ke++}}});var ee=document.createElement("button");ee.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ee.innerHTML="&#8249;",ee.setAttribute("aria-label","\xD6nceki"),ee.onclick=function(){ce.scrollBy({left:-200,behavior:"smooth"})};var re=document.createElement("button");re.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",re.innerHTML="&#8250;",re.setAttribute("aria-label","Sonraki"),re.onclick=function(){ce.scrollBy({left:200,behavior:"smooth"})};var pe=document.createElement("div");pe.className="ikr-photo-strip-wrap",pe.appendChild(ee),pe.appendChild(ce),pe.appendChild(re),de.appendChild(pe),L.appendChild(de)}if(b.length===0){var O=document.createElement("p");O.className="ikr-state-msg",O.textContent="Hen\xFCz yorum yok.",L.appendChild(O)}else{var f=Xe(r.reviewLayout);b.forEach(function(M){L.appendChild(f.render(M,br))})}var me=E.data&&E.data.hasMore;if(me){var V=document.createElement("button");V.className="ikr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var R=Or+1,M=await Ne(K,Te,R,Ie,Me);if(M&&!zr(M)&&M.data&&Array.isArray(M.data.reviews)){Kr(M.data.reviews),Le(R);var I=Xe(A.reviewLayout);M.data.reviews.forEach(function(q){L.insertBefore(I.render(q,br),V)}),M.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},L.appendChild(V)}g.appendChild(L),Ge(L,"reviews-widget",{productId:e||""}),Er(Z>0?_:null,P,a,hr,y,K)}catch(R){console.error("[renuvex-pr] render error:",R),g.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Qe(!1),$e){var Ee=$e;er(null),Ce(Ee.productId,Ee.settings,Ee.reviewsData,Ee.productName,Ee.orderBy,Ee.page,Ee.badgeSettings)}}}export{Ce as a,lr as b,zr as c,Ne as d,Ui as e,Jt as f};
