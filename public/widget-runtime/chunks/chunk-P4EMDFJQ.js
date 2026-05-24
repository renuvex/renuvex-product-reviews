/* ikas Reviews Widget ESM runtime | theme: default */
import{b as Ke}from"./chunk-Z7432DLE.js";import{a as ze,b as ti,c as tr,d as ar,e as ai,f as qe,g as ni,j as oi,k as li,l as di}from"./chunk-44JCKSXS.js";import{$ as xe,A as Vr,B as Wr,C as Gr,D as qr,E as Ur,F as Je,G as Ze,H as $e,N as ye,O as W,P as G,Q as We,R as Kr,T as Xr,U as ue,V as we,W as Jr,X as Zr,Y as fe,Z as $r,_ as Qr,a as ge,aa as Qe,b as he,ba as j,c as be,ca as er,da as rr,e as vr,ea as hr,f as je,fa as br,g as Mr,ga as ie,h as Te,ha as ei,i as Fr,ia as te,j as Re,ja as ri,k as Be,ka as Ge,l as K,la as ii,m as A,n as kr,na as ir,o as Ie,q as gr,r as _r,s as Ve,t as Le,u as Xe,v as Or,w as Hr,x as Dr,y as Yr,z as jr}from"./chunk-XSCKLF57.js";var Yi=15,ji=60*1e3,si="__ikrReviewsFetchError",yr={};function nr(e){return{type:si,message:e||"Yorumlar \u015Fu anda y\xFCklenemiyor."}}function wr(e){return!!(e&&e.type===si)}async function Pe(e,r,i,a,t,o){if(window.__ikasPreviewMode){try{var s=window.__ikasPreviewBaseUrl||be,l=s+"/api/preview/reviews?page="+encodeURIComponent(i||1),c=await ze(l);if(c.ok)return await c.json()}catch(k){}return nr()}r=r||"newest",i=i||1;var m=o?"_l"+o:"",v="ikr_reviews_"+he+"_"+e+"_"+r+"_"+i+"_"+(a||"")+"_"+(t?"1":"0")+m,p=null,n=ri(v);if(n)try{var f=JSON.parse(n);if(f&&f.t!==void 0&&f.v){if(Date.now()-f.t<ji)return f.v;p=f.v,Ge(v,"")}else Ge(v,"")}catch(k){Ge(v,"")}try{var d=be+"/api/public/reviews?storeId="+encodeURIComponent(he)+"&productId="+encodeURIComponent(e)+"&orderBy="+encodeURIComponent(r)+"&page="+encodeURIComponent(i)+(a?"&rating="+encodeURIComponent(a):"")+(t?"&hasImages=true":"")+(o?"&limit="+encodeURIComponent(o):""),u=await ze(d);if(!u.ok)return p||nr();var g=await u.json();return Ge(v,JSON.stringify({t:Date.now(),v:g})),g}catch(k){return console.error("[ikr] fetchReviews error:",k),p||nr()}}async function Vi(e){var r=await Pe(e,"newest",1,null,!0,Yi);return!r||!r.data||!Array.isArray(r.data.reviews)?[]:r.data.reviews}async function Ut(e,r){var i=document.getElementById("ikr-rating-badge");i&&i.remove();var a=document.getElementById("ikr-jsonld");if(a&&a.remove(),!yr[e]){yr[e]=!0;var t={title:"M\xFC\u015Fteri Yorumlar\u0131",enabled:!0},o={enabled:!0,size:"medium"};try{var s=await ti();if(!s)return;var l=s.widgets&&s.widgets.reviews||t,c=s.widgets&&s.widgets.badge||o;if(l.enabled===!1)return;Ve("newest"),Le(1),Xe(null);var m=await Promise.all([Pe(e,"newest",1,null),Vi(e)]),v=m[0];Wr(m[1]),await Ce(e,l,v,r,"newest",1,c)}catch(p){console.error("[ikr] bootstrap error:",p),await Ce(e,t,nr(),r,void 0,void 0,o)}finally{delete yr[e]}}}function Me(e){return xe(e)}function Wi(){var e=document.body.style,r=document.documentElement.style;return{scrollX:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,scrollY:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,fixedBodyLock:!1,bodyOverflow:e.getPropertyValue("overflow"),bodyOverflowPriority:e.getPropertyPriority("overflow"),bodyPaddingRight:e.getPropertyValue("padding-right"),bodyPaddingRightPriority:e.getPropertyPriority("padding-right"),bodyPosition:e.getPropertyValue("position"),bodyPositionPriority:e.getPropertyPriority("position"),bodyTop:e.getPropertyValue("top"),bodyTopPriority:e.getPropertyPriority("top"),bodyLeft:e.getPropertyValue("left"),bodyLeftPriority:e.getPropertyPriority("left"),bodyRight:e.getPropertyValue("right"),bodyRightPriority:e.getPropertyPriority("right"),bodyWidth:e.getPropertyValue("width"),bodyWidthPriority:e.getPropertyPriority("width"),bodyOverscrollBehaviorY:e.getPropertyValue("overscroll-behavior-y"),bodyOverscrollBehaviorYPriority:e.getPropertyPriority("overscroll-behavior-y"),rootOverflow:r.getPropertyValue("overflow"),rootOverflowPriority:r.getPropertyPriority("overflow"),rootOverscrollBehaviorY:r.getPropertyValue("overscroll-behavior-y"),rootOverscrollBehaviorYPriority:r.getPropertyPriority("overscroll-behavior-y")}}function ae(e,r,i,a){i?e.setProperty(r,i,a||""):e.removeProperty(r)}function Gi(){if(typeof navigator=="undefined")return!1;var e=navigator.platform||"",r=navigator.userAgent||"",i=navigator.maxTouchPoints||0,a=/iP(ad|hone|od)/.test(e)||e==="MacIntel"&&i>1;return a&&/AppleWebKit/i.test(r)}function qi(){var e=Wi(),r=document.body.style,i=document.documentElement.style,a=Math.max(0,window.innerWidth-document.documentElement.clientWidth),t=window.getComputedStyle(document.body).position==="fixed",o=Gi()&&!t;if(a>0){var s=parseFloat(window.getComputedStyle(document.body).paddingRight)||0;r.setProperty("padding-right",s+a+"px","important")}return i.setProperty("overflow","hidden","important"),i.setProperty("overscroll-behavior-y","none","important"),r.setProperty("overflow","hidden","important"),r.setProperty("overscroll-behavior-y","none","important"),o&&(e.fixedBodyLock=!0,r.setProperty("position","fixed","important"),r.setProperty("top",-e.scrollY+"px","important"),r.setProperty("left",-e.scrollX+"px","important"),r.setProperty("right","0","important"),r.setProperty("width","100%","important")),e}function Ui(e){if(e){var r=document.body.style,i=document.documentElement.style;ae(i,"overflow",e.rootOverflow,e.rootOverflowPriority),ae(i,"overscroll-behavior-y",e.rootOverscrollBehaviorY,e.rootOverscrollBehaviorYPriority),ae(r,"overflow",e.bodyOverflow,e.bodyOverflowPriority),ae(r,"padding-right",e.bodyPaddingRight,e.bodyPaddingRightPriority),ae(r,"overscroll-behavior-y",e.bodyOverscrollBehaviorY,e.bodyOverscrollBehaviorYPriority),ae(r,"position",e.bodyPosition,e.bodyPositionPriority),ae(r,"top",e.bodyTop,e.bodyTopPriority),ae(r,"left",e.bodyLeft,e.bodyLeftPriority),ae(r,"right",e.bodyRight,e.bodyRightPriority),ae(r,"width",e.bodyWidth,e.bodyWidthPriority),e.fixedBodyLock&&window.scrollTo(e.scrollX,e.scrollY)}}function Ki(){var e=document.activeElement;return!e||e===document.body||e===document.documentElement?null:e}function Fe(e){if(!(!e||!document.contains(e)||typeof e.focus!="function"))try{e.focus({preventScroll:!0})}catch(r){try{e.focus()}catch(i){}}}function Xi(e){return!e||e.disabled||e.getAttribute("aria-hidden")==="true"?!1:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function pi(e){var r=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(e.querySelectorAll(r)).filter(Xi)}function mi(e){var r=pi(e),i=r[0]||e.querySelector('[role="dialog"]')||e;Fe(i)}function Ji(e,r){if(e.key==="Tab"){var i=pi(r);if(!i.length){e.preventDefault(),mi(r);return}var a=i[0],t=i[i.length-1],o=document.activeElement;if(!r.contains(o)){e.preventDefault(),Fe(a);return}e.shiftKey&&o===a?(e.preventDefault(),Fe(t)):!e.shiftKey&&o===t&&(e.preventDefault(),Fe(a))}}function Zi(){var e={id:"ikr-modal-"+Date.now()+"-"+Math.random().toString(36).slice(2),previousState:null,pushed:!1,url:window.location.href};try{e.previousState=history.state,history.pushState({ikrModal:e.id},"",e.url),e.pushed=!0}catch(r){}return e}function $i(e){return!!(e&&e.pushed&&window.location.href===e.url&&history.state&&history.state.ikrModal===e.id)}function Qi(e){if($i(e))try{history.replaceState(e.previousState,"",e.url)}catch(r){}}function ci(e,r,i,a,t){Ui(a),document.removeEventListener("keydown",r),window.removeEventListener("popstate",i),e.parentNode&&e.parentNode.removeChild(e),Fe(t)}function et(e){var r=document.createElement("div");r.className="ikr-modal-right";var i=document.createElement("div");i.className="ikr-modal-scroll-content";var a=document.createElement("div");a.className="ikr-modal-top-row";var t=document.createElement("div");t.className="ikr-modal-stars",t.innerHTML=ue(e.rating,A);var o=document.createElement("span");o.className="ikr-modal-date",o.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(o),i.appendChild(a);var s=document.createElement("div");s.className="ikr-modal-title",s.textContent=e.title||"",s.style.display=e.title?"":"none",i.appendChild(s);var l=document.createElement("div");l.className="ikr-modal-author",l.textContent=e.author||"",i.appendChild(l);var c=document.createElement("div");c.className="ikr-modal-body",c.textContent=(e.comment||"").trim(),c.style.display=e.comment&&e.comment.trim()?"":"none",i.appendChild(c);var m=document.createElement("div");m.className="ikr-modal-reply";var v=document.createElement("div");v.className="ikr-modal-reply-label",v.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi";var p=document.createElement("div");return p.className="ikr-modal-reply-text",p.textContent=e.merchantReply||"",m.appendChild(v),m.appendChild(p),m.style.display=e.merchantReply?"":"none",i.appendChild(m),r.appendChild(i),r}function ui(e,r,i){var a=i||A,t=e.querySelector(".ikr-modal-scroll-content"),o=t.querySelector(".ikr-modal-stars");o.innerHTML=ue(r.rating,a),t.querySelector(".ikr-modal-date").textContent=fe(r.createdAt);var s=t.querySelector(".ikr-modal-title");s.textContent=r.title||"",s.style.display=r.title?"":"none",t.querySelector(".ikr-modal-author").textContent=r.author||"";var l=t.querySelector(".ikr-modal-body");l.textContent=(r.comment||"").trim(),l.style.display=r.comment&&r.comment.trim()?"":"none";var c=t.querySelector(".ikr-modal-reply");c.querySelector(".ikr-modal-reply-label").textContent=a&&a.merchantReplyLabel||"Ma\u011Faza Sahibi",c.querySelector(".ikr-modal-reply-text").textContent=r.merchantReply||"",c.style.display=r.merchantReply?"":"none",e.scrollTop=0}function zr(e,r,i,a,t,o,s,l,c){var m=Me(e),v=Math.max(0,Math.min(i||0,m.length-1)),p=document.createElement("div");p.className="ikr-modal-left";var n=document.createElement("img"),f=s==="next"?"ikr-modal-img-enter-right":s==="prev"?"ikr-modal-img-enter-left":"";n.className="ikr-modal-main-img"+(f?" "+f:""),n.src=br(m[v]||""),n.decoding="async",n.width=hr,n.height=Math.round(hr*4/3),n.alt="Yorum foto\u011Fraf\u0131",ei(n,function(E){if(E.style.display="none",!p.querySelector(".ikr-modal-img-error")){var T=document.createElement("div");T.className="ikr-modal-img-error",T.setAttribute("role","status"),T.textContent="Bu g\xF6rsel \u015Fu anda y\xFCklenemiyor.",p.insertBefore(T,E)}}),p.appendChild(n);var d=document.createElement("button");d.className="ikr-modal-close-mobile",d.textContent="\u2715",d.setAttribute("aria-label","Kapat"),d.onclick=function(E){E.stopPropagation(),o()},p.appendChild(d);var u=0;if(p.addEventListener("touchstart",function(E){u=E.touches[0].clientX},{passive:!0}),p.addEventListener("touchend",function(E){var T=u-E.changedTouches[0].clientX;if(!(Math.abs(T)<50)){if(T>0){if(x)ve(e,r,v+1,a,t,o,!0,"next",l,c);else if(b){var y=a[r+1];ve(y,r+1,0,a,t,o,!1,"next",l,c)}}else if(k)ve(e,r,v-1,a,t,o,!0,"prev",l,c);else if(S){var P=a[r-1],N=Me(P);ve(P,r-1,N.length-1,a,t,o,!1,"prev",l,c)}}},{passive:!0}),m.length>1){var g=document.createElement("div");g.className="ikr-modal-thumbs",m.forEach(function(E,T){var y=document.createElement("img"),P=ie(E,rr);y.src=P.src,y.srcset=P.srcset,y.loading="lazy",y.decoding="async",y.width=rr,y.height=rr,y.className="ikr-modal-thumb"+(T===v?" ikr-modal-thumb-active":""),y.alt="K\xFC\xE7\xFCk resim "+(T+1),te(y),y.tabIndex=0,y.setAttribute("role","button"),y.setAttribute("aria-label","K\xFC\xE7\xFCk resim "+(T+1)+" se\xE7"),T===v&&y.setAttribute("aria-current","true"),(function(N){function L(){ve(e,r,N,a,t,o,!0,null,l,c)}y.onclick=L,y.onkeydown=function(B){(B.key==="Enter"||B.key===" ")&&(B.preventDefault(),L())}})(T),g.appendChild(y)}),p.appendChild(g)}var k=v>0,x=v<m.length-1,S=r>0,b=r<a.length-1,C=k||S,w=x||b;if(C){var h=document.createElement("button");h.className="ikr-modal-nav ikr-modal-nav-prev",h.innerHTML="&#8249;",h.setAttribute("aria-label","\xD6nceki"),h.onclick=function(E){if(E.stopPropagation(),k)ve(e,r,v-1,a,t,o,!0,"prev",l,c);else if(S){var T=a[r-1],y=Me(T);ve(T,r-1,y.length-1,a,t,o,!1,"prev",l,c)}},p.appendChild(h)}if(w){var z=document.createElement("button");z.className="ikr-modal-nav ikr-modal-nav-next",z.innerHTML="&#8250;",z.setAttribute("aria-label","Sonraki"),z.onclick=function(E){if(E.stopPropagation(),x)ve(e,r,v+1,a,t,o,!0,"next",l,c);else if(b){var T=a[r+1];ve(T,r+1,0,a,t,o,!1,"next",l,c)}},p.appendChild(z)}return p}function fi(e,r){[-1,1].forEach(function(i){var a=r[e+i];if(a){var t=Me(a);t[0]&&(new Image().src=br(t[0]))}})}function xr(e){if(e){if(typeof e.scrollTo=="function")try{e.scrollTo({top:0,left:0,behavior:"auto"});return}catch(r){}e.scrollTop=0,e.scrollLeft=0}}function rt(e,r){var i=e&&e.querySelector(".ikr-modal-wrap"),a=r&&r.querySelector(".ikr-modal-right"),t=r&&r.querySelector(".ikr-modal-scroll-content");function o(){xr(i),xr(a),xr(t)}o(),i&&Fe(i),typeof requestAnimationFrame=="function"?requestAnimationFrame(function(){o(),requestAnimationFrame(o)}):setTimeout(o,0)}function ve(e,r,i,a,t,o,s,l,c,m){if(m&&(m.currentReview=e),s){var v=zr(e,r,i,a,t,o,l,c,m);t.firstChild&&t.replaceChild(v,t.firstChild)}else{var v=zr(e,r,i,a,t,o,l,c,m),p=t.querySelector(".ikr-modal-right");t.firstChild&&t.replaceChild(v,t.firstChild),p&&ui(p,e,m&&m.currentSettings),rt(c,t)}fi(r,a)}function ne(e,r,i){var a=Me(e);if(!a.length)return;var t=(i||[]).filter(function(b){return Me(b).length>0}),o=t.findIndex(function(b){return b===e||b.id===e.id});o===-1&&(t.unshift(e),o=0);var s=a.indexOf(r);s<0&&(s=0);var l=document.createElement("div");l.className="ikr-modal-overlay";var c=document.createElement("div");c.className="ikr-modal";var m=!1,v=Ki(),p=qi(),n=Zi(),f={currentReview:e,currentSettings:A};function d(b){var C=b&&b.detail&&b.detail.settings;f.currentSettings=C||A;var w=c.querySelector(".ikr-modal-right");!w||!f.currentReview||ui(w,f.currentReview,f.currentSettings)}function u(){m||(m=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),ci(l,g,u,p,v))}function g(b){if(b.key==="Escape"){k();return}Ji(b,l)}function k(){m||(m=!0,window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),ci(l,g,u,p,v),Qi(n))}document.addEventListener("keydown",g),window.addEventListener("popstate",u),window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",d),l.onclick=function(){k()},c.onclick=function(b){b.stopPropagation()},c.appendChild(zr(e,o,s,t,c,k,null,l,f)),c.appendChild(et(e)),fi(o,t);var x=document.createElement("div");x.className="ikr-modal-wrap",x.tabIndex=-1,x.setAttribute("role","dialog"),x.setAttribute("aria-modal","true"),x.setAttribute("aria-label","Yorum foto\u011Fraf\u0131 detay\u0131"),x.appendChild(c);var S=document.createElement("button");S.className="ikr-modal-close",S.textContent="\u2715",S.setAttribute("aria-label","Kapat"),S.onclick=function(b){b.stopPropagation(),k()},x.appendChild(S),l.appendChild(x),document.body.appendChild(l),mi(l)}function vi(e){var r=ir();if(r&&typeof r.findProductTitle=="function")try{var i=r.findProductTitle(e);if(i)return i}catch(s){}if(e)for(var a=document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p"),t=0;t<a.length;t++){var o=a[t];if(o.children.length===0&&o.textContent.trim()===e&&o.tagName!=="TITLE"&&!o.closest("[data-ikr-listing-badge]")&&!o.closest("[data-renuvex-slot]")&&!o.closest("#ikas-reviews")&&!o.closest("nav")&&!o.closest("header")&&!o.closest('[class*="breadcrumb"]')&&!o.closest('[aria-label*="breadcrumb"]'))return o}return document.querySelector("h1")}var or=null,lr=null;function it(e,r){return we(e,r)}function tt(e){var r=ir();if(r&&typeof r.getProductBadgeMountPoint=="function")try{var i=r.getProductBadgeMountPoint(e);if(i&&i.parent)return i}catch(a){}return oi(e)}function Cr(e,r,i,a,t,o,s){or&&(or.disconnect(),or=null),lr&&(lr.disconnect(),lr=null),ai("product-title-rating","product-title-badge");var l=document.querySelector(".ikr-rating-badge--pdp");if(l&&l.remove(),!!e&&!(a&&a.enabled===!1)){var c=document.getElementById("ikr-jsonld");c&&c.remove();var m=document.createElement("script");m.id="ikr-jsonld",m.type="application/ld+json",m.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Product",name:i||document.title,url:window.location.href,aggregateRating:{"@type":"AggregateRating",ratingValue:e,reviewCount:r,bestRating:"5",worstRating:"1"}}),document.head.appendChild(m);var v=vi(i);if(!v||!v.parentNode){vr("dom-conflict","PDP product title could not be found for badge placement",{surface:"pdp-badge",reason:"title_not_found",productName:i||"",productId:o||""});return}var p=tt(v);if(!p||!p.parent){vr("dom-conflict","PDP badge mount point could not be resolved",{surface:"pdp-badge",reason:"mount_not_found",productName:i||"",productId:o||""});return}var n=a&&a.size||"medium",f=qe[n]||qe.medium,d=null;if(a&&a.mobileOverride===!0){var u=a.mobileSize||"small";d=qe[u]||qe.small}ni(f,d);var g=tr({slot:"product-title-rating",legacySlot:"product-title-badge",className:"renuvex-pr-product-badge-slot ikr-product-badge-slot",context:{surface:"pdp",productId:o||""}}),k=document.createElement("a");k.className="renuvex-pr-rating-badge ikr-rating-badge ikr-rating-badge--pdp",k.href="#ikas-reviews";var x=Jr(e,r);k.setAttribute("aria-labelledby",x.id),k.setAttribute("data-ikr-surface","pdp"),k.setAttribute("data-renuvex-surface","pdp"),k.setAttribute("data-ikr-rating",String(e)),k.setAttribute("data-renuvex-rating",String(e)),k.setAttribute("data-ikr-count",String(r)),k.setAttribute("data-renuvex-count",String(r)),ar(k,{surface:"pdp",productId:o||""});var S=window.getComputedStyle(v).textAlign,b=S==="center"?"center":S==="right"?"right":"left";k.setAttribute("data-ikr-align",b),k.insertAdjacentHTML("beforeend",x.html+it(e,t));var C=document.createElement("span");C.className="ikr-rating-badge__label",C.textContent=e+" ("+r+" yorum)",k.appendChild(C),k.onclick=function(w){w.preventDefault();var h=document.getElementById("ikas-reviews-widget")||document.getElementById("ikas-reviews");if(h){var z=document.querySelector("header"),E=z?z.getBoundingClientRect().height:0,T=h.getBoundingClientRect().top+window.pageYOffset-E-16;window.scrollTo({top:T,behavior:"smooth"})}},g.appendChild(k),li(g,p),lr=di(g,p,{surface:"pdp-badge",reason:"position_reanchored",message:"PDP badge slot reordered after render",extra:{productName:i||"",productId:o||""}}),je(g,"pdp-badge",{productName:i||"",productId:o||""}),s||(or=Mr(g,"pdp-badge",function(){Cr(e,r,i,a,t,o,!0)},{productName:i||"",productId:o||""}))}}var ki=`
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

${Zr}

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
`;var Tr={};ge(Tr,{meta:()=>ut,render:()=>ft});function _e(e){var r=e.ratingCounts,i=e.allCount,a=e.iconPair,t=e.currentRatingFilter,o=e.onFilterChange;ye(a);var s=document.createElement("div");s.className="ikr-summary-block ikr-summary-bars";for(var l=5;l>=1;l--){var c=r[l-1]||0,m=i>0?Math.round(c/i*100):0,v=t===l,p=document.createElement("div");p.className="ikr-bar-row"+(v?" ikr-bar-active":""),t&&!v&&(p.style.opacity="0.35");for(var n="",f=1;f<=5;f++){var d=f<=l;n+='<span class="ikr-bar-star ikr-icon '+(d?"ikr-bar-star-filled":"ikr-bar-star-empty")+'">'+W(d?"full":"outline")+"</span>"}p.innerHTML='<span class="ikr-bar-label">'+n+'</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:'+m+'%;"></div></div><span class="ikr-bar-count">('+c.toLocaleString("tr-TR")+")</span>",(function(u){p.onclick=function(){o(u)}})(l),s.appendChild(p)}return s}var oe=[],gi=!1;function at(e){for(var r=oe.length-1;r>=0;r--){var i=oe[r];i.trigger&&i.trigger.contains(e.target)||i.element&&i.element.contains(e.target)||i.close()}}function nt(e){if(e.key==="Escape")for(var r=oe.length-1;r>=0;r--)oe[r].close()}function ot(){gi||typeof document=="undefined"||(document.addEventListener("click",at,!0),document.addEventListener("keydown",nt),gi=!0)}function dr(e){for(var r=0;r<oe.length;r++)oe[r]!==e&&oe[r].close()}function sr(e){ot();var r={trigger:e.trigger,element:e.element,close:e.close};return oe.push(r),function(){var a=oe.indexOf(r);a!==-1&&oe.splice(a,1)}}function X(e){var r=e.widget,i=e.currentOrderBy,a=e.currentHasImages,t=e.onWriteClick,o=e.onSortChange,s=document.createElement("div");s.className="ikr-summary-block ikr-summary-actions";var l=document.createElement("button");l.className="ikr-write-btn",l.textContent=A&&A.writeButtonText||"Yorum Yap",l.onclick=t,s.appendChild(l);var c=document.createElement("div");c.className="ikr-filter-wrap";var m=document.createElement("button");m.type="button",m.className="ikr-filter-btn",m.setAttribute("aria-label","Filtrele"),m.setAttribute("aria-haspopup","menu"),m.setAttribute("aria-expanded","false");var v=A&&A.filterIcon||"lines";m.innerHTML=G(Kr(v));var p=document.createElement("div");p.className="ikr-filter-menu",p.setAttribute("role","menu");var n=[["newest","En Yeni",!1],["highest","En Y\xFCksek Puan",!1],["lowest","En D\xFC\u015F\xFCk Puan",!1],["photos","Foto\u011Frafl\u0131",!0]],f=!1;function d(k){var x=p.classList.contains("ikr-open");p.classList.remove("ikr-open"),m.classList.remove("ikr-filter-btn-active"),m.setAttribute("aria-expanded","false");var S=k&&(k.restoreFocus===!0||k.restoreFocus==="auto"&&Ke());if(x&&S)try{m.focus({preventScroll:!0})}catch(b){try{m.focus()}catch(C){}}}function u(){dr(g),p.classList.add("ikr-open"),m.classList.add("ikr-filter-btn-active"),m.setAttribute("aria-expanded","true");var k=p.querySelector(".ikr-filter-item-active")||p.querySelector(".ikr-filter-item");k&&requestAnimationFrame(function(){try{k.focus({preventScroll:!0})}catch(x){try{k.focus()}catch(S){}}})}n.forEach(function(k){var x=k[2],S=x?a:!a&&(i||"newest")===k[0],b=document.createElement("button");b.type="button",b.className="ikr-filter-item"+(S?" ikr-filter-item-active":""),b.setAttribute("role","menuitem"),b.textContent=k[1];var C=!1;function w(h,z){h&&(h.preventDefault(),h.stopPropagation()),!C&&(C=!0,f=!0,d({restoreFocus:z}),o(k[0],x),setTimeout(function(){C=!1,f=!1},0))}b.addEventListener("pointerdown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),typeof window!="undefined"&&!window.PointerEvent&&b.addEventListener("touchstart",function(h){w(h,!1)},{passive:!1}),b.addEventListener("mousedown",function(h){h.button!==void 0&&h.button!==0||w(h,!1)}),b.addEventListener("keydown",function(h){(h.key==="Enter"||h.key===" ")&&w(h,!0)}),b.onclick=function(h){w(h,!1)},p.appendChild(b)}),m.onclick=function(){p.classList.contains("ikr-open")?d({restoreFocus:"auto"}):u()},c.addEventListener("keydown",function(k){k.key==="Escape"&&p.classList.contains("ikr-open")&&(k.stopPropagation(),d({restoreFocus:!0}))}),c.addEventListener("focusout",function(k){if(p.classList.contains("ikr-open")&&!f){var x=k.relatedTarget;x&&c.contains(x)||d()}});var g=sr({trigger:c,element:p,close:d});return c.appendChild(m),c.appendChild(p),s.appendChild(c),s}function hi(e){var r=e&&e.onClose?e.onClose:function(){},i=e&&e.allowOutsideClose!==!1,a=document.createElement("div");a.className="ikr-fwizard-overlay",a.tabIndex=-1,a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Yorum yapma formu");var t=document.createElement("div");t.className="ikr-fwizard",a.appendChild(t);var o=document.createElement("button");o.className="ikr-fwizard-close",o.type="button",o.setAttribute("aria-label","Kapat"),o.innerHTML=G('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),t.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-content",t.appendChild(s);var l=!1,c=null,m=!1,v="",p="";function n(){var y=document.activeElement;return!y||y===document.body||y===document.documentElement?null:y}function f(y){if(!(!y||!document.contains(y)||typeof y.focus!="function"))try{y.focus({preventScroll:!0})}catch(P){try{y.focus()}catch(N){}}}function d(y){if(!y||y.disabled||y.getAttribute("aria-hidden")==="true")return!1;var P=window.getComputedStyle?window.getComputedStyle(y):null;return P&&(P.display==="none"||P.visibility==="hidden")?!1:!!(y.offsetWidth||y.offsetHeight||y.getClientRects().length)}function u(y){var P=["a[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");return Array.prototype.slice.call(y.querySelectorAll(P)).filter(d)}function g(){var y=u(s),P=u(a),N=y[0]||P[0]||a;f(N)}function k(y){if(y.key==="Tab"){var P=u(a);if(!P.length){y.preventDefault(),f(a);return}var N=P[0],L=P[P.length-1],B=document.activeElement;if(!a.contains(B)){y.preventDefault(),f(N);return}y.shiftKey&&B===N?(y.preventDefault(),f(L)):!y.shiftKey&&B===L&&(y.preventDefault(),f(N))}}function x(){var y=window.innerWidth-document.documentElement.clientWidth;v=document.body.style.overflow,p=document.body.style.paddingRight,document.body.style.overflow="hidden",y>0&&(document.body.style.paddingRight=y+"px")}function S(){document.body.style.overflow=v,document.body.style.paddingRight=p}function b(){l||(l=!0,document.removeEventListener("keydown",C),a.removeEventListener("click",w),o.removeEventListener("click",b),a.classList.remove("ikr-fwizard-open"),setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a),S(),m&&f(c);try{r()}catch(y){}},200))}function C(y){if(y.key==="Escape"){b();return}k(y)}function w(y){y.target===a&&i&&b()}document.addEventListener("keydown",C),a.addEventListener("click",w),o.addEventListener("click",b);function h(y){c=n(),m=Ke(),y&&s.appendChild(y),document.body.appendChild(a),x(),requestAnimationFrame(function(){a.classList.add("ikr-fwizard-open"),g()})}var z=null,E=null;function T(y,P){if(P=P||"error",z){try{z.remove()}catch(N){}z=null}E&&(clearTimeout(E),E=null),z=document.createElement("div"),z.className="ikr-fwizard-toast ikr-fwizard-toast--"+P,z.textContent=y,t.appendChild(z),E=setTimeout(function(){z&&(z.classList.add("ikr-fwizard-toast--exit"),setTimeout(function(){if(z){try{z.remove()}catch(N){}z=null}},300))},4e3)}return{open:h,close:b,content:s,setAllowOutsideClose:function(y){i=!!y},setStepAttr:function(y){t.setAttribute("data-step",String(y))},focusFirstControl:g,showToast:T}}var bi=`
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
`;var Sr=4;function Oe(e,r){if(!r)return!1;switch(e){case 1:return r.rating>0;case 2:return!0;case 3:return!!(r.comment&&r.comment.trim().length>0);case 4:return!!(r.author&&r.author.trim().length>0);default:return!0}}function yi(e){e=e||{};var r=[],i={currentStep:1,rating:0,title:"",comment:"",author:"",email:"",images:[],pendingImages:[],fingerprints:[],productId:e.productId||"",productName:e.productName||""};function a(){r.forEach(function(t){try{t(i)}catch(o){}})}return{get:function(){return i},set:function(t){Object.assign(i,t),a()},goNext:function(){i.currentStep<Sr&&(i.currentStep+=1,a())},goBack:function(){i.currentStep>1&&(i.currentStep-=1,a())},onChange:function(t){return r.push(t),function(){r=r.filter(function(o){return o!==t})}}}}var lt='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';function wi(e){e=e||{};var r=e.skippableSteps||[],i=e.nextableSteps||[],a=e.onBack||function(){},t=e.onSkip||function(){},o=e.onNext||function(){},s=document.createElement("div");s.className="ikr-fwizard-footer";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-nav-btn ikr-fwizard-footer-back",l.setAttribute("aria-label","Geri"),l.innerHTML=G(lt)+"<span>Geri</span>",l.addEventListener("click",function(){a()}),s.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-footer-progress";for(var m=[],v=0;v<Sr;v++){var p=document.createElement("span");p.className="ikr-fwizard-progress-seg",c.appendChild(p),m.push(p)}s.appendChild(c);var n=document.createElement("button");n.type="button";var f=null;function d(g){f&&n.removeEventListener("click",f),f=g,g&&n.addEventListener("click",g)}s.appendChild(n);function u(g,k){var x=r.indexOf(g)!==-1,S=i.indexOf(g)!==-1,b=k&&(k.images&&k.images.length>0||k.pendingImages&&k.pendingImages.length>0);if(x)g===2&&b?(n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",d(function(){o()})):(n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.setAttribute("aria-label","Atla"),n.innerHTML="<span>Atla</span>",d(function(){t()})),n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),n.style.visibility="",n.tabIndex=0;else if(S){n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Sonraki"),n.innerHTML="Sonraki",n.style.visibility="",n.tabIndex=0;var C=Oe(g,k);n.disabled=!C,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!C),d(function(){n.disabled||o()})}else n.className="ikr-fwizard-nav-btn ikr-fwizard-footer-skip",n.innerHTML="",n.style.visibility="hidden",n.tabIndex=-1,n.disabled=!0,d(null)}return{el:s,update:function(g,k){m.forEach(function(S,b){b+1<=g?S.classList.add("ikr-fwizard-progress-seg-active"):S.classList.remove("ikr-fwizard-progress-seg-active")});var x=g<=1;l.style.visibility=x?"hidden":"",l.style.pointerEvents=x?"none":"",l.tabIndex=x?-1:0,u(g,k)},setNextDisabled:function(g){n.classList.contains("ikr-fwizard-cta-btn")&&(n.disabled=!!g,n.classList.toggle("ikr-fwizard-cta-btn--disabled",!!g))},setThanksState:function(g){l.style.visibility="hidden",c.style.visibility="hidden",n.className="ikr-fwizard-cta-btn ikr-fwizard-footer-next",n.setAttribute("aria-label","Devam Et"),n.innerHTML="Devam Et",n.style.visibility="",n.disabled=!1,n.classList.remove("ikr-fwizard-cta-btn--disabled"),d(g)}}}function xi(e,r){r=r||{};var i=document.createElement("div");i.className="ikr-fwizard-step ikr-fwizard-step-rating";var a=!1,t=null,o=document.createElement("div");o.className="ikr-fwizard-step-title",o.textContent="Bu \xFCr\xFCn\xFC nas\u0131l de\u011Ferlendirirsiniz?",i.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-stars",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Y\u0131ld\u0131z puan\u0131");var l=We(A||{});ye(l);var c=[];function m(f){c.forEach(function(d,u){var g=u<f;d.classList.toggle("ikr-fwizard-star-active",g),d.setAttribute("aria-checked",u+1===f?"true":"false"),d.innerHTML=g?W("full"):W("outline")})}function v(f,d){d&&typeof d.preventDefault=="function"&&d.preventDefault(),d&&typeof d.stopPropagation=="function"&&d.stopPropagation(),!a&&(a=!0,e.set({rating:f}),m(f),t&&clearTimeout(t),t=setTimeout(function(){e.goNext()},280))}for(var p=1;p<=5;p++)(function(f){var d=document.createElement("button");d.type="button",d.className="ikr-fwizard-star",d.setAttribute("role","radio"),d.setAttribute("aria-label",f+" y\u0131ld\u0131z"),d.innerHTML=W("outline"),d.addEventListener("mouseenter",function(){m(f)}),d.addEventListener("mouseleave",function(){m(e.get().rating)}),d.addEventListener("pointerdown",function(u){u.button&&u.button!==0||v(f,u)}),typeof window!="undefined"&&!window.PointerEvent&&d.addEventListener("touchstart",function(u){v(f,u)},{passive:!1}),d.addEventListener("mousedown",function(u){window.PointerEvent||v(f,u)}),d.addEventListener("keydown",function(u){(u.key==="Enter"||u.key===" ")&&v(f,u)}),d.addEventListener("click",function(u){v(f,u)}),c.push(d),s.appendChild(d)})(p);m(e.get().rating);var n=function(f){var d=f&&f.detail&&f.detail.settings;l=We(d||A||{}),m(e.get().rating)};return window.addEventListener("IKR_SETTINGS_UPDATED_PREVIEW",n),i.appendChild(s),{el:i,destroy:function(){t&&clearTimeout(t),window.removeEventListener("IKR_SETTINGS_UPDATED_PREVIEW",n)}}}var zi=3,dt=10*1024*1024;function Ci(e,r){r=r||{};var i=!1,a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-photos";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Foto\u011Frafl\u0131 de\u011Ferlendirme",a.appendChild(t);var o=document.createElement("div");o.className="ikr-fwizard-step-subtitle",o.textContent="Foto\u011Fraf ekleyebilirsiniz.",a.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-photo-card";var l=document.createElement("button");l.type="button",l.className="ikr-fwizard-photo-add",l.setAttribute("aria-label","Foto\u011Fraf ekle"),l.innerHTML=G('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>')+"<span>Foto\u011Fraf Ekle</span>";var c=document.createElement("input");c.type="file",c.accept="image/*",c.multiple=!0,c.style.display="none",s.appendChild(l),s.appendChild(c);var m=document.createElement("div");m.className="ikr-fwizard-photo-previews",m.setAttribute("aria-live","polite"),s.appendChild(m),a.appendChild(s);var v=r.blobMap||{},p=r.urlToFinger||{};function n(){if(!i){var S=e.get().images||[],b=e.get().pendingImages||[],C=S.map(function(w){return{url:w,isPending:!1}}).concat(b.map(function(w){return{url:w.url,file:w.file,isPending:!0,error:w.error}}));m.innerHTML="",C.forEach(function(w){var h=v[w.url]||w.url,z=f(w,h);m.appendChild(z)}),k()}}function f(S,b){var C=document.createElement("div");C.className="ikr-fwizard-photo-thumb";var w=document.createElement("img");w.src=b,w.alt="",w.style.cssText="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;",C.appendChild(w);var h=document.createElement("div");h.className="ikr-fwizard-photo-loading",h.style.display="none",C.appendChild(h);var z=document.createElement("button");return z.type="button",z.className="ikr-fwizard-photo-remove",z.innerHTML="&#x2715;",C.appendChild(z),d(C,S,b),C}function d(S,b,C){var w=S.querySelector("img");w.src!==C&&(w.src=C);var h=S.querySelector(".ikr-fwizard-photo-loading");if(b.isPending&&b.error){h.style.display="flex",h.textContent="";var z=document.createElement("span");z.className="ikr-upload-error",z.textContent="\u2717 "+b.error,h.appendChild(z)}else h.style.display="none",h.textContent="";var E=S.querySelector(".ikr-fwizard-photo-remove");E.onclick=function(){var T=p[b.url]||(b.file?b.file.name+"_"+b.file.size:null);if(b.url.startsWith("blob:")&&URL.revokeObjectURL(b.url),T){var y=(e.get().fingerprints||[]).filter(function(L){return L!==T});e.set({fingerprints:y})}if(b.isPending){var P=(e.get().pendingImages||[]).filter(function(L){return L.url!==b.url});e.set({pendingImages:P})}else{var N=(e.get().images||[]).filter(function(L){return L!==b.url});e.set({images:N})}}}var u='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',g='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';function k(){var S=(e.get().images||[]).length,b=(e.get().pendingImages||[]).length,C=S+b,w=C>=zi;C>0?(s.classList.add("ikr-fwizard-photo-card--compact"),l.innerHTML=G(g)):(s.classList.remove("ikr-fwizard-photo-card--compact"),l.innerHTML=G(u)+"<span>Foto\u011Fraf Ekle</span>"),w?(l.style.display="none",l.disabled=!0,c.disabled=!0):(l.style.display="flex",l.disabled=!1,c.disabled=!1,l.classList.remove("ikr-fwizard-photo-add--disabled"))}l.addEventListener("click",function(){c.disabled||c.click()}),c.onchange=async function(S){var b=(e.get().images||[]).length+(e.get().pendingImages||[]).length,C=Array.from(S.target.files).slice(0,zi-b);c.value="";var w=(e.get().pendingImages||[]).length,h=e.get().images||[],z=h.length;if(C.length!==0){for(var E=[],T=[],y=0;y<C.length;y++){var P=C[y],N=P.name+"_"+P.size,L=(e.get().fingerprints||[]).some(function(F){return F===N})||E.some(function(F){return F.file.name+"_"+F.file.size===N});if(L){console.log("[ikr] Duplicate file detected, skipping:",P.name);continue}if(P.size>dt){var B="10MB'dan daha b\xFCy\xFCk foto\u011Fraflar\u0131 y\xFCkleyemezsin.";r.showToast?r.showToast(B,"error"):alert(B);continue}var J=URL.createObjectURL(P);p[J]=N,E.push({url:J,file:P,error:null}),T.push({url:J,file:P});var Z=(e.get().fingerprints||[]).slice();Z.push(N),e.set({fingerprints:Z})}if(E.length!==0){var le=(e.get().pendingImages||[]).concat(E),q=async function(){for(var F=0;F<T.length;F++){var Ne=T[F],De=Ne.file,H=Ne.url;if(typeof window!="undefined"&&window.__ikasPreviewMode){var Se=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),de=(e.get().images||[]).slice();de.push(H),e.set({pendingImages:Se,images:de});continue}try{var se=await ze(be+"/api/public/upload/sign",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he})});if(!se.ok)throw se.status===429?new Error("rate_limit"):new Error("sign failed");var Y=await se.json();if(!Y.folder)throw new Error("sign folder missing");var $=new FormData;$.append("file",De),$.append("api_key",Y.api_key),$.append("timestamp",Y.timestamp),$.append("signature",Y.signature),$.append("folder",Y.folder);var ce=await fetch("https://api.cloudinary.com/v1_1/"+Y.cloud_name+"/image/upload",{method:"POST",body:$}),Q=await ce.json();if(Q.secure_url&&Qr(Q.secure_url)){var Ye=(e.get().pendingImages||[]).some(function(O){return O.url===H});if(!Ye){console.log("[ikr] Upload finished but image was already deleted by user. Aborting state update.");return}v[Q.secure_url]=H,p[Q.secure_url]=p[H];var ke=(e.get().pendingImages||[]).filter(function(O){return O.url!==H}),ee=(e.get().images||[]).slice();ee.push(Q.secure_url),e.set({pendingImages:ke,images:ee});try{ze(be+"/api/public/upload/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,secureUrl:Q.secure_url})}).catch(function(){})}catch(O){}}else throw new Error("invalid image url")}catch(O){console.error("[ikr] Image upload failed:",O);var re=O.message==="rate_limit"?"\xC7ok fazla deneme. Bekleyin.":"Y\xFCkleme ba\u015Far\u0131s\u0131z.";r.showToast&&r.showToast(re,"error");var pe=(e.get().pendingImages||[]).map(function(me){return me.url===H?{url:me.url,file:me.file,error:re}:me});e.set({pendingImages:pe})}}};if(z===0&&w===0){i=!0;var _=!r.canNavigate||r.canNavigate();_&&e.goNext()}e.set({pendingImages:le}),q()}}};var x=e.onChange(n);return n(),{el:a,destroy:function(){i=!0,c.onchange=null,x&&x()}}}var Er=2e3,st=60;function Si(e,r){r=r||{};var i=r.onValidityChange||function(){},a=document.createElement("div");a.className="ikr-fwizard-step ikr-fwizard-step-content";var t=document.createElement("div");t.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",t.textContent="Deneyiminizi anlat\u0131n",a.appendChild(t);var o=document.createElement("div");o.className="ikr-fwizard-content-form";var s=document.createElement("input");s.type="text",s.className="ikr-fwizard-input",s.placeholder="K\u0131sa bir ba\u015Fl\u0131k (opsiyonel)",s.maxLength=st,s.setAttribute("aria-label","Yorum ba\u015Fl\u0131\u011F\u0131"),s.value=e.get().title||"",s.addEventListener("input",function(){e.set({title:s.value})}),o.appendChild(s);var l=document.createElement("textarea");l.className="ikr-fwizard-textarea",l.placeholder="Deneyiminizi anlat\u0131n\u2026",l.maxLength=Er,l.rows=6,l.setAttribute("aria-label","Yorum"),l.value=e.get().comment||"",o.appendChild(l);var c=document.createElement("div");c.className="ikr-fwizard-char-counter",c.setAttribute("aria-live","polite"),o.appendChild(c);function m(){var p=l.value.length;c.textContent=p+"/"+Er,c.classList.toggle("ikr-fwizard-char-counter--max",p>=Er)}function v(){return Oe(3,e.get())}return l.addEventListener("input",function(){e.set({comment:l.value}),m(),i(v())}),a.appendChild(o),m(),setTimeout(function(){i(v())},0),{el:a,destroy:function(){}}}var ct=40;function Ei(e,r){r=r||{};var i=r.onValidityChange||function(){},a=r.onSuccess||function(){},t=document.createElement("div");t.className="ikr-fwizard-step ikr-fwizard-step-author";var o=document.createElement("div");o.className="ikr-fwizard-step-title ikr-fwizard-step-title--lg",o.textContent="Hakk\u0131n\u0131zda",t.appendChild(o);var s=document.createElement("div");s.className="ikr-fwizard-author-form";var l=document.createElement("div");l.className="ikr-fwizard-field";var c=document.createElement("label");c.className="ikr-fwizard-label",c.innerHTML='Ad\u0131n\u0131z <span class="ikr-fwizard-required" aria-hidden="true">*</span>';var m=document.createElement("input");m.type="text",m.className="ikr-fwizard-input",m.maxLength=ct,m.setAttribute("aria-required","true"),m.value=e.get().author||"",l.appendChild(c),l.appendChild(m),s.appendChild(l);var v=document.createElement("div");v.className="ikr-fwizard-field";var p=document.createElement("label");p.className="ikr-fwizard-label",p.textContent="E-posta (opsiyonel)";var n=document.createElement("input");n.type="email",n.className="ikr-fwizard-input",n.setAttribute("autocomplete","email"),n.value=e.get().email||"",v.appendChild(p),v.appendChild(n),s.appendChild(v);var f=document.createElement("div");f.className="ikr-fwizard-notice",f.textContent="G\xF6nder'e t\u0131klayarak yorumumun \xFCr\xFCn sayfas\u0131nda herkese a\xE7\u0131k \u015Fekilde yay\u0131nlanaca\u011F\u0131n\u0131 kabul ediyorum.",s.appendChild(f);var d=document.createElement("div");d.className="ikr-fwizard-msg",d.setAttribute("role","alert"),d.setAttribute("aria-live","assertive"),s.appendChild(d);var u=document.createElement("button");u.type="button",u.className="ikr-fwizard-submit-btn",u.textContent="G\xF6nder",s.appendChild(u),t.appendChild(s);function g(){return Oe(4,e.get())}function k(){var C=!g(),w=(e.get().pendingImages||[]).length,h=w>0;h?(u.disabled=!0,u.classList.add("ikr-fwizard-submit-btn--disabled"),u.textContent="Foto\u011Fraflar Y\xFCkleniyor..."):(u.disabled=C,u.classList.toggle("ikr-fwizard-submit-btn--disabled",C),u.textContent="G\xF6nder")}m.addEventListener("input",function(){e.set({author:m.value}),k(),i(g())}),n.addEventListener("input",function(){e.set({email:n.value})}),k(),setTimeout(function(){i(g())},0);function x(){d.textContent=""}function S(C){x();var w=document.createElement("div");w.className="ikr-fwizard-msg-error",w.textContent=C||"",d.appendChild(w)}u.onclick=async function(){if(!u.disabled){var C=e.get(),w=(C.author||"").trim(),h=(C.comment||"").trim();if(n.value.trim()&&!n.checkValidity()){n.reportValidity();return}if(!w){S("Gerekli alan");return}if(!C.rating){S("L\xFCtfen bir y\u0131ld\u0131z se\xE7in.");return}u.disabled=!0,u.classList.add("ikr-fwizard-submit-btn--disabled");var z=u.textContent;if(u.textContent="G\xF6nderiliyor\u2026",x(),typeof window!="undefined"&&window.__ikasPreviewMode){setTimeout(function(){a()},600);return}try{var E=Xr(window.location.href),T=C.productName||(document.querySelector("h1")?document.querySelector("h1").innerText.trim():null),y=await ze(be+"/api/public/reviews",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:he,productId:C.productId||null,slug:E||null,productName:T,author:w,title:(C.title||"").trim()||null,comment:h||null,rating:C.rating,images:C.images||[]})},15e3);if(y.ok)a();else{var P=await y.json().catch(function(){return{}});throw new Error(P.error||"Yorum kaydedilemedi.")}}catch(B){var N=B&&(B.name==="AbortError"||/signal/i.test(B.message||"")),L=N?"Ba\u011Flant\u0131 yava\u015F, l\xFCtfen tekrar deneyin.":B.message||"Yorum g\xF6nderilemedi.";r.showToast?r.showToast(L,"error"):S(L),u.disabled=!1,u.classList.remove("ikr-fwizard-submit-btn--disabled"),u.textContent=z}}};var b=e.onChange(k);return{el:t,destroy:function(){u.onclick=null,b&&b()}}}var Ti=!1;function pt(){if(!Ti){var e=document.createElement("style");e.setAttribute("data-ikr-fwizard",""),e.textContent=bi,document.head.appendChild(e),Ti=!0}}function mt(e,r,i){if(i=i||{},e===1)return xi(r,{canNavigate:i.canNavigate});if(e===2)return Ci(r,{canNavigate:i.canNavigate,blobMap:i.blobMap,urlToFinger:i.urlToFinger,showToast:i.showToast});if(e===3)return Si(r,{onValidityChange:i.onValidityChange});if(e===4)return Ei(r,{onValidityChange:i.onValidityChange,onSuccess:i.onSuccess,showToast:i.showToast});var a=document.createElement("div");return a.className="ikr-fwizard-step ikr-fwizard-step-placeholder",{el:a,destroy:function(){}}}function Li(){var e=document.createElement("div");return e.className="ikr-fwizard-step ikr-fwizard-step-thanks",e.innerHTML='<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Te\u015Fekk\xFCrler</div><div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">De\u011Ferlendirmeniz al\u0131nd\u0131.</div>',e}function Pi(e){e=e||{},pt();var r=yi({productId:e.productId,productName:e.productName}),i={},a={},t=hi({onClose:function(){window.removeEventListener("popstate",s),window.history.state&&window.history.state.ikrReviewModal&&window.history.back(),Object.keys(i).forEach(function(w){var h=i[w];h&&h.startsWith("blob:")&&URL.revokeObjectURL(h)}),e.onClose&&e.onClose()},allowOutsideClose:!1}),o={ikrReviewModal:!0};window.history.pushState(o,null,"");var s=function(w){t&&t.close&&t.close()};window.addEventListener("popstate",s);var l=document.createElement("div");l.className="ikr-fwizard-step-wrap";var c=wi({skippableSteps:[2],nextableSteps:[3],onBack:function(){p==="idle"&&r.goBack()},onSkip:function(){p==="idle"&&r.goNext()},onNext:function(){p==="idle"&&r.goNext()}}),m=document.createElement("div");m.className="ikr-fwizard-layout",m.appendChild(l),m.appendChild(c.el);var v=null,p="idle",n=null,f=!0,d=null;function u(w,h){l.innerHTML="";var z=mt(w,r,{canNavigate:function(){return p==="idle"},blobMap:i,urlToFinger:a,onValidityChange:function(y){c.setNextDisabled(!y)},onSuccess:k,showToast:t.showToast});if(v=z,c.update(w,r.get()),h){p="entering",z.el.classList.add("ikr-fwizard-step--enter");var E=null,T=function(){E&&clearTimeout(E),z.el.removeEventListener("animationend",T),z.el.classList.remove("ikr-fwizard-step--enter"),p="idle",n!==null&&x()};z.el.addEventListener("animationend",T),E=setTimeout(T,700)}else p="idle";l.appendChild(z.el),t.setStepAttr&&t.setStepAttr(w),w===3&&c.setNextDisabled(!0)}var g=!1;function k(){if(!g){if(g=!0,!v){l.innerHTML="";var w=Li();w.classList.add("ikr-fwizard-step--enter"),l.appendChild(w),t.setStepAttr("thanks"),c.setThanksState(t.close);return}var h=v;p="exiting",h.el.classList.add("ikr-fwizard-step--exit");var z=function(){if(d&&clearTimeout(d),h.el.removeEventListener("animationend",z),h.destroy)try{h.destroy()}catch(T){}v===h&&(v=null),l.innerHTML="";var E=Li();E.classList.add("ikr-fwizard-step--enter"),l.appendChild(E),t.setStepAttr("thanks"),c.setThanksState(t.close),p="idle"};h.el.addEventListener("animationend",z),d=setTimeout(z,300)}}function x(){var w=r.get().currentStep;if(p!=="idle"){n=w;return}if(!v){var h=!f;f=!1,u(w,h);return}var z=v;p="exiting",z.el.classList.add("ikr-fwizard-step--exit");var E=function(){if(d&&clearTimeout(d),z.el.removeEventListener("animationend",E),z.destroy)try{z.destroy()}catch(y){}if(v===z){l.innerHTML="",v=null;var T=n!==null?n:r.get().currentStep;n=null,u(T,!0),p="idle"}};z.el.addEventListener("animationend",E),d=setTimeout(E,350)}x();var S=r.get().currentStep,b=r.onChange(function(w){w.currentStep!==S?(S=w.currentStep,x()):c.update(w.currentStep,w)}),C=t.close;return t.close=function(){b&&b(),typeof d!="undefined"&&d&&clearTimeout(d),C()},t.open(m),{close:t.close}}function D(){Pi({productId:K||"",productName:Ie||""})}var ut={id:"classic",name:"Klasik (A\xE7\u0131k)"};function ft(e){var r=e.widget,i=e.data,a=e.settings,t=e.iconPair,o=e.allCount,s=e.ratingCounts,l=e.avgRatingVal,c=e.currentRatingFilter,m=e.currentOrderBy,v=e.currentHasImages,p=e.onFilterChange,n=e.onSortChange;ye(t);var f=document.createElement("div");f.className="ikr-summary";var d=(s[3]||0)+(s[4]||0),u=o>0?Math.round(d/o*100):0,g=document.createElement("div");g.className="ikr-summary-block ikr-summary-avg",g.innerHTML='<span class="ikr-avg-star ikr-icon">'+W("full")+'</span><span class="ikr-avg-num">'+l+"</span>",f.appendChild(g);var k=document.createElement("div");if(k.className="ikr-summary-block ikr-summary-count",k.textContent=o.toLocaleString("tr-TR")+" Yorum",f.appendChild(k),a.showRecommendation!==!1&&u>0){var x=document.createElement("div");x.className="ikr-summary-block ikr-summary-recommend",x.innerHTML='<span class="ikr-recommend-pct">%'+u+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",f.appendChild(x)}return f.appendChild(_e({ratingCounts:s,allCount:o,iconPair:t,currentRatingFilter:c,onFilterChange:p})),f.appendChild(X({widget:r,currentOrderBy:m,currentHasImages:v,onWriteClick:D,onSortChange:n})),f}var Lr={};ge(Lr,{css:()=>kt,meta:()=>vt,render:()=>gt});var Ai=`
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
`;var vt={id:"compact",name:"Kompakt (A\xE7\u0131l\u0131r)",sizeOverrides:{small:{"--ikr-compact-star-size":"20px"},medium:{"--ikr-compact-star-size":"24px"},large:{"--ikr-compact-star-size":"28px"}}},kt=Ai;function gt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,m=e.currentHasImages,v=e.onFilterChange,p=e.onSortChange,n=document.createElement("div");n.className="ikr-summary ikr-summary-compact";var f=document.createElement("div");f.className="ikr-compact-header";var d=document.createElement("div");d.className="ikr-compact-trigger-wrap";var u=document.createElement("button");u.className="ikr-compact-trigger",u.type="button",u.setAttribute("aria-expanded","false"),u.innerHTML='<span class="ikr-compact-trigger-stars">'+we(s,a)+'</span><span class="ikr-compact-trigger-text">'+t.toLocaleString("tr-TR")+' Yorum</span><span class="ikr-compact-chevron">'+G('<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.11 5.16L2.16 0.21L0.75 1.62L7.11 7.98L13.48 1.62L12.06 0.21L7.11 5.16Z" fill="currentColor"/></svg>')+"</span>",d.appendChild(u),f.appendChild(d);var g=X({widget:r,currentOrderBy:c,currentHasImages:m,onWriteClick:D,onSortChange:p}),k=g.querySelector(".ikr-filter-wrap"),x=g.querySelector(".ikr-write-btn"),S=document.createElement("div");S.className="ikr-compact-actions-slot",x&&S.appendChild(x),k&&S.appendChild(k),f.appendChild(S),n.appendChild(f);var b=document.createElement("div");b.className="ikr-compact-panel",b.setAttribute("role","dialog"),b.setAttribute("aria-hidden","true");var C=document.createElement("div");C.className="ikr-compact-panel-inner";var w=document.createElement("div");w.className="ikr-compact-avg",w.innerHTML='<span class="ikr-icon">'+W("full")+"</span><span>"+s+"</span>",C.appendChild(w),C.appendChild(_e({ratingCounts:o,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:v})),b.appendChild(C);var h=typeof window!="undefined"&&window.matchMedia?window.matchMedia("(max-width:600px)"):null;function z(_){var F=_?n:d;b.parentNode!==F&&(b.classList.contains("ikr-open")&&(b.classList.remove("ikr-open"),b.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")),F.appendChild(b))}if(z(h?h.matches:!1),h){var E=function(_){z(_.matches)};h.addEventListener?h.addEventListener("change",E):h.addListener&&h.addListener(E)}if(x){var T=document.createElement("button");T.className="ikr-write-btn",T.textContent=A&&A.writeButtonText||"Yorum Yap",T.onclick=D;var y=document.createElement("div");y.className="ikr-compact-write-row",y.appendChild(T),n.appendChild(y)}function P(){b.classList.remove("ikr-open"),b.setAttribute("aria-hidden","true"),u.setAttribute("aria-expanded","false")}function N(){dr(L),b.classList.add("ikr-open"),b.setAttribute("aria-hidden","false"),u.setAttribute("aria-expanded","true")}u.onclick=function(){b.classList.contains("ikr-open")?P():N()};var L=null;function B(_){L&&(L(),L=null),_||(L=sr({trigger:d,element:b,close:P}))}if(B(h?h.matches:!1),h){var J=function(_){B(_.matches)};h.addEventListener?h.addEventListener("change",J):h.addListener&&h.addListener(J)}if(i.showRecommendation!==!1){var Z=(o[3]||0)+(o[4]||0),le=t>0?Math.round(Z/t*100):0;if(le>0){var q=document.createElement("div");q.className="ikr-summary-block ikr-summary-recommend",q.style.marginTop="8px",q.innerHTML='<span class="ikr-recommend-pct">%'+le+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor",C.appendChild(q)}}return n}var Pr={};ge(Pr,{css:()=>bt,meta:()=>ht,render:()=>yt});var Ni=`
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
`;var ht={id:"split",name:"Yatay B\xF6l\xFCnm\xFC\u015F"},bt=Ni;function yt(e){var r=e.widget,i=e.settings,a=e.iconPair,t=e.allCount,o=e.ratingCounts,s=e.avgRatingVal,l=e.currentRatingFilter,c=e.currentOrderBy,m=e.currentHasImages,v=e.onFilterChange,p=e.onSortChange;ye(a);var n=document.createElement("div");n.className="ikr-summary ikr-summary-split";var f=document.createElement("div");f.className="ikr-split-col ikr-split-left";var d=document.createElement("div");d.className="ikr-summary-block ikr-summary-avg ikr-split-left-avg-block",d.innerHTML='<span class="ikr-avg-star ikr-icon">'+W("full")+'</span><span class="ikr-avg-num">'+s+"</span>",f.appendChild(d);var u=document.createElement("div");u.className="ikr-summary-block ikr-summary-count ikr-split-left-count",u.textContent=t.toLocaleString("tr-TR")+" Yorum",f.appendChild(u),n.appendChild(f);var g=document.createElement("div");g.className="ikr-split-col ikr-split-mid",g.appendChild(_e({ratingCounts:o,allCount:t,iconPair:a,currentRatingFilter:l,onFilterChange:v})),n.appendChild(g);var k=X({widget:r,currentOrderBy:c,currentHasImages:m,onWriteClick:D,onSortChange:p}),x=k.querySelector(".ikr-filter-wrap"),S=k.querySelector(".ikr-write-btn"),b=document.createElement("div");b.className="ikr-split-col ikr-split-right",S&&b.appendChild(S),x&&b.appendChild(x),n.appendChild(b);var C=(o[3]||0)+(o[4]||0),w=t>0?Math.round(C/t*100):0,h=document.createElement("div");h.className="ikr-summary-block ikr-summary-recommend",h.innerHTML='<span class="ikr-recommend-pct">%'+w+"</span> bu \xFCr\xFCn\xFC tavsiye ediyor";var z=i.showRecommendation===!1||w===0;return z&&h.classList.add("ikr-split-rec-hidden"),f.appendChild(h),n}var Ar={};ge(Ar,{css:()=>xt,meta:()=>wt,render:()=>zt});var Ri=`
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
`;var wt={id:"minimal",name:"Minimal (Yal\u0131n)",supports:{recommendation:!1,barChart:!1}},xt=Ri;function zt(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-minimal";var m=document.createElement("div");m.className="ikr-minimal-info";var v=document.createElement("div");v.className="ikr-minimal-row";var p=document.createElement("span");p.className="ikr-minimal-avg",p.textContent=t,v.appendChild(p);var n=document.createElement("span");n.className="ikr-minimal-stars",n.innerHTML=we(t,i),v.appendChild(n);var f=document.createElement("span");f.className="ikr-minimal-count",f.textContent=a.toLocaleString("tr-TR")+" Yorum",v.appendChild(f),m.appendChild(v),c.appendChild(m);var d=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:D,onSortChange:l}),u=d.querySelector(".ikr-filter-wrap"),g=d.querySelector(".ikr-write-btn"),k=document.createElement("div");if(k.className="ikr-minimal-actions",g&&k.appendChild(g),u&&k.appendChild(u),c.appendChild(k),g){var x=document.createElement("button");x.className="ikr-write-btn",x.textContent=A&&A.writeButtonText||"Yorum Yap",x.onclick=D;var S=document.createElement("div");S.className="ikr-minimal-write-row",S.appendChild(x),c.appendChild(S)}return c}var Nr={};ge(Nr,{css:()=>St,meta:()=>Ct,render:()=>Et});var Bi=`
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
`;var Ct={id:"hero",name:"Vurgulu (B\xFCy\xFCk Puan)",supports:{recommendation:!1,barChart:!1}},St=Bi;function Et(e){var r=e.widget,i=e.iconPair,a=e.allCount,t=e.avgRatingVal,o=e.currentOrderBy,s=e.currentHasImages,l=e.onSortChange,c=document.createElement("div");c.className="ikr-summary ikr-summary-hero";var m=document.createElement("div");m.className="ikr-hero-info";var v=document.createElement("div");v.className="ikr-hero-rating-col";var p=document.createElement("span");p.className="ikr-hero-avg",p.textContent=t,v.appendChild(p);var n=document.createElement("div");n.className="ikr-hero-meta-row";var f=document.createElement("span");f.className="ikr-hero-stars",f.innerHTML=we(t,i),n.appendChild(f);var d=document.createElement("div");d.className="ikr-hero-count",d.textContent=a.toLocaleString("tr-TR")+" Yorum",n.appendChild(d),v.appendChild(n),m.appendChild(v),c.appendChild(m);var u=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:D,onSortChange:l}),g=u.querySelector(".ikr-filter-wrap"),k=u.querySelector(".ikr-write-btn"),x=document.createElement("div");x.className="ikr-hero-actions ikr-desktop-only",k&&x.appendChild(k),g&&x.appendChild(g),c.appendChild(x);var S=X({widget:r,currentOrderBy:o,currentHasImages:s,onWriteClick:D,onSortChange:l}),b=S.querySelector(".ikr-filter-wrap"),C=S.querySelector(".ikr-write-btn"),w=document.createElement("div");return w.className="ikr-hero-write-row",C&&w.appendChild(C),b&&w.appendChild(b),c.appendChild(w),c}var cr={classic:Tr,compact:Lr,split:Pr,minimal:Ar,hero:Nr};function pr(e){return cr[e]||cr.classic}function Ii(){return Object.keys(cr).map(function(e){return cr[e].css||""}).join(`
`)}var Rr={};ge(Rr,{css:()=>Lt,meta:()=>Tt,render:()=>Pt});function He(e,r){if(!e)return null;var i=document.createElement("div");i.className="ikr-reply";var a=document.createElement("div");a.className="ikr-reply-header";var t=document.createElement("span");t.className="ikr-reply-label",t.textContent=A&&A.merchantReplyLabel||"Ma\u011Faza Sahibi",a.appendChild(t),i.appendChild(a);var o=document.createElement("div");o.className="ikr-reply-text ikr-reply-text-clamped",o.textContent=e,i.appendChild(o);var s=document.createElement("span");return s.className="ikr-read-more ikr-reply-read-more",s.textContent="Devam\u0131n\u0131 oku",s.style.display="none",i.appendChild(s),requestAnimationFrame(function(){if(o.scrollHeight>o.clientHeight+2)if(s.style.display="inline",typeof r=="function")s.onclick=r;else{var l=!1;s.onclick=function(){l=!l,o.classList.toggle("ikr-reply-text-clamped",!l),s.textContent=l?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}}),i}var Tt={id:"card",name:"Kart (Varsay\u0131lan)",sizeOverrides:{small:{"--ikr-card-photo-w":"80px"},medium:{"--ikr-card-photo-w":"110px"},large:{"--ikr-card-photo-w":"140px"}}},Lt="";function Pt(e,r){var i=document.createElement("div");i.className="ikr-review ikr-review-card";var a=document.createElement("div");a.className="ikr-review-top";var t=document.createElement("div");t.className="ikr-review-top-left";var o=document.createElement("span");o.className="ikr-review-stars",o.innerHTML=ue(e.rating,A),t.appendChild(o);var s=document.createElement("span");if(s.className="ikr-date",s.textContent=fe(e.createdAt),a.appendChild(t),a.appendChild(s),i.appendChild(a),e.title){var l=document.createElement("div");l.className="ikr-review-title",l.textContent=e.title,i.appendChild(l)}var c=document.createElement("div");c.className="ikr-author",c.textContent=e.author||"",i.appendChild(c);var m=(e.comment||"").trim();if(m){var v=document.createElement("div");v.className="ikr-body ikr-body-clamped",v.textContent=m,i.appendChild(v);var p=document.createElement("span");p.className="ikr-read-more",p.textContent="Devam\u0131n\u0131 oku",p.style.display="none",i.appendChild(p),requestAnimationFrame(function(){if(v.scrollHeight>v.clientHeight+2){p.style.display="inline";var u=!1;p.onclick=function(){u=!u,v.classList.toggle("ikr-body-clamped",!u),p.textContent=u?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var n=xe(e);if(n.length){var f=document.createElement("div");f.className="ikr-gallery",n.forEach(function(u){var g=document.createElement("img"),k=ie(u,j);g.src=k.src,g.srcset=k.srcset,g.loading="lazy",g.decoding="async",g.width=j,g.height=j,g.className="ikr-img",te(g),g.setAttribute("data-ikr-img-url",u),(function(x){g.onclick=function(){ne(e,x,r)}})(u),f.appendChild(g)}),i.appendChild(f)}var d=He(e.merchantReply);return d&&i.appendChild(d),i}var Br={};ge(Br,{css:()=>Nt,meta:()=>At,render:()=>Rt});var Mi=`
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
`;var At={id:"list",name:"Liste",supports:{},sizeOverrides:{small:{"--ikr-list-photo-w":"80px","--ikr-list-photo-w-mobile":"80px"},medium:{"--ikr-list-photo-w":"110px","--ikr-list-photo-w-mobile":"100px"},large:{"--ikr-list-photo-w":"140px","--ikr-list-photo-w-mobile":"110px"}}},Nt=Mi;function Rt(e,r){var i=xe(e),a=i.length>0,t=document.createElement("div");t.className="ikr-review-list"+(a?"":" ikr-review-list--no-media");var o=document.createElement("div");o.className="ikr-review-list-author";var s=document.createElement("span");s.className="ikr-review-stars ikr-review-list-author-stars",s.innerHTML=ue(e.rating,A),o.appendChild(s);var l=document.createElement("span");l.className="ikr-review-list-author-name",l.textContent=e.author||"",o.appendChild(l);var c=document.createElement("span");c.className="ikr-date ikr-review-list-author-date",c.textContent=fe(e.createdAt),o.appendChild(c),t.appendChild(o);var m=document.createElement("div");if(m.className="ikr-review-list-content",e.title){var v=document.createElement("div");v.className="ikr-review-list-title",v.textContent=e.title,m.appendChild(v)}var p=(e.comment||"").trim();if(p){var n=document.createElement("div");n.className="ikr-review-list-body ikr-body-clamped",n.textContent=p,m.appendChild(n);var f=document.createElement("span");f.className="ikr-read-more",f.textContent="Devam\u0131n\u0131 oku",f.style.display="none",m.appendChild(f),requestAnimationFrame(function(){if(n.scrollHeight>n.clientHeight+2){f.style.display="inline";var g=!1;f.onclick=function(){g=!g,n.classList.toggle("ikr-body-clamped",!g),f.textContent=g?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"}}})}var d=He(e.merchantReply);if(d&&m.appendChild(d),t.appendChild(m),a){var u=document.createElement("div");u.className="ikr-review-list-media",i.forEach(function(g){var k=document.createElement("img"),x=ie(g,j);k.src=x.src,k.srcset=x.srcset,k.loading="lazy",k.decoding="async",k.width=j,k.height=Math.round(j*4/3),k.setAttribute("data-ikr-img-url",g),te(k),(function(S){k.onclick=function(){ne(e,S,r)}})(g),u.appendChild(k)}),t.appendChild(u)}return t}var Ir={};ge(Ir,{css:()=>It,meta:()=>Bt,render:()=>Mt});var Fi=`
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
`;var Bt={id:"gallery",name:"Galeri",supports:{},sizeOverrides:{small:{"--ikr-gallery-photo-w":"80px","--ikr-gallery-photo-w-mobile":"80px"},medium:{"--ikr-gallery-photo-w":"110px","--ikr-gallery-photo-w-mobile":"100px"},large:{"--ikr-gallery-photo-w":"140px","--ikr-gallery-photo-w-mobile":"110px"}}},It=Fi;function Mt(e,r){var i=Qe(e),a=!!i,t=document.createElement("div");t.className="ikr-review-gallery"+(a?"":" ikr-review-gallery--no-media");var o=document.createElement("div");o.className="ikr-review-gallery-content";var s=document.createElement("span");if(s.className="ikr-review-stars ikr-review-gallery-stars",s.innerHTML=ue(e.rating,A),o.appendChild(s),e.title){var l=document.createElement("div");l.className="ikr-review-gallery-title",l.textContent=e.title,o.appendChild(l)}var c=document.createElement("div");c.className="ikr-review-gallery-author",c.textContent=e.author||"",o.appendChild(c);var m=document.createElement("div");m.className="ikr-review-gallery-date",m.textContent=fe(e.createdAt),o.appendChild(m);var v=(e.comment||"").trim();if(v){var p=document.createElement("div");p.className="ikr-review-gallery-body ikr-body-clamped",p.textContent=v,o.appendChild(p);var n=document.createElement("span");n.className="ikr-read-more",n.textContent="Devam\u0131n\u0131 oku",n.style.display="none",n.style.cursor="pointer";var f=!1;n.onclick=function(){if(i){ne(e,i,r);return}f=!f,p.classList.toggle("ikr-body-clamped",!f),n.textContent=f?"Daha az g\xF6ster":"Devam\u0131n\u0131 oku"},o.appendChild(n),requestAnimationFrame(function(){p.scrollHeight>p.clientHeight+2&&(n.style.display="inline")})}if(t.appendChild(o),a){var d=document.createElement("div");d.className="ikr-review-gallery-media";var u=document.createElement("img"),g=ie(i,er);u.src=g.src,u.srcset=g.srcset,u.loading="lazy",u.decoding="async",u.width=er,u.height=Math.round(er*4/3),te(u),u.setAttribute("data-ikr-img-url",i),u.onclick=function(){ne(e,i,r)},d.appendChild(u),t.appendChild(d)}var k=He(e.merchantReply,i?function(){ne(e,i,r)}:null);return k&&(k.classList.add("ikr-review-gallery-reply"),t.appendChild(k)),t}var mr={card:Rr,list:Br,gallery:Ir};function Ue(e){return mr[e]||mr.card}function _i(){return Object.keys(mr).map(function(e){return mr[e].css||""}).join(`
`)}function Ae(e,r){var i=/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(e);if(!i)return"rgba(0,0,0,"+r+")";var a=parseInt(i[1],16),t=parseInt(i[2],16),o=parseInt(i[3],16);return"rgba("+a+","+t+","+o+","+r+")"}function Ft(){var e=document.getElementById("ikas-reviews-anchor");if(e)return e;e=document.createElement("div"),e.id="ikas-reviews-anchor",e.setAttribute("data-ikr-auto-anchor","1");var r=null;try{r=document.querySelector(ii)}catch(a){}if(r&&r.parentNode)return r.parentNode.insertBefore(e,r.nextSibling),e;var i=document.querySelector("main")||document.body;return i?(i.appendChild(e),e):null}function _t(e,r){var i=e.querySelector('[data-renuvex-slot="product-reviews"],[data-ikr-slot="product-reviews"]');return i||(i=tr({slot:"product-reviews",legacySlot:"product-reviews",className:"renuvex-pr-reviews-slot ikr-reviews-slot",context:{surface:"reviews",productId:r||""}}),e.appendChild(i)),ar(i,{surface:"reviews",productId:r||""}),i}var Oi={small:{titleSize:20,reviewTextSize:12,reviewTitleSize:14,authorSize:12,replyNameSize:12,replyTextSize:12,photoTitleSize:14,avgRatingSize:36,avgStarSize:48,reviewCountSize:16,recommendSize:12,compactCountSize:14,btnTextSize:12,barLabelSize:18,barCountSize:12,reviewDateSize:10,filterTextSize:12,loadMoreSize:12,readMoreSize:10,reviewStarSize:18,minimalAvgSize:18,heroAvgSize:74},medium:{titleSize:24,reviewTextSize:14,reviewTitleSize:16,authorSize:14,replyNameSize:13,replyTextSize:13,photoTitleSize:16,avgRatingSize:46,avgStarSize:58,reviewCountSize:20,recommendSize:14,compactCountSize:16,btnTextSize:14,barLabelSize:22,barCountSize:14,reviewDateSize:12,filterTextSize:14,loadMoreSize:14,readMoreSize:12,reviewStarSize:22,minimalAvgSize:22,heroAvgSize:90},large:{titleSize:28,reviewTextSize:16,reviewTitleSize:18,authorSize:16,replyNameSize:15,replyTextSize:15,photoTitleSize:18,avgRatingSize:56,avgStarSize:68,reviewCountSize:22,recommendSize:16,compactCountSize:18,btnTextSize:16,barLabelSize:26,barCountSize:16,reviewDateSize:14,filterTextSize:16,loadMoreSize:16,readMoreSize:14,reviewStarSize:26,minimalAvgSize:26,heroAvgSize:106}},Hi={small:80,medium:110,large:140};function Ot(e,r){var i=document.createElement("div");i.className="ikr-state-msg ikr-state-error",i.setAttribute("role","status"),i.setAttribute("aria-live","polite");var a=document.createElement("div");a.className="ikr-state-error-text",a.textContent=e||"Yorumlar \u015Fu anda y\xFCklenemiyor.",i.appendChild(a);var t=document.createElement("button");return t.type="button",t.className="ikr-state-retry",t.textContent="Tekrar Dene",t.onclick=async function(){t.disabled=!0,t.textContent="Tekrar deneniyor...",await r()},i.appendChild(t),i}function Ht(e,r){var i=r.headerTitleColor||"#111111",a=r.headerAvgColor||"#111111",t=r.headerCountColor||"#111111",o=r.headerRecommendColor||"#111111",s=r.barFillColor||"#111111",l=r.barTrackColor||"#e5e7eb",c=r.barCountColor||"#111111",m=Ae(s,.06),v=r.reviewStarColor||"#f59e0b",p=r.btnBgColor||"#111111",n=r.btnTextColor||"#ffffff",f=r.btnBorderColor||"#111111",d=r.filterBtnBgColor||"#111111",u=r.filterBtnTextColor||"#ffffff",g=r.filterBtnBorderColor||"#111111",k=r.filterMenuBgColor||"#ffffff",x=r.filterMenuBorderColor||"#e5e7eb",S=r.filterItemTextColor||"#111111",b=r.filterItemHoverBgColor||"#f3f4f6",C=r.filterItemActiveColor||"#111111",w=r.reviewTitleColor||"#111111",h=r.reviewAuthorColor||"#111111",z=r.reviewDateColor||"#5e5e5e",E=r.reviewBodyColor||"#111111",T=r.reviewBorderColor||"#e5e7eb",y=r.replyBgColor||"#f9fafb",P=r.replyBorderColor||"#747474",N=r.replyLabelColor||"#111111",L=r.replyTextColor||"#111111",B=r.photoTitleColor||"#111111",J=Ae("#111111",.05),Z=r.photoArrowBgColor||"#ffffff",le=r.photoArrowTextColor||"#111111",q=Ae("#111111",.12),_=r.formBgColor||"#ffffff",F=r.formPrimaryTextColor||"#111111",Ne=r.formSecondaryTextColor||"#3b3b3b",De=r.inputTextColor||F,H=r.inputBorderColor||"#d1d5db",Se=r.placeholderColor||"#9ca3af",de=r.formStepBarColor||"#111111",se=r.formBtnBgColor||"#111111",Y=r.formBtnTextColor||"#ffffff",$=r.formBtnBorderColor||"#111111",ce=Ae(se,.06),Q=Ae(se,.18),Ye=Ae(Y,.85),ke=Ae(F,.06),ee=r.loadMoreBgColor||"#ffffff",re=r.loadMoreTextColor||"#111111",pe=r.loadMoreBorderColor||"#111111",O={"--ikr-widget-bg":"#ffffff00","--ikr-widget-border":"#ffffff00","--ikr-header-title":i,"--ikr-header-avg":a,"--ikr-header-count":t,"--ikr-header-recommend":o,"--ikr-bar-fill":s,"--ikr-bar-track":l,"--ikr-bar-count":c,"--ikr-bar-hover-bg":m,"--ikr-btn-bg":p,"--ikr-btn-text":n,"--ikr-btn-border":f,"--ikr-filter-btn-bg":d,"--ikr-filter-btn-text":u,"--ikr-filter-btn-border":g,"--ikr-filter-menu-bg":k,"--ikr-filter-menu-border":x,"--ikr-filter-item-text":S,"--ikr-filter-item-hover-bg":b,"--ikr-filter-item-active":C,"--ikr-review-title":w,"--ikr-review-author":h,"--ikr-review-date":z,"--ikr-review-body":E,"--ikr-review-border":T,"--ikr-review-star-color":v,"--ikr-reply-bg-color":y,"--ikr-reply-border":P,"--ikr-reply-label":N,"--ikr-reply-text":L,"--ikr-photo-title":B,"--ikr-photo-image-border":J,"--ikr-photo-arrow-bg":Z,"--ikr-photo-arrow-text":le,"--ikr-photo-arrow-border":q,"--ikr-fwizard-bg":_,"--ikr-fwizard-text":F,"--ikr-fwizard-secondary-text":Ne,"--ikr-fwizard-input-bg":_,"--ikr-fwizard-input-text":De,"--ikr-fwizard-input-border":H,"--ikr-fwizard-placeholder":Se,"--ikr-fwizard-close-text":F,"--ikr-fwizard-close-hover-bg":ke,"--ikr-fwizard-progress-bg":ke,"--ikr-fwizard-progress-active":de,"--ikr-fwizard-btn-bg":se,"--ikr-fwizard-btn-text":Y,"--ikr-fwizard-btn-border":$,"--ikr-fwizard-btn-disabled-bg":Q,"--ikr-fwizard-btn-disabled-text":Ye,"--ikr-fwizard-nav-hover-bg":ce,"--ikr-load-more-bg":ee,"--ikr-load-more-text":re,"--ikr-load-more-border":pe};Object.keys(O).forEach(function(me){e.style.setProperty(me,O[me])}),typeof window!="undefined"&&window.__ikasPreviewMode&&document.body&&(document.body.style.background="transparent",document.documentElement.style.background="transparent")}async function Ce(e,r,i,a,t,o,s){if(Ur){$e({productId:e,settings:r,reviewsData:i,productName:a,orderBy:t,page:o,badgeSettings:s});return}Ze(!0),Hr(e),Dr(r),s!==void 0&&Yr(s),jr(a),t&&Ve(t),o&&Le(o),i!=null&&Vr(i);try{let ur=function(R,M){if(!(!R||!R.meta||!R.meta.sizeOverrides)){var I=R.meta.sizeOverrides[M];I&&Object.keys(I).forEach(function(U){n.style.setProperty(U,I[U])})}};var Dt=ur,l=pr(r.summaryLayout),c=!(l.meta&&l.meta.supports&&l.meta.supports.title===!1),m=r.showTitle!==!1,v=(r.title||"").trim()||"M\xFC\u015Fteri Yorumlar\u0131",p=c&&m?v:"",n=document.documentElement;Ht(n,r),$r("#111111",ki+Ii()+_i());var f=r.borderRadius!==void 0?r.borderRadius:8,d=Oi[r.size]||Oi.medium,u=Hi[r.thumbnailSize]||Hi.medium,g=Ue(r.reviewLayout);if(g.meta&&g.meta.sizeOverrides&&g.meta.sizeOverrides[r.size]){var k=g.meta.sizeOverrides[r.size],x=k["--ikr-list-photo-w"]||k["--ikr-gallery-photo-w"];x&&(u=parseInt(x))}n.style.setProperty("--ikr-title-size",d.titleSize+"px"),n.style.setProperty("--ikr-review-text-size",d.reviewTextSize+"px"),n.style.setProperty("--ikr-review-title-size",d.reviewTitleSize+"px"),n.style.setProperty("--ikr-author-size",d.authorSize+"px"),n.style.setProperty("--ikr-reply-name-size",d.replyNameSize+"px"),n.style.setProperty("--ikr-reply-text-size",d.replyTextSize+"px"),n.style.setProperty("--ikr-radius",f+"px"),n.style.setProperty("--ikr-radius-sm",Math.max(0,f-4)+"px"),n.style.setProperty("--ikr-photo-title-size",d.photoTitleSize+"px"),n.style.setProperty("--ikr-avg-rating-size",d.avgRatingSize+"px"),n.style.setProperty("--ikr-review-count-size",d.reviewCountSize+"px"),n.style.setProperty("--ikr-compact-count-size",d.compactCountSize+"px"),n.style.setProperty("--ikr-recommend-size",d.recommendSize+"px"),n.style.setProperty("--ikr-btn-text-size",d.btnTextSize+"px"),n.style.setProperty("--ikr-bar-label-size",d.barLabelSize+"px"),n.style.setProperty("--ikr-minimal-avg-size",d.minimalAvgSize+"px"),n.style.setProperty("--ikr-hero-avg-size",d.heroAvgSize+"px"),n.style.setProperty("--ikr-bar-count-size",d.barCountSize+"px"),n.style.setProperty("--ikr-review-date-size",d.reviewDateSize+"px"),n.style.setProperty("--ikr-filter-text-size",d.filterTextSize+"px"),n.style.setProperty("--ikr-load-more-size",d.loadMoreSize+"px"),n.style.setProperty("--ikr-read-more-size",d.readMoreSize+"px"),n.style.setProperty("--ikr-thumbnail-size",u+"px");var S=/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(r.reviewStarColor||"")?r.reviewStarColor:"#f59e0b";n.style.setProperty("--ikr-review-star-color",S),n.style.setProperty("--ikr-star-size",d.reviewStarSize+"px"),n.style.setProperty("--ikr-avg-star-size",d.avgStarSize+"px"),ur(pr(r.summaryLayout),r.size),ur(Ue(r.reviewLayout),r.size);var b=We(r),C=Ft();if(!C)return;var w=_t(C,e),h=document.getElementById("ikas-reviews");if(h||(h=document.createElement("div"),h.id="ikas-reviews",h.style.minHeight="200px"),h.parentNode!==w&&w.appendChild(h),r.enabled===!1){h.style.minHeight="auto",h.innerHTML='<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: '+(r.borderRadius!==void 0?r.borderRadius:8)+'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget \u015Fu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canl\u0131 ma\u011Fazan\u0131zda m\xFC\u015Fterileriniz hi\xE7bir yorum alan\u0131 g\xF6rmeyecektir.</div></div>',Ze(!1);var z=Je;$e(null),z&&Ce(z.productId,z.settings,z.reviewsData,z.productName,z.orderBy,z.page,z.badgeSettings);return}h.innerHTML='<p class="ikr-state-msg ikr-state-loading">Yorumlar y\xFCkleniyor...</p>';try{var E=i||{},T=wr(E),y=T?[]:E.data&&E.data.reviews||[],P=T?0:E.data&&E.data.totalCount||0;Gr(y);var N=h.cloneNode(!1);h.parentNode.replaceChild(N,h),h=N;var L=document.createElement("div");if(L.id="ikas-reviews-widget",L.className="renuvex-pr-reviews-widget",L.setAttribute("data-renuvex-surface","reviews"),L.setAttribute("data-ikr-surface","reviews"),e&&(L.setAttribute("data-renuvex-product-id",String(e)),L.setAttribute("data-ikr-product-id",String(e))),typeof window!="undefined"&&window.__ikasPreviewMode&&(L.style.width="100%",L.style.maxWidth="100%",L.style.marginLeft="0",L.style.marginRight="0"),p){var B=document.createElement("div"),J=r.summaryLayout||"classic";B.className="ikr-title ikr-title-"+J,B.textContent=p,L.appendChild(B)}if(T){L.appendChild(Ot(E.message,async function(){var R=await Pe(K,Te,1,Re,Be);await Ce(K,A,R,Ie,Te,1,kr)})),h.appendChild(L),je(L,"reviews-widget",{productId:e||"",reason:"fetch_error"});return}var Z=E.data&&E.data.allCount||0,le=E.data&&E.data.ratingCounts||null,q=le||[0,0,0,0,0],_=E.data&&E.data.avgRating||"0.0";if(!le&&y.length>0){y.forEach(function(R){R.rating>=1&&R.rating<=5&&q[R.rating-1]++});var F=y.reduce(function(R,M){return R+M.rating},0);_=(F/y.length).toFixed(1)}if(Z>0){var Ne=pr(r.summaryLayout),De=Ne.render({widget:L,data:E,settings:r,iconPair:b,allCount:Z,ratingCounts:q,avgRatingVal:_,currentRatingFilter:Re,currentOrderBy:Te,currentHasImages:Be,onFilterChange:async function(R){var M=Re===R?null:R;Xe(M),Le(1);var I=await Pe(K,Te,1,M,Be);await Ce(K,A,I,Ie,Te,1)},onSortChange:async function(R,M){Le(1);var I=R,U=!1;M&&(U=!0,I="newest"),Or(U),Ve(I);var fr=await Pe(K,I,1,Re,U);await Ce(K,A,fr,Ie,I,1)}});L.appendChild(De)}else{var H=document.createElement("button");H.className="ikr-write-btn",H.style.cssText="display:block;margin:16px auto 0;",H.textContent=r.writeButtonText||"Yorum Yap",H.onclick=D,L.appendChild(H)}var Se=(_r||[]).filter(function(R){return xe(R).length>0});if(r.showPhotoGallery!==!1&&!Be&&Se.length>0){var de=document.createElement("div");if(de.className="ikr-photo-section",r.showPhotoGalleryTitle!==!1){var se=(r.photoGalleryTitle||"").trim()||"Foto\u011Frafl\u0131 Yorumlar",Y=document.createElement("div");Y.className="ikr-photo-title",Y.textContent=se,de.appendChild(Y)}var $=r.reviewLayout==="card"?"1/1":"3/4";n.style.setProperty("--ikr-photo-thumb-aspect",$);var ce=document.createElement("div");ce.className="ikr-photo-strip";var Q=j,Ye=r.reviewLayout==="card"?j:Math.round(j*4/3),ke=0;Se.forEach(function(R){if(!(ke>=15)){var M=Qe(R);if(M){var I=document.createElement("img"),U=ie(M,j);I.src=U.src,I.srcset=U.srcset,I.loading=ke<3?"eager":"lazy",I.decoding="async",I.width=Q,I.height=Ye,I.className="ikr-photo-strip-thumb",I.alt="Yorum foto\u011Fraf\u0131",te(I),(function(fr,Di){I.onclick=function(){ne(Di,fr,Se)}})(M,R),ce.appendChild(I),ke++}}});var ee=document.createElement("button");ee.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-prev",ee.innerHTML="&#8249;",ee.setAttribute("aria-label","\xD6nceki"),ee.onclick=function(){ce.scrollBy({left:-200,behavior:"smooth"})};var re=document.createElement("button");re.className="ikr-photo-strip-arrow ikr-photo-strip-arrow-next",re.innerHTML="&#8250;",re.setAttribute("aria-label","Sonraki"),re.onclick=function(){ce.scrollBy({left:200,behavior:"smooth"})};var pe=document.createElement("div");pe.className="ikr-photo-strip-wrap",pe.appendChild(ee),pe.appendChild(ce),pe.appendChild(re),de.appendChild(pe),L.appendChild(de)}if(y.length===0){var O=document.createElement("p");O.className="ikr-state-msg",O.textContent="Hen\xFCz yorum yok.",L.appendChild(O)}else{var g=Ue(r.reviewLayout);y.forEach(function(M){L.appendChild(g.render(M,gr))})}var me=E.data&&E.data.hasMore;if(me){var V=document.createElement("button");V.className="ikr-load-more",V.textContent="Daha Fazla G\xF6ster",V.onclick=async function(){V.disabled=!0,V.textContent="Y\xFCkleniyor...";var R=Fr+1,M=await Pe(K,Te,R,Re,Be);if(M&&!wr(M)&&M.data&&Array.isArray(M.data.reviews)){qr(M.data.reviews),Le(R);var I=Ue(A.reviewLayout);M.data.reviews.forEach(function(U){L.insertBefore(I.render(U,gr),V)}),M.data.hasMore?(V.disabled=!1,V.textContent="Daha Fazla G\xF6ster"):V.remove()}else V.disabled=!1,V.textContent="Tekrar Dene"},L.appendChild(V)}h.appendChild(L),je(L,"reviews-widget",{productId:e||""}),Cr(Z>0?_:null,P,a,kr,b,K)}catch(R){console.error("[ikr] render error:",R),h.innerHTML='<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>'}}finally{if(Ze(!1),Je){var Ee=Je;$e(null),Ce(Ee.productId,Ee.settings,Ee.reviewsData,Ee.productName,Ee.orderBy,Ee.page,Ee.badgeSettings)}}}export{Ce as a,nr as b,wr as c,Pe as d,Vi as e,Ut as f};
