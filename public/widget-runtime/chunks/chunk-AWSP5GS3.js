/* ikas Reviews Widget ESM runtime | theme: default */
import{b as Ge}from"./chunk-Z7432DLE.js";import{a as ye,b as $r,c as Qe,d as er,e as Qr,f as Ve,g as ei}from"./chunk-HBNFSQZ6.js";import{$ as $e,A as _r,B as Yr,C as Dr,D as jr,E as Vr,F as Ke,G as Ue,H as Xe,N as De,O as Wr,Q as Gr,R as pe,S as he,T as qr,U as me,V as Kr,W as Ur,X as be,Y as Je,Z as j,_ as Ze,a as ve,aa as ur,b as ke,ba as fr,c as ge,ca as ee,da as Xr,e as Ar,ea as re,f as _e,fa as Jr,g as Pr,ga as je,h as Ce,ha as Zr,i as Rr,j as Ne,k as Ae,l as q,m as P,n as pr,o as Pe,q as mr,r as Br,s as Ye,t as Se,u as qe,v as Ir,w as Mr,x as Fr,y as Or,z as Hr}from"./chunk-RH2PQYGJ.js";var Ii=15,Mi=60*1e3,ri="__ikrReviewsFetchError",vr={};function rr(e){return{type:ri,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function kr(e){return!!(e&&e.type===ri)}async function Ee(e,r,i,t,a,o){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||ge,l=s+"/api/preview/reviews?page="+encodeURIComponent(i||1),c=await ye(l);if(c.ok)return await c.json()}catch(y){}return rr()}r=r||"newest",i=i||1;var u=o?"_l"+o:"",k="ikr_reviews_"+ke+"_"+e+"_"+r+"_"+i+"_"+(t||"")+"_"+(a?"1":"0")+u,p=null,n=Jr(k);if(n)try{var v=JSON.parse(n);if(v&&v.t!==void 0&&v.v){if(Date.now()-v.t<Mi)return v.v;p=v.v,je(k,"")}else je(k,"")}catch(y){je(k,"")}try{var d=ge+"/api/public/reviews?storeId="+encodeURIComponent(ke)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(t?"&rating="+encodeURIComponent(t):"")+(a?"&hasImages=true":"")+(o?"&limit="+encodeURIComponent(o):""),m=await ye(d);if(!m.ok)return p||rr();var f=await m.json();return je(k,JSON.stringify({t:Date.now(),v:f})),f}catch(y){return console.error("[ikr] fetchReviews error:",y),p||rr()}}async function Fi(e){var r=await Ee(e,"newest",1,null,!0,Ii);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Yt(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var t=document.getElementById("ikr-jsonld");if(t&&t.remove(),!vr[e]){vr[e]=!0;var a={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},o={enabled:!0,size:"medium"};try{var s=await $r();if(!s)return;var l=s.widgets&&s.widgets.reviews||a,c=s.widgets&&s.widgets.badge||o;if(l.enabled===!1)return;Ye("newest"),Se(1),qe(null);var u=await Promise.all([Ee(e,"newest",1,null),Fi(e)]),k=u[0];Yr(u[1]),await we(e,l,k,r,"newest",1,c)}catch(p){console.error("[ikr] bootstrap error:",p),await we(e,a,rr(),r,void 0,void 0,o)}finally{delete vr[e]}}}function Re(e){return be(e)}function Oi(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ie(e,r,i,t){i?e.setProperty(r,i,t||""):e.removeProperty(r)}function Hi(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",i=navigator.maxTouchPoints||0,t=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&i>1;return t&&/AppleWebKit/i.test(r)}function _i(){var e=Oi(),r=document.body.style,i=document.documentElement.style,t=Math.max(0,window.innerWidth-document.documentElement.clientWidth),a=window.getComputedStyle(document.body).position==="fixed",o=Hi()&&!a;if(t>0){var s=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",s+t+"px","important")}return i.setProperty("overflow","hidden","important"),i.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Yi(e){if(e){var r=document.body.style,i=document.documentElement.style;ie(i,"overflow",e.rootOverflow,e.rootOverflowPriority),ie(i,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ie(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ie(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ie(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ie(r,"position",e.bodyPosition,e.bodyPositionPriority),ie(r,"top",e.bodyTop,e.bodyTopPriority),ie(r,"left",e.bodyLeft,e.bodyLeftPriority),ie(r,"right",e.bodyRight,e.bodyRightPriority),ie(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Di(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Be(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(i){}}}function ji(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function ti(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(ji)}function ai(e){var r=ti(e),i=r[0]||e.querySelector('[role="dialog"]')||e;Be(i)}function Vi(e,r){if(e.key==="Tab"){var i=ti(r);if(!i.length){e.preventDefault(),ai(r);return}var t=i[0],a=i[i.length-1],o=document.activeElement;if(!r.contains(o)){e.preventDefault(),Be(t);return}e.shiftKey&&o===t?(e.preventDefault(),Be(a)):!e.shiftKey&&o===a&&(e.preventDefault(),Be(t))}}function Wi(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function Gi(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function qi(e){if(Gi(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function ii(e,r,i,t,a){Yi(t),document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e),Be(a)}function Ki(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var t=document.createElement("div");t.className="ikr-modal-top-row";var a=document.createElement("div");a.className="ikr-modal-stars",a.innerHTML=pe(e.rating,P);var o=document.createElement("span");o.className="ikr-modal-date",o.textContent=me(e.createdAt),t.appendChild(a),t.appendChild(o),i.appendChild(t);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var c=document.createElement("div");c.className="ikr-modal-body",c.textContent=(e.comment||"").trim(),c.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(c);var u=document.createElement("div");u.className="ikr-modal-reply";var k=document.createElement("div");k.className="ikr-modal-reply-label",k.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",u.appendChild(k),u.appendChild(p),u.style.display=e.merchantReply?"":"none",i.appendChild(u),r.appendChild(i),r}function ni(e,r,i){var t=i||P,a=e.querySelector(".ikr-modal-scroll-content"),o=a.querySelector(".ikr-modal-stars");o.innerHTML=pe(r.rating,t),a.querySelector(".ikr-modal-date").textContent=me(r.createdAt);var s=a.querySelector(".ikr-modal-title");s.textContent=r.title||"",s.style.display=r.title?"":"none",a.querySelector(".ikr-modal-author").textContent=r.author||"";var l=a.querySelector(".ikr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var c=a.querySelector(".ikr-modal-reply");c.querySelector(".ikr-modal-reply-label").textContent=t&&t.merchantReplyLabel||"Ma\u011Faza Sahibi",c.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",c.style.display=r.merchantReply?"":"none",e.scrollTop=0}function hr(e,r,i,t,a,o,s,l,c){var u=Re(e),k=Math.max(0,Math.min(i||0,u.length-1)),p=document.createElement("div");p.className="ikr-modal-left";var n=document.createElement("img"),v=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";n.className="ikr-modal-main-img"+(v?" "+v:""),n.src=fr(u[k]||""),n.decoding="async",n.width=ur,n.height=Math.round(ur*4/3),n.alt="Yorum foto\u011Fraf\u0131",Xr(n,function(S){if(S.style.display="none",!p.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",p.insertBefore(T,S)}}),p.appendChild(n);var d=document.createElement("button");d.className="ikr-modal-close-mobile",d.textContent="\u2715",d.setAttribute("aria-label","Kapat"),d.onclick=function(S){S.stopPropagation(),o()},p.appendChild(d);var m=0;if(p.addEventListener("touchstart",function(S){m=S.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(S){var T=m-S.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(z)ue(e,r,k+1,t,a,o,!0,"next",l,c);else if(g){var b=t[r+1];ue(b,r+1,0,t,a,o,!1,"next",l,c)}}else if(y)ue(e,r,k-1,t,a,o,!0,"prev",l,c);else if(x){var L=t[r-1],A=Re(L);ue(L,r-1,A.length-1,t,a,o,!1,"prev",l,c)}}},{passive:!0}),u.length>1){var f=document.createElement("div");f.className="ikr-modal-thumbs",u.forEach(function(S,T){var b=document.createElement("img"),L=ee(S,$e);b.src=L.src,b.srcset=L.srcset,b.loading="lazy",b.decoding="async",b.width=$e,b.height=$e,b.className="ikr-modal-thumb"+(T===k?" ikr-modal-thumb-active":""),b.alt="K\xFC\xE7\xFCk resim "+(T+1),re(b),b.tabIndex=0,b.setAttribute("role","button"),b.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===k&&b.setAttribute("aria-current","true"),(function(A){function N(){ue(e,r,A,t,a,o,!0,null,l,c)}b.onclick=N,b.onkeydown=function(M){(M.key==="Enter"||M.key===" ")&&(M.preventDefault(),N())}})(T),f.appendChild(b)}),p.appendChild(f)}var y=k>0,z=k<u.length-1,x=r>0,g=r<t.length-1,E=y||x,w=z||g;if(E){var h=document.createElement("button");h.className="ikr-modal-nav ikr-modal-nav-prev",h.innerHTML="&#8249;",h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(S){if(S.stopPropagation(),y)ue(e,r,k-1,t,a,o,!0,"prev",l,c);else if(x){var T=t[r-1],b=Re(T);ue(T,r-1,b.length-1,t,a,o,!1,"prev",l,c)}},p.appendChild(h)}if(w){var C=document.createElement("button");C.className="ikr-modal-nav ikr-modal-nav-next",C.innerHTML="&#8250;",C.setAttribute("aria-label","Sonraki"),C.onclick=function(S){if(S.stopPropagation(),z)ue(e,r,k+1,t,a,o,!0,"next",l,c);else if(g){var T=t[r+1];ue(T,r+1,0,t,a,o,!1,"next",l,c)}},p.appendChild(C)}return p}function oi(e,r){[-1,1].forEach(function(i){var t=r[e+i];if(t){var a=Re(t);a[0]&&(new Image().src=fr(a[0]))}})}function gr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function Ui(e,r){var i=e&&e.querySelector(".ikr-modal-wrap"),t=r&&r.querySelector(".ikr-modal-right"),a=r&&r.querySelector(".ikr-modal-scroll-content");function o(){gr(i),gr(t),gr(a)}o(),i&&Be(i),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ue(e,r,i,t,a,o,s,l,c,u){if(u&&(u.currentReview=e),s){var k=hr(e,r,i,t,a,o,l,c,u);a.firstChild&&a.replaceChild(k,a.firstChild)}else{var k=hr(e,r,i,t,a,o,l,c,u),p=a.querySelector(".ikr-modal-right");a.firstChild&&a.replaceChild(k,a.firstChild),p&&ni(p,e,u&&u.currentSettings),Ui(c,a)}oi(r,t)}function te(e,r,i){var t=Re(e);if(!t.length)return;var a=(i||[]).filter(function(g){return Re(g).length>0}),o=a.findIndex(function(g){return g===e||g.id===e.id});o===-1&&(a.unshift(e),o=0);var s=t.indexOf(r);s<0&&(s=0);var l=document.createElement("div");l.className="ikr-modal-overlay";var c=document.createElement("div");c.className="ikr-modal";var u=!1,k=Di(),p=_i(),n=Wi(),v={currentReview:e,currentSettings:P};function d(g){var E=g&&g.detail&&g.detail.settings;v.currentSettings=E||P;var w=c.querySelector(".ikr-modal-right");!w||!v.currentReview||ni(w,v.currentReview,v.currentSettings)}function m(){u||(u=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),ii(l,f,m,p,k))}function f(g){if(g.key==="Escape"){y();return}Vi(g,l)}function y(){u||(u=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),ii(l,f,m,p,k),qi(n))}document.addEventListener("keydown",f),window.addEventListener("popstate",m),window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),l.onclick=function(){y()},c.onclick=function(g){g.stopPropagation()},c.appendChild(hr(e,o,s,a,c,y,null,l,v)),c.appendChild(Ki(e)),oi(o,a);var z=document.createElement("div");z.className="ikr-modal-wrap",z.tabIndex=-1,z.setAttribute("role","dialog"),z.setAttribute("aria-modal","true"),z.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),z.appendChild(c);var x=document.createElement("button");x.className="ikr-modal-close",x.textContent="\u2715",x.setAttribute("aria-label","Kapat"),x.onclick=function(g){g.stopPropagation(),y()},z.appendChild(x),l.appendChild(z),document.body.appendChild(l),ai(l)}function li(e){if(e)for(var r=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),i=0;i<r.length;i++){var t=r[i];if(t.children.length===0&&t.textContent.trim()===e&&t.tagName!=="TITLE"&&!t.closest("[data-ikr-listing-badge]")&&!t.closest("#ikas-reviews")&&!t.closest("nav")&&!t.closest("header")&&!t.closest('[class*="breadcrumb"]')&&!t.closest('[aria-label*="breadcrumb"]'))return t}return document.querySelector("h1")}var ir=null,tr=null;function Xi(e,r){return he(e,r)}function di(e,r){if(!e||!r||!r.parentNode)return!1;var i=r.parentNode;return e.parentNode!==i||r.nextSibling!==e?(i.insertBefore(e,r.nextSibling),!0):!1}function Ji(e,r,i){if(typeof MutationObserver=="undefined"||!e||!r||!r.parentNode)return null;var t=r.parentNode,a=0,o=!1,s=new MutationObserver(function(){if(!e.isConnected||!r.isConnected||e.parentNode!==t||r.parentNode!==t){s.disconnect();return}r.nextSibling!==e&&(a+=1,di(e,r),o||(o=!0,Ar("dom-conflict","PDP badge slot reordered after render",Object.assign({surface:"pdp-badge",reason:"position_reanchored"},i||{}))),a>=3&&s.disconnect())});return s.observe(t,{childList:!0}),setTimeout(function(){s.disconnect()},15e3),s}function br(e,r,i,t,a,o,s){ir&&(ir.disconnect(),ir=null),tr&&(tr.disconnect(),tr=null),Qr("product-title-rating","product-title-badge");var l=document.getElementById("ikr-rating-badge");if(l&&l.remove(),!!e&&!(t&&t.enabled===!1)){var c=document.getElementById("ikr-jsonld");c&&c.remove();var u=document.createElement("script");u.id="ikr-jsonld",u.type="application/ld+json",u.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(u);var k=li(i);if(!(!k||!k.parentNode)){var p=t&&t.size||"medium",n=Ve[p]||Ve.medium,v=null;if(t&&t.mobileOverride===!0){var d=t.mobileSize||"small";v=Ve[d]||Ve.small}ei(n,v);var m=Qe({slot:"product-title-rating",legacySlot:"product-title-badge",className:"renuvex-pr-product-badge-slot ikr-product-badge-slot",context:{surface:"pdp",productId:o||""}}),f=document.createElement("a");f.id="ikr-rating-badge",f.className="renuvex-pr-rating-badge ikr-rating-badge ikr-rating-badge--pdp",f.href="#ikas-reviews",f.setAttribute("role","figure"),f.setAttribute("aria-label",e+" \xFCzerinden 5 y\u0131ld\u0131z, "+r+" yorum"),f.setAttribute("data-ikr-surface","pdp"),f.setAttribute("data-renuvex-surface","pdp"),f.setAttribute("data-ikr-rating",String(e)),f.setAttribute("data-renuvex-rating",String(e)),f.setAttribute("data-ikr-count",String(r)),f.setAttribute("data-renuvex-count",String(r)),er(f,{surface:"pdp",productId:o||""});var y=window.getComputedStyle(k).textAlign,z=y==="center"?"center":y==="right"?"flex-end":"flex-start";f.style.cssText="justify-content:"+z+";",f.insertAdjacentHTML("beforeend",Xi(e,a));var x=document.createElement("span");x.className="ikr-rating-badge__label",x.textContent=e+" ("+r+" yorum)",f.appendChild(x),f.onclick=function(g){g.preventDefault();var E=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(E){var w=document.querySelector("header"),h=w?w.getBoundingClientRect().height:0,C=E.getBoundingClientRect().top+window.pageYOffset-h-16;window.scrollTo({top:C,behavior:"smooth"})}},m.appendChild(f),di(m,k),tr=Ji(m,k,{productName:i||"",productId:o||""}),_e(m,"pdp-badge",{productName:i||"",productId:o||""}),s||(ir=Pr(m,"pdp-badge",function(){br(e,r,i,t,a,o,!0)},{productName:i||"",productId:o||""}))}}}var si=`
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

${qr}

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
`;var xr={};ve(xr,{meta:()=>ot,render:()=>lt});function Ie(e){var r=e.ratingCounts,i=e.allCount,t=e.iconPair,a=e.currentRatingFilter,o=e.onFilterChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var c=r[l-1]||0,u=i>0?Math.round(c/i*100):0,k=a===l,p=document.createElement("div");p.className="ikr-bar-row"+(k?" ikr-bar-active":""),a&&!k&&(p.style.opacity="0.35");for(var n="",v=1;v<=5;v++){var d=v<=l;n+='<span class="ikr-bar-star ikr-icon '+(d?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+(d?t.filled:t.empty)+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+n+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+u+'%;"></div></div><span class="ikr-bar-count">('+c.toLocaleString("tr-TR")+")</span>",(function(m){p.onclick=function(){o(m)}})(l),s.appendChild(p)}return s}var ae=[],ci=!1;function Zi(e){for(var r=ae.length-1;r>=0;r--){var i=ae[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function $i(e){if(e.key==="Escape")for(var r=ae.length-1;r>=0;r--)ae[r].close()}function Qi(){ci||typeof document=="undefined"||(document.addEventListener("click",Zi,!0),document.addEventListener("keydown",$i),ci=!0)}function ar(e){for(var r=0;r<ae.length;r++)ae[r]!==e&&ae[r].close()}function nr(e){Qi();var r={trigger:e.trigger,element:e.element,close:e.close};return ae.push(r),function(){var t=ae.indexOf(r);t!==-1&&ae.splice(t,1)}}function K(e){var r=e.widget,i=e.currentOrderBy,t=e.currentHasImages,a=e.onWriteClick,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent=P&&P.writeButtonText||"Yorum Yap",l.onclick=a,s.appendChild(l);var c=document.createElement("div");c.className="ikr-filter-wrap";var u=document.createElement("button");u.type="button",u.className="ikr-filter-btn",u.setAttribute("aria-label","Filtrele"),u.setAttribute("aria-haspopup","menu"),u.setAttribute("aria-expanded","false");var k=P&&P.filterIcon||"lines";u.innerHTML=Wr(k);var p=document.createElement("div");p.className="ikr-filter-menu",p.setAttribute("role","menu");var n=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],v=!1;function d(y){var z=p.classList.contains("ikr-open");p.classList.remove("ikr-open"),u.classList.remove("ikr-filter-btn-active"),u.setAttribute("aria-expanded","false");var x=y&&(y.restoreFocus===!0||y.restoreFocus==="auto"&&Ge());if(z&&x)try{u.focus({preventScroll:!0})}catch(g){try{u.focus()}catch(E){}}}function m(){ar(f),p.classList.add("ikr-open"),u.classList.add("ikr-filter-btn-active"),u.setAttribute("aria-expanded","true");var y=p.querySelector(".ikr-filter-item-active")||p.querySelector(".ikr-filter-item");y&&requestAnimationFrame(function(){try{y.focus({preventScroll:!0})}catch(z){try{y.focus()}catch(x){}}})}n.forEach(function(y){var z=y[2],x=z?t:!t&&(i||"newest")===y[0],g=document.createElement("button");g.type="button",g.className="ikr-filter-item"+(x?" ikr-filter-item-active":""),g.setAttribute("role","menuitem"),g.textContent=y[1];var E=!1;function w(h,C){h&&(h.preventDefault(),h.stopPropagation()),!E&&(E=!0,v=!0,d({restoreFocus:C}),o(y[0],z),setTimeout(function(){E=!1,v=!1},0))}g.addEventListener("pointerdown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),typeof window!="undefined"&&!window.PointerEvent&&g.addEventListener("touchstart",function(h){w(h,!1)},{passive:!1}),g.addEventListener("mousedown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),g.addEventListener("keydown",function(h){(h.key==="Enter"||h.key===" ")&&w(h,!0)}),g.onclick=function(h){w(h,!1)},p.appendChild(g)}),u.onclick=function(){p.classList.contains("ikr-open")?d({restoreFocus:"auto"}):m()},c.addEventListener("keydown",function(y){y.key==="Escape"&&p.classList.contains("ikr-open")&&(y.stopPropagation(),d({restoreFocus:!0}))}),c.addEventListener("focusout",function(y){if(p.classList.contains("ikr-open")&&!v){var z=y.relatedTarget;z&&c.contains(z)||d()}});var f=nr({trigger:c,element:p,close:d});return c.appendChild(u),c.appendChild(p),s.appendChild(c),s}function pi(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,t=document.createElement("div");t.className="ikr-fwizard-overlay",t.tabIndex=-1,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-label","Yorum yapma formu");var a=document.createElement("div");a.className="ikr-fwizard",t.appendChild(a);var o=document.createElement("button");o.className="ikr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat"),o.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',a.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-content",a.appendChild(s);var l=!1,c=null,u=!1,k="",p="";function n(){var b=document.activeElement;return!b||b===document.body||b===document.documentElement?null:b}function v(b){if(!(!b||!document.contains(b)||typeof b.focus!="function"))try{b.focus({preventScroll:!0})}catch(L){try{b.focus()}catch(A){}}}function d(b){if(!b||b.disabled||b.getAttribute("aria-hidden")==="true")return!1;var L=window.getComputedStyle?window.getComputedStyle(b):null;return L&&(L.display==="none"||L.visibility==="hidden")?!1:!!(b.offsetWidth||b.offsetHeight||b.getClientRects().length)}function m(b){var L=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(b.querySelectorAll(L)).filter(d)}function f(){var b=m(s),L=m(t),A=b[0]||L[0]||t;v(A)}function y(b){if(b.key==="Tab"){var L=m(t);if(!L.length){b.preventDefault(),v(t);return}var A=L[0],N=L[L.length-1],M=document.activeElement;if(!t.contains(M)){b.preventDefault(),v(A);return}b.shiftKey&&M===A?(b.preventDefault(),v(N)):!b.shiftKey&&M===N&&(b.preventDefault(),v(A))}}function z(){var b=window.innerWidth-document.documentElement.clientWidth;k=document.body.style.overflow,p=document.body.style.paddingRight,document.body.style.overflow="hidden",b>0&&(document.body.style.paddingRight=b+"px")}function x(){document.body.style.overflow=k,document.body.style.paddingRight=p}function g(){l||(l=!0,document.removeEventListener("keydown",E),t.removeEventListener("click",w),o.removeEventListener("click",g),t.classList.remove("ikr-fwizard-open"),setTimeout(function(){t.parentNode&&t.parentNode.removeChild(t),x(),u&&v(c);try{r()}catch(b){}},200))}function E(b){if(b.key==="Escape"){g();return}y(b)}function w(b){b.target===t&&i&&g()}document.addEventListener("keydown",E),t.addEventListener("click",w),o.addEventListener("click",g);function h(b){c=n(),u=Ge(),b&&s.appendChild(b),document.body.appendChild(t),z(),requestAnimationFrame(function(){t.classList.add("ikr-fwizard-open"),f()})}var C=null,S=null;function T(b,L){if(L=L||"error",C){try{C.remove()}catch(A){}C=null}S&&(clearTimeout(S),S=null),C=document.createElement("div"),C.className="ikr-fwizard-toast ikr-fwizard-toast--"+L,C.textContent=b,a.appendChild(C),S=setTimeout(function(){C&&(C.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(C){try{C.remove()}catch(A){}C=null}},300))},4e3)}return{open:h,close:g,content:s,setAllowOutsideClose:function(b){i=!!b},setStepAttr:function(b){a.setAttribute("data-step",String(b))},focusFirstControl:f,showToast:T}}var mi=`
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
`;var yr=4;function Me(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function ui(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function t(){r.forEach(function(a){try{a(i)}catch(o){}})}return{get:function(){return i},set:function(a){Object.assign(i,a),t()},goNext:function(){i.currentStep<yr&&(i.currentStep+=1,t())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,t())},onChange:function(a){return r.push(a),function(){r=r.filter(function(o){return o!==a})}}}}var et='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function fi(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],t=e.onBack||function(){},a=e.onSkip||function(){},o=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=et+"<span>Geri</span>",l.addEventListener("click",function(){t()}),s.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-footer-progress";for(var u=[],k=0;k<yr;k++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",c.appendChild(p),u.push(p)}s.appendChild(c);var n=document.createElement("button");n.type="button";var v=null;function d(f){v&&n.removeEventListener("click",v),v=f,f&&n.addEventListener("click",f)}s.appendChild(n);function m(f,y){var z=r.indexOf(f)!==-1,x=i.indexOf(f)!==-1,g=y&&(y.images&&y.images.length>0||y.pendingImages&&y.pendingImages.length>0);if(z)f===2&&g?(n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",d(function(){o()})):(n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.setAttribute("aria-label","Atla"),n.innerHTML="<span>Atla</span>",d(function(){a()})),n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),n.style.visibility="",n.tabIndex=0;else if(x){n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Sonraki"),n.innerHTML="Sonraki",n.style.visibility="",n.tabIndex=0;var E=Me(f,y);n.disabled=!E,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!E),d(function(){n.disabled||o()})}else n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.innerHTML="",n.style.visibility="hidden",n.tabIndex=-1,n.disabled=!0,d(null)}return{el:s,update:function(f,y){u.forEach(function(x,g){g+1<=f?x.classList.add("ikr-fwizard-progress-seg-active"):x.classList.remove("ikr-fwizard-progress-seg-active")});var z=f<=1;l.style.visibility=z?"hidden":"",l.style.pointerEvents=z?"none":"",l.tabIndex=z?-1:0,m(f,y)},setNextDisabled:function(f){n.classList.contains("ikr-fwizard-cta-btn")&&(n.disabled=!!f,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!!f))},setThanksState:function(f){l.style.visibility="hidden",c.style.visibility="hidden",n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",n.style.visibility="",n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),d(f)}}}function vi(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var t=!1,a=null,o=document.createElement("div");o.className="ikr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-stars",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=De(P||{}),c=[];function u(v){c.forEach(function(d,m){var f=m<v;d.classList.toggle("ikr-fwizard-star-active",f),d.setAttribute("aria-checked",m+1===v?"true":"false"),d.innerHTML=f?l.filled:l.empty})}function k(v,d){d&&typeof d.preventDefault=="function"&&d.preventDefault(),d&&typeof d.stopPropagation=="function"&&d.stopPropagation(),!t&&(t=!0,e.set({rating:v}),u(v),a&&clearTimeout(a),a=setTimeout(function(){e.goNext()},280))}for(var p=1;p<=5;p++)(function(v){var d=document.createElement("button");d.type="button",d.className="ikr-fwizard-star",d.setAttribute("role","radio"),d.setAttribute("aria-label",v+" y\u0131ld\u0131z"),d.innerHTML=l.empty,d.addEventListener("mouseenter",function(){u(v)}),d.addEventListener("mouseleave",function(){u(e.get().rating)}),d.addEventListener("pointerdown",function(m){m.button&&m.button!==0||k(v,m)}),typeof window!="undefined"&&!window.PointerEvent&&d.addEventListener("touchstart",function(m){k(v,m)},{passive:!1}),d.addEventListener("mousedown",function(m){window.PointerEvent||k(v,m)}),d.addEventListener("keydown",function(m){(m.key==="Enter"||m.key===" ")&&k(v,m)}),d.addEventListener("click",function(m){k(v,m)}),c.push(d),s.appendChild(d)})(p);u(e.get().rating);var n=function(v){var d=v&&v.detail&&v.detail.settings;l=De(d||P||{}),u(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",n),i.appendChild(s),{el:i,destroy:function(){a&&clearTimeout(a),window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",n)}}}var ki=3,rt=10*1024*1024;function gi(e,r){r=r||{};var i=!1,t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-photos";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",t.appendChild(a);var o=document.createElement("div");o.className="ikr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",t.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Foto\u011Fraf Ekle</span>';var c=document.createElement("input");c.type="file",c.accept="image/*",c.multiple=!0,c.style.display="none",s.appendChild(l),s.appendChild(c);var u=document.createElement("div");u.className="ikr-fwizard-photo-previews",u.setAttribute("aria-live","polite"),s.appendChild(u),t.appendChild(s);var k=r.blobMap||{},p=r.urlToFinger||{};function n(){if(!i){var x=e.get().images||[],g=e.get().pendingImages||[],E=x.map(function(w){return{url:w,isPending:!1}}).concat(g.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));u.innerHTML="",E.forEach(function(w){var h=k[w.url]||w.url,C=v(w,h);u.appendChild(C)}),y()}}function v(x,g){var E=document.createElement("div");E.className="ikr-fwizard-photo-thumb";var w=document.createElement("img");w.src=g,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",E.appendChild(w);var h=document.createElement("div");h.className="ikr-fwizard-photo-loading",h.style.display="none",E.appendChild(h);var C=document.createElement("button");return C.type="button",C.className="ikr-fwizard-photo-remove",C.innerHTML="&#x2715;",E.appendChild(C),d(E,x,g),E}function d(x,g,E){var w=x.querySelector("img");w.src!==E&&(w.src=E);var h=x.querySelector(".ikr-fwizard-photo-loading");g.isPending&&g.error?(h.style.display="flex",h.innerHTML='<span class="ikr-upload-error">\u2717 '+g.error+"</span>"):h.style.display="none";var C=x.querySelector(".ikr-fwizard-photo-remove");C.onclick=function(){var S=p[g.url]||(g.file?g.file.name+"_"+g.file.size:null);if(g.url.startsWith("blob:")&&URL.revokeObjectURL(g.url),S){var T=(e.get().fingerprints||[]).filter(function(A){return A!==S});e.set({fingerprints:T})}if(g.isPending){var b=(e.get().pendingImages||[]).filter(function(A){return A.url!==g.url});e.set({pendingImages:b})}else{var L=(e.get().images||[]).filter(function(A){return A!==g.url});e.set({images:L})}}}var m='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',f='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function y(){var x=(e.get().images||[]).length,g=(e.get().pendingImages||[]).length,E=x+g,w=E>=ki;E>0?(s.classList.add("ikr-fwizard-photo-card--compact"),l.innerHTML=f):(s.classList.remove("ikr-fwizard-photo-card--compact"),l.innerHTML=m+"<span>Foto\u011Fraf Ekle</span>"),w?(l.style.display="none",l.disabled=!0,c.disabled=!0):(l.style.display="flex",l.disabled=!1,c.disabled=!1,l.classList.remove("ikr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){c.disabled||c.click()}),c.onchange=async function(x){var g=(e.get().images||[]).length+(e.get().pendingImages||[]).length,E=Array.from(x.target.files).slice(0,ki-g);c.value="";var w=(e.get().pendingImages||[]).length,h=e.get().images||[],C=h.length;if(E.length!==0){for(var S=[],T=[],b=0;b<E.length;b++){var L=E[b],A=L.name+"_"+L.size,N=(e.get().fingerprints||[]).some(function(F){return F===A})||S.some(function(F){return F.file.name+"_"+F.file.size===A});if(N){console.log("[ikr] Duplicate file detected, skipping:",L.name);continue}if(L.size>rt){var M="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(M,"error"):alert(M);continue}var U=URL.createObjectURL(L);p[U]=A,S.push({url:U,file:L,error:null}),T.push({url:U,file:L});var X=(e.get().fingerprints||[]).slice();X.push(A),e.set({fingerprints:X})}if(S.length!==0){var ne=(e.get().pendingImages||[]).concat(S),W=async function(){for(var F=0;F<T.length;F++){var Le=T[F],Oe=Le.file,_=Le.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var xe=(e.get().pendingImages||[]).filter(function(H){return H.url!==_}),oe=(e.get().images||[]).slice();oe.push(_),e.set({pendingImages:xe,images:oe});continue}try{var le=await ye(ge+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke})});if(!le.ok)throw le.status===429?new Error("rate_limit"):new Error("sign failed");var D=await le.json();if(!D.folder)throw new Error("sign folder missing");var J=new FormData;J.append("file",Oe),J.append("api_key",D.api_key),J.append("timestamp",D.timestamp),J.append("signature",D.signature),J.append("folder",D.folder);var de=await fetch("https://api.cloudinary.com/v1_1/"+D.cloud_name+"/image/upload",{method:"POST",body:J}),Z=await de.json();if(Z.secure_url&&Ur(Z.secure_url)){var He=(e.get().pendingImages||[]).some(function(H){return H.url===_});if(!He){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}k[Z.secure_url]=_,p[Z.secure_url]=p[_];var fe=(e.get().pendingImages||[]).filter(function(H){return H.url!==_}),$=(e.get().images||[]).slice();$.push(Z.secure_url),e.set({pendingImages:fe,images:$});try{ye(ge+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke,secureUrl:Z.secure_url})}).catch(function(){})}catch(H){}}else throw new Error("invalid image url")}catch(H){console.error("[ikr] Image upload failed:",H);var Q=H.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(Q,"error");var se=(e.get().pendingImages||[]).map(function(ce){return ce.url===_?{url:ce.url,file:ce.file,error:Q}:ce});e.set({pendingImages:se})}}};if(C===0&&w===0){i=!0;var O=!r.canNavigate||r.canNavigate();O&&e.goNext()}e.set({pendingImages:ne}),W()}}};var z=e.onChange(n);return n(),{el:t,destroy:function(){i=!0,c.onchange=null,z&&z()}}}var wr=2e3,it=60;function hi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-content";var a=document.createElement("div");a.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",a.textContent="Deneyiminizi anlat\u0131n",t.appendChild(a);var o=document.createElement("div");o.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=it,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),o.appendChild(s);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=wr,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",o.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-char-counter",c.setAttribute("aria-live","polite"),o.appendChild(c);function u(){var p=l.value.length;c.textContent=p+"/"+wr,c.classList.toggle("ikr-fwizard-char-counter--max",p>=wr)}function k(){return Me(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),u(),i(k())}),t.appendChild(o),u(),setTimeout(function(){i(k())},0),{el:t,destroy:function(){}}}var tt=40;function bi(e,r){r=r||{};var i=r.onValidityChange||function(){},t=r.onSuccess||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-author";var o=document.createElement("div");o.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",a.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var l=document.createElement("div");l.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var u=document.createElement("input");u.type="text",u.className="ikr-fwizard-input",u.maxLength=tt,u.setAttribute("aria-required","true"),u.value=e.get().author||"",l.appendChild(c),l.appendChild(u),s.appendChild(l);var k=document.createElement("div");k.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var n=document.createElement("input");n.type="email",n.className="ikr-fwizard-input",n.setAttribute("autocomplete","email"),n.value=e.get().email||"",k.appendChild(p),k.appendChild(n),s.appendChild(k);var v=document.createElement("div");v.className="ikr-fwizard-notice",v.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(v);var d=document.createElement("div");d.className="ikr-fwizard-msg",d.setAttribute("role","alert"),d.setAttribute("aria-live","assertive"),s.appendChild(d);var m=document.createElement("button");m.type="button",m.className="ikr-fwizard-submit-btn",m.textContent="G\xF6nder",s.appendChild(m),a.appendChild(s);function f(){return Me(4,e.get())}function y(){var x=!f(),g=(e.get().pendingImages||[]).length,E=g>0;E?(m.disabled=!0,m.classList.add("ikr-fwizard-submit-btn--disabled"),m.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(m.disabled=x,m.classList.toggle("ikr-fwizard-submit-btn--disabled",x),m.textContent="G\xF6nder")}u.addEventListener("input",function(){e.set({author:u.value}),y(),i(f())}),n.addEventListener("input",function(){e.set({email:n.value})}),y(),setTimeout(function(){i(f())},0),m.onclick=async function(){if(!m.disabled){var x=e.get(),g=(x.author||"").trim(),E=(x.comment||"").trim();if(n.value.trim()&&!n.checkValidity()){n.reportValidity();return}if(!g){d.innerHTML='<div class="ikr-fwizard-msg-error">Gerekli alan</div>';return}if(!x.rating){d.innerHTML='<div class="ikr-fwizard-msg-error">L\xFCtfen bir y\u0131ld\u0131z se\xE7in.</div>';return}m.disabled=!0,m.classList.add("ikr-fwizard-submit-btn--disabled");var w=m.textContent;if(m.textContent="G\xF6nderiliyor\u2026",d.innerHTML="",typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){t()},600);return}try{var h=Gr(window.location.href),C=x.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),S=await ye(ge+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:ke,productId:x.productId||null,slug:h||null,productName:C,author:g,title:(x.title||"").trim()||null,comment:E||null,rating:x.rating,images:x.images||[]})},15e3);if(S.ok)t();else{var T=await S.json().catch(function(){return{}});throw new Error(T.error||"Yorum kaydedilemedi.")}}catch(A){var b=A&&(A.name==="AbortError"||/signal/i.test(A.message||"")),L=b?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":A.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):d.innerHTML='<div class="ikr-fwizard-msg-error">'+L+"</div>",m.disabled=!1,m.classList.remove("ikr-fwizard-submit-btn--disabled"),m.textContent=w}}};var z=e.onChange(y);return{el:a,destroy:function(){m.onclick=null,z&&z()}}}var yi=!1;function at(){if(!yi){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=mi,document.head.appendChild(e),yi=!0}}function nt(e,r,i){if(i=i||{},e===1)return vi(r,{canNavigate:i.canNavigate});if(e===2)return gi(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return hi(r,{onValidityChange:i.onValidityChange});if(e===4)return bi(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var t=document.createElement("div");return t.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:t,destroy:function(){}}}function wi(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function xi(e){e=e||{},at();var r=ui({productId:e.productId,productName:e.productName}),i={},t={},a=pi({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(w){var h=i[w];h&&h.startsWith("blob:")&&URL.revokeObjectURL(h)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),o={ikrReviewModal:!0};window.history.pushState(o,null,"");var s=function(w){a&&a.close&&a.close()};window.addEventListener("popstate",s);var l=document.createElement("div");l.className="ikr-fwizard-step-wrap";var c=fi({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),u=document.createElement("div");u.className="ikr-fwizard-layout",u.appendChild(l),u.appendChild(c.el);var k=null,p="idle",n=null,v=!0,d=null;function m(w,h){l.innerHTML="";var C=nt(w,r,{canNavigate:function(){return p==="idle"},blobMap:i,urlToFinger:t,onValidityChange:function(b){c.setNextDisabled(!b)},onSuccess:y,showToast:a.showToast});if(k=C,c.update(w,r.get()),h){p="entering",C.el.classList.add("ikr-fwizard-step--enter");var S=null,T=function(){S&&clearTimeout(S),C.el.removeEventListener("animationend",T),C.el.classList.remove("ikr-fwizard-step--enter"),p="idle",n!==null&&z()};C.el.addEventListener("animationend",T),S=setTimeout(T,700)}else p="idle";l.appendChild(C.el),a.setStepAttr&&a.setStepAttr(w),w===3&&c.setNextDisabled(!0)}var f=!1;function y(){if(!f){if(f=!0,!k){l.innerHTML="";var w=wi();w.classList.add("ikr-fwizard-step--enter"),l.appendChild(w),a.setStepAttr("thanks"),c.setThanksState(a.close);return}var h=k;p="exiting",h.el.classList.add("ikr-fwizard-step--exit");var C=function(){if(d&&clearTimeout(d),h.el.removeEventListener("animationend",C),h.destroy)try{h.destroy()}catch(T){}k===h&&(k=null),l.innerHTML="";var S=wi();S.classList.add("ikr-fwizard-step--enter"),l.appendChild(S),a.setStepAttr("thanks"),c.setThanksState(a.close),p="idle"};h.el.addEventListener("animationend",C),d=setTimeout(C,300)}}function z(){var w=r.get().currentStep;if(p!=="idle"){n=w;return}if(!k){var h=!v;v=!1,m(w,h);return}var C=k;p="exiting",C.el.classList.add("ikr-fwizard-step--exit");var S=function(){if(d&&clearTimeout(d),C.el.removeEventListener("animationend",S),C.destroy)try{C.destroy()}catch(b){}if(k===C){l.innerHTML="",k=null;var T=n!==null?n:r.get().currentStep;n=null,m(T,!0),p="idle"}};C.el.addEventListener("animationend",S),d=setTimeout(S,350)}z();var x=r.get().currentStep,g=r.onChange(function(w){w.currentStep!==x?(x=w.currentStep,z()):c.update(w.currentStep,w)}),E=a.close;return a.close=function(){g&&g(),typeof d!="undefined"&&d&&clearTimeout(d),E()},a.open(u),{close:a.close}}function Y(){xi({productId:q||"",productName:Pe||""})}var ot={id:"classic",name:"Klasik (A\xE7\u0131k)"};function lt(e){var r=e.widget,i=e.data,t=e.settings,a=e.iconPair,o=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,c=e.currentRatingFilter,u=e.currentOrderBy,k=e.currentHasImages,p=e.onFilterChange,n=e.onSortChange,v=document.createElement("div");v.className="ikr-summary";var d=(s[3]||0)+(s[4]||0),m=o>0?Math.round(d/o*100):0,f=document.createElement("div");f.className="ikr-summary-block ikr-summary-avg",f.innerHTML='<span class="ikr-avg-star ikr-icon">'+a.filled+'</span><span class="ikr-avg-num">'+l+"</span>",v.appendChild(f);var y=document.createElement("div");if(y.className="ikr-summary-block ikr-summary-count",y.textContent=o.toLocaleString("tr-TR")+" Yorum",v.appendChild(y),t.showRecommendation!==!1&&m>0){var z=document.createElement("div");z.className="ikr-summary-block ikr-summary-recommend",z.innerHTML='<span class="ikr-recommend-pct">%'+m+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",v.appendChild(z)}return v.appendChild(Ie({ratingCounts:s,allCount:o,iconPair:a,currentRatingFilter:c,onFilterChange:p})),v.appendChild(K({widget:r,currentOrderBy:u,currentHasImages:k,onWriteClick:Y,onSortChange:n})),v}var zr={};ve(zr,{css:()=>st,meta:()=>dt,render:()=>ct});var zi=`
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
`;var dt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},st=zi;function ct(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,p=e.onSortChange,n=document.createElement("div");n.className="ikr-summary ikr-summary-compact";var v=document.createElement("div");v.className="ikr-compact-header";var d=document.createElement("div");d.className="ikr-compact-trigger-wrap";var m=document.createElement("button");m.className="ikr-compact-trigger",m.type="button",m.setAttribute("aria-expanded","false"),m.innerHTML='<span class="ikr-compact-trigger-stars">'+he(s,t)+'</span><span class="ikr-compact-trigger-text">'+a.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron"><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg></span>',d.appendChild(m),v.appendChild(d);var f=K({widget:r,currentOrderBy:c,currentHasImages:u,onWriteClick:Y,onSortChange:p}),y=f.querySelector(".ikr-filter-wrap"),z=f.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-compact-actions-slot",z&&x.appendChild(z),y&&x.appendChild(y),v.appendChild(x),n.appendChild(v);var g=document.createElement("div");g.className="ikr-compact-panel",g.setAttribute("role","dialog"),g.setAttribute("aria-hidden","true");var E=document.createElement("div");E.className="ikr-compact-panel-inner";var w=document.createElement("div");w.className="ikr-compact-avg",w.innerHTML='<span class="ikr-icon">'+t.filled+"</span><span>"+s+"</span>",E.appendChild(w),E.appendChild(Ie({ratingCounts:o,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:k})),g.appendChild(E);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function C(O){var F=O?n:d;g.parentNode!==F&&(g.classList.contains("ikr-open")&&(g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),m.setAttribute("aria-expanded","false")),F.appendChild(g))}if(C(h?h.matches:!1),h){var S=function(O){C(O.matches)};h.addEventListener?h.addEventListener("change",S):h.addListener&&h.addListener(S)}if(z){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=P&&P.writeButtonText||"Yorum Yap",T.onclick=Y;var b=document.createElement("div");b.className="ikr-compact-write-row",b.appendChild(T),n.appendChild(b)}function L(){g.classList.remove("ikr-open"),g.setAttribute("aria-hidden","true"),m.setAttribute("aria-expanded","false")}function A(){ar(N),g.classList.add("ikr-open"),g.setAttribute("aria-hidden","false"),m.setAttribute("aria-expanded","true")}m.onclick=function(){g.classList.contains("ikr-open")?L():A()};var N=null;function M(O){N&&(N(),N=null),O||(N=nr({trigger:d,element:g,close:L}))}if(M(h?h.matches:!1),h){var U=function(O){M(O.matches)};h.addEventListener?h.addEventListener("change",U):h.addListener&&h.addListener(U)}if(i.showRecommendation!==!1){var X=(o[3]||0)+(o[4]||0),ne=a>0?Math.round(X/a*100):0;if(ne>0){var W=document.createElement("div");W.className="ikr-summary-block ikr-summary-recommend",W.style.marginTop="8px",W.innerHTML='<span class="ikr-recommend-pct">%'+ne+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",E.appendChild(W)}}return n}var Cr={};ve(Cr,{css:()=>mt,meta:()=>pt,render:()=>ut});var Ci=`
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
`;var pt={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},mt=Ci;function ut(e){var r=e.widget,i=e.settings,t=e.iconPair,a=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,u=e.currentHasImages,k=e.onFilterChange,p=e.onSortChange,n=document.createElement("div");n.className="ikr-summary ikr-summary-split";var v=document.createElement("div");v.className="ikr-split-col ikr-split-left";var d=document.createElement("div");d.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",d.innerHTML='<span class="ikr-avg-star ikr-icon">'+t.filled+'</span><span class="ikr-avg-num">'+s+"</span>",v.appendChild(d);var m=document.createElement("div");m.className="ikr-summary-block ikr-summary-count ikr-split-left-count",m.textContent=a.toLocaleString("tr-TR")+" Yorum",v.appendChild(m),n.appendChild(v);var f=document.createElement("div");f.className="ikr-split-col ikr-split-mid",f.appendChild(Ie({ratingCounts:o,allCount:a,iconPair:t,currentRatingFilter:l,onFilterChange:k})),n.appendChild(f);var y=K({widget:r,currentOrderBy:c,currentHasImages:u,onWriteClick:Y,onSortChange:p}),z=y.querySelector(".ikr-filter-wrap"),x=y.querySelector(".ikr-write-btn"),g=document.createElement("div");g.className="ikr-split-col ikr-split-right",x&&g.appendChild(x),z&&g.appendChild(z),n.appendChild(g);var E=(o[3]||0)+(o[4]||0),w=a>0?Math.round(E/a*100):0,h=document.createElement("div");h.className="ikr-summary-block ikr-summary-recommend",h.innerHTML='<span class="ikr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var C=i.showRecommendation===!1||w===0;return C&&h.classList.add("ikr-split-rec-hidden"),v.appendChild(h),n}var Sr={};ve(Sr,{css:()=>vt,meta:()=>ft,render:()=>kt});var Si=`
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
`;var ft={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},vt=Si;function kt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-minimal";var u=document.createElement("div");u.className="ikr-minimal-info";var k=document.createElement("div");k.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=a,k.appendChild(p);var n=document.createElement("span");n.className="ikr-minimal-stars",n.innerHTML=he(a,i),k.appendChild(n);var v=document.createElement("span");v.className="ikr-minimal-count",v.textContent=t.toLocaleString("tr-TR")+" Yorum",k.appendChild(v),u.appendChild(k),c.appendChild(u);var d=K({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),m=d.querySelector(".ikr-filter-wrap"),f=d.querySelector(".ikr-write-btn"),y=document.createElement("div");if(y.className="ikr-minimal-actions",f&&y.appendChild(f),m&&y.appendChild(m),c.appendChild(y),f){var z=document.createElement("button");z.className="ikr-write-btn",z.textContent=P&&P.writeButtonText||"Yorum Yap",z.onclick=Y;var x=document.createElement("div");x.className="ikr-minimal-write-row",x.appendChild(z),c.appendChild(x)}return c}var Er={};ve(Er,{css:()=>ht,meta:()=>gt,render:()=>bt});var Ei=`
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
`;var gt={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},ht=Ei;function bt(e){var r=e.widget,i=e.iconPair,t=e.allCount,a=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-hero";var u=document.createElement("div");u.className="ikr-hero-info";var k=document.createElement("div");k.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=a,k.appendChild(p);var n=document.createElement("div");n.className="ikr-hero-meta-row";var v=document.createElement("span");v.className="ikr-hero-stars",v.innerHTML=he(a,i),n.appendChild(v);var d=document.createElement("div");d.className="ikr-hero-count",d.textContent=t.toLocaleString("tr-TR")+" Yorum",n.appendChild(d),k.appendChild(n),u.appendChild(k),c.appendChild(u);var m=K({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),f=m.querySelector(".ikr-filter-wrap"),y=m.querySelector(".ikr-write-btn"),z=document.createElement("div");z.className="ikr-hero-actions ikr-desktop-only",y&&z.appendChild(y),f&&z.appendChild(f),c.appendChild(z);var x=K({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:Y,onSortChange:l}),g=x.querySelector(".ikr-filter-wrap"),E=x.querySelector(".ikr-write-btn"),w=document.createElement("div");return w.className="ikr-hero-write-row",E&&w.appendChild(E),g&&w.appendChild(g),c.appendChild(w),c}var or={classic:xr,compact:zr,split:Cr,minimal:Sr,hero:Er};function lr(e){return or[e]||or.classic}function Ti(){return Object.keys(or).map(function(e){return or[e].css||""}).join(`
`)}var Tr={};ve(Tr,{css:()=>wt,meta:()=>yt,render:()=>xt});function Fe(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var t=document.createElement("div");t.className="ikr-reply-header";var a=document.createElement("span");a.className="ikr-reply-label",a.textContent=P&&P.merchantReplyLabel||"Ma\u011Faza Sahibi",t.appendChild(a),i.appendChild(t);var o=document.createElement("div");o.className="ikr-reply-text ikr-reply-text-clamped",o.textContent=e,i.appendChild(o);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var l=!1;s.onclick=function(){l=!l,o.classList.toggle("ikr-reply-text-clamped",!l),s.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var yt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},wt="";function xt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var t=document.createElement("div");t.className="ikr-review-top";var a=document.createElement("div");a.className="ikr-review-top-left";var o=document.createElement("span");o.className="ikr-review-stars",o.innerHTML=pe(e.rating,P),a.appendChild(o);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=me(e.createdAt),t.appendChild(a),t.appendChild(s),i.appendChild(t),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var c=document.createElement("div");c.className="ikr-author",c.textContent=e.author||"",i.appendChild(c);var u=(e.comment||"").trim();if(u){var k=document.createElement("div");k.className="ikr-body ikr-body-clamped",k.textContent=u,i.appendChild(k);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(k.scrollHeight>k.clientHeight+2){p.style.display="inline";var m=!1;p.onclick=function(){m=!m,k.classList.toggle("ikr-body-clamped",!m),p.textContent=m?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var n=be(e);if(n.length){var v=document.createElement("div");v.className="ikr-gallery",n.forEach(function(m){var f=document.createElement("img"),y=ee(m,j);f.src=y.src,f.srcset=y.srcset,f.loading="lazy",f.decoding="async",f.width=j,f.height=j,f.className="ikr-img",re(f),f.setAttribute("data-ikr-img-url",m),(function(z){f.onclick=function(){te(e,z,r)}})(m),v.appendChild(f)}),i.appendChild(v)}var d=Fe(e.merchantReply);return d&&i.appendChild(d),i}var Lr={};ve(Lr,{css:()=>Ct,meta:()=>zt,render:()=>St});var Li=`
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
`;var zt={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},Ct=Li;function St(e,r){var i=be(e),t=i.length>0,a=document.createElement("div");a.className="ikr-review-list"+(t?"":" ikr-review-list--no-media");var o=document.createElement("div");o.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=pe(e.rating,P),o.appendChild(s);var l=document.createElement("span");l.className="ikr-review-list-author-name",l.textContent=e.author||"",o.appendChild(l);var c=document.createElement("span");c.className="ikr-date ikr-review-list-author-date",c.textContent=me(e.createdAt),o.appendChild(c),a.appendChild(o);var u=document.createElement("div");if(u.className="ikr-review-list-content",e.title){var k=document.createElement("div");k.className="ikr-review-list-title",k.textContent=e.title,u.appendChild(k)}var p=(e.comment||"").trim();if(p){var n=document.createElement("div");n.className="ikr-review-list-body ikr-body-clamped",n.textContent=p,u.appendChild(n);var v=document.createElement("span");v.className="ikr-read-more",v.textContent="Devam\u0131n\u0131 oku",v.style.display="none",u.appendChild(v),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2){v.style.display="inline";var f=!1;v.onclick=function(){f=!f,n.classList.toggle("ikr-body-clamped",!f),v.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var d=Fe(e.merchantReply);if(d&&u.appendChild(d),a.appendChild(u),t){var m=document.createElement("div");m.className="ikr-review-list-media",i.forEach(function(f){var y=document.createElement("img"),z=ee(f,j);y.src=z.src,y.srcset=z.srcset,y.loading="lazy",y.decoding="async",y.width=j,y.height=Math.round(j*4/3),y.setAttribute("data-ikr-img-url",f),re(y),(function(x){y.onclick=function(){te(e,x,r)}})(f),m.appendChild(y)}),a.appendChild(m)}return a}var Nr={};ve(Nr,{css:()=>Tt,meta:()=>Et,render:()=>Lt});var Ni=`
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
`;var Et={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},Tt=Ni;function Lt(e,r){var i=Je(e),t=!!i,a=document.createElement("div");a.className="ikr-review-gallery"+(t?"":" ikr-review-gallery--no-media");var o=document.createElement("div");o.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=pe(e.rating,P),o.appendChild(s),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,o.appendChild(l)}var c=document.createElement("div");c.className="ikr-review-gallery-author",c.textContent=e.author||"",o.appendChild(c);var u=document.createElement("div");u.className="ikr-review-gallery-date",u.textContent=me(e.createdAt),o.appendChild(u);var k=(e.comment||"").trim();if(k){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=k,o.appendChild(p);var n=document.createElement("span");n.className="ikr-read-more",n.textContent="Devam\u0131n\u0131 oku",n.style.display="none",n.style.cursor="pointer";var v=!1;n.onclick=function(){if(i){te(e,i,r);return}v=!v,p.classList.toggle("ikr-body-clamped",!v),n.textContent=v?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},o.appendChild(n),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(n.style.display="inline")})}if(a.appendChild(o),t){var d=document.createElement("div");d.className="ikr-review-gallery-media";var m=document.createElement("img"),f=ee(i,Ze);m.src=f.src,m.srcset=f.srcset,m.loading="lazy",m.decoding="async",m.width=Ze,m.height=Math.round(Ze*4/3),re(m),m.setAttribute("data-ikr-img-url",i),m.onclick=function(){te(e,i,r)},d.appendChild(m),a.appendChild(d)}var y=Fe(e.merchantReply,i?function(){te(e,i,r)}:null);return y&&(y.classList.add("ikr-review-gallery-reply"),a.appendChild(y)),a}var dr={card:Tr,list:Lr,gallery:Nr};function We(e){return dr[e]||dr.card}function Ai(){return Object.keys(dr).map(function(e){return dr[e].css||""}).join(`
`)}function Te(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var t=parseInt(i[1],16),a=parseInt(i[2],16),o=parseInt(i[3],16);return"rgba("+t+","+a+","+o+","+r+")"}function Nt(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(Zr)}catch(t){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var i=document.querySelector("main")||document.body;return i?(i.appendChild(e),e):null}function At(e,r){var i=e.querySelector('[data-renuvex-slot="product-reviews"],[data-ikr-slot="product-reviews"]');return i||(i=Qe({slot:"product-reviews",legacySlot:"product-reviews",className:"renuvex-pr-reviews-slot ikr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(i)),er(i,{surface:"reviews",productId:r||""}),i}var Pi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Ri={small:80,medium:110,large:140};function Pt(e,r){var i=document.createElement("div");i.className="ikr-state-msg ikr-state-error",i.setAttribute("role","status"),i.setAttribute("aria-live","polite");var t=document.createElement("div");t.className="ikr-state-error-text",t.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",i.appendChild(t);var a=document.createElement("button");return a.type="button",a.className="ikr-state-retry",a.textContent="Tekrar Dene",a.onclick=async function(){a.disabled=!0,a.textContent="Tekrar deneniyor...",await r()},i.appendChild(a),i}function Rt(e,r){var i=r.headerTitleColor||"#111111",t=r.headerAvgColor||"#111111",a=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",c=r.barCountColor||"#111111",u=Te(s,.06),k=r.reviewStarColor||"#f59e0b",p=r.btnBgColor||"#111111",n=r.btnTextColor||"#ffffff",v=r.btnBorderColor||"#111111",d=r.filterBtnBgColor||"#111111",m=r.filterBtnTextColor||"#ffffff",f=r.filterBtnBorderColor||"#111111",y=r.filterMenuBgColor||"#ffffff",z=r.filterMenuBorderColor||"#e5e7eb",x=r.filterItemTextColor||"#111111",g=r.filterItemHoverBgColor||"#f3f4f6",E=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",h=r.reviewAuthorColor||"#111111",C=r.reviewDateColor||"#5e5e5e",S=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",b=r.replyBgColor||"#f9fafb",L=r.replyBorderColor||"#747474",A=r.replyLabelColor||"#111111",N=r.replyTextColor||"#111111",M=r.photoTitleColor||"#111111",U=Te("#111111",.05),X=r.photoArrowBgColor||"#ffffff",ne=r.photoArrowTextColor||"#111111",W=Te("#111111",.12),O=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Le=r.formSecondaryTextColor||"#3b3b3b",Oe=r.inputTextColor||F,_=r.inputBorderColor||"#d1d5db",xe=r.placeholderColor||"#9ca3af",oe=r.formStepBarColor||"#111111",le=r.formBtnBgColor||"#111111",D=r.formBtnTextColor||"#ffffff",J=r.formBtnBorderColor||"#111111",de=Te(le,.06),Z=Te(le,.18),He=Te(D,.85),fe=Te(F,.06),$=r.loadMoreBgColor||"#ffffff",Q=r.loadMoreTextColor||"#111111",se=r.loadMoreBorderColor||"#111111",H={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":t,"--ikr-header-count":a,"--ikr-header-recommend":o,"--ikr-bar-fill":s,"--ikr-bar-track":l,"--ikr-bar-count":c,"--ikr-bar-hover-bg":u,"--ikr-btn-bg":p,"--ikr-btn-text":n,"--ikr-btn-border":v,"--ikr-filter-btn-bg":d,"--ikr-filter-btn-text":m,"--ikr-filter-btn-border":f,"--ikr-filter-menu-bg":y,"--ikr-filter-menu-border":z,"--ikr-filter-item-text":x,"--ikr-filter-item-hover-bg":g,"--ikr-filter-item-active":E,"--ikr-review-title":w,"--ikr-review-author":h,"--ikr-review-date":C,"--ikr-review-body":S,"--ikr-review-border":T,"--ikr-review-star-color":k,"--ikr-reply-bg-color":b,"--ikr-reply-border":L,"--ikr-reply-label":A,"--ikr-reply-text":N,"--ikr-photo-title":M,"--ikr-photo-image-border":U,"--ikr-photo-arrow-bg":X,"--ikr-photo-arrow-text":ne,"--ikr-photo-arrow-border":W,"--ikr-fwizard-bg":O,"--ikr-fwizard-text":F,"--ikr-fwizard-secondary-text":Le,"--ikr-fwizard-input-bg":O,"--ikr-fwizard-input-text":Oe,"--ikr-fwizard-input-border":_,"--ikr-fwizard-placeholder":xe,"--ikr-fwizard-close-text":F,"--ikr-fwizard-close-hover-bg":fe,"--ikr-fwizard-progress-bg":fe,"--ikr-fwizard-progress-active":oe,"--ikr-fwizard-btn-bg":le,"--ikr-fwizard-btn-text":D,"--ikr-fwizard-btn-border":J,"--ikr-fwizard-btn-disabled-bg":Z,"--ikr-fwizard-btn-disabled-text":He,"--ikr-fwizard-nav-hover-bg":de,"--ikr-load-more-bg":$,"--ikr-load-more-text":Q,"--ikr-load-more-border":se};Object.keys(H).forEach(function(ce){e.style.setProperty(ce,H[ce])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function we(e,r,i,t,a,o,s){if(Vr){Xe({productId:e,settings:r,reviewsData:i,productName:t,orderBy:a,page:o,badgeSettings:s});return}Ue(!0),Mr(e),Fr(r),s!==void 0&&Or(s),Hr(t),a&&Ye(a),o&&Se(o),i!=null&&_r(i);try{let sr=function(R,I){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var B=R.meta.sizeOverrides[I];B&&Object.keys(B).forEach(function(G){n.style.setProperty(G,B[G])})}};var Bt=sr,l=lr(r.summaryLayout),c=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),u=r.showTitle!==!1,k=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=c&&u?k:"",n=document.documentElement;Rt(n,r),Kr("#111111",si+Ti()+Ai());var v=r.borderRadius!==void 0?r.borderRadius:8,d=Pi[r.size]||Pi.medium,m=Ri[r.thumbnailSize]||Ri.medium,f=We(r.reviewLayout);if(f.meta&&f.meta.sizeOverrides&&f.meta.sizeOverrides[r.size]){var y=f.meta.sizeOverrides[r.size],z=y["--ikr-list-photo-w"]||y["--ikr-gallery-photo-w"];z&&(m=parseInt(z))}n.style.setProperty("--ikr-title-size",d.titleSize+"px"),n.style.setProperty("--ikr-review-text-size",d.reviewTextSize+"px"),n.style.setProperty("--ikr-review-title-size",d.reviewTitleSize+"px"),n.style.setProperty("--ikr-author-size",d.authorSize+"px"),n.style.setProperty("--ikr-reply-name-size",d.replyNameSize+"px"),n.style.setProperty("--ikr-reply-text-size",d.replyTextSize+"px"),n.style.setProperty("--ikr-radius",v+"px"),n.style.setProperty("--ikr-radius-sm",Math.max(0,v-4)+"px"),n.style.setProperty("--ikr-photo-title-size",d.photoTitleSize+"px"),n.style.setProperty("--ikr-avg-rating-size",d.avgRatingSize+"px"),n.style.setProperty("--ikr-review-count-size",d.reviewCountSize+"px"),n.style.setProperty("--ikr-compact-count-size",d.compactCountSize+"px"),n.style.setProperty("--ikr-recommend-size",d.recommendSize+"px"),n.style.setProperty("--ikr-btn-text-size",d.btnTextSize+"px"),n.style.setProperty("--ikr-bar-label-size",d.barLabelSize+"px"),n.style.setProperty("--ikr-minimal-avg-size",d.minimalAvgSize+"px"),n.style.setProperty("--ikr-hero-avg-size",d.heroAvgSize+"px"),n.style.setProperty("--ikr-bar-count-size",d.barCountSize+"px"),n.style.setProperty("--ikr-review-date-size",d.reviewDateSize+"px"),n.style.setProperty("--ikr-filter-text-size",d.filterTextSize+"px"),n.style.setProperty("--ikr-load-more-size",d.loadMoreSize+"px"),n.style.setProperty("--ikr-read-more-size",d.readMoreSize+"px"),n.style.setProperty("--ikr-thumbnail-size",m+"px");var x=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";n.style.setProperty("--ikr-review-star-color",x),n.style.setProperty("--ikr-star-size",d.reviewStarSize+"px"),n.style.setProperty("--ikr-avg-star-size",d.avgStarSize+"px"),sr(lr(r.summaryLayout),r.size),sr(We(r.reviewLayout),r.size);var g=De(r),E=Nt();if(!E)return;var w=At(E,e),h=document.getElementById("ikas-reviews");if(h||(h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px"),h.parentNode!==w&&w.appendChild(h),r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ue(!1);var C=Ke;Xe(null),C&&we(C.productId,C.settings,C.reviewsData,C.productName,C.orderBy,C.page,C.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var S=i||{},T=kr(S),b=T?[]:S.data&&S.data.reviews||[],L=T?0:S.data&&S.data.totalCount||0;Dr(b);var A=h.cloneNode(!1);h.parentNode.replaceChild(A,h),h=A;var N=document.createElement("div");if(N.id="ikas-reviews-widget",N.className="renuvex-pr-reviews-widget",N.setAttribute("data-renuvex-surface","reviews"),N.setAttribute("data-ikr-surface","reviews"),e&&(N.setAttribute("data-renuvex-product-id",String(e)),N.setAttribute("data-ikr-product-id",String(e))),typeof window!="undefined"&&window.__ikasPreviewMode&&(N.style.width="100%",N.style.maxWidth="100%",N.style.marginLeft="0",N.style.marginRight="0"),p){var M=document.createElement("div"),U=r.summaryLayout||"classic";M.className="ikr-title ikr-title-"+U,M.textContent=p,N.appendChild(M)}if(T){N.appendChild(Pt(S.message,async function(){var R=await Ee(q,Ce,1,Ne,Ae);await we(q,P,R,Pe,Ce,1,pr)})),h.appendChild(N),_e(N,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var X=S.data&&S.data.allCount||0,ne=S.data&&S.data.ratingCounts||null,W=ne||[0,0,0,0,0],O=S.data&&S.data.avgRating||"0.0";if(!ne&&b.length>0){b.forEach(function(R){R.rating>=1&&R.rating<=5&&W[R.rating-1]++});var F=b.reduce(function(R,I){return R+I.rating},0);O=(F/b.length).toFixed(1)}if(X>0){var Le=lr(r.summaryLayout),Oe=Le.render({widget:N,data:S,settings:r,iconPair:g,allCount:X,ratingCounts:W,avgRatingVal:O,currentRatingFilter:Ne,currentOrderBy:Ce,currentHasImages:Ae,onFilterChange:async function(R){var I=Ne===R?null:R;qe(I),Se(1);var B=await Ee(q,Ce,1,I,Ae);await we(q,P,B,Pe,Ce,1)},onSortChange:async function(R,I){Se(1);var B=R,G=!1;I&&(G=!0,B="newest"),Ir(G),Ye(B);var cr=await Ee(q,B,1,Ne,G);await we(q,P,cr,Pe,B,1)}});N.appendChild(Oe)}else{var _=document.createElement("button");_.className="ikr-write-btn",_.style.cssText="display:block;margin:16px auto 0;",_.textContent=r.writeButtonText||"Yorum Yap",_.onclick=Y,N.appendChild(_)}var xe=(Br||[]).filter(function(R){return be(R).length>0});if(r.showPhotoGallery!==!1&&!Ae&&xe.length>0){var oe=document.createElement("div");if(oe.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var le=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",D=document.createElement("div");D.className="ikr-photo-title",D.textContent=le,oe.appendChild(D)}var J=r.reviewLayout==="card"?"1/1":"3/4";n.style.setProperty("--ikr-photo-thumb-aspect",J);var de=document.createElement("div");de.className="ikr-photo-strip";var Z=j,He=r.reviewLayout==="card"?j:Math.round(j*4/3),fe=0;xe.forEach(function(R){if(!(fe>=15)){var I=Je(R);if(I){var B=document.createElement("img"),G=ee(I,j);B.src=G.src,B.srcset=G.srcset,B.loading=fe<3?"eager":"lazy",B.decoding="async",B.width=Z,B.height=He,B.className="ikr-photo-strip-thumb",B.alt="Yorum foto\u011Fraf\u0131",re(B),(function(cr,Bi){B.onclick=function(){te(Bi,cr,xe)}})(I,R),de.appendChild(B),fe++}}});var $=document.createElement("button");$.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",$.innerHTML="&#8249;",$.setAttribute("aria-label","\xD6nceki"),$.onclick=function(){de.scrollBy({left:-200,behavior:"smooth"})};var Q=document.createElement("button");Q.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",Q.innerHTML="&#8250;",Q.setAttribute("aria-label","Sonraki"),Q.onclick=function(){de.scrollBy({left:200,behavior:"smooth"})};var se=document.createElement("div");se.className="ikr-photo-strip-wrap",se.appendChild($),se.appendChild(de),se.appendChild(Q),oe.appendChild(se),N.appendChild(oe)}if(b.length===0){var H=document.createElement("p");H.className="ikr-state-msg",H.textContent="Hen\xFCz yorum yok.",N.appendChild(H)}else{var f=We(r.reviewLayout);b.forEach(function(I){N.appendChild(f.render(I,mr))})}var ce=S.data&&S.data.hasMore;if(ce){var V=document.createElement("button");V.className="ikr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var R=Rr+1,I=await Ee(q,Ce,R,Ne,Ae);if(I&&!kr(I)&&I.data&&Array.isArray(I.data.reviews)){jr(I.data.reviews),Se(R);var B=We(P.reviewLayout);I.data.reviews.forEach(function(G){N.insertBefore(B.render(G,mr),V)}),I.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},N.appendChild(V)}h.appendChild(N),_e(N,"reviews-widget",{productId:e||""}),br(X>0?O:null,L,t,pr,g,q)}catch(R){console.error("[ikr] render error:",R),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ue(!1),Ke){var ze=Ke;Xe(null),we(ze.productId,ze.settings,ze.reviewsData,ze.productName,ze.orderBy,ze.page,ze.badgeSettings)}}}export{we as a,rr as b,kr as c,Ee as d,Fi as e,Yt as f};
