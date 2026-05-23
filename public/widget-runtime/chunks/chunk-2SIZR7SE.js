/* ikas Reviews Widget ESM runtime | theme: default */
import{b as Ge}from"./chunk-Z7432DLE.js";import{a as ye,b as Xr,c as Qe,d as er,e as Jr,f as Ve,g as Zr}from"./chunk-VIPBMS3Y.js";import{$ as mr,A as _r,B as Hr,C as Or,D as Yr,E as Ke,F as Ue,G as Xe,M as je,N as jr,P as Dr,Q as pe,R as he,S as Vr,T as me,U as Wr,V as Gr,W as be,X as Je,Y as D,Z as Ze,_ as $e,a as ve,aa as ur,b as ke,ba as Q,c as ge,ca as qr,da as ee,e as Ye,ea as Kr,f as Nr,fa as De,g as ce,ga as Ur,h as Ar,i as Se,j as Ee,k as G,l as P,m as sr,n as Pe,p as cr,q as Pr,r as Re,s as Te,t as qe,u as pr,v as Rr,w as Br,x as Ir,y as Mr,z as Fr}from"./chunk-GQUR6DHK.js";var Pi=15,Ri=60*1e3,$r="__ikrReviewsFetchError",fr={};function rr(e){return{type:$r,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function vr(e){return!!(e&&e.type===$r)}async function Le(e,r,i,t,n,o){if(window.__ikasPreviewMode){try{var p=window.__ikasPreviewBaseUrl||ge,l=p+"/api/preview/reviews?page="+encodeURIComponent(i||1),s=await ye(l);if(s.ok)return await s.json()}catch(b){}return rr()}r=r||"newest",i=i||1;var m=o?"_l"+o:"",u="ikr_reviews_"+ke+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(n?"1":"0")+m,d=null,a=Kr(u);if(a)try{var v=JSON.parse(a);if(v&&v.t!==void 0&&v.v){if(Date.now()-v.t<Ri)return v.v;d=v.v,De(u,"")}else De(u,"")}catch(b){De(u,"")}try{var f=ge+"/api/public/reviews?storeId="+encodeURIComponent(ke)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(n?"&hasImages=true":"")+(o?"&limit="+encodeURIComponent(o):""),k=await ye(f);if(!k.ok)return d||rr();var c=await k.json();return De(u,JSON.stringify({t:Date.now(),v:c})),c}catch(b){return console.error("[ikr] fetchReviews error:",b),d||rr()}}async function Bi(e){var r=await Le(e,"newest",1,null,!0,Pi);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Ft(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!fr[e]){fr[e]=!0;var n={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},o={enabled:!0,size:"medium"};try{var p=await Xr();if(!p)return;var l=p.widgets&&p.widgets.reviews||n,s=p.widgets&&p.widgets.badge||o;if(l.enabled===!1)return;Re("newest"),Te(1),qe(null);var m=await Promise.all([Le(e,"newest",1,null),Bi(e)]),u=m[0];_r(m[1]),await we(e,l,u,r,"newest",1,s)}catch(d){console.error("[ikr] bootstrap error:",d),await we(e,n,rr(),r,void 0,void 0,o)}finally{delete fr[e]}}}function Be(e){return be(e)}function Ii(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function re(e,r,i,t){i?e.setProperty(r,i,t||""):e.removeProperty(r)}function Mi(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",i=navigator.maxTouchPoints||0,t=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&i>1;return t&&/AppleWebKit/i.test(r)}function Fi(){var e=Ii(),r=document.body.style,i=document.documentElement.style,t=Math.max(0,window.innerWidth-document.documentElement.clientWidth),n=window.getComputedStyle(document.body).position==="fixed",o=Mi()&&!n;if(t>0){var p=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",p+t+"px","important")}return i.setProperty("overflow","hidden","important"),i.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function _i(e){if(e){var r=document.body.style,i=document.documentElement.style;re(i,"overflow",e.rootOverflow,e.rootOverflowPriority),re(i,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),re(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),re(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),re(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),re(r,"position",e.bodyPosition,e.bodyPositionPriority),re(r,"top",e.bodyTop,e.bodyTopPriority),re(r,"left",e.bodyLeft,e.bodyLeftPriority),re(r,"right",e.bodyRight,e.bodyRightPriority),re(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Hi(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Ie(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(i){}}}function Oi(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ei(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Oi)}function ri(e){var r=ei(e),i=r[0]||e.querySelector('[role="dialog"]')||e;Ie(i)}function Yi(e,r){if(e.key==="Tab"){var i=ei(r);if(!i.length){e.preventDefault(),ri(r);return}var t=i[0],n=i[i.length-1],o=document.activeElement;if(!r.contains(o)){e.preventDefault(),Ie(t);return}e.shiftKey&&o===t?(e.preventDefault(),Ie(n)):!e.shiftKey&&o===n&&(e.preventDefault(),Ie(t))}}function ji(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function Di(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function Vi(e){if(Di(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function Qr(e,r,i,t,n){_i(t),document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e),Ie(n)}function Wi(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var n=document.createElement("div");n.className="ikr-modal-stars",n.innerHTML=pe(e.rating,P);var o=document.createElement("span");o.className="ikr-modal-date",o.textContent=me(e.createdAt),t.appendChild(n),t.appendChild(o),i.appendChild(t);var p=document.createElement("div");p.className="ikr-modal-title",p.textContent=e.title||"",p.style.display=e.title?"":"none",i.appendChild(p);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var s=document.createElement("div");s.className="ikr-modal-body",s.textContent=(e.comment||"").trim(),s.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(s);var m=document.createElement("div");m.className="ikr-modal-reply";var u=document.createElement("div");u.className="ikr-modal-reply-label",u.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi";var d=document.createElement("div");return d.className="ikr-modal-reply-text",d.textContent=e.merchantReply||"",m.appendChild(u),m.appendChild(d),m.style.display=e.merchantReply?"":"none",i.appendChild(m),r.appendChild(i),r}function ii(e,r,i){var t=i||P,n=e.querySelector(".ikr-modal-scroll-content"),o=n.querySelector(".ikr-modal-stars");o.innerHTML=pe(r.rating,t),n.querySelector(".ikr-modal-date").textContent=me(r.createdAt);var p=n.querySelector(".ikr-modal-title");p.textContent=r.title||"",p.style.display=r.title?"":"none",n.querySelector(".ikr-modal-author").textContent=r.author||"";var l=n.querySelector(".ikr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var s=n.querySelector(".ikr-modal-reply");s.querySelector(".ikr-modal-reply-label").textContent=t&&t.merchantReplyLabel||"Ma\u011Faza Sahibi",s.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",s.style.display=r.merchantReply?"":"none",e.scrollTop=0}function gr(e,r,i,t,n,o,p,l,s){var m=Be(e),u=Math.max(0,Math.min(i||0,m.length-1)),d=document.createElement("div");d.className="ikr-modal-left";var a=document.createElement("img"),v=p==="next"?"ikr-modal-img-enter-right":p==="prev"?"ikr-modal-img-enter-left":"";a.className="ikr-modal-main-img"+(v?" "+v:""),a.src=ur(m[u]||""),a.decoding="async",a.width=mr,a.height=Math.round(mr*4/3),a.alt="Yorum foto\u011Fraf\u0131",qr(a,function(S){if(S.style.display="none",!d.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",d.insertBefore(T,S)}}),d.appendChild(a);var f=document.createElement("button");f.className="ikr-modal-close-mobile",f.textContent="\u2715",f.setAttribute("aria-label","Kapat"),f.onclick=function(S){S.stopPropagation(),o()},d.appendChild(f);var k=0;if(d.addEventListener("touchstart",function(S){k=S.touches[0].clientX},{passive:!0}),d.addEventListener("touchend",function(S){var T=k-S.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(z)ue(e,r,u+1,t,n,o,!0,"next",l,s);else if(h){var g=t[r+1];ue(g,r+1,0,t,n,o,!1,"next",l,s)}}else if(b)ue(e,r,u-1,t,n,o,!0,"prev",l,s);else if(w){var L=t[r-1],A=Be(L);ue(L,r-1,A.length-1,t,n,o,!1,"prev",l,s)}}},{passive:!0}),m.length>1){var c=document.createElement("div");c.className="ikr-modal-thumbs",m.forEach(function(S,T){var g=document.createElement("img"),L=Q(S,$e);g.src=L.src,g.srcset=L.srcset,g.loading="lazy",g.decoding="async",g.width=$e,g.height=$e,g.className="ikr-modal-thumb"+(T===u?" ikr-modal-thumb-active":""),g.alt="K\xFC\xE7\xFCk resim "+(T+1),ee(g),g.tabIndex=0,g.setAttribute("role","button"),g.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===u&&g.setAttribute("aria-current","true"),(function(A){function N(){ue(e,r,A,t,n,o,!0,null,l,s)}g.onclick=N,g.onkeydown=function(I){(I.key==="Enter"||I.key===" ")&&(I.preventDefault(),N())}})(T),c.appendChild(g)}),d.appendChild(c)}var b=u>0,z=u<m.length-1,w=r>0,h=r<t.length-1,E=b||w,x=z||h;if(E){var y=document.createElement("button");y.className="ikr-modal-nav ikr-modal-nav-prev",y.innerHTML="&#8249;",y.setAttribute("aria-label","\xD6nceki"),y.onclick=function(S){if(S.stopPropagation(),b)ue(e,r,u-1,t,n,o,!0,"prev",l,s);else if(w){var T=t[r-1],g=Be(T);ue(T,r-1,g.length-1,t,n,o,!1,"prev",l,s)}},d.appendChild(y)}if(x){var C=document.createElement("button");C.className="ikr-modal-nav ikr-modal-nav-next",C.innerHTML="&#8250;",C.setAttribute("aria-label","Sonraki"),C.onclick=function(S){if(S.stopPropagation(),z)ue(e,r,u+1,t,n,o,!0,"next",l,s);else if(h){var T=t[r+1];ue(T,r+1,0,t,n,o,!1,"next",l,s)}},d.appendChild(C)}return d}function ti(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var n=Be(t);n[0]&&(new Image().src=ur(n[0]))}})}function kr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Gi(e,r){var i=e&&e.querySelector(".ikr-modal-wrap"),t=r&&r.querySelector(".ikr-modal-right"),n=r&&r.querySelector(".ikr-modal-scroll-content");function o(){kr(i),kr(t),kr(n)}o(),i&&Ie(i),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ue(e,r,i,t,n,o,p,l,s,m){if(m&&(m.currentReview=e),p){var u=gr(e,r,i,t,n,o,l,s,m);n.firstChild&&n.replaceChild(u,n.firstChild)}else{var u=gr(e,r,i,t,n,o,l,s,m),d=n.querySelector(".ikr-modal-right");n.firstChild&&n.replaceChild(u,n.firstChild),d&&ii(d,e,m&&m.currentSettings),Gi(s,n)}ti(r,t)}function ie(e,r,i){var t=Be(e);if(!t.length)return;var n=(i||[]).filter(function(h){return Be(h).length>0}),o=n.findIndex(function(h){return h===e||h.id===e.id});o===-1&&(n.unshift(e),o=0);var p=t.indexOf(r);p<0&&(p=0);var l=document.createElement("div");l.className="ikr-modal-overlay";var s=document.createElement("div");s.className="ikr-modal";var m=!1,u=Hi(),d=Fi(),a=ji(),v={currentReview:e,currentSettings:P};function f(h){var E=h&&h.detail&&h.detail.settings;v.currentSettings=E||P;var x=s.querySelector(".ikr-modal-right");!x||!v.currentReview||ii(x,v.currentReview,v.currentSettings)}function k(){m||(m=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Qr(l,c,k,d,u))}function c(h){if(h.key==="Escape"){b();return}Yi(h,l)}function b(){m||(m=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),Qr(l,c,k,d,u),Vi(a))}document.addEventListener("keydown",c),window.addEventListener("popstate",k),window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",f),l.onclick=function(){b()},s.onclick=function(h){h.stopPropagation()},s.appendChild(gr(e,o,p,n,s,b,null,l,v)),s.appendChild(Wi(e)),ti(o,n);var z=document.createElement("div");z.className="ikr-modal-wrap",z.tabIndex=-1,z.setAttribute("role","dialog"),z.setAttribute("aria-modal","true"),z.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),z.appendChild(s);var w=document.createElement("button");w.className="ikr-modal-close",w.textContent="\u2715",w.setAttribute("aria-label","Kapat"),w.onclick=function(h){h.stopPropagation(),b()},z.appendChild(w),l.appendChild(z),document.body.appendChild(l),ri(l)}function ai(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var ir=null;function qi(e,r){return he(e,r)}function hr(e,r,i,t,n,o,p){ir&&(ir.disconnect(),ir=null),Jr("product-title-rating","product-title-badge");var l=document.getElementById("ikr-rating-badge");if(l&&l.remove(),!!e&&!(t&&t.enabled===!1)){var s=document.getElementById("ikr-jsonld");s&&s.remove();var m=document.createElement("script");m.id="ikr-jsonld",m.type="application/ld+json",m.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(m);var u=ai(i);if(!(!u||!u.parentNode)){var d=t&&t.size||"medium",a=Ve[d]||Ve.medium,v=null;if(t&&t.mobileOverride===!0){var f=t.mobileSize||"small";v=Ve[f]||Ve.small}Zr(a,v);var k=Qe({slot:"product-title-rating",legacySlot:"product-title-badge",className:"renuvex-pr-product-badge-slot ikr-product-badge-slot",context:{surface:"pdp",productId:o||""}}),c=document.createElement("a");c.id="ikr-rating-badge",c.className="renuvex-pr-rating-badge ikr-rating-badge ikr-rating-badge--pdp",c.href="#ikas-reviews",c.setAttribute("role","figure"),c.setAttribute("aria-label",e+" \xFCzerinden 5 y\u0131ld\u0131z, "+r+" yorum"),c.setAttribute("data-ikr-surface","pdp"),c.setAttribute("data-renuvex-surface","pdp"),c.setAttribute("data-ikr-rating",String(e)),c.setAttribute("data-renuvex-rating",String(e)),c.setAttribute("data-ikr-count",String(r)),c.setAttribute("data-renuvex-count",String(r)),er(c,{surface:"pdp",productId:o||""});var b=window.getComputedStyle(u).textAlign,z=b==="center"?"center":b==="right"?"flex-end":"flex-start";c.style.cssText="justify-content:"+z+";",c.insertAdjacentHTML("beforeend",qi(e,n));var w=document.createElement("span");w.className="ikr-rating-badge__label",w.textContent=e+" ("+r+" yorum)",c.appendChild(w),c.onclick=function(h){h.preventDefault();var E=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(E){var x=document.querySelector("header"),y=x?x.getBoundingClientRect().height:0,C=E.getBoundingClientRect().top+window.pageYOffset-y-16;window.scrollTo({top:C,behavior:"smooth"})}},k.appendChild(c),u.parentNode.insertBefore(k,u.nextSibling),Ye(k,"pdp-badge",{productName:i||"",productId:o||""}),p||(ir=Nr(k,"pdp-badge",function(){hr(e,r,i,t,n,o,!0)},{productName:i||"",productId:o||""}))}}}var ni=`
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

${Vr}

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
`;var wr={};ve(wr,{meta:()=>it,render:()=>tt});function Me(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,n=e.currentRatingFilter,o=e.onFilterChange,p=document.createElement("div");p.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var s=r[l-1]||0,m=i>0?Math.round(s/i*100):0,u=n===l,d=document.createElement("div");d.className="ikr-bar-row"+(u?" ikr-bar-active":""),n&&!u&&(d.style.opacity="0.35");for(var a="",v=1;v<=5;v++){var f=v<=l;a+='<span class="ikr-bar-star ikr-icon '+(f?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(f?t.filled:t.empty)+"</span>"}d.innerHTML='<span class="ikr-bar-label">'+a+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+m+'%;"></div></div><span class="ikr-bar-count">('+s.toLocaleString("tr-TR")+")</span>",(function(k){d.onclick=function(){o(k)}})(l),p.appendChild(d)}return p}var te=[],oi=!1;function Ki(e){for(var r=te.length-1;r>=0;r--){var i=te[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function Ui(e){if(e.key==="Escape")for(var r=te.length-1;r>=0;r--)te[r].close()}function Xi(){oi||typeof document=="undefined"||(document.addEventListener("click",Ki,!0),document.addEventListener("keydown",Ui),oi=!0)}function tr(e){for(var r=0;r<te.length;r++)te[r]!==e&&te[r].close()}function ar(e){Xi();var r={trigger:e.trigger,element:e.element,close:e.close};return te.push(r),function(){var t=te.indexOf(r);t!==-1&&te.splice(t,1)}}function q(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,n=e.onWriteClick,o=e.onSortChange,p=document.createElement("div");p.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent=P&&P.writeButtonText||"Yorum Yap",l.onclick=n,p.appendChild(l);var s=document.createElement("div");s.className="ikr-filter-wrap";var m=document.createElement("button");m.type="button",m.className="ikr-filter-btn",m.setAttribute("aria-label","Filtrele"),m.setAttribute("aria-haspopup","menu"),m.setAttribute("aria-expanded","false");var u=P&&P.filterIcon||"lines";m.innerHTML=jr(u);var d=document.createElement("div");d.className="ikr-filter-menu",d.setAttribute("role","menu");var a=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]];function v(c){var b=d.classList.contains("ikr-open");d.classList.remove("ikr-open"),m.classList.remove("ikr-filter-btn-active"),m.setAttribute("aria-expanded","false");var z=c&&(c.restoreFocus===!0||c.restoreFocus==="auto"&&Ge());if(b&&z)try{m.focus({preventScroll:!0})}catch(w){try{m.focus()}catch(h){}}}function f(){tr(k),d.classList.add("ikr-open"),m.classList.add("ikr-filter-btn-active"),m.setAttribute("aria-expanded","true");var c=d.querySelector(".ikr-filter-item-active")||d.querySelector(".ikr-filter-item");c&&requestAnimationFrame(function(){try{c.focus({preventScroll:!0})}catch(b){try{c.focus()}catch(z){}}})}a.forEach(function(c){var b=c[2],z=b?t:!t&&(i||"newest")===c[0],w=document.createElement("button");w.type="button",w.className="ikr-filter-item"+(z?" ikr-filter-item-active":""),w.setAttribute("role","menuitem"),w.textContent=c[1],w.onclick=function(){v({restoreFocus:"auto"}),o(c[0],b)},d.appendChild(w)}),m.onclick=function(){d.classList.contains("ikr-open")?v({restoreFocus:"auto"}):f()},s.addEventListener("keydown",function(c){c.key==="Escape"&&d.classList.contains("ikr-open")&&(c.stopPropagation(),v({restoreFocus:!0}))}),s.addEventListener("focusout",function(c){if(d.classList.contains("ikr-open")){var b=c.relatedTarget;b&&s.contains(b)||v()}});var k=ar({trigger:s,element:d,close:v});return s.appendChild(m),s.appendChild(d),p.appendChild(s),p}function li(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Yorum yapma formu");var n=document.createElement("div");n.className="ikr-fwizard",t.appendChild(n);var o=document.createElement("button");o.className="ikr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat"),o.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',n.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-content",n.appendChild(p);var l=!1,s=null,m=!1,u="",d="";function a(){var g=document.activeElement;return!g||g===document.body||g===document.documentElement?null:g}function v(g){if(!(!g||!document.contains(g)||typeof g.focus!="function"))try{g.focus({preventScroll:!0})}catch(L){try{g.focus()}catch(A){}}}function f(g){if(!g||g.disabled||g.getAttribute("aria-hidden")==="true")return!1;var L=window.getComputedStyle?window.getComputedStyle(g):null;return L&&(L.display==="none"||L.visibility==="hidden")?!1:!!(g.offsetWidth||g.offsetHeight||g.getClientRects().length)}function k(g){var L=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(g.querySelectorAll(L)).filter(f)}function c(){var g=k(p),L=k(t),A=g[0]||L[0]||t;v(A)}function b(g){if(g.key==="Tab"){var L=k(t);if(!L.length){g.preventDefault(),v(t);return}var A=L[0],N=L[L.length-1],I=document.activeElement;if(!t.contains(I)){g.preventDefault(),v(A);return}g.shiftKey&&I===A?(g.preventDefault(),v(N)):!g.shiftKey&&I===N&&(g.preventDefault(),v(A))}}function z(){var g=window.innerWidth-document.documentElement.clientWidth;u=document.body.style.overflow,d=document.body.style.paddingRight,document.body.style.overflow="hidden",g>0&&(document.body.style.paddingRight=g+"px")}function w(){document.body.style.overflow=u,document.body.style.paddingRight=d}function h(){l||(l=!0,document.removeEventListener("keydown",E),t.removeEventListener("click",x),o.removeEventListener("click",h),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),w(),m&&v(s);try{r()}catch(g){}},200))}function E(g){if(g.key==="Escape"){h();return}b(g)}function x(g){g.target===t&&i&&h()}document.addEventListener("keydown",E),t.addEventListener("click",x),o.addEventListener("click",h);function y(g){s=a(),m=Ge(),g&&p.appendChild(g),document.body.appendChild(t),z(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open"),c()})}var C=null,S=null;function T(g,L){if(L=L||"error",C){try{C.remove()}catch(A){}C=null}S&&(clearTimeout(S),S=null),C=document.createElement("div"),C.className="ikr-fwizard-toast ikr-fwizard-toast--"+L,C.textContent=g,n.appendChild(C),S=setTimeout(function(){C&&(C.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(C){try{C.remove()}catch(A){}C=null}},300))},4e3)}return{open:y,close:h,content:p,setAllowOutsideClose:function(g){i=!!g},setStepAttr:function(g){n.setAttribute("data-step",String(g))},focusFirstControl:c,showToast:T}}var di=`
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
`;var br=4;function Fe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function si(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(n){try{n(i)}catch(o){}})}return{get:function(){return i},set:function(n){Object.assign(i,n),t()},goNext:function(){i.currentStep<br&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(n){return r.push(n),function(){r=r.filter(function(o){return o!==n})}}}}var Ji='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function ci(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},n=e.onSkip||function(){},o=e.onNext||function(){},p=document.createElement("div");p.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=Ji+"<span>Geri</span>",l.addEventListener("click",function(){t()}),p.appendChild(l);var s=document.createElement("div");s.className="ikr-fwizard-footer-progress";for(var m=[],u=0;u<br;u++){var d=document.createElement("span");d.className="ikr-fwizard-progress-seg",s.appendChild(d),m.push(d)}p.appendChild(s);var a=document.createElement("button");a.type="button";var v=null;function f(c){v&&a.removeEventListener("click",v),v=c,c&&a.addEventListener("click",c)}p.appendChild(a);function k(c,b){var z=r.indexOf(c)!==-1,w=i.indexOf(c)!==-1,h=b&&(b.images&&b.images.length>0||b.pendingImages&&b.pendingImages.length>0);if(z)c===2&&h?(a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Devam Et"),a.innerHTML="Devam Et",f(function(){o()})):(a.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",a.setAttribute("aria-label","Atla"),a.innerHTML="<span>Atla</span>",f(function(){n()})),a.disabled=!1,a.classList.remove("ikr-fwizard-cta-btn--disabled"),a.style.visibility="",a.tabIndex=0;else if(w){a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Sonraki"),a.innerHTML="Sonraki",a.style.visibility="",a.tabIndex=0;var E=Fe(c,b);a.disabled=!E,a.classList.toggle("ikr-fwizard-cta-btn--disabled",!E),f(function(){a.disabled||o()})}else a.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",a.innerHTML="",a.style.visibility="hidden",a.tabIndex=-1,a.disabled=!0,f(null)}return{el:p,update:function(c,b){m.forEach(function(w,h){h+1<=c?w.classList.add("ikr-fwizard-progress-seg-active"):w.classList.remove("ikr-fwizard-progress-seg-active")});var z=c<=1;l.style.visibility=z?"hidden":"",l.style.pointerEvents=z?"none":"",l.tabIndex=z?-1:0,k(c,b)},setNextDisabled:function(c){a.classList.contains("ikr-fwizard-cta-btn")&&(a.disabled=!!c,a.classList.toggle("ikr-fwizard-cta-btn--disabled",!!c))},setThanksState:function(c){l.style.visibility="hidden",s.style.visibility="hidden",a.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",a.setAttribute("aria-label","Devam Et"),a.innerHTML="Devam Et",a.style.visibility="",a.disabled=!1,a.classList.remove("ikr-fwizard-cta-btn--disabled"),f(c)}}}function pi(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var t=!1,n=document.createElement("div");n.className="ikr-fwizard-step-title",n.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(n);var o=document.createElement("div");o.className="ikr-fwizard-stars",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var p=je(P||{}),l=[];function s(d){l.forEach(function(a,v){var f=v<d;a.classList.toggle("ikr-fwizard-star-active",f),a.setAttribute("aria-checked",v+1===d?"true":"false"),a.innerHTML=f?p.filled:p.empty})}for(var m=1;m<=5;m++)(function(d){var a=document.createElement("button");a.type="button",a.className="ikr-fwizard-star",a.setAttribute("role","radio"),a.setAttribute("aria-label",d+" y\u0131ld\u0131z"),a.innerHTML=p.empty,a.addEventListener("mouseenter",function(){s(d)}),a.addEventListener("mouseleave",function(){s(e.get().rating)}),a.addEventListener("click",function(){t||(t=!0,e.set({rating:d}),s(d),setTimeout(function(){var v=!r.canNavigate||r.canNavigate();v&&e.goNext()},400))}),l.push(a),o.appendChild(a)})(m);s(e.get().rating);var u=function(d){var a=d&&d.detail&&d.detail.settings;p=je(a||P||{}),s(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u),i.appendChild(o),{el:i,destroy:function(){window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",u)}}}var mi=3,Zi=10*1024*1024;function ui(e,r){r=r||{};var i=!1,t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-photos";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",t.appendChild(n);var o=document.createElement("div");o.className="ikr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",t.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var s=document.createElement("input");s.type="file",s.accept="image/*",s.multiple=!0,s.style.display="none",p.appendChild(l),p.appendChild(s);var m=document.createElement("div");m.className="ikr-fwizard-photo-previews",m.setAttribute("aria-live","polite"),p.appendChild(m),t.appendChild(p);var u=r.blobMap||{},d=r.urlToFinger||{};function a(){if(!i){var w=e.get().images||[],h=e.get().pendingImages||[],E=w.map(function(x){return{url:x,isPending:!1}}).concat(h.map(function(x){return{url:x.url,file:x.file,isPending:!0,error:x.error}}));m.innerHTML="",E.forEach(function(x){var y=u[x.url]||x.url,C=v(x,y);m.appendChild(C)}),b()}}function v(w,h){var E=document.createElement("div");E.className="ikr-fwizard-photo-thumb";var x=document.createElement("img");x.src=h,x.alt="",x.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",E.appendChild(x);var y=document.createElement("div");y.className="ikr-fwizard-photo-loading",y.style.display="none",E.appendChild(y);var C=document.createElement("button");return C.type="button",C.className="ikr-fwizard-photo-remove",C.innerHTML="&#x2715;",E.appendChild(C),f(E,w,h),E}function f(w,h,E){var x=w.querySelector("img");x.src!==E&&(x.src=E);var y=w.querySelector(".ikr-fwizard-photo-loading");h.isPending&&h.error?(y.style.display="flex",y.innerHTML='<span class="ikr-upload-error">\u2717 '+h.error+"</span>"):y.style.display="none";var C=w.querySelector(".ikr-fwizard-photo-remove");C.onclick=function(){var S=d[h.url]||(h.file?h.file.name+"_"+h.file.size:null);if(h.url.startsWith("blob:")&&URL.revokeObjectURL(h.url),S){var T=(e.get().fingerprints||[]).filter(function(A){return A!==S});e.set({fingerprints:T})}if(h.isPending){var g=(e.get().pendingImages||[]).filter(function(A){return A.url!==h.url});e.set({pendingImages:g})}else{var L=(e.get().images||[]).filter(function(A){return A!==h.url});e.set({images:L})}}}var k='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',c='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function b(){var w=(e.get().images||[]).length,h=(e.get().pendingImages||[]).length,E=w+h,x=E>=mi;E>0?(p.classList.add("ikr-fwizard-photo-card--compact"),l.innerHTML=c):(p.classList.remove("ikr-fwizard-photo-card--compact"),l.innerHTML=k+"<span>Foto\u011Fraf Ekle</span>"),x?(l.style.display="none",l.disabled=!0,s.disabled=!0):(l.style.display="flex",l.disabled=!1,s.disabled=!1,l.classList.remove("ikr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){s.disabled||s.click()}),s.onchange=async function(w){var h=(e.get().images||[]).length+(e.get().pendingImages||[]).length,E=Array.from(w.target.files).slice(0,mi-h);s.value="";var x=(e.get().pendingImages||[]).length,y=e.get().images||[],C=y.length;if(E.length!==0){for(var S=[],T=[],g=0;g<E.length;g++){var L=E[g],A=L.name+"_"+L.size,N=(e.get().fingerprints||[]).some(function(F){return F===A})||S.some(function(F){return F.file.name+"_"+F.file.size===A});if(N){console.log("[ikr] Duplicate file detected, skipping:",L.name);continue}if(L.size>Zi){var I="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(I,"error"):alert(I);continue}var K=URL.createObjectURL(L);d[K]=A,S.push({url:K,file:L,error:null}),T.push({url:K,file:L});var U=(e.get().fingerprints||[]).slice();U.push(A),e.set({fingerprints:U})}if(S.length!==0){var ae=(e.get().pendingImages||[]).concat(S),W=async function(){for(var F=0;F<T.length;F++){var Ae=T[F],He=Ae.file,O=Ae.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var xe=(e.get().pendingImages||[]).filter(function(H){return H.url!==O}),ne=(e.get().images||[]).slice();ne.push(O),e.set({pendingImages:xe,images:ne});continue}try{var oe=await ye(ge+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke})});if(!oe.ok)throw oe.status===429?new Error("rate_limit"):new Error("sign failed");var j=await oe.json();if(!j.folder)throw new Error("sign folder missing");var X=new FormData;X.append("file",He),X.append("api_key",j.api_key),X.append("timestamp",j.timestamp),X.append("signature",j.signature),X.append("folder",j.folder);var le=await fetch("https://api.cloudinary.com/v1_1/"+j.cloud_name+"/image/upload",{method:"POST",body:X}),J=await le.json();if(J.secure_url&&Gr(J.secure_url)){var Oe=(e.get().pendingImages||[]).some(function(H){return H.url===O});if(!Oe){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}u[J.secure_url]=O,d[J.secure_url]=d[O];var fe=(e.get().pendingImages||[]).filter(function(H){return H.url!==O}),Z=(e.get().images||[]).slice();Z.push(J.secure_url),e.set({pendingImages:fe,images:Z});try{ye(ge+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke,secureUrl:J.secure_url})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[ikr] Image upload failed:",H);var $=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast($,"error");var de=(e.get().pendingImages||[]).map(function(se){return se.url===O?{url:se.url,file:se.file,error:$}:se});e.set({pendingImages:de})}}};if(C===0&&x===0){i=!0;var _=!r.canNavigate||r.canNavigate();_&&e.goNext()}e.set({pendingImages:ae}),W()}}};var z=e.onChange(a);return a(),{el:t,destroy:function(){i=!0,s.onchange=null,z&&z()}}}var yr=2e3,$i=60;function fi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var n=document.createElement("div");n.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",n.textContent="Deneyiminizi anlat\u0131n",t.appendChild(n);var o=document.createElement("div");o.className="ikr-fwizard-content-form";var p=document.createElement("input");p.type="text",p.className="ikr-fwizard-input",p.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",p.maxLength=$i,p.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),p.value=e.get().title||"",p.addEventListener("input",function(){e.set({title:p.value})}),o.appendChild(p);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=yr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",o.appendChild(l);var s=document.createElement("div");s.className="ikr-fwizard-char-counter",s.setAttribute("aria-live","polite"),o.appendChild(s);function m(){var d=l.value.length;s.textContent=d+"/"+yr,s.classList.toggle("ikr-fwizard-char-counter--max",d>=yr)}function u(){return Fe(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),m(),i(u())}),t.appendChild(o),m(),setTimeout(function(){i(u())},0),{el:t,destroy:function(){}}}var Qi=40;function vi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=r.onSuccess||function(){},n=document.createElement("div");n.className="ikr-fwizard-step ikr-fwizard-step-author";var o=document.createElement("div");o.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",n.appendChild(o);var p=document.createElement("div");p.className="ikr-fwizard-author-form";var l=document.createElement("div");l.className="ikr-fwizard-field";var s=document.createElement("label");s.className="ikr-fwizard-label",s.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var m=document.createElement("input");m.type="text",m.className="ikr-fwizard-input",m.maxLength=Qi,m.setAttribute("aria-required","true"),m.value=e.get().author||"",l.appendChild(s),l.appendChild(m),p.appendChild(l);var u=document.createElement("div");u.className="ikr-fwizard-field";var d=document.createElement("label");d.className="ikr-fwizard-label",d.textContent="E-posta (opsiyonel)";var a=document.createElement("input");a.type="email",a.className="ikr-fwizard-input",a.setAttribute("autocomplete","email"),a.value=e.get().email||"",u.appendChild(d),u.appendChild(a),p.appendChild(u);var v=document.createElement("div");v.className="ikr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",p.appendChild(v);var f=document.createElement("div");f.className="ikr-fwizard-msg",f.setAttribute("role","alert"),f.setAttribute("aria-live","assertive"),p.appendChild(f);var k=document.createElement("button");k.type="button",k.className="ikr-fwizard-submit-btn",k.textContent="G\xF6nder",p.appendChild(k),n.appendChild(p);function c(){return Fe(4,e.get())}function b(){var w=!c(),h=(e.get().pendingImages||[]).length,E=h>0;E?(k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled"),k.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(k.disabled=w,k.classList.toggle("ikr-fwizard-submit-btn--disabled",w),k.textContent="G\xF6nder")}m.addEventListener("input",function(){e.set({author:m.value}),b(),i(c())}),a.addEventListener("input",function(){e.set({email:a.value})}),b(),setTimeout(function(){i(c())},0),k.onclick=async function(){if(!k.disabled){var w=e.get(),h=(w.author||"").trim(),E=(w.comment||"").trim();if(a.value.trim()&&!a.checkValidity()){a.reportValidity();return}if(!h){f.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!w.rating){f.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}k.disabled=!0,k.classList.add("ikr-fwizard-submit-btn--disabled");var x=k.textContent;if(k.textContent="G\xF6nderiliyor\u2026",f.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t()},600);return}try{var y=Dr(window.location.href),C=w.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),S=await ye(ge+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke,productId:w.productId||null,slug:y||null,productName:C,author:h,title:(w.title||"").trim()||null,comment:E||null,rating:w.rating,images:w.images||[]})},15e3);if(S.ok)t();else{var T=await S.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(A){var g=A&&(A.name==="AbortError"||/signal/i.test(A.message||"")),L=g?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":A.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):f.innerHTML='<div class="ikr-fwizard-msg-error">'+L+"</div>",k.disabled=!1,k.classList.remove("ikr-fwizard-submit-btn--disabled"),k.textContent=x}}};var z=e.onChange(b);return{el:n,destroy:function(){k.onclick=null,z&&z()}}}var ki=!1;function et(){if(!ki){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=di,document.head.appendChild(e),ki=!0}}function rt(e,r,i){if(i=i||{},e===1)return pi(r,{canNavigate:i.canNavigate});if(e===2)return ui(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return fi(r,{onValidityChange:i.onValidityChange});if(e===4)return vi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:t,destroy:function(){}}}function gi(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function hi(e){e=e||{},et();var r=si({productId:e.productId,productName:e.productName}),i={},t={},n=li({onClose:function(){window.removeEventListener("popstate",p),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(x){var y=i[x];y&&y.startsWith("blob:")&&URL.revokeObjectURL(y)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),o={ikrReviewModal:!0};window.history.pushState(o,null,"");var p=function(x){n&&n.close&&n.close()};window.addEventListener("popstate",p);var l=document.createElement("div");l.className="ikr-fwizard-step-wrap";var s=ci({skippableSteps:[2],nextableSteps:[3],onBack:function(){d==="idle"&&r.goBack()},onSkip:function(){d==="idle"&&r.goNext()},onNext:function(){d==="idle"&&r.goNext()}}),m=document.createElement("div");m.className="ikr-fwizard-layout",m.appendChild(l),m.appendChild(s.el);var u=null,d="idle",a=null,v=!0,f=null;function k(x,y){l.innerHTML="";var C=rt(x,r,{canNavigate:function(){return d==="idle"},blobMap:i,urlToFinger:t,onValidityChange:function(g){s.setNextDisabled(!g)},onSuccess:b,showToast:n.showToast});if(u=C,s.update(x,r.get()),y){d="entering",C.el.classList.add("ikr-fwizard-step--enter");var S=null,T=function(){S&&clearTimeout(S),C.el.removeEventListener("animationend",T),C.el.classList.remove("ikr-fwizard-step--enter"),d="idle",a!==null&&z()};C.el.addEventListener("animationend",T),S=setTimeout(T,700)}else d="idle";l.appendChild(C.el),n.setStepAttr&&n.setStepAttr(x),x===3&&s.setNextDisabled(!0)}var c=!1;function b(){if(!c){if(c=!0,!u){l.innerHTML="";var x=gi();x.classList.add("ikr-fwizard-step--enter"),l.appendChild(x),n.setStepAttr("thanks"),s.setThanksState(n.close);return}var y=u;d="exiting",y.el.classList.add("ikr-fwizard-step--exit");var C=function(){if(f&&clearTimeout(f),y.el.removeEventListener("animationend",C),y.destroy)try{y.destroy()}catch(T){}u===y&&(u=null),l.innerHTML="";var S=gi();S.classList.add("ikr-fwizard-step--enter"),l.appendChild(S),n.setStepAttr("thanks"),s.setThanksState(n.close),d="idle"};y.el.addEventListener("animationend",C),f=setTimeout(C,300)}}function z(){var x=r.get().currentStep;if(d!=="idle"){a=x;return}if(!u){var y=!v;v=!1,k(x,y);return}var C=u;d="exiting",C.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(f&&clearTimeout(f),C.el.removeEventListener("animationend",S),C.destroy)try{C.destroy()}catch(g){}if(u===C){l.innerHTML="",u=null;var T=a!==null?a:r.get().currentStep;a=null,k(T,!0),d="idle"}};C.el.addEventListener("animationend",S),f=setTimeout(S,350)}z();var w=r.get().currentStep,h=r.onChange(function(x){x.currentStep!==w?(w=x.currentStep,z()):s.update(x.currentStep,x)}),E=n.close;return n.close=function(){h&&h(),typeof f!="undefined"&&f&&clearTimeout(f),E()},n.open(m),{close:n.close}}function Y(){hi({productId:G||"",productName:Pe||""})}var it={id:"classic",name:"Klasik (A\xE7\u0131k)"};function tt(e){var r=e.widget,i=e.data,t=e.settings,n=e.iconPair,o=e.allCount,p=e.ratingCounts,l=e.avgRatingVal,s=e.currentRatingFilter,m=e.currentOrderBy,u=e.currentHasImages,d=e.onFilterChange,a=e.onSortChange,v=document.createElement("div");v.className="ikr-summary";var f=(p[3]||0)+(p[4]||0),k=o>0?Math.round(f/o*100):0,c=document.createElement("div");c.className="ikr-summary-block ikr-summary-avg",c.innerHTML='<span class="ikr-avg-star ikr-icon">'+n.filled+'</span><span class="ikr-avg-num">'+l+"</span>",v.appendChild(c);var b=document.createElement("div");if(b.className="ikr-summary-block ikr-summary-count",b.textContent=o.toLocaleString("tr-TR")+" Yorum",v.appendChild(b),t.showRecommendation!==!1&&k>0){var z=document.createElement("div");z.className="ikr-summary-block ikr-summary-recommend",z.innerHTML='<span class="ikr-recommend-pct">%'+k+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(z)}return v.appendChild(Me({ratingCounts:p,allCount:o,iconPair:n,currentRatingFilter:s,onFilterChange:d})),v.appendChild(q({widget:r,currentOrderBy:m,currentHasImages:u,onWriteClick:Y,onSortChange:a})),v}var xr={};ve(xr,{css:()=>nt,meta:()=>at,render:()=>ot});var bi=`
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
`;var at={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},nt=bi;function ot(e){var r=e.widget,i=e.settings,t=e.iconPair,n=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,m=e.currentHasImages,u=e.onFilterChange,d=e.onSortChange,a=document.createElement("div");a.className="ikr-summary ikr-summary-compact";var v=document.createElement("div");v.className="ikr-compact-header";var f=document.createElement("div");f.className="ikr-compact-trigger-wrap";var k=document.createElement("button");k.className="ikr-compact-trigger",k.type="button",k.setAttribute("aria-expanded","false"),k.innerHTML='<span class="ikr-compact-trigger-stars">'+he(p,t)+'</span><span class="ikr-compact-trigger-text">'+n.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',f.appendChild(k),v.appendChild(f);var c=q({widget:r,currentOrderBy:s,currentHasImages:m,onWriteClick:Y,onSortChange:d}),b=c.querySelector(".ikr-filter-wrap"),z=c.querySelector(".ikr-write-btn"),w=document.createElement("div");w.className="ikr-compact-actions-slot",z&&w.appendChild(z),b&&w.appendChild(b),v.appendChild(w),a.appendChild(v);var h=document.createElement("div");h.className="ikr-compact-panel",h.setAttribute("role","dialog"),h.setAttribute("aria-hidden","true");var E=document.createElement("div");E.className="ikr-compact-panel-inner";var x=document.createElement("div");x.className="ikr-compact-avg",x.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+p+"</span>",E.appendChild(x),E.appendChild(Me({ratingCounts:o,allCount:n,iconPair:t,currentRatingFilter:l,onFilterChange:u})),h.appendChild(E);var y=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function C(_){var F=_?a:f;h.parentNode!==F&&(h.classList.contains("ikr-open")&&(h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")),F.appendChild(h))}if(C(y?y.matches:!1),y){var S=function(_){C(_.matches)};y.addEventListener?y.addEventListener("change",S):y.addListener&&y.addListener(S)}if(z){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=P&&P.writeButtonText||"Yorum Yap",T.onclick=Y;var g=document.createElement("div");g.className="ikr-compact-write-row",g.appendChild(T),a.appendChild(g)}function L(){h.classList.remove("ikr-open"),h.setAttribute("aria-hidden","true"),k.setAttribute("aria-expanded","false")}function A(){tr(N),h.classList.add("ikr-open"),h.setAttribute("aria-hidden","false"),k.setAttribute("aria-expanded","true")}k.onclick=function(){h.classList.contains("ikr-open")?L():A()};var N=null;function I(_){N&&(N(),N=null),_||(N=ar({trigger:f,element:h,close:L}))}if(I(y?y.matches:!1),y){var K=function(_){I(_.matches)};y.addEventListener?y.addEventListener("change",K):y.addListener&&y.addListener(K)}if(i.showRecommendation!==!1){var U=(o[3]||0)+(o[4]||0),ae=n>0?Math.round(U/n*100):0;if(ae>0){var W=document.createElement("div");W.className="ikr-summary-block ikr-summary-recommend",W.style.marginTop="8px",W.innerHTML='<span class="ikr-recommend-pct">%'+ae+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",E.appendChild(W)}}return a}var zr={};ve(zr,{css:()=>dt,meta:()=>lt,render:()=>st});var yi=`
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
`;var lt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},dt=yi;function st(e){var r=e.widget,i=e.settings,t=e.iconPair,n=e.allCount,o=e.ratingCounts,p=e.avgRatingVal,l=e.currentRatingFilter,s=e.currentOrderBy,m=e.currentHasImages,u=e.onFilterChange,d=e.onSortChange,a=document.createElement("div");a.className="ikr-summary ikr-summary-split";var v=document.createElement("div");v.className="ikr-split-col ikr-split-left";var f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+p+"</span>",v.appendChild(f);var k=document.createElement("div");k.className="ikr-summary-block ikr-summary-count ikr-split-left-count",k.textContent=n.toLocaleString("tr-TR")+" Yorum",v.appendChild(k),a.appendChild(v);var c=document.createElement("div");c.className="ikr-split-col ikr-split-mid",c.appendChild(Me({ratingCounts:o,allCount:n,iconPair:t,currentRatingFilter:l,onFilterChange:u})),a.appendChild(c);var b=q({widget:r,currentOrderBy:s,currentHasImages:m,onWriteClick:Y,onSortChange:d}),z=b.querySelector(".ikr-filter-wrap"),w=b.querySelector(".ikr-write-btn"),h=document.createElement("div");h.className="ikr-split-col ikr-split-right",w&&h.appendChild(w),z&&h.appendChild(z),a.appendChild(h);var E=(o[3]||0)+(o[4]||0),x=n>0?Math.round(E/n*100):0,y=document.createElement("div");y.className="ikr-summary-block ikr-summary-recommend",y.innerHTML='<span class="ikr-recommend-pct">%'+x+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var C=i.showRecommendation===!1||x===0;return C&&y.classList.add("ikr-split-rec-hidden"),v.appendChild(y),a}var Cr={};ve(Cr,{css:()=>pt,meta:()=>ct,render:()=>mt});var wi=`
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
`;var ct={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},pt=wi;function mt(e){var r=e.widget,i=e.iconPair,t=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-minimal";var m=document.createElement("div");m.className="ikr-minimal-info";var u=document.createElement("div");u.className="ikr-minimal-row";var d=document.createElement("span");d.className="ikr-minimal-avg",d.textContent=n,u.appendChild(d);var a=document.createElement("span");a.className="ikr-minimal-stars",a.innerHTML=he(n,i),u.appendChild(a);var v=document.createElement("span");v.className="ikr-minimal-count",v.textContent=t.toLocaleString("tr-TR")+" Yorum",u.appendChild(v),m.appendChild(u),s.appendChild(m);var f=q({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:Y,onSortChange:l}),k=f.querySelector(".ikr-filter-wrap"),c=f.querySelector(".ikr-write-btn"),b=document.createElement("div");if(b.className="ikr-minimal-actions",c&&b.appendChild(c),k&&b.appendChild(k),s.appendChild(b),c){var z=document.createElement("button");z.className="ikr-write-btn",z.textContent=P&&P.writeButtonText||"Yorum Yap",z.onclick=Y;var w=document.createElement("div");w.className="ikr-minimal-write-row",w.appendChild(z),s.appendChild(w)}return s}var Sr={};ve(Sr,{css:()=>ft,meta:()=>ut,render:()=>vt});var xi=`
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
`;var ut={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},ft=xi;function vt(e){var r=e.widget,i=e.iconPair,t=e.allCount,n=e.avgRatingVal,o=e.currentOrderBy,p=e.currentHasImages,l=e.onSortChange,s=document.createElement("div");s.className="ikr-summary ikr-summary-hero";var m=document.createElement("div");m.className="ikr-hero-info";var u=document.createElement("div");u.className="ikr-hero-rating-col";var d=document.createElement("span");d.className="ikr-hero-avg",d.textContent=n,u.appendChild(d);var a=document.createElement("div");a.className="ikr-hero-meta-row";var v=document.createElement("span");v.className="ikr-hero-stars",v.innerHTML=he(n,i),a.appendChild(v);var f=document.createElement("div");f.className="ikr-hero-count",f.textContent=t.toLocaleString("tr-TR")+" Yorum",a.appendChild(f),u.appendChild(a),m.appendChild(u),s.appendChild(m);var k=q({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:Y,onSortChange:l}),c=k.querySelector(".ikr-filter-wrap"),b=k.querySelector(".ikr-write-btn"),z=document.createElement("div");z.className="ikr-hero-actions ikr-desktop-only",b&&z.appendChild(b),c&&z.appendChild(c),s.appendChild(z);var w=q({widget:r,currentOrderBy:o,currentHasImages:p,onWriteClick:Y,onSortChange:l}),h=w.querySelector(".ikr-filter-wrap"),E=w.querySelector(".ikr-write-btn"),x=document.createElement("div");return x.className="ikr-hero-write-row",E&&x.appendChild(E),h&&x.appendChild(h),s.appendChild(x),s}var nr={classic:wr,compact:xr,split:zr,minimal:Cr,hero:Sr};function or(e){return nr[e]||nr.classic}function zi(){return Object.keys(nr).map(function(e){return nr[e].css||""}).join(`
`)}var Er={};ve(Er,{css:()=>gt,meta:()=>kt,render:()=>ht});function _e(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var n=document.createElement("span");n.className="ikr-reply-label",n.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi",t.appendChild(n),i.appendChild(t);var o=document.createElement("div");o.className="ikr-reply-text ikr-reply-text-clamped",o.textContent=e,i.appendChild(o);var p=document.createElement("span");return p.className="ikr-read-more ikr-reply-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(p.style.display="inline",typeof r=="function")p.onclick=r;else{var l=!1;p.onclick=function(){l=!l,o.classList.toggle("ikr-reply-text-clamped",!l),p.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var kt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},gt="";function ht(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var n=document.createElement("div");n.className="ikr-review-top-left";var o=document.createElement("span");o.className="ikr-review-stars",o.innerHTML=pe(e.rating,P),n.appendChild(o);var p=document.createElement("span");if(p.className="ikr-date",p.textContent=me(e.createdAt),t.appendChild(n),t.appendChild(p),i.appendChild(t),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var s=document.createElement("div");s.className="ikr-author",s.textContent=e.author||"",i.appendChild(s);var m=(e.comment||"").trim();if(m){var u=document.createElement("div");u.className="ikr-body ikr-body-clamped",u.textContent=m,i.appendChild(u);var d=document.createElement("span");d.className="ikr-read-more",d.textContent="Devam\u0131n\u0131 oku",d.style.display="none",i.appendChild(d),requestAnimationFrame(function(){if(u.scrollHeight>u.clientHeight+2){d.style.display="inline";var k=!1;d.onclick=function(){k=!k,u.classList.toggle("ikr-body-clamped",!k),d.textContent=k?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var a=be(e);if(a.length){var v=document.createElement("div");v.className="ikr-gallery",a.forEach(function(k){var c=document.createElement("img"),b=Q(k,D);c.src=b.src,c.srcset=b.srcset,c.loading="lazy",c.decoding="async",c.width=D,c.height=D,c.className="ikr-img",ee(c),c.setAttribute("data-ikr-img-url",k),(function(z){c.onclick=function(){ie(e,z,r)}})(k),v.appendChild(c)}),i.appendChild(v)}var f=_e(e.merchantReply);return f&&i.appendChild(f),i}var Tr={};ve(Tr,{css:()=>yt,meta:()=>bt,render:()=>wt});var Ci=`
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
`;var bt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},yt=Ci;function wt(e,r){var i=be(e),t=i.length>0,n=document.createElement("div");n.className="ikr-review-list"+(t?"":" ikr-review-list--no-media");var o=document.createElement("div");o.className="ikr-review-list-author";var p=document.createElement("span");p.className="ikr-review-stars ikr-review-list-author-stars",p.innerHTML=pe(e.rating,P),o.appendChild(p);var l=document.createElement("span");l.className="ikr-review-list-author-name",l.textContent=e.author||"",o.appendChild(l);var s=document.createElement("span");s.className="ikr-date ikr-review-list-author-date",s.textContent=me(e.createdAt),o.appendChild(s),n.appendChild(o);var m=document.createElement("div");if(m.className="ikr-review-list-content",e.title){var u=document.createElement("div");u.className="ikr-review-list-title",u.textContent=e.title,m.appendChild(u)}var d=(e.comment||"").trim();if(d){var a=document.createElement("div");a.className="ikr-review-list-body ikr-body-clamped",a.textContent=d,m.appendChild(a);var v=document.createElement("span");v.className="ikr-read-more",v.textContent="Devam\u0131n\u0131 oku",v.style.display="none",m.appendChild(v),requestAnimationFrame(function(){if(a.scrollHeight>a.clientHeight+2){v.style.display="inline";var c=!1;v.onclick=function(){c=!c,a.classList.toggle("ikr-body-clamped",!c),v.textContent=c?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var f=_e(e.merchantReply);if(f&&m.appendChild(f),n.appendChild(m),t){var k=document.createElement("div");k.className="ikr-review-list-media",i.forEach(function(c){var b=document.createElement("img"),z=Q(c,D);b.src=z.src,b.srcset=z.srcset,b.loading="lazy",b.decoding="async",b.width=D,b.height=Math.round(D*4/3),b.setAttribute("data-ikr-img-url",c),ee(b),(function(w){b.onclick=function(){ie(e,w,r)}})(c),k.appendChild(b)}),n.appendChild(k)}return n}var Lr={};ve(Lr,{css:()=>zt,meta:()=>xt,render:()=>Ct});var Si=`
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
`;var xt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},zt=Si;function Ct(e,r){var i=Je(e),t=!!i,n=document.createElement("div");n.className="ikr-review-gallery"+(t?"":" ikr-review-gallery--no-media");var o=document.createElement("div");o.className="ikr-review-gallery-content";var p=document.createElement("span");if(p.className="ikr-review-stars ikr-review-gallery-stars",p.innerHTML=pe(e.rating,P),o.appendChild(p),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,o.appendChild(l)}var s=document.createElement("div");s.className="ikr-review-gallery-author",s.textContent=e.author||"",o.appendChild(s);var m=document.createElement("div");m.className="ikr-review-gallery-date",m.textContent=me(e.createdAt),o.appendChild(m);var u=(e.comment||"").trim();if(u){var d=document.createElement("div");d.className="ikr-review-gallery-body ikr-body-clamped",d.textContent=u,o.appendChild(d);var a=document.createElement("span");a.className="ikr-read-more",a.textContent="Devam\u0131n\u0131 oku",a.style.display="none",a.style.cursor="pointer";var v=!1;a.onclick=function(){if(i){ie(e,i,r);return}v=!v,d.classList.toggle("ikr-body-clamped",!v),a.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},o.appendChild(a),requestAnimationFrame(function(){d.scrollHeight>d.clientHeight+2&&(a.style.display="inline")})}if(n.appendChild(o),t){var f=document.createElement("div");f.className="ikr-review-gallery-media";var k=document.createElement("img"),c=Q(i,Ze);k.src=c.src,k.srcset=c.srcset,k.loading="lazy",k.decoding="async",k.width=Ze,k.height=Math.round(Ze*4/3),ee(k),k.setAttribute("data-ikr-img-url",i),k.onclick=function(){ie(e,i,r)},f.appendChild(k),n.appendChild(f)}var b=_e(e.merchantReply,i?function(){ie(e,i,r)}:null);return b&&(b.classList.add("ikr-review-gallery-reply"),n.appendChild(b)),n}var lr={card:Er,list:Tr,gallery:Lr};function We(e){return lr[e]||lr.card}function Ei(){return Object.keys(lr).map(function(e){return lr[e].css||""}).join(`
`)}function Ne(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),n=parseInt(i[2],16),o=parseInt(i[3],16);return"rgba("+t+","+n+","+o+","+r+")"}function St(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(Ur)}catch(t){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var i=document.querySelector("main")||document.body;return i?(i.appendChild(e),e):null}function Et(e,r){var i=e.querySelector('[data-renuvex-slot="product-reviews"],[data-ikr-slot="product-reviews"]');return i||(i=Qe({slot:"product-reviews",legacySlot:"product-reviews",className:"renuvex-pr-reviews-slot ikr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(i)),er(i,{surface:"reviews",productId:r||""}),i}var Ti={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Li={small:80,medium:110,large:140};function Tt(e,r){var i=document.createElement("div");i.className="ikr-state-msg ikr-state-error",i.setAttribute("role","status"),i.setAttribute("aria-live","polite");var t=document.createElement("div");t.className="ikr-state-error-text",t.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",i.appendChild(t);var n=document.createElement("button");return n.type="button",n.className="ikr-state-retry",n.textContent="Tekrar Dene",n.onclick=async function(){n.disabled=!0,n.textContent="Tekrar deneniyor...",await r()},i.appendChild(n),i}function Lt(e,r){var i=r.headerTitleColor||"#111111",t=r.headerAvgColor||"#111111",n=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",p=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",s=r.barCountColor||"#111111",m=Ne(p,.06),u=r.reviewStarColor||"#f59e0b",d=r.btnBgColor||"#111111",a=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",f=r.filterBtnBgColor||"#111111",k=r.filterBtnTextColor||"#ffffff",c=r.filterBtnBorderColor||"#111111",b=r.filterMenuBgColor||"#ffffff",z=r.filterMenuBorderColor||"#e5e7eb",w=r.filterItemTextColor||"#111111",h=r.filterItemHoverBgColor||"#f3f4f6",E=r.filterItemActiveColor||"#111111",x=r.reviewTitleColor||"#111111",y=r.reviewAuthorColor||"#111111",C=r.reviewDateColor||"#5e5e5e",S=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",g=r.replyBgColor||"#f9fafb",L=r.replyBorderColor||"#747474",A=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",I=r.photoTitleColor||"#111111",K=Ne("#111111",.05),U=r.photoArrowBgColor||"#ffffff",ae=r.photoArrowTextColor||"#111111",W=Ne("#111111",.12),_=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Ae=r.formSecondaryTextColor||"#3b3b3b",He=r.inputTextColor||F,O=r.inputBorderColor||"#d1d5db",xe=r.placeholderColor||"#9ca3af",ne=r.formStepBarColor||"#111111",oe=r.formBtnBgColor||"#111111",j=r.formBtnTextColor||"#ffffff",X=r.formBtnBorderColor||"#111111",le=Ne(oe,.06),J=Ne(oe,.18),Oe=Ne(j,.85),fe=Ne(F,.06),Z=r.loadMoreBgColor||"#ffffff",$=r.loadMoreTextColor||"#111111",de=r.loadMoreBorderColor||"#111111",H={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":t,"--ikr-header-count":n,"--ikr-header-recommend":o,"--ikr-bar-fill":p,"--ikr-bar-track":l,"--ikr-bar-count":s,"--ikr-bar-hover-bg":m,"--ikr-btn-bg":d,"--ikr-btn-text":a,"--ikr-btn-border":v,"--ikr-filter-btn-bg":f,"--ikr-filter-btn-text":k,"--ikr-filter-btn-border":c,"--ikr-filter-menu-bg":b,"--ikr-filter-menu-border":z,"--ikr-filter-item-text":w,"--ikr-filter-item-hover-bg":h,"--ikr-filter-item-active":E,"--ikr-review-title":x,"--ikr-review-author":y,"--ikr-review-date":C,"--ikr-review-body":S,"--ikr-review-border":T,"--ikr-review-star-color":u,"--ikr-reply-bg-color":g,"--ikr-reply-border":L,"--ikr-reply-label":A,"--ikr-reply-text":N,"--ikr-photo-title":I,"--ikr-photo-image-border":K,"--ikr-photo-arrow-bg":U,"--ikr-photo-arrow-text":ae,"--ikr-photo-arrow-border":W,"--ikr-fwizard-bg":_,"--ikr-fwizard-text":F,"--ikr-fwizard-secondary-text":Ae,"--ikr-fwizard-input-bg":_,"--ikr-fwizard-input-text":He,"--ikr-fwizard-input-border":O,"--ikr-fwizard-placeholder":xe,"--ikr-fwizard-close-text":F,"--ikr-fwizard-close-hover-bg":fe,"--ikr-fwizard-progress-bg":fe,"--ikr-fwizard-progress-active":ne,"--ikr-fwizard-btn-bg":oe,"--ikr-fwizard-btn-text":j,"--ikr-fwizard-btn-border":X,"--ikr-fwizard-btn-disabled-bg":J,"--ikr-fwizard-btn-disabled-text":Oe,"--ikr-fwizard-nav-hover-bg":le,"--ikr-load-more-bg":Z,"--ikr-load-more-text":$,"--ikr-load-more-border":de};Object.keys(H).forEach(function(se){e.style.setProperty(se,H[se])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function we(e,r,i,t,n,o,p){if(Yr){Xe({productId:e,settings:r,reviewsData:i,productName:t,orderBy:n,page:o,badgeSettings:p});return}Ue(!0),Rr(e),Br(r),p!==void 0&&Ir(p),Mr(t),n&&Re(n),o&&Te(o),i!=null&&Fr(i);try{let dr=function(R,B){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var M=R.meta.sizeOverrides[B];M&&Object.keys(M).forEach(function(Ce){a.style.setProperty(Ce,M[Ce])})}};var Nt=dr,l=or(r.summaryLayout),s=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),m=r.showTitle!==!1,u=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",d=s&&m?u:"",a=document.documentElement;Lt(a,r),Wr("#111111",ni+zi()+Ei());var v=r.borderRadius!==void 0?r.borderRadius:8,f=Ti[r.size]||Ti.medium,k=Li[r.thumbnailSize]||Li.medium,c=We(r.reviewLayout);if(c.meta&&c.meta.sizeOverrides&&c.meta.sizeOverrides[r.size]){var b=c.meta.sizeOverrides[r.size],z=b["--ikr-list-photo-w"]||b["--ikr-gallery-photo-w"];z&&(k=parseInt(z))}a.style.setProperty("--ikr-title-size",f.titleSize+"px"),a.style.setProperty("--ikr-review-text-size",f.reviewTextSize+"px"),a.style.setProperty("--ikr-review-title-size",f.reviewTitleSize+"px"),a.style.setProperty("--ikr-author-size",f.authorSize+"px"),a.style.setProperty("--ikr-reply-name-size",f.replyNameSize+"px"),a.style.setProperty("--ikr-reply-text-size",f.replyTextSize+"px"),a.style.setProperty("--ikr-radius",v+"px"),a.style.setProperty("--ikr-radius-sm",Math.max(0,v-4)+"px"),a.style.setProperty("--ikr-photo-title-size",f.photoTitleSize+"px"),a.style.setProperty("--ikr-avg-rating-size",f.avgRatingSize+"px"),a.style.setProperty("--ikr-review-count-size",f.reviewCountSize+"px"),a.style.setProperty("--ikr-compact-count-size",f.compactCountSize+"px"),a.style.setProperty("--ikr-recommend-size",f.recommendSize+"px"),a.style.setProperty("--ikr-btn-text-size",f.btnTextSize+"px"),a.style.setProperty("--ikr-bar-label-size",f.barLabelSize+"px"),a.style.setProperty("--ikr-minimal-avg-size",f.minimalAvgSize+"px"),a.style.setProperty("--ikr-hero-avg-size",f.heroAvgSize+"px"),a.style.setProperty("--ikr-bar-count-size",f.barCountSize+"px"),a.style.setProperty("--ikr-review-date-size",f.reviewDateSize+"px"),a.style.setProperty("--ikr-filter-text-size",f.filterTextSize+"px"),a.style.setProperty("--ikr-load-more-size",f.loadMoreSize+"px"),a.style.setProperty("--ikr-read-more-size",f.readMoreSize+"px"),a.style.setProperty("--ikr-thumbnail-size",k+"px");var w=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";a.style.setProperty("--ikr-review-star-color",w),a.style.setProperty("--ikr-star-size",f.reviewStarSize+"px"),a.style.setProperty("--ikr-avg-star-size",f.avgStarSize+"px"),dr(or(r.summaryLayout),r.size),dr(We(r.reviewLayout),r.size);var h=je(r),E=St();if(!E)return;var x=Et(E,e),y=document.getElementById("ikas-reviews");if(y||(y=document.createElement("div"),y.id="ikas-reviews",y.style.minHeight="200px"),y.parentNode!==x&&x.appendChild(y),r.enabled===!1){y.style.minHeight="auto",y.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ue(!1);var C=Ke;Xe(null),C&&we(C.productId,C.settings,C.reviewsData,C.productName,C.orderBy,C.page,C.badgeSettings);return}y.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var S=i||{},T=vr(S),g=T?[]:S.data&&S.data.reviews||[],L=T?0:S.data&&S.data.totalCount||0;Hr(g);var A=y.cloneNode(!1);y.parentNode.replaceChild(A,y),y=A;var N=document.createElement("div");if(N.id="ikas-reviews-widget",N.className="renuvex-pr-reviews-widget",N.setAttribute("data-renuvex-surface","reviews"),N.setAttribute("data-ikr-surface","reviews"),e&&(N.setAttribute("data-renuvex-product-id",String(e)),N.setAttribute("data-ikr-product-id",String(e))),typeof window!="undefined"&&window.__ikasPreviewMode&&(N.style.width="100%",N.style.maxWidth="100%",N.style.marginLeft="0",N.style.marginRight="0"),d){var I=document.createElement("div"),K=r.summaryLayout||"classic";I.className="ikr-title ikr-title-"+K,I.textContent=d,N.appendChild(I)}if(T){N.appendChild(Tt(S.message,async function(){var R=await Le(G,ce,1,Se,Ee);await we(G,P,R,Pe,ce,1,sr)})),y.appendChild(N),Ye(N,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var U=S.data&&S.data.allCount||0,ae=S.data&&S.data.ratingCounts||null,W=ae||[0,0,0,0,0],_=S.data&&S.data.avgRating||"0.0";if(!ae&&g.length>0){g.forEach(function(R){R.rating>=1&&R.rating<=5&&W[R.rating-1]++});var F=g.reduce(function(R,B){return R+B.rating},0);_=(F/g.length).toFixed(1)}if(U>0){var Ae=or(r.summaryLayout),He=Ae.render({widget:N,data:S,settings:r,iconPair:h,allCount:U,ratingCounts:W,avgRatingVal:_,currentRatingFilter:Se,currentOrderBy:ce,currentHasImages:Ee,onFilterChange:async function(R){qe(Se===R?null:R),Te(1);var B=await Le(G,ce,1,Se,Ee);await we(G,P,B,Pe,ce,1)},onSortChange:async function(R,B){Te(1),B?(pr(!0),Re("newest")):(pr(!1),Re(R));var M=await Le(G,ce,1,Se,Ee);await we(G,P,M,Pe,ce,1)}});N.appendChild(He)}else{var O=document.createElement("button");O.className="ikr-write-btn",O.style.cssText="display:block;margin:16px auto 0;",O.textContent=r.writeButtonText||"Yorum Yap",O.onclick=Y,N.appendChild(O)}var xe=(Pr||[]).filter(function(R){return be(R).length>0});if(r.showPhotoGallery!==!1&&!Ee&&xe.length>0){var ne=document.createElement("div");if(ne.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var oe=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",j=document.createElement("div");j.className="ikr-photo-title",j.textContent=oe,ne.appendChild(j)}var X=r.reviewLayout==="card"?"1/1":"3/4";a.style.setProperty("--ikr-photo-thumb-aspect",X);var le=document.createElement("div");le.className="ikr-photo-strip";var J=D,Oe=r.reviewLayout==="card"?D:Math.round(D*4/3),fe=0;xe.forEach(function(R){if(!(fe>=15)){var B=Je(R);if(B){var M=document.createElement("img"),Ce=Q(B,D);M.src=Ce.src,M.srcset=Ce.srcset,M.loading=fe<3?"eager":"lazy",M.decoding="async",M.width=J,M.height=Oe,M.className="ikr-photo-strip-thumb",M.alt="Yorum foto\u011Fraf\u0131",ee(M),(function(Ni,Ai){M.onclick=function(){ie(Ai,Ni,xe)}})(B,R),le.appendChild(M),fe++}}});var Z=document.createElement("button");Z.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",Z.innerHTML="&#8249;",Z.setAttribute("aria-label","\xD6nceki"),Z.onclick=function(){le.scrollBy({left:-200,behavior:"smooth"})};var $=document.createElement("button");$.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",$.innerHTML="&#8250;",$.setAttribute("aria-label","Sonraki"),$.onclick=function(){le.scrollBy({left:200,behavior:"smooth"})};var de=document.createElement("div");de.className="ikr-photo-strip-wrap",de.appendChild(Z),de.appendChild(le),de.appendChild($),ne.appendChild(de),N.appendChild(ne)}if(g.length===0){var H=document.createElement("p");H.className="ikr-state-msg",H.textContent="Hen\xFCz yorum yok.",N.appendChild(H)}else{var c=We(r.reviewLayout);g.forEach(function(B){N.appendChild(c.render(B,cr))})}var se=S.data&&S.data.hasMore;if(se){var V=document.createElement("button");V.className="ikr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var R=Ar+1,B=await Le(G,ce,R,Se,Ee);if(B&&!vr(B)&&B.data&&Array.isArray(B.data.reviews)){Or(B.data.reviews),Te(R);var M=We(P.reviewLayout);B.data.reviews.forEach(function(Ce){N.insertBefore(M.render(Ce,cr),V)}),B.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},N.appendChild(V)}y.appendChild(N),Ye(N,"reviews-widget",{productId:e||""}),hr(U>0?_:null,L,t,sr,h,G)}catch(R){console.error("[ikr] render error:",R),y.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ue(!1),Ke){var ze=Ke;Xe(null),we(ze.productId,ze.settings,ze.reviewsData,ze.productName,ze.orderBy,ze.page,ze.badgeSettings)}}}export{we as a,rr as b,vr as c,Le as d,Bi as e,Ft as f};
